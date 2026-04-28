# MiniMax Voice — SEO landing site

Independent SEO landing page targeting TTS / voice cloning / voice agent search traffic. Drives leads through a form → Calendly demo flow.

- **Domain:** minimax-voice.com
- **Calendly:** https://calendly.com/minimax-global/30min
- **Lead store:** Feishu Bitable (`IocFbYtana4UVfsqWgAc86iVnqR` / `tbl6pOHHYLRe0ImK`)

## Stack

| Item   | Value |
| ------ | ----- |
| Framework | Next.js 16 (App Router) |
| Styling   | Tailwind CSS v4 (`@import "tailwindcss"` + `@theme inline` — no `tailwind.config.js`) |
| Hosting   | Vercel (auto-deploy from GitHub) |
| Backend   | Single API route at `/api/submit-lead` writing to Feishu Bitable |
| Node      | 18+ (project tested on Node 25) |

## Local development

```bash
cd minimax-voice-site
npm install
cp .env.local.example .env.local   # then fill in real values
npm run dev
# http://localhost:3000
```

## Project structure

```
app/
├── layout.tsx              # root layout: sticky nav + footer + metadata
├── page.tsx                # homepage (single page, anchor nav)
├── globals.css             # dark theme tokens via Tailwind v4 @theme
├── sitemap.ts              # generates /sitemap.xml
├── robots.ts               # generates /robots.txt
├── demo/
│   ├── layout.tsx          # SEO metadata for /demo
│   └── page.tsx            # form → POST /api/submit-lead → Calendly
└── api/
    └── submit-lead/
        └── route.ts        # writes a record to the Feishu Bitable
public/
└── audio/                  # drop sample mp3s here (en-golden-voice.mp3, …)
.env.local                  # FEISHU_APP_ID, FEISHU_APP_SECRET (gitignored)
```

## Environment variables

`.env.local` requires:

```
FEISHU_APP_ID=…
FEISHU_APP_SECRET=…
```

Get these from https://open.feishu.cn/app → your app → Credentials & Basic Info.
The app needs the `bitable:record:create` permission scope.

If the env vars are missing, `/api/submit-lead` logs the lead to the server but
returns `{ ok: true, persisted: false }` so the user is never blocked from
booking.

### Bitable column names

The route writes to these columns. Make sure your Feishu Bitable has matching
column names (or update them in `app/api/submit-lead/route.ts`):

- `Name`, `Email`, `Company`, `Use Case`, `Volume`, `Message`
- `Source` (auto: `minimax-voice.com`)
- `Submitted At` (auto: ISO timestamp)

## Adding audio samples

1. Drop the mp3 into `public/audio/`.
2. Add an entry to the `audioSamples` array at the top of `app/page.tsx`:

```ts
const audioSamples = [
  { label: "English — Golden Voice (HD)", file: "/audio/en-golden-voice.mp3", lang: "English", accent: "Studio narration" },
  { label: "Spanish — Golden Voice (HD)", file: "/audio/es-golden-voice.mp3", lang: "Spanish", accent: "Latin American" },
  // add new ones here:
  { label: "Mandarin — Female (HD)", file: "/audio/zh-female-hd.mp3", lang: "Mandarin", accent: "Standard" },
];
```

If you exceed 4 samples, switch the wrapping grid in `app/page.tsx` from
`sm:grid-cols-2` to `sm:grid-cols-2 lg:grid-cols-3`.

## Design tokens

Defined in `app/globals.css` via `@theme inline`:

| Token | Value |
| ----- | ----- |
| `--color-background` | `#0a0a0f` |
| `--color-foreground` | `#ededed` |
| `--color-muted`      | `#a1a1aa` |
| `--color-card`       | `#111118` |
| `--color-border`     | `#27272a` |
| `--color-accent`     | `#6366f1` (indigo-500) |

Fonts: `Geist Sans` (body) + `Geist Mono` (kickers, code).

## Deploy

1. `git init && git add . && git commit -m "init"`
2. Push to GitHub.
3. Import the repo into Vercel.
4. Set `FEISHU_APP_ID` and `FEISHU_APP_SECRET` in Vercel project settings.
5. Bind `minimax-voice.com` once it's registered.

## Notes

- This is **not** a static export — `/api/submit-lead` is a runtime route.
- MiniMax TTS supports **40+ languages**, not 17 — keep marketing copy aligned.
- ElevenLabs on-premise is in early access from April 2026, so the comparison
  table can lean on "available today" as a real differentiator.
- Tailwind v4 syntax is different from v3 — there is no `tailwind.config.js`.
  Edit tokens in `app/globals.css` under `@theme inline`.
