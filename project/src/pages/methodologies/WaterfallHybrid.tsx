import { useState } from 'react'

type Methodology = 'waterfall' | 'vmodel' | 'hybrid' | 'spiral'

const methodologies: Record<Methodology, {
  name: string; emoji: string; desc: string
  phases: { name: string; desc: string }[]
  pros: string[]; cons: string[]; when: string[]
}> = {
  waterfall: {
    name: 'Waterfall', emoji: '🌊', desc: 'Линейная последовательная модель. Каждая фаза завершается перед началом следующей.',
    phases: [
      { name: 'Requirements', desc: 'Сбор и фиксация всех требований' },
      { name: 'Design', desc: 'Архитектура и детальный дизайн системы' },
      { name: 'Implementation', desc: 'Разработка кода' },
      { name: 'Testing', desc: 'Тестирование всей системы' },
      { name: 'Deployment', desc: 'Развёртывание в продакшн' },
      { name: 'Maintenance', desc: 'Поддержка и исправление багов' },
    ],
    pros: ['Простая и понятная структура', 'Чёткая документация', 'Легко оценить стоимость и сроки заранее', 'Подходит для фиксированных контрактов'],
    cons: ['Нет гибкости — изменения дороги', 'Поздний фидбек (тестирование в конце)', 'Высокий риск провала', 'Не подходит для неопределённых требований'],
    when: ['Чёткие, неизменные требования', 'Критичные системы (медицина, авиация)', 'Фиксированный контракт с госзаказчиком', 'Короткие проекты с понятным скоупом'],
  },
  vmodel: {
    name: 'V-Model', emoji: '✅', desc: 'Расширение Waterfall: каждому этапу разработки соответствует этап тестирования.',
    phases: [
      { name: 'Requirements ↔ Acceptance Testing', desc: 'Требования валидируются приёмочными тестами' },
      { name: 'System Design ↔ System Testing', desc: 'Архитектура проверяется системными тестами' },
      { name: 'Detailed Design ↔ Integration Testing', desc: 'Детальный дизайн — интеграционные тесты' },
      { name: 'Coding ↔ Unit Testing', desc: 'Код покрывается юнит-тестами' },
    ],
    pros: ['Тестирование планируется с самого начала', 'Раннее обнаружение дефектов', 'Хорошо для regulated industries'],
    cons: ['Такая же негибкость как у Waterfall', 'Дорогие изменения', 'Много документации'],
    when: ['Embedded-системы', 'Медицинское ПО', 'Когда качество — критический приоритет'],
  },
  hybrid: {
    name: 'Hybrid (Water-Scrum-Fall)', emoji: '🔀', desc: 'Комбинация: планирование и приёмка по Waterfall, разработка по Scrum.',
    phases: [
      { name: 'Planning (Waterfall)', desc: 'Общее планирование, бюджет, скоуп' },
      { name: 'Development (Scrum)', desc: 'Итеративная разработка в спринтах' },
      { name: 'Release (Waterfall)', desc: 'Стабилизация, приёмка, деплой' },
    ],
    pros: ['Гибкость в разработке', 'Предсказуемость для менеджмента', 'Годится для энтерпрайза', 'Плавный переход от Waterfall'],
    cons: ['Сложнее управлять', '"Худшее из двух миров" при плохой реализации', 'Нужен опытный PM'],
    when: ['Крупные компании, переходящие на Agile', 'Проекты с фиксированным бюджетом', 'Когда менеджмент хочет план, а команда — гибкость'],
  },
  spiral: {
    name: 'Spiral Model', emoji: '🌀', desc: 'Итеративная модель с фокусом на анализ рисков. Каждый виток спирали — цикл: планирование → риски → разработка → оценка.',
    phases: [
      { name: 'Planning', desc: 'Определение целей, ограничений, альтернатив' },
      { name: 'Risk Analysis', desc: 'Анализ рисков и создание прототипов' },
      { name: 'Engineering', desc: 'Разработка и тестирование' },
      { name: 'Evaluation', desc: 'Оценка результата, планирование следующего витка' },
    ],
    pros: ['Фокус на рисках', 'Ранние прототипы', 'Подходит для больших проектов'],
    cons: ['Дорого и сложно', 'Нужны эксперты по рискам', 'Не для маленьких проектов'],
    when: ['Большие R&D проекты', 'Высокорисковые системы', 'Когда требования неясны и бюджет большой'],
  },
}

