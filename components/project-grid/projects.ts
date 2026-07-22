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
  /** Sketch cross-faded in on hover/focus. */
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
}

// Real photo/sketch/hero sets, dropped in at /public/projects/. Titles,
// locations, and spec-sheet details are still placeholders pending the
// final project list.
export const PROJECTS: Project[] = [
  {
    slug: "maple-house",
    title: "Maple House",
    image: "/projects/left.png",
    sketch: "/projects/left-hover.png",
    hero: "/projects/left-full.png",
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
