/**
 * Studio environment.
 *
 * Project id + dataset are public. They are hard-coded as defaults so
 * `sanity deploy` always embeds them in the Studio bundle — `.env.local` is
 * not reliably inlined into the hosted `*.sanity.studio` build.
 *
 * Override with SANITY_STUDIO_* (or NEXT_PUBLIC_SANITY_*) when needed.
 */

const env = process.env;

export const projectId =
  env.SANITY_STUDIO_PROJECT_ID ||
  env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "b6j8dg73";

export const dataset =
  env.SANITY_STUDIO_DATASET ||
  env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

export const apiVersion =
  env.SANITY_STUDIO_API_VERSION ||
  env.NEXT_PUBLIC_SANITY_API_VERSION ||
  "2026-05-15";
