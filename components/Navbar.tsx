"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="border-b border-white/10 bg-[#050508]/75 backdrop-blur-xl">
          <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
            <nav
              className="flex h-16 items-center justify-between sm:h-18"
              aria-label="Primary"
            >
              <a
                href="#hero"
                onClick={() => setOpen(false)}
                className="group rounded-xl border border-[#7c6fff]/40 bg-[#7c6fff]/12 px-3 py-1.5 shadow-[0_0_26px_rgba(124,111,255,0.25)] transition-all hover:-translate-y-0.5 hover:border-[#00d4ff]/65 hover:bg-[#00d4ff]/12 hover:shadow-[0_0_34px_rgba(0,212,255,0.3)]"
              >
                <span className="font-mono text-base font-extrabold tracking-[0.08em] text-white sm:text-lg lg:text-xl">
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

              <ul className="hidden items-center gap-1 rounded-full border border-white/12 bg-white/4 px-2 py-1.5 lg:flex">
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

              <button
                type="button"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/90 transition hover:border-[#00d4ff]/50 hover:bg-white/10 hover:text-white lg:hidden"
                aria-expanded={open}
                aria-controls={menuId}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
              </button>
            </nav>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  id={menuId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden border-t border-white/10 lg:hidden"
                >
                  <ul className="flex flex-col gap-1 py-3 pb-4">
                    {navItems.map((item, i) => (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 + i * 0.04 }}
                      >
                        <a
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-xl px-4 py-3 text-base text-white/85 transition hover:bg-white/8 hover:text-[#00d4ff]"
                        >
                          {item.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
