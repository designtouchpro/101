import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import ThemeToggle from './components/ThemeToggle'
import Home from './pages/Home'
import LeadershipStyles from './pages/leadership/LeadershipStyles'
import DelegationBoard from './pages/leadership/DelegationBoard'
import TeamMaturity from './pages/leadership/TeamMaturity'
import OneOnOneGuide from './pages/oneOnOne/OneOnOneGuide'
import FeedbackModels from './pages/oneOnOne/FeedbackModels'
import ConflictStyles from './pages/conflicts/ConflictStyles'
import ConflictResolution from './pages/conflicts/ConflictResolution'
import TaskDecomposition from './pages/decomposition/TaskDecomposition'
import EstimationTechniques from './pages/decomposition/EstimationTechniques'
import GuildsCommunities from './pages/processes/GuildsCommunities'
import TeamTopologies from './pages/processes/TeamTopologies'
import TechRadar from './pages/processes/TechRadar'
import HiringPerformance from './pages/people/HiringPerformance'
import OrgHealth from './pages/people/OrgHealth'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    localStorage.getItem('teamlead-sidebar-collapsed') === 'true'
  )

  const handleNavClick = () => setMobileMenuOpen(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      localStorage.setItem('teamlead-sidebar-collapsed', String(!prev))
      return !prev
    })
  }

  return (
    <>
      <ScrollToTop />

      <header className="mobile-header">
        <button
          className="hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
        <h1>👨‍💼 TeamLead 101</h1>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div className={`app-layout ${sidebarCollapsed ? 'layout-collapsed' : ''}`}>
        <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-header-top">
              <h1>👨‍💼 TeamLead 101</h1>
              <ThemeToggle />
            </div>
            <p>Интерактивный курс</p>
            <a href={import.meta.env.VITE_DEPLOY_TARGET === 'github-pages' ? new URL('..', window.location.origin + import.meta.env.BASE_URL).toString() : 'http://localhost:3200'} className="back-to-index">← Все плейграунды</a>
          </div>

          <nav className="nav-section">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end onClick={handleNavClick}>
              <span className="nav-link-icon">🏠</span>
              Главная
            </NavLink>

            <div className="nav-section-title">Лидерство</div>

            <NavLink to="/leadership/styles" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🎭</span>
              Стили лидерства
            </NavLink>

            <NavLink to="/leadership/delegation" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🎯</span>
              Делегирование
            </NavLink>

            <NavLink to="/leadership/maturity" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📈</span>
              Зрелость команды
            </NavLink>

            <div className="nav-section-title">1-on-1 и фидбек</div>

            <NavLink to="/one-on-one/guide" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🤝</span>
              1-on-1 встречи
            </NavLink>

            <NavLink to="/one-on-one/feedback" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">💬</span>
              Модели фидбека
            </NavLink>

            <div className="nav-section-title">Конфликты</div>

            <NavLink to="/conflicts/styles" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⚔️</span>
              Стили поведения
            </NavLink>

            <NavLink to="/conflicts/resolution" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🕊️</span>
              Разрешение
            </NavLink>

            <div className="nav-section-title">Декомпозиция</div>

            <NavLink to="/decomposition/tasks" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧩</span>
              Декомпозиция задач
            </NavLink>

            <NavLink to="/decomposition/estimation" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🃏</span>
              Оценка задач
            </NavLink>

            <div className="nav-section-title">Процессы</div>

            <NavLink to="/processes/guilds" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏛️</span>
              Гильдии и CoP
            </NavLink>

            <NavLink to="/processes/topologies" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔷</span>
              Team Topologies
            </NavLink>

            <NavLink to="/processes/tech-radar" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📡</span>
              Tech Radar
            </NavLink>

            <div className="nav-section-title">Люди</div>

            <NavLink to="/people/hiring-performance" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">👥</span>
              Найм и оценка
            </NavLink>

            <NavLink to="/people/org-health" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🌡️</span>
              Здоровье команды
            </NavLink>

            <button className="sidebar-collapse-btn" onClick={toggleSidebar}>
              {sidebarCollapsed ? '»' : '«'}
              <span className="collapse-text">{sidebarCollapsed ? 'Развернуть' : 'Свернуть'}</span>
            </button>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leadership/styles" element={<LeadershipStyles />} />
            <Route path="/leadership/delegation" element={<DelegationBoard />} />
            <Route path="/leadership/maturity" element={<TeamMaturity />} />
            <Route path="/one-on-one/guide" element={<OneOnOneGuide />} />
            <Route path="/one-on-one/feedback" element={<FeedbackModels />} />
            <Route path="/conflicts/styles" element={<ConflictStyles />} />
            <Route path="/conflicts/resolution" element={<ConflictResolution />} />
            <Route path="/decomposition/tasks" element={<TaskDecomposition />} />
            <Route path="/decomposition/estimation" element={<EstimationTechniques />} />
            <Route path="/processes/guilds" element={<GuildsCommunities />} />
            <Route path="/processes/topologies" element={<TeamTopologies />} />
            <Route path="/processes/tech-radar" element={<TechRadar />} />
            <Route path="/people/hiring-performance" element={<HiringPerformance />} />
            <Route path="/people/org-health" element={<OrgHealth />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
