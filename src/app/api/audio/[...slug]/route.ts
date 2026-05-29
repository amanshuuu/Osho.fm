import { NextRequest, NextResponse } from 'next/server'
import { getDiscourseAudioUrl } from '@/lib/audio-service'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params

  const [action, ...rest] = slug

  if (action === 'resolve') {
    const seriesSlug = rest[0]
    const trackIndex = parseInt(rest[1], 10)

    if (!seriesSlug || isNaN(trackIndex)) {
      return NextResponse.json({ error: 'Invalid params. Usage: /api/audio/resolve/{series-slug}/{track-index}' }, { status: 400 })
    }

    const url = await getDiscourseAudioUrl(seriesSlug, trackIndex)

    if (!url) {
      return NextResponse.json({ error: 'Audio URL not found' }, { status: 404 })
    }

    return NextResponse.json({ url })
  }

  if (action === 'proxy') {
    const targetUrl = rest.join('/')

    if (!targetUrl) {
      return NextResponse.json({ error: 'Missing target URL' }, { status: 400 })
    }

    const decodedUrl = decodeURIComponent(targetUrl)

    try {
      const response = await fetch(decodedUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })

      if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch audio' }, { status: response.status })
      }

      const headers = new Headers()
      headers.set('Content-Type', response.headers.get('Content-Type') ?? 'audio/mpeg')
      headers.set('Cache-Control', 'public, max-age=3600')
      headers.set('Access-Control-Allow-Origin', '*')

      return new NextResponse(response.body, {
        status: 200,
        statusText: 'OK',
        headers,
      })
    } catch {
      return NextResponse.json({ error: 'Audio proxy failed' }, { status: 502 })
    }
  }

  return NextResponse.json({ error: 'Unknown action. Use "resolve" or "proxy".' }, { status: 400 })
}
