import { useState } from 'react'

const techniques = [
  {
    key: 'equivalence', name: 'Классы эквивалентности', icon: '📦',
    desc: 'Разбиваем входные данные на группы, где поведение одинаковое. Из каждого класса берём одно значение.',
    example: {
      task: 'Поле "Возраст" принимает значения 18-65',
      classes: [
        { range: '< 18', type: 'Невалидный', test: '15', color: '#ef4444' },
        { range: '18-65', type: 'Валидный', test: '30', color: '#22c55e' },
        { range: '> 65', type: 'Невалидный', test: '70', color: '#ef4444' },
      ],
    },
  },
  {
    key: 'boundary', name: 'Граничные значения', icon: '📏',
    desc: 'Тестируем значения на границах классов эквивалентности: на границе, до границы, после границы.',
    example: {
      task: 'Поле "Возраст" принимает значения 18-65',
      values: [
        { val: 17, expected: '❌ Невалидный', color: '#ef4444' },
        { val: 18, expected: '✅ Валидный (нижняя граница)', color: '#22c55e' },
        { val: 19, expected: '✅ Валидный', color: '#22c55e' },
        { val: 64, expected: '✅ Валидный', color: '#22c55e' },
        { val: 65, expected: '✅ Валидный (верхняя граница)', color: '#22c55e' },
        { val: 66, expected: '❌ Невалидный', color: '#ef4444' },
      ],
    },
  },
  {
    key: 'decision', name: 'Таблица решений', icon: '📊',
    desc: 'Комбинации условий и ожидаемых действий. Полезна когда бизнес-логика зависит от нескольких факторов.',
  },
  {
    key: 'pairwise', name: 'Pairwise (попарное)', icon: '🔀',
    desc: 'Вместо тестирования ВСЕХ комбинаций параметров, тестируем все ПАРЫ. Сокращает количество тестов в 5-10 раз.',
  },
  {
    key: 'state', name: 'Переходы состояний', icon: '🔄',
    desc: 'Моделируем объект как конечный автомат: состояния + переходы + события.',
  },
]

// Interactive pairwise demo
const pairwiseParams = {
  browser: ['Chrome', 'Firefox', 'Safari'],
  os: ['Windows', 'macOS', 'Linux'],
  language: ['RU', 'EN'],
}

function generatePairwise() {
  // Simplified pairwise covering all pairs
  return [
    { browser: 'Chrome', os: 'Windows', language: 'RU' },
    { browser: 'Chrome', os: 'macOS', language: 'EN' },
    { browser: 'Chrome', os: 'Linux', language: 'RU' },
    { browser: 'Firefox', os: 'Windows', language: 'EN' },
    { browser: 'Firefox', os: 'macOS', language: 'RU' },
    { browser: 'Firefox', os: 'Linux', language: 'EN' },
    { browser: 'Safari', os: 'Windows', language: 'RU' },
    { browser: 'Safari', os: 'macOS', language: 'EN' },
    { browser: 'Safari', os: 'Linux', language: 'EN' },
  ]
}

// Decision table demo
const decisionTable = {
  conditions: ['Зарегистрирован?', 'Подписка активна?', 'Триал доступен?'],
  rules: [
    { conditions: [true, true, false], action: 'Полный доступ' },
    { conditions: [true, false, true], action: 'Предложить триал' },
    { conditions: [true, false, false], action: 'Показать тарифы' },
    { conditions: [false, false, true], action: 'Регистрация + триал' },
    { conditions: [false, false, false], action: 'Регистрация' },
  ],
}

// State transitions demo
const orderStates = [
  { from: 'Создан', event: 'Оплата', to: 'Оплачен' },
  { from: 'Оплачен', event: 'Сборка', to: 'Собирается' },
  { from: 'Собирается', event: 'Отправка', to: 'Доставляется' },
  { from: 'Доставляется', event: 'Получен', to: 'Завершён' },
  { from: 'Создан', event: 'Отмена', to: 'Отменён' },
  { from: 'Оплачен', event: 'Отмена', to: 'Возврат' },
]

