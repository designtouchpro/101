import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
// Event Loop
import EventLoopVisualizer from './pages/eventloop/EventLoopVisualizer'
import EventLoopInteractive from './pages/eventloop/EventLoopInteractive'
import CallStackDemo from './pages/eventloop/CallStackDemo'
import MicrotasksMacrotasks from './pages/eventloop/MicrotasksMacrotasks'
import EventLoopQuiz from './pages/eventloop/EventLoopQuiz'
// Async
import PromisesDemo from './pages/async/PromisesDemo'
import AsyncAwaitDemo from './pages/async/AsyncAwaitDemo'
import PromiseMethodsDemo from './pages/async/PromiseMethodsDemo'
// Closures & Scope
import ClosuresDemo from './pages/closures/ClosuresDemo'
import ScopeDemo from './pages/closures/ScopeDemo'
import HoistingDemo from './pages/closures/HoistingDemo'
// This & Context
import ThisDemo from './pages/context/ThisDemo'
import BindCallApply from './pages/context/BindCallApply'
// Prototypes
import PrototypesDemo from './pages/prototypes/PrototypesDemo'
// ES6+ Features
import DestructuringDemo from './pages/es6/DestructuringDemo'
import SpreadRestDemo from './pages/es6/SpreadRestDemo'
import ArrayMethodsDemo from './pages/es6/ArrayMethodsDemo'
// Modules
import ModulesDemo from './pages/modules/ModulesDemo'
// Collections
import CollectionsDemo from './pages/collections/CollectionsDemo'
// Interview
import InterviewChallenges from './pages/interview/InterviewChallenges'
import DeepCloneDemo from './pages/interview/DeepCloneDemo'
import LeetCodeQuiz from './pages/interview/LeetCodeQuiz'
// Metaprogramming
import ProxyReflectDemo from './pages/metaprogramming/ProxyReflectDemo'
import GeneratorsDemo from './pages/metaprogramming/GeneratorsDemo'
// Memory
import MemoryDemo from './pages/memory/MemoryDemo'
// Debugging
import DebuggingErrors from './pages/debugging/DebuggingErrors'
import BrowserAPIs from './pages/browser/BrowserAPIs'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('js-sidebar-collapsed') === 'true')

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      localStorage.setItem('js-sidebar-collapsed', String(!prev))
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
        <h1><img src="/logo.svg" alt="" width="28" height="28" style={{ marginRight: '8px' }} /> JS 101</h1>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div className={`app-layout ${sidebarCollapsed ? 'layout-collapsed' : ''}`}>
        <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-header-top">
              <h1><img src="/logo.svg" alt="" width="28" height="28" style={{ marginRight: '8px' }} /> JS 101</h1>
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

            <div className="nav-section-title">Event Loop</div>
            
            <NavLink to="/eventloop/visualizer" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔄</span>
              Визуализатор
            </NavLink>
            
            <NavLink to="/eventloop/sandbox" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🎮</span>
              Песочница
            </NavLink>
            
            <NavLink to="/eventloop/callstack" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📚</span>
              Call Stack
            </NavLink>
            
            <NavLink to="/eventloop/micromacro" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⚡</span>
              Micro/Macro Tasks
            </NavLink>
            
            <NavLink to="/eventloop/quiz" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧩</span>
              Event Loop Quiz
            </NavLink>

            <div className="nav-section-title">Асинхронность</div>
            
            <NavLink to="/async/promises" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🤝</span>
              Promises
            </NavLink>
            
            <NavLink to="/async/async-await" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⏳</span>
              Async/Await
            </NavLink>

            <NavLink to="/async/promise-methods" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔀</span>
              all / race / any
            </NavLink>

            <div className="nav-section-title">Замыкания и область видимости</div>
            
            <NavLink to="/closures/closures" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📦</span>
              Замыкания
            </NavLink>
            
            <NavLink to="/closures/scope" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔍</span>
              Область видимости
            </NavLink>
            
            <NavLink to="/closures/hoisting" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⬆️</span>
              Hoisting
            </NavLink>

            <div className="nav-section-title">this и контекст</div>
            
            <NavLink to="/context/this" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">👆</span>
              this
            </NavLink>
            
            <NavLink to="/context/bind-call-apply" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔗</span>
              bind/call/apply
            </NavLink>

            <div className="nav-section-title">Прототипы</div>
            
            <NavLink to="/prototypes/basics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧬</span>
              Прототипы
            </NavLink>

            <div className="nav-section-title">ES6+ Features</div>
            
            <NavLink to="/es6/destructuring" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📤</span>
              Деструктуризация
            </NavLink>
            
            <NavLink to="/es6/spread-rest" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">...</span>
              Spread/Rest
            </NavLink>

            <NavLink to="/es6/array-methods" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔧</span>
              map/reduce/forEach
            </NavLink>

            <div className="nav-section-title">Модули</div>

            <NavLink to="/modules" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📦</span>
              ESM / CJS / бандлеры
            </NavLink>

            <div className="nav-section-title">Коллекции</div>
            
            <NavLink to="/collections" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🗃️</span>
              Set/Map/Weak*
            </NavLink>

            <div className="nav-section-title">Метапрограммирование</div>
            
            <NavLink to="/metaprogramming/proxy" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🪞</span>
              Proxy & Reflect
            </NavLink>
            
            <NavLink to="/metaprogramming/generators" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔄</span>
              Generators
            </NavLink>

            <div className="nav-section-title">Память</div>
            
            <NavLink to="/memory" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧠</span>
              Memory & GC
            </NavLink>

            <div className="nav-section-title">Собеседование</div>
            
            <NavLink to="/interview/challenges" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🎯</span>
              Задачи
            </NavLink>
            
            <NavLink to="/interview/deep-clone" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧬</span>
              Deep Clone
            </NavLink>

            <NavLink to="/interview/leetcode" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">💻</span>
              Задачи (LeetCode)
            </NavLink>

            <div className="nav-section-title">Браузерные API</div>

            <NavLink to="/browser/apis" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🌐</span>
              Storage, Workers, Scheduling
            </NavLink>

            <div className="nav-section-title">Отладка</div>

            <NavLink to="/debugging/errors" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🐛</span>
              Ошибки и ловушки
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
            {/* Event Loop */}
            <Route path="/eventloop/visualizer" element={<EventLoopVisualizer />} />
            <Route path="/eventloop/sandbox" element={<EventLoopInteractive />} />
            <Route path="/eventloop/callstack" element={<CallStackDemo />} />
            <Route path="/eventloop/micromacro" element={<MicrotasksMacrotasks />} />
            <Route path="/eventloop/quiz" element={<EventLoopQuiz />} />
            {/* Async */}
            <Route path="/async/promises" element={<PromisesDemo />} />
            <Route path="/async/async-await" element={<AsyncAwaitDemo />} />
            <Route path="/async/promise-methods" element={<PromiseMethodsDemo />} />
            {/* Closures */}
            <Route path="/closures/closures" element={<ClosuresDemo />} />
            <Route path="/closures/scope" element={<ScopeDemo />} />
            <Route path="/closures/hoisting" element={<HoistingDemo />} />
            {/* Context */}
            <Route path="/context/this" element={<ThisDemo />} />
            <Route path="/context/bind-call-apply" element={<BindCallApply />} />
            {/* Prototypes */}
            <Route path="/prototypes/basics" element={<PrototypesDemo />} />
            {/* ES6+ */}
            <Route path="/es6/destructuring" element={<DestructuringDemo />} />
            <Route path="/es6/spread-rest" element={<SpreadRestDemo />} />
            <Route path="/es6/array-methods" element={<ArrayMethodsDemo />} />
            {/* Modules */}
            <Route path="/modules" element={<ModulesDemo />} />
            {/* Collections */}
            <Route path="/collections" element={<CollectionsDemo />} />
            {/* Metaprogramming */}
            <Route path="/metaprogramming/proxy" element={<ProxyReflectDemo />} />
            <Route path="/metaprogramming/generators" element={<GeneratorsDemo />} />
            {/* Memory */}
            <Route path="/memory" element={<MemoryDemo />} />
            {/* Interview */}
            <Route path="/interview/challenges" element={<InterviewChallenges />} />
            <Route path="/interview/deep-clone" element={<DeepCloneDemo />} />
            <Route path="/interview/leetcode" element={<LeetCodeQuiz />} />
            {/* Browser APIs */}
            <Route path="/browser/apis" element={<BrowserAPIs />} />
            {/* Debugging */}
            <Route path="/debugging/errors" element={<DebuggingErrors />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
