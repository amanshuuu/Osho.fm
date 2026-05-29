'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Sparkles, ArrowRight } from 'lucide-react'
import { Artwork } from '@/components/ui/artwork'
import { useDiscourseContext } from '@/lib/discourse-context'

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const { discourses } = useDiscourseContext()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<import('@/types').Discourse[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setResults([])
    }
  }, [open])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const q = query.toLowerCase()
    const filtered = discourses.filter(
      d =>
        d.title.toLowerCase().includes(q) ||
        d.series.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.tags.some(t => t.includes(q)) ||
        d.description.toLowerCase().includes(q)
    )
    setResults(filtered.slice(0, 6))
  }, [query])

  const suggestions = [
    'I feel lonely',
    'How to stop overthinking',
    'Osho on love',
    'Fear of death',
    'Meditation for beginners',
    'Peace and silence',
  ]

  const startY = useRef(0)
  const [dragY, setDragY] = useState(0)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - startY.current
    setDragY(delta > 0 ? delta : 0)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (dragY > 120) {
      onClose()
    }
    setDragY(0)
  }, [dragY, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex sm:items-start sm:justify-center sm:pt-[15vh]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: dragY }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full sm:max-w-2xl sm:mx-4 h-full sm:h-auto flex flex-col"
            style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
          >
            <div className="bg-[#FDFCF9] sm:bg-[#FDFCF9]/80 sm:backdrop-blur-2xl rounded-none sm:rounded-3xl shadow-2xl sm:border sm:border-[#E5DED4]/30 overflow-hidden flex flex-col h-full sm:h-auto">
              <div className="flex items-center gap-3 px-4 sm:px-5 pt-3 sm:pt-4 pb-3 border-b border-[#E5DED4]/50 shrink-0">
                <div className="w-10 h-1 sm:hidden mx-auto rounded-full bg-[#D5CEC4]" />
                <Search className="w-5 h-5 text-[#7A6B5D] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search by emotion, topic, or question..."
                  className="flex-1 bg-transparent text-base text-[#1A1A1A] placeholder-[#7A6B5D] outline-none py-1"
                />
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-[#F8F5F0] flex items-center justify-center hover:bg-[#E5DED4] transition-colors active:scale-90 shrink-0"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 text-[#7A6B5D]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {query && results.length > 0 && (
                  <div className="p-3 sm:p-4">
                    <p className="text-[10px] uppercase tracking-widest text-[#7A6B5D] font-medium px-2 mb-2">
                      Discourses
                    </p>
                    {results.map(d => (
                      <Link
                        key={d.id}
                        href={`/discourse/${d.id}`}
                        onClick={onClose}
                        className="w-full flex items-center gap-3 p-3 sm:p-3 rounded-xl hover:bg-[#F8F5F0] transition-colors text-left group active:scale-[0.98]"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          <Artwork thumbnail={d.thumbnail} gradient={d.gradient} className="w-full h-full" overlay={false} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#1A1A1A] truncate">{d.title}</p>
                          <p className="text-xs text-[#7A6B5D] truncate">{d.series} · {d.duration}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#7A6B5D] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}

                {!query && (
                  <div className="p-5 sm:p-6">
                    <p className="text-[10px] uppercase tracking-widest text-[#7A6B5D] font-medium mb-3">
                      Try searching for
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map(s => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="px-4 py-2.5 rounded-full bg-[#F8F5F0] text-sm text-[#7A6B5D] hover:bg-[#E5DED4] hover:text-[#1A1A1A] transition-colors active:scale-95"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {query && results.length === 0 && (
                  <div className="p-12 text-center">
                    <p className="text-[#7A6B5D]">No discourses found for &quot;{query}&quot;</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
