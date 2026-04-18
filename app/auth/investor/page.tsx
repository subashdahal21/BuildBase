'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type View = 'signup' | 'signin'

const ACCENT = '#F59E0B'
const GRADIENT = 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)'

function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="x32" height="32" rx="8" fill="#1C1C28" />
        <path d="M8 16 C8 11 11.5 8 16 8 C20.5 8 24 11 24 16" stroke="#7C5CFC" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 16 C8 21 11.5 24 16 24 C20.5 24 24 21 24 16" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="16" r="2.5" fill="#7C5CFC" />
      </svg>
      <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 20, fontWeight: 800, color: '#F0F0F8' }}>
        Buildbase
      </span>
    </div>
  )
}

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" />
      <path d="M12 3 A9 9 0 0 1 21 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function inputStyle(focused: string | null, name: string): React.CSSProperties {
  return {
    width: '100%', background: '#0E0E18',
    border: `1px solid ${focused === name ? ACCENT + '80' : 'rgba(255,255,255,0.08)'}`,
    boxShadow: focused === name ? `0 0 0 3px ${ACCENT}18` : 'none',
    borderRadius: 12, padding: '14px 16px', fontSize: 15, color: '#F0F0F8',
    outline: 'none', boxSizing: 'border-box', fontFamily: "'DM Sans', sans-serif",
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }
}

function InvestorSignUp({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', range: '' })
  const [focused, setFocused] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    localStorage.setItem('userRole', 'investor')
    localStorage.setItem('signupName', form.name)
    router.push('/onboarding/investor')
  }

  return (
    <div style={{ width: '100%', maxWidth: 460 }}>
      <div className="lg:hidden" style={{ marginBottom: 32 }}><Logo /></div>

      <Link href="/auth" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        color: '#60608A', fontSize: 14, textDecoration: 'none', marginBottom: 32,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to role select
      </Link>

      <div style={{ marginBottom: 28 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: ACCENT + '12', border: `1px solid ${ACCENT}28`,
          borderRadius: 999, padding: '5px 14px', fontSize: 12, fontWeight: 600,
          color: ACCENT, marginBottom: 16, letterSpacing: '0.02em',
        }}>
          <svg width="12" height="12" viewBox="0 0 22 22" fill="none">
            <path d="M3 16L8 10L12 13L19 6" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 6H19V10" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Investor Account
        </div>
        <h2 style={{
          fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(26px, 4vw, 32px)',
          fontWeight: 900, color: '#F0F0F8', marginBottom: 8, letterSpacing: '-0.5px', lineHeight: 1.15,
        }}>
          Create your account
        </h2>
        <p style={{ fontSize: 15, color: '#7070A0', fontWeight: 300, lineHeight: 1.6 }}>
          Discover and fund the next generation of builders.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={{ fontSize: 13, color: '#8080A8', fontWeight: 500, marginBottom: 8, display: 'block', letterSpacing: '0.01em' }}>
            Full name
          </label>
          <input
            type="text" placeholder="Your full name" value={form.name} required
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
            style={inputStyle(focused, 'name')}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, color: '#8080A8', fontWeight: 500, marginBottom: 8, display: 'block', letterSpacing: '0.01em' }}>
            Email address
          </label>
          <input
            type="email" placeholder="you@example.com" value={form.email} required
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
            style={inputStyle(focused, 'email')}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, color: '#8080A8', fontWeight: 500, marginBottom: 8, display: 'block', letterSpacing: '0.01em' }}>
            Password
          </label>
          <input
            type="password" placeholder="Min. 8 characters" value={form.password} required minLength={8}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
            style={inputStyle(focused, 'password')}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, color: '#8080A8', fontWeight: 500, marginBottom: 8, display: 'block', letterSpacing: '0.01em' }}>
            Typical investment range
          </label>
          <input
            type="text" placeholder="e.g. $25K–$100K" value={form.range}
            onChange={e => setForm(f => ({ ...f, range: e.target.value }))}
            onFocus={() => setFocused('range')} onBlur={() => setFocused(null)}
            style={inputStyle(focused, 'range')}
          />
        </div>
        <button
          type="submit" disabled={loading}
          style={{
            marginTop: 4, padding: '15px 0', borderRadius: 12,
            background: loading ? ACCENT + '80' : GRADIENT, border: 'none',
            color: '#fff', fontSize: 16, fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: "'DM Sans', sans-serif", display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: loading ? 'none' : `0 4px 24px ${ACCENT}40`, transition: 'all 0.2s',
          }}
        >
          {loading ? <><Spinner /> Creating account…</> : 'Create investor account'}
        </button>
      </form>

      <p style={{ fontSize: 12, color: '#40406080', textAlign: 'center', marginTop: 16, lineHeight: 1.7 }}>
        By continuing you agree to our{' '}
        <span style={{ color: ACCENT, cursor: 'pointer' }}>Terms</span> and{' '}
        <span style={{ color: ACCENT, cursor: 'pointer' }}>Privacy Policy</span>.
      </p>

      <p style={{ fontSize: 15, color: '#7070A0', textAlign: 'center', marginTop: 20 }}>
        Already have an account?{' '}
        <button onClick={onSwitch} style={{
          background: 'none', border: 'none', color: ACCENT, fontSize: 15,
          cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, padding: 0,
        }}>
          Sign in
        </button>
      </p>
    </div>
  )
}

