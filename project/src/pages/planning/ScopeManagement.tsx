import { useState } from 'react'

interface ScopeItem {
  id: number
  feature: string
  priority: 'must' | 'should' | 'could' | 'wont'
  effort: number
  value: number
}

const initialScope: ScopeItem[] = [
  { id: 1, feature: 'Авторизация и регистрация', priority: 'must', effort: 8, value: 10 },
  { id: 2, feature: 'Профиль пользователя', priority: 'must', effort: 5, value: 8 },
  { id: 3, feature: 'Поиск и фильтрация', priority: 'must', effort: 13, value: 9 },
  { id: 4, feature: 'Уведомления (push)', priority: 'should', effort: 8, value: 7 },
  { id: 5, feature: 'Экспорт в PDF', priority: 'should', effort: 5, value: 5 },
  { id: 6, feature: 'Тёмная тема', priority: 'could', effort: 3, value: 4 },
  { id: 7, feature: 'Интеграция с Telegram', priority: 'could', effort: 8, value: 6 },
  { id: 8, feature: 'AI-рекомендации', priority: 'wont', effort: 21, value: 7 },
  { id: 9, feature: 'Мобильное приложение', priority: 'wont', effort: 34, value: 8 },
]

const priorityConfig = {
  must: { label: 'Must Have', color: '#ef4444', desc: 'Без этого продукт не работает' },
  should: { label: 'Should Have', color: '#f59e0b', desc: 'Важно, но можно отложить' },
  could: { label: 'Could Have', color: '#3b82f6', desc: 'Приятно иметь, если хватит времени' },
  wont: { label: "Won't Have", color: '#6b7280', desc: 'Не в этом релизе' },
}

