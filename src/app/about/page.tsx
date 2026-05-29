'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { SEOHead } from '@/components/ui/seo-head'

export default function AboutPage() {
  return (
    <div className="pb-[136px]">
      <SEOHead
        title="About Osho.fm"
        description="Osho.fm is a volunteer-run listening platform offering thousands of free Osho audio discourses for meditation and self-discovery."
        url="/about"
      />
      <section className="py-12 sm:py-20 hero-gradient">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#7A6B5D] hover:text-[#1A1A1A] transition-colors mb-6 active:scale-95">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/40 text-xs font-medium text-[#7A6B5D] mb-5 shadow-sm">
              About
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.03em] text-[#1A1A1A] leading-[0.9] mb-6">
              What is Osho.fm?
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="max-w-2xl space-y-6 text-sm text-[#7A6B5D] leading-relaxed">
            <p>
              Osho.fm is a volunteer-run listening platform that makes thousands of Osho&rsquo;s audio discourses freely available to anyone, anywhere.
            </p>
            <p>
              Osho (1931–1990) was a spiritual teacher whose talks on meditation, awareness, love, and the mind continue to inspire millions. His discourses span decades and cover every dimension of human consciousness — from the practical to the profound.
            </p>
            <p>
              This site is a non-commercial, community-driven effort to preserve and share Osho&rsquo;s teachings. All audio is sourced from the public Archive.org collection. There are no ads, no paywalls, and no tracking.
            </p>
            <p>
              Not affiliated with Osho International Foundation.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
