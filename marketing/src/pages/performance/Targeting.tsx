import { useState } from 'react'

interface Segment {
  name: string
  age: string
  interests: string
  income: string
  behavior: string
  size: number
  selected: boolean
}

const defaultSegments: Segment[] = [
  { name: 'Junior разработчики', age: '20-25', interests: 'Обучение, карьера', income: 'Средний', behavior: 'Ищут курсы, читают Хабр', size: 35, selected: false },
  { name: 'Team Leads', age: '28-35', interests: 'Управление, процессы', income: 'Высокий', behavior: 'Ищут инструменты, читают блоги', size: 20, selected: false },
  { name: 'Фрилансеры', age: '25-40', interests: 'Доход, проекты', income: 'Разный', behavior: 'Биржи, соцсети, нетворкинг', size: 25, selected: false },
  { name: 'Startup founders', age: '25-35', interests: 'Рост, инвестиции', income: 'Разный', behavior: 'Product Hunt, Twitter, конференции', size: 10, selected: false },
  { name: 'Enterprise', age: '35-50', interests: 'Надёжность, SLA', income: 'Высокий', behavior: 'Тендеры, партнёры, референсы', size: 10, selected: false },
]

const channelMatch = [
  { channel: 'Google Ads', best: ['Intent-based (по намерению)', 'B2B', 'High intent (высокая готовность к покупке)'], cpc: '30-150 ₽', cr: '2-5%' },
  { channel: 'VK Ads', best: ['B2C', 'Широкая аудитория', 'RU'], cpc: '5-30 ₽', cr: '0.5-2%' },
  { channel: 'Telegram Ads', best: ['IT', 'B2B', 'Нишевые'], cpc: '2-5 €', cr: '1-3%' },
  { channel: 'YouTube Ads', best: ['Видео', 'Awareness (осведомлённость)', 'B2C'], cpc: '1-5 ₽', cr: '0.5-1.5%' },
  { channel: 'Retargeting', best: ['Возврат', 'Cart abandon (брошенная корзина)', 'BOFU (Bottom of Funnel — низ воронки)'], cpc: '10-50 ₽', cr: '3-8%' },
]

const retargetingStrategies = [
  { name: 'Site visitors (посетители сайта)', desc: 'Были на сайте, но не конвертировались', window: '7-30 дней', priority: 5 },
  { name: 'Cart abandoners (бросившие корзину)', desc: 'Начали оформление, бросили', window: '1-7 дней', priority: 5 },
  { name: 'Feature page visitors (посетители страниц функций)', desc: 'Смотрели конкретную фичу', window: '14-30 дней', priority: 4 },
  { name: 'Blog readers (читатели блога)', desc: 'Читали 3+ статей', window: '30-60 дней', priority: 3 },
  { name: 'Trial expired (истёкший триал)', desc: 'Триал закончился, не купили', window: '1-14 дней', priority: 5 },
  { name: 'Inactive users (неактивные пользователи)', desc: 'Не заходили 30+ дней', window: '30-90 дней', priority: 3 },
]

