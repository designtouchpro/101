import { useState } from 'react'
import CodeBlock from '@/components/CodeBlock'

export default function FormPatterns() {
  const [focused, setFocused] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📝 Паттерны форм</h1>
        <p>Современные инпуты, валидация и интерактивность</p>
      </div>

      {/* Basic Input */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">1. Базовые инпуты</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Standard input"
            style={{
              padding: '12px 16px',
              background: 'var(--bg-code)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-css)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
          />

          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder=" "
              style={{
                width: '100%',
                padding: '20px 16px 8px',
                background: 'var(--bg-code)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none'
              }}
              onFocus={() => setFocused('floating')}
              onBlur={() => setFocused(null)}
            />
            <label style={{
              position: 'absolute',
              left: '16px',
              top: focused === 'floating' ? '8px' : '50%',
              transform: focused === 'floating' ? 'none' : 'translateY(-50%)',
              fontSize: focused === 'floating' ? '11px' : '14px',
              color: focused === 'floating' ? 'var(--accent-css)' : 'var(--text-secondary)',
              transition: 'all 0.2s',
              pointerEvents: 'none'
            }}>
              Floating Label
            </label>
          </div>
        </div>

        <CodeBlock code={`/* Basic input */
.input {
  padding: 12px 16px;
  background: var(--bg-code);
  border: 1px solid var(--border);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: var(--accent);
}

/* Floating label */
.input-floating {
  padding: 20px 16px 8px;
}

.input-floating:focus + label,
.input-floating:not(:placeholder-shown) + label {
  top: 8px;
  font-size: 11px;
  color: var(--accent);
}`} />
      </div>

      {/* Input with Icon */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">2. Инпуты с иконками</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', marginBottom: '20px' }}>
          {/* Icon left */}
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '16px'
            }}>🔍</span>
            <input
              type="text"
              placeholder="Search..."
              style={{
                width: '100%',
                padding: '12px 16px 12px 44px',
                background: 'var(--bg-code)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Icon right */}
          <div style={{ position: 'relative' }}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 44px 12px 16px',
                background: 'var(--bg-code)',
                border: `1px solid ${email.includes('@') ? 'var(--accent-green)' : 'var(--border-color)'}`,
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            {email.includes('@') && (
              <span style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--accent-green)'
              }}>✓</span>
            )}
          </div>

          {/* Password toggle */}
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 44px 12px 16px',
                background: 'var(--bg-code)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <CodeBlock code={`.input-icon-left {
  padding-left: 44px;
}

.input-icon-right {
  padding-right: 44px;
}

.input-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.input-icon-left .input-icon { left: 16px; }
.input-icon-right .input-icon { right: 16px; }`} />
      </div>

      {/* Checkbox & Radio */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">3. Custom Checkbox & Radio</h3>
        </div>

        <div style={{ display: 'flex', gap: '40px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Checkboxes</h4>
            {['Option A', 'Option B', 'Option C'].map((label, i) => (
              <label key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked={i === 0} style={{ display: 'none' }} />
                <span style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '4px',
                  border: '2px solid var(--accent-css)',
                  background: i === 0 ? 'var(--accent-css)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px'
                }}>
                  {i === 0 && '✓'}
                </span>
                {label}
              </label>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Radio</h4>
            {['Small', 'Medium', 'Large'].map((label, i) => (
              <label key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <span style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: '2px solid var(--accent-css)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {i === 1 && <span style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'var(--accent-css)'
                  }} />}
                </span>
                {label}
              </label>
            ))}
          </div>
        </div>

        <CodeBlock code={`/* Custom checkbox */
.checkbox {
  display: none;
}

.checkbox + label::before {
  content: '';
  width: 20px;
  height: 20px;
  border: 2px solid var(--accent);
  border-radius: 4px;
}

.checkbox:checked + label::before {
  background: var(--accent);
  content: '✓';
  color: white;
}

/* Custom radio */
.radio + label::before {
  border-radius: 50%;
}

.radio:checked + label::before {
  border-width: 6px; /* Creates inner circle */
}`} />
      </div>

      {/* Toggle Switch */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">4. Toggle Switch</h3>
        </div>

        <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
          {[true, false].map((checked, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <div style={{
                width: '48px',
                height: '26px',
                background: checked ? 'var(--accent-css)' : 'var(--border-color)',
                borderRadius: '13px',
                position: 'relative',
                transition: 'background 0.2s'
              }}>
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  left: checked ? '24px' : '2px',
                  transition: 'left 0.2s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} />
              </div>
              {checked ? 'On' : 'Off'}
            </label>
          ))}
        </div>

        <CodeBlock code={`.toggle {
  width: 48px;
  height: 26px;
  background: var(--border);
  border-radius: 13px;
  position: relative;
  transition: background 0.2s;
}

.toggle::after {
  content: '';
  width: 22px;
  height: 22px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: left 0.2s;
}

.toggle:checked {
  background: var(--accent);
}

.toggle:checked::after {
  left: 24px;
}`} />
      </div>

      {/* Select */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">5. Custom Select</h3>
        </div>

        <div style={{ display: 'flex', gap: '16px', maxWidth: '400px', marginBottom: '20px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <select style={{
              width: '100%',
              padding: '12px 40px 12px 16px',
              background: 'var(--bg-code)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontSize: '14px',
              appearance: 'none',
              cursor: 'pointer',
              outline: 'none'
            }}>
              <option>Select option...</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
            <span style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}>▼</span>
          </div>
        </div>

        <CodeBlock code={`.select-wrapper {
  position: relative;
}

.select {
  appearance: none;
  padding-right: 40px;
  cursor: pointer;
}

.select-wrapper::after {
  content: '▼';
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}`} />
      </div>

      {/* Form Layout */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">6. Login Form (полный пример)</h3>
        </div>

        <div style={{
          maxWidth: '400px',
          padding: '32px',
          background: 'var(--bg-code)',
          borderRadius: '16px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '8px', textAlign: 'center' }}>Welcome back</h3>
          <p style={{ marginBottom: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
            Sign in to your account
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Password</label>
                <a href="#" style={{ fontSize: '14px', color: 'var(--accent-css)', textDecoration: 'none' }}>
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <input type="checkbox" />
              Remember me
            </label>

            <button style={{
              width: '100%',
              padding: '12px',
              background: 'var(--accent-css)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Sign In
            </button>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              color: 'var(--text-secondary)',
              fontSize: '14px'
            }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
              or
              <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
            </div>

            <button style={{
              width: '100%',
              padding: '12px',
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <span>🔵</span> Continue with Google
            </button>
          </div>

          <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <a href="#" style={{ color: 'var(--accent-css)', textDecoration: 'none' }}>Sign up</a>
          </p>
        </div>

        <CodeBlock code={`.auth-form {
  max-width: 400px;
  padding: 32px;
  background: var(--bg-card);
  border-radius: 16px;
}

.divider {
  display: flex;
  align-items: center;
  gap: 16px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}`} />
      </div>
    </div>
  )
}
