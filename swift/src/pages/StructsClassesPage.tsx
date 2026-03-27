import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

export default function StructsClassesPage() {
  const [activeDemo, setActiveDemo] = useState<'value' | 'ref'>('value')

  return (
    <div className="demo-container">
      <h1>🏗️ Struct vs Class</h1>
      <p>
        В Swift есть два способа создать пользовательский тип данных: <code>struct</code> (value type)
        и <code>class</code> (reference type). Это одно из <strong>фундаментальных решений</strong> при
        проектировании — от него зависит поведение при присваивании, передаче в функции и работа с памятью.
        В Swift по умолчанию предпочтение отдаётся struct.
      </p>

      {/* ─── Value vs Reference ─── */}
      <section className="card">
        <h2>🔑 Ключевое отличие: Value vs Reference semantics</h2>
        <p>
          Struct — <strong>value type</strong>: при присваивании или передаче создаётся копия.
          Class — <strong>reference type</strong>: при присваивании копируется только ссылка,
          данные общие. Это похоже на разницу между примитивами и объектами в JavaScript.
        </p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <button onClick={() => setActiveDemo('value')} style={{
            padding: '10px 20px',
            background: activeDemo === 'value' ? '#4CAF50' : 'var(--bg-tertiary)',
            color: activeDemo === 'value' ? '#fff' : 'inherit',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
          }}>Value Type (struct)</button>
          <button onClick={() => setActiveDemo('ref')} style={{
            padding: '10px 20px',
            background: activeDemo === 'ref' ? '#2196F3' : 'var(--bg-tertiary)',
            color: activeDemo === 'ref' ? '#fff' : 'inherit',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
          }}>Reference Type (class)</button>
        </div>

        {activeDemo === 'value' ? (
          <>
            <div style={{
              display: 'flex',
              gap: 20,
              alignItems: 'center',
              justifyContent: 'center',
              margin: '20px 0',
              flexWrap: 'wrap',
            }}>
              <div style={{ padding: '16px 24px', background: '#4CAF5022', border: '2px solid #4CAF50', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>a</div>
                <div style={{ fontFamily: 'monospace' }}>Point(x: 1, y: 2)</div>
              </div>
              <div style={{ fontSize: '2rem' }}>📋→</div>
              <div style={{ padding: '16px 24px', background: '#FF980022', border: '2px solid #FF9800', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>b = a</div>
                <div style={{ fontFamily: 'monospace' }}>Point(x: 1, y: 2)</div>
                <div style={{ fontSize: '0.8rem', color: '#FF9800', marginTop: 4 }}>независимая копия</div>
              </div>
            </div>
            <CodeBlock language="swift" code={`struct Point {
    var x: Double
    var y: Double
}

var a = Point(x: 1, y: 2)
var b = a           // КОПИЯ! b — независимая переменная
b.x = 10

print(a.x)  // 1   — оригинал не изменился
print(b.x)  // 10  — изменилась только копия`} />
          </>
        ) : (
          <>
            <div style={{
              display: 'flex',
              gap: 20,
              alignItems: 'center',
              justifyContent: 'center',
              margin: '20px 0',
              flexWrap: 'wrap',
            }}>
              <div style={{ padding: '16px 24px', background: '#2196F322', border: '2px solid #2196F3', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>a</div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>ссылка → 0xABC</div>
              </div>
              <div style={{ padding: '16px 24px', background: '#9C27B022', border: '2px solid #9C27B0', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>b = a</div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>ссылка → 0xABC</div>
              </div>
              <div style={{ fontSize: '1.5rem' }}>⟶</div>
              <div style={{ padding: '16px 24px', background: '#f4433622', border: '2px solid #f44336', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>Heap 0xABC</div>
                <div style={{ fontFamily: 'monospace' }}>Person(name: "...")</div>
                <div style={{ fontSize: '0.8rem', color: '#f44336', marginTop: 4 }}>один объект в памяти</div>
              </div>
            </div>
            <CodeBlock language="swift" code={`class Person {
    var name: String
    init(name: String) { self.name = name }
}

let a = Person(name: "Анна")
let b = a           // ССЫЛКА! b указывает на тот же объект
b.name = "Борис"

print(a.name)  // "Борис" — изменился и оригинал!
print(b.name)  // "Борис"
// a и b — два указателя на один объект в heap`} />
          </>
        )}
      </section>

      {/* ─── Сравнительная таблица ─── */}
      <section className="card">
        <h2>📊 Struct vs Class — полное сравнение</h2>
        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Свойство</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Struct</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Class</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Тип', 'Value type (стек)', 'Reference type (heap)'],
              ['Наследование', '❌ Нет', '✅ Да'],
              ['Протоколы', '✅ Да', '✅ Да'],
              ['Memberwise init', '✅ Автоматический', '❌ Нужен вручную'],
              ['Мутация', 'mutating методы', 'Без ограничений'],
              ['Сравнение', '== (если Equatable)', '=== (идентичность)'],
              ['Deinit', '❌ Нет', '✅ deinit {}'],
              ['ARC', '❌ Не нужен', '✅ Подсчёт ссылок'],
              ['Copy-on-Write', '✅ Для стд. типов', '❌ Нет (ссылка)'],
              ['Thread safety', '✅ Безопаснее', '⚠️ Требует синхронизации'],
            ].map(([prop, struct, cls]) => (
              <tr key={prop}>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>{prop}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>{struct}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>{cls}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ─── struct подробно ─── */}
      <section className="card">
        <h2>📝 Struct подробно</h2>

        <h3>Memberwise Initializer</h3>
        <p>
          Компилятор автоматически создаёт инициализатор со всеми stored properties.
          Не нужно писать <code>init</code> вручную (если не нужна кастомная логика).
        </p>
        <CodeBlock language="swift" code={`struct User {
    let id: Int
    var name: String
    var email: String
    var isActive: Bool = true  // значение по умолчанию
}

// Автоматический memberwise init:
let user = User(id: 1, name: "Анна", email: "anna@mail.ru")
// isActive получит значение по умолчанию true

// Можно и так:
let user2 = User(id: 2, name: "Борис", email: "boris@mail.ru", isActive: false)`} />

        <h3>Mutating методы</h3>
        <p>
          Методы struct по умолчанию не могут менять <code>self</code>. Для мутации нужно ключевое
          слово <code>mutating</code>. Это заставляет явно маркировать побочные эффекты.
        </p>
        <CodeBlock language="swift" code={`struct Counter {
    private(set) var value: Int = 0

    mutating func increment() {
        value += 1
    }

    mutating func reset() {
        self = Counter()  // можно заменить весь self!
    }

    // Немутирующий метод — просто возвращает новое значение
    func incremented() -> Counter {
        var copy = self
        copy.value += 1
        return copy
    }
}

var counter = Counter()
counter.increment()         // value = 1
let new = counter.incremented()  // value = 2 (новый Counter)
print(counter.value)        // 1 — оригинал не изменён`} />
      </section>

      {/* ─── class подробно ─── */}
      <section className="card">
        <h2>📝 Class подробно</h2>

        <h3>Наследование</h3>
        <p>
          Главное преимущество class — поддержка наследования. Но Apple рекомендует
          использовать наследование осторожно и предпочитать композицию и протоколы.
        </p>
        <CodeBlock language="swift" code={`class Animal {
    let name: String
    init(name: String) { self.name = name }

    func sound() -> String { "..." }

    // final запрещает переопределение
    final func description() -> String {
        "\\(name): \\(sound())"
    }
}

class Dog: Animal {
    let breed: String

    init(name: String, breed: String) {
        self.breed = breed
        super.init(name: name)  // обязательно вызвать super
    }

    override func sound() -> String { "Гав!" }
}

class Cat: Animal {
    override func sound() -> String { "Мяу!" }
}

let pets: [Animal] = [Dog(name: "Рекс", breed: "Овчарка"), Cat(name: "Мурка")]
pets.forEach { print($0.description()) }
// Рекс: Гав!
// Мурка: Мяу!`} />

        <h3>Идентичность (===)</h3>
        <CodeBlock language="swift" code={`let person1 = Person(name: "Анна")
let person2 = person1          // та же ссылка
let person3 = Person(name: "Анна")  // другой объект

person1 === person2  // true  — один объект
person1 === person3  // false — разные объекты в heap
// person1 == person3 — только если реализовать Equatable`} />
      </section>

      {/* ─── Когда что использовать ─── */}
      <section className="card">
        <h2>🤔 Когда struct, когда class?</h2>
        <p>Apple даёт чёткие рекомендации в официальной документации:</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, margin: '20px 0' }}>
          <div style={{ padding: 16, background: '#4CAF5011', border: '2px solid #4CAF50', borderRadius: 12 }}>
            <h3 style={{ color: '#4CAF50', margin: '0 0 12px 0' }}>✅ Используй Struct</h3>
            <ul className="info-list">
              <li>По умолчанию (default choice)</li>
              <li>Для моделей данных (User, Product, Point...)</li>
              <li>Когда не нужно наследование</li>
              <li>Когда нужна value semantics</li>
              <li>Когда важна thread safety</li>
              <li>Для SwiftUI views (<code>View</code> — протокол для struct)</li>
            </ul>
          </div>
          <div style={{ padding: 16, background: '#2196F311', border: '2px solid #2196F3', borderRadius: 12 }}>
            <h3 style={{ color: '#2196F3', margin: '0 0 12px 0' }}>🔵 Используй Class</h3>
            <ul className="info-list">
              <li>Нужно наследование (UIKit subclassing)</li>
              <li>Нужна идентичность объекта (===)</li>
              <li>Shared mutable state (reference semantics)</li>
              <li>Interop с Objective-C</li>
              <li>Deinitializer (cleanup при уничтожении)</li>
              <li>Observable-объекты в SwiftUI</li>
            </ul>
          </div>
        </div>

        <div className="info-box">
          <strong>📌 Правило Apple:</strong> «Use structures by default. Use classes when you need
          Objective-C interoperability or when you need to control the identity of the data you're modeling.»
          — <a href="https://developer.apple.com/documentation/swift/choosing-between-structures-and-classes" target="_blank" rel="noopener noreferrer">Choosing Between Structures and Classes</a>
        </div>
      </section>

      {/* ─── JS сравнение ─── */}
      <section className="card">
        <h2>🔄 Аналогия с JavaScript/TypeScript</h2>
        <p>
          В JS нет struct. Объекты и классы — reference types. Чтобы получить value semantics
          в JS, нужно использовать spread-оператор или immer. Swift решает это на уровне языка.
        </p>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift</h3>
            <CodeBlock language="swift" code={`struct Config {
    var theme: String
    var fontSize: Int
}

var a = Config(theme: "dark", fontSize: 14)
var b = a
b.theme = "light"

// a.theme = "dark"  ← безопасно!
// b.theme = "light"`} />
          </div>
          <div className="feature-card">
            <h3>JavaScript</h3>
            <CodeBlock language="swift" code={`// JS — всё reference
const a = { theme: "dark", fontSize: 14 }
const b = a
b.theme = "light"

// a.theme = "light" ← Ой! Мутация оригинала

// Чтобы избежать:
const c = { ...a }   // shallow copy
// или structuredClone(a)  // deep copy`} />
          </div>
        </div>
      </section>
    </div>
  )
}
