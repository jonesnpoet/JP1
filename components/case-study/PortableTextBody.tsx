import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "sanity";
import { canela } from "@/components/fonts";
import { urlForImage, type SanityImageWithAlt } from "@/sanity/lib/image";
import ImageRow from "./ImageRow";
import TextImageBlock from "./TextImageBlock";
import TextCallout from "./TextCallout";
import textBlockStyles from "./TextBlock.module.css";
import headingStyles from "./PortableTextBody.module.css";

interface ImageBlockValue {
  _key: string;
  _type: "image";
  asset?: { _type: "reference"; _ref: string };
  alt?: string;
}

interface ImagePairValue {
  _key: string;
  _type: "imagePair";
  left: SanityImageWithAlt;
  right?: SanityImageWithAlt;
}

interface TextImageBlockValue {
  _key: string;
  _type: "textImageBlock";
  text: string;
  image: SanityImageWithAlt;
}

interface CalloutBlockValue {
  _key: string;
  _type: "calloutBlock";
  text: string;
}

/**
 * Every image in `body`, in document order, as a flat {src,alt}[] -- used
 * by CaseStudyView to build the Lightbox's full-page image list (hero
 * first, then these).
 */
export function flattenBodyImages(
  body: PortableTextBlock[] | undefined,
): { src: string; alt: string }[] {
  const out: { src: string; alt: string }[] = [];
  for (const block of body ?? []) {
    const type = (block as { _type: string })._type;
    if (type === "image") {
      const img = block as unknown as ImageBlockValue;
      const url = urlForImage(img as unknown as SanityImageWithAlt)?.url();
      if (url) out.push({ src: url, alt: img.alt ?? "" });
    } else if (type === "imagePair") {
      const pair = block as unknown as ImagePairValue;
      for (const img of [pair.left, pair.right]) {
        if (!img) continue;
        const url = urlForImage(img)?.url();
        if (url) out.push({ src: url, alt: img.alt ?? "" });
      }
    } else if (type === "textImageBlock") {
      const tib = block as unknown as TextImageBlockValue;
      const url = urlForImage(tib.image)?.url();
      if (url) out.push({ src: url, alt: tib.image?.alt ?? "" });
    }
  }
  return out;
}

/**
 * Maps each image-bearing block's `_key` to its position(s) in the flat
 * lightbox list (index 0 is reserved for the hero, so this starts at 1),
 * so each serializer below can look up its own index without depending on
 * PortableText's render order.
 */
function buildImageIndexMap(body: PortableTextBlock[] | undefined): Map<string, number[]> {
  const map = new Map<string, number[]>();
  let cursor = 1;
  for (const block of body ?? []) {
    const type = (block as { _type: string })._type;
    const key = (block as { _key: string })._key;
    if (type === "image") {
      map.set(key, [cursor++]);
    } else if (type === "imagePair") {
      const pair = block as unknown as ImagePairValue;
      const indices: number[] = [cursor++];
      if (pair.right) indices.push(cursor++);
      map.set(key, indices);
    } else if (type === "textImageBlock") {
      map.set(key, [cursor++]);
    }
  }
  return map;
}

export default function PortableTextBody({
  value,
  onImageClick,
}: {
  value: PortableTextBlock[] | undefined;
  onImageClick?: (index: number) => void;
}) {
  const indexMap = buildImageIndexMap(value);

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p className={textBlockStyles.text}>{children}</p>,
      h2: ({ children }) => (
        <h2 className={[canela.className, headingStyles.h2].join(" ")}>{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className={[canela.className, headingStyles.h3].join(" ")}>{children}</h3>
      ),
    },
    types: {
      image: ({ value: img }) => {
        const indices = indexMap.get((img as ImageBlockValue)._key) ?? [];
        return (
          <ImageRow
            images={[img as SanityImageWithAlt]}
            imageIndices={indices}
            onImageClick={onImageClick}
          />
        );
      },
      imagePair: ({ value: pair }) => {
        const p = pair as unknown as ImagePairValue;
        const images = (p.right ? [p.left, p.right] : [p.left]) as
          | [SanityImageWithAlt]
          | [SanityImageWithAlt, SanityImageWithAlt];
        const indices = indexMap.get(p._key) ?? [];
        return <ImageRow images={images} imageIndices={indices} onImageClick={onImageClick} />;
      },
      textImageBlock: ({ value: block }) => {
        const tib = block as unknown as TextImageBlockValue;
        const indices = indexMap.get(tib._key) ?? [];
        return (
          <TextImageBlock
            text={tib.text}
            image={tib.image}
            imageIndex={indices[0]}
            onImageClick={onImageClick}
          />
        );
      },
      calloutBlock: ({ value: block }) => {
        const callout = block as unknown as CalloutBlockValue;
        return <TextCallout text={callout.text} />;
      },
    },
  };

  return <PortableText value={value ?? []} components={components} />;
}
