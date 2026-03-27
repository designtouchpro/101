import { useState } from 'react'
import CodeBlock from '@/components/CodeBlock'

export default function AspectRatio() {
  const [ratio, setRatio] = useState('16 / 9')

  const ratios = ['1 / 1', '4 / 3', '16 / 9', '21 / 9', '9 / 16']

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          📐 aspect-ratio
          <span className="year-badge">2021</span>
        </h1>
        <p>Соотношение сторон без padding-hack</p>
        <a 
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mdn-link"
        >
          📚 MDN: aspect-ratio
        </a>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🎬</span>
        <div className="info-box-content">
          <div className="info-box-title">Было vs Стало</div>
          <p>
            <strong>2012:</strong> <code>padding-top: 56.25%</code> + absolute positioning.{' '}
            <strong>Сейчас:</strong> <code>aspect-ratio: 16/9</code> — одна строка!
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎮 Интерактивное демо</h3>
        </div>

        <div className="control-grid">
          <div className="control-item">
            <label>aspect-ratio</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {ratios.map((r) => (
                <button
                  key={r}
                  onClick={() => setRatio(r)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    background: ratio === r ? 'var(--accent-css)' : 'var(--bg-code)',
                    color: ratio === r ? 'white' : 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <div style={{ flex: 1 }}>
            <h4 style={{ marginBottom: '12px' }}>Результат</h4>
            <div
              style={{
                aspectRatio: ratio.replace(' / ', '/'),
                background: 'linear-gradient(135deg, var(--accent-css), var(--accent-purple))',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                maxWidth: '400px'
              }}
            >
              {ratio}
            </div>
          </div>
        </div>

        <CodeBlock 
          code={`.video-container {
  aspect-ratio: ${ratio};
  width: 100%;
  max-width: 400px;
}`}
          title="📝 CSS"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🆚 Старый vs Новый способ</h3>
        </div>

        <div className="grid-2">
          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--accent-react)' }}>❌ 2012: Padding Hack</h4>
            <CodeBlock 
              code={`/* Ужас! */
.video-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 9/16 = 0.5625 */
  height: 0;
  overflow: hidden;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}`}
            />
          </div>

          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--accent-vue)' }}>✅ 2024: aspect-ratio</h4>
            <CodeBlock 
              code={`/* Красота! */
.video-wrapper {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.video-wrapper iframe {
  width: 100%;
  height: 100%;
}`}
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🖼️ Адаптивные изображения</h3>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px',
          marginBottom: '20px'
        }}>
          {['1 / 1', '4 / 3', '3 / 4', '16 / 9'].map((r) => (
            <div key={r}>
              <div
                style={{
                  aspectRatio: r.replace(' / ', '/'),
                  background: 'var(--bg-code)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  border: '2px dashed var(--border-color)'
                }}
              >
                📷 {r}
              </div>
            </div>
          ))}
        </div>

        <CodeBlock 
          code={`/* Квадратные аватары */
.avatar {
  aspect-ratio: 1;
  width: 64px;
  border-radius: 50%;
  object-fit: cover;
}

/* Карточки продуктов с одинаковыми картинками */
.product-image {
  aspect-ratio: 4 / 3;
  width: 100%;
  object-fit: cover;
}

/* Превью видео */
.video-thumb {
  aspect-ratio: 16 / 9;
}`}
          title="📝 Практические примеры"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎯 С intrinsic размерами</h3>
        </div>

        <div className="info-box">
          <span className="info-box-icon">💡</span>
          <div className="info-box-content">
            <div className="info-box-title">Важно знать</div>
            <p>
              Если у элемента есть <code>height</code> и <code>width</code>, 
              aspect-ratio игнорируется. Используйте <code>auto</code> для размера!
            </p>
          </div>
        </div>

        <CodeBlock 
          code={`/* aspect-ratio работает когда один из размеров auto */
.box {
  width: 200px;
  height: auto;
  aspect-ratio: 16 / 9; /* Высота вычислится автоматически */
}

/* С min/max — aspect-ratio учитывается */
.responsive {
  aspect-ratio: 1;
  width: 100%;
  max-width: 400px; /* Не нарушает соотношение */
}

/* auto + ratio — сохранить intrinsic ratio, но fallback */
img {
  aspect-ratio: auto 4 / 3;
  /* Использует соотношение картинки, или 4/3 пока грузится */
}`}
          title="📝 Взаимодействие с размерами"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎬 Популярные соотношения</h3>
        </div>

        <table className="comparison-table">
          <thead>
            <tr>
              <th>Ratio</th>
              <th>Использование</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>1 / 1</code></td>
              <td>Аватары, иконки приложений, Instagram посты</td>
            </tr>
            <tr>
              <td><code>4 / 3</code></td>
              <td>Старые мониторы, фото (DSLR default)</td>
            </tr>
            <tr>
              <td><code>16 / 9</code></td>
              <td>Видео (YouTube, TV), широкие мониторы</td>
            </tr>
            <tr>
              <td><code>21 / 9</code></td>
              <td>Ультраширокие мониторы, кино</td>
            </tr>
            <tr>
              <td><code>9 / 16</code></td>
              <td>Сторисы, Reels, TikTok, вертикальное видео</td>
            </tr>
            <tr>
              <td><code>3 / 2</code></td>
              <td>Классическое фото (35mm)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
