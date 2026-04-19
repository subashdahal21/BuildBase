'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type NavId = 'dealflow' | 'portfolio' | 'saved' | 'messages' | 'profile' | 'discover'
type ProjectTab = 'overview' | 'team' | 'commits' | 'invest' | 'messages'

const ACCENT = '#F59E0B'

// ── DATA ──────────────────────────────────────────────────────

const STARTUPS = [
  {
    id: 1, name: 'NeuralSearch', initials: 'NS', color: '#7C5CFC',
    tagline: 'AI-powered semantic search for enterprise codebases using vector embeddings.',
    sector: 'AI/ML', stage: 'Seed', ask: '$500K', valuation: '$3M',
    traction: '2,400 MAU', growth: '+18% MoM', aiMatch: 94,
    github: 'neuralsearch/core', commits: 847, stars: 312,
    openRoles: ['ML Engineer', 'Frontend Dev'],
    description: 'NeuralSearch is building the next generation of developer tooling. Our semantic search engine understands code context, not just keywords — enabling teams to find, understand, and reuse code across massive codebases in seconds.',
    founders: [
      { initials: 'AK', name: 'Alex Kim', role: 'CEO & Co-founder', color: '#7C5CFC', commits: 412 },
      { initials: 'SR', name: 'Sara R.', role: 'CTO & Co-founder', color: '#10B981', commits: 435 },
    ],
    team: [
      { initials: 'JL', name: 'James L.', role: 'ML Engineer', color: '#3B82F6', commits: 201 },
    ],
    commitHistory: [12, 8, 15, 22, 18, 30, 25, 19, 28, 35, 42, 38, 45, 50],
    techStack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Pinecone', 'Docker'],
    milestones: [
      { label: 'Beta launch', date: 'Jan 2025', done: true },
      { label: '1K users', date: 'Feb 2025', done: true },
      { label: 'Series A prep', date: 'Q3 2025', done: false },
    ],
  },
  {
    id: 2, name: 'FinFlow', initials: 'FF', color: '#10B981',
    tagline: 'Open-source personal finance platform with real-time team budgeting.',
    sector: 'FinTech', stage: 'Pre-seed', ask: '$200K', valuation: '$1.2M',
    traction: '800 users', growth: '+32% WoW', aiMatch: 87,
    github: 'finflow/app', commits: 324, stars: 189,
    openRoles: ['Backend Dev', 'Mobile Dev'],
    description: 'FinFlow makes financial collaboration simple for small teams and families. Real-time bank sync, shared budgets, and actionable insights — all open source.',
    founders: [
      { initials: 'PR', name: 'Priya R.', role: 'Founder & CEO', color: '#10B981', commits: 324 },
    ],
    team: [],
    commitHistory: [5, 9, 7, 14, 11, 18, 22, 16, 20, 25, 19, 28, 24, 31],
    techStack: ['Next.js', 'Node.js', 'Plaid API', 'MongoDB', 'Tailwind'],
    milestones: [
      { label: 'MVP launched', date: 'Dec 2024', done: true },
      { label: '500 signups', date: 'Jan 2025', done: true },
      { label: 'Bank sync live', date: 'Mar 2025', done: false },
    ],
  },
  {
    id: 3, name: 'DevMentor', initials: 'DM', color: '#F59E0B',
    tagline: 'Peer-to-peer mentorship connecting junior devs with senior engineers.',
    sector: 'EdTech', stage: 'Pre-seed', ask: '$150K', valuation: '$800K',
    traction: '320 active pairs', growth: '+28% retention', aiMatch: 76,
    github: 'devmentor/platform', commits: 198, stars: 94,
    openRoles: ['Product Designer', 'Growth Lead'],
    description: 'DevMentor solves the #1 problem in tech education — getting real-world guidance. We match junior developers with experienced engineers for structured 1:1 mentorship.',
    founders: [
      { initials: 'JL', name: 'James L.', role: 'CEO', color: '#F59E0B', commits: 112 },
      { initials: 'MP', name: 'Maya P.', role: 'CPO', color: '#3B82F6', commits: 86 },
    ],
    team: [],
    commitHistory: [3, 5, 4, 8, 6, 10, 9, 12, 8, 14, 11, 16, 13, 18],
    techStack: ['React', 'Express', 'PostgreSQL', 'WebRTC', 'Stripe'],
    milestones: [
      { label: 'Platform launch', date: 'Nov 2024', done: true },
      { label: '100 pairs matched', date: 'Jan 2025', done: true },
      { label: 'Video sessions', date: 'Apr 2025', done: false },
    ],
  },
]

const PORTFOLIO = [
  { id: 1, name: 'CloudHive', initials: 'CH', color: '#3B82F6', sector: 'Infrastructure', stage: 'Series A', invested: '$25,000', currentVal: '$42,000', roi: 68, date: 'Mar 2024', equity: '2.1%' },
  { id: 2, name: 'HealthAI', initials: 'HA', color: '#10B981', sector: 'Healthcare', stage: 'Seed', invested: '$15,000', currentVal: '$18,000', roi: 20, date: 'Nov 2023', equity: '1.4%' },
]

const MESSAGES_DATA = [
  { id: 1, name: 'Alex Kim', initials: 'AK', color: '#7C5CFC', role: 'Founder · NeuralSearch', lastMsg: 'Thanks for your interest! Happy to share our pitch deck.', time: '5m', unread: 2, thread: [
    { from: 'them', text: 'Hi! We saw your investment profile and think there might be a great fit.', time: '10:02 AM' },
    { from: 'them', text: 'Thanks for your interest! Happy to share our pitch deck.', time: '10:04 AM' },
  ]},
  { id: 2, name: 'Priya R.', initials: 'PR', color: '#10B981', role: 'Founder · FinFlow', lastMsg: 'We just hit 1K users this week!', time: '1h', unread: 0, thread: [
    { from: 'me', text: 'Congrats on the beta launch. What are your next milestones?', time: 'Yesterday' },
    { from: 'them', text: 'We just hit 1K users this week!', time: 'Yesterday' },
  ]},
]

