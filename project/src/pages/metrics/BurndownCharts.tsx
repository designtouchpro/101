import { useState, useMemo } from 'react'

export default function BurndownCharts() {
  const [totalSP, setTotalSP] = useState(40)
  const [sprintDays, setSprintDays] = useState(10)
  const [scenario, setScenario] = useState<'ideal' | 'real' | 'scope-creep' | 'late-start'>('real')

  const chartHeight = 200
  const chartWidth = 500

  // Generate data
  const data = useMemo(() => {
    const ideal = Array.from({ length: sprintDays + 1 }, (_, i) => totalSP - (totalSP / sprintDays) * i)
    let actual: number[]
    switch (scenario) {
      case 'ideal':
        actual = ideal.map((v, i) => v + (Math.random() - 0.5) * 2)
        break
      case 'real':
        actual = [totalSP]
        for (let i = 1; i <= sprintDays; i++) {
          const remaining = actual[i - 1]
          const dailyBurn = totalSP / sprintDays * (0.5 + Math.random() * 1)
          actual.push(Math.max(0, remaining - dailyBurn))
        }
        break
      case 'scope-creep':
        actual = [totalSP]
        for (let i = 1; i <= sprintDays; i++) {
          const remaining = actual[i - 1]
          const dailyBurn = totalSP / sprintDays * (0.6 + Math.random() * 0.6)
          const added = i === 3 || i === 6 ? 8 : 0
          actual.push(Math.max(0, remaining - dailyBurn + added))
        }
        break
      case 'late-start':
        actual = [totalSP]
        for (let i = 1; i <= sprintDays; i++) {
          const remaining = actual[i - 1]
          const dailyBurn = i <= 3 ? totalSP / sprintDays * 0.2 : totalSP / sprintDays * 1.5
          actual.push(Math.max(0, remaining - dailyBurn))
        }
        break
    }
    return { ideal, actual }
  }, [totalSP, sprintDays, scenario])

  const maxVal = Math.max(totalSP, ...data.actual) * 1.1

  const toX = (i: number) => (i / sprintDays) * chartWidth
  const toY = (v: number) => chartHeight - (v / maxVal) * chartHeight

  const idealPath = data.ideal.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ')
  const actualPath = data.actual.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ')

  const scenarios = [
    { key: 'ideal' as const, label: '✅ Идеальный', desc: 'Команда сжигает SP равномерно' },
    { key: 'real' as const, label: '📊 Реалистичный', desc: 'Неравномерная скорость сжигания' },
    { key: 'scope-creep' as const, label: '📈 Scope Creep', desc: 'Добавляют задачи в середине спринта' },
    { key: 'late-start' as const, label: '🐌 Поздний старт', desc: 'Медленно начали, потом ускорились' },
  ]

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📉 Burndown & Burnup</h1>
        <p>Графики прогресса спринта: как читать и интерпретировать.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Burndown chart</strong> показывает, сколько работы осталось в спринте. Идеальная линия идёт 
          из левого верхнего угла (все SP) в правый нижний (0 SP). Реальная линия обычно «ступенчатая» — 
          задачи закрываются не каждый день. Если реальная линия выше идеальной — спринт отстаёт; ниже — опережает.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Burnup chart</strong> — зеркальный подход: показывает, сколько работы сделано (вверх). 
          Его преимущество — видно изменение scope: если верхняя граница растёт, значит в спринт добавили задачи.
          Burndown это скрывает. Оба графика — инструменты прозрачности, а не контроля. Они помогают команде 
          самостоятельно принимать решения: нужно ли сократить scope, попросить помощь или пересмотреть план.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>⚠️ Анти-паттерн</strong>: Использовать burndown для оценки производительности отдельных разработчиков. 
            Это командная метрика. Индивидуальное измерение приводит к «закрытию» задач ради графика, а не ради качества.
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="card">
        <h3>🎛 Настройки</h3>
        <div className="grid-2">
          <div className="slider-container">
            <label>Story Points в спринте: <strong>{totalSP}</strong></label>
            <input type="range" min={10} max={80} value={totalSP} onChange={e => setTotalSP(+e.target.value)} />
          </div>
          <div className="slider-container">
            <label>Длина спринта: <strong>{sprintDays} дней</strong></label>
            <input type="range" min={5} max={15} value={sprintDays} onChange={e => setSprintDays(+e.target.value)} />
          </div>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="card">
        <h3>Сценарий</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {scenarios.map(s => (
            <button
              key={s.key}
              onClick={() => setScenario(s.key)}
              style={{
                padding: '8px 16px', borderRadius: 8, fontSize: '0.85rem',
                border: scenario === s.key ? '2px solid var(--accent-main)' : '1px solid var(--border-color)',
                background: scenario === s.key ? 'rgba(59,130,246,0.1)' : 'var(--bg-secondary)',
                color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 500,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p style={{ marginTop: 8, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {scenarios.find(s => s.key === scenario)?.desc}
        </p>
      </div>

      {/* Burndown Chart */}
      <div className="card">
        <h3>Burndown Chart</h3>
        <div style={{ overflowX: 'auto' }}>
          <svg width={chartWidth + 60} height={chartHeight + 40} style={{ display: 'block', margin: '0 auto' }}>
            <g transform="translate(40, 10)">
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map(frac => (
                <g key={frac}>
                  <line x1={0} y1={toY(maxVal * frac)} x2={chartWidth} y2={toY(maxVal * frac)}
                    stroke="var(--border-color)" strokeDasharray="4,4" />
                  <text x={-8} y={toY(maxVal * frac) + 4} textAnchor="end" fill="var(--text-muted)" fontSize={10}>
                    {Math.round(maxVal * frac)}
                  </text>
                </g>
              ))}

              {/* Day labels */}
              {Array.from({ length: sprintDays + 1 }, (_, i) => (
                <text key={i} x={toX(i)} y={chartHeight + 18} textAnchor="middle" fill="var(--text-muted)" fontSize={10}>
                  D{i}
                </text>
              ))}

              {/* Ideal line */}
              <path d={idealPath} fill="none" stroke="var(--text-muted)" strokeWidth={2} strokeDasharray="6,4" opacity={0.5} />

              {/* Actual line */}
              <path d={actualPath} fill="none" stroke="var(--accent-main)" strokeWidth={3} />

              {/* Dots */}
              {data.actual.map((v, i) => (
                <circle key={i} cx={toX(i)} cy={toY(v)} r={4} fill="var(--accent-main)" />
              ))}
            </g>
          </svg>
        </div>

        <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: '0.8rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 20, height: 2, background: 'var(--text-muted)', display: 'inline-block', borderTop: '2px dashed var(--text-muted)' }} />
            Идеальная линия
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 20, height: 3, background: 'var(--accent-main)', display: 'inline-block', borderRadius: 2 }} />
            Фактический прогресс
          </span>
        </div>
      </div>

      {/* Interpretation */}
      <div className="card">
        <h3>📖 Как читать Burndown</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { pattern: 'Линия ниже идеальной', meaning: '🟢 Команда опережает план. Можно взять задачи из бэклога.', color: '#22c55e' },
            { pattern: 'Линия выше идеальной', meaning: '🔴 Команда отстаёт. Нужно обсудить блокеры или сократить скоуп.', color: '#ef4444' },
            { pattern: 'Скачки вверх', meaning: '⚠️ Scope creep — добавлены задачи в спринт. Это нарушает Sprint Goal (цель спринта).', color: '#f59e0b' },
            { pattern: 'Плато в начале', meaning: '🐌 Медленный старт. Возможно, слишком долгий анализ или блокеры.', color: '#a855f7' },
            { pattern: 'Резкое падение в конце', meaning: '🏃 "Хоккейная клюшка" — задачи закрываются в последний день. Признак плохой декомпозиции.', color: '#06b6d4' },
          ].map(item => (
            <div key={item.pattern} style={{
              padding: 12, borderRadius: 8, borderLeft: `3px solid ${item.color}`,
              background: 'var(--bg-code)',
            }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.pattern}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 4 }}>{item.meaning}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
