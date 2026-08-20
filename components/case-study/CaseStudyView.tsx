"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { canela } from "@/components/fonts";
import { useProjectTransition } from "@/components/project-transition/project-transition-context";
import { getPageImages, type Project } from "@/components/project-grid/projects";
import Lightbox from "@/components/lightbox/Lightbox";
import TextImageBlock from "./TextImageBlock";
import ImageRow from "./ImageRow";
import TextCallout from "./TextCallout";
import TextBlock from "./TextBlock";
import styles from "./CaseStudyView.module.css";

export default function CaseStudyView({ project }: { project: Project }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const { transitioning, beginBackward } = useProjectTransition();

  const pageImages = useMemo(() => getPageImages(project), [project]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + pageImages.length) % pageImages.length));
  const nextImage = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % pageImages.length));

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
          onClick={() => setLightboxIndex(0)}
        />
      </div>

      <div className={[styles.body, transitioning && styles.fadingAway].filter(Boolean).join(" ")}>
        <Link href="/" onClick={handleBack} className={styles.back}>
          ← Back to Projects
        </Link>

        <div ref={introRef} className={styles.intro}>
          <h1
            className={[canela.className, styles.title, titleVisible && styles.titleVisible]
              .filter(Boolean)
              .join(" ")}
          >
            {project.title}
          </h1>
          <p className={styles.description}>{project.description}</p>
        </div>

        {(() => {
          // Hero is always index 0 in pageImages; walk sections in the same
          // order getPageImages does, handing each rendered image its
          // matching flat index so the lightbox can step through the whole
          // page regardless of which section it was opened from.
          let cursor = 1;
          return project.sections?.map((section, i) => {
            switch (section.type) {
              case "text-image": {
                const imageIndex = cursor++;
                return (
                  <TextImageBlock
                    key={i}
                    text={section.text}
                    image={section.image}
                    imageIndex={imageIndex}
                    onImageClick={setLightboxIndex}
                  />
                );
              }
              case "image-row": {
                const imageIndices: [number, number] = [cursor++, cursor++];
                return (
                  <ImageRow
                    key={i}
                    images={section.images}
                    imageIndices={imageIndices}
                    onImageClick={setLightboxIndex}
                  />
                );
              }
              case "callout":
                return <TextCallout key={i} text={section.text} />;
              case "text":
                return <TextBlock key={i} text={section.text} />;
            }
          });
        })()}
      </div>

      <Lightbox
        images={pageImages}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </>
  );
}
