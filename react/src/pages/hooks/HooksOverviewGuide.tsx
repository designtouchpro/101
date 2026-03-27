import { useState, useEffect, useRef, useMemo, useCallback, useReducer, memo } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function HooksOverviewGuide() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🎣 Обзор всех хуков React</h1>
        <p>Полный справочник хуков с интерактивными примерами</p>
        <a 
          href="https://react.dev/reference/react/hooks" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 React Hooks Reference
        </a>
      </div>

      <HooksQuickRef />
      <StateHooksLive />
      <EffectHooksLive />
      <RefHooksLive />
      <PerformanceHooksLive />
      <InterviewQuestions />
    </div>
  )
}

// =====================================================
// QUICK REFERENCE
// =====================================================
function HooksQuickRef() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Быстрая шпаргалка</h3>
        <span className="card-badge">Все хуки</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
        {[
          { name: 'useState', desc: 'Локальное состояние', color: 'var(--accent-blue)', icon: '📦' },
          { name: 'useReducer', desc: 'Сложное состояние', color: 'var(--accent-blue)', icon: '🔄' },
          { name: 'useEffect', desc: 'Побочные эффекты', color: 'var(--accent-green)', icon: '⚡' },
          { name: 'useLayoutEffect', desc: 'Синхронные эффекты', color: 'var(--accent-green)', icon: '📐' },
          { name: 'useRef', desc: 'Мутабельная ссылка', color: 'var(--accent-purple)', icon: '📌' },
          { name: 'useMemo', desc: 'Мемоизация значений', color: 'var(--accent-orange)', icon: '💾' },
          { name: 'useCallback', desc: 'Мемоизация функций', color: 'var(--accent-orange)', icon: '🔗' },
          { name: 'useContext', desc: 'Чтение контекста', color: 'var(--accent-red)', icon: '🌐' },
        ].map(hook => (
          <div 
            key={hook.name}
            style={{ 
              padding: '12px', 
              background: 'var(--bg-secondary)', 
              borderRadius: '8px',
              borderLeft: `3px solid ${hook.color}`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span>{hook.icon}</span>
              <code style={{ fontWeight: 600 }}>{hook.name}</code>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>{hook.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// =====================================================
// STATE HOOKS
// =====================================================
interface CounterState {
  count: number
  step: number
}

type CounterAction = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setStep'; payload: number }
  | { type: 'reset' }

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + state.step }
    case 'decrement': return { ...state, count: state.count - state.step }
    case 'setStep': return { ...state, step: action.payload }
    case 'reset': return { count: 0, step: 1 }
    default: return state
  }
}

function StateHooksLive() {
  // useState demo
  const [text, setText] = useState('')
  const [items, setItems] = useState<string[]>(['Item 1', 'Item 2'])

  // useReducer demo
  const [state, dispatch] = useReducer(counterReducer, { count: 0, step: 1 })

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">📦 State Hooks</h3>
        <span className="card-badge">useState / useReducer</span>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {/* useState */}
        <div style={{ flex: '1 1 300px' }}>
          <div className="visual-diagram">
            <h4 style={{ marginBottom: '12px' }}>useState</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Для простых значений и независимых апдейтов
            </p>
            
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Введите текст..."
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                marginBottom: '12px'
              }}
            />
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  if (text.trim()) {
                    setItems(prev => [...prev, text])
                    setText('')
                  }
                }}
              >
                Добавить
              </button>
              <button className="btn btn-secondary" onClick={() => setItems([])}>
                Очистить
              </button>
            </div>

            <div style={{ fontSize: '0.85rem' }}>
              {items.map((item, i) => (
                <div key={i} style={{ padding: '4px 0', borderBottom: '1px solid var(--border-color)' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* useReducer */}
        <div style={{ flex: '1 1 300px' }}>
          <div className="visual-diagram">
            <h4 style={{ marginBottom: '12px' }}>useReducer</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Для связанного состояния и сложной логики
            </p>
            
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '3rem', fontFamily: 'monospace' }}>{state.count}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>step: {state.step}</div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px' }}>
              <button className="btn btn-primary" onClick={() => dispatch({ type: 'decrement' })}>
                -{state.step}
              </button>
              <button className="btn btn-primary" onClick={() => dispatch({ type: 'increment' })}>
                +{state.step}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {[1, 5, 10].map(s => (
                <button 
                  key={s}
                  className={`btn ${state.step === s ? 'btn-secondary' : 'btn-secondary'}`}
                  style={{ opacity: state.step === s ? 1 : 0.5 }}
                  onClick={() => dispatch({ type: 'setStep', payload: s })}
                >
                  step={s}
                </button>
              ))}
              <button className="btn btn-secondary" onClick={() => dispatch({ type: 'reset' })}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
        <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
          <strong>useState когда:</strong>
          <ul className="info-list">
            <li>Простые примитивы (строка, число)</li>
            <li>Независимые значения</li>
            <li>Простая логика обновления</li>
          </ul>
        </div>
        <div style={{ padding: '12px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '8px' }}>
          <strong>useReducer когда:</strong>
          <ul className="info-list">
            <li>Связанные значения (форма, корзина)</li>
            <li>Сложные переходы состояний</li>
            <li>Логика в одном месте</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// =====================================================
// EFFECT HOOKS
// =====================================================
function EffectHooksLive() {
  const [count, setCount] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [effectLog, setEffectLog] = useState<string[]>([])

  // Effect с зависимостью
  useEffect(() => {
    document.title = `Счётчик: ${count}`
    setEffectLog(prev => [...prev.slice(-4), `title updated: ${count}`])
  }, [count])

  // Effect при монтировании
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    setEffectLog(prev => [...prev.slice(-4), 'mousemove listener added'])
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      // Cleanup при unmount
    }
  }, [])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">⚡ Effect Hooks</h3>
        <span className="card-badge">useEffect / useLayoutEffect</span>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 350px' }}>
          <div className="visual-diagram">
            <h4 style={{ marginBottom: '12px' }}>useEffect в действии</h4>
            
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                1. Меняет document.title при изменении счётчика
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button className="btn btn-secondary" onClick={() => setCount(c => c - 1)}>-</button>
                <span style={{ fontSize: '2rem', fontFamily: 'monospace', minWidth: '60px', textAlign: 'center' }}>{count}</span>
                <button className="btn btn-secondary" onClick={() => setCount(c => c + 1)}>+</button>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Посмотрите на заголовок вкладки браузера ☝️
              </p>
            </div>

            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                2. Подписка на mousemove при монтировании
              </p>
              <div style={{ 
                padding: '12px', 
                background: 'var(--bg-primary)', 
                borderRadius: '8px',
                fontFamily: 'monospace'
              }}>
                x: {mousePos.x}, y: {mousePos.y}
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 350px' }}>
          <div style={{ 
            padding: '16px', 
            background: 'var(--bg-secondary)', 
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <h4 style={{ marginBottom: '12px' }}>📜 Effect Log</h4>
            {effectLog.length === 0 ? (
              <div style={{ color: 'var(--text-muted)' }}>Эффекты появятся здесь...</div>
            ) : (
              effectLog.map((log, i) => (
                <div key={i} style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontFamily: 'monospace' }}>
                  → {log}
                </div>
              ))
            )}
          </div>

          <CodeBlock 
            code={`// Выполнится когда count изменится
useEffect(() => {
  document.title = \`Счётчик: \${count}\`
}, [count])  // ← зависимости

// Выполнится один раз при монтировании
useEffect(() => {
  window.addEventListener('mousemove', handler)
  
  return () => {  // ← cleanup при unmount
    window.removeEventListener('mousemove', handler)
  }
}, [])  // ← пустой массив = только mount`}
            language="tsx"
            title="useEffect"
          />
        </div>
      </div>
    </div>
  )
}

