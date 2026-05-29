'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Hero } from '@/components/home/hero'
import { FeaturedSection } from '@/components/home/featured-row'
import { CategoryScroll } from '@/components/home/category-scroll'
import { TrendingSection } from '@/components/home/trending-section'
import { CollectionsSection } from '@/components/home/collections-section'
import { DailyQuote } from '@/components/home/daily-quote'
import { BeginnerSection } from '@/components/home/beginner-section'
import { Testimonials } from '@/components/home/testimonials'
import { VideoSection } from '@/components/home/video-section'
import { SEOHead } from '@/components/ui/seo-head'
import { useSupport } from '@/lib/support-context'

export default function HomePage() {
  const { openSupport } = useSupport()

  return (
    <>
      <SEOHead
        title="Listen to Osho Discourses — Free Audio Library"
        description="Discover thousands of Osho audio discourses for meditation, mindfulness, and self-discovery. Listen free. Topics include awareness, love, meditation, and the mind."
        url="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Osho.fm",
          "url": "https://osho.fm",
          "description": "Free Osho audio discourses for meditation and self-discovery",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://osho.fm/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <Hero />
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFCF9] via-[#FDFCF9] to-[#F8F5F0]/40 pointer-events-none" />
        <div className="relative">
          <FeaturedSection />
          <VideoSection />
          <CategoryScroll />
          <TrendingSection />
          <DailyQuote />
          <CollectionsSection />
          <BeginnerSection />
          <Testimonials />
        </div>
      </div>
      <footer className="py-16 border-t border-[#E5DED4]/30 bg-[#F8F5F0]/30">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div>
              <span className="text-sm font-semibold text-[#1A1A1A] mb-4 block">Osho.fm</span>
              <p className="text-xs text-[#7A6B5D] leading-relaxed max-w-[200px]">
                A listening platform inspired by Osho teachings. Not affiliated with Osho International Foundation.
              </p>
            </div>
            {[
              { title: 'Explore', links: [
                { label: 'Discover', href: '/discover' },
                { label: 'Categories', href: '/categories' },
                { label: 'Daily Wisdom', href: '/daily-wisdom' },
                { label: 'Trending', href: '/discover' },
              ]},
              { title: 'Library', links: [
                { label: 'Saved', href: '/saved' },
                { label: 'Playlists', href: '/playlist' },
                { label: 'Continue Listening', href: '/continue-listening' },
              ]},
              { title: 'About', links: [
                { label: 'About', href: '/about' },
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
              ]},
              { title: 'Support', links: [] },
            ].map(col => (
              <div key={col.title}>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#7A6B5D]/60 font-semibold mb-4">{col.title}</p>
                {col.title === 'Support' ? (
                  <button
                    onClick={openSupport}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#7A1A2E] text-white text-sm font-medium hover:bg-[#8B2A3E] transition-all active:scale-95"
                  >
                    <Heart className="w-4 h-4" />
                    Support the Platform
                  </button>
                ) : (
                  <ul className="space-y-2.5">
                    {col.links.map(link => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-sm text-[#7A6B5D] hover:text-[#1A1A1A] transition-colors">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-[#E5DED4]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#7A6B5D]/60">
              &copy; {new Date().getFullYear()} · Inspired by Osho teachings. Not affiliated with Osho International Foundation.
            </p>
            <p className="text-[10px] text-[#7A6B5D]/40">
              Made with stillness.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
