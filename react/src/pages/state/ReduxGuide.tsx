import { useState, useReducer } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function ReduxGuide() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔮 Redux & Redux Toolkit</h1>
        <p>Предсказуемый state container — индустриальный стандарт</p>
        <a 
          href="https://redux-toolkit.js.org/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 Redux Toolkit Docs
        </a>
      </div>

      <CoreConcepts />
      <ReduxSimulator />
      <RTKSliceDemo />
      <AsyncActionsDemo />
      <InterviewQuestions />
    </div>
  )
}

// =====================================================
// CORE CONCEPTS
// =====================================================
function CoreConcepts() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Три принципа Redux</h3>
        <span className="card-badge">Основы</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ 
          background: 'var(--bg-secondary)', 
          padding: '16px', 
          borderRadius: '8px',
          borderLeft: '4px solid var(--accent-blue)'
        }}>
          <h4 style={{ marginBottom: '8px' }}>1️⃣ Single Source of Truth</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Всё состояние приложения хранится в одном store
          </p>
        </div>

        <div style={{ 
          background: 'var(--bg-secondary)', 
          padding: '16px', 
          borderRadius: '8px',
          borderLeft: '4px solid var(--accent-green)'
        }}>
          <h4 style={{ marginBottom: '8px' }}>2️⃣ State is Read-Only</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Изменить state можно только через dispatch action
          </p>
        </div>

        <div style={{ 
          background: 'var(--bg-secondary)', 
          padding: '16px', 
          borderRadius: '8px',
          borderLeft: '4px solid var(--accent-purple)'
        }}>
          <h4 style={{ marginBottom: '8px' }}>3️⃣ Pure Reducers</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Изменения делаются чистыми функциями (reducers)
          </p>
        </div>
      </div>

      <div className="visual-diagram" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div className="diagram-box component">UI Component</div>
          <span style={{ fontSize: '1.5rem' }}>→</span>
          <div className="diagram-box" style={{ background: 'rgba(59, 130, 246, 0.2)', borderColor: 'var(--accent-blue)' }}>
            dispatch(action)
          </div>
          <span style={{ fontSize: '1.5rem' }}>→</span>
          <div className="diagram-box" style={{ background: 'rgba(168, 85, 247, 0.2)', borderColor: 'var(--accent-purple)' }}>
            Reducer
          </div>
          <span style={{ fontSize: '1.5rem' }}>→</span>
          <div className="diagram-box state">New State</div>
          <span style={{ fontSize: '1.5rem' }}>→</span>
          <div className="diagram-box component">UI Update</div>
        </div>
      </div>
    </div>
  )
}

// =====================================================
// REDUX SIMULATOR - ЖИВОЙ ПРИМЕР
// =====================================================
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  discount: number
}

type CartAction =
  | { type: 'cart/addItem'; payload: { id: number; name: string; price: number } }
  | { type: 'cart/removeItem'; payload: number }
  | { type: 'cart/updateQuantity'; payload: { id: number; quantity: number } }
  | { type: 'cart/applyDiscount'; payload: number }
  | { type: 'cart/clear' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'cart/addItem': {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      }
    }
    case 'cart/removeItem':
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload)
      }
    case 'cart/updateQuantity':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        )
      }
    case 'cart/applyDiscount':
      return { ...state, discount: action.payload }
    case 'cart/clear':
      return { items: [], discount: 0 }
    default:
      return state
  }
}

const products = [
  { id: 1, name: 'iPhone 15', price: 999 },
  { id: 2, name: 'MacBook Pro', price: 1999 },
  { id: 3, name: 'AirPods Pro', price: 249 },
  { id: 4, name: 'iPad Air', price: 599 },
]

