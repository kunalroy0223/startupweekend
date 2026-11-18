/**
 * Approved website copy. Source of truth: Website Brief §2.
 * Presentation components read from here; edit copy in one place.
 */

export const home = {
  hero: {
    association: "IN ASSOCIATION WITH GOOGLE FOR STARTUPS",
    eyebrow: "7TH EDITION · TECHSTARS STARTUP WEEKEND",
    title: "Got a startup idea? Let's see you cook.",
    sub: "Take your idea beyond the group chat and build with AI.",
    closer: "Your 54 hours are getting closer.",
  },
  about: {
    eyebrow: "THE EXPERIENCE",
    title: "At some point, every idea needs a first believer.",
    intro: [
      "That problem you've been thinking about. That idea sitting in your notes. That “what if” you've discussed with friends but never actually pursued.",
      "What if you finally did something about it?",
    ],
    body: [
      "Techstars Startup Weekend is a 54-hour experience that brings together people from different backgrounds to explore ideas, form teams and work towards building a startup.",
      "Over three days, participants move from an initial idea to a prototype or business concept, with guidance from experienced mentors along the way.",
    ],
    kicker: "You don't need a perfect plan. You just need to start.",
    journeyTitle: "The Journey",
    journey: [
      { word: "PITCH", line: "Put your idea out there." },
      { word: "CONNECT", line: "Find people to build with." },
      { word: "BUILD", line: "Turn your idea into a tangible solution." },
      { word: "LEARN", line: "Challenge your thinking and get feedback." },
      { word: "PRESENT", line: "Share what your team has created." },
    ],
  },
  highlights: {
    eyebrow: "A LOOK BACK",
    title: "The moments that made it.",
    lead: "Ideas pitched. Teams formed. Things built. Memories made.",
    body: "Take a look at the people, energy and moments from the previous edition.",
    cta: "EXPLORE ALL HIGHLIGHTS",
    note: "Previous-edition photographs and videos.",
  },
  ai: {
    eyebrow: "THIS YEAR'S THEME · ARTIFICIAL INTELLIGENCE",
    title: "Don't just use AI. Build with it.",
    body: "AI is changing how we create, work and solve problems. This edition challenges you to explore its possibilities and build solutions that address real needs.",
    areasTitle: "Areas to Explore",
    areas: [
      { title: "AI-Powered Products", line: "Applications and digital experiences that solve specific problems." },
      { title: "Generative AI", line: "New ways to create, communicate and work with intelligent tools." },
      { title: "Intelligent Automation", line: "Smarter workflows that make everyday processes more efficient." },
      { title: "AI for Real-World Problems", line: "Solutions across education, healthcare, agriculture and sustainability." },
    ],
    disclaimer: "These are illustrative examples only; actual challenges and project opportunities may vary.",
    startTitle: "Need a Starting Point?",
    starts: [
      { sector: "Education", idea: "An AI learning companion that adapts to individual students." },
      { sector: "Agriculture", idea: "Smarter crop monitoring and decision-support tools for farmers." },
      { sector: "Healthcare", idea: "AI-powered tools that make health information more accessible." },
      { sector: "Business", idea: "Intelligent workflows that help small businesses work smarter." },
    ],
    noExpertise: "No AI expertise required. Bring your curiosity, experiment and learn by building.",
  },
  who: {
    eyebrow: "WHO SHOULD PARTICIPATE?",
    title: "You don't need a founder title to build something.",
    body: "The best teams bring different perspectives. Whether you code, design, understand business or simply enjoy solving problems, there's a place for you.",
    roles: [
      { title: "Developers & Tech Enthusiasts", line: "Build and experiment with technology." },
      { title: "Designers & Creatives", line: "Shape how people experience a product." },
      { title: "Business & Marketing Minds", line: "Explore markets, users and opportunities." },
      { title: "Aspiring Entrepreneurs", line: "Explore what it takes to build a venture." },
      { title: "Students & Working Professionals", line: "Bring your skills, experience and curiosity." },
    ],
    note: "No existing startup, pre-formed team or advanced coding experience required.",
  },
  why: {
    eyebrow: "WHY PARTICIPATE?",
    title: "More than a weekend. A starting point.",
    benefits: [
      { title: "Practical Experience", line: "Experience taking an idea towards a working concept." },
      { title: "New Connections", line: "Meet collaborators from different disciplines and backgrounds." },
      { title: "Mentorship", line: "Learn from people with experience in technology, business and entrepreneurship." },
      { title: "Confidence", line: "Develop your ability to communicate, collaborate and pitch." },
      { title: "New Possibilities", line: "Discover where your idea could go after the weekend." },
    ],
  },
  partners: {
    eyebrow: "BUILT WITH THE SUPPORT OF",
    title: "Better things happen when we build together.",
  },
  closing: {
    title: "Give your idea 54 hours.",
    body: "You never know what you could build until you start.",
  },
};

