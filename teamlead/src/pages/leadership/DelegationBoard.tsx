import { useState } from 'react'

const levels = [
  { id: 1, name: 'Tell', label: 'Говорю', color: '#ef4444', desc: 'Я принимаю решение и сообщаю команде.' },
  { id: 2, name: 'Sell', label: 'Продаю', color: '#f97316', desc: 'Я принимаю решение и объясняю почему.' },
  { id: 3, name: 'Consult', label: 'Советуюсь', color: '#f59e0b', desc: 'Спрашиваю мнение, но решаю сам.' },
  { id: 4, name: 'Agree', label: 'Договариваемся', color: '#22c55e', desc: 'Решаем вместе, консенсус.' },
  { id: 5, name: 'Advise', label: 'Советую', color: '#06b6d4', desc: 'Команда решает, я даю совет.' },
  { id: 6, name: 'Inquire', label: 'Узнаю', color: '#6366f1', desc: 'Команда решает, я прошу объяснить потом.' },
  { id: 7, name: 'Delegate', label: 'Делегирую', color: '#a855f7', desc: 'Полностью отдаю решение команде.' },
]

const tasks = [
  {
    id: 1,
    title: 'Выбор CI/CD инструмента',
    context: 'Команда опытная, все знакомы с DevOps. Нужно выбрать между GitHub Actions и GitLab CI.',
    suggestedLevel: 5,
    explanation: 'Команда разбирается лучше вас. Дайте совет, но пусть выбирают сами.'
  },
  {
    id: 2,
    title: 'Распределение отпусков',
    context: 'Лето, все хотят в отпуск одновременно. Нужно чтобы проект не встал.',
    suggestedLevel: 4,
    explanation: 'Это касается всех. Лучше договориться вместе, учитывая потребности каждого и проекта.'
  },
  {
    id: 3,
    title: 'Выбор между сокращением техдолга и новой фичей',
    context: 'Бизнес давит на новую фичу. Техдолг растёт. Команда разделилась.',
    suggestedLevel: 3,
    explanation: 'Нужно учесть мнение команды, но конечное решение принимает лид — он знает бизнес-контекст.'
  },
  {
    id: 4,
    title: 'Стандарты код-ревью',
    context: 'Нужно установить правила: кто ревьюит, сколько апрувов, SLA.',
    suggestedLevel: 4,
    explanation: 'Правила работы команды лучше устанавливать совместно — тогда их будут соблюдать.'
  },
  {
    id: 5,
    title: 'Увольнение токсичного сотрудника',
    context: 'Один разработчик грубит на встречах и саботирует процессы. вы уже пробовали 1:1.',
    suggestedLevel: 1,
    explanation: 'Кадровые решения — ответственность лидера. Команду не вовлекают в увольнения.'
  },
  {
    id: 6,
    title: 'Именование переменных в модуле',
    context: 'Мидл разработчик спрашивает, как назвать переменную в своём модуле.',
    suggestedLevel: 7,
    explanation: 'Микроменеджмент! Разработчик сам справится. Полностью делегируйте.'
  },
  {
    id: 7,
    title: 'Переход на микросервисы',
    context: 'Монолит тормозит разработку. CTO хочет микросервисы. Команда скептична.',
    suggestedLevel: 2,
    explanation: 'Стратегическое решение уже принято (CTO). Ваша роль — продать идею команде, объяснить зачем.'
  },
]

