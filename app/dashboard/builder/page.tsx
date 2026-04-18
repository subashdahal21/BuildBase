'use client'

import { useState } from 'react'

// ── TYPES ────────────────────────────────────────────────────

type Tab   = 'feed' | 'collab'
type NavId = 'feed' | 'projects' | 'collab' | 'messages' | 'profile'

interface Project {
  id: number
  name: string
  desc: string
  stage: 'Idea' | 'Building' | 'MVP' | 'Launched'
  techStack: string[]
  author: { initials: string; name: string; color: string }
  commits: number
}

interface CollabRequest {
  id: number
  project: string
  initials: string
  color: string
  role: string
  skills: string[]
  matched: boolean
  applicants: number
}

interface MyProject {
  id: number
  name: string
  desc: string
  stage: 'Idea' | 'Building' | 'MVP' | 'Launched'
  techStack: string[]
  collaborators: number
  openRoles: number
  color: string
}

interface MessageItem {
  id: number
  name: string
  initials: string
  color: string
  role: string
  lastMsg: string
  time: string
  unread: number
}

// ── SAMPLE DATA ──────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'NeuralSearch',
    desc: 'AI-powered semantic search engine for codebases using vector embeddings and LLM re-ranking.',
    stage: 'Building',
    techStack: ['TypeScript', 'Python', 'Pinecone', 'OpenAI'],
    author: { initials: 'AK', name: 'Alex Kim', color: '#7C5CFC' },
    commits: 142,
  },
  {
    id: 2,
    name: 'FinFlow',
    desc: 'Open-source personal finance tracker with real-time team budgeting and bank sync.',
    stage: 'MVP',
    techStack: ['Next.js', 'Supabase', 'Stripe', 'Tailwind'],
    author: { initials: 'PR', name: 'Priya R.', color: '#10B981' },
    commits: 89,
  },
  {
    id: 3,
    name: 'DevMentor',
    desc: 'Peer-to-peer mentorship platform connecting early-career developers with senior engineers.',
    stage: 'Idea',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    author: { initials: 'JL', name: 'James L.', color: '#F59E0B' },
    commits: 23,
  },
]

const COLLAB_REQUESTS: CollabRequest[] = [
  {
    id: 1,
    project: 'NeuralSearch',
    initials: 'NS',
    color: '#7C5CFC',
    role: 'Cloud Engineer Needed',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
    matched: true,
    applicants: 4,
  },
  {
    id: 2,
    project: 'FinFlow',
    initials: 'FF',
    color: '#10B981',
    role: 'Frontend Developer Needed',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma'],
    matched: true,
    applicants: 7,
  },
  {
    id: 3,
    project: 'DevMentor',
    initials: 'DM',
    color: '#F59E0B',
    role: 'Backend Engineer Needed',
    skills: ['Node.js', 'PostgreSQL', 'REST APIs', 'Auth'],
    matched: false,
    applicants: 2,
  },
]

const MY_PROJECTS: MyProject[] = [
  {
    id: 1, name: 'BuildBase',
    desc: 'AI-powered platform connecting builders with collaborators and investors.',
    stage: 'Building', techStack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind'],
    collaborators: 3, openRoles: 2, color: '#7C5CFC',
  },
  {
    id: 2, name: 'CodeReview AI',
    desc: 'Automated code review assistant using LLMs to catch bugs and suggest improvements.',
    stage: 'Idea', techStack: ['Python', 'OpenAI', 'FastAPI'],
    collaborators: 1, openRoles: 3, color: '#10B981',
  },
]

const MESSAGES_LIST: MessageItem[] = [
  { id: 1, name: 'Alex Kim', initials: 'AK', color: '#7C5CFC', role: 'Builder · NeuralSearch', lastMsg: 'Hey, saw your profile — want to collab on the search feature?', time: '3m', unread: 2 },
  { id: 2, name: 'Priya R.', initials: 'PR', color: '#10B981', role: 'Builder · FinFlow', lastMsg: 'The PR is ready for review when you get a chance.', time: '45m', unread: 0 },
  { id: 3, name: 'Sara R.', initials: 'SR', color: '#F59E0B', role: 'ML Engineer', lastMsg: 'Sounds good, I can start on the embeddings module this weekend.', time: '2h', unread: 0 },
]

