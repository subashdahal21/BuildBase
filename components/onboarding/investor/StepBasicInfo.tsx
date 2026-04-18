'use client'

import { useState } from 'react'
import { InvestorOnboardingData } from '@/app/onboarding/investor/page'

interface Props {
  data: InvestorOnboardingData
  update: (partial: Partial<InvestorOnboardingData>) => void
  onNext: () => void
}

const ACCENT = '#F59E0B'
const base = "w-full bg-[#0C0C12] border rounded-xl px-3.5 py-3 text-sm text-[#F0F0F8] outline-none transition-all duration-200 placeholder:text-[#3C3C60] font-['DM_Sans',sans-serif]"
const lbl = "text-xs text-[#8080A8] font-medium mb-1.5 block"

export default function StepBasicInfo({ data, update, onNext }: Props) {
  const [focused, setFocused] = useState<string | null>(null)
  const bc = (n: string) => focused === n ? `border-[#F59E0B]/50` : 'border-white/[0.08]'
  const canProceed = data.fullName.trim() && data.username.trim()

  return (
    <div className="flex flex-col gap-0">
      <div className="mb-5 hidden lg:block">
        <h2 className="font-['Cabinet_Grotesk',sans-serif] text-2xl sm:text-3xl font-black text-[#F0F0F8] mb-1.5">
          Tell us about yourself
        </h2>
        <p className="text-sm text-[#6060A0]">This is how founders will see you on Buildbase.</p>
      </div>

      <div className="flex items-center gap-4 mb-5 p-4 bg-[#0C0C12]/60 rounded-xl border border-white/[0.05]">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shrink-0 transition-colors"
          style={{ background: ACCENT + '18', border: `2px dashed ${ACCENT}40` }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke={ACCENT} strokeWidth="1.5" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-[#D0D0F0] mb-0.5">Profile photo</div>
          <div className="text-xs text-[#404068]">Optional · JPG, PNG up to 2MB</div>
          <button className="text-xs font-medium mt-1.5 hover:underline" style={{ color: ACCENT }}>Upload photo</button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={lbl}>Full name <span style={{ color: ACCENT }}>*</span></label>
            <input
              type="text" placeholder="Your full name" value={data.fullName}
              onChange={e => update({ fullName: e.target.value })}
              onFocus={() => setFocused('fullName')} onBlur={() => setFocused(null)}
              className={`${base} ${bc('fullName')}`}
            />
          </div>
          <div>
            <label className={lbl}>Username <span style={{ color: ACCENT }}>*</span></label>
            <input
              type="text" placeholder="sarah_invests" value={data.username}
              onChange={e => update({ username: e.target.value.replace(/\s/g, '_').toLowerCase() })}
              onFocus={() => setFocused('username')} onBlur={() => setFocused(null)}
              className={`${base} ${bc('username')}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={lbl}>Company / Firm</label>
            <input
              type="text" placeholder="Acme Ventures" value={data.company}
              onChange={e => update({ company: e.target.value })}
              onFocus={() => setFocused('company')} onBlur={() => setFocused(null)}
              className={`${base} ${bc('company')}`}
            />
          </div>
          <div>
            <label className={lbl}>Title</label>
            <input
              type="text" placeholder="Partner, Angel Investor…" value={data.title}
              onChange={e => update({ title: e.target.value })}
              onFocus={() => setFocused('title')} onBlur={() => setFocused(null)}
              className={`${base} ${bc('title')}`}
            />
          </div>
        </div>

        <div>
          <label className={lbl}>Location</label>
          <input
            type="text" placeholder="San Francisco, CA" value={data.location}
            onChange={e => update({ location: e.target.value })}
            onFocus={() => setFocused('location')} onBlur={() => setFocused(null)}
            className={`${base} ${bc('location')}`}
          />
        </div>

        <div>
          <label className={lbl}>Bio</label>
          <textarea
            placeholder="Tell founders about your investment focus and background…"
            value={data.bio} rows={3}
            onChange={e => update({ bio: e.target.value.slice(0, 200) })}
            onFocus={() => setFocused('bio')} onBlur={() => setFocused(null)}
            className={`${base} ${bc('bio')} resize-none leading-relaxed`}
          />
          <div className="text-[11px] text-right mt-1" style={{ color: data.bio.length > 180 ? '#F59E0B' : '#3C3C60' }}>
            {data.bio.length}/200
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={lbl}>LinkedIn</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[11px] pointer-events-none text-[#404068]">in/</span>
              <input
                type="text" placeholder="handle" value={data.linkedin}
                onChange={e => update({ linkedin: e.target.value })}
                onFocus={() => setFocused('linkedin')} onBlur={() => setFocused(null)}
                className={`${base} ${bc('linkedin')} pl-9`}
              />
            </div>
          </div>
          <div>
            <label className={lbl}>Website</label>
            <input
              type="text" placeholder="https://yoursite.com" value={data.website}
              onChange={e => update({ website: e.target.value })}
              onFocus={() => setFocused('website')} onBlur={() => setFocused(null)}
              className={`${base} ${bc('website')}`}
            />
          </div>
        </div>
      </div>

      <button
        onClick={onNext} disabled={!canProceed}
        className="mt-7 w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 font-['DM_Sans',sans-serif]"
        style={{
          background: canProceed ? 'linear-gradient(135deg, #F59E0B, #D97706)' : '#F59E0B30',
          color: canProceed ? '#fff' : '#F59E0B60',
          cursor: canProceed ? 'pointer' : 'not-allowed',
          boxShadow: canProceed ? '0 4px 20px #F59E0B33' : 'none',
        }}
      >
        Continue →
      </button>
    </div>
  )
}
