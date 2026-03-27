import { useState, useRef } from 'react'
import CodeBlock from '../../components/CodeBlock'

const basicGeneratorCode = `function* counter() {
  console.log('Начало')
  yield 1          // Пауза! Возвращает { value: 1, done: false }
  console.log('После первого yield')
  yield 2          // Пауза! Возвращает { value: 2, done: false }
  console.log('После второго yield')
  return 3         // Возвращает { value: 3, done: true }
}

const gen = counter()       // Ничего не выполняется!
gen.next() // 'Начало'      → { value: 1, done: false }
gen.next() // 'После первого yield' → { value: 2, done: false }
gen.next() // 'После второго yield' → { value: 3, done: true }
gen.next() //                → { value: undefined, done: true }`

const iteratorProtocolCode = `// Итерируемый объект = реализует Symbol.iterator
// Итератор = объект с методом next()

// Кастомный итерируемый объект
const range = {
  from: 1,
  to: 5,
  
  // Вызывается при for...of
  [Symbol.iterator]() {
    let current = this.from
    const last = this.to
    
    return {
      next() {
        if (current <= last) {
          return { value: current++, done: false }
        }
        return { done: true }  // Конец итерации
      }
    }
  }
}

for (const n of range) console.log(n) // 1, 2, 3, 4, 5
console.log([...range])                // [1, 2, 3, 4, 5]

// Генератор — короткий способ создать итератор:
function* range2(from, to) {
  for (let i = from; i <= to; i++) yield i
}
console.log([...range2(1, 5)])         // [1, 2, 3, 4, 5]`

const yieldDelegationCode = `// yield* делегирует другому генератору/итерируемому
function* inner() {
  yield 'a'
  yield 'b'
}

function* outer() {
  yield 1
  yield* inner()     // Делегирует inner
  yield* [10, 20]    // Делегирует массиву (iterable)
  yield 2
}

console.log([...outer()])
// [1, 'a', 'b', 10, 20, 2]`

const asyncGeneratorCode = `// Async Generator = async + generator
async function* fetchPages(url) {
  let page = 1
  while (true) {
    const res = await fetch(\`\${url}?page=\${page}\`)
    const data = await res.json()
    
    if (data.items.length === 0) return  // Конец
    
    yield data.items  // Порция данных
    page++
  }
}

// Используем for await...of
async function loadAll() {
  for await (const items of fetchPages('/api/users')) {
    console.log('Получена страница:', items.length, 'элементов')
    renderItems(items)
  }
}`

const bidirectionalCode = `// yield может ПОЛУЧАТЬ значения!
function* conversation() {
  const name = yield 'Как тебя зовут?'
  const age = yield \`Привет, \${name}! Сколько тебе лет?\`
  return \`\${name}, \${age} лет — запомнил!\`
}

const chat = conversation()

chat.next()          // { value: 'Как тебя зовут?', done: false }
chat.next('Алиса')   // { value: 'Привет, Алиса! Сколько тебе лет?', done: false }
chat.next(25)         // { value: 'Алиса, 25 лет — запомнил!', done: true }

// Значение передаётся ЧЕРЕЗ yield — 
// 'Алиса' становится результатом первого yield`

const lazyEvalCode = `// Бесконечная последовательность Фибоначчи
function* fibonacci() {
  let [a, b] = [0, 1]
  while (true) {
    yield a
    ;[a, b] = [b, a + b]
  }
}

// Берём только нужное количество
function take(n, iterable) {
  const result = []
  for (const item of iterable) {
    result.push(item)
    if (result.length >= n) break
  }
  return result
}

take(10, fibonacci())
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// Ленивые трансформации
function* map(fn, iterable) {
  for (const item of iterable) yield fn(item)
}

function* filter(fn, iterable) {
  for (const item of iterable) {
    if (fn(item)) yield item
  }
}

// Комбинируем (ничего не вычисляется до итерации!)
const evenSquares = filter(
  n => n % 2 === 0,
  map(n => n * n, fibonacci())
)

take(5, evenSquares)
// [0, 4, 64, 2704, 46368]  — первые 5 чётных квадратов Фибоначчи`

