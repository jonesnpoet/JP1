"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutView.module.css";

const BODY_PARAGRAPHS = [
  "Jones + Poet was founded by Aubrie Jones and Ruby Poet, two designers with different perspectives and one shared vision. To create interiors that feel thoughtful, personal, and built with quality craftsmanship.",
  "Aubrie brings the technical side of every project to life. She approaches design with confidence, balancing strategy with creativity. From space planning to construction details, she leads with bold ideas and a clear vision while guiding clients through every stage of the process.",
  "Ruby brings an intuitive approach to design. She sees potential where others don't and has a talent for combining materials, color, and texture in unexpected ways. She believes the best interiors come from trusting instinct rather than following convention.",
  "Every project begins by understanding how a client lives, works, and experiences their space. Each design is shaped around those routines, resulting in interiors that are both functional and beautiful.",
  "Jones + Poet believes the best projects come from a collaborative process. By working closely with each client, they create spaces that are intentional and uniquely their own.",
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
          </div>
        </div>
      </div>
    </div>
  );
}
