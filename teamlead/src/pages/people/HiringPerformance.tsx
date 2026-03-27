import { useState } from 'react'

const hiringPipeline = [
  { stage: 'Профиль', icon: '📝', desc: 'Чёткое описание роли, грейда, must-have (обязательно) / nice-to-have (желательно)', tips: ['Must-have ≤ 5 пунктов', 'Nice-to-have — бонус, не фильтр', 'Определи: зачем эта роль? Какую проблему решает?', 'Anti-pattern (анти-паттерн): «Full-stack senior 3 года, 15 технологий»'] },
  { stage: 'Sourcing (поиск)', icon: '🔍', desc: 'Где искать кандидатов', tips: ['Referral program (реферальная программа): лучший канал (30-50% наймов)', 'LinkedIn: персональное сообщение > массовая рассылка', 'Комьюнити: конференции, митапы, Telegram', 'Рекрутер: объясни роль за 5 минут, дай чек-лист'] },
  { stage: 'Скрининг', icon: '📞', desc: '15-30 мин звонок: мотивация, ожидания, красные флаги (red flags — тревожные сигналы)', tips: ['Почему ищет? Что важно? Зарплатные ожидания?', 'Red flags: негатив о прошлых командах, «мне всё равно»', 'Продай вакансию: команда, стек, задачи, рост', 'No-go: не подходит по базовым критериям → откажи сразу'] },
  { stage: 'Техническое', icon: '💻', desc: 'Оценка hard skills: задачи, live coding (программирование в реальном времени), system design (проектирование систем)', tips: ['Live coding: задача на 30-45 мин, объясняешь подход', 'System design: open-ended (открытый вопрос), оценивай мышление', 'Take-home (домашнее задание): 2-4 часа максимум, оплачивай', 'Скоринг: 4-5 критериев, шкала 1-4, записывай'] },
  { stage: 'Культура', icon: '🤝', desc: 'Оценка soft skills, соответствие ценностям, работа в команде', tips: ['Ситуационные вопросы (STAR): расскажи про конфликт…', 'Познакомь с командой — peer interview (собеседование с будущими коллегами)', 'Не «culture fit» (клоны), а «culture add» (дополнение культуры разнообразием)', 'Проверь: как даёт фидбек? Как принимает?'] },
  { stage: 'Оффер', icon: '🎯', desc: 'Быстро, конкурентно, прозрачно', tips: ['Оффер в течение 48ч после финала', 'Звонок тимлида: «Мы хотим тебя в команду, вот почему»', 'Прозрачность: зарплата, ревью, рост, бонусы', 'Counter-offer (встречное предложение): обсуди, не давя. Уважай решение'] },
]

const perfFramework = [
  {
    name: 'OKR (Objectives & Key Results — цели и ключевые результаты)',
    desc: 'Цели + измеримые результаты. Квартальный цикл.',
    example: {
      objective: 'Повысить качество кода',
      keyResults: ['Code review turnaround < 4 часов', 'Test coverage > 80%', '0 критических багов на проде за квартал'],
    },
    when: 'Квартальное планирование, alignment с бизнесом',
  },
  {
    name: 'IDP (Individual Development Plan — индивидуальный план развития)',
    desc: 'Персональный план развития на 3-6 месяцев.',
    example: {
      objective: 'Рост до Senior',
      keyResults: ['Провести 2 system design review', 'Менторить 1 джуна', 'Выступить на внутреннем митапе'],
    },
    when: 'Развитие людей, карьерный рост, retention (удержание)',
  },
  {
    name: 'Performance Review 360 (круговая оценка эффективности)',
    desc: 'Круговая оценка: self (самооценка) + peers (коллеги) + lead + skip-level (руководитель через уровень).',
    example: {
      objective: 'Оценка за H1',
      keyResults: ['Self-review (самооценка): 5 вопросов', 'Peer feedback (отзывы коллег): 3 коллеги', 'Lead assessment (оценка руководителя): грейд-матрица', 'Итоговый 1-on-1 с планом'],
    },
    when: 'Раз в полгода, привязка к зарплатным ревью',
  },
]

