'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Compass, Search, Bookmark, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/language-provider'

export function MobileNav() {
  const pathname = usePathname()
  const { t } = useTranslation()

  const items = [
    { icon: Home, label: t('home'), href: '/' },
    { icon: Compass, label: t('discover'), href: '/discover' },
    { icon: Search, label: t('search'), href: '/search' },
    { icon: Bookmark, label: t('saved'), href: '/saved' },
    { icon: User, label: t('profile'), href: '/profile' },
  ]

  return (
    <motion.nav
      initial={{ y: 60 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.1 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDFCF9]/85 backdrop-blur-2xl border-t border-[#E5DED4]/50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around py-1 px-1">
        {items.map(item => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-colors duration-200 min-w-[64px]',
                isActive ? 'text-[#7A1A2E]' : 'text-[#7A6B5D] active:text-[#1A1A1A]'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-xl bg-[#7A1A2E]/8"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <item.icon className={cn('w-[22px] h-[22px] relative', isActive ? 'stroke-[1.8]' : 'stroke-[1.4]')} />
              <span className={cn('text-[10px] font-medium tracking-tight relative', isActive && 'font-semibold')}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}
