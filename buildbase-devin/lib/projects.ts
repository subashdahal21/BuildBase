'use client'

export type Stage = 'Idea' | 'Building' | 'MVP' | 'Launched'

export const DOMAINS = [
  'AI/ML',
  'FinTech',
  'HealthTech',
  'EdTech',
  'SaaS',
  'Web3',
  'DevTools',
  'Consumer',
] as const

export type Domain = (typeof DOMAINS)[number]

export interface Project {
  id: number | string
  name: string
  desc: string
  domain?: Domain | string
  stage: Stage
  techStack: string[]
  author: { initials: string; name: string; color: string; role?: 'Builder' | 'Investor' }
  commits: number
  aiSuggested?: boolean
  /** investor-facing */
  raising?: string
  raiseStage?: 'Pre-seed' | 'Seed' | 'Series A'
  traction?: string
}

export interface CollabRequest {
  id: number | string
  project: string
  initials: string
  color: string
  role: string
  skills: string[]
  matched: boolean
  applicants: number
}

export interface InvestorDeal {
  id: number | string
  project: string
  initials: string
  color: string
  tagline: string
  domain: Domain | string
  stage: Stage
  raising: string
  raiseStage: 'Pre-seed' | 'Seed' | 'Series A'
  tractionNote: string
  traction: string[]
  founder: { name: string; headline: string }
  matched: boolean
  interested: number
}

export const STAGE_STYLES: Record<Stage, { color: string; bg: string; emoji: string }> = {
  Idea: { color: '#3B82F6', bg: '#3B82F615', emoji: '💡' },
  Building: { color: '#7C5CFC', bg: '#7C5CFC15', emoji: '🛠️' },
  MVP: { color: '#10B981', bg: '#10B98115', emoji: '🚀' },
  Launched: { color: '#F59E0B', bg: '#F59E0B15', emoji: '✅' },
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'NeuralSearch',
    desc: 'AI-powered semantic search engine for codebases using vector embeddings and LLM re-ranking.',
    domain: 'AI/ML',
    stage: 'Building',
    techStack: ['TypeScript', 'Python', 'Pinecone', 'OpenAI'],
    author: { initials: 'AK', name: 'Alex Kim', color: '#7C5CFC', role: 'Builder' },
    commits: 142,
    aiSuggested: true,
    raising: '$750K',
    raiseStage: 'Pre-seed',
    traction: '12 design-partner teams onboarded',
  },
  {
    id: 2,
    name: 'FinFlow',
    desc: 'Open-source personal finance tracker with real-time team budgeting and bank sync.',
    domain: 'FinTech',
    stage: 'MVP',
    techStack: ['Next.js', 'Supabase', 'Stripe', 'Tailwind'],
    author: { initials: 'PR', name: 'Priya R.', color: '#10B981', role: 'Builder' },
    commits: 89,
    aiSuggested: true,
    raising: '$1.5M',
    raiseStage: 'Seed',
    traction: '8k MAUs, 22% MoM growth',
  },
  {
    id: 3,
    name: 'DevMentor',
    desc: 'Peer-to-peer mentorship platform connecting early-career developers with senior engineers.',
    domain: 'EdTech',
    stage: 'Idea',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    author: { initials: 'JL', name: 'James L.', color: '#F59E0B', role: 'Builder' },
    commits: 23,
    aiSuggested: false,
    traction: '400-person waitlist',
  },
  {
    id: 4,
    name: 'MeshPay',
    desc: 'Offline-first stablecoin wallet purpose-built for bandwidth-constrained markets.',
    domain: 'Web3',
    stage: 'MVP',
    techStack: ['Rust', 'Solana', 'React Native'],
    author: { initials: 'DM', name: 'Dev M.', color: '#EC4899', role: 'Builder' },
    commits: 276,
    aiSuggested: true,
    raising: '$3M',
    raiseStage: 'Seed',
    traction: '48k installs across Southeast Asia',
  },
  {
    id: 5,
    name: 'VitalScan',
    desc: 'Clinician-grade vitals from a smartphone camera for rural primary-care clinics.',
    domain: 'HealthTech',
    stage: 'Building',
    techStack: ['Swift', 'Kotlin', 'TensorFlow', 'FastAPI'],
    author: { initials: 'SN', name: 'Sana N.', color: '#3B82F6', role: 'Builder' },
    commits: 61,
    aiSuggested: true,
    raising: '$2M',
    raiseStage: 'Seed',
    traction: 'FDA Class II filing in progress',
  },
  {
    id: 6,
    name: 'LoomLabs',
    desc: 'CI-native design-system workbench so teams ship UI without drift.',
    domain: 'DevTools',
    stage: 'Launched',
    techStack: ['TypeScript', 'Storybook', 'Playwright'],
    author: { initials: 'TC', name: 'Tom C.', color: '#F59E0B', role: 'Builder' },
    commits: 912,
    aiSuggested: false,
    raising: '$6M',
    raiseStage: 'Series A',
    traction: '$420k ARR, 14 paid teams',
  },
]

