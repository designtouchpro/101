import { useState } from 'react'

interface Activity {
  name: string
  steps: string[]
}

interface Story {
  id: string
  activity: number
  step: number
  text: string
  priority: 'must' | 'should' | 'could'
}

const activities: Activity[] = [
  { name: '🔍 Поиск товара', steps: ['Открыть каталог', 'Фильтрация', 'Просмотр карточки'] },
  { name: '🛒 Покупка', steps: ['Добавить в корзину', 'Оформить заказ', 'Оплата'] },
  { name: '📦 Получение', steps: ['Трекинг', 'Получение', 'Оценка + отзыв'] },
]

const defaultStories: Story[] = [
  { id: '1', activity: 0, step: 0, text: 'Поиск по названию', priority: 'must' },
  { id: '2', activity: 0, step: 0, text: 'Поиск по категориям', priority: 'must' },
  { id: '3', activity: 0, step: 1, text: 'Фильтр по цене', priority: 'must' },
  { id: '4', activity: 0, step: 1, text: 'Фильтр по рейтингу', priority: 'should' },
  { id: '5', activity: 0, step: 2, text: 'Фото товара', priority: 'must' },
  { id: '6', activity: 0, step: 2, text: '360° просмотр', priority: 'could' },
  { id: '7', activity: 1, step: 0, text: 'Кнопка "В корзину"', priority: 'must' },
  { id: '8', activity: 1, step: 0, text: 'Изменить количество', priority: 'should' },
  { id: '9', activity: 1, step: 1, text: 'Адрес доставки', priority: 'must' },
  { id: '10', activity: 1, step: 1, text: 'Выбор слота доставки', priority: 'should' },
  { id: '11', activity: 1, step: 2, text: 'Оплата картой', priority: 'must' },
  { id: '12', activity: 1, step: 2, text: 'Apple Pay / GPay', priority: 'could' },
  { id: '13', activity: 2, step: 0, text: 'Статус заказа', priority: 'must' },
  { id: '14', activity: 2, step: 0, text: 'Push-уведомления', priority: 'should' },
  { id: '15', activity: 2, step: 1, text: 'QR-код для пункта выдачи', priority: 'should' },
  { id: '16', activity: 2, step: 2, text: 'Оставить отзыв', priority: 'should' },
  { id: '17', activity: 2, step: 2, text: 'Загрузить фото', priority: 'could' },
]

const priorityColors: Record<string, string> = {
  must: 'var(--accent-main)',
  should: 'var(--accent-blue)',
  could: 'var(--accent-purple)',
}

const priorityLabels: Record<string, string> = {
  must: 'MVP',
  should: 'v1.1',
  could: 'v2.0',
}

