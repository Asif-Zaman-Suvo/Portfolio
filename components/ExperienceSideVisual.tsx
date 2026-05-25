"use client";

import { animate, motion, useInView } from "framer-motion";
import { CheckCircle2, Code2, PenLine } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BangladeshCoverageMap } from "@/components/BangladeshCoverageMap";

type ExperienceSideVisualProps = {
  index: number;
};

const panelClass =
  "relative hidden w-full max-w-sm items-center justify-center md:flex lg:max-w-md";

const cardClass =
  "w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5";

function CountUp({
  target,
  format,
  className,
}: {
  target: number;
  format: (value: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(format(0));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (value) => setDisplay(format(value)),
    });
    return () => controls.stop();
  }, [inView, target]); // format is stable per metric row

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

function SelisePerformanceCompare() {
  const metrics = [
    {
      label: "LCP",
      before: 4.2,
      after: 2.7,
      beforeFmt: (v: number) => `${v.toFixed(1)}s`,
      afterFmt: (v: number) => `${v.toFixed(1)}s`,
      delta: "-36%",
    },
    {
      label: "Bundle size",
      before: 820,
      after: 540,
      beforeFmt: (v: number) => `${Math.round(v)} KB`,
      afterFmt: (v: number) => `${Math.round(v)} KB`,
      delta: "-34%",
    },
    {
      label: "API response",
      before: 680,
      after: 410,
      beforeFmt: (v: number) => `${Math.round(v)} ms`,
      afterFmt: (v: number) => `${Math.round(v)} ms`,
      delta: "-40%",
    },
  ];

  return (
    <div className={panelClass}>
      <div className={cardClass}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Performance impact
        </p>
        <p className="mt-1 text-xs text-slate-500">
          ERP migration &amp; frontend optimization
        </p>

        <div className="mt-4 space-y-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2.5"
            >
              <p className="text-[11px] font-medium text-slate-600">{metric.label}</p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">Before</p>
                  <p className="mt-0.5 text-sm font-medium tabular-nums text-slate-500">
                    {metric.beforeFmt(metric.before)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">After</p>
                  <p className="mt-0.5 text-sm font-semibold tabular-nums text-slate-900">
                    <CountUp
                      target={metric.after}
                      format={metric.afterFmt}
                    />
                  </p>
                </div>
              </div>
              <p className="mt-2 text-[11px] font-medium text-emerald-700">
                {metric.delta} improvement
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const sprintPhases = [
  { label: "Design", icon: PenLine },
  { label: "Build", icon: Code2 },
  { label: "Ship", icon: CheckCircle2 },
];

function ReformedTechSprintTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div className={panelClass}>
      <div ref={ref} className={cardClass}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Delivery cadence
        </p>
        <p className="mt-1 text-xs text-slate-500">Feature delivery workflow</p>

        <div className="relative mt-6 px-1">
          <div className="absolute left-3 right-3 top-3 h-px bg-slate-200" />
          <motion.div
            className="absolute left-3 top-3 h-px origin-left bg-slate-700"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ width: "calc(100% - 1.5rem)" }}
          />

          <div className="relative flex justify-between">
            {sprintPhases.map((phase, phaseIndex) => {
              const Icon = phase.icon;
              return (
                <div key={phase.label} className="flex flex-col items-center gap-2">
                  <motion.span
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600"
                    initial={{ opacity: 0.4 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0.4 }}
                    transition={{ delay: 0.25 + phaseIndex * 0.2, duration: 0.3 }}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </motion.span>
                  <span className="text-[11px] font-medium text-slate-600">{phase.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">
          <p className="text-xs font-medium text-slate-800">2-week sprints</p>
          <p className="mt-0.5 text-[11px] text-slate-500">0 missed deadlines · Figma → production</p>
        </div>
      </div>
    </div>
  );
}

function EGenerationCoverageMap() {
  return (
    <div className={panelClass}>
      <div className={cardClass}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Coverage map
        </p>
        <p className="mt-1 text-xs text-slate-500">District-level dashboard rollout</p>

        <BangladeshCoverageMap />

        <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
          64 districts · public health reporting &amp; monitoring
        </p>
      </div>
    </div>
  );
}

export function ExperienceSideVisual({ index }: ExperienceSideVisualProps) {
  if (index === 1) return <ReformedTechSprintTimeline />;
  if (index === 2) return <EGenerationCoverageMap />;
  return <SelisePerformanceCompare />;
}
