import { useState } from 'react'

const tabs = ['Auth-модели', 'JWT Deep Dive', 'SSE vs WebSocket', 'Pitfalls'] as const
type Tab = typeof tabs[number]

export default function AuthStreaming() {
  const [activeTab, setActiveTab] = useState<Tab>('Auth-модели')

  return (
    <div className="page">
      <h1>🔐 Auth & Real-Time</h1>
      <p className="page-description">
        Глубже в аутентификацию (session, token, OAuth) и real-time коммуникацию (SSE, WebSocket, Long Polling).
        Trade-offs и production-паттерны для каждого подхода.
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
        {activeTab === 'Auth-модели' && <AuthModelsSection />}
        {activeTab === 'JWT Deep Dive' && <JWTSection />}
        {activeTab === 'SSE vs WebSocket' && <StreamingSection />}
        {activeTab === 'Pitfalls' && <PitfallsSection />}
      </div>

      <div className="card" style={{ marginTop: '2rem', borderLeft: '4px solid var(--accent)' }}>
        <h3>🎤 Вопросы на собеседовании</h3>
        <ol>
          <li>Чем отличается аутентификация от авторизации?</li>
          <li>Session vs JWT — когда что использовать? Какие trade-offs?</li>
          <li>Как безопасно хранить refresh token на клиенте?</li>
          <li>SSE vs WebSocket — когда что выбрать? А Long Polling?</li>
          <li>Что такое OAuth 2.0 Authorization Code Flow с PKCE?</li>
        </ol>
      </div>
    </div>
  )
}

/* ─── Auth-модели ─── */
function AuthModelsSection() {
  return (
    <>
      <div className="card">
        <h2>🔑 Модели аутентификации</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Модель</th><th>Где хранится состояние</th><th>Transport</th><th>Подходит для</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Session + Cookie</strong></td>
              <td>Сервер (Redis, DB)</td>
              <td>Cookie (HttpOnly, Secure)</td>
              <td>SSR, монолиты, банки</td>
            </tr>
            <tr>
              <td><strong>JWT (stateless)</strong></td>
              <td>Клиент (token)</td>
              <td>Authorization: Bearer</td>
              <td>SPA, mobile, микросервисы</td>
            </tr>
            <tr>
              <td><strong>OAuth 2.0</strong></td>
              <td>Authorization Server</td>
              <td>Redirect + tokens</td>
              <td>Third-party login (Google, GitHub)</td>
            </tr>
            <tr>
              <td><strong>API Key</strong></td>
              <td>Сервер (DB)</td>
              <td>Header / Query</td>
              <td>Server-to-server, публичные API</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>🍪 Session-based Auth</h2>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`1. POST /login { email, password }
2. Server: verify credentials → create session → store in Redis
3. Response: Set-Cookie: sid=abc123; HttpOnly; Secure; SameSite=Lax
4. Client: автоматически отправляет cookie при каждом запросе
5. Server: проверяет session по sid в Redis
6. Logout: DELETE session из Redis + clear cookie`}</pre>
        </div>

        <h3>Плюсы и минусы</h3>
        <table className="comparison-table">
          <thead>
            <tr><th>Плюсы</th><th>Минусы</th></tr>
          </thead>
          <tbody>
            <tr><td>Легко инвалидировать (удалить из Redis)</td><td>Stateful — нужен Redis/DB</td></tr>
            <tr><td>HttpOnly cookie — защита от XSS</td><td>CSRF уязвимость (нужен SameSite / CSRF token)</td></tr>
            <tr><td>Маленький cookie (&lt; 100 байт)</td><td>Сложнее в микросервисах (shared session store)</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>🌐 OAuth 2.0 + PKCE</h2>
        <p>
          Authorization Code Flow с PKCE — рекомендуемый flow для SPA и mobile (без client_secret на клиенте).
        </p>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`1. Клиент генерирует code_verifier + code_challenge (SHA256)
2. Redirect → Authorization Server (/authorize?code_challenge=...)
3. User логинится → consent → redirect с authorization code
4. Клиент обменивает code + code_verifier → access_token + refresh_token
5. Access token используется для API-запросов`}</pre>
        </div>

        <h3>Когда какой Flow</h3>
        <table className="comparison-table">
          <thead>
            <tr><th>Flow</th><th>Когда</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Auth Code + PKCE</strong></td><td>SPA, mobile, server-side web</td></tr>
            <tr><td><strong>Client Credentials</strong></td><td>Server-to-server (M2M)</td></tr>
            <tr><td><strong>Device Code</strong></td><td>TV, IoT, CLI (без браузера)</td></tr>
            <tr><td><s>Implicit</s></td><td>Устарел — замените на Auth Code + PKCE</td></tr>
            <tr><td><s>Password Grant</s></td><td>Устарел — только legacy-системы</td></tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

