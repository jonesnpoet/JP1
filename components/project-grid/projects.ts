export interface Project {
  slug: string;
  title: string;
  /** Photo shown by default on the homepage grid card. */
  image: string;
  /** Image cross-faded in on hover/focus -- usually a sketch, but can be
   *  any alternate treatment (e.g. a "coming soon" overlay). */
  sketch: string;
  /** Full landscape scene, used as the case study page's hero (1537x1023). */
  hero: string;
  heroAlt: string;
  /** Centered intro copy shown beneath the animated title. */
  description: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "maple-house",
    title: "Maple House",
    image: "/projects/left.png",
    sketch: "/projects/maple-house/left-hover.png",
    hero: "/projects/left-full.png",
    heroAlt: "A bedroom corner in Maple House with a striped armchair, a carved wood dresser, and fresh tulips.",
    description:
      "Maple House is a full residential renovation completed in 2025, reworking roughly 3,200 square feet into a home that feels warm, layered, and considered. The goal was to bring balance to every room — pairing classic forms with rich materials so the finished spaces feel collected over time rather than assembled all at once.",
  },
  {
    slug: "harbor-loft",
    title: "Harbor Loft",
    image: "/projects/mid.png",
    sketch: "/projects/mid-hover1.png",
    hero: "/projects/mid-full.png",
    heroAlt: "A vanity in Harbor Loft with brass fixtures, wood cabinetry, and patterned wallpaper.",
    description:
      "Harbor Loft is a renovation completed in 2025 across approximately 1,800 square feet. The goal was to bring warmth and polish to every surface — brass fixtures, rich wood tones, and softly patterned finishes layered together so the space feels elevated yet lived-in.",
  },
  {
    slug: "birch-residence",
    title: "Birch Residence",
    image: "/projects/right.png",
    sketch: "/projects/right-hover.png",
    hero: "/projects/right-full.png",
    heroAlt: "Walk-in shower in Birch Residence with pale blue vertical tile, brass fixtures, and a marble bench.",
    description:
      "Birch Residence is a bathroom renovation completed in 2025 within a compact 300-square-foot footprint. The goal was to make the most of a small space — soft blue tile, aged brass fixtures, and a restrained material palette combining to create a room that feels calm, elevated, and complete.",
  },
];
