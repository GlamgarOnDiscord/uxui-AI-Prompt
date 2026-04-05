/**
 * Invalid fixture — contains known violations.
 *
 * Violations expected:
 *   1. contrast-ratio: #a1a1aa on #09090b — ratio ~5.6:1 — passes AA but fails AAA (< 7:1)
 *      (at AA level this should pass — we use a low-contrast pair for a clear violation)
 *   2. contrast-ratio: #71717a on #27272a — ratio ~2.9:1 — fails AA (< 4.5:1)
 *   3. spacing-scale: padding: 14px — not on 4px grid
 *   4. font-family: "Inter" — not in DESIGN.md
 */
import React from "react";

// Violation 1: spacing-scale — 14px is not a multiple of 4
export function BadSpacing() {
  return (
    <div style={{ padding: "14px", margin: "10px" }}>
      Bad spacing
    </div>
  );
}

// Violation 2: contrast-ratio — #71717a text on #27272a background (~2.9:1, fails AA)
export function LowContrastText() {
  return (
    <p style={{ color: "#71717a", backgroundColor: "#27272a" }}>
      Low contrast text
    </p>
  );
}

// Violation 3: font-family — Inter is not in the allowed fonts
export function WrongFont() {
  return (
    <span style={{ fontFamily: "Inter, sans-serif" }}>
      Wrong font
    </span>
  );
}
