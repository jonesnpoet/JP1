"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { canela } from "@/components/fonts";
import { useIntroReady } from "@/components/site-intro/intro-ready-context";
import { useProjectTransition } from "@/components/project-transition/project-transition-context";
import ProjectImage from "@/components/project-image/ProjectImage";
import { COMING_SOON_PROJECTS, PROJECTS, type ComingSoonProject, type Project } from "./projects";
import styles from "./ProjectGrid.module.css";

const STAGGER_MS = 80;
// Matches .imageWrap's transition-duration in ProjectGrid.module.css.
const IMAGE_FADE_MS = 600;
const TOTAL_CARDS = PROJECTS.length + COMING_SOON_PROJECTS.length;

export default function ProjectGrid() {
  const imagesReady = useIntroReady();
  const [titlesReady, setTitlesReady] = useState(false);

  useEffect(() => {
    if (!imagesReady) return;
    // Titles don't start until every staggered image has finished fading in
    // (stage 3 completes before stage 4 begins).
    const lastImageDelay = (TOTAL_CARDS - 1) * STAGGER_MS;
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
      {COMING_SOON_PROJECTS.map((project, i) => (
        <ComingSoonCard
          key={project.slug}
          project={project}
          index={PROJECTS.length + i}
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
          canela.className,
          styles.caption,
          titlesReady && styles.ready,
          isActive && styles.fadingAway,
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

// No case study page exists yet, so this renders as a static (non-clickable)
// card -- same thumbnail/hover image treatment as ProjectCard, but no Link,
// no click transition, and the caption always reads "Coming soon" on the
// site even though the real project name lives in code (alt text, slug).
function ComingSoonCard({
  project,
  index,
  imagesReady,
  titlesReady,
}: {
  project: ComingSoonProject;
  index: number;
  imagesReady: boolean;
  titlesReady: boolean;
}) {
  return (
    <div className={styles.staticCard}>
      <div
        className={[styles.imageWrap, imagesReady && styles.ready].filter(Boolean).join(" ")}
        style={{ transitionDelay: imagesReady ? `${index * STAGGER_MS}ms` : "0ms" }}
      >
        <ProjectImage title={project.internalTitle} image={project.image} sketch={project.hover} />
      </div>
      <p
        className={[canela.className, styles.caption, titlesReady && styles.ready]
          .filter(Boolean)
          .join(" ")}
        style={{ transitionDelay: titlesReady ? `${index * STAGGER_MS}ms` : "0ms" }}
      >
        Coming soon
      </p>
    </div>
  );
}
