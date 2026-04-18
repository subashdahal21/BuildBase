'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Profile,
  getProfile,
  getSession,
  clearSession,
  Role,
} from '@/lib/session'
import {
  PROJECTS,
  COLLAB_REQUESTS,
  INVESTOR_DEALS,
  SUGGESTED_COLLABORATORS,
  SUGGESTED_FOUNDERS,
  TRENDING_PROJECTS,
  TRENDING_SECTORS,
  STAGE_STYLES,
  Project,
  CollabRequest,
  InvestorDeal,
  getCreatedProjects,
  CreatedProject,
} from '@/lib/projects'

// ── TYPES ────────────────────────────────────────────────────

type BuilderNav = 'feed' | 'projects' | 'collab' | 'messages' | 'profile'
type InvestorNav = 'feed' | 'portfolio' | 'requests' | 'messages' | 'profile'
type NavId = BuilderNav | InvestorNav

type Tab = 'feed' | 'collab'

// ── ICONS ────────────────────────────────────────────────────

function IcoFeed() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}
function IcoProjects() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function IcoCollab() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
function IcoPortfolio() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-5" />
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
function IcoGithub() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
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
function IcoPlus() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}
function IcoLogout() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
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

// ── MAIN COMPONENT ───────────────────────────────────────────

export default function DashboardShell({ forcedRole }: { forcedRole?: Role }) {
  const router = useRouter()
  const [profile, setProfileState] = useState<Profile | null>(null)
  const [createdProjects, setCreatedProjects] = useState<CreatedProject[]>([])
  const [activeNav, setActiveNav] = useState<NavId>('feed')
  const [activeTab, setActiveTab] = useState<Tab>('feed')

  useEffect(() => {
    const s = getSession()
    if (!s) {
      router.replace('/auth')
      return
    }
    const p = getProfile()
    if (!p) {
      router.replace('/onboarding')
      return
    }
    // If forcedRole is set and doesn't match the saved profile's role,
    // route the user to the correct dashboard.
    if (forcedRole && p.role !== forcedRole) {
      router.replace(p.role === 'investor' ? '/dashboard/investor' : '/dashboard/builder')
      return
    }
    setProfileState(p)
    setCreatedProjects(getCreatedProjects())
  }, [router, forcedRole])

  const role: Role = forcedRole ?? profile?.role ?? 'builder'
  const accent = role === 'investor' ? '#F59E0B' : '#7C5CFC'

  const feedProjects: Project[] = useMemo(() => {
    const mine: Project[] = createdProjects.map(cp => ({
      id: cp.id,
      name: cp.name,
      desc: cp.description || cp.tagline,
      domain: cp.domain,
      stage: cp.stage,
      techStack: cp.techStack,
      author: {
        initials: ownerInitials(cp.ownerName),
        name: cp.ownerName,
        color: accent,
        role: cp.ownerRole === 'investor' ? 'Investor' : 'Builder',
      },
      commits: 0,
      aiSuggested: true,
      raising: cp.raising,
      raiseStage: cp.raiseStage,
    }))
    return [...mine, ...PROJECTS]
  }, [createdProjects, accent])

  if (!profile) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0C0C12',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#50508A',
          fontSize: 14,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Loading&hellip;
      </div>
    )
  }

  const roleLabel = role === 'investor' ? 'Investor' : 'Builder'
  const initials =
    profile.name
      .split(/\s+/)
      .map(p => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || '?'

  const builderNav: { id: BuilderNav; label: string; icon: React.ReactNode }[] = [
    { id: 'feed', label: 'Feed', icon: <IcoFeed /> },
    { id: 'projects', label: 'My Projects', icon: <IcoProjects /> },
    { id: 'collab', label: 'Collaboration Requests', icon: <IcoCollab /> },
    { id: 'messages', label: 'Messages', icon: <IcoMessages /> },
    { id: 'profile', label: 'Profile', icon: <IcoProfile /> },
  ]

  const investorNav: { id: InvestorNav; label: string; icon: React.ReactNode }[] = [
    { id: 'feed', label: 'Deal Flow', icon: <IcoFeed /> },
    { id: 'portfolio', label: 'Portfolio', icon: <IcoPortfolio /> },
    { id: 'requests', label: 'Investment Requests', icon: <IcoCollab /> },
    { id: 'messages', label: 'Messages', icon: <IcoMessages /> },
    { id: 'profile', label: 'Profile', icon: <IcoProfile /> },
  ]

  const navItems = role === 'investor' ? investorNav : builderNav

  const handleNav = (id: NavId) => {
    setActiveNav(id)
    if (id === 'feed') setActiveTab('feed')
    if (id === 'collab' || id === 'requests') setActiveTab('collab')
  }

  const showTabs =
    activeNav === 'feed' ||
    activeNav === 'collab' ||
    activeNav === 'requests'

  const feedTabLabel = role === 'investor' ? 'Deal Flow' : 'Project Feed'
  const collabTabLabel =
    role === 'investor' ? 'Investment Requests' : 'Collaboration Requests'

  const topTitle = role === 'investor' ? 'Investor Dashboard' : 'Builder Dashboard'
  const topSub =
    role === 'investor'
      ? `Welcome back, ${profile.name.split(/\s+/)[0] || 'there'} — ${
          (profile as { sectors?: string[] }).sectors?.slice(0, 2).join(' · ') ||
          'your sectors'
        } are active today`
      : `Welcome back, ${profile.name.split(/\s+/)[0] || 'there'} 👋`

  const ctaLabel =
    role === 'investor' ? 'New Proposal' : 'New Project'

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        background: '#0C0C12',
        fontFamily: "'DM Sans', sans-serif",
        color: '#F0F0F8',
      }}
    >
      <style>{`
        .nav-item:hover   { background: rgba(255,255,255,0.04) !important; color: #D0D0E8 !important; }
        .nav-item:hover svg { opacity: 0.85; }
        .card-p:hover     { background: #1A1A28 !important; border-color: rgba(124,92,252,0.35) !important; }
        .card-i:hover     { background: #1A1915 !important; border-color: rgba(245,158,11,0.35) !important; }
        .card-c:hover     { background: #1A1915 !important; border-color: rgba(245,158,11,0.35) !important; }
        .btn-outline:hover { background: ${accent} !important; color: #fff !important; }
        .btn-fill:hover   { filter: brightness(1.12); }
        .side-item:hover  { background: #1E1E2A !important; }
        .trend-item:hover { background: rgba(255,255,255,0.03) !important; }
        .settings-btn:hover { background: rgba(255,255,255,0.04) !important; color: #D0D0E8 !important; }
        .tab-btn          { transition: border-color 0.15s, color 0.15s; }
        .tab-btn:hover    { color: #D0D0E8 !important; }
        .topbtn:hover     { filter: brightness(1.12); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2C2C48; border-radius: 99px; }
      `}</style>

      {/* ═══ LEFT SIDEBAR ═══ */}
      <aside
        style={{
          width: 240,
          height: '100vh',
          background: '#0E0E18',
          borderRight: '0.5px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: '22px 20px',
            borderBottom: '0.5px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Logo size={30} />
          <span
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: 17,
              fontWeight: 800,
              color: '#F0F0F8',
              letterSpacing: '-0.3px',
            }}
          >
            Buildbase
          </span>
        </div>

        {/* User info */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '0.5px solid rgba(255,255,255,0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: accent + '22',
                border: `1.5px solid ${accent}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: accent,
                flexShrink: 0,
                letterSpacing: '0.02em',
              }}
            >
              {initials}
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#F0F0F8',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {profile.name}
              </div>
              <div
                style={{
                  marginTop: 4,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  background: accent + '18',
                  border: `0.5px solid ${accent}35`,
                  borderRadius: 999,
                  padding: '1px 9px',
                  fontSize: 10,
                  fontWeight: 700,
                  color: accent,
                  letterSpacing: '0.04em',
                }}
              >
                {roleLabel}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '10px 10px', overflowY: 'auto' }}>
          {navItems.map(item => {
            const active = activeNav === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id as NavId)}
                className={active ? '' : 'nav-item'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '10px 12px',
                  background: active ? accent + '14' : 'transparent',
                  border: 'none',
                  borderLeft: `3px solid ${active ? accent : 'transparent'}`,
                  borderRadius: '0 10px 10px 0',
                  color: active ? '#F0F0F8' : '#60608A',
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: 2,
                  transition: 'all 0.15s',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    display: 'flex',
                    opacity: active ? 1 : 0.7,
                  }}
                >
                  {item.icon}
                </span>
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Sign out */}
        <div
          style={{
            padding: '10px 10px',
            borderTop: '0.5px solid rgba(255,255,255,0.05)',
          }}
        >
          <button
            className="settings-btn"
            onClick={() => {
              clearSession()
              router.push('/auth')
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              width: '100%',
              padding: '10px 12px',
              background: 'transparent',
              border: 'none',
              borderLeft: '3px solid transparent',
              borderRadius: '0 10px 10px 0',
              color: '#60608A',
              fontSize: 13,
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.15s',
            }}
          >
            <span style={{ flexShrink: 0, display: 'flex', opacity: 0.7 }}>
              <IcoLogout />
            </span>
            Sign out
          </button>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        {/* Top bar */}
        <div
          style={{
            padding: '16px 32px',
            borderBottom: '0.5px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            background: '#0C0C12',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 20,
                fontWeight: 800,
                color: '#F0F0F8',
                letterSpacing: '-0.3px',
                marginBottom: 2,
              }}
            >
              {topTitle}
            </h1>
            <p style={{ fontSize: 12, color: '#50508A' }}>{topSub}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* New Project / Proposal CTA */}
            <button
              className="topbtn"
              onClick={() => router.push('/create')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '9px 14px',
                borderRadius: 10,
                background: accent,
                border: 'none',
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <IcoPlus />
              {ctaLabel}
            </button>
            {/* Notification bell */}
            <button
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: '#171720',
                border: '0.5px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#60608A',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <IcoBell />
              <div
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: accent,
                  border: '1.5px solid #0E0E18',
                }}
              />
            </button>
            {/* Avatar */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: accent + '22',
                border: `1.5px solid ${accent}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: accent,
              }}
            >
              {initials}
            </div>
          </div>
        </div>

        {/* Tab bar */}
        {showTabs && (
          <div
            style={{
              padding: '0 32px',
              borderBottom: '0.5px solid rgba(255,255,255,0.06)',
              display: 'flex',
              gap: 0,
              flexShrink: 0,
              background: '#0C0C12',
            }}
          >
            {(
              [
                ['feed', feedTabLabel],
                ['collab', collabTabLabel],
              ] as [Tab, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id)
                  if (role === 'investor') {
                    setActiveNav(id === 'feed' ? 'feed' : 'requests')
                  } else {
                    setActiveNav(id === 'feed' ? 'feed' : 'collab')
                  }
                }}
                className="tab-btn"
                style={{
                  padding: '13px 20px',
                  background: 'none',
                  border: 'none',
                  borderBottom: `2px solid ${
                    activeTab === id ? accent : 'transparent'
                  }`,
                  color: activeTab === id ? '#F0F0F8' : '#60608A',
                  fontSize: 13,
                  fontWeight: activeTab === id ? 600 : 400,
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: -0.5,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
          {showTabs ? (
            activeTab === 'feed' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {role === 'investor'
                  ? INVESTOR_DEALS.map(d => (
                      <InvestorDealCard key={d.id} deal={d} />
                    ))
                  : feedProjects.map(p => (
                      <ProjectCard key={p.id} project={p} accent={accent} />
                    ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {role === 'investor'
                  ? INVESTOR_DEALS.filter(d => d.matched).map(d => (
                      <InvestorRequestCard key={d.id} deal={d} />
                    ))
                  : COLLAB_REQUESTS.map(r => (
                      <CollabCard key={r.id} req={r} accent={accent} />
                    ))}
              </div>
            )
          ) : (
            <EmptyState
              label={
                navItems.find(n => n.id === activeNav)?.label ?? 'Coming soon'
              }
              icon={navItems.find(n => n.id === activeNav)?.icon}
            />
          )}
        </div>
      </main>

      {/* ═══ RIGHT SIDEBAR ═══ */}
      <aside
        style={{
          width: 280,
          height: '100vh',
          background: '#0E0E18',
          borderLeft: '0.5px solid rgba(255,255,255,0.06)',
          overflowY: 'auto',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          flexShrink: 0,
        }}
      >
        {/* Suggested people */}
        <section>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 14,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F8' }}>
              {role === 'investor'
                ? 'Suggested Founders'
                : 'Suggested Collaborators'}
            </span>
            <span
              style={{
                fontSize: 11,
                color: accent,
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              See all
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(role === 'investor'
              ? SUGGESTED_FOUNDERS
              : SUGGESTED_COLLABORATORS
            ).map(s => (
              <div
                key={s.name}
                className="side-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  background: '#171720',
                  border: '0.5px solid rgba(255,255,255,0.07)',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: s.color + '20',
                    border: `1.5px solid ${s.color}45`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    color: s.color,
                    flexShrink: 0,
                  }}
                >
                  {s.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#F0F0F8',
                    }}
                  >
                    {s.name}
                  </div>
                  <div
                    style={{ fontSize: 11, color: '#7070A0', marginTop: 1 }}
                  >
                    {s.role}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#10B981',
                    background: '#10B98114',
                    border: '0.5px solid #10B98130',
                    borderRadius: 999,
                    padding: '2px 8px',
                    flexShrink: 0,
                  }}
                >
                  {s.match}%
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.05)' }} />

        {/* Trending */}
        <section>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 14,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F8' }}>
              {role === 'investor'
                ? 'Trending Sectors'
                : 'Trending Projects'}
            </span>
            <span
              style={{
                fontSize: 11,
                color: accent,
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Explore
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {(role === 'investor' ? TRENDING_SECTORS : TRENDING_PROJECTS).map(
              (t, i) => (
                <div
                  key={t.name}
                  className="trend-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 10px',
                    borderRadius: 9,
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        fontSize: 11,
                        color: '#30305A',
                        fontWeight: 700,
                        width: 16,
                        textAlign: 'center',
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: '#C0C0D8',
                        fontWeight: 500,
                      }}
                    >
                      {t.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: t.color,
                      background: t.color + '14',
                      border: `0.5px solid ${t.color}30`,
                      borderRadius: 999,
                      padding: '2px 8px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t.tag}
                  </span>
                </div>
              )
            )}
          </div>
        </section>
      </aside>
    </div>
  )
}

// ── BUILDER PROJECT CARD ─────────────────────────────────────

function ProjectCard({ project, accent }: { project: Project; accent: string }) {
  const stg = STAGE_STYLES[project.stage]
  return (
    <div
      className="card-p"
      style={{
        background: '#171720',
        border: '0.5px solid rgba(255,255,255,0.07)',
        borderRadius: 16,
        padding: '20px 22px',
        transition: 'all 0.2s',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <div style={{ minWidth: 0, paddingRight: 12 }}>
          <h3
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: 17,
              fontWeight: 800,
              color: '#F0F0F8',
              letterSpacing: '-0.2px',
              marginBottom: 5,
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              fontSize: 13,
              color: '#7070A0',
              lineHeight: 1.55,
              fontWeight: 300,
            }}
          >
            {project.desc}
          </p>
        </div>
        <div
          style={{
            flexShrink: 0,
            background: stg.bg,
            border: `0.5px solid ${stg.color}35`,
            borderRadius: 999,
            padding: '4px 12px',
            fontSize: 11,
            fontWeight: 700,
            color: stg.color,
            whiteSpace: 'nowrap',
          }}
        >
          {project.stage}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            marginBottom: 8,
          }}
        >
          <span style={{ color: accent, display: 'flex' }}>
            <IcoSparkle />
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: accent,
              letterSpacing: '0.02em',
            }}
          >
            AI Suggested
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.techStack.map(t => (
            <span
              key={t}
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: '#9090B0',
                background: '#1C1C28',
                border: '0.5px solid rgba(255,255,255,0.08)',
                borderRadius: 999,
                padding: '3px 10px',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: project.author.color + '22',
              border: `1.5px solid ${project.author.color}45`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 9,
              fontWeight: 700,
              color: project.author.color,
            }}
          >
            {project.author.initials}
          </div>
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#C0C0D8',
                lineHeight: 1.2,
              }}
            >
              {project.author.name}
            </div>
            <div style={{ fontSize: 10, color: accent, fontWeight: 500 }}>
              {project.author.role ?? 'Builder'}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              background: '#1C1C28',
              border: '0.5px solid rgba(255,255,255,0.07)',
              borderRadius: 999,
              padding: '3px 10px',
              fontSize: 11,
              color: '#9090B0',
            }}
          >
            <span style={{ display: 'flex', color: '#60608A' }}>
              <IcoGithub />
            </span>
            {project.commits}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn-outline"
            style={{
              padding: '7px 14px',
              borderRadius: 9,
              background: 'transparent',
              border: `0.5px solid ${accent}60`,
              color: accent,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.15s',
            }}
          >
            View Project
          </button>
          <button
            className="btn-fill"
            style={{
              padding: '7px 14px',
              borderRadius: 9,
              background: accent,
              border: 'none',
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'filter 0.15s',
            }}
          >
            Request to Join
          </button>
        </div>
      </div>
    </div>
  )
}

