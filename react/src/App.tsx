import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import UseStateDemo from './pages/hooks/UseStateDemo'
import UseEffectDemo from './pages/hooks/UseEffectDemo'
import UseCallbackDemo from './pages/hooks/UseCallbackDemo'
import UseMemoDemo from './pages/hooks/UseMemoDemo'
import UseRefDemo from './pages/hooks/UseRefDemo'
import UseContextDemo from './pages/hooks/UseContextDemo'
import LayoutEffectDemo from './pages/hooks/LayoutEffectDemo'
import HooksOverviewGuide from './pages/hooks/HooksOverviewGuide'
import RenderingDemo from './pages/concepts/RenderingDemo'
import LifecycleDemo from './pages/concepts/LifecycleDemo'
import React19Features from './pages/versions/React19Features'
import ReactCompilerGuide from './pages/versions/ReactCompilerGuide'
import BatchingDemo from './pages/concepts/BatchingDemo'
import ServerComponentsGuide from './pages/concepts/ServerComponentsGuide'
// Basics
import JSXGuide from './pages/basics/JSXGuide'
import StylingGuide from './pages/basics/StylingGuide'
// State Management
import ZustandGuide from './pages/state/ZustandGuide'
import ReduxGuide from './pages/state/ReduxGuide'
// Data Fetching
import TanStackQueryGuide from './pages/data/TanStackQueryGuide'
// Forms
import ReactFormsGuide from './pages/forms/ReactFormsGuide'
// Performance
import PerformanceGuide from './pages/performance/PerformanceGuide'
// Patterns
import ComponentPatternsGuide from './pages/patterns/ComponentPatternsGuide'
// Testing
import TestingGuide from './pages/testing/TestingGuide'
// Routing & SSR
import RoutingSSRGuide from './pages/routing/RoutingSSRGuide'
// DevOps
import GitFlowGuide from './pages/devops/GitFlowGuide'
import InterviewQuestions from './pages/InterviewQuestions'
import AdvancedHooksPortals from './pages/advanced/AdvancedHooksPortals'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('react-sidebar-collapsed') === 'true')

  // Закрываем меню при смене маршрута
  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      localStorage.setItem('react-sidebar-collapsed', String(!prev))
      return !prev
    })
  }

  return (
    <>
      <ScrollToTop />
      
      {/* Mobile Header */}
      <header className="mobile-header">
        <button 
          className="hamburger-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
        <h1><img src="/logo.svg" alt="" width="28" height="28" style={{ marginRight: '8px' }} /> React 101</h1>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div className={`app-layout ${sidebarCollapsed ? 'layout-collapsed' : ''}`}>
        <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-header-top">
              <h1><img src="/logo.svg" alt="" width="28" height="28" style={{ marginRight: '8px' }} /> React 101</h1>
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

          <div className="nav-section-title">Основы</div>
          
          <NavLink to="/basics/jsx" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">⚛️</span>
            JSX
          </NavLink>
          
          <NavLink to="/basics/styling" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🎨</span>
            Стилизация
          </NavLink>

          <div className="nav-section-title">Хуки</div>
          
          <NavLink to="/hooks/usestate" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">📦</span>
            useState
          </NavLink>
          
          <NavLink to="/hooks/useeffect" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">⚡</span>
            useEffect
          </NavLink>
          
          <NavLink to="/hooks/usecallback" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🔄</span>
            useCallback
          </NavLink>
          
          <NavLink to="/hooks/usememo" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">💾</span>
            useMemo
          </NavLink>
          
          <NavLink to="/hooks/useref" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">📌</span>
            useRef
          </NavLink>
          
          <NavLink to="/hooks/usecontext" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🌐</span>
            useContext
          </NavLink>
          
          <NavLink to="/hooks/overview" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🎣</span>
            Все хуки
          </NavLink>

          <div className="nav-section-title">State Management</div>
          
          <NavLink to="/state/zustand" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🐻</span>
            Zustand
          </NavLink>
          
          <NavLink to="/state/redux" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🔮</span>
            Redux / RTK
          </NavLink>

          <div className="nav-section-title">Data Fetching</div>
          
          <NavLink to="/data/tanstack-query" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🔄</span>
            TanStack Query
          </NavLink>

          <div className="nav-section-title">Forms</div>
          
          <NavLink to="/forms/react-forms" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">📝</span>
            React Forms
          </NavLink>

          <div className="nav-section-title">Паттерны</div>
          
          <NavLink to="/patterns/components" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🧩</span>
            Компоненты
          </NavLink>

          <div className="nav-section-title">Performance</div>
          
          <NavLink to="/performance/code-splitting" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">⚡</span>
            Code Splitting
          </NavLink>

          <div className="nav-section-title">Концепции</div>
          
          <NavLink to="/concepts/rendering" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🎨</span>
            Рендеринг
          </NavLink>
          
          <NavLink to="/concepts/lifecycle" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🔁</span>
            Жизненный цикл
          </NavLink>
          
          <NavLink to="/concepts/batching" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">📦</span>
            Batching
          </NavLink>
          
          <NavLink to="/concepts/server-components" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🖥️</span>
            Server Components
          </NavLink>

          <div className="nav-section-title">React 19</div>
          
          <NavLink to="/versions/react19" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🚀</span>
            Новые фичи
          </NavLink>
          
          <NavLink to="/versions/react-compiler" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">⚡</span>
            React Compiler
          </NavLink>

          <div className="nav-section-title">Тестирование</div>
          
          <NavLink to="/testing/guide" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🧪</span>
            Vitest + RTL
          </NavLink>

          <div className="nav-section-title">Routing & SSR</div>

          <NavLink to="/routing/ssr" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🛣️</span>
            Routing, Data, SSR
          </NavLink>

          <div className="nav-section-title">Экосистема</div>
          
          <NavLink to="/devops/git-flow" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🌿</span>
            Git в React-проекте
          </NavLink>

          <div className="nav-section-title">Advanced</div>

          <NavLink to="/advanced/hooks-portals" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🔧</span>
            Hooks & Portals
          </NavLink>

          <div className="nav-section-title">🎯 Собеседование</div>
          
          <NavLink to="/interview" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
            <span className="nav-link-icon">🎤</span>
            Вопросы
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
          <Route path="/basics/jsx" element={<JSXGuide />} />
          <Route path="/basics/styling" element={<StylingGuide />} />
          <Route path="/hooks/usestate" element={<UseStateDemo />} />
          <Route path="/hooks/useeffect" element={<UseEffectDemo />} />            <Route path="/hooks/use-layout-effect" element={<LayoutEffectDemo />} />          <Route path="/hooks/usecallback" element={<UseCallbackDemo />} />
          <Route path="/hooks/usememo" element={<UseMemoDemo />} />
          <Route path="/hooks/useref" element={<UseRefDemo />} />
          <Route path="/hooks/usecontext" element={<UseContextDemo />} />
          <Route path="/hooks/overview" element={<HooksOverviewGuide />} />
          <Route path="/state/zustand" element={<ZustandGuide />} />
          <Route path="/state/redux" element={<ReduxGuide />} />
          <Route path="/data/tanstack-query" element={<TanStackQueryGuide />} />
          <Route path="/forms/react-forms" element={<ReactFormsGuide />} />
          <Route path="/patterns/components" element={<ComponentPatternsGuide />} />
          <Route path="/performance/code-splitting" element={<PerformanceGuide />} />
          <Route path="/concepts/rendering" element={<RenderingDemo />} />
          <Route path="/concepts/lifecycle" element={<LifecycleDemo />} />
          <Route path="/concepts/batching" element={<BatchingDemo />} />
          <Route path="/concepts/server-components" element={<ServerComponentsGuide />} />
          <Route path="/versions/react19" element={<React19Features />} />
          <Route path="/versions/react-compiler" element={<ReactCompilerGuide />} />
          <Route path="/testing/guide" element={<TestingGuide />} />
          <Route path="/routing/ssr" element={<RoutingSSRGuide />} />
          <Route path="/devops/git-flow" element={<GitFlowGuide />} />
          <Route path="/advanced/hooks-portals" element={<AdvancedHooksPortals />} />
          <Route path="/interview" element={<InterviewQuestions />} />
        </Routes>
      </main>
    </div>
    </>
  )
}
