import { useState } from 'react'

interface Segment {
  id: number
  name: string
  size: number
  growth: number
  competition: 'low' | 'medium' | 'high'
  fit: number // 1-10
}

const defaultSegments: Segment[] = [
  { id: 1, name: 'Стартапы (1-10 чел.)', size: 50000, growth: 30, competition: 'high', fit: 7 },
  { id: 2, name: 'Средний бизнес (50-500)', size: 15000, growth: 12, competition: 'medium', fit: 9 },
  { id: 3, name: 'Корпорации (500+)', size: 3000, growth: 5, competition: 'high', fit: 5 },
  { id: 4, name: 'Фрилансеры', size: 200000, growth: 20, competition: 'low', fit: 4 },
  { id: 5, name: 'Образование', size: 25000, growth: 15, competition: 'low', fit: 6 },
]

const positioningAxes = [
  { x: 'Цена', y: 'Функциональность' },
  { x: 'Простота', y: 'Мощность' },
  { x: 'B2C ← → B2B', y: 'Self-serve (самообслуживание) ← → Sales-led (через отдел продаж)' },
]

const positioningExamples = [
  { name: 'Slack', x: 60, y: 70, color: '#4A154B' },
  { name: 'Teams', x: 40, y: 80, color: '#6264A7' },
  { name: 'Discord', x: 80, y: 40, color: '#5865F2' },
  { name: 'Telegram', x: 90, y: 30, color: '#229ED9' },
  { name: 'Ваш продукт', x: 50, y: 50, color: '#f97316' },
]

