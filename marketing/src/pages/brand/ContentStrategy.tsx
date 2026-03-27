import { useState } from 'react'

const contentTypes = [
  { type: 'Статьи/Блог', icon: '📝', goal: 'SEO + экспертиза', freq: '2-4 / мес', effort: 3, funnel: 'TOFU', examples: ['Гайды', 'Списки', 'How-to'] },
  { type: 'Кейсы', icon: '📊', goal: 'Доверие', freq: '1-2 / мес', effort: 4, funnel: 'MOFU', examples: ['Клиентские истории', 'До/После'] },
  { type: 'Видео', icon: '🎬', goal: 'Вовлечение', freq: '2-4 / мес', effort: 5, funnel: 'TOFU', examples: ['YouTube', 'Reels', 'Tutorials'] },
  { type: 'Email-рассылки', icon: '📧', goal: 'Удержание', freq: '1-2 / нед', effort: 2, funnel: 'BOFU', examples: ['Дайджесты', 'Onboarding', 'Промо'] },
  { type: 'Соцсети', icon: '📱', goal: 'Охват + HR', freq: 'ежедневно', effort: 2, funnel: 'TOFU', examples: ['Посты', 'Stories', 'Мемы'] },
  { type: 'Подкасты', icon: '🎙️', goal: 'Лояльность', freq: '1-2 / мес', effort: 4, funnel: 'MOFU', examples: ['Интервью', 'Обзоры', 'Новости'] },
  { type: 'White Papers', icon: '📄', goal: 'Lead gen', freq: '1 / квартал', effort: 5, funnel: 'MOFU', examples: ['Исследования', 'Отчёты'] },
  { type: 'Вебинары', icon: '🖥️', goal: 'Прогрев', freq: '1-2 / мес', effort: 4, funnel: 'BOFU', examples: ['Демо', 'Q&A', 'Мастер-классы'] },
]

const funnelStages = [
  { stage: 'TOFU', label: 'Top of Funnel', color: '#f97316', desc: 'Привлечение внимания', types: ['Блог', 'Видео', 'Соцсети', 'SEO'] },
  { stage: 'MOFU', label: 'Middle of Funnel', color: '#eab308', desc: 'Подогрев интереса', types: ['Кейсы', 'Вебинары', 'Email', 'White Papers'] },
  { stage: 'BOFU', label: 'Bottom of Funnel', color: '#22c55e', desc: 'Конвертация', types: ['Демо', 'Free trial', 'Консультация', 'Промо'] },
]

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт']

interface PlanItem {
  day: number
  type: string
  topic: string
}

const defaultPlan: PlanItem[] = [
  { day: 0, type: '📱', topic: 'Пост в соцсетях' },
  { day: 1, type: '📝', topic: 'Статья в блог' },
  { day: 2, type: '📧', topic: 'Email-рассылка' },
  { day: 3, type: '📱', topic: 'Reels / Stories' },
  { day: 4, type: '📊', topic: 'Кейс клиента' },
]