const SUGGESTED = [
  { initials: 'SR', name: 'Sara R.',  role: 'ML Engineer',      color: '#7C5CFC', match: 94 },
  { initials: 'TC', name: 'Tom C.',   role: 'DevOps · AWS',     color: '#10B981', match: 88 },
  { initials: 'MP', name: 'Maya P.',  role: 'Product Designer',  color: '#F59E0B', match: 76 },
]

const TRENDING = [
  { name: 'OpenChain',  tag: 'Web3',           color: '#7C5CFC' },
  { name: 'HealthAI',   tag: 'Healthcare',     color: '#10B981' },
  { name: 'EduTrack',   tag: 'EdTech',         color: '#F59E0B' },
  { name: 'CloudHive',  tag: 'Infrastructure', color: '#3B82F6' },
  { name: 'PixelForge', tag: 'Design Tools',   color: '#EC4899' },
]

const STAGE: Record<string, { color: string; bg: string }> = {
  Idea:     { color: '#3B82F6', bg: '#3B82F615' },
  Building: { color: '#7C5CFC', bg: '#7C5CFC15' },
  MVP:      { color: '#10B981', bg: '#10B98115' },
  Launched: { color: '#F59E0B', bg: '#F59E0B15' },
}

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

// ── BUILDBASE LOGO SVG ───────────────────────────────────────

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

