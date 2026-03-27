import { useState } from 'react'

const styles = [
  {
    id: 'competing',
    name: 'Соперничество',
    icon: '🦁',
    color: '#ef4444',
    x: 90, y: 15,
    assertiveness: 95,
    cooperation: 10,
    desc: 'Отстаиваю свою позицию любой ценой. Выигрываю я — проигрывает другой.',
    when: 'Критическая ситуация, нужно быстрое решение, вы уверены в своей правоте',
    risk: 'Разрушает отношения, люди перестают предлагать идеи',
  },
  {
    id: 'collaborating',
    name: 'Сотрудничество',
    icon: '🤝',
    color: '#22c55e',
    x: 90, y: 90,
    assertiveness: 90,
    cooperation: 90,
    desc: 'Ищем решение, которое устроит обоих. Win-win.',
    when: 'Важно и решение, и отношения. Есть время на обсуждение.',
    risk: 'Требует много времени и энергии. Не всегда возможно.',
  },
  {
    id: 'compromising',
    name: 'Компромисс',
    icon: '⚖️',
    color: '#f59e0b',
    x: 50, y: 50,
    assertiveness: 50,
    cooperation: 50,
    desc: 'Каждый уступает немного. Никто не получает всего, но никто и не проигрывает.',
    when: 'Нужно быстрое решение, обе стороны равны по силе',
    risk: 'Половинчатое решение может никого не устроить',
  },
  {
    id: 'avoiding',
    name: 'Избегание',
    icon: '🐢',
    color: '#6366f1',
    x: 10, y: 10,
    assertiveness: 10,
    cooperation: 10,
    desc: 'Ухожу от конфликта. Не решаю проблему.',
    when: 'Проблема незначительна, нужно время остыть, не ваш конфликт',
    risk: 'Проблема копится и взрывается потом',
  },
  {
    id: 'accommodating',
    name: 'Уступка',
    icon: '🕊️',
    color: '#06b6d4',
    x: 10, y: 90,
    assertiveness: 10,
    cooperation: 90,
    desc: 'Уступаю другому. Отношения важнее моей позиции.',
    when: 'Вопрос для вас не принципиален, хотите сохранить отношения',
    risk: 'Вас начнут использовать, потеря уважения',
  },
]

const quizQuestions = [
  {
    text: 'Коллега предлагает архитектуру, которая вам кажется неоптимальной. Что вы делаете?',
    options: [
      { style: 'competing', text: 'Настаиваю на своём варианте, объясняя почему он лучше' },
      { style: 'collaborating', text: 'Предлагаю вместе проанализировать оба варианта с метриками' },
      { style: 'compromising', text: 'Берём часть от его решения и часть от моего' },
      { style: 'avoiding', text: 'Соглашаюсь, не хочу спорить' },
      { style: 'accommodating', text: 'Принимаю его вариант — может он прав' },
    ],
  },
  {
    text: 'Два разработчика в вашей команде не могут договориться о code style. Спор тянется неделю.',
    options: [
      { style: 'competing', text: 'Решаю сам и закрываю дискуссию' },
      { style: 'collaborating', text: 'Организую встречу, где вместе формулируем style guide' },
      { style: 'compromising', text: 'Каждый может использовать свой стиль в своих файлах' },
      { style: 'avoiding', text: 'Пусть сами разберутся' },
      { style: 'accommodating', text: 'Пусть тот, кто громче, решает' },
    ],
  },
  {
    text: 'Продакт-менеджер требует фичу к дедлайну, но вы понимаете, что без рефакторинга будет техдолг.',
    options: [
      { style: 'competing', text: 'Настаиваю на рефакторинге — качество не обсуждается' },
      { style: 'collaborating', text: 'Предлагаю план: минимальная фича сейчас + рефакторинг в следующем спринте' },
      { style: 'compromising', text: 'Делаем фичу, но упрощённую версию' },
      { style: 'avoiding', text: 'Молча делаю как просят' },
      { style: 'accommodating', text: 'ОК, делаем фичу, позже разберёмся' },
    ],
  },
  {
    text: 'На ретро один из членов команды публично критикует ваше решение.',
    options: [
      { style: 'competing', text: 'Защищаю своё решение — я лид и я так решил' },
      { style: 'collaborating', text: 'Благодарю за фидбек и предлагаю вместе найти улучшение' },
      { style: 'compromising', text: 'Признаю частичную правоту и предлагаю итерировать' },
      { style: 'avoiding', text: 'Переключаю тему' },
      { style: 'accommodating', text: 'Признаю, что был неправ' },
    ],
  },
  {
    text: 'Два тимлида хотят одного и того же сеньора в свою команду.',
    options: [
      { style: 'competing', text: 'Убеждаю руководство, что мне он нужнее' },
      { style: 'collaborating', text: 'Предлагаю shared-модель: он работает на оба проекта' },
      { style: 'compromising', text: 'Он идёт к ним, но через квартал перейдёт ко мне' },
      { style: 'avoiding', text: 'Пусть HR решает' },
      { style: 'accommodating', text: 'Ладно, пусть забирают' },
    ],
  },
]

