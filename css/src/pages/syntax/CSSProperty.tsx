import { useState } from 'react'
import CodeBlock from '@/components/CodeBlock'

export default function CSSProperty() {
  const [hue, setHue] = useState(250)
  const [progress, setProgress] = useState(65)

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          🎨 @property — Типизированные CSS переменные
          <span className="year-badge">2022</span>
        </h1>
        <p>Анимируйте CSS переменные и получите контроль над типами!</p>
      </div>

      {/* Problem */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">😩 Проблема: CSS переменные нельзя анимировать</h3>
        </div>

        <style>{`
          .no-anim-demo {
            --color: #667eea;
            padding: 20px;
            background: var(--color);
            color: white;
            border-radius: 8px;
            text-align: center;
            transition: --color 0.3s; /* Не работает! */
          }
          .no-anim-demo:hover {
            --color: #ef4444;
          }
        `}</style>

        <div className="no-anim-demo" style={{ marginBottom: '16px' }}>
          Hover me — переход НЕ работает 😢
        </div>

        <CodeBlock code={`.box {
  --color: blue;
  background: var(--color);
  transition: --color 0.3s; /* ❌ Не работает! */
}

.box:hover {
  --color: red;
  /* Цвет меняется МГНОВЕННО, без анимации */
}

/* Почему? Браузер не знает что --color это цвет,
   и не умеет интерполировать его значения */`} title="❌ Обычные CSS переменные" />
      </div>

      {/* Solution */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">✨ Решение: @property</h3>
        </div>

        <style>{`
          @property --prop-demo-color {
            syntax: '<color>';
            initial-value: #667eea;
            inherits: false;
          }
          
          .prop-anim-demo {
            --prop-demo-color: #667eea;
            padding: 20px;
            background: var(--prop-demo-color);
            color: white;
            border-radius: 8px;
            text-align: center;
            transition: --prop-demo-color 0.5s ease;
          }
          .prop-anim-demo:hover {
            --prop-demo-color: #ef4444;
          }
        `}</style>

        <div className="prop-anim-demo" style={{ marginBottom: '16px' }}>
          Hover me — плавный переход! ✨
        </div>

        <CodeBlock code={`/* Объявляем типизированную переменную */
@property --color {
  syntax: '<color>';        /* Тип: цвет */
  initial-value: blue;      /* Начальное значение */
  inherits: false;          /* Не наследовать */
}

.box {
  background: var(--color);
  transition: --color 0.5s; /* ✅ Теперь работает! */
}

.box:hover {
  --color: red;
  /* Плавный переход от blue к red */
}`} title="✅ @property позволяет анимировать" />
      </div>

      {/* Interactive Hue */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🌈 Интерактивно: Анимация Hue</h3>
        </div>

        <style>{`
          @property --prop-hue {
            syntax: '<number>';
            initial-value: 250;
            inherits: false;
          }
          
          .hue-demo-card {
            padding: 32px;
            background: oklch(65% 0.25 var(--prop-hue));
            color: white;
            border-radius: 16px;
            text-align: center;
            font-size: 1.5rem;
            font-weight: 600;
            transition: --prop-hue 0.5s ease;
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          }
        `}</style>

        <div 
          className="hue-demo-card"
          style={{ '--prop-hue': hue } as React.CSSProperties}
        >
          Hue: {hue}°
        </div>

        <div style={{ marginTop: '16px' }}>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
          {[0, 60, 120, 180, 250, 300].map(h => (
            <button
              key={h}
              onClick={() => setHue(h)}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                background: `oklch(65% 0.25 ${h})`,
                color: 'white',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              {h}°
            </button>
          ))}
        </div>

        <CodeBlock code={`@property --hue {
  syntax: '<number>';
  initial-value: 250;
  inherits: false;
}

.card {
  background: oklch(65% 0.25 var(--hue));
  transition: --hue 0.5s ease;
}

.card:hover {
  --hue: 30; /* Плавный переход по цветовому кругу */
}`} title="Анимация hue через @property" />
      </div>

      {/* Gradient Animation */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎨 Анимация градиента</h3>
        </div>

        <style>{`
          @property --grad-angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
          }
          
          @keyframes gradient-rotate {
            to { --grad-angle: 360deg; }
          }
          
          .gradient-anim-demo {
            padding: 40px;
            background: linear-gradient(
              var(--grad-angle),
              #667eea,
              #764ba2,
              #f472b6,
              #667eea
            );
            color: white;
            border-radius: 16px;
            text-align: center;
            font-size: 1.5rem;
            font-weight: 600;
            animation: gradient-rotate 3s linear infinite;
          }
        `}</style>

        <div className="gradient-anim-demo">
          Вращающийся градиент! 🌀
        </div>

        <CodeBlock code={`@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes rotate-gradient {
  to { --angle: 360deg; }
}

.animated-gradient {
  background: linear-gradient(
    var(--angle),
    #667eea,
    #764ba2,
    #f472b6,
    #667eea
  );
  animation: rotate-gradient 3s linear infinite;
}

/* Без @property градиенты нельзя анимировать! */`} title="Анимация угла градиента" />
      </div>

      {/* Progress bar */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📊 Прогресс-бар с анимацией</h3>
        </div>

        <style>{`
          @property --progress-val {
            syntax: '<percentage>';
            initial-value: 0%;
            inherits: false;
          }
          
          .progress-demo {
            height: 24px;
            background: var(--bg-code);
            border-radius: 12px;
            overflow: hidden;
            position: relative;
          }
          
          .progress-demo-bar {
            height: 100%;
            width: var(--progress-val);
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 12px;
            transition: --progress-val 0.5s ease;
            position: relative;
          }
          
          .progress-demo-bar::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,0.3),
              transparent
            );
            animation: shimmer 1.5s infinite;
          }
          
          @keyframes shimmer {
            from { transform: translateX(-100%); }
            to { transform: translateX(100%); }
          }
        `}</style>

        <div className="progress-demo" style={{ marginBottom: '16px' }}>
          <div 
            className="progress-demo-bar" 
            style={{ '--progress-val': `${progress}%` } as React.CSSProperties}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {[0, 25, 50, 75, 100].map(p => (
            <button
              key={p}
              onClick={() => setProgress(p)}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                background: progress === p ? 'var(--accent-vue)' : 'var(--bg-code)',
                color: progress === p ? 'white' : 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              {p}%
            </button>
          ))}
        </div>

        <CodeBlock code={`@property --progress {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}

.progress-bar {
  width: var(--progress);
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: --progress 0.5s ease;
}

/* В JS меняем CSS переменную */
element.style.setProperty('--progress', '75%');`} title="Анимированный прогресс-бар" />
      </div>

      {/* Syntax types */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📝 Доступные типы syntax</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid var(--border)' }}>Тип</th>
                <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid var(--border)' }}>Примеры значений</th>
                <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid var(--border)' }}>Пример использования</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: '<color>', examples: 'red, #fff, rgb()', use: 'Цвета, градиенты' },
                { type: '<length>', examples: '10px, 2rem, 50vh', use: 'Размеры, отступы' },
                { type: '<percentage>', examples: '50%, 100%', use: 'Прогресс-бары' },
                { type: '<number>', examples: '0, 1, 0.5, 360', use: 'Счётчики, hue' },
                { type: '<integer>', examples: '1, 2, 100', use: 'z-index, columns' },
                { type: '<angle>', examples: '45deg, 0.5turn', use: 'Вращение, градиенты' },
                { type: '<time>', examples: '200ms, 1s', use: 'Длительность' },
                { type: '<length-percentage>', examples: '10px, 50%', use: 'Универсальные размеры' },
                { type: '<transform-function>', examples: 'rotate(), scale()', use: 'Трансформации' },
                { type: '<image>', examples: 'url(), gradient', use: 'Фоны' },
                { type: '*', examples: 'любое', use: 'Универсальный (без анимации)' },
              ].map(row => (
                <tr key={row.type}>
                  <td style={{ padding: '12px', borderBottom: '1px solid var(--border)' }}>
                    <code style={{ background: 'var(--bg-code)', padding: '2px 6px', borderRadius: '4px' }}>
                      {row.type}
                    </code>
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                    {row.examples}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                    {row.use}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Multiple values */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">➕ Комбинированные типы</h3>
        </div>

        <CodeBlock code={`/* Список значений */
@property --colors {
  syntax: '<color>#';  /* # = список через запятую */
  initial-value: red, blue;
  inherits: false;
}

/* Одно из нескольких */
@property --size {
  syntax: '<length> | <percentage>';
  initial-value: 100%;
  inherits: false;
}

/* Комбинация */
@property --offset {
  syntax: '<length> <length>';  /* два значения */
  initial-value: 0px 0px;
  inherits: false;
}`} title="Сложные типы" />
      </div>

      {/* Glow effect */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">✨ Пример: Пульсирующее свечение</h3>
        </div>

        <style>{`
          @property --glow-spread {
            syntax: '<length>';
            initial-value: 10px;
            inherits: false;
          }
          
          @property --glow-opacity {
            syntax: '<number>';
            initial-value: 0.5;
            inherits: false;
          }
          
          @keyframes glow-pulse {
            0%, 100% {
              --glow-spread: 10px;
              --glow-opacity: 0.5;
            }
            50% {
              --glow-spread: 30px;
              --glow-opacity: 0.8;
            }
          }
          
          .glow-demo {
            padding: 24px 48px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 0 var(--glow-spread) rgba(102, 126, 234, var(--glow-opacity));
            animation: glow-pulse 2s ease-in-out infinite;
          }
        `}</style>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <button className="glow-demo">
            Pulsing Glow ✨
          </button>
        </div>

        <CodeBlock code={`@property --glow-spread {
  syntax: '<length>';
  initial-value: 10px;
  inherits: false;
}

@property --glow-opacity {
  syntax: '<number>';
  initial-value: 0.5;
  inherits: false;
}

@keyframes glow-pulse {
  0%, 100% {
    --glow-spread: 10px;
    --glow-opacity: 0.5;
  }
  50% {
    --glow-spread: 30px;
    --glow-opacity: 0.8;
  }
}

.button {
  box-shadow: 0 0 var(--glow-spread) 
              rgba(102, 126, 234, var(--glow-opacity));
  animation: glow-pulse 2s ease-in-out infinite;
}`} title="Анимация box-shadow через @property" />
      </div>

      {/* Browser support */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🌐 Поддержка браузеров</h3>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
          gap: '12px',
          marginBottom: '16px'
        }}>
          {[
            { name: 'Chrome', version: '85+', supported: true },
            { name: 'Firefox', version: '128+', supported: true },
            { name: 'Safari', version: '15.4+', supported: true },
            { name: 'Edge', version: '85+', supported: true },
          ].map(browser => (
            <div key={browser.name} style={{
              padding: '16px',
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: 600 }}>{browser.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--accent-vue)' }}>
                {browser.version}
              </div>
            </div>
          ))}
        </div>

        <div className="info-box">
          <span className="info-box-icon">✅</span>
          <div className="info-box-content">
            <div className="info-box-title">Отличная поддержка!</div>
            <p>@property работает во всех современных браузерах. Firefox добавил поддержку в 2024.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
