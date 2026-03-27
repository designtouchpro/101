import { useState } from 'react'

interface Feature {
  id: number
  name: string
  reach: number
  impact: number
  confidence: number
  effort: number
}

const defaultFeatures: Feature[] = [
  { id: 1, name: 'Онбординг-туториал', reach: 80, impact: 3, confidence: 90, effort: 3 },
  { id: 2, name: 'Push-уведомления', reach: 60, impact: 2, confidence: 70, effort: 2 },
  { id: 3, name: 'Тёмная тема', reach: 30, impact: 1, confidence: 95, effort: 1 },
  { id: 4, name: 'Интеграция с Slack', reach: 20, impact: 3, confidence: 50, effort: 5 },
  { id: 5, name: 'Экспорт в PDF', reach: 40, impact: 2, confidence: 80, effort: 2 },
]

type Framework = 'rice' | 'ice' | 'moscow' | 'value-effort'
type MoSCoWCategory = 'must' | 'should' | 'could' | 'wont'

export default function Prioritization() {
  const [framework, setFramework] = useState<Framework>('rice')
  const [features, setFeatures] = useState<Feature[]>(defaultFeatures)
  const [newName, setNewName] = useState('')

  // MoSCoW state
  const [moscowItems] = useState([
    'Авторизация пользователей',
    'Поиск по каталогу',
    'Оплата картой',
    'Фильтры по категориям',
    'Рекомендации товаров',
    'Отзывы и рейтинги',
    'Темная тема',
    'Экспорт истории заказов',
    'Интеграция с Apple Pay',
    'Push о статусе доставки',
  ])
  const [moscowState, setMoscowState] = useState<Record<string, MoSCoWCategory>>({})

  // RICE score
  const riceScore = (f: Feature) => (f.reach * f.impact * (f.confidence / 100)) / f.effort

  // ICE score
  const iceScore = (f: Feature) => f.impact * (f.confidence / 100) * (10 - f.effort) / 3

  const sortedFeatures = [...features].sort((a, b) => {
    if (framework === 'rice') return riceScore(b) - riceScore(a)
    if (framework === 'ice') return iceScore(b) - iceScore(a)
    if (framework === 'value-effort') return (b.impact / b.effort) - (a.impact / a.effort)
    return 0
  })

  const updateFeature = (id: number, field: keyof Feature, value: number) => {
    setFeatures(f => f.map(feat => feat.id === id ? { ...feat, [field]: value } : feat))
  }

  const addFeature = () => {
    if (!newName.trim()) return
    setFeatures(f => [...f, { id: Date.now(), name: newName.trim(), reach: 50, impact: 2, confidence: 70, effort: 3 }])
    setNewName('')
  }

  const removeFeature = (id: number) => {
    setFeatures(f => f.filter(feat => feat.id !== id))
  }

  const toggleMoscow = (item: string) => {
    const order: MoSCoWCategory[] = ['must', 'should', 'could', 'wont']
    const current = moscowState[item]
    const nextIdx = current ? (order.indexOf(current) + 1) % 4 : 0
    setMoscowState(s => ({ ...s, [item]: order[nextIdx] }))
  }

  const moscowColors: Record<MoSCoWCategory, string> = {
    must: '#10b981',
    should: '#3b82f6',
    could: '#f59e0b',
    wont: '#ef4444',
  }

  const moscowLabels: Record<MoSCoWCategory, string> = {
    must: 'Must Have',
    should: 'Should Have',
    could: 'Could Have',
    wont: "Won't Have",
  }

  const frameworks: { key: Framework; label: string; emoji: string; desc: string }[] = [
    { key: 'rice', label: 'RICE', emoji: '🍚', desc: 'Reach × Impact × Confidence / Effort' },
    { key: 'ice', label: 'ICE', emoji: '🧊', desc: 'Impact × Confidence × Ease' },
    { key: 'moscow', label: 'MoSCoW', emoji: '🏛', desc: 'Must / Should / Could / Won\'t' },
    { key: 'value-effort', label: 'Value / Effort', emoji: '⚖️', desc: 'Матрица ценность vs усилия' },
  ]

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🎯 Приоритизация фич</h1>
        <p>Сравните 4 фреймворка приоритизации на реальных примерах.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Приоритизация</strong> — это процесс определения порядка реализации фич, задач или инициатив на основе их ценности,
          стоимости и рисков. Без формального фреймворка решения принимаются по принципу HiPPO (Highest Paid Person's Opinion) —
          что хочет самый «важный» человек в комнате. Фреймворки помогают объективизировать выбор и вести продуктивные дискуссии.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Ни один фреймворк не даёт «правильного» ответа — это инструменты мышления. <strong>RICE</strong> хорош, когда нужны числа
          для стейкхолдеров. <strong>MoSCoW</strong> — для фиксации scope с заказчиком. <strong>ICE</strong> — для быстрой оценки в стартапе.
          <strong>Value/Effort матрица</strong> — для визуального обсуждения на ретро или планировании. Выбирайте инструмент под контекст,
          а не ищите универсальный.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>⚠️ Антипаттерн</strong>: Не оценивайте фичи в одиночку. Приоритизация — командное упражнение.
            Product менеджер отвечает за Reach и Value, инженеры — за Effort, дизайнеры — за Confidence в UX-решениях.
            Совместная оценка повышает вовлечённость (buy-in) и точность.
          </div>
        </div>
      </div>

      {/* Framework Selector */}
      <div className="card">
        <h3>Выберите фреймворк</h3>
        <div className="tabs">
          {frameworks.map(f => (
            <button
              key={f.key}
              className={`tab ${framework === f.key ? 'active' : ''}`}
              onClick={() => setFramework(f.key)}
            >
              {f.emoji} {f.label}
            </button>
          ))}
        </div>
        <p style={{ marginTop: 8, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          {frameworks.find(f => f.key === framework)?.desc}
        </p>
      </div>

      {/* RICE / ICE / Value-Effort */}
      {framework !== 'moscow' && (
        <div className="card" style={{ overflowX: 'auto' }}>
          <h3>
            {framework === 'rice' && '🍚 RICE Scoring'}
            {framework === 'ice' && '🧊 ICE Scoring'}
            {framework === 'value-effort' && '⚖️ Value / Effort Matrix'}
          </h3>

          {/* Explanation */}
          <div className="info-box" style={{ marginBottom: 16 }}>
            <div className="info-box-icon">📖</div>
            <div className="info-box-content">
              {framework === 'rice' && (
                <>
                  <div className="info-box-title">RICE = Reach × Impact × Confidence / Effort</div>
                  <strong>Reach</strong> — сколько юзеров затронет (в месяц).{' '}
                  <strong>Impact</strong> — сила эффекта (1-3).{' '}
                  <strong>Confidence</strong> — уверенность в оценке (%).{' '}
                  <strong>Effort</strong> — трудозатраты (человеко-недели).
                </>
              )}
              {framework === 'ice' && (
                <>
                  <div className="info-box-title">ICE = Impact × Confidence × Ease</div>
                  Проще RICE: нет Reach. <strong>Ease</strong> — обратная от Effort (чем проще — тем выше).
                  Хорош для быстрых решений, но менее точен.
                </>
              )}
              {framework === 'value-effort' && (
                <>
                  <div className="info-box-title">Value / Effort = Impact ÷ Effort</div>
                  Самый простой метод. Ищем <strong>быстрые победы (Quick Wins)</strong> — высокая ценность, малые усилия.
                  Если Impact/Effort {'>'} 1, скорее всего стоит делать.
                </>
              )}
            </div>
          </div>

          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ textAlign: 'left', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Фича</th>
                <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Reach</th>
                <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Impact</th>
                <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Confidence</th>
                <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Effort</th>
                <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--accent-main)', fontWeight: 700 }}>Score</th>
                <th style={{ padding: 8 }}></th>
              </tr>
            </thead>
            <tbody>
              {sortedFeatures.map((f, idx) => {
                const score = framework === 'rice' ? riceScore(f) : framework === 'ice' ? iceScore(f) : f.impact / f.effort
                return (
                  <tr key={f.id} style={{
                    borderBottom: '1px solid var(--border-color)',
                    background: idx === 0 ? 'rgba(16, 185, 129, 0.06)' : undefined,
                  }}>
                    <td style={{ padding: 8, fontSize: '0.9rem', fontWeight: 500 }}>
                      {idx === 0 && '🥇 '}{idx === 1 && '🥈 '}{idx === 2 && '🥉 '}{f.name}
                    </td>
                    <td style={{ padding: 4, textAlign: 'center' }}>
                      <input type="number" min={1} max={100} value={f.reach}
                        onChange={e => updateFeature(f.id, 'reach', +e.target.value)}
                        style={{ width: 60, textAlign: 'center', padding: 4, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                      />
                    </td>
                    <td style={{ padding: 4, textAlign: 'center' }}>
                      <select value={f.impact} onChange={e => updateFeature(f.id, 'impact', +e.target.value)}
                        style={{ padding: 4, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '0.85rem' }}>
                        <option value={1}>1 — Низкий</option>
                        <option value={2}>2 — Средний</option>
                        <option value={3}>3 — Высокий</option>
                      </select>
                    </td>
                    <td style={{ padding: 4, textAlign: 'center' }}>
                      <input type="number" min={10} max={100} step={10} value={f.confidence}
                        onChange={e => updateFeature(f.id, 'confidence', +e.target.value)}
                        style={{ width: 60, textAlign: 'center', padding: 4, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                      />
                    </td>
                    <td style={{ padding: 4, textAlign: 'center' }}>
                      <input type="number" min={1} max={10} value={f.effort}
                        onChange={e => updateFeature(f.id, 'effort', +e.target.value)}
                        style={{ width: 60, textAlign: 'center', padding: 4, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                      />
                    </td>
                    <td style={{ padding: 8, textAlign: 'center', fontSize: '1rem', fontWeight: 700, color: 'var(--accent-main)' }}>
                      {score.toFixed(1)}
                    </td>
                    <td style={{ padding: 4 }}>
                      <button onClick={() => removeFeature(f.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', opacity: 0.5 }}>✕</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <input
              placeholder="Новая фича…"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addFeature()}
              className="quiz-input"
              style={{ flex: 1 }}
            />
            <button onClick={addFeature} className="btn btn-primary">Добавить</button>
          </div>
        </div>
      )}

      {/* MoSCoW */}
      {framework === 'moscow' && (
        <div className="card">
          <h3>🏛 MoSCoW: распределите фичи</h3>
          <div className="info-box" style={{ marginBottom: 16 }}>
            <div className="info-box-icon">📖</div>
            <div className="info-box-content">
              <div className="info-box-title">Как работает MoSCoW</div>
              Каждую фичу относим к одной из 4 категорий:
              <strong> Must</strong> (без этого не запускаем),
              <strong> Should</strong> (важно, но не критично),
              <strong> Could</strong> (приятный бонус),
              <strong> Won't</strong> (не сейчас).
            </div>
          </div>

          <p style={{ marginBottom: 12, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Нажимайте на фичу, чтобы циклически переключать категорию:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {moscowItems.map(item => {
              const cat = moscowState[item]
              return (
                <div
                  key={item}
                  onClick={() => toggleMoscow(item)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: `2px solid ${cat ? moscowColors[cat] : 'var(--border-color)'}`,
                    background: cat ? `${moscowColors[cat]}15` : 'var(--bg-card)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{item}</span>
                  {cat ? (
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: moscowColors[cat], padding: '2px 8px', borderRadius: 4, background: `${moscowColors[cat]}20` }}>
                      {moscowLabels[cat]}
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Не выбрано</span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Summary */}
          {Object.keys(moscowState).length > 0 && (
            <div style={{ marginTop: 20 }}>
              <h4>Итог:</h4>
              <div className="grid-2" style={{ gap: 8 }}>
                {(['must', 'should', 'could', 'wont'] as MoSCoWCategory[]).map(cat => {
                  const items = moscowItems.filter(i => moscowState[i] === cat)
                  return (
                    <div key={cat} style={{ padding: 12, borderRadius: 8, border: `1px solid ${moscowColors[cat]}40`, background: `${moscowColors[cat]}08` }}>
                      <div style={{ fontWeight: 700, color: moscowColors[cat], fontSize: '0.85rem', marginBottom: 6 }}>
                        {moscowLabels[cat]} ({items.length})
                      </div>
                      {items.length === 0 && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>—</span>}
                      {items.map(i => <div key={i} style={{ fontSize: '0.8rem', marginBottom: 2 }}>• {i}</div>)}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Value/Effort Matrix Visual */}
      {framework === 'value-effort' && (
        <div className="card">
          <h3>📊 Матрица 2×2</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, maxWidth: 500 }}>
            {[
              { label: '🚀 Быстрые победы (Quick Wins)', desc: 'Высокая ценность, малые усилия', bg: '#10b98120', border: '#10b981', items: features.filter(f => f.impact >= 2 && f.effort <= 2) },
              { label: '📅 Стратегические', desc: 'Высокая ценность, большие усилия', bg: '#3b82f620', border: '#3b82f6', items: features.filter(f => f.impact >= 2 && f.effort > 2) },
              { label: '🤷 Заполняющие задачи (Fill-ins)', desc: 'Низкая ценность, малые усилия', bg: '#f59e0b20', border: '#f59e0b', items: features.filter(f => f.impact < 2 && f.effort <= 2) },
              { label: '❌ Избегать (Avoid)', desc: 'Низкая ценность, большие усилия', bg: '#ef444420', border: '#ef4444', items: features.filter(f => f.impact < 2 && f.effort > 2) },
            ].map(q => (
              <div key={q.label} style={{ padding: 16, background: q.bg, borderRadius: 8, border: `1px solid ${q.border}40`, minHeight: 100 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{q.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8 }}>{q.desc}</div>
                {q.items.map(i => <div key={i.id} style={{ fontSize: '0.8rem', marginBottom: 2 }}>• {i.name}</div>)}
                {q.items.length === 0 && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>—</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="card">
        <h3>💡 Советы по приоритизации</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { tip: 'Не полагайтесь на один фреймворк', detail: 'RICE хорош для числовых оценок, MoSCoW — для быстрых стейкхолдер-сессий. Комбинируйте.' },
            { tip: 'Confidence — главный враг', detail: 'Люди завышают уверенность. Если нет данных, ставьте Confidence ≤ 50%.' },
            { tip: 'Effort считайте командой', detail: 'Не позволяйте одному человеку оценивать — собирайте покер планирования (Planning Poker) или оценку размерами (T-shirt sizing).' },
            { tip: 'Пересматривайте раз в квартал', detail: 'Контекст меняется: конкуренты, рынок, стратегия. Приоритеты — не монолит.' },
          ].map(t => (
            <div key={t.tip} style={{ padding: 12, borderRadius: 8, background: 'var(--bg-main)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>⚡ {t.tip}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Материалы */}
      <div className="card">
        <h3>📚 Материалы для изучения</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="https://ru.wikipedia.org/wiki/Метод_MoSCoW" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Метод MoSCoW — Википедия
          </a>
        </div>
      </div>
    </div>
  )
}
