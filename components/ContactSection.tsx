"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Clock,
  Code2,
  Copy,
  GitFork,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

const EMAIL = "asif.zaman.suvo@gmail.com";

const directChannels = [
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
];

const profiles = [
  {
    label: "LinkedIn",
    value: "Md Asifuzzaman Suvo",
    href: "https://www.linkedin.com/in/md-asifuzzaman-shuvo",
    icon: Link2,
  },
  {
    label: "GitHub",
    value: "Asif-Zaman-Suvo",
    href: "https://github.com/asif-zaman-suvo",
    icon: GitFork,
  },
  {
    label: "LeetCode",
    value: "Asif_Suvo",
    href: "https://leetcode.com/u/Asif_Suvo",
    icon: Code2,
  },
];

const availabilityMeta = [
  { icon: MapPin, label: "Dhaka, Bangladesh" },
  { icon: Clock, label: "GMT+6 · overlaps EU & US mornings" },
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="section-scroll section-padding pb-4 sm:pb-6">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">Contact</p>
          <h2 className="section-heading">Let&apos;s connect and build together.</h2>
          <p className="section-subheading mx-auto">
            Open to remote and relocation roles. Reach out for Frontend Focused Full Stack Engineer
            positions, SaaS teams, or architecture discussions.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="relative mx-auto mt-7 max-w-5xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-(--shadow-elevated) sm:mt-9 sm:rounded-3xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/25 blur-3xl"
          />

          <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-5 lg:gap-10 lg:p-10">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Available for new roles
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20 sm:h-12 sm:w-12">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700/70">
                      Preferred channel
                    </p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="mt-0.5 block break-all text-sm font-semibold text-slate-900 underline-offset-4 transition hover:text-indigo-700 hover:underline sm:text-base"
                    >
                      {EMAIL}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-indigo-200 bg-white px-3 text-xs font-medium text-indigo-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {directChannels.map(({ label, value, href, icon: Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="group flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-indigo-50 group-hover:text-indigo-600">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        {label}
                      </span>
                      <span className="mt-0.5 block truncate text-sm font-semibold text-slate-900">
                        {value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <dl className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-5 sm:flex-row sm:flex-wrap sm:gap-x-6">
                {availabilityMeta.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-slate-500">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <dt className="sr-only">Detail</dt>
                    <dd>{label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-2 lg:border-l lg:border-slate-100 lg:pl-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Profiles
              </p>

              <div className="mt-3 divide-y divide-slate-100 border-y border-slate-100">
                {profiles.map(({ label, value, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 py-3 transition"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition group-hover:bg-indigo-50 group-hover:text-indigo-600">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-slate-900 transition group-hover:text-indigo-700">
                        {label}
                      </span>
                      <span className="block truncate text-xs text-slate-500">{value}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-indigo-600" />
                  </a>
                ))}
              </div>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("open-asif-ai-chat"))}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-indigo-700"
              >
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                Or ask my AI assistant
              </button>
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
