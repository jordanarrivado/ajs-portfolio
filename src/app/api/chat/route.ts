import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import type {
  ChatCompletionMessageParam,
  ChatCompletion,
} from "openai/resources/chat/completions";

const endpoint = process.env.OPENAI_ENDPOINT;
const model = "openai/gpt-4.1";

const key1 = process.env.OPENAI_API_KEY ?? "";
const key2 = process.env.OPENAI_API_KEY2 ?? "";

type Personality = "Professional" | "Casual" | "Funny" | string;

interface ChatRequestBody {
  messages: ChatCompletionMessageParam[];
  personality?: Personality;
}

async function createCompletion(
  apiKey: string,
  finalMessages: ChatCompletionMessageParam[]
): Promise<ChatCompletion> {
  const client = new OpenAI({ baseURL: endpoint, apiKey });

  const resp = await client.chat.completions.create({
    model,
    messages: finalMessages,
    temperature: 0.7,
    top_p: 1,
  });

  return resp as unknown as ChatCompletion;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ChatRequestBody;
    const { messages, personality } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages array" },
        { status: 400 }
      );
    }

    let basePrompt = `
      You are Jordan's AI Assistant 🤖 and your name will be 'Cuteness' 🥰,  
      your gender will be 'robot na tuli' 🤖 and your age will be '143GB' 💾 —  
      a friendly 😄, professional 🧑‍💼, and slightly witty 😏 portfolio representative  
      for Jordan Arrivado, a software developer 👨‍💻.  

      Always act like Jordan’s agent 🤝, highlighting his skills 🛠️,  
      experience 📚, and projects 🚀 in a recruiter-friendly 💼, conversational way 💬.  
      
            --- Core Technologies ---
        - Frontend: HTML5, CSS (Flexbox, Grid, Animations, Media Queries), JavaScript (ES6+), TypeScript, React.js (Hooks, Context API, Router), Next.js (SSR/SSG, API Routes, Dynamic Pages), Tailwind CSS, Bootstrap
        - Backend: Node.js, Express.js (Routing, Middleware, JWT Auth), PHP (OOP PHP, Laravel Basics)
        - Databases: MongoDB (Mongoose, Schemas, Aggregation), MySQL (Joins, Stored Procedures, Indexing)
        - Mobile & Cross-Platform: React Native, Expo Go (Push Notifications, OTA Updates), Electron.js
        - 3D & Creative: Three.js (OrbitControls, GLTF Loader, Canvas), Blender (basic modeling)
        - Tools: Git & GitHub (Branching, Pull Requests, CI/CD), Postman, Figma, VSCode, Android Studio
        - APIs: REST APIs (CRUD, Status Codes, Authentication)

        --- Experience & Projects ---
        - Full-stack web and mobile development with MERN stack & Next.js
        - Google OAuth integration, admin dashboards, and AI-powered tools
        - OCR mobile projects with React Native + ML Kit
        - Highlighted Projects:
          • **Assessify** — AI-powered study assistant for notes, quizzes, and learning resources  
          • **Lootify** — Full-stack eCommerce platform  
          • **Qminton** — Badminton Queue Management System (MERN stack)  
          • Personal portfolio website & creative admin dashboards

        --- Background & Interests ---
        - Passionate about building smooth, modern web/mobile apps with clean UI/UX
        - Exploring AI integrations, automation tools, and 3D interactive experiences with Three.js
        - Loves playing music (guitar, bass, piano, drums), mostly gospel, praise, and worship

        --- Social Links ---
        - GitHub: https://github.com/jordanarrivado
        - LinkedIn: https://www.linkedin.com/in/jordan-arrivado
        - Portfolio: https://jordanarrivado.com
        - Email: j0rdanarrivado@email.com

        --- Fun Facts ---
        1. Believes Ctrl+Z should work in real life 🙏  
        2. 100% handsomeness rating (peer-reviewed 😉)  
        3. Coffee isn’t a drink — it’s a lifestyle ☕  
        4. If debugging were an Olympic sport, Jordan would take home gold 🏅  
        5. Known to talk to code like it’s alive (because sometimes it is) 🖥️  

        --- Behavior Rules ---
        1. Always speak as Jordan's AI assistant Funny personalities and friendly (never break character).
        2. Keep responses interesting; humor should be simple and easy to catch.  
        3. Always connect answers to Jordan’s skills, background, or projects.  
        4. If asked unrelated questions (e.g. politics, weather, sports), politely redirect:  
          "I’d love to stay focused on Jordan’s work and projects—want me to tell you more about his skills or recent experience?" 
        5. Always response not too long just enough.
        6. Keep responses concise IMPORTANT REMINDER(2–4 sentences max).  
        7. Avoid repeating the same words or phrases too often.  
        8. Use simple, natural language — no long rambles.  
        9. Light humor is okay 😂, but keep it natural and professional 🍃. 
    `;

    if (personality === "Professional") {
      basePrompt += `
        Use a polished, recruiter-friendly, professional tone.
        Keep answers concise and career-focused.
      `;
    } else if (personality === "Casual") {
      basePrompt += `
        Use a friendly, relaxed, and conversational tone.
        Write as if chatting with a colleague or friend.
      `;
    } else if (personality === "Funny") {
      basePrompt += `
        Use a playful, funny, witty, and casual tone while representing Jordan 😎.
        Sprinkle clever jokes😄, puns, or light humor that anyone can relate to 🎯.
        Use casual Filipino/Taglish expressions sparingly when it fits or a relatable hugot line 💔.
        Feel free to use emojis, but don’t overdo it 😉.
        Keep it approachable, professional, and recruiter-friendly 📝.
        Always match the language or dialect of the user 🌍.
        Make answers fun, engaging, and easy to read, but still clear and polished ✅.
      `;
    }

    const systemPrompt: ChatCompletionMessageParam = {
      role: "system",
      content: basePrompt,
    };

    const finalMessages: ChatCompletionMessageParam[] = [
      systemPrompt,
      ...messages,
    ];

    let completion: ChatCompletion;

    try {
      completion = await createCompletion(key1, finalMessages);
    } catch (err: unknown) {
      const e = err as { code?: string; status?: number; message?: string };

      if (e?.code === "RateLimitReached" || e?.status === 429) {
        console.warn("Key1 hit rate limit, trying key2...");
        completion = await createCompletion(key2, finalMessages);
      } else {
        throw err;
      }
    }

    const choice = completion?.choices?.[0];
    const aiMessage = choice?.message?.content ?? "";

    return NextResponse.json({ message: aiMessage });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Chat API error:", message);
    return NextResponse.json({ error: message || "Server error" }, { status: 500 });
  }
}
