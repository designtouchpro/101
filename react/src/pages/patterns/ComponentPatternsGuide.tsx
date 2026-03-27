import { useState, createContext, useContext, ReactNode, useEffect } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function ComponentPatternsGuide() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🧩 Паттерны компонентов</h1>
        <p>Compound Components, Render Props, HOC и Custom Hooks</p>
      </div>

      <PatternOverview />
      <CompoundComponentsLive />
      <RenderPropsLive />
      <CustomHooksLive />
      <InterviewQuestions />
    </div>
  )
}

// =====================================================
// ОБЗОР ПАТТЕРНОВ
// =====================================================
function PatternOverview() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Обзор паттернов</h3>
        <span className="card-badge">Когда что использовать</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
        <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: '4px solid var(--accent-green)' }}>
          <h4>🪝 Custom Hooks</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '8px 0' }}>
            Переиспользование логики без UI
          </p>
          <span style={{ fontSize: '0.75rem', background: 'rgba(34, 197, 94, 0.2)', padding: '4px 8px', borderRadius: '4px' }}>
            ✅ Рекомендуется
          </span>
        </div>

        <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: '4px solid var(--accent-blue)' }}>
          <h4>🧩 Compound Components</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '8px 0' }}>
            Связанные UI компоненты (Tabs, Accordion)
          </p>
          <span style={{ fontSize: '0.75rem', background: 'rgba(59, 130, 246, 0.2)', padding: '4px 8px', borderRadius: '4px' }}>
            ✅ Для UI библиотек
          </span>
        </div>

        <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: '4px solid var(--accent-orange)' }}>
          <h4>🎨 Render Props</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '8px 0' }}>
            Передача функции рендера как проп
          </p>
          <span style={{ fontSize: '0.75rem', background: 'rgba(245, 158, 11, 0.2)', padding: '4px 8px', borderRadius: '4px' }}>
            ⚠️ Заменён хуками
          </span>
        </div>

        <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: '4px solid var(--accent-red)' }}>
          <h4>🎁 HOC</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '8px 0' }}>
            Функция-обёртка над компонентом
          </p>
          <span style={{ fontSize: '0.75rem', background: 'rgba(239, 68, 68, 0.2)', padding: '4px 8px', borderRadius: '4px' }}>
            ⚠️ Legacy паттерн
          </span>
        </div>
      </div>
    </div>
  )
}

// =====================================================
// COMPOUND COMPONENTS - ЖИВОЙ ПРИМЕР
// =====================================================

// Создаём контекст для Accordion
interface AccordionContextType {
  openItems: Set<string>
  toggle: (id: string) => void
}
const AccordionContext = createContext<AccordionContextType | null>(null)

function useAccordion() {
  const ctx = useContext(AccordionContext)
  if (!ctx) throw new Error('Accordion.* должен быть внутри <Accordion>')
  return ctx
}

// Компоненты Accordion
interface AccordionProps {
  children: ReactNode
  multiple?: boolean
}

function Accordion({ children, multiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['faq-1']))

  const toggle = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (!multiple) next.clear()
        next.add(id)
      }
      return next
    })
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

function AccordionItem({ children }: { id: string; children: ReactNode }) {
  return <div style={{ borderBottom: '1px solid var(--border-color)' }}>{children}</div>
}

function AccordionTrigger({ id, children }: { id: string; children: ReactNode }) {
  const { openItems, toggle } = useAccordion()
  const isOpen = openItems.has(id)

  return (
    <button
      onClick={() => toggle(id)}
      style={{
        width: '100%',
        padding: '16px',
        background: isOpen ? 'var(--bg-secondary)' : 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        fontWeight: 500,
        transition: 'background 0.2s'
      }}
    >
      {children}
      <span style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
        ▼
      </span>
    </button>
  )
}

function AccordionContent({ id, children }: { id: string; children: ReactNode }) {
  const { openItems } = useAccordion()
  if (!openItems.has(id)) return null

  return (
    <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
      {children}
    </div>
  )
}

// Присваиваем как статические свойства
Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Content = AccordionContent

