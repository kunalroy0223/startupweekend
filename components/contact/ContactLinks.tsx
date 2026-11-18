"use client";

import { organiser, venue } from "@/lib/site";
import { track } from "@/lib/analytics";

export function EmailLink({ className }: { className?: string }) {
  return (
    <a href={`mailto:${organiser.email}`} onClick={() => track("contact_email_click")} className={className}>
      {organiser.email}
    </a>
  );
}

export function PhoneLink({ className }: { className?: string }) {
  return (
    <a href={organiser.phoneHref} onClick={() => track("contact_phone_click")} className={className}>
      {organiser.phone}
    </a>
  );
}

export function DirectionsLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <a
      href={venue.directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("directions_click")}
      className={className}
    >
      {children}
      <span className="sr-only"> (opens Google Maps in a new tab)</span>
    </a>
  );
}
