/**
 * Studio environment.
 *
 * The Sanity CLI only inlines `SANITY_STUDIO_*` variables, so those are the
 * canonical names here. `NEXT_PUBLIC_SANITY_*` is accepted as a fallback for
 * shells and CI where the app's variables are already exported.
 */

const env = process.env;

export const projectId =
  env.SANITY_STUDIO_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const dataset =
  env.SANITY_STUDIO_DATASET || env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const apiVersion =
  env.SANITY_STUDIO_API_VERSION ||
  env.NEXT_PUBLIC_SANITY_API_VERSION ||
  "2026-05-15";

if (!projectId) {
  throw new Error(
    "Missing SANITY_STUDIO_PROJECT_ID. Create studio/.env.local with SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET.",
  );
}
