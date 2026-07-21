import styles from "./Nav.module.css";
import NavWordmark from "./NavWordmark";

// The monogram mark itself is <MonogramLogo />, a separate fixed-position
// element whose "docked" transform lands it exactly over this bar's
// top-left padding so it reads as this nav's logo. NavWordmark sits beneath
// it, appearing once the monogram has settled into place.
export default function Nav() {
  return (
    <header className={styles.nav}>
      <NavWordmark />
    </header>
  );
}
