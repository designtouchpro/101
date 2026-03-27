import { useState } from 'react'

const utmParams = [
  { param: 'utm_source', desc: 'Источник трафика', examples: ['google', 'facebook', 'newsletter', 'habr'], required: true },
  { param: 'utm_medium', desc: 'Тип канала', examples: ['cpc', 'email', 'social', 'organic'], required: true },
  { param: 'utm_campaign', desc: 'Название кампании', examples: ['spring_sale', 'product_launch', 'webinar_feb'], required: true },
  { param: 'utm_content', desc: 'Вариант контента / креатива', examples: ['banner_blue', 'text_link', 'video_ad'], required: false },
  { param: 'utm_term', desc: 'Ключевое слово (для PPC)', examples: ['project_management', 'task_tracker', 'free_crm'], required: false },
]

interface ABVariant {
  name: string
  visitors: number
  conversions: number
}

export default function ABTestingUTM() {
  const [tab, setTab] = useState<'ab' | 'utm'>('ab')

  // UTM builder
  const [baseUrl, setBaseUrl] = useState('https://example.com/landing')
  const [utmValues, setUtmValues] = useState<Record<string, string>>({
    utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'spring_sale', utm_content: '', utm_term: '',
  })

  const builtUrl = (() => {
    const params = Object.entries(utmValues).filter(([, v]) => v.trim()).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')
    return params ? `${baseUrl}?${params}` : baseUrl
  })()

  // A/B test
  const [variants, setVariants] = useState<ABVariant[]>([
    { name: 'Контроль (A)', visitors: 5000, conversions: 150 },
    { name: 'Вариант B', visitors: 5000, conversions: 200 },
  ])
  const [confidence, setConfidence] = useState(95)

  const getCR = (v: ABVariant) => v.visitors > 0 ? ((v.conversions / v.visitors) * 100).toFixed(2) : '0'
  const getLift = () => {
    const crA = variants[0]!.visitors > 0 ? variants[0]!.conversions / variants[0]!.visitors : 0
    const crB = variants[1]!.visitors > 0 ? variants[1]!.conversions / variants[1]!.visitors : 0
    return crA > 0 ? (((crB - crA) / crA) * 100).toFixed(1) : '0'
  }

  const isSignificant = () => {
    const a = variants[0]!
    const b = variants[1]!
    if (a.visitors === 0 || b.visitors === 0) return false
    const pA = a.conversions / a.visitors
    const pB = b.conversions / b.visitors
    const se = Math.sqrt(pA * (1 - pA) / a.visitors + pB * (1 - pB) / b.visitors)
    if (se === 0) return false
    const z = Math.abs(pB - pA) / se
    const thresholds: Record<number, number> = { 90: 1.645, 95: 1.96, 99: 2.576 }
    return z > (thresholds[confidence] || 1.96)
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🧪 A/B тесты и UTM</h1>
        <p>Эксперименты с конверсией и отслеживание трафика через UTM-метки.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>A/B тестирование</strong> — метод проверки гипотез, при котором аудитория случайно делится на группы, 
          каждая из которых видит свой вариант (страницы, письма, рекламы). Статистически сравниваются конверсии — 
          какой вариант работает лучше. Это основа data-driven маркетинга: вместо споров «какой заголовок лучше» 
          вы получаете ответ на основе данных.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>UTM-метки</strong> (Urchin Tracking Module) — параметры в URL, которые помогают аналитическим системам 
          (Google Analytics, Яндекс.Метрика) определить, откуда пришёл пользователь. Пять стандартных параметров: 
          source (откуда), medium (тип трафика), campaign (название кампании), term (ключевое слово), content (вариант объявления).
          Без UTM вы не отличите трафик из email-рассылки от трафика из Telegram-канала.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>⚠️ Ключевое правило A/B</strong>: Тестируйте одну переменную за раз. Если вы одновременно 
            меняете заголовок, цвет кнопки и картинку — невозможно понять, что именно повлияло на результат.
            Для множественных изменений используйте multivariate-тестирование.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button className={`btn ${tab === 'ab' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('ab')}>
          🧪 A/B тестирование
        </button>
        <button className={`btn ${tab === 'utm' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('utm')}>
          🔗 UTM-разметка
        </button>
      </div>

      {tab === 'ab' && (
        <>
          <div className="card">
            <h3>🧪 Калькулятор A/B теста</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
              Введите данные двух вариантов для проверки статистической значимости.
            </p>

            <div className="grid-2">
              {variants.map((v, i) => (
                <div key={i} style={{ padding: 16, borderRadius: 8, background: 'var(--bg-secondary)', border: `1px solid ${i === 0 ? '#3b82f640' : '#22c55e40'}` }}>
                  <div style={{ fontWeight: 600, marginBottom: 12, color: i === 0 ? '#3b82f6' : '#22c55e' }}>
                    {v.name}
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Посетители</label>
                    <input type="number" className="input" value={v.visitors}
                      onChange={e => setVariants(prev => prev.map((vr, idx) => idx === i ? { ...vr, visitors: +e.target.value } : vr))}
                      style={{ marginTop: 4 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Конверсии</label>
                    <input type="number" className="input" value={v.conversions}
                      onChange={e => setVariants(prev => prev.map((vr, idx) => idx === i ? { ...vr, conversions: +e.target.value } : vr))}
                      style={{ marginTop: 4 }} />
                  </div>
                  <div style={{ marginTop: 12, textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CR</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: i === 0 ? '#3b82f6' : '#22c55e' }}>
                      {getCR(v)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Confidence selector */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Уровень значимости:</span>
              {[90, 95, 99].map(c => (
                <button key={c} className={`btn btn-sm ${confidence === c ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setConfidence(c)}>
                  {c}%
                </button>
              ))}
            </div>

            {/* Result */}
            <div className="grid-3" style={{ marginTop: 16 }}>
              <div className="score-display">
                <div className="score-label">Lift</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: +getLift() > 0 ? '#22c55e' : '#ef4444' }}>
                  {+getLift() > 0 ? '+' : ''}{getLift()}%
                </div>
              </div>
              <div className="score-display">
                <div className="score-label">Значимость</div>
                <div style={{
                  fontSize: '1.5rem', fontWeight: 700,
                  color: isSignificant() ? '#22c55e' : '#f59e0b',
                }}>
                  {isSignificant() ? '✅ Да' : '⚠️ Нет'}
                </div>
              </div>
              <div className="score-display">
                <div className="score-label">Победитель</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-main)' }}>
                  {isSignificant() ? (+getLift() > 0 ? 'Вариант B 🏆' : 'Контроль A 🏆') : 'Ждём данных…'}
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="card">
            <h3>📏 Правила A/B тестирования</h3>
            <div className="grid-2">
              {[
                { icon: '✅', title: 'Тестируйте одну гипотезу', desc: 'Один тест = одно изменение. Иначе не поймёте, что сработало.' },
                { icon: '⏱️', title: 'Дождитесь значимости', desc: 'Не останавливайте тест раньше времени. Минимум 1-2 недели, полные циклы.' },
                { icon: '📊', title: 'Достаточный размер выборки', desc: 'Калькулятор: минимум 1000-5000 посетителей на вариант для CR ~3%.' },
                { icon: '🎯', title: 'Чёткая метрика', desc: 'Определите primary metric заранее. Не post-hoc анализ.' },
              ].map(tip => (
                <div key={tip.title} style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary)', borderLeft: '3px solid var(--accent-main)' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{tip.icon} {tip.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{tip.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'utm' && (
        <>
          <div className="card">
            <h3>🔗 UTM Builder</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
              Создайте UTM-размеченную ссылку для отслеживания источников трафика.
            </p>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Базовый URL</label>
              <input className="input" value={baseUrl} onChange={e => setBaseUrl(e.target.value)} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {utmParams.map(p => (
                <div key={p.param}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                      {p.param} {p.required && <span style={{ color: '#ef4444' }}>*</span>}
                    </label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.desc}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input className="input" value={utmValues[p.param] || ''}
                      onChange={e => setUtmValues(prev => ({ ...prev, [p.param]: e.target.value }))}
                      placeholder={p.examples[0]} style={{ flex: 1 }} />
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {p.examples.slice(0, 3).map(ex => (
                        <button key={ex} className="btn btn-secondary btn-sm"
                          onClick={() => setUtmValues(prev => ({ ...prev, [p.param]: ex }))}>
                          {ex}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Result URL */}
            <div style={{
              marginTop: 20, padding: 16, borderRadius: 8,
              background: 'var(--bg-code)', fontFamily: 'monospace', fontSize: '0.8rem',
              wordBreak: 'break-all', lineHeight: 1.6,
            }}>
              {builtUrl}
            </div>

            <button className="btn btn-primary" style={{ marginTop: 12 }}
              onClick={() => navigator.clipboard.writeText(builtUrl)}>
              📋 Скопировать ссылку
            </button>
          </div>

          {/* UTM naming conventions */}
          <div className="card">
            <h3>📝 Конвенции именования</h3>
            <div className="info-box">
              <div className="info-box-content" style={{ fontSize: '0.85rem' }}>
                <strong>Правила:</strong> только латиница, нижнее подчёркивание вместо пробелов, без заглавных букв, единый стиль для всей команды.
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ textAlign: 'left', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>❌ Плохо</th>
                    <th style={{ textAlign: 'left', padding: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>✅ Хорошо</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Facebook', 'facebook'],
                    ['Spring Sale 2024', 'spring_sale_2024'],
                    ['Email Newsletter', 'email'],
                    ['Banner Blue Top', 'banner_blue_top'],
                  ].map(([bad, good], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: 8, fontSize: '0.85rem', color: '#ef4444', fontFamily: 'monospace' }}>{bad}</td>
                      <td style={{ padding: 8, fontSize: '0.85rem', color: '#22c55e', fontFamily: 'monospace' }}>{good}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
