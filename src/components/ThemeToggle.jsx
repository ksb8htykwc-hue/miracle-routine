import { useData } from '../context/DataContext'
import { SunIcon, MoonIcon } from './Icons'

export default function ThemeToggle() {
  const { data, setTheme } = useData()
  const isLight = data.theme === 'light'
  return (
    <button
      type="button"
      className="theme-toggle neo"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      aria-label="Changer de thème"
    >
      {isLight ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
