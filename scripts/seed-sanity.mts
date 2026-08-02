/**
 * One-shot migration of the committed baseline content into Sanity.
 *
 *   npm run seed          # create missing documents, never overwrite
 *   npm run seed -- --force   # replace existing documents too
 *
 * Requires SANITY_API_WRITE_TOKEN (Editor role) plus the public project vars.
 * After seeding, Sanity is the source of truth — this script is not part of the
 * normal workflow and should not be re-run casually.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { createClient } from "@sanity/client";

import { baselinePortfolioContent } from "../sanity/baseline.ts";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();
const force = process.argv.includes("--force");

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID.");
  process.exit(1);
}
if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN. Create an Editor token in sanity.io/manage.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-05-15",
  useCdn: false,
});

const content = baselinePortfolioContent;

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Employment dates. The rendered label is derived from these in the app, so the
 * baseline's pre-formatted strings are not carried over.
 */
const EMPLOYMENT_DATES: Record<
  string,
  { startDate: string; endDate?: string; isCurrent: boolean }
> = {
  "SELISE Group": { startDate: "2022-07-01", isCurrent: true },
  ReformedTech: {
    startDate: "2021-10-01",
    endDate: "2022-06-01",
    isCurrent: false,
  },
  "eGeneration LTD": {
    startDate: "2021-01-01",
    endDate: "2021-07-01",
    isCurrent: false,
  },
};

type Doc = Record<string, unknown> & { _id: string; _type: string };

