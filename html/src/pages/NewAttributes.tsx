import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

interface AttributeInfo {
  name: string
  elements: string[]
  description: string
  support: 'full' | 'partial' | 'new'
  year: number
  category: 'performance' | 'ux' | 'a11y' | 'animation' | 'form' | 'content'
}

// Сортировка: новые сверху (по году), внутри года — по алфавиту
const newAttributes: AttributeInfo[] = [
  // 2024+
  {
    name: 'command / commandfor',
    elements: ['button'],
    description: 'Invoker Commands — декларативное управление dialog/popover',
    support: 'new',
    year: 2024,
    category: 'ux'
  },
  {
    name: 'writingsuggestions',
    elements: ['input', 'textarea', 'contenteditable'],
    description: 'Контроль AI-подсказок браузера при вводе текста',
    support: 'new',
    year: 2024,
    category: 'form'
  },
  // 2023
  {
    name: 'blocking',
    elements: ['link', 'script', 'style'],
    description: 'Блокирует рендеринг до загрузки ресурса',
    support: 'partial',
    year: 2023,
    category: 'performance'
  },
  {
    name: 'fetchpriority',
    elements: ['img', 'link', 'script', 'iframe'],
    description: 'Приоритет загрузки ресурса — high, low, auto',
    support: 'full',
    year: 2023,
    category: 'performance'
  },
  {
    name: 'popover',
    elements: ['любой элемент'],
    description: 'Превращает элемент в popover (auto/manual)',
    support: 'full',
    year: 2023,
    category: 'ux'
  },
  {
    name: 'popovertarget',
    elements: ['button', 'input[type=button]'],
    description: 'ID popover для управления',
    support: 'full',
    year: 2023,
    category: 'ux'
  },
  {
    name: 'popovertargetaction',
    elements: ['button', 'input[type=button]'],
    description: 'Действие: toggle/show/hide',
    support: 'full',
    year: 2023,
    category: 'ux'
  },
  // 2022
  {
    name: 'hidden="until-found"',
    elements: ['любой элемент'],
    description: 'Скрыт пока пользователь не найдёт через Ctrl+F',
    support: 'partial',
    year: 2022,
    category: 'ux'
  },
  {
    name: 'inert',
    elements: ['любой элемент'],
    description: 'Делает элемент и потомков неинтерактивными',
    support: 'full',
    year: 2022,
    category: 'a11y'
  },
  // 2020
  {
    name: 'decoding',
    elements: ['img'],
    description: 'Как декодировать изображение — sync, async, auto',
    support: 'full',
    year: 2020,
    category: 'performance'
  },
  {
    name: 'enterkeyhint',
    elements: ['input', 'textarea', 'contenteditable'],
    description: 'Текст на клавише Enter на мобильной клавиатуре',
    support: 'full',
    year: 2020,
    category: 'form'
  },
  // 2019
  {
    name: 'inputmode',
    elements: ['input', 'textarea', 'contenteditable'],
    description: 'Тип мобильной клавиатуры (numeric, email, tel...)',
    support: 'full',
    year: 2019,
    category: 'form'
  },
  {
    name: 'loading',
    elements: ['img', 'iframe'],
    description: 'Ленивая загрузка — lazy/eager',
    support: 'full',
    year: 2019,
    category: 'performance'
  },
  // 2014 (HTML5)
  {
    name: 'autocomplete',
    elements: ['input', 'form', 'select', 'textarea'],
    description: 'Подсказки браузера для автозаполнения',
    support: 'full',
    year: 2014,
    category: 'form'
  },
  {
    name: 'contenteditable',
    elements: ['любой элемент'],
    description: 'Редактируемый контент. plaintext-only — без форматирования',
    support: 'full',
    year: 2014,
    category: 'content'
  },
  {
    name: 'draggable',
    elements: ['любой элемент'],
    description: 'Сделать элемент перетаскиваемым',
    support: 'full',
    year: 2014,
    category: 'ux'
  },
  {
    name: 'spellcheck',
    elements: ['input', 'textarea', 'contenteditable'],
    description: 'Включить/выключить проверку орфографии',
    support: 'full',
    year: 2014,
    category: 'form'
  },
  {
    name: 'translate',
    elements: ['любой элемент'],
    description: 'Разрешить/запретить перевод браузером',
    support: 'full',
    year: 2014,
    category: 'content'
  },
]

