"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";

const timeline = [
  {
    company: "SELISE Group",
    role: "Software Engineer",
    date: "Jul 2022 - Present",
    location: "Dhaka, Bangladesh",
    points: [
      "Built pixel-perfect responsive UIs with Next.js, SCSS, and Ant Design, improving design consistency by 25%.",
      "Developed LMS modules (Coupons, Reporting, and Affiliate system), streamlining admin workflows and boosting engagement by 35%.",
      "Automated Storyblok CMS workflows, saving 15+ team hours per month.",
      "Created interactive ChartJS and ExcelJS dashboards to improve reporting clarity.",
      "Developed and maintained Angular + GraphQL ERP frontend modules, reducing user wait time by 30%.",
    ],
  },
  {
    company: "ReformedTech",
    role: "Junior Software Engineer",
    date: "Oct 2021 - Jun 2022",
    location: "Dhaka, Bangladesh",
    points: [
      "Crafted precise, responsive layouts with Next.js and Tailwind CSS, improving cross-device engagement and load performance by 30%.",
      "Converted Figma designs into reusable, interactive UI components, reducing development time by 20%.",
      "Implemented secure OAuth 2.0 authentication via Google Console for 200+ users.",
      "Launched and optimized core sections (Careers, About), improving retention and navigation by 10-15%.",
    ],
  },
  {
    company: "eGeneration LTD",
    role: "Intern",
    date: "Jan 2021 - Jul 2021",
    location: "Dhaka, Bangladesh",
    points: [
      "Analyzed and visualized COVID-19 data for 64 districts to support timely public health reporting.",
      "Improved dashboard usability by fixing key Angular UI bugs and UX issues, boosting engagement by 15%.",
      "Collaborated on cross-platform UI/UX improvements to speed up content access and improve user satisfaction.",
    ],
  },
];

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-16">
      <Reveal>
        <p className="section-kicker">Experience</p>
        <h2 className="section-heading">Timeline of impact.</h2>
      </Reveal>

      <div className="relative mt-10">
        <div className="absolute left-3 top-0 h-full w-px bg-linear-to-b from-[#7c6fff] via-[#00d4ff] to-transparent md:left-1/2" />
        <div className="space-y-5">
          {timeline.map((item, index) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
              className="relative md:grid md:grid-cols-2 md:gap-8"
            >
              <div
                className={`pl-10 md:pl-0 ${index % 2 === 0 ? "md:pr-8" : "md:col-start-2 md:pl-8"}`}
              >
                <Card className="p-5 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {item.role} @ {item.company}
                    </h3>
                    <span className="rounded-full border border-[#7c6fff]/40 bg-[#7c6fff]/15 px-2.5 py-1 text-xs text-[#d9d5ff]">
                      {item.date}
                    </span>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-wide text-white/45">
                    {item.location}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-white/75">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#00d4ff]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <span className="absolute left-1.5 top-6 h-3 w-3 rounded-full bg-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.8)] md:left-1/2 md:-translate-x-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
