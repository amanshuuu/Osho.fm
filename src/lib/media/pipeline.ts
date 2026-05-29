import type { ArtworkSource, AudioSource, EnrichedDiscourse, Metadata } from '@/types'
import { knownYouTubeIds } from './youtube-ids'
import { buildVideoSource, fetchVideoMetadata, searchYouTube } from './youtube-service'
import { calculateConfidence, findBestMatch } from './matching-engine'
import { getCacheKey, getCached, setCached } from './cache'

interface DiscourseInput {
  id: string
  title: string
  series: string
  seriesSlug?: string
  trackNumber?: number
  duration: string
  durationSeconds: number
  category: string
  tags: string[]
  mood: string[]
  gradient: string
  audioUrl: string
  date: string
  language: 'english' | 'hindi'
  description: string
  summary: string
  highlights: { time: string; text: string }[]
  chapters: { time: string; title: string }[]
  listenCount: number
  speaker: string
}

function buildAudioSource(input: DiscourseInput): AudioSource {
  return {
    url: input.audioUrl,
    duration: input.duration,
    durationSeconds: input.durationSeconds,
    format: input.audioUrl.endsWith('.mp3') ? 'mp3' : 'unknown',
  }
}

function buildArtworkSource(videoId: string | null, gradient: string): ArtworkSource {
  if (videoId) {
    return {
      type: 'youtube',
      src: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      gradient,
    }
  }
  return { type: 'gradient', gradient }
}

function buildMetadata(input: DiscourseInput): Metadata {
  return {
    description: input.description,
    summary: input.summary,
    topics: [...new Set([...input.tags, ...input.mood])],
    tags: input.tags,
    mood: input.mood,
  }
}

export async function ingestDiscourse(
  input: DiscourseInput,
  youtubeApiKey?: string
): Promise<EnrichedDiscourse> {
  const cacheKey = getCacheKey(input.id)
  const cached = getCached<EnrichedDiscourse>(cacheKey)
  if (cached) return cached

  const known = knownYouTubeIds[input.id]
  let videoId: string | null = null

  if (known) {
    videoId = known.videoId
  } else if (youtubeApiKey) {
    try {
      const results = await searchYouTube(input.title, youtubeApiKey)
      if (results.length > 0) {
        const matchResults = results.map(v =>
          calculateConfidence(input.title, input.series, v, input.durationSeconds)
        )
        const best = findBestMatch(matchResults, 0.85)
        if (best) videoId = best.videoId
      }
    } catch {
      /* search failed, fall through */
    }
  }

  const enriched: EnrichedDiscourse = {
    id: input.id,
    title: input.title,
    series: input.series,
    trackNumber: input.trackNumber,
    audio: buildAudioSource(input),
    video: videoId ? buildVideoSource(videoId, input.title) : undefined,
    artwork: buildArtworkSource(videoId, input.gradient),
    metadata: buildMetadata(input),
    date: input.date,
    language: input.language,
    highlights: input.highlights,
    chapters: input.chapters,
    listenCount: input.listenCount,
    speaker: input.speaker,
  }

  setCached(cacheKey, enriched, 86400000)
  return enriched
}

export async function ingestAllDiscourses(
  inputs: DiscourseInput[],
  youtubeApiKey?: string
): Promise<EnrichedDiscourse[]> {
  const results: EnrichedDiscourse[] = []
  for (const input of inputs) {
    const enriched = await ingestDiscourse(input, youtubeApiKey)
    results.push(enriched)
  }
  return results
}

export async function ingestWithMetadataFetch(
  input: DiscourseInput
): Promise<EnrichedDiscourse> {
  const enriched = await ingestDiscourse(input)

  if (enriched.video) {
    const meta = await fetchVideoMetadata(enriched.video.id)
    if (meta) {
      enriched.video = { ...enriched.video, title: meta.title }
    }
  }

  return enriched
}
