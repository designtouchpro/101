import { useState } from 'react'

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const

const methodInfo: Record<string, { desc: string; body: boolean; idempotent: boolean; safe: boolean; example: string }> = {
  GET: { desc: 'Получить ресурс', body: false, idempotent: true, safe: true, example: 'GET /api/users/1' },
  POST: { desc: 'Создать ресурс', body: true, idempotent: false, safe: false, example: 'POST /api/users' },
  PUT: { desc: 'Полное обновление', body: true, idempotent: true, safe: false, example: 'PUT /api/users/1' },
  PATCH: { desc: 'Частичное обновление', body: true, idempotent: false, safe: false, example: 'PATCH /api/users/1' },
  DELETE: { desc: 'Удалить ресурс', body: false, idempotent: true, safe: false, example: 'DELETE /api/users/1' },
}

const apiChecklist = [
  { category: 'Positive tests', checks: [
    'Корректный запрос → 200/201',
    'Все обязательные поля заполнены',
    'Минимальный набор полей',
    'Максимальный набор полей',
    'Фильтрация/пагинация/сортировка',
  ]},
  { category: 'Negative tests', checks: [
    'Пустое тело → 400',
    'Невалидный JSON → 400',
    'Недостающее обязательное поле → 422',
    'Неверный тип данных → 422',
    'Несуществующий ID → 404',
    'Слишком длинная строка',
    'Спецсимволы: <>&"\'; DROP TABLE',
  ]},
  { category: 'Auth & Security', checks: [
    'Без токена → 401',
    'Невалидный токен → 401',
    'Истёкший токен → 401',
    'Чужой ресурс → 403',
    'Rate limiting → 429',
    'CORS headers',
  ]},
  { category: 'Performance', checks: [
    'Response time < 200ms',
    'Большие объёмы данных (1000+ записей)',
    'Параллельные запросы',
    'Размер ответа (gzip)',
  ]},
]

interface RequestBuilder {
  method: typeof methods[number]
  url: string
  body: string
  headers: string
}

