"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/nav/Nav";
import MonogramLogo, { type MarkState } from "@/components/monogram-logo/MonogramLogo";
import IntroAnimation from "@/components/intro-animation";
import { IntroReadyProvider } from "./intro-ready-context";

const SESSION_KEY = "jp-intro-seen";
// Stage 1: monogram shrinks + moves into the nav slot. No color change yet.
const SHRINK_DURATION_MS = 1400;
// Stage 2: once settled, backdrop + monogram invert color together.
const INVERT_DURATION_MS = 1400;
const REDUCED_MOTION_SETTLE_MS = 300;

// pending -> intro -> [dismiss] -> shrinking -> inverting -> done
// Each stage runs to completion before the next starts. Reduced motion
// skips straight from "intro" to "done" (snap, no animated stages).
type Phase = "pending" | "intro" | "shrinking" | "inverting" | "done";

export default function SiteIntroProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("pending");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [reducedSettled, setReducedSettled] = useState(false);

  useEffect(() => {
    // Reading sessionStorage/matchMedia requires the browser, so this
    // client-only reveal can't be derived during render without risking a
    // hydration mismatch.
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(mediaQuery.matches);

    if (alreadySeen) {
      setPhase("done");
      return;
    }

    setPhase("intro");
    if (mediaQuery.matches) {
      const settleTimer = setTimeout(() => setReducedSettled(true), REDUCED_MOTION_SETTLE_MS);
      return () => clearTimeout(settleTimer);
    }
  }, []);

  const handleDismiss = () => {
    if (phase !== "intro") return;
    sessionStorage.setItem(SESSION_KEY, "1");

    if (reducedMotion) {
      setPhase("done");
      return;
    }

    setPhase("shrinking");
    window.setTimeout(() => {
      setPhase("inverting");
      window.setTimeout(() => setPhase("done"), INVERT_DURATION_MS);
    }, SHRINK_DURATION_MS);
  };

  if (phase === "pending") {
    return (
      <IntroReadyProvider value={false}>
        <Nav />
        {children}
      </IntroReadyProvider>
    );
  }

  const showIntroChrome = phase === "intro" || phase === "shrinking" || phase === "inverting";
  const docked = phase === "shrinking" || phase === "inverting" || phase === "done";
  const inverted = phase === "inverting" || phase === "done";
  const animateTransform = phase === "shrinking";
  const animateColor = phase === "inverting";

  const markState: MarkState =
    phase === "intro"
      ? reducedMotion
        ? reducedSettled
          ? "reducedSettled"
          : "reduced"
        : "entrance"
      : "static";

  return (
    <IntroReadyProvider value={phase === "done"}>
      <Nav />
      <MonogramLogo
        docked={docked}
        animateTransform={animateTransform}
        inverted={inverted}
        animateColor={animateColor}
        markState={markState}
      />
      {showIntroChrome && (
        <IntroAnimation
          textExiting={phase === "shrinking" || phase === "inverting"}
          backgroundInverting={phase === "inverting"}
          reducedMotion={reducedMotion}
          reducedSettled={reducedSettled}
          onDismiss={handleDismiss}
        />
      )}
      {children}
    </IntroReadyProvider>
  );
}
