import { useState } from 'react'

interface TestCase {
  id: string
  title: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'pass' | 'fail' | 'skip' | 'not-run'
}

const defaultTestCases: TestCase[] = [
  { id: 'TC-001', title: 'Регистрация с валидным email', priority: 'High', status: 'not-run' },
  { id: 'TC-002', title: 'Регистрация с невалидным email', priority: 'High', status: 'not-run' },
  { id: 'TC-003', title: 'Вход с правильным паролем', priority: 'High', status: 'not-run' },
  { id: 'TC-004', title: 'Вход с неправильным паролем', priority: 'High', status: 'not-run' },
  { id: 'TC-005', title: 'Сброс пароля по email', priority: 'Medium', status: 'not-run' },
  { id: 'TC-006', title: 'Добавление товара в корзину', priority: 'High', status: 'not-run' },
  { id: 'TC-007', title: 'Удаление товара из корзины', priority: 'Medium', status: 'not-run' },
  { id: 'TC-008', title: 'Оплата банковской картой', priority: 'High', status: 'not-run' },
  { id: 'TC-009', title: 'Применение промокода', priority: 'Medium', status: 'not-run' },
  { id: 'TC-010', title: 'Поиск по названию товара', priority: 'Low', status: 'not-run' },
]

const checklistTemplate = [
  { category: 'Авторизация', items: ['Логин по email', 'Логин по номеру', 'Восстановление пароля', 'Logout', 'Блокировка после 5 попыток'] },
  { category: 'Профиль', items: ['Редактирование имени', 'Смена email', 'Загрузка аватара', 'Удаление аккаунта'] },
  { category: 'Корзина', items: ['Добавить товар', 'Изменить количество', 'Удалить товар', 'Пустая корзина', 'Промокод'] },
  { category: 'Оплата', items: ['Карта (Visa/MC)', 'Apple Pay', 'Ошибка оплаты', 'Чек на email'] },
]

const testPlanSections = [
  { section: 'Цели', icon: '🎯', desc: 'Что тестируем и зачем. Scope и out-of-scope.' },
  { section: 'Стратегия', icon: '📐', desc: 'Какие типы тестирования: функциональное, нагрузочное, security.' },
  { section: 'Ресурсы', icon: '👥', desc: 'Кто тестирует, какие инструменты, окружения.' },
  { section: 'Расписание', icon: '📅', desc: 'Дедлайны, майлстоуны, критерии входа/выхода.' },
  { section: 'Риски', icon: '⚠️', desc: 'Что может пойти не так и план B.' },
  { section: 'Критерии', icon: '✅', desc: 'Entry/Exit criteria. Когда можно начинать и заканчивать.' },
]

