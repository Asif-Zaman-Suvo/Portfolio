"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, SendHorizontal, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const quickQuestions = ["Tech stack?", "Remote work?", "Experience?"];

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") {
      return [
        {
          role: "assistant",
          content:
            "Hey! Ask me anything about Asif's skills, experience, availability, or background.",
        },
      ];
    }

    const stored = window.sessionStorage.getItem("asif-chat-history");
    if (!stored) {
      return [
        {
          role: "assistant",
          content:
            "Hey! Ask me anything about Asif's skills, experience, availability, or background.",
        },
      ];
    }

    try {
      const parsed = JSON.parse(stored) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // ignore corrupted data
    }

    return [
      {
        role: "assistant",
        content:
          "Hey! Ask me anything about Asif's skills, experience, availability, or background.",
      },
    ];
  });

  useEffect(() => {
    sessionStorage.setItem("asif-chat-history", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const openFromAnywhere = () => setOpen(true);
    window.addEventListener("open-asif-ai-chat", openFromAnywhere);
    return () => window.removeEventListener("open-asif-ai-chat", openFromAnywhere);
  }, []);

  const canSubmit = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading],
  );

  const sendMessage = async (rawText?: string) => {
    const text = (rawText ?? input).trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await res.json()) as {
        message?: string;
        error?: string;
        detail?: string;
        userMessage?: string;
      };

      if (!res.ok) {
        let userText =
          data.userMessage ??
          data.error ??
          "Chat request failed. Check server logs.";
        if (!data.userMessage && data.detail) {
          try {
            const parsed = JSON.parse(data.detail) as {
              error?: { message?: string };
            };
            if (parsed.error?.message) userText = parsed.error.message;
          } catch {
            userText = data.detail;
          }
        }
        throw new Error(userText);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.message ??
            "I can help with Asif's background, stack, and availability.",
        },
      ]);
    } catch (err) {
      const hint =
        err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Something went wrong: ${hint}

If you use Zhipu GLM: confirm \`ZHIPU_API_KEY\` in \`.env.local\`, use a valid \`GLM_MODEL\` from the [model list](https://docs.bigmodel.cn/cn/guide/start/model-overview), and restart \`npm run dev\`.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        id="ai-chat"
        aria-label="Open AI assistant"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full border border-[#7c6fff]/40 bg-[#120f1f] p-4 text-[#d9d5ff] shadow-[0_0_0_1px_rgba(124,111,255,0.4),0_0_28px_rgba(124,111,255,0.35)]"
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-[#7c6fff]/40"
          animate={{ scale: [1, 1.25], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        />
        <MessageCircle className="relative h-5 w-5" />
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-end bg-black/45 p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="flex h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b12] shadow-[0_22px_70px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-white">
                  <Sparkles className="h-4 w-4 text-[#00d4ff]" />
                  Ask Asif AI
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="border-b border-white/10 px-3 py-2">
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => sendMessage(question)}
                      className="rounded-full border border-[#7c6fff]/35 bg-[#7c6fff]/10 px-3 py-1 text-xs text-[#d9d5ff] transition hover:border-[#00d4ff]/60 hover:text-white"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={cn(
                      "max-w-[88%] rounded-xl px-3 py-2 text-sm leading-6",
                      message.role === "assistant"
                        ? "bg-white/5 text-white/85"
                        : "ml-auto bg-[#7c6fff] text-white",
                    )}
                  >
                    {message.content}
                  </div>
                ))}

                {loading ? (
                  <div className="inline-flex items-center gap-1 rounded-xl bg-white/5 px-3 py-2 text-white/70">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#00d4ff] [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#00d4ff] [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#00d4ff]" />
                  </div>
                ) : null}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void sendMessage();
                }}
                className="border-t border-white/10 p-3"
              >
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask about stack, experience, availability..."
                    className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 rounded-lg p-0"
                    disabled={!canSubmit}
                  >
                    <SendHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
