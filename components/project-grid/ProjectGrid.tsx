"use client";

import { useEffect, useState } from "react";
import { useIntroReady } from "@/components/site-intro/intro-ready-context";
import ProjectImage from "@/components/project-image/ProjectImage";
import { PLACEHOLDER_PROJECTS } from "./placeholder-projects";
import styles from "./ProjectGrid.module.css";

const STAGGER_MS = 80;
// Matches .imageWrap's transition-duration in ProjectGrid.module.css.
const IMAGE_FADE_MS = 600;

// Large-format presentation: just the first 3 projects for now, large and
// stacked rather than a dense grid. Swap in the final project list (and
// real photo/sketch paths under public/projects/<slug>/) once it's set.
const FEATURED_PROJECTS = PLACEHOLDER_PROJECTS.slice(0, 3);

export default function ProjectGrid() {
  const imagesReady = useIntroReady();
  const [titlesReady, setTitlesReady] = useState(false);

  useEffect(() => {
    if (!imagesReady) return;
    // Titles don't start until every staggered image has finished fading in
    // (stage 3 completes before stage 4 begins).
    const lastImageDelay = (FEATURED_PROJECTS.length - 1) * STAGGER_MS;
    const timer = setTimeout(() => setTitlesReady(true), lastImageDelay + IMAGE_FADE_MS);
    return () => clearTimeout(timer);
  }, [imagesReady]);

  return (
    <div className={styles.list}>
      {FEATURED_PROJECTS.map((project, i) => (
        <div key={project.slug} className={styles.card}>
          <div
            className={[styles.imageWrap, imagesReady && styles.ready].filter(Boolean).join(" ")}
            style={{ transitionDelay: imagesReady ? `${i * STAGGER_MS}ms` : "0ms" }}
          >
            <ProjectImage title={project.title} image={project.image} sketch={project.sketch} />
          </div>
          <p
            className={[styles.caption, titlesReady && styles.ready].filter(Boolean).join(" ")}
            style={{ transitionDelay: titlesReady ? `${i * STAGGER_MS}ms` : "0ms" }}
          >
            {project.title}
          </p>
        </div>
      ))}
    </div>
  );
}
