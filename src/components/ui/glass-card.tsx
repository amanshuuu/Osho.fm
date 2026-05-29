'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  intensity?: 'light' | 'medium' | 'strong'
}

export function GlassCard({ children, className, hover = true, intensity = 'light' }: GlassCardProps) {
  const bgClasses = {
    light: 'bg-white/60',
    medium: 'bg-white/70',
    strong: 'bg-white/80',
  }

  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'rounded-2xl border border-white/20 shadow-sm',
        'backdrop-blur-xl',
        bgClasses[intensity],
        hover && 'cursor-pointer transition-shadow hover:shadow-md',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
