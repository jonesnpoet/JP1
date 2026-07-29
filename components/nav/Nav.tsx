"use client";

import Link from "next/link";
import { useProjectTransition } from "@/components/project-transition/project-transition-context";
import styles from "./Nav.module.css";
import NavWordmark from "./NavWordmark";

// The monogram mark itself is <MonogramLogo />, a separate fixed-position
// element whose "docked" transform lands it exactly over this bar's
// top-left padding so it reads as this nav's logo -- it lives outside this
// component entirely (mounted by SiteIntroProvider) and is unaffected by
// the fade below, since the locked intro/monogram styling isn't touched
// here. NavWordmark, rendered as this header's own child, fades along
// with the nav links during project transitions.
export default function Nav() {
  const { transitioning } = useProjectTransition();

  return (
    <header className={[styles.nav, transitioning && styles.fading].filter(Boolean).join(" ")}>
      <NavWordmark />
      <nav className={styles.links} aria-label="Primary">
        <Link href="/" className={styles.link}>
          Projects
        </Link>
        <Link href="/about" className={styles.link}>
          About
        </Link>
        <Link href="/contact" className={styles.link}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
