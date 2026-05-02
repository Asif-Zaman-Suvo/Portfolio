"use client";

import { motion } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="absolute inset-0 border-b border-white/10 bg-[#050508]/70 backdrop-blur-xl" />
      <nav className="relative mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a
          href="#hero"
          className="group rounded-xl border border-[#7c6fff]/40 bg-[#7c6fff]/12 px-3.5 py-1.5 shadow-[0_0_26px_rgba(124,111,255,0.25)] transition-all hover:-translate-y-0.5 hover:border-[#00d4ff]/65 hover:bg-[#00d4ff]/12 hover:shadow-[0_0_34px_rgba(0,212,255,0.3)]"
        >
          <span className="font-mono text-lg font-extrabold tracking-[0.08em] text-white sm:text-xl">
            <span className="text-violet-400 transition-colors group-hover:text-violet-300">
              {"{"}
            </span>
            <span className="bg-linear-to-r from-violet-200 via-white to-cyan-300 bg-clip-text text-transparent">
              M
            </span>
            <span className="text-cyan-400 transition-colors group-hover:text-cyan-300">
              A
            </span>
            <span className="bg-linear-to-r from-violet-200 via-white to-cyan-300 bg-clip-text text-transparent">
              S
            </span>
            <span className="text-violet-400 transition-colors group-hover:text-violet-300">
              {"}"}
            </span>
          </span>
        </a>
        <ul className="hidden items-center gap-1 rounded-full border border-white/12 bg-white/4 px-2 py-1.5 md:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm text-white/75 transition-all hover:bg-white/8 hover:text-[#00d4ff]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
