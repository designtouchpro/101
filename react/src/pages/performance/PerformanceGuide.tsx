import { useState, useMemo, useCallback, memo, useRef, Profiler } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function PerformanceGuide() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>⚡ Performance & Оптимизация</h1>
        <p>React.memo, useMemo, useCallback, виртуализация, профилирование</p>
        <a 
          href="https://react.dev/learn/render-and-commit" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 React Performance Docs
        </a>
      </div>

      <PerformanceOverview />
      <ReactMemoDemo />
      <UseMemoCallbackDemo />
      <VirtualizationSection />
      <ProfilerDemo />
      <CodeSplittingSection />
      <BundleOptimization />
      <InterviewQuestions />
    </div>
  )
}

function PerformanceOverview() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Когда оптимизировать?</h3>
        <span className="card-badge">Теория</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">⚠️</span>
        <div className="info-box-content">
          <div className="info-box-title">Преждевременная оптимизация — зло!</div>
          <p>Не оптимизируй пока нет реальных проблем. React уже очень быстрый. 
          Сначала измерь, потом оптимизируй.</p>
        </div>
      </div>

      <div className="visual-diagram" style={{ marginTop: '16px' }}>
        <h4 style={{ marginBottom: '12px' }}>🔍 Когда стоит оптимизировать:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '16px', borderRadius: '8px', border: '1px solid var(--accent-red)' }}>
            <strong style={{ color: 'var(--accent-red)' }}>🐌 Лаги при вводе</strong>
            <p style={{ fontSize: '0.85rem', marginTop: '8px', color: 'var(--text-secondary)' }}>
              Input тормозит, текст появляется с задержкой
            </p>
          </div>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '16px', borderRadius: '8px', border: '1px solid var(--accent-red)' }}>
            <strong style={{ color: 'var(--accent-red)' }}>📜 Длинные списки</strong>
            <p style={{ fontSize: '0.85rem', marginTop: '8px', color: 'var(--text-secondary)' }}>
              Scroll лагает при 1000+ элементов
            </p>
          </div>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '16px', borderRadius: '8px', border: '1px solid var(--accent-red)' }}>
            <strong style={{ color: 'var(--accent-red)' }}>📊 Сложные вычисления</strong>
            <p style={{ fontSize: '0.85rem', marginTop: '8px', color: 'var(--text-secondary)' }}>
              Фильтрация, сортировка больших данных
            </p>
          </div>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '16px', borderRadius: '8px', border: '1px solid var(--accent-red)' }}>
            <strong style={{ color: 'var(--accent-red)' }}>🎨 Частые ре-рендеры</strong>
            <p style={{ fontSize: '0.85rem', marginTop: '8px', color: 'var(--text-secondary)' }}>
              Компонент рендерится без изменений
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// === REACT.MEMO DEMO ===
function ReactMemoDemo() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('React')

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">React.memo — мемоизация компонентов</h3>
        <span className="card-badge">Практика</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <p><code>React.memo</code> пропускает ре-рендер если props не изменились (shallow compare).</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '16px' }}>
        <div style={{ flex: '1 1 300px' }}>
          <div className="visual-diagram">
            <h4>Родительский компонент</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>count: {count}, name: {name}</p>
            
            <div className="controls" style={{ marginBottom: '16px' }}>
              <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>
                count++ ({count})
              </button>
              <button className="btn btn-secondary" onClick={() => setName(n => n === 'React' ? 'Vue' : 'React')}>
                Toggle name
              </button>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ padding: '12px', border: '2px solid var(--accent-red)', borderRadius: '8px' }}>
                <NormalChild name={name} />
              </div>
              <div style={{ padding: '12px', border: '2px solid var(--accent-green)', borderRadius: '8px' }}>
                <MemoizedChild name={name} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <CodeBlock 
            code={`// ❌ Без memo — рендерится при ЛЮБОМ изменении родителя
function NormalChild({ name }) {
  console.log('NormalChild render');
  return <div>Hello {name}</div>;
}

// ✅ С memo — рендерится ТОЛЬКО при изменении name
const MemoizedChild = memo(function MemoizedChild({ name }) {
  console.log('MemoizedChild render');
  return <div>Hello {name}</div>;
});

// Родитель
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');
  
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>
        count++ (это НЕ меняет name!)
      </button>
      
      {/* NormalChild рендерится при каждом клике */}
      <NormalChild name={name} />
      
      {/* MemoizedChild НЕ рендерится при клике на count */}
      <MemoizedChild name={name} />
    </>
  );
}`} 
            language="tsx" 
          />
        </div>
      </div>
    </div>
  )
}

