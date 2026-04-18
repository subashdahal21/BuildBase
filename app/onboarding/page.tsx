'use client'

import { useState } from 'react'
import StepIndicator from '@/components/onboarding/StepIndicator'
import StepBasicInfo from '@/components/onboarding/StepBasicInfo'
import StepSkills from '@/components/onboarding/StepSkills'
import StepInterests from '@/components/onboarding/StepInterests'
import StepGoals from '@/components/onboarding/StepGoals'
import StepDone from '@/components/onboarding/StepDone'

export type OnboardingData = {
  fullName: string
  username: string
  location: string
  bio: string
  avatar: string | null
  skills: string[]
  interests: string[]
  goals: string[]
  github: string
  linkedin: string
}

const TOTAL_STEPS = 4

const STEP_COPY = [
  { title: 'Set up your profile', sub: 'Let the community know who you are.' },
  { title: 'Showcase your skills', sub: 'Help others understand what you bring to the table.' },
  { title: 'Pick your interests', sub: 'We\'ll personalise your feed around what excites you.' },
  { title: 'Define your goals', sub: 'Tell us what you\'re here to accomplish.' },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    fullName: '', username: '', location: '', bio: '', avatar: null,
    skills: [], interests: [], goals: [], github: '', linkedin: '',
  })

  const update = (partial: Partial<OnboardingData>) =>
    setData(d => ({ ...d, ...partial }))

  const next = () => step < TOTAL_STEPS ? setStep(s => s + 1) : setDone(true)
  const back = () => setStep(s => s - 1)

  if (done) return <StepDone data={data} />

  const copy = STEP_COPY[step - 1]

  return (
    <div className="min-h-screen bg-[#0C0C12] flex flex-col lg:flex-row font-['DM_Sans',sans-serif]">

      {/* ── LEFT PANEL (desktop only) ── */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] xl:w-[480px] shrink-0 border-r border-white/5 px-12 py-10 relative overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#7C5CFC] rounded-full opacity-[0.08] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#10B981] rounded-full opacity-[0.06] blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-2.5 z-10">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#1C1C28" />
            <path d="M8 16 C8 11 11.5 8 16 8 C20.5 8 24 11 24 16" stroke="#7C5CFC" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 16 C8 21 11.5 24 16 24 C20.5 24 24 21 24 16" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="16" r="2.5" fill="#7C5CFC" />
          </svg>
          <span className="font-['Cabinet_Grotesk',sans-serif] text-xl font-black text-[#F0F0F8]">
            Buildbase
          </span>
        </div>

        {/* Step headline */}
        <div className="z-10 py-12">
          <div className="inline-flex items-center gap-2 bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 rounded-full px-3 py-1 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFC] animate-pulse" />
            <span className="text-[11px] font-semibold text-[#7C5CFC] tracking-wide uppercase">
              Step {step} of {TOTAL_STEPS}
            </span>
          </div>
          <h1 className="font-['Cabinet_Grotesk',sans-serif] text-4xl xl:text-5xl font-black text-[#F0F0F8] leading-[1.1] mb-4">
            {copy.title}
          </h1>
          <p className="text-[#7070A0] text-base leading-relaxed max-w-xs">
            {copy.sub}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 z-10">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i + 1 === step ? 32 : 8,
                background: i + 1 < step ? '#7C5CFC' : i + 1 === step ? '#7C5CFC' : 'rgba(255,255,255,0.1)',
                opacity: i + 1 > step ? 0.4 : 1,
              }}
            />
          ))}
          <span className="text-xs text-[#5050A0] ml-2">{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
      </div>

      {/* ── RIGHT / MAIN PANEL ── */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center px-4 sm:px-6 py-8 lg:py-10 overflow-y-auto">

        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2.5 mb-6 self-start">
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#1C1C28" />
            <path d="M8 16 C8 11 11.5 8 16 8 C20.5 8 24 11 24 16" stroke="#7C5CFC" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 16 C8 21 11.5 24 16 24 C20.5 24 24 21 24 16" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="16" r="2.5" fill="#7C5CFC" />
          </svg>
          <span className="font-['Cabinet_Grotesk',sans-serif] text-lg font-black text-[#F0F0F8]">Buildbase</span>
        </div>

        {/* Mobile step title */}
        <div className="flex lg:hidden flex-col w-full max-w-lg mb-6">
          <div className="inline-flex items-center gap-2 bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 rounded-full px-3 py-1 mb-3 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFC]" />
            <span className="text-[11px] font-semibold text-[#7C5CFC] tracking-wide uppercase">
              Step {step} of {TOTAL_STEPS}
            </span>
          </div>
          <h1 className="font-['Cabinet_Grotesk',sans-serif] text-2xl sm:text-3xl font-black text-[#F0F0F8] leading-tight mb-1">
            {copy.title}
          </h1>
          <p className="text-[#7070A0] text-sm">{copy.sub}</p>
        </div>

        {/* Step indicator */}
        <div className="w-full max-w-lg mb-6">
          <StepIndicator current={step} total={TOTAL_STEPS} />
        </div>

        {/* Card */}
        <div className="w-full max-w-lg bg-[#171720] border border-white/[0.06] rounded-2xl p-6 sm:p-8 shadow-2xl">
          {step === 1 && <StepBasicInfo data={data} update={update} onNext={next} />}
          {step === 2 && <StepSkills data={data} update={update} onNext={next} onBack={back} />}
          {step === 3 && <StepInterests data={data} update={update} onNext={next} onBack={back} />}
          {step === 4 && <StepGoals data={data} update={update} onNext={next} onBack={back} />}
        </div>

        <p className="text-xs text-[#3C3C60] mt-5">
          You can update all of this later in your profile settings
        </p>
      </div>
    </div>
  )
}
