'use client'

import { InvestorOnboardingData } from '@/app/onboarding/investor/page'

interface Props {
  data: InvestorOnboardingData
  update: (partial: Partial<InvestorOnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

const SECTORS = [
  { label: 'AI / ML', icon: '🤖' },
  { label: 'Web3 / Crypto', icon: '⛓️' },
  { label: 'FinTech', icon: '💸' },
  { label: 'HealthTech', icon: '🏥' },
  { label: 'EdTech', icon: '📚' },
  { label: 'Climate / Green', icon: '🌱' },
  { label: 'SaaS Tools', icon: '🛠️' },
  { label: 'Developer Tools', icon: '💻' },
  { label: 'Consumer Apps', icon: '📱' },
  { label: 'E-commerce', icon: '🛒' },
  { label: 'Gaming', icon: '🎮' },
  { label: 'Cybersecurity', icon: '🔐' },
  { label: 'Space Tech', icon: '🚀' },
  { label: 'Robotics', icon: '🦾' },
  { label: 'BioTech', icon: '🧬' },
  { label: 'DeepTech', icon: '⚗️' },
]

const ACCENT = '#F59E0B'

export default function StepSectors({ data, update, onNext, onBack }: Props) {
  const toggle = (sector: string) => {
    const cur = data.sectors
    if (cur.includes(sector)) update({ sectors: cur.filter(s => s !== sector) })
    else if (cur.length < 8) update({ sectors: [...cur, sector] })
  }

  const maxed = data.sectors.length >= 8

  return (
    <div>
      <div className="mb-5 hidden lg:block">
        <h2 className="font-['Cabinet_Grotesk',sans-serif] text-2xl sm:text-3xl font-black text-[#F0F0F8] mb-1.5">
          Sectors you back
        </h2>
        <p className="text-sm text-[#6060A0]">Choose up to 8 — we&apos;ll surface relevant deals.</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-[#5050A0]">
          {data.sectors.length > 0 ? `${data.sectors.length} selected` : 'None selected yet'}
        </span>
        <span className="text-xs font-medium" style={{ color: maxed ? ACCENT : '#5050A0' }}>
          {maxed ? 'Max reached' : `${8 - data.sectors.length} remaining`}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        {SECTORS.map(({ label, icon }) => {
          const sel = data.sectors.includes(label)
          return (
            <button
              key={label} onClick={() => toggle(label)}
              disabled={maxed && !sel}
              className="flex items-center gap-3 px-3.5 py-3 rounded-xl border text-left transition-all duration-150"
              style={{
                borderColor: sel ? ACCENT + '60' : 'rgba(255,255,255,0.07)',
                background: sel ? ACCENT + '10' : '#0C0C12',
                opacity: maxed && !sel ? 0.35 : 1,
                cursor: maxed && !sel ? 'not-allowed' : 'pointer',
                boxShadow: sel ? `0 0 12px ${ACCENT}20` : 'none',
              }}
            >
              <span className="text-base shrink-0">{icon}</span>
              <span className="text-xs font-medium flex-1 leading-tight" style={{ color: sel ? ACCENT : '#8080A0' }}>
                {label}
              </span>
              {sel && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <circle cx="7" cy="7" r="7" fill={ACCENT} />
                  <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
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
          {data.sectors.length === 0 ? 'Skip for now' : 'Continue →'}
        </button>
      </div>
    </div>
  )
}
