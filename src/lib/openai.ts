import OpenAI from "openai";
import type { ChatCompletionMessageParam, ChatCompletion } from "openai/resources/chat/completions";

const endpoint = process.env.OPENAI_ENDPOINT;

export async function createCompletion(
  apiKey: string,
  finalMessages: ChatCompletionMessageParam[],
  model: string
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
