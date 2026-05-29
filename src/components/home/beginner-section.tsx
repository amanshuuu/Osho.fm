'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Moon, BedDouble, Heart, Wind, Brain, Target } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import { beginnerPaths } from '@/lib/data'

const iconMap: Record<string, React.ElementType> = {
  moon: Moon, 'bed-double': BedDouble, heart: Heart,
  wind: Wind, brain: Brain, target: Target,
}

export function BeginnerSection() {
  const router = useRouter()
  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
        <SectionHeader
          title="Where do you want to start?"
          subtitle="Choose your path and discover what resonates"
          action="View all paths"
          onAction={() => router.push('/onboarding')}
        />
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {beginnerPaths.map((path, i) => {
            const Icon = iconMap[path.icon] || Heart
            return (
              <motion.a
                key={path.id}
                href={`/onboarding?path=${path.id}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, scale: 1.015 }}
                className="group relative rounded-2xl overflow-hidden bg-white/55 backdrop-blur-xl border border-[#E5DED4]/20 p-5 transition-all duration-400 hover:shadow-xl hover:shadow-[#7A1A2E]/5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F8F5F0]/80 flex items-center justify-center mb-4 group-hover:bg-[#E5DED4]/80 transition-colors shadow-inner">
                  <Icon className="w-5 h-5 text-[#7A6B5D] group-hover:text-[#1A1A1A] transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-[#1A1A1A] mb-1.5 leading-snug">{path.title}</h3>
                <p className="text-xs text-[#7A6B5D]/80 leading-relaxed">{path.description}</p>
                <div className="flex items-center gap-1 mt-4 text-[10px] font-medium text-[#7A6B5D] opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span>Explore path</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.a>
            )
          })}
        </div>
        <div className="flex sm:hidden gap-3 overflow-x-auto hide-scrollbar snap-x-mandatory scroll-smooth -mx-5 px-5">
          {beginnerPaths.map((path) => {
            const Icon = iconMap[path.icon] || Heart
            return (
              <a
                key={path.id}
                href={`/onboarding?path=${path.id}`}
                className="snap-start shrink-0 w-[55vw] max-w-[240px] rounded-2xl bg-white/55 backdrop-blur-xl border border-[#E5DED4]/20 p-5 active:scale-[0.98]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F8F5F0]/80 flex items-center justify-center mb-4 shadow-inner">
                  <Icon className="w-5 h-5 text-[#7A6B5D]" />
                </div>
                <h3 className="text-sm font-semibold text-[#1A1A1A] mb-1.5 leading-snug">{path.title}</h3>
                <p className="text-xs text-[#7A6B5D]/80 leading-relaxed">{path.description}</p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
