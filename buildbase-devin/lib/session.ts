'use client'

export type Role = 'builder' | 'investor'

export interface BuilderProfile {
  role: 'builder'
  name: string
  email: string
  headline: string
  skills: string[]
  interests: string[]
  githubUsername?: string
  bio: string
}

export interface InvestorProfile {
  role: 'investor'
  name: string
  email: string
  headline: string
  sectors: string[]
  ticketSize: string
  stages: string[]
  bio: string
}

export type Profile = BuilderProfile | InvestorProfile

export interface Session {
  email: string
  role: Role
  createdAt: number
}

const SESSION_KEY = 'buildbase.session'
const PROFILE_KEY = 'buildbase.profile'

function safeStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function getSession(): Session | null {
  const s = safeStorage()
  if (!s) return null
  const raw = s.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as Session
  } catch {
    return null
  }
}

export function setSession(session: Session) {
  const s = safeStorage()
  if (!s) return
  s.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  const s = safeStorage()
  if (!s) return
  s.removeItem(SESSION_KEY)
  s.removeItem(PROFILE_KEY)
}

export function getProfile(): Profile | null {
  const s = safeStorage()
  if (!s) return null
  const raw = s.getItem(PROFILE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as Profile
  } catch {
    return null
  }
}

export function setProfile(profile: Profile) {
  const s = safeStorage()
  if (!s) return
  s.setItem(PROFILE_KEY, JSON.stringify(profile))
}
