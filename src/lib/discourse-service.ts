import { supabase } from './supabase'
import { discourses as mockDiscourses, categories as mockCategories, playlists as mockPlaylists } from './data'
import type { Discourse, Category, Playlist } from '@/types'
import { getSeriesAudioUrls } from './audio-service'

interface DiscourseRow {
  id: string
  title: string
  series: string
  series_slug: string
  track_number: number
  duration: string
  duration_seconds: number
  category: string
  tags: string[]
  mood: string[]
  thumbnail: string
  audio_url: string
  date: string
  language: string
  description: string
  summary: string
  listen_count: number
  speaker: string
}

function rowToDiscourse(row: DiscourseRow): Discourse {
  return {
    id: row.id,
    title: row.title,
    series: row.series,
    duration: row.duration,
    durationSeconds: row.duration_seconds,
    category: row.category,
    tags: row.tags ?? [],
    mood: row.mood ?? [],
    thumbnail: row.thumbnail,
    gradient: 'from-[#E8E0D4] to-[#F5F0EB]',
    audioUrl: row.audio_url,
    date: row.date,
    language: (row.language as 'english' | 'hindi') ?? 'english',
    description: row.description,
    summary: row.summary,
    highlights: [],
    chapters: [],
    listenCount: row.listen_count,
    speaker: row.speaker ?? 'Osho',
  }
}

export async function getAllDiscourses(): Promise<Discourse[]> {
  if (!supabase) return mockDiscourses

  const { data, error } = await supabase.from('discourses').select('*').order('created_at', { ascending: false })

  if (error || !data) return mockDiscourses

  return (data as DiscourseRow[]).map(rowToDiscourse)
}

export async function getDiscourseById(id: string): Promise<Discourse | null> {
  if (!supabase) return mockDiscourses.find((d) => d.id === id) ?? null

  const { data, error } = await supabase.from('discourses').select('*').eq('id', id).single()

  if (error || !data) {
    const mock = mockDiscourses.find((d) => d.id === id)
    return mock ?? null
  }

  const discourse = rowToDiscourse(data as DiscourseRow)

  return discourse
}

export async function getDiscoursesByCategory(category: string): Promise<Discourse[]> {
  if (!supabase) return mockDiscourses.filter((d) => d.category.toLowerCase() === category.toLowerCase())

  const { data, error } = await supabase.from('discourses').select('*').eq('category', category)

  if (error || !data) return mockDiscourses.filter((d) => d.category.toLowerCase() === category.toLowerCase())

  return (data as DiscourseRow[]).map(rowToDiscourse)
}

export async function getDiscoursesByLanguage(language: 'english' | 'hindi'): Promise<Discourse[]> {
  if (!supabase) return mockDiscourses.filter((d) => d.language === language)

  const { data, error } = await supabase.from('discourses').select('*').eq('language', language)

  if (error || !data) return mockDiscourses.filter((d) => d.language === language)

  return (data as DiscourseRow[]).map(rowToDiscourse)
}

export async function searchDiscourses(query: string): Promise<Discourse[]> {
  const all = await getAllDiscourses()
  const q = query.toLowerCase()
  return all.filter(
    (d) =>
      d.title.toLowerCase().includes(q) ||
      d.series.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q)),
  )
}

export async function getFeaturedDiscourses(): Promise<Discourse[]> {
  const all = await getAllDiscourses()
  return all.slice(0, 6)
}

export async function getTrendingDiscourses(): Promise<Discourse[]> {
  const all = await getAllDiscourses()
  return [...all].sort((a, b) => b.listenCount - a.listenCount)
}

export async function getRelatedDiscourses(discourseId: string, category: string): Promise<Discourse[]> {
  const all = await getAllDiscourses()
  return all.filter((d) => d.category === category && d.id !== discourseId).slice(0, 4)
}

export async function getAllCategories(): Promise<Category[]> {
  return mockCategories
}

export async function getAllPlaylists(): Promise<Playlist[]> {
  return mockPlaylists
}

export async function resolveDiscourseAudio(discourseId: string, seriesSlug: string, trackNumber: number): Promise<string | null> {
  const tracks = await getSeriesAudioUrls(seriesSlug)
  const track = tracks.find((t) => t.trackNumber === trackNumber)
  return track?.audioUrl ?? null
}