export const schedule = {
  hero: {
    eyebrow: "THE 54-HOUR EXPERIENCE",
    title: "Three days. One team. One big build.",
    sub: "A weekend that takes you from an idea to a final presentation.",
  },
  days: [
    {
      id: "friday",
      num: "01",
      weekday: "Friday",
      date: "16 April",
      iso: "2027-04-16",
      label: "SAY IT OUT LOUD",
      tagline: "The starting point.",
      items: [
        "Registration and orientation",
        "Introductions and icebreakers",
        "Idea pitching and voting",
        "Team formation",
        "Problem exploration",
      ],
      milestone: "Find your idea and your people.",
    },
    {
      id: "saturday",
      num: "02",
      weekday: "Saturday",
      date: "17 April",
      iso: "2027-04-17",
      label: "LOCK IN AND BUILD",
      tagline: "The work begins.",
      items: [
        "Team collaboration",
        "Customer discovery and validation",
        "Mentor sessions",
        "AI experimentation",
        "Prototype and MVP development",
        "Progress reviews",
      ],
      milestone: "Turn ideas into something tangible.",
    },
    {
      id: "sunday",
      num: "03",
      weekday: "Sunday",
      date: "18 April",
      iso: "2027-04-18",
      label: "SHOW THE RECEIPTS",
      tagline: "Time to take it to the stage.",
      items: ["Final development", "Pitch preparation", "Final presentations", "Jury evaluation", "Results and closing"],
      milestone: "Present what your team has built.",
    },
  ],
  note: "Detailed timings and session schedules will be announced closer to the event.",
  cta: "VIEW TICKET DETAILS",
};

export type Faq = { q: string; a: string; list?: string[]; id: string };

export const faqs: { eyebrow: string; title: string; items: Faq[]; still: string; stillBody: string } = {
  eyebrow: "GOT QUESTIONS?",
  title: "Before you show up, here's what to know.",
  items: [
    { id: "own-idea", q: "Do I need to bring my own idea?", a: "No. You can pitch an idea of your own or join a team working on an idea you find interesting." },
    { id: "existing-team", q: "Can I participate with an existing team?", a: "Team formation is part of the experience. You'll have the opportunity to meet other participants and collaborate." },
    { id: "coding", q: "Do I need coding or AI experience?", a: "No. Technical and non-technical participants are welcome. Teams benefit from a mix of skills and perspectives." },
    { id: "startup", q: "Do I need to have a startup already?", a: "Not at all. The event is designed for people who want to explore an idea and experience building something from the ground up." },
    { id: "final", q: "What happens during the final presentation?", a: "Teams present their solutions to a panel of judges, who evaluate their work based on the event's judging criteria." },
    {
      id: "evaluation",
      q: "How will teams be evaluated?",
      a: "Evaluation will consider:",
      list: [
        "Problem and solution clarity",
        "Application of AI",
        "User understanding and validation",
        "Feasibility and potential",
        "Pitch and presentation",
      ],
    },
    { id: "mentors", q: "Will mentors be available throughout the event?", a: "Mentorship sessions will be scheduled as part of the programme. Participants can seek guidance in relevant areas during those sessions." },
    { id: "after", q: "Can I continue working on my idea after the event?", a: "Absolutely. Further mentorship or incubation opportunities, if available, will depend on programme arrangements." },
    { id: "organiser", q: "Who organises the event?", a: "Inhub E-Cell, Inspiria Knowledge Campus." },
    { id: "updates", q: "How can I stay updated?", a: "Follow the official event communication channels and check this website for announcements." },
  ],
  still: "Still have a question?",
  stillBody: "Get in touch through our Contact page.",
};

