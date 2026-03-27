import CodeBlock from '@/components/CodeBlock'
import { Link } from 'react-router-dom'

const timelineData = [
  {
    year: 2012,
    title: 'Flexbox (Working Draft)',
    icon: '📦',
    description: 'Первые браузеры начинают поддерживать Flexbox. Прощай, float-based layouts!',
    features: ['display: flex', 'justify-content', 'align-items', 'flex-grow/shrink'],
    color: '#22c55e',
    link: '/layout/flexbox'
  },
  {
    year: 2015,
    title: 'CSS Variables (Custom Properties)',
    icon: '🎨',
    description: 'Наконец-то переменные в CSS! Можно менять значения динамически через JS.',
    features: ['--custom-property', 'var()', 'Каскадирование', 'Fallback values'],
    color: '#a855f7',
    link: '/styling/variables'
  },
  {
    year: 2017,
    title: 'CSS Grid Layout',
    icon: '🔲',
    description: 'Двумерная система раскладки. Больше никаких CSS-фреймворков для сеток!',
    features: ['grid-template-columns', 'grid-template-rows', 'grid-area', 'auto-fill/fit'],
    color: '#ec4899',
    link: '/layout/grid'
  },
  {
    year: 2019,
    title: 'Subgrid',
    icon: '🔳',
    description: 'Вложенные гриды могут наследовать линии родительского грида.',
    features: ['grid-template-columns: subgrid', 'grid-template-rows: subgrid'],
    color: '#f59e0b',
    link: '/layout/subgrid'
  },
  {
    year: 2020,
    title: 'aspect-ratio',
    icon: '🖼️',
    description: 'Нативное соотношение сторон без padding-hack!',
    features: ['aspect-ratio: 16/9', 'aspect-ratio: 1'],
    color: '#06b6d4',
    link: '/features/aspect-ratio'
  },
  {
    year: 2021,
    title: ':is() и :where()',
    icon: '✨',
    description: 'Группировка селекторов с разной специфичностью.',
    features: [':is()', ':where()', 'Forgiving selector list'],
    color: '#8b5cf6',
    link: '/selectors/is-where'
  },
  {
    year: 2022,
    title: 'Container Queries',
    icon: '📐',
    description: 'Стили на основе размера контейнера, а не viewport. Революция для компонентов!',
    features: ['container-type', '@container', 'container-name', 'cqi/cqw units'],
    color: '#ef4444',
    link: '/layout/container-queries'
  },
  {
    year: 2022,
    title: ':has() Selector',
    icon: '🎯',
    description: 'Родительский селектор! CSS теперь может выбирать элементы на основе их потомков.',
    features: [':has()', 'Parent selector', 'Previous sibling'],
    color: '#22d3ee',
    link: '/selectors/has'
  },
  {
    year: 2023,
    title: 'oklch() и Color Functions',
    icon: '🌈',
    description: 'Новые цветовые пространства с лучшей перцептивной равномерностью.',
    features: ['oklch()', 'oklab()', 'color-mix()', 'Relative colors'],
    color: '#84cc16',
    link: '/styling/colors'
  },
  {
    year: 2023,
    title: 'Nesting (Native)',
    icon: '📝',
    description: 'Вложенные правила прямо в CSS без препроцессоров!',
    features: ['& selector', 'Nested rules', '@media внутри'],
    color: '#f97316'
  },
  {
    year: 2024,
    title: 'Scroll-driven Animations',
    icon: '📜',
    description: 'Анимации, привязанные к скроллу, без JavaScript!',
    features: ['animation-timeline', 'view()', 'scroll()'],
    color: '#0ea5e9'
  }
]

export default function CSSTimeline() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📅 CSS Timeline</h1>
        <p>История развития CSS с 2012 года. Каждая фича изменила подход к вёрстке.</p>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🕰️</span>
        <div className="info-box-content">
          <div className="info-box-title">Представьте, что вы из 2012...</div>
          <p>
            Тогда для центрирования использовали <code>margin: 0 auto</code> и молитвы, 
            колонки делали через <code>float</code>, а для "священного грааля" layout 
            нужно было 50 строк CSS. Сегодня всё это — 2-3 строки.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ marginBottom: '16px' }}>Центрирование: тогда vs сейчас</h3>
        <div className="grid-2">
          <div>
            <CodeBlock 
              code={`/* 2012: Вертикальное центрирование 😱 */
.parent {
  display: table;
}
.child {
  display: table-cell;
  vertical-align: middle;
}

/* Или хуже... */
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`}
              title="❌ 2012"
            />
          </div>
          <div>
            <CodeBlock 
              code={`/* 2024: Идеальное центрирование ✨ */
.parent {
  display: grid;
  place-items: center;
}

/* Или */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}`}
              title="✅ 2024"
            />
          </div>
        </div>
      </div>

      <h2 style={{ margin: '32px 0 24px' }}>🚀 Evolution Timeline</h2>

      <div className="timeline">
        {timelineData.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot" style={{ background: item.color }} />
            <div className="timeline-year">{item.year}</div>
            <div className="timeline-content">
              <div className="timeline-title">
                <span>{item.icon}</span>
                {item.title}
              </div>
              <p className="timeline-description">{item.description}</p>
              <div className="timeline-features">
                {item.features.map((feature, i) => (
                  <span key={i} className="feature-tag" style={{ background: `${item.color}20`, color: item.color }}>
                    {feature}
                  </span>
                ))}
              </div>
              {item.link && (
                <Link to={item.link} className="mdn-link" style={{ marginTop: '16px', borderColor: item.color, color: item.color }}>
                  Подробнее →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '32px' }}>
        <div className="card-header">
          <h3 className="card-title">📊 Browser Support Timeline</h3>
        </div>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Chrome</th>
              <th>Firefox</th>
              <th>Safari</th>
              <th>Edge</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>flexbox</code></td>
              <td>29 (2013)</td>
              <td>28 (2013)</td>
              <td>9 (2015)</td>
              <td>12 (2015)</td>
            </tr>
            <tr>
              <td><code>CSS Grid</code></td>
              <td>57 (2017)</td>
              <td>52 (2017)</td>
              <td>10.1 (2017)</td>
              <td>16 (2017)</td>
            </tr>
            <tr>
              <td><code>CSS Variables</code></td>
              <td>49 (2016)</td>
              <td>31 (2014)</td>
              <td>9.1 (2016)</td>
              <td>15 (2017)</td>
            </tr>
            <tr>
              <td><code>:has()</code></td>
              <td>105 (2022)</td>
              <td>121 (2024)</td>
              <td>15.4 (2022)</td>
              <td>105 (2022)</td>
            </tr>
            <tr>
              <td><code>Container Queries</code></td>
              <td>105 (2022)</td>
              <td>110 (2023)</td>
              <td>16 (2022)</td>
              <td>105 (2022)</td>
            </tr>
            <tr>
              <td><code>oklch()</code></td>
              <td>111 (2023)</td>
              <td>113 (2023)</td>
              <td>15.4 (2022)</td>
              <td>111 (2023)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
