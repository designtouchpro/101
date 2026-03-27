import { useState } from 'react'

const raciExample = [
  { task: 'Разработка фичи', pm: 'A', dev: 'R', qa: 'C', stakeholder: 'I' },
  { task: 'Ревью кода', pm: 'I', dev: 'R', qa: 'C', stakeholder: '' },
  { task: 'Приёмка результата', pm: 'R', dev: 'C', qa: 'C', stakeholder: 'A' },
  { task: 'Управление рисками', pm: 'R/A', dev: 'C', qa: 'C', stakeholder: 'I' },
  { task: 'Бюджет проекта', pm: 'R', dev: 'I', qa: '', stakeholder: 'A' },
  { task: 'Релиз в прод', pm: 'A', dev: 'R', qa: 'R', stakeholder: 'I' },
]

const raidItems = {
  R: {
    title: '⚠️ Risks',
    desc: 'Что может пойти не так',
    columns: ['Риск', 'Вероятность', 'Влияние', 'Митигация'],
    rows: [
      ['Ключевой разработчик уйдёт', 'Средняя', 'Высокое', 'Bus factor: документация + парное программирование'],
      ['Интеграция с API затянется', 'Высокая', 'Высокое', 'Spike на неделю 1. Мок-сервер для параллельной работы'],
      ['Scope creep от стейкхолдера', 'Высокая', 'Среднее', 'Фиксированный scope в charter. CR-процесс'],
    ],
  },
  A: {
    title: '🎯 Assumptions',
    desc: 'Что считаем правдой (но не проверили)',
    columns: ['Допущение', 'Если ложно', 'Как проверить'],
    rows: [
      ['API партнёра стабилен', 'Нужен fallback/кэш', 'Нагрузочный тест на staging'],
      ['Команда доступна на 100%', 'Сдвиг сроков', 'Уточнить capacity у тимлидов'],
      ['Дизайн не изменится', 'Переработка фронта', 'Sign-off от PO до старта'],
    ],
  },
  I: {
    title: '❗ Issues',
    desc: 'Уже случилось, нужно решать',
    columns: ['Проблема', 'Приоритет', 'Владелец', 'Действие'],
    rows: [
      ['CI/CD падает на 30% билдов', 'P1', 'DevOps', 'Починить flaky тесты до пятницы'],
      ['Нет доступа к staging', 'P0', 'PM', 'Заявка на VPN подана, ETA 2 дня'],
      ['Требования противоречивы', 'P1', 'BA', 'Встреча со стейкхолдерами в среду'],
    ],
  },
  D: {
    title: '🔗 Dependencies',
    desc: 'Что от кого зависим',
    columns: ['Зависимость', 'От кого', 'Дедлайн', 'Статус'],
    rows: [
      ['Дизайн-макеты', 'UX-команда', '10 янв', '🟡 В работе'],
      ['API-документация', 'Backend team', '12 янв', '🔴 Опаздывает'],
      ['Лицензия на SDK', 'Legal', '15 янв', '🟢 Готово'],
    ],
  },
}

const escalationLevels = [
  { level: 1, trigger: 'Задача блокирована > 4 часов', who: 'Team Lead', how: 'Slack / daily', sla: '4 часа' },
  { level: 2, trigger: 'Задача блокирована > 1 дня или риск для спринт-цели', who: 'PM / Scrum Master', how: 'Встреча', sla: '8 часов' },
  { level: 3, trigger: 'Срыв milestone или бюджет +20%', who: 'Head of dept', how: 'Экстренная встреча', sla: '24 часа' },
  { level: 4, trigger: 'Критический срыв, репутационный риск', who: 'C-level / Sponsor', how: 'Отчёт + встреча', sla: '48 часов' },
]

const statusTemplate = [
  { section: '📊 Прогресс', content: 'Sprint N: 15/20 задач (75%). Burndown: на графике, ETA ок' },
  { section: '✅ Сделано за неделю', content: '• Интеграция с API  • Деплой на staging  • 12 задач закрыто' },
  { section: '📋 План на следующую неделю', content: '• UAT тестирование  • Фикс 3 критических багов  • Демо стейкхолдерам' },
  { section: '⚠️ Риски и проблемы', content: '• [P1] API партнёра нестабилен — spike на мониторинг  • [P2] QA-инженер на больничном — сдвиг на 2 дня' },
  { section: '🔢 Метрики', content: 'Velocity: 42pt. Lead time: 3.5 дней. Bugs: 5 open / 12 closed. Coverage: 78%' },
  { section: '❓ Нужна помощь', content: '• Доступ к production logs для дебага  • Решение по scope: фича X in/out?' },
]

