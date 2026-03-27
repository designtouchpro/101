import { useState } from 'react'
import CodeBlock from '@/components/CodeBlock'

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

export default function FlexboxGuide() {
  const [direction, setDirection] = useState<FlexDirection>('row')
  const [justify, setJustify] = useState<JustifyContent>('flex-start')
  const [alignItems, setAlignItems] = useState<AlignItems>('stretch')
  const [wrap, setWrap] = useState<FlexWrap>('nowrap')
  const [gap, setGap] = useState(16)
  const [itemCount, setItemCount] = useState(5)

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: alignItems,
    flexWrap: wrap,
    gap: `${gap}px`,
    minHeight: '300px',
    padding: '20px',
    background: 'var(--bg-code)',
    borderRadius: '12px',
    border: '2px solid var(--accent-css)',
    transition: 'all 0.3s ease'
  }

  const cssCode = `.container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${alignItems};
  flex-wrap: ${wrap};
  gap: ${gap}px;
}`

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          📦 Flexbox
          <span className="year-badge">2012-2014</span>
        </h1>
        <p>Одномерная система раскладки для распределения пространства между элементами</p>
        <a 
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mdn-link"
        >
          📚 MDN: Flexbox
        </a>
      </div>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">Flex = Flexible Box</div>
          <p>
            Flexbox работает в одном измерении: либо по строке (row), либо по колонке (column).
            Для двумерных раскладок используйте CSS Grid.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎮 Интерактивная песочница</h3>
          <span className="card-badge">Попробуй!</span>
        </div>

        {/* Interactive Demo */}
        <div style={containerStyles}>
          {Array.from({ length: itemCount }, (_, i) => (
            <div 
              key={i}
              className="flex-item"
              style={{
                background: `hsl(${220 + i * 30}, 70%, 50%)`,
                minWidth: '80px',
                padding: '20px 24px'
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex-controls" style={{ marginTop: '24px' }}>
          <div className="control-group">
            <label>flex-direction</label>
            <select value={direction} onChange={e => setDirection(e.target.value as FlexDirection)}>
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>

          <div className="control-group">
            <label>justify-content</label>
            <select value={justify} onChange={e => setJustify(e.target.value as JustifyContent)}>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </select>
          </div>

          <div className="control-group">
            <label>align-items</label>
            <select value={alignItems} onChange={e => setAlignItems(e.target.value as AlignItems)}>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="stretch">stretch</option>
              <option value="baseline">baseline</option>
            </select>
          </div>

          <div className="control-group">
            <label>flex-wrap</label>
            <select value={wrap} onChange={e => setWrap(e.target.value as FlexWrap)}>
              <option value="nowrap">nowrap</option>
              <option value="wrap">wrap</option>
              <option value="wrap-reverse">wrap-reverse</option>
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
              max="10" 
              value={itemCount}
              onChange={e => setItemCount(Number(e.target.value))}
            />
          </div>
        </div>

        <CodeBlock code={cssCode} title="📝 Сгенерированный CSS" />
      </div>

      {/* Main Axis vs Cross Axis */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📐 Главная vs Поперечная ось</h3>
        </div>

        <div className="info-box warning">
          <span className="info-box-icon">⚠️</span>
          <div className="info-box-content">
            <div className="info-box-title">Ключевое понимание</div>
            <p>
              <code>justify-content</code> работает вдоль главной оси (определяется flex-direction),
              а <code>align-items</code> — вдоль поперечной.
            </p>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '24px',
          marginTop: '16px'
        }}>
          <div style={{ padding: '20px', background: 'var(--bg-code)', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '12px', color: 'var(--accent-css-light)' }}>flex-direction: row</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span>→ Главная ось:</span>
              <span style={{ color: 'var(--accent-green)' }}>горизонталь</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>↓ Поперечная:</span>
              <span style={{ color: 'var(--accent-purple)' }}>вертикаль</span>
            </div>
          </div>
          <div style={{ padding: '20px', background: 'var(--bg-code)', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '12px', color: 'var(--accent-css-light)' }}>flex-direction: column</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span>↓ Главная ось:</span>
              <span style={{ color: 'var(--accent-green)' }}>вертикаль</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>→ Поперечная:</span>
              <span style={{ color: 'var(--accent-purple)' }}>горизонталь</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flex Item Properties */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎛️ Свойства flex-элементов</h3>
        </div>

        <CodeBlock 
          code={`.item {
  /* Начальный размер до растяжения/сжатия */
  flex-basis: 200px;   /* или auto, content, 0 */
  
  /* Как сильно элемент может расти */
  flex-grow: 1;        /* 0 = не растёт, 1+ = растёт */
  
  /* Как сильно элемент может сжиматься */
  flex-shrink: 1;      /* 0 = не сжимается */
  
  /* Shorthand: grow shrink basis */
  flex: 1;             /* = flex: 1 1 0% */
  flex: 0 0 200px;     /* = фиксированный 200px */
  flex: auto;          /* = flex: 1 1 auto */
  
  /* Индивидуальное выравнивание */
  align-self: center;  /* переопределяет align-items */
  
  /* Порядок отображения */
  order: -1;           /* меньше = раньше */
}`}
          title="📝 Свойства элементов"
        />

        <div className="info-box success" style={{ marginTop: '16px' }}>
          <span className="info-box-icon">✨</span>
          <div className="info-box-content">
            <div className="info-box-title">flex: 1 — самый полезный паттерн</div>
            <p>
              <code>flex: 1</code> означает "займи всё доступное пространство поровну с другими flex: 1 элементами".
              Идеально для равномерного распределения.
            </p>
          </div>
        </div>
      </div>

      {/* Common Patterns */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎯 Типичные паттерны</h3>
        </div>

        <div className="grid-2">
          <div>
            <h4 style={{ marginBottom: '12px' }}>Навигация с логотипом</h4>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              background: 'var(--bg-code)',
              borderRadius: '8px'
            }}>
              <span style={{ fontWeight: 700 }}>Logo</span>
              <nav style={{ display: 'flex', gap: '16px' }}>
                <span>Home</span>
                <span>About</span>
                <span>Contact</span>
              </nav>
            </div>
            <CodeBlock code={`nav { 
  display: flex;
  justify-content: space-between;
  align-items: center;
}`} />
          </div>

          <div>
            <h4 style={{ marginBottom: '12px' }}>Card footer справа</h4>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              height: '150px',
              padding: '16px',
              background: 'var(--bg-code)',
              borderRadius: '8px'
            }}>
              <div>Card content</div>
              <div style={{ marginTop: 'auto', color: 'var(--accent-css-light)' }}>Footer →</div>
            </div>
            <CodeBlock code={`.card { 
  display: flex;
  flex-direction: column;
}
.footer { margin-top: auto; }`} />
          </div>
        </div>
      </div>
    </div>
  )
}
