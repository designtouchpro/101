import { useState } from 'react'

const spotifyModel = {
  squad: {
    name: 'Squad (Отряд)',
    icon: '🏃',
    color: '#22c55e',
    size: '6-8 человек',
    desc: 'Маленькая кросс-функциональная команда. Как мини-стартап. Имеет продуктового владельца и полную автономию для достижения своей миссии.',
    members: ['Frontend', 'Backend', 'QA', 'Designer', 'Product Owner'],
    analogy: 'Скрам-команда',
  },
  tribe: {
    name: 'Tribe (Племя)',
    icon: '🏕️',
    color: '#f59e0b',
    size: '40-150 человек',
    desc: 'Группа Squad-ов, работающих в одной области. Есть Tribe Lead. Число Данбара ≤ 150 — больше нельзя.',
    members: ['Squad 1', 'Squad 2', 'Squad 3', '...', 'Tribe Lead'],
    analogy: 'Департамент / Direction',
  },
  chapter: {
    name: 'Chapter (Чаптер)',
    icon: '📖',
    color: '#6366f1',
    size: '5-15 человек',
    desc: 'Люди с одной специализацией из разных Squad-ов одного Tribe. Chapter Lead — функциональный менеджер.',
    members: ['Frontend из Squad 1', 'Frontend из Squad 2', 'Frontend из Squad 3'],
    analogy: 'Функциональная линейка',
  },
  guild: {
    name: 'Guild (Гильдия)',
    icon: '🏛️',
    color: '#a855f7',
    size: '10-50+ человек',
    desc: 'Добровольное сообщество по интересам. Через все Tribe-ы. Нет формального лидера.',
    members: ['Любой из любого Tribe', 'Кто хочет — тот участвует'],
    analogy: 'Community of Practice',
  },
}

const copBenefits = [
  { icon: '📚', title: 'Обмен знаниями', desc: 'Решения одной команды доступны всем' },
  { icon: '🎯', title: 'Стандарты', desc: 'Общие практики и code style' },
  { icon: '🔧', title: 'Общие инструменты', desc: 'Библиотеки, шаблоны, линтеры' },
  { icon: '🤝', title: 'Нетворкинг', desc: 'Люди знают кого спросить' },
  { icon: '📈', title: 'Рост', desc: 'Менторство и развитие' },
  { icon: '🎉', title: 'Мотивация', desc: 'Чувство причастности к большему' },
]

const guildExamples = [
  {
    name: 'Frontend Guild',
    icon: '⚛️',
    activities: [
      'Еженедельный митинг (30 мин): что нового в мире фронтенда',
      'Ревью общих UI-компонентов',
      'Выбор общего стека и инструментов',
      'Lightning talks: каждый показывает что узнал',
    ],
  },
  {
    name: 'Testing Guild',
    icon: '🧪',
    activities: [
      'Обмен подходами к тестированию',
      'Создание тестовых утилит',
      'Обсуждение: что Test-driven, что не надо',
      'Шаблоны для разных типов тестов',
    ],
  },
  {
    name: 'Architecture Guild',
    icon: '🏗️',
    activities: [
      'ADR (Architecture Decision Records)',
      'Обсуждение кросс-командных интеграций',
      'Tech Radar обновление',
      'Proof of concept для новых технологий',
    ],
  },
]

const howToStart = [
  { step: 1, title: 'Найди энтузиастов', desc: 'Нужно 3-5 человек, которым тема интересна. Не насаждайте сверху.', icon: '🔥' },
  { step: 2, title: 'Определи формат', desc: 'Еженедельно/раз в 2 недели. 30-60 минут. Онлайн или офлайн.', icon: '📅' },
  { step: 3, title: 'Создай канал', desc: 'Slack-канал или Teams-группа для общения между встречами.', icon: '💬' },
  { step: 4, title: 'Первые 3 встречи', desc: 'Определите цели, формат, частоту. Первые темы — самые горящие вопросы.', icon: '🎯' },
  { step: 5, title: 'Ведите артефакты', desc: 'Confluence/Notion: решения, гайдлайны, ADR. Без артефактов — это просто болтовня.', icon: '📋' },
  { step: 6, title: 'Регулярно ревьюте', desc: 'Раз в квартал: приносит ли гильдия пользу? Нужно ли менять формат?', icon: '🔄' },
]

