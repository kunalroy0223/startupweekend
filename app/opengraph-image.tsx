import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Techstars Startup Weekend Siliguri 2027 — 16–18 April 2027 · AI Edition";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/tsws-logo-on-dark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#000", color: "#fff", position: "relative", fontFamily: "sans-serif" }}>
        <div style={{ position: "absolute", right: -160, top: -120, width: 760, height: 760, borderRadius: "46% 54% 42% 58%", background: "radial-gradient(circle at 35% 30%, #39c463 0%, #0f3d1d 55%, #000 80%)", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={300} height={135} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2, lineHeight: 1, maxWidth: 900 }}>TECHSTARS STARTUP WEEKEND SILIGURI 2027</div>
            <div style={{ marginTop: 28, fontSize: 32, color: "#39c463", letterSpacing: 2 }}>16–18 APRIL 2027 · AI EDITION</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
