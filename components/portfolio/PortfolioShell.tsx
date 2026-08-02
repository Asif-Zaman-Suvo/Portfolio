"use client";

import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

/**
 * The only client-side concern of the page frame: the cursor-following glow.
 *
 * Isolating it here keeps `app/page.tsx` a Server Component, so the CMS payload
 * is fetched and rendered on the server and never shipped as props to the
 * browser more than once.
 */
export function PortfolioShell({ children }: { children: ReactNode }) {
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

      {children}
    </main>
  );
}
