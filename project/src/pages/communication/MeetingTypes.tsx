import { useState } from 'react'

interface Meeting {
  name: string
  icon: string
  duration: string
  frequency: string
  participants: string[]
  agenda: string[]
  antipatterns: string[]
  tips: string[]
}

const meetings: Meeting[] = [
  {
    name: 'Daily Standup',
    icon: '🌅',
    duration: '15 мин',
    frequency: 'Ежедневно',
    participants: ['Scrum Master', 'Команда'],
    agenda: ['Что сделал вчера?', 'Что планирую сегодня?', 'Есть ли блокеры?'],
    antipatterns: [
      'Превращается в отчёт для менеджера',
      'Обсуждение технических деталей',
      'Затягивается 30+ минут',
      'Люди приходят неподготовленными',
    ],
    tips: [
      'Стоя — короче встречи',
      'Таймбокс строго 15 минут',
      'Парковка для длинных тем',
      'Фокус на цели спринта',
    ],
  },
  {
    name: 'Sprint Planning',
    icon: '📋',
    duration: '2-4 часа',
    frequency: 'Начало спринта',
    participants: ['PO', 'Scrum Master', 'Команда'],
    agenda: [
      'PO представляет цель спринта',
      'Обсуждение и уточнение задач',
      'Оценка Story Points',
      'Формирование Sprint Backlog',
      'Определение Definition of Done',
    ],
    antipatterns: [
      'Нет подготовленного бэклога',
      'PO диктует, команда молчит',
      'Неоценённые задачи берутся в работу',
      'Игнорирование velocity',
    ],
    tips: [
      'Backlog Refinement заранее',
      'Команда сама выбирает объём',
      'Декомпозиция больших историй',
      'Цель спринта = 1 предложение',
    ],
  },
  {
    name: 'Sprint Review / Demo',
    icon: '🎬',
    duration: '1-2 часа',
    frequency: 'Конец спринта',
    participants: ['PO', 'Команда', 'Стейкхолдеры'],
    agenda: [
      'Демо готовой функциональности',
      'Обратная связь от стейкхолдеров',
      'Обсуждение бэклога и приоритетов',
      'Метрики спринта',
    ],
    antipatterns: [
      'Показ незавершённых задач',
      'Нет живого демо (только слайды)',
      'Стейкхолдеры не приходят',
      'Нет обратной связи — только аплодисменты',
    ],
    tips: [
      'Подготовить сценарий демо',
      'Рабочий продукт, не мокапы',
      'Записать встречу',
      'Собирать feedback в документ',
    ],
  },
  {
    name: 'Retrospective',
    icon: '🔄',
    duration: '1-1.5 часа',
    frequency: 'Конец спринта',
    participants: ['Scrum Master', 'Команда'],
    agenda: [
      'Что прошло хорошо? ✅',
      'Что можно улучшить? 🔧',
      'Какие действия предпримем? 🎯',
    ],
    antipatterns: [
      'Обвинения и токсичность',
      'Одни и те же проблемы каждый спринт',
      'Action items не выполняются',
      'Менеджмент присутствует (команда молчит)',
    ],
    tips: [
      'Варьируйте форматы (4L, Sailboat, Starfish)',
      'Голосование за топ-3 проблемы',
      'Конкретные action items с ответственными',
      'Безопасная атмосфера — без начальства',
    ],
  },
  {
    name: 'Backlog Refinement',
    icon: '✂️',
    duration: '1 час',
    frequency: '1-2 раза в неделю',
    participants: ['PO', 'Команда (часть)'],
    agenda: [
      'Просмотр верхних элементов бэклога',
      'Уточнение Acceptance Criteria',
      'Декомпозиция эпиков',
      'Оценка (Story Points)',
      'Выявление зависимостей',
    ],
    antipatterns: [
      'Не проводится → хаос на планировании',
      'Слишком много людей',
      'Обсуждение реализации вместо требований',
    ],
    tips: [
      'Работать на 2-3 спринта вперёд',
      '5-10% времени спринта',
      'PO приходит подготовленным',
      'Готовность = DoR выполнен',
    ],
  },
  {
    name: 'One-on-One',
    icon: '🤝',
    duration: '30-60 мин',
    frequency: '1 раз в 1-2 недели',
    participants: ['Менеджер', 'Сотрудник'],
    agenda: [
      'Как дела? Настроение, загрузка',
      'Обратная связь (в обе стороны)',
      'Карьерное развитие',
      'Блокеры и проблемы',
    ],
    antipatterns: [
      'Превращается в статус-апдейт',
      'Менеджер говорит 80% времени',
      'Отменяется при первой возможности',
      'Нет follow-up по прошлым темам',
    ],
    tips: [
      'Это время сотрудника, не менеджера',
      'Заметки и follow-up обязательны',
      'Никогда не отменяйте (перенесите)',
      'Задавайте открытые вопросы',
    ],
  },
]

