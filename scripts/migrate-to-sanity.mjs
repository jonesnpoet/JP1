// One-time migration: pushes the two hardcoded case studies (Claude Lake
// Home, Fremont Bathroom) into Sanity as the first `project` documents,
// uploading their images from public/ as Sanity assets along the way.
//
// Usage (Node 20+, needs its native --env-file support):
//   node --env-file=.env.local scripts/migrate-to-sanity.mjs
//
// Requires SANITY_API_TOKEN (Editor permission) in addition to the two
// NEXT_PUBLIC_SANITY_* vars -- see the project README / chat writeup for
// where to generate that token. Safe to re-run: uses createOrReplace with
// fixed document IDs.

import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
  return value;
}

const client = createClient({
  projectId: requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: requireEnv("NEXT_PUBLIC_SANITY_DATASET"),
  apiVersion: "2025-01-01",
  token: requireEnv("SANITY_API_TOKEN"),
  useCdn: false,
});

const assetCache = new Map();

/** Uploads public/<relPath> (once per path) and returns its asset _id. */
async function uploadImage(relPath) {
  if (assetCache.has(relPath)) return assetCache.get(relPath);
  const absPath = path.join(PUBLIC_DIR, relPath);
  const filename = path.basename(relPath);
  console.log(`  uploading ${relPath} ...`);
  const asset = await client.assets.upload("image", fs.createReadStream(absPath), { filename });
  assetCache.set(relPath, asset._id);
  return asset._id;
}

async function imageField(relPath, alt) {
  const assetId = await uploadImage(relPath);
  return { _type: "image", asset: { _type: "reference", _ref: assetId }, alt };
}

let keyCounter = 0;
function key() {
  keyCounter += 1;
  return `k${keyCounter}`;
}

