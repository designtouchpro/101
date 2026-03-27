import { useState, useEffect } from 'react'

interface CacheExample {
  directive: string
  meaning: string
  example: string
  useCase: string
}

const cacheDirectives: CacheExample[] = [
  { 
    directive: 'max-age=<seconds>', 
    meaning: 'Кеш валиден N секунд', 
    example: 'max-age=3600',
    useCase: 'Статические ресурсы (1 час)'
  },
  { 
    directive: 'no-cache', 
    meaning: 'Кешировать, но ВСЕГДА проверять на сервере', 
    example: 'no-cache',
    useCase: 'Контент, который может измениться'
  },
  { 
    directive: 'no-store', 
    meaning: 'НИКОГДА не кешировать', 
    example: 'no-store',
    useCase: 'Чувствительные данные (банкинг)'
  },
  { 
    directive: 'public', 
    meaning: 'Можно кешировать везде (CDN, proxy)', 
    example: 'public, max-age=86400',
    useCase: 'Публичные ресурсы'
  },
  { 
    directive: 'private', 
    meaning: 'Только в браузере пользователя', 
    example: 'private, max-age=600',
    useCase: 'Персональные данные'
  },
  { 
    directive: 'must-revalidate', 
    meaning: 'После истечения — обязательно проверить', 
    example: 'max-age=3600, must-revalidate',
    useCase: 'Важные ресурсы'
  },
  { 
    directive: 'stale-while-revalidate', 
    meaning: 'Отдать старое, пока обновляем в фоне', 
    example: 'max-age=60, stale-while-revalidate=30',
    useCase: 'Быстрый UX для списков'
  },
  { 
    directive: 'immutable', 
    meaning: 'Ресурс НИКОГДА не изменится', 
    example: 'max-age=31536000, immutable',
    useCase: 'Файлы с хешем в имени'
  },
]

