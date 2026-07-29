import type { CaseStudyImage } from "@/components/project-grid/projects";
import styles from "./ImageRow.module.css";

/**
 * Two-up image row: both images render at identical width/height
 * (object-fit: cover against a shared aspect ratio) regardless of each
 * source photo's native dimensions. Reusable across any project's case
 * study grid.
 */
export default function ImageRow({ images }: { images: [CaseStudyImage, CaseStudyImage] }) {
  return (
    <div className={styles.row}>
      {images.map((img, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          className={styles.image}
          style={img.focal ? { objectPosition: img.focal } : undefined}
          loading="lazy"
        />
      ))}
    </div>
  );
}
