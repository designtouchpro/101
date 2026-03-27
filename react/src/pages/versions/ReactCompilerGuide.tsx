import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function ReactCompilerGuide() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>⚡ React Compiler</h1>
        <p>Автоматическая оптимизация React приложений без ручной мемоизации</p>
        <a 
          href="https://react.dev/learn/react-compiler" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 React Compiler Docs
        </a>
      </div>

      <WhatIsReactCompiler />
      <HowItWorks />
      <BeforeAfterComparison />
      <SetupGuide />
      <WhatItOptimizes />
      <Limitations />
      <InterviewQuestions />
    </div>
  )
}

function WhatIsReactCompiler() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Что такое React Compiler?</h3>
        <span className="card-badge">React 19</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🧠</span>
        <div className="info-box-content">
          <div className="info-box-title">Забудь про useMemo, useCallback, memo!</div>
          <p>React Compiler (ранее React Forget) — это <strong>компилятор</strong>, который автоматически 
          добавляет мемоизацию в ваш код на этапе сборки. Больше не нужно думать когда использовать 
          useMemo/useCallback — компилятор сделает это за вас, причём оптимальнее.</p>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '16px', 
        marginTop: '20px' 
      }}>
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          padding: '16px', 
          borderRadius: '8px',
          borderLeft: '4px solid var(--accent-red)'
        }}>
          <h4 style={{ margin: '0 0 8px 0' }}>❌ До компилятора</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Ручная мемоизация, легко забыть, сложно поддерживать, часто делаем лишнее или недостаточно
          </p>
        </div>

        <div style={{ 
          background: 'rgba(249, 115, 22, 0.1)', 
          padding: '16px', 
          borderRadius: '8px',
          borderLeft: '4px solid var(--accent-orange)'
        }}>
          <h4 style={{ margin: '0 0 8px 0' }}>⚠️ Проблемы</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Лишние ре-рендеры, сложный код, "premature optimization", забытые зависимости
          </p>
        </div>

        <div style={{ 
          background: 'rgba(34, 197, 94, 0.1)', 
          padding: '16px', 
          borderRadius: '8px',
          borderLeft: '4px solid var(--accent-green)'
        }}>
          <h4 style={{ margin: '0 0 8px 0' }}>✅ С компилятором</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Пишем простой код, компилятор сам оптимизирует, всегда правильная мемоизация
          </p>
        </div>
      </div>
    </div>
  )
}

