import styles from "./Footer.module.css";

// footer-jp.svg already bakes in the full layout: JP monogram, "Jones +
// Poet" / "Interior Design" wordmark centered on top, and the
// @jonesandpoet / design@jonesandpoet.com / © 2026 Jones + Poet row
// beneath it -- it's dropped in as one image rather than rebuilt as
// separate text. On mobile, that single flattened image shrinks the
// monogram down to an afterthought, so footer-mark.png (monogram +
// wordmark, cropped from the same artwork) is shown larger on its own
// there instead, with footer-contact.png (the @handle/email/copyright
// row) below it. Desktop keeps the original single image, untouched.
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer-jp.svg"
          alt="Jones + Poet — Interior Design. @jonesandpoet. design@jonesandpoet.com. © 2026 Jones + Poet."
          className={styles.desktopMark}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/footer-mark.png" alt="" aria-hidden="true" className={styles.mobileMonogram} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer-contact.png"
          alt="Jones + Poet — Interior Design. @jonesandpoet. design@jonesandpoet.com. © 2026 Jones + Poet."
          className={styles.mobileContact}
        />
      </div>
    </footer>
  );
}
