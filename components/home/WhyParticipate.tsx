"use client";

import { useRef } from "react";
import { home } from "@/lib/content";
import { getGsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

const pos = [
  "md:col-span-6 md:col-start-1",
  "md:col-span-5 md:col-start-7 md:-mt-6",
  "md:col-span-5 md:col-start-2",
  "md:col-span-6 md:col-start-7 md:-mt-10",
  "md:col-span-7 md:col-start-3",
];

/** Benefits strung along a hand-drawn path that draws itself as you scroll. */
export function WhyParticipate() {
  const ref = useRef<HTMLElement>(null);
  const w = home.why;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const path = el.querySelector<SVGPathElement>("[data-thread]");
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        });
      }
      gsap.utils.toArray<HTMLElement>("[data-benefit]").forEach((b) => {
        gsap.from(b, {
          y: 80,
          opacity: 0,
          rotate: gsap.utils.random(-4, 4),
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: b, start: "top 88%" },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="why-title"
      className="relative overflow-hidden bg-void py-20 text-white md:py-32"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 1600"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-[18%] h-[78%] w-full"
      >
        <path
          data-thread
          d="M120,0 C420,120 880,80 820,320 C760,560 160,420 220,700 C280,980 900,860 820,1120 C740,1380 300,1300 420,1600"
          fill="none"
          stroke="#39c463"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="container-x relative">
        <Eyebrow className="text-white/70">{w.eyebrow}</Eyebrow>

        <h2
          id="why-title"
          className="mt-5 overflow-visible font-display text-[clamp(2.8rem,8vw,9rem)] font-extrabold leading-[0.88] tracking-[-0.05em]"
        >
          <SplitReveal text="More than a weekend." />
          <br />
          <span className="inline-block overflow-visible pb-[0.22em] align-baseline font-script text-[1.15em] font-normal leading-[1.35] tracking-normal text-green">
            <SplitReveal
              text="A starting point."
              delay={250}
              maskClassName="pb-[0.34em] -mb-[0.34em]"
            />
          </span>
        </h2>

        <ol className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-y-20">
          {w.benefits.map((b, i) => (
            <li key={b.title} data-benefit className={cn("relative", pos[i])}>
              <div className="flex items-start gap-5">
                <span
                  aria-hidden="true"
                  className="-mt-3 font-display text-[clamp(5rem,10vw,9rem)] font-extrabold leading-none text-green"
                >
                  {i + 1}
                </span>
                <div className="pt-2">
                  <h3 className="font-display text-[clamp(1.8rem,3.4vw,3.2rem)] font-extrabold leading-none tracking-tight">
                    {b.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-lg text-white/75">{b.line}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
