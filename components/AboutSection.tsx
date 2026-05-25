"use client";

import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";

export function AboutSection() {
  return (
    <section id="about" className="section-scroll section-padding">
      <Reveal>
        <p className="section-kicker">About</p>
        <h2 className="section-heading">
          Senior frontend engineering for scalable product systems.
        </h2>
        <p className="section-subheading">
          Senior Frontend Engineer with 5+ years architecting scalable SaaS, enterprise
          ERPs, and microservices-driven applications using React, Next.js, Angular, and
          TypeScript. Proven track record driving frontend strategy, building data-dense
          analytics dashboards, and optimizing high-performance UIs in global remote
          environments.
        </p>
      </Reveal>

      <div className="section-content grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal delay={0.08}>
          <Card className="h-full p-5 sm:p-8">
            <h3 className="text-lg font-semibold text-slate-900">
              How I deliver product impact
            </h3>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                Architect responsive, data-dense interfaces and reusable component
                systems for SaaS and enterprise products.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                Build KPI dashboards, reporting workflows, and CMS-driven content systems
                that improve usability and operational efficiency.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                Modernize frontend architecture with Angular, GraphQL, and performance
                optimization for large-scale datasets.
              </li>
            </ul>
          </Card>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="grid gap-4">
            <Card className="p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Education
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-900">
                B.Sc (Hons) in Computer Science & Engineering
              </p>
              <p className="mt-1 text-sm text-slate-600">
                National University of Bangladesh
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Mar 2016 — Aug 2021 · Dhaka, Bangladesh
              </p>
            </Card>
            <Card className="bg-linear-to-br from-indigo-600 to-blue-600 p-6 text-white">
              <p className="text-xs font-medium uppercase tracking-wider text-indigo-100">
                Technical contributions
              </p>
              <p className="mt-3 font-semibold">Open Source · Dart Ecosystem</p>
              <p className="mt-2 text-sm text-indigo-100">
                Merged pull request into the official Dart documentation site — docs
                page title overflow fix on small screens.
              </p>
              <a
                href="https://github.com/dart-lang/site-www/pull/7269"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white underline decoration-indigo-200/80 underline-offset-4 transition hover:decoration-white"
              >
                View merged PR #7269
              </a>
            </Card>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
