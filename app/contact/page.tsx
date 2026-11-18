import type { Metadata } from "next";
import { contact } from "@/lib/content";
import { event, organiser, socials, venue } from "@/lib/site";
import { buildMetadata, pageMeta, breadcrumbLd, graph } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/forms/ContactForm";
import { EmailLink, PhoneLink, DirectionsLink } from "@/components/contact/ContactLinks";
import { VenueMap } from "@/components/illustrations/VenueMap";
import { GlyphConnect } from "@/components/illustrations/Glyphs";

export const metadata: Metadata = buildMetadata(pageMeta.contact);

export default function ContactPage() {
  const c = contact;
  return (
    <>
      <JsonLd data={graph(breadcrumbLd("/contact"))} />

      <section aria-labelledby="contact-title" className="relative overflow-hidden bg-paper pb-16 pt-36 text-void md:pb-24 md:pt-44">
        <div aria-hidden="true" className="absolute inset-0 dot-field opacity-60" />
        <GlyphConnect className="pointer-events-none absolute -right-8 top-32 size-44 -rotate-12 md:right-[6%] md:size-72" />
        <div className="container-x relative">
          <Eyebrow className="text-void/70">{c.hero.eyebrow}</Eyebrow>
          <h1 id="contact-title" className="mt-6 max-w-[13ch] font-display text-[clamp(3.2rem,9vw,10rem)] font-extrabold leading-[0.86] tracking-[-0.055em]">
            <SplitReveal text="Have a question?" immediate />{" "}
            <span className="font-script text-[1.1em] font-normal tracking-normal text-green-ink">
              <SplitReveal text="We're here." immediate delay={250} />
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-xl text-void/80">{c.hero.sub}</p>
        </div>
      </section>

      <section aria-label="Contact details and enquiry form" className="relative bg-paper pb-20 text-void md:pb-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="min-w-0 space-y-14 lg:col-span-5">
            <div>
              <h2 className="eyebrow text-void/60">{c.getInTouch}</h2>
              <dl className="mt-5 space-y-6">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-void/60">Email</dt>
                  <dd className="mt-1">
                    <EmailLink className="break-all font-display text-[clamp(1.35rem,2.3vw,2.3rem)] font-extrabold leading-tight tracking-tight underline decoration-green decoration-4 underline-offset-[6px] hover:decoration-void" />
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-void/60">Phone</dt>
                  <dd className="mt-1">
                    <PhoneLink className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-extrabold leading-tight tracking-tight underline decoration-green decoration-4 underline-offset-[6px] hover:decoration-void" />
                  </dd>
                </div>
              </dl>
            </div>

            <div className="[filter:drop-shadow(6px_7px_0_#000)]">
              <div className="overflow-hidden bg-void text-white [clip-path:polygon(0_0,100%_2%,98%_100%,1%_97%)]">
                <VenueMap className="block h-auto w-full" />
                <div className="p-6 md:p-8">
                  <h2 className="eyebrow text-green">{c.venueTitle}</h2>
                  <address className="mt-3 not-italic">
                    <p className="font-display text-2xl font-extrabold">{venue.name}</p>
                    <p className="mt-2 text-white/75">
                      {venue.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </p>
                  </address>
                  <DirectionsLink className="mt-6 inline-flex items-center gap-3 bg-green px-6 py-4 font-mono text-sm font-semibold uppercase tracking-[0.14em] text-void transition-transform hover:-rotate-1">
                    {c.directions} <span aria-hidden="true">↗</span>
                  </DirectionsLink>
                </div>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <h2 className="eyebrow text-void/60">{c.infoTitle}</h2>
                <p className="mt-3 font-display text-xl font-extrabold leading-tight">{event.name}</p>
                <p className="mt-2 text-void/75">
                  {event.dates}
                  <br />
                  54 Hours · 3 Days · {event.themeShort}
                </p>
                <p className="eyebrow mt-4 text-void/60">ORGANISED BY</p>
                <p className="mt-1">{organiser.full}.</p>
              </div>
              <div>
                <h2 className="eyebrow text-void/60">{c.follow}</h2>
                <ul className="mt-3 space-y-1 font-display text-2xl font-extrabold">
                  {socials.map((s) => (
                    <li key={s.label}>
                      {s.href ? (
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-green-ink">
                          {s.label} <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span>{s.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-28">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
