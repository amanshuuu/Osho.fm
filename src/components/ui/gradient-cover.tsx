'use client'

import { cn } from '@/lib/utils'

interface GradientCoverProps {
  gradient: string
  pattern?: number
  className?: string
  children?: React.ReactNode
}

const patterns: Record<number, React.ReactNode> = {
  0: ( <></> ),
  1: (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-black/[0.03] blur-3xl" />
    </div>
  ),
  2: (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -top-1/3 -left-1/4 w-2/3 h-2/3 rounded-full bg-white/15 blur-3xl" />
      <div className="absolute -bottom-1/4 right-0 w-1/3 h-1/3 rounded-full bg-black/[0.02] blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-8 h-8 rounded-full border border-white/10" />
    </div>
  ),
  3: (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-black/[0.02] to-transparent" />
      <div className="absolute top-1/2 left-1/3 w-6 h-6 rounded-full bg-white/10 blur-sm" />
      <div className="absolute bottom-1/3 right-1/3 w-10 h-10 rounded-full border border-white/8" />
    </div>
  ),
  4: (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-white/20 blur-3xl" />
    </div>
  ),
  5: (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-t from-white/25 to-transparent" />
      <div className="absolute top-0 left-1/4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  ),
}

export function GradientCover({ gradient, pattern = 0, className, children }: GradientCoverProps) {
  return (
    <div
      className={cn(
        `absolute inset-0 bg-gradient-to-br ${gradient}`,
        className
      )}
    >
      {patterns[pattern] ?? patterns[0]}
      {children}
    </div>
  )
}

export function getCategoryPattern(category: string): number {
  const catMap: Record<string, number> = {
    'Meditation': 1,
    'Awareness': 2,
    'Love': 3,
    'Silence': 4,
    'Anxiety': 5,
    'Ego': 1,
    'Life & Death': 5,
    'Zen': 2,
    'Tantra': 3,
    'Creativity': 4,
    'Relationships': 3,
    'Business': 2,
  }
  return catMap[category] ?? 0
}

export function getPlaylistPattern(playlistId: string): number {
  const idMap: Record<string, number> = {
    p1: 1,
    p2: 3,
    p3: 4,
    p4: 5,
    p5: 2,
    p6: 2,
  }
  return idMap[playlistId] ?? 0
}
