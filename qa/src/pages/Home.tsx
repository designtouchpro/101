import { Link } from 'react-router-dom'

const features = [
  { icon: '📖', title: 'Теория тестирования', desc: 'Виды, уровни, принципы', to: '/fundamentals/basics' },
  { icon: '🎨', title: 'Тест-дизайн', desc: 'Классы эквивалентности, граничные значения, pairwise', to: '/fundamentals/test-design' },
  { icon: '🐛', title: 'Баг-репорты', desc: 'Severity, Priority, шаблоны, жизненный цикл', to: '/process/bug-reporting' },
  { icon: '📋', title: 'Тест-план', desc: 'Чек-листы, тест-кейсы, стратегия', to: '/process/test-plan' },
  { icon: '🌐', title: 'Web-тестирование', desc: 'Кросс-браузер, респонсив, формы', to: '/practice/web-testing' },
  { icon: '🔌', title: 'API-тестирование', desc: 'REST, статус-коды, валидация', to: '/practice/api-testing' },
  { icon: '🤖', title: 'Основы автоматизации', desc: 'Когда автоматизировать, инструменты', to: '/automation/basics' },
  { icon: '🔺', title: 'Пирамида тестирования', desc: 'Unit, Integration, E2E', to: '/automation/pyramid' },
  { icon: '📊', title: 'QA-метрики', desc: 'DRR, test coverage, bug leakage', to: '/advanced/metrics' },
  { icon: '🔄', title: 'CI/CD и тесты', desc: 'Пайплайны, smoke tests, gates', to: '/advanced/cicd' },
]

export default function Home() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🧪 QA 101</h1>
        <p>Интерактивный курс по тестированию и обеспечению качества.</p>
      </div>
      <div className="home-grid">
        {features.map(f => (
          <Link key={f.to} to={f.to} className="feature-card">
            <div className="feature-card-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
