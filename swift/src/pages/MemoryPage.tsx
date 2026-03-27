import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

export default function MemoryPage() {
  const [refCount, setRefCount] = useState(1)
  const [showRetainCycle, setShowRetainCycle] = useState(false)

  return (
    <div className="demo-container">
      <h1>🧠 ARC и управление памятью</h1>
      <p>
        Swift использует <strong>Automatic Reference Counting (ARC)</strong> для управления памятью
        class-объектов (reference types). ARC автоматически освобождает память, когда на объект
        не осталось ссылок. Но есть ловушка — <strong>retain cycles</strong> (циклические ссылки),
        которые могут приводить к утечкам памяти. Понимание ARC — обязательный навык для iOS-разработчика.
      </p>

      {/* ─── ARC визуализация ─── */}
      <section className="card">
        <h2>📊 Как работает ARC — интерактивная модель</h2>
        <p>
          Каждый class-объект имеет счётчик ссылок (reference count). Когда он достигает 0 —
          объект уничтожается и вызывается <code>deinit</code>.
        </p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          margin: '20px 0',
          padding: 24,
          background: 'var(--bg-tertiary)',
          borderRadius: 12,
        }}>
          <div style={{
            padding: '16px 32px',
            background: refCount > 0 ? '#4CAF5022' : '#f4433622',
            border: `2px solid ${refCount > 0 ? '#4CAF50' : '#f44336'}`,
            borderRadius: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Person("Анна")</div>
            <div style={{ fontFamily: 'monospace', marginTop: 4 }}>
              refCount = <strong style={{ color: refCount > 0 ? '#4CAF50' : '#f44336', fontSize: '1.3rem' }}>{refCount}</strong>
            </div>
            {refCount === 0 && <div style={{ color: '#f44336', fontWeight: 700, marginTop: 8 }}>💀 deinit вызван — память освобождена</div>}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            {Array.from({ length: refCount }).map((_, i) => (
              <div key={i} style={{
                padding: '8px 16px',
                background: '#2196F322',
                border: '2px solid #2196F3',
                borderRadius: 8,
                fontFamily: 'monospace',
                fontSize: '0.85rem',
              }}>
                ref{i + 1} →
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setRefCount(c => c + 1)} style={{
              padding: '8px 16px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer',
            }}>+ Новая ссылка (retain)</button>
            <button onClick={() => setRefCount(c => Math.max(0, c - 1))} style={{
              padding: '8px 16px', background: '#f44336', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer',
            }}>- Убрать ссылку (release)</button>
            <button onClick={() => setRefCount(1)} style={{
              padding: '8px 16px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: 8, cursor: 'pointer',
            }}>Сброс</button>
          </div>
        </div>

        <CodeBlock language="swift" code={`class Person {
    let name: String
    init(name: String) {
        self.name = name
        print("\\(name) создан")
    }
    deinit {
        print("\\(name) освобождён")  // вызывается при refCount = 0
    }
}

var ref1: Person? = Person(name: "Анна")  // refCount = 1
var ref2 = ref1                            // refCount = 2
var ref3 = ref1                            // refCount = 3

ref1 = nil  // refCount = 2 — объект жив
ref2 = nil  // refCount = 1 — объект жив
ref3 = nil  // refCount = 0 — deinit! Память освобождена`} />
      </section>

      {/* ─── Value vs Reference Memory ─── */}
      <section className="card">
        <h2>📦 Стек vs Куча (Stack vs Heap)</h2>
        <p>
          Value types (struct, enum, tuple) хранятся на <strong>стеке</strong> — быстрое выделение/освобождение.
          Reference types (class) хранятся в <strong>куче</strong> (heap) — медленнее, но с разделяемым доступом.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, margin: '20px 0' }}>
          <div style={{ padding: 16, background: '#4CAF5011', border: '2px solid #4CAF50', borderRadius: 12 }}>
            <h3 style={{ color: '#4CAF50', margin: '0 0 8px' }}>📚 Stack (стек)</h3>
            <ul className="info-list">
              <li>Value types: Int, String, struct, enum</li>
              <li>LIFO — моментальное выделение/освобождение</li>
              <li>Каждый поток — свой стек</li>
              <li>Нет overhead на reference counting</li>
              <li>Размер ограничен (обычно 1-8 МБ)</li>
            </ul>
          </div>
          <div style={{ padding: 16, background: '#2196F311', border: '2px solid #2196F3', borderRadius: 12 }}>
            <h3 style={{ color: '#2196F3', margin: '0 0 8px' }}>🗄️ Heap (куча)</h3>
            <ul className="info-list">
              <li>Reference types: class, actor, closures</li>
              <li>Динамическое выделение (malloc/free)</li>
              <li>Разделяется между потоками</li>
              <li>Нужен ARC для управления</li>
              <li>Размер ограничен доступной RAM</li>
            </ul>
          </div>
        </div>
        <div className="info-box">
          <strong>💡 Почему struct быстрее class?</strong> Struct живёт на стеке — выделение за O(1).
          Class живёт на heap — alloc + dealloc + atomic refcount increment/decrement.
          Для маленьких моделей данных (Point, Color, Config) struct в разы быстрее.
        </div>
      </section>

      {/* ─── Retain Cycles ─── */}
      <section className="card">
        <h2>🔄 Retain Cycles — утечки памяти</h2>
        <p>
          Retain cycle возникает, когда два объекта ссылаются друг на друга strong ссылками.
          Ни один не может быть освобождён, потому что refCount никогда не станет 0.
          Это <strong>самая частая</strong> причина утечек памяти в iOS.
        </p>

        <button onClick={() => setShowRetainCycle(!showRetainCycle)} style={{
          padding: '10px 20px',
          background: showRetainCycle ? '#f44336' : '#FF9800',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          marginBottom: 16,
        }}>
          {showRetainCycle ? '🔓 Показать решение' : '🔒 Показать retain cycle'}
        </button>

        {/* Visual retain cycle */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
          margin: '20px 0',
          flexWrap: 'wrap',
        }}>
          <div style={{
            padding: '16px 24px',
            background: '#f4433622',
            border: '2px solid #f44336',
            borderRadius: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontWeight: 700 }}>Person</div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>var apartment: Apartment?</div>
            <div style={{ fontSize: '0.8rem', color: '#f44336' }}>refCount = 1 (never 0!)</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
              {showRetainCycle ? 'weak var tenant →' : 'strong →'}
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
              ← strong
            </div>
          </div>
          <div style={{
            padding: '16px 24px',
            background: showRetainCycle ? '#4CAF5022' : '#f4433622',
            border: `2px solid ${showRetainCycle ? '#4CAF50' : '#f44336'}`,
            borderRadius: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontWeight: 700 }}>Apartment</div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
              {showRetainCycle ? 'weak var tenant: Person?' : 'var tenant: Person?'}
            </div>
            <div style={{ fontSize: '0.8rem', color: showRetainCycle ? '#4CAF50' : '#f44336' }}>
              {showRetainCycle ? 'weak не увеличивает refCount' : 'refCount = 1 (never 0!)'}
            </div>
          </div>
        </div>

        <CodeBlock language="swift" code={`// ❌ RETAIN CYCLE — утечка памяти!
class Person {
    let name: String
    var apartment: Apartment?
    init(name: String) { self.name = name }
    deinit { print("\\(name) freed") }
}

class Apartment {
    let unit: String
    var tenant: Person?  // ← STRONG ссылка!
    init(unit: String) { self.unit = unit }
    deinit { print("Apartment \\(unit) freed") }
}

var john: Person? = Person(name: "John")
var unit4A: Apartment? = Apartment(unit: "4A")

john?.apartment = unit4A   // Person → Apartment (strong)
unit4A?.tenant = john      // Apartment → Person (strong)

john = nil     // refCount Person = 1 (Apartment всё ещё держит)
unit4A = nil   // refCount Apartment = 1 (Person всё ещё держит)
// 💀 Ни Person, ни Apartment не освобождены! УТЕЧКА!`} />

        <CodeBlock language="swift" code={`// ✅ РЕШЕНИЕ — weak ссылка
class Apartment {
    let unit: String
    weak var tenant: Person?  // ← WEAK! Не увеличивает refCount
    init(unit: String) { self.unit = unit }
    deinit { print("Apartment \\(unit) freed") }
}

// Теперь при john = nil:
// Person refCount = 0 → deinit → apartment ссылка обнуляется
// Apartment refCount = 0 → deinit
// ✅ Оба объекта освобождены!`} />
      </section>

      {/* ─── strong / weak / unowned ─── */}
      <section className="card">
        <h2>💪 strong, weak, unowned</h2>
        <p>
          Swift предоставляет три типа ссылок для управления ARC:
        </p>
        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Тип</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Увеличивает refCount?</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Optional?</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Когда использовать</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontWeight: 700, color: '#4CAF50' }}>strong</td>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>✅ Да</td>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>Не обязательно</td>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>По умолчанию. Владеющая ссылка.</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontWeight: 700, color: '#FF9800' }}>weak</td>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>❌ Нет</td>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>Всегда Optional (var)</td>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>Обратные ссылки, delegate, замыкания</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontWeight: 700, color: '#f44336' }}>unowned</td>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>❌ Нет</td>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>Не Optional (non-nil)</td>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>Когда exact lifetime гарантирован. Крэш при nil!</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock language="swift" code={`// weak — безопасная не-владеющая ссылка
class ViewController: UIViewController {
    weak var delegate: ProfileDelegate?  // delegate может исчезнуть
}

// unowned — когда точно знаем, что объект жив
class Customer {
    let name: String
    var card: CreditCard?
    init(name: String) { self.name = name }
}

class CreditCard {
    let number: UInt64
    unowned let customer: Customer  // карта не существует без клиента
    init(number: UInt64, customer: Customer) {
        self.number = number
        self.customer = customer
    }
}
// CreditCard всегда уничтожается раньше Customer,
// поэтому unowned безопасен`} />
      </section>

      {/* ─── Closures ─── */}
      <section className="card">
        <h2>📦 Retain cycles в замыканиях</h2>
        <p>
          Самый коварный источник retain cycles — замыкания, захватывающие <code>self</code>.
          Замыкание — reference type, и оно сильно удерживает всё, что захватывает.
        </p>
        <CodeBlock language="swift" code={`// ❌ Retain cycle через замыкание
class ViewModel {
    var name = "Анна"
    var onUpdate: (() -> Void)?

    func setup() {
        onUpdate = {
            print(self.name)  // замыкание захватывает self СИЛЬНО
        }
        // self → onUpdate (strong)
        // onUpdate → self (strong через capture)
        // 🔄 Retain cycle!
    }
}

// ✅ Решение 1: [weak self] — рекомендуемый
class ViewModel {
    func setup() {
        onUpdate = { [weak self] in
            guard let self else { return }  // Swift 5.7+ unwrap
            print(self.name)
        }
    }
}

// ✅ Решение 2: [unowned self] — если гарантируем lifetime
class ViewModel {
    func setup() {
        onUpdate = { [unowned self] in
            print(self.name)  // ⚠️ крэш если self уже освобождён
        }
    }
}

// ✅ Решение 3: capture конкретных значений
class ViewModel {
    func setup() {
        let currentName = self.name  // копируем значение
        onUpdate = {
            print(currentName)  // замыкание не захватывает self
        }
    }
}`} />

        <div className="info-box">
          <strong>🎯 Правило для iOS:</strong>
          <ul className="info-list">
            <li><code>[weak self]</code> — в @escaping замыканиях (сетевые запросы, таймеры, анимации)</li>
            <li><code>[unowned self]</code> — только когда на 100% уверены в lifetime (lazy var, parent-child)</li>
            <li>Не @escaping замыкания (map, filter, forEach) — <code>[weak self]</code> не нужен</li>
          </ul>
        </div>
      </section>

      {/* ─── Инструменты ─── */}
      <section className="card">
        <h2>🔍 Инструменты для диагностики</h2>
        <p>
          Xcode предоставляет мощные инструменты для обнаружения утечек памяти:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, margin: '20px 0' }}>
          {[
            { name: 'Memory Graph Debugger', icon: '🗺️', color: '#4CAF50', desc: 'Визуальный граф всех объектов и ссылок. Показывает retain cycles. Debug ▸ Memory Graph.' },
            { name: 'Instruments: Leaks', icon: '💧', color: '#2196F3', desc: 'Profile инструмент. Обнаруживает утечки в рантайме. Product ▸ Profile.' },
            { name: 'Instruments: Allocations', icon: '📊', color: '#FF9800', desc: 'Показывает все аллокации, retain/release, growth по времени.' },
            { name: 'Debug Memory Graph', icon: '🔬', color: '#9C27B0', desc: 'Runtime кнопка в Xcode. Замораживает app и показывает все живые объекты.' },
          ].map(tool => (
            <div key={tool.name} style={{
              padding: 16,
              background: tool.color + '11',
              border: `2px solid ${tool.color}`,
              borderRadius: 12,
            }}>
              <div style={{ fontSize: '1.2rem', marginBottom: 4 }}>{tool.icon} <strong>{tool.name}</strong></div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{tool.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Сравнение ─── */}
      <section className="card">
        <h2>🔄 Сравнение с JavaScript</h2>
        <p>
          JavaScript использует Garbage Collection (GC), а Swift — ARC. Оба автоматически
          управляют памятью, но по-разному:
        </p>
        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Аспект</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Swift ARC</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>JS Garbage Collection</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Механизм', 'Подсчёт ссылок (compile-time)', 'Mark & Sweep (runtime)'],
              ['Детерминизм', '✅ Объект удаляется сразу при refCount=0', '❌ GC запускается недетерминированно'],
              ['deinit', '✅ Гарантирован в точный момент', '❌ FinalizationRegistry (не гарантирован)'],
              ['Циклы', '⚠️ Нужен weak/unowned', '✅ GC находит циклы автоматически'],
              ['Паузы', '❌ Нет GC пауз', '⚠️ GC может вызвать микро-паузы'],
              ['Overhead', 'atomic increment/decrement', 'Traversal всего графа объектов'],
              ['Value types', '✅ Struct на стеке (0 overhead)', '❌ Все объекты в heap'],
            ].map(([aspect, swift, js]) => (
              <tr key={aspect}>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>{aspect}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>{swift}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>{js}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
