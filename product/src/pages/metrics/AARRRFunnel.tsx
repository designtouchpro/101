import { useState } from 'react'

interface FunnelStep {
  key: string
  name: string
  fullName: string
  color: string
  desc: string
  metrics: string[]
  example: string
  defaultValue: number
}

const steps: FunnelStep[] = [
  {
    key: 'acquisition', name: 'A — Acquisition', fullName: 'Привлечение',
    color: '#3b82f6', desc: 'Как пользователи узнают о продукте?',
    metrics: ['Визиты', 'CTR рекламы', 'Organic traffic', 'CPC'],
    example: 'Маркетинг запустил рекламу → 10 000 человек зашли на сайт',
    defaultValue: 10000,
  },
  {
    key: 'activation', name: 'A — Activation', fullName: 'Активация',
    color: '#10b981', desc: 'Первый «aha-moment» — пользователь понял ценность.',
    metrics: ['Sign-up rate', 'Onboarding completion', 'Time to value'],
    example: 'Из 10 000 зарегистрировались 2 000 (20%)',
    defaultValue: 2000,
  },
  {
    key: 'retention', name: 'R — Retention', fullName: 'Удержание',
    color: '#8b5cf6', desc: 'Возвращаются ли пользователи?',
    metrics: ['D1/D7/D30 retention', 'DAU/MAU', 'Churn rate'],
    example: 'Через месяц осталось 600 активных (30% retention)',
    defaultValue: 600,
  },
  {
    key: 'revenue', name: 'R — Revenue', fullName: 'Доход',
    color: '#f59e0b', desc: 'Начинают ли пользователи платить?',
    metrics: ['ARPU', 'MRR', 'Conversion to paid', 'AOV'],
    example: '120 из 600 оплатили подписку (20%)',
    defaultValue: 120,
  },
  {
    key: 'referral', name: 'R — Referral', fullName: 'Рекомендации',
    color: '#ef4444', desc: 'Рекомендуют ли продукт другим?',
    metrics: ['NPS', 'Viral coefficient', 'Invite rate', 'K-factor'],
    example: '30 из 120 пригласили друга (viral coeff = 0.25)',
    defaultValue: 30,
  },
]

export default function AARRRFunnel() {
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(steps.map(s => [s.key, s.defaultValue]))
  )

  const updateValue = (key: string, val: number) => {
    setValues(prev => ({ ...prev, [key]: Math.max(0, val) }))
  }

  const conversionRate = (from: string, to: string) => {
    if (values[from] === 0) return 0
    return ((values[to] / values[from]) * 100).toFixed(1)
  }

  const active = steps.find(s => s.key === activeStep)

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🏴‍☠️ AARRR — Пиратские метрики</h1>
        <p>Фреймворк Дейва МакКлюра для анализа воронки продукта.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          AARRR («пиратские метрики») — фреймворк, предложенный <strong>Дейвом МакКлюром</strong> (500 Startups) в 2007 году.
          Он разбивает жизненный цикл пользователя на 5 этапов: <strong>Acquisition</strong> (привлечение),
          <strong>Activation</strong> (активация), <strong>Retention</strong> (удержание),
          <strong>Revenue</strong> (доход), <strong>Referral</strong> (рекомендации).
          Это не просто список метрик — это <strong>образ мышления</strong>, помогающий понять, где в воронке самая
          большая потеря пользователей.
        </p>
        <div className="info-box">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <div className="info-box-title">Один этап за раз</div>
            Не пытайтесь улучшать всю воронку сразу. Найдите этап с наибольшим drop-off и сосредоточьтесь на нём.
            Улучшить Retention с 20% до 30% часто важнее, чем удвоить Acquisition.
          </div>
        </div>
      </div>

      {/* Visual Funnel */}
      <div className="card">
        <h3>Интерактивная воронка</h3>
        <p style={{ marginBottom: 16 }}>Кликните на этап, чтобы узнать подробности. Меняйте числа, чтобы увидеть конверсии.</p>

        <div className="funnel">
          {steps.map((step, i) => {
            const width = 100 - i * 15
            return (
              <div
                key={step.key}
                className={`funnel-step ${activeStep === step.key ? 'active' : ''}`}
                style={{ width: `${width}%`, background: step.color, minWidth: 200 }}
                onClick={() => setActiveStep(activeStep === step.key ? null : step.key)}
              >
                <span className="funnel-value">{values[step.key].toLocaleString()}</span>
                <span className="funnel-label">{step.name}</span>
                {i > 0 && (
                  <span style={{ position: 'absolute', right: 8, top: 4, fontSize: '0.7rem', opacity: 0.7 }}>
                    {conversionRate(steps[i - 1].key, step.key)}%
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Details */}
      {active && (
        <div className="card" style={{ borderColor: active.color }}>
          <h3 style={{ color: active.color }}>{active.name} — {active.fullName}</h3>
          <p style={{ marginBottom: 12 }}>{active.desc}</p>

          <div className="grid-2">
            <div>
              <h4 style={{ marginBottom: 8 }}>📏 Ключевые метрики</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {active.metrics.map(m => (
                  <span key={m} className="tag emerald">{m}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: 8 }}>💡 Пример</h4>
              <p>{active.example}</p>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Изменить значение: <strong>{active.fullName}</strong>
            </label>
            <input
              className="input"
              type="number"
              value={values[active.key]}
              onChange={e => updateValue(active.key, Number(e.target.value))}
              style={{ width: 200, marginTop: 6 }}
            />
          </div>
        </div>
      )}

      {/* Conversion table */}
      <div className="card">
        <h3>📊 Таблица конверсий</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ textAlign: 'left', padding: 8, color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Переход</th>
                <th style={{ textAlign: 'right', padding: 8, color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Конверсия</th>
                <th style={{ textAlign: 'right', padding: 8, color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Бенчмарк</th>
              </tr>
            </thead>
            <tbody>
              {[
                { from: 'acquisition', to: 'activation', bench: '20-40%' },
                { from: 'activation', to: 'retention', bench: '15-35%' },
                { from: 'retention', to: 'revenue', bench: '5-15%' },
                { from: 'revenue', to: 'referral', bench: '10-30%' },
              ].map(row => (
                <tr key={row.from} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: 8, fontSize: '0.9rem' }}>
                    {steps.find(s => s.key === row.from)?.fullName} → {steps.find(s => s.key === row.to)?.fullName}
                  </td>
                  <td style={{ padding: 8, textAlign: 'right', fontWeight: 600, color: 'var(--accent-main)' }}>
                    {conversionRate(row.from, row.to)}%
                  </td>
                  <td style={{ padding: 8, textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {row.bench}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips */}
      <div className="card">
        <h3>💡 Как улучшить каждый этап</h3>
        <div className="grid-2">
          <div className="info-box success">
            <div className="info-box-content">
              <div className="info-box-title">Acquisition ↑</div>
              SEO, контент-маркетинг, реферальные программы, партнёрства
            </div>
          </div>
          <div className="info-box success">
            <div className="info-box-content">
              <div className="info-box-title">Activation ↑</div>
              Упростить онбординг, показать ценность за 30 секунд, A/B тесты
            </div>
          </div>
          <div className="info-box success">
            <div className="info-box-content">
              <div className="info-box-title">Retention ↑</div>
              Push/email, habit-loops, gamification, улучшение core loop
            </div>
          </div>
          <div className="info-box success">
            <div className="info-box-content">
              <div className="info-box-title">Revenue ↑</div>
              Upsell, paywall-оптимизация, pricing experiments, trial
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
