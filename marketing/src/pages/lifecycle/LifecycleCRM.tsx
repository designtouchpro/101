import { useState } from 'react'

const lifecycleStages = [
  {
    key: 'acquisition',
    label: 'Acquisition',
    labelRu: 'Привлечение',
    icon: '🎣',
    color: '#3b82f6',
    goal: 'Привести нового пользователя',
    channels: ['Paid Ads', 'SEO', 'Content', 'Referral', 'Partnerships'],
    metrics: ['CAC', 'CPA', 'Traffic', 'Conversion Rate'],
    crm: 'Welcome-серия: онбординг → обучение → первый успех',
  },
  {
    key: 'activation',
    label: 'Activation',
    labelRu: 'Активация',
    icon: '🔑',
    color: '#8b5cf6',
    goal: 'Довести до «Aha moment»',
    channels: ['Onboarding email', 'In-app guides', 'Support chat'],
    metrics: ['Activation Rate', 'TTV (Time to Value)', 'Feature adoption'],
    crm: 'Trigger-цепочки: если не завершил шаг → напоминание → помощь',
  },
  {
    key: 'retention',
    label: 'Retention',
    labelRu: 'Удержание',
    icon: '🔄',
    color: '#22c55e',
    goal: 'Сделать продукт привычкой',
    channels: ['Push', 'Email', 'In-app', 'Loyalty programs'],
    metrics: ['Retention Rate (D1/D7/D30)', 'Churn Rate', 'DAU/MAU', 'Stickiness'],
    crm: 'Регулярные дайджесты, персональные рекомендации, milestone awards',
  },
  {
    key: 'revenue',
    label: 'Revenue',
    labelRu: 'Монетизация',
    icon: '💰',
    color: '#f59e0b',
    goal: 'Увеличить доход с пользователя',
    channels: ['Upsell email', 'In-app upgrade prompts', 'Account managers'],
    metrics: ['ARPU', 'LTV', 'MRR/ARR', 'Expansion Revenue'],
    crm: 'Upsell по триггерам (достиг лимита), cross-sell рекомендации',
  },
  {
    key: 'referral',
    label: 'Referral',
    labelRu: 'Рекомендации',
    icon: '📢',
    color: '#ec4899',
    goal: 'Превратить клиента в амбассадора',
    channels: ['Referral program', 'NPS survey → promoters', 'Social sharing'],
    metrics: ['NPS', 'Referral Rate', 'Viral Coefficient (K-factor)'],
    crm: 'Запрос отзыва после позитивного опыта, реферальные бонусы',
  },
  {
    key: 'reactivation',
    label: 'Reactivation',
    labelRu: 'Реактивация',
    icon: '♻️',
    color: '#ef4444',
    goal: 'Вернуть ушедших пользователей',
    channels: ['Win-back email', 'Retargeting ads', 'Special offers'],
    metrics: ['Reactivation Rate', 'Win-back CAC', 'Dormant User %'],
    crm: 'Win-back серия: «Мы скучаем» → спецпредложение → дедлайн → прощание',
  },
]

const retentionTactics = [
  { tactic: 'Онбординг', desc: 'Довести до Aha moment за первую сессию. Чек-лист прогресса, интерактивный тур', impact: '🔴 Критичный', when: 'D0-D1' },
  { tactic: 'Engagement loops', desc: 'Trigger → Action → Reward → Investment (модель Hook). Уведомления, стрики, бейджи', impact: '🔴 Критичный', when: 'D1-D30' },
  { tactic: 'Персонализация', desc: 'Рекомендации на основе поведения. «Вам может быть интересно», динамический контент', impact: '🟡 Высокий', when: 'D7+' },
  { tactic: 'Milestone rewards', desc: '«Вы отправили 100 сообщений! Бейдж разблокирован». Gamification прогресса', impact: '🟡 Высокий', when: 'Постоянно' },
  { tactic: 'Email дайджесты', desc: 'Еженедельная сводка: что пропустили, новые фичи, персональная статистика', impact: '🟢 Средний', when: 'Еженедельно' },
  { tactic: 'Exit survey', desc: 'При отмене подписки: узнать причину → предложить решение / пауза вместо отмены', impact: '🟡 Высокий', when: 'При churn' },
]