export default function CachingDemo() {
  const [cacheTest, setCacheTest] = useState<{
    url: string
    cacheControl: string
    etag: string
  }>({
    url: '/api/cache-test',
    cacheControl: 'max-age=10',
    etag: ''
  })
  const [requests, setRequests] = useState<Array<{
    id: number
    time: string
    status: number
    cached: boolean
    headers: Record<string, string>
  }>>([])
  const [requestId, setRequestId] = useState(0)

  const makeRequest = async () => {
    const start = Date.now()
    const id = requestId + 1
    setRequestId(id)

    try {
      const headers: Record<string, string> = {}
      if (cacheTest.etag) {
        headers['If-None-Match'] = cacheTest.etag
      }

      const res = await fetch(`/api/cache-demo?control=${encodeURIComponent(cacheTest.cacheControl)}`, {
        headers
      })
      
      const data = await res.json()
      const responseHeaders: Record<string, string> = {}
      res.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })

      if (responseHeaders['etag']) {
        setCacheTest(prev => ({ ...prev, etag: responseHeaders['etag'] }))
      }

      setRequests(prev => [{
        id,
        time: new Date().toLocaleTimeString(),
        status: res.status,
        cached: res.status === 304,
        headers: responseHeaders
      }, ...prev.slice(0, 9)])
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="page-container">
      <h1>💾 HTTP Caching</h1>
      <p className="page-description">
        Кеширование — ключ к производительности. Правильные заголовки могут 
        сократить трафик на 90% и ускорить загрузку в разы.
      </p>

      {/* Cache-Control Reference */}
      <div className="card">
        <h2>📚 Cache-Control директивы</h2>
        
        <div className="table-container">
          <table className="info-table">
            <thead>
              <tr>
                <th>Директива</th>
                <th>Значение</th>
                <th>Пример</th>
                <th>Когда использовать</th>
              </tr>
            </thead>
            <tbody>
              {cacheDirectives.map(d => (
                <tr key={d.directive}>
                  <td><code>{d.directive}</code></td>
                  <td>{d.meaning}</td>
                  <td><code className="example">{d.example}</code></td>
                  <td className="use-case">{d.useCase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How caching works */}
      <div className="card">
        <h2>🔄 Как работает кеширование</h2>
        
        <div className="cache-flow">
          <div className="flow-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Первый запрос</h4>
              <div className="flow-arrow">→</div>
              <code>GET /api/data</code>
              <div className="flow-arrow">←</div>
              <code>200 OK</code>
              <code className="header-ex">Cache-Control: max-age=3600</code>
              <code className="header-ex">ETag: "abc123"</code>
            </div>
          </div>
          
          <div className="flow-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Повторный запрос (в течение 1 часа)</h4>
              <p className="cache-hit">✅ Браузер берёт из кеша — запрос на сервер НЕ идёт!</p>
            </div>
          </div>
          
          <div className="flow-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>После истечения (или no-cache)</h4>
              <div className="flow-arrow">→</div>
              <code>GET /api/data</code>
              <code className="header-ex">If-None-Match: "abc123"</code>
              <div className="flow-arrow">←</div>
              <code>304 Not Modified</code>
              <p className="cache-hit">✅ Данные не изменились — используем кеш</p>
            </div>
          </div>
          
          <div className="flow-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Если данные изменились</h4>
              <div className="flow-arrow">→</div>
              <code>GET /api/data</code>
              <code className="header-ex">If-None-Match: "abc123"</code>
              <div className="flow-arrow">←</div>
              <code>200 OK</code>
              <code className="header-ex">ETag: "xyz789"</code>
              <p>📥 Получаем новые данные</p>
            </div>
          </div>
        </div>
      </div>

      {/* ETag vs Last-Modified */}
      <div className="card">
        <h2>🏷️ ETag vs Last-Modified</h2>
        
        <div className="comparison-grid">
          <div className="comparison-col">
            <h3>ETag (Entity Tag)</h3>
            <p>Уникальный идентификатор версии ресурса</p>
            <div className="code-block small">
              <pre>{`// Response
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"

// Conditional request  
If-None-Match: "33a64df..."

// Response если не изменилось
304 Not Modified`}</pre>
            </div>
            <ul>
              <li>✅ Точнее — основан на контенте</li>
              <li>✅ Работает с динамическими данными</li>
              <li>⚠️ Нужно генерировать хеш</li>
            </ul>
          </div>
          
          <div className="comparison-col">
            <h3>Last-Modified</h3>
            <p>Дата последнего изменения</p>
            <div className="code-block small">
              <pre>{`// Response
Last-Modified: Wed, 21 Oct 2024 07:28:00 GMT

// Conditional request
If-Modified-Since: Wed, 21 Oct 2024...

// Response если не изменилось
304 Not Modified`}</pre>
            </div>
            <ul>
              <li>✅ Простая реализация</li>
              <li>✅ Работает со статическими файлами</li>
              <li>⚠️ Точность только до секунды</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Caching strategies */}
      <div className="card">
        <h2>🎯 Стратегии кеширования</h2>
        
        <div className="strategies">
          <div className="strategy">
            <h4>📦 Статические ассеты (JS, CSS, images)</h4>
            <code>Cache-Control: public, max-age=31536000, immutable</code>
            <p>Кешировать на год. Версионирование через хеш в имени файла:</p>
            <code className="filename">app.a1b2c3d4.js</code>
          </div>
          
          <div className="strategy">
            <h4>📄 HTML страницы</h4>
            <code>Cache-Control: no-cache</code>
            <p>Всегда проверять актуальность. HTML содержит ссылки на ассеты.</p>
          </div>
          
          <div className="strategy">
            <h4>🔌 API данные (часто меняются)</h4>
            <code>Cache-Control: private, max-age=0, must-revalidate</code>
            <p>+ ETag для условных запросов</p>
          </div>
          
          <div className="strategy">
            <h4>📊 API данные (редко меняются)</h4>
            <code>Cache-Control: public, max-age=60, stale-while-revalidate=30</code>
            <p>Кеш на минуту, + 30 сек отдавать старое пока обновляем</p>
          </div>
          
          <div className="strategy">
            <h4>🔐 Персональные данные</h4>
            <code>Cache-Control: private, no-store</code>
            <p>Никогда не сохранять! Для банкинга, медицины и т.д.</p>
          </div>
        </div>
      </div>

      {/* Interactive demo */}
      <div className="card">
        <h2>🧪 Интерактивный тест</h2>
        <p>Попробуйте разные директивы и смотрите на статус ответа:</p>
        
        <div className="demo-controls">
          <div className="form-group">
            <label>Cache-Control:</label>
            <select 
              value={cacheTest.cacheControl}
              onChange={e => setCacheTest(prev => ({ ...prev, cacheControl: e.target.value, etag: '' }))}
              className="input"
            >
              <option value="max-age=10">max-age=10 (кеш 10 сек)</option>
              <option value="no-cache">no-cache (всегда проверять)</option>
              <option value="no-store">no-store (не кешировать)</option>
              <option value="max-age=60, stale-while-revalidate=30">stale-while-revalidate</option>
            </select>
          </div>
          
          {cacheTest.etag && (
            <div className="etag-info">
              <strong>Сохранённый ETag:</strong> <code>{cacheTest.etag}</code>
            </div>
          )}
          
          <button onClick={makeRequest} className="btn btn-primary">
            🚀 Сделать запрос
          </button>
        </div>
        
        <div className="requests-log">
          <h4>История запросов:</h4>
          {requests.length === 0 ? (
            <p className="empty">Нажмите кнопку для отправки запроса</p>
          ) : (
            <div className="requests-list">
              {requests.map(r => (
                <div key={r.id} className={`request-item ${r.cached ? 'cached' : ''}`}>
                  <span className="req-time">{r.time}</span>
                  <span className={`req-status status-${r.status}`}>
                    {r.status} {r.cached ? '(from cache)' : ''}
                  </span>
                  {r.headers['cache-control'] && (
                    <code className="req-header">Cache-Control: {r.headers['cache-control']}</code>
                  )}
                  {r.headers['etag'] && (
                    <code className="req-header">ETag: {r.headers['etag']}</code>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Browser cache */}
      <div className="card">
        <h2>🌐 Кеш в браузере</h2>
        
        <div className="info-box">
          <strong>DevTools → Network</strong>
          <p>Колонка "Size" показывает:</p>
          <ul>
            <li><code>(disk cache)</code> — взято из дискового кеша</li>
            <li><code>(memory cache)</code> — из оперативной памяти</li>
            <li><code>304</code> — сервер подтвердил, что кеш актуален</li>
            <li>Размер в байтах — данные скачаны с сервера</li>
          </ul>
        </div>
        
        <div className="info-box info-box-warning">
          <strong>⚠️ Disable cache</strong>
          <p>В DevTools есть чекбокс "Disable cache" — он работает только когда DevTools открыт!</p>
        </div>
      </div>

      <style>{`
        .cache-flow {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .flow-step {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .step-number {
          width: 32px;
          height: 32px;
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
        .step-content h4 {
          margin: 0 0 8px;
        }
        .step-content code {
          display: inline-block;
          margin: 2px 4px;
        }
        .header-ex {
          background: rgba(139, 92, 246, 0.2);
          color: #8b5cf6;
        }
        .flow-arrow {
          display: inline-block;
          margin: 0 8px;
          color: var(--text-secondary);
        }
        .cache-hit {
          color: var(--success);
          font-weight: 500;
          margin: 8px 0 0;
        }
        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .comparison-col {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .comparison-col h3 {
          margin-top: 0;
        }
        .code-block.small pre {
          font-size: 0.8em;
          padding: 12px;
        }
        .strategies {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .strategy {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
          border-left: 4px solid var(--accent);
        }
        .strategy h4 {
          margin: 0 0 8px;
        }
        .strategy code {
          display: block;
          margin: 8px 0;
          padding: 8px;
          background: var(--bg-code);
          border-radius: 4px;
        }
        .strategy p {
          margin: 8px 0 0;
          color: var(--text-secondary);
          font-size: 0.9em;
        }
        .filename {
          background: rgba(16, 185, 129, 0.2) !important;
          color: #10b981 !important;
        }
        .demo-controls {
          display: flex;
          gap: 16px;
          align-items: flex-end;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .etag-info {
          padding: 8px 12px;
          background: var(--bg-secondary);
          border-radius: 4px;
          font-size: 0.85em;
        }
        .requests-log {
          background: var(--bg-secondary);
          border-radius: 8px;
          padding: 16px;
        }
        .requests-log h4 {
          margin: 0 0 12px;
        }
        .empty {
          color: var(--text-secondary);
          font-style: italic;
        }
        .requests-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .request-item {
          display: flex;
          gap: 12px;
          align-items: center;
          padding: 8px 12px;
          background: var(--bg-code);
          border-radius: 4px;
          flex-wrap: wrap;
        }
        .request-item.cached {
          border-left: 3px solid var(--success);
        }
        .req-time {
          color: var(--text-secondary);
          font-size: 0.85em;
        }
        .req-status {
          font-weight: 600;
        }
        .status-200 { color: var(--success); }
        .status-304 { color: #8b5cf6; }
        .req-header {
          font-size: 0.8em;
          color: var(--text-secondary);
        }
        .use-case {
          font-size: 0.85em;
          color: var(--text-secondary);
        }
        .example {
          font-size: 0.85em;
        }
      `}</style>
    </div>
  )
}
