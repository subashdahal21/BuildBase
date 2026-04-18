'use client'

import { BuilderOnboardingData } from '@/app/onboarding/builder/page'

interface Props {
  data: BuilderOnboardingData
  update: (partial: Partial<BuilderOnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

const GOALS = [
  {
    id: 'find-cofounder',
    title: 'Find a co-founder',
    desc: 'Looking for someone to build alongside',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'raise-funding',
    title: 'Raise funding',
    desc: 'Connect with investors for your project',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'find-talent',
    title: 'Find talent',
    desc: 'Hire developers, designers, or marketers',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'showcase',
    title: 'Showcase my work',
    desc: 'Build my portfolio and get noticed',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 9h6M9 12h6M9 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'network',
    title: 'Grow my network',
    desc: 'Connect with builders and innovators',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="5" cy="19" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="19" cy="19" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7v4M7 17l5-6M17 17l-5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'learn',
    title: 'Learn & collaborate',
    desc: 'Join projects to grow skills and experience',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function StepGoals({ data, update, onNext, onBack }: Props) {
  const toggle = (goal: string) => {
    const cur = data.goals
    if (cur.includes(goal)) update({ goals: cur.filter(g => g !== goal) })
    else update({ goals: [...cur, goal] })
  }

  return (
    <div>
      <div className="mb-5 hidden lg:block">
        <h2 className="font-['Cabinet_Grotesk',sans-serif] text-2xl sm:text-3xl font-black text-[#F0F0F8] mb-1.5">
          What brings you here?
        </h2>
        <p className="text-sm text-[#6060A0]">Select all that apply — we&apos;ll personalise your feed.</p>
      </div>

      <div className="flex flex-col gap-2.5 mb-7">
        {GOALS.map(({ id, title, desc, icon }) => {
          const sel = data.goals.includes(id)
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl border text-left transition-all duration-150"
              style={{
                borderColor: sel ? '#7C5CFC55' : 'rgba(255,255,255,0.07)',
                background: sel ? '#7C5CFC0D' : '#0C0C12',
                boxShadow: sel ? '0 0 16px #7C5CFC18' : 'none',
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                style={{
                  background: sel ? '#7C5CFC20' : 'rgba(255,255,255,0.04)',
                  color: sel ? '#7C5CFC' : '#505080',
                }}
              >
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold mb-0.5" style={{ color: sel ? '#C0A8FF' : '#C0C0E0' }}>
                  {title}
                </div>
                <div className="text-xs truncate" style={{ color: sel ? '#7C5CFC80' : '#404068' }}>
                  {desc}
                </div>
              </div>
              <div
                className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all"
                style={{
                  borderColor: sel ? '#7C5CFC' : 'rgba(255,255,255,0.12)',
                  background: sel ? '#7C5CFC' : 'transparent',
                }}
              >
                {sel && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-[#8080A0] border border-white/[0.08] hover:border-white/[0.15] transition-colors font-['DM_Sans',sans-serif]"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="flex-[2] py-3.5 rounded-xl text-sm font-semibold text-white transition-all font-['DM_Sans',sans-serif]"
          style={{ background: 'linear-gradient(135deg, #7C5CFC, #6046E0)', boxShadow: '0 4px 20px #7C5CFC33' }}
        >
          {data.goals.length === 0 ? 'Skip for now' : 'Finish setup ✓'}
        </button>
      </div>
    </div>
  )
}
