/**
 * Previous-edition highlights.
 *
 * No previous-edition photographs or videos were supplied with the project, so
 * every slot below is an honest PLACEHOLDER: the gallery renders an abstract,
 * clearly-labelled art tile instead of a fake "event photo".
 *
 * To publish real media:
 *   1. Put files in /public/media/highlights/ (photos: .jpg/.webp, videos: .mp4).
 *   2. Set `src` (photo or video poster) and, for videos, `video` on the slot.
 *   3. Update `alt` so it describes what is actually in the photo.
 * The layout (`span`) controls the tile's footprint in the masonry wall.
 */

export type MediaKind = "photo" | "video";

export type HighlightSlot = {
  id: string;
  kind: MediaKind;
  /** What this slot is meant to show (brief §2, Previous Edition Highlights). */
  caption: string;
  alt: string;
  /** Real photo, or poster frame for a video. Leave undefined for a placeholder. */
  src?: string;
  /** Real video file (mp4) or a YouTube embed URL. */
  video?: string;
  width?: number;
  height?: number;
  /** Footprint in the 12-column desktop wall: [colSpan, rowSpan]. */
  span: [number, number];
  /** Footprint on tablet/mobile 6-column wall. */
  spanSm: [number, number];
  /** Placeholder art seed: changes the generative composition. */
  seed: number;
};

export const highlights: HighlightSlot[] = [
  {
    id: "defining-moment",
    kind: "photo",
    caption: "A defining moment from the previous edition",
    alt: "Placeholder for a feature photograph from the previous edition",
    span: [7, 5],
    spanSm: [6, 4],
    seed: 1,
  },
  {
    id: "pitching",
    kind: "photo",
    caption: "Participants pitching their ideas",
    alt: "Placeholder for a portrait photograph of a participant pitching",
    span: [5, 7],
    spanSm: [3, 5],
    seed: 2,
  },
  {
    id: "aftermovie",
    kind: "video",
    caption: "Previous edition aftermovie",
    alt: "Placeholder for the previous edition aftermovie",
    span: [7, 4],
    spanSm: [3, 3],
    seed: 3,
  },
  {
    id: "collaborating",
    kind: "photo",
    caption: "Teams collaborating and building",
    alt: "Placeholder for a landscape photograph of teams collaborating",
    span: [5, 3],
    spanSm: [3, 2],
    seed: 4,
  },
  {
    id: "mentorship",
    kind: "photo",
    caption: "Mentorship and team interactions",
    alt: "Placeholder for a photograph of a mentorship session",
    span: [3, 3],
    spanSm: [3, 2],
    seed: 5,
  },
  {
    id: "celebration",
    kind: "photo",
    caption: "Group photograph and final celebration",
    alt: "Placeholder for the group photograph from the final celebration",
    span: [6, 4],
    spanSm: [6, 3],
    seed: 6,
  },
  {
    id: "behind-the-scenes",
    kind: "video",
    caption: "Participant experiences and behind the scenes",
    alt: "Placeholder for a behind-the-scenes participant video",
    span: [3, 4],
    spanSm: [6, 3],
    seed: 7,
  },
];

export const hasRealMedia = (s: HighlightSlot) => Boolean(s.src || s.video);
