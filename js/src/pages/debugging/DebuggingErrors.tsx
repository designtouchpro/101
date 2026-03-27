import { useState } from 'react'

const errorTypes = [
  { type: 'SyntaxError', icon: '📝', when: 'Парсинг (compile-time)', example: 'const x = {', desc: 'Нарушение синтаксиса. Ловится до исполнения.', catchable: false },
  { type: 'ReferenceError', icon: '🔗', when: 'Runtime', example: 'console.log(x) // not declared', desc: 'Обращение к несуществующей переменной.', catchable: true },
  { type: 'TypeError', icon: '🏷️', when: 'Runtime', example: 'null.toString()', desc: 'Операция над неподходящим типом.', catchable: true },
  { type: 'RangeError', icon: '📏', when: 'Runtime', example: 'new Array(-1)', desc: 'Значение вне допустимого диапазона.', catchable: true },
  { type: 'URIError', icon: '🌐', when: 'Runtime', example: 'decodeURI("%")', desc: 'Некорректный URI.', catchable: true },
]

const asyncErrors = [
  { scenario: 'Unhandled Promise rejection', code: `fetch('/api').then(r => r.json())
// Нет .catch → UnhandledPromiseRejection`, fix: 'Всегда добавлять .catch() или try/catch в async/await' },
  { scenario: 'Error в setTimeout', code: `try {
  setTimeout(() => { throw new Error('boom'); }, 0);
} catch (e) {
  // НЕ поймает! setTimeout — другой call stack
}`, fix: 'try/catch внутри callback, или window.onerror' },
  { scenario: 'Promise.all fail-fast', code: `Promise.all([fetchA(), fetchB()])
// Один reject = весь Promise.all reject`, fix: 'Promise.allSettled() если нужны все результаты' },
]

const debuggerTips = [
  { tool: 'console.log', icon: '📋', when: 'Quick check', tip: 'console.table() для массивов/объектов, console.group() для группировки' },
  { tool: 'debugger', icon: '🔴', when: 'Step-through', tip: 'Ставим debugger; в коде → открываем DevTools → step over/into/out' },
  { tool: 'Breakpoints', icon: '🎯', when: 'Условная остановка', tip: 'Conditional breakpoints: ПКМ → Add condition → x > 10' },
  { tool: 'Network tab', icon: '🌐', when: 'API debug', tip: 'Фильтр по XHR, копирование как cURL, throttling' },
  { tool: 'Performance tab', icon: '⚡', when: 'Perf issues', tip: 'Record → найти Long Tasks, layout thrashing, memory leaks' },
  { tool: 'Source maps', icon: '🗺️', when: 'Debug production', tip: 'Маппинг minified → source. Включить в Webpack/Vite config' },
]

const runtimeTraps = [
  { trap: '== vs ===', example: `0 == ''    // true (!)
0 == false // true (!)
null == undefined // true`, fix: 'Всегда === (strict equality)', why: '== делает type coercion по абстрактным правилам' },
  { trap: 'typeof null', example: `typeof null // 'object' (!)
typeof [] // 'object' (!)`, fix: 'Array.isArray(), obj === null', why: 'Исторический баг JS, typeof недостаточен' },
  { trap: 'Floating point', example: `0.1 + 0.2 === 0.3 // false (!)
0.1 + 0.2 // 0.30000000000000004`, fix: 'Math.abs(a - b) < Number.EPSILON, или целые (центы)', why: 'IEEE 754 double precision' },
  { trap: 'for...in на массивах', example: `const arr = [10, 20, 30];
for (let i in arr) {
  typeof i // 'string' (!)
}`, fix: 'for...of для итерации, for...in для объектов', why: 'for...in перебирает ключи (строки), includes prototype chain' },
  { trap: 'Implicit globals', example: `function f() {
  x = 10; // нет let/const → глобальная!
}`, fix: '"use strict" или ESLint no-undef', why: 'Без strict mode, присваивание без объявления создаёт global' },
  { trap: 'Array sort()', example: `[10, 9, 2, 1].sort()
// [1, 10, 2, 9] — лексикографически!`, fix: 'arr.sort((a, b) => a - b)', why: 'По умолчанию sort() конвертирует в строки' },
]

