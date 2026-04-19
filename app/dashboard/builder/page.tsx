'use client'

import { useState } from 'react'

type NavId = 'feed' | 'projects' | 'collab' | 'messages' | 'profile'

const PURPLE = '#7C5CFC'


// ── DATA ──────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 1, name: 'NeuralSearch', initials: 'NS', color: '#7C5CFC',
    desc: 'AI-powered semantic search for enterprise codebases using vector embeddings and LLM re-ranking.',
    stage: 'Building' as const, techStack: ['TypeScript', 'Python', 'Pinecone', 'OpenAI'],
    author: { initials: 'AK', name: 'Alex Kim', color: '#7C5CFC' },
    commits: 142, stars: 89,
    commitHistory: [8, 12, 6, 18, 14, 22, 19, 28, 24, 32, 29, 38, 35, 42],
    openRoles: ['Cloud Engineer', 'ML Engineer'],
    description: 'NeuralSearch is building developer tooling that understands code context, not just keywords — enabling teams to find and reuse code across massive codebases in seconds.',
    team: [
      { initials: 'AK', name: 'Alex Kim', role: 'CEO & Founder', color: '#7C5CFC', commits: 98 },
      { initials: 'SR', name: 'Sara R.', role: 'CTO', color: '#10B981', commits: 44 },
    ],
    techDetails: ['TypeScript', 'Python', 'Pinecone', 'OpenAI', 'FastAPI', 'Docker'],
    milestones: [
      { label: 'Beta launch', date: 'Jan 2025', done: true },
      { label: '500 users', date: 'Feb 2025', done: true },
      { label: 'v1.0 release', date: 'May 2025', done: false },
    ],
  },
  {
    id: 2, name: 'FinFlow', initials: 'FF', color: '#10B981',
    desc: 'Open-source personal finance tracker with real-time team budgeting and bank sync.',
    stage: 'MVP' as const, techStack: ['Next.js', 'Supabase', 'Stripe', 'Tailwind'],
    author: { initials: 'PR', name: 'Priya R.', color: '#10B981' },
    commits: 89, stars: 54,
    commitHistory: [4, 7, 5, 11, 9, 14, 17, 13, 19, 22, 18, 26, 23, 29],
    openRoles: ['Backend Dev', 'Mobile Dev'],
    description: 'FinFlow makes financial collaboration simple for small teams. Real-time bank sync, shared budgets, actionable insights — all open source.',
    team: [
      { initials: 'PR', name: 'Priya R.', role: 'Founder', color: '#10B981', commits: 89 },
    ],
    techDetails: ['Next.js', 'Supabase', 'Stripe', 'Tailwind', 'Plaid API'],
    milestones: [
      { label: 'MVP launched', date: 'Dec 2024', done: true },
      { label: '500 signups', date: 'Jan 2025', done: true },
      { label: 'Bank sync live', date: 'Apr 2025', done: false },
    ],
  },
  {
    id: 3, name: 'DevMentor', initials: 'DM', color: '#F59E0B',
    desc: 'Peer-to-peer mentorship platform connecting early-career devs with senior engineers.',
    stage: 'Idea' as const, techStack: ['React', 'Node.js', 'PostgreSQL'],
    author: { initials: 'JL', name: 'James L.', color: '#F59E0B' },
    commits: 23, stars: 12,
    commitHistory: [2, 3, 2, 5, 4, 7, 6, 8, 5, 9, 7, 10, 8, 11],
    openRoles: ['Product Designer', 'Backend Dev'],
    description: 'DevMentor solves the #1 problem in tech education — getting real-world guidance. We match junior devs with experienced engineers for structured 1:1 mentorship.',
    team: [
      { initials: 'JL', name: 'James L.', role: 'Founder', color: '#F59E0B', commits: 23 },
    ],
    techDetails: ['React', 'Node.js', 'PostgreSQL', 'WebRTC'],
    milestones: [
      { label: 'Concept validated', date: 'Jan 2025', done: true },
      { label: 'MVP launch', date: 'May 2025', done: false },
    ],
  },
]

const COLLAB_REQUESTS = [
  { id: 1, project: 'NeuralSearch', initials: 'NS', color: '#7C5CFC', role: 'Cloud Engineer Needed', skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'], matched: true, applicants: 4 },
  { id: 2, project: 'FinFlow', initials: 'FF', color: '#10B981', role: 'Frontend Developer Needed', skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma'], matched: true, applicants: 7 },
  { id: 3, project: 'DevMentor', initials: 'DM', color: '#F59E0B', role: 'Backend Engineer Needed', skills: ['Node.js', 'PostgreSQL', 'REST APIs', 'Auth'], matched: false, applicants: 2 },
]

const MY_PROJECTS = [
  { id: 1, name: 'BuildBase', initials: 'BB', color: '#7C5CFC', desc: 'AI-powered platform connecting builders with collaborators and investors.', stage: 'Building' as const, techStack: ['Next.js', 'Supabase', 'TypeScript'], collaborators: 3, openRoles: 2 },
  { id: 2, name: 'CodeReview AI', initials: 'CR', color: '#10B981', desc: 'Automated code review assistant using LLMs to catch bugs and suggest improvements.', stage: 'Idea' as const, techStack: ['Python', 'OpenAI', 'FastAPI'], collaborators: 1, openRoles: 3 },
]

const MESSAGES_LIST = [
  { id: 1, name: 'Alex Kim', initials: 'AK', color: '#7C5CFC', role: 'Builder · NeuralSearch', lastMsg: 'Hey, saw your profile — want to collab on the search feature?', time: '3m', unread: 2,
    thread: [
      { from: 'them' as const, text: 'Hey! I came across your profile and think your skills would be a great fit for NeuralSearch.', time: '10:30 AM' },
      { from: 'them' as const, text: 'Want to collab on the search feature?', time: '10:31 AM' },
    ],
  },
  { id: 2, name: 'Priya R.', initials: 'PR', color: '#10B981', role: 'Builder · FinFlow', lastMsg: 'The PR is ready for review when you get a chance.', time: '45m', unread: 0,
    thread: [
      { from: 'me' as const, text: 'Working on the Stripe integration now, should have a PR up tonight.', time: 'Yesterday' },
      { from: 'them' as const, text: 'The PR is ready for review when you get a chance.', time: 'Yesterday' },
    ],
  },
  { id: 3, name: 'Sara R.', initials: 'SR', color: '#F59E0B', role: 'ML Engineer', lastMsg: 'I can start on the embeddings module this weekend.', time: '2h', unread: 0,
    thread: [
      { from: 'them' as const, text: 'I can start on the embeddings module this weekend.', time: '2h ago' },
    ],
  },
]

const SUGGESTED = [
  { initials: 'SR', name: 'Sara R.', role: 'ML Engineer', color: '#7C5CFC', match: 94 },
  { initials: 'TC', name: 'Tom C.', role: 'DevOps · AWS', color: '#10B981', match: 88 },
  { initials: 'MP', name: 'Maya P.', role: 'Product Designer', color: '#F59E0B', match: 76 },
]

const TRENDING = [
  { name: 'OpenChain', tag: 'Web3', color: '#7C5CFC' },
  { name: 'HealthAI', tag: 'Healthcare', color: '#10B981' },
  { name: 'EduTrack', tag: 'EdTech', color: '#F59E0B' },
  { name: 'CloudHive', tag: 'Infrastructure', color: '#3B82F6' },
  { name: 'PixelForge', tag: 'Design Tools', color: '#EC4899' },
]

const STAGE: Record<string, { color: string; bg: string }> = {
  Idea:     { color: '#3B82F6', bg: '#3B82F612' },
  Building: { color: '#7C5CFC', bg: '#7C5CFC12' },
  MVP:      { color: '#10B981', bg: '#10B98112' },
  Launched: { color: '#F59E0B', bg: '#F59E0B12' },
}

// ── ICONS ─────────────────────────────────────────────────────

const Icon = {
  Feed:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  Projects: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  Collab:   () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Messages: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Profile:  () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Settings: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Bell:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Git:      () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>,
  Star:     () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Sparkle:  () => <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/></svg>,
  Send:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Back:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Check:    () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Plus:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Crown:    () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2 19h20v2H2zM2 7l5 7 5-7 5 7 5-7v10H2V7z" opacity="0.85"/></svg>,
  Zap:      () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  ArrowUp:  () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#1C1C28"/>
      <path d="M8 16 C8 11 11.5 8 16 8 C20.5 8 24 11 24 16" stroke="#7C5CFC" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M8 16 C8 21 11.5 24 16 24 C20.5 24 24 21 24 16" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="16" cy="16" r="2.5" fill="#7C5CFC"/>
    </svg>
  )
}

// ── SPARKLINE ─────────────────────────────────────────────────

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const w = 100, h = 32, pad = 2
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = h - pad - ((v / max) * (h - pad * 2))
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
      <polyline points={`${pad},${h} ${pts} ${w-pad},${h}`} fill={color} opacity="0.07"/>
    </svg>
  )
}

