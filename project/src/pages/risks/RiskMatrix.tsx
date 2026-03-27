import { useState } from 'react'

interface Risk {
  id: number
  title: string
  probability: 1 | 2 | 3 | 4 | 5
  impact: 1 | 2 | 3 | 4 | 5
  mitigation: string
  status: 'open' | 'mitigated' | 'occurred'
}

const defaultRisks: Risk[] = [
  { id: 1, title: 'Ключевой разработчик уволится', probability: 2, impact: 5, mitigation: 'Документация, парное программирование', status: 'open' },
  { id: 2, title: 'API партнёра изменится', probability: 3, impact: 4, mitigation: 'Абстракция адаптерами, мониторинг changelog', status: 'open' },
  { id: 3, title: 'Не успеем к дедлайну', probability: 4, impact: 3, mitigation: 'Буфер 20%, приоритизация MVP', status: 'open' },
  { id: 4, title: 'Серверы не выдержат нагрузку', probability: 2, impact: 4, mitigation: 'Нагрузочное тестирование заранее', status: 'mitigated' },
  { id: 5, title: 'Требования изменятся', probability: 5, impact: 2, mitigation: 'Agile-подход, частые демо', status: 'open' },
]

const probLabels = ['', 'Очень низкая', 'Низкая', 'Средняя', 'Высокая', 'Очень высокая']
const impactLabels = ['', 'Минимальное', 'Низкое', 'Среднее', 'Высокое', 'Критическое']

const getCellColor = (p: number, i: number) => {
  const score = p * i
  if (score >= 15) return { bg: '#ef444440', border: '#ef4444', label: 'Критический' }
  if (score >= 8) return { bg: '#f59e0b30', border: '#f59e0b', label: 'Высокий' }
  if (score >= 4) return { bg: '#3b82f620', border: '#3b82f6', label: 'Средний' }
  return { bg: '#22c55e20', border: '#22c55e', label: 'Низкий' }
}

