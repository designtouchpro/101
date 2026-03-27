import { useState } from 'react'

type Tab = 'attribution' | 'incrementality' | 'martech' | 'mistakes'

const attributionModels: {
  name: string; how: string; pros: string; cons: string; when: string
}[] = [
  { name: 'Last Click', how: '100% конверсии → последнему касанию', pros: 'Простота, легко внедрить', cons: 'Игнорирует верх воронки', when: 'Быстрые воронки (e-commerce, impulse)' },
  { name: 'First Click', how: '100% конверсии → первому касанию', pros: 'Показывает discovery-каналы', cons: 'Игнорирует nurturing', when: 'Awareness-кампании, brand' },
  { name: 'Linear', how: 'Равномерно по всем точкам', pros: 'Справедливый обзор', cons: 'Все касания «одинаково важны»', when: 'Длинные воронки, B2B' },
  { name: 'Time Decay', how: 'Больший вес → ближе к конверсии', pros: 'Учитывает recency', cons: 'Недооценивает awareness', when: 'Когда ключевые касания ближе к покупке' },
  { name: 'Position-Based (U)', how: '40% first + 40% last + 20% mid', pros: 'Баланс discovery и close', cons: 'Средние тоже важны', when: 'Стандарт для среднего бизнеса' },
  { name: 'Data-Driven', how: 'ML-модель на исторических данных', pros: 'Самая точная', cons: 'Нужно много данных (1000+ конверсий)', when: 'Зрелый маркетинг с объёмом' },
]

const martechLayers: {
  layer: string; tools: string; purpose: string; dataType: string
}[] = [
  { layer: 'Collection', tools: 'GA4, Segment, Amplitude, Snowplow', purpose: 'Сбор событий и данных', dataType: 'Events, page views, clicks' },
  { layer: 'Storage', tools: 'BigQuery, Snowflake, Redshift, ClickHouse', purpose: 'Хранение и обработка', dataType: 'Raw & processed events' },
  { layer: 'Activation', tools: 'Braze, Customer.io, Mailchimp, OneSignal', purpose: 'Коммуникация с пользователем', dataType: 'Profiles, segments, campaigns' },
  { layer: 'Analytics', tools: 'Looker, Metabase, Tableau, Mode', purpose: 'Визуализация и отчёты', dataType: 'Dashboards, reports' },
  { layer: 'Attribution', tools: 'AppsFlyer, Adjust, GA4, Rockerbox', purpose: 'Связь касаний с конверсиями', dataType: 'Touch points, journeys' },
  { layer: 'Orchestration', tools: 'CDP (Segment, mParticle), ETL (Fivetran)', purpose: 'Интеграция и маршрутизация данных', dataType: 'Unified profiles, syncs' },
]

const hygienePractices: {
  practice: string; problem: string; solution: string
}[] = [
  { practice: 'UTM-конвенции', problem: 'utm_source=facebook vs Facebook vs fb', solution: 'Единый naming: lowercase, шаблоны в Google Sheet, валидация URL builder' },
  { practice: 'Дедупликация', problem: 'Один пользователь = 3 профиля (email + phone + cookie)', solution: 'Identity resolution: детерминистический (email match) + вероятностный (device graph)' },
  { practice: 'Consent & Privacy', problem: 'Потеря данных из-за iOS ATT, GDPR', solution: 'Server-side tracking, first-party data strategy, consent management (OneTrust)' },
  { practice: 'Event quality', problem: 'Дубли событий, пустые поля, рассинхрон', solution: 'Schema validation (Snowplow Iglu, Segment Protocols), QA-pipeline' },
  { practice: 'Lookback window', problem: 'Конверсия через 90 дней — кому приписать?', solution: 'Стандарт: 30 дней для most, 7 дней для view-through, 90 для B2B' },
]