const globalHandlers = [
  { handler: 'window.onerror', scope: 'Синхронные + setTimeout', code: `window.onerror = (msg, src, line, col, err) => {
  sendToSentry({ msg, src, line, col, err });
  return true; // suppress default
};` },
  { handler: 'window.onunhandledrejection', scope: 'Promise rejection без .catch', code: `window.addEventListener('unhandledrejection', (e) => {
  sendToSentry({ reason: e.reason });
  e.preventDefault(); // suppress console error
});` },
  { handler: 'ErrorBoundary (React)', scope: 'Render errors в React', code: `class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    sendToSentry({ error, info });
  }
  render() {
    if (this.state.hasError) return <Fallback />;
    return this.props.children;
  }
}` },
]

export default function DebuggingErrors() {
  const [tab, setTab] = useState<'errors' | 'async' | 'debug' | 'traps' | 'global'>('errors')

  return (
    <div className="demo-container">
      <h1>🐛 Ошибки, отладка и ловушки Runtime</h1>
      <p>Типы ошибок, async-ловушки, инструменты отладки, runtime pitfalls и глобальные обработчики.</p>

      <div style={{ display: 'flex', gap: 8, margin: '24px 0', flexWrap: 'wrap' }}>
        {([
          ['errors', '🚨 Типы ошибок'],
          ['async', '⚡ Async ошибки'],
          ['debug', '🔍 Отладка'],
          ['traps', '🪤 Runtime ловушки'],
          ['global', '🌍 Global handlers'],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: tab === key ? '2px solid var(--accent)' : '1px solid var(--border)',
              background: tab === key ? 'var(--accent)' : 'var(--card-bg)',
              color: tab === key ? '#fff' : 'var(--text)',
              cursor: 'pointer',
              fontWeight: tab === key ? 600 : 400,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Error Types ── */}
      {tab === 'errors' && (
        <section className="card">
          <h2>🚨 Типы ошибок в JavaScript</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {errorTypes.map(e => (
              <div key={e.type} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8, borderLeft: `4px solid ${e.catchable ? 'var(--accent)' : '#ef4444'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                  <h3 style={{ margin: 0 }}>{e.icon} {e.type}</h3>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 4, background: 'var(--bg)' }}>{e.when}</span>
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 4, background: e.catchable ? '#22c55e22' : '#ef444422', color: e.catchable ? '#22c55e' : '#ef4444' }}>{e.catchable ? 'try/catch ✅' : 'Не ловится ❌'}</span>
                  </div>
                </div>
                <p style={{ margin: '0 0 8px', fontSize: '0.85rem' }}>{e.desc}</p>
                <pre style={{ margin: 0, padding: 10, background: 'var(--bg)', borderRadius: 6, fontSize: '0.8rem' }}>{e.example}</pre>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <h4 style={{ margin: '0 0 8px' }}>📐 Анатомия Error</h4>
            <pre style={{ margin: 0, padding: 12, background: 'var(--bg)', borderRadius: 6, fontSize: '0.8rem', lineHeight: 1.5 }}>{`const err = new Error('Something went wrong');
err.message  // 'Something went wrong'
err.name     // 'Error'
err.stack    // Stack trace (не стандартизирован, но есть везде)

// Custom Error
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}`}</pre>
          </div>
        </section>
      )}

      {/* ── Async Errors ── */}
      {tab === 'async' && (
        <section className="card">
          <h2>⚡ Ошибки в асинхронном коде</h2>
          <p style={{ marginBottom: 16, fontSize: '0.85rem', opacity: 0.8 }}>Главная ловушка: try/catch не ловит ошибки из другого call stack (setTimeout, Promise without catch).</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {asyncErrors.map(a => (
              <div key={a.scenario} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <h3 style={{ margin: '0 0 8px' }}>⚠️ {a.scenario}</h3>
                <pre style={{ margin: '0 0 8px', padding: 12, background: 'var(--bg)', borderRadius: 6, fontSize: '0.8rem', lineHeight: 1.5 }}>{a.code}</pre>
                <div style={{ fontSize: '0.85rem', padding: '8px 12px', background: 'var(--bg)', borderRadius: 6, borderLeft: '3px solid var(--accent)' }}>✅ {a.fix}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Debugging ── */}
      {tab === 'debug' && (
        <section className="card">
          <h2>🔍 Инструменты отладки</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {debuggerTips.map(d => (
              <div key={d.tool} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <h3 style={{ margin: '0 0 4px' }}>{d.icon} {d.tool}</h3>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: 8 }}>{d.when}</div>
                <div style={{ fontSize: '0.85rem' }}>{d.tip}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, padding: 16, background: 'var(--card-bg)', border: '2px solid var(--accent)', borderRadius: 8 }}>
            <h4 style={{ margin: '0 0 8px' }}>🔬 Стратегия диагностики</h4>
            <ol className="info-list">
              <li><strong>Reproduce</strong> — можешь ли стабильно повторить?</li>
              <li><strong>Isolate</strong> — сужай scope (binary search в коде)</li>
              <li><strong>Inspect</strong> — breakpoints, console, network tab</li>
              <li><strong>Hypothesize</strong> — что именно работает не так?</li>
              <li><strong>Fix & verify</strong> — исправь + добавь тест</li>
            </ol>
          </div>
        </section>
      )}

      {/* ── Runtime Traps ── */}
      {tab === 'traps' && (
        <section className="card">
          <h2>🪤 Runtime ловушки JavaScript</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {runtimeTraps.map(t => (
              <div key={t.trap} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <h3 style={{ margin: '0 0 8px' }}>🪤 {t.trap}</h3>
                <pre style={{ margin: '0 0 8px', padding: 10, background: 'var(--bg)', borderRadius: 6, fontSize: '0.8rem', lineHeight: 1.5 }}>{t.example}</pre>
                <div style={{ fontSize: '0.85rem', marginBottom: 4 }}>❓ <em>{t.why}</em></div>
                <div style={{ fontSize: '0.85rem', padding: '6px 12px', background: 'var(--bg)', borderRadius: 6, borderLeft: '3px solid var(--accent)' }}>✅ {t.fix}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Global Handlers ── */}
      {tab === 'global' && (
        <section className="card">
          <h2>🌍 Глобальные обработчики ошибок</h2>
          <p style={{ marginBottom: 16, fontSize: '0.85rem', opacity: 0.8 }}>Последний рубеж: ловим всё, что не поймали try/catch. Отправляем в Sentry / Datadog.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {globalHandlers.map(h => (
              <div key={h.handler} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                  <h3 style={{ margin: 0 }}>{h.handler}</h3>
                  <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: 4, background: 'var(--bg)' }}>{h.scope}</span>
                </div>
                <pre style={{ margin: 0, padding: 12, background: 'var(--bg)', borderRadius: 6, fontSize: '0.8rem', lineHeight: 1.5, overflow: 'auto' }}>{h.code}</pre>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Interview ── */}
      <section className="card">
        <h2>❓ Вопросы на собесе</h2>
        <div className="interview-item"><div className="q">Чем отличаются типы ошибок в JS?</div><div className="a">SyntaxError — при парсинге, до исполнения. ReferenceError — обращение к необъявленной переменной. TypeError — операция над неподходящим типом (null.toString()). RangeError — значение вне диапазона. Все кроме SyntaxError ловятся try/catch.</div></div>
        <div className="interview-item"><div className="q">Как ловить ошибки в асинхронном коде?</div><div className="a">Promise: .catch() или try/catch в async/await. setTimeout: try/catch внутри callback. Глобально: window.onerror (sync), window.onunhandledrejection (promises). В React: ErrorBoundary для render errors. Всегда добавлять global handlers для мониторинга (Sentry).</div></div>
        <div className="interview-item"><div className="q">Почему 0.1 + 0.2 !== 0.3?</div><div className="a">IEEE 754 double precision: не все десятичные дроби точно представимы в двоичной системе. 0.1 и 0.2 хранятся приблизительно, сумма = 0.30000000000000004. Решения: Number.EPSILON для сравнения, целые числа (центы вместо долларов), библиотеки (decimal.js).</div></div>
      </section>
    </div>
  )
}
