import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import RestDemo from './pages/RestDemo'
import GraphQLDemo from './pages/GraphQLDemo'
import WebSocketDemo from './pages/WebSocketDemo'
import RpcDemo from './pages/RpcDemo'
import SecurityDemo from './pages/SecurityDemo'
import StatusDemo from './pages/StatusDemo'
import ComparisonDemo from './pages/ComparisonDemo'
import HeadersDemo from './pages/HeadersDemo'
import CachingDemo from './pages/CachingDemo'
import AuthDemo from './pages/AuthDemo'
import CorsDemo from './pages/CorsDemo'
import PatternsDemo from './pages/PatternsDemo'
import CookiesDemo from './pages/CookiesDemo'
import WebSecurityDemo from './pages/WebSecurityDemo'
import WebVitalsDemo from './pages/WebVitalsDemo'
import TransportFundamentals from './pages/TransportFundamentals'
import ProductionConcerns from './pages/ProductionConcerns'
import AuthStreaming from './pages/AuthStreaming'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('net-sidebar-collapsed') === 'true')

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      localStorage.setItem('net-sidebar-collapsed', String(!prev))
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
        <h1>🌐 Net 101</h1>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div className={`app-layout ${sidebarCollapsed ? 'layout-collapsed' : ''}`}>
        <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-header-top">
              <h1>
                <img src="/logo.svg" alt="" width="28" height="28" style={{ marginRight: '8px' }} />
                Net 101
              </h1>
              <ThemeToggle />
            </div>
            <p>REST • GraphQL • WebSocket • RPC</p>
            <a href={import.meta.env.VITE_DEPLOY_TARGET === 'github-pages' ? new URL('..', window.location.origin + import.meta.env.BASE_URL).toString() : 'http://localhost:3200'} className="back-to-index">← Все плейграунды</a>
          </div>

          <nav className="nav-section">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end onClick={handleNavClick}>
              <span className="nav-link-icon">🏠</span>
              Главная
            </NavLink>

            <div className="nav-section-title">Транспорт</div>
            
            <NavLink to="/transport" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🌐</span>
              DNS / TLS / HTTP
            </NavLink>

            <div className="nav-section-title">Протоколы API</div>
            
            <NavLink to="/rest" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📡</span>
              REST API
            </NavLink>
            
            <NavLink to="/graphql" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">◈</span>
              GraphQL
            </NavLink>
            
            <NavLink to="/websocket" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⚡</span>
              WebSocket
            </NavLink>
            
            <NavLink to="/rpc" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔧</span>
              JSON-RPC
            </NavLink>

            <NavLink to="/security" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🛡</span>
              CORS & Proxy
            </NavLink>
            <NavLink to="/status" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🚦</span>
              Status Codes
            </NavLink>

            <div className="nav-section-title">HTTP Концепции</div>
            
            <NavLink to="/headers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📋</span>
              HTTP Headers
            </NavLink>
            
            <NavLink to="/caching" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">💾</span>
              Caching
            </NavLink>
            
            <NavLink to="/auth" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔐</span>
              Auth & Security
            </NavLink>
            
            <NavLink to="/cors" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🌐</span>
              CORS
            </NavLink>
            
            <NavLink to="/patterns" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📐</span>
              API Patterns
            </NavLink>

            <div className="nav-section-title">Безопасность & Браузер</div>
            
            <NavLink to="/cookies" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🍪</span>
              Cookies Deep Dive
            </NavLink>
            
            <NavLink to="/web-security" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔒</span>
              CSRF / XSS / CSP
            </NavLink>
            
            <NavLink to="/web-vitals" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📊</span>
              Web Vitals
            </NavLink>

            <div className="nav-section-title">Production</div>
            
            <NavLink to="/production" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏭</span>
              Production Concerns
            </NavLink>
            
            <NavLink to="/auth-streaming" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔐</span>
              Auth & Real-Time
            </NavLink>

            <div className="nav-section-title">Обучение</div>
            
            <NavLink to="/comparison" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⚖️</span>
              Сравнение
            </NavLink>

            <button className="sidebar-collapse-btn" onClick={toggleSidebar}>
              {sidebarCollapsed ? '»' : '«'}
              <span className="collapse-text">{sidebarCollapsed ? 'Развернуть' : 'Свернуть'}</span>
            </button>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/security" element={<SecurityDemo />} />
            <Route path="/" element={<Home />} />
            <Route path="/status" element={<StatusDemo />} />
            <Route path="/rest" element={<RestDemo />} />
            <Route path="/graphql" element={<GraphQLDemo />} />
            <Route path="/websocket" element={<WebSocketDemo />} />
            <Route path="/rpc" element={<RpcDemo />} />
            <Route path="/comparison" element={<ComparisonDemo />} />
            <Route path="/headers" element={<HeadersDemo />} />
            <Route path="/caching" element={<CachingDemo />} />
            <Route path="/auth" element={<AuthDemo />} />
            <Route path="/cors" element={<CorsDemo />} />
            <Route path="/patterns" element={<PatternsDemo />} />
            <Route path="/cookies" element={<CookiesDemo />} />
            <Route path="/web-security" element={<WebSecurityDemo />} />
            <Route path="/web-vitals" element={<WebVitalsDemo />} />
            <Route path="/transport" element={<TransportFundamentals />} />
            <Route path="/production" element={<ProductionConcerns />} />
            <Route path="/auth-streaming" element={<AuthStreaming />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
