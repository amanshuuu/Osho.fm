'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Quote, ChevronLeft, Search, Sparkles, Heart } from 'lucide-react'
import { SEOHead } from '@/components/ui/seo-head'

const oshoQuotes = [
  { text: "The moment you accept yourself as you are, all your tensions disappear. Accepting yourself is the beginning of all transformation.", topic: "Acceptance", discourse: "The Book of Wisdom" },
  { text: "Intelligence is the natural state of being alive. It is not something that has to be achieved; it is something that has to be allowed to happen.", topic: "Intelligence", discourse: "The Book of Wisdom" },
  { text: "Courage is the most important quality, because without courage you cannot practice any other virtue consistently.", topic: "Courage", discourse: "Courage: The Joy of Living Dangerously" },
  { text: "The greatest fear in the world is of the opinions of others. And the moment you are unafraid of the crowd, you are no longer a sheep.", topic: "Freedom", discourse: "Courage: The Joy of Living Dangerously" },
  { text: "Truth is not something outside to be discovered, it is something inside to be uncovered.", topic: "Truth", discourse: "The True Sage" },
  { text: "Love is not a relationship. Love is a state of being.", topic: "Love", discourse: "A Bird on the Wing" },
  { text: "The mind is a beautiful instrument. But it is a servant, not the master.", topic: "Mind", discourse: "A Bird on the Wing" },
  { text: "Watching the mind is the only way to go beyond the mind.", topic: "Awareness", discourse: "A Bird on the Wing" },
  { text: "Thoughts are like clouds passing in the sky. You are the sky, not the clouds.", topic: "Witnessing", discourse: "A Bird on the Wing" },
  { text: "Death is not the opposite of life, but the opposite of birth. Life is eternal.", topic: "Life & Death", discourse: "A Bird on the Wing" },
  { text: "The fear of death is not really the fear of death — it is the fear of losing the ego.", topic: "Fear", discourse: "A Bird on the Wing" },
  { text: "Meditation is a taste of death. You die to the past, you die to the future, you die to the mind.", topic: "Meditation", discourse: "A Bird on the Wing" },
  { text: "Silence is not something empty. It is full of presence, full of life.", topic: "Silence", discourse: "A Bird on the Wing" },
  { text: "When you are silent, the whole universe speaks to you.", topic: "Silence", discourse: "A Bird on the Wing" },
  { text: "Knowing is not from the mind. Knowing arises when silence meets existence.", topic: "Knowing", discourse: "A Bird on the Wing" },
  { text: "Fear is simply the absence of trust in existence.", topic: "Fear", discourse: "A Bird on the Wing" },
  { text: "The greatest courage is to be yourself in a world that wants you to be like everyone else.", topic: "Courage", discourse: "A Bird on the Wing" },
  { text: "Anxiety is the price you pay for living in the past and future. The present is always peaceful.", topic: "Anxiety", discourse: "A Bird on the Wing" },
  { text: "The ego is a phantom. It has no substance — it is just a habit of identification.", topic: "Ego", discourse: "A Bird on the Wing" },
  { text: "You are born authentic, then the world teaches you to be fake. The spiritual journey is a return to authenticity.", topic: "Authenticity", discourse: "A Bird on the Wing" },
  { text: "The death of the ego is the birth of the self.", topic: "Ego", discourse: "A Bird on the Wing" },
  { text: "Playing safe is the greatest risk. By trying to protect yourself, you destroy yourself.", topic: "Risk", discourse: "A Bird on the Wing" },
  { text: "Life is only for those who are ready to risk. The coward dies every moment, the brave dies only once.", topic: "Courage", discourse: "A Bird on the Wing" },
  { text: "Home is not a place in the world. Home is a place in your being.", topic: "Home", discourse: "A Bird on the Wing" },
  { text: "The mind is always travelling. Coming home means coming out of the mind.", topic: "Mind", discourse: "A Bird on the Wing" },
  { text: "Meditation is not something you do. It is something you become.", topic: "Meditation", discourse: "A Bird on the Wing" },
  { text: "All techniques are just pointers. They are like a finger pointing to the moon. Do not mistake the finger for the moon.", topic: "Meditation", discourse: "A Bird on the Wing" },
  { text: "Sitting silently, doing nothing, the spring comes and the grass grows by itself.", topic: "Meditation", discourse: "A Bird on the Wing" },
  { text: "Certainty is the death of wonder. Uncertainty is the beginning of awe.", topic: "Mystery", discourse: "A Bird on the Wing" },
  { text: "The mind wants to know. The heart wants to experience. Knowledge is safe, experience is dangerous.", topic: "Experience", discourse: "A Bird on the Wing" },
  { text: "The very effort to be free is a bondage. Drop the effort and you are free.", topic: "Freedom", discourse: "Sufis: The People of the Path" },
  { text: "You cannot become enlightened. You can only realize that you have always been enlightened.", topic: "Enlightenment", discourse: "Sufis: The People of the Path" },
  { text: "Surrender is not a giving up. It is a giving in to existence.", topic: "Surrender", discourse: "Sufis: The People of the Path" },
  { text: "The feminine is the door to the divine. Not through logic, but through love.", topic: "Feminine", discourse: "Tantra: The Way of Acceptance" },
  { text: "Tantra accepts everything. It does not deny the body, it does not deny desire. It transforms everything into prayer.", topic: "Tantra", discourse: "Tantra: The Way of Acceptance" },
  { text: "You are the light. There is nothing to achieve, nothing to become. Just recognize what you already are.", topic: "Enlightenment", discourse: "Zen: The Path of Paradox" },
  { text: "The search is the disease. Stop searching and you will find. Drop the seeking and you are the sought.", topic: "Seeking", discourse: "Zen: The Path of Paradox" },
  { text: "Enlightenment is not an addition. It is a recognition. It is coming home to your own nature.", topic: "Enlightenment", discourse: "Zen: The Path of Paradox" },
  { text: "When love becomes a relationship, it becomes a prison. When love is your being, it is freedom.", topic: "Love", discourse: "A Bird on the Wing" },
  { text: "The other is not the cause of your love. The other is just an excuse for your love to flower.", topic: "Love", discourse: "A Bird on the Wing" },
  { text: "Life is not a problem to be solved, but a mystery to be lived.", topic: "Life", discourse: "The Book of Wisdom" },
  { text: "The moment a child is born, the mother is also born. She never existed before.", topic: "Love", discourse: "The Book of Wisdom" },
  { text: "Truth is not something to be found; it is something to be lived.", topic: "Truth", discourse: "The Book of Wisdom" },
  { text: "Drop the idea of becoming someone, because you are already a masterpiece.", topic: "Self", discourse: "The Book of Wisdom" },
  { text: "Be realistic: plan for a miracle.", topic: "Life", discourse: "The Book of Wisdom" },
  { text: "To be creative means to be in love with life. You can be creative only if you love life enough that you want to enhance its beauty.", topic: "Creativity", discourse: "Creativity" },
  { text: "Experience life in all possible ways — good-bad, bitter-sweet, dark-light, summer-winter. Experience all the dualities. Don't be afraid of experience, because the more experience you have, the more mature you become.", topic: "Experience", discourse: "The Book of Wisdom" },
  { text: "Whatever you feel, you become. It is your responsibility.", topic: "Responsibility", discourse: "The Book of Wisdom" },
  { text: "If you love yourself, you will never be able to hurt anybody else. A person who loves himself cannot conceive of hurting others.", topic: "Love", discourse: "The Book of Wisdom" },
  { text: "Don't try to understand life. Live it! Don't try to understand love. Move into love. Then you will know.", topic: "Life", discourse: "The Book of Wisdom" },
  { text: "Sex is the seed, love is the flower, compassion is the fragrance.", topic: "Love", discourse: "The Book of Wisdom" },
  { text: "The only way to be truly alive is to be willing to die.", topic: "Life & Death", discourse: "The Book of Wisdom" },
  { text: "Respect life. Revere life. In that reverence, something of the divine starts descending into you.", topic: "Life", discourse: "The Book of Wisdom" },
  { text: "Friendship is the purest love. It is the highest form of love where nothing is asked for, no condition, where one simply enjoys giving.", topic: "Love", discourse: "The Book of Wisdom" },
  { text: "Bravery is not being unafraid. Bravery is being afraid and still taking the jump.", topic: "Courage", discourse: "The Book of Wisdom" },
  { text: "Freedom is the only law that has to be followed. Everything else is just advice.", topic: "Freedom", discourse: "The Book of Wisdom" },
  { text: "Intelligence is your very nature. It is not something that comes from outside.", topic: "Intelligence", discourse: "The Book of Wisdom" },
  { text: "When you are happy, you are not. When you are, you are not happy. Happiness is only when the ego is absent.", topic: "Happiness", discourse: "The Book of Wisdom" },
  { text: "The real question is not whether life exists after death. The real question is whether you are alive before death.", topic: "Life & Death", discourse: "The Book of Wisdom" },
  { text: "Tomorrow never comes. It is always today. This moment is all there is.", topic: "Present", discourse: "The Book of Wisdom" },
  { text: "Your whole idea about yourself is borrowed from those who have no idea of who they are themselves.", topic: "Self", discourse: "The Book of Wisdom" },
  { text: "The past is nothing but a memory. The future is nothing but imagination. The present is the only reality.", topic: "Present", discourse: "The Book of Wisdom" },
  { text: "To be religious means to be utterly alone. To be in a crowd is easy. To be alone is the greatest courage.", topic: "Solitude", discourse: "The Book of Wisdom" },
  { text: "Witnessing is the greatest secret of transformation.", topic: "Awareness", discourse: "The Book of Wisdom" },
  { text: "No one else can take responsibility for your life. It is absolutely yours.", topic: "Responsibility", discourse: "The Book of Wisdom" },
  { text: "Listen to your own being. It is continuously giving you hints. It is a still, small voice.", topic: "Being", discourse: "The Book of Wisdom" },
  { text: "Simplicity is the ultimate sophistication. When you are simple, existence mirrors your simplicity.", topic: "Simplicity", discourse: "The Book of Wisdom" },
  { text: "The less you know, the more you think you know. The more you know, the more you realize you don't know.", topic: "Wisdom", discourse: "The Book of Wisdom" },
  { text: "A real man is one who can cry, who can be vulnerable, who can be soft, who can be tender. The so-called strong man is not really strong; he has just created a protection around his weakness.", topic: "Strength", discourse: "The Book of Wisdom" },
  { text: "Don't be a perfectionist. Perfectionism is a neurosis. Accept your imperfections, they make you human.", topic: "Acceptance", discourse: "The Book of Wisdom" },
  { text: "Celebrate your aloneness. It is a beautiful thing. It is not loneliness; it is aloneness, the pure joy of being yourself.", topic: "Solitude", discourse: "The Book of Wisdom" },
  { text: "Trust existence. It has brought you here for no other purpose than to enjoy, to celebrate, to love, to be.", topic: "Trust", discourse: "The Book of Wisdom" },
  { text: "When I say be yourself, I mean be your original self, which you were before you were born and which you will be after you die.", topic: "Self", discourse: "The Book of Wisdom" },
  { text: "Love is the goal, life is the journey.", topic: "Love", discourse: "The Book of Wisdom" },
  { text: "The whole of life is a search for love. But when you start searching for love, you lose the capacity to love.", topic: "Love", discourse: "The Book of Wisdom" },
  { text: "Awareness is the only antidote to fear.", topic: "Awareness", discourse: "The Book of Wisdom" },
  { text: "If you can laugh heartily at your own misery, you are already free.", topic: "Humor", discourse: "The Book of Wisdom" },
  { text: "The ultimate state of consciousness is to be, not to become.", topic: "Being", discourse: "The Book of Wisdom" },
  { text: "Don't seek, don't search, don't ask, don't knock — just sit silently. The door is open.", topic: "Meditation", discourse: "The Book of Wisdom" },
  { text: "Your eyes are closed, that's why you cannot see the light. Open them. It is not a question of finding the light; it is a question of opening your eyes.", topic: "Awareness", discourse: "The Book of Wisdom" },
  { text: "The only real revolution is a revolution of consciousness.", topic: "Consciousness", discourse: "The Book of Wisdom" },
  { text: "Consciousness is not a thing; it is a flame. It grows. The more you live it, the more it becomes alive.", topic: "Consciousness", discourse: "The Book of Wisdom" },
  { text: "Be a light unto yourself. Don't follow others, don't imitate. You have your own unique individuality.", topic: "Individuality", discourse: "The Book of Wisdom" },
  { text: "True meditation is not a technique; it is a deep understanding that you are already that which you seek.", topic: "Meditation", discourse: "The Book of Wisdom" },
  { text: "Love is not something that happens to you. Love is something that arises in you when you are in a state of meditation.", topic: "Love", discourse: "The Book of Wisdom" },
  { text: "A child is born with tremendous potential. But the society immediately starts shaping him, conditioning him, forcing him into a certain mould. The innocent child becomes a repetitive mechanism.", topic: "Freedom", discourse: "The Book of Wisdom" },
  { text: "What is meditation? It is the art of being aware of what is inside you, the art of being aware of your thoughts, your feelings, your emotions, your moods.", topic: "Meditation", discourse: "The Book of Wisdom" },
  { text: "To be in harmony with existence is to be enlightened. To be out of harmony is to be unenlightened. It is as simple as that.", topic: "Enlightenment", discourse: "The Book of Wisdom" },
  { text: "The real pilgrimage is the pilgrimage from the head to the heart.", topic: "Heart", discourse: "The Book of Wisdom" },
  { text: "Happiness is not something ready made. It comes from your own actions.", topic: "Happiness", discourse: "The Book of Wisdom" },
  { text: "The mind is a beautiful servant but a terrible master.", topic: "Mind", discourse: "The Book of Wisdom" },
  { text: "Life begins where fear ends.", topic: "Courage", discourse: "The Book of Wisdom" },
  { text: "Truth is not found by reasoning; it is found by living.", topic: "Truth", discourse: "The Book of Wisdom" },
  { text: "If you want to be free, learn to die every moment to the past.", topic: "Freedom", discourse: "The Book of Wisdom" },
  { text: "When you are in love, you are not possessive. Possessiveness is the death of love.", topic: "Love", discourse: "The Book of Wisdom" },
  { text: "Zen says: Don't go outside, don't go inside. Just be where you are. The door is within you.", topic: "Zen", discourse: "The Book of Wisdom" },
]

