'use client'

import { useState } from 'react'
import { BuilderOnboardingData } from '@/app/onboarding/builder/page'

interface Props {
  data: BuilderOnboardingData
  update: (partial: Partial<BuilderOnboardingData>) => void
  onNext: () => void
}

const base = "w-full bg-[#0C0C12] border rounded-xl px-3.5 py-3 text-sm text-[#F0F0F8] outline-none transition-all duration-200 placeholder:text-[#3C3C60] font-['DM_Sans',sans-serif] ob-input"
const lbl = "text-xs text-[#8080A8] font-medium mb-1.5 block"

export default function StepBasicInfo({ data, update, onNext }: Props) {
  const [focused, setFocused] = useState<string | null>(null)
  const bc = (n: string) => focused === n ? 'border-[#7C5CFC]/50' : 'border-white/[0.08]'
  const canProceed = data.fullName.trim() && data.username.trim()

  return (
    <div className="flex flex-col gap-0">
      <div className="mb-5">
        <h2 className="font-['Cabinet_Grotesk',sans-serif] text-2xl sm:text-3xl font-black text-[#F0F0F8] mb-1.5 hidden lg:block">
          Tell us about yourself
        </h2>
        <p className="text-sm text-[#6060A0] hidden lg:block">
          {data.fromGithub ? 'GitHub details are pre-filled — confirm or update anything.' : 'This is how others will see you on Buildbase.'}
        </p>
      </div>

      {data.fromGithub && (
        <div className="flex items-center gap-2.5 mb-4 px-3.5 py-2.5 rounded-xl border border-[#7C5CFC]/25 bg-[#7C5CFC]/6">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#A080FF">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          <span className="text-xs text-[#A080FF] font-medium">Profile imported from GitHub — just add a username to continue.</span>
        </div>
      )}

      <div className="flex items-center gap-4 mb-5 p-4 bg-[#0C0C12]/60 rounded-xl border border-white/[0.05]">
        <div className="w-16 h-16 rounded-full bg-[#7C5CFC]/10 border-2 border-dashed border-[#7C5CFC]/30 flex items-center justify-center cursor-pointer shrink-0 hover:bg-[#7C5CFC]/15 transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="#7C5CFC" strokeWidth="1.5" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-[#D0D0F0] mb-0.5">Profile photo</div>
          <div className="text-xs" style={{ color: '#404068' }}>Optional · JPG, PNG up to 2MB</div>
          <button className="text-xs text-[#7C5CFC] font-medium mt-1.5 hover:underline">Upload photo</button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={lbl}>
              Full name <span className="text-[#7C5CFC]">*</span>
              {data.fromGithub && (
                <span className="ml-1.5 text-[10px] text-[#7C5CFC] bg-[#7C5CFC]/12 px-1.5 py-0.5 rounded-full border border-[#7C5CFC]/20">
                  GitHub
                </span>
              )}
            </label>
            <input
              type="text" placeholder="Your full name" value={data.fullName}
              onChange={e => update({ fullName: e.target.value })}
              onFocus={() => setFocused('fullName')} onBlur={() => setFocused(null)}
              className={`${base} ${bc('fullName')}`}
            />
          </div>
          <div>
            <label className={lbl}>Username <span className="text-[#7C5CFC]">*</span></label>
            <input
              type="text" placeholder="mahesh_builds" value={data.username}
              onChange={e => update({ username: e.target.value.replace(/\s/g, '_').toLowerCase() })}
              onFocus={() => setFocused('username')} onBlur={() => setFocused(null)}
              className={`${base} ${bc('username')}`}
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
            placeholder="Tell the community what you're building or looking for…"
            value={data.bio} rows={3}
            onChange={e => update({ bio: e.target.value.slice(0, 160) })}
            onFocus={() => setFocused('bio')} onBlur={() => setFocused(null)}
            className={`${base} ${bc('bio')} resize-none leading-relaxed`}
          />
          <div className="text-[11px] text-right mt-1" style={{ color: data.bio.length > 140 ? '#F59E0B' : '#3C3C60' }}>
            {data.bio.length}/160
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={lbl}>
              GitHub
              {data.fromGithub && (
                <span className="ml-1.5 text-[10px] text-[#7C5CFC] bg-[#7C5CFC]/12 px-1.5 py-0.5 rounded-full border border-[#7C5CFC]/20">
                  Pre-filled
                </span>
              )}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[11px] pointer-events-none" style={{ color: '#404068' }}>
                github.com/
              </span>
              <input
                type="text" placeholder="handle" value={data.github}
                onChange={e => update({ github: e.target.value })}
                onFocus={() => setFocused('github')} onBlur={() => setFocused(null)}
                className={`${base} ${bc('github')} pl-[84px]`}
              />
            </div>
          </div>
          <div>
            <label className={lbl}>LinkedIn</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[11px] pointer-events-none" style={{ color: '#404068' }}>
                in/
              </span>
              <input
                type="text" placeholder="handle" value={data.linkedin}
                onChange={e => update({ linkedin: e.target.value })}
                onFocus={() => setFocused('linkedin')} onBlur={() => setFocused(null)}
                className={`${base} ${bc('linkedin')} pl-9`}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onNext} disabled={!canProceed}
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
