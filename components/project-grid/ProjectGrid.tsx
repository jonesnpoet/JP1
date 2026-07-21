"use client";

import { useIntroReady } from "@/components/site-intro/intro-ready-context";
import ProjectImage from "@/components/project-image/ProjectImage";
import { PLACEHOLDER_PROJECTS } from "./placeholder-projects";
import styles from "./ProjectGrid.module.css";

const STAGGER_MS = 80;

// Swap PLACEHOLDER_PROJECTS for real entries once photos land under
// public/projects/<slug>/photo.jpg and public/projects/<slug>/sketch.jpg.
export default function ProjectGrid() {
  const ready = useIntroReady();

  return (
    <div className={styles.grid}>
      {PLACEHOLDER_PROJECTS.map((project, i) => (
        <div
          key={project.slug}
          className={[styles.card, ready && styles.ready].filter(Boolean).join(" ")}
          style={{ transitionDelay: ready ? `${i * STAGGER_MS}ms` : "0ms" }}
        >
          <ProjectImage title={project.title} image={project.image} sketch={project.sketch} />
          <p className={styles.caption}>{project.title}</p>
        </div>
      ))}
    </div>
  );
}
