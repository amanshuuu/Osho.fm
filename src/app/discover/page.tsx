'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/section-header'
import { DiscourseCard } from '@/components/ui/discourse-card'
import { CategoryPill } from '@/components/ui/category-pill'
import { categories, moods } from '@/lib/data'
import { useDiscourseContext } from '@/lib/discourse-context'
import { Brain, Moon, Wind, Heart, Compass, Sun, HelpCircle, Sparkles, Search } from 'lucide-react'
import { SEOHead } from '@/components/ui/seo-head'

const moodIcons: Record<string, React.ElementType> = {
  moon: Moon, wind: Wind, heart: Heart, brain: Brain,
  compass: Compass, sun: Sun, 'help-circle': HelpCircle, sparkles: Sparkles,
}

const moodCategoryMap: Record<string, string> = {
  Peaceful: 'Meditation',
  Anxious: 'Awareness',
  Lonely: 'Silence',
  Overthinking: 'Mind',
  Seeking: 'Awareness',
  Grateful: 'Love',
  Confused: 'Mind',
  Hopeful: 'Love',
}

export default function DiscoverPage() {
  const { discourses, loading } = useDiscourseContext()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'english' | 'hindi'>('all')
  const [showCount, setShowCount] = useState(20) // Initial number of discourses to show

  const handleMoodClick = (moodName: string) => {
    const cat = moodCategoryMap[moodName]
    setSelectedCategory(prev => prev === cat ? null : cat)
    setShowCount(20)
  }

  const filtered = discourses.filter(d => {
    if (selectedCategory && d.category !== selectedCategory) return false
    if (selectedLanguage !== 'all' && d.language !== selectedLanguage) return false
    return true
  })

  return (
    <div className="pb-[136px]">
      <SEOHead
        title="Discover Osho Discourses"
        description="Browse 5,000+ Osho audio discourses by category, mood, and language. Find talks on meditation, awareness, love, mind, and more."
        url="/discover"
      />
      <section className="py-12 sm:py-20 hero-gradient relative overflow-hidden">
        <Image src="/images/osho-portrait.jpg" alt="" fill className="object-cover opacity-[0.04]" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white pointer-events-none" />
        <div className="relative max-w-screen-2xl mx-auto px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#E5DED4]/40 text-xs font-medium text-[#7A6B5D] mb-5 shadow-sm">
              <Search className="w-3.5 h-3.5" />
              Explore
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.03em] text-[#1A1A1A] leading-[0.9] mb-4">
              Discover
            </h1>
            <p className="text-base sm:text-xl text-[#7A6B5D] max-w-xl leading-relaxed">
              Browse by emotion, topic, or mood — find exactly what your soul needs
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <SectionHeader title="How are you feeling?" subtitle="Discover by emotion" />
          <div className="flex sm:grid sm:grid-cols-4 gap-3 overflow-x-auto hide-scrollbar snap-x-mandatory scroll-smooth -mx-5 px-5 sm:mx-0 sm:px-0">
            {moods.map(mood => {
              const Icon = moodIcons[mood.icon] || Brain
              return (
                <motion.button
                  key={mood.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleMoodClick(mood.name)}
                  className="snap-start shrink-0 flex sm:flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl bg-white/55 backdrop-blur-sm border border-[#E5DED4]/40 hover:bg-white/80 hover:border-[#C9953D]/30 hover:shadow-md transition-all duration-300 text-left sm:text-center w-[45vw] sm:w-auto active:scale-95"
                >
                  <div
                    className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-inner shrink-0"
                    style={{ backgroundColor: mood.color + '80' }}
                  >
                    <Icon className="w-5 h-5 text-[#7A6B5D]" />
                  </div>
                  <span className="text-sm font-medium text-[#1A1A1A]">{mood.name}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pb-6 sm:pb-8">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <SectionHeader title="Browse by Topic" subtitle="Filter discourses by category" />
          <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap snap-x-mandatory scroll-smooth">
            <CategoryPill
              category={{ id: 'all', name: 'All', slug: 'all', icon: 'grid', color: '#E5E5EA', count: 0, description: '' }}
              selected={!selectedCategory}
              onClick={() => setSelectedCategory(null)}
            />
            {categories.map(cat => (
              <CategoryPill
                key={cat.id}
                category={cat}
                selected={selectedCategory === cat.name}
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-4">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="flex gap-2 mb-6">
            <CategoryPill
              category={{ id: 'all', name: 'All Languages', slug: 'all', icon: 'globe', color: '#E5E5EA', count: 0, description: '' }}
              selected={selectedLanguage === 'all'}
              onClick={() => setSelectedLanguage('all')}
            />
            <CategoryPill
              category={{ id: 'english', name: 'English', slug: 'english', icon: 'type', color: '#C9953D', count: 0, description: '' }}
              selected={selectedLanguage === 'english'}
              onClick={() => setSelectedLanguage('english')}
            />
            <CategoryPill
              category={{ id: 'hindi', name: 'हिन्दी', slug: 'hindi', icon: 'type', color: '#3D5A5C', count: 0, description: '' }}
              selected={selectedLanguage === 'hindi'}
              onClick={() => setSelectedLanguage('hindi')}
            />
          </div>
        </div>
      </section>

        <section>
          <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {filtered.slice(0, showCount).map(d => (
                <DiscourseCard key={d.id} discourse={d} />
              ))}
              {filtered.length > showCount && (
                <div className="col-span-full">
                  <button
                    onClick={() => setShowCount(showCount + 20)}
                    className="w-full flex items-center justify-center py-3 px-6 rounded-2xl bg-white/55 backdrop-blur-md border border-[#E5DED4]/40 text-sm font-medium text-[#7A6B5D] hover:bg-white/80 transition-colors duration-300"
                  >
                    Show more
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
    </div>
  )
}
