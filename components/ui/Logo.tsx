import Image from "next/image";
import { event } from "@/lib/site";

/** Official TSWS logo (brand kit), unmodified apart from trimming empty canvas. */
export function Logo({ tone = "dark", className, priority }: { tone?: "dark" | "light"; className?: string; priority?: boolean }) {
  // tone = background the logo sits on.
  const src = tone === "dark" ? "/brand/tsws-logo-on-dark.png" : "/brand/tsws-logo-on-light.png";
  const [w, h] = tone === "dark" ? [433, 195] : [438, 194];
  return <Image src={src} alt={event.name} width={w} height={h} priority={priority} className={className} sizes="200px" />;
}
