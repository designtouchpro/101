import { useState } from 'react'

const tabs = ['Lifecycle', 'Custom Elements', 'Platform APIs', 'Паттерны'] as const
type Tab = (typeof tabs)[number]

function LifecycleTab() {
  return (
    <>
      <div className="card">
        <h2>🔄 Lifecycle Callbacks</h2>
        <p>Custom Element имеет 4 callback-метода, вызываемых браузером автоматически.</p>

        <div className="code-block">
          <pre>{`class MyElement extends HTMLElement {
  // 1. constructor — элемент создан, Shadow DOM ещё не в документе
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // ❌ Нельзя: читать атрибуты, добавлять детей в light DOM
    // ✅ Можно: attachShadow, настроить event listeners на shadow
  }

  // 2. connectedCallback — элемент добавлен в DOM
  connectedCallback() {
    // ✅ Можно: читать атрибуты, рендерить, fetch данные
    this.render();
    this.#controller = new AbortController();
    document.addEventListener('theme-change', this.#onTheme, {
      signal: this.#controller.signal,
    });
  }

  // 3. disconnectedCallback — элемент удалён из DOM
  disconnectedCallback() {
    // Обязательно: очистка подписок, таймеров, observer'ов
    this.#controller?.abort();
  }

  // 4. attributeChangedCallback — атрибут изменён
  static get observedAttributes() {
    return ['variant', 'disabled'];  // только перечисленные!
  }
  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    this.render();  // перерендер при изменении атрибутов
  }

  // Бонус: adoptedCallback — элемент перемещён в другой document
  // (iframe, document.adoptNode)
  adoptedCallback() {
    console.log('Moved to new document');
  }
}`}</pre>
        </div>

        <h3>Порядок вызовов</h3>
        <table className="comparison-table">
          <thead>
            <tr><th>Момент</th><th>Callback</th><th>Что доступно</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>document.createElement('my-el')</code></td>
              <td>constructor</td>
              <td>Только <code>this</code>, shadowRoot</td>
            </tr>
            <tr>
              <td><code>parent.appendChild(el)</code></td>
              <td>connectedCallback</td>
              <td>Атрибуты, DOM-дерево, стили</td>
            </tr>
            <tr>
              <td><code>el.setAttribute('x', 'y')</code></td>
              <td>attributeChangedCallback</td>
              <td>name, oldValue, newValue</td>
            </tr>
            <tr>
              <td><code>parent.removeChild(el)</code></td>
              <td>disconnectedCallback</td>
              <td>Всё ещё <code>this</code>, но нет parentNode</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>⚠️ Upgrade Timing</h2>
        <p>Элемент может появиться в DOM <em>до</em> регистрации класса. Это важно!</p>

        <div className="code-block">
          <pre>{`<!-- HTML уже в DOM -->
<my-counter value="5"></my-counter>

<script type="module">
  // Регистрация позже — браузер вызовет constructor + connectedCallback
  // attributeChangedCallback для value="5" вызовется ДО connectedCallback
  customElements.define('my-counter', class extends HTMLElement {
    static get observedAttributes() { return ['value']; }

    attributeChangedCallback(name, old, val) {
      console.log('attr', name, val);  // attr value 5
    }
    connectedCallback() {
      console.log('connected');  // после attributeChangedCallback!
    }
  });
</script>

<!-- Дождаться регистрации -->
<script>
  customElements.whenDefined('my-counter').then(() => {
    console.log('my-counter готов к использованию');
  });
</script>`}</pre>
        </div>

        <div className="info-box">
          <strong>Правило:</strong> при upgrade порядок = constructor → attributeChangedCallback (для каждого observedAttribute) → connectedCallback.
          Код в <code>connectedCallback</code> должен быть готов к тому, что атрибуты уже обработаны.
        </div>
      </div>
    </>
  )
}

