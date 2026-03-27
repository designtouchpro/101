import { useState } from 'react'

export default function UnitEconomics() {
  const [arpu, setArpu] = useState(15)
  const [avgLifetime, setAvgLifetime] = useState(12)
  const [cac, setCac] = useState(50)
  const [adSpend, setAdSpend] = useState(10000)
  const [newUsers, setNewUsers] = useState(500)
  const [marginPercent, setMarginPercent] = useState(70)

  const ltv = arpu * avgLifetime
  const ltvWithMargin = ltv * (marginPercent / 100)
  const ltvCacRatio = cac > 0 ? (ltvWithMargin / cac).toFixed(2) : '∞'
  const paybackMonths = arpu > 0 ? Math.ceil(cac / (arpu * (marginPercent / 100))) : '∞'
  const calculatedCac = newUsers > 0 ? (adSpend / newUsers).toFixed(2) : '0'

  const isHealthy = Number(ltvCacRatio) >= 3
  const paybackOk = typeof paybackMonths === 'number' && paybackMonths <= 12

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>💰 Unit-экономика</h1>
        <p>Считаем, сколько зарабатываем на одном пользователе и сходится ли бизнес.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Unit-экономика</strong> — это анализ доходов и расходов на единицу (пользователя, заказ, подписку).
          Главный вопрос: <strong>пользователь приносит больше, чем стоит его привлечение?</strong> (LTV {'>'} CAC).
          Если нет — масштабирование убьёт бизнес быстрее.
        </p>
        <div className="info-box">
          <div className="info-box-icon">📊</div>
          <div className="info-box-content">
            <div className="info-box-title">LTV/CAC ≥ 3:1</div>
            Эталонное соотношение для здорового SaaS. Если LTV/CAC {'<'} 1 — бизнес убыточен.
            Если {'>'} 5 — возможно, вы недоинвестируете в рост. Важно: считайте по когортам, не blended.
          </div>
        </div>
      </div>

      {/* Key terms */}
      <div className="card">
        <h3>📖 Основные термины</h3>
        <div className="grid-2">
          {[
            { term: 'LTV', full: 'Lifetime Value', desc: 'Сколько денег принесёт один пользователь за всё время' },
            { term: 'CAC', full: 'Customer Acquisition Cost', desc: 'Сколько стоит привлечение одного клиента' },
            { term: 'ARPU', full: 'Average Revenue Per User', desc: 'Средний доход с одного пользователя в месяц' },
            { term: 'Payback', full: 'Payback Period', desc: 'За сколько месяцев окупается вложение в привлечение' },
          ].map(t => (
            <div key={t.term} className="scenario-card" style={{ marginBottom: 0 }}>
              <h4><span className="tag emerald">{t.term}</span> {t.full}</h4>
              <p style={{ marginBottom: 0 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* LTV Calculator */}
      <div className="card">
        <h3>🧮 Калькулятор LTV</h3>
        <p style={{ marginBottom: 16 }}>Простая формула: <strong>LTV = ARPU × Avg Lifetime × Margin%</strong></p>

        <div className="grid-3">
          <div className="slider-container">
            <label>ARPU ($/мес): <strong>${arpu}</strong></label>
            <input type="range" min={1} max={100} value={arpu} onChange={e => setArpu(+e.target.value)} />
          </div>
          <div className="slider-container">
            <label>Avg Lifetime (мес): <strong>{avgLifetime}</strong></label>
            <input type="range" min={1} max={60} value={avgLifetime} onChange={e => setAvgLifetime(+e.target.value)} />
          </div>
          <div className="slider-container">
            <label>Margin: <strong>{marginPercent}%</strong></label>
            <input type="range" min={10} max={100} value={marginPercent} onChange={e => setMarginPercent(+e.target.value)} />
          </div>
        </div>

        <div className="calc-result">
          <div className="calc-result-label">LTV (с учётом маржи)</div>
          <div className="calc-result-value">${ltvWithMargin.toFixed(0)}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4 }}>
            ${arpu} × {avgLifetime} мес × {marginPercent}% = ${ltvWithMargin.toFixed(2)}
          </div>
        </div>
      </div>

      {/* CAC Calculator */}
      <div className="card">
        <h3>📉 Калькулятор CAC</h3>
        <p style={{ marginBottom: 16 }}><strong>CAC = Marketing Spend / New Customers</strong></p>

        <div className="grid-2">
          <div className="slider-container">
            <label>Рекламный бюджет: <strong>${adSpend.toLocaleString()}</strong></label>
            <input type="range" min={1000} max={100000} step={1000} value={adSpend} onChange={e => setAdSpend(+e.target.value)} />
          </div>
          <div className="slider-container">
            <label>Новых пользователей: <strong>{newUsers}</strong></label>
            <input type="range" min={10} max={5000} step={10} value={newUsers} onChange={e => setNewUsers(+e.target.value)} />
          </div>
        </div>

        <div className="calc-result">
          <div className="calc-result-label">CAC</div>
          <div className="calc-result-value">${calculatedCac}</div>
        </div>

        <div className="slider-container" style={{ marginTop: 12 }}>
          <label>Или введите CAC вручную: <strong>${cac}</strong></label>
          <input type="range" min={1} max={500} value={cac} onChange={e => setCac(+e.target.value)} />
        </div>
      </div>

      {/* LTV/CAC Ratio */}
      <div className="card">
        <h3>📏 LTV/CAC и Payback</h3>

        <div className="grid-2">
          <div className="score-display">
            <div className="score-label">LTV / CAC</div>
            <div className="score-number" style={{ color: isHealthy ? 'var(--accent-green)' : 'var(--accent-red)' }}>
              {ltvCacRatio}x
            </div>
            <div className={`tag ${isHealthy ? 'green' : 'red'}`} style={{ marginTop: 8 }}>
              {isHealthy ? '✅ Здоровая экономика (≥3x)' : '⚠️ Ниже порога (< 3x)'}
            </div>
          </div>

          <div className="score-display">
            <div className="score-label">Payback Period</div>
            <div className="score-number" style={{ color: paybackOk ? 'var(--accent-green)' : 'var(--accent-orange)' }}>
              {paybackMonths} мес
            </div>
            <div className={`tag ${paybackOk ? 'green' : 'orange'}`} style={{ marginTop: 8 }}>
              {paybackOk ? '✅ Окупаемость ≤ 12 мес' : '⚠️ Долгая окупаемость'}
            </div>
          </div>
        </div>

        <div className="info-box" style={{ marginTop: 16 }}>
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <div className="info-box-title">Правило 3x</div>
            Здоровый бизнес: <strong>LTV ≥ 3 × CAC</strong>. Если ниже — тратите на привлечение больше, чем зарабатываете.
            Payback {'<'} 12 месяцев — хорошо. Если 18+ — рискованно, нужен большой запас кэша.
          </div>
        </div>
      </div>

      {/* Visual breakdown */}
      <div className="card">
        <h3>📊 Как улучшить Unit-экономику</h3>
        <div className="grid-2">
          <div>
            <h4 style={{ color: 'var(--accent-green)', marginBottom: 8 }}>↑ Увеличить LTV</h4>
            <ul>
              <li>Повысить <strong>ARPU</strong> (upsell, премиум-тарифы)</li>
              <li>Увеличить <strong>Lifetime</strong> (retention, habit loops)</li>
              <li>Увеличить <strong>маржу</strong> (оптимизация инфраструктуры)</li>
              <li>Cross-sell (допродажи)</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--accent-red)', marginBottom: 8 }}>↓ Снизить CAC</h4>
            <ul>
              <li>Улучшить <strong>конверсию</strong> лендинга/онбординга</li>
              <li>Органический трафик (SEO, контент)</li>
              <li>Реферальная программа (K-factor)</li>
              <li>Оптимизация рекламных кампаний</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
