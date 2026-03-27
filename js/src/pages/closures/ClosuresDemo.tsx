import { useState, useCallback, useMemo } from 'react'
import CodeBlock from '../../components/CodeBlock'

// Создаём замыкание для демонстрации
function createCounter(initial: number = 0) {
  let count = initial
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
    reset: () => { count = initial; return count }
  }
}

export default function ClosuresDemo() {
  const [count, setCount] = useState(0)
  
  // Демонстрация независимых замыканий
  const [counter1] = useState(() => createCounter(0))
  const [counter2] = useState(() => createCounter(100))
  const [c1Value, setC1Value] = useState(0)
  const [c2Value, setC2Value] = useState(100)

  // Демонстрация мемоизации
  const [memoInput, setMemoInput] = useState(5)
  const [memoCallCount, setMemoCallCount] = useState(0)
  const memoCache = useMemo(() => new Map<number, number>(), [])
  
  const memoizedSquare = useCallback((n: number) => {
    if (memoCache.has(n)) {
      return { result: memoCache.get(n)!, cached: true }
    }
    setMemoCallCount(prev => prev + 1)
    const result = n * n
    memoCache.set(n, result)
    return { result, cached: false }
  }, [memoCache])

  const [memoResult, setMemoResult] = useState<{ result: number; cached: boolean } | null>(null)

  const increment = () => setCount(prev => prev + 1)

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📦 Замыкания (Closures)</h1>
        <p>
          Замыкание — это функция, которая запоминает своё лексическое окружение 
          даже когда выполняется вне своей области видимости.
        </p>
      </div>

      <div className="card">
        <h3>🎯 Простой пример</h3>
        <CodeBlock code={`function createCounter() {
  let count = 0; // Переменная в "замкнутом" scope
  
  return function() {
    count++; // Имеет доступ к count!
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Каждый вызов createCounter создаёт новое замыкание
const counter2 = createCounter();
console.log(counter2()); // 1 (свой собственный count)`} />

        <div style={{ marginTop: '16px', padding: '16px', background: 'var(--bg-code)', borderRadius: '8px' }}>
          <p style={{ marginBottom: '12px' }}>Интерактивный пример:</p>
          <button className="btn btn-primary" onClick={increment}>
            Increment: {count}
          </button>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.85rem' }}>
            Состояние React — тоже замыкание! Значение "замкнуто" в компоненте.
          </p>
        </div>
      </div>

      {/* Интерактивное сравнение замыканий */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">🎮 Два независимых замыкания</span>
          <span className="card-badge">Интерактив</span>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Каждый вызов createCounter() создаёт <strong>своё собственное</strong> замыкание 
          с отдельной переменной count!
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ 
            padding: '20px', 
            background: 'rgba(168, 85, 247, 0.1)', 
            borderRadius: '12px',
            border: '2px solid var(--accent-purple)'
          }}>
            <h4 style={{ color: 'var(--accent-purple)', marginBottom: '12px' }}>
              Counter 1 (initial: 0)
            </h4>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              {c1Value}
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setC1Value(counter1.decrement())}
              >−</button>
              <button 
                className="btn btn-primary" 
                onClick={() => setC1Value(counter1.increment())}
              >+</button>
              <button 
                className="btn btn-danger" 
                onClick={() => setC1Value(counter1.reset())}
              >Reset</button>
            </div>
          </div>
          
          <div style={{ 
            padding: '20px', 
            background: 'rgba(34, 197, 94, 0.1)', 
            borderRadius: '12px',
            border: '2px solid var(--accent-green)'
          }}>
            <h4 style={{ color: 'var(--accent-green)', marginBottom: '12px' }}>
              Counter 2 (initial: 100)
            </h4>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              {c2Value}
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setC2Value(counter2.decrement())}
              >−</button>
              <button 
                className="btn btn-success" 
                onClick={() => setC2Value(counter2.increment())}
              >+</button>
              <button 
                className="btn btn-danger" 
                onClick={() => setC2Value(counter2.reset())}
              >Reset</button>
            </div>
          </div>
        </div>
        
        <div className="info-box" style={{ marginTop: '16px' }}>
          💡 Обратите внимание: изменение одного счётчика НЕ влияет на другой! 
          Каждое замыкание хранит свою собственную переменную count.
        </div>
      </div>

      <div className="card">
        <h3>📊 Визуализация замыкания</h3>
        <div style={{ 
          display: 'flex', 
          gap: '24px', 
          marginTop: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{ 
            border: '2px solid var(--accent-purple)', 
            borderRadius: '12px', 
            padding: '16px',
            background: 'rgba(168, 85, 247, 0.1)'
          }}>
            <h4 style={{ color: 'var(--accent-purple)' }}>createCounter scope</h4>
            <div style={{ 
              marginTop: '12px', 
              padding: '8px', 
              background: 'var(--bg-code)', 
              borderRadius: '4px',
              fontFamily: 'monospace'
            }}>
              let count = 0
            </div>
            
            <div style={{ 
              border: '2px solid var(--accent-green)', 
              borderRadius: '8px', 
              padding: '12px',
              marginTop: '12px',
              background: 'rgba(34, 197, 94, 0.1)'
            }}>
              <h5 style={{ color: 'var(--accent-green)' }}>returned function</h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Имеет ссылку на count через [[Scope]]
              </p>
            </div>
          </div>
          
          <div style={{ color: 'var(--text-muted)', alignSelf: 'center', fontSize: '2rem' }}>→</div>
          
          <div style={{ 
            border: '2px solid var(--accent-orange)', 
            borderRadius: '12px', 
            padding: '16px',
            background: 'rgba(245, 158, 11, 0.1)'
          }}>
            <h4 style={{ color: 'var(--accent-orange)' }}>Вызов counter()</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
              Функция "помнит" переменную count,<br/>
              даже после завершения createCounter
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>🏭 Фабрика функций</h3>
        <CodeBlock code={`function multiply(a) {
  return function(b) {
    return a * b; // a "замкнута"
  };
}

const double = multiply(2);
const triple = multiply(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
console.log(double(10)); // 20`} />
      </div>

      <div className="card">
        <h3>🔒 Приватные переменные</h3>
        <CodeBlock code={`function createBankAccount(initialBalance) {
  let balance = initialBalance; // Приватная переменная
  
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) {
        throw new Error('Недостаточно средств');
      }
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
account.deposit(50);  // 150
account.withdraw(30); // 120
account.getBalance(); // 120
// account.balance — undefined (приватно!)`} />
        <div className="info-box" style={{ marginTop: '16px' }}>
          До появления приватных полей в классах (#field), замыкания были 
          единственным способом создать по-настоящему приватные данные.
        </div>
      </div>

      <div className="card">
        <h3>⚠️ Классическая ошибка с циклами</h3>
        <CodeBlock code={`// ❌ Все функции ссылаются на одну переменную i
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 3, 3, 3 (i = 3 после цикла)
  }, 100);
}

// ✅ Решение 1: let (блочная область видимости)
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 0, 1, 2
  }, 100);
}

// ✅ Решение 2: IIFE создаёт новое замыкание
for (var i = 0; i < 3; i++) {
  ((j) => {
    setTimeout(() => {
      console.log(j); // 0, 1, 2
    }, 100);
  })(i);
}`} />
      </div>

      <div className="card">
        <h3>💡 Практическое применение</h3>
        
        <h4 style={{ marginTop: '16px' }}>Мемоизация</h4>
        <CodeBlock code={`function memoize(fn) {
  const cache = {}; // Замкнутый кэш
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log('Computing...');
  return n * n;
});

expensiveCalc(5); // Computing... 25
expensiveCalc(5); // 25 (из кэша, без лога)`} />

        {/* Интерактивная мемоизация */}
        <div style={{ 
          marginTop: '16px', 
          padding: '20px', 
          background: 'var(--bg-code)', 
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          <h5 style={{ marginBottom: '12px' }}>🎮 Попробуй мемоизацию</h5>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="number"
              className="input"
              value={memoInput}
              onChange={(e) => setMemoInput(Number(e.target.value))}
              style={{ width: '100px' }}
            />
            <button 
              className="btn btn-primary"
              onClick={() => setMemoResult(memoizedSquare(memoInput))}
            >
              Вычислить квадрат
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => { memoCache.clear(); setMemoCallCount(0); setMemoResult(null); }}
            >
              Очистить кэш
            </button>
          </div>
          
          {memoResult && (
            <div style={{ 
              marginTop: '12px', 
              padding: '12px', 
              background: memoResult.cached ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{memoResult.cached ? '⚡' : '🔄'}</span>
              <div>
                <div style={{ fontWeight: 'bold' }}>
                  {memoInput}² = {memoResult.result}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {memoResult.cached ? 'Из кэша (мгновенно!)' : 'Вычислено (добавлено в кэш)'}
                </div>
              </div>
            </div>
          )}
          
          <div style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Реальных вычислений: {memoCallCount} | Записей в кэше: {memoCache.size}
          </div>
          <p style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            💡 Введите число и нажмите "Вычислить". Повторный запрос того же числа будет из кэша!
          </p>
        </div>

        <h4 style={{ marginTop: '24px' }}>Debounce</h4>
        <CodeBlock code={`function debounce(fn, delay) {
  let timeoutId; // Замкнутый таймер
  
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const handleSearch = debounce((query) => {
  fetch('/api/search?q=' + query);
}, 300);`} />
      </div>
    </div>
  )
}
