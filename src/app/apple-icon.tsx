import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#161614" }}>
        <svg width="90" height="140" viewBox="0 0 20 32">
          <path d="M10 0v13" stroke="#ece8e1" strokeWidth="1.4" />
          <path d="M4 14h12l-6 17z" fill="#ece8e1" />
          <path d="M10 14v17" stroke="#b5502b" strokeWidth="1.4" />
        </svg>
      </div>
    ),
    size,
  );
}
