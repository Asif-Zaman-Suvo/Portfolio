/**
 * Sanity environment access.
 *
 * The portfolio must build and render even before a Sanity project exists, so
 * a missing project id is a supported state rather than a thrown error. When
 * unconfigured the content layer falls back to the committed baseline content.
 */

function read(name: string): string {
  const raw = process.env[name];
  return typeof raw === "string" ? raw.trim() : "";
}

export const projectId = read("NEXT_PUBLIC_SANITY_PROJECT_ID");
export const dataset = read("NEXT_PUBLIC_SANITY_DATASET") || "production";
export const apiVersion = read("NEXT_PUBLIC_SANITY_API_VERSION") || "2026-05-15";

export const isSanityConfigured = projectId.length > 0;

/** Single cache tag invalidated by the Sanity publish webhook. */
export const PORTFOLIO_TAG = "portfolio";

/**
 * Recovery-only time based revalidation. On-demand webhook invalidation is the
 * primary freshness mechanism; this only bounds staleness if a webhook is lost.
 */
export const PORTFOLIO_REVALIDATE_SECONDS = 60 * 60 * 24;
