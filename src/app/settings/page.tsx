'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Settings, ChevronRight, Moon, Bell, Globe, Volume2, Download, Shield, HelpCircle, User, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { usePlayer } from '@/lib/player-context'
import { useTranslation } from '@/lib/language-provider'

export default function SettingsPage() {
  const router = useRouter()

  const { playbackSpeed, setPlaybackSpeed, sleepTimer, setSleepTimer } = usePlayer()
  const { t, setLanguage, language } = useTranslation()
  const [downloadQuality, setDownloadQuality] = useState('High (320kbps)')
  useEffect(() => {
    const stored = localStorage.getItem('osho-download-quality')
    if (stored) setDownloadQuality(stored)
  }, [])
  const [dailyQuote, setDailyQuote] = useState(true)
  const [newDiscourses, setNewDiscourses] = useState(false)
  const [openPicker, setOpenPicker] = useState<string | null>(null)
  const [showSheet, setShowSheet] = useState<string | null>(null)

  const handleNotificationToggle = (type: 'daily' | 'new') => {
    if (!('Notification' in window)) return
    if (type === 'daily') {
      const next = !dailyQuote
      setDailyQuote(next)
      if (next && Notification.permission === 'default') {
        Notification.requestPermission().then(perm => {
          if (perm === 'granted') {
            new Notification('Daily Quote', { body: 'You will now receive daily wisdom notifications.' })
          }
        })
      } else if (next && Notification.permission === 'granted') {
        new Notification('Daily Quote', { body: 'Daily quote notifications enabled.' })
      }
    } else {
      const next = !newDiscourses
      setNewDiscourses(next)
      if (next && Notification.permission === 'default') {
        Notification.requestPermission().then(perm => {
          if (perm === 'granted') {
            new Notification('New Discourses', { body: 'You will be notified when new discourses are added.' })
          }
        })
      } else if (next && Notification.permission === 'granted') {
        new Notification('New Discourses', { body: 'New discourse notifications enabled.' })
      }
    }
  }

  return (
    <div className="pb-[136px]">
      <section className="py-10 sm:py-12 hero-gradient">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#F8F5F0] flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#1A1A1A]" />
              </div>
              <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#1A1A1A]">{t('settings')}</h1>
            </div>
            <p className="text-sm text-[#7A6B5D] max-w-xl">{t('customize')}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="max-w-2xl mx-auto px-5 sm:px-6">
          <div className="space-y-6 sm:space-y-8">

            {/* Playback */}
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-[#7A6B5D] font-medium mb-3 px-1">{t('playback')}</h3>
              <div className="space-y-1">

                <div>
                  <button
                    onClick={() => setOpenPicker(openPicker === 'Playback Speed' ? null : 'Playback Speed')}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#F8F5F0] active:bg-[#F0ECE6] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F8F5F0] flex items-center justify-center">
                        <Volume2 className="w-5 h-5 text-[#7A6B5D]" />
                      </div>
                      <span className="text-sm font-medium text-[#1A1A1A]">{t('playbackSpeed')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#7A6B5D]">{playbackSpeed}</span>
                      <ChevronRight className={`w-4 h-4 text-[#7A6B5D] transition-transform ${openPicker === 'Playback Speed' ? 'rotate-90' : ''}`} />
                    </div>
                  </button>
                  {openPicker === 'Playback Speed' && (
                    <div className="overflow-hidden px-2 pb-2 pt-1 space-y-0.5">
                      {['0.5x', '0.75x', '1.0x', '1.25x', '1.5x', '2.0x'].map(opt => (
                        <button key={opt} onClick={() => { setPlaybackSpeed(opt); setOpenPicker(null) }} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm ${opt === playbackSpeed ? 'bg-[#F0ECE6] font-medium' : 'hover:bg-[#F8F5F0]'}`}>
                          <span>{opt}</span>
                          {opt === playbackSpeed && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => setOpenPicker(openPicker === 'Sleep Timer' ? null : 'Sleep Timer')}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#F8F5F0] active:bg-[#F0ECE6] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F8F5F0] flex items-center justify-center">
                        <Moon className="w-5 h-5 text-[#7A6B5D]" />
                      </div>
                      <span className="text-sm font-medium text-[#1A1A1A]">{t('sleepTimer')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#7A6B5D]">{sleepTimer} {t('min')}</span>
                      <ChevronRight className={`w-4 h-4 text-[#7A6B5D] transition-transform ${openPicker === 'Sleep Timer' ? 'rotate-90' : ''}`} />
                    </div>
                  </button>
                  {openPicker === 'Sleep Timer' && (
                    <div className="overflow-hidden px-2 pb-2 pt-1 space-y-0.5">
                          {['15', '30', '45', '60', '90'].map(opt => (
                            <button key={opt} onClick={() => { setSleepTimer(opt); setOpenPicker(null) }} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm ${opt === sleepTimer ? 'bg-[#F0ECE6] font-medium' : 'hover:bg-[#F8F5F0]'}`}>
                              <span>{opt} {t('min')}</span>
                          {opt === sleepTimer && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => setOpenPicker(openPicker === 'Download Quality' ? null : 'Download Quality')}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#F8F5F0] active:bg-[#F0ECE6] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F8F5F0] flex items-center justify-center">
                        <Download className="w-5 h-5 text-[#7A6B5D]" />
                      </div>
                      <span className="text-sm font-medium text-[#1A1A1A]">{t('downloadQuality')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#7A6B5D]">{downloadQuality}</span>
                      <ChevronRight className={`w-4 h-4 text-[#7A6B5D] transition-transform ${openPicker === 'Download Quality' ? 'rotate-90' : ''}`} />
                    </div>
                  </button>
                  {openPicker === 'Download Quality' && (
                    <div className="overflow-hidden px-2 pb-2 pt-1 space-y-0.5">
                      {['Low (96kbps)', 'Medium (192kbps)', 'High (320kbps)'].map(opt => (
                        <button key={opt} onClick={() => { setDownloadQuality(opt); localStorage.setItem('osho-download-quality', opt); setOpenPicker(null) }} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm ${opt === downloadQuality ? 'bg-[#F0ECE6] font-medium' : 'hover:bg-[#F8F5F0]'}`}>
                          <span>{opt}</span>
                          {opt === downloadQuality && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Appearance */}
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-[#7A6B5D] font-medium mb-3 px-1">{t('appearance')}</h3>
              <div className="space-y-1">

                <div>
                  <button
                    onClick={() => setOpenPicker(openPicker === 'Language' ? null : 'Language')}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#F8F5F0] active:bg-[#F0ECE6] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F8F5F0] flex items-center justify-center">
                        <Globe className="w-5 h-5 text-[#7A6B5D]" />
                      </div>
                      <span className="text-sm font-medium text-[#1A1A1A]">{t('language')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#7A6B5D]">{language}</span>
                      <ChevronRight className={`w-4 h-4 text-[#7A6B5D] transition-transform ${openPicker === 'Language' ? 'rotate-90' : ''}`} />
                    </div>
                  </button>
                  {openPicker === 'Language' && (
                    <div className="overflow-hidden px-2 pb-2 pt-1 space-y-0.5">
                      {['English', 'Hindi'].map(opt => (
                        <button key={opt} onClick={() => { setLanguage(opt as 'English' | 'Hindi'); setOpenPicker(null) }} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm ${opt === language ? 'bg-[#F0ECE6] font-medium' : 'hover:bg-[#F8F5F0]'}`}>
                          <span>{opt}</span>
                          {opt === language && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Notifications */}
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-[#7A6B5D] font-medium mb-3 px-1">{t('notifications')}</h3>
              <div className="space-y-1">

                <div>
                  <button
                    onClick={() => handleNotificationToggle('daily')}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#F8F5F0] active:bg-[#F0ECE6] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F8F5F0] flex items-center justify-center">
                        <Bell className="w-5 h-5 text-[#7A6B5D]" />
                      </div>
                      <span className="text-sm font-medium text-[#1A1A1A]">{t('dailyQuote')}</span>
                    </div>
                    <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${dailyQuote ? 'bg-[#1A1A1A]' : 'bg-[#D4D0CC]'}`}>
                      <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${dailyQuote ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => handleNotificationToggle('new')}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#F8F5F0] active:bg-[#F0ECE6] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F8F5F0] flex items-center justify-center">
                        <Bell className="w-5 h-5 text-[#7A6B5D]" />
                      </div>
                      <span className="text-sm font-medium text-[#1A1A1A]">{t('newDiscourses')}</span>
                    </div>
                    <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${newDiscourses ? 'bg-[#1A1A1A]' : 'bg-[#D4D0CC]'}`}>
                      <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${newDiscourses ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                  </button>
                </div>

              </div>
            </div>

            {/* Account */}
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-[#7A6B5D] font-medium mb-3 px-1">{t('account')}</h3>
              <div className="space-y-1">

                <div>
                  <button
                    onClick={() => router.push('/profile')}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#F8F5F0] active:bg-[#F0ECE6] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F8F5F0] flex items-center justify-center">
                        <User className="w-5 h-5 text-[#7A6B5D]" />
                      </div>
                      <span className="text-sm font-medium text-[#1A1A1A]">{t('profile')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#7A6B5D]">{t('edit')}</span>
                      <ChevronRight className="w-4 h-4 text-[#7A6B5D]" />
                    </div>
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => setShowSheet(showSheet === 'Privacy' ? null : 'Privacy')}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#F8F5F0] active:bg-[#F0ECE6] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F8F5F0] flex items-center justify-center">
                        <Shield className="w-5 h-5 text-[#7A6B5D]" />
                      </div>
                      <span className="text-sm font-medium text-[#1A1A1A]">{t('privacy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#7A6B5D]">{t('manage')}</span>
                      <ChevronRight className="w-4 h-4 text-[#7A6B5D]" />
                    </div>
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => setShowSheet(showSheet === 'Help' ? null : 'Help')}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#F8F5F0] active:bg-[#F0ECE6] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F8F5F0] flex items-center justify-center">
                        <HelpCircle className="w-5 h-5 text-[#7A6B5D]" />
                      </div>
                      <span className="text-sm font-medium text-[#1A1A1A]">{t('helpSupport')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#7A6B5D]" />
                    </div>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {showSheet === 'Privacy' && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/20 animate-fade-in" onClick={() => setShowSheet(null)}>
          <div className="w-full max-w-lg bg-white rounded-t-2xl p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full bg-[#D4D0CC] mx-auto mb-5" />
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{t('privacy')}</h3>
            <p className="text-sm text-[#7A6B5D] leading-relaxed">Your listening data is stored locally on your device.</p>
            <button onClick={() => setShowSheet(null)} className="mt-6 w-full py-3 rounded-xl bg-[#1A1A1A] text-white text-sm font-medium">{t('gotIt')}</button>
          </div>
        </div>
      )}
      {showSheet === 'Help' && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/20 animate-fade-in" onClick={() => setShowSheet(null)}>
          <div className="w-full max-w-lg bg-white rounded-t-2xl p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full bg-[#D4D0CC] mx-auto mb-5" />
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{t('helpSupport')}</h3>
            <p className="text-sm text-[#7A6B5D] leading-relaxed">This app is inspired by Osho teachings.</p>
            <button onClick={() => setShowSheet(null)} className="mt-6 w-full py-3 rounded-xl bg-[#1A1A1A] text-white text-sm font-medium">{t('close')}</button>
          </div>
        </div>
      )}
    </div>
  )
}
