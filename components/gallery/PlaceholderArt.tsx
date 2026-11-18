/**
 * Deterministic, art-directed placeholder for a missing archive photo.
 * It is intentionally abstract (topographic ink lines on brand colour) so it
 * can never be mistaken for real event photography.
 */
const palettes = [
  { bg: "#39c463", ink: "#000000", alt: "#f0efe9" },
  { bg: "#141614", ink: "#39c463", alt: "#8298ab" },
  { bg: "#8298ab", ink: "#000000", alt: "#f0efe9" },
  { bg: "#f0efe9", ink: "#000000", alt: "#39c463" },
  { bg: "#0f3d1d", ink: "#39c463", alt: "#f0efe9" },
  { bg: "#000000", ink: "#f0efe9", alt: "#39c463" },
  { bg: "#e4e3dc", ink: "#0f3d1d", alt: "#39c463" },
];

function rng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function blobPath(cx: number, cy: number, r: number, wobble: number, rand: () => number, pts = 9) {
  const p: [number, number][] = [];
  for (let i = 0; i < pts; i++) {
    const a = (i / pts) * Math.PI * 2;
    const rr = r * (1 - wobble / 2 + rand() * wobble);
    p.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  // Catmull-Rom → cubic Bézier, closed
  let d = `M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`;
  for (let i = 0; i < pts; i++) {
    const p0 = p[(i - 1 + pts) % pts], p1 = p[i], p2 = p[(i + 1) % pts], p3 = p[(i + 2) % pts];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + "Z";
}

export function PlaceholderArt({ seed, label, kind }: { seed: number; label: string; kind: "photo" | "video" }) {
  const pal = palettes[seed % palettes.length];
  const rand = rng(seed + 3);
  const cx = 30 + rand() * 40;
  const cy = 30 + rand() * 40;
  const rings = Array.from({ length: 9 }, (_, i) => blobPath(cx, cy, 8 + i * 9, 0.35, rand));

  return (
    <div className="absolute inset-0" style={{ background: pal.bg }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {rings.map((d, i) => (
          <path key={i} d={d} fill={i === 1 ? pal.alt : "none"} stroke={pal.ink} strokeWidth={i % 3 === 0 ? 0.9 : 0.4} opacity={0.85 - i * 0.06} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 font-mono text-[0.6rem] uppercase tracking-[0.16em]" style={{ color: pal.ink }}>
        <span className="bg-black/0">{kind === "video" ? "Archive video" : "Archive photo"} · coming soon</span>
        <span aria-hidden="true">#{String(seed).padStart(2, "0")}</span>
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}
