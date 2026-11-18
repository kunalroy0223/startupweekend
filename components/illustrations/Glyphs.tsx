/**
 * TSWS 2027 illustrated glyph set.
 * One consistent language: heavy ink outline, brand-green fills, slightly
 * wobbly hand-drawn geometry and a hard offset shadow (via CSS drop-shadow).
 * All decorative → aria-hidden. Colours come from CSS vars so a glyph can sit
 * on paper, green or black:  --g-ink (outline), --g-fill, --g-alt, --g-shadow.
 */
import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

type P = SVGProps<SVGSVGElement> & { className?: string };

const base = (className?: string) =>
  cn(
    "[--g-ink:#000] [--g-fill:#39c463] [--g-alt:#f0efe9] [--g-shadow:#000] [filter:drop-shadow(4px_5px_0_var(--g-shadow))] overflow-visible",
    className,
  );

const S = { stroke: "var(--g-ink)", strokeWidth: 3.2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

function Svg({ className, children, ...rest }: P) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" focusable="false" className={base(className)} {...rest}>
      {children}
    </svg>
  );
}

/* ───────── Journey ───────── */

export function GlyphPitch(p: P) {
  return (
    <Svg {...p}>
      <path {...S} fill="var(--g-fill)" d="M18 50c0-6 4-9 9-9h14l40-22c5-3 9 0 9 5v70c0 5-4 8-9 5L41 77H27c-5 0-9-3-9-9z" />
      <path {...S} fill="var(--g-alt)" d="M41 77l7 24c1 4-1 6-5 6h-6c-3 0-5-2-6-5l-6-25" />
      <path {...S} d="M100 44c6 4 6 26 0 30M108 36c10 8 10 38 0 46" />
      <path {...S} d="M41 42v34" />
    </Svg>
  );
}

export function GlyphConnect(p: P) {
  return (
    <Svg {...p}>
      <path {...S} fill="var(--g-fill)" d="M14 58c-2-22 14-38 32-36 16 2 26 16 24 32-2 18-16 30-32 28-14-2-23-10-24-24z" />
      <path {...S} fill="var(--g-alt)" d="M52 64c0-20 14-34 32-32 16 2 24 16 22 32-2 18-18 30-34 28-12-2-20-12-20-28z" />
      <path {...S} d="M52 64c4-2 12-2 18-8" />
      <circle cx="40" cy="50" r="3.5" fill="var(--g-ink)" />
      <circle cx="82" cy="60" r="3.5" fill="var(--g-ink)" />
    </Svg>
  );
}

export function GlyphBuild(p: P) {
  return (
    <Svg {...p}>
      <path {...S} fill="var(--g-alt)" d="M16 74l30-14 32 14-30 15z" />
      <path {...S} fill="var(--g-fill)" d="M16 74v20l32 15V89zM48 89v20l30-15V74z" />
      <path {...S} fill="var(--g-fill)" d="M34 46l26-12 26 12-26 13z" />
      <path {...S} fill="var(--g-alt)" d="M34 46v16l26 12V59zM60 59v15l26-12V46z" />
      <path {...S} d="M86 22l10-10M92 30l14-4M78 18l2-12" />
    </Svg>
  );
}

export function GlyphLearn(p: P) {
  return (
    <Svg {...p}>
      <path {...S} fill="var(--g-alt)" d="M10 62c14-26 34-38 52-38s36 12 50 38c-14 24-32 36-50 36S24 86 10 62z" />
      <path {...S} fill="var(--g-fill)" d="M40 61c0-13 10-23 22-23s22 10 22 23-10 22-22 22-22-9-22-22z" />
      <circle cx="62" cy="61" r="8" fill="var(--g-ink)" />
      <circle cx="66" cy="56" r="2.6" fill="var(--g-alt)" />
      <path {...S} d="M60 6v10M30 14l6 8M92 14l-6 8" />
    </Svg>
  );
}

