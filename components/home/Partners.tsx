import Image from "next/image";
import { home, partnerTiers } from "@/lib/content";
import { organiser } from "@/lib/site";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

/**
 * Partner logos are shown at their native proportions on white "plates"
 * with generous clear space — never recoloured, cropped or stretched.
 */
export function Partners() {
  const p = home.partners;
  return (
    <section aria-labelledby="partners-title" className="relative bg-white py-20 text-void md:py-32">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow className="text-void/70">{p.eyebrow}</Eyebrow>
            <h2 id="partners-title" className="mt-5 font-display text-[clamp(2.4rem,5.6vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
              <SplitReveal text={p.title} />
            </h2>
          </div>
        </div>

        <div className="mt-14 space-y-12 md:mt-20">
          {partnerTiers.map((tier, ti) => (
            <div key={tier.title} className={cn("grid gap-5 border-t border-void/15 pt-6 md:grid-cols-12", ti === 1 && "md:pl-[8%]", ti === 2 && "md:pl-[16%]")}>
              <h3 className="eyebrow text-void/60 md:col-span-3">{tier.title}</h3>
              <ul className="flex flex-wrap items-center gap-x-14 gap-y-8 md:col-span-9">
                {tier.partners.map((pt) => (
                  <li key={pt.name} className="flex h-20 items-center md:h-24">
                    {pt.src ? (
                      <Image
                        src={pt.src}
                        alt={pt.name}
                        width={pt.w}
                        height={pt.h}
                        sizes="240px"
                        className="h-auto max-h-14 w-auto max-w-[220px] object-contain md:max-h-16"
                      />
                    ) : (
                      <span className="font-display text-4xl font-bold tracking-tight md:text-5xl">{pt.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="grid gap-5 border-t-2 border-void pt-6 md:grid-cols-12">
            <h3 className="eyebrow text-void/60 md:col-span-3">ORGANISED BY</h3>
            <div className="flex flex-wrap items-center gap-8 md:col-span-9">
              <Image src="/partners/inhub-ecell.png" alt={organiser.name} width={800} height={800} sizes="120px" className="size-24 md:size-28" />
              <p className="font-display text-2xl font-bold leading-tight md:text-3xl">
                {organiser.name}
                <br />
                <span className="text-void/60">{organiser.parent}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