function ReduxSimulator() {
  const [state, dispatch] = useReducer(cartReducer, { items: [], discount: 0 })
  const [actionLog, setActionLog] = useState<Array<{ action: string; time: string }>>([])

  const logAction = (action: CartAction) => {
    const time = new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    setActionLog(prev => [...prev.slice(-4), { action: action.type, time }])
    dispatch(action)
  }

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const total = subtotal * (1 - state.discount / 100)

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🛒 Redux Симулятор</h3>
        <span className="card-badge">Живой пример</span>
      </div>

      <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
        Это работает так же как Redux — useReducer это Redux без middleware. 
        Добавляйте товары и смотрите как меняется state.
      </p>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {/* Products */}
        <div style={{ flex: '1 1 300px' }}>
          <h4 style={{ marginBottom: '12px' }}>📦 Товары</h4>
          <div style={{ display: 'grid', gap: '8px' }}>
            {products.map(p => (
              <div 
                key={p.id}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '8px'
                }}
              >
                <div>
                  <div style={{ fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-green)' }}>${p.price}</div>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => logAction({ type: 'cart/addItem', payload: p })}
                >
                  + В корзину
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px' }}>
            <h4 style={{ marginBottom: '8px' }}>🏷️ Скидка</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[0, 10, 20, 30].map(d => (
                <button
                  key={d}
                  className={`btn ${state.discount === d ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => logAction({ type: 'cart/applyDiscount', payload: d })}
                >
                  {d}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cart */}
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4>🛒 Корзина ({state.items.length})</h4>
            <button className="btn btn-secondary" onClick={() => logAction({ type: 'cart/clear' })}>
              Очистить
            </button>
          </div>

          {state.items.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              Корзина пуста
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '8px' }}>
              {state.items.map(item => (
                <div 
                  key={item.id}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '12px',
                    background: 'var(--bg-secondary)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div>{item.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      ${item.price} × {item.quantity} = ${item.price * item.quantity}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <button 
                      className="btn btn-secondary"
                      style={{ padding: '4px 8px' }}
                      onClick={() => {
                        if (item.quantity > 1) {
                          logAction({ type: 'cart/updateQuantity', payload: { id: item.id, quantity: item.quantity - 1 } })
                        } else {
                          logAction({ type: 'cart/removeItem', payload: item.id })
                        }
                      }}
                    >
                      -
                    </button>
                    <span style={{ minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                    <button 
                      className="btn btn-secondary"
                      style={{ padding: '4px 8px' }}
                      onClick={() => logAction({ type: 'cart/updateQuantity', payload: { id: item.id, quantity: item.quantity + 1 } })}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {state.items.length > 0 && (
            <div style={{ marginTop: '12px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Подитог:</span>
                <span>${subtotal}</span>
              </div>
              {state.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-green)' }}>
                  <span>Скидка {state.discount}%:</span>
                  <span>-${(subtotal * state.discount / 100).toFixed(0)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                <span>Итого:</span>
                <span style={{ color: 'var(--accent-blue)' }}>${total.toFixed(0)}</span>
              </div>
            </div>
          )}
        </div>

        {/* State & Actions */}
        <div style={{ flex: '1 1 300px' }}>
          <h4 style={{ marginBottom: '12px' }}>📊 State (Redux DevTools)</h4>
          <div style={{ 
            padding: '12px', 
            background: 'var(--bg-secondary)', 
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            maxHeight: '200px',
            overflow: 'auto'
          }}>
            <pre style={{ color: 'var(--accent-green)' }}>
              {JSON.stringify(state, null, 2)}
            </pre>
          </div>

          <h4 style={{ margin: '16px 0 12px' }}>📜 Action Log</h4>
          <div style={{ 
            padding: '12px', 
            background: 'var(--bg-secondary)', 
            borderRadius: '8px',
            fontSize: '0.8rem'
          }}>
            {actionLog.length === 0 ? (
              <div style={{ color: 'var(--text-muted)' }}>Действия появятся здесь...</div>
            ) : (
              actionLog.map((log, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <code style={{ color: 'var(--accent-blue)' }}>{log.action}</code>
                  <span style={{ color: 'var(--text-muted)' }}>{log.time}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// =====================================================
// RTK SLICE DEMO
// =====================================================
function RTKSliceDemo() {
  const [tab, setTab] = useState<'slice' | 'store' | 'component'>('slice')

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Redux Toolkit (RTK)</h3>
        <span className="card-badge">Современный подход</span>
      </div>

      <div className="info-box success">
        <span className="info-box-icon">✅</span>
        <div className="info-box-content">
          <p>
            <strong>RTK — официальный способ писать Redux.</strong> Убирает бойлерплейт, 
            включает Immer (иммутабельность), DevTools, createAsyncThunk для async.
          </p>
        </div>
      </div>

      <div className="controls" style={{ marginTop: '16px' }}>
        <button className={`btn ${tab === 'slice' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('slice')}>
          1. createSlice
        </button>
        <button className={`btn ${tab === 'store' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('store')}>
          2. configureStore
        </button>
        <button className={`btn ${tab === 'component' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('component')}>
          3. Использование
        </button>
      </div>

      {tab === 'slice' && (
        <CodeBlock 
          code={`// counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 } as CounterState,
  
  reducers: {
    // Immer позволяет "мутировать" state
    increment: (state) => {
      state.value += 1  // Это безопасно!
    },
    
    decrement: (state) => {
      state.value -= 1
    },
    
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Автоматически созданные action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Selector
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer`}
          language="tsx"
          title="createSlice — slice = reducer + actions"
        />
      )}

      {tab === 'store' && (
        <CodeBlock 
          code={`// store.ts
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
  // DevTools включены автоматически!
  // Thunk middleware включен автоматически!
})

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Типизированные хуки (создайте в отдельном файле)
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()`}
          language="tsx"
          title="configureStore — настройка store"
        />
      )}

      {tab === 'component' && (
        <CodeBlock 
          code={`// Counter.tsx
import { useAppSelector, useAppDispatch } from '../store'
import { increment, decrement, incrementByAmount, selectCount } from './counterSlice'

function Counter() {
  // Получаем данные через selector
  const count = useAppSelector(selectCount)
  
  // Получаем dispatch
  const dispatch = useAppDispatch()

  return (
    <div>
      <h1>Счётчик: {count}</h1>
      
      {/* dispatch вызывает action creator */}
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  )
}

// main.tsx — оборачиваем приложение в Provider
import { Provider } from 'react-redux'
import { store } from './store'

<Provider store={store}>
  <App />
</Provider>`}
          language="tsx"
          title="Использование в компоненте"
        />
      )}
    </div>
  )
}

// =====================================================
// ASYNC ACTIONS DEMO
// =====================================================
function AsyncActionsDemo() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [data, setData] = useState<{ name: string; email: string } | null>(null)

  const fetchUser = async () => {
    setStatus('loading')
    setData(null)
    
    // Симуляция API запроса
    await new Promise(r => setTimeout(r, 1500))
    
    if (Math.random() > 0.3) {
      setData({ name: 'John Doe', email: 'john@example.com' })
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Асинхронные операции</h3>
        <span className="card-badge">createAsyncThunk</span>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <div className="visual-diagram">
            <h4 style={{ marginBottom: '12px' }}>Симуляция загрузки</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Нажмите кнопку — 70% успех, 30% ошибка
            </p>

            <button 
              className="btn btn-primary" 
              onClick={fetchUser}
              disabled={status === 'loading'}
              style={{ width: '100%', marginBottom: '16px' }}
            >
              {status === 'loading' ? '⏳ Загрузка...' : '🔄 Загрузить пользователя'}
            </button>

            <div style={{ 
              padding: '16px', 
              borderRadius: '8px',
              background: status === 'success' ? 'rgba(34, 197, 94, 0.1)' : 
                         status === 'error' ? 'rgba(239, 68, 68, 0.1)' :
                         status === 'loading' ? 'rgba(59, 130, 246, 0.1)' :
                         'var(--bg-secondary)',
              border: `1px solid ${
                status === 'success' ? 'var(--accent-green)' : 
                status === 'error' ? 'var(--accent-red)' :
                status === 'loading' ? 'var(--accent-blue)' :
                'var(--border-color)'
              }`
            }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <strong>Status:</strong>
                <span style={{ 
                  color: status === 'success' ? 'var(--accent-green)' : 
                         status === 'error' ? 'var(--accent-red)' :
                         status === 'loading' ? 'var(--accent-blue)' :
                         'var(--text-muted)'
                }}>
                  {status}
                </span>
              </div>
              
              {data && (
                <div>
                  <div>👤 {data.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>📧 {data.email}</div>
                </div>
              )}
              
              {status === 'error' && (
                <div style={{ color: 'var(--accent-red)' }}>❌ Ошибка загрузки</div>
              )}
              
              {status === 'idle' && (
                <div style={{ color: 'var(--text-muted)' }}>Нажмите кнопку</div>
              )}
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 400px' }}>
          <CodeBlock 
            code={`// createAsyncThunk создаёт 3 actions:
// fetchUser.pending   — запрос начался
// fetchUser.fulfilled — успех
// fetchUser.rejected  — ошибка

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(\`/api/users/\${userId}\`)
      return await response.json()
    } catch (error) {
      return rejectWithValue('Ошибка загрузки')
    }
  }
)

// В slice обрабатываем через extraReducers
extraReducers: (builder) => {
  builder
    .addCase(fetchUser.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.status = 'success'
      state.user = action.payload
    })
    .addCase(fetchUser.rejected, (state) => {
      state.status = 'error'
    })
}`}
            language="tsx"
            title="createAsyncThunk"
          />
        </div>
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
      q: "Что такое action, reducer, store в Redux?",
      a: "Action — объект {type, payload} описывающий ЧТО произошло. Reducer — чистая функция (state, action) => newState. Store — хранит state, позволяет dispatch actions."
    },
    {
      q: "Как работает Immer в RTK?",
      a: "Immer позволяет писать 'мутирующий' код, но создаёт новый иммутабельный объект. state.value++ в createSlice на самом деле не мутирует — Immer создаёт копию."
    },
    {
      q: "Когда Redux vs Context?",
      a: "Redux: частые обновления, сложная логика, DevTools нужны. Context: редко меняющиеся данные (тема, локаль). Context ре-рендерит всех потребителей!"
    },
    {
      q: "Зачем middleware?",
      a: "Middleware перехватывает actions между dispatch и reducer. Для: логирования, async (thunk), аналитики. Thunk позволяет dispatch функции для async."
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