function HowItWorks() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Как работает компилятор?</h3>
        <span className="card-badge">Архитектура</span>
      </div>

      {/* Styled flow diagram */}
      <div style={{ display: 'flex', alignItems: 'stretch', gap: '0', padding: '16px 8px', overflow: 'auto' }}>
        {/* Ваш код */}
        <div style={{ flex: '1', minWidth: '140px', background: 'rgba(59,130,246,0.08)', border: '2px solid #3b82f6', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#60a5fa', marginBottom: '6px' }}>📝 Ваш код</div>
          <code style={{ fontSize: '0.7rem', lineHeight: '1.5', color: 'var(--text-secondary)', whiteSpace: 'pre' }}>{`function App() {\n  const items =\n    data.map(x => x*2)\n  return (\n    <List items={items}/>\n  )\n}`}</code>
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 6px', color: 'var(--text-muted)', fontSize: '1.2rem' }}>→</div>

        {/* Compiler stages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '0.8', minWidth: '120px' }}>
          {[
            ['🔍', 'Анализ AST', '#a855f7'],
            ['📊', 'Граф зависимостей', '#f59e0b'],
            ['⚡', 'Мемоизация', '#22c55e'],
            ['📦', 'Код-генерация', '#3b82f6'],
          ].map(([icon, text, color], i) => (
            <div key={i} style={{ background: `${color}11`, border: `1.5px solid ${color}`, borderRadius: '6px', padding: '8px 10px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color }}>{icon} {text}</span>
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 6px', color: 'var(--text-muted)', fontSize: '1.2rem' }}>→</div>

        {/* Результат */}
        <div style={{ flex: '1', minWidth: '140px', background: 'rgba(34,197,94,0.08)', border: '2px solid #22c55e', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4ade80', marginBottom: '6px' }}>🚀 Результат</div>
          <code style={{ fontSize: '0.7rem', lineHeight: '1.5', color: 'var(--text-secondary)', whiteSpace: 'pre' }}>{`function App() {\n  // Автоматически\n  // мемоизировано!\n  const items =\n    useMemo(\n      () => data.map(…),\n      [data]\n    )\n}`}</code>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <h4>Этапы работы:</h4>
        <ol className="info-list">
          <li><strong>Парсинг</strong> — компилятор анализирует AST (дерево синтаксиса) вашего кода</li>
          <li><strong>Анализ</strong> — определяет какие значения от каких зависят</li>
          <li><strong>Оптимизация</strong> — находит что можно мемоизировать</li>
          <li><strong>Трансформация</strong> — вставляет useMemo/useCallback с правильными зависимостями</li>
          <li><strong>Вывод</strong> — генерирует оптимизированный код</li>
        </ol>
      </div>
    </div>
  )
}

function BeforeAfterComparison() {
  const beforeCode = `// ❌ КОД БЕЗ КОМПИЛЯТОРА (ручная оптимизация)
// Нужно самим помнить где ставить useMemo/useCallback

function ProductList({ products, onAddToCart }) {
  // 😰 Забыли useMemo — items пересоздаётся каждый рендер!
  // Это вызывает ре-рендер всех дочерних компонентов
  const sortedProducts = products
    .filter(p => p.inStock)      // Фильтруем товары в наличии
    .sort((a, b) =>              // Сортируем по цене
      a.price - b.price
    )

  // 😰 Забыли useCallback — функция пересоздаётся!
  // Если ProductCard обёрнут в memo — это сломает мемоизацию
  const handleClick = (id) => {
    onAddToCart(id)              // Добавляем в корзину
    analytics.track('add')       // Трекаем событие
  }

  return (
    <div>
      {sortedProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={handleClick}  // Новая функция = ре-рендер!
        />
      ))}
    </div>
  )
}`

  const afterCode = `// ✅ КОД С REACT COMPILER (автоматическая оптимизация)
// Пишем простой понятный код — компилятор сам оптимизирует!

function ProductList({ products, onAddToCart }) {
  // 🎉 Компилятор САМ добавит useMemo!
  // Он видит: sortedProducts зависит только от products
  // Значит нужно мемоизировать с [products]
  const sortedProducts = products
    .filter(p => p.inStock)      // Фильтруем товары в наличии
    .sort((a, b) =>              // Сортируем по цене
      a.price - b.price
    )

  // 🎉 Компилятор САМ добавит useCallback!
  // Он видит: функция использует onAddToCart
  // Значит deps будет [onAddToCart]
  const handleClick = (id) => {
    onAddToCart(id)              // Добавляем в корзину
    analytics.track('add')       // Трекаем событие
  }

  // 🎉 Компилятор оптимизирует и JSX!
  // Если products не изменились — не будет ре-рендера
  return (
    <div>
      {sortedProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={handleClick}  // Стабильная ссылка!
        />
      ))}
    </div>
  )
}`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">До и После</h3>
        <span className="card-badge">Сравнение</span>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        <div>
          <h4 style={{ color: 'var(--accent-red)', marginBottom: '8px' }}>❌ Без компилятора (проблемный код)</h4>
          <CodeBlock code={beforeCode} language="tsx" />
        </div>

        <div>
          <h4 style={{ color: 'var(--accent-green)', marginBottom: '8px' }}>✅ С компилятором (тот же код, но оптимизирован)</h4>
          <CodeBlock code={afterCode} language="tsx" />
        </div>
      </div>
    </div>
  )
}

function SetupGuide() {
  const [tab, setTab] = useState<'vite' | 'next' | 'babel'>('vite')

  const viteSetup = `// 📁 vite.config.ts
// Настройка React Compiler для Vite проекта

import { defineConfig } from 'vite'          // Импорт функции конфига Vite
import react from '@vitejs/plugin-react'      // Стандартный плагин React

// Импортируем плагин компилятора
// npm install babel-plugin-react-compiler
const ReactCompilerConfig = {
  // Настройки компилятора (опционально)
}

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // Добавляем плагин компилятора в Babel
          ['babel-plugin-react-compiler', ReactCompilerConfig],
        ],
      },
    }),
  ],
})`

  const nextSetup = `// 📁 next.config.js
// Настройка React Compiler для Next.js проекта

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Включаем экспериментальную поддержку компилятора
  experimental: {
    reactCompiler: true,  // Включить React Compiler
  },
}

module.exports = nextConfig

// ───────────────────────────────────────────────
// Next.js 15+ имеет встроенную поддержку!
// Просто добавь флаг и всё работает
// ───────────────────────────────────────────────`

  const babelSetup = `// 📁 babel.config.js
// Настройка для проектов с чистым Babel (CRA, custom setup)

module.exports = {
  presets: [
    '@babel/preset-react',          // Стандартный пресет React
  ],
  plugins: [
    // Добавляем плагин компилятора
    // ВАЖНО: должен идти ПЕРВЫМ в списке плагинов!
    ['babel-plugin-react-compiler', {
      // Опции компилятора
      
      // Режим компиляции:
      // 'all' - компилировать всё (по умолчанию)
      // 'annotation' - только помеченные 'use memo'
      compilationMode: 'all',
      
      // Паузировать на ошибках линтера
      panicThreshold: 'CRITICAL_ERRORS',
    }],
  ],
}

// ───────────────────────────────────────────────
// Установка:
// npm install babel-plugin-react-compiler
// ───────────────────────────────────────────────`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Установка и настройка</h3>
        <span className="card-badge">Setup</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button 
          className={`btn ${tab === 'vite' ? 'btn-primary' : 'btn-secondary'}`} 
          onClick={() => setTab('vite')}
        >
          Vite
        </button>
        <button 
          className={`btn ${tab === 'next' ? 'btn-primary' : 'btn-secondary'}`} 
          onClick={() => setTab('next')}
        >
          Next.js
        </button>
        <button 
          className={`btn ${tab === 'babel' ? 'btn-primary' : 'btn-secondary'}`} 
          onClick={() => setTab('babel')}
        >
          Babel
        </button>
      </div>

      {tab === 'vite' && <CodeBlock code={viteSetup} language="typescript" />}
      {tab === 'next' && <CodeBlock code={nextSetup} language="javascript" />}
      {tab === 'babel' && <CodeBlock code={babelSetup} language="javascript" />}

      <div className="info-box" style={{ marginTop: '16px' }}>
        <span className="info-box-icon">⚠️</span>
        <div className="info-box-content">
          <div className="info-box-title">Требования</div>
          <p>React Compiler требует <strong>React 19</strong>. Для React 18 нужен пакет 
          <code>react-compiler-runtime</code>. Также код должен следовать 
          <a href="https://react.dev/reference/rules" target="_blank"> Rules of React</a>.</p>
        </div>
      </div>
    </div>
  )
}

