import CodeBlock from '../../components/CodeBlock'

interface MethodInfo {
  name: string
  color: string
  emoji: string
  when: string
  resolves: string
  rejects: string
  useCase: string
  code: string
  diagram: { label: string; status: 'ok' | 'fail' | 'pending'; delay: number }[]
  result: string
}

const methods: MethodInfo[] = [
  {
    name: 'Promise.all',
    color: '#3b82f6',
    emoji: '📦',
    when: 'Нужны ВСЕ результаты',
    resolves: 'Когда ВСЕ промисы fulfilled',
    rejects: 'При ПЕРВОМ reject — сразу ошибка',
    useCase: 'Загрузка данных из нескольких API, где все ответы нужны',
    code: `const [users, posts, comments] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json()),
]);
// Все 3 запроса параллельно!`,
    diagram: [
      { label: 'P1: users', status: 'ok', delay: 200 },
      { label: 'P2: posts', status: 'ok', delay: 400 },
      { label: 'P3: comments', status: 'ok', delay: 300 },
    ],
    result: '✅ [users, posts, comments] — массив всех результатов'
  },
  {
    name: 'Promise.allSettled',
    color: '#8b5cf6',
    emoji: '📋',
    when: 'Нужны результаты ВСЕХ, даже ошибки',
    resolves: 'Всегда! Ждёт ВСЕ промисы',
    rejects: 'Никогда не реджектится',
    useCase: 'Пакетная обработка — нужно знать, что удалось, а что нет',
    code: `const results = await Promise.allSettled([
  fetch('/api/email'),   // может упасть
  fetch('/api/sms'),     // может упасть
  fetch('/api/push'),    // может упасть
]);

results.forEach(r => {
  if (r.status === 'fulfilled') {
    console.log('OK:', r.value);
  } else {
    console.log('FAIL:', r.reason);
  }
});`,
    diagram: [
      { label: 'P1: email', status: 'ok', delay: 200 },
      { label: 'P2: sms', status: 'fail', delay: 350 },
      { label: 'P3: push', status: 'ok', delay: 300 },
    ],
    result: '✅ [{status:"fulfilled", value}, {status:"rejected", reason}, ...]'
  },
  {
    name: 'Promise.race',
    color: '#f59e0b',
    emoji: '🏁',
    when: 'Нужен ПЕРВЫЙ результат (любой)',
    resolves: 'Когда ПЕРВЫЙ промис settled (fulfilled или rejected)',
    rejects: 'Если первый settled — rejected',
    useCase: 'Таймауты, выбор самого быстрого сервера',
    code: `// Таймаут для запроса
const result = await Promise.race([
  fetch('/api/data'),
  new Promise((_, reject) => 
    setTimeout(() => reject('Timeout'), 3000)
  ),
]);

// Если fetch за 3 сек — OK
// Если нет — reject('Timeout')`,
    diagram: [
      { label: 'P1: fetch', status: 'pending', delay: 500 },
      { label: 'P2: timeout', status: 'fail', delay: 300 },
    ],
    result: '⚡ Результат самого быстрого промиса'
  },
  {
    name: 'Promise.any',
    color: '#10b981',
    emoji: '🎯',
    when: 'Нужен ПЕРВЫЙ успех',
    resolves: 'Когда ПЕРВЫЙ промис fulfilled',
    rejects: 'Только если ВСЕ rejected (AggregateError)',
    useCase: 'Зеркальные серверы — берём первый ответивший',
    code: `// Первый успешный зеркальный сервер
const fastest = await Promise.any([
  fetch('https://cdn1.example.com/data'),
  fetch('https://cdn2.example.com/data'),
  fetch('https://cdn3.example.com/data'),
]);

// Возвращает первый УСПЕШНЫЙ ответ
// Ошибки игнорируются, пока есть хоть 1 успех`,
    diagram: [
      { label: 'P1: cdn1', status: 'fail', delay: 100 },
      { label: 'P2: cdn2', status: 'ok', delay: 250 },
      { label: 'P3: cdn3', status: 'ok', delay: 400 },
    ],
    result: '🎯 Значение первого fulfilled промиса (cdn2)'
  }
]

const comparisonData = [
  { method: 'Promise.all', waitFor: 'Все fulfilled', failOn: 'Первый reject', returns: 'Array<value>', neverRejects: false },
  { method: 'Promise.allSettled', waitFor: 'Все settled', failOn: 'Никогда', returns: 'Array<{status, value/reason}>', neverRejects: true },
  { method: 'Promise.race', waitFor: 'Первый settled', failOn: 'Если первый — reject', returns: 'value | reason', neverRejects: false },
  { method: 'Promise.any', waitFor: 'Первый fulfilled', failOn: 'Все rejected', returns: 'value', neverRejects: false },
]

