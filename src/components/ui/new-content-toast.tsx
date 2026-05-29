'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'

const SEEN_KEY = 'osho-fm-seen-version'

interface Meta {
  version: number
  lastUpdated: string
  totalDiscourses: number
}

export function NewContentToast() {
  const [meta, setMeta] = useState<Meta | null>(null)
  const [dismissed, setDismissed] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    fetch('/meta.json')
      .then(r => r.json())
      .then((data: Meta) => {
        setMeta(data)
        const seen = parseInt(localStorage.getItem(SEEN_KEY) || '0')
        if (data.version > seen) {
          setTimeout(() => setShow(true), 1000)
        }
      })
      .catch(() => {})
  }, [])

  const handleDismiss = () => {
    setShow(false)
    setDismissed(true)
    if (meta) localStorage.setItem(SEEN_KEY, String(meta.version))
  }

  if (!meta || dismissed) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-sm"
        >
          <div className="bg-[#7A1A2E] text-white rounded-2xl shadow-xl px-5 py-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-white/80" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">New content added</p>
              <p className="text-xs text-white/70 mt-0.5">
                {meta.totalDiscourses} discourses now available
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
