
/**
 * People behind Techstars Startup Weekend Siliguri 2027.
 *
 * Photos, biographies and LinkedIn profiles are optional and can be added
 * once confirmed. Missing photos use initials in PersonCard.
 *
 * One person = one entry. The first role determines the section in which
 * their profile appears.
 */

export type PeopleGroupId =
  | "facilitators"
  | "organising"
  | "judges"
  | "mentors"
  | "inhub-team";

export type PersonRole = {
  group: PeopleGroupId;
  title?: string;
};

export type Person = {
  id: string;
  name: string;
  designation?: string;
  organisation?: string;
  bio?: string;
  photo?: { src: string; width: number; height: number };
  linkedin?: string;
  roles: [PersonRole, ...PersonRole[]];
  featured?: boolean;
};

export type PeopleGroup = {
  id: PeopleGroupId;
  letter: "A" | "B" | "C" | "D" | "E";
  title: string;
  role: string;
  intro: string;
  empty: string;
};

export const peopleGroups: PeopleGroup[] = [
  {
    id: "facilitators",
    letter: "A",
    title: "Facilitator",
    role: "Facilitator",
    intro:
      "Facilitators lead the 54 hours. They run the programme, keep the energy and the timeline on track, and guide teams from the first pitch to the final presentation.",
    empty: "Facilitator profiles will be announced closer to the event.",
  },
  {
    id: "organising",
    letter: "B",
    title: "Organising Team",
    role: "Organiser",
    intro:
      "The local organising team plans the weekend end to end: venue, partners, participants and everything that makes 54 hours run smoothly.",
    empty: "Organising team profiles will be announced soon.",
  },
  {
    id: "judges",
    letter: "C",
    title: "Judges",
    role: "Judge",
    intro:
      "Our judges bring industry experience and an independent perspective to evaluate the teams, their ideas and the progress they make throughout the weekend.",
    empty: "Judge profiles will be announced closer to the event.",
  },
  {
    id: "mentors",
    letter: "D",
    title: "Mentors",
    role: "Mentor",
    intro:
      "Mentors bring experience from technology, business and entrepreneurship. They challenge assumptions, share feedback and help teams decide what to build next.",
    empty: "Mentor profiles will be announced closer to the event.",
  },
  {
    id: "inhub-team",
    letter: "E",
    title: "Inhub E-Cell Team",
    role: "Inhub E-Cell",
    intro:
      "The Inhub E-Cell team at Inspiria Knowledge Campus, driving entrepreneurship, innovation and the execution of Startup Weekend Siliguri.",
    empty: "Inhub E-Cell team profiles will be announced soon.",
  },
];