export default function RiskMatrix() {
  const [risks, setRisks] = useState<Risk[]>(defaultRisks)
  const [newTitle, setNewTitle] = useState('')
  const [selectedRisk, setSelectedRisk] = useState<number | null>(null)
  const [showRAID, setShowRAID] = useState(false)

  const addRisk = () => {
    if (!newTitle.trim()) return
    setRisks(prev => [...prev, {
      id: Date.now(), title: newTitle.trim(), probability: 3, impact: 3,
      mitigation: '', status: 'open',
    }])
    setNewTitle('')
  }

  const updateRisk = (id: number, field: keyof Risk, value: string | number) => {
    setRisks(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r))
  }

  const removeRisk = (id: number) => {
    setRisks(prev => prev.filter(r => r.id !== id))
    if (selectedRisk === id) setSelectedRisk(null)
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>⚠️ Матрица рисков</h1>
        <p>Оценка и визуализация рисков проекта. Вероятность × Влияние.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Управление рисками</strong> — процесс идентификации, анализа и реагирования на неопределённости проекта. 
          По PMBOK, риск — это неопределённое событие, которое, если произойдёт, окажет положительное или отрицательное влияние 
          на цели проекта. Матрица рисков (Risk Matrix) — визуальный инструмент, который оценивает каждый риск по двум осям: 
          вероятность наступления и степень влияния.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Четыре стратегии реагирования на негативные риски: <strong>Avoid</strong> (изменить план, чтобы риск не возник), <strong>Mitigate</strong> (снизить вероятность или влияние), <strong>Transfer</strong> (передать третьей стороне — страховка, SLA), <strong>Accept</strong> (принять и заложить резерв). Для каждого красного и оранжевого риска должен быть 
          назначен владелец (risk owner) и план действий.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>💡 Практический совет</strong>: Проводите risk review каждые 2 недели. Риски — живой документ. 
            Новые появляются, старые закрываются, приоритеты меняются. Команда, которая обсуждает риски регулярно, 
            не удивляется «неожиданным» проблемам.
          </div>
        </div>
      </div>

      {/* Matrix 5x5 */}
      <div className="card">
        <h3>🎯 Матрица 5×5</h3>
        <p style={{ marginBottom: 16, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Кликните на риск (число), чтобы увидеть детали.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'inline-grid', gridTemplateColumns: 'auto repeat(5, 80px)', gap: 2 }}>
            {/* Header row */}
            <div />
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', padding: 4 }}>
                {impactLabels[i]}
              </div>
            ))}

            {/* Grid rows (probability 5 to 1, top to bottom) */}
            {[5, 4, 3, 2, 1].map(p => (
              <>
                <div key={`label-${p}`} style={{
                  fontSize: '0.7rem', color: 'var(--text-muted)', padding: 4,
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8,
                }}>
                  {probLabels[p]}
                </div>
                {[1, 2, 3, 4, 5].map(i => {
                  const style = getCellColor(p, i)
                  const cellRisks = risks.filter(r => r.probability === p && r.impact === i && r.status === 'open')
                  return (
                    <div key={`${p}-${i}`} style={{
                      background: style.bg, border: `1px solid ${style.border}40`,
                      borderRadius: 6, padding: 4, minHeight: 50, textAlign: 'center',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, cursor: cellRisks.length ? 'pointer' : 'default',
                    }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{p * i}</div>
                      {cellRisks.map(r => (
                        <div key={r.id}
                          onClick={() => setSelectedRisk(selectedRisk === r.id ? null : r.id)}
                          style={{
                            fontSize: '0.65rem', padding: '2px 4px', borderRadius: 4,
                            background: selectedRisk === r.id ? 'var(--accent-main)' : `${style.border}30`,
                            color: selectedRisk === r.id ? 'white' : 'var(--text-primary)',
                            cursor: 'pointer', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }} title={r.title}>
                          R{r.id}
                        </div>
                      ))}
                    </div>
                  )
                })}
              </>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            ← Влияние (Impact) →
          </div>
        </div>

        {selectedRisk && (() => {
          const r = risks.find(r => r.id === selectedRisk)
          if (!r) return null
          const style = getCellColor(r.probability, r.impact)
          return (
            <div className="info-box" style={{ marginTop: 16, borderColor: style.border }}>
              <div className="info-box-content">
                <div className="info-box-title">{r.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Вероятность: <strong>{probLabels[r.probability]}</strong> ({r.probability}) ×
                  Влияние: <strong>{impactLabels[r.impact]}</strong> ({r.impact}) =
                  <strong style={{ color: style.border }}> {r.probability * r.impact} ({style.label})</strong>
                </div>
                {r.mitigation && (
                  <div style={{ marginTop: 8, fontSize: '0.85rem' }}>
                    🛡️ Митигация: {r.mitigation}
                  </div>
                )}
              </div>
            </div>
          )
        })()}
      </div>

      {/* Risk Register */}
      <div className="card" style={{ overflowX: 'auto' }}>
        <h3>📋 Реестр рисков</h3>
        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ textAlign: 'left', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Риск</th>
              <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>P</th>
              <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>I</th>
              <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Score</th>
              <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Статус</th>
              <th style={{ padding: 8 }}></th>
            </tr>
          </thead>
          <tbody>
            {risks.sort((a, b) => b.probability * b.impact - a.probability * a.impact).map(r => {
              const style = getCellColor(r.probability, r.impact)
              return (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: 8, fontSize: '0.85rem', fontWeight: 500 }}>{r.title}</td>
                  <td style={{ padding: 4, textAlign: 'center' }}>
                    <select value={r.probability} onChange={e => updateRisk(r.id, 'probability', +e.target.value)}
                      style={{ padding: 3, borderRadius: 4, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.8rem' }}>
                      {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: 4, textAlign: 'center' }}>
                    <select value={r.impact} onChange={e => updateRisk(r.id, 'impact', +e.target.value)}
                      style={{ padding: 3, borderRadius: 4, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.8rem' }}>
                      {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: 8, textAlign: 'center', fontWeight: 700, color: style.border }}>
                    {r.probability * r.impact}
                  </td>
                  <td style={{ padding: 4, textAlign: 'center' }}>
                    <select value={r.status} onChange={e => updateRisk(r.id, 'status', e.target.value)}
                      style={{ padding: 3, borderRadius: 4, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.8rem' }}>
                      <option value="open">🔴 Открыт</option>
                      <option value="mitigated">🟢 Снижен</option>
                      <option value="occurred">⚫ Произошёл</option>
                    </select>
                  </td>
                  <td style={{ padding: 4 }}>
                    <button onClick={() => removeRisk(r.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', opacity: 0.5 }}>✕</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <input placeholder="Новый риск…" value={newTitle} onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addRisk()} className="input" style={{ flex: 1 }} />
          <button onClick={addRisk} className="btn btn-primary">Добавить</button>
        </div>
      </div>

      {/* RAID Log */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3>📊 RAID Log (реестр рисков, допущений, проблем и зависимостей)</h3>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowRAID(!showRAID)}>
            {showRAID ? 'Скрыть' : 'Показать'}
          </button>
        </div>

        {showRAID && (
          <div className="grid-2">
            {[
              { letter: 'R', title: 'Risks (Риски)', desc: 'Что может пойти не так', color: '#ef4444', examples: ['Потеря ключевого разработчика', 'Изменение API партнёра', 'Не готовая инфраструктура'] },
              { letter: 'A', title: 'Assumptions (Допущения)', desc: 'Что мы считаем правдой (но не проверили)', color: '#f59e0b', examples: ['API партнёра стабилен', 'Команда не уйдёт в отпуск', 'Требования не изменятся'] },
              { letter: 'I', title: 'Issues (Проблемы)', desc: 'Текущие проблемы, требующие решения', color: '#3b82f6', examples: ['CI/CD ломается раз в неделю', 'Нет тестовых данных', 'Блокер от другой команды'] },
              { letter: 'D', title: 'Dependencies (Зависимости)', desc: 'От чего зависит проект', color: '#a855f7', examples: ['API команды платежей (Q2)', 'Дизайн от UX (март)', 'Инфраструктура от DevOps'] },
            ].map(item => (
              <div key={item.letter} style={{ padding: 16, borderRadius: 8, border: `1px solid ${item.color}40`, background: `${item.color}08` }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: item.color, marginBottom: 4 }}>
                  {item.letter} — {item.title}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>{item.desc}</p>
                {item.examples.map(ex => (
                  <div key={ex} style={{ fontSize: '0.8rem', marginBottom: 2 }}>• {ex}</div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Материалы */}
      <div className="card">
        <h3>📚 Материалы для изучения</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="https://ru.wikipedia.org/wiki/Управление_рисками" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Управление рисками — Википедия
          </a>
        </div>
      </div>
    </div>
  )
}
