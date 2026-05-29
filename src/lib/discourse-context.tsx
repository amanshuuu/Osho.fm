'use client'

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react'
import type { Discourse } from '@/types'
import { discourses as curatedDiscourses } from '@/lib/data'

interface DiscourseContextValue {
  discourses: Discourse[]
  loading: boolean
  getDiscourse: (id: string) => Discourse | undefined
  search: (query: string) => Discourse[]
  filter: (opts: { language?: string; category?: string; series?: string }) => Discourse[]
}

const DiscourseContext = createContext<DiscourseContextValue | null>(null)

function mergeCurated(all: Discourse[]): Discourse[] {
  const merged = [...all]
  const bySeries = new Map<string, Discourse[]>()
  for (const d of merged) {
    const list = bySeries.get(d.series) || []
    list.push(d)
    bySeries.set(d.series, list)
  }
  for (const [, list] of bySeries) {
    list.sort((a, b) => (a.trackNumber ?? 0) - (b.trackNumber ?? 0))
  }
  const seriesIndex = new Map<string, number>()
  for (const c of curatedDiscourses) {
    const idx = seriesIndex.get(c.series) ?? 0
    const list = bySeries.get(c.series)
    if (list && idx < list.length) {
      const existing = list[idx]
      Object.assign(existing, c, { audioUrl: existing.audioUrl || c.audioUrl })
      seriesIndex.set(c.series, idx + 1)
    } else {
      merged.push(c)
    }
  }
  return merged
}

export function DiscourseProvider({ children }: { children: ReactNode }) {
  const [discourses, setDiscourses] = useState<Discourse[]>(curatedDiscourses)
  const [loading, setLoading] = useState(true)
  const cache = useRef<Map<string, Discourse>>(new Map())

  useEffect(() => {
    curatedDiscourses.forEach(d => cache.current.set(d.id, d))
    fetch('/discourses.json')
      .then(res => res.json())
      .then((data: Discourse[]) => {
        const merged = mergeCurated(data).filter(d => d.audioUrl)
        setDiscourses(merged)
        merged.forEach(d => cache.current.set(d.id, d))
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const getDiscourse = useCallback((id: string) => {
    return cache.current.get(id)
  }, [])

  const search = useCallback((query: string) => {
    const q = query.toLowerCase()
    return discourses.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.series.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q)
    ).slice(0, 20)
  }, [discourses])

  const filter = useCallback((opts: { language?: string; category?: string; series?: string }) => {
    return discourses.filter(d => {
      if (opts.language && d.language !== opts.language) return false
      if (opts.category && d.category !== opts.category) return false
      if (opts.series && !d.series.toLowerCase().includes(opts.series.toLowerCase())) return false
      return true
    })
  }, [discourses])

  return (
    <DiscourseContext.Provider value={{ discourses, loading, getDiscourse, search, filter }}>
      {children}
    </DiscourseContext.Provider>
  )
}

export function useDiscourseContext() {
  const ctx = useContext(DiscourseContext)
  if (!ctx) throw new Error('useDiscourseContext must be used within DiscourseProvider')
  return ctx
}
