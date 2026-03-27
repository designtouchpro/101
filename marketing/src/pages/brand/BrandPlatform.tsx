import { useState } from 'react'

const platformSections = [
  {
    key: 'mission', icon: '🎯', title: 'Миссия',
    desc: 'Зачем ваша компания существует (кроме денег)?',
    examples: [
      { company: 'Tesla', text: 'Ускорить переход мира на устойчивую энергию' },
      { company: 'Google', text: 'Организовать всю информацию в мире и сделать её доступной' },
      { company: 'Notion', text: 'Сделать инструменты работы доступными для каждого' },
    ],
    template: 'Мы помогаем [кому] [что делать], чтобы [результат].',
  },
  {
    key: 'vision', icon: '🔭', title: 'Видение',
    desc: 'Какой мир вы хотите создать через 5-10 лет?',
    examples: [
      { company: 'Microsoft', text: 'Компьютер на каждом столе и в каждом доме' },
      { company: 'Airbnb', text: 'Мир, где каждый может чувствовать себя как дома' },
    ],
    template: 'Мир, в котором [какой результат].',
  },
  {
    key: 'values', icon: '💎', title: 'Ценности',
    desc: 'Принципы, по которым вы принимаете решения.',
    examples: [
      { company: 'GitLab', text: 'Transparency, Collaboration, Results, Efficiency, Iteration (Прозрачность, Сотрудничество, Результаты, Эффективность, Итеративность)' },
      { company: 'Stripe', text: 'Users first, Move with urgency, Think rigorously (Сначала пользователи, Действуй срочно, Думай строго)' },
    ],
    template: '1. [Ценность] — [что значит]\n2. [Ценность] — [что значит]\n3. [Ценность] — [что значит]',
  },
]

const toneOptions = [
  { tone: 'Дружелюбный', icon: '😊', desc: 'Как друг-эксперт', examples: ['Привет! Давай разберёмся вместе', 'Не волнуйся, это проще чем кажется'] },
  { tone: 'Профессиональный', icon: '👔', desc: 'Как консультант', examples: ['Мы предлагаем решение для...', 'Согласно нашему анализу...'] },
  { tone: 'Дерзкий', icon: '🔥', desc: 'Как бунтарь', examples: ['Хватит тратить время на фигню', 'Мы сломали правила'] },
  { tone: 'Минималистичный', icon: '⚡', desc: 'Как Apple', examples: ['Просто работает', 'Think different'] },
  { tone: 'Тёплый', icon: '☀️', desc: 'Как заботливый', examples: ['Мы рядом, когда тебе нужно', 'Каждый клиент для нас важен'] },
]

const brandExamples = [
  {
    brand: 'Slack', colors: ['#4A154B', '#36C5F0', '#2EB67D', '#ECB22E', '#E01E5A'],
    font: 'Lato', tone: 'Дружелюбный + Продуктивный',
  },
  {
    brand: 'Notion', colors: ['#000000', '#FFFFFF', '#F7F6F3', '#37352F'],
    font: 'Inter', tone: 'Минималистичный + Чистый',
  },
  {
    brand: 'Figma', colors: ['#F24E1E', '#FF7262', '#A259FF', '#1ABCFE', '#0ACF83'],
    font: 'Inter', tone: 'Творческий + Яркий',
  },
]

