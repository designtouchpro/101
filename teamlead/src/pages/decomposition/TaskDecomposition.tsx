import { useState } from 'react'

const investCriteria = [
  { letter: 'I', name: 'Independent', title: 'Независимая', desc: 'Задача не зависит от других. Можно взять и сделать.', bad: 'Задача: «Сделать API» → зависит от базы, которую ещё не развернули', good: 'Задача: «Создать эндпоинт GET /users с mock-данными»' },
  { letter: 'N', name: 'Negotiable', title: 'Обсуждаемая', desc: 'Детали реализации можно обсудить. Не жёсткий контракт.', bad: '«Использовать Redux и создать 5 редьюсеров»', good: '«Реализовать управление состоянием корзины» — как именно — на усмотрение команды' },
  { letter: 'V', name: 'Valuable', title: 'Ценная', desc: 'Каждая задача приносит видимую пользу пользователю или бизнесу.', bad: '«Настроить конфиг webpack»', good: '«Пользователь может видеть историю заказов»' },
  { letter: 'E', name: 'Estimable', title: 'Оцениваемая', desc: 'Команда может оценить объём работ.', bad: '«Исследовать проблемы производительности» — можно копать вечно', good: '«Профилировать главную страницу и составить список 3 наибольших bottleneck»' },
  { letter: 'S', name: 'Small', title: 'Маленькая', desc: 'Вмещается в спринт. Идеально — 1-3 дня.', bad: '«Переписать модуль авторизации» (на 3 недели)', good: '«Добавить валидацию email на форме регистрации» (4 часа)' },
  { letter: 'T', name: 'Testable', title: 'Тестируемая', desc: 'Есть чёткие критерии «сделано».', bad: '«Улучшить UX расчёта» — как проверить?', good: '«При вводе невалидного email показывается красная рамка и текст ошибки»' },
]

const bigTask = {
  title: '🏗️ Интернет-магазин: оформление заказа',
  original: 'Реализовать оформление заказа в интернет-магазине',
  levels: [
    {
      name: 'Уровень 0: Эпик',
      items: ['Реализовать оформление заказа'],
      color: '#ef4444',
    },
    {
      name: 'Уровень 1: Фичи',
      items: [
        'Корзина',
        'Форма доставки',
        'Оплата',
        'Подтверждение',
      ],
      color: '#f59e0b',
    },
    {
      name: 'Уровень 2: User Stories',
      items: [
        'Добавить товар в корзину',
        'Удалить товар из корзины',
        'Изменить количество',
        'Ввести адрес доставки',
        'Выбрать способ доставки',
        'Ввести данные карты',
        'Применить промокод',
        'Показать итог заказа',
        'Получить email-подтверждение',
      ],
      color: '#22c55e',
    },
    {
      name: 'Уровень 3: Подзадачи (саб-таски)',
      items: [
        'UI: кнопка «В корзину»',
        'API: POST /cart/items',
        'State: обновить store',
        'UI: badge с количеством',
        'Тест: добавление в корзину',
        'UI: форма адреса',
        'Валидация: проверка полей',
        'API: расчёт доставки',
        'UI: селект способа доставки',
        'Интеграция: платёжный шлюз',
        'UI: форма карты',
        'API: создание заказа',
        'Email: шаблон подтверждения',
      ],
      color: '#6366f1',
    },
  ],
}

const decompositionTechniques = [
  { name: 'По workflow', icon: '🔄', desc: 'Разбиваем по шагам пользователя: регистрация → профиль → настройки', example: 'Checkout: корзина → адрес → оплата → подтверждение' },
  { name: 'По CRUD', icon: '📝', desc: 'Create, Read, Update, Delete для каждой сущности', example: 'Товар: добавить, посмотреть, редактировать, удалить' },
  { name: 'По ролям', icon: '👥', desc: 'Разные пользователи — разные истории', example: 'Покупатель видит каталог / Админ управляет товарами' },
  { name: 'По happy/sad path', icon: '🔀', desc: 'Сначала happy path, потом обработка ошибок', example: '1) Успешная оплата. 2) Карта отклонена. 3) Timeout' },
  { name: 'По слоям', icon: '📚', desc: 'UI → API → Database → Интеграции', example: 'UI формы → API эндпоинт → Миграция БД → Email-сервис' },
  { name: 'По спайкам', icon: '🔬', desc: 'Сначала spike/исследование, потом реализация', example: 'Spike: выбрать платёжный шлюз (2 дня) → Интеграция (5 дней)' },
]

