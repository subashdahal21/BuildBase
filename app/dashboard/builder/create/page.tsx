'use client'

import { useState } from 'react'
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

const PURPLE = '#7C5CFC'

const ROLE_COLORS: Record<string, string> = {
  'frontend':   '#3B82F6',
  'backend':    '#10B981',
  'full stack': '#7C5CFC',
  'ml':         '#F59E0B',
  'data':       '#F59E0B',
  'designer':   '#EC4899',
  'devops':     '#06B6D4',
  'mobile':     '#8B5CF6',
  'product':    '#F97316',
  'solidity':   '#EAB308',
}

function roleColor(role: string): string {
  const r = (role ?? '').toLowerCase()
  for (const [key, color] of Object.entries(ROLE_COLORS)) {
    if (r.includes(key)) return color
  }
  return '#7C5CFC'
}

function initials(name: string): string {
  return name.split(' ').slice(0, 2).map(n => n[0]?.toUpperCase() ?? '').join('')
}

interface Collaborator {
  id: string
  name: string
  role: string
  skills: string[]
  interests: string[]
  score: number
  roleMatch: boolean
  matchedSkills: string[]
  avatarUrl: string | null
}

interface AIResult {
  techStack: string[]
  requiredRoles: string[]
  summary: string
  projectType: string
  collaborators: Collaborator[]
}

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

  const [aiResult, setAiResult]   = useState<AIResult | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError]     = useState<string | null>(null)
  const [analyzed, setAnalyzed]   = useState(false)

  const descLimit   = 500
  const formFilled  = name.trim().length > 0 && tagline.trim().length > 0 && description.trim().length > 20

  const handleAnalyze = async () => {
    if (!formFilled || aiLoading) return
    setAiLoading(true)
    setAiError(null)
    try {
      const res = await fetch('/api/analyze-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectText: `${name}. ${tagline}. ${description}`,
          domain,
        }),
      })
      if (!res.ok) throw new Error('failed')
      const data: AIResult = await res.json()
      setAiResult(data)
      setAnalyzed(true)
    } catch {
      setAiError('AI analysis failed. Check your connection and try again.')
    } finally {
      setAiLoading(false)
    }
  }

  const handlePublish = () => {
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

  const collaborators = aiResult?.collaborators ?? []

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
        .btn-analyze:hover:not(:disabled) { filter: brightness(1.1); }
        .btn-pub:hover:not(:disabled) { filter: brightness(1.12); }
        .btn-ghost:hover { background: rgba(255,255,255,0.04) !important; color: #D0D0E8 !important; }
        .collab-card:hover { border-color: ${PURPLE}40 !important; background: #16161F !important; }
        .sk-shimmer {
          background: linear-gradient(90deg, #1A1A28 0%, #222230 50%, #1A1A28 100%);
          background-size: 200% 100%;
          animation: sk 1.6s infinite linear;
        }
        @keyframes sk { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
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
            Fill in your project details, then let AI analyze your stack and find matching teammates
          </p>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <StepDot n={1} active label="Describe project" done={formFilled} />
          <div style={{ flex: 1, height: 1, background: analyzed ? PURPLE + '60' : 'rgba(255,255,255,0.06)' }}/>
          <StepDot n={2} active={analyzed} label="AI Analysis" done={analyzed} />
          <div style={{ flex: 1, height: 1, background: analyzed ? PURPLE + '60' : 'rgba(255,255,255,0.06)' }}/>
          <StepDot n={3} active={analyzed} label="Publish" done={false} />
        </div>

        {/* Layout */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

          {/* FORM */}
          <section style={{
            flex: 1, background: '#111118',
            border: '0.5px solid rgba(255,255,255,0.06)',
            borderRadius: 18, padding: 28,
            display: 'flex', flexDirection: 'column', gap: 24,
          }}>

            <Field label="What are you building?">
              <input type="text" className="ob-input" value={tagline}
                onChange={e => { setTagline(e.target.value); setAnalyzed(false) }}
                placeholder="Describe it in one sentence"
                style={inp()} />
            </Field>

            <Field label="Project name">
              <input type="text" className="ob-input" value={name}
                onChange={e => { setName(e.target.value); setAnalyzed(false) }}
                placeholder="Give it a memorable name"
                style={inp()} />
            </Field>

            <Field label="Domain">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {DOMAINS.map(d => {
                  const active = d === domain
                  return (
                    <button key={d} onClick={() => { setDomain(d); setAnalyzed(false) }}
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

            <Field label="Stage">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
                {STAGES.map(s => {
                  const active = s.id === stage
                  const sc = s.id === 'Idea' ? '#3B82F6' : s.id === 'Building' ? '#7C5CFC' : s.id === 'MVP' ? '#10B981' : '#F59E0B'
                  return (
                    <button key={s.id} onClick={() => { setStage(s.id); setAnalyzed(false) }}
                      className="stage-card"
                      style={{
                        position: 'relative', padding: '20px 10px 24px',
                        borderRadius: 13, background: active ? sc + '10' : '#16161F',
                        border: `1px solid ${active ? sc + '60' : 'rgba(255,255,255,0.07)'}`,
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
                        <div style={{ position: 'absolute', bottom: 8, left: 16, right: 16, height: 2, borderRadius: 999, background: sc }}/>
                      )}
                    </button>
                  )
                })}
              </div>
            </Field>

            <Field label="Description">
              <div style={{ position: 'relative' }}>
                <textarea className="ob-input" value={description}
                  onChange={e => { setDescription(e.target.value.slice(0, descLimit)); setAnalyzed(false) }}
                  placeholder="Tell the AI what your project does, who it's for, and what problem it solves. The more detail, the better the analysis."
                  rows={5}
                  style={{ ...inp(), minHeight: 120, resize: 'vertical', lineHeight: 1.6 }}
                />
                <div style={{
                  position: 'absolute', right: 12, bottom: 10, fontSize: 11,
                  color: description.length > descLimit - 60 ? PURPLE : '#40405A',
                }}>
                  {description.length} / {descLimit}
                </div>
              </div>
            </Field>

            {(stage === 'MVP' || stage === 'Launched') && (
              <Field label="Are you raising? (optional)">
                <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
                  <input type="text" className="ob-input" value={raising}
                    onChange={e => setRaising(e.target.value)}
                    placeholder="e.g. $1.5M"
                    style={{ ...inp(), flex: 1, minWidth: 140 }}
                  />
                  <div style={{ display: 'flex', gap: 6 }}>
                    {RAISE_STAGES.map(rs => {
                      const active = rs === raiseStage
                      return (
                        <button key={rs} onClick={() => setRaiseStage(rs)} className="chip-btn"
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

            {/* Action buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 9, paddingTop: 4 }}>
              <button onClick={() => router.back()} className="btn-ghost" style={{
                padding: '10px 18px', borderRadius: 9,
                background: 'transparent', border: '0.5px solid rgba(255,255,255,0.09)',
                color: '#7070A0', fontSize: 13, fontWeight: 500,
                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              }}>Cancel</button>

              {/* Show Analyze button if not yet analyzed */}
              {!analyzed && (
                <button onClick={handleAnalyze} disabled={!formFilled || aiLoading}
                  className="btn-analyze"
                  style={{
                    padding: '10px 22px', borderRadius: 9, border: 'none',
                    background: !formFilled ? '#1C1C28' : 'linear-gradient(135deg, #7C5CFC, #5B3FD4)',
                    color: !formFilled ? '#40405A' : '#fff',
                    fontSize: 13, fontWeight: 700,
                    cursor: !formFilled ? 'not-allowed' : aiLoading ? 'wait' : 'pointer',
                    fontFamily: "'DM Sans', sans-serif",
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    transition: 'filter 0.15s',
                    boxShadow: formFilled ? '0 4px 20px #7C5CFC30' : 'none',
                  }}>
                  {aiLoading ? (
                    <>
                      <span style={{
                        width: 13, height: 13, borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: '#fff',
                        display: 'inline-block',
                        animation: 'spin 0.7s linear infinite',
                      }}/>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>
                      </svg>
                      Analyze with AI
                    </>
                  )}
                </button>
              )}

              {/* Show Publish button only after analysis */}
              {analyzed && (
                <button onClick={handlePublish} className="btn-pub" style={{
                  padding: '10px 22px', borderRadius: 9, border: 'none',
                  background: PURPLE,
                  color: '#fff',
                  fontSize: 13, fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'filter 0.15s',
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/>
                  </svg>
                  Publish project
                </button>
              )}
            </div>

            {aiError && (
              <div style={{
                padding: '10px 14px', borderRadius: 10,
                background: '#FF4D4D10', border: '0.5px solid #FF4D4D30',
                fontSize: 12, color: '#FF8080',
              }}>{aiError}</div>
            )}
          </section>

          {/* RIGHT PANEL */}
          <aside style={{
            width: 350, flexShrink: 0,
            position: 'sticky', top: 32,
            display: 'flex', flexDirection: 'column', gap: 14,
            maxHeight: 'calc(100vh - 64px)', overflowY: 'auto',
          }}>

            {/* Empty state before analysis */}
            {!analyzed && !aiLoading && (
              <div style={{
                background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                borderRadius: 18, padding: 32,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 14, textAlign: 'center',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: PURPLE + '14', border: `1.5px solid ${PURPLE}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill={PURPLE}>
                    <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>
                  </svg>
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontSize: 15, fontWeight: 800, color: '#F0F0F8', marginBottom: 6,
                  }}>AI Analysis</div>
                  <div style={{ fontSize: 12, color: '#50508A', lineHeight: 1.6 }}>
                    Fill in your project details and click{' '}
                    <span style={{ color: PURPLE, fontWeight: 600 }}>Analyze with AI</span>{' '}
                    to see the recommended tech stack and matched teammates.
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                  {['Tech stack recommendations', 'Required roles & skills', 'Matched teammates'].map(item => (
                    <div key={item} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '9px 12px', borderRadius: 10,
                      background: '#16161F', border: '0.5px solid rgba(255,255,255,0.05)',
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: PURPLE + '60', flexShrink: 0 }}/>
                      <span style={{ fontSize: 12, color: '#50508A' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loading shimmer */}
            {aiLoading && (
              <div style={{
                background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                borderRadius: 18, padding: 22,
                display: 'flex', flexDirection: 'column', gap: 14,
                animation: 'fadeIn 0.3s ease',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: '50%', background: PURPLE,
                    animation: 'pulse 1.4s infinite', display: 'inline-block',
                  }}/>
                  <span style={{ fontSize: 13, color: PURPLE, fontWeight: 600 }}>Analyzing your project...</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="sk-shimmer" style={{ height: 40, borderRadius: 10 }}/>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="sk-shimmer" style={{ height: 68, borderRadius: 12 }}/>
                  ))}
                </div>
              </div>
            )}

            {/* Results after analysis */}
            {analyzed && aiResult && !aiLoading && (
              <>
                {/* Stack card */}
                <div style={{
                  background: '#111118', border: `0.5px solid ${PURPLE}25`,
                  borderRadius: 18, padding: 22,
                  display: 'flex', flexDirection: 'column', gap: 14,
                  animation: 'fadeIn 0.4s ease',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={PURPLE}>
                      <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>
                    </svg>
                    <span style={{
                      fontFamily: "'Cabinet Grotesk', sans-serif",
                      fontSize: 15, fontWeight: 800, color: '#F0F0F8',
                    }}>Tech Stack</span>
                  </div>

                  {aiResult.summary && (
                    <p style={{
                      fontSize: 12, color: '#7070A0', lineHeight: 1.6,
                      margin: 0, padding: '10px 12px',
                      background: '#16161F', borderRadius: 10,
                      border: '0.5px solid rgba(255,255,255,0.05)',
                    }}>
                      {aiResult.summary}
                    </p>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
                    {aiResult.techStack.map(t => (
                      <div key={t} style={{
                        background: PURPLE + '10', border: `0.5px solid ${PURPLE}28`,
                        borderRadius: 10, padding: '10px 12px',
                        color: '#B0A0FF', fontSize: 12, fontWeight: 600,
                        textAlign: 'center',
                      }}>{t}</div>
                    ))}
                  </div>

                  {aiResult.requiredRoles.length > 0 && (
                    <div>
                      <div style={{ fontSize: 10, color: '#40405A', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Roles needed
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {aiResult.requiredRoles.map(r => (
                          <span key={r} style={{
                            fontSize: 11, fontWeight: 600, color: '#F59E0B',
                            background: '#F59E0B10', border: '0.5px solid #F59E0B28',
                            borderRadius: 7, padding: '4px 10px',
                          }}>{r}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Collaborators card */}
                <div style={{
                  background: '#111118', border: '0.5px solid rgba(255,255,255,0.06)',
                  borderRadius: 18, padding: 22,
                  display: 'flex', flexDirection: 'column', gap: 12,
                  animation: 'fadeIn 0.5s ease',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      <span style={{
                        fontFamily: "'Cabinet Grotesk', sans-serif",
                        fontSize: 15, fontWeight: 800, color: '#F0F0F8',
                      }}>Matched People</span>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 700,
                      color: collaborators.length > 0 ? '#10B981' : '#50508A',
                      background: collaborators.length > 0 ? '#10B98118' : '#1A1A28',
                      border: `0.5px solid ${collaborators.length > 0 ? '#10B98130' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: 999, padding: '3px 9px',
                    }}>
                      {collaborators.length} found
                    </span>
                  </div>

                  {collaborators.length === 0 ? (
                    <div style={{
                      padding: '20px 14px', textAlign: 'center',
                      fontSize: 12, color: '#50508A', lineHeight: 1.6,
                    }}>
                      No matching users found in the database yet. Invite your team after publishing!
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {collaborators.map((c, idx) => {
                        const color = roleColor(c.role)
                        const scorePercent = c.score
                        return (
                          <div key={c.id} className="collab-card" style={{
                            background: '#14141C', border: '0.5px solid rgba(255,255,255,0.06)',
                            borderRadius: 12, padding: '12px 14px',
                            display: 'flex', flexDirection: 'column', gap: 8,
                            cursor: 'pointer', transition: 'all 0.15s',
                            animation: `fadeIn 0.3s ease ${idx * 0.06}s both`,
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              {/* Avatar */}
                              <div style={{
                                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                                background: color + '20', border: `1.5px solid ${color}50`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color }}>{initials(c.name)}</span>
                              </div>
                              {/* Name & role */}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#F0F0F8', lineHeight: 1.2 }}>{c.name}</div>
                                <div style={{ fontSize: 11, color, fontWeight: 500, marginTop: 2 }}>{c.role}</div>
                              </div>
                              {/* Score badge */}
                              <div style={{
                                flexShrink: 0, textAlign: 'center',
                                background: '#1A1A28', borderRadius: 8, padding: '4px 8px',
                              }}>
                                <div style={{ fontSize: 13, fontWeight: 800, color: '#F0F0F8' }}>{scorePercent}</div>
                                <div style={{ fontSize: 9, color: '#40405A', letterSpacing: '0.04em' }}>SCORE</div>
                              </div>
                            </div>

                            {/* Skills */}
                            {(c.matchedSkills.length > 0 || c.skills.length > 0) && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                {c.matchedSkills.slice(0, 3).map(s => (
                                  <span key={s} style={{
                                    fontSize: 10, fontWeight: 600, color: '#10B981',
                                    background: '#10B98112', border: '0.5px solid #10B98128',
                                    borderRadius: 5, padding: '2px 7px',
                                  }}>{s}</span>
                                ))}
                                {c.skills.filter(s => !c.matchedSkills.map(x => x.toLowerCase()).includes(s.toLowerCase())).slice(0, 2).map(s => (
                                  <span key={s} style={{
                                    fontSize: 10, fontWeight: 500, color: '#50508A',
                                    background: '#1A1A28', border: '0.5px solid rgba(255,255,255,0.06)',
                                    borderRadius: 5, padding: '2px 7px',
                                  }}>{s}</span>
                                ))}
                              </div>
                            )}

                            {/* Tags */}
                            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                              {c.roleMatch && (
                                <span style={{
                                  fontSize: 9, fontWeight: 700, letterSpacing: '0.04em',
                                  color: PURPLE, background: PURPLE + '12',
                                  border: `0.5px solid ${PURPLE}25`,
                                  borderRadius: 4, padding: '2px 6px', textTransform: 'uppercase',
                                }}>Role match</span>
                              )}
                              {c.matchedSkills.length > 0 && (
                                <span style={{
                                  fontSize: 9, fontWeight: 700, letterSpacing: '0.04em',
                                  color: '#10B981', background: '#10B98112',
                                  border: '0.5px solid #10B98125',
                                  borderRadius: 4, padding: '2px 6px', textTransform: 'uppercase',
                                }}>{c.matchedSkills.length} skill match{c.matchedSkills.length > 1 ? 'es' : ''}</span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

function StepDot({ n, active, label, done }: { n: number; active: boolean; label: string; done: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flexShrink: 0 }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: done ? PURPLE : active ? PURPLE + '20' : '#16161F',
        border: `1.5px solid ${done ? PURPLE : active ? PURPLE + '50' : 'rgba(255,255,255,0.08)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s',
      }}>
        {done ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        ) : (
          <span style={{ fontSize: 11, fontWeight: 700, color: active ? PURPLE : '#40405A' }}>{n}</span>
        )}
      </div>
      <span style={{ fontSize: 10, color: active || done ? '#C0C0D8' : '#40405A', fontWeight: 500, whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 12, fontWeight: 500, color: '#7070A0', letterSpacing: '0.01em' }}>{label}</span>
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
