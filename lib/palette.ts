/**
 * Chart + UI color tokens.
 *
 * The site commits to a single dark "financial terminal" surface, so these are
 * the dark steps of the reference data-viz palette. Both chart hues were run
 * through the palette validator against the #1a1a19 surface (all checks pass,
 * all-pairs: CVD deltaE 26.8, normal-vision deltaE 31.8, contrast >= 3:1).
 *
 * Status colors are fixed, never themed, and deliberately fail the categorical
 * gates against each other (good vs critical is CVD deltaE 4.1) — which is why
 * every status is rendered with a glyph AND a text label, never color alone.
 */

export const chrome = {
  plane: "#0d0d0d",
  surface: "#1a1a19",
  surfaceRaised: "#222221",
  inkPrimary: "#ffffff",
  inkSecondary: "#c3c2b7",
  inkMuted: "#898781",
  gridline: "#2c2c2a",
  baseline: "#383835",
  border: "rgba(255,255,255,0.10)",
} as const;

/** Sequential slot 1 — deal value magnitude. */
export const SERIES_PRIMARY = "#3987e5";
/** Sequential slot 2 — the second magnitude context on the same view. */
export const SERIES_SECONDARY = "#d95926";

export const status = {
  good: "#0ca30c",
  warning: "#fab219",
  critical: "#d03b3b",
} as const;
