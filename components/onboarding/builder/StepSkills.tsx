'use client'

import { useState } from 'react'
import { BuilderOnboardingData } from '@/app/onboarding/builder/page'

interface Props {
  data: BuilderOnboardingData
  update: (partial: Partial<BuilderOnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

const SKILL_OPTIONS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js',
  'Python', 'Django', 'FastAPI', 'Go', 'Rust',
  'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes',
  'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST APIs',
  'Machine Learning', 'PyTorch', 'TensorFlow', 'LLMs', 'Data Science',
  'iOS', 'Android', 'React Native', 'Flutter', 'SwiftUI',
  'Solidity', 'Web3', 'Figma', 'UI/UX', 'DevOps',
]

export default function StepSkills({ data, update, onNext, onBack }: Props) {
  const [custom, setCustom] = useState('')

  const toggle = (skill: string) => {
    const cur = data.skills
    if (cur.includes(skill)) update({ skills: cur.filter(s => s !== skill) })
    else if (cur.length < 10) update({ skills: [...cur, skill] })
  }

  const addCustom = () => {
    const s = custom.trim()
    if (s && !data.skills.includes(s) && data.skills.length < 10) {
      update({ skills: [...data.skills, s] })
      setCustom('')
    }
  }

  const maxed = data.skills.length >= 10

  return (
    <div>
      <div className="mb-5 hidden lg:block">
        <h2 className="font-['Cabinet_Grotesk',sans-serif] text-2xl sm:text-3xl font-black text-[#F0F0F8] mb-1.5">
          What are your skills?
        </h2>
        <p className="text-sm text-[#6060A0]">Pick up to 10 that best describe your expertise.</p>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-[#5050A0]">
          {data.skills.length > 0 ? `${data.skills.length} selected` : 'None selected yet'}
        </span>
        <span className="text-xs font-medium" style={{ color: maxed ? '#F59E0B' : '#5050A0' }}>
          {maxed ? 'Max reached' : `${10 - data.skills.length} remaining`}
        </span>
      </div>

      <div className="w-full h-1 bg-white/[0.05] rounded-full mb-4 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-300" style={{
          width: `${(data.skills.length / 10) * 100}%`,
          background: maxed ? '#F59E0B' : '#7C5CFC',
        }} />
      </div>

      <div className="flex flex-wrap gap-2 mb-4 max-h-52 overflow-y-auto ob-scroll pr-1">
        {SKILL_OPTIONS.map(skill => {
          const sel = data.skills.includes(skill)
          return (
            <button
              key={skill} onClick={() => toggle(skill)}
              disabled={maxed && !sel}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border"
              style={{
                borderColor: sel ? '#7C5CFC' : 'rgba(255,255,255,0.08)',
                background: sel ? '#7C5CFC20' : 'transparent',
                color: sel ? '#A080FF' : '#7070A0',
                opacity: maxed && !sel ? 0.3 : 1,
                cursor: maxed && !sel ? 'not-allowed' : 'pointer',
                boxShadow: sel ? '0 0 8px #7C5CFC22' : 'none',
              }}
            >
              {sel && '✓ '}{skill}
            </button>
          )
        })}
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text" placeholder="Add a custom skill…" value={custom}
          onChange={e => setCustom(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addCustom()}
          className="flex-1 bg-[#0C0C12] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#F0F0F8] outline-none placeholder:text-[#3C3C60] ob-input font-['DM_Sans',sans-serif]"
        />
        <button
          onClick={addCustom} disabled={!custom.trim() || maxed}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity font-['DM_Sans',sans-serif]"
          style={{ background: '#7C5CFC', opacity: !custom.trim() || maxed ? 0.35 : 1 }}
        >
          Add
        </button>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-[#8080A0] border border-white/[0.08] hover:border-white/[0.15] transition-colors font-['DM_Sans',sans-serif]">
          ← Back
        </button>
        <button onClick={onNext} className="flex-[2] py-3.5 rounded-xl text-sm font-semibold text-white transition-all font-['DM_Sans',sans-serif]"
          style={{ background: 'linear-gradient(135deg, #7C5CFC, #6046E0)', boxShadow: '0 4px 20px #7C5CFC33' }}>
          {data.skills.length === 0 ? 'Skip for now' : 'Continue →'}
        </button>
      </div>
    </div>
  )
}
