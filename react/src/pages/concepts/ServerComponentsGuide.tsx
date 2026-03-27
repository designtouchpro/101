import CodeBlock from '../../components/CodeBlock'

export default function ServerComponentsGuide() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🖥️ Server Components</h1>
        <p>Компоненты, которые выполняются только на сервере</p>
        <a 
          href="https://react.dev/reference/rsc/server-components" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 Документация React
        </a>
      </div>

      <OverviewSection />
      <ComparisonSection />
      <WhenToUseSection />
      <PatternsSection />
    </div>
  )
}

function OverviewSection() {
  const overviewCode = `// ═══════════════════════════════════════════════════════════════
// 🖥️ SERVER COMPONENTS — что это?
// ═══════════════════════════════════════════════════════════════

// Server Component — компонент который:
// ✅ Выполняется ТОЛЬКО на сервере
// ✅ Не включается в JavaScript bundle клиента
// ✅ Имеет прямой доступ к БД, файлам, API
// ✅ Может быть async!

// По умолчанию в Next.js 13+ все компоненты — серверные
async function ProductPage({ id }) {
  // Прямой запрос к БД — никакого useEffect!
  const product = await db.products.findUnique({ 
    where: { id } 
  });
  
  // Чтение файла на сервере
  const readme = await fs.readFile('./README.md', 'utf-8');
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// 🎯 КЛЮЧЕВЫЕ ПРЕИМУЩЕСТВА
// ═══════════════════════════════════════════════════════════════
// 1. Меньше JS отправляется клиенту
// 2. Прямой доступ к backend ресурсам
// 3. Автоматический code splitting
// 4. Улучшенная безопасность (secrets на сервере)`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Что такое Server Components?</h3>
        <span className="card-badge badge-success">React 19</span>
      </div>

      <div className="info-box success">
        <span className="info-box-icon">🖥️</span>
        <div className="info-box-content">
          <div className="info-box-title">Революция в React</div>
          <p>Server Components позволяют писать компоненты, которые выполняются на сервере 
          и отправляют готовый HTML клиенту.</p>
        </div>
      </div>

      <div className="features-grid" style={{ marginTop: '20px' }}>
        <div className="feature-card">
          <span className="feature-icon">📦</span>
          <h4>Меньше JS</h4>
          <p>Код не попадает в bundle клиента</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🗄️</span>
          <h4>Прямой доступ к БД</h4>
          <p>Никаких API endpoints</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h4>async/await</h4>
          <p>Компоненты могут быть асинхронными</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔒</span>
          <h4>Безопасность</h4>
          <p>Секреты остаются на сервере</p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={overviewCode} language="tsx" />
      </div>
    </div>
  )
}

function ComparisonSection() {
  const serverCode = `// ═══════════════════════════════════════════════════════════════
// 🖥️ SERVER COMPONENT (по умолчанию в Next.js)
// ═══════════════════════════════════════════════════════════════

// Файл: app/products/page.tsx
// НЕТ 'use client' → это Server Component

import { db } from '@/lib/db';

async function ProductsPage() {
  // ✅ Прямой запрос к БД
  const products = await db.products.findMany();
  
  // ✅ Можно использовать серверные библиотеки
  // ✅ Секреты API не попадут к клиенту
  
  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}

// ❌ Нельзя использовать:
// - useState, useEffect, useContext
// - onClick, onChange и др. события
// - Browser APIs (localStorage, window)`

  const clientCode = `// ═══════════════════════════════════════════════════════════════
// 💻 CLIENT COMPONENT
// ═══════════════════════════════════════════════════════════════

// Файл: components/AddToCart.tsx
'use client';  // ← Директива делает компонент клиентским

import { useState } from 'react';

function AddToCartButton({ productId }) {
  const [loading, setLoading] = useState(false);
  
  // ✅ Можно использовать хуки
  // ✅ Можно обрабатывать события
  // ✅ Доступ к Browser APIs
  
  const handleClick = async () => {
    setLoading(true);
    await addToCart(productId);
    setLoading(false);
  };
  
  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Добавляю...' : 'В корзину'}
    </button>
  );
}

// ❌ Нельзя:
// - async компоненты
// - Прямой доступ к БД/файлам`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🔀 Server vs Client Components</h3>
        <span className="card-badge">Сравнение</span>
      </div>

      <div className="comparison-grid" style={{ marginTop: '20px' }}>
        <div className="comparison-card" style={{ borderColor: 'var(--accent-blue)' }}>
          <div className="comparison-header" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
            🖥️ Server Component
          </div>
          <div className="comparison-body">
            <ul className="info-list">
              <li>✅ async/await</li>
              <li>✅ Прямой доступ к БД</li>
              <li>✅ Чтение файлов</li>
              <li>✅ Секреты в безопасности</li>
              <li>❌ Нет useState/useEffect</li>
              <li>❌ Нет onClick</li>
              <li>❌ Нет Browser APIs</li>
            </ul>
          </div>
        </div>

        <div className="comparison-card" style={{ borderColor: 'var(--accent-purple)' }}>
          <div className="comparison-header" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
            💻 Client Component
          </div>
          <div className="comparison-body">
            <ul className="info-list">
              <li>✅ useState, useEffect</li>
              <li>✅ onClick, onChange</li>
              <li>✅ Browser APIs</li>
              <li>✅ Интерактивность</li>
              <li>❌ Нет async компонентов</li>
              <li>❌ Нет прямого доступа к БД</li>
              <li>❌ Код в bundle клиента</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={serverCode} language="tsx" title="🖥️ Server Component" />
      </div>

      <div style={{ marginTop: '16px' }}>
        <CodeBlock code={clientCode} language="tsx" title="💻 Client Component" />
      </div>
    </div>
  )
}

