import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://minimax-voice.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MiniMax Voice — TTS, Voice Cloning & Voice Agent API",
    template: "%s · MiniMax Voice",
  },
  description:
    "Production-grade text-to-speech, instant voice cloning, and sub-200ms voice agent infrastructure across 40+ languages. The MiniMax Voice platform — built to ship.",
  keywords: [
    "MiniMax",
    "MiniMax Voice",
    "text to speech API",
    "TTS API",
    "voice cloning",
    "voice agent",
    "ElevenLabs alternative",
    "Cartesia alternative",
    "Speech-2.5",
    "multilingual TTS",
    "on-premise TTS",
  ],
  authors: [{ name: "MiniMax" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "MiniMax Voice",
    title: "MiniMax Voice — TTS, Voice Cloning & Voice Agent API",
    description:
      "Studio-grade TTS, instant voice cloning, and real-time voice agent APIs in 40+ languages — at half the cost of ElevenLabs, with on-premise available today.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiniMax Voice — TTS, Voice Cloning & Voice Agent API",
    description:
      "Production voice AI in 40+ languages. TTS from $60/M chars. Cloud or on-premise.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const navLinks = [
  { href: "/#listen", label: "Listen" },
  { href: "/#tts", label: "TTS" },
  { href: "/#voice-cloning", label: "Cloning" },
  { href: "/#voice-agent", label: "Agent" },
  { href: "/#compare", label: "Compare" },
];

function Wordmark({ size = "header" }: { size?: "header" | "footer" }) {
  const dims =
    size === "header"
      ? { width: 105, height: 24 }
      : { width: 90, height: 21 };
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/minimax-logo.png"
        alt="MiniMax"
        width={dims.width}
        height={dims.height}
        priority={size === "header"}
        className="h-auto w-auto select-none"
        style={{ height: dims.height, width: "auto" }}
      />
      <span className="hidden h-4 w-px bg-border sm:inline-block" />
      <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-muted sm:inline-block">
        Voice
      </span>
    </span>
  );
}

function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <nav className="mt-4 flex h-14 items-center justify-between rounded-full border border-border/80 bg-background/70 px-5 backdrop-blur-xl backdrop-saturate-150">
          <Link
            href="/"
            className="flex items-center text-sm font-medium tracking-tight text-foreground"
          >
            <Wordmark size="header" />
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.minimax.io/audio"
              target="_blank"
              rel="noreferrer"
              className="hidden text-[13px] text-muted transition-colors hover:text-foreground sm:inline-block"
            >
              Docs
            </a>
            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-accent-strong"
            >
              Get a Demo
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Wordmark size="footer" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Production voice AI for product teams. Text-to-speech, voice
              cloning, and real-time voice agents in 40+ languages.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
              Product
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <a className="hover:text-foreground" href="/#tts">
                  TTS API
                </a>
              </li>
              <li>
                <a className="hover:text-foreground" href="/#voice-cloning">
                  Voice Cloning
                </a>
              </li>
              <li>
                <a className="hover:text-foreground" href="/#voice-agent">
                  Voice Agent
                </a>
              </li>
              <li>
                <a className="hover:text-foreground" href="/#compare">
                  Compare
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <a
                  className="hover:text-foreground"
                  href="https://www.minimax.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  MiniMax
                </a>
              </li>
              <li>
                <a
                  className="hover:text-foreground"
                  href="https://www.minimax.io/audio"
                  target="_blank"
                  rel="noreferrer"
                >
                  API Docs
                </a>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/demo">
                  Book a Demo
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 text-xs text-subtle md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} MiniMax. All rights reserved.</span>
          <span className="font-mono">minimax-voice.com</span>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
