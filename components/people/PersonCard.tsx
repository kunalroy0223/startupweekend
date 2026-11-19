
import Image from "next/image";
import { groupById, type Person } from "@/lib/people";
import { IconLinkedIn } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");

const cardShapes = [
  {
    card: "3rem 2rem 3.5rem 2rem",
    portrait: "46% 54% 41% 59% / 43% 39% 61% 57%",
    rotation: "-1deg",
  },
  {
    card: "2rem 3.5rem 2rem 3rem",
    portrait: "55% 45% 58% 42% / 38% 49% 51% 62%",
    rotation: "1deg",
  },
  {
    card: "3.5rem 2rem 3rem 2.5rem",
    portrait: "42% 58% 48% 52% / 55% 40% 60% 45%",
    rotation: "-0.5deg",
  },
  {
    card: "2.5rem 3rem 2rem 3.5rem",
    portrait: "58% 42% 45% 55% / 44% 58% 42% 56%",
    rotation: "1.2deg",
  },
  {
    card: "3rem 2.5rem 3.5rem 2rem",
    portrait: "49% 51% 60% 40% / 57% 42% 58% 43%",
    rotation: "-1.2deg",
  },
  {
    card: "2rem 3.5rem 2.5rem 3rem",
    portrait: "43% 57% 51% 49% / 40% 55% 45% 60%",
    rotation: "0.7deg",
  },
];

const marks = ["✳", "✦", "✣", "✳", "✺", "✦"];

type PersonCardProps = {
  person: Person;
  compact?: boolean;
  headingLevel?: 3 | 4;
  tone?: "dark" | "light";
  variant?: number;
};

export function PersonCard({
  person,
  compact = false,
  headingLevel = 3,
  tone = "dark",
  variant = 0,
}: PersonCardProps) {
  const shape = cardShapes[variant % cardShapes.length];
  const darkCard = tone === "light";
  const Heading = headingLevel === 3 ? "h3" : "h4";

  const cardTone = darkCard
    ? "bg-[#080b09] text-[#f6f2e8] shadow-[8px_8px_0_#39c463]"
    : "bg-[#f3f0e6] text-[#080b09] shadow-[8px_8px_0_#080b09]";

  const portraitBorder = darkCard
    ? "border-[#f3f0e6]"
    : "border-[#080b09]";

  const role = person.roles[0];

  const roleLabel =
    role.title ?? groupById(role.group).role;

  return (
    <article
      style={{
        borderRadius: shape.card,
        transform: `rotate(${shape.rotation})`,
      }}
      className={cn(
        "group relative isolate flex h-full min-h-[29rem] flex-col overflow-hidden p-5 sm:p-6",
        "transition-[translate,scale,box-shadow] duration-500 ease-[var(--ease-out-expo)]",
        "hover:-translate-y-2 hover:scale-[1.015]",
        cardTone
      )}
    >
      {/* Small editorial markers */}
      <div className="absolute left-7 top-6 font-mono text-[0.62rem] tracking-[0.2em] opacity-55">
        TSWS / {String(variant + 1).padStart(2, "0")}
      </div>

      <span
        aria-hidden="true"
        className="absolute right-7 top-4 font-display text-3xl text-green transition-transform duration-500 group-hover:rotate-45 group-hover:scale-125"
      >
        {marks[variant % marks.length]}
      </span>

      {/* Organic portrait composition */}
      <div className="relative mb-5 mt-10 flex flex-1 items-center justify-center">
        <span
          aria-hidden="true"
          className={cn(
            "absolute right-[7%] top-[9%] size-16 rounded-full bg-green",
            variant % 2 === 0 ? "rotate-12" : "-rotate-12"
          )}
        />

        <span
          aria-hidden="true"
          className="absolute bottom-[7%] left-[8%] size-8 rounded-full border-[3px] border-green"
        />

        <div
          className={cn(
            "relative aspect-[0.94/1] w-[78%] max-w-[15rem] overflow-hidden border-[5px]",
            portraitBorder,
            "shadow-[5px_5px_0_#39c463]"
          )}
          style={{ borderRadius: shape.portrait }}
        >
          {person.photo ? (
            <Image
              src={person.photo.src}
              alt={`Portrait of ${person.name}`}
              width={person.photo.width}
              height={person.photo.height}
              sizes="(min-width:1280px) 18vw, (min-width:640px) 40vw, 80vw"
              className="h-full w-full object-cover grayscale-[0.2] transition-[filter,transform] duration-700 group-hover:scale-110 group-hover:grayscale-0"
            />
          ) : (
            <div
              aria-hidden="true"
              className="relative grid h-full w-full place-items-center overflow-hidden bg-[radial-gradient(circle_at_25%_20%,#39c463_0%,#159447_43%,#080b09_100%)]"
            >
              <span className="absolute -right-8 -top-8 size-36 rounded-full border-[18px] border-white/10" />
              <span className="absolute -bottom-10 -left-8 size-40 rounded-full border-[22px] border-black/10" />

              <span className="relative font-display text-6xl font-extrabold tracking-[-0.08em] text-white">
                {initials(person.name)}
              </span>
            </div>
          )}
        </div>

        {/* Role sticker */}
        <span
          style={{
            transform: `rotate(${variant % 2 === 0 ? "-7deg" : "6deg"})`,
          }}
          className="absolute bottom-[5%] right-[1%] z-10 bg-green px-3 py-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#080b09] shadow-[3px_3px_0_#080b09]"
        >
          {roleLabel}
        </span>
      </div>

      {/* Profile information */}
      <div className="relative z-10 px-1 pb-1 text-center">
        <Heading className="font-display text-[1.8rem] font-extrabold leading-[0.98] tracking-[-0.045em]">
          {person.name}
        </Heading>

        {person.designation ? (
          <p className="mt-3 text-sm font-semibold leading-snug opacity-85">
            {person.designation}
          </p>
        ) : null}

        {person.organisation ? (
          <p className="mt-1 text-sm leading-snug opacity-65">
            {person.organisation}
          </p>
        ) : null}

        {!compact && person.bio ? (
          <p className="mx-auto mt-4 max-w-[17rem] text-sm leading-relaxed opacity-70">
            {person.bio}
          </p>
        ) : null}

        {person.linkedin ? (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${person.name} on LinkedIn`}
            className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-current/20 px-3 py-2 text-xs font-semibold transition-colors hover:border-green hover:text-green"
          >
            <IconLinkedIn className="size-4" />
            Connect
          </a>
        ) : null}
      </div>
    </article>
  );
}
