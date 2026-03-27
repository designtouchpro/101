import { useState } from 'react'

interface CheckItem {
  id: number
  text: string
  checked: boolean
}

const defaultDoR: CheckItem[] = [
  { id: 1, text: 'User Story (пользовательская история) написана в формате "Как <роль>, я хочу <действие>, чтобы <ценность>"', checked: false },
  { id: 2, text: 'Acceptance Criteria (критерии приёмки) определены и понятны команде', checked: false },
  { id: 3, text: 'Story оценена в Story Points', checked: false },
  { id: 4, text: 'Зависимости выявлены и разрешены (или запланированы)', checked: false },
  { id: 5, text: 'Макеты/дизайн готовы (если нужны)', checked: false },
  { id: 6, text: 'Story помещается в один спринт', checked: false },
  { id: 7, text: 'Технические вопросы сняты (spike — исследовательская задача — завершён)', checked: false },
]

const defaultDoD: CheckItem[] = [
  { id: 1, text: 'Код написан и проходит все unit-тесты', checked: false },
  { id: 2, text: 'Code review (ревью кода) пройден (минимум 1 approve)', checked: false },
  { id: 3, text: 'Все Acceptance Criteria выполнены', checked: false },
  { id: 4, text: 'Нет критических и высоких багов', checked: false },
  { id: 5, text: 'Документация обновлена', checked: false },
  { id: 6, text: 'Задеплоено на staging/тестовую среду', checked: false },
  { id: 7, text: 'PO принял (product review)', checked: false },
  { id: 8, text: 'Regression тесты пройдены', checked: false },
]

const acExamples = [
  {
    story: 'Как пользователь, я хочу фильтровать товары по цене, чтобы быстро найти подходящий.',
    good: [
      'GIVEN каталог с товарами, WHEN пользователь устанавливает диапазон цены 1000–5000₽, THEN отображаются только товары в этом диапазоне',
      'GIVEN пустой результат фильтрации, WHEN нет товаров в диапазоне, THEN показывается сообщение "Товары не найдены"',
      'GIVEN мобильное устройство, WHEN пользователь использует фильтр, THEN UI адаптивен и удобен',
    ],
    bad: ['Фильтр работает', 'Пользователь может фильтровать', 'Всё ок'],
  },
  {
    story: 'Как менеджер, я хочу экспортировать отчёт в PDF, чтобы отправить руководству.',
    good: [
      'GIVEN отчёт с данными за период, WHEN менеджер нажимает "Экспорт в PDF", THEN скачивается PDF с графиками и таблицами',
      'GIVEN отчёт с 1000+ строками, WHEN экспорт, THEN PDF генерируется менее чем за 10 секунд',
    ],
    bad: ['PDF экспорт работает', 'Кнопка есть'],
  },
]

