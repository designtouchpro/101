import CodeBlock from '../../components/CodeBlock'

const layersCode = `// ═══ 7 СЛОЁВ FSD (сверху вниз) ═══

// 1. app/ — точка входа приложения
// Глобальные провайдеры, роутинг, стили
// src/app/
// ├── index.tsx          ← entry point
// ├── App.tsx            ← root component
// ├── providers/         ← Redux, QueryClient, Theme...
// ├── routing/           ← маршруты
// └── styles/            ← глобальные стили

// 2. pages/ — страницы приложения
// Композиция виджетов и фич для конкретного URL
// src/pages/
// ├── home/
// │   └── ui/HomePage.tsx
// ├── profile/
// │   └── ui/ProfilePage.tsx
// └── catalog/
//     └── ui/CatalogPage.tsx

// 3. widgets/ — самостоятельные блоки
// Композиция entities + features
// src/widgets/
// ├── header/
// │   └── ui/Header.tsx
// ├── sidebar/
// │   └── ui/Sidebar.tsx
// └── product-card/
//     ├── ui/ProductCard.tsx
//     └── model/useProductCard.ts

// 4. features/ — пользовательские действия
// Одна фича = одно действие пользователя
// src/features/
// ├── auth/
// │   ├── ui/LoginForm.tsx
// │   ├── model/authSlice.ts
// │   └── api/loginApi.ts
// ├── add-to-cart/
// │   ├── ui/AddToCartButton.tsx
// │   └── model/cartSlice.ts
// └── search/
//     ├── ui/SearchBar.tsx
//     └── api/searchApi.ts

// 5. entities/ — бизнес-сущности
// Данные + их отображение (без действий!)
// src/entities/
// ├── user/
// │   ├── ui/UserAvatar.tsx
// │   ├── model/types.ts
// │   └── api/userApi.ts
// ├── product/
// │   ├── ui/ProductPreview.tsx
// │   ├── model/types.ts
// │   └── api/productApi.ts
// └── order/
//     ├── ui/OrderStatus.tsx
//     └── model/types.ts

// 6. shared/ — переиспользуемый код
// Без бизнес-логики!
// src/shared/
// ├── ui/                ← Button, Input, Modal...
// ├── lib/               ← хелперы, утилиты
// ├── api/               ← axios instance, interceptors
// ├── config/            ← env, constants
// └── types/             ← общие типы`

const segmentsCode = `// СЕГМЕНТЫ — техническое разделение внутри слайса
// Стандартные сегменты:

// src/features/auth/
// ├── ui/            ← React-компоненты
// │   ├── LoginForm.tsx
// │   └── LoginForm.module.css
// ├── model/         ← Бизнес-логика (store, hooks)
// │   ├── authSlice.ts
// │   ├── useAuth.ts
// │   └── types.ts
// ├── api/           ← Запросы к серверу
// │   └── authApi.ts
// ├── lib/           ← Утилиты этого слайса
// │   └── validateEmail.ts
// ├── config/        ← Конфигурация
// │   └── authConfig.ts
// └── index.ts       ← PUBLIC API слайса (!)

// ═══ PUBLIC API — важнейший концепт! ═══

// features/auth/index.ts
export { LoginForm } from './ui/LoginForm'
export { useAuth } from './model/useAuth'
export type { User, AuthState } from './model/types'

// НЕЛЬЗЯ импортировать напрямую вглубь слайса:
// ❌ import { authSlice } from 'features/auth/model/authSlice'
// ✅ import { LoginForm, useAuth } from 'features/auth'

// Это позволяет:
// • Менять внутреннюю структуру без breaking changes
// • Контролировать что экспортируется
// • Упрощать рефакторинг`

const exampleCode = `// ═══ Практический пример: интернет-магазин ═══

// src/
// ├── app/
// │   ├── App.tsx
// │   ├── providers/
// │   │   ├── StoreProvider.tsx
// │   │   └── RouterProvider.tsx
// │   └── routing/
// │       └── routes.tsx
// │
// ├── pages/
// │   ├── catalog/
// │   │   └── ui/CatalogPage.tsx      ← композиция виджетов
// │   └── cart/
// │       └── ui/CartPage.tsx
// │
// ├── widgets/
// │   ├── header/
// │   │   └── ui/Header.tsx           ← Лого + SearchBar + CartIcon
// │   └── product-list/
// │       └── ui/ProductList.tsx       ← Список ProductCard
// │
// ├── features/
// │   ├── add-to-cart/
// │   │   ├── ui/AddToCartButton.tsx   ← Кнопка "В корзину"
// │   │   └── model/cartModel.ts
// │   ├── search-products/
// │   │   ├── ui/SearchBar.tsx
// │   │   └── api/searchApi.ts
// │   └── toggle-favorite/
// │       ├── ui/FavoriteButton.tsx
// │       └── model/favoritesModel.ts
// │
// ├── entities/
// │   ├── product/
// │   │   ├── ui/ProductCard.tsx       ← Только отображение
// │   │   ├── model/types.ts
// │   │   ├── api/productApi.ts
// │   │   └── index.ts
// │   └── user/
// │       ├── ui/UserAvatar.tsx
// │       ├── model/types.ts
// │       └── index.ts
// │
// └── shared/
//     ├── ui/
//     │   ├── Button.tsx
//     │   ├── Input.tsx
//     │   └── Modal.tsx
//     ├── api/
//     │   └── apiClient.ts
//     └── lib/
//         ├── formatPrice.ts
//         └── pluralize.ts`

