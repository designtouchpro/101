import { useState, useMemo } from 'react'

export default function ABTesting() {
  const [visitors, setVisitors] = useState(10000)
  const [splitPercent, setSplitPercent] = useState(50)
  const [baseConversion, setBaseConversion] = useState(5)
  const [uplift, setUplift] = useState(15)
  const [significance, setSignificance] = useState(95)

  const controlSize = Math.round(visitors * (1 - splitPercent / 100))
  const variantSize = visitors - controlSize
  const variantConversion = baseConversion * (1 + uplift / 100)
  const controlConverted = Math.round(controlSize * baseConversion / 100)
  const variantConverted = Math.round(variantSize * variantConversion / 100)

  // Simplified z-test approximation
  const p1 = baseConversion / 100
  const p2 = variantConversion / 100
  const pPool = (controlConverted + variantConverted) / visitors
  const se = Math.sqrt(pPool * (1 - pPool) * (1 / controlSize + 1 / variantSize))
  const zScore = se > 0 ? (p2 - p1) / se : 0
  const zThreshold = significance === 95 ? 1.96 : significance === 99 ? 2.576 : 1.645
  const isSignificant = Math.abs(zScore) >= zThreshold

  // Sample size estimation (simplified)
  const minSamplePerVariant = useMemo(() => {
    const z = zThreshold
    const mde = uplift / 100 * baseConversion / 100
    if (mde === 0) return Infinity
    const p = baseConversion / 100
    const n = Math.ceil(2 * Math.pow(z, 2) * p * (1 - p) / Math.pow(mde, 2))
    return n
  }, [baseConversion, uplift, zThreshold])

  const mistakes = [
    { title: 'Подглядывание (Peeking)', desc: 'Остановить тест, как только увидели p < 0.05. Нужно ждать заранее рассчитанный объём.', icon: '👀' },
    { title: 'Множественные сравнения', desc: 'Тестировать 10 вариантов и радоваться одному «победителю». Поправка Бонферрони!', icon: '🎰' },
    { title: 'Слишком маленькая выборка', desc: 'Нужно минимум ~1000 конверсий на вариант для надёжного результата.', icon: '🔬' },
    { title: 'Неслижнные сегменты', desc: 'Рандомизация должна быть по userId, а не по сессии. Иначе один юзер — в обоих вариантах.', icon: '🔀' },
    { title: 'Эффект новизны (Novelty Effect)', desc: 'Новый дизайн нравится, потому что он новый. Подождите 2-3 недели.', icon: '✨' },
    { title: 'Ошибка выжившего (Survivorship Bias)', desc: 'Анализируете только тех, кто дошёл до конца? А сколько отвалилось на первом шаге?', icon: '🏆' },
  ]

  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [showQuizResult, setShowQuizResult] = useState(false)
  const quiz = [
    { q: 'Показатель p-value = 0.03. Что это значит?', options: ['Вариант B лучше на 3%', '3% вероятность, что разница случайна', 'Конверсия выросла на 3%', 'Нужно ещё 3% данных'], correct: 1 },
    { q: 'Минимальный размер теста зависит от:', options: ['Только от трафика', 'Базовой конверсии и MDE (мин. обнаружимого эффекта)', 'Количества вариантов', 'Времени суток'], correct: 1 },
    { q: 'Что НЕ является антипаттерном?', options: ['Остановить тест досрочно', 'Рандомизация по userId', 'Тестировать 20 гипотез разом', 'Не учитывать novelty effect'], correct: 1 },
  ]

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🧪 A/B тестирование</h1>
        <p>Как правильно проверять гипотезы и не обманывать себя статистикой.</p>
      </div>

      {/* What is it */}
      <div className="card">
        <h3>Что такое A/B тест?</h3>
        <p>
          Показываем двум группам пользователей разные версии (A — контроль, B — вариант)
          и сравниваем результат. Цель — убедиться, что разница <strong>статистически значима</strong>,
          а не случайна.
        </p>
      </div>

      {/* Simulator */}
      <div className="card">
        <h3>🎛 Симулятор A/B теста</h3>

        <div className="grid-2">
          <div className="slider-container">
            <label>Трафик: <strong>{visitors.toLocaleString()}</strong> визитов</label>
            <input type="range" min={1000} max={100000} step={1000} value={visitors} onChange={e => setVisitors(+e.target.value)} />
          </div>
          <div className="slider-container">
            <label>Сплит: <strong>{100 - splitPercent}% / {splitPercent}%</strong></label>
            <input type="range" min={10} max={90} value={splitPercent} onChange={e => setSplitPercent(+e.target.value)} />
          </div>
          <div className="slider-container">
            <label>Базовая конверсия (Control): <strong>{baseConversion}%</strong></label>
            <input type="range" min={0.5} max={30} step={0.5} value={baseConversion} onChange={e => setBaseConversion(+e.target.value)} />
          </div>
          <div className="slider-container">
            <label>Ожидаемый прирост (uplift): <strong>+{uplift}%</strong> (B = {variantConversion.toFixed(1)}%)</label>
            <input type="range" min={1} max={100} value={uplift} onChange={e => setUplift(+e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Уровень значимости:</span>
          {[90, 95, 99].map(s => (
            <button key={s} className={`btn btn-sm ${significance === s ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSignificance(s)}>
              {s}%
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="grid-2">
          <div className="score-display" style={{ borderLeft: '3px solid var(--accent-blue)' }}>
            <div className="score-label">🅰️ Control</div>
            <div className="score-number" style={{ fontSize: '1.8rem' }}>{baseConversion}%</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {controlConverted.toLocaleString()} / {controlSize.toLocaleString()}
            </div>
          </div>
          <div className="score-display" style={{ borderLeft: `3px solid ${isSignificant ? 'var(--accent-green)' : 'var(--accent-orange)'}` }}>
            <div className="score-label">🅱️ Variant</div>
            <div className="score-number" style={{ fontSize: '1.8rem', color: isSignificant ? 'var(--accent-green)' : 'var(--accent-orange)' }}>
              {variantConversion.toFixed(1)}%
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {variantConverted.toLocaleString()} / {variantSize.toLocaleString()}
            </div>
          </div>
        </div>

        <div className={`info-box ${isSignificant ? 'success' : 'warning'}`}>
          <div className="info-box-icon">{isSignificant ? '✅' : '⏳'}</div>
          <div className="info-box-content">
            <div className="info-box-title">
              {isSignificant ? 'Статистически значимо!' : 'Недостаточно данных'}
            </div>
            z-score = {zScore.toFixed(2)} (нужно ≥ {zThreshold} для {significance}% значимости).
            {!isSignificant && ` Рекомендуемый размер: ${minSamplePerVariant.toLocaleString()} на вариант.`}
          </div>
        </div>
      </div>

      {/* Mistakes */}
      <div className="card">
        <h3>🚫 6 частых ошибок</h3>
        <div className="grid-2">
          {mistakes.map(m => (
            <div key={m.title} className="info-box error" style={{ margin: 0 }}>
              <div className="info-box-icon">{m.icon}</div>
              <div className="info-box-content">
                <div className="info-box-title">{m.title}</div>
                {m.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz */}
      <div className="card">
        <h3>🧪 Мини-квиз</h3>
        {quiz.map((q, qi) => (
          <div key={qi} className="scenario-card">
            <h4>{q.q}</h4>
            <div className="scenario-options">
              {q.options.map((opt, oi) => {
                const isSelected = quizAnswers[qi] === oi
                const isCorrect = oi === q.correct
                const revealed = showQuizResult
                return (
                  <button
                    key={oi}
                    className={`scenario-option ${isSelected ? 'selected' : ''} ${revealed && isCorrect ? 'correct' : ''} ${revealed && isSelected && !isCorrect ? 'wrong' : ''}`}
                    onClick={() => !showQuizResult && setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {Object.keys(quizAnswers).length === quiz.length && !showQuizResult && (
          <button className="btn btn-primary" onClick={() => setShowQuizResult(true)}>
            Показать результат
          </button>
        )}

        {showQuizResult && (
          <div className="score-display">
            <div className="score-number">
              {quiz.filter((q, i) => quizAnswers[i] === q.correct).length}/{quiz.length}
            </div>
            <div className="score-label">правильных ответов</div>
          </div>
        )}
      </div>

      {/* Материалы */}
      <div className="card">
        <h3>📚 Материалы для изучения</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="https://ru.wikipedia.org/wiki/A/B-тестирование" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 A/B-тестирование — Википедия
          </a>
        </div>
      </div>
    </div>
  )
}
