'use client'

import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  action?: string
  onAction?: () => void
  className?: string
}

export function SectionHeader({ title, subtitle, action, onAction, className }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn('flex items-end justify-between mb-6', className)}
    >
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-[#1A1A1A]">{title}</h2>
        {subtitle && (
          <p className="text-[#7A6B5D] text-sm mt-1">{subtitle}</p>
        )}
      </div>
      {action && (
        <button
          onClick={onAction}
          className="flex items-center gap-1 text-sm font-medium text-[#7A6B5D] hover:text-[#1A1A1A] transition-colors group"
        >
          {action}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}
    </motion.div>
  )
}
