import type { SchemaTypeDefinition } from "sanity";

import {
  assistantSettings,
  contribution,
  education,
  experience,
  project,
  skillCategory,
} from "./documents/collections";
import { homePage } from "./documents/homePage";
import { siteSettings } from "./documents/siteSettings";
import {
  contactChannel,
  contactMeta,
  heroStat,
  metric,
  navItem,
  previewMessage,
  projectLinks,
  resumeFile,
  sectionHeader,
  seo,
  skill,
  workflowPhase,
} from "./objects/shared";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons
  siteSettings,
  homePage,
  assistantSettings,

  // Collections
  experience,
  project,
  skillCategory,
  education,
  contribution,

  // Objects
  navItem,
  sectionHeader,
  seo,
  heroStat,
  previewMessage,
  contactChannel,
  contactMeta,
  metric,
  workflowPhase,
  skill,
  projectLinks,
  resumeFile,
];
