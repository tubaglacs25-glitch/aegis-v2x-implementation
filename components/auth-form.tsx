'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const isSignUp = mode === 'sign-up'

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const result = isSignUp
        ? await authClient.signUp.email({ email: email.trim(), password, name: name.trim() })
        : await authClient.signIn.email({ email: email.trim(), password })
      if (result.error) {
        setError(isSignUp ? 'Could not create your account. Check the details, or sign in if you already registered.' : 'We couldn’t sign in with those details. If this is your first visit, create an account below; otherwise check your email and password.')
        return
      }
      router.replace('/')
      router.refresh()
    } catch {
      setError('Sign-in is temporarily unavailable. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-screen">
      <div className="auth-ambient" aria-hidden="true" />
      <section className="auth-card" aria-labelledby="auth-title">
        <Link href="/" className="auth-brand"><span className="auth-emblem">A</span><span>AEGIS<span>·</span>V2X</span></Link>
        <p className="auth-eyebrow">CONNECTED ROAD SAFETY</p>
        <h1 id="auth-title">{isSignUp ? 'Join the network.' : 'Welcome back.'}</h1>
        <p className="auth-description">{isSignUp ? 'Create your secure AEGIS command account.' : 'Sign in to your AEGIS command workspace.'}</p>
        <Link href="/" className="auth-demo-link">Explore the full demo without signing in <ArrowRight size={15} /></Link>
        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignUp && <label className="auth-field"><span>Full name</span><input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required maxLength={80} placeholder="Your name" /></label>}
          <label className="auth-field"><span>Email address</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required maxLength={254} placeholder="you@company.com" /></label>
          <label className="auth-field"><span>Password</span><span className="auth-password-control"><input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={isSignUp ? 'new-password' : 'current-password'} minLength={isSignUp ? 8 : undefined} maxLength={128} required placeholder={isSignUp ? 'At least 8 characters' : 'Enter your password'} /><button className="auth-password-toggle" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></span></label>
          {error && <div className="auth-error" role="alert"><span>{isSignUp ? 'Could not create the account. If you already registered, sign in instead.' : error}</span>{isSignUp && <Link href="/sign-in">Sign in</Link>}</div>}
          <button className="auth-submit" disabled={loading} type="submit">{loading ? 'Please wait…' : isSignUp ? 'Create account' : 'Sign in'} <ArrowRight size={16} /></button>
        </form>
        <p className="auth-switch">{isSignUp ? 'Already have an account?' : 'New to AEGIS?'} <Link href={isSignUp ? '/sign-in' : '/sign-up'}>{isSignUp ? 'Sign in' : 'Create an account'}</Link></p>
        <div className="auth-assurance"><ShieldCheck size={15} /><span>Protected with encrypted sessions</span></div>
      </section>
      <aside className="auth-story" aria-label="AEGIS road safety mission">
        <div className="auth-story-mark"><div className="story-road"><i/><i/><i/></div><div className="story-signal signal-1"/><div className="story-signal signal-2"/><div className="story-signal signal-3"/></div>
        <div><span className="auth-story-label">SEE THE RISK. CHANGE THE OUTCOME.</span><p>Every journey deserves<br/>a safer way forward.</p></div>
        <span className="auth-story-foot">INTELLIGENT ROAD SAFETY & EMERGENCY RESPONSE</span>
      </aside>
    </main>
  )
}
