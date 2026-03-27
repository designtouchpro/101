import { useState, useRef, useEffect } from 'react'
import CodeBlock from '../../components/CodeBlock'
import { RenderLog, LogEntry } from '../../components/RenderTracker'

export default function UseRefDemo() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📌 useRef</h1>
        <p>Хук для хранения изменяемых значений и доступа к DOM элементам</p>
        <a 
          href="https://react.dev/reference/react/useRef" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 Документация React
        </a>
      </div>

      <RefVsStateDemo />
      <DOMRefDemo />
      <PreviousValueDemo />
      <TimerRefDemo />
    </div>
  )
}

function RefVsStateDemo() {
  const [stateCount, setStateCount] = useState(0)
  const refCount = useRef(0)
  const renderCount = useRef(0)
  const [, forceUpdate] = useState({})
  
  renderCount.current++

  const refCode = `// ═══════════════════════════════════════════════════════════════
// 📌 useRef vs useState — КЛЮЧЕВОЕ ОТЛИЧИЕ
// ═══════════════════════════════════════════════════════════════

// 📦 useState: изменение ВЫЗЫВАЕТ ре-рендер
const [count, setCount] = useState(0);
setCount(1);  // → Компонент перерисуется!


// 📌 useRef: изменение НЕ вызывает ре-рендер
const countRef = useRef(0);
countRef.current = 1;  // → Компонент НЕ перерисуется!


// ═══════════════════════════════════════════════════════════════
// 🧠 КОГДА ИСПОЛЬЗОВАТЬ useRef?
// ═══════════════════════════════════════════════════════════════
// ✅ Хранение данных между рендерами БЕЗ перерисовки:
//    - ID таймеров (setTimeout, setInterval)
//    - Предыдущие значения props/state
//    - Флаги (isMounted, isFirstRender)
//    - Счётчики рендеров
//
// ✅ Доступ к DOM элементам:
//    - Фокус на input
//    - Скролл к элементу
//    - Измерение размеров
//    - Интеграция с не-React библиотеками


// ═══════════════════════════════════════════════════════════════
// ⚠️ ВАЖНОЕ ПРАВИЛО
// ═══════════════════════════════════════════════════════════════
// НЕ читай/пиши ref.current во время рендера!
// Используй useEffect или event handlers.`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Ref vs State</h3>
        <span className="card-badge">Ключевое отличие</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">Главное отличие</div>
          <p>Изменение <code>state</code> вызывает ре-рендер. Изменение <code>ref.current</code> — НЕТ!</p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div className="value-display">Рендеров: {renderCount.current}</div>
      </div>

      <div className="comparison-grid">
        <div className="comparison-card">
          <div className="comparison-header">📦 useState</div>
          <div className="comparison-body">
            <div className="visual-diagram">
              <div className="value-display large">{stateCount}</div>
            </div>
            <button className="btn btn-primary" onClick={() => setStateCount(c => c + 1)} style={{ width: '100%' }}>
              setState → Ре-рендер!
            </button>
          </div>
        </div>

        <div className="comparison-card">
          <div className="comparison-header">📌 useRef</div>
          <div className="comparison-body">
            <div className="visual-diagram">
              <div className="value-display large">{refCount.current}</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                (на момент рендера)
              </p>
            </div>
            <button className="btn btn-warning" onClick={() => { refCount.current++ }} style={{ width: '100%' }}>
              ref.current++ → Без рендера
            </button>
          </div>
        </div>
      </div>

      <div className="controls" style={{ marginTop: '16px' }}>
        <button className="btn btn-secondary" onClick={() => forceUpdate({})}>
          🔄 Принудительный ре-рендер (увидеть ref)
        </button>
      </div>

      <div className="info-box warning" style={{ marginTop: '16px' }}>
        <span className="info-box-icon">🧪</span>
        <div className="info-box-content">
          <p>Нажмите "ref.current++" несколько раз. Число не меняется! 
          Теперь нажмите "Принудительный ре-рендер" — увидите актуальное значение ref.</p>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <CodeBlock code={refCode} language="tsx" />
      </div>
    </div>
  )
}

function DOMRefDemo() {
  const inputRef = useRef<HTMLInputElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const mountTime = useRef(Date.now())

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-8), { type: 'update', message, timestamp: Date.now() - mountTime.current }])
  }

  const domCode = `// ═══════════════════════════════════════════════════════════════
// 🎯 useRef ДЛЯ ДОСТУПА К DOM
// ═══════════════════════════════════════════════════════════════

// 1️⃣ Создаём ref с начальным значением null
const inputRef = useRef<HTMLInputElement>(null);

// 2️⃣ Привязываем к элементу через атрибут ref
<input ref={inputRef} />

// 3️⃣ Используем в event handler или useEffect
const focusInput = () => {
  inputRef.current?.focus();  // Фокус на input!
};


// ═══════════════════════════════════════════════════════════════
// 📝 ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ
// ═══════════════════════════════════════════════════════════════

// Фокус на элемент
inputRef.current?.focus();

// Скролл к элементу
elementRef.current?.scrollIntoView({ behavior: 'smooth' });

// Получить размеры
const { width, height } = elementRef.current?.getBoundingClientRect();

// Получить/установить значение (uncontrolled input)
const value = inputRef.current?.value;
inputRef.current.value = 'новое значение';`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Доступ к DOM элементам</h3>
        <span className="card-badge">DOM API</span>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div className="visual-diagram">
            <input ref={inputRef} className="input" placeholder="Я input с ref" style={{ marginBottom: '12px' }} />
            
            <div ref={boxRef} style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'center' }}>
              📦 Я div с ref
            </div>
          </div>

          <div className="controls">
            <button className="btn btn-primary" onClick={() => { inputRef.current?.focus(); addLog('🎯 input.focus()') }}>
              Фокус на input
            </button>
            <button className="btn btn-secondary" onClick={() => { boxRef.current?.scrollIntoView({ behavior: 'smooth' }); addLog('📜 scrollIntoView()') }}>
              Скролл к div
            </button>
            <button className="btn btn-secondary" onClick={() => { const v = inputRef.current?.value || ''; addLog(`📖 Значение: "${v}"`) }}>
              Прочитать значение
            </button>
          </div>
        </div>

        <div style={{ width: '300px' }}>
          <RenderLog logs={logs} />
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <CodeBlock code={domCode} language="tsx" />
      </div>
    </div>
  )
}

