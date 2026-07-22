export interface ProjectDetails {
  type: string;
  program: string;
  location: string;
  year: string;
  area: string;
  client: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Photo shown by default. */
  image: string;
  /** Image cross-faded in on hover/focus -- usually a sketch, but can be
   *  any alternate treatment (e.g. a "coming soon" overlay). */
  sketch: string;
  /** Full landscape scene, used as the case study page's hero (1537x1023). */
  hero: string;
  /** Spec-sheet rows shown beside the case study's plate images. */
  details?: ProjectDetails;
  /**
   * Case study "plate" images below the hero, in display order. Each is
   * pre-composed with its own cream card background baked in (no CSS
   * card treatment needed): [large 1, large 2, sketch detail, matching
   * finished photo].
   */
  plates?: [string, string, string, string];
  /**
   * If set, clicking this card opens a "coming soon" modal with this
   * media instead of navigating to a case study page.
   */
  comingSoon?: {
    media: string;
  };
}

// Real photo/sketch/hero sets, dropped in at /public/projects/. Titles,
// locations, and spec-sheet details are still placeholders pending the
// final project list.
export const PROJECTS: Project[] = [
  {
    slug: "maple-house",
    title: "Maple House",
    image: "/projects/left.png",
    // "Coming soon" overlay (dimmed photo + rotated orange text baked
    // into the image), not a sketch -- this project isn't ready to show
    // its real detail shot yet.
    sketch: "/projects/maple-house/left-hover.png",
    hero: "/projects/left-full.png",
    comingSoon: {
      media: "/projects/maple-house/coming-soon-inspo.gif",
    },
  },
  {
    slug: "harbor-loft",
    title: "Harbor Loft",
    image: "/projects/mid.png",
    sketch: "/projects/mid-hover1.png",
    hero: "/projects/mid-full.png",
  },
  {
    slug: "birch-residence",
    title: "Birch Residence",
    image: "/projects/right.png",
    sketch: "/projects/right-hover.png",
    hero: "/projects/right-full.png",
    details: {
      type: "Residential",
      program: "Interior Design",
      location: "Milwaukee, WI",
      year: "2023",
      area: "300 sq ft",
      client: "Private Residence",
    },
    plates: [
      "/projects/birch-residence/l-1.png",
      "/projects/birch-residence/l-2.png",
      "/projects/birch-residence/l-3.png",
      "/projects/birch-residence/l-4.png",
    ],
  },
];
