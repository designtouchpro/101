import { useState, useEffect, useRef, useCallback } from 'react'

interface Metric {
  name: string
  fullName: string
  good: string
  needsImprovement: string
  poor: string
  description: string
  howToFix: string[]
  color: string
}

const metrics: Metric[] = [
  {
    name: 'LCP',
    fullName: 'Largest Contentful Paint',
    good: '≤ 2.5s',
    needsImprovement: '2.5s — 4s',
    poor: '> 4s',
    description: 'Время рендера самого большого видимого элемента (картинка, видео, текстовый блок). Показывает, когда основной контент готов.',
    howToFix: [
      'Оптимизировать картинки (WebP/AVIF, lazy loading)',
      'Preload ключевые ресурсы (<link rel="preload">)',
      'SSR/SSG для быстрого первого рендера',
      'CDN для статики',
      'Убрать render-blocking CSS/JS',
    ],
    color: 'var(--accent-cyan)'
  },
  {
    name: 'INP',
    fullName: 'Interaction to Next Paint',
    good: '≤ 200ms',
    needsImprovement: '200ms — 500ms',
    poor: '> 500ms',
    description: 'Задержка от клика/нажатия до визуального обновления. Заменил FID в 2024. Измеряет ВСЕ взаимодействия за сессию, берёт наихудшее.',
    howToFix: [
      'Избегать длинных задач в main thread (> 50ms)',
      'Разбивать работу через requestIdleCallback / scheduler.yield()',
      'Минимизировать re-render (React.memo, v-once)',
      'Web Workers для тяжёлых вычислений',
      'Оптимизировать обработчики событий',
    ],
    color: 'var(--accent-orange)'
  },
  {
    name: 'CLS',
    fullName: 'Cumulative Layout Shift',
    good: '≤ 0.1',
    needsImprovement: '0.1 — 0.25',
    poor: '> 0.25',
    description: 'Сумма всех неожиданных сдвигов layout. Когда элементы прыгают на странице — плохой CLS. Безразмерная величина (не секунды!).',
    howToFix: [
      'Указывать width/height для img и video',
      'Использовать aspect-ratio в CSS',
      'Резервировать место для рекламы и динамического контента',
      'Избегать вставки контента выше текущего viewport',
      'Использовать font-display: swap + size-adjust',
    ],
    color: 'var(--accent-green)'
  },
]

const secondaryMetrics = [
  { name: 'FCP', fullName: 'First Contentful Paint', desc: 'Время до первого пикселя контента (текст, картинка, SVG). Показывает начало загрузки.', good: '≤ 1.8s' },
  { name: 'TTFB', fullName: 'Time to First Byte', desc: 'Время от запроса до первого байта ответа. Показывает скорость сервера.', good: '≤ 0.8s' },
  { name: 'FID', fullName: 'First Input Delay', desc: '⚠️ Устарел (март 2024). Заменён на INP. Измерял задержку только ПЕРВОГО взаимодействия.', good: '≤ 100ms' },
  { name: 'TBT', fullName: 'Total Blocking Time', desc: 'Суммарное время блокировки main thread (задачи > 50ms). Lab-метрика, коррелирует с INP.', good: '≤ 200ms' },
  { name: 'SI', fullName: 'Speed Index', desc: 'Как быстро контент визуально заполняет viewport. Lab-метрика из Lighthouse.', good: '≤ 3.4s' },
]

