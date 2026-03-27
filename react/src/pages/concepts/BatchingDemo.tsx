import { useState, useRef, useTransition, useCallback } from 'react'
import CodeBlock from '../../components/CodeBlock'
import { RenderLog, LogEntry } from '../../components/RenderTracker'

export default function BatchingDemo() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📦 Batching в React</h1>
        <p>Автоматическая группировка обновлений состояния</p>
        <a 
          href="https://react.dev/blog/2022/03/29/react-v18#new-feature-automatic-batching" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 React 18 Automatic Batching
        </a>
      </div>

      <BatchingBasicsDemo />
      <BatchingEvolutionDemo />
      <TransitionDemo />
    </div>
  )
}

function BatchingBasicsDemo() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)
  const [text, setText] = useState('A')
  const renderCount = useRef(0)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const mountTime = useRef(Date.now())

  renderCount.current++

  const addLog = useCallback((message: string) => {
    setLogs(prev => [...prev.slice(-10), { type: 'update', message, timestamp: Date.now() - mountTime.current }])
  }, [])

  const handleBatchedClick = () => {
    addLog('▶️ handleClick начало')
    setCount(c => c + 1)
    addLog('setCount вызван')
    setFlag(f => !f)
    addLog('setFlag вызван')
    setText(t => t === 'A' ? 'B' : 'A')
    addLog('setText вызван')
    addLog('◀️ handleClick конец')
    // React выполнит ОДИН ре-рендер после всех setState!
  }

  const batchingCode = `// ═══════════════════════════════════════════════════════════════
// 📦 ЧТО ТАКОЕ BATCHING?
// ═══════════════════════════════════════════════════════════════
// Batching (группировка) — React собирает все setState в одном 
// обработчике событий и выполняет ОДИН ре-рендер вместо нескольких

function Component() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const [text, setText] = useState('A');

  const handleClick = () => {
    // React 18+: ВСЕ эти setState группируются автоматически!
    setCount(c => c + 1);  // НЕ вызывает ре-рендер сразу
    setFlag(f => !f);       // НЕ вызывает ре-рендер сразу  
    setText('B');           // НЕ вызывает ре-рендер сразу
    
    // React ждёт конца функции, потом:
    // → ОДИН ре-рендер со всеми изменениями
  };
}


// ═══════════════════════════════════════════════════════════════
// 🎯 ЗАЧЕМ ЭТО НУЖНО?
// ═══════════════════════════════════════════════════════════════
// Без batching: 3 setState → 3 ре-рендера → медленно 🐢
// С batching:   3 setState → 1 ре-рендер  → быстро ⚡

// Аналогия: официант записывает ВСЕ заказы, потом идёт на кухню
// А не бегает после каждого блюда!`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Что такое Batching?</h3>
        <span className="card-badge">Основы</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">📦</span>
        <div className="info-box-content">
          <div className="info-box-title">Автоматическая группировка</div>
          <p>React группирует несколько setState в один ре-рендер. 
          Это происходит автоматически в React 18+ везде: в обработчиках, промисах, таймаутах.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div className="visual-diagram">
            <div className="diagram-row">
              <div className="diagram-box state">count: {count}</div>
              <div className="diagram-box state">flag: {flag ? '✓' : '✗'}</div>
              <div className="diagram-box state">text: {text}</div>
              <div className="diagram-box render">renders: {renderCount.current}</div>
            </div>
          </div>

          <div className="controls">
            <button className="btn btn-primary" onClick={handleBatchedClick}>
              3 setState в одном обработчике
            </button>
            <button className="btn btn-secondary" onClick={() => { setLogs([]); renderCount.current = 0 }}>
              Сбросить
            </button>
          </div>

          <div className="info-box success" style={{ marginTop: '16px' }}>
            <span className="info-box-icon">⚡</span>
            <div className="info-box-content">
              <div className="info-box-title">Обратите внимание!</div>
              <p>После нажатия кнопки renderCount увеличивается только на 1, 
              хотя было 3 вызова setState!</p>
            </div>
          </div>
        </div>

        <div style={{ width: '300px' }}>
          <RenderLog logs={logs} />
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <CodeBlock code={batchingCode} language="tsx" />
      </div>
    </div>
  )
}

