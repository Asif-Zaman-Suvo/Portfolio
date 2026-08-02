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
  width?: number | null;
  height?: number | null;
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
  options: {
    width: number;
    height: number;
    alt: string;
    /**
     * `crop` fills the exact box (OG images). `max` keeps the full frame so
     * CSS can position portraits without the CDN already cutting the head off.
     */
    fit?: "crop" | "max";
  },
): ImageValue | null {
  if (!raw?.asset?._ref || !builder) return null;

  const fit = options.fit ?? "crop";
  // Prefer the asset's real pixel size so layout matches the uploaded ratio
  // (e.g. 1024×1536 → 2:3) instead of a hard-coded box.
  const nativeWidth =
    typeof raw.width === "number" && raw.width > 0 ? raw.width : options.width;
  const nativeHeight =
    typeof raw.height === "number" && raw.height > 0
      ? raw.height
      : options.height;

  // Cap CDN width for performance; keep native aspect for layout.
  const width = Math.min(nativeWidth, options.width);
  const height = Math.round((nativeHeight / nativeWidth) * width);

  const image = urlFor(raw as SanityImageSource).width(width).auto("format");

  const src =
    fit === "max"
      ? image.fit("max").url()
      : image.height(height).fit("crop").url();

  return {
    src,
    alt: raw.alt?.trim() || options.alt,
    width,
    height,
    lqip: raw.lqip ?? null,
  };
}
