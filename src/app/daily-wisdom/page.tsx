'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Quote, ChevronLeft, ChevronRight, Play, Clock, Headphones } from 'lucide-react'
import { dailyQuotes, discourses } from '@/lib/data'
import { SEOHead } from '@/components/ui/seo-head'

function todayIndex(length: number) {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000)
  return dayOfYear % length
}

export default function DailyWisdomPage() {
  const [quoteIndex, setQuoteIndex] = useState(() => todayIndex(dailyQuotes.length))
  const quote = dailyQuotes[quoteIndex]
  const recommended = [
    discourses[todayIndex(discourses.length) % discourses.length],
    discourses[(todayIndex(discourses.length) + 3) % discourses.length],
    discourses[(todayIndex(discourses.length) + 7) % discourses.length],
    discourses[(todayIndex(discourses.length) + 11) % discourses.length],
  ]

  const prevQuote = () => setQuoteIndex(i => (i - 1 + dailyQuotes.length) % dailyQuotes.length)
  const nextQuote = () => setQuoteIndex(i => (i + 1) % dailyQuotes.length)

  return (
    <div className="pb-[136px]">
      <SEOHead
        title="Daily Osho Wisdom — Quote of the Day"
        description="A daily Osho quote and recommended discourse to start your day with mindfulness and awareness."
        url="/daily-wisdom"
      />
      <section className="py-12 sm:py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white pointer-events-none" />
        <div className="relative max-w-screen-2xl mx-auto px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/40 text-xs font-medium text-[#7A6B5D] mb-5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Daily Wisdom
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.03em] text-[#1A1A1A] leading-[0.9] mb-4">
              Wisdom for today
            </h1>
            <p className="text-base sm:text-xl text-[#7A6B5D] max-w-xl leading-relaxed">
              A fresh insight each day to carry with you
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sm:py-14">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-br from-[#7A1A2E] to-[#5C0F20] p-6 sm:p-16 lg:p-20 overflow-hidden mb-14 sm:mb-16"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9953D]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute top-6 right-6 opacity-[0.06]">
              <Quote className="w-40 h-40 text-[#C9953D]" />
            </div>
            <div className="relative max-w-3xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <span className="w-6 sm:w-10 h-[2px] rounded-full bg-[#C9953D]/40" />
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#C9953D]/70 font-medium">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <blockquote className="text-[clamp(1.3rem,4vw,3rem)] font-medium text-white leading-[1.15] tracking-tight mb-6 sm:mb-8">
                &ldquo;{quote.text}&rdquo;
              </blockquote>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <span className="text-sm font-semibold text-[#C9953D]">— {quote.author}</span>
                <span className="w-px h-4 bg-white/20 hidden sm:block" />
                <span className="text-sm text-white/60">{quote.discourse}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button onClick={prevQuote} className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors shadow-sm active:scale-90" aria-label="Previous quote">
                    <ChevronLeft className="w-5 h-5 text-white/70" />
                  </button>
                  <button onClick={nextQuote} className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors shadow-sm active:scale-90" aria-label="Next quote">
                    <ChevronRight className="w-5 h-5 text-white/70" />
                  </button>
                </div>
                <span className="text-[11px] text-white/40 font-mono">{quoteIndex + 1} / {dailyQuotes.length}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-lg sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] mb-5 sm:mb-6">Recommended for today</h2>
            <div className="flex sm:grid sm:grid-cols-4 gap-3 sm:gap-5 overflow-x-auto hide-scrollbar snap-x-mandatory scroll-smooth -mx-5 px-5 sm:mx-0 sm:px-0 sm:overflow-visible">
              {recommended.map((d, i) => (
                <Link key={d.id} href={`/discourse/${d.id}`} className="snap-start shrink-0 w-[55vw] sm:w-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3, scale: 1.015 }}
                    className="group relative rounded-2xl overflow-hidden bg-white/55 backdrop-blur-xl border border-[#E5DED4]/20 p-5 transition-all duration-400 hover:shadow-xl hover:shadow-[#7A1A2E]/5 active:scale-[0.98]"
                  >
                    <div className={`absolute inset-0 opacity-30 bg-gradient-to-br ${d.gradient}`} />
                    <div className="relative z-10">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-[#7A6B5D]/70 font-medium mb-2">
                        {d.series}
                      </p>
                      <h3 className="text-sm font-semibold text-[#1A1A1A] leading-snug line-clamp-2 mb-3">
                        {d.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] text-[#7A6B5D]/80">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {d.duration}
                        </span>
                      </div>
                    </div>
                    <button className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 sm:group-hover:opacity-100 transition-all duration-400 shadow-md hover:bg-white z-10 max-sm:opacity-100" aria-label="Play">
                      <Play className="w-4 h-4 text-[#1A1A1A] ml-0.5" />
                    </button>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
