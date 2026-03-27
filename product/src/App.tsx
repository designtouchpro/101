import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import ThemeToggle from './components/ThemeToggle'
import Home from './pages/Home'
import AARRRFunnel from './pages/metrics/AARRRFunnel'
import UnitEconomics from './pages/metrics/UnitEconomics'
import NorthStar from './pages/metrics/NorthStar'
import ProductTerms from './pages/terminology/ProductTerms'
import ProductRoles from './pages/terminology/ProductRoles'
import Discovery from './pages/processes/Discovery'
import Roadmapping from './pages/processes/Roadmapping'
import UserStoryMapping from './pages/processes/UserStoryMapping'
import ABTesting from './pages/analytics/ABTesting'
import CohortAnalysis from './pages/analytics/CohortAnalysis'
import Prioritization from './pages/strategy/Prioritization'
import GoToMarket from './pages/strategy/GoToMarket'
import FinancialModel from './pages/strategy/FinancialModel'
import PricingStrategy from './pages/strategy/PricingStrategy'
import ResearchExperiments from './pages/research/ResearchExperiments'
import InterviewQuestions from './pages/interview/InterviewQuestions'
import ProductOps from './pages/processes/ProductOps'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    localStorage.getItem('product-sidebar-collapsed') === 'true'
  )

  const handleNavClick = () => setMobileMenuOpen(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      localStorage.setItem('product-sidebar-collapsed', String(!prev))
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
        <h1>📦 Product 101</h1>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div className={`app-layout ${sidebarCollapsed ? 'layout-collapsed' : ''}`}>
        <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-header-top">
              <h1>📦 Product 101</h1>
              <ThemeToggle />
            </div>
            <p>Продакт-менеджмент</p>
            <a href={import.meta.env.VITE_DEPLOY_TARGET === 'github-pages' ? new URL('..', window.location.origin + import.meta.env.BASE_URL).toString() : 'http://localhost:3200'} className="back-to-index">← Все плейграунды</a>
          </div>

          <nav className="nav-section">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end onClick={handleNavClick}>
              <span className="nav-link-icon">🏠</span>
              Главная
            </NavLink>

            <div className="nav-section-title">Метрики</div>

            <NavLink to="/metrics/aarrr" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏴‍☠️</span>
              AARRR-воронка
            </NavLink>

            <NavLink to="/metrics/unit-economics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">💰</span>
              Unit-экономика
            </NavLink>

            <NavLink to="/metrics/north-star" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⭐</span>
              North Star Metric
            </NavLink>

            <div className="nav-section-title">Терминология</div>

            <NavLink to="/terminology/terms" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📖</span>
              Словарь продакта
            </NavLink>

            <NavLink to="/terminology/roles" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">👥</span>
              Роли в продукте
            </NavLink>

            <div className="nav-section-title">Процессы</div>

            <NavLink to="/processes/discovery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔍</span>
              Product Discovery
            </NavLink>

            <NavLink to="/processes/roadmap" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🗺️</span>
              Roadmapping
            </NavLink>

            <NavLink to="/processes/story-mapping" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🗂️</span>
              User Story Mapping
            </NavLink>

            <NavLink to="/processes/product-ops" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🤝</span>
              Product Ops & Stakeholders
            </NavLink>

            <div className="nav-section-title">Аналитика</div>

            <NavLink to="/analytics/ab-testing" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧪</span>
              A/B тестирование
            </NavLink>

            <NavLink to="/analytics/cohorts" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📊</span>
              Когортный анализ
            </NavLink>

            <div className="nav-section-title">Исследования</div>

            <NavLink to="/research/experiments" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔬</span>
              Исследования и эксперименты
            </NavLink>

            <div className="nav-section-title">Стратегия</div>

            <NavLink to="/strategy/prioritization" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⚖️</span>
              Приоритизация
            </NavLink>

            <NavLink to="/strategy/go-to-market" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🚀</span>
              Go-to-Market
            </NavLink>

            <NavLink to="/strategy/financial-model" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📊</span>
              Финансовая модель
            </NavLink>

            <NavLink to="/strategy/pricing" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">💰</span>
              Pricing и Packaging
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
            <Route path="/metrics/aarrr" element={<AARRRFunnel />} />
            <Route path="/metrics/unit-economics" element={<UnitEconomics />} />
            <Route path="/metrics/north-star" element={<NorthStar />} />
            <Route path="/terminology/terms" element={<ProductTerms />} />
            <Route path="/terminology/roles" element={<ProductRoles />} />
            <Route path="/processes/discovery" element={<Discovery />} />
            <Route path="/processes/roadmap" element={<Roadmapping />} />
            <Route path="/processes/story-mapping" element={<UserStoryMapping />} />
            <Route path="/processes/product-ops" element={<ProductOps />} />
            <Route path="/analytics/ab-testing" element={<ABTesting />} />
            <Route path="/analytics/cohorts" element={<CohortAnalysis />} />
            <Route path="/strategy/prioritization" element={<Prioritization />} />
            <Route path="/strategy/go-to-market" element={<GoToMarket />} />
            <Route path="/strategy/financial-model" element={<FinancialModel />} />
            <Route path="/strategy/pricing" element={<PricingStrategy />} />
            <Route path="/research/experiments" element={<ResearchExperiments />} />
            <Route path="/interview/questions" element={<InterviewQuestions />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
