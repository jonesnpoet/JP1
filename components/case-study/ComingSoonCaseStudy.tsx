"use client";

import { useRef } from "react";
import Link from "next/link";
import { useProjectTransition } from "@/components/project-transition/project-transition-context";
import type { Project } from "@/components/project-grid/projects";
import styles from "./ComingSoonCaseStudy.module.css";

// The inspo GIF is a reel of differently-composed source images, each
// individually letterboxed within a fixed 1920x1080 canvas (bar width
// varies roughly 200-600px per side across the animation -- confirmed by
// sampling frames directly). No single crop can eliminate every frame's
// bars without ruining the more generously-framed ones, so this ratio is
// tuned to fully crop out the *common* case (~200px bars, true for the
// majority of frames) via object-fit: cover; the minority of frames with
// heavier letterboxing may still show a sliver at the edges. Keep in sync
// with .hero's aspect-ratio in ComingSoonCaseStudy.module.css.
export const COMING_SOON_HERO_ASPECT = 1519 / 1080;

export default function ComingSoonCaseStudy({ project }: { project: Project }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { transitioning, beginBackward } = useProjectTransition();
  const media = project.comingSoon?.media;

  const handleBack = (event: React.MouseEvent) => {
    // Let modified/non-primary clicks behave normally (new tab, etc).
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    if (!heroRef.current || !media) return;
    beginBackward({
      slug: project.slug,
      heroSrc: media,
      thumbSrc: project.image,
      originEl: heroRef.current,
    });
  };

  return (
    <>
      <div ref={heroRef} className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media} alt={`${project.title} inspiration reel`} className={styles.heroMedia} />
      </div>
      <div className={[styles.body, transitioning && styles.fadingAway].filter(Boolean).join(" ")}>
        <Link href="/" onClick={handleBack} className={styles.back}>
          ← Back to Projects
        </Link>
        <h1 className={styles.title}>Project coming soon</h1>
        <p className={styles.message}>
          {`${project.title} is still underway. Here’s a preview of what’s inspiring it.`}
        </p>
      </div>
    </>
  );
}
