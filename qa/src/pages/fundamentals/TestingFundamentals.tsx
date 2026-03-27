import { useState } from 'react'

const testingTypes = [
  {
    category: 'Функциональное',
    types: [
      { name: 'Smoke', icon: '💨', desc: 'Быстрая проверка основных функций после деплоя, время: 15-30 мин', when: 'После каждого билда' },
      { name: 'Regression', icon: '🔄', desc: 'Проверка, что старый функционал не сломался после изменений', when: 'Перед релизом' },
      { name: 'Sanity', icon: '🧠', desc: 'Узко-направленная проверка конкретного фикса или фичи', when: 'После фикса бага' },
      { name: 'Integration', icon: '🔗', desc: 'Проверка взаимодействия между модулями/сервисами', when: 'При интеграции компонентов' },
      { name: 'E2E', icon: '🏁', desc: 'Полный пользовательский сценарий от начала до конца', when: 'Перед релизом' },
    ],
  },
  {
    category: 'Нефункциональное',
    types: [
      { name: 'Performance', icon: '⚡', desc: 'Скорость, нагрузка, время отклика. Инструменты: k6, JMeter', when: 'Перед продом' },
      { name: 'Security', icon: '🔒', desc: 'XSS, SQL injection, CSRF, авторизация', when: 'Регулярно + перед релизом' },
      { name: 'Usability', icon: '👤', desc: 'Удобство использования, UX, accessibility', when: 'На этапе дизайна и после' },
      { name: 'Compatibility', icon: '🖥️', desc: 'Кросс-браузер, кросс-платформа, mobile', when: 'Перед релизом' },
    ],
  },
]

const levels = [
  { level: 'Unit', icon: '🧩', desc: 'Отдельные функции/методы', who: 'Разработчик', speed: 5, coverage: 2, cost: 1 },
  { level: 'Integration', icon: '🔗', desc: 'Взаимодействие модулей', who: 'Dev + QA', speed: 3, coverage: 3, cost: 3 },
  { level: 'System', icon: '📦', desc: 'Вся система целиком', who: 'QA', speed: 2, coverage: 4, cost: 4 },
  { level: 'Acceptance', icon: '✅', desc: 'Соответствие требованиям', who: 'QA + PO', speed: 1, coverage: 5, cost: 5 },
]

const principles = [
  { num: 1, name: 'Тестирование показывает наличие дефектов', desc: 'Тестирование может показать, что дефекты есть, но не может доказать их отсутствие.' },
  { num: 2, name: 'Исчерпывающее тестирование невозможно', desc: 'Протестировать всё невозможно. Нужна приоритизация на основе рисков.' },
  { num: 3, name: 'Раннее тестирование', desc: 'Чем раньше найден баг, тем дешевле его исправить. Shift-left подход.' },
  { num: 4, name: 'Скопление дефектов', desc: 'Ошибки распределены неравномерно — 80% багов в 20% модулей (Парето).' },
  { num: 5, name: 'Парадокс пестицида', desc: 'Одни и те же тесты со временем перестают находить новые баги. Нужно обновлять.' },
  { num: 6, name: 'Зависимость от контекста', desc: 'Тестирование банковского ПО ≠ тестирование игры. Подход зависит от проекта.' },
  { num: 7, name: 'Заблуждение об отсутствии ошибок', desc: 'Нет багов ≠ система работает правильно. Система может не соответствовать требованиям.' },
]

export default function TestingFundamentals() {
  const [tab, setTab] = useState<'types' | 'levels' | 'principles'>('types')
  const [expandedType, setExpandedType] = useState<string | null>(null)

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📖 Теория тестирования</h1>
        <p>Виды, уровни и 7 принципов тестирования по ISTQB.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Тестирование ПО</strong> — процесс проверки того, что программа работает как задумано и не содержит 
          критических дефектов. ISTQB (International Software Testing Qualifications Board) — международный стандарт, 
          который формализует терминологию и принципы тестирования. Знание ISTQB — базовый фундамент для любого QA-специалиста.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Тестирование классифицируется по нескольким осям: <strong>по уровням</strong> (unit, integration, system, acceptance), <strong>по типам</strong> (функциональное, нефункциональное, регрессионное), <strong>по подходу</strong> 
          (white-box, black-box, grey-box). 7 принципов ISTQB — это аксиомы: тестирование показывает наличие дефектов, 
          но не их отсутствие; исчерпывающее тестирование невозможно; раннее тестирование экономит деньги.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>📌 Принцип «пестицида»</strong>: Если запускать одни и те же тесты — они перестают находить новые баги, 
            как пестицид, к которому привыкли насекомые. Регулярно обновляйте тест-кейсы, 
            добавляйте новые сценарии и проводите exploratory testing.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {([['types', '🏷️ Виды'], ['levels', '📊 Уровни'], ['principles', '📜 Принципы']] as const).map(([k, l]) => (
          <button key={k} className={`btn ${tab === k ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === 'types' && (
        <>
          {testingTypes.map(cat => (
            <div className="card" key={cat.category}>
              <h3>{cat.category} тестирование</h3>
              {cat.types.map(t => (
                <div key={t.name} onClick={() => setExpandedType(expandedType === t.name ? null : t.name)}
                  style={{
                    padding: '12px 16px', borderRadius: 8, marginBottom: 8, cursor: 'pointer',
                    background: expandedType === t.name ? 'var(--accent-main-alpha)' : 'var(--bg-code)',
                    border: `1px solid ${expandedType === t.name ? 'var(--accent-main)' : 'transparent'}`,
                    transition: 'all 0.2s',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '1.3rem' }}>{t.icon}</span>
                    <strong>{t.name}</strong>
                  </div>
                  {expandedType === t.name && (
                    <div style={{ marginTop: 8, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <div>{t.desc}</div>
                      <div style={{ marginTop: 4, color: 'var(--accent-main)' }}>📅 {t.when}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </>
      )}

      {tab === 'levels' && (
        <div className="card">
          <h3>📊 Уровни тестирования</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Уровень</th>
                <th>Что тестируем</th>
                <th>Кто</th>
                <th>Скорость</th>
                <th>Стоимость</th>
              </tr>
            </thead>
            <tbody>
              {levels.map(l => (
                <tr key={l.level}>
                  <td><strong>{l.icon} {l.level}</strong></td>
                  <td style={{ fontSize: '0.8rem' }}>{l.desc}</td>
                  <td style={{ fontSize: '0.8rem' }}>{l.who}</td>
                  <td>{'⚡'.repeat(l.speed)}</td>
                  <td>{'💰'.repeat(l.cost)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Visual pyramid */}
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {levels.slice().reverse().map((l, i) => (
              <div key={l.level} style={{
                width: `${40 + i * 20}%`, padding: '10px 0', textAlign: 'center',
                background: `rgba(20, 184, 166, ${0.15 + i * 0.08})`,
                borderRadius: i === 0 ? '8px 8px 0 0' : i === 3 ? '0 0 8px 8px' : 0,
                fontWeight: 600, fontSize: '0.85rem',
              }}>
                {l.icon} {l.level}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'principles' && (
        <div className="card">
          <h3>📜 7 принципов тестирования (ISTQB)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {principles.map(p => (
              <div key={p.num} style={{
                padding: '12px 16px', borderRadius: 8, background: 'var(--bg-code)',
                borderLeft: '3px solid var(--accent-main)',
              }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: '50%', background: 'var(--accent-main)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 700, flexShrink: 0,
                  }}>{p.num}</span>
                  <strong style={{ fontSize: '0.9rem' }}>{p.name}</strong>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: 32 }}>
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
