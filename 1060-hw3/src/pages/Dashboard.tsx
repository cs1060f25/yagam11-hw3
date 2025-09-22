import React, { useEffect, useState } from 'react'
import storage from '../lib/storage'
import type { OnboardingModel } from '../types/onboarding'
import ChartPreview from '../components/ChartPreview'

const STORAGE_KEY = 'onboarding'

type ChoiceModel = Record<string, string>

const isNumericModel = (v: any): v is OnboardingModel => {
	if (!v || typeof v !== 'object') return false
	const keys = ['Career','Health','Learning','Family','Social','Contribution']
	return keys.every(k => v[k] && typeof v[k].importance === 'number' && typeof v[k].focus === 'number')
}

const isChoiceModel = (v: any): v is ChoiceModel => {
	if (!v || typeof v !== 'object') return false
	const keys = ['Career','Health','Learning','Family','Social','Contribution']
	return keys.every(k => typeof v[k] === 'string')
}

const Dashboard: React.FC<{navigate: (to: string) => void}> = ({ navigate }) => {
	const [raw, setRaw] = useState<any>(null)

	useEffect(() => {
		const saved = storage.getStorage<any>(STORAGE_KEY)
		if (saved) setRaw(saved)
	}, [])

	return (
		<div>
			<h1>Dashboard</h1>
			{raw ? (
				<div>
					{isNumericModel(raw) ? (
						<>
							<p>Your value map</p>
							<ChartPreview model={raw} />
							<div style={{marginTop: 12}}>
								<button onClick={() => navigate('/onboarding')}>Edit values</button>
							</div>
						</>
					) : isChoiceModel(raw) ? (
						<>
							<p>Your choices</p>
							<ul style={{listStyle: 'none', padding: 0}}>
								{Object.keys(raw).map(k => (
									<li key={k} style={{padding: 8, borderBottom: '1px solid #f4f4f4'}}>
										<strong>{k}</strong>: <span style={{marginLeft: 8}}>{raw[k]}</span>
									</li>
								))}
							</ul>
							<div style={{marginTop: 12}}>
								<button onClick={() => navigate('/onboarding')}>Edit values</button>
							</div>
						</>
					) : (
						<>
							<p>Saved data is in an unexpected format.</p>
							<pre style={{background: '#fafafa', padding: 12}}>{JSON.stringify(raw, null, 2)}</pre>
							<div style={{marginTop: 12}}>
								<button onClick={() => navigate('/onboarding')}>Re-run onboarding</button>
							</div>
						</>
					)}
				</div>
			) : (
				<div>
					<p>No onboarding found. <button onClick={() => navigate('/onboarding')}>Start Onboarding</button></p>
				</div>
			)}
		</div>
	)
}

export default Dashboard
