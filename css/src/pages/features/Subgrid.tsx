import CodeBlock from '@/components/CodeBlock'

export default function Subgrid() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          🔲 Subgrid
          <span className="year-badge">2023</span>
        </h1>
        <p>Наследование grid-линий от родителя</p>
        <a 
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mdn-link"
        >
          📚 MDN: Subgrid
        </a>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🎯</span>
        <div className="info-box-content">
          <div className="info-box-title">Зачем нужен?</div>
          <p>
            Раньше вложенные grid-элементы не могли выровняться по линиям родительского grid.
            Subgrid решает эту проблему!
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎮 Демо: Карточки с одинаковой высотой заголовков</h3>
        </div>

        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Заголовки и описания карточек выровнены благодаря subgrid:
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto auto auto',
          gap: '16px'
        }}>
          {[
            { title: 'Краткий заголовок', desc: 'Описание для первой карточки.' },
            { title: 'Очень длинный заголовок который занимает много строк', desc: 'Короткое описание.' },
            { title: 'Средний заголовок', desc: 'Это описание подлиннее, оно занимает пару строк текста.' }
          ].map((card, i) => (
            <div 
              key={i}
              style={{
                display: 'grid',
                gridRow: 'span 3',
                gridTemplateRows: 'subgrid',
                gap: '8px',
                padding: '20px',
                background: 'var(--bg-code)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)'
              }}
            >
              <h3 style={{ 
                margin: 0, 
                fontSize: '18px',
                color: 'var(--accent-css)'
              }}>
                {card.title}
              </h3>
              <p style={{ 
                margin: 0, 
                color: 'var(--text-secondary)',
                fontSize: '14px'
              }}>
                {card.desc}
              </p>
              <button style={{
                alignSelf: 'end',
                padding: '10px 20px',
                background: 'var(--accent-css)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Подробнее
              </button>
            </div>
          ))}
        </div>

        <CodeBlock 
          code={`.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto auto; /* Три строки для контента */
  gap: 16px;
}

.card {
  display: grid;
  grid-row: span 3;            /* Занимает 3 строки родителя */
  grid-template-rows: subgrid; /* Наследует строки родителя */
  gap: 8px;
  padding: 20px;
}

.card h3 { /* Первая строка — одинаковая высота у всех */ }
.card p  { /* Вторая строка */ }
.card button { 
  align-self: end; /* Кнопка внизу третьей строки */
}`}
          title="📝 CSS"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🆚 Без subgrid vs С subgrid</h3>
        </div>

        <div className="grid-2">
          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--accent-react)' }}>❌ Без subgrid</h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px'
            }}>
              {['Short', 'Very Long Title Here'].map((title, i) => (
                <div key={i} style={{
                  padding: '16px',
                  background: 'var(--bg-code)',
                  borderRadius: '8px'
                }}>
                  <h4 style={{ margin: '0 0 8px', fontSize: '14px' }}>{title}</h4>
                  <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Description text here
                  </p>
                  <button style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    background: 'var(--accent-react)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                  }}>
                    Button
                  </button>
                </div>
              ))}
            </div>
            <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              ⚠️ Кнопки на разной высоте
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--accent-vue)' }}>✅ С subgrid</h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridTemplateRows: 'auto auto auto',
              gap: '12px'
            }}>
              {['Short', 'Very Long Title Here'].map((title, i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridRow: 'span 3',
                  gridTemplateRows: 'subgrid',
                  gap: '4px',
                  padding: '16px',
                  background: 'var(--bg-code)',
                  borderRadius: '8px'
                }}>
                  <h4 style={{ margin: 0, fontSize: '14px' }}>{title}</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Description text here
                  </p>
                  <button style={{
                    alignSelf: 'end',
                    padding: '6px 12px',
                    fontSize: '12px',
                    background: 'var(--accent-vue)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    justifySelf: 'start'
                  }}>
                    Button
                  </button>
                </div>
              ))}
            </div>
            <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              ✅ Кнопки выровнены
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📐 Subgrid для колонок</h3>
        </div>

        <CodeBlock 
          code={`/* Форма с выровненными лейблами */
.form {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-column: 1 / -1;              /* Занимает все колонки */
  grid-template-columns: subgrid;    /* Наследует колонки */
  align-items: center;
}

.form-row label { /* Автоматически в первой колонке */ }
.form-row input { /* Во второй */ }
.form-row .hint { /* В третьей */ }

/* Все лейблы будут одинаковой ширины! */`}
          title="📝 Subgrid для колонок"
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: '12px',
          marginTop: '16px',
          padding: '20px',
          background: 'var(--bg-code)',
          borderRadius: '8px'
        }}>
          {[
            { label: 'Name', hint: 'Required' },
            { label: 'Email Address', hint: 'Optional' },
            { label: 'Phone', hint: 'Format: +7...' }
          ].map((field, i) => (
            <div 
              key={i}
              style={{
                display: 'grid',
                gridColumn: '1 / -1',
                gridTemplateColumns: 'subgrid',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <label style={{ color: 'var(--text-secondary)' }}>{field.label}</label>
              <input 
                type="text"
                style={{
                  padding: '8px 12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  background: 'var(--bg-primary)'
                }}
              />
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {field.hint}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔄 Subgrid в обоих направлениях</h3>
        </div>

        <CodeBlock 
          code={`/* Полное наследование grid-линий */
.parent {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 16px;
}

.child {
  grid-column: span 2;
  grid-row: span 2;
  
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  /* Наследует и колонки, и строки! */
}`}
          title="📝 Subgrid в обоих направлениях"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🌐 Поддержка браузеров</h3>
        </div>

        <div className="info-box success">
          <span className="info-box-icon">✅</span>
          <div className="info-box-content">
            <div className="info-box-title">Широкая поддержка в 2024</div>
            <p>
              Chrome 117+, Firefox 71+, Safari 16+. 
              Можно использовать в продакшене с fallback!
            </p>
          </div>
        </div>

        <CodeBlock 
          code={`/* Fallback для старых браузеров */
.card {
  display: grid;
  /* Fallback — обычные строки */
  grid-template-rows: auto 1fr auto;
}

@supports (grid-template-rows: subgrid) {
  .cards-container {
    grid-template-rows: auto auto auto;
  }
  
  .card {
    grid-row: span 3;
    grid-template-rows: subgrid;
  }
}`}
          title="📝 Progressive Enhancement"
        />
      </div>
    </div>
  )
}