const topics = [...new Set(oshoQuotes.map(q => q.topic))].sort()

export default function QuotesPage() {
  const [search, setSearch] = useState('')
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [showCount, setShowCount] = useState(24)
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set())

  const filtered = useMemo(() => {
    return oshoQuotes.filter((q, i) => {
      if (selectedTopic && q.topic !== selectedTopic) return false
      if (search) {
        const qs = search.toLowerCase()
        return q.text.toLowerCase().includes(qs) || q.topic.toLowerCase().includes(qs) || q.discourse.toLowerCase().includes(qs)
      }
      return true
    })
  }, [search, selectedTopic])

  const displayed = filtered.slice(0, showCount)

  return (
    <div className="pb-[136px]">
      <SEOHead
        title="Osho Quotes — Wisdom on Meditation, Love, Life & Awareness"
        description="Discover 100+ powerful Osho quotes on meditation, love, life, courage, awareness, and enlightenment. Read and share the wisdom of Osho."
        url="/quotes"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Osho Quotes",
          "description": "A curated collection of Osho quotes on meditation, love, life, courage, awareness, and enlightenment.",
          "isPartOf": { "@type": "WebSite", "name": "Osho.fm", "url": "https://osho.fm" }
        }}
      />
      <section className="py-12 sm:py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white pointer-events-none" />
        <div className="relative max-w-screen-2xl mx-auto px-5 sm:px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#7A6B5D] hover:text-[#1A1A1A] transition-colors mb-6 active:scale-95">
              <ChevronLeft className="w-4 h-4" />
              Home
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/40 text-xs font-medium text-[#7A6B5D] mb-5 shadow-sm">
              <Quote className="w-3.5 h-3.5" />
              Osho Quotes
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.03em] text-[#1A1A1A] leading-[0.9] mb-4">
              Osho Quotes
            </h1>
            <p className="text-base sm:text-xl text-[#7A6B5D] max-w-xl leading-relaxed">
              Wisdom on meditation, love, life, courage, and awakening — from thousands of Osho discourses
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A6B5D]/60" />
              <input
                type="text"
                placeholder="Search quotes..."
                value={search}
                onChange={e => { setSearch(e.target.value); setShowCount(24) }}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/60 backdrop-blur-md border border-[#E5DED4]/40 text-sm text-[#1A1A1A] placeholder:text-[#7A6B5D]/40 focus:outline-none focus:border-[#C9953D]/40 focus:bg-white/80 transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              <button onClick={() => { setSelectedTopic(null); setShowCount(24) }} className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${!selectedTopic ? 'bg-[#7A1A2E] text-white shadow-md shadow-[#7A1A2E]/20' : 'bg-white/60 backdrop-blur-sm border border-[#E5DED4]/50 text-[#7A6B5D] hover:border-[#7A6B5D]/30'}`}>
                All
              </button>
              {topics.map(topic => (
                <button key={topic} onClick={() => { setSelectedTopic(selectedTopic === topic ? null : topic); setShowCount(24) }} className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${selectedTopic === topic ? 'bg-[#7A1A2E] text-white shadow-md shadow-[#7A1A2E]/20' : 'bg-white/60 backdrop-blur-sm border border-[#E5DED4]/50 text-[#7A6B5D] hover:border-[#7A6B5D]/30'}`}>
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayed.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 24) * 0.02, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl bg-white/55 backdrop-blur-xl border border-[#E5DED4]/20 p-6 transition-all duration-400 hover:shadow-xl hover:shadow-[#7A1A2E]/5 hover:border-[#C9953D]/20"
              >
                <div className="absolute top-4 right-4 opacity-[0.04]">
                  <Quote className="w-12 h-12 text-[#7A1A2E]" />
                </div>
                <div className="mb-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F8F5F0] text-[9px] font-medium text-[#7A6B5D] uppercase tracking-[0.12em]">
                    {q.topic}
                  </span>
                </div>
                <blockquote className="text-sm text-[#1A1A1A] leading-relaxed mb-4 relative z-10">
                  &ldquo;{q.text}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-[#7A6B5D]/60">— Osho, <span className="italic">{q.discourse}</span></p>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Quote className="w-12 h-12 text-[#7A6B5D]/30 mx-auto mb-4" />
              <p className="text-[#7A6B5D] font-medium">No quotes found</p>
              <p className="text-xs text-[#7A6B5D]/60 mt-1">Try a different search or topic</p>
            </div>
          )}

          {filtered.length > showCount && (
            <div className="mt-8 text-center">
              <button onClick={() => setShowCount(showCount + 24)} className="px-8 py-3 rounded-2xl bg-white/55 backdrop-blur-md border border-[#E5DED4]/40 text-sm font-medium text-[#7A6B5D] hover:bg-white/80 transition-all duration-300 active:scale-95">
                Show more quotes ({filtered.length - showCount} remaining)
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
