"use client";

import { createContext, useContext } from "react";

const IntroReadyContext = createContext(false);

export const IntroReadyProvider = IntroReadyContext.Provider;

/** True once the intro has dismissed and the monogram has settled into the nav. */
export function useIntroReady() {
  return useContext(IntroReadyContext);
}
