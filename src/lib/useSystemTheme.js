import { useEffect, useState } from 'react'

function getSystemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Suit en direct le thème du système (téléphone/ordinateur), sans rechargement.
export function useSystemTheme() {
  const [theme, setTheme] = useState(getSystemTheme)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => setTheme(mq.matches ? 'dark' : 'light')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return theme
}
