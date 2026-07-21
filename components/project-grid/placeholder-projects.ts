export interface Project {
  slug: string;
  title: string;
  /** Photo shown by default. Real usage: /projects/<slug>/photo.jpg */
  image: string;
  /** Sketch cross-faded in on hover. Real usage: /projects/<slug>/sketch.jpg */
  sketch: string;
}

// Generated inline so the grid renders something real before actual project
// photography is wired in. Swap `image`/`sketch` for real asset paths once
// they're placed under public/projects/<slug>/ (see ProjectGrid.tsx).
function placeholderPhoto(color: string, label: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="${color}"/><text x="50%" y="50%" font-family="Arial" font-size="28" fill="rgba(0,0,0,0.35)" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function placeholderSketch(label: string) {
  const lines = Array.from({ length: 24 }, (_, i) => {
    const x = i * 40 - 200;
    return `<line x1="${x}" y1="0" x2="${x + 400}" y2="600"/>`;
  }).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="#f5f5f0"/><g stroke="#1c1a17" stroke-width="1" opacity="0.35">${lines}</g><text x="50%" y="50%" font-family="Arial" font-size="22" fill="#1c1a17" text-anchor="middle" dominant-baseline="middle">${label} — sketch</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const PLACEHOLDER_COLORS = ["#c9beae", "#a9b4a4", "#b9a8a1", "#9fb0b8", "#c2b39a", "#a6a597"];

const PLACEHOLDER_TITLES = [
  "Maple House",
  "Harbor Loft",
  "Birch Residence",
  "Cedar Row",
  "Linden Flat",
  "Willow Court",
];

export const PLACEHOLDER_PROJECTS: Project[] = PLACEHOLDER_TITLES.map((title, i) => {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  return {
    slug,
    title,
    image: placeholderPhoto(PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length], title),
    sketch: placeholderSketch(title),
  };
});