function normalBlock(text) {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

async function textImageBlockOf(text, relPath, alt) {
  return { _type: "textImageBlock", _key: key(), text, image: await imageField(relPath, alt) };
}

async function imagePairOf(left, right) {
  const field = { _type: "imagePair", _key: key(), left: await imageField(left.src, left.alt) };
  if (right) field.right = await imageField(right.src, right.alt);
  return field;
}

function calloutOf(text) {
  return { _type: "calloutBlock", _key: key(), text };
}

async function migrateProject({ id, slug, title, order, thumbnail, hover, hero, heroAlt, description, sections }) {
  console.log(`Migrating "${title}" ...`);

  const body = [];
  for (const section of sections) {
    if (section.type === "image-row") {
      const [left, right] = section.images;
      body.push(await imagePairOf(left, right));
    } else if (section.type === "text-image") {
      body.push(await textImageBlockOf(section.text, section.image.src, section.image.alt));
    } else if (section.type === "callout") {
      body.push(calloutOf(section.text));
    } else if (section.type === "text") {
      body.push(normalBlock(section.text));
    }
  }

  const doc = {
    _id: id,
    _type: "project",
    title,
    slug: { _type: "slug", current: slug },
    order,
    description,
    thumbnail: await imageField(thumbnail.src, thumbnail.alt),
    hoverImage: await imageField(hover.src, hover.alt),
    heroImage: await imageField(hero, heroAlt),
    body,
  };

  await client.createOrReplace(doc);
  console.log(`  done: ${id}`);
}

await migrateProject({
  id: "project-maple-house",
  slug: "maple-house",
  title: "The Claude Lake Home",
  order: 1,
  thumbnail: { src: "projects/left.png", alt: "The Claude Lake Home" },
  hover: { src: "projects/left-hover.png", alt: "The Claude Lake Home, hover state" },
  hero: "projects/cl/cl-hero.jpg",
  heroAlt:
    "A warm, deep-red bedroom corner in The Claude Lake Home with a brass table lamp, a striped armchair, and a wall of small sculptural discs.",
  description:
    "The Claude Lake Home brings together color and pattern to create a sense of home that feels curated and deeply personal. The design was approached with intention; weaving meaningful family elements throughout the space. Artwork was commissioned to capture the homeowners' favorite activities.",
  sections: [
    {
      type: "image-row",
      images: [
        {
          src: "projects/cl/1.jpg",
          alt: "A wall of small sculptural ceramic discs above a wood dresser with a brass lamp and fresh flowers in The Claude Lake Home.",
        },
        { src: "projects/cl/2.jpg", alt: "Detail of a floral roman shade in The Claude Lake Home." },
      ],
    },
    {
      type: "image-row",
      images: [
        {
          src: "projects/cl/3.jpg",
          alt: "Built-in wood shelving styled with books, family photos, and keepsakes in The Claude Lake Home.",
        },
        {
          src: "projects/cl/cl-2.gif",
          alt: 'Animated title card reading "Claude Lake" in a serif wordmark, from The Claude Lake Home.',
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
          src: "projects/cl/4.jpg",
          alt: "View through a doorway into a bedroom with a floral roman shade and brass bedside lamp in The Claude Lake Home.",
        },
        {
          src: "projects/cl/5.jpg",
          alt: "Commissioned artwork depicting the homeowners' favorite activities, framed in gold above striped armchairs in The Claude Lake Home.",
        },
      ],
    },
    {
      type: "image-row",
      images: [
        {
          src: "projects/cl/6.jpg",
          alt: "Floating shelves styled with sculpture, books, and family photos in The Claude Lake Home.",
        },
      ],
    },
  ],
});

await migrateProject({
  id: "project-birch-residence",
  slug: "birch-residence",
  title: "Fremont Bathroom",
  order: 2,
  thumbnail: { src: "projects/right.png", alt: "Fremont Bathroom" },
  hover: { src: "projects/right-hover.png", alt: "Fremont Bathroom, hover state" },
  hero: "projects/right-full.png",
  heroAlt: "Walk-in shower in Birch Residence with pale blue vertical tile, brass fixtures, and a marble bench.",
  description:
    "The Fremont Bathroom was designed with the guest experience at the forefront while maintaining a seamless connection to the rest of the home. A palette of blues and creams is layered with Peruvian walnut, while warm, even lighting keeps the space feeling inviting. Vertically stacked tile adds a subtle sense of height, paired with muted Art Deco swan wallpaper and custom wainscoting.",
  sections: [
    {
      type: "text-image",
      text: "The custom towel niche was designed to feel like part of the architecture, not an afterthought — one more example of how every inch of this room was made to earn its place.",
      image: {
        src: "projects/birch-residence/image-994.png",
        alt: "Vanity mirror reflecting a built-in wood towel niche with rolled towels and fresh flowers in Birch Residence.",
      },
    },
    {
      type: "image-row",
      images: [
        {
          src: "projects/birch-residence/image-996.png",
          alt: "Walk-in shower in Birch Residence with blue tile, a brass grab bar, and a glass niche for bath products.",
        },
        {
          src: "projects/birch-residence/image-997.png",
          alt: "Detail of the brass handheld shower and valve against blue tile in Birch Residence.",
        },
      ],
    },
    {
      type: "image-row",
      images: [
        {
          src: "projects/birch-residence/image-998.png",
          alt: "A welcome card and vintage-style key styled on the vanity in Birch Residence.",
        },
        {
          src: "projects/birch-residence/image-1002.gif",
          alt: 'Animated title card reading "The Fremont Bathroom" in a serif wordmark, from Birch Residence.',
        },
      ],
    },
    {
      type: "image-row",
      images: [
        {
          src: "projects/birch-residence/image-999.png",
          alt: "Custom wood towel niche between two doors in the Birch Residence hallway.",
        },
        {
          src: "projects/birch-residence/image-1001.png",
          alt: "View toward the vanity and linen closet in the Birch Residence bathroom.",
        },
      ],
    },
    { type: "callout", text: "A strip of fluted wood finishes the wainscoting, adding a quiet layer of detail to the space." },
    {
      type: "image-row",
      images: [
        {
          src: "projects/birch-residence/image-1000.png",
          alt: "Wood vanity with brass hardware and a mirror reflecting the shower in Birch Residence.",
        },
      ],
    },
  ],
});

console.log("Migration complete.");
