'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, Play } from 'lucide-react'
import { Artwork } from '@/components/ui/artwork'
import { discourses } from '@/lib/data'
import { SEOHead } from '@/components/ui/seo-head'

export default function ContinueListeningPage() {
  const continueList = discourses.slice(0, 6)

  return (
    <div className="pb-[136px]">
      <SEOHead
        title="Continue Listening"
        description="Pick up where you left off. Your recently played Osho discourses."
        url="/continue-listening"
        noindex={true}
      />
      <section className="py-10 sm:py-12 hero-gradient">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#F8F5F0] flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#1A1A1A]" />
              </div>
              <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#1A1A1A]">Continue Listening</h1>
            </div>
            <p className="text-sm text-[#7A6B5D] max-w-xl">Pick up where you left off</p>
          </motion.div>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="space-y-2 sm:space-y-3">
            {continueList.map((d, i) => {
              const progress = (i + 1) * 18
              return (
                <Link key={d.id} href={`/discourse/${d.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-[#E5DED4]/50 hover:bg-white/80 hover:shadow-sm transition-all duration-300 group active:bg-white/90"
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden shrink-0">
                      <Artwork thumbnail={d.thumbnail} gradient={d.gradient} className="w-full h-full" overlay={false} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1A1A1A] truncate">{d.title}</p>
                      <p className="text-xs text-[#7A6B5D] truncate">{d.series}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex-1 max-w-[200px] sm:max-w-xs h-1 rounded-full bg-[#E5DED4]">
                          <div
                            className="h-full rounded-full bg-[#7A1A2E]"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-[#7A6B5D] font-mono">{progress}%</span>
                      </div>
                    </div>
                    <span className="text-xs text-[#7A6B5D] shrink-0">{d.duration}</span>
                    <button className="w-10 h-10 rounded-full bg-[#7A1A2E] flex items-center justify-center opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-[#9C2D42] shadow-sm max-sm:opacity-100" aria-label="Play">
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </button>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
