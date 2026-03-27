import { useState } from 'react'

const safetyLevels = [
  { level: 1, name: 'Inclusion Safety', icon: '🤝', desc: 'Чувство принадлежности к команде. Принятие без условий.', signs: ['Новички быстро интегрируются', 'Все вовлечены в обсуждения', 'Нет «своих» и «чужих»'], antiPatterns: ['Закрытые кружки', 'Игнорирование новичков', 'Сарказм при ошибках'] },
  { level: 2, name: 'Learner Safety', icon: '📚', desc: 'Безопасно задавать вопросы, экспериментировать, ошибаться.', signs: ['Вопросы приветствуются', 'Ошибки = обучение', 'Менторство по умолчанию'], antiPatterns: ['«Это очевидно»', 'Осуждение за незнание', 'Наказание за эксперименты'] },
  { level: 3, name: 'Contributor Safety', icon: '🛠️', desc: 'Безопасно вносить вклад: предлагать идеи, участвовать в решениях.', signs: ['Идеи рассматриваются по существу', 'Автономия в зоне компетенций', 'Обратная связь двусторонняя'], antiPatterns: ['Микроменеджмент', 'Игнорирование предложений', 'Решения только «сверху»'] },
  { level: 4, name: 'Challenger Safety', icon: '🔥', desc: 'Безопасно оспаривать статус-кво, предлагать радикальные изменения.', signs: ['Несогласие не = конфликт', 'Критика процессов приветствуется', 'Red team практики'], antiPatterns: ['«Здесь так принято»', 'Подавление инакомыслия', 'Токсичный консенсус'] },
]

const burnoutSignals = [
  { stage: '🟢 Норма', signs: 'Энергия, интерес, продуктивность', action: 'Поддерживать ритм и автономию' },
  { stage: '🟡 Стресс', signs: 'Переработки, раздражительность, снижение качества', action: 'Проговорить, снять нагрузку, навести фокус' },
  { stage: '🟠 Хронический', signs: 'Цинизм, отстранённость, прокрастинация', action: '1-on-1, пересмотр задач, отпуск' },
  { stage: '🔴 Выгорание', signs: 'Апатия, физические симптомы, мысли об уходе', action: 'Профессиональная помощь, длинный отпуск, смена роли' },
]

const onboardingPhases = [
  { phase: 'Preboarding (до выхода)', duration: '1–2 нед', items: ['Доступы и оборудование', 'Welcome letter', 'Buddy назначен', 'Онбординг-план готов'] },
  { phase: '1-я неделя', duration: '5 дней', items: ['Знакомство с командой', 'Обзор продукта/кодовой базы', 'Первая простая задача', 'Установка окружения'] },
  { phase: '30 дней', duration: '1 мес', items: ['3–5 закрытых задач', 'Code review партнёрский', 'Понимание процессов CI/CD', '1-on-1 с лидом: фидбек'] },
  { phase: '60 дней', duration: '2 мес', items: ['Самостоятельные фичи', 'Участие в планировании', 'Менторство от senior', 'Промежуточный фидбек'] },
  { phase: '90 дней', duration: '3 мес', items: ['Полная автономия в зоне', 'Вклад в архитектурные решения', 'Финальный review онбординга', 'Решение о прохождении ИС'] },
]

const retentionDrivers = [
  { driver: 'Автономия', icon: '🏄', desc: 'Свобода в принятии решений и выборе подхода', actions: ['Давать ownership за фичу/сервис', 'Минимизировать микроменеджмент', 'Позволять выбор инструментов'] },
  { driver: 'Мастерство', icon: '🎯', desc: 'Возможность расти профессионально', actions: ['Бюджет на обучение', 'Сложные и интересные задачи', 'Tech talks и ротация'] },
  { driver: 'Цель', icon: '🧭', desc: 'Понимание зачем и impact работы', actions: ['Связь задач с бизнес-метриками', 'Демо фич пользователям', 'Участие в продуктовых решениях'] },
  { driver: 'Связи', icon: '💬', desc: 'Сильные отношения в команде', actions: ['Тимбилдинги без принуждения', 'Парное программирование', 'Поддержка в сложных ситуациях'] },
  { driver: 'Справедливость', icon: '⚖️', desc: 'Прозрачные правила и вознаграждение', actions: ['Чёткие критерии роста', 'Рыночная компенсация', 'Открытая обратная связь'] },
]

