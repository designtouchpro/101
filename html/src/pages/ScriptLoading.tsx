import { useState } from 'react'

interface LoadStrategy {
  name: string
  code: string
  description: string
  timing: string
  useCase: string
}

const loadStrategies: LoadStrategy[] = [
  {
    name: 'Обычный <script>',
    code: '<script src="app.js"></script>',
    description: 'Блокирует парсинг HTML. Скрипт загружается и выполняется синхронно.',
    timing: 'HTML parsing → STOP → Download → Execute → Resume HTML',
    useCase: 'Критические скрипты в <head> (редко нужно)'
  },
  {
    name: 'defer',
    code: '<script src="app.js" defer></script>',
    description: 'Загружается параллельно с HTML, выполняется ПОСЛЕ парсинга HTML, ДО DOMContentLoaded.',
    timing: 'HTML parsing + Download parallel → Execute after parse → DOMContentLoaded',
    useCase: 'Большинство скриптов! Сохраняет порядок выполнения.'
  },
  {
    name: 'async',
    code: '<script src="analytics.js" async></script>',
    description: 'Загружается параллельно, выполняется СРАЗУ после загрузки (может быть до/после парсинга).',
    timing: 'HTML parsing + Download → Execute when ready (any time)',
    useCase: 'Независимые скрипты: аналитика, виджеты, реклама'
  },
  {
    name: 'type="module"',
    code: '<script type="module" src="app.mjs"></script>',
    description: 'ES модуль. По умолчанию defer. Поддерживает import/export. CORS обязателен.',
    timing: 'Как defer, но с модульной системой',
    useCase: 'Современные приложения с ES modules'
  },
  {
    name: 'async + type="module"',
    code: '<script type="module" async src="widget.mjs"></script>',
    description: 'Модуль с async поведением — выполняется сразу после загрузки.',
    timing: 'Download → Execute immediately',
    useCase: 'Независимые модули, которым не нужен DOM'
  },
]

interface ResourceHint {
  rel: string
  code: string
  description: string
  when: string
}

const resourceHints: ResourceHint[] = [
  {
    rel: 'preload',
    code: '<link rel="preload" href="critical.css" as="style">',
    description: 'Загрузить ресурс СЕЙЧАС с высоким приоритетом. Нужен as атрибут.',
    when: 'Критичные ресурсы: шрифты, CSS, LCP изображения'
  },
  {
    rel: 'prefetch',
    code: '<link rel="prefetch" href="next-page.js">',
    description: 'Загрузить в idle time для будущей навигации. Низкий приоритет.',
    when: 'Ресурсы следующей страницы, вероятные переходы'
  },
  {
    rel: 'preconnect',
    code: '<link rel="preconnect" href="https://api.example.com">',
    description: 'Установить соединение заранее: DNS + TCP + TLS handshake.',
    when: 'Сторонние домены: CDN, API, шрифты Google'
  },
  {
    rel: 'dns-prefetch',
    code: '<link rel="dns-prefetch" href="https://cdn.example.com">',
    description: 'Только DNS lookup. Легче чем preconnect.',
    when: 'Много сторонних доменов, старые браузеры'
  },
  {
    rel: 'modulepreload',
    code: '<link rel="modulepreload" href="utils.mjs">',
    description: 'Preload для ES модулей. Загружает и компилирует модуль.',
    when: 'Предзагрузка зависимостей ES модулей'
  },
  {
    rel: 'prerender',
    code: '<script type="speculationrules">...</script>',
    description: 'Полный рендер страницы заранее. Speculation Rules API (новое).',
    when: 'Очень вероятные переходы (Chrome)'
  },
]

