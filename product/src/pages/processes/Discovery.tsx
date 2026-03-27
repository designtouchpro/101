import { useState } from 'react'

type DiscoveryMethod = 'custdev' | 'jtbd' | 'lean-canvas' | 'opportunity'

interface Method {
  key: DiscoveryMethod
  name: string
  icon: string
  what: string
  when: string
  steps: string[]
  example: string
}

const methods: Method[] = [
  {
    key: 'custdev', name: 'CustDev', icon: '🎤',
    what: 'Customer Development — разговор с клиентами для проверки гипотез.',
    when: 'Когда вы не уверены, существует ли проблема.',
    steps: [
      'Сформулируйте гипотезу ("Мы думаем, что...")',
      'Найдите 10 представителей ЦА',
      'Проведите проблемное интервью (не продавайте!)',
      'Зафиксируйте паттерны',
      'Решите: разворот (pivot) или продолжение (persevere)',
    ],
    example: 'Гипотеза: "Разработчики тратят много времени на код-ревью". Интервью показали: проблема не во времени, а в качестве фидбека.',
  },
  {
    key: 'jtbd', name: 'Jobs to be Done', icon: '🔨',
    what: 'Люди не покупают продукт — они "нанимают" его для выполнения задачи (Job).',
    when: 'Когда хотите понять мотивацию на глубоком уровне.',
    steps: [
      'Определите Job: "Когда _____, я хочу _____, чтобы _____"',
      'Выявите силы: Толчок (Push), Притяжение (Pull), Тревога (Anxiety), Привычка (Habit)',
      'Найдите конкурирующие "найм-решения"',
      'Определите метрики результата (outcome metrics)',
    ],
    example: 'Job: "Когда я еду на работу утром, я хочу что-то съесть одной рукой, чтобы не скучать в пробке" → milkshake побеждает банан.',
  },
  {
    key: 'lean-canvas', name: 'Lean Canvas', icon: '📄',
    what: '1-страничная бизнес-модель для стартапов (Ash Maurya).',
    when: 'Когда нужно быстро описать бизнес-модель для новой идеи.',
    steps: [
      'Problem: 3 главные проблемы ЦА',
      'Customer Segments: кто ваш клиент',
      'Unique Value Proposition: чем вы лучше',
      'Solution: как вы решаете проблему',
      'Channels: как доберётесь до клиента',
      'Revenue Streams: как зарабатываете',
      'Cost Structure: главные расходы',
      'Key Metrics: что измеряете',
      'Unfair Advantage: что нельзя скопировать',
    ],
    example: 'Uber Lean Canvas: Problem=дорого/долго ловить такси, UVP=машина за 5 минут через телефон.',
  },
  {
    key: 'opportunity', name: 'Opportunity Tree', icon: '🌳',
    what: 'Визуальный фреймворк Teresa Torres для continuous discovery.',
    when: 'Когда нужно связать бизнес-цели с конкретными экспериментами.',
    steps: [
      'Определите Outcome (бизнес-цель)',
      'Найдите Opportunities (инсайты из исследований)',
      'Сгенерируйте Solutions для каждой возможности',
      'Спроектируйте Experiments для каждого решения',
      'Запустите, измерьте, итерируйте',
    ],
    example: 'Outcome: ↑ D7 retention → Opportunity: "юзеры не понимают ценность" → Solution: пошаговый онборд → Experiment: A/B тест нового flow.',
  },
]

