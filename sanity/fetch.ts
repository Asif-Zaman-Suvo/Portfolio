import "server-only";

import { sanityClient } from "@/sanity/client";
import { PORTFOLIO_REVALIDATE_SECONDS, PORTFOLIO_TAG } from "@/sanity/env";

/**
 * Single fetch policy for every server-side CMS read.
 *
 * Responses are cached indefinitely from the app's perspective and refreshed by
 * the signed publish webhook (`/api/revalidate`), with a 24h time-based
 * fallback purely as recovery for a dropped webhook.
 *
 * Returns `null` instead of throwing: a CMS outage must degrade to baseline
 * content, never take the portfolio down.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!sanityClient) return null;

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: {
        tags: [PORTFOLIO_TAG],
        revalidate: PORTFOLIO_REVALIDATE_SECONDS,
      },
    });
  } catch (error) {
    console.error(
      "[sanity] query failed, falling back to baseline content:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}
