import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function UseEffectDemo() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>⚡ useEffect</h1>
        <p>Хук для синхронизации компонента с внешними системами</p>
        <a 
          href="https://react.dev/reference/react/useEffect" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 Документация React
        </a>
      </div>

      <WhatIsEffectSection />
      <EffectTimingDemo />
      <DependenciesDemo />
      <CleanupDemo />
      <CommonMistakesDemo />
    </div>
  )
}

// =====================================================
// СЕКЦИЯ 1: Что такое useEffect и зачем он нужен
// =====================================================
function WhatIsEffectSection() {
  const basicStructureCode = `// ═══════════════════════════════════════════════════════════════
// 📌 БАЗОВАЯ СТРУКТУРА useEffect
// ═══════════════════════════════════════════════════════════════

useEffect(() => {
  // ─────────────────────────────────────────────────────────────
  // 1️⃣ SETUP: Код выполняется ПОСЛЕ рендера
  //    React сначала обновит DOM, потом запустит этот код
  // ─────────────────────────────────────────────────────────────
  
  const connection = createConnection(serverUrl);  // Создаём подключение
  connection.connect();                            // Подключаемся к серверу
  
  // ─────────────────────────────────────────────────────────────
  // 2️⃣ CLEANUP (опционально): Функция очистки
  //    Вызывается ПЕРЕД следующим effect или при unmount
  // ─────────────────────────────────────────────────────────────
  return () => {
    connection.disconnect();  // Отключаемся при смене serverUrl или unmount
  };
  
}, [serverUrl]);  // 3️⃣ DEPENDENCIES: Когда запускать effect
                  // [] = только mount, [dep] = когда dep изменится`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Что такое useEffect?</h3>
        <span className="card-badge">Теория</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">Ключевое понимание</div>
          <p><strong>useEffect</strong> — это "выход" из мира React во внешний мир. 
          Он нужен когда вам требуется синхронизировать React-компонент с чем-то ВНЕШНИМ.</p>
        </div>
      </div>

      <div className="comparison-grid" style={{ marginTop: '20px', marginBottom: '20px' }}>
        <div className="comparison-card" style={{ borderColor: 'var(--accent-green)' }}>
          <div className="comparison-header" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
            ✅ Когда НУЖЕН useEffect
          </div>
          <div className="comparison-body">
            <ul className="info-list">
              <li>Подписки на события (WebSocket, EventSource)</li>
              <li>Запросы к API при загрузке данных</li>
              <li>Подписка на DOM события (resize, scroll)</li>
              <li>Таймеры и интервалы</li>
              <li>Работа с localStorage/sessionStorage</li>
              <li>Интеграция с не-React библиотеками</li>
              <li>Изменение document.title</li>
            </ul>
          </div>
        </div>

        <div className="comparison-card" style={{ borderColor: 'var(--accent-red)' }}>
          <div className="comparison-header" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
            ❌ Когда НЕ НУЖЕН useEffect
          </div>
          <div className="comparison-body">
            <ul className="info-list">
              <li>Трансформация данных для рендера</li>
              <li>Обработка событий пользователя</li>
              <li>Вычисления на основе props/state</li>
              <li>Сброс состояния при изменении props</li>
              <li>Кэширование вычислений (используй useMemo)</li>
            </ul>
          </div>
        </div>
      </div>

      <CodeBlock code={basicStructureCode} language="tsx" title="📌 Базовая структура useEffect" />
    </div>
  )
}

