export { ingestDiscourse, ingestAllDiscourses, ingestWithMetadataFetch } from './pipeline'
export { getYouTubeThumbnail, getYouTubeEmbedUrl, buildVideoSource } from './youtube-service'
export { knownYouTubeIds, seriesYouTubeIds } from './youtube-ids'
export { matchByTitle, matchByDuration, calculateConfidence, findBestMatch } from './matching-engine'
export { getCacheKey, getCached, setCached, getVideoThumbnail } from './cache'
export type {
  AudioSource,
  VideoSource,
  ArtworkSource,
  Metadata,
  EnrichedDiscourse,
  MatchResult,
} from '@/types'
