import { useState } from 'react'

const webChecklist = [
  {
    category: 'Формы', icon: '📝',
    checks: [
      { check: 'Пустые обязательные поля → валидация', status: '' },
      { check: 'Граничные значения длины (min/max)', status: '' },
      { check: 'SQL injection: \' OR 1=1 --', status: '' },
      { check: 'XSS: <script>alert(1)</script>', status: '' },
      { check: 'Email формат: missing @, missing domain', status: '' },
      { check: 'Copy-paste в пароль', status: '' },
      { check: 'Tab-навигация по полям', status: '' },
    ],
  },
  {
    category: 'Кросс-браузер', icon: '🖥️',
    checks: [
      { check: 'Chrome (последняя версия)', status: '' },
      { check: 'Firefox (последняя версия)', status: '' },
      { check: 'Safari (macOS / iOS)', status: '' },
      { check: 'Edge', status: '' },
      { check: 'Mobile Chrome (Android)', status: '' },
      { check: 'Mobile Safari (iOS)', status: '' },
    ],
  },
  {
    category: 'Responsive', icon: '📱',
    checks: [
      { check: 'Desktop (1920px)', status: '' },
      { check: 'Laptop (1366px)', status: '' },
      { check: 'Tablet (768px)', status: '' },
      { check: 'Mobile (375px)', status: '' },
      { check: 'Landscape orientation', status: '' },
      { check: 'Zoom 200%', status: '' },
    ],
  },
  {
    category: 'Accessibility', icon: '♿',
    checks: [
      { check: 'Alt у всех изображений', status: '' },
      { check: 'Контрастность текста (WCAG AA)', status: '' },
      { check: 'Клавиатурная навигация', status: '' },
      { check: 'Screen reader совместимость', status: '' },
      { check: 'Focus visible на интерактивных элементах', status: '' },
    ],
  },
]

const httpCodes = [
  { code: 200, name: 'OK', desc: 'Успешный запрос', color: '#22c55e' },
  { code: 201, name: 'Created', desc: 'Ресурс создан (POST)', color: '#22c55e' },
  { code: 204, name: 'No Content', desc: 'Успех, но тело пустое (DELETE)', color: '#22c55e' },
  { code: 301, name: 'Moved Permanently', desc: 'Перманентный редирект', color: '#3b82f6' },
  { code: 302, name: 'Found', desc: 'Временный редирект', color: '#3b82f6' },
  { code: 400, name: 'Bad Request', desc: 'Невалидный запрос', color: '#f97316' },
  { code: 401, name: 'Unauthorized', desc: 'Не авторизован', color: '#f97316' },
  { code: 403, name: 'Forbidden', desc: 'Нет прав', color: '#f97316' },
  { code: 404, name: 'Not Found', desc: 'Ресурс не найден', color: '#f97316' },
  { code: 422, name: 'Unprocessable Entity', desc: 'Ошибка валидации', color: '#f97316' },
  { code: 429, name: 'Too Many Requests', desc: 'Rate limit', color: '#f97316' },
  { code: 500, name: 'Internal Server Error', desc: 'Ошибка сервера', color: '#ef4444' },
  { code: 502, name: 'Bad Gateway', desc: 'Прокси/балансировщик ошибка', color: '#ef4444' },
  { code: 503, name: 'Service Unavailable', desc: 'Сервис недоступен', color: '#ef4444' },
]

const consoleLogs = [
  { type: 'error', icon: '❌', desc: 'JavaScript ошибки в консоли', action: 'Проверить все страницы на ошибки' },
  { type: 'warning', icon: '⚠️', desc: 'Deprecated APIs, mixed content', action: 'Оценить влияние' },
  { type: 'network', icon: '🌐', desc: '404 для ресурсов (CSS, JS, images)', action: 'Исправить битые ссылки' },
  { type: 'security', icon: '🔒', desc: 'Mixed content, CORS ошибки', action: 'Перевести на HTTPS' },
]

