'use client'

import { motion } from 'framer-motion'
import { Play, Circle } from 'lucide-react'
import { Artwork } from '@/components/ui/artwork'

const videos = [
  {
    id: 'HY9aw5cQRDQ',
    title: 'The Greatest Courage Is Being Capable of Change',
    duration: '21:33',
    thumbnail: 'https://img.youtube.com/vi/HY9aw5cQRDQ/hqdefault.jpg',
    gradient: 'from-[#DFDCD8] to-[#F2EEE8]',
  },
  {
    id: 'y47LgoRtQmY',
    title: 'A Bird on the Wing: The Art of Meditation',
    duration: '58:30',
    thumbnail: 'https://img.youtube.com/vi/y47LgoRtQmY/maxresdefault.jpg',
    gradient: 'from-[#D6E0EC] to-[#EDF2F8]',
  },
  {
    id: 'bzxcT4PNysk',
    title: 'You Are the Light: Zen Discourses',
    duration: '45:15',
    thumbnail: 'https://img.youtube.com/vi/bzxcT4PNysk/hqdefault.jpg',
    gradient: 'from-[#D6E2DC] to-[#ECF4F0]',
  },
  {
    id: 'MM3VopzjC1k',
    title: 'Women: The Mysterious Door of Tantra',
    duration: '52:20',
    thumbnail: 'https://img.youtube.com/vi/MM3VopzjC1k/maxresdefault.jpg',
    gradient: 'from-[#EDD8D8] to-[#F8F0F0]',
  },
]

export function VideoSection() {
  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Circle className="w-4 h-4 text-[#7A1A2E]" strokeWidth={2.5} />
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#7A6B5D] font-medium">
              Watch
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1A1A]">Osho on Video</h2>
          <p className="text-sm sm:text-base text-[#7A6B5D] mt-1.5">Experience Osho&apos;s living presence through original discourse videos</p>
        </motion.div>

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {videos.map((video, i) => (
            <motion.a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, scale: 1.015 }}
              className="group relative rounded-2xl overflow-hidden bg-white/55 backdrop-blur-xl border border-[#E5DED4]/20 transition-all duration-400 hover:shadow-xl hover:shadow-[#7A1A2E]/5"
            >
              <div className="relative w-[260px] h-[260px] sm:w-80 sm:h-80 rounded-[2rem] mb-6 sm:mb-8 flex items-center justify-center shadow-2xl shadow-black/20 overflow-hidden shrink-0" style={{ width: 'min(55vw, 55vh, 260px)', height: 'min(55vw, 55vh, 260px)' }}>
                <Artwork thumbnail={video.thumbnail} gradient={video.gradient} title={video.title} className="w-full h-full" overlay={false} />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-[#1A1A1A] line-clamp-2 leading-snug group-hover:text-[#7A1A2E] transition-colors">
                  {video.title}
                </h3>
                <p className="text-[11px] text-[#7A6B5D]/80">{video.duration}</p>
              </div>
            </motion.a>
          ))}
        </div>
        <div className="flex sm:hidden gap-3 overflow-x-auto hide-scrollbar snap-x-mandatory scroll-smooth -mx-5 px-5">
          {videos.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="snap-start shrink-0 w-[55vw] max-w-[240px] rounded-2xl overflow-hidden bg-white/55 backdrop-blur-xl border border-[#E5DED4]/20 active:scale-[0.98]"
            >
              <div className="relative w-[200px] h-[200px] rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-black/20 overflow-hidden shrink-0" style={{ width: 'min(45vw, 45vh, 200px)', height: 'min(45vw, 45vh, 200px)' }}>
                <Artwork thumbnail={video.thumbnail} gradient={video.gradient} title={video.title} className="w-full h-full" overlay={false} />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-[#1A1A1A] line-clamp-2 leading-snug">{video.title}</h3>
                <p className="text-[10px] text-[#7A6B5D]/70">{video.duration}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
