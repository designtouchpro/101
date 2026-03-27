import { useState } from 'react'

const researchMethods = [
  {
    name: 'Глубинное интервью',
    type: 'Качественный',
    icon: '🎙️',
    when: 'Discovery, поиск проблем',
    sample: '5-8 человек',
    duration: '30-60 мин',
    output: 'Инсайты, цитаты, JTBD',
    tips: [
      'Открытые вопросы: «Расскажите о последнем разе, когда…»',
      'Никогда: «Вам бы понравилось, если…?» (наводящий)',
      'Слушай 80%, говори 20%',
      'Записывай дословные цитаты',
    ],
  },
  {
    name: 'Юзабилити-тест',
    type: 'Качественный',
    icon: '🖱️',
    when: 'Валидация UI, поиск UX-проблем',
    sample: '5 человек (находят ~85% проблем)',
    duration: '15-30 мин на участника',
    output: 'Проблемы навигации, task completion rate',
    tips: [
      'Сценарий: «Найдите и купите товар до 500₽»',
      'Think-aloud protocol: проси проговаривать мысли',
      'Не помогай, не подсказывай',
      'Фиксируй: где завис, где ошибся, где эмоция',
    ],
  },
  {
    name: 'Опрос (Survey)',
    type: 'Количественный',
    icon: '📋',
    when: 'Валидация гипотез на масштабе',
    sample: '100+ респондентов',
    duration: '5-10 мин на заполнение',
    output: 'Статистика, NPS, CSAT, приоритеты',
    tips: [
      'Не более 10-15 вопросов',
      'Шкалы: 5 или 7 баллов (не 10)',
      'Один вопрос = одна тема',
      'Пилот: проверь на 5 людях перед запуском',
    ],
  },
  {
    name: 'A/B тест (Experiment)',
    type: 'Количественный',
    icon: '🧪',
    when: 'Проверка impact на метрику',
    sample: 'Зависит от MDE и baseline',
    duration: '1-4 недели',
    output: 'Статзначимость, uplift, p-value',
    tips: [
      'Одна переменная за раз',
      'Sample size calculator ДО запуска',
      'Не подглядывай (peeking problem)',
      'Определи stopping rule заранее',
    ],
  },
  {
    name: 'Анализ данных',
    type: 'Количественный',
    icon: '📊',
    when: 'Поиск паттернов в поведении',
    sample: 'Все доступные данные',
    duration: '1-5 дней',
    output: 'Воронки, когорты, сегменты',
    tips: [
      'Сначала вопрос, потом данные (не наоборот)',
      'Корреляция ≠ причинность',
      'Проверяй аномалии (баги трекинга)',
      'Визуализируй: графики убедительнее таблиц',
    ],
  },
  {
    name: 'Fake Door / Painted Door',
    type: 'Validation',
    icon: '🚪',
    when: 'Проверка спроса до разработки',
    sample: '1000+ показов',
    duration: '1-2 недели',
    output: 'CTR на несуществующую фичу',
    tips: [
      'Кнопка/ссылка на фичу, которой нет',
      'При клике: «Скоро! Хотите узнать первым?»',
      'CTR > 5% = сигнал к разработке',
      'Этично: не обещай сроки',
    ],
  },
]

const sampleSizeData = [
  { baseline: '5%', mde: '20% (5→6%)', perVariant: '~24,000', total: '~48,000' },
  { baseline: '5%', mde: '10% (5→5.5%)', perVariant: '~95,000', total: '~190,000' },
  { baseline: '10%', mde: '10% (10→11%)', perVariant: '~38,000', total: '~76,000' },
  { baseline: '20%', mde: '5% (20→21%)', perVariant: '~61,000', total: '~122,000' },
  { baseline: '50%', mde: '2% (50→51%)', perVariant: '~196,000', total: '~392,000' },
]

