'use client'

import { BuilderOnboardingData } from '@/app/onboarding/builder/page'

interface Props {
  data: BuilderOnboardingData
}

export default function StepDone({ data }: Props) {
  const firstName = data.fullName.split(' ')[0]

  return (
    <div className="min-h-screen bg-[#0C0C12] flex flex-col items-center justify-center px-4 py-12 font-['DM_Sans',sans-serif] relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7C5CFC] rounded-full opacity-[0.06] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#10B981] rounded-full opacity-[0.05] blur-3xl pointer-events-none" />

      <div className="flex items-center gap-2.5 mb-12 z-10">
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#1C1C28" />
          <path d="M8 16 C8 11 11.5 8 16 8 C20.5 8 24 11 24 16" stroke="#7C5CFC" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 16 C8 21 11.5 24 16 24 C20.5 24 24 21 24 16" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2.5" fill="#7C5CFC" />
        </svg>
        <span className="font-['Cabinet_Grotesk',sans-serif] text-lg font-black text-[#F0F0F8]">Buildbase</span>
      </div>

      <div className="w-full max-w-md bg-[#171720] border border-white/[0.06] rounded-2xl p-8 sm:p-10 text-center z-10 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center mx-auto mb-6">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M6 15L12 21L24 9" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="font-['Cabinet_Grotesk',sans-serif] text-3xl sm:text-4xl font-black text-[#F0F0F8] mb-3">
          {firstName ? `Welcome, ${firstName}!` : "You're all set!"}
        </h1>
        <p className="text-sm text-[#6060A0] leading-relaxed mb-8 max-w-xs mx-auto">
          Your builder profile is ready. Start exploring, connecting, and building what matters.
        </p>

        {data.skills.length > 0 && (
          <div className="mb-5">
            <div className="text-[10px] uppercase tracking-widest text-[#404068] mb-2.5">Your skills</div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {data.skills.slice(0, 6).map(s => (
                <span key={s} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: '#7C5CFC18', border: '0.5px solid #7C5CFC40', color: '#A080FF' }}>
                  {s}
                </span>
              ))}
              {data.skills.length > 6 && (
                <span className="px-2.5 py-1 rounded-full text-xs" style={{ background: '#7C5CFC10', color: '#5050A0' }}>
                  +{data.skills.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {data.interests.length > 0 && (
          <div className="mb-8">
            <div className="text-[10px] uppercase tracking-widest text-[#404068] mb-2.5">Interests</div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {data.interests.slice(0, 4).map(i => (
                <span key={i} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: '#10B98118', border: '0.5px solid #10B98140', color: '#10B981' }}>
                  {i}
                </span>
              ))}
              {data.interests.length > 4 && (
                <span className="px-2.5 py-1 rounded-full text-xs" style={{ background: '#10B98110', color: '#5050A0' }}>
                  +{data.interests.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        <button
          onClick={() => { window.location.href = '/dashboard/builder' }}
          className="w-full py-3.5 rounded-xl text-sm font-semibold text-white mb-3 font-['DM_Sans',sans-serif]"
          style={{ background: 'linear-gradient(135deg, #7C5CFC, #6046E0)', boxShadow: '0 4px 24px #7C5CFC44' }}
        >
          Go to Dashboard →
        </button>

        <button
          onClick={() => { window.location.href = '/profile' }}
          className="w-full py-3.5 rounded-xl text-sm font-semibold text-[#8080A0] border border-white/[0.08] hover:border-white/20 transition-colors font-['DM_Sans',sans-serif]"
        >
          View my profile
        </button>
      </div>

      <p className="text-xs text-[#303050] mt-6 z-10">You can update everything in your profile settings anytime.</p>
    </div>
  )
}
