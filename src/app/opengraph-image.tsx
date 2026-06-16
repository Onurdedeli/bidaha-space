import { ImageResponse } from "next/og";

export const alt = "Bidahaspace — Türk Müziği Merch & Deneyim Pazarı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(60% 60% at 15% 0%, #2a1a55, #0a0a0f), radial-gradient(50% 50% at 95% 10%, #3a4a10, transparent)",
          color: "#f4f4f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#7c3aed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            B
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
            bidaha<span style={{ color: "#d4ff3f" }}>space</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            Sevdiğin sanatçıyla
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              background: "linear-gradient(90deg, #8b5cf6, #d4ff3f)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            gerçek bir bağ kur.
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#9a9aab", maxWidth: 920 }}>
            Merch · Deneyimler · Topluluk — an bazlı, Türk müziğinin pazarı
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["👕 Merch", "🍽️ Sanatçıyla yemek", "🎂 Özel mesaj", "🎤 Backstage"].map((t) => (
            <div
              key={t}
              style={{
                fontSize: 24,
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid #2a2a38",
                background: "#16161f",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
