'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { useDiscourseContext } from '@/lib/discourse-context'
import type { Discourse } from '@/types'

const STORAGE_KEY = 'osho-fm-saved'

interface SavedData {
  bookmarked: string[]
  liked: string[]
}

function loadSaved(): SavedData {
  if (typeof window === 'undefined') return { bookmarked: [], liked: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { bookmarked: [], liked: [] }
}

interface SavedState {
  bookmarked: string[]
  liked: string[]
  bookmarkedDiscourses: Discourse[]
  likedDiscourses: Discourse[]
  isBookmarked: (id: string) => boolean
  toggleBookmark: (id: string) => void
  isLiked: (id: string) => boolean
  toggleLike: (id: string) => void
}

const SavedContext = createContext<SavedState | null>(null)

export function SavedProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SavedData>(loadSaved)
  const { getDiscourse } = useDiscourseContext()

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const isBookmarked = useCallback((id: string) => data.bookmarked.includes(id), [data.bookmarked])
  const isLiked = useCallback((id: string) => data.liked.includes(id), [data.liked])

  const toggleBookmark = useCallback((id: string) => {
    setData(prev => {
      const exists = prev.bookmarked.includes(id)
      return {
        ...prev,
        bookmarked: exists
          ? prev.bookmarked.filter(b => b !== id)
          : [...prev.bookmarked, id],
      }
    })
  }, [])

  const toggleLike = useCallback((id: string) => {
    setData(prev => {
      const exists = prev.liked.includes(id)
      return {
        ...prev,
        liked: exists
          ? prev.liked.filter(l => l !== id)
          : [...prev.liked, id],
      }
    })
  }, [])

  const bookmarkedDiscourses = data.bookmarked
    .map(id => getDiscourse(id))
    .filter((d): d is Discourse => d !== undefined)

  const likedDiscourses = data.liked
    .map(id => getDiscourse(id))
    .filter((d): d is Discourse => d !== undefined)

  return (
    <SavedContext.Provider value={{
      bookmarked: data.bookmarked,
      liked: data.liked,
      bookmarkedDiscourses,
      likedDiscourses,
      isBookmarked,
      toggleBookmark,
      isLiked,
      toggleLike,
    }}>
      {children}
    </SavedContext.Provider>
  )
}

export function useSaved() {
  const ctx = useContext(SavedContext)
  if (!ctx) throw new Error('useSaved must be used within SavedProvider')
  return ctx
}
