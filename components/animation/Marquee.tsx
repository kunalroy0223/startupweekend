import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Pure-CSS infinite marquee. Content is duplicated once and hidden from AT. */
export function Marquee({ children, speed = 30, reverse, className }: { children: ReactNode; speed?: number; reverse?: boolean; className?: string }) {
  return (
    <div className={cn("flex overflow-hidden select-none", className)}>
      <div
        className="flex shrink-0 animate-marquee motion-reduce:animate-none"
        style={{ ["--marquee-speed" as string]: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
