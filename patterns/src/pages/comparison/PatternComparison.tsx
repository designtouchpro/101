import { useState } from 'react'

type Tab = 'confusing' | 'matrix' | 'architecture' | 'scenarios'

const confusingPairs: {
  a: string; b: string
  similarity: string
  keyDifference: string
  chooseA: string; chooseB: string
  trap: string
}[] = [
  {
    a: 'Strategy', b: 'State',
    similarity: 'Оба делегируют поведение вложенному объекту, оба используют полиморфизм',
    keyDifference: 'Strategy — клиент выбирает алгоритм извне. State — объект сам меняет поведение при смене состояния',
    chooseA: 'Нужно выбирать алгоритм (сортировка, валидация, рендер)',
    chooseB: 'Поведение зависит от внутреннего состояния (заказ, UI-компонент, соединение)',
    trap: 'Если «стратегию» меняет сам объект при переходах — это State',
  },
  {
    a: 'Factory Method', b: 'Abstract Factory',
    similarity: 'Оба создают объекты, скрывая конкретные классы',
    keyDifference: 'Factory Method — один метод, один продукт. Abstract Factory — семейство связанных продуктов',
    chooseA: 'Один тип объекта, расширяемый через наследование (createButton)',
    chooseB: 'Семейство связанных объектов (Button + Input + Modal для темы)',
    trap: 'Abstract Factory часто реализуется через набор Factory Method-ов внутри',
  },
  {
    a: 'Adapter', b: 'Facade',
    similarity: 'Оба оборачивают другой код и упрощают интерфейс',
    keyDifference: 'Adapter — приводит один интерфейс к другому. Facade — упрощает целую подсистему',
    chooseA: 'Несовместимый интерфейс (старый API, сторонняя библиотека)',
    chooseB: 'Сложная система из многих классов — нужен простой вход',
    trap: 'Adapter работает с одним классом, Facade — с группой',
  },
  {
    a: 'Decorator', b: 'Proxy',
    similarity: 'Оба оборачивают объект и реализуют тот же интерфейс',
    keyDifference: 'Decorator — добавляет поведение (стекинг). Proxy — контролирует доступ',
    chooseA: 'Динамическое наслоение функциональности (логирование + кеш + retry)',
    chooseB: 'Контроль: ленивая загрузка, кеширование, проверка прав, логирование доступа',
    trap: 'Proxy обычно сам создаёт обёрнутый объект, Decorator — получает извне',
  },
  {
    a: 'Observer', b: 'Mediator',
    similarity: 'Оба управляют коммуникацией между объектами',
    keyDifference: 'Observer — один ко многим, подписчики не знают друг друга. Mediator — многие ко многим через центр',
    chooseA: 'Объект уведомляет зависимых (EventEmitter, store → компоненты)',
    chooseB: 'N объектов взаимодействуют между собой (чат-комната, форма с зависимыми полями)',
    trap: 'Mediator может использовать Observer внутри, но цель другая — убрать связанность',
  },
  {
    a: 'Command', b: 'Strategy',
    similarity: 'Оба инкапсулируют действие в объект',
    keyDifference: 'Command — запоминает что сделать (+ undo/redo, очередь). Strategy — как сделать (выбор алгоритма)',
    chooseA: 'Нужны undo/redo, очередь операций, отложенное выполнение',
    chooseB: 'Нужно переключать способ выполнения одной задачи',
    trap: 'Command хранит контекст вызова, Strategy — только алгоритм',
  },
  {
    a: 'Composite', b: 'Decorator',
    similarity: 'Оба используют рекурсивную композицию и общий интерфейс',
    keyDifference: 'Composite — древовидная структура «часть-целое». Decorator — цепочка обёрток для одного объекта',
    chooseA: 'Иерархия: файловая система, DOM, React-компоненты, меню',
    chooseB: 'Наращивание поведения без наследования (middleware, HOC)',
    trap: 'В Composite дети равноправны, в Decorator — один ядро + обёртки',
  },
  {
    a: 'Template Method', b: 'Strategy',
    similarity: 'Оба позволяют варьировать часть алгоритма',
    keyDifference: 'Template Method — через наследование (белый ящик). Strategy — через композицию (чёрный ящик)',
    chooseA: 'Алгоритм фиксирован, но шаги переопределяются подклассами',
    chooseB: 'Алгоритм полностью заменяется извне, без наследования',
    trap: 'Template Method привязывает к иерархии классов, Strategy — гибче',
  },
]

