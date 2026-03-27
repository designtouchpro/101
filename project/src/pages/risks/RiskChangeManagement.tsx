import { useState } from 'react'

const criticalPathSteps = [
  { step: 1, name: 'Список задач', desc: 'Определить все задачи проекта (WBS)' },
  { step: 2, name: 'Зависимости', desc: 'Установить FS/FF/SS/SF связи между задачами' },
  { step: 3, name: 'Оценка длительности', desc: 'Оценить время каждой задачи (PERT / эксперт.)' },
  { step: 4, name: 'Forward pass (прямой проход)', desc: 'Вычислить Early Start (ранний старт) и Early Finish (раннее окончание) — слева направо' },
  { step: 5, name: 'Backward pass (обратный проход)', desc: 'Вычислить Late Start (поздний старт) и Late Finish (позднее окончание) — справа налево' },
  { step: 6, name: 'Float (запас времени) = LS − ES', desc: 'Задачи с Float=0 → Critical Path (критический путь)' },
]

const dependencyTypes = [
  { type: 'FS — Finish-to-Start (окончание–начало)', icon: '→', desc: 'B начинается после A', example: 'Тестирование после разработки', freq: 'Самый частый (~90%)' },
  { type: 'SS — Start-to-Start (начало–начало)', icon: '⇉', desc: 'B начинается вместе с A', example: 'Документация параллельно разработке', freq: 'Частый' },
  { type: 'FF — Finish-to-Finish (окончание–окончание)', icon: '⇇', desc: 'B завершается вместе с A', example: 'UAT завершается с фиксами', freq: 'Редкий' },
  { type: 'SF — Start-to-Finish (начало–окончание)', icon: '↩', desc: 'B завершается после старта A', example: 'Старая система до запуска новой', freq: 'Крайне редкий' },
]

const quantRiskData = [
  { technique: 'EMV (Expected Monetary Value — ожидаемая денежная стоимость)', formula: 'EMV = P × Impact', when: 'Бюджетные решения, выбор стратегии', example: 'Риск: P=30%, Impact=$100k → EMV = $30k' },
  { technique: 'PERT (3-point)', formula: '(O + 4M + P) / 6', when: 'Оценка длительности с неопределённостью', example: 'O=5, M=8, P=17 → (5+32+17)/6 = 9 дней' },
  { technique: 'Monte Carlo', formula: 'Симуляция N раз', when: 'Оценка вероятности сроков/бюджета', example: 'P80 = 90% вер. уложиться в 12 нед.' },
  { technique: 'Decision Tree (дерево решений)', formula: 'Суммируем EMV ветвей', when: 'Выбор между стратегиями', example: 'Build vs Buy: сравниваем суммарный EMV' },
  { technique: 'Sensitivity / Tornado (анализ чувствительности)', formula: 'Ранжирование по влиянию', when: 'Фокус на самые влиятельные риски', example: 'Задержка API → ±3 нед. > другие риски' },
]

const changeProcess = [
  { step: 'Инициация', icon: '📝', desc: 'Запрос на изменение (Change Request)', who: 'Любой стейкхолдер', output: 'CR заполнен в шаблоне' },
  { step: 'Оценка влияния (Impact)', icon: '🔍', desc: 'Анализ влияния на scope (объём), schedule (сроки), cost (стоимость), quality (качество)', who: 'PM + техлид', output: 'Impact assessment (оценка влияния)' },
  { step: 'Рассмотрение CCB', icon: '🏛️', desc: 'Change Control Board (комитет по управлению изменениями) рассматривает', who: 'CCB (PM, спонсор, лиды)', output: 'Одобрено / Отклонено / Отложено (Approved / Rejected / Deferred)' },
  { step: 'Реализация', icon: '⚙️', desc: 'Внесение изменений, обновление планов', who: 'Команда', output: 'Обновлённые артефакты' },
  { step: 'Валидация', icon: '✅', desc: 'Проверка что изменение работает', who: 'QA + PM', output: 'Подтверждение' },
  { step: 'Закрытие', icon: '📦', desc: 'Обновление реестра, lessons learned', who: 'PM', output: 'CR закрыт' },
]

