import { useState } from 'react'

const stages = [
  {
    id: 'forming',
    name: 'Forming',
    title: 'Формирование',
    icon: '🌱',
    color: '#22c55e',
    description: 'Команда только собралась. Все вежливые, осторожные, не знают друг друга.',
    signs: ['Люди молчат на встречах', 'Все соглашаются с лидером', 'Мало инициативы', 'Вопросы типа «а как у вас тут принято?»'],
    leaderActions: ['Чёткие правила и процессы', 'Знакомство и тимбилдинг', 'Прозрачные ожидания', 'Быстрые ранние победы'],
    risks: ['Застрять в вечном «всё ок» без прогресса', 'Люди уйдут, не почувствовав ценности'],
    metrics: { productivity: 20, trust: 15, conflicts: 5, autonomy: 10 },
  },
  {
    id: 'storming',
    name: 'Storming',
    title: 'Штормы',
    icon: '⚡',
    color: '#ef4444',
    description: 'Начались конфликты. Люди отстаивают свои подходы, спорят. Это нормально и необходимо!',
    signs: ['Споры на код-ревью', 'Недовольство процессами', '«У меня на прошлой работе было лучше»', 'Подковёрные альянсы'],
    leaderActions: ['Не бояться конфликтов — модерировать', 'Установить правила дискуссий', 'Адресовать проблемы а не замалчивать', 'Быть готовым к тяжёлым 1-on-1'],
    risks: ['Команда распадётся если лидер не вмешается', 'Токсичность если не установить boundary'],
    metrics: { productivity: 35, trust: 30, conflicts: 90, autonomy: 25 },
  },
  {
    id: 'norming',
    name: 'Norming',
    title: 'Нормализация',
    icon: '🤝',
    color: '#6366f1',
    description: 'Команда выработала общие правила. Люди знают сильные стороны друг друга.',
    signs: ['Конструктивные обсуждения', 'Взаимопомощь', 'Общие шутки и ритуалы', 'Люди берут задачи сами'],
    leaderActions: ['Перейти к servant leadership (лидерству через служение)', 'Закрепить работающие практики', 'Поддерживать ритуалы', 'Начать делегировать больше'],
    risks: ['Самоуспокоение — перестать улучшаться', 'Вернуться в storming при изменениях'],
    metrics: { productivity: 65, trust: 70, conflicts: 30, autonomy: 60 },
  },
  {
    id: 'performing',
    name: 'Performing',
    title: 'Производительность',
    icon: '🚀',
    color: '#f59e0b',
    description: 'Команда работает как часы. Высокая автономность, мало нужен лидер для операционки.',
    signs: ['Самоорганизация', 'Команда решает проблемы без лидера', 'Высокое качество, мало багов', 'Новички онбордятся легко'],
    leaderActions: ['Полноe делегирование', 'Стратегические задачи', 'Защита команды от внешнего шума', 'Развитие людей на выход (в другие команды/роли)'],
    risks: ['Скука и стагнация', 'Потеря ключевых людей'],
    metrics: { productivity: 95, trust: 90, conflicts: 15, autonomy: 90 },
  },
]

const events = [
  { text: 'В команду пришёл новый сильный разработчик', effect: -1, explanation: 'Новый человек меняет динамику. Команда может откатиться на storming.' },
  { text: 'Сменился продакт-менеджер', effect: -1, explanation: 'Новый PM = новые приоритеты и стиль. Период адаптации.' },
  { text: 'Команда успешно запустила крупную фичу', effect: 1, explanation: 'Общая победа укрепляет связи и двигает к performing.' },
  { text: 'Один из ключевых людей уволился', effect: -2, explanation: 'Потеря ключевого человека может откатить до forming — нужно перераспределять роли.' },
  { text: 'Команда провела отличную ретроспективу и внедрила улучшения', effect: 1, explanation: 'Рефлексия и улучшения — признак зрелости.' },
  { text: 'Реорганизация: команду объединили с другой', effect: -3, explanation: 'По сути — создана новая команда. Forming с нуля.' },
]

