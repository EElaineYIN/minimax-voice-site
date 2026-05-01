import Link from "next/link";

import { HighlightsSection } from "./components/highlights-section";
import { AudioPill } from "./components/audio-pill";

const audioSamples = [
  {
    scenario: "Natural",
    pillLabel: "Golden Voice",
    label: "Golden Voice (human-like)",
    file: "/audio/en-golden-voice-speech28.mp3",
    lang: "English",
    model: "Speech 2.8",
    script:
      "Hey, it's me. How are ya? (chuckle) I hope you're having an awesome day! We actually had a bit of a crazy launch day yesterday, but I'm just recovered and ready to roll. You're listening to this and probably thinking I'm just chatting into a microphone, but here's the twist: I'm actually not human. I am the new Speech 2.8 model from MiniMax.",
    listenFor:
      "Breaths, chuckles, throat-clears. Every disfluency you'd expect from a human.",
  },
  {
    scenario: "Bilingual",
    pillLabel: "JP × EN",
    label: "Japanese × English, mid-sentence",
    file: "/audio/jp-en-bilingual.mp3",
    lang: "JP × EN",
    model: "Speech 2.8",
    script:
      "Oh my gosh, you won't believe it, 今日は本当にすごかったの! I was running late for work, それから電車が止まっちゃって, and I'm like, 'Seriously?!' でも大丈夫, because guess what, 道で昔の友達にばったり会ったの!",
    listenFor:
      "Native prosody on both sides. Same voice through the switch, no model swap.",
  },
] as const;

const ttsModels = [
  {
    name: "Speech-2.5-HD",
    tagline: "Cinematic delivery for content that ships to humans.",
    price: "$100",
    unit: "per 1M characters",
    highlight: true,
    features: [
      "Studio-grade 32kHz audio",
      "Fine-grained emotion & style control",
      "40+ languages, native-quality prosody",
      "Compatible with PVC custom voices",
      "Long-form generation up to 30 minutes",
    ],
  },
  {
    name: "Speech-2.5-Turbo",
    tagline: "Built for high-volume, latency-sensitive workloads.",
    price: "$60",
    unit: "per 1M characters",
    highlight: false,
    features: [
      "Sub-200ms time-to-first-byte",
      "Low-latency PCM streaming",
      "40+ languages, conversational tone",
      "Compatible with IVC custom voices",
      "Optimized for voice agent loops",
    ],
  },
];

const onPremTiers = [
  { plan: "Starter", volume: "Up to 5M chars / month", price: "$2,500 / mo" },
  { plan: "Growth", volume: "Up to 25M chars / month", price: "$9,500 / mo" },
  { plan: "Scale", volume: "Up to 100M chars / month", price: "$28,000 / mo" },
  { plan: "Enterprise", volume: "Unlimited + SLA + GPU sizing", price: "Custom" },
];

const cloningTiers = [
  {
    code: "IVC",
    name: "Instant Voice Clone",
    description:
      "Upload 10 seconds of audio and start generating in under a minute. Built for prototypes, character voices, and personalized assistants.",
    points: [
      "10s reference audio",
      "Ready in <60 seconds",
      "Best on Speech-2.5-Turbo",
      "Pay-per-use, no setup fee",
    ],
  },
  {
    code: "PVC",
    name: "Professional Voice Clone",
    description:
      "We fine-tune a dedicated model on a curated studio recording. Indistinguishable from the source speaker, even on long-form narration.",
    points: [
      "30 min curated recordings",
      "Trained in 3 to 5 business days",
      "Best on Speech-2.5-HD",
      "Available cloud or on-premise",
    ],
  },
];

const supportedLanguages = [
  "English",
  "Mandarin",
  "Spanish",
  "Portuguese",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
  "Turkish",
  "Russian",
  "Polish",
  "Dutch",
  "Indonesian",
  "Vietnamese",
  "Thai",
  "Czech",
  "Swedish",
  "Danish",
  "Finnish",
  "Norwegian",
  "Greek",
  "Hebrew",
  "Romanian",
  "Hungarian",
  "Ukrainian",
  "Bulgarian",
  "Croatian",
  "Slovak",
  "Tagalog",
  "Malay",
  "Bengali",
  "Tamil",
  "Telugu",
  "Marathi",
  "Urdu",
  "Persian",
  "Swahili",
];

