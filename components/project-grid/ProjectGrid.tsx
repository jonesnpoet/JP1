"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useIntroReady } from "@/components/site-intro/intro-ready-context";
import { useProjectTransition } from "@/components/project-transition/project-transition-context";
import ProjectImage from "@/components/project-image/ProjectImage";
import { PROJECTS, type Project } from "./projects";
import styles from "./ProjectGrid.module.css";

const STAGGER_MS = 80;
// Matches .imageWrap's transition-duration in ProjectGrid.module.css.
const IMAGE_FADE_MS = 600;

export default function ProjectGrid() {
  const imagesReady = useIntroReady();
  const [titlesReady, setTitlesReady] = useState(false);

  useEffect(() => {
    if (!imagesReady) return;
    // Titles don't start until every staggered image has finished fading in
    // (stage 3 completes before stage 4 begins).
    const lastImageDelay = (PROJECTS.length - 1) * STAGGER_MS;
    const timer = setTimeout(() => setTitlesReady(true), lastImageDelay + IMAGE_FADE_MS);
    return () => clearTimeout(timer);
  }, [imagesReady]);

  return (
    <div className={styles.list}>
      {PROJECTS.map((project, i) => (
        <ProjectCard
          key={project.slug}
          project={project}
          index={i}
          imagesReady={imagesReady}
          titlesReady={titlesReady}
        />
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  imagesReady,
  titlesReady,
}: {
  project: Project;
  index: number;
  imagesReady: boolean;
  titlesReady: boolean;
}) {
  const { activeSlug, beginForward, registerGridCard } = useProjectTransition();
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGridCard(project.slug, imageWrapRef.current);
  }, [registerGridCard, project.slug]);

  const isActive = activeSlug === project.slug;
  const isOtherFading = activeSlug !== null && !isActive;

  const handleClick = (event: React.MouseEvent) => {
    // Let modified/non-primary clicks behave normally (new tab, etc).
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    if (!imageWrapRef.current) return;
    beginForward({
      slug: project.slug,
      heroSrc: project.hero,
      thumbSrc: project.image,
      originEl: imageWrapRef.current,
    });
  };

  return (
    <Link href={`/projects/${project.slug}`} className={styles.card} onClick={handleClick}>
      <div
        ref={imageWrapRef}
        className={[
          styles.imageWrap,
          imagesReady && styles.ready,
          isActive && styles.hidden,
          isOtherFading && styles.fadingAway,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ transitionDelay: imagesReady ? `${index * STAGGER_MS}ms` : "0ms" }}
      >
        <ProjectImage title={project.title} image={project.image} sketch={project.sketch} />
      </div>
      <p
        className={[
          styles.caption,
          titlesReady && styles.ready,
          (isActive || isOtherFading) && styles.fadingAway,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ transitionDelay: titlesReady ? `${index * STAGGER_MS}ms` : "0ms" }}
      >
        {project.title}
      </p>
    </Link>
  );
}
