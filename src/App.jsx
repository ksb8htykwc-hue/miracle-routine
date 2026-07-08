import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useData } from './context/DataContext'
import { useAuth } from './context/AuthContext'
import { useSystemTheme } from './lib/useSystemTheme'
import Nav from './components/Nav'
import ThemeToggle from './components/ThemeToggle'
import MilestoneModal from './components/MilestoneModal'
import Home from './pages/Home'
import Routine from './pages/Routine'
import Calendrier from './pages/Calendrier'
import Sport from './pages/Sport'
import SportDay from './pages/SportDay'
import Objectifs from './pages/Objectifs'
import Login from './pages/Login'

export default function App() {
  const { data } = useData()
  const { user, loading, enabled, logout } = useAuth()
  const systemTheme = useSystemTheme()
  const effectiveTheme = data.theme === 'system' ? systemTheme : data.theme

  useEffect(() => {
    document.documentElement.dataset.theme = effectiveTheme
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', effectiveTheme === 'light' ? '#F0F0F0' : '#0F0F0F')
  }, [effectiveTheme])

  if (enabled && loading) return null
  if (enabled && !user) return <Login />

  return (
    <div className="app">
      <header className="app__header">
        <h1>Miracle Routine</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {enabled && (
            <button className="theme-toggle neo" onClick={logout} aria-label="Se déconnecter" style={{ fontSize: 11, fontWeight: 600 }}>
              ⏻
            </button>
          )}
          <ThemeToggle />
        </div>
      </header>
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/calendrier" element={<Calendrier />} />
          <Route path="/sport" element={<Sport />} />
          <Route path="/sport/:day" element={<SportDay />} />
          <Route path="/objectifs" element={<Objectifs />} />
        </Routes>
      </main>
      <Nav />
      <MilestoneModal />
    </div>
  )
}
