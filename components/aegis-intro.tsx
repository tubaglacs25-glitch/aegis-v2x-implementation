'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Play, SkipForward } from 'lucide-react'
import { IndiaNetworkMap } from '@/components/india-network-map'

const scenes = [
  { kicker: 'THE MOMENT BEFORE', title: 'Every second matters.', copy: 'On a road that never sleeps, one moment can change everything.', visual: 'road' },
  { kicker: 'AWARENESS, IN REAL TIME', title: 'Introducing intelligent road safety.', copy: 'A connected view of risk, road conditions, and what lies ahead.', visual: 'network' },
  { kicker: 'ONE CONNECTED ECOSYSTEM', title: 'Detect. Predict. Respond.', copy: 'Road intelligence. Vehicle awareness. Emergency coordination.', visual: 'ecosystem' },
  { kicker: 'A CLEARER PATH TO HELP', title: 'From accident detection to emergency response.', copy: 'A simulated SOS shares location and surfaces nearby care — no real dispatch.', visual: 'response' },
  { kicker: 'INTRODUCING AEGIS·V2X', title: 'AEGIS·V2X', copy: 'INTELLIGENT ROAD SAFETY & EMERGENCY RESPONSE', visual: 'brand' },
] as const
const durations = [5000, 5000, 6000, 6000, 6000]

export function AegisIntro({ onFinish, reducedMotion = false }: { onFinish: () => void; reducedMotion?: boolean }) {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [systemReducedMotion, setSystemReducedMotion] = useState(false)
  const [exiting, setExiting] = useState(false)
  const shouldReduceMotion = reducedMotion || systemReducedMotion
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const complete = useRef(false)
  const finish = () => {
    if (complete.current) return
    complete.current = true
    setExiting(true)
    if (timer.current) clearTimeout(timer.current)
    exitTimer.current = setTimeout(onFinish, shouldReduceMotion ? 0 : 650)
  }

  useEffect(() => {
    setSystemReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    const duration = shouldReduceMotion ? 1800 : durations[sceneIndex]
    timer.current = setTimeout(() => {
      if (sceneIndex === scenes.length - 1) finish()
      else setSceneIndex((current) => current + 1)
    }, duration)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [sceneIndex, shouldReduceMotion])

  const scene = scenes[sceneIndex]
  return (
    <main className={`aegis-intro ${shouldReduceMotion ? 'intro-reduced' : ''} ${exiting ? 'is-exiting' : ''}`} aria-label="AEGIS-V2X product introduction">
      <div className="intro-grain" aria-hidden="true" />
      <header className="intro-topline">
        <a className="intro-wordmark" href="/" aria-label="AEGIS V2X home"><span className="intro-shield">A</span><span>AEGIS<span className="intro-dot">·</span>V2X</span></a>
        <div className="intro-counter"><span>PRODUCT FILM</span><i />{String(sceneIndex + 1).padStart(2, '0')} <small>/ 05</small></div>
        <button className="intro-skip" onClick={finish}>Skip intro <SkipForward size={14} /></button>
      </header>

      <div className={`intro-visual visual-${scene.visual}`} key={scene.visual} aria-hidden="true">
        <div className="visual-horizon" />
        <div className="visual-fog fog-one" /><div className="visual-fog fog-two" />
        <div className="visual-grid" />
        {scene.visual === 'road' && <><div className="highway"><i /><i /><i /></div><div className="car car-one"/><div className="car car-two"/><div className="risk-flare"/></>}
        {scene.visual === 'network' && <><IndiaNetworkMap mode="network"/><div className="network-lines"><i/><i/><i/><i/><i/><i/></div><div className="network-node node-a"/><div className="network-node node-b"/><div className="network-node node-c"/><div className="network-label">ROAD NETWORK / INDIA</div><div className="data-signal signal-a"/><div className="data-signal signal-b"/></>}
        {scene.visual === 'ecosystem' && <><IndiaNetworkMap mode="ecosystem"/><div className="ecosystem-visual"><div className="eco-line"/><div className="eco-node"><span>01</span><b>ROAD</b><small>INTELLIGENCE</small></div><div className="eco-node"><span>02</span><b>VEHICLE</b><small>INTELLIGENCE</small></div><div className="eco-node"><span>03</span><b>RESPONSE</b><small>INTELLIGENCE</small></div></div></>}
        {scene.visual === 'response' && <><IndiaNetworkMap mode="response"/><div className="response-road"/><div className="response-car"><i/></div><div className="sos-pulse">SOS</div><div className="response-route route-one"/><div className="response-route route-two"/><div className="hospital-mark hospital-one">+</div><div className="hospital-mark hospital-two">+</div><span className="response-caption">SIMULATED RESPONSE NETWORK</span></>}
        {scene.visual === 'brand' && <div className="brand-emblem"><div className="emblem-ring"><div className="emblem-shield">A<span /></div></div><div className="brand-light"/></div>}
      </div>

      <section className="intro-copy" key={`copy-${sceneIndex}`} aria-live="polite">
        <p className="intro-kicker"><span />{scene.kicker}</p>
        <h1>{scene.title}</h1>
        <p className={`intro-description ${scene.visual === 'brand' ? 'intro-brand-description' : ''}`}>{scene.copy}</p>
        {sceneIndex === scenes.length - 1 && <p className="intro-tagline">Safer Roads. Faster Response. Smarter Mobility.</p>}
      </section>

      <footer className="intro-footer">
        <div className="intro-progress" aria-label={`Scene ${sceneIndex + 1} of ${scenes.length}`}>
          {scenes.map((item, index) => <span key={item.kicker} className={index <= sceneIndex ? 'is-active' : ''}><i style={index === sceneIndex ? { animationDuration: `${shouldReduceMotion ? 1800 : durations[index]}ms` } : undefined} /></span>)}
        </div>
        <button className="intro-continue" onClick={() => sceneIndex === scenes.length - 1 ? finish() : setSceneIndex((current) => current + 1)}>
          {sceneIndex === scenes.length - 1 ? 'Enter AEGIS' : 'Continue'} <ArrowRight size={15} />
        </button>
      </footer>
      <span className="intro-sound-note"><Play size={10} /> SILENT BY DESIGN</span>
    </main>
  )
}

export function FirstVisitIntro() {
  const [ready, setReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motion.matches)
    if (window.localStorage.getItem('aegis-intro-seen') === 'true') {
      window.location.replace('/sign-in')
      return
    }
    setReady(true)
  }, [])
  if (!ready) return <main className="intro-loading" aria-label="Loading AEGIS-V2X introduction"><div className="intro-loading-mark">A</div></main>
  return <AegisIntro reducedMotion={reducedMotion} onFinish={() => {
    window.localStorage.setItem('aegis-intro-seen', 'true')
    window.location.assign('/sign-in')
  }} />
}
