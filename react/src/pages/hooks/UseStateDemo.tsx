import { useState, useRef, useEffect, useCallback } from 'react'
import CodeBlock from '../../components/CodeBlock'
import { RenderLog, LogEntry, HighlightOnRender } from '../../components/RenderTracker'

export default function UseStateDemo() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📦 useState</h1>
        <p>Хук для создания и управления локальным состоянием компонента</p>
        <a 
          href="https://react.dev/reference/react/useState" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 Документация React
        </a>
      </div>

      <WhatIsStateSection />
      <BasicCounterDemo />
      <ObjectStateDemo />
      <FunctionalUpdateDemo />
      <BatchingStateDemo />
    </div>
  )
}

function WhatIsStateSection() {
  const stateCode = `// ═══════════════════════════════════════════════════════════════
// 📦 useState — "память" компонента
// Обычные переменные "забываются" после рендера, state сохраняется
// ═══════════════════════════════════════════════════════════════

// ❌ НЕПРАВИЛЬНО: обычная переменная
function Counter() {
  let count = 0;           // Сбрасывается в 0 при каждом рендере!
  
  return (
    <button onClick={() => count++}>
      {count}              // Всегда показывает 0
    </button>
  );
}


// ✅ ПРАВИЛЬНО: useState
function Counter() {
  // ─────────────────────────────────────────────────────────────
  // useState возвращает массив из 2 элементов:
  // [0] - текущее значение состояния
  // [1] - функция для обновления состояния
  // ─────────────────────────────────────────────────────────────
  const [count, setCount] = useState(0);  // 0 — начальное значение
  
  return (
    <button onClick={() => setCount(count + 1)}>
      {count}              // Работает! React "помнит" значение
    </button>
  );
}


// ═══════════════════════════════════════════════════════════════
// 🔑 ТРИ ВАЖНЫХ ПРАВИЛА STATE
// ═══════════════════════════════════════════════════════════════
// 1️⃣ ИЗОЛИРОВАН — каждый экземпляр компонента имеет свой state
// 2️⃣ ИММУТАБЕЛЕН — нельзя менять напрямую, только через setter
// 3️⃣ ТРИГГЕРИТ РЕНДЕР — изменение state перерисовывает компонент`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Что такое State и зачем он нужен?</h3>
        <span className="card-badge">Теория</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">Ключевое понимание</div>
          <p><strong>State</strong> — это "память" компонента. Обычные переменные "забываются" после каждого рендера, 
          state сохраняется между рендерами.</p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={stateCode} language="tsx" title="📦 useState vs обычные переменные" />
      </div>
    </div>
  )
}

function BasicCounterDemo() {
  const [count, setCount] = useState(0)
  const renderCount = useRef(0)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const mountTime = useRef(Date.now())

  renderCount.current++

  const addLog = useCallback((type: LogEntry['type'], message: string) => {
    setLogs(prev => [...prev, { type, message, timestamp: Date.now() - mountTime.current }])
  }, [])

  useEffect(() => {
    addLog('mount', 'Компонент смонтирован')
    return () => addLog('cleanup', 'Компонент размонтирован')
  }, [addLog])

  useEffect(() => {
    if (renderCount.current > 1) {
      addLog('update', `Ре-рендер #${renderCount.current}, count = ${count}`)
    }
  }, [count, addLog])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Базовый счётчик</h3>
        <span className="card-badge">Основы</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">Что происходит?</div>
          <p>Каждый вызов <code>setCount</code> вызывает ре-рендер компонента. 
          Следите за счётчиком рендеров справа!</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <HighlightOnRender>
            <div className="visual-diagram">
              <div className="value-display large">{count}</div>
              <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>
                Каждое изменение = ре-рендер
              </p>
            </div>
          </HighlightOnRender>

          <div className="controls">
            <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
              ➕ Увеличить
            </button>
            <button className="btn btn-secondary" onClick={() => setCount(count - 1)}>
              ➖ Уменьшить
            </button>
            <button className="btn btn-secondary" onClick={() => { setCount(0); setLogs([]) }}>
              🔄 Сбросить
            </button>
          </div>
        </div>

        <div style={{ width: '300px' }}>
          <RenderLog logs={logs} />
        </div>
      </div>
    </div>
  )
}

