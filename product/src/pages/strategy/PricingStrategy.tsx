import { useState } from 'react'

const pricingModels = [
  { model: 'Freemium', icon: '🎁', desc: 'Бесплатный базовый продукт + платные premium-фичи', examples: 'Spotify, Notion, Slack', stage: 'Growth', pros: ['Низкий барьер входа', 'Вирусное распространение', 'Большой TAM'], cons: ['Высокие затраты на free users', 'Сложно найти paywall баланс', 'Конверсия 2-5%'] },
  { model: 'Subscription', icon: '🔄', desc: 'Регулярный платёж (monthly/annual) за доступ', examples: 'Netflix, SaaS, AWS', stage: 'Scale', pros: ['Предсказуемый revenue', 'Высокий LTV', 'Retention-focused'], cons: ['Сhurn pressure', 'Нужна постоянная value', 'Subscription fatigue'] },
  { model: 'Usage-based', icon: '📊', desc: 'Плата за потребление (API calls, storage, messages)', examples: 'Twilio, Snowflake, AWS Lambda', stage: 'Scale', pros: ['Справедливое ценообразование', 'Растёт с клиентом', 'Низкий порог входа'], cons: ['Непредсказуемый revenue', 'Сложный billing', 'Клиент оптимизирует usage'] },
  { model: 'One-time purchase', icon: '💳', desc: 'Разовая покупка лицензии/продукта', examples: 'Sketch (ранее), игры, курсы', stage: 'Early', pros: ['Простота', 'Мгновенный revenue', 'Нет churn'], cons: ['Нет recurring revenue', 'Нужен постоянный поток новых клиентов', 'Сложно предсказать'] },
  { model: 'Marketplace / Commission', icon: '🏪', desc: 'Комиссия с транзакций между участниками', examples: 'Uber, Airbnb, App Store', stage: 'Scale', pros: ['Масштабируется с GMV', 'Сетевой эффект', 'Нет inventory'], cons: ['Chicken-and-egg холодный старт', 'Disintermediation risk', 'Нужен trust & safety'] },
  { model: 'Ad-supported', icon: '📺', desc: 'Бесплатный продукт, монетизация через рекламу', examples: 'Google, Facebook, TikTok', stage: 'Scale', pros: ['Бесплатно для пользователя', 'Огромный TAM', 'Данные как asset'], cons: ['Нужен огромный трафик', 'Privacy concerns', 'UX страдает'] },
]

const packagingTiers = [
  { tier: 'Free / Starter', purpose: 'Привлечение, демо value prop', features: 'Core features, ограничения по usage/seats', conversion: 'Top of funnel' },
  { tier: 'Pro / Growth', purpose: 'Основной revenue driver', features: 'Полный функционал, больше лимитов, приоритет', conversion: 'Самый популярный (80% revenue)' },
  { tier: 'Enterprise', purpose: 'Крупные клиенты, ACV $50k+', features: 'SSO, audit log, SLA, dedicated support, custom', conversion: 'Sales-led, длинный цикл' },
]

const packagingLevers = [
  { lever: 'Seats / Users', desc: 'Ограничение числа пользователей', best: 'Collaboration tools' },
  { lever: 'Usage / Volume', desc: 'Лимиты на API calls, storage, events', best: 'Infrastructure, analytics' },
  { lever: 'Features', desc: 'Premium фичи в высших тарифах', best: 'Horizontal SaaS' },
  { lever: 'Support tier', desc: 'SLA, dedicated CSM, priority queue', best: 'Enterprise' },
  { lever: 'Data retention', desc: 'Срок хранения данных / истории', best: 'Analytics, monitoring' },
]

const stageModel = [
  { stage: 'Pre-PMF', focus: 'Валидация', recommended: 'Free / cheap, one-time, простая модель', avoid: 'Сложные тарифы, usage billing', reason: 'Снижаем friction, набираем data' },
  { stage: 'Early growth', focus: 'Монетизация', recommended: 'Freemium или low-tier subscription', avoid: 'Enterprise-only, ad-supported', reason: 'Balance growth + revenue signal' },
  { stage: 'Growth', focus: 'Масштаб', recommended: 'Tiered subscription + usage upsell', avoid: 'One-price-fits-all', reason: 'Capture value across segments' },
  { stage: 'Maturity', focus: 'Retention + expansion', recommended: 'Platform bundle, ecosystem lock-in', avoid: 'Price wars', reason: 'Expansion revenue > new logos' },
]