const agentFeatures = [
  {
    title: "Sub-200ms TTFB",
    description:
      "Time-to-first-byte under 200ms on Turbo. Fast enough for natural turn-taking inside a voice loop.",
  },
  {
    title: "PCM streaming",
    description:
      "Stream raw 24kHz PCM directly into LiveKit, Pipecat, or your custom WebRTC pipeline.",
  },
  {
    title: "Emotion & style control",
    description:
      "Per-sentence prompts for tone, pace, energy, and emphasis. No prompt engineering tricks required.",
  },
  {
    title: "Mid-sentence interruption",
    description:
      "Cut audio cleanly when the user barges in, then resume with state intact.",
  },
  {
    title: "40+ languages, mid-call",
    description:
      "Switch language inside a conversation without swapping models or reloading voices.",
  },
  {
    title: "SIP-ready",
    description:
      "Drop into Twilio, Telnyx, or any SIP trunk. Tested for telephony codecs and 8kHz fallback.",
  },
];

const comparisonRows: Array<{
  label: string;
  minimax: string;
  elevenlabs: string;
  cartesia: string;
}> = [
  {
    label: "HD model, per 1M chars",
    minimax: "$100",
    elevenlabs: "~$300",
    cartesia: "$99",
  },
  {
    label: "Turbo model, per 1M chars",
    minimax: "$60",
    elevenlabs: "~$99",
    cartesia: "$25",
  },
  {
    label: "Languages supported",
    minimax: "40+",
    elevenlabs: "70+",
    cartesia: "15+",
  },
  {
    label: "Streaming TTFB",
    minimax: "<200 ms",
    elevenlabs: "~250 ms",
    cartesia: "<90 ms",
  },
  {
    label: "Voice cloning",
    minimax: "IVC + PVC",
    elevenlabs: "IVC + PVC",
    cartesia: "IVC only",
  },
  {
    label: "On-premise deployment",
    minimax: "Available now",
    elevenlabs: "Early access, Apr 2026",
    cartesia: "Not offered",
  },
  {
    label: "Emotion / style control",
    minimax: "Native, per-sentence",
    elevenlabs: "Native",
    cartesia: "Limited",
  },
  {
    label: "Long-form audio (>10 min)",
    minimax: "Single call up to 30 min",
    elevenlabs: "Chunking required",
    cartesia: "Chunking required",
  },
];

