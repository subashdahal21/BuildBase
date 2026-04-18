'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type View = 'signup' | 'signin'

const ACCENT = '#7C5CFC'
const GRADIENT = 'linear-gradient(135deg, #7C5CFC 0%, #9B7FFF 100%)'

function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#1C1C28" />
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

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
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

function BuilderSignUp({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [focused, setFocused] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [githubLoading, setGithubLoading] = useState(false)

  const handleGithub = async () => {
    setGithubLoading(true)
    await new Promise(r => setTimeout(r, 1300))
    localStorage.setItem('userRole', 'builder')
    localStorage.setItem('githubUser', JSON.stringify({ name: 'GitHub User', github: 'github-user' }))
    router.push('/onboarding/builder?from=github')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    localStorage.setItem('userRole', 'builder')
    localStorage.setItem('signupName', form.name)
    router.push('/onboarding/builder')
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
            <path d="M6 8L2 11L6 14" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 8L20 11L16 14" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 4L9 18" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
          </svg>
          User/Builder Account
        </div>
        <h2 style={{
          fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(26px, 4vw, 32px)',
          fontWeight: 900, color: '#F0F0F8', marginBottom: 8, letterSpacing: '-0.5px', lineHeight: 1.15,
        }}>
          Create your account
        </h2>
        <p style={{ fontSize: 15, color: '#7070A0', fontWeight: 300, lineHeight: 1.6 }}>
          Start building and connecting with investors.
        </p>
      </div>

      {/* GitHub CTA */}
      <button
        onClick={handleGithub}
        disabled={githubLoading}
        style={{
          width: '100%', padding: '14px 0', borderRadius: 12,
          background: githubLoading ? '#1C1C2E' : '#1A1A2A',
          border: `1px solid ${ACCENT}40`,
          color: '#F0F0F8', fontSize: 15, fontWeight: 600, cursor: githubLoading ? 'not-allowed' : 'pointer',
          fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 10, transition: 'all 0.2s',
          boxShadow: githubLoading ? 'none' : `0 0 0 1px ${ACCENT}20`,
          marginBottom: 20,
        }}
      >
        {githubLoading ? <Spinner /> : <GithubIcon />}
        {githubLoading ? 'Connecting to GitHub…' : 'Continue with GitHub'}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        <span style={{ fontSize: 12, color: '#40405A', letterSpacing: '0.05em' }}>OR</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
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
          {loading ? <><Spinner /> Creating account…</> : 'Create account'}
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

function BuilderSignIn({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [focused, setFocused] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [githubLoading, setGithubLoading] = useState(false)

  const handleGithub = async () => {
    setGithubLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    localStorage.setItem('userRole', 'builder')
    router.push('/dashboard/builder')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    localStorage.setItem('userRole', 'builder')
    router.push('/dashboard/builder')
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
            <path d="M6 8L2 11L6 14" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 8L20 11L16 14" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 4L9 18" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
          </svg>
          User/Builder Sign In
        </div>
        <h2 style={{
          fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(26px, 4vw, 32px)',
          fontWeight: 900, color: '#F0F0F8', marginBottom: 8, letterSpacing: '-0.5px', lineHeight: 1.15,
        }}>
          Welcome back
        </h2>
        <p style={{ fontSize: 15, color: '#7070A0', fontWeight: 300, lineHeight: 1.6 }}>
          Sign in to continue building.
        </p>
      </div>

      <button
        onClick={handleGithub}
        disabled={githubLoading}
        style={{
          width: '100%', padding: '14px 0', borderRadius: 12,
          background: githubLoading ? '#1C1C2E' : '#1A1A2A',
          border: `1px solid ${ACCENT}40`, color: '#F0F0F8',
          fontSize: 15, fontWeight: 600, cursor: githubLoading ? 'not-allowed' : 'pointer',
          fontFamily: "'DM Sans', sans-serif", display: 'flex',
          alignItems: 'center', justifyContent: 'center', gap: 10,
          transition: 'all 0.2s', marginBottom: 20,
          boxShadow: githubLoading ? 'none' : `0 0 0 1px ${ACCENT}20`,
        }}
      >
        {githubLoading ? <Spinner /> : <GithubIcon />}
        {githubLoading ? 'Signing in…' : 'Continue with GitHub'}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        <span style={{ fontSize: 12, color: '#40405A', letterSpacing: '0.05em' }}>OR</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
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

export default function BuilderAuthPage() {
  const [view, setView] = useState<View>('signup')

  return (
    <main style={{ display: 'flex', minHeight: '100dvh', background: '#0C0C12', fontFamily: "'DM Sans', sans-serif" }}>
      <div className="auth-left">
        <div style={{ position: 'absolute', top: -120, right: -120, width: 500, height: 500, background: '#7C5CFC', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 380, height: 380, background: '#10B981', borderRadius: '50%', opacity: 0.06, pointerEvents: 'none' }} />

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
            background: '#7C5CFC15', border: '0.5px solid #7C5CFC30',
            borderRadius: 999, padding: '5px 14px',
            fontSize: 12, fontWeight: 600, color: '#7C5CFC',
            marginBottom: 20, letterSpacing: '0.02em',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C5CFC', boxShadow: '0 0 6px #7C5CFC' }} />
            User/Builder portal
          </div>
          <h1 style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 900, color: '#F0F0F8',
            lineHeight: 1.1, marginBottom: 20, letterSpacing: '-1.5px',
          }}>
            Build your next<br />
            <span style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #A78BFA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              big thing.
            </span>
          </h1>
          <p style={{ fontSize: 16, color: '#7070A0', lineHeight: 1.75, maxWidth: 360, fontWeight: 300 }}>
            Connect with co-founders, get AI-matched with investors, and ship products that matter.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 32 }}>
            {[
              { icon: '⚡', text: 'Sign up with GitHub in seconds' },
              { icon: '🤖', text: 'AI-powered matching to investors & co-founders' },
              { icon: '📊', text: 'GitHub commit activity displayed on your profile' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <span style={{ fontSize: 14, color: '#8080A0' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, zIndex: 1 }}>
          <FloatingCard initials="MN" color="#7C5CFC" name="Mahesh N." role="Full-stack Builder" tag="React · Python · AWS" />
          <FloatingCard initials="JK" color="#10B981" name="James K." role="ML Engineer" tag="PyTorch · TensorFlow" offset />
          <FloatingCard initials="AR" color="#7C5CFC" name="Ava R." role="Frontend Builder" tag="Next.js · TypeScript" />
        </div>
      </div>

      <div className="auth-right">
        {view === 'signup'
          ? <BuilderSignUp onSwitch={() => setView('signin')} />
          : <BuilderSignIn onSwitch={() => setView('signup')} />
        }
      </div>
    </main>
  )
}
