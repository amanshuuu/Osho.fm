'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { SEOHead } from '@/components/ui/seo-head'

export default function TermsPage() {
  return (
    <div className="pb-[136px]">
      <SEOHead
        title="Terms of Service — Osho.fm"
        description="Osho.fm is a free, non-commercial platform. The audio content is sourced from public archives and is provided as-is."
        url="/terms"
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
              Terms
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.03em] text-[#1A1A1A] leading-[0.9] mb-6">
              Terms of Service
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="max-w-2xl space-y-6 text-sm text-[#7A6B5D] leading-relaxed">
            <h2 className="text-base font-semibold text-[#1A1A1A]">Use of Content</h2>
            <p>
              The audio discourses on Osho.fm are sourced from the public Archive.org collection and are provided for personal, non-commercial listening. You may listen to them freely, but redistribution or commercial use may require permission from the rights holders.
            </p>

            <h2 className="text-base font-semibold text-[#1A1A1A]">No Guarantees</h2>
            <p>
              This platform is provided &ldquo;as is&rdquo; without any warranty. We do our best to keep the site running, but we make no guarantees about uptime, availability, or accuracy of the content.
            </p>

            <h2 className="text-base font-semibold text-[#1A1A1A]">Non-Affiliation</h2>
            <p>
              Osho.fm is an independent, volunteer-run project. We are not affiliated with, endorsed by, or connected to Osho International Foundation or any related organization.
            </p>

            <h2 className="text-base font-semibold text-[#1A1A1A]">Limitation of Liability</h2>
            <p>
              The volunteers behind Osho.fm shall not be liable for any damages arising from the use of this site.
            </p>

            <h2 className="text-base font-semibold text-[#1A1A1A]">Changes</h2>
            <p>
              These terms may be updated. Continued use of the site after changes constitutes acceptance of the new terms.
            </p>

            <p className="text-xs text-[#7A6B5D]/60 pt-4">
              Last updated: May 2025
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
