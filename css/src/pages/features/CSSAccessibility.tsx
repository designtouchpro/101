import CodeBlock from '@/components/CodeBlock'

export default function CSSAccessibility() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          ♿ Доступность в CSS
          <span className="year-badge">2020+</span>
        </h1>
        <p>
          Медиа-запросы предпочтений, фокус, скрытие контента, <code>forced-colors</code> и motion-safe паттерны.
        </p>
        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion" className="mdn-link" target="_blank" rel="noopener noreferrer">
          📚 MDN: prefers-reduced-motion
        </a>
      </div>

      <ReducedMotionSection />
      <FocusVisibleSection />
      <ContrastSection />
      <ForcedColorsSection />
      <VisuallyHiddenSection />
      <MotionSafePatterns />
      <ChecklistSection />
    </div>
  )
}

/* ─── prefers-reduced-motion ──────────────────────────── */

function ReducedMotionSection() {
  const code = `/* Подход 1: Отключить анимации для тех, кто просит */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Подход 2 (рекомендуемый): Добавлять анимации только когда ОК */
.card {
  opacity: 1;  /* Базовое состояние без анимации */
}

@media (prefers-reduced-motion: no-preference) {
  .card {
    animation: fadeIn 0.3s ease-out;
  }
}

/* ❌ Плохо: анимация по умолчанию, потом убираем */
.card { animation: fadeIn 0.3s ease-out; }
@media (prefers-reduced-motion: reduce) {
  .card { animation: none; }
}`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🎬 prefers-reduced-motion</h3>
      </div>
      <p>
        ~10% пользователей включают уменьшение движения (вестибулярные нарушения, укачивание, мигрень).
        Подход <strong>motion-safe</strong> — добавляем анимацию только когда пользователь не против.
      </p>

      <CodeBlock code={code} title="📝 Два подхода к управлению анимациями" />

      <div className="info-box" style={{ marginTop: '12px' }}>
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">Motion-safe по умолчанию</div>
          Начинайте с <strong>no-animation</strong> базы, добавляйте через <code>@media (prefers-reduced-motion: no-preference)</code>.
          Так пользователи с reduce-motion видят рабочую страницу даже если вы забудете написать reduce-медиа.
        </div>
      </div>
    </div>
  )
}

/* ─── :focus-visible ──────────────────────────────────── */

function FocusVisibleSection() {
  const code = `/* :focus-visible — фокус только при клавиатурной навигации */
/* Клик мышью НЕ покажет outline, Tab — покажет */

/* Убираем стандартный outline для мыши */
:focus:not(:focus-visible) {
  outline: none;
}

/* Стилизуем клавиатурный фокус */
:focus-visible {
  outline: 3px solid var(--color-accent, #4f8cff);
  outline-offset: 2px;
  border-radius: 4px;
}

/* ❌ НИКОГДА не делайте так */
*:focus { outline: none; }
/* Это полностью убивает навигацию с клавиатуры */

/* Кастомный фокус для интерактивных элементов */
button:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(79, 140, 255, 0.15);
}

a:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 4px;
  text-decoration: underline;
}`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🎯 :focus-visible — умный фокус</h3>
      </div>
      <p>
        <code>:focus-visible</code> решает вечный конфликт: дизайнеры хотят убрать outline при клике,
        а незрячие пользователи не могут работать без видимого фокуса. Теперь можно и то, и другое.
      </p>

      <CodeBlock code={code} title="📝 Стилизация клавиатурного фокуса" />

      <div className="info-box" style={{ marginTop: '12px' }}>
        <span className="info-box-icon">⚠️</span>
        <div className="info-box-content">
          <div className="info-box-title">Правило</div>
          Фокусный индикатор должен быть <strong>всегда виден</strong> при Tab-навигации.
          WCAG 2.4.7 требует, чтобы контраст обводки был минимум <strong>3:1</strong> относительно фона.
        </div>
      </div>
    </div>
  )
}

/* ─── prefers-contrast + prefers-color-scheme ─────────── */

