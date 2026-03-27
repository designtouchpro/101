import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import ScrollToTop from './components/ScrollToTop'

// Pages
import Home from './pages/Home'
import CSSTimeline from './pages/timeline/CSSTimeline'
import FlexboxGuide from './pages/layout/FlexboxGuide'
import GridGuide from './pages/layout/GridGuide'
import ContainerQueries from './pages/layout/ContainerQueries'
import HasSelector from './pages/selectors/HasSelector'
import IsWhere from './pages/selectors/IsWhere'
import CSSVariables from './pages/styling/CSSVariables'
import ColorFunctions from './pages/styling/ColorFunctions'
import LogicalProperties from './pages/styling/LogicalProperties'
import ScrollSnap from './pages/features/ScrollSnap'
import AspectRatio from './pages/features/AspectRatio'
import ClampMinMax from './pages/features/ClampMinMax'
import Subgrid from './pages/features/Subgrid'
import CSSAccessibility from './pages/features/CSSAccessibility'
// Syntax
import ModernSyntax from './pages/syntax/ModernSyntax'
import MediaQueries from './pages/syntax/MediaQueries'
import CSSNesting from './pages/syntax/CSSNesting'
import CascadeLayers from './pages/syntax/CascadeLayers'
import CSSProperty from './pages/syntax/CSSProperty'
import CSSScope from './pages/syntax/CSSScope'
import ColorSyntax from './pages/syntax/ColorSyntax'
import NewSelectors from './pages/syntax/NewSelectors'
import NewProperties from './pages/syntax/NewProperties'
// Examples
import CardPatterns from './pages/examples/CardPatterns'
import ButtonStyles from './pages/examples/ButtonStyles'
import FormPatterns from './pages/examples/FormPatterns'
import NavigationPatterns from './pages/examples/NavigationPatterns'
import LayoutRecipes from './pages/examples/LayoutRecipes'
import AnimationPatterns from './pages/examples/AnimationPatterns'
import RealWorldExamples from './pages/examples/RealWorldExamples'
import InterviewQuestions from './pages/InterviewQuestions'
import CSSPerformance from './pages/performance/CSSPerformance'
import CSSArchitecture from './pages/architecture/CSSArchitecture'
import ThemeToggle from './components/ThemeToggle'

