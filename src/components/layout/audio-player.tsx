'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronDown,
  ChevronUp,
  Volume2,
  Clock,
  Bookmark,
  Share2,
  Heart,
  VolumeX,
  ChevronsLeft,
  ChevronsRight,

} from 'lucide-react'
import { usePlayer } from '@/lib/player-context'
import { useDiscourseContext } from '@/lib/discourse-context'
import { useSaved } from '@/lib/saved-context'
import { Artwork } from '@/components/ui/artwork'
import type { Discourse } from '@/types'

interface AudioPlayerProps {
  discourse?: Discourse | null
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function AudioPlayer({ discourse }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [dragY, setDragY] = useState(0)
  const [muted, setMuted] = useState(false)
  const player = usePlayer()
  const { discourses } = useDiscourseContext()
  const { isBookmarked, toggleBookmark, isLiked, toggleLike } = useSaved()
  const disc = discourse ?? player.currentDiscourse
  const bookmarked = disc ? isBookmarked(disc.id) : false
  const liked = disc ? isLiked(disc.id) : false

  useEffect(() => {
    if (!audioRef.current) return
    const speed = parseFloat(player.playbackSpeed)
    if (!isNaN(speed)) {
      audioRef.current.playbackRate = speed
    }
  }, [player.playbackSpeed])

  const handlePlayPause = useCallback(() => {
    if (!audioRef.current || !disc) return
    if (player.isPlaying) {
      audioRef.current.pause()
      player.pause()
    } else {
      audioRef.current.play()
      player.resume()
    }
  }, [player, disc])

  useEffect(() => {
    if (!audioRef.current) return
    if (player.isPlaying && disc) {
      audioRef.current.play().catch(err => {
        console.warn('Failed to play audio:', err)
      })
    } else {
      audioRef.current.pause()
    }
  }, [player.isPlaying, disc?.id])

  useEffect(() => {
    if (!audioRef.current) return
    const audio = audioRef.current
    const onTimeUpdate = () => player.setCurrentTime(audio.currentTime)
    const onDurationChange = () => player.setDuration(audio.duration)
    const onEnded = () => {
      player.pause()
      player.setCurrentTime(0)
    }
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('durationchange', onDurationChange)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('durationchange', onDurationChange)
      audio.removeEventListener('ended', onEnded)
    }
  }, [player])

