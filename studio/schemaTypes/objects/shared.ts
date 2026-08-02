import { defineArrayMember, defineField, defineType } from "sanity";

import { ICON_OPTIONS } from "../../../sanity/icon-keys";

/** Icon picker constrained to the keys the app can actually render. */
export const iconField = (name = "iconKey", title = "Icon") =>
  defineField({
    name,
    title,
    type: "string",
    options: { list: ICON_OPTIONS },
    validation: (rule) => rule.required(),
  });

export const navItem = defineType({
  name: "navItem",
  title: "Navigation item",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "href",
      title: "Target",
      type: "string",
      description: "In-page anchor such as #about, or an absolute URL.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const sectionHeader = defineType({
  name: "sectionHeader",
  title: "Section header",
  type: "object",
  fields: [
    defineField({ name: "kicker", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "heading", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "subheading", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "heading", subtitle: "kicker" } },
});

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      options: { hotspot: true },
      description: "Rendered at 1200×630.",
      fields: [defineField({ name: "alt", type: "string" })],
    }),
  ],
});

export const heroStat = defineType({
  name: "heroStat",
  title: "Hero stat",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "value",
      type: "string",
      description: 'Displayed as written, e.g. "5+".',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "detail", type: "string" }),
    iconField(),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

export const previewMessage = defineType({
  name: "previewMessage",
  title: "Preview message",
  type: "object",
  fields: [
    defineField({
      name: "role",
      type: "string",
      options: {
        list: [
          { title: "Assistant", value: "assistant" },
          { title: "Visitor", value: "user" },
        ],
        layout: "radio",
      },
      initialValue: "assistant",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "text", type: "text", rows: 2, validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "text", subtitle: "role" } },
});

export const contactChannel = defineType({
  name: "contactChannel",
  title: "Contact channel",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "value", title: "Display value", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "href",
      type: "url",
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https", "mailto", "tel"] }),
    }),
    iconField(),
    defineField({
      name: "external",
      title: "Open in new tab",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: { select: { title: "label", subtitle: "value" } },
});

export const contactMeta = defineType({
  name: "contactMeta",
  title: "Availability detail",
  type: "object",
  fields: [
    iconField(),
    defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "label" } },
});

export const metric = defineType({
  name: "metric",
  title: "Before/after metric",
  type: "object",
  description:
    "The improvement percentage is calculated from before/after — do not enter it.",
  fields: [
    defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "before", type: "number", validation: (rule) => rule.required() }),
    defineField({ name: "after", type: "number", validation: (rule) => rule.required() }),
    defineField({
      name: "unit",
      type: "string",
      description:
        'Rendered directly after the number for single characters ("s"), otherwise space-separated ("KB", "ms").',
    }),
    defineField({
      name: "decimals",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.min(0).max(3),
    }),
  ],
  preview: { select: { title: "label", subtitle: "after" } },
});

export const workflowPhase = defineType({
  name: "workflowPhase",
  title: "Workflow phase",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
    iconField(),
  ],
  preview: { select: { title: "label" } },
});

export const skill = defineType({
  name: "skill",
  title: "Skill",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "isCore",
      title: "Feature in core stack",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "note",
      title: "Core stack note",
      type: "string",
      description: 'Short caption shown in the core stack, e.g. "UI architecture".',
      hidden: ({ parent }) => !parent?.isCore,
    }),
    defineField({
      name: "coreOrder",
      title: "Core stack order",
      type: "number",
      hidden: ({ parent }) => !parent?.isCore,
    }),
  ],
  preview: { select: { title: "name", subtitle: "note" } },
});

export const projectLinks = defineType({
  name: "projectLinks",
  title: "Links",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({ name: "live", title: "Live site", type: "url" }),
    defineField({ name: "github", title: "Repository", type: "url" }),
    defineField({ name: "frontend", title: "Frontend repository", type: "url" }),
    defineField({ name: "backend", title: "Backend repository", type: "url" }),
  ],
});

export const resumeFile = defineType({
  name: "resumeFile",
  title: "Resume / CV",
  type: "file",
  options: { accept: "application/pdf", storeOriginalFilename: true },
  fields: [
    defineField({
      name: "downloadName",
      title: "Download filename",
      type: "string",
      description: "Filename the visitor's browser saves, including .pdf.",
      initialValue: "Md-Asifuzzaman-Suvo-CV.pdf",
      validation: (rule) =>
        rule.required().custom((value) =>
          typeof value === "string" && value.toLowerCase().endsWith(".pdf")
            ? true
            : "Must end with .pdf",
        ),
    }),
    defineField({
      name: "label",
      title: "Button label",
      type: "string",
      initialValue: "Download CV",
    }),
    defineField({ name: "updatedAt", title: "Last updated", type: "date" }),
  ],
});

export const arrayOf = (type: string) => [defineArrayMember({ type })];