const mistakes: {
  mistake: string; why: string; fix: string; severity: string
}[] = [
  { mistake: 'Только Last Click', why: 'Верх воронки выглядит бесполезным → срезают бюджеты → падает pipeline', fix: 'Position-Based как минимум, Data-Driven если хватает данных', severity: '🔴' },
  { mistake: 'Нет incrementality-тестов', why: 'Атрибуция показывает корреляцию, а не causation', fix: 'Geo-lift или holdout-тесты для крупных каналов раз в квартал', severity: '🔴' },
  { mistake: 'Грязные UTM', why: 'Невозможно агрегировать данные, отчёты врут', fix: 'Единый naming guide + UTM builder + автоматическая валидация', severity: '🟡' },
  { mistake: 'Доверие pixel-based в мире iOS 14+', why: 'ATT opt-in ~25% → потеря 75% данных', fix: 'Server-side Conversion API (Meta CAPI, Google EC), modeled conversions', severity: '🔴' },
  { mistake: 'Нет единого источника правды', why: 'GA говорит одно, Facebook другое, CRM третье', fix: 'Warehouse-centric attribution: всё в BigQuery/Snowflake, один SQL-pipeline', severity: '🟡' },
  { mistake: 'Считают только online-касания', why: 'Offline (OOH, podcasts, WOM) не учтены → их «ROI = 0»', fix: 'Marketing mix modeling (MMM) для канального микса, brand lift studies', severity: '🟡' },
  { mistake: 'Смешивают корреляцию и каузальность', why: '«Retargeting ROI = 10x» — но они и так бы купили', fix: 'Holdout-группы: показываем рекламу 90%, не показываем 10%, сравниваем', severity: '🔴' },
  { mistake: 'Нет view-through attribution', why: 'Impression без клика тоже влияет, особенно video/display', fix: 'View-through window 1-7 дней, отдельный отчёт, не смешивать с click-through', severity: '🟡' },
]

