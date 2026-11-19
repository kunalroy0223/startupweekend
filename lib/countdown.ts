/**
 * Pure countdown maths, shared by the hero countdown and the test suite.
 * The event boundaries are ISO strings with an explicit +05:30 offset
 * (Asia/Kolkata), so the result is correct whatever the visitor's time zone.
 */

export type CountdownStatus = "upcoming" | "live" | "ended";

export type Countdown = {
  status: CountdownStatus;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** Whole hours since the start (live state only). */
  hourOfEvent: number;
  /** 1-based day number (live state only). */
  dayOfEvent: number;
};

const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export function getCountdown(now: number, startsAt: string, endsAt: string): Countdown {
  const start = Date.parse(startsAt);
  const end = Date.parse(endsAt);
  if (Number.isNaN(start) || Number.isNaN(end)) throw new Error("Invalid event dates");

  if (now >= end) return { status: "ended", days: 0, hours: 0, minutes: 0, seconds: 0, hourOfEvent: 0, dayOfEvent: 0 };
  if (now >= start) {
    const elapsed = now - start;
    return {
      status: "live",
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      hourOfEvent: Math.floor(elapsed / HOUR),
      dayOfEvent: Math.floor(elapsed / DAY) + 1,
    };
  }

  // Count down in whole seconds, rounding up so "00:00:00:01" is the last tick.
  const left = Math.ceil((start - now) / SEC) * SEC;
  return {
    status: "upcoming",
    days: Math.floor(left / DAY),
    hours: Math.floor((left % DAY) / HOUR),
    minutes: Math.floor((left % HOUR) / MIN),
    seconds: Math.floor((left % MIN) / SEC),
    hourOfEvent: 0,
    dayOfEvent: 0,
  };
}

export const pad2 = (n: number) => String(Math.max(0, n)).padStart(2, "0");
