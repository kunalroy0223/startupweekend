"use client";

import Link from "next/link";
import { Magnetic } from "@/components/animation/Magnetic";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Props = {
  label?: string;
  href?: string;
  variant?: "green" | "ink" | "paper";
  size?: "md" | "lg" | "xl";
  className?: string;
  source: string;
};

const tones = {
  green: "bg-green text-void [--edge:#000]",
  ink: "bg-void text-white [--edge:#39c463]",
  paper: "bg-paper text-void [--edge:#000]",
};
const sizes = {
  md: "h-12 px-6 text-[0.8rem]",
  lg: "h-16 px-9 text-sm",
  xl: "h-20 md:h-24 px-10 md:px-14 text-base md:text-lg",
};

/**
 * Primary CTA. A slightly lopsided "sticker" silhouette with a hard offset
 * edge — the shape is drawn with clip-path so the focus ring stays visible.
 */
export function TicketButton({ label = "GET YOUR TICKET", href = "/tickets", variant = "green", size = "lg", className, source }: Props) {
  return (
    <Magnetic className={className}>
      <Link
        href={href}
        onClick={() => track("ticket_cta_click", { source })}
        className={cn(
          "group relative inline-flex items-center gap-3 font-mono font-semibold tracking-[0.14em] uppercase isolate",
          "transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-rotate-2 active:scale-95",
          sizes[size],
        )}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 translate-x-[5px] translate-y-[6px] bg-[var(--edge)] [clip-path:polygon(3%_8%,97%_0,100%_86%,4%_100%)] transition-transform duration-300 group-hover:translate-x-[8px] group-hover:translate-y-[9px]"
        />
        <span aria-hidden="true" className={cn("absolute inset-0 -z-10 [clip-path:polygon(3%_8%,97%_0,100%_86%,4%_100%)]", tones[variant])} />
        <span className={cn("relative", variant === "ink" ? "text-white" : "text-void")}>{label}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("relative size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-12", variant === "ink" ? "text-green" : "text-void")}>
          <path d="M4 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
        </svg>
      </Link>
    </Magnetic>
  );
}
