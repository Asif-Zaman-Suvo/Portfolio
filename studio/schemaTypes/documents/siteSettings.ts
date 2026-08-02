import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "navigation", title: "Navigation" },
    { name: "resume", title: "Resume" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "fullName",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortName",
      type: "string",
      group: "identity",
      description: "Shown next to the logo in the navbar.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "initials",
      type: "string",
      group: "identity",
      description: "Logo mark and portrait fallback.",
      validation: (rule) => rule.required().max(3),
    }),
    defineField({
      name: "role",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "location", type: "string", group: "identity" }),
    defineField({ name: "timezone", type: "string", group: "identity" }),
    defineField({
      name: "email",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required().email(),
    }),

    defineField({
      name: "nav",
      title: "Navigation items",
      type: "array",
      group: "navigation",
      of: [defineArrayMember({ type: "navItem" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "navCta",
      title: "Navigation call to action",
      type: "navItem",
      group: "navigation",
    }),

    defineField({
      name: "resume",
      type: "resumeFile",
      group: "resume",
      description:
        "Replace this PDF and publish to update the download in production. No code change or rebuild required.",
    }),

    defineField({ name: "seo", type: "seo", group: "seo", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: "fullName", subtitle: "role" },
  },
});
