import { useState } from 'react'

interface AuthMethod {
  name: string
  description: string
  pros: string[]
  cons: string[]
  useCase: string
}

const authMethods: AuthMethod[] = [
  {
    name: 'Session + Cookie',
    description: 'Сервер создаёт сессию, ID хранится в cookie',
    pros: ['Просто реализовать', 'Автоматически отправляется браузером', 'Легко инвалидировать'],
    cons: ['Stateful — нужно хранилище сессий', 'Проблемы с масштабированием', 'CSRF уязвимость'],
    useCase: 'Традиционные веб-приложения, SSR'
  },
  {
    name: 'JWT (JSON Web Token)',
    description: 'Токен с данными пользователя, подписанный сервером',
    pros: ['Stateless', 'Масштабируется легко', 'Можно хранить данные в токене'],
    cons: ['Нельзя отозвать до истечения', 'Размер больше session ID', 'Сложнее refresh flow'],
    useCase: 'SPA, Mobile apps, Микросервисы'
  },
  {
    name: 'OAuth 2.0 / OpenID Connect',
    description: 'Делегированная авторизация через провайдера',
    pros: ['Не храните пароли', 'SSO из коробки', 'Стандарт индустрии'],
    cons: ['Сложная реализация', 'Зависимость от провайдера', 'Много редиректов'],
    useCase: '"Войти через Google/GitHub", Enterprise SSO'
  },
  {
    name: 'API Key',
    description: 'Статический ключ для идентификации приложения',
    pros: ['Очень просто', 'Хорош для server-to-server', 'Легко отозвать'],
    cons: ['Не для пользователей', 'Нет granular permissions', 'Легко утечь'],
    useCase: 'Публичные API, CLI tools, Интеграции'
  },
]

