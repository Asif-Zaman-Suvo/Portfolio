import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `You are Asif's portfolio assistant.
Only answer questions related to Md Asifuzzaman Suvo's:
- skills and tech stack
- work experience and achievements
- education
- contact and availability (remote/relocation)

If a question is unrelated, politely refuse and steer back to Asif's profile.
Keep responses concise, professional, and helpful.`;

export async function POST(request: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing ANTHROPIC_API_KEY in environment." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = Array.isArray(body.messages) ? body.messages : [];

    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages: messages.map((message) => ({
          role: message.role === "assistant" ? "assistant" : "user",
          content: message.content,
        })),
      }),
    });

    if (!anthropicResponse.ok) {
      const detail = await anthropicResponse.text();
      return NextResponse.json(
        { error: "Anthropic request failed", detail },
        { status: anthropicResponse.status },
      );
    }

    const data = (await anthropicResponse.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const message =
      data.content?.find((item) => item.type === "text")?.text ??
      "I can help with Asif's background, stack, and availability.";

    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unexpected server error.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
