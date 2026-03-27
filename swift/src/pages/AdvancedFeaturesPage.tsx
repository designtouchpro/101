import CodeBlock from '../components/CodeBlock'

export default function AdvancedFeaturesPage() {
  return (
    <div className="demo-container">
      <h1>🔬 Продвинутые возможности Swift</h1>
      <p>
        Строки, свойства, продвинутая система типов и протокольные паттерны —
        темы, которые отличают джуна от мидла на реальных проектах.
      </p>

      {/* ─── Strings ─── */}
      <section className="card">
        <h2>🔤 Строки: Unicode и работа с индексами</h2>
        <p>
          В Swift строки — это <strong>коллекции Character</strong>, а не массив байт.
          Каждый Character — один или несколько Unicode-скаляров (grapheme cluster).
          Из-за этого нельзя обращаться по Int-индексу.
        </p>
        <CodeBlock language="swift" code={`// String.Index — не Int!
let emoji = "👨‍👩‍👧‍👦🇷🇺"
print(emoji.count)        // 2 (grapheme clusters)
print(emoji.utf8.count)   // 29 bytes
print(emoji.utf16.count)  // 13 code units

// Навигация по индексам
let text = "Привет, Swift!"
let start = text.startIndex
let fifth = text.index(start, offsetBy: 4)
print(text[fifth])                        // т
print(text[start..<fifth])                // Прив

// Безопасный доступ
if let idx = text.index(start, offsetBy: 50, limitedBy: text.endIndex) {
    print(text[idx])
} else {
    print("Index out of bounds")          // ← безопасно
}

// Substring — view, не копия (copy-on-write)
let greeting = text.prefix(6)             // Substring
let copy = String(greeting)               // String (копия)

// Полезные методы
text.contains("Swift")                    // true
text.hasPrefix("При")                     // true
text.split(separator: ",")                // ["Привет", " Swift!"]
text.replacingOccurrences(of: "Swift", with: "World")

// Multi-line strings
let json = """
    {
        "name": "Swift",
        "version": 5.10
    }
    """                                   // без ведущих пробелов`} />
      </section>

      {/* ─── Properties ─── */}
      <section className="card">
        <h2>⚙️ Свойства: stored, computed, observers, wrappers</h2>
        <CodeBlock language="swift" code={`// 1. Stored properties
struct Point {
    var x: Double     // stored mutable
    let y: Double     // stored immutable
}

// 2. Computed properties (getter + setter)
struct Temperature {
    var celsius: Double

    var fahrenheit: Double {
        get { celsius * 9 / 5 + 32 }
        set { celsius = (newValue - 32) * 5 / 9 }
    }

    // Read-only computed (только get → можно без get {})
    var kelvin: Double { celsius + 273.15 }
}

// 3. Property observers (willSet / didSet)
class UserSettings {
    var theme: String = "light" {
        willSet { print("Theme will change to \\(newValue)") }
        didSet  { print("Theme changed from \\(oldValue) to \\(theme)") }
    }

    var fontSize: Int = 14 {
        didSet {
            // Коррекция в didSet — безопасно, не вызывает рекурсию
            if fontSize < 10 { fontSize = 10 }
            if fontSize > 72 { fontSize = 72 }
        }
    }
}

// 4. Lazy properties (инициализируются при первом доступе)
class DataManager {
    lazy var heavyData: [String] = {
        print("Loading data...")
        return loadFromDisk()           // вызывается ОДИН раз
    }()
}

// 5. Type properties (static)
struct API {
    static let baseURL = "https://api.example.com"
    static var requestCount = 0         // mutable static
}
print(API.baseURL)                      // доступ через тип`} />
      </section>

      <section className="card">
        <h2>🎁 Property Wrappers</h2>
        <p>
          Property wrapper — кастомная логика хранения/доступа, переиспользуемая через аннотацию.
          SwiftUI активно использует <code>@State</code>, <code>@Binding</code>, <code>@Published</code>.
        </p>
        <CodeBlock language="swift" code={`// Кастомный wrapper: Clamped (ограничение диапазона)
@propertyWrapper
struct Clamped<T: Comparable> {
    private var value: T
    let range: ClosedRange<T>

    var wrappedValue: T {
        get { value }
        set { value = min(max(newValue, range.lowerBound), range.upperBound) }
    }

    // projectedValue — доступ через $property
    var projectedValue: ClosedRange<T> { range }

    init(wrappedValue: T, _ range: ClosedRange<T>) {
        self.range = range
        self.value = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }
}

struct Player {
    @Clamped(0...100) var health: Int = 100
    @Clamped(0...999) var score: Int = 0
}

var player = Player()
player.health = 150                     // → 100 (clamped)
player.health = -10                     // → 0 (clamped)
print(player.$health)                   // 0...100 (projectedValue)

// UserDefaults wrapper
@propertyWrapper
struct UserDefault<T> {
    let key: String
    let defaultValue: T

    var wrappedValue: T {
        get { UserDefaults.standard.object(forKey: key) as? T ?? defaultValue }
        set { UserDefaults.standard.set(newValue, forKey: key) }
    }
}

struct Preferences {
    @UserDefault(key: "dark_mode", defaultValue: false)
    static var darkMode: Bool

    @UserDefault(key: "language", defaultValue: "ru")
    static var language: String
}`} />
      </section>

      {/* ─── Advanced Type System ─── */}
      <section className="card">
        <h2>🧬 Продвинутая система типов</h2>
        <CodeBlock language="swift" code={`// 1. Opaque types (some) — скрытый конкретный тип
func makeShape() -> some Shape {
    Circle(radius: 10)                  // компилятор знает тип, вызывающий — нет
}

// 2. Existential types (any) — стирание типа (Swift 5.7+)
func draw(shapes: [any Shape]) {
    for shape in shapes {
        shape.draw()                    // dynamic dispatch
    }
}

// some vs any
// some Shape → один конкретный тип, static dispatch, быстрее
// any Shape  → любой тип, dynamic dispatch, гибче

// 3. Result builders
@resultBuilder
struct HTMLBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: "\\n")
    }
    static func buildOptional(_ component: String?) -> String {
        component ?? ""
    }
    static func buildEither(first: String) -> String { first }
    static func buildEither(second: String) -> String { second }
}

func html(@HTMLBuilder content: () -> String) -> String {
    "<html>\\n\\(content())\\n</html>"
}

let page = html {
    "<head><title>Hello</title></head>"
    "<body>"
    "<h1>Swift Result Builders</h1>"
    "</body>"
}

// 4. Phantom types (типы-маркеры)
enum Validated {}
enum Unvalidated {}

struct Email<Status> {
    let value: String
}

func validate(_ email: Email<Unvalidated>) -> Email<Validated>? {
    email.value.contains("@")
        ? Email<Validated>(value: email.value)
        : nil
}

func send(to email: Email<Validated>) {  // принимает ТОЛЬКО валидный
    print("Sending to \\(email.value)")
}

let raw = Email<Unvalidated>(value: "user@mail.com")
// send(to: raw)                        // ❌ Compile error!
if let valid = validate(raw) {
    send(to: valid)                     // ✅ OK
}`} />
      </section>

      <section className="card">
        <h2>🔑 Key Paths и динамический доступ</h2>
        <CodeBlock language="swift" code={`// Key paths — типизированные ссылки на свойства
struct User {
    var name: String
    var age: Int
    var email: String
}

let nameKeyPath: KeyPath<User, String> = \\User.name
let ageKeyPath = \\User.age               // тип выводится

var user = User(name: "Anna", age: 28, email: "anna@mail.com")
print(user[keyPath: nameKeyPath])         // "Anna"

// WritableKeyPath — можно менять
let writableName: WritableKeyPath<User, String> = \\User.name
user[keyPath: writableName] = "Maria"

// Key paths как функции (Swift 5.2+)
let users = [
    User(name: "Anna", age: 28, email: "a@m.com"),
    User(name: "Boris", age: 35, email: "b@m.com"),
]
let names = users.map(\\.name)             // ["Anna", "Boris"]
let sorted = users.sorted(by: { $0[keyPath: \\.age] < $1[keyPath: \\.age] })

// Generic sorting с key path
func sorted<T, V: Comparable>(_ items: [T], by keyPath: KeyPath<T, V>) -> [T] {
    items.sorted { $0[keyPath: keyPath] < $1[keyPath: keyPath] }
}
let byAge = sorted(users, by: \\.age)

// @dynamicMemberLookup
@dynamicMemberLookup
struct JSONValue {
    private let data: [String: Any]

    subscript(dynamicMember key: String) -> JSONValue? {
        (data[key] as? [String: Any]).map(JSONValue.init)
    }

    subscript(dynamicMember key: String) -> String? {
        data[key] as? String
    }
}

let json = JSONValue(data: ["user": ["name": "Swift"]])
let name: String? = json.user?.name       // "Swift" — dot syntax!`} />
      </section>

      {/* ─── Protocol Advanced ─── */}
      <section className="card">
        <h2>📋 Продвинутые протоколы</h2>
        <CodeBlock language="swift" code={`// 1. Associated types + constraints
protocol Repository {
    associatedtype Model: Identifiable
    associatedtype Failure: Error

    func fetchAll() async throws(Failure) -> [Model]
    func save(_ model: Model) async throws(Failure)
}

struct UserRepo: Repository {
    typealias Model = User
    typealias Failure = APIError

    func fetchAll() async throws(APIError) -> [User] { /* ... */ [] }
    func save(_ model: User) async throws(APIError) { /* ... */ }
}

// 2. Protocol composition
typealias Persistable = Codable & Identifiable & Sendable

struct Product: Persistable {
    let id: UUID
    var name: String
    var price: Decimal
}

// В параметрах функции
func sync<T: Persistable>(_ item: T) { /* ... */ }

// 3. Conditional conformance
extension Array: Saveable where Element: Saveable {
    func save() {
        forEach { $0.save() }           // Array<Saveable> сама Saveable
    }
}

// 4. Protocol witness table (как это работает внутри)
// Каждый тип, конформящий протоколу, хранит vtable (witness table)
// any Shape → existential container = [value buffer (3 words) + vwt + pwt]
// some Shape → static dispatch, zero overhead

// 5. Self requirement (PAT — Protocol with Associated Type)
protocol Copyable {
    func copy() -> Self                 // Self = конкретный конформящий тип
}

class Document: Copyable {
    var title: String
    init(title: String) { self.title = title }
    func copy() -> Self {
        // Нужен required init для наследников
        let new = type(of: self).init(title: title + " (copy)")
        return new
    }
    required init(title: String) { self.title = title }
}`} />
      </section>

      <section className="card">
        <h2>🎤 Вопросы на собеседовании</h2>
        <ol>
          <li>Почему в Swift нельзя обращаться к символу строки по Int-индексу?</li>
          <li>Чем отличается <code>some Shape</code> от <code>any Shape</code>? Когда что использовать?</li>
          <li>Что такое property wrapper? Как работает <code>@State</code> в SwiftUI «под капотом»?</li>
          <li>Объясните разницу между <code>willSet</code> и <code>didSet</code>. Когда нужен каждый?</li>
          <li>Что такое phantom types? Приведите пример, где они полезны.</li>
          <li>Как работает conditional conformance? Пример из стандартной библиотеки.</li>
          <li>Что такое existential container и witness table?</li>
          <li>Для чего нужен <code>@resultBuilder</code>? Где он используется в SwiftUI?</li>
        </ol>
      </section>
    </div>
  )
}
