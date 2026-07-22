"use client";

import { createContext, useContext } from "react";

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface BeginTransitionArgs {
  slug: string;
  heroSrc: string;
  thumbSrc: string;
  originEl: HTMLElement;
  /**
   * Forward only: the destination hero's width/height ratio, used to
   * compute the overlay's "arrived" rect so it matches the real page.
   * Defaults to the standard case study hero ratio (1537/1023).
   */
  heroAspect?: number;
}

export interface ProjectTransitionContextValue {
  /** True whenever a forward or backward transition is in progress. */
  transitioning: boolean;
  /** The project slug involved in the current transition, if any. */
  activeSlug: string | null;
  /** Grid -> case study: click a thumbnail, push through into its hero. */
  beginForward: (args: BeginTransitionArgs) => void;
  /** Case study -> grid: pull back out from the hero to its thumbnail. */
  beginBackward: (args: BeginTransitionArgs) => void;
  /**
   * Called by each grid card on mount so a pending backward transition can
   * measure where it should land, once the grid has navigated back in.
   */
  registerGridCard: (slug: string, el: HTMLElement | null) => void;
}

export const ProjectTransitionContext = createContext<ProjectTransitionContextValue | null>(null);

export function useProjectTransition() {
  const ctx = useContext(ProjectTransitionContext);
  if (!ctx) {
    throw new Error("useProjectTransition must be used within ProjectTransitionProvider");
  }
  return ctx;
}
