import { useState } from 'react'

interface Channel {
  id: string
  icon: string
  name: string
  type: 'organic' | 'paid' | 'owned'
  cost: 'low' | 'medium' | 'high'
  speed: 'slow' | 'medium' | 'fast'
  scalability: 'low' | 'medium' | 'high'
  bestFor: string
  metrics: string[]
  tips: string[]
}

const channels: Channel[] = [
  {
    id: 'seo', icon: '🔍', name: 'SEO', type: 'organic', cost: 'low', speed: 'slow', scalability: 'high',
    bestFor: 'Контентные сайты, SaaS, маркетплейсы',
    metrics: ['Органический трафик', 'Позиции по ключевым словам', 'Domain Authority', 'CTR в поиске'],
    tips: ['Фокус на long-tail ключевики', 'Техническое SEO: скорость, мобильность', 'Качественный контент > количество', 'Внутренняя перелинковка'],
  },
  {
    id: 'smm', icon: '📱', name: 'SMM', type: 'organic', cost: 'medium', speed: 'medium', scalability: 'medium',
    bestFor: 'B2C, бренды, community-driven продукты',
    metrics: ['Охват', 'Engagement Rate', 'Подписчики', 'Share of Voice'],
    tips: ['Регулярный постинг', 'Видео > текст > картинки', 'Вовлекайте аудиторию (опросы, вопросы)', 'Используйте UGC (User Generated Content)'],
  },
  {
    id: 'email', icon: '📧', name: 'Email-маркетинг', type: 'owned', cost: 'low', speed: 'fast', scalability: 'high',
    bestFor: 'Любой бизнес с базой подписчиков',
    metrics: ['Open Rate (15-25%)', 'Click Rate (2-5%)', 'Unsubscribe Rate', 'Revenue per Email'],
    tips: ['Сегментируйте базу', 'Персонализация (имя, поведение)', 'A/B тестируйте темы писем', 'Не спамьте — 1-2 раза в неделю'],
  },
  {
    id: 'content', icon: '✍️', name: 'Контент-маркетинг', type: 'organic', cost: 'medium', speed: 'slow', scalability: 'high',
    bestFor: 'B2B, SaaS, edtech, expert-led бизнесы',
    metrics: ['Трафик на блог', 'Время на странице', 'Конверсия в лида', 'Шеры и бэклинки'],
    tips: ['Блог + вебинары + подкасты', 'Hub & Spoke модель контента', 'Evergreen контент vs trending', 'Переиспользуйте контент в разных форматах'],
  },
  {
    id: 'ppc', icon: '💳', name: 'PPC (контекстная реклама)', type: 'paid', cost: 'high', speed: 'fast', scalability: 'high',
    bestFor: 'Ready-to-buy аудитория, лидогенерация',
    metrics: ['CPC', 'CTR', 'Conversion Rate', 'ROAS', 'Quality Score'],
    tips: ['Начинайте с брендовых запросов', 'Негативные ключевики!', 'A/B тестируйте объявления', 'Ретаргетинг для тёплой аудитории'],
  },
  {
    id: 'social-ads', icon: '🎯', name: 'Таргетированная реклама', type: 'paid', cost: 'high', speed: 'fast', scalability: 'high',
    bestFor: 'B2C, мобильные приложения, масштабирование',
    metrics: ['CPM', 'CPA', 'ROAS', 'Frequency', 'Reach'],
    tips: ['Look-alike аудитории', 'Креатив — 80% успеха', 'Тестируйте 5+ креативов', 'Pixel/SDK для отслеживания'],
  },
  {
    id: 'pr', icon: '📰', name: 'PR и медиа', type: 'organic', cost: 'medium', speed: 'medium', scalability: 'medium',
    bestFor: 'Запуски, B2B, репутация',
    metrics: ['Mentions', 'Share of Voice', 'Sentiment', 'Referral traffic'],
    tips: ['Product Hunt, TechCrunch, Habr', 'Готовьте пресс-кит', 'Экспертные комментарии', 'Кризисный PR-план'],
  },
  {
    id: 'referral', icon: '🤝', name: 'Реферальная программа', type: 'organic', cost: 'low', speed: 'medium', scalability: 'high',
    bestFor: 'Продукты с WOM-потенциалом (Dropbox, Tesla)',
    metrics: ['Referral Rate', 'K-factor', 'Viral Coefficient', 'CAC рефералов'],
    tips: ['Двустороннее вознаграждение', 'Простая механика шеринга', 'Обязательно отслеживайте', 'Интеграция в продукт'],
  },
]

const costColors = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' }
const speedColors = { slow: '#ef4444', medium: '#f59e0b', fast: '#22c55e' }

