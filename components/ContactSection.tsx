"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  GitFork,
  Link2,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";

const primaryContacts = [
  {
    label: "Email",
    value: "asif.zaman.suvo@gmail.com",
    href: "mailto:asif.zaman.suvo@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    label: "Phone",
    value: "+88 01521331328",
    href: "tel:+8801521331328",
    icon: Phone,
    external: false,
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    display: "Md Asifuzzaman Suvo",
    href: "https://www.linkedin.com/in/md-asifuzzaman-shuvo",
    icon: Link2,
    accent: "from-[#0A66C2]/10 to-blue-50 border-blue-100 text-[#0A66C2]",
  },
  {
    label: "GitHub",
    display: "View profile",
    href: "https://github.com/asif-zaman-suvo",
    icon: GitFork,
    accent: "from-slate-100 to-slate-50 border-slate-200 text-slate-800",
  },
  {
    label: "LeetCode",
    display: "Asif_Suvo",
    href: "https://leetcode.com/u/Asif_Suvo",
    icon: Code2,
    accent: "from-amber-50 to-orange-50 border-amber-200 text-amber-700",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="section-scroll pt-14 pb-6 sm:pt-20 sm:pb-8 lg:pt-28 lg:pb-10">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">
            Open to opportunities
          </Badge>
          <p className="section-kicker mt-6">Contact</p>
          <h2 className="section-heading">Let&apos;s connect and build together.</h2>
          <p className="section-subheading mx-auto">
            Open to remote and relocation roles. Reach out for senior frontend engineering
            positions, SaaS teams, or architecture discussions.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="relative mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-(--shadow-elevated) sm:mt-12 sm:rounded-4xl">
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
              {primaryContacts.map(({ label, value, href, icon: Icon }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.06 }}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:gap-4 sm:p-5"
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

            <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-3">
              {socialLinks.map(({ label, display, href, icon: Icon, accent }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.18 + index * 0.06 }}
                  className={`group flex flex-col gap-3 rounded-2xl border bg-linear-to-br p-4 transition hover:-translate-y-0.5 hover:shadow-md ${accent}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                      <Icon className="h-4 w-4" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 opacity-40 transition group-hover:opacity-100" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider opacity-70">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{display}</p>
                  </div>
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
