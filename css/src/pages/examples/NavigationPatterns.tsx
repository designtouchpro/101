import CodeBlock from '@/components/CodeBlock'

export default function NavigationPatterns() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🧭 Паттерны навигации</h1>
        <p>Header, Sidebar, Tabs, Breadcrumbs и другие</p>
      </div>

      {/* Simple Header */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">1. Простой Header</h3>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          background: 'var(--bg-code)',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '18px' }}>
            <span>🚀</span> Brand
          </div>
          <nav style={{ display: 'flex', gap: '32px' }}>
            {['Home', 'Features', 'Pricing', 'About'].map((item, i) => (
              <a key={item} href="#" style={{
                color: i === 0 ? 'var(--accent-css)' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: i === 0 ? '500' : '400'
              }}>{item}</a>
            ))}
          </nav>
          <button style={{
            padding: '8px 16px',
            background: 'var(--accent-css)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>Sign Up</button>
        </div>

        <CodeBlock code={`.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
}

.nav {
  display: flex;
  gap: 32px;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
}

.nav-link.active,
.nav-link:hover {
  color: var(--accent);
}`} />
      </div>

      {/* Header with Dropdown */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">2. Header с Dropdown</h3>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          background: 'var(--bg-code)',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ fontWeight: '600', fontSize: '18px' }}>Logo</div>
          <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Home</a>
            <div style={{ position: 'relative' }}>
              <button style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Products <span style={{ fontSize: '10px' }}>▼</span>
              </button>
              {/* Dropdown */}
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '8px',
                padding: '8px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                minWidth: '180px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
              }}>
                {['Analytics', 'Engagement', 'Security', 'Integrations'].map((item) => (
                  <a key={item} href="#" style={{
                    display: 'block',
                    padding: '10px 12px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}>{item}</a>
                ))}
              </div>
            </div>
            <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Pricing</a>
          </nav>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{
              padding: '8px 16px',
              background: 'transparent',
              color: 'var(--text-primary)',
              border: 'none',
              cursor: 'pointer'
            }}>Log in</button>
            <button style={{
              padding: '8px 16px',
              background: 'var(--accent-css)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>Get Started</button>
          </div>
        </div>

        <CodeBlock code={`.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  padding: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
}`} />
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">3. Tabs</h3>
        </div>

        <div style={{ marginBottom: '20px' }}>
          {/* Underline tabs */}
          <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>Underline Tabs</h4>
          <div style={{
            display: 'flex',
            gap: '24px',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '24px'
          }}>
            {['Overview', 'Analytics', 'Reports', 'Notifications'].map((tab, i) => (
              <button key={tab} style={{
                padding: '12px 0',
                background: 'none',
                border: 'none',
                borderBottom: i === 0 ? '2px solid var(--accent-css)' : '2px solid transparent',
                color: i === 0 ? 'var(--accent-css)' : 'var(--text-secondary)',
                cursor: 'pointer',
                marginBottom: '-1px'
              }}>{tab}</button>
            ))}
          </div>

          {/* Pill tabs */}
          <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>Pill Tabs</h4>
          <div style={{
            display: 'inline-flex',
            gap: '4px',
            padding: '4px',
            background: 'var(--bg-code)',
            borderRadius: '10px',
            marginBottom: '24px'
          }}>
            {['Day', 'Week', 'Month', 'Year'].map((tab, i) => (
              <button key={tab} style={{
                padding: '8px 16px',
                background: i === 1 ? 'var(--accent-css)' : 'transparent',
                color: i === 1 ? 'white' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>{tab}</button>
            ))}
          </div>

          {/* Boxed tabs */}
          <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>Boxed Tabs</h4>
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)'
          }}>
            {['Profile', 'Settings', 'Billing', 'Team'].map((tab, i) => (
              <button key={tab} style={{
                padding: '12px 20px',
                background: i === 0 ? 'var(--bg-card)' : 'transparent',
                border: i === 0 ? '1px solid var(--border-color)' : '1px solid transparent',
                borderBottom: i === 0 ? '1px solid var(--bg-card)' : 'none',
                borderRadius: '8px 8px 0 0',
                color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                marginBottom: '-1px'
              }}>{tab}</button>
            ))}
          </div>
        </div>

        <CodeBlock code={`/* Underline tabs */
.tabs-underline {
  display: flex;
  gap: 24px;
  border-bottom: 1px solid var(--border);
}

.tab-underline.active {
  border-bottom: 2px solid var(--accent);
  margin-bottom: -1px;
}

/* Pill tabs */
.tabs-pill {
  display: inline-flex;
  padding: 4px;
  background: var(--bg-secondary);
  border-radius: 10px;
}

.tab-pill.active {
  background: var(--accent);
  color: white;
}`} />
      </div>

      {/* Breadcrumbs */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">4. Breadcrumbs</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
          {/* Simple breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</a>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Products</a>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-primary)' }}>MacBook Pro</span>
          </nav>

          {/* With icons */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>🏠</a>
            <span style={{ color: 'var(--text-muted)' }}>›</span>
            <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>📁 Documents</a>
            <span style={{ color: 'var(--text-muted)' }}>›</span>
            <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>📂 Projects</a>
            <span style={{ color: 'var(--text-muted)' }}>›</span>
            <span style={{ color: 'var(--text-primary)' }}>📄 Report.pdf</span>
          </nav>
        </div>

        <CodeBlock code={`.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb-separator {
  color: var(--text-muted);
}

.breadcrumb a {
  color: var(--text-secondary);
}

.breadcrumb-current {
  color: var(--text-primary);
}`} />
      </div>

      {/* Pagination */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">5. Pagination</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '20px' }}>
          {/* Simple pagination */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <button style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-code)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}>←</button>
            {[1, 2, 3, '...', 8, 9, 10].map((page, i) => (
              <button key={i} style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: page === 2 ? 'var(--accent-css)' : 'var(--bg-code)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                color: page === 2 ? 'white' : 'var(--text-primary)',
                cursor: typeof page === 'number' ? 'pointer' : 'default',
                fontSize: '14px'
              }}>{page}</button>
            ))}
            <button style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-code)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}>→</button>
          </div>

          {/* Text pagination */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{
              padding: '8px 16px',
              background: 'var(--bg-code)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '14px'
            }}>← Previous</button>
            <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Page 2 of 10
            </span>
            <button style={{
              padding: '8px 16px',
              background: 'var(--bg-code)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '14px'
            }}>Next →</button>
          </div>
        </div>

        <CodeBlock code={`.pagination {
  display: flex;
  gap: 4px;
}

.page-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.page-btn.active {
  background: var(--accent);
  color: white;
}`} />
      </div>

      {/* Sidebar */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">6. Sidebar Navigation</h3>
        </div>

        <div style={{
          width: '240px',
          padding: '16px',
          background: 'var(--bg-code)',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Main
            </div>
            {[
              { icon: '🏠', label: 'Dashboard', active: true },
              { icon: '📊', label: 'Analytics' },
              { icon: '📁', label: 'Projects' },
            ].map((item) => (
              <a key={item.label} href="#" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                background: item.active ? 'var(--accent-css)' : 'transparent',
                color: item.active ? 'white' : 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '14px',
                marginBottom: '4px'
              }}>
                <span>{item.icon}</span>
                {item.label}
              </a>
            ))}
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Settings
            </div>
            {[
              { icon: '👤', label: 'Profile' },
              { icon: '⚙️', label: 'Settings' },
              { icon: '🚪', label: 'Logout' },
            ].map((item) => (
              <a key={item.label} href="#" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '14px',
                marginBottom: '4px'
              }}>
                <span>{item.icon}</span>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <CodeBlock code={`.sidebar-nav {
  width: 240px;
  padding: 16px;
}

.nav-section-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
}

.nav-item.active {
  background: var(--accent);
  color: white;
}`} />
      </div>
    </div>
  )
}
