import { useState } from 'react'

const mobileChecklist = [
  { category: 'Установка и запуск', checks: ['Установка из Store / TestFlight / APK', 'Первый запуск: онбординг, разрешения', 'Обновление версии (миграция данных)', 'Удаление и переустановка'] },
  { category: 'UI / UX', checks: ['Портрет и ландшафт', 'Разные размеры экранов', 'Тёмная тема', 'Accessibility: VoiceOver / TalkBack', 'Шрифт: системный увеличенный размер'] },
  { category: 'Сеть', checks: ['Стабильный Wi-Fi', 'Мобильная сеть (3G/4G/5G)', 'Потеря соединения (airplane mode)', 'Переключение Wi-Fi ↔ сотовая', 'Медленная сеть (throttling)'] },
  { category: 'Прерывания', checks: ['Входящий звонок', 'Push-уведомление', 'Сворачивание / возврат (background)', 'Split-screen / multitasking', 'Низкий заряд батареи'] },
  { category: 'Данные', checks: ['Мало памяти на устройстве', 'Кэш: очистка, переполнение', 'Передача данных между экранами', 'Deep links / Universal links', 'Офлайн-режим: кэш, синхронизация'] },
]

const securityTests = [
  {
    name: 'OWASP Top 10 (Web)',
    icon: '🔐',
    tests: [
      { vuln: 'Injection (SQL, XSS, Command)', check: 'Ввести: \' OR 1=1 --, <script>alert(1)</script>, ; ls', tool: 'Burp Suite, sqlmap' },
      { vuln: 'Broken Authentication', check: 'Brute-force логин, слабые пароли, session fixation', tool: 'Hydra, Burp Intruder' },
      { vuln: 'Broken Access Control', check: 'IDOR: /api/users/123 → /api/users/124 (чужие данные)', tool: 'Burp, ручные запросы' },
      { vuln: 'Security Misconfiguration', check: 'Дефолтные креды, открытые порты, verbose errors', tool: 'Nmap, Nikto' },
      { vuln: 'SSRF', check: 'URL input → подставить http://localhost, metadata API', tool: 'Burp Collaborator' },
    ],
  },
  {
    name: 'API Security',
    icon: '🔌',
    tests: [
      { vuln: 'Отсутствие авторизации', check: 'Запрос без токена → должен быть 401/403', tool: 'Postman, curl' },
      { vuln: 'Mass Assignment', check: 'POST/PUT с дополнительными полями (role: admin)', tool: 'Postman' },
      { vuln: 'Rate Limiting', check: '1000 запросов/сек → должен быть 429', tool: 'ab, wrk, Locust' },
      { vuln: 'Sensitive Data Exposure', check: 'Пароли в логах? Токены в URL? PII в ответах?', tool: 'grep по логам' },
    ],
  },
]

const perfMetrics = [
  { metric: 'Response Time (P50, P95, P99)', desc: 'Время ответа. P95 важнее среднего', target: 'P95 < 500ms для API', tool: 'k6, JMeter, Locust' },
  { metric: 'Throughput (RPS)', desc: 'Запросов в секунду', target: 'Зависит от SLA', tool: 'k6, wrk, ab' },
  { metric: 'Error Rate', desc: '% ошибок (5xx) под нагрузкой', target: '< 0.1% при нормальной нагрузке', tool: 'Grafana, k6' },
  { metric: 'LCP (Largest Contentful Paint)', desc: 'Когда основной контент видим', target: '< 2.5s', tool: 'Lighthouse, WebPageTest' },
  { metric: 'FID / INP', desc: 'Отзывчивость на ввод', target: 'INP < 200ms', tool: 'Chrome DevTools, CrUX' },
  { metric: 'CLS (Cumulative Layout Shift)', desc: 'Стабильность макета', target: '< 0.1', tool: 'Lighthouse' },
  { metric: 'TTFB (Time to First Byte)', desc: 'Время до первого байта', target: '< 800ms', tool: 'curl, WebPageTest' },
  { metric: 'Memory / CPU usage', desc: 'Потребление ресурсов под нагрузкой', target: 'Нет утечек за 24ч', tool: 'Grafana, top, Activity Monitor' },
]

const perfTestTypes = [
  { type: 'Load Testing', desc: 'Ожидаемая нагрузка. Проверяем SLA', example: '100 concurrent users, 30 мин', icon: '📈' },
  { type: 'Stress Testing', desc: 'Выше ожидаемой. Находим точку отказа', example: 'Линейный рост до 500 users, пока не упадёт', icon: '💥' },
  { type: 'Spike Testing', desc: 'Резкий скачок нагрузки', example: '10 → 200 users мгновенно, потом обратно', icon: '⚡' },
  { type: 'Soak Testing', desc: 'Длительная нагрузка. Ищем утечки', example: '50 users, 24 часа непрерывно', icon: '🕐' },
  { type: 'Capacity Testing', desc: 'Максимум при допустимом SLA', example: 'Увеличиваем пока P95 < 500ms', icon: '📊' },
]

