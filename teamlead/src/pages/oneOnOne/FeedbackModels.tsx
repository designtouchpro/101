import { useState } from 'react'

type QuadrantId = 'ruinous' | 'manipulative' | 'obnoxious' | 'radical'

const radicalCandorQuadrants: Record<QuadrantId, {
  name: string; color: string; icon: string; desc: string; example: string
}> = {
  ruinous: {
    name: 'Губительная эмпатия',
    color: '#f59e0b',
    icon: '😰',
    desc: 'Заботишься о чувствах, но молчишь о проблемах. Человек не растёт, потому что не знает свои слабости.',
    example: '«Всё нормально, продолжай» (хотя код ужасный и человек не развивается).',
  },
  manipulative: {
    name: 'Манипулятивная неискренность',
    color: '#ef4444',
    icon: '😶',
    desc: 'Ни заботы, ни честности. Говоришь то, что удобно, или молчишь.',
    example: '(За спиной) «Он пишет плохой код.» (В лицо) «Хорошая работа!»',
  },
  obnoxious: {
    name: 'Неприятная агрессия',
    color: '#a855f7',
    icon: '😤',
    desc: 'Честно, но грубо. Правда без эмпатии ранит и демотивирует.',
    example: '«Этот код — мусор. Переписывай.» (без объяснения что не так и как улучшить)',
  },
  radical: {
    name: 'Радикальная откровенность',
    color: '#22c55e',
    icon: '💚',
    desc: 'Заботишься И говоришь правду. Фидбек конкретный, помогает расти.',
    example: '«Я заметил, что в последних PR есть проблемы с error handling. Давай обсудим паттерн, и я покажу примеры.»',
  },
}

const feedbackModels = [
  {
    name: 'SBI',
    fullName: 'Situation → Behavior → Impact',
    icon: '🎯',
    steps: [
      { label: 'Situation', desc: 'Когда и где', example: 'На вчерашнем ревью PR #142...' },
      { label: 'Behavior', desc: 'Что конкретно сделал', example: '...ты отклонил PR без объяснения причин...' },
      { label: 'Impact', desc: 'Как это повлияло', example: '...и Маша потратила 2 часа гадая, что исправить.' },
    ],
  },
  {
    name: 'STAR',
    fullName: 'Situation → Task → Action → Result',
    icon: '⭐',
    steps: [
      { label: 'Situation', desc: 'Контекст', example: 'У нас был деплой в пятницу вечером.' },
      { label: 'Task', desc: 'Задача', example: 'Нужно было починить критичный баг.' },
      { label: 'Action', desc: 'Что сделал', example: 'Ты остался, нашёл причину и накатил хотфикс.' },
      { label: 'Result', desc: 'Результат', example: 'Сервис заработал через 30 минут. Отлично!' },
    ],
  },
  {
    name: 'BOFF',
    fullName: 'Behaviour → Outcome → Feelings → Future',
    icon: '🔄',
    steps: [
      { label: 'Behaviour', desc: 'Поведение', example: 'Ты опоздал на 3 дейли подряд.' },
      { label: 'Outcome', desc: 'Последствие', example: 'Команда не знает статус твоих задач.' },
      { label: 'Feelings', desc: 'Чувства', example: 'Я беспокоюсь, что мы теряем синхронизацию.' },
      { label: 'Future', desc: 'Будущее', example: 'Давай договоримся — если не можешь быть, напиши в чат.' },
    ],
  },
]

const practiceScenarios = [
  {
    situation: 'Разработчик пишет код без тестов, хотя в команде есть договорённость покрывать тестами.',
    hints: { S: 'Последние 3 PR были без тестов', B: 'Не пишет тесты несмотря на договорённость', I: 'Другие тоже начали пропускать тесты, качество падает' },
  },
  {
    situation: 'Сотрудник начал отлично менторить джуна — джун заметно вырос.',
    hints: { S: 'За последний месяц менторства', B: 'Уделял время ревью и парному программированию', I: 'Джун закрыл 3 задачи самостоятельно' },
  },
  {
    situation: 'На ретро разработчик перебивает коллег и не даёт другим высказаться.',
    hints: { S: 'На последних двух ретро', B: 'Перебивал коллег, не давал закончить мысль', I: 'Тихие члены команды перестали высказываться' },
  },
]