export default function GuildsCommunities() {
  const [activeUnit, setActiveUnit] = useState<keyof typeof spotifyModel>('squad')
  const [activeGuild, setActiveGuild] = useState(0)

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🏛️ Гильдии и Communities of Practice</h1>
        <p>Spotify-модель организации и как строить сообщества практик в IT-компании.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          В 2012 году Spotify описали свою организационную модель: <strong>Squad</strong> (кросс-функциональная команда),
          <strong>Tribe</strong> (группа команд с общей миссией), <strong>Chapter</strong> (специалисты одного профиля внутри Tribe)
          и <strong>Guild</strong> (сообщество по интересам поперёк всей компании).
          Эта модель решает проблему <strong>изоляции команд</strong>.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Без кросс-командных структур команды «изобретают велосипед» параллельно, стандарты
          расходятся, а знания остаются в «силосах». <strong>Communities of Practice</strong> (концепция Этьенна Венгера) —
          это группы людей, которых объединяет общая практика и желание учиться друг у друга.
        </p>
        <div className="info-box">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <div className="info-box-title">Spotify-модель ≠ серебряная пуля</div>
            Сам автор модели Хенрик Книберг предупреждал: это снимок одного момента в одной компании.
            Не копируйте слепо — адаптируйте принципы к своему контексту.
          </div>
        </div>
      </div>

      {/* Spotify Model */}
      <div className="card">
        <h3>🎵 Spotify Model</h3>
        <p style={{ marginBottom: 16 }}>Модель организации, придуманная в Spotify. Используется как шаблон во многих компаниях.</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {Object.entries(spotifyModel).map(([key, unit]) => (
            <button
              key={key}
              className={`btn ${activeUnit === key ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveUnit(key as keyof typeof spotifyModel)}
            >
              {unit.icon} {unit.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {(() => {
          const unit = spotifyModel[activeUnit]
          return (
            <div style={{ borderLeft: `4px solid ${unit.color}`, paddingLeft: 20 }}>
              <h4 style={{ color: unit.color, marginBottom: 8 }}>{unit.icon} {unit.name}</h4>
              <p style={{ marginBottom: 12 }}>{unit.desc}</p>

              <div className="grid-2" style={{ marginTop: 12 }}>
                <div>
                  <span className="tag" style={{ background: `${unit.color}20`, color: unit.color }}>
                    👥 Размер: {unit.size}
                  </span>
                  <div style={{ marginTop: 12 }}>
                    <strong style={{ fontSize: '0.85rem' }}>Состав:</strong>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                      {unit.members.map((m, i) => (
                        <span key={i} className="tag blue">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="info-box" style={{ borderColor: unit.color }}>
                    <div className="info-box-content">
                      <div className="info-box-title">Аналогия</div>
                      ≈ {unit.analogy}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })()}

        {/* Visual structure */}
        <div style={{
          marginTop: 24,
          padding: 20,
          background: 'var(--bg-code)',
          borderRadius: 12,
          fontFamily: 'monospace',
          fontSize: '0.8rem',
          lineHeight: 2,
          overflowX: 'auto',
        }}>
          <div style={{ color: 'var(--accent-orange)' }}>🏕️ Tribe (Payments)</div>
          <div style={{ paddingLeft: 24 }}>
            <div style={{ color: 'var(--accent-green)' }}>🏃 Squad: Checkout ── FE, BE, QA, PM</div>
            <div style={{ color: 'var(--accent-green)' }}>🏃 Squad: Billing  ── FE, BE, QA, PM</div>
            <div style={{ color: 'var(--accent-green)' }}>🏃 Squad: Fraud    ── BE, ML, QA, PM</div>
          </div>
          <div style={{ paddingLeft: 24, color: 'var(--accent-main)', marginTop: 8 }}>
            📖 Chapter: Frontend ── FE из Checkout + FE из Billing
          </div>
          <div style={{ paddingLeft: 24, color: 'var(--accent-purple)', marginTop: 4 }}>
            🏛️ Guild: Testing ── QA из всех Tribe-ов (добровольно)
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="card">
        <h3>✨ Зачем нужны гильдии / CoP</h3>
        <div className="grid-3">
          {copBenefits.map(b => (
            <div key={b.title} className="scenario-card" style={{ marginBottom: 0 }}>
              <span style={{ fontSize: '1.5rem' }}>{b.icon}</span>
              <h4 style={{ marginTop: 4 }}>{b.title}</h4>
              <p style={{ fontSize: '0.85rem' }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Guild Examples */}
      <div className="card">
        <h3>📋 Примеры гильдий</h3>
        <div className="tabs">
          {guildExamples.map((g, i) => (
            <button key={g.name} className={`tab ${activeGuild === i ? 'active' : ''}`} onClick={() => setActiveGuild(i)}>
              {g.icon} {g.name}
            </button>
          ))}
        </div>

        <ul>
          {guildExamples[activeGuild].activities.map((a, i) => (
            <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* How to start */}
      <div className="card">
        <h3>🚀 Как запустить гильдию</h3>
        <div className="timeline">
          {howToStart.map(s => (
            <div key={s.step} className="timeline-item">
              <div className="timeline-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                  <span className="tag blue">{s.step}</span>
                  <strong>{s.title}</strong>
                </div>
                <p style={{ marginTop: 6, fontSize: '0.9rem' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning */}
      <div className="info-box warning">
        <div className="info-box-icon">⚠️</div>
        <div className="info-box-content">
          <div className="info-box-title">Важно: Spotify Model — не серебряная пуля</div>
          Даже сам Spotify признал, что модель работает не идеально. Не копируйте слепо — адаптируйте под свой контекст.
          Ключевой принцип: <strong>автономия + alignment</strong>.
        </div>
      </div>
    </div>
  )
}
