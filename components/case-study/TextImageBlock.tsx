import Image from "next/image";
import { isGifImage, urlForImage, type SanityImageWithAlt } from "@/sanity/lib/image";
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
  imageIndex,
  onImageClick,
}: {
  text: string;
  image: SanityImageWithAlt;
  /** Flips to image-left/text-right. Defaults to text-left/image-right. */
  reverse?: boolean;
  /** This image's position in the page's flat lightbox image list. */
  imageIndex?: number;
  onImageClick?: (index: number) => void;
}) {
  const gif = isGifImage(image);
  const url = gif ? urlForImage(image)?.url() : urlForImage(image)?.width(800).fit("crop").url();
  const handleClick = onImageClick && imageIndex !== undefined ? () => onImageClick(imageIndex) : undefined;

  return (
    <div className={[styles.block, reverse && styles.reverse].filter(Boolean).join(" ")}>
      <p className={styles.text}>{text}</p>
      {url && (
        <div className={styles.image} onClick={handleClick}>
          {gif ? (
            // eslint-disable-next-line @next/next/no-img-element -- animated
            // GIF: bypasses Next's optimizer, which flattens/times out on these.
            <img src={url} alt={image.alt ?? ""} className={styles.imageInner} style={FILL_STYLE} loading="lazy" />
          ) : (
            <Image
              src={url}
              alt={image.alt ?? ""}
              fill
              className={styles.imageInner}
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          )}
        </div>
      )}
    </div>
  );
}

const FILL_STYLE = { position: "absolute" as const, inset: 0, width: "100%", height: "100%" };
