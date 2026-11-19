
/**
 * TSWS 2027 line icon set. One consistent language: 24px grid, 1.6px rounded
 * strokes in currentColor, an optional green accent via `--i-accent`.
 * All decorative (aria-hidden) unless given a title by the caller.
 */
import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

type P = SVGProps<SVGSVGElement> & { className?: string };

function Icon({ className, children, ...rest }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("[--i-accent:#39c463] shrink-0", className)}
      {...rest}
    >
      {children}
    </svg>
  );
}

const A = { stroke: "var(--i-accent)" };

/* journey */
export const IconPitch = (p: P) => (
  <Icon {...p}>
    <path d="M4 10v4a1 1 0 0 0 1 1h2l8 4V5L7 9H5a1 1 0 0 0-1 1z" />
    <path {...A} d="M18.5 9a4 4 0 0 1 0 6M20.5 6.5a7.5 7.5 0 0 1 0 11" />
  </Icon>
);

export const IconConnect = (p: P) => (
  <Icon {...p}>
    <circle cx="6" cy="7" r="2.5" />
    <circle cx="18" cy="7" r="2.5" />
    <circle {...A} cx="12" cy="17" r="2.5" />
    <path d="M8.2 8.3 10.7 15M15.8 8.3 13.3 15M8.5 7h7" />
  </Icon>
);

export const IconBuild = (p: P) => (
  <Icon {...p}>
    <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5z" />
    <path d="M3 13l9 4.5 9-4.5" />
    <path {...A} d="M3 17.5 12 22l9-4.5" />
  </Icon>
);

export const IconLearn = (p: P) => (
  <Icon {...p}>
    <path d="M9 18h6M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />
    <path {...A} d="M12 7v4l2 1.5" />
  </Icon>
);

export const IconPresent = (p: P) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M12 16v4M8 20h8" />
    <path {...A} d="m7 12 3-3 2.5 2.5L17 7" />
  </Icon>
);

/* AI areas */
export const IconProduct = (p: P) => (
  <Icon {...p}>
    <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
    <path d="M10.5 18.5h3" />
    <path {...A} d="M9 8.5h6M9 11.5h4" />
  </Icon>
);

export const IconGenerative = (p: P) => (
  <Icon {...p}>
    <path {...A} d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
    <path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2zM5 16l.6 1.4L7 18l-1.4.6L5 20l-.6-1.4L3 18l1.4-.6L5 16z" />
  </Icon>
);

export const IconAutomation = (p: P) => (
  <Icon {...p}>
    <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.6" />
    <path d="M20 4v4.6h-4.6" />
    <path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.4" />
    <path d="M4 20v-4.6h4.6" />
    <circle {...A} cx="12" cy="12" r="2.2" />
  </Icon>
);

export const IconGlobe = (p: P) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    <path {...A} d="M17.5 5.5 19 4" />
  </Icon>
);

/* roles */
export const IconCode = (p: P) => (
  <Icon {...p}>
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4" />
    <path {...A} d="m13.5 5-3 14" />
  </Icon>
);

export const IconDesign = (p: P) => (
  <Icon {...p}>
    <path d="M12 3a9 9 0 1 0 0 18c1 0 1.6-.8 1.6-1.6 0-.5-.2-.8-.4-1.1-.3-.4-.5-.7-.5-1.2 0-.9.7-1.6 1.6-1.6H16a5 5 0 0 0 5-5C21 6.4 17 3 12 3z" />
    <circle {...A} cx="7.5" cy="11" r="1" />
    <circle {...A} cx="10.5" cy="7" r="1" />
    <circle {...A} cx="15" cy="7.5" r="1" />
  </Icon>
);

export const IconChart = (p: P) => (
  <Icon {...p}>
    <path d="M4 20V4M4 20h16" />
    <path d="M8 16v-4M12 16V9M16 16v-6" />
    <path {...A} d="m7 9 4-3 3 2 5-4" />
  </Icon>
);

export const IconRocket = (p: P) => (
  <Icon {...p}>
    <path d="M14 4c3-1 5.5-1 6-.5s.5 3-.5 6L13 16l-5-5 6-7z" />
    <path d="M8 11 4.5 10l2.5-3.5h4M13 16l1 3.5 3.5-2.5v-4" />
    <path {...A} d="M6 18c-1 .5-2 2-2 2s1.5-1 2-2M8.5 19.5c-1 .5-3 1-3 1s.5-2 1-3" />
  </Icon>
);

