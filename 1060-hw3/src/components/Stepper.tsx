import React from 'react'

interface Props {
	step: number
	steps: string[]
	onChange?: (i: number) => void
}

const Stepper: React.FC<Props> = ({ step, steps, onChange }) => {
	return (
		<div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
			{steps.map((label, i) => {
				const active = i === step
				return (
					<button
						key={label}
						onClick={() => onChange?.(i)}
						style={{
							padding: '6px 10px',
							borderRadius: 6,
							border: active ? '2px solid #2563eb' : '1px solid #ddd',
							background: active ? '#eef2ff' : 'white',
							cursor: 'pointer'
						}}
					>
						{i+1}. {label}
					</button>
				)
			})}
		</div>
	)
}

export default Stepper
