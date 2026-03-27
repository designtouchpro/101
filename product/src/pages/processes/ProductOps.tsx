import { useState } from 'react'

const tabs = ['Стейкхолдеры', 'Product Ops', 'Запуск и Change', 'Cross-Functional'] as const
type Tab = typeof tabs[number]

export default function ProductOps() {
  const [activeTab, setActiveTab] = useState<Tab>('Стейкхолдеры')

  return (
    <div className="page">
      <h1>🤝 Product Operations & Stakeholder Management</h1>
      <p className="page-description">
        Организационная реальность продакта: как выстраивать отношения со стейкхолдерами,
        операционные ритмы команды и управление запусками. Не фреймворки, а жизнь.
      </p>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'Стейкхолдеры' && <StakeholderSection />}
        {activeTab === 'Product Ops' && <ProductOpsSection />}
        {activeTab === 'Запуск и Change' && <LaunchSection />}
        {activeTab === 'Cross-Functional' && <CrossFunctionalSection />}
      </div>
    </div>
  )
}

function StakeholderSection() {
  return (
    <>
      <div className="card">
        <h2>🗺 Карта стейкхолдеров</h2>
        <p>Стейкхолдер — любой, кто влияет на продукт или на кого влияет продукт.</p>
        <table className="comparison-table">
          <thead>
            <tr><th>Стейкхолдер</th><th>Интерес</th><th>Влияние</th><th>Стратегия</th></tr>
          </thead>
          <tbody>
            <tr><td>CEO / Founder</td><td>🔴 Высокий</td><td>🔴 Высокое</td><td>Управлять плотно (Manage closely) — регулярные 1:1, общее видение</td></tr>
            <tr><td>CTO / VP Engineering</td><td>🔴 Высокий</td><td>🔴 Высокое</td><td>Совместное планирование, технические компромиссы (trade-offs)</td></tr>
            <tr><td>Sales / BD</td><td>🔴 Высокий</td><td>🟡 Среднее</td><td>Держать довольными (Keep satisfied) — видимость roadmap, обратная связь по сделкам</td></tr>
            <tr><td>Marketing</td><td>🟡 Средний</td><td>🟡 Среднее</td><td>Держать в курсе (Keep informed) — даты запусков, ключевые сообщения</td></tr>
            <tr><td>Support / CS</td><td>🟡 Средний</td><td>🟢 Низкое</td><td>Мониторить (Monitor) — путь эскалации, сортировка багов (bug triage)</td></tr>
            <tr><td>Legal / Compliance</td><td>🟢 Переменный</td><td>🔴 Высокое (вето)</td><td>Early involvement для рисковых фич</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>📐 Матрица Influence × Interest</h2>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace', lineHeight: 1.6 }}>{`
  Высокое   │  Keep Satisfied     │  Manage Closely
  влияние   │  (CTO при низком    │  (CEO, VP Product,
            │   интересе)         │   ключевые инвесторы)
  ──────────┼─────────────────────┼─────────────────────
  Низкое    │  Monitor            │  Keep Informed
  влияние   │  (юристы на ранней  │  (Support, Marketing
            │   стадии)           │   при активном запуске)
            │                     │
            └─────── Низкий ──────┴─── Высокий интерес`}</pre>
        </div>
      </div>

      <div className="card">
        <h2>💬 Коммуникационные паттерны</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Формат</th><th>Частота</th><th>Аудитория</th><th>Содержание</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>1:1</strong></td><td>Еженедельно</td><td>Ключевые стейкхолдеры</td><td>Согласованность (alignment), блокеры, компромиссы (trade-offs)</td></tr>
            <tr><td><strong>Product Review</strong></td><td>Каждые 2 недели</td><td>Команда + руководство</td><td>Метрики, прогресс, решения</td></tr>
            <tr><td><strong>Roadmap Update</strong></td><td>Ежемесячно</td><td>Широкий круг</td><td>Что изменилось и почему</td></tr>
            <tr><td><strong>Launch Brief (бриф запуска)</strong></td><td>За 2 недели до запуска</td><td>Все затронутые</td><td>Что, когда, план отката (rollback plan)</td></tr>
            <tr><td><strong>Post-mortem (разбор инцидента)</strong></td><td>После инцидентов</td><td>Команда + стейкхолдеры</td><td>Что случилось, уроки (learnings), действия (action items)</td></tr>
          </tbody>
        </table>

        <h3>Принципы коммуникации</h3>
        <ul>
          <li><strong>No surprises (без сюрпризов)</strong> — стейкхолдеры узнают о проблемах от вас, не из Slack</li>
          <li><strong>Disagree and commit (не согласен, но принял)</strong> — зафиксировать решение, даже если не все согласны</li>
          <li><strong>Written &gt; verbal (письменно &gt; устно)</strong> — решения в документе, не в памяти</li>
          <li><strong>Bottom line up front (главное вперёд)</strong> — рекомендация → контекст → данные (не наоборот)</li>
        </ul>
      </div>
    </>
  )
}

function ProductOpsSection() {
  return (
    <>
      <div className="card">
        <h2>⚙️ Что такое Product Ops</h2>
        <p>
          Product Operations — функция, которая масштабирует работу продуктовой команды:
          стандартизирует процессы, управляет инструментами и данными, убирает операционную нагрузку с продактов.
        </p>
        <table className="comparison-table">
          <thead>
            <tr><th>Область</th><th>Что делает Product Ops</th><th>Без Product Ops</th></tr>
          </thead>
          <tbody>
            <tr><td>Данные</td><td>Единый data pipeline, дашборды, самостоятельная аналитика (self-serve)</td><td>Каждый PM делает свои запросы в аналитику</td></tr>
            <tr><td>Процессы</td><td>Шаблоны PRD, чеклисты запуска, регулярные ритуалы</td><td>Каждый PM по-своему</td></tr>
            <tr><td>Инструменты</td><td>Jira/Linear настройка, флаги фич (feature flags), A/B инфраструктура</td><td>Разнобой инструментов</td></tr>
            <tr><td>Feedback (обратная связь)</td><td>Централизованный сбор (Productboard, Intercom, опросы)</td><td>Обратная связь теряется</td></tr>
            <tr><td>Анализ клиентов (Customer Intel)</td><td>Анализ сделок (win/loss), тренды NPS, причины оттока (churn)</td><td>Нет системной работы</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>📅 Операционные каденции</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Каденция</th><th>Участники</th><th>Цель</th><th>Артефакт</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Daily standup</strong></td><td>Scrum-команда</td><td>Синхронизация, блокеры</td><td>—</td></tr>
            <tr><td><strong>Weekly product sync</strong></td><td>PM + дизайн + лид</td><td>Приоритеты на неделю</td><td>Weekly update doc</td></tr>
            <tr><td><strong>Sprint review</strong></td><td>Команда + стейкхолдеры</td><td>Демо, feedback</td><td>Release notes draft</td></tr>
            <tr><td><strong>Monthly OKR check-in</strong></td><td>PM + руководство</td><td>Прогресс к целям</td><td>OKR scorecard</td></tr>
            <tr><td><strong>Quarterly planning</strong></td><td>Leadership + PM</td><td>Стратегия → roadmap</td><td>Quarter plan, OKRs</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>📋 Операционные артефакты</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Артефакт</th><th>Когда создаётся</th><th>Кто ведёт</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>PRD</strong> (Product Requirements Doc)</td><td>До начала разработки</td><td>PM</td></tr>
            <tr><td><strong>RFC / Design Doc</strong></td><td>Сложные технические решения</td><td>Engineering + PM</td></tr>
            <tr><td><strong>Launch Checklist</strong></td><td>За 2 недели до запуска</td><td>Product Ops / PM</td></tr>
            <tr><td><strong>Experiment Log</strong></td><td>При запуске A/B теста</td><td>PM + Data</td></tr>
            <tr><td><strong>Decision Log</strong></td><td>После ключевых решений</td><td>PM</td></tr>
            <tr><td><strong>Retrospective</strong></td><td>Конец спринта / проекта</td><td>Scrum Master / PM</td></tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

function LaunchSection() {
  return (
    <>
      <div className="card">
        <h2>🚀 Launch Management</h2>
        <h3>Уровни запуска (Launch Tiers)</h3>
        <table className="comparison-table">
          <thead>
            <tr><th>Tier</th><th>Описание</th><th>Примеры</th><th>Кто вовлечён</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>🔴 Tier 1 — Major</strong></td>
              <td>Новый продукт, ребрендинг, pricing change</td>
              <td>Новый тарифный план, новая платформа</td>
              <td>PM + Marketing + Sales + Support + Legal + Exec</td>
            </tr>
            <tr>
              <td><strong>🟡 Tier 2 — Significant</strong></td>
              <td>Крупная фича, интеграция</td>
              <td>Slack интеграция, новый workflow</td>
              <td>PM + Marketing + Support</td>
            </tr>
            <tr>
              <td><strong>🟢 Tier 3 — Minor</strong></td>
              <td>Улучшения, bug fixes</td>
              <td>UI-улучшение, performance fix</td>
              <td>PM + Engineering</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>✅ Launch Checklist (Tier 1)</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Фаза</th><th>Задача</th><th>Owner</th><th>Дедлайн</th></tr>
          </thead>
          <tbody>
            <tr><td rowSpan={3}><strong>Pre-launch (2w)</strong></td><td>Заморозка фич (feature freeze) + подпись QA (sign-off)</td><td>Engineering</td><td>T-14</td></tr>
            <tr><td>Внутренний тренинг (Sales, Support)</td><td>Product Ops</td><td>T-10</td></tr>
            <tr><td>Press/blog материалы готовы</td><td>Marketing</td><td>T-7</td></tr>
            <tr><td rowSpan={3}><strong>Launch day</strong></td><td>Feature flag → 100%</td><td>Engineering</td><td>T-0</td></tr>
            <tr><td>Публикация (blog, email, social)</td><td>Marketing</td><td>T-0</td></tr>
            <tr><td>War room мониторинг</td><td>PM + Engineering</td><td>T-0</td></tr>
            <tr><td rowSpan={2}><strong>Post-launch (1w)</strong></td><td>Метрики: adoption, errors, NPS</td><td>Data + PM</td><td>T+7</td></tr>
            <tr><td>Post-launch retro</td><td>PM</td><td>T+14</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>🔄 Change Management</h2>
        <p>Изменение существующего поведения требует больше координации, чем запуск нового.</p>
        <table className="comparison-table">
          <thead>
            <tr><th>Тип изменения</th><th>Риск</th><th>Стратегия</th></tr>
          </thead>
          <tbody>
            <tr><td>Депрекация фичи</td><td>🔴 Высокий</td><td>6 мес. уведомление → гайд по миграции → дата заката (sunset date) → принудительный переход</td></tr>
            <tr><td>Изменение pricing</td><td>🔴 Высокий</td><td>Сохранить условия для старых клиентов (grandfather) → ранняя коммуникация → поэтапный запуск (phased rollout)</td></tr>
            <tr><td>Breaking API change</td><td>🔴 Высокий</td><td>Versioning (v1/v2) → deprecation header → sunset date</td></tr>
            <tr><td>UI-редизайн</td><td>🟡 Средний</td><td>Бета по желанию (opt-in) → сбор отзывов → постепенный запуск → удаление старого UI</td></tr>
            <tr><td>Изменение дефолтов</td><td>🟡 Средний</td><td>Только новые пользователи → уведомление старых → период отказа (opt-out)</td></tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

function CrossFunctionalSection() {
  return (
    <>
      <div className="card">
        <h2>🤹 Cross-Functional Delivery</h2>
        <p>Продакт = клей между функциями. Основные паттерны взаимодействия:</p>
        <table className="comparison-table">
          <thead>
            <tr><th>Функция</th><th>Что PM даёт</th><th>Что PM получает</th><th>Конфликты</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Engineering</strong></td>
              <td>Контекст «зачем», приоритеты, критерии приёмки (acceptance criteria)</td>
              <td>Тех. ограничения, оценки, осуществимость (feasibility)</td>
              <td>Расползание объёма (scope creep) vs техдолг (tech debt)</td>
            </tr>
            <tr>
              <td><strong>Design</strong></td>
              <td>Проблемы пользователей, ограничения, данные</td>
              <td>Решения, прототипы, пользовательские сценарии (user flows)</td>
              <td>Идеал vs MVP, скорость vs качество</td>
            </tr>
            <tr>
              <td><strong>Data/Analytics</strong></td>
              <td>Гипотезы, метрики успеха, сегменты</td>
              <td>Дашборды, результаты экспериментов, инсайты</td>
              <td>Статистическая строгость vs скорость</td>
            </tr>
            <tr>
              <td><strong>Sales</strong></td>
              <td>Видимость roadmap, конкурентная разведка</td>
              <td>Боли клиентов, блокеры сделок</td>
              <td>Разовые запросы (one-off) vs масштабируемые фичи</td>
            </tr>
            <tr>
              <td><strong>Marketing</strong></td>
              <td>Даты запуска, позиционирование, ICP (профиль идеального клиента)</td>
              <td>Обратная связь с рынка, качество лидов</td>
              <td>Фича-ориентированные vs ценность-ориентированные сообщения</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>⚡ Разрешение конфликтов</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Паттерн</th><th>Когда</th><th>Как</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Решение на данных (Data-driven)</strong></td><td>Есть данные, чтобы решить</td><td>A/B тест, метрики, исследования → объективный ответ</td></tr>
            <tr><td><strong>RACI-матрица (Responsible, Accountable, Consulted, Informed)</strong></td><td>Непонятно, кто решает</td><td>Ответственный, Подотчётный, Консультируемый, Информируемый</td></tr>
            <tr><td><strong>Путь эскалации (Escalation path)</strong></td><td>Тупик на уровне команды</td><td>PM → их PM-менеджер → VP → CPO (с рекомендацией)</td></tr>
            <tr><td><strong>Дебаты с ограничением по времени (Time-boxed debate)</strong></td><td>Нет однозначного ответа</td><td>30 мин, каждая сторона — 10 мин + владелец решения решает</td></tr>
            <tr><td><strong>Обратимое vs необратимое (Reversible vs Irreversible)</strong></td><td>Паралич выбора</td><td>Обратимое → пробуем быстро. Необратимое → глубокий анализ</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>🎤 Вопросы на собеседовании</h2>
        <ol>
          <li>Как вы управляете стейкхолдерами с конфликтующими интересами?</li>
          <li>Опишите ваш типичный launch process. Что может пойти не так?</li>
          <li>Как вы решаете, когда «нет» стейкхолдеру — и как это коммуницируете?</li>
          <li>Как организовать deprecation фичи с минимальным оттоком?</li>
          <li>Что такое Product Ops и когда компании нужна эта функция?</li>
        </ol>
      </div>
    </>
  )
}