export const IconStudent = (p: P) => (
  <Icon {...p}>
    <path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9z" />
    <path d="M6.5 11v4.5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11" />
    <path {...A} d="M21.5 9v5" />
  </Icon>
);

/* ticket inclusions */
export const IconStay = (p: P) => (
  <Icon {...p}>
    <path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
    <circle {...A} cx="7" cy="11" r="1.8" />
  </Icon>
);

export const IconLounge = (p: P) => (
  <Icon {...p}>
    <path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" />
    <path d="M3 13a2 2 0 0 1 4 0v1h10v-1a2 2 0 0 1 4 0v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4z" />
    <path {...A} d="M7 20v1.5M17 20v1.5" />
  </Icon>
);

export const IconMeals = (p: P) => (
  <Icon {...p}>
    <path d="M4 9h12v4a6 6 0 0 1-6 6 6 6 0 0 1-6-6V9z" />
    <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H15.5" />
    <path {...A} d="M8 3c-.8 1 .8 2 0 3.5M12 3c-.8 1 .8 2 0 3.5" />
  </Icon>
);

export const IconCertificate = (p: P) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M7 8h10M7 11h6" />
    <circle {...A} cx="16" cy="16" r="2.6" />
    <path {...A} d="m14.6 18.2-.8 3 2.2-1 2.2 1-.8-3" />
  </Icon>
);

export const IconSparkles = (p: P) => (
  <Icon {...p}>
    <path {...A} d="M10 3.5l1.7 4.8 4.8 1.7-4.8 1.7L10 16.5l-1.7-4.8L3.5 10l4.8-1.7L10 3.5z" />
    <path d="M18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9L18 14z" />
  </Icon>
);

/* UI */
export const IconArrow = (p: P) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const IconArrowUpRight = (p: P) => (
  <Icon {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Icon>
);

export const IconCheck = (p: P) => (
  <Icon {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icon>
);

export const IconMail = (p: P) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </Icon>
);

export const IconPhone = (p: P) => (
  <Icon {...p}>
    <path d="M5 4h3.5l1.5 4.5-2 1.5a11 11 0 0 0 6 6l1.5-2 4.5 1.5V19a1.5 1.5 0 0 1-1.5 1.5A16.5 16.5 0 0 1 3.5 5.5 1.5 1.5 0 0 1 5 4z" />
  </Icon>
);

export const IconPin = (p: P) => (
  <Icon {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle {...A} cx="12" cy="9.5" r="2.5" />
  </Icon>
);

export const IconCalendar = (p: P) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
    <path {...A} d="M8 14h3" />
  </Icon>
);

export const IconUser = (p: P) => (
  <Icon {...p}>
    <circle cx="12" cy="8.5" r="4" />
    <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
  </Icon>
);

/* social */
export const IconInstagram = (p: P) => (
  <Icon {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle
      cx="17.5"
      cy="6.5"
      r="0.8"
      fill="currentColor"
      stroke="none"
    />
  </Icon>
);

export const IconLinkedIn = (p: P) => (
  <Icon {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7.5 10v7M7.5 7.5v.1M11 17v-7h3v1.5c.5-1 1.3-1.5 2.5-1.5 2 0 2.5 1.3 2.5 3.5V17" />
  </Icon>
);

export const IconYouTube = (p: P) => (
  <Icon {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="4" />
    <path
      d="m10 9 5 3-5 3V9z"
      fill="currentColor"
      stroke="none"
    />
  </Icon>
);

export const IconMenu = (p: P) => (
  <Icon {...p}>
    <path d="M4 8h16M4 16h10" />
  </Icon>
);

export const IconClose = (p: P) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

/** The brand spark, kept from the original glyph set. */
export function Spark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
    >
      <path
        d="M12 1.5c.6 4.6 2.7 7.8 9 9-6.3 1.2-8.4 4.4-9 11.5-.6-7.1-2.7-10.3-9-11.5 6.3-1.2 8.4-4.4 9-9z"
        fill="currentColor"
      />
    </svg>
  );
}

export const journeyIcons = [
  IconPitch,
  IconConnect,
  IconBuild,
  IconLearn,
  IconPresent,
];

export const aiIcons = [
  IconProduct,
  IconGenerative,
  IconAutomation,
  IconGlobe,
];

export const roleIcons = [
  IconCode,
  IconDesign,
  IconChart,
  IconRocket,
  IconStudent,
];

export const inclusionIcons = {
  stay: IconStay,
  lounge: IconLounge,
  meals: IconMeals,
  certificate: IconCertificate,
  wow: IconSparkles,
} as const;
