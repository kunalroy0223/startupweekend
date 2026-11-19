
export type MediaKind = "photo" | "video";

export type HighlightSlot = {
  id: string;
  kind: MediaKind;
  caption: string;
  alt: string;
  src?: string;
  video?: string;
  width?: number;
  height?: number;
  span: [number, number];
  spanSm: [number, number];
  seed: number;
};

const photos = "/archive-assets/photos";
const videos = "/archive-assets/videos";
const posters = "/archive-assets/posters";

export const highlights: HighlightSlot[] = [
  {
    id: "defining-moment",
    kind: "photo",
    caption: "The people behind the ideas",
    alt: "Group of Startup Weekend participants gathered together",
    src: `${photos}/DSC_1201.jpg`,
    span: [7, 5],
    spanSm: [6, 4],
    seed: 1,
  },
  {
    id: "pitching",
    kind: "photo",
    caption: "Ideas take the stage",
    alt: "Participant presenting an idea during a pitch session",
    src: `${photos}/DSC_0926.jpg`,
    span: [5, 7],
    spanSm: [3, 5],
    seed: 2,
  },
  {
    id: "event-film",
    kind: "video",
    caption: "The Startup Weekend experience",
    alt: "Video highlight from a previous Startup Weekend",
    src: `${posters}/video1.jpg`,
    video: `${videos}/video1.mp4`,
    span: [7, 4],
    spanSm: [3, 3],
    seed: 3,
  },
  {
    id: "collaborating",
    kind: "photo",
    caption: "Building together",
    alt: "Participants working together during a Startup Weekend session",
    src: `${photos}/DSC_0823.jpg`,
    span: [5, 3],
    spanSm: [3, 2],
    seed: 4,
  },
  {
    id: "community",
    kind: "photo",
    caption: "Beyond the sessions",
    alt: "Participants sharing an informal moment at the event",
    src: `${photos}/DSC_0670.jpg`,
    span: [3, 3],
    spanSm: [3, 2],
    seed: 5,
  },
  {
    id: "celebration",
    kind: "photo",
    caption: "A moment worth celebrating",
    alt: "Team celebrating an achievement on stage",
    src: `${photos}/DSC_1169.jpg`,
    span: [6, 4],
    spanSm: [6, 3],
    seed: 6,
  },
  {
    id: "behind-the-scenes",
    kind: "video",
    caption: "Behind the scenes",
    alt: "Behind-the-scenes video from a previous edition",
    src: `${posters}/video2.jpg`,
    video: `${videos}/video2.mp4`,
    span: [3, 4],
    spanSm: [6, 3],
    seed: 7,
  },
  {
    id: "workshops",
    kind: "photo",
    caption: "Learning through action",
    alt: "Facilitator engaging participants during a workshop",
    src: `${photos}/DSC_0423.jpg`,
    span: [4, 4],
    spanSm: [3, 3],
    seed: 8,
  },
  {
    id: "mentorship",
    kind: "photo",
    caption: "Guidance and mentorship",
    alt: "Speaker addressing participants during an event session",
    src: `${photos}/DSC_9668.jpg`,
    span: [4, 3],
    spanSm: [3, 3],
    seed: 9,
  },
  {
    id: "audience",
    kind: "photo",
    caption: "A room full of possibilities",
    alt: "Audience attending a Startup Weekend session",
    src: `${photos}/DSC_9992.jpg`,
    span: [4, 3],
    spanSm: [3, 3],
    seed: 10,
  },
  {
    id: "pitch-highlights",
    kind: "video",
    caption: "Moments from the pitch floor",
    alt: "Video highlights from a previous Startup Weekend",
    src: `${posters}/video3-20s.jpg`,
    video: `${videos}/video3.mp4`,
    span: [4, 4],
    spanSm: [6, 3],
    seed: 11,
  },
];

export const hasRealMedia = (s: HighlightSlot) =>
  Boolean(s.src || s.video);
