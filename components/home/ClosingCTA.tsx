"use client";

import { useRef } from "react";
import { home } from "@/lib/content";
import { getGsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { TicketButton } from "@/components/ui/TicketButton";

/** The finale: a colossal "54" fills with ink as you arrive, then hands off to the footer. */
export function ClosingCTA() {
  const ref = useRef<HTMLElement>(null);
  const c = home.closing;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-fill]", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", ease: "none", scrollTrigger: { trigger: el, start: "top 75%", end: "center 45%", scrub: 0.6 } });
      gsap.fromTo("[data-54]", { scale: 0.85, rotate: -4 }, { scale: 1, rotate: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="closing-title"
      className="on-green relative overflow-hidden bg-green text-void [clip-path:polygon(0_0,100%_3vh,100%_100%,0_100%)]"
    >
      <div className="container-x relative grid min-h-[100svh] place-items-center py-24 text-center">
        <div data-54 aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="relative font-display text-[clamp(16rem,58vw,64rem)] font-extrabold leading-none tracking-[-0.08em]">
            <span className="text-[#31ad57]">54</span>
            <span data-fill className="absolute inset-0 text-void">
              54
            </span>
          </div>
        </div>

        <div className="relative">
          <h2 id="closing-title" className="mx-auto max-w-[12ch] bg-green/0 font-display text-[clamp(3rem,9vw,9.5rem)] font-extrabold leading-[0.88] tracking-[-0.05em] text-white [text-shadow:6px_7px_0_#000]">
            {c.title}
          </h2>
          <p className="mx-auto mt-6 max-w-md bg-void px-4 py-2 text-lg font-medium text-white">{c.body}</p>
          <div className="mt-10 flex justify-center">
            <TicketButton size="xl" variant="ink" source="closing" />
          </div>
        </div>
      </div>
    </section>
  );
}
