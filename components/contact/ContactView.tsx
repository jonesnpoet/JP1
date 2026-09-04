import { canela } from "@/components/fonts";
import ContactForm from "./ContactForm";
import styles from "./ContactView.module.css";

export default function ContactView() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/jp-about-title.svg" alt="Jones + Poet" className={styles.logo} />
        <h1 className={[canela.className, styles.title].join(" ")}>Contact</h1>
        <p className={styles.intro}>
          We&apos;d love to hear about your project. Reach out and let&apos;s start the conversation.
        </p>
        <ContactForm />
        <div className={styles.links}>
          <a href="mailto:Design@jonesandpoet.com" className={styles.link}>
            Design@jonesandpoet.com
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