function WhatItOptimizes() {
  const optimizationsCode = `// ═══════════════════════════════════════════════════════════════
// ЧТО ОПТИМИЗИРУЕТ REACT COMPILER
// ═══════════════════════════════════════════════════════════════

// 1️⃣ ВЫЧИСЛЕННЫЕ ЗНАЧЕНИЯ (автоматический useMemo)
// ──────────────────────────────────────────────────
function UserList({ users, filter }) {
  // Компилятор видит: filteredUsers зависит от users и filter
  // Автоматически обернёт в useMemo(() => ..., [users, filter])
  const filteredUsers = users.filter(u =>    // Фильтрация массива
    u.name.includes(filter)                  // по подстроке в имени
  )
  
  // Компилятор видит: stats зависит от filteredUsers
  // useMemo(() => ..., [filteredUsers])
  const stats = {
    total: filteredUsers.length,             // Считаем количество
    active: filteredUsers.filter(            // Считаем активных
      u => u.isActive
    ).length,
  }
  
  return <div>...</div>
}


// 2️⃣ CALLBACK ФУНКЦИИ (автоматический useCallback)
// ──────────────────────────────────────────────────
function TodoItem({ todo, onToggle, onDelete }) {
  // Компилятор видит: handleToggle использует todo.id и onToggle
  // Автоматически: useCallback(() => ..., [todo.id, onToggle])
  const handleToggle = () => {
    onToggle(todo.id)                        // Переключаем статус
  }
  
  // Компилятор видит: handleDelete использует todo.id и onDelete
  // Автоматически: useCallback(() => ..., [todo.id, onDelete])
  const handleDelete = () => {
    if (confirm('Удалить?')) {               // Спрашиваем подтверждение
      onDelete(todo.id)                      // Удаляем
    }
  }
  
  return <div>...</div>
}


// 3️⃣ JSX ЭЛЕМЕНТЫ (автоматический memo эффект)
// ──────────────────────────────────────────────────
function Dashboard({ user, notifications }) {
  // Компилятор видит: Header зависит только от user
  // Sidebar зависит только от notifications
  // Если изменится только user — Sidebar НЕ перерендерится!
  return (
    <div>
      <Header user={user} />                 {/* Зависит от user */}
      <Sidebar items={notifications} />       {/* Зависит от notifications */}
      <MainContent />                         {/* Не зависит ни от чего */}
    </div>
  )
}


// 4️⃣ ОБЪЕКТЫ И МАССИВЫ В PROPS
// ──────────────────────────────────────────────────
function App({ theme }) {
  // БЕЗ компилятора: style создаётся заново каждый рендер!
  // С компилятором: автоматически мемоизируется
  const style = {                            // Объект стилей
    color: theme.primary,                    // Основной цвет
    background: theme.background,            // Цвет фона
  }
  
  // Массив тоже мемоизируется автоматически
  const menuItems = [                        // Пункты меню
    { id: 1, label: 'Home' },               // Главная
    { id: 2, label: 'About' },              // О нас
  ]
  
  return (
    <Menu 
      style={style}                          // Стабильная ссылка!
      items={menuItems}                      // Стабильная ссылка!
    />
  )
}`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Что оптимизирует компилятор?</h3>
        <span className="card-badge">Оптимизации</span>
      </div>

      <CodeBlock code={optimizationsCode} language="tsx" />
    </div>
  )
}

