import { useState, useMemo } from 'react'

export default function UnitEcon() {
  // Main inputs
  const [price, setPrice] = useState(990)
  const [cogs, setCogs] = useState(200)
  const [churnRate, setChurnRate] = useState(5) // % monthly
  const [adSpend, setAdSpend] = useState(100000)
  const [newUsers, setNewUsers] = useState(50)

  // Derived
  const margin = price - cogs
  const marginPct = price > 0 ? (margin / price) * 100 : 0
  const avgLifetimeMonths = churnRate > 0 ? 100 / churnRate : 0
  const ltv = margin * avgLifetimeMonths
  const actualCac = newUsers > 0 ? adSpend / newUsers : 0
  const ltvCacRatio = actualCac > 0 ? ltv / actualCac : 0
  const paybackMonths = margin > 0 ? Math.ceil(actualCac / margin) : Infinity

  const getRatioColor = (r: number) => {
    if (r >= 3) return '#22c55e'
    if (r >= 1) return '#eab308'
    return '#ef4444'
  }
  const getRatioLabel = (r: number) => {
    if (r >= 5) return 'Отлично! Можно масштабировать агрессивно'
    if (r >= 3) return 'Здоровый бизнес'
    if (r >= 1) return 'На грани окупаемости'
    return 'Убыточная юнит-экономика'
  }

  // Churn impact simulation
  const churnScenarios = [2, 5, 10, 15, 20, 30]
  const churnImpact = useMemo(() => churnScenarios.map(cr => {
    const lt = cr > 0 ? 100 / cr : 0
    const ltvVal = margin * lt
    const ratio = actualCac > 0 ? ltvVal / actualCac : 0
    return { churn: cr, lifetime: lt, ltv: ltvVal, ratio }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [margin, actualCac])

  // Cohort simulation
  const [cohortSize, setCohortSize] = useState(100)
  const cohortMonths = 12
  const cohortData = Array.from({ length: cohortMonths }, (_, m) => {
    const retained = Math.round(cohortSize * Math.pow(1 - churnRate / 100, m + 1))
    const revenue = retained * price
    const cumRevenue = Array.from({ length: m + 1 }, (_, k) =>
      Math.round(cohortSize * Math.pow(1 - churnRate / 100, k + 1)) * price
    ).reduce((a, b) => a + b, 0)
    const cumCost = cohortSize * actualCac + Array.from({ length: m + 1 }, (_, k) =>
      Math.round(cohortSize * Math.pow(1 - churnRate / 100, k + 1)) * cogs
    ).reduce((a, b) => a + b, 0)
    return { month: m + 1, retained, revenue, cumRevenue, cumCost, profit: cumRevenue - cumCost }
  })

  const breakEvenMonth = cohortData.findIndex(d => d.profit > 0) + 1

  // Revenue churn vs logo churn
  const [premiumPct, setPremiumPct] = useState(20)
  const [premiumPrice, setPremiumPrice] = useState(2990)
  const regularUsers = 100 - premiumPct
  const premiumUsers = premiumPct
  const totalMRR = regularUsers * price + premiumUsers * premiumPrice
  const logoChurn = churnRate
  const premiumChurned = Math.round(premiumUsers * (churnRate / 2) / 100)
  const regularChurned = Math.round(regularUsers * churnRate / 100)
  const revenueChurn = totalMRR > 0
    ? ((regularChurned * price + premiumChurned * premiumPrice) / totalMRR * 100)
    : 0

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>💰 Юнит-экономика</h1>
        <p>Считаем, зарабатывает ли бизнес на каждом клиенте. Полный разбор всех метрик, связей между ними и влияния churn rate.</p>
      </div>

      {/* ===== INTRO ===== */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Юнит-экономика</strong> — подход к анализу бизнеса через один «юнит» (единицу): клиента, транзакцию
          или подписку. Главный вопрос: «Зарабатываем ли мы на каждом клиенте больше, чем тратим на его привлечение?»
          Если LTV (Lifetime Value) больше CAC (Customer Acquisition Cost) — модель масштабируема.
          Если нет — больше клиентов = больше убытков.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Формула проста: <strong>LTV = ARPU × Lifetime</strong>, где ARPU — средний доход на пользователя в месяц,
          Lifetime — среднее время жизни клиента в месяцах. Для SaaS: Lifetime ≈ 1/Churn Rate.
          Здоровый бизнес: LTV/CAC ≥ 3 и окупаемость CAC за 12 месяцев или меньше.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>⚠️ Частая ошибка</strong>: Считать LTV по средним без учёта когорт. Клиенты 2023 года
            и клиенты 2024 года могут иметь радикально разный Lifetime. Всегда считайте юнит-экономику по когортам,
            чтобы видеть реальную динамику, а не «среднее по больнице».
          </div>
        </div>
      </div>

      {/* ===== CHURN RATE — ПОДРОБНО ===== */}
      <div className="card">
        <h3>📉 Churn Rate — полный разбор</h3>

        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(249,115,22,0.08))',
          borderRadius: 12,
          border: '1px solid rgba(239,68,68,0.25)',
          marginBottom: 24,
        }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>
            Что такое Churn Rate?
          </div>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Churn Rate (коэффициент оттока)</strong> — процент клиентов,
            которые перестали пользоваться продуктом за определённый период. Если в начале месяца было 1000 клиентов,
            а к концу 50 отменили подписку — churn rate = <strong style={{ color: '#ef4444' }}>5%</strong>.
          </p>
          <div style={{
            marginTop: 16,
            padding: '16px 20px',
            background: 'var(--bg-code)',
            borderRadius: 8,
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            lineHeight: 1.8,
          }}>
            <div><span style={{ color: 'var(--text-muted)' }}>// Формула:</span></div>
            <div><strong>Churn Rate = Ушедшие клиенты / Клиенты на начало периода × 100%</strong></div>
            <div style={{ marginTop: 8 }}>
              <span style={{ color: 'var(--text-muted)' }}>// Пример:</span>
            </div>
            <div>Churn Rate = 50 / 1000 × 100% = <span style={{ color: '#ef4444', fontWeight: 700 }}>5%</span></div>
          </div>
        </div>

        {/* Виды churn */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ marginBottom: 12, fontSize: '1rem' }}>🏷️ Виды Churn Rate</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <div style={{
              padding: 20, background: 'var(--bg-secondary)', borderRadius: 12,
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#ef4444' }}>👤 Logo Churn (Customer Churn)</div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                Процент <strong style={{ color: 'var(--text-primary)' }}>клиентов</strong>, которые ушли.
                Не учитывает, сколько они платили. 10 клиентов ушли из 200 = 5%.
              </p>
              <div style={{
                marginTop: 12, padding: '10px 14px', background: 'var(--bg-code)', borderRadius: 8,
                fontSize: '0.85rem', fontFamily: 'monospace',
              }}>
                Logo Churn = Ушедших / Всего × 100%
              </div>
            </div>
            <div style={{
              padding: 20, background: 'var(--bg-secondary)', borderRadius: 12,
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#f59e0b' }}>💸 Revenue Churn (MRR Churn)</div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                Процент <strong style={{ color: 'var(--text-primary)' }}>выручки</strong>, который потерян из-за оттока.
                Важнее Logo Churn! Потеря одного Enterprise-клиента может быть хуже, чем 100 бесплатных.
              </p>
              <div style={{
                marginTop: 12, padding: '10px 14px', background: 'var(--bg-code)', borderRadius: 8,
                fontSize: '0.85rem', fontFamily: 'monospace',
              }}>
                Revenue Churn = Потерянный MRR / Общий MRR × 100%
              </div>
            </div>
            <div style={{
              padding: 20, background: 'var(--bg-secondary)', borderRadius: 12,
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#22c55e' }}>📊 Net Revenue Churn</div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                Учитывает <strong style={{ color: 'var(--text-primary)' }}>апгрейды</strong> оставшихся клиентов.
                Может быть <strong style={{ color: '#22c55e' }}>отрицательным</strong> — это значит, что расширение выручки
                от текущих клиентов покрывает потери от оттока. Мечта любого SaaS!
              </p>
              <div style={{
                marginTop: 12, padding: '10px 14px', background: 'var(--bg-code)', borderRadius: 8,
                fontSize: '0.85rem', fontFamily: 'monospace',
              }}>
                Net = (Потери − Апгрейды) / MRR × 100%
              </div>
            </div>
          </div>
        </div>

        {/* Почему churn важен */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ marginBottom: 12, fontSize: '1rem' }}>⚡ Почему Churn Rate — самая важная метрика</h4>
          <div style={{
            padding: 20, background: 'var(--bg-secondary)', borderRadius: 12,
            border: '1px solid var(--border-color)',
          }}>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.8, marginBottom: 16, color: 'var(--text-secondary)' }}>
              Churn Rate напрямую определяет <strong style={{ color: 'var(--text-primary)' }}>все</strong> ключевые метрики бизнеса:
            </p>
            <div style={{ display: 'grid', gap: 12 }}>
              {[
                {
                  icon: '⏳', title: 'Lifetime (срок жизни клиента)',
                  desc: 'Lifetime = 1 / Churn Rate. При 5% churn клиент живёт ~20 месяцев. При 10% — всего 10. Разница в 2 раза!',
                  formula: 'Churn 5% → Lifetime 20 мес  |  Churn 10% → Lifetime 10 мес',
                },
                {
                  icon: '💰', title: 'LTV (пожизненная ценность)',
                  desc: 'LTV = Маржа × Lifetime. Снижение churn с 10% до 5% удваивает LTV каждого клиента.',
                  formula: 'Маржа 790₽ × 20 мес = 15 800₽  vs  790₽ × 10 мес = 7 900₽',
                },
                {
                  icon: '📈', title: 'Рост базы клиентов',
                  desc: 'Если привлекаете 100 клиентов/мес, а churn 20% от базы 400 — уходят 80. Прирост всего 20. С churn 5% уходят 20, прирост 80.',
                  formula: 'Потолок роста = Новые / Churn Rate',
                },
                {
                  icon: '🎯', title: 'CAC Payback (окупаемость привлечения)',
                  desc: 'Высокий churn означает, что клиент может уйти до того, как окупит затраты на привлечение.',
                  formula: 'Если payback 8 мес, а lifetime 10 мес — прибыль всего 2 месяца',
                },
              ].map(item => (
                <div key={item.title} style={{
                  display: 'flex', gap: 14, padding: '14px 16px',
                  background: 'var(--bg-code)', borderRadius: 10,
                }}>
                  <div style={{ fontSize: '1.3rem', flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4, fontSize: '0.92rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</div>
                    <div style={{
                      marginTop: 8, padding: '6px 10px', background: 'var(--bg-secondary)', borderRadius: 6,
                      fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--accent-main)',
                    }}>{item.formula}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Бенчмарки churn */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ marginBottom: 12, fontSize: '1rem' }}>📊 Бенчмарки: какой Churn Rate считается нормальным?</h4>
          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr>
                  {['Сегмент', 'Месячный Churn', 'Годовой Churn', 'Пример'].map(h => (
                    <th key={h} style={{
                      padding: '12px 16px', textAlign: h === 'Сегмент' || h === 'Пример' ? 'left' : 'center',
                      background: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)', fontWeight: 700,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { segment: 'Enterprise SaaS', monthly: '0.5–1%', annual: '5–10%', example: 'Salesforce, Slack', color: '#22c55e' },
                  { segment: 'Mid-market SaaS', monthly: '1–2%', annual: '10–20%', example: 'HubSpot, Mailchimp', color: '#22c55e' },
                  { segment: 'SMB SaaS', monthly: '3–5%', annual: '30–50%', example: 'Canva, Notion', color: '#eab308' },
                  { segment: 'Consumer Subscription', monthly: '5–7%', annual: '50–60%', example: 'Netflix, Spotify', color: '#f59e0b' },
                  { segment: 'Mobile Apps', monthly: '10–20%', annual: '80–95%', example: 'Фитнес-трекеры', color: '#ef4444' },
                  { segment: 'E-commerce (повтор)', monthly: '20–40%', annual: '90–99%', example: 'Разовые покупки', color: '#ef4444' },
                ].map(row => (
                  <tr key={row.segment}>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '0.9rem' }}>{row.segment}</td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-color)', textAlign: 'center' }}>
                      <span style={{ color: row.color, fontWeight: 700 }}>{row.monthly}</span>
                    </td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-color)', textAlign: 'center' }}>
                      <span style={{ color: row.color, fontWeight: 700 }}>{row.annual}</span>
                    </td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Наглядный пример: два сценария */}
        <div style={{ marginBottom: 16 }}>
          <h4 style={{ marginBottom: 12, fontSize: '1rem' }}>🔬 Наглядный пример: Churn 5% vs 10% за год</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { cr: 5, color: '#22c55e', label: 'Churn 5%/мес' },
              { cr: 10, color: '#ef4444', label: 'Churn 10%/мес' },
            ].map(scenario => {
              const months = Array.from({ length: 12 }, (_, i) =>
                Math.round(1000 * Math.pow(1 - scenario.cr / 100, i + 1))
              )
              return (
                <div key={scenario.cr} style={{
                  padding: 20, background: 'var(--bg-secondary)', borderRadius: 12,
                  border: `2px solid ${scenario.color}25`,
                }}>
                  <div style={{ fontWeight: 700, marginBottom: 4, color: scenario.color }}>{scenario.label}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                    Начинаем с 1000 клиентов
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 100 }}>
                    {months.map((count, i) => (
                      <div key={i} style={{
                        flex: 1,
                        height: `${Math.max(2, (count / 1000) * 100)}px`,
                        background: `${scenario.color}${i < 3 ? '90' : i < 6 ? '70' : i < 9 ? '50' : '30'}`,
                        borderRadius: '3px 3px 0 0',
                      }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    <span>мес 1</span><span>мес 12</span>
                  </div>
                  <div style={{
                    marginTop: 12, padding: '10px 14px', background: 'var(--bg-code)', borderRadius: 8,
                    display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem',
                  }}>
                    <span>Осталось:</span>
                    <strong style={{ color: scenario.color }}>{months[11] ?? 0} из 1000 ({((months[11] ?? 0) / 10).toFixed(0)}%)</strong>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="info-box" style={{ marginTop: 12 }}>
            <div className="info-box-content">
              Разница всего 5 п.п. в месячном churn, но за 12 месяцев:
              при <strong>Churn 5%</strong> остаётся ~54% клиентов,
              при <strong>Churn 10%</strong> — только ~28%. Почти <strong>в 2 раза меньше!</strong> Это экспоненциальный эффект.
            </div>
          </div>
        </div>

        {/* Как снижать churn */}
        <div>
          <h4 style={{ marginBottom: 12, fontSize: '1rem' }}>🛠️ Как снижать Churn Rate</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
            {[
              { icon: '🎓', title: 'Onboarding', items: ['Welcome-серия писем', 'Интерактивные туториалы', 'Time-to-value < 5 минут', 'Персональный чекин на 7й день'] },
              { icon: '📊', title: 'Мониторинг здоровья', items: ['Health Score для каждого клиента', 'Триггеры на падение активности', 'NPS/CSAT опросы', 'Exit survey при уходе'] },
              { icon: '💬', title: 'Engagement', items: ['Push/email при бездействии', 'Персональные рекомендации', 'Комьюнити и вебинары', 'Фича-анонсы'] },
              { icon: '🔒', title: 'Retention-механики', items: ['Годовая подписка со скидкой', 'Switching costs (данные, интеграции)', 'Программа лояльности', 'Win-back кампании'] },
            ].map(cat => (
              <div key={cat.title} style={{
                padding: 16, background: 'var(--bg-secondary)', borderRadius: 10,
                border: '1px solid var(--border-color)',
              }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{cat.icon} {cat.title}</div>
                <ul className="info-list">
                  {cat.items.map(item => (
                    <li key={item} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 4, lineHeight: 1.5 }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CHURN IMPACT SIMULATOR ===== */}
      <div className="card">
        <h3>🎚️ Как Churn Rate влияет на бизнес</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
          Таблица показывает, как разные уровни churn rate влияют на LTV и LTV/CAC
          при текущих параметрах (маржа {margin.toLocaleString()} ₽, CAC {actualCac.toLocaleString()} ₽):
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '0.95rem' }}>
            <thead>
              <tr>
                {['Churn Rate', 'Lifetime', 'LTV', 'LTV/CAC', 'Вердикт'].map(h => (
                  <th key={h} style={{
                    padding: '14px 18px', textAlign: h === 'Вердикт' ? 'left' : 'center',
                    background: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)',
                    fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {churnImpact.map(row => {
                const isActive = Math.abs(row.churn - churnRate) < 0.1
                return (
                  <tr key={row.churn} style={{
                    background: isActive ? 'rgba(249,115,22,0.08)' : undefined,
                  }}>
                    <td style={{
                      padding: '12px 18px', borderBottom: '1px solid var(--border-color)',
                      textAlign: 'center', fontWeight: isActive ? 800 : 600,
                      color: isActive ? 'var(--accent-main)' : 'var(--text-primary)',
                    }}>
                      {row.churn}%{isActive ? ' ◀' : ''}
                    </td>
                    <td style={{ padding: '12px 18px', borderBottom: '1px solid var(--border-color)', textAlign: 'center' }}>
                      {row.lifetime.toFixed(0)} мес
                    </td>
                    <td style={{ padding: '12px 18px', borderBottom: '1px solid var(--border-color)', textAlign: 'center', fontWeight: 600 }}>
                      {Math.round(row.ltv).toLocaleString()} ₽
                    </td>
                    <td style={{
                      padding: '12px 18px', borderBottom: '1px solid var(--border-color)', textAlign: 'center',
                      fontWeight: 700, color: getRatioColor(row.ratio),
                    }}>
                      {row.ratio.toFixed(1)}x
                    </td>
                    <td style={{
                      padding: '12px 18px', borderBottom: '1px solid var(--border-color)',
                      fontSize: '0.85rem', color: 'var(--text-secondary)',
                    }}>
                      {row.ratio >= 5 ? '🚀 Агрессивное масштабирование' :
                       row.ratio >= 3 ? '✅ Здоровый бизнес' :
                       row.ratio >= 1 ? '⚠️ На грани' : '❌ Убыточно'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Logo vs Revenue Churn Demo ===== */}
      <div className="card">
        <h3>👤💸 Logo Churn vs Revenue Churn — интерактив</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
          Logo Churn (по клиентам) и Revenue Churn (по выручке) — два разных показателя.
          Настройте распределение клиентов, чтобы увидеть разницу:
        </p>
        <div className="grid-2" style={{ margin: '16px 0' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>
              Доля Premium-клиентов: {premiumPct}%
            </label>
            <input type="range" min={0} max={50} value={premiumPct}
              onChange={e => setPremiumPct(+e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-main)' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>
              Цена Premium: {premiumPrice.toLocaleString()} ₽
            </label>
            <input className="input" type="number" value={premiumPrice}
              onChange={e => setPremiumPrice(+e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16, marginTop: 16 }}>
          <div style={{ padding: 16, borderRadius: 10, background: 'var(--bg-secondary)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Общий MRR</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-main)' }}>{totalMRR.toLocaleString()} ₽</div>
          </div>
          <div style={{ padding: 16, borderRadius: 10, background: 'var(--bg-secondary)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Logo Churn</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ef4444' }}>{logoChurn.toFixed(1)}%</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>по клиентам</div>
          </div>
          <div style={{ padding: 16, borderRadius: 10, background: 'var(--bg-secondary)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Revenue Churn</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f59e0b' }}>{revenueChurn.toFixed(1)}%</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>по выручке</div>
          </div>
        </div>
        <div className="info-box" style={{ marginTop: 16 }}>
          <div className="info-box-content">
            <strong>💡 Почему Revenue Churn ≠ Logo Churn?</strong><br />
            Premium-клиенты уходят реже (churn в 2 раза ниже), но составляют бо́льшую долю выручки.
            Поэтому Revenue Churn часто ниже Logo Churn. Если уходят в основном «мелкие» клиенты —
            это менее болезненно. Но если уходят Premium — Revenue Churn будет выше Logo Churn!
          </div>
        </div>
      </div>

      {/* ===== Input Panel ===== */}
      <div className="card">
        <h3>⚙️ Калькулятор юнит-экономики</h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
          Настройте параметры своего бизнеса. Результаты обновляются мгновенно:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { label: 'Цена подписки (мес), ₽', value: price, setter: setPrice },
            { label: 'Себестоимость (COGS), ₽/мес', value: cogs, setter: setCogs },
            { label: 'Рекламный бюджет, ₽', value: adSpend, setter: setAdSpend },
            { label: 'Новых пользователей', value: newUsers, setter: setNewUsers },
          ].map(field => (
            <div key={field.label}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {field.label}
              </label>
              <input className="input" type="number" value={field.value}
                onChange={e => field.setter(+e.target.value)} />
            </div>
          ))}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>
              Churn rate (% / мес)
            </label>
            <input className="input" type="number" value={churnRate} min={0.1} max={100} step={0.5}
              onChange={e => setChurnRate(+e.target.value)} />
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Lifetime = {avgLifetimeMonths.toFixed(0)} мес (1 / {churnRate}%)
            </div>
          </div>
        </div>
      </div>

      {/* ===== Results Dashboard ===== */}
      <div className="card">
        <h3 style={{ marginBottom: 20 }}>📊 Результаты</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 14,
        }}>
          {[
            { label: 'Маржа / мес', value: `${margin.toLocaleString()} ₽`, sub: `${marginPct.toFixed(0)}% от цены`, color: margin > 0 ? '#22c55e' : '#ef4444' },
            { label: 'CAC', value: `${actualCac.toLocaleString()} ₽`, sub: 'бюджет ÷ юзеры', color: 'var(--accent-main)' },
            { label: 'LTV', value: `${Math.round(ltv).toLocaleString()} ₽`, sub: `маржа × ${avgLifetimeMonths.toFixed(0)} мес`, color: '#6366f1' },
            { label: 'LTV / CAC', value: ltvCacRatio.toFixed(1) + 'x', sub: getRatioLabel(ltvCacRatio), color: getRatioColor(ltvCacRatio) },
            { label: 'Payback', value: paybackMonths === Infinity ? '∞' : `${paybackMonths} мес`, sub: 'окупаемость CAC', color: paybackMonths <= 12 ? '#22c55e' : '#ef4444' },
            { label: 'Avg Lifetime', value: `${avgLifetimeMonths.toFixed(0)} мес`, sub: `1 / churn ${churnRate}%`, color: 'var(--text-secondary)' },
          ].map(r => (
            <div key={r.label} style={{
              padding: '18px 14px', borderRadius: 12, background: 'var(--bg-secondary)', textAlign: 'center',
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 6, fontWeight: 500 }}>{r.label}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: r.color, lineHeight: 1.2 }}>{r.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.4 }}>{r.sub}</div>
            </div>
          ))}
        </div>

        {/* LTV/CAC visual bar */}
        <div style={{ marginTop: 20, padding: 16, borderRadius: 10, background: 'var(--bg-code)' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 12 }}>LTV vs CAC — визуальное сравнение</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 80 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{ fontSize: '0.8rem', marginBottom: 6, fontWeight: 600, color: '#6366f1' }}>
                {Math.round(ltv).toLocaleString()} ₽
              </div>
              <div style={{
                width: '100%', background: '#6366f1', borderRadius: '6px 6px 0 0',
                height: Math.min(60, Math.max(8, (ltv / Math.max(ltv, actualCac)) * 60)),
                transition: 'height 0.3s ease',
              }} />
              <div style={{ fontSize: '0.78rem', marginTop: 6, fontWeight: 600 }}>LTV</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{ fontSize: '0.8rem', marginBottom: 6, fontWeight: 600, color: '#ef4444' }}>
                {actualCac.toLocaleString()} ₽
              </div>
              <div style={{
                width: '100%', background: '#ef4444', borderRadius: '6px 6px 0 0',
                height: Math.min(60, Math.max(8, (actualCac / Math.max(ltv, actualCac)) * 60)),
                transition: 'height 0.3s ease',
              }} />
              <div style={{ fontSize: '0.78rem', marginTop: 6, fontWeight: 600 }}>CAC</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Cohort Analysis ===== */}
      <div className="card">
        <h3 style={{ marginBottom: 16 }}>📈 Когортный анализ</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
          Когорта — группа клиентов, привлечённых в одном периоде. Анализ показывает, как когорта генерирует выручку
          и когда окупает затраты на привлечение.
        </p>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Размер когорты: </label>
          <input className="input" type="number" value={cohortSize} min={1}
            onChange={e => setCohortSize(+e.target.value)}
            style={{ width: 120, display: 'inline-block', padding: '6px 12px' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: 8 }}>пользователей</span>
        </div>

        {/* Retention curve */}
        <div style={{
          padding: 20, background: 'var(--bg-secondary)', borderRadius: 12,
          marginBottom: 20, border: '1px solid var(--border-color)',
        }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: 12 }}>📉 Кривая удержания (Retention Curve)</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120, paddingBottom: 20 }}>
            {cohortData.map(d => {
              const pct = (d.retained / cohortSize) * 100
              return (
                <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ fontSize: '0.65rem', marginBottom: 4, color: 'var(--text-muted)', fontWeight: 600 }}>
                    {pct.toFixed(0)}%
                  </div>
                  <div style={{
                    width: '100%',
                    height: `${Math.max(2, pct * 0.75)}px`,
                    background: d.profit > 0
                      ? 'linear-gradient(to top, #22c55e, #22c55e88)'
                      : 'linear-gradient(to top, #6366f1, #6366f188)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.3s ease',
                  }} />
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>{d.month}</div>
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 12, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#6366f1', borderRadius: 2, marginRight: 4, verticalAlign: 'middle' }} />До окупаемости</span>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#22c55e', borderRadius: 2, marginRight: 4, verticalAlign: 'middle' }} />После окупаемости</span>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '0.92rem' }}>
            <thead>
              <tr>
                {['Месяц', 'Осталось', 'Retention', 'Выручка', 'Кум. Выручка', 'Кум. Затраты', 'P&L'].map(h => (
                  <th key={h} style={{
                    padding: '14px 16px',
                    textAlign: h === 'Месяц' ? 'center' : 'right',
                    background: 'var(--bg-secondary)',
                    borderBottom: '2px solid var(--border-color)',
                    fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap',
                    position: 'sticky', top: 0, zIndex: 1,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohortData.map(d => {
                const retentionPct = ((d.retained / cohortSize) * 100).toFixed(0)
                return (
                  <tr key={d.month} style={{
                    background: d.profit > 0 ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.03)',
                  }}>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', textAlign: 'center', fontWeight: 700 }}>{d.month}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', textAlign: 'right' }}>{d.retained}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 50, height: 6, background: 'var(--border-color)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{
                            width: `${retentionPct}%`, height: '100%',
                            background: Number(retentionPct) > 50 ? '#22c55e' : Number(retentionPct) > 25 ? '#eab308' : '#ef4444',
                            borderRadius: 3,
                          }} />
                        </div>
                        <span style={{ fontWeight: 600, minWidth: 35, textAlign: 'right' }}>{retentionPct}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', textAlign: 'right', fontFamily: 'monospace', fontSize: '0.88rem' }}>
                      {d.revenue.toLocaleString()} ₽
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', textAlign: 'right', fontFamily: 'monospace', fontSize: '0.88rem' }}>
                      {d.cumRevenue.toLocaleString()} ₽
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', textAlign: 'right', fontFamily: 'monospace', fontSize: '0.88rem' }}>
                      {d.cumCost.toLocaleString()} ₽
                    </td>
                    <td style={{
                      padding: '12px 16px', borderBottom: '1px solid var(--border-color)',
                      textAlign: 'right', fontWeight: 700,
                      color: d.profit > 0 ? '#22c55e' : '#ef4444',
                      fontFamily: 'monospace', fontSize: '0.88rem',
                    }}>
                      {d.profit > 0 ? '+' : ''}{d.profit.toLocaleString()} ₽
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {breakEvenMonth > 0 && (
          <div className="info-box" style={{ marginTop: 16 }}>
            <div className="info-box-content">
              <div className="info-box-title" style={{ fontSize: '1rem' }}>
                🎯 Точка безубыточности: месяц {breakEvenMonth}
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Когорта из {cohortSize} пользователей окупает затраты ({(cohortSize * actualCac).toLocaleString()} ₽)
                за {breakEvenMonth} месяцев. К 12-му месяцу кумулятивная прибыль:&nbsp;
                <strong style={{ color: (cohortData[11]?.profit ?? 0) > 0 ? '#22c55e' : '#ef4444' }}>
                  {(cohortData[11]?.profit ?? 0) > 0 ? '+' : ''}{(cohortData[11]?.profit ?? 0).toLocaleString()} ₽
                </strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== Связь метрик ===== */}
      <div className="card">
        <h3>🧮 Связь метрик: как всё влияет друг на друга</h3>
        <div style={{
          padding: 20, background: 'var(--bg-secondary)', borderRadius: 12,
          border: '1px solid var(--border-color)', marginBottom: 16,
        }}>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 8,
            fontFamily: 'monospace', fontSize: '0.88rem', lineHeight: 1.8,
          }}>
            <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>
              🔗 Цепочка зависимостей
            </div>
            {[
              { from: 'Цена', op: '−', to: 'COGS', result: `Маржа (${margin.toLocaleString()} ₽)`, color: '#22c55e' },
              { from: 'Бюджет', op: '÷', to: 'Новые юзеры', result: `CAC (${actualCac.toLocaleString()} ₽)`, color: 'var(--accent-main)' },
              { from: '1', op: '÷', to: 'Churn Rate', result: `Lifetime (${avgLifetimeMonths.toFixed(0)} мес)`, color: '#6366f1' },
              { from: 'Маржа', op: '×', to: 'Lifetime', result: `LTV (${Math.round(ltv).toLocaleString()} ₽)`, color: '#6366f1' },
              { from: 'LTV', op: '÷', to: 'CAC', result: `Ratio (${ltvCacRatio.toFixed(1)}x)`, color: getRatioColor(ltvCacRatio) },
              { from: 'CAC', op: '÷', to: 'Маржа', result: `Payback (${paybackMonths === Infinity ? '∞' : paybackMonths + ' мес'})`, color: paybackMonths <= 12 ? '#22c55e' : '#ef4444' },
            ].map((row, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
                padding: '8px 12px', background: 'var(--bg-code)', borderRadius: 8,
              }}>
                <span style={{ color: 'var(--text-secondary)' }}>{row.from}</span>
                <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{row.op}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{row.to}</span>
                <span style={{ color: 'var(--text-muted)' }}>=</span>
                <span style={{ color: row.color, fontWeight: 700 }}>{row.result}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="info-box">
          <div className="info-box-content">
            <strong>🎯 Главный инсайт:</strong> Churn Rate стоит в начале цепочки и влияет на Lifetime → LTV → LTV/CAC → решение о масштабировании.
            Снижение Churn даже на 1-2 п.п. может кардинально изменить экономику бизнеса.
          </div>
        </div>
      </div>

      {/* ===== 4 рычага ===== */}
      <div className="card">
        <h3>⚡ 4 рычага улучшения юнит-экономики</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 16 }}>
          {[
            {
              icon: '💵', title: 'Увеличить ARPU', desc: 'Поднять цены, апсейл, кросс-сейл', impact: 'Растёт маржа → растёт LTV', color: '#22c55e',
              tips: ['A/B тест цены', 'Добавить Premium-тариф', 'Bundling: продавать пакетом'],
            },
            {
              icon: '📉', title: 'Снизить COGS', desc: 'Оптимизация инфраструктуры', impact: 'Растёт маржа → растёт LTV', color: '#06b6d4',
              tips: ['Автоматизировать поддержку', 'Оптимизация серверов', 'Сократить ручные процессы'],
            },
            {
              icon: '🎯', title: 'Снизить CAC', desc: 'Органика, виральность, CRO', impact: 'Быстрее окупаемость', color: '#f59e0b',
              tips: ['SEO и контент-маркетинг', 'Referral-программа', 'Улучшить конверсию LP'],
            },
            {
              icon: '🔒', title: 'Снизить Churn', desc: 'Retention, onboarding, engagement', impact: 'Длиннее Lifetime → выше LTV', color: '#ef4444',
              tips: ['Улучшить первый опыт (FTUE)', 'Health Score + триггеры', 'Exit survey для причин оттока'],
            },
          ].map(lever => (
            <div key={lever.title} style={{
              padding: 20, background: 'var(--bg-secondary)', borderRadius: 12, borderTop: `3px solid ${lever.color}`,
            }}>
              <div style={{ fontSize: '1.3rem', marginBottom: 8 }}>{lever.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{lever.title}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8 }}>{lever.desc}</div>
              <div style={{ padding: '6px 10px', background: `${lever.color}15`, borderRadius: 6, fontSize: '0.82rem', color: lever.color, fontWeight: 600, marginBottom: 12 }}>
                → {lever.impact}
              </div>
              <ul className="info-list">
                {lever.tips.map(tip => <li key={tip} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 3, lineHeight: 1.5 }}>{tip}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Формулы ===== */}
      <div className="card">
        <h3>📐 Формулы — полный справочник</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
          {[
            { name: 'CAC', formula: 'Marketing Spend / New Customers', desc: 'Стоимость привлечения клиента' },
            { name: 'ARPU', formula: 'Total Revenue / Total Users', desc: 'Средний доход на пользователя' },
            { name: 'Gross Margin', formula: '(Revenue − COGS) / Revenue', desc: 'Валовая маржинальность' },
            { name: 'Churn Rate', formula: 'Churned / Start Customers', desc: 'Коэффициент оттока' },
            { name: 'Avg Lifetime', formula: '1 / Churn Rate', desc: 'Средний срок жизни клиента' },
            { name: 'LTV', formula: 'ARPU × Margin × Lifetime', desc: 'Пожизненная ценность' },
            { name: 'LTV/CAC', formula: 'LTV / CAC (target ≥ 3x)', desc: 'Здоровье бизнес-модели' },
            { name: 'Payback', formula: 'CAC / (ARPU × Margin)', desc: 'Срок окупаемости' },
            { name: 'MRR', formula: 'Σ (Users × Monthly Price)', desc: 'Ежемесячная рекуррентная выручка' },
            { name: 'Net Rev Churn', formula: '(Lost − Expansion) / MRR', desc: 'Чистый отток выручки' },
            { name: 'Quick Ratio', formula: '(New + Expansion) / (Churn + Contr)', desc: 'Эффект. роста SaaS' },
          ].map(f => (
            <div key={f.name} style={{
              padding: '12px 16px', borderRadius: 10, background: 'var(--bg-secondary)',
              display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
              border: '1px solid var(--border-color)',
            }}>
              <strong style={{ minWidth: 110, fontSize: '0.9rem' }}>{f.name}</strong>
              <code style={{ fontSize: '0.82rem', color: 'var(--accent-main)', flex: 1 }}>{f.formula}</code>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{f.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Кейсы ===== */}
      <div className="card">
        <h3>📚 Кейсы из практики</h3>
        <div style={{ display: 'grid', gap: 16, marginTop: 12 }}>
          {[
            {
              title: '🟢 Netflix', tag: 'Consumer Subscription',
              metrics: 'ARPU $15.50 | Churn ~2.5%/мес | Lifetime ~40 мес | LTV ~$620',
              insight: 'Низкий churn за счёт оригинального контента и привычки. Инвестиции в контент — это инвестиции в retention.',
            },
            {
              title: '🔵 Slack', tag: 'Enterprise SaaS',
              metrics: 'ARPU $12/user | Churn <1%/мес | Net Revenue Retention 130%',
              insight: 'Отрицательный чистый churn! Команды расширяются и переходят на дорогие тарифы. Switching costs огромны.',
            },
            {
              title: '🟡 Фитнес-приложение', tag: 'Mobile App',
              metrics: 'ARPU 990₽ | Churn 15%/мес | Lifetime 6.7 мес | CAC 2000₽ | LTV/CAC 2.4x',
              insight: 'LTV/CAC < 3x — нельзя масштабировать. Решение: годовая подписка, push на 3й день бездействия, геймификация.',
            },
            {
              title: '🔴 E-commerce магазин', tag: 'E-commerce',
              metrics: 'Средний чек 3500₽ | Повторная покупка 8% | CAC 800₽',
              insight: 'Нет подписки — другая формула: LTV = Чек × Покупки × Маржа. Нужны email-рассылка, лояльность, рекомендации.',
            },
          ].map(c => (
            <div key={c.title} style={{
              padding: 20, background: 'var(--bg-secondary)', borderRadius: 12, border: '1px solid var(--border-color)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{c.title}</div>
                <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: '0.75rem', background: 'rgba(249,115,22,0.12)', color: 'var(--accent-main)', fontWeight: 600 }}>{c.tag}</span>
              </div>
              <div style={{ padding: '8px 12px', background: 'var(--bg-code)', borderRadius: 8, fontSize: '0.85rem', fontFamily: 'monospace', color: 'var(--text-secondary)', marginBottom: 10 }}>{c.metrics}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>💡 {c.insight}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Частые ошибки ===== */}
      <div className="card">
        <h3>🚫 Частые ошибки в юнит-экономике</h3>
        <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
          {[
            { mistake: 'Считают LTV без учёта churn', why: 'Клиенты не живут вечно. Нужно Lifetime = 1/Churn.', fix: 'Считать Lifetime на основе реального churn по когортам' },
            { mistake: 'Путают Revenue и Gross Margin', why: 'LTV на основе выручки завышен. Нужно вычесть COGS.', fix: 'LTV = (ARPU − COGS) × Lifetime' },
            { mistake: 'Средний churn по всем когортам', why: 'Ранние когорты 3%, новые 12%. Среднее 7.5% ≠ реальность.', fix: 'Юнит-экономика для каждой когорты отдельно' },
            { mistake: 'Не все расходы в CAC', why: 'CAC — не только реклама. + зарплаты, инструменты, агентства.', fix: 'Fully-loaded CAC = (Весь маркетинг + Sales) / Новые' },
            { mistake: 'Масштабирование при LTV/CAC < 3', why: 'Не учитываются операционные расходы, налоги, R&D.', fix: 'LTV/CAC ≥ 3x и Payback ≤ 12 мес перед масштабированием' },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '16px 20px', background: 'var(--bg-secondary)', borderRadius: 10, borderLeft: '3px solid #ef4444',
            }}>
              <div style={{ fontWeight: 700, marginBottom: 6, color: '#ef4444', fontSize: '0.95rem' }}>❌ {item.mistake}</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 8 }}>{item.why}</div>
              <div style={{ padding: '8px 12px', background: 'rgba(34,197,94,0.08)', borderRadius: 6, fontSize: '0.85rem', color: '#22c55e', borderLeft: '2px solid #22c55e' }}>
                ✅ {item.fix}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Чеклист для собеседования ===== */}
      <div className="card">
        <h3>🎤 Чеклист для собеседования</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginTop: 12 }}>
          {[
            { q: 'Что такое Churn Rate и почему он важен?', a: 'Процент ушедших клиентов. Определяет Lifetime → LTV → всю экономику. Снижение на 1 п.п. может удвоить LTV.' },
            { q: 'Разница Logo Churn и Revenue Churn?', a: 'Logo — по клиентам. Revenue — по выручке. Revenue Churn важнее, т.к. не все клиенты равноценны.' },
            { q: 'Что такое Net Negative Churn?', a: 'Expansion revenue перекрывает потери от оттока. Мечта SaaS. Пример: Slack с NRR 130%.' },
            { q: 'Когда LTV/CAC < 3x — что делать?', a: '4 рычага: ARPU↑, COGS↓, CAC↓, Churn↓. Начинать с наибольшего эффекта при наименьших затратах.' },
            { q: 'Как считать LTV для e-commerce?', a: 'LTV = Avg Order Value × Purchase Frequency × Lifespan × Gross Margin.' },
            { q: 'Что такое Payback Period и нормы?', a: 'Время окупаемости CAC. Для SaaS норма ≤ 12 мес. Если больше — проблема с cash flow.' },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '14px 16px', background: 'var(--bg-secondary)', borderRadius: 10, border: '1px solid var(--border-color)',
            }}>
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: '0.9rem', color: 'var(--accent-main)' }}>{item.q}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}