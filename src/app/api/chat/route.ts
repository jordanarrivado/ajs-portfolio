import { NextRequest, NextResponse } from "next/server";
import { ChatLog, ChatMessage } from "@/models/ChatLog";
import { connectDB } from "@/lib/db";
import { getPhilippineTime } from "@/lib/time"; 
import { createCompletion } from "@/lib/openai";
import { createBasePrompt } from "@/lib/prompt";
import { UAParser } from "ua-parser-js"; 
import type { ChatCompletionMessageParam, ChatCompletion } from "openai/resources/chat/completions";

// Define your ChatRequestBody type
interface ChatRequestBody {
  messages: ChatCompletionMessageParam[];
  personality?: string;
}

// OpenAI keys and model
const key1 = process.env.OPENAI_API_KEY_1!;
const key2 = process.env.OPENAI_API_KEY_2!;
const model = process.env.OPENAI_MODEL ?? "gpt-4o";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // 1️⃣ Parse user-agent
    const userAgent = req.headers.get("user-agent") || "";
    const parser = new UAParser(userAgent);
    const deviceInfo = parser.getResult();

    const deviceSummary = `${deviceInfo.device.vendor ?? ""} ${deviceInfo.device.model ?? ""} (${deviceInfo.device.type ?? "unknown"}) - ${deviceInfo.os.name ?? "Unknown OS"} ${deviceInfo.os.version ?? ""} | ${deviceInfo.browser.name ?? "Unknown Browser"} ${deviceInfo.browser.version ?? ""}`;

    // 2️⃣ Parse request body
    const body = (await req.json()) as ChatRequestBody;
    const { messages, personality } = body;

    // 🐛 DEBUG: Log the parsed body
    console.log("Parsed body:", JSON.stringify(body, null, 2));
    console.log("Messages type:", typeof messages);
    console.log("Messages is array:", Array.isArray(messages));

    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages:", messages);
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    // 3️⃣ Build prompt
    const basePrompt = createBasePrompt(personality, deviceSummary);
    const systemPrompt: ChatCompletionMessageParam = { role: "system", content: basePrompt };
    const finalMessages: ChatCompletionMessageParam[] = [systemPrompt, ...messages];

    // 4️⃣ Call OpenAI with fallback key
    let completion: ChatCompletion;
    try {
      completion = await createCompletion(key1, finalMessages, model);
    } catch (err: unknown) {
      const e = err as { code?: string; status?: number };
      if (e?.code === "RateLimitReached" || e?.status === 429) {
        completion = await createCompletion(key2, finalMessages, model);
      } else {
        throw err;
      }
    }

    const aiMessage = completion.choices?.[0]?.message?.content ?? "";
    const timestamp = getPhilippineTime();

    // 5️⃣ Map messages to match ChatMessage schema
    const chatMessages: ChatMessage[] = messages.map((m) => ({
      role: m.role,
      content: (() => {
        if (!m.content) return ""; // fallback for null/undefined

        if (typeof m.content === "string") return m.content;

        // If content is an array (OpenAI may return parts)
        if (Array.isArray(m.content)) {
          return m.content
            .map((part) => {
              // Each part may have text (for refusal or text parts)
              if ("text" in part) return part.text;
              return "";
            })
            .join(""); // combine array into single string
        }

        // fallback for unexpected types
        return String(m.content);
      })(),
    }));

    // 🐛 DEBUG: Log the mapped messages
    console.log("Mapped chat messages:", JSON.stringify(chatMessages, null, 2));

    // 6️⃣ Save to MongoDB
    const chatLogData = {
      userAgent,
      device: deviceInfo,
      messages: chatMessages,
      aiResponse: aiMessage,
      personality,
      timestamp,
    };

    // 🐛 DEBUG: Log what we're trying to save
    console.log("Attempting to save:", JSON.stringify(chatLogData, null, 2));

    await ChatLog.create(chatLogData);

    return NextResponse.json({
      message: aiMessage,
      device: deviceInfo,
      timestamp,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Chat API error:", message);
    console.error("Full error:", err);
    return NextResponse.json({ error: message || "Server error" }, { status: 500 });
  }
}
