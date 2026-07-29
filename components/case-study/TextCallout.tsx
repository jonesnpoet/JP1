import styles from "./TextCallout.module.css";

/** Centered, text-only callout line -- a brief editorial beat between
 *  image rows. Reusable across any project's case study. */
export default function TextCallout({ text }: { text: string }) {
  return <p className={styles.callout}>{text}</p>;
}
