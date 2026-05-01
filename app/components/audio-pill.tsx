"use client";

import { useRef, useState } from "react";

type Variant = "primary" | "dark" | "lavender";

const PALETTES: Record<
  Variant,
  { bg: string; text: string; iconColor: string }
> = {
  primary: {
    bg: "bg-accent",
    text: "text-white",
    iconColor: "text-accent",
  },
  dark: {
    bg: "bg-foreground",
    text: "text-background",
    iconColor: "text-foreground",
  },
  lavender: {
    bg: "bg-[#a78bfa]",
    text: "text-white",
    iconColor: "text-[#6d28d9]",
  },
};

export function AudioPill({
  src,
  label,
  sublabel,
  variant = "primary",
}: {
  src: string;
  label: string;
  sublabel?: string;
  variant?: Variant;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      document.querySelectorAll("audio").forEach((el) => {
        if (el !== audio) el.pause();
      });
      audio.play().catch(() => {});
    }
  };

  const palette = PALETTES[variant];

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? `Pause ${label}` : `Play ${label}`}
      className={`group inline-flex items-center justify-between gap-5 rounded-full ${palette.bg} ${palette.text} px-6 py-4 text-left shadow-[0_12px_32px_-10px_rgba(24,24,24,0.32)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_18px_40px_-10px_rgba(24,24,24,0.4)] active:scale-[0.98]`}
    >
      <span className="block min-w-0">
        <span className="block text-[15px] font-semibold leading-tight">
          {label}
        </span>
        {sublabel ? (
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] opacity-75">
            {sublabel}
          </span>
        ) : null}
      </span>
      <span
        aria-hidden
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_4px_12px_-2px_rgba(24,24,24,0.18)]"
      >
        {playing ? (
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={palette.iconColor}
          >
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`${palette.iconColor} ml-0.5`}
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </span>
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </button>
  );
}
