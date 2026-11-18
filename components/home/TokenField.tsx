"use client";

import { useEffect, useRef } from "react";

const CHARS = "01aiAI{}<>/\\=+*#%&?ideabuildshiplearn".split("");

/**
 * Generative "latent field": a grid of tokens that the cursor (or a finger)
 * disturbs — tokens near it re-sample, brighten and lift, like a model
 * attending to a region. Canvas 2D, ~1 draw per frame, paused off-screen.
 */
export function TokenField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, cols = 0, rows = 0, cell = 22;
    let grid: { c: string; e: number }[] = [];
    const pointer = { x: -999, y: -999, tx: -999, ty: -999 };
    let raf = 0;
    let visible = false;
    let t = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cell = w < 500 ? 18 : 22;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      grid = Array.from({ length: cols * rows }, () => ({ c: CHARS[(Math.random() * CHARS.length) | 0], e: 0 }));
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.font = `500 ${cell * 0.62}px ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      t += 0.012;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const g = grid[y * cols + x];
          const px = x * cell + cell / 2;
          const py = y * cell + cell / 2;
          const d = Math.hypot(px - pointer.x, py - pointer.y);
          const wave = (Math.sin(x * 0.35 + t * 2) + Math.cos(y * 0.3 - t * 1.6)) * 0.5;
          const near = Math.max(0, 1 - d / 150);
          if (near > 0.2 && Math.random() < near * 0.25) g.c = CHARS[(Math.random() * CHARS.length) | 0];
          g.e += (near - g.e) * 0.1;
          const a = 0.22 + Math.max(0, wave) * 0.3 + g.e * 0.7;
          ctx.fillStyle = g.e > 0.35 ? `rgba(255,255,255,${Math.min(1, a)})` : `rgba(57,196,99,${a})`;
          ctx.fillText(g.c, px, py - g.e * 6);
        }
      }
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (visible) draw();
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.tx = -999;
      pointer.ty = -999;
    };

    resize();
    draw();
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
