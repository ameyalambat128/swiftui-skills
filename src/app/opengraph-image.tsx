import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background:
          "radial-gradient(circle at top left, #1f2937 0%, #111010 45%, #070707 100%)",
        color: "#f5f5f5",
        display: "flex",
        fontFamily: "IBM Plex Sans, sans-serif",
        height: "100%",
        padding: "54px",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "36px",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "48px",
          position: "relative",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(245,158,11,0.18), rgba(56,189,248,0.12))",
            borderRadius: "999px",
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.12em",
            padding: "12px 20px",
            textTransform: "uppercase",
            alignSelf: "flex-start",
          }}
        >
          Apple-authored Xcode guidance
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            SwiftUI Skills
          </div>
          <div
            style={{
              color: "#d4d4d8",
              display: "flex",
              fontSize: 34,
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            Local-first skills that give AI agents Apple-native SwiftUI context
            so they write better code with fewer hallucinated patterns.
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            color: "#f59e0b",
            display: "flex",
            fontSize: 28,
            gap: 18,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span>/swiftui-skills</span>
          <span style={{ color: "#737373" }}>•</span>
          <span style={{ color: "#e5e7eb" }}>Local-first</span>
          <span style={{ color: "#737373" }}>•</span>
          <span style={{ color: "#38bdf8" }}>Open source</span>
        </div>
      </div>
    </div>,
    size,
  );
}
