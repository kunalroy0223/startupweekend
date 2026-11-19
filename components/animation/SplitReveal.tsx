"use client";

import { Fragment, useEffect, useRef, useState, type ElementType } from "react";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  /** Extra space inside each word mask; useful for script fonts with deep swashes. */
  maskClassName?: string;
  /** Stagger between words in ms. */
  stagger?: number;
  delay?: number;
  /** Start immediately (e.g. hero) instead of on view. */
  immediate?: boolean;
  id?: string;
};

/**
 * Word-by-word mask reveal. Text stays real, selectable and crawlable:
 * words are only wrapped in spans and moved with CSS transforms.
 */
export function SplitReveal({
  text,
  as: Tag = "span",
  className,
  wordClassName,
  maskClassName,
  stagger = 55,
  delay = 0,
  immediate,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (immediate) {
      const t = window.setTimeout(() => setShown(true), 30);
      return () => window.clearTimeout(t);
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  const words = text.split(" ");
  return (
    <Tag ref={ref} id={id} className={cn(className)} data-shown={shown || undefined}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span
            className={cn(
              "inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom",
              maskClassName,
            )}
          >
            <span
              data-anim
              className={cn(
                "inline-block transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] motion-reduce:transition-none will-change-transform",
                shown ? "translate-y-0" : "translate-y-[108%]",
                wordClassName,
              )}
              style={{ transitionDelay: `${delay + i * stagger}ms` }}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
