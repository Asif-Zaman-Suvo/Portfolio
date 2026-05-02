"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Code2,
  Database,
  LayoutGrid,
  Layers3,
  MessageSquareText,
  Wrench,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";

const groups = [
  {
    title: "Frameworks",
    icon: LayoutGrid,
    items: ["React", "Next.js", "Angular", "NestJS", "Express"],
  },
  {
    title: "Languages",
    icon: Code2,
    items: ["TypeScript", "JavaScript", "GraphQL", "REST API"],
  },
  {
    title: "UI/Styling",
    icon: Layers3,
    items: [
      "Tailwind",
      "Ant Design",
      "shadcn/ui",
      "MUI",
      "Chakra UI",
      "Bootstrap",
      "Angular Material",
      "SCSS",
    ],
  },
  {
    title: "State",
    icon: Zap,
    items: ["Redux Toolkit", "Zustand", "TanStack Query", "RTK Query"],
  },
  {
    title: "Databases",
    icon: Database,
    items: ["MongoDB", "Mongoose", "PostgreSQL", "Supabase", "Prisma"],
  },
  {
    title: "Tools",
    icon: Wrench,
    items: [
      "Git",
      "GitHub",
      "Docker",
      "CI/CD",
      "GCP",
      "JIRA",
      "Postman",
      "Swagger",
      "SonarQube",
    ],
  },
  {
    title: "AI Tools",
    icon: BrainCircuit,
    items: [
      "ChatGPT",
      "GitHub Copilot",
      "Claude AI",
      "Cursor AI",
      "Prompt Engineering",
      "AI-assisted Development",
    ],
  },
  {
    title: "Soft Skills",
    icon: MessageSquareText,
    items: [
      "Agile Collaboration",
      "Requirement Analysis",
      "Code Review",
      "Technical Ownership",
      "Performance Optimization",
      "Sprint Planning",
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-16">
      <Reveal>
        <p className="section-kicker">Skills</p>
        <h2 className="section-heading">Stack that ships production reliably.</h2>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {groups.map((group, groupIndex) => {
          const Icon = group.icon;
          return (
            <Reveal key={group.title} delay={groupIndex * 0.06}>
              <Card className="p-5 transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-4 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[#00d4ff]" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#b8aefe]">
                    {group.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.6, y: 8 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.25, delay: 0.06 * index }}
                    >
                      <Badge className="border-[#7c6fff]/40 bg-[#7c6fff]/10 text-white transition-all hover:border-[#00d4ff]/60 hover:bg-[#00d4ff]/10 hover:shadow-[0_0_16px_rgba(0,212,255,0.28)]">
                        {item}
                      </Badge>
                    </motion.div>
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
