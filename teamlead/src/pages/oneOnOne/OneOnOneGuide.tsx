import { useState } from 'react'

const questionCategories = [
  {
    name: 'Самочувствие',
    icon: '😊',
    questions: [
      'Как ты себя чувствуешь по шкале от 1 до 10?',
      'Что отнимает у тебя больше всего энергии?',
      'Есть ли что-то, что мешает тебе работать?',
      'Как ты справляешься с нагрузкой?',
    ]
  },
  {
    name: 'Работа',
    icon: '💻',
    questions: [
      'Над чем сейчас работаешь? Как продвигается?',
      'Есть ли задачи, где ты застрял?',
      'Что тебе нравится в текущих задачах?',
      'Что бы ты хотел делать меньше?',
    ],
  },
  {
    name: 'Развитие',
    icon: '📈',
    questions: [
      'Какой навык хочешь прокачать в ближайший месяц?',
      'Чему ты научился за последние 2 недели?',
      'Где ты видишь себя через полгода?',
      'Какой проект/задача дал бы тебе максимальный рост?',
    ],
  },
  {
    name: 'Команда',
    icon: '👥',
    questions: [
      'Как тебе работается с командой?',
      'Есть ли кто-то, с кем сложно?',
      'Что бы ты изменил в наших процессах?',
      'Чувствуешь ли ты, что тебя слышат?',
    ],
  },
  {
    name: 'Фидбек мне',
    icon: '🪞',
    questions: [
      'Что я могу делать лучше как лид?',
      'Достаточно ли я доступен?',
      'Есть ли что-то, что я мог бы перестать делать?',
      'Чувствуешь ли ты мою поддержку?',
    ],
  },
]

const mistakes = [
  { icon: '❌', title: 'Превращать в статус-митинг', desc: '«Что сделал за неделю?» — это не 1:1, это отчёт. 1:1 — про человека, не про задачи.' },
  { icon: '❌', title: 'Отменять и переносить', desc: 'Регулярная отмена 1:1 = сигнал «ты мне не важен». Даже 15 минут лучше, чем отмена.' },
  { icon: '❌', title: 'Говорить 80% времени', desc: 'Правило 70/30: сотрудник говорит 70%, лид 30%. Задавайте открытые вопросы.' },
  { icon: '❌', title: 'Не записывать action items (договорённости)', desc: 'Если нет action items — встреча была бесполезной. Фиксируйте договорённости.' },
  { icon: '❌', title: 'Обсуждать только проблемы', desc: 'Начинайте с позитива. Замечайте успехи и рост. Люди должны уходить с энергией.' },
]

const templates = [
  {
    name: 'Первый 1:1 с новым человеком',
    duration: '45-60 мин',
    agenda: [
      'Расскажи о себе — чем занимался, что не нравилось, что нравилось',
      'Как тебе удобнее получать фидбек?',
      'Какие ожидания от работы? Что важно?',
      'Как я могу помочь на старте?',
      'Договориться о формате и частоте 1:1',
    ]
  },
  {
    name: 'Регулярный 1:1',
    duration: '30 мин',
    agenda: [
      'Чек-ин: как дела? (2 мин)',
      'Что на уме? Что тревожит? (10 мин)',
      'Текущие задачи — есть ли блокеры? (5 мин)',
      'Развитие — прогресс по целям (5 мин)',
      'Action items (договорённости) из прошлой встречи (3 мин)',
      'Есть ли фидбек для меня? (5 мин)',
    ]
  },
  {
    name: 'Performance review (оценка эффективности) 1:1',
    duration: '60 мин',
    agenda: [
      'Как ты сам оцениваешь свой прогресс?',
      'Какими достижениями гордишься?',
      'Что не получилось и почему?',
      'Мой фидбек: сильные стороны + зоны роста',
      'Цели на следующий период',
      'Какая поддержка нужна?',
    ]
  },
]