const underperformanceSteps = [
  { step: 1, title: 'Заметил проблему', action: 'Собери факты: дедлайны, качество, фидбек коллег. Не мнения — данные.', timing: 'Неделя 0' },
  { step: 2, title: 'Приватный разговор', action: 'SBI-фидбек: Ситуация → Поведение → Влияние. «Я заметил, что последние 3 PR возвращались на ревью 2+ раз. Это замедляет команду.»', timing: 'Неделя 1' },
  { step: 3, title: 'Выясни причину', action: 'Может быть: выгорание, личные проблемы, непонимание ожиданий, неподходящие задачи, токсичная среда. Слушай.', timing: 'Неделя 1' },
  { step: 4, title: 'PIP (план)', action: 'Performance Improvement Plan (план улучшения эффективности): 3-5 конкретных целей на 4-8 недель. Еженедельные чек-ины. Письменно.', timing: 'Неделя 2-10' },
  { step: 5, title: 'Промежуточная оценка', action: 'Через 4 недели: прогресс есть? Корректируем план. Прогресса нет — готовимся к сложному разговору.', timing: 'Неделя 6' },
  { step: 6, title: 'Решение', action: 'Улучшился → празднуем, продолжаем. Не улучшился → ротация в другую команду или расставание. Честно, с уважением.', timing: 'Неделя 10' },
]

const interviewScripts = [
  {
    situation: 'Техническое интервью: оценка',
    script: `Привет! Сегодня мы решим одну задачу вместе. У тебя 40 минут. 
Это не экзамен — я хочу увидеть, как ты думаешь. 
Рассуждай вслух, задавай вопросы. Если застрял — я дам подсказку.
Готов? Давай начнём.`,
  },
  {
    situation: 'Фидбек после отказа',
    script: `Спасибо за время, что ты уделил нам. К сожалению, мы решили 
не продолжать процесс. Основная причина: [конкретика — не «не подошёл», 
а «нам важен опыт в distributed systems, которого пока недостаточно»].
Что можно подтянуть: [совет]. Буду рад, если вернёшься через N месяцев.`,
  },
  {
    situation: 'Начало PIP-разговора',
    script: `Я хочу обсудить с тобой важную тему. За последний месяц я заметил 
[факты, не мнения]. Это влияет на [команду/проект].
Я хочу помочь тебе вернуться на нужный уровень. Давай составим план 
на 6 недель с конкретными целями. Что думаешь?`,
  },
  {
    situation: 'Разговор о росте на 1-on-1',
    script: `Давай поговорим про твой рост. Где ты видишь себя через год?
Что тебе нравится в работе сейчас? Что хотел бы изменить?
Давай вместе составим IDP: 2-3 цели на квартал, конкретные шаги,
и как я могу помочь.`,
  },
]

