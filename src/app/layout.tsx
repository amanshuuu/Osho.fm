'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Geist, Geist_Mono } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { MobileNav } from '@/components/layout/mobile-nav'
import { AudioPlayer } from '@/components/layout/audio-player'
import { NewContentToast } from '@/components/ui/new-content-toast'
import { PlayerProvider } from '@/lib/player-context'
import { DiscourseProvider } from '@/lib/discourse-context'
import { LanguageProvider } from '@/lib/language-provider'
import { SavedProvider } from '@/lib/saved-context'
import { SupportProvider } from '@/lib/support-context'
import { SEOHead } from '@/components/ui/seo-head'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(true)

  if (!mounted) {
    return (
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <head>
          <title>Osho.fm — Listen to Osho Discourses</title>
          <meta name="description" content="Discover thousands of Osho audio discourses. Meditate, learn, and grow with the wisdom of Osho." />
          <meta name="theme-color" content="#7A1A2E" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="apple-touch-icon" href="/favicon.ico" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Osho.fm" />
        </head>
        <body className="bg-[#FDFCF9] text-[#1A1A1A] min-h-[100dvh]">
          <PlayerProvider>
            {children}
          </PlayerProvider>
        </body>
      </html>
    )
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <title>Osho.fm — Listen to Osho Discourses</title>
        <meta name="description" content="Discover thousands of Osho audio discourses. Meditate, learn, and grow with the wisdom of Osho." />
        <meta name="theme-color" content="#7A1A2E" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Osho.fm" />
      </head>
      <body className="bg-[#FDFCF9] text-[#1A1A1A]">
        <LanguageProvider>
          <DiscourseProvider>
          <SavedProvider>
          <SupportProvider>
          <PlayerProvider>
            <div className="flex h-[100dvh] overflow-hidden">
              <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <div className="flex-1 flex flex-col min-w-0 lg:pl-60">
                <Header />
                <main className="flex-1 overflow-y-auto overflow-x-hidden pb-[136px] lg:pb-24 scroll-smooth">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={pathname}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      {children}
                    </motion.div>
                  </AnimatePresence>
                </main>
              </div>
            </div>
            <MobileNav />
            <AudioPlayer />
            <NewContentToast />
          </PlayerProvider>
          </SupportProvider>
          </SavedProvider>
          </DiscourseProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