function Limitations() {
  const limitationsCode = `// ═══════════════════════════════════════════════════════════════
// ОГРАНИЧЕНИЯ REACT COMPILER
// ═══════════════════════════════════════════════════════════════

// ❌ НЕ РАБОТАЕТ С НАРУШЕНИЯМИ RULES OF REACT
// ──────────────────────────────────────────────────

// Плохо: мутация во время рендера
function Bad({ items }) {
  items.push('new')              // ❌ Мутируем prop напрямую!
  return <List items={items} />  // Компилятор не оптимизирует
}

// Хорошо: создаём новый массив
function Good({ items }) {
  const newItems = [...items, 'new']  // ✅ Новый массив
  return <List items={newItems} />     // Компилятор оптимизирует!
}


// ❌ УСЛОВНЫЕ ХУКИ
// ──────────────────────────────────────────────────

function Bad({ condition }) {
  if (condition) {
    useState(0)                  // ❌ Хук в условии!
  }                              // Компилятор откажется компилировать
}


// ❌ ДИНАМИЧЕСКИЕ КЛЮЧИ В ХУКАХ  
// ──────────────────────────────────────────────────

function Bad({ key }) {
  // ❌ Динамический ключ — нарушение правил
  const [state] = useState({ [key]: 0 })
}


// ⚠️ useRef МУТАЦИИ ВНУТРИ РЕНДЕРА
// ──────────────────────────────────────────────────

function Careful() {
  const ref = useRef(0)
  
  // ⚠️ Мутация ref во время рендера
  // Компилятор может неправильно оптимизировать
  ref.current += 1               // Лучше делать в useEffect!
  
  return <div>{ref.current}</div>
}


// ✅ КАК ОТКЛЮЧИТЬ ДЛЯ КОНКРЕТНОГО КОМПОНЕНТА
// ──────────────────────────────────────────────────

// Добавляем директиву в начало функции
function LegacyComponent() {
  'use no memo'                  // Отключает компилятор для этого компонента!
  
  // Код с нарушениями, который пока не можем исправить
  return <div>...</div>
}


// ✅ КАК ВКЛЮЧИТЬ ТОЛЬКО ДЛЯ КОНКРЕТНОГО КОМПОНЕНТА
// ──────────────────────────────────────────────────

// При compilationMode: 'annotation'
function OptimizedComponent() {
  'use memo'                     // Включает компилятор для этого компонента!
  
  return <div>...</div>
}`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Ограничения и подводные камни</h3>
        <span className="card-badge">Limitations</span>
      </div>

      <CodeBlock code={limitationsCode} language="tsx" />

      <div className="info-box" style={{ marginTop: '16px', background: 'rgba(59, 130, 246, 0.1)' }}>
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">ESLint плагин</div>
          <p>Установите <code>eslint-plugin-react-compiler</code> — он покажет проблемы 
          в коде ДО того как компилятор откажется его обрабатывать.</p>
        </div>
      </div>
    </div>
  )
}

