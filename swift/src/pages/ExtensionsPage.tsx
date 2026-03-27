import CodeBlock from '../components/CodeBlock'

export default function ExtensionsPage() {
  return (
    <div className="demo-container">
      <h1>🔌 Extensions</h1>
      <p>
        Extensions позволяют добавлять новый функционал к <strong>существующим типам</strong> —
        даже если у вас нет доступа к исходному коду. Это один из мощнейших инструментов Swift.
        Extensions могут добавлять вычисляемые свойства, методы, инициализаторы, subscripts,
        вложенные типы и конформанс к протоколам. В TypeScript/JS ближайший аналог — prototype extension
        (но менее безопасный).
      </p>

      {/* ─── Базовые Extensions ─── */}
      <section className="card">
        <h2>📝 Добавление методов и свойств</h2>
        <p>
          Extensions не могут добавлять stored properties — только computed. Зато методы,
          инициализаторы и subscripts — без ограничений.
        </p>
        <CodeBlock language="swift" code={`// Добавляем методы к Int
extension Int {
    var isEven: Bool { self % 2 == 0 }
    var isPositive: Bool { self > 0 }

    func times(_ action: () -> Void) {
        for _ in 0..<self {
            action()
        }
    }

    func clamped(to range: ClosedRange<Int>) -> Int {
        min(max(self, range.lowerBound), range.upperBound)
    }
}

42.isEven         // true
(-5).isPositive   // false
150.clamped(to: 0...100)  // 100

3.times { print("Hello!") }
// Hello! Hello! Hello!`} />

        <CodeBlock language="swift" code={`// Добавляем к String
extension String {
    var trimmed: String {
        trimmingCharacters(in: .whitespacesAndNewlines)
    }

    var isBlank: Bool {
        trimmed.isEmpty
    }

    func truncated(to length: Int, trailing: String = "...") -> String {
        count > length ? prefix(length) + trailing : self
    }

    var isValidEmail: Bool {
        let pattern = #"^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$"#
        return range(of: pattern, options: .regularExpression) != nil
    }
}

"  hello  ".trimmed                 // "hello"
"Длинный текст".truncated(to: 8)   // "Длинный ..."
"test@mail.ru".isValidEmail         // true`} />

        <div className="info-box">
          <strong>💡 Сравнение с JS:</strong> В JavaScript можно расширять прототип (<code>String.prototype.trimmed = ...</code>),
          но это считается anti-pattern из-за конфликтов имён. В Swift extensions типобезопасны —
          компилятор проверяет уникальность и корректность.
        </div>
      </section>

      {/* ─── Protocol Conformance ─── */}
      <section className="card">
        <h2>📋 Добавление конформанса к протоколам</h2>
        <p>
          Одна из главных задач extensions — добавить конформанс к протоколу для типа,
          который уже существует. Это позволяет «обучить» чужие типы вашим протоколам.
        </p>
        <CodeBlock language="swift" code={`// Допустим, есть протокол
protocol JSONConvertible {
    func toJSON() -> String
}

// Добавляем конформанс к существующему типу
extension Date: JSONConvertible {
    func toJSON() -> String {
        let formatter = ISO8601DateFormatter()
        return "\\"\\(formatter.string(from: self))\\""
    }
}

extension Array: JSONConvertible where Element: JSONConvertible {
    func toJSON() -> String {
        let items = map { $0.toJSON() }
        return "[\\(items.joined(separator: ", "))]"
    }
}

// Организация кода: разделение по протоколам
struct User {
    let id: Int
    let name: String
    let email: String
}

extension User: Equatable {
    // Компилятор синтезирует автоматически
}

extension User: CustomStringConvertible {
    var description: String {
        "User(\\(id): \\(name))"
    }
}

extension User: Codable {
    // Автосинтез для stored properties
}`} />
      </section>

      {/* ─── Initializers ─── */}
      <section className="card">
        <h2>🏗️ Добавление инициализаторов</h2>
        <p>
          Extensions могут добавлять convenience-инициализаторы. Для struct это особенно полезно —
          можно добавить новые <code>init</code> без потери автоматического memberwise init.
        </p>
        <CodeBlock language="swift" code={`struct Color {
    let red: Double
    let green: Double
    let blue: Double
    let alpha: Double
}

// Memberwise init по-прежнему работает:
let red = Color(red: 1, green: 0, blue: 0, alpha: 1)

// Дополнительные init через extension:
extension Color {
    init(hex: String) {
        // парсинг hex строки...
        let r = 0.0, g = 0.0, b = 0.0
        self.init(red: r, green: g, blue: b, alpha: 1.0)
    }

    init(white: Double, alpha: Double = 1.0) {
        self.init(red: white, green: white, blue: white, alpha: alpha)
    }

    static var random: Color {
        Color(
            red: .random(in: 0...1),
            green: .random(in: 0...1),
            blue: .random(in: 0...1),
            alpha: 1
        )
    }
}

let gray = Color(white: 0.5)
let fromHex = Color(hex: "#FF5733")
let surprise = Color.random`} />
      </section>

      {/* ─── Conditional Conformance ─── */}
      <section className="card">
        <h2>🔀 Conditional Conformance</h2>
        <p>
          Swift позволяет добавить конформанс к протоколу <strong>только когда</strong> generic-параметр
          удовлетворяет определённым условиям. Это мощный инструмент для generic кода.
        </p>
        <CodeBlock language="swift" code={`// Array<Element> конформит Equatable,
// ТОЛЬКО если Element конформит Equatable
extension Array: Equatable where Element: Equatable {
    // == автоматически синтезируется
}

[1, 2, 3] == [1, 2, 3]  // true ✅

// Optional конформит Codable, если Wrapped конформит Codable
// Dictionary конформит Hashable, если Key и Value конформят Hashable

// Ваш пример:
struct Wrapper<T> {
    let value: T
}

extension Wrapper: CustomStringConvertible where T: CustomStringConvertible {
    var description: String {
        "Wrapper(\\(value.description))"
    }
}

extension Wrapper: Equatable where T: Equatable {
    static func == (lhs: Wrapper, rhs: Wrapper) -> Bool {
        lhs.value == rhs.value
    }
}

let a = Wrapper(value: 42)
let b = Wrapper(value: 42)
a == b  // true — работает, потому что Int: Equatable`} />
      </section>

      {/* ─── Паттерны организации кода ─── */}
      <section className="card">
        <h2>📂 Extensions для организации кода</h2>
        <p>
          В iOS-разработке extensions активно используются для организации кода в одном файле.
          Каждый extension-блок группирует связанный функционал.
        </p>
        <CodeBlock language="swift" code={`class ProfileViewController: UIViewController {
    // MARK: - Properties
    private let viewModel: ProfileViewModel
    private let tableView = UITableView()

    init(viewModel: ProfileViewModel) {
        self.viewModel = viewModel
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) { fatalError() }
}

// MARK: - Lifecycle
extension ProfileViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        bindViewModel()
    }
}

// MARK: - UITableViewDataSource
extension ProfileViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        viewModel.items.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        // ...
    }
}

// MARK: - UITableViewDelegate
extension ProfileViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        // ...
    }
}

// MARK: - Private Methods
private extension ProfileViewController {
    func setupUI() { /* ... */ }
    func bindViewModel() { /* ... */ }
}`} />
        <div className="info-box">
          <strong>📌 Конвенция:</strong> В iOS-проектах принято:
          <ul className="info-list">
            <li>Основной тип содержит только stored properties и init</li>
            <li>Каждый протокол-конформанс — в отдельном extension</li>
            <li>Private хелперы — в <code>private extension</code></li>
            <li><code>// MARK: -</code> для навигации в Xcode</li>
          </ul>
        </div>
      </section>

      {/* ─── Ограничения ─── */}
      <section className="card">
        <h2>⚠️ Ограничения Extensions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, margin: '20px 0' }}>
          <div style={{ padding: 16, background: '#f4433622', border: '2px solid #f44336', borderRadius: 12 }}>
            <h3 style={{ color: '#f44336', margin: '0 0 8px' }}>❌ Нельзя</h3>
            <ul className="info-list">
              <li>Stored properties</li>
              <li>Designated initializers (для class)</li>
              <li>Переопределить существующие методы</li>
              <li>Property observers (willSet/didSet)</li>
            </ul>
          </div>
          <div style={{ padding: 16, background: '#4CAF5022', border: '2px solid #4CAF50', borderRadius: 12 }}>
            <h3 style={{ color: '#4CAF50', margin: '0 0 8px' }}>✅ Можно</h3>
            <ul className="info-list">
              <li>Computed properties</li>
              <li>Методы (instance + static)</li>
              <li>Convenience init, subscripts</li>
              <li>Nested types</li>
              <li>Protocol conformance</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
