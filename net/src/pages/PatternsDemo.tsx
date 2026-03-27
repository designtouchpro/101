import { useState, useEffect } from 'react'

interface ApiPattern {
  name: string
  description: string
  code: string
  notes: string[]
}

export default function PatternsDemo() {
  const [activeSection, setActiveSection] = useState<'pagination' | 'filtering' | 'errors' | 'versioning' | 'rate'>('pagination')

  const sections = [
    { id: 'pagination', label: '📄 Пагинация' },
    { id: 'filtering', label: '🔍 Фильтрация' },
    { id: 'errors', label: '⚠️ Ошибки' },
    { id: 'versioning', label: '🏷️ Версионирование' },
    { id: 'rate', label: '⏱️ Rate Limiting' },
  ]

  return (
    <div className="page-container">
      <h1>📐 API Design Patterns</h1>
      <p className="page-description">
        Паттерны проектирования API, которые делают вашу жизнь (и жизнь потребителей) проще.
      </p>

      <div className="tabs">
        {sections.map(s => (
          <button 
            key={s.id} 
            className={`tab ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => setActiveSection(s.id as typeof activeSection)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {activeSection === 'pagination' && (
        <>
          <div className="card">
            <h2>📄 Пагинация</h2>
            <p>Способы разбиения больших списков на страницы</p>

            <div className="patterns-grid">
              <div className="pattern-card">
                <h3>Offset Pagination</h3>
                <code className="endpoint">GET /users?limit=20&offset=40</code>
                <div className="code-block">
                  <pre>{`// Response
{
  "data": [...],
  "pagination": {
    "total": 1000,
    "limit": 20,
    "offset": 40,
    "hasMore": true
  }
}`}</pre>
                </div>
                <div className="pros-cons">
                  <div className="pros">
                    <strong>✅</strong> Просто, можно прыгать на любую страницу
                  </div>
                  <div className="cons">
                    <strong>❌</strong> Проблемы при добавлении/удалении, медленно на больших offset
                  </div>
                </div>
              </div>

              <div className="pattern-card">
                <h3>Cursor Pagination</h3>
                <code className="endpoint">GET /users?limit=20&cursor=eyJpZCI6MTAwfQ</code>
                <div className="code-block">
                  <pre>{`// Response
{
  "data": [...],
  "pagination": {
    "nextCursor": "eyJpZCI6MTIwfQ",
    "prevCursor": "eyJpZCI6MTAwfQ",
    "hasMore": true
  }
}

// Cursor = base64({"id": 100})
// или просто ID последнего элемента`}</pre>
                </div>
                <div className="pros-cons">
                  <div className="pros">
                    <strong>✅</strong> Стабильно при изменениях, быстро
                  </div>
                  <div className="cons">
                    <strong>❌</strong> Нельзя прыгать на страницу, сложнее реализовать
                  </div>
                </div>
              </div>

              <div className="pattern-card">
                <h3>Keyset Pagination</h3>
                <code className="endpoint">GET /users?limit=20&created_after=2024-01-01</code>
                <div className="code-block">
                  <pre>{`// Для сортировки по дате/ID
SELECT * FROM users
WHERE created_at > '2024-01-01'
ORDER BY created_at
LIMIT 20

// Быстрее чем OFFSET на миллионах записей`}</pre>
                </div>
                <div className="pros-cons">
                  <div className="pros">
                    <strong>✅</strong> Самый быстрый способ
                  </div>
                  <div className="cons">
                    <strong>❌</strong> Только последовательный доступ
                  </div>
                </div>
              </div>
            </div>

            <div className="recommendation-box">
              <strong>💡 Рекомендация:</strong>
              <ul>
                <li><strong>Offset</strong> — для админок и небольших датасетов</li>
                <li><strong>Cursor</strong> — для фидов, списков с real-time обновлениями</li>
                <li><strong>Keyset</strong> — для больших датасетов с сортировкой</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <h2>📐 Формат ответа пагинации</h2>
            
            <div className="code-block">
              <pre>{`// Стиль 1: Метаданные в корне
{
  "data": [...],
  "meta": {
    "total": 1000,
    "page": 3,
    "perPage": 20,
    "lastPage": 50
  },
  "links": {
    "first": "/users?page=1",
    "last": "/users?page=50",
    "prev": "/users?page=2",
    "next": "/users?page=4"
  }
}

// Стиль 2: Envelope
{
  "users": [...],
  "pagination": {
    "total": 1000,
    "limit": 20,
    "offset": 40
  }
}

// Стиль 3: Link header (GitHub style)
Link: <https://api.example.com/users?page=3>; rel="next",
      <https://api.example.com/users?page=50>; rel="last"`}</pre>
            </div>
          </div>
        </>
      )}

      {activeSection === 'filtering' && (
        <>
          <div className="card">
            <h2>🔍 Фильтрация и сортировка</h2>

            <div className="filter-patterns">
              <div className="filter-pattern">
                <h4>Simple Query Params</h4>
                <code>GET /users?status=active&role=admin</code>
                <p>Простые equality фильтры</p>
              </div>

              <div className="filter-pattern">
                <h4>Comparison Operators</h4>
                <code>GET /products?price[gte]=100&price[lte]=500</code>
                <p>или <code>?price_min=100&price_max=500</code></p>
              </div>

              <div className="filter-pattern">
                <h4>Array Values</h4>
                <code>GET /users?roles[]=admin&roles[]=moderator</code>
                <p>или <code>?roles=admin,moderator</code></p>
              </div>

              <div className="filter-pattern">
                <h4>Full-text Search</h4>
                <code>GET /products?q=wireless+headphones</code>
                <p>Поиск по нескольким полям</p>
              </div>

              <div className="filter-pattern">
                <h4>Сортировка</h4>
                <code>GET /products?sort=price&order=asc</code>
                <p>или <code>?sort=-price</code> (минус = desc)</p>
                <p>или <code>?sort=price:desc,name:asc</code></p>
              </div>

              <div className="filter-pattern">
                <h4>Field Selection</h4>
                <code>GET /users?fields=id,name,email</code>
                <p>Возвращает только указанные поля (partial response)</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>📊 Примеры реальных API</h2>

            <div className="api-examples">
              <div className="api-example">
                <h4>GitHub</h4>
                <code>GET /repos?sort=updated&direction=desc&per_page=30</code>
              </div>

              <div className="api-example">
                <h4>Stripe</h4>
                <code>GET /charges?created[gte]=1609459200&limit=100</code>
              </div>

              <div className="api-example">
                <h4>Shopify</h4>
                <code>GET /products.json?status=active&vendor=Nike&fields=id,title</code>
              </div>

              <div className="api-example">
                <h4>JSON:API spec</h4>
                <code>GET /articles?filter[author]=john&sort=-created&include=comments</code>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>🔗 Include / Expand</h2>
            <p>Включение связанных данных в ответ (избегаем N+1 запросов)</p>

            <div className="code-block">
              <pre>{`// Без include
GET /posts/123
{ "id": 123, "title": "...", "authorId": 1 }

GET /users/1  // Ещё один запрос для автора
{ "id": 1, "name": "John" }

// С include
GET /posts/123?include=author,comments
{
  "id": 123,
  "title": "...",
  "author": { "id": 1, "name": "John" },
  "comments": [
    { "id": 1, "text": "Great post!" }
  ]
}

// Или expand (Stripe style)
GET /charges/ch_123?expand[]=customer&expand[]=invoice`}</pre>
            </div>
          </div>
        </>
      )}

      {activeSection === 'errors' && (
        <>
          <div className="card">
            <h2>⚠️ Error Handling</h2>
            <p>Как правильно возвращать ошибки в API</p>

            <div className="error-format">
              <h4>RFC 7807 - Problem Details</h4>
              <div className="code-block">
                <pre>{`// Стандартизированный формат ошибок
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json

{
  "type": "https://api.example.com/errors/validation",
  "title": "Validation Error",
  "status": 400,
  "detail": "The request body contains invalid data",
  "instance": "/users/123",
  "errors": [
    {
      "field": "email",
      "code": "invalid_format",
      "message": "Invalid email format"
    },
    {
      "field": "age",
      "code": "out_of_range",
      "message": "Age must be between 0 and 150"
    }
  ],
  "traceId": "abc-123-xyz"
}`}</pre>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>📋 HTTP Status Codes для ошибок</h2>

            <div className="status-grid">
              <div className="status-group">
                <h4>4xx — Client Errors</h4>
                <div className="status-item">
                  <code>400</code>
                  <span>Bad Request — неверный формат запроса</span>
                </div>
                <div className="status-item">
                  <code>401</code>
                  <span>Unauthorized — требуется аутентификация</span>
                </div>
                <div className="status-item">
                  <code>403</code>
                  <span>Forbidden — доступ запрещён</span>
                </div>
                <div className="status-item">
                  <code>404</code>
                  <span>Not Found — ресурс не найден</span>
                </div>
                <div className="status-item">
                  <code>409</code>
                  <span>Conflict — конфликт (уже существует)</span>
                </div>
                <div className="status-item">
                  <code>422</code>
                  <span>Unprocessable Entity — валидация не прошла</span>
                </div>
                <div className="status-item">
                  <code>429</code>
                  <span>Too Many Requests — rate limit</span>
                </div>
              </div>

              <div className="status-group">
                <h4>5xx — Server Errors</h4>
                <div className="status-item">
                  <code>500</code>
                  <span>Internal Server Error — что-то сломалось</span>
                </div>
                <div className="status-item">
                  <code>502</code>
                  <span>Bad Gateway — upstream сервер не ответил</span>
                </div>
                <div className="status-item">
                  <code>503</code>
                  <span>Service Unavailable — сервис недоступен</span>
                </div>
                <div className="status-item">
                  <code>504</code>
                  <span>Gateway Timeout — timeout upstream</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>✅ Best Practices</h2>

            <div className="best-practices-list">
              <div className="practice">
                <strong>Используй правильные статус коды</strong>
                <p>Не возвращай 200 с {`{ "error": true }`}</p>
              </div>
              <div className="practice">
                <strong>Машиночитаемые error codes</strong>
                <p><code>"code": "invalid_email"</code> вместо текста</p>
              </div>
              <div className="practice">
                <strong>Человекочитаемые сообщения</strong>
                <p>Для отображения пользователю</p>
              </div>
              <div className="practice">
                <strong>Не раскрывай внутренности</strong>
                <p>Никаких stack traces в production!</p>
              </div>
              <div className="practice">
                <strong>Добавляй trace ID</strong>
                <p>Для отладки и поддержки</p>
              </div>
              <div className="practice">
                <strong>Локализуй сообщения</strong>
                <p>Используй Accept-Language header</p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeSection === 'versioning' && (
        <>
          <div className="card">
            <h2>🏷️ API Versioning</h2>
            <p>Способы версионирования API</p>

            <div className="versioning-grid">
              <div className="version-method">
                <h4>URL Path</h4>
                <code>GET /api/v1/users</code>
                <code>GET /api/v2/users</code>
                <div className="pros-cons">
                  <span className="pro">✅ Очевидно, легко роутить</span>
                  <span className="con">❌ "Ломает" REST принципы</span>
                </div>
                <p className="used-by">Используют: Twitter, Stripe, GitHub</p>
              </div>

              <div className="version-method">
                <h4>Query Parameter</h4>
                <code>GET /users?version=2</code>
                <div className="pros-cons">
                  <span className="pro">✅ Просто добавить</span>
                  <span className="con">❌ Легко забыть</span>
                </div>
                <p className="used-by">Используют: Google, Amazon</p>
              </div>

              <div className="version-method">
                <h4>Custom Header</h4>
                <code>X-API-Version: 2</code>
                <code>Api-Version: 2024-01-15</code>
                <div className="pros-cons">
                  <span className="pro">✅ Чистые URL</span>
                  <span className="con">❌ Не видно в браузере</span>
                </div>
                <p className="used-by">Используют: Stripe (дата-версия)</p>
              </div>

              <div className="version-method">
                <h4>Accept Header</h4>
                <code>Accept: application/vnd.api+json; version=2</code>
                <code>Accept: application/vnd.github.v3+json</code>
                <div className="pros-cons">
                  <span className="pro">✅ "Правильный" REST способ</span>
                  <span className="con">❌ Сложнее использовать</span>
                </div>
                <p className="used-by">Используют: GitHub</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>📅 Date-based Versioning (Stripe style)</h2>

            <div className="code-block">
              <pre>{`// Stripe использует даты вместо номеров версий
Stripe-Version: 2024-01-01

// Преимущества:
// 1. Понятно когда была версия
// 2. Можно делать частые релизы
// 3. Не нужно думать о semver

// В dashboard можно "закрепить" версию аккаунта
// Новые изменения не сломают существующие интеграции`}</pre>
            </div>
          </div>

          <div className="card">
            <h2>🔄 Breaking vs Non-Breaking Changes</h2>

            <div className="changes-grid">
              <div className="change-type safe">
                <h4>✅ Non-Breaking (безопасно)</h4>
                <ul>
                  <li>Добавление новых endpoints</li>
                  <li>Добавление новых полей в response</li>
                  <li>Добавление опциональных параметров</li>
                  <li>Расширение enum новыми значениями</li>
                </ul>
              </div>

              <div className="change-type breaking">
                <h4>❌ Breaking (требует новой версии)</h4>
                <ul>
                  <li>Удаление endpoints</li>
                  <li>Удаление полей из response</li>
                  <li>Переименование полей</li>
                  <li>Изменение типов данных</li>
                  <li>Изменение обязательности параметров</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {activeSection === 'rate' && (
        <>
          <div className="card">
            <h2>⏱️ Rate Limiting</h2>
            <p>Защита API от злоупотреблений</p>

            <div className="rate-headers">
              <h4>Стандартные заголовки</h4>
              <div className="code-block">
                <pre>{`HTTP/1.1 200 OK
X-RateLimit-Limit: 100        // Максимум запросов
X-RateLimit-Remaining: 45     // Осталось
X-RateLimit-Reset: 1640995200 // Когда сбросится (Unix timestamp)

// Или стандарт IETF draft:
RateLimit-Limit: 100
RateLimit-Remaining: 45
RateLimit-Reset: 60           // Секунд до сброса`}</pre>
              </div>
            </div>

            <div className="rate-response">
              <h4>Ответ при превышении</h4>
              <div className="code-block">
                <pre>{`HTTP/1.1 429 Too Many Requests
Retry-After: 60

{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Too many requests. Please retry after 60 seconds.",
    "retryAfter": 60
  }
}`}</pre>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>🎯 Алгоритмы Rate Limiting</h2>

            <div className="algorithms-grid">
              <div className="algorithm">
                <h4>Fixed Window</h4>
                <p>100 запросов в минуту, счётчик сбрасывается в начале каждой минуты</p>
                <div className="algo-visual">
                  <span>|----100 req----|----100 req----|</span>
                </div>
                <span className="algo-note">⚠️ Проблема: burst на границе окон</span>
              </div>

              <div className="algorithm">
                <h4>Sliding Window</h4>
                <p>100 запросов за последние 60 секунд (скользящее окно)</p>
                <div className="algo-visual">
                  <span>|~~~~ 60s ~~~~|</span>
                </div>
                <span className="algo-note">✅ Более равномерное распределение</span>
              </div>

              <div className="algorithm">
                <h4>Token Bucket</h4>
                <p>Токены добавляются с фиксированной скоростью, запрос тратит токен</p>
                <div className="algo-visual">
                  <span>🪣 [••••••••] → 1 req = -1 token</span>
                </div>
                <span className="algo-note">✅ Позволяет bursts, сглаживает пики</span>
              </div>

              <div className="algorithm">
                <h4>Leaky Bucket</h4>
                <p>Запросы "утекают" с постоянной скоростью</p>
                <div className="algo-visual">
                  <span>🪣 [•••] → • → • → • (fixed rate)</span>
                </div>
                <span className="algo-note">✅ Гарантирует постоянную нагрузку</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>📊 Стратегии лимитирования</h2>

            <div className="strategies-list">
              <div className="strategy-item">
                <strong>По IP адресу</strong>
                <p>Просто, но проблемы с NAT и proxy</p>
              </div>
              <div className="strategy-item">
                <strong>По API ключу / токену</strong>
                <p>Точнее, разные лимиты для разных клиентов</p>
              </div>
              <div className="strategy-item">
                <strong>По пользователю</strong>
                <p>После аутентификации</p>
              </div>
              <div className="strategy-item">
                <strong>По endpoint</strong>
                <p>Разные лимиты для разных операций (тяжёлые запросы — меньше)</p>
              </div>
              <div className="strategy-item">
                <strong>Комбинированный</strong>
                <p>IP + API key + endpoint + time of day</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>💡 Best Practices</h2>

            <div className="best-list">
              <div className="best-item">
                <span className="icon">✅</span>
                <span>Всегда отправляй rate limit headers</span>
              </div>
              <div className="best-item">
                <span className="icon">✅</span>
                <span>Используй 429 статус код, не 403</span>
              </div>
              <div className="best-item">
                <span className="icon">✅</span>
                <span>Добавь Retry-After header</span>
              </div>
              <div className="best-item">
                <span className="icon">✅</span>
                <span>Документируй лимиты</span>
              </div>
              <div className="best-item">
                <span className="icon">✅</span>
                <span>Разные tier'ы для разных планов (free/paid)</span>
              </div>
              <div className="best-item">
                <span className="icon">✅</span>
                <span>Graceful degradation — лучше медленно, чем 429</span>
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
          flex-wrap: wrap;
        }
        .tab {
          padding: 10px 20px;
          border: none;
          background: var(--bg-secondary);
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.95rem;
        }
        .tab.active {
          background: var(--accent);
          color: white;
        }
        .patterns-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .pattern-card {
          padding: 20px;
          background: var(--bg-secondary);
          border-radius: 12px;
        }
        .pattern-card h3 {
          margin: 0 0 12px;
        }
        .endpoint {
          display: block;
          padding: 8px 12px;
          background: var(--bg-code);
          border-radius: 6px;
          margin-bottom: 12px;
          color: var(--accent);
        }
        .pros-cons {
          margin-top: 12px;
          font-size: 0.85em;
        }
        .pros, .cons {
          margin: 4px 0;
        }
        .pros { color: var(--success); }
        .cons { color: var(--text-secondary); }
        .recommendation-box {
          margin-top: 20px;
          padding: 16px;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 8px;
        }
        .recommendation-box ul {
          margin: 8px 0 0;
          padding-left: 20px;
        }
        .filter-patterns {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        .filter-pattern {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .filter-pattern h4 {
          margin: 0 0 8px;
          color: var(--accent);
        }
        .filter-pattern code {
          display: block;
          margin: 4px 0;
          font-size: 0.85em;
        }
        .filter-pattern p {
          margin: 8px 0 0;
          font-size: 0.85em;
          color: var(--text-secondary);
        }
        .api-examples {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .api-example {
          padding: 12px 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .api-example h4 {
          margin: 0;
          min-width: 80px;
          color: var(--accent);
        }
        .api-example code {
          font-size: 0.85em;
        }
        .error-format h4 {
          margin-bottom: 12px;
        }
        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .status-group h4 {
          margin: 0 0 12px;
          color: var(--accent);
        }
        .status-item {
          display: flex;
          gap: 12px;
          padding: 8px;
          margin: 4px 0;
          background: var(--bg-secondary);
          border-radius: 4px;
        }
        .status-item code {
          font-weight: bold;
          min-width: 40px;
        }
        .status-item span {
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .best-practices-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 12px;
        }
        .practice {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .practice strong {
          display: block;
          margin-bottom: 4px;
        }
        .practice p {
          margin: 0;
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .versioning-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }
        .version-method {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .version-method h4 {
          margin: 0 0 8px;
          color: var(--accent);
        }
        .version-method code {
          display: block;
          margin: 4px 0;
          font-size: 0.85em;
        }
        .version-method .pros-cons {
          margin: 12px 0;
        }
        .version-method .pro, .version-method .con {
          display: block;
          font-size: 0.85em;
        }
        .used-by {
          font-size: 0.8em;
          color: var(--text-secondary);
          margin: 0;
        }
        .changes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .change-type {
          padding: 20px;
          border-radius: 12px;
        }
        .change-type.safe {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .change-type.breaking {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .change-type h4 {
          margin: 0 0 12px;
        }
        .change-type ul {
          margin: 0;
          padding-left: 20px;
        }
        .rate-headers, .rate-response {
          margin: 16px 0;
        }
        .rate-headers h4, .rate-response h4 {
          margin-bottom: 8px;
        }
        .algorithms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        .algorithm {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .algorithm h4 {
          margin: 0 0 8px;
          color: var(--accent);
        }
        .algorithm p {
          margin: 0 0 8px;
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .algo-visual {
          font-family: monospace;
          padding: 8px;
          background: var(--bg-code);
          border-radius: 4px;
          margin: 8px 0;
        }
        .algo-note {
          font-size: 0.85em;
        }
        .strategies-list, .best-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .strategy-item {
          padding: 12px 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .strategy-item strong {
          display: block;
          margin-bottom: 4px;
        }
        .strategy-item p {
          margin: 0;
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .best-item {
          display: flex;
          gap: 12px;
          align-items: center;
          padding: 12px 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .best-item .icon {
          font-size: 1.2em;
        }
      `}</style>
    </div>
  )
}
