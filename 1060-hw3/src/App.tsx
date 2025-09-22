import React, { useEffect, useState } from 'react'
import './App.css'
import Onboarding from './pages/OnboardingPage'
import Dashboard from './pages/Dashboard'

const routes = ['/','/onboarding','/dashboard']

const App: React.FC = () => {
  const [path, setPath] = useState<string>(window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (to: string) => {
    // Always push a history state so clicking the same link again will trigger navigation
    // and allow pages to remount or reset as needed.
    try {
      history.pushState(null, '', to)
    } catch (e) {
      // ignore
    }
    setPath(to)
  }

  let content: React.ReactNode
  if (path === '/' || path === '/onboarding') content = <Onboarding navigate={navigate} />
  else if (path === '/dashboard') content = <Dashboard navigate={navigate} />
  else content = (
    <div style={{padding: 24}}>
      <h1>Not found</h1>
      <p>Page not recognized — try the navigation links above.</p>
    </div>
  )

  return (
    <div>
      <header style={{padding: 12, borderBottom: '1px solid #eee'}}>
        <nav style={{display: 'flex', gap: 12, alignItems: 'center'}}>
          <a style={{cursor: 'pointer'}} onClick={() => navigate('/')}>Home</a>
          <a style={{cursor: 'pointer'}} onClick={() => navigate('/onboarding')}>Onboarding</a>
          <a style={{cursor: 'pointer'}} onClick={() => navigate('/dashboard')}>Dashboard</a>
        </nav>
      </header>
      <div style={{padding: 16}}>
        {content}
      </div>
    </div>
  )
}

export default App
