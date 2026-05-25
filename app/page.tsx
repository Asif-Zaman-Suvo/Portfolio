"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AiAssistantSection } from "@/components/AiAssistantSection";
import { AboutSection } from "@/components/AboutSection";
import { ChatBot } from "@/components/ChatBot";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";

export default function Home() {
  const [cursor, setCursor] = useState({ x: -200, y: -200 });

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-[#f7f8fc] text-slate-900"
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
    >
      <div aria-hidden className="mesh-bg fixed inset-0" />
      <div aria-hidden className="grid-pattern fixed inset-0" />

      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-30 hidden h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.12),rgba(99,102,241,0)_70%)] blur-3xl sm:block"
        animate={{ x: cursor.x - 160, y: cursor.y - 160 }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.25 }}
      />

      <Navbar />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-3 pb-12 pt-[calc(var(--nav-offset)+0.75rem)] sm:px-6 sm:pb-16 sm:pt-[calc(var(--nav-offset)+1rem)] lg:px-8">
        <HeroSection />
        <AiAssistantSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceTimeline />
        <ProjectsSection />
        <ContactSection />
      </div>

      <ChatBot />
    </main>
  );
}
