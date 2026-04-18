'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import RoleSelect from '@/app/auth/RoleSelect'
import SignUp from '@/app/auth/SignUp'
import SignIn from '@/app/auth/SignIn'

export type Role = 'builder' | 'investor' | null
export type AuthView = 'role' | 'signup' | 'signin'

export default function AuthPage() {
  const [view, setView] = useState<AuthView>('role')
  const router = useRouter()
  const [role, setRole] = useState<Role>(null)

 const handleRoleSelect = (selected: Role) => {
  setRole(selected)
  if (selected === 'investor') {
    router.push('/dashboard/investor')
  } else {
    router.push('/dashboard/builder')
  }
}

  return (
    <main style={{ display: 'flex', minHeight: '100dvh', background: '#0C0C12', fontFamily: "'DM Sans', sans-serif" }}>

      {/* LEFT PANEL — hidden on mobile */}
      <div className="auth-left">

        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: -120, right: -120, width: 500, height: 500, background: '#7C5CFC', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 380, height: 380, background: '#10B981', borderRadius: '50%', opacity: 0.06, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', left: '30%', width: 200, height: 200, background: '#F59E0B', borderRadius: '50%', opacity: 0.04, pointerEvents: 'none' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, zIndex: 1 }}>
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="9" fill="#1C1C28" />
            <path d="M8 16 C8 11 11.5 8 16 8 C20.5 8 24 11 24 16" stroke="#7C5CFC" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M8 16 C8 21 11.5 24 16 24 C20.5 24 24 21 24 16" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="16" cy="16" r="2.5" fill="#7C5CFC" />
          </svg>
          <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: '#F0F0F8', letterSpacing: '-0.3px' }}>
            Buildbase
          </span>
        </div>

        {/* Hero text */}
        <div style={{ zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#7C5CFC15', border: '0.5px solid #7C5CFC30',
            borderRadius: 999, padding: '5px 14px',
            fontSize: 12, fontWeight: 600, color: '#7C5CFC',
            marginBottom: 20, letterSpacing: '0.02em',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C5CFC', boxShadow: '0 0 6px #7C5CFC' }} />
            Now in beta · Join 1,200+ members
          </div>
          <h1 style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: 'clamp(38px, 4.5vw, 58px)',
            fontWeight: 900,
            color: '#F0F0F8',
            lineHeight: 1.1,
            marginBottom: 20,
            letterSpacing: '-1.5px',
          }}>
            Build together.<br />
            <span style={{
              background: 'linear-gradient(135deg, #7C5CFC 0%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Fund what matters.
            </span>
          </h1>
          <p style={{ fontSize: 17, color: '#7070A0', lineHeight: 1.75, maxWidth: 380, fontWeight: 300 }}>
            The platform where builders find their team and investors discover what&apos;s worth backing.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 32, marginTop: 36 }}>
            {[['1.2K+', 'Active builders'], ['$4M+', 'Funded projects'], ['320+', 'Investors']].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: '#F0F0F8', letterSpacing: '-0.5px' }}>{val}</div>
                <div style={{ fontSize: 12, color: '#50507A', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating profile cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, zIndex: 1 }}>
          <FloatingCard initials="MN" color="#7C5CFC" name="Mahesh N." role="Full-stack Builder" tag="React · Python · AWS" />
          <FloatingCard initials="SR" color="#F59E0B" name="Sarah R." role="Investor · FinTech" tag="$50K–$200K range" offset />
          <FloatingCard initials="JK" color="#10B981" name="James K." role="ML Engineer" tag="PyTorch · TensorFlow" />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        {view === 'role' && (
          <RoleSelect onSelect={handleRoleSelect} onSignIn={() => setView('signin')} />
        )}
        {view === 'signup' && (
          <SignUp role={role!} onBack={() => setView('role')} onSignIn={() => setView('signin')} />
        )}
        {view === 'signin' && (
          <SignIn onBack={() => setView('role')} onSignUp={() => setView('role')} />
        )}
      </div>
    </main>
  )
}

function FloatingCard({ initials, color, name, role, tag, offset }: {
  initials: string
  color: string
  name: string
  role: string
  tag: string
  offset?: boolean
}) {
  return (
    <div className="float-card" style={{
      display: 'flex', alignItems: 'center', gap: 14,
      background: '#13131E',
      border: '0.5px solid rgba(255,255,255,0.08)',
      borderRadius: 14, padding: '14px 18px',
      marginLeft: offset ? 40 : 0,
      width: 'fit-content', minWidth: 280,
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        background: color + '22', border: `1.5px solid ${color}55`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 700, color, flexShrink: 0,
        letterSpacing: '0.02em',
      }}>{initials}</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F0F8' }}>{name}</div>
        <div style={{ fontSize: 12, color: '#7070A0', marginTop: 1 }}>{role}</div>
        <div style={{
          marginTop: 5, fontSize: 11, color,
          background: color + '15', border: `0.5px solid ${color}30`,
          borderRadius: 999, padding: '2px 9px', display: 'inline-block', fontWeight: 500,
        }}>{tag}</div>
      </div>
    </div>
  )
}