// =====================================================
// СЕКЦИЯ 2: Когда выполняется useEffect
// =====================================================
function EffectTimingDemo() {
  const [count, setCount] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const renderNumber = useRef(0)

  renderNumber.current++

  useEffect(() => {
    setLogs(prev => [
      ...prev.slice(-6),
      `🔵 RENDER: count=${count}`,
      `🟣 EFFECT: Выполняется после обновления DOM`
    ])
    
    return () => {
      setLogs(prev => [
        ...prev.slice(-6),
        `🔴 CLEANUP: Очистка перед следующим effect`
      ])
    }
  }, [count])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">⏱️ Когда выполняется Effect?</h3>
        <span className="card-badge">Тайминг</span>
      </div>

      <div className="info-box warning">
        <span className="info-box-icon">⚡</span>
        <div className="info-box-content">
          <div className="info-box-title">Важно понять!</div>
          <p>useEffect выполняется <strong>АСИНХРОННО после</strong> того как браузер отрисовал изменения. 
          Это НЕ часть рендера — это отдельная фаза.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginTop: '20px' }}>
        <div style={{ flex: 1 }}>
          <div className="visual-diagram">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="diagram-box" style={{ background: 'rgba(59, 130, 246, 0.2)', borderColor: 'var(--accent-blue)' }}>
                1️⃣ <strong>Render Phase</strong><br/>
                <span style={{ fontSize: '0.85rem' }}>Функция компонента вызывается</span>
              </div>
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>↓</div>
              <div className="diagram-box" style={{ background: 'rgba(34, 197, 94, 0.2)', borderColor: 'var(--accent-green)' }}>
                2️⃣ <strong>Commit Phase</strong><br/>
                <span style={{ fontSize: '0.85rem' }}>React обновляет DOM</span>
              </div>
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>↓</div>
              <div className="diagram-box" style={{ background: 'rgba(245, 158, 11, 0.2)', borderColor: 'var(--accent-orange)' }}>
                3️⃣ <strong>Browser Paint</strong><br/>
                <span style={{ fontSize: '0.85rem' }}>Браузер рисует на экране</span>
              </div>
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>↓</div>
              <div className="diagram-box effect">
                4️⃣ <strong>useEffect</strong><br/>
                <span style={{ fontSize: '0.85rem' }}>Выполняется после paint</span>
              </div>
            </div>
          </div>

          <div className="value-display" style={{ marginTop: '16px' }}>count: {count}</div>

          <div className="controls">
            <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>
              Увеличить count
            </button>
            <button className="btn btn-secondary" onClick={() => { renderNumber.current = 0; setCount(0); setLogs([]) }}>
              Сбросить
            </button>
          </div>
        </div>

        <div style={{ width: '450px' }}>
          <h4 style={{ marginBottom: '12px' }}>📋 Порядок выполнения</h4>
          <div style={{ background: 'var(--bg-code)', borderRadius: '8px', padding: '12px', minHeight: '250px', maxHeight: '300px', overflowY: 'auto', fontSize: '0.85rem', fontFamily: 'monospace' }}>
            {logs.length === 0 ? (
              <div style={{ color: 'var(--text-muted)' }}>
                Нажмите кнопку для демонстрации...<br/><br/>
                Порядок:<br/>
                1. RENDER<br/>
                2. CLEANUP (если был)<br/>
                3. EFFECT
              </div>
            ) : (
              logs.map((log, i) => (
                <div key={i} style={{ 
                  padding: '4px 0',
                  borderBottom: '1px solid var(--border-color)',
                  color: log.includes('RENDER') ? 'var(--accent-blue)' : 
                         log.includes('EFFECT') ? 'var(--accent-purple)' :
                         log.includes('CLEANUP') ? 'var(--accent-red)' : 'var(--text-primary)'
                }}>
                  {log}
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
// СЕКЦИЯ 3: Массив зависимостей
// =====================================================
function DependenciesDemo() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('hello')
  const [forceRender, setForceRender] = useState(0)
  
  const runsNoDeps = useRef(0)
  const runsEmpty = useRef(0)
  const runsCount = useRef(0)
  const runsText = useRef(0)
  const [displayRuns, setDisplayRuns] = useState({ noDeps: 0, empty: 0, count: 0, text: 0 })

  useEffect(() => { runsNoDeps.current++ })
  useEffect(() => { runsEmpty.current++ }, [])
  useEffect(() => { runsCount.current++ }, [count])
  useEffect(() => { runsText.current++ }, [text])

  useEffect(() => {
    setDisplayRuns({
      noDeps: runsNoDeps.current,
      empty: runsEmpty.current,
      count: runsCount.current,
      text: runsText.current
    })
  }, [count, text, forceRender])

  const depsCode = `// ═══════════════════════════════════════════════════════════════
// 📋 МАССИВ ЗАВИСИМОСТЕЙ — сердце useEffect
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// 1️⃣ БЕЗ МАССИВА — запускается на КАЖДЫЙ рендер
// ⚠️ ОПАСНО! Может вызвать бесконечный цикл
// ─────────────────────────────────────────────────────────────
useEffect(() => {
  console.log('Каждый рендер!');  // 💥 Если тут setState — infinite loop
});

// ─────────────────────────────────────────────────────────────
// 2️⃣ ПУСТОЙ МАССИВ [] — только при mount (1 раз)
// Аналог componentDidMount в классах
// ─────────────────────────────────────────────────────────────
useEffect(() => {
  console.log('Только mount');  // Cleanup вызовется при unmount
  return () => console.log('Unmount');
}, []);

// ─────────────────────────────────────────────────────────────
// 3️⃣ С ЗАВИСИМОСТЯМИ — при mount + когда deps изменятся
// React сравнивает через Object.is()
// ─────────────────────────────────────────────────────────────
useEffect(() => {
  console.log(\`count изменился: \${count}\`);
}, [count]);  // Запустится когда count !== prevCount`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">📋 Массив зависимостей</h3>
        <span className="card-badge">Ключевая концепция</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🧠</span>
        <div className="info-box-content">
          <div className="info-box-title">Как React решает когда запускать effect?</div>
          <p>React сравнивает каждую зависимость с предыдущим значением используя <code>Object.is()</code>. 
          Если хотя бы одна изменилась — effect перезапускается.</p>
        </div>
      </div>

      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>
            count++ ({count})
          </button>
          <input 
            className="input" 
            value={text} 
            onChange={e => setText(e.target.value)}
            style={{ width: '150px' }}
            placeholder="Введите текст"
          />
          <button className="btn btn-secondary" onClick={() => setForceRender(r => r + 1)}>
            Force re-render
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '16px', border: '2px solid var(--accent-red)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <code style={{ color: 'var(--accent-red)' }}>useEffect(fn)</code>
            <span style={{ background: 'var(--accent-red)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
              Запусков: {displayRuns.noDeps}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            ⚠️ Каждый рендер! Опасно
          </p>
        </div>

        <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '16px', border: '2px solid var(--accent-green)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <code style={{ color: 'var(--accent-green)' }}>useEffect(fn, [])</code>
            <span style={{ background: 'var(--accent-green)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
              Запусков: {displayRuns.empty}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            ✅ Только mount
          </p>
        </div>

        <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '16px', border: '2px solid var(--accent-blue)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <code style={{ color: 'var(--accent-blue)' }}>useEffect(fn, [count])</code>
            <span style={{ background: 'var(--accent-blue)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
              Запусков: {displayRuns.count}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            При изменении count
          </p>
        </div>

        <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '16px', border: '2px solid var(--accent-purple)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <code style={{ color: 'var(--accent-purple)' }}>useEffect(fn, [text])</code>
            <span style={{ background: 'var(--accent-purple)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
              Запусков: {displayRuns.text}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            При изменении text
          </p>
        </div>
      </div>

      <CodeBlock code={depsCode} language="tsx" title="📋 Типы зависимостей" />
    </div>
  )
}

// =====================================================
// СЕКЦИЯ 4: Cleanup
// =====================================================
function CleanupDemo() {
  const [roomId, setRoomId] = useState('general')
  const [logs, setLogs] = useState<string[]>([])
  const [connectionStatus, setConnectionStatus] = useState('disconnected')

  const addLog = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    setLogs(prev => [...prev.slice(-10), `[${time}] ${msg}`])
  }, [])

  useEffect(() => {
    addLog(`🟣 EFFECT: Подключаюсь к "${roomId}"...`)
    setConnectionStatus('connecting')
    
    const connectTimeout = setTimeout(() => {
      addLog(`✅ Подключён к "${roomId}"`)
      setConnectionStatus('connected')
    }, 800)

    return () => {
      clearTimeout(connectTimeout)
      addLog(`🔴 CLEANUP: Отключаюсь от "${roomId}"`)
      setConnectionStatus('disconnected')
    }
  }, [roomId, addLog])

  const cleanupCode = `// ═══════════════════════════════════════════════════════════════
// 🧹 CLEANUP — почему это КРИТИЧЕСКИ важно
// ═══════════════════════════════════════════════════════════════

useEffect(() => {
  // ─────────────────────────────────────────────────────────────
  // SETUP: подключаемся к комнате чата
  // ─────────────────────────────────────────────────────────────
  const connection = createConnection(roomId);
  connection.connect();
  console.log(\`Подключён к \${roomId}\`);
  
  // ─────────────────────────────────────────────────────────────
  // CLEANUP: ОБЯЗАТЕЛЬНО отключаемся!
  // Вызывается когда:
  // 1. roomId изменился → cleanup старого, потом setup нового
  // 2. Компонент размонтируется → cleanup
  // ─────────────────────────────────────────────────────────────
  return () => {
    connection.disconnect();
    console.log(\`Отключён от \${roomId}\`);
  };
  
}, [roomId]);  // Перезапускать при смене комнаты


// ═══════════════════════════════════════════════════════════════
// ⚠️ БЕЗ CLEANUP возникают проблемы:
// ═══════════════════════════════════════════════════════════════
// • Memory leaks — подписки продолжают работать после unmount
// • Race conditions — старые запросы перезаписывают новые данные  
// • Ошибки — setState на размонтированном компоненте`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🧹 Cleanup: Зачем нужна очистка?</h3>
        <span className="card-badge">Важно!</span>
      </div>

      <div className="info-box warning">
        <span className="info-box-icon">⚠️</span>
        <div className="info-box-content">
          <div className="info-box-title">Без cleanup возникают проблемы:</div>
          <ul className="info-list">
            <li><strong>Memory leaks</strong> — подписки продолжают работать</li>
            <li><strong>Race conditions</strong> — старые запросы перезаписывают новые</li>
            <li><strong>Ошибки</strong> — setState на размонтированном компоненте</li>
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginTop: '20px' }}>
        <div style={{ flex: 1 }}>
          <div className="visual-diagram">
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: connectionStatus === 'connected' ? 'rgba(34, 197, 94, 0.2)' : connectionStatus === 'connecting' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                borderRadius: '20px',
                border: `2px solid ${connectionStatus === 'connected' ? 'var(--accent-green)' : connectionStatus === 'connecting' ? 'var(--accent-orange)' : 'var(--accent-red)'}`
              }}>
                <div style={{
                  width: '12px', height: '12px', borderRadius: '50%',
                  background: connectionStatus === 'connected' ? 'var(--accent-green)' : connectionStatus === 'connecting' ? 'var(--accent-orange)' : 'var(--accent-red)',
                  boxShadow: connectionStatus === 'connected' ? '0 0 10px var(--accent-green)' : 'none'
                }} />
                {connectionStatus === 'connected' && '✅ Подключён'}
                {connectionStatus === 'connecting' && '⏳ Подключение...'}
                {connectionStatus === 'disconnected' && '❌ Отключён'}
              </div>
            </div>
            <div className="value-display">Комната: <strong>#{roomId}</strong></div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
              Переключите комнату и наблюдайте cleanup → effect:
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['general', 'random', 'tech', 'offtopic'].map(room => (
                <button key={room} className={`btn ${roomId === room ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setRoomId(room)} disabled={roomId === room}>
                  #{room}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ width: '400px' }}>
          <h4 style={{ marginBottom: '12px' }}>📋 Лог событий</h4>
          <div style={{ background: 'var(--bg-code)', borderRadius: '8px', padding: '12px', minHeight: '220px', maxHeight: '280px', overflowY: 'auto', fontSize: '0.85rem', fontFamily: 'monospace' }}>
            {logs.length === 0 ? (
              <div style={{ color: 'var(--text-muted)' }}>Переключите комнату чтобы увидеть порядок cleanup → effect</div>
            ) : (
              logs.map((log, i) => (
                <div key={i} style={{ 
                  padding: '4px 0', borderBottom: '1px solid var(--border-color)',
                  color: log.includes('CLEANUP') ? 'var(--accent-red)' : log.includes('EFFECT') ? 'var(--accent-purple)' : log.includes('✅') ? 'var(--accent-green)' : 'var(--text-primary)'
                }}>{log}</div>
              ))
            )}
          </div>
          <button className="btn btn-secondary" style={{ width: '100%', marginTop: '8px' }} onClick={() => setLogs([])}>
            🗑️ Очистить лог
          </button>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={cleanupCode} language="tsx" title="🧹 Паттерн cleanup" />
      </div>
    </div>
  )
}

// =====================================================
// СЕКЦИЯ 5: Частые ошибки
// =====================================================
function CommonMistakesDemo() {
  const [showExample, setShowExample] = useState<'infinite' | 'object' | 'async' | null>(null)

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🚫 Частые ошибки с useEffect</h3>
        <span className="card-badge">Ловушки</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button className={`btn ${showExample === 'infinite' ? 'btn-danger' : 'btn-secondary'}`} onClick={() => setShowExample(showExample === 'infinite' ? null : 'infinite')}>
          ♾️ Бесконечный цикл
        </button>
        <button className={`btn ${showExample === 'object' ? 'btn-warning' : 'btn-secondary'}`} onClick={() => setShowExample(showExample === 'object' ? null : 'object')}>
          📦 Объекты в deps
        </button>
        <button className={`btn ${showExample === 'async' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setShowExample(showExample === 'async' ? null : 'async')}>
          ⏳ Async/Await
        </button>
      </div>

      {showExample === 'infinite' && <InfiniteLoopExample />}
      {showExample === 'object' && <ObjectDependencyExample />}
      {showExample === 'async' && <AsyncExample />}

      {!showExample && (
        <div className="info-box">
          <span className="info-box-icon">👆</span>
          <div className="info-box-content">
            <div className="info-box-title">Выберите пример выше</div>
            <p>Каждая ошибка показана с объяснением и правильным решением.</p>
          </div>
        </div>
      )}
    </div>
  )
}

function InfiniteLoopExample() {
  const infiniteCode = `// ═══════════════════════════════════════════════════════════════
// ♾️ БЕСКОНЕЧНЫЙ ЦИКЛ — самая частая ошибка!
// Maximum update depth exceeded
// ═══════════════════════════════════════════════════════════════

// ❌ НЕПРАВИЛЬНО: нет массива зависимостей
useEffect(() => {
  setCount(count + 1);  // 💥 setState → render → effect → setState → ...
});  // Запускается КАЖДЫЙ рендер!


// ❌ НЕПРАВИЛЬНО: объект в зависимостях
useEffect(() => {
  setData(fetchData());
}, [data]);  // data всегда "новый" объект → infinite loop


// ═══════════════════════════════════════════════════════════════
// ✅ РЕШЕНИЯ
// ═══════════════════════════════════════════════════════════════

// ✅ Пустой массив для mount-only
useEffect(() => {
  setCount(c => c + 1);
}, []);  // Только 1 раз!


// ✅ Примитивы в зависимостях
useEffect(() => {
  fetchData(userId);
}, [userId]);  // Только когда userId изменился


// ✅ useCallback для функций
const handleUpdate = useCallback(() => {
  // ...обработка
}, [dependency]);  // Стабильная ссылка на функцию`

  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '16px' }}>
      <h4 style={{ color: 'var(--accent-red)', marginBottom: '12px' }}>
        ♾️ Бесконечный цикл (Maximum update depth exceeded)
      </h4>
      
      <div className="info-box warning" style={{ marginBottom: '16px' }}>
        <span className="info-box-icon">💥</span>
        <div className="info-box-content">
          <p>Происходит когда effect вызывает setState, который вызывает рендер, который вызывает effect снова...</p>
        </div>
      </div>

      <CodeBlock code={infiniteCode} language="tsx" />
    </div>
  )
}

function ObjectDependencyExample() {
  const [count, setCount] = useState(0)
  const effectRunsRef = useRef(0)
  const [effectRuns, setEffectRuns] = useState(0)

  const options = { page: 1, limit: 10 }  // Новый объект каждый рендер!

  useEffect(() => {
    effectRunsRef.current++
    setEffectRuns(effectRunsRef.current)
  }, [options]) // eslint-disable-line react-hooks/exhaustive-deps

  const memoizedOptions = useMemo(() => ({ page: 1, limit: 10 }), [])
  void memoizedOptions

  const objectCode = `// ═══════════════════════════════════════════════════════════════
// 📦 ОБЪЕКТЫ В ЗАВИСИМОСТЯХ — коварная ошибка
// Объекты сравниваются по ССЫЛКЕ, не по содержимому!
// ═══════════════════════════════════════════════════════════════

// ⚠️ ВАЖНО: {a: 1} !== {a: 1}  — это РАЗНЫЕ объекты!


// ❌ ПРОБЛЕМА: объект создаётся заново каждый рендер
function Component() {
  const options = { page: 1 };  // Новая ссылка каждый раз!
  
  useEffect(() => {
    fetch(url, options);
  }, [options]);  // 💥 Запускается КАЖДЫЙ рендер
}


// ═══════════════════════════════════════════════════════════════
// ✅ РЕШЕНИЯ
// ═══════════════════════════════════════════════════════════════

// 1️⃣ useMemo для объекта
const options = useMemo(
  () => ({ page, limit }),
  [page, limit]  // Новый объект только когда page/limit изменятся
);


// 2️⃣ Примитивы напрямую в deps
useEffect(() => {
  fetch(url, { page, limit });
}, [page, limit]);  // Сравниваются числа, не объекты


// 3️⃣ Объект вне компонента (если константа)
const OPTIONS = { page: 1 };  // Одна ссылка навсегда`

  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '16px' }}>
      <h4 style={{ color: 'var(--accent-orange)', marginBottom: '12px' }}>
        📦 Объекты и массивы в зависимостях
      </h4>

      <div className="info-box warning" style={{ marginBottom: '16px' }}>
        <span className="info-box-icon">⚠️</span>
        <div className="info-box-content">
          <p>Объекты сравниваются <strong>по ссылке</strong>, не по содержимому!</p>
          <code style={{ display: 'block', marginTop: '8px' }}>{`{a: 1} !== {a: 1}  // true! Разные ссылки`}</code>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px', padding: '12px', background: 'var(--bg-code)', borderRadius: '8px' }}>
        <div>
          <span style={{ color: 'var(--text-secondary)' }}>Effect запустился:</span>
          <strong style={{ color: effectRuns > 1 ? 'var(--accent-orange)' : 'var(--accent-green)', marginLeft: '8px', fontSize: '1.2rem' }}>
            {effectRuns} раз
          </strong>
        </div>
        <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>
          Ре-рендер (count: {count})
        </button>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.9rem' }}>
        👆 Каждый клик — новый рендер. Effect запускается каждый раз, хотя options "не изменился"!
      </p>

      <CodeBlock code={objectCode} language="tsx" />
    </div>
  )
}

