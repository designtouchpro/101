import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function PromisesDemo() {
  const [promiseState, setPromiseState] = useState<'pending' | 'fulfilled' | 'rejected'>('pending')
  const [output, setOutput] = useState<string[]>([])

  const runDemo = async () => {
    setOutput([])
    setPromiseState('pending')
    setOutput(prev => [...prev, '⏳ Promise created (pending)'])
    
    await new Promise(r => setTimeout(r, 1500))
    
    if (Math.random() > 0.5) {
      setPromiseState('fulfilled')
      setOutput(prev => [...prev, '✅ Promise fulfilled with value: "Success!"'])
    } else {
      setPromiseState('rejected')
      setOutput(prev => [...prev, '❌ Promise rejected with error: "Something went wrong"'])
    }
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🤝 Promises</h1>
        <p>
          Promise — объект, представляющий результат асинхронной операции. 
          Может находиться в трёх состояниях: pending, fulfilled или rejected.
        </p>
      </div>

      <div className="card">
        <h3>📊 Состояния Promise</h3>
        <div className="controls" style={{ marginTop: '16px' }}>
          <button className="btn btn-primary" onClick={runDemo}>
            🎲 Создать Promise
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
          <div className={`diagram-box ${promiseState === 'pending' ? 'sync' : ''}`} 
               style={{ opacity: promiseState === 'pending' ? 1 : 0.5 }}>
            ⏳ Pending
          </div>
          <span style={{ color: 'var(--text-muted)', alignSelf: 'center' }}>→</span>
          <div className={`diagram-box ${promiseState === 'fulfilled' ? 'macro' : ''}`}
               style={{ opacity: promiseState === 'fulfilled' ? 1 : 0.5 }}>
            ✅ Fulfilled
          </div>
          <span style={{ color: 'var(--text-muted)', alignSelf: 'center' }}>или</span>
          <div className={`diagram-box ${promiseState === 'rejected' ? 'sync' : ''}`}
               style={{ opacity: promiseState === 'rejected' ? 1 : 0.5, borderColor: 'var(--accent-red)', background: 'rgba(239,68,68,0.15)', color: 'var(--accent-red)' }}>
            ❌ Rejected
          </div>
        </div>

        <div className="console-output" style={{ marginTop: '16px' }}>
          {output.map((line, i) => (
            <div key={i} className="console-line sync">{line}</div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>🔨 Создание Promise</h3>
        <CodeBlock code={`const promise = new Promise((resolve, reject) => {
  // Асинхронная операция
  setTimeout(() => {
    const success = Math.random() > 0.5;
    
    if (success) {
      resolve('Успех!');  // Promise → fulfilled
    } else {
      reject(new Error('Ошибка!')); // Promise → rejected
    }
  }, 1000);
});

// Использование
promise
  .then(result => console.log(result))  // При успехе
  .catch(error => console.error(error)) // При ошибке
  .finally(() => console.log('Завершено')); // Всегда`} />
      </div>

      <div className="card">
        <h3>⛓️ Цепочки Promise</h3>
        <CodeBlock code={`fetch('/api/user')
  .then(response => response.json())    // Преобразуем в JSON
  .then(user => fetch('/api/posts/' + user.id)) // Загружаем посты
  .then(response => response.json())
  .then(posts => {
    console.log('Посты пользователя:', posts);
  })
  .catch(error => {
    // Ловит ошибку на ЛЮБОМ этапе цепочки
    console.error('Ошибка:', error);
  });`} />
        <div className="info-box" style={{ marginTop: '16px' }}>
          <strong>Важно:</strong> Каждый <code>.then()</code> возвращает новый Promise, 
          что позволяет строить цепочки. Ошибка на любом этапе "проваливается" до ближайшего <code>.catch()</code>.
        </div>
      </div>

      <div className="card">
        <h3>🛠️ Статические методы Promise</h3>
        <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
          <div>
            <h4 style={{ color: 'var(--accent-purple)' }}>Promise.all()</h4>
            <CodeBlock code={`// Ждёт выполнения ВСЕХ промисов
// Отклоняется при первой ошибке
const results = await Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
]);`} />
          </div>
          
          <div>
            <h4 style={{ color: 'var(--accent-green)' }}>Promise.race()</h4>
            <CodeBlock code={`// Возвращает результат ПЕРВОГО завершившегося
const fastest = await Promise.race([
  fetch('/api/server1'),
  fetch('/api/server2'),
  new Promise((_, reject) => 
    setTimeout(() => reject('Timeout'), 5000)
  )
]);`} />
          </div>
          
          <div>
            <h4 style={{ color: 'var(--accent-orange)' }}>Promise.allSettled()</h4>
            <CodeBlock code={`// Ждёт ВСЕ промисы, не отклоняется при ошибках
const results = await Promise.allSettled([
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
]);
// [{status: 'fulfilled', value: 1},
//  {status: 'rejected', reason: 'error'},
//  {status: 'fulfilled', value: 3}]`} />
          </div>
          
          <div>
            <h4 style={{ color: 'var(--accent-cyan)' }}>Promise.any()</h4>
            <CodeBlock code={`// Возвращает первый УСПЕШНЫЙ результат
// Отклоняется только если ВСЕ отклонились
const first = await Promise.any([
  Promise.reject('error1'),
  Promise.resolve('success!'),
  Promise.reject('error2')
]);
// 'success!'`} />
          </div>
        </div>
      </div>

      <div className="card">
        <h3>⚠️ Частые ошибки</h3>
        <div className="info-box warning">
          <h4>Забытый return в цепочке</h4>
          <CodeBlock code={`// ❌ Неправильно
promise.then(result => {
  fetch('/api'); // Забыли return!
}).then(response => {
  // response будет undefined
});

// ✅ Правильно
promise.then(result => {
  return fetch('/api');
}).then(response => {
  // response — результат fetch
});`} />
        </div>

        <div className="info-box warning" style={{ marginTop: '16px' }}>
          <h4>Необработанные ошибки</h4>
          <CodeBlock code={`// ❌ Ошибка потеряется
promise.then(result => {
  throw new Error('Oops!');
});

// ✅ Всегда добавляйте .catch()
promise
  .then(result => { throw new Error('Oops!'); })
  .catch(error => console.error(error));`} />
        </div>
      </div>

      {/* Interview Questions */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">🎤 Вопросы на собеседовании</span>
          <span className="card-badge">Интервью</span>
        </div>
        
        <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
          <details className="interview-question">
            <summary>Чем отличается Promise.all от Promise.allSettled?</summary>
            <div style={{ padding: '16px', background: 'var(--bg-code)', marginTop: '8px', borderRadius: '8px' }}>
              <ul className="info-list">
                <li><strong>Promise.all</strong> — отклоняется при ПЕРВОЙ ошибке, не дожидаясь остальных</li>
                <li><strong>Promise.allSettled</strong> — ждёт ВСЕ промисы и возвращает массив с результатами/ошибками</li>
              </ul>
              <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>
                Используй allSettled когда нужны результаты всех операций, даже если некоторые упали.
              </p>
            </div>
          </details>

          <details className="interview-question">
            <summary>Что выведет этот код?</summary>
            <div style={{ padding: '16px', background: 'var(--bg-code)', marginTop: '8px', borderRadius: '8px' }}>
              <CodeBlock code={`Promise.resolve(1)
  .then(x => x + 1)
  .then(x => { throw new Error('fail'); })
  .then(x => x + 1)
  .catch(e => 10)
  .then(x => console.log(x));`} />
              <p style={{ color: 'var(--accent-green)', marginTop: '12px' }}>
                <strong>Ответ: 10</strong>
              </p>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                После ошибки цепочка переходит к catch, который возвращает 10. 
                Это значение передаётся следующему then.
              </p>
            </div>
          </details>

          <details className="interview-question">
            <summary>Можно ли отменить Promise?</summary>
            <div style={{ padding: '16px', background: 'var(--bg-code)', marginTop: '8px', borderRadius: '8px' }}>
              <p style={{ color: 'var(--accent-red)' }}>
                <strong>Нет, стандартные Promise нельзя отменить!</strong>
              </p>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                Но есть решения:
              </p>
              <ul className="info-list">
                <li><strong>AbortController</strong> — для fetch запросов</li>
                <li>Паттерн с флагом cancelled</li>
                <li>Библиотеки типа Bluebird с .cancel()</li>
              </ul>
            </div>
          </details>

          <details className="interview-question">
            <summary>Promise.resolve vs new Promise(resolve)</summary>
            <div style={{ padding: '16px', background: 'var(--bg-code)', marginTop: '8px', borderRadius: '8px' }}>
              <CodeBlock code={`// Эти записи эквивалентны:
Promise.resolve(42);
new Promise(resolve => resolve(42));

// НО! Promise.resolve с thenable:
Promise.resolve({ then: (cb) => cb(42) });
// Корректно "разворачивает" thenable объект`} />
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}