function InterviewQuestions() {
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({})

  const questions = [
    {
      q: "Что такое React Compiler и какую проблему он решает?",
      a: "React Compiler (бывший React Forget) — это компилятор, который автоматически добавляет мемоизацию (useMemo, useCallback) в код на этапе сборки. Решает проблему ручной оптимизации: разработчики часто забывают мемоизировать, или делают это неправильно, или слишком много."
    },
    {
      q: "Нужно ли удалять useMemo/useCallback если используем компилятор?",
      a: "Не обязательно, но можно. Компилятор достаточно умён чтобы не дублировать мемоизацию. Однако для чистоты кода рекомендуется убрать ручную мемоизацию — код станет проще читать и поддерживать."
    },
    {
      q: "Какие требования для использования React Compiler?",
      a: "1) React 19 (или React 18 с react-compiler-runtime). 2) Код должен следовать Rules of React: нет мутаций во время рендера, хуки только на верхнем уровне, чистые компоненты. 3) Babel/SWC для трансформации."
    },
    {
      q: "Как компилятор определяет зависимости для мемоизации?",
      a: "Компилятор анализирует AST кода и отслеживает какие переменные используются внутри выражения. Он автоматически определяет минимальный набор зависимостей, от которых зависит результат."
    },
    {
      q: "Что делать если компилятор не оптимизирует компонент?",
      a: "1) Проверить ESLint плагин react-compiler на ошибки. 2) Убедиться что код следует Rules of React. 3) Если нужно отключить — добавить 'use no memo' директиву. 4) Исправить нарушения: убрать мутации, условные хуки."
    }
  ]

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">❓ Вопросы на собеседовании</h3>
        <span className="card-badge">Interview</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {questions.map((item, i) => (
          <div 
            key={i}
            style={{ 
              background: 'var(--bg-secondary)', 
              borderRadius: '8px', 
              padding: '16px',
              cursor: 'pointer'
            }}
            onClick={() => setShowAnswers(prev => ({ ...prev, [i]: !prev[i] }))}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{item.q}</strong>
              <span>{showAnswers[i] ? '🔼' : '🔽'}</span>
            </div>
            {showAnswers[i] && (
              <p style={{ 
                marginTop: '12px', 
                color: 'var(--accent-green)',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '12px'
              }}>
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