const autocompleteValues = [
  { value: 'name', desc: 'Полное имя' },
  { value: 'given-name', desc: 'Имя' },
  { value: 'family-name', desc: 'Фамилия' },
  { value: 'email', desc: 'Email адрес' },
  { value: 'tel', desc: 'Телефон' },
  { value: 'street-address', desc: 'Улица' },
  { value: 'postal-code', desc: 'Индекс' },
  { value: 'cc-name', desc: 'Имя на карте' },
  { value: 'cc-number', desc: 'Номер карты' },
  { value: 'cc-exp', desc: 'Срок действия' },
  { value: 'one-time-code', desc: 'OTP код' },
  { value: 'new-password', desc: 'Новый пароль' },
  { value: 'current-password', desc: 'Текущий пароль' },
]

const enterkeyhintValues = [
  { value: 'enter', icon: '↵', desc: 'Стандартный Enter' },
  { value: 'done', icon: '✓', desc: 'Готово' },
  { value: 'go', icon: '→', desc: 'Перейти' },
  { value: 'next', icon: '→', desc: 'Далее' },
  { value: 'previous', icon: '←', desc: 'Назад' },
  { value: 'search', icon: '🔍', desc: 'Поиск' },
  { value: 'send', icon: '➤', desc: 'Отправить' },
]

const categoryLabels: Record<string, { icon: string; label: string }> = {
  performance: { icon: '⚡', label: 'Производительность' },
  ux: { icon: '✨', label: 'UX' },
  a11y: { icon: '♿', label: 'Доступность' },
  animation: { icon: '🎬', label: 'Анимации' },
  form: { icon: '📝', label: 'Формы' },
  content: { icon: '📄', label: 'Контент' },
}

