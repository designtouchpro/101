import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import ThemeToggle from './components/ThemeToggle'
import Home from './pages/Home'
import TestingFundamentals from './pages/fundamentals/TestingFundamentals'
import TestDesign from './pages/fundamentals/TestDesign'
import BugReporting from './pages/process/BugReporting'
import TestPlan from './pages/process/TestPlan'
import WebTesting from './pages/practice/WebTesting'
import APITesting from './pages/practice/APITesting'
import AutomationBasics from './pages/automation/AutomationBasics'
import TestPyramid from './pages/automation/TestPyramid'
import AutomationArchitecture from './pages/automation/AutomationArchitecture'
import QAMetrics from './pages/advanced/QAMetrics'
import CICDTesting from './pages/advanced/CICDTesting'
import SpecializedTesting from './pages/specialized/SpecializedTesting'
import BugTriagePractice from './pages/practice/BugTriagePractice'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    localStorage.getItem('qa-sidebar-collapsed') === 'true'
  )

  const handleNavClick = () => setMobileMenuOpen(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      localStorage.setItem('qa-sidebar-collapsed', String(!prev))
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
        <h1>🧪 QA 101</h1>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div className={`app-layout ${sidebarCollapsed ? 'layout-collapsed' : ''}`}>
        <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-header-top">
              <h1>🧪 QA 101</h1>
              <ThemeToggle />
            </div>
            <p>Тестирование и QA</p>
            <a href={import.meta.env.VITE_DEPLOY_TARGET === 'github-pages' ? new URL('..', window.location.origin + import.meta.env.BASE_URL).toString() : 'http://localhost:3200'} className="back-to-index">← Все плейграунды</a>
          </div>

          <nav className="nav-section">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end onClick={handleNavClick}>
              <span className="nav-link-icon">🏠</span>
              Главная
            </NavLink>

            <div className="nav-section-title">Основы</div>

            <NavLink to="/fundamentals/basics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📖</span>
              Теория тестирования
            </NavLink>

            <NavLink to="/fundamentals/test-design" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🎨</span>
              Тест-дизайн
            </NavLink>

            <div className="nav-section-title">Процессы</div>

            <NavLink to="/process/bug-reporting" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🐛</span>
              Баг-репорты
            </NavLink>

            <NavLink to="/process/test-plan" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📋</span>
              Тест-план и чек-листы
            </NavLink>

            <div className="nav-section-title">Практика</div>

            <NavLink to="/practice/web-testing" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🌐</span>
              Тестирование Web
            </NavLink>

            <NavLink to="/practice/api-testing" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔌</span>
              Тестирование API
            </NavLink>

            <NavLink to="/practice/bug-triage" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🐛</span>
              Bug Triage & Практика
            </NavLink>

            <div className="nav-section-title">Автоматизация</div>

            <NavLink to="/automation/basics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🤖</span>
              Основы автоматизации
            </NavLink>

            <NavLink to="/automation/pyramid" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔺</span>
              Пирамида тестирования
            </NavLink>

            <NavLink to="/automation/architecture" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏗️</span>
              Архитектура и Flaky
            </NavLink>

            <div className="nav-section-title">Продвинутое</div>

            <NavLink to="/advanced/metrics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📊</span>
              QA-метрики
            </NavLink>

            <NavLink to="/advanced/cicd" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔄</span>
              CI/CD и тесты
            </NavLink>

            <div className="nav-section-title">Специализация</div>

            <NavLink to="/specialized/testing" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🎯</span>
              Mobile, Security, Perf
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
            <Route path="/fundamentals/basics" element={<TestingFundamentals />} />
            <Route path="/fundamentals/test-design" element={<TestDesign />} />
            <Route path="/process/bug-reporting" element={<BugReporting />} />
            <Route path="/process/test-plan" element={<TestPlan />} />
            <Route path="/practice/web-testing" element={<WebTesting />} />
            <Route path="/practice/api-testing" element={<APITesting />} />
            <Route path="/practice/bug-triage" element={<BugTriagePractice />} />
            <Route path="/automation/basics" element={<AutomationBasics />} />
            <Route path="/automation/pyramid" element={<TestPyramid />} />
            <Route path="/automation/architecture" element={<AutomationArchitecture />} />
            <Route path="/advanced/metrics" element={<QAMetrics />} />
            <Route path="/advanced/cicd" element={<CICDTesting />} />
            <Route path="/specialized/testing" element={<SpecializedTesting />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
