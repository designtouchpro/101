import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('qa-theme') as Theme) || 'dark')

  useEffect(() => {
    const root = document.documentElement
    const apply = (t: 'dark' | 'light') => { root.setAttribute('data-theme', t) }
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      apply(mq.matches ? 'dark' : 'light')
      const handler = (e: MediaQueryListEvent) => apply(e.matches ? 'dark' : 'light')
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
    apply(theme)
  }, [theme])

  const cycle = () => {
    const next: Theme = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'
    setTheme(next)
    localStorage.setItem('qa-theme', next)
  }

  const icon = theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '💻'

  return (
    <button onClick={cycle} className="theme-toggle" title={`Theme: ${theme}`}>
      {icon}
    </button>
  )
}
