import { useState } from 'react'

const funnelSteps = [
  { key: 'awareness', label: 'Awareness (Осведомлённость)', icon: '👁️', color: '#3b82f6', width: 100, defaultUsers: 10000, desc: 'Люди узнают о вас: реклама, SEO, PR, соцсети.', kpis: ['Охват', 'Показы', 'Трафик', 'Brand Awareness'] },
  { key: 'interest', label: 'Interest (Интерес)', icon: '🤔', color: '#8b5cf6', width: 82, defaultUsers: 3000, desc: 'Изучают продукт: читают блог, смотрят демо.', kpis: ['Время на сайте', 'Просмотры страниц', 'Подписки на рассылку'] },
  { key: 'consideration', label: 'Consideration (Рассмотрение)', icon: '🔍', color: '#a855f7', width: 64, defaultUsers: 800, desc: 'Сравнивают с конкурентами, читают отзывы, пробуют trial.', kpis: ['Регистрации', 'Trial активации', 'Запросы демо'] },
  { key: 'intent', label: 'Intent (Намерение)', icon: '🎯', color: '#d946ef', width: 48, defaultUsers: 200, desc: 'Добавляют в корзину, запрашивают КП, начинают оплату.', kpis: ['Add-to-cart', 'Запросы цены', 'Начатые оплаты'] },
  { key: 'purchase', label: 'Purchase (Покупка)', icon: '💳', color: '#ec4899', width: 34, defaultUsers: 80, desc: 'Совершают первую покупку или подписку.', kpis: ['Оплаты', 'Revenue', 'AOV', 'CAC'] },
  { key: 'loyalty', label: 'Loyalty (Лояльность)', icon: '❤️', color: '#f43f5e', width: 22, defaultUsers: 30, desc: 'Повторные покупки, удержание, рекомендации.', kpis: ['Retention Rate', 'NPS', 'LTV', 'Referrals'] },
]

const aidaModel = [
  { letter: 'A', name: 'Attention', desc: 'Привлечь внимание — яркий заголовок, визуал, боль', color: '#ef4444' },
  { letter: 'I', name: 'Interest', desc: 'Вызвать интерес — покажите, что понимаете проблему', color: '#f59e0b' },
  { letter: 'D', name: 'Desire', desc: 'Создать желание — выгоды, социальные доказательства', color: '#22c55e' },
  { letter: 'A', name: 'Action', desc: 'Призыв к действию — CTA, скидка, дедлайн', color: '#3b82f6' },
]

