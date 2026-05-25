"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

const samplePrompts = [
  "What's your React & Next.js experience?",
  "Are you open to remote roles?",
  "Tell me about the AI Interview Coach project.",
];

const previewMessages = [
  {
    role: "assistant" as const,
    text: "Hey! Ask me about Asif's experience, stack, projects, or availability.",
  },
  {
    role: "user" as const,
    text: "What enterprise work has he done at SELISE?",
  },
  {
    role: "assistant" as const,
    text: "LMS modules, Angular ERP migration, KPI dashboards — 5+ years of SaaS frontend.",
  },
];

export function AiAssistantSection() {
  const openChat = () => window.dispatchEvent(new Event("open-asif-ai-chat"));

  return (
    <section id="ai-assistant" className="section-scroll pb-4 pt-2 sm:pb-6 sm:pt-4">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-200 bg-white shadow-(--shadow-elevated) sm:rounded-3xl">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-br from-indigo-500/8 via-transparent to-blue-500/10"
          />
          <div className="relative grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:p-9">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Interactive portfolio
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Ask My AI Assistant
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                A custom AI trained on my experience, projects, and background — ask
                about my stack, enterprise work, availability, or anything on this
                site. Faster than scrolling, more personal than a PDF.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {samplePrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={openChat}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-left text-xs font-medium text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <Button size="lg" className="mt-6 w-full sm:w-auto" onClick={openChat}>
                <Sparkles className="h-4 w-4" />
                Ask My AI Assistant
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm sm:p-5"
            >
              <div className="mb-4 flex items-center gap-2 border-b border-slate-200/80 pb-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/25">
                  <Bot className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Asif AI</p>
                  <p className="text-xs text-slate-500">Live · answers from this portfolio</p>
                </div>
              </div>
              <div className="space-y-3">
                {previewMessages.map((message) => (
                  <div
                    key={message.text}
                    className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === "assistant"
                        ? "bg-white text-slate-700 shadow-sm"
                        : "ml-auto bg-indigo-600 text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
