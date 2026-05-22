"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function goToHash(href: string) {
  const id = href.startsWith("#") ? href.slice(1) : href;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  const next = `${window.location.pathname}${window.location.search}${href}`;
  window.history.replaceState(null, "", next);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["hero", ...navItems.map((item) => item.href.slice(1))];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-28% 0px -60% 0px", threshold: [0.15, 0.35, 0.55] },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const onNavLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.button !== 0) return;
    event.preventDefault();
    setOpen(false);
    setActive(href);
    requestAnimationFrame(() => goToHash(href));
  };

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
      >
        <div
          className={cn(
            "pointer-events-auto mx-auto max-w-6xl overflow-visible rounded-2xl border transition-all duration-300",
            scrolled
              ? "border-slate-200/90 bg-white/95 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
              : "border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl",
          )}
        >
          <nav
            className="relative z-10 flex h-14 items-center justify-between gap-2 px-3 sm:h-16 sm:px-5 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-3"
            aria-label="Primary"
          >
            <a
              href="#hero"
              onClick={(e) => onNavLinkClick(e, "#hero")}
              className="group flex items-center gap-2 justify-self-start"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-blue-600 text-sm font-bold text-white shadow-md shadow-indigo-500/25 transition group-hover:scale-105">
                AS
              </span>
              <span className="hidden text-sm font-semibold tracking-tight text-slate-900 sm:block">
                Asif Suvo
              </span>
            </a>

            <ul className="hidden items-center justify-center gap-1 lg:flex">
              {navItems.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => onNavLinkClick(e, item.href)}
                      className={cn(
                        "relative inline-flex rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "text-indigo-700"
                          : "text-slate-600 hover:text-slate-900",
                      )}
                    >
                      {item.label}
                      {isActive ? (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-linear-to-r from-indigo-600 to-blue-600"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-self-end gap-2">
              <a
                href="#contact"
                onClick={(e) => onNavLinkClick(e, "#contact")}
                className="hidden rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800 lg:inline-flex"
              >
                Get in touch
              </a>

              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700 lg:hidden"
                aria-expanded={open}
                aria-controls={menuId}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>

          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                id={menuId}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden border-t border-slate-100 lg:hidden"
              >
                <ul className="flex flex-col gap-1 p-3">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={(e) => onNavLinkClick(e, item.href)}
                        className={cn(
                          "block rounded-xl px-4 py-3 text-sm font-medium transition",
                          active === item.href
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-slate-700 hover:bg-slate-50",
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li className="pt-1">
                    <a
                      href="#contact"
                      onClick={(e) => onNavLinkClick(e, "#contact")}
                      className="block rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white"
                    >
                      Get in touch
                    </a>
                  </li>
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
