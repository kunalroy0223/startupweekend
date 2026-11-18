"use client";

import { useRef } from "react";
import { home } from "@/lib/content";
import { getGsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { journeyGlyphs } from "@/components/illustrations/Glyphs";
import { cn } from "@/lib/cn";

const tilt = [-3, 2, -1.5, 3, -2];
const clips = [
  "polygon(0 3%,100% 0,98% 100%,2% 96%)",
  "polygon(2% 0,100% 4%,100% 97%,0 100%)",
  "polygon(0 0,97% 3%,100% 100%,3% 97%)",
  "polygon(3% 2%,100% 0,97% 98%,0 100%)",
  "polygon(0 4%,98% 0,100% 96%,2% 100%)",
];
const panelTone = [
  "bg-void text-white [--g-shadow:#39c463] [--g-alt:#f0efe9]",
  "bg-green text-void on-green",
  "bg-paper-2 text-void",
  "bg-slate text-void",
  "bg-void text-white [--g-shadow:#39c463]",
];

/**
 * The Journey: on large screens the five beats travel sideways as you scroll
 * (one deliberate pin on the homepage). On smaller screens they stack as
 * offset, overlapping slabs — no pinning on touch devices.
 */
export function Journey() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = wrap.current;
    const tr = track.current;
    if (!el || !tr) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => tr.scrollWidth - window.innerWidth + 80;
      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      gsap.to("[data-journey-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, scrub: true },
      });
      gsap.utils.toArray<HTMLElement>("[data-journey-glyph]").forEach((g) => {
        gsap.fromTo(
          g,
          { rotate: -25, scale: 0.6 },
          { rotate: 0, scale: 1, ease: "back.out(2)", scrollTrigger: { trigger: g, containerAnimation: tween, start: "left 85%", end: "left 45%", scrub: true } },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={wrap} className="relative overflow-hidden pb-20 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:pb-0">
      <div className="container-x mb-8 flex items-end justify-between gap-6 lg:mb-10">
        <h3 className="font-display text-[clamp(2rem,4vw,3.8rem)] font-extrabold tracking-tight">{home.about.journeyTitle}</h3>
        <div className="hidden h-[3px] w-1/3 bg-void/15 lg:block" aria-hidden="true">
          <div data-journey-progress className="h-full origin-left scale-x-0 bg-void" />
        </div>
      </div>

      <ol ref={track} className="container-x flex flex-col gap-4 lg:w-max lg:flex-row lg:gap-6 lg:pr-[20vw]">
        {home.about.journey.map((step, i) => {
          const Glyph = journeyGlyphs[i];
          return (
            <li
              key={step.word}
              className={cn(
                "relative shrink-0 [filter:drop-shadow(6px_7px_0_#000)] lg:w-[min(44vw,620px)]",
                i % 2 ? "sm:ml-[12%] lg:ml-0 lg:mt-[8vh]" : "sm:mr-[12%] lg:mr-0",
              )}
              style={{ transform: `rotate(${tilt[i]}deg)` }}
            >
              <div
                className={cn("relative flex h-full flex-col justify-between overflow-hidden p-6 md:p-8 lg:h-[62vh]", panelTone[i])}
                style={{ clipPath: clips[i] }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-sm tracking-widest opacity-70">0{i + 1} / 05</span>
                  <span data-journey-glyph className="block">
                    <Glyph className="size-20 md:size-28 lg:size-36" />
                  </span>
                </div>
                <div className="mt-10">
                  <p className="display-xl text-[clamp(3.2rem,9vw,9rem)]">{step.word}</p>
                  <p className="mt-3 max-w-xs text-lg font-medium md:text-xl">{step.line}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
