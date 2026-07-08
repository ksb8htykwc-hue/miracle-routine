import { useData } from '../context/DataContext'
import { SunIcon, MoonIcon, AutoIcon } from './Icons'

const CYCLE = ['system', 'light', 'dark']
const LABELS = { system: 'Automatique (suit le système)', light: 'Clair', dark: 'Sombre' }
const ICONS = { system: AutoIcon, light: SunIcon, dark: MoonIcon }

export default function ThemeToggle() {
  const { data, setTheme } = useData()
  const mode = data.theme
  const Icon = ICONS[mode] || AutoIcon

  const next = () => {
    const idx = CYCLE.indexOf(mode)
    setTheme(CYCLE[(idx + 1) % CYCLE.length])
  }

  return (
    <button
      type="button"
      className="theme-toggle neo"
      onClick={next}
      aria-label={`Thème : ${LABELS[mode] || mode}. Cliquer pour changer.`}
      title={LABELS[mode] || mode}
    >
      <Icon />
    </button>
  )
}
