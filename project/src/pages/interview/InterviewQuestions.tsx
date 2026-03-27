import { useState } from 'react'

interface Question {
  q: string
  a: string
  level: 'junior' | 'middle' | 'senior'
  topic: string
}

const questions: Question[] = [
  // Методологии
  { q: 'Чем Scrum отличается от Kanban? Когда что выбрать?', a: 'Scrum: фиксированные спринты, роли (PO, SM, Dev), ритуалы (planning, review, retro). Kanban: непрерывный поток, WIP-лимиты, нет спринтов. Scrum — когда scope предсказуем, Kanban — когда задачи прилетают непредсказуемо (support, ops). Часто используют Scrumban — гибрид.', level: 'junior', topic: 'Методологии' },
  { q: 'Что такое Waterfall и когда его использовать?', a: 'Последовательная модель: Requirements → Design → Implementation → Testing → Deployment. Подходит когда: (1) Требования зафиксированы и не изменятся (строительство), (2) Регуляторные ограничения (медицина, авиация), (3) Фиксированная цена контракта. В IT чаще используют гибридные подходы.', level: 'junior', topic: 'Методологии' },
  { q: 'Как масштабировать Agile? SAFe vs LeSS.', a: 'SAFe (Scaled Agile): PI Planning, ART, решение для больших организаций. Тяжёлый фреймворк. LeSS: один Product Owner на несколько команд, минимум добавленных ролей. Spotify Model: Squads, Tribes, Chapters, Guilds. Выбор зависит от размера и культуры компании.', level: 'senior', topic: 'Методологии' },

  // Оценка
  { q: 'Как оценить задачу в Story Points?', a: 'Story Points — относительная оценка сложности. Берём эталонную задачу (reminder: задача Login = 3 SP). Новые задачи сравниваем с эталоном: проще → 1-2 SP, сложнее → 5-8 SP. Используем числа Фибоначчи (1, 2, 3, 5, 8, 13, 21). Если >13 — нужна декомпозиция.', level: 'junior', topic: 'Оценка' },
  { q: 'Что такое PERT-оценка (трёхточечная)?', a: 'PERT = (Optimistic + 4×MostLikely + Pessimistic) / 6. Стандартное отклонение = (P - O) / 6. Для задачи: O=3 дня, M=5 дней, P=14 дней → PERT = (3+20+14)/6 = 6.2 дня. 95% вероятность: PERT + 2σ = 6.2 + 3.7 = 9.9 дней. Хорош для проектов с высокой неопределённостью.', level: 'middle', topic: 'Оценка' },
  { q: 'Velocity падает 3 спринта подряд. Ваши действия?', a: '1) Ретро с командой — найти причины (tech debt, scope creep, выгорание), 2) Проверить — не растёт ли scope задач? 3) Анализ блокеров и зависимостей, 4) Capacity — кто-то ушёл/болеет? 5) Не давить — velocity нельзя «увеличить» приказом. 6) Может, задачи стали сложнее — пересмотреть baseline.', level: 'senior', topic: 'Оценка' },

  // Риски
  { q: 'Как составить матрицу рисков?', a: 'Матрица: ось X — Вероятность (Low/Med/High), ось Y — Влияние (Low/Med/High). Каждый риск — ячейка матрицы. Красная зона (High/High) — срочно митигировать. Для каждого риска: описание, триггер, владелец, план действий (avoid, mitigate, transfer, accept).', level: 'junior', topic: 'Риски' },
  { q: 'Key person risk — как митигировать?', a: 'Риск зависимости от одного специалиста. Митигация: (1) Bus factor ≥ 2 для критичных систем, (2) Документация + knowledge sharing, (3) Парное программирование / code review, (4) Ротация задач, (5) Cross-functional training. Метрика: кол-во модулей с bus factor = 1.', level: 'middle', topic: 'Риски' },

  // Коммуникация
  { q: 'Как проводить Status Meeting эффективно?', a: '1) Максимум 15 минут (standup format), 2) Структура: что сделал → что буду делать → блокеры, 3) Parking lot для обсуждений, 4) Визуальная доска (Jira board), 5) Async update для распределённых команд. Главное — НЕ превращать в отчёт для начальства.', level: 'junior', topic: 'Коммуникация' },
  { q: 'Стейкхолдер недоволен прогрессом. Ваши действия?', a: '1) Выслушать конкретные претензии (факты, не эмоции), 2) Показать объективные данные (burndown, velocity), 3) Предложить trade-off: быстрее делаем = меньше scope ИЛИ ту же scope = позже deadline, 4) Договориться о формате регулярных апдейтов, 5) Зафиксировать в writing.', level: 'middle', topic: 'Коммуникация' },
  { q: 'Как управлять конфликтом между командами?', a: 'Модель Thomas-Kilmann: (1) Competing — когда срочно, (2) Collaborating — когда важны обе стороны, (3) Compromising — средний путь, (4) Avoiding — когда не стоит свеч, (5) Accommodating — сохранить отношения. PM ищет win-win через collaborating. Эскалация — последний resort.', level: 'senior', topic: 'Коммуникация' },

  // Метрики и артефакты
  { q: 'Что такое DoR и DoD?', a: 'DoR (Definition of Ready): критерии готовности задачи к взятию в работу — AC написаны, макеты готовы, зависимости разрешены. DoD (Definition of Done): критерии завершения — код написан, тесты пройдены, code review, документация обновлена. Не путать: DoR → начало, DoD → конец.', level: 'junior', topic: 'Артефакты' },
  { q: 'Как считать Lead Time и Cycle Time?', a: 'Lead Time: от создания задачи до деплоя в prod (вся длина). Cycle Time: от взятия в работу до завершения (активная работа). Lead Time всегда ≥ Cycle Time. Для Kanban: Cycle Time = WIP / Throughput (Little\'s Law). Цель: уменьшать оба, но в первую очередь — Lead Time.', level: 'middle', topic: 'Метрики' },
  { q: 'EVM: как считать SPI и CPI?', a: 'EVM (Earned Value Management): PV — плановая стоимость, EV — освоенная стоимость, AC — фактические затраты. SPI = EV/PV (schedule performance: >1 опережаем). CPI = EV/AC (cost performance: >1 экономим). EAC = BAC/CPI — прогноз итоговой стоимости. Если CPI < 0.8 — проект в красной зоне.', level: 'senior', topic: 'Метрики' },
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
        <p>Типичные вопросы для проджект-менеджера: Junior → Senior.</p>
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
