"use client";

import { useIntroReady } from "@/components/site-intro/intro-ready-context";
import styles from "./NavWordmark.module.css";

// Decorative: the monogram's own sr-only span already provides the
// accessible name ("Jones + Poet") for the nav logo as a whole.
export default function NavWordmark() {
  const ready = useIntroReady();
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/jones-poet-perfect-maroon.svg"
      alt=""
      aria-hidden="true"
      className={[styles.wordmark, ready && styles.ready].filter(Boolean).join(" ")}
    />
  );
}
