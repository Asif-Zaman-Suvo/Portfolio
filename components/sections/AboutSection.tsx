"use client";

import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import type { AboutContent } from "@/sanity/types";

export function AboutSection({ content }: { content: AboutContent }) {
  return (
    <section id="about" className="section-scroll section-padding">
      <Reveal>
        <p className="section-kicker">{content.header.kicker}</p>
        <h2 className="section-heading">{content.header.heading}</h2>
        <p className="section-subheading">{content.header.subheading}</p>
      </Reveal>

      <div className="section-content grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal delay={0.08}>
          <Card className="h-full p-5 sm:p-8">
            <h3 className="text-lg font-semibold text-slate-900">
              {content.impactTitle}
            </h3>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
              {content.impactPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                  {point}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="grid gap-4">
            {content.education.map((item) => (
              <Card key={`${item.degree}-${item.institution}`} className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {content.educationLabel}
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  {item.degree}
                </p>
                <p className="mt-1 text-sm text-slate-600">{item.institution}</p>
                <p className="mt-2 text-xs text-slate-500">{item.meta}</p>
              </Card>
            ))}

            {content.contributions.map((item) => (
              <Card
                key={item.title}
                className="bg-linear-to-br from-indigo-600 to-blue-600 p-6 text-white"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-indigo-100">
                  {item.label}
                </p>
                <p className="mt-3 font-semibold">{item.title}</p>
                <p className="mt-2 text-sm text-indigo-100">{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white underline decoration-indigo-200/80 underline-offset-4 transition hover:decoration-white"
                >
                  {item.linkLabel}
                </a>
              </Card>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
