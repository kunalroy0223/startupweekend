"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { home } from "@/lib/content";
import { event, venue } from "@/lib/site";
import { getGsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { TicketButton } from "@/components/ui/TicketButton";
import { Spark } from "@/components/illustrations/Glyphs";
import { IdeaCanvas, type IdeaHandle } from "./IdeaCanvas";
import { Countdown } from "./Countdown";
import { cn } from "@/lib/cn";
import { AssociationBadge } from "@/components/ui/AssociationBadge";

/** Decorative "group chat" fragments — the ideas the hero pulls into the build. */
const bubbles = [
  { text: "ok but what if we actually built this?", x: "3%", y: "17%", r: -6, tone: "paper", side: "l" },
  { text: "saved to notes, again", x: "38%", y: "12%", r: -2, tone: "slate", side: "l" },
  { text: "someone should make an app for this", x: "70%", y: "17%", r: 5, tone: "green", side: "r" },
  { text: "who's in?", x: "84%", y: "34%", r: 7, tone: "paper", side: "r" },
] as const;

const bubbleTone = {
  paper: "bg-paper text-void",
  green: "bg-green text-void",
  slate: "bg-slate text-void",
};

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const idea = useRef<IdeaHandle | null>(null);
  const live = true;

  // cursor parallax (desktop) — springs feed CSS transforms only
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });
  const backX = useTransform(sx, (v) => v * -18);
  const backY = useTransform(sy, (v) => v * -10);
  const frontX = useTransform(sx, (v) => v * 26);
  const frontY = useTransform(sy, (v) => v * 16);


  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  // Scroll: bubbles get pulled into the idea, the form swells, type drifts apart.
  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
          onUpdate: (st) => idea.current?.setHeat(st.progress),
        },
      });
      tl.to("[data-bubble]", { left: "50%", top: "46%", xPercent: -50, scale: 0.1, opacity: 0, rotate: 0, ease: "power2.in", stagger: 0.03 }, 0)
        .to("[data-idea]", { scale: 1.25, yPercent: 8, ease: "none" }, 0)
        .to("[data-line='a']", { xPercent: -18, ease: "none" }, 0)
        .to("[data-line='b']", { xPercent: 14, ease: "none" }, 0)
        .to("[data-script]", { yPercent: -60, rotate: -14, ease: "none" }, 0)
        .to("[data-meta]", { yPercent: -40, opacity: 0, ease: "none" }, 0);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-void text-white"
      data-live={live || undefined}
    >
      {/* environment */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 dot-field-dark opacity-60" />
      <div aria-hidden="true" className="absolute left-1/2 top-[-20%] -z-20 h-[80vh] w-[120vw] -translate-x-1/2 [background:radial-gradient(closest-side,rgba(57,196,99,0.18),transparent)]" />

      <div data-idea className="absolute inset-0 -z-10 will-change-transform">
        <IdeaCanvas apiRef={idea} />
      </div>

      {/* chat fragments (decorative, draggable on desktop) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
        {bubbles.map((b, i) => (
          <div key={i} data-bubble className="absolute" style={{ left: b.x, top: b.y }}>
            <motion.div
              drag
              dragSnapToOrigin
              dragElastic={0.6}
              whileDrag={{ scale: 1.08, rotate: 0 }}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={live ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.9 + i * 0.12, type: "spring", stiffness: 160, damping: 16 }}
              className="pointer-events-auto cursor-grab active:cursor-grabbing"
              data-cursor="Drag"
            >
              <div
                className={cn(
                  "relative max-w-[15rem] animate-[float-y_6s_ease-in-out_infinite] px-4 py-3 font-mono text-[0.78rem] leading-snug shadow-[4px_5px_0_#000] motion-reduce:animate-none",
                  bubbleTone[b.tone],
                  b.side === "l" ? "rounded-[18px_18px_18px_4px]" : "rounded-[18px_18px_4px_18px]",
                )}
                style={{ ["--r" as string]: `${b.r}deg`, animationDelay: `${i * -1.3}s` }}
              >
                {b.text}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="container-x relative flex min-h-[100svh] flex-col pb-[12vh] pt-24 md:pt-28">
        {/* top meta */}
        <motion.div
          data-anim
          data-meta
          initial={{ opacity: 0, y: -12 }}
          animate={live ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
        >
          <AssociationBadge size="md" />
          <p className="eyebrow flex items-center gap-2 text-green">
            <Spark className="size-3" />
            {home.hero.eyebrow}
          </p>
        </motion.div>

        {/* kinetic headline */}
        <div className="relative my-auto py-8 md:py-6">
          <h1 id="hero-title" className="relative">
            <motion.span style={{ x: backX, y: backY }} className="block">
              <span data-line="a" className="block overflow-hidden">
                <motion.span
                  data-anim
                  initial={{ y: "105%" }}
                  animate={live ? { y: "0%" } : {}}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                  className="block font-display text-[clamp(1.6rem,4.6vw,4.6rem)] font-bold leading-none tracking-[-0.03em] text-white/90"
                >
                  Got a startup idea?
                </motion.span>
              </span>
            </motion.span>
            <motion.span style={{ x: frontX, y: frontY }} className="relative mt-2 block">
              <span data-line="b" className="block overflow-hidden">
                <motion.span
                  data-anim
                  initial={{ y: "105%" }}
                  animate={live ? { y: "0%" } : {}}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                  className="display-xl block text-[clamp(3rem,14vw,15rem)] uppercase"
                >
                  Let&apos;s see
                  <br className="md:hidden" /> you
                </motion.span>
              </span>
              <motion.span
                data-anim
                data-script
                initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                animate={live ? { opacity: 1, scale: 1, rotate: -8 } : {}}
                transition={{ delay: 0.7, type: "spring", stiffness: 120, damping: 12 }}
                className="absolute bottom-[-0.35em] right-[2%] block font-script text-[clamp(5rem,17vw,19rem)] leading-none text-green [text-shadow:6px_6px_0_#000] md:right-[6%]"
              >
                cook.
              </motion.span>
            </motion.span>
          </h1>
        </div>

        {/* bottom rail: the facts, always legible */}
        <motion.div
          data-anim
          data-meta
          initial={{ opacity: 0, y: 24 }}
          animate={live ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid gap-6 border-t border-white/15 pt-5 sm:grid-cols-2 sm:items-end lg:grid-cols-12"
        >
          <p className="max-w-sm text-lg leading-snug text-white sm:col-span-2 lg:col-span-4 lg:text-xl">{home.hero.sub}</p>

          <div className="lg:col-span-4">
            <p className="font-display text-3xl font-extrabold tracking-tight text-green md:text-4xl">
              <time dateTime={`${event.startDate}/${event.endDate}`}>{event.datesUpper}</time>
            </p>
            <p className="mt-1 text-sm text-white/75">{venue.short}.</p>
            <p className="eyebrow mt-3 text-white">{event.formatLine}</p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:items-end lg:col-span-4">
            <TicketButton size="lg" source="hero" />
        <Countdown className="w-full max-w-sm" />          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-28 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="h-10 w-px origin-top animate-[float-y_2.4s_ease-in-out_infinite] bg-gradient-to-b from-green to-transparent" />
      </div>
    </section>
  );
}
