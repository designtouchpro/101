import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

interface StackFrame {
  id: number
  name: string
  line?: number
}

export default function CallStackDemo() {
  const [stack, setStack] = useState<StackFrame[]>([])
  const [output, setOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)

  const code = `function multiply(a, b) {
  return a * b;
}

function square(n) {
  return multiply(n, n);
}

function printSquare(n) {
  const result = square(n);
  console.log(result);
}

printSquare(5);`

  const steps = [
    { action: 'push', frame: { name: 'main()', line: 14 }, log: null },
    { action: 'push', frame: { name: 'printSquare(5)', line: 9 }, log: null },
    { action: 'push', frame: { name: 'square(5)', line: 5 }, log: null },
    { action: 'push', frame: { name: 'multiply(5, 5)', line: 1 }, log: null },
    { action: 'pop', frame: null, log: 'multiply() возвращает 25' },
    { action: 'pop', frame: null, log: 'square() возвращает 25' },
    { action: 'log', frame: null, log: '25' },
    { action: 'pop', frame: null, log: 'printSquare() завершена' },
    { action: 'pop', frame: null, log: 'Программа завершена' },
  ]

  const runDemo = async () => {
    setIsRunning(true)
    setStack([])
    setOutput([])
    setCurrentStep(-1)

    let frameId = 0

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i)
      const step = steps[i]
      
      await new Promise(resolve => setTimeout(resolve, 800))

      if (step.action === 'push' && step.frame) {
        setStack(prev => [...prev, { id: frameId++, ...step.frame! }])
      } else if (step.action === 'pop') {
        setStack(prev => prev.slice(0, -1))
      }
      
      if (step.log) {
        setOutput(prev => [...prev, step.log!])
      }
    }

    setIsRunning(false)
  }

  const reset = () => {
    setStack([])
    setOutput([])
    setCurrentStep(-1)
    setIsRunning(false)
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📚 Call Stack</h1>
        <p>
          Call Stack (стек вызовов) — это структура данных, которая отслеживает 
          выполнение функций в программе. Работает по принципу LIFO (Last In, First Out).
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Демонстрация работы стека</span>
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
        <div className="stack-container" style={{ minHeight: '300px' }}>
          <h3>📚 Call Stack</h3>
          <div className="stack-items">
            {stack.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '8px' }}>
                Стек пуст
              </div>
            ) : (
              stack.map((frame, index) => (
                <div 
                  key={frame.id} 
                  className={`stack-item ${index === stack.length - 1 ? 'executing' : ''}`}
                  style={{ 
                    opacity: index === stack.length - 1 ? 1 : 0.7 
                  }}
                >
                  <span>{frame.name}</span>
                  {frame.line && (
                    <span style={{ opacity: 0.6, marginLeft: '8px', fontSize: '0.75rem' }}>
                      строка {frame.line}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="console-output" style={{ minHeight: '300px' }}>
          <h3>📝 Лог выполнения</h3>
          {output.map((line, i) => (
            <div key={i} className="console-line sync">
              {line}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>🎯 Ключевые концепции</h3>
        <div style={{ marginTop: '16px', display: 'grid', gap: '16px' }}>
          <div className="info-box">
            <h4>🔷 LIFO (Last In, First Out)</h4>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              Последняя добавленная функция выполняется первой. Как стопка тарелок — 
              ставите сверху, берёте тоже сверху.
            </p>
          </div>

          <div className="info-box warning">
            <h4>⚠️ Stack Overflow</h4>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              Если функции вызывают друг друга бесконечно (рекурсия без выхода), 
              стек переполняется и браузер выдаёт ошибку "Maximum call stack size exceeded".
            </p>
          </div>

          <div className="info-box success">
            <h4>✅ Однопоточность</h4>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              JavaScript имеет один Call Stack, поэтому выполняет код синхронно, 
              по одной операции за раз. Асинхронность достигается через Event Loop.
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>❌ Пример Stack Overflow</h3>
        <CodeBlock code={`function infinite() {
  return infinite(); // Рекурсия без выхода
}

infinite();
// Uncaught RangeError: Maximum call stack size exceeded`} />
        <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
          Каждый вызов <code>infinite()</code> добавляет новый фрейм в стек, 
          но никогда не удаляет — стек растёт до переполнения.
        </p>
      </div>

      <div className="card">
        <h3>✅ Правильная рекурсия</h3>
        <CodeBlock code={`function factorial(n) {
  if (n <= 1) return 1;  // Базовый случай — выход из рекурсии
  return n * factorial(n - 1);
}

factorial(5); // 120
// 5 * 4 * 3 * 2 * 1`} />
        <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
          Базовый случай <code>n {'<='} 1</code> останавливает рекурсию, 
          позволяя стеку начать очищаться.
        </p>
      </div>
    </div>
  )
}
