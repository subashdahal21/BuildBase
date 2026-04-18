'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  BuilderProfile,
  InvestorProfile,
  Profile,
  Role,
  getSession,
  setProfile,
} from '@/lib/session'

const BUILDER_SKILL_OPTIONS = [
  'React',
  'Next.js',
  'TypeScript',
  'Python',
  'Go',
  'Rust',
  'Node.js',
  'Postgres',
  'AWS',
  'Docker',
  'ML / PyTorch',
  'LLMs',
  'iOS',
  'Android',
  'Solidity',
  'Design',
  'Product',
  'DevOps',
]

const BUILDER_INTEREST_OPTIONS = [
  'AI',
  'FinTech',
  'HealthTech',
  'ClimateTech',
  'DevTools',
  'Consumer',
  'B2B SaaS',
  'Hardware',
  'Crypto / Web3',
  'Education',
  'Open Source',
  'Robotics',
]

const INVESTOR_SECTOR_OPTIONS = [
  'AI',
  'FinTech',
  'HealthTech',
  'ClimateTech',
  'DevTools',
  'Consumer',
  'B2B SaaS',
  'Hardware',
  'Crypto / Web3',
  'Education',
  'Logistics',
  'Robotics',
]

const INVESTOR_STAGE_OPTIONS = ['Idea', 'Pre-seed', 'Seed', 'Series A', 'Series B+']
const INVESTOR_TICKETS = [
  '$1K–$10K',
  '$10K–$50K',
  '$50K–$200K',
  '$200K–$1M',
  '$1M+',
]

