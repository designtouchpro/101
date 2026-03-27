import { useState } from 'react'

interface NSMExample {
  company: string
  nsm: string
  why: string
  inputs: string[]
}

const examples: NSMExample[] = [
  { company: 'Spotify', nsm: 'Time spent listening', why: 'Отражает вовлечённость и ценность для пользователя', inputs: ['Кол-во плейлистов', 'Рекомендации', 'Новые релизы'] },
  { company: 'Airbnb', nsm: 'Nights booked', why: 'Прямо связана с доходом и ценностью для обеих сторон', inputs: ['Кол-во объявлений', 'Конверсия поиска', 'Средний чек'] },
  { company: 'Slack', nsm: 'Messages sent', why: 'Чем больше сообщений — тем глубже интеграция в рабочий процесс', inputs: ['Кол-во каналов', 'Интеграции', 'Активные пользователи'] },
  { company: 'Facebook', nsm: 'DAU', why: 'Ежедневная активность = привычка = рекламный инвентарь', inputs: ['Контент', 'Уведомления', 'Связи друзей'] },
  { company: 'Netflix', nsm: 'Median view hours', why: 'Время просмотра = удовлетворённость контентом', inputs: ['Каталог', 'Рекомендации', 'Качество потока'] },
  { company: 'Uber', nsm: 'Rides per week', why: 'Частота поездок = замена личного транспорта', inputs: ['Время подачи', 'Цена', 'Покрытие'] },
]

const criteria = [
  { icon: '📏', name: 'Измеримость', desc: 'Метрику можно посчитать однозначно' },
  { icon: '🎯', name: 'Отражает ценность', desc: 'Рост метрики = больше ценности для пользователя' },
  { icon: '📈', name: 'Ведёт к росту', desc: 'Улучшение NSM ведёт к росту бизнеса' },
  { icon: '🔧', name: 'Actionable (применимая)', desc: 'Команды могут влиять на эту метрику' },
  { icon: '🌳', name: 'Декомпозируется', desc: 'Можно разбить на input-метрики' },
]

export default function NorthStar() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [userNsm, setUserNsm] = useState('')
  const [userInputs, setUserInputs] = useState<string[]>(['', '', ''])
  const [checklist, setChecklist] = useState<boolean[]>(criteria.map(() => false))

  const selected = examples.find(e => e.company === selectedCompany)

  const toggleCheck = (i: number) => {
    setChecklist(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>⭐ North Star Metric</h1>
        <p>Одна метрика, отражающая ключевую ценность продукта для пользователей.</p>
      </div>

      {/* What is it */}
      <div className="card">
        <h3>Что такое North Star Metric?</h3>
        <p>
          <strong>NSM</strong> — это единая метрика, рост которой означает, что вы доставляете больше ценности
          пользователям. Она объединяет продуктовую и бизнес-стратегию в одну цифру.
        </p>
        <div className="info-box" style={{ marginTop: 12 }}>
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <div className="info-box-title">NSM ≠ Revenue</div>
            Выручка — это следствие. NSM — это <strong>причина</strong>. Если пользователи получают ценность (NSM растёт),
            деньги придут.
          </div>
        </div>
      </div>

      {/* Criteria */}
      <div className="card">
        <h3>✅ Критерии хорошей NSM</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
          {criteria.map(c => (
            <div key={c.name} className="scenario-card" style={{ flex: '1 1 200px', marginBottom: 0 }}>
              <h4>{c.icon} {c.name}</h4>
              <p style={{ marginBottom: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Examples */}
      <div className="card">
        <h3>🏢 Примеры из реальных компаний</h3>
        <p style={{ marginBottom: 16 }}>Кликните на компанию, чтобы увидеть NSM и input-метрики.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {examples.map(e => (
            <button
              key={e.company}
              className={`btn btn-sm ${selectedCompany === e.company ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCompany(selectedCompany === e.company ? null : e.company)}
            >
              {e.company}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: 'var(--bg-code)', borderRadius: 12, padding: 20 }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selected.company}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-main)', margin: '8px 0' }}>
                {selected.nsm}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{selected.why}</div>
            </div>

            <h4 style={{ marginBottom: 8 }}>Input-метрики (рычаги влияния):</h4>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {selected.inputs.map(inp => (
                <span key={inp} className="tag emerald">{inp}</span>
              ))}
            </div>

            <div style={{ marginTop: 12, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              ↑ Каждый input → ↑ NSM → ↑ Revenue
            </div>
          </div>
        )}
      </div>

      {/* Build Your Own */}
      <div className="card">
        <h3>🛠 Определи свою NSM</h3>
        <p style={{ marginBottom: 16 }}>Попробуйте сформулировать North Star Metric для вашего продукта.</p>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
            Ваша NSM:
          </label>
          <input
            className="input"
            placeholder="Пр.: Активные проекты в неделю, Отправленные сообщения в день..."
            value={userNsm}
            onChange={e => setUserNsm(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
            Input-метрики (3 рычага):
          </label>
          {userInputs.map((inp, i) => (
            <input
              key={i}
              className="input"
              placeholder={`Input ${i + 1}: что влияет на NSM?`}
              value={inp}
              onChange={e => setUserInputs(prev => prev.map((v, idx) => idx === i ? e.target.value : v))}
              style={{ marginBottom: 8 }}
            />
          ))}
        </div>

        <h4 style={{ marginBottom: 8 }}>Чеклист качества:</h4>
        {criteria.map((c, i) => (
          <label
            key={c.name}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
              borderRadius: 8, cursor: 'pointer', marginBottom: 4,
              background: checklist[i] ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
            }}
          >
            <input type="checkbox" checked={checklist[i]} onChange={() => toggleCheck(i)} />
            <span>{c.icon} {c.name}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>— {c.desc}</span>
          </label>
        ))}

        {checklist.filter(Boolean).length === criteria.length && userNsm && (
          <div className="info-box success" style={{ marginTop: 16 }}>
            <div className="info-box-content">
              <div className="info-box-title">🎉 Отличная NSM!</div>
              Ваша метрика «{userNsm}» проходит все критерии качества.
            </div>
          </div>
        )}
      </div>

      {/* Материалы */}
      <div className="card">
        <h3>📚 Материалы для изучения</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="https://gopractice.ru/north-star-metric/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 North Star Metric — GoPractice
          </a>
        </div>
      </div>
    </div>
  )
}
