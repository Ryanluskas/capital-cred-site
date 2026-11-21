import { ImageResponse } from "next/og";

export const alt = "CapitalCred · Crédito consignado em Goiânia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(130deg, #07172f 15%, #123b73 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 46, fontWeight: 700 }}>
          <svg width="52" height="52" viewBox="8 8 48 48" style={{ marginRight: 14 }}>
            <path d="M13 38 41 16v13L13 49z" fill="#79b5ff" />
            <path d="m41 16 10 6v16l-10-9z" fill="#d8eaff" />
          </svg>
          <span>Capital</span><span style={{ color: "#80b7ff" }}>Cred</span>
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.08, maxWidth: 850, marginTop: 70 }}>
          Crédito consignado em Goiânia
        </div>
        <div style={{ display: "flex", fontSize: 27, color: "#b8d9ff", marginTop: 24 }}>
          Atendimento especializado para o seu perfil
        </div>
      </div>
    ),
    size,
  );
}
