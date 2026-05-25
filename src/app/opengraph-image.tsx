import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/seo";

export const alt = `${siteConfig.name} — documents juridiques PDF en ligne`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f8fafc 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            J
          </div>
          <span style={{ fontSize: 36, fontWeight: 700, color: "#0f172a" }}>
            {siteConfig.name}
          </span>
        </div>
        <p
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#0f172a",
            lineHeight: 1.15,
            maxWidth: 900,
            margin: 0,
          }}
        >
          CGV, mentions légales, RGPD & contrats
        </p>
        <p
          style={{
            fontSize: 28,
            color: "#475569",
            marginTop: 24,
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          {siteConfig.tagline} — PDF en 5 minutes
        </p>
      </div>
    ),
    { ...size },
  );
}
