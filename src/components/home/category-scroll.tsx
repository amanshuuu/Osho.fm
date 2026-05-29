'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { categories } from '@/lib/data'
import {
  Brain, Eye, Heart, Moon, Wind, Sparkles, Infinity, Circle,
  Flame, Feather, Users, Briefcase,
} from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  brain: Brain, eye: Eye, heart: Heart, moon: Moon,
  wind: Wind, sparkles: Sparkles, infinity: Infinity,
  circle: Circle, flame: Flame, feather: Feather,
  users: Users, briefcase: Briefcase,
}

export function CategoryScroll() {
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-screen-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1A1A]">Browse by Topic</h2>
          <p className="text-sm sm:text-base text-[#7A6B5D] mt-1.5">Find exactly what your soul needs</p>
        </motion.div>

        <div className="flex gap-2 sm:gap-3 overflow-x-auto hide-scrollbar pb-3 -mx-5 sm:-mx-6 px-5 sm:px-6 snap-x-mandatory scroll-smooth">
          {categories.slice(0, 10).map(cat => {
            const Icon = iconMap[cat.icon] || Brain
            return (
              <Link
                key={cat.id}
                href={`/categories?q=${cat.slug}`}
                className="relative flex flex-col items-center gap-2 sm:gap-3 min-w-[80px] sm:min-w-[100px] p-3.5 sm:p-5 rounded-2xl bg-white/55 backdrop-blur-sm border border-[#E5DED4]/40 hover:bg-white/80 hover:border-[#C9953D]/30 transition-all duration-300 group shadow-sm hover:shadow-md overflow-hidden snap-start active:scale-95"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 bg-white/70 backdrop-blur-sm relative z-10"
                  style={{ backgroundColor: cat.color + '80' }}
                >
                  <Icon className="w-5 h-5 text-[#7A6B5D] group-hover:text-[#1A1A1A] transition-colors" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-[#7A6B5D] text-center leading-tight group-hover:text-[#1A1A1A] transition-colors relative z-10">{cat.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
