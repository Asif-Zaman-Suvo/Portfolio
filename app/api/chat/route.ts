import { NextResponse } from "next/server";

import { getAssistantContext } from "@/sanity/assistant-context";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

/**
 * Behaviour only. Every fact the assistant is allowed to state is injected from
 * published CMS content, so the prompt cannot drift out of sync with the site.
 */
function buildSystemPrompt(context: string, fallbackAnswer: string): string {
  return `You are "Asif AI" — a friendly, concise assistant on a software engineer's portfolio website.

Answer questions ONLY from the PROFILE DATA below. Never invent details, numbers, employers, or dates. If a question is not covered by the data, reply exactly: "${fallbackAnswer}"

Keep answers conversational and short (2-4 sentences). Avoid bullet walls — keep it human.

=== PROFILE DATA ===
${context}`;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Set GROQ_API_KEY in .env.local, then restart dev server." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = Array.isArray(body.messages) ? body.messages : [];

    // Shares the page's cached CMS read; a publish refreshes both together.
    const { context, fallbackAnswer } = await getAssistantContext();

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 300,
        temperature: 0.7,
        messages: [
          { role: "system", content: buildSystemPrompt(context, fallbackAnswer) },
          ...messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        { error: "Groq request failed", detail },
        { status: res.status },
      );
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const rawMessage = data.choices?.[0]?.message?.content;
    const message =
      typeof rawMessage === "string" && rawMessage.trim().length > 0
        ? rawMessage.trim()
        : fallbackAnswer;

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