export default function ConflictStyles() {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showQuizResult, setShowQuizResult] = useState(false)

  const handleAnswer = (qIdx: number, styleId: string) => {
    if (showQuizResult) return
    setAnswers(prev => ({ ...prev, [qIdx]: styleId }))
  }

  const getResults = () => {
    const counts: Record<string, number> = {}
    Object.values(answers).forEach(s => {
      counts[s] = (counts[s] || 0) + 1
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([id, count]) => ({ style: styles.find(s => s.id === id)!, count }))
  }

  const allAnswered = Object.keys(answers).length === quizQuestions.length

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>⚔️ Стили поведения в конфликтах</h1>
        <p>Модель Томаса-Килманна: 5 стратегий поведения в конфликте. Нет «плохих» — у каждого своё место.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Кеннет Томас и Ральф Килманн в 1974 году создали модель, описывающую 5 стратегий
          поведения в конфликте. Модель строится на двух осях: <strong>настойчивость</strong> (желание отстоять
          свою позицию) и <strong>кооперативность</strong> (готовность учитывать интересы другого). Конфликты
          в IT-командах неизбежны: выбор технологий, приоритеты, код-стайл, сроки.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Важно: нет «плохих» стилей. <strong>Соперничество</strong> спасает в кризисе, <strong>избегание</strong> —
          когда вопрос не стоит свеч, <strong>уступка</strong> — когда отношения важнее результата.
          Осознанность — первый шаг: понять <strong>свой</strong> доминирующий стиль и научиться осознанно
          выбирать подход под ситуацию.
        </p>
        <div className="info-box">
          <div className="info-box-icon">🎯</div>
          <div className="info-box-content">
            <div className="info-box-title">Thomas-Kilmann Instrument (TKI) — инструмент Томаса-Килманна</div>
            Это стандартизированный тест из 30 вопросов, используемый в Fortune 500 компаниях.
            Он показывает ваш профиль: какие стили вы используете чаще, а каких избегаете.
          </div>
        </div>
      </div>

      {/* Visual map */}
      <div className="card">
        <h3>Карта стилей</h3>
        <p style={{ marginBottom: 8 }}>Две оси: <strong>Ассертивность</strong> (отстаивание своих интересов) и <strong>Кооперативность</strong> (учёт интересов другого).</p>

        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: 500,
          aspectRatio: '1',
          margin: '20px auto',
          background: 'var(--bg-code)',
          borderRadius: 12,
          border: '1px solid var(--border-color)',
        }}>
          {/* Axes labels */}
          <div style={{ position: 'absolute', left: '50%', bottom: -24, transform: 'translateX(-50%)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Кооперативность →
          </div>
          <div style={{ position: 'absolute', left: -70, top: '50%', transform: 'rotate(-90deg) translateX(-50%)', transformOrigin: 'left center', fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            Ассертивность →
          </div>

          {/* Grid lines */}
          <div style={{ position: 'absolute', top: '50%', left: '5%', right: '5%', height: 1, background: 'var(--border-color)' }} />
          <div style={{ position: 'absolute', left: '50%', top: '5%', bottom: '5%', width: 1, background: 'var(--border-color)' }} />

          {/* Dots */}
          {styles.map(s => (
            <div
              key={s.id}
              onClick={() => setSelectedStyle(selectedStyle === s.id ? null : s.id)}
              style={{
                position: 'absolute',
                left: `${5 + s.y * 0.9}%`,
                bottom: `${5 + s.x * 0.9}%`,
                transform: 'translate(-50%, 50%)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s',
                zIndex: selectedStyle === s.id ? 5 : 2,
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: `${s.color}30`,
                border: `2px solid ${s.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                boxShadow: selectedStyle === s.id ? `0 0 16px ${s.color}60` : 'none',
                transform: selectedStyle === s.id ? 'scale(1.2)' : 'scale(1)',
                transition: 'all 0.2s',
              }}>
                {s.icon}
              </div>
              <div style={{ fontSize: '0.65rem', marginTop: 2, color: s.color, fontWeight: 600 }}>
                {s.name}
              </div>
            </div>
          ))}
        </div>

        {selectedStyle && (() => {
          const s = styles.find(st => st.id === selectedStyle)!
          return (
            <div className="info-box" style={{ marginTop: 32, borderColor: s.color }}>
              <div className="info-box-icon">{s.icon}</div>
              <div className="info-box-content">
                <div className="info-box-title" style={{ color: s.color }}>{s.name}</div>
                <p style={{ marginBottom: 8 }}>{s.desc}</p>
                <p><strong>Когда использовать:</strong> {s.when}</p>
                <p style={{ color: 'var(--accent-orange)', marginTop: 4 }}>⚠️ {s.risk}</p>
              </div>
            </div>
          )
        })()}
      </div>

      {/* Quiz */}
      <div className="card">
        <h3>🎮 Квиз: определи свой стиль</h3>
        <p style={{ marginBottom: 16 }}>Выберите ответ в каждой ситуации, и мы покажем ваш доминирующий стиль.</p>

        {quizQuestions.map((q, qIdx) => (
          <div key={qIdx} className="scenario-card">
            <h4>Ситуация {qIdx + 1}</h4>
            <p>{q.text}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
              {q.options.map(opt => (
                <button
                  key={opt.style}
                  className={`scenario-option ${answers[qIdx] === opt.style ? 'selected' : ''}`}
                  onClick={() => handleAnswer(qIdx, opt.style)}
                  style={{ textAlign: 'left', width: '100%' }}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="controls">
          <button
            className="btn btn-primary"
            onClick={() => setShowQuizResult(true)}
            disabled={!allAnswered || showQuizResult}
          >
            Показать результат
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => { setAnswers({}); setShowQuizResult(false) }}
          >
            Сбросить
          </button>
        </div>

        {showQuizResult && (
          <div style={{ marginTop: 16 }}>
            <h4 style={{ marginBottom: 12 }}>📊 Ваш профиль</h4>
            {getResults().map(({ style: s, count }) => (
              <div key={s.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>{s.icon} {s.name}</span>
                  <span style={{ fontWeight: 700, color: s.color }}>{count} из {quizQuestions.length}</span>
                </div>
                <div className="meter">
                  <div
                    className="meter-fill"
                    style={{ width: `${(count / quizQuestions.length) * 100}%`, background: s.color }}
                  />
                </div>
              </div>
            ))}

            <div className="info-box" style={{ marginTop: 16 }}>
              <div className="info-box-icon">💡</div>
              <div className="info-box-content">
                <div className="info-box-title">Ваш доминирующий стиль: {getResults()[0]?.style.icon} {getResults()[0]?.style.name}</div>
                <p>{getResults()[0]?.style.desc}</p>
                <p style={{ marginTop: 8, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Помните: лучший конфликтолог владеет всеми стилями и выбирает подходящий по ситуации.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Материалы */}
      <div className="card">
        <h3>📚 Материалы для изучения</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="https://ru.wikipedia.org/wiki/Модель_Томаса_—_Килманна" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-main)', fontSize: '0.9rem' }}>
            📖 Модель Томаса-Килманна — Википедия
          </a>
        </div>
      </div>
    </div>
  )
}