export default function BuilderDashboard() {
  const [activeNav, setActiveNav] = useState<NavId>('feed')
  const [activeTab, setActiveTab] = useState<Tab>('feed')

  const navItems: { id: NavId; label: string; icon: React.ReactNode }[] = [
    { id: 'feed',     label: 'Feed',                    icon: <IcoFeed /> },
    { id: 'projects', label: 'My Projects',             icon: <IcoProjects /> },
    { id: 'collab',   label: 'Collaboration Requests',  icon: <IcoCollab /> },
    { id: 'messages', label: 'Messages',                icon: <IcoMessages /> },
    { id: 'profile',  label: 'Profile',                 icon: <IcoProfile /> },
  ]

  const handleNav = (id: NavId) => {
    setActiveNav(id)
    if (id === 'feed')   setActiveTab('feed')
    if (id === 'collab') setActiveTab('collab')
  }

  const showTabBar = activeNav === 'feed' || activeNav === 'collab'

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: '#0C0C12',
      fontFamily: "'DM Sans', sans-serif",
      color: '#F0F0F8',
    }}>
      <style>{`
        .nav-item:hover  { background: rgba(255,255,255,0.04) !important; color: #D0D0E8 !important; }
        .nav-item:hover svg { opacity: 0.85; }
        .card-p:hover    { background: #1A1A28 !important; border-color: rgba(124,92,252,0.35) !important; }
        .card-c:hover    { background: #1A1915 !important; border-color: rgba(245,158,11,0.35) !important; }
        .btn-outline:hover { background: #7C5CFC !important; color: #fff !important; }
        .btn-fill:hover  { filter: brightness(1.12); }
        .side-item:hover { background: #1E1E2A !important; }
        .trend-item:hover { background: rgba(255,255,255,0.03) !important; }
        .settings-btn:hover { background: rgba(255,255,255,0.04) !important; color: #D0D0E8 !important; }
        .tab-btn { transition: border-color 0.15s, color 0.15s; }
        .tab-btn:hover { color: #D0D0E8 !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2C2C48; border-radius: 99px; }
      `}</style>

      {/* ═══════════════════════════════════════
          LEFT SIDEBAR
      ═══════════════════════════════════════ */}
      <aside style={{
        width: 240,
        height: '100vh',
        background: '#0E0E18',
        borderRight: '0.5px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>

        {/* Logo */}
        <div style={{
          padding: '22px 20px',
          borderBottom: '0.5px solid rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Logo size={30} />
          <span style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: 17, fontWeight: 800, color: '#F0F0F8', letterSpacing: '-0.3px',
          }}>Buildbase</span>
        </div>

        {/* User info */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '0.5px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: '#7C5CFC22', border: '1.5px solid #7C5CFC50',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#7C5CFC', flexShrink: 0,
              letterSpacing: '0.02em',
            }}>MN</div>
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: 13, fontWeight: 600, color: '#F0F0F8',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>Mahesh Neupane</div>
              <div style={{
                marginTop: 4,
                display: 'inline-flex', alignItems: 'center', gap: 4,
                background: '#7C5CFC18', border: '0.5px solid #7C5CFC35',
                borderRadius: 999, padding: '1px 9px',
                fontSize: 10, fontWeight: 700, color: '#7C5CFC', letterSpacing: '0.04em',
              }}>Builder</div>
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
                onClick={() => handleNav(item.id)}
                className={active ? '' : 'nav-item'}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', padding: '10px 12px',
                  background: active ? '#7C5CFC14' : 'transparent',
                  border: 'none',
                  borderLeft: `3px solid ${active ? '#7C5CFC' : 'transparent'}`,
                  borderRadius: '0 10px 10px 0',
                  color: active ? '#F0F0F8' : '#60608A',
                  fontSize: 13, fontWeight: active ? 600 : 400,
                  cursor: 'pointer', textAlign: 'left',
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: 2, transition: 'all 0.15s',
                }}
              >
                <span style={{ flexShrink: 0, display: 'flex', opacity: active ? 1 : 0.7 }}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Settings */}
        <div style={{ padding: '10px 10px', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
          <button
            className="settings-btn"
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              width: '100%', padding: '10px 12px',
              background: 'transparent', border: 'none',
              borderLeft: '3px solid transparent',
              borderRadius: '0 10px 10px 0',
              color: '#60608A', fontSize: 13,
              cursor: 'pointer', textAlign: 'left',
              fontFamily: "'DM Sans', sans-serif", transition: 'all 0.15s',
            }}
          >
            <span style={{ flexShrink: 0, display: 'flex', opacity: 0.7 }}><IcoSettings /></span>
            Settings
          </button>
        </div>
      </aside>

      {/* ═══════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════ */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* Top bar */}
        <div style={{
          padding: '16px 32px',
          borderBottom: '0.5px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0, background: '#0C0C12',
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: 20, fontWeight: 800, color: '#F0F0F8',
              letterSpacing: '-0.3px', marginBottom: 2,
            }}>Builder Dashboard</h1>
            <p style={{ fontSize: 12, color: '#50508A' }}>Welcome back, Mahesh 👋</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Notification bell */}
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
                background: '#7C5CFC', border: '1.5px solid #0E0E18',
              }} />
            </button>
            {/* Avatar */}
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: '#7C5CFC22', border: '1.5px solid #7C5CFC50',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#7C5CFC',
            }}>MN</div>
          </div>
        </div>

        {/* Tab bar — only for feed & collab views */}
        {showTabBar && (
          <div style={{
            padding: '0 32px',
            borderBottom: '0.5px solid rgba(255,255,255,0.06)',
            display: 'flex', gap: 0, flexShrink: 0, background: '#0C0C12',
          }}>
            {([['feed', 'Project Feed'], ['collab', 'Collaboration Requests']] as [Tab, string][]).map(([id, label]) => (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setActiveNav(id === 'feed' ? 'feed' : 'collab') }}
                className="tab-btn"
                style={{
                  padding: '13px 20px',
                  background: 'none', border: 'none',
                  borderBottom: `2px solid ${activeTab === id ? '#7C5CFC' : 'transparent'}`,
                  color: activeTab === id ? '#F0F0F8' : '#60608A',
                  fontSize: 13, fontWeight: activeTab === id ? 600 : 400,
                  cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                  marginBottom: -0.5,
                }}
              >{label}</button>
            ))}
          </div>
        )}

        {/* Scrollable cards area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
          {activeNav === 'feed' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          ) : activeNav === 'collab' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {COLLAB_REQUESTS.map(r => <CollabCard key={r.id} req={r} />)}
            </div>
          ) : activeNav === 'projects' ? (
            <MyProjectsSection />
          ) : activeNav === 'messages' ? (
            <MessagesSection />
          ) : activeNav === 'profile' ? (
            <ProfileSection />
          ) : null}
        </div>
      </main>

      {/* ═══════════════════════════════════════
          RIGHT SIDEBAR
      ═══════════════════════════════════════ */}
      <aside style={{
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
      }}>

        {/* Suggested Collaborators */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F8' }}>Suggested Collaborators</span>
            <span style={{ fontSize: 11, color: '#7C5CFC', cursor: 'pointer', fontWeight: 500 }}>See all</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SUGGESTED.map(s => (
              <div
                key={s.name}
                className="side-item"
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px',
                  background: '#171720',
                  border: '0.5px solid rgba(255,255,255,0.07)',
                  borderRadius: 12, cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: s.color + '20', border: `1.5px solid ${s.color}45`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: s.color, flexShrink: 0,
                }}>{s.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F8' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: '#7070A0', marginTop: 1 }}>{s.role}</div>
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: '#10B981',
                  background: '#10B98114', border: '0.5px solid #10B98130',
                  borderRadius: 999, padding: '2px 8px', flexShrink: 0,
                }}>{s.match}%</div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.05)' }} />

        {/* Trending Projects */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F8' }}>Trending Projects</span>
            <span style={{ fontSize: 11, color: '#7C5CFC', cursor: 'pointer', fontWeight: 500 }}>Explore</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {TRENDING.map((t, i) => (
              <div
                key={t.name}
                className="trend-item"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '9px 10px', borderRadius: 9,
                  cursor: 'pointer', transition: 'background 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    fontSize: 11, color: '#30305A', fontWeight: 700,
                    width: 16, textAlign: 'center',
                  }}>{i + 1}</span>
                  <span style={{ fontSize: 13, color: '#C0C0D8', fontWeight: 500 }}>{t.name}</span>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 600, color: t.color,
                  background: t.color + '14', border: `0.5px solid ${t.color}30`,
                  borderRadius: 999, padding: '2px 8px', whiteSpace: 'nowrap',
                }}>{t.tag}</span>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  )
}

