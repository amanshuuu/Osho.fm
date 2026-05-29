'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { User, Clock, Bookmark, Heart, Settings, ChevronRight, Sparkles, Headphones } from 'lucide-react'
import { Artwork } from '@/components/ui/artwork'
import { discourses } from '@/lib/data'
import { SEOHead } from '@/components/ui/seo-head'

export default function ProfilePage() {
  const recentDiscourses = discourses.slice(0, 3)

  return (
    <div className="pb-[136px]">
      <SEOHead
        title="Your Profile"
        description="Your listening stats, saved discourses, and preferences."
        url="/profile"
        noindex={true}
      />
      <section className="py-10 sm:py-12 hero-gradient">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-5 sm:gap-6"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 ring-2 ring-[#E5DED4]/50 relative">
              <Image src="/images/osho-portrait.jpg" alt="Osho" fill className="object-cover object-top" sizes="80px" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-semibold text-[#1A1A1A]">Listener</h1>
              <p className="text-sm text-[#7A6B5D]">Started listening May 2026</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#7A6B5D]">
                <span className="flex items-center gap-1">
                  <Headphones className="w-3.5 h-3.5" />
                  12 discourses
                </span>
                <span className="w-px h-3 bg-[#E5DED4] hidden sm:block" />
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  14h 30m
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-sm font-medium text-[#1A1A1A] mb-3">Continue Listening</h2>
                <div className="space-y-1 sm:space-y-2">
                  {recentDiscourses.map((d, i) => (
                    <Link key={d.id} href={`/discourse/${d.id}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8F5F0] transition-colors active:bg-[#F0ECE6]"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          <Artwork thumbnail={d.thumbnail} gradient={d.gradient} className="w-full h-full" overlay={false} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#1A1A1A] truncate">{d.title}</p>
                          <p className="text-xs text-[#7A6B5D]">{d.series}</p>
                        </div>
                        <span className="text-xs text-[#7A6B5D] shrink-0">{d.duration}</span>
                        <div className="w-20 sm:w-24 h-1 rounded-full bg-[#E5DED4] shrink-0">
                          <div
                            className="h-full rounded-full bg-[#7A1A2E]"
                            style={{ width: `${(i + 1) * 25}%` }}
                          />
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { icon: Bookmark, label: 'Saved Discourses', value: '5', href: '/saved' },
                { icon: Heart, label: 'Favorites', value: '3', href: '/saved' },
                { icon: Clock, label: 'Listening Time', value: '14h 30m', href: '/profile' },
              ].map((item, i) => (
                <Link key={i} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-[#E5DED4]/50 hover:bg-white/80 transition-colors active:bg-white/90"
                  >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F8F5F0] flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-[#7A6B5D]" />
                      </div>
                      <div>
                          <p className="text-sm font-medium text-[#1A1A1A]">{item.label}</p>
                          <p className="text-xs text-[#7A6B5D]">{item.value}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#7A6B5D]" />
                  </motion.div>
                </Link>
              ))}
              <Link href="/settings">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-[#E5DED4]/50 hover:bg-white/80 transition-colors active:bg-white/90 mt-3 sm:mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F8F5F0] flex items-center justify-center">
                      <Settings className="w-4 h-4 text-[#7A6B5D]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1A1A1A]">Settings</p>
                      <p className="text-xs text-[#7A6B5D]">Preferences, account, player</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#7A6B5D]" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
