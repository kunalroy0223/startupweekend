"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";

export const INTRO_KEY = "tsws-intro-v1";
export const INTRO_DONE_EVENT = "tsws:intro-done";

declare global {
  interface Window {
    __tswsIntroDone?: boolean;
  }
}

export function markIntroDone() {
  window.__tswsIntroDone = true;
  window.dispatchEvent(new Event(INTRO_DONE_EVENT));
}

/** Runs `cb` once the intro has finished (or immediately if it never ran). */
export function onIntroDone(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  if (window.__tswsIntroDone || document.documentElement.classList.contains("intro-seen")) {
    cb();
    return () => {};
  }
  const h = () => cb();
  window.addEventListener(INTRO_DONE_EVENT, h, { once: true });
  // Safety: never wait forever.
  const t = window.setTimeout(h, 6500);
  return () => {
    window.removeEventListener(INTRO_DONE_EVENT, h);
    window.clearTimeout(t);
  };
}

/** Inline, render-blocking script: skips the overlay before first paint when already seen. */
export const introBootScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(r||sessionStorage.getItem('${INTRO_KEY}')==='1'){d.classList.add('intro-seen');window.__tswsIntroDone=true;}}catch(e){document.documentElement.classList.add('intro-seen');}})();`;

const COLS = 9;
const ROWS = 3; // techstars_ / Startup Weekend / Siliguri
const LOGO_W = 433;
const LOGO_H = 195;
const SCATTER = "techstarsupweknilgr_".split("");

/**
 * Opening sequence, after Logo_reveal_animation.mp4:
 * darkness → light bloom → scattered letters drift in → the official logo
 * assembles from glitching slices → "2027" ignites in green with a particle
 * trail → the stage shutters open onto the hero.
 * The real logo PNG is used throughout (sliced, never redrawn).
 */
export function IntroLoader() {
  const [active, setActive] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("intro-seen")) {
      setActive(false);
      markIntroDone();
      return;
    }
    const el = root.current;
    if (!el) return;
    const { gsap } = getGsap();
    html.style.overflow = "hidden";

    /* particles */
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();
    type Pt = { x: number; y: number; vx: number; vy: number; r: number; a: number; g: boolean };
    const pts: Pt[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.05,
      r: Math.random() * 1.6 + 0.3,
      a: Math.random() * 0.6 + 0.1,
      g: Math.random() > 0.55,
    }));
    const trail = { p: 0, on: false };
    let raf = 0;
    const draw = () => {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -5) p.y = window.innerHeight + 5;
        ctx.fillStyle = p.g ? `rgba(57,196,99,${p.a})` : `rgba(255,255,255,${p.a * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (trail.on) {
        // green swoosh under the last line, like the reference
        const logo = el.querySelector<HTMLElement>("[data-logo]");
        if (logo) {
          const b = logo.getBoundingClientRect();
          const y0 = b.bottom + 6;
          const n = 60;
          for (let i = 0; i < n * trail.p; i++) {
            const t = i / n;
            const x = b.left + t * b.width * 1.25;
            const y = y0 - Math.sin(t * Math.PI) * 14 + Math.sin(t * 9 + trail.p * 6) * 3;
            ctx.fillStyle = `rgba(57,196,99,${(1 - t) * 0.9})`;
            ctx.beginPath();
            ctx.arc(x + (Math.random() - 0.5) * 6, y + (Math.random() - 0.5) * 6, Math.random() * 1.8 + 0.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    const finish = () => {
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}
      html.style.overflow = "";
      html.classList.add("intro-seen");
      setActive(false);
      markIntroDone();
    };

    const g = gsap.context(() => {
      const pieces = gsap.utils.toArray<HTMLElement>("[data-piece]");
      const letters = gsap.utils.toArray<HTMLElement>("[data-letter]");
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: finish });
      tlRef.current = tl;

      gsap.set(pieces, {
        x: () => gsap.utils.random(-260, 260),
        y: () => gsap.utils.random(-90, 90),
        rotate: () => gsap.utils.random(-25, 25),
        opacity: 0,
        filter: "blur(8px)",
      });
      gsap.set(letters, {
        x: () => gsap.utils.random(-window.innerWidth * 0.45, window.innerWidth * 0.45),
        y: () => gsap.utils.random(-window.innerHeight * 0.4, window.innerHeight * 0.4),
        rotate: () => gsap.utils.random(-90, 90),
        opacity: 0,
      });

      tl.to("[data-bloom]", { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 0)
        .to(letters, { opacity: () => gsap.utils.random(0.3, 0.9), duration: 0.4, stagger: 0.008 }, 0.1)
        .to(letters, { x: 0, y: 0, rotate: 0, scale: 0.2, opacity: 0, duration: 1.1, ease: "power3.in", stagger: 0.006 }, 0.35)
        .to(pieces, { x: 0, y: 0, rotate: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: { each: 0.018, from: "random" } }, 0.55)
        .fromTo("[data-glitch]", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.8, duration: 0.12, stagger: 0.05, ease: "steps(3)", yoyo: true, repeat: 3 }, 0.7)
        .to("[data-glitch]", { opacity: 0, duration: 0.1 }, 1.45)
        .fromTo("[data-sweep]", { xPercent: -120 }, { xPercent: 220, duration: 0.9, ease: "power2.inOut" }, 1.3)
        .call(() => void (trail.on = true), [], 1.55)
        .to(trail, { p: 1, duration: 0.8, ease: "power2.out" }, 1.55)
        .fromTo("[data-year]", { clipPath: "inset(0 100% 0 0)", opacity: 1 }, { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power3.out" }, 1.6)
        .to("[data-skip]", { opacity: 0, duration: 0.2 }, 2.45)
        // exit: logo lifts away, shutters open onto the hero
        .to("[data-stage]", { scale: 0.86, y: -30, opacity: 0, filter: "blur(6px)", duration: 0.6, ease: "power3.in" }, 2.55)
        .to("[data-shutter-top]", { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, 2.75)
        .to("[data-shutter-bottom]", { yPercent: 100, duration: 0.85, ease: "expo.inOut" }, 2.75)
        .to(canvas, { opacity: 0, duration: 0.4 }, 2.75)
        .call(() => markIntroDone(), [], 3.0);
    }, el);

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && tlRef.current?.progress(1);
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKey);
      g.revert();
      html.style.overflow = "";
    };
  }, []);

  if (!active) return null;

  return (
    <div ref={root} className="intro-overlay fixed inset-0 z-[150]" aria-hidden="false">
      <div data-shutter-top className="absolute inset-x-0 top-0 h-1/2 bg-void" />
      <div data-shutter-bottom className="absolute inset-x-0 bottom-0 h-1/2 bg-void" />
      <div
        data-bloom
        className="pointer-events-none absolute left-1/2 top-[-30vh] h-[90vh] w-[90vw] -translate-x-1/2 scale-75 rounded-full opacity-0 [background:radial-gradient(closest-side,rgba(255,255,255,0.13),transparent)]"
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />

      <div data-stage className="absolute inset-0 grid place-items-center">
        {/* scattered letters */}
        <div className="pointer-events-none absolute left-1/2 top-1/2">
          {Array.from({ length: 46 }, (_, i) => (
            <span key={i} data-letter className="absolute font-mono text-sm text-white/80" style={{ fontSize: `${10 + ((i * 7) % 14)}px` }}>
              {SCATTER[i % SCATTER.length]}
            </span>
          ))}
        </div>

        <div className="relative" role="img" aria-label="Techstars Startup Weekend Siliguri 2027">
          <div data-logo className="relative overflow-visible" style={{ width: "min(68vw, 520px)", aspectRatio: `${LOGO_W} / ${LOGO_H}` }}>
            {Array.from({ length: ROWS * COLS }, (_, i) => {
              const r = Math.floor(i / COLS);
              const c = i % COLS;
              return (
                <span
                  key={i}
                  data-piece
                  className="absolute block bg-no-repeat"
                  style={{
                    left: `${(c / COLS) * 100}%`,
                    top: `${(r / ROWS) * 100}%`,
                    width: `${100 / COLS + 0.2}%`,
                    height: `${100 / ROWS + 0.2}%`,
                    backgroundImage: "url(/brand/tsws-logo-on-dark.png)",
                    backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                    backgroundPosition: `${(c / (COLS - 1)) * 100}% ${(r / (ROWS - 1)) * 100}%`,
                  }}
                />
              );
            })}
            {/* glitch scanlines */}
            {[22, 38, 51, 63, 78, 90].map((t, i) => (
              <span
                key={i}
                data-glitch
                className="absolute h-[2px] origin-left bg-white/70 opacity-0"
                style={{ top: `${t}%`, left: `${(i * 17) % 40}%`, width: `${30 + ((i * 23) % 50)}%` }}
              />
            ))}
            {/* light sweep */}
            <span
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{ WebkitMaskImage: "url(/brand/tsws-logo-on-dark.png)", maskImage: "url(/brand/tsws-logo-on-dark.png)", WebkitMaskSize: "100% 100%", maskSize: "100% 100%" }}
            >
              <span data-sweep className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent" />
            </span>
            <span
              data-year
              className="absolute font-display font-bold text-green opacity-0"
              style={{ left: "43%", top: "59.5%", fontSize: "min(7.6vw, 58px)", lineHeight: 1, letterSpacing: "-0.02em" }}
            >
              2027
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        data-skip
        onClick={() => tlRef.current?.progress(1)}
        className="absolute bottom-6 right-6 font-mono text-xs uppercase tracking-[0.2em] text-white/60 underline-offset-4 hover:text-white hover:underline"
      >
        Skip intro
      </button>
    </div>
  );
}
