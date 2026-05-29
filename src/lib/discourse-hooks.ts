'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { Discourse } from '@/types'

interface DiscourseFilters {
  search?: string
  language?: 'english' | 'hindi'
  category?: string
  series?: string
  page?: number
  limit?: number
}

interface DiscourseResponse {
  discourses: Discourse[]
  total: number
  page: number
  totalPages: number
}

export function useDiscourses(filters: DiscourseFilters = {}) {
  const [data, setData] = useState<DiscourseResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const errorRef = useRef(false)

  const { search, language, category, series, page = 1, limit = 20 } = filters

  const fetchDiscourses = useCallback(async () => {
    setLoading(true)
    errorRef.current = false
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (language) params.set('language', language)
      if (category) params.set('category', category)
      if (series) params.set('series', series)
      params.set('page', String(page))
      params.set('limit', String(limit))

      const res = await fetch(`/api/discourses?${params}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const json = await res.json()
      setData(json)
    } catch {
      errorRef.current = true
    } finally {
      setLoading(false)
    }
  }, [search, language, category, series, page, limit])

  useEffect(() => {
    fetchDiscourses()
  }, [fetchDiscourses])

  return { discourses: data?.discourses ?? [], total: data?.total ?? 0, totalPages: data?.totalPages ?? 0, loading, error: errorRef.current, refetch: fetchDiscourses }
}

export function useDiscourse(id: string | null) {
  const [discourse, setDiscourse] = useState<Discourse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) { setLoading(false); return }
    setLoading(true)
    fetch(`/api/discourses/${id}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => setDiscourse(data))
      .catch(() => setDiscourse(null))
      .finally(() => setLoading(false))
  }, [id])

  return { discourse, loading }
}