const compositionCode = `// Как слои компонуются друг с другом

// === entities/product/ui/ProductCard.tsx ===
// Только отображение сущности, без действий
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{formatPrice(product.price)}</p>
      {/* Слот для действий — передаётся сверху */}
      {/* ProductCard НЕ знает о корзине! */}
    </div>
  )
}

// === features/add-to-cart/ui/AddToCartButton.tsx ===
// Фича = действие пользователя
import { useCartStore } from '../model/cartModel'

export function AddToCartButton({ productId }: { productId: string }) {
  const addItem = useCartStore(s => s.addItem)
  return <button onClick={() => addItem(productId)}>🛒 В корзину</button>
}

// === widgets/product-list/ui/ProductList.tsx ===
// Виджет компонует Entity + Feature
import { ProductCard } from 'entities/product'
import { AddToCartButton } from 'features/add-to-cart'
import { FavoriteButton } from 'features/toggle-favorite'

export function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product}>
          {/* Виджет решает КАКИЕ действия показать */}
          <AddToCartButton productId={product.id} />
          <FavoriteButton productId={product.id} />
        </ProductCard>
      ))}
    </div>
  )
}

// === pages/catalog/ui/CatalogPage.tsx ===
// Страница компонует виджеты
import { Header } from 'widgets/header'
import { ProductList } from 'widgets/product-list'
import { useProducts } from 'entities/product'

export function CatalogPage() {
  const { data: products } = useProducts()
  return (
    <>
      <Header />
      <h1>Каталог</h1>
      <ProductList products={products ?? []} />
    </>
  )
}`

const rulesCode = `// ═══ ПРАВИЛА FSD ═══

// 1️⃣ Правило импортов (самое важное!)
// Слой может импортировать ТОЛЬКО из нижестоящих слоёв
// app → pages → widgets → features → entities → shared

// ✅ Правильно:
import { Button } from 'shared/ui'           // widget → shared
import { ProductCard } from 'entities/product' // feature → entity
import { AddToCart } from 'features/add-to-cart' // widget → feature

// ❌ Неправильно:
import { Header } from 'widgets/header'       // feature → widget (вверх!)
import { CartPage } from 'pages/cart'          // widget → page (вверх!)

// 2️⃣ Слайсы одного слоя НЕ импортируют друг друга
// ❌ features/auth НЕ может import из features/cart
// Если нужно — поднять общее в entities/ или shared/

// 3️⃣ Public API обязателен
// Каждый слайс экспортирует только через index.ts
// ❌ import { authSlice } from 'features/auth/model/authSlice'
// ✅ import { useAuth } from 'features/auth'

// 4️⃣ Entities — отображение БЕЗ действий
// ProductCard показывает товар, но НЕ добавляет в корзину
// Действия — это features

// 5️⃣ Features — одно действие = один слайс
// ❌ features/product (слишком общо)
// ✅ features/add-to-cart
// ✅ features/remove-from-cart
// ✅ features/toggle-favorite

// 6️⃣ Cross-imports через composition
// Если feature A и feature B нужны вместе →
// Компонуем их в widget или page`

const linterCode = `// Автоматизация правил через ESLint

// eslint-plugin-import + eslint-plugin-boundaries
// или @feature-sliced/eslint-config

// .eslintrc.js
module.exports = {
  plugins: ['boundaries'],
  settings: {
    'boundaries/elements': [
      { type: 'app',       pattern: 'app/*' },
      { type: 'pages',     pattern: 'pages/*' },
      { type: 'widgets',   pattern: 'widgets/*' },
      { type: 'features',  pattern: 'features/*' },
      { type: 'entities',  pattern: 'entities/*' },
      { type: 'shared',    pattern: 'shared/*' },
    ]
  },
  rules: {
    'boundaries/element-types': ['error', {
      default: 'disallow',
      rules: [
        // shared может всё (кроме себя)
        { from: 'shared',    allow: [] },
        // entities → только shared
        { from: 'entities',  allow: ['shared'] },
        // features → entities + shared
        { from: 'features',  allow: ['entities', 'shared'] },
        // widgets → features + entities + shared
        { from: 'widgets',   allow: ['features', 'entities', 'shared'] },
        // pages → widgets + features + entities + shared
        { from: 'pages',     allow: ['widgets', 'features', 'entities', 'shared'] },
        // app → всё
        { from: 'app',       allow: ['pages', 'widgets', 'features', 'entities', 'shared'] },
      ]
    }],
    // Запрет cross-imports внутри одного слоя
    'boundaries/entry-point': ['error', {
      default: 'disallow',
      rules: [{ target: ['*'], allow: 'index.ts' }]
    }]
  }
}

// Алиасы в tsconfig / vite для красивых импортов
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "app/*":      ["./src/app/*"],
      "pages/*":    ["./src/pages/*"],
      "widgets/*":  ["./src/widgets/*"],
      "features/*": ["./src/features/*"],
      "entities/*": ["./src/entities/*"],
      "shared/*":   ["./src/shared/*"]
    }
  }
}`

