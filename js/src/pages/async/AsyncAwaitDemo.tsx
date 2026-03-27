import CodeBlock from '../../components/CodeBlock'

export default function AsyncAwaitDemo() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>⏳ Async/Await</h1>
        <p>
          Async/await — синтаксический сахар над промисами, делающий асинхронный код 
          похожим на синхронный. Под капотом использует генераторы и промисы.
        </p>
      </div>

      <div className="card">
        <h3>📝 Базовый синтаксис</h3>
        <CodeBlock code={`// async функция всегда возвращает Promise
async function fetchUser(id) {
  // await приостанавливает выполнение до resolve промиса
  const response = await fetch('/api/users/' + id);
  const user = await response.json();
  return user; // Оборачивается в Promise.resolve(user)
}

// Использование
const user = await fetchUser(1);
console.log(user);

// Или с .then()
fetchUser(1).then(user => console.log(user));`} />
      </div>

      <div className="card">
        <h3>🔄 Сравнение с Promise chains</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Promise chains</h4>
            <CodeBlock code={`function loadUserPosts(userId) {
  return fetch('/api/users/' + userId)
    .then(res => res.json())
    .then(user => {
      return fetch('/api/posts?author=' + user.name)
    })
    .then(res => res.json())
    .then(posts => {
      return { user, posts };
    });
}`} />
          </div>
          <div>
            <h4 style={{ color: 'var(--accent-js)', marginBottom: '8px' }}>Async/Await</h4>
            <CodeBlock code={`async function loadUserPosts(userId) {
  const userRes = await fetch('/api/users/' + userId);
  const user = await userRes.json();
  
  const postsRes = await fetch('/api/posts?author=' + user.name);
  const posts = await postsRes.json();
  
  return { user, posts };
}`} />
          </div>
        </div>
      </div>

      <div className="card">
        <h3>❌ Обработка ошибок</h3>
        <CodeBlock code={`// try/catch — стандартный способ
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error('HTTP error: ' + response.status);
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    // Можно вернуть значение по умолчанию
    return { data: [] };
  } finally {
    // Выполнится в любом случае
    console.log('Запрос завершён');
  }
}

// Или .catch() на вызове
fetchData().catch(error => console.error(error));`} />
      </div>

      <div className="card">
        <h3>⚡ Параллельное выполнение</h3>
        <div className="info-box warning">
          <h4>⚠️ Последовательное (медленно)</h4>
          <CodeBlock code={`// Каждый await ждёт предыдущий
async function slow() {
  const user = await fetchUser(); // 1 секунда
  const posts = await fetchPosts(); // + 1 секунда
  const comments = await fetchComments(); // + 1 секунда
  // Итого: ~3 секунды
}`} />
        </div>
        
        <div className="info-box success" style={{ marginTop: '16px' }}>
          <h4>✅ Параллельное (быстро)</h4>
          <CodeBlock code={`// Promise.all запускает всё параллельно
async function fast() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
  ]);
  // Итого: ~1 секунда (время самого долгого)
}`} />
        </div>
      </div>

      <div className="card">
        <h3>🔄 Async в циклах</h3>
        <CodeBlock code={`const ids = [1, 2, 3, 4, 5];

// ❌ forEach НЕ ждёт async
ids.forEach(async (id) => {
  await processItem(id); // Запустятся параллельно!
});

// ✅ for...of — последовательно
for (const id of ids) {
  await processItem(id); // Ждёт каждый
}

// ✅ Promise.all — параллельно
await Promise.all(ids.map(id => processItem(id)));

// ✅ for await...of — для асинхронных итераторов
for await (const item of asyncIterable) {
  console.log(item);
}`} />
      </div>

      <div className="card">
        <h3>🎯 Паттерны использования</h3>
        
        <h4 style={{ marginTop: '16px' }}>Retry с задержкой</h4>
        <CodeBlock code={`async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}`} />

        <h4 style={{ marginTop: '16px' }}>Timeout</h4>
        <CodeBlock code={`async function fetchWithTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}`} />

        <h4 style={{ marginTop: '16px' }}>IIFE для top-level await</h4>
        <CodeBlock code={`// В модулях можно использовать top-level await
const data = await fetch('/api').then(r => r.json());

// В обычных скриптах — IIFE
(async () => {
  const data = await fetch('/api').then(r => r.json());
  console.log(data);
})();`} />
      </div>

      <div className="card">
        <h3>🔍 Под капотом</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Async/await транспилируется в генераторы и промисы:
        </p>
        <CodeBlock code={`// Это:
async function example() {
  const a = await promise1;
  const b = await promise2;
  return a + b;
}

// Становится примерно этим:
function example() {
  return new Promise((resolve, reject) => {
    promise1.then(a => {
      promise2.then(b => {
        resolve(a + b);
      }).catch(reject);
    }).catch(reject);
  });
}`} />
      </div>
    </div>
  )
}