export default function ScopeManagement() {
  const [scope, setScope] = useState<ScopeItem[]>(initialScope)
  const [capacity, setCapacity] = useState(50)
  const [showCreep, setShowCreep] = useState(false)

  const changePriority = (id: number, priority: ScopeItem['priority']) => {
    setScope(prev => prev.map(s => s.id === id ? { ...s, priority } : s))
  }

  const totalForPriority = (p: ScopeItem['priority']) =>
    scope.filter(s => s.priority === p).reduce((sum, s) => sum + s.effort, 0)

  const mustEffort = totalForPriority('must')
  const shouldEffort = totalForPriority('should')
  const couldEffort = totalForPriority('could')

  const withinCapacity = mustEffort + shouldEffort <= capacity
  const allIncluded = mustEffort + shouldEffort + couldEffort

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🎯 Управление Scope</h1>
        <p>MoSCoW-приоритизация, scope creep и trade-off анализ.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Scope management</strong> — процесс определения и контроля того, что входит и <strong>не входит</strong> в проект.
          Главная ошибка PM — не уметь говорить «нет». <strong>MoSCoW</strong> (Must, Should, Could, Won't) помогает
          структурировать приоритеты. Правило: Must Have не должно превышать 60% бюджета — иначе нет буфера.
        </p>
        <div className="info-box">
          <strong>🛡️ Scope Creep</strong> — неконтролируемое расширение scope без пересмотра сроков и бюджета.
          Бороться: Change Request (запрос на изменение) процесс, impact analysis (анализ влияния) для каждого нового требования.
        </div>
      </div>

      <div className="card">
        <h3>📊 Ёмкость команды (Sprint/Release Points)</h3>
        <div style={{ marginBottom: 8 }}>
          <input type="range" min={20} max={100} value={capacity} onChange={e => setCapacity(+e.target.value)}
            style={{ width: '100%' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <span>20 SP</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Capacity: {capacity} SP</span>
            <span>100 SP</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          {(['must', 'should', 'could', 'wont'] as const).map(p => (
            <div key={p} style={{
              flex: 1, textAlign: 'center', padding: '8px 4px',
              background: priorityConfig[p].color + '15', borderRadius: 8,
              border: `1px solid ${priorityConfig[p].color}30`
            }}>
              <div style={{ fontSize: '0.7rem', color: priorityConfig[p].color, fontWeight: 700 }}>
                {priorityConfig[p].label}
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{totalForPriority(p)} SP</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 8,
          background: withinCapacity ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
          border: `1px solid ${withinCapacity ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
          fontSize: '0.85rem'
        }}>
          {withinCapacity
            ? `✅ Must + Should (${mustEffort + shouldEffort} SP) укладывается в capacity (${capacity} SP). Можно взять Could (+${couldEffort} SP)`
            : `⚠️ Must + Should (${mustEffort + shouldEffort} SP) превышает capacity (${capacity} SP). Нужно пересмотреть scope!`
          }
        </div>
      </div>

      <div className="card">
        <h3>🔀 Приоритизация фичей (MoSCoW)</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
          Перетаскивайте фичи между приоритетами, чтобы уложиться в capacity.
        </p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Фича</th>
              <th>Effort (SP)</th>
              <th>Value</th>
              <th>ROI (окупаемость)</th>
              <th>Приоритет</th>
            </tr>
          </thead>
          <tbody>
            {scope
              .sort((a, b) => b.value / b.effort - a.value / a.effort)
              .map(item => (
                <tr key={item.id}>
                  <td><strong>{item.feature}</strong></td>
                  <td>{item.effort} SP</td>
                  <td>{'⭐'.repeat(Math.min(item.value, 5))}{item.value > 5 ? `+${item.value - 5}` : ''}</td>
                  <td style={{ fontWeight: 600 }}>{(item.value / item.effort).toFixed(1)}</td>
                  <td>
                    <select
                      value={item.priority}
                      onChange={e => changePriority(item.id, e.target.value as ScopeItem['priority'])}
                      className="input"
                      style={{
                        width: 130,
                        color: priorityConfig[item.priority].color,
                        fontWeight: 600,
                        fontSize: '0.8rem'
                      }}
                    >
                      {(['must', 'should', 'could', 'wont'] as const).map(p => (
                        <option key={p} value={p}>{priorityConfig[p].label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>🚨 Scope Creep Simulator</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
          Что происходит, когда постоянно добавляют фичи «по-быстрому»?
        </p>
        <button className="btn btn-primary" onClick={() => setShowCreep(!showCreep)}>
          {showCreep ? 'Скрыть симуляцию' : '▶ Запустить Scope Creep'}
        </button>

        {showCreep && (
          <div style={{ marginTop: 16 }}>
            {[
              { week: 'Неделя 1', event: '«Можно добавить тёмную тему?»', impact: '+3 SP', total: capacity + 3, color: '#f59e0b' },
              { week: 'Неделя 2', event: '«Нужна интеграция с CRM»', impact: '+13 SP', total: capacity + 16, color: '#ef4444' },
              { week: 'Неделя 3', event: '«Добавим аналитику и дашборд»', impact: '+8 SP', total: capacity + 24, color: '#ef4444' },
              { week: 'Неделя 4', event: '«Ещё мобильное push»', impact: '+5 SP', total: capacity + 29, color: '#dc2626' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                background: `${item.color}10`, borderRadius: 8, marginBottom: 8,
                borderLeft: `3px solid ${item.color}`
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: item.color, minWidth: 80 }}>{item.week}</div>
                <div style={{ flex: 1, fontSize: '0.85rem' }}>{item.event}</div>
                <div style={{ fontWeight: 700, color: item.color }}>{item.impact}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total: {item.total} SP</div>
              </div>
            ))}
            <div style={{
              marginTop: 12, padding: 16, background: 'rgba(239,68,68,0.1)',
              borderRadius: 10, border: '1px solid rgba(239,68,68,0.3)', textAlign: 'center'
            }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ef4444' }}>
                Scope вырос на {29} SP ({Math.round(29 / capacity * 100)}%) без пересмотра сроков! 💥
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Решение: Change Request Board → Impact Analysis → Что убираем взамен?
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Материалы */}
      <div className="card">
        <h3>📚 Материалы для изучения</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="https://ru.wikipedia.org/wiki/Управление_содержанием_проекта" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Управление содержанием проекта — Википедия
          </a>
        </div>
      </div>
    </div>
  )
}
