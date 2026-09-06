import type { CaseStudyImage } from "@/components/project-grid/projects";
import styles from "./ImageRow.module.css";

/**
 * Two-up image row: both images render at identical width/height
 * (object-fit: cover against a shared aspect ratio) regardless of each
 * source photo's native dimensions. Reusable across any project's case
 * study grid. A single-image array renders as a solo row (the grid simply
 * leaves the second column empty), for when an odd insertion leaves one
 * image without a partner.
 */
export default function ImageRow({
  images,
  imageIndices,
  onImageClick,
}: {
  images: [CaseStudyImage] | [CaseStudyImage, CaseStudyImage];
  /** Each image's position in the page's flat lightbox image list. */
  imageIndices?: number[];
  onImageClick?: (index: number) => void;
}) {
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
          onClick={onImageClick && imageIndices ? () => onImageClick(imageIndices[i]) : undefined}
        />
      ))}
    </div>
  );
}
