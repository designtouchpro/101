import { useState } from 'react'

interface MetricDef {
  key: string
  name: string
  fullName: string
  icon: string
  formula: string
  description: string
  goodRange: string
  example: { values: Record<string, number>; result: string }
}

const metrics: MetricDef[] = [
  {
    key: 'cac', name: 'CAC', fullName: 'Customer Acquisition Cost', icon: '💰',
    formula: 'CAC = Затраты на маркетинг и продажи / Количество новых клиентов',
    description: 'Сколько стоит привлечение одного клиента. Включает рекламу, зарплаты маркетологов, инструменты.',
    goodRange: 'Зависит от LTV. Правило: LTV/CAC > 3',
    example: { values: { spend: 100000, customers: 50 }, result: '₽2 000' },
  },
  {
    key: 'ltv', name: 'LTV', fullName: 'Lifetime Value', icon: '💎',
    formula: 'LTV = ARPU × Средний срок жизни клиента (мес.)',
    description: 'Сколько денег клиент принесёт за всё время использования продукта.',
    goodRange: 'LTV/CAC > 3 — здоровый бизнес',
    example: { values: { arpu: 500, lifetime: 18 }, result: '₽9 000' },
  },
  {
    key: 'roi', name: 'ROI', fullName: 'Return on Investment', icon: '📈',
    formula: 'ROI = (Доход - Затраты) / Затраты × 100%',
    description: 'Окупаемость инвестиций в маркетинг. Показывает эффективность вложений.',
    goodRange: '> 100% — окупается, > 300% — отлично',
    example: { values: { revenue: 500000, cost: 100000 }, result: '400%' },
  },
  {
    key: 'roas', name: 'ROAS', fullName: 'Return on Ad Spend', icon: '🎯',
    formula: 'ROAS = Доход от рекламы / Расходы на рекламу',
    description: 'Сколько рублей возвращается на каждый рубль рекламы. В отличие от ROI учитывает только рекламные расходы.',
    goodRange: '> 3x — хорошо, > 5x — отлично',
    example: { values: { adRevenue: 300000, adSpend: 50000 }, result: '6x' },
  },
  {
    key: 'cr', name: 'CR', fullName: 'Conversion Rate', icon: '🔄',
    formula: 'CR = Конверсии / Посетители × 100%',
    description: 'Процент посетителей, совершивших целевое действие (покупка, регистрация, подписка).',
    goodRange: 'Лендинг: 2-5%, E-commerce: 1-3%, SaaS trial: 5-15%',
    example: { values: { conversions: 150, visitors: 5000 }, result: '3%' },
  },
  {
    key: 'ctr', name: 'CTR', fullName: 'Click-Through Rate', icon: '👆',
    formula: 'CTR = Клики / Показы × 100%',
    description: 'Процент людей, кликнувших по рекламе или ссылке. Показывает привлекательность креатива.',
    goodRange: 'Search ads: 3-5%, Display: 0.5-1%, Email: 2-5%',
    example: { values: { clicks: 250, impressions: 10000 }, result: '2.5%' },
  },
]

