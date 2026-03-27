import { useState, lazy, Suspense } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import ThemeToggle from './components/ThemeToggle'

const Home = lazy(() => import('./pages/Home'))
// Principles
const SolidPrinciples = lazy(() => import('./pages/principles/SolidPrinciples'))
const DryKissYagni = lazy(() => import('./pages/principles/DryKissYagni'))
const AntiPatterns = lazy(() => import('./pages/principles/AntiPatterns'))
// Architecture
const MvcMvpMvvm = lazy(() => import('./pages/architecture/MvcMvpMvvm'))
const CleanArchitecture = lazy(() => import('./pages/architecture/CleanArchitecture'))
const HexagonalArchitecture = lazy(() => import('./pages/architecture/HexagonalArchitecture'))
const FSDArchitecture = lazy(() => import('./pages/architecture/FSDArchitecture'))
const MoreArchitectures = lazy(() => import('./pages/architecture/MoreArchitectures'))
// Creational
const Singleton = lazy(() => import('./pages/creational/Singleton'))
const FactoryMethod = lazy(() => import('./pages/creational/FactoryMethod'))
const AbstractFactory = lazy(() => import('./pages/creational/AbstractFactory'))
const Builder = lazy(() => import('./pages/creational/Builder'))
const Prototype = lazy(() => import('./pages/creational/Prototype'))
// Structural
const Adapter = lazy(() => import('./pages/structural/Adapter'))
const Bridge = lazy(() => import('./pages/structural/Bridge'))
const Composite = lazy(() => import('./pages/structural/Composite'))
const Decorator = lazy(() => import('./pages/structural/Decorator'))
const Facade = lazy(() => import('./pages/structural/Facade'))
const Flyweight = lazy(() => import('./pages/structural/Flyweight'))
const ProxyPattern = lazy(() => import('./pages/structural/ProxyPattern'))
// Behavioral
const ChainOfResponsibility = lazy(() => import('./pages/behavioral/ChainOfResponsibility'))
const Command = lazy(() => import('./pages/behavioral/Command'))
const Iterator = lazy(() => import('./pages/behavioral/Iterator'))
const Mediator = lazy(() => import('./pages/behavioral/Mediator'))
const Memento = lazy(() => import('./pages/behavioral/Memento'))
const Observer = lazy(() => import('./pages/behavioral/Observer'))
const State = lazy(() => import('./pages/behavioral/State'))
const Strategy = lazy(() => import('./pages/behavioral/Strategy'))
const TemplateMethod = lazy(() => import('./pages/behavioral/TemplateMethod'))
const Visitor = lazy(() => import('./pages/behavioral/Visitor'))
// Comparison
const PatternComparison = lazy(() => import('./pages/comparison/PatternComparison'))
const FrameworkPatterns = lazy(() => import('./pages/comparison/FrameworkPatterns'))