export default function TeamMaturity() {
  const [activeStage, setActiveStage] = useState(0)
  const [simStage, setSimStage] = useState(0)
  const [simLog, setSimLog] = useState<Array<{ event: string; from: number; to: number }>>([])
  const [currentEvent, setCurrentEvent] = useState<typeof events[0] | null>(null)

  const triggerEvent = () => {
    const event = events[Math.floor(Math.random() * events.length)]
    const newStage = Math.max(0, Math.min(3, simStage + event.effect))
    setSimLog(prev => [...prev, { event: event.text, from: simStage, to: newStage }])
    setCurrentEvent(event)
    setSimStage(newStage)
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📈 Зрелость команды — модель Такмана</h1>
        <p>Каждая новая команда проходит 4 стадии. Задача лидера — помочь пройти их быстрее.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Брюс Такман в 1965 году описал модель групповой динамики: <strong>Forming → Storming → Norming → Performing</strong>.
          Каждая команда проходит эти стадии при формировании, изменении состава или смене проекта.
          Невозможно перепрыгнуть стадию Storming — конфликты и притирка неизбежны. Но задача тимлида —
          сократить этот период и помочь команде быстрее выйти на продуктивность.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Понимание текущей стадии помогает выбрать <strong>правильный стиль лидерства</strong>:
          на Forming нужен автократ с чётким планом, на Storming — фасилитатор конфликтов,
          на Norming — коуч, на Performing — servant leader (лидер-слуга). Если вести себя одинаково на всех стадиях,
          команда либо застрянет, либо регрессирует.
        </p>
        <div className="info-box">
          <div className="info-box-icon">📍</div>
          <div className="info-box-content">
            <div className="info-box-title">Как определить стадию?</div>
            Наблюдайте за тем, как команда принимает решения. Если требуется ваше одобрение на каждый шаг — Forming.
            Если много споров — Storming. Если команда сама договаривается — Norming. Если выдаёт результат автономно — Performing.
          </div>
        </div>
      </div>

      {/* Stage selector */}
      <div className="tabs">
        {stages.map((s, i) => (
          <button
            key={s.id}
            className={`tab ${activeStage === i ? 'active' : ''}`}
            onClick={() => setActiveStage(i)}
          >
            {s.icon} {s.title}
          </button>
        ))}
      </div>

      {/* Active stage details */}
      {(() => {
        const s = stages[activeStage]
        return (
          <div className="card" style={{ borderColor: s.color, borderWidth: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: '2.5rem' }}>{s.icon}</span>
              <div>
                <h3 style={{ margin: 0, color: s.color }}>{s.name} — {s.title}</h3>
                <p style={{ margin: 0 }}>{s.description}</p>
              </div>
            </div>

            <div className="grid-2">
              <div>
                <h4 style={{ marginBottom: 8 }}>🔍 Признаки</h4>
                <ul>
                  {s.signs.map((sign, i) => <li key={i}>{sign}</li>)}
                </ul>
              </div>
              <div>
                <h4 style={{ marginBottom: 8 }}>🎯 Что делать лидеру</h4>
                <ul>
                  {s.leaderActions.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <h4 style={{ marginBottom: 8 }}>⚠️ Риски</h4>
              <ul>
                {s.risks.map((r, i) => <li key={i} style={{ color: 'var(--accent-orange)' }}>{r}</li>)}
              </ul>
            </div>

            <div style={{ marginTop: 20 }}>
              <h4 style={{ marginBottom: 8 }}>📊 Метрики команды</h4>
              {Object.entries(s.metrics).map(([key, value]) => (
                <div key={key} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 2 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {{ productivity: '⚡ Продуктивность', trust: '🤝 Доверие', conflicts: '💥 Конфликты', autonomy: '🏄 Автономность' }[key]}
                    </span>
                    <span>{value}%</span>
                  </div>
                  <div className="meter">
                    <div
                      className={`meter-fill ${key === 'conflicts' ? (value > 50 ? 'red' : 'green') : (value > 60 ? 'green' : value > 30 ? 'orange' : 'red')}`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })()}

      {/* Stage progress visual */}
      <div className="card">
        <h3>🗺️ Путь команды</h3>
        <div style={{ display: 'flex', gap: 8, margin: '20px 0', alignItems: 'center' }}>
          {stages.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  padding: '12px 8px',
                  borderRadius: 8,
                  background: i <= activeStage ? `${s.color}25` : 'var(--bg-code)',
                  border: `2px solid ${i <= activeStage ? s.color : 'var(--border-color)'}`,
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveStage(i)}
              >
                <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
                <div style={{ fontSize: '0.75rem', marginTop: 4, color: i <= activeStage ? s.color : 'var(--text-muted)' }}>
                  {s.title}
                </div>
              </div>
              {i < stages.length - 1 && (
                <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', margin: '0 4px' }}>→</span>
              )}
            </div>
          ))}
        </div>

        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <div className="info-box-title">Важно!</div>
            Путь не линейный. Команда может откатиться при изменениях: новый человек, смена руководства, реорганизация.
          </div>
        </div>
      </div>

      {/* Simulator */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>🎮 Симулятор: жизнь команды</h3>
        <p style={{ marginBottom: 16 }}>Нажимайте кнопку, чтобы увидеть как разные события влияют на стадию команды.</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
          {stages.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  padding: '10px 8px',
                  borderRadius: 8,
                  background: i === simStage ? `${s.color}30` : 'var(--bg-code)',
                  border: `2px solid ${i === simStage ? s.color : 'transparent'}`,
                  textAlign: 'center',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{ fontSize: '1.3rem' }}>{s.icon}</div>
                <div style={{ fontSize: '0.7rem', color: i === simStage ? s.color : 'var(--text-muted)' }}>
                  {s.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="controls">
          <button className="btn btn-primary" onClick={triggerEvent}>
            🎲 Случайное событие
          </button>
          <button className="btn btn-secondary" onClick={() => { setSimStage(0); setSimLog([]); setCurrentEvent(null) }}>
            🔄 Сбросить
          </button>
        </div>

        {currentEvent && (
          <div className="info-box" style={{ marginTop: 12, borderColor: currentEvent.effect > 0 ? 'var(--accent-green)' : 'var(--accent-red)', background: currentEvent.effect > 0 ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)' }}>
            <div className="info-box-icon">{currentEvent.effect > 0 ? '📈' : '📉'}</div>
            <div className="info-box-content">
              <div className="info-box-title">{currentEvent.text}</div>
              {currentEvent.explanation}
            </div>
          </div>
        )}

        {simLog.length > 0 && (
          <div style={{ marginTop: 16, maxHeight: 200, overflowY: 'auto' }}>
            <h4 style={{ fontSize: '0.85rem', marginBottom: 8 }}>📋 История</h4>
            {simLog.map((entry, i) => (
              <div key={i} style={{ fontSize: '0.8rem', padding: '6px 0', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <span>{stages[entry.from].icon} → {stages[entry.to].icon}</span>
                {' '}{entry.event}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Материалы */}
      <div className="card">
        <h3>📚 Материалы для изучения</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="https://ru.wikipedia.org/wiki/Модель_Такмана" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Модель Такмана — Википедия
          </a>
        </div>
      </div>
    </div>
  )
}
