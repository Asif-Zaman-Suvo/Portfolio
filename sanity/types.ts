/**
 * Content contract shared by the CMS mappers, the baseline content module and
 * every presentational section.
 *
 * Sanity TypeGen output (`sanity/types.generated.ts`, produced by
 * `npm run typegen`) describes raw documents and query results. These types
 * describe the normalised shape the UI consumes after projection, so sections
 * never deal with asset references or optional CMS plumbing.
 */

import type { IconKey } from "@/sanity/icon-keys";

export type ImageValue = {
  src: string;
  alt: string;
  width: number;
  height: number;
  lqip: string | null;
};

export type SectionHeader = {
  kicker: string;
  heading: string;
  subheading: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type ResumeFile = {
  /** Direct CDN url with the `?dl=` download parameter already applied. */
  downloadUrl: string;
  label: string;
  updatedAt: string | null;
};

export type SeoContent = {
  title: string;
  description: string;
  ogImage: ImageValue | null;
};

export type SiteSettings = {
  fullName: string;
  shortName: string;
  initials: string;
  role: string;
  location: string;
  timezone: string;
  email: string;
  nav: NavItem[];
  navCta: NavItem;
  resume: ResumeFile | null;
  seo: SeoContent;
};

export type HeroStat = {
  label: string;
  value: string;
  detail: string;
  iconKey: IconKey;
};

export type HeroContent = {
  availabilityBadge: string;
  secondaryBadges: string[];
  roleLine: string;
  headlineBefore: string;
  headlineHighlight: string;
  headlineAfter: string;
  intro: string;
  resumeCtaLabel: string;
  assistantCtaLabel: string;
  stats: HeroStat[];
  portrait: ImageValue | null;
  focusLabel: string;
  focusTitle: string;
  focusDescription: string;
  stackLabel: string;
  stack: string[];
};

export type AssistantPreviewMessage = {
  role: "assistant" | "user";
  text: string;
};

export type AiAssistantContent = {
  kicker: string;
  heading: string;
  description: string;
  ctaLabel: string;
  samplePrompts: string[];
  previewTitle: string;
  previewSubtitle: string;
  previewMessages: AssistantPreviewMessage[];
};

export type EducationEntry = {
  degree: string;
  institution: string;
  meta: string;
};

export type ContributionEntry = {
  label: string;
  title: string;
  description: string;
  linkLabel: string;
  url: string;
};

export type AboutContent = {
  header: SectionHeader;
  impactTitle: string;
  impactPoints: string[];
  educationLabel: string;
  education: EducationEntry[];
  contributions: ContributionEntry[];
};

export type SkillGroup = {
  title: string;
  iconKey: IconKey;
  items: string[];
  compact: boolean;
};

export type CoreSkill = {
  name: string;
  note: string;
};

export type SkillsContent = {
  header: SectionHeader;
  coreKicker: string;
  coreHeading: string;
  coreDescription: string;
  coreStack: CoreSkill[];
  toolkitKicker: string;
  toolkitDescription: string;
  groups: SkillGroup[];
};

export type ExperienceMetric = {
  label: string;
  before: number;
  after: number;
  unit: string;
  decimals: number;
};

export type WorkflowPhase = {
  label: string;
  iconKey: IconKey;
};

export type ExperienceVisual =
  | {
      type: "metrics";
      title: string;
      subtitle: string;
      metrics: ExperienceMetric[];
    }
  | {
      type: "workflow";
      title: string;
      subtitle: string;
      phases: WorkflowPhase[];
      footnoteTitle: string;
      footnoteDetail: string;
    }
  | {
      type: "coverage";
      title: string;
      subtitle: string;
      footnote: string;
    }
  | { type: "none" };

export type ExperienceEntry = {
  company: string;
  role: string;
  dateLabel: string;
  location: string;
  points: string[];
  visual: ExperienceVisual;
};

export type ExperienceContent = {
  header: SectionHeader;
  entries: ExperienceEntry[];
};

export type ProjectLinks = {
  github: string | null;
  frontend: string | null;
  backend: string | null;
  live: string | null;
};

export type ProjectEntry = {
  title: string;
  description: string;
  stack: string[];
  featured: boolean;
  status: string | null;
  links: ProjectLinks;
};

export type ProjectsContent = {
  header: SectionHeader;
  featuredLabel: string;
  projects: ProjectEntry[];
};

export type ContactChannel = {
  label: string;
  value: string;
  href: string;
  iconKey: IconKey;
  external: boolean;
};

export type ContactMeta = {
  iconKey: IconKey;
  label: string;
};

export type ContactContent = {
  header: SectionHeader;
  availabilityLabel: string;
  preferredChannelLabel: string;
  email: string;
  directChannels: ContactChannel[];
  profilesLabel: string;
  profiles: ContactChannel[];
  meta: ContactMeta[];
  assistantLinkLabel: string;
  copyrightName: string;
};

export type AssistantSettings = {
  title: string;
  greeting: string;
  quickQuestions: string[];
  inputPlaceholder: string;
  /** Shown by the model when a question falls outside the known content. */
  fallbackAnswer: string;
};

export type PortfolioContent = {
  site: SiteSettings;
  hero: HeroContent;
  aiAssistant: AiAssistantContent;
  about: AboutContent;
  skills: SkillsContent;
  experience: ExperienceContent;
  projects: ProjectsContent;
  contact: ContactContent;
  assistant: AssistantSettings;
};
