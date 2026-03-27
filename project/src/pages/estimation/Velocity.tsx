import { useState, useMemo } from 'react'

export default function Velocity() {
  const [sprintLength, setSprintLength] = useState(10) // working days
  const [teamSize, setTeamSize] = useState(5)
  const [focusFactor, setFocusFactor] = useState(70) // percent

  // Historical velocity data (editable)
  const [sprints, setSprints] = useState([
    { name: 'Sprint 1', committed: 30, completed: 24 },
    { name: 'Sprint 2', committed: 28, completed: 26 },
    { name: 'Sprint 3', committed: 32, completed: 30 },
    { name: 'Sprint 4', committed: 30, completed: 28 },
    { name: 'Sprint 5', committed: 35, completed: 25 },
    { name: 'Sprint 6', committed: 30, completed: 29 },
  ])

  const stats = useMemo(() => {
    const velocities = sprints.map(s => s.completed)
    const avg = velocities.reduce((a, b) => a + b, 0) / velocities.length
    const min = Math.min(...velocities)
    const max = Math.max(...velocities)
    const commitmentRate = sprints.reduce((sum, s) => sum + (s.completed / s.committed) * 100, 0) / sprints.length
    return { avg: Math.round(avg), min, max, commitmentRate: Math.round(commitmentRate) }
  }, [sprints])

  const capacity = Math.round(teamSize * sprintLength * (focusFactor / 100))

  // Release forecasting
  const [remainingSP, setRemainingSP] = useState(120)
  const sprintsToComplete = {
    optimistic: Math.ceil(remainingSP / stats.max),
    likely: Math.ceil(remainingSP / stats.avg),
    pessimistic: Math.ceil(remainingSP / stats.min),
  }

  const updateSprint = (idx: number, field: 'committed' | 'completed', value: number) => {
    setSprints(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s))
  }

  const maxVelocity = Math.max(...sprints.map(s => Math.max(s.committed, s.completed)), 1)

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📈 Velocity & Capacity</h1>
        <p>Как измерять скорость команды и планировать спринты.</p>
      </div>

      {/* What is velocity */}
      <div className="card">
        <h3>Что такое Velocity?</h3>
        <p>
          <strong>Velocity</strong> — среднее количество Story Points, которые команда завершает за спринт.
          Это <strong>не метрика производительности</strong>, а инструмент планирования.
        </p>
        <div className="info-box" style={{ marginTop: 12 }}>
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <div className="info-box-title">Velocity — не KPI!</div>
            Нельзя сравнивать velocity разных команд. Нельзя требовать её рост. Это приведёт к инфляции Story Points.
          </div>
        </div>
      </div>

      {/* Velocity Chart */}
      <div className="card">
        <h3>📊 Velocity Chart</h3>
        <p style={{ marginBottom: 16, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Синяя полоса — запланировано, зелёная — выполнено. Редактируйте значения:
        </p>

        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 200, marginBottom: 16 }}>
          {sprints.map((s, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 160 }}>
                <div style={{
                  width: 20, height: `${(s.committed / maxVelocity) * 150}px`,
                  background: 'rgba(59, 130, 246, 0.3)', borderRadius: '3px 3px 0 0',
                }} />
                <div style={{
                  width: 20, height: `${(s.completed / maxVelocity) * 150}px`,
                  background: '#22c55e', borderRadius: '3px 3px 0 0',
                }} />
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.name.replace('Sprint ', 'S')}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, fontSize: '0.8rem', marginBottom: 16 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 12, height: 12, background: 'rgba(59,130,246,0.3)', borderRadius: 2 }} /> Committed
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 12, height: 12, background: '#22c55e', borderRadius: 2 }} /> Completed
          </span>
        </div>

        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ textAlign: 'left', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Спринт</th>
              <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Committed</th>
              <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Completed</th>
              <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>%</th>
            </tr>
          </thead>
          <tbody>
            {sprints.map((s, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: 8, fontSize: '0.9rem' }}>{s.name}</td>
                <td style={{ padding: 4, textAlign: 'center' }}>
                  <input type="number" min={1} max={100} value={s.committed}
                    onChange={e => updateSprint(i, 'committed', +e.target.value)}
                    style={{ width: 60, textAlign: 'center', padding: 4, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />
                </td>
                <td style={{ padding: 4, textAlign: 'center' }}>
                  <input type="number" min={0} max={100} value={s.completed}
                    onChange={e => updateSprint(i, 'completed', +e.target.value)}
                    style={{ width: 60, textAlign: 'center', padding: 4, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />
                </td>
                <td style={{ padding: 8, textAlign: 'center', fontSize: '0.85rem', color: s.completed >= s.committed ? '#22c55e' : '#ef4444' }}>
                  {Math.round(s.completed / s.committed * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
          <div className="score-display" style={{ flex: 1, minWidth: 120 }}>
            <div className="score-number">{stats.avg}</div>
            <div className="score-label">Ср. Velocity</div>
          </div>
          <div className="score-display" style={{ flex: 1, minWidth: 120 }}>
            <div className="score-number">{stats.commitmentRate}%</div>
            <div className="score-label">Commitment Rate</div>
          </div>
          <div className="score-display" style={{ flex: 1, minWidth: 120 }}>
            <div className="score-number">{stats.min}–{stats.max}</div>
            <div className="score-label">Диапазон</div>
          </div>
        </div>
      </div>

      {/* Capacity Calculator */}
      <div className="card">
        <h3>🧮 Capacity Planning</h3>
        <p style={{ marginBottom: 16 }}>Capacity = Люди × Дни × Focus Factor</p>
        <div className="grid-3">
          <div className="slider-container">
            <label>Длина спринта: <strong>{sprintLength} дней</strong></label>
            <input type="range" min={5} max={20} value={sprintLength} onChange={e => setSprintLength(+e.target.value)} />
          </div>
          <div className="slider-container">
            <label>Размер команды: <strong>{teamSize} чел.</strong></label>
            <input type="range" min={2} max={12} value={teamSize} onChange={e => setTeamSize(+e.target.value)} />
          </div>
          <div className="slider-container">
            <label>Focus Factor: <strong>{focusFactor}%</strong></label>
            <input type="range" min={30} max={100} step={5} value={focusFactor} onChange={e => setFocusFactor(+e.target.value)} />
          </div>
        </div>
        <div className="score-display" style={{ marginTop: 12 }}>
          <div className="score-number">{capacity}</div>
          <div className="score-label">Человеко-дней на спринт</div>
        </div>
        <div className="info-box">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <div className="info-box-title">Focus Factor</div>
            Обычно 60-80%. Учитывает встречи, код-ревью, баги, on-call, отпуска. Реальная команда редко работает
            на 100% над спринтовыми задачами.
          </div>
        </div>
      </div>

      {/* Release Forecasting */}
      <div className="card">
        <h3>🔮 Прогноз релиза</h3>
        <div className="slider-container">
          <label>Оставшийся Backlog: <strong>{remainingSP} SP</strong></label>
          <input type="range" min={10} max={500} step={10} value={remainingSP} onChange={e => setRemainingSP(+e.target.value)} />
        </div>

        <div className="grid-3" style={{ marginTop: 16 }}>
          <div style={{ padding: 16, borderRadius: 8, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 700 }}>🟢 Оптимистично</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#22c55e' }}>{sprintsToComplete.optimistic}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>спринтов (vel={stats.max})</div>
          </div>
          <div style={{ padding: 16, borderRadius: 8, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 700 }}>🔵 Вероятно</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6' }}>{sprintsToComplete.likely}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>спринтов (vel={stats.avg})</div>
          </div>
          <div style={{ padding: 16, borderRadius: 8, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700 }}>🔴 Пессимистично</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ef4444' }}>{sprintsToComplete.pessimistic}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>спринтов (vel={stats.min})</div>
          </div>
        </div>
      </div>
    </div>
  )
}
