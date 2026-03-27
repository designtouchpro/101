import { useState } from 'react'

const pipelineStages = [
  { stage: 'Commit', icon: '📝', desc: 'Разработчик пушит код', tests: ['Pre-commit hooks (lint, format)'], time: '< 1 мин' },
  { stage: 'Build', icon: '🔨', desc: 'Сборка проекта', tests: ['TypeScript check', 'Compile'], time: '1-3 мин' },
  { stage: 'Unit Tests', icon: '🧩', desc: 'Быстрые тесты', tests: ['Jest/Vitest unit tests', 'Coverage report'], time: '1-5 мин' },
  { stage: 'Integration', icon: '🔗', desc: 'API и DB тесты', tests: ['API tests', 'DB migrations', 'Contract tests'], time: '5-15 мин' },
  { stage: 'E2E Tests', icon: '🏁', desc: 'UI тесты', tests: ['Playwright smoke', 'Critical path'], time: '10-30 мин' },
  { stage: 'Staging', icon: '🎭', desc: 'Деплой на staging', tests: ['Smoke tests', 'Manual QA'], time: '5-60 мин' },
  { stage: 'Production', icon: '🚀', desc: 'Деплой в прод', tests: ['Health checks', 'Monitoring', 'Canary'], time: '5-15 мин' },
]

type PipelineStatus = 'pending' | 'running' | 'pass' | 'fail'

const qualityGates = [
  { gate: 'Coverage > 80%', category: 'Code Quality', required: true },
  { gate: '0 Critical/Blocker bugs', category: 'Bug Status', required: true },
  { gate: 'All unit tests pass', category: 'Tests', required: true },
  { gate: 'All integration tests pass', category: 'Tests', required: true },
  { gate: 'E2E smoke suite pass', category: 'Tests', required: true },
  { gate: 'No new security vulnerabilities', category: 'Security', required: true },
  { gate: 'Performance budget met', category: 'Performance', required: false },
  { gate: 'Lighthouse score > 90', category: 'Performance', required: false },
  { gate: 'PO sign-off', category: 'Business', required: true },
  { gate: 'Documentation updated', category: 'Process', required: false },
]

const testingStrategies = [
  { name: 'Shift-Left', icon: '⬅️', desc: 'Тестируем как можно раньше: на этапе требований, дизайна, кода.',
    practices: ['Code review', 'TDD', 'Static analysis', 'Unit tests in CI', 'Contract-first API'] },
  { name: 'Shift-Right', icon: '➡️', desc: 'Тестируем в проде: мониторинг, A/B тесты, feature flags.',
    practices: ['Canary deploys', 'Feature flags', 'Monitoring & alerting', 'Chaos engineering', 'A/B testing'] },
  { name: 'Continuous Testing', icon: '🔄', desc: 'Тесты на каждом этапе пайплайна, автоматически.',
    practices: ['Pre-commit hooks', 'CI/CD integration', 'Automated regression', 'Parallel execution', 'Test environments on demand'] },
]