function CompoundComponentsLive() {
  const [multiple, setMultiple] = useState(false)

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🧩 Compound Components</h3>
        <span className="card-badge">Живой пример</span>
      </div>

      <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
        Связанные компоненты с общим состоянием через Context. 
        Как HTML <code>&lt;select&gt;</code> и <code>&lt;option&gt;</code>.
      </p>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 350px' }}>
          <div className="visual-diagram">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4>FAQ Accordion</h4>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <input 
                  type="checkbox" 
                  checked={multiple} 
                  onChange={e => setMultiple(e.target.checked)} 
                />
                Multiple
              </label>
            </div>

            <Accordion multiple={multiple} key={String(multiple)}>
              <Accordion.Item id="faq-1">
                <Accordion.Trigger id="faq-1">Что такое React?</Accordion.Trigger>
                <Accordion.Content id="faq-1">
                  React — библиотека для создания пользовательских интерфейсов. 
                  Разработана Facebook в 2013 году.
                </Accordion.Content>
              </Accordion.Item>
              
              <Accordion.Item id="faq-2">
                <Accordion.Trigger id="faq-2">Что такое JSX?</Accordion.Trigger>
                <Accordion.Content id="faq-2">
                  JSX — синтаксический сахар для React.createElement(). 
                  Позволяет писать HTML-подобный код в JavaScript.
                </Accordion.Content>
              </Accordion.Item>
              
              <Accordion.Item id="faq-3">
                <Accordion.Trigger id="faq-3">Зачем нужен Virtual DOM?</Accordion.Trigger>
                <Accordion.Content id="faq-3">
                  Virtual DOM — легковесная копия реального DOM. 
                  React сравнивает изменения и обновляет только нужные части страницы.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>

        <div style={{ flex: '1 1 350px' }}>
          <CodeBlock 
            code={`// Использование Compound Components
<Accordion multiple>
  <Accordion.Item id="1">
    <Accordion.Trigger id="1">
      Заголовок
    </Accordion.Trigger>
    <Accordion.Content id="1">
      Содержимое
    </Accordion.Content>
  </Accordion.Item>
</Accordion>

// Внутри — Context для shared state
const AccordionContext = createContext(null)

function Accordion({ children }) {
  const [openItems, setOpenItems] = useState(new Set())
  
  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      {children}
    </AccordionContext.Provider>
  )
}`}
            language="tsx"
            title="Compound Components паттерн"
          />
        </div>
      </div>
    </div>
  )
}

// =====================================================
// RENDER PROPS - ЖИВОЙ ПРИМЕР
// =====================================================
interface MousePosition { x: number; y: number }

function MouseTracker({ render }: { render: (pos: MousePosition) => ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  return (
    <div 
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }}
      style={{ 
        position: 'relative', 
        height: '200px', 
        background: 'var(--bg-secondary)', 
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'crosshair'
      }}
    >
      {render(position)}
    </div>
  )
}