export default function OnboardingPage() {
  const router = useRouter()
  const [role, setRole] = useState<Role | null>(null)
  const [email, setEmail] = useState<string>('')
  const [step, setStep] = useState(0)

  // Builder state
  const [name, setName] = useState('')
  const [headline, setHeadline] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [githubUsername, setGithubUsername] = useState('')
  const [bio, setBio] = useState('')

  // Investor state
  const [sectors, setSectors] = useState<string[]>([])
  const [stages, setStages] = useState<string[]>([])
  const [ticketSize, setTicketSize] = useState<string>('')

  useEffect(() => {
    const session = getSession()
    if (!session) {
      router.replace('/auth')
      return
    }
    setRole(session.role)
    setEmail(session.email)
  }, [router])

  const accent = role === 'investor' ? '#F59E0B' : '#7C5CFC'

  const totalSteps = 3
  const progress = useMemo(() => ((step + 1) / totalSteps) * 100, [step])

  const toggle = (
    value: string,
    current: string[],
    setter: (v: string[]) => void,
    max?: number
  ) => {
    if (current.includes(value)) {
      setter(current.filter(v => v !== value))
    } else {
      if (max && current.length >= max) return
      setter([...current, value])
    }
  }

  const canContinue = useMemo(() => {
    if (!role) return false
    if (step === 0) return name.trim().length > 0 && headline.trim().length > 0
    if (step === 1) {
      return role === 'builder'
        ? skills.length >= 3 && interests.length >= 1
        : sectors.length >= 1 && stages.length >= 1 && ticketSize.length > 0
    }
    if (step === 2) return bio.trim().length >= 20
    return false
  }, [role, step, name, headline, skills, interests, sectors, stages, ticketSize, bio])

  const handleFinish = () => {
    if (!role) return
    let profile: Profile
    if (role === 'builder') {
      const builder: BuilderProfile = {
        role: 'builder',
        email,
        name,
        headline,
        skills,
        interests,
        githubUsername: githubUsername.trim() || undefined,
        bio,
      }
      profile = builder
    } else {
      const investor: InvestorProfile = {
        role: 'investor',
        email,
        name,
        headline,
        sectors,
        stages,
        ticketSize,
        bio,
      }
      profile = investor
    }
    setProfile(profile)
    router.push(profile.role === 'investor' ? '/dashboard/investor' : '/dashboard/builder')
  }

  if (!role) {
    return (
      <main
        style={{
          minHeight: '100vh',
          background: '#0C0C12',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#7070A0',
          fontSize: 14,
        }}
      >
        Loading&hellip;
      </main>
    )
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0C0C12',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 24px 80px',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 32,
          alignSelf: 'flex-start',
          maxWidth: 640,
          width: '100%',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#1C1C28" />
          <path
            d="M8 16 C8 11 11.5 8 16 8 C20.5 8 24 11 24 16"
            stroke="#7C5CFC"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M8 16 C8 21 11.5 24 16 24 C20.5 24 24 21 24 16"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="16" cy="16" r="2.5" fill="#7C5CFC" />
        </svg>
        <span
          style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: 18,
            fontWeight: 800,
            color: '#F0F0F8',
          }}
        >
          Buildbase
        </span>
      </div>

      <div style={{ width: '100%', maxWidth: 640 }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: accent + '15',
              border: `0.5px solid ${accent}30`,
              borderRadius: 999,
              padding: '4px 12px',
              fontSize: 11,
              fontWeight: 600,
              color: accent,
              marginBottom: 14,
            }}
          >
            {role === 'builder' ? 'Builder Onboarding' : 'Investor Onboarding'}
          </div>
          <h1
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: 32,
              fontWeight: 900,
              color: '#F0F0F8',
              marginBottom: 8,
              lineHeight: 1.15,
            }}
          >
            {step === 0 && 'Tell us about yourself'}
            {step === 1 &&
              (role === 'builder'
                ? 'What do you build?'
                : 'What do you invest in?')}
            {step === 2 && 'One last thing'}
          </h1>
          <p style={{ fontSize: 14, color: '#7070A0', fontWeight: 300, lineHeight: 1.6 }}>
            {step === 0 && 'This is what other users and investors will see first.'}
            {step === 1 &&
              (role === 'builder'
                ? 'We use this to match you with projects and teammates.'
                : 'We use this to surface projects that fit your thesis.')}
            {step === 2 && 'A quick bio so people know if you\u2019re a good fit.'}
          </p>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              height: 4,
              background: '#171720',
              borderRadius: 999,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: accent,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 8,
              fontSize: 11,
              color: '#7070A0',
            }}
          >
            <span>
              Step {step + 1} of {totalSteps}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Step content */}
        <div
          style={{
            background: '#121220',
            border: '0.5px solid rgba(255,255,255,0.06)',
            borderRadius: 16,
            padding: 28,
          }}
        >
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Field label="Display name">
                <TextInput
                  placeholder="Mahesh Neupane"
                  value={name}
                  onChange={setName}
                  accent={accent}
                />
              </Field>
              <Field
                label={
                  role === 'builder'
                    ? 'Headline'
                    : 'Headline / fund'
                }
                hint={
                  role === 'builder'
                    ? 'e.g. Full-stack engineer \u00b7 ex-Stripe'
                    : 'e.g. Angel \u00b7 FinTech + AI'
                }
              >
                <TextInput
                  placeholder={
                    role === 'builder'
                      ? 'Full-stack engineer · ex-Stripe'
                      : 'Angel · FinTech + AI'
                  }
                  value={headline}
                  onChange={setHeadline}
                  accent={accent}
                />
              </Field>
              {role === 'builder' && (
                <Field label="GitHub username (optional)">
                  <TextInput
                    placeholder="github-handle"
                    value={githubUsername}
                    onChange={setGithubUsername}
                    accent={accent}
                  />
                </Field>
              )}
            </div>
          )}

          {step === 1 && role === 'builder' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <ChipGroup
                label="Pick your top skills"
                hint={`Choose at least 3 · ${skills.length} selected`}
                options={BUILDER_SKILL_OPTIONS}
                selected={skills}
                onToggle={v => toggle(v, skills, setSkills, 10)}
                accent={accent}
              />
              <ChipGroup
                label="Industries you care about"
                hint={`Pick 1\u20135 · ${interests.length} selected`}
                options={BUILDER_INTEREST_OPTIONS}
                selected={interests}
                onToggle={v => toggle(v, interests, setInterests, 5)}
                accent={accent}
              />
            </div>
          )}

          {step === 1 && role === 'investor' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <ChipGroup
                label="Sectors you invest in"
                hint={`Pick 1\u20135 · ${sectors.length} selected`}
                options={INVESTOR_SECTOR_OPTIONS}
                selected={sectors}
                onToggle={v => toggle(v, sectors, setSectors, 5)}
                accent={accent}
              />
              <ChipGroup
                label="Stages you back"
                hint={`${stages.length} selected`}
                options={INVESTOR_STAGE_OPTIONS}
                selected={stages}
                onToggle={v => toggle(v, stages, setStages)}
                accent={accent}
              />
              <Field label="Typical ticket size">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {INVESTOR_TICKETS.map(t => {
                    const active = ticketSize === t
                    return (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTicketSize(t)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 999,
                          background: active ? accent : '#171720',
                          border: `0.5px solid ${
                            active ? accent : 'rgba(255,255,255,0.1)'
                          }`,
                          color: active ? '#fff' : '#C0C0D8',
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                      >
                        {t}
                      </button>
                    )
                  })}
                </div>
              </Field>
            </div>
          )}

          {step === 2 && (
            <Field
              label="Short bio"
              hint={`${bio.length}/280 \u00b7 at least 20 characters`}
            >
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value.slice(0, 280))}
                rows={5}
                placeholder={
                  role === 'builder'
                    ? 'What are you building right now? What are you looking for?'
                    : 'What\u2019s your thesis? What do you bring beyond capital?'
                }
                style={{
                  width: '100%',
                  background: '#171720',
                  border: `0.5px solid rgba(255,255,255,0.1)`,
                  borderRadius: 10,
                  padding: '12px 14px',
                  fontSize: 14,
                  color: '#F0F0F8',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'DM Sans', sans-serif",
                  resize: 'vertical',
                  lineHeight: 1.6,
                }}
              />
            </Field>
          )}
        </div>

        {/* Nav buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 24,
            gap: 12,
          }}
        >
          <button
            onClick={() => (step === 0 ? router.push('/auth') : setStep(s => s - 1))}
            style={{
              padding: '11px 20px',
              background: 'transparent',
              border: '0.5px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: '#C0C0D8',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {step === 0 ? 'Cancel' : 'Back'}
          </button>
          <button
            onClick={() => {
              if (!canContinue) return
              if (step < totalSteps - 1) setStep(s => s + 1)
              else handleFinish()
            }}
            disabled={!canContinue}
            style={{
              padding: '11px 22px',
              background: canContinue ? accent : accent + '50',
              border: 'none',
              borderRadius: 10,
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: canContinue ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s',
            }}
          >
            {step < totalSteps - 1 ? 'Continue' : 'Finish & go to homepage'}
          </button>
        </div>
      </div>
    </main>
  )
}

/* ---------- small building blocks ---------- */

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 8,
        }}
      >
        <label style={{ fontSize: 12, color: '#9090B0', fontWeight: 500 }}>{label}</label>
        {hint && <span style={{ fontSize: 11, color: '#5F5F80' }}>{hint}</span>}
      </div>
      {children}
    </div>
  )
}

