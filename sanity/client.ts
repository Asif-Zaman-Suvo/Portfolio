import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

/**
 * Read-only client for published content.
 *
 * `null` when no project id is configured so the app can fall back to the
 * committed baseline content instead of failing at import time.
 */
export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Published, cacheable reads only. The site never sends a token to Sanity.
      useCdn: true,
      perspective: "published",
    })
  : null;