/** Brief §4 — direct answers for answer engines. Rendered on the FAQs page. */
export const quickAnswers: { q: string; a: string }[] = [
  { q: "What is Techstars Startup Weekend Siliguri?", a: "A 54-hour, three-day startup-building programme." },
  { q: "When is Startup Weekend Siliguri 2027?", a: "16–18 April 2027." },
  { q: "Where is the event happening?", a: "Inspiria Knowledge Campus, Siliguri, West Bengal." },
  { q: "What is the theme for 2027?", a: "Artificial Intelligence (AI)." },
  { q: "Which edition is this?", a: "The 7th edition." },
  { q: "Who can participate?", a: "Students, developers, designers, professionals and aspiring entrepreneurs." },
  { q: "How much does participation cost?", a: "₹1,500 per participant." },
  { q: "How do I register?", a: "Registration details are coming soon." },
];

export const tickets = {
  hero: {
    eyebrow: "YOUR BUILD STARTS HERE",
    title: "54 hours. Three days. ₹1,500.",
    sub: "One weekend to explore an idea, find your team and build something real.",
  },
  ticketTitle: "Your Ticket",
  per: "PER PARTICIPANT",
  includedTitle: "What's Included?",
  included: [
    "Access to all three days",
    "Participation in the 54-hour programme",
    "Scheduled mentorship sessions",
    "Designated event workspace",
    "Team activities and collaboration",
    "Final presentation opportunity",
  ],
  status: "COMING SOON",
  statusTitle: "Registration opens soon.",
  statusBody: "We're getting things ready. Official registration details will be announced here.",
  cta: "REGISTRATION COMING SOON",
  stay: "Stay tuned for updates.",
};

export const contact = {
  hero: {
    eyebrow: "LET'S CONNECT",
    title: "Have a question? We're here.",
    sub: "Reach out to the organising team for event-related enquiries, partnerships and other information.",
  },
  getInTouch: "Get in Touch",
  venueTitle: "Event Venue",
  directions: "GET DIRECTIONS",
  infoTitle: "Event Information",
  follow: "Follow Along",
  form: {
    title: "Write to the team.",
    roles: [
      "Participant / Prospective Attendee",
      "Mentor / Speaker",
      "Partner / Sponsor",
      "Volunteer",
      "General Enquiry",
      "Something else",
    ],
    submit: "SEND MESSAGE",
  },
};

export const footer = {
  tagline: "Your idea deserves a chance. Give it 54 hours.",
  copyright: "© 2027 Techstars Startup Weekend Siliguri. All rights reserved.",
};

/**
 * Partner logos supplied in the brand kit.
 * NOTE: the brief lists Techstars and Google for Startups as global & programme
 * partners but leaves the other two tiers as placeholders. The placement of the
 * remaining brand-kit logos below is an editorial assumption — confirm with the
 * organising team before launch and move entries between tiers as needed.
 */
export type Partner = { name: string; src?: string; w: number; h: number; tile?: "dark" | "light" };
export const partnerTiers: { title: string; partners: Partner[] }[] = [
  {
    title: "GLOBAL & PROGRAMME PARTNERS",
    partners: [
      { name: "Techstars", w: 0, h: 0 },
      { name: "Google for Startups", src: "/partners/google-for-startups.png", w: 913, h: 117 },
    ],
  },
  {
    title: "TECHNOLOGY & INNOVATION PARTNERS",
    partners: [
      { name: "Brex", src: "/partners/brex.png", w: 716, h: 200 },
      { name: "GoDaddy Registry", src: "/partners/godaddy-registry.png", w: 484, h: 173 },
    ],
  },
  {
    title: "ACADEMIC & COMMUNITY PARTNERS",
    partners: [
      { name: "TiE Siliguri", src: "/partners/tie-siliguri.png", w: 1446, h: 491 },
      { name: "Inspiria Knowledge Campus", src: "/partners/inspiria.png", w: 400, h: 100 },
    ],
  },
];