export default function AttributionMartech() {
  const [tab, setTab] = useState<Tab>('attribution')

  return (
    <div className="demo-container">
      <h1>📡 Атрибуция и MarTech</h1>
      <p className="section-desc">
        Как правильно измерять эффективность маркетинга: модели атрибуции, инкрементальность,
        стек технологий и типичные ошибки в данных.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {([
          ['attribution', '🔀 Атрибуция'],
          ['incrementality', '🧪 Инкрементальность'],
          ['martech', '🛠 MarTech Stack'],
          ['mistakes', '⚠️ Ошибки измерений'],
        ] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              cursor: 'pointer', padding: '8px 16px', fontSize: '0.9rem',
              border: '1px solid var(--border)', borderRadius: 8,
              background: tab === key ? 'var(--accent-blue, #007AFF)' : 'var(--bg-secondary)',
              color: tab === key ? '#fff' : 'var(--text-primary)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'attribution' && (
        <>
          <section className="card">
            <h2>🔀 Multi-Touch Attribution (MTA)</h2>
            <p>
              Пользователь видит рекламу в Instagram → читает статью в блоге → кликает по email →
              покупает. Кому приписать конверсию? MTA отвечает на этот вопрос.
            </p>
            <div className="info-box" style={{ marginTop: 12 }}>
              <strong>💡 Ключевое:</strong> Ни одна модель не идеальна. Выбор зависит от длины
              воронки, количества данных и зрелости маркетинга.
            </div>
          </section>

          <section className="card">
            <h2>📊 Модели атрибуции</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ textAlign: 'left', padding: 8 }}>Модель</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Как работает</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Плюсы</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Минусы</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Когда</th>
                  </tr>
                </thead>
                <tbody>
                  {attributionModels.map(m => (
                    <tr key={m.name} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: 8 }}><strong>{m.name}</strong></td>
                      <td style={{ padding: 8 }}>{m.how}</td>
                      <td style={{ padding: 8 }}>{m.pros}</td>
                      <td style={{ padding: 8, color: 'var(--text-secondary)' }}>{m.cons}</td>
                      <td style={{ padding: 8 }}>{m.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>🗺️ Путь пользователя — пример</h2>
            <div style={{
              display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center',
              padding: 16, background: 'var(--bg-secondary)', borderRadius: 8,
            }}>
              {[
                { ch: 'YouTube', pct: { last: '0%', first: '100%', linear: '25%', u: '40%' }, icon: '📺' },
                { ch: 'Blog (SEO)', pct: { last: '0%', first: '0%', linear: '25%', u: '10%' }, icon: '📝' },
                { ch: 'Email', pct: { last: '0%', first: '0%', linear: '25%', u: '10%' }, icon: '📧' },
                { ch: 'Retargeting', pct: { last: '100%', first: '0%', linear: '25%', u: '40%' }, icon: '🎯' },
              ].map((step, i) => (
                <div key={i} style={{
                  flex: 1, minWidth: 120, padding: 12, borderRadius: 8,
                  border: '1px solid var(--border)', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.5rem' }}>{step.icon}</div>
                  <strong>{step.ch}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                    LC: {step.pct.last} · FC: {step.pct.first}<br />
                    Lin: {step.pct.linear} · U: {step.pct.u}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 8 }}>
              LC = Last Click, FC = First Click, Lin = Linear, U = Position-Based
            </p>
          </section>
        </>
      )}

      {tab === 'incrementality' && (
        <>
          <section className="card">
            <h2>🧪 Инкрементальность — причинно-следственная связь</h2>
            <p>
              Атрибуция показывает <strong>корреляцию</strong>. Инкрементальность показывает
              <strong> каузальность</strong>. «Эти конверсии произошли <em>благодаря</em> рекламе,
              а не просто после неё».
            </p>
            <div className="info-box" style={{ marginTop: 12 }}>
              <strong>💡 Пример:</strong> Retargeting показывает ROI 10x по атрибуции. Но holdout-тест
              показал, что 80% этих пользователей купили бы и без рекламы. Реальный incremental ROI = 2x.
            </div>
          </section>

          <section className="card">
            <h2>📋 Методы измерения инкрементальности</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ textAlign: 'left', padding: 8 }}>Метод</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Как работает</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Точность</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Сложность</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Когда</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Holdout Test', how: 'Случайная часть аудитории не видит рекламу', accuracy: '⭐⭐⭐', complexity: '⭐⭐', when: 'Retargeting, email, push' },
                    { name: 'Geo-Lift Test', how: 'Один регион — test, другой — control', accuracy: '⭐⭐⭐', complexity: '⭐⭐⭐', when: 'TV, OOH, brand campaigns' },
                    { name: 'Ghost Ads', how: 'Фиксируем, где показали бы рекламу, но не показываем', accuracy: '⭐⭐', complexity: '⭐⭐⭐', when: 'Display, programmatic' },
                    { name: 'PSA/Placebo', how: 'Control видит PSA-рекламу вместо бренда', accuracy: '⭐⭐⭐', complexity: '⭐⭐', when: 'Facebook/Meta Conversion Lift' },
                    { name: 'Marketing Mix Modeling', how: 'Регрессия по историческим данным + внешние факторы', accuracy: '⭐⭐', complexity: '⭐⭐⭐', when: 'Стратегическое планирование, offline+online' },
                  ].map(m => (
                    <tr key={m.name} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: 8 }}><strong>{m.name}</strong></td>
                      <td style={{ padding: 8 }}>{m.how}</td>
                      <td style={{ padding: 8 }}>{m.accuracy}</td>
                      <td style={{ padding: 8 }}>{m.complexity}</td>
                      <td style={{ padding: 8 }}>{m.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>📐 Формула инкрементального ROI</h2>
            <div style={{
              padding: 20, background: 'var(--bg-secondary)', borderRadius: 8,
              fontFamily: 'monospace', lineHeight: 2,
            }}>
              <div><strong>Incremental Conversions</strong> = Conv(test) − Conv(control) × (size_test / size_control)</div>
              <div><strong>iROAS</strong> = Incremental Revenue / Ad Spend</div>
              <div><strong>iCPA</strong> = Ad Spend / Incremental Conversions</div>
            </div>
            <div className="info-box" style={{ marginTop: 12 }}>
              <strong>⚠️ Правило:</strong> Проводить incrementality-тест для каждого канала с бюджетом
              {'>'} 10% от общего. Минимум раз в квартал. Результаты MTA калибровать по incrementality.
            </div>
          </section>
        </>
      )}

      {tab === 'martech' && (
        <>
          <section className="card">
            <h2>🛠 MarTech Stack — слои технологического стека</h2>
            <p>
              MarTech — это технологии, которые маркетинг использует для сбора данных,
              автоматизации и измерения. Средний B2B-стек = 50-100 инструментов.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ textAlign: 'left', padding: 8 }}>Слой</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Инструменты</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Назначение</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Тип данных</th>
                  </tr>
                </thead>
                <tbody>
                  {martechLayers.map(l => (
                    <tr key={l.layer} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: 8 }}><strong>{l.layer}</strong></td>
                      <td style={{ padding: 8 }}>{l.tools}</td>
                      <td style={{ padding: 8 }}>{l.purpose}</td>
                      <td style={{ padding: 8, color: 'var(--text-secondary)' }}>{l.dataType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>🧹 Data Hygiene — гигиена данных</h2>
            <p>
              Без чистых данных любая атрибуция — ложь. Data hygiene — это не разовое действие,
              а процесс.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ textAlign: 'left', padding: 8 }}>Практика</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Проблема</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Решение</th>
                  </tr>
                </thead>
                <tbody>
                  {hygienePractices.map(p => (
                    <tr key={p.practice} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: 8 }}><strong>{p.practice}</strong></td>
                      <td style={{ padding: 8 }}>{p.problem}</td>
                      <td style={{ padding: 8 }}>{p.solution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>🏗 Архитектура Modern MarTech Stack</h2>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 8,
              padding: 16, background: 'var(--bg-secondary)', borderRadius: 8,
            }}>
              {[
                { label: 'Sources', items: 'Web (GA4) · App (AppsFlyer) · CRM (HubSpot) · Ads (Meta/Google)', color: '#007AFF' },
                { label: 'Collection', items: 'Segment / Snowplow / GTM Server', color: '#5856D6' },
                { label: 'Warehouse', items: 'BigQuery / Snowflake / ClickHouse', color: '#34C759' },
                { label: 'Transformation', items: 'dbt · SQL models · reverse ETL', color: '#FF9500' },
                { label: 'Activation', items: 'Braze · Customer.io · Audiences → Ads', color: '#FF3B30' },
              ].map((layer, i) => (
                <div key={i} style={{
                  padding: 12, borderRadius: 8, border: `2px solid ${layer.color}`,
                  display: 'flex', gap: 12, alignItems: 'center',
                }}>
                  <strong style={{ minWidth: 100, color: layer.color }}>{layer.label}</strong>
                  <span>{layer.items}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 8 }}>
              Тренд: Composable CDP — warehouse как центр, reverse ETL для активации (Census, Hightouch)
            </p>
          </section>
        </>
      )}

      {tab === 'mistakes' && (
        <>
          <section className="card">
            <h2>⚠️ Типичные ошибки измерений</h2>
            <p>
              Большинство маркетинговых команд делают хотя бы 3 из этих ошибок.
              Каждая стоит денег — либо через перерасход, либо через неправильные решения.
            </p>
          </section>

          {mistakes.map((m, i) => (
            <section key={i} className="card">
              <h3>{m.severity} {m.mistake}</h3>
              <p style={{ color: 'var(--text-secondary)', margin: '4px 0 8px' }}><strong>Последствие:</strong> {m.why}</p>
              <div className="info-box">
                <strong>✅ Как исправить:</strong> {m.fix}
              </div>
            </section>
          ))}

          <section className="card">
            <h2>📋 Чеклист здоровых измерений</h2>
            <div style={{ lineHeight: 2 }}>
              {[
                'Единый UTM naming guide + автоматическая валидация',
                'Server-side tracking для Meta CAPI и Google EC',
                'Минимум Position-Based атрибуция (не Last Click)',
                'Incrementality-тест для каналов с бюджетом > 10%',
                'Warehouse как единый источник правды',
                'Consent management для GDPR/iOS ATT',
                'Lookback windows документированы и согласованы',
                'MMM для стратегических решений раз в полгода',
              ].map((item, i) => (
                <div key={i}>☑️ {item}</div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
