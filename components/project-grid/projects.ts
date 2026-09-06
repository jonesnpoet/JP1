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
  // Normally a pair; a single-element array renders as a solo row (used
  // when an odd insertion leaves one image without a partner).
  | { type: "image-row"; images: [CaseStudyImage] | [CaseStudyImage, CaseStudyImage] }
  | { type: "callout"; text: string }
  | { type: "text"; text: string };

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

/**
 * Grid card for a project that doesn't have a case study page yet.
 * `internalTitle` is kept in code (alt text, keys) for future reference --
 * the site itself only ever shows "Coming soon" for these.
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

export const PROJECTS: Project[] = [
  {
    slug: "maple-house",
    title: "The Claude Lake Home",
    image: "/projects/left.png",
    sketch: "/projects/left-hover.png",
    hero: "/projects/cl/cl-hero.jpg",
    heroAlt: "A warm, deep-red bedroom corner in The Claude Lake Home with a brass table lamp, a striped armchair, and a wall of small sculptural discs.",
    description:
      "The Claude Lake Home brings together color and pattern to create a sense of home that feels curated and deeply personal. The design was approached with intention; weaving meaningful family elements throughout the space. Artwork was commissioned to capture the homeowners' favorite activities.",
    sections: [
      {
        type: "image-row",
        images: [
          {
            src: "/projects/cl/1.jpg",
            alt: "A wall of small sculptural ceramic discs above a wood dresser with a brass lamp and fresh flowers in The Claude Lake Home.",
          },
          {
            src: "/projects/cl/2.jpg",
            alt: "Detail of a floral roman shade in The Claude Lake Home.",
          },
        ],
      },
      {
        type: "image-row",
        images: [
          {
            src: "/projects/cl/3.jpg",
            alt: "Built-in wood shelving styled with books, family photos, and keepsakes in The Claude Lake Home.",
          },
          {
            src: "/projects/cl/cl-2.gif",
            alt: "Animated title card reading \"Claude Lake\" in a serif wordmark, from The Claude Lake Home.",
          },
        ],
      },
      {
        type: "image-row",
        images: [
          {
            src: "/projects/cl/4.jpg",
            alt: "View through a doorway into a bedroom with a floral roman shade and brass bedside lamp in The Claude Lake Home.",
          },
        ],
      },
      {
        type: "text",
        text: "This adds a layer of storytelling and makes the home feel distinctly theirs. The result is a space that feels collected over time. Every detail reflects the people who live there.",
      },
      {
        type: "image-row",
        images: [
          {
            src: "/projects/cl/5.jpg",
            alt: "Commissioned artwork depicting the homeowners' favorite activities, framed in gold above striped armchairs in The Claude Lake Home.",
          },
          {
            src: "/projects/cl/6.jpg",
            alt: "Floating shelves styled with sculpture, books, and family photos in The Claude Lake Home.",
          },
        ],
      },
    ],
  },
  {
    slug: "birch-residence",
    title: "Fremont Bathroom",
    image: "/projects/right.png",
    sketch: "/projects/right-hover.png",
    hero: "/projects/right-full.png",
    heroAlt: "Walk-in shower in Birch Residence with pale blue vertical tile, brass fixtures, and a marble bench.",
    description:
      "The Fremont Bathroom was designed with the guest experience at the forefront while maintaining a seamless connection to the rest of the home. A palette of blues and creams is layered with Peruvian walnut, while warm, even lighting keeps the space feeling inviting. Vertically stacked tile adds a subtle sense of height, paired with muted Art Deco swan wallpaper and custom wainscoting.",
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
            src: "/projects/birch-residence/image-1002.gif",
            alt: "Animated title card reading \"The Fremont Bathroom\" in a serif wordmark, from Birch Residence.",
          },
        ],
      },
      {
        type: "image-row",
        images: [
          {
            src: "/projects/birch-residence/image-999.png",
            alt: "Custom wood towel niche between two doors in the Birch Residence hallway.",
          },
          {
            src: "/projects/birch-residence/image-1001.png",
            alt: "View toward the vanity and linen closet in the Birch Residence bathroom.",
          },
        ],
      },
      {
        type: "callout",
        text: "A strip of fluted wood finishes the wainscoting, adding a quiet layer of detail to the space.",
      },
      {
        type: "image-row",
        images: [
          {
            src: "/projects/birch-residence/image-1000.png",
            alt: "Wood vanity with brass hardware and a mirror reflecting the shower in Birch Residence.",
          },
        ],
      },
    ],
  },
];
