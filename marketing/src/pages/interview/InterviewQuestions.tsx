import { useState } from 'react'

interface Question {
  q: string
  a: string
  level: 'junior' | 'middle' | 'senior'
  topic: string
}

const questions: Question[] = [
  // Основы
  { q: 'Что такое Marketing Mix (4P)? Приведите пример для SaaS.', a: 'Product — CRM-система для малого бизнеса. Price — $29/мес (freemium → paid). Place — сайт + AppStore + партнёрские интеграции. Promotion — контент-маркетинг, SEO, вебинары. 4P расширились в 7P для услуг: + People, Process, Physical Evidence.', level: 'junior', topic: 'Основы' },
  { q: 'Что такое STP и зачем он нужен?', a: 'Segmentation — разбиваем рынок на сегменты (демография, поведение, потребности). Targeting — выбираем самые привлекательные (размер, рост, конкуренция). Positioning — формулируем уникальное предложение для выбранных сегментов. Без STP маркетинг = стрельба по всем подряд.', level: 'junior', topic: 'Основы' },
  { q: 'Разница между маркетинговой и продуктовой стратегией?', a: 'Продуктовая: что мы делаем и для кого (roadmap, фичи, PMF). Маркетинговая: как мы об этом рассказываем (каналы, месседжи, позиционирование). Они пересекаются: GTM — мост между продуктом и рынком. Маркетолог не создаёт продукт, но формирует его восприятие.', level: 'middle', topic: 'Основы' },

  // Digital-каналы
  { q: 'Чем SEO отличается от SEM?', a: 'SEO (Search Engine Optimization) — органическое продвижение: контент, техническая оптимизация, ссылки. Бесплатный трафик, долгий эффект. SEM (Search Engine Marketing) — платная реклама в поиске (Google Ads). Быстрый результат, платишь за клик. Обычно используют оба: SEM для быстрого тестирования, SEO для долгосрочного.', level: 'junior', topic: 'Digital' },
  { q: 'Как выбрать каналы для B2B vs B2C?', a: 'B2B: LinkedIn, вебинары, white papers, email-nurturing, conference, ABM (Account-Based Marketing). Длинный цикл, несколько ЛПР. B2C: Instagram, TikTok, YouTube, influence-маркетинг, programmatic. Короткий цикл, эмоциональные решения. B2B = educate, B2C = entertain + convert.', level: 'middle', topic: 'Digital' },
  { q: 'Как построить омниканальную стратегию?', a: 'Омниканальность ≠ мультиканальность. Мульти: много каналов изолированно. Омни: единый customer experience через все каналы. Шаги: (1) single customer view (CDP), (2) согласованные месседжи, (3) attribution модель, (4) персонализация по стадии воронки. Ключ: данные + координация.', level: 'senior', topic: 'Digital' },

  // Аналитика
  { q: 'Какие основные метрики маркетинга?', a: 'Верхнеуровневые: CAC, LTV, ROMI (Return on Marketing Investment). Канальные: CTR, CPC, CPM, CPA. Контентные: охват, engagement rate, share of voice. Email: open rate, click rate, unsubscribe. Важно отслеживать unit economics: CAC payback period.', level: 'junior', topic: 'Аналитика' },
  { q: 'Что такое attribution и какие модели бывают?', a: 'Attribution — определение, какой канал привёл к конверсии. Модели: Last Click (последний канал), First Click (первый), Linear (поровну), Time Decay (больше веса свежим), Position-Based (40-20-40), Data-Driven (ML). Single-touch модели устарели, нужен multi-touch.', level: 'middle', topic: 'Аналитика' },
  { q: 'Как считать ROI маркетинговой кампании с attribution?', a: 'ROMI = (Revenue - Marketing Cost) / Marketing Cost × 100%. Проблема: multi-touch journey. Решение: (1) Инкрементальные тесты (geo-lift, holdout groups), (2) Media Mix Modeling (MMM), (3) Data-driven attribution в GA4. Правильный ROI = incremental revenue / cost, не просто last-click revenue.', level: 'senior', topic: 'Аналитика' },

  // Бренд
  { q: 'Что входит в бренд-платформу?', a: 'Миссия (зачем), видение (куда), ценности (как), позиционирование (чем отличаемся), Tone of Voice (как говорим), визуальная идентичность (логотип, цвета, шрифты). Бренд-платформа — внутренний документ, который определяет все коммуникации.', level: 'junior', topic: 'Бренд' },
  { q: 'Как измерить силу бренда?', a: 'Количественно: Brand Awareness (aided/unaided recall), NPS, brand search volume, Share of Voice. Качественно: brand associations, brand equity. Методики: BrandZ, Interbrand ranking. Для стартапов: direct traffic growth + branded search + NPS trend.', level: 'middle', topic: 'Бренд' },

  // Performance
  { q: 'Как настроить таргетинг в Meta Ads?', a: 'Уровни: (1) Demographics (возраст, geo, язык), (2) Interests (хобби, покупки), (3) Behaviors (device, путешествия), (4) Custom Audiences (ваша база, pixel data), (5) Lookalike (похожие на лучших клиентов). Best practice: начать с broad, потом narrowить по данным. Не перетаргетировать — аудитория выгорает.', level: 'junior', topic: 'Performance' },
  { q: 'Как оптимизировать CPA при работе с рекламой?', a: '1) Тестировать креативы (3-5 вариантов), 2) A/B тесты лендингов, 3) Оптимизировать по воронке: CPC → CTR → conv rate, 4) Bid strategy: target CPA в Google, cost cap в Meta, 5) Ретаргетинг (дешевле, чем cold), 6) Negative keywords, placement exclusions. Правило: если CPA > target 20%, пауза и анализ.', level: 'middle', topic: 'Performance' },
  { q: 'Как построить предиктивную модель маркетингового бюджета?', a: 'Подходы: (1) % от выручки (benchmark: 5-15%), (2) Target CAC × target customers, (3) Marginal ROAS — увеличиваем бюджет пока incremental ROAS > 1, (4) Media Mix Modeling — econometric model показывает оптимальное распределение. Ключ: diminishing returns — каждый следующий доллар менее эффективен.', level: 'senior', topic: 'Performance' },
]

