export type ValueKey = 'Career' | 'Health' | 'Learning' | 'Family' | 'Social' | 'Contribution'

export interface ValuePair {
	importance: number // 0-100
	focus: number // 0-100
}

export type OnboardingModel = Record<ValueKey, ValuePair>

export const DEFAULT_ONBOARDING: OnboardingModel = {
	Career: { importance: 70, focus: 50 },
	Health: { importance: 80, focus: 40 },
	Learning: { importance: 60, focus: 45 },
	Family: { importance: 75, focus: 60 },
	Social: { importance: 50, focus: 30 },
	Contribution: { importance: 55, focus: 20 },
}