function ObjectStateDemo() {
  const [user, setUser] = useState({ name: 'Иван', age: 25 })
  const renderCount = useRef(0)
  renderCount.current++

  const objectCode = `// ═══════════════════════════════════════════════════════════════
// 📦 ОБЪЕКТЫ В STATE — важно понимать иммутабельность!
// ═══════════════════════════════════════════════════════════════

const [user, setUser] = useState({ name: 'Иван', age: 25 });


// ❌ НЕПРАВИЛЬНО: мутация объекта напрямую
user.age = 26;           // React НЕ заметит изменение!
setUser(user);           // Та же ссылка → нет ре-рендера


// ✅ ПРАВИЛЬНО: создаём новый объект (spread operator)
setUser({
  ...user,               // Копируем все свойства
  age: 26                // Перезаписываем нужное
});


// ═══════════════════════════════════════════════════════════════
// 🧠 ПОЧЕМУ ТАК?
// ═══════════════════════════════════════════════════════════════
// React сравнивает state по ССЫЛКЕ (Object.is)
// { name: 'Иван' } === { name: 'Иван' }  // false! Разные объекты
// Поэтому нужно создавать НОВЫЙ объект для триггера ре-рендера`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Объекты в State</h3>
        <span className="card-badge">Иммутабельность</span>
      </div>

      <div className="info-box warning">
        <span className="info-box-icon">⚠️</span>
        <div className="info-box-content">
          <div className="info-box-title">Никогда не мутируй state напрямую!</div>
          <p>React сравнивает объекты по ссылке. Мутация не создаёт новую ссылку → React не видит изменений.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div className="visual-diagram">
            <div className="value-display">
              👤 {user.name}, {user.age} лет
            </div>
            <p style={{ marginTop: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Рендеров: {renderCount.current}
            </p>
          </div>

          <div className="controls">
            <button className="btn btn-primary" onClick={() => setUser({ ...user, age: user.age + 1 })}>
              🎂 +1 год (правильно)
            </button>
            <button className="btn btn-danger" onClick={() => { user.age++; setUser(user) }}>
              ❌ Мутация (неправильно)
            </button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <CodeBlock code={objectCode} language="tsx" />
        </div>
      </div>
    </div>
  )
}

function FunctionalUpdateDemo() {
  const [count, setCount] = useState(0)

  const functionalCode = `// ═══════════════════════════════════════════════════════════════
// 🔄 ФУНКЦИОНАЛЬНОЕ ОБНОВЛЕНИЕ
// Когда новое значение зависит от предыдущего
// ═══════════════════════════════════════════════════════════════

// ❌ ПРОБЛЕМА: count "замкнулся" в момент создания функции
const handleClick = () => {
  setCount(count + 1);  // count = 0
  setCount(count + 1);  // count всё ещё 0!
  setCount(count + 1);  // count всё ещё 0!
  // Результат: count = 1 (а не 3!)
};


// ✅ РЕШЕНИЕ: функциональное обновление
const handleClick = () => {
  setCount(c => c + 1);  // c = 0 → 1
  setCount(c => c + 1);  // c = 1 → 2
  setCount(c => c + 1);  // c = 2 → 3
  // Результат: count = 3 ✓
};


// ═══════════════════════════════════════════════════════════════
// 🧠 КОГДА ИСПОЛЬЗОВАТЬ?
// ═══════════════════════════════════════════════════════════════
// • Несколько обновлений подряд
// • В useCallback с пустыми зависимостями
// • В setTimeout/setInterval
// • Когда важно иметь актуальное предыдущее значение`

  const addThreeNormal = () => {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  const addThreeFunctional = () => {
    setCount(c => c + 1)
    setCount(c => c + 1)
    setCount(c => c + 1)
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Функциональное обновление</h3>
        <span className="card-badge">Важно!</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🎯</span>
        <div className="info-box-content">
          <div className="info-box-title">Когда использовать c =&gt; c + 1?</div>
          <p>Когда новое значение зависит от предыдущего, особенно при нескольких обновлениях подряд.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div className="value-display large" style={{ marginBottom: '16px' }}>{count}</div>

          <div className="comparison-grid">
            <div className="comparison-card" style={{ borderColor: 'var(--accent-red)' }}>
              <div className="comparison-header" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                ❌ Обычное обновление
              </div>
              <div className="comparison-body">
                <button className="btn btn-danger" onClick={addThreeNormal} style={{ width: '100%' }}>
                  +3 (но будет +1)
                </button>
                <code style={{ display: 'block', marginTop: '8px', fontSize: '0.8rem' }}>setCount(count + 1) ×3</code>
              </div>
            </div>

            <div className="comparison-card" style={{ borderColor: 'var(--accent-green)' }}>
              <div className="comparison-header" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
                ✅ Функциональное
              </div>
              <div className="comparison-body">
                <button className="btn btn-success" onClick={addThreeFunctional} style={{ width: '100%' }}>
                  +3 (правильно!)
                </button>
                <code style={{ display: 'block', marginTop: '8px', fontSize: '0.8rem' }}>setCount(c =&gt; c + 1) ×3</code>
              </div>
            </div>
          </div>

          <button className="btn btn-secondary" onClick={() => setCount(0)} style={{ marginTop: '12px' }}>
            🔄 Сбросить
          </button>
        </div>

        <div style={{ flex: 1 }}>
          <CodeBlock code={functionalCode} language="tsx" />
        </div>
      </div>
    </div>
  )
}

function BatchingStateDemo() {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const renderCount = useRef(0)
  renderCount.current++

  const batchingCode = `// ═══════════════════════════════════════════════════════════════
// 📦 BATCHING — React группирует обновления
// Несколько setState = один ре-рендер (React 18+)
// ═══════════════════════════════════════════════════════════════

const handleClick = () => {
  setCount1(c => c + 1);  // Не вызывает рендер сразу
  setCount2(c => c + 1);  // Не вызывает рендер сразу
  setName('новое имя');   // Не вызывает рендер сразу
  // React batches все обновления → ОДИН рендер в конце!
};


// ═══════════════════════════════════════════════════════════════
// 🚀 REACT 18+: Automatic Batching везде
// ═══════════════════════════════════════════════════════════════

// В setTimeout — batched!
setTimeout(() => {
  setCount1(c => c + 1);
  setCount2(c => c + 1);  // Один рендер
}, 1000);

// В Promise — batched!
fetch('/api').then(() => {
  setCount1(c => c + 1);
  setCount2(c => c + 1);  // Один рендер
});

// В event listener — batched!
element.addEventListener('click', () => {
  setCount1(c => c + 1);
  setCount2(c => c + 1);  // Один рендер
});`

  const updateBoth = () => {
    setCount1(c => c + 1)
    setCount2(c => c + 1)
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Batching (группировка обновлений)</h3>
        <span className="card-badge">React 18+</span>
      </div>

      <div className="info-box success">
        <span className="info-box-icon">🚀</span>
        <div className="info-box-content">
          <div className="info-box-title">Automatic Batching</div>
          <p>React 18+ автоматически группирует несколько setState в один ре-рендер — везде, не только в event handlers!</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div className="visual-diagram">
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
              <div className="diagram-box state">count1: {count1}</div>
              <div className="diagram-box state">count2: {count2}</div>
            </div>
            <p style={{ textAlign: 'center', marginTop: '16px', color: 'var(--text-secondary)' }}>
              Рендеров: <strong>{renderCount.current}</strong>
            </p>
          </div>

          <div className="controls">
            <button className="btn btn-primary" onClick={updateBoth}>
              +1 к обоим (2 setState, 1 рендер)
            </button>
            <button className="btn btn-secondary" onClick={() => { setCount1(0); setCount2(0) }}>
              🔄 Сбросить
            </button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <CodeBlock code={batchingCode} language="tsx" />
        </div>
      </div>
    </div>
  )
}
