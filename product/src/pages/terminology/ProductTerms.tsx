import { useState } from 'react'

interface Term {
  term: string
  abbr?: string
  category: string
  definition: string
  example: string
  related?: string[]
}

const terms: Term[] = [
  { term: 'MVP', abbr: 'Minimum Viable Product', category: 'product', definition: 'Минимальная версия продукта, которая позволяет проверить гипотезу и получить обратную связь от реальных пользователей.', example: 'Zappos начал с того, что фотографировал обувь в магазинах и публиковал на сайте. Заказы покупал сам.', related: ['MLP', 'PoC', 'PMF'] },
  { term: 'MLP', abbr: 'Minimum Lovable Product', category: 'product', definition: 'Минимальный продукт, который вызывает восторг. В отличие от MVP, фокус на эмоциях пользователя.', example: 'Notion вышел не как минимальный блокнот, а как красивый all-in-one workspace.', related: ['MVP'] },
  { term: 'PMF', abbr: 'Product-Market Fit', category: 'product', definition: 'Момент, когда продукт находит свой рынок. Пользователи сами приходят, retention высокий, растёт word-of-mouth.', example: 'Slack: команды стали приглашать другие команды без маркетинга.', related: ['NSM', 'Retention'] },
  { term: 'DAU/MAU', category: 'metrics', definition: 'Daily/Monthly Active Users — ежедневные/ежемесячные активные пользователи. Ratio DAU/MAU показывает «липкость».', example: 'Facebook: DAU/MAU ≈ 66% (очень липкий). Airbnb: ~5% (нормально для такого типа).', related: ['Stickiness', 'Retention'] },
  { term: 'MRR / ARR', category: 'metrics', definition: 'Monthly / Annual Recurring Revenue — повторяющийся доход за месяц/год. Ключевая метрика SaaS.', example: 'Продукт: 500 подписчиков × $20/мес = $10K MRR = $120K ARR', related: ['ARPU', 'Churn'] },
  { term: 'Churn Rate', category: 'metrics', definition: 'Процент пользователей/дохода, потерянных за период. Customer Churn и Revenue Churn считаются отдельно.', example: '1000 юзеров в начале месяца, 50 ушли → Churn = 5%', related: ['Retention', 'LTV'] },
  { term: 'ARPU', abbr: 'Avg Revenue Per User', category: 'metrics', definition: 'Средний доход с одного пользователя за период. ARPPU — то же, но только среди платящих.', example: 'Freemium-игра: 10к DAU, $1000 дохода → ARPU = $0.10', related: ['ARPPU', 'LTV'] },
  { term: 'Retention', category: 'metrics', definition: 'Процент пользователей, вернувшихся через N дней после первого визита (D1, D7, D30).', example: 'D1 = 40% — хорошо для мобильного приложения. D30 = 10% — среднее.', related: ['Churn', 'Cohort'] },
  { term: 'Conversion Rate', category: 'metrics', definition: 'Доля пользователей, совершивших целевое действие: регистрация, покупка, подписка.', example: 'Лендинг: 10 000 визитов, 300 регистраций → CR = 3%', related: ['Funnel', 'A/B test'] },
  { term: 'CustDev', abbr: 'Customer Development', category: 'processes', definition: 'Метод Стива Бланка: выйти из офиса и поговорить с клиентами, чтобы понять их проблемы.', example: 'Прежде чем строить фичу, проведите 10 интервью с целевой аудиторией.', related: ['JTBD', 'Discovery'] },
  { term: 'JTBD', abbr: 'Jobs To Be Done', category: 'processes', definition: 'Фреймворк: люди не покупают продукт, а «нанимают» его для выполнения задачи.', example: 'Milkshake не покупают как десерт — его «нанимают» чтобы скоротать скучную дорогу.', related: ['CustDev', 'Value Prop'] },
  { term: 'OKR', abbr: 'Objectives & Key Results', category: 'processes', definition: 'Фреймворк целеполагания: Objective (качественная цель) + Key Results (измеримые результаты).', example: 'O: Стать #1 торговой площадкой в СНГ. KR1: MAU → 5M. KR2: GMV → $100M', related: ['KPI', 'NSM'] },
  { term: 'Backlog', category: 'processes', definition: 'Приоритизированный список задач/фич, которые нужно сделать. Product Backlog → Sprint Backlog.', example: 'В бэклоге 200 задач, но в следующий спринт возьмём 8 из топа.', related: ['Grooming', 'Sprint'] },
  { term: 'Lean Canvas', category: 'strategy', definition: '1-страничная бизнес-модель от Ash Maurya. Проблема, решение, метрики, каналы — всё на одном листе.', example: 'Стартапы используют его для быстрой валидации идеи перед разработкой.', related: ['BMC', 'MVP'] },
  { term: 'TAM/SAM/SOM', category: 'strategy', definition: 'Total/Serviceable/Obtainable Market — три уровня оценки размера рынка: от глобального до реально достижимого.', example: 'TAM = $10B (весь рынок), SAM = $1B (наш сегмент), SOM = $50M (что реально получим за год)', related: ['Go-to-Market'] },
]

const categories = [
  { key: 'all', name: 'Все', icon: '📋' },
  { key: 'product', name: 'Продукт', icon: '📦' },
  { key: 'metrics', name: 'Метрики', icon: '📊' },
  { key: 'processes', name: 'Процессы', icon: '🔄' },
  { key: 'strategy', name: 'Стратегия', icon: '🎯' },
]

export default function ProductTerms() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null)

  const filtered = terms.filter(t => {
    const matchCat = activeCategory === 'all' || t.category === activeCategory
    const matchSearch = !search || t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📖 Словарь продакта</h1>
        <p>{terms.length} ключевых терминов с примерами. Кликни, чтобы развернуть.</p>
      </div>

      {/* Search + Filter */}
      <div className="card">
        <input
          className="input"
          placeholder="🔍 Поиск по терминам..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 12 }}
        />

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button
              key={c.key}
              className={`btn btn-sm ${activeCategory === c.key ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveCategory(c.key)}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Найдено: {filtered.length} из {terms.length}
        </div>
      </div>

      {/* Terms List */}
      {filtered.map(t => (
        <div
          key={t.term}
          className="scenario-card"
          onClick={() => setExpandedTerm(expandedTerm === t.term ? null : t.term)}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {t.term}
                {t.abbr && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>({t.abbr})</span>}
              </h4>
            </div>
            <span className={`tag ${t.category === 'product' ? 'emerald' : t.category === 'metrics' ? 'blue' : t.category === 'processes' ? 'purple' : 'orange'}`}>
              {categories.find(c => c.key === t.category)?.name}
            </span>
          </div>

          <p style={{ marginTop: 8, marginBottom: expandedTerm === t.term ? 12 : 0 }}>{t.definition}</p>

          {expandedTerm === t.term && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-color)' }}>
              <div style={{ marginBottom: 8 }}>
                <strong>💡 Пример:</strong>
                <p>{t.example}</p>
              </div>
              {t.related && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Связано:</span>
                  {t.related.map(r => (
                    <span
                      key={r}
                      className="tag blue"
                      style={{ cursor: 'pointer' }}
                      onClick={e => {
                        e.stopPropagation()
                        setExpandedTerm(r)
                        setSearch(r)
                      }}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
