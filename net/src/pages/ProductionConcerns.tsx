import { useState } from 'react'

const tabs = ['Observability', 'Retry & Timeout', 'Validation & Versioning', 'Rate Limiting'] as const
type Tab = typeof tabs[number]

export default function ProductionConcerns() {
  const [activeTab, setActiveTab] = useState<Tab>('Observability')

  return (
    <div className="page">
      <h1>🏭 Production Concerns</h1>
      <p className="page-description">
        Что нужно учитывать при выводе API в продакшен — наблюдаемость, устойчивость к сбоям,
        валидация, версионирование и защита от перегрузки.
      </p>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'Observability' && <ObservabilitySection />}
        {activeTab === 'Retry & Timeout' && <RetrySection />}
        {activeTab === 'Validation & Versioning' && <ValidationSection />}
        {activeTab === 'Rate Limiting' && <RateLimitSection />}
      </div>

      <div className="card" style={{ marginTop: '2rem', borderLeft: '4px solid var(--accent)' }}>
        <h3>🎤 Вопросы на собеседовании</h3>
        <ol>
          <li>Как вы реализуете retry-логику? Что такое exponential backoff с jitter?</li>
          <li>Чем отличается structured logging от printf-стиля?</li>
          <li>Как версионировать REST API? Когда нужна новая версия?</li>
          <li>Что такое rate limiting и какие алгоритмы бывают?</li>
        </ol>
      </div>
    </div>
  )
}

/* ─── Observability ─── */
function ObservabilitySection() {
  return (
    <>
      <div className="card">
        <h2>📊 Три столпа наблюдаемости</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Столп</th><th>Что показывает</th><th>Инструменты</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Logs</strong></td>
              <td>Дискретные события (ошибки, действия, аудит)</td>
              <td>ELK, Loki, CloudWatch, Datadog</td>
            </tr>
            <tr>
              <td><strong>Metrics</strong></td>
              <td>Числовые показатели во времени (latency, RPS, error rate)</td>
              <td>Prometheus, Grafana, Datadog, CloudWatch</td>
            </tr>
            <tr>
              <td><strong>Traces</strong></td>
              <td>Путь запроса через систему (spans, timing)</td>
              <td>Jaeger, Zipkin, OpenTelemetry, Datadog APM</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>📝 Structured Logging</h2>
        <p>
          Структурированные логи (JSON) вместо свободного текста — проще искать, фильтровать и алертить.
        </p>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`// ❌ Плохо: свободный текст
console.log("User 123 failed to login from 192.168.1.1")

// ✅ Хорошо: structured JSON
logger.warn({
  event: "login_failed",
  userId: 123,
  ip: "192.168.1.1",
  reason: "invalid_password",
  attemptCount: 3
})`}</pre>
        </div>

        <h3>Обязательные поля</h3>
        <table className="comparison-table">
          <thead>
            <tr><th>Поле</th><th>Зачем</th></tr>
          </thead>
          <tbody>
            <tr><td><code>timestamp</code></td><td>Когда произошло (ISO 8601)</td></tr>
            <tr><td><code>level</code></td><td>debug / info / warn / error / fatal</td></tr>
            <tr><td><code>event</code> / <code>message</code></td><td>Что произошло</td></tr>
            <tr><td><code>requestId</code> / <code>traceId</code></td><td>Связь с другими логами и трейсами</td></tr>
            <tr><td><code>service</code></td><td>Имя сервиса (в микросервисах)</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>📈 Ключевые метрики API</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Метрика</th><th>Что измеряет</th><th>Порог</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>RPS</strong></td><td>Requests per second</td><td>Зависит от инфраструктуры</td></tr>
            <tr><td><strong>p50 / p95 / p99 latency</strong></td><td>Процентили времени ответа</td><td>p99 &lt; 500ms (типично)</td></tr>
            <tr><td><strong>Error rate</strong></td><td>Доля 5xx ответов</td><td>&lt; 0.1%</td></tr>
            <tr><td><strong>Saturation</strong></td><td>Использование CPU/Memory/Connections</td><td>&lt; 80%</td></tr>
            <tr><td><strong>Apdex</strong></td><td>Удовлетворённость (satisfied + tolerating)</td><td>&gt; 0.95</td></tr>
          </tbody>
        </table>
        <p style={{ marginTop: '0.5rem' }}>
          <strong>RED метод</strong>: Rate, Errors, Duration — для каждого endpoint.<br />
          <strong>USE метод</strong>: Utilization, Saturation, Errors — для инфраструктуры.
        </p>
      </div>
    </>
  )
}

