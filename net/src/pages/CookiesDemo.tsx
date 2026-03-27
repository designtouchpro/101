import { useState } from 'react'

interface CookieParam {
  name: string
  values: string
  description: string
  example: string
  important: boolean
}

const cookieParams: CookieParam[] = [
  {
    name: 'Name=Value',
    values: 'любые строки',
    description: 'Имя и значение куки. Имена регистрозависимые. Значения URL-кодируются.',
    example: 'sessionId=abc123',
    important: true
  },
  {
    name: 'Domain',
    values: '.example.com',
    description: 'Домен, на который отправляется кука. Если не указан — только текущий домен (без поддоменов). Если указан .example.com — будет отправляться и на sub.example.com.',
    example: 'Domain=.example.com',
    important: true
  },
  {
    name: 'Path',
    values: '/',
    description: 'URL-путь, для которого действует кука. Path=/ — все страницы. Path=/admin — только /admin и вложенные.',
    example: 'Path=/api',
    important: false
  },
  {
    name: 'Expires',
    values: 'дата GMT',
    description: 'Абсолютная дата истечения куки. После этой даты браузер удаляет куку. Формат: Thu, 01 Jan 2026 00:00:00 GMT',
    example: 'Expires=Thu, 01 Jan 2026 00:00:00 GMT',
    important: true
  },
  {
    name: 'Max-Age',
    values: 'секунды',
    description: 'Относительное время жизни в секундах. Имеет приоритет над Expires если указаны оба. Max-Age=0 — удалить куку. Max-Age=3600 — 1 час.',
    example: 'Max-Age=86400',
    important: true
  },
  {
    name: 'HttpOnly',
    values: 'флаг (без значения)',
    description: 'Запрещает доступ к куке через JavaScript (document.cookie). Защита от XSS-атак. ВСЕГДА ставить для сессионных кук!',
    example: 'HttpOnly',
    important: true
  },
  {
    name: 'Secure',
    values: 'флаг (без значения)',
    description: 'Кука отправляется только по HTTPS. На HTTP-сайтах кука не будет установлена. Обязательно для SameSite=None.',
    example: 'Secure',
    important: true
  },
  {
    name: 'SameSite',
    values: 'Strict | Lax | None',
    description: 'Контроль отправки куки при cross-origin запросах. Strict = только same-site. Lax = same-site + top-level навигация (GET). None = всегда (требует Secure).',
    example: 'SameSite=Lax',
    important: true
  },
]

const sameSiteComparison = [
  { scenario: 'Ссылка с другого сайта (GET)', strict: '❌', lax: '✅', none: '✅' },
  { scenario: 'Форма POST с другого сайта', strict: '❌', lax: '❌', none: '✅' },
  { scenario: 'Форма GET с другого сайта', strict: '❌', lax: '✅', none: '✅' },
  { scenario: 'fetch/XMLHttpRequest cross-origin', strict: '❌', lax: '❌', none: '✅' },
  { scenario: 'iframe с другого сайта', strict: '❌', lax: '❌', none: '✅' },
  { scenario: 'Навигация на том же сайте', strict: '✅', lax: '✅', none: '✅' },
]

