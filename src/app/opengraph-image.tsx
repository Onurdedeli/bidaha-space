import { ImageResponse } from "next/og";

export const alt = "StarLab — Lisanslı Sanatçı Merch Pazarı";
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
            "radial-gradient(60% 60% at 12% 0%, #ede9fe, #ffffff), radial-gradient(50% 50% at 95% 8%, #fce7f3, transparent)",
          color: "#181225",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #7c3aed, #e11d74)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            S
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
            Star<span style={{ color: "#7c3aed" }}>Lab</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            Sevdiğin sanatçının
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              background: "linear-gradient(90deg, #7c3aed, #e11d74)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            merch&apos;ini sen tasarla.
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#6c6880", maxWidth: 920 }}>
            Sanatçı · Hayran · Üretim — lisanslı, kişiselleştirilmiş merch pazarı
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["👕 Tişört", "🧥 Hoodie", "🧢 Şapka", "🖼️ Poster"].map((t) => (
            <div
              key={t}
              style={{
                fontSize: 24,
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid #ebe8f1",
                background: "#ffffff",
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
