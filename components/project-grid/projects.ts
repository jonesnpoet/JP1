export interface Project {
  slug: string;
  title: string;
  /** Photo shown by default. */
  image: string;
  /** Sketch cross-faded in on hover/focus. */
  sketch: string;
  /** Full landscape scene, used as the case study page's hero (1537x1023). */
  hero: string;
}

// Real photo/sketch/hero sets, dropped in at /public/projects/. Titles are
// still placeholders pending the final project name/location list.
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
  },
];
