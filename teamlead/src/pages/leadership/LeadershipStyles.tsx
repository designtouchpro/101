import { useState } from 'react'

const styles = [
  {
    id: 'autocratic',
    name: 'Автократический',
    icon: '👑',
    color: '#ef4444',
    motto: '«Делай как я сказал»',
    desc: 'Лидер принимает все решения единолично. Команда выполняет указания.',
    when: ['Кризис, горящий продакшен', 'Новичок, которому нужен чёткий план', 'Жёсткий дедлайн без права на ошибку'],
    notWhen: ['Опытная самостоятельная команда', 'Творческие или исследовательские задачи', 'Долгосрочные проекты — люди выгорят'],
    teamEffect: { motivation: 20, speed: 90, quality: 60, growth: 10 },
    example: 'Продакшен упал в пятницу вечером. Тимлид: «Петя, откатывай деплой. Маша, смотри логи. Артём, ставь заглушку. Делаем прямо сейчас.»'
  },
  {
    id: 'democratic',
    name: 'Демократический',
    icon: '🗳️',
    color: '#6366f1',
    motto: '«Давайте обсудим»',
    desc: 'Решения принимаются коллективно. Лидер фасилитирует обсуждение.',
    when: ['Выбор архитектурного решения', 'Неспешный бэклог-груминг', 'Создание код-стандартов команды'],
    notWhen: ['Аварийные ситуации', 'Когда нет времени на обсуждение', 'Когда в команде нет экспертизы для принятия решения'],
    teamEffect: { motivation: 80, speed: 40, quality: 75, growth: 70 },
    example: 'Команда выбирает между Redux и Zustand. Тимлид: «Давайте каждый за 5 минут расскажет плюсы/минусы, потом проголосуем.»'
  },
  {
    id: 'servant',
    name: 'Servant Leader',
    icon: '🤲',
    color: '#22c55e',
    motto: '«Чем я могу помочь?»',
    desc: 'Лидер убирает препятствия и создаёт условия для продуктивности команды.',
    when: ['Зрелая, мотивированная команда', 'Команда, которой мешает бюрократия', 'Длительная работа над продуктом'],
    notWhen: ['Джуны без опыта', 'Команда без самодисциплины', 'Нет понятных процессов — будет хаос'],
    teamEffect: { motivation: 95, speed: 60, quality: 85, growth: 90 },
    example: 'Разработчик жалуется, что тестировщик долго проверяет PR. Тимлид договаривается с QA-лидом о SLA на ревью.'
  },
  {
    id: 'coaching',
    name: 'Коуч',
    icon: '🧑‍🏫',
    color: '#f59e0b',
    motto: '«А как ты думаешь?»',
    desc: 'Лидер задаёт вопросы, помогая человеку найти решение самостоятельно.',
    when: ['Развитие мидлов в сеньоров', 'Менторинг джунов на некритичных задачах', '1-on-1 встречи'],
    notWhen: ['Горит прод', 'Человек не хочет развиваться', 'Нет времени на обучение'],
    teamEffect: { motivation: 85, speed: 30, quality: 70, growth: 95 },
    example: 'Джун спрашивает, какой паттерн использовать. Тимлид: «Какие варианты ты видишь? Какие плюсы/минусы каждого? Что будет, если данных станет в 10 раз больше?»'
  },
]

const scenarios = [
  {
    text: 'Пятница, 18:00. Главный API-сервис начал возвращать 500-ые ошибки. У 30% пользователей не загружается приложение.',
    correct: 'autocratic',
    explanation: 'Кризис! Нужно быстро распределить задачи и координировать действия. Демократия потом, сейчас — чёткие указания.'
  },
  {
    text: 'Команда уже полгода работает на проекте. Нужно решить: мигрировать на новый фреймворк или остаться на текущем.',
    correct: 'democratic',
    explanation: 'Стратегическое решение, у всех есть экспертиза. Обсуждение даст лучшее решение и buy-in от команды.'
  },
  {
    text: 'Сильный мидл хочет стать сеньором. Он взял сложную задачу, но застрял на проектировании.',
    correct: 'coaching',
    explanation: 'Задать наводящие вопросы. Не давать готовое решение — дать возможность вырасти.'
  },
  {
    text: 'Опытная команда жалуется, что не может нормально работать из-за постоянных мітингов с другими отделами.',
    correct: 'servant',
    explanation: 'Команда сильная и знает что делать. Задача лидера — убрать помехи, договориться о защите времени.'
  },
  {
    text: 'В команду пришёл новичок. Первая неделя. Ему нужно сделать первый тикет.',
    correct: 'autocratic',
    explanation: 'Новичку нужна чёткая структура: вот задача, вот как настроить окружение, вот кого спросить. Потом перейдём к коучингу.'
  },
]

