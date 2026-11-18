import type { Metadata } from "next";
import { buildMetadata, pageMeta, breadcrumbLd, graph } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/home/About";
import { Highlights } from "@/components/home/Highlights";
import { AIEdition } from "@/components/home/AIEdition";
import { WhoParticipate } from "@/components/home/WhoParticipate";
import { WhyParticipate } from "@/components/home/WhyParticipate";
import { Partners } from "@/components/home/Partners";
import { ClosingCTA } from "@/components/home/ClosingCTA";

export const metadata: Metadata = buildMetadata(pageMeta.home);

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbLd("/"))} />
      <Hero />
      <About />
      <Highlights />
      <AIEdition />
      <WhoParticipate />
      <WhyParticipate />
      <Partners />
      <ClosingCTA />
    </>
  );
}
