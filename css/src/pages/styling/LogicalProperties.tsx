import CodeBlock from '@/components/CodeBlock'

export default function LogicalProperties() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          ↔️ Logical Properties
          <span className="year-badge">2018+</span>
        </h1>
        <p>Универсальные свойства для LTR и RTL языков</p>
        <a 
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mdn-link"
        >
          📚 MDN: Logical Properties
        </a>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🌍</span>
        <div className="info-box-content">
          <div className="info-box-title">Зачем нужны?</div>
          <p>
            <code>margin-left</code> в арабском (RTL) должен стать <code>margin-right</code>.
            Logical properties делают это автоматически!
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔄 Physical vs Logical</h3>
        </div>

        <table className="comparison-table">
          <thead>
            <tr>
              <th>Physical (старое)</th>
              <th>Logical (новое)</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>margin-left</code></td>
              <td><code>margin-inline-start</code></td>
              <td>Начало строки (left в LTR, right в RTL)</td>
            </tr>
            <tr>
              <td><code>margin-right</code></td>
              <td><code>margin-inline-end</code></td>
              <td>Конец строки</td>
            </tr>
            <tr>
              <td><code>margin-top</code></td>
              <td><code>margin-block-start</code></td>
              <td>Начало блока (обычно top)</td>
            </tr>
            <tr>
              <td><code>margin-bottom</code></td>
              <td><code>margin-block-end</code></td>
              <td>Конец блока</td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td><code>inline-size</code></td>
              <td>Размер по inline-оси</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>block-size</code></td>
              <td>Размер по block-оси</td>
            </tr>
            <tr>
              <td><code>top</code></td>
              <td><code>inset-block-start</code></td>
              <td>Для позиционирования</td>
            </tr>
            <tr>
              <td><code>border-left</code></td>
              <td><code>border-inline-start</code></td>
              <td>Граница в начале</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📝 Shorthand свойства</h3>
        </div>

        <CodeBlock 
          code={`/* Старый способ */
.card {
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}

/* Новый способ */
.card {
  margin-inline: 20px;    /* left + right */
  padding-block: 10px;    /* top + bottom */
}

/* inset — shorthand для позиционирования */
.overlay {
  /* Вместо top: 0; right: 0; bottom: 0; left: 0; */
  inset: 0;
  
  /* Или */
  inset-block: 10px;      /* top + bottom */
  inset-inline: 20px;     /* left + right */
}

/* Размеры */
.box {
  inline-size: 100%;      /* width */
  block-size: 200px;      /* height */
  
  max-inline-size: 600px; /* max-width */
  min-block-size: 100px;  /* min-height */
}`}
          title="📝 Примеры"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎮 Демо: LTR vs RTL</h3>
        </div>

        <div className="grid-2">
          <div>
            <h4 style={{ marginBottom: '12px' }}>LTR (English)</h4>
            <div 
              dir="ltr"
              style={{ 
                padding: '20px',
                background: 'var(--bg-code)',
                borderRadius: '8px',
                borderInlineStart: '4px solid var(--accent-css)'
              }}
            >
              <p style={{ marginBlockEnd: '12px' }}>Hello World!</p>
              <button style={{
                marginInlineStart: 'auto',
                display: 'block',
                padding: '8px 16px',
                background: 'var(--accent-css)',
                border: 'none',
                borderRadius: '4px',
                color: 'white'
              }}>
                Submit →
              </button>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '12px' }}>RTL (العربية)</h4>
            <div 
              dir="rtl"
              style={{ 
                padding: '20px',
                background: 'var(--bg-code)',
                borderRadius: '8px',
                borderInlineStart: '4px solid var(--accent-purple)'
              }}
            >
              <p style={{ marginBlockEnd: '12px' }}>مرحبا بالعالم!</p>
              <button style={{
                marginInlineStart: 'auto',
                display: 'block',
                padding: '8px 16px',
                background: 'var(--accent-purple)',
                border: 'none',
                borderRadius: '4px',
                color: 'white'
              }}>
                ← إرسال
              </button>
            </div>
          </div>
        </div>

        <CodeBlock 
          code={`.card {
  border-inline-start: 4px solid var(--accent);
  /* В LTR — слева, в RTL — справа */
}

.button {
  margin-inline-start: auto;
  /* В LTR — справа, в RTL — слева */
}`}
          title="📝 CSS"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">💡 Когда использовать</h3>
        </div>

        <div className="grid-2">
          <div className="info-box success">
            <span className="info-box-icon">✅</span>
            <div className="info-box-content">
              <div className="info-box-title">Используйте logical</div>
              <p>
                Для margin, padding, border по бокам. 
                Для text-align (start/end вместо left/right).
                Для позиционирования с inset.
              </p>
            </div>
          </div>

          <div className="info-box warning">
            <span className="info-box-icon">⚠️</span>
            <div className="info-box-content">
              <div className="info-box-title">Physical всё ещё OK</div>
              <p>
                Для декоративных элементов, теней, transforms — 
                где направление не должно меняться в RTL.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
