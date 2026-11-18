"use client";

import { useEffect, useRef } from "react";
import { useGraphicsTier } from "@/hooks/useGraphicsTier";
import type { BlobApi } from "./blobScene";

export type IdeaHandle = { setHeat: (v: number) => void };

/**
 * Hosts the WebGL "idea" on capable devices, and a CSS/SVG stand-in otherwise.
 * The scene module is imported lazily so it never blocks first paint.
 */
export function IdeaCanvas({ apiRef }: { apiRef: React.RefObject<IdeaHandle | null> }) {
  const tier = useGraphicsTier();
  const canvas = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tier !== "full" || !canvas.current || !wrap.current) return;
    let api: BlobApi | null = null;
    let disposed = false;
    const el = wrap.current;
    const mobile = window.matchMedia("(max-width: 767px)").matches;

    import("./blobScene")
      .then(({ createBlobScene }) => {
        if (disposed || !canvas.current) return;
        try {
          api = createBlobScene(canvas.current, { mobile });
          apiRef.current = { setHeat: (v) => api?.setHeat(v) };
          el.dataset.ready = "true";
        } catch {
          el.dataset.failed = "true";
        }
      })
      .catch(() => (el.dataset.failed = "true"));

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      api?.setPointer(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
    };
    const onResize = () => api?.resize();
    const io = new IntersectionObserver(([en]) => api?.setActive(en.isIntersecting));
    const onVis = () => api?.setActive(!document.hidden);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    io.observe(el);

    return () => {
      disposed = true;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      api?.dispose();
      apiRef.current = null;
    };
  }, [tier, apiRef]);

  return (
    <div ref={wrap} className="group/idea absolute inset-0" aria-hidden="true">
      {/* Lightweight fallback: always present underneath, faded out once WebGL is live. */}
      <div className="absolute inset-0 grid place-items-center transition-opacity duration-1000 group-data-[ready=true]/idea:opacity-0">
        <div className="relative aspect-square w-[min(78vw,520px)] md:translate-x-[22%]">
          <div className="absolute inset-0 animate-[morph_14s_ease-in-out_infinite] rounded-[42%_58%_63%_37%/45%_38%_62%_55%] bg-[radial-gradient(circle_at_35%_30%,#7be39a_0%,#39c463_28%,#0f3d1d_68%,#030a05_100%)] shadow-[0_0_120px_rgba(57,196,99,0.25)] motion-reduce:animate-none" />
          <div className="absolute inset-[6%] animate-[morph_14s_ease-in-out_infinite_reverse] rounded-[55%_45%_40%_60%/52%_60%_40%_48%] opacity-40 mix-blend-multiply [background:repeating-radial-gradient(circle_at_40%_35%,transparent_0_14px,rgba(0,0,0,0.55)_15px_16px)] motion-reduce:animate-none" />
        </div>
      </div>
      {tier === "full" ? <canvas ref={canvas} className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000 group-data-[ready=true]/idea:opacity-100" /> : null}
    </div>
  );
}
