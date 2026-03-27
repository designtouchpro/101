import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import BasicsPage from './pages/BasicsPage'
import ControlFlowPage from './pages/ControlFlowPage'
import FunctionsPage from './pages/FunctionsPage'
import OptionalsPage from './pages/OptionalsPage'
import EnumsPage from './pages/EnumsPage'
import StructsClassesPage from './pages/StructsClassesPage'
import ProtocolsPage from './pages/ProtocolsPage'
import ClosuresPage from './pages/ClosuresPage'
import ErrorHandlingPage from './pages/ErrorHandlingPage'
import GenericsPage from './pages/GenericsPage'
import ConcurrencyPage from './pages/ConcurrencyPage'
import MemoryPage from './pages/MemoryPage'
import CollectionsPage from './pages/CollectionsPage'
import ExtensionsPage from './pages/ExtensionsPage'
import ToolingPage from './pages/ToolingPage'
import AdvancedFeaturesPage from './pages/AdvancedFeaturesPage'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('swift-sidebar-collapsed') === 'true')

  const handleNavClick = () => setMobileMenuOpen(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      localStorage.setItem('swift-sidebar-collapsed', String(!prev))
      return !prev
    })
  }

  return (
    <>
      <ScrollToTop />
      <header className="mobile-header">
        <button className="hamburger-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
        <h1>🐦 Swift 101</h1>
      </header>

      {mobileMenuOpen && <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />}

      <div className={`app-layout ${sidebarCollapsed ? 'layout-collapsed' : ''}`}>
        <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-header-top">
              <h1><img src="/logo.svg" alt="" width="28" height="28" style={{ marginRight: '8px' }} /> Swift 101</h1>
              <ThemeToggle />
            </div>
            <p>Язык для iOS разработки</p>
            <a href={import.meta.env.VITE_DEPLOY_TARGET === 'github-pages' ? new URL('..', window.location.origin + import.meta.env.BASE_URL).toString() : 'http://localhost:3200'} className="back-to-index">← Все плейграунды</a>
          </div>

          <nav className="nav-section">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end onClick={handleNavClick}>
              <span className="nav-link-icon">🏠</span>Главная
            </NavLink>

            <div className="nav-section-title">Основы языка</div>
            <NavLink to="/basics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📝</span>Типы и переменные
            </NavLink>
            <NavLink to="/control-flow" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔀</span>Control Flow
            </NavLink>
            <NavLink to="/functions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⚙️</span>Функции
            </NavLink>
            <NavLink to="/closures" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📦</span>Замыкания
            </NavLink>

            <div className="nav-section-title">Типы данных</div>
            <NavLink to="/optionals" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">❓</span>Optionals
            </NavLink>
            <NavLink to="/enums" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏷️</span>Enums
            </NavLink>
            <NavLink to="/collections" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📚</span>Коллекции
            </NavLink>

            <div className="nav-section-title">ООП и протоколы</div>
            <NavLink to="/structs-classes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏗️</span>Struct vs Class
            </NavLink>
            <NavLink to="/protocols" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📋</span>Протоколы
            </NavLink>
            <NavLink to="/extensions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔌</span>Extensions
            </NavLink>
            <NavLink to="/generics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧬</span>Generics
            </NavLink>

            <div className="nav-section-title">Продвинутое</div>
            <NavLink to="/error-handling" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🚨</span>Error Handling
            </NavLink>
            <NavLink to="/concurrency" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⚡</span>Concurrency
            </NavLink>
            <NavLink to="/memory" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧠</span>ARC и память
            </NavLink>
            <NavLink to="/advanced-features" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔬</span>Продвинутые фичи
            </NavLink>

            <div className="nav-section-title">Инструменты</div>
            <NavLink to="/tooling" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔧</span>SPM, XCTest, Debug
            </NavLink>

            <button className="sidebar-collapse-btn" onClick={toggleSidebar}>
              {sidebarCollapsed ? '»' : '«'}<span className="collapse-text">{sidebarCollapsed ? 'Развернуть' : 'Свернуть'}</span>
            </button>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basics" element={<BasicsPage />} />
            <Route path="/control-flow" element={<ControlFlowPage />} />
            <Route path="/functions" element={<FunctionsPage />} />
            <Route path="/closures" element={<ClosuresPage />} />
            <Route path="/optionals" element={<OptionalsPage />} />
            <Route path="/enums" element={<EnumsPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/structs-classes" element={<StructsClassesPage />} />
            <Route path="/protocols" element={<ProtocolsPage />} />
            <Route path="/extensions" element={<ExtensionsPage />} />
            <Route path="/generics" element={<GenericsPage />} />
            <Route path="/error-handling" element={<ErrorHandlingPage />} />
            <Route path="/concurrency" element={<ConcurrencyPage />} />
            <Route path="/memory" element={<MemoryPage />} />
            <Route path="/advanced-features" element={<AdvancedFeaturesPage />} />
            <Route path="/tooling" element={<ToolingPage />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