export default function MarketingFunnel() {
  const [users, setUsers] = useState<Record<string, number>>(
    Object.fromEntries(funnelSteps.map(s => [s.key, s.defaultUsers]))
  )
  const [selectedStep, setSelectedStep] = useState(0)
  const [tab, setTab] = useState<'funnel' | 'aida'>('funnel')

  const updateUsers = (key: string, value: number) => {
    setUsers(prev => ({ ...prev, [key]: value }))
  }

  const getConversion = (idx: number) => {
    if (idx === 0) return 100
    const prev = users[funnelSteps[idx - 1]!.key] || 1
    const curr = users[funnelSteps[idx]!.key] || 0
    return prev > 0 ? Math.round((curr / prev) * 100) : 0
  }

  const getOverallConversion = () => {
    const first = users[funnelSteps[0]!.key] || 1
    const last = users[funnelSteps[funnelSteps.length - 1]!.key] || 0
    return first > 0 ? ((last / first) * 100).toFixed(2) : '0'
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔻 Маркетинговая воронка</h1>
        <p>Визуализация пути клиента от первого контакта до лояльности.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Маркетинговая воронка</strong> — это модель пути клиента от первого контакта до покупки.
          Концепция появилась в 1898 году, когда Элмо Льюис описал модель <strong>AIDA</strong>:
          Attention → Interest → Desire → Action.
          Сегодня воронку расширили: после Action идут <strong>Loyalty</strong> и <strong>Advocacy</strong>.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Почему это важно? Воронка показывает, <strong>где вы теряете людей</strong>. Без воронки маркетолог
          видит только «пришло 1000, купило 10». С воронкой — понимает, что 500 отвалились на странице цен
          (значит, проблема в прайсинге, а не в трафике).
        </p>
        <div className="info-box">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <div className="info-box-title">Воронка ≠ линейный путь</div>
            Реальный путь клиента нелинеен: человек может вернуться на этап назад, прийти через 3 месяца
            или перескочить этапы. Но воронка — полезная схема для анализа и оптимизации.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {([
          { id: 'funnel' as const, label: '🔻 Воронка' },
          { id: 'aida' as const, label: '📢 AIDA' },
        ]).map(t => (
          <button key={t.id} className={`btn ${tab === t.id ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'funnel' && (
        <>
          {/* Visual funnel */}
          <div className="card">
            <h3>🔻 Интерактивная воронка</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
              Кликайте на этапы, чтобы увидеть детали. Меняйте числа в таблице ниже.
            </p>

            <div className="funnel">
              {funnelSteps.map((step, i) => {
                const isSelected = selectedStep === i
                const count = users[step.key] || 0
                const conv = getConversion(i)
                return (
                  <div key={step.key}
                    className="funnel-step"
                    onClick={() => setSelectedStep(i)}
                    style={{
                      width: `${step.width}%`, background: `${step.color}${isSelected ? '30' : '18'}`,
                      border: `2px solid ${isSelected ? step.color : 'transparent'}`,
                      color: step.color, fontSize: '0.85rem',
                    }}>
                    {step.icon} {step.label.split('(')[0]} — <strong>{count.toLocaleString()}</strong>
                    {i > 0 && <span style={{ fontSize: '0.7rem', marginLeft: 8, opacity: 0.7 }}>({conv}%)</span>}
                  </div>
                )
              })}
            </div>

            {/* Selected step detail */}
            {(() => {
              const step = funnelSteps[selectedStep]!
              return (
                <div className="info-box" style={{ marginTop: 16, borderColor: step.color, background: `${step.color}08` }}>
                  <div className="info-box-content">
                    <div className="info-box-title" style={{ color: step.color }}>{step.icon} {step.label}</div>
                    <p style={{ fontSize: '0.85rem', marginBottom: 8 }}>{step.desc}</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {step.kpis.map(kpi => (
                        <span key={kpi} style={{
                          fontSize: '0.7rem', padding: '2px 8px', borderRadius: 8,
                          background: `${step.color}20`, color: step.color,
                        }}>{kpi}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Editable table */}
          <div className="card" style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ margin: 0 }}>📊 Данные воронки</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Общая конверсия: <strong style={{ color: 'var(--accent-main)' }}>{getOverallConversion()}%</strong>
              </div>
            </div>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ textAlign: 'left', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Этап</th>
                  <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Пользователи</th>
                  <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Конверсия</th>
                  <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Drop-off</th>
                </tr>
              </thead>
              <tbody>
                {funnelSteps.map((step, i) => {
                  const conv = getConversion(i)
                  const dropoff = i > 0 ? (users[funnelSteps[i - 1]!.key] || 0) - (users[step.key] || 0) : 0
                  return (
                    <tr key={step.key} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: 8, fontSize: '0.85rem' }}>
                        <span style={{ color: step.color }}>{step.icon}</span> {step.label.split('(')[0]}
                      </td>
                      <td style={{ padding: 4, textAlign: 'center' }}>
                        <input type="number" value={users[step.key]} onChange={e => updateUsers(step.key, +e.target.value)}
                          className="input" style={{ width: 100, textAlign: 'center', padding: '4px 8px' }} />
                      </td>
                      <td style={{ padding: 8, textAlign: 'center', fontWeight: 600, color: conv > 30 ? '#22c55e' : conv > 10 ? '#f59e0b' : '#ef4444' }}>
                        {i === 0 ? '—' : `${conv}%`}
                      </td>
                      <td style={{ padding: 8, textAlign: 'center', fontSize: '0.85rem', color: '#ef4444' }}>
                        {i === 0 ? '—' : `-${dropoff.toLocaleString()}`}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'aida' && (
        <div className="card">
          <h3>📢 Модель AIDA</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
            Классическая модель воздействия на потребителя. Используется в рекламе, лендингах, email.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {aidaModel.map((step, i) => (
              <div key={i} style={{
                padding: '20px 24px', borderRadius: 12,
                border: `2px solid ${step.color}40`, background: `${step.color}08`,
                display: 'flex', gap: 16, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', background: step.color,
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '1.2rem', flexShrink: 0,
                }}>
                  {step.letter}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: step.color, marginBottom: 4 }}>{step.name}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="info-box" style={{ marginTop: 20 }}>
            <div className="info-box-content" style={{ fontSize: '0.85rem' }}>
              <strong>Пример для лендинга SaaS:</strong><br />
              <span style={{ color: '#ef4444' }}>A:</span> "Устали тратить 3 часа на отчёты?" →
              <span style={{ color: '#f59e0b' }}> I:</span> "Наш AI делает это за 5 минут" →
              <span style={{ color: '#22c55e' }}> D:</span> "500+ компаний уже сэкономили 10 000 часов" →
              <span style={{ color: '#3b82f6' }}> A:</span> "Попробовать бесплатно →"
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