function BatchingEvolutionDemo() {
  const [count, setCount] = useState(0)
  const renderCount = useRef(0)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const mountTime = useRef(Date.now())

  renderCount.current++

  const addLog = useCallback((message: string) => {
    setLogs(prev => [...prev.slice(-10), { type: 'update', message, timestamp: Date.now() - mountTime.current }])
  }, [])

  // В таймауте
  const handleTimeout = () => {
    addLog('▶️ setTimeout начало')
    setTimeout(() => {
      addLog('⏰ Внутри setTimeout')
      setCount(c => c + 1)
      addLog('setCount #1')
      setCount(c => c + 1)
      addLog('setCount #2')
      addLog('◀️ setTimeout конец')
    }, 100)
  }

  // В промисе
  const handlePromise = () => {
    addLog('▶️ Promise начало')
    Promise.resolve().then(() => {
      addLog('🔄 Внутри .then()')
      setCount(c => c + 1)
      addLog('setCount #1')
      setCount(c => c + 1)
      addLog('setCount #2')
      addLog('◀️ Promise конец')
    })
  }

  // В fetch
  const handleFetch = async () => {
    addLog('▶️ fetch начало')
    await fetch('https://jsonplaceholder.typicode.com/todos/1')
    addLog('📡 После await')
    setCount(c => c + 1)
    addLog('setCount #1')
    setCount(c => c + 1)
    addLog('setCount #2')
    addLog('◀️ fetch конец')
  }

  const evolutionCode = `// ═══════════════════════════════════════════════════════════════
// ⏰ REACT 17 vs REACT 18 BATCHING
// ═══════════════════════════════════════════════════════════════

// React 17: Batching ТОЛЬКО в обработчиках событий React
// React 18: Batching ВЕЗДЕ! 🎉


// ═══════════════════════════════════════════════════════════════
// 📍 React 17 — батчинг НЕ работал в:
// ═══════════════════════════════════════════════════════════════

// ❌ setTimeout
setTimeout(() => {
  setCount(c => c + 1);  // Ре-рендер #1
  setFlag(f => !f);       // Ре-рендер #2  
}, 100);

// ❌ Promise.then
fetch('/api').then(() => {
  setCount(c => c + 1);  // Ре-рендер #1
  setFlag(f => !f);       // Ре-рендер #2
});

// ❌ Native event listeners
element.addEventListener('click', () => {
  setCount(c => c + 1);  // Ре-рендер #1
  setFlag(f => !f);       // Ре-рендер #2
});


// ═══════════════════════════════════════════════════════════════
// ✅ React 18 — батчинг работает ВЕЗДЕ!
// ═══════════════════════════════════════════════════════════════

// ✅ setTimeout — теперь батчится!
setTimeout(() => {
  setCount(c => c + 1);  // ─┐
  setFlag(f => !f);       // ─┼→ ОДИН ре-рендер!
}, 100);

// ✅ Promise.then — теперь батчится!
fetch('/api').then(() => {
  setCount(c => c + 1);  // ─┐
  setFlag(f => !f);       // ─┼→ ОДИН ре-рендер!
});`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Batching в асинхронном коде</h3>
        <span className="card-badge badge-success">React 18</span>
      </div>

      <div className="info-box success">
        <span className="info-box-icon">🚀</span>
        <div className="info-box-content">
          <div className="info-box-title">React 18 Automatic Batching</div>
          <p>В React 18 batching работает ВЕЗДЕ: в setTimeout, Promise, fetch, 
          native event listeners. Это главное улучшение производительности!</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div className="visual-diagram">
            <div className="diagram-row">
              <div className="diagram-box state">count: {count}</div>
              <div className="diagram-box render">renders: {renderCount.current}</div>
            </div>
          </div>

          <div className="controls">
            <button className="btn btn-warning" onClick={handleTimeout}>
              ⏰ setTimeout (2 setState)
            </button>
            <button className="btn btn-info" onClick={handlePromise}>
              🔄 Promise (2 setState)
            </button>
            <button className="btn btn-primary" onClick={handleFetch}>
              📡 fetch (2 setState)
            </button>
            <button className="btn btn-secondary" onClick={() => { setCount(0); setLogs([]); renderCount.current = 0 }}>
              Сбросить
            </button>
          </div>

          <p style={{ marginTop: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            💡 После каждой кнопки count увеличивается на 2, но ре-рендер только 1!
          </p>
        </div>

        <div style={{ width: '300px' }}>
          <RenderLog logs={logs} />
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <CodeBlock code={evolutionCode} language="tsx" />
      </div>
    </div>
  )
}

function TransitionDemo() {
  const [text, setText] = useState('')
  const [items, setItems] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()
  const [logs, setLogs] = useState<LogEntry[]>([])
  const mountTime = useRef(Date.now())
  const renderCount = useRef(0)

  renderCount.current++

  const addLog = useCallback((message: string) => {
    setLogs(prev => [...prev.slice(-8), { type: 'update', message, timestamp: Date.now() - mountTime.current }])
  }, [])

  const handleChange = (value: string) => {
    addLog(`Input: "${value}"`)
    
    // Срочное обновление — input должен реагировать мгновенно
    setText(value)
    addLog('✅ setText (urgent)')
    
    // Несрочное обновление — можно отложить
    startTransition(() => {
      addLog('🔄 startTransition начало')
      const newItems = Array.from({ length: 5000 }, (_, i) => `${value}-${i}`)
      setItems(newItems)
      addLog('📋 setItems (5000 элементов)')
    })
  }

  const transitionCode = `// ═══════════════════════════════════════════════════════════════
// 🔀 useTransition — Приоритеты обновлений
// ═══════════════════════════════════════════════════════════════

import { useTransition } from 'react';

function SearchComponent() {
  const [text, setText] = useState('');         // Срочное
  const [results, setResults] = useState([]);   // Несрочное
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    // 🚨 СРОЧНО: input должен реагировать мгновенно
    setText(value);
    
    // ⏳ МОЖНО ПОДОЖДАТЬ: тяжёлые вычисления/фильтрация
    startTransition(() => {
      // Этот код выполнится с низким приоритетом
      // React может прервать его если придёт срочное обновление
      const filtered = hugeArray.filter(item => 
        item.includes(value)
      );
      setResults(filtered);
    });
  };

  return (
    <div>
      <input value={text} onChange={e => handleChange(e.target.value)} />
      
      {/* Показываем индикатор пока transition выполняется */}
      {isPending && <Spinner />}
      
      <Results items={results} />
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// 🎯 КОГДА ИСПОЛЬЗОВАТЬ useTransition?
// ═══════════════════════════════════════════════════════════════
// • Поиск/фильтрация больших списков
// • Переключение вкладок с тяжёлым контентом
// • Навигация между страницами
// • Любые "тяжёлые" обновления UI`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">useTransition — Приоритеты</h3>
        <span className="card-badge badge-info">React 18</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🔀</span>
        <div className="info-box-content">
          <div className="info-box-title">Разделение приоритетов</div>
          <p>useTransition позволяет пометить обновления как "несрочные". 
          React выполнит срочные обновления сразу, а несрочные — когда будет время.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '16px' }}>
            <input
              className="input"
              placeholder="Введите текст для генерации 5000 элементов..."
              value={text}
              onChange={(e) => handleChange(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div className="visual-diagram">
            <div className="diagram-row">
              <div className="diagram-box state">
                isPending: {isPending ? '⏳ true' : '✅ false'}
              </div>
              <div className="diagram-box effect">
                items: {items.length}
              </div>
              <div className="diagram-box render">
                renders: {renderCount.current}
              </div>
            </div>
          </div>

          {isPending && (
            <div className="info-box warning" style={{ marginTop: '16px' }}>
              <span className="info-box-icon">⏳</span>
              <div className="info-box-content">
                <div className="info-box-title">Transition в процессе...</div>
                <p>Input реагирует мгновенно, а тяжёлое обновление списка выполняется в фоне</p>
              </div>
            </div>
          )}

          <div style={{ marginTop: '16px', maxHeight: '150px', overflow: 'auto', background: 'var(--bg-code)', borderRadius: '8px', padding: '12px' }}>
            {items.length > 0 ? (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Показаны первые 10 из {items.length}: {items.slice(0, 10).join(', ')}...
              </div>
            ) : (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Введите текст чтобы сгенерировать список
              </div>
            )}
          </div>
        </div>

        <div style={{ width: '300px' }}>
          <RenderLog logs={logs} />
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <CodeBlock code={transitionCode} language="tsx" />
      </div>
    </div>
  )
}
