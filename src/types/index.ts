export interface Discourse {
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
  thumbnail: string
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

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  color: string
  count: number
  description: string
}

export interface Playlist {
  id: string
  title: string
  description: string
  thumbnail: string
  gradient: string
  count: number
  duration: string
  category: string
}

export interface AudioSource {
  url: string
  duration: string
  durationSeconds: number
  format: string
}

export interface VideoSource {
  id: string
  title: string
  url: string
  embedUrl: string
  thumbnail: {
    default: string
    medium: string
    high: string
    maxres: string
  }
  channelTitle: string
  publishedAt: string
}

export interface ArtworkSource {
  type: 'youtube' | 'gradient' | 'portrait' | 'typography'
  src?: string
  gradient?: string
}

export interface Metadata {
  description: string
  summary: string
  topics: string[]
  tags: string[]
  mood: string[]
}

export interface EnrichedDiscourse {
  id: string
  title: string
  series: string
  trackNumber?: number
  audio: AudioSource
  video?: VideoSource
  artwork: ArtworkSource
  metadata: Metadata
  date: string
  language: 'english' | 'hindi'
  highlights: { time: string; text: string }[]
  chapters: { time: string; title: string }[]
  listenCount: number
  speaker: string
}

export interface MatchResult {
  videoId: string
  title: string
  confidence: number
  reason: string
}

export interface YouTubeSearchResult {
  videoId: string
  title: string
  channelTitle: string
  publishedAt: string
  durationSeconds?: number
  thumbnailUrl: string
}
