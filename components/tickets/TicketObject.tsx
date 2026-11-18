"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { event, venue } from "@/lib/site";
import { tickets } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";

/**
 * The ticket as an object: notched, perforated, tilting toward the cursor,
 * with a "COMING SOON" stamp so nobody mistakes it for a live checkout.
 */
export function TicketObject() {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });
  const sheenX = useTransform(sry, [-12, 12], ["0%", "100%"]);

  return (
    <div
      className="relative [perspective:1400px]"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 18);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        initial={{ y: 60, rotate: -6, opacity: 0 }}
        animate={{ y: 0, rotate: -3, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="relative [filter:drop-shadow(12px_14px_0_#39c463)]"
        data-anim
      >
        <div
          className="relative grid grid-cols-[1fr_auto] overflow-hidden bg-paper text-void"
          style={{
            WebkitMask:
              "radial-gradient(circle 22px at 0 50%, #0000 98%, #000) left / 51% 100% no-repeat, radial-gradient(circle 22px at 100% 50%, #0000 98%, #000) right / 51% 100% no-repeat",
            mask: "radial-gradient(circle 22px at 0 50%, #0000 98%, #000) left / 51% 100% no-repeat, radial-gradient(circle 22px at 100% 50%, #0000 98%, #000) right / 51% 100% no-repeat",
          }}
        >
          {/* main */}
          <div className="relative min-w-0 p-5 sm:p-7 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div className="bg-void px-3 py-2">
                <Logo tone="dark" className="h-10 w-auto md:h-12" />
              </div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-void/60">Admit one · {event.themeShort}</p>
            </div>
            <p className="mt-10 font-display text-[clamp(3.6rem,13vw,11rem)] font-extrabold leading-[0.8] tracking-[-0.06em]">{event.ticketPriceLabel}</p>
            <p className="eyebrow mt-3 text-void">{tickets.per}</p>
            <dl className="mt-8 grid grid-cols-2 gap-4 border-t-2 border-dashed border-void/30 pt-5 font-mono text-xs uppercase tracking-[0.12em]">
              <div>
                <dt className="text-void/70">Dates</dt>
                <dd className="mt-1 font-semibold">{event.dates}</dd>
              </div>
              <div>
                <dt className="text-void/70">Venue</dt>
                <dd className="mt-1 font-semibold">{venue.name}, {venue.locality}</dd>
              </div>
            </dl>
          </div>
          {/* stub */}
          <div className="relative flex w-20 flex-col items-center justify-between border-l-2 border-dashed border-void/40 bg-green py-8 md:w-28">
            <span className="font-mono text-[0.6rem] tracking-widest [writing-mode:vertical-rl]">EDITION 07</span>
            <span className="font-display text-3xl font-extrabold [writing-mode:vertical-rl] md:text-4xl">54 HRS</span>
          </div>
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent mix-blend-soft-light"
            style={{ left: sheenX }}
          />
        </div>

        {/* stamp */}
        <motion.div
          initial={{ scale: 2.4, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: -14 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 14 }}
          className="absolute bottom-[22%] right-24 border-[4px] border-[#b3261e] bg-paper/70 px-3 py-1.5 font-display text-xl font-extrabold uppercase tracking-tight text-[#b3261e] md:right-36 md:text-3xl"
          data-anim
          aria-hidden="true"
        >
          {tickets.status}
        </motion.div>
      </motion.div>
    </div>
  );
}
