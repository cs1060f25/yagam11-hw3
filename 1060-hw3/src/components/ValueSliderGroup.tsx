import React from 'react'
import type { OnboardingModel, ValueKey } from '../types/onboarding'

interface Props {
	model: OnboardingModel
	onChange: (model: OnboardingModel) => void
}

const ValueSliderGroup: React.FC<Props> = ({ model, onChange }) => {
	const keys = Object.keys(model) as ValueKey[]

	const update = (k: ValueKey, field: 'importance' | 'focus', value: number) => {
		const next = { ...model, [k]: { ...model[k], [field]: value } }
		onChange(next)
	}

	return (
		<div style={{display: 'grid', gap: 12}}>
			{keys.map(k => (
				<div key={k} style={{padding: 8, border: '1px solid #eee', borderRadius: 6}}>
					<div style={{display: 'flex', justifyContent: 'space-between'}}>
						<strong>{k}</strong>
						<small>importance: {model[k].importance} • focus: {model[k].focus}</small>
					</div>
					<div style={{display: 'grid', gap: 6, marginTop: 8}}>
						<label style={{fontSize: 12}}>Importance</label>
						<input type="range" min={0} max={100} value={model[k].importance}
							onChange={(e) => update(k, 'importance', Number(e.target.value))} />
						<label style={{fontSize: 12}}>Current Focus</label>
						<input type="range" min={0} max={100} value={model[k].focus}
							onChange={(e) => update(k, 'focus', Number(e.target.value))} />
					</div>
				</div>
			))}
		</div>
	)
}

export default ValueSliderGroup