function InvestorSignIn({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [focused, setFocused] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    localStorage.setItem('userRole', 'investor')
    router.push('/dashboard/investor')
  }

  return (
    <div style={{ width: '100%', maxWidth: 460 }}>
      <div className="lg:hidden" style={{ marginBottom: 32 }}><Logo /></div>

      <Link href="/auth" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        color: '#60608A', fontSize: 14, textDecoration: 'none', marginBottom: 32,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to role select
      </Link>

      <div style={{ marginBottom: 28 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: ACCENT + '12', border: `1px solid ${ACCENT}28`,
          borderRadius: 999, padding: '5px 14px', fontSize: 12, fontWeight: 600,
          color: ACCENT, marginBottom: 16, letterSpacing: '0.02em',
        }}>
          <svg width="12" height="12" viewBox="0 0 22 22" fill="none">
            <path d="M3 16L8 10L12 13L19 6" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 6H19V10" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Investor Sign In
        </div>
        <h2 style={{
          fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(26px, 4vw, 32px)',
          fontWeight: 900, color: '#F0F0F8', marginBottom: 8, letterSpacing: '-0.5px', lineHeight: 1.15,
        }}>
          Welcome back
        </h2>
        <p style={{ fontSize: 15, color: '#7070A0', fontWeight: 300, lineHeight: 1.6 }}>
          Sign in to your investor portal.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={{ fontSize: 13, color: '#8080A8', fontWeight: 500, marginBottom: 8, display: 'block', letterSpacing: '0.01em' }}>
            Email address
          </label>
          <input
            type="email" placeholder="you@example.com" value={form.email} required
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
            style={inputStyle(focused, 'email')}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, color: '#8080A8', fontWeight: 500, letterSpacing: '0.01em' }}>Password</label>
            <button type="button" style={{
              background: 'none', border: 'none', color: ACCENT, fontSize: 13,
              cursor: 'pointer', padding: 0, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
            }}>Forgot password?</button>
          </div>
          <input
            type="password" placeholder="Your password" value={form.password} required
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
            style={inputStyle(focused, 'password')}
          />
        </div>
        <button
          type="submit" disabled={loading}
          style={{
            marginTop: 4, padding: '15px 0', borderRadius: 12,
            background: loading ? ACCENT + '80' : GRADIENT, border: 'none',
            color: '#fff', fontSize: 16, fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: "'DM Sans', sans-serif", display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: loading ? 'none' : `0 4px 24px ${ACCENT}40`, transition: 'all 0.2s',
          }}
        >
          {loading ? <><Spinner /> Signing in…</> : 'Sign in'}
        </button>
      </form>

      <p style={{ fontSize: 15, color: '#7070A0', textAlign: 'center', marginTop: 24 }}>
        Don&apos;t have an account?{' '}
        <button onClick={onSwitch} style={{
          background: 'none', border: 'none', color: ACCENT, fontSize: 15,
          cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, padding: 0,
        }}>
          Sign up free
        </button>
      </p>
    </div>
  )
}

