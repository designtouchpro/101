import { useState } from 'react'

const techniques = [
  {
    id: 'planning-poker',
    name: 'Planning Poker (покер планирования)',
    icon: '🃏',
    desc: 'Каждый показывает карту с оценкой одновременно. Обсуждаем расхождения.',
    scale: ['0', '½', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', '☕'],
    pros: ['Учитывает мнение каждого', 'Выявляет неочевидные риски', 'Анкоринг минимизирован (одновременное голосование)'],
    cons: ['Долго для большого бэклога', 'Нужна практика'],
    bestFor: 'Спринт-планирование, оценка user stories (пользовательских историй)',
  },
  {
    id: 'tshirt',
    name: 'T-shirt sizing (оценка «размерами»)',
    icon: '👕',
    scale: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    desc: 'Грубая оценка размерами футболок. Быстро и понятно.',
    pros: ['Очень быстро', 'Понятно нетехническим людям', 'Хорошо для грубой приоритизации'],
    cons: ['Неточно', 'Нельзя считать velocity', 'Размеры субъективны'],
    bestFor: 'Роадмап-планирование, оценка эпиков',
  },
  {
    id: 'bucket',
    name: 'Bucket System (система корзин)',
    icon: '🪣',
    scale: ['1', '2', '3', '5', '8', '13'],
    desc: 'Раскладываем задачи по «корзинам» (бакетам) по размеру. Быстро.',
    pros: ['Можно оценить 50+ задач за час', 'Относительная оценка', 'Работает для больших бэклогов'],
    cons: ['Менее точно чем poker', 'Нет глубокого обсуждения'],
    bestFor: 'Первичная оценка большого бэклога',
  },
  {
    id: 'no-estimates',
    name: '#NoEstimates (без оценок)',
    icon: '🚫',
    scale: ['Задача', 'Задача', 'Задача'],
    desc: 'Не оцениваем вообще. Считаем throughput (пропускную способность) — сколько задач в неделю.',
    pros: ['Нет споров об оценках', 'Фокус на потоке', 'Мотивирует декомпозировать мелко'],
    cons: ['Нужны одинаково маленькие задачи', 'Не подходит для фиксированных дедлайнов', 'Сложно продать бизнесу'],
    bestFor: 'Зрелые команды с хорошей декомпозицией',
  },
]

interface PokerTask {
  name: string
  descriptions: string
}

const pokerTasks: PokerTask[] = [
  { name: 'Добавить кнопку «Избранное»', descriptions: 'Иконка сердечка на карточке товара. При клике сохраняет в localStorage.' },
  { name: 'Интеграция с платёжным шлюзом', descriptions: 'Подключить Stripe. Обработка платежей, webhook для статусов, обработка ошибок.' },
  { name: 'Рефакторинг API auth', descriptions: 'Перейти с JWT в cookies на httpOnly. Обновить все эндпоинты, тесты.' },
  { name: 'Фикс бага: дубли заказов', descriptions: 'Иногда при двойном клике создаётся два заказа. Добавить idempotency key (ключ идемпотентности).' },
  { name: 'Страница 404', descriptions: 'Создать красивую страницу 404 с навигацией обратно.' },
]

const pokerCards = ['1', '2', '3', '5', '8', '13', '21']

export default function EstimationTechniques() {
  const [activeTechnique, setActiveTechnique] = useState(0)
  const [currentTaskIdx, setCurrentTaskIdx] = useState(0)
  const [myVotes, setMyVotes] = useState<Record<number, string>>({})
  const [teamVotes, setTeamVotes] = useState<Record<number, string[]>>({})
  const [revealed, setRevealed] = useState<Record<number, boolean>>({})

  const currentTask = pokerTasks[currentTaskIdx]

  const vote = (card: string) => {
    setMyVotes(prev => ({ ...prev, [currentTaskIdx]: card }))
    // Generate team votes
    const baseValue = parseInt(card) || 3
    const team = ['Алиса', 'Борис', 'Глеб'].map(name => {
      const offset = Math.floor(Math.random() * 3) - 1
      const idx = Math.max(0, Math.min(pokerCards.length - 1, pokerCards.indexOf(card) + offset))
      return pokerCards[idx]
    })
    setTeamVotes(prev => ({ ...prev, [currentTaskIdx]: team }))
  }

  const reveal = () => {
    setRevealed(prev => ({ ...prev, [currentTaskIdx]: true }))
  }

  const nextTask = () => {
    if (currentTaskIdx < pokerTasks.length - 1) {
      setCurrentTaskIdx(prev => prev + 1)
    }
  }

  const resetGame = () => {
    setCurrentTaskIdx(0)
    setMyVotes({})
    setTeamVotes({})
    setRevealed({})
  }

  const getConsensus = (taskIdx: number) => {
    if (!myVotes[taskIdx] || !teamVotes[taskIdx]) return null
    const all = [myVotes[taskIdx], ...teamVotes[taskIdx]].map(Number).filter(n => !isNaN(n))
    if (all.length === 0) return null
    const max = Math.max(...all)
    const min = Math.min(...all)
    return { spread: max - min, avg: (all.reduce((a, b) => a + b, 0) / all.length).toFixed(1), max, min }
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🃏 Оценка задач</h1>
        <p>Как оценивать задачи: Planning Poker, T-shirt sizing, #NoEstimates и другие методы.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Оценка задач — одна из самых <strong>спорных практик</strong> в разработке. Движение #NoEstimates
          утверждает, что оценки чаще вредят, чем помогают. Но реальность такова: бизнесу нужны сроки,
          а <strong>когнитивные искажения</strong> (эффект якорения, оптимизм, эффект планирования) делают
          индивидуальные оценки ненадёжными.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Групповые методы (Planning Poker, Wall Estimation — настенная оценка) снижают эффект искажений через
          <strong>коллективный разум</strong>. Относительные оценки (стори-пойнты, story points — баллы сложности) точнее абсолютных (часов),
          потому что люди лучше сравнивают, чем предсказывают абсолютные величины.
        </p>
        <div className="info-box">
          <div className="info-box-icon">🧠</div>
          <div className="info-box-content">
            <div className="info-box-title">Когда оценка добавляет ценность?</div>
            Когда помогает принять решение: «Укладываемся в спринт?», «Можно обещать срок клиенту?».
            Если оценка никак не влияет на действия — это пустая трата времени.
          </div>
        </div>
      </div>

      {/* Techniques overview */}
      <div className="card">
        <h3>Методы оценки</h3>
        <div className="tabs">
          {techniques.map((t, i) => (
            <button key={t.id} className={`tab ${activeTechnique === i ? 'active' : ''}`} onClick={() => setActiveTechnique(i)}>
              {t.icon} {t.name}
            </button>
          ))}
        </div>

        {(() => {
          const t = techniques[activeTechnique]
          return (
            <>
              <p style={{ marginBottom: 16 }}>{t.desc}</p>

              <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                {t.scale.map((s, i) => (
                  <div key={i} style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    background: 'rgba(99,102,241,0.1)',
                    border: '1px solid var(--accent-main)',
                    fontWeight: 700,
                    color: 'var(--accent-main)',
                    minWidth: 40,
                    textAlign: 'center',
                  }}>
                    {s}
                  </div>
                ))}
              </div>

              <div className="grid-2">
                <div className="info-box success">
                  <div className="info-box-content">
                    <div className="info-box-title">✅ Плюсы</div>
                    <ul className="info-list">
                      {t.pros.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="info-box warning">
                  <div className="info-box-content">
                    <div className="info-box-title">⚠️ Минусы</div>
                    <ul className="info-list">
                      {t.cons.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="tag blue" style={{ marginTop: 12 }}>
                🎯 Лучше всего для: {t.bestFor}
              </div>
            </>
          )
        })()}
      </div>

      {/* Planning Poker Simulator */}
      <div className="card">
        <h3>🎮 Симулятор Planning Poker</h3>
        <p style={{ marginBottom: 16 }}>Оцените задачу, потом посмотрите, что «проголосовала» команда.</p>

        {/* Progress */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
          {pokerTasks.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i < currentTaskIdx ? 'var(--accent-green)' : i === currentTaskIdx ? 'var(--accent-main)' : 'var(--border-color)',
            }} />
          ))}
        </div>

        {/* Current task */}
        <div className="info-box" style={{ marginBottom: 16 }}>
          <div className="info-box-icon">📋</div>
          <div className="info-box-content">
            <div className="info-box-title">Задача {currentTaskIdx + 1}: {currentTask.name}</div>
            {currentTask.descriptions}
          </div>
        </div>

        {/* Cards */}
        {!revealed[currentTaskIdx] && (
          <>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Ваша оценка (story points — баллы сложности):</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {pokerCards.map(card => (
                <div
                  key={card}
                  onClick={() => vote(card)}
                  style={{
                    width: 56, height: 78,
                    borderRadius: 8,
                    border: `2px solid ${myVotes[currentTaskIdx] === card ? 'var(--accent-main)' : 'var(--border-color)'}`,
                    background: myVotes[currentTaskIdx] === card ? 'rgba(99,102,241,0.15)' : 'var(--bg-code)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.3rem', fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    color: myVotes[currentTaskIdx] === card ? 'var(--accent-main)' : 'var(--text-primary)',
                    transform: myVotes[currentTaskIdx] === card ? 'translateY(-8px)' : 'none',
                  }}
                >
                  {card}
                </div>
              ))}
            </div>
          </>
        )}

        {myVotes[currentTaskIdx] && !revealed[currentTaskIdx] && (
          <button className="btn btn-primary" onClick={reveal}>
            👀 Показать карты команды
          </button>
        )}

        {/* Results */}
        {revealed[currentTaskIdx] && (
          <div>
            <h4 style={{ marginBottom: 12 }}>Результаты голосования:</h4>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 16 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 56, height: 78, borderRadius: 8,
                  background: 'rgba(99,102,241,0.15)',
                  border: '2px solid var(--accent-main)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent-main)',
                }}>
                  {myVotes[currentTaskIdx]}
                </div>
                <div style={{ fontSize: '0.75rem', marginTop: 4, color: 'var(--text-secondary)' }}>Вы</div>
              </div>
              {teamVotes[currentTaskIdx]?.map((v, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 56, height: 78, borderRadius: 8,
                    background: v === myVotes[currentTaskIdx] ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.15)',
                    border: `2px solid ${v === myVotes[currentTaskIdx] ? 'var(--accent-green)' : 'var(--accent-orange)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.3rem', fontWeight: 700,
                    color: v === myVotes[currentTaskIdx] ? 'var(--accent-green)' : 'var(--accent-orange)',
                  }}>
                    {v}
                  </div>
                  <div style={{ fontSize: '0.75rem', marginTop: 4, color: 'var(--text-secondary)' }}>
                    {['Алиса', 'Борис', 'Глеб'][i]}
                  </div>
                </div>
              ))}
            </div>

            {(() => {
              const c = getConsensus(currentTaskIdx)
              if (!c) return null
              return (
                <div className={`info-box ${c.spread <= 2 ? 'success' : 'warning'}`}>
                  <div className="info-box-icon">{c.spread <= 2 ? '✅' : '🤔'}</div>
                  <div className="info-box-content">
                    <div className="info-box-title">
                      {c.spread <= 2 ? 'Консенсус!' : 'Большое расхождение — нужно обсудить!'}
                    </div>
                    Среднее: {c.avg} SP | Разброс: {c.min} — {c.max}
                    {c.spread > 2 && (
                      <p style={{ marginTop: 4, fontSize: '0.85rem' }}>
                        💡 Когда оценки сильно отличаются, тот кто поставил мин и макс объясняют почему. Потом голосуют заново.
                      </p>
                    )}
                  </div>
                </div>
              )
            })()}

            <div className="controls" style={{ marginTop: 12 }}>
              {currentTaskIdx < pokerTasks.length - 1 ? (
                <button className="btn btn-primary" onClick={nextTask}>Следующая задача →</button>
              ) : (
                <div className="score-display" style={{ flex: 1 }}>
                  <div className="score-number">✅</div>
                  <div className="score-label">Все задачи оценены!</div>
                </div>
              )}
              <button className="btn btn-secondary" onClick={resetGame}>Начать заново</button>
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="card">
        <h3>💡 Правила хорошей оценки</h3>
        <div className="grid-2">
          <div>
            <h4 style={{ color: 'var(--accent-green)', marginBottom: 8 }}>✅ Делайте</h4>
            <ul>
              <li>Оценивайте <strong>сложность</strong>, не время</li>
              <li>Голосуйте <strong>одновременно</strong> (анти-анкоринг)</li>
              <li>Обсуждайте <strong>расхождения</strong></li>
              <li>Используйте <strong>относительную</strong> оценку</li>
              <li>Пересматривайте после ретро</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--accent-red)', marginBottom: 8 }}>❌ Не делайте</h4>
            <ul>
              <li>Не позволяйте лиду <strong>голосовать первым</strong> (эффект якоря)</li>
              <li>Не переводите story points в <strong>часы</strong></li>
              <li>Не наказывайте за <strong>неточные</strong> оценки</li>
              <li>Не используйте velocity (скорость команды) для <strong>сравнения</strong> команд</li>
              <li>Не тратьте час на <strong>один тикет</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
