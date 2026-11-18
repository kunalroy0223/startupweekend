import type { Metadata } from "next";
import Link from "next/link";
import { tickets } from "@/lib/content";
import { event } from "@/lib/site";
import { buildMetadata, pageMeta, breadcrumbLd, graph } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Marquee } from "@/components/animation/Marquee";
import { TicketObject } from "@/components/tickets/TicketObject";
import { Spark } from "@/components/illustrations/Glyphs";
import { Stamp } from "@/components/illustrations/Stamp";

export const metadata: Metadata = buildMetadata(pageMeta.tickets);

export default function TicketsPage() {
  const t = tickets;
  return (
    <>
      <JsonLd data={graph(breadcrumbLd("/tickets"))} />

      <section aria-labelledby="tickets-title" className="relative overflow-hidden bg-void pb-12 pt-36 text-white md:pt-44">
        <div aria-hidden="true" className="absolute inset-0 dot-field-dark opacity-60" />
        <div aria-hidden="true" className="absolute right-[-20%] top-[10%] h-[70vh] w-[70vw] [background:radial-gradient(closest-side,rgba(57,196,99,0.2),transparent)]" />
        <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Eyebrow className="text-green">{t.hero.eyebrow}</Eyebrow>
            <h1 id="tickets-title" className="mt-6 font-display text-[clamp(2.5rem,7.6vw,8.4rem)] font-extrabold leading-[0.86] tracking-[-0.05em]">
              <SplitReveal text="54 hours. Three days." immediate />{" "}
              <span className="text-green">
                <SplitReveal text="₹1,500." immediate delay={250} />
              </span>
            </h1>
            <p className="mt-8 max-w-md text-xl text-white/80">{t.hero.sub}</p>
            <p className="eyebrow mt-6 text-white">
              <time dateTime={`${event.startDate}/${event.endDate}`}>{event.datesUpper}</time>
            </p>
          </div>
          <div className="min-w-0 lg:col-span-6">
            <h2 className="sr-only">{t.ticketTitle}</h2>
            <TicketObject />
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="relative z-10 rotate-[1.5deg] bg-green py-3 text-void">
        <Marquee speed={28}>
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i} className="mx-6 flex items-center gap-6 font-display text-2xl font-extrabold uppercase md:text-4xl">
              {t.status} <Spark className="size-5" /> {t.statusTitle} <Spark className="size-5" />
            </span>
          ))}
        </Marquee>
      </div>

      <section aria-labelledby="included-title" className="relative bg-paper py-20 text-void md:py-28">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="relative md:col-span-5">
            <h2 id="included-title" className="font-display text-[clamp(2.6rem,6vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
              {t.includedTitle}
            </h2>
            <Stamp className="mt-10 size-36 md:size-44" text="ACCESS ALL 3 DAYS · 54 HOURS · " />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ul className="divide-y-2 divide-void border-y-2 border-void">
              {t.included.map((item, i) => (
                <li key={item} className="flex items-center gap-5 py-4 text-lg font-medium md:text-xl">
                  <span aria-hidden="true" className={["bg-green", "bg-void text-green", "bg-slate"][i % 3] + " grid size-9 shrink-0 place-items-center [clip-path:polygon(8%_0,100%_10%,90%_100%,0_88%)]"}>
                    <svg viewBox="0 0 16 16" className="size-4">
                      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="status-title" className="on-green relative overflow-hidden bg-green py-20 text-void md:py-28">
        <div className="container-x grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow inline-flex items-center gap-2 bg-void px-3 py-1.5 text-green">
              <span className="size-2 animate-blink bg-green" /> {t.status}
            </p>
            <h2 id="status-title" className="mt-6 font-display text-[clamp(3rem,8vw,8.6rem)] font-extrabold leading-[0.86] tracking-[-0.05em]">
              {t.statusTitle}
            </h2>
            <p className="mt-6 max-w-lg text-xl">{t.statusBody}</p>
          </div>
          <div className="flex flex-col items-start gap-4 md:col-span-4 md:items-end">
            {/* Deliberately disabled: registration is not open yet. */}
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="cursor-not-allowed border-2 border-dashed border-void bg-transparent px-7 py-5 font-mono text-sm font-semibold uppercase tracking-[0.14em] text-void/80"
            >
              {t.cta}
            </button>
            <p className="font-script text-4xl leading-none">{t.stay}</p>
            <Link href="/contact" className="font-mono text-xs uppercase tracking-[0.16em] underline underline-offset-4 hover:no-underline">
              Questions in the meantime? Contact us →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
