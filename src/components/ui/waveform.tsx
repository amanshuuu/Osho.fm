'use client'

import { cn } from '@/lib/utils'

interface WaveformProps {
  active?: boolean
  className?: string
  bars?: number
}

const heights = [12, 16, 20, 24, 28, 24, 20, 16, 12, 18, 22, 26, 22, 18, 14, 10, 16, 22, 16, 10]

export function Waveform({ active = true, className, bars = 40 }: WaveformProps) {
  return (
    <div className={cn('flex items-end gap-[2px] h-8', className)}>
      {Array.from({ length: bars }).map((_, i) => {
        const height = heights[i % heights.length]
        return (
          <div
            key={i}
            className={cn(
              'w-[3px] rounded-full transition-all duration-300',
              active ? 'bg-[#1A1A1A]/30' : 'bg-[#1A1A1A]/10'
            )}
            style={{
              height: `${height}px`,
              animation: active ? `wave 1.2s ease-in-out ${(i / bars) * 1.2}s infinite` : 'none',
            }}
          />
        )
      })}
    </div>
  )
}