export default function SpecializedTesting() {
  const [tab, setTab] = useState<'mobile' | 'security' | 'performance'>('mobile')
  const [secSection, setSecSection] = useState(0)

  const sec = securityTests[secSection]!

  return (
    <div className="demo-container">
      <h1>🎯 Специализированное тестирование</h1>
      <p>Мобильное, security и performance тестирование — три домена, без которых QA-инженер не полон. Когда каждый нужен и какие инструменты использовать.</p>

      <div style={{ display: 'flex', gap: 8, margin: '24px 0', flexWrap: 'wrap' }}>
        {([
          ['mobile', '📱 Mobile Testing'],
          ['security', '🔐 Security Testing'],
          ['performance', '⚡ Performance Testing'],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: tab === key ? '2px solid var(--accent)' : '1px solid var(--border)',
              background: tab === key ? 'var(--accent)' : 'var(--card-bg)',
              color: tab === key ? '#fff' : 'var(--text)',
              cursor: 'pointer',
              fontWeight: tab === key ? 600 : 400,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Mobile ── */}
      {tab === 'mobile' && (
        <>
          <section className="card">
            <h2>📱 Мобильное тестирование</h2>
            <p style={{ marginBottom: 16 }}>
              Мобильные приложения — особая среда: прерывания, разные OS, сеть, жесты, разрешения.
              Недостаточно «проверить на одном iPhone».
            </p>

            <h3>Когда нужно</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
              {[
                { when: 'Нативное приложение', why: 'iOS + Android = 2× тестирование' },
                { when: 'PWA / Hybrid', why: 'WebView + device API = особые баги' },
                { when: 'Responsive Web', why: 'Тач, viewport, жесты' },
                { when: 'IoT / Wearables', why: 'Bluetooth, маленький экран, ограничения' },
              ].map(item => (
                <div key={item.when} style={{ padding: 12, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.when}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{item.why}</div>
                </div>
              ))}
            </div>

            <h3>Чек-лист мобильного тестирования</h3>
            {mobileChecklist.map(cat => (
              <div key={cat.category} style={{ marginBottom: 16 }}>
                <h4 style={{ margin: '0 0 8px' }}>{cat.category}</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 6 }}>
                  {cat.checks.map((check, i) => (
                    <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 6, fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input type="checkbox" />
                      {check}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="card">
            <h2>🛠️ Инструменты мобильного QA</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Задача</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>iOS</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Android</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Кроссплатформа</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Эмуляция', 'Xcode Simulator', 'Android Emulator (AVD)', 'BrowserStack, Sauce Labs'],
                    ['UI-автотесты', 'XCUITest', 'Espresso, UI Automator', 'Appium, Detox, Maestro'],
                    ['Снифферинг', 'Charles Proxy', 'Charles, mitmproxy', 'Proxyman'],
                    ['Crash-логи', 'Xcode Organizer', 'Logcat', 'Firebase Crashlytics, Sentry'],
                    ['Профилирование', 'Instruments', 'Android Profiler', 'Firebase Performance'],
                    ['Скриншоты', 'Snapshot tests (Swift)', 'Screenshot tests', 'Applitools'],
                  ].map(([task, ios, android, cross]) => (
                    <tr key={task}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{task}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{ios}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{android}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{cross}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* ── Security ── */}
      {tab === 'security' && (
        <>
          <section className="card">
            <h2>🔐 Security Testing</h2>
            <p style={{ marginBottom: 16 }}>
              Безопасность — не только задача InfoSec. QA проверяет базовые уязвимости на каждом релизе.
              OWASP Top 10 — минимальный чек-лист.
            </p>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {securityTests.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setSecSection(i)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: secSection === i ? '2px solid var(--accent)' : '1px solid var(--border)',
                    background: secSection === i ? 'var(--accent)' : 'var(--card-bg)',
                    color: secSection === i ? '#fff' : 'var(--text)',
                    cursor: 'pointer',
                  }}
                >
                  {s.icon} {s.name}
                </button>
              ))}
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Уязвимость</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Как проверить</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Инструмент</th>
                  </tr>
                </thead>
                <tbody>
                  {sec.tests.map((t, i) => (
                    <tr key={i}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{t.vuln}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem', fontFamily: 'monospace' }}>{t.check}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{t.tool}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>🛡️ Когда нужно security testing</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
              {[
                { when: 'Персональные данные', example: 'Регистрация, профиль, платежи → GDPR/152-ФЗ', priority: 'Обязательно' },
                { when: 'Внешние API / интеграции', example: 'OAuth, webhook, 3rd party SDK', priority: 'Обязательно' },
                { when: 'Формы пользовательского ввода', example: 'Поиск, комменты, загрузка файлов', priority: 'Высокий' },
                { when: 'Админ-панель', example: 'Управление пользователями, конфигурация', priority: 'Критический' },
                { when: 'Публичный API', example: 'REST/GraphQL без UI-прослойки', priority: 'Обязательно' },
                { when: 'Внутренний сервис', example: 'Микросервис в закрытой сети', priority: 'Базовый' },
              ].map(item => (
                <div key={item.when} style={{ padding: 12, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontWeight: 600 }}>{item.when}</span>
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 4, background: item.priority === 'Критический' ? '#ef4444' : item.priority === 'Обязательно' ? '#f59e0b' : '#3b82f6', color: '#fff' }}>
                      {item.priority}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{item.example}</div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── Performance ── */}
      {tab === 'performance' && (
        <>
          <section className="card">
            <h2>⚡ Performance Testing</h2>
            <p style={{ marginBottom: 16 }}>
              «Работает на моём ноутбуке» — не performance тест. Нагрузочное тестирование показывает, как система ведёт себя под реальной нагрузкой.
            </p>

            <h3>Типы нагрузочных тестов</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
              {perfTestTypes.map(t => (
                <div key={t.type} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem' }}>{t.icon}</div>
                  <h4 style={{ margin: '8px 0 4px' }}>{t.type}</h4>
                  <p style={{ margin: '0 0 8px', fontSize: '0.8rem' }}>{t.desc}</p>
                  <div style={{ fontSize: '0.75rem', padding: '4px 8px', background: 'var(--bg)', borderRadius: 4, fontFamily: 'monospace' }}>{t.example}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>📊 Ключевые метрики</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Метрика</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Что измеряет</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Target</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Инструмент</th>
                  </tr>
                </thead>
                <tbody>
                  {perfMetrics.map(m => (
                    <tr key={m.metric}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.85rem' }}>{m.metric}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{m.desc}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem', fontFamily: 'monospace' }}>{m.target}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{m.tool}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>🛠️ Инструменты нагрузочного тестирования</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
              {[
                { name: 'k6 (Grafana)', lang: 'JavaScript', pros: 'Код как тесты, CLI, CI-friendly, отличные отчёты', when: 'API load testing' },
                { name: 'JMeter', lang: 'GUI + Java', pros: 'Мощный, плагины, протоколы (HTTP, JDBC, MQTT)', when: 'Сложные сценарии, legacy' },
                { name: 'Locust', lang: 'Python', pros: 'Простой, pythonic, distributed', when: 'Быстрое прототипирование' },
                { name: 'Lighthouse', lang: 'CLI / Chrome', pros: 'Web Vitals, accessibility, SEO в одном', when: 'Frontend performance' },
                { name: 'wrk / ab', lang: 'CLI', pros: 'Минималистичный, быстрый', when: 'Быстрая проверка throughput' },
                { name: 'Gatling', lang: 'Scala / Java', pros: 'Красивые отчёты, высокая нагрузка', when: 'Enterprise, Java-экосистема' },
              ].map(tool => (
                <div key={tool.name} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <h4 style={{ margin: '0 0 4px' }}>{tool.name}</h4>
                  <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: 8 }}>{tool.lang} • {tool.when}</div>
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>{tool.pros}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── Interview ── */}
      <section className="card">
        <h2>❓ Вопросы на собесе</h2>
        <div className="interview-item"><div className="q">Как вы тестируете мобильные приложения?</div><div className="a">Чек-лист: установка, UI (портрет/ландшафт/тёмная тема), сеть (потеря, переключение), прерывания (звонок, push, background), данные (офлайн, кэш, deep links). Использую реальные устройства + эмуляторы. Для автоматизации: Appium или Maestro. Crash-логи через Firebase Crashlytics.</div></div>
        <div className="interview-item"><div className="q">Какие базовые security-тесты вы проводите?</div><div className="a">OWASP Top 10 как минимум: Injection (SQL, XSS), IDOR (подмена ID в URL), авторизация (запрос без токена), SSRF. Инструменты: Burp Suite для перехвата, sqlmap для SQL injection. На каждый релиз проверяю формы ввода и API endpoints. Для серьёзного аудита — привлекаю InfoSec команду.</div></div>
        <div className="interview-item"><div className="q">Как организуете performance testing?</div><div className="a">Сначала определяю SLA (P95 &lt; 500ms, error rate &lt; 0.1%). Затем: load test (ожидаемая нагрузка), stress test (точка отказа), soak test (утечки за 24ч). Инструмент — k6 (JavaScript, CI-friendly). Ключевые метрики: response time (P50/P95/P99), throughput (RPS), error rate. Для фронта: Core Web Vitals через Lighthouse.</div></div>
      </section>
    </div>
  )
}
