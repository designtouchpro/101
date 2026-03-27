import { useState } from 'react'

type Tab = 'storage' | 'fetch' | 'workers' | 'scheduling' | 'observers'

export default function BrowserAPIs() {
  const [tab, setTab] = useState<Tab>('storage')

  return (
    <div className="demo-container">
      <h1>🌐 Browser APIs и Scheduling</h1>
      <p className="section-desc">
        Storage, Fetch lifecycle, Web Workers, Scheduling API, Observers —
        категории браузерных API и их use cases.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {([
          ['storage', '💾 Storage'],
          ['fetch', '🔄 Fetch Lifecycle'],
          ['workers', '⚙️ Workers'],
          ['scheduling', '⏱️ Scheduling'],
          ['observers', '👁️ Observers'],
        ] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              cursor: 'pointer', padding: '8px 16px', fontSize: '0.9rem',
              border: '1px solid var(--border)', borderRadius: 8,
              background: tab === key ? 'var(--accent-blue, #007AFF)' : 'var(--bg-secondary)',
              color: tab === key ? '#fff' : 'var(--text-primary)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'storage' && (
        <>
          <section className="card">
            <h2>💾 Сравнение Storage API</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>API</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Размер</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Тип данных</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Срок жизни</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Синхронность</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { api: 'localStorage', size: '5-10 MB', type: 'string only', life: 'Пока не очистят', sync: '🔴 Sync (main thread)' },
                  { api: 'sessionStorage', size: '5-10 MB', type: 'string only', life: 'До закрытия вкладки', sync: '🔴 Sync' },
                  { api: 'IndexedDB', size: '> 50 MB', type: 'Любые (structured clone)', life: 'Пока не очистят', sync: '🟢 Async' },
                  { api: 'Cookies', size: '4 KB', type: 'string', life: 'Настраивается (expires)', sync: '🔴 Sync, шлются на сервер' },
                  { api: 'Cache API', size: '> 100 MB', type: 'Request/Response', life: 'Пока не очистят', sync: '🟢 Async (Service Worker)' },
                ].map(r => (
                  <tr key={r.api} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8, fontWeight: 600 }}>{r.api}</td>
                    <td style={{ padding: 8 }}>{r.size}</td>
                    <td style={{ padding: 8 }}>{r.type}</td>
                    <td style={{ padding: 8 }}>{r.life}</td>
                    <td style={{ padding: 8 }}>{r.sync}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>📌 Когда что выбирать</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
              {[
                { api: 'localStorage', when: 'Настройки UI, токены (не sensitive), тема', not: 'Большие данные, sensitive info' },
                { api: 'IndexedDB', when: 'Offline data, blob storage, кэш приложения', not: 'Простые key-value' },
                { api: 'Cookies', when: 'Аутентификация (httpOnly), серверный state', not: 'Client-side state' },
                { api: 'Cache API', when: 'PWA offline, кэш ресурсов', not: 'User data' },
              ].map(c => (
                <div key={c.api} style={{ padding: 12, borderRadius: 8, border: '1px solid var(--border)' }}>
                  <strong>{c.api}</strong>
                  <div style={{ marginTop: 4, color: '#34C759', fontSize: '0.9rem' }}>✅ {c.when}</div>
                  <div style={{ marginTop: 2, color: '#FF3B30', fontSize: '0.9rem' }}>❌ {c.not}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>🔧 Примеры</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`// localStorage — sync, string-only
localStorage.setItem('theme', 'dark')
const theme = localStorage.getItem('theme') // 'dark'
// ⚠️ JSON.stringify/parse для объектов
localStorage.setItem('user', JSON.stringify({ name: 'Alice' }))
const user = JSON.parse(localStorage.getItem('user') ?? '{}')

// IndexedDB — async, structured data
const request = indexedDB.open('myDB', 1)
request.onupgradeneeded = (e) => {
  const db = e.target.result
  db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true })
}
request.onsuccess = (e) => {
  const db = e.target.result
  const tx = db.transaction('todos', 'readwrite')
  tx.objectStore('todos').add({ text: 'Learn JS', done: false })
}

// Cookie (secure, httpOnly ставится сервером)
document.cookie = 'lang=ru; max-age=86400; SameSite=Lax; Secure'

// Cache API (Service Worker)
caches.open('v1').then(cache => {
  cache.addAll(['/index.html', '/styles.css', '/app.js'])
})`}
            </pre>
          </section>
        </>
      )}

      {tab === 'fetch' && (
        <>
          <section className="card">
            <h2>🔄 Fetch API Lifecycle</h2>
            <div style={{
              display: 'flex', gap: 8, flexWrap: 'wrap', padding: 16,
              background: 'var(--bg-secondary)', borderRadius: 8, alignItems: 'center',
            }}>
              {[
                { step: 'Request', color: '#007AFF' },
                { step: 'DNS + TCP + TLS', color: '#FF9500' },
                { step: 'Server Process', color: '#AF52DE' },
                { step: 'Response Headers', color: '#FF9500' },
                { step: 'Body Stream', color: '#34C759' },
              ].map((s, i) => (
                <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    padding: '8px 14px', borderRadius: 8,
                    background: s.color, color: '#fff', fontSize: '0.8rem', fontWeight: 600,
                  }}>
                    {s.step}
                  </div>
                  {i < 4 && <span>→</span>}
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>🛠 Fetch паттерны</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`// 1. Базовый fetch с обработкой ошибок
async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
  return res.json()
  // ⚠️ fetch НЕ бросает при 4xx/5xx — только при network error
}

// 2. Timeout через AbortController
async function fetchWithTimeout(url, ms = 5000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  try {
    const res = await fetch(url, { signal: controller.signal })
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

// 3. Retry pattern
async function fetchRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchJSON(url)
    } catch (e) {
      if (i === retries - 1) throw e
      await new Promise(r => setTimeout(r, delay * (i + 1)))
    }
  }
}

// 4. Streaming response
async function fetchStream(url) {
  const res = await fetch(url)
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    console.log(decoder.decode(value))
  }
}

// 5. Request с credentials и CORS
fetch('/api/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value' }),
  credentials: 'include',  // отправлять cookies
  mode: 'cors',
})`}
            </pre>
          </section>

          <section className="card">
            <h2>⚠️ Типичные ошибки Fetch</h2>
            {[
              { mistake: 'Не проверять res.ok', fix: 'fetch не бросает при 404/500. Всегда проверяйте response.ok' },
              { mistake: 'Не отменять запросы при unmount', fix: 'AbortController в useEffect cleanup' },
              { mistake: 'await fetch().json() ← syntax', fix: 'Правильно: const res = await fetch(); await res.json()' },
              { mistake: 'Race condition при быстрых запросах', fix: 'AbortController: отменять предыдущий при новом' },
            ].map(p => (
              <div key={p.mistake} style={{ padding: 12, borderRadius: 8, border: '1px solid var(--border)', marginBottom: 8 }}>
                <strong style={{ color: '#FF3B30' }}>❌ {p.mistake}</strong>
                <div style={{ marginTop: 4, color: '#34C759' }}>✅ {p.fix}</div>
              </div>
            ))}
          </section>
        </>
      )}

      {tab === 'workers' && (
        <>
          <section className="card">
            <h2>⚙️ Типы Web Workers</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Тип</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Scope</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Доступ к DOM</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Use Case</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'Web Worker', scope: 'Один скрипт', dom: '❌ Нет', use: 'Тяжёлые вычисления (парсинг, крипто, сортировка)' },
                  { type: 'Shared Worker', scope: 'Разделяемый между вкладками', dom: '❌ Нет', use: 'Общий state между tabs' },
                  { type: 'Service Worker', scope: 'Proxy для сети', dom: '❌ Нет', use: 'Offline, push, cache' },
                  { type: 'Worklet (CSS/Audio)', scope: 'Специализированный', dom: '❌ Нет', use: 'CSS Paint API, Audio processing' },
                ].map(r => (
                  <tr key={r.type} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8, fontWeight: 600 }}>{r.type}</td>
                    <td style={{ padding: 8 }}>{r.scope}</td>
                    <td style={{ padding: 8 }}>{r.dom}</td>
                    <td style={{ padding: 8 }}>{r.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>🔧 Web Worker пример</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`// heavy-worker.js
self.onmessage = (e) => {
  const { data } = e
  // Тяжёлая операция — не блокирует main thread
  const result = data.sort((a, b) => a - b)
  self.postMessage(result)
}

// main.js
const worker = new Worker('heavy-worker.js')
worker.postMessage(bigArray)
worker.onmessage = (e) => {
  console.log('Sorted:', e.data)
}
worker.onerror = (e) => {
  console.error('Worker error:', e.message)
}
// Завершить worker
// worker.terminate()

// Передача через Transferable (zero-copy)
const buffer = new ArrayBuffer(1024 * 1024)
worker.postMessage(buffer, [buffer]) // buffer теперь neutered
console.log(buffer.byteLength) // 0 — передан в worker`}
            </pre>
          </section>

          <section className="card">
            <h2>🔄 Service Worker Lifecycle</h2>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 8, padding: 16,
              background: 'var(--bg-secondary)', borderRadius: 8,
            }}>
              {[
                { phase: 'Register', desc: 'navigator.serviceWorker.register(\'/sw.js\')' },
                { phase: 'Install', desc: 'Кэширование статических ресурсов (event: install)' },
                { phase: 'Activate', desc: 'Очистка старых кэшей (event: activate)' },
                { phase: 'Fetch', desc: 'Перехват запросов (event: fetch) → cache-first / network-first' },
                { phase: 'Update', desc: 'Новый SW ждёт закрытия всех вкладок (skipWaiting для ускорения)' },
              ].map((p, i) => (
                <div key={p.phase} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: '#007AFF', color: '#fff', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0,
                  }}>
                    {i + 1}
                  </span>
                  <div>
                    <strong>{p.phase}</strong>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === 'scheduling' && (
        <>
          <section className="card">
            <h2>⏱️ Scheduling APIs</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>API</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Когда выполняется</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Use Case</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Очередь</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { api: 'queueMicrotask()', when: 'После текущей task, до rendering', use: 'Cleanup без задержки', q: 'Microtask' },
                  { api: 'Promise.resolve().then()', when: 'Microtask queue', use: 'Async chaining', q: 'Microtask' },
                  { api: 'setTimeout(fn, 0)', when: 'Следующая macrotask (1-4ms min)', use: 'Уступить main thread', q: 'Macrotask' },
                  { api: 'requestAnimationFrame()', when: 'Перед следующим repaint (~16ms)', use: 'Анимации, DOM reads', q: 'До paint' },
                  { api: 'requestIdleCallback()', when: 'Когда браузер простаивает', use: 'Analytics, prefetch, lazy init', q: 'Idle' },
                  { api: 'scheduler.postTask()', when: 'С приоритетом (user-blocking/background)', use: 'Приоритезация задач', q: 'По приоритету' },
                  { api: 'MessageChannel', when: 'Macrotask (быстрее setTimeout)', use: 'React Scheduler использует это', q: 'Macrotask' },
                ].map(r => (
                  <tr key={r.api} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8, fontFamily: 'monospace', fontWeight: 600 }}>{r.api}</td>
                    <td style={{ padding: 8 }}>{r.when}</td>
                    <td style={{ padding: 8 }}>{r.use}</td>
                    <td style={{ padding: 8, color: 'var(--text-secondary)' }}>{r.q}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>🔧 Примеры Scheduling</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`// requestAnimationFrame — анимации и DOM batch
function animate() {
  element.style.transform = \`translateX(\${pos}px)\`
  pos += 2
  if (pos < 300) requestAnimationFrame(animate)
}
requestAnimationFrame(animate)

// requestIdleCallback — non-urgent work
function processQueue(deadline) {
  while (queue.length > 0 && deadline.timeRemaining() > 1) {
    processItem(queue.shift())
  }
  if (queue.length > 0) {
    requestIdleCallback(processQueue, { timeout: 2000 })
  }
}
requestIdleCallback(processQueue)

// scheduler.postTask() — Prioritized Task Scheduling
// Chrome 94+
scheduler.postTask(() => {
  // Критично для пользователя
  handleUserClick()
}, { priority: 'user-blocking' })

scheduler.postTask(() => {
  // Фоновая работа
  sendAnalytics()
}, { priority: 'background' })

// Yield to main thread (modern pattern)
async function yieldToMain() {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
    // или: scheduler.yield() (Stage 2 proposal)
  })
}

async function processLargeArray(items) {
  for (let i = 0; i < items.length; i++) {
    process(items[i])
    if (i % 100 === 0) await yieldToMain() // не блокировать UI
  }
}`}
            </pre>
          </section>

          <section className="card">
            <h2>📊 Порядок выполнения</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`console.log('1. Sync')

queueMicrotask(() => console.log('2. Microtask'))

Promise.resolve().then(() => console.log('3. Promise (microtask)'))

setTimeout(() => console.log('5. setTimeout (macrotask)'), 0)

requestAnimationFrame(() => console.log('4. rAF (before paint)'))

requestIdleCallback(() => console.log('6. Idle callback'))

// Порядок: 1 → 2 → 3 → 4 → 5 → 6
// Sync → Microtasks → rAF → Paint → Macrotask → Idle`}
            </pre>
          </section>
        </>
      )}

      {tab === 'observers' && (
        <>
          <section className="card">
            <h2>👁️ Observer APIs</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Observer</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Что наблюдает</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Use Case</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { obs: 'IntersectionObserver', what: 'Видимость элемента в viewport', use: 'Lazy loading, infinite scroll, analytics' },
                  { obs: 'MutationObserver', what: 'Изменения DOM-дерева', use: 'Widget libs, content monitoring' },
                  { obs: 'ResizeObserver', what: 'Размер элемента', use: 'Responsive components, charts' },
                  { obs: 'PerformanceObserver', what: 'Performance entries', use: 'Web Vitals, custom metrics' },
                  { obs: 'ReportingObserver', what: 'Deprecated API usage, interventions', use: 'Мониторинг deprecated features' },
                ].map(r => (
                  <tr key={r.obs} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8, fontWeight: 600 }}>{r.obs}</td>
                    <td style={{ padding: 8 }}>{r.what}</td>
                    <td style={{ padding: 8 }}>{r.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>🔧 Примеры Observer</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`// IntersectionObserver — lazy loading images
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      observer.unobserve(img)
    }
  })
}, { rootMargin: '100px' }) // preload 100px до viewport

document.querySelectorAll('img[data-src]')
  .forEach(img => observer.observe(img))

// ResizeObserver — responsive component
const ro = new ResizeObserver(entries => {
  for (const entry of entries) {
    const { width } = entry.contentRect
    entry.target.classList.toggle('compact', width < 400)
  }
})
ro.observe(myElement)

// MutationObserver — track DOM changes
const mo = new MutationObserver(mutations => {
  for (const m of mutations) {
    console.log('DOM changed:', m.type, m.addedNodes)
  }
})
mo.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
})

// PerformanceObserver — Web Vitals
const po = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(\`\${entry.name}: \${entry.value}ms\`)
  }
})
po.observe({ type: 'largest-contentful-paint', buffered: true })`}
            </pre>
          </section>

          <section className="card">
            <h2>📊 Категоризация Browser APIs</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Категория</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>APIs</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Thread</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cat: 'DOM', apis: 'querySelector, createElement, classList, dataset', thread: 'Main' },
                  { cat: 'Events', apis: 'addEventListener, CustomEvent, EventTarget', thread: 'Main' },
                  { cat: 'Storage', apis: 'localStorage, IndexedDB, Cache API, Cookies', thread: 'Main / Worker' },
                  { cat: 'Network', apis: 'fetch, XMLHttpRequest, WebSocket, EventSource', thread: 'Main / Worker' },
                  { cat: 'Timing', apis: 'setTimeout, rAF, rIC, Performance API', thread: 'Main' },
                  { cat: 'Graphics', apis: 'Canvas, WebGL, SVG, CSS animations', thread: 'Main (+ GPU)' },
                  { cat: 'Media', apis: 'MediaStream, Web Audio, WebRTC', thread: 'Main / Worklet' },
                  { cat: 'Device', apis: 'Geolocation, Clipboard, Notifications, Vibration', thread: 'Main' },
                ].map(r => (
                  <tr key={r.cat} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8, fontWeight: 600 }}>{r.cat}</td>
                    <td style={{ padding: 8, fontSize: '0.9rem' }}>{r.apis}</td>
                    <td style={{ padding: 8, color: 'var(--text-secondary)' }}>{r.thread}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </div>
  )
}