// ── PROJECT CARD ─────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const [hov, setHov] = useState(false)
  const stg = STAGE[project.stage]

  return (
    <div
      className="card-p"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#171720',
        border: '0.5px solid rgba(255,255,255,0.07)',
        borderRadius: 16, padding: '20px 22px',
        transition: 'all 0.2s',
      }}
    >
      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ minWidth: 0, paddingRight: 12 }}>
          <h3 style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: 17, fontWeight: 800, color: '#F0F0F8',
            letterSpacing: '-0.2px', marginBottom: 5,
          }}>{project.name}</h3>
          <p style={{ fontSize: 13, color: '#7070A0', lineHeight: 1.55, fontWeight: 300 }}>{project.desc}</p>
        </div>
        <div style={{
          flexShrink: 0,
          background: stg.bg, border: `0.5px solid ${stg.color}35`,
          borderRadius: 999, padding: '4px 12px',
          fontSize: 11, fontWeight: 700, color: stg.color, whiteSpace: 'nowrap',
        }}>{project.stage}</div>
      </div>

      {/* AI Suggested tech stack */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
          <span style={{ color: '#7C5CFC', display: 'flex' }}><IcoSparkle /></span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#7C5CFC', letterSpacing: '0.02em' }}>AI Suggested</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.techStack.map(t => (
            <span key={t} style={{
              fontSize: 11, fontWeight: 500, color: '#9090B0',
              background: '#1C1C28', border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: 999, padding: '3px 10px',
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        {/* Author + commits */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: project.author.color + '22', border: `1.5px solid ${project.author.color}45`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 700, color: project.author.color,
          }}>{project.author.initials}</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#C0C0D8', lineHeight: 1.2 }}>{project.author.name}</div>
            <div style={{ fontSize: 10, color: '#7C5CFC', fontWeight: 500 }}>Builder</div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: '#1C1C28', border: '0.5px solid rgba(255,255,255,0.07)',
            borderRadius: 999, padding: '3px 10px',
            fontSize: 11, color: '#9090B0',
          }}>
            <span style={{ display: 'flex', color: '#60608A' }}><IcoGithub /></span>
            {project.commits}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn-outline"
            style={{
              padding: '7px 14px', borderRadius: 9,
              background: 'transparent', border: '0.5px solid #7C5CFC60',
              color: '#7C5CFC', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.15s',
            }}
          >View Project</button>
          <button
            className="btn-fill"
            style={{
              padding: '7px 14px', borderRadius: 9,
              background: '#7C5CFC', border: 'none',
              color: '#fff', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              transition: 'filter 0.15s',
            }}
          >Request to Join</button>
        </div>
      </div>
    </div>
  )
}

// ── COLLABORATION REQUEST CARD ────────────────────────────────

