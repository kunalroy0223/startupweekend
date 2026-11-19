import { useId } from "react";
import { cn } from "@/lib/cn";

/** Rotating wobbly "seal" with orbiting text — a reusable sticker accent. */
export function Stamp({
  className,
  text = "54 HOURS · 3 DAYS · 1 BIG BUILD · ",
}: {
  className?: string;
  text?: string;
}) {
  const id = `stamp-${useId().replace(/:/g, "")}`;

  // 14-point irregular burst (28 alternating outer/inner points).
  const pts = Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2;
    const r = i % 2 === 0 ? 50 : 44 + ((i * 7) % 4);
    return `${60 + Math.cos(a) * r},${60 + Math.sin(a) * r}`;
  }).join(" ");

  return (
    <svg
      viewBox="0 0 120 120"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={cn("block aspect-square overflow-visible", className)}
    >
      {/* Rotate only the seal and orbiting text around the fixed SVG viewBox centre. */}
      <g
        className="animate-spin-slow motion-reduce:animate-none"
        style={{
          transformBox: "view-box",
          transformOrigin: "50% 50%",
        }}
      >
        <polygon
          points={pts}
          fill="#39c463"
          stroke="#000"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        <defs>
          <path
            id={id}
            d="M60,60 m-32,0 a32,32 0 1,1 64,0 a32,32 0 1,1 -64,0"
          />
        </defs>

        <text
          fontFamily="var(--font-jetbrains), monospace"
          fontSize="8.4"
          fontWeight="600"
          letterSpacing="1.4"
          fill="#000"
        >
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </g>

      {/* Keep the 54h label stationary while the outer seal rotates. */}
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fontFamily="var(--font-bricolage), sans-serif"
        fontWeight="800"
        fontSize="24"
        fill="#000"
      >
        54h
      </text>
    </svg>
  );
}