/* ─── JWT Deep Dive ─── */
function JWTSection() {
  return (
    <>
      <div className="card">
        <h2>🪙 Структура JWT</h2>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`Header.Payload.Signature

// Header (base64url)
{ "alg": "RS256", "typ": "JWT" }

// Payload (base64url)
{
  "sub": "user-123",
  "email": "user@example.com",
  "roles": ["admin"],
  "iat": 1710000000,
  "exp": 1710003600  // +1 hour
}

// Signature
RS256(base64url(header) + "." + base64url(payload), privateKey)`}</pre>
        </div>

        <h3>Алгоритмы подписи</h3>
        <table className="comparison-table">
          <thead>
            <tr><th>Алгоритм</th><th>Тип</th><th>Когда</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>HS256</strong></td><td>Symmetric (shared secret)</td><td>Один сервис (монолит)</td></tr>
            <tr><td><strong>RS256</strong></td><td>Asymmetric (private/public key)</td><td>Микросервисы (publish public key)</td></tr>
            <tr><td><strong>ES256</strong></td><td>Asymmetric (ECDSA)</td><td>Компактнее RS256, быстрее verify</td></tr>
            <tr><td><code>"alg": "none"</code></td><td>—</td><td>⛔ Никогда! Уязвимость CVE-2015-2951</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>♻️ Access + Refresh Token</h2>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`Access Token:  короткоживущий (15 мин), в Authorization header
Refresh Token: долгоживущий (7-30 дней), в HttpOnly cookie

Поток обновления:
1. Access token истёк → 401 Unauthorized
2. Client: POST /auth/refresh (refresh token в cookie)
3. Server: verify refresh → issue new access + rotate refresh
4. Client: повторяет оригинальный запрос с новым access token`}</pre>
        </div>

        <h3>Где хранить токены</h3>
        <table className="comparison-table">
          <thead>
            <tr><th>Хранилище</th><th>XSS</th><th>CSRF</th><th>Рекомендация</th></tr>
          </thead>
          <tbody>
            <tr><td><code>localStorage</code></td><td>❌ Доступен JS</td><td>✅ Безопасен</td><td>⚠️ Только если нет XSS-рисков</td></tr>
            <tr><td><code>HttpOnly Cookie</code></td><td>✅ Недоступен JS</td><td>❌ Уязвим</td><td>✅ + SameSite=Strict/Lax</td></tr>
            <tr><td>Memory (JS variable)</td><td>✅ При перезагрузке теряется</td><td>✅</td><td>✅ Access token + cookie refresh</td></tr>
          </tbody>
        </table>
        <p><strong>Лучшая практика для SPA</strong>: access token в памяти, refresh token в HttpOnly Secure cookie с SameSite=Strict. Token rotation при каждом refresh.</p>
      </div>
    </>
  )
}

/* ─── SSE vs WebSocket ─── */
function StreamingSection() {
  return (
    <>
      <div className="card">
        <h2>⚡ Real-Time: сравнение подходов</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Свойство</th><th>Polling</th><th>Long Polling</th><th>SSE</th><th>WebSocket</th></tr>
          </thead>
          <tbody>
            <tr><td>Протокол</td><td>HTTP</td><td>HTTP</td><td>HTTP</td><td>WS (upgrade)</td></tr>
            <tr><td>Направление</td><td>Client → Server</td><td>Client → Server</td><td>Server → Client</td><td>Двустороннее</td></tr>
            <tr><td>Формат</td><td>JSON</td><td>JSON</td><td>text/event-stream</td><td>Любой (text/binary)</td></tr>
            <tr><td>Автопереподключение</td><td>Вручную</td><td>Вручную</td><td>✅ Встроено</td><td>Вручную</td></tr>
            <tr><td>Через HTTP/2</td><td>✅</td><td>✅</td><td>✅ Мультиплексируется</td><td>❌ Отдельное TCP</td></tr>
            <tr><td>Overhead</td><td>Высокий (частые запросы)</td><td>Средний</td><td>Низкий</td><td>Минимальный</td></tr>
            <tr><td>Proxy/CDN</td><td>✅</td><td>⚠️</td><td>✅ (chunked)</td><td>⚠️ Требует upgrade</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>📡 Server-Sent Events (SSE)</h2>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`// Server (Node.js / Express)
app.get('/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const send = (data) => {
    res.write(\`event: update\\ndata: \${JSON.stringify(data)}\\nid: \${Date.now()}\\n\\n\`);
  };

  const interval = setInterval(() => send({ price: Math.random() * 100 }), 1000);
  req.on('close', () => clearInterval(interval));
});

// Client
const source = new EventSource('/events');
source.addEventListener('update', (e) => {
  const data = JSON.parse(e.data);
  console.log('Price:', data.price);
});
// Автоматический reconnect при обрыве (Last-Event-ID header)`}</pre>
        </div>

        <h3>Когда SSE лучше WebSocket</h3>
        <ul>
          <li>Только server → client (новости, котировки, уведомления, прогресс)</li>
          <li>Нужна совместимость с HTTP/2, прокси, CDN</li>
          <li>Встроенный reconnect и Last-Event-ID</li>
          <li>Текстовые данные (JSON, plain text)</li>
        </ul>
      </div>

      <div className="card">
        <h2>🔌 WebSocket: когда нужен</h2>
        <ul>
          <li><strong>Двусторонний поток</strong> — чат, multiplayer games, collaborative editing</li>
          <li><strong>Бинарные данные</strong> — audio/video streaming, файлы</li>
          <li><strong>Низкая latency</strong> — trading, gaming (каждый ms важен)</li>
          <li><strong>Custom протокол</strong> — поверх WS можно реализовать любой протокол</li>
        </ul>

        <h3>WebSocket Lifecycle</h3>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`1. HTTP Upgrade Request
   GET /ws HTTP/1.1
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Key: ...

2. HTTP 101 Switching Protocols
   Upgrade: websocket
   Sec-WebSocket-Accept: ...

3. Bidirectional frames (text / binary / ping / pong / close)

4. Close handshake (close frame → close frame → TCP close)`}</pre>
        </div>
      </div>

      <div className="card">
        <h2>🆕 Альтернативы и тренды</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Технология</th><th>Описание</th><th>Статус</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>WebTransport</strong></td>
              <td>HTTP/3 + QUIC, bidirectional streams, unreliable datagrams</td>
              <td>Chrome 97+, в разработке</td>
            </tr>
            <tr>
              <td><strong>gRPC-Web</strong></td>
              <td>gRPC через HTTP/2 в браузере (Envoy proxy)</td>
              <td>Stable, для микросервисов</td>
            </tr>
            <tr>
              <td><strong>GraphQL Subscriptions</strong></td>
              <td>Real-time через WebSocket (graphql-ws)</td>
              <td>Stable, для GraphQL API</td>
            </tr>
            <tr>
              <td><strong>HTTP Streaming</strong></td>
              <td>Chunked transfer / ReadableStream</td>
              <td>Нативен, для AI-ответов (OpenAI SSE)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

