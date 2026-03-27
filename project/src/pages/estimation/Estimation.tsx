import { useState } from 'react'

type Technique = 'story-points' | 'tshirt' | 'poker' | 'three-point'

export default function Estimation() {
  const [technique, setTechnique] = useState<Technique>('story-points')

  // Planning Poker
  const pokerCards = [1, 2, 3, 5, 8, 13, 21]
  const [pokerVotes, setPokerVotes] = useState<number[]>([])
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [showPokerResult, setShowPokerResult] = useState(false)

  const submitPokerVote = () => {
    if (selectedCard === null) return
    const teamVotes = [selectedCard, ...Array.from({ length: 4 }, () => pokerCards[Math.floor(Math.random() * pokerCards.length)])]
    setPokerVotes(teamVotes)
    setShowPokerResult(true)
  }

  const resetPoker = () => {
    setSelectedCard(null)
    setPokerVotes([])
    setShowPokerResult(false)
  }

  // Three-point estimation
  const [optimistic, setOptimistic] = useState(3)
  const [mostLikely, setMostLikely] = useState(5)
  const [pessimistic, setPessimistic] = useState(12)
  const pert = (optimistic + 4 * mostLikely + pessimistic) / 6
  const stdDev = (pessimistic - optimistic) / 6

  // T-Shirt mapping
  const [tshirtTask, setTshirtTask] = useState('')
  const [tshirtSize, setTshirtSize] = useState<string | null>(null)

  const tshirtSizes = [
    { label: 'XS', sp: '1', time: '< 2 часа', color: '#22c55e', desc: 'Тривиальная задача, всё понятно' },
    { label: 'S', sp: '2-3', time: '2-4 часа', color: '#3b82f6', desc: 'Простая, минимум неопределённости' },
    { label: 'M', sp: '5', time: '1-2 дня', color: '#f59e0b', desc: 'Средняя сложность, привычная работа' },
    { label: 'L', sp: '8', time: '3-5 дней', color: '#ef4444', desc: 'Сложная, есть неопределённость' },
    { label: 'XL', sp: '13', time: '1-2 недели', color: '#a855f7', desc: 'Очень сложная, нужна декомпозиция' },
  ]

  const techniques: { key: Technique; emoji: string; label: string }[] = [
    { key: 'story-points', emoji: '📐', label: 'Story Points' },
    { key: 'tshirt', emoji: '👕', label: 'T-Shirt Sizing' },
    { key: 'poker', emoji: '🃏', label: 'Planning Poker' },
    { key: 'three-point', emoji: '📊', label: 'PERT (3-point)' },
  ]

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🃏 Техники оценки</h1>
        <p>Story Points, T-Shirt, Planning Poker и трёхточечная оценка.</p>
      </div>

      <div className="card">
        <div className="tabs">
          {techniques.map(t => (
            <button key={t.key} className={`tab ${technique === t.key ? 'active' : ''}`} onClick={() => setTechnique(t.key)}>
              {t.emoji} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Story Points */}
      {technique === 'story-points' && (
        <>
          <div className="card">
            <h3>📐 Что такое Story Points?</h3>
            <p>
              Story Points — <strong>относительная</strong> мера сложности задачи. Они оценивают не время,
              а <strong>объём работы + сложность + неопределённость</strong>.
            </p>
            <div className="info-box" style={{ marginTop: 12 }}>
              <div className="info-box-icon">💡</div>
              <div className="info-box-content">
                <div className="info-box-title">Почему не часы?</div>
                Часы субъективны: джун сделает за 8 часов, сеньор — за 2. Story Points показывают
                сложность задачи <strong>безотносительно исполнителя</strong>.
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Шкала Фибоначчи</h3>
            <p style={{ marginBottom: 16 }}>Используют числа Фибоначчи, потому что разница между соседними значениями растёт — это отражает рост неопределённости:</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { sp: 1, ex: 'Исправить опечатку в UI' },
                { sp: 2, ex: 'Добавить поле в форму' },
                { sp: 3, ex: 'Новый API-эндпоинт (простой)' },
                { sp: 5, ex: 'Страница с фильтрами' },
                { sp: 8, ex: 'Интеграция с платёжной системой' },
                { sp: 13, ex: 'Система уведомлений' },
                { sp: 21, ex: 'Рефакторинг модуля авторизации' },
              ].map(item => (
                <div key={item.sp} style={{
                  flex: '1 1 calc(25% - 8px)', minWidth: 140,
                  padding: 12, borderRadius: 8, background: 'var(--bg-code)',
                  border: '1px solid var(--border-color)', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-main)' }}>{item.sp}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>{item.ex}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* T-Shirt Sizing */}
      {technique === 'tshirt' && (
        <div className="card">
          <h3>👕 T-Shirt Sizing</h3>
          <p style={{ marginBottom: 16 }}>
            Быстрый способ оценки: XS, S, M, L, XL. Хорош для первичной оценки бэклога или story mapping (карта пользовательских историй).
          </p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {tshirtSizes.map(s => (
              <div
                key={s.label}
                onClick={() => setTshirtSize(s.label)}
                style={{
                  flex: 1, minWidth: 100, padding: 16, borderRadius: 10, textAlign: 'center',
                  border: `2px solid ${tshirtSize === s.label ? s.color : 'var(--border-color)'}`,
                  background: tshirtSize === s.label ? `${s.color}15` : 'var(--bg-code)',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: s.color }}>{s.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.sp} SP</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.time}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: 6 }}>{s.desc}</div>
              </div>
            ))}
          </div>

          <h4>Попробуйте оценить:</h4>
          <input
            placeholder="Введите задачу (напр. 'Добавить корзину в интернет-магазин')"
            value={tshirtTask}
            onChange={e => setTshirtTask(e.target.value)}
            className="input"
            style={{ marginTop: 8 }}
          />
          {tshirtTask && tshirtSize && (
            <div className="info-box" style={{ marginTop: 12 }}>
              <div className="info-box-content">
                «{tshirtTask}» → <strong>{tshirtSize}</strong> ({tshirtSizes.find(s => s.label === tshirtSize)?.sp} SP, ~{tshirtSizes.find(s => s.label === tshirtSize)?.time})
              </div>
            </div>
          )}
        </div>
      )}

      {/* Planning Poker */}
      {technique === 'poker' && (
        <div className="card">
          <h3>🃏 Planning Poker</h3>
          <p style={{ marginBottom: 16 }}>
            Команда одновременно показывает карты с оценкой. Если оценки сильно расходятся — обсуждают.
            Это предотвращает <strong>anchoring bias</strong> (эффект привязки — когда первый голос влияет на остальных).
          </p>

          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>
              Задача: «Реализовать поиск товаров с автодополнением»
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
              Выберите вашу карту (вы — один из 5 участников):
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {pokerCards.map(card => (
              <button
                key={card}
                onClick={() => !showPokerResult && setSelectedCard(card)}
                disabled={showPokerResult}
                style={{
                  width: 56, height: 76, borderRadius: 8, fontSize: '1.2rem', fontWeight: 700,
                  border: selectedCard === card ? '2px solid var(--accent-main)' : '2px solid var(--border-color)',
                  background: selectedCard === card ? 'rgba(59,130,246,0.15)' : 'var(--bg-code)',
                  color: selectedCard === card ? 'var(--accent-main)' : 'var(--text-primary)',
                  cursor: showPokerResult ? 'default' : 'pointer', transition: 'all 0.2s',
                }}
              >
                {card}
              </button>
            ))}
          </div>

          {!showPokerResult && (
            <button className="btn btn-primary" onClick={submitPokerVote} disabled={selectedCard === null}>
              Показать карты
            </button>
          )}

          {showPokerResult && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ marginBottom: 12 }}>Результаты голосования:</h4>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
                {['Вы', 'Алексей', 'Мария', 'Дмитрий', 'Анна'].map((name, i) => (
                  <div key={name} style={{
                    padding: '10px 16px', borderRadius: 8, background: 'var(--bg-code)',
                    border: '1px solid var(--border-color)', textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>{name}</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent-main)' }}>{pokerVotes[i]}</div>
                  </div>
                ))}
              </div>

              {(() => {
                const min = Math.min(...pokerVotes)
                const max = Math.max(...pokerVotes)
                const spread = max - min
                const avg = pokerVotes.reduce((a, b) => a + b, 0) / pokerVotes.length
                return (
                  <>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
                      <span className="tag blue">Мин: {min}</span>
                      <span className="tag blue">Макс: {max}</span>
                      <span className="tag blue">Среднее: {avg.toFixed(1)}</span>
                      <span className={`tag ${spread > 5 ? 'red' : spread > 2 ? 'orange' : 'green'}`}>
                        Разброс: {spread} {spread > 5 ? '— нужно обсуждение!' : spread > 2 ? '— стоит обсудить' : '— консенсус'}
                      </span>
                    </div>
                    {spread > 5 && (
                      <div className="info-box warning">
                        <div className="info-box-icon">⚠️</div>
                        <div className="info-box-content">
                          <div className="info-box-title">Большой разброс!</div>
                          Когда разница {'>'} 5 SP, команда обсуждает: крайние оценки объясняют своё видение. Потом голосуют повторно.
                        </div>
                      </div>
                    )}
                  </>
                )
              })()}
              <button className="btn btn-secondary" onClick={resetPoker}>Новое голосование</button>
            </div>
          )}
        </div>
      )}

      {/* Three-Point Estimation */}
      {technique === 'three-point' && (
        <div className="card">
          <h3>📊 PERT (трёхточечная оценка)</h3>
          <p style={{ marginBottom: 16 }}>
            Учитывает неопределённость: вы задаёте оптимистичную (O), наиболее вероятную (M) и пессимистичную (P) оценки.
          </p>

          <div className="info-box" style={{ marginBottom: 20 }}>
            <div className="info-box-icon">📐</div>
            <div className="info-box-content">
              <div className="info-box-title">Формула PERT</div>
              <strong>E = (O + 4M + P) / 6</strong> — взвешенное среднее. Стандартное отклонение: <strong>σ = (P − O) / 6</strong>
            </div>
          </div>

          <div className="grid-3">
            <div className="slider-container">
              <label>🟢 Оптимистичная (O): <strong>{optimistic} дн.</strong></label>
              <input type="range" min={1} max={20} value={optimistic} onChange={e => setOptimistic(+e.target.value)} />
            </div>
            <div className="slider-container">
              <label>🔵 Наиболее вероятная (M): <strong>{mostLikely} дн.</strong></label>
              <input type="range" min={1} max={30} value={mostLikely} onChange={e => setMostLikely(+e.target.value)} />
            </div>
            <div className="slider-container">
              <label>🔴 Пессимистичная (P): <strong>{pessimistic} дн.</strong></label>
              <input type="range" min={1} max={60} value={pessimistic} onChange={e => setPessimistic(+e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
            <div className="score-display" style={{ flex: 1, minWidth: 150 }}>
              <div className="score-number">{pert.toFixed(1)}</div>
              <div className="score-label">PERT-оценка (дни)</div>
            </div>
            <div className="score-display" style={{ flex: 1, minWidth: 150 }}>
              <div className="score-number">±{stdDev.toFixed(1)}</div>
              <div className="score-label">Стд. отклонение (σ)</div>
            </div>
            <div className="score-display" style={{ flex: 1, minWidth: 150 }}>
              <div className="score-number">{(pert - stdDev).toFixed(1)}–{(pert + stdDev).toFixed(1)}</div>
              <div className="score-label">68% диапазон</div>
            </div>
          </div>

          <div className="info-box" style={{ marginTop: 16 }}>
            <div className="info-box-content">
              С вероятностью <strong>68%</strong> задача займёт от {(pert - stdDev).toFixed(1)} до {(pert + stdDev).toFixed(1)} дней.
              С вероятностью <strong>95%</strong> — от {(pert - 2 * stdDev).toFixed(1)} до {(pert + 2 * stdDev).toFixed(1)} дней (±2σ).
            </div>
          </div>
        </div>
      )}

      {/* Материалы */}
      <div className="card">
        <h3>📚 Материалы для изучения</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="https://ru.wikipedia.org/wiki/Покер_планирования" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Planning Poker — Википедия
          </a>
        </div>
      </div>
    </div>
  )
}
