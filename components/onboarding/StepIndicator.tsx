'use client'

interface Props {
  current: number
  total: number
}

const LABELS = ['Basic Info', 'Skills', 'Interests', 'Goals']

export default function StepIndicator({ current, total }: Props) {
  return (
    <div className="flex items-center w-full">
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1
        const active = n === current
        const done = n < current
        return (
          <div key={n} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-all duration-300"
                style={{
                  background: done ? '#7C5CFC' : active ? '#7C5CFC22' : '#1C1C2C',
                  border: `1.5px solid ${done || active ? '#7C5CFC' : 'rgba(255,255,255,0.08)'}`,
                  color: done ? '#fff' : active ? '#7C5CFC' : '#404070',
                  boxShadow: active ? '0 0 12px #7C5CFC44' : 'none',
                }}
              >
                {done ? (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2.5 6.5L5.5 9.5L10.5 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : n}
              </div>
              <span
                className="text-[10px] whitespace-nowrap font-medium transition-colors duration-200"
                style={{ color: active ? '#7C5CFC' : done ? '#6060A0' : '#3C3C60' }}
              >
                {LABELS[i]}
              </span>
            </div>
            {n < total && (
              <div
                className="flex-1 h-px mx-1.5 mb-4 transition-all duration-500"
                style={{ background: done ? 'linear-gradient(90deg, #7C5CFC, #7C5CFC80)' : 'rgba(255,255,255,0.06)' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