const categoryMatrix: {
  pattern: string; category: string; intent: string
  complexity: string; frequency: string
}[] = [
  { pattern: 'Singleton', category: 'Creational', intent: 'Единственный экземпляр + глобальный доступ', complexity: '⭐', frequency: '🔥🔥🔥' },
  { pattern: 'Factory Method', category: 'Creational', intent: 'Делегировать создание подклассам', complexity: '⭐⭐', frequency: '🔥🔥🔥' },
  { pattern: 'Abstract Factory', category: 'Creational', intent: 'Семейства связанных объектов', complexity: '⭐⭐⭐', frequency: '🔥🔥' },
  { pattern: 'Builder', category: 'Creational', intent: 'Пошаговое создание сложных объектов', complexity: '⭐⭐', frequency: '🔥🔥🔥' },
  { pattern: 'Prototype', category: 'Creational', intent: 'Клонирование вместо new', complexity: '⭐', frequency: '🔥' },
  { pattern: 'Adapter', category: 'Structural', intent: 'Совместимость интерфейсов', complexity: '⭐', frequency: '🔥🔥🔥' },
  { pattern: 'Bridge', category: 'Structural', intent: 'Разделить абстракцию и реализацию', complexity: '⭐⭐⭐', frequency: '🔥' },
  { pattern: 'Composite', category: 'Structural', intent: 'Дерево объектов с единым интерфейсом', complexity: '⭐⭐', frequency: '🔥🔥🔥' },
  { pattern: 'Decorator', category: 'Structural', intent: 'Наращивание поведения обёрткой', complexity: '⭐⭐', frequency: '🔥🔥🔥' },
  { pattern: 'Facade', category: 'Structural', intent: 'Простой вход в сложную систему', complexity: '⭐', frequency: '🔥🔥🔥' },
  { pattern: 'Flyweight', category: 'Structural', intent: 'Экономия памяти через разделение', complexity: '⭐⭐⭐', frequency: '🔥' },
  { pattern: 'Proxy', category: 'Structural', intent: 'Контроль доступа / ленивая загрузка', complexity: '⭐⭐', frequency: '🔥🔥' },
  { pattern: 'Chain of Resp.', category: 'Behavioral', intent: 'Цепочка обработчиков', complexity: '⭐⭐', frequency: '🔥🔥🔥' },
  { pattern: 'Command', category: 'Behavioral', intent: 'Действие как объект (undo, queue)', complexity: '⭐⭐', frequency: '🔥🔥' },
  { pattern: 'Iterator', category: 'Behavioral', intent: 'Последовательный обход', complexity: '⭐', frequency: '🔥🔥🔥' },
  { pattern: 'Mediator', category: 'Behavioral', intent: 'Центральный координатор', complexity: '⭐⭐', frequency: '🔥🔥' },
  { pattern: 'Memento', category: 'Behavioral', intent: 'Snapshot состояния', complexity: '⭐⭐', frequency: '🔥' },
  { pattern: 'Observer', category: 'Behavioral', intent: 'Подписка на события', complexity: '⭐⭐', frequency: '🔥🔥🔥' },
  { pattern: 'State', category: 'Behavioral', intent: 'Поведение меняется со состоянием', complexity: '⭐⭐', frequency: '🔥🔥' },
  { pattern: 'Strategy', category: 'Behavioral', intent: 'Сменяемый алгоритм', complexity: '⭐', frequency: '🔥🔥🔥' },
  { pattern: 'Template Method', category: 'Behavioral', intent: 'Скелет с переопределяемыми шагами', complexity: '⭐', frequency: '🔥🔥' },
  { pattern: 'Visitor', category: 'Behavioral', intent: 'Новые операции без изменения классов', complexity: '⭐⭐⭐', frequency: '🔥' },
]

