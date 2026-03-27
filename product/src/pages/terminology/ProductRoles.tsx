import { useState } from 'react'

interface Role {
  title: string
  icon: string
  focus: string
  responsibilities: string[]
  skills: string[]
  reports: string
  salary: string
  confused: string
}

const roles: Role[] = [
  {
    title: 'Product Manager',
    icon: '📦',
    focus: 'Что строим и зачем',
    responsibilities: [
      'Определяет видение и стратегию продукта',
      'Приоритизирует бэклог (backlog)',
      'Проводит исследования пользователей',
      'Определяет метрики успеха',
      'Работает со стейкхолдерами (заинтересованными сторонами)',
    ],
    skills: ['Аналитика', 'Коммуникация', 'Стратегия', 'UX', 'Data'],
    reports: 'CPO / VP Product / CEO',
    salary: '$80K-180K',
    confused: 'Не путать с Product Owner — PM шире, PO фокусируется на бэклоге',
  },
  {
    title: 'Product Owner',
    icon: '📋',
    focus: 'Бэклог и приоритеты спринта',
    responsibilities: [
      'Управляет Product Backlog',
      'Пишет User Stories (или принимает)',
      'Принимает решения по объёму (scope) спринта',
      'Является голосом клиента (voice of customer) для команды',
      'Участвует в уточнении бэклога (grooming) и планировании (planning)',
    ],
    skills: ['Agile', 'Коммуникация', 'Приоритизация', 'Экспертиза в предметной области'],
    reports: 'Product Manager / Stakeholders',
    salary: '$60K-130K',
    confused: 'Роль из Scrum. В некоторых компаниях PM и PO — один человек.',
  },
  {
    title: 'UX Researcher',
    icon: '🔬',
    focus: 'Понять пользователя',
    responsibilities: [
      'Проводит usability-тесты',
      'Организует CustDev-интервью',
      'Анализирует поведенческие данные',
      'Создаёт персоны и JTBD',
      'Презентует инсайты команде',
    ],
    skills: ['Интервью', 'Анализ', 'Эмпатия', 'Статистика', 'Презентации'],
    reports: 'Head of UX / PM',
    salary: '$60K-140K',
    confused: 'Не UX Designer — researcher изучает, designer проектирует',
  },
  {
    title: 'UX/UI Designer',
    icon: '🎨',
    focus: 'Как выглядит и работает',
    responsibilities: [
      'Проектирует интерфейсы и flow',
      'Создаёт прототипы и дизайн-макеты',
      'Разрабатывает дизайн-систему',
      'Проводит юзабилити-ревью',
      'Работает в связке с разработкой',
    ],
    skills: ['Figma', 'Прототипирование', 'Типографика', 'Design Systems'],
    reports: 'Head of Design / PM',
    salary: '$50K-140K',
    confused: 'UX = опыт (flow, логика), UI = визуал (цвета, кнопки)',
  },
  {
    title: 'Product Analyst',
    icon: '📊',
    focus: 'Данные и инсайты',
    responsibilities: [
      'Настраивает аналитику и трекинг',
      'Строит дашборды и отчёты',
      'Анализирует A/B тесты',
      'Ищет инсайты в данных',
      'Помогает PM принимать data-driven решения',
    ],
    skills: ['SQL', 'Python', 'Amplitude/Mixpanel', 'Статистика', 'Визуализация'],
    reports: 'PM / Head of Analytics',
    salary: '$50K-130K',
    confused: 'Не Data Scientist — аналитик фокусируется на продуктовом контексте',
  },
  {
    title: 'CPO',
    icon: '👑',
    focus: 'Продуктовая стратегия компании',
    responsibilities: [
      'Определяет продуктовую стратегию компании',
      'Руководит всей продуктовой командой',
      'Взаимодействует с CEO и Board',
      'Управляет портфелем продуктов',
      'Устанавливает продуктовую культуру',
    ],
    skills: ['Лидерство', 'Стратегия', 'Бизнес-чутьё (business acumen)', 'Наём'],
    reports: 'CEO / Board',
    salary: '$150K-350K+',
    confused: 'VP Product — промежуточная роль между PM и CPO',
  },
]

