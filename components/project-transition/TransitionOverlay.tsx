import type { Rect } from "./project-transition-context";
import styles from "./TransitionOverlay.module.css";

export interface TransitionOverlayProps {
  direction: "forward" | "backward";
  from: Rect;
  to: Rect;
  animating: boolean;
  thumbSrc: string;
  heroSrc: string;
}

export default function TransitionOverlay({
  direction,
  from,
  to,
  animating,
  thumbSrc,
  heroSrc,
}: TransitionOverlayProps) {
  const rect = animating ? to : from;
  // forward: starts on the cropped thumbnail, ends on the full hero.
  // backward: starts on the full hero, ends on the cropped thumbnail.
  const showHero = direction === "forward" ? animating : !animating;

  return (
    <div
      className={[styles.overlay, animating && styles.animating].filter(Boolean).join(" ")}
      style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbSrc}
        alt=""
        className={[styles.img, showHero ? styles.hidden : styles.visible].filter(Boolean).join(" ")}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroSrc}
        alt=""
        className={[styles.img, showHero ? styles.visible : styles.hidden].filter(Boolean).join(" ")}
      />
    </div>
  );
}
