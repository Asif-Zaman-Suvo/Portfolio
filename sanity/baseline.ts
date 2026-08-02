import type { PortfolioContent } from "@/sanity/types";

/**
 * The committed baseline of every editable value on the site.
 *
 * It has two jobs and deliberately no third:
 *  1. `scripts/seed-sanity.ts` writes it into a fresh Sanity dataset, so the
 *     Studio starts populated with the real content instead of empty fields.
 *  2. `getPortfolioContent()` serves it when Sanity is unconfigured or
 *     unreachable, so a CMS outage can never blank out the portfolio.
 *
 * Once Sanity is seeded, Sanity is the source of truth. Edit content there;
 * this file only needs touching if the content *shape* changes.
 */

const EMAIL = "asif.zaman.suvo@gmail.com";
const FULL_NAME = "Md Asifuzzaman Suvo";

const envResumeUrl = process.env.NEXT_PUBLIC_CV_URL?.trim() || "/cv.pdf";

export const baselinePortfolioContent: PortfolioContent = {
  site: {
    fullName: FULL_NAME,
    shortName: "Asif Suvo",
    initials: "AS",
    role: "Frontend Focused Full Stack Engineer",
    location: "Dhaka, Bangladesh",
    timezone: "GMT+6",
    email: EMAIL,
    nav: [
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Experience", href: "#experience" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
    navCta: { label: "Get in touch", href: "#contact" },
    resume: {
      downloadUrl: envResumeUrl,
      label: "Download CV",
      updatedAt: null,
    },
    seo: {
      title: "Md Asifuzzaman Suvo · Software Engineer",
      description:
        "Portfolio of Md Asifuzzaman Suvo — Software Engineer specializing in React, Next.js, Angular, NestJS, TypeScript, and scalable web applications.",
      ogImage: null,
    },
  },

  hero: {
    availabilityBadge: "Available for opportunities",
    secondaryBadges: ["Remote · Relocation"],
    roleLine:
      "Frontend Focused Full Stack Engineer · React & Angular · TypeScript · Node",
    headlineBefore: "Architecting",
    headlineHighlight: "scalable frontend systems",
    headlineAfter: "for SaaS & enterprise products.",
    intro:
      "a Frontend Focused Full Stack Engineer with 5+ years architecting scalable SaaS, enterprise ERPs, and microservices-driven applications. I drive frontend strategy, build data-dense analytics dashboards, and optimize high-performance UIs in global remote environments.",
    resumeCtaLabel: "Download CV",
    assistantCtaLabel: "Ask My AI Assistant",
    stats: [
      {
        label: "Years Experience",
        value: "5+",
        detail: "SaaS & enterprise frontend",
        iconKey: "trendingUp",
      },
      {
        label: "Projects Contributed",
        value: "50+",
        detail: "Across SaaS & enterprise",
        iconKey: "zap",
      },
      {
        label: "LeetCode Problems",
        value: "60+",
        detail: "Data structures & algorithms",
        iconKey: "code",
      },
    ],
    portrait: {
      src: "/profile-photo.png",
      alt: FULL_NAME,
      width: 1024,
      height: 1536,
      lqip: null,
    },
    focusLabel: "Current focus",
    focusTitle:
      "Backend engineering, scalable system architecture & modern DevOps",
    focusDescription:
      "Expanding into distributed systems, infrastructure design, cloud-native development, and production-grade backend engineering.",
    stackLabel: "Stack",
    stack: ["React", "Angular", "Next.js", "NestJS", "Node.js", "TypeScript"],
  },

  aiAssistant: {
    kicker: "Interactive portfolio",
    heading: "Ask My AI Assistant",
    description:
      "A custom AI trained on my experience, projects, and background — ask about my stack, enterprise work, availability, or anything on this site. Faster than scrolling, more personal than a PDF.",
    ctaLabel: "Ask My AI Assistant",
    samplePrompts: [
      "What's your React & Next.js experience?",
      "Are you open to remote roles?",
      "Tell me about the AI Interview Coach project.",
    ],
    previewTitle: "Asif AI",
    previewSubtitle: "Live · answers from this portfolio",
    previewMessages: [
      {
        role: "assistant",
        text: "Hey! Ask me about Asif's experience, stack, projects, or availability.",
      },
      { role: "user", text: "What enterprise work has he done at SELISE?" },
      {
        role: "assistant",
        text: "LMS modules, Angular ERP migration, KPI dashboards — 5+ years of SaaS frontend.",
      },
    ],
  },

  about: {
    header: {
      kicker: "About",
      heading:
        "Frontend Focused Full Stack Engineer for scalable product systems.",
      subheading:
        "Frontend Focused Full Stack Engineer with 5+ years architecting scalable SaaS, enterprise ERPs, and microservices-driven applications using React, Next.js, Angular, Node, and TypeScript. Proven track record driving frontend strategy, building data-dense analytics dashboards, and optimizing high-performance UIs in global remote environments.",
    },
    impactTitle: "How I deliver product impact",
    impactPoints: [
      "Architect responsive, data-dense interfaces and reusable component systems for SaaS and enterprise products.",
      "Build KPI dashboards, reporting workflows, and CMS-driven content systems that improve usability and operational efficiency.",
      "Modernize frontend architecture with Angular, GraphQL, and performance optimization for large-scale datasets.",
    ],
    educationLabel: "Education",
    education: [
      {
        degree: "B.Sc (Hons) in Computer Science & Engineering",
        institution: "National University of Bangladesh",
        meta: "Mar 2016 — Aug 2021 · Dhaka, Bangladesh",
      },
    ],
    contributions: [
      {
        label: "Technical contributions",
        title: "Open Source · Dart Ecosystem",
        description:
          "Merged pull request into the official Dart documentation site — docs page title overflow fix on small screens.",
        linkLabel: "View merged PR #7269",
        url: "https://github.com/dart-lang/site-www/pull/7269",
      },
    ],
  },

  skills: {
    header: {
      kicker: "Skills",
      heading: "Production-grade technologies for scalable digital products.",
      subheading:
        "A modern engineering stack focused on performance, maintainability, and shipping reliable product experiences at scale.",
    },
    coreKicker: "Core stack",
    coreHeading: "What I reach for first",
    coreDescription:
      "The technologies I'm strongest in — used daily for SaaS products, enterprise frontends, and full-stack delivery.",
    coreStack: [
      { name: "React", note: "UI architecture" },
      { name: "Next.js", note: "App Router & SSR" },
      { name: "TypeScript", note: "Type-safe systems" },
      { name: "Angular", note: "Enterprise SPAs" },
      { name: "NestJS", note: "API & services" },
      { name: "GraphQL", note: "Data layers" },
    ],
    toolkitKicker: "Full toolkit",
    toolkitDescription:
      "Everything else I know — supporting skills across data, UI, testing, infrastructure, architecture, and AI-assisted workflows.",
    groups: [
      {
        title: "Languages & Frameworks",
        iconKey: "layoutGrid",
        compact: false,
        items: [
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Angular",
          "NestJS",
          "GraphQL",
          "REST API",
        ],
      },
      {
        title: "State Management & Data",
        iconKey: "zap",
        compact: false,
        items: ["Redux Toolkit", "TanStack Query", "Zustand"],
      },
      {
        title: "Databases",
        iconKey: "database",
        compact: false,
        items: ["MongoDB", "Mongoose", "PostgreSQL", "Prisma", "Supabase"],
      },
      {
        title: "UI & Styling",
        iconKey: "layers",
        compact: false,
        items: ["Tailwind CSS", "Chakra UI", "Material UI", "shadcn/ui", "SCSS"],
      },
      {
        title: "Testing",
        iconKey: "flask",
        compact: false,
        items: ["Jest", "React Testing Library", "Playwright"],
      },
      {
        title: "Tools & Platforms",
        iconKey: "wrench",
        compact: false,
        items: [
          "Git",
          "Docker",
          "CI/CD",
          "GitHub",
          "Postman",
          "Swagger",
          "JIRA",
          "Google Cloud Platform",
        ],
      },
      {
        title: "Architecture & Patterns",
        iconKey: "shapes",
        compact: false,
        items: [
          "RBAC",
          "Microservices",
          "SSR",
          "SSG",
          "Authentication & Authorization",
          "Performance Optimization",
          "Reusable Component Design",
        ],
      },
      {
        title: "AI & Developer Tools",
        iconKey: "brainCircuit",
        compact: true,
        items: [
          "Cursor AI",
          "Claude",
          "ChatGPT",
          "GitHub Copilot",
          "Prompt Engineering",
          "Agentic Workflows",
          "AI-Driven Test Automation",
        ],
      },
    ],
  },

  experience: {
    header: {
      kicker: "Experience",
      heading: "Software engineering experience.",
      subheading:
        "Building frontend systems, analytics dashboards, and enterprise modules across SaaS and business-critical applications.",
    },
    entries: [
      {
        company: "SELISE Group",
        role: "Software Engineer",
        dateLabel: "Jul 2022 — Present",
        location: "Dhaka, Bangladesh",
        points: [
          "Spearheaded end-to-end frontend architecture for core Affiliate, Coupon, and Reporting modules of a top-tier LMS, utilizing Next.js and TypeScript to boost user engagement by 35%.",
          "Co-led legacy ERP migration from Angular 8 to Angular 18 and GraphQL, modernizing state management and successfully decreasing system wait times by 30%.",
          "Refactored core Invoice and Collective modules during the framework upgrade, resolving long-standing architectural technical debt and improving overall system reliability.",
          "Engineered a high-traffic E-Commerce platform with Next.js, SCSS, and Ant Design, integrating Storyblok CMS to automate workflows and save 15+ team hours/month.",
          "Constructed interactive KPI dashboards and custom plugin reporting systems using React, Chart.js, and ExcelJS to streamline data analysis for enterprise stakeholders.",
          "Standardized global address patterns and a scalable component-driven architecture, resolving critical root-level table bugs and improving design consistency by 25%.",
        ],
        visual: {
          type: "metrics",
          title: "Performance impact",
          subtitle: "ERP migration & frontend optimization",
          metrics: [
            { label: "LCP", before: 4.2, after: 2.7, unit: "s", decimals: 1 },
            {
              label: "Bundle size",
              before: 820,
              after: 540,
              unit: "KB",
              decimals: 0,
            },
            {
              label: "API response",
              before: 680,
              after: 410,
              unit: "ms",
              decimals: 0,
            },
          ],
        },
      },
      {
        company: "ReformedTech",
        role: "Junior Software Engineer",
        dateLabel: "Oct 2021 — Jun 2022",
        location: "Dhaka, Bangladesh",
        points: [
          "Crafted high-performance, responsive UIs using Next.js and Tailwind CSS, improving cross-device compatibility and achieving a 30% reduction in page load times.",
          "Translated complex Figma designs into reusable, interactive React components, effectively cutting development overhead by 20%.",
          "Accelerated core feature delivery timelines by implementing frontend best practices and optimizing modern component-driven workflows.",
          "Integrated secure OAuth 2.0 authentication (Google Sign-In) via Google Cloud Platform, ensuring protected access for a user base of 200+ users.",
          "Revamped vital platform modules (Careers & About sections), boosting user navigation flow and increasing target engagement by 10–15%.",
        ],
        visual: {
          type: "workflow",
          title: "Delivery cadence",
          subtitle: "Feature delivery workflow",
          phases: [
            { label: "Design", iconKey: "penLine" },
            { label: "Build", iconKey: "code" },
            { label: "Ship", iconKey: "checkCircle" },
          ],
          footnoteTitle: "2-week sprints",
          footnoteDetail: "0 missed deadlines · Figma → production",
        },
      },
      {
        company: "eGeneration LTD",
        role: "Intern",
        dateLabel: "Jan 2021 — Jul 2021",
        location: "Dhaka, Bangladesh",
        points: [
          "Analyzed and visualized large-scale datasets to build district-level dashboards across all 64 districts of Bangladesh, supporting critical public health decisions.",
          "Resolved critical UI/UX bugs in Angular-based interfaces, successfully boosting dashboard stability and overall platform usability by 15%.",
          "Developed cross-platform UI/UX improvements with cross-functional teams, streamlining content delivery flows for healthcare officials.",
          "Facilitated data-driven reporting systems to enable real-time monitoring and timely, nationwide health bulletin distribution.",
        ],
        visual: {
          type: "coverage",
          title: "Coverage map",
          subtitle: "District-level dashboard rollout",
          footnote: "64 districts · public health reporting & monitoring",
        },
      },
    ],
  },

  projects: {
    header: {
      kicker: "Projects",
      heading: "Selected software engineering work.",
      subheading:
        "Applications and platforms built across healthcare, commerce, enterprise systems, and interview preparation workflows.",
    },
    featuredLabel: "Featured project",
    projects: [
      {
        title: "AI Interview Coach",
        description:
          "Interview preparation platform with mock sessions, voice capture, scoring, admin question bank, and analytics dashboards.",
        stack: [
          "Next.js 16",
          "NestJS 11",
          "TypeScript",
          "MongoDB",
          "Better Auth",
          "RBAC",
          "Notification system",
          "TanStack Query",
          "Recharts",
          "Redis",
          "Docker",
        ],
        featured: true,
        status: "In Progress",
        links: {
          github: null,
          frontend: "https://github.com/Asif-Zaman-Suvo/ai-interview-coach",
          backend:
            "https://github.com/Asif-Zaman-Suvo/ai-interview-coach-backend",
          live: "https://ai-interview-coach-suvo.vercel.app",
        },
      },
      {
        title: "Doctor Khuji",
        description:
          "Healthcare portal where patients book appointments, doctors manage practice, and admins control approvals with role-based flows.",
        stack: [
          "Next.js",
          "TypeScript",
          "Tailwind",
          "Prisma",
          "Supabase",
          "shadcn/ui",
        ],
        featured: false,
        status: null,
        links: {
          github: "https://github.com/Asif-Zaman-Suvo/Doctor-Khuji",
          frontend: null,
          backend: null,
          live: "https://doctor-khuji.vercel.app/",
        },
      },
      {
        title: "Ticket Booking System",
        description:
          "E-ticket platform for route search, seat booking, and modern passenger booking journeys.",
        stack: ["Next.js", "TypeScript", "Tailwind", "Supabase", "NestJS"],
        featured: false,
        status: "In Progress",
        links: {
          github:
            "https://github.com/Asif-Zaman-Suvo/Ticket-Booking-System-Frontend",
          frontend: null,
          backend: null,
          live: "https://e-ticket-booking.vercel.app/",
        },
      },
      {
        title: "Smartphone Management Dashboard",
        description:
          "Role-based inventory and sales dashboard with authentication, operations workflows, and invoice generation.",
        stack: [
          "React",
          "TypeScript",
          "RTK Query",
          "Node.js",
          "Express",
          "MongoDB",
        ],
        featured: false,
        status: null,
        links: {
          github: null,
          frontend:
            "https://github.com/Asif-Zaman-Suvo/Smartphone-Management-Frontend",
          backend:
            "https://github.com/Asif-Zaman-Suvo/Smartphone-Management-Backend",
          live: "https://smartphone-management-frontend-suvo.vercel.app/",
        },
      },
      {
        title: "LMS Platform",
        description:
          "Contributed to LMS product modules, reporting workflows, and frontend improvements for a commercial learning platform.",
        stack: ["Next.js", "TypeScript", "SCSS", "Chakra UI"],
        featured: false,
        status: "Commercial client project",
        links: {
          github: null,
          frontend: null,
          backend: null,
          live: "https://keeron.com",
        },
      },
    ],
  },

  contact: {
    header: {
      kicker: "Contact",
      heading: "Let's connect and build together.",
      subheading:
        "Open to remote and relocation roles. Reach out for Frontend Focused Full Stack Engineer positions, SaaS teams, or architecture discussions.",
    },
    availabilityLabel: "Available for new roles",
    preferredChannelLabel: "Preferred channel",
    email: EMAIL,
    directChannels: [
      {
        label: "Phone",
        value: "+880 1950 931070",
        href: "tel:+8801950931070",
        iconKey: "phone",
        external: false,
      },
      {
        label: "WhatsApp",
        value: "+880 1521 331328",
        href: "https://wa.me/8801521331328",
        iconKey: "messageCircle",
        external: true,
      },
    ],
    profilesLabel: "Profiles",
    profiles: [
      {
        label: "LinkedIn",
        value: "Md Asifuzzaman Suvo",
        href: "https://www.linkedin.com/in/md-asifuzzaman-shuvo",
        iconKey: "link",
        external: true,
      },
      {
        label: "GitHub",
        value: "Asif-Zaman-Suvo",
        href: "https://github.com/asif-zaman-suvo",
        iconKey: "gitFork",
        external: true,
      },
      {
        label: "LeetCode",
        value: "Asif_Suvo",
        href: "https://leetcode.com/u/Asif_Suvo",
        iconKey: "code",
        external: true,
      },
    ],
    meta: [
      { iconKey: "mapPin", label: "Dhaka, Bangladesh" },
      { iconKey: "clock", label: "GMT+6 · overlaps EU & US mornings" },
    ],
    assistantLinkLabel: "Or ask my AI assistant",
    copyrightName: FULL_NAME,
  },

  assistant: {
    title: "Ask Asif AI",
    greeting:
      "Hey! Ask me anything about Asif's skills, experience, availability, or background.",
    quickQuestions: ["Tech stack?", "Remote work?", "Experience?"],
    inputPlaceholder: "Ask about stack, experience, availability...",
    fallbackAnswer: `I don't have that info — you can reach Asif directly at ${EMAIL}`,
  },
};