function PreviousValueDemo() {
  const [count, setCount] = useState(0)
  const prevCountRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    prevCountRef.current = count
  }, [count])

  const prevValue = prevCountRef.current

  const prevCode = `// ═══════════════════════════════════════════════════════════════
// ⏮️ ПАТТЕРН: хранение предыдущего значения
// ═══════════════════════════════════════════════════════════════

function Component() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number>();  // Без начального значения
  
  // После каждого рендера сохраняем текущее значение
  useEffect(() => {
    prevCountRef.current = count;  // Станет "предыдущим" на след. рендере
  }, [count]);
  
  const prevCount = prevCountRef.current;
  
  return (
    <div>
      Текущее: {count}, Предыдущее: {prevCount}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// 🧠 ПОЧЕМУ ЭТО РАБОТАЕТ?
// ═══════════════════════════════════════════════════════════════
// 1. Рендер: читаем prevCountRef.current (старое значение)
// 2. Commit: DOM обновляется
// 3. useEffect: записываем новое значение в ref
// 4. Следующий рендер: ref содержит "предыдущее" значение`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Хранение предыдущего значения</h3>
        <span className="card-badge">Паттерн</span>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div className="visual-diagram">
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '16px' }}>
              <div className="diagram-box state">
                Текущее: <strong>{count}</strong>
              </div>
              <div className="diagram-box effect">
                Предыдущее: <strong>{prevValue ?? 'нет'}</strong>
              </div>
            </div>

            {prevValue !== undefined && (
              <p style={{ textAlign: 'center', color: count > prevValue ? 'var(--accent-green)' : count < prevValue ? 'var(--accent-red)' : 'var(--text-secondary)' }}>
                {count > prevValue ? '📈 Увеличилось' : count < prevValue ? '📉 Уменьшилось' : '➡️ Не изменилось'}
              </p>
            )}
          </div>

          <div className="controls">
            <button className="btn btn-success" onClick={() => setCount(c => c + 1)}>➕ Увеличить</button>
            <button className="btn btn-danger" onClick={() => setCount(c => c - 1)}>➖ Уменьшить</button>
            <button className="btn btn-secondary" onClick={() => setCount(0)}>🔄 Сбросить</button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <CodeBlock code={prevCode} language="tsx" />
        </div>
      </div>
    </div>
  )
}

function TimerRefDemo() {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const start = () => {
    if (intervalRef.current) return
    setIsRunning(true)
    intervalRef.current = window.setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
  }

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
  }

  const reset = () => {
    stop()
    setCount(0)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const timerCode = `// ═══════════════════════════════════════════════════════════════
// ⏱️ ПАТТЕРН: хранение ID таймера/интервала
// ═══════════════════════════════════════════════════════════════

function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<number | null>(null);  // ID интервала
  
  const start = () => {
    if (intervalRef.current) return;  // Уже запущен
    
    // Сохраняем ID в ref для последующей очистки
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);  // Функциональное обновление!
    }, 1000);
  };
  
  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);  // Очищаем по ID
      intervalRef.current = null;
    }
  };
  
  // Cleanup при unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return <button onClick={start}>Start</button>;
}


// ═══════════════════════════════════════════════════════════════
// ⚠️ ПОЧЕМУ НЕ useState ДЛЯ ID?
// ═══════════════════════════════════════════════════════════════
// setState вызывает ре-рендер, а нам это не нужно.
// ID таймера — техническая деталь, не влияет на UI.`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Хранение ID таймеров</h3>
        <span className="card-badge">Практика</span>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div className="visual-diagram">
            <div className="value-display large" style={{ marginBottom: '16px' }}>
              {count}
              <span style={{ fontSize: '1rem', marginLeft: '8px' }}>секунд</span>
            </div>
            
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px',
              background: isRunning ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              borderRadius: '20px', border: `2px solid ${isRunning ? 'var(--accent-green)' : 'var(--accent-red)'}`
            }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: isRunning ? 'var(--accent-green)' : 'var(--accent-red)' }} />
              {isRunning ? 'Запущен' : 'Остановлен'}
            </div>
          </div>

          <div className="controls">
            <button className="btn btn-success" onClick={start} disabled={isRunning}>▶️ Старт</button>
            <button className="btn btn-danger" onClick={stop} disabled={!isRunning}>⏸️ Стоп</button>
            <button className="btn btn-secondary" onClick={reset}>🔄 Сброс</button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <CodeBlock code={timerCode} language="tsx" />
        </div>
      </div>
    </div>
  )
}
