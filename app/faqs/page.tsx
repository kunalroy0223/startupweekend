import type { Metadata } from "next";
import Link from "next/link";
import { faqs, quickAnswers } from "@/lib/content";
import { buildMetadata, pageMeta, breadcrumbLd, faqLd, graph } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { GlyphLearn, Spark } from "@/components/illustrations/Glyphs";

export const metadata: Metadata = buildMetadata(pageMeta.faqs);

export default function FaqsPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbLd("/faqs"), faqLd)} />

      <section aria-labelledby="faqs-title" className="relative overflow-hidden bg-slate pb-20 pt-36 text-void md:pb-28 md:pt-44">
        <div aria-hidden="true" className="absolute inset-0 dot-field opacity-50" />
        <GlyphLearn className="pointer-events-none absolute -right-6 top-28 size-48 rotate-12 opacity-90 md:right-[8%] md:size-72" />
        <div className="container-x relative">
          <Eyebrow className="text-void">{faqs.eyebrow}</Eyebrow>
          <h1 id="faqs-title" className="mt-6 max-w-[16ch] font-display text-[clamp(3rem,8.4vw,9.5rem)] font-extrabold leading-[0.86] tracking-[-0.05em]">
            <SplitReveal text={faqs.title} immediate />
          </h1>
        </div>
      </section>

      <section aria-label="Frequently asked questions" className="relative bg-paper py-16 text-void md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <nav aria-label="Questions" className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28">
              <p className="eyebrow text-void/60">JUMP TO</p>
              <ol className="mt-4 space-y-2 border-l-2 border-void pl-4">
                {faqs.items.map((f, i) => (
                  <li key={f.id}>
                    <a href={`#${f.id}`} className="group flex gap-3 text-sm leading-snug text-void/75 hover:text-void">
                      <span className="font-mono text-[0.65rem] text-void/70">{String(i + 1).padStart(2, "0")}</span>
                      <span className="underline-offset-4 group-hover:underline">{f.q}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <div className="lg:col-span-8">
            <FaqAccordion items={faqs.items} />
          </div>
        </div>
      </section>

      {/* AEO: direct answers, consistent with every other page */}
      <section aria-labelledby="short-title" className="relative overflow-hidden bg-void py-20 text-white md:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="short-title" className="font-display text-[clamp(2.4rem,5vw,5rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
              The short version.
            </h2>
            <Spark className="size-10 text-green" />
          </div>
          <dl className="mt-12 grid gap-px bg-white/15 md:grid-cols-2">
            {quickAnswers.map((qa, i) => (
              <div key={qa.q} className={i % 3 === 0 ? "bg-ink-2 p-6 md:p-8" : "bg-void p-6 md:p-8"}>
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-white/60">{qa.q}</dt>
                <dd className="mt-2 font-display text-2xl font-bold leading-tight text-green md:text-3xl">{qa.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="still-title" className="on-green bg-green py-16 text-void md:py-20">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 id="still-title" className="font-display text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold leading-none tracking-tight">
              {faqs.still}
            </h2>
            <p className="mt-2 text-lg">{faqs.stillBody}</p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-void px-8 py-5 font-mono text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[5px_6px_0_#fff] transition-transform hover:-rotate-2"
          >
            Contact the team <span aria-hidden="true" className="text-green transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
