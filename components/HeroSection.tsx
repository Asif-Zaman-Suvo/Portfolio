"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";

const fullName = "Md Asifuzzaman Suvo";
const availabilityBadges = ["Available for opportunities", "Remote · Relocation"];

const cvUrl = process.env.NEXT_PUBLIC_CV_URL?.trim() || "/cv.pdf";
const cvIsLocalAsset = cvUrl.startsWith("/");

const heroStats = [
  {
    label: "Years Experience",
    value: "5+",
    icon: TrendingUp,
    detail: "SaaS & enterprise frontend",
  },
  {
    label: "Projects Contributed",
    value: "50+",
    icon: Zap,
    detail: "Across SaaS & enterprise",
  },
  {
    label: "LeetCode Problems",
    value: "60+",
    icon: Code2,
    detail: "Data structures & algorithms",
  },
];

export function HeroSection() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section id="hero" className="section-scroll relative pb-16 pt-0 sm:pb-20 lg:pb-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <Reveal>
            <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {availabilityBadges[0]}
            </Badge>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-5 text-sm font-medium text-indigo-600">
              Frontend Focused Full Stack Engineer · React & Angular · TypeScript · Node
            </p>  
            <h1 className="mt-3 text-balance text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-slate-900 min-[400px]:text-3xl sm:text-4xl sm:leading-[1.08] lg:text-6xl">
              Architecting{" "}
              <span className="gradient-text">scalable frontend systems</span>{" "}
              for SaaS & enterprise products.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
              I&apos;m{" "}
              <span className="font-medium text-slate-900">{fullName}</span> — a
              Frontend Focused Full Stack Engineer with 5+ years architecting scalable SaaS,
              enterprise ERPs, and microservices-driven applications. I drive frontend
              strategy, build data-dense analytics dashboards, and optimize
              high-performance UIs in global remote environments.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-4 flex flex-wrap gap-2">
              {availabilityBadges.slice(1).map((item) => (
                <Badge
                  key={item}
                  className="border-indigo-100 bg-indigo-50/80 text-indigo-700"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={cvUrl}
                {...(cvIsLocalAsset
                  ? ({ download: true } as const)
                  : ({
                      target: "_blank",
                      rel: "noopener noreferrer",
                    } as const))}
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto" size="lg">
                  Download CV
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#ai-assistant" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  Ask My AI Assistant
                </Button>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 border-t border-slate-200/80 pt-8 sm:mt-12 sm:pt-10">
              <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
                {heroStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.08, duration: 0.45 }}
                      className={
                        index > 0
                          ? "sm:border-l sm:border-slate-200/80 sm:pl-6"
                          : undefined
                      }
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <Icon className="h-4 w-4 text-indigo-600" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">
                          {stat.label}
                        </span>
                      </div>
                      <p className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs text-slate-500 sm:text-sm">{stat.detail}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative mx-auto w-full max-w-[17.5rem] sm:max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-4xl border border-slate-200/80 bg-white shadow-(--shadow-elevated)">
            <div className="relative bg-linear-to-br from-indigo-50/80 via-white to-blue-50/50 p-2 sm:p-2.5">
              <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-slate-200/80 sm:rounded-[1.65rem]">
                {imageFailed ? (
                  <div className="flex aspect-4/5 items-center justify-center bg-linear-to-br from-slate-100 to-indigo-50 text-5xl font-semibold text-indigo-600">
                    AS
                  </div>
                ) : (
                  <Image
                    src="/profile-photo.png"
                    alt="Md Asifuzzaman Suvo"
                    width={640}
                    height={800}
                    priority
                    className="aspect-4/5 w-full object-cover object-top"
                    onError={() => setImageFailed(true)}
                  />
                )}
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-100 px-4 py-4 sm:px-5 sm:py-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
                  Current focus
                </p>
                <p className="mt-1 text-sm font-semibold leading-snug text-slate-900">
                  Backend engineering, scalable system architecture & modern DevOps
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  Expanding into distributed systems, infrastructure design,
                  cloud-native development, and production-grade backend engineering.
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Stack
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                {["React", "Angular", "Next.js", "NestJS", "Node.js", "TypeScript"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                  >
                    {item}
                  </span>
                ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
