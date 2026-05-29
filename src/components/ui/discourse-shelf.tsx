'use client'

import { useRef, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import { DiscourseCard } from '@/components/ui/discourse-card'
import type { Discourse } from '@/types'

interface ShelfItem {
  discourse: Discourse
  node?: ReactNode
}

interface DiscourseShelfProps {
  title: string
  subtitle?: string
  action?: string
  onAction?: () => void
  items: ShelfItem[]
  variant?: 'default' | 'compact'
  cardWidth?: string
  gradient?: boolean
  scrollButtons?: boolean
  gridCols?: string
  delay?: number
}

export function DiscourseShelf({
  title,
  subtitle,
  action,
  onAction,
  items,
  variant = 'default',
  cardWidth = 'w-[70vw] sm:w-[45vw] lg:w-[30vw] xl:w-[18vw] max-w-[320px]',
  gradient = false,
  scrollButtons = true,
  gridCols,
  delay = 0,
}: DiscourseShelfProps) {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const handleAction = onAction ?? (action && action !== 'See all' ? undefined : () => router.push('/discover'))

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }}
      className="py-12 sm:py-20"
    >
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          action={action}
          onAction={handleAction}
        />
        <div className="relative">
          {gradient && (
            <div className="absolute inset-0 z-0 pointer-events-none max-sm:hidden">
              <div className="absolute top-[-5%] right-[-5%] w-[30vw] h-[30vw] bg-[#7A1A2E]/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-[-5%] left-[-5%] w-[25vw] h-[25vw] bg-[#C9953D]/5 rounded-full blur-[60px]" />
            </div>
          )}
          <div
            ref={scrollRef}
            className="relative flex gap-3 sm:gap-5 overflow-x-auto hide-scrollbar -mx-5 sm:-mx-6 px-5 sm:px-6 snap-x-mandatory scroll-smooth pb-2 sm:pb-0"
          >
            {items.map((item) => (
              <div key={item.discourse.id} className={`snap-start shrink-0 ${cardWidth}`}>
                {item.node ?? <DiscourseCard discourse={item.discourse} variant={variant} />}
              </div>
            ))}
          </div>
          {scrollButtons && items.length > 3 && (
            <>
              <button
                onClick={() => scroll('left')}
                className="absolute left-1 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white transition-colors hidden sm:flex active:scale-90 z-10"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-[#7A6B5D]" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white transition-colors hidden sm:flex active:scale-90 z-10"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-[#7A6B5D]" />
              </button>
            </>
          )}
        </div>
      </div>
    </motion.section>
  )
}
