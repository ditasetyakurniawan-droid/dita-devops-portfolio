import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Dita Setya Kurniawan | DevOps & Platform Engineer";
export const size = {
  width: 1200,
  height: 630,
};
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
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#030014",
          backgroundImage:
            "radial-gradient(circle 800px at 100% 0%, rgba(147, 51, 234, 0.35), transparent), radial-gradient(circle 800px at 0% 100%, rgba(6, 182, 212, 0.25), transparent)",
          padding: "60px 80px",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #9333ea, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "22px",
              color: "#ffffff",
              boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
            }}
          >
            DK
          </div>
          <span style={{ fontSize: "22px", color: "#94a3b8", letterSpacing: "2px", fontWeight: 600 }}>
            DITA SETYA KURNIAWAN
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "66px",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1.1,
              color: "#f8fafc",
            }}
          >
            DevOps & Platform Engineer
          </div>
          <div style={{ fontSize: "28px", color: "#94a3b8", maxWidth: "960px", lineHeight: 1.4 }}>
            Bank Rakyat Indonesia (BRI) · 200+ Microservices · Kubernetes Multi-VM Homelab 100% Dari 0
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: "9999px",
              background: "rgba(147, 51, 234, 0.25)",
              border: "1px solid rgba(147, 51, 234, 0.5)",
              color: "#e9d5ff",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Bamboo CI/CD & Helm
          </div>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: "9999px",
              background: "rgba(6, 182, 212, 0.2)",
              border: "1px solid rgba(6, 182, 212, 0.5)",
              color: "#a5f3fc",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Kubernetes HA & GitOps
          </div>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: "9999px",
              background: "rgba(16, 185, 129, 0.2)",
              border: "1px solid rgba(16, 185, 129, 0.5)",
              color: "#a7f3d0",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            HashiCorp Vault HA
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
