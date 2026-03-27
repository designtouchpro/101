import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import ThemeToggle from './components/ThemeToggle'
import Home from './pages/Home'
import ScrumKanban from './pages/methodologies/ScrumKanban'
import WaterfallHybrid from './pages/methodologies/WaterfallHybrid'
import Estimation from './pages/estimation/Estimation'
import Velocity from './pages/estimation/Velocity'
import BurndownCharts from './pages/metrics/BurndownCharts'
import LeadCycleTime from './pages/metrics/LeadCycleTime'
import RiskMatrix from './pages/risks/RiskMatrix'
import RiskChangeManagement from './pages/risks/RiskChangeManagement'
import StakeholderMap from './pages/communication/StakeholderMap'
import MeetingTypes from './pages/communication/MeetingTypes'
import WBS from './pages/artifacts/WBS'
import DoRDoD from './pages/artifacts/DoRDoD'
import BudgetEstimation from './pages/planning/BudgetEstimation'
import ScopeManagement from './pages/planning/ScopeManagement'
import ProjectCharter from './pages/planning/ProjectCharter'
import ExecutionControl from './pages/execution/ExecutionControl'
import InterviewQuestions from './pages/interview/InterviewQuestions'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    localStorage.getItem('project-sidebar-collapsed') === 'true'
  )

  const handleNavClick = () => setMobileMenuOpen(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      localStorage.setItem('project-sidebar-collapsed', String(!prev))
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
        <h1>📋 Project 101</h1>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div className={`app-layout ${sidebarCollapsed ? 'layout-collapsed' : ''}`}>
        <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-header-top">
              <h1>📋 Project 101</h1>
              <ThemeToggle />
            </div>
            <p>Проджект-менеджмент</p>
            <a href={import.meta.env.VITE_DEPLOY_TARGET === 'github-pages' ? new URL('..', window.location.origin + import.meta.env.BASE_URL).toString() : 'http://localhost:3200'} className="back-to-index">← Все плейграунды</a>
          </div>

          <nav className="nav-section">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end onClick={handleNavClick}>
              <span className="nav-link-icon">🏠</span>
              Главная
            </NavLink>

            <div className="nav-section-title">Методологии</div>

            <NavLink to="/methodologies/scrum-kanban" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔄</span>
              Scrum vs Kanban
            </NavLink>

            <NavLink to="/methodologies/waterfall" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏗️</span>
              Waterfall & Hybrid
            </NavLink>

            <div className="nav-section-title">Планирование</div>

            <NavLink to="/planning/charter" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📜</span>
              Project Charter
            </NavLink>

            <NavLink to="/planning/scope" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🎯</span>
              Управление Scope
            </NavLink>

            <NavLink to="/planning/budget" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">💰</span>
              Бюджетирование
            </NavLink>

            <div className="nav-section-title">Оценка</div>

            <NavLink to="/estimation/techniques" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🃏</span>
              Техники оценки
            </NavLink>

            <NavLink to="/estimation/velocity" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📈</span>
              Velocity & Capacity
            </NavLink>

            <div className="nav-section-title">Метрики</div>

            <NavLink to="/metrics/burndown" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📉</span>
              Burndown & Burnup
            </NavLink>

            <NavLink to="/metrics/lead-cycle" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⏱️</span>
              Lead & Cycle Time
            </NavLink>

            <div className="nav-section-title">Риски</div>

            <NavLink to="/risks/matrix" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⚠️</span>
              Матрица рисков
            </NavLink>

            <NavLink to="/risks/change-management" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔗</span>
              Зависимости и изменения
            </NavLink>

            <div className="nav-section-title">Коммуникация</div>

            <NavLink to="/communication/stakeholders" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">👥</span>
              Stakeholder Map
            </NavLink>

            <NavLink to="/communication/meetings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🗓️</span>
              Типы встреч
            </NavLink>

            <div className="nav-section-title">Артефакты</div>

            <NavLink to="/artifacts/wbs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🌳</span>
              WBS-декомпозиция
            </NavLink>

            <NavLink to="/artifacts/dor-dod" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">✅</span>
              DoR & DoD
            </NavLink>

            <div className="nav-section-title">Исполнение</div>

            <NavLink to="/execution/control" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⚙️</span>
              Исполнение и контроль
            </NavLink>

            <div className="nav-section-title">Собеседование</div>

            <NavLink to="/interview/questions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🎤</span>
              Вопросы и ответы
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
            <Route path="/methodologies/scrum-kanban" element={<ScrumKanban />} />
            <Route path="/methodologies/waterfall" element={<WaterfallHybrid />} />
            <Route path="/planning/charter" element={<ProjectCharter />} />
            <Route path="/planning/scope" element={<ScopeManagement />} />
            <Route path="/planning/budget" element={<BudgetEstimation />} />
            <Route path="/estimation/techniques" element={<Estimation />} />
            <Route path="/estimation/velocity" element={<Velocity />} />
            <Route path="/metrics/burndown" element={<BurndownCharts />} />
            <Route path="/metrics/lead-cycle" element={<LeadCycleTime />} />
            <Route path="/risks/matrix" element={<RiskMatrix />} />
            <Route path="/risks/change-management" element={<RiskChangeManagement />} />
            <Route path="/communication/stakeholders" element={<StakeholderMap />} />
            <Route path="/communication/meetings" element={<MeetingTypes />} />
            <Route path="/artifacts/wbs" element={<WBS />} />
            <Route path="/artifacts/dor-dod" element={<DoRDoD />} />
            <Route path="/execution/control" element={<ExecutionControl />} />
            <Route path="/interview/questions" element={<InterviewQuestions />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
