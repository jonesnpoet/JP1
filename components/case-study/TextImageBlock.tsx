import type { CaseStudyImage } from "@/components/project-grid/projects";
import styles from "./TextImageBlock.module.css";

/**
 * Asymmetric text + image block: a short callout on one side, a single
 * image on the other, vertically centered against each other. Reusable
 * across any project's case study once it has a moment worth calling out.
 */
export default function TextImageBlock({
  text,
  image,
  reverse = false,
}: {
  text: string;
  image: CaseStudyImage;
  /** Flips to image-left/text-right. Defaults to text-left/image-right. */
  reverse?: boolean;
}) {
  return (
    <div className={[styles.block, reverse && styles.reverse].filter(Boolean).join(" ")}>
      <p className={styles.text}>{text}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        className={styles.image}
        style={image.focal ? { objectPosition: image.focal } : undefined}
        loading="lazy"
      />
    </div>
  );
}
