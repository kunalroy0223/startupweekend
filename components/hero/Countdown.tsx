"use client";

import { useEffect, useState } from "react";
import { event } from "@/lib/site";
import { getCountdown, pad2, type Countdown as CountdownT } from "@/lib/countdown";
import { cn } from "@/lib/cn";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

/**
 * Live countdown to the official start (lib/site.ts → event.startsAt, IST).
 * The server renders "--" placeholders (no stale or invented numbers in HTML);
 * the browser fills in real values and ticks on each second boundary.
 * The visible digits are aria-hidden; screen readers get one stable sentence
 * instead of a per-second announcement.
 */
export function Countdown({ className }: { className?: string }) {
  const [c, setC] = useState<CountdownT | null>(null);

  useEffect(() => {
    let id = 0;
    const tick = () => {
      const now = Date.now();
      setC(getCountdown(now, event.startsAt, event.endsAt));
      id = window.setTimeout(tick, 1000 - (now % 1000) + 5);
    };
    tick();
    return () => window.clearTimeout(id);
  }, []);

  if (c?.status === "live") {
    return (
      <div className={cn("glass rounded-[1.5rem] p-5 md:p-6", className)} role="status">
        <p className="eyebrow flex items-center gap-2 text-green">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-[pulse-ring_1.6s_ease-out_infinite] rounded-full bg-green" />
            <span className="relative size-2 rounded-full bg-green" />
          </span>
          Live now
        </p>
        <p className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Day {pad2(c.dayOfEvent)} · Hour {pad2(c.hourOfEvent)}
        </p>
        <p className="mt-1 text-sm text-white/70">The 54 hours are underway at {event.shortName}.</p>
      </div>
    );
  }

  if (c?.status === "ended") {
    return (
      <div className={cn("glass rounded-[1.5rem] p-5 md:p-6", className)} role="status">
        <p className="eyebrow text-white/70">That&apos;s a wrap</p>
        <p className="mt-3 font-display text-2xl font-extrabold tracking-tight md:text-3xl">{event.name} has ended.</p>
        <p className="mt-1 text-sm text-white/70">Thank you to every builder, mentor and organiser.</p>
      </div>
    );
  }

  return (
    <div className={cn("glass rounded-[1.5rem] p-4 md:p-5", className)}>
      <p className="sr-only">
        Countdown to {event.name}, which starts on {event.dates}.
        {c ? ` ${c.days} days, ${c.hours} hours and ${c.minutes} minutes to go.` : ""}
      </p>
      <div aria-hidden="true" className="flex items-stretch">
        {UNITS.map((u, i) => (
          <div key={u.key} className={cn("flex flex-1 flex-col items-center px-1 sm:px-3", i > 0 && "border-l border-white/10")}>
            <span className="font-display text-[clamp(1.9rem,6.5vw,3.2rem)] font-extrabold leading-none tracking-[-0.03em] tabular-nums">
              {c ? pad2(c[u.key]) : "--"}
            </span>
            <span className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/60 sm:text-[0.62rem]">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