export default function AuthDemo() {
  const [activeTab, setActiveTab] = useState<'methods' | 'jwt' | 'headers' | 'best'>('methods')
  const [jwtParts, setJwtParts] = useState({
    header: '{\n  "alg": "HS256",\n  "typ": "JWT"\n}',
    payload: '{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "email": "john@example.com",\n  "iat": 1516239022,\n  "exp": 1516242622,\n  "roles": ["user", "admin"]\n}',
  })

  const tabs = [
    { id: 'methods', label: '🔐 Методы' },
    { id: 'jwt', label: '🎫 JWT' },
    { id: 'headers', label: '📋 Headers' },
    { id: 'best', label: '✨ Best Practices' },
  ]

  return (
    <div className="page-container">
      <h1>🔐 Authentication & Authorization</h1>
      <p className="page-description">
        <strong>Authentication</strong> — кто ты? <strong>Authorization</strong> — что тебе можно?
      </p>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'methods' && (
        <div className="tab-content">
          <div className="card">
            <h2>🔑 Методы аутентификации</h2>
            
            <div className="methods-grid">
              {authMethods.map(method => (
                <div key={method.name} className="method-card">
                  <h3>{method.name}</h3>
                  <p className="method-desc">{method.description}</p>
                  
                  <div className="pros-cons">
                    <div className="pros">
                      <strong>✅ Плюсы</strong>
                      <ul>
                        {method.pros.map(p => <li key={p}>{p}</li>)}
                      </ul>
                    </div>
                    <div className="cons">
                      <strong>❌ Минусы</strong>
                      <ul>
                        {method.cons.map(c => <li key={c}>{c}</li>)}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="use-case">
                    <strong>📍 Когда:</strong> {method.useCase}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Session flow */}
          <div className="card">
            <h2>🍪 Session Flow</h2>
            <div className="flow-diagram">
              <div className="flow-step">
                <span className="step-label">1. Login</span>
                <code>POST /login {`{ email, password }`}</code>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">
                <span className="step-label">2. Server</span>
                <code>Создаёт сессию в Redis/DB</code>
                <code>Set-Cookie: sessionId=abc123; HttpOnly; Secure</code>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">
                <span className="step-label">3. Запросы</span>
                <code>Cookie: sessionId=abc123 (автоматически)</code>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">
                <span className="step-label">4. Server</span>
                <code>Проверяет сессию в хранилище → данные пользователя</code>
              </div>
            </div>
          </div>

          {/* JWT flow */}
          <div className="card">
            <h2>🎫 JWT Flow</h2>
            <div className="flow-diagram">
              <div className="flow-step">
                <span className="step-label">1. Login</span>
                <code>POST /login {`{ email, password }`}</code>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">
                <span className="step-label">2. Server</span>
                <code>Создаёт JWT с payload и подписывает</code>
                <code>{`{ accessToken: "eyJhbG...", refreshToken: "..." }`}</code>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">
                <span className="step-label">3. Запросы</span>
                <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIs...</code>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">
                <span className="step-label">4. Server</span>
                <code>Проверяет подпись → читает payload → готово!</code>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'jwt' && (
        <div className="tab-content">
          <div className="card">
            <h2>🎫 Структура JWT</h2>
            <p>JWT состоит из 3 частей, разделённых точкой: <code>header.payload.signature</code></p>
            
            <div className="jwt-demo">
              <div className="jwt-part">
                <h4 style={{ color: '#ef4444' }}>Header (алгоритм)</h4>
                <textarea
                  value={jwtParts.header}
                  onChange={e => setJwtParts(p => ({ ...p, header: e.target.value }))}
                  className="jwt-input"
                  rows={4}
                />
                <code className="jwt-encoded" style={{ color: '#ef4444' }}>
                  {btoa(jwtParts.header).replace(/=/g, '').slice(0, 30)}...
                </code>
              </div>
              
              <div className="jwt-separator">.</div>
              
              <div className="jwt-part">
                <h4 style={{ color: '#8b5cf6' }}>Payload (данные)</h4>
                <textarea
                  value={jwtParts.payload}
                  onChange={e => setJwtParts(p => ({ ...p, payload: e.target.value }))}
                  className="jwt-input"
                  rows={8}
                />
                <code className="jwt-encoded" style={{ color: '#8b5cf6' }}>
                  {btoa(jwtParts.payload).replace(/=/g, '').slice(0, 40)}...
                </code>
              </div>
              
              <div className="jwt-separator">.</div>
              
              <div className="jwt-part">
                <h4 style={{ color: '#10b981' }}>Signature</h4>
                <div className="signature-info">
                  <code>HMACSHA256(</code>
                  <code>  base64UrlEncode(header) + "." +</code>
                  <code>  base64UrlEncode(payload),</code>
                  <code>  your-256-bit-secret</code>
                  <code>)</code>
                </div>
                <p className="note">⚠️ Секрет знает только сервер!</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>⏰ Стандартные Claims</h2>
            <div className="claims-grid">
              <div className="claim">
                <code>sub</code>
                <span>Subject — ID пользователя</span>
              </div>
              <div className="claim">
                <code>iat</code>
                <span>Issued At — когда создан</span>
              </div>
              <div className="claim">
                <code>exp</code>
                <span>Expiration — когда истечёт</span>
              </div>
              <div className="claim">
                <code>nbf</code>
                <span>Not Before — не раньше чем</span>
              </div>
              <div className="claim">
                <code>iss</code>
                <span>Issuer — кто выдал</span>
              </div>
              <div className="claim">
                <code>aud</code>
                <span>Audience — для кого</span>
              </div>
              <div className="claim">
                <code>jti</code>
                <span>JWT ID — уникальный ID токена</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>🔄 Access + Refresh Tokens</h2>
            
            <div className="tokens-comparison">
              <div className="token-col">
                <h3>Access Token</h3>
                <ul>
                  <li>Живёт 15-30 минут</li>
                  <li>Отправляется с каждым запросом</li>
                  <li>Хранится в памяти (JS variable)</li>
                  <li>Если утёк — скоро истечёт</li>
                </ul>
              </div>
              <div className="token-col">
                <h3>Refresh Token</h3>
                <ul>
                  <li>Живёт 7-30 дней</li>
                  <li>Только для обновления access token</li>
                  <li>HttpOnly cookie (не доступен из JS)</li>
                  <li>Можно отозвать на сервере</li>
                </ul>
              </div>
            </div>

            <div className="code-block">
              <pre>{`// Типичный refresh flow
async function fetchWithAuth(url, options) {
  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': \`Bearer \${accessToken}\`
    }
  });
  
  if (res.status === 401) {
    // Access token истёк
    const refreshRes = await fetch('/api/refresh', {
      method: 'POST',
      credentials: 'include' // отправит refresh cookie
    });
    
    if (refreshRes.ok) {
      const { accessToken: newToken } = await refreshRes.json();
      accessToken = newToken;
      // Повторяем запрос с новым токеном
      return fetch(url, { ...options, headers: { 'Authorization': \`Bearer \${newToken}\` }});
    }
    
    // Refresh тоже истёк — на логин
    logout();
  }
  
  return res;
}`}</pre>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'headers' && (
        <div className="tab-content">
          <div className="card">
            <h2>📋 Authorization Header</h2>
            
            <div className="auth-schemes">
              <div className="scheme">
                <h4>Bearer Token (JWT, OAuth)</h4>
                <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIs...</code>
                <p>Самый распространённый способ для API</p>
              </div>
              
              <div className="scheme">
                <h4>Basic Auth</h4>
                <code>Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=</code>
                <p>Base64(username:password) — только через HTTPS!</p>
              </div>
              
              <div className="scheme">
                <h4>API Key (в header)</h4>
                <code>X-API-Key: sk-1234567890abcdef</code>
                <p>или <code>Authorization: ApiKey sk-...</code></p>
              </div>
              
              <div className="scheme">
                <h4>Digest Auth</h4>
                <code>Authorization: Digest username="...", realm="...", nonce="..."</code>
                <p>Редко используется, безопаснее Basic</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>🍪 Cookie Flags</h2>
            
            <div className="cookie-flags">
              <div className="flag">
                <code>HttpOnly</code>
                <p>Недоступен из JavaScript — защита от XSS</p>
                <span className="flag-must">🔒 Обязательно для auth cookies!</span>
              </div>
              
              <div className="flag">
                <code>Secure</code>
                <p>Только через HTTPS</p>
                <span className="flag-must">🔒 Обязательно в production!</span>
              </div>
              
              <div className="flag">
                <code>SameSite=Strict</code>
                <p>Cookie не отправляется с cross-site запросами</p>
                <span className="flag-use">🛡️ Защита от CSRF</span>
              </div>
              
              <div className="flag">
                <code>SameSite=Lax</code>
                <p>Отправляется только с GET при переходе</p>
                <span className="flag-use">⚖️ Баланс безопасности и UX</span>
              </div>
              
              <div className="flag">
                <code>SameSite=None; Secure</code>
                <p>Отправляется всегда (нужен для cross-site)</p>
                <span className="flag-warn">⚠️ Только если реально нужно</span>
              </div>
              
              <div className="flag">
                <code>Max-Age / Expires</code>
                <p>Время жизни cookie</p>
              </div>
              
              <div className="flag">
                <code>Domain / Path</code>
                <p>Область действия cookie</p>
              </div>
            </div>
            
            <div className="code-block">
              <pre>{`// Идеальный auth cookie
Set-Cookie: refreshToken=abc123; 
  HttpOnly; 
  Secure; 
  SameSite=Strict; 
  Path=/api/refresh;
  Max-Age=604800`}</pre>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'best' && (
        <div className="tab-content">
          <div className="card">
            <h2>✨ Best Practices</h2>
            
            <div className="best-practices">
              <div className="practice do">
                <h4>✅ DO</h4>
                <ul>
                  <li>Всегда HTTPS в production</li>
                  <li>HttpOnly cookies для refresh tokens</li>
                  <li>Короткое время жизни access token (15-30 мин)</li>
                  <li>Валидируй все claims в JWT (exp, iss, aud)</li>
                  <li>Используй strong secrets (256+ бит)</li>
                  <li>Rate limiting на login endpoint</li>
                  <li>Логируй попытки входа</li>
                  <li>Хешируй пароли (bcrypt, argon2)</li>
                </ul>
              </div>
              
              <div className="practice dont">
                <h4>❌ DON'T</h4>
                <ul>
                  <li>Не храни JWT в localStorage (XSS)</li>
                  <li>Не храни чувствительные данные в JWT payload</li>
                  <li>Не используй alg: none</li>
                  <li>Не передавай токены в URL (?token=...)</li>
                  <li>Не доверяй данным из JWT без проверки подписи</li>
                  <li>Не используй один secret для всех environments</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>🛡️ Защита от атак</h2>
            
            <div className="attacks-grid">
              <div className="attack">
                <h4>XSS (Cross-Site Scripting)</h4>
                <p className="attack-desc">Внедрение вредоносного JS кода</p>
                <div className="protection">
                  <strong>Защита:</strong>
                  <ul>
                    <li>HttpOnly cookies</li>
                    <li>Content Security Policy (CSP)</li>
                    <li>Экранирование user input</li>
                  </ul>
                </div>
              </div>
              
              <div className="attack">
                <h4>CSRF (Cross-Site Request Forgery)</h4>
                <p className="attack-desc">Подделка запросов от имени пользователя</p>
                <div className="protection">
                  <strong>Защита:</strong>
                  <ul>
                    <li>SameSite cookies</li>
                    <li>CSRF tokens</li>
                    <li>Проверка Origin/Referer</li>
                  </ul>
                </div>
              </div>
              
              <div className="attack">
                <h4>Брутфорс</h4>
                <p className="attack-desc">Перебор паролей</p>
                <div className="protection">
                  <strong>Защита:</strong>
                  <ul>
                    <li>Rate limiting</li>
                    <li>Account lockout</li>
                    <li>CAPTCHA</li>
                    <li>2FA</li>
                  </ul>
                </div>
              </div>
              
              <div className="attack">
                <h4>Token Theft</h4>
                <p className="attack-desc">Кража токена</p>
                <div className="protection">
                  <strong>Защита:</strong>
                  <ul>
                    <li>Короткое время жизни</li>
                    <li>Token rotation</li>
                    <li>Fingerprinting</li>
                    <li>Аномальная активность</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>🔧 Чеклист безопасности API</h2>
            
            <div className="checklist">
              <label><input type="checkbox" /> HTTPS везде</label>
              <label><input type="checkbox" /> Helmet.js (security headers)</label>
              <label><input type="checkbox" /> Rate limiting</label>
              <label><input type="checkbox" /> Input validation</label>
              <label><input type="checkbox" /> Prepared statements (SQL injection)</label>
              <label><input type="checkbox" /> CORS настроен правильно</label>
              <label><input type="checkbox" /> Логирование security events</label>
              <label><input type="checkbox" /> Регулярный audit dependencies</label>
              <label><input type="checkbox" /> Error messages не раскрывают детали</label>
              <label><input type="checkbox" /> Секреты в env variables, не в коде</label>
            </div>
          </div>
        </div>
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
          font-size: 1rem;
          transition: all 0.2s;
        }
        .tab:hover {
          background: var(--bg-hover);
        }
        .tab.active {
          background: var(--accent);
          color: white;
        }
        .methods-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .method-card {
          padding: 20px;
          background: var(--bg-secondary);
          border-radius: 12px;
          border-left: 4px solid var(--accent);
        }
        .method-card h3 {
          margin: 0 0 8px;
        }
        .method-desc {
          color: var(--text-secondary);
          font-size: 0.9em;
          margin-bottom: 16px;
        }
        .pros-cons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          font-size: 0.85em;
        }
        .pros-cons ul {
          margin: 8px 0 0;
          padding-left: 20px;
        }
        .pros-cons li {
          margin-bottom: 4px;
        }
        .use-case {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
          font-size: 0.9em;
        }
        .flow-diagram {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .flow-step {
          width: 100%;
          max-width: 500px;
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
          text-align: center;
        }
        .flow-step code {
          display: block;
          margin: 4px 0;
        }
        .step-label {
          font-weight: bold;
          color: var(--accent);
        }
        .flow-arrow {
          font-size: 1.5em;
          color: var(--text-secondary);
        }
        .jwt-demo {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          flex-wrap: wrap;
        }
        .jwt-part {
          flex: 1;
          min-width: 200px;
        }
        .jwt-part h4 {
          margin: 0 0 8px;
        }
        .jwt-input {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-secondary);
          color: var(--text);
          font-family: monospace;
          font-size: 0.85em;
          resize: vertical;
        }
        .jwt-encoded {
          display: block;
          margin-top: 8px;
          font-size: 0.75em;
          word-break: break-all;
        }
        .jwt-separator {
          font-size: 2em;
          font-weight: bold;
          color: var(--text-secondary);
          align-self: center;
          margin-top: 40px;
        }
        .signature-info {
          padding: 12px;
          background: var(--bg-code);
          border-radius: 8px;
          font-family: monospace;
          font-size: 0.85em;
        }
        .signature-info code {
          display: block;
        }
        .note {
          color: var(--warning);
          font-size: 0.85em;
          margin-top: 8px;
        }
        .claims-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }
        .claim {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .claim code {
          color: var(--accent);
          font-weight: bold;
        }
        .claim span {
          font-size: 0.85em;
          color: var(--text-secondary);
        }
        .tokens-comparison {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }
        .token-col {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .token-col h3 {
          margin-top: 0;
        }
        .token-col ul {
          margin: 0;
          padding-left: 20px;
        }
        .auth-schemes {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .scheme {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .scheme h4 {
          margin: 0 0 8px;
        }
        .scheme code {
          display: block;
          padding: 8px;
          background: var(--bg-code);
          border-radius: 4px;
          margin-bottom: 8px;
          font-size: 0.85em;
        }
        .scheme p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9em;
        }
        .cookie-flags {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }
        .flag {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .flag code {
          font-size: 1.1em;
          color: var(--accent);
          font-weight: bold;
        }
        .flag p {
          margin: 8px 0;
          font-size: 0.9em;
        }
        .flag-must {
          color: var(--success);
          font-size: 0.85em;
        }
        .flag-use {
          color: var(--info);
          font-size: 0.85em;
        }
        .flag-warn {
          color: var(--warning);
          font-size: 0.85em;
        }
        .best-practices {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .practice {
          padding: 20px;
          border-radius: 12px;
        }
        .practice.do {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .practice.dont {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .practice h4 {
          margin: 0 0 12px;
        }
        .practice ul {
          margin: 0;
          padding-left: 20px;
        }
        .practice li {
          margin-bottom: 8px;
        }
        .attacks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .attack {
          padding: 20px;
          background: var(--bg-secondary);
          border-radius: 12px;
          border-left: 4px solid var(--error);
        }
        .attack h4 {
          margin: 0 0 8px;
          color: var(--error);
        }
        .attack-desc {
          color: var(--text-secondary);
          font-size: 0.9em;
          margin-bottom: 12px;
        }
        .protection {
          padding: 12px;
          background: var(--bg-code);
          border-radius: 8px;
        }
        .protection ul {
          margin: 8px 0 0;
          padding-left: 20px;
          font-size: 0.9em;
        }
        .checklist {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 12px;
        }
        .checklist label {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: 8px;
          cursor: pointer;
        }
        .checklist input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
