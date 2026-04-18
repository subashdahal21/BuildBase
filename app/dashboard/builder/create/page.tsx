'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

type Domain = 'AI/ML' | 'FinTech' | 'HealthTech' | 'EdTech' | 'SaaS' | 'Web3' | 'DevTools' | 'Consumer' | 'Infrastructure' | 'Other'
type Stage = 'Idea' | 'Building' | 'MVP' | 'Launched'
type RaiseStage = 'Pre-seed' | 'Seed' | 'Series A'

const DOMAINS: Domain[] = ['AI/ML', 'FinTech', 'HealthTech', 'EdTech', 'SaaS', 'Web3', 'DevTools', 'Consumer', 'Infrastructure', 'Other']

const STAGES: { id: Stage; label: string; emoji: string }[] = [
  { id: 'Idea',     label: 'Idea',     emoji: '💡' },
  { id: 'Building', label: 'Building', emoji: '🛠️' },
  { id: 'MVP',      label: 'MVP',      emoji: '🚀' },
  { id: 'Launched', label: 'Launched', emoji: '✅' },
]

const RAISE_STAGES: RaiseStage[] = ['Pre-seed', 'Seed', 'Series A']

const STACK_MAP: Record<Domain, string[]> = {
  'AI/ML':          ['Python', 'FastAPI', 'PyTorch', 'Pinecone', 'OpenAI', 'Docker'],
  'FinTech':        ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Plaid', 'Redis'],
  'HealthTech':     ['React', 'Node.js', 'PostgreSQL', 'FHIR API', 'AWS', 'Tailwind'],
  'EdTech':         ['Next.js', 'Supabase', 'React', 'WebRTC', 'Tailwind', 'Stripe'],
  'SaaS':           ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind', 'Vercel'],
  'Web3':           ['Solidity', 'Ethers.js', 'Next.js', 'Hardhat', 'IPFS', 'Wagmi'],
  'DevTools':       ['TypeScript', 'Node.js', 'CLI', 'GitHub API', 'Docker', 'SQLite'],
  'Consumer':       ['React Native', 'Expo', 'Supabase', 'Tailwind', 'Stripe', 'Firebase'],
  'Infrastructure': ['Go', 'Kubernetes', 'Terraform', 'AWS', 'Docker', 'Prometheus'],
  'Other':          ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind', 'Supabase', 'Vercel'],
}

function analyzeStack(domain: Domain, stage: Stage, text: string): string[] {
  const base = STACK_MAP[domain]
  const extras: string[] = []
  const t = text.toLowerCase()
  if (t.includes('real-time') || t.includes('realtime')) extras.push('WebSockets')
  if (t.includes('mobile'))    extras.push('React Native')
  if (t.includes('auth'))      extras.push('NextAuth')
  if (t.includes('payment'))   extras.push('Stripe')
  if (t.includes('search'))    extras.push('Elasticsearch')
  if (t.includes('email'))     extras.push('Resend')
  const merged = [...new Set([...base, ...extras])]
  const limit = stage === 'Idea' ? 4 : stage === 'Building' ? 5 : 6
  return merged.slice(0, limit)
}

const PURPLE = '#7C5CFC'

