/**
 * Official event entity information.
 * Source of truth: Website Brief §5 (GEO entity table).
 * Keep every page, metadata block and structured-data object pointing here
 * so naming, dates and venue stay consistent everywhere.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://startupweekend.sbs").replace(/\/$/, "");

export const event = {
  name: "Techstars Startup Weekend Siliguri 2027",
  shortName: "Startup Weekend Siliguri",
  edition: "7th Edition",
  editionNumber: 7,
  theme: "Artificial Intelligence",
  themeShort: "AI Edition",
  format: "54-hour startup-building programme",
  formatLine: "54 HOURS · 3 DAYS · 1 BIG BUILD",
  dates: "16–18 April 2027",
  datesUpper: "16–18 APRIL 2027",
  startDate: "2027-04-16",
  endDate: "2027-04-18",
  /** Start of Day 01 in local time (IST), used only for the "days to go" counter. */
  startsAtIso: "2027-04-16T00:00:00+05:30",
  association: "In association with Google for Startups",
  programmeAssociation: ["Techstars", "Google for Startups"],
  ticketPrice: 1500,
  ticketPriceLabel: "₹1,500",
  ticketCurrency: "INR",
  registrationStatus: "Coming Soon" as const,
  website: SITE_URL,
} as const;

export const organiser = {
  name: "Inhub E-Cell",
  parent: "Inspiria Knowledge Campus",
  full: "Inhub E-Cell, Inspiria Knowledge Campus",
  email: "contact@startupweekend.sbs",
  phone: "+91 7063080322",
  phoneHref: "tel:+917063080322",
} as const;

export const venue = {
  name: "Inspiria Knowledge Campus",
  short: "Inspiria Knowledge Campus, Siliguri, West Bengal",
  lines: ["Phase II, Himachal Vihar,", "Matigara, Siliguri,", "Darjeeling District, West Bengal – 734010, India."],
  streetAddress: "Phase II, Himachal Vihar, Matigara",
  locality: "Siliguri",
  district: "Darjeeling District",
  region: "West Bengal",
  postalCode: "734010",
  country: "IN",
  countryName: "India",
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Inspiria Knowledge Campus, Himachal Vihar, Matigara, Siliguri, West Bengal 734010"),
} as const;

export type NavItem = { href: string; label: string; index: string };

export const nav: NavItem[] = [
  { href: "/", label: "Home", index: "01" },
  { href: "/schedule", label: "Schedule", index: "02" },
  { href: "/faqs", label: "FAQs", index: "03" },
  { href: "/tickets", label: "Tickets", index: "04" },
  { href: "/contact", label: "Contact", index: "05" },
];

/**
 * Official social channels. The brief names the platforms but not the URLs.
 * Add the real profile URL to enable each link; until then it renders as text.
 */
export const socials: { label: string; href: string | null }[] = [
  { label: "Instagram", href: null },
  { label: "LinkedIn", href: null },
  { label: "YouTube", href: null },
];
