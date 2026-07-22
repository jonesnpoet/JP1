"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ProjectTransitionContext,
  type BeginTransitionArgs,
  type ProjectTransitionContextValue,
  type Rect,
} from "./project-transition-context";
import TransitionOverlay from "./TransitionOverlay";

// Keep in sync with the 1s transition durations in TransitionOverlay.module.css.
const ANIMATION_MS = 1000;
// Small buffer after router.push before revealing the destination beneath
// the overlay -- router.push itself doesn't resolve after paint, so this
// gives the (typically already-prefetched) route a moment to commit.
const REVEAL_BUFFER_MS = 120;
// Must match Nav's height (Nav.module.css) -- the hero's "arrived" position.
const NAV_HEIGHT = 80;
// Real dimensions of the *-full.png hero images.
const HERO_ASPECT = 1537 / 1023;

type Phase =
  | { kind: "idle" }
  | {
      kind: "forward" | "backward";
      slug: string;
      thumbSrc: string;
      heroSrc: string;
      from: Rect;
      to: Rect;
      animating: boolean;
    };

function rectOf(el: HTMLElement): Rect {
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

function heroRect(): Rect {
  const width = window.innerWidth;
  return { top: NAV_HEIGHT, left: 0, width, height: width / HERO_ASPECT };
}

function nextFrame(fn: () => void) {
  requestAnimationFrame(() => requestAnimationFrame(fn));
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ProjectTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const phaseRef = useRef(phase);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  // Slug a just-navigated-back grid card should report its rect for.
  const pendingBackwardSlug = useRef<string | null>(null);

  const beginForward = useCallback(
    ({ slug, heroSrc, thumbSrc, originEl }: BeginTransitionArgs) => {
      if (phaseRef.current.kind !== "idle") return;

      if (prefersReducedMotion()) {
        router.push(`/projects/${slug}`);
        return;
      }

      const from = rectOf(originEl);
      const to = heroRect();
      setPhase({ kind: "forward", slug, thumbSrc, heroSrc, from, to, animating: false });
      nextFrame(() => {
        setPhase((p) => (p.kind === "forward" && p.slug === slug ? { ...p, animating: true } : p));
      });
      window.setTimeout(() => {
        router.push(`/projects/${slug}`);
        window.setTimeout(() => setPhase({ kind: "idle" }), REVEAL_BUFFER_MS);
      }, ANIMATION_MS);
    },
    [router],
  );

  const beginBackward = useCallback(
    ({ slug, heroSrc, thumbSrc, originEl }: BeginTransitionArgs) => {
      if (phaseRef.current.kind !== "idle") return;

      if (prefersReducedMotion()) {
        router.push("/");
        return;
      }

      const from = rectOf(originEl);
      pendingBackwardSlug.current = slug;
      // "to" is a placeholder until the grid card reports in via
      // registerGridCard; it isn't rendered until animating flips true.
      setPhase({ kind: "backward", slug, thumbSrc, heroSrc, from, to: from, animating: false });
      router.push("/");
    },
    [router],
  );

  const registerGridCard = useCallback((slug: string, el: HTMLElement | null) => {
    if (!el || pendingBackwardSlug.current !== slug) return;
    pendingBackwardSlug.current = null;
    const to = rectOf(el);
    setPhase((p) => (p.kind === "backward" && p.slug === slug ? { ...p, to } : p));
    nextFrame(() => {
      setPhase((p) => (p.kind === "backward" && p.slug === slug ? { ...p, animating: true } : p));
    });
    window.setTimeout(() => setPhase({ kind: "idle" }), ANIMATION_MS);
  }, []);

  const value: ProjectTransitionContextValue = {
    transitioning: phase.kind !== "idle",
    activeSlug: phase.kind === "idle" ? null : phase.slug,
    beginForward,
    beginBackward,
    registerGridCard,
  };

  return (
    <ProjectTransitionContext.Provider value={value}>
      {children}
      {phase.kind !== "idle" && (
        <TransitionOverlay
          direction={phase.kind}
          from={phase.from}
          to={phase.to}
          animating={phase.animating}
          thumbSrc={phase.thumbSrc}
          heroSrc={phase.heroSrc}
        />
      )}
    </ProjectTransitionContext.Provider>
  );
}