export default function DoRDoD() {
  const [dorItems, setDorItems] = useState<CheckItem[]>(defaultDoR)
  const [dodItems, setDodItems] = useState<CheckItem[]>(defaultDoD)
  const [newDorText, setNewDorText] = useState('')
  const [newDodText, setNewDodText] = useState('')
  const [tab, setTab] = useState<'dor' | 'dod' | 'ac'>('dor')

  const toggleItem = (list: 'dor' | 'dod', id: number) => {
    const setter = list === 'dor' ? setDorItems : setDodItems
    setter(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
  }

  const addItem = (list: 'dor' | 'dod') => {
    const text = list === 'dor' ? newDorText : newDodText
    if (!text.trim()) return
    const setter = list === 'dor' ? setDorItems : setDodItems
    setter(prev => [...prev, { id: Date.now(), text: text.trim(), checked: false }])
    if (list === 'dor') setNewDorText(''); else setNewDodText('')
  }

  const removeItem = (list: 'dor' | 'dod', id: number) => {
    const setter = list === 'dor' ? setDorItems : setDodItems
    setter(prev => prev.filter(item => item.id !== id))
  }

  const getProgress = (items: CheckItem[]) => {
    if (items.length === 0) return 0
    return Math.round((items.filter(i => i.checked).length / items.length) * 100)
  }

  const renderChecklist = (items: CheckItem[], list: 'dor' | 'dod', newText: string, setNewText: (v: string) => void) => {
    const progress = getProgress(items)
    const allDone = progress === 100 && items.length > 0
    return (
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
          <h3 style={{ margin: 0 }}>{list === 'dor' ? '📥 Definition of Ready' : '✅ Definition of Done'}</h3>
          <div style={{
            fontSize: '0.85rem', fontWeight: 700, padding: '4px 12px', borderRadius: 12,
            background: allDone ? '#22c55e20' : 'var(--bg-secondary)',
            color: allDone ? '#22c55e' : 'var(--text-secondary)',
          }}>
            {progress}%
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, background: 'var(--bg-secondary)', borderRadius: 3, marginBottom: 16, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${progress}%`, borderRadius: 3,
            background: allDone ? '#22c55e' : 'var(--accent-main)',
            transition: 'width 0.3s',
          }} />
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>
          {list === 'dor'
            ? 'Чек-лист готовности задачи к взятию в спринт. Если не выполнен → задача не берётся!'
            : 'Чек-лист завершённости задачи. Пока не выполнен → задача не считается сделанной!'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {items.map(item => (
            <div key={item.id} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
              borderRadius: 8, background: item.checked ? '#22c55e08' : 'var(--bg-secondary)',
              border: item.checked ? '1px solid #22c55e40' : '1px solid transparent',
              transition: 'all 0.2s',
            }}>
              <input type="checkbox" checked={item.checked} onChange={() => toggleItem(list, item.id)}
                style={{ accentColor: 'var(--accent-main)', width: 18, height: 18, cursor: 'pointer' }} />
              <span style={{
                flex: 1, fontSize: '0.85rem',
                textDecoration: item.checked ? 'line-through' : 'none',
                color: item.checked ? 'var(--text-muted)' : 'var(--text-primary)',
              }}>
                {item.text}
              </span>
              <button onClick={() => removeItem(list, item.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', opacity: 0.3 }}>✕</button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <input className="input" placeholder="Новый пункт…" value={newText} onChange={e => setNewText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addItem(list)} style={{ flex: 1 }} />
          <button onClick={() => addItem(list)} className="btn btn-primary">Добавить</button>
        </div>

        {allDone && (
          <div className="info-box" style={{ marginTop: 16, borderColor: '#22c55e' }}>
            <div className="info-box-content" style={{ color: '#22c55e', fontWeight: 600 }}>
              {list === 'dor' ? '🎉 Задача готова к спринту!' : '🎉 Задача завершена!'}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📋 Definition of Ready & Done (Критерии готовности и завершения)</h1>
        <p>Чек-листы качества: когда задача готова к работе и когда она считается завершённой.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Definition of Ready (DoR)</strong> и <strong>Definition of Done (DoD)</strong> — два фундаментальных артефакта Scrum 
          и других Agile-методологий. DoR отвечает на вопрос «Когда задача готова к тому, чтобы её взяли в спринт?» — 
          если требования нечёткие, дизайн не готов или зависимости не разрешены, задача не прошла DoR. 
          DoD отвечает на вопрос «Когда задачу можно считать завершённой?» — код написан, тесты пройдены, 
          документация обновлена, review проведено.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Без явных критериев команды попадают в ловушку: разработчик считает задачу «готовой», 
          а QA обнаруживает, что не написаны тесты. Или PO принимает задачу в спринт, где требования описаны одним предложением.
          DoR и DoD — это контракт между всеми участниками: если критерии не выполнены, задача не переходит на следующий этап.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>💡 Acceptance Criteria vs DoD</strong>: DoD — общие для всех задач правила (код покрыт тестами, 
            прошёл review). Acceptance Criteria — уникальные для конкретной задачи условия приёмки (кнопка ведёт на страницу X, 
            при ошибке показывается сообщение Y). Оба нужны — они дополняют друг друга.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {([
          { id: 'dor' as const, label: '📥 DoR', desc: 'Когда задачу можно брать' },
          { id: 'dod' as const, label: '✅ DoD', desc: 'Когда задача готова' },
          { id: 'ac' as const, label: '📝 Acceptance Criteria', desc: 'Как писать критерии' },
        ]).map(t => (
          <button key={t.id} className={`btn ${tab === t.id ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'dor' && renderChecklist(dorItems, 'dor', newDorText, setNewDorText)}
      {tab === 'dod' && renderChecklist(dodItems, 'dod', newDodText, setNewDodText)}

      {tab === 'ac' && (
        <>
          <div className="card">
            <h3>📝 Acceptance Criteria (Критерии приёмки)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
              AC определяют, что именно должна делать история. Формат: <strong>GIVEN (дано) / WHEN (когда) / THEN (тогда)</strong>.
            </p>

            <div className="info-box" style={{ marginBottom: 16 }}>
              <div className="info-box-content" style={{ fontSize: '0.85rem' }}>
                <strong>GIVEN</strong> (контекст) → <strong>WHEN</strong> (действие) → <strong>THEN</strong> (ожидаемый результат)
              </div>
            </div>

            {acExamples.map((ex, i) => (
              <div key={i} style={{ marginBottom: 24, padding: 16, borderRadius: 8, background: 'var(--bg-secondary)' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 12, fontStyle: 'italic' }}>
                  "{ex.story}"
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#22c55e', marginBottom: 6 }}>✅ Хорошие AC:</div>
                  {ex.good.map((g, j) => (
                    <div key={j} style={{
                      fontSize: '0.8rem', padding: '6px 10px', marginBottom: 4,
                      borderRadius: 6, background: '#22c55e08', borderLeft: '3px solid #22c55e',
                    }}>{g}</div>
                  ))}
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ef4444', marginBottom: 6 }}>❌ Плохие AC:</div>
                  {ex.bad.map((b, j) => (
                    <div key={j} style={{
                      fontSize: '0.8rem', padding: '6px 10px', marginBottom: 4,
                      borderRadius: 6, background: '#ef444408', borderLeft: '3px solid #ef4444',
                      textDecoration: 'line-through', color: 'var(--text-muted)',
                    }}>{b}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* DoR vs DoD comparison */}
          <div className="card">
            <h3>🔄 DoR vs DoD vs AC</h3>
            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {[
                { title: 'Definition of Ready', icon: '📥', color: '#3b82f6', points: ['Применяется ДО спринта', 'Отвечает: "Можно ли брать?"', 'Владелец: PO + команда', 'Один на всю команду'] },
                { title: 'Definition of Done', icon: '✅', color: '#22c55e', points: ['Применяется В КОНЦЕ работы', 'Отвечает: "Готово ли?"', 'Владелец: команда', 'Один на всю команду'] },
                { title: 'Acceptance Criteria', icon: '📝', color: '#f59e0b', points: ['Привязаны к конкретной Story', 'Отвечают: "Что именно?"', 'Владелец: PO', 'Уникальны для каждой задачи'] },
              ].map(item => (
                <div key={item.title} style={{ padding: 16, borderRadius: 8, border: `1px solid ${item.color}40`, background: `${item.color}08` }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: item.color, marginBottom: 8 }}>{item.title}</div>
                  {item.points.map(p => (
                    <div key={p} style={{ fontSize: '0.8rem', marginBottom: 2 }}>• {p}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
