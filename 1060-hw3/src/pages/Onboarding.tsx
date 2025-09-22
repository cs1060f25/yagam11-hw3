import React, { useEffect, useState } from 'react'
import Stepper from '../components/Stepper'
import storage from '../lib/storage'

type ValueKey = 'Career' | 'Health' | 'Learning' | 'Family' | 'Social' | 'Contribution'
type Choice = 'Low' | 'Medium' | 'High'
type ChoiceModel = Record<ValueKey, Choice>

const CATEGORIES: ValueKey[] = ['Career','Health','Learning','Family','Social','Contribution']
const STORAGE_KEY = 'onboarding'
const steps = ['Welcome','Values','Review']

const defaultModel = (): ChoiceModel => {
	return CATEGORIES.reduce((acc, k) => ({ ...acc, [k]: 'Medium' as Choice }), {} as ChoiceModel)
}

const Onboarding: React.FC<{navigate: (to: string) => void}> = ({ navigate }) => {
	const [step, setStep] = useState(0)
	const [model, setModel] = useState<ChoiceModel>(defaultModel)

	useEffect(() => {
		const saved = storage.getStorage<Record<string, string>>(STORAGE_KEY)
		if (saved) {
			// validate and adopt saved shape if possible
			const hasAll = CATEGORIES.every(k => typeof saved[k] === 'string')
			if (hasAll) setModel(saved as ChoiceModel)
		}
	}, [])

	useEffect(() => {
		storage.setStorage(STORAGE_KEY, model)
	}, [model])

	const setChoice = (k: ValueKey, v: Choice) => setModel(prev => ({ ...prev, [k]: v }))

	const continueToDashboard = () => {
		storage.setStorage(STORAGE_KEY, model)
		navigate('/dashboard')
	}

	return (
		<div style={{maxWidth: 720}}>
			<Stepper step={step} steps={steps} onChange={setStep} />

			<div style={{marginTop: 16}}>
				{step === 0 && (
					<section>
						<h2>Welcome</h2>
						<p>Welcome Alex! Let's set up your values to help you stay balanced.</p>
						<div style={{marginTop: 12}}>
							<button onClick={() => setStep(1)}>Start</button>
						</div>
					</section>
				)}

				{step === 1 && (
					<section>
						<h2>Choose how important each value is to you</h2>
						<div style={{display: 'grid', gap: 12, marginTop: 12}}>
							{CATEGORIES.map(cat => (
								<div key={cat} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 8, border: '1px solid #eee', borderRadius: 6}}>
									<div style={{fontWeight: 600}}>{cat}</div>
									<div style={{display: 'flex', gap: 8}}>
										{(['Low','Medium','High'] as Choice[]).map(c => (
											<button
												key={c}
												onClick={() => setChoice(cat, c)}
												style={{
													padding: '6px 10px',
													borderRadius: 6,
													border: model[cat] === c ? '2px solid #2563eb' : '1px solid #ddd',
													background: model[cat] === c ? '#eef2ff' : 'white',
													cursor: 'pointer'
												}}
											>
												{c}
											</button>
										))}
									</div>
								</div>
							))}
						</div>

						<div style={{display: 'flex', gap: 8, marginTop: 12}}>
							<button onClick={() => setStep(0)}>Back</button>
							<button onClick={() => setStep(2)}>Next</button>
						</div>
					</section>
				)}

				{step === 2 && (
					<section>
						<h2>Review your choices</h2>
						<ul style={{marginTop: 12}}>
							{CATEGORIES.map(c => (
								<li key={c} style={{padding: 6, borderBottom: '1px solid #f4f4f4'}}>
									<strong>{c}</strong>: <span style={{marginLeft: 8}}>{model[c]}</span>
								</li>
							))}
						</ul>

						<div style={{display: 'flex', gap: 8, marginTop: 12}}>
							<button onClick={() => setStep(1)}>Back</button>
							<button onClick={continueToDashboard}>Continue to Dashboard</button>
						</div>
					</section>
				)}
			</div>
		</div>
	)
}

export default Onboarding