/* ─── Pitfalls ─── */
function PitfallsSection() {
  return (
    <>
      <div className="card">
        <h2>⚠️ Auth Pitfalls</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Ошибка</th><th>Последствие</th><th>Решение</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>JWT в localStorage</td>
              <td>XSS → кража токена</td>
              <td>HttpOnly cookie или memory + refresh cookie</td>
            </tr>
            <tr>
              <td>Бессрочный access token</td>
              <td>Утечка = вечный доступ</td>
              <td>Short-lived (15 мин) + refresh rotation</td>
            </tr>
            <tr>
              <td><code>alg: none</code> не запрещён</td>
              <td>Подделка токенов</td>
              <td>Whitelist алгоритмов на сервере</td>
            </tr>
            <tr>
              <td>Нет revocation</td>
              <td>Нельзя выйти из системы</td>
              <td>Token blacklist (Redis) или refresh rotation</td>
            </tr>
            <tr>
              <td>Secret в JWT payload</td>
              <td>Данные видны (base64 ≠ шифрование)</td>
              <td>Минимальный payload: sub, exp, roles</td>
            </tr>
            <tr>
              <td>CORS wildcard + credentials</td>
              <td>Браузер блокирует</td>
              <td>Explicit origin, credentials: true</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>⚠️ Real-Time Pitfalls</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Ошибка</th><th>Последствие</th><th>Решение</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>WS без reconnect</td>
              <td>Потеря соединения → молчание</td>
              <td>Exponential backoff reconnect + heartbeat</td>
            </tr>
            <tr>
              <td>Нет heartbeat (ping/pong)</td>
              <td>Zombie connections, утечки памяти</td>
              <td>Ping каждые 30s, close через 60s без pong</td>
            </tr>
            <tr>
              <td>Broadcast без фильтрации</td>
              <td>Утечка данных другим пользователям</td>
              <td>Room/channel авторизация</td>
            </tr>
            <tr>
              <td>Нет backpressure</td>
              <td>Клиент не успевает обрабатывать</td>
              <td>Буферизация, throttling, drop старых сообщений</td>
            </tr>
            <tr>
              <td>SSE через HTTP/1.1 на одном домене</td>
              <td>Занимает 1 из 6 соединений</td>
              <td>HTTP/2 мультиплексирование</td>
            </tr>
            <tr>
              <td>WS auth через query parameter</td>
              <td>Токен в логах и URL</td>
              <td>Auth при upgrade (cookie) или первый message</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>🧭 Матрица принятия решений</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Сценарий</th><th>Рекомендация</th><th>Почему</th></tr>
          </thead>
          <tbody>
            <tr><td>Уведомления, прогресс-бар</td><td>SSE</td><td>Только server→client, встроенный reconnect</td></tr>
            <tr><td>Чат, collaborative editing</td><td>WebSocket</td><td>Двустороннее, низкая latency</td></tr>
            <tr><td>AI-streaming ответы</td><td>SSE / HTTP Streaming</td><td>Текстовый поток, простота</td></tr>
            <tr><td>Котировки, дашборд</td><td>SSE (1/s+) или Polling (1/10s+)</td><td>Зависит от частоты</td></tr>
            <tr><td>Multiplayer game</td><td>WebSocket / WebTransport</td><td>Бинарные данные, latency</td></tr>
            <tr><td>Микросервисы, events</td><td>Message broker (Kafka/NATS)</td><td>Не через HTTP</td></tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