const scopeStrategies = [
  { scenario: 'Scope creep (ползучее расширение)', signal: 'Новые требования без CR', response: 'Фиксировать scope baseline (базовый план по объёму), все изменения через CR', mindset: 'Каждый «маленький фикс» имеет цену' },
  { scenario: 'Gold plating (перфекционизм)', signal: 'Команда добавляет незапрашиваемое', response: 'DoD строгий, review scope каждый спринт', mindset: 'Делаем ровно то, что несёт value' },
  { scenario: 'Ambiguous requirements', signal: 'Разные стейкхолдеры по-разному понимают', response: 'Acceptance criteria (критерии приёмки), mockups (макеты), spike (исследование)', mindset: 'Чем раньше уточнить — тем дешевле' },
  { scenario: 'Sponsor changes priority', signal: 'Стратегический разворот', response: 'Пересчитать critical path (критический путь), re-baseline (обновить базовый план)', mindset: 'Это нормально — адаптируемся, не ломаемся' },
]

export default function RiskChangeManagement() {
  const [tab, setTab] = useState<'deps' | 'quantRisk' | 'change' | 'scope'>('deps')

  return (
    <div className="demo-container">
      <h1>🔗 Зависимости, Риски и Управление изменениями</h1>
      <p>Critical path, количественный анализ рисков, Change Management и решения под неопределённость.</p>

      <div style={{ display: 'flex', gap: 8, margin: '24px 0', flexWrap: 'wrap' }}>
        {([
          ['deps', '🔗 Зависимости и CP'],
          ['quantRisk', '📊 Количественные риски'],
          ['change', '🔄 Change Management'],
          ['scope', '🎯 Scope под давлением'],
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

      {/* ── Dependencies & Critical Path ── */}
      {tab === 'deps' && (
        <>
          <section className="card">
            <h2>🔗 Типы зависимостей</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Тип</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Связь</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Описание</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Пример</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Частота</th>
                  </tr>
                </thead>
                <tbody>
                  {dependencyTypes.map(d => (
                    <tr key={d.type}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.85rem' }}>{d.type}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'center', fontSize: '1.2rem' }}>{d.icon}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{d.desc}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{d.example}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'center', fontSize: '0.8rem' }}>{d.freq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>📍 Critical Path Method / Метод критического пути (CPM)</h2>
            <p style={{ marginBottom: 16, fontSize: '0.85rem', opacity: 0.8 }}>Critical Path — самая длинная цепочка зависимых задач. Задержка на CP = задержка всего проекта.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {criticalPathSteps.map(s => (
                <div key={s.step} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ minWidth: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{s.step}</div>
                  <div style={{ flex: 1, padding: 12, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                    <span style={{ fontWeight: 600 }}>{s.name}</span>
                    <span style={{ fontSize: '0.85rem', marginLeft: 8, opacity: 0.8 }}>— {s.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, padding: 16, background: 'var(--card-bg)', border: '2px solid var(--accent)', borderRadius: 8 }}>
              <h4 style={{ margin: '0 0 8px' }}>💡 Fast Tracking vs Crashing</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Fast Tracking (быстрый проход)</div>
                  <div style={{ fontSize: '0.85rem' }}>Параллелизация задач с CP. Быстрее, но ↑ риск переделок (rework).</div>
                </div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Crashing (сжатие)</div>
                  <div style={{ fontSize: '0.85rem' }}>Добавление ресурсов. Дороже, но снижает длительность при минимальном риске.</div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── Quantitative Risk ── */}
      {tab === 'quantRisk' && (
        <section className="card">
          <h2>📊 Количественный анализ рисков</h2>
          <p style={{ marginBottom: 16, fontSize: '0.85rem', opacity: 0.8 }}>Переход от «красный / жёлтый / зелёный» к цифрам и вероятностям.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {quantRiskData.map(r => (
              <div key={r.technique} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                  <h3 style={{ margin: 0 }}>{r.technique}</h3>
                  <code style={{ padding: '4px 10px', borderRadius: 6, background: 'var(--bg)', fontSize: '0.85rem' }}>{r.formula}</code>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6 }}>Когда</div>
                    <div style={{ fontSize: '0.85rem' }}>{r.when}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6 }}>Пример</div>
                    <div style={{ fontSize: '0.85rem' }}>{r.example}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <h3 style={{ margin: '0 0 12px' }}>🎯 Risk Response Strategies (стратегии реагирования на риски)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, textAlign: 'center' }}>
              {[
                { name: 'Avoid (избежать)', icon: '🚫', desc: 'Исключить причину' },
                { name: 'Mitigate (смягчить)', icon: '🛡️', desc: 'Снизить P или Impact' },
                { name: 'Transfer (передать)', icon: '📦', desc: 'Передать (страховка, аутсорс)' },
                { name: 'Accept (принять)', icon: '✋', desc: 'Принять (план на случай реализации)' },
                { name: 'Exploit (использовать)', icon: '🚀', desc: 'Усилить позитивный риск' },
              ].map(s => (
                <div key={s.name} style={{ padding: 12, background: 'var(--bg)', borderRadius: 8 }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Change Management ── */}
      {tab === 'change' && (
        <section className="card">
          <h2>🔄 Change Control Process (процесс управления изменениями)</h2>
          <p style={{ marginBottom: 16, fontSize: '0.85rem', opacity: 0.8 }}>Структурированный подход к обработке изменений в проекте.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {changeProcess.map((c, i) => (
              <div key={c.step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 44, height: 44, borderRadius: 8, background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{c.icon}</div>
                <div style={{ flex: 1, padding: 14, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontWeight: 600 }}>Шаг {i + 1}: {c.step}</span>
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 4, background: 'var(--bg)' }}>{c.who}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', marginBottom: 4 }}>{c.desc}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>→ {c.output}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, padding: 16, background: 'var(--card-bg)', border: '2px solid #f59e0b', borderRadius: 8 }}>
            <h4 style={{ margin: '0 0 8px', color: '#f59e0b' }}>⚠️ Change Request Template (шаблон запроса на изменение)</h4>
            <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
{`CR-ID:  ___
Дата:   ___
Автор:  ___

Описание изменения:
  [Что меняется и почему]

Impact Analysis:
  Scope:    [+N story points / -N features]
  Schedule: [+N дней / без изменений]
  Cost:     [+$X / без изменений]
  Quality:  [Описание влияния]
  Risk:     [Новые риски]

Decision: [ ] Approved  [ ] Rejected  [ ] Deferred
Approver: ___`}
            </div>
          </div>
        </section>
      )}

      {/* ── Scope Under Pressure ── */}
      {tab === 'scope' && (
        <section className="card">
          <h2>🎯 Принятие решений в неопределённости</h2>

          <div style={{ overflowX: 'auto', marginBottom: 16 }}>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Сценарий</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Сигнал</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Реакция</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Mindset (образ мышления)</th>
                </tr>
              </thead>
              <tbody>
                {scopeStrategies.map(s => (
                  <tr key={s.scenario}>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.85rem' }}>{s.scenario}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{s.signal}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{s.response}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem', fontStyle: 'italic' }}>{s.mindset}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <h3 style={{ margin: '0 0 12px' }}>🧭 Iron Triangle (железный треугольник) под давлением</h3>
            <p style={{ fontSize: '0.85rem', marginBottom: 12 }}>Scope, Time, Cost, Quality — нельзя зафиксировать все 4. При давлении:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[
                { constraint: 'Фиксированный срок', trade: 'Гибкий scope', how: 'MoSCoW: сначала Must, потом Should' },
                { constraint: 'Фиксированный scope', trade: 'Гибкий срок', how: 'Re-estimate с командой, buffer' },
                { constraint: 'Фиксированный бюджет', trade: 'Scope или качество', how: 'Priority matrix, technical debt budget' },
              ].map(t => (
                <div key={t.constraint} style={{ padding: 12, background: 'var(--bg)', borderRadius: 8 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.constraint}</div>
                  <div style={{ fontSize: '0.85rem', marginBottom: 4, color: 'var(--accent)' }}>↔ {t.trade}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{t.how}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Interview ── */}
      <section className="card">
        <h2>❓ Вопросы на собесе</h2>
        <div className="interview-item"><div className="q">Что такое Critical Path и зачем он нужен?</div><div className="a">Critical Path — самая длинная цепочка зависимых задач без float. Задержка на CP = задержка проекта. Нужен для: приоритизации (CP-задачи первые), планирования ресурсов, ответа на «когда закончим?». Вычисляется forward + backward pass.</div></div>
        <div className="interview-item"><div className="q">Как вы обрабатываете Change Requests?</div><div className="a">Через формальный процесс: CR → impact analysis (scope/schedule/cost/quality) → CCB review → approve/reject/defer → реализация → валидация → закрытие. Ключевое: ни одно изменение не проходит без impact assessment, даже «маленькое».</div></div>
        <div className="interview-item"><div className="q">Scope creep — как боретесь?</div><div className="a">Scope baseline фиксирован. Все изменения через Change Request. Регулярный scope review. Прозрачность: показываю стейкхолдерам trade-offs (добавляем X — сдвигаем Y или убираем Z). MoSCoW приоритизация как инструмент переговоров.</div></div>
      </section>
    </div>
  )
}
