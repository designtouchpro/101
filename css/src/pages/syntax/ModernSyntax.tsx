import { useState } from 'react'
import CodeBlock from '@/components/CodeBlock'

export default function ModernSyntax() {
  const [r, setR] = useState(100)
  const [g, setG] = useState(150)
  const [b, setB] = useState(255)
  const [alpha, setAlpha] = useState(100)

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          🆕 Новый синтаксис CSS
          <span className="year-badge">2020+</span>
        </h1>
        <p>Что изменилось в синтаксисе с 2012 года</p>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🎯</span>
        <div className="info-box-content">
          <div className="info-box-title">Синтаксис эволюционировал</div>
          <p>
            CSS стал чище и логичнее. Меньше запятых, больше пробелов,
            новые ключевые слова и функции.
          </p>
        </div>
      </div>

      {/* RGB/RGBA new syntax */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎨 rgb() / rgba() — новый синтаксис</h3>
        </div>

        <div className="control-grid">
          <div className="control-item">
            <label>R: {r}</label>
            <input type="range" min="0" max="255" value={r} onChange={(e) => setR(Number(e.target.value))} />
          </div>
          <div className="control-item">
            <label>G: {g}</label>
            <input type="range" min="0" max="255" value={g} onChange={(e) => setG(Number(e.target.value))} />
          </div>
          <div className="control-item">
            <label>B: {b}</label>
            <input type="range" min="0" max="255" value={b} onChange={(e) => setB(Number(e.target.value))} />
          </div>
          <div className="control-item">
            <label>Alpha: {alpha}%</label>
            <input type="range" min="0" max="100" value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
          <div>
            <h4 style={{ marginBottom: '8px', color: 'var(--accent-react)' }}>❌ Старый синтаксис (2012)</h4>
            <div 
              style={{ 
                height: '80px', 
                background: `rgba(${r}, ${g}, ${b}, ${alpha / 100})`,
                borderRadius: '8px',
                marginBottom: '8px'
              }} 
            />
            <code style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              rgba({r}, {g}, {b}, {(alpha / 100).toFixed(2)})
            </code>
          </div>
          <div>
            <h4 style={{ marginBottom: '8px', color: 'var(--accent-vue)' }}>✅ Новый синтаксис (2020+)</h4>
            <div 
              style={{ 
                height: '80px', 
                background: `rgb(${r} ${g} ${b} / ${alpha}%)`,
                borderRadius: '8px',
                marginBottom: '8px'
              }} 
            />
            <code style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              rgb({r} {g} {b} / {alpha}%)
            </code>
          </div>
        </div>

        <CodeBlock code={`/* ❌ Старый синтаксис — всё ещё работает */
.old {
  color: rgb(255, 100, 50);
  background: rgba(255, 100, 50, 0.5);
}

/* ✅ Новый синтаксис — рекомендуется */
.new {
  color: rgb(255 100 50);
  background: rgb(255 100 50 / 50%);
  /* или */
  background: rgb(255 100 50 / 0.5);
}

/* Работает и для hsl! */
.hsl-old { color: hsla(120, 100%, 50%, 0.5); }
.hsl-new { color: hsl(120 100% 50% / 50%); }`} title="📝 Сравнение" />
      </div>

      {/* CSS Nesting */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            🪆 CSS Nesting
            <span className="year-badge" style={{ marginLeft: '12px' }}>2023</span>
          </h3>
        </div>

        <div className="info-box success">
          <span className="info-box-icon">🎉</span>
          <div className="info-box-content">
            <div className="info-box-title">Больше не нужен SASS только для вложенности!</div>
            <p>Нативный nesting в CSS — одна из самых ожидаемых фич.</p>
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: '20px' }}>
          <div>
            <h4 style={{ marginBottom: '8px', color: 'var(--accent-react)' }}>❌ Старый способ</h4>
            <CodeBlock code={`.card { ... }
.card:hover { ... }
.card .title { ... }
.card .title:hover { ... }
.card .description { ... }

@media (min-width: 768px) {
  .card { ... }
  .card .title { ... }
}`} />
          </div>
          <div>
            <h4 style={{ marginBottom: '8px', color: 'var(--accent-vue)' }}>✅ CSS Nesting</h4>
            <CodeBlock code={`.card {
  ...
  
  &:hover { ... }
  
  .title {
    ...
    &:hover { ... }
  }
  
  .description { ... }
  
  @media (min-width: 768px) {
    ...
    .title { ... }
  }
}`} />
          </div>
        </div>

        <CodeBlock code={`/* Реальный пример */
.button {
  padding: 12px 24px;
  background: var(--accent);
  border: none;
  border-radius: 8px;
  
  &:hover {
    background: var(--accent-hover);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Вложенные элементы */
  .icon {
    margin-right: 8px;
  }
  
  /* Модификаторы */
  &.primary { background: blue; }
  &.secondary { background: gray; }
  
  /* Media queries внутри! */
  @media (max-width: 640px) {
    width: 100%;
  }
}`} title="📝 Полный пример" />
      </div>

      {/* @layer */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            📚 @layer — Cascade Layers
            <span className="year-badge" style={{ marginLeft: '12px' }}>2022</span>
          </h3>
        </div>

        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Управление каскадом без войны специфичности!
        </p>

        <CodeBlock code={`/* Определяем порядок слоёв */
@layer reset, base, components, utilities;

/* Стили в слоях */
@layer reset {
  * { margin: 0; padding: 0; }
}

@layer base {
  body { font-family: system-ui; }
  a { color: blue; }
}

@layer components {
  .button { 
    padding: 12px 24px;
    /* Этот стиль "победит" @layer base */
  }
}

@layer utilities {
  .hidden { display: none !important; }
  .mt-4 { margin-top: 1rem; }
}

/* Стили БЕЗ @layer имеют высший приоритет */
.override {
  /* Победит всё из слоёв */
}`} title="📝 Cascade Layers" />

        <div className="info-box" style={{ marginTop: '16px' }}>
          <span className="info-box-icon">💡</span>
          <div className="info-box-content">
            <div className="info-box-title">Зачем нужно?</div>
            <p>
              Tailwind utilities всегда должны побеждать component стили.
              С @layer это работает автоматически, без !important.
            </p>
          </div>
        </div>
      </div>

      {/* @property */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            ⚙️ @property — Typed CSS Variables
            <span className="year-badge" style={{ marginLeft: '12px' }}>2022</span>
          </h3>
        </div>

        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Регистрация custom properties с типом — теперь их можно анимировать!
        </p>

        <style>{`
          @property --gradient-angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
          }
          
          .animated-gradient {
            --gradient-angle: 0deg;
            background: linear-gradient(var(--gradient-angle), #667eea, #764ba2, #f093fb);
            animation: rotate-gradient 3s linear infinite;
          }
          
          @keyframes rotate-gradient {
            to { --gradient-angle: 360deg; }
          }
        `}</style>

        <div 
          className="animated-gradient"
          style={{
            height: '120px',
            borderRadius: '12px',
            marginBottom: '20px'
          }}
        />

        <CodeBlock code={`/* Регистрируем переменную с типом */
@property --gradient-angle {
  syntax: '<angle>';      /* Тип: угол */
  initial-value: 0deg;    /* Начальное значение */
  inherits: false;        /* Не наследуется */
}

.animated-gradient {
  background: linear-gradient(
    var(--gradient-angle), 
    #667eea, #764ba2, #f093fb
  );
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  to { --gradient-angle: 360deg; }
}

/* Без @property градиент нельзя анимировать! */

/* Доступные типы syntax: */
/* <number>, <integer>, <length>, <percentage> */
/* <color>, <angle>, <time>, <resolution> */
/* <length-percentage>, <custom-ident>, * (any) */`} title="📝 @property" />
      </div>

      {/* @scope */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            🎯 @scope — Scoped Styles
            <span className="year-badge" style={{ marginLeft: '12px' }}>2024</span>
          </h3>
        </div>

        <CodeBlock code={`/* Стили только внутри .card */
@scope (.card) {
  .title { font-size: 1.5rem; }
  .description { color: gray; }
  a { color: blue; }
}

/* С ограничением "до" */
@scope (.card) to (.card-footer) {
  /* Стили внутри .card, но НЕ внутри .card-footer */
  p { margin: 1rem 0; }
}

/* Идеально для компонентов! */
@scope (.sidebar) {
  nav { ... }
  a { ... }
  .icon { ... }
  /* Не повлияет на nav/a/icon вне .sidebar */
}`} title="📝 @scope" />
      </div>

      {/* New pseudo-classes */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎭 Новые псевдо-классы</h3>
        </div>

        <CodeBlock code={`/* :focus-visible — фокус только с клавиатуры (2020) */
button:focus { outline: none; }       /* Убираем для всех */
button:focus-visible { 
  outline: 2px solid blue;            /* Показываем для клавиатуры */
}

/* :is() — группировка без повышения специфичности? Нет! */
/* :is() берёт МАКСИМАЛЬНУЮ специфичность из списка */
:is(h1, h2, h3, h4) { color: blue; }

/* :where() — то же, но специфичность ВСЕГДА 0 */
:where(h1, h2, h3, h4) { color: blue; }

/* :not() теперь принимает список! (2020+) */
.item:not(.active, .disabled) { ... }
/* Раньше: .item:not(.active):not(.disabled) */

/* :has() — родительский селектор (2022) */
.card:has(img) { ... }

/* :empty — пустой элемент */
.container:empty { display: none; }

/* :placeholder-shown — инпут с плейсхолдером */
input:placeholder-shown + label { ... }

/* :user-valid / :user-invalid (2023) */
/* Показывает валидацию только после взаимодействия */
input:user-invalid { border-color: red; }

/* :fullscreen */
video:fullscreen { ... }

/* :modal — для <dialog> */
dialog:modal { ... }

/* :autofill — автозаполнение браузера */
input:autofill { background: yellow; }`} title="📝 Псевдо-классы" />
      </div>

      {/* New pseudo-elements */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">✨ Новые псевдо-элементы</h3>
        </div>

        <CodeBlock code={`/* ::marker — стилизация маркеров списка (2020) */
li::marker {
  color: blue;
  font-size: 1.2em;
  content: '→ ';
}

/* ::backdrop — фон для модалок и fullscreen (2022) */
dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

video:fullscreen::backdrop {
  background: black;
}

/* ::selection — стилизация выделения */
::selection {
  background: #264de4;
  color: white;
}

/* ::placeholder */
input::placeholder {
  color: #999;
  font-style: italic;
}

/* ::file-selector-button — кнопка выбора файла */
input[type="file"]::file-selector-button {
  background: blue;
  color: white;
  border: none;
  padding: 8px 16px;
}`} title="📝 Псевдо-элементы" />
      </div>

      {/* New values & keywords */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔤 Новые значения и ключевые слова</h3>
        </div>

        <CodeBlock code={`/* Ключевые слова для сброса */
.reset {
  all: unset;       /* Сбросить всё до initial/inherited */
  all: revert;      /* Вернуть к user-agent стилям */
  all: revert-layer; /* Вернуть к предыдущему @layer */
}

/* currentColor — уже давно, но напоминаю */
.icon {
  fill: currentColor; /* Наследует color родителя */
  border: 1px solid currentColor;
}

/* color-scheme — светлая/тёмная тема */
:root {
  color-scheme: light dark;
}
/* Браузер автоматически стилизует скроллбары, 
   инпуты и другие нативные элементы */

/* accent-color — цвет нативных контролов (2021) */
:root {
  accent-color: #264de4;
}
/* Чекбоксы, радио, range, progress 
   будут использовать этот цвет */

/* caret-color — цвет курсора в инпуте */
input {
  caret-color: red;
}

/* text-wrap: balance / pretty (2023) */
h1 {
  text-wrap: balance; /* Равномерные строки */
}
p {
  text-wrap: pretty;  /* Без висячих предлогов */
}

/* white-space: pre-wrap vs break-spaces */
.code {
  white-space: pre-wrap;   /* Сохранить пробелы, переносить */
  white-space: break-spaces; /* + пробелы в конце переносятся */
}

/* overflow: clip — без скроллбара */
.box {
  overflow: clip; /* Как hidden, но без scroll-container */
}

/* display: contents — "убрать" элемент из layout */
.wrapper {
  display: contents; /* Дети ведут себя как без wrapper */
}`} title="📝 Ключевые слова" />
      </div>

      {/* New at-rules */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📜 Новые @-правила</h3>
        </div>

        <CodeBlock code={`/* @supports — проверка поддержки (2013) */
@supports (display: grid) {
  .container { display: grid; }
}

@supports not (backdrop-filter: blur(10px)) {
  .modal { background: rgba(0,0,0,0.9); }
}

@supports selector(:has(*)) {
  /* Браузер поддерживает :has() */
}

/* @container — container queries (2022) */
@container (min-width: 400px) {
  .card { flex-direction: row; }
}

/* @media — новые возможности */
@media (prefers-color-scheme: dark) { ... }
@media (prefers-reduced-motion: reduce) { ... }
@media (prefers-contrast: high) { ... }
@media (hover: hover) { ... }
@media (pointer: coarse) { /* тачскрин */ }

/* Range syntax для media queries (2022) */
@media (width >= 768px) { ... }
@media (400px <= width <= 800px) { ... }
/* Вместо: (min-width: 400px) and (max-width: 800px) */

/* @font-face улучшения */
@font-face {
  font-family: 'MyFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;        /* Показать fallback сразу */
  size-adjust: 110%;         /* Подогнать размер */
  ascent-override: 90%;      /* Настроить метрики */
  descent-override: 20%;
}

/* @keyframes — уже было, но напоминаю */
@keyframes slide {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}`} title="📝 @-правила" />
      </div>

      {/* New properties */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🆕 Новые свойства</h3>
        </div>

        <CodeBlock code={`/* inset — shorthand для позиционирования (2020) */
.overlay {
  position: fixed;
  inset: 0;                    /* = top/right/bottom/left: 0 */
  inset: 10px 20px;            /* = top/bottom: 10px, left/right: 20px */
  inset-block: 10px;           /* top + bottom */
  inset-inline: 20px;          /* left + right */
}

/* gap для flexbox! (2020) */
.flex {
  display: flex;
  gap: 16px;                   /* Раньше только для grid */
  row-gap: 8px;
  column-gap: 16px;
}

/* place-* shorthands */
.grid {
  place-items: center;         /* = align-items + justify-items */
  place-content: center;       /* = align-content + justify-content */
  place-self: center;          /* = align-self + justify-self */
}

/* scroll-behavior */
html {
  scroll-behavior: smooth;     /* Плавный скролл */
}

/* overscroll-behavior */
.modal {
  overscroll-behavior: contain; /* Не скроллить родителя */
}

/* scroll-margin & scroll-padding */
section {
  scroll-margin-top: 80px;     /* Отступ при scroll-snap или anchor */
}

/* object-fit & object-position */
img {
  object-fit: cover;           /* Как background-size */
  object-position: top;        /* Как background-position */
}

/* contain — оптимизация рендеринга */
.widget {
  contain: layout;             /* Изолировать layout */
  contain: paint;              /* Изолировать paint */
  contain: strict;             /* Всё вместе */
  content-visibility: auto;    /* Ленивый рендеринг */
}

/* touch-action */
.draggable {
  touch-action: none;          /* Отключить жесты браузера */
}

.horizontal-scroll {
  touch-action: pan-x;         /* Только горизонтальный скролл */
}

/* user-select */
.no-select {
  user-select: none;           /* Нельзя выделить */
}

/* pointer-events */
.disabled {
  pointer-events: none;        /* Игнорировать клики */
}

/* resize */
textarea {
  resize: vertical;            /* Только по вертикали */
  resize: none;                /* Нельзя ресайзить */
}`} title="📝 Новые свойства" />
      </div>

      {/* Summary table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📊 Хронология синтаксиса</h3>
        </div>

        <table className="comparison-table">
          <thead>
            <tr>
              <th>Год</th>
              <th>Что появилось</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>2012</strong></td>
              <td>Flexbox (префиксы), @keyframes, transform, transition</td>
            </tr>
            <tr>
              <td><strong>2015</strong></td>
              <td>CSS Variables (--var), calc()</td>
            </tr>
            <tr>
              <td><strong>2017</strong></td>
              <td>CSS Grid, object-fit</td>
            </tr>
            <tr>
              <td><strong>2019</strong></td>
              <td>Scroll Snap, gap для flexbox</td>
            </tr>
            <tr>
              <td><strong>2020</strong></td>
              <td>:is(), :where(), ::marker, inset, aspect-ratio, rgb() новый синтаксис</td>
            </tr>
            <tr>
              <td><strong>2021</strong></td>
              <td>accent-color, :focus-visible</td>
            </tr>
            <tr>
              <td><strong>2022</strong></td>
              <td>:has(), @container, @layer, @property, oklch(), color-mix()</td>
            </tr>
            <tr>
              <td><strong>2023</strong></td>
              <td>CSS Nesting, Subgrid, text-wrap: balance, :user-valid</td>
            </tr>
            <tr>
              <td><strong>2024</strong></td>
              <td>@scope, @starting-style, View Transitions, light-dark()</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
