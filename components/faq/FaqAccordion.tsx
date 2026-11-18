"use client";

import { useEffect, useState } from "react";
import type { Faq } from "@/lib/content";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const tilt = ["-rotate-[0.4deg]", "rotate-[0.5deg]", "-rotate-[0.2deg]", "rotate-[0.3deg]"];

/**
 * Accessible accordion. Every answer is server-rendered and stays in the DOM
 * (crawlable); collapsed panels animate with the 0fr→1fr grid trick and are
 * marked inert so keyboard and screen-reader users only meet open answers.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  // Deep links (#question-id) and the "Jump to" index open their answer.
  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.slice(1);
      if (items.some((f) => f.id === id)) setOpen(id);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [items]);

  return (
    <ul className="flex flex-col gap-5">
      {items.map((f, i) => {
        const isOpen = open === f.id;
        return (
          <li key={f.id} id={f.id} className={cn("scroll-mt-28 [filter:drop-shadow(5px_6px_0_#000)]", tilt[i % tilt.length])}>
            <div className="bg-white">
              <h2>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${f.id}-panel`}
                  id={`${f.id}-btn`}
                  onClick={() => {
                    setOpen(isOpen ? null : f.id);
                    track("faq_toggle", { id: f.id, open: !isOpen });
                  }}
                  className={cn(
                    "flex w-full items-start gap-4 px-5 py-5 text-left transition-colors duration-300 md:px-7 md:py-6",
                    isOpen ? "bg-green" : "hover:bg-paper",
                  )}
                >
                  <span className="mt-1.5 font-mono text-xs text-void/80">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-display text-xl font-extrabold leading-tight tracking-tight md:text-2xl">{f.q}</span>
                  <span aria-hidden="true" className={cn("mt-1 grid size-7 shrink-0 place-items-center border-2 border-void transition-transform duration-500", isOpen && "rotate-[135deg] bg-void text-green")}>
                    <svg viewBox="0 0 12 12" className="size-3">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                </button>
              </h2>
              <div
                id={`${f.id}-panel`}
                role="region"
                aria-labelledby={`${f.id}-btn`}
                inert={!isOpen}
                className={cn("grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
              >
                <div className="overflow-hidden">
                  <div className="border-t-2 border-void px-5 py-5 text-lg leading-relaxed text-void/85 md:px-7 md:pl-[4.25rem]">
                    <p>{f.a}</p>
                    {f.list ? (
                      <ul className="mt-3 space-y-1.5">
                        {f.list.map((l) => (
                          <li key={l} className="flex gap-3">
                            <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rotate-45 bg-green" />
                            {l}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
