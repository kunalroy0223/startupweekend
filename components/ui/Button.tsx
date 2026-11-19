"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track, type TrackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { IconArrow, IconArrowUpRight } from "./Icons";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "glass" | "ghost" | "ink" | "outline";
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
  /** Analytics: event + source label. */
  event?: TrackEvent;
  source?: string;
  icon?: boolean;
};

const variants = {
  primary:
    "bg-green text-void shadow-[0_0_0_1px_rgb(57_196_99/0.5),0_10px_40px_-8px_rgb(57_196_99/0.55)] hover:bg-green-bright hover:shadow-[0_0_0_1px_rgb(95_224_138/0.6),0_14px_50px_-8px_rgb(57_196_99/0.75)]",
  glass: "glass text-white hover:border-white/25 hover:bg-white/10",
  ghost: "text-white/80 hover:text-white",
  /** For green and white sections. */
  ink: "bg-void text-white hover:bg-ink-3 shadow-[0_12px_30px_-12px_rgb(0_0_0/0.5)]",
  outline: "border border-void/25 text-void hover:border-void hover:bg-void/5",
};
const sizes = {
  md: "h-11 px-5 text-[0.74rem] gap-2.5",
  lg: "h-14 px-7 text-[0.8rem] gap-3",
};

/** Pill button / link. Internal links use next/link; external ones open safely in a new tab. */
export function Button({ href, children, variant = "primary", size = "lg", external, className, event, source, icon = true }: Props) {
  const cls = cn(
    "group relative inline-flex shrink-0 items-center justify-center rounded-full font-mono font-semibold uppercase tracking-[0.14em] transition-[background-color,box-shadow,border-color,color,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.97]",
    variants[variant],
    sizes[size],
    className,
  );
  const onClick = event ? () => track(event, { source }) : undefined;
  const Arrow = external ? IconArrowUpRight : IconArrow;
  const inner = (
    <>
      <span>{children}</span>
      {icon ? <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} /> : null}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
        {inner}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick}>
      {inner}
    </Link>
  );
}