export default function UserStoryMapping() {
  const [stories, setStories] = useState<Story[]>(defaultStories)
  const [showOnly, setShowOnly] = useState<string | null>(null)
  const [newStoryText, setNewStoryText] = useState('')
  const [newStoryAct, setNewStoryAct] = useState(0)
  const [newStoryStep, setNewStoryStep] = useState(0)

  const cyclePriority = (id: string) => {
    const cycle: Record<string, 'must' | 'should' | 'could'> = { must: 'should', should: 'could', could: 'must' }
    setStories(prev => prev.map(s => s.id === id ? { ...s, priority: cycle[s.priority] } : s))
  }

  const addStory = () => {
    if (!newStoryText.trim()) return
    setStories(prev => [...prev, {
      id: String(Date.now()),
      activity: newStoryAct,
      step: newStoryStep,
      text: newStoryText,
      priority: 'could',
    }])
    setNewStoryText('')
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🗂️ User Story Mapping</h1>
        <p>Визуальная карта пользовательского пути по методу Jeff Patton. Определяет scope MVP.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>User Story Mapping</strong> — методика, предложенная Джеффом Паттоном (Jeff Patton) в 2005 году и описанная в одноимённой книге.
          Классический flat-бэклог — это список без контекста: непонятно, как истории связаны между собой и какой пользовательский сценарий
          они формируют. Story Map решает эту проблему, размещая истории в двумерном пространстве.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          По горизонтали (ось X) идёт путь пользователя — от первого контакта до достижения цели. Это «backbone» (хребет) карты.
          По вертикали (ось Y) — детализация: сверху ключевые активности, ниже — конкретные истории, отсортированные по приоритету.
          Горизонтальная линия отсекает MVP от будущих релизов: всё выше линии — must-have, ниже — nice-to-have.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>💡 Walking Skeleton</strong>: Первая горизонтальная «полоса» карты — это walking skeleton (ходячий скелет).
            Минимальный сквозной сценарий, который можно показать пользователю и получить обратную связь.
            Это не MVP целиком — это первый тонкий слой, доказывающий, что архитектура работает end-to-end.
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="card">
        <h3>Как это работает?</h3>
        <div className="grid-3" style={{ marginBottom: 16 }}>
          <div className="info-box" style={{ margin: 0, flexDirection: 'column', textAlign: 'center' }}>
            <strong>Ось X →</strong>
            <span style={{ fontSize: '0.85rem' }}>Путь пользователя (слева направо)</span>
          </div>
          <div className="info-box" style={{ margin: 0, flexDirection: 'column', textAlign: 'center' }}>
            <strong>Ось Y ↓</strong>
            <span style={{ fontSize: '0.85rem' }}>Приоритет (сверху вниз)</span>
          </div>
          <div className="info-box" style={{ margin: 0, flexDirection: 'column', textAlign: 'center' }}>
            <strong>Горизонтальная линия</strong>
            <span style={{ fontSize: '0.85rem' }}>Граница MVP / v1.1</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            className={`btn btn-sm ${showOnly === null ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowOnly(null)}
          >
            Все
          </button>
          {Object.entries(priorityLabels).map(([key, label]) => (
            <button
              key={key}
              className={`btn btn-sm ${showOnly === key ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setShowOnly(showOnly === key ? null : key)}
              style={showOnly === key ? { background: priorityColors[key] } : {}}
            >
              {label} ({stories.filter(s => s.priority === key).length})
            </button>
          ))}
        </div>
      </div>

      {/* Story Map */}
      <div className="card" style={{ overflowX: 'auto' }}>
        <h3>🗺 Карта историй: E-commerce</h3>

        <div style={{ display: 'flex', gap: 16, minWidth: 800, marginTop: 16 }}>
          {activities.map((act, ai) => (
            <div key={ai} style={{ flex: 1, minWidth: 220 }}>
              {/* Activity Header */}
              <div style={{
                background: 'var(--accent-main)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px 8px 0 0',
                fontWeight: 600,
                fontSize: '0.9rem',
                textAlign: 'center',
              }}>
                {act.name}
              </div>

              {/* Steps */}
              {act.steps.map((step, si) => (
                <div key={si} style={{ marginTop: 8 }}>
                  <div style={{
                    background: 'var(--bg-code)',
                    padding: '6px 10px',
                    borderRadius: 6,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    textAlign: 'center',
                    marginBottom: 4,
                  }}>
                    {step}
                  </div>

                  {/* Stories for this step */}
                  {stories
                    .filter(s => s.activity === ai && s.step === si && (!showOnly || s.priority === showOnly))
                    .sort((a, b) => {
                      const order = { must: 0, should: 1, could: 2 }
                      return order[a.priority] - order[b.priority]
                    })
                    .map(story => (
                      <div
                        key={story.id}
                        onClick={() => cyclePriority(story.id)}
                        style={{
                          background: 'var(--bg-card)',
                          border: `1px solid ${priorityColors[story.priority]}40`,
                          borderLeft: `3px solid ${priorityColors[story.priority]}`,
                          borderRadius: 6,
                          padding: '6px 10px',
                          marginBottom: 4,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all 0.2s',
                        }}
                      >
                        <span>{story.text}</span>
                        <span style={{
                          fontSize: '0.65rem',
                          padding: '2px 6px',
                          borderRadius: 4,
                          background: `${priorityColors[story.priority]}20`,
                          color: priorityColors[story.priority],
                          whiteSpace: 'nowrap',
                        }}>
                          {priorityLabels[story.priority]}
                        </span>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 12 }}>
          💡 Кликните на карточку, чтобы изменить приоритет (MVP → v1.1 → v2.0)
        </p>
      </div>

      {/* Add Story */}
      <div className="card">
        <h3>➕ Добавь историю</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 2, minWidth: 180 }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>User Story</label>
            <input className="input" placeholder="Как пользователь, я хочу..." value={newStoryText} onChange={e => setNewStoryText(e.target.value)} />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Активность</label>
            <select className="input" value={newStoryAct} onChange={e => { setNewStoryAct(+e.target.value); setNewStoryStep(0) }}>
              {activities.map((a, i) => <option key={i} value={i}>{a.name}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Шаг</label>
            <select className="input" value={newStoryStep} onChange={e => setNewStoryStep(+e.target.value)}>
              {activities[newStoryAct].steps.map((s, i) => <option key={i} value={i}>{s}</option>)}
            </select>
          </div>
          <button className="btn btn-primary" onClick={addStory}>Добавить</button>
        </div>
      </div>

      {/* Summary */}
      <div className="card">
        <h3>📊 Scope Summary</h3>
        <div className="grid-3">
          {Object.entries(priorityLabels).map(([key, label]) => {
            const count = stories.filter(s => s.priority === key).length
            return (
              <div key={key} className="score-display" style={{ margin: 0 }}>
                <div className="score-number" style={{ fontSize: '2rem', color: priorityColors[key] }}>{count}</div>
                <div className="score-label">{label} stories</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
