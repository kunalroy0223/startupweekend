
import Link from "next/link";
import { nav, organiser, activeSocials } from "@/lib/site";
import { footer } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { AssociationBadge } from "@/components/ui/AssociationBadge";
import { IconArrowUpRight } from "@/components/ui/Icons";

const footerLinkClass =
  "font-display text-2xl font-bold leading-tight tracking-tight text-white/85 transition-colors hover:text-green md:text-3xl";

export function SiteFooter() {
  const socials = activeSocials();

  return (
    <footer className="relative overflow-hidden bg-void text-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="container-x relative z-10 grid gap-10 pb-8 pt-20 md:grid-cols-12 md:gap-8 md:pt-24">
        {/* Brand */}
        <div className="md:col-span-5">
          <Logo className="h-16 w-auto md:h-20" />

          <p className="mt-6 max-w-sm font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
            {footer.tagline}
          </p>

          <AssociationBadge size="sm" className="mt-6" />
        </div>

        {/* Explore */}
        <nav
          aria-label="Footer navigation"
          className="md:col-span-3 md:col-start-7"
        >
          <h2 className="eyebrow text-white/60">Explore</h2>

          <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-1 md:grid-cols-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLinkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact and social links */}
        <div className="min-w-0 md:col-span-3">
          <h2 className="eyebrow text-white/60">Contact</h2>

          <a
            href={`mailto:${organiser.email}`}
            className={`${footerLinkClass} mt-4 inline-block break-all`}
          >
            {organiser.email}
          </a>

          {socials.length > 0 && (
            <div className="mt-8">
              <h2 className="eyebrow text-white/60">Follow Inhub</h2>

              <ul className="mt-4 flex flex-col gap-1">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${footerLinkClass} group inline-flex items-center gap-2`}
                    >
                      {social.label}
                      <IconArrowUpRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="container-x relative z-10 border-t border-white/10 py-5 text-sm text-white/60">
        <p>{footer.copyright}</p>
      </div>

      {/* Background typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative -mb-[0.2em] select-none overflow-hidden text-center"
      >
        <span
          data-t="54 HOURS"
          className="font-display text-[clamp(6rem,22vw,26rem)] font-extrabold leading-[0.8] tracking-[-0.06em] text-white/[0.05] before:content-[attr(data-t)]"
        />
      </div>
    </footer>
  );
}
