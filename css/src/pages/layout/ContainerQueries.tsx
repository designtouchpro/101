import { useState } from 'react'
import CodeBlock from '@/components/CodeBlock'

export default function ContainerQueries() {
  const [containerWidth, setContainerWidth] = useState(400)

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          📐 Container Queries
          <span className="year-badge">2022</span>
        </h1>
        <p>Стили на основе размера контейнера, а не viewport. Революция для компонентов!</p>
        <a 
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mdn-link"
        >
          📚 MDN: Container Queries
        </a>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🚀</span>
        <div className="info-box-content">
          <div className="info-box-title">Почему это важно?</div>
          <p>
            Media queries смотрят на размер viewport. Но компонент не знает, где он будет использоваться — 
            в sidebar или на весь экран. Container Queries решают эту проблему!
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎮 Интерактивный пример</h3>
          <span className="card-badge">Resize!</span>
        </div>

        <div className="control-group" style={{ marginBottom: '16px' }}>
          <label>Ширина контейнера: {containerWidth}px</label>
          <input 
            type="range" 
            min="200" 
            max="800" 
            value={containerWidth}
            onChange={e => setContainerWidth(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div 
          style={{ 
            width: `${containerWidth}px`,
            maxWidth: '100%',
            containerType: 'inline-size',
            background: 'var(--bg-code)',
            borderRadius: '12px',
            padding: '20px',
            border: '2px solid var(--accent-css)',
            transition: 'width 0.3s ease'
          }}
        >
          <style>{`
            .cq-card {
              display: flex;
              flex-direction: column;
              gap: 12px;
              padding: 16px;
              background: var(--bg-card);
              border-radius: 8px;
            }
            .cq-card-image {
              width: 100%;
              height: 100px;
              background: linear-gradient(135deg, var(--accent-css), var(--accent-purple));
              border-radius: 8px;
            }
            .cq-card-title {
              font-size: 1rem;
              font-weight: 600;
            }
            .cq-card-text {
              font-size: 0.85rem;
              color: var(--text-secondary);
            }
            
            @container (min-width: 400px) {
              .cq-card {
                flex-direction: row;
                align-items: center;
              }
              .cq-card-image {
                width: 120px;
                height: 80px;
                flex-shrink: 0;
              }
              .cq-card-title {
                font-size: 1.25rem;
              }
            }
            
            @container (min-width: 600px) {
              .cq-card {
                padding: 24px;
              }
              .cq-card-image {
                width: 200px;
                height: 120px;
              }
              .cq-card-title {
                font-size: 1.5rem;
              }
              .cq-card-text {
                font-size: 1rem;
              }
            }
          `}</style>
          
          <div className="cq-card">
            <div className="cq-card-image" />
            <div className="cq-card-content">
              <div className="cq-card-title">Container Query Card</div>
              <div className="cq-card-text">
                Этот компонент меняет layout в зависимости от ширины своего контейнера,
                а не viewport!
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {containerWidth < 400 && '📱 Мобильный layout (stacked)'}
          {containerWidth >= 400 && containerWidth < 600 && '📱 Tablet layout (row)'}
          {containerWidth >= 600 && '🖥️ Desktop layout (expanded)'}
        </div>

        <CodeBlock 
          code={`/* 1. Объявляем контейнер */
.container {
  container-type: inline-size;
  /* или container-type: size; для обоих измерений */
  container-name: card-container; /* опционально */
}

/* 2. Пишем container queries */
@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}

@container (min-width: 600px) {
  .card {
    padding: 24px;
    font-size: 1.5rem;
  }
}

/* По имени контейнера */
@container card-container (min-width: 400px) {
  /* ... */
}`}
          title="📝 Синтаксис"
        />
      </div>

      {/* Container Query Units */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📏 Container Query Units</h3>
        </div>

        <div className="info-box success">
          <span className="info-box-icon">✨</span>
          <div className="info-box-content">
            <div className="info-box-title">Новые единицы измерения!</div>
            <p>
              Так же как <code>vw/vh</code> относятся к viewport, 
              <code>cqw/cqh</code> относятся к контейнеру.
            </p>
          </div>
        </div>

        <table className="comparison-table">
          <thead>
            <tr>
              <th>Unit</th>
              <th>Описание</th>
              <th>Аналог viewport</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>cqw</code></td>
              <td>1% ширины контейнера</td>
              <td><code>vw</code></td>
            </tr>
            <tr>
              <td><code>cqh</code></td>
              <td>1% высоты контейнера</td>
              <td><code>vh</code></td>
            </tr>
            <tr>
              <td><code>cqi</code></td>
              <td>1% inline-размера (обычно ширина)</td>
              <td><code>vi</code></td>
            </tr>
            <tr>
              <td><code>cqb</code></td>
              <td>1% block-размера (обычно высота)</td>
              <td><code>vb</code></td>
            </tr>
            <tr>
              <td><code>cqmin</code></td>
              <td>Меньшее из cqi/cqb</td>
              <td><code>vmin</code></td>
            </tr>
            <tr>
              <td><code>cqmax</code></td>
              <td>Большее из cqi/cqb</td>
              <td><code>vmax</code></td>
            </tr>
          </tbody>
        </table>

        <CodeBlock 
          code={`.title {
  /* Размер шрифта = 5% от ширины контейнера */
  font-size: 5cqw;
  
  /* С clamp для ограничений */
  font-size: clamp(1rem, 5cqw, 3rem);
}`}
          title="📝 Пример использования"
        />
      </div>

      {/* vs Media Queries */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔄 Container Queries vs Media Queries</h3>
        </div>

        <div className="grid-2">
          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--accent-red)' }}>❌ Media Queries</h4>
            <CodeBlock 
              code={`/* Компонент не знает свой контекст */
@media (min-width: 600px) {
  .card {
    flex-direction: row;
  }
}

/* Проблема: в sidebar на 1200px 
   экране карточка всё равно row,
   хотя sidebar узкий! */`}
            />
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--accent-green)' }}>✅ Container Queries</h4>
            <CodeBlock 
              code={`/* Компонент адаптируется к контейнеру */
@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}

/* В sidebar карточка будет column,
   в main content — row. 
   Компонент "умный"! */`}
            />
          </div>
        </div>
      </div>

      {/* Style Queries */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🆕 Style Queries (Experimental)</h3>
          <span className="card-badge">Новинка!</span>
        </div>

        <div className="info-box warning">
          <span className="info-box-icon">⚠️</span>
          <div className="info-box-content">
            <div className="info-box-title">Пока экспериментально</div>
            <p>
              Style Queries позволяют стилизовать на основе CSS-переменных контейнера.
              Поддержка в браузерах ограничена.
            </p>
          </div>
        </div>

        <CodeBlock 
          code={`.container {
  --theme: dark;
}

/* Стили на основе CSS-переменной! */
@container style(--theme: dark) {
  .card {
    background: #1a1a1a;
    color: white;
  }
}

@container style(--theme: light) {
  .card {
    background: white;
    color: black;
  }
}`}
          title="📝 Style Queries"
        />
      </div>
    </div>
  )
}
