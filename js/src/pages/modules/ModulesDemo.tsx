import CodeBlock from '../../components/CodeBlock'

export default function ModulesDemo() {
  return (
    <div className="page-container">
      <h1>📦 Модули JavaScript</h1>
      <p className="page-description">
        ESM и CJS, динамический import, циклические зависимости и связь модулей с бандлерами.
      </p>

      <ESMBasics />
      <CJSComparison />
      <DynamicImport />
      <CircularDeps />
      <BundlerImplications />
      <PatternsSection />
    </div>
  )
}

/* ─── ESM Basics ──────────────────────────────────────── */

function ESMBasics() {
  const code = `// === ES Modules (ESM) — стандарт с ES2015 ===

// Именованный экспорт
export const API_URL = 'https://api.example.com'
export function fetchUser(id: number) { /* ... */ }
export class UserService { /* ... */ }

// Именованный импорт
import { API_URL, fetchUser } from './api.js'

// Импорт с переименованием
import { fetchUser as getUser } from './api.js'

// Импорт всего модуля как namespace
import * as api from './api.js'
api.fetchUser(1)

// Default экспорт (один на модуль)
export default class App { /* ... */ }

// Default импорт (имя выбираете сами)
import App from './App.js'
import MyApp from './App.js'  // то же самое

// Совмещение default и named
export default function main() {}
export const version = '1.0'

import main, { version } from './index.js'

// Re-export — пробрасывание из другого модуля
export { fetchUser } from './api.js'
export { default as App } from './App.js'
export * from './utils.js'            // все named экспорты
export * as utils from './helpers.js' // как namespace`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">📋 ES Modules (ESM)</span>
      </div>
      <p>
        ESM — стандартная модульная система JavaScript. Работает в браузерах (<code>&lt;script type="module"&gt;</code>)
        и Node.js (<code>.mjs</code> или <code>"type": "module"</code> в <code>package.json</code>).
      </p>

      <CodeBlock language="typescript" title="ESM: экспорт и импорт" code={code} />

      <div className="info-box info" style={{ marginTop: '12px' }}>
        <strong>💡 Ключевое:</strong> ESM — статический анализ.
        Импорты/экспорты определяются на этапе парсинга, ДО выполнения кода.
        Поэтому import нельзя поставить внутри if, а бандлеры могут делать tree-shaking.
      </div>
    </div>
  )
}

/* ─── CJS vs ESM ──────────────────────────────────────── */

function CJSComparison() {
  const code = `// === CommonJS (CJS) — стандарт Node.js до ESM ===

// Экспорт
module.exports = { fetchUser, API_URL }
// или
exports.fetchUser = function(id) { /* ... */ }

// Импорт
const { fetchUser, API_URL } = require('./api')
const api = require('./api')

// ⚠️ CJS — динамический. require() можно вызвать где угодно:
if (needsModule) {
  const extra = require('./extra')  // загрузится в рантайме
}

// ⚠️ CJS — синхронный. Файл читается и выполняется целиком при require()`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">⚖️ ESM vs CommonJS</span>
      </div>

      <table className="comparison-table" style={{ width: '100%', marginBottom: '16px' }}>
        <thead>
          <tr>
            <th></th>
            <th>ESM</th>
            <th>CommonJS</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Синтаксис</strong></td><td><code>import / export</code></td><td><code>require / module.exports</code></td></tr>
          <tr><td><strong>Загрузка</strong></td><td>Асинхронная</td><td>Синхронная</td></tr>
          <tr><td><strong>Анализ</strong></td><td>Статический (парсинг)</td><td>Динамический (рантайм)</td></tr>
          <tr><td><strong>Tree-shaking</strong></td><td>✅ Да</td><td>❌ Нет</td></tr>
          <tr><td><strong>Top-level await</strong></td><td>✅ Да</td><td>❌ Нет</td></tr>
          <tr><td><strong>Binding</strong></td><td>Live binding (ссылка)</td><td>Копия значения</td></tr>
          <tr><td><strong>this в top-level</strong></td><td><code>undefined</code></td><td><code>module.exports</code></td></tr>
          <tr><td><strong>Strict mode</strong></td><td>Всегда</td><td>Нет (opt-in)</td></tr>
          <tr><td><strong>Расширение</strong></td><td><code>.mjs</code> / <code>"type":"module"</code></td><td><code>.cjs</code> / default</td></tr>
          <tr><td><strong>Браузер</strong></td><td>✅ Нативно</td><td>❌ Только через бандлер</td></tr>
        </tbody>
      </table>

      <CodeBlock language="javascript" title="CommonJS синтаксис" code={code} />

      <div className="info-box warning" style={{ marginTop: '12px' }}>
        <strong>⚠️ Live binding vs копия</strong>
        <p>В ESM экспорт — <strong>ссылка</strong>. Если модуль изменит значение, импортёр увидит обновление.
        В CJS <code>require()</code> возвращает <strong>копию</strong> — изменения в модуле не видны.</p>
      </div>
    </div>
  )
}

