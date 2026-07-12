import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `You are "Asif AI" — a friendly, concise assistant on the portfolio website of Md Ashfuzzaman Suve, a Frontend Focused Full Stack Engineer based in Bangladesh.

Your ONLY job is to answer questions about Asif using the information below. Never make up anything outside this data. If a question isn't covered, say: "I don't have that info — you can reach Asif directly at asif.zaman.suve@gmail.com"

Keep answers conversational, friendly, and short (2-4 sentences max). No bullet walls — keep it human.

--- ABOUT ASIF ---
Name: Md Asifuzzaman Suvo (goes by Asif)
Role: Frontend Focused Full Stack Engineer
Experience: 5+ years
Location: Bangladesh | Open to remote globally

--- TECH STACK ---
Core: React, Next.js, TypeScript, Angular, NestJS, GraphQL
State: Redux Toolkit, NgRx, Zustand, TanStack Query
Databases: PostgreSQL, MongoDB, Redis
UI: Tailwind CSS, shadcn/ui, Radix UI, Framer Motion
Testing: Jest, Playwright, Cypress, React Testing Library
Tools: Docker, GitHub Actions, AWS, Vercel, Figma
Architecture: Micro-frontends, Module Federation, DDD, CQRS
AI tools: LangChain, OpenAI SDK, Cursor, GitHub Copilot

--- EXPERIENCE ---
SELISE Group (current): Software Engineer — enterprise SaaS, micro-frontend architecture, performance optimization (+35% engagement, -30% bundle size, +25% efficiency)
ReformedTech: Junior Software Engineer — e-commerce and SaaS delivery pipelines
eGeneration: Intern — government digital services across Bangladesh (64 districts)

--- EDUCATION ---
B.Sc (Hons) in Computer Science & Engineering

--- PROJECTS ---
1. AI Interview Coach — AI-powered mock interview platform with real-time feedback
2. Doctor Khuj — healthcare appointment booking and doctor discovery system
3. Ticket Booking System — scalable ticketing platform with seat management
4. Smartphone Management Dashboard — enterprise admin panel for device fleet management
5. LMS Platform — learning management system for online education

--- AVAILABILITY ---
Open to: Remote full-time, contract, freelance
Preferred roles: Frontend Focused Full Stack Engineer, Full Stack Frontend Architect, Tech Lead
Timezone: GMT+6 (Bangladesh), comfortable working across global timezones

--- CONTACT ---
Email: asif.zaman.suvo@gmail.com
Phone: +880 1950 931070
LinkedIn: Md Asifuzzaman Suvo
GitHub: Asif-Zaman-Suvo`;

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
          { role: "system", content: SYSTEM_PROMPT },
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
        : "I can help with Asif's background, stack, and availability.";

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