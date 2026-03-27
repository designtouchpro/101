import { useState } from 'react'
import CodeBlock from '@/components/CodeBlock'

export default function ClampMinMax() {
  const [containerWidth, setContainerWidth] = useState(600)
  
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          📏 clamp(), min(), max()
          <span className="year-badge">2020</span>
        </h1>
        <p>Адаптивные значения без медиа-запросов</p>
        <a 
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/clamp" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mdn-link"
        >
          📚 MDN: clamp()
        </a>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🎯</span>
        <div className="info-box-content">
          <div className="info-box-title">Зачем нужно?</div>
          <p>
            <code>clamp()</code> позволяет задать минимум, предпочтительное значение и максимум в одной строке.
            Идеально для fluid typography и адаптивных отступов!
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎮 Fluid Typography Demo</h3>
        </div>

        <div className="control-grid">
          <div className="control-item">
            <label>Ширина контейнера: {containerWidth}px</label>
            <input 
              type="range"
              min={320}
              max={1200}
              value={containerWidth}
              onChange={(e) => setContainerWidth(Number(e.target.value))}
            />
          </div>
        </div>

        <div 
          style={{
            width: containerWidth,
            maxWidth: '100%',
            padding: '24px',
            background: 'var(--bg-code)',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'width 0.2s'
          }}
        >
          <h1 style={{ 
            fontSize: `clamp(1.5rem, ${containerWidth / 30}px, 3rem)`,
            marginBottom: '12px',
            lineHeight: 1.2
          }}>
            Fluid Heading
          </h1>
          <p style={{ 
            fontSize: `clamp(0.875rem, ${containerWidth / 60}px, 1.125rem)`,
            lineHeight: 1.6,
            color: 'var(--text-secondary)'
          }}>
            Этот текст автоматически масштабируется в зависимости от ширины контейнера. 
            Минимум 14px, максимум 18px, между — вычисляется.
          </p>
        </div>

        <CodeBlock 
          code={`/* Fluid Typography */
h1 {
  /* min: 1.5rem, max: 3rem, preferred: зависит от viewport */
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
}

p {
  font-size: clamp(0.875rem, 1.5vw + 0.5rem, 1.125rem);
}

/* Формула для точного расчёта:
   clamp(MIN, PREFERRED, MAX)
   
   Preferred: (MIN + (MAX - MIN) * (100vw - MINVW) / (MAXVW - MINVW))
   Упрощённо: slope * viewport + intercept
*/`}
          title="📝 Fluid Typography"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📊 clamp() vs min() vs max()</h3>
        </div>

        <div className="grid-3">
          <div className="info-box">
            <span className="info-box-icon">📏</span>
            <div className="info-box-content">
              <div className="info-box-title">clamp(MIN, VAL, MAX)</div>
              <p>Значение между min и max</p>
              <code style={{ fontSize: '12px' }}>clamp(100px, 50%, 300px)</code>
            </div>
          </div>

          <div className="info-box">
            <span className="info-box-icon">⬇️</span>
            <div className="info-box-content">
              <div className="info-box-title">min(A, B, ...)</div>
              <p>Наименьшее из значений</p>
              <code style={{ fontSize: '12px' }}>min(100%, 600px)</code>
            </div>
          </div>

          <div className="info-box">
            <span className="info-box-icon">⬆️</span>
            <div className="info-box-content">
              <div className="info-box-title">max(A, B, ...)</div>
              <p>Наибольшее из значений</p>
              <code style={{ fontSize: '12px' }}>max(50%, 300px)</code>
            </div>
          </div>
        </div>

        <CodeBlock 
          code={`/* clamp = max(MIN, min(VAL, MAX)) */

/* min() — ограничение сверху */
.card {
  width: min(100%, 600px);
  /* То же что max-width: 600px, но в одном свойстве */
}

/* max() — ограничение снизу */
.sidebar {
  width: max(200px, 25%);
  /* Минимум 200px, даже если 25% меньше */
}

/* clamp() — ограничение с обеих сторон */
.container {
  width: clamp(320px, 90%, 1200px);
  /* min-width: 320px, max-width: 1200px, preferred: 90% */
}`}
          title="📝 Сравнение"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎨 Практические примеры</h3>
        </div>

        <CodeBlock 
          code={`/* Адаптивный padding без @media */
.section {
  padding: clamp(1rem, 5vw, 3rem);
}

/* Адаптивный gap в grid */
.grid {
  gap: clamp(16px, 3vw, 32px);
}

/* Адаптивная ширина колонок */
.grid {
  grid-template-columns: repeat(
    auto-fit, 
    minmax(min(100%, 300px), 1fr)
  );
}

/* Кнопка с мин. шириной */
.button {
  width: max(100px, min-content);
}

/* Изображение в пропорциях контейнера */
.hero-image {
  height: clamp(300px, 50vh, 600px);
}

/* Адаптивный border-radius */
.card {
  border-radius: clamp(8px, 2vw, 24px);
}`}
          title="📝 Real-world examples"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔢 Калькулятор Fluid Typography</h3>
        </div>

        <div className="info-box">
          <span className="info-box-icon">🧮</span>
          <div className="info-box-content">
            <div className="info-box-title">Формула</div>
            <p>
              Для fluid значения между <strong>minSize</strong> на <strong>minViewport</strong>{' '}
              и <strong>maxSize</strong> на <strong>maxViewport</strong>:
            </p>
            <pre style={{ 
              background: 'var(--bg-code)', 
              padding: '12px', 
              borderRadius: '6px',
              marginTop: '12px',
              overflow: 'auto'
            }}>
{`slope = (maxSize - minSize) / (maxViewport - minViewport)
intercept = minSize - slope * minViewport

clamp(minSize, slope * 100vw + intercept, maxSize)

/* Пример: 16px на 320px, 24px на 1280px */
slope = (24 - 16) / (1280 - 320) = 0.00833
intercept = 16 - 0.00833 * 320 = 13.33

clamp(1rem, 0.833vw + 0.833rem, 1.5rem)`}
            </pre>
          </div>
        </div>

        <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>
          Или используйте <a href="https://utopia.fyi/type/calculator/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-css)' }}>Utopia Calculator</a> для автогенерации!
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">⚡ min() для безопасных значений</h3>
        </div>

        <CodeBlock 
          code={`/* Проблема: 300px может быть больше контейнера на мобилке */
.card {
  width: 300px; /* ❌ Overflow на узких экранах */
}

/* Решение с min() */
.card {
  width: min(300px, 100%); /* ✅ Максимум 300px или 100% */
}

/* В minmax() для grid */
.grid {
  /* Было: */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* Проблема: ломается если контейнер меньше 300px */

  /* Стало: */
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  /* ✅ Безопасно на любом экране */
}`}
          title="📝 min() для отзывчивости"
        />
      </div>
    </div>
  )
}
