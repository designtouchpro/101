import { useState } from 'react'

const severityLevels = [
  { level: 'Blocker', icon: '🔴', color: '#dc2626', desc: 'Приложение не работает, нет workaround', example: 'Сервер падает при запуске, БД недоступна' },
  { level: 'Critical', icon: '🟠', color: '#ef4444', desc: 'Основная функция не работает, есть workaround', example: 'Оплата не проходит, но можно через другой способ' },
  { level: 'Major', icon: '🟡', color: '#f97316', desc: 'Функция работает неправильно', example: 'Неправильный расчёт скидки, но заказ создаётся' },
  { level: 'Minor', icon: '🟢', color: '#eab308', desc: 'Косметический дефект, не влияет на функционал', example: 'Кнопка не того цвета, текст обрезается' },
  { level: 'Trivial', icon: '⚪', color: '#a3a3a3', desc: 'Незначительная проблема', example: 'Опечатка, лишний пробел, улучшение' },
]

const priorityLevels = [
  { level: 'P1 — ASAP', desc: 'Исправить немедленно', when: 'Продакшн лежит' },
  { level: 'P2 — High', desc: 'Исправить в текущем спринте', when: 'Критичная функция сломана' },
  { level: 'P3 — Medium', desc: 'Запланировать на ближайший спринт', when: 'Важно, но не срочно' },
  { level: 'P4 — Low', desc: 'Когда будет время', when: 'Не блокирует никого' },
]

const lifecycle = [
  { status: 'New', icon: '🆕', desc: 'QA создал баг' },
  { status: 'Open', icon: '📂', desc: 'Тимлид подтвердил и назначил' },
  { status: 'In Progress', icon: '🔧', desc: 'Разработчик фиксит' },
  { status: 'Fixed', icon: '✅', desc: 'Разработчик пофиксил, ждёт проверки' },
  { status: 'Verified', icon: '✔️', desc: 'QA проверил — баг исправлен' },
  { status: 'Closed', icon: '🏁', desc: 'Баг закрыт' },
  { status: 'Reopened', icon: '🔄', desc: 'QA проверил — баг воспроизводится' },
]

interface DemoBug {
  title: string
  steps: string
  expected: string
  actual: string
  severity: string
  priority: string
  env: string
}

const emptyBug: DemoBug = {
  title: '', steps: '', expected: '', actual: '',
  severity: 'Major', priority: 'P3 — Medium', env: '',
}

const exampleBug: DemoBug = {
  title: 'Некорректная сумма при применении промокода более 100%',
  steps: '1. Открыть корзину\n2. Добавить товар за 1000₽\n3. Ввести промокод "TEST200" (скидка 200%)\n4. Нажать "Применить"',
  expected: 'Ошибка: "Промокод недействителен" или сумма = 0',
  actual: 'Сумма становится -1000₽, можно оформить заказ',
  severity: 'Critical',
  priority: 'P1 — ASAP',
  env: 'Chrome 120, macOS 14, Production',
}

