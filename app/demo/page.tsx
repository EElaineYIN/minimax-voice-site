"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

const CALENDLY_URL = "https://calendly.com/minimax-global/30min";
const CALENDLY_EMBED = `${CALENDLY_URL}?embed_domain=minimax-voice.com&embed_type=Inline&hide_event_type_details=0&hide_gdpr_banner=1&background_color=0a0a0f&text_color=ededed&primary_color=6366f1`;

const useCases = [
  "Voice agent / IVR",
  "Audiobook & podcast production",
  "Video & content localization",
  "Education / tutoring",
  "Accessibility tools",
  "Gaming & character voice",
  "Conversational AI product",
  "Other",
];

const volumes = [
  "Less than 1M chars / month",
  "1M – 10M chars / month",
  "10M – 50M chars / month",
  "50M+ chars / month",
  "Not sure yet",
];

type FormState = {
  name: string;
  email: string;
  company: string;
  useCase: string;
  volume: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  company: "",
  useCase: "",
  volume: "",
  message: "",
};

export default function DemoPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update =
    <K extends keyof FormState>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        // Even if the lead store fails, surface to console but still let
        // the user proceed to Calendly so we never block a conversion.
        console.warn("submit-lead non-ok", res.status, data);
        setError(
          "We couldn't save your details, but you can still book a slot below.",
        );
      }
    } catch (err) {
      console.warn("submit-lead failed", err);
      setError(
        "We couldn't save your details, but you can still book a slot below.",
      );
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="relative">
      <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-12 px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            className="mb-7 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-subtle hover:text-foreground"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back home
          </Link>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Book a Demo
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {submitted ? "Pick a time that works." : "Tell us where to point the demo."}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {submitted
              ? "We'll generate samples in your target language before the call so you have something concrete to react to."
              : "30 minutes with a solutions engineer. We'll cover your use case, generate samples in your language of choice, and walk through pricing — cloud or on-premise."}
          </p>
        </div>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-2xl rounded-2xl border border-border bg-card p-7 shadow-[0_0_0_1px_rgba(99,102,241,0.06)_inset] sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" required>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Ada Lovelace"
                  className="form-input"
                  autoComplete="name"
                />
              </Field>
              <Field label="Work email" required>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  placeholder="ada@yourcompany.com"
                  className="form-input"
                  autoComplete="email"
                />
              </Field>
              <Field label="Company" required>
                <input
                  type="text"
                  required
                  value={form.company}
                  onChange={update("company")}
                  placeholder="Yourcompany Inc."
                  className="form-input"
                  autoComplete="organization"
                />
              </Field>
              <Field label="Primary use case" required>
                <select
                  required
                  value={form.useCase}
                  onChange={update("useCase")}
                  className="form-input"
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {useCases.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Estimated monthly volume" className="sm:col-span-2">
                <select
                  value={form.volume}
                  onChange={update("volume")}
                  className="form-input"
                >
                  <option value="">Optional</option>
                  {volumes.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Anything else?" className="sm:col-span-2">
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Languages you need, latency targets, deployment constraints, current vendor…"
                  className="form-input"
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Continue to scheduling"}
              {!submitting ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              ) : null}
            </button>
            <p className="mt-3 text-center text-xs text-subtle">
              We&apos;ll only use these details to prep the call. No marketing
              automation.
            </p>
          </form>
        ) : (
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            {error ? (
              <div className="rounded-xl border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-accent">
                {error}
              </div>
            ) : null}
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <iframe
                title="Schedule a demo with MiniMax Voice"
                src={CALENDLY_EMBED}
                className="h-[760px] w-full"
              />
            </div>
            <p className="text-center text-sm text-subtle">
              Not loading?{" "}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline-offset-4 hover:underline"
              >
                Open Calendly in a new tab
              </a>
              .
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-2 text-sm ${className ?? ""}`}>
      <span className="text-foreground/80">
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </span>
      {children}
    </label>
  );
}
