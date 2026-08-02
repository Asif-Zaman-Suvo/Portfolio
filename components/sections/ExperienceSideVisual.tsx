"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { BangladeshCoverageMap } from "@/components/BangladeshCoverageMap";
import { resolveIcon } from "@/components/cms/icons";
import type { ExperienceMetric, ExperienceVisual } from "@/sanity/types";

const panelClass =
  "relative hidden w-full max-w-sm items-center justify-center md:flex lg:max-w-md";

const cardClass =
  "w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5";

/**
 * Single-character units read better flush against the number ("2.7s"),
 * multi-character units need a space ("540 KB").
 */
function formatMetric(value: number, unit: string, decimals: number): string {
  const formatted = value.toFixed(decimals);
  if (!unit) return formatted;
  return unit.length > 1 ? `${formatted} ${unit}` : `${formatted}${unit}`;
}

/** Derived rather than authored, so the badge can never contradict the numbers. */
function improvement(metric: ExperienceMetric): string | null {
  if (metric.before === 0) return null;
  const change = Math.round(((metric.after - metric.before) / metric.before) * 100);
  return `${change > 0 ? "+" : ""}${change}% improvement`;
}

function CountUp({
  target,
  unit,
  decimals,
  className,
}: {
  target: number;
  unit: string;
  decimals: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(() => formatMetric(0, unit, decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (value) => setDisplay(formatMetric(value, unit, decimals)),
    });
    return () => controls.stop();
  }, [inView, target, unit, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

function MetricsPanel({
  visual,
}: {
  visual: Extract<ExperienceVisual, { type: "metrics" }>;
}) {
  return (
    <div className={panelClass}>
      <div className={cardClass}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          {visual.title}
        </p>
        <p className="mt-1 text-xs text-slate-500">{visual.subtitle}</p>

        <div className="mt-4 space-y-3">
          {visual.metrics.map((metric) => {
            const delta = improvement(metric);
            return (
              <div
                key={metric.label}
                className="rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2.5"
              >
                <p className="text-[11px] font-medium text-slate-600">
                  {metric.label}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      Before
                    </p>
                    <p className="mt-0.5 text-sm font-medium tabular-nums text-slate-500">
                      {formatMetric(metric.before, metric.unit, metric.decimals)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      After
                    </p>
                    <p className="mt-0.5 text-sm font-semibold tabular-nums text-slate-900">
                      <CountUp
                        target={metric.after}
                        unit={metric.unit}
                        decimals={metric.decimals}
                      />
                    </p>
                  </div>
                </div>
                {delta ? (
                  <p className="mt-2 text-[11px] font-medium text-emerald-700">
                    {delta}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function WorkflowPanel({
  visual,
}: {
  visual: Extract<ExperienceVisual, { type: "workflow" }>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div className={panelClass}>
      <div ref={ref} className={cardClass}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          {visual.title}
        </p>
        <p className="mt-1 text-xs text-slate-500">{visual.subtitle}</p>

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
            {visual.phases.map((phase, phaseIndex) => {
              const Icon = resolveIcon(phase.iconKey);
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
                  <span className="text-[11px] font-medium text-slate-600">
                    {phase.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">
          <p className="text-xs font-medium text-slate-800">
            {visual.footnoteTitle}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            {visual.footnoteDetail}
          </p>
        </div>
      </div>
    </div>
  );
}

function CoveragePanel({
  visual,
}: {
  visual: Extract<ExperienceVisual, { type: "coverage" }>;
}) {
  return (
    <div className={panelClass}>
      <div className={cardClass}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          {visual.title}
        </p>
        <p className="mt-1 text-xs text-slate-500">{visual.subtitle}</p>

        <BangladeshCoverageMap />

        <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
          {visual.footnote}
        </p>
      </div>
    </div>
  );
}

/**
 * The panel is chosen by the CMS `visualType` rather than by row index, so
 * reordering or adding roles no longer silently reassigns visuals.
 */
export function ExperienceSideVisual({ visual }: { visual: ExperienceVisual }) {
  switch (visual.type) {
    case "metrics":
      return <MetricsPanel visual={visual} />;
    case "workflow":
      return <WorkflowPanel visual={visual} />;
    case "coverage":
      return <CoveragePanel visual={visual} />;
    default:
      return null;
  }
}
