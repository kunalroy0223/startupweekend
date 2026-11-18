/** Tiny className joiner (avoids a dependency for this one job). */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
