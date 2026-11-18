"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { contact } from "@/lib/content";
import { organiser } from "@/lib/site";
import { ROLES, LIMITS, validateContact, type FieldErrors } from "@/lib/contact";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string; mailto?: boolean };

const fieldBase =
  "peer w-full border-0 border-b-2 border-void/70 bg-transparent px-0 pb-2 pt-1 text-lg text-void placeholder:text-void/35 transition-colors focus:border-green-ink focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-[#b3261e]";

export function ContactForm() {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef<number>(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [msgLen, setMsgLen] = useState(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const read = () => {
    const fd = new FormData(formRef.current!);
    return {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      role: String(fd.get("role") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      startedAt: startedAt.current,
    };
  };

  const focusFirst = (errs: FieldErrors) => {
    const first = (["name", "email", "role", "message"] as const).find((k) => errs[k]);
    if (first) document.getElementById(id(first))?.focus();
  };

  const onBlurField = (key: keyof FieldErrors) => {
    // Only re-validate a field once it has been flagged, so typing isn't nagged.
    if (!errors[key]) return;
    const next = validateContact(read());
    setErrors((e) => ({ ...e, [key]: next[key] }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status.kind === "submitting") return; // duplicate-submit guard
    const data = read();
    const errs = validateContact(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirst(errs);
      return;
    }
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; message?: string; fields?: FieldErrors };
      if (res.ok && body.ok) {
        setStatus({ kind: "success" });
        track("contact_form_submit", { role: data.role });
        formRef.current?.reset();
        setMsgLen(0);
        return;
      }
      if (body.fields) {
        setErrors(body.fields);
        focusFirst(body.fields);
        setStatus({ kind: "idle" });
        return;
      }
      if (body.error === "not_configured") {
        setStatus({ kind: "error", message: "Our message service isn't switched on yet, so this couldn't be sent.", mailto: true });
      } else if (body.message) {
        setStatus({ kind: "error", message: body.message });
      } else {
        setStatus({ kind: "error", message: "Something went wrong while sending your message.", mailto: true });
      }
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach the server. Check your connection and try again.", mailto: true });
    }
  }

  const busy = status.kind === "submitting";

  return (
    <div className="relative [filter:drop-shadow(10px_12px_0_#000)]">
      <div className="relative overflow-hidden bg-white p-6 text-void [clip-path:polygon(0_0,100%_1.2%,99.4%_100%,0.6%_98.8%)] md:p-10">
        {/* letter furniture */}
        <div aria-hidden="true" className="absolute inset-0 [background-image:repeating-linear-gradient(transparent_0_39px,rgba(130,152,171,0.25)_39px_40px)]" />
        <div aria-hidden="true" className="absolute right-5 top-5 grid size-16 rotate-6 place-items-center border-2 border-dashed border-void bg-green font-display text-xs font-extrabold leading-none md:size-20">
          <span className="text-center">
            SW
            <br />
            2027
          </span>
        </div>

        <h2 className="relative font-display text-[clamp(2.2rem,4.2vw,3.8rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">{contact.form.title}</h2>

        <AnimatePresence mode="wait" initial={false}>
          {status.kind === "success" ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              aria-live="polite"
              className="relative mt-10 bg-green p-6 md:p-8"
            >
              <p className="eyebrow">Message sent</p>
              <p className="mt-2 font-display text-3xl font-extrabold leading-tight">Thanks — your message is with the team.</p>
              <p className="mt-2 text-lg">We&apos;ll reply to the email address you gave us.</p>
              <button type="button" onClick={() => setStatus({ kind: "idle" })} className="mt-5 font-mono text-xs uppercase tracking-[0.16em] underline underline-offset-4">
                Write another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              noValidate
              onSubmit={onSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative mt-8 grid gap-7 md:grid-cols-2"
              aria-describedby={id("req")}
            >
              <p id={id("req")} className="font-mono text-xs uppercase tracking-[0.12em] text-void/60 md:col-span-2">
                All fields are required.
              </p>

              {/* honeypot */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor={id("website")}>Leave this field empty</label>
                <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <Field label="Your name" htmlFor={id("name")} error={errors.name} errId={id("name-err")}>
                <input
                  id={id("name")}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={LIMITS.name}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? id("name-err") : undefined}
                  onBlur={() => onBlurField("name")}
                  className={fieldBase}
                />
              </Field>

              <Field label="Email" htmlFor={id("email")} error={errors.email} errId={id("email-err")}>
                <input
                  id={id("email")}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  maxLength={LIMITS.email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? id("email-err") : undefined}
                  onBlur={() => onBlurField("email")}
                  className={fieldBase}
                />
              </Field>

              <Field label="I am writing as" htmlFor={id("role")} error={errors.role} errId={id("role-err")} className="md:col-span-2">
                <div className="relative">
                  <select
                    id={id("role")}
                    name="role"
                    required
                    defaultValue=""
                    aria-invalid={Boolean(errors.role)}
                    aria-describedby={errors.role ? id("role-err") : undefined}
                    onBlur={() => onBlurField("role")}
                    onChange={() => onBlurField("role")}
                    className={cn(fieldBase, "cursor-pointer appearance-none pr-10")}
                  >
                    <option value="" disabled>
                      Choose one…
                    </option>
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <svg aria-hidden="true" viewBox="0 0 12 8" className="pointer-events-none absolute right-1 top-1/2 size-3 -translate-y-1/2">
                    <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </Field>

              <Field label="Message" htmlFor={id("message")} error={errors.message} errId={id("message-err")} className="md:col-span-2">
                <textarea
                  id={id("message")}
                  name="message"
                  required
                  rows={6}
                  maxLength={LIMITS.message}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={[errors.message ? id("message-err") : "", id("message-count")].filter(Boolean).join(" ")}
                  onBlur={() => onBlurField("message")}
                  onChange={(e) => setMsgLen(e.target.value.length)}
                  className={cn(fieldBase, "resize-y leading-[40px]")}
                />
                <span id={id("message-count")} className="mt-1 block text-right font-mono text-[0.65rem] text-void/70">
                  {msgLen} / {LIMITS.message}
                </span>
              </Field>

              <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
                <button
                  type="submit"
                  disabled={busy}
                  aria-busy={busy}
                  className="group relative inline-flex h-16 items-center justify-center gap-3 bg-void px-10 font-mono text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[6px_6px_0_#39c463] transition-transform hover:-rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-wait disabled:opacity-80"
                >
                  {busy ? (
                    <>
                      <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-green border-t-transparent" />
                      Sending…
                    </>
                  ) : (
                    <>
                      {contact.form.submit}
                      <span aria-hidden="true" className="text-green transition-transform group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>
                <p className="text-sm text-void/60">
                  Or email{" "}
                  <a href={`mailto:${organiser.email}`} className="font-semibold text-void underline underline-offset-4">
                    {organiser.email}
                  </a>
                </p>
              </div>

              <div aria-live="assertive" className="md:col-span-2">
                {status.kind === "error" ? (
                  <div role="alert" className="border-2 border-[#b3261e] bg-[#fdecea] p-4 text-[#5c1410]">
                    <p className="font-semibold">{status.message}</p>
                    {status.mailto ? (
                      <p className="mt-1">
                        Your message wasn&apos;t sent. Please email us directly at{" "}
                        <a className="font-semibold underline" href={`mailto:${organiser.email}`}>
                          {organiser.email}
                        </a>{" "}
                        or call{" "}
                        <a className="font-semibold underline" href={organiser.phoneHref}>
                          {organiser.phone}
                        </a>
                        .
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  errId,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errId: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      <label htmlFor={htmlFor} className="mb-1 block font-mono text-xs font-semibold uppercase tracking-[0.16em] text-void/75">
        {label} <span aria-hidden="true" className="text-green-ink">*</span>
      </label>
      {children}
      {error ? (
        <p id={errId} className="mt-2 flex items-center gap-2 text-sm font-medium text-[#b3261e]">
          <span aria-hidden="true">✕</span>
          {error}
        </p>
      ) : null}
    </div>
  );
}
