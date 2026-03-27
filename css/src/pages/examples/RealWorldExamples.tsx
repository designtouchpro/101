import CodeBlock from '@/components/CodeBlock'

export default function RealWorldExamples() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🌍 Примеры с реальных сайтов</h1>
        <p>Разбор UI паттернов популярных продуктов</p>
      </div>

      {/* Stripe */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">💳 Stripe — Gradient Mesh</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Знаменитый градиентный фон Stripe
          </p>
        </div>

        <div style={{
          height: '200px',
          background: `
            radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%),
            radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
            radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
            radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
            radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%),
            radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)
          `,
          borderRadius: '16px',
          display: 'grid',
          placeItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{
            padding: '24px 40px',
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '12px',
            color: '#1a1a1a',
            fontWeight: '600'
          }}>
            Stripe-style hero
          </div>
        </div>

        <CodeBlock code={`.stripe-gradient {
  background:
    radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%),
    radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
    radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
    radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
    radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
    radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%);
}`} />
      </div>

      {/* Linear */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📱 Linear — Feature Card</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Минималистичные карточки с градиентной рамкой
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
          {[
            { icon: '⚡', title: 'Fast by default', desc: 'Built for speed with 50ms interactions' },
            { icon: '🎨', title: 'Beautiful design', desc: 'Crafted with attention to detail' },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                flex: 1,
                padding: '1px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
              }}
            >
              <div style={{
                padding: '24px',
                background: 'var(--bg-code)',
                borderRadius: '15px',
                height: '100%'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{item.icon}</div>
                <h4 style={{ marginBottom: '8px' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`/* Gradient border trick */
.gradient-border {
  padding: 1px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.1),
    rgba(255,255,255,0.05)
  );
}

.gradient-border-inner {
  padding: 24px;
  background: var(--bg-card);
  border-radius: 15px; /* 16 - 1 */
}`} />
      </div>

      {/* Vercel */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">▲ Vercel — Terminal Window</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Стилизованное окно терминала
          </p>
        </div>

        <div style={{
          background: '#000',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid #333',
          marginBottom: '20px'
        }}>
          <div style={{
            padding: '12px 16px',
            background: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
            <span style={{ marginLeft: '12px', color: '#666', fontSize: '13px' }}>Terminal</span>
          </div>
          <div style={{ padding: '20px', fontFamily: 'monospace', fontSize: '14px' }}>
            <div><span style={{ color: '#888' }}>$</span> <span style={{ color: '#0ff' }}>npx</span> create-next-app</div>
            <div style={{ color: '#0f0', marginTop: '8px' }}>✓ Creating project...</div>
            <div style={{ color: '#888', marginTop: '4px' }}>✓ Installing dependencies</div>
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: '#888' }}>$</span> <span style={{ 
                borderRight: '2px solid #fff',
                animation: 'blink 1s infinite'
              }}>&nbsp;</span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}</style>

        <CodeBlock code={`.terminal {
  background: #000;
  border: 1px solid #333;
  border-radius: 12px;
  overflow: hidden;
  font-family: monospace;
}

.terminal-header {
  padding: 12px 16px;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 8px;
}

.terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-dot.red { background: #ff5f57; }
.terminal-dot.yellow { background: #febc2e; }
.terminal-dot.green { background: #28c840; }

.cursor {
  border-right: 2px solid #fff;
  animation: blink 1s infinite;
}`} />
      </div>

      {/* Notion */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📝 Notion — Page Header</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Минималистичный заголовок с эмодзи
          </p>
        </div>

        <div style={{
          padding: '40px',
          background: 'var(--bg-code)',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ fontSize: '72px', marginBottom: '16px' }}>🚀</div>
            <h1 style={{ fontSize: '40px', fontWeight: '700', marginBottom: '8px' }}>
              Product Roadmap
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Track our progress and upcoming features
            </p>
            <div style={{ 
              marginTop: '24px',
              display: 'flex',
              gap: '24px',
              fontSize: '14px',
              color: 'var(--text-muted)'
            }}>
              <span>👤 Created by Alex</span>
              <span>📅 Jan 15, 2024</span>
              <span>🏷️ Product, Planning</span>
            </div>
          </div>
        </div>

        <CodeBlock code={`.notion-header {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 96px;
}

.notion-icon {
  font-size: 72px;
  margin-bottom: 16px;
}

.notion-title {
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
}

.notion-meta {
  display: flex;
  gap: 24px;
  color: var(--text-muted);
  font-size: 14px;
}`} />
      </div>

      {/* Spotify */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎵 Spotify — Playlist Card</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Карточка с наведением и play кнопкой
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
          {['Chill Vibes', 'Workout Mix', 'Focus Flow'].map((name, i) => (
            <div
              key={name}
              style={{
                width: '160px',
                padding: '16px',
                background: 'var(--bg-code)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.3s',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#282828'
                const btn = e.currentTarget.querySelector('.play-btn') as HTMLElement
                if (btn) {
                  btn.style.opacity = '1'
                  btn.style.transform = 'translateY(0)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-code)'
                const btn = e.currentTarget.querySelector('.play-btn') as HTMLElement
                if (btn) {
                  btn.style.opacity = '0'
                  btn.style.transform = 'translateY(8px)'
                }
              }}
            >
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <div style={{
                  aspectRatio: '1',
                  background: `linear-gradient(135deg, hsl(${i * 80}, 60%, 40%), hsl(${i * 80 + 40}, 60%, 30%))`,
                  borderRadius: '4px'
                }} />
                <div
                  className="play-btn"
                  style={{
                    position: 'absolute',
                    right: '8px',
                    bottom: '8px',
                    width: '48px',
                    height: '48px',
                    background: '#1db954',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                    opacity: 0,
                    transform: 'translateY(8px)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ▶️
                </div>
              </div>
              <h4 style={{ fontSize: '14px', marginBottom: '4px' }}>{name}</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {20 + i * 10} songs
              </p>
            </div>
          ))}
        </div>

        <CodeBlock code={`.spotify-card {
  padding: 16px;
  background: #181818;
  border-radius: 8px;
  transition: background 0.3s;
}

.spotify-card:hover {
  background: #282828;
}

.play-button {
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 48px;
  height: 48px;
  background: #1db954;
  border-radius: 50%;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s ease;
}

.spotify-card:hover .play-button {
  opacity: 1;
  transform: translateY(0);
}`} />
      </div>

      {/* Tailwind */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎨 Tailwind — Code Preview</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Табы с превью кода
          </p>
        </div>

        <div style={{
          borderRadius: '16px',
          overflow: 'hidden',
          background: '#1e293b',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            background: '#0f172a',
            padding: '0 16px'
          }}>
            {['Preview', 'HTML', 'CSS'].map((tab, i) => (
              <button
                key={tab}
                style={{
                  padding: '12px 16px',
                  background: i === 0 ? '#1e293b' : 'transparent',
                  border: 'none',
                  color: i === 0 ? 'white' : '#64748b',
                  borderRadius: i === 0 ? '8px 8px 0 0' : 0,
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={{ padding: '32px', display: 'flex', justifyContent: 'center' }}>
            <button style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Get started
            </button>
          </div>
        </div>

        <CodeBlock code={`.code-preview {
  border-radius: 16px;
  overflow: hidden;
  background: #1e293b; /* slate-800 */
}

.code-tabs {
  display: flex;
  background: #0f172a; /* slate-900 */
}

.code-tab.active {
  background: #1e293b;
  border-radius: 8px 8px 0 0;
}`} />
      </div>

      {/* GitHub */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🐙 GitHub — Repository Card</h3>
        </div>

        <div style={{
          padding: '16px',
          background: 'var(--bg-code)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          maxWidth: '400px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span>📦</span>
            <a href="#" style={{ color: 'var(--accent-css)', textDecoration: 'none', fontWeight: '600' }}>
              facebook/react
            </a>
            <span style={{
              padding: '2px 8px',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              fontSize: '12px',
              color: 'var(--text-muted)'
            }}>Public</span>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            The library for web and native user interfaces
          </p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f1e05a' }} />
              JavaScript
            </span>
            <span>⭐ 218k</span>
            <span>🍴 45k</span>
          </div>
        </div>

        <CodeBlock code={`.repo-card {
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
}

.repo-badge {
  padding: 2px 8px;
  border: 1px solid var(--border);
  border-radius: 12px;
  font-size: 12px;
}

.language-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--language-color);
}`} />
      </div>

      {/* Figma */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎨 Figma — Layer Panel</h3>
        </div>

        <div style={{
          width: '280px',
          background: '#2c2c2c',
          borderRadius: '8px',
          overflow: 'hidden',
          fontSize: '13px',
          marginBottom: '20px'
        }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #3c3c3c', fontWeight: '500' }}>
            Layers
          </div>
          {[
            { name: 'Frame 1', type: 'frame', indent: 0, open: true },
            { name: 'Header', type: 'frame', indent: 1 },
            { name: 'Logo', type: 'image', indent: 2 },
            { name: 'Navigation', type: 'frame', indent: 2 },
            { name: 'Hero Section', type: 'frame', indent: 1 },
            { name: 'Title', type: 'text', indent: 2, selected: true },
          ].map((layer, i) => (
            <div
              key={i}
              style={{
                padding: '6px 12px',
                paddingLeft: 12 + layer.indent * 16,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: layer.selected ? '#0d99ff33' : 'transparent',
                color: layer.selected ? '#fff' : '#ccc'
              }}
            >
              <span style={{ opacity: 0.5 }}>
                {layer.type === 'frame' ? '⬚' : layer.type === 'text' ? 'T' : '🖼️'}
              </span>
              {layer.name}
            </div>
          ))}
        </div>

        <CodeBlock code={`.layer-item {
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.layer-item.selected {
  background: rgba(13, 153, 255, 0.2);
}

/* Indentation based on depth */
.layer-item[data-depth="1"] { padding-left: 28px; }
.layer-item[data-depth="2"] { padding-left: 44px; }
.layer-item[data-depth="3"] { padding-left: 60px; }`} />
      </div>
    </div>
  )
}
