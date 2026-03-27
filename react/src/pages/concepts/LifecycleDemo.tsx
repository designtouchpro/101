import { useState, useEffect, useLayoutEffect, useRef, useCallback, memo } from 'react'
import CodeBlock from '../../components/CodeBlock'

interface LogEntry {
  type: 'mount' | 'update' | 'effect' | 'cleanup'
  message: string
  timestamp: number
}

export default function LifecycleDemo() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔁 Жизненный цикл компонента</h1>
        <p>Визуализация всех этапов жизни React компонента</p>
        <a 
          href="https://react.dev/learn/lifecycle-of-reactive-effects" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 Документация React
        </a>
      </div>

      <LifecycleOverview />
      <MountUpdateUnmountDemo />
      <EffectOrderDemo />
    </div>
  )
}

function LifecycleOverview() {
  const lifecycleCode = `// ═══════════════════════════════════════════════════════════════
// 🔁 ЖИЗНЕННЫЙ ЦИКЛ ФУНКЦИОНАЛЬНОГО КОМПОНЕНТА
// ═══════════════════════════════════════════════════════════════

function MyComponent({ userId }) {
  // ─────────────────────────────────────────────────────────────
  // 1️⃣ RENDER PHASE — компонент вызывается как функция
  // ─────────────────────────────────────────────────────────────
  console.log('1. Render: функция компонента выполняется');
  
  const [data, setData] = useState(null);  // Инициализация state
  
  // ─────────────────────────────────────────────────────────────
  // 2️⃣ COMMIT PHASE — React обновляет DOM
  // ─────────────────────────────────────────────────────────────
  // (происходит автоматически после render)
  
  // ─────────────────────────────────────────────────────────────
  // 3️⃣ useLayoutEffect — СИНХРОННО после DOM mutation
  //    ДО того как браузер отрисует (заблокирует paint)
  // ─────────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    console.log('3. useLayoutEffect: DOM обновлён, но ещё не отрисован');
    // Используй для измерений DOM / предотвращения мерцания
    return () => console.log('3. useLayoutEffect cleanup');
  }, [userId]);
  
  // ─────────────────────────────────────────────────────────────
  // 4️⃣ BROWSER PAINT — браузер отрисовывает изменения
  // ─────────────────────────────────────────────────────────────
  // (происходит автоматически)
  
  // ─────────────────────────────────────────────────────────────
  // 5️⃣ useEffect — АСИНХРОННО после paint
  //    Не блокирует отрисовку
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    console.log('5. useEffect: браузер уже отрисовал');
    // Используй для API запросов, подписок, таймеров
    return () => console.log('5. useEffect cleanup');
  }, [userId]);
  
  return <div>...</div>;
}`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Обзор жизненного цикла</h3>
        <span className="card-badge">Теория</span>
      </div>

      <div className="visual-diagram">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
            <div className="diagram-box mount" style={{ background: 'rgba(34, 197, 94, 0.15)', borderColor: 'var(--accent-green)', color: 'var(--accent-green)' }}>
              <strong>Mount (Монтирование)</strong>
              <ol className="info-list">
                <li>Создание компонента</li>
                <li>Первый рендер</li>
                <li>Обновление DOM</li>
                <li>useLayoutEffect</li>
                <li>Отрисовка на экране</li>
                <li>useEffect</li>
              </ol>
            </div>
          </div>

          <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
            <div className="diagram-box update" style={{ background: 'rgba(59, 130, 246, 0.15)', borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }}>
              <strong>Update (Обновление)</strong>
              <ol className="info-list">
                <li>Изменение state/props</li>
                <li>Ре-рендер</li>
                <li>useEffect cleanup (пред.)</li>
                <li>Обновление DOM</li>
                <li>useLayoutEffect</li>
                <li>Отрисовка на экране</li>
                <li>useEffect</li>
              </ol>
            </div>
          </div>

          <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
            <div className="diagram-box unmount" style={{ background: 'rgba(239, 68, 68, 0.15)', borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}>
              <strong>Unmount (Размонтирование)</strong>
              <ol className="info-list">
                <li>Удаление из DOM</li>
                <li>useLayoutEffect cleanup</li>
                <li>useEffect cleanup</li>
                <li>Освобождение памяти</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="info-box" style={{ marginTop: '16px' }}>
        <span className="info-box-icon">📝</span>
        <div className="info-box-content">
          <div className="info-box-title">Важные отличия от классов</div>
          <p>В функциональных компонентах нет методов типа <code>componentDidMount</code>. 
          Всё управляется через хуки: <code>useEffect</code> и <code>useLayoutEffect</code>.</p>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <CodeBlock code={lifecycleCode} language="tsx" title="🔁 Порядок выполнения" />
      </div>
    </div>
  )
}

