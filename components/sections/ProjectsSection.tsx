"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitFork, Globe, Star } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import type { ProjectEntry, ProjectsContent } from "@/sanity/types";

const linkClass =
  "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700 hover:shadow-md";

function ProjectRepoLinks({ project }: { project: ProjectEntry }) {
  const { github, frontend, backend } = project.links;
  const split = frontend !== null || backend !== null;

  if (split) {
    return (
      <>
        {frontend ? (
          <a href={frontend} target="_blank" rel="noreferrer" className={linkClass}>
            <GitFork className="h-3.5 w-3.5" />
            Frontend
          </a>
        ) : null}
        {backend ? (
          <a href={backend} target="_blank" rel="noreferrer" className={linkClass}>
            <GitFork className="h-3.5 w-3.5" />
            Backend
          </a>
        ) : null}
      </>
    );
  }

  if (github) {
    return (
      <a href={github} target="_blank" rel="noreferrer" className={linkClass}>
        <GitFork className="h-3.5 w-3.5" />
        GitHub
      </a>
    );
  }

  return null;
}

function ProjectCard({
  project,
  index,
  featuredLabel,
  variant = "default",
}: {
  project: ProjectEntry;
  index: number;
  featuredLabel: string;
  variant?: "default" | "spotlight";
}) {
  const spotlight = variant === "spotlight";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="h-full"
    >
      <Card
        className={`group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-elevated) ${
          spotlight
            ? "border-indigo-200/90 bg-linear-to-br from-white via-white to-indigo-50/50 p-6 sm:p-8 lg:p-9"
            : "p-4 sm:p-5"
        }`}
      >
        <div
          className={`mb-3 flex items-start justify-between gap-3 ${
            spotlight ? "lg:mb-4" : ""
          }`}
        >
          <div className="min-w-0">
            {spotlight ? (
              <span className="mb-2 inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-700">
                <Star className="h-3 w-3 fill-indigo-500 text-indigo-500" />
                {featuredLabel}
              </span>
            ) : null}
            <h3
              className={`font-semibold text-slate-900 ${
                spotlight ? "text-2xl sm:text-3xl" : "text-lg"
              }`}
            >
              {project.title}
            </h3>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-indigo-600 sm:h-5 sm:w-5" />
        </div>

        <p
          className={`text-slate-600 ${
            spotlight
              ? "max-w-3xl text-base leading-7 sm:text-lg sm:leading-8"
              : "text-sm leading-6"
          }`}
        >
          {project.description}
        </p>

        <div className={`flex flex-wrap gap-2 ${spotlight ? "mt-6" : "mt-4"}`}>
          {project.stack.map((item) => (
            <span
              key={item}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                spotlight
                  ? "border-indigo-100 bg-white text-slate-700"
                  : "border-slate-200 bg-white text-slate-600"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <div
          className={`mt-auto flex flex-wrap items-center gap-2 ${
            spotlight ? "pt-6" : "pt-5"
          }`}
        >
          <ProjectRepoLinks project={project} />
          {project.status ? (
            <span className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800">
              {project.status}
            </span>
          ) : null}
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
            >
              <Globe className="h-3.5 w-3.5" />
              Live
            </a>
          ) : null}
        </div>
      </Card>
    </motion.div>
  );
}

export function ProjectsSection({ content }: { content: ProjectsContent }) {
  const spotlight = content.projects.find((project) => project.featured) ?? null;
  const others = content.projects.filter((project) => project !== spotlight);

  return (
    <section id="projects" className="section-scroll section-padding">
      <Reveal>
        <p className="section-kicker">{content.header.kicker}</p>
        <h2 className="section-heading">{content.header.heading}</h2>
        <p className="section-subheading">{content.header.subheading}</p>
      </Reveal>

      <div className="section-content space-y-5 sm:space-y-6">
        {spotlight ? (
          <ProjectCard
            project={spotlight}
            index={0}
            featuredLabel={content.featuredLabel}
            variant="spotlight"
          />
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {others.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index + 1}
              featuredLabel={content.featuredLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
