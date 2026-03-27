import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import ViewsModifiersPage from './pages/ViewsModifiersPage'
import LayoutPage from './pages/LayoutPage'
import StatePage from './pages/StatePage'
import BindingPage from './pages/BindingPage'
import ObservablePage from './pages/ObservablePage'
import EnvironmentPage from './pages/EnvironmentPage'
import NavigationPage from './pages/NavigationPage'
import ListsFormsPage from './pages/ListsFormsPage'
import AnimationsPage from './pages/AnimationsPage'
import GesturesPage from './pages/GesturesPage'
import DataFlowPage from './pages/DataFlowPage'
import ArchitecturePage from './pages/ArchitecturePage'
import LifecyclePage from './pages/LifecyclePage'
import ComponentsPage from './pages/ComponentsPage'
import NetworkingPage from './pages/NetworkingPage'
import PersistencePage from './pages/PersistencePage'
import TestingPerfPage from './pages/TestingPerfPage'
import AppLifecycleInterop from './pages/AppLifecycleInterop'
import AccessibilityPage from './pages/AccessibilityPage'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('swiftui-sidebar-collapsed') === 'true')

  const handleNavClick = () => setMobileMenuOpen(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      localStorage.setItem('swiftui-sidebar-collapsed', String(!prev))
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
        <h1>📱 SwiftUI 101</h1>
      </header>

      {mobileMenuOpen && <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />}

      <div className={`app-layout ${sidebarCollapsed ? 'layout-collapsed' : ''}`}>
        <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-header-top">
              <h1><img src="/logo.svg" alt="" width="28" height="28" style={{ marginRight: '8px' }} /> SwiftUI 101</h1>
              <ThemeToggle />
            </div>
            <p>Декларативный UI для Apple</p>
            <a href={import.meta.env.VITE_DEPLOY_TARGET === 'github-pages' ? new URL('..', window.location.origin + import.meta.env.BASE_URL).toString() : 'http://localhost:3200'} className="back-to-index">← Все плейграунды</a>
          </div>

          <nav className="nav-section">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end onClick={handleNavClick}>
              <span className="nav-link-icon">🏠</span>Главная
            </NavLink>

            <div className="nav-section-title">Основы UI</div>
            <NavLink to="/views" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🎨</span>Views и Modifiers
            </NavLink>
            <NavLink to="/layout" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📐</span>Layout System
            </NavLink>
            <NavLink to="/components" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧩</span>Компоненты
            </NavLink>

            <div className="nav-section-title">Состояние</div>
            <NavLink to="/state" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📦</span>@State
            </NavLink>
            <NavLink to="/binding" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔗</span>@Binding
            </NavLink>
            <NavLink to="/observable" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">👁️</span>@Observable
            </NavLink>
            <NavLink to="/environment" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🌍</span>Environment
            </NavLink>
            <NavLink to="/data-flow" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔄</span>Data Flow
            </NavLink>

            <div className="nav-section-title">Навигация и списки</div>
            <NavLink to="/navigation" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧭</span>Navigation
            </NavLink>
            <NavLink to="/lists" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📋</span>Lists & Forms
            </NavLink>

            <div className="nav-section-title">Анимации и жесты</div>
            <NavLink to="/animations" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">✨</span>Animations
            </NavLink>
            <NavLink to="/gestures" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">👆</span>Gestures
            </NavLink>

            <div className="nav-section-title">Архитектура</div>
            <NavLink to="/lifecycle" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">♻️</span>Lifecycle
            </NavLink>
            <NavLink to="/architecture" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏛️</span>MVVM
            </NavLink>
            <NavLink to="/app-lifecycle" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔄</span>App & UIKit Interop
            </NavLink>

            <div className="nav-section-title">Данные и сеть</div>
            <NavLink to="/networking" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🌐</span>Networking
            </NavLink>
            <NavLink to="/persistence" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">💾</span>Хранение данных
            </NavLink>

            <div className="nav-section-title">Качество</div>
            <NavLink to="/accessibility" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">♿</span>Accessibility
            </NavLink>
            <NavLink to="/testing-performance" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧪</span>Тесты и Performance
            </NavLink>

            <button className="sidebar-collapse-btn" onClick={toggleSidebar}>
              {sidebarCollapsed ? '»' : '«'}<span className="collapse-text">{sidebarCollapsed ? 'Развернуть' : 'Свернуть'}</span>
            </button>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/views" element={<ViewsModifiersPage />} />
            <Route path="/layout" element={<LayoutPage />} />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/state" element={<StatePage />} />
            <Route path="/binding" element={<BindingPage />} />
            <Route path="/observable" element={<ObservablePage />} />
            <Route path="/environment" element={<EnvironmentPage />} />
            <Route path="/data-flow" element={<DataFlowPage />} />
            <Route path="/navigation" element={<NavigationPage />} />
            <Route path="/lists" element={<ListsFormsPage />} />
            <Route path="/animations" element={<AnimationsPage />} />
            <Route path="/gestures" element={<GesturesPage />} />
            <Route path="/lifecycle" element={<LifecyclePage />} />
            <Route path="/architecture" element={<ArchitecturePage />} />
            <Route path="/app-lifecycle" element={<AppLifecycleInterop />} />
            <Route path="/networking" element={<NetworkingPage />} />
            <Route path="/persistence" element={<PersistencePage />} />
            <Route path="/testing-performance" element={<TestingPerfPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