const Loading = () => <div style={{ padding: 40, color: '#666' }}>Загрузка...</div>

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    localStorage.getItem('patterns-sidebar-collapsed') === 'true')

  const handleNavClick = () => setMobileMenuOpen(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      localStorage.setItem('patterns-sidebar-collapsed', String(!prev))
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
        <h1><img src="/logo.svg" alt="" width="28" height="28" /> Patterns 101</h1>
      </header>

      {mobileMenuOpen && <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />}

      <div className={`app-layout ${sidebarCollapsed ? 'layout-collapsed' : ''}`}>
        <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-header-top">
              <h1><img src="/logo.svg" alt="" width="28" height="28" /> Patterns 101</h1>
              <ThemeToggle />
            </div>
            <p>Паттерны и архитектура</p>
            <a href={import.meta.env.VITE_DEPLOY_TARGET === 'github-pages' ? new URL('..', window.location.origin + import.meta.env.BASE_URL).toString() : 'http://localhost:3200'} className="back-to-index">← Все плейграунды</a>
          </div>

          <nav className="nav-section">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end onClick={handleNavClick}>
              <span className="nav-link-icon">🏠</span> Главная
            </NavLink>

            <div className="nav-section-title">📐 Принципы</div>
            <NavLink to="/principles/solid" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏛</span> SOLID
            </NavLink>
            <NavLink to="/principles/dry-kiss-yagni" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">✨</span> DRY / KISS / YAGNI
            </NavLink>
            <NavLink to="/principles/anti-patterns" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🚫</span> Анти-паттерны
            </NavLink>

            <div className="nav-section-title">🏗 Архитектура</div>
            <NavLink to="/architecture/mvc-mvp-mvvm" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏢</span> MVC / MVP / MVVM
            </NavLink>
            <NavLink to="/architecture/clean" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧅</span> Clean Architecture
            </NavLink>
            <NavLink to="/architecture/hexagonal" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⬡</span> Hexagonal / Ports
            </NavLink>
            <NavLink to="/architecture/fsd" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🍰</span> FSD
            </NavLink>
            <NavLink to="/architecture/more" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🌐</span> Layered / CQRS / MFE
            </NavLink>

            <div className="nav-section-title">🔨 Порождающие</div>
            <NavLink to="/creational/singleton" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">1️⃣</span> Singleton
            </NavLink>
            <NavLink to="/creational/factory-method" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏭</span> Factory Method
            </NavLink>
            <NavLink to="/creational/abstract-factory" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏗</span> Abstract Factory
            </NavLink>
            <NavLink to="/creational/builder" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧱</span> Builder
            </NavLink>
            <NavLink to="/creational/prototype" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧬</span> Prototype
            </NavLink>

            <div className="nav-section-title">🧩 Структурные</div>
            <NavLink to="/structural/adapter" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔌</span> Adapter
            </NavLink>
            <NavLink to="/structural/bridge" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🌉</span> Bridge
            </NavLink>
            <NavLink to="/structural/composite" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🌳</span> Composite
            </NavLink>
            <NavLink to="/structural/decorator" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🎀</span> Decorator
            </NavLink>
            <NavLink to="/structural/facade" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏛</span> Facade
            </NavLink>
            <NavLink to="/structural/flyweight" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🪶</span> Flyweight
            </NavLink>
            <NavLink to="/structural/proxy" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🛡</span> Proxy
            </NavLink>

            <div className="nav-section-title">🎭 Поведенческие</div>
            <NavLink to="/behavioral/chain-of-responsibility" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⛓</span> Chain of Resp.
            </NavLink>
            <NavLink to="/behavioral/command" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📜</span> Command
            </NavLink>
            <NavLink to="/behavioral/iterator" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔁</span> Iterator
            </NavLink>
            <NavLink to="/behavioral/mediator" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📡</span> Mediator
            </NavLink>
            <NavLink to="/behavioral/memento" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">💾</span> Memento
            </NavLink>
            <NavLink to="/behavioral/observer" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">👀</span> Observer
            </NavLink>
            <NavLink to="/behavioral/state" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🚦</span> State
            </NavLink>
            <NavLink to="/behavioral/strategy" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">♟</span> Strategy
            </NavLink>
            <NavLink to="/behavioral/template-method" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📋</span> Template Method
            </NavLink>
            <NavLink to="/behavioral/visitor" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🚶</span> Visitor
            </NavLink>

            <div className="nav-section-title">📊 Сравнение</div>
            <NavLink to="/comparison/selection" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔀</span> Выбор паттерна
            </NavLink>
            <NavLink to="/comparison/frameworks" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🗺</span> Паттерны → Фреймворки
            </NavLink>

            <button className="sidebar-collapse-btn" onClick={toggleSidebar}>
              {sidebarCollapsed ? '»' : '«'}
              <span className="collapse-text">{sidebarCollapsed ? 'Развернуть' : 'Свернуть'}</span>
            </button>
          </nav>
        </aside>

        <main className="main-content">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/principles/solid" element={<SolidPrinciples />} />
              <Route path="/principles/dry-kiss-yagni" element={<DryKissYagni />} />
              <Route path="/principles/anti-patterns" element={<AntiPatterns />} />
              <Route path="/architecture/mvc-mvp-mvvm" element={<MvcMvpMvvm />} />
              <Route path="/architecture/clean" element={<CleanArchitecture />} />
              <Route path="/architecture/hexagonal" element={<HexagonalArchitecture />} />
              <Route path="/architecture/fsd" element={<FSDArchitecture />} />
              <Route path="/architecture/more" element={<MoreArchitectures />} />
              <Route path="/creational/singleton" element={<Singleton />} />
              <Route path="/creational/factory-method" element={<FactoryMethod />} />
              <Route path="/creational/abstract-factory" element={<AbstractFactory />} />
              <Route path="/creational/builder" element={<Builder />} />
              <Route path="/creational/prototype" element={<Prototype />} />
              <Route path="/structural/adapter" element={<Adapter />} />
              <Route path="/structural/bridge" element={<Bridge />} />
              <Route path="/structural/composite" element={<Composite />} />
              <Route path="/structural/decorator" element={<Decorator />} />
              <Route path="/structural/facade" element={<Facade />} />
              <Route path="/structural/flyweight" element={<Flyweight />} />
              <Route path="/structural/proxy" element={<ProxyPattern />} />
              <Route path="/behavioral/chain-of-responsibility" element={<ChainOfResponsibility />} />
              <Route path="/behavioral/command" element={<Command />} />
              <Route path="/behavioral/iterator" element={<Iterator />} />
              <Route path="/behavioral/mediator" element={<Mediator />} />
              <Route path="/behavioral/memento" element={<Memento />} />
              <Route path="/behavioral/observer" element={<Observer />} />
              <Route path="/behavioral/state" element={<State />} />
              <Route path="/behavioral/strategy" element={<Strategy />} />
              <Route path="/behavioral/template-method" element={<TemplateMethod />} />
              <Route path="/behavioral/visitor" element={<Visitor />} />
              <Route path="/comparison/selection" element={<PatternComparison />} />
              <Route path="/comparison/frameworks" element={<FrameworkPatterns />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </>
  )
}
