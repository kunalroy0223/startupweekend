import Link from "next/link";
import { TicketButton } from "@/components/ui/TicketButton";

export default function NotFound() {
  return (
    <section className="grid min-h-[100svh] place-items-center bg-void px-4 pt-24 text-center text-white">
      <div>
        <p className="eyebrow text-green">404 · Not found</p>
        <h1 className="mt-4 font-display text-[clamp(3rem,10vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
          This idea didn&apos;t <span className="font-script font-normal text-green">ship.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-white/70">The page you&apos;re looking for doesn&apos;t exist. Head back and keep building.</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link href="/" className="font-mono text-sm uppercase tracking-[0.16em] underline underline-offset-4 hover:text-green">
            ← Back home
          </Link>
          <TicketButton size="md" source="404" />
        </div>
      </div>
    </section>
  );
}
