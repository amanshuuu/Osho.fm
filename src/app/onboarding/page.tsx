'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Sparkles, Check } from 'lucide-react'
import { beginnerPaths } from '@/lib/data'
import { Brain, Moon, BedDouble, Heart, Wind, Target } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  moon: Moon, 'bed-double': BedDouble, heart: Heart,
  wind: Wind, brain: Brain, target: Target,
}

const steps = [
  { id: 'welcome', title: 'Welcome', description: 'Begin your journey into conscious listening' },
  { id: 'mood', title: 'Your Mood', description: 'How are you feeling right now?' },
  { id: 'goal', title: 'Your Goal', description: 'What do you seek?' },
  { id: 'done', title: 'Ready', description: 'Your personalized path is ready' },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [selectedPath, setSelectedPath] = useState<string[]>([])

  const moods = [
    { id: 'peaceful', emoji: '🕊️', label: 'Peaceful' },
    { id: 'anxious', emoji: '🌊', label: 'Anxious' },
    { id: 'lonely', emoji: '💫', label: 'Lonely' },
    { id: 'curious', emoji: '✨', label: 'Curious' },
    { id: 'overthinking', emoji: '🌀', label: 'Overthinking' },
    { id: 'hopeful', emoji: '🌅', label: 'Hopeful' },
  ]

  const togglePath = (id: string) => {
    setSelectedPath(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-5 sm:px-6 py-12 pb-[180px]">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-center gap-1.5 mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-[#1A1A1A]' : 'bg-[#E5DED4]'
              }`} />
              {i < steps.length - 1 && (
                <div className={`w-8 h-0.5 transition-all duration-300 ${
                  i < step ? 'bg-[#1A1A1A]' : 'bg-[#E5DED4]'
                }`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#F8F5F0] flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-[#1A1A1A]" />
              </div>
              <h1 className="text-3xl font-semibold text-[#1A1A1A] tracking-tight mb-3">
                Begin your journey
              </h1>
              <p className="text-sm text-[#7A6B5D] leading-relaxed mb-8 max-w-sm mx-auto">
                A modern space for conscious listening. Discover wisdom that speaks to where you are right now.
              </p>
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#7A1A2E] text-white text-sm font-medium hover:bg-[#9C2D42] transition-all active:scale-95"
              >
                Begin
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="mood"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h2 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight mb-2 text-center">
                How are you feeling?
              </h2>
              <p className="text-sm text-[#7A6B5D] mb-6 text-center">
                We&apos;ll recommend the perfect discourse for your mood
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {moods.map(mood => (
                  <button
                    key={mood.id}
                    onClick={() => {
                      setSelectedPath([mood.id])
                      setStep(2)
                    }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#E5DED4]/50 hover:bg-white/80 hover:border-[#7A6B5D]/30 transition-all text-left active:scale-[0.98]"
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-sm font-medium text-[#1A1A1A]">{mood.label}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(0)}
                className="flex items-center gap-2 text-sm text-[#7A6B5D] hover:text-[#1A1A1A] transition-colors mx-auto active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h2 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight mb-2 text-center">
                What are you looking for?
              </h2>
              <p className="text-sm text-[#7A6B5D] mb-6 text-center">
                Choose one or more paths
              </p>
              <div className="space-y-2 mb-6">
                {beginnerPaths.map(path => {
                  const Icon = iconMap[path.icon] || Heart
                  const isSelected = selectedPath.includes(path.id)
                  return (
                    <button
                      key={path.id}
                      onClick={() => togglePath(path.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left active:scale-[0.98] ${
                        isSelected
                          ? 'bg-[#7A1A2E] text-white border-[#7A1A2E] shadow-sm'
                          : 'bg-white/60 backdrop-blur-sm border-[#E5DED4]/50 text-[#7A6B5D] hover:bg-white/80 hover:border-[#7A6B5D]/30'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-white/10' : 'bg-[#F8F5F0]'
                      }`}>
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-[#7A6B5D]'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-[#1A1A1A]'}`}>
                          {path.title}
                        </p>
                        <p className={`text-xs ${isSelected ? 'text-white/60' : 'text-[#7A6B5D]'}`}>
                          {path.description}
                        </p>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-white shrink-0" />}
                    </button>
                  )
                })}
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-sm text-[#7A6B5D] hover:text-[#1A1A1A] transition-colors active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={selectedPath.length === 0}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7A1A2E] text-white text-sm font-medium hover:bg-[#9C2D42] transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#E8E0D4] flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-[#1A1A1A]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight mb-3">
                Your path is ready
              </h2>
              <p className="text-sm text-[#7A6B5D] mb-8 max-w-sm mx-auto">
                We&apos;ve curated a personalized selection based on what you&apos;re seeking. Start your journey.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#7A1A2E] text-white text-sm font-medium hover:bg-[#9C2D42] transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                Start Listening
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
