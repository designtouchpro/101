import { useState } from 'react'

const steps = [
  {
    title: 'Признать конфликт',
    icon: '👁️',
    desc: 'Не игнорировать. Конфликт не рассосётся сам — он загниёт.',
    tips: ['Уловите ранние сигналы: молчание, пассивная агрессия, жалобы третьим лицам', 'Не путайте отсутствие скандала с отсутствием конфликта'],
  },
  {
    title: 'Поговорить 1-on-1 с каждой стороной',
    icon: '👤',
    desc: 'Выслушайте каждого по отдельности. Без свидетелей люди честнее.',
    tips: ['Задавайте открытые вопросы: «Расскажи своё видение»', 'Не принимайте чью-то сторону', 'Записывайте ключевые моменты'],
  },
  {
    title: 'Найти корневую причину',
    icon: '🔍',
    desc: 'Конфликт из-за code style может быть на самом деле про уважение или контроль.',
    tips: ['Спрашивайте «Почему это для тебя важно?» несколько раз', 'Общие причины: нечёткие роли, разные ценности, нехватка ресурсов, личная антипатия'],
  },
  {
    title: 'Организовать встречу',
    icon: '🤝',
    desc: 'Сведите стороны вместе. Ваша роль — фасилитатор.',
    tips: ['Установите правила: не перебивать, говорить от «я», не обвинять', 'Каждый описывает факты и свои чувства', 'Вы модерируете, а не судите'],
  },
  {
    title: 'Найти решение вместе',
    icon: '💡',
    desc: 'Спросите: «Что мы можем сделать, чтобы решить это?»',
    tips: ['Ищите win-win (обоюдную победу), а не компромисс', 'Фиксируйте договорённости письменно', 'Назначьте конкретные action items (следующие шаги)'],
  },
  {
    title: 'Следить за исполнением',
    icon: '📋',
    desc: 'Через неделю-две проверьте: ситуация улучшилась?',
    tips: ['Спросите обе стороны на 1:1', 'Если не помогло — эскалируйте или меняйте условия', 'Похвалите прогресс'],
  },
]

const cases = [
  {
    title: 'Конфликт на код-ревью',
    icon: '💻',
    situation: 'Сеньор Алексей оставляет жёсткие комментарии к PR мидла Марины. Марина говорит, что он «токсичный» и не хочет отправлять PR на его ревью.',
    rootCause: 'Алексей считает, что высокие стандарты = хороший код. Марина воспринимает критику кода как критику себя. Нет общих гайдлайнов по тону код-ревью.',
    solution: [
      'Поговорить 1:1 с Алексеем: «Как ты думаешь, помогают ли твои комментарии?»',
      'Поговорить 1:1 с Мариной: разделить код и личность',
      'Вместе написать code review guidelines с примерами хороших и плохих комментариев',
      'Попросить Алексея начинать ревью с чего-то хорошего',
    ],
  },
  {
    title: 'Конфликт из-за нагрузки',
    icon: '😤',
    situation: 'Разработчик Дима жалуется, что делает больше всех, а другие «отсиживаются». Остальные говорят, что Дима сам берёт чужие задачи.',
    rootCause: 'Дима — перфекционист. Не доверяет другим. Другие чувствуют, что их не ценят. Нет прозрачного распределения задач.',
    solution: [
      'Ввести прозрачную доску (Jira/Linear) — видно, кто чем занят',
      'На планировании равномерно распределять задачи',
      'Поговорить с Димой: почему он берёт чужое? Что за этим стоит?',
      'Установить правило: не берёшь чужие задачи без просьбы',
    ],
  },
  {
    title: 'Конфликт тимлид vs продакт',
    icon: '⚡',
    situation: 'Продакт-менеджер постоянно добавляет задачи в спринт после планирования. Команда не успевает, тимлид злится.',
    rootCause: 'У PM давление от бизнеса. У тимлида — забота о команде. Нет чёткого процесса управления скоупом.',
    solution: [
      'Встреча тимлид + PM: не искать виноватого, а процесс',
      'Договориться: изменения после планирования = что-то убираем',
      'Ввести change request (запрос на изменение) процесс',
      'Показать PM метрики: как незапланированная работа влияет на velocity (скорость команды)',
    ],
  },
]

