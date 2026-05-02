"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";

const projects = [
  {
    title: "LMS Growth Suite",
    description:
      "Built core LMS modules including coupons, reporting, and affiliate workflows to improve user engagement and retention.",
    stack: ["Next.js", "TypeScript", "Storyblok", "Chart.js"],
  },
  {
    title: "Scalable ERP Frontend",
    description:
      "Developed enterprise-grade Angular + GraphQL interfaces that reduced wait times and improved operational responsiveness.",
    stack: ["Angular", "GraphQL", "SCSS", "Ant Design"],
  },
  {
    title: "COVID-19 Insights Dashboard",
    description:
      "Implemented district-level data visualization platform for nationwide COVID analytics and UI accessibility.",
    stack: ["Angular", "TypeScript", "Data Viz"],
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16">
      <Reveal>
        <p className="section-kicker">Projects</p>
        <h2 className="section-heading">Selected product engineering work.</h2>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <Card className="group h-full p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#00d4ff]/45">
              <div className="mb-3 flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <ArrowUpRight className="h-4 w-4 text-white/40 transition group-hover:text-[#00d4ff]" />
              </div>
              <p className="text-sm leading-6 text-white/72">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#7c6fff]/35 bg-[#7c6fff]/10 px-2.5 py-1 text-xs text-[#d9d5ff]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
