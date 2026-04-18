'use client'

import { useState } from 'react'

type NavId = 'dealflow' | 'portfolio' | 'saved' | 'messages' | 'profile'

const ACCENT = '#F59E0B'

interface Startup {
  id: number
  name: string
  tagline: string
  sector: string
  stage: 'Pre-seed' | 'Seed' | 'Series A'
  ask: string
  valuation: string
  traction: string
  aiMatch: number
  founders: { initials: string; name: string; color: string }[]
  color: string
}

interface Investment {
  id: number
  name: string
  initials: string
  color: string
  sector: string
  stage: string
  invested: string
  currentVal: string
  roi: number
  date: string
}

const STARTUPS: Startup[] = [
  {
    id: 1, name: 'NeuralSearch',
    tagline: 'AI-powered semantic search engine for enterprise codebases using vector embeddings.',
    sector: 'AI/ML', stage: 'Seed', ask: '$500K', valuation: '$3M',
    traction: '2,400 MAU · 18% MoM', aiMatch: 94,
    founders: [{ initials: 'AK', name: 'Alex Kim', color: '#7C5CFC' }, { initials: 'SR', name: 'Sara R.', color: '#10B981' }],
    color: '#7C5CFC',
  },
  {
    id: 2, name: 'FinFlow',
    tagline: 'Open-source personal finance platform with real-time team budgeting and bank sync.',
    sector: 'FinTech', stage: 'Pre-seed', ask: '$200K', valuation: '$1.2M',
    traction: '800 beta users · 32% WoW', aiMatch: 87,
    founders: [{ initials: 'PR', name: 'Priya R.', color: '#10B981' }],
    color: '#10B981',
  },
  {
    id: 3, name: 'DevMentor',
    tagline: 'Peer-to-peer mentorship connecting junior devs with experienced engineers.',
    sector: 'EdTech', stage: 'Pre-seed', ask: '$150K', valuation: '$800K',
    traction: '320 active pairs · 28% retention', aiMatch: 76,
    founders: [{ initials: 'JL', name: 'James L.', color: '#F59E0B' }, { initials: 'MP', name: 'Maya P.', color: '#3B82F6' }],
    color: '#F59E0B',
  },
]

const PORTFOLIO: Investment[] = [
  { id: 1, name: 'CloudHive', initials: 'CH', color: '#3B82F6', sector: 'Infrastructure', stage: 'Series A', invested: '$25,000', currentVal: '$42,000', roi: 68, date: 'Mar 2024' },
  { id: 2, name: 'HealthAI', initials: 'HA', color: '#10B981', sector: 'Healthcare', stage: 'Seed', invested: '$15,000', currentVal: '$18,000', roi: 20, date: 'Nov 2023' },
]

const SAVED_LIST = [
  { id: 1, name: 'PixelForge', initials: 'PF', color: '#EC4899', sector: 'Design Tools', stage: 'Seed', aiMatch: 81, savedDate: '2 days ago' },
  { id: 2, name: 'OpenChain', initials: 'OC', color: '#7C5CFC', sector: 'Web3', stage: 'Pre-seed', aiMatch: 73, savedDate: '1 week ago' },
  { id: 3, name: 'EduTrack', initials: 'ET', color: '#F59E0B', sector: 'EdTech', stage: 'Seed', aiMatch: 69, savedDate: '2 weeks ago' },
]

const MESSAGES_DATA = [
  { id: 1, name: 'Alex Kim', initials: 'AK', color: '#7C5CFC', role: 'Founder · NeuralSearch', lastMsg: 'Thanks for your interest! Happy to share our pitch deck.', time: '5m', unread: 2 },
  { id: 2, name: 'Priya R.', initials: 'PR', color: '#10B981', role: 'Founder · FinFlow', lastMsg: 'We just hit 1K users this week!', time: '1h', unread: 0 },
  { id: 3, name: 'James L.', initials: 'JL', color: '#F59E0B', role: 'Founder · DevMentor', lastMsg: 'Let me know if you need more info on our unit economics.', time: '3h', unread: 0 },
]

