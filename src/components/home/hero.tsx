'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Play, ArrowRight, Circle } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
})

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient min-h-[60vh] sm:min-h-[70vh] lg:min-h-[85vh] flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFCF9] via-[#FDFCF9]/95 to-[#FDFCF9]/70" />
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[#7A1A2E]/3 rounded-full blur-[60px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-[#C9953D]/5 rounded-full blur-[50px]" />
      </div>

      <div className="relative w-full max-w-screen-2xl mx-auto px-5 sm:px-8 py-16 sm:py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#E5DED4]/40 text-xs font-medium text-[#7A6B5D] mb-6 sm:mb-8 shadow-sm"
            >
              <Circle className="w-3 h-3 text-[#7A1A2E]" strokeWidth={2.5} />
              A conscious way to experience Osho
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="text-[clamp(2.5rem,10vw,7rem)] font-semibold tracking-[-0.04em] text-[#1A1A1A] leading-[0.88] mb-6 sm:mb-8"
            >
              Listen to
              <br />
              wisdom{' '}
              <span className="relative inline-block">
                <span className="text-[#7A6B5D]">silently</span>
                <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-[#7A6B5D]/0 via-[#7A6B5D]/20 to-[#7A6B5D]/0" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="text-base sm:text-xl text-[#7A6B5D] max-w-xl leading-[1.7] mb-8 sm:mb-10"
            >
              Discover thousands of Osho&apos;s discourses &mdash; organized by emotion, meditation, love, silence, awareness, and life itself.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <a
                href="/discover"
                className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#7A1A2E] text-white text-sm font-medium overflow-hidden transition-all duration-500 shadow-xl shadow-[#7A1A2E]/20 hover:shadow-2xl hover:shadow-[#7A1A2E]/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-white shrink-0" />
                Start Listening
              </a>
              <a
                href="/categories"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/70 backdrop-blur-md border border-[#E5DED4]/70 text-sm font-medium text-[#7A6B5D] hover:text-[#1A1A1A] hover:bg-white/90 hover:border-[#7A6B5D]/30 transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                Explore Discourses
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-[min(60vw,280px)] sm:w-[min(50vw,340px)] lg:w-[380px] aspect-[3/4] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image
                src="/images/osho-portrait.jpg"
                alt="Osho"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 640px) 60vw, (max-width: 1024px) 50vw, 380px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 glass rounded-2xl p-4 sm:p-5 shadow-xl max-w-[180px] sm:max-w-[220px]">
              <p className="text-[10px] uppercase tracking-widest text-[#7A1A2E] font-medium mb-1">Osho</p>
              <p className="text-xs font-medium text-[#1A1A1A]">1931–1990</p>
              <p className="text-[11px] text-[#7A6B5D]">The awakened master</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
