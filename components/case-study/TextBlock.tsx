import styles from "./TextBlock.module.css";

/** Centered body paragraph matching the intro description's styling --
 *  a standalone text beat between image sections. Reusable across any
 *  project's case study. */
export default function TextBlock({ text }: { text: string }) {
  return <p className={styles.text}>{text}</p>;
}