function NormalChild({ name }: { name: string }) {
  const renderCount = useRef(0)
  renderCount.current++

  return (
    <div>
      <span style={{ color: 'var(--accent-red)' }}>❌ Без memo</span>
      <p>Hello {name}</p>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Renders: {renderCount.current}</p>
    </div>
  )
}

const MemoizedChild = memo(function MemoizedChild({ name }: { name: string }) {
  const renderCount = useRef(0)
  renderCount.current++

  return (
    <div>
      <span style={{ color: 'var(--accent-green)' }}>✅ С memo</span>
      <p>Hello {name}</p>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Renders: {renderCount.current}</p>
    </div>
  )
})

// === USEMEMO/USECALLBACK DEMO ===
function UseMemoCallbackDemo() {
  const [count, setCount] = useState(0)
  const [items] = useState(() => Array.from({ length: 1000 }, (_, i) => ({ id: i, value: Math.random() })))
  const [filter, setFilter] = useState('')

  // ✅ С useMemo — фильтрация ТОЛЬКО при изменении filter или items  
  const filteredWithMemo = useMemo(() => {
    console.log('Filtering with useMemo...')
    return items.filter(item => item.value.toString().includes(filter))
  }, [items, filter])

  // useCallback для передачи в дочерние компоненты
  const handleItemClick = useCallback((id: number) => {
    console.log('Clicked item:', id)
  }, [])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">useMemo & useCallback</h3>
        <span className="card-badge">Практика</span>
      </div>

      <div className="comparison-grid">
        <div className="comparison-card" style={{ borderColor: 'var(--accent-purple)' }}>
          <div className="comparison-header" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
            💾 useMemo — мемоизация значений
          </div>
          <div className="comparison-body">
            <p>Кэширует результат вычислений</p>
            <CodeBlock 
              code={`const filtered = useMemo(() => {
  // Выполняется ТОЛЬКО при изменении deps
  return items.filter(i => i.includes(query));
}, [items, query]);`} 
              language="tsx" 
            />
          </div>
        </div>

        <div className="comparison-card" style={{ borderColor: 'var(--accent-cyan)' }}>
          <div className="comparison-header" style={{ background: 'rgba(6, 182, 212, 0.1)' }}>
            🔄 useCallback — мемоизация функций
          </div>
          <div className="comparison-body">
            <p>Кэширует ссылку на функцию</p>
            <CodeBlock 
              code={`const handleClick = useCallback(() => {
  // Та же ссылка пока deps не изменятся
  doSomething(id);
}, [id]);`} 
              language="tsx" 
            />
          </div>
        </div>
      </div>

      <div className="visual-diagram" style={{ marginTop: '16px' }}>
        <h4>Интерактивный пример useMemo</h4>
        <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>
          Фильтрация 1000 элементов. Клик на count++ вызывает ре-рендер, но с useMemo фильтрация не повторяется.
        </p>
        
        <div className="controls">
          <input 
            type="text" 
            placeholder="Фильтр..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ 
              padding: '10px 16px', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              flex: 1
            }}
          />
          <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>
            count++ ({count})
          </button>
        </div>

        <div style={{ marginTop: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', flex: '1 1 200px' }}>
            <strong style={{ color: 'var(--accent-green)' }}>✅ С useMemo:</strong>
            <p>Найдено: {filteredWithMemo.length} элементов</p>
            <div style={{ marginTop: '8px', maxHeight: '100px', overflow: 'auto' }}>
              {filteredWithMemo.slice(0, 5).map(item => (
                <button 
                  key={item.id} 
                  onClick={() => handleItemClick(item.id)}
                  style={{ 
                    display: 'block', 
                    fontSize: '0.75rem', 
                    color: 'var(--text-muted)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px 0'
                  }}
                >
                  Item {item.id}: {item.value.toFixed(4)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// === VIRTUALIZATION ===
function VirtualizationSection() {
  const [items] = useState(() => Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`))
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 })
  const containerRef = useRef<HTMLDivElement>(null)
  const itemHeight = 40

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop
      const start = Math.floor(scrollTop / itemHeight)
      const end = start + Math.ceil(300 / itemHeight) + 1
      setVisibleRange({ start, end: Math.min(end, items.length) })
    }
  }, [items.length])

  const visibleItems = items.slice(visibleRange.start, visibleRange.end)

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">📜 Виртуализация списков</h3>
        <span className="card-badge">Продвинутое</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🚀</span>
        <div className="info-box-content">
          <div className="info-box-title">Проблема: 10,000 DOM элементов = лаги</div>
          <p>Виртуализация рендерит только видимые элементы. Вместо 10,000 DOM нод — только ~20.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '16px' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h4 style={{ marginBottom: '12px' }}>Виртуализированный список (1,000 items)</h4>
          <div 
            ref={containerRef}
            onScroll={handleScroll}
            style={{ 
              height: '300px', 
              overflow: 'auto', 
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              position: 'relative'
            }}
          >
            <div style={{ height: items.length * itemHeight, position: 'relative' }}>
              {visibleItems.map((item, index) => (
                <div
                  key={visibleRange.start + index}
                  style={{
                    position: 'absolute',
                    top: (visibleRange.start + index) * itemHeight,
                    height: itemHeight,
                    width: '100%',
                    padding: '8px 16px',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    background: (visibleRange.start + index) % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-card)'
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <p style={{ marginTop: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Рендерится только {visibleItems.length} из {items.length} элементов
          </p>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <CodeBlock 
            code={`// Используй библиотеки для виртуализации:

// 📦 @tanstack/react-virtual (рекомендуется)
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  });
  
  return (
    <div ref={parentRef} style={{ height: 400, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: virtualRow.start,
              height: virtualRow.size,
            }}
          >
            {items[virtualRow.index]}
          </div>
        ))}
      </div>
    </div>
  );
}

// Альтернативы:
// - react-window (легковесная)
// - react-virtuoso (фичастая)`} 
            language="tsx" 
          />
        </div>
      </div>
    </div>
  )
}