export default function TestPlan() {
  const [tab, setTab] = useState<'plan' | 'cases' | 'checklist'>('plan')
  const [cases, setCases] = useState(defaultTestCases)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const toggleStatus = (id: string) => {
    const statusOrder: TestCase['status'][] = ['not-run', 'pass', 'fail', 'skip']
    setCases(prev => prev.map(c => {
      if (c.id !== id) return c
      const current = statusOrder.indexOf(c.status)
      return { ...c, status: statusOrder[(current + 1) % statusOrder.length]! }
    }))
  }

  const toggleChecked = (key: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const stats = {
    pass: cases.filter(c => c.status === 'pass').length,
    fail: cases.filter(c => c.status === 'fail').length,
    skip: cases.filter(c => c.status === 'skip').length,
    notRun: cases.filter(c => c.status === 'not-run').length,
  }

  const totalChecklist = checklistTemplate.reduce((s, c) => s + c.items.length, 0)
  const checkedCount = checkedItems.size

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📋 Тест-план и чек-листы</h1>
        <p>Как планировать тестирование, писать тест-кейсы и чек-листы.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Тест-план</strong> — стратегический документ, который определяет ЧТО тестировать, КАК, КОГДА 
          и КОМУ. По IEEE 829, тест-план включает: scope (границы тестирования), подход (ручное/авто), 
          критерии входа и выхода, ресурсы, расписание и риски. В Agile тест-план обычно легковесный — 
          1-2 страницы или confluence-документ вместо 20-страничного Word.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Тест-кейс</strong> — детальная инструкция: предусловия → шаги → ожидаемый результат. <strong>Чек-лист</strong> — облегчённая форма: список проверок без детальных шагов. 
          Тест-кейсы подходят для критических сценариев и передачи знаний новичкам. 
          Чек-листы — для опытных тестировщиков и быстрого прогона. Многие команды комбинируют: 
          тест-кейсы для smoke/regression, чек-листы для feature testing.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>📌 Критерий хорошего тест-кейса</strong>: Его может выполнить человек, который видит продукт впервые. 
            Если для понимания шага нужно «просто знать» — тест-кейс неполный. 
            Пишите так, будто передаёте работу стажёру в первый день.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {([['plan', '📋 Тест-план'], ['cases', '📝 Тест-кейсы'], ['checklist', '✅ Чек-лист']] as const).map(([k, l]) => (
          <button key={k} className={`btn ${tab === k ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === 'plan' && (
        <div className="card">
          <h3>📋 Структура тест-плана</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {testPlanSections.map((s, i) => (
              <div key={s.section} style={{
                padding: '14px 16px', borderRadius: 8, background: 'var(--bg-code)',
                display: 'flex', gap: 12, alignItems: 'center',
              }}>
                <span style={{
                  width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-main)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700, flexShrink: 0,
                }}>{i + 1}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.icon} {s.section}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="info-box" style={{ marginTop: 16 }}>
            <div className="info-box-content">
              <div className="info-box-title">📌 Entry / Exit Criteria</div>
              <div className="grid-2" style={{ marginTop: 8 }}>
                <div>
                  <strong style={{ fontSize: '0.85rem' }}>Entry (начинаем когда):</strong>
                  <ul className="info-list">
                    <li>Билд собирается</li>
                    <li>Окружение готово</li>
                    <li>Тест-кейсы написаны</li>
                    <li>Тестовые данные подготовлены</li>
                  </ul>
                </div>
                <div>
                  <strong style={{ fontSize: '0.85rem' }}>Exit (заканчиваем когда):</strong>
                  <ul className="info-list">
                    <li>Все P1/P2 баги исправлены</li>
                    <li>Покрытие ≥ 95%</li>
                    <li>Нет блокеров</li>
                    <li>Regression пройден</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'cases' && (
        <div className="card">
          <h3>📝 Тест-кейсы</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>
            Нажмите на статус чтобы изменить: Not Run → Pass → Fail → Skip
          </p>

          {/* Stats */}
          <div className="grid-2" style={{ marginBottom: 16, gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              { label: 'Pass', val: stats.pass, color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
              { label: 'Fail', val: stats.fail, color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
              { label: 'Skip', val: stats.skip, color: '#eab308', bg: 'rgba(234,179,8,0.1)' },
              { label: 'Not Run', val: stats.notRun, color: 'var(--text-muted)', bg: 'var(--bg-code)' },
            ].map(s => (
              <div key={s.label} style={{
                padding: '10px', borderRadius: 8, textAlign: 'center', background: s.bg,
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <table className="data-table">
            <thead><tr><th>ID</th><th>Тест-кейс</th><th>Priority</th><th>Статус</th></tr></thead>
            <tbody>
              {cases.map(c => (
                <tr key={c.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{c.id}</td>
                  <td>{c.title}</td>
                  <td><span className="badge">{c.priority}</span></td>
                  <td>
                    <button className="btn" onClick={() => toggleStatus(c.id)} style={{
                      padding: '4px 10px', fontSize: '0.75rem', fontWeight: 600,
                      color: c.status === 'pass' ? '#22c55e' : c.status === 'fail' ? '#ef4444' : c.status === 'skip' ? '#eab308' : 'var(--text-muted)',
                      background: c.status === 'pass' ? 'rgba(34,197,94,0.1)' : c.status === 'fail' ? 'rgba(239,68,68,0.1)' : c.status === 'skip' ? 'rgba(234,179,8,0.1)' : 'var(--bg-code)',
                    }}>
                      {c.status === 'pass' ? '✅ PASS' : c.status === 'fail' ? '❌ FAIL' : c.status === 'skip' ? '⏭️ SKIP' : '⬜ NOT RUN'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'checklist' && (
        <div className="card">
          <h3>✅ Чек-лист тестирования</h3>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>
            Прогресс: {checkedCount}/{totalChecklist} ({totalChecklist > 0 ? Math.round((checkedCount / totalChecklist) * 100) : 0}%)
          </div>

          {/* Progress bar */}
          <div style={{ height: 6, borderRadius: 3, background: 'var(--border-color)', marginBottom: 16 }}>
            <div style={{
              height: '100%', borderRadius: 3, width: `${totalChecklist > 0 ? (checkedCount / totalChecklist) * 100 : 0}%`,
              background: checkedCount === totalChecklist ? '#22c55e' : 'var(--accent-main)',
              transition: 'width 0.3s',
            }} />
          </div>

          {checklistTemplate.map(cat => (
            <div key={cat.category} style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: '0.9rem', padding: '8px 0', borderBottom: '1px solid var(--border-color)', marginBottom: 8 }}>
                {cat.category}
              </h4>
              {cat.items.map(item => {
                const key = `${cat.category}-${item}`
                const checked = checkedItems.has(key)
                return (
                  <div key={key} onClick={() => toggleChecked(key)} style={{
                    padding: '8px 12px', borderRadius: 6, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4,
                    background: checked ? 'rgba(34,197,94,0.08)' : 'transparent',
                    textDecoration: checked ? 'line-through' : 'none',
                    color: checked ? 'var(--text-muted)' : 'var(--text-primary)',
                    transition: 'all 0.15s',
                  }}>
                    <span>{checked ? '✅' : '⬜'}</span>
                    <span style={{ fontSize: '0.85rem' }}>{item}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
