import { defineArrayMember, defineField, defineType } from "sanity";

const text = (name: string, rows = 3) =>
  defineField({ name, type: "text", rows });

/**
 * Copy that belongs to the single landing page.
 *
 * Deliberately not a generic page builder: layout and ordering live in code, so
 * editing stays a matter of filling in known fields rather than assembling
 * blocks. Repeatable data (experience, projects, skills) lives in collections.
 */
export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "assistant", title: "AI assistant" },
    { name: "about", title: "About" },
    { name: "skills", title: "Skills" },
    { name: "experience", title: "Experience" },
    { name: "projects", title: "Projects" },
    { name: "contact", title: "Contact" },
  ],

  fields: [
    defineField({
      name: "hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "availabilityBadge", type: "string" }),
        defineField({
          name: "secondaryBadges",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({ name: "roleLine", type: "string" }),
        defineField({
          name: "headlineBefore",
          title: "Headline — before highlight",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "headlineHighlight",
          title: "Headline — gradient highlight",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "headlineAfter",
          title: "Headline — after highlight",
          type: "string",
        }),
        defineField({
          name: "intro",
          type: "text",
          rows: 4,
          description:
            'Rendered after "I\'m {full name} — ", so start mid-sentence.',
        }),
        defineField({ name: "resumeCtaLabel", type: "string" }),
        defineField({ name: "assistantCtaLabel", type: "string" }),
        defineField({
          name: "stats",
          type: "array",
          of: [defineArrayMember({ type: "heroStat" })],
          validation: (rule) => rule.max(3),
        }),
        defineField({
          name: "portrait",
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string" })],
        }),
        defineField({ name: "focusLabel", type: "string" }),
        defineField({ name: "focusTitle", type: "string" }),
        text("focusDescription"),
        defineField({ name: "stackLabel", type: "string" }),
        defineField({
          name: "stack",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),

    defineField({
      name: "aiAssistant",
      title: "AI assistant section",
      type: "object",
      group: "assistant",
      fields: [
        defineField({ name: "kicker", type: "string" }),
        defineField({ name: "heading", type: "string" }),
        text("description", 4),
        defineField({ name: "ctaLabel", type: "string" }),
        defineField({
          name: "samplePrompts",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({ name: "previewTitle", type: "string" }),
        defineField({ name: "previewSubtitle", type: "string" }),
        defineField({
          name: "previewMessages",
          type: "array",
          of: [defineArrayMember({ type: "previewMessage" })],
        }),
      ],
    }),

    defineField({
      name: "about",
      type: "object",
      group: "about",
      fields: [
        defineField({ name: "header", type: "sectionHeader" }),
        defineField({ name: "impactTitle", type: "string" }),
        defineField({
          name: "impactPoints",
          type: "array",
          of: [defineArrayMember({ type: "text", rows: 2 })],
        }),
        defineField({ name: "educationLabel", type: "string" }),
      ],
    }),

    defineField({
      name: "skills",
      type: "object",
      group: "skills",
      description: "Section copy only — the skills themselves are Skill categories.",
      fields: [
        defineField({ name: "header", type: "sectionHeader" }),
        defineField({ name: "coreKicker", type: "string" }),
        defineField({ name: "coreHeading", type: "string" }),
        text("coreDescription"),
        defineField({ name: "toolkitKicker", type: "string" }),
        text("toolkitDescription"),
      ],
    }),

    defineField({
      name: "experienceHeader",
      title: "Experience section header",
      type: "sectionHeader",
      group: "experience",
    }),

    defineField({
      name: "projects",
      title: "Projects section",
      type: "object",
      group: "projects",
      fields: [
        defineField({ name: "header", type: "sectionHeader" }),
        defineField({ name: "featuredLabel", type: "string" }),
      ],
    }),

    defineField({
      name: "contact",
      title: "Contact section",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "header", type: "sectionHeader" }),
        defineField({ name: "availabilityLabel", type: "string" }),
        defineField({ name: "preferredChannelLabel", type: "string" }),
        defineField({
          name: "directChannels",
          type: "array",
          of: [defineArrayMember({ type: "contactChannel" })],
        }),
        defineField({ name: "profilesLabel", type: "string" }),
        defineField({
          name: "profiles",
          type: "array",
          of: [defineArrayMember({ type: "contactChannel" })],
        }),
        defineField({
          name: "meta",
          title: "Availability details",
          type: "array",
          of: [defineArrayMember({ type: "contactMeta" })],
        }),
        defineField({ name: "assistantLinkLabel", type: "string" }),
        defineField({ name: "copyrightName", type: "string" }),
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: "Home page" }),
  },
});
