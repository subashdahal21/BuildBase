'use client'

const BUILDER_LABELS = ['Basic Info', 'Skills', 'Interests', 'Goals']
const INVESTOR_LABELS = ['Profile', 'Investment', 'Sectors', 'Goals']

interface Props {
  current: number
  total: number
  accentColor?: string
  labels?: string[]
}

export default function StepIndicator({ current, total, accentColor = '#7C5CFC', labels }: Props) {
  const LABELS = labels ?? (accentColor === '#F59E0B' ? INVESTOR_LABELS : BUILDER_LABELS)
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
                  background: done ? accentColor : active ? accentColor + '22' : '#1C1C2C',
                  border: `1.5px solid ${done || active ? accentColor : 'rgba(255,255,255,0.08)'}`,
                  color: done ? '#fff' : active ? accentColor : '#404070',
                  boxShadow: active ? `0 0 12px ${accentColor}44` : 'none',
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
                style={{ color: active ? accentColor : done ? '#6060A0' : '#3C3C60' }}
              >
                {LABELS[i]}
              </span>
            </div>
            {n < total && (
              <div
                className="flex-1 h-px mx-1.5 mb-4 transition-all duration-500"
                style={{ background: done ? `linear-gradient(90deg, ${accentColor}, ${accentColor}80)` : 'rgba(255,255,255,0.06)' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
