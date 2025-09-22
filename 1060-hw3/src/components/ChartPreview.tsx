import React from 'react'
import type { OnboardingModel } from '../types/onboarding'

interface Props {
	model: OnboardingModel
}

// Simple horizontal bar chart preview using SVG
const ChartPreview: React.FC<Props> = ({ model }) => {
	const keys = Object.keys(model)
	const width = 400
	const rowH = 20

	return (
		<svg width={width} height={rowH * keys.length} style={{border: '1px solid #eee', borderRadius: 6}}>
			{keys.map((k, i) => {
				const item = model[k as keyof OnboardingModel]!
				const impW = (item.importance / 100) * (width - 100)
				const focusW = (item.focus / 100) * (width - 100)
				const y = i * rowH
				return (
					<g key={k} transform={`translate(0, ${y})`}>
						<text x={6} y={14} fontSize={12} fill="#222">{k}</text>
						<rect x={100} y={4} width={impW} height={12} fill="#c7def8" />
						<rect x={100} y={4} width={focusW} height={12} fill="#2563eb" opacity={0.9} />
					</g>
				)
			})}
		</svg>
	)
}

export default ChartPreview
