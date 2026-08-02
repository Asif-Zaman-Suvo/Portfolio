import "server-only";

import { baselinePortfolioContent } from "@/sanity/baseline";
import { ICON_KEYS, type IconKey } from "@/sanity/icon-keys";
import { sanityFetch } from "@/sanity/fetch";
import { toImageValue, type RawImage } from "@/sanity/image";
import { portfolioQuery } from "@/sanity/queries/portfolio";
import type { PortfolioQueryResult } from "@/sanity/types.generated";
import type {
  AssistantPreviewMessage,
  ContactChannel,
  CoreSkill,
  ExperienceEntry,
  ExperienceVisual,
  PortfolioContent,
  ProjectEntry,
  SectionHeader,
} from "@/sanity/types";

/* ------------------------------------------------------------------ *
 * Coercion helpers
 *
 * Every CMS field is treated as optional. A half-filled document should
 * degrade to the baseline value for that field, never crash a render.
 * ------------------------------------------------------------------ */

function str(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

function strOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
}

function num(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function bool(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function strList(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback;
  const items = value.filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0,
  );
  return items.length > 0 ? items.map((item) => item.trim()) : fallback;
}

function objList(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is Record<string, unknown> =>
      typeof item === "object" && item !== null,
  );
}

function obj(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : {};
}

function icon(value: unknown, fallback: IconKey): IconKey {
  return typeof value === "string" &&
    (ICON_KEYS as readonly string[]).includes(value)
    ? (value as IconKey)
    : fallback;
}

