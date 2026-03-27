import { useState, useRef, memo, useCallback } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function RenderingDemo() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🎨 Рендеринг в React</h1>
        <p>Понимание когда и почему компоненты перерисовываются</p>
        <a 
          href="https://react.dev/learn/render-and-commit" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 Документация React
        </a>
      </div>

      <RenderCausesDemo />
      <ParentChildRenderDemo />
      <MemoOptimizationDemo />
    </div>
  )
}

function RenderCausesDemo() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const renderCount = useRef(0)
  renderCount.current++

  const renderCode = `// ═══════════════════════════════════════════════════════════════
// 🎨 КОГДА КОМПОНЕНТ РЕ-РЕНДЕРИТСЯ?
// ═══════════════════════════════════════════════════════════════

// 1️⃣ Изменился собственный STATE
const [count, setCount] = useState(0);
setCount(1);  // → Ре-рендер!

// 2️⃣ Изменились PROPS (родитель передал новые значения)
<Child name={name} />  // Если name изменился → Child ре-рендерится

// 3️⃣ Изменился CONTEXT, который используется
const theme = useContext(ThemeContext);  // При изменении → ре-рендер

// 4️⃣ Родительский компонент ре-рендерился
// (ДАЖЕ если props не изменились!)
function Parent() {
  const [count, setCount] = useState(0);
  return <Child />;  // Child ре-рендерится при каждом setCount!
}`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🔬 Причины ре-рендера</h3>
        <span className="card-badge">Основы</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">👆</span>
        <div className="info-box-content">
          <div className="info-box-title">Попробуйте!</div>
          <p>Измените count или введите текст — смотрите как меняется счётчик рендеров.</p>
        </div>
      </div>

      <div className="visual-diagram" style={{ marginTop: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-block',
            padding: '30px 50px',
            background: 'var(--bg-code)',
            borderRadius: '16px',
            border: '2px solid var(--accent-blue)'
          }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Количество рендеров
            </div>
            <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>
              {renderCount.current}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginTop: '24px', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>count</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{count}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>text</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>"{text || '...'}"</div>
          </div>
        </div>
      </div>

      <div className="controls" style={{ marginTop: '20px' }}>
        <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>
          count++ (setState)
        </button>
        <input
          className="input"
          placeholder="Введите текст..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '200px' }}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={renderCode} language="tsx" />
      </div>
    </div>
  )
}

// Компонент без memo
function NormalChild({ label }: { label: string }) {
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
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-red)' }}>
        {renderCount.current}
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>рендеров</p>
    </div>
  )
}

// Компонент с memo
const MemoChild = memo(function MemoChild({ label, value }: { label: string; value: number }) {
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
      <p style={{ fontSize: '0.9rem', marginBottom: '8px' }}>{label} (prop: {value})</p>
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-green)' }}>
        {renderCount.current}
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>рендеров</p>
    </div>
  )
})