function WhenToUseSection() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🎯 Когда что использовать?</h3>
        <span className="card-badge">Практика</span>
      </div>

      <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
        <div className="info-box success">
          <span className="info-box-icon">🖥️</span>
          <div className="info-box-content">
            <div className="info-box-title">Используй Server Components для:</div>
            <ul className="info-list">
              <li>Получения данных из БД</li>
              <li>Статического контента</li>
              <li>SEO-важных страниц</li>
              <li>Компонентов без интерактивности</li>
              <li>Работы с секретами (API keys)</li>
            </ul>
          </div>
        </div>

        <div className="info-box" style={{ background: 'rgba(168, 85, 247, 0.1)', borderColor: 'var(--accent-purple)' }}>
          <span className="info-box-icon">💻</span>
          <div className="info-box-content">
            <div className="info-box-title">Используй Client Components для:</div>
            <ul className="info-list">
              <li>Форм и обработки ввода</li>
              <li>Кнопок, слайдеров, модалок</li>
              <li>Хуков (useState, useEffect)</li>
              <li>Browser APIs (localStorage)</li>
              <li>Сторонних библиотек с хуками</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="visual-diagram" style={{ marginTop: '24px' }}>
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>Типичная структура страницы</h4>
          <div style={{ display: 'inline-block', textAlign: 'left' }}>
            <div className="diagram-box effect" style={{ padding: '16px 24px', marginBottom: '8px' }}>
              🖥️ Page (Server) — загрузка данных
            </div>
            <div style={{ paddingLeft: '24px' }}>
              <div className="diagram-box state" style={{ padding: '12px 20px', marginBottom: '8px' }}>
                🖥️ ProductList (Server)
              </div>
              <div style={{ paddingLeft: '24px' }}>
                <div className="diagram-box component" style={{ padding: '10px 16px' }}>
                  💻 AddToCart (Client) — интерактивность
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PatternsSection() {
  const patternsCode = `// ═══════════════════════════════════════════════════════════════
// 📋 ПАТТЕРНЫ КОМПОЗИЦИИ
// ═══════════════════════════════════════════════════════════════

// 1️⃣ Server Component оборачивает Client Component
// Файл: app/dashboard/page.tsx (Server)

import { db } from '@/lib/db';
import { DashboardClient } from './DashboardClient';

async function DashboardPage() {
  // Загружаем данные на сервере
  const stats = await db.stats.findMany();
  
  // Передаём в клиентский компонент как props
  return <DashboardClient initialStats={stats} />;
}


// 2️⃣ Client Component внутри Server Component
// Файл: app/products/[id]/page.tsx (Server)

import { ProductDetails } from './ProductDetails';
import { AddToCart } from './AddToCart';  // 'use client'

async function ProductPage({ params }) {
  const product = await db.products.findUnique({
    where: { id: params.id }
  });
  
  return (
    <div>
      {/* Server Component */}
      <ProductDetails product={product} />
      
      {/* Client Component для интерактивности */}
      <AddToCart productId={product.id} />
    </div>
  );
}


// 3️⃣ Children pattern — Server внутри Client
// Файл: components/Modal.tsx (Client)
'use client';

function Modal({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <dialog open={open}>
      {children}  {/* Server Components могут быть здесь! */}
    </dialog>
  );
}

// Использование:
<Modal>
  <ServerComponent />  {/* ✅ Работает! */}
</Modal>`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">📋 Паттерны композиции</h3>
        <span className="card-badge">Продвинутое</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">Правило</div>
          <p>Client Components могут импортировать только Client Components. 
          Но Server Components можно передавать как children или props!</p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={patternsCode} language="tsx" />
      </div>
    </div>
  )
}
