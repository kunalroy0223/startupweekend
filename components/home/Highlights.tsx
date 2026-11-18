import { home } from "@/lib/content";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Marquee } from "@/components/animation/Marquee";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Spark } from "@/components/illustrations/Glyphs";
import { HighlightsWall } from "@/components/gallery/HighlightsWall";

export function Highlights() {
  const h = home.highlights;
  return (
    <section aria-labelledby="highlights-title" className="relative overflow-hidden bg-void py-20 text-white md:py-32">
      <div aria-hidden="true" className="absolute inset-0 dot-field-dark opacity-50" />
      <div className="container-x relative">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow className="text-white/70">{h.eyebrow}</Eyebrow>
            <h2 id="highlights-title" className="mt-5 font-display text-[clamp(3rem,9vw,10rem)] font-extrabold leading-[0.86] tracking-[-0.05em]">
              <SplitReveal text="The moments" />
              <br />
              <span className="text-green">
                <SplitReveal text="that made it." delay={200} />
              </span>
            </h2>
          </div>
          <div className="md:col-span-4 md:pb-4">
            <p className="font-display text-2xl font-bold leading-tight">{h.lead}</p>
            <p className="mt-3 text-white/70">{h.body}</p>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="relative my-12 -rotate-2 bg-green py-3 text-void md:my-16">
        <Marquee speed={36}>
          {["Ideas pitched", "Teams formed", "Things built", "Memories made"].map((w) => (
            <span key={w} className="mx-6 flex items-center gap-6 font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
              {w}
              <Spark className="size-6 text-void" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-x relative">
        <HighlightsWall />
      </div>
    </section>
  );
}
