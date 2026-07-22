import Link from "next/link";
import styles from "./Nav.module.css";
import NavWordmark from "./NavWordmark";

// The monogram mark itself is <MonogramLogo />, a separate fixed-position
// element whose "docked" transform lands it exactly over this bar's
// top-left padding so it reads as this nav's logo. NavWordmark sits beneath
// it, appearing once the monogram has settled into place. Both are
// unaffected by this header's own flex layout since they're
// independently position: fixed.
export default function Nav() {
  return (
    <header className={styles.nav}>
      <NavWordmark />
      <nav className={styles.links} aria-label="Primary">
        <Link href="/" className={styles.link}>
          Projects
        </Link>
        <Link href="/about" className={styles.link}>
          About
        </Link>
        <Link href="/furniture" className={styles.link}>
          Furniture
        </Link>
      </nav>
    </header>
  );
}