function AsyncExample() {
  const [userId, setUserId] = useState(1)
  const [user, setUser] = useState<{ id: number; name: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [...prev.slice(-5), msg])
  }, [])

  useEffect(() => {
    let cancelled = false

    async function fetchUser() {
      setLoading(true)
      addLog(`⏳ Загружаю User ${userId}...`)
      await new Promise(r => setTimeout(r, 1500))
      
      if (!cancelled) {
        setUser({ id: userId, name: `User ${userId}` })
        setLoading(false)
        addLog(`✅ User ${userId} загружен`)
      } else {
        addLog(`🚫 User ${userId} отменён`)
      }
    }

    fetchUser()
    return () => { cancelled = true; addLog(`🔴 Cleanup User ${userId}`) }
  }, [userId, addLog])

  const asyncCode = `// ═══════════════════════════════════════════════════════════════
// ⏳ ASYNC/AWAIT в useEffect — правильный паттерн
// useEffect callback НЕ может быть async!
// Но внутри можно объявить async функцию
// ═══════════════════════════════════════════════════════════════

useEffect(() => {
  // 1️⃣ Флаг для отмены устаревших запросов
  let cancelled = false;
  
  async function fetchData() {
    setLoading(true);
    
    const response = await fetch(\`/api/user/\${userId}\`);
    const data = await response.json();
    
    // 2️⃣ Проверяем что effect не был отменён
    // (userId мог измениться пока ждали ответ)
    if (!cancelled) {
      setUser(data);      // Обновляем только если актуально
      setLoading(false);
    }
  }
  
  fetchData();
  
  // 3️⃣ Cleanup: отменяем если userId изменился
  return () => {
    cancelled = true;
  };
  
}, [userId]);


// ═══════════════════════════════════════════════════════════════
// ❌ ТАК НЕЛЬЗЯ — useEffect не может быть async
// ═══════════════════════════════════════════════════════════════
// useEffect(async () => {  // 💥 Ошибка!
//   await fetchData();
// }, []);`

  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '16px' }}>
      <h4 style={{ color: 'var(--accent-blue)', marginBottom: '12px' }}>
        ⏳ Async/Await в useEffect
      </h4>

      <div className="info-box" style={{ marginBottom: '16px' }}>
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <p><strong>useEffect callback НЕ может быть async!</strong> Но внутри можно объявить и вызвать async функцию.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div className="value-display" style={{ marginBottom: '12px' }}>
            {loading ? <span style={{ color: 'var(--accent-orange)' }}>⏳ Загрузка...</span> : user ? <span style={{ color: 'var(--accent-green)' }}>👤 {user.name}</span> : 'Нет данных'}
          </div>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {[1, 2, 3].map(id => (
              <button key={id} className={`btn ${userId === id ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setUserId(id)}>
                User {id}
              </button>
            ))}
          </div>
          
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            👆 Быстро кликайте по разным кнопкам — старые запросы будут отменены!
          </p>
        </div>

        <div style={{ width: '280px' }}>
          <h5 style={{ marginBottom: '8px' }}>Лог запросов:</h5>
          <div style={{ background: 'var(--bg-code)', borderRadius: '6px', padding: '8px', fontSize: '0.8rem', minHeight: '120px' }}>
            {logs.map((log, i) => (
              <div key={i} style={{ padding: '2px 0', color: log.includes('✅') ? 'var(--accent-green)' : log.includes('🚫') ? 'var(--accent-red)' : log.includes('🔴') ? 'var(--accent-orange)' : 'var(--text-primary)' }}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <CodeBlock code={asyncCode} language="tsx" />
      </div>
    </div>
  )
}
