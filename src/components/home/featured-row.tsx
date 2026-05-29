'use client'

import { DiscourseShelf } from '@/components/ui/discourse-shelf'
import { featuredDiscourses } from '@/lib/data'

export function FeaturedSection() {
  const featured = featuredDiscourses

  return (
    <DiscourseShelf
      title="Featured Discourses"
      subtitle="Curated for deep listening"
      action="See all"
      items={featured.map(d => ({ discourse: d }))}
      gradient
      scrollButtons
    />
  )
}
