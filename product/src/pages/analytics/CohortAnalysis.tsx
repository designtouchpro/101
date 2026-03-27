import { useState, useMemo } from 'react'

export default function CohortAnalysis() {
  const [baseRetention, setBaseRetention] = useState(40)
  const [decayRate, setDecayRate] = useState(30)
  const [cohortSize, setCohortSize] = useState(1000)
  const [selectedCell, setSelectedCell] = useState<{ week: number; day: number } | null>(null)

  const weeks = 6
  const days = [0, 1, 3, 7, 14, 30]

  // Generate cohort data
  const cohorts = useMemo(() => {
    return Array.from({ length: weeks }, (_, weekIdx) => {
      const size = cohortSize + Math.round((Math.random() - 0.5) * 200)
      const improvement = weekIdx * 2 // newer cohorts slightly better
      return {
        week: `Неделя ${weekIdx + 1}`,
        size,
        retention: days.map((day) => {
          if (day === 0) return 100
          const base = baseRetention + improvement
          const rate = base * Math.pow(1 - decayRate / 100, Math.log2(day))
          return Math.max(1, Math.min(100, Math.round(rate + (Math.random() - 0.5) * 5)))
        }),
      }
    })
  }, [baseRetention, decayRate, cohortSize, weeks])

  const getColor = (value: number) => {
    if (value >= 60) return 'rgba(16, 185, 129, 0.6)'
    if (value >= 40) return 'rgba(16, 185, 129, 0.35)'
    if (value >= 25) return 'rgba(245, 158, 11, 0.35)'
    if (value >= 10) return 'rgba(239, 68, 68, 0.25)'
    return 'rgba(239, 68, 68, 0.15)'
  }

  const avgRetention = days.map((_, dayIdx) => {
    const values = cohorts.map(c => c.retention[dayIdx])
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
  })

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📊 Когортный анализ</h1>
        <p>Retention-таблицы: как пользователи возвращаются в продукт со временем.</p>
      </div>

      {/* What is a cohort */}
      <div className="card">
        <h3>Что такое когорта?</h3>
        <p>
          <strong>Когорта</strong> — группа пользователей, объединённых по времени первого действия
          (регистрация, первая покупка). Анализируя когорты, мы видим, как <strong>retention</strong> меняется
          со временем и улучшается ли продукт.
        </p>
        <div className="info-box" style={{ marginTop: 12 }}>
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <div className="info-box-title">Зачем когорты, а не общий retention?</div>
            Общий retention маскирует проблемы. Если приток новых юзеров растёт, DAU растёт — но retention может падать.
            Когорты показывают <strong>реальную картину</strong>.
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="card">
        <h3>🎛 Настройки симуляции</h3>
        <div className="grid-3">
          <div className="slider-container">
            <label>D1 Retention: <strong>{baseRetention}%</strong></label>
            <input type="range" min={10} max={80} value={baseRetention} onChange={e => setBaseRetention(+e.target.value)} />
          </div>
          <div className="slider-container">
            <label>Скорость оттока: <strong>{decayRate}%</strong></label>
            <input type="range" min={5} max={60} value={decayRate} onChange={e => setDecayRate(+e.target.value)} />
          </div>
          <div className="slider-container">
            <label>Размер когорты: <strong>~{cohortSize}</strong></label>
            <input type="range" min={100} max={5000} step={100} value={cohortSize} onChange={e => setCohortSize(+e.target.value)} />
          </div>
        </div>
      </div>

      {/* Cohort Table */}
      <div className="card" style={{ overflowX: 'auto' }}>
        <h3>📋 Retention Table</h3>
        <p style={{ marginBottom: 12, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Кликните на ячейку для подробностей. Цвет отражает процент retention.
        </p>

        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>Когорта</th>
              <th style={{ textAlign: 'right', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>Размер</th>
              {days.map(d => (
                <th key={d} style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                  D{d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cohorts.map((cohort, weekIdx) => (
              <tr key={weekIdx}>
                <td style={{ padding: 8, fontSize: '0.85rem', fontWeight: 500 }}>{cohort.week}</td>
                <td style={{ padding: 8, fontSize: '0.85rem', textAlign: 'right', color: 'var(--text-muted)' }}>{cohort.size}</td>
                {cohort.retention.map((ret, dayIdx) => (
                  <td
                    key={dayIdx}
                    style={{
                      padding: 8,
                      textAlign: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      background: getColor(ret),
                      borderRadius: selectedCell?.week === weekIdx && selectedCell?.day === dayIdx ? 0 : 4,
                      cursor: 'pointer',
                      outline: selectedCell?.week === weekIdx && selectedCell?.day === dayIdx ? '2px solid var(--accent-main)' : 'none',
                    }}
                    onClick={() => setSelectedCell(selectedCell?.week === weekIdx && selectedCell?.day === dayIdx ? null : { week: weekIdx, day: dayIdx })}
                  >
                    {ret}%
                  </td>
                ))}
              </tr>
            ))}
            {/* Average row */}
            <tr style={{ borderTop: '2px solid var(--border-color)' }}>
              <td style={{ padding: 8, fontSize: '0.85rem', fontWeight: 700 }}>Среднее</td>
              <td style={{ padding: 8, textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.85rem' }}>—</td>
              {avgRetention.map((ret, i) => (
                <td key={i} style={{ padding: 8, textAlign: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-main)' }}>
                  {ret}%
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {selectedCell && (
          <div className="info-box" style={{ marginTop: 12 }}>
            <div className="info-box-content">
              <div className="info-box-title">
                {cohorts[selectedCell.week].week}, D{days[selectedCell.day]}
              </div>
              Из {cohorts[selectedCell.week].size} пользователей вернулись{' '}
              <strong>{Math.round(cohorts[selectedCell.week].size * cohorts[selectedCell.week].retention[selectedCell.day] / 100)}</strong>{' '}
              ({cohorts[selectedCell.week].retention[selectedCell.day]}%)
              {selectedCell.day > 0 && selectedCell.week > 0 && (
                <span style={{ color: 'var(--text-muted)' }}>
                  {' '}| vs предыдущая когорта: {cohorts[selectedCell.week - 1].retention[selectedCell.day]}%
                  {' '}({cohorts[selectedCell.week].retention[selectedCell.day] > cohorts[selectedCell.week - 1].retention[selectedCell.day] ? '📈 улучшение' : '📉 ухудшение'})
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Retention Curve (text-based) */}
      <div className="card">
        <h3>📈 Кривая удержания (средняя)</h3>
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 200, padding: '0 20px' }}>
          {avgRetention.map((ret, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-main)' }}>{ret}%</span>
              <div style={{
                width: '100%',
                maxWidth: 60,
                height: `${ret * 1.6}px`,
                background: `linear-gradient(to top, var(--accent-main), rgba(16, 185, 129, 0.3))`,
                borderRadius: '4px 4px 0 0',
                transition: 'height 0.4s ease',
              }} />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>D{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Benchmarks */}
      <div className="card">
        <h3>📏 Бенчмарки Retention</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ textAlign: 'left', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Тип продукта</th>
                <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>D1</th>
                <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>D7</th>
                <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>D30</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: 'Социальная сеть', d1: '30-40%', d7: '15-25%', d30: '10-20%' },
                { type: 'E-commerce', d1: '15-25%', d7: '5-10%', d30: '3-7%' },
                { type: 'SaaS B2B', d1: '50-70%', d7: '40-60%', d30: '30-50%' },
                { type: 'Мобильная игра', d1: '25-40%', d7: '10-15%', d30: '3-8%' },
                { type: 'Мессенджер', d1: '40-60%', d7: '30-50%', d30: '25-45%' },
              ].map(row => (
                <tr key={row.type} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: 8, fontSize: '0.9rem' }}>{row.type}</td>
                  <td style={{ padding: 8, textAlign: 'center', fontSize: '0.85rem' }}>{row.d1}</td>
                  <td style={{ padding: 8, textAlign: 'center', fontSize: '0.85rem' }}>{row.d7}</td>
                  <td style={{ padding: 8, textAlign: 'center', fontSize: '0.85rem' }}>{row.d30}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
