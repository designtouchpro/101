import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="demo-container">
      <div className="home-hero">
        <h1>JavaScript Playground</h1>
        <p>
          Интерактивная площадка для подготовки к JavaScript собеседованиям. 
          Визуализируйте Event Loop, понимайте замыкания и осваивайте асинхронность на практике.
        </p>
      </div>

      {/* Interview Section */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, rgba(247, 223, 30, 0.1), rgba(247, 223, 30, 0.05))',
        borderColor: 'var(--accent-js)',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '2.5rem' }}>🎯</span>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h3>Готовишься к собеседованию?</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              Практикуйся с реальными задачами из интервью. Проверь свои знания прямо сейчас!
            </p>
          </div>
          <Link to="/interview/challenges" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Начать практику →
          </Link>
        </div>
      </div>

      <h2 style={{ marginBottom: '24px' }}>🔄 Event Loop — сердце JavaScript</h2>

      <div className="feature-grid">
        <Link to="/eventloop/visualizer" className="feature-card">
          <div className="feature-icon">🔄</div>
          <h3>Event Loop Визуализатор</h3>
          <p>
            Интерактивная визуализация работы Event Loop. Наблюдайте за Call Stack, 
            Web APIs, Microtask и Macrotask очередями в реальном времени.
          </p>
        </Link>

        <Link to="/eventloop/sandbox" className="feature-card" style={{ borderColor: 'var(--accent-green)' }}>
          <div className="feature-icon">🎮</div>
          <h3>Event Loop Песочница</h3>
          <p>
            <strong style={{ color: 'var(--accent-green)' }}>НОВОЕ!</strong> Пишите свой код и смотрите, 
            как он выполняется через Event Loop шаг за шагом.
          </p>
        </Link>

        <Link to="/eventloop/callstack" className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Call Stack</h3>
          <p>
            Как работает стек вызовов, почему JavaScript однопоточный и 
            как это влияет на выполнение кода.
          </p>
        </Link>

        <Link to="/eventloop/micromacro" className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Micro/Macro Tasks</h3>
          <p>
            Разница между микрозадачами (Promise) и макрозадачами (setTimeout). 
            Порядок выполнения и приоритеты.
          </p>
        </Link>

        <Link to="/eventloop/quiz" className="feature-card">
          <div className="feature-icon">🧩</div>
          <h3>Event Loop Quiz</h3>
          <p>
            Проверьте свои знания! Угадайте порядок вывода в консоль 
            для сложных примеров с async кодом.
          </p>
        </Link>
      </div>

      <h2 style={{ marginBottom: '24px', marginTop: '48px' }}>⏳ Асинхронность</h2>

      <div className="feature-grid">
        <Link to="/async/promises" className="feature-card">
          <div className="feature-icon">🤝</div>
          <h3>Promises</h3>
          <p>
            Промисы от А до Я: создание, цепочки, обработка ошибок, 
            Promise.all, Promise.race и другие методы.
          </p>
        </Link>

        <Link to="/async/async-await" className="feature-card">
          <div className="feature-icon">⏳</div>
          <h3>Async/Await</h3>
          <p>
            Синтаксический сахар над промисами. Как работает под капотом, 
            обработка ошибок и паттерны использования.
          </p>
        </Link>
      </div>

      <h2 style={{ marginBottom: '24px', marginTop: '48px' }}>📦 Замыкания и Scope</h2>

      <div className="feature-grid">
        <Link to="/closures/closures" className="feature-card">
          <div className="feature-icon">📦</div>
          <h3>Замыкания</h3>
          <p>
            Что такое замыкание, как оно работает и почему это одна из 
            самых важных концепций в JavaScript.
          </p>
        </Link>

        <Link to="/closures/scope" className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Область видимости</h3>
          <p>
            Global, Function, Block scope. Цепочка областей видимости 
            и лексическое окружение.
          </p>
        </Link>

        <Link to="/closures/hoisting" className="feature-card">
          <div className="feature-icon">⬆️</div>
          <h3>Hoisting</h3>
          <p>
            Всплытие переменных и функций. Разница между var, let и const. 
            Temporal Dead Zone.
          </p>
        </Link>
      </div>

      <h2 style={{ marginBottom: '24px', marginTop: '48px' }}>👆 this и Контекст</h2>

      <div className="feature-grid">
        <Link to="/context/this" className="feature-card">
          <div className="feature-icon">👆</div>
          <h3>this</h3>
          <p>
            Как определяется this в разных контекстах: методы объекта, 
            функции, стрелочные функции, классы.
          </p>
        </Link>

        <Link to="/context/bind-call-apply" className="feature-card">
          <div className="feature-icon">🔗</div>
          <h3>bind/call/apply</h3>
          <p>
            Явное связывание контекста. Разница между методами 
            и практические примеры использования.
          </p>
        </Link>
      </div>

      <h2 style={{ marginBottom: '24px', marginTop: '48px' }}>🗃️ ES6+ Коллекции</h2>

      <div className="feature-grid">
        <Link to="/collections" className="feature-card" style={{ borderColor: 'var(--accent-purple)' }}>
          <div className="feature-icon">🗃️</div>
          <h3>Set, Map, WeakSet, WeakMap</h3>
          <p>
            <strong style={{ color: 'var(--accent-purple)' }}>НОВОЕ!</strong> Интерактивные примеры 
            работы с ES6 коллекциями. Частый вопрос на собеседованиях!
          </p>
        </Link>

        <Link to="/es6/destructuring" className="feature-card">
          <div className="feature-icon">📤</div>
          <h3>Деструктуризация</h3>
          <p>
            Извлечение данных из массивов и объектов. Вложенная деструктуризация, 
            значения по умолчанию.
          </p>
        </Link>

        <Link to="/es6/spread-rest" className="feature-card">
          <div className="feature-icon">...</div>
          <h3>Spread/Rest</h3>
          <p>
            Оператор расширения и остаточные параметры. 
            Копирование, объединение и работа с аргументами.
          </p>
        </Link>
      </div>

      <div className="card" style={{ marginTop: '48px' }}>
        <h3>💡 Как использовать для подготовки к собесу</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '16px',
          marginTop: '16px'
        }}>
          <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px' }}>
            <strong style={{ color: 'var(--accent-green)' }}>1. Практикуйся</strong>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.9rem' }}>
              Решай задачи в разделе "Собеседование". Это реальные вопросы из интервью.
            </p>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px' }}>
            <strong style={{ color: 'var(--accent-cyan)' }}>2. Визуализируй</strong>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.9rem' }}>
              Пиши код в песочнице Event Loop и смотри как он работает пошагово.
            </p>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px' }}>
            <strong style={{ color: 'var(--accent-orange)' }}>3. Проверяй знания</strong>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.9rem' }}>
              Проходи квизы и отвечай на вопросы без подглядывания в код.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
