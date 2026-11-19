import type { Metadata } from "next";
import { SITE_URL, event, organiser, venue, nav } from "./site";
import { faqs } from "./content";

type PageMeta = { path: string; title: string; description: string; absoluteTitle?: boolean };

/** Page metadata from brief §3 (titles + descriptions are approved copy). */
export const pageMeta = {
  home: {
    path: "/",
    title: "Techstars Startup Weekend Siliguri 2027 | AI Edition",
    description:
      "Turn your startup idea into action at Techstars Startup Weekend Siliguri 2027. Build with AI, find your team and create in 54 hours, 16–18 April at Inspiria Knowledge Campus.",
  },
  people: {
  path: "/people",
  title: "People | Techstars Startup Weekend Siliguri 2027",
  description:
    "Meet the facilitators, mentors, organising team and Inhub team behind Techstars Startup Weekend Siliguri 2027 at Inspiria Knowledge Campus, Siliguri.",
},
  schedule: {
    path: "/schedule",
    title: "Event Schedule | Techstars Startup Weekend Siliguri 2027",
    description:
      "Explore the three-day schedule of Techstars Startup Weekend Siliguri 2027, happening 16–18 April. Discover the 54-hour startup-building experience.",
  },
  faqs: {
    path: "/faqs",
    title: "FAQs | Techstars Startup Weekend Siliguri 2027",
    description:
      "Find answers about participation, eligibility, team formation, mentorship, judging and tickets for Techstars Startup Weekend Siliguri 2027.",
  },
  tickets: {
    path: "/tickets",
    title: "Tickets | Techstars Startup Weekend Siliguri 2027",
    description:
      "Discover ticket pricing and inclusions for Techstars Startup Weekend Siliguri 2027. The participant ticket is ₹1,500. Registration details are coming soon.",
  },
  contact: {
    path: "/contact",
    title: "Contact | Techstars Startup Weekend Siliguri 2027",
    description:
      "Contact the organising team of Techstars Startup Weekend Siliguri 2027. Find event contact details and venue information at Inspiria Knowledge Campus, Siliguri.",
  },
} satisfies Record<string, PageMeta>;

export function buildMetadata(p: PageMeta): Metadata {
  const url = `${SITE_URL}${p.path === "/" ? "" : p.path}` || SITE_URL;
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: {
      type: "website",
      url,
      title: p.title,
      description: p.description,
      siteName: event.name,
      locale: "en_IN",
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}

/* ───────────── Structured data (Schema.org) ───────────── */

const orgId = `${SITE_URL}/#organization`;
const eventId = `${SITE_URL}/#event`;
const placeId = `${SITE_URL}/#venue`;

export const placeLd = {
  "@type": "Place",
  "@id": placeId,
  name: venue.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: venue.streetAddress,
    addressLocality: venue.locality,
    addressRegion: venue.region,
    postalCode: venue.postalCode,
    addressCountry: venue.country,
  },
};

export const organizationLd = {
  "@type": "Organization",
  "@id": orgId,
  name: organiser.name,
  url: SITE_URL,
  email: organiser.email,
  telephone: organiser.phone,
  logo: `${SITE_URL}/brand/tsws-logo-black.png`,
  parentOrganization: { "@type": "CollegeOrUniversity", name: organiser.parent },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: organiser.email,
    telephone: organiser.phone,
    areaServed: "IN",
    availableLanguage: ["en"],
  },
};

export const websiteLd = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: event.name,
  url: SITE_URL,
  inLanguage: "en-IN",
  publisher: { "@id": orgId },
};

/**
 * Event schema. Deliberately omits `offers.availability` / purchase URL:
 * registration is "coming soon", so we publish the price only and do not
 * claim tickets are on sale (brief §4).
 */
export const eventLd = {
  "@type": "Event",
  "@id": eventId,
  name: event.name,
  description:
    "Techstars Startup Weekend Siliguri 2027 is the 7th edition of a 54-hour, three-day startup-building programme with an Artificial Intelligence theme. Students, developers, designers, professionals and aspiring entrepreneurs pitch ideas, form teams and build a prototype or business concept with guidance from mentors, then present to a panel of judges.",
  startDate: event.startDate,
  endDate: event.endDate,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: { "@id": placeId },
  organizer: { "@id": orgId },
  url: SITE_URL,
  image: [`${SITE_URL}/opengraph-image`],
  keywords: "Startup Weekend Siliguri, AI startup event in Siliguri, startup events in West Bengal",
  about: event.theme,
  offers: {
    "@type": "Offer",
    price: String(event.ticketPrice),
    priceCurrency: event.ticketCurrency,
    url: `${SITE_URL}/tickets`,
    description: "Participant ticket. Registration details are coming soon.",
  },
  sponsor: event.programmeAssociation.map((name) => ({ "@type": "Organization", name })),
};

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function breadcrumbLd(path: string) {
  const items = [nav[0]];
  const current = nav.find((n) => n.href === path);
  if (current && current.href !== "/") items.push(current);
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((n, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: n.label,
      item: `${SITE_URL}${n.href === "/" ? "/" : n.href}`,
    })),
  };
}

export const faqLd = {
  "@type": "FAQPage",
  mainEntity: faqs.items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.list ? `${f.a} ${f.list.join("; ")}.` : f.a,
    },
  })),
};
