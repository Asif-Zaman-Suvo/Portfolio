"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Database,
  FlaskConical,
  LayoutGrid,
  Layers3,
  Shapes,
  Wrench,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const groups = [
  {
    title: "Languages & Frameworks",
    icon: LayoutGrid,
    highlight: true,
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Angular",
      "NestJS",
      "GraphQL",
      "REST API",
    ],
  },
  {
    title: "State Management & Data",
    icon: Zap,
    highlight: true,
    items: ["Redux Toolkit", "TanStack Query", "Zustand"],
  },
  {
    title: "Databases",
    icon: Database,
    items: ["MongoDB", "Mongoose", "PostgreSQL", "Prisma", "Supabase"],
  },
  {
    title: "UI & Styling",
    icon: Layers3,
    items: ["Tailwind CSS", "Chakra UI", "Material UI", "shadcn/ui", "SCSS"],
  },
  {
    title: "Testing",
    icon: FlaskConical,
    items: ["Jest", "React Testing Library", "Playwright"],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    items: [
      "Git",
      "Docker",
      "CI/CD",
      "GitHub",
      "Postman",
      "Swagger",
      "JIRA",
      "Google Cloud Platform",
    ],
  },
  {
    title: "Architecture & Patterns",
    icon: Shapes,
    items: [
      "RBAC",
      "Microservices",
      "SSR",
      "SSG",
      "Authentication & Authorization",
      "Performance Optimization",
      "Reusable Component Design",
    ],
  },
  {
    title: "AI & Developer Tools",
    icon: BrainCircuit,
    items: [
      "Cursor AI",
      "Claude",
      "ChatGPT",
      "GitHub Copilot",
      "Prompt Engineering",
      "Agentic Workflows",
      "AI-Driven Test Automation",
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="section-scroll py-14 sm:py-20 lg:py-28">
      <Reveal>
        <p className="section-kicker">Skills</p>
        <h2 className="section-heading">
          Production-grade technologies for scalable digital products.
        </h2>
        <p className="section-subheading">
          A modern engineering stack focused on performance, maintainability, and
          shipping reliable product experiences at scale.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 xl:grid-cols-4">
        {groups.map((group, groupIndex) => {
          const Icon = group.icon;
          return (
            <Reveal key={group.title} delay={groupIndex * 0.05}>
              <Card
                className={cn(
                  "group h-full p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-elevated)",
                  group.highlight &&
                    "border-indigo-100 bg-linear-to-br from-white to-indigo-50/40",
                )}
              >
                <div className="mb-4 flex items-center gap-2.5">
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl",
                      group.highlight
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-slate-100 text-slate-600",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, index) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: 0.04 * index }}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition group-hover:border-indigo-200 group-hover:text-indigo-700"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
