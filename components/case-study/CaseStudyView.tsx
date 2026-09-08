"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { canela } from "@/components/fonts";
import { useProjectTransition } from "@/components/project-transition/project-transition-context";
import { isGifImage, urlForImage } from "@/sanity/lib/image";
import type { SanityProjectDetail } from "@/sanity/lib/types";
import Lightbox from "@/components/lightbox/Lightbox";
import PortableTextBody, { flattenBodyImages } from "./PortableTextBody";
import styles from "./CaseStudyView.module.css";

const HERO_FILL_STYLE = { position: "absolute" as const, inset: 0, width: "100%", height: "100%" };

export default function CaseStudyView({ project }: { project: SanityProjectDetail }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const { transitioning, beginBackward } = useProjectTransition();

  const heroIsGif = isGifImage(project.heroImage);
  const heroUrl = heroIsGif
    ? (urlForImage(project.heroImage)?.url() ?? "")
    : (urlForImage(project.heroImage)?.width(1537).fit("crop").url() ?? "");
  const thumbUrl = urlForImage(project.thumbnail)?.width(600).fit("crop").url() ?? "";
  const heroAlt = project.heroImage?.alt || project.title;

  const pageImages = useMemo(
    () => [{ src: heroUrl, alt: heroAlt }, ...flattenBodyImages(project.body)],
    [project, heroUrl, heroAlt],
  );
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
      heroSrc: heroUrl,
      thumbSrc: thumbUrl,
      originEl: heroRef.current,
    });
  };

  return (
    <>
      <div ref={heroRef} className={styles.hero}>
        {heroUrl &&
          (heroIsGif ? (
            // eslint-disable-next-line @next/next/no-img-element -- animated
            // GIF: bypasses Next's optimizer, which flattens/times out on these.
            <img
              src={heroUrl}
              alt={heroAlt}
              className={styles.heroImg}
              style={HERO_FILL_STYLE}
              onClick={() => setLightboxIndex(0)}
            />
          ) : (
            <Image
              src={heroUrl}
              alt={heroAlt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className={styles.heroImg}
              onClick={() => setLightboxIndex(0)}
            />
          ))}
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
          {project.description && <p className={styles.description}>{project.description}</p>}
        </div>

        <PortableTextBody value={project.body} onImageClick={setLightboxIndex} />
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
