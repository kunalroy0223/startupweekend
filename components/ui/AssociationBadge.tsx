import Image from "next/image";
import { associationLogo } from "@/lib/site";
import { cn } from "@/lib/cn";

export function AssociationBadge({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      className={cn(
        "inline-flex w-fit max-w-full flex-wrap items-center gap-3",
        className
      )}
    >
      <span className="eyebrow text-white/75">
        In association with
      </span>

      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full",
          "border border-white/60 bg-white/90",
          "shadow-[0_6px_24px_-10px_rgb(0_0_0/0.7)]",
          "backdrop-blur-xl",
          size === "sm" ? "h-8 px-3.5" : "h-9 px-4"
        )}
      >
        <Image
          src={associationLogo.src}
          alt="Google for Startups"
          width={associationLogo.width}
          height={associationLogo.height}
          sizes="140px"
          className={cn(
            "block h-auto w-auto object-contain",
            size === "sm" ? "h-[14px]" : "h-[17px]"
          )}
        />
      </span>
    </div>
  );
}