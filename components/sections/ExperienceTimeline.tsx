"use client";

import { motion } from "framer-motion";

import { Reveal } from "@/components/Reveal";
import { ExperienceSideVisual } from "@/components/sections/ExperienceSideVisual";
import { Card } from "@/components/ui/card";
import type { ExperienceContent, ExperienceEntry } from "@/sanity/types";

function ExperienceCard({ item }: { item: ExperienceEntry }) {
  return (
    <Card className="premium-card p-5 sm:p-6 lg:p-7">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 sm:text-xs">
          {item.dateLabel}
        </p>
        <h3 className="mt-2 text-base font-semibold text-slate-900 sm:text-lg">
          {item.role}
        </h3>
        <p className="mt-1 text-sm font-medium text-slate-700">{item.company}</p>
      </div>
      <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
        {item.location}
      </p>
      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600 sm:mt-5 sm:space-y-3">
        {item.points.map((point) => (
          <li key={point} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function ExperienceTimeline({ content }: { content: ExperienceContent }) {
  return (
    <section id="experience" className="section-scroll section-padding">
      <Reveal>
        <p className="section-kicker">{content.header.kicker}</p>
        <h2 className="section-heading">{content.header.heading}</h2>
        <p className="section-subheading">{content.header.subheading}</p>
      </Reveal>

      <div className="section-content relative">
        <div className="absolute left-[11px] top-2 hidden h-[calc(100%-1rem)] w-px bg-linear-to-b from-indigo-300 via-blue-300 to-transparent sm:block md:left-1/2" />

        <div className="space-y-5 sm:space-y-6 lg:space-y-8">
          {content.entries.map((item, index) => {
            const cardOnLeft = index % 2 === 0;

            return (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="relative md:grid md:grid-cols-2 md:items-center md:gap-6 lg:gap-10"
              >
                <div
                  className={`relative ${
                    cardOnLeft
                      ? "pl-8 sm:pl-10 md:col-start-1 md:pl-0 md:pr-4 lg:pr-8"
                      : "pl-8 sm:pl-10 md:col-start-2 md:pl-4 md:pr-0 lg:pl-8"
                  }`}
                >
                  <span className="absolute left-0 top-6 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-indigo-600 shadow-md sm:h-6 sm:w-6 md:hidden" />
                  <ExperienceCard item={item} />
                </div>

                <div
                  className={
                    cardOnLeft
                      ? "md:col-start-2 md:row-start-1"
                      : "md:col-start-1 md:row-start-1"
                  }
                >
                  <ExperienceSideVisual visual={item.visual} />
                </div>

                <span className="absolute left-[11px] top-8 hidden h-3 w-3 -translate-x-1/2 rounded-full border-4 border-white bg-indigo-600 shadow-md sm:block md:left-1/2 md:h-3.5 md:w-3.5" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
