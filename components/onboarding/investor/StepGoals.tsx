'use client'

import { InvestorOnboardingData } from '@/app/onboarding/investor/page'

interface Props {
  data: InvestorOnboardingData
  update: (partial: Partial<InvestorOnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

const ACCENT = '#F59E0B'

const GOALS = [
  {
    id: 'find-deals',
    title: 'Find high-quality deal flow',
    desc: 'Discover vetted projects with real traction',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'diversify',
    title: 'Diversify my portfolio',
    desc: 'Spread risk across sectors and stages',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 17l4-4 4 3 4-6 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 6h4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'early-stage',
    title: 'Back early-stage founders',
    desc: 'Get in early on pre-seed and seed rounds',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'network',
    title: 'Grow my investor network',
    desc: 'Connect with co-investors and syndicates',
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
    id: 'mentor',
    title: 'Mentor founders',
    desc: 'Add strategic value beyond capital',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'track-trends',
    title: 'Track emerging trends',
    desc: 'Stay ahead of what builders are working on',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M2 12h4l3-8 4 16 3-8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
          What are you here for?
        </h2>
        <p className="text-sm text-[#6060A0]">Select all that apply — we&apos;ll personalise your deal flow.</p>
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
                borderColor: sel ? ACCENT + '55' : 'rgba(255,255,255,0.07)',
                background: sel ? ACCENT + '0D' : '#0C0C12',
                boxShadow: sel ? `0 0 16px ${ACCENT}18` : 'none',
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: sel ? ACCENT + '20' : 'rgba(255,255,255,0.04)',
                  color: sel ? ACCENT : '#505080',
                }}
              >
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold mb-0.5" style={{ color: sel ? '#FCD34D' : '#C0C0E0' }}>
                  {title}
                </div>
                <div className="text-xs truncate" style={{ color: sel ? ACCENT + '80' : '#404068' }}>
                  {desc}
                </div>
              </div>
              <div
                className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all"
                style={{
                  borderColor: sel ? ACCENT : 'rgba(255,255,255,0.12)',
                  background: sel ? ACCENT : 'transparent',
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
          style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', boxShadow: '0 4px 20px #F59E0B33' }}
        >
          {data.goals.length === 0 ? 'Skip for now' : 'Finish setup ✓'}
        </button>
      </div>
    </div>
  )
}
