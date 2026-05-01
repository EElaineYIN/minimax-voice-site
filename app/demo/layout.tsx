import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Talk to the MiniMax Voice team. Tell us about your use case and we'll generate samples in your target language before the call.",
  alternates: { canonical: "/demo" },
  openGraph: {
    type: "website",
    title: "Book a demo · MiniMax Voice",
    description:
      "30-minute walkthrough of TTS, voice cloning, and voice agent APIs, with samples generated for your use case.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
