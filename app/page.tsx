import Link from "next/link";

const audioSamples = [
  {
    label: "English — Golden Voice",
    file: "/audio/en-golden-voice.mp3",
    lang: "English",
    accent: "Studio narration",
  },
  {
    label: "Spanish — Golden Voice",
    file: "/audio/es-golden-voice.mp3",
    lang: "Spanish",
    accent: "Latin American",
  },
];

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
      "Trained in 3–5 business days",
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
      "Time-to-first-byte under 200ms on Turbo — fast enough for natural turn-taking inside a voice loop.",
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
    label: "HD model — per 1M chars",
    minimax: "$100",
    elevenlabs: "~$300",
    cartesia: "$99",
  },
  {
    label: "Turbo model — per 1M chars",
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
    elevenlabs: "Early access — Apr 2026",
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
  color = "indigo",
  children,
}: {
  color?: "indigo" | "lavender" | "gold";
  children: React.ReactNode;
}) {
  const dot = {
    indigo: "bg-accent",
    lavender: "bg-[#cac9ff]",
    gold: "bg-[#ffd388]",
  }[color];
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
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
      <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-[44px]">
        {title}
      </h2>
      {children ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted">
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
    "group inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-strong";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
        <ArrowRight />
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
      <ArrowRight />
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
    "inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-card";
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

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent_75%)]" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-6 pt-32 pb-24 text-center lg:px-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
              Speech-2.5 · Now in 40+ languages
            </span>
          </span>
          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-[80px]">
            Voice AI that
            <br className="hidden sm:block" />{" "}
            sounds <span className="text-gradient-indigo italic">human</span>.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Studio-grade text-to-speech, instant voice cloning, and sub-200ms
            voice agent APIs across 40+ languages. Cloud or on-premise — at
            half the cost of ElevenLabs.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <PrimaryButton href="/demo">Get a Demo</PrimaryButton>
            <GhostButton href="https://www.minimax.io/audio" external>
              Read the docs
            </GhostButton>
          </div>
          <div className="mt-20 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-xs text-subtle">
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              40+ languages
            </span>
            <span className="text-border">/</span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              &lt;200ms streaming TTFB
            </span>
            <span className="text-border">/</span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              From $60 / 1M chars
            </span>
            <span className="text-border">/</span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              On-prem available today
            </span>
          </div>
        </div>
      </section>

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
            Unedited samples generated by Speech-2.5-HD. No mastering, no EQ,
            no post-processing.
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            {audioSamples.map((sample) => (
              <div
                key={sample.file}
                className="group rounded-2xl border border-border bg-card p-7 transition-colors hover:border-border-strong hover:bg-card-hover"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
                      {sample.lang}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight">
                      {sample.label}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{sample.accent}</p>
                  </div>
                  <span className="rounded-md border border-accent/30 bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-strong">
                    HD
                  </span>
                </div>
                <audio
                  controls
                  src={sample.file}
                  preload="none"
                  className="mt-6 w-full"
                />
              </div>
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
          <div className="grid gap-4 md:grid-cols-2">
            {ttsModels.map((model) => (
              <div
                key={model.name}
                className={`relative flex flex-col rounded-2xl border p-9 transition-colors ${
                  model.highlight
                    ? "border-accent/50 bg-card shadow-[0_0_0_1px_rgba(99,102,241,0.15)_inset]"
                    : "border-border bg-card hover:border-border-strong"
                }`}
              >
                {model.highlight ? (
                  <span className="absolute -top-3 left-9 rounded-full border border-accent/40 bg-background px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-strong">
                    Most Expressive
                  </span>
                ) : null}
                <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
                  {model.name}
                </h3>
                <p className="mt-3 text-lg font-medium leading-snug text-foreground">
                  {model.tagline}
                </p>
                <div className="mt-8 flex items-baseline gap-2">
                  <span className="text-5xl font-semibold tracking-tight">
                    {model.price}
                  </span>
                  <span className="text-sm text-muted">{model.unit}</span>
                </div>
                <ul className="mt-8 space-y-3 text-sm">
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

          <div className="rounded-2xl border border-border bg-card p-9">
            <div className="flex flex-col gap-4 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <CategoryTag>On-Premise</CategoryTag>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[28px]">
                  Run Speech-2.5 in your own VPC.
                </h3>
                <p className="mt-2 max-w-2xl text-sm text-muted">
                  Air-gapped deployments, GPU-aware scaling, full audit
                  controls. Available today — not a 2026 roadmap promise.
                </p>
              </div>
              <GhostButton href="/demo">Talk to sales</GhostButton>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-card-hover font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
                  <tr>
                    <th className="px-6 py-4 font-medium">Plan</th>
                    <th className="px-6 py-4 font-medium">Monthly volume</th>
                    <th className="px-6 py-4 font-medium">Price</th>
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
                Clone any voice — in seconds,
                <br className="hidden sm:block" /> or studio-grade in days.
              </>
            }
          >
            Two cloning paths so you can match the quality bar to the use case.
            Both work across all 40+ supported languages.
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-2">
            {cloningTiers.map((tier) => (
              <div
                key={tier.code}
                className="rounded-2xl border border-border bg-card p-9 transition-colors hover:border-border-strong"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-md border border-[#cac9ff]/30 bg-[#cac9ff]/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#cac9ff]">
                    {tier.code}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight">
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
          <div className="rounded-2xl border border-border bg-card p-9">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <CategoryTag>Languages</CategoryTag>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[28px]">
                  Cloned voices speak every language we support.
                </h3>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
                40+ supported
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {supportedLanguages.map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-border bg-card-hover px-3.5 py-1.5 text-xs text-foreground/80"
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
                className="bg-background p-8 transition-colors hover:bg-card"
              >
                <h3 className="text-base font-semibold tracking-tight">
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
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-card-hover font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
                  <tr>
                    <th className="px-6 py-5 font-medium">Capability</th>
                    <th className="px-6 py-5 font-medium text-foreground">
                      MiniMax Voice
                    </th>
                    <th className="px-6 py-5 font-medium">ElevenLabs</th>
                    <th className="px-6 py-5 font-medium">Cartesia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {comparisonRows.map((row) => (
                    <tr key={row.label}>
                      <td className="px-6 py-5 font-medium text-foreground/90">
                        {row.label}
                      </td>
                      <td className="px-6 py-5">
                        <span className="rounded-md bg-accent-soft px-2.5 py-1 font-mono text-xs text-accent-strong">
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
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Ship voice <span className="text-gradient-indigo italic">this quarter.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Book a 30-minute walkthrough with our solutions team. We&apos;ll
            generate samples in your target language and scope a deployment that
            fits your constraints — cloud, hybrid, or fully on-premise.
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
