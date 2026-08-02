"use client";

import Image from "next/image";
import { useState } from "react";

import type { ImageValue } from "@/sanity/types";

type SanityImageProps = {
  image: ImageValue | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Rendered instead of the image when the asset is missing or fails to load. */
  fallbackText: string;
  fallbackClassName?: string;
};

/**
 * Renders a CMS image with a graceful text fallback.
 *
 * The CDN url is already built on the server (with hotspot/crop applied), so
 * this component only owns the load-failure state and the LQIP placeholder.
 */
export function SanityImage({
  image,
  className,
  sizes,
  priority,
  fallbackText,
  fallbackClassName,
}: SanityImageProps) {
  const [failed, setFailed] = useState(false);

  if (!image || failed) {
    return <div className={fallbackClassName}>{fallbackText}</div>;
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      className={className}
      {...(image.lqip
        ? { placeholder: "blur" as const, blurDataURL: image.lqip }
        : {})}
      onError={() => setFailed(true)}
    />
  );
}
