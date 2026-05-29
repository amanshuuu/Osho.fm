'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { SEOHead } from '@/components/ui/seo-head'

export default function PrivacyPage() {
  return (
    <div className="pb-[136px]">
      <SEOHead
        title="Privacy Policy — Osho.fm"
        description="Osho.fm does not collect personal data. No cookies, no tracking, no analytics. Your privacy is fully respected."
        url="/privacy"
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
              Privacy
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.03em] text-[#1A1A1A] leading-[0.9] mb-6">
              Privacy Policy
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="max-w-2xl space-y-6 text-sm text-[#7A6B5D] leading-relaxed">
            <h2 className="text-base font-semibold text-[#1A1A1A]">Data Collection</h2>
            <p>
              Osho.fm does not collect, store, or share any personal data. We do not use cookies, analytics services, trackers, or third-party scripts that collect your information.
            </p>

            <h2 className="text-base font-semibold text-[#1A1A1A]">Local Storage</h2>
            <p>
              The site uses your browser&rsquo;s localStorage to remember your preferences (language, saved/bookmarked discourses, listening progress). This data stays on your device and is never transmitted anywhere.
            </p>

            <h2 className="text-base font-semibold text-[#1A1A1A]">External Content</h2>
            <p>
              Audio is streamed directly from Archive.org. Thumbnails are loaded from YouTube&rsquo;s CDN and Archive.org. These services may have their own logging policies beyond our control.
            </p>

            <h2 className="text-base font-semibold text-[#1A1A1A]">No Third-Party Sharing</h2>
            <p>
              We do not sell, rent, or share any user information because we don&rsquo;t have any. Your visit is private.
            </p>

            <h2 className="text-base font-semibold text-[#1A1A1A]">Changes</h2>
            <p>
              This policy may be updated occasionally. Changes will be posted on this page.
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
