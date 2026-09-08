import { defineQuery } from "next-sanity";

/**
 * Grid cards: thumbnail/hover for the crossfade, plus heroImage so the
 * click-transition has an image to animate into before navigation completes.
 */
export const projectsForGridQuery = defineQuery(`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    thumbnail,
    hoverImage,
    heroImage
  }
`);

/** All slugs, for generateStaticParams. */
export const projectSlugsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)][].slug.current
`);

/**
 * Full case-study document for a single project page. Includes thumbnail so
 * the backward transition has a thumbSrc to animate into when returning to
 * the grid.
 */
export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    thumbnail,
    heroImage,
    description,
    body
  }
`);
