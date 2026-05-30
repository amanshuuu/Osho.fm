'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, Play, Clock, Headphones, ArrowRight, HeadphonesIcon, Sparkles, Heart } from 'lucide-react'
import { useDiscourseContext } from '@/lib/discourse-context'
import { formatListenCount } from '@/lib/utils'
import { SEOHead } from '@/components/ui/seo-head'

const categories = ['Meditation', 'Awareness', 'Silence', 'Anxiety', 'Love']

export default function GuidedMeditationPage() {
  const { discourses } = useDiscourseContext()
  const [activeCategory, setActiveCategory] = useState('Meditation')

  const filtered = discourses.filter(d => d.category === activeCategory).slice(0, 8)
  const topDiscourses = [...discourses].sort((a, b) => b.listenCount - a.listenCount).slice(0, 6)

  return (
    <div className="pb-[136px]">
      <SEOHead
        title="Guided Meditation by Osho — Free Audio Discourses"
        description="Listen to free guided meditations by Osho. Thousands of audio discourses on meditation, awareness, love, and inner peace. Start your journey today."
        url="/guided-meditation"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Guided Meditation by Osho",
          "description": "Free guided meditation audio discourses by Osho on meditation, awareness, love, and inner peace.",
          "isPartOf": { "@type": "WebSite", "name": "Osho.fm", "url": "https://osho.fm" }
        }}
      />
      <section className="py-12 sm:py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white pointer-events-none" />
        <div className="relative max-w-screen-2xl mx-auto px-5 sm:px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#7A6B5D] hover:text-[#1A1A1A] transition-colors mb-6 active:scale-95">
              <ChevronLeft className="w-4 h-4" />
              Home
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/40 text-xs font-medium text-[#7A6B5D] mb-5 shadow-sm">
              <HeadphonesIcon className="w-3.5 h-3.5" />
              Guided Meditation
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.03em] text-[#1A1A1A] leading-[0.9] mb-4">
              Guided Meditation by Osho
            </h1>
            <p className="text-base sm:text-xl text-[#7A6B5D] max-w-2xl leading-relaxed">
              Thousands of free guided meditation audio discourses. Let Osho&rsquo;s voice guide you into deeper awareness, stillness, and peace
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] mb-4">What Is a Guided Meditation?</h2>
            <p className="text-sm sm:text-base text-[#7A6B5D] leading-relaxed mb-4">
              Unlike silent sitting, a guided meditation uses the voice of a teacher to lead you inward. Osho&rsquo;s discourses are a form of guided meditation — his words create a space of awareness, and his pauses invite you into silence.
            </p>
            <p className="text-sm sm:text-base text-[#7A6B5D] leading-relaxed">
              Each discourse is a complete guided session: Osho speaks on a topic, tells stories, answers questions, and guides you into meditative spaces. Simply close your eyes, listen, and let his voice be your guide.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] mb-6">Most Listened Guided Meditations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {topDiscourses.map((d, i) => (
              <Link key={d.id} href={`/discourse/${d.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="group relative rounded-2xl overflow-hidden bg-white/55 backdrop-blur-xl border border-[#E5DED4]/20 p-5 transition-all duration-400 hover:shadow-xl hover:shadow-[#7A1A2E]/5"
                >
                  <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${d.gradient}`} />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[9px] uppercase tracking-[0.15em] text-[#7A6B5D]/70 font-medium">{d.category}</span>
                      <span className="flex items-center gap-1 text-[10px] text-[#7A6B5D]/60">
                        <Headphones className="w-3 h-3" />
                        {formatListenCount(d.listenCount)}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-[#1A1A1A] leading-snug line-clamp-2 mb-1">{d.title}</h3>
                    <p className="text-[10px] text-[#7A6B5D]/60 mb-3 line-clamp-1">{d.series}</p>
                    <div className="flex items-center gap-2 text-[10px] text-[#7A6B5D]/80">
                      <Clock className="w-3 h-3" />
                      {d.duration}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] mb-6">Choose by Theme</h2>
          <div className="flex gap-2 mb-8 overflow-x-auto hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[#7A1A2E] text-white shadow-md shadow-[#7A1A2E]/20'
                    : 'bg-white/60 backdrop-blur-sm border border-[#E5DED4]/50 text-[#7A6B5D] hover:border-[#7A6B5D]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filtered.map((d, i) => (
              <Link key={d.id} href={`/discourse/${d.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
                  whileHover={{ y: -4, scale: 1.015 }}
                  className="group relative rounded-2xl overflow-hidden bg-white/55 backdrop-blur-xl border border-[#E5DED4]/20 transition-all duration-400 hover:shadow-xl hover:shadow-[#7A1A2E]/5"
                >
                  <div className="aspect-[16/10] relative overflow-hidden bg-[#F8F5F0]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${d.gradient}`} />
                    <div className="absolute inset-0 bg-black/[0.02]" />
                  </div>
                  <div className="p-3.5">
                    <p className="text-[9px] uppercase tracking-[0.15em] text-[#7A6B5D]/70 font-medium mb-1.5 line-clamp-1">{d.series}</p>
                    <h3 className="text-sm font-semibold text-[#1A1A1A] leading-snug line-clamp-1 mb-2">{d.title}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-[#7A6B5D]/80">
                      <Clock className="w-3 h-3" />
                      {d.duration}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/discover" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7A1A2E] text-white text-sm font-medium hover:bg-[#8B2A3E] transition-all active:scale-95">
              Browse All Guided Meditations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-[#F8F5F0]/30 border-y border-[#E5DED4]/20">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] mb-6">How to Use These Guided Meditations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { step: '01', title: 'Find a Quiet Space', desc: 'Sit comfortably where you won\'t be disturbed. Use headphones for the best experience.' },
                { step: '02', title: 'Press Play', desc: 'Choose a discourse that resonates with your current mood or need. Let Osho\'s voice guide you.' },
                { step: '03', title: 'Just Listen', desc: 'Don\'t try to analyze or remember. Simply listen and allow the words to work on you.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center sm:text-left"
                >
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#C9953D] font-semibold">{item.step}</span>
                  <h3 className="text-sm font-semibold text-[#1A1A1A] mt-2 mb-2">{item.title}</h3>
                  <p className="text-xs text-[#7A6B5D] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl bg-gradient-to-br from-[#7A1A2E] to-[#5C0F20] rounded-2xl sm:rounded-[2rem] p-8 sm:p-12 text-white text-center">
            <Sparkles className="w-10 h-10 mx-auto mb-4 text-[#C9953D]" />
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3">Start Your Guided Meditation Journey</h2>
            <p className="text-sm text-white/70 leading-relaxed max-w-lg mx-auto mb-6">
              5,000+ guided sessions. Free. No sign-up required. Just press play and let Osho guide you home.
            </p>
            <Link href="/discover" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-sm font-medium hover:bg-white/20 transition-all active:scale-95">
              Begin Listening
              <Heart className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
