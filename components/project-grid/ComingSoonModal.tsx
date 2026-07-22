"use client";

import { useEffect, useRef } from "react";
import styles from "./ComingSoonModal.module.css";

export interface ComingSoonModalProps {
  title: string;
  media: string;
  onClose: () => void;
}

// Mounted only while open (see ProjectGrid), so the (large) media file
// isn't fetched until the user actually clicks through to it.
export default function ComingSoonModal({ title, media, onClose }: ComingSoonModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="coming-soon-heading"
    >
      <div className={styles.dialog}>
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 id="coming-soon-heading" className={styles.heading}>
          Project coming soon
        </h2>
        <p className={styles.message}>
          {`${title} is still underway. Here’s a preview of what’s inspiring it.`}
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media} alt={`${title} inspiration reel`} className={styles.media} />
      </div>
    </div>
  );
}