// =====================================================
// REF HOOKS
// =====================================================
function RefHooksLive() {
  const inputRef = useRef<HTMLInputElement>(null)
  const renderCount = useRef(0)
  const [inputValue, setInputValue] = useState('')
  const prevValue = useRef('')

  renderCount.current += 1

  useEffect(() => {
    prevValue.current = inputValue
  }, [inputValue])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">📌 Ref Hooks</h3>
        <span className="card-badge">useRef</span>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {/* DOM ref */}
        <div style={{ flex: '1 1 280px' }}>
          <div className="visual-diagram">
            <h4 style={{ marginBottom: '12px' }}>1. Доступ к DOM</h4>
            
            <input
              ref={inputRef}
              type="text"
              placeholder="Кликните кнопку →"
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
            
            <button 
              className="btn btn-primary"
              onClick={() => inputRef.current?.focus()}
            >
              Фокус на input
            </button>
          </div>
        </div>

        {/* Mutable value */}
        <div style={{ flex: '1 1 280px' }}>
          <div className="visual-diagram">
            <h4 style={{ marginBottom: '12px' }}>2. Счётчик рендеров</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              ref.current не вызывает ре-рендер
            </p>
            
            <div style={{ 
              fontSize: '2rem', 
              fontFamily: 'monospace',
              textAlign: 'center',
              padding: '16px',
              background: 'var(--bg-primary)',
              borderRadius: '8px'
            }}>
              Renders: {renderCount.current}
            </div>
          </div>
        </div>

        {/* Previous value */}
        <div style={{ flex: '1 1 280px' }}>
          <div className="visual-diagram">
            <h4 style={{ marginBottom: '12px' }}>3. Предыдущее значение</h4>
            
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Введите текст..."
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
              <div>Текущее: <code>{inputValue || '—'}</code></div>
              <div>Предыдущее: <code style={{ color: 'var(--accent-orange)' }}>{prevValue.current || '—'}</code></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// =====================================================
// PERFORMANCE HOOKS
// =====================================================
const ExpensiveChild = memo(function ExpensiveChild({ 
  onClick, 
  label 
}: { 
  onClick: () => void
  label: string 
}) {
  const renderCount = useRef(0)
  renderCount.current += 1
  
  return (
    <div style={{ 
      padding: '12px', 
      background: 'var(--bg-secondary)', 
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--accent-orange)' }}>
          renders: {renderCount.current}
        </span>
        <button className="btn btn-primary" onClick={onClick}>Click</button>
      </div>
    </div>
  )
})

function PerformanceHooksLive() {
  const [count, setCount] = useState(0)
  const [otherState, setOtherState] = useState(0)
  const [numbers] = useState(() => Array.from({ length: 1000 }, (_, i) => i))
  const [filter, setFilter] = useState('')

  // Без useCallback — новая функция каждый рендер
  const handleClickBad = () => setCount(c => c + 1)
  
  // С useCallback — стабильная ссылка
  const handleClickGood = useCallback(() => setCount(c => c + 1), [])

  // useMemo для тяжёлых вычислений
  const filteredNumbers = useMemo(() => {
    return numbers.filter(n => String(n).includes(filter))
  }, [numbers, filter])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">⚡ Performance Hooks</h3>
        <span className="card-badge">useMemo / useCallback</span>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {/* useCallback demo */}
        <div style={{ flex: '1 1 350px' }}>
          <div className="visual-diagram">
            <h4 style={{ marginBottom: '12px' }}>useCallback</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Нажмите "Other state" и смотрите на счётчик рендеров
            </p>

            <div style={{ marginBottom: '12px' }}>
              <div style={{ marginBottom: '8px', fontSize: '0.85rem' }}>
                count: {count} | otherState: {otherState}
              </div>
              <button 
                className="btn btn-secondary"
                onClick={() => setOtherState(s => s + 1)}
              >
                Other state++
              </button>
            </div>

            <div style={{ display: 'grid', gap: '8px' }}>
              <ExpensiveChild onClick={handleClickBad} label="❌ Без useCallback" />
              <ExpensiveChild onClick={handleClickGood} label="✅ С useCallback" />
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Компонент с useCallback не перерендеривается при изменении otherState
            </p>
          </div>
        </div>

        {/* useMemo demo */}
        <div style={{ flex: '1 1 350px' }}>
          <div className="visual-diagram">
            <h4 style={{ marginBottom: '12px' }}>useMemo</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Фильтрация 1000 чисел — пересчёт только при изменении filter
            </p>

            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Фильтр (например: 42)"
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

            <div style={{ 
              padding: '8px', 
              background: 'var(--bg-primary)', 
              borderRadius: '8px',
              fontSize: '0.85rem'
            }}>
              Найдено: <strong>{filteredNumbers.length}</strong> из 1000
              <div style={{ 
                maxHeight: '100px', 
                overflow: 'auto', 
                marginTop: '8px',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                color: 'var(--text-muted)'
              }}>
                {filteredNumbers.slice(0, 50).join(', ')}
                {filteredNumbers.length > 50 && '...'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <CodeBlock 
          code={`// useCallback — мемоизация функции
const handleClick = useCallback(() => {
  setCount(c => c + 1)
}, [])  // Стабильная ссылка, не меняется

// useMemo — мемоизация значения
const filtered = useMemo(() => {
  return items.filter(i => i.includes(filter))
}, [items, filter])  // Пересчёт только если items или filter изменились

// Правило: используй когда передаёшь в memo() компонент
// или в зависимости других хуков`}
          language="tsx"
          title="Когда использовать"
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
      q: "Чем useState отличается от useReducer?",
      a: "useState — для простых значений. useReducer — для связанного состояния со сложной логикой. Оба хранят локальный state."
    },
    {
      q: "Чем useEffect отличается от useLayoutEffect?",
      a: "useEffect — асинхронно ПОСЛЕ paint. useLayoutEffect — синхронно ДО paint. useLayoutEffect для DOM измерений."
    },
    {
      q: "Зачем useCallback и useMemo?",
      a: "Для оптимизации: 1) передача в memo() компонент, 2) в зависимостях хуков, 3) тяжёлые вычисления. Не оптимизируй преждевременно!"
    },
    {
      q: "Почему useRef не вызывает ре-рендер?",
      a: "ref.current — мутабельный объект вне React flow. Изменение не уведомляет React. Используй для DOM, таймеров, предыдущих значений."
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
