import CodeBlock from '@/components/CodeBlock'

export default function MediaQueries() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          📱 Современные Media Queries
          <span className="year-badge">2020+</span>
        </h1>
        <p>Новые возможности и синтаксис media queries</p>
      </div>

      {/* Range Syntax */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📐 Range Syntax (2022)</h3>
        </div>

        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Больше не нужно писать min-width/max-width — используйте математические операторы!
        </p>

        <div className="grid-2">
          <div>
            <h4 style={{ marginBottom: '8px', color: 'var(--accent-react)' }}>❌ Старый синтаксис</h4>
            <CodeBlock code={`@media (min-width: 768px) { }

@media (max-width: 1024px) { }

@media (min-width: 768px) 
   and (max-width: 1024px) { }
   
/* Путаница: включает 768px или нет? */`} />
          </div>
          <div>
            <h4 style={{ marginBottom: '8px', color: 'var(--accent-vue)' }}>✅ Range синтаксис</h4>
            <CodeBlock code={`@media (width >= 768px) { }

@media (width <= 1024px) { }

@media (768px <= width <= 1024px) { }

/* Понятно и читаемо! */`} />
          </div>
        </div>

        <CodeBlock code={`/* Все операторы */
@media (width > 600px) { }   /* больше */
@media (width >= 600px) { }  /* больше или равно */
@media (width < 600px) { }   /* меньше */
@media (width <= 600px) { }  /* меньше или равно */
@media (width = 600px) { }   /* точно (редко нужно) */

/* Range */
@media (400px <= width <= 800px) { }

/* Работает с любыми единицами */
@media (height > 50vh) { }
@media (aspect-ratio > 16/9) { }

/* Можно комбинировать */
@media (width >= 768px) and (height >= 600px) { }`} title="📝 Примеры" />
      </div>

      {/* prefers-* */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎨 prefers-* запросы</h3>
        </div>

        <CodeBlock code={`/* Тёмная тема (2019) */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0a0a0a;
    --text: #f5f5f5;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    --bg: #ffffff;
    --text: #1a1a1a;
  }
}

/* Уменьшенное движение (2019) — ВАЖНО для a11y! */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Высокий контраст (2020) */
@media (prefers-contrast: more) {
  :root {
    --border: 2px solid black;
  }
}

@media (prefers-contrast: less) {
  /* Для людей с чувствительностью к контрасту */
}

/* Прозрачность (2020) */
@media (prefers-reduced-transparency: reduce) {
  .glass {
    background: solid-color;
    backdrop-filter: none;
  }
}

/* Инвертированные цвета */
@media (inverted-colors: inverted) {
  img { filter: invert(1); }
}`} title="📝 prefers-* media features" />

        <div className="info-box" style={{ marginTop: '16px' }}>
          <span className="info-box-icon">♿</span>
          <div className="info-box-content">
            <div className="info-box-title">Accessibility first!</div>
            <p>
              <code>prefers-reduced-motion</code> — обязателен если есть анимации.
              Многие пользователи включают его из-за вестибулярных нарушений.
            </p>
          </div>
        </div>
      </div>

      {/* Interaction queries */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">👆 Interaction Media Features</h3>
        </div>

        <CodeBlock code={`/* Есть ли hover? (2017) */
@media (hover: hover) {
  /* Устройство с мышкой */
  .button:hover { background: blue; }
}

@media (hover: none) {
  /* Тачскрин — нет hover */
  .tooltip { /* показать иначе */ }
}

/* Тип указателя (2017) */
@media (pointer: coarse) {
  /* Тачскрин — большой палец */
  .button { 
    min-height: 44px;  /* Увеличить тач-таргет */
    padding: 16px 24px;
  }
}

@media (pointer: fine) {
  /* Мышка — точный клик */
  .button { padding: 8px 16px; }
}

@media (pointer: none) {
  /* Нет указателя (голосовое управление?) */
}

/* any-hover / any-pointer — для мультимодальных устройств */
@media (any-hover: hover) {
  /* Хотя бы одно устройство ввода имеет hover */
}

@media (any-pointer: fine) {
  /* Хотя бы одно устройство имеет точный указатель */
}`} title="📝 Interaction queries" />

        <div style={{ 
          marginTop: '20px',
          padding: '20px',
          background: 'var(--bg-code)',
          borderRadius: '8px'
        }}>
          <h4 style={{ marginBottom: '12px' }}>Ваше устройство:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '14px' }}>
            <div>hover: <code>{typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches ? 'hover' : 'none'}</code></div>
            <div>pointer: <code>{typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches ? 'fine' : 'coarse'}</code></div>
          </div>
        </div>
      </div>

      {/* Display queries */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🖥️ Display Media Features</h3>
        </div>

        <CodeBlock code={`/* Тип дисплея */
@media (display-mode: standalone) {
  /* PWA в режиме приложения */
  .install-button { display: none; }
}

@media (display-mode: fullscreen) {
  /* Полноэкранный режим */
}

/* Частота обновления (2022) */
@media (update: fast) {
  /* Экран с высокой частотой — можно анимации */
}

@media (update: slow) {
  /* E-ink дисплей — упростить */
  * { animation: none !important; }
}

/* Dynamic Range (HDR) */
@media (dynamic-range: high) {
  /* HDR дисплей */
  img { /* показать HDR версию */ }
}

/* Цветовая гамма */
@media (color-gamut: p3) {
  /* Display P3 поддерживается */
  :root {
    --brand: color(display-p3 1 0.5 0);
  }
}

@media (color-gamut: rec2020) {
  /* Широкая гамма */
}

/* Ориентация */
@media (orientation: portrait) { }
@media (orientation: landscape) { }

/* Aspect ratio */
@media (aspect-ratio > 16/9) {
  /* Ультраширокий экран */
}

/* Разрешение (для ретины) */
@media (resolution >= 2dppx) {
  /* Ретина — показать @2x картинки */
}

/* или старый синтаксис */
@media (-webkit-min-device-pixel-ratio: 2) { }`} title="📝 Display queries" />
      </div>

      {/* Scripting & forced colors */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">⚙️ Scripting & Forced Colors</h3>
        </div>

        <CodeBlock code={`/* JavaScript включён? (2022) */
@media (scripting: enabled) {
  .js-only { display: block; }
}

@media (scripting: none) {
  /* JS отключён — показать fallback */
  .no-js-message { display: block; }
  .interactive-widget { display: none; }
}

/* Принудительные цвета (Windows High Contrast) */
@media (forced-colors: active) {
  /* Windows High Contrast Mode */
  .button {
    /* Используйте system colors */
    background: ButtonFace;
    color: ButtonText;
    border: 1px solid ButtonText;
  }
  
  /* Не используйте кастомные цвета! */
}

/* System colors для forced-colors: */
/* Canvas, CanvasText, LinkText, VisitedText */
/* ActiveText, ButtonFace, ButtonText, ButtonBorder */
/* Field, FieldText, Highlight, HighlightText */
/* SelectedItem, SelectedItemText, Mark, MarkText */
/* GrayText */`} title="📝 Scripting & Forced Colors" />
      </div>

      {/* Container queries vs media queries */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📦 Container vs Media Queries</h3>
        </div>

        <div className="grid-2">
          <div className="info-box">
            <span className="info-box-icon">📱</span>
            <div className="info-box-content">
              <div className="info-box-title">@media</div>
              <p>Реагирует на <strong>viewport</strong> браузера. Для глобальных layout изменений.</p>
            </div>
          </div>
          <div className="info-box">
            <span className="info-box-icon">📦</span>
            <div className="info-box-content">
              <div className="info-box-title">@container</div>
              <p>Реагирует на размер <strong>контейнера</strong>. Для компонентов.</p>
            </div>
          </div>
        </div>

        <CodeBlock code={`/* Media — для page-level layout */
@media (width >= 1024px) {
  .page {
    display: grid;
    grid-template-columns: 250px 1fr;
  }
}

/* Container — для компонентов */
.card-container {
  container-type: inline-size;
}

@container (width >= 400px) {
  .card {
    flex-direction: row;
  }
}

/* Компонент адаптируется к СВОЕМУ контейнеру,
   а не к viewport — переиспользуемость! */`} title="📝 Когда что использовать" />
      </div>

      {/* Nesting media queries */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🪆 Media Queries внутри Nesting</h3>
        </div>

        <CodeBlock code={`/* Старый способ — всё разбросано */
.card { padding: 16px; }

@media (width >= 768px) {
  .card { padding: 24px; }
}

@media (width >= 1024px) {
  .card { padding: 32px; }
}

/* С CSS Nesting — всё вместе! */
.card {
  padding: 16px;
  
  @media (width >= 768px) {
    padding: 24px;
  }
  
  @media (width >= 1024px) {
    padding: 32px;
  }
  
  @media (prefers-color-scheme: dark) {
    background: #1a1a1a;
  }
  
  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
    }
  }
}`} title="📝 Nesting + Media Queries" />
      </div>
    </div>
  )
}