async function uploadPortrait(): Promise<Doc["_id"] | null> {
  const file = path.join(process.cwd(), "public", "profile-photo.png");
  try {
    const buffer = await readFile(file);
    // Sanity dedupes by content hash, so re-running does not create duplicates.
    const asset = await client.assets.upload("image", buffer, {
      filename: "profile-photo.png",
    });
    console.log(`  uploaded portrait → ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.warn(
      `  portrait upload skipped: ${error instanceof Error ? error.message : error}`,
    );
    return null;
  }
}

function buildSkillCategories(): Doc[] {
  const coreIndex = new Map(
    content.skills.coreStack.map((skill, index) => [
      skill.name,
      { note: skill.note, order: index },
    ]),
  );

  return content.skills.groups.map((group, groupIndex) => ({
    _id: `skillCategory-${slug(group.title)}`,
    _type: "skillCategory",
    title: group.title,
    iconKey: group.iconKey,
    compact: group.compact,
    sortOrder: (groupIndex + 1) * 10,
    hidden: false,
    skills: group.items.map((name) => {
      const core = coreIndex.get(name);
      return {
        _key: slug(name),
        _type: "skill",
        name,
        isCore: Boolean(core),
        ...(core ? { note: core.note, coreOrder: core.order } : {}),
      };
    }),
  }));
}

function buildExperience(): Doc[] {
  return content.experience.entries.map((entry, index) => {
    const dates = EMPLOYMENT_DATES[entry.company] ?? {
      startDate: "2021-01-01",
      isCurrent: false,
    };

    const visual = entry.visual;
    const visualFields: Record<string, unknown> = { visualType: visual.type };

    if (visual.type !== "none") {
      visualFields.visualTitle = visual.title;
      visualFields.visualSubtitle = visual.subtitle;
    }
    if (visual.type === "metrics") {
      visualFields.metrics = visual.metrics.map((metric) => ({
        _key: slug(metric.label),
        _type: "metric",
        ...metric,
      }));
    }
    if (visual.type === "workflow") {
      visualFields.phases = visual.phases.map((phase) => ({
        _key: slug(phase.label),
        _type: "workflowPhase",
        ...phase,
      }));
      visualFields.footnoteTitle = visual.footnoteTitle;
      visualFields.footnoteDetail = visual.footnoteDetail;
    }
    if (visual.type === "coverage") {
      visualFields.footnoteDetail = visual.footnote;
    }

    return {
      _id: `experience-${slug(entry.company)}`,
      _type: "experience",
      company: entry.company,
      role: entry.role,
      location: entry.location,
      achievements: entry.points,
      sortOrder: (index + 1) * 10,
      hidden: false,
      ...dates,
      ...visualFields,
    };
  });
}

function buildProjects(): Doc[] {
  return content.projects.projects.map((project, index) => ({
    _id: `project-${slug(project.title)}`,
    _type: "project",
    title: project.title,
    slug: { _type: "slug", current: slug(project.title) },
    summary: project.description,
    technologies: project.stack,
    featured: project.featured,
    ...(project.status ? { status: project.status } : {}),
    links: {
      _type: "projectLinks",
      ...(project.links.live ? { live: project.links.live } : {}),
      ...(project.links.github ? { github: project.links.github } : {}),
      ...(project.links.frontend ? { frontend: project.links.frontend } : {}),
      ...(project.links.backend ? { backend: project.links.backend } : {}),
    },
    sortOrder: (index + 1) * 10,
    hidden: false,
  }));
}

function keyed<T extends Record<string, unknown>>(
  items: T[],
  type: string,
  keyOf: (item: T, index: number) => string,
): (T & { _key: string; _type: string })[] {
  return items.map((item, index) => ({
    ...item,
    _key: slug(keyOf(item, index)) || `item-${index}`,
    _type: type,
  }));
}

function buildSingletons(portraitAssetId: string | null): Doc[] {
  const { site, hero, aiAssistant, about, skills, projects, contact, assistant } =
    content;

  return [
    {
      _id: "siteSettings",
      _type: "siteSettings",
      fullName: site.fullName,
      shortName: site.shortName,
      initials: site.initials,
      role: site.role,
      location: site.location,
      timezone: site.timezone,
      email: site.email,
      nav: keyed(site.nav, "navItem", (item) => item.label),
      navCta: { _type: "navItem", ...site.navCta },
      seo: {
        _type: "seo",
        title: site.seo.title,
        description: site.seo.description,
      },
      // `resume` is intentionally left empty: upload the PDF in the Studio.
    },
    {
      _id: "homePage",
      _type: "homePage",
      hero: {
        availabilityBadge: hero.availabilityBadge,
        secondaryBadges: hero.secondaryBadges,
        roleLine: hero.roleLine,
        headlineBefore: hero.headlineBefore,
        headlineHighlight: hero.headlineHighlight,
        headlineAfter: hero.headlineAfter,
        intro: hero.intro,
        resumeCtaLabel: hero.resumeCtaLabel,
        assistantCtaLabel: hero.assistantCtaLabel,
        stats: keyed(hero.stats, "heroStat", (item) => item.label),
        ...(portraitAssetId
          ? {
              portrait: {
                _type: "image",
                asset: { _type: "reference", _ref: portraitAssetId },
                alt: site.fullName,
              },
            }
          : {}),
        focusLabel: hero.focusLabel,
        focusTitle: hero.focusTitle,
        focusDescription: hero.focusDescription,
        stackLabel: hero.stackLabel,
        stack: hero.stack,
      },
      aiAssistant: {
        kicker: aiAssistant.kicker,
        heading: aiAssistant.heading,
        description: aiAssistant.description,
        ctaLabel: aiAssistant.ctaLabel,
        samplePrompts: aiAssistant.samplePrompts,
        previewTitle: aiAssistant.previewTitle,
        previewSubtitle: aiAssistant.previewSubtitle,
        previewMessages: keyed(
          aiAssistant.previewMessages,
          "previewMessage",
          (_item, index) => `message-${index}`,
        ),
      },
      about: {
        header: { _type: "sectionHeader", ...about.header },
        impactTitle: about.impactTitle,
        impactPoints: about.impactPoints,
        educationLabel: about.educationLabel,
      },
      skills: {
        header: { _type: "sectionHeader", ...skills.header },
        coreKicker: skills.coreKicker,
        coreHeading: skills.coreHeading,
        coreDescription: skills.coreDescription,
        toolkitKicker: skills.toolkitKicker,
        toolkitDescription: skills.toolkitDescription,
      },
      experienceHeader: {
        _type: "sectionHeader",
        ...content.experience.header,
      },
      projects: {
        header: { _type: "sectionHeader", ...projects.header },
        featuredLabel: projects.featuredLabel,
      },
      contact: {
        header: { _type: "sectionHeader", ...contact.header },
        availabilityLabel: contact.availabilityLabel,
        preferredChannelLabel: contact.preferredChannelLabel,
        directChannels: keyed(
          contact.directChannels,
          "contactChannel",
          (item) => item.label,
        ),
        profilesLabel: contact.profilesLabel,
        profiles: keyed(contact.profiles, "contactChannel", (item) => item.label),
        meta: keyed(contact.meta, "contactMeta", (item) => item.label),
        assistantLinkLabel: contact.assistantLinkLabel,
        copyrightName: contact.copyrightName,
      },
    },
    {
      _id: "assistantSettings",
      _type: "assistantSettings",
      title: assistant.title,
      greeting: assistant.greeting,
      quickQuestions: assistant.quickQuestions,
      inputPlaceholder: assistant.inputPlaceholder,
      fallbackAnswer: assistant.fallbackAnswer,
    },
  ];
}

function buildEducationAndContributions(): Doc[] {
  return [
    ...content.about.education.map((item, index) => ({
      _id: `education-${slug(item.institution)}`,
      _type: "education",
      ...item,
      sortOrder: (index + 1) * 10,
    })),
    ...content.about.contributions.map((item, index) => ({
      _id: `contribution-${slug(item.title)}`,
      _type: "contribution",
      label: item.label,
      title: item.title,
      summary: item.description,
      url: item.url,
      linkLabel: item.linkLabel,
      sortOrder: (index + 1) * 10,
    })),
  ];
}

async function main() {
  console.log(`Seeding ${projectId}/${dataset}${force ? " (force)" : ""}\n`);

  const portraitAssetId = await uploadPortrait();

  const documents: Doc[] = [
    ...buildSingletons(portraitAssetId),
    ...buildExperience(),
    ...buildProjects(),
    ...buildSkillCategories(),
    ...buildEducationAndContributions(),
  ];

  const existing = new Set<string>(
    await client.fetch<string[]>(`*[_id in $ids]._id`, {
      ids: documents.map((doc) => doc._id),
    }),
  );

  const transaction = client.transaction();
  let created = 0;
  let replaced = 0;
  let skipped = 0;

  for (const doc of documents) {
    if (!existing.has(doc._id)) {
      transaction.createIfNotExists(doc);
      created += 1;
    } else if (force) {
      transaction.createOrReplace(doc);
      replaced += 1;
    } else {
      skipped += 1;
    }
  }

  if (created === 0 && replaced === 0) {
    console.log(`\nNothing to do — ${skipped} documents already exist.`);
    console.log("Re-run with `-- --force` to overwrite them.");
    return;
  }

  await transaction.commit();

  console.log(
    `\nDone. created: ${created}, replaced: ${replaced}, skipped: ${skipped}`,
  );
  console.log("Next: upload the CV PDF in Studio → Site settings → Resume.");
}

main().catch((error) => {
  console.error("\nSeed failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