export default function WebTesting() {
  const [tab, setTab] = useState<'checklist' | 'codes' | 'console'>('checklist')
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [expandedCategory, setExpandedCategory] = useState<string | null>(webChecklist[0]!.category)

  const toggleCheck = (key: string) => {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const totalChecks = webChecklist.reduce((s, c) => s + c.checks.length, 0)
  const checkedCount = checked.size

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🌐 Тестирование Web</h1>
        <p>Кросс-браузер, responsive, формы, accessibility и HTTP-коды.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Web-тестирование</strong> — комплексная проверка веб-приложения: от функциональности форм 
          до кросс-браузерной совместимости и accessibility. Веб отличается от десктопа и мобильных приложений 
          тем, что один продукт должен работать в десятках комбинаций: Chrome/Firefox/Safari × Windows/macOS/iOS/Android × 
          десктоп/планшет/телефон. Это создаёт комбинаторный взрыв, который нужно покрывать стратегически.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Ключевые области: <strong>Функциональность</strong> (формы, навигация, бизнес-логика), <strong>Юзабилити</strong> (понятный интерфейс, обратная связь), <strong>Responsive</strong> (адаптация под экраны), <strong>Accessibility</strong> (a11y — работа со screen reader, 
          клавиатурная навигация, контрастность), <strong>Безопасность</strong> (XSS, CSRF, injection), <strong>Производительность</strong> (Core Web Vitals: LCP, FID, CLS).
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>💡 DevTools — лучший друг QA</strong>: Вкладка Network покажет медленные запросы. Console — ошибки JS. 
            Application — cookies и localStorage. Lighthouse — аудит производительности и a11y. 
            Научитесь пользоваться DevTools — и вы найдёте в 3 раза больше багов.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {([['checklist', '✅ Чек-лист'], ['codes', '📡 HTTP-коды'], ['console', '🖥️ Консоль']] as const).map(([k, l]) => (
          <button key={k} className={`btn ${tab === k ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === 'checklist' && (
        <div className="card">
          <h3>✅ Чек-лист Web-тестирования</h3>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>
            {checkedCount}/{totalChecks} проверок пройдено ({totalChecks > 0 ? Math.round((checkedCount / totalChecks) * 100) : 0}%)
          </div>
          <div style={{ height: 4, borderRadius: 2, background: 'var(--border-color)', marginBottom: 16 }}>
            <div style={{
              height: '100%', borderRadius: 2, width: `${totalChecks > 0 ? (checkedCount / totalChecks) * 100 : 0}%`,
              background: 'var(--accent-main)', transition: 'width 0.3s',
            }} />
          </div>

          {webChecklist.map(cat => (
            <div key={cat.category} style={{ marginBottom: 12 }}>
              <div onClick={() => setExpandedCategory(expandedCategory === cat.category ? null : cat.category)}
                style={{
                  padding: '10px 14px', borderRadius: 8, cursor: 'pointer',
                  background: expandedCategory === cat.category ? 'var(--accent-main-alpha)' : 'var(--bg-code)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontWeight: 600,
                }}>
                <span>{cat.icon} {cat.category}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {cat.checks.filter(c => checked.has(`${cat.category}-${c.check}`)).length}/{cat.checks.length}
                </span>
              </div>

              {expandedCategory === cat.category && (
                <div style={{ paddingLeft: 12, marginTop: 4 }}>
                  {cat.checks.map(c => {
                    const key = `${cat.category}-${c.check}`
                    const isChecked = checked.has(key)
                    return (
                      <div key={key} onClick={() => toggleCheck(key)} style={{
                        padding: '6px 10px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 8,
                        fontSize: '0.85rem',
                        textDecoration: isChecked ? 'line-through' : 'none',
                        color: isChecked ? 'var(--text-muted)' : 'var(--text-primary)',
                      }}>
                        <span>{isChecked ? '✅' : '⬜'}</span>
                        <span>{c.check}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'codes' && (
        <div className="card">
          <h3>📡 HTTP Status Codes</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>
            Коды, которые должен знать каждый тестировщик.
          </p>
          <table className="data-table">
            <thead><tr><th>Код</th><th>Название</th><th>Описание</th></tr></thead>
            <tbody>
              {httpCodes.map(c => (
                <tr key={c.code}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 700, color: c.color }}>{c.code}</td>
                  <td><strong>{c.name}</strong></td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{c.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'console' && (
        <div className="card">
          <h3>🖥️ Что проверять в DevTools</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {consoleLogs.map(l => (
              <div key={l.type} style={{
                padding: '14px 16px', borderRadius: 8, background: 'var(--bg-code)',
                borderLeft: '3px solid var(--accent-main)',
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{l.icon} {l.type.toUpperCase()}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>{l.desc}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-main)', marginTop: 4 }}>🔧 {l.action}</div>
              </div>
            ))}
          </div>

          <div className="info-box" style={{ marginTop: 16 }}>
            <div className="info-box-content">
              <div className="info-box-title">🔑 DevTools горячие клавиши</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                {[
                  { key: 'F12', desc: 'Открыть DevTools' },
                  { key: 'Cmd+Shift+M', desc: 'Device Mode' },
                  { key: 'Cmd+Shift+C', desc: 'Inspect Element' },
                  { key: 'Cmd+Shift+J', desc: 'Console' },
                  { key: 'Cmd+Shift+E', desc: 'Network' },
                ].map(k => (
                  <div key={k.key} style={{ padding: '6px 10px', borderRadius: 6, background: 'var(--bg-code)', fontSize: '0.8rem' }}>
                    <code style={{ color: 'var(--accent-main)' }}>{k.key}</code> → {k.desc}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
