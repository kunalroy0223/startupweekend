import { home } from "@/lib/content";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { roleGlyphs } from "@/components/illustrations/Glyphs";
import { cn } from "@/lib/cn";

const indent = ["md:pl-0", "md:pl-[14%]", "md:pl-[5%]", "md:pl-[22%]", "md:pl-[9%]"];

export function WhoParticipate() {
  const w = home.who;
  return (
    <section aria-labelledby="who-title" className="relative overflow-hidden bg-paper py-20 text-void md:py-32">
      <div aria-hidden="true" className="absolute inset-0 dot-field opacity-60" />
      <div className="container-x relative">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <Eyebrow className="text-void/70">{w.eyebrow}</Eyebrow>
            <h2 id="who-title" className="mt-5 font-display text-[clamp(2.6rem,7vw,8rem)] font-extrabold leading-[0.88] tracking-[-0.045em]">
              <SplitReveal text="You don't need a" />{" "}
              <span className="relative inline-block">
                <span className="text-[#a9a8a2] line-through decoration-green decoration-[0.14em]">founder title</span>
              </span>{" "}
              <SplitReveal text="to build something." delay={200} />
            </h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-void/80 md:col-span-4">{w.body}</p>
        </div>

        <ul className="mt-16 border-t-2 border-void md:mt-24">
          {w.roles.map((r, i) => {
            const Glyph = roleGlyphs[i];
            return (
              <li key={r.title} className="group relative border-b-2 border-void">
                <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-green transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 motion-reduce:transition-none" />
                <div className={cn("relative flex flex-col gap-3 py-6 md:flex-row md:items-center md:gap-8 md:py-8", indent[i])}>
                  <span className="font-mono text-xs tracking-widest text-void/60">0{i + 1}</span>
                  <Glyph className="size-14 shrink-0 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 md:size-20" />
                  <h3 className="font-display text-[clamp(1.8rem,4.6vw,4.6rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">{r.title}</h3>
                  <p className="text-base font-medium md:ml-auto md:max-w-[16rem] md:text-right md:text-lg">{r.line}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 inline-block -rotate-1 bg-void px-5 py-3 font-mono text-sm uppercase tracking-[0.12em] text-green shadow-[5px_5px_0_#39c463] md:ml-[30%]">
          {w.note}
        </p>
      </div>
    </section>
  );
}
