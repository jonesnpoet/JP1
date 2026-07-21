"use client";

import styles from "./IntroAnimation.module.css";

export interface IntroAnimationProps {
  /** Stage 1: wordmark/subtext/hint fade out quickly, clicks stop registering. */
  textExiting: boolean;
  /** Stage 2 only: the black backdrop fades away, revealing the white site. */
  backgroundInverting: boolean;
  reducedMotion: boolean;
  /** After the reduced-motion settle delay, fades content in without the keyframe motion. */
  reducedSettled: boolean;
  onDismiss: () => void;
}

export default function IntroAnimation({
  textExiting,
  backgroundInverting,
  reducedMotion,
  reducedSettled,
  onDismiss,
}: IntroAnimationProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onDismiss();
    }
  };

  const overlayClassName = [
    styles.overlay,
    textExiting && styles.textExiting,
    backgroundInverting && styles.backgroundInverting,
    reducedMotion && styles.reduced,
    reducedSettled && styles.settled,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={overlayClassName}
      onClick={onDismiss}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Enter site"
    >
      <div className={styles.stack}>
        <div className={styles.wordmarkWrap}>
          <span className={styles.srOnly}>Jones + Poet</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/jones-poet-perfect.svg"
            alt=""
            aria-hidden="true"
            className={styles.wordmarkImg}
          />
        </div>

        <div className={styles.subtextWrap}>
          <span className={styles.srOnly}>Interior Design</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/interior-design-asset.svg"
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
