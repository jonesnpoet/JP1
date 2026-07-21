import styles from "./Nav.module.css";

// Deliberately empty: the logo is <MonogramLogo />, a separate fixed-position
// element whose "docked" transform lands it exactly over this bar's
// top-left padding so it reads as this nav's logo.
export default function Nav() {
  return <header className={styles.nav} />;
}
