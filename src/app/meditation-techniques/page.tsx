'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, Play, Clock, ArrowRight, BookOpen, Flame, Wind, Brain, Heart, Eye } from 'lucide-react'
import { useDiscourseContext } from '@/lib/discourse-context'
import { SEOHead } from '@/components/ui/seo-head'

const techniques = [
  {
    name: "Vigyan Bhairav Tantra",
    description: "Osho's commentary on the 112 meditation techniques from the ancient Tantric text. The most comprehensive manual of meditation ever compiled.",
    techniques: 112,
    series: "Vigyan Bhairav Tantra: The Book of Secrets",
    color: "from-[#8B3A3A] to-[#5C1A1A]",
    icon: Flame,
  },
  {
    name: "Dynamic Meditation",
    description: "Osho's most famous active meditation. Five stages combining cathartic movement, screaming, jumping, freezing, and dancing to release repressed energies.",
    techniques: 5,
    series: "Meditation: The First and Last Freedom",
    color: "from-[#3D5A5C] to-[#1A3A3C]",
    icon: Wind,
  },
  {
    name: "Kundalini Meditation",
    description: "A gentle shaking meditation in four stages that helps energy rise through the spine. Perfect for those who find sitting still difficult.",
    techniques: 4,
    series: "Meditation: The First and Last Freedom",
    color: "from-[#5A3A6B] to-[#3A1A5C]",
    icon: Brain,
  },
  {
    name: "Nadabrahma Meditation",
    description: "A humming meditation based on ancient Tibetan and Tantric sound techniques. Uses vibration to create inner stillness.",
    techniques: 3,
    series: "Meditation: The First and Last Freedom",
    color: "from-[#3A5A6B] to-[#1A3A5C]",
    icon: Eye,
  },
  {
    name: "Gourishankar Meditation",
    description: "A two-stage meditation combining gentle breathing with silent witnessing. Helps access spaces of subtle energy and inner peace.",
    techniques: 2,
    series: "Meditation: The First and Last Freedom",
    color: "from-[#6B5A3A] to-[#5C3A1A]",
    icon: Heart,
  },
  {
    name: "Whirling Meditation",
    description: "Based on the Sufi tradition, this meditation involves spinning like a child to reach a state of ecstatic awareness. One of the most dynamic Osho techniques.",
    techniques: 2,
    series: "Meditation: The First and Last Freedom",
    color: "from-[#6B3A3A] to-[#5C1A1A]",
    icon: Wind,
  },
  {
    name: "Mandala Meditation",
    description: "A four-stage Tibetan Buddhist technique using breathing, gentle movement, and stillness to create a sacred circle of awareness.",
    techniques: 4,
    series: "Meditation: The First and Last Freedom",
    color: "from-[#3A6B5A] to-[#1A5C3A]",
    icon: Eye,
  },
  {
    name: "No-Mind Meditation",
    description: "A chaotic gibberish stage followed by silent witnessing. The gibberish empties the mind, creating space for silence to arise naturally.",
    techniques: 2,
    series: "No Mind: The Flowers of Eternity",
    color: "from-[#5A5A6B] to-[#3A3A5C]",
    icon: Brain,
  },
  {
    name: "Devavani Meditation",
    description: "A gentle, lying-down meditation where you allow unknown sounds and words to arise. Creates a deep relaxation and connection with the subconscious.",
    techniques: 2,
    series: "Meditation: The First and Last Freedom",
    color: "from-[#6B5A5A] to-[#5C3A3A]",
    icon: Heart,
  },
  {
    name: "Heart Chakra Meditation",
    description: "A green-light visualization focusing on the heart center. Opens the heart chakra and allows love to flow naturally.",
    techniques: 2,
    series: "The Book of Secrets",
    color: "from-[#3A6B3A] to-[#1A5C1A]",
    icon: Heart,
  },
  {
    name: "Breathing Meditation",
    description: "Awareness of breath without manipulation. Watch your natural breath — the rise and fall, the gaps between — and let silence follow.",
    techniques: 5,
    series: "The Book of Wisdom",
    color: "from-[#3A5A5A] to-[#1A3A3A]",
    icon: Wind,
  },
  {
    name: "Walking Meditation",
    description: "Walk slowly with full awareness of each step. Feel the earth beneath your feet, the air on your skin. A meditation for those who find stillness in motion.",
    techniques: 3,
    series: "Zen: The Path of Paradox",
    color: "from-[#5A6B3A] to-[#3A5C1A]",
    icon: Eye,
  },
]

