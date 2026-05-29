'use client'

import { useEffect, type ReactNode } from 'react'

const SITE_URL = 'https://osho.fm'
const SITE_NAME = 'Osho.fm'
const DEFAULT_IMAGE = '/images/osho-portrait.jpg'

export interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'music.radio_station'
  noindex?: boolean
  jsonLd?: Record<string, any> | Record<string, any>[]
}

function setMeta(property: string, content: string, isProperty = false) {
  if (typeof document === 'undefined') return
  const attr = isProperty ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  if (typeof document === 'undefined') return
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

export function SEOHead({
  title,
  description,
  image,
  url,
  type = 'website',
  noindex = false,
  jsonLd,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const desc = description || 'Discover thousands of Osho audio discourses. Meditate, learn, and grow with the wisdom of Osho.'
  const imageUrl = image?.startsWith('http') ? image : `${SITE_URL}${image || DEFAULT_IMAGE}`
  const pageUrl = url ? `${SITE_URL}${url}` : SITE_URL

  useEffect(() => {
    document.title = fullTitle

    setMeta('description', desc)
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow')

    // Open Graph
    setMeta('og:type', type, true)
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', desc, true)
    setMeta('og:image', imageUrl, true)
    setMeta('og:url', pageUrl, true)
    setMeta('og:site_name', SITE_NAME, true)

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', desc)
    setMeta('twitter:image', imageUrl)

    setCanonical(pageUrl)

    // JSON-LD
    if (jsonLd) {
      const scripts = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      scripts.forEach((data, i) => {
        const id = `seo-jsonld-${i}`
        let script = document.getElementById(id) as HTMLScriptElement
        if (!script) {
          script = document.createElement('script')
          script.id = id
          script.type = 'application/ld+json'
          document.head.appendChild(script)
        }
        script.textContent = JSON.stringify(data)
      })
    }
  }, [fullTitle, desc, imageUrl, pageUrl, type, noindex, jsonLd])

  return null
}
