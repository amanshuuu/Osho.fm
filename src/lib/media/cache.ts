interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

export function getCached<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(`media_cache_${key}`)
    if (!raw) return null
    const entry: CacheEntry<T> = JSON.parse(raw)
    if (Date.now() - entry.timestamp > entry.ttl) {
      localStorage.removeItem(`media_cache_${key}`)
      return null
    }
    return entry.data
  } catch {
    return null
  }
}

export function setCached<T>(key: string, data: T, ttlMs: number = 3600000): void {
  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now(), ttl: ttlMs }
    localStorage.setItem(`media_cache_${key}`, JSON.stringify(entry))
  } catch {
    /* localStorage full or unavailable */
  }
}

export function clearCache(): void {
  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('media_cache_'))
    keys.forEach(k => localStorage.removeItem(k))
  } catch {
    /* noop */
  }
}

export function getCacheKey(discourseId: string): string {
  return `discourse_${discourseId}`
}

export function getVideoThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}
