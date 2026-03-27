import { useState, useCallback, useRef } from 'react'

interface Task {
  id: number
  name: string
  type: 'sync' | 'microtask' | 'macrotask' | 'webapi'
  code?: string
}

interface LogEntry {
  id: number
  text: string
  type: 'sync' | 'microtask' | 'macrotask' | 'info' | 'error'
  timestamp: number
}

const presetExamples = [
  {
    name: '🎯 Базовый',
    code: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');`
  },
  {
    name: '⚡ Микро в микро',
    code: `console.log('start');

Promise.resolve().then(() => {
  console.log('micro 1');
  Promise.resolve().then(() => {
    console.log('micro 2');
  });
});

setTimeout(() => console.log('macro'), 0);
console.log('end');`
  },
  {
    name: '🔄 Promise + Timer',
    code: `console.log('start');

const promise1 = Promise.resolve().then(() => {
  console.log('promise1');

  const timer2 = setTimeout(() => {
    console.log('timer2');
  });
});

const timer1 = setTimeout(() => {
  console.log('timer1');

  const promise = Promise.resolve().then(() => {
    console.log('promise2');
  });
});

console.log('end');`
  },
  {
    name: '🧩 Scope + Event Loop',
    code: `var a = 1;

(function test (b = a) {
  console.log('1:', b);

  var a = 2;
  console.log('2:', a);

  setTimeout(() => {
    console.log('3:', a, b);
  }, 0);

  Promise
    .resolve()
    .then(() => {
      console.log('4:', a, b);

      setTimeout(() => {
        console.log('5:', a, b);
      }, 0);
    })
    .then(() => {
      console.log('6:', a, b);
    });

  const p = new Promise((resolve, reject) => {
    console.log('7:', a, b);
    a = 3;
    setTimeout(() => {
      console.log('8:', a, b);
      resolve([a, b]);
    }, 0);
  });

  p.then((value) => {
    console.log('9:', value.join(' '));
  });
})();

console.log('11:', a);`
  },
  {
    name: '🎭 async/await',
    code: `async function foo() {
  console.log('foo start');
  await Promise.resolve();
  console.log('foo end');
}

console.log('start');
foo();
console.log('end');`
  },
  {
    name: '⏱️ Chained Promises',
    code: `setTimeout(() => console.log('timeout 1'), 0);
setTimeout(() => console.log('timeout 2'), 0);

Promise.resolve()
  .then(() => console.log('promise 1'))
  .then(() => console.log('promise 2'));

console.log('sync');`
  },
  {
    name: '🔥 Nested Callbacks',
    code: `console.log('script start');

setTimeout(() => {
  console.log('setTimeout 1');
  Promise.resolve().then(() => {
    console.log('promise inside setTimeout');
  });
}, 0);

Promise.resolve()
  .then(() => {
    console.log('promise 1');
    return Promise.resolve();
  })
  .then(() => {
    console.log('promise 2');
  });

setTimeout(() => {
  console.log('setTimeout 2');
}, 0);

console.log('script end');`
  },
]

