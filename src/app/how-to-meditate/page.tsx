'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, Play, Clock, Brain, Moon, Wind, Sparkles, ArrowRight, BookOpen } from 'lucide-react'
import { useDiscourseContext } from '@/lib/discourse-context'
import { SEOHead } from '@/components/ui/seo-head'

const steps = [
  {
    title: "Find a Comfortable Space",
    text: "You don't need a special room or equipment. Sit comfortably — on a chair, cushion, or the floor. The posture that matters is not of the body but of the mind.",
    tip: "Osho says: 'The real meditation begins when you are so comfortable that you forget your body completely.'",
    icon: Moon,
  },
  {
    title: "Observe Your Breath",
    text: "Don't try to control your breathing. Simply watch it — the inhalation, the exhalation, the gap between them. This watching is the first step of meditation.",
    tip: "Just 2-3 minutes of breath awareness can settle a restless mind.",
    icon: Wind,
  },
  {
    title: "Don't Fight Your Thoughts",
    text: "Thoughts will come — that's natural. Don't try to stop them. Simply watch them like clouds passing in the sky. You are the sky, not the clouds.",
    tip: "Osho says: 'Thoughts are like clouds passing in the sky. You are the sky, not the clouds.'",
    icon: Brain,
  },
  {
    title: "Gradually Expand Awareness",
    text: "From watching your breath, expand to watching your body, your feelings, your surroundings. This witnessing awareness is the essence of all meditation.",
    tip: "Start with 5 minutes a day. Consistency matters more than duration.",
    icon: Sparkles,
  },
]

export default function HowToMeditatePage() {
  const { discourses } = useDiscourseContext()
  const [activeStep, setActiveStep] = useState(0)

  const meditationDiscourses = discourses.filter(d => d.category === 'Meditation').slice(0, 8)

  return (
    <div className="pb-[136px]">
      <SEOHead
        title="How to Meditate — A Beginner's Guide by Osho"
        description="Learn how to meditate with Osho's timeless wisdom. A simple beginner's guide to meditation, awareness, and inner stillness. Start your meditation journey today."
        url="/how-to-meditate"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "name": "How to Meditate — A Beginner's Guide",
          "description": "Learn how to meditate with Osho's timeless wisdom. A simple beginner's guide to meditation, awareness, and inner stillness.",
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
              <BookOpen className="w-3.5 h-3.5" />
              Beginner's Guide
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.03em] text-[#1A1A1A] leading-[0.9] mb-4">
              How to Meditate
            </h1>
            <p className="text-base sm:text-xl text-[#7A6B5D] max-w-2xl leading-relaxed">
              A simple guide to starting your meditation practice, based on the timeless wisdom of Osho&rsquo;s discourses
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1A1A] mb-4">Meditation Is Simple</h2>
              <p className="text-sm sm:text-base text-[#7A6B5D] leading-relaxed mb-6">
                Osho taught that meditation is not a technique you do — it is a state of being you discover. You don't need to sit in a lotus position for hours or chant mantras. The simplest act of watching your own mind with awareness is meditation.
              </p>
              <p className="text-sm sm:text-base text-[#7A6B5D] leading-relaxed mb-10">
                The word meditation comes from the same root as medicine — both are about healing, wholing, making whole. Meditation is not about escaping life, but about living it with total awareness.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-14 sm:pb-20">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] mb-8">4 Simple Steps to Begin</h2>
          <div className="grid gap-4 sm:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isActive = activeStep === i
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveStep(i)}
                  className={`rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'bg-white/80 backdrop-blur-xl border-[#C9953D]/30 shadow-lg shadow-[#7A1A2E]/5'
                      : 'bg-white/40 backdrop-blur-sm border-[#E5DED4]/20 hover:bg-white/60 hover:border-[#E5DED4]/40'
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-[#7A1A2E] text-white shadow-md shadow-[#7A1A2E]/20' : 'bg-[#F8F5F0] text-[#7A6B5D]'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] uppercase tracking-[0.15em] text-[#7A6B5D]/50 font-semibold">Step {i + 1}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C9953D]" />}
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-[#1A1A1A] mb-2">{step.title}</h3>
                      <p className="text-sm text-[#7A6B5D] leading-relaxed">{step.text}</p>
                      {isActive && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 p-4 rounded-xl bg-[#F8F5F0]/80 border border-[#E5DED4]/20">
                          <p className="text-xs text-[#7A6B5D] italic">{step.tip}</p>
                        </motion.div>
                      )}
                    </div>
                    <div className={`text-[10px] text-[#7A6B5D]/40 font-mono shrink-0 ${isActive ? 'text-[#C9953D]' : ''}`}>
                      0{i + 1}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {meditationDiscourses.length > 0 && (
        <section className="py-10 sm:py-14 bg-[#F8F5F0]/30 border-y border-[#E5DED4]/20">
          <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] mb-2">Listen to Osho on Meditation</h2>
            <p className="text-sm text-[#7A6B5D] mb-8 max-w-xl">Let Osho guide you deeper with his discourses on meditation</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {meditationDiscourses.map((d, i) => (
                <Link key={d.id} href={`/discourse/${d.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    whileHover={{ y: -3, scale: 1.015 }}
                    className="group relative rounded-2xl overflow-hidden bg-white/55 backdrop-blur-xl border border-[#E5DED4]/20 p-4 transition-all duration-400 hover:shadow-xl hover:shadow-[#7A1A2E]/5"
                  >
                    <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${d.gradient}`} />
                    <div className="relative z-10">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-[#7A6B5D]/70 font-medium mb-2 line-clamp-1">{d.series}</p>
                      <h3 className="text-sm font-semibold text-[#1A1A1A] leading-snug line-clamp-2 mb-3">{d.title}</h3>
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
                Browse All Discourses
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-10 sm:py-14">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] mb-6">Common Questions About Meditation</h2>
            <div className="space-y-4">
              {[
                { q: "How long should I meditate?", a: "Start with 5-10 minutes daily. Consistency is far more important than duration. Osho said even a few moments of authentic meditation are more valuable than hours of forced sitting." },
                { q: "What if I can't stop my thoughts?", a: "You don't need to stop them. Just watch them. The moment you become aware that you are thinking, you are already out of the thought. That gap of awareness is meditation." },
                { q: "Is meditation a religious practice?", a: "No. Meditation is a science of inner transformation. Osho made meditation accessible to people of all backgrounds — no belief system required." },
                { q: "Do I need to sit cross-legged?", a: "Not at all. Sit in any position that keeps your spine relatively straight and alert. A chair works perfectly. The meditation happens inside you, not in your legs." },
              ].map((faq, i) => (
                <details key={i} className="group rounded-2xl bg-white/40 backdrop-blur-sm border border-[#E5DED4]/20 overflow-hidden">
                  <summary className="list-none p-5 sm:p-6 cursor-pointer text-sm font-semibold text-[#1A1A1A] hover:text-[#7A1A2E] transition-colors flex items-center justify-between">
                    {faq.q}
                    <ChevronLeft className="w-4 h-4 text-[#7A6B5D]/40 group-open:-rotate-90 transition-transform duration-300 shrink-0 ml-2" />
                  </summary>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <p className="text-sm text-[#7A6B5D] leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
