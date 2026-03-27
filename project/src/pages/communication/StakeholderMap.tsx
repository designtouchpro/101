import { useState } from 'react'

interface Stakeholder {
  id: number
  name: string
  power: number // 1-10
  interest: number // 1-10
  role: string
}

const defaultStakeholders: Stakeholder[] = [
  { id: 1, name: 'CEO', power: 10, interest: 3, role: 'Спонсор' },
  { id: 2, name: 'Product Owner', power: 8, interest: 9, role: 'Владелец продукта' },
  { id: 3, name: 'Тех. директор', power: 9, interest: 7, role: 'Контролёр архитектуры' },
  { id: 4, name: 'Команда разработки', power: 4, interest: 8, role: 'Исполнители' },
  { id: 5, name: 'Маркетолог', power: 3, interest: 6, role: 'Запросы на фичи' },
  { id: 6, name: 'Регулятор', power: 7, interest: 2, role: 'Комплаенс' },
  { id: 7, name: 'Конечный пользователь', power: 2, interest: 9, role: 'Потребитель' },
  { id: 8, name: 'HR', power: 3, interest: 2, role: 'Ресурсы' },
]

const getQuadrant = (power: number, interest: number) => {
  if (power > 5 && interest > 5) return { label: 'Manage Closely', color: '#ef4444', strategy: 'Активно управляйте. Регулярные встречи, полное вовлечение.' }
  if (power > 5 && interest <= 5) return { label: 'Keep Satisfied', color: '#f59e0b', strategy: 'Держите довольными. Информируйте, но не перегружайте.' }
  if (power <= 5 && interest > 5) return { label: 'Keep Informed', color: '#3b82f6', strategy: 'Держите в курсе. Регулярные обновления, демо.' }
  return { label: 'Monitor', color: '#6b7280', strategy: 'Мониторьте. Минимум усилий, периодические апдейты.' }
}

const raciRoles = ['R', 'A', 'C', 'I'] as const
type RACIRole = typeof raciRoles[number]

const raciTasks = [
  'Планирование спринта',
  'Код ревью',
  'Релиз',
  'Бюджет проекта',
  'UX исследование',
]
const raciPeople = ['PM', 'PO', 'Dev Lead', 'QA', 'Designer']