export default function TestDesign() {
  const [selectedTechnique, setSelectedTechnique] = useState(0)
  const [testValue, setTestValue] = useState('')
  const [testResult, setTestResult] = useState<string | null>(null)

  const checkBoundary = () => {
    const num = parseInt(testValue)
    if (isNaN(num)) { setTestResult('❓ Введите число'); return }
    if (num >= 18 && num <= 65) setTestResult(`✅ ${num} — валидное значение`)
    else setTestResult(`❌ ${num} — невалидное значение`)
  }

  const technique = techniques[selectedTechnique]!
  const pairwiseTests = generatePairwise()
  const fullComboCount = pairwiseParams.browser.length * pairwiseParams.os.length * pairwiseParams.language.length

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🎨 Тест-дизайн</h1>
        <p>Техники проектирования тестов: как написать минимум тестов с максимальным покрытием.</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {techniques.map((t, i) => (
          <button key={t.key} className={`btn ${selectedTechnique === i ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedTechnique(i)} style={{ fontSize: '0.8rem' }}>
            {t.icon} {t.name}
          </button>
        ))}
      </div>

      <div className="card">
        <h3>{technique.icon} {technique.name}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>{technique.desc}</p>

        {/* Equivalence classes */}
        {technique.key === 'equivalence' && technique.example && (
          <>
            <div className="info-box">
              <div className="info-box-content">
                <div className="info-box-title">Задача</div>
                {technique.example.task}
              </div>
            </div>
            <div className="grid-3">
              {technique.example.classes!.map(c => (
                <div key={c.range} style={{
                  padding: 16, borderRadius: 8, textAlign: 'center',
                  background: `${c.color}15`, border: `2px solid ${c.color}`,
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>{c.type}</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{c.range}</div>
                  <div style={{ fontSize: '0.8rem', marginTop: 4 }}>Тест: <strong>{c.test}</strong></div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Boundary values */}
        {technique.key === 'boundary' && technique.example && (
          <>
            <div className="info-box">
              <div className="info-box-content">
                <div className="info-box-title">Задача</div>
                {technique.example.task}
              </div>
            </div>
            <table className="data-table" style={{ marginBottom: 16 }}>
              <thead><tr><th>Значение</th><th>Ожидание</th></tr></thead>
              <tbody>
                {technique.example.values!.map(v => (
                  <tr key={v.val}>
                    <td style={{ fontWeight: 700, fontFamily: 'monospace' }}>{v.val}</td>
                    <td style={{ color: v.color }}>{v.expected}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Interactive check */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input className="input" placeholder="Введите возраст…" value={testValue}
                onChange={e => setTestValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && checkBoundary()}
                style={{ width: 200 }} />
              <button className="btn btn-primary" onClick={checkBoundary}>Проверить</button>
              {testResult && <span style={{ fontSize: '0.85rem' }}>{testResult}</span>}
            </div>
          </>
        )}

        {/* Decision table */}
        {technique.key === 'decision' && (
          <>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Правило</th>
                  {decisionTable.conditions.map(c => <th key={c}>{c}</th>)}
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {decisionTable.rules.map((r, i) => (
                  <tr key={i}>
                    <td><strong>R{i + 1}</strong></td>
                    {r.conditions.map((c, j) => (
                      <td key={j} style={{ textAlign: 'center' }}>
                        {c ? <span style={{ color: '#22c55e' }}>✅</span> : <span style={{ color: '#ef4444' }}>❌</span>}
                      </td>
                    ))}
                    <td><strong>{r.action}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Pairwise */}
        {technique.key === 'pairwise' && (
          <>
            <div className="info-box" style={{ marginBottom: 12 }}>
              <div className="info-box-content">
                <div className="info-box-title">
                  Полный перебор: {fullComboCount} тестов → Pairwise: {pairwiseTests.length} тестов
                </div>
                <div style={{ fontSize: '0.8rem' }}>
                  Экономия: {Math.round((1 - pairwiseTests.length / fullComboCount) * 100)}% тестов при покрытии всех пар
                </div>
              </div>
            </div>
            <table className="data-table">
              <thead><tr><th>#</th><th>Browser</th><th>OS</th><th>Language</th></tr></thead>
              <tbody>
                {pairwiseTests.map((t, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{t.browser}</td>
                    <td>{t.os}</td>
                    <td>{t.language}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* State transitions */}
        {technique.key === 'state' && (
          <>
            <div style={{ marginBottom: 12 }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: 8 }}>Пример: заказ в интернет-магазине</h4>
            </div>
            <table className="data-table">
              <thead><tr><th>Из состояния</th><th>Событие</th><th>В состояние</th></tr></thead>
              <tbody>
                {orderStates.map((s, i) => (
                  <tr key={i}>
                    <td><span className="badge">{s.from}</span></td>
                    <td style={{ fontSize: '0.85rem' }}>→ {s.event}</td>
                    <td><span className="badge">{s.to}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Visual flow */}
            <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
              {['Создан', '→', 'Оплачен', '→', 'Собирается', '→', 'Доставляется', '→', 'Завершён'].map((s, i) => (
                <div key={i} style={{
                  padding: s === '→' ? '0 4px' : '8px 14px',
                  borderRadius: 8,
                  background: s === '→' ? 'transparent' : 'var(--accent-main-alpha)',
                  border: s === '→' ? 'none' : '1px solid var(--accent-main)',
                  fontWeight: 600, fontSize: '0.85rem',
                  color: s === '→' ? 'var(--text-muted)' : 'var(--accent-main)',
                }}>{s}</div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
