import type { ReactNode } from "react";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Eyebrow } from "./Eyebrow";

/** Shared inner-page hero: eyebrow, large title, optional lead and extra slot. */
export function PageHero({ id, eyebrow, title, accent, lead, children }: { id: string; eyebrow: string; title: string; accent?: string; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section aria-labelledby={id} className="relative overflow-hidden bg-void pb-16 pt-36 text-white md:pb-24 md:pt-48">
      <div aria-hidden="true" className="grid-field absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="absolute right-[-15%] top-[-10%] h-[70vh] w-[70vw] [background:radial-gradient(closest-side,rgb(57_196_99/0.14),transparent)]" />
      <div className="container-x relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 id={id} className="mt-6 max-w-[16ch] font-display text-[clamp(2.8rem,8vw,8.4rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
          <SplitReveal text={title} immediate />
          {accent ? (
            <>
              {" "}
              <SplitReveal text={accent} immediate delay={220} wordClassName="text-gradient" />
            </>
          ) : null}
        </h1>
        {lead ? <div className="mt-8 max-w-xl text-lg text-white/75 md:text-xl">{lead}</div> : null}
        {children}
      </div>
    </section>
  );
}
