import { useState } from 'react'
import CodeBlock from '@/components/CodeBlock'

export default function CSSVariables() {
  const [primaryColor, setPrimaryColor] = useState('#264de4')
  const [borderRadius, setBorderRadius] = useState(12)
  const [spacing, setSpacing] = useState(16)

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          🎨 CSS Variables
          <span className="year-badge">2015</span>
        </h1>
        <p>Custom Properties — динамические переменные прямо в CSS</p>
        <a 
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/--*" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mdn-link"
        >
          📚 MDN: CSS Custom Properties
        </a>
      </div>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">Зачем нужны?</div>
          <p>
            В отличие от SASS/LESS переменных, CSS Variables работают в рантайме!
            Их можно менять через JS, они каскадируются и наследуются.
          </p>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎮 Интерактивный пример</h3>
          <span className="card-badge">Попробуй!</span>
        </div>

        <div className="flex-controls">
          <div className="control-group">
            <label>--primary-color</label>
            <input 
              type="color" 
              value={primaryColor}
              onChange={e => setPrimaryColor(e.target.value)}
              style={{ height: '40px', cursor: 'pointer' }}
            />
          </div>
          <div className="control-group">
            <label>--border-radius: {borderRadius}px</label>
            <input 
              type="range" 
              min="0" 
              max="32" 
              value={borderRadius}
              onChange={e => setBorderRadius(Number(e.target.value))}
            />
          </div>
          <div className="control-group">
            <label>--spacing: {spacing}px</label>
            <input 
              type="range" 
              min="4" 
              max="48" 
              value={spacing}
              onChange={e => setSpacing(Number(e.target.value))}
            />
          </div>
        </div>

        <div 
          style={{ 
            marginTop: '20px',
            padding: `${spacing}px`,
            background: 'var(--bg-code)',
            borderRadius: '12px',
            // Используем переменные через inline style
            ['--demo-primary' as any]: primaryColor,
            ['--demo-radius' as any]: `${borderRadius}px`,
            ['--demo-spacing' as any]: `${spacing}px`
          }}
        >
          <div style={{ display: 'flex', gap: `${spacing}px`, flexWrap: 'wrap' }}>
            <div style={{ 
              padding: `${spacing}px ${spacing * 1.5}px`,
              background: primaryColor,
              borderRadius: `${borderRadius}px`,
              color: 'white',
              fontWeight: 600
            }}>
              Button
            </div>
            <div style={{ 
              padding: `${spacing}px ${spacing * 1.5}px`,
              border: `2px solid ${primaryColor}`,
              borderRadius: `${borderRadius}px`,
              color: primaryColor,
              fontWeight: 600
            }}>
              Outlined
            </div>
            <div style={{ 
              padding: `${spacing}px`,
              background: `${primaryColor}20`,
              borderRadius: `${borderRadius}px`,
              color: primaryColor
            }}>
              Card content
            </div>
          </div>
        </div>

        <CodeBlock 
          code={`:root {
  --primary-color: ${primaryColor};
  --border-radius: ${borderRadius}px;
  --spacing: ${spacing}px;
}

.button {
  padding: var(--spacing) calc(var(--spacing) * 1.5);
  background: var(--primary-color);
  border-radius: var(--border-radius);
}

.button-outlined {
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}`}
          title="📝 Сгенерированный CSS"
        />
      </div>

      {/* Basics */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📚 Основы синтаксиса</h3>
        </div>

        <CodeBlock 
          code={`/* Объявление переменных (обычно в :root) */
:root {
  --color-primary: #264de4;
  --color-secondary: #a855f7;
  --font-size-base: 16px;
  --spacing-unit: 8px;
  --border-radius: 8px;
}

/* Использование */
.button {
  background: var(--color-primary);
  padding: calc(var(--spacing-unit) * 2);
  border-radius: var(--border-radius);
}

/* Fallback значение */
.card {
  background: var(--bg-card, #1a1a1a);
  /* Если --bg-card не определена, используется #1a1a1a */
}

/* Вложенный fallback */
.text {
  color: var(--text-color, var(--color-primary, blue));
}`}
          title="📝 Синтаксис"
        />
      </div>

      {/* Cascading */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🌊 Каскадирование и наследование</h3>
          <span className="card-badge">Ключевое!</span>
        </div>

        <div className="info-box warning">
          <span className="info-box-icon">⚠️</span>
          <div className="info-box-content">
            <div className="info-box-title">Переменные каскадируются!</div>
            <p>
              В отличие от SASS, CSS Variables наследуются и могут быть переопределены
              в любом месте DOM-дерева.
            </p>
          </div>
        </div>

        <CodeBlock 
          code={`:root {
  --text-color: black;
}

.dark-theme {
  --text-color: white;
  /* Все дети унаследуют white! */
}

.card {
  color: var(--text-color);
  /* В dark-theme будет white */
}

/* Локальное переопределение */
.special-card {
  --text-color: red;
  color: var(--text-color); /* red */
}`}
          title="📝 Каскадирование"
        />

        {/* Visual Demo */}
        <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
          <div style={{ 
            flex: 1,
            padding: '16px',
            background: 'white',
            borderRadius: '8px',
            ['--demo-text' as any]: 'black'
          }}>
            <span style={{ color: 'var(--demo-text, black)' }}>Light Theme</span>
          </div>
          <div style={{ 
            flex: 1,
            padding: '16px',
            background: '#1a1a1a',
            borderRadius: '8px',
            ['--demo-text' as any]: 'white'
          }}>
            <span style={{ color: 'var(--demo-text, white)' }}>Dark Theme</span>
          </div>
        </div>
      </div>

      {/* JavaScript Integration */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔧 Интеграция с JavaScript</h3>
        </div>

        <div className="info-box success">
          <span className="info-box-icon">✨</span>
          <div className="info-box-content">
            <div className="info-box-title">Главное преимущество!</div>
            <p>
              CSS Variables можно читать и менять через JavaScript в рантайме.
              Идеально для тем, динамических стилей и анимаций.
            </p>
          </div>
        </div>

        <CodeBlock 
          code={`// Получить значение переменной
const root = document.documentElement;
const primaryColor = getComputedStyle(root)
  .getPropertyValue('--color-primary');

// Установить значение
root.style.setProperty('--color-primary', '#ff0000');

// На конкретном элементе
element.style.setProperty('--local-var', '20px');

// Удалить (вернуться к наследованию)
element.style.removeProperty('--local-var');

// React: через inline styles
<div style={{ '--spacing': '16px' }}>
  {children}
</div>`}
          title="📝 JavaScript API"
        />
      </div>

      {/* Real-world patterns */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🌍 Паттерны использования</h3>
        </div>

        <CodeBlock 
          code={`/* 1. Система цветов */
:root {
  --color-primary-h: 220;
  --color-primary-s: 70%;
  --color-primary-l: 50%;
  
  --color-primary: hsl(
    var(--color-primary-h),
    var(--color-primary-s),
    var(--color-primary-l)
  );
  
  --color-primary-light: hsl(
    var(--color-primary-h),
    var(--color-primary-s),
    calc(var(--color-primary-l) + 20%)
  );
}

/* 2. Spacing система */
:root {
  --space-unit: 8px;
  --space-xs: calc(var(--space-unit) * 0.5);
  --space-sm: var(--space-unit);
  --space-md: calc(var(--space-unit) * 2);
  --space-lg: calc(var(--space-unit) * 3);
  --space-xl: calc(var(--space-unit) * 4);
}

/* 3. Компонентные переменные */
.card {
  --card-padding: var(--space-md);
  --card-radius: 8px;
  --card-shadow: 0 2px 8px rgba(0,0,0,0.1);
  
  padding: var(--card-padding);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
}

.card.compact {
  --card-padding: var(--space-sm);
}

/* 4. Темы */
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a1a1a;
}

[data-theme="dark"] {
  --bg-primary: #0a0a0a;
  --text-primary: #f5f5f5;
}`}
          title="📝 Паттерны"
        />
      </div>

      {/* vs SASS */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">⚔️ CSS Variables vs SASS Variables</h3>
        </div>

        <table className="comparison-table">
          <thead>
            <tr>
              <th>Аспект</th>
              <th>CSS Variables</th>
              <th>SASS Variables</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Когда работает</td>
              <td>Runtime (в браузере)</td>
              <td>Compile time (при сборке)</td>
            </tr>
            <tr>
              <td>Изменение через JS</td>
              <td>✅ Да</td>
              <td>❌ Нет</td>
            </tr>
            <tr>
              <td>Каскадирование</td>
              <td>✅ Да</td>
              <td>❌ Нет</td>
            </tr>
            <tr>
              <td>Наследование</td>
              <td>✅ Да</td>
              <td>❌ Нет</td>
            </tr>
            <tr>
              <td>Media Queries</td>
              <td>✅ Можно менять в @media</td>
              <td>❌ Фиксированы</td>
            </tr>
            <tr>
              <td>DevTools</td>
              <td>✅ Видны и редактируемы</td>
              <td>❌ Скомпилированы</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
