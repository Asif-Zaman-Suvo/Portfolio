/**
 * The fixed set of icons an editor can choose from.
 *
 * Kept free of React/lucide imports so the Sanity Studio schemas and the app's
 * icon map can share one list. `components/cms/icons.ts` is type-checked
 * against this, so adding a key here forces a matching icon there.
 */
export const ICON_KEYS = [
  "brainCircuit",
  "checkCircle",
  "clock",
  "code",
  "database",
  "flask",
  "gitFork",
  "layers",
  "layoutGrid",
  "link",
  "mail",
  "mapPin",
  "messageCircle",
  "penLine",
  "phone",
  "shapes",
  "trendingUp",
  "wrench",
  "zap",
] as const;

export type IconKey = (typeof ICON_KEYS)[number];

export const ICON_OPTIONS = ICON_KEYS.map((key) => ({ title: key, value: key }));