// === PROFILER ===
function ProfilerDemo() {
  const [renderLogs, setRenderLogs] = useState<Array<{ id: string; phase: string; duration: number }>>([])
  const [key, setKey] = useState(0)

  // ВАЖНО: useCallback чтобы функция не пересоздавалась и не вызывала infinite loop
  const addRenderLog = useCallback((id: string, phase: string, duration: number) => {
    // setTimeout чтобы не вызывать setState во время рендера
    setTimeout(() => {
      setRenderLogs(prev => [...prev.slice(-4), { id, phase, duration }])
    }, 0)
  }, [])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🔬 React Profiler</h3>
        <span className="card-badge">DevTools</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">📊</span>
        <div className="info-box-content">
          <p><code>&lt;Profiler&gt;</code> измеряет время рендера. Используй для поиска узких мест.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '16px' }}>
        <div style={{ flex: '1 1 300px' }}>
          <ProfiledComponent key={key} onRenderLog={addRenderLog} />

          <div className="controls" style={{ marginTop: '16px' }}>
            <button className="btn btn-primary" onClick={() => setKey(k => k + 1)}>
              🔄 Remount компонент
            </button>
            <button className="btn btn-secondary" onClick={() => setRenderLogs([])}>
              🗑️ Очистить лог
            </button>
          </div>

          <div style={{ marginTop: '16px', padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '8px' }}>📋 Render Log</h4>
            {renderLogs.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>Взаимодействуйте с компонентом...</p>
            ) : (
              renderLogs.map((r, i) => (
                <div key={i} style={{ fontSize: '0.85rem', marginBottom: '4px', fontFamily: 'monospace' }}>
                  <span style={{ color: r.phase === 'mount' ? 'var(--accent-green)' : 'var(--accent-blue)' }}>
                    {r.phase}
                  </span>
                  {' '}{r.id}: <strong>{r.duration.toFixed(2)}ms</strong>
                </div>
              ))
            )}
          </div>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <CodeBlock 
            code={`import { Profiler } from 'react';

function onRender(
  id,                   // "SlowComponent"
  phase,                // "mount" | "update"
  actualDuration,       // Время рендера в ms
  baseDuration,         // Время без мемоизации
  startTime,            // Когда начался рендер
  commitTime            // Когда React закоммитил
) {
  console.log(\`\${id} \${phase}: \${actualDuration}ms\`);
  
  // Отправь метрики в аналитику
  analytics.track('render', { id, phase, duration: actualDuration });
}

function App() {
  return (
    <Profiler id="SlowComponent" onRender={onRender}>
      <SlowComponent />
    </Profiler>
  );
}

// 💡 React DevTools → Profiler tab
// Визуализирует flame graph всех рендеров`} 
            language="tsx" 
          />
        </div>
      </div>
    </div>
  )
}