const experimentChecklist = [
  { phase: 'До запуска', items: ['Гипотеза записана (If… then… because…)', 'Метрика успеха определена', 'Sample size рассчитан', 'Stopping rule зафиксирован', 'Guard-rail метрики определены', 'Рандомизация проверена (AA-тест)'] },
  { phase: 'Во время', items: ['Не подглядывать в результаты (peeking)', 'Мониторить guard-rails (crashes, revenue)', 'Не менять условия эксперимента', 'Логировать все аномалии'] },
  { phase: 'После', items: ['Статзначимость достигнута?', 'Проверить сегменты (новые vs старые, mobile vs desktop)', 'Практическая значимость (uplift стоит усилий?)', 'Документировать результат и решение', 'Rollout или отмена'] },
]

export default function ResearchExperiments() {
  const [selectedMethod, setSelectedMethod] = useState(0)
  const [tab, setTab] = useState<'methods' | 'experiments' | 'sample'>('methods')

  const method = researchMethods[selectedMethod]!

  return (
    <div className="demo-container">
      <h1>🔬 Исследования и Эксперименты</h1>
      <p>Продуктовые решения без данных — это мнения. Этот модуль охватывает методы исследований (от интервью до A/B тестов), расчёт sample size и чек-листы экспериментов.</p>

      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: 8, margin: '24px 0', flexWrap: 'wrap' }}>
        {([
          ['methods', '🔍 Методы исследований'],
          ['experiments', '🧪 Дизайн экспериментов'],
          ['sample', '📐 Sample Size'],
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

      {/* ── Methods ── */}
      {tab === 'methods' && (
        <>
          <section className="card">
            <h2>🔍 Методы продуктовых исследований</h2>
            <p style={{ marginBottom: 16 }}>
              Качественные методы отвечают на «Почему?» (интервью, юзабилити).
              Количественные — на «Сколько?» (опросы, A/B тесты, аналитика).
              Validation — проверяет спрос до разработки.
            </p>

            {/* Method selector */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              {researchMethods.map((m, i) => (
                <button
                  key={m.name}
                  onClick={() => setSelectedMethod(i)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: selectedMethod === i ? '2px solid var(--accent)' : '1px solid var(--border)',
                    background: selectedMethod === i ? 'var(--accent)' : 'var(--card-bg)',
                    color: selectedMethod === i ? '#fff' : 'var(--text)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  {m.icon} {m.name}
                </button>
              ))}
            </div>

            {/* Selected method details */}
            <div style={{ padding: 20, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
              <h3 style={{ margin: '0 0 12px' }}>{method.icon} {method.name}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
                {[
                  ['Тип', method.type],
                  ['Когда', method.when],
                  ['Выборка', method.sample],
                  ['Длительность', method.duration],
                  ['Output', method.output],
                ].map(([label, val]) => (
                  <div key={label}>
                    <div style={{ fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase' }}>{label}</div>
                    <div style={{ fontWeight: 600 }}>{val}</div>
                  </div>
                ))}
              </div>
              <h4 style={{ margin: '0 0 8px' }}>💡 Советы</h4>
              <ul className="info-list">
                {method.tips.map((tip, i) => <li key={i} style={{ marginBottom: 4, fontSize: '0.9rem' }}>{tip}</li>)}
              </ul>
            </div>
          </section>

          <section className="card">
            <h2>🗺️ Когда какой метод</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Вопрос</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Метод</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Пример</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Какие проблемы у пользователей?', 'Глубинное интервью', '«Расскажите, как вы сейчас решаете задачу X»'],
                    ['Понятен ли интерфейс?', 'Юзабилити-тест', '«Найдите настройки уведомлений»'],
                    ['Сколько людей хотят фичу?', 'Опрос', 'NPS + «Какая фича важнее: A или B?»'],
                    ['Есть ли спрос до разработки?', 'Fake Door', 'Кнопка «Попробовать AI-помощник» → waitlist'],
                    ['Какой вариант лучше?', 'A/B тест', 'Синяя vs зелёная кнопка «Купить»'],
                    ['Где пользователи отваливаются?', 'Анализ данных', 'Воронка: регистрация → онбординг → 1-е действие'],
                  ].map(([q, m, ex]) => (
                    <tr key={q}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{q}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>{m}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* ── Experiments ── */}
      {tab === 'experiments' && (
        <>
          <section className="card">
            <h2>🧪 Дизайн эксперимента</h2>
            <p style={{ marginBottom: 16 }}>Каждый эксперимент начинается с гипотезы. Без гипотезы — это не эксперимент, а наблюдение.</p>

            <div style={{ padding: 20, background: 'var(--card-bg)', border: '2px solid var(--accent)', borderRadius: 8, marginBottom: 16 }}>
              <h3 style={{ margin: '0 0 12px' }}>📝 Шаблон гипотезы</h3>
              <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', lineHeight: 1.8 }}>
                <strong>If</strong> мы [изменение]<br/>
                <strong>Then</strong> [метрика] изменится на [X%]<br/>
                <strong>Because</strong> [обоснование: данные/исследование/интервью]
              </div>
              <div style={{ marginTop: 12, padding: '8px 12px', background: 'var(--bg)', borderRadius: 4, fontSize: '0.85rem' }}>
                <strong>Пример:</strong> If мы добавим progress bar в онбординг, Then activation rate вырастет на 15%, Because юзабилити-тесты показали, что пользователи не понимают, сколько шагов осталось.
              </div>
            </div>

            <h3>Типы экспериментов</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12, marginTop: 12 }}>
              {[
                { type: 'A/B (Split)', desc: 'Два варианта, случайное распределение. Стандарт для UI/UX.', pros: 'Простой, понятный', cons: 'Нужен трафик' },
                { type: 'Multivariate (MVT)', desc: 'Несколько переменных одновременно. Находит лучшую комбинацию.', pros: 'Больше инсайтов', cons: 'Нужно 3-5× больше трафик' },
                { type: 'Feature Flag (Staged Rollout)', desc: 'Постепенный rollout: 5% → 20% → 50% → 100%.', pros: 'Безопасность, rollback', cons: 'Не чистый эксперимент' },
                { type: 'Interleaving', desc: 'Результаты A и B перемешаны в одном UI (для поиска/рекомендаций).', pros: '10× чувствительнее A/B', cons: 'Только для ранжирования' },
              ].map(e => (
                <div key={e.type} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <h4 style={{ margin: '0 0 8px' }}>{e.type}</h4>
                  <p style={{ margin: '0 0 8px', fontSize: '0.85rem' }}>{e.desc}</p>
                  <div style={{ fontSize: '0.8rem' }}>
                    <span style={{ color: '#22c55e' }}>✅ {e.pros}</span>
                    <span style={{ marginLeft: 12, color: '#ef4444' }}>⚠️ {e.cons}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>✅ Чек-лист эксперимента</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {experimentChecklist.map(phase => (
                <div key={phase.phase} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <h3 style={{ margin: '0 0 12px', fontSize: '1rem' }}>{phase.phase}</h3>
                  {phase.items.map((item, i) => (
                    <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6, fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input type="checkbox" style={{ marginTop: 3 }} />
                      {item}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>⚠️ Типичные ошибки A/B тестов</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Ошибка</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Последствие</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Решение</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Peeking (подглядывание)', 'Ложно-положительный результат (до 30% ошибок)', 'Определи sample size и жди. Или используй sequential testing'],
                    ['Маленькая выборка', 'Результат не воспроизводится', 'Рассчитай sample size ДО запуска. Используй калькулятор'],
                    ['Несколько метрик', 'Multiple comparisons → false positives', 'Одна primary метрика. Остальные — secondary. Bonferroni correction'],
                    ['Simpson\'s Paradox', 'Агрегат показывает одно, сегменты — другое', 'Всегда разрезай по сегментам: платформа, страна, новые/старые'],
                    ['Network effects', 'Группы влияют друг на друга', 'Cluster-based randomization (по регионам/городам)'],
                    ['Novelty effect', 'Новизна, а не качество', 'Жди 2+ недели, анализируй тренд внутри теста'],
                  ].map(([err, cons, sol]) => (
                    <tr key={err}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{err}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{cons}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{sol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* ── Sample Size ── */}
      {tab === 'sample' && (
        <>
          <section className="card">
            <h2>📐 Расчёт Sample Size</h2>
            <p style={{ marginBottom: 16 }}>
              Sample size зависит от трёх факторов: <strong>baseline</strong> (текущая конверсия),
              <strong> MDE</strong> (minimum detectable effect — минимальный эффект, который хотите поймать)
              и <strong>significance level</strong> (обычно 95%). Чем меньше эффект хотите поймать — тем больше трафика нужно.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Baseline CR</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>MDE (относительный)</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>На вариант</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Итого (2 варианта)</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleSizeData.map((row, i) => (
                    <tr key={i}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{row.baseline}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>{row.mde}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>{row.perVariant}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'right', fontWeight: 600 }}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--card-bg)', borderLeft: '3px solid #3b82f6', borderRadius: 4, fontSize: '0.9rem' }}>
              <strong>Правило:</strong> Для 95% confidence, 80% power. При baseline 5% и MDE 20% (хотим поймать рост с 5% до 6%)
              нужно ~24K на вариант = ~48K total. При 1000 визитов/день = ~48 дней теста.
            </div>
          </section>

          <section className="card">
            <h2>📏 Stopping Rules</h2>
            <p style={{ marginBottom: 16 }}>
              Когда останавливать эксперимент? Три стратегии:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
              {[
                { name: 'Fixed Horizon', desc: 'Рассчитай sample size → жди → анализируй. Самый простой. Не подглядывай.', pros: 'Простой, надёжный', cons: 'Может быть долгим' },
                { name: 'Sequential Testing', desc: 'Анализируй по мере поступления данных с поправкой на multiple looks. (Always Valid Inference)', pros: 'Можно остановить раньше', cons: 'Сложнее считать' },
                { name: 'Bayesian', desc: 'Вместо p-value считай вероятность того, что B лучше A. Останавливай когда > 95%.', pros: 'Интуитивная интерпретация', cons: 'Нужен prior' },
              ].map(s => (
                <div key={s.name} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <h4 style={{ margin: '0 0 8px' }}>{s.name}</h4>
                  <p style={{ margin: '0 0 8px', fontSize: '0.85rem' }}>{s.desc}</p>
                  <div style={{ fontSize: '0.8rem' }}>
                    <span style={{ color: '#22c55e' }}>✅ {s.pros}</span><br/>
                    <span style={{ color: '#ef4444' }}>⚠️ {s.cons}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── Interview ── */}
      <section className="card">
        <h2>❓ Вопросы на собесе</h2>
        <div className="interview-item"><div className="q">Как вы проводите юзабилити-тестирование?</div><div className="a">5 участников, think-aloud protocol. Даю сценарий («Найдите и закажите курьера»), не помогаю. Фиксирую: где завис, где ошибся, дословные цитаты. 5 участников находят ~85% проблем (Nielsen). Записываю видео для стейкхолдеров</div></div>
        <div className="interview-item"><div className="q">Как определить sample size для A/B теста?</div><div className="a">Нужно знать: 1) Baseline CR (текущая конверсия), 2) MDE (минимальный эффект, который хотим поймать), 3) Confidence level (обычно 95%) и Power (80%). При baseline 5% и MDE 20% нужно ~24K на вариант. Использую калькулятор (Evan Miller, Optimizely)</div></div>
        <div className="interview-item"><div className="q">Что такое peeking problem?</div><div className="a">Подглядывание в результаты до набора sample size. Вероятность ложного срабатывания вырастает до 30%. Решение: зафиксировать stopping rule заранее (fixed horizon) или использовать sequential testing с поправкой на multiple looks</div></div>
      </section>
    </div>
  )
}
