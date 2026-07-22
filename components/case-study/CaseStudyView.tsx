"use client";

import { useRef } from "react";
import Link from "next/link";
import { useProjectTransition } from "@/components/project-transition/project-transition-context";
import type { Project } from "@/components/project-grid/projects";
import styles from "./CaseStudyView.module.css";

export default function CaseStudyView({ project }: { project: Project }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { transitioning, beginBackward } = useProjectTransition();

  const handleBack = (event: React.MouseEvent) => {
    // Let modified/non-primary clicks behave normally (new tab, etc).
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    if (!heroRef.current) return;
    beginBackward({
      slug: project.slug,
      heroSrc: project.hero,
      thumbSrc: project.image,
      originEl: heroRef.current,
    });
  };

  return (
    <>
      <div ref={heroRef} className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.hero} alt={project.title} className={styles.heroImg} />
      </div>
      <div className={[styles.body, transitioning && styles.fadingAway].filter(Boolean).join(" ")}>
        <Link href="/" onClick={handleBack} className={styles.back}>
          ← Back to Projects
        </Link>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.placeholder}>Additional photos and project details go here.</p>
      </div>
    </>
  );
}
