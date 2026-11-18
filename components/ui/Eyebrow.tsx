import { cn } from "@/lib/cn";
import { Spark } from "@/components/illustrations/Glyphs";

export function Eyebrow({ children, className, spark = true }: { children: React.ReactNode; className?: string; spark?: boolean }) {
  return (
    <p className={cn("eyebrow flex items-center gap-2", className)}>
      {spark ? <Spark className="size-3 shrink-0 text-green" /> : null}
      <span>{children}</span>
    </p>
  );
}