export const people: Person[] = [
  // Facilitator
  {
    id: "ilene-marcus",
    name: "Ilene Marcus",
    designation: "Facilitator",
    roles: [{ group: "facilitators" }],
  },

  // Organising Team
  {
    id: "atul-gupta",
    name: "Atul Gupta",
    designation: "Patron, Startup Weekend Siliguri",
    roles: [{ group: "organising" }],
  },
  {
    id: "rahul-gupta",
    name: "Rahul Gupta",
    designation: "Head Operations",
    roles: [{ group: "organising" }],
  },
  {
    id: "aditya-lama",
    name: "Aditya Lama",
    designation: "Lead Organizer",
    roles: [{ group: "organising" }],
  },
  {
    id: "sonam-wangdi-bhutia",
    name: "Sonam Wangdi Bhutia",
    designation: "Assistant Lead Organiser",
    roles: [{ group: "organising" }],
  },
  {
    id: "anjani-nandan",
    name: "Anjani Nandan",
    designation: "Venue, Catering & Logistics Lead",
    roles: [{ group: "organising" }],
  },
  {
    id: "bishal-chanda",
    name: "Bishal Chanda",
    designation: "Technical Lead",
    roles: [{ group: "organising" }],
  },

  // Judges
  {
    id: "sandip-agarwal",
    name: "Sandip Agarwal",
    designation: "Director",
    organisation: "Kaysons Group of Companies",
    roles: [{ group: "judges" }],
  },
  {
    id: "jaspal-bindra",
    name: "Jaspal Bindra",
    designation: "Founder",
    organisation: "Punjabi Kadhai",
    roles: [{ group: "judges" }],
  },

  // Mentors
  {
    id: "rajesh-agarwal",
    name: "Rajesh Agarwal",
    designation: "Founder, MD & Convenor",
    organisation: "Swavlambhi Bharat Abhiyan",
    roles: [{ group: "mentors" }],
  },
  {
    id: "dhiraj-khotari",
    name: "Dhiraj Khotari",
    designation: "Founder",
    organisation: "YOB Hotel Supplies & Hospitality Solutions",
    roles: [{ group: "mentors" }],
  },
  {
    id: "neeraj-sancheti",
    name: "Neeraj Sancheti",
    designation: "Founder & CEO",
    organisation: "Kreativ Street",
    roles: [{ group: "mentors" }],
  },
  {
    id: "tapas-adhikary",
    name: "Tapas Adhikary",
    designation: "Growth & Marketing Strategist",
    organisation: "Brand Building",
    roles: [{ group: "mentors" }],
  },
  {
    id: "rahul-kandelwal",
    name: "Rahul Kandelwal",
    designation: "CEO",
    organisation: "Voyage Hotels & Resorts, Siliguri",
    roles: [{ group: "mentors" }],
  },
  {
    id: "sumit-sinhal",
    name: "Sumit Sinhal",
    designation: "Founder",
    organisation: "Kins Health",
    roles: [{ group: "mentors" }],
  },
  {
    id: "koustov-maitra",
    name: "Koustov Maitra",
    designation: "Co-Founder & CTO",
    organisation: "CreoWis",
    roles: [{ group: "mentors" }],
  },
  {
    id: "riddhinil-roy",
    name: "Riddhinil Roy",
    designation: "Mentor",
    roles: [{ group: "mentors" }],
  },

  // Inhub E-Cell Team — preserve the order of both supplied slides
  {
    id: "kunal-roy",
    name: "Kunal Roy",
    roles: [{ group: "inhub-team" }],
  },
  {
    id: "subham-kr-gupta",
    name: "Subham Kr. Gupta",
    roles: [{ group: "inhub-team" }],
  },
  {
    id: "eshani-chowdhury",
    name: "Eshani Chowdhury",
    roles: [{ group: "inhub-team" }],
  },
  {
    id: "ayan-sunuwar",
    name: "Ayan Sunuwar",
    roles: [{ group: "inhub-team" }],
  },
  {
    id: "himanshu-gupta",
    name: "Himanshu Gupta",
    roles: [{ group: "inhub-team" }],
  },
  {
    id: "priyangshu-mondal",
    name: "Priyangshu Mondal",
    roles: [{ group: "inhub-team" }],
  },
  {
    id: "vishal-sharma",
    name: "Vishal Sharma",
    roles: [{ group: "inhub-team" }],
  },
  {
    id: "tanmoy-saha",
    name: "Tanmoy Saha",
    roles: [{ group: "inhub-team" }],
  },
  {
    id: "jeet-kundu",
    name: "Jeet Kundu",
    roles: [{ group: "inhub-team" }],
  },
  {
    id: "shamik-banerjee",
    name: "Shamik Banerjee",
    roles: [{ group: "inhub-team" }],
  },
  {
    id: "divyashree-nag",
    name: "Divyashree Nag",
    roles: [{ group: "inhub-team" }],
  },
  {
    id: "suhani-gupta",
    name: "Suhani Gupta",
    roles: [{ group: "inhub-team" }],
  },
  {
    id: "deepak-chetri",
    name: "Deepak Chetri",
    roles: [{ group: "inhub-team" }],
  },
  {
    id: "prityarth-pradhan",
    name: "Prityarth Pradhan",
    roles: [{ group: "inhub-team" }],
  },
  {
    id: "sonia-madak",
    name: "Sonia Madak",
    roles: [{ group: "inhub-team" }],
  },
  {
    id: "shyrus-pradhan",
    name: "Shyrus Pradhan",
    roles: [{ group: "inhub-team" }],
  },
];

export const groupById = (id: PeopleGroupId) =>
  peopleGroups.find((g) => g.id === id)!;

/** Profiles listed in a group: only people whose FIRST role is that group. */
export function listedIn(
  group: PeopleGroupId,
  list: Person[] = people
): Person[] {
  return list.filter((p) => p.roles[0].group === group);
}

/** People who also hold a role in a group but are listed elsewhere. */
export function alsoIn(
  group: PeopleGroupId,
  list: Person[] = people
): Person[] {
  return list.filter(
    (p) =>
      p.roles[0].group !== group &&
      p.roles.some((r) => r.group === group)
  );
}

export function featuredPeople(
  limit = 6,
  list: Person[] = people
): Person[] {
  return list.filter((p) => p.featured).slice(0, limit);
}

/** Basic integrity checks, run by the test suite. */
export function validatePeople(list: Person[] = people): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const names = new Set<string>();

  for (const p of list) {
    if (ids.has(p.id)) errors.push(`duplicate id: ${p.id}`);

    const key = p.name.trim().toLowerCase();
    if (names.has(key)) errors.push(`duplicate profile for: ${p.name}`);

    ids.add(p.id);
    names.add(key);

    const groups = p.roles.map((r) => r.group);
    if (new Set(groups).size !== groups.length) {
      errors.push(`repeated role group for: ${p.name}`);
    }

    if (
      p.linkedin &&
      !/^https:\/\/([a-z]+\.)?linkedin\.com\//.test(p.linkedin)
    ) {
      errors.push(`bad LinkedIn URL for: ${p.name}`);
    }

    if (p.bio !== undefined && !p.bio.trim()) {
      errors.push(`empty bio for: ${p.name}`);
    }
  }

  return errors;
}