export default function DelegationBoard() {
  const [assignments, setAssignments] = useState<Record<number, number>>({})
  const [showHints, setShowHints] = useState<Record<number, boolean>>({})
  const [showAll, setShowAll] = useState(false)

  const setLevel = (taskId: number, level: number) => {
    setAssignments(prev => ({ ...prev, [taskId]: level }))
  }

  const toggleHint = (taskId: number) => {
    setShowHints(prev => ({ ...prev, [taskId]: !prev[taskId] }))
  }

  const allAssigned = Object.keys(assignments).length === tasks.length
  const correctCount = Object.entries(assignments).filter(
    ([taskId, level]) => {
      const task = tasks.find(t => t.id === Number(taskId))
      return task && Math.abs(task.suggestedLevel - level) <= 1
    }
  ).length

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🎯 Делегирование — Delegation Poker</h1>
        <p>7 уровней делегирования по Юргену Аппело (Management 3.0). Не бинарно «делегировал / не делегировал», а спектр.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Делегирование — не «скинуть задачу», а <strong>передать ответственность с нужным уровнем автономии</strong>.
          Юрген Аппело в книге «Management 3.0» предложил модель из 7 уровней: от «Я решаю и сообщаю» (Tell — говорю)
          до «Полностью делегирую» (Delegate — делегирую). Ключевая идея — уровень делегирования должен соответствовать
          <strong>компетенции человека</strong> и <strong>цене ошибки</strong>.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Распространённая ошибка — бинарное делегирование: либо микроменеджмент, либо «разберись сам».
          Delegation Poker (покер делегирования) помогает найти баланс и <strong>прозрачно договориться</strong> с сотрудником об уровне автономии.
          Это особенно важно при росте команды: тимлид, который не делегирует, становится бутылочным горлышком (bottleneck).
        </p>
        <div className="info-box">
          <div className="info-box-icon">🎲</div>
          <div className="info-box-content">
            <div className="info-box-title">Delegation Poker на практике</div>
            Обсудите с сотрудником уровень делегирования для каждой зоны ответственности. Зафиксируйте на Delegation Board (доске делегирования).
            Пересматривайте каждые 1-2 месяца по мере роста компетенций.
          </div>
        </div>
      </div>

      {/* Levels legend */}
      <div className="card">
        <h3>7 уровней делегирования</h3>
        <p style={{ marginBottom: 16 }}>От полного контроля лидера (1) до полной свободы команды (7):</p>
        <div className="delegation-levels">
          {levels.map(l => (
            <div
              key={l.id}
              className="delegation-level"
              style={{ background: `${l.color}25`, color: l.color }}
              title={l.desc}
            >
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{l.id}</div>
              <div>{l.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
          <span>👑 Контроль лидера</span>
          <span>Свобода команды 🏄</span>
        </div>
      </div>

      {/* Info */}
      <div className="info-box">
        <div className="info-box-icon">💡</div>
        <div className="info-box-content">
          <div className="info-box-title">Как играть</div>
          Для каждой задачи выберите уровень делегирования. Нет «точного» ответа — допустимо ±1 от рекомендуемого.
          Нажмите «Подсказка», чтобы увидеть рекомендацию.
        </div>
      </div>

      {/* Tasks */}
      {tasks.map(task => {
        const assigned = assignments[task.id]
        const isCorrect = assigned !== undefined && Math.abs(task.suggestedLevel - assigned) <= 1
        const showResult = showAll || showHints[task.id]

        return (
          <div key={task.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <h3 style={{ marginBottom: 0 }}>{task.title}</h3>
              {assigned !== undefined && showResult && (
                <span className={`tag ${isCorrect ? 'green' : 'orange'}`}>
                  {isCorrect ? '✅ Близко!' : '🤔 Можно лучше'}
                </span>
              )}
            </div>
            <p style={{ marginBottom: 12 }}>{task.context}</p>

            <div className="delegation-levels">
              {levels.map(l => (
                <div
                  key={l.id}
                  className={`delegation-level ${assigned === l.id ? 'active' : ''}`}
                  style={{
                    background: assigned === l.id ? l.color : `${l.color}15`,
                    color: assigned === l.id ? 'white' : l.color,
                  }}
                  onClick={() => setLevel(task.id, l.id)}
                  title={l.desc}
                >
                  <div style={{ fontWeight: 700 }}>{l.id}</div>
                  <div>{l.label}</div>
                </div>
              ))}
            </div>

            <div className="controls" style={{ marginTop: 8 }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => toggleHint(task.id)}
              >
                {showHints[task.id] ? 'Скрыть' : '💡 Подсказка'}
              </button>
            </div>

            {showResult && (
              <div className="info-box success" style={{ marginTop: 8 }}>
                <div className="info-box-icon">🎯</div>
                <div className="info-box-content">
                  <div className="info-box-title">
                    Рекомендация: {task.suggestedLevel} — {levels[task.suggestedLevel - 1].label}
                  </div>
                  {task.explanation}
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Results */}
      <div className="controls">
        <button
          className="btn btn-primary"
          onClick={() => setShowAll(true)}
          disabled={!allAssigned}
        >
          Показать все ответы
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => { setAssignments({}); setShowHints({}); setShowAll(false) }}
        >
          Сбросить
        </button>
      </div>

      {showAll && allAssigned && (
        <div className="score-display">
          <div className="score-number">{correctCount}/{tasks.length}</div>
          <div className="score-label">
            задач с правильным уровнем делегирования (±1)
          </div>
        </div>
      )}

      {/* Материалы */}
      <div className="card">
        <h3>📚 Материалы для изучения</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="https://ru.wikipedia.org/wiki/Делегирование_полномочий" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Делегирование полномочий — Википедия
          </a>
        </div>
      </div>
    </div>
  )
}
