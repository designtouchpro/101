import CodeBlock from '@/components/CodeBlock'

export default function AnimationPatterns() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>✨ Анимации и переходы</h1>
        <p>Современные CSS анимации без JavaScript</p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from { 
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade { animation: fadeIn 0.5s ease-out; }
        .animate-slide-up { animation: slideUp 0.5s ease-out; }
        .animate-slide-left { animation: slideInLeft 0.5s ease-out; }
        .animate-scale { animation: scaleIn 0.3s ease-out; }
        .animate-bounce { animation: bounce 1s ease-in-out infinite; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        .animate-spin { animation: spin 1s linear infinite; }
        
        .skeleton {
          background: linear-gradient(
            90deg,
            var(--bg-code) 0%,
            #2a2a2a 50%,
            var(--bg-code) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(38, 77, 228, 0.5);
        }
      `}</style>

      {/* Entry Animations */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">1. Анимации появления</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
          {[
            { name: 'Fade In', className: 'animate-fade' },
            { name: 'Slide Up', className: 'animate-slide-up' },
            { name: 'Slide Left', className: 'animate-slide-left' },
            { name: 'Scale In', className: 'animate-scale' },
          ].map((anim) => (
            <div
              key={anim.name}
              className={anim.className}
              style={{
                padding: '24px',
                background: 'var(--bg-code)',
                borderRadius: '12px',
                textAlign: 'center'
              }}
            >
              {anim.name}
            </div>
          ))}
        </div>

        <CodeBlock code={`@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from { 
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade { animation: fadeIn 0.5s ease-out; }
.animate-slide-up { animation: slideUp 0.5s ease-out; }
.animate-scale { animation: scaleIn 0.3s ease-out; }`} />
      </div>

      {/* Infinite Animations */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">2. Бесконечные анимации</h3>
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div
              className="animate-bounce"
              style={{
                width: '60px',
                height: '60px',
                background: 'var(--accent-css)',
                borderRadius: '50%',
                margin: '0 auto 12px'
              }}
            />
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Bounce</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              className="animate-pulse"
              style={{
                width: '60px',
                height: '60px',
                background: 'var(--accent-purple)',
                borderRadius: '12px',
                margin: '0 auto 12px'
              }}
            />
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Pulse</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              className="animate-spin"
              style={{
                width: '60px',
                height: '60px',
                border: '4px solid var(--border-color)',
                borderTopColor: 'var(--accent-green)',
                borderRadius: '50%',
                margin: '0 auto 12px'
              }}
            />
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Spin</div>
          </div>
        </div>

        <CodeBlock code={`@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-bounce { animation: bounce 1s ease-in-out infinite; }
.animate-pulse { animation: pulse 2s ease-in-out infinite; }
.animate-spin { animation: spin 1s linear infinite; }`} />
      </div>

      {/* Skeleton Loading */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">3. Skeleton Loading</h3>
        </div>

        <div style={{
          display: 'flex',
          gap: '16px',
          padding: '20px',
          background: 'var(--bg-code)',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <div className="skeleton" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
          <div style={{ flex: 1 }}>
            <div className="skeleton" style={{ height: '20px', borderRadius: '4px', marginBottom: '12px', width: '60%' }} />
            <div className="skeleton" style={{ height: '16px', borderRadius: '4px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ height: '16px', borderRadius: '4px', width: '80%' }} />
          </div>
        </div>

        <CodeBlock code={`@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-code) 0%,
    #2a2a2a 50%,
    var(--bg-code) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}`} />
      </div>

      {/* Hover Effects */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">4. Hover эффекты</h3>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div
            className="hover-lift"
            style={{
              width: '120px',
              height: '120px',
              background: 'var(--bg-code)',
              borderRadius: '16px',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Lift ↑
          </div>

          <div
            className="hover-scale"
            style={{
              width: '120px',
              height: '120px',
              background: 'var(--bg-code)',
              borderRadius: '16px',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
          >
            Scale ⬡
          </div>

          <div
            className="hover-glow"
            style={{
              width: '120px',
              height: '120px',
              background: 'var(--bg-code)',
              borderRadius: '16px',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              transition: 'box-shadow 0.3s ease'
            }}
          >
            Glow ✨
          </div>
        </div>

        <CodeBlock code={`.hover-lift {
  transition: all 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.hover-scale:hover {
  transform: scale(1.05);
}

.hover-glow:hover {
  box-shadow: 0 0 30px rgba(38, 77, 228, 0.5);
}`} />
      </div>

      {/* Staggered Animation */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">5. Staggered анимация</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Элементы появляются с задержкой друг за другом
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: '60px',
                height: '60px',
                background: 'var(--accent-css)',
                borderRadius: '12px',
                animation: 'slideUp 0.5s ease-out forwards',
                animationDelay: `${i * 0.1}s`,
                opacity: 0
              }}
            />
          ))}
        </div>

        <CodeBlock code={`.stagger-item {
  animation: slideUp 0.5s ease-out forwards;
  opacity: 0;
}

.stagger-item:nth-child(1) { animation-delay: 0s; }
.stagger-item:nth-child(2) { animation-delay: 0.1s; }
.stagger-item:nth-child(3) { animation-delay: 0.2s; }
/* ... или через CSS custom properties */

.stagger-item {
  animation-delay: calc(var(--i) * 0.1s);
}

/* В HTML: style="--i: 0", style="--i: 1" и т.д. */`} />
      </div>

      {/* Transitions */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">6. Умные transitions</h3>
        </div>

        <CodeBlock code={`/* Разные свойства — разная скорость */
.card {
  transition: 
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background 0.2s ease;
}

/* Easing functions */
.ease-out-expo {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

.ease-out-back { /* С небольшим "отскоком" */
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}

.ease-in-out-circ {
  transition-timing-function: cubic-bezier(0.85, 0, 0.15, 1);
}

/* Не анимируем всё подряд! */
.bad {
  transition: all 0.3s; /* ❌ Тяжело для производительности */
}

.good {
  transition: transform 0.3s, opacity 0.3s; /* ✅ Только нужное */
}`} />
      </div>

      {/* View Transitions */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">7. View Transitions API (2023+)</h3>
          <span style={{
            padding: '4px 8px',
            background: 'var(--accent-green)',
            borderRadius: '4px',
            fontSize: '11px',
            marginLeft: '8px'
          }}>NEW</span>
        </div>

        <div className="info-box">
          <span className="info-box-icon">🚀</span>
          <div className="info-box-content">
            <div className="info-box-title">Будущее анимаций</div>
            <p>
              View Transitions позволяет анимировать переходы между страницами 
              и состояниями без JavaScript!
            </p>
          </div>
        </div>

        <CodeBlock code={`/* Включаем View Transitions */
@view-transition {
  navigation: auto;
}

/* Анимируем конкретные элементы */
.card {
  view-transition-name: card-1;
}

/* Кастомная анимация перехода */
::view-transition-old(card-1) {
  animation: fadeOut 0.3s ease;
}

::view-transition-new(card-1) {
  animation: fadeIn 0.3s ease;
}

/* JavaScript API */
document.startViewTransition(() => {
  // Изменить DOM
  updateTheDOM();
});`} />
      </div>

      {/* Performance Tips */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">⚡ Советы по производительности</h3>
        </div>

        <div className="grid-2">
          <div className="info-box success">
            <span className="info-box-icon">✅</span>
            <div className="info-box-content">
              <div className="info-box-title">Анимируйте это</div>
              <p>
                <code>transform</code> и <code>opacity</code> — 
                работают на GPU, не вызывают reflow/repaint.
              </p>
            </div>
          </div>

          <div className="info-box warning">
            <span className="info-box-icon">⚠️</span>
            <div className="info-box-content">
              <div className="info-box-title">Избегайте</div>
              <p>
                <code>width</code>, <code>height</code>, <code>top</code>, <code>left</code>, 
                <code>margin</code>, <code>padding</code> — вызывают reflow!
              </p>
            </div>
          </div>
        </div>

        <CodeBlock code={`/* ❌ Плохо — анимируем layout */
.bad:hover {
  width: 200px;
  margin-left: 20px;
}

/* ✅ Хорошо — используем transform */
.good:hover {
  transform: scale(1.1) translateX(20px);
}

/* Ускорение GPU */
.gpu-accelerated {
  will-change: transform;
  transform: translateZ(0); /* hack для старых браузеров */
}

/* Уважаем prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`} />
      </div>
    </div>
  )
}
