import { useRef, useEffect } from 'react'

export default function TemplateSlot() {
  const cardContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Регистрируем Web Component для демонстрации
    if (!customElements.get('user-card')) {
      class UserCard extends HTMLElement {
        constructor() {
          super()
          const template = document.getElementById('user-card-template') as HTMLTemplateElement
          if (template) {
            const shadow = this.attachShadow({ mode: 'open' })
            shadow.appendChild(template.content.cloneNode(true))
          }
        }
      }
      customElements.define('user-card', UserCard)
    }
  }, [])

  const createCardFromTemplate = () => {
    const template = document.getElementById('demo-template') as HTMLTemplateElement
    if (template && cardContainerRef.current) {
      const clone = template.content.cloneNode(true) as DocumentFragment
      const nameEl = clone.querySelector('.name')
      const emailEl = clone.querySelector('.email')
      if (nameEl) nameEl.textContent = `User ${Date.now() % 1000}`
      if (emailEl) emailEl.textContent = `user${Date.now() % 1000}@example.com`
      cardContainerRef.current.appendChild(clone)
    }
  }

  return (
    <div className="page-container">
      <h1>🧩 Template & Slot</h1>
      <p className="page-description">
        Нативные Web Components: <code>&lt;template&gt;</code> для переиспользуемой разметки
        и <code>&lt;slot&gt;</code> для композиции компонентов.
      </p>

      {/* Template basics */}
      <div className="card">
        <h2>📋 &lt;template&gt; — HTML шаблоны</h2>
        <p>
          Контент внутри <code>&lt;template&gt;</code> не рендерится и не выполняется,
          пока не будет клонирован через JavaScript.
        </p>

        <div className="code-block">
          <pre>{`<template id="card-template">
  <div class="card">
    <h3 class="name"></h3>
    <p class="email"></p>
  </div>
</template>

<script>
  const template = document.getElementById('card-template');
  const clone = template.content.cloneNode(true);
  
  clone.querySelector('.name').textContent = 'John Doe';
  clone.querySelector('.email').textContent = 'john@example.com';
  
  document.body.appendChild(clone);
</script>`}</pre>
        </div>

        {/* Live demo */}
        <div className="demo-section">
          <h4>Живой пример:</h4>
          
          {/* Hidden template */}
          <template id="demo-template">
            <div className="template-card">
              <h4 className="name">Name</h4>
              <p className="email">Email</p>
            </div>
          </template>

          <button onClick={createCardFromTemplate} className="btn btn-primary">
            ➕ Создать карточку из template
          </button>
          
          <div ref={cardContainerRef} className="cards-container"></div>
        </div>

        <div className="info-box">
          <strong>Преимущества template:</strong>
          <ul>
            <li>Контент не парсится пока не нужен (быстрее)</li>
            <li>Изображения не загружаются</li>
            <li>Скрипты не выполняются</li>
            <li>Стили не применяются</li>
          </ul>
        </div>
      </div>

      {/* Shadow DOM */}
      <div className="card">
        <h2>👤 Shadow DOM</h2>
        <p>
          Инкапсулированное DOM-дерево. Стили и скрипты изолированы от основного документа.
        </p>

        <div className="code-block">
          <pre>{`class MyComponent extends HTMLElement {
  constructor() {
    super();
    
    // Создаём Shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });
    
    shadow.innerHTML = \`
      <style>
        /* Стили ТОЛЬКО для этого компонента */
        :host {
          display: block;
          padding: 16px;
        }
        .title {
          color: blue; /* Не затронет другие .title */
        }
      </style>
      <h2 class="title">Shadow Content</h2>
      <slot></slot> <!-- Место для внешнего контента -->
    \`;
  }
}

customElements.define('my-component', MyComponent);`}</pre>
        </div>

        <div className="shadow-modes">
          <h4>Режимы Shadow DOM:</h4>
          <div className="modes-grid">
            <div className="mode">
              <code>mode: 'open'</code>
              <span>Shadow root доступен через <code>element.shadowRoot</code></span>
            </div>
            <div className="mode">
              <code>mode: 'closed'</code>
              <span>Shadow root недоступен извне (редко нужно)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Declarative Shadow DOM */}
      <div className="card">
        <h2>✨ Declarative Shadow DOM (2021+)</h2>
        <p>
          Shadow DOM без JavaScript! Полезно для SSR и статических страниц.
        </p>

        <div className="code-block">
          <pre>{`<!-- Декларативный Shadow DOM -->
<my-card>
  <template shadowrootmode="open">
    <style>
      :host {
        display: block;
        border: 1px solid #ccc;
        padding: 16px;
        border-radius: 8px;
      }
      .header {
        font-weight: bold;
        margin-bottom: 8px;
      }
    </style>
    <div class="header">
      <slot name="title">Default Title</slot>
    </div>
    <div class="body">
      <slot>Default content</slot>
    </div>
  </template>
  
  <!-- Контент для слотов -->
  <span slot="title">Custom Title</span>
  <p>This goes into default slot</p>
</my-card>`}</pre>
        </div>

        <div className="feature-badge">
          <span className="badge new">shadowrootmode</span> заменил устаревший <code>shadowroot</code>
        </div>
      </div>

      {/* Slots */}
      <div className="card">
        <h2>🎰 &lt;slot&gt; — Композиция</h2>
        <p>
          Слоты позволяют передавать контент внутрь Web Component.
        </p>

        <div className="code-block">
          <pre>{`<!-- Компонент определяет слоты -->
<template id="dialog-template">
  <div class="dialog">
    <header>
      <slot name="header">Default Header</slot>
    </header>
    <main>
      <slot>Default content (unnamed slot)</slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<!-- Использование -->
<my-dialog>
  <h2 slot="header">Подтверждение</h2>
  <p>Вы уверены?</p>
  <div slot="footer">
    <button>Отмена</button>
    <button>OK</button>
  </div>
</my-dialog>`}</pre>
        </div>

        <div className="slots-info">
          <h4>Типы слотов:</h4>
          <div className="slot-types">
            <div className="slot-type">
              <code>&lt;slot&gt;</code>
              <span>Default slot — для контента без slot атрибута</span>
            </div>
            <div className="slot-type">
              <code>&lt;slot name="header"&gt;</code>
              <span>Named slot — для <code>slot="header"</code></span>
            </div>
            <div className="slot-type">
              <code>&lt;slot&gt;Fallback&lt;/slot&gt;</code>
              <span>Fallback content — если слот пустой</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for Shadow DOM */}
      <div className="card">
        <h2>🎨 CSS в Shadow DOM</h2>

        <div className="css-features">
          <div className="css-feature">
            <h4><code>:host</code></h4>
            <p>Стилизация самого компонента (хоста)</p>
            <div className="code-block small">
              <pre>{`:host {
  display: block;
  padding: 16px;
}

:host(:hover) {
  background: #f0f0f0;
}

:host([disabled]) {
  opacity: 0.5;
}`}</pre>
            </div>
          </div>

          <div className="css-feature">
            <h4><code>:host-context()</code></h4>
            <p>Стили в зависимости от контекста родителя</p>
            <div className="code-block small">
              <pre>{`/* Если родитель имеет класс .dark */
:host-context(.dark) {
  background: #333;
  color: white;
}`}</pre>
            </div>
          </div>

          <div className="css-feature">
            <h4><code>::slotted()</code></h4>
            <p>Стилизация контента переданного в слот</p>
            <div className="code-block small">
              <pre>{`::slotted(p) {
  margin: 0;
  color: gray;
}

::slotted(*) {
  /* Все элементы в слоте */
}`}</pre>
            </div>
          </div>

          <div className="css-feature">
            <h4><code>::part()</code></h4>
            <p>Стилизация внутренних частей извне</p>
            <div className="code-block small">
              <pre>{`/* Внутри компонента */
<button part="button">Click</button>

/* Снаружи */
my-component::part(button) {
  background: blue;
}`}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Full Example */}
      <div className="card">
        <h2>🏗️ Полный пример Web Component</h2>

        <div className="code-block">
          <pre>{`<!-- Template -->
<template id="user-card-template">
  <style>
    :host {
      display: block;
      font-family: system-ui;
    }
    .card {
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 16px;
      max-width: 300px;
    }
    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #ddd;
    }
    .name {
      font-weight: bold;
      margin: 12px 0 4px;
    }
    .role {
      color: #666;
      font-size: 0.9em;
    }
    ::slotted(a) {
      color: #3b82f6;
    }
  </style>
  <div class="card" part="card">
    <img class="avatar" part="avatar">
    <div class="name"><slot name="name">Unknown</slot></div>
    <div class="role"><slot name="role">No role</slot></div>
    <div class="links"><slot></slot></div>
  </div>
</template>

<!-- Registration -->
<script>
  class UserCard extends HTMLElement {
    static observedAttributes = ['avatar', 'theme'];
    
    constructor() {
      super();
      const template = document.getElementById('user-card-template');
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    
    connectedCallback() {
      this.updateAvatar();
    }
    
    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'avatar') this.updateAvatar();
    }
    
    updateAvatar() {
      const avatar = this.getAttribute('avatar');
      const img = this.shadowRoot.querySelector('.avatar');
      if (avatar) img.src = avatar;
    }
  }
  
  customElements.define('user-card', UserCard);
</script>

<!-- Usage -->
<user-card avatar="photo.jpg">
  <span slot="name">John Doe</span>
  <span slot="role">Developer</span>
  <a href="https://github.com">GitHub</a>
</user-card>`}</pre>
        </div>
      </div>

      {/* Form association */}
      <div className="card">
        <h2>📝 Form-associated Custom Elements</h2>
        <p>Web Components могут участвовать в формах как нативные элементы:</p>

        <div className="code-block">
          <pre>{`class CustomInput extends HTMLElement {
  static formAssociated = true;
  
  constructor() {
    super();
    this.internals = this.attachInternals();
    
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = \`
      <input type="text" />
    \`;
    
    this.input = this.shadowRoot.querySelector('input');
    this.input.addEventListener('input', () => {
      this.internals.setFormValue(this.input.value);
    });
  }
  
  // Форма может читать/устанавливать value
  get value() { return this.input.value; }
  set value(v) { this.input.value = v; }
  
  // Участие в валидации
  checkValidity() { 
    return this.internals.checkValidity(); 
  }
  
  // Lifecycle для форм
  formResetCallback() { this.value = ''; }
  formDisabledCallback(disabled) { 
    this.input.disabled = disabled; 
  }
}

customElements.define('custom-input', CustomInput);

// Использование
<form>
  <custom-input name="username"></custom-input>
  <button type="submit">Submit</button>
</form>`}</pre>
        </div>
      </div>

      <style>{`
        .demo-section {
          margin-top: 20px;
          padding: 20px;
          background: var(--bg-secondary);
          border-radius: 12px;
        }
        .demo-section h4 {
          margin: 0 0 12px;
        }
        .cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }
        .template-card {
          padding: 16px;
          background: var(--bg-code);
          border-radius: 8px;
          min-width: 150px;
        }
        .template-card h4 {
          margin: 0 0 4px;
          color: var(--accent);
        }
        .template-card p {
          margin: 0;
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .info-box {
          margin-top: 16px;
          padding: 16px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 8px;
        }
        .info-box ul {
          margin: 8px 0 0;
          padding-left: 20px;
        }
        .shadow-modes {
          margin-top: 20px;
        }
        .modes-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
        }
        .mode {
          display: flex;
          gap: 16px;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: 8px;
          align-items: center;
        }
        .mode code {
          min-width: 150px;
          color: var(--accent);
        }
        .mode span {
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .feature-badge {
          margin-top: 16px;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .badge.new {
          padding: 2px 8px;
          background: var(--success);
          color: white;
          border-radius: 12px;
          font-size: 0.8em;
          font-weight: 600;
        }
        .slots-info {
          margin-top: 20px;
        }
        .slot-types {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
        }
        .slot-type {
          display: flex;
          gap: 16px;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: 8px;
          align-items: center;
        }
        .slot-type code {
          min-width: 200px;
          color: var(--accent);
        }
        .slot-type span {
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .css-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        .css-feature {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 12px;
        }
        .css-feature h4 {
          margin: 0 0 8px;
          color: var(--accent);
        }
        .css-feature p {
          margin: 0 0 12px;
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .code-block.small pre {
          font-size: 0.8em;
          padding: 12px;
        }
      `}</style>
    </div>
  )
}
