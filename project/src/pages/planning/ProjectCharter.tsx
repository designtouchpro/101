import { useState } from 'react'

interface CharterSection {
  title: string
  emoji: string
  hint: string
  example: string
}

const charterSections: CharterSection[] = [
  {
    title: 'Название проекта',
    emoji: '📌',
    hint: 'Краткое и понятное название',
    example: 'Редизайн платформы онлайн-обучения EduPlatform v2.0'
  },
  {
    title: 'Бизнес-цель',
    emoji: '🎯',
    hint: 'Зачем проект нужен бизнесу? Какую проблему решает?',
    example: 'Увеличить конверсию из trial в paid на 25% за счёт улучшения UX и добавления персонализации. Текущая конверсия 8%, целевая 10%.'
  },
  {
    title: 'Scope (границы)',
    emoji: '📦',
    hint: 'Что входит и что НЕ входит в проект?',
    example: 'Входит: редизайн web-интерфейса, новый onboarding, персональные рекомендации. НЕ входит: мобильное приложение, интеграция с LMS.'
  },
  {
    title: 'Ключевые Milestones',
    emoji: '🏁',
    hint: 'Основные вехи проекта с датами',
    example: '1) Discovery & Design — 4 недели\n2) MVP разработка — 8 недель\n3) Beta-тест — 2 недели\n4) Launch — 1 неделя'
  },
  {
    title: 'Бюджет',
    emoji: '💰',
    hint: 'Общий бюджет, разбивка по категориям',
    example: 'Общий бюджет: $120,000\n- Команда: $95,000 (5 человек × 3.5 мес)\n- Инфраструктура: $15,000\n- Contingency: $10,000 (10%)'
  },
  {
    title: 'Команда и роли',
    emoji: '👥',
    hint: 'Кто участвует, кто за что отвечает (RACI)',
    example: 'PM: Анна — общая координация\nTech Lead: Сергей — архитектура\nDesigner: Мария — UX/UI\n2 Backend + 1 Frontend + 1 QA'
  },
  {
    title: 'Риски',
    emoji: '⚠️',
    hint: 'Топ-3 риска с планом митигации',
    example: '1) Задержка дизайна → буфер 1 неделя\n2) Интеграция с legacy API → spike в Sprint 1\n3) Уход ключевого разработчика → документация, парное программирование'
  },
  {
    title: 'Критерии успеха',
    emoji: '✅',
    hint: 'Как поймём, что проект успешен?',
    example: '- Trial → Paid конверсия ≥ 10%\n- NPS ≥ 50\n- Time to first value < 3 мин\n- 0 critical bugs на запуске'
  },
]

export default function ProjectCharter() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [showExample, setShowExample] = useState<string | null>(null)
  const [exported, setExported] = useState(false)

  const filled = Object.values(values).filter(v => v.trim()).length
  const total = charterSections.length
  const progress = Math.round(filled / total * 100)

  const handleExport = () => {
    const text = charterSections
      .map(s => `## ${s.emoji} ${s.title}\n${values[s.title] || '(не заполнено)'}`)
      .join('\n\n')
    navigator.clipboard.writeText(text)
    setExported(true)
    setTimeout(() => setExported(false), 2000)
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📜 Project Charter</h1>
        <p>Устав проекта — документ, формально авторизующий проект и дающий PM полномочия.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Project Charter</strong> (PMBOK) — одностраничный документ, который отвечает на вопросы:
          зачем делаем, что делаем, кто делает, когда и за сколько.
          Без charter проект — это просто набор задач без контекста.
          Charter подписывает <strong>спонсор</strong> — лицо, выделяющее ресурсы.
        </p>
        <div className="info-box">
          <strong>💡 Lean Canvas</strong> для стартапов заменяет charter: Problem, Solution, Key Metrics,
          Unfair Advantage, Channels, Customer Segments, Cost Structure, Revenue Streams.
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>📝 Заполните Charter</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 120, height: 8, borderRadius: 4, background: 'var(--border-color)', overflow: 'hidden'
            }}>
              <div style={{
                height: '100%', width: `${progress}%`, borderRadius: 4,
                background: progress === 100 ? '#22c55e' : 'var(--accent-main)',
                transition: 'width 0.3s'
              }} />
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{filled}/{total}</span>
          </div>
        </div>

        {charterSections.map(section => (
          <div key={section.title} style={{
            marginBottom: 20, padding: 16, borderRadius: 10,
            border: '1px solid var(--border-color)',
            background: values[section.title]?.trim() ? 'rgba(34,197,94,0.03)' : 'transparent'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                {section.emoji} {section.title}
              </label>
              <button
                className="btn"
                style={{ padding: '2px 10px', fontSize: '0.75rem' }}
                onClick={() => setShowExample(showExample === section.title ? null : section.title)}
              >
                {showExample === section.title ? 'Скрыть' : '💡 Пример'}
              </button>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 6 }}>
              {section.hint}
            </div>

            {showExample === section.title && (
              <div style={{
                padding: '10px 14px', marginBottom: 8, borderRadius: 8,
                background: 'var(--accent-main-alpha)', fontSize: '0.85rem',
                whiteSpace: 'pre-line', lineHeight: 1.6
              }}>
                {section.example}
              </div>
            )}

            <textarea
              className="input"
              rows={3}
              placeholder={section.hint}
              value={values[section.title] || ''}
              onChange={e => setValues(prev => ({ ...prev, [section.title]: e.target.value }))}
            />
          </div>
        ))}

        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button className="btn btn-primary" onClick={handleExport}>
            {exported ? '✅ Скопировано!' : '📋 Экспорт в Markdown'}
          </button>
          <button className="btn" onClick={() => {
            const example: Record<string, string> = {}
            charterSections.forEach(s => { example[s.title] = s.example })
            setValues(example)
          }}>
            Заполнить примером
          </button>
          <button className="btn" onClick={() => setValues({})}>Очистить</button>
        </div>
      </div>

      <div className="card">
        <h3>📎 RACI-матрица</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
          Кто <strong>R</strong>esponsible (делает), <strong>A</strong>ccountable (отвечает),
          <strong>C</strong>onsulted (консультирует), <strong>I</strong>nformed (информируется)?
        </p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Задача</th>
              <th>PM</th>
              <th>Tech Lead</th>
              <th>Designer</th>
              <th>Заказчик</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Утверждение scope', 'R', 'C', 'C', 'A'],
              ['Архитектура', 'I', 'R/A', 'C', 'I'],
              ['UX/UI дизайн', 'C', 'C', 'R/A', 'I'],
              ['Sprint planning', 'R/A', 'R', 'C', 'I'],
              ['Приёмка релиза', 'R', 'C', 'I', 'A'],
            ].map(([task, ...roles]) => (
              <tr key={task as string}>
                <td><strong>{task}</strong></td>
                {roles.map((role, i) => (
                  <td key={i} style={{
                    fontWeight: 600,
                    color: (role as string).includes('A') ? 'var(--accent-main)' : (role as string).includes('R') ? '#3b82f6' : 'var(--text-muted)'
                  }}>
                    {role}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
