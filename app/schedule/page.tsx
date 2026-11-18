import type { Metadata } from "next";
import Link from "next/link";
import { schedule } from "@/lib/content";
import { event } from "@/lib/site";
import { buildMetadata, pageMeta, breadcrumbLd, graph } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TicketButton } from "@/components/ui/TicketButton";
import { ScheduleJourney } from "@/components/schedule/ScheduleJourney";

export const metadata: Metadata = buildMetadata(pageMeta.schedule);

export default function SchedulePage() {
  const h = schedule.hero;
  return (
    <>
      <JsonLd data={graph(breadcrumbLd("/schedule"))} />
      <section aria-labelledby="schedule-title" className="relative overflow-hidden bg-void pb-16 pt-36 text-white md:pb-24 md:pt-44">
        <div aria-hidden="true" className="absolute inset-0 dot-field-dark opacity-60" />
        <div className="container-x relative">
          <Eyebrow className="text-green">{h.eyebrow}</Eyebrow>
          <h1 id="schedule-title" className="mt-6 max-w-[14ch] font-display text-[clamp(3.2rem,10vw,11rem)] font-extrabold leading-[0.85] tracking-[-0.055em]">
            <SplitReveal text={h.title} immediate />
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
            <p className="text-xl text-white/80 md:col-span-5 md:text-2xl">{h.sub}</p>
            <p className="font-display text-3xl font-extrabold text-green md:col-span-4 md:col-start-9 md:text-right md:text-4xl">
              <time dateTime={`${event.startDate}/${event.endDate}`}>{event.datesUpper}</time>
            </p>
          </div>

          {/* 54-hour bar: three unequal-looking but labelled segments */}
          <nav aria-label="Jump to a day" className="mt-14 flex h-16 w-full items-stretch gap-1 font-mono text-xs uppercase tracking-widest md:h-20">
            {schedule.days.map((d, i) => (
              <a
                key={d.id}
                href={`#${d.id}`}
                className={["flex-1 bg-green text-void", "flex-1 bg-paper text-void", "flex-1 bg-slate text-void"][i] + " flex items-end justify-between p-3 transition-[flex] duration-500 hover:flex-[1.6]"}
                style={{ clipPath: ["polygon(0 0,100% 10%,98% 100%,0 100%)", "polygon(2% 10%,100% 0,100% 100%,0 92%)", "polygon(0 0,100% 6%,100% 100%,2% 100%)"][i] }}
              >
                <span>DAY {d.num}</span>
                <span className="hidden sm:inline">{d.weekday}</span>
              </a>
            ))}
          </nav>
          <div aria-hidden="true" className="mt-2 flex justify-between font-mono text-[0.65rem] uppercase tracking-widest text-white/65">
            <span>Hour 00</span>
            <span>Hour 54</span>
          </div>
        </div>
      </section>

      <ScheduleJourney />

      <section aria-label="Schedule note" className="bg-void py-20 text-white md:py-28">
        <div className="container-x grid gap-10 md:grid-cols-12 md:items-center">
          <p className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-bold leading-tight md:col-span-7">{schedule.note}</p>
          <div className="flex flex-col items-start gap-4 md:col-span-4 md:col-start-9 md:items-end">
            <TicketButton label={schedule.cta} source="schedule" />
            <Link href="/faqs" className="font-mono text-xs uppercase tracking-[0.16em] text-white/60 underline-offset-4 hover:text-green hover:underline">
              Questions? Read the FAQs →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