export const COLLAB_REQUESTS: CollabRequest[] = [
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
  {
    id: 4,
    project: 'VitalScan',
    initials: 'VS',
    color: '#3B82F6',
    role: 'Mobile Engineer Needed',
    skills: ['Swift', 'Kotlin', 'CoreML'],
    matched: true,
    applicants: 3,
  },
]

export const INVESTOR_DEALS: InvestorDeal[] = [
  {
    id: 1,
    project: 'NeuralSearch',
    initials: 'NS',
    color: '#7C5CFC',
    tagline: 'Semantic search over private codebases with auditable LLM reasoning.',
    domain: 'AI/ML',
    stage: 'Building',
    raising: '$750K',
    raiseStage: 'Pre-seed',
    tractionNote: '12 design-partner teams · 142 commits/mo',
    traction: ['12 design-partners', '142 weekly commits', 'ex-GitHub team'],
    founder: { name: 'Alex Kim', headline: 'ex-GitHub · Stanford CS' },
    matched: true,
    interested: 9,
  },
  {
    id: 2,
    project: 'FinFlow',
    initials: 'FF',
    color: '#10B981',
    tagline: 'Consumer finance OS for teams and households — open-source core.',
    domain: 'FinTech',
    stage: 'MVP',
    raising: '$1.5M',
    raiseStage: 'Seed',
    tractionNote: '8k MAUs · 22% MoM growth',
    traction: ['8k MAUs', '22% MoM', '$12k MRR'],
    founder: { name: 'Priya R.', headline: 'ex-Plaid · Brown CS' },
    matched: true,
    interested: 21,
  },
  {
    id: 3,
    project: 'MeshPay',
    initials: 'MP',
    color: '#EC4899',
    tagline: 'Offline-first stablecoin rails for emerging-market merchants.',
    domain: 'Web3',
    stage: 'MVP',
    raising: '$3M',
    raiseStage: 'Seed',
    tractionNote: '48k installs · 6 partner banks in SEA',
    traction: ['48k installs', '6 banks', '$180k TPV/mo'],
    founder: { name: 'Dev M.', headline: 'ex-Stripe · IIT Bombay' },
    matched: false,
    interested: 15,
  },
  {
    id: 4,
    project: 'LoomLabs',
    initials: 'LL',
    color: '#F59E0B',
    tagline: 'CI-native design-system workbench for high-velocity product teams.',
    domain: 'DevTools',
    stage: 'Launched',
    raising: '$6M',
    raiseStage: 'Series A',
    tractionNote: '$420k ARR · 14 paid teams · 112% NRR',
    traction: ['$420k ARR', '112% NRR', '14 paying teams'],
    founder: { name: 'Tom C.', headline: 'ex-Vercel · Berkeley' },
    matched: true,
    interested: 34,
  },
]

export const SUGGESTED_COLLABORATORS = [
  { initials: 'SR', name: 'Sara R.', role: 'ML Engineer', color: '#7C5CFC', match: 94 },
  { initials: 'TC', name: 'Tom C.', role: 'DevOps · AWS', color: '#10B981', match: 88 },
  { initials: 'MP', name: 'Maya P.', role: 'Product Designer', color: '#F59E0B', match: 76 },
]

export const SUGGESTED_FOUNDERS = [
  { initials: 'AK', name: 'Alex Kim', role: 'Founder · AI/ML', color: '#7C5CFC', match: 96 },
  { initials: 'PR', name: 'Priya R.', role: 'Founder · FinTech', color: '#10B981', match: 91 },
  { initials: 'DM', name: 'Dev M.', role: 'Founder · Web3', color: '#EC4899', match: 82 },
]

export const TRENDING_PROJECTS = [
  { name: 'OpenChain', tag: 'Web3', color: '#7C5CFC' },
  { name: 'HealthAI', tag: 'Healthcare', color: '#10B981' },
  { name: 'EduTrack', tag: 'EdTech', color: '#F59E0B' },
  { name: 'CloudHive', tag: 'Infrastructure', color: '#3B82F6' },
  { name: 'PixelForge', tag: 'Design Tools', color: '#EC4899' },
]