const architectureComparisons: {
  name: string; scope: string; bestFor: string
  tradeOff: string; realWorld: string
}[] = [
  { name: 'MVC', scope: 'Запрос-ответ', bestFor: 'Серверные приложения (Express, Django)', tradeOff: 'View может разрастаться, Controller становится «толстым»', realWorld: 'REST API, SSR-сайты' },
  { name: 'MVVM', scope: 'UI + data binding', bestFor: 'Реактивные фреймворки (Vue, Angular, SwiftUI)', tradeOff: 'Сложная отладка binding, ViewModel может стать God Object', realWorld: 'SPA на Vue/Angular' },
  { name: 'Clean Architecture', scope: 'Слои зависимостей', bestFor: 'Крупные приложения с долгим сроком жизни', tradeOff: 'Много абстракций, долгий старт, бойлерплейт', realWorld: 'Enterprise-бэкенды, fintech' },
  { name: 'Hexagonal', scope: 'Порты + адаптеры', bestFor: 'Изолированный домен, простая замена инфраструктуры', tradeOff: 'Overhead для маленьких проектов', realWorld: 'DDD-проекты, тестируемые бэкенды' },
  { name: 'FSD', scope: 'Фронтенд-модули', bestFor: 'Крупные фронтенд-проекты с командой > 3 человек', tradeOff: 'Крутая кривая обучения, строгие правила импорта', realWorld: 'Корпоративные SPA' },
  { name: 'Layered', scope: 'Горизонтальные слои', bestFor: 'CRUD-приложения, быстрый старт', tradeOff: 'Зависимости сверху вниз, сложно тестировать', realWorld: 'Учебные проекты, MVP' },
  { name: 'CQRS', scope: 'Разделение чтение/запись', bestFor: 'Высоконагруженные системы с разной нагрузкой R/W', tradeOff: 'Eventual consistency, сложная синхронизация', realWorld: 'E-commerce, банковские системы' },
  { name: 'Micro Frontends', scope: 'Независимые UI-модули', bestFor: 'Несколько команд, независимые деплои', tradeOff: 'Runtime overhead, сложная интеграция', realWorld: 'Крупные порталы (IKEA, Spotify)' },
]

const scenarios: {
  problem: string; patterns: string[]; why: string
}[] = [
  { problem: 'Нужно добавить логирование/кеширование без изменения класса', patterns: ['Decorator', 'Proxy'], why: 'Decorator — если слоёв несколько и они комбинируются. Proxy — если один контрольный слой' },
  { problem: 'Объекты из разных библиотек не совместимы по интерфейсу', patterns: ['Adapter'], why: 'Adapter приводит чужой интерфейс к вашему контракту' },
  { problem: 'Пользователь должен иметь undo/redo', patterns: ['Command', 'Memento'], why: 'Command — если есть конкретные операции. Memento — если проще сохранять snapshot' },
  { problem: 'Компонент ведёт себя по-разному в зависимости от статуса', patterns: ['State'], why: 'State инкапсулирует переходы и поведение для каждого состояния' },
  { problem: 'Нужно уведомить N подписчиков об изменении', patterns: ['Observer'], why: 'Классический pub/sub. В React/Vue — встроен через реактивность' },
  { problem: 'Форма с 20+ полями, где поля зависят друг от друга', patterns: ['Mediator'], why: 'Mediator централизует логику зависимостей, убирает связанность между полями' },
  { problem: 'Нужно создавать объекты с множеством опций', patterns: ['Builder'], why: 'Builder даёт fluent API: new QueryBuilder().select("*").where(...).limit(10)' },
  { problem: 'Древовидная структура: меню, файлы, компоненты', patterns: ['Composite'], why: 'Composite позволяет работать с деревом и листом через единый интерфейс' },
  { problem: 'Запрос проходит через цепочку проверок (auth → rate limit → validation)', patterns: ['Chain of Responsibility'], why: 'Каждый обработчик решает: обработать или передать дальше. Middleware в Express — это CoR' },
  { problem: 'Выбрать алгоритм сортировки/рендеринга в runtime', patterns: ['Strategy'], why: 'Подменяемый алгоритм без if/switch. Передаётся как зависимость' },
  { problem: 'Нужно обойти коллекцию, не раскрывая внутреннюю структуру', patterns: ['Iterator'], why: 'for...of, генераторы, Symbol.iterator — всё это Iterator' },
  { problem: 'Базовый алгоритм фиксирован, но шаги варьируются', patterns: ['Template Method', 'Strategy'], why: 'Template Method — через наследование (класс). Strategy — через композицию (функция/объект)' },
]

const categoryColors: Record<string, string> = {
  Creational: '#4caf50',
  Structural: '#2196f3',
  Behavioral: '#ff9800',
}

