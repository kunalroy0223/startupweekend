"use client";

import { useRef } from "react";
import { schedule } from "@/lib/content";
import { getGsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { GlyphPitch, GlyphBuild, GlyphPresent, Spark } from "@/components/illustrations/Glyphs";
import { cn } from "@/lib/cn";

type Day = (typeof schedule.days)[number];

function DayHeader({ day, tone }: { day: Day; tone: "dark" | "light" | "green" }) {
  return (
    <header className="relative grid gap-6 md:grid-cols-12 md:items-end">
      <p
        aria-hidden="true"
        data-daynum
        className={cn(
          "pointer-events-none font-display text-[clamp(10rem,32vw,30rem)] font-extrabold leading-[0.75] tracking-[-0.08em] md:col-span-6",
          tone === "dark" && "text-green",
          tone === "light" && "text-void",
          tone === "green" && "text-white [text-shadow:8px_10px_0_#000]",
        )}
      >
        {day.num}
      </p>
      <div className="md:col-span-6 md:pb-6">
        <p className={cn("eyebrow", tone === "dark" ? "text-green" : "text-void")}>
          DAY {day.num} — {day.label}
        </p>
        <h2 id={`${day.id}-title`} className="mt-3 font-display text-[clamp(2.6rem,6vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          <time dateTime={day.iso}>
            {day.weekday}, {day.date}
          </time>
        </h2>
        <p className="mt-3 font-script text-[clamp(2.4rem,4vw,3.8rem)] leading-none">{day.tagline}</p>
      </div>
    </header>
  );
}

function Milestone({ text, tone }: { text: string; tone: "dark" | "light" | "green" }) {
  return (
    <div
      className={cn(
        "relative mt-14 inline-flex max-w-xl -rotate-2 flex-col gap-2 p-6 md:mt-20 md:p-8",
        tone === "dark" && "bg-green text-void shadow-[7px_8px_0_#f0efe9]",
        tone === "light" && "bg-void text-white shadow-[7px_8px_0_#39c463]",
        tone === "green" && "bg-void text-white shadow-[7px_8px_0_#fff]",
      )}
    >
      <p className={cn("eyebrow flex items-center gap-2", tone === "dark" ? "text-void" : "text-green")}>
        <Spark className="size-3" /> THE DAY&apos;S MILESTONE
      </p>
      <p className="font-display text-[clamp(1.8rem,3.4vw,3rem)] font-extrabold leading-[1] tracking-tight">{text}</p>
    </div>
  );
}

export function ScheduleJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const [fri, sat, sun] = schedule.days;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-daynum]").forEach((n) => {
        gsap.fromTo(n, { yPercent: 30, rotate: -6 }, { yPercent: -10, rotate: 0, ease: "none", scrollTrigger: { trigger: n, start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-item]").forEach((it, i) => {
        gsap.from(it, { y: 50, opacity: 0, rotate: i % 2 ? 3 : -3, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: it, start: "top 90%" } });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* DAY 01 — speech bubbles on black */}
      <section id={fri.id} aria-labelledby={`${fri.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-void py-20 text-white md:py-28">
        <div aria-hidden="true" className="absolute inset-0 dot-field-dark opacity-50" />
        <div className="container-x relative">
          <DayHeader day={fri} tone="dark" />
          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <GlyphPitch className="hidden size-40 [--g-shadow:#39c463] md:col-span-3 md:block lg:size-56" />
            <ul className="flex flex-col gap-4 md:col-span-8 md:col-start-5">
              {fri.items.map((it, i) => (
                <li
                  key={it}
                  data-item
                  className={cn(
                    "w-fit max-w-full px-6 py-4 font-display text-[clamp(1.4rem,2.6vw,2.4rem)] font-bold leading-tight shadow-[5px_6px_0_#39c463]",
                    i % 2 ? "self-end rounded-[28px_28px_6px_28px] bg-green text-void shadow-[5px_6px_0_#f0efe9]" : "rounded-[28px_28px_28px_6px] bg-paper text-void",
                  )}
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <Milestone text={fri.milestone} tone="dark" />
        </div>
      </section>

      {/* DAY 02 — building blocks on blueprint paper */}
      <section
        id={sat.id}
        aria-labelledby={`${sat.id}-title`}
        className="relative scroll-mt-24 overflow-hidden bg-paper py-20 text-void [clip-path:polygon(0_3vh,100%_0,100%_100%,0_100%)] md:py-28"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(130,152,171,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(130,152,171,0.35)_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <div className="container-x relative">
          <DayHeader day={sat} tone="light" />
          <ul className="mt-14 flex flex-wrap items-end gap-3 md:gap-4">
            {sat.items.map((it, i) => (
              <li
                key={it}
                data-item
                className={cn(
                  "border-2 border-void px-5 py-6 font-display text-[clamp(1.3rem,2.2vw,2.2rem)] font-extrabold leading-tight tracking-tight shadow-[6px_6px_0_#000] md:px-7 md:py-8",
                  ["bg-green", "bg-white", "bg-slate", "bg-void text-white", "bg-green", "bg-white"][i],
                  ["md:basis-[38%]", "md:basis-[28%]", "md:basis-[26%]", "md:basis-[30%]", "md:basis-[40%]", "md:basis-[22%]"][i],
                  i % 3 === 1 && "md:mb-6",
                )}
              >
                <span className="mb-3 block font-mono text-xs font-normal tracking-widest opacity-80">BLOCK {String(i + 1).padStart(2, "0")}</span>
                {it}
              </li>
            ))}
          </ul>
          <div className="flex items-end justify-between gap-6">
            <Milestone text={sat.milestone} tone="light" />
            <GlyphBuild className="hidden size-40 md:block lg:size-52" />
          </div>
        </div>
      </section>

      {/* DAY 03 — the receipt, on stage green */}
      <section id={sun.id} aria-labelledby={`${sun.id}-title`} className="on-green relative scroll-mt-24 overflow-hidden bg-green py-20 text-void md:py-28">
        <div aria-hidden="true" className="absolute left-1/2 top-0 h-full w-[70vw] -translate-x-1/2 [background:radial-gradient(ellipse_at_top,rgba(255,255,255,0.45),transparent_65%)]" />
        <div className="container-x relative">
          <DayHeader day={sun} tone="green" />
          <div className="mt-14 grid items-start gap-12 md:grid-cols-12">
            <div className="min-w-0 md:col-span-6 md:col-start-2 [filter:drop-shadow(10px_12px_0_#000)]">
              <div
                className="rotate-[1.5deg] bg-white px-6 pb-14 pt-8 font-mono text-void md:px-10"
                style={{
                  clipPath:
                    "polygon(0 0,100% 0,100% calc(100% - 12px),95% 100%,90% calc(100% - 12px),85% 100%,80% calc(100% - 12px),75% 100%,70% calc(100% - 12px),65% 100%,60% calc(100% - 12px),55% 100%,50% calc(100% - 12px),45% 100%,40% calc(100% - 12px),35% 100%,30% calc(100% - 12px),25% 100%,20% calc(100% - 12px),15% 100%,10% calc(100% - 12px),5% 100%,0 calc(100% - 12px))",
                }}
              >
                <p className="text-center text-xs uppercase tracking-[0.3em]">Day 03 · {sun.weekday}</p>
                <p className="mt-1 text-center font-display text-2xl font-extrabold uppercase">Show the receipts</p>
                <p aria-hidden="true" className="my-5 overflow-hidden whitespace-nowrap text-xs tracking-widest text-void/70">
                  {"- ".repeat(80)}
                </p>
                <ol className="space-y-4">
                  {sun.items.map((it, i) => (
                    <li key={it} data-item className="flex min-w-0 items-baseline gap-3 text-base md:text-lg">
                      <span className="text-void/70">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-semibold">{it}</span>
                      <span aria-hidden="true" className="flex-1 translate-y-[-4px] border-b-2 border-dotted border-void/30" />
                      <span aria-hidden="true" className="text-green-ink">✓</span>
                    </li>
                  ))}
                </ol>
                <p aria-hidden="true" className="my-5 overflow-hidden whitespace-nowrap text-xs tracking-widest text-void/70">
                  {"= ".repeat(80)}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-void/60">The day&apos;s milestone</p>
                <p className="mt-1 font-display text-2xl font-extrabold leading-tight md:text-3xl">{sun.milestone}</p>
              </div>
            </div>
            <div className="md:col-span-4 md:col-start-9 md:pt-24">
              <GlyphPresent className="size-48 md:size-64" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
