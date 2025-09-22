import React from 'react'
import './App.css'

const App: React.FC = () => {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Inter, Roboto, -apple-system, sans-serif',
      padding: '1rem',
    }}>
      <h1 style={{fontSize: '3rem', margin: '0.5rem 0'}}>Hello, World!</h1>
      <p style={{fontSize: '1.25rem', color: '#444', maxWidth: 600, textAlign: 'center'}}>
      </p>
    </main>
  )
}

export default App
