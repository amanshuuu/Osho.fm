'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Category } from '@/types'

interface CategoryPillProps {
  category: Category
  selected?: boolean
  onClick?: () => void
}

export function CategoryPill({ category, selected, onClick }: CategoryPillProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300',
        'border text-sm font-medium whitespace-nowrap',
        selected
          ? 'bg-[#7A1A2E] text-white border-[#7A1A2E] shadow-sm'
          : 'bg-white/60 backdrop-blur-sm border-[#E5DED4]/60 text-[#7A6B5D] hover:border-[#7A6B5D]/30 hover:text-[#1A1A1A] hover:bg-white/80'
      )}
    >
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: category.color }}
      />
      {category.name}
    </motion.button>
  )
}
