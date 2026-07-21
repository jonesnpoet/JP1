"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/nav/Nav";
import MonogramLogo, { type MarkState } from "@/components/monogram-logo/MonogramLogo";
import IntroAnimation from "@/components/intro-animation";
import { IntroReadyProvider } from "./intro-ready-context";

const SESSION_KEY = "jp-intro-seen";
const DOCK_DURATION_MS = 700;
const REDUCED_MOTION_SETTLE_MS = 300;

type Phase = "pending" | "intro" | "dismissing" | "done";

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
    setPhase("dismissing");
    window.setTimeout(
      () => setPhase("done"),
      reducedMotion ? 0 : DOCK_DURATION_MS,
    );
  };

  if (phase === "pending") {
    return (
      <IntroReadyProvider value={false}>
        <Nav />
        {children}
      </IntroReadyProvider>
    );
  }

  const showIntroChrome = phase === "intro" || phase === "dismissing";
  const docked = phase !== "intro";
  const animateDock = phase === "dismissing" && !reducedMotion;

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
      <MonogramLogo docked={docked} animateDock={animateDock} markState={markState} />
      {showIntroChrome && (
        <IntroAnimation
          exiting={phase === "dismissing"}
          reducedMotion={reducedMotion}
          reducedSettled={reducedSettled}
          onDismiss={handleDismiss}
        />
      )}
      {children}
    </IntroReadyProvider>
  );
}
