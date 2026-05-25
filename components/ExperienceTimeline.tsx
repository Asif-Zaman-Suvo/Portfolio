"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";
import { ExperienceSideVisual } from "@/components/ExperienceSideVisual";

const timeline = [
  {
    company: "SELISE Group",
    role: "Software Engineer",
    date: "Jul 2022 — Present",
    location: "Dhaka, Bangladesh",
    points: [
      "Spearheaded end-to-end frontend architecture for core Affiliate, Coupon, and Reporting modules of a top-tier LMS, utilizing Next.js and TypeScript to boost user engagement by 35%.",
      "Co-led legacy ERP migration from Angular 8 to Angular 18 and GraphQL, modernizing state management and successfully decreasing system wait times by 30%.",
      "Refactored core Invoice and Collective modules during the framework upgrade, resolving long-standing architectural technical debt and improving overall system reliability.",
      "Engineered a high-traffic E-Commerce platform with Next.js, SCSS, and Ant Design, integrating Storyblok CMS to automate workflows and save 15+ team hours/month.",
      "Constructed interactive KPI dashboards and custom plugin reporting systems using React, Chart.js, and ExcelJS to streamline data analysis for enterprise stakeholders.",
      "Standardized global address patterns and a scalable component-driven architecture, resolving critical root-level table bugs and improving design consistency by 25%.",
    ],
  },
  {
    company: "ReformedTech",
    role: "Junior Software Engineer",
    date: "Oct 2021 — Jun 2022",
    location: "Dhaka, Bangladesh",
    points: [
      "Crafted high-performance, responsive UIs using Next.js and Tailwind CSS, improving cross-device compatibility and achieving a 30% reduction in page load times.",
      "Translated complex Figma designs into reusable, interactive React components, effectively cutting development overhead by 20%.",
      "Accelerated core feature delivery timelines by implementing frontend best practices and optimizing modern component-driven workflows.",
      "Integrated secure OAuth 2.0 authentication (Google Sign-In) via Google Cloud Platform, ensuring protected access for a user base of 200+ users.",
      "Revamped vital platform modules (Careers & About sections), boosting user navigation flow and increasing target engagement by 10–15%.",
    ],
  },
  {
    company: "eGeneration LTD",
    role: "Intern",
    date: "Jan 2021 — Jul 2021",
    location: "Dhaka, Bangladesh",
    points: [
      "Analyzed and visualized large-scale datasets to build district-level dashboards across all 64 districts of Bangladesh, supporting critical public health decisions.",
      "Resolved critical UI/UX bugs in Angular-based interfaces, successfully boosting dashboard stability and overall platform usability by 15%.",
      "Developed cross-platform UI/UX improvements with cross-functional teams, streamlining content delivery flows for healthcare officials.",
      "Facilitated data-driven reporting systems to enable real-time monitoring and timely, nationwide health bulletin distribution.",
    ],
  },
];

function ExperienceCard({ item }: { item: (typeof timeline)[number] }) {
  return (
    <Card className="premium-card p-5 sm:p-6 lg:p-7">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 sm:text-xs">
          {item.date}
        </p>
        <h3 className="mt-2 text-base font-semibold text-slate-900 sm:text-lg">
          {item.role}
        </h3>
        <p className="mt-1 text-sm font-medium text-slate-700">{item.company}</p>
      </div>
      <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
        {item.location}
      </p>
      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600 sm:mt-5 sm:space-y-3">
        {item.points.map((point) => (
          <li key={point} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function ExperienceTimeline() {
  return (
    <section id="experience" className="section-scroll section-padding">
      <Reveal>
        <p className="section-kicker">Experience</p>
        <h2 className="section-heading">Software engineering experience.</h2>
        <p className="section-subheading">
          Building frontend systems, analytics dashboards, and enterprise modules
          across SaaS and business-critical applications.
        </p>
      </Reveal>

      <div className="section-content relative">
        <div className="absolute left-[11px] top-2 hidden h-[calc(100%-1rem)] w-px bg-linear-to-b from-indigo-300 via-blue-300 to-transparent sm:block md:left-1/2" />

        <div className="space-y-5 sm:space-y-6 lg:space-y-8">
          {timeline.map((item, index) => {
            const cardOnLeft = index % 2 === 0;

            return (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="relative md:grid md:grid-cols-2 md:items-center md:gap-6 lg:gap-10"
              >
                <div
                  className={`relative ${
                    cardOnLeft
                      ? "pl-8 sm:pl-10 md:col-start-1 md:pl-0 md:pr-4 lg:pr-8"
                      : "pl-8 sm:pl-10 md:col-start-2 md:pl-4 md:pr-0 lg:pl-8"
                  }`}
                >
                  <span className="absolute left-0 top-6 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-indigo-600 shadow-md sm:h-6 sm:w-6 md:hidden" />
                  <ExperienceCard item={item} />
                </div>

                <div
                  className={
                    cardOnLeft
                      ? "md:col-start-2 md:row-start-1"
                      : "md:col-start-1 md:row-start-1"
                  }
                >
                  <ExperienceSideVisual index={index} />
                </div>

                <span className="absolute left-[11px] top-8 hidden h-3 w-3 -translate-x-1/2 rounded-full border-4 border-white bg-indigo-600 shadow-md sm:block md:left-1/2 md:h-3.5 md:w-3.5" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