export default function PromiseMethodsDemo() {
  return (
    <div className="page-container">
      <h1>🔀 Promise.all / race / any / allSettled</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
        Полная инфографика по комбинаторам промисов. Когда использовать, как работают, чем отличаются.
      </p>

      {/* Comparison Table */}
      <div className="card" style={{ marginBottom: 32, overflowX: 'auto' }}>
        <h3 style={{ marginBottom: 16 }}>📊 Сравнительная таблица</h3>
        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color, #333)' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Метод</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Ждёт</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Ошибка при</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Возвращает</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #222)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: methods[i].color }}>
                  {row.method}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{row.waitFor}</td>
                <td style={{ padding: '12px 16px', color: row.neverRejects ? '#10b981' : '#f59e0b' }}>
                  {row.failOn}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <code style={{ fontSize: '0.8rem', padding: '2px 6px', background: 'var(--bg-code)', borderRadius: 4 }}>
                    {row.returns}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Method Cards */}
      {methods.map((m, idx) => (
        <div key={idx} className="card" style={{ marginBottom: 24, borderLeft: `4px solid ${m.color}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: '1.5rem' }}>{m.emoji}</span>
            <h2 style={{ margin: 0, color: m.color }}>{m.name}</h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
            gap: 12, 
            marginBottom: 20 
          }}>
            <div style={{ padding: 12, background: 'var(--bg-code)', borderRadius: 8 }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Когда использовать</div>
              <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{m.when}</div>
            </div>
            <div style={{ padding: 12, background: 'var(--bg-code)', borderRadius: 8 }}>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginBottom: 4 }}>Резолвится</div>
              <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{m.resolves}</div>
            </div>
            <div style={{ padding: 12, background: 'var(--bg-code)', borderRadius: 8 }}>
              <div style={{ fontSize: '0.75rem', color: '#ef4444', marginBottom: 4 }}>Реджектится</div>
              <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{m.rejects}</div>
            </div>
          </div>

          {/* Visual Timeline Diagram */}
          <div style={{ 
            padding: 16, 
            background: 'var(--bg-code)', 
            borderRadius: 8, 
            marginBottom: 16 
          }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>Визуальная диаграмма</div>
            {m.diagram.map((d, di) => (
              <div key={di} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ width: 90, fontSize: '0.85rem', color: 'var(--text-secondary)', flexShrink: 0 }}>{d.label}</span>
                <div style={{ flex: 1, height: 24, background: 'var(--bg-elevated, #1a1a2e)', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min((d.delay / 500) * 100, 100)}%`,
                    background: d.status === 'ok' 
                      ? 'linear-gradient(90deg, rgba(16,185,129,0.3), rgba(16,185,129,0.6))' 
                      : d.status === 'fail'
                        ? 'linear-gradient(90deg, rgba(239,68,68,0.3), rgba(239,68,68,0.6))'
                        : 'linear-gradient(90deg, rgba(156,163,175,0.3), rgba(156,163,175,0.4))',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: 8,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'white'
                  }}>
                    {d.status === 'ok' ? '✅' : d.status === 'fail' ? '❌' : '⏳'} {d.delay}ms
                  </div>
                </div>
              </div>
            ))}
            <div style={{ 
              marginTop: 8, 
              paddingTop: 8, 
              borderTop: '1px solid var(--border-color, #333)', 
              fontSize: '0.85rem', 
              color: m.color,
              fontWeight: 500 
            }}>
              → {m.result}
            </div>
          </div>

          {/* Use Case + Code */}
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
            💡 <strong>Пример:</strong> {m.useCase}
          </div>
          <CodeBlock code={m.code} language="javascript" />
        </div>
      ))}

      {/* Decision Helper */}
      <div className="card" style={{ marginTop: 8 }}>
        <h3 style={{ marginBottom: 16 }}>🤔 Какой метод выбрать?</h3>
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, padding: '12px 16px', background: 'rgba(59,130,246,0.1)', borderRadius: 8, borderLeft: '3px solid #3b82f6' }}>
            <span style={{ fontSize: '1.2rem' }}>📦</span>
            <div>
              <div style={{ fontWeight: 600, color: '#3b82f6' }}>Promise.all</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                «Мне нужны ВСЕ данные, и если хоть одно упадёт — всё отменяем» → Загрузка страницы, инициализация
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, padding: '12px 16px', background: 'rgba(139,92,246,0.1)', borderRadius: 8, borderLeft: '3px solid #8b5cf6' }}>
            <span style={{ fontSize: '1.2rem' }}>📋</span>
            <div>
              <div style={{ fontWeight: 600, color: '#8b5cf6' }}>Promise.allSettled</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                «Мне нужны все результаты, даже если что-то упало» → Пакетная рассылка, batch-обработка
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, padding: '12px 16px', background: 'rgba(245,158,11,0.1)', borderRadius: 8, borderLeft: '3px solid #f59e0b' }}>
            <span style={{ fontSize: '1.2rem' }}>🏁</span>
            <div>
              <div style={{ fontWeight: 600, color: '#f59e0b' }}>Promise.race</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                «Мне нужен самый быстрый ответ (или timeout)» → Таймауты, гонки
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, padding: '12px 16px', background: 'rgba(16,185,129,0.1)', borderRadius: 8, borderLeft: '3px solid #10b981' }}>
            <span style={{ fontSize: '1.2rem' }}>🎯</span>
            <div>
              <div style={{ fontWeight: 600, color: '#10b981' }}>Promise.any</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                «Мне нужен первый УСПЕХ, ошибки не важны» → Зеркала, fallback серверы
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