/* ─── Retry & Timeout ─── */
function RetrySection() {
  return (
    <>
      <div className="card">
        <h2>🔄 Retry-стратегии</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Стратегия</th><th>Формула</th><th>Когда</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Fixed delay</strong></td>
              <td><code>wait = 1s</code></td>
              <td>Простые случаи, идемпотентные запросы</td>
            </tr>
            <tr>
              <td><strong>Exponential backoff</strong></td>
              <td><code>wait = base × 2^attempt</code></td>
              <td>Стандарт для API (AWS, Google Cloud)</td>
            </tr>
            <tr>
              <td><strong>+ Jitter</strong></td>
              <td><code>wait = random(0, base × 2^attempt)</code></td>
              <td>Обязательно при множестве клиентов (thundering herd)</td>
            </tr>
            <tr>
              <td><strong>Circuit Breaker</strong></td>
              <td>Closed → Open → Half-Open</td>
              <td>Каскадные сбои, downstream выключен</td>
            </tr>
          </tbody>
        </table>

        <h3>Пример: exponential backoff с jitter</h3>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
      if (res.status < 500) throw new Error(\`Client error: \${res.status}\`);
    } catch (err) {
      if (attempt === maxRetries) throw err;
    }
    const baseDelay = 1000;
    const maxDelay = baseDelay * Math.pow(2, attempt);
    const jitter = Math.random() * maxDelay;
    await new Promise(r => setTimeout(r, jitter));
  }
}`}</pre>
        </div>

        <h3>⚠️ Когда НЕ retryить</h3>
        <ul>
          <li><strong>4xx ответы</strong> — клиентская ошибка, повтор не поможет</li>
          <li><strong>Non-idempotent</strong> — POST создающий ресурс без idempotency key</li>
          <li><strong>429 без Retry-After</strong> — сервер перегружен, слепой retry усиливает проблему</li>
        </ul>
      </div>

      <div className="card">
        <h2>⏱️ Timeout-стратегии</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Тип</th><th>Что контролирует</th><th>Типичное значение</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Connection timeout</strong></td><td>Время на установку TCP/TLS</td><td>3-5 секунд</td></tr>
            <tr><td><strong>Read timeout</strong></td><td>Время ожидания первых данных (TTFB)</td><td>5-15 секунд</td></tr>
            <tr><td><strong>Total timeout</strong></td><td>Общее время запроса</td><td>15-30 секунд</td></tr>
            <tr><td><strong>Idle timeout</strong></td><td>Неактивное WebSocket/keep-alive</td><td>30-120 секунд</td></tr>
          </tbody>
        </table>

        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`// AbortController для timeout
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

const response = await fetch(url, { signal: controller.signal });
clearTimeout(timeoutId);`}</pre>
        </div>

        <h3>⚠️ Подводные камни</h3>
        <ul>
          <li><strong>Timeout без retry</strong> — запрос мог завершиться на сервере → дублирование</li>
          <li><strong>Cascading timeouts</strong> — frontend 10s, BFF 15s, backend 20s → всё висит</li>
          <li><strong>Правило</strong>: timeout вызывающего &lt; timeout вызываемого</li>
        </ul>
      </div>
    </>
  )
}

