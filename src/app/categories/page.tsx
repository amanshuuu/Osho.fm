'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { categories } from '@/lib/data'
import { useDiscourseContext } from '@/lib/discourse-context'
import { DiscourseCard } from '@/components/ui/discourse-card'
import {
  Brain, Eye, Heart, Moon, Wind, Sparkles, Infinity, Circle,
  Flame, Feather, Users, Briefcase, Library,
} from 'lucide-react'
import { SEOHead } from '@/components/ui/seo-head'

const iconMap: Record<string, React.ElementType> = {
  brain: Brain, eye: Eye, heart: Heart, moon: Moon,
  wind: Wind, sparkles: Sparkles, infinity: Infinity,
  circle: Circle, flame: Flame, feather: Feather,
  users: Users, briefcase: Briefcase,
}

export default function CategoriesPage() {
  const { discourses } = useDiscourseContext()
  const [activeCategory, setActiveCategory] = useState(categories[0].name)

  const categoryDiscourses = discourses.filter(d => d.category === activeCategory)
  const activeCat = categories.find(c => c.name === activeCategory)

  return (
    <div className="pb-[136px]">
      <SEOHead
        title="Osho Discourse Categories"
        description="Browse Osho discourses by topic — meditation, awareness, love, mind, silence, and more. Find the wisdom you need."
        url="/categories"
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
                <Library className="w-3.5 h-3.5" />
                Browse
              </span>
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.03em] text-[#1A1A1A] leading-[0.9] mb-4">
                Categories
              </h1>
              <p className="text-base sm:text-xl text-[#7A6B5D] max-w-xl leading-relaxed">
              Explore thousands of discourses organized by topic
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sm:py-14">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="flex gap-2 mb-8 sm:mb-10 overflow-x-auto hide-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap snap-x-mandatory scroll-smooth">
            {categories.map(cat => {
              const Icon = iconMap[cat.icon] || Brain
              const isActive = activeCategory === cat.name
              return (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`snap-start shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300 text-sm font-medium ${
                    isActive
                      ? 'bg-[#7A1A2E] text-white shadow-md shadow-[#7A1A2E]/20'
                      : 'bg-white/60 backdrop-blur-sm border border-[#E5DED4]/50 text-[#7A6B5D] hover:border-[#7A6B5D]/30 hover:text-[#1A1A1A] hover:bg-white/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                  <span className={`text-[11px] ${isActive ? 'text-white/50' : 'text-[#7A6B5D]/50'}`}>
                    {cat.count}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {activeCat && (
            <motion.div
              key={activeCat.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1A1A] mb-2">{activeCat.name}</h2>
                <p className="text-sm sm:text-base text-[#7A6B5D]">{activeCat.description}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {categoryDiscourses.map(d => (
                  <DiscourseCard key={d.id} discourse={d} />
                ))}
              </div>
              {categoryDiscourses.length === 0 && (
                <div className="text-center py-20 sm:py-24">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#F8F5F0] flex items-center justify-center mx-auto mb-4">
                    <Library className="w-7 h-7 sm:w-8 sm:h-8 text-[#7A6B5D]" />
                  </div>
                  <p className="text-[#7A6B5D] font-medium">No discourses in this category yet</p>
                  <p className="text-xs text-[#7A6B5D]/60 mt-1">More coming soon</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
