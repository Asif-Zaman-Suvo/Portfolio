import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

import { dataset, isSanityConfigured, projectId } from "@/sanity/env";
import type { ImageValue } from "@/sanity/types";

/**
 * Raw shape projected by the portfolio query. `asset` is kept as a reference so
 * the URL builder can apply hotspot/crop rather than serving the original file.
 */
export type RawImage = {
  asset?: { _ref?: string | null } | null;
  hotspot?: unknown;
  crop?: unknown;
  alt?: string | null;
  lqip?: string | null;
} | null;

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error("Sanity is not configured; cannot build image URLs.");
  }
  return builder.image(source);
}

/**
 * Converts a CMS image into a plain, serializable value for client sections.
 *
 * URLs are built on the server so the browser never ships the image-url builder
 * and the CDN transform (crop, format negotiation) is decided once at render.
 */
export function toImageValue(
  raw: RawImage,
  options: { width: number; height: number; alt: string },
): ImageValue | null {
  if (!raw?.asset?._ref || !builder) return null;

  const src = urlFor(raw as SanityImageSource)
    .width(options.width)
    .height(options.height)
    .fit("crop")
    .auto("format")
    .url();

  return {
    src,
    alt: raw.alt?.trim() || options.alt,
    width: options.width,
    height: options.height,
    lqip: raw.lqip ?? null,
  };
}
