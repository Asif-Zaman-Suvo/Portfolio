"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitFork, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";

type Project = {
  title: string;
  description: string;
  stack: string[];
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
    ],
    githubRepoFrontend: "https://github.com/Asif-Zaman-Suvo/ai-interview-coach",
    githubRepoBackend:
      "https://github.com/Asif-Zaman-Suvo/ai-interview-coach-backend",
    status: "In Progress",
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
      "PostgreSQL",
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
    live: "https://suvo-e-ticket-booking.vercel.app",
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <Card className="group h-full p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-elevated) sm:p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-indigo-600" />
        </div>

        <p className="text-sm leading-6 text-slate-600">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
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
    <section id="projects" className="section-scroll py-14 sm:py-20 lg:py-28">
      <Reveal>
        <p className="section-kicker">Projects</p>
        <h2 className="section-heading">Selected software engineering work.</h2>
        <p className="section-subheading">
          Applications and platforms built across healthcare, commerce, enterprise
          systems, and interview preparation workflows.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
