'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Bell, User } from 'lucide-react'
import { SearchModal } from '@/components/ui/search-modal'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/language-provider'

interface HeaderProps {
  className?: string
}

const navLinks = (t: (k: string) => string) => [
  { label: t('home'), href: '/' },
  { label: t('discover'), href: '/discover' },
  { label: t('categories'), href: '/categories' },
  { label: t('dailyWisdom'), href: '/daily-wisdom' },
]

export function Header({ className }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <>
      <header className={cn('sticky top-0 z-40', className)}>
        <div className="absolute inset-0 bg-[#FDFCF9]/75 backdrop-blur-2xl border-b border-[#E5DED4]/40" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }} />
        <div className="relative flex items-center justify-between px-4 lg:px-8 h-[56px] max-w-screen-2xl mx-auto">
           <div className="flex items-center gap-3">
              <span className="text-base font-semibold tracking-tight text-[#1A1A1A]">Osho.fm</span>
           </div>

          <div className="hidden md:flex items-center gap-1 bg-[#F8F5F0]/60 rounded-full p-0.5 border border-[#E5DED4]/20">
            {navLinks(t).map(({ label, href }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors duration-200',
                    isActive ? 'text-[#1A1A1A]' : 'text-[#7A6B5D] hover:text-[#1A1A1A]'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-11 h-11 rounded-full bg-[#F8F5F0]/80 flex items-center justify-center hover:bg-[#E5DED4]/80 transition-colors active:scale-90"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-[#7A6B5D]" />
            </button>
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="w-11 h-11 rounded-full bg-[#F8F5F0]/80 flex items-center justify-center hover:bg-[#E5DED4]/80 transition-colors relative active:scale-90"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-[#7A6B5D]" />
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#7A1A2E] ring-2 ring-[#FDFCF9]" />
              </button>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-72 bg-white rounded-xl shadow-xl border border-[#E5DED4]/40 p-4">
                    <p className="text-sm font-medium text-[#1A1A1A] mb-3">{t('notifications')}</p>
                    <p className="text-xs text-[#7A6B5D]">{t('notificationsEmpty')}</p>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => router.push('/profile')}
              className="hidden md:flex w-11 h-11 rounded-full bg-[#F8F5F0]/80 flex items-center justify-center hover:bg-[#E5DED4]/80 transition-colors active:scale-90"
              aria-label="Profile"
            >
              <User className="w-5 h-5 text-[#7A6B5D]" />
            </button>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