export default function ScriptLoading() {
  const [activeStrategy, setActiveStrategy] = useState(0)
  const [showComparison, setShowComparison] = useState(false)

  return (
    <div className="page-container">
      <h1>⚡ Script & Link Loading</h1>
      <p className="page-description">
        Как загружать JavaScript и ресурсы эффективно. defer vs async, preload vs prefetch,
        и современные Speculation Rules.
      </p>

      {/* Script Loading Strategies */}
      <div className="card">
        <h2>📜 Стратегии загрузки скриптов</h2>
        
        <div className="strategy-tabs">
          {loadStrategies.map((s, i) => (
            <button 
              key={s.name}
              className={`tab ${activeStrategy === i ? 'active' : ''}`}
              onClick={() => setActiveStrategy(i)}
            >
              {s.name}
            </button>
          ))}
        </div>
        
        <div className="strategy-content">
          <div className="code-block">
            <pre>{loadStrategies[activeStrategy].code}</pre>
          </div>
          
          <div className="strategy-details">
            <p><strong>Описание:</strong> {loadStrategies[activeStrategy].description}</p>
            
            <div className="timing-visual">
              <strong>Timing:</strong>
              <code>{loadStrategies[activeStrategy].timing}</code>
            </div>
            
            <div className="use-case">
              <strong>Когда использовать:</strong> {loadStrategies[activeStrategy].useCase}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Comparison */}
      <div className="card">
        <h2>📊 Визуальное сравнение</h2>
        <button 
          className="btn btn-secondary"
          onClick={() => setShowComparison(!showComparison)}
        >
          {showComparison ? 'Скрыть' : 'Показать'} диаграмму
        </button>
        
        {showComparison && (
          <div className="timing-diagram">
            <div className="diagram-row">
              <span className="diagram-label">HTML Parsing</span>
              <div className="diagram-bar html-bar"></div>
            </div>
            
            <div className="diagram-section">
              <h4>Обычный script (блокирующий)</h4>
              <div className="diagram-row">
                <span className="diagram-label">HTML</span>
                <div className="diagram-bar html-bar" style={{ width: '30%' }}></div>
                <div className="diagram-bar stop-bar">STOP</div>
                <div className="diagram-bar html-bar" style={{ width: '40%' }}></div>
              </div>
              <div className="diagram-row">
                <span className="diagram-label">Script</span>
                <div className="spacer" style={{ width: '30%' }}></div>
                <div className="diagram-bar download-bar">Download</div>
                <div className="diagram-bar execute-bar">Exec</div>
              </div>
            </div>
            
            <div className="diagram-section">
              <h4>defer</h4>
              <div className="diagram-row">
                <span className="diagram-label">HTML</span>
                <div className="diagram-bar html-bar"></div>
              </div>
              <div className="diagram-row">
                <span className="diagram-label">Script</span>
                <div className="diagram-bar download-bar" style={{ width: '40%' }}></div>
                <div className="spacer" style={{ width: '35%' }}></div>
                <div className="diagram-bar execute-bar">Exec</div>
              </div>
            </div>
            
            <div className="diagram-section">
              <h4>async</h4>
              <div className="diagram-row">
                <span className="diagram-label">HTML</span>
                <div className="diagram-bar html-bar" style={{ width: '50%' }}></div>
                <div className="diagram-bar stop-bar" style={{ width: '10%' }}>⚡</div>
                <div className="diagram-bar html-bar" style={{ width: '40%' }}></div>
              </div>
              <div className="diagram-row">
                <span className="diagram-label">Script</span>
                <div className="diagram-bar download-bar" style={{ width: '50%' }}></div>
                <div className="diagram-bar execute-bar" style={{ width: '10%' }}>Exec</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resource Hints */}
      <div className="card">
        <h2>🔗 Resource Hints</h2>
        <p>Подсказки браузеру для оптимизации загрузки:</p>
        
        <div className="hints-grid">
          {resourceHints.map(hint => (
            <div key={hint.rel} className="hint-card">
              <h4><code>rel="{hint.rel}"</code></h4>
              <div className="code-block small">
                <pre>{hint.code}</pre>
              </div>
              <p>{hint.description}</p>
              <div className="hint-when">
                <strong>Когда:</strong> {hint.when}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* fetchpriority */}
      <div className="card">
        <h2>🎯 fetchpriority (2023+)</h2>
        <p>Явное указание приоритета загрузки:</p>
        
        <div className="code-examples">
          <div className="code-example">
            <h4>Высокий приоритет для LCP изображения</h4>
            <div className="code-block">
              <pre>{`<img src="hero.jpg" fetchpriority="high" alt="Hero">
<link rel="preload" href="critical.css" as="style" fetchpriority="high">`}</pre>
            </div>
          </div>
          
          <div className="code-example">
            <h4>Низкий приоритет для below-the-fold</h4>
            <div className="code-block">
              <pre>{`<img src="footer-logo.png" fetchpriority="low" loading="lazy" alt="Logo">
<script src="analytics.js" fetchpriority="low" async></script>`}</pre>
            </div>
          </div>
        </div>
        
        <div className="priority-table">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Значение</th>
                <th>Описание</th>
                <th>Влияние</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>high</code></td>
                <td>Высокий приоритет</td>
                <td>Загружается раньше других ресурсов того же типа</td>
              </tr>
              <tr>
                <td><code>low</code></td>
                <td>Низкий приоритет</td>
                <td>Загружается после других, не блокирует важное</td>
              </tr>
              <tr>
                <td><code>auto</code></td>
                <td>Браузер решает (default)</td>
                <td>Стандартная эвристика браузера</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Speculation Rules */}
      <div className="card">
        <h2>🔮 Speculation Rules API (Chrome 109+)</h2>
        <p>Предзагрузка и пререндер страниц на основе правил:</p>
        
        <div className="code-block">
          <pre>{`<script type="speculationrules">
{
  "prerender": [
    {
      "where": {
        "href_matches": "/products/*"
      },
      "eagerness": "moderate"
    }
  ],
  "prefetch": [
    {
      "urls": ["/about", "/contact"],
      "requires": ["anonymous-client-ip-when-cross-origin"]
    }
  ]
}
</script>`}</pre>
        </div>
        
        <div className="speculation-info">
          <div className="info-item">
            <strong>prerender</strong> — полный рендер страницы в скрытом табе
          </div>
          <div className="info-item">
            <strong>prefetch</strong> — только загрузка ресурсов
          </div>
          <div className="info-item">
            <strong>eagerness</strong>: immediate | eager | moderate | conservative
          </div>
        </div>
        
        <div className="warning-box">
          <strong>⚠️ Осторожно!</strong> Prerender выполняет JavaScript и тратит ресурсы.
          Используйте только для очень вероятных переходов.
        </div>
      </div>

      {/* blocking="render" */}
      <div className="card">
        <h2>🚫 blocking="render" (2023+)</h2>
        <p>Явная блокировка рендера до загрузки ресурса:</p>
        
        <div className="code-block">
          <pre>{`<!-- Критический CSS — блокирует рендер -->
<link rel="stylesheet" href="critical.css" blocking="render">

<!-- Скрипт, который должен выполниться до показа страницы -->
<script src="theme-init.js" blocking="render"></script>

<!-- Использование с inline стилями -->
<style blocking="render">
  :root { --theme-color: #3b82f6; }
</style>`}</pre>
        </div>
        
        <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>
          Раньше все CSS блокировали рендер неявно. Теперь можно контролировать явно,
          а с <code>media</code> queries делать некритический CSS неблокирующим.
        </p>
      </div>

      {/* Best Practices */}
      <div className="card">
        <h2>✅ Best Practices</h2>
        
        <div className="best-practices">
          <div className="practice">
            <h4>1. Используйте defer для большинства скриптов</h4>
            <code>{`<script src="app.js" defer></script>`}</code>
          </div>
          
          <div className="practice">
            <h4>2. async только для независимых скриптов</h4>
            <code>{`<script src="analytics.js" async></script>`}</code>
          </div>
          
          <div className="practice">
            <h4>3. preconnect для сторонних доменов</h4>
            <code>{`<link rel="preconnect" href="https://fonts.googleapis.com">`}</code>
          </div>
          
          <div className="practice">
            <h4>4. preload для критичных ресурсов</h4>
            <code>{`<link rel="preload" href="font.woff2" as="font" crossorigin>`}</code>
          </div>
          
          <div className="practice">
            <h4>5. fetchpriority="high" для LCP</h4>
            <code>{`<img src="hero.jpg" fetchpriority="high">`}</code>
          </div>
        </div>
      </div>

      <style>{`
        .strategy-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .tab {
          padding: 8px 16px;
          border: none;
          background: var(--bg-secondary);
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
        }
        .tab.active {
          background: var(--accent);
          color: white;
        }
        .strategy-content {
          background: var(--bg-secondary);
          padding: 20px;
          border-radius: 12px;
        }
        .strategy-details {
          margin-top: 16px;
        }
        .timing-visual {
          margin: 12px 0;
          padding: 12px;
          background: var(--bg-code);
          border-radius: 8px;
        }
        .timing-visual code {
          display: block;
          margin-top: 8px;
          font-size: 0.85em;
        }
        .use-case {
          padding: 12px;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 8px;
          border-left: 3px solid var(--success);
        }
        .timing-diagram {
          margin-top: 20px;
          padding: 20px;
          background: var(--bg-secondary);
          border-radius: 12px;
        }
        .diagram-section {
          margin: 20px 0;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }
        .diagram-section h4 {
          margin: 0 0 12px;
          font-size: 0.9em;
        }
        .diagram-row {
          display: flex;
          align-items: center;
          gap: 4px;
          margin: 8px 0;
        }
        .diagram-label {
          width: 60px;
          font-size: 0.75em;
          color: var(--text-secondary);
        }
        .diagram-bar {
          height: 24px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7em;
          color: white;
        }
        .html-bar {
          background: #3b82f6;
          flex: 1;
        }
        .download-bar {
          background: #f59e0b;
        }
        .execute-bar {
          background: #10b981;
        }
        .stop-bar {
          background: #ef4444;
          padding: 0 8px;
        }
        .spacer {
          height: 24px;
        }
        .hints-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
          margin-top: 16px;
        }
        .hint-card {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 12px;
        }
        .hint-card h4 {
          margin: 0 0 12px;
        }
        .hint-card p {
          margin: 12px 0;
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .hint-when {
          font-size: 0.85em;
          padding: 8px;
          background: var(--bg-code);
          border-radius: 4px;
        }
        .code-block.small pre {
          font-size: 0.8em;
          padding: 8px;
        }
        .code-examples {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .code-example h4 {
          margin: 0 0 8px;
          font-size: 0.9em;
        }
        .priority-table {
          margin-top: 20px;
          overflow-x: auto;
        }
        .priority-table table {
          width: 100%;
          border-collapse: collapse;
        }
        .priority-table th, .priority-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid var(--border);
        }
        .priority-table th {
          background: var(--bg-secondary);
        }
        .speculation-info {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .info-item {
          padding: 8px 12px;
          background: var(--bg-secondary);
          border-radius: 6px;
        }
        .warning-box {
          margin-top: 16px;
          padding: 16px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 8px;
        }
        .best-practices {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .practice {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .practice h4 {
          margin: 0 0 8px;
          font-size: 0.95em;
        }
        .practice code {
          display: block;
          padding: 8px;
          background: var(--bg-code);
          border-radius: 4px;
          font-size: 0.85em;
        }
      `}</style>
    </div>
  )
}
