import { useState } from 'react'

export default function FinancialModel() {
  // Revenue inputs
  const [monthlyNewUsers, setMonthlyNewUsers] = useState(1000)
  const [conversionRate, setConversionRate] = useState(5)
  const [arpu, setArpu] = useState(29)
  const [monthlyChurn, setMonthlyChurn] = useState(5)

  // Cost inputs
  const [cac, setCac] = useState(50)
  const [fixedCosts, setFixedCosts] = useState(15000)
  const [variableCostPct, setVariableCostPct] = useState(20)

  // Calculate 12-month model
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  let cumulativeUsers = 0
  const model = months.map(month => {
    const newPaying = Math.round(monthlyNewUsers * conversionRate / 100)
    const churned = Math.round(cumulativeUsers * monthlyChurn / 100)
    cumulativeUsers = cumulativeUsers + newPaying - churned
    if (cumulativeUsers < 0) cumulativeUsers = 0

    const revenue = cumulativeUsers * arpu
    const acquisitionCost = newPaying * cac
    const variableCost = Math.round(revenue * variableCostPct / 100)
    const totalCost = fixedCosts + acquisitionCost + variableCost
    const profit = revenue - totalCost
    const margin = revenue > 0 ? Math.round(profit / revenue * 100) : 0

    return { month, newPaying, churned, totalUsers: cumulativeUsers, revenue, acquisitionCost, variableCost, totalCost, profit, margin }
  })

  const ltv = monthlyChurn > 0 ? arpu / (monthlyChurn / 100) : arpu * 120
  const ltvCacRatio = ltv / cac
  const paybackMonths = arpu > 0 ? Math.ceil(cac / arpu) : 999
  const totalRevenue = model.reduce((sum, m) => sum + m.revenue, 0)
  const totalProfit = model.reduce((sum, m) => sum + m.profit, 0)
  const breakEvenMonth = model.findIndex(m => m.profit > 0) + 1

  const maxBar = Math.max(...model.map(m => Math.max(m.revenue, m.totalCost)))

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📊 Финансовая модель</h1>
        <p>P&L прогноз для SaaS: считаем unit-экономику, LTV/CAC, точку безубыточности.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Финансовая модель</strong> — инструмент прогнозирования доходов и расходов.
          Для SaaS ключевые метрики: <strong>LTV/CAC</strong> (должен быть &gt;3),
          <strong>CAC Payback</strong> (&lt;12 мес), <strong>Monthly Churn</strong> (&lt;5%).
          Модель помогает ответить: когда выйдем в прибыль и сколько нужно инвестиций?
        </p>
        <div className="info-box">
          <strong>🎯 Rule of 40</strong>: Growth Rate + Profit Margin ≥ 40%. Если растём на 100% в год
          при margin -60%, это ОК (100-60=40). Если растём на 10%, нужен margin ≥30%.
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>📈 Доходная часть</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                Новых пользователей / мес: <strong>{monthlyNewUsers.toLocaleString()}</strong>
              </label>
              <input type="range" min={100} max={10000} step={100} value={monthlyNewUsers}
                onChange={e => setMonthlyNewUsers(+e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                Конверсия в платящих: <strong>{conversionRate}%</strong>
              </label>
              <input type="range" min={1} max={30} value={conversionRate}
                onChange={e => setConversionRate(+e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                ARPU ($/мес): <strong>${arpu}</strong>
              </label>
              <input type="range" min={5} max={200} value={arpu}
                onChange={e => setArpu(+e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                Monthly Churn: <strong>{monthlyChurn}%</strong>
              </label>
              <input type="range" min={1} max={20} value={monthlyChurn}
                onChange={e => setMonthlyChurn(+e.target.value)} style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        <div className="card">
          <h3>💸 Расходная часть</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                CAC ($/пользователь): <strong>${cac}</strong>
              </label>
              <input type="range" min={5} max={500} value={cac}
                onChange={e => setCac(+e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                Fixed Costs $/мес (команда, офис): <strong>${fixedCosts.toLocaleString()}</strong>
              </label>
              <input type="range" min={1000} max={100000} step={1000} value={fixedCosts}
                onChange={e => setFixedCosts(+e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                Variable Costs (% от Revenue): <strong>{variableCostPct}%</strong>
              </label>
              <input type="range" min={5} max={60} value={variableCostPct}
                onChange={e => setVariableCostPct(+e.target.value)} style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ background: 'var(--accent-main-alpha)' }}>
        <h3>🔑 Ключевые метрики</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
          {[
            { label: 'LTV', value: `$${Math.round(ltv)}`, ok: ltv > cac * 3 },
            { label: 'CAC', value: `$${cac}`, ok: true },
            { label: 'LTV/CAC', value: ltvCacRatio.toFixed(1) + 'x', ok: ltvCacRatio >= 3 },
            { label: 'CAC Payback', value: `${paybackMonths} мес`, ok: paybackMonths <= 12 },
            { label: 'Breakeven', value: breakEvenMonth > 0 ? `Мес ${breakEvenMonth}` : 'Нет', ok: breakEvenMonth > 0 && breakEvenMonth <= 12 },
            { label: 'Year Revenue', value: `$${(totalRevenue / 1000).toFixed(0)}K`, ok: true },
          ].map(m => (
            <div key={m.label} style={{ textAlign: 'center', padding: '12px 8px', borderRadius: 8, background: 'var(--bg-primary)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{m.label}</div>
              <div style={{
                fontSize: '1.3rem', fontWeight: 800,
                color: m.ok ? '#22c55e' : '#ef4444'
              }}>{m.value}</div>
            </div>
          ))}
        </div>
        {ltvCacRatio < 3 && (
          <div style={{ marginTop: 12, padding: '8px 14px', background: 'rgba(239,68,68,0.1)', borderRadius: 8, fontSize: '0.85rem', color: '#ef4444' }}>
            ⚠️ LTV/CAC &lt; 3x. Бизнес-модель нежизнеспособна: тратим на привлечение больше, чем зарабатываем.
          </div>
        )}
      </div>

      <div className="card">
        <h3>📉 Revenue vs Costs (12 месяцев)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {model.map(m => (
            <div key={m.month} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 50, fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                Мес {m.month}
              </div>
              <div style={{ flex: 1, position: 'relative', height: 28 }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, height: 12,
                  width: `${maxBar > 0 ? (m.revenue / maxBar) * 100 : 0}%`,
                  background: '#22c55e', borderRadius: 3, minWidth: 2
                }} />
                <div style={{
                  position: 'absolute', top: 14, left: 0, height: 12,
                  width: `${maxBar > 0 ? (m.totalCost / maxBar) * 100 : 0}%`,
                  background: '#ef4444', borderRadius: 3, opacity: 0.7, minWidth: 2
                }} />
              </div>
              <div style={{ width: 90, fontSize: '0.75rem', textAlign: 'right', fontWeight: 600, color: m.profit >= 0 ? '#22c55e' : '#ef4444' }}>
                {m.profit >= 0 ? '+' : ''}{(m.profit / 1000).toFixed(1)}K
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <span>🟢 Revenue</span>
          <span>🔴 Total Costs</span>
        </div>
      </div>

      <div className="card">
        <h3>📋 P&L таблица</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ fontSize: '0.8rem' }}>
            <thead>
              <tr>
                <th>Месяц</th>
                <th>New Paid</th>
                <th>Churned</th>
                <th>Total Users</th>
                <th>Revenue</th>
                <th>Total Costs</th>
                <th>Profit</th>
                <th>Margin</th>
              </tr>
            </thead>
            <tbody>
              {model.map(m => (
                <tr key={m.month}>
                  <td><strong>{m.month}</strong></td>
                  <td style={{ color: '#22c55e' }}>+{m.newPaying}</td>
                  <td style={{ color: '#ef4444' }}>-{m.churned}</td>
                  <td style={{ fontWeight: 600 }}>{m.totalUsers.toLocaleString()}</td>
                  <td>${m.revenue.toLocaleString()}</td>
                  <td>${m.totalCost.toLocaleString()}</td>
                  <td style={{ fontWeight: 700, color: m.profit >= 0 ? '#22c55e' : '#ef4444' }}>
                    {m.profit >= 0 ? '+' : ''}${m.profit.toLocaleString()}
                  </td>
                  <td style={{ color: m.margin >= 0 ? '#22c55e' : '#ef4444' }}>{m.margin}%</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 800 }}>
                <td>Итого</td>
                <td colSpan={3}></td>
                <td>${totalRevenue.toLocaleString()}</td>
                <td>${model.reduce((s, m) => s + m.totalCost, 0).toLocaleString()}</td>
                <td style={{ color: totalProfit >= 0 ? '#22c55e' : '#ef4444' }}>
                  {totalProfit >= 0 ? '+' : ''}${totalProfit.toLocaleString()}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
