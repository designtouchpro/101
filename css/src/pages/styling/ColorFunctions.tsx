import { useState } from 'react'
import CodeBlock from '@/components/CodeBlock'

export default function ColorFunctions() {
  const [lightness, setLightness] = useState(50)
  const [chroma, setChroma] = useState(0.15)
  const [hue, setHue] = useState(250)
  const [mixPercent, setMixPercent] = useState(50)

  const oklchColor = `oklch(${lightness}% ${chroma} ${hue})`

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          🌈 Color Functions
          <span className="year-badge">2023</span>
        </h1>
        <p>oklch(), color-mix(), relative colors — новый уровень работы с цветом</p>
        <a 
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mdn-link"
        >
          📚 MDN: oklch()
        </a>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🎨</span>
        <div className="info-box-content">
          <div className="info-box-title">Почему oklch лучше HSL?</div>
          <p>
            HSL имеет проблему: цвета с одинаковой lightness выглядят по-разному яркими.
            Жёлтый 50% намного ярче синего 50%. oklch решает это — перцептивно равномерное пространство!
          </p>
        </div>
      </div>

      {/* oklch Interactive */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎮 oklch() — Интерактивный подбор</h3>
          <span className="card-badge">Новинка 2023!</span>
        </div>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 200px',
          gap: '24px',
          alignItems: 'start'
        }}>
          <div>
            <div className="color-slider">
              <div className="slider-row">
                <label>L (Lightness)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={lightness}
                  onChange={e => setLightness(Number(e.target.value))}
                />
                <span>{lightness}%</span>
              </div>
              <div className="slider-row">
                <label>C (Chroma)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="0.4" 
                  step="0.01"
                  value={chroma}
                  onChange={e => setChroma(Number(e.target.value))}
                />
                <span>{chroma.toFixed(2)}</span>
              </div>
              <div className="slider-row">
                <label>H (Hue)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  value={hue}
                  onChange={e => setHue(Number(e.target.value))}
                />
                <span>{hue}°</span>
              </div>
            </div>

            <div style={{ marginTop: '16px', padding: '12px', background: 'var(--bg-code)', borderRadius: '8px', fontFamily: 'Fira Code, monospace' }}>
              <code style={{ color: 'var(--text-primary)' }}>{oklchColor}</code>
            </div>
          </div>

          <div 
            style={{ 
              aspectRatio: '1',
              background: oklchColor,
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          />
        </div>

        <CodeBlock 
          code={`/* oklch(lightness chroma hue) */
.button {
  background: oklch(60% 0.15 250);
  
  /* С прозрачностью */
  background: oklch(60% 0.15 250 / 0.5);
}

/* Параметры:
   L: 0-100% (светлость)
   C: 0-0.4  (насыщенность) 
   H: 0-360  (тон)
*/`}
          title="📝 Синтаксис oklch()"
        />
      </div>

      {/* HSL vs oklch comparison */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">⚔️ HSL vs oklch — Сравнение яркости</h3>
        </div>

        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Все цвета имеют одинаковую "lightness" (50%), но выглядят по-разному:
        </p>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ marginBottom: '8px' }}>HSL (50% lightness)</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[0, 60, 120, 180, 240, 300].map(h => (
              <div 
                key={h}
                style={{ 
                  flex: 1,
                  height: '60px',
                  background: `hsl(${h} 100% 50%)`,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: h > 45 && h < 200 ? 'black' : 'white',
                  fontSize: '0.8rem'
                }}
              >
                {h}°
              </div>
            ))}
          </div>
          <p style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Жёлтый (60°) выглядит намного ярче синего (240°) при одинаковой lightness!
          </p>
        </div>

        <div>
          <h4 style={{ marginBottom: '8px' }}>oklch (65% lightness)</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[0, 60, 120, 180, 240, 300].map(h => (
              <div 
                key={h}
                style={{ 
                  flex: 1,
                  height: '60px',
                  background: `oklch(65% 0.2 ${h})`,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.8rem'
                }}
              >
                {h}°
              </div>
            ))}
          </div>
          <p style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Перцептивно одинаковая яркость! Все цвета выглядят равно светлыми.
          </p>
        </div>
      </div>

      {/* color-mix() */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔀 color-mix() — Смешивание цветов</h3>
        </div>

        <div className="control-group" style={{ maxWidth: '300px', marginBottom: '16px' }}>
          <label>Процент смешивания: {mixPercent}%</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={mixPercent}
            onChange={e => setMixPercent(Number(e.target.value))}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            background: '#264de4',
            borderRadius: '8px'
          }} />
          <span style={{ fontSize: '2rem' }}>+</span>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            background: '#ec4899',
            borderRadius: '8px'
          }} />
          <span style={{ fontSize: '2rem' }}>=</span>
          <div style={{ 
            width: '120px', 
            height: '80px', 
            background: `color-mix(in oklch, #264de4 ${mixPercent}%, #ec4899)`,
            borderRadius: '8px'
          }} />
        </div>

        <CodeBlock 
          code={`/* color-mix(in colorspace, color1 percent, color2) */
.mixed {
  /* 50% синего + 50% розового */
  background: color-mix(in oklch, #264de4, #ec4899);
  
  /* 70% синего + 30% розового */
  background: color-mix(in oklch, #264de4 70%, #ec4899);
  
  /* Можно в любом цветовом пространстве */
  background: color-mix(in srgb, red, blue);
  background: color-mix(in hsl, red, blue);
  background: color-mix(in oklch, red, blue);
}

/* Практический пример: hover состояния */
.button {
  --color: #264de4;
  background: var(--color);
}
.button:hover {
  /* Осветляем на 20% */
  background: color-mix(in oklch, var(--color), white 20%);
}`}
          title="📝 color-mix()"
        />
      </div>

      {/* Relative Colors */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔄 Relative Colors — Модификация цветов</h3>
          <span className="card-badge">Очень полезно!</span>
        </div>

        <div className="info-box success">
          <span className="info-box-icon">✨</span>
          <div className="info-box-content">
            <div className="info-box-title">Динамическая палитра!</div>
            <p>
              Relative colors позволяют создавать вариации цвета (светлее, темнее, прозрачнее)
              на основе исходного, без ручного подбора.
            </p>
          </div>
        </div>

        <CodeBlock 
          code={`:root {
  --brand: oklch(60% 0.15 250);
}

.button {
  background: var(--brand);
}

/* Светлее на 20% */
.button:hover {
  background: oklch(from var(--brand) calc(l + 0.2) c h);
}

/* Темнее */
.button:active {
  background: oklch(from var(--brand) calc(l - 0.1) c h);
}

/* Менее насыщенный */
.button:disabled {
  background: oklch(from var(--brand) l calc(c * 0.3) h);
}

/* Полупрозрачный */
.overlay {
  background: oklch(from var(--brand) l c h / 0.5);
}

/* Комплементарный цвет (противоположный на круге) */
.accent {
  background: oklch(from var(--brand) l c calc(h + 180));
}`}
          title="📝 Relative Color Syntax"
        />

        <div style={{ marginTop: '16px' }}>
          <h4 style={{ marginBottom: '12px' }}>Пример палитры из одного цвета:</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ flex: 1, padding: '20px', background: 'oklch(30% 0.15 250)', borderRadius: '8px', color: 'white', textAlign: 'center', fontSize: '0.8rem' }}>
              L: 30%
            </div>
            <div style={{ flex: 1, padding: '20px', background: 'oklch(45% 0.15 250)', borderRadius: '8px', color: 'white', textAlign: 'center', fontSize: '0.8rem' }}>
              L: 45%
            </div>
            <div style={{ flex: 1, padding: '20px', background: 'oklch(60% 0.15 250)', borderRadius: '8px', color: 'white', textAlign: 'center', fontSize: '0.8rem' }}>
              L: 60% (base)
            </div>
            <div style={{ flex: 1, padding: '20px', background: 'oklch(75% 0.15 250)', borderRadius: '8px', color: 'black', textAlign: 'center', fontSize: '0.8rem' }}>
              L: 75%
            </div>
            <div style={{ flex: 1, padding: '20px', background: 'oklch(90% 0.15 250)', borderRadius: '8px', color: 'black', textAlign: 'center', fontSize: '0.8rem' }}>
              L: 90%
            </div>
          </div>
        </div>
      </div>

      {/* Color spaces comparison */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📊 Цветовые пространства</h3>
        </div>

        <table className="comparison-table">
          <thead>
            <tr>
              <th>Формат</th>
              <th>Синтаксис</th>
              <th>Когда использовать</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>rgb()</code></td>
              <td>rgb(255 100 50)</td>
              <td>Классика, широко поддерживается</td>
            </tr>
            <tr>
              <td><code>hsl()</code></td>
              <td>hsl(20 100% 60%)</td>
              <td>Интуитивнее для подбора цвета</td>
            </tr>
            <tr>
              <td><code>oklch()</code></td>
              <td>oklch(70% 0.15 50)</td>
              <td>Перцептивно равномерные палитры</td>
            </tr>
            <tr>
              <td><code>oklab()</code></td>
              <td>oklab(70% 0.1 0.1)</td>
              <td>Смешивание цветов</td>
            </tr>
            <tr>
              <td><code>display-p3</code></td>
              <td>color(display-p3 1 0.5 0)</td>
              <td>Широкий цветовой охват (HDR)</td>
            </tr>
          </tbody>
        </table>

        <div className="info-box" style={{ marginTop: '16px' }}>
          <span className="info-box-icon">💡</span>
          <div className="info-box-content">
            <div className="info-box-title">Рекомендация</div>
            <p>
              Для новых проектов используйте <code>oklch()</code> — 
              лучшая читаемость, перцептивная равномерность и поддержка wide-gamut цветов.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
