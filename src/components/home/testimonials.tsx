'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  { text: "This is how Osho was always meant to be experienced. Beautiful, modern, and deeply peaceful.", author: "Anand M.", role: "Meditation practitioner" },
  { text: "Finally, a place where I can discover Osho by how I feel, not by memorizing discourse names.", author: "Priya S.", role: "Daily listener" },
  { text: "The quality of the experience makes me want to listen more. It's like Apple Music for consciousness.", author: "Nikhil R.", role: "Software engineer" },
]

export function Testimonials() {
  return (
    <section className="py-16 sm:py-28">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F8F5F0]/80 text-xs font-medium text-[#7A6B5D] mb-4">
            <Quote className="w-3 h-3" />
            Community
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1A1A]">Loved by listeners</h2>
          <p className="text-sm sm:text-base text-[#7A6B5D] mt-2">Join thousands finding peace through conscious listening</p>
        </motion.div>
        <div className="hidden sm:grid sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white/60 backdrop-blur-xl rounded-2xl border border-[#E5DED4]/40 p-6 hover:bg-white/80 hover:border-[#C9953D]/30 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Quote className="w-6 h-6 text-[#7A6B5D]/20 mb-4" />
              <p className="text-sm text-[#7A6B5D] leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-3 border-t border-[#E5DED4]/30">
                <div className="w-8 h-8 rounded-full bg-[#F8F5F0] flex items-center justify-center text-xs font-medium text-[#7A6B5D]">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A]">{t.author}</p>
                  <p className="text-xs text-[#7A6B5D]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex sm:hidden gap-4 overflow-x-auto hide-scrollbar snap-x-mandatory scroll-smooth -mx-5 px-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[80vw] max-w-[300px] bg-white/60 backdrop-blur-xl rounded-2xl border border-[#E5DED4]/40 p-6"
            >
              <Quote className="w-6 h-6 text-[#7A6B5D]/20 mb-4" />
              <p className="text-sm text-[#7A6B5D] leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-3 border-t border-[#E5DED4]/30">
                <div className="w-8 h-8 rounded-full bg-[#F8F5F0] flex items-center justify-center text-xs font-medium text-[#7A6B5D]">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A]">{t.author}</p>
                  <p className="text-xs text-[#7A6B5D]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