function ContrastSection() {
  const code = `/* prefers-contrast — пользователь хочет больше/меньше контраста */
@media (prefers-contrast: more) {
  :root {
    --border-color: #000;
    --text-secondary: #333;
  }
  .card {
    border: 2px solid #000;
  }
  .subtle-text {
    color: #333;  /* Усиливаем бледный текст */
  }
}

@media (prefers-contrast: less) {
  :root {
    --border-color: #ddd;
  }
}

/* prefers-color-scheme — тёмная/светлая тема */
:root {
  color-scheme: light dark;  /* Поддержка обеих схем */

  --bg: #ffffff;
  --text: #1a1a1a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0a0a0a;
    --text: #e5e5e5;
  }
}

/* light-dark() — новая функция (2024) */
.card {
  background: light-dark(#fff, #1a1a1a);
  color: light-dark(#333, #ddd);
  border: 1px solid light-dark(#e0e0e0, #333);
}

/* WCAG AA контраст: */
/* Обычный текст ≥ 4.5:1 */
/* Крупный текст (≥18pt / ≥14pt bold) ≥ 3:1 */
/* UI-компоненты и графика ≥ 3:1 */`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🔲 Контраст и цветовые схемы</h3>
      </div>
      <p>
        <code>prefers-contrast</code> и <code>prefers-color-scheme</code> позволяют
        адаптировать визуал под потребности пользователя.
      </p>

      <CodeBlock code={code} title="📝 Адаптация контраста и темы" />
    </div>
  )
}

/* ─── forced-colors ───────────────────────────────────── */

function ForcedColorsSection() {
  const code = `/* Windows High Contrast Mode — forced-colors */
/* Браузер ЗАМЕНЯЕТ ваши цвета системными */
/* Кастомные стили ломают: тени, градиенты, bg-image, opacity */

@media (forced-colors: active) {
  /* Системные цвета — единственные, что работают */
  .custom-checkbox {
    border: 2px solid ButtonText;
    /* ButtonText, Canvas, CanvasText, LinkText, */
    /* HighlightText, Highlight, GrayText, Field, FieldText */
  }

  /* Восстанавливаем скрытый контент */
  .icon-button svg {
    forced-color-adjust: auto;
  }

  /* Полностью отключить принудительные цвета для элемента */
  /* ⚠️ Используйте ТОЛЬКО когда абсолютно необходимо */
  .color-picker {
    forced-color-adjust: none;
  }
}

/* Что ломается в forced-colors: */
/* ❌ box-shadow → исчезает */
/* ❌ background-image → исчезает */
/* ❌ background-color → заменяется Canvas */
/* ❌ color → заменяется CanvasText */
/* ❌ border-color → заменяется ButtonText */
/* ❌ opacity < 1 → может стать невидимым */
/* ❌ SVG fill/stroke → заменяются */`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🪟 forced-colors — Windows High Contrast</h3>
      </div>
      <p>
        Windows High Contrast Mode переопределяет ваши цвета системными.
        Если вы не тестируете в <code>forced-colors</code> — кнопки могут стать невидимыми.
      </p>

      <CodeBlock code={code} title="📝 Поддержка forced-colors" />
    </div>
  )
}

/* ─── Visually hidden ─────────────────────────────────── */

function VisuallyHiddenSection() {
  const code = `/* Скрыть визуально, но оставить для скринридера */
.visually-hidden,
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

/* Если элемент может получить фокус — показать при фокусе */
.visually-hidden:focus,
.visually-hidden:focus-within {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip-path: none;
  white-space: normal;
}

/* Примеры использования */
<label class="visually-hidden" for="search">Поиск по сайту</label>
<input id="search" type="search" placeholder="Поиск..." />

<a href="/profile">
  <img src="avatar.png" alt="" />
  <span class="visually-hidden">Профиль пользователя</span>
</a>

/* ❌ Не используйте для скрытия от скринридеров */
/* display: none — скрывает от ВСЕХ, включая скринридеры */
/* visibility: hidden — скрывает от ВСЕХ */
/* aria-hidden="true" — скрывает от скринридера, видно визуально */`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">👁️ Visually Hidden — скрытый контент</h3>
      </div>
      <p>
        Паттерн <code>.visually-hidden</code> / <code>.sr-only</code> — элемент невидим на экране,
        но озвучивается скринридером. Критично для лейблов, инструкций и skip-ссылок.
      </p>

      <CodeBlock code={code} title="📝 Visually-hidden паттерн" />

      <h4 style={{ marginTop: '16px' }}>Когда что использовать:</h4>
      <table className="comparison-table" style={{ width: '100%', marginTop: '8px' }}>
        <thead>
          <tr>
            <th>Способ</th>
            <th>Визуально</th>
            <th>Скринридер</th>
            <th>Фокус</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>display: none</code></td><td>Скрыт</td><td>Скрыт</td><td>Нет</td></tr>
          <tr><td><code>visibility: hidden</code></td><td>Скрыт (место занято)</td><td>Скрыт</td><td>Нет</td></tr>
          <tr><td><code>aria-hidden="true"</code></td><td>Виден</td><td>Скрыт</td><td>Да ⚠️</td></tr>
          <tr><td><code>.visually-hidden</code></td><td>Скрыт</td><td>Виден ✅</td><td>Нет*</td></tr>
          <tr><td><code>opacity: 0</code></td><td>Скрыт</td><td>Виден</td><td>Да ⚠️</td></tr>
        </tbody>
      </table>
      <p style={{ fontSize: '0.85em', marginTop: '4px' }}>
        * С модификатором <code>:focus</code> можно показывать при фокусе (skip-ссылки)
      </p>
    </div>
  )
}