export default function DigitalChannels() {
  const [selectedType, setSelectedType] = useState<'all' | 'organic' | 'paid' | 'owned'>('all')
  const [expandedId, setExpandedId] = useState<string | null>('seo')

  const filtered = selectedType === 'all' ? channels : channels.filter(c => c.type === selectedType)

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📱 Каналы продвижения</h1>
        <p>Обзор основных каналов digital-маркетинга: когда использовать и как измерять.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Каналы продвижения</strong> — это точки контакта с аудиторией, через которые вы доносите сообщение и получаете отклик.
          Каналы делятся на три группы: <strong>Owned</strong> (собственные — сайт, блог, email-рассылка, приложение), <strong>Paid</strong> (платные — контекстная реклама, таргет, спонсорство), <strong>Earned</strong> (заслуженные — PR, UGC, вирусный контент, сарафанное радио).
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Ключевой принцип — <strong>omnichannel</strong>: каналы должны работать как единая система, а не изолированно. 
          Пользователь увидел рекламу в Instagram, зашёл на сайт, получил email, вернулся через ретаргетинг и купил. 
          Без сквозной аналитики вы припишете конверсию последнему каналу и отключите первый — который по факту всё запустил.
          Для каждого канала считайте CAC (стоимость привлечения) и выбирайте микс на основе данных, а не интуиции.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>💡 Правило</strong>: Не распыляйтесь на все каналы. Начните с 2-3, которые лучше всего 
            подходят вашей аудитории. Освойте их до уровня предсказуемого ROI, 
            затем добавляйте следующие. Лучше 2 канала на отлично, чем 8 на тройку.
          </div>
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { id: 'all' as const, label: '🌐 Все' },
          { id: 'organic' as const, label: '🌱 Органические' },
          { id: 'paid' as const, label: '💳 Платные' },
          { id: 'owned' as const, label: '🏠 Собственные' },
        ].map(f => (
          <button key={f.id} className={`btn ${selectedType === f.id ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedType(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Channel list */}
      {filtered.map(ch => {
        const expanded = expandedId === ch.id
        return (
          <div key={ch.id} className="card" style={{ cursor: 'pointer' }} onClick={() => setExpandedId(expanded ? null : ch.id)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <h3 style={{ margin: 0 }}>{ch.icon} {ch.name}</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{
                  fontSize: '0.7rem', padding: '2px 8px', borderRadius: 10,
                  background: ch.type === 'organic' ? '#22c55e20' : ch.type === 'paid' ? '#ef444420' : '#3b82f620',
                  color: ch.type === 'organic' ? '#22c55e' : ch.type === 'paid' ? '#ef4444' : '#3b82f6',
                }}>
                  {ch.type === 'organic' ? '🌱 Органический' : ch.type === 'paid' ? '💳 Платный' : '🏠 Собственный'}
                </span>
              </div>
            </div>

            {expanded && (
              <div style={{ marginTop: 16 }} onClick={e => e.stopPropagation()}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
                  <strong>Лучше всего для:</strong> {ch.bestFor}
                </div>

                <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Стоимость', value: ch.cost, colors: costColors },
                    { label: 'Скорость', value: ch.speed, colors: speedColors },
                    { label: 'Масштабируемость', value: ch.scalability, colors: { low: '#ef4444', medium: '#f59e0b', high: '#22c55e' } },
                  ].map(m => (
                    <div key={m.label} style={{ fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{m.label}: </span>
                      <span style={{
                        padding: '1px 8px', borderRadius: 8,
                        background: `${m.colors[m.value as keyof typeof m.colors]}20`,
                        color: m.colors[m.value as keyof typeof m.colors], fontWeight: 600,
                      }}>
                        {m.value === 'low' || m.value === 'slow' ? 'Низкая' : m.value === 'medium' ? 'Средняя' : m.value === 'high' || m.value === 'fast' ? 'Высокая' : m.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid-2">
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-main)', marginBottom: 6 }}>📊 Ключевые метрики</h4>
                    {ch.metrics.map(m => (
                      <div key={m} style={{ fontSize: '0.8rem', padding: '4px 8px', background: 'var(--bg-secondary)', borderRadius: 4, marginBottom: 3 }}>
                        {m}
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: '#22c55e', marginBottom: 6 }}>💡 Советы</h4>
                    {ch.tips.map(t => (
                      <div key={t} style={{ fontSize: '0.8rem', padding: '4px 8px', background: '#22c55e08', borderLeft: '2px solid #22c55e', borderRadius: 4, marginBottom: 3 }}>
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Comparison matrix */}
      <div className="card">
        <h3>📋 Сводная таблица каналов</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ textAlign: 'left', padding: 8, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Канал</th>
                <th style={{ textAlign: 'center', padding: 8, fontSize: '0.75rem', color: 'var(--text-muted)' }}>💰 Cost</th>
                <th style={{ textAlign: 'center', padding: 8, fontSize: '0.75rem', color: 'var(--text-muted)' }}>⚡ Speed</th>
                <th style={{ textAlign: 'center', padding: 8, fontSize: '0.75rem', color: 'var(--text-muted)' }}>📈 Scale</th>
              </tr>
            </thead>
            <tbody>
              {channels.map(ch => (
                <tr key={ch.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: 8, fontSize: '0.8rem' }}>{ch.icon} {ch.name}</td>
                  {[
                    { v: ch.cost, c: costColors },
                    { v: ch.speed, c: speedColors },
                    { v: ch.scalability, c: { low: '#ef4444', medium: '#f59e0b', high: '#22c55e' } },
                  ].map((item, i) => (
                    <td key={i} style={{ textAlign: 'center', padding: 4 }}>
                      <span style={{
                        display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                        background: item.c[item.v as keyof typeof item.c],
                      }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