const HOT_SECTORS = [
  { name: 'AI/ML', count: 142, color: '#7C5CFC' },
  { name: 'FinTech', count: 89, color: '#10B981' },
  { name: 'EdTech', count: 67, color: '#F59E0B' },
  { name: 'Infrastructure', count: 54, color: '#3B82F6' },
  { name: 'Healthcare', count: 41, color: '#EC4899' },
]

const STAGE_STYLE: Record<string, { color: string; bg: string }> = {
  'Pre-seed': { color: '#3B82F6', bg: '#3B82F615' },
  'Seed':     { color: '#7C5CFC', bg: '#7C5CFC15' },
  'Series A': { color: '#10B981', bg: '#10B98115' },
}

// ── ICONS ────────────────────────────────────────────────────

function IcoDealFlow() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
    </svg>
  )
}
function IcoPortfolio() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  )
}
function IcoSaved() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function IcoMessages() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function IcoProfile() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function IcoSettings() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}
function IcoBell() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}
function IcoSparkle() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" />
    </svg>
  )
}
function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#1C1C28" />
      <path d="M8 16 C8 11 11.5 8 16 8 C20.5 8 24 11 24 16" stroke="#7C5CFC" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M8 16 C8 21 11.5 24 16 24 C20.5 24 24 21 24 16" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2.5" fill="#7C5CFC" />
    </svg>
  )
}

// ── MAIN PAGE ────────────────────────────────────────────────

