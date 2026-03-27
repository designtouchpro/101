import { Link } from 'react-router-dom'

const features = [
  { icon: '🎯', title: 'Marketing Mix (4P/7P)', desc: 'Продукт, Цена, Место, Продвижение и расширенные 7P', to: '/fundamentals/marketing-mix' },
  { icon: '🔍', title: 'STP-анализ', desc: 'Сегментация, таргетирование, позиционирование', to: '/fundamentals/stp' },
  { icon: '📱', title: 'Каналы продвижения', desc: 'SEO, SMM, Email, контент-маркетинг, PPC', to: '/digital/channels' },
  { icon: '🔻', title: 'Маркетинговая воронка', desc: 'AIDA, AARRR, карта пути клиента (CJM)', to: '/digital/funnel' },
  { icon: '📊', title: 'Метрики маркетинга', desc: 'CAC, LTV, ROI, ROAS, CR, CTR', to: '/analytics/metrics' },
  { icon: '🧪', title: 'A/B тесты и UTM', desc: 'Настройка экспериментов, UTM-разметка', to: '/analytics/ab-testing' },
  { icon: '💎', title: 'Бренд-платформа', desc: 'Миссия, ценности, тон коммуникации, айдентика', to: '/brand/platform' },
  { icon: '✍️', title: 'Контент-стратегия', desc: 'Типы контента, контент-план, воронка контента', to: '/brand/content' },
  { icon: '🎯', title: 'Таргетинг и аудитории', desc: 'Похожие аудитории, ретаргетинг, сегменты', to: '/performance/targeting' },
  { icon: '💰', title: 'Unit-экономика маркетинга', desc: 'CAC/LTV, срок окупаемости, когорты', to: '/performance/unit-economics' },
]

export default function Home() {
  return (
    <div className="demo-container">
      <div className="home-hero">
        <h1>📢 Marketing 101</h1>
        <p>Интерактивный курс по маркетингу в IT. От базовых концепций до performance-аналитики.</p>
      </div>

      <div className="feature-grid">
        {features.map(f => (
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