export default function LeadershipStyles() {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState<Record<number, boolean>>({})

  const handleAnswer = (scenarioIdx: number, styleId: string) => {
    setScenarioAnswers(prev => ({ ...prev, [scenarioIdx]: styleId }))
    setShowResults(prev => ({ ...prev, [scenarioIdx]: true }))
  }

  const score = Object.entries(scenarioAnswers).filter(
    ([idx, answer]) => scenarios[Number(idx)].correct === answer
  ).length

  const allAnswered = Object.keys(scenarioAnswers).length === scenarios.length

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🎭 Стили лидерства</h1>
        <p>Нет одного «правильного» стиля. Хороший тимлид переключается между ними в зависимости от ситуации.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Концепция <strong>ситуационного лидерства</strong> (Hersey & Blanchard, 1969) гласит: не существует одного
          универсального стиля управления. Эффективный лидер адаптирует подход в зависимости от <strong>зрелости команды</strong>,
          <strong>сложности задачи</strong> и <strong>контекста ситуации</strong>. Автократ в кризисе — герой, автократ при разработке стратегии — тиран.
          Коуч для джуна — ментор, коуч при пожаре в проде — тормоз.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Дэниел Гоулман в книге «Эмоциональное лидерство» выделил 6 стилей и доказал, что руководители,
          владеющие 4+ стилями, показывают лучший бизнес-результат. Переключение между стилями — это
          <strong>навык</strong>, который можно и нужно тренировать осознанно.
        </p>
        <div className="info-box">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <div className="info-box-title">Ключевой принцип</div>
            Спрашивайте себя: «Что сейчас нужно <em>этому</em> человеку в <em>этой</em> ситуации?» — а не «Какой стиль мне удобнее?»
          </div>
        </div>
      </div>

      {/* Styles Overview */}
      <div className="grid-2">
        {styles.map(s => (
          <div
            key={s.id}
            className="card"
            style={{
              cursor: 'pointer',
              borderColor: selectedStyle === s.id ? s.color : undefined,
              boxShadow: selectedStyle === s.id ? `0 0 20px ${s.color}33` : undefined
            }}
            onClick={() => setSelectedStyle(selectedStyle === s.id ? null : s.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: '2rem' }}>{s.icon}</span>
              <div>
                <h3 style={{ marginBottom: 0 }}>{s.name}</h3>
                <span style={{ color: s.color, fontSize: '0.85rem', fontStyle: 'italic' }}>{s.motto}</span>
              </div>
            </div>
            <p style={{ marginBottom: 12 }}>{s.desc}</p>

            {selectedStyle === s.id && (
              <>
                <div style={{ marginBottom: 16 }}>
                  <strong style={{ color: 'var(--accent-green)' }}>✅ Когда работает:</strong>
                  <ul>
                    {s.when.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <strong style={{ color: 'var(--accent-red)' }}>❌ Когда НЕ работает:</strong>
                  <ul>
                    {s.notWhen.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                </div>
                <div className="info-box" style={{ borderColor: s.color, background: `${s.color}15` }}>
                  <div className="info-box-icon">💡</div>
                  <div className="info-box-content">
                    <div className="info-box-title">Пример</div>
                    {s.example}
                  </div>
                </div>

                {/* Effect meters */}
                <div style={{ marginTop: 16 }}>
                  <h4 style={{ marginBottom: 8, fontSize: '0.9rem' }}>Влияние на команду</h4>
                  {Object.entries(s.teamEffect).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 2 }}>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {{ motivation: '💪 Мотивация', speed: '⚡ Скорость', quality: '🎯 Качество', growth: '📈 Рост' }[key]}
                        </span>
                        <span>{value}%</span>
                      </div>
                      <div className="meter">
                        <div
                          className={`meter-fill ${value > 70 ? 'green' : value > 40 ? 'orange' : 'red'}`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Quiz */}
      <div className="card" style={{ marginTop: 32 }}>
        <h3>🎮 Квиз: какой стиль применить?</h3>
        <p style={{ marginBottom: 20 }}>Для каждой ситуации выберите наиболее подходящий стиль лидерства.</p>

        {scenarios.map((scenario, idx) => (
          <div key={idx} className="scenario-card">
            <h4>Ситуация {idx + 1}</h4>
            <p>{scenario.text}</p>
            <div className="scenario-options">
              {styles.map(s => (
                <button
                  key={s.id}
                  className={`scenario-option ${
                    showResults[idx]
                      ? scenarioAnswers[idx] === s.id
                        ? s.id === scenario.correct ? 'correct' : 'wrong'
                        : s.id === scenario.correct ? 'correct' : ''
                      : scenarioAnswers[idx] === s.id ? 'selected' : ''
                  }`}
                  onClick={() => !showResults[idx] && handleAnswer(idx, s.id)}
                  disabled={showResults[idx]}
                >
                  {s.icon} {s.name}
                </button>
              ))}
            </div>
            {showResults[idx] && (
              <div className={`scenario-feedback ${scenarioAnswers[idx] === scenario.correct ? 'correct' : 'wrong'}`}>
                {scenarioAnswers[idx] === scenario.correct ? '✅ ' : '❌ '}
                {scenario.explanation}
              </div>
            )}
          </div>
        ))}

        {allAnswered && (
          <div className="score-display">
            <div className="score-number">{score}/{scenarios.length}</div>
            <div className="score-label">
              {score === scenarios.length ? 'Отлично! Вы отлично разбираетесь в ситуативном лидерстве!' :
               score >= 3 ? 'Хорошо! Но есть над чем поработать.' :
               'Стоит перечитать теорию — пока нет чёткого понимания.'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