export default function ProductRoles() {
  const [activeRole, setActiveRole] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [showQuizResult, setShowQuizResult] = useState(false)

  const quiz = [
    { q: 'Кто решает, что попадёт в следующий спринт?', correct: 1, options: ['Product Manager', 'Product Owner', 'Tech Lead', 'Scrum Master'] },
    { q: 'Кто анализирует результаты A/B теста?', correct: 3, options: ['UX Designer', 'CPO', 'Product Owner', 'Product Analyst'] },
    { q: 'Кто определяет стратегию продукта на год?', correct: 0, options: ['Product Manager', 'Product Owner', 'UX Researcher', 'Scrum Master'] },
    { q: 'Кто проводит CustDev-интервью?', correct: 2, options: ['Product Analyst', 'UI Designer', 'UX Researcher', 'CPO'] },
  ]

  const role = roles[activeRole]

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>👥 Роли в продуктовой команде</h1>
        <p>Кто что делает, чем отличаются и как взаимодействуют.</p>
      </div>

      {/* Role Selector */}
      <div className="card">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {roles.map((r, i) => (
            <button
              key={r.title}
              className={`btn btn-sm ${activeRole === i ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveRole(i)}
            >
              {r.icon} {r.title}
            </button>
          ))}
        </div>
      </div>

      {/* Role Details */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: '2.5rem' }}>{role.icon}</span>
          <div>
            <h3 style={{ marginBottom: 0 }}>{role.title}</h3>
            <span className="tag emerald">{role.focus}</span>
          </div>
        </div>

        <div className="grid-2">
          <div>
            <h4 style={{ marginBottom: 8 }}>📋 Ответственности</h4>
            <ul>
              {role.responsibilities.map(r => <li key={r}>{r}</li>)}
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: 8 }}>🛠 Ключевые навыки</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {role.skills.map(s => <span key={s} className="tag blue">{s}</span>)}
            </div>

            <h4 style={{ marginBottom: 4 }}>📈 Кому отчитывается</h4>
            <p>{role.reports}</p>

            <h4 style={{ marginBottom: 4, marginTop: 12 }}>💵 Зарплатная вилка (US)</h4>
            <p>{role.salary}</p>
          </div>
        </div>

        <div className="info-box warning" style={{ marginTop: 16 }}>
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <div className="info-box-title">Частая путаница</div>
            {role.confused}
          </div>
        </div>
      </div>

      {/* Interaction Map */}
      <div className="card">
        <h3>🔗 Карта взаимодействий</h3>
        <div style={{ background: 'var(--bg-code)', borderRadius: 12, padding: 20, textAlign: 'center', marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>👑</div>
              <div style={{ fontSize: '0.75rem' }}>CPO</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>Стратегия</div>
            </div>
            <div style={{ fontSize: '1.5rem', alignSelf: 'center' }}>→</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>📦</div>
              <div style={{ fontSize: '0.75rem' }}>PM</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>Видение</div>
            </div>
            <div style={{ fontSize: '1.5rem', alignSelf: 'center' }}>→</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>📋</div>
              <div style={{ fontSize: '0.75rem' }}>PO</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>Бэклог</div>
            </div>
            <div style={{ fontSize: '1.5rem', alignSelf: 'center' }}>→</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>👨‍💻</div>
              <div style={{ fontSize: '0.75rem' }}>Dev Team</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>Реализация</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>🔬</div>
              <div style={{ fontSize: '0.75rem' }}>Researcher</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>🎨</div>
              <div style={{ fontSize: '0.75rem' }}>Designer</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>📊</div>
              <div style={{ fontSize: '0.75rem' }}>Analyst</div>
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 12 }}>
            ↕ Все связаны с PM: Researcher даёт инсайты, Designer проектирует, Analyst измеряет
          </div>
        </div>
      </div>

      {/* Quiz */}
      <div className="card">
        <h3>🧪 Квиз: угадай роль</h3>
        {quiz.map((q, qi) => (
          <div key={qi} className="scenario-card">
            <h4>{q.q}</h4>
            <div className="scenario-options">
              {q.options.map((opt, oi) => {
                const isSelected = quizAnswers[qi] === oi
                const isCorrect = oi === q.correct
                const revealed = showQuizResult
                return (
                  <button
                    key={oi}
                    className={`scenario-option ${isSelected ? 'selected' : ''} ${revealed && isCorrect ? 'correct' : ''} ${revealed && isSelected && !isCorrect ? 'wrong' : ''}`}
                    onClick={() => !showQuizResult && setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {Object.keys(quizAnswers).length === quiz.length && !showQuizResult && (
          <button className="btn btn-primary" onClick={() => setShowQuizResult(true)}>
            Показать результат
          </button>
        )}

        {showQuizResult && (
          <div className="score-display">
            <div className="score-number">
              {quiz.filter((q, i) => quizAnswers[i] === q.correct).length}/{quiz.length}
            </div>
            <div className="score-label">правильных ответов</div>
          </div>
        )}
      </div>
    </div>
  )
}
