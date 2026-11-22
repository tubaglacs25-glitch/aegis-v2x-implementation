'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, CircleAlert, ClipboardCheck, LoaderCircle, Sparkles } from 'lucide-react'
import styles from './aegis-evaluator.module.css'

type Criterion = {
  name: string
  score: number
  rationale: string
}

type EvaluationResult = {
  title: string
  overallScore: number
  isReady: boolean
  summary: string
  criteria: Criterion[]
  strengths: string[]
  improvements: { criterion: string; action: string }[]
}

const rubric = [
  { name: 'Code Quality', detail: 'Clarity, structure, and maintainability' },
  { name: 'Security', detail: 'Input handling, access, and risk awareness' },
  { name: 'Efficiency', detail: 'Algorithmic and resource efficiency' },
  { name: 'Testing', detail: 'Coverage, edge cases, and reliability' },
  { name: 'Accessibility', detail: 'Semantics, keyboard use, and inclusion' },
  { name: 'Problem Statement Alignment', detail: 'Fit between the problem and solution' },
]

export function AegisEvaluator() {
  const [title, setTitle] = useState('')
  const [submission, setSubmission] = useState('')
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [error, setError] = useState('')
  const [errorLink, setErrorLink] = useState('')
  const [loading, setLoading] = useState(false)

  const evaluate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submission.trim().length < 20) {
      setError('Add at least 20 characters so the reviewer has something meaningful to assess.')
      setErrorLink('')
      return
    }
    setLoading(true)
    setError('')
    setErrorLink('')
    setResult(null)
    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, submission }),
      })
      const data = await response.json()
      if (!response.ok) {
        setErrorLink(typeof data.setupUrl === 'string' ? data.setupUrl : '')
        setError(data.error || 'The evaluation could not be completed.')
        return
      }
      setResult(data as EvaluationResult)
    } catch (cause) {
      setErrorLink('')
      setError(cause instanceof Error ? cause.message : 'The evaluation could not be completed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.evaluator} aria-label="AI submission evaluation">
      <div className={styles.introCard}>
        <div className={styles.introMark}><Sparkles size={18} /></div>
        <div>
          <p className={styles.kicker}>AI QUALITY REVIEW <span>·</span> SIX SIGNALS</p>
          <h2>See what&apos;s strong. Know what to improve.</h2>
          <p className={styles.introCopy}>Submit code or a project brief for a grounded review across the rubric. Every score is evidence-based, with a clear path toward 80+.</p>
        </div>
        <div className={styles.targetBadge}><span>READINESS TARGET</span><strong>80<span>/100</span></strong></div>
      </div>

      <div className={styles.workspace}>
        <form className={styles.formCard} onSubmit={evaluate} aria-busy={loading}>
          <div className={styles.sectionHead}>
            <div><span className={styles.step}>01</span><h3>Your submission</h3></div>
            <span className={styles.privateNote}>Sent to AI Gateway · not saved by AEGIS</span>
          </div>
          <label className={styles.fieldLabel} htmlFor="evaluation-title">Project or submission name <span>OPTIONAL</span></label>
          <input id="evaluation-title" className={styles.titleInput} value={title} onChange={(event) => setTitle(event.target.value)} maxLength={80} placeholder="e.g. Road hazard detection" />
          <label className={styles.fieldLabel} htmlFor="evaluation-submission">Code, project brief, or implementation notes <span>REQUIRED</span></label>
          <textarea id="evaluation-submission" className={styles.submissionInput} value={submission} onChange={(event) => setSubmission(event.target.value)} maxLength={20000} minLength={20} required placeholder="Paste the work you want reviewed. Include relevant code, tests, accessibility decisions, and the problem it solves for the most useful assessment." />
          <div className={styles.inputMeta}><span>Up to 20,000 characters · submitted content is treated as untrusted text and never executed</span><span>{submission.length.toLocaleString()}/20,000</span></div>
          {error && <div className={styles.error} role="alert"><CircleAlert size={16} /><div><span>{error}</span>{errorLink && <a href={errorLink} target="_blank" rel="noreferrer">Open AI Gateway settings <ArrowRight size={13} /></a>}</div></div>}
          <div className={styles.submitRow}>
            <p>AI feedback is guidance, not a formal security audit or certification.</p>
            <button className={styles.submitButton} type="submit" disabled={loading || submission.trim().length < 20}>
              {loading ? <><LoaderCircle className={styles.spinner} size={16} /> Evaluating…</> : <>Evaluate submission <ArrowRight size={16} /></>}</button>
          </div>
        </form>

        <aside className={styles.rubricCard} aria-label="Evaluation criteria">
          <div className={styles.sectionHead}><div><span className={styles.step}>02</span><h3>Evaluation criteria</h3></div><span className={styles.countBadge}>06</span></div>
          <p className={styles.rubricIntro}>Each area is scored from 0–100 against the evidence you provide.</p>
          <ul className={styles.rubricList}>{rubric.map((item, index) => <li key={item.name}><span className={styles.rubricIndex}>{String(index + 1).padStart(2, '0')}</span><div><strong>{item.name}</strong><small>{item.detail}</small></div></li>)}</ul>
          <div className={styles.threshold}><span className={styles.thresholdDot} /><span><b>80+ per criterion</b><small>Ready for review when every score reaches target</small></span></div>
        </aside>
      </div>

      <div className={styles.resultRegion} aria-live="polite">
        {loading && <div className={styles.loadingCard}><span className={styles.loadingIcon}><Sparkles size={19} /></span><div><strong>Reviewing your submission</strong><p>Checking each criterion against the evidence provided…</p></div><LoaderCircle className={styles.spinner} size={18} /></div>}
        {result && <section className={styles.resultCard} aria-label="Evaluation result">
          <div className={styles.resultHeader}>
            <div><p className={styles.kicker}>REVIEW COMPLETE <span>·</span> {result.title}</p><h3>{result.isReady ? 'Ready for review' : 'Your next improvements'}</h3><p className={styles.resultSummary}>{result.summary}</p></div>
            <div className={`${styles.overallScore} ${result.isReady ? styles.ready : ''}`}><span>OVERALL</span><strong>{result.overallScore}</strong><small>/ 100</small></div>
          </div>
          <div className={styles.resultDivider} />
          <div className={styles.resultSectionHead}><h4>Detailed score breakdown</h4><span>Target: 80 in every category</span></div>
          <div className={styles.scoreGrid}>{result.criteria.map((criterion) => <article className={styles.scoreItem} key={criterion.name}>
            <div className={styles.scoreTop}><h5>{criterion.name}</h5><strong className={criterion.score >= 80 ? styles.scoreReady : criterion.score >= 70 ? styles.scoreClose : styles.scoreLow}>{criterion.score}</strong></div>
            <div className={styles.track} role="progressbar" aria-label={`${criterion.name} score`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={criterion.score}><span className={criterion.score >= 80 ? styles.trackReady : criterion.score >= 70 ? styles.trackClose : styles.trackLow} style={{ width: `${criterion.score}%` }} /></div>
            <p>{criterion.rationale}</p>
          </article>)}</div>
          <div className={styles.feedbackGrid}>
            <section className={styles.feedbackBlock}><h4><CheckCircle2 size={16} /> What&apos;s working</h4><ul>{result.strengths.map((strength, index) => <li key={`${index}-${strength}`}>{strength}</li>)}</ul></section>
            <section className={styles.feedbackBlock}><h4><ClipboardCheck size={16} /> Actions to reach 80+</h4><ul>{result.improvements.map((item, index) => <li key={`${index}-${item.criterion}`}><b>{item.criterion}</b>{item.action}</li>)}</ul></section>
          </div>
        </section>}
      </div>
    </section>
  )
}
