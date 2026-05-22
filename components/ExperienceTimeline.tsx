"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";

const timeline = [
  {
    company: "SELISE Group",
    role: "Software Engineer",
    date: "Jul 2022 — Present",
    location: "Dhaka, Bangladesh",
    points: [
      "Engineered responsive, data-dense UIs using Next.js, SCSS, and Ant Design, improving usability and design consistency by 25%.",
      "Spearheaded development of workflow-driven LMS modules including Coupons, Reporting, and Affiliate systems, boosting user engagement by 35%.",
      "Architected and maintained automated CMS-driven content workflows using Storyblok, reducing manual content management effort by 15+ hours/month.",
      "Constructed interactive KPI dashboards and reporting systems using Chart.js and ExcelJS, integrating advanced filtering to streamline data analysis workflows.",
      "Modernized an enterprise ERP frontend using Angular and GraphQL; streamlined handling of large datasets to improve responsiveness by 30%.",
    ],
  },
  {
    company: "ReformedTech",
    role: "Junior Software Engineer",
    date: "Oct 2021 — Jun 2022",
    location: "Dhaka, Bangladesh",
    points: [
      "Crafted high-performance UI components using Next.js and Tailwind CSS, resulting in a 30% reduction in load times and improved cross-device compatibility.",
      "Translated Figma designs into production-ready, reusable React components, effectively reducing development overhead by 20%.",
      "Implemented secure OAuth 2.0 authentication (Google Sign-In), ensuring protected access for a user base of 200+.",
      "Refined and upgraded core website modules (Careers, About, etc.), which increased user engagement and navigation flow by 10–15%.",
    ],
  },
  {
    company: "eGeneration LTD",
    role: "Intern",
    date: "Jan 2021 — Jul 2021",
    location: "Dhaka, Bangladesh",
    points: [
      "Analyzed and visualized large-scale COVID-19 datasets to deliver district-level dashboards that supported evidence-based public health decision-making across 64 districts.",
      "Elevated data dashboard stability and usability by resolving UI/UX bugs in Angular-based interfaces, increasing overall usability by 15%.",
      "Collaborated on cross-platform UI/UX improvements, focusing on streamlining content delivery flow and enhancing the end-user experience.",
    ],
  },
];

export function ExperienceTimeline() {
  return (
    <section id="experience" className="section-scroll py-14 sm:py-20 lg:py-28">
      <Reveal>
        <p className="section-kicker">Experience</p>
        <h2 className="section-heading">Software engineering experience.</h2>
        <p className="section-subheading">
          Building frontend systems, analytics dashboards, and enterprise modules
          across SaaS and business-critical applications.
        </p>
      </Reveal>

      <div className="relative mt-10 sm:mt-14">
        <div className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px bg-linear-to-b from-indigo-300 via-blue-300 to-transparent md:left-1/2" />

        <div className="space-y-6">
          {timeline.map((item, index) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative md:grid md:grid-cols-2 md:gap-10"
            >
              <div
                className={`relative pl-8 md:pl-0 ${
                  index % 2 === 0 ? "md:pr-10" : "md:col-start-2 md:pl-10"
                }`}
              >
                <span className="absolute left-0 top-6 flex h-6 w-6 items-center justify-center rounded-full border-4 border-white bg-indigo-600 shadow-md md:hidden" />
                <Card className="premium-card p-5 sm:p-7">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 sm:text-xs">
                        {item.date}
                      </p>
                      <h3 className="mt-2 text-base font-semibold text-slate-900 sm:text-lg">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {item.company}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
                    {item.location}
                  </p>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <span className="absolute left-1/2 top-8 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-full border-4 border-white bg-indigo-600 shadow-md md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
