import { useState } from 'react'

type Tab = 'useReducer' | 'portals' | 'advanced' | 'decision'

export default function AdvancedHooksPortals() {
  const [tab, setTab] = useState<Tab>('useReducer')

  return (
    <div className="demo-container">
      <h1>🔧 Advanced Hooks и Portals</h1>
      <p className="section-desc">
        useReducer, useImperativeHandle, useSyncExternalStore, portals,
        focus management, overlay architecture — когда это нужно.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {([
          ['useReducer', '🔄 useReducer'],
          ['advanced', '🔬 Редкие хуки'],
          ['portals', '🚪 Portals & Overlays'],
          ['decision', '🗺️ Когда что'],
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

      {tab === 'useReducer' && (
        <>
          <section className="card">
            <h2>🔄 useReducer — управляемый state machine</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`// useReducer — когда state сложнее одного значения
// или когда следующее состояние зависит от предыдущего

type State = {
  count: number
  step: number
  history: number[]
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setStep'; payload: number }
  | { type: 'reset' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + state.step,
        history: [...state.history, state.count + state.step],
      }
    case 'decrement':
      return {
        ...state,
        count: state.count - state.step,
        history: [...state.history, state.count - state.step],
      }
    case 'setStep':
      return { ...state, step: action.payload }
    case 'reset':
      return { count: 0, step: 1, history: [] }
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0, step: 1, history: [],
  })

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  )
}`}
            </pre>
          </section>

          <section className="card">
            <h2>⚖️ useState vs useReducer</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Критерий</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>useState</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>useReducer</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { crit: 'Тип state', us: 'Примитив или простой объект', ur: 'Сложный объект, несколько связанных полей' },
                  { crit: 'Переходы', us: 'Прямое присваивание', ur: 'Через action dispatch' },
                  { crit: 'Логика', us: 'Inline в компоненте', ur: 'Вынесена в reducer (testable)' },
                  { crit: 'Количество actions', us: '1-3 обновления', ur: '4+ разных операций' },
                  { crit: 'Зависимость от prev state', us: 'setState(prev => next)', ur: 'Всегда через reducer' },
                  { crit: 'Тестирование', us: 'Через рендер компонента', ur: 'reducer — чистая функция, unit тест' },
                ].map(r => (
                  <tr key={r.crit} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8, fontWeight: 600 }}>{r.crit}</td>
                    <td style={{ padding: 8 }}>{r.us}</td>
                    <td style={{ padding: 8 }}>{r.ur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="info-box" style={{ marginTop: 12 }}>
              <strong>💡 Правило:</strong> Если у вас 3+ связанных useState — рассмотрите useReducer.
              Если state — простой toggle или число — useState достаточно.
            </div>
          </section>

          <section className="card">
            <h2>🏗️ useReducer + Context = мини-Redux</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`// Паттерн: dispatch через Context, state через Context
const StateCtx = createContext<State>(initialState)
const DispatchCtx = createContext<Dispatch<Action>>(() => {})

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>
        {children}
      </DispatchCtx.Provider>
    </StateCtx.Provider>
  )
}

// Разделение Context:
// StateCtx — компоненты, которые читают state
// DispatchCtx — компоненты, которые только отправляют actions
// → dispatch никогда не меняется → нет лишних ре-рендеров

function AddButton() {
  const dispatch = useContext(DispatchCtx) // stable ref
  return <button onClick={() => dispatch({ type: 'add' })}>Add</button>
}`}
            </pre>
          </section>
        </>
      )}

      {tab === 'advanced' && (
        <>
          <section className="card">
            <h2>🔬 useImperativeHandle</h2>
            <p>Кастомизирует ref, который родитель получает через <code>forwardRef</code>.</p>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`// Expose limited API instead of raw DOM node
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) inputRef.current.value = ''
    },
    // Не expose весь DOM node — только нужное
  }))

  return <input ref={inputRef} {...props} />
})

// Родитель:
function Parent() {
  const ref = useRef<{ focus: () => void; clear: () => void }>(null)
  return (
    <>
      <FancyInput ref={ref} />
      <button onClick={() => ref.current?.focus()}>Focus</button>
      <button onClick={() => ref.current?.clear()}>Clear</button>
    </>
  )
}

// ⚠️ React 19: ref как обычный prop — forwardRef не нужен
// function FancyInput({ ref, ...props }) {
//   useImperativeHandle(ref, () => ({ focus, clear }))
// }`}
            </pre>
          </section>

          <section className="card">
            <h2>🔗 useSyncExternalStore</h2>
            <p>Подписка на внешний store из React (тот же API, что использует Zustand/Redux).</p>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`import { useSyncExternalStore } from 'react'

// Пример: подписка на window.matchMedia
function useMediaQuery(query: string) {
  const subscribe = (callback: () => void) => {
    const mql = window.matchMedia(query)
    mql.addEventListener('change', callback)
    return () => mql.removeEventListener('change', callback)
  }
  const getSnapshot = () => window.matchMedia(query).matches
  const getServerSnapshot = () => false // SSR fallback

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

// Использование:
function App() {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)')
  const isMobile = useMediaQuery('(max-width: 768px)')
  // ...
}

// Пример: online status
function useOnlineStatus() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener('online', cb)
      window.addEventListener('offline', cb)
      return () => {
        window.removeEventListener('online', cb)
        window.removeEventListener('offline', cb)
      }
    },
    () => navigator.onLine,
    () => true,
  )
}`}
            </pre>
          </section>

          <section className="card">
            <h2>📋 useId, useDeferredValue, useTransition</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Hook</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Что делает</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Когда нужен</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { hook: 'useId', what: 'Генерирует stable unique ID (SSR-safe)', when: 'htmlFor/id связки, aria-describedby' },
                  { hook: 'useDeferredValue', what: 'Откладывает не-urgent обновление (debounce без таймера)', when: 'Тяжёлый рендеринг списка при поиске' },
                  { hook: 'useTransition', what: 'Помечает обновление как non-urgent (показывает isPending)', when: 'Переключение табов с тяжёлым контентом' },
                  { hook: 'useLayoutEffect', what: 'Запускается sync после DOM mutation, до paint', when: 'Измерение DOM, tooltips, focus management' },
                  { hook: 'useDebugValue', what: 'Показывает label в React DevTools', when: 'Custom hooks (для отладки)' },
                  { hook: 'useInsertionEffect', what: 'Запускается до DOM mutations', when: 'CSS-in-JS библиотеки (styled-components)' },
                ].map(r => (
                  <tr key={r.hook} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8, fontFamily: 'monospace', fontWeight: 600 }}>{r.hook}</td>
                    <td style={{ padding: 8 }}>{r.what}</td>
                    <td style={{ padding: 8, color: 'var(--text-secondary)' }}>{r.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      {tab === 'portals' && (
        <>
          <section className="card">
            <h2>🚪 Portals — рендеринг вне DOM-дерева</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`import { createPortal } from 'react-dom'

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body // рендерим в body, не в текущий DOM-узел
  )
}

// В DOM: элемент рендерится в body
// В React: events bubble через React tree (не DOM tree!)
// → onClose сработает при click на overlay`}
            </pre>
            <div className="info-box" style={{ marginTop: 12 }}>
              <strong>💡 Portal vs DOM:</strong> Portal рендерит DOM-узлы вне родительского контейнера,
              но React events всё равно bubbl-ят через React component tree.
              Context тоже работает через Portal.
            </div>
          </section>

          <section className="card">
            <h2>🏗️ Overlay Architecture</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`// Общий паттерн для модалок, tooltips, dropdowns
function Overlay({ anchor, children, onClose }) {
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const overlayRef = useRef(null)

  // Позиционирование относительно anchor
  useLayoutEffect(() => {
    if (!anchor) return
    const rect = anchor.getBoundingClientRect()
    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    })
  }, [anchor])

  // Закрытие по Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Закрытие по click outside
  useEffect(() => {
    const handler = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return createPortal(
    <div ref={overlayRef} style={{
      position: 'absolute', ...position, zIndex: 1000,
    }}>
      {children}
    </div>,
    document.body,
  )
}`}
            </pre>
          </section>

          <section className="card">
            <h2>♿ Focus Management</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`function FocusTrap({ children }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Запоминаем фокус до открытия
    previousFocus.current = document.activeElement as HTMLElement

    // Фокус на первый focusable элемент
    const focusable = containerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable?.length) (focusable[0] as HTMLElement).focus()

    // Восстанавливаем фокус при закрытии
    return () => previousFocus.current?.focus()
  }, [])

  // Tab trap: Tab на последнем → первый, Shift+Tab на первом → последний
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return
    const focusable = containerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (!focusable?.length) return
    const first = focusable[0] as HTMLElement
    const last = focusable[focusable.length - 1] as HTMLElement

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus()
    }
  }

  return (
    <div ref={containerRef} onKeyDown={handleKeyDown}
         role="dialog" aria-modal="true">
      {children}
    </div>
  )
}

// Использование:
<Modal isOpen={open}>
  <FocusTrap>
    <h2>Confirm</h2>
    <button onClick={onConfirm}>Yes</button>
    <button onClick={onClose}>No</button>
  </FocusTrap>
</Modal>`}
            </pre>
          </section>

          <section className="card">
            <h2>📋 Типы overlays</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Тип</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Portal?</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Focus Trap?</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Overlay?</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Escape?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'Modal Dialog', portal: '✅', trap: '✅', overlay: '✅', esc: '✅' },
                  { type: 'Dropdown Menu', portal: '✅', trap: '❌', overlay: '❌', esc: '✅' },
                  { type: 'Tooltip', portal: '✅', trap: '❌', overlay: '❌', esc: '❌' },
                  { type: 'Toast/Snackbar', portal: '✅', trap: '❌', overlay: '❌', esc: '❌' },
                  { type: 'Drawer/Sheet', portal: '✅', trap: '✅', overlay: '✅', esc: '✅' },
                  { type: 'Popover', portal: '✅', trap: '❌', overlay: '❌', esc: '✅' },
                ].map(r => (
                  <tr key={r.type} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8, fontWeight: 600 }}>{r.type}</td>
                    <td style={{ padding: 8 }}>{r.portal}</td>
                    <td style={{ padding: 8 }}>{r.trap}</td>
                    <td style={{ padding: 8 }}>{r.overlay}</td>
                    <td style={{ padding: 8 }}>{r.esc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      {tab === 'decision' && (
        <>
          <section className="card">
            <h2>🗺️ Когда что использовать</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
              {[
                { hook: 'useReducer', when: 'Сложный state (3+ полей), state machine, testable логика', not: 'Простой toggle, одно значение' },
                { hook: 'useImperativeHandle', when: 'Expose кастомный API через ref (focus, scroll, play)', not: 'Если можно решить через props' },
                { hook: 'useSyncExternalStore', when: 'Подписка на внешний store (window, DB, WebSocket)', not: 'React state — для этого useState/useReducer' },
                { hook: 'Portal', when: 'Modal, dropdown, tooltip, toast — z-index и overflow', not: 'Контент внутри обычного flow' },
                { hook: 'Focus Trap', when: 'Modal, drawer — a11y требует trap фокуса', not: 'Tooltips, toasts, dropdowns' },
                { hook: 'useTransition', when: 'Тяжёлый ре-рендер при UI-переключении (tabs, filters)', not: 'Простые переключения без jank' },
              ].map(c => (
                <div key={c.hook} style={{ padding: 12, borderRadius: 8, border: '1px solid var(--border)' }}>
                  <strong style={{ fontSize: '1rem' }}>{c.hook}</strong>
                  <div style={{ marginTop: 6, color: '#34C759', fontSize: '0.9rem' }}>✅ {c.when}</div>
                  <div style={{ marginTop: 2, color: '#FF3B30', fontSize: '0.9rem' }}>❌ {c.not}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>⚠️ Anti-patterns</h2>
            {[
              { mistake: 'useReducer для простого boolean', fix: 'useState(false) — проще и читаемее' },
              { mistake: 'Portal без z-index стратегии', fix: 'Определить z-index layers: base(1) → dropdown(100) → modal(1000) → toast(2000)' },
              { mistake: 'Focus trap без восстановления фокуса', fix: 'Сохранить document.activeElement до открытия, вернуть при закрытии' },
              { mistake: 'useImperativeHandle с десятком методов', fix: 'Ref API должен быть минимальным. Если нужно много — это props задача' },
              { mistake: 'Modal без aria-modal и role="dialog"', fix: 'Всегда добавлять ARIA-атрибуты для screen readers' },
            ].map(p => (
              <div key={p.mistake} style={{ padding: 12, borderRadius: 8, border: '1px solid var(--border)', marginBottom: 8 }}>
                <strong style={{ color: '#FF3B30' }}>❌ {p.mistake}</strong>
                <div style={{ marginTop: 4, color: '#34C759' }}>✅ {p.fix}</div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  )
}
