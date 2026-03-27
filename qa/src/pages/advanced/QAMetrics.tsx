import { useState } from 'react'

interface MetricDef {
  key: string
  name: string
  fullName: string
  icon: string
  formula: string
  goodRange: string
  description: string
}

const metrics: MetricDef[] = [
  { key: 'drr', name: 'DRR', fullName: 'Defect Removal Rate', icon: '🎯',
    formula: 'DRR = Баги найденные QA / Все баги × 100%',
    goodRange: '> 85% — хорошо, > 95% — отлично',
    description: 'Какой процент багов QA находит до продакшна. Основная метрика эффективности.' },
  { key: 'drl', name: 'DRL', fullName: 'Defect Leakage Rate', icon: '💧',
    formula: 'DRL = Баги в проде / Все баги × 100%',
    goodRange: '< 15% — OK, < 5% — отлично',
    description: 'Сколько багов утекло в прод. DRL = 100% - DRR.' },
  { key: 'coverage', name: 'Coverage', fullName: 'Test Coverage', icon: '📊',
    formula: 'Coverage = Покрытые требования / Все требования × 100%',
    goodRange: '> 80% — хорошо. 100% — идеал, но часто нереалистична',
    description: 'Какая доля требований покрыта тестами.' },
  { key: 'passRate', name: 'Pass Rate', fullName: 'Test Pass Rate', icon: '✅',
    formula: 'Pass Rate = Пройденные тесты / Все запущенные × 100%',
    goodRange: '> 95% для релиза',
    description: 'Какой процент тестов проходит успешно.' },
  { key: 'bugDensity', name: 'Bug Density', fullName: 'Defect Density', icon: '🐛',
    formula: 'Bug Density = Количество багов / KLOC (или Story Points)',
    goodRange: '< 5 багов/KLOC — хорошо',
    description: 'Сколько багов на единицу кода. Показывает качество разработки.' },
  { key: 'mttr', name: 'MTTR', fullName: 'Mean Time to Resolve', icon: '⏱️',
    formula: 'MTTR = Сумма времени исправления / Количество багов',
    goodRange: 'P1: < 4ч, P2: < 1 день, P3: < 1 спринт',
    description: 'Среднее время от обнаружения бага до его закрытия.' },
]

export default function QAMetrics() {
  const [selectedMetric, setSelectedMetric] = useState(0)

  // Calculator state
  const [qaFoundBugs, setQaFoundBugs] = useState(85)
  const [prodBugs, setProdBugs] = useState(15)
  const [totalTests, setTotalTests] = useState(200)
  const [passedTests, setPassedTests] = useState(190)

  const totalBugs = qaFoundBugs + prodBugs
  const drr = totalBugs > 0 ? (qaFoundBugs / totalBugs) * 100 : 0
  const drl = totalBugs > 0 ? (prodBugs / totalBugs) * 100 : 0
  const passRate = totalTests > 0 ? (passedTests / totalTests) * 100 : 0

  const getDRRColor = (v: number) => v >= 95 ? '#22c55e' : v >= 85 ? '#eab308' : '#ef4444'
  const getPassRateColor = (v: number) => v >= 95 ? '#22c55e' : v >= 85 ? '#eab308' : '#ef4444'

  const m = metrics[selectedMetric]!

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📊 QA-метрики</h1>
        <p>Как измерять эффективность тестирования и качество продукта.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>QA-метрики</strong> — количественные показатели, которые помогают оценить качество продукта и эффективность 
          процесса тестирования. Без метрик QA-менеджер не может ответить на вопрос «Готов ли продукт к релизу?» — 
          только субъективно. С метриками — это data-driven решение на основе Defect Density, Test Coverage, 
          Escape Rate и других показателей.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Важно: метрики — инструмент улучшения, а не наказания. Если отслеживать «количество багов, найденных тестировщиком» — 
          есть соблазн искусственно дробить баги. Лучше смотреть на <strong>Defect Escape Rate</strong> (% багов, дошедших до прода) 
          и <strong>MTTR</strong> (среднее время исправления). Эти метрики стимулируют качество, а не количество.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>📊 Ключевой показатель</strong>: Defect Escape Rate &lt; 5% считается отличным результатом. 
            Это значит, что менее 5% багов просачиваются в продакшн. Если показатель выше 15% — 
            пора пересмотреть тестовую стратегию и покрытие.
          </div>
        </div>
      </div>

      {/* Metric selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {metrics.map((met, i) => (
          <button key={met.key} className={`btn ${selectedMetric === i ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedMetric(i)} style={{ fontSize: '0.8rem' }}>
            {met.icon} {met.name}
          </button>
        ))}
      </div>

      <div className="card">
        <h3>{m.icon} {m.name} — {m.fullName}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>{m.description}</p>

        <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-code)', fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: 12 }}>
          {m.formula}
        </div>

        <div className="info-box">
          <div className="info-box-content">
            <div className="info-box-title">📏 Бенчмарк</div>
            <div style={{ fontSize: '0.85rem' }}>{m.goodRange}</div>
          </div>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="card">
        <h3>🧮 Калькулятор метрик</h3>

        <div className="grid-2" style={{ marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>
              🐛 Баги найденные QA
            </label>
            <input className="input" type="number" value={qaFoundBugs} min={0}
              onChange={e => setQaFoundBugs(+e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>
              💧 Баги в продакшне
            </label>
            <input className="input" type="number" value={prodBugs} min={0}
              onChange={e => setProdBugs(+e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>
              📝 Всего тестов
            </label>
            <input className="input" type="number" value={totalTests} min={0}
              onChange={e => setTotalTests(+e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>
              ✅ Пройдено тестов
            </label>
            <input className="input" type="number" value={passedTests} min={0}
              onChange={e => setPassedTests(+e.target.value)} />
          </div>
        </div>

        {/* Results */}
        <div className="grid-3">
          <div style={{ padding: 16, borderRadius: 10, background: 'var(--bg-code)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DRR</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: getDRRColor(drr) }}>{drr.toFixed(1)}%</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {drr >= 95 ? 'Отлично' : drr >= 85 ? 'Хорошо' : 'Нужно улучшить'}
            </div>
          </div>
          <div style={{ padding: 16, borderRadius: 10, background: 'var(--bg-code)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DRL</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: drl <= 5 ? '#22c55e' : drl <= 15 ? '#eab308' : '#ef4444' }}>
              {drl.toFixed(1)}%
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Утечка в прод</div>
          </div>
          <div style={{ padding: 16, borderRadius: 10, background: 'var(--bg-code)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pass Rate</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: getPassRateColor(passRate) }}>
              {passRate.toFixed(1)}%
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {totalTests - passedTests} failed
            </div>
          </div>
        </div>

        {/* Visual bar */}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: 6 }}>Баги: QA vs Прод</div>
          <div style={{ display: 'flex', height: 24, borderRadius: 6, overflow: 'hidden' }}>
            <div style={{
              width: `${drr}%`, background: '#22c55e', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '0.7rem', color: '#fff', fontWeight: 600,
            }}>QA: {qaFoundBugs}</div>
            <div style={{
              width: `${drl}%`, background: '#ef4444', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '0.7rem', color: '#fff', fontWeight: 600,
            }}>{prodBugs > 0 ? `Prod: ${prodBugs}` : ''}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
