'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { SupportModal } from '@/components/ui/support-modal'

interface SupportState {
  openSupport: () => void
}

const SupportContext = createContext<SupportState | null>(null)

export function SupportProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openSupport = useCallback(() => setOpen(true), [])

  return (
    <SupportContext.Provider value={{ openSupport }}>
      {children}
      <SupportModal open={open} onClose={() => setOpen(false)} />
    </SupportContext.Provider>
  )
}

export function useSupport() {
  const ctx = useContext(SupportContext)
  if (!ctx) throw new Error('useSupport must be used within SupportProvider')
  return ctx
}
