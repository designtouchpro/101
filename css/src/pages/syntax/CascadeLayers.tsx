import { useState } from 'react'
import CodeBlock from '@/components/CodeBlock'

export default function CascadeLayers() {
  const [layerOrder, setLayerOrder] = useState<'abc' | 'cba'>('abc')

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          📚 @layer — Cascade Layers
          <span className="year-badge">2022</span>
        </h1>
        <p>Контролируйте приоритет стилей без войны специфичности!</p>
      </div>

      {/* Problem */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">😩 Проблема: Война специфичности</h3>
        </div>

        <style>{`
          .specificity-demo {
            padding: 16px 24px;
            border-radius: 8px;
            font-weight: 600;
            text-align: center;
          }
          /* Framework styles */
          .specificity-demo.btn { background: #ccc; color: #333; }
          /* Your styles - need MORE specificity */
          .my-app .specificity-demo.btn { background: #667eea; color: white; }
          /* Plugin - even MORE specificity */
          body .my-app .specificity-demo.btn.important { background: #ef4444; color: white; }
        `}</style>

        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Классическая проблема: ваши стили переопределяются библиотеками, и вы начинаете добавлять всё больше селекторов...
        </p>

        <CodeBlock code={`/* Framework - специфичность: 0-2-0 */
.btn.primary { background: gray; }

/* Ваши стили - нужно БОЛЬШЕ! 0-3-0 */
.app .btn.primary { background: blue; }

/* Плагин - ЕЩЁ БОЛЬШЕ! 0-4-0 */
body .app .btn.primary { background: red; }

/* Вы снова - !important 😱 */
.btn.primary { background: purple !important; }

/* Плагин - !important !important... 💀 */`} title="❌ Война специфичности" />
      </div>

      {/* Solution */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">✨ Решение: @layer</h3>
        </div>

        <CodeBlock code={`/* Объявляем порядок слоёв */
@layer reset, base, components, utilities;

/* Стили в слое reset - самый низкий приоритет */
@layer reset {
  * { margin: 0; padding: 0; box-sizing: border-box; }
}

/* Стили в слое base */
@layer base {
  body { font-family: system-ui; line-height: 1.5; }
  a { color: blue; }
}

/* Стили в слое components */
@layer components {
  .btn { padding: 12px 24px; border-radius: 8px; }
  .card { padding: 20px; background: white; }
}

/* Стили в слое utilities - самый высокий приоритет */
@layer utilities {
  .mt-4 { margin-top: 1rem; }
  .hidden { display: none; }
}

/* Приоритет: utilities > components > base > reset */
/* Специфичность внутри слоя НЕ ВАЖНА! */`} title="✅ @layer — контролируемый каскад" />
      </div>

      {/* Interactive Demo */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎮 Интерактивно: Порядок слоёв</h3>
        </div>

        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Измените порядок слоёв и посмотрите как меняется цвет кнопки:
        </p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <button
            onClick={() => setLayerOrder('abc')}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              background: layerOrder === 'abc' ? 'var(--accent-vue)' : 'var(--bg-code)',
              color: layerOrder === 'abc' ? 'white' : 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            @layer A, B, C
          </button>
          <button
            onClick={() => setLayerOrder('cba')}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              background: layerOrder === 'cba' ? 'var(--accent-vue)' : 'var(--bg-code)',
              color: layerOrder === 'cba' ? 'white' : 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            @layer C, B, A
          </button>
        </div>

        <style>{`
          @layer layer-a, layer-b, layer-c;
          
          @layer layer-a {
            .layer-demo-btn-abc { background: #ef4444; color: white; }
          }
          @layer layer-b {
            .layer-demo-btn-abc { background: #10b981; color: white; }
          }
          @layer layer-c {
            .layer-demo-btn-abc { background: #3b82f6; color: white; }
          }
          
          @layer layer-c, layer-b, layer-a;
          
          @layer layer-c {
            .layer-demo-btn-cba { background: #3b82f6; color: white; }
          }
          @layer layer-b {
            .layer-demo-btn-cba { background: #10b981; color: white; }
          }
          @layer layer-a {
            .layer-demo-btn-cba { background: #ef4444; color: white; }
          }
        `}</style>

        <div style={{
          padding: '24px',
          background: 'var(--bg-code)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <button 
            className={layerOrder === 'abc' ? 'layer-demo-btn-abc' : 'layer-demo-btn-cba'}
            style={{
              padding: '16px 32px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {layerOrder === 'abc' ? 'C выигрывает (синий)' : 'A выигрывает (красный)'}
          </button>
          
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center' }}>
            {layerOrder === 'abc' ? (
              <>
                <div>@layer A, B, C — порядок объявления</div>
                <div style={{ marginTop: '8px' }}>
                  <span style={{ color: '#ef4444' }}>A (низкий)</span> → 
                  <span style={{ color: '#10b981' }}> B (средний)</span> → 
                  <span style={{ color: '#3b82f6' }}> C (высокий)</span>
                </div>
              </>
            ) : (
              <>
                <div>@layer C, B, A — обратный порядок</div>
                <div style={{ marginTop: '8px' }}>
                  <span style={{ color: '#3b82f6' }}>C (низкий)</span> → 
                  <span style={{ color: '#10b981' }}> B (средний)</span> → 
                  <span style={{ color: '#ef4444' }}> A (высокий)</span>
                </div>
              </>
            )}
          </div>
        </div>

        <CodeBlock code={layerOrder === 'abc' ? `/* Порядок: A → B → C */
@layer A, B, C;

@layer A { .btn { background: red; } }
@layer B { .btn { background: green; } }
@layer C { .btn { background: blue; } }  /* ← Победитель! */

/* Последний слой имеет высший приоритет */` : `/* Порядок: C → B → A */
@layer C, B, A;

@layer C { .btn { background: blue; } }
@layer B { .btn { background: green; } }
@layer A { .btn { background: red; } }  /* ← Победитель! */

/* Теперь A последний — он и выигрывает */`} />
      </div>

      {/* Real World Example */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🌍 Реальный пример: Архитектура стилей</h3>
        </div>

        <style>{`
          @layer demo-reset, demo-base, demo-lib, demo-components, demo-utilities;
          
          @layer demo-reset {
            .layer-real-demo * { margin: 0; padding: 0; box-sizing: border-box; }
          }
          
          @layer demo-base {
            .layer-real-demo button {
              font-family: inherit;
              font-size: 14px;
              cursor: pointer;
            }
          }
          
          @layer demo-lib {
            /* "Bootstrap-like" library */
            .layer-real-demo .btn-lib {
              padding: 8px 16px;
              background: #6c757d;
              color: white;
              border: none;
              border-radius: 4px;
            }
          }
          
          @layer demo-components {
            /* Your component styles */
            .layer-real-demo .btn-lib {
              background: linear-gradient(135deg, #667eea, #764ba2);
              border-radius: 8px;
              padding: 12px 24px;
              font-weight: 600;
            }
          }
          
          @layer demo-utilities {
            .layer-real-demo .rounded-full { border-radius: 9999px !important; }
            .layer-real-demo .shadow-lg { box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
          }
        `}</style>

        <div className="layer-real-demo" style={{ 
          padding: '24px', 
          background: 'var(--bg-code)', 
          borderRadius: '12px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <button className="btn-lib">Component style</button>
          <button className="btn-lib rounded-full">+ Utility</button>
          <button className="btn-lib shadow-lg">+ Shadow</button>
          <button className="btn-lib rounded-full shadow-lg">All combined</button>
        </div>

        <CodeBlock code={`/* 1. Объявляем архитектуру */
@layer reset, base, libraries, components, utilities;

/* 2. Reset — самый низкий приоритет */
@layer reset {
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

/* 3. Base styles */
@layer base {
  body { font-family: system-ui; }
  button { font-family: inherit; cursor: pointer; }
}

/* 4. Third-party libraries (Bootstrap, etc) */
@layer libraries {
  /* @import "bootstrap.css" layer(libraries); */
  .btn { padding: 8px 16px; background: gray; }
}

/* 5. Your components — override libraries easily! */
@layer components {
  .btn {
    /* Переопределяем Bootstrap БЕЗ !important */
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 8px;
    padding: 12px 24px;
  }
}

/* 6. Utilities — highest priority */
@layer utilities {
  .rounded-full { border-radius: 9999px; }
  .shadow-lg { box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
}`} title="Архитектура с @layer" />
      </div>

      {/* Import with layers */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📦 Импорт CSS в слой</h3>
        </div>

        <CodeBlock code={`/* Импортируем библиотеку в слой */
@import url("normalize.css") layer(reset);
@import url("bootstrap.css") layer(libraries);
@import url("tailwind.css") layer(utilities);

/* Теперь ваши стили (вне слоёв) имеют ВЫСШИЙ приоритет! */
.my-button {
  /* Это переопределит ВСЕ слои */
  background: purple;
}

/* Или добавьте свой слой */
@layer my-styles {
  .my-button { background: purple; }
}`} title="@import с layer()" />

        <div className="info-box" style={{ marginTop: '16px' }}>
          <span className="info-box-icon">⚠️</span>
          <div className="info-box-content">
            <div className="info-box-title">Стили ВНЕ слоёв</div>
            <p>
              Стили, не обёрнутые в @layer, имеют <strong>высший приоритет</strong> над всеми слоями!
              Это позволяет легко переопределять библиотеки.
            </p>
          </div>
        </div>
      </div>

      {/* Nested layers */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🪆 Вложенные слои</h3>
        </div>

        <CodeBlock code={`/* Вложенные слои */
@layer framework {
  @layer base {
    .btn { padding: 8px 16px; }
  }
  
  @layer components {
    .btn-primary { background: blue; }
  }
}

/* Или через точку */
@layer framework.base {
  .btn { padding: 8px 16px; }
}

@layer framework.components {
  .btn-primary { background: blue; }
}

/* Порядок: framework.base → framework.components */`} title="Вложенные @layer" />
      </div>

      {/* revert-layer */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">↩️ revert-layer</h3>
        </div>

        <style>{`
          @layer revert-base, revert-override;
          
          @layer revert-base {
            .revert-demo-box {
              padding: 20px;
              background: #667eea;
              color: white;
              border-radius: 8px;
            }
          }
          
          @layer revert-override {
            .revert-demo-box.use-base {
              background: revert-layer;
              /* Откат к предыдущему слою — снова #667eea */
            }
            .revert-demo-box.use-override {
              background: #ef4444;
            }
          }
        `}</style>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div className="revert-demo-box use-override">
            Override layer<br/>
            <small>background: #ef4444</small>
          </div>
          <div className="revert-demo-box use-base">
            revert-layer<br/>
            <small>Откат к base слою</small>
          </div>
        </div>

        <CodeBlock code={`@layer base, override;

@layer base {
  .box { background: blue; }
}

@layer override {
  .box { background: red; }
  
  .box.keep-base {
    background: revert-layer;
    /* Откатиться к значению из base слоя */
  }
}`} title="revert-layer — откат к предыдущему слою" />
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
            { name: 'Chrome', version: '99+', supported: true },
            { name: 'Firefox', version: '97+', supported: true },
            { name: 'Safari', version: '15.4+', supported: true },
            { name: 'Edge', version: '99+', supported: true },
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
            <div className="info-box-title">Широкая поддержка</div>
            <p>@layer поддерживается с марта 2022 года. Можно использовать в продакшене!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