function TextInput({
  value,
  onChange,
  placeholder,
  accent,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  accent: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder={placeholder}
      style={{
        width: '100%',
        background: '#171720',
        border: `0.5px solid ${focused ? accent + '70' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: 10,
        padding: '11px 14px',
        fontSize: 14,
        color: '#F0F0F8',
        outline: 'none',
        boxSizing: 'border-box',
        fontFamily: "'DM Sans', sans-serif",
        transition: 'border-color 0.2s',
      }}
    />
  )
}

function ChipGroup({
  label,
  hint,
  options,
  selected,
  onToggle,
  accent,
}: {
  label: string
  hint?: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
  accent: string
}) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 10,
        }}
      >
        <label style={{ fontSize: 12, color: '#9090B0', fontWeight: 500 }}>{label}</label>
        {hint && <span style={{ fontSize: 11, color: '#5F5F80' }}>{hint}</span>}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {options.map(opt => {
          const active = selected.includes(opt)
          return (
            <button
              type="button"
              key={opt}
              onClick={() => onToggle(opt)}
              style={{
                padding: '7px 14px',
                borderRadius: 999,
                background: active ? accent + '22' : '#171720',
                border: `0.5px solid ${
                  active ? accent + '70' : 'rgba(255,255,255,0.1)'
                }`,
                color: active ? accent : '#C0C0D8',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