export default function CICDTesting() {
  const [stages, setStages] = useState<PipelineStatus[]>(pipelineStages.map(() => 'pending'))
  const [isRunning, setIsRunning] = useState(false)
  const [tab, setTab] = useState<'pipeline' | 'gates' | 'strategies'>('pipeline')

  const runPipeline = async () => {
    setIsRunning(true)
    setStages(pipelineStages.map(() => 'pending'))

    for (let i = 0; i < pipelineStages.length; i++) {
      setStages(prev => prev.map((s, idx) => idx === i ? 'running' : s))
      await new Promise(r => setTimeout(r, 800 + Math.random() * 400))

      // Random fail on stage 4 or 5 sometimes
      const shouldFail = (i === 4 || i === 5) && Math.random() < 0.2
      setStages(prev => prev.map((s, idx) => idx === i ? (shouldFail ? 'fail' : 'pass') : s))

      if (shouldFail) {
        setIsRunning(false)
        return
      }
    }
    setIsRunning(false)
  }

  const statusIcon = (s: PipelineStatus) => {
    switch (s) {
      case 'pending': return '⬜'
      case 'running': return '🔄'
      case 'pass': return '✅'
      case 'fail': return '❌'
    }
  }
  const statusColor = (s: PipelineStatus) => {
    switch (s) {
      case 'pending': return 'var(--text-muted)'
      case 'running': return '#3b82f6'
      case 'pass': return '#22c55e'
      case 'fail': return '#ef4444'
    }
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔄 CI/CD и тесты</h1>
        <p>Как интегрировать тестирование в пайплайн, quality gates и стратегии.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>CI/CD</strong> (Continuous Integration / Continuous Delivery) — практика автоматизации сборки, тестирования 
          и доставки кода. В контексте QA, CI/CD — это когда тесты запускаются автоматически при каждом пуше или pull request. 
          Без CI/CD тестирование — ручной этап перед релизом. С CI/CD — непрерывный процесс, встроенный в разработку.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Quality Gates</strong> — контрольные точки в пайплайне, которые блокируют продвижение кода, 
          если метрики не выполнены: покрытие тестами ниже порога, найдены критические баги, линтер выдал ошибки. 
          Shift-left testing — принцип «сдвига влево»: чем раньше найден баг, тем дешевле его починить. 
          Юнит-тесты ловят баг за секунды, E2E — за минуты, а ручное тестирование на проде — за дни (и нервы).
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>💡 Золотое правило</strong>: Пайплайн должен быть быстрым. Если CI занимает 40 минут — 
            разработчики перестанут ждать и будут мержить без проверки. Целевое время: unit-тесты &lt; 5 мин, 
            весь пайплайн &lt; 15 мин. Медленные E2E-тесты выносите в отдельный nightly-прогон.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {([['pipeline', '🔧 Пайплайн'], ['gates', '🚦 Quality Gates'], ['strategies', '📐 Стратегии']] as const).map(([k, l]) => (
          <button key={k} className={`btn ${tab === k ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === 'pipeline' && (
        <>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ marginBottom: 0 }}>🔧 CI/CD Pipeline</h3>
              <button className="btn btn-primary" onClick={runPipeline} disabled={isRunning}>
                {isRunning ? '⏳ Выполняется...' : '▶️ Запустить'}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {pipelineStages.map((s, i) => (
                <div key={s.stage} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 16px', borderRadius: 0,
                  background: stages[i] === 'running' ? 'rgba(59, 130, 246, 0.08)' :
                    stages[i] === 'fail' ? 'rgba(239, 68, 68, 0.05)' :
                    stages[i] === 'pass' ? 'rgba(34, 197, 94, 0.05)' :
                    i % 2 === 0 ? 'var(--bg-code)' : 'transparent',
                  borderLeft: `3px solid ${statusColor(stages[i]!)}`,
                  transition: 'all 0.3s',
                }}>
                  <span style={{ fontSize: '1.3rem', minWidth: 28 }}>{statusIcon(stages[i]!)}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.icon} {s.stage}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.desc}</div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                      {s.tests.map(t => (
                        <span key={t} className="badge" style={{ fontSize: '0.65rem' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>⏱️ {s.time}</span>
                </div>
              ))}
            </div>

            {stages.every(s => s === 'pass') && (
              <div className="info-box" style={{ marginTop: 12 }}>
                <div className="info-box-content">
                  <div className="info-box-title">🎉 Деплой успешен!</div>
                  <div style={{ fontSize: '0.8rem' }}>Все этапы пройдены. Код в продакшне.</div>
                </div>
              </div>
            )}

            {stages.some(s => s === 'fail') && (
              <div style={{
                marginTop: 12, padding: '12px 16px', borderRadius: 8,
                background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)',
              }}>
                <div style={{ fontWeight: 700, color: '#ef4444' }}>❌ Pipeline failed</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Деплой остановлен. Нужно исправить ошибку и запустить снова.
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {tab === 'gates' && (
        <div className="card">
          <h3>🚦 Quality Gates</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
            Критерии, которые должны быть выполнены для прохождения этапа.
          </p>

          <table className="data-table">
            <thead><tr><th>Gate</th><th>Категория</th><th>Обязательно?</th></tr></thead>
            <tbody>
              {qualityGates.map(g => (
                <tr key={g.gate}>
                  <td><strong>{g.gate}</strong></td>
                  <td><span className="badge">{g.category}</span></td>
                  <td>{g.required ? <span style={{ color: '#ef4444' }}>🔴 Required</span> : <span style={{ color: '#eab308' }}>🟡 Optional</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'strategies' && (
        <div className="card">
          <h3>📐 Стратегии тестирования в CI/CD</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {testingStrategies.map(s => (
              <div key={s.name} style={{
                padding: '16px', borderRadius: 8, background: 'var(--bg-code)',
                borderLeft: '3px solid var(--accent-main)',
              }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>
                  {s.icon} {s.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8 }}>{s.desc}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {s.practices.map(p => (
                    <span key={p} className="badge" style={{ fontSize: '0.7rem' }}>{p}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
