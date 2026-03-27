import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function StylingGuide() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🎨 Стилизация в React</h1>
        <p>Различные способы добавления стилей к компонентам</p>
        <a 
          href="https://react.dev/learn#adding-styles" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 Документация React
        </a>
      </div>

      <OverviewSection />
      <InlineStylesDemo />
      <CSSClassesDemo />
      <CSSModulesSection />
      <CSSinJSSection />
      <TailwindSection />
    </div>
  )
}

function OverviewSection() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Способы стилизации</h3>
        <span className="card-badge">Обзор</span>
      </div>

      <div className="features-grid" style={{ marginTop: '16px' }}>
        <div className="feature-card">
          <span className="feature-icon">📝</span>
          <h4>Inline Styles</h4>
          <p>style={'{{}}'} — объект стилей</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📄</span>
          <h4>CSS файлы</h4>
          <p>className + .css файл</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📦</span>
          <h4>CSS Modules</h4>
          <p>.module.css — изоляция стилей</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">💅</span>
          <h4>CSS-in-JS</h4>
          <p>styled-components, Emotion</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🌊</span>
          <h4>Tailwind CSS</h4>
          <p>Utility-first CSS фреймворк</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🎭</span>
          <h4>Sass/SCSS</h4>
          <p>Препроцессор CSS</p>
        </div>
      </div>
    </div>
  )
}

function InlineStylesDemo() {
  const [isActive, setIsActive] = useState(false)
  const [size, setSize] = useState(16)

  const inlineCode = `// ═══════════════════════════════════════════════════════════════
// 📝 INLINE STYLES — объект стилей
// ═══════════════════════════════════════════════════════════════

// Базовый синтаксис
<div style={{ color: 'red', fontSize: '16px' }}>

// ⚠️ ОТЛИЧИЯ ОТ CSS:
// 1. camelCase вместо kebab-case
//    font-size → fontSize
//    background-color → backgroundColor

// 2. Значения — строки или числа
//    fontSize: 16 → fontSize: '16px' (пиксели автоматически)
//    fontSize: '1rem' → нужны кавычки для единиц

// 3. Двойные скобки: style={{ }}
//    Внешние { } — JSX выражение
//    Внутренние { } — JavaScript объект


// ═══════════════════════════════════════════════════════════════
// 🔧 ДИНАМИЧЕСКИЕ СТИЛИ
// ═══════════════════════════════════════════════════════════════

// Условные стили
<div style={{ 
  color: isActive ? 'green' : 'gray',
  fontWeight: isActive ? 'bold' : 'normal'
}}>

// Стили из переменных
const dynamicStyles = {
  fontSize: size + 'px',
  padding: size / 2
};
<div style={dynamicStyles}>


// ═══════════════════════════════════════════════════════════════
// ✅ КОГДА ИСПОЛЬЗОВАТЬ?
// ═══════════════════════════════════════════════════════════════
// • Динамические значения (из state/props)
// • Быстрое прототипирование
// • Единичные стили

// ❌ НЕ использовать для:
// • Псевдоклассов (:hover, :focus) — не работают!
// • Медиа-запросов
// • Сложной стилизации`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">📝 Inline Styles</h3>
        <span className="card-badge">style={'{{}}'}</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">📝</span>
        <div className="info-box-content">
          <div className="info-box-title">Объект стилей</div>
          <p>Inline styles — это JavaScript объект. Свойства в camelCase, значения — строки или числа.</p>
        </div>
      </div>

      <div className="visual-diagram" style={{ marginTop: '20px' }}>
        <div 
          style={{ 
            padding: '24px',
            backgroundColor: isActive ? 'rgba(34, 197, 94, 0.1)' : 'var(--bg-code)',
            border: `2px solid ${isActive ? 'var(--accent-green)' : 'var(--border)'}`,
            borderRadius: '12px',
            fontSize: `${size}px`,
            transition: 'all 0.3s ease',
            textAlign: 'center'
          }}
        >
          <p style={{ margin: 0, fontWeight: isActive ? 'bold' : 'normal' }}>
            {isActive ? '✅ Active state!' : 'Inactive state'}
          </p>
          <p style={{ margin: '8px 0 0', fontSize: '0.75em', color: 'var(--text-muted)' }}>
            fontSize: {size}px
          </p>
        </div>
      </div>

      <div className="controls" style={{ marginTop: '20px' }}>
        <button 
          className={`btn ${isActive ? 'btn-success' : 'btn-secondary'}`}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? 'Deactivate' : 'Activate'}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>Size:</span>
          <input
            type="range"
            min="12"
            max="32"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
          <span>{size}px</span>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={inlineCode} language="tsx" />
      </div>
    </div>
  )
}

