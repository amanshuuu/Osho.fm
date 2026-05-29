'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote, Circle } from 'lucide-react'
import { dailyQuotes } from '@/lib/data'

export function DailyQuote() {
  const quote = useMemo(() => {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    return dailyQuotes[dayOfYear % dailyQuotes.length]
  }, [])
  return (
    <section className="py-12 sm:py-24">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-br from-[#7A1A2E] to-[#5C0F20] p-6 sm:p-16 lg:p-24 overflow-hidden"
        >
          <Image
            src="/images/osho-portrait.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.07]"
            loading="lazy"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#7A1A2E]/60 to-[#5C0F20]/80" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9953D]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full border border-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full border border-white/[0.03]" />

          <div className="relative max-w-3xl">
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <span className="w-6 sm:w-10 h-[2px] rounded-full bg-[#C9953D]/40" />
              <Circle className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#C9953D]" strokeWidth={2.5} />
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#C9953D]/70 font-medium">
                Daily Wisdom
              </span>
            </div>
            <blockquote className="text-[clamp(1.3rem,4vw,3rem)] font-medium text-white leading-[1.15] tracking-tight mb-6 sm:mb-8">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-sm font-semibold text-[#C9953D]">— {quote.author}</span>
              <span className="w-px h-4 bg-white/20 hidden sm:block" />
              <span className="text-sm text-white/60">{quote.discourse}</span>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 opacity-[0.06]">
            <Quote className="w-40 h-40 text-[#C9953D]" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