type RetroFormat = 'start-stop-continue' | '4l' | 'sailboat'
const retroFormats: { id: RetroFormat; name: string; icon: string }[] = [
  { id: 'start-stop-continue', name: 'Start / Stop / Continue', icon: '🚦' },
  { id: '4l', name: '4L (Liked, Learned, Lacked, Longed)', icon: '4️⃣' },
  { id: 'sailboat', name: 'Sailboat', icon: '⛵' },
]

export default function MeetingTypes() {
  const [selected, setSelected] = useState(0)
  const [retroFormat, setRetroFormat] = useState<RetroFormat>('start-stop-continue')
  const [retroItems, setRetroItems] = useState<Record<string, string[]>>({
    start: ['Автоматизировать деплой'], stop: ['Встречи без повестки'], continue: ['Парное программирование'],
    liked: ['Хорошая командная работа'], learned: ['Новый подход к тестированию'], lacked: ['Документация'], longed: ['Больше автоматизации'],
    wind: ['Сильная команда'], anchor: ['Технический долг'], rocks: ['Сроки горят'], island: ['Стабильный продукт'],
  })
  const [newItem, setNewItem] = useState('')
  const [activeColumn, setActiveColumn] = useState<string | null>(null)

  const meeting = meetings[selected]

  const getRetroColumns = (): { key: string; label: string; color: string }[] => {
    switch (retroFormat) {
      case 'start-stop-continue': return [
        { key: 'start', label: '🟢 Start', color: '#22c55e' },
        { key: 'stop', label: '🔴 Stop', color: '#ef4444' },
        { key: 'continue', label: '🔵 Continue', color: '#3b82f6' },
      ]
      case '4l': return [
        { key: 'liked', label: '❤️ Liked', color: '#ef4444' },
        { key: 'learned', label: '📚 Learned', color: '#3b82f6' },
        { key: 'lacked', label: '😕 Lacked', color: '#f59e0b' },
        { key: 'longed', label: '🌟 Longed', color: '#a855f7' },
      ]
      case 'sailboat': return [
        { key: 'wind', label: '💨 Ветер (помогает)', color: '#22c55e' },
        { key: 'anchor', label: '⚓ Якорь (мешает)', color: '#ef4444' },
        { key: 'rocks', label: '🪨 Скалы (риски)', color: '#f59e0b' },
        { key: 'island', label: '🏝️ Остров (цель)', color: '#3b82f6' },
      ]
    }
  }

  const addRetroItem = (col: string) => {
    if (!newItem.trim()) return
    setRetroItems(prev => ({ ...prev, [col]: [...(prev[col] || []), newItem.trim()] }))
    setNewItem('')
    setActiveColumn(null)
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📅 Типы встреч</h1>
        <p>Форматы, антипаттерны и лучшие практики для встреч в IT-командах.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Встречи — самый дорогой инструмент коммуникации в IT-команде. Часовая встреча 6 человек с зарплатой 
          200 000 ₽/мес обходится компании примерно в 7 000 ₽. При этом исследования показывают, что 
          до 50% времени встреч тратится неэффективно. Ключ — понимать <strong>цель</strong> каждого формата 
          и не смешивать их.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          В Agile-фреймворках встречи (ceremonies) чётко определены: daily standup, planning, review, retrospective. 
          Каждая имеет конкретную цель, тайм-бокс и участников. За пределами Scrum есть и другие форматы: 
          1-on-1, tech review, incident review, design critique. Правило хорошей встречи: если нет повестки, 
          результат встречи невозможно отличить от кофе-брейка.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>📌 Три вопроса перед встречей</strong>: 1) Можно ли решить это в Slack/email? 
            2) Кто ДЕЙСТВИТЕЛЬНО нужен? (остальные получат follow-up) 
            3) Какой deliverable после встречи? Если нет чёткого ответа — встреча не нужна.
          </div>
        </div>
      </div>

      {/* Meeting selector */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {meetings.map((m, i) => (
          <button key={m.name}
            className={`btn ${selected === i ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelected(i)}>
            {m.icon} {m.name}
          </button>
        ))}
      </div>

      {/* Meeting details */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>{meeting.icon} {meeting.name}</h3>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ fontSize: '0.8rem', padding: '4px 12px', borderRadius: 12, background: 'var(--accent-main-alpha)', color: 'var(--accent-main)' }}>
              ⏱ {meeting.duration}
            </span>
            <span style={{ fontSize: '0.8rem', padding: '4px 12px', borderRadius: 12, background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              📆 {meeting.frequency}
            </span>
          </div>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 16 }}>
          Участники: {meeting.participants.join(', ')}
        </div>

        {/* Agenda */}
        <div style={{ marginBottom: 20 }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: 8 }}>📝 Повестка</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {meeting.agenda.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
                background: 'var(--bg-secondary)', borderRadius: 8, fontSize: '0.85rem',
              }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--accent-main)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0 }}>
                  {i + 1}
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid-2">
          {/* Antipatterns */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#ef4444', marginBottom: 8 }}>🚫 Антипаттерны</h4>
            {meeting.antipatterns.map((a, i) => (
              <div key={i} style={{ fontSize: '0.8rem', marginBottom: 4, padding: '6px 10px', borderRadius: 6, background: '#ef444410', borderLeft: '3px solid #ef4444' }}>
                {a}
              </div>
            ))}
          </div>

          {/* Tips */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#22c55e', marginBottom: 8 }}>💡 Лучшие практики</h4>
            {meeting.tips.map((t, i) => (
              <div key={i} style={{ fontSize: '0.8rem', marginBottom: 4, padding: '6px 10px', borderRadius: 6, background: '#22c55e10', borderLeft: '3px solid #22c55e' }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Retro builder */}
      <div className="card">
        <h3>🔄 Симулятор ретроспективы</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
          Выберите формат и добавляйте пункты в колонки.
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {retroFormats.map(f => (
            <button key={f.id} className={`btn btn-sm ${retroFormat === f.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setRetroFormat(f.id)}>
              {f.icon} {f.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${getRetroColumns().length}, 1fr)`, gap: 12 }}>
          {getRetroColumns().map(col => (
            <div key={col.key} style={{
              padding: 12, borderRadius: 8, border: `1px solid ${col.color}40`,
              background: `${col.color}08`, minHeight: 150,
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: col.color, marginBottom: 8 }}>
                {col.label}
              </div>
              {(retroItems[col.key] || []).map((item, i) => (
                <div key={i} style={{
                  fontSize: '0.8rem', padding: '6px 8px', marginBottom: 4,
                  background: 'var(--bg-primary)', borderRadius: 6,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span>{item}</span>
                  <button onClick={() => setRetroItems(prev => ({
                    ...prev, [col.key]: prev[col.key].filter((_, idx) => idx !== i),
                  }))} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.4, fontSize: '0.7rem' }}>✕</button>
                </div>
              ))}
              {activeColumn === col.key ? (
                <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                  <input className="input" value={newItem} onChange={e => setNewItem(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') addRetroItem(col.key); if (e.key === 'Escape') setActiveColumn(null) }}
                    placeholder="Новый пункт…" autoFocus style={{ flex: 1, fontSize: '0.8rem', padding: '4px 8px' }} />
                  <button onClick={() => addRetroItem(col.key)} className="btn btn-primary btn-sm">+</button>
                </div>
              ) : (
                <button onClick={() => { setActiveColumn(col.key); setNewItem('') }}
                  style={{ width: '100%', padding: '6px', border: '1px dashed var(--border-color)', borderRadius: 6, background: 'none', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  + Добавить
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