export default function BrandPlatform() {
  const [selectedSection, setSelectedSection] = useState(0)
  const [selectedTone, setSelectedTone] = useState(0)
  const [userValues, setUserValues] = useState<Record<string, string>>({})

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>💎 Бренд-платформа</h1>
        <p>Миссия, видение, ценности и Tone of Voice (тон коммуникации бренда) — фундамент бренда.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Бренд-платформа</strong> — это стратегический документ, который определяет идентичность бренда: 
          кто мы, зачем существуем, во что верим и как говорим. Это не логотип и не цветовая палитра — 
          это смысловой фундамент, на котором строятся все коммуникации. Без бренд-платформы каждый маркетолог 
          будет «придумывать» бренд заново для каждой кампании.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Ключевые элементы: <strong>Миссия</strong> — зачем компания существует (кроме денег). <strong>Видение</strong> — каким мир станет благодаря нам. <strong>Ценности</strong> — принципы, 
          которых мы придерживаемся. <strong>Tone of Voice</strong> — как мы звучим: формально или дружелюбно, 
          экспертно или доступно. ToV должен быть единым во всех каналах: от push-уведомления до письма CEO.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>💡 Тест на искренность</strong>: Если ваши ценности можно заменить на противоположные 
            и они всё ещё звучат нормально — это не ценности, а банальности. «Мы ценим качество» — банальность 
            (кто скажет «мы ценим халтуру»?). «Мы выпускаем только когда уверены на 100%, даже если это дольше» — ценность.
          </div>
        </div>
      </div>

      {/* Mission / Vision / Values */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {platformSections.map((s, i) => (
          <button key={s.key} className={`btn ${selectedSection === i ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedSection(i)}>
            {s.icon} {s.title}
          </button>
        ))}
      </div>

      {(() => {
        const section = platformSections[selectedSection]!
        return (
          <div className="card">
            <h3>{section.icon} {section.title}</h3>
            <p style={{ marginBottom: 16 }}>{section.desc}</p>

            {/* Examples */}
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-main)', marginBottom: 8 }}>Примеры</h4>
              {section.examples.map(ex => (
                <div key={ex.company} style={{
                  padding: '10px 14px', borderRadius: 8, background: 'var(--bg-secondary)',
                  marginBottom: 6, borderLeft: '3px solid var(--accent-main)',
                }}>
                  <strong>{ex.company}:</strong> <span style={{ color: 'var(--text-secondary)' }}>"{ex.text}"</span>
                </div>
              ))}
            </div>

            {/* Template */}
            <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-code)', fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: 16 }}>
              {section.template}
            </div>

            {/* User input */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>
                Ваша {section.title.toLowerCase()}:
              </label>
              <textarea className="input" placeholder={`Напишите ${section.title.toLowerCase()} вашего бренда…`}
                value={userValues[section.key] || ''}
                onChange={e => setUserValues(prev => ({ ...prev, [section.key]: e.target.value }))}
                style={{ minHeight: 80 }} />
            </div>
          </div>
        )
      })()}

      {/* Tone of Voice */}
      <div className="card">
        <h3>🗣️ Tone of Voice</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
          Как ваш бренд «говорит»? Выберите тон, который подходит вашей аудитории.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {toneOptions.map((t, i) => (
            <div key={t.tone} onClick={() => setSelectedTone(i)} style={{
              padding: '12px 16px', borderRadius: 10, cursor: 'pointer',
              border: `2px solid ${selectedTone === i ? 'var(--accent-main)' : 'var(--border-color)'}`,
              background: selectedTone === i ? 'var(--accent-main-alpha)' : 'var(--bg-secondary)',
              transition: 'all 0.2s', textAlign: 'center', minWidth: 120,
            }}>
              <div style={{ fontSize: '1.5rem' }}>{t.icon}</div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.tone}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t.desc}</div>
            </div>
          ))}
        </div>

        {(() => {
          const t = toneOptions[selectedTone]!
          return (
            <div className="info-box">
              <div className="info-box-content">
                <div className="info-box-title">{t.icon} {t.tone} тон</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                  {t.examples.map(ex => (
                    <div key={ex} style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                      "{ex}"
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })()}
      </div>

      {/* Brand examples */}
      <div className="card">
        <h3>🎨 Примеры IT-брендов</h3>
        <div className="grid-3">
          {brandExamples.map(b => (
            <div key={b.brand} style={{ padding: 16, borderRadius: 8, background: 'var(--bg-secondary)' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>{b.brand}</div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                {b.colors.map(c => (
                  <div key={c} style={{
                    width: 28, height: 28, borderRadius: 6, background: c,
                    border: '1px solid var(--border-color)',
                  }} title={c} />
                ))}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Шрифт: <strong>{b.font}</strong>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Тон: <strong>{b.tone}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="card">
        <h3>📚 Материалы для изучения</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="https://ru.wikipedia.org/wiki/Бренд" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Бренд — Википедия
          </a>
          <a href="https://ru.wikipedia.org/wiki/Фирменный_стиль" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Фирменный стиль — Википедия
          </a>
        </div>
      </div>
    </div>
  )
}