// ── INVESTOR DEAL CARD (feed) ────────────────────────────────

function InvestorDealCard({ deal }: { deal: InvestorDeal }) {
  const stg = STAGE_STYLES[deal.stage]
  return (
    <div
      className="card-i"
      style={{
        background: '#171720',
        border: '0.5px solid rgba(255,255,255,0.07)',
        borderRadius: 16,
        padding: '20px 22px',
        transition: 'all 0.2s',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 14,
          gap: 14,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 14,
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              background: deal.color + '18',
              border: `1px solid ${deal.color}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 800,
              color: deal.color,
              flexShrink: 0,
              fontFamily: "'Cabinet Grotesk', sans-serif",
            }}
          >
            {deal.initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <h3
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 17,
                fontWeight: 800,
                color: '#F0F0F8',
                letterSpacing: '-0.2px',
                marginBottom: 4,
              }}
            >
              {deal.project}
            </h3>
            <p
              style={{
                fontSize: 13,
                color: '#7070A0',
                lineHeight: 1.55,
                fontWeight: 300,
              }}
            >
              {deal.tagline}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
          <div
            style={{
              background: stg.bg,
              border: `0.5px solid ${stg.color}35`,
              borderRadius: 999,
              padding: '4px 12px',
              fontSize: 11,
              fontWeight: 700,
              color: stg.color,
              whiteSpace: 'nowrap',
            }}
          >
            {deal.stage}
          </div>
          <div
            style={{
              background: '#F59E0B15',
              border: '0.5px solid #F59E0B30',
              borderRadius: 999,
              padding: '4px 12px',
              fontSize: 11,
              fontWeight: 700,
              color: '#F59E0B',
              whiteSpace: 'nowrap',
            }}
          >
            {deal.raiseStage} · {deal.raising}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            marginBottom: 8,
          }}
        >
          <span style={{ color: '#F59E0B', display: 'flex' }}>
            <IcoSparkle />
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#F59E0B',
              letterSpacing: '0.02em',
            }}
          >
            Traction signals
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {deal.traction.map(t => (
            <span
              key={t}
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: '#9090B0',
                background: '#1C1C28',
                border: '0.5px solid rgba(255,255,255,0.08)',
                borderRadius: 999,
                padding: '3px 10px',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: deal.color + '22',
              border: `1.5px solid ${deal.color}45`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 9,
              fontWeight: 700,
              color: deal.color,
            }}
          >
            {ownerInitials(deal.founder.name)}
          </div>
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#C0C0D8',
                lineHeight: 1.2,
              }}
            >
              {deal.founder.name}
            </div>
            <div style={{ fontSize: 10, color: '#7070A0', fontWeight: 500 }}>
              {deal.founder.headline}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn-outline"
            style={{
              padding: '7px 14px',
              borderRadius: 9,
              background: 'transparent',
              border: '0.5px solid #F59E0B60',
              color: '#F59E0B',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.15s',
            }}
          >
            View Pitch
          </button>
          <button
            className="btn-fill"
            style={{
              padding: '7px 14px',
              borderRadius: 9,
              background: '#F59E0B',
              border: 'none',
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'filter 0.15s',
            }}
          >
            Send Proposal
          </button>
        </div>
      </div>
    </div>
  )
}

// ── BUILDER COLLAB REQUEST CARD ──────────────────────────────

function CollabCard({ req, accent }: { req: CollabRequest; accent: string }) {
  return (
    <div
      className="card-c"
      style={{
        background: '#171720',
        border: '0.5px solid rgba(255,255,255,0.07)',
        borderRadius: 16,
        padding: '20px 22px',
        transition: 'all 0.2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 13,
            background: req.color + '18',
            border: `1px solid ${req.color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 800,
            color: req.color,
            flexShrink: 0,
            fontFamily: "'Cabinet Grotesk', sans-serif",
          }}
        >
          {req.initials}
        </div>
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#F0F0F8',
              letterSpacing: '-0.2px',
              marginBottom: 7,
              fontFamily: "'Cabinet Grotesk', sans-serif",
            }}
          >
            {req.project}
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#F59E0B15',
              border: '1px solid #F59E0B30',
              borderRadius: 999,
              padding: '5px 14px',
              fontSize: 12,
              fontWeight: 700,
              color: '#F59E0B',
            }}
          >
            {req.role}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {req.skills.map(s => (
          <span
            key={s}
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: '#9090B0',
              background: '#1C1C28',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: 999,
              padding: '3px 10px',
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {req.matched && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            background: accent + '0C',
            border: `0.5px solid ${accent}28`,
            borderRadius: 10,
            padding: '8px 12px',
            marginBottom: 14,
          }}
        >
          <span style={{ color: accent, display: 'flex' }}>
            <IcoSparkle />
          </span>
          <span style={{ fontSize: 12, color: '#9B7FFF', fontWeight: 500 }}>
            AI matched this to your profile
          </span>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex' }}>
            {[0, 1, 2].map(n => (
              <div
                key={n}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: ['#7C5CFC22', '#10B98122', '#F59E0B22'][n],
                  border: '2px solid #13131E',
                  marginLeft: n > 0 ? -7 : 0,
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 12, color: '#60608A' }}>
            {req.applicants} applicants
          </span>
        </div>
        <button
          className="btn-fill"
          style={{
            padding: '9px 20px',
            borderRadius: 10,
            background: accent,
            border: 'none',
            color: '#fff',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'filter 0.15s',
          }}
        >
          Apply to Join
        </button>
      </div>
    </div>
  )
}

// ── INVESTOR REQUESTS TAB CARD ───────────────────────────────

function InvestorRequestCard({ deal }: { deal: InvestorDeal }) {
  return (
    <div
      className="card-i"
      style={{
        background: '#171720',
        border: '0.5px solid rgba(255,255,255,0.07)',
        borderRadius: 16,
        padding: '20px 22px',
        transition: 'all 0.2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 13,
            background: deal.color + '18',
            border: `1px solid ${deal.color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 800,
            color: deal.color,
            flexShrink: 0,
            fontFamily: "'Cabinet Grotesk', sans-serif",
          }}
        >
          {deal.initials}
        </div>
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#F0F0F8',
              letterSpacing: '-0.2px',
              marginBottom: 7,
              fontFamily: "'Cabinet Grotesk', sans-serif",
            }}
          >
            {deal.project}
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#F59E0B15',
              border: '1px solid #F59E0B30',
              borderRadius: 999,
              padding: '5px 14px',
              fontSize: 12,
              fontWeight: 700,
              color: '#F59E0B',
            }}
          >
            Raising {deal.raising} · {deal.raiseStage}
          </div>
        </div>
      </div>

      <div style={{ fontSize: 13, color: '#9090B0', marginBottom: 14, lineHeight: 1.55 }}>
        {deal.tractionNote}
      </div>

      {deal.matched && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            background: '#F59E0B0C',
            border: '0.5px solid #F59E0B28',
            borderRadius: 10,
            padding: '8px 12px',
            marginBottom: 14,
          }}
        >
          <span style={{ color: '#F59E0B', display: 'flex' }}>
            <IcoSparkle />
          </span>
          <span style={{ fontSize: 12, color: '#F5B04A', fontWeight: 500 }}>
            Matches your sectors &amp; ticket size
          </span>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex' }}>
            {[0, 1, 2].map(n => (
              <div
                key={n}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: ['#7C5CFC22', '#10B98122', '#F59E0B22'][n],
                  border: '2px solid #13131E',
                  marginLeft: n > 0 ? -7 : 0,
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 12, color: '#60608A' }}>
            {deal.interested} interested
          </span>
        </div>
        <button
          className="btn-fill"
          style={{
            padding: '9px 20px',
            borderRadius: 10,
            background: '#F59E0B',
            border: 'none',
            color: '#fff',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'filter 0.15s',
          }}
        >
          Open Data Room
        </button>
      </div>
    </div>
  )
}

// ── EMPTY STATE ──────────────────────────────────────────────

function EmptyState({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 14,
        paddingTop: 80,
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 18,
          background: '#171720',
          border: '0.5px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#40405A',
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: 20,
          fontWeight: 800,
          color: '#F0F0F8',
          letterSpacing: '-0.3px',
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 14, color: '#50508A' }}>Coming soon</div>
    </div>
  )
}

// ── UTILS ────────────────────────────────────────────────────

function ownerInitials(name: string): string {
  return (
    name
      .split(/\s+/)
      .map(p => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || '?'
  )
}
