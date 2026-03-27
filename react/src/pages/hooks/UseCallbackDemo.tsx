import { useState, useCallback, useRef, memo } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function UseCallbackDemo() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔄 useCallback</h1>
        <p>Мемоизация функций для предотвращения лишних ре-рендеров</p>
        <a 
          href="https://react.dev/reference/react/useCallback" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 Документация React
        </a>
      </div>

      <WhatIsCallbackSection />
      <CallbackVsNoCallbackDemo />
      <CallbackWithDepsDemo />
    </div>
  )
}

function WhatIsCallbackSection() {
  const basicCode = `// ═══════════════════════════════════════════════════════════════
// 🔄 useCallback — мемоизация функций
// ═══════════════════════════════════════════════════════════════

// Без useCallback — новая функция каждый рендер
const handleClick = () => {
  console.log('clicked');
};

// С useCallback — та же функция пока deps не изменились
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);  // Пустые deps = создаётся 1 раз


// ═══════════════════════════════════════════════════════════════
// 🎯 КОГДА ИСПОЛЬЗОВАТЬ?
// ═══════════════════════════════════════════════════════════════
// 1. Передаёшь функцию в memo-компонент
// 2. Функция в зависимостях useEffect
// 3. Функция передаётся в контекст`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Что такое useCallback?</h3>
        <span className="card-badge">Теория</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🔄</span>
        <div className="info-box-content">
          <div className="info-box-title">Зачем нужен?</div>
          <p>Каждый рендер создаёт новые функции. useCallback "запоминает" функцию 
          и возвращает ту же ссылку, пока зависимости не изменились.</p>
        </div>
      </div>

      <CodeBlock code={basicCode} language="tsx" />
    </div>
  )
}

// =====================================================
// Компонент для отслеживания рендеров БЕЗ callback в родителя
// =====================================================
const ChildWithRenderCount = memo(function ChildWithRenderCount({ 
  onClick, 
  label,
  variant = 'default'
}: { 
  onClick: () => void
  label: string
  variant?: 'default' | 'success' | 'danger'
}) {
  const renderCount = useRef(0)
  renderCount.current++
  
  const borderColor = variant === 'success' ? 'var(--accent-green)' : 
                      variant === 'danger' ? 'var(--accent-red)' : 'var(--border)'
  
  return (
    <div style={{ 
      padding: '16px', 
      background: 'var(--bg-code)', 
      borderRadius: '8px', 
      textAlign: 'center',
      border: `2px solid ${borderColor}`
    }}>
      <p style={{ marginBottom: '8px', fontSize: '0.9rem', fontWeight: 500 }}>{label}</p>
      <div style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        color: borderColor,
        marginBottom: '8px'
      }}>
        {renderCount.current}
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
        рендеров
      </p>
      <button className="btn btn-secondary btn-sm" onClick={onClick}>Click me</button>
    </div>
  )
})

function CallbackVsNoCallbackDemo() {
  const [count, setCount] = useState(0)

  // ❌ Новая функция каждый рендер — memo ребёнка НЕ работает
  const handleClickNormal = () => { console.log('clicked') }

  // ✅ Стабильная функция — memo ребёнка работает
  const handleClickMemoized = useCallback(() => { console.log('clicked') }, [])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🔬 Сравнение: с useCallback и без</h3>
        <span className="card-badge">Практика</span>
      </div>

      <div className="info-box warning">
        <span className="info-box-icon">👆</span>
        <div className="info-box-content">
          <div className="info-box-title">Нажмите кнопку "Ре-рендер родителя"</div>
          <p>Оба компонента обёрнуты в <code>React.memo</code>. Смотрите на счётчик рендеров!</p>
        </div>
      </div>

      <div className="comparison-grid" style={{ marginTop: '20px' }}>
        <div className="comparison-card" style={{ borderColor: 'var(--accent-red)' }}>
          <div className="comparison-header" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
            ❌ Без useCallback
          </div>
          <div className="comparison-body">
            <ChildWithRenderCount 
              onClick={handleClickNormal} 
              label="memo + обычная fn()" 
              variant="danger"
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center' }}>
              Ре-рендерится каждый раз!
            </p>
          </div>
        </div>

        <div className="comparison-card" style={{ borderColor: 'var(--accent-green)' }}>
          <div className="comparison-header" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
            ✅ С useCallback
          </div>
          <div className="comparison-body">
            <ChildWithRenderCount 
              onClick={handleClickMemoized} 
              label="memo + useCallback" 
              variant="success"
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center' }}>
              Рендер только 1 раз!
            </p>
          </div>
        </div>
      </div>

      <div className="controls" style={{ marginTop: '20px' }}>
        <button className="btn btn-primary btn-lg" onClick={() => setCount(c => c + 1)}>
          🔄 Ре-рендер родителя (count: {count})
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={`// Родительский компонент
function Parent() {
  const [count, setCount] = useState(0);
  
  // ❌ Каждый рендер = новая функция = Child ре-рендерится
  const handleClickNormal = () => console.log('clicked');
  
  // ✅ Стабильная ссылка = Child НЕ ре-рендерится
  const handleClickMemoized = useCallback(() => {
    console.log('clicked');
  }, []);
  
  return (
    <>
      <MemoChild onClick={handleClickNormal} />   {/* Ре-рендерится! */}
      <MemoChild onClick={handleClickMemoized} /> {/* НЕ ре-рендерится */}
    </>
  );
}`} language="tsx" />
      </div>
    </div>
  )
}

