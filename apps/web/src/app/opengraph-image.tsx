import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "I Craft Ads digital marketing agency preview";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#050505",
        color: "#f4efe6",
        padding: "72px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div style={{ fontSize: 28, color: "#b7b0a5" }}>I Craft Ads</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <div style={{ fontSize: 88, lineHeight: 0.92, letterSpacing: "-1px", maxWidth: 920 }}>
          Digital marketing for Dubai growth teams.
        </div>
        <div style={{ fontSize: 28, color: "#d7c3a3" }}>
          SEO · PPC · Social · Shopify · Web · Automation
        </div>
      </div>
      <div style={{ height: 1, width: "100%", background: "#2a2723" }} />
    </div>,
    size
  );
}
