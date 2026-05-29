'use client'

import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

type AuthCallback = (user: User | null) => void

const listeners = new Set<AuthCallback>()

export function onAuthChange(cb: AuthCallback) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function notify(user: User | null) {
  listeners.forEach((cb) => cb(user))
}

export async function signUp(email: string, password: string) {
  if (!supabase) {
    throw new Error('Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error

  if (data.user) notify(data.user)
  return data.user
}

export async function signIn(email: string, password: string) {
  if (!supabase) {
    throw new Error('Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error

  if (data.user) notify(data.user)
  return data.user
}

export async function signOut() {
  if (!supabase) return

  const { error } = await supabase.auth.signOut()
  if (error) throw error

  notify(null)
}

export async function getCurrentUser(): Promise<User | null> {
  if (!supabase) return null

  const { data } = await supabase.auth.getUser()
  return data?.user ?? null
}

export async function listenForAuthChanges() {
  if (!supabase) return () => {}

  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    notify(session?.user ?? null)
  })

  return data?.subscription?.unsubscribe ?? (() => {})
}
