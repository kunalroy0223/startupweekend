
import type { Metadata } from "next";
import { buildMetadata, pageMeta, breadcrumbLd, graph } from "@/lib/seo";
import { alsoIn, listedIn, groupById, people } from "@/lib/people";
import { SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { PersonCard } from "@/components/people/PersonCard";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export const metadata: Metadata = buildMetadata(pageMeta.people);

const personLd = people.map((p) => ({
  "@type": "Person",
  "@id": `${SITE_URL}/people#${p.id}`,
  name: p.name,
  ...(p.designation ? { jobTitle: p.designation } : {}),
  ...(p.organisation
    ? {
        worksFor: {
          "@type": "Organization",
          name: p.organisation,
        },
      }
    : {}),
  ...(p.linkedin ? { sameAs: [p.linkedin] } : {}),
}));

// The order here is intentional.
const sectionOrder = [
  "facilitators",
  "mentors",
  "judges",
  "organising",
  "inhub-team",
] as const;

const orderedGroups = sectionOrder.map((id) => groupById(id));

export default function PeoplePage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbLd("/people"), ...personLd)} />

      <PageHero
        id="people-page-title"
        eyebrow="THE PEOPLE BEHIND STARTUP WEEKEND SILIGURI"
        title="The people behind"
        accent="the possibilities."
        lead="Meet the people who shape the experience, guide the participants and make 54 hours of building possible."
      >
        <nav
          aria-label="People sections"
          className="mt-12 flex flex-wrap gap-2"
        >
          {orderedGroups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="glass inline-flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 text-sm text-white/85 transition-colors hover:text-white"
            >
              <span className="grid size-7 place-items-center rounded-full bg-white/10 font-mono text-xs text-green">
                {g.letter}
              </span>
              {g.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {orderedGroups.map((g, groupIndex) => {
        const listed = listedIn(g.id);
        const also = alsoIn(g.id);
        const light = groupIndex % 2 === 1;

        return (
          <section
            key={g.id}
            id={g.id}
            aria-labelledby={`${g.id}-title`}
            className={cn(
              "scroll-mt-24 py-20 md:py-28",
              light ? "surface-light" : "bg-void text-white"
            )}
          >
            <div className="container-x">
              <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                  <p
                    className={cn(
                      "font-mono text-sm",
                      light ? "text-green-deep" : "text-green"
                    )}
                  >
                    {g.letter}.
                  </p>

                  <h2
                    id={`${g.id}-title`}
                    className="mt-2 font-display text-[clamp(2.4rem,5.4vw,5.4rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
                  >
                    {g.title}
                  </h2>
                </div>

                <p
                  className={cn(
                    "text-lg leading-relaxed lg:col-span-5",
                    light ? "text-void/75" : "text-white/75"
                  )}
                >
                  {g.intro}
                </p>
              </div>

              {listed.length > 0 ? (
                <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {listed.map((p, i) => (
                    <Reveal
                      as="li"
                      key={p.id}
                      delay={(i % 4) * 75}
                      className={cn(
                        listed.length === 1 &&
                          "sm:col-span-2 lg:col-span-3 xl:col-span-4",
                        listed.length === 2 &&
                          (i === 0 ? "xl:col-start-2" : "xl:col-start-3")
                      )}
                    >
                      <div
                        id={p.id}
                        className={cn(
                          "h-full scroll-mt-24",
                          listed.length === 1 && "mx-auto max-w-[23rem]",
                          i % 4 === 1 && "xl:translate-y-10",
                          i % 4 === 2 && "xl:-translate-y-4",
                          i % 4 === 3 && "xl:translate-y-6"
                        )}
                      >
                        <PersonCard
                          person={p}
                          tone={light ? "light" : "dark"}
                          variant={i}
                        />
                      </div>
                    </Reveal>
                  ))}
                </ul>
              ) : (
                <div
                  className={cn(
                    "mt-12 flex flex-col gap-4 p-7 md:flex-row md:items-center md:justify-between md:p-9",
                    light ? "card-light" : "card"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="relative flex size-3"
                    >
                      <span className="absolute inset-0 animate-[pulse-ring_2s_ease-out_infinite] rounded-full bg-green" />
                      <span className="relative size-3 rounded-full bg-green" />
                    </span>

                    <p className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                      {g.empty}
                    </p>
                  </div>
                </div>
              )}

              {also.length > 0 ? (
                <p
                  className={cn(
                    "mt-6",
                    light ? "text-void/75" : "text-white/70"
                  )}
                >
                  Also part of the {g.title}:{" "}
                  {also.map((p, i) => (
                    <span key={p.id}>
                      {i > 0 ? ", " : ""}
                      <a
                        href={`#${p.id}`}
                        className="underline underline-offset-4 hover:text-green"
                      >
                        {p.name}
                      </a>{" "}
                      <span className="opacity-60">
                        ({groupById(p.roles[0].group).title})
                      </span>
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          </section>
        );
      })}
    </>
  );
}