export default function WaterfallHybrid() {
  const [selected, setSelected] = useState<Methodology>('waterfall')
  const [quizDone, setQuizDone] = useState<Record<number, string>>({})

  const m = methodologies[selected]

  const scenarios = [
    { id: 1, text: 'Стартап разрабатывает MVP мобильного приложения. Требования меняются каждую неделю.', answer: 'hybrid', explain: 'Hybrid или чистый Agile. Waterfall убьёт стартап — слишком медленно реагировать на изменения.' },
    { id: 2, text: 'Госзаказ на систему документооборота. ТЗ утверждено на 200 страницах, изменения невозможны.', answer: 'waterfall', explain: 'Waterfall: фиксированные требования, фиксированный бюджет, формальная приёмка — это его сценарий.' },
    { id: 3, text: 'Разработка ПО для медицинского оборудования. Каждый модуль должен быть протестирован.', answer: 'vmodel', explain: 'V-Model: раннее планирование тестов, требования к качеству, traceability — критично для медицины.' },
  ]

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🏗️ Waterfall & Hybrid</h1>
        <p>Классические и гибридные методологии управления проектами.</p>
      </div>

      <div className="card">
        <div className="tabs">
          {(Object.keys(methodologies) as Methodology[]).map(key => (
            <button key={key} className={`tab ${selected === key ? 'active' : ''}`} onClick={() => setSelected(key)}>
              {methodologies[key].emoji} {methodologies[key].name}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>{m.emoji} {m.name}</h3>
        <p>{m.desc}</p>

        <h4 style={{ marginTop: 20, marginBottom: 12 }}>Фазы:</h4>
        <div className="timeline">
          {m.phases.map((phase, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-content">
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{phase.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{phase.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2">
        <div className="card" style={{ borderTop: '3px solid #22c55e' }}>
          <h3>✅ Плюсы</h3>
          <ul>{m.pros.map(p => <li key={p}>{p}</li>)}</ul>
        </div>
        <div className="card" style={{ borderTop: '3px solid #ef4444' }}>
          <h3>❌ Минусы</h3>
          <ul>{m.cons.map(c => <li key={c}>{c}</li>)}</ul>
        </div>
      </div>

      <div className="card">
        <h3>📌 Когда использовать {m.name}</h3>
        <ul>{m.when.map(w => <li key={w}>{w}</li>)}</ul>
      </div>

      {/* Quiz */}
      <div className="card">
        <h3>🧠 Какую методологию выбрать?</h3>
        {scenarios.map(s => {
          const answered = quizDone[s.id]
          const isCorrect = answered === s.answer
          return (
            <div key={s.id} style={{
              padding: 14, borderRadius: 8, marginBottom: 12,
              border: '1px solid var(--border-color)',
              background: answered ? (isCorrect ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)') : 'var(--bg-code)',
            }}>
              <p style={{ fontWeight: 500, marginBottom: 10 }}>{s.text}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {(Object.keys(methodologies) as Methodology[]).map(key => (
                  <button key={key} onClick={() => !answered && setQuizDone(a => ({ ...a, [s.id]: key }))}
                    disabled={!!answered}
                    style={{
                      padding: '6px 14px', borderRadius: 6, fontSize: '0.85rem', cursor: answered ? 'default' : 'pointer',
                      border: `1px solid ${answered && key === s.answer ? '#22c55e' : answered && key === answered ? '#ef4444' : 'var(--border-color)'}`,
                      background: answered && key === s.answer ? 'rgba(34,197,94,0.1)' : 'var(--bg-secondary)',
                      color: 'var(--text-primary)', fontWeight: 500,
                    }}>
                    {methodologies[key].emoji} {methodologies[key].name}
                  </button>
                ))}
              </div>
              {answered && (
                <p style={{ marginTop: 8, fontSize: '0.85rem', color: isCorrect ? '#22c55e' : '#ef4444' }}>
                  {isCorrect ? '✅' : '❌'} {s.explain}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
