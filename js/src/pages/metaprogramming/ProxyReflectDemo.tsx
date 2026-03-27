import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

const proxyTraps = [
  { trap: 'get(target, prop, receiver)', desc: 'Чтение свойства', example: 'obj.name', use: 'Валидация, логирование, дефолты, реактивность (Vue!)' },
  { trap: 'set(target, prop, value, receiver)', desc: 'Запись свойства', example: 'obj.name = "new"', use: 'Валидация типов, триггер обновлений (Vue!)' },
  { trap: 'has(target, prop)', desc: 'Оператор in', example: '"name" in obj', use: 'Скрытие приватных свойств' },
  { trap: 'deleteProperty(target, prop)', desc: 'Оператор delete', example: 'delete obj.name', use: 'Запрет удаления' },
  { trap: 'apply(target, thisArg, args)', desc: 'Вызов функции', example: 'fn()', use: 'Декораторы, мемоизация' },
  { trap: 'construct(target, args)', desc: 'Оператор new', example: 'new Fn()', use: 'Фабрики, синглтоны' },
  { trap: 'ownKeys(target)', desc: 'Object.keys / for...in', example: 'Object.keys(obj)', use: 'Фильтрация ключей' },
  { trap: 'getPrototypeOf(target)', desc: 'Object.getPrototypeOf', example: 'obj instanceof Class', use: 'Маскировка типа' },
]

const reactiveCode = `// Упрощённый Vue 3 reactive()
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      track(target, key) // 📡 Подписка на зависимости
      // Рекурсивно оборачиваем вложенные объекты
      if (typeof result === 'object' && result !== null) {
        return reactive(result)
      }
      return result
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (oldValue !== value) {
        trigger(target, key) // 🔔 Уведомить подписчиков
      }
      return result
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key)
      trigger(target, key) // 🔔 Уведомить об удалении
      return result
    }
  }
  return new Proxy(target, handler)
}`

const reflectMethodsCode = `// Reflect — зеркало для Proxy
// Каждый trap в Proxy имеет соответствие в Reflect

// Вместо target[key]:
Reflect.get(target, 'name')           // target.name
Reflect.set(target, 'name', 'value')  // target.name = 'value'
Reflect.has(target, 'name')           // 'name' in target
Reflect.deleteProperty(target, 'name')// delete target.name
Reflect.ownKeys(target)              // Object.keys() + symbols

// Почему Reflect, а не target[key]?
// 1. Правильно работает с receiver (прототипы)
// 2. Возвращает boolean вместо throw
// 3. Одинаковый API с Proxy traps`

const validationCode = `// Proxy для валидации типов
const schema = {
  name: 'string',
  age: 'number',
  email: 'string'
}

function createValidated(schema, data = {}) {
  return new Proxy(data, {
    set(target, key, value) {
      if (!(key in schema)) {
        throw new Error(\`Неизвестное свойство: \${key}\`)
      }
      if (typeof value !== schema[key]) {
        throw new TypeError(
          \`\${key} должен быть \${schema[key]}, получен \${typeof value}\`
        )
      }
      return Reflect.set(target, key, value)
    }
  })
}

const user = createValidated(schema)
user.name = 'John'   // ✅ OK
user.age = 25         // ✅ OK
user.age = '25'       // ❌ TypeError!
user.unknown = true   // ❌ Error!`

const negativeIndexCode = `// Python-like отрицательные индексы
function negativeArray(arr) {
  return new Proxy(arr, {
    get(target, prop, receiver) {
      const index = Number(prop)
      if (Number.isInteger(index) && index < 0) {
        // arr[-1] → arr[arr.length - 1]
        return Reflect.get(target, target.length + index, receiver)
      }
      return Reflect.get(target, prop, receiver)
    }
  })
}

const arr = negativeArray([1, 2, 3, 4, 5])
arr[-1]  // 5  (последний)
arr[-2]  // 4  (предпоследний)
arr[0]   // 1  (обычный доступ работает)`