export default function WebVitalsDemo() {
  const [activeTab, setActiveTab] = useState<'core' | 'all' | 'measure' | 'interview'>('core')
  const [clsDemo, setClsDemo] = useState(false)
  const [lcpTime, setLcpTime] = useState<number | null>(null)
  const lcpRef = useRef<HTMLDivElement>(null)
  const [inpDemo, setInpDemo] = useState(false)
  const [inpTime, setInpTime] = useState<number | null>(null)

  // Simulate LCP measurement
  useEffect(() => {
    const start = performance.now()
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const last = entries[entries.length - 1]
      setLcpTime(Math.round(last.startTime))
    })
    try {
      observer.observe({ type: 'largest-contentful-paint', buffered: true })
    } catch {
      setLcpTime(Math.round(performance.now() - start))
    }
    return () => observer.disconnect()
  }, [])

  // INP demo - simulate heavy work
  const handleInpClick = useCallback(() => {
    const start = performance.now()
    // Simulate heavy computation
    let sum = 0
    for (let i = 0; i < 10_000_000; i++) sum += Math.sqrt(i)
    setInpDemo(true)
    setInpTime(Math.round(performance.now() - start))
    setTimeout(() => setInpDemo(false), 2000)
  }, [])

  return (
    <div className="page-container">
      <h1>📊 Web Vitals</h1>
      <p className="page-description">
        Core Web Vitals — метрики Google для оценки пользовательского опыта. 
        Влияют на SEO-ранжирование. Обязательные знания для фронтендера.
      </p>

      <div className="tabs" style={{ marginBottom: '24px' }}>
        {[
          { key: 'core', label: '⭐ Core Web Vitals' },
          { key: 'all', label: '📊 Все метрики' },
          { key: 'measure', label: '🔬 Измерение' },
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

      {/* Core Web Vitals */}
      {activeTab === 'core' && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">⭐ Core Web Vitals (2024)</span>
              <span className="card-badge">Влияют на SEO!</span>
            </div>

            <div className="info-box">
              <strong>3 ключевые метрики Google:</strong> LCP (загрузка), INP (интерактивность), CLS (визуальная стабильность).
              Заменяют старые метрики. Используются для ранжирования в Google Search.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
              {metrics.map(metric => (
                <div key={metric.name} style={{
                  padding: '20px',
                  background: 'var(--bg-code)',
                  borderRadius: '12px',
                  borderTop: `3px solid ${metric.color}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h3 style={{ color: metric.color, fontSize: '1.3rem' }}>{metric.name}</h3>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    {metric.fullName}
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                    {metric.description}
                  </p>

                  {/* Thresholds */}
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                    <div style={{ flex: 1, textAlign: 'center', padding: '6px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '4px' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--accent-green)' }}>Хорошо</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-green)' }}>{metric.good}</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', padding: '6px', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '4px' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--accent-orange)' }}>Средне</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-orange)' }}>{metric.needsImprovement}</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', padding: '6px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--accent-red)' }}>Плохо</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-red)' }}>{metric.poor}</div>
                    </div>
                  </div>

                  <h4 style={{ fontSize: '0.82rem', marginBottom: '6px' }}>🔧 Как улучшить:</h4>
                  <ul className="info-list">
                    {metric.howToFix.map((fix, i) => (
                      <li key={i} style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {fix}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive demos */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">🎮 Живые демонстрации</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {/* LCP */}
              <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px' }}>
                <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '8px' }}>📸 LCP этой страницы</h4>
                <div ref={lcpRef} style={{ 
                  textAlign: 'center', 
                  padding: '20px',
                  background: 'rgba(6, 182, 212, 0.05)',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                    {lcpTime !== null ? `${lcpTime}ms` : '...'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    LCP (из PerformanceObserver)
                  </div>
                </div>
              </div>

              {/* INP */}
              <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px' }}>
                <h4 style={{ color: 'var(--accent-orange)', marginBottom: '8px' }}>⚡ INP Demo</h4>
                <button 
                  className="btn btn-primary" 
                  onClick={handleInpClick}
                  style={{ width: '100%', marginBottom: '8px' }}
                >
                  {inpDemo ? '⏳ Тяжёлая задача...' : 'Кликни (тяжёлая задача)'}
                </button>
                {inpTime !== null && (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '12px',
                    background: inpTime > 200 ? 'rgba(239, 68, 68, 0.08)' : 'rgba(34, 197, 94, 0.08)',
                    borderRadius: '6px'
                  }}>
                    <span style={{ 
                      fontWeight: 700, 
                      color: inpTime > 200 ? 'var(--accent-red)' : 'var(--accent-green)'
                    }}>
                      {inpTime}ms
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                      {inpTime > 500 ? '(Плохо!)' : inpTime > 200 ? '(Средне)' : '(Хорошо)'}
                    </span>
                  </div>
                )}
              </div>

              {/* CLS */}
              <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px' }}>
                <h4 style={{ color: 'var(--accent-green)', marginBottom: '8px' }}>📐 CLS Demo</h4>
                <button 
                  className="btn btn-primary" 
                  onClick={() => setClsDemo(!clsDemo)}
                  style={{ width: '100%', marginBottom: '8px' }}
                >
                  {clsDemo ? 'Убрать сдвиг' : 'Симулировать CLS'}
                </button>
                <div style={{ 
                  padding: '12px', 
                  background: 'rgba(34, 197, 94, 0.05)', 
                  borderRadius: '6px',
                  transition: 'none'
                }}>
                  {clsDemo && (
                    <div style={{ 
                      height: '60px', 
                      background: 'rgba(239, 68, 68, 0.15)', 
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '8px',
                      border: '1px dashed var(--accent-red)',
                      fontSize: '0.8rem',
                      color: 'var(--accent-red)'
                    }}>
                      ↓ Внезапный элемент сдвигает контент вниз!
                    </div>
                  )}
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Этот текст сдвинулся вниз. Это и есть CLS!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* All Metrics */}
      {activeTab === 'all' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">📊 Все метрики производительности</span>
          </div>

          <div className="info-box" style={{ marginBottom: '16px' }}>
            <strong>Field vs Lab метрики:</strong>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
              <div>
                <strong style={{ color: 'var(--accent-green)' }}>Field (RUM)</strong> — данные от реальных пользователей. 
                CrUX, web-vitals library. Показывают реальный опыт.
              </div>
              <div>
                <strong style={{ color: 'var(--accent-cyan)' }}>Lab</strong> — синтетические тесты. 
                Lighthouse, WebPageTest. Контролируемые условия.
              </div>
            </div>
          </div>

          <h4 style={{ marginBottom: '12px' }}>⭐ Core Web Vitals (Field)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {metrics.map(m => (
              <div key={m.name} style={{
                display: 'grid',
                gridTemplateColumns: '80px 200px 1fr 100px',
                gap: '16px',
                padding: '12px 16px',
                background: 'var(--bg-code)',
                borderRadius: '8px',
                alignItems: 'center',
                borderLeft: `3px solid ${m.color}`
              }}>
                <strong style={{ color: m.color }}>{m.name}</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{m.fullName}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{m.description.split('.')[0]}.</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-green)', fontWeight: 600 }}>✅ {m.good}</span>
              </div>
            ))}
          </div>

          <h4 style={{ marginBottom: '12px' }}>📏 Дополнительные метрики</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {secondaryMetrics.map(m => (
              <div key={m.name} style={{
                display: 'grid',
                gridTemplateColumns: '80px 200px 1fr 100px',
                gap: '16px',
                padding: '12px 16px',
                background: 'var(--bg-code)',
                borderRadius: '8px',
                alignItems: 'center',
                opacity: m.name === 'FID' ? 0.6 : 1
              }}>
                <strong style={{ color: m.name === 'FID' ? 'var(--text-muted)' : 'var(--accent-purple)' }}>{m.name}</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{m.fullName}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{m.desc}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-green)', fontWeight: 600 }}>✅ {m.good}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Измерение */}
      {activeTab === 'measure' && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">🔬 Как измерять Web Vitals</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                {
                  tool: 'web-vitals (npm)',
                  type: 'Field',
                  color: 'var(--accent-green)',
                  code: `import { onLCP, onINP, onCLS } from 'web-vitals'\n\nonLCP(metric => {\n  console.log('LCP:', metric.value)\n  // Отправить в аналитику\n  sendToAnalytics(metric)\n})\n\nonINP(metric => console.log('INP:', metric.value))\nonCLS(metric => console.log('CLS:', metric.value))`
                },
                {
                  tool: 'PerformanceObserver',
                  type: 'Field',
                  color: 'var(--accent-cyan)',
                  code: `// LCP\nnew PerformanceObserver((list) => {\n  const entries = list.getEntries()\n  const lcp = entries[entries.length - 1]\n  console.log('LCP:', lcp.startTime)\n}).observe({ type: 'largest-contentful-paint' })\n\n// Layout Shifts (CLS)\nnew PerformanceObserver((list) => {\n  for (const entry of list.getEntries()) {\n    if (!entry.hadRecentInput) {\n      console.log('CLS shift:', entry.value)\n    }\n  }\n}).observe({ type: 'layout-shift', buffered: true })`
                },
                {
                  tool: 'Lighthouse (Chrome DevTools)',
                  type: 'Lab',
                  color: 'var(--accent-orange)',
                  code: `// Chrome DevTools → Lighthouse tab\n// Или CLI:\nnpx lighthouse https://example.com \\\n  --output=json \\\n  --chrome-flags="--headless"\n\n// Показывает:\n// - Performance Score (0-100)\n// - LCP, TBT, CLS, SI, FCP\n// - Рекомендации по улучшению`
                },
                {
                  tool: 'Chrome DevTools Performance',
                  type: 'Lab',
                  color: 'var(--accent-purple)',
                  code: `// Performance tab → Record\n// Покажет:\n// - Main thread timeline\n// - Long tasks (> 50ms) — красные\n// - Layout shifts\n// - Largest contentful paint marker\n// - Interaction events\n\n// Или через console:\nperformance.mark('start')\n// ... код ...\nperformance.mark('end')\nperformance.measure('My Task', 'start', 'end')`
                },
              ].map(item => (
                <div key={item.tool} style={{ 
                  padding: '16px', 
                  background: 'var(--bg-code)', 
                  borderRadius: '8px',
                  borderTop: `3px solid ${item.color}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ color: item.color }}>{item.tool}</h4>
                    <span style={{ 
                      fontSize: '0.7rem', 
                      padding: '2px 6px', 
                      background: `${item.color}15`,
                      color: item.color,
                      borderRadius: '4px' 
                    }}>{item.type}</span>
                  </div>
                  <pre style={{ fontSize: '0.78rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                    {item.code}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Interview */}
      {activeTab === 'interview' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">🎯 Вопросы для собеседования</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                q: 'Какие 3 Core Web Vitals актуальны в 2024+?',
                a: 'LCP (Largest Contentful Paint) — загрузка, ≤2.5s. INP (Interaction to Next Paint) — интерактивность, ≤200ms. CLS (Cumulative Layout Shift) — стабильность, ≤0.1. FID устарел с марта 2024, заменён на INP.'
              },
              {
                q: 'Чем INP отличается от FID?',
                a: 'FID мерил задержку только ПЕРВОГО взаимодействия. INP измеряет ВСЕ взаимодействия за сессию и берёт наихудшее (p98). Это гораздо более полная метрика интерактивности.'
              },
              {
                q: 'Как CLS считается? Что такое 0.1?',
                a: 'CLS = impact fraction × distance fraction. Impact — доля viewport, затронутая сдвигом. Distance — на сколько элемент сдвинулся. Это безразмерная величина. 0.1 — значит сдвиги были минимальны. Сдвиги от user input (клик) НЕ считаются.'
              },
              {
                q: 'Как улучшить LCP?',
                a: 'Preload ключевые ресурсы, оптимизировать картинки (WebP, srcset), использовать CDN, SSR для первого рендера, убрать render-blocking ресурсы, fetchpriority="high" для LCP-элемента.'
              },
              {
                q: 'Что такое Long Task и как влияет на INP?',
                a: 'Long Task — JS-задача длиннее 50ms, блокирующая main thread. Пока она выполняется, браузер не может обработать клики. Решение: разбить на мелкие задачи через setTimeout(0), requestIdleCallback или scheduler.yield().'
              },
              {
                q: 'Разница между Field и Lab метриками?',
                a: 'Field (RUM) — данные реальных пользователей (CrUX, web-vitals). Показывают реальный опыт, но нет контроля условий. Lab — синтетические тесты (Lighthouse). Контролируемые условия, но не отражают разнообразие устройств. Google использует Field данные для ранжирования.'
              },
              {
                q: 'Влияют ли Web Vitals на SEO?',
                a: 'Да! С 2021 Google использует Core Web Vitals как фактор ранжирования (Page Experience). Но контент остаётся важнее — отличные Web Vitals не помогут при плохом контенте, а плохие Vitals могут снизить позиции при равном контенте.'
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
