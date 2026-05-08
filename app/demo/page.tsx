"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

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
  "1M to 10M chars / month",
  "10M to 50M chars / month",
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
        console.warn("submit-lead non-ok", res.status, data);
        setError(
          "Something went wrong saving your details. Please try again in a moment.",
        );
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.warn("submit-lead failed", err);
      setError(
        "Something went wrong saving your details. Please try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-12 px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card px-4 py-2 shadow-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
              Book a Demo
            </span>
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {submitted ? "We've got your details." : "Tell us where to point the demo."}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {submitted ? (
              <>
                A solutions engineer will reach out to{" "}
                <span className="font-medium text-foreground">{form.email}</span>{" "}
                within one business day to schedule the call and generate
                samples in your target language.
              </>
            ) : (
              "30 minutes with a solutions engineer. We'll cover your use case, generate samples in your language of choice, and walk through pricing for cloud and on-premise."
            )}
          </p>
          {!submitted ? (
            <p className="mt-4 text-xs text-subtle">
              We&apos;ll only use these details to prep the call. No marketing
              automation.
            </p>
          ) : null}
        </div>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-2xl rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-10"
          >
            {error ? (
              <div className="mb-6 rounded-xl border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-accent">
                {error}
              </div>
            ) : null}
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
              className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Send request"}
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
          </form>
        ) : (
          <div className="mx-auto w-full max-w-2xl rounded-2xl border border-border bg-card p-10 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent"
                aria-hidden
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <p className="mt-7 text-sm leading-relaxed text-muted sm:text-base">
              You&apos;re on the list. We&apos;ll be in touch shortly.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center justify-center rounded-full border border-border-strong bg-transparent px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card-hover"
            >
              Back to home
            </Link>
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
