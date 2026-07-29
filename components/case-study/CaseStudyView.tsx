"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useProjectTransition } from "@/components/project-transition/project-transition-context";
import type { Project } from "@/components/project-grid/projects";
import TextImageBlock from "./TextImageBlock";
import ImageRow from "./ImageRow";
import TextCallout from "./TextCallout";
import styles from "./CaseStudyView.module.css";

export default function CaseStudyView({ project }: { project: Project }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const { transitioning, beginBackward } = useProjectTransition();

  useEffect(() => {
    const el = introRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
        <img
          src={project.hero}
          alt={project.heroAlt}
          className={styles.heroImg}
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className={[styles.body, transitioning && styles.fadingAway].filter(Boolean).join(" ")}>
        <Link href="/" onClick={handleBack} className={styles.back}>
          ← Back to Projects
        </Link>

        <div ref={introRef} className={styles.intro}>
          <h1 className={[styles.title, titleVisible && styles.titleVisible].filter(Boolean).join(" ")}>
            {project.title}
          </h1>
          <p className={styles.description}>{project.description}</p>
        </div>

        {project.sections?.map((section, i) => {
          switch (section.type) {
            case "text-image":
              return <TextImageBlock key={i} text={section.text} image={section.image} />;
            case "image-row":
              return <ImageRow key={i} images={section.images} />;
            case "callout":
              return <TextCallout key={i} text={section.text} />;
          }
        })}
      </div>
    </>
  );
}
