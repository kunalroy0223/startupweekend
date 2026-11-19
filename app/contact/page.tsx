import type { Metadata } from "next";

import { contact } from "@/lib/content";
import { venue } from "@/lib/site";
import { buildMetadata, pageMeta, breadcrumbLd, graph } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/forms/ContactForm";
import { DirectionsLink } from "@/components/contact/ContactLinks";
import { VenueMap } from "@/components/illustrations/VenueMap";
import { GlyphConnect } from "@/components/illustrations/Glyphs";

export const metadata: Metadata = buildMetadata(pageMeta.contact);

export default function ContactPage() {
  const c = contact;

  return (
    <>
      <JsonLd data={graph(breadcrumbLd("/contact"))} />

      <section
        aria-labelledby="contact-title"
        className="relative overflow-hidden bg-paper pb-16 pt-36 text-void md:pb-24 md:pt-44"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 dot-field opacity-60"
        />
        <GlyphConnect className="pointer-events-none absolute -right-8 top-32 size-44 -rotate-12 md:right-[6%] md:size-72" />

        <div className="container-x relative">
          <Eyebrow className="text-void/70">{c.hero.eyebrow}</Eyebrow>

          <h1
            id="contact-title"
            className="mt-6 max-w-[13ch] font-display text-[clamp(3.2rem,9vw,10rem)] font-extrabold leading-[0.86] tracking-[-0.055em]"
          >
            <SplitReveal text="Have a question?" immediate />{" "}
            <span className="font-script text-[1.1em] font-normal tracking-normal text-green-ink">
              <SplitReveal text="We're here." immediate delay={250} />
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-xl text-void/80">{c.hero.sub}</p>
        </div>
      </section>

      <section
        aria-label="Venue and enquiry form"
        className="relative bg-paper pb-20 text-void md:pb-32"
      >
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <div className="[filter:drop-shadow(6px_7px_0_#000)]">
              <div className="overflow-hidden bg-void text-white [clip-path:polygon(0_0,100%_2%,98%_100%,1%_97%)]">
                <VenueMap className="block h-auto w-full" />

                <div className="p-6 md:p-8">
                  <h2 className="eyebrow text-green">{c.venueTitle}</h2>

                  <address className="mt-3 not-italic">
                    <p className="font-display text-2xl font-extrabold">
                      {venue.name}
                    </p>

                    <p className="mt-2 text-white/75">
                      {venue.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </address>

                  <DirectionsLink className="mt-6 inline-flex items-center gap-3 bg-green px-6 py-4 font-mono text-sm font-semibold uppercase tracking-[0.14em] text-void transition-transform hover:-rotate-1">
                    {c.directions}{" "}
                    <span aria-hidden="true">↗</span>
                  </DirectionsLink>
                </div>
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