export default function Metrics() {
  const [selectedMetric, setSelectedMetric] = useState(0)
  const [calcValues, setCalcValues] = useState<Record<string, number>>({
    spend: 100000, customers: 50,
    arpu: 500, lifetime: 18,
    revenue: 500000, cost: 100000,
    adRevenue: 300000, adSpend: 50000,
    conversions: 150, visitors: 5000,
    clicks: 250, impressions: 10000,
  })

  const m = metrics[selectedMetric]!

  const v = (key: string) => calcValues[key] ?? 0

  const calculate = () => {
    switch (m.key) {
      case 'cac': return `₽${Math.round(v('spend') / (v('customers') || 1)).toLocaleString()}`
      case 'ltv': return `₽${Math.round(v('arpu') * v('lifetime')).toLocaleString()}`
      case 'roi': return `${Math.round(((v('revenue') - v('cost')) / (v('cost') || 1)) * 100)}%`
      case 'roas': return `${(v('adRevenue') / (v('adSpend') || 1)).toFixed(1)}x`
      case 'cr': return `${((v('conversions') / (v('visitors') || 1)) * 100).toFixed(1)}%`
      case 'ctr': return `${((v('clicks') / (v('impressions') || 1)) * 100).toFixed(2)}%`
      default: return '—'
    }
  }

  const getCalcFields = (): { key: string; label: string }[] => {
    switch (m.key) {
      case 'cac': return [{ key: 'spend', label: 'Затраты на маркетинг (₽)' }, { key: 'customers', label: 'Новых клиентов' }]
      case 'ltv': return [{ key: 'arpu', label: 'ARPU (₽/мес)' }, { key: 'lifetime', label: 'Срок жизни (мес.)' }]
      case 'roi': return [{ key: 'revenue', label: 'Доход (₽)' }, { key: 'cost', label: 'Затраты (₽)' }]
      case 'roas': return [{ key: 'adRevenue', label: 'Доход от рекламы (₽)' }, { key: 'adSpend', label: 'Расход на рекламу (₽)' }]
      case 'cr': return [{ key: 'conversions', label: 'Конверсии' }, { key: 'visitors', label: 'Посетители' }]
      case 'ctr': return [{ key: 'clicks', label: 'Клики' }, { key: 'impressions', label: 'Показы' }]
      default: return []
    }
  }

  // LTV/CAC ratio
  const ltv = v('arpu') * v('lifetime')
  const cac = v('spend') / (v('customers') || 1)
  const ltvCacRatio = cac > 0 ? ltv / cac : 0

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📊 Метрики маркетинга</h1>
        <p>Ключевые метрики для измерения эффективности маркетинга. Калькуляторы и бенчмарки.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Маркетинговые метрики — это числовые показатели эффективности маркетинговых активностей. 
          Без метрик маркетинг превращается в «творчество ради творчества». С метриками — в управляемый процесс, 
          где каждый рубль бюджета можно отследить до результата. Базовые метрики: <strong>CAC</strong> (стоимость привлечения клиента), <strong>LTV</strong> (пожизненная ценность клиента), <strong>ROMI</strong> (возврат маркетинговых инвестиций), <strong>CR</strong> (конверсия).
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Главное правило: LTV должен быть значительно больше CAC (обычно минимум 3:1). 
          Если вы тратите на привлечение клиента больше, чем он приносит за всё время — бизнес убыточен, 
          сколько бы клиентов вы ни привлекли. Метрики нужно рассматривать в связке, а не изолированно: 
          высокий CTR при низкой конверсии на сайте говорит о проблеме не в рекламе, а в лендинге.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>💡 North Star для маркетинга</strong>: Выберите одну ключевую метрику на квартал. 
            Для B2C это часто CAC или CR воронки. Для B2B — количество MQL (Marketing Qualified Leads) 
            или стоимость SQL (Sales Qualified Lead). Остальные метрики — поддерживающие.
          </div>
        </div>
      </div>

      {/* Metric selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {metrics.map((met, i) => (
          <button key={met.key} className={`btn ${selectedMetric === i ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedMetric(i)}>
            {met.icon} {met.name}
          </button>
        ))}
      </div>

      {/* Metric detail */}
      <div className="card">
        <h3>{m.icon} {m.name} — {m.fullName}</h3>
        <p style={{ marginBottom: 16 }}>{m.description}</p>

        <div style={{ padding: 16, borderRadius: 8, background: 'var(--bg-code)', fontFamily: 'monospace', fontSize: '0.9rem', marginBottom: 16 }}>
          {m.formula}
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <strong>Хороший диапазон:</strong> {m.goodRange}
        </div>
      </div>

      {/* Calculator */}
      <div className="card">
        <h3>🧮 Калькулятор {m.name}</h3>
        <div className="grid-2">
          {getCalcFields().map(f => (
            <div key={f.key}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{f.label}</label>
              <input type="number" className="input" value={calcValues[f.key]}
                onChange={e => setCalcValues(prev => ({ ...prev, [f.key]: +e.target.value }))}
                style={{ textAlign: 'center' }} />
            </div>
          ))}
        </div>

        <div className="score-display" style={{ marginTop: 16 }}>
          <div className="score-label">{m.name}</div>
          <div className="score-number">{calculate()}</div>
        </div>
      </div>

      {/* LTV/CAC ratio card */}
      <div className="card">
        <h3>⚖️ Соотношение LTV/CAC</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
          Главная метрика здоровья маркетинга. Используются значения из калькуляторов выше.
        </p>

        <div className="grid-3">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>LTV</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#22c55e' }}>₽{Math.round(ltv).toLocaleString()}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CAC</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>₽{Math.round(cac).toLocaleString()}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>LTV/CAC</div>
            <div style={{
              fontSize: '1.5rem', fontWeight: 700,
              color: ltvCacRatio >= 3 ? '#22c55e' : ltvCacRatio >= 1 ? '#f59e0b' : '#ef4444',
            }}>
              {ltvCacRatio.toFixed(1)}x
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {[
            { label: '< 1x', desc: 'Убыток', color: '#ef4444' },
            { label: '1-3x', desc: 'Opасная зона', color: '#f59e0b' },
            { label: '3-5x', desc: 'Здоровый бизнес', color: '#22c55e' },
            { label: '> 5x', desc: 'Недоинвестируете?', color: '#3b82f6' },
          ].map(z => (
            <div key={z.label} style={{
              flex: 1, padding: 8, borderRadius: 6, textAlign: 'center',
              background: `${z.color}10`, border: `1px solid ${z.color}30`,
              opacity: (z.label === '< 1x' && ltvCacRatio < 1) ||
                (z.label === '1-3x' && ltvCacRatio >= 1 && ltvCacRatio < 3) ||
                (z.label === '3-5x' && ltvCacRatio >= 3 && ltvCacRatio < 5) ||
                (z.label === '> 5x' && ltvCacRatio >= 5) ? 1 : 0.4,
            }}>
              <div style={{ fontWeight: 700, color: z.color, fontSize: '0.85rem' }}>{z.label}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{z.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
