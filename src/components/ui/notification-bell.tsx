'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, BellDot, Sparkles, X } from 'lucide-react'

const SEEN_KEY = 'osho-fm-seen-version'

interface Meta {
  version: number
  lastUpdated: string
  totalDiscourses: number
}

export function NotificationBell() {
  const [meta, setMeta] = useState<Meta | null>(null)
  const [hasNew, setHasNew] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch('/meta.json')
      .then(r => r.json())
      .then((data: Meta) => {
        setMeta(data)
        const seen = parseInt(localStorage.getItem(SEEN_KEY) || '0')
        if (data.version > seen) setHasNew(true)
      })
      .catch(() => {})
  }, [])

  const handleDismiss = () => {
    setHasNew(false)
    setOpen(false)
    if (meta) localStorage.setItem(SEEN_KEY, String(meta.version))
  }

  if (!meta) return null

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0ECE6] transition-colors active:scale-90"
        aria-label="Notifications"
      >
        {hasNew ? (
          <BellDot className="w-[18px] h-[18px] text-[#7A1A2E]" />
        ) : (
          <Bell className="w-[18px] h-[18px] text-[#7A6B5D]" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#E5DED4]/60 overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b border-[#E5DED4]/30 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1A1A1A]">Updates</span>
              <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-[#F8F5F0] transition-colors">
                <X className="w-3.5 h-3.5 text-[#7A6B5D]" />
              </button>
            </div>
            <div className="p-3">
              {hasNew ? (
                <div className="p-3 rounded-xl bg-[#F8F5F0]/80 border border-[#E5DED4]/30">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#7A1A2E] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1A1A1A]">New content added</p>
                      <p className="text-xs text-[#7A6B5D] mt-0.5">
                        {meta.totalDiscourses} discourses now available
                      </p>
                      <p className="text-[10px] text-[#7A6B5D]/60 mt-1">
                        Updated {meta.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDismiss}
                    className="mt-2 w-full text-xs py-1.5 rounded-full bg-[#7A1A2E] text-white font-medium hover:bg-[#9C2D42] transition-colors"
                  >
                    Got it
                  </button>
                </div>
              ) : (
                <p className="text-xs text-[#7A6B5D] text-center py-4">No new updates</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
