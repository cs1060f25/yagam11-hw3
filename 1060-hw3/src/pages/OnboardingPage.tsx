import React, { useState } from 'react'
import ValueSelector from '../components/ValueSelector'
import type { Choice } from '../components/ValueSelector'

const CATEGORIES = ['Career','Family','Health','Learning','Social','Contribution']

const OnboardingPage: React.FC<{navigate: (to: string) => void}> = ({ navigate }) => {
  const [step, setStep] = useState(1)
  const [choices, setChoices] = useState<Record<string, Choice>>(() => {
    const initial: Record<string, Choice> = {}
    CATEGORIES.forEach(c => { initial[c] = 'Strong now' })
    return initial
  })

  const setChoice = (category: string, value: Choice) => {
    setChoices(prev => ({ ...prev, [category]: value }))
  }

  return (
    <div>
      {step === 1 && (
        <main className="hero">
          <div className="hero__inner">
            <h1 className="hero__title">Welcome to Voca</h1>
            <p className="hero__subtitle">Voca isn’t here to add tasks — it’s here to keep your life in balance with your values.</p>
            <div style={{marginTop: 24}}>
              <button className="btn-primary" onClick={() => setStep(2)}>Get Started</button>
            </div>
          </div>
        </main>
      )}

      {step === 2 && (
        <section style={{padding: '24px'}}>
          <h2 className="section-title">Your Values Today</h2>
          <p className="section-sub">For each category pick the option that best describes your current situation.</p>

          <div className="values-grid">
            {CATEGORIES.map(cat => (
              <ValueSelector key={cat} category={cat} value={choices[cat]} onChange={(v) => setChoice(cat, v)} />
            ))}
          </div>

          <div style={{display: 'flex', gap: 8, marginTop: 16}}>
            <button onClick={() => setStep(1)}>Back</button>
            <button className="btn-primary" onClick={() => navigate('/dashboard')}>Continue</button>
          </div>
        </section>
      )}
    </div>
  )
}

export default OnboardingPage
