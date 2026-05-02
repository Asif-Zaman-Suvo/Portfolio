"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";

const fullName = "Md Asifuzzaman Suvo";
const badges = ["5 YOE", "Open to Remote", "Open to Relocation"];

export function HeroSection() {
  const [typedName, setTypedName] = useState("");
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let i = 0;
    const tick = setInterval(() => {
      i += 1;
      setTypedName(fullName.slice(0, i));
      if (i >= fullName.length) clearInterval(tick);
    }, 90);

    return () => clearInterval(tick);
  }, []);

  return (
    <section className="relative overflow-hidden pb-20">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <Reveal>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#00d4ff]/80">
              Hi, I&apos;m
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              {typedName}
              <span className="ml-1 inline-block h-12 w-0.5 translate-y-1 animate-caret bg-[#00d4ff]" />
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl text-pretty text-base text-white/75 sm:text-lg">
              Frontend Engineer · React · Next.js · Angular · TypeScript
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {badges.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.09 }}
                >
                  <Badge className="border-[#7c6fff]/40 bg-[#7c6fff]/10 text-[#d9d5ff]">
                    {item}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/cv.pdf" download>
                <Button className="cursor-pointer" size="lg">Download CV</Button>
              </a>
              <Button
                variant="glow"
                size="lg"
                className="cursor-pointer"
                onClick={() => window.dispatchEvent(new Event("open-asif-ai-chat"))}
              >
                <Sparkles className="h-4 w-4" />
                Ask My AI
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.22}>
          <div className="mx-auto w-full max-w-[280px] space-y-3 xl:max-w-[300px]">
            <motion.div
              aria-hidden
              className="hidden rounded-xl border border-[#7c6fff]/30 bg-[#0d0d17]/80 p-4 font-mono text-xs text-[#b8aefe] shadow-[0_0_40px_rgba(124,111,255,0.18)] lg:block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-[#9a8fff]">const engineer = {"{"}</p>
              <p className="pl-3">name: &quot;Asif&quot;,</p>
              <p className="pl-3">focus: &quot;Frontend Architecture&quot;,</p>
              <p className="pl-3">shipping: &quot;high-impact products&quot;,</p>
              <p>{"};"}</p>
            </motion.div>

            <motion.div
              className="w-full rounded-3xl border border-[#7c6fff]/35 bg-white/3 p-1.5 shadow-[0_0_40px_rgba(124,111,255,0.22)]"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            >
              {imageFailed ? (
                <div className="flex aspect-3/4 items-center justify-center rounded-2xl bg-linear-to-br from-[#171422] to-[#11131d] text-5xl font-semibold text-[#d9d5ff]">
                  AS
                </div>
              ) : (
                <Image
                  src="/profile-photo.png"
                  alt="Md Asifuzzaman Suvo"
                  width={640}
                  height={800}
                  className="aspect-3/4 w-full rounded-2xl object-cover object-top"
                  onError={() => setImageFailed(true)}
                />
              )}
             {imageFailed && (
              <p className="px-2 pb-2 pt-3 text-center text-xs tracking-[0.18em] text-white/55">
                PHOTO: public/profile-photo.png
              </p>
             )}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
