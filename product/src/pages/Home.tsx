import { Link } from 'react-router-dom'

const features = [
  { icon: '🏴‍☠️', title: 'AARRR-воронка', desc: 'Пиратские метрики: Acquisition → Activation → Retention → Revenue → Referral', to: '/metrics/aarrr' },
  { icon: '💰', title: 'Unit-экономика', desc: 'LTV, CAC, ARPU, Payback Period (срок окупаемости) — считаем, сходится ли бизнес', to: '/metrics/unit-economics' },
  { icon: '⭐', title: 'North Star Metric (метрика Полярной звезды)', desc: 'Одна главная метрика, которая отражает ценность продукта', to: '/metrics/north-star' },
  { icon: '📖', title: 'Словарь продакта', desc: 'MVP, PMF, Churn, DAU/MAU, MRR и другие термины', to: '/terminology/terms' },
  { icon: '👥', title: 'Роли в продукте', desc: 'Product Owner, Product Manager, CPO — кто что делает', to: '/terminology/roles' },
  { icon: '🔍', title: 'Product Discovery (исследование продукта)', desc: 'CustDev, Jobs-to-be-Done, Lean Canvas, Opportunity Tree', to: '/processes/discovery' },
  { icon: '🗺️', title: 'Roadmapping (дорожная карта)', desc: 'Now-Next-Later, OKR-based, Theme-based roadmaps', to: '/processes/roadmap' },
  { icon: '🗂️', title: 'User Story Mapping', desc: 'Построение карты пользовательских историй по Jeff Patton', to: '/processes/story-mapping' },
  { icon: '🧪', title: 'A/B тестирование', desc: 'Гипотезы, статистическая значимость, подводные камни', to: '/analytics/ab-testing' },
  { icon: '📊', title: 'Когортный анализ', desc: 'Retention-таблицы, кривые удержания, сравнение когорт', to: '/analytics/cohorts' },
  { icon: '⚖️', title: 'Приоритизация', desc: 'RICE, ICE, MoSCoW, Kano, Value/Effort — сравнение фреймворков', to: '/strategy/prioritization' },
  { icon: '🚀', title: 'Go-to-Market (выход на рынок)', desc: 'Стратегии запуска, каналы, позиционирование', to: '/strategy/go-to-market' },
]

export default function Home() {
  return (
    <div className="demo-container">
      <div className="home-hero">
        <h1>📦 Product 101</h1>
        <p>Интерактивный курс по продакт-менеджменту для IT-специалистов. Метрики, процессы, фреймворки — с примерами и калькуляторами.</p>
      </div>

      <div className="feature-grid">
        {features.map((f) => (
          <Link key={f.to} to={f.to} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