// Компонент для отображения логов
function RenderLog({ logs }: { logs: LogEntry[] }) {
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [logs])

  const getTypeColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'mount': return 'var(--accent-green)'
      case 'update': return 'var(--accent-blue)'
      case 'effect': return 'var(--accent-purple)'
      case 'cleanup': return 'var(--accent-red)'
    }
  }

  return (
    <div 
      ref={logRef}
      style={{ 
        background: 'var(--bg-primary)', 
        borderRadius: '8px', 
        padding: '12px',
        maxHeight: '300px',
        overflowY: 'auto',
        fontFamily: 'monospace',
        fontSize: '0.85rem'
      }}
    >
      {logs.length === 0 ? (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
          События появятся здесь...
        </div>
      ) : (
        logs.map((log, i) => (
          <div key={i} style={{ marginBottom: '4px', color: getTypeColor(log.type) }}>
            <span style={{ color: 'var(--text-muted)', marginRight: '8px' }}>
              {log.timestamp}ms
            </span>
            {log.message}
          </div>
        ))
      )}
    </div>
  )
}

function MountUpdateUnmountDemo() {
  const [showChild, setShowChild] = useState(true)
  const [childKey, setChildKey] = useState(0)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const mountTime = useRef(Date.now())

  const addLog = useCallback((type: LogEntry['type'], message: string) => {
    setLogs(prev => [...prev, { type, message, timestamp: Date.now() - mountTime.current }])
  }, [])

  const resetDemo = () => {
    setLogs([])
    mountTime.current = Date.now()
    setShowChild(true)
    setChildKey(k => k + 1)
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Интерактивная визуализация</h3>
        <span className="card-badge">Практика</span>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <div className="visual-diagram" style={{ minHeight: '200px' }}>
            {showChild ? (
              <LifecycleChild key={childKey} addLog={addLog} />
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>💤</div>
                Компонент размонтирован
              </div>
            )}
          </div>

          <div className="controls">
            <button className={`btn ${showChild ? 'btn-danger' : 'btn-success'}`} onClick={() => setShowChild(!showChild)}>
              {showChild ? '🗑️ Unmount' : '➕ Mount'}
            </button>
            <button className="btn btn-warning" onClick={resetDemo}>
              🔄 Reset & Remount
            </button>
          </div>

          <div className="info-box" style={{ marginTop: '16px' }}>
            <span className="info-box-icon">🔬</span>
            <div className="info-box-content">
              <p>Следите за логом справа! Нажмите Unmount и увидите cleanup. Mount покажет полный цикл монтирования.</p>
            </div>
          </div>
        </div>

        <div style={{ flex: '0 0 350px', minWidth: '280px' }}>
          <h4 style={{ marginBottom: '12px' }}>📋 Lifecycle Events</h4>
          <RenderLog logs={logs} />
        </div>
      </div>
    </div>
  )
}

