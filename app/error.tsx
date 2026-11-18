"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="grid min-h-[100svh] place-items-center bg-void px-4 pt-24 text-center text-white">
      <div>
        <p className="eyebrow text-green">Something broke</p>
        <h1 className="mt-4 font-display text-[clamp(2.6rem,8vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">Even good builds crash.</h1>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <button type="button" onClick={reset} className="bg-green px-6 py-4 font-mono text-sm font-semibold uppercase tracking-[0.14em] text-void">
            Try again
          </button>
          <Link href="/" className="font-mono text-sm uppercase tracking-[0.16em] underline underline-offset-4">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
