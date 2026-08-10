import Link from "next/link";
import styles from "./MonogramLogo.module.css";

export type MarkState = "entrance" | "reduced" | "reducedSettled" | "static";

export interface MonogramLogoProps {
  /** Centered/full-size (intro) vs docked into the nav (top-left, small). Stage 1 target. */
  docked: boolean;
  /** Stage 1 only: transitions the transform (shrink + move). */
  animateTransform: boolean;
  /** Cream (intro) vs maroon (post color-inversion). Stage 2 target. */
  inverted: boolean;
  /** Stage 2 only: transitions the color (filter) change. */
  animateColor: boolean;
  /** Controls the J/P marks' own entrance animation, independent of docking. */
  markState: MarkState;
}

export default function MonogramLogo({
  docked,
  animateTransform,
  inverted,
  animateColor,
  markState,
}: MonogramLogoProps) {
  const wrapperClassName = [
    styles.wrapper,
    docked ? styles.docked : styles.intro,
    animateTransform && styles.animateTransform,
    inverted && styles.inverted,
    animateColor && styles.animateColor,
  ]
    .filter(Boolean)
    .join(" ");

  const markStateClassName =
    markState === "entrance"
      ? styles.entrance
      : markState === "reduced"
        ? styles.reduced
        : markState === "reducedSettled"
          ? styles.reducedSettled
          : undefined;

  const markClassName = (base: string) =>
    [base, markStateClassName].filter(Boolean).join(" ");

  return (
    <Link href="/" className={wrapperClassName}>
      <span className={styles.srOnly}>Jones + Poet</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/j-jones.svg" alt="" aria-hidden="true" className={markClassName(styles.markJ)} />
      {/* Maroon variant, crossfaded in on top once docked/inverted -- see
          .markMaroon in MonogramLogo.module.css. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/j-jones-maroon.svg"
        alt=""
        aria-hidden="true"
        className={`${styles.markJ} ${styles.markMaroon}`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/poet-p.svg" alt="" aria-hidden="true" className={markClassName(styles.markP)} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/poet-p-maroon.svg"
        alt=""
        aria-hidden="true"
        className={`${styles.markP} ${styles.markMaroon}`}
      />
    </Link>
  );
}
