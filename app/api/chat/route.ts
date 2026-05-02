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

const BIGMODEL_URL =
  "https://open.bigmodel.cn/api/paas/v4/chat/completions";

/**
 * Default model — `glm-4` is not valid on current PaaS v4; use a listed id, e.g.
 * glm-4.7-flash, glm-4-flash-250414, glm-4.5-air. Override with GLM_MODEL in .env.local.
 * @see https://docs.bigmodel.cn/cn/guide/start/model-overview
 */
const DEFAULT_GLM_MODEL = "glm-4.7-flash";

function zhipuErrorUserMessage(detail: string): string | undefined {
  try {
    const parsed = JSON.parse(detail) as {
      error?: { code?: string; message?: string };
    };
    const code = parsed.error?.code;
    const msg = parsed.error?.message ?? "";

    if (code === "1305" || msg.includes("访问量")) {
      return (
        "This model is temporarily at capacity (too many requests). " +
        "Wait a minute and try again, or set GLM_MODEL in .env.local to another model " +
        "(for example glm-4-flash-250414 or glm-4.5-flash), then restart your dev server."
      );
    }
  } catch {
    // not JSON
  }
  return undefined;
}

async function chatWithGlm(
  apiKey: string,
  model: string,
  messages: ChatMessage[],
) {
  const glmMessages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    ...messages.map((m) => ({
      role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: m.content,
    })),
  ];

  const res = await fetch(BIGMODEL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: glmMessages,
      max_tokens: 1024,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    const userMessage = zhipuErrorUserMessage(detail);
    const status =
      res.status === 429 || detail.includes('"1305"') ? 503 : res.status;
    return NextResponse.json(
      {
        error: "GLM request failed",
        detail,
        ...(userMessage ? { userMessage } : {}),
      },
      { status },
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
}

async function chatWithAnthropic(
  apiKey: string,
  messages: ChatMessage[],
) {
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
  const rawMessage = data.content?.find((item) => item.type === "text")?.text;
  const message =
    typeof rawMessage === "string" && rawMessage.trim().length > 0
      ? rawMessage.trim()
      : "I can help with Asif's background, stack, and availability.";

  return NextResponse.json({ message });
}

export async function POST(request: Request) {
  try {
    const zhipuKey =
      process.env.ZHIPU_API_KEY ?? process.env.BIGMODEL_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (!zhipuKey && !anthropicKey) {
      return NextResponse.json(
        {
          error: "Missing API key.",
          detail:
            "Set ZHIPU_API_KEY (or BIGMODEL_API_KEY) for GLM, or ANTHROPIC_API_KEY for Claude, in .env.local",
        },
        { status: 500 },
      );
    }

    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (zhipuKey) {
      const model =
        process.env.GLM_MODEL?.trim() || DEFAULT_GLM_MODEL;
      return chatWithGlm(zhipuKey, model, messages);
    }

    return chatWithAnthropic(anthropicKey!, messages);
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