function CollabCard({ req }: { req: CollabRequest }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      className="card-c"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#171720',
        border: '0.5px solid rgba(255,255,255,0.07)',
        borderRadius: 16, padding: '20px 22px',
        transition: 'all 0.2s',
      }}
    >
      {/* Project header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 13,
          background: req.color + '18', border: `1px solid ${req.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 800, color: req.color, flexShrink: 0,
          fontFamily: "'Cabinet Grotesk', sans-serif",
        }}>{req.initials}</div>
        <div>
          <div style={{
            fontSize: 16, fontWeight: 700, color: '#F0F0F8',
            letterSpacing: '-0.2px', marginBottom: 7,
            fontFamily: "'Cabinet Grotesk', sans-serif",
          }}>{req.project}</div>
          {/* Role pill — large amber */}
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: '#F59E0B15', border: '1px solid #F59E0B30',
            borderRadius: 999, padding: '5px 14px',
            fontSize: 12, fontWeight: 700, color: '#F59E0B',
          }}>{req.role}</div>
        </div>
      </div>

      {/* Required skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {req.skills.map(s => (
          <span key={s} style={{
            fontSize: 11, fontWeight: 500, color: '#9090B0',
            background: '#1C1C28', border: '0.5px solid rgba(255,255,255,0.08)',
            borderRadius: 999, padding: '3px 10px',
          }}>{s}</span>
        ))}
      </div>

      {/* AI matched note */}
      {req.matched && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: '#7C5CFC0C', border: '0.5px solid #7C5CFC28',
          borderRadius: 10, padding: '8px 12px', marginBottom: 14,
        }}>
          <span style={{ color: '#7C5CFC', display: 'flex' }}><IcoSparkle /></span>
          <span style={{ fontSize: 12, color: '#9B7FFF', fontWeight: 500 }}>
            AI matched this to your profile
          </span>
        </div>
      )}

      {/* Footer: applicants + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Stacked avatars + count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex' }}>
            {[0, 1, 2].map(n => (
              <div key={n} style={{
                width: 22, height: 22, borderRadius: '50%',
                background: ['#7C5CFC22', '#10B98122', '#F59E0B22'][n],
                border: '2px solid #13131E',
                marginLeft: n > 0 ? -7 : 0,
              }} />
            ))}
          </div>
          <span style={{ fontSize: 12, color: '#60608A' }}>
            {req.applicants} applicants
          </span>
        </div>
        <button
          className="btn-fill"
          style={{
            padding: '9px 20px', borderRadius: 10,
            background: '#7C5CFC', border: 'none',
            color: '#fff', fontSize: 13, fontWeight: 700,
            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            transition: 'filter 0.15s',
          }}
        >Apply to Join</button>
      </div>
    </div>
  )
}

// ── MY PROJECTS SECTION ──────────────────────────────────────

function MyProjectsSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 4 }}>
        <button style={{
          padding: '9px 18px', borderRadius: 10,
          background: '#7C5CFC', border: 'none',
          color: '#fff', fontSize: 13, fontWeight: 700,
          cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
        }}>+ New Project</button>
      </div>
      {MY_PROJECTS.map(p => {
        const stg = STAGE[p.stage]
        return (
          <div key={p.id} className="card-p" style={{
            background: '#171720', border: '0.5px solid rgba(255,255,255,0.07)',
            borderRadius: 16, padding: '20px 22px', transition: 'all 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ minWidth: 0, paddingRight: 12 }}>
                <h3 style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: 17, fontWeight: 800, color: '#F0F0F8',
                  letterSpacing: '-0.2px', marginBottom: 5,
                }}>{p.name}</h3>
                <p style={{ fontSize: 13, color: '#7070A0', lineHeight: 1.55, fontWeight: 300 }}>{p.desc}</p>
              </div>
              <div style={{
                flexShrink: 0, background: stg.bg, border: `0.5px solid ${stg.color}35`,
                borderRadius: 999, padding: '4px 12px',
                fontSize: 11, fontWeight: 700, color: stg.color, whiteSpace: 'nowrap',
              }}>{p.stage}</div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {p.techStack.map(t => (
                <span key={t} style={{
                  fontSize: 11, fontWeight: 500, color: '#9090B0',
                  background: '#1C1C28', border: '0.5px solid rgba(255,255,255,0.08)',
                  borderRadius: 999, padding: '3px 10px',
                }}>{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 12, color: '#7070A0' }}>
                  <span style={{ color: '#F0F0F8', fontWeight: 600 }}>{p.collaborators}</span> collaborators
                </span>
                <span style={{ fontSize: 12, color: '#7070A0' }}>
                  <span style={{ color: '#F59E0B', fontWeight: 600 }}>{p.openRoles}</span> open roles
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-outline" style={{
                  padding: '7px 14px', borderRadius: 9,
                  background: 'transparent', border: '0.5px solid #7C5CFC60',
                  color: '#7C5CFC', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.15s',
                }}>Manage</button>
                <button className="btn-fill" style={{
                  padding: '7px 14px', borderRadius: 9,
                  background: '#7C5CFC', border: 'none',
                  color: '#fff', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'filter 0.15s',
                }}>Post a Role</button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── MESSAGES SECTION ─────────────────────────────────────────

function MessagesSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {MESSAGES_LIST.map(m => (
        <div key={m.id} className="side-item" style={{
          background: '#171720', border: '0.5px solid rgba(255,255,255,0.07)',
          borderRadius: 14, padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
          transition: 'background 0.15s',
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
            <div style={{ fontSize: 11, color: '#7C5CFC', marginBottom: 3 }}>{m.role}</div>
            <div style={{ fontSize: 12, color: '#7070A0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.lastMsg}</div>
          </div>
          {m.unread > 0 && (
            <div style={{
              width: 20, height: 20, borderRadius: '50%',
              background: '#7C5CFC', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700, flexShrink: 0,
            }}>{m.unread}</div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── PROFILE SECTION ──────────────────────────────────────────

function ProfileSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 680 }}>
      <div style={{
        background: '#171720', border: '0.5px solid rgba(255,255,255,0.07)',
        borderRadius: 16, padding: '28px',
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
          background: '#7C5CFC22', border: '2px solid #7C5CFC50',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 800, color: '#7C5CFC',
          fontFamily: "'Cabinet Grotesk', sans-serif",
        }}>MN</div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#F0F0F8', fontFamily: "'Cabinet Grotesk', sans-serif", marginBottom: 8 }}>Mahesh Neupane</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{
              background: '#7C5CFC18', border: '0.5px solid #7C5CFC35',
              borderRadius: 999, padding: '2px 10px',
              fontSize: 11, fontWeight: 700, color: '#7C5CFC',
            }}>Builder</span>
            <span style={{ fontSize: 13, color: '#50508A' }}>maheshneupane96@gmail.com</span>
          </div>
        </div>
        <button className="btn-outline" style={{
          marginLeft: 'auto', padding: '8px 18px', borderRadius: 10,
          background: 'transparent', border: '0.5px solid #7C5CFC50',
          color: '#7C5CFC', fontSize: 13, fontWeight: 600,
          cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", flexShrink: 0,
          transition: 'all 0.15s',
        }}>Edit Profile</button>
      </div>

      <div style={{
        background: '#171720', border: '0.5px solid rgba(255,255,255,0.07)',
        borderRadius: 16, padding: '22px 24px',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#F0F0F8', marginBottom: 14 }}>Skills</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['TypeScript', 'Next.js', 'Supabase', 'Python', 'System Design', 'PostgreSQL'].map(s => (
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
          { label: 'Projects Built', value: '2' },
          { label: 'Collaborations', value: '5' },
          { label: 'Contributions', value: '238' },
        ].map(stat => (
          <div key={stat.label} style={{
            flex: 1, background: '#171720', border: '0.5px solid rgba(255,255,255,0.07)',
            borderRadius: 14, padding: '18px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#7C5CFC', fontFamily: "'Cabinet Grotesk', sans-serif", marginBottom: 4 }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: '#60608A' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── EMPTY STATE ──────────────────────────────────────────────

const NAV_LABELS: Record<NavId, string> = {
  feed:     'Feed',
  projects: 'My Projects',
  collab:   'Collaboration Requests',
  messages: 'Messages',
  profile:  'Profile',
}

const NAV_ICONS: Record<NavId, React.ReactNode> = {
  feed:     <IcoFeed />,
  projects: <IcoProjects />,
  collab:   <IcoCollab />,
  messages: <IcoMessages />,
  profile:  <IcoProfile />,
}

function EmptyState({ nav }: { nav: NavId }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100%', gap: 14, paddingTop: 80,
    }}>
      <div style={{
        width: 60, height: 60, borderRadius: 18,
        background: '#171720', border: '0.5px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#40405A',
      }}>
        {NAV_ICONS[nav]}
      </div>
      <div style={{
        fontFamily: "'Cabinet Grotesk', sans-serif",
        fontSize: 20, fontWeight: 800, color: '#F0F0F8', letterSpacing: '-0.3px',
      }}>{NAV_LABELS[nav]}</div>
      <div style={{ fontSize: 14, color: '#50508A' }}>Coming soon</div>
    </div>
  )
}
