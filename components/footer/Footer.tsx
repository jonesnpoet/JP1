import styles from "./Footer.module.css";

// footer-jp.svg already bakes in the full layout: JP monogram, "Jones +
// Poet" / "Interior Design" wordmark centered on top, and the
// @jonesandpoet / design@jonesandpoet.com / © 2026 Jones + Poet row
// beneath it -- it's dropped in as one image rather than rebuilt as
// separate text.
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer-jp.svg"
          alt="Jones + Poet — Interior Design. @jonesandpoet. design@jonesandpoet.com. © 2026 Jones + Poet."
          className={styles.mark}
        />
      </div>
    </footer>
  );
}
