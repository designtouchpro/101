import { useState } from 'react'

const teamTypes = [
  {
    id: 'stream-aligned',
    name: 'Stream-aligned',
    title: 'Потоко-ориентированная',
    icon: '🏊',
    color: '#22c55e',
    desc: 'Основной тип. Работает на бизнес-поток (feature, product area). Доставляет ценность пользователю.',
    characteristics: [
      'Кросс-функциональная',
      'Полный цикл: разработка → тестирование → деплой → мониторинг',
      'Минимум зависимостей от других команд',
      'You build it, you run it',
    ],
    example: 'Команда «Checkout» — владеет всем, что связано с оформлением заказа',
    percentage: '60-80%',
  },
  {
    id: 'enabling',
    name: 'Enabling',
    title: 'Помогающая',
    icon: '🧑‍🏫',
    color: '#6366f1',
    desc: 'Помогает stream-aligned командам освоить новые технологии и практики. Не строит сама, а обучает.',
    characteristics: [
      'Временное взаимодействие (недели, не месяцы)',
      'Исследует и пробует новое',
      'Передаёт знания и уходит',
      'Не становится узким местом',
    ],
    example: 'SRE-команда учит команды настраивать мониторинг самостоятельно',
    percentage: '5-10%',
  },
  {
    id: 'complicated-subsystem',
    name: 'Complicated Subsystem',
    title: 'Сложная подсистема',
    icon: '🧠',
    color: '#f59e0b',
    desc: 'Владеет сложной областью, где нужна глубокая экспертиза. ML, криптография, движок рекомендаций.',
    characteristics: [
      'Глубокая специализация',
      'Предоставляет API/SDK остальным',
      'Скрывает сложность за простым интерфейсом',
      'Маленькая команда экспертов',
    ],
    example: 'Команда «ML Recommendations» — предоставляет API рекомендаций для продуктовых команд',
    percentage: '5-15%',
  },
  {
    id: 'platform',
    name: 'Platform',
    title: 'Платформенная',
    icon: '🏗️',
    color: '#a855f7',
    desc: 'Строит внутреннюю платформу, которая ускоряет stream-aligned команды. Self-service.',
    characteristics: [
      'Предоставляет self-service сервисы',
      'CI/CD, инфраструктура, шаблоны',
      'Относится к stream-aligned как к клиентам',
      'Чем меньше обращений — тем лучше платформа',
    ],
    example: 'DevOps Platform — CI/CD пайплайны, мониторинг, шаблоны деплоя',
    percentage: '15-25%',
  },
]

const interactions = [
  {
    name: 'Collaboration',
    icon: '🤝',
    desc: 'Две команды тесно работают вместе. Высокая коммуникация.',
    when: 'Запуск нового продукта, интеграция сложных систем',
    duration: 'Временно (недели)',
    color: '#22c55e',
  },
  {
    name: 'X-as-a-Service',
    icon: '🔌',
    desc: 'Одна команда предоставляет сервис. Минимум коммуникации.',
    when: 'Стабильный API, платформа, инфраструктура',
    duration: 'Постоянно',
    color: '#6366f1',
  },
  {
    name: 'Facilitating',
    icon: '🧑‍🏫',
    desc: 'Enabling команда помогает stream-aligned команде. Менторинг.',
    when: 'Обучение новым практикам, миграция',
    duration: 'Временно (дни-недели)',
    color: '#f59e0b',
  },
]

const antiPatterns = [
  { name: 'Всё через платформу', icon: '🚧', desc: 'Платформа становится узким местом. Каждый запрос проходит через одну команду.' },
  { name: 'Enabling навсегда', icon: '♾️', desc: 'Помогающая команда не уходит. Становится зависимостью вместо обучения.' },
  { name: 'Fake stream-aligned', icon: '🎭', desc: 'Команда называется stream-aligned, но зависит от 5 других команд для каждого деплоя.' },
  { name: "Conway's Revenge", icon: '📐', desc: 'Архитектура копирует орг-структуру, а не наоборот. Нужен Reverse Conway.' },
]

const quiz = [
  {
    text: 'Команда, которая делает ML-модель для рекомендаций товаров и предоставляет API другим командам',
    answer: 'complicated-subsystem',
  },
  {
    text: 'Команда из 2 SRE, которая неделю работает с продуктовой командой, чтобы настроить им observability',
    answer: 'enabling',
  },
  {
    text: 'Команда «Корзина», которая владеет всем: от UI до базы данных',
    answer: 'stream-aligned',
  },
  {
    text: 'Команда, которая поддерживает CI/CD, Kubernetes кластер и шаблоны Terraform',
    answer: 'platform',
  },
]