/* ─── Motion-safe patterns ────────────────────────────── */

function MotionSafePatterns() {
  const code = `/* === Шаблон: motion-safe карточка === */
.card {
  /* Базовое состояние — без анимации */
  transform: none;
  opacity: 1;
}

@media (prefers-reduced-motion: no-preference) {
  .card {
    /* Анимация только когда пользователь не против */
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
}

/* === Шаблон: безопасная загрузочная анимация === */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.section {
  opacity: 1; /* Fallback */
}

@media (prefers-reduced-motion: no-preference) {
  .section {
    animation: fadeIn 0.4s ease-out both;
  }
  .section:nth-child(2) { animation-delay: 0.1s; }
  .section:nth-child(3) { animation-delay: 0.2s; }
}

/* === Шаблон: безопасный scroll-behavior === */
html {
  scroll-behavior: auto; /* Базовое */
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

/* === Шаблон: skeleton loader → без пульсации === */
.skeleton {
  background: var(--skeleton-bg, #e0e0e0);
}

@media (prefers-reduced-motion: no-preference) {
  .skeleton {
    background: linear-gradient(
      90deg,
      var(--skeleton-bg) 25%,
      var(--skeleton-highlight, #f0f0f0) 50%,
      var(--skeleton-bg) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
}

@keyframes shimmer {
  to { background-position: -200% 0; }
}`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🛡️ Motion-safe паттерны</h3>
      </div>
      <p>Готовые шаблоны для типовых сценариев, которые безопасны по умолчанию.</p>

      <CodeBlock code={code} title="📝 Шаблоны motion-safe анимаций" />
    </div>
  )
}

/* ─── Checklist ───────────────────────────────────────── */

function ChecklistSection() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">✅ CSS A11y чеклист</h3>
      </div>

      <ol className="info-list">
        <li><code>:focus-visible</code> стилизован на всех интерактивных элементах</li>
        <li><code>outline: none</code> нигде не убран без замены</li>
        <li>Анимации обёрнуты в <code>@media (prefers-reduced-motion: no-preference)</code></li>
        <li><code>scroll-behavior: smooth</code> — только внутри motion-safe медиа</li>
        <li>Цветовой контраст ≥ 4.5:1 для текста, ≥ 3:1 для UI</li>
        <li>Тёмная тема через <code>prefers-color-scheme</code> или <code>color-scheme</code></li>
        <li><code>forced-colors</code> протестирован (Windows High Contrast)</li>
        <li>Декоративные SVG/иконки помечены <code>aria-hidden="true"</code></li>
        <li>Skip-ссылка использует <code>.visually-hidden:focus</code></li>
        <li>Текст остаётся читаемым при 200% зуме (нет overflow: hidden на текстовых блоках)</li>
        <li>Цвет не единственный индикатор (ошибки, статусы, ссылки)</li>
        <li>Touch-target размер ≥ 44×44px (WCAG 2.5.8)</li>
      </ol>

      <div className="info-box" style={{ marginTop: '16px' }}>
        <span className="info-box-icon">🧪</span>
        <div className="info-box-content">
          <div className="info-box-title">Инструменты проверки</div>
          <ul className="info-list">
            <li><strong>Chrome DevTools → Rendering</strong> — эмулировать prefers-reduced-motion, prefers-color-scheme, forced-colors</li>
            <li><strong>Lighthouse Accessibility</strong> — автоматический аудит контраста и фокуса</li>
            <li><strong>axe DevTools</strong> — расширение для детального аудита</li>
            <li><strong>Windows High Contrast</strong> — тестировать forced-colors реально</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