export default function STP() {
  const [segments, setSegments] = useState(defaultSegments)
  const [step, setStep] = useState<'segment' | 'target' | 'position'>('segment')
  const [selectedTargets, setSelectedTargets] = useState<number[]>([2])
  const [products, setProducts] = useState(positioningExamples)
  const [axisIdx, setAxisIdx] = useState(0)

  const toggleTarget = (id: number) => {
    setSelectedTargets(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const getScore = (s: Segment) => {
    const compMap = { low: 3, medium: 2, high: 1 }
    return Math.round((s.size / 10000) * 0.3 + s.growth * 0.3 + compMap[s.competition] * 10 * 0.2 + s.fit * 2 * 0.2)
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔍 STP-анализ</h1>
        <p>Segmentation (сегментация) → Targeting (выбор целевого сегмента) → Positioning (позиционирование). Три шага к правильному позиционированию.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>STP</strong> (Segmentation (сегментация), Targeting (выбор целевого сегмента), Positioning (позиционирование)) — фреймворк Филипа Котлера, основа стратегического
          маркетинга. Идея: <strong>нельзя продавать всё всем</strong>. Сначала разделите рынок на сегменты,
          потом выберите самые привлекательные, потом сформулируйте, чем вы отличаетесь.
          Компании, которые пытаются быть для всех, часто не нужны никому.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Позиционирование — это не то, что вы делаете с продуктом, а то, <strong>что вы делаете с сознанием клиента</strong>.
          Когда человек слышит «Volvo» — думает «безопасность». «Apple» — «дизайн и простота».
          Это результат осознанного позиционирования.
        </p>
        <div className="info-box">
          <div className="info-box-icon">🎯</div>
          <div className="info-box-content">
            <div className="info-box-title">Тест позиционирования</div>
            Если ваше позиционирование можно применить к конкуренту — это не позиционирование.
            «Мы делаем качественный продукт» — это ничего. «Мы — единственный CRM для риелторов» — это позиционирование.
          </div>
        </div>
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {(['segment', 'target', 'position'] as const).map((s, i) => (
          <button key={s} className={`btn ${step === s ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setStep(s)}>
            {['🔹 1. Сегментация', '🎯 2. Таргетирование', '📍 3. Позиционирование'][i]}
          </button>
        ))}
      </div>

      {step === 'segment' && (
        <>
          <div className="card">
            <h3>🔹 Сегментация рынка</h3>
            <p style={{ marginBottom: 16 }}>
              Разделите рынок на группы по общим характеристикам. Критерии: размер, рост, конкуренция, соответствие продукту.
            </p>

            <div className="info-box">
              <div className="info-box-content" style={{ fontSize: '0.85rem' }}>
                <strong>Критерии сегментации в IT:</strong> размер компании, индустрия, технологический стек,
                стадия (стартап vs корпорация), география, бюджет, use case (сценарий использования).
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ textAlign: 'left', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Сегмент</th>
                    <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Размер</th>
                    <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Рост %</th>
                    <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Конкуренция</th>
                    <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Соответствие (1-10)</th>
                    <th style={{ textAlign: 'center', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Балл</th>
                  </tr>
                </thead>
                <tbody>
                  {segments.sort((a, b) => getScore(b) - getScore(a)).map(s => (
                    <tr key={s.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: 8, fontSize: '0.85rem', fontWeight: 500 }}>{s.name}</td>
                      <td style={{ padding: 8, textAlign: 'center', fontSize: '0.85rem' }}>{s.size.toLocaleString()}</td>
                      <td style={{ padding: 8, textAlign: 'center' }}>
                        <span style={{ color: s.growth > 15 ? '#22c55e' : 'var(--text-secondary)', fontWeight: 600 }}>
                          +{s.growth}%
                        </span>
                      </td>
                      <td style={{ padding: 8, textAlign: 'center' }}>
                        <span style={{
                          fontSize: '0.75rem', padding: '2px 8px', borderRadius: 10,
                          background: s.competition === 'low' ? '#22c55e20' : s.competition === 'medium' ? '#f59e0b20' : '#ef444420',
                          color: s.competition === 'low' ? '#22c55e' : s.competition === 'medium' ? '#f59e0b' : '#ef4444',
                        }}>
                          {s.competition === 'low' ? 'Низкая' : s.competition === 'medium' ? 'Средняя' : 'Высокая'}
                        </span>
                      </td>
                      <td style={{ padding: 4, textAlign: 'center' }}>
                        <input type="range" min={1} max={10} value={s.fit}
                          onChange={e => setSegments(prev => prev.map(seg => seg.id === s.id ? { ...seg, fit: +e.target.value } : seg))}
                          style={{ width: 60 }} />
                        <span style={{ fontSize: '0.75rem', marginLeft: 4 }}>{s.fit}</span>
                      </td>
                      <td style={{ padding: 8, textAlign: 'center', fontWeight: 700, color: 'var(--accent-main)' }}>
                        {getScore(s)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {step === 'target' && (
        <div className="card">
          <h3>🎯 Таргетирование</h3>
          <p style={{ marginBottom: 16 }}>
            Выберите сегменты, на которые будете целиться. Нельзя быть для всех — фокус!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {segments.sort((a, b) => getScore(b) - getScore(a)).map(s => {
              const isTarget = selectedTargets.includes(s.id)
              return (
                <div key={s.id} onClick={() => toggleTarget(s.id)} style={{
                  padding: '12px 16px', borderRadius: 8, cursor: 'pointer',
                  border: `2px solid ${isTarget ? 'var(--accent-main)' : 'var(--border-color)'}`,
                  background: isTarget ? 'var(--accent-main-alpha)' : 'var(--bg-secondary)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  transition: 'all 0.2s',
                }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{isTarget ? '✅' : '⬜'} {s.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Score: {getScore(s)} | Размер: {s.size.toLocaleString()} | Рост: +{s.growth}%
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid-3" style={{ marginTop: 16 }}>
            {[
              { title: 'Концентрированный', desc: '1 сегмент, максимум фокуса', color: '#ef4444', good: selectedTargets.length === 1 },
              { title: 'Дифференцированный', desc: '2-3 сегмента, разные предложения', color: '#f59e0b', good: selectedTargets.length >= 2 && selectedTargets.length <= 3 },
              { title: 'Недифференцированный', desc: 'Всех подряд (плохая идея для стартапа)', color: '#6b7280', good: selectedTargets.length > 3 },
            ].map(s => (
              <div key={s.title} style={{
                padding: 12, borderRadius: 8, textAlign: 'center',
                border: `1px solid ${s.good ? s.color : 'var(--border-color)'}`,
                background: s.good ? `${s.color}10` : 'var(--bg-secondary)',
                opacity: s.good ? 1 : 0.6,
              }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: s.good ? s.color : 'var(--text-muted)' }}>{s.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 'position' && (
        <>
          <div className="card">
            <h3>📍 Карта позиционирования</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
              Расположите ваш продукт относительно конкурентов по двум осям.
            </p>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {positioningAxes.map((a, i) => (
                <button key={i} className={`btn btn-sm ${axisIdx === i ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setAxisIdx(i)}>
                  {a.x} / {a.y}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '100%', maxWidth: 500, height: 400, margin: '0 auto', border: '1px solid var(--border-color)', borderRadius: 8 }}>
              {/* Axes */}
              <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {positioningAxes[axisIdx]!.x} →
              </div>
              <div style={{ position: 'absolute', left: 4, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {positioningAxes[axisIdx]!.y} →
              </div>
              <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, borderLeft: '1px dashed var(--border-color)' }} />
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px dashed var(--border-color)' }} />

              {products.map((p, i) => (
                <div key={p.name} style={{
                  position: 'absolute',
                  left: `${p.x}%`, bottom: `${p.y}%`,
                  transform: 'translate(-50%, 50%)',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', background: p.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: '0.6rem', fontWeight: 700, cursor: 'grab',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    border: p.name === 'Ваш продукт' ? '2px solid white' : 'none',
                  }}>
                    {p.name.charAt(0)}
                  </div>
                  <div style={{ fontSize: '0.65rem', textAlign: 'center', marginTop: 2, color: 'var(--text-muted)' }}>
                    {p.name}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 16, justifyContent: 'center' }}>
              {products.map(p => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: p.color }} />
                  {p.name}
                </div>
              ))}
            </div>
          </div>

          {/* Positioning statement */}
          <div className="card">
            <h3>📝 Positioning Statement (заявление о позиционировании)</h3>
            <div style={{ padding: 16, borderRadius: 8, background: 'var(--bg-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
              Для <strong style={{ color: 'var(--accent-main)' }}>[целевой сегмент]</strong>,
              которые <strong style={{ color: 'var(--accent-main)' }}>[потребность/проблема]</strong>,
              <strong style={{ color: 'var(--accent-main)' }}>[наш продукт]</strong> — это
              <strong style={{ color: 'var(--accent-main)' }}>[категория]</strong>,
              который <strong style={{ color: 'var(--accent-main)' }}>[ключевое отличие]</strong>.
              В отличие от <strong style={{ color: 'var(--accent-main)' }}>[конкурент]</strong>,
              мы <strong style={{ color: 'var(--accent-main)' }}>[уникальное преимущество]</strong>.
            </div>
            <div style={{ marginTop: 12, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong>Пример:</strong> Для IT-команд от 10 человек, которым сложно координировать работу,
              TaskFlow — это инструмент управления проектами, который объединяет задачи, дедлайны и коммуникацию.
              В отличие от Jira, мы делаем это без боли и за 5 минут настройки.
            </div>
          </div>
        </>
      )}

      {/* Resources */}
      <div className="card">
        <h3>📚 Материалы для изучения</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="https://ru.wikipedia.org/wiki/Сегментация_рынка" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Сегментация рынка — Википедия
          </a>
          <a href="https://ru.wikipedia.org/wiki/Позиционирование_(маркетинг)" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Позиционирование — Википедия
          </a>
        </div>
      </div>
    </div>
  )
}
