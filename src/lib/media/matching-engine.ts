import type { MatchResult, YouTubeSearchResult } from '@/types'

const STOP_WORDS = new Set(['a', 'an', 'the', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'and', 'or', 'is', 'are', 'was', 'were', 'be', 'been'])

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(t => t.length > 0 && !STOP_WORDS.has(t))
}

function jaccardSimilarity(a: string[], b: string[]): number {
  const setA = new Set(a)
  const setB = new Set(b)
  const intersection = new Set([...setA].filter(x => setB.has(x)))
  const union = new Set([...setA, ...setB])
  return union.size === 0 ? 0 : intersection.size / union.size
}

export function matchByTitle(
  discourseTitle: string,
  videoTitle: string
): number {
  const dt = tokenize(discourseTitle)
  const vt = tokenize(videoTitle)
  return jaccardSimilarity(dt, vt)
}

export function matchByDuration(
  discourseSeconds: number,
  videoSeconds: number,
  tolerancePercent: number = 0.15
): number {
  const diff = Math.abs(discourseSeconds - videoSeconds)
  const maxDur = Math.max(discourseSeconds, videoSeconds)
  if (diff / maxDur <= tolerancePercent) {
    return 1 - (diff / maxDur)
  }
  return 0
}

export function calculateConfidence(
  discourseTitle: string,
  discourseSeries: string,
  video: YouTubeSearchResult,
  discourseDurationSeconds?: number
): MatchResult {
  const titleSim = matchByTitle(discourseTitle, video.title)
  const seriesSim = discourseSeries ? matchByTitle(discourseSeries, video.title) : 0
  const keywordBoost = (
    video.title.toLowerCase().includes('osho') ||
    video.title.toLowerCase().includes('oshobhagwan')
  ) ? 0.1 : 0

  const seriesKeyword = discourseSeries ?
    tokenize(discourseSeries).some(t => video.title.toLowerCase().includes(t)) ? 0.15 : 0 :
    0

  const bestTextScore = Math.max(titleSim, seriesSim) + keywordBoost + seriesKeyword

  let durationScore = 0
  if (discourseDurationSeconds && video.durationSeconds) {
    durationScore = matchByDuration(discourseDurationSeconds, video.durationSeconds)
  }

  const confidence = (bestTextScore * 0.7) + (durationScore * 0.3)

  const reasons: string[] = []
  if (titleSim > 0.3) reasons.push(`title_similarity:${titleSim.toFixed(2)}`)
  if (seriesSim > 0.3) reasons.push(`series_match:${seriesSim.toFixed(2)}`)
  if (keywordBoost > 0) reasons.push('osho_keyword')
  if (seriesKeyword > 0) reasons.push('series_keyword')
  if (durationScore > 0) reasons.push(`duration_match:${durationScore.toFixed(2)}`)

  return {
    videoId: video.videoId,
    title: video.title,
    confidence: Math.min(confidence, 1.0),
    reason: reasons.join(', ') || 'low_confidence',
  }
}

export function findBestMatch(
  results: MatchResult[],
  threshold: number = 0.85
): MatchResult | null {
  if (results.length === 0) return null
  results.sort((a, b) => b.confidence - a.confidence)
  if (results[0].confidence >= threshold) {
    return results[0]
  }
  return null
}
