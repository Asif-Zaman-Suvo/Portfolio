"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitFork, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";

const projects = [
  {
    title: "Doctor Khuji",
    description:
      "Doctors portal where patients book appointments, doctors manage practice, and admins control approvals with role-based flows.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Prisma","NestJS", "PostgreSQL","Playright",'Agentic-Workflow','Shadcn/ui','Supabase'],
    github: "https://github.com/Asif-Zaman-Suvo/Doctor-Khuji",
    live: "https://doctor-khuji.vercel.app/",
  },
  {
    title: "Ticket Booking System",
    description:
      "E-ticket web app for searching routes, booking bus tickets, and handling modern user booking journeys.",
    stack: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    github: "https://github.com/Asif-Zaman-Suvo/Ticket-Booking-System-Frontend",
    live: "https://suvo-e-ticket-booking.vercel.app/",
  },
  {
    title: "Smartphone Management Dashboard",
    description:
      "Role-based product and sales dashboard with authentication, inventory operations, and invoice generation flows.",
    stack: ["React", "TypeScript", "Redux Toolkit", "RTK Query", "Tailwind",'Node.js','Express','MongoDB','mongoose','jwt','ZOD','bcrypt','cloudinary'],
    github: "https://github.com/Asif-Zaman-Suvo/Smartphone-Management-Frontend",
    backend: "https://github.com/Asif-Zaman-Suvo/Smartphone-Management-Backend",
    live: "https://smartphone-management-frontend-suvo.vercel.app/",
  },
  {
    title: "LMS Platform",
    description:
      "Contributed to LMS product modules, reporting workflows, and frontend improvements as part of engineering work.",
    stack: ["Next.js", "TypeScript", "SCSS", "Chakra UI"],
    live: "https://keeron.com/",
    note: "Commercial client project",
  },
  {
    title: "Restaurant Web App",
    description:
      "Food delivery web app with category-based browsing, cart flow, and Firebase-backed authentication.",
    stack: ["React", "JavaScript", "Firebase", "React Router", "Bootstrap"],
    github: "https://github.com/Asif-Zaman-Suvo/hot-onion-restaurant",
    live: "https://hot-onion-restaurant-suvo176.web.app/",
  },
  {
    title: "DevLinks",
    description:
      "Developer-focused links management and profile hub app with a clean authentication-led experience.",
    stack: ["Next.js", "TypeScript", "Auth", "Responsive UI"],
    github: "https://github.com/Asif-Zaman-Suvo/devlinks",
    live: "https://dev-links-finder.vercel.app/",
  }
] as const;

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16">
      <Reveal>
        <p className="section-kicker">Projects</p>
        <h2 className="section-heading">Selected product engineering work.</h2>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {"github" in project ? (
                  <>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#7c6fff]/35 bg-[#7c6fff]/10 px-3 py-1.5 text-xs text-[#d9d5ff] transition hover:border-[#00d4ff]/60 hover:text-white"
                    >
                      <GitFork className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                    {"backend" in project ? (
                      <a
                        href={project.backend}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#7c6fff]/35 bg-[#7c6fff]/10 px-3 py-1.5 text-xs text-[#d9d5ff] transition hover:border-[#00d4ff]/60 hover:text-white"
                      >
                        <GitFork className="h-3.5 w-3.5" />
                        Backend
                      </a>
                    ) : null}
                  </>
                ) : (
                  <span className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/60">
                    {project.note}
                  </span>
                )}
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#00d4ff]/40 bg-[#00d4ff]/8 px-3 py-1.5 text-xs text-[#c9f6ff] transition hover:border-[#00d4ff]/70 hover:text-white"
                >
                  <Globe className="h-3.5 w-3.5" />
                  Live
                </a>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
