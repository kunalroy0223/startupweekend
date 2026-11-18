"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { highlights, hasRealMedia, type HighlightSlot } from "@/lib/media";
import { track } from "@/lib/analytics";
import { useLenis } from "@/components/animation/SmoothScroll";
import { PlaceholderArt } from "./PlaceholderArt";

function isYouTube(url: string) {
  return /youtube\.com|youtu\.be/.test(url);
}

function Media({ slot }: { slot: HighlightSlot }) {
  if (slot.kind === "video" && slot.video) {
    return isYouTube(slot.video) ? (
      <iframe
        src={slot.video}
        title={slot.caption}
        className="aspect-video w-full"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    ) : (
      <video
        src={slot.video}
        poster={slot.src}
        controls
        playsInline
        preload="metadata"
        className="max-h-[75vh] w-full bg-black"
        onPlay={() => track("video_play", { slot: slot.id })}
      >
        <track kind="captions" />
      </video>
    );
  }
  if (slot.src) {
    return (
      <div className="relative h-[70vh] w-full">
        <Image src={slot.src} alt={slot.alt} fill sizes="90vw" className="object-contain" />
      </div>
    );
  }
  return null;
}

export function Lightbox({ index, onClose, onIndex }: { index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const lenis = useLenis();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const open = index !== null;
  const slot = open ? highlights[index] : null;

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtn.current?.focus(), 50);
    return () => {
      window.clearTimeout(t);
      lenis?.start();
      document.documentElement.style.overflow = "";
      returnFocus.current?.focus?.();
    };
  }, [open, lenis]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % highlights.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + highlights.length) % highlights.length);
      if (e.key === "Tab") {
        // keep focus inside the dialog
        const nodes = document.querySelectorAll<HTMLElement>("#lightbox button, #lightbox video, #lightbox iframe");
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onIndex]);

  return (
    <AnimatePresence>
      {slot ? (
        <motion.div
          id="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={slot.caption}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[160] flex flex-col bg-void/95 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="container-x flex items-center justify-between py-4 text-white">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/60">
              {String(index! + 1).padStart(2, "0")} / {String(highlights.length).padStart(2, "0")}
            </p>
            <button ref={closeBtn} type="button" onClick={onClose} className="bg-green px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-void">
              Close <span aria-hidden="true">✕</span>
            </button>
          </div>

          <div className="container-x flex flex-1 items-center justify-center gap-3" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => onIndex((index! - 1 + highlights.length) % highlights.length)}
              className="hidden size-12 shrink-0 place-items-center border border-white/20 text-white hover:border-green hover:text-green sm:grid"
            >
              ←
            </button>
            <motion.figure
              key={slot.id}
              initial={{ opacity: 0, y: 30, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl"
            >
              {hasRealMedia(slot) ? (
                <Media slot={slot} />
              ) : (
                <div className="relative grid aspect-[16/10] w-full place-items-center overflow-hidden [clip-path:polygon(0_2%,100%_0,99%_98%,1%_100%)]">
                  <PlaceholderArt seed={slot.seed} label={slot.alt} kind={slot.kind} />
                  <div className="relative mx-6 max-w-md bg-void p-6 text-white shadow-[6px_6px_0_#39c463]">
                    <p className="eyebrow text-green">{slot.kind === "video" ? "Video coming soon" : "Photo coming soon"}</p>
                    <p className="mt-3 text-lg">
                      {slot.kind === "video"
                        ? "This previous-edition video will be published here soon."
                        : "This photograph from the previous edition will be published here soon."}
                    </p>
                  </div>
                </div>
              )}
              <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-white">
                <span className="font-display text-xl font-bold md:text-2xl">{slot.caption}</span>
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-green">{slot.kind}</span>
              </figcaption>
            </motion.figure>
            <button
              type="button"
              aria-label="Next"
              onClick={() => onIndex((index! + 1) % highlights.length)}
              className="hidden size-12 shrink-0 place-items-center border border-white/20 text-white hover:border-green hover:text-green sm:grid"
            >
              →
            </button>
          </div>

          <div className="container-x flex justify-center gap-3 py-4 sm:hidden">
            <button type="button" onClick={() => onIndex((index! - 1 + highlights.length) % highlights.length)} className="border border-white/20 px-5 py-3 font-mono text-xs uppercase text-white">
              ← Prev
            </button>
            <button type="button" onClick={() => onIndex((index! + 1) % highlights.length)} className="border border-white/20 px-5 py-3 font-mono text-xs uppercase text-white">
              Next →
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