export default function ConflictResolution() {
  const [activeStep, setActiveStep] = useState(0)
  const [activeCase, setActiveCase] = useState(0)
  const [showSolution, setShowSolution] = useState<Record<number, boolean>>({})
  const [userSolutions, setUserSolutions] = useState<Record<number, string>>({})

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🕊️ Разрешение конфликтов</h1>
        <p>Пошаговый алгоритм + разбор реальных IT-кейсов.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Конфликт — это не сбой, а <strong>сигнал</strong>. Он говорит о несовпадении ожиданий, нечётких процессах
          или проблемах коммуникации. Исследования CPP Inc. показывают, что сотрудники тратят в среднем
          <strong>2.8 часа в неделю</strong> на конфликты, а 85% сталкиваются с ними регулярно.
          Игнорировать конфликт — самая дорогостоящая ошибка тимлида.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Эффективное разрешение конфликтов требует <strong>системного подхода</strong>: сначала понять
          корневую причину (часто она глубже, чем кажется), потом выслушать обе стороны,
          и только потом искать решение. Роль тимлида — <strong>фасилитатор</strong>, а не судья.
        </p>
        <div className="info-box">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <div className="info-box-title">Раннее вмешательство — ключ</div>
            Конфликт на стадии «недовольное молчание» решается за 1 разговор. Конфликт на стадии
            «открытое противостояние» может потребовать недели и даже увольнений.
          </div>
        </div>
      </div>

      {/* Algorithm */}
      <div className="card">
        <h3>📋 Алгоритм разрешения конфликта</h3>
        <p style={{ marginBottom: 16 }}>Кликните на шаг, чтобы увидеть подробности.</p>

        <div className="timeline">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`timeline-item ${activeStep === i ? 'active' : ''}`}
              onClick={() => setActiveStep(i)}
            >
              <div className="timeline-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: activeStep === i ? 12 : 0 }}>
                  <span style={{ fontSize: '1.3rem' }}>{step.icon}</span>
                  <div>
                    <span className="tag blue" style={{ marginRight: 6 }}>Шаг {i + 1}</span>
                    <strong>{step.title}</strong>
                  </div>
                </div>

                {activeStep === i && (
                  <>
                    <p style={{ marginBottom: 12 }}>{step.desc}</p>
                    <ul>
                      {step.tips.map((tip, j) => (
                        <li key={j} style={{ marginBottom: 4 }}>{tip}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Anti-patterns */}
      <div className="card">
        <h3>🚫 Анти-паттерны (как делать НЕ надо)</h3>
        <div className="grid-2">
          <div className="scenario-card">
            <h4>😶 Игнорирование</h4>
            <p>«Разберутся сами» — нет, не разберутся. Конфликт загнивает и отравляет всю команду.</p>
          </div>
          <div className="scenario-card">
            <h4>👑 Авторитарное решение</h4>
            <p>«Я сказал — делайте так» — проблема не решена, а подавлена. Вернётся в 3x размере.</p>
          </div>
          <div className="scenario-card">
            <h4>🤝 Принуждение к миру</h4>
            <p>«Пожмите руки и забудьте» — без проработки причин мир не наступит.</p>
          </div>
          <div className="scenario-card">
            <h4>📣 Публичный разбор</h4>
            <p>Обсуждать конфликт при всей команде — унижает участников и обостряет ситуацию.</p>
          </div>
        </div>
      </div>

      {/* Cases */}
      <div className="card">
        <h3>🎮 Разбор кейсов</h3>
        <p style={{ marginBottom: 16 }}>Прочитайте ситуацию. Попробуйте написать своё решение, потом посмотрите рекомендацию.</p>

        <div className="tabs">
          {cases.map((c, i) => (
            <button key={i} className={`tab ${activeCase === i ? 'active' : ''}`} onClick={() => setActiveCase(i)}>
              {c.icon} {c.title}
            </button>
          ))}
        </div>

        {(() => {
          const c = cases[activeCase]
          return (
            <>
              <div className="info-box" style={{ marginBottom: 16 }}>
                <div className="info-box-icon">{c.icon}</div>
                <div className="info-box-content">
                  <div className="info-box-title">Ситуация</div>
                  {c.situation}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: '0.9rem' }}>
                  ✏️ Ваше решение:
                </label>
                <textarea
                  className="input"
                  placeholder="Опишите, как бы вы действовали..."
                  value={userSolutions[activeCase] || ''}
                  onChange={e => setUserSolutions(prev => ({ ...prev, [activeCase]: e.target.value }))}
                  style={{ minHeight: 100 }}
                />
              </div>

              <button
                className="btn btn-primary"
                onClick={() => setShowSolution(prev => ({ ...prev, [activeCase]: !prev[activeCase] }))}
              >
                {showSolution[activeCase] ? 'Скрыть' : '💡 Показать рекомендацию'}
              </button>

              {showSolution[activeCase] && (
                <>
                  <div className="info-box warning" style={{ marginTop: 16 }}>
                    <div className="info-box-icon">🔍</div>
                    <div className="info-box-content">
                      <div className="info-box-title">Корневая причина</div>
                      {c.rootCause}
                    </div>
                  </div>

                  <div className="info-box success" style={{ marginTop: 8 }}>
                    <div className="info-box-icon">✅</div>
                    <div className="info-box-content">
                      <div className="info-box-title">Рекомендуемые действия</div>
                      <ol className="info-list">
                        {c.solution.map((s, i) => <li key={i} style={{ marginBottom: 4 }}>{s}</li>)}
                      </ol>
                    </div>
                  </div>
                </>
              )}
            </>
          )
        })()}
      </div>
    </div>
  )
}
