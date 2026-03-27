import { useState, useContext, createContext, useRef, memo, useMemo } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function UseContextDemo() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🌐 useContext</h1>
        <p>Передача данных через дерево компонентов без props drilling</p>
        <a 
          href="https://react.dev/reference/react/useContext" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 Документация React
        </a>
      </div>

      <PropDrillingProblem />
      <ContextSolution />
      <ContextRerenderDemo />
    </div>
  )
}

function PropDrillingProblem() {
  const drillingCode = `// ═══════════════════════════════════════════════════════════════
// 😫 ПРОБЛЕМА: Props Drilling
// ═══════════════════════════════════════════════════════════════

// Нужно передать user вглубь на 4 уровня...
function App() {
  const [user, setUser] = useState({ name: 'John' });
  return <Layout user={user} />;           // 1️⃣ Передаём
}

function Layout({ user }) {
  return <Sidebar user={user} />;          // 2️⃣ Прокидываем
}

function Sidebar({ user }) {
  return <UserPanel user={user} />;        // 3️⃣ Снова прокидываем
}

function UserPanel({ user }) {
  return <span>Hello, {user.name}</span>;  // 4️⃣ Наконец используем!
}

// 😫 Каждый промежуточный компонент должен знать о user
// 😫 Сложно рефакторить — менять везде
// 😫 Компоненты становятся менее переиспользуемыми`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">😫 Проблема: Props Drilling</h3>
        <span className="card-badge">Мотивация</span>
      </div>

      <div className="info-box warning">
        <span className="info-box-icon">📦</span>
        <div className="info-box-content">
          <div className="info-box-title">Props Drilling</div>
          <p>Когда нужно передать данные через много уровней компонентов, которые сами эти данные не используют.</p>
        </div>
      </div>

      <div className="visual-diagram" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div className="diagram-box component">App <span style={{ color: 'var(--accent-blue)' }}>user={'{...}'}</span></div>
          <div style={{ color: 'var(--text-muted)' }}>↓ props</div>
          <div className="diagram-box component">Layout <span style={{ color: 'var(--accent-blue)' }}>user={'{...}'}</span></div>
          <div style={{ color: 'var(--text-muted)' }}>↓ props</div>
          <div className="diagram-box component">Sidebar <span style={{ color: 'var(--accent-blue)' }}>user={'{...}'}</span></div>
          <div style={{ color: 'var(--text-muted)' }}>↓ props</div>
          <div className="diagram-box effect">UserPanel <span style={{ color: 'var(--accent-green)' }}>использует!</span></div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={drillingCode} language="tsx" />
      </div>
    </div>
  )
}

// Создаём контекст для демонстрации
const UserContext = createContext({ name: 'Guest', role: 'user' })

function ContextSolution() {
  const [user, setUser] = useState({ name: 'John', role: 'admin' })

  const contextCode = `// ═══════════════════════════════════════════════════════════════
// ✅ РЕШЕНИЕ: Context API
// ═══════════════════════════════════════════════════════════════

// 1️⃣ Создаём контекст
const UserContext = createContext({ name: 'Guest' });

// 2️⃣ Оборачиваем в Provider
function App() {
  const [user, setUser] = useState({ name: 'John' });
  
  return (
    <UserContext.Provider value={user}>
      <Layout />  {/* Не передаём props! */}
    </UserContext.Provider>
  );
}

// 3️⃣ Используем где нужно
function UserPanel() {
  const user = useContext(UserContext);  // Получаем напрямую!
  return <span>Hello, {user.name}</span>;
}

// ✅ Промежуточные компоненты ничего не знают о user
// ✅ Легко рефакторить
// ✅ Компоненты остаются чистыми`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">✅ Решение: useContext</h3>
        <span className="card-badge">Практика</span>
      </div>

      <div className="info-box success">
        <span className="info-box-icon">🎯</span>
        <div className="info-box-content">
          <div className="info-box-title">Context API</div>
          <p>Данные "телепортируются" к компонентам которым они нужны, минуя промежуточные.</p>
        </div>
      </div>

      <UserContext.Provider value={user}>
        <div className="visual-diagram" style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div className="diagram-box effect" style={{ padding: '16px 24px' }}>
              Provider <span style={{ color: 'var(--accent-green)' }}>value={`{name: "${user.name}"}`}</span>
            </div>
            <div style={{ display: 'flex', gap: '40px', marginTop: '12px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>↓ context</div>
                <ConsumerDisplay />
              </div>
            </div>
          </div>
        </div>

        <div className="controls" style={{ marginTop: '20px' }}>
          <button className="btn btn-primary" onClick={() => setUser({ ...user, name: 'Alice' })}>
            Сменить на Alice
          </button>
          <button className="btn btn-secondary" onClick={() => setUser({ ...user, name: 'Bob' })}>
            Сменить на Bob
          </button>
          <button className="btn btn-secondary" onClick={() => setUser({ ...user, name: 'John' })}>
            Вернуть John
          </button>
        </div>
      </UserContext.Provider>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={contextCode} language="tsx" />
      </div>
    </div>
  )
}

function ConsumerDisplay() {
  const user = useContext(UserContext)
  
  return (
    <div className="diagram-box state" style={{ padding: '16px 24px' }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>useContext</div>
      <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>👤 {user.name}</div>
    </div>
  )
}

// Для демонстрации ре-рендеров
const CountContext = createContext(0)

// Компонент С useContext
const WithContext = memo(function WithContext({ label }: { label: string }) {
  const count = useContext(CountContext)
  const renderCount = useRef(0)
  renderCount.current++
  
  return (
    <div style={{ 
      padding: '20px', 
      background: 'var(--bg-code)', 
      borderRadius: '12px', 
      textAlign: 'center',
      border: '2px solid var(--accent-red)'
    }}>
      <p style={{ fontSize: '0.9rem', marginBottom: '8px' }}>{label}</p>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
        context count: {count}
      </div>
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-red)' }}>
        {renderCount.current}
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>рендеров</p>
    </div>
  )
})

// Компонент БЕЗ useContext
const WithoutContext = memo(function WithoutContext({ label }: { label: string }) {
  const renderCount = useRef(0)
  renderCount.current++
  
  return (
    <div style={{ 
      padding: '20px', 
      background: 'var(--bg-code)', 
      borderRadius: '12px', 
      textAlign: 'center',
      border: '2px solid var(--accent-green)'
    }}>
      <p style={{ fontSize: '0.9rem', marginBottom: '8px' }}>{label}</p>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
        не использую context
      </div>
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-green)' }}>
        {renderCount.current}
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>рендеров</p>
    </div>
  )
})