const ALL_STARTUPS = [
  ...STARTUPS,
  {
    id: 4, name: 'GreenChain', initials: 'GC', color: '#10B981',
    tagline: 'Blockchain-based carbon credit marketplace for SMEs.',
    sector: 'CleanTech', stage: 'Pre-seed', ask: '$300K', valuation: '$1.8M',
    traction: '120 companies', growth: '+25% MoM', aiMatch: 0,
    github: 'greenchain/core', commits: 210, stars: 88,
    openRoles: ['Blockchain Dev', 'BD Lead'],
    description: 'GreenChain makes carbon offsetting accessible for small businesses by creating a transparent blockchain marketplace where SMEs can buy, sell, and verify carbon credits in real time.',
    founders: [{ initials: 'LM', name: 'Lara M.', role: 'CEO', color: '#10B981', commits: 145 }],
    team: [],
    commitHistory: [4, 6, 5, 9, 8, 13, 11, 16, 14, 19, 17, 22, 20, 25],
    techStack: ['Solidity', 'React', 'Node.js', 'PostgreSQL', 'IPFS'],
    milestones: [
      { label: 'Smart contract audit', date: 'Feb 2025', done: true },
      { label: '100 SME signups', date: 'Apr 2025', done: false },
    ],
  },
  {
    id: 5, name: 'MedBot', initials: 'MB', color: '#3B82F6',
    tagline: 'AI-powered clinical note assistant for doctors and nurses.',
    sector: 'HealthTech', stage: 'Seed', ask: '$750K', valuation: '$4.5M',
    traction: '800 clinicians', growth: '+40% MoM', aiMatch: 0,
    github: 'medbot/platform', commits: 543, stars: 201,
    openRoles: ['ML Engineer', 'HIPAA Compliance Lead'],
    description: 'MedBot reduces physician burnout by auto-generating clinical notes from voice using fine-tuned LLMs, cutting documentation time by 70% per shift.',
    founders: [
      { initials: 'RK', name: 'Dr. R. Khan', role: 'CEO', color: '#3B82F6', commits: 310 },
      { initials: 'TS', name: 'T. Singh', role: 'CTO', color: '#7C5CFC', commits: 233 },
    ],
    team: [],
    commitHistory: [10, 14, 12, 20, 18, 26, 24, 30, 28, 36, 32, 40, 38, 46],
    techStack: ['Python', 'FastAPI', 'Whisper', 'GPT-4', 'React Native'],
    milestones: [
      { label: 'HIPAA compliant', date: 'Jan 2025', done: true },
      { label: 'Hospital pilot', date: 'May 2025', done: false },
    ],
  },
  {
    id: 6, name: 'RetailAI', initials: 'RA', color: '#F59E0B',
    tagline: 'Predictive inventory and demand forecasting for e-commerce.',
    sector: 'E-commerce', stage: 'Pre-seed', ask: '$250K', valuation: '$1.5M',
    traction: '35 stores', growth: '+60% WoW', aiMatch: 0,
    github: 'retailai/core', commits: 178, stars: 64,
    openRoles: ['Data Scientist', 'Sales Lead'],
    description: 'RetailAI gives independent e-commerce stores enterprise-grade demand forecasting, reducing overstock by 30% and stockouts by 45% using proprietary ML models.',
    founders: [{ initials: 'HN', name: 'Hina N.', role: 'Founder', color: '#F59E0B', commits: 178 }],
    team: [],
    commitHistory: [3, 5, 4, 7, 6, 9, 8, 12, 10, 14, 13, 17, 15, 19],
    techStack: ['Python', 'scikit-learn', 'Next.js', 'Shopify API', 'AWS'],
    milestones: [
      { label: 'Beta launched', date: 'Mar 2025', done: true },
      { label: '100 stores', date: 'Jun 2025', done: false },
    ],
  },
  {
    id: 7, name: 'LegalBot', initials: 'LB', color: '#7C5CFC',
    tagline: 'AI contract review and legal Q&A for startups and freelancers.',
    sector: 'LegalTech', stage: 'Seed', ask: '$600K', valuation: '$3.5M',
    traction: '3,200 users', growth: '+22% MoM', aiMatch: 0,
    github: 'legalbot/app', commits: 389, stars: 143,
    openRoles: ['Legal Counsel', 'Frontend Dev'],
    description: 'LegalBot makes legal protection affordable. Founders and freelancers get instant contract review, risk flagging, and plain-English explanations in seconds — no lawyer needed.',
    founders: [
      { initials: 'CJ', name: 'C. Johnson', role: 'CEO', color: '#7C5CFC', commits: 220 },
      { initials: 'PW', name: 'P. Wang', role: 'CTO', color: '#10B981', commits: 169 },
    ],
    team: [],
    commitHistory: [8, 10, 9, 14, 12, 18, 16, 21, 19, 25, 22, 28, 26, 30],
    techStack: ['Next.js', 'Claude API', 'Supabase', 'Stripe', 'PDF.js'],
    milestones: [
      { label: 'MVP launched', date: 'Feb 2025', done: true },
      { label: '5K users', date: 'May 2025', done: false },
    ],
  },
  {
    id: 8, name: 'AgriSense', initials: 'AS', color: '#10B981',
    tagline: 'IoT soil monitoring and crop yield prediction for smallholder farmers.',
    sector: 'AgriTech', stage: 'Pre-seed', ask: '$180K', valuation: '$900K',
    traction: '200 farms', growth: '+15% MoM', aiMatch: 0,
    github: 'agrisense/core', commits: 134, stars: 47,
    openRoles: ['IoT Engineer', 'Field Sales'],
    description: 'AgriSense deploys affordable soil sensors and an AI dashboard to help smallholder farmers increase yields by 25% through real-time soil health monitoring and personalized crop advice.',
    founders: [{ initials: 'BM', name: 'B. Mwangi', role: 'CEO', color: '#10B981', commits: 134 }],
    team: [],
    commitHistory: [2, 3, 3, 5, 4, 7, 6, 8, 7, 10, 9, 11, 10, 13],
    techStack: ['Arduino', 'MQTT', 'Python', 'React', 'PostgreSQL'],
    milestones: [
      { label: 'Pilot complete', date: 'Jan 2025', done: true },
      { label: '500 farms', date: 'Jul 2025', done: false },
    ],
  },
]

function scoreStartup(startup: typeof ALL_STARTUPS[0], query: string, sectors: string[], stage: string): number {
  const q = query.toLowerCase()
  const tokens = q.split(/\s+/).filter(Boolean)
  let score = 0

  const haystack = [
    startup.name, startup.tagline, startup.description,
    startup.sector, startup.stage, startup.ask, startup.traction,
    ...startup.techStack, ...(startup.openRoles ?? []),
  ].join(' ').toLowerCase()

  for (const t of tokens) {
    if (haystack.includes(t)) score += 10
  }
  if (sectors.some(s => startup.sector.toLowerCase().includes(s.toLowerCase()))) score += 25
  if (stage && startup.stage.toLowerCase().includes(stage.toLowerCase())) score += 20

  const askNum = parseInt(startup.ask.replace(/[^0-9]/g, ''))
  if (q.includes('pre-seed') && startup.stage === 'Pre-seed') score += 15
  if (q.includes('seed') && startup.stage === 'Seed') score += 15
  if ((q.includes('ai') || q.includes('ml')) && (startup.sector === 'AI/ML' || startup.techStack.some(t => ['openai','claude','gpt','whisper','llm','ml','ai'].includes(t.toLowerCase())))) score += 20
  if (q.includes('health') && startup.sector === 'HealthTech') score += 15
  if (q.includes('fintech') && startup.sector === 'FinTech') score += 15
  if (q.includes('legal') && startup.sector === 'LegalTech') score += 15
  if (q.includes('clean') && startup.sector === 'CleanTech') score += 15
  if (q.includes('saas') && startup.techStack.some(t => ['supabase','stripe','next.js'].includes(t.toLowerCase()))) score += 10

  const maxAsk = extractMaxAmount(q)
  if (maxAsk && askNum > maxAsk) score -= 20

  return Math.min(99, Math.max(0, score))
}

function extractMaxAmount(query: string): number | null {
  const m = query.match(/under\s*\$?([\d]+)k?/i)
  if (!m) return null
  const n = parseInt(m[1])
  return query.toLowerCase().includes('k') || m[0].toLowerCase().includes('k') ? n * 1000 : n
}

const STAGE_STYLE: Record<string, { color: string; bg: string }> = {
  'Pre-seed': { color: '#3B82F6', bg: '#3B82F612' },
  'Seed':     { color: '#7C5CFC', bg: '#7C5CFC12' },
  'Series A': { color: '#10B981', bg: '#10B98112' },
}

// ── ICONS ─────────────────────────────────────────────────────

const Icon = {
  DealFlow: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  Portfolio: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
  Saved: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  Messages: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Profile: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Bell: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Git: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>,
  Star: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Send: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Check: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Sparkle: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/></svg>,
  Back: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Discover: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Settings: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
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

// ── COMMIT SPARKLINE ──────────────────────────────────────────

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const w = 120, h = 36, pad = 2
  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = h - pad - ((v / max) * (h - pad * 2))
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
      <polyline points={`${pad},${h} ${points} ${w - pad},${h}`} fill={color} opacity="0.08"/>
    </svg>
  )
}

// ── COMMIT BAR CHART ──────────────────────────────────────────

function CommitChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const days = ['', '', '', '', '', '', 'Mon', '', '', '', '', '', '', 'Today']
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 80 }}>
      {data.map((v, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
          <div style={{
            width: '100%', borderRadius: 3,
            background: i === data.length - 1 ? color : color + '50',
            height: `${(v / max) * 64}px`,
            minHeight: 4, transition: 'all 0.2s',
          }} />
          <span style={{ fontSize: 9, color: '#30305A', whiteSpace: 'nowrap' }}>{days[i]}</span>
        </div>
      ))}
    </div>
  )
}

// ── PROJECT DETAIL MODAL ──────────────────────────────────────

function ProjectDetail({ startup, onClose }: { startup: typeof STARTUPS[0]; onClose: () => void }) {
  const [tab, setTab] = useState<ProjectTab>('overview')
  const [msgInput, setMsgInput] = useState('')
  const [investAmount, setInvestAmount] = useState('')
  const [equity, setEquity] = useState('')
  const [investMsg, setInvestMsg] = useState('')
  const [invested, setInvested] = useState(false)
  const [messages, setMessages] = useState<{ from: 'me' | 'them'; text: string; time: string }[]>([
  { from: 'them', text: `Hi! Thanks for checking out ${startup.name}...`, time: 'Earlier' },
])

  const sendMsg = () => {
    if (!msgInput.trim()) return
    setMessages(m => [...m, { from: 'me', text: msgInput, time: 'Just now' }])
    setMsgInput('')
    setTimeout(() => {
      setMessages(m => [...m, { from: 'them', text: "Thanks for reaching out! I'll get back to you shortly.", time: 'Just now' }])
    }, 1200)
  }

  const stg = STAGE_STYLE[startup.stage] ?? { color: '#9090B0', bg: '#9090B015' }
  const allMembers = [...startup.founders, ...startup.team]

  const tabs: { id: ProjectTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'team', label: 'Team' },
    { id: 'commits', label: 'Git Activity' },
    { id: 'invest', label: 'Invest' },
    { id: 'messages', label: 'Messages' },
  ]

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }} onClick={onClose}>
      <div style={{
        background: '#111118', border: '0.5px solid rgba(255,255,255,0.08)',
        borderRadius: 20, width: '100%', maxWidth: 720,
        maxHeight: '88vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          padding: '20px 24px', borderBottom: '0.5px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0,
        }}>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: 8,
            background: '#1C1C28', border: '0.5px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#6060A0', cursor: 'pointer', flexShrink: 0,
          }}>
            <Icon.Back />
          </button>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: startup.color + '18', border: `1px solid ${startup.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 800, color: startup.color,
            fontFamily: "'Cabinet Grotesk', sans-serif",
          }}>{startup.initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h2 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 18, fontWeight: 800, color: '#F0F0F8' }}>
                {startup.name}
              </h2>
              <span style={{ fontSize: 11, fontWeight: 600, color: stg.color, background: stg.bg, borderRadius: 999, padding: '2px 10px' }}>
                {startup.stage}
              </span>
              <span style={{ fontSize: 11, color: '#6060A0' }}>{startup.sector}</span>
            </div>
            <p style={{ fontSize: 12, color: '#6060A0', lineHeight: 1.4 }}>{startup.tagline}</p>
          </div>
          <div style={{
            fontSize: 13, fontWeight: 700, color: '#10B981',
            background: '#10B98112', border: '0.5px solid #10B98130',
            borderRadius: 10, padding: '6px 12px', flexShrink: 0,
          }}>
            <span style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon.Sparkle /> {startup.aiMatch}% match
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: 0, padding: '0 24px',
          borderBottom: '0.5px solid rgba(255,255,255,0.06)', flexShrink: 0,
        }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '12px 16px', background: 'none', border: 'none',
              borderBottom: `2px solid ${tab === t.id ? ACCENT : 'transparent'}`,
              color: tab === t.id ? '#F0F0F8' : '#50508A',
              fontSize: 13, fontWeight: tab === t.id ? 600 : 400,
              cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.15s', marginBottom: -1,
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

          {/* OVERVIEW */}
          {tab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={{ fontSize: 14, color: '#9090B0', lineHeight: 1.7 }}>{startup.description}</p>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {[
                  { label: 'Asking', value: startup.ask },
                  { label: 'Valuation', value: startup.valuation },
                  { label: 'Traction', value: startup.traction },
                  { label: 'Growth', value: startup.growth },
                ].map(m => (
                  <div key={m.label} style={{
                    background: '#16161F', border: '0.5px solid rgba(255,255,255,0.06)',
                    borderRadius: 12, padding: '14px 16px',
                  }}>
                    <div style={{ fontSize: 10, color: '#40405A', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#F0F0F8' }}>{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Commit sparkline */}
              <div style={{
                background: '#16161F', border: '0.5px solid rgba(255,255,255,0.06)',
                borderRadius: 12, padding: '14px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: 10, color: '#40405A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Commit activity</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#F0F0F8' }}>{startup.commits} total commits</div>
                  <div style={{ fontSize: 11, color: '#6060A0', marginTop: 2 }}>Last 14 days</div>
                </div>
                <Sparkline data={startup.commitHistory} color={startup.color} />
              </div>

              {/* Tech stack */}
              <div>
                <div style={{ fontSize: 11, color: '#40405A', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tech stack</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {startup.techStack.map(t => (
                    <span key={t} style={{
                      fontSize: 11, fontWeight: 500, color: '#9090C0',
                      background: '#1C1C28', border: '0.5px solid rgba(255,255,255,0.08)',
                      borderRadius: 7, padding: '4px 10px',
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div>
                <div style={{ fontSize: 11, color: '#40405A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Milestones</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {startup.milestones.map((m, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                        background: m.done ? '#10B98120' : '#1C1C28',
                        border: `1px solid ${m.done ? '#10B98140' : 'rgba(255,255,255,0.08)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#10B981',
                      }}>
                        {m.done && <Icon.Check />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 13, color: m.done ? '#C0C0D8' : '#50508A' }}>{m.label}</span>
                      </div>
                      <span style={{ fontSize: 11, color: '#40405A' }}>{m.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open roles */}
              {startup.openRoles.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, color: '#40405A', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Open roles</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {startup.openRoles.map(r => (
                      <span key={r} style={{
                        fontSize: 12, fontWeight: 600, color: ACCENT,
                        background: ACCENT + '12', border: `0.5px solid ${ACCENT}30`,
                        borderRadius: 8, padding: '5px 12px',
                      }}>{r}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TEAM */}
          {tab === 'team' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 11, color: '#40405A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Founders & team ({allMembers.length} members)
              </div>
              {allMembers.map(m => (
                <div key={m.name} style={{
                  background: '#16161F', border: '0.5px solid rgba(255,255,255,0.06)',
                  borderRadius: 14, padding: '16px 18px',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                    background: m.color + '20', border: `1.5px solid ${m.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, color: m.color,
                  }}>{m.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F0F8', marginBottom: 3 }}>{m.name}</div>
                    <div style={{ fontSize: 12, color: '#6060A0' }}>{m.role}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 10, color: '#40405A', marginBottom: 3 }}>Commits</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Icon.Git />
                      <span style={{ fontSize: 14, fontWeight: 700, color: m.color }}>{m.commits}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* GIT ACTIVITY */}
          {tab === 'commits' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{
                background: '#16161F', border: '0.5px solid rgba(255,255,255,0.06)',
                borderRadius: 14, padding: '18px 20px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F8', marginBottom: 3 }}>Commit History</div>
                    <div style={{ fontSize: 11, color: '#50508A' }}>Last 14 days</div>
                  </div>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 10, color: '#40405A', marginBottom: 2 }}>Total</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: startup.color }}>{startup.commits}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 10, color: '#40405A', marginBottom: 2 }}>Stars</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <span style={{ color: ACCENT }}><Icon.Star /></span>
                        <span style={{ fontSize: 15, fontWeight: 700, color: '#F0F0F8' }}>{startup.stars}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CommitChart data={startup.commitHistory} color={startup.color} />
              </div>

              <div>
                <div style={{ fontSize: 11, color: '#40405A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Contributions by member
                </div>
                {allMembers.map(m => {
                  const total = allMembers.reduce((s, x) => s + x.commits, 0)
                  const pct = Math.round((m.commits / total) * 100)
                  return (
                    <div key={m.name} style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{
                            width: 24, height: 24, borderRadius: '50%',
                            background: m.color + '20', border: `1px solid ${m.color}40`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 9, fontWeight: 700, color: m.color,
                          }}>{m.initials}</div>
                          <span style={{ fontSize: 12, color: '#C0C0D8' }}>{m.name}</span>
                        </div>
                        <span style={{ fontSize: 12, color: m.color, fontWeight: 600 }}>{m.commits} commits</span>
                      </div>
                      <div style={{ height: 5, background: '#1C1C28', borderRadius: 99 }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: m.color, borderRadius: 99, opacity: 0.8 }} />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div style={{
                background: '#16161F', border: '0.5px solid rgba(255,255,255,0.06)',
                borderRadius: 12, padding: '14px 16px',
              }}>
                <div style={{ fontSize: 11, color: '#40405A', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Recent commits</div>
                {[
                  { msg: 'feat: add vector similarity scoring to search engine', author: startup.founders[0].initials, color: startup.founders[0].color, time: '2h ago', hash: 'a3f8c2d' },
                  { msg: 'fix: resolve tokenization edge case for multi-lang input', author: startup.founders[1]?.initials ?? startup.founders[0].initials, color: startup.founders[1]?.color ?? startup.founders[0].color, time: '5h ago', hash: 'b7e1d9a' },
                  { msg: 'chore: update dependencies and CI pipeline', author: startup.founders[0].initials, color: startup.founders[0].color, time: '1d ago', hash: 'c4a2f1b' },
                ].map((c, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 0', borderBottom: i < 2 ? '0.5px solid rgba(255,255,255,0.04)' : 'none',
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                      background: c.color + '20', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: 8, fontWeight: 700, color: c.color,
                    }}>{c.author}</div>
                    <span style={{ flex: 1, fontSize: 12, color: '#9090B0', fontFamily: 'monospace' }}>{c.msg}</span>
                    <span style={{ fontSize: 10, color: '#30305A', flexShrink: 0 }}>{c.time}</span>
                    <span style={{ fontSize: 10, color: '#30305A', fontFamily: 'monospace', flexShrink: 0 }}>{c.hash}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INVEST */}
          {tab === 'invest' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {invested ? (
                <div style={{
                  background: '#10B98112', border: '0.5px solid #10B98130',
                  borderRadius: 14, padding: '28px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>🎉</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#10B981', marginBottom: 6 }}>Proposal sent!</div>
                  <div style={{ fontSize: 13, color: '#6060A0' }}>The founders will review your offer and get back to you soon.</div>
                </div>
              ) : (
                <>
                  <div style={{
                    background: ACCENT + '08', border: `0.5px solid ${ACCENT}20`,
                    borderRadius: 12, padding: '14px 16px',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <span style={{ color: ACCENT }}><Icon.Sparkle /></span>
                    <span style={{ fontSize: 13, color: '#F5C067' }}>
                      {startup.aiMatch}% match with your investment thesis — Strong fit for your portfolio.
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {[
                      { label: 'Current valuation', value: startup.valuation },
                      { label: 'Raise target', value: startup.ask },
                    ].map(m => (
                      <div key={m.label} style={{
                        background: '#16161F', border: '0.5px solid rgba(255,255,255,0.06)',
                        borderRadius: 12, padding: '14px 16px',
                      }}>
                        <div style={{ fontSize: 10, color: '#40405A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.label}</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#F0F0F8' }}>{m.value}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      { label: 'Investment amount ($)', placeholder: 'e.g. 25000', value: investAmount, set: setInvestAmount },
                      { label: 'Equity requested (%)', placeholder: 'e.g. 3.5', value: equity, set: setEquity },
                    ].map(f => (
                      <div key={f.label}>
                        <div style={{ fontSize: 11, color: '#50508A', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{f.label}</div>
                        <input
                          placeholder={f.placeholder}
                          value={f.value}
                          onChange={e => f.set(e.target.value)}
                          style={{
                            width: '100%', background: '#16161F',
                            border: '0.5px solid rgba(255,255,255,0.08)',
                            borderRadius: 10, padding: '10px 14px',
                            fontSize: 14, color: '#F0F0F8', outline: 'none',
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        />
                      </div>
                    ))}
                    <div>
                      <div style={{ fontSize: 11, color: '#50508A', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Message to founders</div>
                      <textarea
                        placeholder="Introduce yourself and explain why you're excited about this project..."
                        value={investMsg}
                        onChange={e => setInvestMsg(e.target.value)}
                        rows={3}
                        style={{
                          width: '100%', background: '#16161F',
                          border: '0.5px solid rgba(255,255,255,0.08)',
                          borderRadius: 10, padding: '10px 14px',
                          fontSize: 13, color: '#F0F0F8', outline: 'none',
                          fontFamily: "'DM Sans', sans-serif", resize: 'none',
                          lineHeight: 1.6,
                        }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setInvested(true)}
                    disabled={!investAmount || !equity}
                    style={{
                      width: '100%', padding: '12px', borderRadius: 12, border: 'none',
                      background: investAmount && equity ? ACCENT : '#2A2A35',
                      color: investAmount && equity ? '#000' : '#50508A',
                      fontSize: 14, fontWeight: 700, cursor: investAmount && equity ? 'pointer' : 'not-allowed',
                      fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
                    }}
                  >
                    Send Investment Proposal
                  </button>
                </>
              )}
            </div>
          )}

          {/* MESSAGES */}
          {tab === 'messages' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 12 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 200 }}>
                {messages.map((m, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start',
                  }}>
                    <div style={{
                      maxWidth: '75%', padding: '10px 14px', borderRadius: 12,
                      background: m.from === 'me' ? ACCENT : '#1C1C28',
                      border: m.from === 'me' ? 'none' : '0.5px solid rgba(255,255,255,0.07)',
                      fontSize: 13,
                      color: m.from === 'me' ? '#000' : '#D0D0E8',
                      lineHeight: 1.5,
                    }}>
                      {m.text}
                      <div style={{ fontSize: 10, marginTop: 4, opacity: 0.5, textAlign: 'right' }}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                display: 'flex', gap: 8,
                background: '#16161F', border: '0.5px solid rgba(255,255,255,0.08)',
                borderRadius: 12, padding: '8px 12px',
              }}>
                <input
                  placeholder="Message the founder..."
                  value={msgInput}
                  onChange={e => setMsgInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMsg()}
                  style={{
                    flex: 1, background: 'none', border: 'none', outline: 'none',
                    fontSize: 13, color: '#F0F0F8', fontFamily: "'DM Sans', sans-serif",
                  }}
                />
                <button onClick={sendMsg} style={{
                  width: 32, height: 32, borderRadius: 8, border: 'none',
                  background: ACCENT, color: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', flexShrink: 0,
                }}>
                  <Icon.Send />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── MAIN DASHBOARD ────────────────────────────────────────────

export default function InvestorDashboard() {
  const [activeNav, setActiveNav] = useState<NavId>('dealflow')
  const [selectedProject, setSelectedProject] = useState<typeof STARTUPS[0] | null>(null)
  const [msgThread, setMsgThread] = useState<typeof MESSAGES_DATA[0] | null>(null)
  const [newMsg, setNewMsg] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<(typeof ALL_STARTUPS[0] & { score: number })[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [userProfile, setUserProfile] = useState<{
    full_name: string; email: string; username: string;
    location: string; bio: string; company: string; title: string;
    linkedin: string; website: string; ticket_size: string;
    stage_preference: string; sectors: string[]; goals: string[];
  } | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return
      const email = data.user.email ?? ''
      supabase.from('profiles')
        .select('full_name, username, location, bio, company, title, linkedin, website, ticket_size, stage_preference, sectors, goals')
        .eq('id', data.user.id).single()
        .then(({ data: p }) => {
          const rawName = p?.full_name ?? ''
          const derivedName = rawName || (email ? email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : '')
          setUserProfile({
            full_name: derivedName, email,
            username: p?.username ?? '',
            location: p?.location ?? '',
            bio: p?.bio ?? '',
            company: p?.company ?? '',
            title: p?.title ?? '',
            linkedin: p?.linkedin ?? '',
            website: p?.website ?? '',
            ticket_size: p?.ticket_size ?? '',
            stage_preference: p?.stage_preference ?? '',
            sectors: p?.sectors ?? [],
            goals: p?.goals ?? [],
          })
        })
    })
  }, [])

  const fullName = userProfile?.full_name ?? ''
  const nameParts = fullName.trim().split(' ')
  const firstName = nameParts[0] ?? ''
  const lastInitial = nameParts[1]?.[0] ? ` ${nameParts[1][0]}.` : ''
  const shortName = firstName + lastInitial
  const initials = (firstName[0] ?? '') + (nameParts[1]?.[0] ?? '')
  const userEmail = userProfile?.email ?? ''

  const navItems = [
    { id: 'dealflow' as NavId, label: 'Deal Flow', icon: <Icon.DealFlow /> },
    { id: 'discover' as NavId, label: 'AI Discover', icon: <Icon.Discover /> },
    { id: 'portfolio' as NavId, label: 'Portfolio', icon: <Icon.Portfolio /> },
    { id: 'saved' as NavId, label: 'Saved', icon: <Icon.Saved /> },
    { id: 'messages' as NavId, label: 'Messages', icon: <Icon.Messages />, badge: 2 },
    { id: 'profile' as NavId, label: 'Profile', icon: <Icon.Profile /> },
  ]

  const PAGE_TITLE: Record<NavId, string> = {
    dealflow: 'Deal Flow', discover: 'AI Discover',
    portfolio: 'Portfolio', saved: 'Saved',
    messages: 'Messages', profile: 'Profile',
  }

  const runSearch = () => {
    if (!searchQuery.trim()) return
    setIsSearching(true)
    setTimeout(() => {
      const sectors = userProfile?.sectors ?? []
      const stage = userProfile?.stage_preference ?? ''
      const scored = ALL_STARTUPS.map(s => ({
        ...s,
        score: scoreStartup(s, searchQuery, sectors, stage),
      })).filter(s => s.score > 0).sort((a, b) => b.score - a.score)
      setSearchResults(scored)
      setHasSearched(true)
      setIsSearching(false)
    }, 1200)
  }

  return (
    <div style={{
      display: 'flex', height: '100vh', overflow: 'hidden',
      background: '#0C0C12', fontFamily: "'DM Sans', sans-serif", color: '#F0F0F8',
    }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2A2A40; border-radius: 99px; }
        input::placeholder, textarea::placeholder { color: #30305A; }
      `}</style>

      {selectedProject && (
        <ProjectDetail startup={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {/* SIDEBAR */}
      <aside style={{
        width: 220, height: '100vh', background: '#0D0D15',
        borderRight: '0.5px solid rgba(255,255,255,0.05)',
        display: 'flex', flexDirection: 'column', flexShrink: 0,
      }}>
        <div style={{ padding: '20px 16px 16px', display: 'flex', alignItems: 'center', gap: 9 }}>
          <Logo />
          <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 16, fontWeight: 800, color: '#F0F0F8' }}>Buildbase</span>
        </div>

        <div style={{ padding: '12px 16px 14px', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
              background: ACCENT + '20', border: `1.5px solid ${ACCENT}45`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: ACCENT,
            }}>{initials || '?'}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#E0E0F0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{shortName || '...'}</div>
              <div style={{
                marginTop: 3, display: 'inline-block',
                background: ACCENT + '15', border: `0.5px solid ${ACCENT}30`,
                borderRadius: 999, padding: '1px 8px',
                fontSize: 10, fontWeight: 600, color: ACCENT,
              }}>Investor</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '8px 8px', overflowY: 'auto' }}>
          {navItems.map(item => {
            const active = activeNav === item.id
            return (
              <button key={item.id} onClick={() => setActiveNav(item.id)} style={{
                display: 'flex', alignItems: 'center', gap: 9,
                width: '100%', padding: '9px 10px',
                background: active ? ACCENT + '12' : 'transparent',
                border: 'none', borderLeft: `2px solid ${active ? ACCENT : 'transparent'}`,
                borderRadius: '0 9px 9px 0',
                color: active ? '#F0F0F8' : '#50508A',
                fontSize: 13, fontWeight: active ? 500 : 400,
                cursor: 'pointer', textAlign: 'left',
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 1, transition: 'all 0.15s',
                position: 'relative',
              }}>
                <span style={{ flexShrink: 0, display: 'flex', opacity: active ? 1 : 0.6 }}>{item.icon}</span>
                {item.label}
                {'badge' in item && item.badge && (
                  <span style={{
                    marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%',
                    background: ACCENT, color: '#000',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, fontWeight: 700,
                  }}>{item.badge}</span>
                )}
              </button>
            )
          })}
        </nav>

        <div style={{ padding: '8px 8px', borderTop: '0.5px solid rgba(255,255,255,0.04)' }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 9,
            width: '100%', padding: '9px 10px',
            background: 'transparent', border: 'none',
            borderLeft: '2px solid transparent', borderRadius: '0 9px 9px 0',
            color: '#40405A', fontSize: 13, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            <span style={{ display: 'flex', opacity: 0.5 }}><Icon.Settings /></span>
            Settings
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* Topbar */}
        <div style={{
          padding: '0 28px', height: 56,
          borderBottom: '0.5px solid rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0, background: '#0C0C12',
        }}>
          <h1 style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: 17, fontWeight: 800, color: '#F0F0F8', letterSpacing: '-0.2px',
          }}>
            {PAGE_TITLE[activeNav]}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: '#111118', border: '0.5px solid rgba(255,255,255,0.07)',
              borderRadius: 9, padding: '6px 12px',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#40405A" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input placeholder="Search startups..." style={{
                background: 'none', border: 'none', outline: 'none',
                fontSize: 12, color: '#F0F0F8', width: 160,
                fontFamily: "'DM Sans', sans-serif",
              }} />
            </div>
            <button style={{
              width: 34, height: 34, borderRadius: 9,
              background: '#111118', border: '0.5px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#50508A', cursor: 'pointer', position: 'relative',
            }}>
              <Icon.Bell />
              <div style={{
                position: 'absolute', top: 7, right: 7,
                width: 5, height: 5, borderRadius: '50%',
                background: ACCENT, border: '1.5px solid #0C0C12',
              }} />
            </button>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: ACCENT + '20', border: `1.5px solid ${ACCENT}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: ACCENT,
            }}>{initials || '?'}</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '22px 28px' }}>

          {/* AI DISCOVER */}
          {activeNav === 'discover' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Search Box */}
              <div style={{
                background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                borderRadius: 16, padding: '22px 24px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={ACCENT}><path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/></svg>
                  <span style={{ fontSize: 13, fontWeight: 700, color: ACCENT }}>AI-Powered Deal Discovery</span>
                </div>
                <p style={{ fontSize: 12, color: '#50508A', marginBottom: 18, lineHeight: 1.5 }}>
                  Describe what you&apos;re looking for in plain English. Our AI scores every startup against your query and investment preferences.
                </p>

                <div style={{ position: 'relative', marginBottom: 14 }}>
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && runSearch()}
                    placeholder='e.g. "AI startup pre-seed under $500K" or "fintech with strong traction"'
                    style={{
                      width: '100%', padding: '13px 48px 13px 16px',
                      background: '#0D0D15', border: `1px solid ${ACCENT}30`,
                      borderRadius: 10, color: '#F0F0F8', fontSize: 13,
                      fontFamily: "'DM Sans', sans-serif", outline: 'none',
                    }}
                  />
                  <button
                    onClick={runSearch}
                    style={{
                      position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                      padding: '5px 14px', borderRadius: 7,
                      background: ACCENT, border: 'none',
                      color: '#000', fontSize: 12, fontWeight: 700,
                      cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {isSearching ? '...' : 'Search'}
                  </button>
                </div>

                {/* Quick chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  <span style={{ fontSize: 11, color: '#40405A', alignSelf: 'center' }}>Try:</span>
                  {[
                    'AI/ML pre-seed', 'FinTech seed round', 'under $300K ask',
                    'health tech', 'high traction', 'SaaS startup',
                  ].map(chip => (
                    <button key={chip} onClick={() => { setSearchQuery(chip); }}
                      style={{
                        padding: '4px 12px', borderRadius: 999,
                        background: 'transparent', border: `0.5px solid rgba(255,255,255,0.1)`,
                        color: '#6060A0', fontSize: 11, cursor: 'pointer',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >{chip}</button>
                  ))}
                </div>

                {/* Profile preferences */}
                {(userProfile?.sectors?.length ?? 0) > 0 && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: 11, color: '#40405A', marginRight: 8 }}>Your thesis:</span>
                    {userProfile!.sectors.map(s => (
                      <button key={s} onClick={() => setSearchQuery(s)}
                        style={{
                          marginRight: 6, padding: '3px 10px', borderRadius: 999,
                          background: ACCENT + '12', border: `0.5px solid ${ACCENT}30`,
                          color: ACCENT, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >{s}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* Loading */}
              {isSearching && (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#50508A', fontSize: 13 }}>
                  <div style={{ fontSize: 22, marginBottom: 10 }}>🤖</div>
                  Scoring {ALL_STARTUPS.length} startups against your query...
                </div>
              )}

              {/* Results */}
              {hasSearched && !isSearching && (
                <>
                  <div style={{ fontSize: 12, color: '#50508A' }}>
                    {searchResults.length > 0
                      ? `Found ${searchResults.length} matching startup${searchResults.length > 1 ? 's' : ''} — sorted by AI match score`
                      : 'No startups matched your query. Try broader terms.'}
                  </div>

                  {searchResults.map(s => {
                    const stg = STAGE_STYLE[s.stage] ?? { color: '#8080A0', bg: '#1A1A25' }
                    const matchColor = s.score >= 70 ? '#10B981' : s.score >= 40 ? ACCENT : '#6060A0'
                    return (
                      <div key={s.id}
                        onClick={() => setSelectedProject(s as typeof STARTUPS[0])}
                        style={{
                          background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                          borderRadius: 14, padding: '18px 20px', cursor: 'pointer',
                          transition: 'border-color 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = ACCENT + '30')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                          <div style={{
                            width: 42, height: 42, borderRadius: 11, flexShrink: 0,
                            background: s.color + '18', border: `1px solid ${s.color}25`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 11, fontWeight: 800, color: s.color,
                            fontFamily: "'Cabinet Grotesk', sans-serif",
                          }}>{s.initials}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                              <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 15, fontWeight: 800, color: '#F0F0F8' }}>{s.name}</span>
                              <span style={{ fontSize: 10, fontWeight: 600, color: stg.color, background: stg.bg, borderRadius: 999, padding: '2px 8px' }}>{s.stage}</span>
                              <span style={{ fontSize: 10, fontWeight: 600, color: '#50508A', background: '#1A1A25', borderRadius: 999, padding: '2px 8px' }}>{s.sector}</span>
                            </div>
                            <p style={{ fontSize: 12, color: '#6060A0', lineHeight: 1.5, marginBottom: 10 }}>{s.tagline}</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                              {s.techStack.slice(0, 4).map(t => (
                                <span key={t} style={{
                                  fontSize: 10, color: '#8080A0', background: '#1A1A25',
                                  border: '0.5px solid rgba(255,255,255,0.07)',
                                  borderRadius: 6, padding: '2px 8px',
                                }}>{t}</span>
                              ))}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                              <span style={{ fontSize: 11, color: '#50508A' }}>Ask: <b style={{ color: '#F0F0F8' }}>{s.ask}</b></span>
                              <span style={{ fontSize: 11, color: '#50508A' }}>Traction: <b style={{ color: '#F0F0F8' }}>{s.traction}</b></span>
                              <span style={{ fontSize: 11, color: '#50508A' }}>Growth: <b style={{ color: '#10B981' }}>{s.growth}</b></span>
                            </div>
                          </div>

                          {/* AI Match Score */}
                          <div style={{ flexShrink: 0, textAlign: 'center' }}>
                            <div style={{
                              width: 52, height: 52, borderRadius: '50%',
                              border: `2px solid ${matchColor}`,
                              display: 'flex', flexDirection: 'column',
                              alignItems: 'center', justifyContent: 'center',
                            }}>
                              <span style={{ fontSize: 15, fontWeight: 800, color: matchColor, lineHeight: 1 }}>{s.score}</span>
                              <span style={{ fontSize: 8, color: '#40405A', marginTop: 1 }}>match</span>
                            </div>
                            <div style={{ fontSize: 9, color: '#40405A', marginTop: 4 }}>AI score</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </>
              )}

              {/* Empty state */}
              {!hasSearched && !isSearching && (
                <div style={{
                  textAlign: 'center', padding: '60px 0', color: '#30305A',
                }}>
                  <div style={{ fontSize: 40, marginBottom: 14 }}>🔍</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#40405A', marginBottom: 6 }}>Describe your ideal deal</div>
                  <div style={{ fontSize: 12, color: '#30305A' }}>AI will score every startup in our network against your query</div>
                </div>
              )}
            </div>
          )}

          {/* DEAL FLOW */}
          {activeNav === 'dealflow' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <p style={{ fontSize: 13, color: '#50508A' }}>
                  Welcome back, {firstName || 'there'} 👋 — <span style={{ color: ACCENT }}>3 new projects match your thesis</span>
                </p>
                <div style={{ display: 'flex', gap: 7 }}>
                  {['All', 'AI/ML', 'FinTech', 'EdTech'].map(f => (
                    <button key={f} style={{
                      padding: '4px 12px', borderRadius: 999, border: '0.5px solid rgba(255,255,255,0.08)',
                      background: f === 'All' ? ACCENT + '15' : 'transparent',
                      color: f === 'All' ? ACCENT : '#50508A',
                      fontSize: 11, fontWeight: 500, cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif",
                    }}>{f}</button>
                  ))}
                </div>
              </div>
              {STARTUPS.map(s => (
                <StartupRow key={s.id} startup={s} onView={() => setSelectedProject(s)} />
              ))}
            </div>
          )}

          {/* PORTFOLIO */}
          {activeNav === 'portfolio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 4 }}>
                {[
                  { label: 'Total Invested', value: '$40,000', color: ACCENT },
                  { label: 'Current Value', value: '$60,000', color: '#10B981' },
                  { label: 'Avg ROI', value: '+50%', color: '#10B981' },
                  { label: 'Companies', value: '2', color: '#7C5CFC' },
                ].map(s => (
                  <div key={s.label} style={{
                    background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                    borderRadius: 12, padding: '14px 16px',
                  }}>
                    <div style={{ fontSize: 10, color: '#40405A', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: s.color, fontFamily: "'Cabinet Grotesk', sans-serif" }}>{s.value}</div>
                  </div>
                ))}
              </div>
              {PORTFOLIO.map(inv => (
                <div key={inv.id} style={{
                  background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                  borderRadius: 14, padding: '18px 20px',
                  display: 'flex', alignItems: 'center', gap: 16,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: inv.color + '18', border: `1px solid ${inv.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 800, color: inv.color,
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                  }}>{inv.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#F0F0F8', fontFamily: "'Cabinet Grotesk', sans-serif", marginBottom: 4 }}>{inv.name}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ fontSize: 11, color: '#50508A' }}>{inv.sector}</span>
                      <span style={{ fontSize: 11, color: '#30305A' }}>·</span>
                      <span style={{ fontSize: 11, color: '#50508A' }}>{inv.stage}</span>
                      <span style={{ fontSize: 11, color: '#30305A' }}>·</span>
                      <span style={{ fontSize: 11, color: '#50508A' }}>Since {inv.date}</span>
                      <span style={{ fontSize: 11, color: '#30305A' }}>·</span>
                      <span style={{ fontSize: 11, color: ACCENT }}>Equity: {inv.equity}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 20, textAlign: 'right' }}>
                    {[
                      { label: 'Invested', value: inv.invested, color: '#9090B0' },
                      { label: 'Current', value: inv.currentVal, color: '#F0F0F8' },
                      { label: 'ROI', value: `+${inv.roi}%`, color: '#10B981' },
                    ].map(m => (
                      <div key={m.label}>
                        <div style={{ fontSize: 10, color: '#40405A', marginBottom: 3 }}>{m.label}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: m.color }}>{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MESSAGES */}
          {activeNav === 'messages' && (
            <div style={{ display: 'flex', gap: 14, height: 'calc(100vh - 120px)' }}>
              <div style={{
                width: 280, flexShrink: 0,
                background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                borderRadius: 14, overflow: 'hidden',
              }}>
                <div style={{ padding: '14px 16px', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#F0F0F8' }}>Conversations</div>
                </div>
                {MESSAGES_DATA.map(m => (
                  <div key={m.id} onClick={() => setMsgThread(m)} style={{
                    padding: '12px 16px', cursor: 'pointer',
                    background: msgThread?.id === m.id ? ACCENT + '08' : 'transparent',
                    borderLeft: `2px solid ${msgThread?.id === m.id ? ACCENT : 'transparent'}`,
                    borderBottom: '0.5px solid rgba(255,255,255,0.04)',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      background: m.color + '20', border: `1.5px solid ${m.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: m.color,
                    }}>{m.initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#E0E0F0' }}>{m.name}</span>
                        <span style={{ fontSize: 10, color: '#30305A' }}>{m.time}</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#50508A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 }}>{m.lastMsg}</div>
                    </div>
                    {m.unread > 0 && (
                      <div style={{
                        width: 16, height: 16, borderRadius: '50%',
                        background: ACCENT, color: '#000',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 9, fontWeight: 700,
                      }}>{m.unread}</div>
                    )}
                  </div>
                ))}
              </div>

              {msgThread ? (
                <div style={{
                  flex: 1, background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                  borderRadius: 14, display: 'flex', flexDirection: 'column', overflow: 'hidden',
                }}>
                  <div style={{
                    padding: '14px 18px', borderBottom: '0.5px solid rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: msgThread.color + '20', border: `1.5px solid ${msgThread.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: msgThread.color,
                    }}>{msgThread.initials}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F8' }}>{msgThread.name}</div>
                      <div style={{ fontSize: 11, color: ACCENT }}>{msgThread.role}</div>
                    </div>
                  </div>
                  <div style={{ flex: 1, padding: '16px 18px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {msgThread.thread.map((m, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
                        <div style={{
                          maxWidth: '70%', padding: '9px 13px', borderRadius: 12,
                          background: m.from === 'me' ? ACCENT : '#1C1C28',
                          border: m.from === 'me' ? 'none' : '0.5px solid rgba(255,255,255,0.07)',
                          fontSize: 13, color: m.from === 'me' ? '#000' : '#D0D0E8',
                          lineHeight: 1.5,
                        }}>
                          {m.text}
                          <div style={{ fontSize: 10, marginTop: 3, opacity: 0.5, textAlign: 'right' }}>{m.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    padding: '12px 16px', borderTop: '0.5px solid rgba(255,255,255,0.05)',
                    display: 'flex', gap: 8,
                  }}>
                    <input
                      placeholder="Type a message..."
                      value={newMsg}
                      onChange={e => setNewMsg(e.target.value)}
                      style={{
                        flex: 1, background: '#16161F',
                        border: '0.5px solid rgba(255,255,255,0.08)',
                        borderRadius: 9, padding: '9px 13px',
                        fontSize: 13, color: '#F0F0F8', outline: 'none',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    />
                    <button onClick={() => setNewMsg('')} style={{
                      width: 36, height: 36, borderRadius: 9, border: 'none',
                      background: ACCENT, color: '#000',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', flexShrink: 0,
                    }}>
                      <Icon.Send />
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{
                  flex: 1, background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                  borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>💬</div>
                    <div style={{ fontSize: 14, color: '#50508A' }}>Select a conversation</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PROFILE */}
          {activeNav === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 600 }}>
              {/* Header Card */}
              <div style={{
                background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                borderRadius: 16, padding: '24px',
                display: 'flex', alignItems: 'center', gap: 18,
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
                  background: ACCENT + '20', border: `2px solid ${ACCENT}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontWeight: 800, color: ACCENT,
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                }}>{initials || '?'}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#F0F0F8', fontFamily: "'Cabinet Grotesk', sans-serif", marginBottom: 4 }}>{fullName || 'No name set'}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{
                      background: ACCENT + '15', border: `0.5px solid ${ACCENT}30`,
                      borderRadius: 999, padding: '2px 10px',
                      fontSize: 10, fontWeight: 700, color: ACCENT,
                    }}>Investor</span>
                    {userProfile?.username && <span style={{ fontSize: 12, color: '#50508A' }}>@{userProfile.username}</span>}
                    <span style={{ fontSize: 12, color: '#40405A' }}>{userEmail}</span>
                  </div>
                  {(userProfile?.title || userProfile?.company) && (
                    <div style={{ fontSize: 12, color: '#50508A', marginTop: 5 }}>
                      {[userProfile.title, userProfile.company].filter(Boolean).join(' @ ')}
                    </div>
                  )}
                  {userProfile?.location && (
                    <div style={{ fontSize: 12, color: '#50508A', marginTop: 3 }}>📍 {userProfile.location}</div>
                  )}
                </div>
              </div>

              {/* Bio */}
              {userProfile?.bio && (
                <div style={{
                  background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                  borderRadius: 14, padding: '16px 18px',
                }}>
                  <div style={{ fontSize: 11, color: '#40405A', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Bio</div>
                  <div style={{ fontSize: 13, color: '#8080A0', lineHeight: 1.6 }}>{userProfile.bio}</div>
                </div>
              )}

              {/* Investment Preferences */}
              {(userProfile?.ticket_size || userProfile?.stage_preference) && (
                <div style={{
                  background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                  borderRadius: 14, padding: '16px 18px',
                  display: 'flex', gap: 24,
                }}>
                  {userProfile?.ticket_size && (
                    <div>
                      <div style={{ fontSize: 11, color: '#40405A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ticket Size</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: ACCENT }}>{userProfile.ticket_size}</div>
                    </div>
                  )}
                  {userProfile?.stage_preference && (
                    <div>
                      <div style={{ fontSize: 11, color: '#40405A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Stage</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#10B981' }}>{userProfile.stage_preference}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Sectors */}
              {(userProfile?.sectors?.length ?? 0) > 0 && (
                <div style={{
                  background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                  borderRadius: 14, padding: '16px 18px',
                }}>
                  <div style={{ fontSize: 11, color: '#40405A', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Investment Focus</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {userProfile!.sectors.map(s => (
                      <span key={s} style={{
                        fontSize: 11, fontWeight: 600, color: ACCENT,
                        background: ACCENT + '12', border: `0.5px solid ${ACCENT}30`,
                        borderRadius: 7, padding: '4px 10px',
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              {(userProfile?.linkedin || userProfile?.website) && (
                <div style={{
                  background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                  borderRadius: 14, padding: '16px 18px', display: 'flex', gap: 16, flexWrap: 'wrap',
                }}>
                  {userProfile.linkedin && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: '#8080A0' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      {userProfile.linkedin}
                    </div>
                  )}
                  {userProfile.website && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: '#8080A0' }}>
                      🌐 {userProfile.website}
                    </div>
                  )}
                </div>
              )}

              {/* Goals */}
              {(userProfile?.goals?.length ?? 0) > 0 && (
                <div style={{
                  background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                  borderRadius: 14, padding: '16px 18px',
                }}>
                  <div style={{ fontSize: 11, color: '#40405A', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Goals</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {userProfile!.goals.map((g, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT, marginTop: 5, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: '#8080A0' }}>{g}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SAVED */}
          {activeNav === 'saved' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {STARTUPS.map(s => (
                <div key={s.id} style={{
                  background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                  borderRadius: 14, padding: '16px 18px',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                    background: s.color + '18', border: `1px solid ${s.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 800, color: s.color,
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                  }}>{s.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F0F8', marginBottom: 4, fontFamily: "'Cabinet Grotesk', sans-serif" }}>{s.name}</div>
                    <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: '#50508A' }}>{s.sector}</span>
                      <span style={{ fontSize: 11, color: '#30305A' }}>·</span>
                      <span style={{ fontSize: 11, color: STAGE_STYLE[s.stage]?.color }}>{s.stage}</span>
                    </div>
                  </div>
                  <Sparkline data={s.commitHistory} color={s.color} />
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#10B981', background: '#10B98112', border: '0.5px solid #10B98130', borderRadius: 999, padding: '3px 10px' }}>
                    {s.aiMatch}%
                  </div>
                  <div style={{ display: 'flex', gap: 7 }}>
                    <button onClick={() => setSelectedProject(s)} style={{
                      padding: '6px 13px', borderRadius: 8,
                      background: 'transparent', border: `0.5px solid ${ACCENT}50`,
                      color: ACCENT, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif",
                    }}>View</button>
                    <button style={{
                      padding: '6px 13px', borderRadius: 8,
                      background: ACCENT, border: 'none',
                      color: '#000', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif",
                    }}>Invest</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* RIGHT RAIL */}
      <aside style={{
        width: 256, height: '100vh', background: '#0D0D15',
        borderLeft: '0.5px solid rgba(255,255,255,0.05)',
        overflowY: 'auto', padding: '20px 14px',
        display: 'flex', flexDirection: 'column', gap: 24, flexShrink: 0,
      }}>
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#C0C0D8', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ color: ACCENT }}><Icon.Sparkle /></span> AI Picks
            </span>
            <span style={{ fontSize: 11, color: ACCENT, cursor: 'pointer' }}>See all</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {STARTUPS.map(s => (
              <div key={s.id} onClick={() => setSelectedProject(s)} style={{
                display: 'flex', alignItems: 'center', gap: 9, padding: '9px 11px',
                background: '#111118', border: '0.5px solid rgba(255,255,255,0.05)',
                borderRadius: 10, cursor: 'pointer',
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: s.color + '18', border: `1px solid ${s.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontWeight: 800, color: s.color,
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                }}>{s.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#E0E0F0' }}>{s.name}</div>
                  <div style={{ fontSize: 10, color: '#50508A' }}>{s.sector}</div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#10B981' }}>{s.aiMatch}%</span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.04)' }} />

        <section>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#C0C0D8', marginBottom: 12 }}>Hot Sectors</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { name: 'AI/ML', count: 142, color: '#7C5CFC' },
              { name: 'FinTech', count: 89, color: '#10B981' },
              { name: 'EdTech', count: 67, color: '#F59E0B' },
              { name: 'Infrastructure', count: 54, color: '#3B82F6' },
              { name: 'Healthcare', count: 41, color: '#EC4899' },
            ].map((s, i) => (
              <div key={s.name} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '7px 9px', borderRadius: 8, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, color: '#30305A', width: 14, textAlign: 'center' }}>{i + 1}</span>
                  <span style={{ fontSize: 12, color: '#B0B0C8' }}>{s.name}</span>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 600, color: s.color,
                  background: s.color + '12', borderRadius: 999, padding: '2px 7px',
                }}>{s.count}</span>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  )
}

// ── STARTUP ROW CARD ──────────────────────────────────────────

function StartupRow({ startup, onView }: { startup: typeof STARTUPS[0]; onView: () => void }) {
  const stg = STAGE_STYLE[startup.stage] ?? { color: '#9090B0', bg: '#9090B015' }
  return (
    <div style={{
      background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
      borderRadius: 14, padding: '18px 20px', transition: 'border-color 0.2s',
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,158,11,0.2)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 11, flexShrink: 0,
          background: startup.color + '18', border: `1px solid ${startup.color}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 800, color: startup.color,
          fontFamily: "'Cabinet Grotesk', sans-serif",
        }}>{startup.initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
            <h3 style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: 15, fontWeight: 800, color: '#F0F0F8',
            }}>{startup.name}</h3>
            <span style={{ fontSize: 10, fontWeight: 600, color: stg.color, background: stg.bg, borderRadius: 999, padding: '2px 8px' }}>
              {startup.stage}
            </span>
            <span style={{ fontSize: 11, color: '#40405A' }}>{startup.sector}</span>
          </div>
          <p style={{ fontSize: 13, color: '#6060A0', lineHeight: 1.5, fontWeight: 300 }}>{startup.tagline}</p>
        </div>
        <Sparkline data={startup.commitHistory} color={startup.color} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        {[
          { label: 'Ask', value: startup.ask },
          { label: 'Val', value: startup.valuation },
          { label: 'Users', value: startup.traction },
          { label: 'Growth', value: startup.growth },
        ].map(m => (
          <div key={m.label} style={{
            background: '#16161F', border: '0.5px solid rgba(255,255,255,0.05)',
            borderRadius: 8, padding: '5px 10px',
          }}>
            <span style={{ fontSize: 10, color: '#40405A' }}>{m.label} </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#C0C0D8' }}>{m.value}</span>
          </div>
        ))}
        <div style={{
          background: ACCENT + '08', border: `0.5px solid ${ACCENT}20`,
          borderRadius: 8, padding: '5px 10px',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{ color: ACCENT, display: 'flex' }}><Icon.Sparkle /></span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#F5C067' }}>{startup.aiMatch}% match</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {startup.founders.map(f => (
            <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: f.color + '20', border: `1px solid ${f.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 8, fontWeight: 700, color: f.color,
              }}>{f.initials}</div>
              <span style={{ fontSize: 11, color: '#50508A' }}>{f.name}</span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 4 }}>
            <span style={{ color: '#40405A', display: 'flex' }}><Icon.Git /></span>
            <span style={{ fontSize: 11, color: '#40405A' }}>{startup.commits} commits</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 7 }}>
          <button onClick={onView} style={{
            padding: '6px 14px', borderRadius: 8,
            background: 'transparent', border: `0.5px solid ${ACCENT}40`,
            color: ACCENT, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
          }}>View Project</button>
          <button onClick={onView} style={{
            padding: '6px 14px', borderRadius: 8,
            background: ACCENT, border: 'none',
            color: '#000', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
          }}>Invest Now</button>
        </div>
      </div>
    </div>
  )
}