export default function NewAttributes() {
  const [inertDemo, setInertDemo] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredAttributes = selectedCategory 
    ? newAttributes.filter(a => a.category === selectedCategory)
    : newAttributes

  return (
    <div className="page-container">
      <h1>🏷️ Новые атрибуты HTML</h1>
      <p className="page-description">
        Современные атрибуты HTML5+, отсортированные по году появления (новые сверху).
        Включая View Transitions, Scroll-driven animations и Popover API.
      </p>

      {/* Category filter */}
      <div className="card">
        <h2>🏷️ Фильтр по категориям</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button 
            className={`btn ${selectedCategory === null ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedCategory(null)}
          >
            Все
          </button>
          {Object.entries(categoryLabels).map(([key, { icon, label }]) => (
            <button
              key={key}
              className={`btn ${selectedCategory === key ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory(key)}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Attributes table */}
      <div className="card">
        <h2>📋 Справочник атрибутов</h2>
        
        <div style={{ overflowX: 'auto' }}>
          <table className="info-table">
            <thead>
              <tr>
                <th>Атрибут</th>
                <th>Элементы</th>
                <th>Категория</th>
                <th>Описание</th>
                <th>Год</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttributes.map(attr => (
                <tr key={attr.name}>
                  <td><code>{attr.name}</code></td>
                  <td style={{ fontSize: '0.85em', color: 'var(--text-secondary)' }}>
                    {attr.elements.join(', ')}
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85em' }}>
                      {categoryLabels[attr.category]?.icon} {categoryLabels[attr.category]?.label}
                    </span>
                  </td>
                  <td>{attr.description}</td>
                  <td>
                    <span className={`tag ${attr.year >= 2023 ? 'new' : attr.year >= 2020 ? 'recent' : ''}`}>
                      {attr.year}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Transitions */}
      <div className="card">
        <h2>🎬 View Transitions API</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          CSS атрибуты и pseudo-элементы для плавных переходов между состояниями/страницами:
        </p>

        <CodeBlock code={`<!-- Включаем View Transitions для MPA -->
<head>
  <meta name="view-transition" content="same-origin">
</head>

<!-- CSS для именованных переходов -->
<style>
  .hero-image {
    view-transition-name: hero;
  }
  
  /* Кастомизация анимации */
  ::view-transition-old(hero) {
    animation: fade-out 0.3s ease-out;
  }
  
  ::view-transition-new(hero) {
    animation: fade-in 0.3s ease-in;
  }
  
  /* Группировка элементов */
  .card {
    view-transition-class: cards;
  }
</style>`} />

        <div className="info-box" style={{ marginTop: '16px' }}>
          <strong>CSS свойства View Transitions:</strong>
          <ul className="info-list">
            <li><code>view-transition-name</code> — уникальное имя для элемента</li>
            <li><code>view-transition-class</code> — группировка элементов (Chrome 125+)</li>
          </ul>
        </div>

        <CodeBlock language="javascript" title="JavaScript API" code={`// SPA transitions
document.startViewTransition(() => {
  // Обновляем DOM
  updateContent();
});

// С промисами
const transition = document.startViewTransition(async () => {
  await fetchNewContent();
  render();
});

// Ждём завершения
await transition.finished;`} />
      </div>

      {/* Scroll-driven Animations */}
      <div className="card">
        <h2>📜 Scroll-driven Animations</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Анимации привязанные к скроллу — без JavaScript!
        </p>

        <CodeBlock language="css" code={`/* Прогресс-бар при скролле страницы */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  transform-origin: left;
  
  /* Привязываем к скроллу */
  animation: grow-progress linear;
  animation-timeline: scroll();
}

@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* Fade-in при появлении в viewport */
.reveal {
  opacity: 0;
  transform: translateY(50px);
  
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`} />

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '12px',
          marginTop: '16px' 
        }}>
          <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <code>animation-timeline: scroll()</code>
            <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)', marginTop: '8px' }}>
              Привязка к скроллу контейнера
            </p>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <code>animation-timeline: view()</code>
            <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)', marginTop: '8px' }}>
              Привязка к видимости элемента
            </p>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <code>animation-range</code>
            <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)', marginTop: '8px' }}>
              Диапазон анимации (entry, exit, contain, cover)
            </p>
          </div>
        </div>

        <CodeBlock title="HTML атрибут timeline-scope" code={`<!-- timeline-scope позволяет использовать timeline из другого элемента -->
<div style="timeline-scope: --my-scroller;">
  
  <!-- Элемент который скроллится -->
  <div style="scroll-timeline: --my-scroller;" class="scroller">
    <div class="content">...</div>
  </div>
  
  <!-- Элемент вне скроллера, но анимируется по его скроллу -->
  <div style="animation-timeline: --my-scroller;" class="progress">
  </div>
  
</div>`} />
      </div>

      {/* Invoker Commands */}
      <div className="card">
        <h2>🎮 Invoker Commands (2024)</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Новый способ декларативно связывать кнопки с интерактивными элементами:
        </p>

        <CodeBlock code={`<!-- Управление dialog -->
<button commandfor="my-dialog" command="show-modal">
  Открыть модалку
</button>

<dialog id="my-dialog">
  <p>Контент диалога</p>
  <button commandfor="my-dialog" command="close">Закрыть</button>
</dialog>

<!-- Управление popover -->
<button commandfor="menu" command="toggle-popover">
  Меню
</button>
<div id="menu" popover>...</div>

<!-- Управление details -->
<button commandfor="faq" command="toggle">
  Показать/скрыть FAQ
</button>
<details id="faq">
  <summary>Заголовок</summary>
  <p>Контент</p>
</details>

<!-- Кастомные команды через JS -->
<button commandfor="player" command="--play-pause">
  Play/Pause
</button>`} />

        <div className="info-box warning" style={{ marginTop: '16px' }}>
          <strong>⚠️ Экспериментально</strong>
          <p style={{ marginTop: '8px' }}>
            Invoker Commands доступны в Chrome 126+ за флагом. Заменят <code>popovertarget</code> в будущем.
          </p>
        </div>
      </div>

      {/* Popover attributes */}
      <div className="card">
        <h2>💬 Popover API атрибуты</h2>

        <CodeBlock code={`<!-- Базовый popover -->
<button popovertarget="info">Показать инфо</button>
<div id="info" popover>
  Всплывающий контент
</div>

<!-- Разные режимы popover -->
<div popover="auto">Закроется при клике вне / Escape</div>
<div popover="manual">Только программно закрывается</div>
<div popover="hint">Для тултипов (Chrome 133+)</div>

<!-- Действия кнопки -->
<button popovertarget="menu" popovertargetaction="toggle">Toggle</button>
<button popovertarget="menu" popovertargetaction="show">Show</button>
<button popovertarget="menu" popovertargetaction="hide">Hide</button>

<!-- Вложенные popovers (работают с auto) -->
<div id="menu" popover>
  <button popovertarget="submenu">Подменю →</button>
  <div id="submenu" popover>Вложенный попап</div>
</div>`} />
      </div>

      {/* Loading attribute */}
      <div className="card">
        <h2>⏳ loading & decoding & fetchpriority</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Три атрибута для оптимизации загрузки изображений:
        </p>

        <CodeBlock code={`<!-- Hero image — максимальный приоритет, немедленная загрузка -->
<img 
  src="hero.jpg" 
  loading="eager"
  decoding="async"
  fetchpriority="high"
  alt="Hero"
>

<!-- Изображения ниже fold — ленивая загрузка, низкий приоритет -->
<img 
  src="gallery-1.jpg" 
  loading="lazy"
  decoding="async"
  fetchpriority="low"
  alt="Gallery"
>

<!-- LCP изображение — preload с высоким приоритетом -->
<link 
  rel="preload" 
  href="hero.webp" 
  as="image"
  fetchpriority="high"
  type="image/webp"
>

<!-- Iframe тоже поддерживает loading -->
<iframe src="widget.html" loading="lazy"></iframe>`} />

        <div className="info-box warning" style={{ marginTop: '16px' }}>
          <strong>⚠️ Core Web Vitals</strong>
          <p style={{ marginTop: '8px' }}>
            Не используй <code>loading="lazy"</code> для LCP элементов выше fold!
            Это ухудшит метрики. Используй <code>fetchpriority="high"</code> вместо этого.
          </p>
        </div>
      </div>

      {/* Inert */}
      <div className="card">
        <h2>🔒 inert — Заблокировать интерактивность</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Атрибут <code>inert</code> делает элемент и всех потомков:
        </p>
        <ul className="info-list">
          <li>Некликабельными</li>
          <li>Недоступными для фокуса (Tab)</li>
          <li>Невидимыми для screen readers</li>
          <li>Не выделяемыми (select text)</li>
        </ul>

        <div className="demo-area">
          <button 
            className="btn btn-primary" 
            onClick={() => setInertDemo(!inertDemo)}
            style={{ marginBottom: '16px' }}
          >
            {inertDemo ? 'Включить секцию' : 'Заблокировать секцию (inert)'}
          </button>

          <div 
            {...(inertDemo ? { inert: true as any } : {})}
            style={{ 
              padding: '20px', 
              background: 'var(--bg-secondary)', 
              borderRadius: '8px',
              opacity: inertDemo ? 0.5 : 1,
              transition: 'opacity 0.3s'
            }}
          >
            <h4 style={{ marginBottom: '12px' }}>Интерактивная секция</h4>
            <input 
              type="text" 
              placeholder="Попробуй ввести..." 
              style={{ 
                padding: '8px', 
                marginBottom: '8px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                color: 'var(--text-primary)'
              }}
            />
            <br />
            <button className="btn btn-secondary">Кнопка внутри</button>
            <a href="#" style={{ marginLeft: '12px', color: 'var(--accent)' }}>Ссылка</a>
          </div>
        </div>

        <CodeBlock code={`<!-- Классический usecase: модальное окно -->
<body>
  <main inert>
    <!-- Основной контент заблокирован -->
  </main>
  
  <dialog open>
    <!-- Модалка активна -->
  </dialog>
</body>

<!-- Скелетон при загрузке -->
<div class="card" inert>
  <div class="skeleton"></div>
</div>`} />
      </div>

      {/* Hidden until-found */}
      <div className="card">
        <h2>🔍 hidden="until-found"</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Контент скрыт, но доступен для поиска через Ctrl+F:
        </p>

        <CodeBlock code={`<!-- Аккордеон с поиском -->
<details>
  <summary>FAQ: Как вернуть товар?</summary>
  <div hidden="until-found">
    Для возврата товара свяжитесь с поддержкой...
    <!-- Этот текст найдётся через Ctrl+F! -->
  </div>
</details>

<!-- Tabbed content -->
<div role="tabpanel" hidden="until-found" id="tab-2">
  Скрытая вкладка, но контент индексируется
</div>`} />

        <div className="info-box" style={{ marginTop: '16px' }}>
          <strong>Событие:</strong> <code>beforematch</code> — срабатывает когда hidden="until-found" 
          элемент раскрывается из-за find-in-page.
        </div>
      </div>

      {/* Enterkeyhint */}
      <div className="card">
        <h2>⌨️ enterkeyhint — Клавиша Enter</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Изменяет текст/иконку на клавише Enter мобильной клавиатуры:
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
          gap: '12px',
          marginBottom: '20px' 
        }}>
          {enterkeyhintValues.map(item => (
            <div key={item.value} style={{ 
              padding: '12px', 
              background: 'var(--bg-tertiary)', 
              borderRadius: '6px',
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '1.5em', marginBottom: '4px' }}>{item.icon}</div>
              <code style={{ display: 'block', fontSize: '0.8em' }}>"{item.value}"</code>
              <span style={{ fontSize: '0.8em', color: 'var(--text-secondary)' }}>{item.desc}</span>
            </div>
          ))}
        </div>

        <CodeBlock code={`<!-- Поиск -->
<input type="search" enterkeyhint="search" placeholder="Поиск...">

<!-- Форма чата -->
<input type="text" enterkeyhint="send" placeholder="Сообщение...">

<!-- Многошаговая форма -->
<input type="text" enterkeyhint="next" placeholder="Имя">
<input type="email" enterkeyhint="next" placeholder="Email">
<input type="tel" enterkeyhint="done" placeholder="Телефон">

<!-- Навигация -->
<input type="url" enterkeyhint="go" placeholder="URL">`} />
      </div>

      {/* Autocomplete */}
      <div className="card">
        <h2>📝 autocomplete — Автозаполнение</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Правильный <code>autocomplete</code> значительно улучшает UX на мобильных:
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
          gap: '8px',
          marginBottom: '20px' 
        }}>
          {autocompleteValues.map(item => (
            <div key={item.value} style={{ 
              padding: '10px', 
              background: 'var(--bg-tertiary)', 
              borderRadius: '6px' 
            }}>
              <code style={{ display: 'block', fontSize: '0.8em' }}>"{item.value}"</code>
              <span style={{ fontSize: '0.8em', color: 'var(--text-secondary)' }}>{item.desc}</span>
            </div>
          ))}
        </div>

        <CodeBlock code={`<!-- Форма оплаты -->
<form autocomplete="on">
  <input autocomplete="cc-name" placeholder="Имя на карте">
  <input autocomplete="cc-number" inputmode="numeric" placeholder="Номер карты">
  <input autocomplete="cc-exp" placeholder="MM/YY">
  <input autocomplete="cc-csc" inputmode="numeric" placeholder="CVV">
</form>

<!-- Секции адреса -->
<input autocomplete="shipping street-address" placeholder="Адрес доставки">
<input autocomplete="billing postal-code" placeholder="Индекс для оплаты">

<!-- OTP код (автоподставится из SMS!) -->
<input 
  type="text" 
  autocomplete="one-time-code" 
  inputmode="numeric"
  placeholder="Код из SMS"
>

<!-- Отключить для sensitive данных -->
<input type="text" autocomplete="off" name="secret-code">`} />
      </div>

      {/* writingsuggestions */}
      <div className="card">
        <h2>🤖 writingsuggestions (2024)</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Контролирует AI-подсказки браузера (grammar, spelling suggestions):
        </p>

        <CodeBlock code={`<!-- Отключить AI подсказки для кода -->
<textarea writingsuggestions="false">
  function hello() { ... }
</textarea>

<!-- Включить (по умолчанию) -->
<textarea writingsuggestions="true" placeholder="Напишите письмо...">
</textarea>

<!-- На родительском элементе -->
<form writingsuggestions="false">
  <!-- Все поля без AI подсказок -->
  <input type="text" name="code">
  <textarea name="json"></textarea>
</form>`} />

        <div className="info-box" style={{ marginTop: '16px' }}>
          <strong>Chrome 133+:</strong> Влияет на AI writing assistance features в браузере.
        </div>
      </div>

      {/* Contenteditable */}
      <div className="card">
        <h2>✏️ contenteditable</h2>
        
        <div className="demo-area">
          <h4 style={{ marginBottom: '12px' }}>contenteditable="true":</h4>
          <div 
            contentEditable 
            suppressContentEditableWarning
            style={{ 
              padding: '16px', 
              background: 'var(--bg-secondary)', 
              borderRadius: '8px',
              minHeight: '80px',
              outline: 'none',
              border: '2px solid transparent'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
            <p>Кликни и редактируй. Можно <b>Ctrl+B</b>, <i>Ctrl+I</i>.</p>
          </div>

          <h4 style={{ margin: '20px 0 12px' }}>contenteditable="plaintext-only":</h4>
          <div 
            contentEditable="plaintext-only"
            suppressContentEditableWarning
            style={{ 
              padding: '16px', 
              background: 'var(--bg-secondary)', 
              borderRadius: '8px',
              minHeight: '60px',
              outline: 'none',
              border: '2px solid transparent',
              fontFamily: 'monospace'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
            Только plain text, никакого форматирования!
          </div>
        </div>

        <CodeBlock code={`<!-- Богатый редактор -->
<div contenteditable="true">
  <p>Форматированный текст</p>
</div>

<!-- Только текст (для кода) -->
<pre contenteditable="plaintext-only">
  const x = 1;
</pre>

<!-- Отключить редактирование потомка -->
<div contenteditable="true">
  Редактируемый текст
  <span contenteditable="false">Защищённый блок</span>
</div>`} />
      </div>

      <style>{`
        .tag {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.8em;
          font-weight: 600;
          background: var(--bg-tertiary);
        }
        .tag.new {
          background: var(--success);
          color: white;
        }
        .tag.recent {
          background: var(--accent);
          color: white;
        }
        .info-table {
          width: 100%;
          border-collapse: collapse;
        }
        .info-table th,
        .info-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid var(--border);
        }
        .info-table th {
          background: var(--bg-tertiary);
          font-weight: 600;
        }
        .info-table tr:hover {
          background: var(--bg-secondary);
        }
        .demo-area {
          padding: 20px;
          background: var(--bg-tertiary);
          border-radius: 12px;
          margin-top: 16px;
        }
        .info-box {
          padding: 16px;
          border-radius: 8px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        .info-box.warning {
          background: rgba(245, 158, 11, 0.1);
          border-color: rgba(245, 158, 11, 0.3);
        }
        .info-box.success {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
        }
        .code-block-wrapper {
          margin-top: 16px;
        }
        .code-block-title {
          background: #011627;
          color: #7fdbca;
          padding: 8px 16px;
          font-size: 0.8em;
          font-weight: 600;
          border-radius: 8px 8px 0 0;
          border-bottom: 1px solid #1d3b53;
        }
      `}</style>
    </div>
  )
}