export default function TaskDecomposition() {
  const [expandedLevel, setExpandedLevel] = useState(0)
  const [investChecks, setInvestChecks] = useState<Record<string, boolean>>({})
  const [userTask, setUserTask] = useState('')
  const [userSubtasks, setUserSubtasks] = useState<string[]>([''])

  const addSubtask = () => setUserSubtasks(prev => [...prev, ''])
  const updateSubtask = (idx: number, value: string) => {
    setUserSubtasks(prev => prev.map((s, i) => i === idx ? value : s))
  }
  const removeSubtask = (idx: number) => {
    setUserSubtasks(prev => prev.filter((_, i) => i !== idx))
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🧩 Декомпозиция задач</h1>
        <p>Как разбить «слона» на маленькие съедобные кусочки. Ключевой навык тимлида.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Декомпозиция — это <strong>разбиение большой задачи на маленькие, независимые части</strong>.
          Это основа агильной разработки: маленькие задачи проще оценить, проще отревьюить
          и проще откатить. Критерии <strong>INVEST</strong> (Independent, Negotiable, Valuable, Estimable, Small, Testable)
          помогают проверить качество декомпозиции.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Почему это важно? По данным DORA, команды с <strong>маленьким batch size</strong> доставляют
          быстрее, с меньшим количеством багов и с более предсказуемым velocity. Типичная ошибка —
          задача «Сделать авторизацию» на 2 недели, которая превращается в чёрную дыру с непонятным статусом.
        </p>
        <div className="info-box">
          <div className="info-box-icon">📏</div>
          <div className="info-box-content">
            <div className="info-box-title">Правило: 1–3 дня</div>
            Если задачу нельзя сделать за 1–3 дня — она недостаточно декомпозирована. Если нельзя написать
            чёткий Definition of Done — она недостаточно понятна. Декомпозируйте дальше.
          </div>
        </div>
      </div>

      {/* Why */}
      <div className="card">
        <h3>Зачем декомпозировать?</h3>
        <div className="grid-3">
          <div className="info-box success">
            <div className="info-box-content">
              <div className="info-box-title">📊 Предсказуемость</div>
              Маленькие задачи проще оценить. Меньше риск промахнуться со сроками.
            </div>
          </div>
          <div className="info-box success">
            <div className="info-box-content">
              <div className="info-box-title">🏃 Параллелизм</div>
              Несколько человек могут работать одновременно над разными подзадачами.
            </div>
          </div>
          <div className="info-box success">
            <div className="info-box-content">
              <div className="info-box-title">✅ Прогресс</div>
              Видно движение. Каждый день что-то закрывается. Мотивация растёт.
            </div>
          </div>
        </div>
      </div>

      {/* INVEST */}
      <div className="card">
        <h3>INVEST — критерии хорошей задачи</h3>
        <p style={{ marginBottom: 16 }}>Проверяйте каждую user story по этим критериям:</p>

        {investCriteria.map(c => (
          <div key={c.letter} style={{
            display: 'flex',
            gap: 16,
            padding: '16px 0',
            borderBottom: '1px solid var(--border-color)',
            alignItems: 'flex-start',
          }}>
            <div
              style={{
                width: 48, height: 48, borderRadius: 8,
                background: investChecks[c.letter] ? 'var(--accent-green)' : 'rgba(99,102,241,0.15)',
                color: investChecks[c.letter] ? 'white' : 'var(--accent-main)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.2s', flexShrink: 0,
              }}
              onClick={() => setInvestChecks(prev => ({ ...prev, [c.letter]: !prev[c.letter] }))}
            >
              {investChecks[c.letter] ? '✓' : c.letter}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <strong>{c.name}</strong> — <span style={{ color: 'var(--text-secondary)' }}>{c.title}</span>
              </div>
              <p style={{ marginBottom: 8, fontSize: '0.9rem' }}>{c.desc}</p>
              <div style={{ display: 'flex', gap: 12, fontSize: '0.8rem', flexWrap: 'wrap' }}>
                <span className="tag red">❌ {c.bad}</span>
                <span className="tag green">✅ {c.good}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decomposition example */}
      <div className="card">
        <h3>{bigTask.title}</h3>
        <p style={{ marginBottom: 16 }}>Исходная задача: <strong>«{bigTask.original}»</strong>. Смотрите как она разбивается на уровни:</p>

        {bigTask.levels.map((level, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '12px 16px', borderRadius: 8,
                background: `${level.color}15`,
                border: `1px solid ${level.color}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onClick={() => setExpandedLevel(expandedLevel === i ? -1 : i)}
            >
              <span style={{ color: level.color, fontSize: '1.2rem' }}>{expandedLevel === i ? '▾' : '▸'}</span>
              <strong style={{ color: level.color }}>{level.name}</strong>
              <span className="tag" style={{ background: `${level.color}25`, color: level.color, marginLeft: 'auto' }}>
                {level.items.length} {level.items.length === 1 ? 'задача' : 'задач'}
              </span>
            </div>

            {expandedLevel === i && (
              <div style={{ marginLeft: 24, marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {level.items.map((item, j) => (
                  <div key={j} style={{
                    padding: '8px 14px',
                    background: `${level.color}10`,
                    border: `1px solid ${level.color}40`,
                    borderRadius: 8,
                    fontSize: '0.85rem',
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Techniques */}
      <div className="card">
        <h3>🛠️ Техники декомпозиции</h3>
        <div className="grid-2">
          {decompositionTechniques.map(t => (
            <div key={t.name} className="scenario-card">
              <h4>{t.icon} {t.name}</h4>
              <p>{t.desc}</p>
              <div className="tag blue" style={{ marginTop: 8 }}>Пример: {t.example}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice */}
      <div className="card">
        <h3>🎮 Практика: декомпозируй сам</h3>
        <p style={{ marginBottom: 12 }}>Введите большую задачу и разбейте на подзадачи.</p>

        <input
          className="input"
          placeholder="Большая задача, например: «Реализовать систему уведомлений»"
          value={userTask}
          onChange={e => setUserTask(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        {userSubtasks.map((st, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <span className="tag blue" style={{ flexShrink: 0 }}>{i + 1}</span>
            <input
              className="input"
              placeholder={`Подзадача ${i + 1}...`}
              value={st}
              onChange={e => updateSubtask(i, e.target.value)}
            />
            {userSubtasks.length > 1 && (
              <button className="btn btn-danger btn-sm" onClick={() => removeSubtask(i)}>✕</button>
            )}
          </div>
        ))}

        <div className="controls">
          <button className="btn btn-secondary btn-sm" onClick={addSubtask}>+ Добавить подзадачу</button>
        </div>

        {userTask && userSubtasks.filter(s => s.trim()).length > 0 && (
          <div className="info-box" style={{ marginTop: 16 }}>
            <div className="info-box-icon">📊</div>
            <div className="info-box-content">
              <div className="info-box-title">Статистика</div>
              <p>Задач: {userSubtasks.filter(s => s.trim()).length}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
                {userSubtasks.filter(s => s.trim()).length < 3 ? '🤔 Маловато. Можно разбить мельче?' :
                 userSubtasks.filter(s => s.trim()).length > 10 ? '⚠️ Много подзадач. Может стоит сгруппировать в фичи?' :
                 '✅ Хорошее количество!'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
