import { Link } from 'react-router-dom'

const features = [
  { icon: '🔄', title: 'Scrum vs Kanban', desc: 'Сравнение двух популярных Agile-фреймворков с интерактивной доской', to: '/methodologies/scrum-kanban' },
  { icon: '🏗️', title: 'Waterfall & Hybrid', desc: 'Классический подход и когда его использовать. Гибридные модели', to: '/methodologies/waterfall' },
  { icon: '🃏', title: 'Техники оценки', desc: 'Story Points, T-Shirt, Planning Poker, трёхточечная оценка', to: '/estimation/techniques' },
  { icon: '📈', title: 'Velocity & Capacity', desc: 'Как считать скорость команды и планировать спринты', to: '/estimation/velocity' },
  { icon: '📉', title: 'Burndown & Burnup', desc: 'Графики прогресса: как читать и что показывают', to: '/metrics/burndown' },
  { icon: '⏱️', title: 'Lead & Cycle Time', desc: 'Как измерять скорость доставки и находить узкие места', to: '/metrics/lead-cycle' },
  { icon: '⚠️', title: 'Матрица рисков', desc: 'Оценка и визуализация рисков проекта (вероятность × влияние)', to: '/risks/matrix' },
  { icon: '👥', title: 'Stakeholder Map', desc: 'Карта заинтересованных сторон: power/interest матрица', to: '/communication/stakeholders' },
  { icon: '🗓️', title: 'Типы встреч', desc: 'Стендап, ретро, планирование, демо — зачем и как проводить', to: '/communication/meetings' },
  { icon: '🌳', title: 'WBS-декомпозиция', desc: 'Разбиение проекта на управляемые части', to: '/artifacts/wbs' },
  { icon: '✅', title: 'DoR & DoD', desc: 'Definition of Ready и Done — чеклисты качества', to: '/artifacts/dor-dod' },
]

export default function Home() {
  return (
    <div className="demo-container">
      <div className="home-hero">
        <h1>📋 Project Management 101</h1>
        <p>Интерактивный курс по проджект-менеджменту для IT. Методологии, метрики, инструменты и практики.</p>
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
