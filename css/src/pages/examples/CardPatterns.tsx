import CodeBlock from '@/components/CodeBlock'

export default function CardPatterns() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🃏 Паттерны карточек</h1>
        <p>Современные карточки для любых задач</p>
      </div>

      {/* Basic Card */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">1. Базовая карточка с hover</h3>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              style={{
                width: '200px',
                padding: '24px',
                background: 'var(--bg-code)',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'
                e.currentTarget.style.borderColor = 'var(--accent-css)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'var(--border-color)'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, var(--accent-css), var(--accent-purple))',
                borderRadius: '12px',
                marginBottom: '16px'
              }} />
              <h4 style={{ marginBottom: '8px' }}>Feature {n}</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Краткое описание функционала
              </p>
            </div>
          ))}
        </div>

        <CodeBlock code={`.card {
  padding: 24px;
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    border-color: var(--accent);
  }
}`} />
      </div>

      {/* Product Card */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">2. Карточка товара (E-commerce)</h3>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {[
            { name: 'Nike Air Max', price: '$129', oldPrice: '$199', badge: 'Sale' },
            { name: 'Adidas Ultra', price: '$180', badge: 'New' },
            { name: 'Puma RS-X', price: '$110' }
          ].map((item, i) => (
            <div
              key={i}
              style={{
                width: '220px',
                background: 'var(--bg-code)',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {item.badge && (
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  padding: '4px 12px',
                  background: item.badge === 'Sale' ? 'var(--accent-red)' : 'var(--accent-green)',
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {item.badge}
                </span>
              )}
              <div style={{
                height: '180px',
                background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px'
              }}>
                👟
              </div>
              <div style={{ padding: '16px' }}>
                <h4 style={{ marginBottom: '8px' }}>{item.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--accent-green)' }}>
                    {item.price}
                  </span>
                  {item.oldPrice && (
                    <span style={{ 
                      fontSize: '14px', 
                      color: 'var(--text-muted)',
                      textDecoration: 'line-through'
                    }}>
                      {item.oldPrice}
                    </span>
                  )}
                </div>
                <button style={{
                  width: '100%',
                  marginTop: '12px',
                  padding: '10px',
                  background: 'var(--accent-css)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`.product-card {
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.product-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  background: var(--accent-red);
  border-radius: 20px;
  font-size: 12px;
}

.product-image {
  aspect-ratio: 4/3;
  object-fit: cover;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-old {
  text-decoration: line-through;
  color: var(--text-muted);
}`} />
      </div>

      {/* Profile Card */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">3. Карточка профиля</h3>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <div style={{
            width: '280px',
            background: 'var(--bg-code)',
            borderRadius: '20px',
            overflow: 'hidden',
            textAlign: 'center'
          }}>
            <div style={{
              height: '80px',
              background: 'linear-gradient(135deg, var(--accent-css), var(--accent-purple))'
            }} />
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--bg-card)',
              border: '4px solid var(--bg-code)',
              margin: '-40px auto 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px'
            }}>
              👨‍💻
            </div>
            <div style={{ padding: '16px 24px 24px' }}>
              <h4>Alex Developer</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Senior Frontend Engineer
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '24px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-color)'
              }}>
                {[
                  { label: 'Posts', value: '248' },
                  { label: 'Followers', value: '12.4k' },
                  { label: 'Following', value: '186' }
                ].map((stat) => (
                  <div key={stat.label}>
                    <div style={{ fontWeight: '700' }}>{stat.value}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Horizontal Profile Card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px',
            background: 'var(--bg-code)',
            borderRadius: '16px',
            width: '320px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-orange), var(--accent-pink))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              flexShrink: 0
            }}>
              👩‍🎨
            </div>
            <div style={{ flex: 1 }}>
              <h4>Sarah Designer</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                UI/UX Lead at Figma
              </p>
            </div>
            <button style={{
              padding: '8px 16px',
              background: 'transparent',
              border: '1px solid var(--accent-css)',
              color: 'var(--accent-css)',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              Follow
            </button>
          </div>
        </div>

        <CodeBlock code={`.profile-card {
  text-align: center;
  overflow: hidden;
}

.profile-cover {
  height: 80px;
  background: linear-gradient(135deg, var(--c1), var(--c2));
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid var(--bg-card);
  margin: -40px auto 0;
}

.profile-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
  border-top: 1px solid var(--border);
}`} />
      </div>

      {/* Glassmorphism Card */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">4. Glassmorphism</h3>
        </div>

        <div style={{
          padding: '40px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '300px',
            padding: '32px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}>
            <h3 style={{ marginBottom: '12px' }}>Glassmorphism</h3>
            <p style={{ opacity: 0.9, fontSize: '14px' }}>
              Популярный тренд 2020-2024. Используется в iOS, Windows 11, и современных веб-приложениях.
            </p>
          </div>
        </div>

        <CodeBlock code={`.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* На тёмном фоне */
.glass-card-dark {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}`} />
      </div>

      {/* Neumorphism Card */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">5. Neumorphism (Soft UI)</h3>
        </div>

        <div style={{
          padding: '40px',
          background: '#e0e5ec',
          borderRadius: '20px',
          display: 'flex',
          gap: '24px',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '200px',
            padding: '32px',
            background: '#e0e5ec',
            borderRadius: '20px',
            boxShadow: '8px 8px 16px #b8bec7, -8px -8px 16px #ffffff',
            textAlign: 'center',
            color: '#333'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>☀️</div>
            <h4>Выпуклый</h4>
          </div>
          <div style={{
            width: '200px',
            padding: '32px',
            background: '#e0e5ec',
            borderRadius: '20px',
            boxShadow: 'inset 8px 8px 16px #b8bec7, inset -8px -8px 16px #ffffff',
            textAlign: 'center',
            color: '#333'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🌙</div>
            <h4>Вдавленный</h4>
          </div>
        </div>

        <CodeBlock code={`/* Neumorphism требует однотонный фон! */
:root {
  --bg: #e0e5ec;
  --shadow-dark: #b8bec7;
  --shadow-light: #ffffff;
}

.neu-raised {
  background: var(--bg);
  border-radius: 20px;
  box-shadow: 
    8px 8px 16px var(--shadow-dark),
    -8px -8px 16px var(--shadow-light);
}

.neu-pressed {
  box-shadow: 
    inset 8px 8px 16px var(--shadow-dark),
    inset -8px -8px 16px var(--shadow-light);
}`} />
      </div>

      {/* Bento Grid */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">6. Bento Grid (Apple Style)</h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(2, 180px)',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div style={{
            gridColumn: 'span 2',
            gridRow: 'span 2',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '24px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
            <span style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</span>
            <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Main Feature</h3>
            <p style={{ opacity: 0.8 }}>Главная фича занимает больше места</p>
          </div>
          <div style={{
            background: 'var(--bg-code)',
            borderRadius: '24px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '32px' }}>⚡</span>
            <h4 style={{ marginTop: '12px' }}>Fast</h4>
          </div>
          <div style={{
            background: 'var(--bg-code)',
            borderRadius: '24px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '32px' }}>🔒</span>
            <h4 style={{ marginTop: '12px' }}>Secure</h4>
          </div>
          <div style={{
            gridColumn: 'span 2',
            background: 'linear-gradient(135deg, #f093fb, #f5576c)',
            borderRadius: '24px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <span style={{ fontSize: '48px' }}>📊</span>
            <div>
              <h4>Analytics</h4>
              <p style={{ opacity: 0.8, fontSize: '14px' }}>Real-time insights</p>
            </div>
          </div>
        </div>

        <CodeBlock code={`.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 180px);
  gap: 16px;
}

.bento-item {
  background: var(--bg-card);
  border-radius: 24px;
  padding: 24px;
}

.bento-featured {
  grid-column: span 2;
  grid-row: span 2;
}

.bento-wide {
  grid-column: span 2;
}`} />
      </div>
    </div>
  )
}
