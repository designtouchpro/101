import { useState } from 'react'

const mix4P = [
  {
    key: 'product', emoji: '📦', title: 'Product (Продукт)',
    desc: 'Что вы продаёте? Какую проблему решаете?',
    questions: ['Какую проблему решает продукт?', 'Чем отличается от конкурентов?', 'Какие фичи ключевые?', 'Какой UX?'],
    examples: ['Slack: удобная коммуникация для команд', 'Notion: all-in-one workspace', 'Figma: совместный дизайн в браузере'],
  },
  {
    key: 'price', emoji: '💰', title: 'Price (Цена)',
    desc: 'Сколько стоит? Какая модель монетизации?',
    questions: ['Freemium или платный?', 'Подписка или разовая покупка?', 'Какой средний чек?', 'Есть ли триал?'],
    examples: ['Spotify: freemium + подписка $9.99/мес', 'Slack: бесплатно + $7.25/user/мес', 'JetBrains: подписка $149-649/год'],
  },
  {
    key: 'place', emoji: '🏪', title: 'Place (Место)',
    desc: 'Где и как продукт доходит до клиента?',
    questions: ['Веб или мобильное приложение?', 'Marketplace или свой сайт?', 'B2B или B2C?', 'Какие каналы дистрибуции?'],
    examples: ['AppStore / Google Play', 'Product Hunt для запуска', 'Прямые продажи B2B'],
  },
  {
    key: 'promotion', emoji: '📣', title: 'Promotion (Продвижение)',
    desc: 'Как вы рассказываете о продукте?',
    questions: ['Какие каналы привлечения?', 'Платная реклама или органика?', 'Есть ли реферальная программа?', 'Контент-маркетинг?'],
    examples: ['SEO + блог (HubSpot)', 'Вирусный рост (Dropbox referral)', 'Community-led growth (Figma)'],
  },
]

const extra3P = [
  { key: 'people', emoji: '👥', title: 'People (Люди)', desc: 'Кто взаимодействует с клиентом? Поддержка, sales, community.' },
  { key: 'process', emoji: '⚙️', title: 'Process (Процесс)', desc: 'Как клиент покупает и использует? Onboarding, UX flow.' },
  { key: 'physical', emoji: '🏢', title: 'Physical Evidence', desc: 'Социальное доказательство: отзывы, кейсы, дизайн, бренд.' },
]

export default function MarketingMix() {
  const [selected, setSelected] = useState(0)
  const [show7P, setShow7P] = useState(false)
  const [userInputs, setUserInputs] = useState<Record<string, string>>({})

  const p = mix4P[selected]!

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🎯 Marketing Mix (4P / 7P)</h1>
        <p>Классическая модель маркетинга — что, почём, где и как вы продвигаете.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Marketing Mix</strong> — концепция, предложенная Джеромом Маккарти в 1960 году. Она описывает
          4 ключевых элемента, которые компания может контролировать:
          <strong>Product</strong> (что продаём), <strong>Price</strong> (за сколько),
          <strong>Place</strong> (где продаём) и <strong>Promotion</strong> (как продвигаем).
          Позднее к сервисному бизнесу добавили ещё 3P: People, Process, Physical Evidence → 7P.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          В digital-мире 4P эволюционировали в <strong>4C</strong> (Роберт Лотерборн, 1990):
          Customer value → Cost → Convenience → Communication. Суть — смотреть
          глазами клиента, а не продавца. Но традиционные 4P остаются фундаментом любого
          маркетингового плана.
        </p>
        <div className="info-box">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <div className="info-box-title">Почему это важно?</div>
            Marketing Mix заставляет системно продумать каждый элемент. Нельзя делать отличный продукт
            и провалиться на цене. Нельзя сделать крутую рекламу и не обеспечить доступность (Place).
          </div>
        </div>
      </div>

      {/* 4P Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {mix4P.map((item, i) => (
          <button key={item.key}
            className={`btn ${selected === i ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelected(i)}>
            {item.emoji} {item.title.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Selected P detail */}
      <div className="card">
        <h3>{p.emoji} {p.title}</h3>
        <p style={{ fontSize: '1rem', marginBottom: 16 }}>{p.desc}</p>

        <div className="grid-2">
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: 8, color: 'var(--accent-main)' }}>❓ Ключевые вопросы</h4>
            {p.questions.map((q, i) => (
              <div key={i} style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 6, marginBottom: 4, fontSize: '0.85rem' }}>
                {q}
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: 8, color: 'var(--accent-green)' }}>💡 Примеры из IT</h4>
            {p.examples.map((ex, i) => (
              <div key={i} style={{ padding: '8px 12px', background: '#22c55e08', borderLeft: '3px solid #22c55e', borderRadius: 6, marginBottom: 4, fontSize: '0.85rem' }}>
                {ex}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive: Build your mix */}
      <div className="card">
        <h3>🛠️ Составьте свой Marketing Mix</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
          Опишите каждый P для вашего продукта или выдуманного стартапа.
        </p>
        <div className="grid-2">
          {mix4P.map(item => (
            <div key={item.key}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 4, display: 'block' }}>
                {item.emoji} {item.title.split('(')[0]}
              </label>
              <textarea
                className="input"
                placeholder={item.questions[0]}
                value={userInputs[item.key] || ''}
                onChange={e => setUserInputs(prev => ({ ...prev, [item.key]: e.target.value }))}
                style={{ minHeight: 60 }}
              />
            </div>
          ))}
        </div>
        {Object.values(userInputs).filter(Boolean).length === 4 && (
          <div className="info-box success" style={{ marginTop: 16 }}>
            <div className="info-box-content">
              <div className="info-box-title">🎉 Отлично! Все 4P заполнены!</div>
              Теперь покажите результат коллегам и обсудите — все ли согласны с позиционированием?
            </div>
          </div>
        )}
      </div>

      {/* 7P Extension */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3>➕ Расширенная модель 7P</h3>
          <button className="btn btn-secondary btn-sm" onClick={() => setShow7P(!show7P)}>
            {show7P ? 'Скрыть' : 'Показать'}
          </button>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
          В сфере услуг и SaaS к 4P добавляют ещё 3 элемента.
        </p>

        {show7P && (
          <div className="grid-3">
            {extra3P.map(item => (
              <div key={item.key} style={{ padding: 16, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{item.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
