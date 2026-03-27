import { useState } from 'react'

interface HeaderExample {
  name: string
  value: string
  description: string
  category: 'request' | 'response' | 'both'
}

const commonHeaders: HeaderExample[] = [
  // Request headers
  { name: 'Accept', value: 'application/json', description: 'Какой формат ответа ожидает клиент', category: 'request' },
  { name: 'Accept-Language', value: 'ru-RU, en;q=0.9', description: 'Предпочитаемые языки (q = приоритет)', category: 'request' },
  { name: 'Accept-Encoding', value: 'gzip, deflate, br', description: 'Поддерживаемые алгоритмы сжатия', category: 'request' },
  { name: 'Content-Type', value: 'application/json', description: 'MIME-тип тела запроса', category: 'both' },
  { name: 'Content-Length', value: '348', description: 'Размер тела в байтах', category: 'both' },
  { name: 'Authorization', value: 'Bearer eyJhbGci...', description: 'Токен авторизации', category: 'request' },
  { name: 'Cookie', value: 'session=abc123', description: 'Куки, отправляемые серверу', category: 'request' },
  { name: 'User-Agent', value: 'Mozilla/5.0 ...', description: 'Информация о браузере/клиенте', category: 'request' },
  { name: 'Origin', value: 'https://example.com', description: 'Откуда пришёл запрос (для CORS)', category: 'request' },
  { name: 'Referer', value: 'https://example.com/page', description: 'URL страницы, с которой сделан запрос', category: 'request' },
  { name: 'If-None-Match', value: '"abc123"', description: 'ETag для условного запроса', category: 'request' },
  { name: 'If-Modified-Since', value: 'Wed, 21 Oct 2024 07:28:00 GMT', description: 'Дата для условного запроса', category: 'request' },
  
  // Response headers
  { name: 'Cache-Control', value: 'max-age=3600, public', description: 'Инструкции кеширования', category: 'response' },
  { name: 'ETag', value: '"abc123"', description: 'Версия ресурса для кеширования', category: 'response' },
  { name: 'Last-Modified', value: 'Wed, 21 Oct 2024 07:28:00 GMT', description: 'Дата последнего изменения', category: 'response' },
  { name: 'Set-Cookie', value: 'session=xyz; HttpOnly; Secure', description: 'Установка куки', category: 'response' },
  { name: 'Location', value: '/new-url', description: 'URL для редиректа (3xx)', category: 'response' },
  { name: 'Content-Encoding', value: 'gzip', description: 'Алгоритм сжатия ответа', category: 'response' },
  { name: 'Access-Control-Allow-Origin', value: '*', description: 'CORS: разрешённые origins', category: 'response' },
  { name: 'X-RateLimit-Remaining', value: '99', description: 'Осталось запросов (rate limiting)', category: 'response' },
  { name: 'Retry-After', value: '120', description: 'Когда повторить (секунды или дата)', category: 'response' },
]

const contentTypes = [
  { type: 'application/json', use: 'REST API, современные веб-сервисы', example: '{"name": "John"}' },
  { type: 'application/x-www-form-urlencoded', use: 'HTML формы (по умолчанию)', example: 'name=John&age=30' },
  { type: 'multipart/form-data', use: 'Загрузка файлов', example: '------boundary\\nContent-Disposition: form-data; name="file"...' },
  { type: 'text/plain', use: 'Простой текст', example: 'Hello, World!' },
  { type: 'text/html', use: 'HTML страницы', example: '<html>...</html>' },
  { type: 'application/xml', use: 'SOAP, legacy API', example: '<user><name>John</name></user>' },
  { type: 'application/octet-stream', use: 'Бинарные данные', example: '[binary data]' },
]