function RenderPropsLive() {
  const [variant, setVariant] = useState<'text' | 'follower' | 'heatmap'>('text')

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🎨 Render Props</h3>
        <span className="card-badge">Живой пример</span>
      </div>

      <div className="info-box" style={{ background: 'rgba(245, 158, 11, 0.1)', borderColor: 'var(--accent-orange)' }}>
        <span className="info-box-icon">⚠️</span>
        <div className="info-box-content">
          <p>Этот паттерн заменён Custom Hooks в большинстве случаев, но полезен для понимания.</p>
        </div>
      </div>

      <p style={{ margin: '16px 0', color: 'var(--text-secondary)' }}>
        Одна логика (отслеживание мыши) — разный UI. Наведите курсор на область ниже:
      </p>

      <div className="controls" style={{ marginBottom: '16px' }}>
        <button className={`btn ${variant === 'text' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setVariant('text')}>
          📝 Текст
        </button>
        <button className={`btn ${variant === 'follower' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setVariant('follower')}>
          🔴 Кружок
        </button>
        <button className={`btn ${variant === 'heatmap' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setVariant('heatmap')}>
          🌡️ Градиент
        </button>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 350px' }}>
          <MouseTracker 
            render={(pos) => {
              if (variant === 'text') {
                return (
                  <div style={{ padding: '20px', textAlign: 'center', paddingTop: '80px' }}>
                    <div style={{ fontSize: '2rem', fontFamily: 'monospace' }}>
                      x: {pos.x.toFixed(0)}, y: {pos.y.toFixed(0)}
                    </div>
                    <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Двигайте мышкой</p>
                  </div>
                )
              }
              if (variant === 'follower') {
                return (
                  <>
                    <div 
                      style={{
                        position: 'absolute',
                        left: pos.x - 15,
                        top: pos.y - 15,
                        width: 30,
                        height: 30,
                        background: 'var(--accent-red)',
                        borderRadius: '50%',
                        transition: 'left 0.1s, top 0.1s',
                        boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)'
                      }}
                    />
                    <p style={{ position: 'absolute', bottom: '10px', left: '10px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Кружок следует за курсором
                    </p>
                  </>
                )
              }
              // heatmap
              return (
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: `radial-gradient(circle at ${pos.x}px ${pos.y}px, 
                    rgba(239, 68, 68, 0.8) 0%, 
                    rgba(245, 158, 11, 0.5) 30%, 
                    rgba(59, 130, 246, 0.3) 60%, 
                    transparent 80%)`,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '10px'
                }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Градиент следует за курсором</span>
                </div>
              )
            }}
          />
        </div>

        <div style={{ flex: '1 1 350px' }}>
          <CodeBlock 
            code={`// Render Props паттерн
<MouseTracker 
  render={({ x, y }) => (
    <div>Курсор: {x}, {y}</div>
  )}
/>

// Реализация
function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  
  return (
    <div onMouseMove={(e) => {
      setPos({ x: e.clientX, y: e.clientY })
    }}>
      {render(pos)}  {/* Вызываем функцию */}
    </div>
  )
}

// Современная альтернатива — хук:
function useMouse() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  // ... логика ...
  return pos
}`}
            language="tsx"
            title="Render Props"
          />
        </div>
      </div>
    </div>
  )
}

// =====================================================
// CUSTOM HOOKS - ЖИВОЙ ПРИМЕР
// =====================================================

// Хук useLocalStorage
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    setStoredValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue]
}

// Хук useDebounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// Хук useOnlineStatus
function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

function CustomHooksLive() {
  // Демо useLocalStorage
  const [theme, setTheme] = useLocalStorage('demo-theme', 'light')
  const [count, setCount] = useLocalStorage('demo-count', 0)

  // Демо useDebounce
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounce(searchInput, 500)
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  useEffect(() => {
    if (debouncedSearch) {
      setSearchHistory(prev => [...prev.slice(-4), debouncedSearch])
    }
  }, [debouncedSearch])

  // Демо useOnlineStatus
  const isOnline = useOnlineStatus()

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🪝 Custom Hooks</h3>
        <span className="card-badge">Рекомендуется</span>
      </div>

      <div className="info-box success">
        <span className="info-box-icon">✅</span>
        <div className="info-box-content">
          <p>Custom Hooks — основной способ переиспользования логики в React. Проще HOC, композируемые, типизируемые.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
        {/* useLocalStorage */}
        <div className="visual-diagram">
          <h4 style={{ marginBottom: '12px' }}>💾 useLocalStorage</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Данные сохраняются в localStorage и переживут перезагрузку
          </p>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <button 
              className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setTheme('light')}
            >
              ☀️ Light
            </button>
            <button 
              className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setTheme('dark')}
            >
              🌙 Dark
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn btn-secondary" onClick={() => setCount(count - 1)}>-</button>
            <span style={{ fontSize: '1.5rem', fontFamily: 'monospace', minWidth: '40px', textAlign: 'center' }}>{count}</span>
            <button className="btn btn-secondary" onClick={() => setCount(count + 1)}>+</button>
          </div>

          <div style={{ marginTop: '12px', padding: '8px', background: 'var(--bg-primary)', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'monospace' }}>
            localStorage: {JSON.stringify({ theme, count })}
          </div>
        </div>

        {/* useDebounce */}
        <div className="visual-diagram">
          <h4 style={{ marginBottom: '12px' }}>⏱️ useDebounce</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Запрос отправится только через 500мс после остановки ввода
          </p>
          
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Начните вводить..."
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}
          />

          <div style={{ fontSize: '0.85rem' }}>
            <div>Input: <code>{searchInput || '—'}</code></div>
            <div>Debounced: <code style={{ color: 'var(--accent-green)' }}>{debouncedSearch || '—'}</code></div>
          </div>

          <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            История: {searchHistory.length > 0 ? searchHistory.join(' → ') : 'пусто'}
          </div>
        </div>

        {/* useOnlineStatus */}
        <div className="visual-diagram">
          <h4 style={{ marginBottom: '12px' }}>📶 useOnlineStatus</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Отключите сеть в DevTools → Network → Offline
          </p>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            padding: '16px',
            background: isOnline ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            borderRadius: '8px',
            border: `1px solid ${isOnline ? 'var(--accent-green)' : 'var(--accent-red)'}`
          }}>
            <span style={{ fontSize: '2rem' }}>{isOnline ? '🟢' : '🔴'}</span>
            <div>
              <div style={{ fontWeight: 600 }}>{isOnline ? 'Online' : 'Offline'}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                navigator.onLine: {String(isOnline)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <CodeBlock 
          code={`// Custom Hook — функция начинающаяся с "use"
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initial
  })
  
  const set = (newValue: T) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }
  
  return [value, set] as const
}

// Использование
const [theme, setTheme] = useLocalStorage('theme', 'light')
const [user, setUser] = useLocalStorage('user', null)`}
          language="tsx"
          title="Пример Custom Hook"
        />
      </div>
    </div>
  )
}

// =====================================================
// INTERVIEW QUESTIONS
// =====================================================
function InterviewQuestions() {
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({})

  const questions = [
    {
      q: "Что такое Compound Components и когда использовать?",
      a: "Паттерн для связанных UI компонентов с общим состоянием (Tabs, Accordion). Используют Context. Даёт декларативный API как у HTML элементов."
    },
    {
      q: "Чем Render Props отличается от HOC?",
      a: "Render Props — передаём функцию рендеринга как проп. HOC — функция-обёртка. Оба решают одну задачу, сейчас заменяются хуками."
    },
    {
      q: "Почему Custom Hooks лучше HOC?",
      a: "Нет wrapper hell, проще композиция, явный data flow, легче тестировать, TypeScript friendly."
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
            style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '16px', cursor: 'pointer' }}
            onClick={() => setShowAnswers(prev => ({ ...prev, [i]: !prev[i] }))}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{item.q}</strong>
              <span>{showAnswers[i] ? '🔼' : '🔽'}</span>
            </div>
            {showAnswers[i] && (
              <p style={{ marginTop: '12px', color: 'var(--accent-green)', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
