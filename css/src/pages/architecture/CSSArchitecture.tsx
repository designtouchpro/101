import { useState } from 'react'

type Tab = 'comparison' | 'bem' | 'utility' | 'modules' | 'tokens'

export default function CSSArchitecture() {
  const [tab, setTab] = useState<Tab>('comparison')

  return (
    <div className="demo-container">
      <h1>🏗️ CSS Architecture и Theming</h1>
      <p className="section-desc">
        BEM, utility-first, CSS Modules, design tokens — когда какой подход применять,
        плюсы/минусы и масштабирование.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {([
          ['comparison', '⚖️ Сравнение'],
          ['bem', '🧱 BEM'],
          ['utility', '⚡ Utility-first'],
          ['modules', '📦 CSS Modules'],
          ['tokens', '🎨 Design Tokens'],
        ] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              cursor: 'pointer', padding: '8px 16px', fontSize: '0.9rem',
              border: '1px solid var(--border)', borderRadius: 8,
              background: tab === key ? 'var(--accent-blue, #007AFF)' : 'var(--bg-secondary)',
              color: tab === key ? '#fff' : 'var(--text-primary)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'comparison' && (
        <>
          <section className="card">
            <h2>⚖️ Сравнение подходов</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Критерий</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>BEM</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Utility-first</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>CSS Modules</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Design Tokens</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { crit: 'Scope', bem: 'Конвенция', util: 'Глобальный', mod: 'Авто-scope', tok: 'Любой' },
                  { crit: 'Специфичность', bem: 'Низкая (1 класс)', util: 'Низкая', mod: 'Низкая (хэш)', tok: 'Зависит от потребителя' },
                  { crit: 'Размер CSS', bem: '🟡 Средний', util: '🟢 Маленький (dedupe)', mod: '🟡 Per-component', tok: '— (не стили, а значения)' },
                  { crit: 'Порог входа', bem: '🟢 Лёгкий', util: '🟡 Учить утилиты', mod: '🟢 Лёгкий', tok: '🔴 Проектирование' },
                  { crit: 'Масштабирование', bem: '🟡 Растёт с конвенциями', util: '🟢 Отлично', mod: '🟢 Отлично', tok: '🟢 Отлично' },
                  { crit: 'Theming', bem: '🔴 Сложно', util: '🟢 CSS vars + config', mod: '🟡 CSS vars', tok: '🟢 Встроен' },
                  { crit: 'IDE support', bem: '🟡 Без тулов', util: '🟢 Intellisense', mod: '🟢 TS types', tok: '🟢 Lint + autocomplete' },
                  { crit: 'Framework lock-in', bem: 'Нет', util: 'Tailwind/UnoCSS', mod: 'Vite/Webpack', tok: 'Style Dictionary / Figma Tokens' },
                ].map(r => (
                  <tr key={r.crit} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8, fontWeight: 600 }}>{r.crit}</td>
                    <td style={{ padding: 8 }}>{r.bem}</td>
                    <td style={{ padding: 8 }}>{r.util}</td>
                    <td style={{ padding: 8 }}>{r.mod}</td>
                    <td style={{ padding: 8 }}>{r.tok}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>🗺️ Когда что выбирать</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {[
                { approach: 'BEM', when: 'Серверный рендеринг без фреймворка, простые сайты, команда без фронтенд-экспертов', not: 'Большие SPA, дизайн-системы' },
                { approach: 'Utility-first', when: 'Быстрое прототипирование, SPA, микрофронтенды, Tailwind-friendly команда', not: 'Проекты без build step, команды без знакомства с Tailwind' },
                { approach: 'CSS Modules', when: 'React/Vue SPA, компонентная архитектура, переход от BEM, TypeScript-проекты', not: 'Не-SPA проекты, multi-repo дизайн-системы' },
                { approach: 'Design Tokens', when: 'Дизайн-система, multi-platform (web + mobile), white-label продукты', not: 'Маленькие проекты, MVP без дизайнера' },
              ].map(c => (
                <div key={c.approach} style={{ padding: 16, borderRadius: 8, border: '1px solid var(--border)' }}>
                  <strong style={{ fontSize: '1.1rem' }}>{c.approach}</strong>
                  <div style={{ marginTop: 8 }}>
                    <span style={{ color: '#34C759' }}>✅ Когда:</span> {c.when}
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <span style={{ color: '#FF3B30' }}>❌ Не для:</span> {c.not}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>🔄 Комбинирование подходов</h2>
            <div className="info-box">
              <strong>💡 В реальных проектах подходы комбинируются:</strong>
            </div>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem', marginTop: 12 }}>
{`/* Design Tokens → базовые значения */
:root {
  --color-primary: #007AFF;
  --space-sm: 8px;
  --radius-md: 8px;
}

/* CSS Modules → компонентный scope */
/* Button.module.css */
.button {
  background: var(--color-primary);
  padding: var(--space-sm);
  border-radius: var(--radius-md);
}

/* Utility classes → мелкие одноразовые корректировки */
<div class={styles.card}>
  <h2 class="text-center mt-2">Title</h2>
</div>

/* BEM → для shared UI-kit без build step */
.dialog__header { ... }
.dialog__body { ... }`}
            </pre>
          </section>
        </>
      )}

      {tab === 'bem' && (
        <>
          <section className="card">
            <h2>🧱 BEM — Block Element Modifier</h2>
            <p>Конвенция именования: <code>.block__element--modifier</code></p>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`/* Block — самостоятельный компонент */
.card { }

/* Element — часть блока (без блока не существует) */
.card__title { }
.card__image { }
.card__footer { }

/* Modifier — вариация блока или элемента */
.card--featured { }
.card__title--large { }

/* HTML */
<div class="card card--featured">
  <img class="card__image" />
  <h2 class="card__title card__title--large">...</h2>
  <div class="card__footer">...</div>
</div>`}
            </pre>
          </section>

          <section className="card">
            <h2>✅ Правила BEM</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Правило</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>✅ Правильно</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>❌ Неправильно</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rule: 'Нет вложенных элементов', ok: '.card__title', bad: '.card__header__title' },
                  { rule: 'Block не зависит от контекста', ok: '.card { margin: 0 }', bad: '.sidebar .card { width: 50% }' },
                  { rule: 'Element не без Block', ok: '.card__title', bad: '.title (если это часть card)' },
                  { rule: 'Modifier не один', ok: '.card.card--dark', bad: '.card--dark (без .card)' },
                  { rule: 'Только классы (не теги)', ok: '.card__link', bad: '.card a' },
                ].map(r => (
                  <tr key={r.rule} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8, fontWeight: 600 }}>{r.rule}</td>
                    <td style={{ padding: 8, fontFamily: 'monospace', color: '#34C759' }}>{r.ok}</td>
                    <td style={{ padding: 8, fontFamily: 'monospace', color: '#FF3B30' }}>{r.bad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>📁 Структура файлов BEM</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`/* Flat structure (простой проект) */
styles/
  blocks/
    card.css
    button.css
    header.css
    dialog.css

/* Nested structure (дизайн-система) */
components/
  card/
    card.css           /* .card, .card--featured */
    card__title.css    /* .card__title */
    card__footer.css   /* .card__footer */

/* Mix — блок + элемент */
<div class="card card--featured header__item">
  /* .card — свои стили, .header__item — позиционирование */
</div>`}
            </pre>
          </section>
        </>
      )}

      {tab === 'utility' && (
        <>
          <section className="card">
            <h2>⚡ Utility-first CSS</h2>
            <p>Подход: маленькие atomic-классы вместо семантических. Tailwind CSS — главный представитель.</p>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`/* Utility-first подход */
<div class="flex items-center gap-4 p-6 rounded-lg bg-white shadow-md
            hover:shadow-lg transition-shadow">
  <img class="w-12 h-12 rounded-full" src="..." />
  <div>
    <h3 class="text-lg font-semibold text-gray-900">Name</h3>
    <p class="text-sm text-gray-500">Description</p>
  </div>
</div>

/* Эквивалент в BEM: */
<div class="user-card user-card--elevated">
  <img class="user-card__avatar" src="..." />
  <div class="user-card__info">
    <h3 class="user-card__name">Name</h3>
    <p class="user-card__desc">Description</p>
  </div>
</div>`}
            </pre>
          </section>

          <section className="card">
            <h2>📐 Tailwind Config и Theming</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      },
      spacing: {
        '18': '4.5rem',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ]
}