function CSSClassesDemo() {
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'danger'>('primary')
  const [isDisabled, setIsDisabled] = useState(false)

  const cssCode = `// ═══════════════════════════════════════════════════════════════
// 📄 CSS КЛАССЫ — className
// ═══════════════════════════════════════════════════════════════

// Базовое использование
<div className="card">

// ⚠️ className, не class!
// class — зарезервированное слово в JavaScript


// ═══════════════════════════════════════════════════════════════
// 🔧 ДИНАМИЧЕСКИЕ КЛАССЫ
// ═══════════════════════════════════════════════════════════════

// Условный класс
<button className={isActive ? 'btn-active' : 'btn'}>

// Несколько классов
<div className={'card ' + (isLarge ? 'card-large' : '')}>

// Template literals (рекомендуется)
<div className={\`card \${isActive ? 'active' : ''}\`}>


// ═══════════════════════════════════════════════════════════════
// 📦 БИБЛИОТЕКА clsx / classnames
// ═══════════════════════════════════════════════════════════════

import clsx from 'clsx';

// Условные классы — удобно!
<button className={clsx(
  'btn',                    // всегда
  variant,                  // 'primary' | 'secondary'
  { 'disabled': isDisabled } // если true
)}>

// Эквивалент:
<button className={clsx({
  'btn': true,
  'btn-primary': variant === 'primary',
  'btn-secondary': variant === 'secondary',
  'disabled': isDisabled
})}>


// CSS файл (styles.css)
.btn {
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-primary {
  background: blue;
  color: white;
}

.btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`

  const getButtonClass = () => {
    let classes = 'btn'
    classes += ` btn-${variant}`
    if (isDisabled) classes += ' disabled'
    return classes
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">📄 CSS Classes</h3>
        <span className="card-badge">className</span>
      </div>

      <div className="info-box success">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">Рекомендуется</div>
          <p>CSS классы — основной способ стилизации. Для сложных условий используйте библиотеку <code>clsx</code>.</p>
        </div>
      </div>

      <div className="visual-diagram" style={{ marginTop: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <button 
            className={getButtonClass()}
            disabled={isDisabled}
            style={{ 
              padding: '12px 24px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: 'none',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              opacity: isDisabled ? 0.5 : 1,
              backgroundColor: variant === 'primary' ? 'var(--accent-blue)' : 
                              variant === 'secondary' ? 'var(--bg-hover)' : 
                              'var(--accent-red)',
              color: variant === 'secondary' ? 'var(--text-primary)' : 'white',
              transition: 'all 0.2s'
            }}
          >
            Button
          </button>
          <p style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            className="{getButtonClass()}"
          </p>
        </div>
      </div>

      <div className="controls" style={{ marginTop: '20px' }}>
        <select 
          className="input"
          value={variant}
          onChange={(e) => setVariant(e.target.value as 'primary' | 'secondary' | 'danger')}
          style={{ width: '150px' }}
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="danger">Danger</option>
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={isDisabled} 
            onChange={(e) => setIsDisabled(e.target.checked)} 
          />
          Disabled
        </label>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={cssCode} language="tsx" />
      </div>
    </div>
  )
}

function CSSModulesSection() {
  const modulesCode = `// ═══════════════════════════════════════════════════════════════
// 📦 CSS MODULES — изоляция стилей
// ═══════════════════════════════════════════════════════════════

// Файл: Button.module.css
.button {
  padding: 8px 16px;
  border-radius: 8px;
}

.primary {
  background: blue;
  color: white;
}

.large {
  padding: 12px 24px;
  font-size: 1.2rem;
}


// Файл: Button.tsx
import styles from './Button.module.css';

function Button({ variant, size }) {
  return (
    <button className={styles.button}>
      {/* styles.button → 'Button_button_x7ht3' */}
    </button>
  );
}

// Несколько классов
<button className={\`\${styles.button} \${styles.primary}\`}>

// С clsx
import clsx from 'clsx';
<button className={clsx(styles.button, styles[variant])}>


// ═══════════════════════════════════════════════════════════════
// ✅ ПРЕИМУЩЕСТВА CSS MODULES
// ═══════════════════════════════════════════════════════════════
// • Уникальные классы — нет конфликтов имён
// • Локальная область видимости
// • Обычный CSS синтаксис
// • Поддержка из коробки в Vite/Next.js

// ❌ Недостатки:
// • Нет доступа к JS переменным
// • Нужен отдельный файл`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">📦 CSS Modules</h3>
        <span className="card-badge">.module.css</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">📦</span>
        <div className="info-box-content">
          <div className="info-box-title">Изолированные стили</div>
          <p>CSS Modules автоматически генерируют уникальные имена классов, предотвращая конфликты.</p>
        </div>
      </div>

      <div className="visual-diagram" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div className="diagram-box effect" style={{ padding: '12px 20px' }}>
            <code>.button</code>
          </div>
          <div style={{ fontSize: '2rem', color: 'var(--text-muted)' }}>→</div>
          <div className="diagram-box state" style={{ padding: '12px 20px' }}>
            <code>.Button_button_x7ht3</code>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={modulesCode} language="tsx" />
      </div>
    </div>
  )
}

function CSSinJSSection() {
  const cssInJsCode = `// ═══════════════════════════════════════════════════════════════
// 💅 CSS-IN-JS — styled-components / Emotion
// ═══════════════════════════════════════════════════════════════

// styled-components
import styled from 'styled-components';

const Button = styled.button\`
  padding: 8px 16px;
  border-radius: 8px;
  background: \${props => props.primary ? 'blue' : 'gray'};
  color: white;
  
  &:hover {
    opacity: 0.9;
  }
  
  @media (max-width: 768px) {
    padding: 12px 20px;
  }
\`;

// Использование
<Button primary>Click me</Button>
<Button>Secondary</Button>


// Emotion (похожий синтаксис)
import { css } from '@emotion/react';

const buttonStyle = css\`
  padding: 8px 16px;
  background: blue;
\`;

<button css={buttonStyle}>Click me</button>


// ═══════════════════════════════════════════════════════════════
// ✅ ПРЕИМУЩЕСТВА CSS-IN-JS
// ═══════════════════════════════════════════════════════════════
// • Стили рядом с компонентом
// • Динамические стили через props
// • Автоматические вендорные префиксы
// • Темизация из коробки
// • Псевдоклассы и медиа-запросы

// ❌ Недостатки:
// • Runtime overhead (пересчёт стилей)
// • Больший bundle size
// • Не работает с Server Components (RSC)`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">💅 CSS-in-JS</h3>
        <span className="card-badge">styled-components</span>
      </div>

      <div className="info-box warning">
        <span className="info-box-icon">⚠️</span>
        <div className="info-box-content">
          <div className="info-box-title">Внимание: Runtime CSS</div>
          <p>CSS-in-JS библиотеки генерируют стили в runtime. Не работают с React Server Components.</p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={cssInJsCode} language="tsx" />
      </div>
    </div>
  )
}