function ParentChildRenderDemo() {
  const [parentCount, setParentCount] = useState(0)
  const [childProp, setChildProp] = useState(0)

  const parentChildCode = `// ═══════════════════════════════════════════════════════════════
// 👪 КАСКАДНЫЙ РЕ-РЕНДЕР: Parent → Children
// ═══════════════════════════════════════════════════════════════

function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      {/* При setCount → Parent ре-рендерится */}
      {/* → Child тоже ре-рендерится! */}
      <Child />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🛡️ React.memo — защита от каскадного ре-рендера
// ═══════════════════════════════════════════════════════════════

const MemoChild = memo(function MemoChild({ value }) {
  // Ре-рендерится ТОЛЬКО если props изменились
  return <div>{value}</div>;
});`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">👪 Parent → Child рендеринг</h3>
        <span className="card-badge">Каскад</span>
      </div>

      <div className="info-box warning">
        <span className="info-box-icon">⚠️</span>
        <div className="info-box-content">
          <div className="info-box-title">Каскадный ре-рендер</div>
          <p>Когда родитель ре-рендерится, ВСЕ его дети тоже ре-рендерятся по умолчанию!</p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ 
            display: 'inline-block',
            padding: '16px 32px',
            background: 'var(--bg-code)',
            borderRadius: '12px',
            border: '2px solid var(--accent-blue)'
          }}>
            <span style={{ fontWeight: 'bold' }}>Parent</span>
            <span style={{ marginLeft: '12px', color: 'var(--text-muted)' }}>count: {parentCount}</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ color: 'var(--text-muted)' }}>↓</span>
          <span style={{ color: 'var(--text-muted)' }}>↓</span>
        </div>

        <div className="comparison-grid">
          <div>
            <div style={{ textAlign: 'center', marginBottom: '8px', color: 'var(--accent-red)', fontWeight: 'bold' }}>
              ❌ Без memo
            </div>
            <NormalChild label="Normal Child" />
          </div>
          <div>
            <div style={{ textAlign: 'center', marginBottom: '8px', color: 'var(--accent-green)', fontWeight: 'bold' }}>
              ✅ С memo
            </div>
            <MemoChild label="Memo Child" value={childProp} />
          </div>
        </div>
      </div>

      <div className="controls" style={{ marginTop: '20px' }}>
        <button className="btn btn-danger" onClick={() => setParentCount(c => c + 1)}>
          🔴 Parent state++ (все дети без memo)
        </button>
        <button className="btn btn-success" onClick={() => setChildProp(p => p + 1)}>
          🟢 Child prop++ (только memo)
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={parentChildCode} language="tsx" />
      </div>
    </div>
  )
}

// Memo компонент для демонстрации с callback
const MemoWithCallback = memo(function MemoWithCallback({ 
  onClick, 
  label 
}: { 
  onClick: () => void
  label: string 
}) {
  const renderCount = useRef(0)
  renderCount.current++
  
  return (
    <div style={{ 
      padding: '20px', 
      background: 'var(--bg-code)', 
      borderRadius: '12px', 
      textAlign: 'center' 
    }}>
      <p style={{ fontSize: '0.9rem', marginBottom: '8px' }}>{label}</p>
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-purple)' }}>
        {renderCount.current}
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>рендеров</p>
      <button className="btn btn-secondary btn-sm" onClick={onClick}>Click</button>
    </div>
  )
})

function MemoOptimizationDemo() {
  const [count, setCount] = useState(0)

  // ❌ Новая функция каждый рендер
  const handleClickNormal = () => console.log('click')
  
  // ✅ Стабильная функция
  const handleClickMemo = useCallback(() => console.log('click'), [])

  const memoCode = `// ═══════════════════════════════════════════════════════════════
// 🛡️ memo + useCallback = полная защита
// ═══════════════════════════════════════════════════════════════

// ❌ memo НЕ работает если передаём новую функцию каждый рендер
const Parent = () => {
  const handleClick = () => {};  // Новая функция!
  return <MemoChild onClick={handleClick} />;  // Ре-рендерится!
};

// ✅ memo + useCallback = работает
const Parent = () => {
  const handleClick = useCallback(() => {}, []);
  return <MemoChild onClick={handleClick} />;  // НЕ ре-рендерится!
};`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🛡️ memo + useCallback</h3>
        <span className="card-badge">Оптимизация</span>
      </div>

      <div className="info-box success">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">Важно!</div>
          <p>React.memo проверяет props по ссылке. Если передаёте функции — используйте useCallback!</p>
        </div>
      </div>

      <p style={{ marginTop: '16px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
        Parent count: <strong>{count}</strong>
      </p>

      <div className="comparison-grid">
        <div className="comparison-card" style={{ borderColor: 'var(--accent-red)' }}>
          <div className="comparison-header" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
            ❌ memo + обычная fn()
          </div>
          <div className="comparison-body">
            <MemoWithCallback onClick={handleClickNormal} label="Без useCallback" />
          </div>
        </div>

        <div className="comparison-card" style={{ borderColor: 'var(--accent-green)' }}>
          <div className="comparison-header" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
            ✅ memo + useCallback
          </div>
          <div className="comparison-body">
            <MemoWithCallback onClick={handleClickMemo} label="С useCallback" />
          </div>
        </div>
      </div>

      <div className="controls" style={{ marginTop: '20px' }}>
        <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>
          Parent count++
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={memoCode} language="tsx" />
      </div>
    </div>
  )
}
