"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutView.module.css";

const BODY_PARAGRAPHS = [
  "Jones + Poet was founded by Aubrie Jones and Ruby Poet, two designers who approach a room from opposite directions and meet in the same place.",
  "Aubrie brings the vision forward. She's the one in the room first, laying out how a space could work before it's built, unafraid of the harder conversations a serious renovation requires. Bold, technical, and endlessly curious about pattern and texture, she pushes every project toward something braver than what was originally imagined.",
  "Ruby brings it home. She notices what others miss — the way light falls in a corner, the detail that makes a room feel considered rather than decorated. Her belief is simple: it's the mix, not the match. Textures, finishes, and eras layered together until a space feels less designed than discovered.",
  "Together, they take a transitional approach — traditional bones, modern instinct, pieces pulled from different decades and made to feel like they always belonged together. The result is warm without being predictable, elegant without being precious.",
];

const CLOSING_PARAGRAPHS = [
  "We believe good design is felt as much as it's seen. That a home should hold up in craftsmanship and in feeling for a lifetime, not a season. And that the best spaces come from clients willing to take a real creative risk alongside us.",
  "Jones + Poet is for exactly that kind of client: someone who doesn't just want an interior designer, but wants to be part of the design.",
];

export default function AboutView() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div ref={titleRef} className={styles.titleWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/jp-about-title.svg"
            alt="Jones + Poet — About"
            className={[styles.titleImg, titleVisible && styles.titleVisible].filter(Boolean).join(" ")}
          />
        </div>

        <div className={styles.grid}>
          <div>
            <div className={styles.body}>
              {BODY_PARAGRAPHS.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/jp-head.png"
              alt="Aubrie Jones and Ruby Poet, founders of Jones + Poet"
              className={styles.photo}
            />
            <div className={styles.closing}>
              {CLOSING_PARAGRAPHS.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
