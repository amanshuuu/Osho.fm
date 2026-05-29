import { NextRequest, NextResponse } from 'next/server'
import type { Discourse } from '@/types'
import { promises as fs } from 'fs'
import path from 'path'

let cachedDiscourses: Discourse[] | null = null

async function loadDiscourses(): Promise<Discourse[]> {
  if (cachedDiscourses) return cachedDiscourses
  const filePath = path.join(process.cwd(), 'public', 'discourses.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  cachedDiscourses = JSON.parse(raw)
  return cachedDiscourses!
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const discourses = await loadDiscourses()
  const discourse = discourses.find(d => d.id === id)
  if (!discourse) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(discourse)
}
