import styles from "./MonogramLogo.module.css";

export type MarkState = "entrance" | "reduced" | "reducedSettled" | "static";

export interface MonogramLogoProps {
  /** Centered/full-size (intro) vs docked into the nav (top-left, small). */
  docked: boolean;
  /** Whether the dock transform/color change should transition or snap instantly. */
  animateDock: boolean;
  /** Controls the J/P marks' own entrance animation, independent of docking. */
  markState: MarkState;
}

export default function MonogramLogo({ docked, animateDock, markState }: MonogramLogoProps) {
  const wrapperClassName = [
    styles.wrapper,
    docked ? styles.docked : styles.intro,
    animateDock && styles.animateDock,
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
    <div className={wrapperClassName}>
      <span className={styles.srOnly}>Jones + Poet</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/j-jones.svg" alt="" aria-hidden="true" className={markClassName(styles.markJ)} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/poet-p.svg" alt="" aria-hidden="true" className={markClassName(styles.markP)} />
    </div>
  );
}