export default function MeditationTechniquesPage() {
  const { discourses } = useDiscourseContext()
  const tantraDiscourses = discourses.filter(d => d.series.toLowerCase().includes('vigyan') || d.series.toLowerCase().includes('book of secrets')).slice(0, 8)
  const meditationDiscourses = discourses.filter(d => d.category === 'Meditation').slice(0, 8)

  return (
    <div className="pb-[136px]">
      <SEOHead
        title="Osho Meditation Techniques — 112 Ways to Meditate"
        description="Discover Osho's meditation techniques including Dynamic, Kundalini, Vigyan Bhairav Tantra, Nadabrahma, and more. Step-by-step guides for every seeker."
        url="/meditation-techniques"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "name": "Osho Meditation Techniques",
          "description": "Discover Osho's meditation techniques including Dynamic, Kundalini, Vigyan Bhairav Tantra, and more.",
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
              <Flame className="w-3.5 h-3.5" />
              Meditation Techniques
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.03em] text-[#1A1A1A] leading-[0.9] mb-4">
              Osho Meditation Techniques
            </h1>
            <p className="text-base sm:text-xl text-[#7A6B5D] max-w-2xl leading-relaxed">
              From Osho&rsquo;s commentary on 112 Tantric techniques to his own active meditations — explore the full spectrum of meditation methods
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] mb-4">More Than a Technique</h2>
            <p className="text-sm sm:text-base text-[#7A6B5D] leading-relaxed">
              Osho offered over 100 meditation techniques to suit every temperament. Whether you are active or passive, intellectual or emotional, alone or in a group — there is a meditation for you. The key is not the technique itself, but the awareness you bring to it.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-14 sm:pb-20">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {techniques.map((t, i) => {
              const Icon = t.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative rounded-2xl overflow-hidden bg-white/55 backdrop-blur-xl border border-[#E5DED4]/20 p-6 transition-all duration-400 hover:shadow-xl hover:shadow-[#7A1A2E]/5 hover:border-[#C9953D]/20"
                >
                  <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-[0.06] bg-gradient-to-br ${t.color}`} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-[#F8F5F0] flex items-center justify-center mb-4 group-hover:bg-[#E5DED4]/80 transition-colors shadow-inner">
                      <Icon className="w-6 h-6 text-[#7A6B5D]" />
                    </div>
                    <h3 className="text-base font-semibold text-[#1A1A1A] mb-2">{t.name}</h3>
                    <p className="text-xs text-[#7A6B5D] leading-relaxed mb-3 line-clamp-3">{t.description}</p>
                    <div className="flex items-center gap-3 text-[10px] text-[#7A6B5D]/60">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {t.techniques} variations
                      </span>
                      <span className="text-[#E5DED4]">|</span>
                      <span className="italic">{t.series}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {tantraDiscourses.length > 0 && (
        <section className="py-10 sm:py-14 bg-[#F8F5F0]/30 border-y border-[#E5DED4]/20">
          <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] mb-2">Listen to Osho on Meditation Techniques</h2>
            <p className="text-sm text-[#7A6B5D] mb-8 max-w-xl">Deepen your practice with discourses from Osho's meditation series</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {[...new Map(tantraDiscourses.map(d => [d.series, d])).values()].slice(0, 4).map((d, i) => (
                <Link key={d.id} href={`/discourse/${d.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    whileHover={{ y: -3, scale: 1.015 }}
                    className="group relative rounded-2xl overflow-hidden bg-white/55 backdrop-blur-xl border border-[#E5DED4]/20 p-5 transition-all duration-400 hover:shadow-xl hover:shadow-[#7A1A2E]/5"
                  >
                    <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${d.gradient}`} />
                    <div className="relative z-10">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-[#7A6B5D]/70 font-medium mb-2">{d.category}</p>
                      <h3 className="text-sm font-semibold text-[#1A1A1A] leading-snug line-clamp-2 mb-3">{d.series.length > 40 ? d.series.slice(0, 40) + '...' : d.series}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-[#7A6B5D]/80">
                        <BookOpen className="w-3 h-3" />
                        <span>{d.language === 'hindi' ? 'हिंदी' : 'English'}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/categories" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7A1A2E] text-white text-sm font-medium hover:bg-[#8B2A3E] transition-all active:scale-95">
                Browse by Category
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-10 sm:py-14">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl bg-gradient-to-br from-[#7A1A2E] to-[#5C0F20] rounded-2xl sm:rounded-[2rem] p-8 sm:p-12 text-white">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-4">The 112 Techniques of Vigyan Bhairav Tantra</h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
              Osho&rsquo;s most comprehensive series on meditation, Vigyan Bhairav Tantra, reveals 112 techniques drawn from the ancient Tantric tradition. These techniques cover every possible approach — from breathing, to visualization, to movement, to simply sitting. Osho said that if you try all 112, at least one is guaranteed to work for you.
            </p>
            <Link href="/discover" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-sm font-medium hover:bg-white/20 transition-all active:scale-95">
              Explore the Series
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
