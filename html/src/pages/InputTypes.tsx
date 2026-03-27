import { useState } from 'react'

interface InputTypeInfo {
  type: string
  description: string
  example: string
  support: 'full' | 'partial' | 'limited'
  attributes?: string[]
  notes?: string
}

const inputTypes: InputTypeInfo[] = [
  {
    type: 'date',
    description: 'Выбор даты с нативным пикером',
    example: '<input type="date" min="2024-01-01" max="2025-12-31">',
    support: 'full',
    attributes: ['min', 'max', 'step', 'value'],
    notes: 'Формат всегда YYYY-MM-DD независимо от локали'
  },
  {
    type: 'time',
    description: 'Выбор времени',
    example: '<input type="time" step="900">',
    support: 'full',
    attributes: ['min', 'max', 'step'],
    notes: 'step в секундах (900 = 15 минут)'
  },
  {
    type: 'datetime-local',
    description: 'Дата и время без timezone',
    example: '<input type="datetime-local">',
    support: 'full',
    attributes: ['min', 'max', 'step'],
    notes: 'Не отправляет timezone — используй Date.toISOString()'
  },
  {
    type: 'month',
    description: 'Выбор месяца и года',
    example: '<input type="month" value="2024-06">',
    support: 'partial',
    notes: 'Safari не показывает пикер, но принимает значение'
  },
  {
    type: 'week',
    description: 'Выбор недели года',
    example: '<input type="week" value="2024-W26">',
    support: 'partial',
    notes: 'Формат YYYY-Wnn. Safari и Firefox mobile не поддерживают'
  },
  {
    type: 'color',
    description: 'Выбор цвета с пикером',
    example: '<input type="color" value="#ff6600">',
    support: 'full',
    attributes: ['list (для presets)'],
    notes: 'Возвращает HEX. Используй datalist для пресетов'
  },
  {
    type: 'range',
    description: 'Слайдер для числовых значений',
    example: '<input type="range" min="0" max="100" step="5">',
    support: 'full',
    attributes: ['min', 'max', 'step', 'list'],
    notes: 'Добавь output для отображения значения'
  },
  {
    type: 'number',
    description: 'Числовой ввод со спиннером',
    example: '<input type="number" min="0" max="10" step="0.5">',
    support: 'full',
    attributes: ['min', 'max', 'step', 'inputmode'],
    notes: 'Не используй для телефонов/кредиток — только математические числа'
  },
  {
    type: 'email',
    description: 'Email с базовой валидацией',
    example: '<input type="email" multiple>',
    support: 'full',
    attributes: ['multiple', 'pattern'],
    notes: 'Мобильная клавиатура с @ и .com'
  },
  {
    type: 'url',
    description: 'URL с валидацией',
    example: '<input type="url" placeholder="https://...">',
    support: 'full',
    notes: 'Требует протокол (http:// или https://)'
  },
  {
    type: 'tel',
    description: 'Телефонный номер',
    example: '<input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">',
    support: 'full',
    notes: 'Нет валидации! Используй pattern. Мобильная цифровая клавиатура'
  },
  {
    type: 'search',
    description: 'Поисковое поле',
    example: '<input type="search" results="5">',
    support: 'full',
    notes: 'Показывает кнопку очистки, особая стилизация'
  },
]

