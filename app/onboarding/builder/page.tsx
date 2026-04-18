'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import StepIndicator from '@/components/onboarding/StepIndicator'
import StepBasicInfo from '@/components/onboarding/builder/StepBasicInfo'
import StepSkills from '@/components/onboarding/builder/StepSkills'
import StepInterests from '@/components/onboarding/builder/StepInterests'
import StepGoals from '@/components/onboarding/builder/StepGoals'
import StepDone from '@/components/onboarding/builder/StepDone'

export type BuilderOnboardingData = {
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
  fromGithub: boolean
}

const TOTAL_STEPS = 4

const STEP_COPY = [
  { title: 'Set up your profile', sub: 'Let the community know who you are.' },
  { title: 'Showcase your skills', sub: 'Help others understand what you bring to the table.' },
  { title: 'Pick your interests', sub: "We'll personalise your feed around what excites you." },
  { title: 'Define your goals', sub: "Tell us what you're here to accomplish." },
]

function BuilderOnboardingContent() {
  const searchParams = useSearchParams()
  const fromGithub = searchParams.get('from') === 'github'

  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [data, setData] = useState<BuilderOnboardingData>({
    fullName: '', username: '', location: '', bio: '', avatar: null,
    skills: [], interests: [], goals: [], github: '', linkedin: '',
    fromGithub,
  })

  useEffect(() => {
    if (fromGithub) {
      try {
        const raw = localStorage.getItem('githubUser')
        if (raw) {
          const githubUser = JSON.parse(raw)
          setData(d => ({
            ...d,
            fullName: githubUser.name || '',
            github: githubUser.github || '',
            fromGithub: true,
          }))
        }
      } catch {}
    } else {
      const name = localStorage.getItem('signupName') || ''
      if (name) setData(d => ({ ...d, fullName: name }))
    }
  }, [fromGithub])

  const update = (partial: Partial<BuilderOnboardingData>) =>
    setData(d => ({ ...d, ...partial }))

  const next = () => step < TOTAL_STEPS ? setStep(s => s + 1) : setDone(true)
  const back = () => setStep(s => s - 1)

  if (done) return <StepDone data={data} />

  const copy = STEP_COPY[step - 1]

  return (
    <div className="min-h-screen bg-[#0C0C12] flex flex-col lg:flex-row font-['DM_Sans',sans-serif]">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] xl:w-[480px] shrink-0 border-r border-white/5 px-12 py-10 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#7C5CFC] rounded-full opacity-[0.08] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#10B981] rounded-full opacity-[0.06] blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2.5 z-10">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#1C1C28" />
            <path d="M8 16 C8 11 11.5 8 16 8 C20.5 8 24 11 24 16" stroke="#7C5CFC" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 16 C8 21 11.5 24 16 24 C20.5 24 24 21 24 16" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="16" r="2.5" fill="#7C5CFC" />
          </svg>
          <span className="font-['Cabinet_Grotesk',sans-serif] text-xl font-black text-[#F0F0F8]">Buildbase</span>
        </div>

        <div className="z-10 py-12">
          <div className="inline-flex items-center gap-2 bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 rounded-full px-3 py-1 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFC] animate-pulse" />
            <span className="text-[11px] font-semibold text-[#7C5CFC] tracking-wide uppercase">
              User/Builder · Step {step} of {TOTAL_STEPS}
            </span>
          </div>
          <h1 className="font-['Cabinet_Grotesk',sans-serif] text-4xl xl:text-5xl font-black text-[#F0F0F8] leading-[1.1] mb-4">
            {copy.title}
          </h1>
          <p className="text-[#7070A0] text-base leading-relaxed max-w-xs">
            {copy.sub}
          </p>
          {fromGithub && step === 1 && (
            <div className="mt-6 flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#7C5CFC]/8 border border-[#7C5CFC]/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#A080FF">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span className="text-xs text-[#A080FF]">GitHub details pre-filled — just confirm or update them.</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 z-10">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div key={i} className="h-1 rounded-full transition-all duration-300" style={{
              width: i + 1 === step ? 32 : 8,
              background: i + 1 <= step ? '#7C5CFC' : 'rgba(255,255,255,0.1)',
              opacity: i + 1 > step ? 0.4 : 1,
            }} />
          ))}
          <span className="text-xs text-[#5050A0] ml-2">{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center px-4 sm:px-6 py-8 lg:py-10 overflow-y-auto">
        <div className="flex lg:hidden items-center gap-2.5 mb-6 self-start">
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#1C1C28" />
            <path d="M8 16 C8 11 11.5 8 16 8 C20.5 8 24 11 24 16" stroke="#7C5CFC" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 16 C8 21 11.5 24 16 24 C20.5 24 24 21 24 16" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="16" r="2.5" fill="#7C5CFC" />
          </svg>
          <span className="font-['Cabinet_Grotesk',sans-serif] text-lg font-black text-[#F0F0F8]">Buildbase</span>
        </div>

        <div className="flex lg:hidden flex-col w-full max-w-lg mb-6">
          <div className="inline-flex items-center gap-2 bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 rounded-full px-3 py-1 mb-3 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFC]" />
            <span className="text-[11px] font-semibold text-[#7C5CFC] tracking-wide uppercase">
              User/Builder · Step {step} of {TOTAL_STEPS}
            </span>
          </div>
          <h1 className="font-['Cabinet_Grotesk',sans-serif] text-2xl sm:text-3xl font-black text-[#F0F0F8] leading-tight mb-1">
            {copy.title}
          </h1>
          <p className="text-[#7070A0] text-sm">{copy.sub}</p>
        </div>

        <div className="w-full max-w-lg mb-6">
          <StepIndicator current={step} total={TOTAL_STEPS} />
        </div>

        <div className="w-full max-w-lg bg-[#171720] border border-white/[0.06] rounded-2xl p-6 sm:p-8 shadow-2xl">
          {step === 1 && <StepBasicInfo data={data} update={update} onNext={next} />}
          {step === 2 && <StepSkills data={data} update={update} onNext={next} onBack={back} />}
          {step === 3 && <StepInterests data={data} update={update} onNext={next} onBack={back} />}
          {step === 4 && <StepGoals data={data} update={update} onNext={next} onBack={back} />}
        </div>

        <p className="text-xs text-[#3C3C60] mt-5">You can update all of this later in your profile settings</p>
      </div>
    </div>
  )
}

export default function BuilderOnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0C0C12] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#7C5CFC] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <BuilderOnboardingContent />
    </Suspense>
  )
}
