"use client";

import { useState } from "react";

const HIGHLIGHTS = [
  "Voice cloning across 40+ languages, including Mandarin, Arabic, and Hindi.",
  "Per-sentence emotion & style prompts. No SSML soup.",
  "On-premise deployment available today, not a 2026 roadmap promise.",
  "Voice agent ready. Drops into LiveKit, Pipecat, Vapi, Retell, any SIP trunk.",
  "Half the price of ElevenLabs at HD parity, a quarter at Turbo.",
];

type Tab = {
  key: string;
  label: string;
  icon: React.ReactNode;
  heading: string;
  copy: string;
  bullet: string;
};

const TABS: Tab[] = [
  {
    key: "quality",
    label: "Quality",
    bullet: "MOS 4.42 on internal eval set",
    heading: "QUALITY",
    copy:
      "Speech-2.8 ties with ElevenLabs Turbo v2.5 in blind MOS evaluations and outperforms it on emotional range. Speaker identity is preserved across long-form output without drift, making it usable for audiobook and podcast production end-to-end. No chunking, no manual stitching.",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 2 9.2 8.6 2 9.2l5.5 4.7L5.8 21 12 17.3 18.2 21l-1.7-7.1L22 9.2l-7.2-.6Z" />
      </svg>
    ),
  },
  {
    key: "speed",
    label: "Speed",
    bullet: "<200ms TTFB across regions",
    heading: "SPEED",
    copy:
      "Sub-200ms time-to-first-byte on Turbo, measured globally. PCM streaming begins emitting after the first phoneme is generated, not after a buffer fills. Built for the inner loop of a voice agent, not for batch jobs. Mid-sentence interruption is clean, with state preserved for resume.",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M13 2 3 14h9l-1 8 10-12h-9z" />
      </svg>
    ),
  },
  {
    key: "reach",
    label: "Reach",
    bullet: "40+ languages, native prosody",
    heading: "REACH",
    copy:
      "40+ languages with native-quality prosody, not phoneme mapping. Code-switching mid-sentence (English → Mandarin → Spanish) works without retriggering the model or swapping voices. A single cloned voice can speak any of the supported languages, including non-Latin scripts.",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
      </svg>
    ),
  },
];

function FilledCheck() {
  return (
    <span
      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground"
      aria-hidden
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-background"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

export function HighlightsSection() {
  const [activeKey, setActiveKey] = useState(TABS[0].key);
  const active = TABS.find((t) => t.key === activeKey)!;

  return (
    <section className="relative px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEFT — Highlights */}
          <div>
            <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Why MiniMax Voice
            </span>
            <h2 className="mt-5 max-w-md text-[40px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Built for production,
              <br />
              priced for shipping.
            </h2>
            <ul className="mt-8 space-y-4">
              {HIGHLIGHTS.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/85"
                >
                  <FilledCheck />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Tabs */}
          <div className="flex flex-col">
            <div
              role="tablist"
              aria-label="Why MiniMax Voice"
              className="flex w-full gap-1 rounded-full border border-border bg-card p-1 shadow-sm"
            >
              {TABS.map((tab) => {
                const isActive = tab.key === activeKey;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveKey(tab.key)}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-[13px] font-medium transition-colors sm:text-sm ${
                      isActive
                        ? "bg-foreground text-background"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    <span className={isActive ? "text-background" : "text-subtle"}>
                      {tab.icon}
                    </span>
                    {tab.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex flex-1 flex-col rounded-2xl border border-border bg-card p-9 shadow-sm">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">
                {active.heading}
              </span>
              <p className="mt-4 text-base leading-relaxed text-foreground/90 sm:text-[17px]">
                {active.copy}
              </p>
              <div className="mt-auto flex items-center gap-2 pt-8 text-[13px] font-medium text-muted">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                {active.bullet}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