  const progressPercent = player.duration > 0 ? (player.currentTime / player.duration) * 100 : 0

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (!audioRef.current || player.duration === 0) return
      const rect = e.currentTarget.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const x = (clientX - rect.left) / rect.width
      const time = Math.max(0, Math.min(1, x)) * player.duration
      audioRef.current.currentTime = time
      player.seek(time)
    },
    [player],
  )

  const handleFullscreenShare = useCallback(async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: disc?.title || '', url })
    } else {
      await navigator.clipboard.writeText(url)
    }
  }, [disc])

  const handleSkipBack = useCallback(() => {
    if (!audioRef.current) return
    const newTime = Math.max(0, audioRef.current.currentTime - 10)
    audioRef.current.currentTime = newTime
    player.seek(newTime)
  }, [player])

  const handleSkipForward = useCallback(() => {
    if (!audioRef.current || !player.duration) return
    const newTime = Math.min(player.duration, audioRef.current.currentTime + 30)
    audioRef.current.currentTime = newTime
    player.seek(newTime)
  }, [player])

  const handlePrevious = useCallback(() => {
    if (!disc) return
    const idx = discourses.findIndex(d => d.id === disc.id)
    if (idx > 0) {
      player.play(discourses[idx - 1])
    }
  }, [disc, player])

  const handleNext = useCallback(() => {
    if (!disc) return
    const idx = discourses.findIndex(d => d.id === disc.id)
    if (idx < discourses.length - 1) {
      player.play(discourses[idx + 1])
    }
  }, [disc, player])

  const handleToggleMute = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.muted = !audioRef.current.muted
    setMuted(!muted)
  }, [muted])

  const onDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y > 100) {
      setFullscreen(false)
    }
    setDragY(0)
  }

  if (!disc) return null

  const audioUrl = disc.audioUrl || undefined

  const seekBar = (accent: string, bg: string, knob: string) => (
    <div
      className={`relative h-2 rounded-full ${bg} overflow-hidden cursor-pointer touch-action-none`}
      onClick={handleSeek}
      onTouchStart={(e) => handleSeek(e)}
      onTouchMove={(e) => handleSeek(e)}
    >
      <div
        className={`h-full rounded-full ${accent} relative transition-[width] duration-75`}
        style={{ width: `${progressPercent}%` }}
      >
        <div
          className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${knob} transition-all shadow-md`}
        />
      </div>
    </div>
  )

  return (
    <>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <AnimatePresence>
        {!fullscreen && disc === player.currentDiscourse && disc.audioUrl && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed bottom-[56px] lg:bottom-0 left-0 right-0 z-30 px-2 pb-2 lg:pb-0 lg:pl-60"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            <div
              className="glass-strong rounded-2xl shadow-xl shadow-black/5 active:scale-[0.99] transition-transform"
              onClick={() => setFullscreen(true)}
            >
              <div className="flex items-center gap-3 px-3 py-2.5">
                <div className="w-11 h-11 rounded-xl shrink-0 overflow-hidden shadow-inner">
                  <Artwork thumbnail={disc.thumbnail} gradient={disc.gradient} title={disc.title} className="w-full h-full" overlay={false} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1A1A] truncate leading-tight">{disc.title}</p>
                  <p className="text-[11px] text-[#7A6B5D]/80 truncate">{disc.series}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrevious() }}
                    className="w-11 h-11 rounded-full bg-[#F8F5F0]/80 flex items-center justify-center hover:bg-[#E5DED4]/80 transition-colors active:scale-90"
                    aria-label="Previous track"
                  >
                    <ChevronsLeft className="w-4 h-4 text-[#7A6B5D]" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePlayPause() }}
                    className="w-11 h-11 rounded-full bg-[#7A1A2E] flex items-center justify-center hover:bg-[#9C2D42] transition-colors shadow-md active:scale-90"
                    aria-label={player.isPlaying ? 'Pause' : 'Play'}
                  >
                    {player.isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext() }}
                    className="w-11 h-11 rounded-full bg-[#F8F5F0]/80 flex items-center justify-center hover:bg-[#E5DED4]/80 transition-colors active:scale-90"
                    aria-label="Next track"
                  >
                    <ChevronsRight className="w-4 h-4 text-[#7A6B5D]" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFullscreen(true) }}
                    className="w-11 h-11 rounded-full bg-[#F8F5F0]/80 flex items-center justify-center hover:bg-[#E5DED4]/80 transition-colors"
                    aria-label="Expand player"
                  >
                    <ChevronUp className="w-4 h-4 text-[#7A6B5D]" />
                  </button>
                </div>
              </div>
              {player.duration > 0 && (
                <div className="px-3 pb-2">
                  {seekBar('bg-[#7A1A2E]', 'bg-[#E5DED4]/60', 'bg-[#7A1A2E]')}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fullscreen && disc === player.currentDiscourse && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: dragY }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            onDragEnd={onDragEnd}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.3}
            onDrag={(_, info) => setDragY(info.offset.y > 0 ? info.offset.y : 0)}
            className="fixed inset-0 z-50 maroon-gradient overflow-hidden"
            style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            <div className="h-full flex flex-col min-h-0">
              <div className="flex items-center justify-between px-5 py-4 shrink-0">
                <button
                  onClick={() => setFullscreen(false)}
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors active:scale-95"
                >
                  <ChevronDown className="w-6 h-6 text-white/70" />
                  <span className="text-sm font-medium">Now Playing</span>
                </button>
                <div className="flex items-center gap-3">
                  <button onClick={handleFullscreenShare} className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
                    <Share2 className="w-5 h-5 text-white/70" />
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-lg mx-auto w-full min-h-0 overflow-y-auto">
                <div
                  className={`rounded-[2rem] mb-6 sm:mb-8 flex items-center justify-center shadow-2xl shadow-black/20 overflow-hidden shrink-0`}
                  style={{ width: 'min(55vw, 55vh, 260px)', height: 'min(55vw, 55vh, 260px)' }}
                >
                  <Artwork thumbnail={disc.thumbnail} gradient={disc.gradient} title={disc.title} category={disc.category} className="w-full h-full" overlay={false} />
                </div>
                <div className="text-center w-full px-4 shrink-0">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-white/60 font-medium mb-2">
                    {disc.series}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-1 leading-tight">
                    {disc.title}
                  </h2>
                  <p className="text-sm text-white/60">{disc.category}</p>
                </div>
              </div>

              <div className="px-6 pb-6 max-w-lg mx-auto w-full shrink-0">
                <div className="mb-4">
                  {seekBar('bg-[#C9953D]', 'bg-white/20', 'bg-[#C9953D]')}
                  <div className="flex justify-between mt-2 text-xs text-white/50 font-mono tabular-nums">
                    <span>{formatTime(player.currentTime)}</span>
                    <span>{player.duration > 0 ? formatTime(player.duration) : disc.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 sm:gap-5 mb-5">
                  <button onClick={handlePrevious} className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
                    <ChevronsLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" />
                  </button>
                  <button onClick={handleSkipBack} className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
                    <SkipBack className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" />
                  </button>
                  <button
                    onClick={handlePlayPause}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C9953D] flex items-center justify-center hover:bg-[#D4A853] transition-colors shadow-xl shadow-black/20 active:scale-90"
                  >
                    {player.isPlaying ? (
                      <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    ) : (
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-0.5" />
                    )}
                  </button>
                  <button onClick={handleSkipForward} className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
                    <SkipForward className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" />
                  </button>
                  <button onClick={handleNext} className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
                    <ChevronsRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 sm:gap-8">
                  <button onClick={() => disc && toggleLike(disc.id)} className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
                    <Heart className={`w-5 h-5 ${liked ? 'text-[#C9953D] fill-[#C9953D]' : 'text-white/70'}`} />
                  </button>
                  <button onClick={() => player.setSleepTimer(String(parseInt(player.sleepTimer) + 10))} className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
                    <Clock className="w-5 h-5 text-white/70" />
                  </button>
                  <button onClick={() => disc && toggleBookmark(disc.id)} className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
                    <Bookmark className={`w-5 h-5 ${bookmarked ? 'text-white fill-white' : 'text-white/70'}`} />
                  </button>
                  <button onClick={handleToggleMute} className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
                    {muted ? <VolumeX className="w-5 h-5 text-white/70" /> : <Volume2 className="w-5 h-5 text-white/70" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
