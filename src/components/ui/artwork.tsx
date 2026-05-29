'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { GradientCover, getCategoryPattern } from './gradient-cover'

interface ArtworkProps {
  thumbnail?: string
  gradient: string
  title?: string
  category?: string
  className?: string
  overlay?: boolean
  loading?: 'lazy' | 'eager'
}

export function Artwork({ thumbnail, gradient, title, category, className, overlay = true, loading = 'lazy' }: ArtworkProps) {
  const [failed, setFailed] = useState(false)
  const pattern = category ? getCategoryPattern(category) : 0
  const isExternal = thumbnail?.startsWith('http')
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {thumbnail && !failed ? (
        isExternal ? (
          <img
            src={thumbnail}
            alt={title ?? ''}
            loading={loading}
            onError={() => setFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src={thumbnail}
            alt={title ?? ''}
            fill
            className="object-cover"
            loading={loading}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )
      ) : (
        <GradientCover gradient={gradient} pattern={pattern}>
          <Image
            src="/images/osho-portrait.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.06]"
            loading="lazy"
            sizes="100vw"
          />
        </GradientCover>
      )}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
      )}
    </div>
  )
}
