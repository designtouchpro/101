import { useState } from 'react'
import CodeBlock from '@/components/CodeBlock'

export default function ScrollSnap() {
  const [snapType, setSnapType] = useState<'x mandatory' | 'x proximity' | 'y mandatory'>('x mandatory')

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          📜 Scroll Snap
          <span className="year-badge">2019</span>
        </h1>
        <p>Нативные карусели и галереи без JavaScript</p>
        <a 
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mdn-link"
        >
          📚 MDN: Scroll Snap
        </a>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🎯</span>
        <div className="info-box-content">
          <div className="info-box-title">Было vs Стало</div>
          <p>
            <strong>2012:</strong> jQuery плагины для каруселей (Slick, Owl). <strong>Сейчас:</strong> Две строки CSS!
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎮 Интерактивная карусель</h3>
        </div>

        <div className="control-grid">
          <div className="control-item">
            <label>scroll-snap-type</label>
            <select 
              value={snapType}
              onChange={(e) => setSnapType(e.target.value as typeof snapType)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                background: 'var(--bg-code)',
                border: '1px solid var(--border-color)',
                color: 'inherit'
              }}
            >
              <option value="x mandatory">x mandatory</option>
              <option value="x proximity">x proximity</option>
              <option value="y mandatory">y mandatory</option>
            </select>
          </div>
        </div>

        {snapType.startsWith('x') ? (
          <div
            style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              scrollSnapType: snapType,
              padding: '20px',
              background: 'var(--bg-code)',
              borderRadius: '8px',
              scrollPaddingInline: '20px'
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                style={{
                  flexShrink: 0,
                  width: '280px',
                  height: '180px',
                  background: `linear-gradient(135deg, 
                    hsl(${n * 50}, 70%, 50%), 
                    hsl(${n * 50 + 30}, 70%, 40%)
                  )`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '48px',
                  fontWeight: 'bold',
                  scrollSnapAlign: 'start'
                }}
              >
                {n}
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              height: '300px',
              overflowY: 'auto',
              scrollSnapType: snapType,
              padding: '20px',
              background: 'var(--bg-code)',
              borderRadius: '8px',
              scrollPaddingBlock: '20px'
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                style={{
                  flexShrink: 0,
                  height: '100px',
                  background: `linear-gradient(135deg, 
                    hsl(${n * 50}, 70%, 50%), 
                    hsl(${n * 50 + 30}, 70%, 40%)
                  )`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  scrollSnapAlign: 'start'
                }}
              >
                Section {n}
              </div>
            ))}
          </div>
        )}

        <CodeBlock 
          code={`.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: ${snapType};
  scroll-padding-inline: 20px; /* Отступ для snap */
  gap: 16px;
}

.slide {
  flex-shrink: 0;
  width: 280px;
  scroll-snap-align: start; /* или center, end */
}`}
          title="📝 CSS"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🧲 mandatory vs proximity</h3>
        </div>

        <div className="grid-2">
          <div className="info-box">
            <span className="info-box-icon">🔒</span>
            <div className="info-box-content">
              <div className="info-box-title">mandatory</div>
              <p>
                Всегда прикрепляется к snap-точке после скролла.
                Идеально для галерей и пошаговых форм.
              </p>
            </div>
          </div>

          <div className="info-box">
            <span className="info-box-icon">🎯</span>
            <div className="info-box-content">
              <div className="info-box-title">proximity</div>
              <p>
                Прикрепляется только если близко к snap-точке.
                Лучше для длинного контента, не мешает скроллу.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📍 scroll-snap-align</h3>
        </div>

        <div 
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '20px'
          }}
        >
          {(['start', 'center', 'end'] as const).map((align) => (
            <div key={align}>
              <h4 style={{ marginBottom: '8px', textAlign: 'center' }}>{align}</h4>
              <div
                style={{
                  width: '200px',
                  height: '150px',
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  display: 'flex',
                  gap: '8px',
                  padding: '8px',
                  background: 'var(--bg-code)',
                  borderRadius: '8px'
                }}
              >
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    style={{
                      flexShrink: 0,
                      width: '120px',
                      height: '100%',
                      background: `var(--accent-${n === 1 ? 'css' : n === 2 ? 'purple' : 'vue'})`,
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      scrollSnapAlign: align
                    }}
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <CodeBlock 
          code={`/* Куда "прилипает" элемент */
.slide {
  scroll-snap-align: start;  /* К началу контейнера */
  scroll-snap-align: center; /* По центру */
  scroll-snap-align: end;    /* К концу */
}

/* Можно указать для обеих осей */
.slide {
  scroll-snap-align: center start; /* block inline */
}`}
          title="📝 Варианты"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎨 Практический пример: Image Gallery</h3>
        </div>

        <CodeBlock 
          code={`.gallery {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain; /* Не скроллить родителя */
  
  /* Убираем скроллбар */
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.gallery img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  scroll-snap-align: start;
}

/* Full-page sections */
.page-section {
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always; /* Не пролетать секции */
}

body {
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}`}
          title="📝 Галерея и full-page scroll"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">⚡ scroll-snap-stop</h3>
        </div>

        <div className="info-box warning">
          <span className="info-box-icon">⚠️</span>
          <div className="info-box-content">
            <div className="info-box-title">scroll-snap-stop: always</div>
            <p>
              Предотвращает "пролетание" элементов при быстром свайпе.
              Полезно для пошаговых форм, где нужно остановиться на каждом шаге.
            </p>
          </div>
        </div>

        <CodeBlock 
          code={`.step {
  scroll-snap-align: start;
  scroll-snap-stop: always; /* Обязательно остановиться */
}`}
          title="📝 CSS"
        />
      </div>
    </div>
  )
}
