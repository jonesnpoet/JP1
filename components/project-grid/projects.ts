export interface CaseStudyImage {
  src: string;
  alt: string;
  /** CSS object-position; defaults to "center". */
  focal?: string;
}

/**
 * Extended case-study content rendered below the hero/title/body intro.
 * Data-driven so each project can opt into the same reusable blocks
 * (asymmetric text+image, two-up image row, centered text callout) once it
 * has enough photography, without duplicating the layout per project.
 */
export type CaseStudySection =
  | { type: "text-image"; text: string; image: CaseStudyImage }
  | { type: "image-row"; images: [CaseStudyImage, CaseStudyImage] }
  | { type: "callout"; text: string };

/**
 * Flat, ordered list of every clickable image on a case study page (hero
 * first, then each section's images in render order). Used to drive the
 * shared Lightbox so "next" from any image steps to whatever comes next on
 * the page, regardless of which row/block it belongs to.
 */
export function getPageImages(project: Project): CaseStudyImage[] {
  const images: CaseStudyImage[] = [{ src: project.hero, alt: project.heroAlt }];
  for (const section of project.sections ?? []) {
    if (section.type === "text-image") images.push(section.image);
    else if (section.type === "image-row") images.push(...section.images);
  }
  return images;
}

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
  /** Extended content below the intro -- see CaseStudySection. */
  sections?: CaseStudySection[];
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
    sections: [
      {
        type: "text-image",
        text: "The custom towel niche was designed to feel like part of the architecture, not an afterthought — one more example of how every inch of this room was made to earn its place.",
        image: {
          src: "/projects/birch-residence/image-994.png",
          alt: "Vanity mirror reflecting a built-in wood towel niche with rolled towels and fresh flowers in Birch Residence.",
        },
      },
      {
        type: "image-row",
        images: [
          {
            src: "/projects/birch-residence/image-996.png",
            alt: "Walk-in shower in Birch Residence with blue tile, a brass grab bar, and a glass niche for bath products.",
          },
          {
            src: "/projects/birch-residence/image-997.png",
            alt: "Detail of the brass handheld shower and valve against blue tile in Birch Residence.",
          },
        ],
      },
      {
        type: "image-row",
        images: [
          {
            src: "/projects/birch-residence/image-998.png",
            alt: "A welcome card and vintage-style key styled on the vanity in Birch Residence.",
          },
          {
            src: "/projects/birch-residence/image-999.png",
            alt: "Custom wood towel niche between two doors in the Birch Residence hallway.",
          },
        ],
      },
      {
        type: "callout",
        text: "A small room, treated like it mattered.",
      },
      {
        type: "image-row",
        images: [
          {
            src: "/projects/birch-residence/image-1001.png",
            alt: "View toward the vanity and linen closet in the Birch Residence bathroom.",
          },
          {
            src: "/projects/birch-residence/image-1000.png",
            alt: "Wood vanity with brass hardware and a mirror reflecting the shower in Birch Residence.",
          },
        ],
      },
    ],
  },
];
