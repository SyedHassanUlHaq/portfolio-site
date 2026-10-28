import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** Text-only preview card: renders at build time, needs no image assets. */
export function ogCard({ eyebrow, title, footer, chips = [] }: { eyebrow: string; title: string; footer: string; chips?: string[] }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0a0c0f", color: "#e9ecf1", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, color: "#5eead4", letterSpacing: 4, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ marginTop: 28, fontSize: title.length > 70 ? 56 : 68, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5 }}>{title}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {chips.slice(0, 6).map((c) => (
              <div key={c} style={{ display: "flex", padding: "8px 18px", border: "2px solid #232833", borderRadius: 10, fontSize: 26, color: "#98a2b3" }}>{c}</div>
            ))}
          </div>
          <div style={{ fontSize: 28, color: "#98a2b3" }}>{footer}</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
