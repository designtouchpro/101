import { useState, useRef, useCallback, useEffect } from 'react'
import CodeBlock from '../../components/CodeBlock'

interface Task {
  id: number
  name: string
  type: 'micro' | 'macro'
}

interface LogEntry {
  id: number
  text: string
  type: 'sync' | 'micro' | 'macro'
}

export default function MicrotasksMacrotasks() {
  const [microQueue, setMicroQueue] = useState<Task[]>([])
  const [macroQueue, setMacroQueue] = useState<Task[]>([])
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const taskIdRef = useRef(0)

  const code = `console.log('1: Start');

// Макрозадача
setTimeout(() => {
  console.log('2: setTimeout');
}, 0);

// Микрозадача
Promise.resolve().then(() => {
  console.log('3: Promise 1');
}).then(() => {
  console.log('4: Promise 2');
});

// Ещё одна макрозадача
setTimeout(() => {
  console.log('5: setTimeout 2');
}, 0);

// Ещё микрозадача
queueMicrotask(() => {
  console.log('6: queueMicrotask');
});

console.log('7: End');`

  const runDemo = useCallback(async () => {
    setIsRunning(true)
    setMicroQueue([])
    setMacroQueue([])
    setLogs([])
    taskIdRef.current = 0

    const delay = (ms: number) => new Promise(r => setTimeout(r, ms))
    const id = () => taskIdRef.current++

    // 1: Start
    setLogs(prev => [...prev, { id: id(), text: '1: Start', type: 'sync' }])
    await delay(600)

    // setTimeout 1 -> macro queue
    setMacroQueue(prev => [...prev, { id: id(), name: 'setTimeout cb 1', type: 'macro' }])
    await delay(600)

    // Promise -> micro queue
    setMicroQueue(prev => [...prev, { id: id(), name: 'Promise.then 1', type: 'micro' }])
    await delay(600)

    // setTimeout 2 -> macro queue
    setMacroQueue(prev => [...prev, { id: id(), name: 'setTimeout cb 2', type: 'macro' }])
    await delay(600)

    // queueMicrotask -> micro queue
    setMicroQueue(prev => [...prev, { id: id(), name: 'queueMicrotask', type: 'micro' }])
    await delay(600)

    // 7: End
    setLogs(prev => [...prev, { id: id(), text: '7: End', type: 'sync' }])
    await delay(800)

    // --- Синхронный код закончился ---
    // Выполняем ВСЕ микрозадачи

    // Promise 1
    setMicroQueue(prev => prev.slice(1))
    setLogs(prev => [...prev, { id: id(), text: '3: Promise 1', type: 'micro' }])
    // Promise 1 добавляет Promise 2
    setMicroQueue(prev => [...prev, { id: id(), name: 'Promise.then 2', type: 'micro' }])
    await delay(600)

    // queueMicrotask
    setMicroQueue(prev => prev.filter(t => t.name !== 'queueMicrotask'))
    setLogs(prev => [...prev, { id: id(), text: '6: queueMicrotask', type: 'micro' }])
    await delay(600)

    // Promise 2
    setMicroQueue(prev => prev.slice(1))
    setLogs(prev => [...prev, { id: id(), text: '4: Promise 2', type: 'micro' }])
    await delay(600)

    // --- Микрозадачи закончились ---
    // Берём ОДНУ макрозадачу

    // setTimeout 1
    setMacroQueue(prev => prev.slice(1))
    setLogs(prev => [...prev, { id: id(), text: '2: setTimeout', type: 'macro' }])
    await delay(600)

    // --- Снова проверяем микрозадачи (пусто) ---
    // Берём следующую макрозадачу

    // setTimeout 2
    setMacroQueue(prev => prev.slice(1))
    setLogs(prev => [...prev, { id: id(), text: '5: setTimeout 2', type: 'macro' }])
    await delay(400)

    setIsRunning(false)
  }, [])

  const reset = () => {
    setMicroQueue([])
    setMacroQueue([])
    setLogs([])
    setIsRunning(false)
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>⚡ Microtasks vs Macrotasks</h1>
        <p>
          JavaScript разделяет асинхронные задачи на два типа: микрозадачи (высокий приоритет) 
          и макрозадачи (обычный приоритет). Понимание разницы критично для работы с async кодом.
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Демонстрация приоритетов</span>
        </div>
        <CodeBlock code={code} />
        <div className="controls" style={{ marginTop: '16px' }}>
          <button 
            className="btn btn-primary" 
            onClick={runDemo}
            disabled={isRunning}
          >
            ▶️ Запустить
          </button>
          <button className="btn btn-secondary" onClick={reset}>
            🔄 Сброс
          </button>
        </div>
      </div>

      <div className="event-loop-container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="queue-container microtask">
            <h3>⚡ Microtask Queue (высокий приоритет)</h3>
            <div className="queue-items">
              {microQueue.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '8px' }}>
                  Очередь пуста
                </div>
              ) : (
                microQueue.map((task) => (
                  <div key={task.id} className="queue-item microtask">
                    {task.name}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="queue-container">
            <h3>🕐 Macrotask Queue (обычный приоритет)</h3>
            <div className="queue-items">
              {macroQueue.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '8px' }}>
                  Очередь пуста
                </div>
              ) : (
                macroQueue.map((task) => (
                  <div key={task.id} className="queue-item">
                    {task.name}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="console-output" style={{ minHeight: '350px' }}>
          <h3>💻 Console Output</h3>
          {logs.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Нажмите "Запустить"
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className={`console-line ${log.type === 'micro' ? 'microtask' : log.type === 'macro' ? 'macrotask' : 'sync'}`}>
                <span style={{ opacity: 0.5 }}>{'>'}</span>
                {log.text}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card">
        <h3>📊 Сравнение типов задач</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
          <div>
            <h4 style={{ color: 'var(--accent-purple)', marginBottom: '12px' }}>⚡ Microtasks</h4>
            <ul className="info-list">
              <li>Promise.then(), .catch(), .finally()</li>
              <li>queueMicrotask()</li>
              <li>MutationObserver</li>
              <li>process.nextTick() (Node.js)</li>
            </ul>
            <div className="info-box" style={{ marginTop: '12px' }}>
              <strong>Выполняются ВСЕ</strong> микрозадачи перед следующей макрозадачей
            </div>
          </div>
          <div>
            <h4 style={{ color: 'var(--accent-green)', marginBottom: '12px' }}>🕐 Macrotasks</h4>
            <ul className="info-list">
              <li>setTimeout()</li>
              <li>setInterval()</li>
              <li>setImmediate() (Node.js)</li>
              <li>I/O operations</li>
              <li>UI rendering</li>
            </ul>
            <div className="info-box" style={{ marginTop: '12px' }}>
              <strong>Выполняется ОДНА</strong> макрозадача, затем все микрозадачи
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>🔄 Алгоритм Event Loop</h3>
        <div style={{ marginTop: '16px' }}>
          <div className="timeline">
            <div className="timeline-item sync">
              <strong>1. Выполнить весь синхронный код</strong>
            </div>
            <div className="timeline-item microtask">
              <strong>2. Выполнить ВСЕ микрозадачи</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Включая те, что добавились во время выполнения
              </p>
            </div>
            <div className="timeline-item macrotask">
              <strong>3. Выполнить ОДНУ макрозадачу</strong>
            </div>
            <div className="timeline-item">
              <strong>4. Render (при необходимости)</strong>
            </div>
            <div className="timeline-item">
              <strong>5. Вернуться к шагу 2</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>⚠️ Важный нюанс</h3>
        <CodeBlock code={`// Если микрозадача создаёт новую микрозадачу,
// она выполнится ДО любых макрозадач!

Promise.resolve().then(() => {
  console.log('micro 1');
  Promise.resolve().then(() => {
    console.log('micro 2'); // Выполнится до setTimeout!
  });
});

setTimeout(() => {
  console.log('macro'); // Выполнится последним
}, 0);

// Вывод: micro 1, micro 2, macro`} />
      </div>
    </div>
  )
}
