import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function JSXGuide() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>⚛️ JSX</h1>
        <p>Синтаксис для описания UI в JavaScript</p>
        <a 
          href="https://react.dev/learn/writing-markup-with-jsx" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 Документация React
        </a>
      </div>

      <WhatIsJSXSection />
      <JSXRulesSection />
      <JSXExpressionsDemo />
      <ConditionalRenderingDemo />
      <ListRenderingDemo />
    </div>
  )
}

function WhatIsJSXSection() {
  const basicCode = `// ═══════════════════════════════════════════════════════════════
// ⚛️ JSX — JavaScript XML
// ═══════════════════════════════════════════════════════════════

// JSX — это синтаксический сахар для React.createElement()

// Это JSX:
const element = <h1 className="title">Hello, world!</h1>;

// Компилируется в:
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello, world!'
);


// ═══════════════════════════════════════════════════════════════
// 🎯 ЗАЧЕМ JSX?
// ═══════════════════════════════════════════════════════════════
// ✅ Визуально похож на HTML — легче читать
// ✅ Полная мощь JavaScript внутри
// ✅ Статический анализ и автодополнение
// ✅ Ошибки на этапе компиляции`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Что такое JSX?</h3>
        <span className="card-badge">Основы</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">⚛️</span>
        <div className="info-box-content">
          <div className="info-box-title">JSX ≠ HTML</div>
          <p>JSX выглядит как HTML, но это JavaScript. Он компилируется в вызовы функций React.</p>
        </div>
      </div>

      <div className="visual-diagram" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div className="diagram-box effect" style={{ padding: '16px 24px' }}>
            <code>{'<h1>Hello</h1>'}</code>
          </div>
          <div style={{ fontSize: '2rem', color: 'var(--text-muted)' }}>→</div>
          <div className="diagram-box state" style={{ padding: '16px 24px' }}>
            <code>React.createElement('h1', null, 'Hello')</code>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={basicCode} language="tsx" />
      </div>
    </div>
  )
}

function JSXRulesSection() {
  const rulesCode = `// ═══════════════════════════════════════════════════════════════
// 📋 ПРАВИЛА JSX
// ═══════════════════════════════════════════════════════════════


// 1️⃣ Один корневой элемент
// ❌ Ошибка
return (
  <h1>Title</h1>
  <p>Text</p>
);

// ✅ Правильно — Fragment
return (
  <>
    <h1>Title</h1>
    <p>Text</p>
  </>
);


// 2️⃣ Все теги должны закрываться
// ❌ HTML-style
<img src="...">
<input type="text">
<br>

// ✅ JSX-style  
<img src="..." />
<input type="text" />
<br />


// 3️⃣ camelCase для атрибутов
// ❌ HTML
<div class="box" onclick="...">
<label for="input">

// ✅ JSX
<div className="box" onClick={...}>
<label htmlFor="input">


// 4️⃣ style — это объект
// ❌ HTML-style
<div style="color: red; font-size: 14px">

// ✅ JSX-style
<div style={{ color: 'red', fontSize: '14px' }}>`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">📋 Правила JSX</h3>
        <span className="card-badge">Важно</span>
      </div>

      <div className="features-grid" style={{ marginTop: '16px' }}>
        <div className="feature-card">
          <span className="feature-icon">1️⃣</span>
          <h4>Один корневой элемент</h4>
          <p>Используй {'<>'} Fragment</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">2️⃣</span>
          <h4>Закрывай теги</h4>
          <p>{'<img />'} вместо {'<img>'}</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">3️⃣</span>
          <h4>camelCase</h4>
          <p>className, onClick, htmlFor</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">4️⃣</span>
          <h4>style — объект</h4>
          <p>style={'{{}}'} двойные скобки</p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={rulesCode} language="tsx" />
      </div>
    </div>
  )
}

