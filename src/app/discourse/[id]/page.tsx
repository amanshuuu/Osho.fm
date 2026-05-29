'use client'

import { useParams, notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Play, Clock, Headphones, Bookmark, Heart, Share2, ChevronLeft } from 'lucide-react'
import { Artwork } from '@/components/ui/artwork'
import { useDiscourseContext } from '@/lib/discourse-context'
import { DiscourseCard } from '@/components/ui/discourse-card'
import { usePlayer } from '@/lib/player-context'
import { useSaved } from '@/lib/saved-context'
import { SEOHead } from '@/components/ui/seo-head'

export default function DiscoursePage() {
  const params = useParams()
  const { discourses, loading } = useDiscourseContext()
  const discourse = discourses.find(d => d.id === params.id)
  if (!discourse && !loading) notFound()
  if (!discourse) return null

  const related = discourses.filter(d => d.category === discourse.category && d.id !== discourse.id).slice(0, 4)
  const player = usePlayer()
  const { isBookmarked, toggleBookmark, isLiked, toggleLike } = useSaved()
  const bookmarked = isBookmarked(discourse.id)
  const liked = isLiked(discourse.id)

  const handlePlay = () => {
    if (!discourse.audioUrl) return
    player.play(discourse)
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: discourse.title, text: discourse.description, url })
    } else {
      await navigator.clipboard.writeText(url)
    }
  }

  return (
    <div className="pb-[136px]">
      <SEOHead
        title={discourse.title}
        description={discourse.description || `${discourse.title} — Osho discourse on ${discourse.category}. Listen free on Osho.fm.`}
        image={discourse.thumbnail || undefined}
        url={`/discourse/${discourse.id}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AudioObject",
          "name": discourse.title,
          "description": discourse.description,
          "genre": discourse.category,
          "inLanguage": discourse.language === 'hindi' ? 'hi' : 'en',
          "duration": discourse.duration,
          "contentUrl": discourse.audioUrl || undefined,
          "thumbnailUrl": discourse.thumbnail || undefined,
          "publisher": {
            "@type": "Organization",
            "name": "Osho.fm",
            "url": "https://osho.fm"
          }
        }}
      />
      <section className="py-6 sm:py-8 hero-gradient">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#7A6B5D] hover:text-[#1A1A1A] transition-colors mb-4 sm:mb-6 active:scale-95">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start"
          >
            <div className="w-full sm:w-72 h-48 sm:h-72 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shrink-0 relative">
              <Artwork thumbnail={discourse.thumbnail} gradient={discourse.gradient} title={discourse.title} category={discourse.category} className="w-full h-full" overlay={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#7A6B5D] font-medium mb-3 overflow-x-auto hide-scrollbar">
                <span className="px-2.5 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-[#E5DED4]/50 shrink-0">
                  {discourse.category}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-[#E5DED4]/50 shrink-0">
                  {discourse.language === 'hindi' ? 'हिंदी' : 'English'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-semibold text-[#1A1A1A] tracking-tight mb-2">{discourse.title}</h1>
              <p className="text-sm text-[#7A6B5D] mb-1">{discourse.series}</p>
              <p className="text-sm text-[#7A6B5D] mb-4">{discourse.date}</p>
              <p className="text-sm text-[#7A6B5D] leading-relaxed max-w-xl mb-5 line-clamp-2 sm:line-clamp-none">{discourse.description}</p>
              <div className="flex items-center gap-4 text-xs text-[#7A6B5D] mb-5">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {discourse.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Headphones className="w-3.5 h-3.5" />
                  {(discourse.listenCount / 1000).toFixed(0)}K listens
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handlePlay}
                  className={`inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full text-sm font-medium transition-all shadow-sm active:scale-95 ${discourse.audioUrl ? 'bg-[#7A1A2E] text-white hover:bg-[#9C2D42]' : 'bg-[#E5DED4] text-[#7A6B5D] cursor-not-allowed'}`}
                >
                  <Play className={`w-4 h-4 ${discourse.audioUrl ? 'fill-white' : 'fill-[#7A6B5D]'}`} />
                  {discourse.audioUrl ? 'Listen' : 'Unavailable'}
                </button>
                <button
                  onClick={() => toggleBookmark(discourse.id)}
                  className="w-11 h-11 rounded-full bg-white/60 backdrop-blur-sm border border-[#E5DED4]/60 flex items-center justify-center hover:bg-white/80 transition-all active:scale-90"
                  aria-label={bookmarked ? 'Remove Bookmark' : 'Bookmark'}
                >
                  <Bookmark className={`w-5 h-5 transition-colors ${bookmarked ? 'text-[#1A1A1A] fill-[#1A1A1A]' : 'text-[#7A6B5D]'}`} />
                </button>
                <button
                  onClick={() => toggleLike(discourse.id)}
                  className="w-11 h-11 rounded-full bg-white/60 backdrop-blur-sm border border-[#E5DED4]/60 flex items-center justify-center hover:bg-white/80 transition-all active:scale-90"
                  aria-label={liked ? 'Unlike' : 'Like'}
                >
                  <Heart className={`w-5 h-5 transition-colors ${liked ? 'text-[#7A1A2E] fill-[#7A1A2E]' : 'text-[#7A6B5D]'}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="w-11 h-11 rounded-full bg-white/60 backdrop-blur-sm border border-[#E5DED4]/60 flex items-center justify-center hover:bg-white/80 transition-all active:scale-90"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5 text-[#7A6B5D]" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <h3 className="text-sm font-medium text-[#1A1A1A] mb-4">Key Highlights</h3>
                <div className="space-y-2 sm:space-y-3">
                  {discourse.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F8F5F0] transition-colors active:bg-[#F0ECE6]">
                      <span className="text-[10px] font-mono text-[#7A6B5D] bg-[#F8F5F0] px-1.5 py-0.5 rounded mt-0.5 shrink-0">
                        {h.time}
                      </span>
                      <p className="text-sm text-[#1A1A1A] leading-relaxed">&ldquo;{h.text}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <h3 className="text-sm font-medium text-[#1A1A1A] mb-4">Chapters</h3>
                <div className="space-y-1">
                  {discourse.chapters.map((ch, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8F5F0] transition-colors active:bg-[#F0ECE6]">
                      <span className="text-xs font-mono text-[#7A6B5D] w-12 shrink-0">{ch.time}</span>
                      <span className="w-px h-4 bg-[#E5DED4] shrink-0" />
                      <span className="text-sm text-[#1A1A1A]">{ch.title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div>
              <div className="glass rounded-2xl p-5 sm:sticky sm:top-24">
                <h3 className="text-sm font-medium text-[#1A1A1A] mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {discourse.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-[#F8F5F0] text-xs text-[#7A6B5D] hover:bg-[#E5DED4] transition-colors active:bg-[#E5DED4]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 border-t border-[#E5DED4]/50">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">More from {discourse.category}</h2>
          <div className="flex sm:grid sm:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible hide-scrollbar snap-x-mandatory scroll-smooth">
            {related.map(d => (
              <div key={d.id} className="snap-start shrink-0 w-[55vw] sm:w-auto sm:min-w-0">
                <DiscourseCard discourse={d} variant="compact" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
