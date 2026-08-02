import type { StructureResolver } from "sanity/structure";

/**
 * Singletons are pinned to fixed document ids and surfaced as single editable
 * documents. The default document list is filtered so an editor can never
 * create a second `siteSettings` or `homePage`.
 */
export const SINGLETON_TYPES = [
  "siteSettings",
  "homePage",
  "assistantSettings",
] as const;

export const SINGLETON_IDS: Record<(typeof SINGLETON_TYPES)[number], string> = {
  siteSettings: "siteSettings",
  homePage: "homePage",
  assistantSettings: "assistantSettings",
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Home page")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("AI assistant settings")
        .id("assistantSettings")
        .child(
          S.document()
            .schemaType("assistantSettings")
            .documentId("assistantSettings"),
        ),

      S.divider(),

      S.documentTypeListItem("experience").title("Experience"),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("skillCategory").title("Skill categories"),
      S.documentTypeListItem("education").title("Education"),
      S.documentTypeListItem("contribution").title("Contributions"),
    ]);
