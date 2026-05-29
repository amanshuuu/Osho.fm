'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, Clock, Headphones } from 'lucide-react'
import { cn, formatListenCount } from '@/lib/utils'
import { usePlayer } from '@/lib/player-context'
import { Artwork } from '@/components/ui/artwork'
import type { Discourse } from '@/types'

interface DiscourseCardProps {
  discourse: Discourse
  variant?: 'default' | 'compact' | 'hero'
  className?: string
}

export function DiscourseCard({ discourse, variant = 'default', className }: DiscourseCardProps) {
  const player = usePlayer()
  const [hovered, setHovered] = useState(false)
  const spring = { type: 'spring' as const, stiffness: 300, damping: 24 }
  const href = `/discourse/${discourse.id}`

  if (variant === 'compact') {
    return (
      <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <Link href={href}>
          <motion.div
            whileHover={{ y: -3, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            transition={spring}
            className={cn(
              'group relative rounded-2xl overflow-hidden cursor-pointer',
              'bg-white/55 backdrop-blur-xl border border-[#E5DED4]/20',
              'p-4 transition-all duration-400 hover:shadow-xl hover:shadow-[#7A1A2E]/5',
              className
            )}
          >
            <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${discourse.gradient}`} />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#7A6B5D]/70 font-medium">
                  {discourse.series}
                </span>
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#7A6B5D]/60 font-medium bg-white/40 px-1.5 py-0.5 rounded-full">
                  {discourse.language === 'hindi' ? 'हिंदी' : 'EN'}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#1A1A1A] leading-snug line-clamp-2 mb-3">
                {discourse.title}
              </h3>
              <div className="flex items-center gap-3 text-[10px] text-[#7A6B5D]/80">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {discourse.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Headphones className="w-3 h-3" />
                  {formatListenCount(discourse.listenCount)}
                </span>
              </div>
            </div>
          </motion.div>
        </Link>
        {discourse.audioUrl && (
          <button
            onClick={(e) => { e.preventDefault(); player.play(discourse) }}
            className={`absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-400 shadow-md hover:bg-white hover:scale-110 z-10 hover:shadow-lg active:scale-90 ${hovered ? 'opacity-100' : 'opacity-0 max-sm:opacity-100 max-sm:scale-100'}`}
            aria-label={`Play ${discourse.title}`}
          >
            <Play className="w-5 h-5 text-[#7A1A2E] ml-0.5" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Link href={href}>
        <motion.div
          whileHover={{ y: -4, scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          transition={spring}
          className={cn(
            'group relative rounded-2xl overflow-hidden cursor-pointer',
            'bg-white/55 backdrop-blur-xl border border-[#E5DED4]/20',
            'transition-all duration-400 hover:shadow-xl hover:shadow-[#7A1A2E]/5',
            className
          )}
        >
          <div className="aspect-[16/10] relative overflow-hidden group">
            <Artwork
              thumbnail={discourse.thumbnail}
              gradient={discourse.gradient}
              title={discourse.title}
              category={discourse.category}
              className="absolute inset-0 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              <span className="px-3 py-1 rounded-full bg-white/70 backdrop-blur-md text-[9px] font-medium text-[#7A6B5D] uppercase tracking-[0.12em] shadow-sm">
                {discourse.category}
              </span>
              {discourse.language === 'hindi' && (
                <span className="px-3 py-1 rounded-full bg-white/70 backdrop-blur-md text-[9px] font-medium text-[#7A6B5D] uppercase tracking-[0.12em] shadow-sm">
                  हिंदी
                </span>
              )}
            </div>
          </div>
          <div className="p-3.5">
            <p className="text-[9px] uppercase tracking-[0.15em] text-[#7A6B5D]/70 font-medium mb-1.5">
              {discourse.series}
            </p>
            <h3 className="text-sm font-semibold text-[#1A1A1A] leading-snug line-clamp-1 mb-1.5">
              {discourse.title}
            </h3>
            <p className="text-xs text-[#7A6B5D]/80 line-clamp-1 leading-relaxed mb-3">
              {discourse.description}
            </p>
            <div className="flex items-center gap-3 text-[10px] text-[#7A6B5D]/80">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {discourse.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Headphones className="w-3 h-3" />
                {formatListenCount(discourse.listenCount)}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
      {discourse.audioUrl && (
        <button
          onClick={(e) => { e.preventDefault(); player.play(discourse) }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center transition-all duration-400 shadow-xl hover:bg-white/90 z-20 active:scale-90 ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90 max-sm:opacity-100 max-sm:scale-100'}`}
          aria-label={`Play ${discourse.title}`}
        >
          <Play className="w-6 h-6 text-[#7A1A2E] ml-0.5" />
        </button>
      )}
    </div>
  )
}