export default function GeneratorsDemo() {
  const [activeTab, setActiveTab] = useState<'basics' | 'patterns' | 'async' | 'interview'>('basics')
  
  // Interactive generator demo
  const [genSteps, setGenSteps] = useState<{ value: any; done: boolean; label: string }[]>([])
  const genRef = useRef<Generator | null>(null)

  const resetGenerator = () => {
    function* demo() {
      yield '🟢 Первое значение'
      yield '🔵 Второе значение'
      yield '🟡 Третье значение'
      return '🔴 Финал (done: true)'
    }
    genRef.current = demo()
    setGenSteps([])
  }

  const stepGenerator = () => {
    if (!genRef.current) resetGenerator()
    const result = genRef.current!.next()
    setGenSteps(prev => [...prev, { 
      value: result.value, 
      done: result.done ?? false, 
      label: `next() #${prev.length + 1}` 
    }])
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔄 Generators & Iterators</h1>
        <p>
          Генераторы — функции с паузой. Итераторы — протокол обхода. 
          Вместе они дают ленивые вычисления, бесконечные последовательности и async-потоки.
        </p>
      </div>

      <div className="tabs" style={{ marginBottom: '24px' }}>
        {[
          { key: 'basics', label: '📦 Основы' },
          { key: 'patterns', label: '🧩 Паттерны' },
          { key: 'async', label: '⚡ Async Generators' },
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

      {activeTab === 'basics' && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">⚙️ Генератор — функция с паузой</span>
              <span className="card-badge">function*</span>
            </div>

            <div className="info-box">
              <strong>Генератор</strong> — функция, которая может приостанавливать выполнение (<code>yield</code>) 
              и возобновлять его (<code>next()</code>). Возвращает итератор.
            </div>

            <CodeBlock code={basicGeneratorCode} language="javascript" title="Базовый генератор" />
          </div>

          {/* Interactive */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">🎮 Пошаговый генератор</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <div className="controls">
                  <button className="btn btn-primary" onClick={stepGenerator}>
                    ▶️ next()
                  </button>
                  <button className="btn btn-secondary" onClick={resetGenerator}>
                    🔄 Reset
                  </button>
                </div>
              </div>

              <div style={{
                padding: '16px',
                background: 'var(--bg-code)',
                borderRadius: '8px',
                minHeight: '120px'
              }}>
                {genSteps.length === 0 ? (
                  <span style={{ color: 'var(--text-muted)' }}>Нажмите next()...</span>
                ) : genSteps.map((step, i) => (
                  <div key={i} style={{ 
                    padding: '8px 12px',
                    marginBottom: '4px',
                    background: step.done ? 'rgba(239, 68, 68, 0.08)' : 'rgba(34, 197, 94, 0.08)',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span>{step.label}: {step.value ?? 'undefined'}</span>
                    <span style={{ 
                      color: step.done ? 'var(--accent-red)' : 'var(--accent-green)',
                      fontWeight: 600
                    }}>
                      done: {String(step.done)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">🔗 Iterator Protocol</span>
              <span className="card-badge">Symbol.iterator</span>
            </div>

            <CodeBlock code={iteratorProtocolCode} language="javascript" title="Итерируемые объекты" />

            <div className="info-box" style={{ marginTop: '16px' }}>
              <strong>Что потребляет итераторы:</strong>
              <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['for...of', 'spread ...arr', 'Array.from()', 'destructuring', 'Promise.all()', 'Map/Set constructor', 'yield*'].map(item => (
                  <code key={item} style={{
                    padding: '4px 10px',
                    background: 'rgba(99, 102, 241, 0.1)',
                    borderRadius: '4px',
                    fontSize: '0.82rem'
                  }}>{item}</code>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">↔️ Двунаправленная передача</span>
            </div>
            <CodeBlock code={bidirectionalCode} language="javascript" title="yield принимает и возвращает" />
          </div>
        </>
      )}

      {activeTab === 'patterns' && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">♾️ Ленивые вычисления</span>
              <span className="card-badge">Мощный паттерн!</span>
            </div>

            <CodeBlock code={lazyEvalCode} language="javascript" title="Бесконечная последовательность + lazy" />

            <div className="info-box" style={{ marginTop: '16px' }}>
              <strong>💡 Ключевое:</strong> Генераторы вычисляют следующее значение только при вызове <code>next()</code>. 
              Бесконечная последовательность не занимает память — значения производятся по одному.
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">🔀 yield* — делегирование</span>
            </div>
            <CodeBlock code={yieldDelegationCode} language="javascript" title="Компоновка генераторов" />
          </div>
        </>
      )}

      {activeTab === 'async' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">⚡ Async Generators</span>
            <span className="card-badge">for await...of</span>
          </div>

          <div className="info-box">
            <strong>async function*</strong> = генератор, который может <code>await</code> внутри. 
            Потребляется через <code>for await...of</code>.
            Идеален для пагинации, стриминга, чтения файлов порциями.
          </div>

          <CodeBlock code={asyncGeneratorCode} language="javascript" title="Пагинация через async generator" />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px' }}>
              <h4 style={{ color: 'var(--accent-green)', marginBottom: '8px' }}>Когда использовать</h4>
              <ul className="info-list">
                <li>Пагинация API</li>
                <li>Чтение файлов порциями</li>
                <li>SSE (Server-Sent Events)</li>
                <li>WebSocket потоки</li>
                <li>Обработка больших данных</li>
              </ul>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px' }}>
              <h4 style={{ color: 'var(--accent-red)', marginBottom: '8px' }}>Подводные камни</h4>
              <ul className="info-list">
                <li>Нельзя использовать <code>for await...of</code> с обычным генератором</li>
                <li>Нет параллельности — каждый await последовательный</li>
                <li>break из for await правильно очищает ресурсы (finally)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'interview' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">🎯 Вопросы для собеседования</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                q: 'Что такое генератор и чем отличается от обычной функции?',
                a: 'Генератор (function*) может приостанавливать выполнение через yield и возобновлять через next(). Обычная функция выполняется до конца за один вызов. Генератор возвращает итератор, а не результат.'
              },
              {
                q: 'Что такое Iterator Protocol?',
                a: 'Объект является итератором если имеет метод next(), возвращающий {value, done}. Объект является итерируемым (iterable) если имеет метод [Symbol.iterator](), возвращающий итератор. for...of, spread, destructuring работают с iterable.'
              },
              {
                q: 'Можно ли передать значение В генератор?',
                a: 'Да! gen.next(value) — value становится результатом текущего yield. Первый next() всегда без аргумента (некуда передать). Также gen.throw(error) бросает ошибку внутри генератора, gen.return(value) завершает его.'
              },
              {
                q: 'Что делает yield*?',
                a: 'Делегирует итерацию другому итерируемому объекту или генератору. yield* [1,2,3] последовательно yield-ит 1, 2, 3. Позволяет компоновать генераторы.'
              },
              {
                q: 'Где генераторы используются на практике?',
                a: 'Redux-Saga (side effects), бесконечные последовательности (Fibonacci, UUID), ленивые трансформации данных, пагинация API (async generators), кооперативная многозадачность, парсинг потоков.'
              },
              {
                q: 'Что такое for await...of?',
                a: 'Цикл для потребления async iterables (async generators). Каждая итерация await-ит Promise от next(). Используется для пагинации, стриминга, SSE.'
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
