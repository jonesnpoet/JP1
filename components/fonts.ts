import localFont from "next/font/local";

// Trial webfont (evaluation license, no @font-face coverage) -- swap for a licensed file before production.
export const canela = localFont({
  src: "../public/fonts/canela/CanelaText-Regular-Trial.otf",
  weight: "400",
  style: "normal",
  display: "swap",
});

// Trial webfont (evaluation license, no @font-face coverage) -- swap for a licensed file before production.
export const canelaBold = localFont({
  src: "../public/fonts/canela/CanelaText-Bold-Trial.otf",
  weight: "700",
  style: "normal",
  display: "swap",
});
