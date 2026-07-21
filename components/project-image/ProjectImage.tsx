import styles from "./ProjectImage.module.css";

export interface ProjectImageProps {
  title: string;
  /** Photo shown by default. */
  image: string;
  /** Sketch version cross-faded in on hover/focus. */
  sketch: string;
}

export default function ProjectImage({ title, image, sketch }: ProjectImageProps) {
  return (
    <div className={styles.frame}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={title} className={styles.photo} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={sketch} alt="" aria-hidden="true" className={styles.sketch} />
    </div>
  );
}
