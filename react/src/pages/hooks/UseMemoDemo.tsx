import { useState, useMemo, useRef, useCallback, memo } from 'react'
import CodeBlock from '../../components/CodeBlock'
import { RenderLog, LogEntry } from '../../components/RenderTracker'

export default function UseMemoDemo() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>💾 useMemo</h1>
        <p>Хук для мемоизации вычислений и предотвращения лишних расчётов</p>
        <a 
          href="https://react.dev/reference/react/useMemo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 Документация React
        </a>
      </div>

      <ExpensiveCalculationDemo />
      <MemoVsNoMemoDemo />
      <ObjectMemoDemo />
    </div>
  )
}

function slowCalculation(num: number): number {
  const start = performance.now()
  let result = 0
  for (let i = 0; i < num * 1000000; i++) {
    result += Math.sqrt(i)
  }
  return Math.round(performance.now() - start)
}

function ExpensiveCalculationDemo() {
  const [count, setCount] = useState(5)
  const [otherState, setOtherState] = useState(0)
  const [useMemoEnabled, setUseMemoEnabled] = useState(true)
  const renderCount = useRef(0)
  renderCount.current++

  const memoizedResult = useMemo(() => {
    if (!useMemoEnabled) return 0
    return slowCalculation(count)
  }, [count, useMemoEnabled])

  const normalResult = useMemoEnabled ? 0 : slowCalculation(count)
  const result = useMemoEnabled ? memoizedResult : normalResult

  const memoCode = `// ═══════════════════════════════════════════════════════════════
// 💾 useMemo — МЕМОИЗАЦИЯ ВЫЧИСЛЕНИЙ
// Кэширует результат вычисления между рендерами
// ═══════════════════════════════════════════════════════════════

// ❌ БЕЗ useMemo: тяжёлое вычисление на КАЖДЫЙ рендер
const result = expensiveCalculation(data);  // 500ms каждый раз!


// ✅ С useMemo: вычисление только когда data изменится
const result = useMemo(() => {
  return expensiveCalculation(data);  // Кэшируется!
}, [data]);  // Пересчитывается только при изменении data


// ═══════════════════════════════════════════════════════════════
// 🧠 КАК ЭТО РАБОТАЕТ?
// ═══════════════════════════════════════════════════════════════
// 1. Первый рендер: вычисляет и сохраняет результат
// 2. Следующие рендеры: проверяет deps
//    - deps не изменились → возвращает кэш
//    - deps изменились → пересчитывает и сохраняет


// ═══════════════════════════════════════════════════════════════
// 🎯 КОГДА ИСПОЛЬЗОВАТЬ?
// ═══════════════════════════════════════════════════════════════
// ✅ Тяжёлые вычисления (фильтрация, сортировка больших массивов)
// ✅ Создание объектов/массивов для deps других хуков
// ✅ Референсное равенство для memo-компонентов
//
// ❌ НЕ нужен для простых вычислений (a + b)`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Тяжёлые вычисления</h3>
        <span className="card-badge">Производительность</span>
      </div>

      <div className="info-box warning">
        <span className="info-box-icon">⏱️</span>
        <div className="info-box-content">
          <div className="info-box-title">Зачем useMemo?</div>
          <p>Без мемоизации тяжёлые вычисления выполняются на каждый рендер, 
          даже если данные не изменились. Это замедляет интерфейс!</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div className="visual-diagram">
            <div className="diagram-row">
              <div className="diagram-box state">count: {count}</div>
              <span className="diagram-arrow">→</span>
              <div className="diagram-box render">slowCalc()</div>
              <span className="diagram-arrow">→</span>
              <div className="diagram-box effect">{result}ms</div>
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={useMemoEnabled} onChange={(e) => setUseMemoEnabled(e.target.checked)} />
                <span>Использовать useMemo</span>
              </label>
            </div>

            <p style={{ marginTop: '12px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Рендеров: {renderCount.current} | otherState: {otherState}
            </p>
          </div>

          <div className="controls">
            <button className="btn btn-primary" onClick={() => setCount(c => Math.min(c + 1, 20))}>
              count++ (пересчёт)
            </button>
            <button className="btn btn-secondary" onClick={() => setOtherState(s => s + 1)}>
              otherState++ (без пересчёта?)
            </button>
          </div>

          <div className="info-box" style={{ marginTop: '16px' }}>
            <span className="info-box-icon">🧪</span>
            <div className="info-box-content">
              <p>Попробуйте: 1) Выключите useMemo, 2) Нажмите "otherState++" — заметите задержку!</p>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <CodeBlock code={memoCode} language="tsx" />
        </div>
      </div>
    </div>
  )
}

