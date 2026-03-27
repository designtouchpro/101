import { useState } from 'react'

interface Task {
  id: number
  title: string
  points: number
  status: 'backlog' | 'todo' | 'progress' | 'review' | 'done'
}

const initialTasks: Task[] = [
  { id: 1, title: 'Дизайн лендинга', points: 5, status: 'done' },
  { id: 2, title: 'API авторизации', points: 8, status: 'review' },
  { id: 3, title: 'Фильтры каталога', points: 3, status: 'progress' },
  { id: 4, title: 'Push-уведомления', points: 5, status: 'todo' },
  { id: 5, title: 'Интеграция оплаты', points: 13, status: 'backlog' },
  { id: 6, title: 'Страница профиля', points: 3, status: 'todo' },
  { id: 7, title: 'Email-шаблоны', points: 2, status: 'backlog' },
  { id: 8, title: 'Отчёт по продажам', points: 5, status: 'backlog' },
]

const columns = [
  { key: 'backlog' as const, label: 'Backlog (бэклог)', color: '#666' },
  { key: 'todo' as const, label: 'To Do (к выполнению)', color: '#3b82f6' },
  { key: 'progress' as const, label: 'In Progress (в работе)', color: '#f59e0b' },
  { key: 'review' as const, label: 'Review (проверка)', color: '#a855f7' },
  { key: 'done' as const, label: 'Done (готово)', color: '#22c55e' },
]

type Tab = 'compare' | 'board' | 'quiz'