// Отдельный профилируемый компонент (memo чтобы не было infinite loop)
const ProfiledComponent = memo(function ProfiledComponent({ onRenderLog }: { onRenderLog: (id: string, phase: string, duration: number) => void }) {
  const [count, setCount] = useState(0)

  const handleRender = (
    id: string,
    phase: 'mount' | 'update' | 'nested-update',
    actualDuration: number
  ) => {
    onRenderLog(id, phase, actualDuration)
  }

  return (
    <Profiler id="SlowComponent" onRender={handleRender}>
      <div className="visual-diagram">
        <h4>Профилируемый компонент</h4>
        <p style={{ color: 'var(--text-muted)' }}>Кликните чтобы вызвать ре-рендер</p>
        <div className="value-display" style={{ margin: '12px 0' }}>{count}</div>
        <button 
          className="btn btn-primary" 
          onClick={() => setCount(c => c + 1)}
        >
          count++ (trigger update)
        </button>
      </div>
    </Profiler>
  )
})

// === CODE SPLITTING ===
function CodeSplittingSection() {
  const [tab, setTab] = useState<'basic' | 'route' | 'preload'>('basic')

  const basicCode = `// ═══════════════════════════════════════════════════════════════
// 🔄 React.lazy — динамическая загрузка компонентов
// ═══════════════════════════════════════════════════════════════

import { lazy, Suspense } from 'react';

// ОБЫЧНЫЙ ИМПОРТ (всё в одном бандле)
// import HeavyChart from './components/HeavyChart';

// LAZY ИМПОРТ (отдельный chunk)
const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Показать график
      </button>
      
      {showChart && (
        <Suspense fallback={<div>Загрузка...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}`

  const routeCode = `// ═══════════════════════════════════════════════════════════════
// 🛣️ CODE SPLITTING ПО РОУТАМ
// ═══════════════════════════════════════════════════════════════

import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}`

  const preloadCode = `// ═══════════════════════════════════════════════════════════════
// ⚡ PRELOAD — загрузка заранее
// ═══════════════════════════════════════════════════════════════

const importDashboard = () => import('./pages/Dashboard');
const Dashboard = lazy(importDashboard);

function Navigation() {
  // При hover начинаем загрузку
  return (
    <Link 
      to="/dashboard"
      onMouseEnter={importDashboard}
    >
      Dashboard
    </Link>
  );
}

// После загрузки главной — preload важные роуты
useEffect(() => {
  const timer = setTimeout(() => {
    import('./pages/Dashboard');
    import('./pages/Settings');
  }, 2000);
  return () => clearTimeout(timer);
}, []);`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">📦 Code Splitting</h3>
        <span className="card-badge">Bundle</span>
      </div>

      <div className="comparison-grid" style={{ marginBottom: '16px' }}>
        <div className="comparison-card" style={{ borderColor: 'var(--accent-red)' }}>
          <div className="comparison-header" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
            ❌ Без Code Splitting
          </div>
          <div className="comparison-body" style={{ textAlign: 'center' }}>
            <div style={{ background: 'var(--accent-red)', padding: '30px', borderRadius: '8px', color: 'white' }}>
              bundle.js (2.5 MB)
            </div>
            <p style={{ marginTop: '8px', color: 'var(--text-muted)' }}>Весь код сразу</p>
          </div>
        </div>

        <div className="comparison-card" style={{ borderColor: 'var(--accent-green)' }}>
          <div className="comparison-header" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
            ✅ С Code Splitting
          </div>
          <div className="comparison-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ background: 'var(--accent-green)', padding: '10px', borderRadius: '6px', color: 'white' }}>main.js (200 KB)</div>
              <div style={{ background: 'var(--accent-blue)', padding: '8px', borderRadius: '6px', color: 'white', fontSize: '0.9rem' }}>dashboard.js (150 KB)</div>
              <div style={{ background: 'var(--accent-purple)', padding: '8px', borderRadius: '6px', color: 'white', fontSize: '0.9rem' }}>settings.js (100 KB)</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button className={`btn ${tab === 'basic' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('basic')}>
          📦 Базовое
        </button>
        <button className={`btn ${tab === 'route' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('route')}>
          🛣️ По роутам
        </button>
        <button className={`btn ${tab === 'preload' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('preload')}>
          ⚡ Preload
        </button>
      </div>

      {tab === 'basic' && <CodeBlock code={basicCode} language="tsx" />}
      {tab === 'route' && <CodeBlock code={routeCode} language="tsx" />}
      {tab === 'preload' && <CodeBlock code={preloadCode} language="tsx" />}
    </div>
  )
}

function BundleOptimization() {
  const optimizationCode = `// ═══════════════════════════════════════════════════════════════
// 📊 ОПТИМИЗАЦИЯ БАНДЛА
// ═══════════════════════════════════════════════════════════════

// 1. АНАЛИЗ БАНДЛА (Vite)
// npm install -D rollup-plugin-visualizer
import { visualizer } from 'rollup-plugin-visualizer';

// vite.config.ts
export default {
  plugins: [
    visualizer({ open: true, gzipSize: true }),
  ],
};

// 2. MANUAL CHUNKS
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-dialog'],
        },
      },
    },
  },
};

