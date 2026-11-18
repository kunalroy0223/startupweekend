"use client";

import { useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/cn";

/** Paragraph whose words light up as it scrolls through the viewport. */
export function ScrubWords({ text, className, dimClass = "" }: { text: string; className?: string; dimClass?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll<HTMLElement>("[data-w]").forEach((w) => (w.style.opacity = "1"));
      return;
    }
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-w]"),
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 45%", scrub: 0.6 },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <p ref={ref} className={cn(className)}>
      {text.split(" ").map((w, i, a) => (
        <span key={i}>
          <span data-w className={cn("transition-none", dimClass)} style={{ opacity: undefined }}>
            {w}
          </span>
          {i < a.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
