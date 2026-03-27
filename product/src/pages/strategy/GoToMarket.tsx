import { useState } from 'react'

interface Channel {
  name: string
  type: 'paid' | 'organic' | 'partner'
  cost: 'low' | 'med' | 'high'
  speed: 'fast' | 'medium' | 'slow'
  scale: 'low' | 'med' | 'high'
  desc: string
}

const channels: Channel[] = [
  { name: 'Контекстная реклама', type: 'paid', cost: 'high', speed: 'fast', scale: 'high', desc: 'Google Ads, Яндекс.Директ — быстрый старт, но дорого.' },
  { name: 'SEO', type: 'organic', cost: 'low', speed: 'slow', scale: 'high', desc: 'Долгосрочная стратегия. Органический трафик растёт месяцами.' },
  { name: 'Content Marketing', type: 'organic', cost: 'med', speed: 'slow', scale: 'high', desc: 'Блог, видео, подкасты. Доверие + SEO + лидогенерация.' },
  { name: 'Product Hunt / HN', type: 'organic', cost: 'low', speed: 'fast', scale: 'low', desc: 'Разовый всплеск внимания. Хорош для early adopters.' },
  { name: 'Партнёрская программа', type: 'partner', cost: 'med', speed: 'medium', scale: 'med', desc: 'Реферальная система или affiliate-программа.' },
  { name: 'Таргет в соцсетях', type: 'paid', cost: 'med', speed: 'fast', scale: 'med', desc: 'Facebook, Instagram, TikTok Ads — быстро, но нужен креатив.' },
  { name: 'Cold Outreach (B2B)', type: 'paid', cost: 'low', speed: 'medium', scale: 'low', desc: 'Email/LinkedIn outreach. Персонально, но не масштабируется.' },
  { name: 'Интеграции / Marketplace', type: 'partner', cost: 'med', speed: 'medium', scale: 'high', desc: 'Присутствие в Slack Marketplace, Shopify App Store и т.д.' },
]

const launchTypes = [
  {
    name: 'Big Bang Launch',
    emoji: '💥',
    desc: 'Один мощный запуск с PR, анонсами, событием.',
    pros: ['Максимум внимания', 'Сильный сигнал рынку', 'Momentum'],
    cons: ['Высокий риск', 'Нет итераций', 'Один шанс на первое впечатление'],
    when: 'Продукт зрелый, бренд сильный, есть бюджет на маркетинг.',
  },
  {
    name: 'Soft Launch',
    emoji: '🤫',
    desc: 'Тихий запуск для ограниченной аудитории, сбор фидбека.',
    pros: ['Можно итерировать', 'Низкий риск', 'Реальный фидбек'],
    cons: ['Медленный рост', 'Нет ажиотажа', 'Конкуренты могут обогнать'],
    when: 'MVP, неизвестный рынок, нужна валидация.',
  },
  {
    name: 'Early Access / Beta',
    emoji: '🔑',
    desc: 'Закрытый доступ по инвайтам. Создаёт ощущение эксклюзивности.',
    pros: ['FOMO-эффект', 'Лояльное ядро', 'Управляемая нагрузка'],
    cons: ['Медленное масштабирование', 'Нужен waitlist-менеджмент'],
    when: 'Два-сторонние платформы, SaaS с ограниченным ресурсом.',
  },
  {
    name: 'Product-Led Growth',
    emoji: '🔄',
    desc: 'Продукт сам привлекает через freemium, виральность, self-service.',
    pros: ['Низкий CAC', 'Масштабируется', 'Пользователи = адвокаты'],
    cons: ['Нужен вау-продукт', 'Долгий путь до монетизации'],
    when: 'SaaS, инструменты для разработчиков, коммуникационные продукты.',
  },
]

type CanvasField = { label: string; placeholder: string }

const positioningCanvas: CanvasField[] = [
  { label: '🎯 Целевая аудитория', placeholder: 'Для кого? (DevOps-инженеры в стартапах...)' },
  { label: '😤 Проблема', placeholder: 'Какую боль решаем? (Деплой занимает часы...)' },
  { label: '✨ Уникальное решение', placeholder: 'Чем мы лучше? (One-click deploy за 2 мин...)' },
  { label: '🏆 Категория', placeholder: 'В какой категории играем? (CI/CD платформа...)' },
  { label: '🆚 Альтернативы', placeholder: 'Что используют сейчас? (Jenkins, GitHub Actions...)' },
  { label: '💎 Ключевое отличие', placeholder: 'Почему мы, а не они? (Zero-config, бесплатно...)' },
]

