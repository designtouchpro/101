import { useState, useEffect, useCallback, useRef } from 'react'
import CodeBlock from '../../components/CodeBlock'

interface Task {
  id: number
  name: string
  type: 'sync' | 'microtask' | 'macrotask' | 'webapi'
  delay?: number
  progress?: number
}

interface ConsoleLog {
  id: number
  text: string
  type: 'sync' | 'microtask' | 'macrotask' | 'callback'
}

const examples = [
  {
    name: 'Базовый пример',
    code: `console.log('1: Синхронный код');

setTimeout(() => {
  console.log('2: setTimeout callback');
}, 0);

Promise.resolve().then(() => {
  console.log('3: Promise then');
});

console.log('4: Синхронный код');`,
    steps: [
      { action: 'push', target: 'stack', item: { name: 'console.log("1")', type: 'sync' }, log: { text: '1: Синхронный код', type: 'sync' } },
      { action: 'pop', target: 'stack' },
      { action: 'push', target: 'stack', item: { name: 'setTimeout()', type: 'sync' } },
      { action: 'push', target: 'webapi', item: { name: 'Timer (0ms)', type: 'webapi', delay: 0 } },
      { action: 'pop', target: 'stack' },
      { action: 'push', target: 'stack', item: { name: 'Promise.resolve()', type: 'sync' } },
      { action: 'push', target: 'microtask', item: { name: '.then() callback', type: 'microtask' } },
      { action: 'pop', target: 'stack' },
      { action: 'push', target: 'stack', item: { name: 'console.log("4")', type: 'sync' }, log: { text: '4: Синхронный код', type: 'sync' } },
      { action: 'pop', target: 'stack' },
      { action: 'move', from: 'webapi', to: 'macrotask', item: { name: 'setTimeout callback', type: 'macrotask' } },
      { action: 'note', text: '📌 Стек пуст! Проверяем Microtask Queue...' },
      { action: 'push', target: 'stack', item: { name: '.then() callback', type: 'microtask' }, log: { text: '3: Promise then', type: 'microtask' } },
      { action: 'pop', target: 'stack' },
      { action: 'pop', target: 'microtask' },
      { action: 'note', text: '📌 Microtask Queue пуста! Проверяем Macrotask Queue...' },
      { action: 'push', target: 'stack', item: { name: 'setTimeout callback', type: 'macrotask' }, log: { text: '2: setTimeout callback', type: 'macrotask' } },
      { action: 'pop', target: 'stack' },
      { action: 'pop', target: 'macrotask' },
    ]
  },
  {
    name: 'Вложенные промисы',
    code: `console.log('Start');

setTimeout(() => console.log('Timeout 1'), 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
    return Promise.resolve();
  })
  .then(() => console.log('Promise 2'));

setTimeout(() => console.log('Timeout 2'), 0);

console.log('End');`,
    steps: [
      { action: 'push', target: 'stack', item: { name: 'console.log("Start")', type: 'sync' }, log: { text: 'Start', type: 'sync' } },
      { action: 'pop', target: 'stack' },
      { action: 'push', target: 'stack', item: { name: 'setTimeout()', type: 'sync' } },
      { action: 'push', target: 'webapi', item: { name: 'Timer 1 (0ms)', type: 'webapi', delay: 0 } },
      { action: 'pop', target: 'stack' },
      { action: 'push', target: 'stack', item: { name: 'Promise.resolve()', type: 'sync' } },
      { action: 'push', target: 'microtask', item: { name: '.then() #1', type: 'microtask' } },
      { action: 'pop', target: 'stack' },
      { action: 'push', target: 'stack', item: { name: 'setTimeout()', type: 'sync' } },
      { action: 'push', target: 'webapi', item: { name: 'Timer 2 (0ms)', type: 'webapi', delay: 0 } },
      { action: 'pop', target: 'stack' },
      { action: 'push', target: 'stack', item: { name: 'console.log("End")', type: 'sync' }, log: { text: 'End', type: 'sync' } },
      { action: 'pop', target: 'stack' },
      { action: 'move', from: 'webapi', to: 'macrotask', item: { name: 'Timeout 1 cb', type: 'macrotask' } },
      { action: 'move', from: 'webapi', to: 'macrotask', item: { name: 'Timeout 2 cb', type: 'macrotask' } },
      { action: 'note', text: '📌 Синхронный код выполнен! Проверяем Microtask Queue...' },
      { action: 'push', target: 'stack', item: { name: '.then() #1', type: 'microtask' }, log: { text: 'Promise 1', type: 'microtask' } },
      { action: 'push', target: 'microtask', item: { name: '.then() #2', type: 'microtask' } },
      { action: 'pop', target: 'stack' },
      { action: 'pop', target: 'microtask' },
      { action: 'push', target: 'stack', item: { name: '.then() #2', type: 'microtask' }, log: { text: 'Promise 2', type: 'microtask' } },
      { action: 'pop', target: 'stack' },
      { action: 'pop', target: 'microtask' },
      { action: 'note', text: '📌 Microtask Queue пуста! Берём задачу из Macrotask Queue...' },
      { action: 'push', target: 'stack', item: { name: 'Timeout 1 cb', type: 'macrotask' }, log: { text: 'Timeout 1', type: 'macrotask' } },
      { action: 'pop', target: 'stack' },
      { action: 'pop', target: 'macrotask' },
      { action: 'push', target: 'stack', item: { name: 'Timeout 2 cb', type: 'macrotask' }, log: { text: 'Timeout 2', type: 'macrotask' } },
      { action: 'pop', target: 'stack' },
      { action: 'pop', target: 'macrotask' },
    ]
  },
  {
    name: 'Микрозадача создаёт микрозадачу',
    code: `console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve()
  .then(() => {
    console.log('3');
    Promise.resolve().then(() => {
      console.log('4');
    });
  });

console.log('5');`,
    steps: [
      { action: 'push', target: 'stack', item: { name: 'console.log("1")', type: 'sync' }, log: { text: '1', type: 'sync' } },
      { action: 'pop', target: 'stack' },
      { action: 'push', target: 'stack', item: { name: 'setTimeout()', type: 'sync' } },
      { action: 'push', target: 'webapi', item: { name: 'Timer (0ms)', type: 'webapi', delay: 0 } },
      { action: 'pop', target: 'stack' },
      { action: 'push', target: 'stack', item: { name: 'Promise.resolve()', type: 'sync' } },
      { action: 'push', target: 'microtask', item: { name: 'outer .then()', type: 'microtask' } },
      { action: 'pop', target: 'stack' },
      { action: 'push', target: 'stack', item: { name: 'console.log("5")', type: 'sync' }, log: { text: '5', type: 'sync' } },
      { action: 'pop', target: 'stack' },
      { action: 'move', from: 'webapi', to: 'macrotask', item: { name: 'setTimeout cb', type: 'macrotask' } },
      { action: 'note', text: '📌 Синхронный код завершён! Обрабатываем микрозадачи...' },
      { action: 'push', target: 'stack', item: { name: 'outer .then()', type: 'microtask' }, log: { text: '3', type: 'microtask' } },
      { action: 'push', target: 'microtask', item: { name: 'inner .then()', type: 'microtask' } },
      { action: 'pop', target: 'stack' },
      { action: 'pop', target: 'microtask' },
      { action: 'note', text: '📌 Новая микрозадача! Обрабатываем её до макрозадач...' },
      { action: 'push', target: 'stack', item: { name: 'inner .then()', type: 'microtask' }, log: { text: '4', type: 'microtask' } },
      { action: 'pop', target: 'stack' },
      { action: 'pop', target: 'microtask' },
      { action: 'note', text: '📌 Все микрозадачи выполнены! Теперь макрозадачи...' },
      { action: 'push', target: 'stack', item: { name: 'setTimeout cb', type: 'macrotask' }, log: { text: '2', type: 'macrotask' } },
      { action: 'pop', target: 'stack' },
      { action: 'pop', target: 'macrotask' },
    ]
  },
]

