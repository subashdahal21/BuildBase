'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getProfile, getSession } from '@/lib/session'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const session = getSession()
    if (!session) {
      router.replace('/auth')
      return
    }
    const profile = getProfile()
    if (!profile) {
      router.replace('/onboarding')
      return
    }
    router.replace(
      profile.role === 'investor' ? '/dashboard/investor' : '/dashboard/builder'
    )
  }, [router])

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0C0C12',
        color: '#7070A0',
        fontSize: 14,
      }}
    >
      Loading Buildbase&hellip;
    </main>
  )
}
