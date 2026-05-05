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

const SITE_URL = "https://minimax-speech.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MiniMax Voice: TTS, Voice Cloning & Voice Agent API",
    template: "%s · MiniMax Voice",
  },
  description:
    "Production-grade text-to-speech, instant voice cloning, and sub-200ms voice agent infrastructure across 40+ languages. The MiniMax Voice platform, built to ship.",
  keywords: [
    "MiniMax",
    "MiniMax Voice",
    "text to speech API",
    "TTS API",
    "voice cloning",
    "voice agent",
    "ElevenLabs alternative",
    "Cartesia alternative",
    "Speech-2.8",
    "multilingual TTS",
    "on-premise TTS",
  ],
  authors: [{ name: "MiniMax" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "MiniMax Voice",
    title: "MiniMax Voice: TTS, Voice Cloning & Voice Agent API",
    description:
      "Studio-grade TTS, instant voice cloning, and real-time voice agent APIs in 40+ languages, at half the cost of ElevenLabs, with on-premise available today.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiniMax Voice: TTS, Voice Cloning & Voice Agent API",
    description:
      "Production voice AI in 40+ languages. TTS from $60/M chars. Cloud or on-premise.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const navMenus: Array<{
  label: string;
  items: Array<{ href: string; label: string; description: string; external?: boolean }>;
}> = [
  {
    label: "Voice Products",
    items: [
      {
        href: "/#tts",
        label: "TTS API",
        description: "HD + Turbo, public pricing.",
      },
      {
        href: "/#voice-cloning",
        label: "Voice Cloning",
        description: "IVC + PVC across 40+ languages.",
      },
      {
        href: "/#voice-agent",
        label: "Voice Agent",
        description: "Sub-200ms TTFB, LiveKit-ready.",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        href: "/#listen",
        label: "Listen",
        description: "Unedited HD samples.",
      },
      {
        href: "/#compare",
        label: "Compare",
        description: "vs ElevenLabs & Cartesia.",
      },
      {
        href: "https://www.minimax.io/audio",
        label: "API Docs",
        description: "Reference, SDKs, quickstarts.",
        external: true,
      },
    ],
  },
];

function NavMenu({ menu }: { menu: (typeof navMenus)[number] }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 text-[15px] font-medium text-foreground/80 transition-colors hover:text-foreground"
      >
        {menu.label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted transition-transform group-hover:rotate-180"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <div className="min-w-[280px] rounded-2xl border border-border bg-card p-2 shadow-[0_12px_40px_-12px_rgba(24,24,24,0.18)]">
          {menu.items.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-0.5 rounded-xl p-3 transition-colors hover:bg-background-soft"
              >
                <span className="text-[14px] font-semibold text-foreground">
                  {item.label}
                </span>
                <span className="text-[13px] text-muted">{item.description}</span>
              </a>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="flex flex-col gap-0.5 rounded-xl p-3 transition-colors hover:bg-background-soft"
              >
                <span className="text-[14px] font-semibold text-foreground">
                  {item.label}
                </span>
                <span className="text-[13px] text-muted">{item.description}</span>
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center"
          aria-label="MiniMax Voice home"
        >
          <Image
            src="/minimax-logo-light.png"
            alt="MiniMax"
            width={140}
            height={32}
            priority
            className="h-7 w-auto select-none"
            style={{ height: 28, width: "auto" }}
          />
        </Link>
        <div className="flex items-center gap-9">
          <div className="hidden items-center gap-9 md:flex">
            {navMenus.map((menu) => (
              <NavMenu key={menu.label} menu={menu} />
            ))}
          </div>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-[14px] font-medium text-background transition-colors hover:bg-foreground/85"
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background-soft">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Image
              src="/minimax-logo-light.png"
              alt="MiniMax"
              width={120}
              height={28}
              className="h-6 w-auto select-none"
              style={{ height: 24, width: "auto" }}
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Text-to-speech, voice cloning, and real-time voice agents across
              40+ languages. Built to ship.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-foreground">
              Voice Products
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
            <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-foreground">
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
          <span className="font-mono">minimax-speech.com</span>
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
