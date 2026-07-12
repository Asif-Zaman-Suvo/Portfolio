"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  GitFork,
  Link2,
  Mail,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";

const contactLinks = [
  {
    label: "Email",
    value: "asif.zaman.suvo@gmail.com",
    href: "mailto:asif.zaman.suvo@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    label: "Phone",
    value: "+880 1950 931070",
    href: "tel:+8801950931070",
    icon: Phone,
    external: false,
  },
  {
    label: "WhatsApp",
    value: "+880 1521 331328",
    href: "https://wa.me/8801521331328",
    icon: MessageCircle,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "Md Asifuzzaman Suvo",
    href: "https://www.linkedin.com/in/md-asifuzzaman-shuvo",
    icon: Link2,
    external: true,
  },
  {
    label: "GitHub",
    value: "View profile",
    href: "https://github.com/asif-zaman-suvo",
    icon: GitFork,
    external: true,
  },
  {
    label: "LeetCode",
    value: "Asif_Suvo",
    href: "https://leetcode.com/u/Asif_Suvo",
    icon: Code2,
    external: true,
  },
];

const contactCardClass =
  "group flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:gap-4 sm:p-5";

export function ContactSection() {
  return (
    <section id="contact" className="section-scroll section-padding pb-4 sm:pb-6">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">
            Open to opportunities
          </Badge>
          <p className="section-kicker mt-4 sm:mt-5">Contact</p>
          <h2 className="section-heading">Let&apos;s connect and build together.</h2>
          <p className="section-subheading mx-auto">
            Open to remote and relocation roles. Reach out for Frontend Focused Full Stack Engineer
            positions, SaaS teams, or architecture discussions.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="relative mx-auto mt-7 max-w-4xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-(--shadow-elevated) sm:mt-9 sm:rounded-4xl">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-br from-indigo-500/8 via-transparent to-blue-500/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-200/30 blur-3xl"
          />

          <div className="relative p-4 sm:p-8 lg:p-10">
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {contactLinks.map(({ label, value, href, icon: Icon, external }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.06 }}
                  className={contactCardClass}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20 transition group-hover:scale-105 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">
                      {label}
                    </span>
                    <span className="mt-1 block break-all text-sm font-semibold leading-snug text-slate-900 sm:text-base">
                      {value}
                    </span>
                  </span>
                  <ArrowUpRight className="hidden h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-indigo-600 sm:block" />
                </motion.a>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 border-t border-slate-100 pt-8 sm:flex-row">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => window.dispatchEvent(new Event("open-asif-ai-chat"))}
              >
                <Sparkles className="h-4 w-4" />
                Ask My AI Assistant
              </Button>
              <a href="mailto:asif.zaman.suvo@gmail.com" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full">
                  Send an email
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <p className="mt-6 text-center text-xs tracking-[0.14em] text-slate-400">
        © {new Date().getFullYear()} Md Asifuzzaman Suvo. All rights reserved.
      </p>
    </section>
  );
}
