import Image from "next/image";
import { isGifImage, urlForImage, type SanityImageWithAlt } from "@/sanity/lib/image";
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
  images: [SanityImageWithAlt] | [SanityImageWithAlt, SanityImageWithAlt];
  /** Each image's position in the page's flat lightbox image list. */
  imageIndices?: number[];
  onImageClick?: (index: number) => void;
}) {
  return (
    <div className={styles.row}>
      {images.map((img, i) => {
        const gif = isGifImage(img);
        const url = gif ? urlForImage(img)?.url() : urlForImage(img)?.width(800).fit("crop").url();
        if (!url) return null;
        const index = imageIndices?.[i];
        const alt = img.alt ?? "";
        const handleClick = onImageClick && index !== undefined ? () => onImageClick(index) : undefined;
        return (
          <div key={i} className={styles.imageWrap} onClick={handleClick}>
            {gif ? (
              // eslint-disable-next-line @next/next/no-img-element -- animated
              // GIF: both Sanity's transforms and Next's optimizer flatten it
              // to a static frame, so this bypasses image processing entirely.
              <img src={url} alt={alt} className={styles.image} style={FILL_STYLE} loading="lazy" />
            ) : (
              <Image
                src={url}
                alt={alt}
                fill
                className={styles.image}
                sizes="(max-width: 640px) 100vw, (max-width: 900px) 100vw, 50vw"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// Matches what next/image's `fill` prop sets automatically -- replicated
// here so the plain-<img> GIF fallback fills its wrapper identically.
const FILL_STYLE = { position: "absolute" as const, inset: 0, width: "100%", height: "100%" };
