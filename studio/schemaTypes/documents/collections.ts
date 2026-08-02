import { defineArrayMember, defineField, defineType } from "sanity";

import { iconField } from "../objects/shared";

const sortOrderField = (group?: string) =>
  defineField({
    name: "sortOrder",
    title: "Sort order",
    type: "number",
    description: "Lower numbers appear first.",
    initialValue: 100,
    group,
  });

const hiddenField = (group?: string) =>
  defineField({
    name: "hidden",
    title: "Hide from site",
    type: "boolean",
    initialValue: false,
    group,
  });

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  groups: [
    { name: "role", title: "Role", default: true },
    { name: "visual", title: "Side visual" },
  ],
  fields: [
    defineField({ name: "company", type: "string", group: "role", validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Job title", type: "string", group: "role", validation: (rule) => rule.required() }),
    defineField({
      name: "startDate",
      type: "date",
      group: "role",
      options: { dateFormat: "YYYY-MM" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isCurrent",
      title: "Current role",
      type: "boolean",
      group: "role",
      initialValue: false,
    }),
    defineField({
      name: "endDate",
      type: "date",
      group: "role",
      options: { dateFormat: "YYYY-MM" },
      hidden: ({ document }) => document?.isCurrent === true,
    }),
    defineField({ name: "location", type: "string", group: "role" }),
    defineField({
      name: "achievements",
      type: "array",
      group: "role",
      of: [defineArrayMember({ type: "text" })],
      validation: (rule) => rule.required().min(1),
    }),
    sortOrderField("role"),
    hiddenField("role"),

    defineField({
      name: "visualType",
      title: "Visual",
      type: "string",
      group: "visual",
      description:
        "Chooses which side panel renders next to this role. Each type is a coded component.",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Before/after metrics", value: "metrics" },
          { title: "Delivery workflow", value: "workflow" },
          { title: "Bangladesh coverage map", value: "coverage" },
        ],
      },
      initialValue: "none",
    }),
    defineField({
      name: "visualTitle",
      type: "string",
      group: "visual",
      hidden: ({ document }) => !document?.visualType || document.visualType === "none",
    }),
    defineField({
      name: "visualSubtitle",
      type: "string",
      group: "visual",
      hidden: ({ document }) => !document?.visualType || document.visualType === "none",
    }),
    defineField({
      name: "metrics",
      type: "array",
      group: "visual",
      of: [defineArrayMember({ type: "metric" })],
      hidden: ({ document }) => document?.visualType !== "metrics",
    }),
    defineField({
      name: "phases",
      type: "array",
      group: "visual",
      of: [defineArrayMember({ type: "workflowPhase" })],
      hidden: ({ document }) => document?.visualType !== "workflow",
    }),
    defineField({
      name: "footnoteTitle",
      type: "string",
      group: "visual",
      hidden: ({ document }) => document?.visualType !== "workflow",
    }),
    defineField({
      name: "footnoteDetail",
      title: "Footnote",
      type: "string",
      group: "visual",
      hidden: ({ document }) =>
        document?.visualType !== "workflow" && document?.visualType !== "coverage",
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "sortOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "company", subtitle: "role" },
  },
});

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({
      name: "technologies",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featured",
      title: "Featured (spotlight card)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "status",
      type: "string",
      description: 'Optional badge, e.g. "In Progress".',
    }),
    defineField({ name: "links", type: "projectLinks" }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    sortOrderField(),
    hiddenField(),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "sortOrder",
      by: [
        { field: "featured", direction: "desc" },
        { field: "sortOrder", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "summary", media: "image" },
  },
});

export const skillCategory = defineType({
  name: "skillCategory",
  title: "Skill category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    iconField(),
    defineField({
      name: "compact",
      title: "Compact card",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "skills",
      type: "array",
      of: [defineArrayMember({ type: "skill" })],
      validation: (rule) => rule.required().min(1),
    }),
    sortOrderField(),
    hiddenField(),
  ],
  preview: {
    select: { title: "title", skills: "skills" },
    prepare: ({ title, skills }) => ({
      title,
      subtitle: `${Array.isArray(skills) ? skills.length : 0} skills`,
    }),
  },
});

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({ name: "degree", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "institution", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "meta",
      title: "Dates & location",
      type: "string",
      description: 'Free text, e.g. "Mar 2016 — Aug 2021 · Dhaka, Bangladesh".',
    }),
    sortOrderField(),
  ],
  preview: { select: { title: "degree", subtitle: "institution" } },
});

export const contribution = defineType({
  name: "contribution",
  title: "Contribution",
  type: "document",
  fields: [
    defineField({
      name: "label",
      type: "string",
      initialValue: "Technical contributions",
    }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({
      name: "url",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "linkLabel", type: "string" }),
    sortOrderField(),
  ],
  preview: { select: { title: "title", subtitle: "summary" } },
});

export const assistantSettings = defineType({
  name: "assistantSettings",
  title: "AI assistant settings",
  type: "document",
  description:
    "Chat widget copy. The assistant's factual knowledge is generated from the rest of this dataset, not entered here.",
  fields: [
    defineField({ name: "title", type: "string", initialValue: "Ask Asif AI" }),
    defineField({ name: "greeting", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({
      name: "quickQuestions",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(4),
    }),
    defineField({ name: "inputPlaceholder", type: "string" }),
    defineField({
      name: "fallbackAnswer",
      title: "Fallback answer",
      type: "text",
      rows: 2,
      description: "Used when a question falls outside the published content.",
    }),
  ],
  preview: { prepare: () => ({ title: "AI assistant settings" }) },
});