/* Использование */
<button class="bg-brand-500 hover:bg-brand-900 px-6 py-3
               rounded-lg text-white font-medium">
  Click me
</button>

/* Dark mode */
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  ...
</div>`}
            </pre>
          </section>

          <section className="card">
            <h2>🔧 @apply — извлечение компонентов</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`/* Когда HTML становится нечитаемым — @apply */
@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-blue-500 text-white rounded-lg
           font-medium hover:bg-blue-600 
           transition-colors focus:ring-2 
           focus:ring-blue-300;
  }
  
  .card {
    @apply p-6 bg-white dark:bg-gray-800 rounded-xl
           shadow-md hover:shadow-lg transition-shadow;
  }
}

/* ⚠️ Не злоупотребляйте @apply: */
/* Если всё в @apply — вы заново изобрели BEM */
/* @apply хорош для: кнопки, badge, input */
/* @apply плох для: уникальные layout, однократные стили */`}
            </pre>
          </section>

          <section className="card">
            <h2>🆚 Tailwind vs UnoCSS</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Аспект</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Tailwind</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>UnoCSS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { asp: 'Подход', tw: 'Фиксированный набор утилит', uno: 'On-demand (генерирует по regex)' },
                  { asp: 'Размер', tw: 'JIT — только используемые', uno: 'Меньше runtime, instant HMR' },
                  { asp: 'Кастомизация', tw: 'Через config + plugins', uno: 'Presets + rules (более гибко)' },
                  { asp: 'Экосистема', tw: 'Огромная (UI kits, docs)', uno: 'Растущая, совместима с TW' },
                  { asp: 'Attributify mode', tw: 'Нет', uno: 'Есть: <div text="lg blue-500">' },
                ].map(r => (
                  <tr key={r.asp} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8, fontWeight: 600 }}>{r.asp}</td>
                    <td style={{ padding: 8 }}>{r.tw}</td>
                    <td style={{ padding: 8 }}>{r.uno}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      {tab === 'modules' && (
        <>
          <section className="card">
            <h2>📦 CSS Modules</h2>
            <p>
              Локальный scope по умолчанию. Каждый класс получает уникальный хэш:
              <code>.button</code> → <code>.Button_button_x7h3k</code>
            </p>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`/* Button.module.css */
