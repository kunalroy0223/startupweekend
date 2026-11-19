import { home } from "@/lib/content";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { ScrubWords } from "@/components/animation/ScrubWords";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Squiggle } from "@/components/illustrations/Glyphs";
import { Stamp } from "@/components/illustrations/Stamp";
import { Journey } from "./Journey";

export function About() {
  const a = home.about;
  return (
    <section aria-labelledby="about-title" className="relative z-10 -mt-[6vh] bg-void text-white [clip-path:polygon(0_4vh,38%_0,100%_3vh,100%_100%,0_100%)]">
      <div className="container-x relative pb-16 pt-[16vh] md:pb-24">
        <Eyebrow className="text-white/70">{a.eyebrow}</Eyebrow>

        <h2 id="about-title" className="relative mt-6 max-w-[15ch] font-display text-[clamp(2.6rem,7.4vw,8.5rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
          <SplitReveal text="At some point, every idea needs a" />{" "}
          <span className="relative inline-block whitespace-nowrap">
            <SplitReveal text="first believer." delay={300} wordClassName="text-green [text-shadow:3px_3px_0_#000]" />
            <Squiggle className="absolute -bottom-[0.12em] left-0 h-[0.18em] w-full text-white" />
          </span>
        </h2>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-7">
            {a.intro.map((t, i) => (
              <ScrubWords
                key={i}
                text={t}
                className={i === 0 ? "font-display text-[clamp(1.4rem,2.6vw,2.4rem)] font-semibold leading-[1.15] tracking-tight" : "mt-6 font-display text-[clamp(1.6rem,3.2vw,3rem)] font-extrabold leading-tight tracking-tight"}
              />
            ))}
          </div>

          <div className="relative md:col-span-5 md:pt-40 lg:col-span-4 lg:col-start-9">
            <div className="mb-6 ml-auto size-28 md:absolute md:-top-4 md:right-4 md:mb-0 md:size-40">
              <Stamp className="block size-full" />
            </div>
            {a.body.map((t, i) => (
              <p key={i} className="mt-5 max-w-md text-lg leading-relaxed text-void/75 first:mt-0">
                {t}
              </p>
            ))}
          </div>
        </div>

        <p className="mt-16 flex flex-wrap items-baseline gap-x-4 md:mt-24 md:pl-[18%]">
          <span className="font-display text-[clamp(1.4rem,2.4vw,2.2rem)] font-bold tracking-tight">You don&apos;t need a perfect plan.</span>
          <span className="font-script text-[clamp(3rem,6vw,6rem)] leading-none text-green">You just need to start.</span>
        </p>
      </div>

      <Journey />
    </section>
  );
}