export function GlyphPresent(p: P) {
  return (
    <Svg {...p}>
      <path {...S} fill="var(--g-alt)" d="M44 14l32 0 18 74H26z" opacity=".9" />
      <path {...S} fill="var(--g-fill)" d="M12 96c0-6 22-10 48-10s48 4 48 10-22 12-48 12-48-6-48-12z" />
      <path {...S} fill="var(--g-ink)" d="M60 52c-6 0-9 5-9 10l2 22h14l2-22c0-5-3-10-9-10z" />
      <circle cx="60" cy="43" r="7" fill="var(--g-ink)" />
    </Svg>
  );
}

/* ───────── AI areas ───────── */

export function GlyphProducts(p: P) {
  return (
    <Svg {...p}>
      <path {...S} fill="var(--g-alt)" d="M22 20c26-4 50-4 74 2 4 1 6 4 6 8l-2 54c0 4-3 7-7 7-24 3-48 3-70 0-4 0-6-3-6-7l-1-56c0-4 2-7 6-8z" />
      <path {...S} d="M20 34h80" />
      <circle cx="30" cy="27" r="2.2" fill="var(--g-ink)" />
      <circle cx="38" cy="27" r="2.2" fill="var(--g-ink)" />
      <path {...S} fill="var(--g-fill)" d="M34 50c8-3 18-3 26 0v24c-8 3-18 3-26 0z" />
      <path {...S} d="M70 52h18M70 62h12M70 72h16" />
      <path {...S} fill="var(--g-fill)" d="M78 82l24 10-10 4-4 10z" />
    </Svg>
  );
}

export function GlyphGenerative(p: P) {
  return (
    <Svg {...p}>
      <path {...S} fill="var(--g-fill)" d="M60 108c-8-16-8-34 0-50 8 16 8 34 0 50z" />
      <path {...S} fill="var(--g-alt)" d="M60 58C46 52 34 40 32 22c18 2 30 14 28 36z" />
      <path {...S} fill="var(--g-fill)" d="M60 58c14-6 26-18 28-36-18 2-30 14-28 36z" />
      <path {...S} d="M18 74l8-4M98 70l8 4M24 96l6-6M96 90l6 6" />
      <circle cx="16" cy="48" r="4" fill="var(--g-ink)" />
      <path {...S} fill="var(--g-alt)" d="M98 38l4-8 4 8 8 4-8 4-4 8-4-8-8-4z" />
    </Svg>
  );
}

export function GlyphAutomation(p: P) {
  return (
    <Svg {...p}>
      <path {...S} fill="var(--g-fill)" d="M18 60c0-16 12-26 24-26 18 0 22 52 40 52 12 0 22-10 22-26s-10-26-22-26c-18 0-22 52-40 52-12 0-24-10-24-26z" />
      <path {...S} fill="var(--g-alt)" d="M30 60c0-7 5-12 12-12 6 0 10 6 14 12-4 6-8 12-14 12-7 0-12-5-12-12zM90 60c0 7-5 12-12 12-6 0-10-6-14-12 4-6 8-12 14-12 7 0 12 5 12 12z" />
      <path {...S} d="M54 20l8 6-8 6M66 100l-8-6 8-6" />
    </Svg>
  );
}

export function GlyphRealWorld(p: P) {
  return (
    <Svg {...p}>
      <path {...S} fill="var(--g-alt)" d="M60 12c26 0 46 20 46 48 0 26-20 48-46 48S14 86 14 60c0-28 20-48 46-48z" />
      <path {...S} fill="var(--g-fill)" d="M30 34c10-4 16 2 20 8 4 6 0 12-6 14s-6 10-2 16c-10 2-18-6-20-16-1-8 2-18 8-22zM70 26c10 2 22 10 26 22-6 4-14 2-18-4-4-6-10-8-8-18zM62 80c8-4 18-2 26 4-6 10-16 16-26 18-4-8-6-16 0-22z" />
      <path {...S} d="M60 12c-14 14-14 82 0 96M14 60h92" opacity=".35" />
    </Svg>
  );
}

