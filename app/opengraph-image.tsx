import { ImageResponse } from "next/og";

export const alt = "imerso — Tours 360° Interativos para Imóveis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 72,
          background:
            "linear-gradient(135deg, #1a1a3e 0%, #0a0a0f 45%, #1a1040 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #667EEA 0%, #ea7566 100%)",
            }}
          />
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#f1f5f9",
              letterSpacing: "-0.02em",
            }}
          >
            imerso
          </span>
        </div>
        <div
          style={{
            fontSize: 54,
            fontWeight: 700,
            color: "#e2e8f0",
            lineHeight: 1.12,
            maxWidth: 920,
            letterSpacing: "-0.03em",
          }}
        >
          Tours 360° interativos para imóveis
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "rgba(226, 232, 240, 0.78)",
            maxWidth: 840,
            lineHeight: 1.45,
          }}
        >
          Transforme espaços em experiências imersivas.
        </div>
      </div>
    ),
    { ...size },
  );
}