export default function InvestorDashboard() {
  const [activeNav, setActiveNav] = useState<NavId>('dealflow')

  const navItems: { id: NavId; label: string; icon: React.ReactNode }[] = [
    { id: 'dealflow',  label: 'Deal Flow',      icon: <IcoDealFlow /> },
    { id: 'portfolio', label: 'Portfolio',       icon: <IcoPortfolio /> },
    { id: 'saved',     label: 'Saved Startups', icon: <IcoSaved /> },
    { id: 'messages',  label: 'Messages',        icon: <IcoMessages /> },
    { id: 'profile',   label: 'Profile',         icon: <IcoProfile /> },
  ]

  function renderContent() {
    switch (activeNav) {
      case 'dealflow':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {STARTUPS.map(s => <StartupCard key={s.id} startup={s} />)}
          </div>
        )

      case 'portfolio':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', gap: 14, marginBottom: 8 }}>
              {[
                { label: 'Total Invested', value: '$40,000', color: ACCENT },
                { label: 'Current Value',  value: '$60,000', color: '#10B981' },
                { label: 'Avg ROI',        value: '+50%',    color: '#10B981' },
                { label: 'Companies',      value: '2',       color: '#7C5CFC' },
              ].map(stat => (
                <div key={stat.label} style={{
                  flex: 1, background: '#171720',
                  border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '16px 18px',
                }}>
                  <div style={{ fontSize: 11, color: '#60608A', marginBottom: 6 }}>{stat.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: stat.color, fontFamily: "'Cabinet Grotesk', sans-serif" }}>{stat.value}</div>
                </div>
              ))}
            </div>
            {PORTFOLIO.map(inv => <PortfolioCard key={inv.id} investment={inv} />)}
          </div>
        )

      case 'saved':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SAVED_LIST.map(s => {
              const stg = STAGE_STYLE[s.stage] ?? { color: '#9090B0', bg: '' }
              return (
                <div key={s.id} style={{
                  background: '#171720', border: '0.5px solid rgba(255,255,255,0.07)',
                  borderRadius: 16, padding: '18px 22px',
                  display: 'flex', alignItems: 'center', gap: 16,
                }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                    background: s.color + '18', border: `1px solid ${s.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 800, color: s.color,
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                  }}>{s.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#F0F0F8', marginBottom: 6, fontFamily: "'Cabinet Grotesk', sans-serif" }}>{s.name}</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: '#7070A0' }}>{s.sector}</span>
                      <span style={{ fontSize: 11, color: '#30305A' }}>·</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: stg.color }}>{s.stage}</span>
                      <span style={{ fontSize: 11, color: '#30305A' }}>·</span>
                      <span style={{ fontSize: 11, color: '#60608A' }}>Saved {s.savedDate}</span>
                    </div>
                  </div>
                  <div style={{
                    fontSize: 12, fontWeight: 700, color: '#10B981',
                    background: '#10B98114', border: '0.5px solid #10B98130',
                    borderRadius: 999, padding: '4px 12px', flexShrink: 0,
                  }}>{s.aiMatch}% match</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{
                      padding: '7px 14px', borderRadius: 9,
                      background: 'transparent', border: `0.5px solid ${ACCENT}60`,
                      color: ACCENT, fontSize: 12, fontWeight: 600,
                      cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                    }}>View</button>
                    <button style={{
                      padding: '7px 14px', borderRadius: 9,
                      background: ACCENT, border: 'none',
                      color: '#000', fontSize: 12, fontWeight: 700,
                      cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                    }}>Invest</button>
                  </div>
                </div>
              )
            })}
          </div>
        )

      case 'messages':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MESSAGES_DATA.map(m => (
              <div key={m.id} style={{
                background: '#171720', border: '0.5px solid rgba(255,255,255,0.07)',
                borderRadius: 14, padding: '16px 20px',
                display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                  background: m.color + '20', border: `1.5px solid ${m.color}45`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, color: m.color,
                }}>{m.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#F0F0F8' }}>{m.name}</span>
                    <span style={{ fontSize: 11, color: '#50508A' }}>{m.time} ago</span>
                  </div>
                  <div style={{ fontSize: 11, color: ACCENT, marginBottom: 3 }}>{m.role}</div>
                  <div style={{ fontSize: 12, color: '#7070A0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.lastMsg}</div>
                </div>
                {m.unread > 0 && (
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: ACCENT, color: '#000',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700, flexShrink: 0,
                  }}>{m.unread}</div>
                )}
              </div>
            ))}
          </div>
        )

      case 'profile':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 680 }}>
            <div style={{
              background: '#171720', border: '0.5px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: '28px',
              display: 'flex', alignItems: 'center', gap: 20,
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
                background: ACCENT + '22', border: `2px solid ${ACCENT}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 800, color: ACCENT,
                fontFamily: "'Cabinet Grotesk', sans-serif",
              }}>MN</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#F0F0F8', fontFamily: "'Cabinet Grotesk', sans-serif", marginBottom: 8 }}>Mahesh Neupane</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{
                    background: ACCENT + '18', border: `0.5px solid ${ACCENT}35`,
                    borderRadius: 999, padding: '2px 10px',
                    fontSize: 11, fontWeight: 700, color: ACCENT,
                  }}>Investor</span>
                  <span style={{ fontSize: 13, color: '#50508A' }}>maheshneupane96@gmail.com</span>
                </div>
              </div>
              <button style={{
                marginLeft: 'auto', padding: '8px 18px', borderRadius: 10,
                background: 'transparent', border: `0.5px solid ${ACCENT}50`,
                color: ACCENT, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", flexShrink: 0,
              }}>Edit Profile</button>
            </div>

            <div style={{
              background: '#171720', border: '0.5px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: '22px 24px',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F0F0F8', marginBottom: 14 }}>Investment Focus</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['AI/ML', 'FinTech', 'EdTech', 'Infrastructure'].map(s => (
                  <span key={s} style={{
                    fontSize: 12, fontWeight: 500, color: '#9090B0',
                    background: '#1C1C28', border: '0.5px solid rgba(255,255,255,0.08)',
                    borderRadius: 999, padding: '4px 12px',
                  }}>{s}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 14 }}>
              {[
                { label: 'Companies Backed', value: '2' },
                { label: 'Total Deployed',   value: '$40K' },
                { label: 'Avg Ticket Size',  value: '$20K' },
              ].map(stat => (
                <div key={stat.label} style={{
                  flex: 1, background: '#171720', border: '0.5px solid rgba(255,255,255,0.07)',
                  borderRadius: 14, padding: '18px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: ACCENT, fontFamily: "'Cabinet Grotesk', sans-serif", marginBottom: 4 }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: '#60608A' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )
    }
  }

  const PAGE_TITLE: Record<NavId, string> = {
    dealflow: 'Deal Flow',
    portfolio: 'Portfolio',
    saved: 'Saved Startups',
    messages: 'Messages',
    profile: 'Profile',
  }

  return (
    <div style={{
      display: 'flex', height: '100vh', overflow: 'hidden',
      background: '#0C0C12', fontFamily: "'DM Sans', sans-serif", color: '#F0F0F8',
    }}>
      <style>{`
        .inv-nav:hover  { background: rgba(255,255,255,0.04) !important; color: #D0D0E8 !important; }
        .inv-card:hover { background: #1A1915 !important; border-color: rgba(245,158,11,0.35) !important; }
        .inv-out:hover  { background: ${ACCENT} !important; color: #000 !important; }
        .inv-fill:hover { filter: brightness(1.12); }
        .inv-set:hover  { background: rgba(255,255,255,0.04) !important; color: #D0D0E8 !important; }
        .inv-msg:hover  { background: #1A1915 !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2C2C48; border-radius: 99px; }
      `}</style>

      {/* LEFT SIDEBAR */}
      <aside style={{
        width: 240, height: '100vh', background: '#0E0E18',
        borderRight: '0.5px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column', flexShrink: 0,
      }}>
        <div style={{
          padding: '22px 20px', borderBottom: '0.5px solid rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Logo size={30} />
          <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 17, fontWeight: 800, color: '#F0F0F8', letterSpacing: '-0.3px' }}>Buildbase</span>
        </div>

        <div style={{ padding: '16px 20px', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
              background: ACCENT + '22', border: `1.5px solid ${ACCENT}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: ACCENT,
            }}>MN</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Mahesh Neupane</div>
              <div style={{
                marginTop: 4, display: 'inline-flex', alignItems: 'center',
                background: ACCENT + '18', border: `0.5px solid ${ACCENT}35`,
                borderRadius: 999, padding: '1px 9px',
                fontSize: 10, fontWeight: 700, color: ACCENT, letterSpacing: '0.04em',
              }}>Investor</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '10px 10px', overflowY: 'auto' }}>
          {navItems.map(item => {
            const active = activeNav === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={active ? '' : 'inv-nav'}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', padding: '10px 12px',
                  background: active ? ACCENT + '14' : 'transparent',
                  border: 'none', borderLeft: `3px solid ${active ? ACCENT : 'transparent'}`,
                  borderRadius: '0 10px 10px 0',
                  color: active ? '#F0F0F8' : '#60608A',
                  fontSize: 13, fontWeight: active ? 600 : 400,
                  cursor: 'pointer', textAlign: 'left',
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: 2, transition: 'all 0.15s',
                }}
              >
                <span style={{ flexShrink: 0, display: 'flex', opacity: active ? 1 : 0.7 }}>{item.icon}</span>
                {item.label}
              </button>
            )
          })}
        </nav>

        <div style={{ padding: '10px 10px', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
          <button className="inv-set" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: '10px 12px',
            background: 'transparent', border: 'none',
            borderLeft: '3px solid transparent', borderRadius: '0 10px 10px 0',
            color: '#60608A', fontSize: 13, cursor: 'pointer', textAlign: 'left',
            fontFamily: "'DM Sans', sans-serif", transition: 'all 0.15s',
          }}>
            <span style={{ flexShrink: 0, display: 'flex', opacity: 0.7 }}><IcoSettings /></span>
            Settings
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <div style={{
          padding: '16px 32px', borderBottom: '0.5px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0, background: '#0C0C12',
        }}>
          <div>
            <h1 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 20, fontWeight: 800, color: '#F0F0F8', letterSpacing: '-0.3px', marginBottom: 2 }}>
              {PAGE_TITLE[activeNav]}
            </h1>
            <p style={{ fontSize: 12, color: '#50508A' }}>Welcome back, Mahesh 👋</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={{
              width: 36, height: 36, borderRadius: 10,
              background: '#171720', border: '0.5px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#60608A', cursor: 'pointer', position: 'relative',
            }}>
              <IcoBell />
              <div style={{
                position: 'absolute', top: 8, right: 8,
                width: 6, height: 6, borderRadius: '50%',
                background: ACCENT, border: '1.5px solid #0E0E18',
              }} />
            </button>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: ACCENT + '22', border: `1.5px solid ${ACCENT}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: ACCENT,
            }}>MN</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
          {renderContent()}
        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside style={{
        width: 280, height: '100vh', background: '#0E0E18',
        borderLeft: '0.5px solid rgba(255,255,255,0.06)',
        overflowY: 'auto', padding: '24px 16px',
        display: 'flex', flexDirection: 'column', gap: 28, flexShrink: 0,
      }}>
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F8', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ color: ACCENT, display: 'flex' }}><IcoSparkle /></span>
              AI Picks for You
            </span>
            <span style={{ fontSize: 11, color: ACCENT, cursor: 'pointer', fontWeight: 500 }}>See all</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {STARTUPS.map(s => (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                background: '#171720', border: '0.5px solid rgba(255,255,255,0.07)',
                borderRadius: 12, cursor: 'pointer',
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                  background: s.color + '20', border: `1.5px solid ${s.color}45`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 800, color: s.color,
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                }}>{s.name.slice(0, 2).toUpperCase()}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F8' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: '#7070A0', marginTop: 1 }}>{s.sector}</div>
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: '#10B981',
                  background: '#10B98114', border: '0.5px solid #10B98130',
                  borderRadius: 999, padding: '2px 8px', flexShrink: 0,
                }}>{s.aiMatch}%</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.05)' }} />

        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F8' }}>Hot Sectors</span>
            <span style={{ fontSize: 11, color: ACCENT, cursor: 'pointer', fontWeight: 500 }}>Explore</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {HOT_SECTORS.map((s, i) => (
              <div key={s.name} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '9px 10px', borderRadius: 9, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 11, color: '#30305A', fontWeight: 700, width: 16, textAlign: 'center' }}>{i + 1}</span>
                  <span style={{ fontSize: 13, color: '#C0C0D8', fontWeight: 500 }}>{s.name}</span>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 600, color: s.color,
                  background: s.color + '14', border: `0.5px solid ${s.color}30`,
                  borderRadius: 999, padding: '2px 8px',
                }}>{s.count} startups</span>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  )
}

