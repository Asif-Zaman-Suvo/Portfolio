"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AboutSection } from "@/components/AboutSection";
import { ChatBot } from "@/components/ChatBot";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";

export default function Home() {
  const [cursor, setCursor] = useState({ x: -200, y: -200 });

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#050508] text-white"
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-30 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(124,111,255,0.34),rgba(124,111,255,0)_68%)] blur-2xl"
        animate={{ x: cursor.x - 150, y: cursor.y - 150 }}
        transition={{ type: "spring", damping: 28, stiffness: 180, mass: 0.2 }}
      />

      <div aria-hidden className="particle-layer" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,111,255,0.18),transparent_38%),radial-gradient(circle_at_top_left,rgba(0,212,255,0.12),transparent_35%)]"
      />

      <Navbar />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-12 sm:px-8 sm:pb-14 lg:px-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceTimeline />
        <ProjectsSection />

        <section id="contact" className="pt-14 pb-6 sm:pt-16">
          <p className="section-kicker">Contact</p>
          <h2 className="section-heading">Let&apos;s build something meaningful.</h2>
          <div className="mt-6 rounded-2xl border border-transparent bg-[linear-gradient(#0f0e17,#0f0e17)_padding-box,linear-gradient(120deg,rgba(124,111,255,0.8),rgba(0,212,255,0.8))_border-box] p-5 sm:p-6">
            <p className="text-white/75">
              Open to remote and relocation opportunities. Reach out for product
              engineering roles, frontend architecture work, or collaboration.
            </p>
            <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
              <a className="contact-link" href="mailto:asif.zaman.suvo@gmail.com">
                Email: asif.zaman.suvo@gmail.com
              </a>
              <a className="contact-link" href="tel:+8801521331328">
                Phone: +88-01521331328
              </a>
              <a
                className="contact-link"
                href="https://www.linkedin.com/in/md-asifuzzaman-shuvo"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="contact-link"
                href="https://github.com/asif-zaman-suvo"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="contact-link md:col-span-2"
                href="https://leetcode.com/u/Asif_Suvo"
                target="_blank"
                rel="noreferrer"
              >
                LeetCode
              </a>
            </div>
          </div>

          <p className="mt-4 border-t border-white/10 pt-3 text-center text-xs tracking-[0.14em] text-white/45">
            © {new Date().getFullYear()} Md Asifuzzaman Suvo. All rights reserved.
          </p>
        </section>
      </div>

      <ChatBot />
    </main>
  );
}