export default function EventLoopInteractive() {
  const [code, setCode] = useState(presetExamples[0].code)
  const [isRunning, setIsRunning] = useState(false)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [callStack, setCallStack] = useState<Task[]>([])
  const [microtaskQueue, setMicrotaskQueue] = useState<Task[]>([])
  const [macrotaskQueue, setMacrotaskQueue] = useState<Task[]>([])
  const [webApis, setWebApis] = useState<Task[]>([])
  const [currentPhase, setCurrentPhase] = useState<string>('')
  const [speed, setSpeed] = useState(800)
  const taskIdRef = useRef(0)
  const logIdRef = useRef(0)

  const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

  const addLog = useCallback((text: string, type: LogEntry['type']) => {
    setLogs(prev => [...prev, {
      id: logIdRef.current++,
      text,
      type,
      timestamp: Date.now()
    }])
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setLogs([])
    setCallStack([])
    setMicrotaskQueue([])
    setMacrotaskQueue([])
    setWebApis([])
    setCurrentPhase('')
    taskIdRef.current = 0
    logIdRef.current = 0
  }, [])

  const runCode = useCallback(async () => {
    reset()
    await delay(100)
    setIsRunning(true)

    const id = () => taskIdRef.current++

    // Простой парсер для визуализации
    // Это упрощённая симуляция, не настоящий интерпретатор
    
    const lines = code.split('\n').filter(l => l.trim())
    const syncLogs: string[] = []
    const microTasks: { code: string; logs: string[] }[] = []
    const macroTasks: { code: string; logs: string[]; delay: number }[] = []

    // Парсим код (очень упрощённо)
    let inPromise = false
    let inTimeout = false
    let currentMicro: { code: string; logs: string[] } | null = null
    let currentMacro: { code: string; logs: string[]; delay: number } | null = null
    let braceCount = 0

    for (const line of lines) {
      const trimmed = line.trim()
      
      if (trimmed.includes('setTimeout')) {
        inTimeout = true
        const delayMatch = trimmed.match(/,\s*(\d+)\s*\)/)
        currentMacro = { code: '', logs: [], delay: delayMatch ? parseInt(delayMatch[1]) : 0 }
        braceCount = (trimmed.match(/{/g) || []).length
      } else if (trimmed.includes('.then(') || trimmed.includes('Promise.resolve()')) {
        inPromise = true
        currentMicro = { code: '', logs: [] }
        braceCount = (trimmed.match(/{/g) || []).length
      } else if (trimmed.includes('await')) {
        // После await код становится микрозадачей
        inPromise = true
        currentMicro = { code: '', logs: [] }
      }

      if (inTimeout && currentMacro) {
        currentMacro.code += line + '\n'
        braceCount += (trimmed.match(/{/g) || []).length - (trimmed.match(/}/g) || []).length
        
        const logMatch = trimmed.match(/console\.log\(['"](.*?)['"]\)/)
        if (logMatch) {
          currentMacro.logs.push(logMatch[1])
        }
        
        if (braceCount <= 0 || trimmed.includes('});')) {
          macroTasks.push(currentMacro)
          inTimeout = false
          currentMacro = null
        }
      } else if (inPromise && currentMicro) {
        currentMicro.code += line + '\n'
        braceCount += (trimmed.match(/{/g) || []).length - (trimmed.match(/}/g) || []).length
        
        const logMatch = trimmed.match(/console\.log\(['"](.*?)['"]\)/)
        if (logMatch) {
          currentMicro.logs.push(logMatch[1])
        }
        
        if (braceCount <= 0 || trimmed.includes('});') || trimmed.includes('})')) {
          microTasks.push(currentMicro)
          inPromise = false
          currentMicro = null
        }
      } else {
        const logMatch = trimmed.match(/console\.log\(['"](.*?)['"]\)/)
        if (logMatch && !inPromise && !inTimeout) {
          syncLogs.push(logMatch[1])
        }
      }
    }

    // Выполняем синхронный код
    setCurrentPhase('📝 Выполнение синхронного кода')
    setCallStack([{ id: id(), name: 'main()', type: 'sync' }])
    await delay(speed)

    for (const log of syncLogs) {
      setCallStack(prev => [...prev, { id: id(), name: `console.log('${log}')`, type: 'sync' }])
      await delay(speed / 2)
      addLog(log, 'sync')
      setCallStack(prev => prev.slice(0, -1))
      await delay(speed / 2)
    }

    // Регистрируем таймеры
    for (const _macro of macroTasks) {
      setWebApis(prev => [...prev, { id: id(), name: `Timer (${_macro.delay}ms)`, type: 'webapi' }])
      await delay(speed / 3)
    }

    // Регистрируем промисы
    for (const _micro of microTasks) {
      setMicrotaskQueue(prev => [...prev, { id: id(), name: '.then() callback', type: 'microtask' }])
      await delay(speed / 3)
    }

    setCallStack([])
    await delay(speed / 2)

    // Таймеры "срабатывают"
    setWebApis([])
    for (const _macro of macroTasks) {
      setMacrotaskQueue(prev => [...prev, { id: id(), name: 'setTimeout cb', type: 'macrotask' }])
    }

    // Выполняем микрозадачи
    if (microTasks.length > 0) {
      setCurrentPhase('⚡ Выполнение Microtask Queue')
      await delay(speed)
      
      for (const micro of microTasks) {
        setCallStack([{ id: id(), name: '.then() callback', type: 'microtask' }])
        await delay(speed / 2)
        
        for (const log of micro.logs) {
          addLog(log, 'microtask')
          await delay(speed / 3)
        }
        
        setCallStack([])
        setMicrotaskQueue(prev => prev.slice(1))
        await delay(speed / 2)
      }
    }

    // Выполняем макрозадачи
    if (macroTasks.length > 0) {
      setCurrentPhase('🕐 Выполнение Macrotask Queue')
      await delay(speed)
      
      for (const macro of macroTasks) {
        setCallStack([{ id: id(), name: 'setTimeout callback', type: 'macrotask' }])
        await delay(speed / 2)
        
        for (const log of macro.logs) {
          addLog(log, 'macrotask')
          await delay(speed / 3)
        }
        
        setCallStack([])
        setMacrotaskQueue(prev => prev.slice(1))
        await delay(speed / 2)
      }
    }

    setCurrentPhase('✅ Выполнение завершено')
    setIsRunning(false)
  }, [code, speed, addLog, reset])

  const runRealCode = useCallback(() => {
    reset()
    
    // Перехватываем console.log
    const originalLog = console.log
    const logs: { text: string; time: number }[] = []
    const startTime = Date.now()
    
    console.log = (...args) => {
      logs.push({ text: args.join(' '), time: Date.now() - startTime })
      originalLog.apply(console, args)
    }

    try {
      // Выполняем код
      eval(code)
      
      // Даём время на выполнение async кода
      setTimeout(() => {
        console.log = originalLog
        
        // Отображаем логи с задержкой
        logs.forEach((log, i) => {
          setTimeout(() => {
            addLog(log.text, log.time < 10 ? 'sync' : 'macrotask')
          }, i * 100)
        })
      }, 1000)
    } catch (e: any) {
      console.log = originalLog
      addLog(`Error: ${e.message}`, 'error')
    }
  }, [code, addLog, reset])

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔬 Event Loop Песочница</h1>
        <p>
          Введите свой код и наблюдайте, как Event Loop обрабатывает синхронные операции, 
          промисы и таймеры. Экспериментируйте!
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Готовые примеры</span>
        </div>
        <div className="controls" style={{ flexWrap: 'wrap' }}>
          {presetExamples.map((ex, i) => (
            <button
              key={i}
              className="btn btn-secondary"
              onClick={() => { reset(); setCode(ex.code); }}
              style={{ fontSize: '0.85rem' }}
            >
              {ex.name}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">✏️ Ваш код</span>
          <div className="speed-control">
            <label>Скорость:</label>
            <input
              type="range"
              className="speed-slider"
              min="200"
              max="1500"
              step="100"
              value={1700 - speed}
              onChange={(e) => setSpeed(1700 - Number(e.target.value))}
            />
          </div>
        </div>
        
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            width: '100%',
            minHeight: '200px',
            background: '#011627',
            color: '#d6deeb',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '16px',
            fontFamily: "'Fira Code', monospace",
            fontSize: '0.9rem',
            lineHeight: '1.6',
            resize: 'vertical'
          }}
          spellCheck={false}
        />

        <div className="controls" style={{ marginTop: '16px' }}>
          <button 
            className="btn btn-primary" 
            onClick={runCode}
            disabled={isRunning}
          >
            🎬 Визуализировать
          </button>
          <button 
            className="btn btn-success" 
            onClick={runRealCode}
          >
            ▶️ Выполнить реально
          </button>
          <button className="btn btn-secondary" onClick={reset}>
            🔄 Сброс
          </button>
        </div>

        {currentPhase && (
          <div className="info-box" style={{ marginTop: '16px' }}>
            <strong>{currentPhase}</strong>
          </div>
        )}
      </div>

      <div className="event-loop-container">
        <div className="event-loop-visual">
          {/* Call Stack */}
          <div className="stack-container">
            <h3>📚 Call Stack</h3>
            <div className="stack-items">
              {callStack.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '8px' }}>
                  Пусто
                </div>
              ) : (
                callStack.map((task) => (
                  <div key={task.id} className={`stack-item ${task.type === 'microtask' ? 'microtask' : ''}`}>
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
                  Нет таймеров
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
            <h3>⚡ Microtask Queue</h3>
            <div className="queue-items">
              {microtaskQueue.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '8px' }}>
                  Пусто
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
            <h3>🕐 Macrotask Queue</h3>
            <div className="queue-items">
              {macrotaskQueue.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '8px' }}>
                  Пусто
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
            <h3>💻 Console</h3>
            {logs.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Ожидание вывода...
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className={`console-line ${log.type}`}>
                  <span style={{ opacity: 0.5 }}>{'>'}</span>
                  {log.text}
                  <span style={{ marginLeft: 'auto', fontSize: '0.7rem', opacity: 0.5 }}>
                    {log.type === 'sync' ? '(sync)' : log.type === 'microtask' ? '(micro)' : '(macro)'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>🎯 Попробуйте сами!</h3>
        <div style={{ display: 'grid', gap: '12px', marginTop: '16px' }}>
          <div className="info-box">
            <strong>Задача 1:</strong> Напишите код, где <code>Promise.then()</code> выведет 
            сообщение раньше <code>setTimeout(..., 0)</code>
          </div>
          <div className="info-box">
            <strong>Задача 2:</strong> Создайте ситуацию, где микрозадача создаёт ещё одну микрозадачу
          </div>
          <div className="info-box">
            <strong>Задача 3:</strong> Используйте <code>async/await</code> и предскажите порядок вывода
          </div>
        </div>
      </div>
    </div>
  )
}
