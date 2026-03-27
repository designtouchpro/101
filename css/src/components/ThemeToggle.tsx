import { useState, useEffect } from 'react'

type Theme = 'dark' | 'light' | 'system'

const ICONS: Record<Theme, string> = { dark: '🌙', light: '☀️', system: '🖥️' }
const NEXT: Record<Theme, Theme> = { dark: 'light', light: 'system', system: 'dark' }
const LABELS: Record<Theme, string> = { dark: 'Тёмная тема', light: 'Светлая тема', system: 'Системная тема' }

function applyTheme(theme: Theme) {
  const resolved = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme
  document.documentElement.setAttribute('data-theme', resolved)
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('playground-theme')
    return (saved === 'dark' || saved === 'light' || saved === 'system') ? saved as Theme : 'system'
  })

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('playground-theme', theme)

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = (e: MediaQueryListEvent) =>
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
  }, [theme])

  const toggle = () => setTheme(prev => NEXT[prev])

  return (
    <button className="theme-toggle" onClick={toggle} title={LABELS[theme]} aria-label={LABELS[theme]}>
      <span className="theme-toggle-icon">{ICONS[theme]}</span>
    </button>
  )
}
