import { useState } from 'react'

type RoadmapType = 'now-next-later' | 'timeline' | 'okr' | 'theme'

interface RoadmapInfo {
  key: RoadmapType
  name: string
  when: string
  pros: string[]
  cons: string[]
}

const roadmapTypes: RoadmapInfo[] = [
  {
    key: 'now-next-later', name: 'Now / Next / Later',
    when: 'Для agile-команд, когда будущее неопределённо.',
    pros: ['Гибкий, легко обновляется', 'Не привязан к датам', 'Понятен всем'],
    cons: ['Нет чётких сроков для стейкхолдеров', 'Может казаться размытым'],
  },
  {
    key: 'timeline', name: 'Timeline (Gantt)',
    when: 'Когда есть чёткие дедлайны и зависимости.',
    pros: ['Чёткие даты', 'Видны зависимости', 'Удобно для менеджмента'],
    cons: ['Rigid — сложно менять', 'Создаёт ложное ощущение точности', 'Команда начинает «гнать фичи»'],
  },
  {
    key: 'okr', name: 'OKR-based',
    when: 'Когда фокус на outcomes, а не outputs.',
    pros: ['Фокус на результатах', 'Команда автономна в решениях', 'Алигнмент со стратегией'],
    cons: ['Сложнее для неподготовленных стейкхолдеров', 'Требует зрелости команды'],
  },
  {
    key: 'theme', name: 'Theme-based',
    when: 'Когда хотите сгруппировать работу по стратегическим темам.',
    pros: ['Показывает стратегический фокус', 'Гибкий внутри тем', 'Хорош для коммуникации'],
    cons: ['Теряется детализация', 'Может быть слишком абстрактно'],
  },
]

interface RoadmapItem {
  title: string
  desc: string
  column: 'now' | 'next' | 'later'
}

const sampleItems: RoadmapItem[] = [
  { title: 'Улучшить онбординг', desc: 'Пошаговый тур для новых юзеров', column: 'now' },
  { title: 'Push-уведомления', desc: 'D1/D3/D7 retention emails', column: 'now' },
  { title: 'Интеграция с Slack', desc: 'Уведомления в каналы команды', column: 'next' },
  { title: 'API для партнёров', desc: 'REST API для внешних интеграций', column: 'next' },
  { title: 'Mobile app', desc: 'iOS и Android нативные приложения', column: 'later' },
  { title: 'AI рекомендации', desc: 'Персонализированный контент', column: 'later' },
]

