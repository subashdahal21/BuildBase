'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RoleSelect from '@/app/auth/RoleSelect'
import SignUp from '@/app/auth/SignUp'
import SignIn from '@/app/auth/SignIn'
import { getProfile, setSession } from '@/lib/session'

export type Role = 'builder' | 'investor' | null
export type AuthView = 'role' | 'signup' | 'signin'

export default function AuthPage() {
  const router = useRouter()
  const [view, setView] = useState<AuthView>('role')
  const [role, setRole] = useState<Role>(null)

  const handleRoleSelect = (selected: Role) => {
    setRole(selected)
    setView('signup')
  }

  const handleAuthSuccess = (email: string, selectedRole: 'builder' | 'investor') => {
    setSession({ email, role: selectedRole, createdAt: Date.now() })
    const existingProfile = getProfile()
    if (existingProfile && existingProfile.role === selectedRole) {
      router.push(selectedRole === 'investor' ? '/dashboard/investor' : '/dashboard/builder')
    } else {
      router.push('/onboarding')
    }
  }

  return (
    <main
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#0C0C12',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── LEFT PANEL ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '40px 48px',
          borderRight: '0.5px solid rgba(255,255,255,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* glow orbs */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            background: '#7C5CFC',
            borderRadius: '50%',
            opacity: 0.07,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            background: '#10B981',
            borderRadius: '50%',
            opacity: 0.06,
            pointerEvents: 'none',
          }}
        />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, zIndex: 1 }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#1C1C28" />
            <path
              d="M8 16 C8 11 11.5 8 16 8 C20.5 8 24 11 24 16"
              stroke="#7C5CFC"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 16 C8 21 11.5 24 16 24 C20.5 24 24 21 24 16"
              stroke="#10B981"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="16" cy="16" r="2.5" fill="#7C5CFC" />
          </svg>
          <span
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              color: '#F0F0F8',
            }}
          >
            Buildbase
          </span>
        </div>

        {/* Hero text */}
        <div style={{ zIndex: 1 }}>
          <h1
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 900,
              color: '#F0F0F8',
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Build together.
            <br />
            <span style={{ color: '#7C5CFC' }}>Fund what matters.</span>
          </h1>
          <p
            style={{
              fontSize: 15,
              color: '#7070A0',
              lineHeight: 1.7,
              maxWidth: 360,
              fontWeight: 300,
            }}
          >
            The platform where builders find their team and investors find what&apos;s worth
            backing.
          </p>
        </div>

        {/* Floating cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, zIndex: 1 }}>
          <FloatingCard
            initials="MN"
            color="#7C5CFC"
            name="Mahesh N."
            role="Full-stack Builder"
            tag="React · Python · AWS"
          />
          <FloatingCard
            initials="SR"
            color="#F59E0B"
            name="Sarah R."
            role="Investor · FinTech"
            tag="$50K–$200K range"
            offset
          />
          <FloatingCard
            initials="JK"
            color="#10B981"
            name="James K."
            role="ML Engineer"
            tag="PyTorch · TensorFlow"
          />
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        style={{
          width: 480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 48px',
        }}
      >
        {view === 'role' && (
          <RoleSelect
            onSelect={handleRoleSelect}
            onSignIn={() => setView('signin')}
          />
        )}
        {view === 'signup' && role && (
          <SignUp
            role={role}
            onBack={() => setView('role')}
            onSignIn={() => setView('signin')}
            onSuccess={handleAuthSuccess}
          />
        )}
        {view === 'signin' && (
          <SignIn
            onBack={() => setView('role')}
            onSignUp={() => setView('role')}
            onSuccess={handleAuthSuccess}
          />
        )}
      </div>
    </main>
  )
}

function FloatingCard({
  initials,
  color,
  name,
  role,
  tag,
  offset,
}: {
  initials: string
  color: string
  name: string
  role: string
  tag: string
  offset?: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: '#171720',
        border: '0.5px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: '12px 16px',
        marginLeft: offset ? 32 : 0,
        width: 'fit-content',
        minWidth: 260,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: color + '22',
          border: `1.5px solid ${color}55`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 600,
          color,
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#F0F0F8' }}>{name}</div>
        <div style={{ fontSize: 11, color: '#7070A0', marginTop: 1 }}>{role}</div>
        <div
          style={{
            marginTop: 4,
            fontSize: 10,
            color,
            background: color + '15',
            border: `0.5px solid ${color}30`,
            borderRadius: 999,
            padding: '2px 8px',
            display: 'inline-block',
          }}
        >
          {tag}
        </div>
      </div>
    </div>
  )
}
