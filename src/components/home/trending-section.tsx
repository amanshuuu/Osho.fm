'use client'

import { DiscourseShelf } from '@/components/ui/discourse-shelf'
import { trendingDiscourses } from '@/lib/data'

export function TrendingSection() {
  const trending = trendingDiscourses.slice(0, 6)

  return (
    <DiscourseShelf
      title="Trending Now"
      subtitle="What others are listening to"
      action="See all"
      items={trending.map(d => ({ discourse: d }))}
      variant="compact"
      cardWidth="w-[55vw] max-w-[240px]"
      scrollButtons={false}
    />
  )
}