export default function PatternComparison() {
  const [tab, setTab] = useState<Tab>('confusing')
  const [expandedPair, setExpandedPair] = useState<number | null>(null)
  const [matrixFilter, setMatrixFilter] = useState<string>('all')

  const filteredMatrix = matrixFilter === 'all'
    ? categoryMatrix
    : categoryMatrix.filter(p => p.category === matrixFilter)

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📊 Сравнение и выбор паттернов</h1>
        <p>Как не перепутать похожие паттерны и выбрать правильный по контексту задачи</p>
        <span className="pattern-category cat-architecture">Справочник</span>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {([
          ['confusing', '🔀 Похожие паттерны'],
          ['matrix', '📋 Матрица всех паттернов'],
          ['architecture', '🏗 Архитектуры'],
          ['scenarios', '🎯 Выбор по задаче'],
        ] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`card-badge ${tab === key ? 'badge-blue' : ''}`}
            style={{ cursor: 'pointer', padding: '8px 16px', fontSize: '0.9rem', border: '1px solid var(--border)', borderRadius: 8, background: tab === key ? 'var(--accent-blue)' : 'var(--bg-secondary)', color: tab === key ? '#fff' : 'var(--text-primary)' }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'confusing' && (
        <>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">🔀 Часто путаемые пары</h3>
              <span className="card-badge badge-orange">8 пар</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
              Нажмите на пару, чтобы увидеть детальное сравнение и подсказку выбора
            </p>
          </div>

          {confusingPairs.map((pair, i) => (
            <div key={i} className="card" style={{ cursor: 'pointer' }} onClick={() => setExpandedPair(expandedPair === i ? null : i)}>
              <div className="card-header">
                <h3 className="card-title">{pair.a} vs {pair.b}</h3>
                <span className="card-badge badge-blue">{expandedPair === i ? '▲' : '▼'}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                <strong>Сходство:</strong> {pair.similarity}
              </p>

              {expandedPair === i && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, marginBottom: 12 }}>
                    <strong style={{ color: 'var(--accent-orange)' }}>⚡ Ключевое отличие:</strong>
                    <p style={{ margin: '4px 0 0' }}>{pair.keyDifference}</p>
                  </div>

                  <table className="comparison-table">
                    <thead>
                      <tr><th></th><th>{pair.a}</th><th>{pair.b}</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Выбирай, когда</strong></td>
                        <td>{pair.chooseA}</td>
                        <td>{pair.chooseB}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="analogy" style={{ marginTop: 12 }}>
                    <strong>⚠️ Ловушка:</strong> {pair.trap}
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {tab === 'matrix' && (
        <>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📋 Матрица GoF-паттернов</h3>
              <span className="card-badge badge-green">22 паттерна</span>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {['all', 'Creational', 'Structural', 'Behavioral'].map(f => (
                <button
                  key={f}
                  onClick={() => setMatrixFilter(f)}
                  style={{
                    padding: '6px 14px', borderRadius: 6, border: '1px solid var(--border)',
                    background: matrixFilter === f ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                    color: matrixFilter === f ? '#fff' : 'var(--text-primary)',
                    cursor: 'pointer', fontSize: '0.85rem',
                  }}
                >
                  {f === 'all' ? 'Все' : f}
                </button>
              ))}
            </div>

            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Паттерн</th>
                  <th>Категория</th>
                  <th>Намерение</th>
                  <th>Сложность</th>
                  <th>Частота</th>
                </tr>
              </thead>
              <tbody>
                {filteredMatrix.map(p => (
                  <tr key={p.pattern}>
                    <td><strong>{p.pattern}</strong></td>
                    <td><span style={{ color: categoryColors[p.category], fontWeight: 600 }}>{p.category}</span></td>
                    <td>{p.intent}</td>
                    <td>{p.complexity}</td>
                    <td>{p.frequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">🧭 Как выбирать категорию</h3>
            </div>
            <table className="comparison-table">
              <thead>
                <tr><th>Вопрос</th><th>Категория</th><th>Примеры</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Как создать объект?</strong></td>
                  <td><span style={{ color: categoryColors.Creational, fontWeight: 600 }}>Creational</span></td>
                  <td>Скрыть new, управлять жизненным циклом, клонировать</td>
                </tr>
                <tr>
                  <td><strong>Как организовать объекты?</strong></td>
                  <td><span style={{ color: categoryColors.Structural, fontWeight: 600 }}>Structural</span></td>
                  <td>Обернуть, адаптировать, упростить фасадом, объединить в дерево</td>
                </tr>
                <tr>
                  <td><strong>Как объекты взаимодействуют?</strong></td>
                  <td><span style={{ color: categoryColors.Behavioral, fontWeight: 600 }}>Behavioral</span></td>
                  <td>Подписаться, делегировать, обойти, запомнить</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'architecture' && (
        <>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">🏗 Сравнение архитектурных стилей</h3>
              <span className="card-badge badge-blue">8 подходов</span>
            </div>
            <table className="comparison-table">
              <thead>
                <tr><th>Архитектура</th><th>Скоуп</th><th>Лучше всего для</th><th>Trade-off</th></tr>
              </thead>
              <tbody>
                {architectureComparisons.map(a => (
                  <tr key={a.name}>
                    <td><strong>{a.name}</strong></td>
                    <td>{a.scope}</td>
                    <td>{a.bestFor}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{a.tradeOff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">🎯 Выбор архитектуры по контексту</h3>
            </div>
            <table className="comparison-table">
              <thead>
                <tr><th>Контекст</th><th>Рекомендация</th><th>Почему</th></tr>
              </thead>
              <tbody>
                <tr><td>MVP / хакатон / 1 разработчик</td><td><strong>Layered</strong></td><td>Минимум абстракций, быстрый старт</td></tr>
                <tr><td>SPA на Vue/Angular, средняя команда</td><td><strong>MVVM + FSD</strong></td><td>Реактивность фреймворка + структура модулей</td></tr>
                <tr><td>Enterprise-бэкенд, DDD</td><td><strong>Clean / Hexagonal</strong></td><td>Изоляция домена, замена инфраструктуры</td></tr>
                <tr><td>Много команд, независимые деплои</td><td><strong>Micro Frontends</strong></td><td>Автономность команд, independent release cycles</td></tr>
                <tr><td>Высокая нагрузка R ≫ W</td><td><strong>CQRS</strong></td><td>Оптимизация чтения и записи отдельно</td></tr>
                <tr><td>Серверный рендеринг, REST API</td><td><strong>MVC</strong></td><td>Проверенный паттерн запрос → контроллер → ответ</td></tr>
              </tbody>
            </table>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">⚠️ Антипаттерны выбора архитектуры</h3>
            </div>
            <div className="interview-item">
              <div className="q">Clean Architecture для лендинга</div>
              <div className="a">Оверинжиниринг. Use Cases, Entities, Repositories для 3 страниц — пушкой по воробьям</div>
            </div>
            <div className="interview-item">
              <div className="q">Без архитектуры для проекта на 2+ года</div>
              <div className="a">Быстрый старт → спагетти через 6 месяцев. Даже Layered лучше, чем ничего</div>
            </div>
            <div className="interview-item">
              <div className="q">Micro Frontends для команды из 3 человек</div>
                <div className="a">Оверхед на инфраструктуру {'>'} пользы от независимости. Монорепо + модули хватит</div>
            </div>
          </div>
        </>
      )}

      {tab === 'scenarios' && (
        <>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">🎯 Выбор паттерна по задаче</h3>
              <span className="card-badge badge-green">{scenarios.length} сценариев</span>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>
              Начинайте с задачи, а не с паттерна. Ниже — типичные проблемы и какой паттерн решает каждую.
            </p>
          </div>

          {scenarios.map((s, i) => (
            <div key={i} className="card">
              <div className="card-header">
                <h3 className="card-title">💡 {s.problem}</h3>
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                {s.patterns.map(p => (
                  <span key={p} className="card-badge badge-blue" style={{ fontSize: '0.85rem' }}>{p}</span>
                ))}
              </div>
              <div className="analogy"><strong>Почему:</strong> {s.why}</div>
            </div>
          ))}

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">❓ Вопросы на собесе</h3>
            </div>
            <div className="interview-item">
              <div className="q">Чем Strategy отличается от State?</div>
              <div className="a">Strategy — клиент выбирает алгоритм извне. State — объект сам переключает поведение при смене внутреннего состояния. Если «стратегию» переключает сам объект — это State</div>
            </div>
            <div className="interview-item">
              <div className="q">Когда Decorator, а когда Proxy?</div>
              <div className="a">Decorator наращивает поведение (можно комбинировать). Proxy контролирует доступ. Proxy обычно сам создаёт real subject, Decorator получает его извне</div>
            </div>
            <div className="interview-item">
              <div className="q">Какой паттерн для undo/redo?</div>
              <div className="a">Command — инкапсулирует действие + обратное действие. Memento — сохраняет полные snapshot-ы. Command экономнее, Memento проще когда состояние небольшое</div>
            </div>
            <div className="interview-item">
              <div className="q">Как выбрать архитектуру для нового проекта?</div>
              <div className="a">Три фактора: размер команды (1 → Layered, 3+ → FSD/Clean), срок жизни (MVP → просто, долгий → слои), контекст (фронтенд → MVVM+FSD, бэкенд → Hexagonal/Clean)</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
