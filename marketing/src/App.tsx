import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import ThemeToggle from './components/ThemeToggle'

import Home from './pages/Home'
import MarketingMix from './pages/fundamentals/MarketingMix'
import STP from './pages/fundamentals/STP'
import DigitalChannels from './pages/digital/DigitalChannels'
import MarketingFunnel from './pages/digital/MarketingFunnel'
import Metrics from './pages/analytics/Metrics'
import ABTestingUTM from './pages/analytics/ABTestingUTM'
import BrandPlatform from './pages/brand/BrandPlatform'
import ContentStrategy from './pages/brand/ContentStrategy'
import Targeting from './pages/performance/Targeting'
import UnitEcon from './pages/performance/UnitEcon'
import InterviewQuestions from './pages/interview/InterviewQuestions'
import LifecycleCRM from './pages/lifecycle/LifecycleCRM'
import AttributionMartech from './pages/analytics/AttributionMartech'

const sections = [
  {
    title: 'Основы',
    links: [
      { to: '/fundamentals/marketing-mix', icon: '🎯', label: 'Marketing Mix (4P/7P)' },
      { to: '/fundamentals/stp', icon: '🔍', label: 'STP-анализ' },
    ],
  },
  {
    title: 'Digital',
    links: [
      { to: '/digital/channels', icon: '📱', label: 'Каналы продвижения' },
      { to: '/digital/funnel', icon: '🔻', label: 'Маркетинговая воронка' },
    ],
  },
  {
    title: 'Аналитика',
    links: [
      { to: '/analytics/metrics', icon: '📊', label: 'Метрики маркетинга' },
      { to: '/analytics/ab-testing', icon: '🧪', label: 'A/B тесты и UTM' },
      { to: '/analytics/attribution', icon: '📡', label: 'Атрибуция и MarTech' },
    ],
  },
  {
    title: 'Бренд',
    links: [
      { to: '/brand/platform', icon: '💎', label: 'Бренд-платформа' },
      { to: '/brand/content', icon: '✍️', label: 'Контент-стратегия' },
    ],
  },
  {
    title: 'Performance',
    links: [
      { to: '/performance/targeting', icon: '🎯', label: 'Таргетинг и аудитории' },
      { to: '/performance/unit-economics', icon: '💰', label: 'Unit-экономика' },
    ],
  },
  {
    title: 'Lifecycle',
    links: [
      { to: '/lifecycle/crm', icon: '♻️', label: 'Lifecycle и CRM' },
    ],
  },
  {
    title: 'Собеседование',
    links: [
      { to: '/interview/questions', icon: '🎤', label: 'Вопросы и ответы' },
    ],
  },
]

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('marketing-sidebar-collapsed') === 'true')
  const location = useLocation()

  useEffect(() => { setSidebarOpen(false) }, [location])
  useEffect(() => { localStorage.setItem('marketing-sidebar-collapsed', String(collapsed)) }, [collapsed])

  return (
    <>
      <ScrollToTop />

      {/* Mobile header */}
      <div className="mobile-header">
        <button className="hamburger-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
        <h1>📢 Marketing 101</h1>
      </div>

      {sidebarOpen && <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />}

      <div className={`app-layout${collapsed ? ' layout-collapsed' : ''}`}>
        <nav className={`sidebar${sidebarOpen ? ' sidebar-open' : ''}${collapsed ? ' sidebar-collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-header-top">
              <h1>📢 Marketing 101</h1>
              <ThemeToggle />
            </div>
            <p>Интерактивный курс</p>
            <a href={import.meta.env.VITE_DEPLOY_TARGET === 'github-pages' ? new URL('..', window.location.origin + import.meta.env.BASE_URL).toString() : 'http://localhost:3200'} className="back-to-index">← Все курсы</a>
          </div>

          <div className="nav-section">
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <span className="nav-link-icon">🏠</span> Обзор
            </NavLink>
          </div>

          {sections.map(section => (
            <div key={section.title} className="nav-section">
              <div className="nav-section-title">{section.title}</div>
              {section.links.map(link => (
                <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                  <span className="nav-link-icon">{link.icon}</span> {link.label}
                </NavLink>
              ))}
            </div>
          ))}

          <button className="sidebar-collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? '▶' : '◀'} <span className="collapse-text">{collapsed ? 'Развернуть' : 'Свернуть'}</span>
          </button>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fundamentals/marketing-mix" element={<MarketingMix />} />
            <Route path="/fundamentals/stp" element={<STP />} />
            <Route path="/digital/channels" element={<DigitalChannels />} />
            <Route path="/digital/funnel" element={<MarketingFunnel />} />
            <Route path="/analytics/metrics" element={<Metrics />} />
            <Route path="/analytics/ab-testing" element={<ABTestingUTM />} />
            <Route path="/analytics/attribution" element={<AttributionMartech />} />
            <Route path="/brand/platform" element={<BrandPlatform />} />
            <Route path="/brand/content" element={<ContentStrategy />} />
            <Route path="/performance/targeting" element={<Targeting />} />
            <Route path="/performance/unit-economics" element={<UnitEcon />} />
            <Route path="/lifecycle/crm" element={<LifecycleCRM />} />
            <Route path="/interview/questions" element={<InterviewQuestions />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
