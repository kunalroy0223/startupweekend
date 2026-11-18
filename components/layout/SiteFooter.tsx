import Link from "next/link";
import { event, nav, organiser, socials, venue } from "@/lib/site";
import { footer } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { Spark } from "@/components/illustrations/Glyphs";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-void text-white">
      <div className="container-x relative z-10 grid gap-12 pb-10 pt-20 md:grid-cols-12 md:pt-28">
        <div className="md:col-span-5">
          <Logo tone="dark" className="h-16 w-auto md:h-20" />
          <p className="mt-6 font-display text-2xl font-bold uppercase leading-tight tracking-tight md:text-3xl">
            {event.name}
          </p>
          <p className="mt-4 text-white/70">
            {event.dates}
            <br />
            {venue.name}, {venue.locality}
          </p>
          <p className="eyebrow mt-4 text-green">54 HOURS · 3 DAYS · AI EDITION</p>
          <p className="mt-4 text-sm text-white/60">Organised by {organiser.full}.</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <h2 className="eyebrow text-white/65">EXPLORE</h2>
          <ul className="mt-4 space-y-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="group inline-flex items-baseline gap-2 font-display text-2xl font-bold hover:text-green">
                  <span className="font-mono text-[0.65rem] text-green">{n.index}</span>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 md:col-span-3">
          <h2 className="eyebrow text-white/65">CONNECT</h2>
          <ul className="mt-4 space-y-1 font-display text-2xl font-bold">
            {socials.map((s) => (
              <li key={s.label}>
                {s.href ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-green">
                    {s.label} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="text-white/80">{s.label}</span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/60">
            <a href={`mailto:${organiser.email}`} className="break-all underline underline-offset-4 hover:text-green">
              {organiser.email}
            </a>
          </p>
        </div>
      </div>

      <div className="container-x relative z-10 flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
        <p className="flex items-center gap-2 font-script text-3xl text-green">
          {footer.tagline}
        </p>
        <p>{footer.copyright}</p>
      </div>

      {/* Oversized cropped wordmark: the page "lands" on the number that defines the event. */}
      <div aria-hidden="true" className="pointer-events-none relative -mb-[0.24em] select-none overflow-hidden">
        <div className="flex items-end justify-center gap-[2vw] font-display text-[clamp(10rem,38vw,44rem)] font-extrabold leading-[0.78] tracking-[-0.07em] text-ink-2">
          <span data-t="54" className="before:content-[attr(data-t)]" />
          <Spark className="mb-[0.3em] size-[0.22em] text-green" />
          <span data-t="HRS" className="text-[#1d211d] before:content-[attr(data-t)]" />
        </div>
      </div>
    </footer>
  );
}