export default function TeamTopologies() {
  const [activeType, setActiveType] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [showQuizResults, setShowQuizResults] = useState(false)

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔷 Team Topologies</h1>
        <p>4 типа команд и 3 режима взаимодействия. Фреймворк Мэттью Скелтона и Мануэля Пайса.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Книга «Team Topologies» (2019) Мэттью Скелтона и Мануэля Пайса перевернула подход к
          организации команд. Главная идея: <strong>структура команд определяет архитектуру</strong>
          (закон Конвея). Если команды организованы неправильно, никакая архитектура не спасёт.
          Фреймворк даёт <strong>язык</strong> для обсуждения организационного дизайна.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Ключевое понятие — <strong>когнитивная нагрузка</strong>: каждая команда может эффективно владеть
          ограниченным объёмом софта. Если одна команда отвечает за 10 микросервисов —
          это перегрузка. 4 типа команд помогают распределить нагрузку осмысленно.
        </p>
        <div className="info-box">
          <div className="info-box-icon">🏛️</div>
          <div className="info-box-content">
            <div className="info-box-title">Закон Конвея</div>
            «Организации проектируют системы, копирующие структуру коммуникаций этой организации.» —
            Мелвин Конвей, 1967. Поэтому сначала проектируйте команды, потом архитектуру.
          </div>
        </div>
      </div>

      {/* Idea */}
      <div className="card">
        <h3>💡 Главная идея</h3>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
          <strong>Организуйте команды так, чтобы архитектура софта получалась правильной автоматически.</strong>
          <br />
          Закон Конуэя: система копирует коммуникационную структуру организации.
          <br />
          Team Topologies предлагает использовать это <strong>осознанно</strong> — Reverse Conway Maneuver.
        </p>
      </div>

      {/* 4 Types */}
      <div className="card">
        <h3>4 типа команд</h3>
        <div className="tabs">
          {teamTypes.map((t, i) => (
            <button key={t.id} className={`tab ${activeType === i ? 'active' : ''}`} onClick={() => setActiveType(i)}>
              {t.icon} {t.title}
            </button>
          ))}
        </div>

        {(() => {
          const t = teamTypes[activeType]
          return (
            <div style={{ borderLeft: `4px solid ${t.color}`, paddingLeft: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: '2rem' }}>{t.icon}</span>
                <div>
                  <h4 style={{ color: t.color }}>{t.name}</h4>
                  <span className="tag" style={{ background: `${t.color}20`, color: t.color }}>
                    ~{t.percentage} команд в организации
                  </span>
                </div>
              </div>

              <p style={{ marginBottom: 12 }}>{t.desc}</p>

              <h4 style={{ fontSize: '0.9rem', marginBottom: 8 }}>Характеристики:</h4>
              <ul>
                {t.characteristics.map((c, i) => <li key={i}>{c}</li>)}
              </ul>

              <div className="info-box" style={{ marginTop: 12, borderColor: t.color }}>
                <div className="info-box-icon">💡</div>
                <div className="info-box-content">
                  <div className="info-box-title">Пример</div>
                  {t.example}
                </div>
              </div>
            </div>
          )
        })()}
      </div>

      {/* Visual */}
      <div className="card">
        <h3>🗺️ Визуализация</h3>
        <div style={{
          padding: 20,
          background: 'var(--bg-code)',
          borderRadius: 12,
          fontFamily: 'monospace',
          fontSize: '0.8rem',
          lineHeight: 2.2,
          overflowX: 'auto',
        }}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            {teamTypes.map(t => (
              <div key={t.id} style={{
                padding: '12px 20px',
                borderRadius: 10,
                border: `2px solid ${t.color}`,
                background: `${t.color}10`,
                textAlign: 'center',
                minWidth: 120,
              }}>
                <div style={{ fontSize: '1.5rem' }}>{t.icon}</div>
                <div style={{ fontWeight: 700, color: t.color, fontSize: '0.75rem' }}>{t.name}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{t.percentage}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', margin: '16px 0', color: 'var(--text-muted)' }}>
            ↕️ Взаимодействие ↕️
          </div>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {interactions.map(i => (
              <div key={i.name} style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: `1px dashed ${i.color}`,
                textAlign: 'center',
                fontSize: '0.8rem',
              }}>
                {i.icon} {i.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interaction Modes */}
      <div className="card">
        <h3>🔗 3 режима взаимодействия</h3>
        <div className="grid-3">
          {interactions.map(i => (
            <div key={i.name} className="scenario-card" style={{ marginBottom: 0, borderColor: i.color }}>
              <span style={{ fontSize: '1.5rem' }}>{i.icon}</span>
              <h4 style={{ color: i.color }}>{i.name}</h4>
              <p style={{ fontSize: '0.85rem' }}>{i.desc}</p>
              <div style={{ marginTop: 8, fontSize: '0.8rem' }}>
                <div><strong>Когда:</strong> {i.when}</div>
                <div><strong>Длительность:</strong> {i.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Anti-patterns */}
      <div className="card">
        <h3>🚫 Анти-паттерны</h3>
        <div className="grid-2">
          {antiPatterns.map(a => (
            <div key={a.name} className="scenario-card" style={{ marginBottom: 0 }}>
              <h4>{a.icon} {a.name}</h4>
              <p style={{ fontSize: '0.85rem' }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz */}
      <div className="card">
        <h3>🎮 Квиз: определи тип команды</h3>
        {quiz.map((q, idx) => (
          <div key={idx} className="scenario-card">
            <p style={{ marginBottom: 12 }}>{q.text}</p>
            <div className="scenario-options">
              {teamTypes.map(t => (
                <button
                  key={t.id}
                  className={`scenario-option ${
                    showQuizResults
                      ? t.id === q.answer
                        ? 'correct'
                        : quizAnswers[idx] === t.id ? 'wrong' : ''
                      : quizAnswers[idx] === t.id ? 'selected' : ''
                  }`}
                  onClick={() => !showQuizResults && setQuizAnswers(prev => ({ ...prev, [idx]: t.id }))}
                >
                  {t.icon} {t.title}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="controls">
          <button
            className="btn btn-primary"
            onClick={() => setShowQuizResults(true)}
            disabled={Object.keys(quizAnswers).length < quiz.length || showQuizResults}
          >
            Проверить
          </button>
          <button className="btn btn-secondary"
            onClick={() => { setQuizAnswers({}); setShowQuizResults(false) }}
          >
            Сбросить
          </button>
        </div>

        {showQuizResults && (
          <div className="score-display" style={{ marginTop: 16 }}>
            <div className="score-number">
              {Object.entries(quizAnswers).filter(([idx, a]) => quiz[Number(idx)].answer === a).length}/{quiz.length}
            </div>
            <div className="score-label">правильных ответов</div>
          </div>
        )}
      </div>
    </div>
  )
}