export default function Discovery() {
  const [activeMethod, setActiveMethod] = useState<DiscoveryMethod>('custdev')
  const [custdevHypothesis, setCustdevHypothesis] = useState('')
  const [custdevQuestions, setCustdevQuestions] = useState<string[]>(['', '', ''])

  const method = methods.find(m => m.key === activeMethod)!

  const badQuestions = [
    { bad: 'Вам понравилась бы такая фича?', why: 'Люди говорят "да" из вежливости', good: 'Расскажите, как вы сейчас решаете эту задачу?' },
    { bad: 'Вы бы заплатили за это?', why: 'Гипотетические деньги ≠ реальные', good: 'Сколько вы тратите на текущее решение?' },
    { bad: 'Что бы вы хотели в продукте?', why: 'Пользователи — не дизайнеры', good: 'Что вас больше всего раздражает в текущем процессе?' },
  ]

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔍 Product Discovery</h1>
        <p>Как понять, что строить — прежде чем строить.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Product Discovery</strong> — это процесс поиска ответов на 4 вопроса: ценно ли это пользователю?
          Можем ли мы это построить? Это жизнеспособно как бизнес? Пользователь сможет разобраться?
          Тереза Торрес в книге «Continuous Discovery Habits» предложила рамку:
          <strong>Opportunity Solution Tree</strong> — дерево, связывающее результат (outcome) → возможности → решения → эксперименты.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Главный риск продуктовой разработки — построить то, <strong>что никому не нужно</strong>. По данным Pendo, 80% фич
          в SaaS-продуктах используются редко или никогда. Discovery помогает <strong>валидировать идеи до написания кода</strong>,
          экономя недели и месяцы разработки.
        </p>
        <div className="info-box">
          <div className="info-box-icon">🎯</div>
          <div className="info-box-content">
            <div className="info-box-title">Discovery ≠ исследование ради исследования</div>
            Каждый эксперимент должен отвечать на конкретный риск. Если результат исследования не меняет
            ваше решение — исследование было бесполезным.
          </div>
        </div>
      </div>

      {/* Method Tabs */}
      <div className="tabs">
        {methods.map(m => (
          <button
            key={m.key}
            className={`tab ${activeMethod === m.key ? 'active' : ''}`}
            onClick={() => setActiveMethod(m.key)}
          >
            {m.icon} {m.name}
          </button>
        ))}
      </div>

      {/* Method Details */}
      <div className="card">
        <h3>{method.icon} {method.name}</h3>
        <p style={{ marginBottom: 8 }}>{method.what}</p>
        <div className="tag emerald" style={{ marginBottom: 16 }}>⏰ {method.when}</div>

        <h4 style={{ marginBottom: 8 }}>Шаги:</h4>
        <div className="timeline">
          {method.steps.map((step, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-content">
                <strong>Шаг {i + 1}:</strong> {step}
              </div>
            </div>
          ))}
        </div>

        <div className="info-box" style={{ marginTop: 16 }}>
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <div className="info-box-title">Пример</div>
            {method.example}
          </div>
        </div>
      </div>

      {/* CustDev Interactive */}
      {activeMethod === 'custdev' && (
        <div className="card">
          <h3>🎤 Практика: подготовь CustDev</h3>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
              Ваша гипотеза:
            </label>
            <input
              className="input"
              placeholder='Мы думаем, что [ЦА] имеет проблему с [X], потому что...'
              value={custdevHypothesis}
              onChange={e => setCustdevHypothesis(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
              3 вопроса для интервью:
            </label>
            {custdevQuestions.map((q, i) => (
              <input
                key={i}
                className="input"
                placeholder={`Вопрос ${i + 1}`}
                value={q}
                onChange={e => setCustdevQuestions(prev => prev.map((v, idx) => idx === i ? e.target.value : v))}
                style={{ marginBottom: 8 }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bad vs Good Questions */}
      {activeMethod === 'custdev' && (
        <div className="card">
          <h3>🚫 Плохие vs ✅ Хорошие вопросы</h3>
          <p style={{ marginBottom: 12 }}>Главное правило: <strong>никогда не спрашивайте про будущее</strong>. Спрашивайте про прошлое.</p>
          {badQuestions.map((bq, i) => (
            <div key={i} className="grid-2" style={{ marginBottom: 12 }}>
              <div className="info-box error" style={{ margin: 0 }}>
                <div className="info-box-content">
                  <div className="info-box-title">🚫 {bq.bad}</div>
                  {bq.why}
                </div>
              </div>
              <div className="info-box success" style={{ margin: 0 }}>
                <div className="info-box-content">
                  <div className="info-box-title">✅ {bq.good}</div>
                  Фокус на реальном поведении
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* JTBD Interactive */}
      {activeMethod === 'jtbd' && (
        <div className="card">
          <h3>🔨 Forces Diagram</h3>
          <p style={{ marginBottom: 16 }}>Четыре силы, влияющие на решение «переключиться» на новый продукт:</p>
          <div className="matrix" style={{ maxWidth: 450 }}>
            <div className="matrix-quadrant top-left" style={{ background: 'rgba(34, 197, 94, 0.15)' }}>
              <h4>Толчок (Push) 👈</h4>
              <p>Что не устраивает в текущем решении</p>
            </div>
            <div className="matrix-quadrant top-right" style={{ background: 'rgba(59, 130, 246, 0.15)' }}>
              <h4>Притяжение (Pull) 🧲</h4>
              <p>Что привлекает в новом решении</p>
            </div>
            <div className="matrix-quadrant bottom-left" style={{ background: 'rgba(245, 158, 11, 0.15)' }}>
              <h4>Тревога (Anxiety) 😰</h4>
              <p>Страхи: «а вдруг не сработает?»</p>
            </div>
            <div className="matrix-quadrant bottom-right" style={{ background: 'rgba(239, 68, 68, 0.15)' }}>
              <h4>Привычка (Habit) 🔄</h4>
              <p>«Я привык к старому, не хочу менять»</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 12 }}>
            Push + Pull {'>'} Anxiety + Habit → пользователь переключится
          </p>
        </div>
      )}

      {/* Opportunity Tree Interactive */}
      {activeMethod === 'opportunity' && (
        <div className="card">
          <h3>🌳 Пример Opportunity Tree</h3>
          <div style={{ background: 'var(--bg-code)', borderRadius: 12, padding: 20, fontFamily: 'monospace', fontSize: '0.85rem' }}>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <span className="tag emerald" style={{ fontSize: '0.9rem', padding: '6px 16px' }}>🎯 Outcome: ↑ D7 Retention с 25% до 40%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>├──────────────┼──────────────┤</div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
              <span className="tag blue">💡 Юзеры не понимают ценность</span>
              <span className="tag blue">💡 Нет причин вернуться</span>
              <span className="tag blue">💡 Onboarding слишком длинный</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>├────┼────┤</div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
              <span className="tag purple">🔧 Пошаговый тур</span>
              <span className="tag purple">🔧 Email D1/D3/D7</span>
              <span className="tag purple">🔧 Push-уведомления</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>├──┼──┤</div>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 8 }}>
              <span className="tag orange">🧪 A/B тур vs без</span>
              <span className="tag orange">🧪 3 vs 5 шагов онборда</span>
              <span className="tag orange">🧪 Разные CTA в email</span>
            </div>
          </div>
        </div>
      )}

      {/* Материалы */}
      <div className="card">
        <h3>📚 Материалы для изучения</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="https://ru.wikipedia.org/wiki/Дизайн-мышление" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Дизайн-мышление — Википедия
          </a>
          <a href="https://ru.wikipedia.org/wiki/Бережливый_стартап" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Lean Startup — Википедия
          </a>
        </div>
      </div>
    </div>
  )
}
