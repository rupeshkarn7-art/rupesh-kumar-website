import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Rupesh Kumar — Technology. Projects. AI. Career Growth.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  const photo = await readFile(join(process.cwd(), "public/images/rupesh-kumar-square.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f6f5f1", padding: 64, fontFamily: "serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, background: "#0d1b2a", color: "#f6f5f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontFamily: "monospace", fontWeight: 700 }}>RK</div>
            <div style={{ fontSize: 28, color: "#0d1b2a", fontFamily: "sans-serif", fontWeight: 600 }}>Rupesh Kumar</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, lineHeight: 1.02, color: "#0d1b2a", letterSpacing: -2 }}>Technology. Projects. AI.</div>
            <div style={{ fontSize: 76, lineHeight: 1.05, color: "#8f3f1d", fontStyle: "italic", letterSpacing: -2 }}>Career Growth.</div>
          </div>
          <div style={{ fontSize: 24, color: "#5a6472", fontFamily: "sans-serif" }}>Technology Transformation · Project Management · AIOps</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={380} height={502} style={{ objectFit: "cover", borderRadius: 28, border: "1px solid #e3e0d8" }} alt="" />
      </div>
    ),
    size,
  );
}