/* ─── Validation & Versioning ─── */
function ValidationSection() {
  return (
    <>
      <div className="card">
        <h2>✅ Валидация запросов</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Уровень</th><th>Что проверяем</th><th>Инструменты</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Schema</strong></td>
              <td>Типы, required поля, formats</td>
              <td>Zod, Joi, Yup, JSON Schema, OpenAPI</td>
            </tr>
            <tr>
              <td><strong>Business</strong></td>
              <td>Бизнес-правила (баланс, лимиты)</td>
              <td>Код приложения, domain layer</td>
            </tr>
            <tr>
              <td><strong>Auth</strong></td>
              <td>Авторизация, ownership</td>
              <td>Middleware, guards, policies</td>
            </tr>
          </tbody>
        </table>

        <h3>Паттерн ответа при ошибке валидации</h3>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`// RFC 7807: Problem Details for HTTP APIs
{
  "type": "https://api.example.com/errors/validation",
  "title": "Validation Error",
  "status": 422,
  "detail": "Request body contains invalid fields",
  "errors": [
    { "field": "email", "message": "Invalid email format" },
    { "field": "age", "message": "Must be >= 18" }
  ]
}`}</pre>
        </div>
      </div>

      <div className="card">
        <h2>🔢 Версионирование API</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Подход</th><th>Пример</th><th>Плюсы</th><th>Минусы</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>URL path</strong></td>
              <td><code>/api/v2/users</code></td>
              <td>Явно, просто, кэшируется</td>
              <td>Дублирование маршрутов</td>
            </tr>
            <tr>
              <td><strong>Query param</strong></td>
              <td><code>/api/users?v=2</code></td>
              <td>Не меняет структуру URL</td>
              <td>Легко пропустить, кэш сложнее</td>
            </tr>
            <tr>
              <td><strong>Header</strong></td>
              <td><code>Accept: application/vnd.api.v2+json</code></td>
              <td>Чистые URL, content negotiation</td>
              <td>Менее заметно, сложнее тестировать</td>
            </tr>
            <tr>
              <td><strong>Нет версий</strong></td>
              <td>Эволюция: additive changes only</td>
              <td>Нет версий = нет поддержки старых</td>
              <td>Breaking changes невозможны</td>
            </tr>
          </tbody>
        </table>

        <h3>Когда нужна новая версия</h3>
        <ul>
          <li>Удаление поля или endpoint</li>
          <li>Изменение типа поля (string → number)</li>
          <li>Изменение семантики существующего поля</li>
          <li>Изменение формата ошибок</li>
        </ul>

        <h3>Когда НЕ нужна</h3>
        <ul>
          <li>Добавление нового поля (backward-compatible)</li>
          <li>Добавление нового endpoint</li>
          <li>Добавление нового optional параметра</li>
        </ul>
      </div>
    </>
  )
}

/* ─── Rate Limiting ─── */
function RateLimitSection() {
  return (
    <>
      <div className="card">
        <h2>🚦 Rate Limiting</h2>
        <p>
          Ограничение количества запросов для защиты от перегрузки, abuse и справедливого распределения ресурсов.
        </p>

        <h3>Алгоритмы</h3>
        <table className="comparison-table">
          <thead>
            <tr><th>Алгоритм</th><th>Как работает</th><th>Плюсы / Минусы</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Fixed Window</strong></td>
              <td>N запросов в окно (напр. 100/мин)</td>
              <td>Прост, но burst на границе окна</td>
            </tr>
            <tr>
              <td><strong>Sliding Window Log</strong></td>
              <td>Лог timestamp-ов, скользящее окно</td>
              <td>Точен, но память O(n)</td>
            </tr>
            <tr>
              <td><strong>Sliding Window Counter</strong></td>
              <td>Взвешенное среднее двух окон</td>
              <td>Компромисс точность/память</td>
            </tr>
            <tr>
              <td><strong>Token Bucket</strong></td>
              <td>Корзина с токенами, пополняется с рейтом</td>
              <td>Допускает burst, гибкий</td>
            </tr>
            <tr>
              <td><strong>Leaky Bucket</strong></td>
              <td>Очередь с фиксированной скоростью обработки</td>
              <td>Стабильный rate, но жёсткий</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>📋 HTTP-заголовки Rate Limiting</h2>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`HTTP/1.1 200 OK
X-RateLimit-Limit: 100        // макс. запросов в окне
X-RateLimit-Remaining: 42     // осталось
X-RateLimit-Reset: 1710000000 // UNIX timestamp сброса

// При превышении:
HTTP/1.1 429 Too Many Requests
Retry-After: 30               // секунды до повтора`}</pre>
        </div>

        <h3>Granularity</h3>
        <table className="comparison-table">
          <thead>
            <tr><th>По чему ограничивать</th><th>Когда</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>IP</strong></td><td>Анонимные эндпоинты, login</td></tr>
            <tr><td><strong>API key</strong></td><td>Публичные API (SaaS)</td></tr>
            <tr><td><strong>User ID</strong></td><td>Авторизованные пользователи</td></tr>
            <tr><td><strong>Endpoint</strong></td><td>Тяжёлые операции (import, export)</td></tr>
            <tr><td><strong>Global</strong></td><td>Защита всего сервиса</td></tr>
          </tbody>
        </table>

        <h3>⚠️ Подводные камни</h3>
        <ul>
          <li><strong>Shared IP</strong> — NAT / прокси / VPN → один IP для тысяч пользователей</li>
          <li><strong>Distributed rate limiting</strong> — нужен Redis или аналог для синхронизации между инстансами</li>
          <li><strong>Graceful degradation</strong> — лучше вернуть 429 с Retry-After, чем 503</li>
          <li><strong>DDoS ≠ rate limiting</strong> — настоящая DDoS-защита работает на уровне сети (Cloudflare, AWS Shield)</li>
        </ul>
      </div>
    </>
  )
}
