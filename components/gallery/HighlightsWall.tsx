"use client";

import Image from "next/image";
import { useState } from "react";
import { highlights, hasRealMedia } from "@/lib/media";
import { home } from "@/lib/content";
import { track } from "@/lib/analytics";
import { PlaceholderArt } from "./PlaceholderArt";
import { Lightbox } from "./Lightbox";

const clips = [
  "polygon(0 2%,100% 0,99% 97%,1% 100%)",
  "polygon(3% 0,100% 2%,97% 100%,0 98%)",
  "polygon(0 0,98% 4%,100% 100%,2% 95%)",
  "polygon(1% 3%,97% 0,100% 96%,0 100%)",
  "polygon(4% 0,100% 5%,96% 100%,0 94%)",
  "polygon(0 4%,100% 0,100% 100%,3% 97%)",
  "polygon(2% 0,98% 2%,100% 98%,0 100%)",
];
const rot = [-0.8, 1.2, 0, -1.4, 2, 0.6, -1.8];

export function HighlightsWall() {
  const [open, setOpen] = useState<number | null>(null);

  const openAt = (i: number) => {
    setOpen(i);
    track("gallery_open", { slot: highlights[i].id, kind: highlights[i].kind });
  };

  return (
    <>
      <ul
        className="grid grid-flow-dense grid-cols-6 gap-3 [grid-auto-rows:clamp(56px,14vw,88px)] md:gap-4 lg:grid-cols-12 lg:[grid-auto-rows:clamp(48px,5.4vw,96px)]"
        aria-label="Previous edition highlights"
      >
        {highlights.map((h, i) => {
          const real = hasRealMedia(h);
          return (
            <li
              key={h.id}
              className="relative [grid-column:span_var(--cs)] [grid-row:span_var(--rs)] lg:[grid-column:span_var(--cl)] lg:[grid-row:span_var(--rl)]"
              style={{
                ["--cs" as string]: h.spanSm[0],
                ["--rs" as string]: h.spanSm[1],
                ["--cl" as string]: h.span[0],
                ["--rl" as string]: h.span[1],
                transform: `rotate(${rot[i % rot.length]}deg)`,
              }}
            >
              <button
                type="button"
                onClick={() => openAt(i)}
                data-cursor={h.kind === "video" ? "Play" : "View"}
                className="group relative block h-full w-full overflow-hidden text-left transition-[clip-path,transform] duration-700 ease-[var(--ease-out-expo)] hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)!important]"
                style={{ clipPath: clips[i % clips.length] }}
                aria-label={`${h.kind === "video" ? "Play video" : "Open photo"}: ${h.caption}${real ? "" : " (coming soon)"}`}
              >
                <span className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06] motion-reduce:transition-none">
                  {real && h.src ? (
                    <Image src={h.src} alt={h.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
                  ) : (
                    <PlaceholderArt seed={h.seed} label={h.alt} kind={h.kind} />
                  )}
                </span>

                {h.kind === "video" ? (
                  <span aria-hidden="true" className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center transition-transform duration-500 group-hover:scale-110 md:size-24">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow motion-reduce:animate-none">
                      <path d="M50 4c14 0 22 8 32 14s14 18 14 32-6 24-14 32-18 14-32 14-24-6-32-14S4 64 4 50s6-22 14-32S36 4 50 4z" fill="#000" stroke="#39c463" strokeWidth="2" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="relative ml-1 size-7 text-green">
                      <path d="M6 4l14 8-14 8z" fill="currentColor" />
                    </svg>
                  </span>
                ) : null}

                <span className="absolute inset-x-0 top-0 flex translate-y-[-100%] items-start justify-between gap-3 bg-void/85 p-3 text-sm text-white transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  <span>{h.caption}</span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-widest text-green">{h.kind}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => openAt(0)}
          className="group inline-flex items-center gap-3 border-b-2 border-green pb-1 font-mono text-sm font-semibold uppercase tracking-[0.16em] text-white hover:text-green"
        >
          {home.highlights.cta}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </button>
        <p className="text-sm italic text-white/60">{home.highlights.note}</p>
      </div>

      <Lightbox index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}

