import { useState } from 'react'

const pyramidLayers = [
  {
    level: 'E2E', icon: '🏁', pct: 10, color: '#ef4444',
    desc: 'End-to-End тесты через UI. Медленные, хрупкие, дорогие.',
    tools: ['Playwright', 'Cypress', 'Selenium'],
    example: 'Полный flow: регистрация → логин → создание заказа → оплата',
    pros: ['Проверяют реальный user flow', 'Ловят интеграционные баги'],
    cons: ['Медленные (минуты)', 'Flaky (нестабильные)', 'Дорого поддерживать'],
    speed: '🐢', reliability: '⚠️', cost: '💰💰💰',
  },
  {
    level: 'Integration', icon: '🔗', pct: 20, color: '#f97316',
    desc: 'Проверяют взаимодействие компонентов: API, БД, сервисы.',
    tools: ['Supertest', 'REST Assured', 'TestContainers'],
    example: 'POST /api/users → проверить запись в БД → проверить email',
    pros: ['Ловят ошибки контрактов', 'Быстрее E2E'],
    cons: ['Нужна инфраструктура', 'Сложнее unit'],
    speed: '🐇', reliability: '✅', cost: '💰💰',
  },
  {
    level: 'Unit', icon: '🧩', pct: 70, color: '#22c55e',
    desc: 'Тестируют отдельные функции/методы. Быстрые, надёжные, дешёвые.',
    tools: ['Jest', 'Vitest', 'JUnit', 'pytest'],
    example: 'calculateTotal(items) → ожидаемая сумма с учётом скидок',
    pros: ['Очень быстрые (мс)', 'Стабильные', 'Помогают при рефакторинге'],
    cons: ['Не ловят интеграционные баги', 'Не тестируют UI'],
    speed: '🚀', reliability: '✅✅', cost: '💰',
  },
]

const antiPatterns = [
  { name: '🍦 Ice Cream Cone', desc: 'Перевёрнутая пирамида: много E2E, мало unit. Медленно и дорого.', fix: 'Добавить unit-тесты, сократить E2E до smoke.' },
  { name: '⏳ Hourglass', desc: 'Много E2E и Unit, но нет Integration. Баги на стыках.', fix: 'Добавить API/integration тесты.' },
  { name: '🏆 Trophy', desc: 'Альтернативный подход (Kent C. Dodds): Integration > Unit > E2E. Спорный.', fix: 'Зависит от проекта. Frontend — ближе к Trophy.' },
]

export default function TestPyramid() {
  const [selectedLayer, setSelectedLayer] = useState(2) // Unit by default
  const [showAnti, setShowAnti] = useState(false)

  const layer = pyramidLayers[selectedLayer]!

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔺 Пирамида тестирования</h1>
        <p>Unit → Integration → E2E: баланс скорости, надёжности и стоимости.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Пирамида тестирования</strong> — концепция, предложенная Майком Коном (Mike Cohn) в книге 
          «Succeeding with Agile». Суть: большинство тестов должны быть быстрыми и дешёвыми unit-тестами (основание пирамиды). 
          Меньшая часть — интеграционные (середина). И совсем немного — медленных, дорогих E2E-тестов (вершина).
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Типичное соотношение: <strong>70% unit / 20% integration / 10% E2E</strong>. Почему не наоборот? 
          Unit-тест выполняется за миллисекунды, ловит баг в конкретной функции и никогда не «флакнёт» из-за сети. 
          E2E-тест запускает браузер, ходит в БД, зависит от 10 сервисов — он хрупкий и медленный. 
          «Перевёрнутая пирамида» (ice cream cone) — анти-паттерн: много E2E, мало unit → медленный CI, flaky-тесты, боль.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>💡 Testing Trophy</strong>: Кент Доддс предложил альтернативу — «Testing Trophy», где основу составляют 
            интеграционные тесты (не мокают всё подряд, а проверяют реальное взаимодействие модулей). 
            Обе модели верны: пирамида — для бэкенда, трофей — для фронтенда, где unit-тесты часто малоинформативны.
          </div>
        </div>
      </div>

      {/* Interactive Pyramid */}
      <div className="card">
        <h3>🔺 Пирамида</h3>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, marginBottom: 20 }}>
          {pyramidLayers.map((l, i) => (
            <div key={l.level} onClick={() => setSelectedLayer(i)} style={{
              width: `${30 + i * 25}%`, padding: '16px 0', textAlign: 'center',
              background: selectedLayer === i ? l.color : `${l.color}33`,
              color: selectedLayer === i ? '#fff' : 'var(--text-primary)',
              borderRadius: i === 0 ? '10px 10px 0 0' : i === 2 ? '0 0 10px 10px' : 0,
              cursor: 'pointer', transition: 'all 0.2s',
              fontWeight: 700,
            }}>
              <div>{l.icon} {l.level}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 400, opacity: 0.8 }}>~{l.pct}% тестов</div>
            </div>
          ))}
        </div>

        {/* Selected layer details */}
        <div style={{ padding: 16, borderRadius: 8, background: 'var(--bg-code)', border: `2px solid ${layer.color}` }}>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 8, color: layer.color }}>
            {layer.icon} {layer.level} тесты
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>{layer.desc}</p>

          <div className="grid-3" style={{ marginBottom: 12 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem' }}>{layer.speed}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Скорость</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem' }}>{layer.reliability}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Стабильность</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem' }}>{layer.cost}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Стоимость</div>
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', padding: '8px 12px', borderRadius: 6, background: 'var(--accent-main-alpha)', marginBottom: 12 }}>
            💡 <strong>Пример:</strong> {layer.example}
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
            {layer.tools.map(t => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>

          <div className="grid-2">
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#22c55e', marginBottom: 4 }}>✅ Плюсы</div>
              {layer.pros.map(p => (
                <div key={p} style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', paddingLeft: 8 }}>• {p}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ef4444', marginBottom: 4 }}>❌ Минусы</div>
              {layer.cons.map(c => (
                <div key={c} style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', paddingLeft: 8 }}>• {c}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Anti-patterns */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ marginBottom: 0 }}>⚠️ Анти-паттерны</h3>
          <button className="btn btn-secondary" onClick={() => setShowAnti(!showAnti)}>
            {showAnti ? 'Скрыть' : 'Показать'}
          </button>
        </div>

        {showAnti && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {antiPatterns.map(a => (
              <div key={a.name} style={{
                padding: '14px 16px', borderRadius: 8, background: 'var(--bg-code)',
                borderLeft: '3px solid var(--accent-main)',
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>{a.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 4 }}>{a.desc}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-main)' }}>🔧 {a.fix}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
