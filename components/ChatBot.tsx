"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, SendHorizontal, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ASSISTANT_OPEN_EVENT } from "@/lib/assistant-events";
import { cn } from "@/lib/utils";
import type { AssistantSettings } from "@/sanity/types";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const HISTORY_KEY = "asif-chat-history";

export function ChatBot({ settings }: { settings: AssistantSettings }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const greeting: ChatMessage[] = [
      { role: "assistant", content: settings.greeting },
    ];

    if (typeof window === "undefined") return greeting;

    const stored = window.sessionStorage.getItem(HISTORY_KEY);
    if (!stored) return greeting;

    try {
      const parsed = JSON.parse(stored) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // ignore corrupted data
    }

    return greeting;
  });

  useEffect(() => {
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const openFromAnywhere = () => setOpen(true);
    window.addEventListener(ASSISTANT_OPEN_EVENT, openFromAnywhere);
    return () => window.removeEventListener(ASSISTANT_OPEN_EVENT, openFromAnywhere);
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
          `,
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
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] right-[max(1rem,env(safe-area-inset-right,0px))] z-50 rounded-full border border-indigo-200 bg-white p-3.5 text-indigo-700 shadow-lg shadow-indigo-500/15 max-[380px]:p-3 sm:bottom-6 sm:right-6 sm:p-4"
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-indigo-300/50"
          animate={{ scale: [1, 1.25], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        />
        <MessageCircle className="relative h-5 w-5" />
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-end bg-slate-900/20 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] backdrop-blur-sm sm:items-center sm:p-4 sm:pb-4"
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
              className="flex h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-elevated)]"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  {settings.title}
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="border-b border-slate-100 px-3 py-2">
                <div className="flex flex-wrap gap-2">
                  {settings.quickQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => sendMessage(question)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600 transition hover:border-indigo-200 hover:text-indigo-700"
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
                        ? "bg-slate-100 text-slate-700"
                        : "ml-auto bg-indigo-600 text-white",
                    )}
                  >
                    {message.content}
                  </div>
                ))}

                {loading ? (
                  <div className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-2 text-slate-500">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500" />
                  </div>
                ) : null}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void sendMessage();
                }}
                className="border-t border-slate-100 p-3"
              >
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={settings.inputPlaceholder}
                    className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
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
