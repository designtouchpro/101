import { Link } from 'react-router-dom'

const features = [
  {
    icon: '📅',
    title: 'CSS Timeline',
    description: 'История развития CSS с 2012 года — когда появились ключевые фичи',
    to: '/timeline'
  },
  {
    icon: '📦',
    title: 'Flexbox',
    description: 'Одномерные раскладки: выравнивание, распределение, порядок элементов',
    to: '/layout/flexbox'
  },
  {
    icon: '🔲',
    title: 'CSS Grid',
    description: 'Двумерные сетки: строки, колонки, области, auto-fill/fit',
    to: '/layout/grid'
  },
  {
    icon: '📐',
    title: 'Container Queries',
    description: 'Стили на основе размера контейнера, а не viewport',
    to: '/layout/container-queries'
  },
  {
    icon: '🎯',
    title: ':has() Selector',
    description: 'Родительский селектор — CSS наконец-то умеет смотреть на детей',
    to: '/selectors/has'
  },
  {
    icon: '🎨',
    title: 'CSS Variables',
    description: 'Custom Properties: динамические переменные в CSS',
    to: '/styling/variables'
  },
  {
    icon: '🌈',
    title: 'Color Functions',
    description: 'oklch(), color-mix(), relative colors — новый уровень работы с цветом',
    to: '/styling/colors'
  },
  {
    icon: '📏',
    title: 'clamp() & min/max',
    description: 'Адаптивные значения без media queries',
    to: '/features/clamp'
  },
]

const syntaxFeatures = [
  { icon: '🪆', title: 'CSS Nesting', description: 'Вложенные селекторы как в SASS — нативно!', to: '/syntax/nesting' },
  { icon: '📚', title: '@layer', description: 'Cascade Layers — контроль приоритета без !important', to: '/syntax/layers' },
  { icon: '🎨', title: '@property', description: 'Типизированные переменные с анимацией', to: '/syntax/property' },
  { icon: '🎯', title: '@scope', description: 'Изолированные стили для компонентов', to: '/syntax/scope' },
  { icon: '🌈', title: 'Color Syntax', description: 'rgb() без запятых, relative colors', to: '/syntax/colors' },
  { icon: '✨', title: 'New Selectors', description: ':focus-visible, :user-valid, ::marker', to: '/syntax/selectors' },
  { icon: '🆕', title: 'New Properties', description: 'inset, accent-color, text-wrap', to: '/syntax/properties' },
  { icon: '📱', title: 'Media Queries', description: 'Range syntax, prefers-*, hover/pointer', to: '/syntax/media' },
]

export default function Home() {
  return (
    <div className="page-container">
      <div className="home-hero">
        <h1>🎨 Modern CSS Playground</h1>
        <p>
          Добро пожаловать в 2024! За 12 лет CSS кардинально изменился. 
          Здесь собраны все ключевые фичи с интерактивными примерами.
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Что изменилось с 2012?</h2>
        </div>
        
        <div className="info-box">
          <span className="info-box-icon">💡</span>
          <div className="info-box-content">
            <div className="info-box-title">CSS эволюционировал</div>
            <p>
              В 2012 году Flexbox только появлялся, Grid не существовал, 
              а для центрирования использовали хаки. Сегодня CSS — это мощный 
              инструмент с переменными, контейнерными запросами, родительским 
              селектором и современными цветовыми пространствами.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🚫</div>
            <div style={{ fontWeight: 600 }}>2012</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>float, clearfix, inline-block хаки</div>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✨</div>
            <div style={{ fontWeight: 600 }}>2024</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Flexbox, Grid, Container Queries</div>
          </div>
        </div>
      </div>

      <h2 style={{ marginBottom: '20px' }}>🚀 Explore Features</h2>
      
      <div className="feature-grid">
        {features.map(feature => (
          <Link key={feature.to} to={feature.to} className="feature-card">
            <div className="feature-card-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </Link>
        ))}
      </div>

      <h2 style={{ margin: '40px 0 20px' }}>� Syntax Changes (2020-2024)</h2>
      <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
        Новый синтаксис и возможности CSS — nesting, @layer, @property и многое другое
      </p>
      
      <div className="feature-grid">
        {syntaxFeatures.map(item => (
          <Link key={item.to} to={item.to} className="feature-card">
            <div className="feature-card-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>

      <h2 style={{ margin: '40px 0 20px' }}>�🎨 UI Patterns Gallery</h2>
      <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
        Практические примеры для насмотренности — как делают на реальных сайтах
      </p>
      
      <div className="feature-grid">
        {[
          { icon: '🃏', title: 'Card Patterns', description: 'Карточки: hover, glassmorphism, neumorphism, bento grid', to: '/examples/cards' },
          { icon: '🔘', title: 'Button Styles', description: 'Все виды кнопок: primary, ghost, gradient, loading, groups', to: '/examples/buttons' },
          { icon: '📝', title: 'Form Patterns', description: 'Inputs, checkboxes, toggles, floating labels', to: '/examples/forms' },
          { icon: '🧭', title: 'Navigation', description: 'Headers, dropdowns, tabs, breadcrumbs, pagination', to: '/examples/navigation' },
          { icon: '📐', title: 'Layout Recipes', description: 'Holy grail, sticky footer, sidebar, card grids', to: '/examples/layouts' },
          { icon: '✨', title: 'Animations', description: 'Entry анимации, hover эффекты, skeleton loading', to: '/examples/animations' },
          { icon: '🌍', title: 'Real World', description: 'Паттерны Stripe, Linear, Vercel, Spotify, GitHub', to: '/examples/real-world' },
        ].map(item => (
          <Link key={item.to} to={item.to} className="feature-card">
            <div className="feature-card-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
