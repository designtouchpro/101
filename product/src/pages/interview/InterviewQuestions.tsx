import { useState } from 'react'

interface Question {
  q: string
  a: string
  level: 'junior' | 'middle' | 'senior'
  topic: string
}

const questions: Question[] = [
  // Метрики
  { q: 'Что такое North Star Metric? Приведите пример для SaaS.', a: 'NSM — единственная метрика, которая лучше всего отражает ценность продукта для пользователя. Для SaaS: Weekly Active Users, для Slack — Messages Sent, для Zoom — Weekly Hosted Meetings. NSM должна коррелировать с retention и revenue.', level: 'junior', topic: 'Метрики' },
  { q: 'Чем DAU/MAU отличается от Stickiness? Что лучше?', a: 'DAU/MAU = Stickiness. Показывает, какая доля месячных пользователей возвращается каждый день. Для social apps хорошо >50%, для B2B SaaS >13% (3 дня из 20 рабочих). Не «лучше» — зависит от модели: для Netflix DAU/MAU не критичен, для мессенджера критичен.', level: 'middle', topic: 'Метрики' },
  { q: 'Как считать LTV? Какие ограничения метода?', a: 'LTV = ARPU × Lifetime (или ARPU / Churn Rate для подписочных). Проблемы: (1) LTV нового когорта не знаем — используем предиктивный LTV, (2) для ранних стартапов данных мало, (3) скидки и рефанды искажают ARPU. Продвинутый метод: когортный LTV с DCF.', level: 'senior', topic: 'Метрики' },
  { q: 'Что такое AARRR-воронка?', a: 'Pirate Metrics: Acquisition (как приходят) → Activation (first value) → Retention (возвращаются) → Revenue (платят) → Referral (приводят друзей). Каждый этап имеет свои метрики и способы оптимизации.', level: 'junior', topic: 'Метрики' },

  // Приоритизация
  { q: 'Расскажите про RICE и когда его использовать.', a: 'RICE = (Reach × Impact × Confidence) / Effort. Reach — сколько пользователей затронет за квартал. Impact — влияние (0.25-3). Confidence — уверенность в оценках (%). Effort — человеко-месяцы. Хорош для сравнения фичей с разным масштабом, плох когда Impact субъективен.', level: 'junior', topic: 'Приоритизация' },
  { q: 'Как выбрать между RICE, ICE, Kano и MoSCoW?', a: 'RICE — когда есть данные по reach и нужна объективность. ICE — быстрая оценка без данных. Kano — для понимания, что delighter vs must-have. MoSCoW — для scope management с дедлайном. В реальности комбинируют: Kano для категоризации, RICE для ранжирования внутри категории.', level: 'middle', topic: 'Приоритизация' },
  { q: 'Как приоритизировать tech debt vs features?', a: 'Tech debt = неявная стоимость будущей доработки. Подход: (1) Квантифицировать — сколько часов теряем в Sprint из-за debt, (2) Cost of Delay — что теряем, откладывая фичу vs debt, (3) Правило 20/80 — 20% sprint на debt. Визуализировать через «Tax Rate» — % velocity потерянного на debt.', level: 'senior', topic: 'Приоритизация' },

  // Discovery
  { q: 'Что такое Product Discovery?', a: 'Процесс поиска и валидации идей до их разработки. Цель — снизить риски: Value (нужно ли), Usability (смогут ли), Feasibility (можно ли), Viability (выгодно ли). Методы: интервью, прототипы, Wizard of Oz, A/B тесты.', level: 'junior', topic: 'Discovery' },
  { q: 'Как проводить user interview? Назовите 3 антипаттерна.', a: 'Структура: контекст → опыт → боли → задачи. Антипаттерны: (1) Наводящие вопросы «Вам же неудобно...?», (2) Спрашивать про будущее «Вы бы купили...?» (Mom Test), (3) Поиск подтверждения гипотезы вместо опровержения. Записывать facts, не мнения.', level: 'middle', topic: 'Discovery' },
  { q: 'Как определить, что гипотеза валидирована?', a: 'Заранее определить success criteria: (1) Qualitative — 7 из 10 интервью подтвердили проблему, (2) Quantitative — fake door test >5% CTR, (3) Willingness to pay — >30% готовы платить. Критично: определить criteria ДО эксперимента, иначе bias confirmation.', level: 'senior', topic: 'Discovery' },

  // Стратегия
  { q: 'Что такое Product-Market Fit?', a: 'Момент, когда продукт решает реальную проблему достаточного количества людей. Измерение: Sean Ellis test (>40% «very disappointed» если продукт исчезнет), retention plateau, organic growth. PMF — не бинарный, а спектр.', level: 'junior', topic: 'Стратегия' },
  { q: 'Как составить Go-to-Market стратегию?', a: 'GTM = кому продаём (ICP) + как доносим ценность (positioning) + через какие каналы (channels) + модель монетизации (pricing). Для B2B: Sales-led vs Product-led. Для B2C: Paid vs Organic vs Viral. Key: CAC < LTV/3.', level: 'middle', topic: 'Стратегия' },
  { q: 'Как перейти из PMF в Growth? Framework.', a: 'После PMF: (1) Определить growth model (Viral, Paid, Content), (2) Найти growth loops (замкнутые циклы), не воронки, (3) Выбрать одну метрику-рычаг, (4) Experiment velocity — больше экспериментов = быстрее рост. Ключевое: retention > acquisition.', level: 'senior', topic: 'Стратегия' },

  // Аналитика
  { q: 'Что такое когортный анализ?', a: 'Разбиение пользователей на группы (когорты) по дате регистрации и анализ их поведения во времени. Пример: % пользователей, зарегистрированных в январе, которые ещё активны в марте. Показывает тренды retention лучше среднего.', level: 'junior', topic: 'Аналитика' },
  { q: 'Как правильно провести A/B тест?', a: '1) Гипотеза с метрикой и expected lift, 2) Расчёт sample size (MDE, significance 95%, power 80%), 3) Рандомизация без bias, 4) Ждать full cycle (мин 1 неделя), 5) Проверить guardrail metrics (не навредили ли). SRM check — Sample Ratio Mismatch.', level: 'middle', topic: 'Аналитика' },
  { q: 'Как анализировать канибализацию метрик?', a: 'Канибализация: улучшение одной метрики за счёт ухудшения другой. Пример: push-уведомления повышают DAU, но снижают NPS. Решение: (1) Overall Evaluation Criterion (OEC) — взвешенная сумма метрик, (2) Guardrail metrics — красные линии, (3) Long-term holdout groups.', level: 'senior', topic: 'Аналитика' },
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
        <p>Типичные вопросы для продакт-менеджера: Junior → Senior.</p>
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
