"use client";

import { useRef } from "react";
import Link from "next/link";
import { useProjectTransition } from "@/components/project-transition/project-transition-context";
import type { Project } from "@/components/project-grid/projects";
import styles from "./CaseStudyView.module.css";

const DETAIL_ROWS: { key: keyof NonNullable<Project["details"]>; label: string }[] = [
  { key: "type", label: "Type" },
  { key: "program", label: "Program" },
  { key: "location", label: "Location" },
  { key: "year", label: "Year" },
  { key: "area", label: "Area" },
  { key: "client", label: "Client" },
];

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

  const { details, plates } = project;
  const [plate1, plate2, sketchPlate, photoPlate] = plates ?? [];

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

        {details && plates ? (
          <div className={styles.contentGrid}>
            <dl className={styles.details}>
              {DETAIL_ROWS.map(({ key, label }) => (
                <div key={key} className={styles.detailRow}>
                  <dt className={styles.detailLabel}>{label}</dt>
                  <dd className={styles.detailValue}>{details[key]}</dd>
                </div>
              ))}
            </dl>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={plate1} alt="" className={`${styles.plateImg} ${styles.plate1}`} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={plate2} alt="" className={`${styles.plateImg} ${styles.plate2}`} />

            <div className={styles.bottomRow}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sketchPlate} alt={`${project.title} — concept sketch`} className={styles.plateImg} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoPlate} alt={`${project.title} — detail photo`} className={styles.plateImg} />
            </div>
          </div>
        ) : (
          <p className={styles.placeholder}>Additional photos and project details go here.</p>
        )}
      </div>
    </>
  );
}
