import { contact } from "./content";

/** Shared contact-form contract, used by the client form and the API route. */

export const ROLES = contact.form.roles;
export type Role = (typeof ROLES)[number];

export type ContactPayload = {
  name: string;
  email: string;
  role: string;
  message: string;
  /** Honeypot — must stay empty. */
  website?: string;
  /** ms timestamp when the form was rendered (bot timing check). */
  startedAt?: number;
};

export type FieldErrors = Partial<Record<"name" | "email" | "role" | "message", string>>;

export const LIMITS = { name: 100, email: 254, message: 5000, messageMin: 10 } as const;

// Pragmatic email check: one @, a dot in the domain, no spaces.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(p: Partial<ContactPayload>): FieldErrors {
  const e: FieldErrors = {};
  const name = (p.name ?? "").trim();
  const email = (p.email ?? "").trim();
  const message = (p.message ?? "").trim();
  const role = (p.role ?? "").trim();

  if (!name) e.name = "Please tell us your name.";
  else if (name.length > LIMITS.name) e.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (!email) e.email = "Please add your email so we can reply.";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) e.email = "That email doesn't look right. Check it and try again.";

  if (!role) e.role = "Please choose what you're writing as.";
  else if (!(ROLES as readonly string[]).includes(role)) e.role = "Please choose one of the options.";

  if (!message) e.message = "Please write a message.";
  else if (message.length < LIMITS.messageMin) e.message = `A little more detail, please (at least ${LIMITS.messageMin} characters).`;
  else if (message.length > LIMITS.message) e.message = `Please keep your message under ${LIMITS.message} characters.`;

  return e;
}
