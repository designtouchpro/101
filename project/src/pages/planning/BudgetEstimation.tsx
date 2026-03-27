import { useState } from 'react'

interface CostItem {
  role: string
  rate: number
  hours: number
  count: number
}

const defaultTeam: CostItem[] = [
  { role: 'Project Manager', rate: 3500, hours: 160, count: 1 },
  { role: 'Backend Developer', rate: 3000, hours: 160, count: 2 },
  { role: 'Frontend Developer', rate: 2800, hours: 160, count: 1 },
  { role: 'QA Engineer', rate: 2200, hours: 160, count: 1 },
  { role: 'Designer', rate: 2500, hours: 80, count: 1 },
]

const contingencyLevels = [
  { label: 'Знакомая область', pct: 10, color: '#22c55e' },
  { label: 'Средняя неопределённость', pct: 25, color: '#f59e0b' },
  { label: 'Высокая неопределённость', pct: 40, color: '#ef4444' },
  { label: 'R&D / новая технология', pct: 60, color: '#a855f7' },
]

export default function BudgetEstimation() {
  const [team, setTeam] = useState<CostItem[]>(defaultTeam)
  const [contingency, setContingency] = useState(25)
  const [months, setMonths] = useState(3)
  const [infraCost, setInfraCost] = useState(500)
  const [licenseCost, setLicenseCost] = useState(200)

  const monthlySalary = team.reduce((sum, t) => sum + t.rate * t.count, 0)
  const totalSalary = monthlySalary * months
  const monthlyInfra = infraCost + licenseCost
  const totalInfra = monthlyInfra * months
  const subtotal = totalSalary + totalInfra
  const contingencyAmount = Math.round(subtotal * contingency / 100)
  const grandTotal = subtotal + contingencyAmount

  const updateTeamField = (index: number, field: keyof CostItem, value: number) => {
    setTeam(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item))
  }

  const addRole = () => {
    setTeam(prev => [...prev, { role: 'New Role', rate: 2000, hours: 160, count: 1 }])
  }

  const removeRole = (index: number) => {
    setTeam(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>💰 Бюджетирование проекта</h1>
        <p>Bottom-up оценка стоимости, резервы и финансовое планирование.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Bottom-up estimation</strong> — самый точный метод бюджетирования: собираем стоимость каждого
          ресурса (команда, инфраструктура, лицензии) и суммируем. Сверху добавляем <strong>contingency reserve</strong> —
          запас на известные риски. Для проектов с высокой неопределённостью используют <strong>management reserve</strong> —
          дополнительный буфер, который контролирует спонсор.
        </p>
        <div className="info-box">
          <strong>📌 Правило</strong>: Бюджет = BAC (Budget at Completion) = сумма всех плановых затрат + contingency.
          EAC (Estimate at Completion) пересчитывается по мере выполнения проекта.
        </div>
      </div>

      <div className="card">
        <h3>👥 Команда проекта</h3>
        <table className="data-table" style={{ marginBottom: 16 }}>
          <thead>
            <tr>
              <th>Роль</th>
              <th>Ставка $/мес</th>
              <th>Кол-во</th>
              <th>Стоимость/мес</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {team.map((t, i) => (
              <tr key={i}>
                <td>
                  <input
                    className="input"
                    value={t.role}
                    onChange={e => setTeam(prev => prev.map((item, j) => j === i ? { ...item, role: e.target.value } : item))}
                    style={{ width: 160 }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="input"
                    value={t.rate}
                    onChange={e => updateTeamField(i, 'rate', +e.target.value)}
                    style={{ width: 100 }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="input"
                    value={t.count}
                    onChange={e => updateTeamField(i, 'count', +e.target.value)}
                    style={{ width: 60 }}
                  />
                </td>
                <td style={{ fontWeight: 600 }}>${(t.rate * t.count).toLocaleString()}</td>
                <td>
                  <button className="btn" onClick={() => removeRole(i)} style={{ padding: '4px 8px', fontSize: '0.75rem' }}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn" onClick={addRole}>+ Добавить роль</button>
      </div>

      <div className="card">
        <h3>🖥️ Инфраструктура и лицензии</h3>
        <div className="grid-2" style={{ marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>
              Инфраструктура $/мес (облако, серверы)
            </label>
            <input type="number" className="input" value={infraCost} onChange={e => setInfraCost(+e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>
              Лицензии $/мес (Jira, Figma, ...)
            </label>
            <input type="number" className="input" value={licenseCost} onChange={e => setLicenseCost(+e.target.value)} />
          </div>
        </div>
      </div>

      <div className="card">
        <h3>⏱️ Длительность и резерв</h3>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>
            Длительность проекта (месяцы)
          </label>
          <input type="range" min={1} max={12} value={months} onChange={e => setMonths(+e.target.value)}
            style={{ width: '100%' }} />
          <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '1.2rem' }}>{months} мес.</div>
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>
            Contingency Reserve (% от бюджета)
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {contingencyLevels.map(c => (
              <button
                key={c.pct}
                className={`btn ${contingency === c.pct ? 'btn-primary' : ''}`}
                onClick={() => setContingency(c.pct)}
                style={contingency === c.pct ? { background: c.color, borderColor: c.color } : {}}
              >
                {c.label} ({c.pct}%)
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ background: 'var(--accent-main-alpha)' }}>
        <h3>📊 Итоговый бюджет</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Команда / мес</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>${monthlySalary.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Инфра + лицензии / мес</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>${monthlyInfra.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Subtotal ({months} мес.)</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>${subtotal.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Contingency ({contingency}%)</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f59e0b' }}>+${contingencyAmount.toLocaleString()}</div>
          </div>
        </div>
        <div style={{ marginTop: 20, padding: '16px 20px', background: 'var(--bg-primary)', borderRadius: 10, textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>BAC (Budget at Completion)</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-main)' }}>${grandTotal.toLocaleString()}</div>
        </div>
      </div>

      <div className="card">
        <h3>📐 Методы оценки бюджета</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Метод</th>
              <th>Точность</th>
              <th>Когда применять</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Аналоговая (сверху-вниз)', '±25-50%', 'Начало проекта, мало информации'],
              ['Параметрическая', '±15-25%', 'Есть исторические данные похожих проектов'],
              ['Bottom-up', '±5-15%', 'Детальный план работ готов'],
              ['PERT (3-точечная)', '±10-20%', 'Задачи с высокой неопределённостью'],
            ].map(([method, accuracy, when]) => (
              <tr key={method as string}>
                <td><strong>{method}</strong></td>
                <td><span className="badge">{accuracy}</span></td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