export default function StakeholderMap() {
  const [stakeholders, setStakeholders] = useState(defaultStakeholders)
  const [newName, setNewName] = useState('')
  const [dragId, setDragId] = useState<number | null>(null)
  const [tab, setTab] = useState<'map' | 'raci'>('map')

  const [raci, setRaci] = useState<Record<string, Record<string, RACIRole | ''>>>(() => {
    const init: Record<string, Record<string, RACIRole | ''>> = {}
    raciTasks.forEach(t => {
      init[t] = {}
      raciPeople.forEach(p => { init[t][p] = '' })
    })
    init['Планирование спринта'] = { PM: 'R', PO: 'A', 'Dev Lead': 'C', QA: 'I', Designer: 'I' }
    init['Код ревью'] = { PM: 'I', PO: 'I', 'Dev Lead': 'R', QA: 'C', Designer: '' }
    init['Релиз'] = { PM: 'A', PO: 'I', 'Dev Lead': 'R', QA: 'R', Designer: '' }
    return init
  })

  const addStakeholder = () => {
    if (!newName.trim()) return
    setStakeholders(prev => [...prev, { id: Date.now(), name: newName.trim(), power: 5, interest: 5, role: '' }])
    setNewName('')
  }

  const handleGridClick = (id: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 10
    const y = (1 - (e.clientY - rect.top) / rect.height) * 10
    setStakeholders(prev => prev.map(s => s.id === id ? s : s).map(s =>
      dragId === id ? { ...s, power: Math.max(1, Math.min(10, Math.round(y))), interest: Math.max(1, Math.min(10, Math.round(x))) } : s
    ))
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>👥 Карта стейкхолдеров</h1>
        <p>Управление заинтересованными сторонами: Power/Interest Grid и RACI матрица.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Стейкхолдер</strong> — любой человек или группа, которые влияют на проект или на которых влияет проект. 
          Это не только заказчик и команда: это юристы, безопасники, смежные команды, поддержка, маркетинг. 
          Управление стейкхолдерами (stakeholder management) — одна из 10 областей знаний PMBOK и часто 
          определяющий фактор успеха или провала проекта.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Power/Interest Grid</strong> (матрица Менделоу) классифицирует стейкхолдеров по двум осям: 
          влияние (power) и заинтересованность (interest). Это определяет стратегию коммуникации: 
          высокое влияние + высокий интерес = тесное сотрудничество; высокое влияние + низкий интерес = держать довольным.
          <strong> RACI</strong> (Responsible, Accountable, Consulted, Informed) распределяет роли по задачам: 
          кто делает, кто отвечает за результат, с кем советоваться, кого информировать.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>⚠️ Частая ошибка</strong>: Забыть про «тихих» стейкхолдеров с высоким влиянием. 
            Например, архитектор, который не участвует в daily, но может заблокировать релиз на review. 
            Или compliance-офицер, о котором вспоминают за неделю до запуска.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['map', 'raci'] as const).map(t => (
          <button key={t} className={`btn ${tab === t ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(t)}>
            {t === 'map' ? '🗺️ Power/Interest' : '📊 RACI'}
          </button>
        ))}
      </div>

      {tab === 'map' && (
        <>
          {/* Grid */}
          <div className="card">
            <h3>🗺️ Матрица Power/Interest</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
              Перетаскивайте стейкхолдеров, меняя их Power и Interest в таблице ниже.
            </p>

            <div style={{ position: 'relative', width: '100%', maxWidth: 500, height: 400, margin: '0 auto', border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden' }}>
              {/* Quadrant backgrounds */}
              {[
                { x: 0, y: 0, bg: '#3b82f610', label: 'Keep Informed' },
                { x: 50, y: 0, bg: '#ef444410', label: 'Manage Closely' },
                { x: 0, y: 50, bg: '#6b728010', label: 'Monitor' },
                { x: 50, y: 50, bg: '#f59e0b10', label: 'Keep Satisfied' },
              ].map(q => (
                <div key={q.label} style={{
                  position: 'absolute', left: `${q.x}%`, top: `${q.y}%`, width: '50%', height: '50%', background: q.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', opacity: 0.7 }}>{q.label}</span>
                </div>
              ))}

              {/* Axis labels */}
              <div style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Interest →
              </div>
              <div style={{ position: 'absolute', left: 2, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Power →
              </div>

              {/* Midlines */}
              <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, borderLeft: '1px dashed var(--border-color)' }} />
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px dashed var(--border-color)' }} />

              {/* Stakeholder dots */}
              {stakeholders.map(s => {
                const q = getQuadrant(s.power, s.interest)
                return (
                  <div key={s.id}
                    onMouseDown={() => setDragId(s.id)}
                    style={{
                      position: 'absolute',
                      left: `${(s.interest / 10) * 100}%`,
                      bottom: `${(s.power / 10) * 100}%`,
                      transform: 'translate(-50%, 50%)',
                      width: 28, height: 28, borderRadius: '50%',
                      background: q.color, color: 'white', fontSize: '0.6rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'grab', fontWeight: 700, boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      zIndex: dragId === s.id ? 10 : 1,
                    }}
                    title={`${s.name} (P:${s.power} I:${s.interest})`}
                  >
                    {s.name.charAt(0)}
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16, justifyContent: 'center' }}>
              {stakeholders.map(s => {
                const q = getQuadrant(s.power, s.interest)
                return (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: q.color }} />
                    {s.name}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Stakeholder table */}
          <div className="card" style={{ overflowX: 'auto' }}>
            <h3>📋 Управление стейкхолдерами</h3>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ textAlign: 'left', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Имя</th>
                  <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Power</th>
                  <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Interest</th>
                  <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Квадрант</th>
                  <th style={{ textAlign: 'left', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Стратегия</th>
                </tr>
              </thead>
              <tbody>
                {stakeholders.map(s => {
                  const q = getQuadrant(s.power, s.interest)
                  return (
                    <tr key={s.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: 8, fontSize: '0.85rem', fontWeight: 500 }}>{s.name}</td>
                      <td style={{ padding: 4, textAlign: 'center' }}>
                        <input type="range" min={1} max={10} value={s.power}
                          onChange={e => setStakeholders(prev => prev.map(st => st.id === s.id ? { ...st, power: +e.target.value } : st))}
                          style={{ width: 60 }} />
                        <span style={{ fontSize: '0.75rem', marginLeft: 4 }}>{s.power}</span>
                      </td>
                      <td style={{ padding: 4, textAlign: 'center' }}>
                        <input type="range" min={1} max={10} value={s.interest}
                          onChange={e => setStakeholders(prev => prev.map(st => st.id === s.id ? { ...st, interest: +e.target.value } : st))}
                          style={{ width: 60 }} />
                        <span style={{ fontSize: '0.75rem', marginLeft: 4 }}>{s.interest}</span>
                      </td>
                      <td style={{ padding: 8, textAlign: 'center' }}>
                        <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 12, background: `${q.color}20`, color: q.color, fontWeight: 600 }}>
                          {q.label}
                        </span>
                      </td>
                      <td style={{ padding: 8, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{q.strategy}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <input placeholder="Новый стейкхолдер…" value={newName} onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addStakeholder()} className="input" style={{ flex: 1 }} />
              <button onClick={addStakeholder} className="btn btn-primary">Добавить</button>
            </div>
          </div>
        </>
      )}

      {tab === 'raci' && (
        <div className="card" style={{ overflowX: 'auto' }}>
          <h3>📊 RACI матрица</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
            Кликайте по ячейкам, чтобы переключать роли.
          </p>
          <div className="info-box" style={{ marginBottom: 16 }}>
            <div className="info-box-content" style={{ fontSize: '0.8rem' }}>
              <strong>R</strong> — Responsible (делает), <strong>A</strong> — Accountable (отвечает, только 1 на задачу),
              <strong> C</strong> — Consulted (советуется), <strong>I</strong> — Informed (уведомляется)
            </div>
          </div>

          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ textAlign: 'left', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Задача</th>
                {raciPeople.map(p => (
                  <th key={p} style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {raciTasks.map(task => (
                <tr key={task} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: 8, fontSize: '0.85rem', fontWeight: 500 }}>{task}</td>
                  {raciPeople.map(person => {
                    const val = raci[task]?.[person] || ''
                    const colors: Record<string, string> = { R: '#ef4444', A: '#f59e0b', C: '#3b82f6', I: '#6b7280' }
                    return (
                      <td key={person} style={{ padding: 4, textAlign: 'center' }}>
                        <button
                          onClick={() => {
                            const order: (RACIRole | '')[] = ['', 'R', 'A', 'C', 'I']
                            const nextIdx = (order.indexOf(val) + 1) % order.length
                            setRaci(prev => ({
                              ...prev,
                              [task]: { ...prev[task], [person]: order[nextIdx] },
                            }))
                          }}
                          style={{
                            width: 36, height: 36, borderRadius: 8, border: '1px solid var(--border-color)',
                            background: val ? `${colors[val]}20` : 'var(--bg-secondary)',
                            color: val ? colors[val] : 'var(--text-muted)',
                            fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                          }}>
                          {val || '–'}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
