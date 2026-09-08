/**
 * Grid card for a project that doesn't have a case study page yet.
 * `internalTitle` is kept in code (alt text, keys) for future reference --
 * the site itself only ever shows "Coming soon" for these. Deliberately
 * kept as local data rather than Sanity: these have no case-study page, no
 * hero, no body -- a lighter shape than the `project` schema describes.
 */
export interface ComingSoonProject {
  slug: string;
  internalTitle: string;
  image: string;
  hover: string;
}

export const COMING_SOON_PROJECTS: ComingSoonProject[] = [
  {
    slug: "lodge-bedroom",
    internalTitle: "The Lodge Bedroom",
    image: "/projects/lb-tn.png",
    hover: "/projects/lb-hover.png",
  },
  {
    slug: "hauser-residence",
    internalTitle: "Hauser Residence",
    image: "/projects/hr-tn.png",
    hover: "/projects/hr-hover.png",
  },
  {
    slug: "the-54",
    internalTitle: "The 54",
    image: "/projects/the-54-tn.png",
    hover: "/projects/the-54-hover.png",
  },
];