function MemoVsNoMemoDemo() {
  const [items] = useState([1, 2, 3, 4, 5])
  const [filter, setFilter] = useState('')
  const [theme, setTheme] = useState('light')
  const [logs, setLogs] = useState<LogEntry[]>([])
  const mountTime = useRef(Date.now())

  const addLog = useCallback((message: string) => {
    setLogs(prev => [...prev.slice(-8), { type: 'update', message, timestamp: Date.now() - mountTime.current }])
  }, [])

  // Без useMemo — фильтрация на каждый рендер
  const filteredNormal = items.filter(i => i.toString().includes(filter))
  
  // С useMemo — фильтрация только при изменении items или filter
  const filteredMemo = useMemo(() => {
    addLog('🔄 useMemo: фильтрация выполнена')
    return items.filter(i => i.toString().includes(filter))
  }, [items, filter, addLog])

  void filteredNormal
  void filteredMemo

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Фильтрация списка</h3>
        <span className="card-badge">Сравнение</span>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div className="visual-diagram">
            <input
              className="input"
              placeholder="Фильтр..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              style={{ marginBottom: '12px' }}
            />
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Найдено: {filteredMemo.length} из {items.length}
            </p>
            
            <p style={{ color: 'var(--text-secondary)' }}>
              Тема: {theme}
            </p>
          </div>

          <div className="controls">
            <button className="btn btn-primary" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
              Сменить тему (не влияет на фильтр)
            </button>
            <button className="btn btn-secondary" onClick={() => setLogs([])}>
              Очистить лог
            </button>
          </div>
        </div>

        <div style={{ width: '350px' }}>
          <RenderLog logs={logs} />
        </div>
      </div>
    </div>
  )
}

function ObjectMemoDemo() {
  const [count, setCount] = useState(0)

  // Без useMemo — новый объект каждый рендер
  const styleNormal = { color: 'red', fontSize: 16 }
  
  // С useMemo — тот же объект между рендерами
  const styleMemo = useMemo(() => ({ color: 'blue', fontSize: 16 }), [])

  const objectCode = `// ═══════════════════════════════════════════════════════════════
// 📦 useMemo ДЛЯ ОБЪЕКТОВ
// Сохраняет ссылку на объект между рендерами
// ═══════════════════════════════════════════════════════════════

// ❌ ПРОБЛЕМА: новый объект каждый рендер
const style = { color: 'red' };  // Новая ссылка!

// Передаём в memo-компонент
<MemoChild style={style} />  // 💥 Ре-рендер каждый раз!


// ✅ РЕШЕНИЕ: useMemo сохраняет ссылку
const style = useMemo(() => ({ color: 'red' }), []);

<MemoChild style={style} />  // ✓ Не ре-рендерится


// ═══════════════════════════════════════════════════════════════
// 🤔 useMemo vs useCallback
// ═══════════════════════════════════════════════════════════════
// useMemo    — мемоизирует ЗНАЧЕНИЕ (любое)
// useCallback — мемоизирует ФУНКЦИЮ

// Эквивалентно:
const fn = useMemo(() => () => console.log('hi'), []);
const fn = useCallback(() => console.log('hi'), []);`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Мемоизация объектов</h3>
        <span className="card-badge">Референсное равенство</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">Зачем мемоизировать объекты?</div>
          <p>Объекты сравниваются по ссылке. Новый объект каждый рендер = дочерний memo-компонент ре-рендерится.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div className="visual-diagram">
            <p style={{ marginBottom: '16px' }}>Родитель рендерился: <strong>{count + 1}</strong> раз</p>
            
            <div className="comparison-grid">
              <div className="comparison-card" style={{ borderColor: 'var(--accent-red)' }}>
                <div className="comparison-header" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                  ❌ Без useMemo
                </div>
                <div className="comparison-body">
                  <MemoizedBox style={styleNormal} label="Новый объект" />
                </div>
              </div>

              <div className="comparison-card" style={{ borderColor: 'var(--accent-green)' }}>
                <div className="comparison-header" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
                  ✅ С useMemo
                </div>
                <div className="comparison-body">
                  <MemoizedBox style={styleMemo} label="Мемоизированный" />
                </div>
              </div>
            </div>
          </div>

          <div className="controls">
            <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>
              Ре-рендер родителя
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

const MemoizedBox = memo(function Box({ style, label }: { style: React.CSSProperties; label: string }) {
  const renderCount = useRef(0)
  renderCount.current++
  
  return (
    <div style={{ ...style, padding: '12px', background: 'var(--bg-code)', borderRadius: '8px', textAlign: 'center' }}>
      <p style={{ marginBottom: '8px', fontSize: '0.9rem' }}>{label}</p>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Рендеров: <strong>{renderCount.current}</strong>
      </p>
    </div>
  )
})