/* ───────── Roles ───────── */

export function GlyphCode(p: P) {
  return (
    <Svg {...p}>
      <path {...S} fill="var(--g-fill)" d="M16 30c28-8 60-8 88 0 4 22 4 40 0 60-28 8-60 8-88 0-4-20-4-38 0-60z" />
      <path {...S} strokeWidth={5} d="M44 46L30 60l14 14M76 46l14 14-14 14M66 40L54 80" />
    </Svg>
  );
}

export function GlyphDesign(p: P) {
  return (
    <Svg {...p}>
      <path {...S} d="M14 92c20-50 72-50 92-6" strokeDasharray="2 7" />
      <path {...S} fill="var(--g-fill)" d="M60 14l18 34-18 50-18-50z" />
      <path {...S} d="M60 48v20" />
      <circle cx="60" cy="72" r="4" fill="var(--g-ink)" />
      <rect {...S} x="8" y="84" width="14" height="14" rx="2" fill="var(--g-alt)" />
      <rect {...S} x="98" y="78" width="14" height="14" rx="2" fill="var(--g-alt)" />
    </Svg>
  );
}

export function GlyphBusiness(p: P) {
  return (
    <Svg {...p}>
      <path {...S} fill="var(--g-alt)" d="M14 102V18M14 102h92" />
      <path {...S} fill="var(--g-fill)" d="M24 94V74h14v20zM46 94V60h14v34zM68 94V48h14v46z" />
      <path {...S} strokeWidth={4.5} d="M22 62c14-4 24-14 32-26 8 6 16 4 26-8l14-12" />
      <path {...S} d="M84 14h12v12" />
    </Svg>
  );
}

export function GlyphFlag(p: P) {
  return (
    <Svg {...p}>
      <path {...S} d="M30 110V12" />
      <path {...S} fill="var(--g-fill)" d="M30 16c18-8 30 8 48 2 8-3 14-4 22-2-4 14-4 26 0 40-8-2-14-1-22 2-18 6-30-10-48-2z" />
      <path {...S} fill="var(--g-alt)" d="M14 110c6-10 26-12 32 0z" />
    </Svg>
  );
}

export function GlyphStudent(p: P) {
  return (
    <Svg {...p}>
      <path {...S} fill="var(--g-alt)" d="M30 26c20-4 40-4 60 0 4 22 4 54 0 78-20 4-40 4-60 0-4-24-4-56 0-78z" />
      <path {...S} d="M60 26V8M48 8h24" />
      <circle {...S} cx="60" cy="56" r="13" fill="var(--g-fill)" />
      <path {...S} d="M40 88c4-10 12-14 20-14s16 4 20 14" />
    </Svg>
  );
}

/* ───────── Misc ───────── */

/** Hand-drawn squiggle underline for emphasis. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 24" fill="none" aria-hidden="true" preserveAspectRatio="none" className={className}>
      <path d="M2 14c22-10 40-10 58 0s36 10 56 0 38-10 58 0 36 10 56 0 40-10 66 2" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** Four-point sparkle used as a recurring brand punctuation mark. */
export function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <path d="M20 0c1.5 11 7.5 17.5 20 20-12.5 2.5-18.5 9-20 20-1.5-11-7.5-17.5-20-20C12.5 17.5 18.5 11 20 0z" fill="currentColor" />
    </svg>
  );
}

export const journeyGlyphs = [GlyphPitch, GlyphConnect, GlyphBuild, GlyphLearn, GlyphPresent];
export const aiGlyphs = [GlyphProducts, GlyphGenerative, GlyphAutomation, GlyphRealWorld];
export const roleGlyphs = [GlyphCode, GlyphDesign, GlyphBusiness, GlyphFlag, GlyphStudent];
