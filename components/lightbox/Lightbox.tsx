"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Lightbox.module.css";

export interface LightboxImage {
  src: string;
  alt: string;
}

export interface LightboxProps {
  images: LightboxImage[];
  /** null = closed; otherwise the index into `images` currently shown. */
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const SWIPE_THRESHOLD_PX = 40;

/**
 * Full-screen image viewer shared across project case studies. Behavior
 * modeled on the Sol de Janeiro case study's lightbox (flat ordered image
 * list, wraparound prev/next, Escape/click-outside to close), reimplemented
 * with plain CSS transitions -- matching this site's own intro/title
 * animation approach -- instead of that project's GSAP dependency.
 */
export default function Lightbox(props: LightboxProps) {
  if (props.index === null) return null;
  // Key on index === null -> mounted: a fresh LightboxContent mount per
  // open gives its own fade-in state a clean starting point for free,
  // instead of manually resetting state inside an effect.
  return <LightboxContent {...props} index={props.index} />;
}

function LightboxContent({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: Omit<LightboxProps, "index"> & { index: number }) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Fades the backdrop in once per open (this component remounts fresh
  // each time the lightbox opens, so there's no stale "already visible"
  // state to reset).
  useEffect(() => {
    const raf = requestAnimationFrame(() => setOverlayVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") onPrev();
      else if (event.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onPrev, onNext]);

  const image = images[index];

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (deltaX > SWIPE_THRESHOLD_PX) onPrev();
    else if (deltaX < -SWIPE_THRESHOLD_PX) onNext();
  };

  return (
    <div
      className={[styles.overlay, overlayVisible && styles.visible].filter(Boolean).join(" ")}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt || "Image viewer"}
    >
      <button type="button" onClick={onClose} className={styles.close} aria-label="Close">
        ✕
      </button>

      <button
        type="button"
        onClick={onPrev}
        className={`${styles.arrow} ${styles.prev}`}
        aria-label="Previous image"
      >
        ←
      </button>

      {/* Keyed by index so each step is a fresh mount, giving its own
          fade-in state without resetting anything in an effect body. */}
      <FadeImage key={index} src={image.src} alt={image.alt} />

      <button
        type="button"
        onClick={onNext}
        className={`${styles.arrow} ${styles.next}`}
        aria-label="Next image"
      >
        →
      </button>

      <div className={styles.counter}>
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

function FadeImage({ src, alt }: { src: string; alt: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={[styles.image, visible && styles.imageVisible].filter(Boolean).join(" ")}
    />
  );
}
