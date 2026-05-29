'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, Clock, Headphones, Heart, Sparkles, MoreHorizontal, Shuffle } from 'lucide-react'
import { Artwork } from '@/components/ui/artwork'
import { playlists, discourses } from '@/lib/data'
import { SEOHead } from '@/components/ui/seo-head'

export default function PlaylistPage() {
  const playlist = playlists[0]
  const playlistDiscourses = discourses.slice(0, 8)

  return (
    <div className="pb-12">
      <SEOHead
        title={playlist.title}
        description={playlist.description}
        image={playlist.thumbnail || undefined}
        url="/playlist"
      />
      <section className="py-12 hero-gradient">
        <div className="max-w-screen-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row items-start gap-8"
          >
            <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-xl shrink-0">
              <Artwork thumbnail={playlist.thumbnail} gradient={playlist.gradient} title={playlist.title} className="w-full h-full" overlay={false} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-widest text-[#7A6B5D] font-medium mb-3">Playlist</p>
              <h1 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] tracking-tight mb-3">
                {playlist.title}
              </h1>
              <p className="text-sm text-[#7A6B5D] mb-4 max-w-lg">{playlist.description}</p>
              <div className="flex items-center gap-4 text-xs text-[#7A6B5D] mb-6">
                <span>{playlist.count} discourses</span>
                <span className="w-px h-3 bg-[#E5DED4]" />
                <span>{playlist.duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7A1A2E] text-white text-sm font-medium hover:bg-[#9C2D42] transition-all shadow-sm">
                  <Play className="w-4 h-4" />
                  Play All
                </button>
                <button className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm border border-[#E5DED4]/60 flex items-center justify-center hover:bg-white/80 transition-colors">
                  <Shuffle className="w-4 h-4 text-[#7A6B5D]" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="space-y-1">
            {playlistDiscourses.map((d, i) => (
              <Link key={d.id} href={`/discourse/${d.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F8F5F0] transition-colors group cursor-pointer"
                >
                  <span className="w-6 text-center text-xs text-[#7A6B5D] font-mono">{i + 1}</span>
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <Artwork thumbnail={d.thumbnail} gradient={d.gradient} className="w-full h-full" overlay={false} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1A1A1A] truncate">{d.title}</p>
                    <p className="text-xs text-[#7A6B5D] truncate">{d.series}</p>
                  </div>
                  <span className="text-xs text-[#7A6B5D]">{d.duration}</span>
                  <button className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-[#E5DED4]">
                    <MoreHorizontal className="w-4 h-4 text-[#7A6B5D]" />
                  </button>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
