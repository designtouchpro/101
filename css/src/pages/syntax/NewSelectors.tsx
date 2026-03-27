import CodeBlock from '@/components/CodeBlock'

export default function NewSelectors() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          🎯 Новые псевдоклассы и псевдоэлементы
          <span className="year-badge">2020+</span>
        </h1>
        <p>:focus-visible, :user-valid, ::marker и другие</p>
      </div>

      {/* :focus-visible */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">👁️ :focus-visible vs :focus</h3>
        </div>

        <style>{`
          .focus-demo-btn {
            padding: 12px 24px;
            font-size: 16px;
            border: 2px solid #667eea;
            border-radius: 8px;
            background: white;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .focus-demo-old:focus {
            outline: 3px solid #667eea;
            outline-offset: 2px;
          }
          
          .focus-demo-new:focus {
            outline: none;
          }
          .focus-demo-new:focus-visible {
            outline: 3px solid #667eea;
            outline-offset: 2px;
          }
        `}</style>

        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Кликните мышкой, потом нажмите Tab — увидите разницу:
        </p>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>:focus (старый)</div>
            <button className="focus-demo-btn focus-demo-old">Click / Tab me</button>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>:focus-visible (новый)</div>
            <button className="focus-demo-btn focus-demo-new">Click / Tab me</button>
          </div>
        </div>

        <CodeBlock code={`/* ❌ :focus — показывает outline ВСЕГДА */
button:focus {
  outline: 3px solid blue;
}
/* При клике мышкой тоже будет outline 😤 */

/* ✅ :focus-visible — только при клавиатурной навигации */
button:focus {
  outline: none;
}
button:focus-visible {
  outline: 3px solid blue;
}
/* При клике мышкой outline НЕ будет! */
/* При Tab — будет ✅ */`} title=":focus-visible — умный фокус" />

        <div className="info-box" style={{ marginTop: '16px' }}>
          <span className="info-box-icon">♿</span>
          <div className="info-box-content">
            <div className="info-box-title">Доступность</div>
            <p>
              Используйте <code>:focus-visible</code> вместо <code>outline: none</code>!
              Это сохраняет доступность для клавиатуры, убирая outline при клике мышкой.
            </p>
          </div>
        </div>
      </div>

      {/* :user-valid / :user-invalid */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📝 :user-valid / :user-invalid</h3>
        </div>

        <style>{`
          .user-valid-demo input {
            padding: 12px 16px;
            font-size: 16px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            width: 100%;
            max-width: 300px;
            transition: all 0.2s;
          }
          
          /* Старый способ - сразу показывает ошибку */
          .user-valid-old:invalid {
            border-color: #ef4444;
            background: #fef2f2;
          }
          .user-valid-old:valid {
            border-color: #10b981;
            background: #f0fdf4;
          }
          
          /* Новый способ - только после взаимодействия */
          .user-valid-new:user-invalid {
            border-color: #ef4444;
            background: #fef2f2;
          }
          .user-valid-new:user-valid {
            border-color: #10b981;
            background: #f0fdf4;
          }
        `}</style>

        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Начните вводить email — увидите разницу в поведении:
        </p>

        <div className="user-valid-demo" style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              :valid / :invalid (старый)
            </div>
            <input 
              type="email" 
              className="user-valid-old"
              placeholder="email@example.com"
              required
            />
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              ☝️ Сразу красный при загрузке
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              :user-valid / :user-invalid (новый)
            </div>
            <input 
              type="email" 
              className="user-valid-new"
              placeholder="email@example.com"
              required
            />
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              ☝️ Нейтральный, пока не начнёте вводить
            </div>
          </div>
        </div>

        <CodeBlock code={`/* ❌ :valid/:invalid — проверка при загрузке */
input:invalid {
  border-color: red;  /* Сразу красный! 😱 */
}

/* ✅ :user-valid/:user-invalid — после взаимодействия */
input:user-invalid {
  border-color: red;  /* Только после ввода */
}

input:user-valid {
  border-color: green;
}

/* Пользователь сначала видит нейтральное поле,
   валидация показывается после начала ввода */`} title=":user-valid — UX-friendly валидация" />
      </div>

      {/* :is() and :where() reminder */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">✨ :is() и :where() — напоминание</h3>
        </div>

        <style>{`
          .is-where-demo :is(h1, h2, h3, h4) {
            color: #667eea;
            margin: 0 0 8px;
          }
          
          .is-where-demo :where(p, span, small) {
            color: #666;
          }
        `}</style>

        <div className="is-where-demo" style={{ 
          padding: '20px', 
          background: 'var(--bg-code)', 
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <h3>Заголовок (h3)</h3>
          <h4>Подзаголовок (h4)</h4>
          <p>Параграф текста</p>
          <small>Мелкий текст</small>
        </div>

        <div className="grid-2">
          <CodeBlock code={`/* :is() — группировка с МАКСИМАЛЬНОЙ 
   специфичностью из списка */
   
article :is(h1, h2, h3) {
  color: blue;
}

/* = article h1, article h2, article h3 */
/* Специфичность: 0-0-2 (как у h1) */`} title=":is()" />

          <CodeBlock code={`/* :where() — группировка с НУЛЕВОЙ 
   специфичностью */
   
article :where(h1, h2, h3) {
  color: blue;
}

/* = article h1, article h2, article h3 */
/* Специфичность: 0-0-1 (только article) */`} title=":where()" />
        </div>
      </div>

      {/* :not() improvements */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🚫 Улучшенный :not()</h3>
        </div>

        <style>{`
          .not-demo-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .not-demo-list li {
            padding: 12px 16px;
            background: white;
            border: 1px solid #e5e7eb;
            margin-bottom: -1px;
          }
          .not-demo-list li:first-child {
            border-radius: 8px 8px 0 0;
          }
          .not-demo-list li:last-child {
            border-radius: 0 0 8px 8px;
          }
          .not-demo-list li:not(:last-child) {
            border-bottom: 1px solid #e5e7eb;
          }
          .not-demo-list li:not(.disabled):hover {
            background: #f3f4f6;
          }
          .not-demo-list li.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}</style>

        <ul className="not-demo-list" style={{ marginBottom: '16px' }}>
          <li>Item 1 — hover me</li>
          <li className="disabled">Item 2 — disabled</li>
          <li>Item 3 — hover me</li>
          <li className="disabled">Item 4 — disabled</li>
          <li>Item 5 — hover me</li>
        </ul>

        <CodeBlock code={`/* Старый :not() — только простые селекторы */
li:not(.disabled) { }

/* Новый :not() — списки и сложные селекторы! */
li:not(.disabled, .hidden) { }

/* Исключить несколько классов */
a:not(.btn, .link, [disabled]) { }

/* Исключить вложенные элементы */
.card:not(:has(img)) { }

/* Комбинация с :is() */
:not(:is(h1, h2, h3)) { }

/* Практика: hover только для enabled */
li:not(.disabled):hover {
  background: #f5f5f5;
}`} title=":not() с несколькими селекторами" />
      </div>

      {/* ::marker */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📌 ::marker — стилизация маркеров списка</h3>
        </div>

        <style>{`
          .marker-demo {
            padding-left: 24px;
          }
          .marker-demo li {
            padding: 4px 0;
          }
          .marker-demo li::marker {
            color: #667eea;
            font-weight: bold;
            font-size: 1.2em;
          }
          
          .marker-demo-emoji li::marker {
            content: '✨ ';
          }
          
          .marker-demo-counter {
            counter-reset: items;
          }
          .marker-demo-counter li {
            counter-increment: items;
          }
          .marker-demo-counter li::marker {
            content: counter(items) '. ';
            color: #764ba2;
            font-weight: 600;
          }
        `}</style>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Цветные маркеры</div>
            <ul className="marker-demo">
              <li>First item</li>
              <li>Second item</li>
              <li>Third item</li>
            </ul>
          </div>
          
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Emoji маркеры</div>
            <ul className="marker-demo marker-demo-emoji">
              <li>Magic item</li>
              <li>Another one</li>
              <li>Last item</li>
            </ul>
          </div>
          
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Custom counter</div>
            <ol className="marker-demo marker-demo-counter">
              <li>Step one</li>
              <li>Step two</li>
              <li>Step three</li>
            </ol>
          </div>
        </div>

        <CodeBlock code={`/* Простая стилизация маркера */
li::marker {
  color: blue;
  font-weight: bold;
  font-size: 1.2em;
}

/* Emoji маркеры */
li::marker {
  content: '✨ ';
}

/* Кастомный счётчик */
ol {
  counter-reset: steps;
}
li {
  counter-increment: steps;
}
li::marker {
  content: counter(steps) '. ';
  color: purple;
  font-weight: 600;
}

/* Ограничения: только color, font-*, content */`} title="::marker" />
      </div>

      {/* ::backdrop */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎭 ::backdrop — фон модалки</h3>
        </div>

        <style>{`
          .backdrop-demo-dialog {
            border: none;
            border-radius: 16px;
            padding: 24px;
            max-width: 400px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.25);
          }
          .backdrop-demo-dialog::backdrop {
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
          }
          .backdrop-demo-dialog h3 {
            margin: 0 0 12px;
          }
          .backdrop-demo-dialog p {
            margin: 0 0 20px;
            color: #666;
          }
          .backdrop-demo-dialog button {
            padding: 10px 20px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          }
        `}</style>

        <button 
          onClick={() => (document.getElementById('backdrop-dialog') as HTMLDialogElement)?.showModal()}
          style={{
            padding: '12px 24px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '16px'
          }}
        >
          Open Dialog
        </button>

        <dialog id="backdrop-dialog" className="backdrop-demo-dialog">
          <h3>Modal Dialog</h3>
          <p>Look at the blurred backdrop behind me! 🎭</p>
          <button onClick={() => (document.getElementById('backdrop-dialog') as HTMLDialogElement)?.close()}>
            Close
          </button>
        </dialog>

        <CodeBlock code={`/* Стилизация backdrop у <dialog> */
dialog::backdrop {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

/* Также работает с :fullscreen */
video:fullscreen::backdrop {
  background: black;
}

/* ::backdrop — слой между страницей и модалкой */`} title="::backdrop" />
      </div>

      {/* ::file-selector-button */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📁 ::file-selector-button</h3>
        </div>

        <style>{`
          .file-demo input[type="file"] {
            font-size: 16px;
          }
          .file-demo input[type="file"]::file-selector-button {
            padding: 12px 24px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            margin-right: 16px;
            font-weight: 600;
            transition: all 0.2s;
          }
          .file-demo input[type="file"]::file-selector-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }
        `}</style>

        <div className="file-demo" style={{ marginBottom: '16px' }}>
          <input type="file" />
        </div>

        <CodeBlock code={`/* Стилизация кнопки выбора файла */
input[type="file"]::file-selector-button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

input[type="file"]::file-selector-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* Наконец-то можно стилизовать! */`} title="::file-selector-button" />
      </div>

      {/* Summary table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📋 Сводная таблица</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border)' }}>Селектор</th>
                <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border)' }}>Год</th>
                <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border)' }}>Описание</th>
              </tr>
            </thead>
            <tbody>
              {[
                { sel: ':focus-visible', year: '2020', desc: 'Фокус только при клавиатурной навигации' },
                { sel: ':is()', year: '2021', desc: 'Группировка селекторов (с макс. специфичностью)' },
                { sel: ':where()', year: '2021', desc: 'Группировка селекторов (нулевая специфичность)' },
                { sel: ':has()', year: '2022', desc: 'Родительский селектор' },
                { sel: ':user-valid', year: '2023', desc: 'Валидный после взаимодействия' },
                { sel: ':user-invalid', year: '2023', desc: 'Невалидный после взаимодействия' },
                { sel: '::marker', year: '2020', desc: 'Маркер списка' },
                { sel: '::backdrop', year: '2020', desc: 'Фон за dialog/fullscreen' },
                { sel: '::file-selector-button', year: '2021', desc: 'Кнопка input[type=file]' },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>
                    <code style={{ color: 'var(--accent-vue)' }}>{row.sel}</code>
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>{row.year}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