export default function ExecutionControl() {
  const [raidTab, setRaidTab] = useState<'R' | 'A' | 'I' | 'D'>('R')
  const [tab, setTab] = useState<'raci' | 'raid' | 'escalation' | 'status' | 'followthrough'>('raci')

  const raid = raidItems[raidTab]

  return (
    <div className="demo-container">
      <h1>⚙️ Исполнение и Контроль</h1>
      <p>Планирование — 20% успеха. Остальные 80% — execution, контроль, эскалация, отчётность. Этот модуль про то, как довести проект до результата.</p>

      <div style={{ display: 'flex', gap: 8, margin: '24px 0', flexWrap: 'wrap' }}>
        {([
          ['raci', '👥 RACI'],
          ['raid', '📋 RAID-лог'],
          ['escalation', '🚨 Эскалация'],
          ['status', '📊 Статус-отчёт'],
          ['followthrough', '🔄 Follow-through'],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: tab === key ? '2px solid var(--accent)' : '1px solid var(--border)',
              background: tab === key ? 'var(--accent)' : 'var(--card-bg)',
              color: tab === key ? '#fff' : 'var(--text)',
              cursor: 'pointer',
              fontWeight: tab === key ? 600 : 400,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── RACI ── */}
      {tab === 'raci' && (
        <>
          <section className="card">
            <h2>👥 RACI-матрица</h2>
            <p style={{ marginBottom: 16 }}>Кто за что отвечает. Без RACI — «все ответственные» = никто не ответственный.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
              {[
                { letter: 'R', name: 'Responsible', desc: 'Делает работу' },
                { letter: 'A', name: 'Accountable', desc: 'Отвечает за результат (один!)' },
                { letter: 'C', name: 'Consulted', desc: 'Консультирует до' },
                { letter: 'I', name: 'Informed', desc: 'Информируется после' },
              ].map(r => (
                <div key={r.letter} style={{ padding: 12, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>{r.letter}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{r.name}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{r.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Задача</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>PM</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Dev</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>QA</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Stakeholder</th>
                  </tr>
                </thead>
                <tbody>
                  {raciExample.map(row => (
                    <tr key={row.task}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{row.task}</td>
                      {[row.pm, row.dev, row.qa, row.stakeholder].map((cell, i) => (
                        <td key={i} style={{
                          padding: '8px 12px',
                          borderBottom: '1px solid var(--border)',
                          textAlign: 'center',
                          fontWeight: 700,
                          color: cell === 'A' ? '#ef4444' : cell === 'R' ? '#3b82f6' : cell === 'R/A' ? '#8b5cf6' : 'var(--text)',
                        }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--card-bg)', borderLeft: '3px solid #ef4444', borderRadius: 4, fontSize: '0.85rem' }}>
              <strong>Правило:</strong> У каждой задачи ровно один <span style={{ color: '#ef4444', fontWeight: 700 }}>A</span> (Accountable). Если у задачи два A — это ноль A.
            </div>
          </section>
        </>
      )}

      {/* ── RAID ── */}
      {tab === 'raid' && (
        <>
          <section className="card">
            <h2>📋 RAID-лог</h2>
            <p style={{ marginBottom: 16 }}>Единый реестр всего, что может повлиять на проект. Обновляется еженедельно.</p>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {(['R', 'A', 'I', 'D'] as const).map(letter => (
                <button
                  key={letter}
                  onClick={() => setRaidTab(letter)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 8,
                    border: raidTab === letter ? '2px solid var(--accent)' : '1px solid var(--border)',
                    background: raidTab === letter ? 'var(--accent)' : 'var(--card-bg)',
                    color: raidTab === letter ? '#fff' : 'var(--text)',
                    cursor: 'pointer',
                    fontWeight: raidTab === letter ? 700 : 400,
                    fontSize: '1rem',
                  }}
                >
                  {letter}
                </button>
              ))}
            </div>

            <h3>{raid.title}</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: 12 }}>{raid.desc}</p>

            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {raid.columns.map(col => (
                      <th key={col} style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {raid.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} style={{
                          padding: '8px 12px',
                          borderBottom: '1px solid var(--border)',
                          fontWeight: j === 0 ? 600 : 400,
                          fontSize: '0.85rem',
                        }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* ── Escalation ── */}
      {tab === 'escalation' && (
        <>
          <section className="card">
            <h2>🚨 Матрица эскалации</h2>
            <p style={{ marginBottom: 16 }}>Чем раньше эскалируешь — тем дешевле решение. Не эскалировать → копить проблемы → проект горит.</p>

            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Уровень</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Триггер</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Кому</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Как</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>SLA</th>
                  </tr>
                </thead>
                <tbody>
                  {escalationLevels.map(row => (
                    <tr key={row.level}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'center', fontWeight: 700, fontSize: '1.2rem' }}>L{row.level}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{row.trigger}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{row.who}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{row.how}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{row.sla}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: 20, padding: '12px 16px', background: 'var(--card-bg)', borderLeft: '3px solid #f59e0b', borderRadius: 4, fontSize: '0.85rem' }}>
              <strong>Анти-паттерн:</strong> «Heroics culture» — тимлид берёт на себя всё и не эскалирует. Результат: выгорание + поздний сигнал наверх.
            </div>
          </section>

          <section className="card">
            <h2>📢 Правила эскалации</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
              {[
                { rule: 'Эскалируй факты, не эмоции', example: '«API не отвечает 4 часа» — не «всё сломалось»' },
                { rule: 'Предлагай варианты', example: '«Вариант A: ждать 2 дня. Вариант B: мок + параллельная работа»' },
                { rule: 'Эскалируй вовремя, не поздно', example: 'Лучше ложная тревога, чем поздно обнаруженный блокер' },
                { rule: 'Документируй решение', example: 'В RAID-логе: что решили, кто владелец, дедлайн' },
              ].map(r => (
                <div key={r.rule} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <h4 style={{ margin: '0 0 8px' }}>{r.rule}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>{r.example}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── Status Report ── */}
      {tab === 'status' && (
        <>
          <section className="card">
            <h2>📊 Статус-отчёт (Status Report)</h2>
            <p style={{ marginBottom: 16 }}>Еженедельный отчёт = единый источник правды. Формат одинаковый каждую неделю, чтобы стейкхолдеры могли сравнивать.</p>

            <div style={{ padding: 20, background: 'var(--card-bg)', border: '2px solid var(--accent)', borderRadius: 8, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <h3 style={{ margin: 0 }}>Проект: Новый Checkout</h3>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ padding: '4px 12px', borderRadius: 12, background: '#22c55e', color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>Сроки: 🟢</span>
                  <span style={{ padding: '4px 12px', borderRadius: 12, background: '#f59e0b', color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>Бюджет: 🟡</span>
                  <span style={{ padding: '4px 12px', borderRadius: 12, background: '#22c55e', color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>Scope: 🟢</span>
                </div>
              </div>

              {statusTemplate.map(s => (
                <div key={s.section} style={{ marginBottom: 12 }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: '0.9rem' }}>{s.section}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8, whiteSpace: 'pre-line' }}>{s.content}</p>
                </div>
              ))}
            </div>

            <h3>RAG-статус (светофор)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { color: '🟢 Green', desc: 'Всё по плану. Рисков нет или управляемы.' },
                { color: '🟡 Amber', desc: 'Есть проблемы, но план восстановления есть. Нужно внимание.' },
                { color: '🔴 Red', desc: 'Сроки/бюджет/scope под угрозой. Нужна помощь и решение.' },
              ].map(s => (
                <div key={s.color} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <h4 style={{ margin: '0 0 8px' }}>{s.color}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── Follow-through ── */}
      {tab === 'followthrough' && (
        <>
          <section className="card">
            <h2>🔄 Project Follow-Through</h2>
            <p style={{ marginBottom: 16 }}>Контроль — не микроменеджмент. Это системные практики, которые гарантируют, что работа движется к результату.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {[
                {
                  title: '📆 Daily Stand-up (контроль)',
                  items: ['3 вопроса: что сделал / что буду / что блокирует', 'Макс 15 мин, все стоят (буквально)', 'PM фиксирует блокеры → RAID', 'Не обсуждаем решения — выносим в отдельную встречу'],
                },
                {
                  title: '📊 Weekly Review',
                  items: ['Burndown: мы на графике?', 'Velocity: стабилен? Падает?', 'RAID-лог: новые пункты? Решённые?', 'Отправить статус-отчёт стейкхолдерам'],
                },
                {
                  title: '🔍 Sprint Review / Demo',
                  items: ['Показать рабочий инкремент', 'Собрать обратную связь от стейкхолдеров', 'Зафиксировать: что принято, что на доработку', 'Обновить бэклог по итогам'],
                },
                {
                  title: '🔄 Retrospective',
                  items: ['Start / Stop / Continue формат', 'Каждый ретро → 1-2 action items', 'Action items = задачи в следующем спринте', 'Без виноватых — ищем процессные улучшения'],
                },
                {
                  title: '📈 Milestone Check',
                  items: ['На каждый milestone: scope vs план', 'EVM: CPI и SPI (Earned Value)', 'Решение: продолжаем / корректируем / эскалируем', 'Lessons learned для следующего этапа'],
                },
                {
                  title: '🏁 Project Closure',
                  items: ['Финальный отчёт: план vs факт', 'Передача знаний (runbook, документация)', 'Ретроспектива проекта (не спринта)', 'Celebration: отметить достижения команды'],
                },
              ].map(block => (
                <div key={block.title} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <h4 style={{ margin: '0 0 12px' }}>{block.title}</h4>
                  <ul className="info-list">
                    {block.items.map((item, i) => <li key={i} style={{ marginBottom: 4, fontSize: '0.85rem' }}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>📋 Контрольный цикл PM</h2>
            <div style={{ padding: 20, background: 'var(--card-bg)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', fontSize: '0.9rem' }}>
                {['Plan', '→', 'Execute', '→', 'Monitor', '→', 'Control', '→', 'Report', '→', 'Adapt'].map((step, i) => (
                  <span key={i} style={{
                    padding: step === '→' ? '8px 4px' : '8px 16px',
                    background: step === '→' ? 'transparent' : 'var(--accent)',
                    color: step === '→' ? 'var(--text)' : '#fff',
                    borderRadius: step === '→' ? 0 : 8,
                    fontWeight: step === '→' ? 400 : 600,
                  }}>
                    {step}
                  </span>
                ))}
              </div>
              <p style={{ textAlign: 'center', marginTop: 16, fontSize: '0.85rem', opacity: 0.7 }}>
                Цикл повторяется каждый спринт / неделю. Ключевое: Monitor → Control. Если только Monitor — это пассивное наблюдение, а не управление.
              </p>
            </div>
          </section>
        </>
      )}

      {/* ── Interview ── */}
      <section className="card">
        <h2>❓ Вопросы на собесе</h2>
        <div className="interview-item"><div className="q">Что такое RACI и зачем она нужна?</div><div className="a">RACI — матрица ответственности: Responsible (делает), Accountable (отвечает за результат, всегда один), Consulted (консультирует до), Informed (узнаёт после). Без RACI — размытая ответственность: «Я думал это сделает Петя». Строю для каждого проекта на kickoff.</div></div>
        <div className="interview-item"><div className="q">Как вы управляете рисками в проекте?</div><div className="a">RAID-лог: Risks, Assumptions, Issues, Dependencies. Обновляю еженедельно. Для рисков: вероятность × влияние → приоритет. Для каждого — митигация и владелец. На weekly review проверяю: новые, закрытые, изменившиеся. Эскалирую по матрице эскалации, не жду пока станет поздно.</div></div>
        <div className="interview-item"><div className="q">Расскажите про ваш процесс follow-through проекта</div><div className="a">Цикл: Plan → Execute → Monitor → Control → Report → Adapt. Ежедневно: stand-up + блокеры в RAID. Еженедельно: burndown + velocity + статус-отчёт стейкхолдерам (RAG-светофор). На milestone: EVM-анализ (CPI/SPI). Ключевое отличие Control от Monitor: при Control я принимаю решения и корректирую курс, а не просто наблюдаю.</div></div>
      </section>
    </div>
  )
}
