import { useState, useRef, useEffect } from 'react'
import CodeBlock from '../../components/CodeBlock'

const gcExplanation = `// Основной алгоритм: Mark-and-Sweep
// 
// 1. GC начинает с "корней" (roots):
//    - Глобальные переменные (window, global)
//    - Текущий call stack
//    - Замыкания
//
// 2. Mark: обходит все достижимые объекты
// 3. Sweep: удаляет недостижимые
//
// Пример:
let user = { name: 'John' }  // Объект достижим через user
let admin = user              // Два пути к объекту

user = null                   // Ещё достижим через admin
admin = null                  // Теперь НЕДОСТИЖИМ → GC удалит`

const leakPatterns = [
  {
    name: 'Забытые таймеры',
    danger: 'critical',
    bad: `// ❌ Утечка: таймер держит ссылку на data
function startPolling() {
  const data = loadHugeData()  // 100MB
  
  setInterval(() => {
    // data никогда не освободится!
    process(data)
  }, 1000)
}`,
    good: `// ✅ Очищаем таймер
function startPolling() {
  const data = loadHugeData()
  
  const id = setInterval(() => {
    process(data)
  }, 1000)
  
  // При необходимости:
  return () => clearInterval(id)
}`
  },
  {
    name: 'Event listeners',
    danger: 'critical',
    bad: `// ❌ Утечка в SPA: слушатель не удаляется
function mountComponent() {
  const handler = (e) => {
    // this.data удерживается замыканием
    updateUI(this.data)
  }
  
  window.addEventListener('resize', handler)
  // Компонент удалён, но handler живёт!
}`,
    good: `// ✅ React: useEffect cleanup
useEffect(() => {
  const handler = () => updateUI()
  window.addEventListener('resize', handler)
  return () => {
    window.removeEventListener('resize', handler)
  }
}, [])

// ✅ Vue: onUnmounted
onMounted(() => {
  window.addEventListener('resize', handler)
})
onUnmounted(() => {
  window.removeEventListener('resize', handler)
})`
  },
  {
    name: 'Замыкания',
    danger: 'high',
    bad: `// ❌ Замыкание удерживает весь scope
function outer() {
  const hugeArray = new Array(1000000)
  
  return function inner() {
    // inner замыкает hugeArray,
    // даже если не использует его!
    return 'hello'
  }
}

const fn = outer()
// hugeArray НЕ освободится пока fn существует`,
    good: `// ✅ Не замыкайте большие объекты
function outer() {
  const hugeArray = new Array(1000000)
  const result = process(hugeArray)
  
  return function inner() {
    return result  // Только результат
    // hugeArray может быть собран GC
  }
}`
  },
  {
    name: 'Отсоединённые DOM-узлы',
    danger: 'high',
    bad: `// ❌ Ссылка на удалённый DOM-элемент
const elements = []

function addItem() {
  const div = document.createElement('div')
  document.body.appendChild(div)
  elements.push(div)  // JS ссылка!
}

function removeItem() {
  const div = elements[0]
  document.body.removeChild(div)
  // div удалён из DOM, но жив в elements!
}`,
    good: `// ✅ WeakRef или очищаем ссылки
function removeItem() {
  const div = elements.shift() // Убираем из массива
  document.body.removeChild(div)
  // Теперь GC может удалить div
}`
  },
]

const weakRefCode = `// WeakRef — слабая ссылка (не препятствует GC)
let obj = { data: 'important' }
const weakRef = new WeakRef(obj)

// Получить объект (может вернуть undefined!)
weakRef.deref()  // { data: 'important' }

obj = null  // Единственная сильная ссылка удалена
// Через некоторое время GC может удалить объект

weakRef.deref()  // undefined (если GC сработал)

// ⚠️ ВАЖНО: нет гарантии КОГДА GC сработает!
// deref() может вернуть объект даже после obj = null`

const finalizationCode = `// FinalizationRegistry — колбэк при сборке GC
const registry = new FinalizationRegistry((heldValue) => {
  console.log(\`Объект "\${heldValue}" собран GC!\`)
  // Очистить связанные ресурсы
})

function createTracked(name) {
  const obj = { name }
  registry.register(obj, name)  // Отслеживать obj
  return obj
}

let user = createTracked('user-1')
user = null
// Когда-то в будущем: "Объект "user-1" собран GC!"

// Практический пример: кеш с автоочисткой
class Cache {
  #cache = new Map()
  #registry = new FinalizationRegistry((key) => {
    this.#cache.delete(key)
  })

  set(key, value) {
    this.#cache.set(key, new WeakRef(value))
    this.#registry.register(value, key)
  }

  get(key) {
    return this.#cache.get(key)?.deref()
  }
}`

