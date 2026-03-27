import { useState } from 'react'
import CodeBlock from '@/components/CodeBlock'

export default function ButtonStyles() {
  const [loading, setLoading] = useState(false)

  const handleLoadingClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🔘 Паттерны кнопок</h1>
        <p>Все варианты кнопок для современных интерфейсов</p>
      </div>

      {/* Primary Buttons */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">1. Основные стили</h3>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <button style={{
            padding: '12px 24px',
            background: 'var(--accent-css)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>Primary</button>
          
          <button style={{
            padding: '12px 24px',
            background: 'transparent',
            color: 'var(--accent-css)',
            border: '2px solid var(--accent-css)',
            borderRadius: '8px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>Outline</button>
          
          <button style={{
            padding: '12px 24px',
            background: 'rgba(38, 77, 228, 0.1)',
            color: 'var(--accent-css)',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>Ghost</button>
          
          <button style={{
            padding: '12px 24px',
            background: 'transparent',
            color: 'var(--accent-css)',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '500',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}>Link</button>
        </div>

        <CodeBlock code={`.btn-primary {
  background: var(--accent);
  color: white;
  border: none;
}

.btn-outline {
  background: transparent;
  color: var(--accent);
  border: 2px solid var(--accent);
}

.btn-ghost {
  background: rgba(var(--accent-rgb), 0.1);
  color: var(--accent);
  border: none;
}

.btn-link {
  background: transparent;
  text-decoration: underline;
}`} />
      </div>

      {/* Sizes */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">2. Размеры</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <button style={{
            padding: '6px 12px',
            fontSize: '12px',
            background: 'var(--accent-css)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>Small</button>
          
          <button style={{
            padding: '10px 20px',
            fontSize: '14px',
            background: 'var(--accent-css)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>Medium</button>
          
          <button style={{
            padding: '14px 28px',
            fontSize: '16px',
            background: 'var(--accent-css)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer'
          }}>Large</button>
          
          <button style={{
            padding: '18px 36px',
            fontSize: '18px',
            background: 'var(--accent-css)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer'
          }}>XL</button>
        </div>

        <CodeBlock code={`.btn-sm { padding: 6px 12px; font-size: 12px; }
.btn-md { padding: 10px 20px; font-size: 14px; }
.btn-lg { padding: 14px 28px; font-size: 16px; }
.btn-xl { padding: 18px 36px; font-size: 18px; }`} />
      </div>

      {/* With Icons */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">3. С иконками</h3>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'var(--accent-css)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            <span>📧</span>
            Send Email
          </button>
          
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'var(--accent-green)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Download
            <span>⬇️</span>
          </button>
          
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            background: 'var(--accent-red)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '20px'
          }}>
            🗑️
          </button>

          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            background: 'var(--bg-code)',
            color: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '20px'
          }}>
            ⚙️
          </button>
        </div>

        <CodeBlock code={`.btn-icon {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-icon-only {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 0;
  border-radius: 50%; /* или 12px для квадрата */
}`} />
      </div>

      {/* Loading State */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">4. Состояние загрузки</h3>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <button 
            onClick={handleLoadingClick}
            disabled={loading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: loading ? 'var(--text-muted)' : 'var(--accent-css)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading && (
              <span style={{
                width: '16px',
                height: '16px',
                border: '2px solid transparent',
                borderTopColor: 'white',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }} />
            )}
            {loading ? 'Loading...' : 'Click me'}
          </button>

          <button style={{
            padding: '12px 24px',
            background: 'var(--text-muted)',
            color: 'var(--text-secondary)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'not-allowed',
            opacity: 0.6
          }} disabled>
            Disabled
          </button>
        </div>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>

        <CodeBlock code={`.btn:disabled {
  background: var(--text-muted);
  cursor: not-allowed;
  opacity: 0.6;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}`} />
      </div>

      {/* Gradient Buttons */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">5. Градиентные кнопки</h3>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <button style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>Purple Magic</button>
          
          <button style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #f093fb, #f5576c)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>Pink Sunset</button>
          
          <button style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>Ocean Blue</button>

          <button style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #fa709a, #fee140)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>Warm Sun</button>
        </div>

        <CodeBlock code={`.btn-gradient {
  background: linear-gradient(135deg, #667eea, #764ba2);
  /* На hover можно сместить градиент */
  background-size: 200% 200%;
  transition: background-position 0.3s;
}

.btn-gradient:hover {
  background-position: 100% 100%;
}`} />
      </div>

      {/* Animated Buttons */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">6. Анимированные кнопки</h3>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <button 
            style={{
              padding: '12px 24px',
              background: 'var(--accent-css)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(38, 77, 228, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Lift Up
          </button>
          
          <button 
            style={{
              padding: '12px 24px',
              background: 'var(--accent-purple)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Scale Up
          </button>

          <button 
            style={{
              position: 'relative',
              padding: '12px 24px',
              background: 'transparent',
              color: 'var(--accent-green)',
              border: '2px solid var(--accent-green)',
              borderRadius: '8px',
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'white'
              const span = e.currentTarget.querySelector('span') as HTMLElement
              if (span) span.style.transform = 'translateX(0)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--accent-green)'
              const span = e.currentTarget.querySelector('span') as HTMLElement
              if (span) span.style.transform = 'translateX(-100%)'
            }}
          >
            <span style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--accent-green)',
              transform: 'translateX(-100%)',
              transition: 'transform 0.3s',
              zIndex: -1
            }} />
            Slide Fill
          </button>
        </div>

        <CodeBlock code={`.btn-lift {
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(var(--accent-rgb), 0.3);
}

.btn-scale:hover {
  transform: scale(1.05);
}

.btn-fill {
  position: relative;
  overflow: hidden;
}
.btn-fill::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent);
  transform: translateX(-100%);
  transition: transform 0.3s;
  z-index: -1;
}
.btn-fill:hover::before {
  transform: translateX(0);
}`} />
      </div>

      {/* Button Groups */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">7. Группы кнопок</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'inline-flex' }}>
            {['Left', 'Center', 'Right'].map((label, i) => (
              <button
                key={label}
                style={{
                  padding: '10px 20px',
                  background: i === 1 ? 'var(--accent-css)' : 'var(--bg-code)',
                  color: i === 1 ? 'white' : 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: i === 0 ? '8px 0 0 8px' : i === 2 ? '0 8px 8px 0' : '0',
                  marginLeft: i > 0 ? '-1px' : 0,
                  cursor: 'pointer'
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div style={{ display: 'inline-flex', gap: '4px' }}>
            {['📄', '📋', '📎', '🗑️'].map((icon) => (
              <button
                key={icon}
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'var(--bg-code)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <CodeBlock code={`.btn-group {
  display: inline-flex;
}

.btn-group button {
  border-radius: 0;
  margin-left: -1px;
}

.btn-group button:first-child {
  border-radius: 8px 0 0 8px;
  margin-left: 0;
}

.btn-group button:last-child {
  border-radius: 0 8px 8px 0;
}`} />
      </div>
    </div>
  )
}
