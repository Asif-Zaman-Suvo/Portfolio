"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitFork, Globe, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";

type Project = {
  title: string;
  description: string;
  stack: string[];
  spotlight?: boolean;
  live?: string;
  status?: string;
  github?: string;
  githubRepoFrontend?: string;
  githubRepoBackend?: string;
};

const linkClass =
  "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700 hover:shadow-md";

const projects: Project[] = [
  {
    title: "AI Interview Coach",
    description:
      "Interview preparation platform with mock sessions, voice capture, scoring, admin question bank, and analytics dashboards.",
    stack: [
      "Next.js 16",
      "NestJS 11",
      "TypeScript",
      "MongoDB",
      "Better Auth",
      "RBAC",
      "Notification system",
      "TanStack Query",
      "Recharts",
      'Redis',
      'Docker',
    ],
    spotlight: true,
    githubRepoFrontend: "https://github.com/Asif-Zaman-Suvo/ai-interview-coach",
    githubRepoBackend:
      "https://github.com/Asif-Zaman-Suvo/ai-interview-coach-backend",
    status: "In Progress",
    live: "https://ai-interview-coach-suvo.vercel.app",
  },
  {
    title: "Doctor Khuji",
    description:
      "Healthcare portal where patients book appointments, doctors manage practice, and admins control approvals with role-based flows.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Prisma",
      "Supabase",
      "shadcn/ui",
    ],
    github: "https://github.com/Asif-Zaman-Suvo/Doctor-Khuji",
    live: "https://doctor-khuji.vercel.app/",
  },
  {
    title: "Ticket Booking System",
    description:
      "E-ticket platform for route search, seat booking, and modern passenger booking journeys.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Supabase", "NestJS"],
    github: "https://github.com/Asif-Zaman-Suvo/Ticket-Booking-System-Frontend",
    live: "https://e-ticket-booking.vercel.app/",
    status: "In Progress",
  },
  {
    title: "Smartphone Management Dashboard",
    description:
      "Role-based inventory and sales dashboard with authentication, operations workflows, and invoice generation.",
    stack: ["React", "TypeScript", "RTK Query", "Node.js", "Express", "MongoDB"],
    githubRepoFrontend:
      "https://github.com/Asif-Zaman-Suvo/Smartphone-Management-Frontend",
    githubRepoBackend:
      "https://github.com/Asif-Zaman-Suvo/Smartphone-Management-Backend",
    live: "https://smartphone-management-frontend-suvo.vercel.app/",
  },
  {
    title: "LMS Platform",
    description:
      "Contributed to LMS product modules, reporting workflows, and frontend improvements for a commercial learning platform.",
    stack: ["Next.js", "TypeScript", "SCSS", "Chakra UI"],
    live: "https://keeron.com",
    status: "Commercial client project",
  },
];

const spotlightProject = projects.find((project) => project.spotlight)!;
const otherProjects = projects.filter((project) => !project.spotlight);

function ProjectRepoLinks({ project }: { project: Project }) {
  const split =
    project.githubRepoFrontend != null || project.githubRepoBackend != null;

  if (split) {
    return (
      <>
        {project.githubRepoFrontend ? (
          <a
            href={project.githubRepoFrontend}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            <GitFork className="h-3.5 w-3.5" />
            Frontend
          </a>
        ) : null}
        {project.githubRepoBackend ? (
          <a
            href={project.githubRepoBackend}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            <GitFork className="h-3.5 w-3.5" />
            Backend
          </a>
        ) : null}
      </>
    );
  }

  if (project.github) {
    return (
      <a href={project.github} target="_blank" rel="noreferrer" className={linkClass}>
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
  variant = "default",
}: {
  project: Project;
  index: number;
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
                Featured project
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

        <div className={`mt-auto flex flex-wrap items-center gap-2 ${spotlight ? "pt-6" : "pt-5"}`}>
          <ProjectRepoLinks project={project} />
          {project.status ? (
            <span className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800">
              {project.status}
            </span>
          ) : null}
          {project.live ? (
            <a
              href={project.live}
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

export function ProjectsSection() {
  return (
    <section id="projects" className="section-scroll section-padding">
      <Reveal>
        <p className="section-kicker">Projects</p>
        <h2 className="section-heading">Selected software engineering work.</h2>
        <p className="section-subheading">
          Applications and platforms built across healthcare, commerce, enterprise
          systems, and interview preparation workflows.
        </p>
      </Reveal>

      <div className="section-content space-y-5 sm:space-y-6">
        <ProjectCard project={spotlightProject} index={0} variant="spotlight" />

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {otherProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
