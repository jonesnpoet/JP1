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

export const COMING_SOON_PROJECTS: ComingSoonProject[] = [];