export default function FSDArchitecture() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🍰 Feature-Sliced Design (FSD)</h1>
        <p>Архитектурная методология для фронтенд-проектов: слои, слайсы, сегменты</p>
        <a href="https://feature-sliced.design/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
          📚 feature-sliced.design
        </a>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Что такое FSD?</h3>
          <span className="card-badge">Обзор</span>
        </div>
        <div className="info-box">
          <span className="info-box-icon">🍰</span>
          <div className="info-box-content">
            <div className="info-box-title">Layers → Slices → Segments</div>
            <p>FSD — это строгая иерархия из 7 слоёв. Каждый слой содержит слайсы (домены). Внутри слайса — сегменты (ui, model, api, lib). Правило: импортировать можно только из нижних слоёв!</p>
          </div>
        </div>

        <div style={{ padding: '16px 0' }}>
          <h4 style={{ margin: '0 0 6px', color: 'var(--text-primary)' }}>3 концепции</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {[['1. Layers', '7 уровней с чёткой иерархией'], ['2. Slices', 'Домены/фичи внутри слоёв'], ['3. Segments', 'Технические категории (ui, model, api)']].map(([t, d], i) => (
              <div key={i} style={{ flex: '1', minWidth: '160px', background: 'var(--bg-secondary)', borderRadius: '8px', padding: '10px 14px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{t}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{d}</div>
              </div>
            ))}
          </div>

          <h4 style={{ margin: '0 0 8px', color: 'var(--text-primary)' }}>7 слоёв (сверху вниз)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              ['app/', 'Инициализация, провайдеры, роутинг', '#ef4444'],
              ['pages/', 'Страницы / экраны', '#f59e0b'],
              ['widgets/', 'Самостоятельные блоки UI', '#eab308'],
              ['features/', 'Действия пользователя', '#22c55e'],
              ['entities/', 'Бизнес-сущности', '#3b82f6'],
              ['shared/', 'Переиспользуемый код без бизнес-логики', '#8b5cf6'],
            ].map(([name, desc, color], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 14px', background: color + '11', borderLeft: '3px solid ' + color, borderRadius: '4px' }}>
                <code style={{ fontWeight: 700, color, fontSize: '0.85rem', minWidth: '80px' }}>{name}</code>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>← {desc}</span>
              </div>
            ))}
          </div>
          <p style={{ margin: '12px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Правило импортов: слой может импортировать <strong>только из нижестоящих</strong>. app → pages → widgets → features → entities → shared. Никогда обратно!
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">7 слоёв</h3>
          <span className="card-badge badge-success">Layers</span>
        </div>
        <div className="info-box">
          <span className="info-box-icon">📊</span>
          <div className="info-box-content">
            <div className="info-box-title">Иерархия обязательна!</div>
            <p>app → pages → widgets → features → entities → shared. Каждый слой знает только о нижестоящих. Никогда наоборот.</p>
          </div>
        </div>
        <CodeBlock code={layersCode} language="typescript" title="🏗 Все слои с примерами структуры" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Сегменты и Public API</h3>
          <span className="card-badge badge-info">Segments</span>
        </div>
        <div className="info-box warning">
          <span className="info-box-icon">⚠️</span>
          <div className="info-box-content">
            <div className="info-box-title">Public API — обязательно!</div>
            <p>Каждый слайс экспортирует только через index.ts. Запрещено импортировать внутренности слайса напрямую. Это защищает от breaking changes при рефакторинге.</p>
          </div>
        </div>
        <CodeBlock code={segmentsCode} language="typescript" title="📦 Стандартные сегменты и Public API" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Пример: интернет-магазин</h3>
          <span className="card-badge badge-success">Практика</span>
        </div>
        <CodeBlock code={exampleCode} language="typescript" title="🛒 Полная структура e-commerce" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Композиция слоёв</h3>
          <span className="card-badge badge-warning">Ключевой паттерн</span>
        </div>
        <div className="info-box">
          <span className="info-box-icon">🧩</span>
          <div className="info-box-content">
            <div className="info-box-title">Entity + Feature = Widget</div>
            <p>Entity отображает данные, Feature добавляет действия, Widget компонует их вместе. Page компонует виджеты для конкретного URL.</p>
          </div>
        </div>
        <CodeBlock code={compositionCode} language="typescript" title="🧩 Как слои компонуются" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Правила FSD</h3>
          <span className="card-badge badge-warning">Важно!</span>
        </div>
        <CodeBlock code={rulesCode} language="typescript" title="📏 6 главных правил" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Автоматизация через ESLint</h3>
          <span className="card-badge badge-info">Линтинг</span>
        </div>
        <CodeBlock code={linterCode} language="typescript" title="🔧 ESLint + boundaries" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Плюсы, минусы, когда использовать</h3>
          <span className="card-badge">Решение</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(34,197,94,0.08)', borderRadius: '8px', padding: '16px', borderLeft: '3px solid #22c55e' }}>
            <h4 style={{ margin: '0 0 10px', color: '#4ade80' }}>✅ Плюсы</h4>
            <ul className="info-list">
              <li>Понятно куда класть файлы — ответ однозначный</li>
              <li>Масштабируется: от 3 до 30 человек</li>
              <li>Изоляция: баг в одной фиче не ломает другие</li>
              <li>Понятные границы между модулями</li>
              <li>Лёгкий рефакторинг через Public API</li>
              <li>Популярен в СНГ — часто на собесах!</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(239,68,68,0.08)', borderRadius: '8px', padding: '16px', borderLeft: '3px solid #ef4444' }}>
            <h4 style={{ margin: '0 0 10px', color: '#f87171' }}>❌ Минусы</h4>
            <ul className="info-list">
              <li>Кривая обучения: 7 слоёв — не интуитивно сразу</li>
              <li>Оверхед на маленьких проектах</li>
              <li>entity vs feature — граница иногда размыта</li>
              <li>Много index.ts файлов</li>
              <li>Пока не стандарт за пределами СНГ</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(59,130,246,0.08)', borderRadius: '8px', padding: '16px', borderLeft: '3px solid #3b82f6' }}>
            <h4 style={{ margin: '0 0 10px', color: '#60a5fa' }}>🎯 Когда использовать</h4>
            <ul className="info-list">
              <li>Средние и крупные фронтенд-проекты</li>
              <li>Команда &gt; 3 человек</li>
              <li>Долгоживущий проект (&gt; 1 года)</li>
              <li>Когда важно единообразие в команде</li>
            </ul>
          </div>
        </div>

        <div className="info-box">
          <span className="info-box-icon">🔀</span>
          <div className="info-box-content">
            <div className="info-box-title">FSD vs другие архитектуры</div>
            <p>FSD ≈ Clean Architecture для фронтенда, но проще: 7 фиксированных слоёв вместо абстрактных «entities» и «use cases». Модульная архитектура (modules/auth/) не даёт иерархии → хаос. FSD даёт <strong>иерархию + модульность</strong>.</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">❓ Вопросы на собеседовании</h3>
          <span className="card-badge badge-warning">Interview</span>
        </div>
        {[
          { q: 'Назовите 7 слоёв FSD в правильном порядке', a: 'app → (processes, deprecated) → pages → widgets → features → entities → shared. Импорт только вниз по иерархии.' },
          { q: 'Чем feature отличается от entity?', a: 'Entity — бизнес-сущность и её отображение БЕЗ действий (ProductCard). Feature — действие пользователя (AddToCart). Entity не знает о features.' },
          { q: 'Что такое Public API в FSD и зачем он нужен?', a: 'index.ts файл каждого слайса, определяющий что экспортируется наружу. Запрещает прямой импорт внутренностей. Позволяет рефакторить без breaking changes.' },
          { q: 'Что делать если две фичи зависят друг от друга?', a: 'Cross-imports внутри слоя запрещены. Общую логику нужно вынести в entities/ или shared/. Или скомпоновать обе фичи в widget.' },
          { q: 'Как FSD соотносится с Clean Architecture?', a: 'FSD — это конкретная реализация идей Clean Architecture для фронтенда. shared ≈ Entities, entities+features ≈ Use Cases, widgets+pages ≈ Interface Adapters, app ≈ Frameworks.' },
        ].map((item, i) => (
          <div key={i} style={{ padding: '12px 16px', marginBottom: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: '3px solid var(--accent-primary)' }}>
            <div style={{ fontWeight: 600, color: '#e0e0e0', marginBottom: 6 }}>{item.q}</div>
            <div style={{ color: '#999', fontSize: 14, lineHeight: 1.5 }}>{item.a}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