export default function Targeting() {
  const [segments, setSegments] = useState(defaultSegments)
  const [tab, setTab] = useState<'segments' | 'channels' | 'retargeting'>('segments')

  const toggleSegment = (i: number) => {
    setSegments(prev => prev.map((s, idx) => idx === i ? { ...s, selected: !s.selected } : s))
  }

  const selectedSegments = segments.filter(s => s.selected)
  const totalSize = segments.reduce((sum, s) => sum + s.size, 0)

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🎯 Таргетинг и аудитории</h1>
        <p>Сегменты, каналы продвижения и ретаргетинг для IT-продуктов.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Таргетинг</strong> — это процесс выбора конкретных сегментов аудитории для показа рекламы или контента.
          Вместо того чтобы показывать рекламу «всем», вы фокусируетесь на людях, которые с наибольшей вероятностью 
          станут клиентами. Таргетинг — третий шаг STP-модели (Segmentation → Targeting → Positioning) 
          и ключевой фактор эффективности рекламного бюджета.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Ретаргетинг</strong> (ремаркетинг) — показ рекламы людям, которые уже взаимодействовали с вашим продуктом: 
          зашли на сайт, добавили товар в корзину, открыли приложение. Конверсия ретаргетинга обычно в 3-5 раз выше 
          обычной рекламы, потому что аудитория уже знакома с брендом. Но важно не «преследовать» — 
          ограничивайте частоту показов (frequency cap — ограничение частоты показов) и исключайте тех, кто уже купил.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>💡 Lookalike-аудитории</strong>: Загрузите базу клиентов в рекламную платформу (Facebook, VK, Google), 
            и алгоритм найдёт похожих пользователей по сотням параметров. Это один из самых эффективных способов 
            масштабирования — вы находите «клонов» лучших клиентов.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {([['segments', '👥 Сегменты'], ['channels', '📡 Каналы'], ['retargeting', '🔄 Ретаргетинг']] as const).map(([key, label]) => (
          <button key={key} className={`btn ${tab === key ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* Segments */}
      {tab === 'segments' && (
        <>
          <div className="card">
            <h3>👥 Аудиторные сегменты</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>
              Выберите целевые сегменты для таргетинга.
            </p>

            {segments.map((s, i) => (
              <div key={s.name} onClick={() => toggleSegment(i)} style={{
                padding: '12px 16px', borderRadius: 8, marginBottom: 8, cursor: 'pointer',
                background: s.selected ? 'var(--accent-main-alpha)' : 'var(--bg-secondary)',
                border: `2px solid ${s.selected ? 'var(--accent-main)' : 'transparent'}`,
                transition: 'all 0.2s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{s.selected ? '✅' : '⬜'} {s.name}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      {s.age} • {s.income} доход • {s.interests}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-main)' }}>{s.size}%</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>от рынка</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  💡 {s.behavior}
                </div>

                {/* Size bar */}
                <div style={{ marginTop: 6, height: 4, borderRadius: 2, background: 'var(--border-color)' }}>
                  <div style={{
                    height: '100%', borderRadius: 2, width: `${(s.size / totalSize) * 100}%`,
                    background: s.selected ? 'var(--accent-main)' : 'var(--text-muted)',
                    transition: 'all 0.3s',
                  }} />
                </div>
              </div>
            ))}

            {selectedSegments.length > 0 && (
              <div className="info-box" style={{ marginTop: 12 }}>
                <div className="info-box-content">
                  <div className="info-box-title">
                    Выбрано: {selectedSegments.length} сегмент(ов) = {selectedSegments.reduce((s, seg) => s + seg.size, 0)}% рынка
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lookalike */}
          <div className="card">
            <h3>👯 Look-alike аудитории</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
              Рекламные платформы находят пользователей, похожих на ваших лучших клиентов.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { source: 'Покупатели', quality: 5, reach: 2, desc: 'Самая точная, но маленькая аудитория' },
                { source: 'Триальщики', quality: 4, reach: 3, desc: 'Хороший баланс качества и охвата' },
                { source: 'Посетители сайта', quality: 3, reach: 4, desc: 'Широкий охват, менее точная' },
                { source: 'Email-база', quality: 4, reach: 3, desc: 'Хорошее качество, если база чистая' },
              ].map(l => (
                <div key={l.source} style={{
                  padding: '10px 14px', borderRadius: 8, background: 'var(--bg-secondary)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8,
                }}>
                  <div>
                    <strong>{l.source}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{l.desc}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, fontSize: '0.8rem' }}>
                    <span>Точность: {'🎯'.repeat(l.quality)}</span>
                    <span>Охват: {'📊'.repeat(l.reach)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Channels */}
      {tab === 'channels' && (
        <div className="card">
          <h3>📡 Рекламные каналы</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Канал</th>
                <th>CPC</th>
                <th>CR</th>
                <th>Лучше всего для</th>
              </tr>
            </thead>
            <tbody>
              {channelMatch.map(c => (
                <tr key={c.channel}>
                  <td><strong>{c.channel}</strong></td>
                  <td style={{ fontFamily: 'monospace' }}>{c.cpc}</td>
                  <td style={{ fontFamily: 'monospace' }}>{c.cr}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {c.best.map(b => (
                        <span key={b} className="badge" style={{ fontSize: '0.65rem' }}>{b}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Retargeting */}
      {tab === 'retargeting' && (
        <div className="card">
          <h3>🔄 Стратегии ретаргетинга</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
            Возвращайте пользователей, которые уже проявили интерес.
          </p>

          {retargetingStrategies.map(r => (
            <div key={r.name} style={{
              padding: '12px 16px', borderRadius: 8, background: 'var(--bg-secondary)',
              marginBottom: 8, borderLeft: `3px solid ${r.priority >= 5 ? 'var(--accent-main)' : 'var(--text-muted)'}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{r.name}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>⏱️ {r.window}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>{r.desc}</div>
              <div style={{ fontSize: '0.75rem', marginTop: 4 }}>
                Приоритет: {'🔥'.repeat(r.priority)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