export default function ContentStrategy() {
  const [funnelFilter, setFunnelFilter] = useState<string | null>(null)
  const [plan, setPlan] = useState<PlanItem[]>(defaultPlan)
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [editTopic, setEditTopic] = useState('')
  const [expandedType, setExpandedType] = useState<number | null>(null)

  const filtered = funnelFilter
    ? contentTypes.filter(c => c.funnel === funnelFilter)
    : contentTypes

  const startEdit = (i: number) => {
    setEditIdx(i)
    setEditTopic(plan[i]!.topic)
  }
  const saveEdit = () => {
    if (editIdx === null) return
    setPlan(prev => prev.map((p, i) => i === editIdx ? { ...p, topic: editTopic } : p))
    setEditIdx(null)
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📋 Контент-стратегия</h1>
        <p>Типы контента, контент-воронка и контент-план для IT-продукта.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Контент-стратегия</strong> — это план создания, публикации и управления контентом, 
          который привлекает целевую аудиторию и ведёт её к целевому действию. Контент-маркетинг не продаёт напрямую — 
          он строит доверие, экспертность и узнаваемость. По данным HubSpot, компании с блогом получают на 67% больше лидов.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Контент-воронка повторяет маркетинговую: <strong>TOFU</strong> (Top of Funnel) — увеличение охвата 
          (статьи, видео, посты), <strong>MOFU</strong> (Middle) — наращивание интереса (вебинары, кейсы, гайды), <strong>BOFU</strong> (Bottom) — конвертация (демо, триалы, сравнения). Ошибка многих — делать только TOFU-контент 
          и удивляться, почему трафик есть, а продаж нет.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>📌 Правило 70/20/10</strong>: 70% контента — проверенные форматы, которые работают. 
            20% — эксперименты с новыми форматами и каналами. 10% — рискованные идеи, которые могут «выстрелить». 
            Так вы обеспечиваете стабильность и не упускаете тренды.
          </div>
        </div>
      </div>

      {/* Content Funnel */}
      <div className="card">
        <h3>🔻 Контент-воронка</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 16 }}>
          {funnelStages.map((s, i) => (
            <div key={s.stage} onClick={() => setFunnelFilter(funnelFilter === s.stage ? null : s.stage)}
              style={{
                padding: '14px 20px', textAlign: 'center', cursor: 'pointer',
                background: funnelFilter === s.stage ? s.color : `${s.color}22`,
                color: funnelFilter === s.stage ? '#fff' : 'var(--text-primary)',
                borderRadius: i === 0 ? '10px 10px 0 0' : i === 2 ? '0 0 10px 10px' : 0,
                width: `${100 - i * 15}%`, margin: '0 auto',
                transition: 'all 0.2s', fontWeight: 600,
              }}>
              <div>{s.stage} — {s.label}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 400, opacity: 0.8 }}>{s.desc}</div>
              <div style={{ fontSize: '0.7rem', marginTop: 4, opacity: 0.7 }}>{s.types.join(' • ')}</div>
            </div>
          ))}
        </div>
        {funnelFilter && (
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Показаны типы для <strong>{funnelFilter}</strong>. Нажмите ещё раз чтобы сбросить.
          </div>
        )}
      </div>

      {/* Content Types */}
      <div className="card">
        <h3>📦 Типы контента {funnelFilter ? `(${funnelFilter})` : ''}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map((c, i) => (
            <div key={c.type} style={{
              padding: '12px 16px', borderRadius: 8, background: 'var(--bg-secondary)',
              cursor: 'pointer', border: expandedType === i ? '2px solid var(--accent-main)' : '2px solid transparent',
            }} onClick={() => setExpandedType(expandedType === i ? null : i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '1.3rem' }}>{c.icon}</span>
                  <strong>{c.type}</strong>
                  <span className="badge" style={{ fontSize: '0.65rem' }}>{c.funnel}</span>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{c.freq}</span>
              </div>

              {expandedType === i && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: '0.85rem' }}>
                    <div><strong>Цель:</strong> {c.goal}</div>
                    <div><strong>Трудозатраты:</strong> {'⭐'.repeat(c.effort)}</div>
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {c.examples.map(ex => (
                      <span key={ex} style={{
                        padding: '3px 8px', borderRadius: 6, background: 'var(--accent-main-alpha)',
                        fontSize: '0.75rem', color: 'var(--accent-main)',
                      }}>{ex}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content Plan */}
      <div className="card">
        <h3>📅 Контент-план (неделя)</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>
          Нажмите на запись чтобы редактировать. Это пример — адаптируйте под ваш продукт.
        </p>

        <table className="data-table">
          <thead>
            <tr>
              <th>День</th>
              <th>Тип</th>
              <th>Тема</th>
            </tr>
          </thead>
          <tbody>
            {plan.map((p, i) => (
              <tr key={i} onClick={() => startEdit(i)} style={{ cursor: 'pointer' }}>
                <td><strong>{weekDays[p.day]}</strong></td>
                <td style={{ fontSize: '1.2rem' }}>{p.type}</td>
                <td>
                  {editIdx === i ? (
                    <div style={{ display: 'flex', gap: 6 }}>
                      <input className="input" value={editTopic}
                        onChange={e => setEditTopic(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && saveEdit()}
                        onClick={e => e.stopPropagation()} autoFocus
                        style={{ flex: 1, fontSize: '0.85rem', padding: '4px 8px' }} />
                      <button className="btn btn-primary" onClick={e => { e.stopPropagation(); saveEdit() }}
                        style={{ fontSize: '0.75rem', padding: '4px 10px' }}>✓</button>
                    </div>
                  ) : p.topic}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Content Pillars */}
      <div className="card">
        <h3>🏛️ Контентные столпы</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
          3-5 ключевых тем, вокруг которых строится весь контент бренда.
        </p>

        <div className="grid-3">
          {[
            { pillar: 'Продукт', icon: '💡', share: '30%', topics: ['Обновления', 'Фичи', 'Roadmap', 'Туториалы'] },
            { pillar: 'Экспертиза', icon: '🧠', share: '25%', topics: ['Гайды', 'Best practices', 'Тренды'] },
            { pillar: 'Кейсы', icon: '🏆', share: '20%', topics: ['Истории клиентов', 'ROI', 'До/После'] },
            { pillar: 'Культура', icon: '🎪', share: '15%', topics: ['Команда', 'Ценности', 'За кулисами'] },
            { pillar: 'Юмор', icon: '😄', share: '10%', topics: ['Мемы', 'Ситуативка', 'Тренды'] },
          ].map(p => (
            <div key={p.pillar} style={{ padding: 14, borderRadius: 8, background: 'var(--bg-secondary)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>{p.icon}</div>
              <div style={{ fontWeight: 700 }}>{p.pillar}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-main)', fontWeight: 600 }}>{p.share}</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center', marginTop: 6 }}>
                {p.topics.map(t => (
                  <span key={t} style={{ padding: '2px 6px', borderRadius: 4, background: 'var(--bg-code)', fontSize: '0.7rem' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
