import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="page-container">
      <h1>📄 HTML Playground</h1>
      <p className="page-description">
        Интерактивная площадка для изучения современных возможностей HTML5+.
        Новые элементы, атрибуты, API браузера и лучшие практики разметки.
      </p>

      <div className="card">
        <h2>🎯 Зачем это нужно?</h2>
        <p style={{ marginBottom: '16px' }}>
          HTML постоянно развивается. Многие разработчики застряли на знаниях 2010-х годов,
          хотя браузеры давно поддерживают мощные нативные решения:
        </p>
        <ul className="info-list">
          <li>Модальные окна без JavaScript (<code>&lt;dialog&gt;</code>)</li>
          <li>Нативные всплывающие подсказки (<code>popover</code>)</li>
          <li>Ленивая загрузка изображений (<code>loading="lazy"</code>)</li>
          <li>Валидация форм без библиотек</li>
          <li>Web Components с <code>&lt;template&gt;</code> и <code>&lt;slot&gt;</code></li>
        </ul>
      </div>

      <h2 style={{ marginBottom: '24px' }}>📚 Разделы</h2>

      <div className="feature-grid">
        <Link to="/timeline" className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>Timeline HTML</h3>
          <p>История развития HTML от HTML5 до современных стандартов Living Standard</p>
        </Link>

        <Link to="/input-types" className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>Типы Input</h3>
          <p>date, time, color, range, tel, email и другие специализированные инпуты</p>
        </Link>

        <Link to="/forms-validation" className="feature-card">
          <div className="feature-icon">✅</div>
          <h3>Валидация форм</h3>
          <p>required, pattern, min/max, Constraint Validation API</p>
        </Link>

        <Link to="/dialog-popover" className="feature-card">
          <div className="feature-icon">💬</div>
          <h3>Dialog & Popover</h3>
          <p>Нативные модалки и поповеры без JavaScript библиотек</p>
        </Link>

        <Link to="/template-slot" className="feature-card">
          <div className="feature-icon">🧩</div>
          <h3>Template & Slot</h3>
          <p>Шаблоны и слоты для Web Components</p>
        </Link>

        <Link to="/new-attributes" className="feature-card">
          <div className="feature-icon">🏷️</div>
          <h3>Новые атрибуты</h3>
          <p>loading, decoding, fetchpriority, inert, contenteditable и другие</p>
        </Link>

        <Link to="/meta-tags" className="feature-card">
          <div className="feature-icon">🔖</div>
          <h3>Meta теги</h3>
          <p>Open Graph, Twitter Cards, viewport, theme-color, CSP</p>
        </Link>

        <Link to="/script-loading" className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Script & Link</h3>
          <p>async, defer, module, preload, prefetch, modulepreload</p>
        </Link>

        <Link to="/semantic" className="feature-card">
          <div className="feature-icon">🏗️</div>
          <h3>Семантика</h3>
          <p>Правильная структура документа, ARIA, accessibility</p>
        </Link>

        <Link to="/media" className="feature-card">
          <div className="feature-icon">🎬</div>
          <h3>Media элементы</h3>
          <p>picture, source, srcset, video/audio API</p>
        </Link>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>💡 Философия HTML</h3>
          <div style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
            <p><strong>Progressive Enhancement:</strong> Контент доступен всегда, JS улучшает UX</p>
            <p style={{ marginTop: '8px' }}><strong>Semantic Markup:</strong> Смысл важнее внешнего вида</p>
            <p style={{ marginTop: '8px' }}><strong>Accessibility First:</strong> Доступность не опция, а требование</p>
          </div>
        </div>

        <div className="card">
          <h3>🔗 Ресурсы</h3>
          <ul className="info-list">
            <li><a href="https://html.spec.whatwg.org/" target="_blank" style={{ color: 'var(--accent)' }}>WHATWG HTML Living Standard</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" style={{ color: 'var(--accent)' }}>MDN Web Docs - HTML</a></li>
            <li><a href="https://caniuse.com/" target="_blank" style={{ color: 'var(--accent)' }}>Can I Use</a></li>
            <li><a href="https://web.dev/" target="_blank" style={{ color: 'var(--accent)' }}>web.dev by Google</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
