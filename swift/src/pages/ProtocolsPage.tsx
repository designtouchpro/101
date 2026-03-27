import CodeBlock from '../components/CodeBlock'

export default function ProtocolsPage() {
  return (
    <div className="demo-container">
      <h1>📋 Протоколы</h1>
      <p>
        Протоколы — основа архитектуры Swift и «protocol-oriented programming» (POP).
        Протокол определяет <em>контракт</em>: набор свойств и методов, которые тип обязан реализовать.
        Это аналог <code>interface</code> в TypeScript, но гораздо мощнее — протоколы поддерживают
        дефолтные реализации, associated types и ограничения (constraints).
      </p>

      {/* ─── Базовые протоколы ─── */}
      <section className="card">
        <h2>📝 Объявление и конформанс</h2>
        <p>
          Протокол описывает «что» тип должен уметь, но не «как». Конкретная реализация — дело
          конформирующего типа (struct, class, enum).
        </p>
        <CodeBlock language="swift" code={`// Объявление протокола
protocol Drawable {
    var color: String { get }              // read-only property
    var lineWidth: Double { get set }      // read-write property
    func draw()                            // required method
    mutating func reset()                  // mutating для struct/enum
}

// Конформанс struct
struct Circle: Drawable {
    var color: String
    var lineWidth: Double
    var radius: Double

    func draw() {
        print("Drawing circle r=\\(radius) color=\\(color)")
    }

    mutating func reset() {
        radius = 0
        lineWidth = 1
    }
}

// Конформанс class
class Rectangle: Drawable {
    var color: String
    var lineWidth: Double
    var width: Double
    var height: Double

    init(color: String, lineWidth: Double, width: Double, height: Double) {
        self.color = color
        self.lineWidth = lineWidth
        self.width = width
        self.height = height
    }

    func draw() {
        print("Drawing rect \\(width)x\\(height)")
    }

    func reset() {  // class — не нужен mutating
        width = 0
        height = 0
    }
}`} />

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift Protocol</h3>
            <CodeBlock language="swift" code={`protocol Printable {
    func description() -> String
}

struct User: Printable {
    let name: String
    func description() -> String {
        "User: \\(name)"
    }
}`} />
          </div>
          <div className="feature-card">
            <h3>TypeScript Interface</h3>
            <CodeBlock language="swift" code={`interface Printable {
    description(): string
}

class User implements Printable {
    constructor(readonly name: string) {}
    description(): string {
        return \`User: \${this.name}\`
    }
}`} />
          </div>
        </div>
      </section>

      {/* ─── Protocol Extensions ─── */}
      <section className="card">
        <h2>🔌 Protocol Extensions — дефолтные реализации</h2>
        <p>
          Главная суперсила протоколов Swift — можно дать <strong>дефолтную реализацию</strong>
          через extension. Это решает проблему «множественного наследования» без его недостатков.
          В TypeScript аналог — mixins (но менее удобно).
        </p>
        <CodeBlock language="swift" code={`protocol Describable {
    var name: String { get }
}

// Дефолтная реализация для ВСЕХ типов с Describable
extension Describable {
    func greet() -> String {
        "Привет, я \\(name)!"
    }

    var uppercasedName: String {
        name.uppercased()
    }
}

struct Cat: Describable {
    let name: String
    // greet() и uppercasedName доступны автоматически!
}

let cat = Cat(name: "Мурка")
cat.greet()             // "Привет, я Мурка!"
cat.uppercasedName      // "МУРКА"`} />

        <div className="info-box">
          <strong>💡 Protocol Extension vs Class Inheritance:</strong>
          <ul className="info-list">
            <li><strong>Наследование</strong> — один суперкласс, вертикальная иерархия</li>
            <li><strong>Protocol extensions</strong> — множественные протоколы, горизонтальная композиция</li>
            <li>Swift идиома: «Prefer composition over inheritance»</li>
          </ul>
        </div>
      </section>

      {/* ─── Protocol Composition ─── */}
      <section className="card">
        <h2>🧩 Композиция протоколов</h2>
        <p>
          Тип может конформить множество протоколов. А в сигнатурах функций можно требовать
          сразу несколько через <code>&amp;</code> (protocol composition).
        </p>
        <CodeBlock language="swift" code={`protocol Identifiable {
    var id: String { get }
}

protocol Nameable {
    var name: String { get }
}

protocol Emailable {
    var email: String { get }
}

// Тип конформит все три
struct Employee: Identifiable, Nameable, Emailable {
    let id: String
    let name: String
    let email: String
}

// Функция требует комбинацию протоколов
func sendWelcome(to person: Identifiable & Nameable & Emailable) {
    print("Отправляю приветствие \\(person.name) на \\(person.email)")
}

// typealias для удобства
typealias FullProfile = Identifiable & Nameable & Emailable
func loadProfile() -> FullProfile { ... }`} />
      </section>

      {/* ─── Associated Types ─── */}
      <section className="card">
        <h2>🧬 Associated Types (связанные типы)</h2>
        <p>
          Associated types делают протоколы <em>generic-like</em>. Конформирующий тип сам решает,
          какой конкретный тип использовать. Это аналог generic-параметров в TypeScript interfaces,
          но с другим синтаксисом.
        </p>
        <CodeBlock language="swift" code={`// Протокол с associated type
protocol Container {
    associatedtype Item           // тип определит конформирующий тип
    var count: Int { get }
    mutating func append(_ item: Item)
    subscript(i: Int) -> Item { get }
}

// Реализация 1: стек целых чисел
struct IntStack: Container {
    // typealias Item = Int      // можно явно, но компилятор выведет сам
    var items: [Int] = []
    var count: Int { items.count }

    mutating func append(_ item: Int) {
        items.append(item)
    }

    subscript(i: Int) -> Int {
        items[i]
    }
}

// Реализация 2: generic стек
struct Stack<Element>: Container {
    var items: [Element] = []
    var count: Int { items.count }

    mutating func append(_ item: Element) {
        items.append(item)
    }

    subscript(i: Int) -> Element {
        items[i]
    }
}`} />

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift</h3>
            <CodeBlock language="swift" code={`protocol Repository {
    associatedtype Model
    func getAll() -> [Model]
    func save(_ item: Model)
}

struct UserRepo: Repository {
    func getAll() -> [User] { ... }
    func save(_ item: User) { ... }
}`} />
          </div>
          <div className="feature-card">
            <h3>TypeScript</h3>
            <CodeBlock language="swift" code={`interface Repository<Model> {
    getAll(): Model[]
    save(item: Model): void
}

class UserRepo implements Repository<User> {
    getAll(): User[] { ... }
    save(item: User): void { ... }
}`} />
          </div>
        </div>
      </section>

      {/* ─── Existential vs Opaque ─── */}
      <section className="card">
        <h2>🎭 any vs some — экзистенциальные и непрозрачные типы</h2>
        <p>
          Начиная со Swift 5.7, есть два способа использовать протокол как тип:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, margin: '20px 0' }}>
          <div style={{ padding: 16, background: '#FF980022', border: '2px solid #FF9800', borderRadius: 12 }}>
            <h3 style={{ color: '#FF9800', margin: '0 0 8px' }}>any Protocol — экзистенциальный</h3>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>
              «Мне подойдёт <em>любой</em> тип, реализующий протокол».
              Runtime полиморфизм. Стирание типа (type erasure). Есть overhead.
            </p>
          </div>
          <div style={{ padding: 16, background: '#4CAF5022', border: '2px solid #4CAF50', borderRadius: 12 }}>
            <h3 style={{ color: '#4CAF50', margin: '0 0 8px' }}>some Protocol — непрозрачный</h3>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>
              «Вернётся <em>конкретный</em> тип, реализующий протокол, но вызывающий не знает какой».
              Compile-time. Нет overhead. Используется в SwiftUI.
            </p>
          </div>
        </div>

        <CodeBlock language="swift" code={`// any — экзистенциальный контейнер (runtime)
func randomShape() -> any Shape {
    if Bool.random() {
        return Circle(radius: 5)
    } else {
        return Square(side: 3)
    }
}

// some — opaque return type (compile-time)
func makeDefaultShape() -> some Shape {
    Circle(radius: 10)  // всегда один тип
}

// SwiftUI использует some View повсюду:
var body: some View {
    VStack {
        Text("Hello")
        Image(systemName: "star")
    }
}

// Массив разных типов — нужен any:
let shapes: [any Shape] = [Circle(radius: 5), Square(side: 3)]

// В параметрах — some = generic shorthand:
func draw(_ shape: some Shape) { ... }
// Эквивалентно:
func draw<S: Shape>(_ shape: S) { ... }`} />
      </section>

      {/* ─── Стандартные протоколы ─── */}
      <section className="card">
        <h2>📦 Важнейшие стандартные протоколы</h2>
        <p>
          Swift Standard Library содержит десятки протоколов. Вот самые важные, которые
          нужно знать каждому iOS-разработчику:
        </p>
        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Протокол</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Что даёт</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>TS аналог</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Equatable', '== сравнение', '—'],
              ['Hashable', 'Можно использовать как ключ Dictionary/Set', '—'],
              ['Comparable', '<, >, <=, >= + sorted()', '—'],
              ['Codable', 'JSON encode/decode автоматически', 'JSON.parse/stringify'],
              ['Identifiable', 'id свойство для SwiftUI списков', '—'],
              ['CustomStringConvertible', 'description для print()', 'toString()'],
              ['Error', 'Тип можно использовать в throw', 'extends Error'],
              ['Sendable', 'Безопасно передавать между потоками', '—'],
            ].map(([proto, desc, ts]) => (
              <tr key={proto}>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace', fontWeight: 600 }}>{proto}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>{desc}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>{ts}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Codable — автоматическая сериализация</h3>
        <p>
          <code>Codable</code> — одна из «killer features» Swift. Достаточно объявить конформанс,
          и компилятор автоматически генерирует код для JSON парсинга. В TypeScript для этого
          нужны библиотеки (zod, io-ts, class-validator).
        </p>
        <CodeBlock language="swift" code={`struct User: Codable {
    let id: Int
    let name: String
    let email: String
    let isActive: Bool
}

// Декодирование JSON
let json = """
{"id": 1, "name": "Анна", "email": "anna@mail.ru", "isActive": true}
""".data(using: .utf8)!

let user = try JSONDecoder().decode(User.self, from: json)
print(user.name)  // "Анна"

// Кодирование в JSON
let data = try JSONEncoder().encode(user)
let jsonString = String(data: data, encoding: .utf8)!

// Кастомные ключи
struct APIUser: Codable {
    let id: Int
    let userName: String

    enum CodingKeys: String, CodingKey {
        case id
        case userName = "user_name"  // snake_case -> camelCase
    }
}`} />
      </section>

      {/* ─── POP ─── */}
      <section className="card">
        <h2>🏛️ Protocol-Oriented Programming (POP)</h2>
        <p>
          Apple позиционирует Swift как «protocol-oriented language». Вместо глубоких иерархий
          наследования — набор маленьких протоколов с дефолтными реализациями. Это даёт:
        </p>
        <ul className="info-list">
          <li><strong>Горизонтальная композиция</strong> — тип конформит нужные протоколы, без «God class»</li>
          <li><strong>Тестируемость</strong> — легко подставить mock через протокол</li>
          <li><strong>Повторное использование</strong> — default implementations в extensions</li>
          <li><strong>Value types</strong> — struct + protocols вместо class + inheritance</li>
        </ul>

        <CodeBlock language="swift" code={`// Вместо одного толстого базового класса:
// class BaseViewController: UIViewController { ... }

// Маленькие протоколы с дефолтами:
protocol LoadingIndicatable {
    func showLoading()
    func hideLoading()
}

extension LoadingIndicatable where Self: UIViewController {
    func showLoading() {
        // добавить спиннер к view
    }
    func hideLoading() {
        // убрать спиннер
    }
}

protocol ErrorAlertable {
    func showError(_ message: String)
}

extension ErrorAlertable where Self: UIViewController {
    func showError(_ message: String) {
        let alert = UIAlertController(title: "Ошибка", message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
}

// Контроллер подключает только нужное:
class ProfileVC: UIViewController, LoadingIndicatable, ErrorAlertable {
    func loadProfile() {
        showLoading()
        // ...
        hideLoading()
    }
}`} />

        <div className="info-box">
          <strong>💡 Почему POP лучше наследования:</strong> При наследовании изменение базового класса
          аффектит все подклассы («fragile base class problem»). С протоколами каждый тип подключает
          только нужный функционал, и изменение одного протокола не ломает другие.
        </div>
      </section>
    </div>
  )
}
