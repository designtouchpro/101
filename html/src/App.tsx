import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Timeline from './pages/Timeline'
import InputTypes from './pages/InputTypes'
import DialogPopover from './pages/DialogPopover'
import NewAttributes from './pages/NewAttributes'
import MetaTags from './pages/MetaTags'
import SEOMetadata from './pages/SEOMetadata'
import ScriptLoading from './pages/ScriptLoading'
import FormsValidation from './pages/FormsValidation'
import FormsProductionUX from './pages/FormsProductionUX'
import SemanticElements from './pages/SemanticElements'
import MediaElements from './pages/MediaElements'
import TemplateSlot from './pages/TemplateSlot'
import Accessibility from './pages/Accessibility'
import InterviewQuestions from './pages/InterviewQuestions'
import WebComponents from './pages/WebComponents'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('html-sidebar-collapsed') === 'true')

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      localStorage.setItem('html-sidebar-collapsed', String(!prev))
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
        <h1>HTML 101</h1>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div className={`app-layout ${sidebarCollapsed ? 'layout-collapsed' : ''}`}>
        <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-header-top">
              <h1>
                <img src="/logo.svg" alt="" width="28" height="28" style={{ marginRight: '8px' }} />
                HTML 101
              </h1>
              <ThemeToggle />
            </div>
            <p>Современный HTML5+</p>
            <a href={import.meta.env.VITE_DEPLOY_TARGET === 'github-pages' ? new URL('..', window.location.origin + import.meta.env.BASE_URL).toString() : 'http://localhost:3200'} className="back-to-index">← Все плейграунды</a>
          </div>

          <nav className="nav-section">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end onClick={handleNavClick}>
              <span className="nav-link-icon">🏠</span>
              Главная
            </NavLink>

            <NavLink to="/timeline" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📅</span>
              Timeline HTML
            </NavLink>

            <div className="nav-section-title">Элементы форм</div>
            
            <NavLink to="/input-types" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">📝</span>
              Типы Input
            </NavLink>
            
            <NavLink to="/forms-validation" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">✅</span>
              Валидация форм
            </NavLink>

            <NavLink to="/forms-production" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏭</span>
              Формы в продакшене
            </NavLink>

            <div className="nav-section-title">Интерактивность</div>
            
            <NavLink to="/dialog-popover" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">💬</span>
              Dialog & Popover
            </NavLink>

            <NavLink to="/template-slot" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🧩</span>
              Template & Slot
            </NavLink>

            <NavLink to="/web-components" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⚙️</span>
              Web Components
            </NavLink>

            <div className="nav-section-title">Атрибуты и метаданные</div>
            
            <NavLink to="/new-attributes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏷️</span>
              Новые атрибуты
            </NavLink>
            
            <NavLink to="/meta-tags" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔖</span>
              Meta теги
            </NavLink>

            <NavLink to="/seo-metadata" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🔍</span>
              SEO и метаданные
            </NavLink>
            
            <NavLink to="/script-loading" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">⚡</span>
              Script & Link
            </NavLink>

            <div className="nav-section-title">Контент</div>
            
            <NavLink to="/semantic" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🏗️</span>
              Семантика
            </NavLink>
            
            <NavLink to="/media" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">🎬</span>
              Media элементы
            </NavLink>

            <div className="nav-section-title">Доступность</div>

            <NavLink to="/accessibility" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavClick}>
              <span className="nav-link-icon">♿</span>
              A11y
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
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/input-types" element={<InputTypes />} />
            <Route path="/forms-validation" element={<FormsValidation />} />
            <Route path="/forms-production" element={<FormsProductionUX />} />
            <Route path="/dialog-popover" element={<DialogPopover />} />
            <Route path="/template-slot" element={<TemplateSlot />} />
            <Route path="/web-components" element={<WebComponents />} />
            <Route path="/new-attributes" element={<NewAttributes />} />
            <Route path="/meta-tags" element={<MetaTags />} />
            <Route path="/seo-metadata" element={<SEOMetadata />} />
            <Route path="/script-loading" element={<ScriptLoading />} />
            <Route path="/semantic" element={<SemanticElements />} />
            <Route path="/media" element={<MediaElements />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/interview" element={<InterviewQuestions />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