const cohortData = [
  { cohort: 'Январь', d0: 1000, d1: 420, d7: 280, d14: 210, d30: 150, d60: 110, d90: 85 },
  { cohort: 'Февраль', d0: 1200, d1: 540, d7: 350, d14: 270, d30: 195, d60: 140, d90: 105 },
  { cohort: 'Март', d0: 900, d1: 390, d7: 260, d14: 200, d30: 145, d60: '—', d90: '—' },
]

export default function LifecycleCRM() {
  const [selectedStage, setSelectedStage] = useState(0)
  const [tab, setTab] = useState<'lifecycle' | 'retention' | 'crm' | 'cohort'>('lifecycle')

  const stage = lifecycleStages[selectedStage]!

  return (
    <div className="demo-container">
      <h1>♻️ Lifecycle, Retention и CRM</h1>
      <p>Привлечение клиента — только начало. 80% прибыли приносят удержание и монетизация существующей базы. Этот модуль охватывает весь жизненный цикл: от первого касания до реактивации.</p>

      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: 8, margin: '24px 0', flexWrap: 'wrap' }}>
        {([
          ['lifecycle', '♻️ Lifecycle'],
          ['retention', '🔒 Retention'],
          ['crm', '📧 CRM'],
          ['cohort', '📊 Когорты'],
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

      {/* ── Lifecycle ── */}
      {tab === 'lifecycle' && (
        <>
          <section className="card">
            <h2>AARRR — Pirate Metrics</h2>
            <p style={{ marginBottom: 16 }}>
              Модель lifecycle по Dave McClure. Каждый этап имеет свои каналы, метрики
              и CRM-триггеры. Нажмите на этап для деталей.
            </p>

            {/* Pipeline visualization */}
            <div style={{ display: 'flex', gap: 4, margin: '20px 0', flexWrap: 'wrap' }}>
              {lifecycleStages.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setSelectedStage(i)}
                  style={{
                    flex: 1,
                    minWidth: 100,
                    padding: '16px 8px',
                    background: selectedStage === i ? s.color : s.color + '22',
                    color: selectedStage === i ? '#fff' : 'var(--text)',
                    border: selectedStage === i ? `2px solid ${s.color}` : '1px solid transparent',
                    borderRadius: 8,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{s.label}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{s.labelRu}</div>
                </button>
              ))}
            </div>

            {/* Selected stage details */}
            <div style={{ padding: 20, background: stage.color + '11', border: `1px solid ${stage.color}33`, borderRadius: 8, marginTop: 8 }}>
              <h3 style={{ margin: '0 0 12px' }}>{stage.icon} {stage.label} — {stage.labelRu}</h3>
              <p><strong>Цель:</strong> {stage.goal}</p>
              <div style={{ marginTop: 12 }}>
                <strong>Каналы:</strong>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                  {stage.channels.map(c => (
                    <span key={c} style={{ padding: '2px 10px', background: stage.color + '22', borderRadius: 12, fontSize: '0.85rem' }}>{c}</span>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <strong>Метрики:</strong>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                  {stage.metrics.map(m => (
                    <span key={m} style={{ padding: '2px 10px', background: 'var(--card-bg)', borderRadius: 12, fontSize: '0.85rem', border: '1px solid var(--border)' }}>{m}</span>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <strong>CRM-стратегия:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.9rem' }}>{stage.crm}</p>
              </div>
            </div>
          </section>

          <section className="card">
            <h2>📊 Lifecycle и метрики</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Этап</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Ключевая метрика</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Бенчмарк (SaaS B2C)</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Если плохо → действие</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Acquisition', 'CAC', '< LTV / 3', 'Оптимизируй каналы, снижай CPC'],
                    ['Activation', 'Activation Rate', '> 25%', 'Упрости онбординг, добавь чек-лист'],
                    ['Retention', 'D30 Retention', '> 10-15%', 'Engagement loops, персонализация'],
                    ['Revenue', 'ARPU', 'Растёт m/m', 'Upsell триггеры, ценовые эксперименты'],
                    ['Referral', 'K-factor', '> 0.5', 'Упрости шаринг, увеличь бонусы'],
                    ['Reactivation', 'Win-back Rate', '> 5%', 'Спецпредложение, limited-time скидки'],
                  ].map(([etap, metric, bench, action]) => (
                    <tr key={etap}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{etap}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>{metric}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>{bench}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* ── Retention ── */}
      {tab === 'retention' && (
        <>
          <section className="card">
            <h2>🔒 Тактики удержания</h2>
            <p style={{ marginBottom: 16 }}>
              Удержание клиента в 5-7× дешевле привлечения нового. Повышение retention на 5%
              увеличивает прибыль на 25-95% (Harvard Business Review).
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Тактика</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Описание</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Влияние</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Когда</th>
                  </tr>
                </thead>
                <tbody>
                  {retentionTactics.map(t => (
                    <tr key={t.tactic}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{t.tactic}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{t.desc}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{t.impact}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{t.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>📐 Формулы Retention</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 16 }}>
              {[
                { name: 'Retention Rate', formula: '(Активные в конце - Новые) / Активные в начале × 100%', example: '(800 - 200) / 1000 = 60%' },
                { name: 'Churn Rate', formula: 'Потерянные за период / Активные в начале × 100%', example: '50 / 1000 = 5% monthly churn' },
                { name: 'Stickiness (DAU/MAU)', formula: 'DAU / MAU × 100%', example: '1500 / 10000 = 15% (хорошо: >20%)' },
                { name: 'Net Revenue Retention', formula: '(MRR начало + Expansion - Churn - Contraction) / MRR начало × 100%', example: '(100K + 20K - 5K - 3K) / 100K = 112% (>100% — рост без новых)' },
              ].map(f => (
                <div key={f.name} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <h4 style={{ margin: '0 0 8px' }}>{f.name}</h4>
                  <code style={{ fontSize: '0.8rem', display: 'block', marginBottom: 8 }}>{f.formula}</code>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Пример: {f.example}</div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── CRM ── */}
      {tab === 'crm' && (
        <>
          <section className="card">
            <h2>📧 CRM и Email-маркетинг</h2>
            <p style={{ marginBottom: 16 }}>
              CRM (Customer Relationship Management) — система управления коммуникациями с клиентами.
              Цель: отправить правильное сообщение правильному человеку в правильное время.
            </p>

            <h3>Типы email-кампаний</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12, marginTop: 12 }}>
              {[
                { type: 'Trigger (автоматические)', icon: '⚡', examples: ['Welcome-серия', 'Брошенная корзина', 'Milestone', 'Reactivation'], color: '#3b82f6' },
                { type: 'Transactional', icon: '📄', examples: ['Подтверждение заказа', 'Чек', 'Сброс пароля', 'Изменение подписки'], color: '#22c55e' },
                { type: 'Promotional', icon: '📢', examples: ['Акции', 'Новый продукт', 'Сезонные', 'Flash sale'], color: '#f59e0b' },
                { type: 'Content / Newsletter', icon: '📰', examples: ['Еженедельный дайджест', 'Обучающая серия', 'Персональные рекомендации'], color: '#8b5cf6' },
              ].map(c => (
                <div key={c.type} style={{ padding: 16, background: c.color + '11', border: `1px solid ${c.color}33`, borderRadius: 8 }}>
                  <h4 style={{ margin: '0 0 8px' }}>{c.icon} {c.type}</h4>
                  <ul className="info-list">
                    {c.examples.map(e => <li key={e} style={{ fontSize: '0.85rem', marginBottom: 4 }}>{e}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>🎯 Сегментация в CRM</h2>
            <div style={{ overflowX: 'auto', marginTop: 12 }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Тип сегментации</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Примеры сегментов</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Применение</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Поведенческая', 'Активные, Спящие, Churned, Power users', 'Trigger-кампании, персонализация'],
                    ['По lifecycle', 'Trial, Onboarding, Activated, Loyal, At-risk', 'Разные CRM-цепочки для каждого этапа'],
                    ['RFM (Recency, Frequency, Monetary)', 'Champions, Loyal, At Risk, Lost', 'Приоритизация усилий, спецпредложения'],
                    ['Демографическая', 'Страна, возраст, индустрия (B2B)', 'Локализация, таргетинг контента'],
                    ['По каналу привлечения', 'Organic, Paid, Referral, Direct', 'Атрибуция, оптимизация бюджета'],
                  ].map(([type, segments, use]) => (
                    <tr key={type}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{type}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{segments}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>📊 Метрики email-маркетинга</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginTop: 12 }}>
              {[
                { metric: 'Open Rate', benchmark: '15-25%', desc: '% открытий от доставленных' },
                { metric: 'CTR', benchmark: '2-5%', desc: '% кликов от доставленных' },
                { metric: 'CTOR', benchmark: '10-20%', desc: '% кликов от открытий' },
                { metric: 'Unsubscribe Rate', benchmark: '< 0.5%', desc: '% отписок от доставленных' },
                { metric: 'Bounce Rate', benchmark: '< 2%', desc: '% недоставленных (hard + soft)' },
                { metric: 'Delivery Rate', benchmark: '> 95%', desc: '% успешно доставленных' },
              ].map(m => (
                <div key={m.metric} style={{ padding: 12, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{m.metric}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent)', margin: '4px 0' }}>{m.benchmark}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{m.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── Cohort ── */}
      {tab === 'cohort' && (
        <>
          <section className="card">
            <h2>📊 Когортный анализ</h2>
            <p style={{ marginBottom: 16 }}>
              Когорта — группа пользователей, пришедших в одном периоде. Когортный анализ
              показывает, как retention меняется во времени для каждой группы.
              Это единственный способ понять, улучшается ли удержание от месяца к месяцу.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Когорта</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>D0</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>D1</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>D7</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>D14</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>D30</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>D60</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>D90</th>
                  </tr>
                </thead>
                <tbody>
                  {cohortData.map(c => (
                    <tr key={c.cohort}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{c.cohort}</td>
                      {[c.d0, c.d1, c.d7, c.d14, c.d30, c.d60, c.d90].map((val, i) => {
                        const pct = typeof val === 'number' ? Math.round((val / c.d0) * 100) : null
                        const opacity = pct !== null ? Math.max(0.15, pct / 100) : 0
                        return (
                          <td key={i} style={{
                            padding: '8px 12px',
                            borderBottom: '1px solid var(--border)',
                            textAlign: 'center',
                            background: pct !== null ? `rgba(34, 197, 94, ${opacity})` : 'transparent',
                          }}>
                            {typeof val === 'number' ? (
                              <>
                                <div style={{ fontWeight: 600 }}>{val}</div>
                                {i > 0 && <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{pct}%</div>}
                              </>
                            ) : '—'}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--card-bg)', borderLeft: '3px solid #22c55e', borderRadius: 4, fontSize: '0.9rem' }}>
              <strong>Как читать:</strong> Февральская когорта (1200 чел.) лучше январской: D30 retention 16.25% vs 15%.
              Значит, изменения в продукте между январём и февралём положительно повлияли на удержание.
            </div>
          </section>

          <section className="card">
            <h2>🧠 Как использовать когорты</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
              {[
                { title: 'Оценка изменений', desc: 'Сравнивай когорты до и после фичи/изменения онбординга. Если D7 растёт в новых когортах — изменение работает.' },
                { title: 'Поиск проблемных периодов', desc: 'Если retention резко падает на D3 — значит, после 3 дня пользователи теряют интерес. Фокусируйся на D1-D3 experience.' },
                { title: 'Сегментация когорт', desc: 'Разрезай по каналу привлечения: Organic vs Paid. Organic когорты обычно имеют лучший retention — это PMF-сигнал.' },
                { title: 'Прогноз LTV', desc: 'Retention кривая стабилизируется? Можно экстраполировать и рассчитать predicted LTV = ARPU × (1 / Churn Rate).' },
              ].map(c => (
                <div key={c.title} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <h4 style={{ margin: '0 0 6px' }}>{c.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── Interview ── */}
      <section className="card">
        <h2>❓ Вопросы на собесе</h2>
        <div className="interview-item"><div className="q">Что такое AARRR и как он связан с CRM?</div><div className="a">AARRR (Pirate Metrics) — модель lifecycle: Acquisition → Activation → Retention → Revenue → Referral. CRM обслуживает каждый этап: welcome-серия (activation), engagement-рассылки (retention), upsell (revenue), реферальные бонусы (referral), win-back серии (reactivation)</div></div>
        <div className="interview-item"><div className="q">Как вы подойдёте к улучшению retention?</div><div className="a">1) Когортный анализ: найти, где именно отваливаются. 2) Если D1 плохой — проблема в онбординге. 3) Если D7-D30 — нет engagement loop. 4) Exit survey для понимания причин. 5) A/B тесты: стрики, дайджесты, push-уведомления. 6) Мониторить: Retention Rate, Churn Rate, DAU/MAU</div></div>
        <div className="interview-item"><div className="q">Объясните когортный анализ</div><div className="a">Группируем пользователей по дате регистрации (когорта). Смотрим, какой процент активен через 1, 7, 30 дней. Сравниваем когорты между собой: если новые когорты имеют лучший retention — значит, продукт и маркетинг улучшаются</div></div>
      </section>
    </div>
  )
}
