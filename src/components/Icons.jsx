const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const HomeIcon = () => (
  <svg {...base}><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v9.5h13V10" /></svg>
)

export const ChecklistIcon = () => (
  <svg {...base}><path d="M9 6h11M9 12h11M9 18h11" /><path d="m3.5 6 1.2 1.2L7 4.8" /><path d="m3.5 12 1.2 1.2L7 10.8" /><path d="m3.5 18 1.2 1.2L7 15.8" /></svg>
)

export const CalendarIcon = () => (
  <svg {...base}><rect x="4" y="5.5" width="16" height="15" rx="2.5" /><path d="M4 10h16M8 3.5v3M16 3.5v3" /></svg>
)

export const DumbbellIcon = () => (
  <svg {...base}><path d="M6.5 9v6M17.5 9v6M3.5 10.5v3M20.5 10.5v3M6.5 12h11" /></svg>
)

export const TargetIcon = () => (
  <svg {...base}><circle cx="12" cy="12" r="8.2" /><circle cx="12" cy="12" r="4.2" /><circle cx="12" cy="12" r="0.6" fill="currentColor" /></svg>
)

export const SunIcon = () => (
  <svg {...base}><circle cx="12" cy="12" r="4.3" /><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.5 1.5M17.9 17.9l1.5 1.5M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.5-1.5M17.9 6.1l1.5-1.5" /></svg>
)

export const MoonIcon = () => (
  <svg {...base}><path d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z" /></svg>
)

export const AutoIcon = () => (
  <svg {...base}><circle cx="12" cy="12" r="8.5" /><path d="M12 3.5a8.5 8.5 0 0 1 0 17Z" fill="currentColor" stroke="none" /></svg>
)

export const FlameIcon = () => (
  <svg {...base}><path d="M12 3s5 4.5 5 9.5a5 5 0 1 1-10 0c0-1.5.8-2.7 1.5-3.5.2 1.2 1 2 1.7 2C9.7 8.5 10.5 5.5 12 3Z" /></svg>
)