function CategoryTag({
  color = "red",
  children,
}: {
  color?: "red" | "lavender" | "gold" | "mint";
  children: React.ReactNode;
}) {
  const dot = {
    red: "bg-accent",
    lavender: "bg-accent-lavender",
    gold: "bg-accent-gold",
    mint: "bg-accent-mint",
  }[color];
  return (
    <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}

function SectionHeading({
  category,
  title,
  children,
  align = "left",
}: {
  category: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  align?: "center" | "left";
}) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${alignment} gap-5`}>
      <CategoryTag>{category}</CategoryTag>
      <h2 className="max-w-3xl text-[40px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-[56px]">
        {title}
      </h2>
      {children ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {children}
        </p>
      ) : null}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-1 shrink-0 text-accent"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PrimaryButton({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "inline-flex items-center justify-center rounded-full bg-foreground px-7 py-3.5 text-[15px] font-medium text-background transition-colors hover:bg-foreground/85";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function GhostButton({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "inline-flex items-center justify-center rounded-full border border-border-strong bg-transparent px-7 py-3.5 text-[15px] font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-card";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function Waveform() {
  // Bar count + pseudo-random heights/delays to mimic a live audio meter.
  const bars = [
    0.45, 0.7, 0.9, 0.55, 0.35, 0.85, 1, 0.6, 0.4, 0.75, 0.95, 0.5,
    0.3, 0.65, 0.85, 1, 0.7, 0.45, 0.6, 0.9, 0.5, 0.35, 0.75, 0.55,
    0.4, 0.85, 1, 0.65, 0.5, 0.8, 0.4, 0.6,
  ];
  return (
    <div
      aria-hidden
      className="mt-16 flex h-24 w-full max-w-3xl items-center justify-center gap-[6px] sm:h-28 sm:gap-2"
    >
      {bars.map((h, i) => {
        // Smooth rose gradient across the bars — rose-600 → rose-300.
        const t = i / (bars.length - 1);
        const r = Math.round(225 + (253 - 225) * t);
        const g = Math.round(29 + (164 - 29) * t);
        const b = Math.round(72 + (175 - 72) * t);
        return (
          <span
            key={i}
            className="wave-bar block w-[5px] rounded-full sm:w-[6px]"
            style={{
              height: `${Math.round(h * 100)}%`,
              backgroundColor: `rgb(${r} ${g} ${b})`,
              animationDelay: `${(i % 8) * 0.12}s`,
              animationDuration: `${1.2 + (i % 5) * 0.14}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-6 pt-32 pb-24 text-center lg:px-10">
          <span className="mb-6 inline-flex items-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-accent">
            Meet MiniMax Speech-2.8
          </span>
          <h1 className="text-6xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-8xl md:text-[120px]">
            MiniMax <span className="text-gradient-indigo">Voice</span>
          </h1>
          <h2 className="mt-8 max-w-3xl text-lg font-medium leading-[1.35] tracking-tight text-foreground/85 sm:text-xl md:text-[24px]">
            Studio-grade text-to-speech, instant voice cloning,
            <br className="hidden sm:block" /> and sub-200ms voice agents in 40+ languages.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Cloud or on-premise, at half the cost of ElevenLabs. Available today.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <PrimaryButton href="/demo">Get a Demo</PrimaryButton>
            <GhostButton href="/#tts">View Pricing</GhostButton>
            <GhostButton href="https://www.minimax.io/audio" external>
              Read the Docs
            </GhostButton>
          </div>
          <Waveform />
          <div className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-y-4 text-sm text-muted sm:flex sm:max-w-none sm:flex-nowrap sm:items-center sm:justify-center sm:gap-x-7 sm:gap-y-0">
            <span className="flex items-center justify-center gap-2 whitespace-nowrap">
              <span className="h-1 w-1 rounded-full bg-accent" />
              40+ languages
            </span>
            <span className="hidden text-border-strong sm:inline">·</span>
            <span className="flex items-center justify-center gap-2 whitespace-nowrap">
              <span className="h-1 w-1 rounded-full bg-accent" />
              &lt;200ms streaming TTFB
            </span>
            <span className="hidden text-border-strong sm:inline">·</span>
            <span className="flex items-center justify-center gap-2 whitespace-nowrap">
              <span className="h-1 w-1 rounded-full bg-accent" />
              From $60 / 1M chars
            </span>
            <span className="hidden text-border-strong sm:inline">·</span>
            <span className="flex items-center justify-center gap-2 whitespace-nowrap">
              <span className="h-1 w-1 rounded-full bg-accent" />
              On-prem available today
            </span>
          </div>
        </div>
      </section>

      {/* WHY — Highlights + Tabs */}
      <HighlightsSection />

      {/* LISTEN */}
      <section id="listen" className="relative px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-12">
          <SectionHeading
            category="Listen"
            title={
              <>
                Hear what production
                <br className="hidden sm:block" /> voice sounds like.
              </>
            }
          >
            Two unedited first-take samples from Speech 2.8. No mastering, no
            EQ, no post-processing. What you hear is what the API returns.
          </SectionHeading>
          <div className="grid auto-rows-fr gap-6 lg:grid-cols-2">
            {audioSamples.map((sample, idx) => (
              <article
                key={sample.file}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:p-12"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent/[0.04] blur-2xl"
                />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
                      {sample.scenario}
                    </span>
                  </div>
                  <div
                    aria-hidden
                    className="flex items-end gap-[3px]"
                  >
                    {[0.35, 0.7, 1, 0.5, 0.85, 0.4, 0.65, 0.3].map((h, i) => (
                      <span
                        key={i}
                        className="wave-bar block w-[2px] rounded-full bg-accent/40 transition-colors group-hover:bg-accent/70"
                        style={{
                          height: `${Math.round(h * 22)}px`,
                          animationDelay: `${(idx * 0.18 + i * 0.09).toFixed(2)}s`,
                          animationDuration: `${1.4 + (i % 4) * 0.18}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="relative mt-7 text-[26px] font-semibold leading-tight tracking-tight text-foreground sm:text-[28px]">
                  {sample.label}
                </h3>
                <span className="relative mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
                  {sample.lang} · {sample.model}
                </span>

                <blockquote className="relative mt-7 border-l-2 border-accent/30 pl-5 text-[15.5px] italic leading-[1.7] text-muted">
                  {sample.script}
                </blockquote>

                <audio
                  controls
                  src={sample.file}
                  preload="none"
                  className="relative mt-8 w-full"
                />

                <div className="relative mt-auto border-t border-border pt-6 sm:pt-7">
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-subtle">
                    Listen for
                  </span>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-foreground/85">
                    {sample.listenFor}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="text-sm text-subtle">
            Need a specific language or persona?{" "}
            <Link
              href="/demo"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Mention it on the demo form
            </Link>{" "}
            and we&apos;ll generate one before the call.
          </p>
        </div>
      </section>

      {/* TTS API */}
      <section id="tts" className="relative px-6 py-24 lg:px-10 lg:py-32">
        <div className="band-soft pointer-events-none absolute inset-0" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-12">
          <SectionHeading
            category="TTS API"
            title={
              <>
                Two models. One API.
                <br className="hidden sm:block" /> Real pricing.
              </>
            }
          >
            Pick HD for content that ships to humans, Turbo for high-volume
            conversational workloads. Same SDK, same voices, same auth.
          </SectionHeading>
          <div className="grid gap-5 md:grid-cols-2">
            {ttsModels.map((model) => (
              <div
                key={model.name}
                className={`relative flex flex-col rounded-2xl border bg-card p-9 shadow-sm transition-shadow hover:shadow-md ${
                  model.highlight ? "border-accent/40" : "border-border"
                }`}
              >
                {model.highlight ? (
                  <span className="absolute -top-3 left-9 rounded-full border border-accent/40 bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                    Most Expressive
                  </span>
                ) : null}
                <h3 className="text-[12px] font-medium uppercase tracking-[0.14em] text-subtle">
                  {model.name}
                </h3>
                <p className="mt-3 text-xl font-medium leading-snug text-foreground">
                  {model.tagline}
                </p>
                <div className="mt-8 flex items-baseline gap-2">
                  <span className="text-5xl font-semibold tracking-tight text-foreground">
                    {model.price}
                  </span>
                  <span className="text-sm text-muted">{model.unit}</span>
                </div>
                <ul className="mt-9 space-y-3.5 text-sm">
                  {model.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckIcon />
                      <span className="text-foreground/85">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-9 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <CategoryTag>On-Premise</CategoryTag>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                  Run Speech-2.5 in your own VPC.
                </h3>
                <p className="mt-2 max-w-2xl text-sm text-muted">
                  Air-gapped deployments, GPU-aware scaling, full audit
                  controls. Available today, not a 2026 roadmap promise.
                </p>
              </div>
              <GhostButton href="/demo">Talk to sales</GhostButton>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-background-soft text-[11px] uppercase tracking-[0.12em] text-subtle">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Plan</th>
                    <th className="px-6 py-4 font-semibold">Monthly volume</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {onPremTiers.map((tier) => (
                    <tr key={tier.plan} className="text-foreground/90">
                      <td className="px-6 py-4 font-medium">{tier.plan}</td>
                      <td className="px-6 py-4 text-muted">{tier.volume}</td>
                      <td className="px-6 py-4 font-mono">{tier.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* VOICE CLONING */}
      <section id="voice-cloning" className="relative px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-12">
          <SectionHeading
            category="Voice Cloning"
            title={
              <>
                Clone any voice in seconds,
                <br className="hidden sm:block" /> or studio-grade in days.
              </>
            }
          >
            Two cloning paths so you can match the quality bar to the use case.
            Both work across all 40+ supported languages.
          </SectionHeading>
          <div className="grid gap-5 md:grid-cols-2">
            {cloningTiers.map((tier) => (
              <div
                key={tier.code}
                className="rounded-2xl border border-border bg-card p-9 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-accent-lavender/15 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-lavender">
                    {tier.code}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                    {tier.name}
                  </h3>
                </div>
                <p className="mt-5 text-base leading-relaxed text-muted">
                  {tier.description}
                </p>
                <ul className="mt-7 space-y-3 text-sm text-foreground/85">
                  {tier.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <CheckIcon />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-card p-9 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <CategoryTag>Languages</CategoryTag>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                  Cloned voices speak every language we support.
                </h3>
              </div>
              <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-subtle">
                40+ supported
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {supportedLanguages.map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-border bg-background-soft px-3.5 py-1.5 text-xs text-foreground/85"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VOICE AGENT */}
      <section id="voice-agent" className="relative px-6 py-24 lg:px-10 lg:py-32">
        <div className="band-soft pointer-events-none absolute inset-0" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-12">
          <SectionHeading
            category="Voice Agent"
            title={
              <>
                Built for sub-200ms
                <br className="hidden sm:block" /> voice loops.
              </>
            }
          >
            Drop into LiveKit, Pipecat, Twilio, or your own stack. The same TTS
            that powers our cloud API, tuned for real-time conversation.
          </SectionHeading>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {agentFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-card p-8 transition-colors hover:bg-card-hover"
              >
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section id="compare" className="relative px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-12">
          <SectionHeading
            category="Compare"
            title={
              <>
                MiniMax vs ElevenLabs
                <br className="hidden sm:block" /> vs Cartesia.
              </>
            }
          >
            Where each platform actually wins. Numbers reflect public pricing
            and documented capabilities at the time of writing.
          </SectionHeading>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-background-soft text-[11px] uppercase tracking-[0.12em] text-subtle">
                  <tr>
                    <th className="px-6 py-5 font-semibold">Capability</th>
                    <th className="px-6 py-5 font-semibold text-foreground">
                      MiniMax Voice
                    </th>
                    <th className="px-6 py-5 font-semibold">ElevenLabs</th>
                    <th className="px-6 py-5 font-semibold">Cartesia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {comparisonRows.map((row) => (
                    <tr key={row.label}>
                      <td className="px-6 py-5 font-medium text-foreground/90">
                        {row.label}
                      </td>
                      <td className="px-6 py-5">
                        <span className="rounded-md bg-accent-soft px-2.5 py-1 font-mono text-xs font-semibold text-accent">
                          {row.minimax}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-muted">{row.elevenlabs}</td>
                      <td className="px-6 py-5 text-muted">{row.cartesia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-subtle">
            Sources: vendor pricing pages and product changelogs as of April
            2026. ElevenLabs on-premise is in early access announced for April
            2026 and not yet production-proven.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-28 lg:px-10 lg:py-36">
        <div className="cta-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <CategoryTag>Ready when you are</CategoryTag>
          <h2 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Ship voice <span className="text-gradient-indigo italic">this quarter.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Book a 30-minute walkthrough with our solutions team. We&apos;ll
            generate samples in your target language and scope a deployment that
            fits your constraints, whether cloud, hybrid, or fully on-premise.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <PrimaryButton href="/demo">Book a Demo</PrimaryButton>
            <GhostButton href="https://www.minimax.io/audio" external>
              Read the docs
            </GhostButton>
          </div>
        </div>
      </section>
    </>
  );
}