function FloatingCard({ initials, color, name, role, tag, offset }: {
  initials: string; color: string; name: string; role: string; tag: string; offset?: boolean
}) {
  return (
    <div className="float-card" style={{
      display: 'flex', alignItems: 'center', gap: 14, background: '#13131E',
      border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px 18px',
      marginLeft: offset ? 40 : 0, width: 'fit-content', minWidth: 280,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%', background: color + '22',
        border: `1.5px solid ${color}55`, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 13, fontWeight: 700, color, flexShrink: 0,
      }}>{initials}</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F0F8' }}>{name}</div>
        <div style={{ fontSize: 12, color: '#7070A0', marginTop: 1 }}>{role}</div>
        <div style={{
          marginTop: 5, fontSize: 11, color, background: color + '15',
          border: `0.5px solid ${color}30`, borderRadius: 999, padding: '2px 9px',
          display: 'inline-block', fontWeight: 500,
        }}>{tag}</div>
      </div>
    </div>
  )
}

export default function InvestorAuthPage() {
  const [view, setView] = useState<View>('signup')

  return (
    <main style={{ display: 'flex', minHeight: '100dvh', background: '#0C0C12', fontFamily: "'DM Sans', sans-serif" }}>
      <div className="auth-left">
        <div style={{ position: 'absolute', top: -120, right: -120, width: 500, height: 500, background: '#F59E0B', borderRadius: '50%', opacity: 0.06, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 380, height: 380, background: '#10B981', borderRadius: '50%', opacity: 0.05, pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, zIndex: 1 }}>
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="9" fill="#1C1C28" />
            <path d="M8 16 C8 11 11.5 8 16 8 C20.5 8 24 11 24 16" stroke="#7C5CFC" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M8 16 C8 21 11.5 24 16 24 C20.5 24 24 21 24 16" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="16" cy="16" r="2.5" fill="#7C5CFC" />
          </svg>
          <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: '#F0F0F8', letterSpacing: '-0.3px' }}>
            Buildbase
          </span>
        </div>

        <div style={{ zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#F59E0B15', border: '0.5px solid #F59E0B30',
            borderRadius: 999, padding: '5px 14px',
            fontSize: 12, fontWeight: 600, color: '#F59E0B',
            marginBottom: 20, letterSpacing: '0.02em',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B', boxShadow: '0 0 6px #F59E0B' }} />
            Investor portal
          </div>
          <h1 style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 900, color: '#F0F0F8',
            lineHeight: 1.1, marginBottom: 20, letterSpacing: '-1.5px',
          }}>
            Fund what<br />
            <span style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              matters.
            </span>
          </h1>
          <p style={{ fontSize: 16, color: '#7070A0', lineHeight: 1.75, maxWidth: 360, fontWeight: 300 }}>
            Discover high-signal projects with real commit history, verified teams, and strong execution momentum.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 32 }}>
            {[
              { icon: '🔍', text: 'Browse verified projects with GitHub activity' },
              { icon: '📈', text: 'AI-curated deal flow based on your thesis' },
              { icon: '💬', text: 'Direct messaging with founder teams' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <span style={{ fontSize: 14, color: '#8080A0' }}>{text}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 28, marginTop: 36 }}>
            {[['$4M+', 'Funded'], ['320+', 'Investors'], ['1.2K+', 'Projects']].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 20, fontWeight: 800, color: '#F59E0B', letterSpacing: '-0.5px' }}>{val}</div>
                <div style={{ fontSize: 11, color: '#50507A', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, zIndex: 1 }}>
          <FloatingCard initials="SR" color="#F59E0B" name="Sarah R." role="Investor · FinTech" tag="$50K–$200K range" />
          <FloatingCard initials="DW" color="#F59E0B" name="David W." role="Angel Investor · SaaS" tag="$10K–$50K range" offset />
          <FloatingCard initials="LM" color="#10B981" name="Lisa M." role="VC Partner · AI/ML" tag="$100K–$500K range" />
        </div>
      </div>

      <div className="auth-right">
        {view === 'signup'
          ? <InvestorSignUp onSwitch={() => setView('signin')} />
          : <InvestorSignIn onSwitch={() => setView('signup')} />
        }
      </div>
    </main>
  )
}