/* ─── Dynamic import ──────────────────────────────────── */

function DynamicImport() {
  const code = `// === Dynamic import() — загрузка модуля в рантайме ===
// Возвращает Promise<Module>

// 1. Условная загрузка
async function loadEditor() {
  if (userNeedsEditor) {
    const { Editor } = await import('./Editor.js')
    return new Editor()
  }
}

// 2. Lazy route (React)
const Dashboard = React.lazy(() => import('./pages/Dashboard'))

// 3. Загрузка по событию
button.addEventListener('click', async () => {
  const { showModal } = await import('./modal.js')
  showModal()
})

// 4. Вычисляемый путь (⚠️ усложняет tree-shaking)
const locale = 'ru'
const messages = await import(\`./locales/\${locale}.js\`)

// 5. Загрузка default + named
const module = await import('./utils.js')
module.default    // default экспорт
module.helper     // named экспорт

// === import.meta — метаданные модуля ===
console.log(import.meta.url)      // URL текущего модуля
console.log(import.meta.env)      // переменные окружения (Vite)
// import.meta.env.MODE            // 'development' | 'production'
// import.meta.env.BASE_URL        // '/'`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">🚀 Dynamic import()</span>
      </div>
      <p>
        <code>import()</code> — единственный способ загрузить модуль динамически в ESM.
        Это основа code splitting в бандлерах.
      </p>

      <CodeBlock language="typescript" title="Динамический импорт и import.meta" code={code} />
    </div>
  )
}

/* ─── Circular dependencies ───────────────────────────── */

function CircularDeps() {
  const code = `// === Циклические зависимости ===

// a.js
import { b } from './b.js'
export const a = 'A sees: ' + b
// На момент выполнения b ещё undefined!

// b.js
import { a } from './a.js'
export const b = 'B sees: ' + a
// a тоже undefined на этот момент!

// Результат зависит от порядка загрузки — БАГИ

// === Как ESM обрабатывает циклы ===
// 1. Парсит все import/export (строит граф модулей)
// 2. Выполняет модули в порядке глубины (DFS post-order)
// 3. Live bindings позволяют "увидеть" значение позже,
//    НО на момент первого обращения оно может быть undefined

// === CJS при цикле ===
// Возвращает ЧАСТИЧНО выполненный module.exports
// (то что успело экспортироваться до require)

// === Как исправить ===

// Вариант 1: Вынести общий код в третий модуль
// shared.js → a.js, b.js оба импортируют из shared.js

// Вариант 2: Ленивый доступ через функцию
// a.js
export function getA() { return 'A' }

// b.js
import { getA } from './a.js'
export function getB() { return 'B uses ' + getA() }
// Функция вызывается ПОСЛЕ полной инициализации модулей

// Вариант 3: Dynamic import
// a.js
export async function init() {
  const { b } = await import('./b.js')
  // К этому моменту b.js полностью инициализирован
}`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">🔄 Циклические зависимости</span>
      </div>
      <p>
        Циклическая зависимость — модуль A импортирует B, а B импортирует A.
        ESM и CJS обрабатывают это по-разному, но оба могут дать <code>undefined</code>.
      </p>

      <CodeBlock language="javascript" title="Проблема и решения" code={code} />

      <div className="info-box warning" style={{ marginTop: '12px' }}>
        <strong>🔍 Как обнаружить:</strong> ESLint-плагин <code>eslint-plugin-import</code> с правилом
        <code> import/no-cycle</code> находит циклические зависимости.
        Madge и dependency-cruiser визуализируют граф модулей.
      </div>
    </div>
  )
}