export default function Roadmapping() {
  const [activeType, setActiveType] = useState<RoadmapType>('now-next-later')
  const [items, setItems] = useState<RoadmapItem[]>(sampleItems)
  const [newTitle, setNewTitle] = useState('')
  const [newColumn, setNewColumn] = useState<'now' | 'next' | 'later'>('now')

  const selected = roadmapTypes.find(r => r.key === activeType)!

  const addItem = () => {
    if (!newTitle.trim()) return
    setItems(prev => [...prev, { title: newTitle, desc: '', column: newColumn }])
    setNewTitle('')
  }

  const moveItem = (index: number, column: 'now' | 'next' | 'later') => {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, column } : item))
  }

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  const antiPatterns = [
    { title: 'Roadmap = Список фич', desc: 'Roadmap — это стратегия, а не backlog. Не каждая фича должна быть там.', icon: '📜' },
    { title: 'Точные даты', desc: 'Через 3 месяца оценка бесполезна. Используйте горизонты: Now/Next/Later.', icon: '📅' },
    { title: 'Roadmap написан камнем', desc: 'Обновляйте каждые 2-4 недели. Рынок и данные меняются.', icon: '🪨' },
    { title: 'Roadmap от стейкхолдеров', desc: 'PM определяет roadmap на основе данных, а не по запросам HiPPO.', icon: '🦛' },
  ]

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🗺️ Roadmapping</h1>
        <p>Как планировать развитие продукта — и не превратить roadmap в backlog.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Product Roadmap</strong> — это стратегический документ, показывающий <strong>направление развития</strong> продукта,
          а не список фич. Roadmap отвечает на вопрос «Куда мы идём и почему?», backlog — «Что конкретно делаем?».
          Ключевая ошибка начинающих PM — превращать roadmap в Gantt-чарт с точными датами.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Современный подход — <strong>outcome-based roadmap</strong>: вместо «Добавить dark mode в Q3» пишут
          «Увеличить время сессии на 15%». Это даёт команде свободу в выборе решения
          и фокусирует на результате, а не на фичах.
        </p>
        <div className="info-box">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <div className="info-box-title">Roadmap ≠ обещание</div>
            Roadmap — это план, который меняется по мере обучения. Обновляйте каждые 2-4 недели.
            Если roadmap не менялся квартал — вы либо не учитесь, либо не смотрите на данные.
          </div>
        </div>
      </div>

      {/* Types */}
      <div className="card">
        <h3>📋 Типы Roadmap</h3>
        <div className="tabs">
          {roadmapTypes.map(r => (
            <button key={r.key} className={`tab ${activeType === r.key ? 'active' : ''}`} onClick={() => setActiveType(r.key)}>
              {r.name}
            </button>
          ))}
        </div>

        <p style={{ marginBottom: 12 }}>
          <span className="tag emerald">⏰ {selected.when}</span>
        </p>

        <div className="grid-2">
          <div className="info-box success" style={{ margin: 0 }}>
            <div className="info-box-content">
              <div className="info-box-title">✅ Плюсы</div>
              <ul>{selected.pros.map(p => <li key={p}>{p}</li>)}</ul>
            </div>
          </div>
          <div className="info-box error" style={{ margin: 0 }}>
            <div className="info-box-content">
              <div className="info-box-title">❌ Минусы</div>
              <ul>{selected.cons.map(c => <li key={c}>{c}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Now/Next/Later */}
      <div className="card">
        <h3>🎯 Интерактивный Now / Next / Later</h3>
        <p style={{ marginBottom: 16 }}>Перемещайте элементы между колонками. Добавляйте свои.</p>

        <div className="grid-3">
          {(['now', 'next', 'later'] as const).map(col => (
            <div key={col}>
              <h4 style={{
                textAlign: 'center', marginBottom: 8, padding: '6px 12px', borderRadius: 8,
                background: col === 'now' ? 'rgba(16, 185, 129, 0.15)' : col === 'next' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(168, 85, 247, 0.15)',
                color: col === 'now' ? 'var(--accent-main)' : col === 'next' ? 'var(--accent-blue)' : 'var(--accent-purple)',
              }}>
                {col === 'now' ? '🔥 Now' : col === 'next' ? '👀 Next' : '💭 Later'}
              </h4>

              {items.filter(i => i.column === col).map((item, idx) => {
                const globalIdx = items.indexOf(item)
                return (
                  <div key={globalIdx} className="scenario-card" style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '0.9rem' }}>{item.title}</h4>
                      <button
                        className="btn btn-sm btn-danger"
                        style={{ padding: '2px 8px', fontSize: '0.7rem' }}
                        onClick={() => removeItem(globalIdx)}
                      >
                        ×
                      </button>
                    </div>
                    {item.desc && <p style={{ fontSize: '0.8rem', marginBottom: 6 }}>{item.desc}</p>}
                    <div style={{ display: 'flex', gap: 4 }}>
                      {col !== 'now' && <button className="btn btn-sm btn-secondary" style={{ fontSize: '0.7rem', padding: '2px 8px' }} onClick={() => moveItem(globalIdx, 'now')}>→ Now</button>}
                      {col !== 'next' && <button className="btn btn-sm btn-secondary" style={{ fontSize: '0.7rem', padding: '2px 8px' }} onClick={() => moveItem(globalIdx, 'next')}>→ Next</button>}
                      {col !== 'later' && <button className="btn btn-sm btn-secondary" style={{ fontSize: '0.7rem', padding: '2px 8px' }} onClick={() => moveItem(globalIdx, 'later')}>→ Later</button>}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
          <input className="input" placeholder="Новый элемент..." value={newTitle} onChange={e => setNewTitle(e.target.value)} style={{ flex: 2 }} />
          <select className="input" value={newColumn} onChange={e => setNewColumn(e.target.value as 'now' | 'next' | 'later')} style={{ flex: 1 }}>
            <option value="now">Now</option>
            <option value="next">Next</option>
            <option value="later">Later</option>
          </select>
          <button className="btn btn-primary" onClick={addItem}>Добавить</button>
        </div>
      </div>

      {/* Anti-patterns */}
      <div className="card">
        <h3>🚫 Антипаттерны Roadmap</h3>
        <div className="grid-2">
          {antiPatterns.map(ap => (
            <div key={ap.title} className="info-box warning" style={{ margin: 0 }}>
              <div className="info-box-icon">{ap.icon}</div>
              <div className="info-box-content">
                <div className="info-box-title">{ap.title}</div>
                {ap.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
