'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getProfile, getSession, Profile } from '@/lib/session'
import {
  DOMAINS,
  Domain,
  Stage,
  addCreatedProject,
  analyzeStack,
} from '@/lib/projects'

const STAGES: { id: Stage; label: string; emoji: string; color: string }[] = [
  { id: 'Idea', label: 'Idea', emoji: '💡', color: '#3B82F6' },
  { id: 'Building', label: 'Building', emoji: '🛠️', color: '#7C5CFC' },
  { id: 'MVP', label: 'MVP', emoji: '🚀', color: '#10B981' },
  { id: 'Launched', label: 'Launched', emoji: '✅', color: '#F59E0B' },
]

const RAISE_STAGES: Array<'Pre-seed' | 'Seed' | 'Series A'> = [
  'Pre-seed',
  'Seed',
  'Series A',
]

export default function CreatePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)

  const [name, setName] = useState('')
  const [tagline, setTagline] = useState('')
  const [description, setDescription] = useState('')
  const [domain, setDomain] = useState<Domain>('AI/ML')
  const [stage, setStage] = useState<Stage>('Idea')
  const [raising, setRaising] = useState('')
  const [raiseStage, setRaiseStage] = useState<'Pre-seed' | 'Seed' | 'Series A'>(
    'Pre-seed'
  )

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
    setProfile(p)
  }, [router])

  const accent = profile?.role === 'investor' ? '#F59E0B' : '#7C5CFC'
  const isInvestor = profile?.role === 'investor'

  const suggestedStack = useMemo(
    () => analyzeStack({ name, tagline, description, domain, stage }),
    [name, tagline, description, domain, stage]
  )

  const analyzing = tagline.length + description.length > 0
  const descLimit = 500
  const charCount = description.length

  const disabled = !name.trim() || !tagline.trim() || !description.trim()

  const handlePublish = () => {
    if (!profile) return
    if (disabled) return
    addCreatedProject({
      id: `cp-${Date.now()}`,
      name: name.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      domain,
      stage,
      techStack: suggestedStack,
      raising: isInvestor || raising ? raising || undefined : undefined,
      raiseStage: isInvestor || raising ? raiseStage : undefined,
      createdAt: Date.now(),
      ownerEmail: profile.email,
      ownerName: profile.name,
      ownerRole: profile.role,
    })
    router.push(profile.role === 'investor' ? '/dashboard/investor' : '/dashboard/builder')
  }

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

  const title = isInvestor ? 'Create New Proposal' : 'Create New Project'
  const label1 = isInvestor ? 'What are you looking to back?' : 'What are you building?'
  const placeholder1 = isInvestor
    ? 'Describe the type of project in one sentence'
    : 'Describe it in one sentence'
  const descHelper = isInvestor
    ? 'Tell founders what kind of companies you back, your check size, value-add, and the problems you want solved. The more detail, the better the matches.'
    : "Tell the AI what your project does, who it's for, and what problem it solves. The more detail, the better the analysis."

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0C0C12',
        color: '#F0F0F8',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        .ob-input { transition: border-color 0.15s, box-shadow 0.15s; }
        .ob-input:focus { border-color: ${accent}99 !important; box-shadow: 0 0 0 3px ${accent}18; outline: none; }
        .chip:hover { background: #1E1E2A !important; color: #D0D0E8 !important; }
        .chip-active { background: ${accent}20 !important; border-color: ${accent}60 !important; color: ${accent} !important; }
        .stage-card:hover { border-color: rgba(255,255,255,0.18) !important; }
        .stage-active { border-color: ${accent} !important; background: ${accent}10 !important; }
        .stage-active::after {
          content: '';
          position: absolute; left: 16px; right: 16px; bottom: 10px;
          height: 3px; border-radius: 999px; background: ${accent};
        }
        .btn-fill:hover:not(:disabled) { filter: brightness(1.12); }
        .btn-ghost:hover { background: rgba(255,255,255,0.04); color: #D0D0E8; }
        .sk-shimmer {
          background: linear-gradient(90deg, #1E1B33 0%, #26223F 50%, #1E1B33 100%);
          background-size: 200% 100%;
          animation: shimmer 1.6s infinite linear;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2C2C48; border-radius: 99px; }
      `}</style>

      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '48px 56px',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}
      >
        {/* Back link */}
        <button
          onClick={() => router.back()}
          className="btn-ghost"
          style={{
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 10px',
            borderRadius: 8,
            background: 'transparent',
            border: 'none',
            color: '#7070A0',
            fontSize: 13,
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </button>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: 44,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#F0F0F8',
            margin: 0,
          }}
        >
          {title}
        </h1>

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
          {/* FORM */}
          <section
            style={{
              flex: 1,
              background: '#121220',
              border: '0.5px solid rgba(255,255,255,0.07)',
              borderRadius: 20,
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
            }}
          >
            {/* What are you building? */}
            <Field label={label1}>
              <input
                type="text"
                className="ob-input"
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                placeholder={placeholder1}
                style={inputStyle()}
              />
            </Field>

            {/* Project name */}
            <Field label="Project name">
              <input
                type="text"
                className="ob-input"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Give it a memorable name"
                style={inputStyle()}
              />
            </Field>

            {/* Domain */}
            <Field label="Domain">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {DOMAINS.map(d => {
                  const active = d === domain
                  return (
                    <button
                      key={d}
                      onClick={() => setDomain(d)}
                      className={`chip ${active ? 'chip-active' : ''}`}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 999,
                        background: 'transparent',
                        border: `0.5px solid ${active ? accent + '60' : 'rgba(255,255,255,0.1)'}`,
                        color: active ? accent : '#9090B0',
                        fontSize: 13,
                        fontWeight: active ? 600 : 500,
                        cursor: 'pointer',
                        fontFamily: "'DM Sans', sans-serif",
                        transition: 'all 0.15s',
                      }}
                    >
                      {d}
                    </button>
                  )
                })}
              </div>
            </Field>

            {/* Stage */}
            <Field label="Stage">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 12,
                }}
              >
                {STAGES.map(s => {
                  const active = s.id === stage
                  return (
                    <button
                      key={s.id}
                      onClick={() => setStage(s.id)}
                      className={`stage-card ${active ? 'stage-active' : ''}`}
                      style={{
                        position: 'relative',
                        padding: '22px 10px 28px',
                        borderRadius: 14,
                        background: '#171720',
                        border: `1.5px solid rgba(255,255,255,0.07)`,
                        color: active ? '#F0F0F8' : '#C0C0D8',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 6,
                        fontFamily: "'DM Sans', sans-serif",
                        transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ fontSize: 22 }}>{s.emoji}</span>
                      <span style={{ fontSize: 13, fontWeight: active ? 600 : 500 }}>
                        {s.label}
                      </span>
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
                  onChange={e =>
                    setDescription(e.target.value.slice(0, descLimit))
                  }
                  placeholder={descHelper}
                  rows={6}
                  style={{
                    ...inputStyle(),
                    minHeight: 140,
                    resize: 'vertical',
                    lineHeight: 1.6,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    right: 14,
                    bottom: 10,
                    fontSize: 11,
                    color: charCount > descLimit - 60 ? accent : '#50508A',
                  }}
                >
                  {charCount} / {descLimit}
                </div>
              </div>
            </Field>

            {/* Optional: raising (only when stage >= MVP or user wants) */}
            {(stage === 'MVP' || stage === 'Launched' || isInvestor) && (
              <Field
                label={
                  isInvestor
                    ? 'Ticket size (per check)'
                    : 'Are you raising? (optional)'
                }
              >
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    className="ob-input"
                    value={raising}
                    onChange={e => setRaising(e.target.value)}
                    placeholder={isInvestor ? '$50K – $250K' : 'e.g. $1.5M'}
                    style={{ ...inputStyle(), flex: 1, minWidth: 160 }}
                  />
                  <div style={{ display: 'flex', gap: 6 }}>
                    {RAISE_STAGES.map(rs => {
                      const active = rs === raiseStage
                      return (
                        <button
                          key={rs}
                          onClick={() => setRaiseStage(rs)}
                          className={`chip ${active ? 'chip-active' : ''}`}
                          style={{
                            padding: '10px 14px',
                            borderRadius: 10,
                            background: 'transparent',
                            border: `0.5px solid ${active ? accent + '60' : 'rgba(255,255,255,0.1)'}`,
                            color: active ? accent : '#9090B0',
                            fontSize: 13,
                            fontWeight: active ? 600 : 500,
                            cursor: 'pointer',
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {rs}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </Field>
            )}

            {/* Actions */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 10,
                paddingTop: 8,
              }}
            >
              <button
                onClick={() => router.push(profile.role === 'investor' ? '/dashboard/investor' : '/dashboard/builder')}
                className="btn-ghost"
                style={{
                  padding: '11px 18px',
                  borderRadius: 10,
                  background: 'transparent',
                  border: '0.5px solid rgba(255,255,255,0.1)',
                  color: '#C0C0D8',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                disabled={disabled}
                className="btn-fill"
                style={{
                  padding: '11px 22px',
                  borderRadius: 10,
                  background: accent,
                  border: 'none',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  opacity: disabled ? 0.5 : 1,
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'filter 0.15s',
                }}
              >
                {isInvestor ? 'Publish proposal' : 'Publish project'}
              </button>
            </div>
          </section>

          {/* AI STACK ANALYSIS */}
          <aside
            style={{
              width: 340,
              flexShrink: 0,
              background: '#121220',
              border: '0.5px solid rgba(255,255,255,0.07)',
              borderRadius: 20,
              padding: 24,
              position: 'sticky',
              top: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  margin: 0,
                  color: '#F0F0F8',
                }}
              >
                {isInvestor ? 'AI Thesis Match' : 'AI Stack Analysis'}
              </h2>
              <p
                style={{
                  marginTop: 6,
                  fontSize: 12,
                  color: '#7070A0',
                  lineHeight: 1.5,
                }}
              >
                {analyzing
                  ? isInvestor
                    ? 'Matching you to live founders in this sector…'
                    : 'Detected as you type…'
                  : isInvestor
                  ? 'Describe your thesis to see founder matches.'
                  : 'Start describing your project to see suggestions.'}
              </p>
            </div>

            {/* Sparkline / suggestions */}
            {analyzing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 11,
                    fontWeight: 600,
                    color: accent,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: accent,
                      animation: 'shimmer 1.4s infinite',
                    }}
                  />
                  {isInvestor ? 'Likely matches' : 'Recommended stack'}
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 8,
                  }}
                >
                  {suggestedStack.map(t => (
                    <div
                      key={t}
                      style={{
                        background: accent + '12',
                        border: `0.5px solid ${accent}30`,
                        borderRadius: 12,
                        padding: '12px 14px',
                        color: accent,
                        fontSize: 12,
                        fontWeight: 600,
                        textAlign: 'center',
                      }}
                    >
                      {t}
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: 8,
                    padding: '12px 14px',
                    background: '#171720',
                    border: '0.5px solid rgba(255,255,255,0.06)',
                    borderRadius: 12,
                    fontSize: 12,
                    color: '#9090B0',
                    lineHeight: 1.6,
                  }}
                >
                  {isInvestor
                    ? `We'll highlight founders building in ${domain} at ${stage} stage the moment they post.`
                    : `Based on a ${stage.toLowerCase()}-stage ${domain} project, we'd scaffold the stack above and auto-match collaborators with these skills.`}
                </div>
              </div>
            ) : (
              // Skeleton placeholders
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 8,
                }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="sk-shimmer"
                    style={{
                      height: 46,
                      borderRadius: 12,
                      opacity: 0.35,
                    }}
                  />
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: '#9090B0',
          letterSpacing: '0.01em',
        }}
      >
        {label}
      </span>
      {children}
    </div>
  )
}

function inputStyle(): React.CSSProperties {
  return {
    width: '100%',
    background: '#171720',
    border: '0.5px solid rgba(255,255,255,0.07)',
    borderRadius: 12,
    padding: '14px 16px',
    color: '#F0F0F8',
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
  }
}