export default function OneOnOneGuide() {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState(0)
  const [checkedQuestions, setCheckedQuestions] = useState<Set<string>>(new Set())
  const [notes, setNotes] = useState<Record<string, string>>({})

  const toggleQuestion = (q: string) => {
    setCheckedQuestions(prev => {
      const next = new Set(prev)
      next.has(q) ? next.delete(q) : next.add(q)
      return next
    })
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🤝 1-on-1 встречи</h1>
        <p>Самый мощный инструмент тимлида. Регулярные индивидуальные встречи с каждым членом команды.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          1-on-1 — это не статус-апдейт по задачам и не мини-стендап, а <strong>время сотрудника</strong>.
          Энди Гроув (Intel CEO) в книге «High Output Management» назвал 1:1 самым
          высокорентабельным занятием руководителя: 30 минут вашего времени могут повлиять на
          качество 2 недель работы сотрудника.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Исследования Gallup показывают: сотрудники, регулярно обсуждающие с руководителем своё развитие,
          на <strong>2.1x более вовлечены</strong>. 1:1 — это место для фидбека, коучинга,
          обсуждения карьеры и раннего обнаружения проблем.
        </p>
        <div className="info-box">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <div className="info-box-title">Главное правило</div>
            1:1 принадлежит сотруднику, не руководителю. Повестку формирует сотрудник, а вы
            слушаете и помогаете. Никогда не отменяйте 1:1 — это сигнал «ты не важен».
          </div>
        </div>
      </div>

      {/* What is 1:1 */}
      <div className="card">
        <h3>Что такое 1:1?</h3>
        <div className="grid-2">
          <div>
            <p><strong>1:1 (one-on-one)</strong> — регулярная встреча тимлида с сотрудником, где обсуждается:</p>
            <ul>
              <li>Самочувствие и мотивация</li>
              <li>Блокеры и проблемы</li>
              <li>Карьерное развитие</li>
              <li>Отношения в команде</li>
              <li>Обратная связь в обе стороны</li>
            </ul>
          </div>
          <div>
            <div className="info-box success">
              <div className="info-box-icon">⏰</div>
              <div className="info-box-content">
                <div className="info-box-title">Рекомендации</div>
                <ul className="info-list">
                  <li><strong>Частота:</strong> 1 раз в неделю или 2 недели</li>
                  <li><strong>Длительность:</strong> 25-45 минут</li>
                  <li><strong>Формат:</strong> неформальный, доверительный</li>
                  <li><strong>Ведёт:</strong> сотрудник, не менеджер</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Bank */}
      <div className="card">
        <h3>📝 Банк вопросов — собери свой 1:1</h3>
        <p style={{ marginBottom: 16 }}>Выбери категорию и отметь вопросы, которые хочешь задать. Это твой шаблон.</p>

        <div className="tabs">
          {questionCategories.map((cat, i) => (
            <button
              key={cat.name}
              className={`tab ${selectedCategory === i ? 'active' : ''}`}
              onClick={() => setSelectedCategory(i)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        <div>
          {questionCategories[selectedCategory].questions.map(q => (
            <div
              key={q}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '12px 16px',
                background: checkedQuestions.has(q) ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-code)',
                border: `1px solid ${checkedQuestions.has(q) ? 'var(--accent-main)' : 'var(--border-color)'}`,
                borderRadius: 8,
                marginBottom: 8,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onClick={() => toggleQuestion(q)}
            >
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>
                {checkedQuestions.has(q) ? '☑️' : '⬜'}
              </span>
              <span style={{ flex: 1 }}>{q}</span>
            </div>
          ))}
        </div>

        {checkedQuestions.size > 0 && (
          <div style={{ marginTop: 16 }}>
            <h4 style={{ marginBottom: 8 }}>✅ Ваш план ({checkedQuestions.size} вопросов):</h4>
            <ol>
              {Array.from(checkedQuestions).map(q => (
                <li key={q} style={{ marginBottom: 4 }}>{q}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Templates */}
      <div className="card">
        <h3>📋 Шаблоны встреч</h3>
        <div className="tabs">
          {templates.map((t, i) => (
            <button
              key={t.name}
              className={`tab ${selectedTemplate === i ? 'active' : ''}`}
              onClick={() => setSelectedTemplate(i)}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="info-box">
          <div className="info-box-icon">⏱️</div>
          <div className="info-box-content">
            <div className="info-box-title">{templates[selectedTemplate].name}</div>
            Рекомендуемая длительность: {templates[selectedTemplate].duration}
          </div>
        </div>

        {templates[selectedTemplate].agenda.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
            <span className="tag blue">{i + 1}</span>
            <div style={{ flex: 1 }}>
              <span>{item}</span>
              <div style={{ marginTop: 6 }}>
                <input
                  className="input"
                  placeholder="Заметки..."
                  value={notes[`${selectedTemplate}-${i}`] || ''}
                  onChange={e => setNotes(prev => ({ ...prev, [`${selectedTemplate}-${i}`]: e.target.value }))}
                  style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Common mistakes */}
      <div className="card">
        <h3>🚫 Типичные ошибки</h3>
        {mistakes.map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < mistakes.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{m.icon}</span>
            <div>
              <strong>{m.title}</strong>
              <p style={{ fontSize: '0.9rem', marginTop: 2 }}>{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