.button {
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}
.button:hover {
  opacity: 0.9;
}
.primary {
  background: var(--color-primary, #007AFF);
  color: white;
}
.secondary {
  background: transparent;
  border: 1px solid var(--border);
}

/* Button.tsx */
import styles from './Button.module.css'

export function Button({ variant = 'primary', children }) {
  return (
    <button className={\`\${styles.button} \${styles[variant]}\`}>
      {children}
    </button>
  )
}

/* Результат в DOM: */
<button class="Button_button_x7h3k Button_primary_a2b4c">
  Click
</button>`}
            </pre>
          </section>

          <section className="card">
            <h2>🔧 Продвинутые паттерны CSS Modules</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`/* Composition — переиспользование стилей */
/* shared.module.css */
.flexCenter {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Card.module.css */
.header {
  composes: flexCenter from './shared.module.css';
  padding: 16px;
}

/* Global escape — взаимодействие с библиотеками */
.wrapper :global(.ant-btn) {
  border-radius: 8px;
}

/* TypeScript types (автогенерация) */
/* Vite: vite-plugin-css-modules-typescript */
/* Генерирует Button.module.css.d.ts:
   declare const styles: {
     button: string;
     primary: string;
     secondary: string;
   };
   export default styles;
*/`}
            </pre>
          </section>

          <section className="card">
            <h2>📁 Структура файлов</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`src/
  components/
    Button/
      Button.tsx
      Button.module.css    /* scoped стили */
      Button.test.tsx
    Card/
      Card.tsx
      Card.module.css
  styles/
    tokens.css             /* :root с CSS vars */
    reset.css              /* global reset */
    utilities.css           /* .sr-only, .truncate */`}
            </pre>
            <div className="info-box" style={{ marginTop: 12 }}>
              <strong>💡 Best practice:</strong> CSS Modules для компонентного scope +
              CSS Variables (tokens) для shared значений + глобальный файл для reset и утилит.
            </div>
          </section>
        </>
      )}

      {tab === 'tokens' && (
        <>
          <section className="card">
            <h2>🎨 Design Tokens</h2>
            <p>
              Атомарные значения дизайна (цвета, отступы, шрифты), хранимые в format-agnostic формате.
              Один источник правды для web, iOS, Android.
            </p>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`/* tokens.json (Style Dictionary формат) */
{
  "color": {
    "brand": {
      "primary":   { "value": "#007AFF" },
      "secondary": { "value": "#5856D6" }
    },
    "semantic": {
      "success": { "value": "{color.brand.primary}" },
      "danger":  { "value": "#FF3B30" }
    }
  },
  "spacing": {
    "xs": { "value": "4px" },
    "sm": { "value": "8px" },
    "md": { "value": "16px" },
    "lg": { "value": "24px" }
  },
  "radius": {
    "sm": { "value": "4px" },
    "md": { "value": "8px" },
    "full": { "value": "9999px" }
  }
}`}
            </pre>
          </section>

          <section className="card">
            <h2>🔄 Три уровня токенов</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Уровень</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Пример</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Назначение</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><strong style={{ color: '#007AFF' }}>Primitive</strong></td>
                  <td style={{ padding: 8, fontFamily: 'monospace' }}>--blue-500: #3b82f6</td>
                  <td style={{ padding: 8 }}>Сырые значения. Не используются напрямую в компонентах.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><strong style={{ color: '#FF9500' }}>Semantic</strong></td>
                  <td style={{ padding: 8, fontFamily: 'monospace' }}>--color-primary: var(--blue-500)</td>
                  <td style={{ padding: 8 }}>Смысловые имена. Меняются при смене темы.</td>
                </tr>
                <tr>
                  <td style={{ padding: 8 }}><strong style={{ color: '#34C759' }}>Component</strong></td>
                  <td style={{ padding: 8, fontFamily: 'monospace' }}>--btn-bg: var(--color-primary)</td>
                  <td style={{ padding: 8 }}>Специфичные для компонента. Переопределяются при кастомизации.</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>🌓 Token-driven Theming</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`/* 1. Primitive tokens */
:root {
  --blue-500: #3b82f6;
  --blue-700: #1d4ed8;
  --gray-50:  #f9fafb;
  --gray-900: #111827;
}

/* 2. Semantic tokens — light theme */
:root, [data-theme="light"] {
  --color-bg:      var(--gray-50);
  --color-text:    var(--gray-900);
  --color-primary: var(--blue-500);
  --color-border:  #e5e7eb;
}

/* 3. Dark theme — только переключение semantic */
[data-theme="dark"] {
  --color-bg:      var(--gray-900);
  --color-text:    var(--gray-50);
  --color-primary: var(--blue-700);
  --color-border:  #374151;
}

/* 4. Component tokens */
.button {
  --btn-bg: var(--color-primary);
  --btn-text: white;
  --btn-radius: var(--radius-md);

  background: var(--btn-bg);
  color: var(--btn-text);
  border-radius: var(--btn-radius);
}

/* White-label: переопределить primitive = новый бренд */
.brand-acme {
  --blue-500: #e11d48;  /* розовый вместо синего */
}`}
            </pre>
          </section>

          <section className="card">
            <h2>🛠 Инструменты</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Инструмент</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Что делает</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Когда</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tool: 'Style Dictionary', what: 'JSON → CSS vars, iOS, Android, Compose', when: 'Multi-platform дизайн-система' },
                  { tool: 'Figma Tokens (plugin)', what: 'Экспорт токенов из Figma → JSON', when: 'Дизайнеры управляют токенами' },
                  { tool: 'Token Studio', what: 'Pro-версия Figma Tokens + themes', when: 'Комплексный theming (light/dark/brand)' },
                  { tool: 'Cobalt UI', what: 'W3C Design Tokens → любые форматы', when: 'Соблюдение стандарта W3C' },
                  { tool: 'Tailwind preset', what: 'Токены → tailwind.config.ts', when: 'Utility-first + tokens' },
                ].map(r => (
                  <tr key={r.tool} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8 }}><strong>{r.tool}</strong></td>
                    <td style={{ padding: 8 }}>{r.what}</td>
                    <td style={{ padding: 8, color: 'var(--text-secondary)' }}>{r.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </div>
  )
}
