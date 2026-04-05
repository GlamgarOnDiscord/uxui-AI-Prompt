/**
 * Valid fixture — no lint violations expected.
 *
 * - Colors are high-contrast (#ffffff on #09090b = ~21:1 ratio — passes AA and AAA)
 * - Spacing values are all multiples of 4px
 * - Font family is Geist (defined in uxui-designer DESIGN.md)
 */
import React from "react";

export function ValidButton() {
  return (
    <button
      style={{
        color: "#ffffff",
        backgroundColor: "#09090b",
        padding: "8px",
        margin: "16px",
        fontFamily: "Geist, sans-serif",
      }}
      className="text-white bg-zinc-950 p-2 m-4"
    >
      Click me
    </button>
  );
}

export function ValidCard() {
  return (
    <div
      style={{
        color: "#f4f4f5",
        backgroundColor: "#18181b",
        padding: "24px",
        gap: "16px",
      }}
    >
      <p style={{ margin: "8px" }}>Card content with accessible contrast</p>
    </div>
  );
}
