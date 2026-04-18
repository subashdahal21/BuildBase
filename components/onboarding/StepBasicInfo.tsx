'use client'

import { useState } from 'react'
import { OnboardingData } from '@/app/onboarding/page'

interface Props {
  data: OnboardingData
  update: (partial: Partial<OnboardingData>) => void
  onNext: () => void
}

const baseInput = "w-full bg-[#0C0C12] border rounded-xl px-3.5 py-3 text-sm text-[#F0F0F8] outline-none transition-all duration-200 placeholder:text-[#3C3C60] font-['DM_Sans',sans-serif] ob-input"
const label = "text-xs text-[#8080A8] font-medium mb-1.5 block"

export default function StepBasicInfo({ data, update, onNext }: Props) {
  const [focused, setFocused] = useState<string | null>(null)

  const borderColor = (name: string) =>
    focused === name ? 'border-[#7C5CFC]/50' : 'border-white/[0.08]'

  const canProceed = data.fullName.trim() && data.username.trim()

  return (
    <div className="flex flex-col gap-0">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-['Cabinet_Grotesk',sans-serif] text-2xl sm:text-3xl font-black text-[#F0F0F8] mb-1.5 hidden lg:block">
          Tell us about yourself
        </h2>
        <p className="text-sm text-[#6060A0] hidden lg:block">This is how others will see you on Buildbase.</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-[#0C0C12]/60 rounded-xl border border-white/[0.05]">
        <div className="w-16 h-16 rounded-full bg-[#7C5CFC]/10 border-2 border-dashed border-[#7C5CFC]/30 flex items-center justify-center cursor-pointer shrink-0 hover:bg-[#7C5CFC]/15 transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="#7C5CFC" strokeWidth="1.5" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-[#D0D0F0] mb-0.5">Profile photo</div>
          <div className="text-xs text-[#4040680]" style={{ color: '#404068' }}>Optional · JPG, PNG up to 2MB</div>
          <button className="text-xs text-[#7C5CFC] font-medium mt-1.5 hover:underline">Upload photo</button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Name + Username */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={label}>Full name <span className="text-[#7C5CFC]">*</span></label>
            <input
              type="text"
              placeholder="Mahesh Neupane"
              value={data.fullName}
              onChange={e => update({ fullName: e.target.value })}
              onFocus={() => setFocused('fullName')}
              onBlur={() => setFocused(null)}
              className={`${baseInput} ${borderColor('fullName')}`}
            />
          </div>
          <div>
            <label className={label}>Username <span className="text-[#7C5CFC]">*</span></label>
            <input
              type="text"
              placeholder="mahesh_builds"
              value={data.username}
              onChange={e => update({ username: e.target.value.replace(/\s/g, '_').toLowerCase() })}
              onFocus={() => setFocused('username')}
              onBlur={() => setFocused(null)}
              className={`${baseInput} ${borderColor('username')}`}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className={label}>Location</label>
          <input
            type="text"
            placeholder="San Francisco, CA"
            value={data.location}
            onChange={e => update({ location: e.target.value })}
            onFocus={() => setFocused('location')}
            onBlur={() => setFocused(null)}
            className={`${baseInput} ${borderColor('location')}`}
          />
        </div>

        {/* Bio */}
        <div>
          <label className={label}>Bio</label>
          <textarea
            placeholder="Tell the community what you're building or looking for…"
            value={data.bio}
            onChange={e => update({ bio: e.target.value.slice(0, 160) })}
            onFocus={() => setFocused('bio')}
            onBlur={() => setFocused(null)}
            rows={3}
            className={`${baseInput} ${borderColor('bio')} resize-none leading-relaxed`}
          />
          <div className="text-[11px] text-right mt-1" style={{ color: data.bio.length > 140 ? '#F59E0B' : '#3C3C60' }}>
            {data.bio.length}/160
          </div>
        </div>

        {/* GitHub + LinkedIn */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={label}>GitHub</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[11px] text-[#4040680] pointer-events-none" style={{ color: '#404068' }}>
                github.com/
              </span>
              <input
                type="text"
                placeholder="handle"
                value={data.github}
                onChange={e => update({ github: e.target.value })}
                onFocus={() => setFocused('github')}
                onBlur={() => setFocused(null)}
                className={`${baseInput} ${borderColor('github')} pl-[84px]`}
              />
            </div>
          </div>
          <div>
            <label className={label}>LinkedIn</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[11px] pointer-events-none" style={{ color: '#404068' }}>
                in/
              </span>
              <input
                type="text"
                placeholder="handle"
                value={data.linkedin}
                onChange={e => update({ linkedin: e.target.value })}
                onFocus={() => setFocused('linkedin')}
                onBlur={() => setFocused(null)}
                className={`${baseInput} ${borderColor('linkedin')} pl-9`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onNext}
        disabled={!canProceed}
        className="mt-7 w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 font-['DM_Sans',sans-serif]"
        style={{
          background: canProceed ? 'linear-gradient(135deg, #7C5CFC, #6046E0)' : '#7C5CFC30',
          color: canProceed ? '#fff' : '#7C5CFC60',
          cursor: canProceed ? 'pointer' : 'not-allowed',
          boxShadow: canProceed ? '0 4px 20px #7C5CFC33' : 'none',
        }}
      >
        Continue →
      </button>
    </div>
  )
}