function CustomElementsTab() {
  return (
    <>
      <div className="card">
        <h2>🧱 Autonomous vs Customized Built-in</h2>

        <div className="code-block">
          <pre>{`// 1. Autonomous — полностью новый элемент
class MyButton extends HTMLElement {
  connectedCallback() {
    // Должен сам реализовать a11y, focus, keyboard
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') this.click();
    });
  }
}
customElements.define('my-button', MyButton);
// <my-button>Click</my-button>

// 2. Customized Built-in — расширяет нативный элемент
class FancyButton extends HTMLButtonElement {
  connectedCallback() {
    // Наследует ВСЮ семантику <button>: focus, form, disabled, a11y
    this.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    this.style.color = 'white';
  }
}
customElements.define('fancy-button', FancyButton, { extends: 'button' });
// <button is="fancy-button">Click</button>`}</pre>
        </div>

        <table className="comparison-table">
          <thead>
            <tr><th>Аспект</th><th>Autonomous</th><th>Customized Built-in</th></tr>
          </thead>
          <tbody>
            <tr><td>Синтаксис</td><td><code>&lt;my-btn&gt;</code></td><td><code>&lt;button is="fancy-btn"&gt;</code></td></tr>
            <tr><td>Extends</td><td>HTMLElement</td><td>HTMLButtonElement и т.д.</td></tr>
            <tr><td>Семантика</td><td>Нужно добавлять вручную</td><td>Наследуется от базового</td></tr>
            <tr><td>A11y</td><td>role, tabindex вручную</td><td>Автоматически</td></tr>
            <tr><td>Safari</td><td>✅</td><td>❌ Не поддерживается</td></tr>
            <tr><td>Shadow DOM</td><td>✅</td><td>Ограничения</td></tr>
          </tbody>
        </table>

        <div className="info-box">
          <strong>Практика:</strong> из-за отсутствия поддержки Safari, customized built-in элементы
          редко используют в production. Autonomous + правильная a11y — основной путь.
        </div>
      </div>

      <div className="card">
        <h2>📦 Form-Associated Custom Elements</h2>
        <p>Позволяют custom element участвовать в <code>&lt;form&gt;</code> наравне с нативными input-ами.</p>

        <div className="code-block">
          <pre>{`class MyRating extends HTMLElement {
  static formAssociated = true;  // ← ключевой флаг

  #internals;
  #value = 0;

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = \`
      <style>
        :host { display: inline-flex; gap: 4px; cursor: pointer; }
        .star { font-size: 24px; transition: transform 0.1s; }
        .star:hover { transform: scale(1.2); }
        .star.active { color: gold; }
      </style>
      \${[1,2,3,4,5].map(n =>
        \`<span class="star" data-value="\${n}">☆</span>\`
      ).join('')}
    \`;

    this.shadowRoot.addEventListener('click', e => {
      const star = e.target.closest('.star');
      if (!star) return;
      this.value = Number(star.dataset.value);
    });
  }

  get value() { return this.#value; }
  set value(v) {
    this.#value = v;
    // Обновляем form value — отправится при submit
    this.#internals.setFormValue(String(v));
    // Валидация
    if (v === 0) {
      this.#internals.setValidity(
        { valueMissing: true },
        'Выберите рейтинг',
        this.shadowRoot.querySelector('.star')
      );
    } else {
      this.#internals.setValidity({});
    }
    this.#render();
  }

  #render() {
    this.shadowRoot.querySelectorAll('.star').forEach((s, i) => {
      s.textContent = i < this.#value ? '★' : '☆';
      s.classList.toggle('active', i < this.#value);
    });
  }

  // Form lifecycle callbacks
  formResetCallback() { this.value = 0; }
  formStateRestoreCallback(state) { this.value = Number(state); }
}

customElements.define('my-rating', MyRating);`}</pre>
        </div>

        <div className="code-block">
          <pre>{`<!-- Использование в форме -->
<form id="review">
  <label>Оценка: <my-rating name="rating" required></my-rating></label>
  <button type="submit">Отправить</button>
</form>

<script>
  document.getElementById('review').addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log('rating:', data.get('rating')); // "4"
  });
</script>`}</pre>
        </div>

        <h3>ElementInternals API</h3>
        <table className="comparison-table">
          <thead>
            <tr><th>Метод / Свойство</th><th>Назначение</th></tr>
          </thead>
          <tbody>
            <tr><td><code>setFormValue(value)</code></td><td>Значение для FormData</td></tr>
            <tr><td><code>setValidity(flags, msg, anchor)</code></td><td>Constraint Validation API</td></tr>
            <tr><td><code>form</code></td><td>Ссылка на родительский &lt;form&gt;</td></tr>
            <tr><td><code>labels</code></td><td>Связанные &lt;label&gt;</td></tr>
            <tr><td><code>states</code></td><td>CustomStateSet для CSS-состояний</td></tr>
            <tr><td><code>shadowRoot</code></td><td>Доступ к shadowRoot (даже для closed)</td></tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

function PlatformAPIsTab() {
  return (
    <>
      <div className="card">
        <h2>🌐 HTML → Platform API Bridges</h2>
        <p>Семантика HTML расширяется через браузерные API. Элементы HTML — не просто теги, а точки входа в мощные платформенные возможности.</p>

        <table className="comparison-table">
          <thead>
            <tr><th>HTML элемент</th><th>Platform API</th><th>Что открывает</th></tr>
          </thead>
          <tbody>
            <tr><td><code>&lt;dialog&gt;</code></td><td>Top Layer API</td><td>showModal(), ::backdrop, inert</td></tr>
            <tr><td><code>&lt;details&gt;</code></td><td>toggle event</td><td>Нативный аккордеон без JS</td></tr>
            <tr><td><code>&lt;form&gt;</code></td><td>Constraint Validation</td><td>checkValidity(), reportValidity()</td></tr>
            <tr><td><code>&lt;input type="file"&gt;</code></td><td>File API / File System Access</td><td>showOpenFilePicker()</td></tr>
            <tr><td><code>&lt;a&gt;</code>, <code>&lt;area&gt;</code></td><td>Navigation API</td><td>navigation.navigate(), intercept()</td></tr>
            <tr><td><code>&lt;video&gt;</code></td><td>Media Source Extensions</td><td>Adaptive streaming (DASH, HLS)</td></tr>
            <tr><td><code>&lt;canvas&gt;</code></td><td>WebGL / WebGPU</td><td>3D-рендеринг, GPU compute</td></tr>
            <tr><td><code>&lt;img&gt;</code></td><td>Intersection Observer</td><td>Lazy loading, infinite scroll</td></tr>
            <tr><td><code>[popover]</code></td><td>Popover API</td><td>Anchor positioning, light dismiss</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>🔗 Intersection Observer + HTML</h2>
        <p>Наблюдение за видимостью элементов без scroll-событий.</p>

        <div className="code-block">
          <pre>{`// Lazy-loading изображений (до нативного loading="lazy")
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;     // data-src → src
        img.srcset = img.dataset.srcset || '';
        observer.unobserve(img);
      }
    });
  },
  { rootMargin: '200px' }  // начать загрузку за 200px до viewport
);

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});

// Нативная альтернатива (2019+):
// <img src="heavy.jpg" loading="lazy" />
// <iframe src="embed.html" loading="lazy"></iframe>`}</pre>
        </div>
      </div>

      <div className="card">
        <h2>📋 Clipboard + DataTransfer</h2>
        <p>HTML drag-and-drop и copy/paste — единый DataTransfer API.</p>

        <div className="code-block">
          <pre>{`// Clipboard API (async, requires permissions)
async function copyRichContent() {
  const html = '<b>Bold text</b> with <a href="#">link</a>';
  const blob = new Blob([html], { type: 'text/html' });
  await navigator.clipboard.write([
    new ClipboardItem({
      'text/html': blob,
      'text/plain': new Blob(['Bold text with link'], { type: 'text/plain' }),
    }),
  ]);
}

// Drag and Drop — HTML5 native
const draggable = document.querySelector('[draggable="true"]');

draggable.addEventListener('dragstart', e => {
  e.dataTransfer.setData('text/plain', e.target.id);
  e.dataTransfer.setData('application/json',
    JSON.stringify({ id: e.target.id, type: 'card' }));
  e.dataTransfer.effectAllowed = 'move';
});

const dropzone = document.querySelector('.dropzone');
dropzone.addEventListener('dragover', e => {
  e.preventDefault();              // обязательно!
  e.dataTransfer.dropEffect = 'move';
});
dropzone.addEventListener('drop', e => {
  e.preventDefault();
  const data = JSON.parse(
    e.dataTransfer.getData('application/json'));
  // Переместить элемент
});`}</pre>
        </div>
      </div>

      <div className="card">
        <h2>🔔 Popover API + Anchor Positioning</h2>

        <div className="code-block">
          <pre>{`<!-- Popover API (2024) -->
<button popovertarget="menu">Открыть меню</button>

<div id="menu" popover>
  <nav>
    <a href="/profile">Профиль</a>
    <a href="/settings">Настройки</a>
  </nav>
</div>

<!-- Типы popover -->
<div popover="auto">    <!-- light dismiss: клик вне закроет -->
<div popover="manual">  <!-- нужно закрывать явно -->

<!-- popovertargetaction -->
<button popovertarget="p" popovertargetaction="show">Открыть</button>
<button popovertarget="p" popovertargetaction="hide">Закрыть</button>
<button popovertarget="p" popovertargetaction="toggle">Toggle</button>

<!-- CSS Anchor Positioning (experimental) -->
<style>
  .trigger { anchor-name: --trigger; }
  .tooltip {
    position-anchor: --trigger;
    top: anchor(bottom);
    left: anchor(center);
    position-area: bottom;      /* fallback positioning */
  }
</style>`}</pre>
        </div>
      </div>

      <div className="card">
        <h2>👁️ View Transitions API</h2>

        <div className="code-block">
          <pre>{`// Single-page View Transitions
document.startViewTransition(async () => {
  // Обновляем DOM
  container.innerHTML = await fetchNewPage(url);
});

// CSS для анимации
/*
::view-transition-old(root) {
  animation: fade-out 0.3s ease-out;
}
::view-transition-new(root) {
  animation: fade-in 0.3s ease-in;
}
*/

// Именованные переходы для отдельных элементов
// <img style="view-transition-name: hero-img" />
/*
::view-transition-old(hero-img) {
  animation: shrink 0.3s;
}
::view-transition-new(hero-img) {
  animation: grow 0.3s;
}
*/

// MPA (cross-document) View Transitions
// <meta name="view-transition" content="same-origin" />
// @view-transition { navigation: auto; }`}</pre>
        </div>
      </div>
    </>
  )
}

function PatternsTab() {
  return (
    <>
      <div className="card">
        <h2>🏗️ Архитектурные паттерны Web Components</h2>

        <h3>1. Реактивные свойства</h3>
        <div className="code-block">
          <pre>{`class ReactiveElement extends HTMLElement {
  static get observedAttributes() { return ['count']; }

  // Проксируем attribute ↔ property
  get count() { return Number(this.getAttribute('count') || '0'); }
  set count(v) { this.setAttribute('count', String(v)); }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.querySelector('.value').textContent = String(this.count);
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = \`
      <span class="value">\${this.count}</span>
      <button id="inc">+</button>
    \`;
    this.shadowRoot.getElementById('inc')
      .addEventListener('click', () => this.count++);
  }
}`}</pre>
        </div>

        <h3>2. Event-driven коммуникация</h3>
        <div className="code-block">
          <pre>{`// Дочерний → Родитель: CustomEvent с bubbles + composed
class ChildComponent extends HTMLElement {
  #notify(detail) {
    this.dispatchEvent(new CustomEvent('item-selected', {
      bubbles: true,    // всплывает по DOM
      composed: true,   // ПРОБИВАЕТ shadow DOM boundary!
      detail,           // данные
    }));
  }
}

// Родитель слушает
document.querySelector('parent-list').addEventListener(
  'item-selected',
  e => console.log('Selected:', e.detail)
);

// ⚠️ composed: false — событие НЕ выйдет из Shadow DOM
//    Используйте для внутренней коммуникации компонента`}</pre>
        </div>

        <h3>3. Миксин-паттерн</h3>
        <div className="code-block">
          <pre>{`// Переиспользуемое поведение через миксины
const DraggableMixin = (Base) => class extends Base {
  connectedCallback() {
    super.connectedCallback?.();
    this.draggable = true;
    this.addEventListener('dragstart', this.#onDragStart);
  }
  disconnectedCallback() {
    super.disconnectedCallback?.();
    this.removeEventListener('dragstart', this.#onDragStart);
  }
  #onDragStart = (e) => {
    e.dataTransfer.setData('text/plain', this.id);
  };
};

const ResizableMixin = (Base) => class extends Base {
  connectedCallback() {
    super.connectedCallback?.();
    this.#resizeObs = new ResizeObserver(entries => {
      this.onResize?.(entries[0].contentRect);
    });
    this.#resizeObs.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback?.();
    this.#resizeObs?.disconnect();
  }
  #resizeObs;
};

// Композиция
class MyWidget extends ResizableMixin(DraggableMixin(HTMLElement)) {
  onResize(rect) {
    console.log(\`\${rect.width}x\${rect.height}\`);
  }
}`}</pre>
        </div>
      </div>

      <div className="card">
        <h2>🔄 Interop с фреймворками</h2>

        <table className="comparison-table">
          <thead>
            <tr><th>Фреймворк</th><th>Работает из коробки?</th><th>Нюансы</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>React 19+</td>
              <td>✅ Да</td>
              <td>Наконец передаёт свойства как properties, не только attributes</td>
            </tr>
            <tr>
              <td>React &lt;19</td>
              <td>⚠️ Частично</td>
              <td>Все пропы как attributes / нужна обёртка</td>
            </tr>
            <tr>
              <td>Vue</td>
              <td>✅ Да</td>
              <td><code>app.config.compilerOptions.isCustomElement</code></td>
            </tr>
            <tr>
              <td>Angular</td>
              <td>✅ Да</td>
              <td>CUSTOM_ELEMENTS_SCHEMA в модуле</td>
            </tr>
            <tr>
              <td>Svelte</td>
              <td>✅ Да</td>
              <td>Нативная поддержка</td>
            </tr>
          </tbody>
        </table>

        <div className="code-block">
          <pre>{`// React wrapper (для React <19)
function useCustomElement(ref, props) {
  useEffect(() => {
    if (!ref.current) return;
    Object.entries(props).forEach(([key, val]) => {
      if (key.startsWith('on') && typeof val === 'function') {
        const event = key.slice(2).toLowerCase();
        ref.current.addEventListener(event, val);
      } else {
        ref.current[key] = val; // property, не attribute
      }
    });
  }, [ref, ...Object.values(props)]);
}

// Vue — в vite.config.ts
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('my-')
      }
    }
  })]
});`}</pre>
        </div>
      </div>

      <div className="card">
        <h2>📝 Семантика → Расширяемость</h2>
        <p>Нативная семантика HTML — это не ограничение, а фундамент для расширения.</p>

        <div className="info-box">
          <strong>Принцип:</strong> каждый HTML-элемент несёт семантику, доступность и поведение.
          Web Components позволяют создавать <em>новую</em> семантику, основанную на тех же принципах.
        </div>

        <table className="comparison-table">
          <thead>
            <tr><th>Нативный HTML</th><th>Web Component аналог</th><th>Что добавляем</th></tr>
          </thead>
          <tbody>
            <tr><td><code>&lt;select&gt;</code></td><td><code>&lt;fancy-select&gt;</code></td><td>Поиск, мультивыбор, группировка</td></tr>
            <tr><td><code>&lt;input type="date"&gt;</code></td><td><code>&lt;date-range-picker&gt;</code></td><td>Диапазон, недоступные даты</td></tr>
            <tr><td><code>&lt;details&gt;</code></td><td><code>&lt;accordion-group&gt;</code></td><td>exclusive (только один открыт)</td></tr>
            <tr><td><code>&lt;dialog&gt;</code></td><td><code>&lt;command-palette&gt;</code></td><td>Поиск, shortcuts, fuzzy match</td></tr>
            <tr><td><code>&lt;table&gt;</code></td><td><code>&lt;data-grid&gt;</code></td><td>Виртуализация, сортировка, фильтры</td></tr>
          </tbody>
        </table>

        <h3>CustomStateSet (CSS Custom States)</h3>
        <div className="code-block">
          <pre>{`class ToggleSwitch extends HTMLElement {
  #internals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  get pressed() {
    return this.#internals.states.has('checked');
  }
  set pressed(val) {
    if (val) {
      this.#internals.states.add('checked');
    } else {
      this.#internals.states.delete('checked');
    }
  }

  connectedCallback() {
    this.addEventListener('click', () => {
      this.pressed = !this.pressed;
    });
  }
}

/* CSS — используем :state() псевдокласс */
/*
toggle-switch:state(checked) {
  background: green;
}
toggle-switch:not(:state(checked)) {
  background: gray;
}
*/`}</pre>
        </div>
      </div>
    </>
  )
}

export default function WebComponents() {
  const [activeTab, setActiveTab] = useState<Tab>('Lifecycle')

  return (
    <div className="page-container">
      <h1>⚙️ Web Components & Platform APIs</h1>
      <p className="page-description">
        Custom Elements, lifecycle, Form Association, платформенные API и паттерны
        расширения HTML-семантики.
      </p>

      <div className="tab-nav">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Lifecycle' && <LifecycleTab />}
      {activeTab === 'Custom Elements' && <CustomElementsTab />}
      {activeTab === 'Platform APIs' && <PlatformAPIsTab />}
      {activeTab === 'Паттерны' && <PatternsTab />}
    </div>
  )
}