// ── COMMIT BAR CHART ──────────────────────────────────────────

function CommitChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const labels = ['','','','','','','Mon','','','','','','','Today']
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:4, height:72 }}>
      {data.map((v, i) => (
        <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, flex:1 }}>
          <div style={{
            width:'100%', borderRadius:3,
            background: i === data.length-1 ? color : color+'45',
            height:`${(v/max)*56}px`, minHeight:3,
          }}/>
          <span style={{ fontSize:9, color:'#30305A', whiteSpace:'nowrap' }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  )
}

// ── PROJECT DETAIL MODAL ──────────────────────────────────────

type ProjectTab = 'overview' | 'team' | 'commits' | 'apply'

function ProjectModal({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
  const [tab, setTab] = useState<ProjectTab>('overview')
  const [applyRole, setApplyRole] = useState('')
  const [applyMsg, setApplyMsg] = useState('')
  const [applied, setApplied] = useState(false)
  const stg = STAGE[project.stage]

  const tabs: { id: ProjectTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'team', label: 'Team' },
    { id: 'commits', label: 'Git Activity' },
    { id: 'apply', label: 'Apply' },
  ]

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:100,
      background:'rgba(0,0,0,0.7)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:24,
    }} onClick={onClose}>
      <div style={{
        background:'#111118', border:'0.5px solid rgba(255,255,255,0.08)',
        borderRadius:20, width:'100%', maxWidth:700,
        maxHeight:'88vh', overflow:'hidden',
        display:'flex', flexDirection:'column',
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          padding:'20px 24px', borderBottom:'0.5px solid rgba(255,255,255,0.06)',
          display:'flex', alignItems:'center', gap:14, flexShrink:0,
        }}>
          <button onClick={onClose} style={{
            width:32, height:32, borderRadius:8,
            background:'#1C1C28', border:'0.5px solid rgba(255,255,255,0.08)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#6060A0', cursor:'pointer', flexShrink:0,
          }}><Icon.Back /></button>
          <div style={{
            width:42, height:42, borderRadius:12, flexShrink:0,
            background:project.color+'18', border:`1px solid ${project.color}30`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:12, fontWeight:800, color:project.color,
            fontFamily:"'Cabinet Grotesk',sans-serif",
          }}>{project.initials}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:3 }}>
              <h2 style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:17, fontWeight:800, color:'#F0F0F8' }}>
                {project.name}
              </h2>
              <span style={{ fontSize:10, fontWeight:600, color:stg.color, background:stg.bg, borderRadius:999, padding:'2px 9px' }}>
                {project.stage}
              </span>
            </div>
            <p style={{ fontSize:12, color:'#6060A0', lineHeight:1.4 }}>{project.desc}</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:5, flexShrink:0 }}>
            <span style={{ color:'#10B981', display:'flex' }}><Icon.Star /></span>
            <span style={{ fontSize:12, fontWeight:600, color:'#F0F0F8' }}>{project.stars}</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display:'flex', padding:'0 24px',
          borderBottom:'0.5px solid rgba(255,255,255,0.06)', flexShrink:0,
        }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding:'11px 16px', background:'none', border:'none',
              borderBottom:`2px solid ${tab===t.id ? PURPLE : 'transparent'}`,
              color: tab===t.id ? '#F0F0F8' : '#50508A',
              fontSize:13, fontWeight: tab===t.id ? 600 : 400,
              cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
              transition:'all 0.15s', marginBottom:-1,
            }}>{t.label}</button>
          ))}
        </div>

        {/* Body */}
        <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>

          {tab === 'overview' && (
            <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
              <p style={{ fontSize:13, color:'#9090B0', lineHeight:1.7 }}>{project.description}</p>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
                {[
                  { label:'Commits', value:project.commits },
                  { label:'Team size', value:project.team.length },
                  { label:'Open roles', value:project.openRoles.length },
                ].map(m => (
                  <div key={m.label} style={{
                    background:'#16161F', border:'0.5px solid rgba(255,255,255,0.06)',
                    borderRadius:12, padding:'14px 16px',
                  }}>
                    <div style={{ fontSize:10, color:'#40405A', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.08em' }}>{m.label}</div>
                    <div style={{ fontSize:18, fontWeight:800, color:'#F0F0F8', fontFamily:"'Cabinet Grotesk',sans-serif" }}>{m.value}</div>
                  </div>
                ))}
              </div>

              <div style={{
                background:'#16161F', border:'0.5px solid rgba(255,255,255,0.06)',
                borderRadius:12, padding:'14px 16px',
                display:'flex', alignItems:'center', justifyContent:'space-between',
              }}>
                <div>
                  <div style={{ fontSize:10, color:'#40405A', marginBottom:3, textTransform:'uppercase', letterSpacing:'0.08em' }}>Commit activity</div>
                  <div style={{ fontSize:14, fontWeight:700, color:'#F0F0F8' }}>Last 14 days</div>
                </div>
                <Sparkline data={project.commitHistory} color={project.color} />
              </div>

              <div>
                <div style={{ fontSize:10, color:'#40405A', marginBottom:9, textTransform:'uppercase', letterSpacing:'0.08em' }}>Tech stack</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {project.techDetails.map(t => (
                    <span key={t} style={{
                      fontSize:11, fontWeight:500, color:'#9090C0',
                      background:'#1C1C28', border:'0.5px solid rgba(255,255,255,0.08)',
                      borderRadius:7, padding:'4px 10px',
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize:10, color:'#40405A', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.08em' }}>Milestones</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {project.milestones.map((m, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{
                        width:20, height:20, borderRadius:'50%', flexShrink:0,
                        background: m.done ? '#10B98118' : '#1C1C28',
                        border:`1px solid ${m.done ? '#10B98140' : 'rgba(255,255,255,0.07)'}`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        color:'#10B981',
                      }}>{m.done && <Icon.Check />}</div>
                      <span style={{ flex:1, fontSize:13, color: m.done ? '#C0C0D8' : '#50508A' }}>{m.label}</span>
                      <span style={{ fontSize:11, color:'#40405A' }}>{m.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {project.openRoles.length > 0 && (
                <div>
                  <div style={{ fontSize:10, color:'#40405A', marginBottom:9, textTransform:'uppercase', letterSpacing:'0.08em' }}>Open roles</div>
                  <div style={{ display:'flex', gap:7 }}>
                    {project.openRoles.map(r => (
                      <span key={r} style={{
                        fontSize:12, fontWeight:600, color:'#F59E0B',
                        background:'#F59E0B12', border:'0.5px solid #F59E0B30',
                        borderRadius:8, padding:'5px 12px',
                      }}>{r}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'team' && (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {project.team.map(m => (
                <div key={m.name} style={{
                  background:'#16161F', border:'0.5px solid rgba(255,255,255,0.06)',
                  borderRadius:13, padding:'14px 16px',
                  display:'flex', alignItems:'center', gap:12,
                }}>
                  <div style={{
                    width:40, height:40, borderRadius:'50%', flexShrink:0,
                    background:m.color+'20', border:`1.5px solid ${m.color}40`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:11, fontWeight:700, color:m.color,
                  }}>{m.initials}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:600, color:'#F0F0F8', marginBottom:2 }}>{m.name}</div>
                    <div style={{ fontSize:11, color:'#6060A0' }}>{m.role}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:10, color:'#40405A', marginBottom:2 }}>Commits</div>
                    <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                      <span style={{ color:'#6060A0', display:'flex' }}><Icon.Git /></span>
                      <span style={{ fontSize:14, fontWeight:700, color:m.color }}>{m.commits}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'commits' && (
            <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
              <div style={{
                background:'#16161F', border:'0.5px solid rgba(255,255,255,0.06)',
                borderRadius:13, padding:'16px 18px',
              }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:14 }}>
                  <div>
                    <div style={{ fontSize:12, fontWeight:600, color:'#F0F0F8', marginBottom:2 }}>Commit history</div>
                    <div style={{ fontSize:11, color:'#50508A' }}>Last 14 days</div>
                  </div>
                  <div style={{ display:'flex', gap:16 }}>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontSize:10, color:'#40405A', marginBottom:2 }}>Total</div>
                      <div style={{ fontSize:15, fontWeight:700, color:project.color }}>{project.commits}</div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontSize:10, color:'#40405A', marginBottom:2 }}>Stars</div>
                      <div style={{ display:'flex', alignItems:'center', gap:3 }}>
                        <span style={{ color:'#F59E0B' }}><Icon.Star /></span>
                        <span style={{ fontSize:15, fontWeight:700, color:'#F0F0F8' }}>{project.stars}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CommitChart data={project.commitHistory} color={project.color} />
              </div>

              <div>
                <div style={{ fontSize:10, color:'#40405A', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.08em' }}>By member</div>
                {project.team.map(m => {
                  const total = project.team.reduce((s,x) => s+x.commits, 0)
                  const pct = Math.round((m.commits/total)*100)
                  return (
                    <div key={m.name} style={{ marginBottom:12 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                          <div style={{
                            width:22, height:22, borderRadius:'50%',
                            background:m.color+'20', display:'flex', alignItems:'center',
                            justifyContent:'center', fontSize:8, fontWeight:700, color:m.color,
                          }}>{m.initials}</div>
                          <span style={{ fontSize:12, color:'#C0C0D8' }}>{m.name}</span>
                        </div>
                        <span style={{ fontSize:12, color:m.color, fontWeight:600 }}>{m.commits}</span>
                      </div>
                      <div style={{ height:4, background:'#1C1C28', borderRadius:99 }}>
                        <div style={{ height:'100%', width:`${pct}%`, background:m.color, borderRadius:99, opacity:0.8 }}/>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div style={{
                background:'#16161F', border:'0.5px solid rgba(255,255,255,0.06)',
                borderRadius:12, padding:'14px 16px',
              }}>
                <div style={{ fontSize:10, color:'#40405A', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.08em' }}>Recent commits</div>
                {[
                  { msg:'feat: add vector similarity scoring', author:project.team[0].initials, color:project.team[0].color, time:'2h ago', hash:'a3f8c2d' },
                  { msg:'fix: resolve tokenization edge case', author:project.team[0].initials, color:project.team[0].color, time:'6h ago', hash:'b7e1d9a' },
                  { msg:'chore: update CI pipeline config', author:project.team[project.team.length-1].initials, color:project.team[project.team.length-1].color, time:'1d ago', hash:'c4a2f1b' },
                ].map((c,i) => (
                  <div key={i} style={{
                    display:'flex', alignItems:'center', gap:9,
                    padding:'7px 0',
                    borderBottom: i < 2 ? '0.5px solid rgba(255,255,255,0.04)' : 'none',
                  }}>
                    <div style={{
                      width:20, height:20, borderRadius:'50%', flexShrink:0,
                      background:c.color+'20', display:'flex', alignItems:'center',
                      justifyContent:'center', fontSize:8, fontWeight:700, color:c.color,
                    }}>{c.author}</div>
                    <span style={{ flex:1, fontSize:12, color:'#9090B0', fontFamily:'monospace' }}>{c.msg}</span>
                    <span style={{ fontSize:10, color:'#30305A', flexShrink:0 }}>{c.time}</span>
                    <span style={{ fontSize:10, color:'#30305A', fontFamily:'monospace', flexShrink:0 }}>{c.hash}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'apply' && (
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {applied ? (
                <div style={{
                  background:'#10B98112', border:'0.5px solid #10B98130',
                  borderRadius:14, padding:'32px', textAlign:'center',
                }}>
                  <div style={{ fontSize:28, marginBottom:10 }}>🎉</div>
                  <div style={{ fontSize:16, fontWeight:700, color:'#10B981', marginBottom:6 }}>Application sent!</div>
                  <div style={{ fontSize:13, color:'#6060A0' }}>The project author will review and get back to you.</div>
                </div>
              ) : (
                <>
                  <div style={{
                    background:PURPLE+'08', border:`0.5px solid ${PURPLE}20`,
                    borderRadius:11, padding:'12px 14px',
                    display:'flex', alignItems:'center', gap:8,
                  }}>
                    <span style={{ color:PURPLE }}><Icon.Sparkle /></span>
                    <span style={{ fontSize:12, color:'#B0A0FF' }}>AI matched your profile to this project — strong fit detected</span>
                  </div>

                  <div>
                    <div style={{ fontSize:11, color:'#50508A', marginBottom:7, textTransform:'uppercase', letterSpacing:'0.08em' }}>Role you&apos;re applying for</div>
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                      {project.openRoles.map(r => (
                        <button key={r} onClick={() => setApplyRole(r)} style={{
                          padding:'7px 14px', borderRadius:9, cursor:'pointer',
                          background: applyRole===r ? PURPLE : '#16161F',
                          border:`0.5px solid ${applyRole===r ? PURPLE : 'rgba(255,255,255,0.08)'}`,
                          color: applyRole===r ? '#fff' : '#7070A0',
                          fontSize:12, fontWeight:600,
                          fontFamily:"'DM Sans',sans-serif", transition:'all 0.15s',
                        }}>{r}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize:11, color:'#50508A', marginBottom:7, textTransform:'uppercase', letterSpacing:'0.08em' }}>Why you&apos;re a great fit</div>
                    <textarea
                      placeholder="Tell the project author about your relevant experience and what you'll bring to the team..."
                      value={applyMsg}
                      onChange={e => setApplyMsg(e.target.value)}
                      rows={4}
                      style={{
                        width:'100%', background:'#16161F',
                        border:'0.5px solid rgba(255,255,255,0.08)',
                        borderRadius:10, padding:'10px 13px',
                        fontSize:13, color:'#F0F0F8', outline:'none',
                        fontFamily:"'DM Sans',sans-serif", resize:'none', lineHeight:1.6,
                      }}
                    />
                  </div>

                  <button
                    onClick={() => applyRole && setApplied(true)}
                    disabled={!applyRole}
                    style={{
                      width:'100%', padding:12, borderRadius:11, border:'none',
                      background: applyRole ? PURPLE : '#1C1C28',
                      color: applyRole ? '#fff' : '#40405A',
                      fontSize:14, fontWeight:700,
                      cursor: applyRole ? 'pointer' : 'not-allowed',
                      fontFamily:"'DM Sans',sans-serif", transition:'all 0.2s',
                    }}
                  >Send Application</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── MAIN DASHBOARD ────────────────────────────────────────────

import { useRouter } from 'next/navigation'

export default function BuilderDashboard() {
  const router = useRouter()
  const [activeNav, setActiveNav] = useState<NavId>('feed')
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null)
  const [msgThread, setMsgThread] = useState<typeof MESSAGES_LIST[0] | null>(null)
  const [newMsg, setNewMsg] = useState('')

  const navItems = [
    { id: 'feed' as NavId,     label: 'Feed',        icon: <Icon.Feed /> },
    { id: 'projects' as NavId, label: 'Projects',    icon: <Icon.Projects /> },
    { id: 'collab' as NavId,   label: 'Collaborate', icon: <Icon.Collab />, badge: 2 },
    { id: 'messages' as NavId, label: 'Messages',    icon: <Icon.Messages />, badge: 2 },
    { id: 'profile' as NavId,  label: 'Profile',     icon: <Icon.Profile /> },
  ]

  const PAGE_TITLE: Record<NavId, string> = {
    feed: 'Project Feed', projects: 'My Projects',
    collab: 'Collaborate', messages: 'Messages', profile: 'Profile',
  }

  return (
    <div style={{
      display:'flex', height:'100vh', overflow:'hidden',
      background:'#0C0C12', fontFamily:"'DM Sans',sans-serif", color:'#F0F0F8',
    }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2A2A40; border-radius: 99px; }
        input::placeholder, textarea::placeholder { color: #30305A; }
      `}</style>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {/* SIDEBAR */}
      <aside style={{
        width:236, height:'100vh', background:'#0D0D15',
        borderRight:'0.5px solid rgba(255,255,255,0.05)',
        display:'flex', flexDirection:'column', flexShrink:0,
      }}>
        <div style={{ padding:'22px 18px 18px', display:'flex', alignItems:'center', gap:10 }}>
          <Logo />
          <span style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:18, fontWeight:800, color:'#F0F0F8' }}>Buildbase</span>
        </div>

        <div style={{ padding:'12px 16px 14px', borderBottom:'0.5px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{
              width:38, height:38, borderRadius:'50%', flexShrink:0,
              background:PURPLE+'20', border:`1.5px solid ${PURPLE}50`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:12, fontWeight:800, color:PURPLE,
            }}>MN</div>
            <div style={{ minWidth:0 }}>
              <div style={{ fontSize:14, fontWeight:700, color:'#E0E0F0', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>Mahesh N.</div>
              <div style={{
                marginTop:3, display:'inline-block',
                background:PURPLE+'15', border:`0.5px solid ${PURPLE}30`,
                borderRadius:999, padding:'2px 9px',
                fontSize:10, fontWeight:700, color:PURPLE,
              }}>Builder</div>
            </div>
          </div>
        </div>

        <nav style={{ flex:1, padding:'10px 8px', overflowY:'auto' }}>
          {navItems.map(item => {
            const active = activeNav === item.id
            return (
              <button key={item.id} onClick={() => setActiveNav(item.id)} style={{
                display:'flex', alignItems:'center', gap:10,
                width:'100%', padding:'10px 12px',
                background: active ? PURPLE+'14' : 'transparent',
                border:'none', borderLeft:`2px solid ${active ? PURPLE : 'transparent'}`,
                borderRadius:'0 10px 10px 0',
                color: active ? '#F0F0F8' : '#50508A',
                fontSize:14, fontWeight: active ? 600 : 400,
                cursor:'pointer', textAlign:'left',
                fontFamily:"'DM Sans',sans-serif",
                marginBottom:2, transition:'all 0.15s',
                position:'relative',
              }}>
                <span style={{ flexShrink:0, display:'flex', opacity: active ? 1 : 0.55 }}>{item.icon}</span>
                {item.label}
                {'badge' in item && item.badge && (
                  <span style={{
                    marginLeft:'auto', width:18, height:18, borderRadius:'50%',
                    background:PURPLE, color:'#fff',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:10, fontWeight:700,
                  }}>{item.badge}</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* UPGRADE BUTTON */}
        <div style={{ padding:'12px 12px 8px' }}>
          <button style={{
            width:'100%', padding:'13px 14px', borderRadius:14, border:'none', cursor:'pointer',
            background:'linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #7C5CFC 100%)',
            position:'relative', overflow:'hidden', fontFamily:"'DM Sans',sans-serif",
            boxShadow:'0 4px 24px rgba(245,158,11,0.28), 0 2px 8px rgba(124,92,252,0.22)',
          }}>
            <div style={{
              position:'absolute', inset:0, opacity:0.12,
              background:'radial-gradient(circle at 30% 50%, #fff 0%, transparent 70%)',
            }}/>
            <div style={{ position:'relative', display:'flex', alignItems:'center', gap:9 }}>
              <span style={{ fontSize:18, lineHeight:1 }}>👑</span>
              <div style={{ textAlign:'left', flex:1 }}>
                <div style={{ fontSize:13, fontWeight:800, color:'#fff', letterSpacing:'-0.2px', lineHeight:1.2 }}>
                  Upgrade to Investor
                </div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.75)', marginTop:2, fontWeight:400 }}>
                  Access deal flow & analytics
                </div>
              </div>
              <span style={{ color:'rgba(255,255,255,0.9)', display:'flex', flexShrink:0 }}><Icon.ArrowUp /></span>
            </div>
          </button>
        </div>

        <div style={{ padding:'6px 8px 8px', borderTop:'0.5px solid rgba(255,255,255,0.04)' }}>
          <button style={{
            display:'flex', alignItems:'center', gap:10,
            width:'100%', padding:'9px 12px',
            background:'transparent', border:'none',
            borderLeft:'2px solid transparent', borderRadius:'0 10px 10px 0',
            color:'#40405A', fontSize:13, cursor:'pointer',
            fontFamily:"'DM Sans',sans-serif",
          }}>
            <span style={{ display:'flex', opacity:0.5 }}><Icon.Settings /></span>
            Settings
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>

        {/* Topbar */}
        <div style={{
          padding:'0 28px', height:64,
          borderBottom:'0.5px solid rgba(255,255,255,0.05)',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          flexShrink:0,
        }}>
          <h1 style={{
            fontFamily:"'Cabinet Grotesk',sans-serif",
            fontSize:22, fontWeight:800, color:'#F0F0F8', letterSpacing:'-0.4px',
          }}>{PAGE_TITLE[activeNav]}</h1>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{
              display:'flex', alignItems:'center', gap:8,
              background:'#111118', border:'0.5px solid rgba(255,255,255,0.08)',
              borderRadius:10, padding:'8px 14px',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#40405A" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input placeholder="Search projects..." style={{
                background:'none', border:'none', outline:'none',
                fontSize:13, color:'#F0F0F8', width:160,
                fontFamily:"'DM Sans',sans-serif",
              }}/>
            </div>
            <button style={{
              width:38, height:38, borderRadius:10,
              background:'#111118', border:'0.5px solid rgba(255,255,255,0.08)',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#50508A', cursor:'pointer', position:'relative',
            }}>
              <Icon.Bell />
              <div style={{
                position:'absolute', top:8, right:8,
                width:6, height:6, borderRadius:'50%',
                background:PURPLE, border:'1.5px solid #0C0C12',
              }}/>
            </button>
            <div style={{
              width:38, height:38, borderRadius:'50%',
              background:PURPLE+'22', border:`2px solid ${PURPLE}45`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:12, fontWeight:800, color:PURPLE,
            }}>MN</div>
          </div>
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'22px 28px' }}>

          {/* FEED */}
          {activeNav === 'feed' && (
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                <p style={{ fontSize:14, color:'#6060A0' }}>
                  Good morning, Mahesh 👋 — <span style={{ color:PURPLE, fontWeight:600 }}>3 new projects match your skills</span>
                </p>
                <div style={{ display:'flex', gap:7 }}>
                  {['All','Building','MVP','Idea'].map(f => (
                    <button key={f} style={{
                      padding:'5px 13px', borderRadius:999,
                      border:'0.5px solid rgba(255,255,255,0.08)',
                      background: f==='All' ? PURPLE+'15' : 'transparent',
                      color: f==='All' ? PURPLE : '#50508A',
                      fontSize:12, fontWeight:600, cursor:'pointer',
                      fontFamily:"'DM Sans',sans-serif",
                    }}>{f}</button>
                  ))}
                </div>
              </div>
              {PROJECTS.map(p => (
                <ProjectRow key={p.id} project={p} onView={() => setSelectedProject(p)} />
              ))}
            </div>
          )}

          {/* COLLAB */}
          {activeNav === 'collab' && (
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <p style={{ fontSize:14, color:'#60608A', marginBottom:8 }}>
                <span style={{ color:PURPLE, fontWeight:600 }}>2 roles matched</span> to your profile by AI
              </p>
              {COLLAB_REQUESTS.map(r => (
                <CollabRow key={r.id} req={r} />
              ))}
            </div>
          )}

          {/* PROJECTS */}
          {activeNav === 'projects' && (
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:4 }}>
                <button
  onClick={() => router.push('./builder/create')}
  style={{
    display:'flex', alignItems:'center', gap:7,
    padding:'9px 16px', borderRadius:10,
    background:PURPLE, border:'none',
    color:'#fff', fontSize:13, fontWeight:600,
    cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
  }}
>
  <Icon.Plus /> Create Project
</button>
              </div>
              {MY_PROJECTS.map(p => {
                const stg = STAGE[p.stage]
                return (
                  <div key={p.id} style={{
                    background:'#111118', border:'0.5px solid rgba(255,255,255,0.06)',
                    borderRadius:14, padding:'18px 20px',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = PURPLE+'30')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
                  >
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <div style={{
                          width:40, height:40, borderRadius:11, flexShrink:0,
                          background:p.color+'18', border:`1px solid ${p.color}25`,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize:11, fontWeight:800, color:p.color,
                          fontFamily:"'Cabinet Grotesk',sans-serif",
                        }}>{p.initials}</div>
                        <div>
                          <h3 style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:15, fontWeight:800, color:'#F0F0F8', marginBottom:3 }}>{p.name}</h3>
                          <p style={{ fontSize:12, color:'#6060A0', lineHeight:1.5 }}>{p.desc}</p>
                        </div>
                      </div>
                      <span style={{ fontSize:10, fontWeight:600, color:stg.color, background:stg.bg, borderRadius:999, padding:'2px 9px', flexShrink:0, marginLeft:12 }}>
                        {p.stage}
                      </span>
                    </div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:14 }}>
                      {p.techStack.map(t => (
                        <span key={t} style={{
                          fontSize:11, color:'#8080A0', background:'#1A1A25',
                          border:'0.5px solid rgba(255,255,255,0.07)',
                          borderRadius:7, padding:'3px 9px',
                        }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <div style={{ display:'flex', gap:14 }}>
                        <span style={{ fontSize:12, color:'#6060A0' }}>
                          <span style={{ color:'#F0F0F8', fontWeight:600 }}>{p.collaborators}</span> collaborators
                        </span>
                        <span style={{ fontSize:12, color:'#6060A0' }}>
                          <span style={{ color:'#F59E0B', fontWeight:600 }}>{p.openRoles}</span> open roles
                        </span>
                      </div>
                      <div style={{ display:'flex', gap:7 }}>
                        <button style={{
                          padding:'6px 13px', borderRadius:8,
                          background:'transparent', border:`0.5px solid ${PURPLE}40`,
                          color:PURPLE, fontSize:12, fontWeight:600, cursor:'pointer',
                          fontFamily:"'DM Sans',sans-serif",
                        }}>Manage</button>
                        <button style={{
                          padding:'6px 13px', borderRadius:8,
                          background:PURPLE, border:'none',
                          color:'#fff', fontSize:12, fontWeight:600, cursor:'pointer',
                          fontFamily:"'DM Sans',sans-serif",
                        }}>Post Role</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* MESSAGES */}
          {activeNav === 'messages' && (
            <div style={{ display:'flex', gap:14, height:'calc(100vh - 120px)' }}>
              <div style={{
                width:270, flexShrink:0,
                background:'#111118', border:'0.5px solid rgba(255,255,255,0.06)',
                borderRadius:14, overflow:'hidden',
              }}>
                <div style={{ padding:'13px 16px', borderBottom:'0.5px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize:12, fontWeight:600, color:'#F0F0F8' }}>Conversations</div>
                </div>
                {MESSAGES_LIST.map(m => (
                  <div key={m.id} onClick={() => setMsgThread(m)} style={{
                    padding:'11px 15px', cursor:'pointer',
                    background: msgThread?.id===m.id ? PURPLE+'08' : 'transparent',
                    borderLeft:`2px solid ${msgThread?.id===m.id ? PURPLE : 'transparent'}`,
                    borderBottom:'0.5px solid rgba(255,255,255,0.04)',
                    display:'flex', alignItems:'center', gap:10,
                  }}>
                    <div style={{
                      width:34, height:34, borderRadius:'50%', flexShrink:0,
                      background:m.color+'20', border:`1.5px solid ${m.color}40`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:10, fontWeight:700, color:m.color,
                    }}>{m.initials}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', justifyContent:'space-between' }}>
                        <span style={{ fontSize:12, fontWeight:600, color:'#E0E0F0' }}>{m.name}</span>
                        <span style={{ fontSize:10, color:'#30305A' }}>{m.time}</span>
                      </div>
                      <div style={{ fontSize:11, color:'#50508A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', marginTop:2 }}>{m.lastMsg}</div>
                    </div>
                    {m.unread > 0 && (
                      <div style={{
                        width:15, height:15, borderRadius:'50%',
                        background:PURPLE, color:'#fff',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:8, fontWeight:700,
                      }}>{m.unread}</div>
                    )}
                  </div>
                ))}
              </div>

              {msgThread ? (
                <div style={{
                  flex:1, background:'#111118', border:'0.5px solid rgba(255,255,255,0.06)',
                  borderRadius:14, display:'flex', flexDirection:'column', overflow:'hidden',
                }}>
                  <div style={{
                    padding:'13px 18px', borderBottom:'0.5px solid rgba(255,255,255,0.05)',
                    display:'flex', alignItems:'center', gap:10,
                  }}>
                    <div style={{
                      width:32, height:32, borderRadius:'50%',
                      background:msgThread.color+'20', border:`1.5px solid ${msgThread.color}40`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:10, fontWeight:700, color:msgThread.color,
                    }}>{msgThread.initials}</div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:'#F0F0F8' }}>{msgThread.name}</div>
                      <div style={{ fontSize:11, color:PURPLE }}>{msgThread.role}</div>
                    </div>
                  </div>
                  <div style={{ flex:1, padding:'14px 18px', overflowY:'auto', display:'flex', flexDirection:'column', gap:9 }}>
                    {msgThread.thread.map((m, i) => (
                      <div key={i} style={{ display:'flex', justifyContent: m.from==='me' ? 'flex-end' : 'flex-start' }}>
                        <div style={{
                          maxWidth:'70%', padding:'9px 13px', borderRadius:12,
                          background: m.from==='me' ? PURPLE : '#1C1C28',
                          border: m.from==='me' ? 'none' : '0.5px solid rgba(255,255,255,0.07)',
                          fontSize:13, color: m.from==='me' ? '#fff' : '#D0D0E8',
                          lineHeight:1.5,
                        }}>
                          {m.text}
                          <div style={{ fontSize:10, marginTop:3, opacity:0.5, textAlign:'right' }}>{m.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    padding:'11px 16px', borderTop:'0.5px solid rgba(255,255,255,0.05)',
                    display:'flex', gap:8,
                  }}>
                    <input
                      placeholder="Type a message..."
                      value={newMsg}
                      onChange={e => setNewMsg(e.target.value)}
                      style={{
                        flex:1, background:'#16161F',
                        border:'0.5px solid rgba(255,255,255,0.08)',
                        borderRadius:9, padding:'9px 12px',
                        fontSize:13, color:'#F0F0F8', outline:'none',
                        fontFamily:"'DM Sans',sans-serif",
                      }}
                    />
                    <button onClick={() => setNewMsg('')} style={{
                      width:36, height:36, borderRadius:9, border:'none',
                      background:PURPLE, color:'#fff',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      cursor:'pointer', flexShrink:0,
                    }}><Icon.Send /></button>
                  </div>
                </div>
              ) : (
                <div style={{
                  flex:1, background:'#111118', border:'0.5px solid rgba(255,255,255,0.06)',
                  borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontSize:24, marginBottom:8 }}>💬</div>
                    <div style={{ fontSize:13, color:'#50508A' }}>Select a conversation</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PROFILE */}
          {activeNav === 'profile' && (
            <div style={{ display:'flex', flexDirection:'column', gap:14, maxWidth:580 }}>
              <div style={{
                background:'#111118', border:'0.5px solid rgba(255,255,255,0.06)',
                borderRadius:16, padding:'22px',
                display:'flex', alignItems:'center', gap:16,
              }}>
                <div style={{
                  width:56, height:56, borderRadius:'50%', flexShrink:0,
                  background:PURPLE+'20', border:`2px solid ${PURPLE}40`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:16, fontWeight:800, color:PURPLE,
                  fontFamily:"'Cabinet Grotesk',sans-serif",
                }}>MN</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:20, fontWeight:800, color:'#F0F0F8', fontFamily:"'Cabinet Grotesk',sans-serif", marginBottom:5 }}>Mahesh Neupane</div>
                  <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                    <span style={{
                      background:PURPLE+'15', border:`0.5px solid ${PURPLE}30`,
                      borderRadius:999, padding:'2px 9px',
                      fontSize:10, fontWeight:700, color:PURPLE,
                    }}>Builder</span>
                    <span style={{ fontSize:12, color:'#40405A' }}>maheshneupane96@gmail.com</span>
                  </div>
                </div>
                <button style={{
                  padding:'7px 14px', borderRadius:9,
                  background:'transparent', border:`0.5px solid ${PURPLE}40`,
                  color:PURPLE, fontSize:12, fontWeight:600, cursor:'pointer',
                  fontFamily:"'DM Sans',sans-serif",
                }}>Edit</button>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
                {[
                  { label:'Projects', value:'2', color:PURPLE },
                  { label:'Collabs', value:'5', color:'#10B981' },
                  { label:'Commits', value:'238', color:'#F59E0B' },
                ].map(s => (
                  <div key={s.label} style={{
                    background:'#111118', border:'0.5px solid rgba(255,255,255,0.06)',
                    borderRadius:12, padding:'14px', textAlign:'center',
                  }}>
                    <div style={{ fontSize:20, fontWeight:800, color:s.color, fontFamily:"'Cabinet Grotesk',sans-serif", marginBottom:3 }}>{s.value}</div>
                    <div style={{ fontSize:11, color:'#40405A' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{
                background:'#111118', border:'0.5px solid rgba(255,255,255,0.06)',
                borderRadius:14, padding:'16px 18px',
              }}>
                <div style={{ fontSize:11, color:'#40405A', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.08em' }}>Skills</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {['TypeScript','Next.js','Supabase','Python','System Design','PostgreSQL'].map(s => (
                    <span key={s} style={{
                      fontSize:11, color:'#8080A0', background:'#1A1A25',
                      border:'0.5px solid rgba(255,255,255,0.07)',
                      borderRadius:7, padding:'4px 10px',
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* RIGHT RAIL */}
      <aside style={{
        width:264, height:'100vh', background:'#0D0D15',
        borderLeft:'0.5px solid rgba(255,255,255,0.05)',
        overflowY:'auto', padding:'22px 16px',
        display:'flex', flexDirection:'column', gap:22, flexShrink:0,
      }}>

        {/* Investor upgrade card */}
        <div style={{
          borderRadius:16, overflow:'hidden',
          background:'linear-gradient(145deg, #1A1030 0%, #120C28 100%)',
          border:'0.5px solid rgba(245,158,11,0.25)',
          boxShadow:'0 0 28px rgba(245,158,11,0.08)',
          padding:'18px 16px',
          position:'relative',
        }}>
          <div style={{
            position:'absolute', top:0, right:0,
            width:80, height:80,
            background:'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
          }}/>
          <div style={{ fontSize:24, marginBottom:8 }}>👑</div>
          <div style={{ fontSize:15, fontWeight:800, color:'#F0F0F8', fontFamily:"'Cabinet Grotesk',sans-serif", marginBottom:5, lineHeight:1.3 }}>
            Unlock Investor<br/>Account
          </div>
          <div style={{ fontSize:12, color:'#8070B0', lineHeight:1.6, marginBottom:14 }}>
            See full deal flow, financial metrics & reach out to founders directly.
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:16 }}>
            {['Full deal-flow access','Founder direct messaging','Advanced AI analytics'].map(f => (
              <div key={f} style={{ display:'flex', alignItems:'center', gap:7 }}>
                <div style={{
                  width:16, height:16, borderRadius:'50%', flexShrink:0,
                  background:'rgba(245,158,11,0.15)', border:'0.5px solid rgba(245,158,11,0.35)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Icon.Check />
                </div>
                <span style={{ fontSize:11, color:'#B0A0D0', fontWeight:400 }}>{f}</span>
              </div>
            ))}
          </div>
          <button style={{
            width:'100%', padding:'11px', borderRadius:11, border:'none', cursor:'pointer',
            background:'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
            color:'#fff', fontSize:13, fontWeight:800,
            fontFamily:"'DM Sans',sans-serif",
            boxShadow:'0 4px 16px rgba(245,158,11,0.35)',
            letterSpacing:'-0.1px',
            display:'flex', alignItems:'center', justifyContent:'center', gap:7,
          }}>
            <span style={{ fontSize:15 }}>⚡</span>
            Upgrade Now
          </button>
        </div>

        <div style={{ height:'0.5px', background:'rgba(255,255,255,0.04)' }}/>

        <section>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
            <span style={{ fontSize:13, fontWeight:700, color:'#C0C0D8' }}>Suggested</span>
            <span style={{ fontSize:12, color:PURPLE, cursor:'pointer', fontWeight:500 }}>See all</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
            {SUGGESTED.map(s => (
              <div key={s.name} style={{
                display:'flex', alignItems:'center', gap:10, padding:'10px 12px',
                background:'#111118', border:'0.5px solid rgba(255,255,255,0.05)',
                borderRadius:11, cursor:'pointer',
              }}>
                <div style={{
                  width:32, height:32, borderRadius:'50%', flexShrink:0,
                  background:s.color+'18', border:`1px solid ${s.color}30`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:10, fontWeight:700, color:s.color,
                }}>{s.initials}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:'#E0E0F0' }}>{s.name}</div>
                  <div style={{ fontSize:11, color:'#50508A' }}>{s.role}</div>
                </div>
                <span style={{ fontSize:11, fontWeight:700, color:'#10B981' }}>{s.match}%</span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height:'0.5px', background:'rgba(255,255,255,0.04)' }}/>

        <section>
          <div style={{ fontSize:13, fontWeight:700, color:'#C0C0D8', marginBottom:12 }}>Trending</div>
          <div style={{ display:'flex', flexDirection:'column', gap:1 }}>
            {TRENDING.map((t, i) => (
              <div key={t.name} style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'8px 8px', borderRadius:9, cursor:'pointer',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                  <span style={{ fontSize:11, color:'#30305A', width:14, textAlign:'center', fontWeight:600 }}>{i+1}</span>
                  <span style={{ fontSize:13, color:'#B0B0C8' }}>{t.name}</span>
                </div>
                <span style={{
                  fontSize:10, fontWeight:600, color:t.color,
                  background:t.color+'12', borderRadius:999, padding:'2px 8px',
                }}>{t.tag}</span>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  )
}

// ── PROJECT ROW CARD ──────────────────────────────────────────

function ProjectRow({ project, onView }: { project: typeof PROJECTS[0]; onView: () => void }) {
  const stg = STAGE[project.stage]
  return (
    <div style={{
      background:'#111118', border:'0.5px solid rgba(255,255,255,0.06)',
      borderRadius:16, padding:'18px 20px', transition:'all 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = PURPLE+'30'; e.currentTarget.style.background = '#131320' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = '#111118' }}
    >
      <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginBottom:13 }}>
        <div style={{
          width:44, height:44, borderRadius:12, flexShrink:0,
          background:project.color+'18', border:`1px solid ${project.color}30`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:12, fontWeight:800, color:project.color,
          fontFamily:"'Cabinet Grotesk',sans-serif",
        }}>{project.initials}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:5 }}>
            <h3 style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:17, fontWeight:800, color:'#F0F0F8' }}>
              {project.name}
            </h3>
            <span style={{ fontSize:11, fontWeight:600, color:stg.color, background:stg.bg, borderRadius:999, padding:'2px 9px' }}>
              {project.stage}
            </span>
          </div>
          <p style={{ fontSize:13, color:'#6060A0', lineHeight:1.6 }}>{project.desc}</p>
        </div>
        <Sparkline data={project.commitHistory} color={project.color} />
      </div>

      <div style={{ display:'flex', gap:7, marginBottom:13, flexWrap:'wrap', alignItems:'center' }}>
        <span style={{ fontSize:11, color:PURPLE, display:'flex', alignItems:'center', gap:3, fontWeight:600 }}>
          <Icon.Sparkle /> AI match
        </span>
        {project.techStack.map(t => (
          <span key={t} style={{
            fontSize:11, color:'#7070A0', background:'#16161F',
            border:'0.5px solid rgba(255,255,255,0.07)',
            borderRadius:7, padding:'3px 9px',
          }}>{t}</span>
        ))}
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:5 }}>
          <span style={{ color:'#40405A', display:'flex' }}><Icon.Git /></span>
          <span style={{ fontSize:12, color:'#50508A' }}>{project.commits}</span>
          <span style={{ color:'#F59E0B', display:'flex', marginLeft:7 }}><Icon.Star /></span>
          <span style={{ fontSize:12, color:'#50508A' }}>{project.stars}</span>
        </div>
      </div>

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{
            width:26, height:26, borderRadius:'50%',
            background:project.author.color+'20', border:`1px solid ${project.author.color}40`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:9, fontWeight:700, color:project.author.color,
          }}>{project.author.initials}</div>
          <span style={{ fontSize:13, color:'#6060A0' }}>{project.author.name}</span>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={onView} style={{
            padding:'7px 15px', borderRadius:9,
            background:'transparent', border:`0.5px solid ${PURPLE}40`,
            color:PURPLE, fontSize:13, fontWeight:600, cursor:'pointer',
            fontFamily:"'DM Sans',sans-serif",
          }}>View</button>
          <button onClick={onView} style={{
            padding:'7px 15px', borderRadius:9,
            background:PURPLE, border:'none',
            color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer',
            fontFamily:"'DM Sans',sans-serif",
            boxShadow:`0 2px 12px ${PURPLE}40`,
          }}>Request to Join</button>
        </div>
      </div>
    </div>
  )
}

// ── COLLAB ROW ────────────────────────────────────────────────

function CollabRow({ req }: { req: typeof COLLAB_REQUESTS[0] }) {
  const [applied, setApplied] = useState(false)
  return (
    <div style={{
      background:'#111118', border:'0.5px solid rgba(255,255,255,0.06)',
      borderRadius:14, padding:'16px 18px', transition:'border-color 0.2s',
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,158,11,0.2)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
    >
      <div style={{ display:'flex', alignItems:'flex-start', gap:13, marginBottom:12 }}>
        <div style={{
          width:40, height:40, borderRadius:11, flexShrink:0,
          background:req.color+'18', border:`1px solid ${req.color}25`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:11, fontWeight:800, color:req.color,
          fontFamily:"'Cabinet Grotesk',sans-serif",
        }}>{req.initials}</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:14, fontWeight:700, color:'#F0F0F8', fontFamily:"'Cabinet Grotesk',sans-serif", marginBottom:6 }}>{req.project}</div>
          <span style={{
            fontSize:11, fontWeight:700, color:'#F59E0B',
            background:'#F59E0B12', border:'0.5px solid #F59E0B30',
            borderRadius:999, padding:'3px 10px',
          }}>{req.role}</span>
        </div>
      </div>

      <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:10 }}>
        {req.skills.map(s => (
          <span key={s} style={{
            fontSize:11, color:'#7070A0', background:'#16161F',
            border:'0.5px solid rgba(255,255,255,0.06)',
            borderRadius:6, padding:'3px 8px',
          }}>{s}</span>
        ))}
      </div>

      {req.matched && (
        <div style={{
          display:'flex', alignItems:'center', gap:6,
          background:PURPLE+'08', border:`0.5px solid ${PURPLE}20`,
          borderRadius:9, padding:'7px 11px', marginBottom:12,
        }}>
          <span style={{ color:PURPLE, display:'flex' }}><Icon.Sparkle /></span>
          <span style={{ fontSize:12, color:'#B0A0FF' }}>AI matched this to your profile</span>
        </div>
      )}

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:12, color:'#50508A' }}>{req.applicants} applicants so far</span>
        <button onClick={() => setApplied(true)} style={{
          padding:'7px 16px', borderRadius:9, border:'none',
          background: applied ? '#10B981' : PURPLE,
          color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer',
          fontFamily:"'DM Sans',sans-serif", transition:'background 0.2s',
        }}>
          {applied ? '✓ Applied' : 'Apply to Join'}
        </button>
      </div>
    </div>
  )
}