function header(value: unknown, fallback: SectionHeader): SectionHeader {
  const raw = obj(value);
  return {
    kicker: str(raw.kicker, fallback.kicker),
    heading: str(raw.heading, fallback.heading),
    subheading: str(raw.subheading, fallback.subheading),
  };
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Formatted on the server from an ISO date so output never varies by locale. */
function monthYear(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const match = /^(\d{4})-(\d{2})/.exec(value);
  if (!match) return null;
  const month = MONTHS[Number(match[2]) - 1];
  return month ? `${month} ${match[1]}` : null;
}

function dateRangeLabel(raw: Record<string, unknown>): string {
  const start = monthYear(raw.startDate);
  if (!start) return "";
  const end = bool(raw.isCurrent) ? "Present" : monthYear(raw.endDate);
  return end ? `${start} — ${end}` : start;
}

function channels(
  value: unknown,
  fallback: ContactChannel[],
): ContactChannel[] {
  const items = objList(value);
  if (items.length === 0) return fallback;
  return items.map((item, index) => ({
    label: str(item.label, fallback[index]?.label ?? ""),
    value: str(item.value, fallback[index]?.value ?? ""),
    href: str(item.href, fallback[index]?.href ?? "#"),
    iconKey: icon(item.iconKey, fallback[index]?.iconKey ?? "link"),
    external: bool(item.external, fallback[index]?.external ?? true),
  }));
}

/* ------------------------------------------------------------------ *
 * Section mappers
 * ------------------------------------------------------------------ */

function mapExperienceVisual(raw: Record<string, unknown>): ExperienceVisual {
  const type = str(raw.visualType, "none");
  const title = str(raw.visualTitle, "");
  const subtitle = str(raw.visualSubtitle, "");

  if (type === "metrics") {
    const metrics = objList(raw.metrics).map((metric) => ({
      label: str(metric.label, ""),
      before: num(metric.before, 0),
      after: num(metric.after, 0),
      unit: str(metric.unit, ""),
      decimals: num(metric.decimals, 0),
    }));
    if (metrics.length === 0) return { type: "none" };
    return { type: "metrics", title, subtitle, metrics };
  }

  if (type === "workflow") {
    const phases = objList(raw.phases).map((phase) => ({
      label: str(phase.label, ""),
      iconKey: icon(phase.iconKey, "checkCircle"),
    }));
    if (phases.length === 0) return { type: "none" };
    return {
      type: "workflow",
      title,
      subtitle,
      phases,
      footnoteTitle: str(raw.footnoteTitle, ""),
      footnoteDetail: str(raw.footnoteDetail, ""),
    };
  }

  if (type === "coverage") {
    return {
      type: "coverage",
      title,
      subtitle,
      footnote: str(raw.footnoteDetail, ""),
    };
  }

  return { type: "none" };
}

function mapExperience(value: unknown): ExperienceEntry[] {
  const items = objList(value);
  if (items.length === 0) return baselinePortfolioContent.experience.entries;

  return items.map((item) => ({
    company: str(item.company, ""),
    role: str(item.role, ""),
    dateLabel: dateRangeLabel(item),
    location: str(item.location, ""),
    points: strList(item.achievements, []),
    visual: mapExperienceVisual(item),
  }));
}

function mapProjects(value: unknown): ProjectEntry[] {
  const items = objList(value);
  if (items.length === 0) return baselinePortfolioContent.projects.projects;

  return items.map((item) => {
    const links = obj(item.links);
    return {
      title: str(item.title, ""),
      description: str(item.summary, ""),
      stack: strList(item.technologies, []),
      featured: bool(item.featured),
      status: strOrNull(item.status),
      links: {
        github: strOrNull(links.github),
        frontend: strOrNull(links.frontend),
        backend: strOrNull(links.backend),
        live: strOrNull(links.live),
      },
    };
  });
}

type MappedSkills = Pick<
  PortfolioContent["skills"],
  "coreStack" | "groups"
>;

function mapSkillCategories(value: unknown): MappedSkills | null {
  const categories = objList(value);
  if (categories.length === 0) return null;

  const core: (CoreSkill & { order: number; seq: number })[] = [];
  let seq = 0;

  const groups = categories.map((category) => {
    const skills = objList(category.skills);

    for (const skill of skills) {
      if (!bool(skill.isCore)) continue;
      const name = str(skill.name, "");
      if (!name) continue;
      core.push({
        name,
        note: str(skill.note, ""),
        order: num(skill.coreOrder, Number.MAX_SAFE_INTEGER),
        seq: seq++,
      });
    }

    return {
      title: str(category.title, ""),
      iconKey: icon(category.iconKey, "shapes"),
      compact: bool(category.compact),
      items: skills
        .map((skill) => str(skill.name, ""))
        .filter((name) => name.length > 0),
    };
  });

  // `coreOrder` drives the featured strip; ties keep document/array order.
  core.sort((a, b) => a.order - b.order || a.seq - b.seq);

  return {
    coreStack: core.map(({ name, note }) => ({ name, note })),
    groups,
  };
}

function mapPreviewMessages(
  value: unknown,
  fallback: AssistantPreviewMessage[],
): AssistantPreviewMessage[] {
  const items = objList(value);
  if (items.length === 0) return fallback;
  return items.map((item) => ({
    role: item.role === "user" ? "user" : "assistant",
    text: str(item.text, ""),
  }));
}

/* ------------------------------------------------------------------ *
 * Entry point
 * ------------------------------------------------------------------ */

function mapPortfolio(raw: PortfolioQueryResult): PortfolioContent {
  const base = baselinePortfolioContent;

  const site = obj(raw.site);
  const home = obj(raw.home);
  const hero = obj(home.hero);
  const aiAssistant = obj(home.aiAssistant);
  const about = obj(home.about);
  const skills = obj(home.skills);
  const projectsMeta = obj(home.projects);
  const contact = obj(home.contact);
  const assistant = obj(raw.assistant);

  const resume = obj(site.resume);
  const resumeUrl = strOrNull(resume.url);
  const downloadName =
    strOrNull(resume.downloadName) ??
    strOrNull(resume.originalFilename) ??
    "CV.pdf";

  const seo = obj(site.seo);
  const mappedSkills = mapSkillCategories(raw.skillCategories);

  const education = objList(raw.education);
  const contributions = objList(raw.contributions);

  return {
    site: {
      fullName: str(site.fullName, base.site.fullName),
      shortName: str(site.shortName, base.site.shortName),
      initials: str(site.initials, base.site.initials),
      role: str(site.role, base.site.role),
      location: str(site.location, base.site.location),
      timezone: str(site.timezone, base.site.timezone),
      email: str(site.email, base.site.email),
      nav: (() => {
        const items = objList(site.nav);
        if (items.length === 0) return base.site.nav;
        return items.map((item) => ({
          label: str(item.label, ""),
          href: str(item.href, "#"),
        }));
      })(),
      navCta: {
        label: str(obj(site.navCta).label, base.site.navCta.label),
        href: str(obj(site.navCta).href, base.site.navCta.href),
      },
      resume: resumeUrl
        ? {
            // `?dl=` turns the CDN url into a real download with a stable name.
            downloadUrl: `${resumeUrl}?dl=${encodeURIComponent(downloadName)}`,
            label: str(resume.label, base.site.resume?.label ?? "Download CV"),
            updatedAt: strOrNull(resume.updatedAt),
          }
        : base.site.resume,
      seo: {
        title: str(seo.title, base.site.seo.title),
        description: str(seo.description, base.site.seo.description),
        ogImage: toImageValue(seo.ogImage as RawImage, {
          width: 1200,
          height: 630,
          alt: str(site.fullName, base.site.fullName),
        }),
      },
    },

    hero: {
      availabilityBadge: str(
        hero.availabilityBadge,
        base.hero.availabilityBadge,
      ),
      secondaryBadges: strList(
        hero.secondaryBadges,
        base.hero.secondaryBadges,
      ),
      roleLine: str(hero.roleLine, base.hero.roleLine),
      headlineBefore: str(hero.headlineBefore, base.hero.headlineBefore),
      headlineHighlight: str(
        hero.headlineHighlight,
        base.hero.headlineHighlight,
      ),
      headlineAfter: str(hero.headlineAfter, base.hero.headlineAfter),
      intro: str(hero.intro, base.hero.intro),
      resumeCtaLabel: str(hero.resumeCtaLabel, base.hero.resumeCtaLabel),
      assistantCtaLabel: str(
        hero.assistantCtaLabel,
        base.hero.assistantCtaLabel,
      ),
      stats: (() => {
        const items = objList(hero.stats);
        if (items.length === 0) return base.hero.stats;
        return items.map((item, index) => ({
          label: str(item.label, base.hero.stats[index]?.label ?? ""),
          value: str(item.value, base.hero.stats[index]?.value ?? ""),
          detail: str(item.detail, base.hero.stats[index]?.detail ?? ""),
          iconKey: icon(item.iconKey, "trendingUp"),
        }));
      })(),
      portrait:
        toImageValue(hero.portrait as RawImage, {
          width: 640,
          height: 800,
          alt: str(site.fullName, base.site.fullName),
        }) ?? base.hero.portrait,
      focusLabel: str(hero.focusLabel, base.hero.focusLabel),
      focusTitle: str(hero.focusTitle, base.hero.focusTitle),
      focusDescription: str(
        hero.focusDescription,
        base.hero.focusDescription,
      ),
      stackLabel: str(hero.stackLabel, base.hero.stackLabel),
      stack: strList(hero.stack, base.hero.stack),
    },

    aiAssistant: {
      kicker: str(aiAssistant.kicker, base.aiAssistant.kicker),
      heading: str(aiAssistant.heading, base.aiAssistant.heading),
      description: str(aiAssistant.description, base.aiAssistant.description),
      ctaLabel: str(aiAssistant.ctaLabel, base.aiAssistant.ctaLabel),
      samplePrompts: strList(
        aiAssistant.samplePrompts,
        base.aiAssistant.samplePrompts,
      ),
      previewTitle: str(
        aiAssistant.previewTitle,
        base.aiAssistant.previewTitle,
      ),
      previewSubtitle: str(
        aiAssistant.previewSubtitle,
        base.aiAssistant.previewSubtitle,
      ),
      previewMessages: mapPreviewMessages(
        aiAssistant.previewMessages,
        base.aiAssistant.previewMessages,
      ),
    },

    about: {
      header: header(about.header, base.about.header),
      impactTitle: str(about.impactTitle, base.about.impactTitle),
      impactPoints: strList(about.impactPoints, base.about.impactPoints),
      educationLabel: str(about.educationLabel, base.about.educationLabel),
      education:
        education.length > 0
          ? education.map((item) => ({
              degree: str(item.degree, ""),
              institution: str(item.institution, ""),
              meta: str(item.meta, ""),
            }))
          : base.about.education,
      contributions:
        contributions.length > 0
          ? contributions.map((item) => ({
              label: str(item.label, "Technical contributions"),
              title: str(item.title, ""),
              description: str(item.summary, ""),
              linkLabel: str(item.linkLabel, "View contribution"),
              url: str(item.url, "#"),
            }))
          : base.about.contributions,
    },

    skills: {
      header: header(skills.header, base.skills.header),
      coreKicker: str(skills.coreKicker, base.skills.coreKicker),
      coreHeading: str(skills.coreHeading, base.skills.coreHeading),
      coreDescription: str(
        skills.coreDescription,
        base.skills.coreDescription,
      ),
      coreStack:
        mappedSkills && mappedSkills.coreStack.length > 0
          ? mappedSkills.coreStack
          : base.skills.coreStack,
      toolkitKicker: str(skills.toolkitKicker, base.skills.toolkitKicker),
      toolkitDescription: str(
        skills.toolkitDescription,
        base.skills.toolkitDescription,
      ),
      groups: mappedSkills?.groups ?? base.skills.groups,
    },

    experience: {
      header: header(home.experienceHeader, base.experience.header),
      entries: mapExperience(raw.experience),
    },

    projects: {
      header: header(projectsMeta.header, base.projects.header),
      featuredLabel: str(
        projectsMeta.featuredLabel,
        base.projects.featuredLabel,
      ),
      projects: mapProjects(raw.projects),
    },

    contact: {
      header: header(contact.header, base.contact.header),
      availabilityLabel: str(
        contact.availabilityLabel,
        base.contact.availabilityLabel,
      ),
      preferredChannelLabel: str(
        contact.preferredChannelLabel,
        base.contact.preferredChannelLabel,
      ),
      email: str(site.email, base.contact.email),
      directChannels: channels(
        contact.directChannels,
        base.contact.directChannels,
      ),
      profilesLabel: str(contact.profilesLabel, base.contact.profilesLabel),
      profiles: channels(contact.profiles, base.contact.profiles),
      meta: (() => {
        const items = objList(contact.meta);
        if (items.length === 0) return base.contact.meta;
        return items.map((item) => ({
          iconKey: icon(item.iconKey, "mapPin"),
          label: str(item.label, ""),
        }));
      })(),
      assistantLinkLabel: str(
        contact.assistantLinkLabel,
        base.contact.assistantLinkLabel,
      ),
      copyrightName: str(
        contact.copyrightName,
        str(site.fullName, base.contact.copyrightName),
      ),
    },

    assistant: {
      title: str(assistant.title, base.assistant.title),
      greeting: str(assistant.greeting, base.assistant.greeting),
      quickQuestions: strList(
        assistant.quickQuestions,
        base.assistant.quickQuestions,
      ),
      inputPlaceholder: str(
        assistant.inputPlaceholder,
        base.assistant.inputPlaceholder,
      ),
      fallbackAnswer: str(
        assistant.fallbackAnswer,
        base.assistant.fallbackAnswer,
      ),
    },
  };
}

/**
 * The single content read for the site.
 *
 * Cached under the `portfolio` tag and invalidated by the Sanity publish
 * webhook. Falls back to committed baseline content when Sanity is
 * unconfigured, unreachable, or has not been seeded yet.
 */
export async function getPortfolioContent(): Promise<PortfolioContent> {
  const raw = await sanityFetch<PortfolioQueryResult>(portfolioQuery);
  if (!raw?.site) return baselinePortfolioContent;
  return mapPortfolio(raw);
}