// 3. TREE SHAKING
// ❌ import _ from 'lodash';        // 70kb+
// ✅ import debounce from 'lodash/debounce'; // ~2kb

// 4. ДИНАМИЧЕСКИЙ ИМПОРТ БИБЛИОТЕК
async function showEditor() {
  const monaco = await import('monaco-editor');
  monaco.editor.create(container, { ... });
}`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🔧 Оптимизация бандла</h3>
        <span className="card-badge">Vite/Webpack</span>
      </div>

      <CodeBlock code={optimizationCode} language="tsx" />
    </div>
  )
}

function InterviewQuestions() {
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({})

  const questions = [
    {
      q: "Когда использовать React.memo?",
      a: "Когда компонент часто ре-рендерится с одинаковыми props. Особенно полезно для списков, heavy компонентов. Не используй везде — memo тоже имеет cost."
    },
    {
      q: "В чём разница между useMemo и useCallback?",
      a: "useMemo мемоизирует ЗНАЧЕНИЕ (результат вычислений). useCallback мемоизирует ФУНКЦИЮ (её ссылку). useCallback(fn, deps) === useMemo(() => fn, deps)"
    },
    {
      q: "Что такое виртуализация списков?",
      a: "Техника рендеринга только видимых элементов списка. Вместо 10,000 DOM нод рендерим ~20. Библиотеки: @tanstack/react-virtual, react-window, react-virtuoso."
    },
    {
      q: "Как найти проблемы производительности?",
      a: "1) React DevTools Profiler — flame graph рендеров. 2) Chrome DevTools Performance. 3) why-did-you-render библиотека. 4) <Profiler> компонент для метрик."
    },
    {
      q: "Что такое Code Splitting?",
      a: "Разделение бандла на chunks. React.lazy + Suspense для lazy loading компонентов. Часто делят по роутам — каждая страница отдельный chunk."
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
