'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, type Variants } from 'framer-motion'
import {
  Compass,
  Library,
  Sparkles,
  Heart,
  Clock,
  Settings,
  User,
  Home,
  Disc3,
  TrendingUp,
  Plus,
  HandHeart,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/language-provider'
import { useSupport } from '@/lib/support-context'

interface SidebarProps {
  open?: boolean
  onClose?: () => void
  className?: string
}

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    mql.addEventListener('change', (e) => setMatches(e.matches))
    return () => mql.removeEventListener('change', (e) => setMatches(e.matches))
  }, [query])
  return matches
}

const mainNav = (t: (key: string) => string) => [
  { icon: Home, label: t('home'), href: '/' },
  { icon: Compass, label: t('discover'), href: '/discover' },
  { icon: Library, label: t('categories'), href: '/categories' },
  { icon: Sparkles, label: t('dailyWisdom'), href: '/daily-wisdom' },
]

const libraryNav = (t: (key: string) => string) => [
  { icon: Heart, label: t('saved'), href: '/saved' },
  { icon: Clock, label: t('continueListening'), href: '/continue-listening' },
  { icon: Disc3, label: t('playlists'), href: '/playlist' },
  { icon: TrendingUp, label: t('trending'), href: '/discover' },
]

const bottomNav = (t: (key: string) => string) => [
  { icon: User, label: t('profile'), href: '/profile' },
  { icon: Settings, label: t('settings'), href: '/settings' },
]

const fadeIn = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
} satisfies Variants

export function Sidebar({ open = false, onClose, className }: SidebarProps) {
  const pathname = usePathname()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const visible = isDesktop
  const { t } = useTranslation()
  const { openSupport } = useSupport()

  const NavItem = ({ icon: Icon, label, href }: { icon: any; label: string; href: string }) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        onClick={() => { if (!isDesktop) onClose?.() }}
        className={cn(
          'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
          isActive
            ? 'bg-[#7A1A2E] text-white shadow-md shadow-[#7A1A2E]/20'
            : 'text-[#7A6B5D] hover:text-[#1A1A1A] hover:bg-[#F8F5F0]/80'
        )}
      >
        <Icon className={cn('w-[18px] h-[18px]', isActive ? 'text-white' : 'text-[#7A6B5D] group-hover:text-[#1A1A1A]')} />
        <span>{label}</span>
      </Link>
    )
  }

  return (
    <>

      <motion.aside
        animate={visible ? 'visible' : 'hidden'}
        variants={{
          visible: { width: 240, x: 0, transition: { type: 'spring', stiffness: 280, damping: 30 } },
          hidden: { width: 0, x: -240, transition: { type: 'spring', stiffness: 280, damping: 30 } },
        }}
        className={cn('fixed left-0 top-0 bottom-0 z-50 flex flex-col bg-[#FDFCF9] border-r border-[#E5DED4]/30 overflow-hidden', className)}
      >
        <div className="flex flex-col h-full">
          <div className="px-6 pt-5 pb-6 border-b border-[#E5DED4]/20">
            <span className="text-lg font-semibold tracking-tight text-[#1A1A1A]">Osho.fm</span>
            <p className="text-[9px] uppercase tracking-[0.15em] text-[#7A6B5D] font-medium">Inspired</p>
          </div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="flex-1 overflow-y-auto py-4 px-3 space-y-1"
          >
            <p className="px-4 pb-2 text-[9px] uppercase tracking-[0.15em] text-[#7A6B5D]/50 font-semibold">{t('browse')}</p>
            {mainNav(t).map(item => (
              <NavItem key={item.label} {...item} />
            ))}

            <div className="my-4 mx-4 h-px bg-gradient-to-r from-[#E5DED4]/60 via-[#E5DED4]/30 to-transparent" />

            <div className="px-4 pb-2">
              <p className="text-[9px] uppercase tracking-[0.15em] text-[#7A6B5D]/50 font-semibold">{t('library')}</p>
            </div>
            {libraryNav(t).map(item => (
              <NavItem key={item.label} {...item} />
            ))}
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="p-3 border-t border-[#E5DED4]/20 space-y-1"
          >
            {bottomNav(t).map(item => (
              <NavItem key={item.label} {...item} />
            ))}
            <button
              onClick={openSupport}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left text-[#7A6B5D] hover:text-[#1A1A1A] hover:bg-[#F8F5F0]/80"
            >
              <HandHeart className="w-[18px] h-[18px] text-[#7A6B5D]" />
              <span>{t('support') || 'Support'}</span>
            </button>
          </motion.div>
        </div>
      </motion.aside>
    </>
  )
}