const LifecycleChild = memo(function LifecycleChild({ addLog }: { addLog: (type: LogEntry['type'], message: string) => void }) {
  const [count, setCount] = useState(0)
  const renderCount = useRef(0)
  const isFirstRender = useRef(true)
  renderCount.current++

  // Логируем рендер только через useEffect с зависимостью
  useEffect(() => {
    addLog('update', `🔵 Render #${renderCount.current}`)
  }, [count, addLog])

  useLayoutEffect(() => {
    addLog('effect', '🟡 useLayoutEffect (sync, before paint)')
    return () => { addLog('cleanup', '🟡 useLayoutEffect cleanup') }
  }, [count, addLog])

  useEffect(() => {
    addLog('effect', '🟣 useEffect (async, after paint)')
    return () => { addLog('cleanup', '🔴 useEffect cleanup') }
  }, [count, addLog])

  useEffect(() => {
    if (isFirstRender.current) {
      addLog('mount', '🟢 MOUNTED (useEffect [])')
      isFirstRender.current = false
    }
    return () => { addLog('cleanup', '🔴 UNMOUNTING (cleanup [])') }
  }, [addLog])

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="diagram-box component" style={{ margin: '0 auto 16px' }}>
        &lt;LifecycleChild /&gt;
      </div>
      <div className="value-display">count: {count}</div>
      <p style={{ margin: '8px 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
        Renders: {renderCount.current}
      </p>
      <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>
        count++ (trigger update)
      </button>
    </div>
  )
})

function EffectOrderDemo() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [show, setShow] = useState(false)
  const mountTime = useRef(Date.now())

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'effect') => {
    setLogs(prev => [...prev, { type, message, timestamp: Date.now() - mountTime.current }])
  }, [])

  const reset = () => {
    setLogs([])
    mountTime.current = Date.now()
    setShow(false)
  }

  const orderCode = `// ═══════════════════════════════════════════════════════════════
// 📊 ПОРЯДОК ЭФФЕКТОВ: PARENT vs CHILD
// Effects выполняются СНИЗУ ВВЕРХ (дети первые!)
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// MOUNT: рендер сверху вниз, effects снизу вверх
// ─────────────────────────────────────────────────────────────
// 1. Parent render    ← сначала родитель рендерится
// 2. Child render     ← потом ребёнок рендерится
// 3. Child useEffect  ← НО effects идут снизу!
// 4. Parent useEffect ← родитель последний

// ─────────────────────────────────────────────────────────────
// UNMOUNT: cleanup в том же порядке (дети первые)
// ─────────────────────────────────────────────────────────────
// 1. Child cleanup    ← сначала дети очищаются
// 2. Parent cleanup   ← потом родители


// ═══════════════════════════════════════════════════════════════
// ПОЧЕМУ ТАКОЙ ПОРЯДОК?
// ═══════════════════════════════════════════════════════════════
// React гарантирует что к моменту выполнения effect родителя,
// все дети уже "готовы" (их effects выполнены).
// Это позволяет родителю безопасно взаимодействовать с детьми.`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Порядок эффектов: Parent vs Child</h3>
        <span className="card-badge">Продвинутое</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🎯</span>
        <div className="info-box-content">
          <div className="info-box-title">Порядок выполнения</div>
          <p>Effects выполняются снизу вверх: сначала дети, потом родители. Cleanup — в том же порядке.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <div className="visual-diagram">
            {show ? (
              <ParentWithEffects addLog={addLog} />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                Нажмите "Mount" чтобы начать
              </div>
            )}
          </div>

          <div className="controls">
            <button className={`btn ${show ? 'btn-danger' : 'btn-success'}`} onClick={() => setShow(!show)}>
              {show ? 'Unmount' : 'Mount'}
            </button>
            <button className="btn btn-secondary" onClick={reset}>
              Reset
            </button>
          </div>
        </div>

        <div style={{ flex: '0 0 350px', minWidth: '280px' }}>
          <RenderLog logs={logs} />
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <CodeBlock code={orderCode} language="tsx" title="📊 Порядок эффектов" />
      </div>
    </div>
  )
}

const ParentWithEffects = memo(function ParentWithEffects({ addLog }: { addLog: (msg: string, type?: LogEntry['type']) => void }) {
  const didMount = useRef(false)

  useEffect(() => {
    if (!didMount.current) {
      addLog('1️⃣ Parent: render', 'update')
      didMount.current = true
    }
  }, [addLog])

  useEffect(() => {
    addLog('4️⃣ Parent: useEffect', 'effect')
    return () => addLog('Parent: cleanup', 'cleanup')
  }, [addLog])

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="diagram-box component" style={{ margin: '0 auto 16px' }}>
        &lt;Parent /&gt;
      </div>
      <div style={{ padding: '16px', border: '2px dashed var(--border-color)', borderRadius: '8px' }}>
        <ChildWithEffects addLog={addLog} />
      </div>
    </div>
  )
})

const ChildWithEffects = memo(function ChildWithEffects({ addLog }: { addLog: (msg: string, type?: LogEntry['type']) => void }) {
  const didMount = useRef(false)

  useEffect(() => {
    if (!didMount.current) {
      addLog('2️⃣ Child: render', 'update')
      didMount.current = true
    }
  }, [addLog])

  useEffect(() => {
    addLog('3️⃣ Child: useEffect', 'effect')
    return () => addLog('Child: cleanup', 'cleanup')
  }, [addLog])

  return <div className="diagram-box effect">&lt;Child /&gt;</div>
})
