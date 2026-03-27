import CodeBlock from '@/components/CodeBlock'

export default function LayoutRecipes() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📐 Layout Recipes</h1>
        <p>Готовые решения для типовых задач вёрстки</p>
      </div>

      {/* Holy Grail */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">1. Holy Grail Layout</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Header + Footer + Sidebar + Content. Классика!
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateAreas: `
            "header header header"
            "sidebar main aside"
            "footer footer footer"
          `,
          gridTemplateRows: '60px 200px 40px',
          gridTemplateColumns: '200px 1fr 150px',
          gap: '8px',
          marginBottom: '20px'
        }}>
          <div style={{ gridArea: 'header', background: 'var(--accent-css)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Header</div>
          <div style={{ gridArea: 'sidebar', background: 'var(--bg-code)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Sidebar</div>
          <div style={{ gridArea: 'main', background: 'var(--bg-code)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Main Content</div>
          <div style={{ gridArea: 'aside', background: 'var(--bg-code)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Aside</div>
          <div style={{ gridArea: 'footer', background: 'var(--accent-purple)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Footer</div>
        </div>

        <CodeBlock code={`.holy-grail {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 200px 1fr 150px;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Mobile: stack everything */
@media (max-width: 768px) {
  .holy-grail {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "aside"
      "footer";
    grid-template-columns: 1fr;
  }
}`} />
      </div>

      {/* Sticky Footer */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">2. Sticky Footer</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Footer всегда внизу, даже если контента мало
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '250px',
          background: 'var(--bg-code)',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '20px'
        }}>
          <header style={{ padding: '16px', background: 'var(--accent-css)', color: 'white' }}>Header</header>
          <main style={{ flex: 1, padding: '16px' }}>
            Контент может быть коротким...
          </main>
          <footer style={{ padding: '16px', background: 'var(--accent-purple)', color: 'white' }}>
            Footer всегда внизу
          </footer>
        </div>

        <CodeBlock code={`/* Flexbox способ */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1; /* Занимает всё доступное место */
}

/* Grid способ */
.page {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}`} />
      </div>

      {/* Sidebar Layout */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">3. Sidebar + Content</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Типичный лейаут для админок и дашбордов
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '200px 1fr',
          height: '200px',
          gap: '0',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '20px'
        }}>
          <aside style={{ background: 'var(--bg-code)', padding: '16px', borderRight: '1px solid var(--border-color)' }}>
            <div style={{ fontWeight: '600', marginBottom: '16px' }}>🚀 App</div>
            {['Dashboard', 'Users', 'Settings'].map((item, i) => (
              <div key={item} style={{
                padding: '8px 12px',
                borderRadius: '6px',
                background: i === 0 ? 'var(--accent-css)' : 'transparent',
                color: i === 0 ? 'white' : 'var(--text-secondary)',
                marginBottom: '4px',
                fontSize: '14px'
              }}>{item}</div>
            ))}
          </aside>
          <main style={{ background: 'var(--bg-primary)', padding: '16px' }}>
            <h3 style={{ marginBottom: '8px' }}>Dashboard</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Main content area</p>
          </main>
        </div>

        <CodeBlock code={`.app-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

/* Collapsible sidebar */
.sidebar.collapsed {
  width: 64px;
}

@media (max-width: 768px) {
  .app-layout {
    grid-template-columns: 1fr;
  }
  .sidebar {
    position: fixed;
    transform: translateX(-100%);
  }
  .sidebar.open {
    transform: translateX(0);
  }
}`} />
      </div>

      {/* Card Grid */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">4. Адаптивная сетка карточек</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Auto-fill/auto-fit для идеальной адаптивности
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '16px',
          marginBottom: '20px'
        }}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} style={{
              aspectRatio: '1',
              background: 'var(--bg-code)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              {n}
            </div>
          ))}
        </div>

        <CodeBlock code={`.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

/* Минимум 2 колонки */
.card-grid-2 {
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
}

/* Фиксированное кол-во с брейкпойнтами */
.card-grid-fixed {
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 640px) {
  .card-grid-fixed { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .card-grid-fixed { grid-template-columns: repeat(4, 1fr); }
}`} />
      </div>

      {/* Centered Content */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">5. Центрирование контента</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div style={{
            height: '150px',
            background: 'var(--bg-code)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              padding: '16px 24px',
              background: 'var(--accent-css)',
              borderRadius: '8px',
              color: 'white'
            }}>Flexbox</div>
          </div>
          <div style={{
            height: '150px',
            background: 'var(--bg-code)',
            borderRadius: '8px',
            display: 'grid',
            placeItems: 'center'
          }}>
            <div style={{
              padding: '16px 24px',
              background: 'var(--accent-purple)',
              borderRadius: '8px',
              color: 'white'
            }}>Grid</div>
          </div>
        </div>

        <CodeBlock code={`/* Flexbox */
.center-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Grid — короче! */
.center-grid {
  display: grid;
  place-items: center;
}

/* Для текста в блоке */
.center-text {
  display: grid;
  place-content: center;
  text-align: center;
}`} />
      </div>

      {/* Split Screen */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">6. Split Screen</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            50/50 для лендингов и auth страниц
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          height: '200px',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '20px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            display: 'grid',
            placeItems: 'center',
            color: 'white',
            padding: '24px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>✨</div>
              <h3>Welcome</h3>
              <p style={{ opacity: 0.8, fontSize: '14px' }}>Beautiful things await</p>
            </div>
          </div>
          <div style={{
            background: 'var(--bg-code)',
            display: 'grid',
            placeItems: 'center',
            padding: '24px'
          }}>
            <div style={{ width: '100%', maxWidth: '200px' }}>
              <h4 style={{ marginBottom: '16px' }}>Sign In</h4>
              <input
                placeholder="Email"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  marginBottom: '8px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  color: 'white'
                }}
              />
              <button style={{
                width: '100%',
                padding: '8px',
                background: 'var(--accent-css)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>Continue</button>
            </div>
          </div>
        </div>

        <CodeBlock code={`.split-screen {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

.split-left {
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: grid;
  place-items: center;
}

.split-right {
  display: grid;
  place-items: center;
  padding: 48px;
}

@media (max-width: 768px) {
  .split-screen {
    grid-template-columns: 1fr;
  }
  .split-left {
    min-height: 200px;
  }
}`} />
      </div>

      {/* Masonry-like */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">7. Masonry-like Grid</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Колоночная раскладка как в Pinterest
          </p>
        </div>

        <div style={{
          columnCount: 3,
          columnGap: '16px',
          marginBottom: '20px'
        }}>
          {[150, 200, 120, 180, 140, 220, 160, 190].map((h, i) => (
            <div key={i} style={{
              height: h,
              background: 'var(--bg-code)',
              borderRadius: '12px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              breakInside: 'avoid'
            }}>
              {i + 1}
            </div>
          ))}
        </div>

        <CodeBlock code={`/* CSS Columns (простой вариант) */
.masonry {
  column-count: 3;
  column-gap: 16px;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 16px;
}

/* Будущее: CSS Grid Masonry (Chrome flag) */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: masonry;
  gap: 16px;
}`} />
      </div>
    </div>
  )
}