export default function CreateProjectPage() {
  const router = useRouter()

  const [name, setName]               = useState('')
  const [tagline, setTagline]         = useState('')
  const [description, setDescription] = useState('')
  const [domain, setDomain]           = useState<Domain>('AI/ML')
  const [stage, setStage]             = useState<Stage>('Idea')
  const [raising, setRaising]         = useState('')
  const [raiseStage, setRaiseStage]   = useState<RaiseStage>('Pre-seed')
  const [published, setPublished]     = useState(false)

  const analyzing = tagline.length + description.length > 0
  const descLimit = 500
  const disabled = !name.trim() || !tagline.trim() || !description.trim()

  const suggestedStack = useMemo(
    () => analyzeStack(domain, stage, `${name} ${tagline} ${description}`),
    [name, tagline, description, domain, stage]
  )

  const handlePublish = () => {
    if (disabled) return
    setPublished(true)
    setTimeout(() => router.push('/dashboard/builder'), 1500)
  }

  if (published) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0C0C12',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🚀</div>
          <div style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: 24, fontWeight: 800, color: '#F0F0F8', marginBottom: 8,
          }}>Project published!</div>
          <div style={{ fontSize: 14, color: '#50508A' }}>Redirecting to your dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0C0C12',
      color: '#F0F0F8', fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        .ob-input { transition: border-color 0.15s, box-shadow 0.15s; }
        .ob-input:focus { border-color: ${PURPLE}99 !important; box-shadow: 0 0 0 3px ${PURPLE}18; outline: none; }
        .chip-btn:hover { background: #1E1E2A !important; color: #D0D0E8 !important; }
        .stage-card:hover { border-color: rgba(255,255,255,0.18) !important; }
        .btn-pub:hover:not(:disabled) { filter: brightness(1.12); }
        .btn-ghost:hover { background: rgba(255,255,255,0.04) !important; color: #D0D0E8 !important; }
        .sk-shimmer {
          background: linear-gradient(90deg, #1A1A28 0%, #222230 50%, #1A1A28 100%);
          background-size: 200% 100%;
          animation: sk 1.6s infinite linear;
        }
        @keyframes sk { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#2A2A40;border-radius:99px}
        input::placeholder,textarea::placeholder{color:#30305A}
      `}</style>

      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '40px 48px',
        display: 'flex', flexDirection: 'column', gap: 28,
      }}>

        {/* Top nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => router.back()} className="btn-ghost" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '7px 12px', borderRadius: 9,
            background: 'transparent', border: 'none',
            color: '#6060A0', fontSize: 13, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            Back
          </button>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#1C1C28"/>
              <path d="M8 16 C8 11 11.5 8 16 8 C20.5 8 24 11 24 16" stroke="#7C5CFC" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M8 16 C8 21 11.5 24 16 24 C20.5 24 24 21 24 16" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round"/>
              <circle cx="16" cy="16" r="2.5" fill="#7C5CFC"/>
            </svg>
            <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 15, fontWeight: 800, color: '#F0F0F8' }}>
              Buildbase
            </span>
          </div>
        </div>

        {/* Page title */}
        <div>
          <h1 style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: 38, fontWeight: 900,
            letterSpacing: '-0.02em', color: '#F0F0F8', margin: 0, marginBottom: 6,
          }}>
            Create New Project
          </h1>
          <p style={{ fontSize: 14, color: '#50508A', margin: 0 }}>
            Describe your project and let AI analyze the stack and match collaborators
          </p>
        </div>

        {/* Two column */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

          {/* FORM */}
          <section style={{
            flex: 1, background: '#111118',
            border: '0.5px solid rgba(255,255,255,0.06)',
            borderRadius: 18, padding: 28,
            display: 'flex', flexDirection: 'column', gap: 24,
          }}>

            {/* Tagline */}
            <Field label="What are you building?">
              <input
                type="text"
                className="ob-input"
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                placeholder="Describe it in one sentence"
                style={inp()}
              />
            </Field>

            {/* Name */}
            <Field label="Project name">
              <input
                type="text"
                className="ob-input"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Give it a memorable name"
                style={inp()}
              />
            </Field>

            {/* Domain */}
            <Field label="Domain">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {DOMAINS.map(d => {
                  const active = d === domain
                  return (
                    <button key={d} onClick={() => setDomain(d)}
                      className="chip-btn"
                      style={{
                        padding: '7px 14px', borderRadius: 999,
                        background: active ? PURPLE + '18' : 'transparent',
                        border: `0.5px solid ${active ? PURPLE + '50' : 'rgba(255,255,255,0.09)'}`,
                        color: active ? PURPLE : '#7070A0',
                        fontSize: 12, fontWeight: active ? 600 : 400,
                        cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                        transition: 'all 0.15s',
                      }}
                    >{d}</button>
                  )
                })}
              </div>
            </Field>

            {/* Stage */}
            <Field label="Stage">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
                {STAGES.map(s => {
                  const active = s.id === stage
                  const stageColor = s.id === 'Idea' ? '#3B82F6' : s.id === 'Building' ? '#7C5CFC' : s.id === 'MVP' ? '#10B981' : '#F59E0B'
                  return (
                    <button key={s.id} onClick={() => setStage(s.id)}
                      className="stage-card"
                      style={{
                        position: 'relative', padding: '20px 10px 24px',
                        borderRadius: 13, background: active ? stageColor + '10' : '#16161F',
                        border: `1px solid ${active ? stageColor + '60' : 'rgba(255,255,255,0.07)'}`,
                        cursor: 'pointer', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', gap: 6,
                        fontFamily: "'DM Sans', sans-serif", transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{s.emoji}</span>
                      <span style={{ fontSize: 12, fontWeight: active ? 600 : 400, color: active ? '#F0F0F8' : '#7070A0' }}>
                        {s.label}
                      </span>
                      {active && (
                        <div style={{
                          position: 'absolute', bottom: 8, left: 16, right: 16,
                          height: 2, borderRadius: 999, background: stageColor,
                        }}/>
                      )}
                    </button>
                  )
                })}
              </div>
            </Field>

            {/* Description */}
            <Field label="Description">
              <div style={{ position: 'relative' }}>
                <textarea
                  className="ob-input"
                  value={description}
                  onChange={e => setDescription(e.target.value.slice(0, descLimit))}
                  placeholder="Tell the AI what your project does, who it's for, and what problem it solves. The more detail, the better the analysis."
                  rows={5}
                  style={{
                    ...inp(), minHeight: 120,
                    resize: 'vertical', lineHeight: 1.6,
                  }}
                />
                <div style={{
                  position: 'absolute', right: 12, bottom: 10,
                  fontSize: 11,
                  color: description.length > descLimit - 60 ? PURPLE : '#40405A',
                }}>
                  {description.length} / {descLimit}
                </div>
              </div>
            </Field>

            {/* Raising — only MVP/Launched */}
            {(stage === 'MVP' || stage === 'Launched') && (
              <Field label="Are you raising? (optional)">
                <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    className="ob-input"
                    value={raising}
                    onChange={e => setRaising(e.target.value)}
                    placeholder="e.g. $1.5M"
                    style={{ ...inp(), flex: 1, minWidth: 140 }}
                  />
                  <div style={{ display: 'flex', gap: 6 }}>
                    {RAISE_STAGES.map(rs => {
                      const active = rs === raiseStage
                      return (
                        <button key={rs} onClick={() => setRaiseStage(rs)}
                          className="chip-btn"
                          style={{
                            padding: '10px 13px', borderRadius: 9,
                            background: active ? PURPLE + '18' : 'transparent',
                            border: `0.5px solid ${active ? PURPLE + '50' : 'rgba(255,255,255,0.09)'}`,
                            color: active ? PURPLE : '#7070A0',
                            fontSize: 12, fontWeight: active ? 600 : 400,
                            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                          }}
                        >{rs}</button>
                      )
                    })}
                  </div>
                </div>
              </Field>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 9, paddingTop: 4 }}>
              <button onClick={() => router.back()} className="btn-ghost" style={{
                padding: '10px 18px', borderRadius: 9,
                background: 'transparent', border: '0.5px solid rgba(255,255,255,0.09)',
                color: '#7070A0', fontSize: 13, fontWeight: 500,
                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              }}>Cancel</button>
              <button onClick={handlePublish} disabled={disabled} className="btn-pub" style={{
                padding: '10px 22px', borderRadius: 9, border: 'none',
                background: disabled ? '#1C1C28' : PURPLE,
                color: disabled ? '#40405A' : '#fff',
                fontSize: 13, fontWeight: 700,
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontFamily: "'DM Sans', sans-serif", transition: 'filter 0.15s',
              }}>
                Publish project
              </button>
            </div>
          </section>

          {/* AI PANEL */}
          <aside style={{
            width: 320, flexShrink: 0,
            background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
            borderRadius: 18, padding: 22,
            position: 'sticky', top: 32,
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill={PURPLE}>
                  <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>
                </svg>
                <h2 style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: 16, fontWeight: 800, color: '#F0F0F8', margin: 0,
                }}>AI Stack Analysis</h2>
              </div>
              <p style={{ fontSize: 12, color: '#50508A', lineHeight: 1.5, margin: 0 }}>
                {analyzing ? 'Detected as you type...' : 'Start describing your project to see suggestions.'}
              </p>
            </div>

            {analyzing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontSize: 10, fontWeight: 600, color: PURPLE,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: '50%', background: PURPLE,
                    animation: 'pulse 1.4s infinite',
                    display: 'inline-block',
                  }}/>
                  Recommended stack
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
                  {suggestedStack.map(t => (
                    <div key={t} style={{
                      background: PURPLE + '10', border: `0.5px solid ${PURPLE}28`,
                      borderRadius: 10, padding: '10px 12px',
                      color: '#B0A0FF', fontSize: 12, fontWeight: 600,
                      textAlign: 'center',
                    }}>{t}</div>
                  ))}
                </div>

                <div style={{
                  background: '#16161F', border: '0.5px solid rgba(255,255,255,0.05)',
                  borderRadius: 11, padding: '11px 13px',
                  fontSize: 12, color: '#7070A0', lineHeight: 1.6,
                }}>
                  Based on a <span style={{ color: '#C0C0D8' }}>{stage.toLowerCase()}-stage {domain}</span> project,
                  we'll auto-match collaborators with these skills when you publish.
                </div>

                {/* Open roles preview */}
                <div>
                  <div style={{ fontSize: 10, color: '#40405A', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Suggested open roles
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {getRoles(domain).map(r => (
                      <span key={r} style={{
                        fontSize: 11, fontWeight: 600, color: '#F59E0B',
                        background: '#F59E0B10', border: '0.5px solid #F59E0B28',
                        borderRadius: 7, padding: '4px 10px',
                      }}>{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="sk-shimmer" style={{ height: 44, borderRadius: 10, opacity: 0.3 }}/>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

function getRoles(domain: Domain): string[] {
  const map: Record<Domain, string[]> = {
    'AI/ML':          ['ML Engineer', 'Backend Dev'],
    'FinTech':        ['Backend Dev', 'Frontend Dev'],
    'HealthTech':     ['Full-stack Dev', 'Designer'],
    'EdTech':         ['Frontend Dev', 'Product'],
    'SaaS':           ['Full-stack Dev', 'Designer'],
    'Web3':           ['Solidity Dev', 'Frontend Dev'],
    'DevTools':       ['Backend Dev', 'DevOps'],
    'Consumer':       ['Mobile Dev', 'Designer'],
    'Infrastructure': ['DevOps', 'Backend Dev'],
    'Other':          ['Full-stack Dev', 'Designer'],
  }
  return map[domain]
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 12, fontWeight: 500, color: '#7070A0', letterSpacing: '0.01em' }}>
        {label}
      </span>
      {children}
    </div>
  )
}

function inp(): React.CSSProperties {
  return {
    width: '100%', background: '#16161F',
    border: '0.5px solid rgba(255,255,255,0.07)',
    borderRadius: 10, padding: '11px 14px',
    color: '#F0F0F8', fontSize: 13,
    fontFamily: "'DM Sans', sans-serif", outline: 'none',
  }
}