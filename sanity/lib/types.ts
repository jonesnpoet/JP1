import type { PortableTextBlock } from "sanity";
import type { SanityImageWithAlt } from "./image";

export interface SanityProjectGridItem {
  _id: string;
  title: string;
  slug: string;
  thumbnail: SanityImageWithAlt;
  hoverImage?: SanityImageWithAlt;
  /** Needed up front so the click-transition can animate into it before navigating. */
  heroImage: SanityImageWithAlt;
}

export interface SanityProjectDetail {
  _id: string;
  title: string;
  slug: string;
  /** Needed for the transition's thumbSrc when navigating back to the grid. */
  thumbnail: SanityImageWithAlt;
  heroImage: SanityImageWithAlt;
  description?: string;
  body?: PortableTextBlock[];
}