const scalingPains = [
  { size: '3–5', challenge: 'Формирование культуры', symptoms: 'Нет процессов, всё на коммуникации', solution: 'Зафиксировать рабочие соглашения, определить ценности' },
  { size: '6–10', challenge: 'Первые процессы', symptoms: 'Хаос в задачах, дублирование работы', solution: 'Kanban/Scrum, code ownership, документация' },
  { size: '11–20', challenge: 'Сплит команд', symptoms: 'Тяжёлые стендапы, медленные решения', solution: 'Разделение на 2–3 команды, Team Topologies' },
  { size: '20–50', challenge: 'Координация', symptoms: 'Блокеры между командами, расплывчатые зоны', solution: 'Platform team, API contracts, Architecture Decision Records' },
  { size: '50+', challenge: 'Масштаб лидерства', symptoms: 'Один лид не тянет, культура размывается', solution: 'Engineering Managers, chapters, inner-source' },
]

export default function OrgHealth() {
  const [tab, setTab] = useState<'safety' | 'burnout' | 'onboard' | 'retain' | 'scale'>('safety')

  return (
    <div className="demo-container">
      <h1>🌡️ Здоровье команды и масштабирование</h1>
      <p>Психологическая безопасность, выгорание, онбординг, удержание и боли роста.</p>

      <div style={{ display: 'flex', gap: 8, margin: '24px 0', flexWrap: 'wrap' }}>
        {([
          ['safety', '🛡️ Псих. безопасность'],
          ['burnout', '🔥 Выгорание'],
          ['onboard', '🚀 Онбординг'],
          ['retain', '🧲 Удержание'],
          ['scale', '📈 Масштабирование'],
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

      {/* ── Psychological Safety ── */}
      {tab === 'safety' && (
        <>
          <section className="card">
            <h2>🛡️ 4 уровня психологической безопасности</h2>
            <p style={{ marginBottom: 16, fontSize: '0.85rem', opacity: 0.8 }}>Модель Timothy Clark. Каждый уровень строится на предыдущем.</p>

            {safetyLevels.map(level => (
              <div key={level.level} style={{ padding: 16, marginBottom: 12, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8, borderLeft: '4px solid var(--accent)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <h3 style={{ margin: 0 }}>{level.icon} Level {level.level}: {level.name}</h3>
                </div>
                <p style={{ margin: '0 0 12px', fontSize: '0.85rem' }}>{level.desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: 4 }}>✅ Признаки</div>
                    {level.signs.map(s => <div key={s} style={{ fontSize: '0.85rem', padding: '2px 0' }}>• {s}</div>)}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: 4 }}>🚩 Анти-паттерны</div>
                    {level.antiPatterns.map(a => <div key={a} style={{ fontSize: '0.85rem', padding: '2px 0', color: '#ef4444' }}>• {a}</div>)}
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="card">
            <h2>📏 Как измерять</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[
                { method: 'Анонимные опросы', freq: 'Ежеквартально', tool: 'Google Forms / Culture Amp' },
                { method: 'Ретроспективы', freq: 'Каждый спринт', tool: 'Miro / FunRetro' },
                { method: '1-on-1 вопросы', freq: 'Еженедельно', tool: 'Прямой разговор' },
                { method: 'eNPS (Employee NPS)', freq: 'Раз в полгода', tool: 'Officevibe / Peakon' },
              ].map(m => (
                <div key={m.method} style={{ padding: 12, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{m.method}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{m.freq}</div>
                  <div style={{ fontSize: '0.8rem', marginTop: 4, color: 'var(--accent)' }}>{m.tool}</div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── Burnout ── */}
      {tab === 'burnout' && (
        <>
          <section className="card">
            <h2>🔥 Стадии выгорания</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Стадия</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Признаки</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Действие лида</th>
                  </tr>
                </thead>
                <tbody>
                  {burnoutSignals.map(b => (
                    <tr key={b.stage}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600, whiteSpace: 'nowrap' }}>{b.stage}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{b.signs}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{b.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>🛡️ Профилактика</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {[
                { title: 'Устойчивый темп', icon: '⏱️', items: ['Не героизм, а системная работа', 'Ограничение переработок', 'Право на «нет»'] },
                { title: 'Автономия и контроль', icon: '🎮', items: ['Выбор задач и подхода', 'Гибкий график', 'Ownership за результат'] },
                { title: 'Обратная связь', icon: '💬', items: ['Регулярные 1-on-1', 'Признание достижений', 'Не только что плохо'] },
                { title: 'Разнообразие задач', icon: '🎨', items: ['Чередование рутины и вызовов', 'Возможность обучения', 'Хакатоны / pet-проекты'] },
              ].map(p => (
                <div key={p.title} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <h3 style={{ margin: '0 0 8px' }}>{p.icon} {p.title}</h3>
                  {p.items.map(item => <div key={item} style={{ fontSize: '0.85rem', padding: '2px 0' }}>• {item}</div>)}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── Onboarding ── */}
      {tab === 'onboard' && (
        <section className="card">
          <h2>🚀 Структурированный онбординг</h2>
          <p style={{ marginBottom: 16, fontSize: '0.85rem', opacity: 0.8 }}>Хороший онбординг снижает время до продуктивности на 50% и повышает retention в первый год.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {onboardingPhases.map((phase, i) => (
              <div key={phase.phase} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 48, height: 48, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem', flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1, padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <h3 style={{ margin: 0 }}>{phase.phase}</h3>
                    <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: 4, background: 'var(--accent)', color: '#fff' }}>{phase.duration}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 4 }}>
                    {phase.items.map(item => <div key={item} style={{ fontSize: '0.85rem' }}>✅ {item}</div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Retention ── */}
      {tab === 'retain' && (
        <section className="card">
          <h2>🧲 Драйверы удержания</h2>
          <p style={{ marginBottom: 16, fontSize: '0.85rem', opacity: 0.8 }}>Основано на Self-Determination Theory (Deci & Ryan) + Drive (Daniel Pink).</p>

          {retentionDrivers.map(d => (
            <div key={d.driver} style={{ padding: 16, marginBottom: 12, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
              <h3 style={{ margin: '0 0 4px' }}>{d.icon} {d.driver}</h3>
              <p style={{ margin: '0 0 8px', fontSize: '0.85rem', opacity: 0.8 }}>{d.desc}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {d.actions.map(a => (
                  <span key={a} style={{ fontSize: '0.8rem', padding: '4px 10px', borderRadius: 6, background: 'var(--bg)', border: '1px solid var(--border)' }}>{a}</span>
                ))}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 16, padding: 16, background: 'var(--card-bg)', border: '2px solid #ef4444', borderRadius: 8 }}>
            <h3 style={{ margin: '0 0 8px', color: '#ef4444' }}>🚩 Сигналы ухода</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
              {['Снижение инициативы', 'Обновление LinkedIn', 'Избегание долгосрочных задач', 'Отстранённость на встречах', 'Частые больничные', 'Конфликты без попыток решить'].map(s => (
                <div key={s} style={{ fontSize: '0.85rem' }}>⚠️ {s}</div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Scaling ── */}
      {tab === 'scale' && (
        <section className="card">
          <h2>📈 Боли роста команды</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Размер</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Вызов</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Симптомы</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Решение</th>
                </tr>
              </thead>
              <tbody>
                {scalingPains.map(s => (
                  <tr key={s.size}>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'center', fontWeight: 700, whiteSpace: 'nowrap' }}>{s.size}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.85rem' }}>{s.challenge}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{s.symptoms}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{s.solution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 16, padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <h3 style={{ margin: '0 0 12px' }}>⚡ Ключевые принципы масштабирования</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[
                { title: 'Автономные команды', desc: 'Каждая команда может доставлять value независимо' },
                { title: 'Явные интерфейсы', desc: 'API contracts между командами вместо устных договорённостей' },
                { title: 'Культура через людей', desc: 'Нанимайте за culture add, не fit' },
                { title: 'Документируйте решения', desc: 'ADR, Playbooks, Runbooks — tribal knowledge не масштабируется' },
              ].map(p => (
                <div key={p.title} style={{ padding: 12, background: 'var(--bg)', borderRadius: 8 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Interview ── */}
      <section className="card">
        <h2>❓ Вопросы на собесе</h2>
        <div className="interview-item"><div className="q">Как вы создаёте психологическую безопасность в команде?</div><div className="a">Через 4 уровня: inclusion → learner → contributor → challenger safety. На практике: моделирую уязвимость (признаю свои ошибки), защищаю от blame culture, использую ретро и анонимные опросы для замера. Ключевой маркер — люди не боятся говорить «я не знаю».</div></div>
        <div className="interview-item"><div className="q">Как вы предотвращаете выгорание?</div><div className="a">Устойчивый темп, ограничение переработок, автономия, разнообразие задач. Отслеживаю ранние сигналы: снижение инициативы, раздражительность, падение качества. При подозрении — 1-on-1, проговариваем нагрузку, при необходимости перераспределяю и даю отдых.</div></div>
        <div className="interview-item"><div className="q">Как должен выглядеть онбординг разработчика?</div><div className="a">Preboarding (доступы, buddy), 1 неделя (знакомство, простая задача), 30 дней (самост. задачи, процессы), 60 дней (фичи, планирование), 90 дней (полная автономия, decision об ИС). Ключевое — buddy + чёткий план + регулярный фидбек.</div></div>
      </section>
    </div>
  )
}