const levels = ['junior', 'middle', 'senior'] as const
const levelConfig = {
  junior: { label: 'Junior', color: '#22c55e' },
  middle: { label: 'Middle', color: '#f59e0b' },
  senior: { label: 'Senior', color: '#ef4444' },
}

export default function InterviewQuestions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [filterLevel, setFilterLevel] = useState<string | null>(null)
  const [filterTopic, setFilterTopic] = useState<string | null>(null)

  const topics = [...new Set(questions.map(q => q.topic))]

  const filtered = questions.filter(q =>
    (!filterLevel || q.level === filterLevel) &&
    (!filterTopic || q.topic === filterTopic)
  )

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🎤 Вопросы на собеседование</h1>
        <p>Типичные вопросы для маркетолога: Junior → Senior.</p>
      </div>

      <div className="card">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <button className={`btn ${!filterLevel ? 'btn-primary' : ''}`} onClick={() => setFilterLevel(null)}>
            Все уровни
          </button>
          {levels.map(l => (
            <button key={l}
              className={`btn ${filterLevel === l ? 'btn-primary' : ''}`}
              onClick={() => setFilterLevel(filterLevel === l ? null : l)}
              style={filterLevel === l ? { background: levelConfig[l].color, borderColor: levelConfig[l].color } : {}}
            >
              {levelConfig[l].label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className={`btn ${!filterTopic ? 'btn-primary' : ''}`} onClick={() => setFilterTopic(null)}>
            Все темы
          </button>
          {topics.map(t => (
            <button key={t}
              className={`btn ${filterTopic === t ? 'btn-primary' : ''}`}
              onClick={() => setFilterTopic(filterTopic === t ? null : t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
        Показано: {filtered.length} из {questions.length} вопросов. Кликните, чтобы увидеть ответ.
      </div>

      {filtered.map((q, i) => {
        const globalIndex = questions.indexOf(q)
        return (
          <div key={globalIndex} className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }}
            onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span className="badge" style={{
                background: levelConfig[q.level].color + '20',
                color: levelConfig[q.level].color,
                flexShrink: 0,
                marginTop: 2
              }}>
                {levelConfig[q.level].label}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>{q.q}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{q.topic}</div>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                {openIndex === globalIndex ? '▲' : '▼'}
              </span>
            </div>

            {openIndex === globalIndex && (
              <div style={{
                marginTop: 12, padding: '14px 18px', borderRadius: 8,
                background: 'var(--accent-main-alpha)', fontSize: '0.9rem', lineHeight: 1.7
              }}>
                {q.a}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
