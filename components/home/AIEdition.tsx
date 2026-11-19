import { home } from "@/lib/content";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { aiGlyphs, Spark } from "@/components/illustrations/Glyphs";
import { TokenField } from "./TokenField";
import { PromptLog } from "./PromptLog";
import { cn } from "@/lib/cn";

/** Organic silhouettes for the four areas — no two alike. */
const blobs = [
  "M40,6 C70,-4 104,14 110,46 C116,80 94,112 58,114 C22,116 -2,92 2,58 C5,30 14,14 40,6 Z",
  "M22,14 C52,-6 98,2 112,30 C126,58 108,104 72,112 C36,120 4,100 2,66 C0,40 6,26 22,14 Z",
  "M58,2 C90,4 118,30 114,64 C110,96 82,118 50,112 C18,106 -2,80 4,48 C10,18 30,0 58,2 Z",
  "M30,4 C66,0 112,10 116,48 C120,86 92,116 56,116 C20,116 0,86 2,54 C4,26 10,6 30,4 Z",
];

// Keep the cards in a normal two-column grid. Stagger with positive spacing only;
// negative margins and row-spans caused the organic shapes to overlap/collapse.
const cardPlacement = [
  "lg:mt-0",
  "lg:mt-16",
  "lg:mt-6",
  "lg:mt-0",
];

const tones = [
  "text-white",
  "text-void",
  "text-void",
  "text-white",
];

export function AIEdition() {
  const ai = home.ai;

  return (
    <section
      aria-labelledby="ai-title"
      className="on-green relative overflow-hidden bg-green py-20 text-void md:py-32"
    >
      <div className="container-x relative">
        <Eyebrow className="text-void" spark={false}>
          {ai.eyebrow}
        </Eyebrow>

        <div className="relative mt-6 grid gap-10 lg:grid-cols-12">
          <h2
            id="ai-title"
            className="relative z-10 font-display text-[clamp(3rem,9vw,10.5rem)] font-extrabold leading-[0.86] tracking-[-0.05em] lg:col-span-8"
          >
            <SplitReveal text="Don't just use AI." />
            <br />
            <span className="text-white [text-shadow:5px_6px_0_#000]">
              <SplitReveal text="Build with it." delay={250} />
            </span>
          </h2>

          {/* The latent field, in an irregular window. */}
          <div className="relative h-72 lg:col-span-4 lg:h-auto lg:min-h-[340px]">
            <div className="absolute inset-0 bg-void [clip-path:polygon(8%_0,100%_6%,92%_100%,0_88%)]">
              <TokenField className="h-full w-full touch-pan-y" />
            </div>
            <p
              className="absolute -bottom-4 left-4 bg-paper px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-void"
              aria-hidden="true"
            >
              move to compute
            </p>
          </div>
        </div>

        <p className="mt-12 max-w-2xl text-xl font-medium leading-snug md:ml-[33%] md:text-2xl">
          {ai.body}
        </p>

        <h3 className="mt-20 font-mono text-sm uppercase tracking-[0.2em]">
          {ai.areasTitle}
        </h3>

        <ul className="mt-8 grid grid-cols-1 items-start gap-x-8 gap-y-10 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-8">
          {ai.areas.map((area, index) => {
            const Glyph = aiGlyphs[index];
            const darkCard = index === 0 || index === 3;

            return (
              <li
                key={area.title}
                className={cn("group relative min-w-0", cardPlacement[index])}
              >
                {/* Fixed card box: the silhouette and its content share the same dimensions. */}
                <div className="relative isolate h-[370px] w-full min-w-0 sm:h-[390px] lg:h-[410px]">
                  <svg
                    viewBox="0 0 120 120"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-[6px_7px_0_#000]"
                  >
                    <path
                      d={blobs[index]}
                      className={darkCard ? "fill-void" : "fill-paper"}
                    />
                  </svg>

                  {/* A central safe area keeps text away from the narrow curved edges. */}
                  <div
                    className={cn(
                      "relative z-10 mx-auto flex h-full w-[62%] min-w-0 flex-col justify-center gap-5",
                      "py-8 sm:w-[64%] sm:gap-5 sm:py-9 lg:w-[62%] lg:gap-6 lg:py-10",
                      tones[index]
                    )}
                  >
                    <Glyph className="size-[4.5rem] shrink-0 transition-transform duration-700 group-hover:-rotate-6 sm:size-20" />

                    <div className="w-full min-w-0">
                      <p className="font-mono text-xs tracking-widest opacity-60">
                        0{index + 1}
                      </p>
                      <h4 className="mt-1 w-full max-w-[16ch] break-words font-display text-[clamp(1.35rem,2vw,2.1rem)] font-extrabold leading-[1.04] tracking-tight [overflow-wrap:anywhere]">
                        {area.title}
                      </h4>
                      <p className="mt-3 w-full max-w-[29ch] break-words text-sm leading-relaxed opacity-80 sm:text-base [overflow-wrap:anywhere]">
                        {area.line}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-sm italic md:text-right">{ai.disclaimer}</p>

        <div className="mt-20 grid gap-8 lg:grid-cols-12">
          <h3 className="font-display text-[clamp(2.2rem,4.5vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight lg:col-span-4">
            {ai.startTitle}
          </h3>
          <div className="lg:col-span-8">
            <PromptLog items={ai.starts} />
          </div>
        </div>

        <p className="mt-16 flex max-w-3xl items-start gap-3 font-display text-2xl font-bold leading-tight md:ml-auto md:text-3xl">
          <Spark className="mt-1 size-6 shrink-0" />
          {ai.noExpertise}
        </p>
      </div>
    </section>
  );
}