export default function BugReporting() {
  const [tab, setTab] = useState<'severity' | 'lifecycle' | 'template'>('severity')
  const [bug, setBug] = useState<DemoBug>(emptyBug)
  const [showExample, setShowExample] = useState(false)

  const updateBug = (field: keyof DemoBug, value: string) => {
    setBug(prev => ({ ...prev, [field]: value }))
  }

  const filledFields = Object.values(bug).filter(v => v.trim() !== '').length
  const totalFields = Object.keys(bug).length
  const completionPct = Math.round((filledFields / totalFields) * 100)

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🐛 Баг-репорты</h1>
        <p>Severity vs Priority, жизненный цикл бага и шаблон баг-репорта.</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {([['severity', '🎯 Severity & Priority'], ['lifecycle', '🔄 Жизненный цикл'], ['template', '📝 Шаблон']] as const).map(([k, l]) => (
          <button key={k} className={`btn ${tab === k ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === 'severity' && (
        <>
          <div className="card">
            <h3>🎯 Severity (серьёзность)</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>
              Насколько баг влияет на систему. Определяет QA.
            </p>
            {severityLevels.map(s => (
              <div key={s.level} style={{
                padding: '12px 16px', borderRadius: 8, marginBottom: 8,
                background: 'var(--bg-code)', borderLeft: `3px solid ${s.color}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>{s.icon}</span>
                  <strong style={{ color: s.color }}>{s.level}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>— {s.desc}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, paddingLeft: 28 }}>
                  💡 {s.example}
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <h3>⚡ Priority (приоритет)</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>
              Как быстро нужно исправить. Определяет PM/PO/тимлид.
            </p>
            <table className="data-table">
              <thead><tr><th>Приоритет</th><th>Действие</th><th>Когда</th></tr></thead>
              <tbody>
                {priorityLevels.map(p => (
                  <tr key={p.level}>
                    <td><strong>{p.level}</strong></td>
                    <td style={{ fontSize: '0.8rem' }}>{p.desc}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="info-box" style={{ marginTop: 16 }}>
              <div className="info-box-content">
                <div className="info-box-title">⚠️ Severity ≠ Priority</div>
                <div style={{ fontSize: '0.8rem' }}>
                  <strong>High Severity, Low Priority:</strong> Редкий краш в админке, которой пользуются 2 человека<br />
                  <strong>Low Severity, High Priority:</strong> Логотип CEO в подвале — не тот цвет (CEO просил срочно)
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {tab === 'lifecycle' && (
        <div className="card">
          <h3>🔄 Жизненный цикл бага</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            {lifecycle.map((s, i) => (
              <div key={s.status} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  padding: '10px 14px', borderRadius: 8, textAlign: 'center',
                  background: 'var(--accent-main-alpha)',
                  border: '1px solid var(--accent-main)',
                  minWidth: 90,
                }}>
                  <div style={{ fontSize: '1.2rem' }}>{s.icon}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>{s.status}</div>
                </div>
                {i < lifecycle.length - 1 && <span style={{ color: 'var(--text-muted)' }}>→</span>}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {lifecycle.map(s => (
              <div key={s.status} style={{
                padding: '8px 14px', borderRadius: 6, background: 'var(--bg-code)',
                fontSize: '0.85rem', display: 'flex', gap: 8, alignItems: 'center',
              }}>
                <span>{s.icon}</span>
                <strong>{s.status}</strong>
                <span style={{ color: 'var(--text-secondary)' }}>— {s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'template' && (
        <div className="card">
          <h3>📝 Шаблон баг-репорта</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Заполнено: {filledFields}/{totalFields} ({completionPct}%)
            </div>
            <button className="btn btn-secondary" onClick={() => { setBug(showExample ? emptyBug : exampleBug); setShowExample(!showExample) }}>
              {showExample ? '🧹 Очистить' : '💡 Пример'}
            </button>
          </div>

          {/* Progress bar */}
          <div style={{ height: 4, borderRadius: 2, background: 'var(--border-color)', marginBottom: 16 }}>
            <div style={{ height: '100%', borderRadius: 2, width: `${completionPct}%`, background: 'var(--accent-main)', transition: 'width 0.3s' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>📌 Title</label>
              <input className="input" placeholder="[Модуль] Краткое описание бага" value={bug.title}
                onChange={e => updateBug('title', e.target.value)} />
            </div>

            <div className="grid-2">
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>🎯 Severity</label>
                <select className="input" value={bug.severity} onChange={e => updateBug('severity', e.target.value)}>
                  {severityLevels.map(s => <option key={s.level} value={s.level}>{s.icon} {s.level}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>⚡ Priority</label>
                <select className="input" value={bug.priority} onChange={e => updateBug('priority', e.target.value)}>
                  {priorityLevels.map(p => <option key={p.level} value={p.level}>{p.level}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>📋 Steps to Reproduce</label>
              <textarea className="input" placeholder="1. Открыть...\n2. Нажать...\n3. Ввести..." value={bug.steps}
                onChange={e => updateBug('steps', e.target.value)} style={{ minHeight: 80 }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>✅ Expected Result</label>
              <textarea className="input" placeholder="Что должно произойти" value={bug.expected}
                onChange={e => updateBug('expected', e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>❌ Actual Result</label>
              <textarea className="input" placeholder="Что произошло на самом деле" value={bug.actual}
                onChange={e => updateBug('actual', e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>🖥️ Environment</label>
              <input className="input" placeholder="Browser, OS, Version, Stage" value={bug.env}
                onChange={e => updateBug('env', e.target.value)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
