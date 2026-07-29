import styles from "./ContactView.module.css";

export default function ContactView() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.intro}>
          We&apos;d love to hear about your project. Reach out and let&apos;s start the conversation.
        </p>
        <div className={styles.links}>
          <a href="mailto:design@jonesandpoet.com" className={styles.link}>
            design@jonesandpoet.com
          </a>
          <a
            href="https://instagram.com/jonesandpoet"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            @jonesandpoet
          </a>
        </div>
      </div>
    </div>
  );
}