function ContextRerenderDemo() {
  const [count, setCount] = useState(0)
  const [otherState, setOtherState] = useState(0)

  // Мемоизируем value чтобы не было лишних ре-рендеров от otherState
  const contextValue = useMemo(() => count, [count])

  const rerenderCode = `// ═══════════════════════════════════════════════════════════════
// ⚠️ ВАЖНО: Context и ре-рендеры
// ═══════════════════════════════════════════════════════════════

// Когда value в Provider меняется:
// ВСЕ компоненты с useContext ре-рендерятся!
// Даже если они обёрнуты в React.memo!

<CountContext.Provider value={count}>
  {/* Ре-рендерится при изменении count! */}
  <MemoComponentWithContext />
  
  {/* НЕ ре-рендерится — не использует context */}
  <MemoComponentWithoutContext />
</CountContext.Provider>


// ═══════════════════════════════════════════════════════════════
// 🛡️ КАК ОПТИМИЗИРОВАТЬ?
// ═══════════════════════════════════════════════════════════════

// 1️⃣ Разделяй контексты по частоте изменений
const ThemeContext = createContext(theme);   // Редко
const CountContext = createContext(count);   // Часто

// 2️⃣ Мемоизируй value
const value = useMemo(() => ({ user, theme }), [user, theme]);

// 3️⃣ Используй state management (Zustand, Jotai)`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">⚠️ Context и ре-рендеры</h3>
        <span className="card-badge badge-warning">Важно</span>
      </div>

      <div className="info-box warning">
        <span className="info-box-icon">⚠️</span>
        <div className="info-box-content">
          <div className="info-box-title">memo не защищает от Context!</div>
          <p>Даже <code>React.memo</code> не предотвращает ре-рендер при изменении контекста.</p>
        </div>
      </div>

      <CountContext.Provider value={contextValue}>
        <div className="comparison-grid" style={{ marginTop: '20px' }}>
          <div className="comparison-card" style={{ borderColor: 'var(--accent-red)' }}>
            <div className="comparison-header" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
              ❌ memo + useContext
            </div>
            <div className="comparison-body">
              <WithContext label="Использую context" />
            </div>
          </div>

          <div className="comparison-card" style={{ borderColor: 'var(--accent-green)' }}>
            <div className="comparison-header" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
              ✅ memo без useContext
            </div>
            <div className="comparison-body">
              <WithoutContext label="Не использую context" />
            </div>
          </div>
        </div>

        <div className="controls" style={{ marginTop: '20px' }}>
          <button className="btn btn-danger" onClick={() => setCount(c => c + 1)}>
            🔴 context count++ ({count})
          </button>
          <button className="btn btn-success" onClick={() => setOtherState(s => s + 1)}>
            🟢 otherState++ ({otherState}) — не влияет
          </button>
        </div>
      </CountContext.Provider>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={rerenderCode} language="tsx" />
      </div>
    </div>
  )
}