/* ─── Bundler implications ────────────────────────────── */

function BundlerImplications() {
  const code = `// === Что делает бандлер с модулями ===

// 1. Разрешение путей (resolve)
import { helper } from './utils'
// → node_modules/utils/index.js  или  ./utils.ts  или  ./utils/index.js
// Зависит от настроек resolve в tsconfig/vite/webpack

// 2. Tree-shaking — удаление неиспользованного кода
// utils.js
export function used() { return 1 }     // ✅ попадёт в бандл
export function unused() { return 2 }   // ❌ удалится

// ⚠️ Tree-shaking работает ТОЛЬКО с ESM (статический анализ)
// ⚠️ Side effects мешают tree-shaking:
let counter = 0
export function increment() { counter++ }
// Бандлер не может удалить — вдруг counter важен?

// package.json — подсказка бандлеру
// { "sideEffects": false }           // весь пакет без побочных эффектов
// { "sideEffects": ["*.css"] }       // только CSS имеет side effects

// 3. Code splitting — разбиение на чанки
// Каждый dynamic import() → отдельный чанк
const Admin = () => import('./pages/Admin')  // → admin.[hash].js

// 4. Дедупликация — один модуль = одно выполнение
// Даже если 10 файлов импортируют lodash, он в бандле один раз

// === Форматы выходных файлов ===
// ESM  → import/export (для браузеров, modern apps)
// CJS  → require/exports (для Node.js)
// IIFE → самовызывающаяся функция (для <script>)
// UMD  → универсальный (ESM + CJS + global)`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">📦 Модули и бандлеры</span>
      </div>
      <p>
        Бандлеры (Vite, Webpack, Rollup, esbuild) используют модульную систему для
        оптимизации: tree-shaking, code splitting, дедупликация.
      </p>

      <CodeBlock language="javascript" title="Как бандлер работает с модулями" code={code} />
    </div>
  )
}

/* ─── Patterns ────────────────────────────────────────── */

function PatternsSection() {
  const code = `// === Паттерны организации модулей ===

// 1. Barrel exports (index.js)
// components/index.js
export { Button } from './Button'
export { Input } from './Input'
export { Modal } from './Modal'

// Использование — один импорт вместо трёх
import { Button, Input, Modal } from './components'

// ⚠️ Barrel exports + tree-shaking:
// Если бандлер не поддерживает — грузятся ВСЕ компоненты
// Next.js modularizeImports решает эту проблему

// 2. Conditional exports (package.json)
{
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",   // ESM
      "require": "./dist/cjs/index.js",  // CJS
      "types": "./dist/types/index.d.ts" // TypeScript
    },
    "./utils": "./dist/esm/utils.js"
  }
}

// 3. Изоляция через модули
// Каждый модуль — своя область видимости
// Нет глобальных переменных (в отличие от <script>)
// Модуль выполняется ОДИН раз, при первом import

// 4. Singleton через модуль
// config.js
const config = { apiUrl: '', debug: false }
export default config
// Все импортёры получают ОДИН и тот же объект`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">🎯 Паттерны и практика</span>
      </div>

      <CodeBlock language="javascript" title="Паттерны организации модулей" code={code} />

      <h4 style={{ marginTop: '16px' }}>Чеклист модульной архитектуры</h4>
      <ol className="info-list">
        <li>Используйте ESM (<code>import/export</code>) — это стандарт</li>
        <li>Один модуль = одна ответственность</li>
        <li>Используйте named экспорты (лучше для tree-shaking и рефакторинга)</li>
        <li>Избегайте циклических зависимостей (ESLint <code>import/no-cycle</code>)</li>
        <li>Будьте осторожны с barrel exports в больших проектах</li>
        <li>Помечайте <code>"sideEffects": false</code> в package.json своих библиотек</li>
        <li>Используйте <code>import()</code> для code splitting тяжёлых модулей</li>
      </ol>
    </div>
  )
}
