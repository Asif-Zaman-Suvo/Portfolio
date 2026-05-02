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
      className="sticky top-0 z-50 border-b border-white/10 bg-[#050508]/65 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a
          href="#hero"
          className="group rounded-lg border border-[#7c6fff]/30 bg-[#7c6fff]/10 px-3 py-1.5 shadow-[0_0_24px_rgba(124,111,255,0.25)] transition-all hover:border-[#00d4ff]/60 hover:bg-[#00d4ff]/10 hover:shadow-[0_0_28px_rgba(0,212,255,0.3)]"
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
        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm text-white/75 transition-colors hover:text-[#00d4ff]"
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
