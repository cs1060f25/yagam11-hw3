import React from 'react'

export type Choice = 'Strong now' | 'Over-invested' | 'Need more space'

interface Props {
  category: string
  value: Choice
  onChange: (value: Choice) => void
}

const choices: Choice[] = ['Strong now','Over-invested','Need more space']

const colorClass = (c: Choice) => {
  if (c === 'Strong now') return 'pill--green'
  if (c === 'Over-invested') return 'pill--orange'
  return 'pill--blue'
}

const ValueSelector: React.FC<Props> = ({ category, value, onChange }) => {
  return (
    <div className="value-card">
      <div className="value-card__title">{category}</div>
      <div className="value-card__choices">
        {choices.map(c => {
          const selected = c === value
          return (
            <button
              key={c}
              onClick={() => onChange(c)}
              aria-pressed={selected}
              className={`pill ${colorClass(c)} ${selected ? 'pill--selected' : ''}`}
            >
              {selected && (
                <svg className="pill__check" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              <span>{c}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ValueSelector