export default function ScrumKanban() {
  const [activeTab, setActiveTab] = useState<Tab>('compare')
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [wipLimit, setWipLimit] = useState(3)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})

  const moveTask = (taskId: number, direction: 'left' | 'right') => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t
      const colKeys = columns.map(c => c.key)
      const idx = colKeys.indexOf(t.status)
      const newIdx = direction === 'right' ? Math.min(idx + 1, colKeys.length - 1) : Math.max(idx - 1, 0)
      return { ...t, status: colKeys[newIdx] }
    }))
  }

  const progressCount = tasks.filter(t => t.status === 'progress').length
  const wipExceeded = progressCount > wipLimit

  const quizQuestions = [
    {
      id: 1,
      q: 'Команда часто меняет приоритеты задач в течение спринта. Какой фреймворк лучше подойдёт?',
      options: ['Scrum', 'Kanban'],
      correct: 'Kanban',
      explain: 'Kanban не имеет фиксированных спринтов и позволяет менять приоритеты в любой момент.',
    },
    {
      id: 2,
      q: 'Команда хочет регулярно демонстрировать инкремент заказчику каждые 2 недели. Что выбрать?',
      options: ['Scrum', 'Kanban'],
      correct: 'Scrum',
      explain: 'Scrum имеет встроенные церемонии (Sprint Review), заточенные под регулярные демо.',
    },
    {
      id: 3,
      q: 'Саппорт-команда обрабатывает входящие баги по мере поступления. Что подходит?',
      options: ['Scrum', 'Kanban'],
      correct: 'Kanban',
      explain: 'Kanban идеален для потоковой работы (continuous flow), где задачи приходят непредсказуемо.',
    },
    {
      id: 4,
      q: 'Нужно ограничить незавершённую работу и визуализировать поток. Какой принцип?',
      options: ['Sprint Goal', 'WIP Limit'],
      correct: 'WIP Limit',
      explain: 'WIP Limit — ключевой принцип Kanban, ограничивающий количество задач в работе.',
    },
  ]

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔄 Scrum vs Kanban</h1>
        <p>Два самых популярных Agile-фреймворка. В чём разница и когда что использовать.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Scrum</strong> — итеративный фреймворк с фиксированными ролями (Product Owner — владелец продукта, Scrum Master — скрам-мастер, Dev Team — команда разработки), 
          событиями (Sprint — спринт, Planning — планирование, Daily — ежедневка, Review — обзор, Retro — ретроспектива) и артефактами (Product Backlog — бэклог продукта, Sprint Backlog — бэклог спринта, Increment — инкремент). 
          Придуман Кеном Швабером и Джеффом Сазерлендом в начале 1990-х. Scrum хорош, когда требования меняются, 
          но нужна предсказуемость через спринты.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Kanban</strong> — метод управления потоком работы, заимствованный из Toyota Production System. 
          Нет спринтов, нет ролей — только визуализация потока (доска), ограничение WIP (Work In Progress) 
          и непрерывное улучшение. Kanban подходит для операционных команд (support, DevOps, баг-фиксинг), 
          где работа приходит непредсказуемо.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>💡 Scrumban</strong>: На практике многие команды комбинируют подходы — берут спринты из Scrum 
            и WIP-лимиты из Kanban. Это не анти-паттерн, а адаптация под реальность. 
            Главное — понимать, ЗАЧЕМ вы берёте каждый элемент, а не копировать слепо.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="tabs">
          <button className={`tab ${activeTab === 'compare' ? 'active' : ''}`} onClick={() => setActiveTab('compare')}>📊 Сравнение</button>
          <button className={`tab ${activeTab === 'board' ? 'active' : ''}`} onClick={() => setActiveTab('board')}>🎯 Kanban-доска</button>
          <button className={`tab ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>🧠 Квиз</button>
        </div>
      </div>

      {activeTab === 'compare' && (
        <>
          <div className="card" style={{ overflowX: 'auto' }}>
            <h3>Scrum vs Kanban: ключевые отличия</h3>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ textAlign: 'left', padding: 10, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Аспект</th>
                  <th style={{ textAlign: 'center', padding: 10, fontSize: '0.85rem', color: '#3b82f6' }}>Scrum</th>
                  <th style={{ textAlign: 'center', padding: 10, fontSize: '0.85rem', color: '#a855f7' }}>Kanban</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Итерации', 'Фиксированные спринты (1-4 нед.)', 'Непрерывный поток'],
                  ['Роли', 'PO, Scrum Master, Dev Team', 'Нет обязательных ролей'],
                  ['Планирование', 'Sprint Planning (планирование спринта) каждый спринт', 'По мере необходимости'],
                  ['Метрика', 'Velocity — скорость (SP/спринт)', 'Lead Time (время выполнения), Cycle Time (время цикла)'],
                  ['Изменения', 'Нежелательны внутри спринта', 'В любой момент'],
                  ['Доска', 'Обнуляется каждый спринт', 'Постоянная, задачи текут'],
                  ['WIP лимит', 'Неявный (Sprint Backlog — бэклог спринта)', 'Явный (для каждой колонки)'],
                  ['Церемонии', 'Daily, Planning, Review, Retro', 'Только Daily (опционально)'],
                ].map(([aspect, scrum, kanban]) => (
                  <tr key={aspect} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: 10, fontWeight: 600, fontSize: '0.9rem' }}>{aspect}</td>
                    <td style={{ padding: 10, textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{scrum}</td>
                    <td style={{ padding: 10, textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{kanban}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid-2">
            <div className="card" style={{ borderTop: '3px solid #3b82f6' }}>
              <h3>🔵 Когда Scrum</h3>
              <ul>
                <li>Продуктовая разработка с регулярными релизами</li>
                <li>Нужна предсказуемость (velocity)</li>
                <li>Команда 5-9 человек</li>
                <li>Заказчик готов к демо каждые 2 недели</li>
                <li>Есть выделенный PO и SM</li>
              </ul>
            </div>
            <div className="card" style={{ borderTop: '3px solid #a855f7' }}>
              <h3>🟣 Когда Kanban</h3>
              <ul>
                <li>Поддержка, DevOps, саппорт</li>
                <li>Задачи приходят непредсказуемо</li>
                <li>Команда любого размера</li>
                <li>Нужна гибкость приоритетов</li>
                <li>Уже есть процесс — хочется улучшить</li>
              </ul>
            </div>
          </div>
        </>
      )}

      {activeTab === 'board' && (
        <div className="card">
          <h3>🎯 Интерактивная Kanban-доска</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>WIP Limit (In Progress):</label>
            <input
              type="number" min={1} max={10} value={wipLimit}
              onChange={e => setWipLimit(+e.target.value)}
              style={{ width: 60, padding: 6, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', textAlign: 'center' }}
            />
            {wipExceeded && (
              <span style={{ color: 'var(--accent-red)', fontSize: '0.85rem', fontWeight: 600 }}>
                ⚠️ WIP превышен! ({progressCount}/{wipLimit})
              </span>
            )}
          </div>

          <div className="kanban-board">
            {columns.map(col => {
              const colTasks = tasks.filter(t => t.status === col.key)
              const isOver = col.key === 'progress' && colTasks.length > wipLimit
              return (
                <div key={col.key} className="kanban-column" style={{ border: isOver ? '2px solid var(--accent-red)' : undefined }}>
                  <div className="kanban-column-header" style={{ background: `${col.color}20`, color: col.color }}>
                    {col.label} ({colTasks.length})
                  </div>
                  {colTasks.map(task => (
                    <div key={task.id} className="kanban-card">
                      <div style={{ marginBottom: 6, fontWeight: 500 }}>{task.title}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="tag blue">{task.points} SP</span>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {col.key !== 'backlog' && (
                            <button onClick={() => moveTask(task.id, 'left')} className="btn btn-secondary btn-sm" style={{ padding: '2px 8px' }}>←</button>
                          )}
                          {col.key !== 'done' && (
                            <button onClick={() => moveTask(task.id, 'right')} className="btn btn-secondary btn-sm" style={{ padding: '2px 8px' }}>→</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>

          <div className="info-box" style={{ marginTop: 16 }}>
            <div className="info-box-icon">💡</div>
            <div className="info-box-content">
              <div className="info-box-title">WIP Limit</div>
              Ограничение незавершённой работы — ключевой принцип Kanban. Когда WIP превышен (красная рамка),
              команда должна сначала завершить текущие задачи, а не брать новые. Это снижает переключение контекста.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="card">
          <h3>🧠 Scrum или Kanban?</h3>
          <p style={{ marginBottom: 16 }}>Выберите подходящий фреймворк для каждой ситуации:</p>
          {quizQuestions.map(q => {
            const answered = quizAnswers[q.id]
            const isCorrect = answered === q.correct
            return (
              <div key={q.id} style={{
                padding: 16, borderRadius: 8, border: '1px solid var(--border-color)',
                background: answered ? (isCorrect ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)') : 'var(--bg-code)',
                marginBottom: 12,
              }}>
                <p style={{ fontWeight: 500, marginBottom: 10 }}>{q.q}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {q.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => !answered && setQuizAnswers(a => ({ ...a, [q.id]: opt }))}
                      disabled={!!answered}
                      style={{
                        padding: '8px 20px', borderRadius: 8, cursor: answered ? 'default' : 'pointer',
                        border: `1px solid ${answered ? (opt === q.correct ? '#22c55e' : opt === answered ? '#ef4444' : 'var(--border-color)') : 'var(--border-color)'}`,
                        background: answered ? (opt === q.correct ? 'rgba(34,197,94,0.1)' : opt === answered && !isCorrect ? 'rgba(239,68,68,0.1)' : 'var(--bg-secondary)') : 'var(--bg-secondary)',
                        color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 500,
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {answered && (
                  <p style={{ marginTop: 8, fontSize: '0.85rem', color: isCorrect ? '#22c55e' : '#ef4444' }}>
                    {isCorrect ? '✅' : '❌'} {q.explain}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Материалы */}
      <div className="card">
        <h3>📚 Материалы для изучения</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="https://ru.wikipedia.org/wiki/Scrum" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Scrum — Википедия
          </a>
          <a href="https://ru.wikipedia.org/wiki/Канбан" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Канбан — Википедия
          </a>
          <a href="https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-Russian.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Руководство по Scrum 2020 (PDF, рус.)
          </a>
        </div>
      </div>
    </div>
  )
}
