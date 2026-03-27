import { useState } from 'react'
import CodeBlock from '@/components/CodeBlock'

export default function GridGuide() {
  const [columns, setColumns] = useState('1fr 1fr 1fr')
  const [rows, setRows] = useState('auto auto')
  const [gap, setGap] = useState(16)
  const [itemCount, setItemCount] = useState(6)
  const [showLines, setShowLines] = useState(true)

  const containerStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
    gap: `${gap}px`,
    minHeight: '300px',
    padding: '20px',
    background: 'var(--bg-code)',
    borderRadius: '12px',
    border: '2px solid var(--accent-css)',
    position: 'relative'
  }

  const cssCode = `.container {
  display: grid;
  grid-template-columns: ${columns};
  grid-template-rows: ${rows};
  gap: ${gap}px;
}`

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          🔲 CSS Grid
          <span className="year-badge">2017</span>
        </h1>
        <p>Двумерная система раскладки — строки И колонки одновременно</p>
        <a 
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mdn-link"
        >
          📚 MDN: CSS Grid
        </a>
      </div>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">Grid vs Flexbox</div>
          <p>
            Flexbox — для распределения элементов в одном направлении. 
            Grid — для создания сложных двумерных макетов. Часто используют вместе!
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎮 Интерактивная песочница</h3>
          <span className="card-badge">Попробуй!</span>
        </div>

        <div style={containerStyles}>
          {Array.from({ length: itemCount }, (_, i) => (
            <div 
              key={i}
              className="grid-item"
              style={{
                background: `hsl(${260 + i * 25}, 70%, 50%)`
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="flex-controls" style={{ marginTop: '24px' }}>
          <div className="control-group">
            <label>grid-template-columns</label>
            <select value={columns} onChange={e => setColumns(e.target.value)}>
              <option value="1fr 1fr 1fr">1fr 1fr 1fr</option>
              <option value="1fr 2fr 1fr">1fr 2fr 1fr</option>
              <option value="repeat(3, 1fr)">repeat(3, 1fr)</option>
              <option value="repeat(auto-fill, minmax(150px, 1fr))">auto-fill, minmax(150px, 1fr)</option>
              <option value="repeat(auto-fit, minmax(150px, 1fr))">auto-fit, minmax(150px, 1fr)</option>
              <option value="100px 1fr 100px">100px 1fr 100px</option>
              <option value="1fr">1fr (1 column)</option>
            </select>
          </div>

          <div className="control-group">
            <label>grid-template-rows</label>
            <select value={rows} onChange={e => setRows(e.target.value)}>
              <option value="auto auto">auto auto</option>
              <option value="100px 100px">100px 100px</option>
              <option value="1fr 1fr">1fr 1fr</option>
              <option value="min-content max-content">min-content max-content</option>
            </select>
          </div>

          <div className="control-group">
            <label>gap: {gap}px</label>
            <input 
              type="range" 
              min="0" 
              max="48" 
              value={gap}
              onChange={e => setGap(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Items: {itemCount}</label>
            <input 
              type="range" 
              min="1" 
              max="12" 
              value={itemCount}
              onChange={e => setItemCount(Number(e.target.value))}
            />
          </div>
        </div>

        <CodeBlock code={cssCode} title="📝 Сгенерированный CSS" />
      </div>

      {/* fr unit explanation */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📏 Единица fr (fraction)</h3>
        </div>

        <div className="info-box success">
          <span className="info-box-icon">✨</span>
          <div className="info-box-content">
            <div className="info-box-title">fr = доля свободного пространства</div>
            <p>
              <code>1fr 2fr 1fr</code> означает: первый и третий столбцы получат по 1 части,
              средний — 2 части. Всего 4 части, средний = 50% ширины.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '8px', marginBottom: '16px' }}>
            <div style={{ padding: '12px', background: 'var(--accent-purple)', borderRadius: '8px', textAlign: 'center', color: 'white' }}>1fr</div>
            <div style={{ padding: '12px', background: 'var(--accent-css)', borderRadius: '8px', textAlign: 'center', color: 'white' }}>2fr</div>
            <div style={{ padding: '12px', background: 'var(--accent-purple)', borderRadius: '8px', textAlign: 'center', color: 'white' }}>1fr</div>
          </div>
        </div>
      </div>

      {/* auto-fill vs auto-fit */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔄 auto-fill vs auto-fit</h3>
          <span className="card-badge">Важно!</span>
        </div>

        <CodeBlock 
          code={`/* auto-fill: создаёт "пустые" колонки */
grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

/* auto-fit: схлопывает пустые колонки */
grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));`}
          title="📝 Разница"
        />

        <div className="grid-2" style={{ marginTop: '16px' }}>
          <div>
            <h4 style={{ marginBottom: '8px' }}>auto-fill (2 items)</h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '8px',
              padding: '16px',
              background: 'var(--bg-code)',
              borderRadius: '8px'
            }}>
              <div style={{ padding: '16px', background: 'var(--accent-css)', borderRadius: '8px', color: 'white', textAlign: 'center' }}>1</div>
              <div style={{ padding: '16px', background: 'var(--accent-css)', borderRadius: '8px', color: 'white', textAlign: 'center' }}>2</div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
              Элементы не растягиваются на всю ширину
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '8px' }}>auto-fit (2 items)</h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '8px',
              padding: '16px',
              background: 'var(--bg-code)',
              borderRadius: '8px'
            }}>
              <div style={{ padding: '16px', background: 'var(--accent-purple)', borderRadius: '8px', color: 'white', textAlign: 'center' }}>1</div>
              <div style={{ padding: '16px', background: 'var(--accent-purple)', borderRadius: '8px', color: 'white', textAlign: 'center' }}>2</div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
              Элементы занимают всё пространство
            </p>
          </div>
        </div>
      </div>

      {/* Grid Areas */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🗺️ Grid Areas — именованные области</h3>
        </div>

        <div className="grid-2">
          <div>
            <CodeBlock 
              code={`.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }`}
              title="📝 CSS"
            />
          </div>
          <div>
            <div style={{
              display: 'grid',
              gridTemplateAreas: `"header header header" "sidebar main main" "footer footer footer"`,
              gridTemplateColumns: '80px 1fr 1fr',
              gridTemplateRows: '40px 1fr 40px',
              gap: '8px',
              height: '250px',
              padding: '16px',
              background: 'var(--bg-code)',
              borderRadius: '8px'
            }}>
              <div style={{ gridArea: 'header', background: 'var(--accent-css)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>Header</div>
              <div style={{ gridArea: 'sidebar', background: 'var(--accent-purple)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>Side</div>
              <div style={{ gridArea: 'main', background: 'var(--accent-pink)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>Main</div>
              <div style={{ gridArea: 'footer', background: 'var(--accent-orange)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>Footer</div>
            </div>
          </div>
        </div>
      </div>

      {/* Positioning items */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📍 Позиционирование элементов</h3>
        </div>

        <CodeBlock 
          code={`.item {
  /* По линиям (line-based) */
  grid-column: 1 / 3;      /* от линии 1 до линии 3 */
  grid-row: 1 / 2;
  
  /* Shorthand */
  grid-column: span 2;     /* занять 2 колонки */
  grid-row: span 3;        /* занять 3 ряда */
  
  /* grid-area shorthand */
  grid-area: 1 / 1 / 3 / 4;  /* row-start / col-start / row-end / col-end */
  
  /* Выравнивание внутри ячейки */
  justify-self: center;    /* горизонтально */
  align-self: center;      /* вертикально */
  place-self: center;      /* оба сразу */
}`}
          title="📝 Свойства элементов"
        />

        <div style={{ marginTop: '16px' }}>
          <h4 style={{ marginBottom: '12px' }}>Пример: элемент на 2 колонки</h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            padding: '16px',
            background: 'var(--bg-code)',
            borderRadius: '8px'
          }}>
            <div style={{ gridColumn: 'span 2', padding: '20px', background: 'var(--accent-css)', borderRadius: '8px', color: 'white', textAlign: 'center', fontWeight: 600 }}>grid-column: span 2</div>
            <div style={{ padding: '20px', background: 'var(--accent-purple)', borderRadius: '8px', color: 'white', textAlign: 'center' }}>3</div>
            <div style={{ padding: '20px', background: 'var(--accent-pink)', borderRadius: '8px', color: 'white', textAlign: 'center' }}>4</div>
            <div style={{ padding: '20px', background: 'var(--accent-orange)', borderRadius: '8px', color: 'white', textAlign: 'center' }}>5</div>
            <div style={{ padding: '20px', background: 'var(--accent-green)', borderRadius: '8px', color: 'white', textAlign: 'center' }}>6</div>
          </div>
        </div>
      </div>
    </div>
  )
}