export default function InputTypes() {
  const [demoValues, setDemoValues] = useState<Record<string, string>>({
    date: '2024-06-15',
    time: '14:30',
    'datetime-local': '2024-06-15T14:30',
    month: '2024-06',
    week: '2024-W25',
    color: '#f97316',
    range: '50',
    number: '42',
    email: '',
    url: '',
    tel: '',
    search: '',
  })

  const updateValue = (type: string, value: string) => {
    setDemoValues(prev => ({ ...prev, [type]: value }))
  }

  const supportBadge = (support: string) => {
    const colors = {
      full: 'var(--success)',
      partial: 'var(--warning)',
      limited: 'var(--error)'
    }
    const labels = {
      full: '✓ Full',
      partial: '◐ Partial',
      limited: '✗ Limited'
    }
    return (
      <span style={{ 
        padding: '2px 8px', 
        borderRadius: '4px', 
        fontSize: '0.75rem',
        background: `${colors[support as keyof typeof colors]}20`,
        color: colors[support as keyof typeof colors]
      }}>
        {labels[support as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="page-container">
      <h1>📝 Типы Input</h1>
      <p className="page-description">
        HTML5 добавил множество специализированных типов input с нативными пикерами и валидацией.
        Большинство работают без JavaScript.
      </p>

      <div className="info-box">
        <strong>🎯 Правило</strong>
        <p style={{ marginTop: '8px' }}>
          Всегда используй правильный type — это даёт: нативные пикеры, правильную клавиатуру на мобильных, 
          базовую валидацию, автозаполнение браузера.
        </p>
      </div>

      <div className="card">
        <h2>🎮 Интерактивные примеры</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {inputTypes.map(inputType => (
            <div key={inputType.type} style={{ 
              padding: '20px', 
              background: 'var(--bg-tertiary)', 
              borderRadius: '12px',
              border: '1px solid var(--border)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <code style={{ fontSize: '1.1em' }}>type="{inputType.type}"</code>
                {supportBadge(inputType.support)}
              </div>
              
              <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                {inputType.description}
              </p>
              
              <div style={{ 
                display: 'flex', 
                gap: '12px', 
                alignItems: 'center',
                padding: '12px',
                background: 'var(--bg-secondary)',
                borderRadius: '8px',
                marginBottom: '12px'
              }}>
                <input
                  type={inputType.type}
                  value={demoValues[inputType.type] || ''}
                  onChange={(e) => updateValue(inputType.type, e.target.value)}
                  min={inputType.type === 'range' || inputType.type === 'number' ? '0' : undefined}
                  max={inputType.type === 'range' || inputType.type === 'number' ? '100' : undefined}
                  step={inputType.type === 'range' ? '5' : inputType.type === 'time' ? '900' : undefined}
                  multiple={inputType.type === 'email'}
                  placeholder={inputType.type === 'email' ? 'email@example.com' : 
                              inputType.type === 'url' ? 'https://...' :
                              inputType.type === 'tel' ? '+7 (999) 123-45-67' :
                              inputType.type === 'search' ? 'Поиск...' : undefined}
                  style={{ 
                    flex: 1,
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                />
                {(inputType.type === 'range' || inputType.type === 'color') && (
                  <output style={{ minWidth: '60px', textAlign: 'center', fontFamily: 'monospace' }}>
                    {demoValues[inputType.type]}
                  </output>
                )}
              </div>

              {inputType.notes && (
                <p style={{ fontSize: '0.8em', color: 'var(--warning)', marginBottom: '8px' }}>
                  💡 {inputType.notes}
                </p>
              )}

              {inputType.attributes && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {inputType.attributes.map(attr => (
                    <span key={attr} className="tag">{attr}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>📱 inputmode — Контроль клавиатуры</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Атрибут <code>inputmode</code> определяет какую виртуальную клавиатуру показать на мобильных:
        </p>

        <div className="grid-3">
          {[
            { mode: 'none', desc: 'Без клавиатуры (для кастомного ввода)' },
            { mode: 'text', desc: 'Обычная текстовая клавиатура' },
            { mode: 'decimal', desc: 'Цифры с точкой (для чисел с дробью)' },
            { mode: 'numeric', desc: 'Только цифры (PIN, коды)' },
            { mode: 'tel', desc: 'Телефонная клавиатура с +*#' },
            { mode: 'search', desc: 'Клавиатура с кнопкой поиска' },
            { mode: 'email', desc: 'Клавиатура с @ и .com' },
            { mode: 'url', desc: 'Клавиатура с / и .com' },
          ].map(item => (
            <div key={item.mode} style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <code>inputmode="{item.mode}"</code>
              <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)', marginTop: '4px' }}>{item.desc}</p>
              <input 
                type="text" 
                inputMode={item.mode as any}
                placeholder={`Попробуй (${item.mode})`}
                style={{ 
                  width: '100%', 
                  marginTop: '8px',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          ))}
        </div>

        <div className="info-box warning" style={{ marginTop: '16px' }}>
          <strong>⚠️ type vs inputmode</strong>
          <p style={{ marginTop: '8px' }}>
            <code>type="number"</code> даёт валидацию + клавиатуру, но плохо для кредиток/телефонов.
            Для них используй <code>type="text" inputmode="numeric"</code>
          </p>
        </div>
      </div>

      <div className="card">
        <h2>⌨️ enterkeyhint — Кнопка Enter</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Меняет надпись/иконку на кнопке Enter на мобильной клавиатуре:
        </p>

        <div className="grid-3">
          {[
            { hint: 'enter', desc: 'Стандартный Enter' },
            { hint: 'done', desc: 'Готово' },
            { hint: 'go', desc: 'Перейти' },
            { hint: 'next', desc: 'Далее (к след. полю)' },
            { hint: 'previous', desc: 'Назад' },
            { hint: 'search', desc: 'Поиск 🔍' },
            { hint: 'send', desc: 'Отправить' },
          ].map(item => (
            <div key={item.hint} style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <code>enterkeyhint="{item.hint}"</code>
              <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)', marginTop: '4px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>📋 Datalist — Автокомплит</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          <code>&lt;datalist&gt;</code> добавляет выпадающий список подсказок к любому input:
        </p>

        <div className="code-block">
          <pre>{`<input list="browsers" placeholder="Выберите браузер">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
</datalist>`}</pre>
        </div>

        <div className="demo-area" style={{ marginTop: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Попробуй:</label>
          <input 
            list="browsers" 
            placeholder="Начни вводить..."
            style={{ 
              width: '300px',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
          />
          <datalist id="browsers">
            <option value="Chrome" />
            <option value="Firefox" />
            <option value="Safari" />
            <option value="Edge" />
            <option value="Opera" />
            <option value="Brave" />
          </datalist>
        </div>

        <div className="info-box success" style={{ marginTop: '16px' }}>
          <strong>💡 Datalist + color</strong>
          <p style={{ marginTop: '8px' }}>
            Можно использовать datalist с <code>type="color"</code> для пресетов цветов!
          </p>
          <input 
            type="color" 
            list="colors"
            style={{ marginTop: '8px', width: '100px', height: '40px' }}
          />
          <datalist id="colors">
            <option value="#f97316" />
            <option value="#3b82f6" />
            <option value="#10b981" />
            <option value="#ef4444" />
            <option value="#8b5cf6" />
          </datalist>
        </div>
      </div>
    </div>
  )
}
