import { NextRequest, NextResponse } from 'next/server'
import { discourses } from '@/lib/data'
import { ingestDiscourse } from '@/lib/media/pipeline'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const discourseId = searchParams.get('id')
  const apiKey = searchParams.get('apiKey') || ''

  try {
    if (discourseId) {
      const input = discourses.find(d => d.id === discourseId)
      if (!input) {
        return NextResponse.json({ error: 'Discourse not found' }, { status: 404 })
      }
      const enriched = await ingestDiscourse(input, apiKey || undefined)
      return NextResponse.json({ discourse: enriched })
    }

    const results = await Promise.allSettled(
      discourses.map(input => ingestDiscourse(input, apiKey || undefined))
    )

    const enriched = results
      .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
      .map(r => r.value)
    const errors = results
      .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
      .map(r => r.reason?.message || 'Unknown error')

    return NextResponse.json({
      total: discourses.length,
      enriched: enriched.length,
      errors: errors.length,
      errorDetails: errors.length > 0 ? errors : undefined,
      discourses: enriched,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    )
  }
}