export default function APITesting() {
  const [tab, setTab] = useState<'methods' | 'builder' | 'checklist'>('methods')
  const [req, setReq] = useState<RequestBuilder>({
    method: 'GET', url: 'https://jsonplaceholder.typicode.com/users/1',
    body: '{\n  "name": "Test User",\n  "email": "test@example.com"\n}',
    headers: 'Content-Type: application/json\nAuthorization: Bearer <token>',
  })
  const [response, setResponse] = useState<{ status: number; body: string; time: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const sendRequest = async () => {
    setLoading(true)
    const start = performance.now()
    try {
      const opts: RequestInit = { method: req.method }
      if (req.method !== 'GET' && req.method !== 'DELETE') {
        opts.body = req.body
        opts.headers = { 'Content-Type': 'application/json' }
      }
      const res = await fetch(req.url, opts)
      const text = await res.text()
      const time = Math.round(performance.now() - start)
      let formatted = text
      try { formatted = JSON.stringify(JSON.parse(text), null, 2) } catch { /* not json */ }
      setResponse({ status: res.status, body: formatted, time })
    } catch (err) {
      setResponse({ status: 0, body: String(err), time: Math.round(performance.now() - start) })
    }
    setLoading(false)
  }

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔌 Тестирование API</h1>
        <p>REST-методы, чек-лист API-тестирования и простой HTTP-клиент.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>API-тестирование</strong> — проверка программного интерфейса без взаимодействия с UI. 
          Вы отправляете HTTP-запрос и проверяете ответ: статус-код, тело, заголовки, время отклика. 
          API-тесты быстрее и стабильнее UI-тестов, потому что не зависят от рендеринга, CSS и JavaScript. 
          Они занимают среднюю часть пирамиды тестирования.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          REST API строится на HTTP-методах: <strong>GET</strong> (получить), <strong>POST</strong> (создать), <strong>PUT</strong> (заменить), <strong>PATCH</strong> (обновить часть), <strong>DELETE</strong> (удалить). 
          При тестировании проверяйте: позитивные сценарии (правильные данные), негативные (невалидные данные, 
          отсутствующие поля), граничные значения, авторизацию (401/403) и производительность (время ответа под нагрузкой).
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>🔧 Инструменты</strong>: Postman — для ручного исследования API. Swagger/OpenAPI — для документации и автогенерации тестов. 
            Для автоматизации: REST Assured (Java), SuperTest (Node.js), httpx/requests (Python), Playwright API testing.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {([['methods', '📡 REST-методы'], ['builder', '🔧 HTTP-клиент'], ['checklist', '✅ Чек-лист']] as const).map(([k, l]) => (
          <button key={k} className={`btn ${tab === k ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === 'methods' && (
        <div className="card">
          <h3>📡 REST HTTP-методы</h3>
          <table className="data-table">
            <thead>
              <tr><th>Метод</th><th>Действие</th><th>Body</th><th>Idempotent</th><th>Safe</th><th>Пример</th></tr>
            </thead>
            <tbody>
              {methods.map(m => {
                const info = methodInfo[m]!
                return (
                  <tr key={m}>
                    <td><strong style={{
                      color: m === 'GET' ? '#22c55e' : m === 'POST' ? '#3b82f6' : m === 'PUT' ? '#f97316' : m === 'PATCH' ? '#eab308' : '#ef4444',
                    }}>{m}</strong></td>
                    <td style={{ fontSize: '0.8rem' }}>{info.desc}</td>
                    <td>{info.body ? '✅' : '❌'}</td>
                    <td>{info.idempotent ? '✅' : '❌'}</td>
                    <td>{info.safe ? '✅' : '❌'}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{info.example}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div className="info-box" style={{ marginTop: 16 }}>
            <div className="info-box-content">
              <div className="info-box-title">📘 Ключевые понятия</div>
              <div style={{ fontSize: '0.8rem', marginTop: 4 }}>
                <strong>Idempotent:</strong> повторный вызов даёт тот же результат (GET, PUT, DELETE)<br />
                <strong>Safe:</strong> не изменяет данные на сервере (только GET)<br />
                <strong>CRUD:</strong> Create = POST, Read = GET, Update = PUT/PATCH, Delete = DELETE
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'builder' && (
        <div className="card">
          <h3>🔧 HTTP-клиент</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>
            Попробуйте отправить реальный HTTP-запрос прямо из браузера.
          </p>

          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {methods.map(m => (
              <button key={m} className={`btn ${req.method === m ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setReq(prev => ({ ...prev, method: m }))} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                {m}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>URL</label>
            <input className="input" value={req.url} onChange={e => setReq(prev => ({ ...prev, url: e.target.value }))} />
          </div>

          {req.method !== 'GET' && req.method !== 'DELETE' && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Body (JSON)</label>
              <textarea className="input" value={req.body}
                onChange={e => setReq(prev => ({ ...prev, body: e.target.value }))}
                style={{ minHeight: 100, fontFamily: 'monospace', fontSize: '0.8rem' }} />
            </div>
          )}

          <button className="btn btn-primary" onClick={sendRequest} disabled={loading}
            style={{ marginBottom: 16 }}>
            {loading ? '⏳ Отправка...' : '🚀 Отправить'}
          </button>

          {response && (
            <div style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 8, fontSize: '0.85rem' }}>
                <span>Status: <strong style={{
                  color: response.status >= 200 && response.status < 300 ? '#22c55e' :
                    response.status >= 400 ? '#ef4444' : '#eab308',
                }}>{response.status}</strong></span>
                <span>Time: <strong>{response.time}ms</strong></span>
              </div>
              <pre style={{
                padding: 14, borderRadius: 8, background: 'var(--bg-code)',
                overflow: 'auto', maxHeight: 300, fontSize: '0.8rem',
                border: '1px solid var(--border-color)',
              }}>{response.body}</pre>
            </div>
          )}
        </div>
      )}

      {tab === 'checklist' && (
        <div className="card">
          <h3>✅ Чек-лист API-тестирования</h3>
          {apiChecklist.map(cat => (
            <div key={cat.category} style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: '0.9rem', borderBottom: '1px solid var(--border-color)', paddingBottom: 6, marginBottom: 8 }}>
                {cat.category}
              </h4>
              {cat.checks.map(c => {
                const key = `${cat.category}-${c}`
                const isChecked = checkedItems.has(key)
                return (
                  <div key={key} onClick={() => toggleCheck(key)} style={{
                    padding: '6px 10px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: '0.85rem',
                    textDecoration: isChecked ? 'line-through' : 'none',
                    color: isChecked ? 'var(--text-muted)' : 'var(--text-primary)',
                  }}>
                    <span>{isChecked ? '✅' : '⬜'}</span>
                    <span>{c}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