// ── STARTUP CARD ─────────────────────────────────────────────

function StartupCard({ startup }: { startup: Startup }) {
  const stg = STAGE_STYLE[startup.stage] ?? { color: '#9090B0', bg: '#9090B015' }
  return (
    <div className="inv-card" style={{
      background: '#171720', border: '0.5px solid rgba(255,255,255,0.07)',
      borderRadius: 16, padding: '20px 22px', transition: 'all 0.2s',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 13, flexShrink: 0,
          background: startup.color + '18', border: `1px solid ${startup.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 800, color: startup.color,
          fontFamily: "'Cabinet Grotesk', sans-serif",
        }}>{startup.name.slice(0, 2).toUpperCase()}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <h3 style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: 17, fontWeight: 800, color: '#F0F0F8',
              letterSpacing: '-0.2px', marginBottom: 5,
            }}>{startup.name}</h3>
            <div style={{
              flexShrink: 0, background: stg.bg, border: `0.5px solid ${stg.color}35`,
              borderRadius: 999, padding: '4px 12px',
              fontSize: 11, fontWeight: 700, color: stg.color, whiteSpace: 'nowrap',
            }}>{startup.stage}</div>
          </div>
          <p style={{ fontSize: 13, color: '#7070A0', lineHeight: 1.55, fontWeight: 300 }}>{startup.tagline}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        {[
          { label: 'Asking', value: startup.ask },
          { label: 'Valuation', value: startup.valuation },
          { label: 'Traction', value: startup.traction },
        ].map(m => (
          <div key={m.label} style={{
            background: '#1C1C28', border: '0.5px solid rgba(255,255,255,0.07)',
            borderRadius: 10, padding: '7px 12px',
          }}>
            <div style={{ fontSize: 10, color: '#50508A', marginBottom: 2 }}>{m.label}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#C0C0D8' }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 7,
        background: '#F59E0B0C', border: '0.5px solid #F59E0B28',
        borderRadius: 10, padding: '8px 12px', marginBottom: 14,
      }}>
        <span style={{ color: ACCENT, display: 'flex' }}><IcoSparkle /></span>
        <span style={{ fontSize: 12, color: '#F5C067', fontWeight: 500 }}>
          {startup.aiMatch}% match with your investment thesis
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {startup.founders.map(f => (
            <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: f.color + '22', border: `1.5px solid ${f.color}45`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 700, color: f.color,
              }}>{f.initials}</div>
              <span style={{ fontSize: 11, color: '#9090B0' }}>{f.name}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="inv-out" style={{
            padding: '7px 14px', borderRadius: 9,
            background: 'transparent', border: `0.5px solid ${ACCENT}60`,
            color: ACCENT, fontSize: 12, fontWeight: 600,
            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.15s',
          }}>Save</button>
          <button className="inv-fill" style={{
            padding: '7px 14px', borderRadius: 9,
            background: ACCENT, border: 'none',
            color: '#000', fontSize: 12, fontWeight: 700,
            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'filter 0.15s',
          }}>Invest Now</button>
        </div>
      </div>
    </div>
  )
}

// ── PORTFOLIO CARD ────────────────────────────────────────────

function PortfolioCard({ investment }: { investment: Investment }) {
  return (
    <div style={{
      background: '#171720', border: '0.5px solid rgba(255,255,255,0.07)',
      borderRadius: 16, padding: '20px 22px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 50, height: 50, borderRadius: 14, flexShrink: 0,
          background: investment.color + '18', border: `1px solid ${investment.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 800, color: investment.color,
          fontFamily: "'Cabinet Grotesk', sans-serif",
        }}>{investment.initials}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: '#F0F0F8', fontFamily: "'Cabinet Grotesk', sans-serif", marginBottom: 5 }}>{investment.name}</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#7070A0' }}>{investment.sector}</span>
            <span style={{ fontSize: 11, color: '#30305A' }}>·</span>
            <span style={{ fontSize: 11, color: '#7070A0' }}>{investment.stage}</span>
            <span style={{ fontSize: 11, color: '#30305A' }}>·</span>
            <span style={{ fontSize: 11, color: '#60608A' }}>Since {investment.date}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, textAlign: 'right' }}>
          <div>
            <div style={{ fontSize: 10, color: '#50508A', marginBottom: 4 }}>Invested</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#C0C0D8' }}>{investment.invested}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#50508A', marginBottom: 4 }}>Current</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#F0F0F8' }}>{investment.currentVal}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#50508A', marginBottom: 4 }}>ROI</div>
            <div style={{
              fontSize: 14, fontWeight: 800, color: '#10B981',
              background: '#10B98114', border: '0.5px solid #10B98130',
              borderRadius: 8, padding: '3px 10px',
            }}>+{investment.roi}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