export default function MemoryDemo() {
  const [activeTab, setActiveTab] = useState<'gc' | 'leaks' | 'weakref' | 'interview'>('gc')
  
  // Memory demo
  const [allocations, setAllocations] = useState<{ id: number; size: string; alive: boolean }[]>([])
  const allocCounter = useRef(0)

  const allocate = () => {
    allocCounter.current++
    setAllocations(prev => [...prev, { 
      id: allocCounter.current, 
      size: `${Math.round(Math.random() * 900 + 100)} KB`,
      alive: true 
    }])
  }

  const deallocate = (id: number) => {
    setAllocations(prev => prev.map(a => a.id === id ? { ...a, alive: false } : a))
  }

  const gc = () => {
    setAllocations(prev => prev.filter(a => a.alive))
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🧠 Управление памятью</h1>
        <p>
          Как работает сборка мусора, типичные утечки памяти, 
          WeakRef и FinalizationRegistry. Частые вопросы на senior-собесах.
        </p>
      </div>

      <div className="tabs" style={{ marginBottom: '24px' }}>
        {[
          { key: 'gc', label: '🗑️ Garbage Collection' },
          { key: 'leaks', label: '💧 Утечки памяти' },
          { key: 'weakref', label: '🔗 WeakRef' },
          { key: 'interview', label: '🎯 Вопросы' },
        ].map(tab => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'gc' && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">🗑️ Garbage Collection — Mark & Sweep</span>
              <span className="card-badge">V8 Engine</span>
            </div>

            <CodeBlock code={gcExplanation} language="javascript" title="Основной алгоритм" />

            <h4 style={{ margin: '20px 0 12px' }}>V8 — две кучи</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px', borderTop: '3px solid var(--accent-green)' }}>
                <h4 style={{ color: 'var(--accent-green)', marginBottom: '8px' }}>Young Generation (1-8 MB)</h4>
                <ul className="info-list">
                  <li>Новые объекты попадают сюда</li>
                  <li>Scavenger (Minor GC) — очень быстрый</li>
                  <li>Две полуобласти (semi-spaces)</li>
                  <li>Объекты, пережившие 2 GC → Old Gen</li>
                </ul>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px', borderTop: '3px solid var(--accent-cyan)' }}>
                <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '8px' }}>Old Generation (сотни MB)</h4>
                <ul className="info-list">
                  <li>Долгоживущие объекты</li>
                  <li>Mark-Sweep-Compact (Major GC) — медленнее</li>
                  <li>Инкрементальная маркировка (не блокирует)</li>
                  <li>Сжатие для борьбы с фрагментацией</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive demo */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">🎮 Симуляция GC</span>
            </div>

            <div className="controls" style={{ marginBottom: '16px' }}>
              <button className="btn btn-primary" onClick={allocate}>
                📦 Allocate
              </button>
              <button className="btn btn-secondary" onClick={gc}>
                🗑️ Run GC (удалить мёртвые)
              </button>
              <button className="btn btn-danger" onClick={() => setAllocations([])}>
                Reset
              </button>
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              padding: '16px',
              background: 'var(--bg-code)',
              borderRadius: '8px',
              minHeight: '80px'
            }}>
              {allocations.length === 0 ? (
                <span style={{ color: 'var(--text-muted)' }}>Нажмите Allocate для создания объектов</span>
              ) : allocations.map(a => (
                <div key={a.id} style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: a.alive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  border: `1px solid ${a.alive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  opacity: a.alive ? 1 : 0.5
                }} onClick={() => deallocate(a.id)}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>#{a.id}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{a.size}</div>
                  <div style={{ fontSize: '0.65rem', marginTop: '2px' }}>
                    {a.alive ? '🟢 Живой' : '💀 Мёртвый'}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Кликните на объект чтобы "убить" (удалить ссылку). Затем запустите GC.
            </div>
          </div>
        </>
      )}

      {activeTab === 'leaks' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">💧 Типичные утечки памяти</span>
            <span className="card-badge">Знать обязательно!</span>
          </div>

          <div className="info-box warning">
            <strong>Утечка памяти</strong> — когда объект больше не нужен, но GC не может его собрать 
            из-за случайно живой ссылки. Память растёт с каждым действием пользователя.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
            {leakPatterns.map(p => (
              <div key={p.name} style={{ 
                padding: '20px', 
                background: 'var(--bg-code)', 
                borderRadius: '8px',
                borderLeft: `3px solid ${p.danger === 'critical' ? 'var(--accent-red)' : 'var(--accent-orange)'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4>{p.name}</h4>
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: p.danger === 'critical' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(249, 115, 22, 0.1)',
                    color: p.danger === 'critical' ? 'var(--accent-red)' : 'var(--accent-orange)'
                  }}>
                    {p.danger === 'critical' ? '🔴 Критично' : '🟠 Высокий риск'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-red)', marginBottom: '4px', fontWeight: 600 }}>
                      ❌ Утечка
                    </div>
                    <pre style={{ 
                      fontSize: '0.78rem', 
                      padding: '12px', 
                      background: 'rgba(239, 68, 68, 0.04)', 
                      borderRadius: '6px', 
                      border: '1px solid rgba(239, 68, 68, 0.1)',
                      lineHeight: 1.5,
                      whiteSpace: 'pre-wrap'
                    }}>
                      {p.bad}
                    </pre>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', marginBottom: '4px', fontWeight: 600 }}>
                      ✅ Правильно
                    </div>
                    <pre style={{ 
                      fontSize: '0.78rem', 
                      padding: '12px', 
                      background: 'rgba(34, 197, 94, 0.04)', 
                      borderRadius: '6px', 
                      border: '1px solid rgba(34, 197, 94, 0.1)',
                      lineHeight: 1.5,
                      whiteSpace: 'pre-wrap'
                    }}>
                      {p.good}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'weakref' && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">🔗 WeakRef</span>
              <span className="card-badge">ES2021</span>
            </div>

            <div className="info-box">
              <strong>WeakRef</strong> — слабая ссылка на объект. Не препятствует сборке мусора. 
              <code>deref()</code> возвращает объект или <code>undefined</code> если он уже собран.
            </div>

            <CodeBlock code={weakRefCode} language="javascript" title="WeakRef" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '16px' }}>
              {[
                { label: 'WeakRef', desc: 'Слабая ссылка на один объект. deref() для доступа.', color: 'var(--accent-cyan)' },
                { label: 'WeakMap', desc: 'Ключи — слабые ссылки. Ключи только объекты. Не итерируемый.', color: 'var(--accent-green)' },
                { label: 'WeakSet', desc: 'Значения — слабые ссылки. Только объекты. Не итерируемый.', color: 'var(--accent-orange)' },
              ].map(item => (
                <div key={item.label} style={{ padding: '14px', background: 'var(--bg-code)', borderRadius: '8px', borderTop: `2px solid ${item.color}` }}>
                  <strong style={{ color: item.color }}>{item.label}</strong>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">🔔 FinalizationRegistry</span>
              <span className="card-badge">ES2021</span>
            </div>

            <CodeBlock code={finalizationCode} language="javascript" title="Колбэк при сборке GC" />

            <div className="info-box warning" style={{ marginTop: '16px' }}>
              <strong>⚠️ Не полагайтесь на FinalizationRegistry!</strong>
              <p style={{ marginTop: '4px' }}>
                GC не гарантирует КОГДА (и даже БУДЕТ ЛИ) вызван финализатор. 
                Используйте только для оптимизации (очистка кеша), не для критической логики.
              </p>
            </div>
          </div>
        </>
      )}

      {activeTab === 'interview' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">🎯 Вопросы для собеседования</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                q: 'Как работает Garbage Collection в JavaScript?',
                a: 'Основной алгоритм — Mark-and-Sweep. GC начинает с корней (глобальные переменные, call stack), помечает все достижимые объекты, затем удаляет непомеченные. V8 использует generational GC: Young Gen (Scavenger, быстрый) и Old Gen (Mark-Sweep-Compact, инкрементальный).'
              },
              {
                q: 'Назовите 4 типичных источника утечек памяти в SPA',
                a: '1) Забытые таймеры (setInterval без clearInterval). 2) Event listeners на window/document без removeEventListener при unmount. 3) Замыкания, удерживающие большие объекты. 4) Отсоединённые DOM-узлы (удалены из DOM, но JS-ссылка жива). 5) Глобальные переменные (забытый var → window.xxx).'
              },
              {
                q: 'Чем WeakMap отличается от Map?',
                a: 'WeakMap: ключи — только объекты, ключи являются слабыми ссылками (GC может собрать), НЕ итерируемый (нет forEach, size, keys). Map: любые ключи, сильные ссылки, итерируемый. WeakMap идеален для метаданных объектов без утечек.'
              },
              {
                q: 'Что такое WeakRef и когда его использовать?',
                a: 'WeakRef — слабая ссылка на объект, не препятствующая GC. deref() возвращает объект или undefined. Используется для кешей (объект доступен пока есть сильные ссылки), наблюдателей, больших data structures. Не полагаться для критической логики!'
              },
              {
                q: 'Как найти утечку памяти в Chrome DevTools?',
                a: 'Memory tab → Heap Snapshot (сравнить до и после действия). Timeline recording → ищем растущий график Memory. Performance Monitor → наблюдаем JS Heap Size. Allocation instrumentation → находим объекты которые не освобождаются между снепшотами.'
              },
              {
                q: 'Утечка памяти в замыкании — как?',
                a: 'Если замыкание захватывает переменную из внешней scope, весь scope (включая другие переменные) не может быть собран GC. Даже если замыкание не использует большой объект из scope — он всё равно удерживается. Решение: обнулять ненужные переменные или не замыкать лишнее.'
              },
            ].map((item, i) => (
              <details key={i} className="interview-question">
                <summary style={{ 
                  cursor: 'pointer', 
                  padding: '14px 16px',
                  background: 'var(--bg-code)',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}>
                  {item.q}
                </summary>
                <div style={{ 
                  padding: '14px 16px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  borderLeft: '3px solid var(--accent-cyan)',
                  marginLeft: '16px',
                  marginTop: '8px'
                }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