function JSXExpressionsDemo() {
  const [name, setName] = useState('React')
  const [count, setCount] = useState(0)

  const expressionsCode = `// ═══════════════════════════════════════════════════════════════
// 🔧 JAVASCRIPT В JSX — фигурные скобки { }
// ═══════════════════════════════════════════════════════════════

const name = 'React';
const count = 42;

// Переменные
<h1>Hello, {name}!</h1>

// Выражения
<p>Count: {count * 2}</p>
<p>Date: {new Date().toLocaleDateString()}</p>

// Вызовы функций
<p>{name.toUpperCase()}</p>
<p>{formatDate(date)}</p>

// Тернарный оператор
<p>{count > 0 ? 'Positive' : 'Zero or negative'}</p>

// Объекты (для style, например)
<div style={{ color: 'red', fontSize: 16 }}>

// Массивы методов
<ul>
  {items.map(item => <li key={item.id}>{item.name}</li>)}
</ul>


// ❌ НЕЛЬЗЯ использовать в { }:
// - if/else (используй тернарный)
// - for/while (используй map)
// - объявления переменных`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🔧 JavaScript выражения в JSX</h3>
        <span className="card-badge">Практика</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">{ }</span>
        <div className="info-box-content">
          <div className="info-box-title">Фигурные скобки</div>
          <p>Внутри {'{}'} можно использовать любое JavaScript выражение!</p>
        </div>
      </div>

      <div className="visual-diagram" style={{ marginTop: '20px' }}>
        <div style={{ background: 'var(--bg-code)', padding: '24px', borderRadius: '12px' }}>
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ margin: 0 }}>Hello, <span style={{ color: 'var(--accent-blue)' }}>{name}</span>!</h2>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ margin: 0 }}>Count: <strong>{count}</strong> × 2 = <strong style={{ color: 'var(--accent-green)' }}>{count * 2}</strong></p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ margin: 0 }}>Uppercase: <strong style={{ color: 'var(--accent-purple)' }}>{name.toUpperCase()}</strong></p>
          </div>
          <div>
            <p style={{ margin: 0 }}>
              Status: <strong style={{ color: count > 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                {count > 0 ? '✅ Positive' : '⚠️ Zero or negative'}
              </strong>
            </p>
          </div>
        </div>
      </div>

      <div className="controls" style={{ marginTop: '20px' }}>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя..."
          style={{ width: '150px' }}
        />
        <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>
          count++
        </button>
        <button className="btn btn-secondary" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={expressionsCode} language="tsx" />
      </div>
    </div>
  )
}

function ConditionalRenderingDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState<'user' | 'admin' | 'guest'>('guest')

  const conditionalCode = `// ═══════════════════════════════════════════════════════════════
// 🔀 УСЛОВНЫЙ РЕНДЕРИНГ
// ═══════════════════════════════════════════════════════════════


// 1️⃣ Тернарный оператор — показать одно ИЛИ другое
{isLoggedIn ? <UserPanel /> : <LoginButton />}


// 2️⃣ && — показать ИЛИ ничего
{isAdmin && <AdminPanel />}

// ⚠️ Осторожно с числами!
{count && <Message />}  // ❌ Покажет 0!
{count > 0 && <Message />}  // ✅ Правильно


// 3️⃣ Ранний return — много условий
function Dashboard({ user }) {
  if (!user) return <LoginPage />;
  if (user.isBanned) return <BannedPage />;
  if (!user.isVerified) return <VerifyEmail />;
  
  return <UserDashboard user={user} />;
}


// 4️⃣ Вынести в переменную — сложная логика
let content;
if (isLoading) {
  content = <Spinner />;
} else if (error) {
  content = <Error message={error} />;
} else {
  content = <Data data={data} />;
}
return <div>{content}</div>;`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🔀 Условный рендеринг</h3>
        <span className="card-badge">Практика</span>
      </div>

      <div className="visual-diagram" style={{ marginTop: '20px' }}>
        <div style={{ background: 'var(--bg-code)', padding: '24px', borderRadius: '12px' }}>
          {/* Тернарный */}
          <div style={{ marginBottom: '16px', padding: '16px', background: 'var(--bg-hover)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Тернарный: {`{isLoggedIn ? <UserPanel /> : <LoginButton />}`}
            </div>
            {isLoggedIn ? (
              <div style={{ color: 'var(--accent-green)' }}>👤 Welcome, User!</div>
            ) : (
              <div style={{ color: 'var(--accent-blue)' }}>🔐 Please login</div>
            )}
          </div>

          {/* && */}
          <div style={{ marginBottom: '16px', padding: '16px', background: 'var(--bg-hover)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              &&: {`{role === 'admin' && <AdminPanel />}`}
            </div>
            {role === 'admin' && (
              <div style={{ color: 'var(--accent-red)' }}>🛡️ Admin Panel visible!</div>
            )}
            {role !== 'admin' && (
              <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Admin panel hidden</div>
            )}
          </div>

          {/* Multiple conditions */}
          <div style={{ padding: '16px', background: 'var(--bg-hover)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Role-based content:
            </div>
            {role === 'admin' && <div style={{ color: 'var(--accent-red)' }}>🛡️ Full admin access</div>}
            {role === 'user' && <div style={{ color: 'var(--accent-green)' }}>👤 Regular user access</div>}
            {role === 'guest' && <div style={{ color: 'var(--accent-blue)' }}>👋 Guest mode</div>}
          </div>
        </div>
      </div>

      <div className="controls" style={{ marginTop: '20px' }}>
        <button 
          className={`btn ${isLoggedIn ? 'btn-danger' : 'btn-success'}`}
          onClick={() => setIsLoggedIn(!isLoggedIn)}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
        <select 
          className="input" 
          value={role} 
          onChange={(e) => setRole(e.target.value as 'user' | 'admin' | 'guest')}
          style={{ width: '120px' }}
        >
          <option value="guest">Guest</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={conditionalCode} language="tsx" />
      </div>
    </div>
  )
}

function ListRenderingDemo() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', emoji: '🍎' },
    { id: 2, name: 'Banana', emoji: '🍌' },
    { id: 3, name: 'Orange', emoji: '🍊' },
  ])
  const [newItem, setNewItem] = useState('')

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { 
        id: Date.now(), 
        name: newItem, 
        emoji: ['🍇', '🍓', '🥝', '🍑'][Math.floor(Math.random() * 4)] 
      }])
      setNewItem('')
    }
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const listCode = `// ═══════════════════════════════════════════════════════════════
// 📋 РЕНДЕРИНГ СПИСКОВ
// ═══════════════════════════════════════════════════════════════

const items = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Orange' },
];

// Используем .map() для создания элементов
<ul>
  {items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>


// ═══════════════════════════════════════════════════════════════
// 🔑 KEY — ОБЯЗАТЕЛЕН!
// ═══════════════════════════════════════════════════════════════

// ❌ Без key — React не может оптимизировать
{items.map(item => <li>{item.name}</li>)}

// ❌ index как key — проблемы при удалении/сортировке
{items.map((item, index) => <li key={index}>{item.name}</li>)}

// ✅ Уникальный ID как key
{items.map(item => <li key={item.id}>{item.name}</li>)}


// ═══════════════════════════════════════════════════════════════
// 🎯 ПОЧЕМУ KEY ВАЖЕН?
// ═══════════════════════════════════════════════════════════════
// React использует key чтобы понять:
// - Какие элементы добавились
// - Какие удалились  
// - Какие переместились
// Без правильного key — лишние ре-рендеры и баги!`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">📋 Рендеринг списков</h3>
        <span className="card-badge">Практика</span>
      </div>

      <div className="info-box warning">
        <span className="info-box-icon">🔑</span>
        <div className="info-box-content">
          <div className="info-box-title">key — обязательный атрибут!</div>
          <p>Каждый элемент списка должен иметь уникальный <code>key</code>. Используйте ID из данных, не индекс массива.</p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <input
            className="input"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            placeholder="Новый фрукт..."
            style={{ flex: 1 }}
          />
          <button className="btn btn-success" onClick={addItem}>
            + Добавить
          </button>
        </div>

        <div style={{ background: 'var(--bg-code)', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            {`{items.map(item => <Item key={item.id} />)}`}
          </div>
          {items.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
              Список пуст. Добавьте элемент!
            </p>
          ) : (
            <ul className="info-list">
              {items.map(item => (
                <li 
                  key={item.id}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    marginBottom: '8px',
                    background: 'var(--bg-hover)',
                    borderRadius: '8px'
                  }}
                >
                  <span>
                    <span style={{ marginRight: '8px' }}>{item.emoji}</span>
                    {item.name}
                    <span style={{ marginLeft: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      key={item.id}
                    </span>
                  </span>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(item.id)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <CodeBlock code={listCode} language="tsx" />
      </div>
    </div>
  )
}
