"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Need a starting point?" as a prompt log. Every line is real DOM text
 * (crawlable, readable); the typing reveal is a CSS clip that plays line by
 * line once the log scrolls into view.
 */
export function PromptLog({ items }: { items: readonly { sector: string; idea: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="[filter:drop-shadow(8px_9px_0_#000)]">
    <div className="relative bg-void p-5 font-mono text-sm text-white [clip-path:polygon(0_0,100%_2%,99%_100%,1%_97%)] md:p-8 md:text-base">
      <div aria-hidden="true" className="mb-5 flex items-center justify-between border-b border-white/10 pb-3 text-[0.65rem] uppercase tracking-[0.2em] text-white/65">
        <span>starting-points.log</span>
        <span className="text-green">● live</span>
      </div>
      <ul className="space-y-5">
        {items.map((it, i) => (
          <li key={it.sector} className="grid gap-1 md:grid-cols-[10rem_1fr] md:gap-6">
            <span className="text-green">
              <span aria-hidden="true">&gt; </span>
              {it.sector}
            </span>
            <span
              className="block transition-[clip-path] ease-[steps(40)] motion-reduce:transition-none"
              style={{
                clipPath: on ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                transitionDuration: "1100ms",
                transitionDelay: `${i * 900}ms`,
              }}
            >
              {it.idea}
            </span>
          </li>
        ))}
      </ul>
      <p aria-hidden="true" className="mt-5 text-green">
        &gt; <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-green" />
      </p>
    </div>
    </div>
  );
}
