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
      title: "I'm a User / Builder",
      desc: 'Develop projects, join teams, and get your work in front of investors.',
      color: '#7C5CFC',
      perks: ['Post & discover projects', 'AI-matched collaboration', 'GitHub activity tracking'],
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M6 8L2 11L6 14" stroke="#7C5CFC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 8L20 11L16 14" stroke="#7C5CFC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 4L9 18" stroke="#7C5CFC" strokeWidth="1.8" strokeLinecap="round" />
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
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M3 16L8 10L12 13L19 6" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 6H19V10" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]

  return (
    <div style={{ width:'100%', maxWidth:400 }}>

      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <h2 style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: 26, fontWeight: 800, color: '#F0F0F8', marginBottom: 6,
        }}>
          Join Buildbase
        </h2>
        <p style={{ fontSize:14, color:'#7070A0', fontWeight:300 }}>
          Who are you joining as?
        </p>
      </div>

      {/* Role cards */}
      <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:24 }}>
        {cards.map(c => {
          const isHov = hovered === c.role
          return (
            <div
              key={String(c.role)}
              onMouseEnter={() => setHovered(c.role)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(c.role)}
              style={{
                background: isHov ? '#1E1E2A' : '#171720',
                border: `0.5px solid ${isHov ? c.color + '50' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 16,
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {/* Icon + title row */}
              <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginBottom:14 }}>
                <div style={{
                  width:44, height:44, borderRadius:12,
                  background: c.color + '18',
                  border: `0.5px solid ${c.color}30`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <div>
                  <div style={{ fontSize:15, fontWeight:600, color:'#F0F0F8', marginBottom:4 }}>
                    {c.title}
                  </div>
                  <div style={{ fontSize:12, color:'#7070A0', lineHeight:1.5, fontWeight:300 }}>
                    {c.desc}
                  </div>
                </div>
              </div>

              {/* Perks */}
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {c.perks.map(p => (
                  <div key={p} style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:4, height:4, borderRadius:'50%', background:c.color, flexShrink:0 }} />
                    <span style={{ fontSize:12, color:'#9090B0' }}>{p}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{
                marginTop: 16,
                padding: '9px 0',
                borderRadius: 999,
                background: isHov ? c.color : 'transparent',
                border: `0.5px solid ${c.color}`,
                color: isHov ? '#fff' : c.color,
                fontSize: 13,
                fontWeight: 600,
                textAlign: 'center',
                transition: 'all 0.2s',
              }}>
                Continue as {c.role === 'builder' ? 'User / Builder' : 'Investor'}
              </div>
            </div>
          )
        })}
      </div>

      {/* Sign in link */}
      <p style={{ fontSize:13, color:'#7070A0', textAlign:'center' }}>
        Already have an account?{' '}
        <button
          onClick={onSignIn}
          style={{
            background:'none', border:'none', color:'#7C5CFC',
            fontSize:13, cursor:'pointer',
            fontFamily:"'DM Sans', sans-serif", fontWeight:500, padding:0,
          }}
        >
          Sign in
        </button>
      </p>
    </div>
  )
}