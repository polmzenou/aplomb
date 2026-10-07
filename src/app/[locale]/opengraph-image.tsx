import { ImageResponse } from "next/og";

export const alt = "APLOMB Immobilier";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const line = locale === "en" ? "Architectural real estate" : "Immobilier d'architecture";
  const places = locale === "en" ? "Paris · Lyon · Basque Coast" : "Paris · Lyon · Côte basque";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 70,
          background: "#ece8e1",
          backgroundImage: "linear-gradient(rgba(22,22,20,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(22,22,20,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "#161614",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>
          <span>{line}</span>
          <span style={{ color: "#b5502b" }}>Est. 2009</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 40 }}>
          <svg width="110" height="176" viewBox="0 0 20 32">
            <path d="M10 0v13" stroke="#161614" strokeWidth="1.4" />
            <path d="M4 14h12l-6 17z" fill="#161614" />
            <path d="M10 14v17" stroke="#b5502b" strokeWidth="1.4" />
          </svg>
          <div style={{ display: "flex", fontSize: 190, fontWeight: 700, letterSpacing: -8, lineHeight: 0.85 }}>APLOMB</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #161614", paddingTop: 22, fontSize: 24 }}>
          <span>{places}</span>
          <span>aplomb-immobilier.fr</span>
        </div>
      </div>
    ),
    size,
  );
}
