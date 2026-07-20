# JP1 — Jones + Poet

Website for Jones + Poet, an interior design studio. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

## Intro Animation

`components/intro-animation/IntroAnimation.tsx` is a full-screen client-side overlay shown on first load of the homepage:

- The "J" mark drops in from above, the "P" mark rises in from below, registered to overlap at a fixed offset (P sits 39px right / 31px down from J).
- The wordmark and "Interior Design" subtext fade in after the marks settle.
- Background is a triptych interior photograph.
- Clicking (or pressing Enter/Space) anywhere dismisses the overlay into the site.
- Gated by `sessionStorage` so it only plays once per session; respects `prefers-reduced-motion`.