export default function CookiesDemo() {
  const [activeTab, setActiveTab] = useState<'params' | 'lifetime' | 'limits' | 'samesite' | 'interview'>('params')
  const [testCookieName, setTestCookieName] = useState('testCookie')
  const [testCookieValue, setTestCookieValue] = useState('hello')
  const [testMaxAge, setTestMaxAge] = useState('60')
  const [currentCookies, setCurrentCookies] = useState(document.cookie)

  const setCookie = () => {
    document.cookie = `${testCookieName}=${testCookieValue}; Max-Age=${testMaxAge}; Path=/; SameSite=Lax`
    setCurrentCookies(document.cookie)
  }

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; Max-Age=0; Path=/`
    setCurrentCookies(document.cookie)
  }

  const deleteAllCookies = () => {
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim()
      document.cookie = `${name}=; Max-Age=0; Path=/`
    })
    setCurrentCookies(document.cookie)
  }

  return (
    <div className="page-container">
      <h1>🍪 Cookies — Deep Dive</h1>
      <p className="page-description">
        Всё, что нужно знать про cookies для собеседования: параметры, время жизни, 
        лимиты, SameSite, подводные камни.
      </p>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: '24px' }}>
        {[
          { key: 'params', label: '⚙️ Параметры' },
          { key: 'lifetime', label: '⏰ Время жизни' },
          { key: 'limits', label: '📏 Лимиты' },
          { key: 'samesite', label: '🛡️ SameSite' },
          { key: 'interview', label: '🎯 Вопросы' },
        ].map(tab => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Параметры */}
      {activeTab === 'params' && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">📋 Все параметры Set-Cookie</span>
              <span className="card-badge">Важно знать!</span>
            </div>

            <div className="info-box">
              <strong>Формат заголовка:</strong>
              <pre style={{ margin: '8px 0', padding: '12px', background: 'var(--bg-code)', borderRadius: '6px', fontSize: '0.85rem' }}>
{`Set-Cookie: name=value; Domain=.example.com; Path=/; Max-Age=3600; HttpOnly; Secure; SameSite=Lax`}
              </pre>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              {cookieParams.map(param => (
                <div key={param.name} className={`param-card ${param.important ? 'param-important' : ''}`}>
                  <div className="param-card-header">
                    <code className="param-name">{param.name}</code>
                    {param.important && (
                      <span className="param-badge">⚡ Часто спрашивают</span>
                    )}
                  </div>
                  <div className="param-values-row">
                    <span className="param-values-label">Значения:</span>
                    {param.values.includes('|')
                      ? param.values.split('|').map(v => (
                          <span key={v.trim()} className="param-value-tag">{v.trim()}</span>
                        ))
                      : <span className="param-value-tag">{param.values}</span>
                    }
                  </div>
                  <p className="param-description">{param.description}</p>
                  <code className="param-example">💡 {param.example}</code>
                </div>
              ))}
            </div>
          </div>

          {/* Live Demo */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">🎮 Живая демо: document.cookie</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <h4>Установить куку</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  <input
                    className="input"
                    value={testCookieName}
                    onChange={e => setTestCookieName(e.target.value)}
                    placeholder="Имя"
                  />
                  <input
                    className="input"
                    value={testCookieValue}
                    onChange={e => setTestCookieValue(e.target.value)}
                    placeholder="Значение"
                  />
                  <input
                    className="input"
                    value={testMaxAge}
                    onChange={e => setTestMaxAge(e.target.value)}
                    placeholder="Max-Age (сек)"
                  />
                  <div className="controls">
                    <button className="btn btn-primary" onClick={setCookie}>
                      Set Cookie
                    </button>
                    <button className="btn btn-danger" onClick={deleteAllCookies}>
                      Удалить все
                    </button>
                  </div>
                </div>

                <div className="info-box warning" style={{ marginTop: '12px' }}>
                  <strong>⚠️ document.cookie</strong> — возвращает только name=value пары.
                  HttpOnly, Secure, Expires — НЕ видны из JS!
                </div>
              </div>

              <div>
                <h4>Текущие cookies</h4>
                <div style={{
                  marginTop: '8px',
                  padding: '16px',
                  background: 'var(--bg-code)',
                  borderRadius: '8px',
                  minHeight: '120px'
                }}>
                  {currentCookies ? currentCookies.split(';').map((cookie, i) => {
                    const [name] = cookie.trim().split('=')
                    return (
                      <div key={i} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '6px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.05)'
                      }}>
                        <code style={{ fontSize: '0.85rem' }}>{cookie.trim()}</code>
                        <button
                          className="btn btn-danger"
                          style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                          onClick={() => deleteCookie(name)}
                        >
                          ✕
                        </button>
                      </div>
                    )
                  }) : (
                    <span style={{ color: 'var(--text-muted)' }}>Нет cookies</span>
                  )}
                </div>
                <button 
                  className="btn btn-secondary" 
                  style={{ marginTop: '8px' }}
                  onClick={() => setCurrentCookies(document.cookie)}
                >
                  🔄 Обновить
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Время жизни */}
      {activeTab === 'lifetime' && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">⏰ Время жизни cookies</span>
              <span className="card-badge">Частый вопрос!</span>
            </div>

            <div className="info-box" style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <strong>🔥 Вопрос: Что будет если не указать Expires/Max-Age?</strong>
              <p style={{ marginTop: '8px' }}>
                Кука станет <strong>сессионной (session cookie)</strong> — она будет удалена, 
                когда пользователь закроет браузер (все окна/вкладки).
              </p>
              <p style={{ marginTop: '4px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                ⚠️ Но! Современные браузеры (Chrome, Edge) могут восстанавливать сессию при перезапуске, 
                и сессионные куки иногда переживают закрытие.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
              <div style={{ padding: '20px', background: 'var(--bg-code)', borderRadius: '8px' }}>
                <h4 style={{ color: 'var(--accent-green)', marginBottom: '12px' }}>
                  🟢 Session Cookie
                </h4>
                <pre style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
{`Set-Cookie: token=abc123
// Без Expires и Max-Age!

// Живёт до закрытия браузера
// Не пишется на диск
// Хранится только в памяти`}
                </pre>
              </div>

              <div style={{ padding: '20px', background: 'var(--bg-code)', borderRadius: '8px' }}>
                <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '12px' }}>
                  🔵 Persistent Cookie
                </h4>
                <pre style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
{`Set-Cookie: prefs=dark; Max-Age=31536000
// Или
Set-Cookie: prefs=dark; Expires=...

// Живёт до указанной даты
// Пишется на диск
// Переживает закрытие браузера`}
                </pre>
              </div>
            </div>

            <h4 style={{ marginTop: '20px' }}>Приоритет и удаление</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              {[
                { rule: 'Если указаны и Expires, и Max-Age → Max-Age побеждает', icon: '1️⃣' },
                { rule: 'Max-Age=0 → кука удаляется немедленно', icon: '2️⃣' },
                { rule: 'Expires в прошлом → кука удаляется', icon: '3️⃣' },
                { rule: 'Для удаления нужно указать тот же Domain + Path', icon: '4️⃣' },
                { rule: 'Нельзя удалить HttpOnly куку через document.cookie', icon: '5️⃣' },
              ].map((item, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  gap: '10px', 
                  padding: '10px 14px', 
                  background: 'var(--bg-code)', 
                  borderRadius: '6px' 
                }}>
                  <span>{item.icon}</span>
                  <span>{item.rule}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">🌐 Third-party cookies</span>
              <span className="card-badge">2024+ тренд</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <strong>Third-party cookie</strong> — кука, установленная доменом, отличным от текущего 
              (из iframe, img, script другого домена). Основной инструмент трекинга рекламы.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
              <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
                <h4 style={{ color: 'var(--accent-red)' }}>❌ Блокируются</h4>
                <ul className="info-list">
                  <li>Safari — уже блокирует по умолчанию (ITP)</li>
                  <li>Firefox — блокирует (ETP Strict)</li>
                  <li>Chrome — отказался от полного удаления в 2024, но ограничивает</li>
                </ul>
              </div>
              <div style={{ padding: '16px', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.15)' }}>
                <h4 style={{ color: 'var(--accent-green)' }}>✅ Альтернативы</h4>
                <ul className="info-list">
                  <li>First-party cookies + серверный трекинг</li>
                  <li>Privacy Sandbox (Chrome)</li>
                  <li>Storage Access API</li>
                  <li>CHIPS (Cookies Having Independent Partitioned State)</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Лимиты */}
      {activeTab === 'limits' && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">📏 Лимиты cookies</span>
              <span className="card-badge">Знать наизусть!</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ 
                textAlign: 'center', 
                padding: '24px', 
                background: 'var(--bg-code)', 
                borderRadius: '12px',
                border: '1px solid rgba(99, 102, 241, 0.2)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>4 KB</div>
                <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Размер одной куки</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                  Имя + Значение + Атрибуты
                </div>
              </div>

              <div style={{ 
                textAlign: 'center', 
                padding: '24px', 
                background: 'var(--bg-code)', 
                borderRadius: '12px',
                border: '1px solid rgba(99, 102, 241, 0.2)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-orange)' }}>~50</div>
                <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Кук на домен</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                  RFC 6265: минимум 50
                </div>
              </div>

              <div style={{ 
                textAlign: 'center', 
                padding: '24px', 
                background: 'var(--bg-code)', 
                borderRadius: '12px',
                border: '1px solid rgba(99, 102, 241, 0.2)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-green)' }}>~3000</div>
                <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Кук всего в браузере</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                  Зависит от браузера
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">⚖️ Сравнение хранилищ</span>
            </div>

            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 8px' }}>Хранилище</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px' }}>Размер</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px' }}>Отправка на сервер</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px' }}>Срок жизни</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px' }}>Доступ из JS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Cookie', '~4 KB', '✅ Автоматически', 'До Expires/Max-Age', '⚠️ Если нет HttpOnly'],
                  ['localStorage', '~5-10 MB', '❌ Нет', 'Навсегда', '✅ Да'],
                  ['sessionStorage', '~5-10 MB', '❌ Нет', 'До закрытия вкладки', '✅ Да'],
                  ['IndexedDB', '~50 MB+', '❌ Нет', 'Навсегда', '✅ Да'],
                ].map(([name, size, server, lifetime, js], i) => (
                  <tr key={i} style={{ 
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    background: i === 0 ? 'rgba(99, 102, 241, 0.03)' : 'transparent'
                  }}>
                    <td style={{ padding: '10px 8px', fontWeight: 600 }}>{name}</td>
                    <td style={{ padding: '10px 8px', color: 'var(--accent-cyan)' }}>{size}</td>
                    <td style={{ padding: '10px 8px' }}>{server}</td>
                    <td style={{ padding: '10px 8px', color: 'var(--text-secondary)' }}>{lifetime}</td>
                    <td style={{ padding: '10px 8px' }}>{js}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="info-box warning" style={{ marginTop: '16px' }}>
              <strong>💡 Ключевое отличие cookies</strong> — куки автоматически отправляются 
              с каждым HTTP-запросом к серверу! Поэтому не стоит хранить в них большие данные — 
              это замедляет КАЖДЫЙ запрос.
            </div>
          </div>
        </>
      )}

      {/* SameSite */}
      {activeTab === 'samesite' && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">🛡️ SameSite — защита от CSRF</span>
              <span className="card-badge">Сложная тема!</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              Атрибут SameSite контролирует, отправляется ли кука при cross-site запросах. 
              Это основная защита от CSRF-атак в современных браузерах.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { 
                  value: 'Strict', 
                  color: 'var(--accent-green)',
                  desc: 'Никогда не отправляется при cross-site. Даже при переходе по ссылке!',
                  use: 'Банковские и финансовые приложения' 
                },
                { 
                  value: 'Lax', 
                  color: 'var(--accent-orange)',
                  desc: 'Отправляется при top-level навигации GET. Не отправляется при POST, iframe, fetch.',
                  use: 'Значение по умолчанию в Chrome (с 2020)' 
                },
                { 
                  value: 'None', 
                  color: 'var(--accent-red)',
                  desc: 'Отправляется всегда. ТРЕБУЕТ Secure! Нужен для cross-site сценариев.',
                  use: 'Виджеты, SSO, рекламные трекеры' 
                },
              ].map(item => (
                <div key={item.value} style={{ 
                  padding: '20px', 
                  background: 'var(--bg-code)', 
                  borderRadius: '8px',
                  borderTop: `3px solid ${item.color}`
                }}>
                  <h4 style={{ color: item.color, marginBottom: '8px' }}>
                    SameSite={item.value}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>
                    {item.desc}
                  </p>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    📌 {item.use}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">📊 Матрица SameSite</span>
            </div>

            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 8px' }}>Сценарий</th>
                  <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--accent-green)' }}>Strict</th>
                  <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--accent-orange)' }}>Lax</th>
                  <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--accent-red)' }}>None</th>
                </tr>
              </thead>
              <tbody>
                {sameSiteComparison.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px 8px' }}>{row.scenario}</td>
                    <td style={{ textAlign: 'center', padding: '10px 8px' }}>{row.strict}</td>
                    <td style={{ textAlign: 'center', padding: '10px 8px' }}>{row.lax}</td>
                    <td style={{ textAlign: 'center', padding: '10px 8px' }}>{row.none}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="info-box" style={{ marginTop: '16px' }}>
              <strong>💡 Lax vs Strict — хитрый кейс:</strong>
              <p style={{ marginTop: '4px' }}>
                Если пользователь перешёл с Google на ваш сайт по ссылке, 
                кука с SameSite=Strict <strong>НЕ отправится</strong> при первом запросе! 
                Пользователь увидит сайт как неавторизованный. Поэтому для сессий лучше Lax.
              </p>
            </div>
          </div>
        </>
      )}

      {/* Вопросы для собеседования */}
      {activeTab === 'interview' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">🎯 Частые вопросы про cookies</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                q: 'Что будет, если не указать Expires и Max-Age?',
                a: 'Кука будет сессионной — удалится при закрытии браузера. Хранится только в памяти, не на диске.'
              },
              {
                q: 'Какой максимальный размер одной куки?',
                a: '~4 KB (4096 байт) — это имя + значение + все атрибуты. Если превысить — кука молча проигнорируется.'
              },
              {
                q: 'Сколько кук может быть на один домен?',
                a: 'По RFC 6265 — минимум 50 кук на домен. В реальности Chrome позволяет ~180, Firefox ~150.'
              },
              {
                q: 'Чем HttpOnly отличается от Secure?',
                a: 'HttpOnly — запрещает доступ через document.cookie (защита от XSS). Secure — отправлять только по HTTPS (защита от MITM). Это разные и взаимодополняющие защиты.'
              },
              {
                q: 'Что такое SameSite=Lax и почему это дефолт?',
                a: 'Lax отправляет куки только при top-level GET навигации (клик по ссылке). Не отправляет при POST, fetch, iframe. Это защита от CSRF без поломки обычной навигации. Дефолт в Chrome с 2020.'
              },
              {
                q: 'Можно ли поставить SameSite=None без Secure?',
                a: 'Нет! Браузер отклонит такую куку. SameSite=None требует обязательного Secure (HTTPS).'
              },
              {
                q: 'В чём разница между cookie и localStorage?',
                a: 'Cookies: ~4KB, отправляются с каждым HTTP-запросом, имеют Domain/Path/Expires. localStorage: ~5-10MB, не отправляется на сервер, живёт бессрочно, доступен только из JS.'
              },
              {
                q: 'Как удалить HttpOnly куку?',
                a: 'Только с сервера — установить Set-Cookie с Max-Age=0 или Expires в прошлом. Из JS (document.cookie) удалить нельзя — HttpOnly не даёт доступа.'
              },
              {
                q: 'Что такое third-party cookie?',
                a: 'Кука, установленная доменом, отличным от текущего (через iframe, img, script). Используется для трекинга. Safari и Firefox уже блокируют по умолчанию.'
              },
              {
                q: 'Кука с Domain=.example.com — попадёт ли на sub.example.com?',
                a: 'Да! Точка перед доменом включает все поддомены. Без Domain — только текущий домен, без поддоменов.'
              },
            ].map((item, i) => (
              <details key={i} className="interview-question">
                <summary style={{ 
                  cursor: 'pointer', 
                  padding: '14px 16px',
                  background: 'var(--bg-code)',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}>
                  {item.q}
                </summary>
                <div style={{ 
                  padding: '14px 16px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  borderLeft: '3px solid var(--accent-cyan)',
                  marginLeft: '16px',
                  marginTop: '8px'
                }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
