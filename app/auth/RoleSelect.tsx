'use client'

import { useState } from 'react'
import { Role } from '@/app/auth/page'

interface Props {
  onSelect: (role: Role) => void
  onSignIn: () => void
}

export default function RoleSelect({ onSelect, onSignIn }: Props) {
  const [hovered, setHovered] = useState<Role>(null)

  const cards = [
    {
      role: 'builder' as Role,
      title: "I'm a Builder",
      desc: 'Develop projects, join teams, and get your work in front of investors.',
      color: '#7C5CFC',
      perks: ['Post & discover projects', 'AI-matched collaboration', 'GitHub activity tracking'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 22 22" fill="none">
          <path d="M6 8L2 11L6 14" stroke="#7C5CFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 8L20 11L16 14" stroke="#7C5CFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 4L9 18" stroke="#7C5CFC" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      role: 'investor' as Role,
      title: "I'm an Investor",
      desc: 'Discover verified projects with real commit history and back what matters.',
      color: '#F59E0B',
      perks: ['Browse verified projects', 'Track team activity', 'Send investment proposals'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 22 22" fill="none">
          <path d="M3 16L8 10L12 13L19 6" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 6H19V10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]

  return (
    <div style={{ width: '100%', maxWidth: 460 }}>

      {/* Mobile logo — only shows when left panel is hidden */}
      <div className="lg:hidden" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#1C1C28" />
          <path d="M8 16 C8 11 11.5 8 16 8 C20.5 8 24 11 24 16" stroke="#7C5CFC" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 16 C8 21 11.5 24 16 24 C20.5 24 24 21 24 16" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2.5" fill="#7C5CFC" />
        </svg>
        <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 20, fontWeight: 800, color: '#F0F0F8' }}>
          Buildbase
        </span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: 'clamp(26px, 4vw, 32px)',
          fontWeight: 900,
          color: '#F0F0F8',
          marginBottom: 8,
          letterSpacing: '-0.5px',
          lineHeight: 1.15,
        }}>
          Join Buildbase
        </h2>
        <p style={{ fontSize: 16, color: '#7070A0', fontWeight: 300, lineHeight: 1.6 }}>
          Who are you joining as?
        </p>
      </div>

      {/* Role cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {cards.map(c => {
          const isHov = hovered === c.role
          return (
            <div
              key={String(c.role)}
              className="role-card"
              onMouseEnter={() => setHovered(c.role)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(c.role)}
              style={{
                background: isHov ? '#1A1A2A' : '#13131E',
                border: `1px solid ${isHov ? c.color + '60' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 18,
                padding: '22px 22px',
                cursor: 'pointer',
                boxShadow: isHov ? `0 0 0 1px ${c.color}20, 0 8px 32px rgba(0,0,0,0.3)` : '0 2px 12px rgba(0,0,0,0.2)',
              }}
            >
              {/* Icon + title */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: c.color + '18',
                  border: `1px solid ${c.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#F0F0F8', marginBottom: 5, letterSpacing: '-0.2px' }}>
                    {c.title}
                  </div>
                  <div style={{ fontSize: 14, color: '#7070A0', lineHeight: 1.55, fontWeight: 300 }}>
                    {c.desc}
                  </div>
                </div>
              </div>

              {/* Perks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 18 }}>
                {c.perks.map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: c.color, flexShrink: 0, opacity: 0.8 }} />
                    <span style={{ fontSize: 13, color: '#9090B0' }}>{p}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{
                padding: '11px 0',
                borderRadius: 12,
                background: isHov ? c.color : 'transparent',
                border: `1px solid ${isHov ? c.color : c.color + '60'}`,
                color: isHov ? '#fff' : c.color,
                fontSize: 14,
                fontWeight: 600,
                textAlign: 'center',
                transition: 'all 0.2s',
                letterSpacing: '0.01em',
              }}>
                Continue as {c.role === 'builder' ? 'Builder' : 'Investor'} →
              </div>
            </div>
          )
        })}
      </div>

      {/* Sign in link */}
      <p style={{ fontSize: 15, color: '#7070A0', textAlign: 'center' }}>
        Already have an account?{' '}
        <button
          onClick={onSignIn}
          style={{
            background: 'none', border: 'none', color: '#7C5CFC',
            fontSize: 15, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, padding: 0,
          }}
        >
          Sign in
        </button>
      </p>
    </div>
  )
}