const pricingMistakes = [
  { mistake: 'Pricing too low', icon: '📉', impact: 'Leaving money on table, signals low value', fix: 'Willingness-to-pay research (Van Westendorp)' },
  { mistake: 'Too many tiers', icon: '🤯', impact: 'Decision paralysis, support complexity', fix: '3 тарифа оптимально (Good-Better-Best)' },
  { mistake: 'Free tier too generous', icon: '🎁', impact: 'Нет мотивации платить, высокие costs', fix: 'Limit по самой ценной метрике (seats, volume)' },
  { mistake: 'Cost-plus pricing', icon: '🧮', impact: 'Не учитывает perceived value', fix: 'Value-based pricing: сколько клиент готов платить' },
  { mistake: 'No annual option', icon: '📅', impact: 'Higher churn, less cash upfront', fix: 'Annual = 2 месяца бесплатно (-17%)' },
  { mistake: 'Hidden pricing page', icon: '👻', impact: 'Lost leads, trust issues', fix: 'Прозрачное ценообразование на сайте' },
]

export default function PricingStrategy() {
  const [tab, setTab] = useState<'models' | 'packaging' | 'stage' | 'mistakes'>('models')
  const [selectedModel, setSelectedModel] = useState(0)

  const model = pricingModels[selectedModel]!

  return (
    <div className="demo-container">
      <h1>💰 Pricing, Packaging и Business‑модели</h1>
      <p>Модели монетизации, стратегии упаковки, привязка к стадии продукта и типичные ошибки.</p>

      <div style={{ display: 'flex', gap: 8, margin: '24px 0', flexWrap: 'wrap' }}>
        {([
          ['models', '💰 Модели'],
          ['packaging', '📦 Packaging'],
          ['stage', '📈 Стадия продукта'],
          ['mistakes', '🚫 Ошибки'],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: tab === key ? '2px solid var(--accent)' : '1px solid var(--border)',
              background: tab === key ? 'var(--accent)' : 'var(--card-bg)',
              color: tab === key ? '#fff' : 'var(--text)',
              cursor: 'pointer',
              fontWeight: tab === key ? 600 : 400,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Pricing Models ── */}
      {tab === 'models' && (
        <section className="card">
          <h2>💰 Модели монетизации</h2>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {pricingModels.map((m, i) => (
              <button
                key={m.model}
                onClick={() => setSelectedModel(i)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  border: selectedModel === i ? '2px solid var(--accent)' : '1px solid var(--border)',
                  background: selectedModel === i ? 'var(--accent)' : 'var(--card-bg)',
                  color: selectedModel === i ? '#fff' : 'var(--text)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                {m.icon} {m.model}
              </button>
            ))}
          </div>

          <div style={{ padding: 20, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <h3 style={{ margin: '0 0 8px' }}>{model.icon} {model.model}</h3>
            <p style={{ margin: '0 0 12px', fontSize: '0.85rem' }}>{model.desc}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6 }}>Примеры</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>{model.examples}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6 }}>Стадия</div>
                <div style={{ fontSize: '0.85rem' }}>{model.stage}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: 4 }}>✅ Плюсы</div>
                {model.pros.map(p => <div key={p} style={{ fontSize: '0.85rem', padding: '2px 0' }}>• {p}</div>)}
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: 4 }}>⚠️ Минусы</div>
                {model.cons.map(c => <div key={c} style={{ fontSize: '0.85rem', padding: '2px 0', color: '#ef4444' }}>• {c}</div>)}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Packaging ── */}
      {tab === 'packaging' && (
        <>
          <section className="card">
            <h2>📦 Good — Better — Best</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {packagingTiers.map(t => (
                <div key={t.tier} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8, borderTop: '4px solid var(--accent)' }}>
                  <h3 style={{ margin: '0 0 8px' }}>{t.tier}</h3>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: 4 }}>Цель</div>
                  <div style={{ fontSize: '0.85rem', marginBottom: 12 }}>{t.purpose}</div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: 4 }}>Фичи</div>
                  <div style={{ fontSize: '0.85rem', marginBottom: 12 }}>{t.features}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontStyle: 'italic' }}>{t.conversion}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>🔧 Рычаги упаковки</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Рычаг</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Описание</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {packagingLevers.map(l => (
                    <tr key={l.lever}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{l.lever}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{l.desc}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--accent)' }}>{l.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* ── Stage ── */}
      {tab === 'stage' && (
        <section className="card">
          <h2>📈 Монетизация по стадии продукта</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Стадия</th>
                  <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Фокус</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Рекомендовано</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Избегать</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Почему</th>
                </tr>
              </thead>
              <tbody>
                {stageModel.map(s => (
                  <tr key={s.stage}>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{s.stage}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'center', fontSize: '0.85rem' }}>{s.focus}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{s.recommended}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem', color: '#ef4444' }}>{s.avoid}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem', fontStyle: 'italic' }}>{s.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 16, padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <h3 style={{ margin: '0 0 12px' }}>🔁 Expansion Revenue Flywheel</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, flexWrap: 'wrap', textAlign: 'center' }}>
              {['Acquire', '→', 'Activate', '→', 'Monetize', '→', 'Expand', '→', 'Advocate', '↩'].map((s, i) => (
                <div key={i} style={{ padding: s.length > 2 ? '10px 16px' : '10px 4px', borderRadius: s.length > 2 ? 8 : 0, background: s.length > 2 ? 'var(--accent)' : 'transparent', color: s.length > 2 ? '#fff' : 'var(--text)', fontWeight: s.length > 2 ? 600 : 400, fontSize: s.length > 2 ? '0.85rem' : '1rem' }}>{s}</div>
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: 12, fontSize: '0.85rem', opacity: 0.8 }}>Net Dollar Retention {'>'} 100% = рост даже без новых клиентов</p>
          </div>
        </section>
      )}

      {/* ── Mistakes ── */}
      {tab === 'mistakes' && (
        <section className="card">
          <h2>🚫 Типичные ошибки ценообразования</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {pricingMistakes.map(m => (
              <div key={m.mistake} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <h3 style={{ margin: '0 0 6px' }}>{m.icon} {m.mistake}</h3>
                <div style={{ fontSize: '0.85rem', marginBottom: 8, color: '#ef4444' }}>Impact: {m.impact}</div>
                <div style={{ fontSize: '0.85rem', padding: '8px 12px', background: 'var(--bg)', borderRadius: 6 }}>✅ {m.fix}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Interview ── */}
      <section className="card">
        <h2>❓ Вопросы на собесе</h2>
        <div className="interview-item"><div className="q">Какую модель монетизации выбрать для B2B SaaS?</div><div className="a">Зависит от стадии и сегмента. Pre-PMF: простая модель, минимум friction. Growth: freemium + tiered subscription. Scale: usage-based upsell. Key metric: Net Dollar Retention. Good-Better-Best packaging. Pricing page прозрачная. Value-based, не cost-plus.</div></div>
        <div className="interview-item"><div className="q">Как определить правильную цену?</div><div className="a">Van Westendorp (4 вопроса about willingness-to-pay), Gabor-Granger (прямая проверка ценовых точек), conjoint analysis (trade-off фичи vs цена). Плюс: competitive benchmarking, unit economics (LTV:CAC ≥ 3:1). Iterate, не гадайте.</div></div>
        <div className="interview-item"><div className="q">Freemium vs free trial — что выбрать?</div><div className="a">Freemium: продукт с сетевым эффектом, широкий TAM, viral loop (Slack, Notion). Free trial: продукт с быстрым aha-moment, сложный для бесплатного (14-30 дней). Hybrid: free tier + trial premium features. Главное — быстрый путь до value.</div></div>
      </section>
    </div>
  )
}
