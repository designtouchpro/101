import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="demo-container">
      <div className="home-hero">
        <h1>Net Playground</h1>
        <p>
          Интерактивная площадка для изучения различных API протоколов: REST, GraphQL, 
          WebSocket и JSON-RPC. Визуализируйте, экспериментируйте и понимайте как работают 
          современные API.
        </p>
      </div>

      <h2 style={{ marginBottom: '24px' }}>🎓 Изучите протоколы</h2>

      <div className="feature-grid">
        <Link to="/rest" className="feature-card feature-card-rest">
          <div className="feature-icon">📡</div>
          <h3>REST API</h3>
          <p>
            Изучите архитектурный стиль REST: HTTP методы (GET, POST, PUT, DELETE), 
            статус-коды, заголовки и структуру ресурсов. Интерактивные примеры CRUD операций.
          </p>
          <div className="feature-tags">
            <span className="tag">HTTP</span>
            <span className="tag">CRUD</span>
            <span className="tag">Stateless</span>
          </div>
        </Link>

        <Link to="/graphql" className="feature-card feature-card-graphql">
          <div className="feature-icon">◈</div>
          <h3>GraphQL</h3>
          <p>
            Query Language для API: запрашивайте только нужные данные, используйте 
            мутации для изменений и подписки для реального времени. Строго типизированная схема.
          </p>
          <div className="feature-tags">
            <span className="tag">Query</span>
            <span className="tag">Mutation</span>
            <span className="tag">Subscription</span>
          </div>
        </Link>

        <Link to="/websocket" className="feature-card feature-card-websocket">
          <div className="feature-icon">⚡</div>
          <h3>WebSocket</h3>
          <p>
            Двунаправленная связь в реальном времени. Чат, уведомления, live-обновления. 
            Визуализация жизненного цикла соединения и обмена сообщениями.
          </p>
          <div className="feature-tags">
            <span className="tag">Real-time</span>
            <span className="tag">Bidirectional</span>
            <span className="tag">Persistent</span>
          </div>
        </Link>

        <Link to="/rpc" className="feature-card feature-card-rpc">
          <div className="feature-icon">🔧</div>
          <h3>JSON-RPC</h3>
          <p>
            Remote Procedure Call через JSON: вызывайте методы на сервере как локальные функции. 
            Простой протокол с понятной структурой запрос-ответ.
          </p>
          <div className="feature-tags">
            <span className="tag">Methods</span>
            <span className="tag">Params</span>
            <span className="tag">Simple</span>
          </div>
        </Link>
      </div>

      <h2 style={{ margin: '40px 0 24px' }}>📚 HTTP & API Концепции</h2>

      <div className="feature-grid">
        <Link to="/headers" className="feature-card">
          <div className="feature-icon">📋</div>
          <h3>HTTP Headers</h3>
          <p>
            Справочник по заголовкам HTTP: Content-Type, Authorization, Cache-Control и другие. 
            Интерактивный тестер для отправки запросов с кастомными заголовками.
          </p>
          <div className="feature-tags">
            <span className="tag">Request</span>
            <span className="tag">Response</span>
            <span className="tag">Content-Type</span>
          </div>
        </Link>

        <Link to="/caching" className="feature-card">
          <div className="feature-icon">💾</div>
          <h3>HTTP Caching</h3>
          <p>
            Cache-Control, ETag, Last-Modified — как работает кеширование в HTTP. 
            Стратегии кеширования для разных типов контента.
          </p>
          <div className="feature-tags">
            <span className="tag">Cache-Control</span>
            <span className="tag">ETag</span>
            <span className="tag">304</span>
          </div>
        </Link>

        <Link to="/auth" className="feature-card">
          <div className="feature-icon">🔐</div>
          <h3>Auth & Security</h3>
          <p>
            JWT, Sessions, OAuth — методы аутентификации. Cookie flags, CSRF/XSS защита, 
            лучшие практики безопасности API.
          </p>
          <div className="feature-tags">
            <span className="tag">JWT</span>
            <span className="tag">Sessions</span>
            <span className="tag">OAuth</span>
          </div>
        </Link>

        <Link to="/cors" className="feature-card">
          <div className="feature-icon">🌐</div>
          <h3>CORS</h3>
          <p>
            Cross-Origin Resource Sharing: почему браузер блокирует запросы, preflight requests, 
            настройка на сервере и отладка ошибок.
          </p>
          <div className="feature-tags">
            <span className="tag">Origin</span>
            <span className="tag">Preflight</span>
            <span className="tag">Access-Control</span>
          </div>
        </Link>

        <Link to="/patterns" className="feature-card">
          <div className="feature-icon">📐</div>
          <h3>API Patterns</h3>
          <p>
            Пагинация (offset, cursor), фильтрация, сортировка, версионирование API, 
            Rate Limiting, формат ошибок.
          </p>
          <div className="feature-tags">
            <span className="tag">Pagination</span>
            <span className="tag">Versioning</span>
            <span className="tag">Rate Limit</span>
          </div>
        </Link>

        <Link to="/status" className="feature-card">
          <div className="feature-icon">🚦</div>
          <h3>Status Codes</h3>
          <p>
            Полный справочник HTTP статус-кодов: 2xx успех, 3xx редиректы, 4xx ошибки клиента, 
            5xx ошибки сервера. Когда какой использовать.
          </p>
          <div className="feature-tags">
            <span className="tag">2xx</span>
            <span className="tag">4xx</span>
            <span className="tag">5xx</span>
          </div>
        </Link>
      </div>

      <div className="comparison-preview">
        <Link to="/comparison" className="feature-card feature-card-large">
          <div className="feature-icon">⚖️</div>
          <h3>Сравнение протоколов</h3>
          <p>
            Когда использовать REST, а когда GraphQL? Нужен ли WebSocket или хватит polling? 
            Разберём преимущества и недостатки каждого подхода с примерами использования.
          </p>
        </Link>
      </div>

      <div className="info-section">
        <div className="card">
          <h3>💡 Как использовать</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
            Каждый раздел содержит интерактивные примеры с визуализацией. Вы можете:
          </p>
          <ul className="info-list">
            <li>Отправлять реальные запросы к серверу и видеть ответы</li>
            <li>Наблюдать за сетевым взаимодействием в реальном времени</li>
            <li>Редактировать параметры запросов и экспериментировать</li>
            <li>Сравнивать разные подходы на одних и тех же данных</li>
          </ul>
        </div>

        <div className="card">
          <h3>🔧 Технологии</h3>
          <div className="tech-stack">
            <div className="tech-item">
              <strong>Frontend:</strong> React 19, TypeScript, Vite
            </div>
            <div className="tech-item">
              <strong>Backend:</strong> Node.js, Express, Apollo Server
            </div>
            <div className="tech-item">
              <strong>Protocols:</strong> HTTP/REST, GraphQL, WebSocket, JSON-RPC 2.0
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
