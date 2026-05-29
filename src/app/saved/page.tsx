'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Bookmark, Heart, Quote } from 'lucide-react'
import { Artwork } from '@/components/ui/artwork'
import { useSaved } from '@/lib/saved-context'
import { SEOHead } from '@/components/ui/seo-head'

export default function SavedPage() {
  const { bookmarkedDiscourses, likedDiscourses, toggleBookmark, toggleLike } = useSaved()

  return (
    <div className="pb-[136px]">
      <SEOHead
        title="Saved Discourses"
        description="Your bookmarks and liked Osho discourses. Access your saved audio talks anytime."
        url="/saved"
        noindex={true}
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
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/40 text-xs font-medium text-[#7A6B5D] mb-5 shadow-sm">
              <Bookmark className="w-3.5 h-3.5" />
              Library
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.03em] text-[#1A1A1A] leading-[0.9] mb-4">
              Saved
            </h1>
            <p className="text-base sm:text-xl text-[#7A6B5D] max-w-xl leading-relaxed">
              Your bookmarks, favorites, and saved insights
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sm:py-14">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-[#1A1A1A]">Bookmarked Discourses</h2>
                <span className="text-xs text-[#7A6B5D] bg-[#F8F5F0]/80 px-2 py-1 rounded-full">{bookmarkedDiscourses.length} items</span>
              </div>
              {bookmarkedDiscourses.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#F8F5F0]/50 border border-[#E5DED4]/30 text-center">
                  <Bookmark className="w-8 h-8 text-[#E5DED4] mx-auto mb-3" />
                  <p className="text-sm text-[#7A6B5D]">No bookmarks yet</p>
                  <p className="text-xs text-[#7A6B5D]/60 mt-1">Tap the bookmark icon on any discourse to save it here</p>
                </div>
              ) : (
                <div className="space-y-1 sm:space-y-2">
                  {bookmarkedDiscourses.map((d, i) => (
                    <Link key={d.id} href={`/discourse/${d.id}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8F5F0] transition-colors group cursor-pointer active:bg-[#F0ECE6]"
                      >
                        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                          <Artwork thumbnail={d.thumbnail} gradient={d.gradient} className="w-full h-full" overlay={false} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#1A1A1A] truncate">{d.title}</p>
                          <p className="text-xs text-[#7A6B5D]/80 truncate">{d.series}</p>
                        </div>
                        <span className="text-xs text-[#7A6B5D]/70 font-mono tabular-nums shrink-0">{d.duration}</span>
                        <button
                          onClick={(e) => { e.preventDefault(); toggleBookmark(d.id) }}
                          className="w-9 h-9 rounded-full bg-[#F8F5F0]/80 flex items-center justify-center opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-[#E5DED4]/80 active:opacity-100"
                          aria-label="Remove bookmark"
                        >
                          <Bookmark className="w-4 h-4 text-[#7A6B5D]" fill="currentColor" />
                        </button>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-10">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-sm font-semibold text-[#1A1A1A]">Liked Discourses</h2>
                  <span className="text-xs text-[#7A6B5D] bg-[#F8F5F0]/80 px-2 py-1 rounded-full">{likedDiscourses.length} items</span>
                </div>
                {likedDiscourses.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-[#F8F5F0]/50 border border-[#E5DED4]/30 text-center">
                    <Heart className="w-8 h-8 text-[#E5DED4] mx-auto mb-3" />
                    <p className="text-sm text-[#7A6B5D]">No likes yet</p>
                    <p className="text-xs text-[#7A6B5D]/60 mt-1">Tap the heart icon on any discourse to save it here</p>
                  </div>
                ) : (
                  <div className="space-y-1 sm:space-y-2">
                    {likedDiscourses.map((d, i) => (
                      <Link key={d.id} href={`/discourse/${d.id}`}>
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8F5F0] transition-colors group cursor-pointer active:bg-[#F0ECE6]"
                        >
                          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                            <Artwork thumbnail={d.thumbnail} gradient={d.gradient} className="w-full h-full" overlay={false} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#1A1A1A] truncate">{d.title}</p>
                            <p className="text-xs text-[#7A6B5D]/80 truncate">{d.series}</p>
                          </div>
                          <span className="text-xs text-[#7A6B5D]/70 font-mono tabular-nums shrink-0">{d.duration}</span>
                          <button
                            onClick={(e) => { e.preventDefault(); toggleLike(d.id) }}
                            className="w-9 h-9 rounded-full bg-[#F8F5F0]/80 flex items-center justify-center opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-[#E5DED4]/80 active:opacity-100"
                            aria-label="Remove like"
                          >
                            <Heart className="w-4 h-4 text-[#7A6B5D]" fill="currentColor" />
                          </button>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="glass-strong rounded-2xl p-5 sm:p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-[#1A1A1A] mb-5">Saved Quotes</h3>
                <div className="space-y-4">
                  {[
                    { text: "The moment you accept yourself as you are, all your tensions disappear.", discourse: "The Book of Wisdom" },
                    { text: "Love is not a relationship. Love is a state of being.", discourse: "Tantra: The Supreme Understanding" },
                  ].map((q, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#F8F5F0]/80 border border-[#E5DED4]/30">
                      <Quote className="w-4 h-4 text-[#7A6B5D]/30 mb-2" />
                      <p className="text-xs text-[#1A1A1A] leading-relaxed mb-2">&ldquo;{q.text}&rdquo;</p>
                      <p className="text-[10px] text-[#7A6B5D]/70 font-medium">{q.discourse}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
