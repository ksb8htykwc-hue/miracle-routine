import { NavLink } from 'react-router-dom'
import { HomeIcon, ChecklistIcon, CalendarIcon, DumbbellIcon, TargetIcon } from './Icons'

const TABS = [
  { to: '/', label: 'Accueil', icon: HomeIcon, end: true },
  { to: '/routine', label: 'Routine', icon: ChecklistIcon },
  { to: '/calendrier', label: 'Calendrier', icon: CalendarIcon },
  { to: '/sport', label: 'Sport', icon: DumbbellIcon },
  { to: '/objectifs', label: 'Objectifs', icon: TargetIcon },
]

export default function Nav() {
  return (
    <nav className="nav">
      {TABS.map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav__item ${isActive ? 'nav__item--active' : ''}`}>
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