function CallbackWithDepsDemo() {
  const [userId, setUserId] = useState(1)
  const [otherState, setOtherState] = useState(0)
  const prevCallbackRef = useRef<Function | null>(null)
  const [callbackChanged, setCallbackChanged] = useState(false)

  // Callback с зависимостью — пересоздаётся при изменении userId
  const fetchUser = useCallback(() => {
    console.log(`Fetching user ${userId}`)
    return userId
  }, [userId])

  // Проверяем изменилась ли ссылка
  if (prevCallbackRef.current !== fetchUser) {
    if (prevCallbackRef.current !== null) {
      setCallbackChanged(true)
      setTimeout(() => setCallbackChanged(false), 500)
    }
    prevCallbackRef.current = fetchUser
  }

  const depsCode = `// ═══════════════════════════════════════════════════════════════
// 📋 ЗАВИСИМОСТИ useCallback
// ═══════════════════════════════════════════════════════════════

// Функция пересоздаётся когда меняются зависимости!

const fetchUser = useCallback(() => {
  console.log(\`Fetching user \${userId}\`);
  return userId;
}, [userId]);  // ← При изменении userId функция пересоздаётся


// ═══════════════════════════════════════════════════════════════
// 🎯 ПРАВИЛА ЗАВИСИМОСТЕЙ
// ═══════════════════════════════════════════════════════════════

// [] — создаётся 1 раз при mount
const handleClick = useCallback(() => {}, []);

// [dep] — пересоздаётся при изменении dep
const handleClick = useCallback(() => {
  doSomething(dep);
}, [dep]);

// ESLint подскажет если забыл зависимость!`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">📋 Зависимости useCallback</h3>
        <span className="card-badge">Важно</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">📋</span>
        <div className="info-box-content">
          <div className="info-box-title">Когда функция пересоздаётся?</div>
          <p>Когда любая переменная из массива зависимостей изменилась.</p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div className="visual-diagram">
          <div style={{ textAlign: 'center' }}>
            <code style={{ fontSize: '1.1rem' }}>
              useCallback(fn, [<span style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}>userId</span>])
            </code>
            
            <div style={{ 
              marginTop: '20px',
              padding: '20px',
              background: callbackChanged ? 'rgba(239, 68, 68, 0.2)' : 'var(--bg-code)',
              borderRadius: '12px',
              transition: 'background 0.3s'
            }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-muted)' }}>userId = </span>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>{userId}</span>
              </div>
              <div style={{ fontSize: '0.9rem', color: callbackChanged ? 'var(--accent-red)' : 'var(--text-muted)' }}>
                {callbackChanged ? '🔄 Функция ПЕРЕСОЗДАНА!' : '✓ Функция стабильна'}
              </div>
            </div>
          </div>
        </div>

        <div className="controls" style={{ marginTop: '20px' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => setUserId(id => id + 1)}
          >
            userId++ (пересоздаёт callback)
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => setOtherState(s => s + 1)}
          >
            otherState++ ({otherState}) — НЕ пересоздаёт
          </button>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={depsCode} language="tsx" />
      </div>
    </div>
  )
}