export default function GoToMarket() {
  const [activeTab, setActiveTab] = useState<'launch' | 'channels' | 'positioning' | 'checklist'>('launch')
  const [channelFilter, setChannelFilter] = useState<'all' | 'paid' | 'organic' | 'partner'>('all')
  const [canvasData, setCanvasData] = useState<Record<string, string>>({})
  const [checklist, setChecklist] = useState<Record<string, boolean>>({})

  const filteredChannels = channelFilter === 'all' ? channels : channels.filter(c => c.type === channelFilter)

  const costEmoji = { low: '💰', med: '💰💰', high: '💰💰💰' }
  const speedEmoji = { fast: '⚡', medium: '🚶', slow: '🐌' }

  const checklistItems = [
    { section: 'Продукт', items: ['MVP готов и протестирован', 'Онбординг настроен', 'Аналитика подключена (Mixpanel/Amplitude)', 'Фидбек-каналы работают'] },
    { section: 'Маркетинг', items: ['Лендинг запущен', 'Позиционирование сформулировано', 'Контент-план на 4 недели', 'Email-список собран'] },
    { section: 'Продажи (B2B)', items: ['Pricing определён', 'Sales deck готов', 'Demo-скрипт написан', 'CRM настроена'] },
    { section: 'Операции', items: ['Саппорт-процесс настроен', 'SLA определён', 'Мониторинг и алерты', 'Rollback-план есть'] },
  ]

  const totalChecked = Object.values(checklist).filter(Boolean).length
  const totalItems = checklistItems.reduce((sum, s) => sum + s.items.length, 0)

  const tabs = [
    { key: 'launch' as const, label: '🚀 Тип запуска' },
    { key: 'channels' as const, label: '📡 Каналы' },
    { key: 'positioning' as const, label: '🎯 Позиционирование' },
    { key: 'checklist' as const, label: '✅ Чеклист' },
  ]

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🚀 Go-To-Market стратегия</h1>
        <p>Как вывести продукт на рынок: типы запуска, каналы, позиционирование.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Go-To-Market (GTM)</strong> — это план вывода продукта на рынок. Он отвечает на 3 вопроса:
          <strong>Кому?</strong> (целевая аудитория), <strong>Почему именно мы?</strong> (позиционирование) и
          <strong>Как достучаться?</strong> (каналы). Даже лучший продукт может провалиться без GTM: множество
          технически отличных продуктов проиграли конкурентам с лучшей GTM-стратегией (Betamax vs VHS, Google+ vs Facebook).
        </p>
        <div className="info-box">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <div className="info-box-title">GTM ≠ маркетинговый план</div>
            GTM — это кросс-функциональный план (продукт + маркетинг + продажи + поддержка), а не только про
            рекламу. PM отвечает за позиционирование и messaging, маркетинг — за каналы и активацию.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="tabs">
          {tabs.map(t => (
            <button key={t.key} className={`tab ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Launch Types */}
      {activeTab === 'launch' && (
        <div className="card">
          <h3>Типы запуска продукта</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {launchTypes.map(lt => (
              <div key={lt.name} style={{ padding: 16, borderRadius: 10, border: '1px solid var(--border-color)', background: 'var(--bg-main)' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>
                  {lt.emoji} {lt.name}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 10 }}>{lt.desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, marginBottom: 4 }}>✅ Плюсы</div>
                    {lt.pros.map(p => <div key={p} style={{ fontSize: '0.8rem', marginBottom: 2 }}>• {p}</div>)}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700, marginBottom: 4 }}>❌ Минусы</div>
                    {lt.cons.map(c => <div key={c} style={{ fontSize: '0.8rem', marginBottom: 2 }}>• {c}</div>)}
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  📌 Когда: {lt.when}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Channels */}
      {activeTab === 'channels' && (
        <div className="card">
          <h3>📡 Каналы привлечения</h3>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            {[
              { key: 'all' as const, label: 'Все' },
              { key: 'paid' as const, label: '💸 Платные' },
              { key: 'organic' as const, label: '🌱 Органические' },
              { key: 'partner' as const, label: '🤝 Партнёрские' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setChannelFilter(f.key)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: `1px solid ${channelFilter === f.key ? 'var(--accent-main)' : 'var(--border-color)'}`,
                  background: channelFilter === f.key ? 'var(--accent-main)' : 'var(--bg-main)',
                  color: channelFilter === f.key ? 'white' : 'var(--text-main)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredChannels.map(ch => (
              <div key={ch.name} style={{ padding: 14, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-main)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{ch.name}</span>
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    borderRadius: 12,
                    background: ch.type === 'paid' ? '#ef444420' : ch.type === 'organic' ? '#10b98120' : '#3b82f620',
                    color: ch.type === 'paid' ? '#ef4444' : ch.type === 'organic' ? '#10b981' : '#3b82f6',
                    fontWeight: 600,
                  }}>
                    {ch.type === 'paid' ? 'Платный' : ch.type === 'organic' ? 'Органический' : 'Партнёрский'}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8 }}>{ch.desc}</p>
                <div style={{ display: 'flex', gap: 16, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>Стоимость: {costEmoji[ch.cost]}</span>
                  <span>Скорость: {speedEmoji[ch.speed]}</span>
                  <span>Масштаб: {ch.scale === 'high' ? '📈' : ch.scale === 'med' ? '📊' : '📉'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Positioning Canvas */}
      {activeTab === 'positioning' && (
        <div className="card">
          <h3>🎯 Positioning Canvas</h3>
          <div className="info-box" style={{ marginBottom: 16 }}>
            <div className="info-box-icon">💡</div>
            <div className="info-box-content">
              <div className="info-box-title">Формула позиционирования</div>
              «Для <em>[аудитория]</em>, которые <em>[проблема]</em>, наш <em>[продукт]</em> — это <em>[категория]</em>,
              который <em>[ключевое отличие]</em> в отличие от <em>[альтернативы]</em>»
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {positioningCanvas.map(field => (
              <div key={field.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontWeight: 600, fontSize: '0.85rem' }}>{field.label}</label>
                <textarea
                  placeholder={field.placeholder}
                  value={canvasData[field.label] || ''}
                  onChange={e => setCanvasData(d => ({ ...d, [field.label]: e.target.value }))}
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-main)',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem',
                    minHeight: 70,
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Generated positioning statement */}
          {Object.values(canvasData).filter(Boolean).length >= 4 && (
            <div style={{ marginTop: 20, padding: 16, borderRadius: 8, background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ fontWeight: 700, marginBottom: 8, color: 'var(--accent-main)' }}>📝 Ваше позиционирование:</div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                Для <strong>{canvasData['🎯 Целевая аудитория'] || '...'}</strong>,
                которые <strong>{canvasData['😤 Проблема'] || '...'}</strong>,
                наш продукт — это <strong>{canvasData['🏆 Категория'] || '...'}</strong>,
                который <strong>{canvasData['✨ Уникальное решение'] || '...'}</strong>,
                в отличие от <strong>{canvasData['🆚 Альтернативы'] || '...'}</strong>,
                потому что <strong>{canvasData['💎 Ключевое отличие'] || '...'}</strong>.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Launch Checklist */}
      {activeTab === 'checklist' && (
        <div className="card">
          <h3>✅ Чеклист запуска</h3>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Готовность: {totalChecked} / {totalItems}
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-main)' }}>
                {totalItems > 0 ? Math.round(totalChecked / totalItems * 100) : 0}%
              </span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: 'var(--border-color)', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${totalItems > 0 ? (totalChecked / totalItems) * 100 : 0}%`,
                background: 'var(--accent-main)',
                borderRadius: 4,
                transition: 'width 0.3s',
              }} />
            </div>
          </div>

          {checklistItems.map(section => (
            <div key={section.section} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 8 }}>{section.section}</div>
              {section.items.map(item => {
                const key = `${section.section}:${item}`
                return (
                  <label
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 12px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                      background: checklist[key] ? 'rgba(16, 185, 129, 0.06)' : 'transparent',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={!!checklist[key]}
                      onChange={() => setChecklist(c => ({ ...c, [key]: !c[key] }))}
                      style={{ accentColor: 'var(--accent-main)', width: 18, height: 18 }}
                    />
                    <span style={{
                      fontSize: '0.9rem',
                      textDecoration: checklist[key] ? 'line-through' : 'none',
                      color: checklist[key] ? 'var(--text-muted)' : 'var(--text-main)',
                    }}>
                      {item}
                    </span>
                  </label>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
