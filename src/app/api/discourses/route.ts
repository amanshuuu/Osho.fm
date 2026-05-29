import { NextRequest, NextResponse } from 'next/server'
import type { Discourse } from '@/types'
import { promises as fs } from 'fs'
import path from 'path'

let cachedDiscourses: Discourse[] | null = null

async function loadDiscourses(): Promise<Discourse[]> {
  if (cachedDiscourses) return cachedDiscourses
  const filePath = path.join(process.cwd(), 'public', 'discourses.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  const data = JSON.parse(raw)

  cachedDiscourses = data.map((d: Record<string, unknown>) => ({
    ...(d as unknown as Discourse),
    tags: (d.tags as string[]) ?? [],
    mood: (d.mood as string[]) ?? [],
    highlights: (d.highlights as Discourse['highlights']) ?? [],
    chapters: (d.chapters as Discourse['chapters']) ?? [],
    summary: (d.summary as string) ?? '',
    listenCount: (d.listenCount as number) ?? 0,
  })).filter((d: Discourse) => d.audioUrl)
  return cachedDiscourses!
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')?.toLowerCase().trim()
  const language = searchParams.get('language')
  const category = searchParams.get('category')
  const series = searchParams.get('series')
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)))

  let discourses = await loadDiscourses()

  if (search) {
    discourses = discourses.filter(d =>
      d.title.toLowerCase().includes(search) ||
      d.series.toLowerCase().includes(search) ||
      d.category.toLowerCase().includes(search) ||
      d.description.toLowerCase().includes(search)
    )
  }

  if (language === 'english' || language === 'hindi') {
    discourses = discourses.filter(d => d.language === language)
  }

  if (category) {
    discourses = discourses.filter(d => d.category.toLowerCase() === category.toLowerCase())
  }

  if (series) {
    discourses = discourses.filter(d => d.series.toLowerCase().includes(series.toLowerCase()))
  }

  const total = discourses.length
  const totalPages = Math.ceil(total / limit)
  const start = (page - 1) * limit
  const sliced = discourses.slice(start, start + limit)

  return NextResponse.json({
    discourses: sliced,
    total,
    page,
    totalPages,
  })
}
