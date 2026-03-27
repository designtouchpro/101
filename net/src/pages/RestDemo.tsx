import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import CodeBlock from '../components/CodeBlock'
import NetworkVisualizer from '../components/NetworkVisualizer'
import RequestFlow from '../components/RequestFlow'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface RequestStep {
  label: string
  status: 'pending' | 'active' | 'completed' | 'error'
  detail?: string
}

export default function RestDemo() {
  const { data, error, loading, status, statusText, time, fetchApi } = useApi()
  const [method, setMethod] = useState<HttpMethod>('GET')
  const [endpoint, setEndpoint] = useState('/api/users')
  const [body, setBody] = useState('{\n  "name": "Новый пользователь",\n  "email": "new@example.com",\n  "role": "user"\n}')
  const [steps, setSteps] = useState<RequestStep[]>([])
  const [history, setHistory] = useState<Array<{ method: string; endpoint: string; status: number; time: number }>>([])

  const executeRequest = async () => {
    // Начинаем визуализацию шагов
    setSteps([
      { label: 'Формирование запроса', status: 'active' },
      { label: 'Отправка', status: 'pending' },
      { label: 'Обработка на сервере', status: 'pending' },
      { label: 'Получение ответа', status: 'pending' },
    ])

    await new Promise(r => setTimeout(r, 300))
    setSteps(prev => prev.map((s, i) => 
      i === 0 ? { ...s, status: 'completed' } : 
      i === 1 ? { ...s, status: 'active' } : s
    ))

    await new Promise(r => setTimeout(r, 200))
    setSteps(prev => prev.map((s, i) => 
      i === 1 ? { ...s, status: 'completed' } : 
      i === 2 ? { ...s, status: 'active' } : s
    ))

    const options: RequestInit = { method }
    if (['POST', 'PUT'].includes(method)) {
      options.body = body
    }

    const result = await fetchApi(endpoint, options)

    setSteps(prev => prev.map((s, i) => 
      i === 2 ? { ...s, status: 'completed' } : 
      i === 3 ? { ...s, status: result.error ? 'error' : 'completed', detail: `${result.status} ${result.statusText}` } : s
    ))

    if (result.status) {
      setHistory(prev => [
        { method, endpoint, status: result.status!, time: result.time! },
        ...prev.slice(0, 9)
      ])
    }
  }

  const presetRequests = [
    { method: 'GET' as const, endpoint: '/api/users', label: 'Получить пользователей' },
    { method: 'GET' as const, endpoint: '/api/users/1', label: 'Получить пользователя по ID' },
    { method: 'GET' as const, endpoint: '/api/posts', label: 'Получить посты' },
    { method: 'POST' as const, endpoint: '/api/users', label: 'Создать пользователя' },
    { method: 'PUT' as const, endpoint: '/api/users/1', label: 'Обновить пользователя' },
    { method: 'DELETE' as const, endpoint: '/api/users/3', label: 'Удалить пользователя' },
  ]

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📡 REST API</h1>
        <p>
          REST (Representational State Transfer) — архитектурный стиль для построения веб-сервисов.
          Ресурсы идентифицируются URL, а действия выполняются через HTTP методы.
        </p>
      </div>

      {/* Теория */}
      <section className="card theory-card">
        <h2>📚 Основные концепции</h2>
        
        <div className="concept-grid">
          <div className="concept-item">
            <h4>🔹 HTTP Методы</h4>
            <ul>
              <li><strong>GET</strong> — получение данных</li>
              <li><strong>POST</strong> — создание ресурса</li>
              <li><strong>PUT</strong> — полное обновление</li>
              <li><strong>PATCH</strong> — частичное обновление</li>
              <li><strong>DELETE</strong> — удаление</li>
            </ul>
          </div>
          
          <div className="concept-item">
            <h4>🔹 Статус-коды</h4>
            <ul>
              <li><strong>2xx</strong> — успех (200, 201, 204)</li>
              <li><strong>3xx</strong> — редирект</li>
              <li><strong>4xx</strong> — ошибка клиента (400, 401, 404)</li>
              <li><strong>5xx</strong> — ошибка сервера</li>
            </ul>
          </div>
          
          <div className="concept-item">
            <h4>🔹 Принципы REST</h4>
            <ul>
              <li>Stateless — без состояния</li>
              <li>Uniform Interface — единый интерфейс</li>
              <li>Cacheable — кешируемость</li>
              <li>Client-Server — разделение</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Интерактивный запрос */}
      <section className="card">
        <h2>🧪 Интерактивный запрос</h2>
        
        {/* Пресеты */}
        <div className="preset-buttons">
          {presetRequests.map((preset, i) => (
            <button
              key={i}
              className={`preset-btn preset-btn-${preset.method.toLowerCase()}`}
              onClick={() => {
                setMethod(preset.method)
                setEndpoint(preset.endpoint)
              }}
            >
              <span className={`method-badge method-${preset.method.toLowerCase()}`}>
                {preset.method}
              </span>
              {preset.label}
            </button>
          ))}
        </div>

        {/* Форма запроса */}
        <div className="request-builder">
          <div className="request-line">
            <select 
              value={method} 
              onChange={e => setMethod(e.target.value as HttpMethod)}
              className={`method-select method-select-${method.toLowerCase()}`}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input
              type="text"
              value={endpoint}
              onChange={e => setEndpoint(e.target.value)}
              className="endpoint-input"
              placeholder="/api/..."
            />
            <button 
              onClick={executeRequest} 
              disabled={loading}
              className="send-btn"
            >
              {loading ? '⏳ Отправка...' : '🚀 Отправить'}
            </button>
          </div>

          {['POST', 'PUT'].includes(method) && (
            <div className="request-body">
              <label>Request Body (JSON):</label>
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                rows={6}
                className="body-textarea"
              />
            </div>
          )}
        </div>

        {/* Визуализация потока */}
        {steps.length > 0 && (
          <div className="flow-section">
            <h3>Поток запроса</h3>
            <RequestFlow steps={steps} />
          </div>
        )}

        {/* Network визуализация */}
        <NetworkVisualizer
          requestData={{
            method,
            url: endpoint,
            body: ['POST', 'PUT'].includes(method) ? JSON.parse(body || '{}') : undefined
          }}
          responseData={data ? {
            status,
            statusText,
            body: data,
            time
          } : undefined}
          isLoading={loading}
        />

        {/* Результат */}
        {(data || error) && (
          <div className="response-section">
            <div className="response-header">
              <h3>Ответ сервера</h3>
              {status && (
                <span className={`status-badge status-${Math.floor(status / 100)}xx`}>
                  {status} {statusText}
                </span>
              )}
              {time && <span className="time-badge">⏱️ {time}ms</span>}
            </div>
            <CodeBlock 
              code={JSON.stringify(data || { error }, null, 2)} 
              language="json"
            />
          </div>
        )}
      </section>

      {/* История запросов */}
      {history.length > 0 && (
        <section className="card">
          <h2>📜 История запросов</h2>
          <div className="history-list">
            {history.map((item, i) => (
              <div key={i} className="history-item">
                <span className={`method-badge method-${item.method.toLowerCase()}`}>
                  {item.method}
                </span>
                <span className="history-endpoint">{item.endpoint}</span>
                <span className={`status-badge status-${Math.floor(item.status / 100)}xx`}>
                  {item.status}
                </span>
                <span className="history-time">{item.time}ms</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Примеры кода */}
      <section className="card">
        <h2>💻 Примеры кода</h2>
        
        <div className="code-examples">
          <div className="code-example">
            <h4>Fetch API (JavaScript)</h4>
            <CodeBlock
              language="javascript"
              code={`// GET запрос
const response = await fetch('/api/users');
const users = await response.json();

// POST запрос
const newUser = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Новый пользователь',
    email: 'user@example.com'
  })
});

// PUT запрос
await fetch('/api/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Обновлённое имя' })
});

// DELETE запрос
await fetch('/api/users/1', { method: 'DELETE' });`}
            />
          </div>

          <div className="code-example">
            <h4>Axios</h4>
            <CodeBlock
              language="javascript"
              code={`import axios from 'axios';

// GET
const { data: users } = await axios.get('/api/users');

// POST
const { data: newUser } = await axios.post('/api/users', {
  name: 'Новый пользователь',
  email: 'user@example.com'
});

// PUT
await axios.put('/api/users/1', { name: 'Обновлённое имя' });

// DELETE
await axios.delete('/api/users/1');`}
            />
          </div>
        </div>
      </section>

      {/* Доступные эндпоинты */}
      <section className="card">
        <h2>📋 Доступные эндпоинты</h2>
        <div className="endpoints-table">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Метод</th>
                <th>Endpoint</th>
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="method-badge method-get">GET</span></td>
                <td><code>/api/users</code></td>
                <td>Список всех пользователей</td>
              </tr>
              <tr>
                <td><span className="method-badge method-get">GET</span></td>
                <td><code>/api/users/:id</code></td>
                <td>Пользователь по ID</td>
              </tr>
              <tr>
                <td><span className="method-badge method-post">POST</span></td>
                <td><code>/api/users</code></td>
                <td>Создать пользователя</td>
              </tr>
              <tr>
                <td><span className="method-badge method-put">PUT</span></td>
                <td><code>/api/users/:id</code></td>
                <td>Обновить пользователя</td>
              </tr>
              <tr>
                <td><span className="method-badge method-delete">DELETE</span></td>
                <td><code>/api/users/:id</code></td>
                <td>Удалить пользователя</td>
              </tr>
              <tr>
                <td><span className="method-badge method-get">GET</span></td>
                <td><code>/api/posts</code></td>
                <td>Список всех постов</td>
              </tr>
              <tr>
                <td><span className="method-badge method-get">GET</span></td>
                <td><code>/api/posts/:id</code></td>
                <td>Пост по ID (с автором)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
