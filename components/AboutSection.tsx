"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";

function Counter({
  value,
  suffix = "",
  duration = 1200,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = Math.max(16, Math.floor(duration / value));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, step);

    return () => clearInterval(timer);
  }, [duration, value]);

  return (
    <span className="text-3xl font-semibold text-white">
      {count}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-16">
      <Reveal>
        <p className="section-kicker">About</p>
        <h2 className="section-heading">Building polished products at scale.</h2>
        <p className="mt-4 max-w-3xl text-white/75">
          Full-Stack Engineer (frontend-focused) with around{" "}
          <span className="text-[#d9d5ff]">5 years</span> of experience in{" "}
          <span className="text-[#00d4ff]">React, Next.js, Angular, TypeScript</span>,
          and Node.js. I build scalable applications with modern architecture,
          reliable API integration, and a strong product mindset.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal delay={0.1}>
          <Card className="p-5">
            <Counter value={5} suffix="+" />
            <p className="mt-2 text-sm text-white/65">Years Experience</p>
          </Card>
        </Reveal>
        <Reveal delay={0.16}>
          <Card className="p-5">
            <Counter value={3} />
            <p className="mt-2 text-sm text-white/65">Companies</p>
          </Card>
        </Reveal>
        <Reveal delay={0.22}>
          <Card className="p-5">
            <Counter value={10} suffix="+" />
            <p className="mt-2 text-sm text-white/65">Projects Delivered</p>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
