import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
function getClient() { return new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "", baseURL: "https://api.deepseek.com/v1" }); }

export async function POST(req: NextRequest) {
  try {
    const { occasion, audience, keyMessage, duration } = await req.json();
    const prompt = `Write a compelling speech:\nOccasion: ${occasion || "Conference keynote"}\nAudience: ${audience || "Professional executives"}\nKey Message: ${keyMessage || "Main takeaway"}\nDuration: ${duration || "10 minutes"}\n\nStructure: Opening hook, context, 3 main points with supporting stories/data, call to action, memorable closing. Make it engaging, persuasive, and natural-sounding when spoken aloud.`;
    const completion = await getClient().chat.completions.create({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], max_tokens: 2000, temperature: 0.7 });
    return NextResponse.json({ result: completion.choices[0]?.message?.content || "No output." });
  } catch (e) { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