export default function HiringPerformance() {
  const [tab, setTab] = useState<'hiring' | 'performance' | 'underperf' | 'scripts'>('hiring')
  const [selectedStage, setSelectedStage] = useState(0)

  const stage = hiringPipeline[selectedStage]!

  return (
    <div className="demo-container">
      <h1>👥 Найм и Performance Management (управление эффективностью)</h1>
      <p>Нанимать правильных людей и растить — ключевые обязанности тимлида. Здесь: полный цикл найма, фреймворки оценки, работа с low performance и готовые скрипты.</p>

      <div style={{ display: 'flex', gap: 8, margin: '24px 0', flexWrap: 'wrap' }}>
        {([
          ['hiring', '🔍 Найм'],
          ['performance', '📊 Оценка и рост'],
          ['underperf', '⚠️ Low Performance (низкая эффективность)'],
          ['scripts', '📝 Скрипты'],
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

      {/* ── Hiring ── */}
      {tab === 'hiring' && (
        <>
          <section className="card">
            <h2>🔍 Воронка найма (hiring pipeline)</h2>

            {/* Pipeline visualizer */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 20, flexWrap: 'wrap' }}>
              {hiringPipeline.map((s, i) => (
                <button
                  key={s.stage}
                  onClick={() => setSelectedStage(i)}
                  style={{
                    flex: 1,
                    minWidth: 80,
                    padding: '12px 8px',
                    borderRadius: 8,
                    border: selectedStage === i ? '2px solid var(--accent)' : '1px solid var(--border)',
                    background: selectedStage === i ? 'var(--accent)' : 'var(--card-bg)',
                    color: selectedStage === i ? '#fff' : 'var(--text)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                  }}
                >
                  <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
                  {s.stage}
                </button>
              ))}
            </div>

            {/* Selected stage details */}
            <div style={{ padding: 20, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
              <h3 style={{ margin: '0 0 8px' }}>{stage.icon} {stage.stage}</h3>
              <p style={{ margin: '0 0 16px', fontSize: '0.9rem' }}>{stage.desc}</p>
              <ul className="info-list">
                {stage.tips.map((tip, i) => <li key={i} style={{ marginBottom: 6, fontSize: '0.85rem' }}>{tip}</li>)}
              </ul>
            </div>
          </section>

          <section className="card">
            <h2>📊 Метрики найма</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Метрика</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Что мерим</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Benchmark</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Time to Hire (время до найма)', 'Дни от заявки до оффера', '25-40 дней (IT)'],
                    ['Time to Fill (время до закрытия)', 'Дни от заявки до выхода', '40-60 дней'],
                    ['Offer Acceptance Rate (процент принятых офферов)', '% принятых офферов', '> 80%'],
                    ['Quality of Hire (качество найма)', 'Perf review через 6 мес', 'Meets expectations +'],
                    ['Source of Hire (источник найма)', 'Откуда лучшие кандидаты', 'Обычно: referrals (рекомендации)'],
                    ['Interview-to-Offer (конверсия)', 'Конверсия интервью → оффер', '20-30%'],
                    ['Cost per Hire (стоимость найма)', 'Все расходы / число наймов', 'Зависит от региона'],
                  ].map(([m, what, bench]) => (
                    <tr key={m}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{m}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{what}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{bench}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* ── Performance ── */}
      {tab === 'performance' && (
        <>
          <section className="card">
            <h2>📊 Фреймворки оценки и роста</h2>
            <div style={{ display: 'grid', gap: 20 }}>
              {perfFramework.map(fw => (
                <div key={fw.name} style={{ padding: 20, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <h3 style={{ margin: '0 0 8px' }}>{fw.name}</h3>
                  <p style={{ margin: '0 0 12px', fontSize: '0.85rem', opacity: 0.7 }}>{fw.desc}</p>

                  <div style={{ padding: 12, background: 'var(--bg)', borderRadius: 6, marginBottom: 12 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>📌 {fw.example.objective}</div>
                    {fw.example.keyResults.map((kr, i) => (
                      <div key={i} style={{ fontSize: '0.85rem', paddingLeft: 16, marginBottom: 4 }}>
                        ✅ {kr}
                      </div>
                    ))}
                  </div>

                  <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>🕐 Когда использовать: {fw.when}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>📈 Грейд-матрица (пример)</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Критерий</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Junior</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Middle</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Senior</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Самостоятельность', 'С помощью', 'Сам в знакомом', 'Сам в неизвестном'],
                    ['Scope задач (охват)', 'Фича / баг', 'Эпик / модуль', 'Система / архитектура'],
                    ['Code Review', 'Получает', 'Даёт + получает', 'Формирует стандарты'],
                    ['Менторство', '—', 'Помогает джунам', 'Менторит + развивает'],
                    ['Влияние', 'На свои задачи', 'На команду', 'На организацию'],
                    ['Oncall / incidents (дежурство / инциденты)', 'Наблюдает', 'Участвует', 'Владеет процессом'],
                  ].map(([criterion, jun, mid, sen]) => (
                    <tr key={criterion}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{criterion}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'center', fontSize: '0.85rem' }}>{jun}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'center', fontSize: '0.85rem' }}>{mid}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'center', fontSize: '0.85rem' }}>{sen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* ── Underperformance ── */}
      {tab === 'underperf' && (
        <>
          <section className="card">
            <h2>⚠️ Работа с Low Performance (низкой эффективностью)</h2>
            <p style={{ marginBottom: 20 }}>Не справляется ≠ плохой человек. Это сигнал: что-то не совпадает. Задача тимлида — разобраться и помочь. Если не получается — честно расстаться.</p>

            <div style={{ position: 'relative' }}>
              {underperformanceSteps.map((s, i) => (
                <div key={s.step} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 40 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'var(--accent)', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '0.9rem',
                    }}>
                      {s.step}
                    </div>
                    {i < underperformanceSteps.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: 'var(--border)', marginTop: 4 }} />
                    )}
                  </div>
                  <div style={{ flex: 1, padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <h4 style={{ margin: 0 }}>{s.title}</h4>
                      <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{s.timing}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>{s.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>🚫 Типичные ошибки</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
              {[
                { error: 'Игнорировать проблему', result: 'Команда видит, что «можно не стараться». Мораль падает.', fix: 'Реагируй в течение 2 недель после обнаружения' },
                { error: 'Фидбек без фактов', result: '«Ты плохо работаешь» — обида, не улучшение', fix: 'SBI: conкретная ситуация + поведение + влияние' },
                { error: 'PIP как формальность', result: 'Человек чувствует предательство, команда видит обман', fix: 'PIP = реальный шанс. Если решение принято — не делай PIP' },
                { error: 'Уволить без подготовки', result: 'Юридические риски, токсичный уход, слухи', fix: 'Документируй всё. HR в курсе. Предложи альтернативы' },
              ].map(e => (
                <div key={e.error} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <h4 style={{ margin: '0 0 4px', color: '#ef4444' }}>❌ {e.error}</h4>
                  <p style={{ margin: '0 0 8px', fontSize: '0.8rem', opacity: 0.7 }}>{e.result}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#22c55e' }}>✅ {e.fix}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── Scripts ── */}
      {tab === 'scripts' && (
        <section className="card">
          <h2>📝 Готовые скрипты</h2>
          <p style={{ marginBottom: 16 }}>Шаблоны для типичных ситуаций. Адаптируй под свой стиль и контекст.</p>

          <div style={{ display: 'grid', gap: 16 }}>
            {interviewScripts.map(s => (
              <div key={s.situation} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '1rem' }}>{s.situation}</h3>
                <pre style={{
                  margin: 0,
                  padding: 16,
                  background: 'var(--bg)',
                  borderRadius: 6,
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'inherit',
                }}>
                  {s.script}
                </pre>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Interview ── */}
      <section className="card">
        <h2>❓ Вопросы на собесе</h2>
        <div className="interview-item"><div className="q">Как вы организуете процесс найма в команду?</div><div className="a">Воронка: профиль роли (≤5 must-have) → sourcing (referrals + LinkedIn + комьюнити) → скрининг 20 мин → техническое (live coding или take-home) → culture add (peer interview) → оффер за 48ч. Метрики: time-to-hire 30 дней, offer acceptance 85%+, quality of hire через 6 мес perf review.</div></div>
        <div className="interview-item"><div className="q">Как работаете с underperformance (низкой эффективностью)?</div><div className="a">Факты, не мнения. SBI-фидбек → выясняю причину (выгорание? неподходящие задачи? непонимание ожиданий?). Если нужно — PIP на 6 недель: конкретные цели, еженедельные чек-ины. Промежуточная оценка на неделе 4. Улучшился → празднуем. Нет → честный разговор о ротации или расставании. Документирую всё.</div></div>
        <div className="interview-item"><div className="q">Как проводите performance review (оценку эффективности)?</div><div className="a">Раз в полгода: self-review → peer feedback (3 коллеги) → мой assessment по грейд-матрице → итоговый 1-on-1. По результату: IDP на следующий квартал (2-3 цели + шаги). Привязка к зарплатному ревью. Между ревью — continuous feedback (непрерывная обратная связь) на 1-on-1 каждые 2 недели.</div></div>
      </section>

      {/* Материалы */}
      <div className="card">
        <h3>📚 Материалы для изучения</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="https://ru.wikipedia.org/wiki/Управление_эффективностью" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Performance Management — Википедия
          </a>
        </div>
      </div>
    </div>
  )
}