export default function HeadersDemo() {
  const [filter, setFilter] = useState<'all' | 'request' | 'response'>('all')
  const [testUrl, setTestUrl] = useState('https://httpbin.org/headers')
  const [customHeaders, setCustomHeaders] = useState<Record<string, string>>({
    'X-Custom-Header': 'my-value',
    'Accept': 'application/json'
  })
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const filteredHeaders = commonHeaders.filter(h => 
    filter === 'all' || h.category === filter || h.category === 'both'
  )

  const addHeader = () => {
    const name = prompt('Header name:')
    if (name) {
      const value = prompt('Header value:') || ''
      setCustomHeaders(prev => ({ ...prev, [name]: value }))
    }
  }

  const removeHeader = (name: string) => {
    setCustomHeaders(prev => {
      const copy = { ...prev }
      delete copy[name]
      return copy
    })
  }

  const sendRequest = async () => {
    setLoading(true)
    try {
      const res = await fetch(testUrl, {
        headers: customHeaders
      })
      const data = await res.json()
      setResponse({
        status: res.status,
        headers: Object.fromEntries(res.headers.entries()),
        body: data
      })
    } catch (err: any) {
      setResponse({ error: err.message })
    }
    setLoading(false)
  }

  return (
    <div className="page-container">
      <h1>📋 HTTP Headers</h1>
      <p className="page-description">
        Заголовки — метаданные HTTP запроса/ответа. Они управляют кешированием, 
        аутентификацией, типом контента и многим другим.
      </p>

      {/* Header reference */}
      <div className="card">
        <h2>📚 Справочник заголовков</h2>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {(['all', 'request', 'response'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
            >
              {f === 'all' ? '📋 Все' : f === 'request' ? '📤 Request' : '📥 Response'}
            </button>
          ))}
        </div>

        <div className="table-container">
          <table className="info-table">
            <thead>
              <tr>
                <th>Заголовок</th>
                <th>Пример</th>
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              {filteredHeaders.map(h => (
                <tr key={h.name}>
                  <td>
                    <code className="header-name">{h.name}</code>
                    <span className={`badge badge-${h.category === 'request' ? 'blue' : h.category === 'response' ? 'green' : 'purple'}`}>
                      {h.category}
                    </span>
                  </td>
                  <td><code className="header-value">{h.value}</code></td>
                  <td>{h.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content-Type */}
      <div className="card">
        <h2>📦 Content-Type</h2>
        <p>Самый важный заголовок — определяет формат данных:</p>
        
        <div className="table-container">
          <table className="info-table">
            <thead>
              <tr>
                <th>Content-Type</th>
                <th>Когда использовать</th>
                <th>Пример данных</th>
              </tr>
            </thead>
            <tbody>
              {contentTypes.map(ct => (
                <tr key={ct.type}>
                  <td><code>{ct.type}</code></td>
                  <td>{ct.use}</td>
                  <td><code className="example-small">{ct.example}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="code-block">
          <div className="code-header">JavaScript: отправка разных типов</div>
          <pre>{`// JSON (самый частый)
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John' })
})

// Form data (файлы)
const formData = new FormData()
formData.append('file', fileInput.files[0])
fetch('/api/upload', {
  method: 'POST',
  // НЕ указываем Content-Type — браузер сам добавит с boundary!
  body: formData
})

// URL-encoded (как HTML form)
fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ username: 'john', password: 'secret' })
})`}</pre>
        </div>
      </div>

      {/* Interactive tester */}
      <div className="card">
        <h2>🧪 Тест заголовков</h2>
        <p>Отправьте запрос с кастомными заголовками на httpbin.org:</p>

        <div className="form-group">
          <label>URL:</label>
          <input 
            type="text" 
            value={testUrl} 
            onChange={e => setTestUrl(e.target.value)}
            className="input"
          />
        </div>

        <div className="headers-editor">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <strong>Заголовки:</strong>
            <button onClick={addHeader} className="btn btn-small">+ Добавить</button>
          </div>
          
          {Object.entries(customHeaders).map(([name, value]) => (
            <div key={name} className="header-row">
              <code>{name}:</code>
              <input
                type="text"
                value={value}
                onChange={e => setCustomHeaders(prev => ({ ...prev, [name]: e.target.value }))}
                className="input input-small"
              />
              <button onClick={() => removeHeader(name)} className="btn btn-danger btn-small">×</button>
            </div>
          ))}
        </div>

        <button onClick={sendRequest} disabled={loading} className="btn btn-primary">
          {loading ? '⏳ Отправка...' : '🚀 Отправить'}
        </button>

        {response && (
          <div className="response-block">
            <div className="code-header">
              {response.error ? '❌ Ошибка' : `✅ ${response.status}`}
            </div>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Request vs Response */}
      <div className="card">
        <h2>📤📥 Request vs Response Headers</h2>
        
        <div className="comparison-grid">
          <div className="comparison-col">
            <h3>📤 Request Headers</h3>
            <p>Клиент → Сервер</p>
            <ul>
              <li><strong>Accept</strong> — какой формат хочу получить</li>
              <li><strong>Authorization</strong> — кто я такой</li>
              <li><strong>Content-Type</strong> — что я отправляю</li>
              <li><strong>Cookie</strong> — мои куки</li>
              <li><strong>User-Agent</strong> — мой браузер</li>
              <li><strong>If-None-Match</strong> — есть ли обновления?</li>
            </ul>
          </div>
          
          <div className="comparison-col">
            <h3>📥 Response Headers</h3>
            <p>Сервер → Клиент</p>
            <ul>
              <li><strong>Content-Type</strong> — что я отдаю</li>
              <li><strong>Set-Cookie</strong> — запомни это</li>
              <li><strong>Cache-Control</strong> — как кешировать</li>
              <li><strong>Location</strong> — иди сюда (redirect)</li>
              <li><strong>ETag</strong> — версия ресурса</li>
              <li><strong>Access-Control-*</strong> — CORS правила</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Custom headers */}
      <div className="card">
        <h2>🏷️ Кастомные заголовки</h2>
        
        <div className="info-box info-box-warning">
          <strong>X- префикс устарел!</strong>
          <p>Раньше кастомные заголовки начинались с X- (X-Custom-Header). 
          С 2012 года это не рекомендуется — просто используйте понятное имя.</p>
        </div>

        <div className="code-block">
          <div className="code-header">Примеры кастомных заголовков</div>
          <pre>{`// Трекинг запросов
X-Request-ID: 550e8400-e29b-41d4-a716-446655440000

// Rate limiting info
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640000000

// API версионирование
API-Version: 2024-01-01
Accept-Version: v2

// Пагинация
X-Total-Count: 150
X-Page: 1
X-Per-Page: 20
Link: </api/users?page=2>; rel="next"`}</pre>
        </div>
      </div>

      <style>{`
        .header-name {
          font-weight: 600;
          color: var(--accent);
        }
        .header-value {
          font-size: 0.85em;
          color: var(--text-secondary);
          word-break: break-all;
        }
        .badge {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.7em;
          margin-left: 8px;
          text-transform: uppercase;
        }
        .badge-blue { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
        .badge-green { background: rgba(16, 185, 129, 0.2); color: #10b981; }
        .badge-purple { background: rgba(139, 92, 246, 0.2); color: #8b5cf6; }
        .example-small {
          font-size: 0.8em;
          max-width: 200px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .headers-editor {
          background: var(--bg-secondary);
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 16px;
        }
        .header-row {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 8px;
        }
        .header-row code {
          min-width: 150px;
        }
        .input-small {
          flex: 1;
        }
        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
        .comparison-col ul {
          margin: 0;
          padding-left: 20px;
        }
        .comparison-col li {
          margin-bottom: 8px;
        }
        .response-block {
          margin-top: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
          overflow: hidden;
        }
        .response-block pre {
          padding: 16px;
          margin: 0;
          overflow-x: auto;
          font-size: 0.85em;
        }
      `}</style>
    </div>
  )
}
