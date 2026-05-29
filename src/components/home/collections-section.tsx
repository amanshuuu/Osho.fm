'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Clock, Headphones } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import { Artwork } from '@/components/ui/artwork'
import { playlists } from '@/lib/data'

export function CollectionsSection() {
  const router = useRouter()
  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
        <SectionHeader
          title="Curated Collections"
          subtitle="Handpicked series for your journey"
          action="See all"
          onAction={() => router.push('/playlist')}
        />
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {playlists.map((p, i) => (
            <motion.a
              key={p.id}
              href={`/playlist?id=${p.id}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, scale: 1.015 }}
              className="group relative rounded-2xl overflow-hidden bg-white/55 backdrop-blur-xl border border-[#E5DED4]/20 transition-all duration-400 hover:shadow-xl hover:shadow-[#7A1A2E]/5"
            >
              <Artwork
                thumbnail={p.thumbnail}
                gradient={p.gradient}
                title={p.title}
                className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                overlay={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
              <div className="relative z-10 p-5">
                <h3 className="text-sm font-semibold text-[#1A1A1A] mb-2 line-clamp-2 leading-snug">{p.title}</h3>
                <p className="text-[11px] text-[#7A6B5D]/80 leading-relaxed line-clamp-2 mb-5">
                  {p.description}
                </p>
                <div className="flex items-center gap-3 text-[10px] text-[#7A6B5D]/70">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {p.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Headphones className="w-3 h-3" />
                    {p.count} talks
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        <div className="flex sm:hidden gap-3 overflow-x-auto hide-scrollbar snap-x-mandatory scroll-smooth -mx-5 px-5">
          {playlists.map((p) => (
            <motion.a
              key={p.id}
              href={`/playlist?id=${p.id}`}
              className="snap-start shrink-0 w-[70vw] max-w-[280px] group relative rounded-2xl overflow-hidden bg-white/55 backdrop-blur-xl border border-[#E5DED4]/20 active:scale-[0.98]"
              whileTap={{ scale: 0.98 }}
            >
              <Artwork
                thumbnail={p.thumbnail}
                gradient={p.gradient}
                title={p.title}
                className="absolute inset-0 opacity-30"
                overlay={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
              <div className="relative z-10 p-5">
                <h3 className="text-sm font-semibold text-[#1A1A1A] mb-2 line-clamp-2 leading-snug">{p.title}</h3>
                <p className="text-[11px] text-[#7A6B5D]/80 leading-relaxed line-clamp-2 mb-5">
                  {p.description}
                </p>
                <div className="flex items-center gap-3 text-[10px] text-[#7A6B5D]/70">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {p.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Headphones className="w-3 h-3" />
                    {p.count} talks
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
