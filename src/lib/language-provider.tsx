'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

type Language = 'English' | 'Hindi'

const translations: Record<Language, Record<string, string>> = {
  English: {
    'settings': 'Settings',
    'customize': 'Customize your listening experience',
    'playback': 'Playback',
    'playbackSpeed': 'Playback Speed',
    'sleepTimer': 'Sleep Timer',
    'downloadQuality': 'Download Quality',
    'appearance': 'Appearance',
    'theme': 'Theme',
    'language': 'Language',
    'notifications': 'Notifications',
    'dailyQuote': 'Daily Quote',
    'newDiscourses': 'New Discourses',
    'account': 'Account',
    'profile': 'Profile',
    'privacy': 'Privacy',
    'helpSupport': 'Help & Support',
    'edit': 'Edit',
    'manage': 'Manage',
    'home': 'Home',
    'discover': 'Discover',
    'categories': 'Categories',
    'dailyWisdom': 'Daily Wisdom',
    'saved': 'Saved',
    'continueListening': 'Continue Listening',
    'playlists': 'Playlists',
    'trending': 'Trending',
    'search': 'Search',
    'browse': 'Browse',
    'library': 'Library',
    'nowPlaying': 'Now Playing',
    'notificationsEmpty': 'No new notifications',
    'gotIt': 'Got it',
    'close': 'Close',
    'min': 'min',
  },
  Hindi: {
    'settings': 'सेटिंग्स',
    'customize': 'अपने सुनने के अनुभव को अनुकूलित करें',
    'playback': 'प्लेबैक',
    'playbackSpeed': 'प्लेबैक गति',
    'sleepTimer': 'स्लीप टाइमर',
    'downloadQuality': 'डाउनलोड गुणवत्ता',
    'appearance': 'दिखावट',
    'theme': 'थीम',
    'language': 'भाषा',
    'notifications': 'सूचनाएं',
    'dailyQuote': 'दैनिक उद्धरण',
    'newDiscourses': 'नए प्रवचन',
    'account': 'खाता',
    'profile': 'प्रोफ़ाइल',
    'privacy': 'गोपनीयता',
    'helpSupport': 'सहायता',
    'edit': 'संपादित करें',
    'manage': 'प्रबंधित करें',
    'home': 'होम',
    'discover': 'खोजें',
    'categories': 'श्रेणियाँ',
    'dailyWisdom': 'दैनिक ज्ञान',
    'saved': 'सहेजा गया',
    'continueListening': 'सुनना जारी रखें',
    'playlists': 'प्लेलिस्ट',
    'trending': 'ट्रेंडिंग',
    'search': 'खोज',
    'browse': 'ब्राउज़ करें',
    'library': 'लाइब्रेरी',
    'nowPlaying': 'अब चल रहा है',
    'notificationsEmpty': 'कोई नई सूचना नहीं',
    'gotIt': 'समझ गया',
    'close': 'बंद करें',
    'min': 'मिनट',
  },
}

interface LanguageState {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageState | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('English')

  useEffect(() => {
    const stored = localStorage.getItem('osho-language') as Language | null
    if (stored) setLanguageState(stored)
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('osho-language', lang)
  }, [])

  const t = useCallback((key: string): string => {
    return translations[language]?.[key] ?? translations.English[key] ?? key
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider')
  return ctx
}
