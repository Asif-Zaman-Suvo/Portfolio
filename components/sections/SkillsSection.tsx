"use client";

import { motion } from "framer-motion";

import { Reveal } from "@/components/Reveal";
import { resolveIcon } from "@/components/cms/icons";
import { Card } from "@/components/ui/card";
import type { SkillsContent } from "@/sanity/types";

export function SkillsSection({ content }: { content: SkillsContent }) {
  return (
    <section id="skills" className="section-scroll section-padding">
      <Reveal>
        <p className="section-kicker">{content.header.kicker}</p>
        <h2 className="section-heading">{content.header.heading}</h2>
        <p className="section-subheading">{content.header.subheading}</p>
      </Reveal>

      <Reveal delay={0.06} className="section-content">
        <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-200/90 bg-linear-to-br from-indigo-50/90 via-white to-blue-50/40 p-5 shadow-sm sm:p-6 lg:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-200/30 blur-3xl"
          />
          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
              {content.coreKicker}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              {content.coreHeading}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {content.coreDescription}
            </p>
          </div>
          <div className="relative mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {content.coreStack.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="rounded-xl border border-indigo-200 bg-white px-5 py-5 shadow-sm sm:px-6 sm:py-6"
              >
                <p className="text-lg font-semibold text-slate-900 sm:text-xl">
                  {item.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {item.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-8 sm:mt-10">
        <Reveal delay={0.1}>
          <div className="mb-5 flex flex-col gap-1 border-b border-slate-200/80 pb-4 sm:mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              {content.toolkitKicker}
            </p>
            <p className="text-sm text-slate-600 sm:text-base">
              {content.toolkitDescription}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {content.groups.map((group, groupIndex) => {
            const Icon = resolveIcon(group.iconKey);
            const compact = group.compact;

            return (
              <Reveal key={group.title} delay={0.08 + groupIndex * 0.04}>
                <Card
                  className={`group h-full transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-(--shadow-elevated) ${
                    compact ? "bg-slate-50/70 p-4" : "p-5"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2.5 ${compact ? "mb-3" : "mb-4"}`}
                  >
                    <span
                      className={`flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 ${
                        compact ? "h-8 w-8" : "h-9 w-9"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3
                      className={`font-semibold text-slate-900 ${
                        compact
                          ? "text-xs uppercase tracking-wide text-slate-600"
                          : "text-sm"
                      }`}
                    >
                      {group.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className={
                          compact
                            ? "rounded-md border border-slate-200/80 bg-white px-2 py-1 text-[10px] font-medium text-slate-600"
                            : "rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600"
                        }
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
