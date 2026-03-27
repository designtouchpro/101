import { useState } from 'react'

interface CorsScenario {
  name: string
  description: string
  allowed: boolean
  headers: Record<string, string>
}

const corsScenarios: CorsScenario[] = [
  {
    name: 'Simple GET (same-origin)',
    description: 'Запрос на тот же домен',
    allowed: true,
    headers: {}
  },
  {
    name: 'Cross-origin GET',
    description: 'GET на другой домен без credentials',
    allowed: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  {
    name: 'Cross-origin with credentials',
    description: 'Запрос с cookies на другой домен',
    allowed: true,
    headers: { 
      'Access-Control-Allow-Origin': 'https://example.com',
      'Access-Control-Allow-Credentials': 'true'
    }
  },
  {
    name: 'Preflight (PUT/DELETE)',
    description: 'Небезопасные методы требуют preflight',
    allowed: true,
    headers: {
      'Access-Control-Allow-Origin': 'https://example.com',
      'Access-Control-Allow-Methods': 'PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  },
]

export default function CorsDemo() {
  const [activeDemo, setActiveDemo] = useState<'theory' | 'test' | 'config'>('theory')
  const [testUrl, setTestUrl] = useState('https://httpbin.org/get')
  const [testResult, setTestResult] = useState<{ success: boolean; error?: string; headers?: Record<string, string> } | null>(null)
  const [loading, setLoading] = useState(false)

  const testCors = async () => {
    setLoading(true)
    setTestResult(null)
    
    try {
      const res = await fetch(testUrl, { mode: 'cors' })
      const headers: Record<string, string> = {}
      res.headers.forEach((v, k) => headers[k] = v)
      
      setTestResult({
        success: true,
        headers
      })
    } catch (err: any) {
      setTestResult({
        success: false,
        error: err.message || 'CORS error - запрос заблокирован браузером'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h1>🌐 CORS (Cross-Origin Resource Sharing)</h1>
      <p className="page-description">
        CORS — механизм безопасности браузера, контролирующий запросы между доменами.
        Без правильной настройки ваш API будет недоступен из браузера.
      </p>

      <div className="tabs">
        <button className={`tab ${activeDemo === 'theory' ? 'active' : ''}`} onClick={() => setActiveDemo('theory')}>
          📖 Теория
        </button>
        <button className={`tab ${activeDemo === 'test' ? 'active' : ''}`} onClick={() => setActiveDemo('test')}>
          🧪 Тест
        </button>
        <button className={`tab ${activeDemo === 'config' ? 'active' : ''}`} onClick={() => setActiveDemo('config')}>
          ⚙️ Настройка
        </button>
      </div>

      {activeDemo === 'theory' && (
        <>
          {/* What is same-origin */}
          <div className="card">
            <h2>🏠 Same-Origin Policy</h2>
            <p>Браузер считает два URL "same-origin" если совпадают:</p>
            
            <div className="origin-parts">
              <div className="origin-part">
                <span className="part-value">https://</span>
                <span className="part-label">Протокол</span>
              </div>
              <div className="origin-part">
                <span className="part-value">example.com</span>
                <span className="part-label">Домен</span>
              </div>
              <div className="origin-part">
                <span className="part-value">:443</span>
                <span className="part-label">Порт</span>
              </div>
            </div>

            <div className="origin-examples">
              <div className="example-row same">
                <code>https://example.com/page1</code>
                <span>=</span>
                <code>https://example.com/page2</code>
                <span className="result">✅ Same</span>
              </div>
              <div className="example-row different">
                <code>https://example.com</code>
                <span>≠</span>
                <code>https://api.example.com</code>
                <span className="result">❌ Different (subdomain)</span>
              </div>
              <div className="example-row different">
                <code>http://example.com</code>
                <span>≠</span>
                <code>https://example.com</code>
                <span className="result">❌ Different (protocol)</span>
              </div>
              <div className="example-row different">
                <code>https://example.com</code>
                <span>≠</span>
                <code>https://example.com:8080</code>
                <span className="result">❌ Different (port)</span>
              </div>
            </div>
          </div>

          {/* Preflight */}
          <div className="card">
            <h2>✈️ Preflight Requests</h2>
            <p>Для "небезопасных" запросов браузер сначала отправляет OPTIONS:</p>
            
            <div className="preflight-flow">
              <div className="flow-column">
                <h4>Simple Request (без preflight)</h4>
                <ul>
                  <li>GET, HEAD, POST</li>
                  <li>Только "безопасные" заголовки</li>
                  <li>Content-Type: text/plain, multipart/form-data, application/x-www-form-urlencoded</li>
                </ul>
              </div>
              
              <div className="flow-column">
                <h4>Preflighted Request</h4>
                <ul>
                  <li>PUT, DELETE, PATCH</li>
                  <li>Кастомные заголовки (Authorization)</li>
                  <li>Content-Type: application/json</li>
                </ul>
              </div>
            </div>

            <div className="preflight-diagram">
              <div className="diagram-step">
                <span className="step-num">1</span>
                <div className="step-content">
                  <code className="method">OPTIONS /api/users</code>
                  <code>Origin: https://frontend.com</code>
                  <code>Access-Control-Request-Method: PUT</code>
                  <code>Access-Control-Request-Headers: Authorization</code>
                </div>
              </div>
              
              <div className="diagram-arrow">↓</div>
              
              <div className="diagram-step">
                <span className="step-num">2</span>
                <div className="step-content">
                  <code className="status">204 No Content</code>
                  <code>Access-Control-Allow-Origin: https://frontend.com</code>
                  <code>Access-Control-Allow-Methods: GET, PUT, DELETE</code>
                  <code>Access-Control-Allow-Headers: Authorization</code>
                  <code>Access-Control-Max-Age: 86400</code>
                </div>
              </div>
              
              <div className="diagram-arrow">↓</div>
              
              <div className="diagram-step">
                <span className="step-num">3</span>
                <div className="step-content">
                  <code className="method">PUT /api/users</code>
                  <code>Authorization: Bearer ...</code>
                  <p>Теперь браузер отправляет реальный запрос</p>
                </div>
              </div>
            </div>
          </div>

          {/* CORS Headers */}
          <div className="card">
            <h2>📋 CORS Headers Reference</h2>
            
            <div className="headers-table">
              <div className="header-row header-title">
                <span>Response Header</span>
                <span>Описание</span>
              </div>
              
              <div className="header-row">
                <code>Access-Control-Allow-Origin</code>
                <span>Разрешённый origin (* или конкретный)</span>
              </div>
              
              <div className="header-row">
                <code>Access-Control-Allow-Methods</code>
                <span>Разрешённые HTTP методы</span>
              </div>
              
              <div className="header-row">
                <code>Access-Control-Allow-Headers</code>
                <span>Разрешённые request headers</span>
              </div>
              
              <div className="header-row">
                <code>Access-Control-Allow-Credentials</code>
                <span>Разрешить cookies/auth (true/false)</span>
              </div>
              
              <div className="header-row">
                <code>Access-Control-Expose-Headers</code>
                <span>Какие response headers видны JS</span>
              </div>
              
              <div className="header-row">
                <code>Access-Control-Max-Age</code>
                <span>Кеш preflight в секундах</span>
              </div>
            </div>
            
            <div className="warning-box">
              <strong>⚠️ Важно!</strong>
              <p><code>Access-Control-Allow-Origin: *</code> нельзя использовать вместе с <code>credentials: true</code></p>
            </div>
          </div>
        </>
      )}

      {activeDemo === 'test' && (
        <>
          <div className="card">
            <h2>🧪 Проверить CORS</h2>
            
            <div className="test-form">
              <div className="form-group">
                <label>URL для тестирования:</label>
                <input
                  type="text"
                  value={testUrl}
                  onChange={e => setTestUrl(e.target.value)}
                  className="input"
                  placeholder="https://api.example.com/endpoint"
                />
              </div>
              
              <div className="quick-urls">
                <span>Быстрый выбор:</span>
                <button onClick={() => setTestUrl('https://httpbin.org/get')}>httpbin (CORS ✅)</button>
                <button onClick={() => setTestUrl('https://google.com')}>google.com (CORS ❌)</button>
                <button onClick={() => setTestUrl('/api/users')}>Локальный API</button>
              </div>
              
              <button onClick={testCors} className="btn btn-primary" disabled={loading}>
                {loading ? '⏳ Проверка...' : '🚀 Проверить CORS'}
              </button>
            </div>
            
            {testResult && (
              <div className={`test-result ${testResult.success ? 'success' : 'error'}`}>
                {testResult.success ? (
                  <>
                    <h4>✅ Запрос успешен!</h4>
                    <p>CORS настроен корректно. Заголовки ответа:</p>
                    <div className="result-headers">
                      {Object.entries(testResult.headers || {}).map(([k, v]) => (
                        <div key={k} className="header-item">
                          <code>{k}:</code> <span>{v}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h4>❌ CORS Error</h4>
                    <p>{testResult.error}</p>
                    <p className="hint">Откройте DevTools → Console для деталей</p>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="card">
            <h2>🔍 Как диагностировать CORS ошибки</h2>
            
            <div className="debug-steps">
              <div className="debug-step">
                <h4>1. Откройте DevTools → Network</h4>
                <p>Найдите неудавшийся запрос (красный)</p>
              </div>
              
              <div className="debug-step">
                <h4>2. Проверьте наличие OPTIONS запроса</h4>
                <p>Для preflight запросов сначала идёт OPTIONS</p>
              </div>
              
              <div className="debug-step">
                <h4>3. Посмотрите Response Headers</h4>
                <p>Есть ли <code>Access-Control-Allow-Origin</code>?</p>
              </div>
              
              <div className="debug-step">
                <h4>4. Проверьте Console</h4>
                <p>Браузер пишет конкретную причину блокировки</p>
              </div>
            </div>
            
            <div className="common-errors">
              <h4>Частые ошибки:</h4>
              <ul>
                <li><code>No 'Access-Control-Allow-Origin'</code> — сервер не отправляет CORS headers</li>
                <li><code>Origin not allowed</code> — ваш домен не в списке разрешённых</li>
                <li><code>Credentials mode 'include'</code> — нельзя использовать * с credentials</li>
                <li><code>Method not allowed</code> — метод не в Access-Control-Allow-Methods</li>
              </ul>
            </div>
          </div>
        </>
      )}

      {activeDemo === 'config' && (
        <>
          <div className="card">
            <h2>⚙️ Настройка CORS на сервере</h2>
            
            <div className="config-examples">
              <div className="config-block">
                <h4>Express.js (cors middleware)</h4>
                <div className="code-block">
                  <pre>{`import cors from 'cors';

// Разрешить всё (только для dev!)
app.use(cors());

// Продакшен настройка
app.use(cors({
  origin: ['https://myapp.com', 'https://admin.myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // кеш preflight на 24 часа
}));

// Динамический origin
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://myapp.com'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));`}</pre>
                </div>
              </div>
              
              <div className="config-block">
                <h4>NestJS</h4>
                <div className="code-block">
                  <pre>{`// main.ts
app.enableCors({
  origin: ['https://myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});`}</pre>
                </div>
              </div>
              
              <div className="config-block">
                <h4>Nginx</h4>
                <div className="code-block">
                  <pre>{`location /api/ {
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' 'https://myapp.com';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type';
        add_header 'Access-Control-Max-Age' 86400;
        return 204;
    }
    
    add_header 'Access-Control-Allow-Origin' 'https://myapp.com';
    add_header 'Access-Control-Allow-Credentials' 'true';
    
    proxy_pass http://backend;
}`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>🎯 Рекомендации</h2>
            
            <div className="recommendations">
              <div className="rec do">
                <h4>✅ DO</h4>
                <ul>
                  <li>Указывайте конкретные origins в production</li>
                  <li>Используйте credentials: true только если нужны cookies</li>
                  <li>Кешируйте preflight (Access-Control-Max-Age)</li>
                  <li>Минимизируйте список разрешённых методов и headers</li>
                </ul>
              </div>
              
              <div className="rec dont">
                <h4>❌ DON'T</h4>
                <ul>
                  <li>Не используйте <code>origin: '*'</code> в production</li>
                  <li>Не отражайте Origin header без проверки</li>
                  <li>Не добавляйте CORS headers вручную если есть middleware</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>🔄 Альтернативы CORS</h2>
            
            <div className="alternatives">
              <div className="alt">
                <h4>Proxy сервер</h4>
                <p>Запросы идут через ваш бэкенд, который делает запрос к API</p>
                <code>Frontend → Your Server → External API</code>
              </div>
              
              <div className="alt">
                <h4>JSONP (устарело)</h4>
                <p>Использует {`<script>`} теги для обхода CORS. Только GET, небезопасно.</p>
              </div>
              
              <div className="alt">
                <h4>Dev Proxy (Vite/Webpack)</h4>
                <p>Proxy на dev сервере — CORS не применяется</p>
                <div className="code-block small">
                  <pre>{`// vite.config.ts
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        .tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }
        .tab {
          padding: 10px 20px;
          border: none;
          background: var(--bg-secondary);
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }
        .tab.active {
          background: var(--accent);
          color: white;
        }
        .origin-parts {
          display: flex;
          gap: 4px;
          margin: 20px 0;
          justify-content: center;
        }
        .origin-part {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 12px 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .part-value {
          font-family: monospace;
          font-size: 1.2em;
          color: var(--accent);
        }
        .part-label {
          font-size: 0.8em;
          color: var(--text-secondary);
          margin-top: 4px;
        }
        .origin-examples {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .example-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: 8px;
          flex-wrap: wrap;
        }
        .example-row.same {
          border-left: 3px solid var(--success);
        }
        .example-row.different {
          border-left: 3px solid var(--error);
        }
        .example-row code {
          font-size: 0.85em;
        }
        .example-row .result {
          margin-left: auto;
          font-size: 0.85em;
          color: var(--text-secondary);
        }
        .preflight-flow {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }
        .flow-column {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .flow-column h4 {
          margin-top: 0;
        }
        .flow-column ul {
          margin: 0;
          padding-left: 20px;
        }
        .preflight-diagram {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
        }
        .diagram-step {
          display: flex;
          gap: 16px;
          width: 100%;
          max-width: 500px;
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .step-num {
          width: 28px;
          height: 28px;
          background: var(--accent);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }
        .step-content {
          flex: 1;
        }
        .step-content code {
          display: block;
          margin: 4px 0;
          font-size: 0.85em;
        }
        .step-content code.method {
          color: var(--accent);
          font-weight: bold;
        }
        .step-content code.status {
          color: var(--success);
          font-weight: bold;
        }
        .diagram-arrow {
          font-size: 1.5em;
          color: var(--text-secondary);
        }
        .headers-table {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .header-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .header-row.header-title {
          font-weight: bold;
          background: var(--bg-code);
        }
        .warning-box {
          margin-top: 20px;
          padding: 16px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 8px;
        }
        .warning-box p {
          margin: 8px 0 0;
        }
        .test-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .quick-urls {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }
        .quick-urls button {
          padding: 6px 12px;
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.85em;
        }
        .quick-urls button:hover {
          background: var(--bg-hover);
        }
        .test-result {
          margin-top: 20px;
          padding: 20px;
          border-radius: 12px;
        }
        .test-result.success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .test-result.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .test-result h4 {
          margin: 0 0 8px;
        }
        .result-headers {
          margin-top: 12px;
          padding: 12px;
          background: var(--bg-code);
          border-radius: 8px;
          max-height: 200px;
          overflow: auto;
        }
        .header-item {
          margin: 4px 0;
          font-size: 0.85em;
        }
        .hint {
          color: var(--text-secondary);
          font-size: 0.9em;
          font-style: italic;
        }
        .debug-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }
        .debug-step {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .debug-step h4 {
          margin: 0 0 8px;
          color: var(--accent);
        }
        .debug-step p {
          margin: 0;
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .common-errors {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .common-errors ul {
          margin: 8px 0 0;
          padding-left: 20px;
        }
        .common-errors li {
          margin-bottom: 8px;
        }
        .config-examples {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .config-block h4 {
          margin: 0 0 8px;
          color: var(--accent);
        }
        .recommendations {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .rec {
          padding: 20px;
          border-radius: 12px;
        }
        .rec.do {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .rec.dont {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .rec h4 {
          margin: 0 0 12px;
        }
        .rec ul {
          margin: 0;
          padding-left: 20px;
        }
        .alternatives {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .alt {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .alt h4 {
          margin: 0 0 8px;
        }
        .alt p {
          margin: 0 0 8px;
          color: var(--text-secondary);
        }
        .code-block.small pre {
          font-size: 0.8em;
          padding: 12px;
        }
      `}</style>
    </div>
  )
}
