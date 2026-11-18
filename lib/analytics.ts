/**
 * Thin analytics wrapper for the interactions listed in brief §6.
 * Sends to GA4 (gtag) when NEXT_PUBLIC_GA_ID is configured and also pushes to
 * window.dataLayer so a Tag Manager container can pick events up. No-ops
 * safely when neither is present.
 */

export type TrackEvent =
  | "ticket_cta_click"
  | "gallery_open"
  | "video_play"
  | "faq_toggle"
  | "contact_email_click"
  | "contact_phone_click"
  | "directions_click"
  | "contact_form_submit";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: TrackEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer?.push({ event, ...params });
    window.gtag?.("event", event, params);
  } catch {
    /* analytics must never break the UI */
  }
}
