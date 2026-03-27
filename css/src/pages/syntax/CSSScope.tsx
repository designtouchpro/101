import CodeBlock from '@/components/CodeBlock'

export default function CSSScope() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          🎯 @scope — Ограничение области стилей
          <span className="year-badge">2024</span>
        </h1>
        <p>Стили, которые применяются только внутри определённого контейнера!</p>
      </div>

      {/* Problem */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">😩 Проблема: Стили "протекают"</h3>
        </div>

        <style>{`
          .leak-demo .title { color: red; font-weight: 600; }
        `}</style>

        <div className="leak-demo" style={{ padding: '20px', background: 'var(--bg-code)', borderRadius: '8px', marginBottom: '16px' }}>
          <div className="title">Красный заголовок (задали стиль)</div>
          <div style={{ marginTop: '12px', padding: '12px', background: 'white', borderRadius: '6px' }}>
            <div className="title">Тоже красный! 😱 (вложенный компонент)</div>
          </div>
        </div>

        <CodeBlock code={`/* Стили для карточки */
.card .title {
  color: red;
  font-weight: 600;
}

/* HTML */
<div class="card">
  <div class="title">Заголовок карточки</div>
  
  <!-- Вложенный компонент -->
  <div class="user-profile">
    <div class="title">Имя пользователя</div>
    <!-- ☝️ Тоже станет красным! Стили "протекли" -->
  </div>
</div>

/* Проблема: .card .title затронет ВСЕ .title внутри */`} title="❌ Стили протекают во вложенные компоненты" />
      </div>

      {/* Solution */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">✨ Решение: @scope</h3>
        </div>

        <style>{`
          @scope (.scope-demo-card) to (.scope-demo-nested) {
            .title {
              color: #667eea;
              font-weight: 600;
              font-size: 1.25rem;
            }
            .text {
              color: #666;
            }
          }
        `}</style>

        <div className="scope-demo-card" style={{ padding: '20px', background: 'var(--bg-code)', borderRadius: '8px', marginBottom: '16px' }}>
          <div className="title">Синий заголовок (в scope)</div>
          <div className="text">Текст карточки</div>
          
          <div className="scope-demo-nested" style={{ marginTop: '12px', padding: '12px', background: 'white', borderRadius: '6px' }}>
            <div className="title">Обычный заголовок (вне scope!) ✅</div>
            <div className="text">Стили НЕ применились</div>
          </div>
        </div>

        <CodeBlock code={`/* @scope ОТ (.card) ДО (.nested) */
@scope (.card) to (.nested) {
  .title {
    color: blue;
    font-weight: 600;
  }
  .text {
    color: #666;
  }
}

/* HTML */
<div class="card">
  <div class="title">Синий (в scope)</div>
  <div class="text">Текст</div>
  
  <div class="nested">
    <div class="title">Обычный (вне scope!)</div>
    <!-- 👆 Стили НЕ применятся -->
  </div>
</div>`} title="✅ @scope ограничивает область" />
      </div>

      {/* Visual explanation */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎨 Визуализация: Как работает @scope</h3>
        </div>

        <style>{`
          .scope-visual {
            font-family: monospace;
            font-size: 14px;
          }
          .scope-visual-root {
            padding: 16px;
            border: 3px solid #667eea;
            border-radius: 12px;
            background: rgba(102, 126, 234, 0.1);
          }
          .scope-visual-scoped {
            margin: 8px 0 8px 20px;
            padding: 12px;
            background: rgba(102, 126, 234, 0.2);
            border-radius: 8px;
            border-left: 3px solid #667eea;
          }
          .scope-visual-limit {
            margin: 8px 0 8px 20px;
            padding: 16px;
            border: 3px dashed #ef4444;
            border-radius: 12px;
            background: rgba(239, 68, 68, 0.1);
          }
          .scope-visual-outside {
            margin: 8px 0 8px 20px;
            padding: 12px;
            background: rgba(156, 163, 175, 0.2);
            border-radius: 8px;
          }
        `}</style>

        <div className="scope-visual">
          <div className="scope-visual-root">
            <strong style={{ color: '#667eea' }}>🟦 @scope (.card) — начало scope</strong>
            
            <div className="scope-visual-scoped">
              ✅ .title — стили ПРИМЕНЯЮТСЯ
            </div>
            <div className="scope-visual-scoped">
              ✅ .text — стили ПРИМЕНЯЮТСЯ
            </div>
            
            <div className="scope-visual-limit">
              <strong style={{ color: '#ef4444' }}>🟥 to (.nested) — граница scope</strong>
              
              <div className="scope-visual-outside">
                ❌ .title — стили НЕ применяются
              </div>
              <div className="scope-visual-outside">
                ❌ .text — стили НЕ применяются
              </div>
            </div>
          </div>
        </div>

        <div className="info-box" style={{ marginTop: '16px' }}>
          <span className="info-box-icon">💡</span>
          <div className="info-box-content">
            <div className="info-box-title">Думайте как "donut scope"</div>
            <p>
              Стили применяются между root и limit — как бублик с дыркой посередине.
              Всё что внутри "дырки" (limit) — защищено от стилей.
            </p>
          </div>
        </div>
      </div>

      {/* Without limit */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📦 @scope без границы (to)</h3>
        </div>

        <style>{`
          @scope (.scope-simple-demo) {
            .item {
              padding: 12px;
              background: linear-gradient(135deg, #667eea, #764ba2);
              color: white;
              border-radius: 8px;
              margin: 4px 0;
            }
          }
        `}</style>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div className="scope-simple-demo" style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px' }}>
            <strong style={{ display: 'block', marginBottom: '8px' }}>Внутри .scope-simple-demo:</strong>
            <div className="item">Item 1 — styled</div>
            <div className="item">Item 2 — styled</div>
          </div>
          
          <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '8px' }}>
            <strong style={{ display: 'block', marginBottom: '8px' }}>Вне scope:</strong>
            <div className="item">Item — НЕ styled</div>
            <div className="item">Item — НЕ styled</div>
          </div>
        </div>

        <CodeBlock code={`/* Без "to" — scope действует на ВСЁ внутри */
@scope (.card) {
  .item {
    background: purple;
    color: white;
  }
}

/* Эквивалентно .card .item, но с бОльшей 
   изоляцией и низкой специфичностью */`} title="@scope без границы" />
      </div>

      {/* Theme example */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎨 Пример: Изолированные темы</h3>
        </div>

        <style>{`
          @scope (.scope-light-theme) {
            .box {
              background: white;
              color: #1a1a1a;
              border: 1px solid #e5e7eb;
            }
            .btn {
              background: #1a1a1a;
              color: white;
            }
          }
          
          @scope (.scope-dark-theme) {
            .box {
              background: #1a1a1a;
              color: white;
              border: 1px solid #374151;
            }
            .btn {
              background: white;
              color: #1a1a1a;
            }
          }
          
          .scope-theme-box {
            padding: 20px;
            border-radius: 12px;
          }
          .scope-theme-btn {
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 12px;
          }
        `}</style>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div className="scope-light-theme">
            <div className="box scope-theme-box">
              <h4 style={{ margin: '0 0 8px' }}>Light Theme</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>Светлая тема</p>
              <button className="btn scope-theme-btn">Button</button>
            </div>
          </div>
          
          <div className="scope-dark-theme">
            <div className="box scope-theme-box">
              <h4 style={{ margin: '0 0 8px' }}>Dark Theme</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>Тёмная тема</p>
              <button className="btn scope-theme-btn">Button</button>
            </div>
          </div>
        </div>

        <CodeBlock code={`/* Светлая тема */
@scope (.light-theme) {
  .box {
    background: white;
    color: #1a1a1a;
  }
  .btn {
    background: #1a1a1a;
    color: white;
  }
}

/* Тёмная тема */
@scope (.dark-theme) {
  .box {
    background: #1a1a1a;
    color: white;
  }
  .btn {
    background: white;
    color: #1a1a1a;
  }
}

/* Стили полностью изолированы друг от друга */`} title="Изолированные темы" />
      </div>

      {/* Component isolation */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🧩 Изоляция компонентов</h3>
        </div>

        <style>{`
          @scope (.scope-sidebar) to (.scope-content) {
            a {
              display: block;
              padding: 10px 16px;
              color: #667eea;
              text-decoration: none;
              border-radius: 6px;
            }
            a:hover {
              background: rgba(102, 126, 234, 0.1);
            }
          }
          
          @scope (.scope-content) {
            a {
              color: #764ba2;
              text-decoration: underline;
            }
            a:hover {
              color: #667eea;
            }
          }
        `}</style>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '200px 1fr', 
          gap: '16px',
          background: 'var(--bg-code)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <div className="scope-sidebar" style={{ borderRight: '1px solid var(--border)', paddingRight: '16px' }}>
            <strong style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Sidebar</strong>
            <a href="#">Home</a>
            <a href="#">Products</a>
            <a href="#">About</a>
            
            <div className="scope-content" style={{ marginTop: '16px', padding: '12px', background: 'white', borderRadius: '8px' }}>
              <small>Вложенный контент:</small><br/>
              <a href="#">Ссылка в контенте</a>
            </div>
          </div>
          
          <div className="scope-content" style={{ padding: '12px' }}>
            <strong style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Content</strong>
            <p>
              Это основной контент. 
              <a href="#">Ссылка</a> выглядит иначе.
            </p>
          </div>
        </div>

        <CodeBlock code={`/* Стили sidebar не затронут content */
@scope (.sidebar) to (.content) {
  a {
    display: block;
    padding: 10px 16px;
    color: blue;
    text-decoration: none;
  }
}

/* Стили content — отдельные */
@scope (.content) {
  a {
    color: purple;
    text-decoration: underline;
  }
}

/* Даже если .content вложен в .sidebar,
   стили sidebar туда НЕ проникнут! */`} title="Компонентная изоляция" />
      </div>

      {/* :scope pseudo-class */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📍 :scope — ссылка на root</h3>
        </div>

        <style>{`
          @scope (.scope-ref-demo) {
            :scope {
              border: 2px solid #667eea;
              padding: 16px;
              border-radius: 12px;
            }
            
            :scope > .title {
              color: #667eea;
              font-size: 1.25rem;
              font-weight: 600;
            }
          }
        `}</style>

        <div className="scope-ref-demo" style={{ marginBottom: '16px' }}>
          <div className="title">Заголовок (прямой потомок :scope)</div>
          <p style={{ margin: '8px 0 0' }}>Обычный текст</p>
        </div>

        <CodeBlock code={`@scope (.card) {
  /* :scope = сам .card */
  :scope {
    border: 2px solid blue;
    padding: 16px;
  }
  
  /* Прямой потомок root */
  :scope > .title {
    color: blue;
    font-size: 1.25rem;
  }
  
  /* Любой .title внутри */
  .title {
    font-weight: 600;
  }
}`} title=":scope псевдокласс" />
      </div>

      {/* Inline scope */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📄 Inline @scope в style</h3>
        </div>

        <CodeBlock code={`<!-- Scope прямо в HTML! -->
<div class="card">
  <style>
    @scope {
      /* Автоматически scope на родителя <style> */
      :scope {
        padding: 20px;
        background: white;
      }
      
      .title {
        color: blue;
      }
    }
  </style>
  
  <h2 class="title">Заголовок</h2>
  <p>Контент</p>
</div>

<!-- Другая карточка — свои стили -->
<div class="card">
  <style>
    @scope {
      .title { color: red; }
    }
  </style>
  
  <h2 class="title">Красный заголовок</h2>
</div>`} title="Inline scope — без имени класса" />

        <div className="info-box" style={{ marginTop: '16px' }}>
          <span className="info-box-icon">💡</span>
          <div className="info-box-content">
            <div className="info-box-title">Scoped styles в HTML</div>
            <p>
              Когда @scope без аргументов внутри {"<style>"}, 
              он автоматически scope'ится на родительский элемент!
            </p>
          </div>
        </div>
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
            { name: 'Chrome', version: '118+', supported: true },
            { name: 'Firefox', version: '❌', supported: false },
            { name: 'Safari', version: '17.4+', supported: true },
            { name: 'Edge', version: '118+', supported: true },
          ].map(browser => (
            <div key={browser.name} style={{
              padding: '16px',
              background: browser.supported ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: 600 }}>{browser.name}</div>
              <div style={{ 
                fontSize: '0.85rem', 
                color: browser.supported ? 'var(--accent-vue)' : 'var(--accent-react)'
              }}>
                {browser.version}
              </div>
            </div>
          ))}
        </div>

        <div className="info-box">
          <span className="info-box-icon">⚠️</span>
          <div className="info-box-content">
            <div className="info-box-title">Частичная поддержка</div>
            <p>
              @scope пока не поддерживается в Firefox. Используйте с @supports 
              или как progressive enhancement.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
