import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./env";
import { schemaTypes } from "./schemaTypes";
import { SINGLETON_TYPES, structure } from "./structure";

const singletons = new Set<string>(SINGLETON_TYPES);

export default defineConfig({
  name: "portfolio",
  title: "Portfolio",
  projectId,
  dataset,

  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],

  schema: {
    types: schemaTypes,
    // Singletons are reachable only through the structure entries above.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },

  document: {
    actions: (actions, { schemaType }) =>
      singletons.has(schemaType)
        ? actions.filter(
            ({ action }) =>
              action && ["publish", "discardChanges", "restore"].includes(action),
          )
        : actions,
  },
});
