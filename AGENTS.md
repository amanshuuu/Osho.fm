# Osho Catalogue — Architecture Overview

## Visual Identity System
- **Artwork component** (`src/components/ui/artwork.tsx`) = single source of truth for ALL visuals
- **GradientCover** (`src/components/ui/gradient-cover.tsx`) = fallback when no real thumbnail exists
- Fallback hierarchy: YouTube thumbnail → gradient cover → Osho portrait
- No two items share the same gradient — every discourse/playlist has a unique pair
- 12 category-specific visual identities
- 6 playlist-specific visual styles

## Brand Rules
- Website name: **Osho.fm** (used in sidebar logo, header, footer)
- Brand text: "Inspired by Osho teachings. Not affiliated with Osho International Foundation."
- All brand text: "Osho" (sentence case), never "OSHO" (ALL CAPS)
- Osho portrait used only in hero and profile (~20% of surface area)
- No stock nature photos ever — gradients + YouTube thumbnails only

## Media Pipeline (`src/lib/media/`)
| File | Purpose |
|------|---------|
| `types.ts` | `EnrichedDiscourse`, `VideoSource`, `AudioSource`, `ArtworkSource`, etc. |
| `youtube-ids.ts` | Static discourse→YouTubeID map (updated via web search, no API key needed) |
| `youtube-service.ts` | CDN thumbnail builder, oEmbed fetch, YouTube Data API search |
| `matching-engine.ts` | Title/duration similarity scoring, confidence-based auto-matching |
| `pipeline.ts` | `ingestDiscourse()` → orchestrates all sources, caches result |
| `cache.ts` | localStorage-based cache layer with TTL |
| `index.ts` | Barrel exports |

## YouTube Integration
- Thumbnail CDN (no API key needed): `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`
- Set `thumbnail` field in `data.ts` to CDN URL → Artwork component renders it
- `/api/media/ingest?id=X&apiKey=...` triggers pipeline on-demand
- Known video IDs in `youtube-ids.ts` — currently 12 of 15 discourses mapped

## Data Flow
1. `data.ts` has `Discourse[]` with empty `thumbnail` for most items
2. `Artwork` component reads `thumbnail` → renders YouTube image if present, gradient cover otherwise
3. Media pipeline can produce `EnrichedDiscourse` with separate `audio`, `video`, `artwork`, `metadata` namespaces
4. Pipeline caches results in localStorage with 24h TTL

## Cleanup Status
- All stock nature photos deleted from `public/images/`
- Extra Osho portrait copies (2, 3) deleted
- Only `osho-portrait.jpg` remains (used in hero + profile + daily quote)

## YouTube IDs Mapped (12/15)
| Discourse | Video ID |
|-----------|----------|
| A Bird on the Wing 01 | `y47LgoRtQmY` |
| A Bird on the Wing 02 | `s-o-1s5K2xA` |
| A Bird on the Wing 03 | `rEZ7FKpfG8Q` |
| A Bird on the Wing 04 | `7IZulhCis1k` |
| A Bird on the Wing 05 | `nIHByJxzQpc` |
| A Bird on the Wing 06 | `uEHuZjykLy0` |
| A Bird on the Wing 07 | `iahwRhFyaIc` |
| A Bird on the Wing 08 | `NxVPSJTEtwg` |
| A Bird on the Wing 09 | `M8EfTk8Ep88` |
| A Bird on the Wing 10 | `fXeKNPq12Bw` |
| Let Go of the Struggle | `HY9aw5cQRDQ` |
| Women: The Mysterious Door | `MM3VopzjC1k` |
| You Are the Light | `bzxcT4PNysk` |

**Still unmapped (2):** साक्षी रहो (Hindi, ID 13), प्रेम ही परम धर्म (Hindi, ID 14) — not found on YouTube or any public repository after exhaustive search (15+ sources)

## Build
- Next.js 16
- Build command: `npm run build`
- Exit code 4294967295 on Windows is a known environment bug (not code issue)
- Dev server: `npm run dev`
