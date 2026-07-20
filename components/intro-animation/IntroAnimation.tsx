"use client";

import { useEffect, useState } from "react";
import styles from "./IntroAnimation.module.css";

const SESSION_KEY = "jp-intro-seen";
const EXIT_DURATION_MS = 700;
const REDUCED_MOTION_SETTLE_MS = 300;

export interface IntroAnimationProps {
  /**
   * Gate the intro with sessionStorage so it only plays once per session.
   * Set to false to reuse this component as an ungated loading state elsewhere.
   */
  persist?: boolean;
  /** Called once the exit transition finishes and the overlay unmounts. */
  onExit?: () => void;
}

export default function IntroAnimation({ persist = true, onExit }: IntroAnimationProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    // Reading sessionStorage/matchMedia requires the browser, so this client-only
    // reveal can't be derived during render without risking a hydration mismatch.
    const alreadySeen = persist && sessionStorage.getItem(SESSION_KEY);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setVisible(!alreadySeen);
    setReducedMotion(mediaQuery.matches);

    if (!alreadySeen && mediaQuery.matches) {
      const settleTimer = setTimeout(() => setSettled(true), REDUCED_MOTION_SETTLE_MS);
      return () => clearTimeout(settleTimer);
    }
  }, [persist]);

  if (!mounted || !visible) return null;

  const handleDismiss = () => {
    if (exiting) return;
    setExiting(true);
    if (persist) sessionStorage.setItem(SESSION_KEY, "1");
    window.setTimeout(() => {
      setVisible(false);
      onExit?.();
    }, EXIT_DURATION_MS);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleDismiss();
    }
  };

  const overlayClassName = [
    styles.overlay,
    exiting && styles.exiting,
    reducedMotion && styles.reduced,
    settled && styles.settled,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={overlayClassName}
      onClick={handleDismiss}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Enter site"
    >
      <div className={styles.stack}>
        <div className={styles.markContainer} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/J%20Jones.svg" alt="" className={styles.markJ} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/Poet%20P.svg" alt="" className={styles.markP} />
        </div>

        <div className={styles.wordmarkWrap}>
          <span className={styles.srOnly}>Jones + Poet</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/JONES%20%2B%20POET%20FOR%20SITE.svg"
            alt=""
            aria-hidden="true"
            className={styles.wordmarkImg}
          />
        </div>

        <div className={styles.subtextWrap}>
          <span className={styles.srOnly}>Interior Design</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/Interior%20Design%20Asset.svg"
            alt=""
            aria-hidden="true"
            className={styles.subtextImg}
          />
        </div>
      </div>

      <div className={styles.hintWrap}>
        <p className={styles.hint}>Click to enter</p>
      </div>
    </div>
  );
}
