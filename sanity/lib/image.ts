import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "../env";

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

/** Our image fields all carry a sibling `alt` string alongside the asset ref. */
export interface SanityImageWithAlt extends Image {
  alt?: string;
}

export function urlForImage(source: SanityImageWithAlt | undefined) {
  if (!source?.asset?._ref) return undefined;
  return imageBuilder.image(source);
}

/**
 * Sanity asset _refs encode the original file extension as a suffix
 * (e.g. "image-<hash>-1080x1920-gif"). Animated GIFs need to skip both
 * Sanity's own transform params and Next's image optimizer entirely --
 * either one can flatten them to a single static frame, and Next's
 * optimizer times out outright on large ones.
 */
export function isGifImage(source: SanityImageWithAlt | undefined): boolean {
  return source?.asset?._ref?.endsWith("-gif") ?? false;
}