export default function ProxyReflectDemo() {
  const [activeTab, setActiveTab] = useState<'basics' | 'patterns' | 'vue' | 'interview'>('basics')
  
  // Interactive proxy demo
  const [proxyLog, setProxyLog] = useState<string[]>([])
  const [proxyInput, setProxyInput] = useState('')
  const [proxyKey, setProxyKey] = useState('name')
  
  const demoProxy = useState(() => {
    const target = { name: 'John', age: 30 }
    return new Proxy(target, {
      get(t, k) {
        const v = Reflect.get(t, k as string)
        setProxyLog(prev => [...prev.slice(-9), `GET ${String(k)} → ${JSON.stringify(v)}`])
        return v
      },
      set(t, k, v) {
        setProxyLog(prev => [...prev.slice(-9), `SET ${String(k)} = ${JSON.stringify(v)}`])
        return Reflect.set(t, k as string, v)
      }
    })
  })[0]

  const handleProxyGet = () => {
    const val = (demoProxy as any)[proxyKey]
  }

  const handleProxySet = () => {
    ;(demoProxy as any)[proxyKey] = proxyInput || 'value'
    setProxyInput('')
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🪞 Proxy & Reflect</h1>
        <p>
          Метапрограммирование в JS. Proxy перехватывает операции объекта, 
          Reflect предоставляет стандартные реализации. Основа реактивности Vue 3!
        </p>
      </div>

      <div className="tabs" style={{ marginBottom: '24px' }}>
        {[
          { key: 'basics', label: '📦 Основы' },
          { key: 'patterns', label: '🧩 Паттерны' },
          { key: 'vue', label: '💚 Vue Reactivity' },
          { key: 'interview', label: '🎯 Вопросы' },
        ].map(tab => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'basics' && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">🪞 Все ловушки (traps) Proxy</span>
              <span className="card-badge">13 ловушек</span>
            </div>

            <div className="info-box">
              <strong>Proxy</strong> = обёртка вокруг объекта, перехватывающая операции (чтение, запись, удаление...).
              Каждая перехватываемая операция называется <strong>trap</strong>.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px' }}>
              {proxyTraps.map(t => (
                <div key={t.trap} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 120px 120px 1fr',
                  gap: '12px',
                  padding: '10px 14px',
                  background: 'var(--bg-code)',
                  borderRadius: '6px',
                  alignItems: 'center',
                  fontSize: '0.85rem'
                }}>
                  <code style={{ color: 'var(--accent-cyan)' }}>{t.trap}</code>
                  <span style={{ color: 'var(--text-muted)' }}>{t.desc}</span>
                  <code style={{ color: 'var(--accent-orange)', fontSize: '0.8rem' }}>{t.example}</code>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{t.use}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">🎮 Интерактивный Proxy</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <h4 style={{ marginBottom: '8px' }}>Управление</h4>
                <div className="controls" style={{ flexDirection: 'column', gap: '8px' }}>
                  <input
                    className="input"
                    value={proxyKey}
                    onChange={e => setProxyKey(e.target.value)}
                    placeholder="Ключ (name, age, ...)"
                  />
                  <input
                    className="input"
                    value={proxyInput}
                    onChange={e => setProxyInput(e.target.value)}
                    placeholder="Значение для SET"
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-primary" onClick={handleProxyGet}>
                      GET .{proxyKey}
                    </button>
                    <button className="btn btn-secondary" onClick={handleProxySet}>
                      SET .{proxyKey}
                    </button>
                    <button className="btn btn-danger" onClick={() => setProxyLog([])}>
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '8px' }}>Лог ловушек</h4>
                <div style={{
                  padding: '12px',
                  background: 'var(--bg-code)',
                  borderRadius: '8px',
                  minHeight: '150px',
                  fontFamily: 'monospace',
                  fontSize: '0.82rem'
                }}>
                  {proxyLog.length === 0 ? (
                    <span style={{ color: 'var(--text-muted)' }}>Выполните GET или SET...</span>
                  ) : proxyLog.map((line, i) => (
                    <div key={i} style={{ 
                      padding: '4px 0',
                      color: line.startsWith('GET') ? 'var(--accent-cyan)' : 'var(--accent-orange)'
                    }}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reflect */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">🔄 Reflect — зачем нужен?</span>
            </div>

            <CodeBlock code={reflectMethodsCode} language="javascript" title="Reflect API" />

            <div className="info-box warning" style={{ marginTop: '16px' }}>
              <strong>⚠️ Всегда используйте Reflect внутри Proxy!</strong>
              <p style={{ marginTop: '4px' }}>
                <code>target[key]</code> внутри trap — ошибка. Не работает правильно с наследованием 
                и <code>receiver</code>. <code>Reflect.get(target, key, receiver)</code> — правильный способ.
              </p>
            </div>
          </div>
        </>
      )}

      {activeTab === 'patterns' && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">✅ Валидация через Proxy</span>
              <span className="card-badge">Полезный паттерн</span>
            </div>
            <CodeBlock code={validationCode} language="javascript" title="Type validation proxy" />
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">🐍 Отрицательные индексы (как в Python)</span>
            </div>
            <CodeBlock code={negativeIndexCode} language="javascript" title="arr[-1] → последний элемент" />
          </div>
        </>
      )}

      {activeTab === 'vue' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">💚 Как Vue 3 использует Proxy</span>
            <span className="card-badge">Ключевая тема!</span>
          </div>

          <div className="info-box">
            <strong>Vue 2 → Vue 3:</strong> Переход от <code>Object.defineProperty</code> к <code>Proxy</code>.
            Это позволило отслеживать добавление/удаление свойств и изменение массивов по индексу.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
            <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
              <h4 style={{ color: 'var(--accent-red)', marginBottom: '8px' }}>Vue 2 — Object.defineProperty</h4>
              <pre style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
{`// ❌ Не отслеживает:
obj.newProp = value    // Новое свойство
delete obj.prop        // Удаление
arr[0] = value         // Изменение по индексу
arr.length = 0         // Обрезка массива

// Нужны костыли:
Vue.set(obj, 'newProp', value)
Vue.delete(obj, 'prop')
arr.splice(0, 1, value)`}
              </pre>
            </div>

            <div style={{ padding: '16px', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.1)' }}>
              <h4 style={{ color: 'var(--accent-green)', marginBottom: '8px' }}>Vue 3 — Proxy</h4>
              <pre style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
{`// ✅ Всё работает из коробки:
obj.newProp = value    // Отслеживается!
delete obj.prop        // Отслеживается!
arr[0] = value         // Отслеживается!
arr.length = 0         // Отслеживается!

// Vue.set / Vue.delete больше не нужны
// Proxy перехватывает ВСЁ`}
              </pre>
            </div>
          </div>

          <CodeBlock code={reactiveCode} language="javascript" title="Упрощённый reactive() из Vue 3" />

          <div className="info-box" style={{ marginTop: '16px' }}>
            <strong>💡 Ключевое:</strong> Vue 3 lazy — вложенные объекты оборачиваются в Proxy 
            только при обращении к ним (в <code>get</code> trap). Vue 2 рекурсивно обходил все свойства при создании.
          </div>
        </div>
      )}

      {activeTab === 'interview' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">🎯 Вопросы для собеседования</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                q: 'Чем Proxy отличается от Object.defineProperty?',
                a: 'defineProperty работает на уровне отдельного свойства, нужно настраивать каждое. Proxy перехватывает операции на уровне всего объекта — включая добавление новых свойств, удаление, in, Object.keys() и т.д. Proxy не работает в IE11.'
              },
              {
                q: 'Зачем нужен Reflect внутри Proxy trap?',
                a: 'Reflect.get/set правильно обрабатывают receiver (this) при работе с прототипами. target[key] может вернуть неправильное значение в контексте наследования. Также Reflect.set возвращает boolean вместо throw.'
              },
              {
                q: 'Можно ли проксировать Map/Set?',
                a: 'Не напрямую — методы Map/Set проверяют this через internal slots. Нужно перехватывать get и возвращать привязанные методы: handler.get(target, prop) → если typeof result === "function", вернуть result.bind(target).'
              },
              {
                q: 'Как Vue 3 использует Proxy?',
                a: 'reactive() оборачивает объект в Proxy. get trap вызывает track() для подписки на зависимости. set trap вызывает trigger() для уведомления подписчиков. Вложенные объекты оборачиваются лениво при первом обращении.'
              },
              {
                q: 'Что такое revocable Proxy?',
                a: 'Proxy.revocable(target, handler) возвращает {proxy, revoke}. После вызова revoke() любое обращение к proxy бросает TypeError. Полезно для временного доступа к объекту и контроля жизненного цикла.'
              },
            ].map((item, i) => (
              <details key={i} className="interview-question">
                <summary style={{ 
                  cursor: 'pointer', 
                  padding: '14px 16px',
                  background: 'var(--bg-code)',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}>
                  {item.q}
                </summary>
                <div style={{ 
                  padding: '14px 16px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  borderLeft: '3px solid var(--accent-cyan)',
                  marginLeft: '16px',
                  marginTop: '8px'
                }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