export const TRENDING_SECTORS = [
  { name: 'Vertical AI', tag: 'AI/ML', color: '#7C5CFC' },
  { name: 'Dev infra', tag: 'DevTools', color: '#10B981' },
  { name: 'Stablecoin rails', tag: 'FinTech', color: '#F59E0B' },
  { name: 'Clinical copilots', tag: 'HealthTech', color: '#3B82F6' },
  { name: 'Agentic SaaS', tag: 'SaaS', color: '#EC4899' },
]

/* ── Local user-created projects ──────────────────────────── */

const CREATED_KEY = 'buildbase.created'

export interface CreatedProject {
  id: string
  name: string
  tagline: string
  description: string
  domain: Domain | string
  stage: Stage
  techStack: string[]
  /** investor-side fields */
  raising?: string
  raiseStage?: 'Pre-seed' | 'Seed' | 'Series A'
  createdAt: number
  ownerEmail: string
  ownerName: string
  ownerRole: 'builder' | 'investor'
}

function safeStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function getCreatedProjects(): CreatedProject[] {
  const s = safeStorage()
  if (!s) return []
  const raw = s.getItem(CREATED_KEY)
  if (!raw) return []
  try {
    const arr = JSON.parse(raw) as CreatedProject[]
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

export function addCreatedProject(p: CreatedProject) {
  const s = safeStorage()
  if (!s) return
  const existing = getCreatedProjects()
  s.setItem(CREATED_KEY, JSON.stringify([p, ...existing]))
}

/** Rough heuristic used by /create to mimic the "AI Stack Analysis" side panel. */
export function analyzeStack(input: {
  name: string
  tagline: string
  description: string
  domain: string
  stage: Stage
}): string[] {
  const text =
    `${input.name} ${input.tagline} ${input.description} ${input.domain} ${input.stage}`.toLowerCase()
  const matches = new Set<string>()

  const rules: Array<{ keys: string[]; tech: string[] }> = [
    { keys: ['ai', 'ml', 'llm', 'rag', 'embed', 'vector', 'agent', 'gpt'], tech: ['Python', 'OpenAI', 'Pinecone', 'LangChain'] },
    { keys: ['finance', 'fintech', 'bank', 'payment', 'stripe', 'ledger'], tech: ['Stripe', 'Plaid', 'PostgreSQL'] },
    { keys: ['health', 'clinic', 'patient', 'medical', 'fda'], tech: ['FastAPI', 'FHIR', 'PostgreSQL'] },
    { keys: ['edu', 'learn', 'school', 'mentor', 'course'], tech: ['Next.js', 'Supabase', 'Tailwind'] },
    { keys: ['web3', 'chain', 'crypto', 'token', 'wallet', 'solana', 'evm'], tech: ['Rust', 'Solana', 'Ethers.js'] },
    { keys: ['mobile', 'ios', 'android', 'rn'], tech: ['React Native', 'Swift', 'Kotlin'] },
    { keys: ['realtime', 'chat', 'presence', 'collab'], tech: ['WebSockets', 'Supabase Realtime'] },
    { keys: ['search', 'index', 'retriev'], tech: ['Elasticsearch', 'Pinecone'] },
    { keys: ['design', 'figma', 'component', 'storybook'], tech: ['Storybook', 'Playwright', 'TypeScript'] },
    { keys: ['dev', 'tool', 'ci', 'pipeline', 'infra'], tech: ['TypeScript', 'Docker', 'GitHub Actions'] },
    { keys: ['saas', 'b2b', 'dashboard', 'admin'], tech: ['Next.js', 'tRPC', 'Prisma', 'PostgreSQL'] },
    { keys: ['consumer', 'social', 'feed'], tech: ['Next.js', 'Supabase', 'Redis'] },
  ]

  for (const r of rules) {
    if (r.keys.some(k => text.includes(k))) r.tech.forEach(t => matches.add(t))
  }

  // Default stack if nothing matched yet
  if (matches.size === 0) {
    ['Next.js', 'TypeScript', 'Supabase', 'Tailwind'].forEach(t => matches.add(t))
  }

  // Stage-based additions
  if (input.stage === 'MVP' || input.stage === 'Launched') {
    matches.add('Vercel')
  }
  if (input.stage === 'Launched') {
    matches.add('PostgreSQL')
  }

  return Array.from(matches).slice(0, 8)
}