export default function EventLoopVisualizer() {
  const [selectedExample, setSelectedExample] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const [speed, setSpeed] = useState(1000)
  const [callStack, setCallStack] = useState<Task[]>([])
  const [webApis, setWebApis] = useState<Task[]>([])
  const [microtaskQueue, setMicrotaskQueue] = useState<Task[]>([])
  const [macrotaskQueue, setMacrotaskQueue] = useState<Task[]>([])
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([])
  const [note, setNote] = useState('')
  const taskIdRef = useRef(0)
  const timeoutRef = useRef<number | null>(null)

  const example = examples[selectedExample]

  const reset = useCallback(() => {
    setIsPlaying(false)
    setCurrentStep(-1)
    setCallStack([])
    setWebApis([])
    setMicrotaskQueue([])
    setMacrotaskQueue([])
    setConsoleLogs([])
    setNote('')
    taskIdRef.current = 0
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const executeStep = useCallback((stepIndex: number) => {
    const step = example.steps[stepIndex]
    if (!step) return

    setNote('')

    const createTask = (item: any): Task => ({
      id: taskIdRef.current++,
      name: item.name,
      type: item.type,
      delay: item.delay,
    })

    switch (step.action) {
      case 'push':
        if (step.target === 'stack') {
          setCallStack(prev => [...prev, createTask(step.item)])
          if (step.log) {
            setConsoleLogs(prev => [...prev, { id: taskIdRef.current++, text: step.log.text, type: step.log.type as any }])
          }
        } else if (step.target === 'microtask') {
          setMicrotaskQueue(prev => [...prev, createTask(step.item)])
        } else if (step.target === 'macrotask') {
          setMacrotaskQueue(prev => [...prev, createTask(step.item)])
        } else if (step.target === 'webapi') {
          setWebApis(prev => [...prev, createTask(step.item)])
        }
        break
      case 'pop':
        if (step.target === 'stack') {
          setCallStack(prev => prev.slice(0, -1))
        } else if (step.target === 'microtask') {
          setMicrotaskQueue(prev => prev.slice(1))
        } else if (step.target === 'macrotask') {
          setMacrotaskQueue(prev => prev.slice(1))
        }
        break
      case 'move':
        if (step.from === 'webapi') {
          setWebApis(prev => prev.slice(1))
          if (step.to === 'macrotask') {
            setMacrotaskQueue(prev => [...prev, createTask(step.item)])
          }
        }
        break
      case 'note':
        setNote(step.text ?? '')
        break
    }
  }, [example.steps])

  useEffect(() => {
    if (isPlaying && currentStep < example.steps.length - 1) {
      timeoutRef.current = window.setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, speed)
    } else if (currentStep >= example.steps.length - 1) {
      setIsPlaying(false)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isPlaying, currentStep, speed, example.steps.length])

  useEffect(() => {
    if (currentStep >= 0) {
      executeStep(currentStep)
    }
  }, [currentStep, executeStep])

  const handlePlay = () => {
    if (currentStep >= example.steps.length - 1) {
      reset()
      setTimeout(() => {
        setIsPlaying(true)
        setCurrentStep(0)
      }, 100)
    } else {
      setIsPlaying(true)
      if (currentStep === -1) {
        setCurrentStep(0)
      }
    }
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleStep = () => {
    if (currentStep < example.steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleExampleChange = (index: number) => {
    reset()
    setSelectedExample(index)
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔄 Event Loop Визуализатор</h1>
        <p>
          Наблюдайте за работой Event Loop в реальном времени. Смотрите как задачи 
          перемещаются между Call Stack, Web APIs и очередями задач.
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Выберите пример</span>
        </div>
        <div className="controls">
          {examples.map((ex, i) => (
            <button
              key={i}
              className={`btn ${selectedExample === i ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleExampleChange(i)}
            >
              {ex.name}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Код</span>
          <div className="speed-control">
            <label>Скорость:</label>
            <input
              type="range"
              className="speed-slider"
              min="200"
              max="2000"
              step="100"
              value={2200 - speed}
              onChange={(e) => setSpeed(2200 - Number(e.target.value))}
            />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {speed < 500 ? '🚀' : speed < 1000 ? '🏃' : speed < 1500 ? '🚶' : '🐢'}
            </span>
          </div>
        </div>
        <CodeBlock code={example.code} />
        <div className="controls" style={{ marginTop: '16px' }}>
          {!isPlaying ? (
            <button className="btn btn-primary" onClick={handlePlay}>
              ▶️ {currentStep >= example.steps.length - 1 ? 'Перезапустить' : 'Запустить'}
            </button>
          ) : (
            <button className="btn btn-warning" onClick={handlePause}>
              ⏸️ Пауза
            </button>
          )}
          <button 
            className="btn btn-secondary" 
            onClick={handleStep}
            disabled={isPlaying || currentStep >= example.steps.length - 1}
          >
            ⏭️ Шаг
          </button>
          <button className="btn btn-danger" onClick={reset}>
            🔄 Сброс
          </button>
        </div>
        <div style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Шаг: {Math.max(0, currentStep + 1)} / {example.steps.length}
        </div>
      </div>

      {note && (
        <div className="info-box" style={{ animation: 'slideIn 0.3s ease-out' }}>
          <strong>{note}</strong>
        </div>
      )}

      <div className="event-loop-container">
        <div className="event-loop-visual">
          {/* Call Stack */}
          <div className="stack-container">
            <h3>📚 Call Stack</h3>
            <div className="stack-items">
              {callStack.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '8px' }}>
                  Стек пуст
                </div>
              ) : (
                callStack.map((task) => (
                  <div 
                    key={task.id} 
                    className={`stack-item ${task === callStack[callStack.length - 1] ? 'executing' : ''}`}
                  >
                    {task.name}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Web APIs */}
          <div className="web-apis-container">
            <h3>🌐 Web APIs</h3>
            <div className="queue-items">
              {webApis.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '8px' }}>
                  Нет активных таймеров
                </div>
              ) : (
                webApis.map((task) => (
                  <div key={task.id} className="web-api-item">
                    {task.name}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="event-loop-visual">
          {/* Microtask Queue */}
          <div className="queue-container microtask">
            <h3>⚡ Microtask Queue (Promise)</h3>
            <div className="queue-items">
              {microtaskQueue.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '8px' }}>
                  Очередь пуста
                </div>
              ) : (
                microtaskQueue.map((task) => (
                  <div key={task.id} className="queue-item microtask">
                    {task.name}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Macrotask Queue */}
          <div className="queue-container">
            <h3>🕐 Macrotask Queue (setTimeout)</h3>
            <div className="queue-items">
              {macrotaskQueue.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '8px' }}>
                  Очередь пуста
                </div>
              ) : (
                macrotaskQueue.map((task) => (
                  <div key={task.id} className="queue-item">
                    {task.name}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Console */}
          <div className="console-output">
            <h3>💻 Console Output</h3>
            {consoleLogs.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Консоль пуста
              </div>
            ) : (
              consoleLogs.map((log) => (
                <div key={log.id} className={`console-line ${log.type}`}>
                  <span style={{ opacity: 0.5 }}>{'>'}</span>
                  {log.text}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>📖 Как работает Event Loop?</h3>
        <div style={{ marginTop: '16px' }}>
          <div className="timeline">
            <div className="timeline-item sync">
              <strong>1. Синхронный код</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                Весь синхронный код выполняется первым. Каждый вызов функции добавляется в Call Stack.
              </p>
            </div>
            <div className="timeline-item">
              <strong>2. Web APIs</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                setTimeout, fetch, addEventListener — браузерные API работают в отдельных потоках.
              </p>
            </div>
            <div className="timeline-item microtask">
              <strong>3. Microtask Queue</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                Promise callbacks, queueMicrotask. Выполняются ВСЕ микрозадачи перед следующей макрозадачей.
              </p>
            </div>
            <div className="timeline-item macrotask">
              <strong>4. Macrotask Queue</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                setTimeout, setInterval, I/O. Выполняется ОДНА макрозадача, затем снова проверяются микрозадачи.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
