const OSHO_API_BASE = 'https://oshoworld.com'

interface OshoSeriesTrack {
  _id: string
  audio_index: number
  duration: string
  slug: string
  imageFile: string
  title: string
  file: string
}

interface OshoSeriesResponse {
  categoryData: {
    slug: string
    title: string
  }
  listData: OshoSeriesTrack[]
  total: number
}

async function fetchOshoApi(path: string): Promise<OshoSeriesResponse | null> {
  try {
    const res = await fetch(`${OSHO_API_BASE}${path}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 3600 },
    })

    if (!res.ok) return null

    const text = await res.text()
    const match = text.match(/<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/)

    if (!match) return null

    const data = JSON.parse(match[1])
    const pageData = data?.props?.pageProps?.data?.pageData

    if (!pageData?.listData) return null

    return pageData as OshoSeriesResponse
  } catch {
    return null
  }
}

export interface ResolvedTrack {
  title: string
  audioUrl: string
  duration: string
  durationSeconds: number
  trackNumber: number
}

function parseDuration(duration: string): number {
  const parts = duration.split(':').map(Number)
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  return parts[0] || 0
}

export async function getDiscourseAudioUrl(seriesSlug: string, trackIndex: number): Promise<string | null> {
  // Try a few path patterns
  const paths = [
    `/${seriesSlug}`,
    `/audio/${seriesSlug}`,
  ]

  for (const path of paths) {
    const data = await fetchOshoApi(path)
    if (!data?.listData) continue

    const track = data.listData.find((t) => t.audio_index === trackIndex)
    if (track?.file) {
      return `${OSHO_API_BASE}${track.file}`
    }
  }

  return null
}

export async function getDiscourseAudioUrlByTrackId(discourseId: string, seriesSlug: string, trackIndex: number): Promise<string | null> {
  return getDiscourseAudioUrl(seriesSlug, trackIndex)
}

export async function getSeriesAudioUrls(seriesSlug: string): Promise<ResolvedTrack[]> {
  const paths = [
    `/${seriesSlug}`,
    `/audio/${seriesSlug}`,
  ]

  for (const path of paths) {
    const data = await fetchOshoApi(path)
    if (!data?.listData) continue

    return data.listData.map((track) => ({
      title: track.title,
      audioUrl: `${OSHO_API_BASE}${track.file}`,
      duration: track.duration,
      durationSeconds: parseDuration(track.duration),
      trackNumber: track.audio_index,
    }))
  }

  return []
}

export async function checkAudioUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(5000) })
    return res.ok
  } catch {
    return false
  }
}