export default function FeedbackModels() {
  const [activeQuadrant, setActiveQuadrant] = useState<QuadrantId | null>(null)
  const [activeModel, setActiveModel] = useState(0)
  const [practiceInputs, setPracticeInputs] = useState<Record<string, string>>({})
  const [showHints, setShowHints] = useState<Record<number, boolean>>({})

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>💬 Модели обратной связи</h1>
        <p>Как давать фидбек, чтобы он был полезным: Radical Candor, SBI, STAR и другие модели.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Обратная связь — <strong>главный инструмент развития команды</strong>. Исследования Gallup показывают:
          сотрудники, регулярно получающие качественный фидбек, на 3.6x более вовлечены. Ким Скотт в книге
          «Radical Candor» предложила модель из двух осей: <strong>Care Personally</strong> (искренняя забота о человеке) и
          <strong>Challenge Directly</strong> (честность в оценке работы). Только их комбинация даёт продуктивный фидбек.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Без структуры фидбек превращается в размытое «нормально» или обидное «всё плохо». Модели SBI, STAR и BOFF
          дают <strong>каркас</strong>, чтобы говорить конкретно, по фактам и с фокусом на будущее. Цель фидбека —
          не оценить прошлое, а <strong>изменить поведение в будущем</strong>.
        </p>
        <div className="info-box">
          <div className="info-box-icon">⏱️</div>
          <div className="info-box-content">
            <div className="info-box-title">Правило 24 часов</div>
            Давайте фидбек в течение 24 часов после события. Чем больше времени прошло — тем слабее связь
            между поведением и обратной связью, и тем менее полезным становится разговор.
          </div>
        </div>
      </div>

      {/* Radical Candor Matrix */}
      <div className="card">
        <h3>Radical Candor — матрица Ким Скотт</h3>
        <p style={{ marginBottom: 8 }}>Два измерения: <strong>Забота лично</strong> (Care Personally) и <strong>Прямота</strong> (Challenge Directly).</p>

        <div className="matrix">
          {/* Y axis label */}
          <div style={{ position: 'absolute', left: -60, top: '50%', transform: 'rotate(-90deg) translateX(-50%)', transformOrigin: 'left center', fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            Забота о человеке →
          </div>
          {/* X axis label */}
          <div style={{ position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Прямота →
          </div>

          <div
            className="matrix-quadrant top-left"
            style={{ background: `${radicalCandorQuadrants.ruinous.color}20` }}
            onClick={() => setActiveQuadrant(activeQuadrant === 'ruinous' ? null : 'ruinous')}
          >
            <span style={{ fontSize: '1.5rem' }}>{radicalCandorQuadrants.ruinous.icon}</span>
            <h4>{radicalCandorQuadrants.ruinous.name}</h4>
            <p>Высокая забота, низкая прямота</p>
          </div>

          <div
            className="matrix-quadrant top-right"
            style={{ background: `${radicalCandorQuadrants.radical.color}20` }}
            onClick={() => setActiveQuadrant(activeQuadrant === 'radical' ? null : 'radical')}
          >
            <span style={{ fontSize: '1.5rem' }}>{radicalCandorQuadrants.radical.icon}</span>
            <h4>{radicalCandorQuadrants.radical.name}</h4>
            <p>Высокая забота, высокая прямота</p>
          </div>

          <div
            className="matrix-quadrant bottom-left"
            style={{ background: `${radicalCandorQuadrants.manipulative.color}20` }}
            onClick={() => setActiveQuadrant(activeQuadrant === 'manipulative' ? null : 'manipulative')}
          >
            <span style={{ fontSize: '1.5rem' }}>{radicalCandorQuadrants.manipulative.icon}</span>
            <h4>{radicalCandorQuadrants.manipulative.name}</h4>
            <p>Низкая забота, низкая прямота</p>
          </div>

          <div
            className="matrix-quadrant bottom-right"
            style={{ background: `${radicalCandorQuadrants.obnoxious.color}20` }}
            onClick={() => setActiveQuadrant(activeQuadrant === 'obnoxious' ? null : 'obnoxious')}
          >
            <span style={{ fontSize: '1.5rem' }}>{radicalCandorQuadrants.obnoxious.icon}</span>
            <h4>{radicalCandorQuadrants.obnoxious.name}</h4>
            <p>Низкая забота, высокая прямота</p>
          </div>
        </div>

        {activeQuadrant && (
          <div className="info-box" style={{ marginTop: 32, borderColor: radicalCandorQuadrants[activeQuadrant].color }}>
            <div className="info-box-icon">{radicalCandorQuadrants[activeQuadrant].icon}</div>
            <div className="info-box-content">
              <div className="info-box-title" style={{ color: radicalCandorQuadrants[activeQuadrant].color }}>
                {radicalCandorQuadrants[activeQuadrant].name}
              </div>
              <p style={{ marginBottom: 8 }}>{radicalCandorQuadrants[activeQuadrant].desc}</p>
              <p><strong>Пример:</strong> {radicalCandorQuadrants[activeQuadrant].example}</p>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Models */}
      <div className="card">
        <h3>📐 Модели структурированного фидбека</h3>
        <div className="tabs">
          {feedbackModels.map((m, i) => (
            <button key={m.name} className={`tab ${activeModel === i ? 'active' : ''}`} onClick={() => setActiveModel(i)}>
              {m.icon} {m.name}
            </button>
          ))}
        </div>

        <div className="info-box">
          <div className="info-box-icon">{feedbackModels[activeModel].icon}</div>
          <div className="info-box-content">
            <div className="info-box-title">{feedbackModels[activeModel].name} — {feedbackModels[activeModel].fullName}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, margin: '16px 0', flexWrap: 'wrap' }}>
          {feedbackModels[activeModel].steps.map((step, i) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                padding: '12px 20px',
                borderRadius: 8,
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid var(--accent-main)',
                textAlign: 'center',
              }}>
                <div style={{ fontWeight: 700, color: 'var(--accent-main)' }}>{step.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{step.desc}</div>
              </div>
              {i < feedbackModels[activeModel].steps.length - 1 && (
                <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>→</span>
              )}
            </div>
          ))}
        </div>

        <div className="info-box success" style={{ marginTop: 16 }}>
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <div className="info-box-title">Пример</div>
            {feedbackModels[activeModel].steps.map(s => s.example).join(' ')}
          </div>
        </div>
      </div>

      {/* Practice */}
      <div className="card">
        <h3>🎮 Практика: составь фидбек</h3>
        <p style={{ marginBottom: 16 }}>Используя модель <strong>{feedbackModels[activeModel].name}</strong>, напиши фидбек для каждой ситуации.</p>

        {practiceScenarios.map((scenario, idx) => (
          <div key={idx} className="scenario-card">
            <h4>Ситуация {idx + 1}</h4>
            <p>{scenario.situation}</p>

            {feedbackModels[activeModel].steps.map(step => (
              <div key={step.label} style={{ marginBottom: 8 }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--accent-main)', fontWeight: 600 }}>
                  {step.label}:
                </label>
                <input
                  className="input"
                  placeholder={`${step.desc}...`}
                  value={practiceInputs[`${idx}-${step.label}`] || ''}
                  onChange={e => setPracticeInputs(prev => ({ ...prev, [`${idx}-${step.label}`]: e.target.value }))}
                  style={{ marginTop: 4 }}
                />
              </div>
            ))}

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowHints(prev => ({ ...prev, [idx]: !prev[idx] }))}
              style={{ marginTop: 8 }}
            >
              {showHints[idx] ? 'Скрыть подсказку' : '💡 Показать подсказку'}
            </button>

            {showHints[idx] && (
              <div className="info-box" style={{ marginTop: 8 }}>
                <div className="info-box-content">
                  {Object.entries(scenario.hints).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: 4 }}>
                      <span className="tag blue" style={{ marginRight: 8 }}>{key}</span>
                      {val}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="card">
        <h3>✨ Золотые правила фидбека</h3>
        <div className="grid-2">
          <div className="info-box success">
            <div className="info-box-content">
              <div className="info-box-title">✅ Делайте</div>
              <ul className="info-list">
                <li>Давайте фидбек как можно скорее</li>
                <li>Будьте конкретными — факты, не оценки</li>
                <li>Хвалите публично, критикуйте приватно</li>
                <li>Предлагайте решение, а не только проблему</li>
              </ul>
            </div>
          </div>
          <div className="info-box error">
            <div className="info-box-content">
              <div className="info-box-title">❌ Не делайте</div>
              <ul className="info-list">
                <li>«Ты всегда...» / «Ты никогда...»</li>
                <li>Фидбек через месяц после события</li>
                <li>Сравнение с другими людьми</li>
                <li>Оценка личности вместо поведения</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
