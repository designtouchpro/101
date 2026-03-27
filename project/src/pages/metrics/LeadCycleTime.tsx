import { useState, useMemo } from 'react'

interface Task {
  id: number
  title: string
  created: number
  started: number
  done: number
}

export default function LeadCycleTime() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Фикс бага в чекауте', created: 1, started: 2, done: 3 },
    { id: 2, title: 'Новый фильтр каталога', created: 1, started: 3, done: 7 },
    { id: 3, title: 'Рефакторинг API', created: 2, started: 5, done: 10 },
    { id: 4, title: 'Добавить график аналитики', created: 3, started: 4, done: 6 },
    { id: 5, title: 'Интеграция email-сервиса', created: 2, started: 6, done: 12 },
    { id: 6, title: 'Обновить документацию', created: 5, started: 5, done: 6 },
    { id: 7, title: 'Миграция базы данных', created: 3, started: 8, done: 14 },
    { id: 8, title: 'Верстка лендинга', created: 6, started: 7, done: 9 },
  ])

  const stats = useMemo(() => {
    const leadTimes = tasks.map(t => t.done - t.created)
    const cycleTimes = tasks.map(t => t.done - t.started)
    const waitTimes = tasks.map(t => t.started - t.created)

    const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length
    const p85 = (arr: number[]) => {
      const sorted = [...arr].sort((a, b) => a - b)
      return sorted[Math.floor(sorted.length * 0.85)]
    }

    return {
      avgLead: avg(leadTimes).toFixed(1),
      avgCycle: avg(cycleTimes).toFixed(1),
      avgWait: avg(waitTimes).toFixed(1),
      p85Lead: p85(leadTimes),
      p85Cycle: p85(cycleTimes),
      leadTimes,
      cycleTimes,
      waitTimes,
    }
  }, [tasks])

  const updateTask = (id: number, field: 'created' | 'started' | 'done', value: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t
      const updated = { ...t, [field]: value }
      // Ensure order: created <= started <= done
      if (updated.started < updated.created) updated.started = updated.created
      if (updated.done < updated.started) updated.done = updated.started
      return updated
    }))
  }

  const maxDay = Math.max(...tasks.map(t => t.done)) + 1

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>⏱️ Lead Time & Cycle Time</h1>
        <p>Как измерять скорость доставки и находить узкие места.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Lead Time</strong> и <strong>Cycle Time</strong> — ключевые метрики потока (flow metrics) из Kanban. 
          Lead Time — полное время от момента, когда запрос появился (создана задача), до момента, когда он доставлен пользователю. 
          Cycle Time — только активная фаза: от начала работы до завершения. Разница между ними — 
          это время ожидания в очереди (queue time), часто самый большой источник потерь.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Эти метрики входят в <strong>DORA metrics</strong> (DevOps Research and Assessment) — 
          четыре ключевых показателя эффективности IT-команд. Lead Time for Changes — один из них. 
          Цель не в том, чтобы «гнать быстрее», а в том, чтобы находить bottleneck'и: 
          если Cycle Time 2 дня, а Lead Time 10 дней — проблема не в разработке, а в очереди или процессе review.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>📊 Бенчмарки</strong>: По данным DORA, elite-команды имеют Lead Time менее 1 дня, 
            high — от 1 дня до 1 недели, medium — 1-6 месяцев, low — более 6 месяцев. 
            Измеряйте свой Lead Time и ставьте цель перейти на уровень выше.
          </div>
        </div>
      </div>

      {/* Definitions */}
      <div className="card">
        <h3>Что есть что?</h3>
        <div className="grid-3">
          <div style={{ padding: 16, borderRadius: 8, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <div style={{ fontWeight: 700, color: '#3b82f6', marginBottom: 4 }}>Lead Time</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              От создания задачи до завершения. Включает время ожидания.
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: 8, color: 'var(--text-muted)' }}>Created → Done</div>
          </div>
          <div style={{ padding: 16, borderRadius: 8, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <div style={{ fontWeight: 700, color: '#22c55e', marginBottom: 4 }}>Cycle Time</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              От начала работы до завершения. Только активная работа.
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: 8, color: 'var(--text-muted)' }}>Started → Done</div>
          </div>
          <div style={{ padding: 16, borderRadius: 8, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <div style={{ fontWeight: 700, color: '#f59e0b', marginBottom: 4 }}>Wait Time</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Время ожидания в бэклоге. Lead Time − Cycle Time.
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: 8, color: 'var(--text-muted)' }}>Created → Started</div>
          </div>
        </div>
      </div>

      {/* Interactive Table */}
      <div className="card" style={{ overflowX: 'auto' }}>
        <h3>📋 Задачи (редактируйте дни)</h3>
        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ textAlign: 'left', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Задача</th>
              <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Создана (день)</th>
              <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Начата (день)</th>
              <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Готова (день)</th>
              <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: '#f59e0b' }}>Wait</th>
              <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: '#22c55e' }}>Cycle</th>
              <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: '#3b82f6' }}>Lead</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, i) => (
              <tr key={t.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: 8, fontSize: '0.85rem', fontWeight: 500 }}>{t.title}</td>
                {(['created', 'started', 'done'] as const).map(field => (
                  <td key={field} style={{ padding: 4, textAlign: 'center' }}>
                    <input type="number" min={1} max={30} value={t[field]}
                      onChange={e => updateTask(t.id, field, +e.target.value)}
                      style={{ width: 50, textAlign: 'center', padding: 4, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                    />
                  </td>
                ))}
                <td style={{ padding: 8, textAlign: 'center', fontWeight: 600, color: '#f59e0b' }}>{stats.waitTimes[i]}d</td>
                <td style={{ padding: 8, textAlign: 'center', fontWeight: 600, color: '#22c55e' }}>{stats.cycleTimes[i]}d</td>
                <td style={{ padding: 8, textAlign: 'center', fontWeight: 600, color: '#3b82f6' }}>{stats.leadTimes[i]}d</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visual Timeline */}
      <div className="card">
        <h3>📊 Визуализация (Gantt-подобная)</h3>
        <div style={{ overflowX: 'auto' }}>
          {tasks.map(t => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 180, fontSize: '0.75rem', color: 'var(--text-secondary)', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {t.title}
              </div>
              <div style={{ flex: 1, position: 'relative', height: 20, background: 'var(--bg-code)', borderRadius: 4 }}>
                {/* Wait time */}
                <div style={{
                  position: 'absolute', left: `${(t.created / maxDay) * 100}%`,
                  width: `${((t.started - t.created) / maxDay) * 100}%`,
                  height: '100%', background: 'rgba(245,158,11,0.3)', borderRadius: '4px 0 0 4px',
                }} />
                {/* Cycle time */}
                <div style={{
                  position: 'absolute', left: `${(t.started / maxDay) * 100}%`,
                  width: `${((t.done - t.started) / maxDay) * 100}%`,
                  height: '100%', background: 'rgba(34,197,94,0.5)', borderRadius: '0 4px 4px 0',
                }} />
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', marginLeft: 188, marginTop: 8 }}>
            {Array.from({ length: maxDay }, (_, i) => (
              <span key={i} style={{ flex: 1, fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center' }}>D{i + 1}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 12, fontSize: '0.8rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 12, height: 12, background: 'rgba(245,158,11,0.3)', borderRadius: 2 }} /> Wait Time
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 12, height: 12, background: 'rgba(34,197,94,0.5)', borderRadius: 2 }} /> Cycle Time
          </span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="card">
        <h3>📊 Сводка</h3>
        <div className="grid-3">
          <div className="score-display">
            <div className="score-number" style={{ color: '#3b82f6' }}>{stats.avgLead}d</div>
            <div className="score-label">Avg Lead Time</div>
          </div>
          <div className="score-display">
            <div className="score-number" style={{ color: '#22c55e' }}>{stats.avgCycle}d</div>
            <div className="score-label">Avg Cycle Time</div>
          </div>
          <div className="score-display">
            <div className="score-number" style={{ color: '#f59e0b' }}>{stats.avgWait}d</div>
            <div className="score-label">Avg Wait Time</div>
          </div>
        </div>

        <div className="info-box" style={{ marginTop: 16 }}>
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <div className="info-box-title">85-й перцентиль (SLA)</div>
            Lead Time P85 = <strong>{stats.p85Lead}d</strong>, Cycle Time P85 = <strong>{stats.p85Cycle}d</strong>.
            P85 часто используют для SLA: «85% задач выполняются за N дней».
            Это честнее, чем среднее, т.к. выбросы не искажают картину.
          </div>
        </div>
      </div>

      {/* How to improve */}
      <div className="card">
        <h3>🛠 Как уменьшить Lead Time</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { tip: 'Уменьшайте Wait Time', desc: 'Сокращайте бэклог. Задача не должна ждать неделями.' },
            { tip: 'Ограничьте WIP', desc: 'Меньше параллельных задач = быстрее каждая отдельная.' },
            { tip: 'Декомпозируйте', desc: 'Мелкие задачи = меньше Cycle Time = быстрее фидбек.' },
            { tip: 'Автоматизируйте CI/CD', desc: 'Убирайте ручные шаги: код-ревью, деплой, тестирование.' },
          ].map(t => (
            <div key={t.tip} style={{ padding: 10, borderRadius: 6, background: 'var(--bg-code)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>⚡ {t.tip}: </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
