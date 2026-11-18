"use client";

import { useEffect, useState } from "react";
import { event } from "@/lib/site";
import { home } from "@/lib/content";

/**
 * Honest urgency: a real day count to 16 April 2027 (IST), computed in the
 * visitor's browser. No fake timers, no invented scarcity.
 */
export function DaysToGo() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const calc = () => {
      const ms = new Date(event.startsAtIso).getTime() - Date.now();
      setDays(Math.ceil(ms / 86_400_000));
    };
    calc();
    const id = window.setInterval(calc, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="flex items-start gap-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/70 sm:text-right">
      <span className="relative mt-1 flex size-2 shrink-0">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-green opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-green" />
      </span>
      <span>
        {home.hero.closer}
        {days !== null && days > 0 ? (
          <>
            <br />
            <span className="text-green">
              {days} {days === 1 ? "day" : "days"} to go.
            </span>
          </>
        ) : null}
      </span>
    </p>
  );
}
