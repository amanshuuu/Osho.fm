'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, ArrowRight, X, Clock, Headphones } from 'lucide-react'
import { Artwork } from '@/components/ui/artwork'
import { useDiscourseContext } from '@/lib/discourse-context'
import { SEOHead } from '@/components/ui/seo-head'

export default function SearchPage() {
  const { discourses } = useDiscourseContext()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<import('@/types').Discourse[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      return
    }
    const q = query.toLowerCase()
    const filtered = discourses.filter(
      d =>
        d.title.toLowerCase().includes(q) ||
        d.series.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags.some(t => t.includes(q))
    )
    setResults(filtered.slice(0, 30))
  }, [query])

  const suggestions = [
    'I feel lonely',
    'How to stop overthinking',
    'Osho on love',
    'Fear of death',
    'Meditation for beginners',
    'Peace and silence',
    'Anxiety relief',
    'What is awareness',
  ]

  return (
    <div className="pb-12">
      <SEOHead
        title="Search Osho Discourses"
        description="Search 5,000+ Osho audio discourses by keyword, topic, or feeling. Find talks on meditation, love, awareness, and more."
        url="/search"
      />
      <section className="py-12 hero-gradient">
        <div className="max-w-screen-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1A1A1A] mb-6">
              Search
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="relative max-w-2xl"
          >
            <div className="flex items-center gap-3 px-5 py-3.5 bg-white/70 backdrop-blur-2xl rounded-2xl border border-white/30 shadow-sm">
              <Search className="w-5 h-5 text-[#7A6B5D] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by emotion, topic, or question..."
                className="flex-1 bg-transparent text-base text-[#1A1A1A] placeholder-[#7A6B5D] outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="w-7 h-7 rounded-full bg-[#F8F5F0] flex items-center justify-center hover:bg-[#E5DED4] transition-colors">
                  <X className="w-3.5 h-3.5 text-[#7A6B5D]" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-screen-2xl mx-auto px-6">
          {!query && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <p className="text-[10px] uppercase tracking-widest text-[#7A6B5D] font-medium mb-4">
                Try searching for
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-4 py-2.5 rounded-full bg-white/60 backdrop-blur-sm border border-[#E5DED4]/60 text-sm text-[#7A6B5D] hover:text-[#1A1A1A] hover:bg-white/80 hover:border-[#7A6B5D]/30 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {query && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs text-[#7A6B5D] mb-4">
                {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
              </p>
              <div className="space-y-2">
                {results.map(d => (
                  <Link
                    key={d.id}
                    href={`/discourse/${d.id}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-[#E5DED4]/50 hover:bg-white/80 hover:shadow-sm transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                      <Artwork thumbnail={d.thumbnail} gradient={d.gradient} className="w-full h-full" overlay={false} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1A1A1A] truncate">{d.title}</p>
                      <p className="text-xs text-[#7A6B5D] truncate">{d.series}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#7A6B5D]">
                        <span>{d.category}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {d.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Headphones className="w-3 h-3" />
                          {(d.listenCount / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#7A6B5D] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 shrink-0" />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {query && results.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#7A6B5D] text-lg mb-2">No results found</p>
              <p className="text-sm text-[#7A6B5D]/60">Try a different search term</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
