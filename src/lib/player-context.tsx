'use client'

import { createContext, useContext, useState, useCallback, useMemo, useRef, useEffect, type ReactNode } from 'react'
import type { Discourse } from '@/types'

interface PlayerState {
  currentDiscourse: Discourse | null
  isPlaying: boolean
  currentTime: number
  duration: number
  playbackSpeed: string
  sleepTimer: string
  sleepTimerEnd: number | null
  audioRef: React.RefObject<HTMLAudioElement | null>
  play: (discourse: Discourse) => void
  pause: () => void
  resume: () => void
  seek: (time: number) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setPlaybackSpeed: (speed: string) => void
  setSleepTimer: (minutes: string) => void
  cancelSleepTimer: () => void
}

const PlayerContext = createContext<PlayerState | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentDiscourse, setCurrentDiscourse] = useState<Discourse | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackSpeed, setPlaybackSpeedState] = useState('1.0x')
  const [sleepTimer, setSleepTimerState] = useState('30')
  const [sleepTimerEnd, setSleepTimerEnd] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const sleepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!audioRef.current) return
    const speed = parseFloat(playbackSpeed)
    if (!isNaN(speed)) {
      audioRef.current.playbackRate = speed
    }
  }, [playbackSpeed])

  const play = useCallback((discourse: Discourse) => {
    setCurrentDiscourse(discourse)
    if (discourse.audioUrl) {
      setIsPlaying(true)
    }
    setCurrentTime(0)
  }, [])

  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const resume = useCallback(() => {
    if (currentDiscourse) {
      setIsPlaying(true)
    }
  }, [currentDiscourse])

  const seek = useCallback((time: number) => {
    setCurrentTime(time)
  }, [])

  const setPlaybackSpeed = useCallback((speed: string) => {
    setPlaybackSpeedState(speed)
    if (audioRef.current) {
      const s = parseFloat(speed)
      if (!isNaN(s)) audioRef.current.playbackRate = s
    }
  }, [])

  const cancelSleepTimer = useCallback(() => {
    if (sleepTimerRef.current) {
      clearTimeout(sleepTimerRef.current)
      sleepTimerRef.current = null
    }
    setSleepTimerEnd(null)
  }, [])

  const setSleepTimer = useCallback((minutes: string) => {
    setSleepTimerState(minutes)
    cancelSleepTimer()
    const ms = parseInt(minutes) * 60 * 1000
    if (isNaN(ms)) return
    setSleepTimerEnd(Date.now() + ms)
    sleepTimerRef.current = setTimeout(() => {
      setIsPlaying(false)
      setSleepTimerEnd(null)
    }, ms)
  }, [cancelSleepTimer])

  const value = useMemo(() => ({
    currentDiscourse,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    sleepTimer,
    sleepTimerEnd,
    audioRef,
    play,
    pause,
    resume,
    seek,
    setCurrentTime,
    setDuration,
    setPlaybackSpeed,
    setSleepTimer,
    cancelSleepTimer,
  }), [currentDiscourse, isPlaying, currentTime, duration, playbackSpeed, sleepTimer, sleepTimerEnd, play, pause, resume, seek])

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