const navSections = [
  {
    title: 'Overview',
    links: [
      { to: '/', icon: '🏠', label: 'Home' },
      { to: '/timeline', icon: '📅', label: 'CSS Timeline' },
    ]
  },
  {
    title: 'Syntax Changes',
    links: [
      { to: '/syntax/overview', icon: '📋', label: 'Overview' },
      { to: '/syntax/nesting', icon: '🪆', label: 'CSS Nesting' },
      { to: '/syntax/layers', icon: '📚', label: '@layer' },
      { to: '/syntax/property', icon: '🎨', label: '@property' },
      { to: '/syntax/scope', icon: '🎯', label: '@scope' },
      { to: '/syntax/colors', icon: '🌈', label: 'Color Syntax' },
      { to: '/syntax/selectors', icon: '✨', label: 'New Selectors' },
      { to: '/syntax/properties', icon: '🆕', label: 'New Properties' },
      { to: '/syntax/media', icon: '📱', label: 'Media Queries' },
    ]
  },
  {
    title: 'Layout',
    links: [
      { to: '/layout/flexbox', icon: '📦', label: 'Flexbox' },
      { to: '/layout/grid', icon: '🔲', label: 'CSS Grid' },
      { to: '/layout/container-queries', icon: '📐', label: 'Container Queries' },
      { to: '/layout/subgrid', icon: '🔳', label: 'Subgrid' },
    ]
  },
  {
    title: 'Selectors',
    links: [
      { to: '/selectors/has', icon: '🎯', label: ':has() Selector' },
      { to: '/selectors/is-where', icon: '✨', label: ':is() & :where()' },
    ]
  },
  {
    title: 'Styling',
    links: [
      { to: '/styling/variables', icon: '🎨', label: 'CSS Variables' },
      { to: '/styling/colors', icon: '🌈', label: 'Color Functions' },
      { to: '/styling/logical', icon: '↔️', label: 'Logical Properties' },
    ]
  },
  {
    title: 'Features',
    links: [
      { to: '/features/scroll-snap', icon: '📜', label: 'Scroll Snap' },
      { to: '/features/aspect-ratio', icon: '🖼️', label: 'aspect-ratio' },
      { to: '/features/clamp', icon: '📏', label: 'clamp() & min/max' },
      { to: '/features/accessibility', icon: '♿', label: 'A11y в CSS' },
    ]
  },
  {
    title: '🎨 Examples',
    links: [
      { to: '/examples/cards', icon: '🃏', label: 'Card Patterns' },
      { to: '/examples/buttons', icon: '🔘', label: 'Button Styles' },
      { to: '/examples/forms', icon: '📝', label: 'Form Patterns' },
      { to: '/examples/navigation', icon: '🧭', label: 'Navigation' },
      { to: '/examples/layouts', icon: '📐', label: 'Layout Recipes' },
      { to: '/examples/animations', icon: '✨', label: 'Animations' },
      { to: '/examples/real-world', icon: '🌍', label: 'Real World' },
    ]
  },
  {
    title: '⚡ Performance',
    links: [
      { to: '/performance', icon: '⚡', label: 'CSS Performance' },
    ]
  },
  {
    title: '�️ Architecture',
    links: [
      { to: '/architecture', icon: '🏗️', label: 'CSS Architecture' },
    ]
  },
  {
    title: '�🎯 Собеседование',
    links: [
      { to: '/interview', icon: '🎤', label: 'Вопросы' },
    ]
  }
]

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('css-sidebar-collapsed') === 'true')
  const location = useLocation()

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      localStorage.setItem('css-sidebar-collapsed', String(!prev))
      return !prev
    })
  }

  return (
    <div className={`app-layout ${sidebarCollapsed ? 'layout-collapsed' : ''}`}>
      <ScrollToTop />
      {/* Mobile Header */}
      <div className="mobile-header">
        <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>
        <span>CSS Playground</span>
      </div>

      {/* Overlay for mobile */}
      <div 
        className={`mobile-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <nav className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-top">
            <h1>
              <img src="/logo.svg" alt="" width="28" height="28" style={{ marginRight: '8px' }} />
              CSS 101
            </h1>
            <ThemeToggle />
          </div>
          <p>Modern CSS for 2012 Devs</p>
          <a href={import.meta.env.VITE_DEPLOY_TARGET === 'github-pages' ? new URL('..', window.location.origin + import.meta.env.BASE_URL).toString() : 'http://localhost:3200'} className="back-to-index">← Все плейграунды</a>
        </div>
        
        {navSections.map(section => (
          <div key={section.title} className="nav-section">
            <div className="nav-section-title">{section.title}</div>
            {section.links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
                end={link.to === '/'}
              >
                <span className="nav-link-icon">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </div>
        ))}

        <button className="sidebar-collapse-btn" onClick={toggleSidebar}>
          {sidebarCollapsed ? '»' : '«'}
          <span className="collapse-text">{sidebarCollapsed ? 'Развернуть' : 'Свернуть'}</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<CSSTimeline />} />
          {/* Syntax */}
          <Route path="/syntax/overview" element={<ModernSyntax />} />
          <Route path="/syntax/nesting" element={<CSSNesting />} />
          <Route path="/syntax/layers" element={<CascadeLayers />} />
          <Route path="/syntax/property" element={<CSSProperty />} />
          <Route path="/syntax/scope" element={<CSSScope />} />
          <Route path="/syntax/colors" element={<ColorSyntax />} />
          <Route path="/syntax/selectors" element={<NewSelectors />} />
          <Route path="/syntax/properties" element={<NewProperties />} />
          <Route path="/syntax/media" element={<MediaQueries />} />
          {/* Layout */}
          <Route path="/layout/flexbox" element={<FlexboxGuide />} />
          <Route path="/layout/grid" element={<GridGuide />} />
          <Route path="/layout/container-queries" element={<ContainerQueries />} />
          <Route path="/layout/subgrid" element={<Subgrid />} />
          <Route path="/selectors/has" element={<HasSelector />} />
          <Route path="/selectors/is-where" element={<IsWhere />} />
          <Route path="/styling/variables" element={<CSSVariables />} />
          <Route path="/styling/colors" element={<ColorFunctions />} />
          <Route path="/styling/logical" element={<LogicalProperties />} />
          <Route path="/features/scroll-snap" element={<ScrollSnap />} />
          <Route path="/features/aspect-ratio" element={<AspectRatio />} />
          <Route path="/features/clamp" element={<ClampMinMax />} />
          <Route path="/features/accessibility" element={<CSSAccessibility />} />
          {/* Examples */}
          <Route path="/examples/cards" element={<CardPatterns />} />
          <Route path="/examples/buttons" element={<ButtonStyles />} />
          <Route path="/examples/forms" element={<FormPatterns />} />
          <Route path="/examples/navigation" element={<NavigationPatterns />} />
          <Route path="/examples/layouts" element={<LayoutRecipes />} />
          <Route path="/examples/animations" element={<AnimationPatterns />} />
          <Route path="/examples/real-world" element={<RealWorldExamples />} />
          <Route path="/architecture" element={<CSSArchitecture />} />
          <Route path="/performance" element={<CSSPerformance />} />
          <Route path="/interview" element={<InterviewQuestions />} />
        </Routes>
      </main>
    </div>
  )
}
