import { useState } from 'react'
import CodeBlock from '@/components/CodeBlock'

export default function ColorSyntax() {
  const [r, setR] = useState(102)
  const [g, setG] = useState(126)
  const [b, setB] = useState(234)
  const [a, setA] = useState(100)

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          🌈 Новый синтаксис цветов
          <span className="year-badge">2021+</span>
        </h1>
        <p>rgb(), hsl(), oklch() — без запятых, с / для прозрачности!</p>
      </div>

      {/* Old vs New */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔄 Старый vs Новый синтаксис</h3>
        </div>

        <div className="grid-2">
          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--accent-react)' }}>❌ Старый (до 2021)</h4>
            <CodeBlock code={`/* RGB с запятыми */
rgb(255, 0, 0)
rgba(255, 0, 0, 0.5)

/* HSL с запятыми */
hsl(120, 100%, 50%)
hsla(120, 100%, 50%, 0.5)

/* Разные функции для alpha! */`} />
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--accent-vue)' }}>✅ Новый (2021+)</h4>
            <CodeBlock code={`/* RGB без запятых */
rgb(255 0 0)
rgb(255 0 0 / 50%)

/* HSL без запятых */
hsl(120 100% 50%)
hsl(120 100% 50% / 50%)

/* Единый синтаксис! */`} />
          </div>
        </div>
      </div>

      {/* Interactive RGB */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎮 Интерактивно: rgb() новый синтаксис</h3>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div 
            style={{
              padding: '40px',
              background: `rgb(${r} ${g} ${b} / ${a}%)`,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 600,
              fontSize: '1.25rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              minHeight: '150px'
            }}
          >
            Preview
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#ef4444' }}>R:</span>
                <span>{r}</span>
              </label>
              <input type="range" min="0" max="255" value={r} onChange={e => setR(+e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#10b981' }}>G:</span>
                <span>{g}</span>
              </label>
              <input type="range" min="0" max="255" value={g} onChange={e => setG(+e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#3b82f6' }}>B:</span>
                <span>{b}</span>
              </label>
              <input type="range" min="0" max="255" value={b} onChange={e => setB(+e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Alpha:</span>
                <span>{a}%</span>
              </label>
              <input type="range" min="0" max="100" value={a} onChange={e => setA(+e.target.value)} style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        <div style={{ 
          padding: '16px', 
          background: 'var(--bg-code)', 
          borderRadius: '8px', 
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          <div style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>Новый синтаксис:</div>
          <code style={{ color: 'var(--accent-vue)' }}>
            rgb({r} {g} {b}{a < 100 ? ` / ${a}%` : ''})
          </code>
          
          <div style={{ marginTop: '16px', marginBottom: '8px', color: 'var(--text-secondary)' }}>Старый синтаксис:</div>
          <code style={{ color: 'var(--accent-react)' }}>
            {a < 100 
              ? `rgba(${r}, ${g}, ${b}, ${(a/100).toFixed(2)})`
              : `rgb(${r}, ${g}, ${b})`
            }
          </code>
        </div>
      </div>

      {/* All functions */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📝 Все цветовые функции</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid var(--border)' }}>Функция</th>
                <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid var(--border)' }}>Старый</th>
                <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid var(--border)' }}>Новый</th>
                <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid var(--border)' }}>Пример</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  fn: 'rgb()', 
                  old: 'rgb(r, g, b)', 
                  new_: 'rgb(r g b)', 
                  color: 'rgb(255 100 50)' 
                },
                { 
                  fn: 'rgb() + alpha', 
                  old: 'rgba(r, g, b, a)', 
                  new_: 'rgb(r g b / a)', 
                  color: 'rgb(255 100 50 / 70%)' 
                },
                { 
                  fn: 'hsl()', 
                  old: 'hsl(h, s%, l%)', 
                  new_: 'hsl(h s% l%)', 
                  color: 'hsl(200 80% 50%)' 
                },
                { 
                  fn: 'hsl() + alpha', 
                  old: 'hsla(h, s%, l%, a)', 
                  new_: 'hsl(h s% l% / a)', 
                  color: 'hsl(200 80% 50% / 70%)' 
                },
                { 
                  fn: 'hwb()', 
                  old: '—', 
                  new_: 'hwb(h w% b%)', 
                  color: 'hwb(150 20% 10%)' 
                },
                { 
                  fn: 'lab()', 
                  old: '—', 
                  new_: 'lab(L a b)', 
                  color: 'lab(60% -30 50)' 
                },
                { 
                  fn: 'lch()', 
                  old: '—', 
                  new_: 'lch(L C H)', 
                  color: 'lch(60% 80 150)' 
                },
                { 
                  fn: 'oklch()', 
                  old: '—', 
                  new_: 'oklch(L C H)', 
                  color: 'oklch(70% 0.2 250)' 
                },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '12px', borderBottom: '1px solid var(--border)', fontWeight: 500 }}>
                    {row.fn}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid var(--border)' }}>
                    <code style={{ fontSize: '12px' }}>{row.old}</code>
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid var(--border)' }}>
                    <code style={{ fontSize: '12px', color: 'var(--accent-vue)' }}>{row.new_}</code>
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ 
                      width: '60px', 
                      height: '30px', 
                      background: row.color, 
                      borderRadius: '4px',
                      border: '1px solid var(--border)'
                    }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Percentage values */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📊 Проценты вместо чисел</h3>
        </div>

        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          В новом синтаксисе можно использовать проценты для rgb():
        </p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ 
            padding: '20px 30px', 
            background: 'rgb(100% 0% 0%)',
            color: 'white',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            rgb(100% 0% 0%)
          </div>
          <div style={{ 
            padding: '20px 30px', 
            background: 'rgb(0% 100% 50%)',
            color: 'white',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            rgb(0% 100% 50%)
          </div>
          <div style={{ 
            padding: '20px 30px', 
            background: 'rgb(50% 50% 100%)',
            color: 'white',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            rgb(50% 50% 100%)
          </div>
        </div>

        <CodeBlock code={`/* Проценты в rgb() — новая возможность! */
rgb(100% 0% 0%)      /* = rgb(255 0 0) */
rgb(0% 50% 100%)     /* = rgb(0 128 255) */

/* Можно смешивать с alpha */
rgb(100% 50% 0% / 50%)

/* 100% = 255, 50% = 128, 0% = 0 */`} title="Проценты в rgb()" />
      </div>

      {/* none keyword */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🚫 Ключевое слово none</h3>
        </div>

        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Можно использовать <code>none</code> для "отсутствия" компонента — полезно для color-mix():
        </p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ 
            padding: '20px 30px', 
            background: 'hsl(none 100% 50%)',
            color: 'white',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            hsl(none 100% 50%)
          </div>
          <div style={{ 
            padding: '20px 30px', 
            background: 'oklch(70% none 250)',
            color: 'white',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            oklch(70% none 250)
          </div>
        </div>

        <CodeBlock code={`/* none = компонент не определён */
hsl(none 100% 50%)    /* Без оттенка = серый */
oklch(70% none 250)   /* Без насыщенности */

/* Полезно при color-mix() */
color-mix(
  in oklch,
  oklch(70% 0.2 30),
  oklch(none none 200)  /* Только изменить hue */
)`} title="Ключевое слово none" />
      </div>

      {/* Relative colors */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔄 Relative Color Syntax</h3>
        </div>

        <style>{`
          .rel-color-demo {
            --base: oklch(60% 0.2 250);
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 8px;
          }
          .rel-color-demo > div {
            padding: 16px;
            border-radius: 8px;
            color: white;
            text-align: center;
            font-size: 12px;
            font-family: monospace;
          }
        `}</style>

        <div className="rel-color-demo" style={{ marginBottom: '16px' }}>
          <div style={{ background: 'oklch(60% 0.2 250)' }}>Base</div>
          <div style={{ background: 'oklch(from oklch(60% 0.2 250) calc(l + 0.2) c h)' }}>Lighter</div>
          <div style={{ background: 'oklch(from oklch(60% 0.2 250) calc(l - 0.2) c h)' }}>Darker</div>
          <div style={{ background: 'oklch(from oklch(60% 0.2 250) l c calc(h + 60))' }}>+60° Hue</div>
          <div style={{ background: 'oklch(from oklch(60% 0.2 250) l 0.3 h)' }}>More sat</div>
        </div>

        <CodeBlock code={`/* Relative colors — модификация существующего цвета */
--base: oklch(60% 0.2 250);

/* Светлее */
oklch(from var(--base) calc(l + 0.2) c h)

/* Темнее */
oklch(from var(--base) calc(l - 0.2) c h)

/* Сдвиг оттенка на 60° */
oklch(from var(--base) l c calc(h + 60))

/* Больше насыщенности */
oklch(from var(--base) l 0.3 h)

/* Полупрозрачная версия */
oklch(from var(--base) l c h / 50%)

/* from <color> — берёт компоненты l, c, h из цвета */`} title="Relative Color Syntax" />

        <div className="info-box" style={{ marginTop: '16px' }}>
          <span className="info-box-icon">🔥</span>
          <div className="info-box-content">
            <div className="info-box-title">Мощная фича!</div>
            <p>
              Relative colors позволяют создавать палитры на лету: 
              светлые/тёмные варианты, hover состояния, и т.д. — всё из одного базового цвета!
            </p>
          </div>
        </div>
      </div>

      {/* Practical example: Button palette */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎨 Практика: Палитра кнопки</h3>
        </div>

        <style>{`
          .color-btn-demo {
            --btn-base: oklch(55% 0.25 250);
            padding: 12px 24px;
            font-size: 16px;
            font-weight: 600;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            background: var(--btn-base);
            color: white;
            transition: all 0.2s;
          }
          .color-btn-demo:hover {
            background: oklch(from var(--btn-base) calc(l + 0.1) c h);
          }
          .color-btn-demo:active {
            background: oklch(from var(--btn-base) calc(l - 0.1) c h);
          }
          
          .color-btn-green {
            --btn-base: oklch(55% 0.2 150);
          }
          .color-btn-red {
            --btn-base: oklch(55% 0.25 30);
          }
        `}</style>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button className="color-btn-demo">Default</button>
          <button className="color-btn-demo color-btn-green">Success</button>
          <button className="color-btn-demo color-btn-red">Danger</button>
        </div>

        <CodeBlock code={`.button {
  --base: oklch(55% 0.25 250);
  background: var(--base);
  color: white;
}

.button:hover {
  /* Светлее на 10% */
  background: oklch(from var(--base) calc(l + 0.1) c h);
}

.button:active {
  /* Темнее на 10% */
  background: oklch(from var(--base) calc(l - 0.1) c h);
}

/* Варианты — просто меняем hue! */
.button--success { --base: oklch(55% 0.2 150); }
.button--danger { --base: oklch(55% 0.25 30); }

/* Один CSS — вся палитра автоматически! */`} title="Автоматические hover/active состояния" />
      </div>

      {/* color-mix comparison */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🆚 Relative Colors vs color-mix()</h3>
        </div>

        <div className="grid-2">
          <div>
            <h4 style={{ marginBottom: '12px' }}>color-mix()</h4>
            <CodeBlock code={`/* Смешивание двух цветов */
color-mix(in oklch, blue, white 30%)

/* Осветление через смешивание */
color-mix(in oklch, var(--base), white 20%)

/* Затемнение */
color-mix(in oklch, var(--base), black 20%)`} />
          </div>
          <div>
            <h4 style={{ marginBottom: '12px' }}>Relative colors</h4>
            <CodeBlock code={`/* Прямое изменение компонентов */
oklch(from blue l c h / 50%)

/* Осветление через lightness */
oklch(from var(--base) calc(l + 0.2) c h)

/* Затемнение */
oklch(from var(--base) calc(l - 0.2) c h)`} />
          </div>
        </div>

        <div className="info-box" style={{ marginTop: '16px' }}>
          <span className="info-box-icon">💡</span>
          <div className="info-box-content">
            <div className="info-box-title">Когда что использовать?</div>
            <p>
              <strong>color-mix()</strong> — для смешивания двух цветов (типа полупрозрачный overlay).<br/>
              <strong>Relative colors</strong> — для модификации одного цвета (светлее, темнее, другой оттенок).
            </p>
          </div>
        </div>
      </div>

      {/* Browser support */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🌐 Поддержка браузеров</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border)' }}>Фича</th>
                <th style={{ textAlign: 'center', padding: '10px', borderBottom: '2px solid var(--border)' }}>Chrome</th>
                <th style={{ textAlign: 'center', padding: '10px', borderBottom: '2px solid var(--border)' }}>Firefox</th>
                <th style={{ textAlign: 'center', padding: '10px', borderBottom: '2px solid var(--border)' }}>Safari</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'rgb() без запятых', chrome: '65+', firefox: '52+', safari: '12.1+' },
                { feature: 'hsl() без запятых', chrome: '65+', firefox: '52+', safari: '12.1+' },
                { feature: 'hwb()', chrome: '101+', firefox: '96+', safari: '15+' },
                { feature: 'lab() / lch()', chrome: '111+', firefox: '113+', safari: '15+' },
                { feature: 'oklch()', chrome: '111+', firefox: '113+', safari: '15.4+' },
                { feature: 'color-mix()', chrome: '111+', firefox: '113+', safari: '16.2+' },
                { feature: 'Relative colors', chrome: '119+', firefox: '128+', safari: '16.4+' },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>{row.feature}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border)', textAlign: 'center', color: 'var(--accent-vue)' }}>{row.chrome}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border)', textAlign: 'center', color: 'var(--accent-vue)' }}>{row.firefox}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border)', textAlign: 'center', color: 'var(--accent-vue)' }}>{row.safari}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