function TailwindSection() {
  const [isActive, setIsActive] = useState(false)

  const tailwindCode = `// ═══════════════════════════════════════════════════════════════
// 🌊 TAILWIND CSS — utility-first
// ═══════════════════════════════════════════════════════════════

// Вместо написания CSS — готовые классы
<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  Click me
</button>

// px-4      → padding-left/right: 1rem
// py-2      → padding-top/bottom: 0.5rem
// bg-blue-500 → background-color: #3b82f6
// text-white → color: white
// rounded-lg → border-radius: 0.5rem
// hover:bg-blue-600 → :hover { background: #2563eb }


// ═══════════════════════════════════════════════════════════════
// 🔧 УСЛОВНЫЕ КЛАССЫ
// ═══════════════════════════════════════════════════════════════

import clsx from 'clsx';

<button className={clsx(
  'px-4 py-2 rounded-lg transition',
  isActive 
    ? 'bg-green-500 text-white' 
    : 'bg-gray-200 text-gray-700'
)}>
  {isActive ? 'Active' : 'Inactive'}
</button>


// ═══════════════════════════════════════════════════════════════
// ✅ ПРЕИМУЩЕСТВА TAILWIND
// ═══════════════════════════════════════════════════════════════
// • Быстрая разработка
// • Маленький итоговый CSS (PurgeCSS)
// • Консистентный дизайн
// • Отличная документация
// • Работает с RSC!

// ❌ Недостатки:
// • Длинные className
// • Кривая обучения
// • Выглядит "грязно" в JSX`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🌊 Tailwind CSS</h3>
        <span className="card-badge badge-success">Популярно</span>
      </div>

      <div className="info-box success">
        <span className="info-box-icon">🚀</span>
        <div className="info-box-content">
          <div className="info-box-title">Рекомендуется для новых проектов</div>
          <p>Tailwind — самый популярный способ стилизации в 2024+. Отлично работает с Server Components.</p>
        </div>
      </div>

      <div className="visual-diagram" style={{ marginTop: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={() => setIsActive(!isActive)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: isActive ? '#22c55e' : '#e5e7eb',
              color: isActive ? 'white' : '#374151',
              fontWeight: 500
            }}
          >
            {isActive ? 'Active' : 'Inactive'}
          </button>
          <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
            className="{isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'} px-4 py-2 rounded-lg"
          </p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={tailwindCode} language="tsx" />
      </div>
    </div>
  )
}
