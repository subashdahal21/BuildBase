'use client'

import { useState } from 'react'
import { InvestorOnboardingData } from '@/app/onboarding/investor/page'

interface Props {
  data: InvestorOnboardingData
  update: (partial: Partial<InvestorOnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

const ACCENT = '#F59E0B'
const base = "w-full bg-[#0C0C12] border rounded-xl px-3.5 py-3 text-sm text-[#F0F0F8] outline-none transition-all duration-200 placeholder:text-[#3C3C60] font-['DM_Sans',sans-serif]"
const lbl = "text-xs text-[#8080A8] font-medium mb-1.5 block"

const TICKET_SIZES = [
  '$1K–$10K', '$10K–$50K', '$25K–$100K', '$50K–$250K', '$100K–$500K', '$500K+',
]

const STAGES = [
  { id: 'idea', label: 'Idea stage', desc: 'Pre-product, concept only' },
  { id: 'mvp', label: 'MVP / Prototype', desc: 'Early product, some validation' },
  { id: 'seed', label: 'Seed', desc: 'Product live, early traction' },
  { id: 'series-a', label: 'Series A+', desc: 'Revenue, scaling' },
]

const PORTFOLIO_SIZES = ['1–5 companies', '6–15 companies', '16–30 companies', '30+ companies']

export default function StepInvestmentProfile({ data, update, onNext, onBack }: Props) {
  const [focused, setFocused] = useState<string | null>(null)

  const toggleStage = (id: string) => {
    const cur = data.stagePreference
    if (cur.includes(id)) update({ stagePreference: cur.filter(s => s !== id) })
    else update({ stagePreference: [...cur, id] })
  }

  return (
    <div>
      <div className="mb-5 hidden lg:block">
        <h2 className="font-['Cabinet_Grotesk',sans-serif] text-2xl sm:text-3xl font-black text-[#F0F0F8] mb-1.5">
          Your investment profile
        </h2>
        <p className="text-sm text-[#6060A0]">Help founders understand your thesis and capacity.</p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Ticket size */}
        <div>
          <label className={lbl}>Typical ticket size</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TICKET_SIZES.map(size => {
              const sel = data.ticketSize === size
              return (
                <button
                  key={size}
                  onClick={() => update({ ticketSize: sel ? '' : size })}
                  className="py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all duration-150"
                  style={{
                    borderColor: sel ? ACCENT : 'rgba(255,255,255,0.08)',
                    background: sel ? ACCENT + '18' : '#0C0C12',
                    color: sel ? ACCENT : '#6060A0',
                    boxShadow: sel ? `0 0 10px ${ACCENT}22` : 'none',
                  }}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>

        {/* Stage preference */}
        <div>
          <label className={lbl}>Stage preference <span className="text-[#404068] font-normal">(select all that apply)</span></label>
          <div className="flex flex-col gap-2">
            {STAGES.map(({ id, label, desc }) => {
              const sel = data.stagePreference.includes(id)
              return (
                <button
                  key={id}
                  onClick={() => toggleStage(id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-150"
                  style={{
                    borderColor: sel ? ACCENT + '55' : 'rgba(255,255,255,0.07)',
                    background: sel ? ACCENT + '0D' : '#0C0C12',
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all"
                    style={{
                      borderColor: sel ? ACCENT : 'rgba(255,255,255,0.15)',
                      background: sel ? ACCENT : 'transparent',
                    }}
                  >
                    {sel && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: sel ? '#FCD34D' : '#C0C0E0' }}>{label}</div>
                    <div className="text-xs mt-0.5" style={{ color: sel ? ACCENT + '80' : '#404068' }}>{desc}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Portfolio size */}
        <div>
          <label className={lbl}>Current portfolio size</label>
          <div className="grid grid-cols-2 gap-2">
            {PORTFOLIO_SIZES.map(size => {
              const sel = data.portfolioSize === size
              return (
                <button
                  key={size}
                  onClick={() => update({ portfolioSize: sel ? '' : size })}
                  className="py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all duration-150"
                  style={{
                    borderColor: sel ? ACCENT : 'rgba(255,255,255,0.08)',
                    background: sel ? ACCENT + '18' : '#0C0C12',
                    color: sel ? ACCENT : '#6060A0',
                  }}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-7">
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
          {!data.ticketSize && data.stagePreference.length === 0 ? 'Skip for now' : 'Continue →'}
        </button>
      </div>
    </div>
  )
}
