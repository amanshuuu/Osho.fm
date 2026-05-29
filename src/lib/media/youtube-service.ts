import type { VideoSource, YouTubeSearchResult } from '@/types'

const YT_CDN = 'https://img.youtube.com/vi'
const YT_WATCH = 'https://www.youtube.com/watch?v='
const YT_EMBED = 'https://www.youtube-nocookie.com/embed'

export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault' = 'maxresdefault'): string {
  return `${YT_CDN}/${videoId}/${quality}.jpg`
}

export function getYouTubeEmbedUrl(videoId: string, autoplay: boolean = false): string {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    controls: '1',
    iv_load_policy: '3',
  })
  if (autoplay) params.set('autoplay', '1')
  return `${YT_EMBED}/${videoId}?${params.toString()}`
}

export function getYouTubeWatchUrl(videoId: string): string {
  return `${YT_WATCH}${videoId}`
}

export function buildVideoSource(videoId: string, title: string): VideoSource {
  return {
    id: videoId,
    title,
    url: getYouTubeWatchUrl(videoId),
    embedUrl: getYouTubeEmbedUrl(videoId),
    thumbnail: {
      default: getYouTubeThumbnail(videoId, 'default'),
      medium: getYouTubeThumbnail(videoId, 'mqdefault'),
      high: getYouTubeThumbnail(videoId, 'hqdefault'),
      maxres: getYouTubeThumbnail(videoId, 'maxresdefault'),
    },
    channelTitle: 'OSHO International',
    publishedAt: '',
  }
}

export async function fetchVideoMetadata(videoId: string): Promise<{ title: string; publishedAt: string } | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(getYouTubeWatchUrl(videoId))}&format=json`
    )
    if (!res.ok) return null
    const data = await res.json()
    return {
      title: data.title || '',
      publishedAt: '',
    }
  } catch {
    return null
  }
}

export async function searchYouTube(query: string, apiKey: string): Promise<YouTubeSearchResult[]> {
  try {
    const params = new URLSearchParams({
      part: 'snippet',
      maxResults: '5',
      q: `OSHO ${query}`,
      type: 'video',
      key: apiKey,
    })
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`)
    if (!res.ok) return []
    const data = await res.json()
    return (data.items || []).map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails?.high?.url || '',
    }))
  } catch {
    return []
  }
}
