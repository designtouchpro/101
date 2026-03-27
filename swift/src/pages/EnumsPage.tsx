import CodeBlock from '../components/CodeBlock'

export default function EnumsPage() {
  return (
    <div className="demo-container">
      <h1>🏷️ Enums — перечисления в Swift</h1>
      <p>
        Enums в Swift — одна из самых мощных фич языка. Если в TypeScript <code>enum</code> — это просто
        набор числовых или строковых констант, то в Swift enum — полноценный тип данных с методами,
        associated values, pattern matching и даже рекурсией. Ближайший аналог в TS — discriminated unions.
      </p>

      {/* ─── Визуальная схема: Enum с Associated Values ─── */}
      <section className="card">
        <h2>🗺️ Визуальная модель: Enum с Associated Values</h2>
        <p>
          Каждый case enum может нести дополнительные данные (associated values).
          Представьте это как дерево вариантов:
        </p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          margin: '20px 0',
          fontSize: '0.85rem',
        }}>
          <div style={{
            padding: '12px 32px',
            background: 'linear-gradient(135deg, #FF6B35, #FF9800)',
            borderRadius: '12px',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1rem',
          }}>
            enum NetworkResult
          </div>
          <div style={{ fontSize: '1.4rem' }}>⬇️</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            width: '100%',
          }}>
            {[
              { label: '.success', color: '#4CAF50', sub: '(Data, Int)', desc: 'тело ответа + код' },
              { label: '.failure', color: '#f44336', sub: '(Error)', desc: 'объект ошибки' },
              { label: '.loading', color: '#2196F3', sub: '(Double)', desc: 'прогресс 0...1' },
              { label: '.idle', color: '#9E9E9E', sub: '—', desc: 'нет данных' },
            ].map(c => (
              <div key={c.label} style={{
                padding: '14px 10px',
                background: 'var(--bg-tertiary)',
                borderRadius: '10px',
                border: `2px solid ${c.color}`,
                textAlign: 'center',
              }}>
                <div style={{ color: c.color, fontWeight: 700, marginBottom: 4 }}>{c.label}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontFamily: 'monospace' }}>{c.sub}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: 6 }}>{c.desc}</div>
              </div>
            ))}
          </div>
          <div className="info-box" style={{ marginTop: 12 }}>
            <strong>💡 Ключевая идея:</strong> В TypeScript для этого пришлось бы делать discriminated union
            с отдельными интерфейсами. В Swift — один <code>enum</code> с associated values.
          </div>
        </div>
      </section>

      {/* ─── 1. Базовые Enums ─── */}
      <section className="card">
        <h2>📝 1. Базовые Enums</h2>
        <p>
          Простейший enum объявляет набор именованных значений. В отличие от JS/TS, enum в Swift —
          это не число и не строка, а самостоятельный тип.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Простой enum
enum Direction {
    case north
    case south
    case east
    case west
}

// Или в одну строку:
enum Planet {
    case mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
}

// Использование
var heading = Direction.north
heading = .south    // тип уже известен — можно опустить имя enum

// switch + enum = exhaustive matching
switch heading {
case .north:
    print("⬆️ Север")
case .south:
    print("⬇️ Юг")
case .east:
    print("➡️ Восток")
case .west:
    print("⬅️ Запад")
}
// Не нужен default — все случаи покрыты!
// Если добавить новый case — компилятор покажет ошибку
`} />
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift Enum</h3>
            <CodeBlock language="swift" code={`
enum Status {
    case active
    case inactive
    case banned
}

let user: Status = .active
// user = 0 ❌ Нельзя! Enum ≠ число
`} />
          </div>
          <div className="feature-card">
            <h3>TypeScript Enum</h3>
            <CodeBlock language="typescript" code={`
enum Status {
    Active,    // 0
    Inactive,  // 1
    Banned     // 2
}

let user: Status = Status.Active
user = 0  // ✅ OK... (плохо!)
// Числовые enum в TS — source of bugs
`} />
          </div>
        </div>
      </section>

      {/* ─── 2. Raw Values ─── */}
      <section className="card">
        <h2>🏷️ 2. Raw Values — сырые значения</h2>
        <p>
          Каждому case можно привязать «сырое значение» определённого типа: <code>String</code>,
          <code>Int</code>, <code>Double</code>. Это аналог <code>{"enum Status { Active = 'active' }"}</code> в TypeScript.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// String raw values
enum HTTPMethod: String {
    case get = "GET"
    case post = "POST"
    case put = "PUT"
    case delete = "DELETE"
}

let method = HTTPMethod.get
print(method.rawValue)   // "GET"

// Инициализация из raw value (возвращает Optional!)
let parsed = HTTPMethod(rawValue: "POST")   // HTTPMethod? = .post
let invalid = HTTPMethod(rawValue: "PATCH") // nil

// Int raw values (auto-increment)
enum StatusCode: Int {
    case ok = 200
    case created = 201
    case badRequest = 400
    case notFound = 404
    case serverError = 500
}

print(StatusCode.ok.rawValue)        // 200
let code = StatusCode(rawValue: 404) // .notFound

// String raw values с автогенерацией
enum Fruit: String {
    case apple        // rawValue = "apple"
    case banana       // rawValue = "banana"
    case strawberry   // rawValue = "strawberry"
}
print(Fruit.apple.rawValue) // "apple"
`} />
        </div>

        <div className="info-box">
          <strong>⚠️ Важно:</strong> Raw values должны быть уникальными и известны на этапе компиляции.
          Тип raw value одинаков для всех case. Если нужны разные типы данных — используйте associated values.
        </div>
      </section>

      {/* ─── 3. Associated Values ─── */}
      <section className="card">
        <h2>📦 3. Associated Values — присоединённые значения</h2>
        <p>
          Главная суперсила Swift enums! Каждый case может хранить данные разного типа.
          В TypeScript для этого нужны discriminated unions — отдельные типы с общим полем-дискриминатором.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Каждый case хранит свои данные
enum NetworkResponse {
    case success(data: Data, statusCode: Int)
    case failure(error: Error)
    case loading(progress: Double)
    case idle
}

// Создание
let result = NetworkResponse.success(data: someData, statusCode: 200)
let error = NetworkResponse.failure(error: NetworkError.timeout)
let progress = NetworkResponse.loading(progress: 0.75)

// Извлечение через switch
switch result {
case .success(let data, let statusCode):
    print("✅ Данные: \\(data.count) байт, код: \\(statusCode)")
case .failure(let error):
    print("❌ Ошибка: \\(error.localizedDescription)")
case .loading(let progress):
    print("⏳ Загрузка: \\(Int(progress * 100))%")
case .idle:
    print("💤 Ожидание")
}

// Сокращённый синтаксис — let перед паттерном
switch result {
case let .success(data, code):
    print("\\(data) \\(code)")
case let .failure(error):
    print("\\(error)")
default:
    break
}
`} />
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift: Associated Values</h3>
            <CodeBlock language="swift" code={`
enum PaymentMethod {
    case cash
    case card(number: String, cvv: String)
    case crypto(wallet: String, chain: String)
    case applePay(deviceId: String)
}

func process(_ method: PaymentMethod) {
    switch method {
    case .cash:
        print("Оплата наличными")
    case .card(let num, _):
        print("Карта: ...\\(num.suffix(4))")
    case .crypto(let wallet, let chain):
        print("\\(chain): \\(wallet)")
    case .applePay:
        print("Apple Pay")
    }
}
`} />
          </div>
          <div className="feature-card">
            <h3>TypeScript: Discriminated Union</h3>
            <CodeBlock language="typescript" code={`
type PaymentMethod =
  | { type: 'cash' }
  | { type: 'card'; number: string; cvv: string }
  | { type: 'crypto'; wallet: string; chain: string }
  | { type: 'applePay'; deviceId: string }

function process(method: PaymentMethod) {
  switch (method.type) {
    case 'cash':
      console.log('Оплата наличными')
      break
    case 'card':
      console.log(\`Карта: ...\${method.number.slice(-4)}\`)
      break
    // ... больше шаблонного кода
  }
}
// Нет exhaustive checking без хелпера
`} />
          </div>
        </div>
      </section>

      {/* ─── 4. CaseIterable ─── */}
      <section className="card">
        <h2>🔄 4. CaseIterable — итерация по всем case</h2>
        <p>
          Протокол <code>CaseIterable</code> автоматически генерирует массив <code>allCases</code>,
          содержащий все case enum. Удобно для UI-элементов: picker, segment control, список настроек.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
enum Season: String, CaseIterable {
    case spring = "Весна 🌸"
    case summer = "Лето ☀️"
    case autumn = "Осень 🍂"
    case winter = "Зима ❄️"
}

// Автоматически доступен массив allCases
for season in Season.allCases {
    print(season.rawValue)
}
// Весна 🌸
// Лето ☀️
// Осень 🍂
// Зима ❄️

print(Season.allCases.count) // 4

// Удобно для создания меню
let menuItems = Season.allCases.map { season in
    MenuItem(title: season.rawValue, value: season)
}

// ⚠️ CaseIterable НЕ работает с associated values
// enum Foo: CaseIterable {
//     case bar(Int)   // ❌ Ошибка компиляции
// }
// Потому что бесконечное количество вариантов bar(0), bar(1), ...
`} />
        </div>

        <div className="info-box">
          <strong>🔍 В TypeScript:</strong> Нет встроенного аналога. Для итерации по enum нужно
          использовать <code>Object.values(MyEnum)</code>, и результат будет содержать как ключи,
          так и значения для числовых enum — неудобно и склонно к ошибкам.
        </div>
      </section>

      {/* ─── 5. Pattern Matching с switch ─── */}
      <section className="card">
        <h2>🎯 5. Pattern Matching с switch</h2>
        <p>
          Switch в Swift — мощнейший инструмент для работы с enum. Он поддерживает деструктуризацию,
          where-клаузы, множественные паттерны и binding.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
enum Temperature {
    case celsius(Double)
    case fahrenheit(Double)
    case kelvin(Double)
}

let temp = Temperature.celsius(36.6)

// where-клауза для дополнительных условий
switch temp {
case .celsius(let c) where c > 37.5:
    print("🔥 Высокая температура: \\(c)°C")
case .celsius(let c) where c < 36.0:
    print("🥶 Низкая температура: \\(c)°C")
case .celsius(let c):
    print("✅ Нормальная: \\(c)°C")
case .fahrenheit(let f) where f > 99.5:
    print("🔥 High fever: \\(f)°F")
case .fahrenheit(let f):
    print("🌡️ \\(f)°F")
case .kelvin(let k):
    print("🔬 \\(k)K")
}

// Множественные паттерны в одном case
enum Emotion {
    case happy, excited, content
    case sad, angry, anxious
    case neutral
}

let mood: Emotion = .excited

switch mood {
case .happy, .excited, .content:
    print("😊 Хорошее настроение!")
case .sad, .angry, .anxious:
    print("😔 Плохое настроение")
case .neutral:
    print("😐 Нормально")
}
`} />
        </div>

        <h3>if case let — извлечение одного case</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
enum APIResult {
    case success(String)
    case failure(Int, String)
}

let result = APIResult.success("Hello!")

// Вместо полного switch — проверка одного case
if case .success(let message) = result {
    print("Сообщение: \\(message)")
}

// guard case let — для раннего выхода
func handle(_ result: APIResult) {
    guard case .success(let message) = result else {
        print("Не успех")
        return
    }
    print("Обработка: \\(message)")
}

// for case let — фильтрация в циклах
let results: [APIResult] = [
    .success("A"), .failure(404, "Not found"),
    .success("B"), .failure(500, "Server error")
]

for case .success(let msg) in results {
    print("✅ \\(msg)")  // A, B — только успешные
}
`} />
        </div>

        {/* Визуальная схема: Pattern Matching Flow */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          margin: '20px 0',
          padding: '20px',
          background: 'var(--bg-tertiary)',
          borderRadius: '12px',
          fontSize: '0.85rem',
        }}>
          <div style={{ fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>
            Поток Pattern Matching
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ padding: '8px 16px', background: '#FF9800', borderRadius: '8px', color: '#fff', fontWeight: 600 }}>
              switch value
            </div>
            <span style={{ fontSize: '1.2rem' }}>→</span>
            <div style={{ padding: '8px 16px', background: '#2196F3', borderRadius: '8px', color: '#fff' }}>
              case .pattern
            </div>
            <span style={{ fontSize: '1.2rem' }}>→</span>
            <div style={{ padding: '8px 16px', background: '#9C27B0', borderRadius: '8px', color: '#fff' }}>
              where условие
            </div>
            <span style={{ fontSize: '1.2rem' }}>→</span>
            <div style={{ padding: '8px 16px', background: '#4CAF50', borderRadius: '8px', color: '#fff' }}>
              let binding
            </div>
            <span style={{ fontSize: '1.2rem' }}>→</span>
            <div style={{ padding: '8px 16px', background: '#f44336', borderRadius: '8px', color: '#fff' }}>
              выполнение
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Recursive Enums ─── */}
      <section className="card">
        <h2>🔁 6. Рекурсивные Enums (indirect)</h2>
        <p>
          Когда enum ссылается сам на себя, нужно ключевое слово <code>indirect</code>.
          Классический инструмент для построения деревьев и арифметических выражений.
        </p>

        {/* Визуальная диаграмма: дерево выражений */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          margin: '16px 0',
          padding: '20px',
          background: 'var(--bg-tertiary)',
          borderRadius: '12px',
          fontSize: '0.85rem',
        }}>
          <div style={{ fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)' }}>
            Дерево выражения: (2 + 3) * 4
          </div>
          <div style={{
            padding: '8px 20px',
            background: '#FF9800',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: 700,
          }}>
            .multiply
          </div>
          <div style={{ fontSize: '1.2rem' }}>⬇️</div>
          <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                padding: '8px 16px',
                background: '#2196F3',
                borderRadius: '8px',
                color: '#fff',
                fontWeight: 700,
              }}>
                .add
              </div>
              <div style={{ fontSize: '1rem' }}>⬇️</div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{
                  padding: '6px 14px',
                  background: '#4CAF50',
                  borderRadius: '8px',
                  color: '#fff',
                }}>
                  .number(2)
                </div>
                <div style={{
                  padding: '6px 14px',
                  background: '#4CAF50',
                  borderRadius: '8px',
                  color: '#fff',
                }}>
                  .number(3)
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                padding: '6px 14px',
                background: '#4CAF50',
                borderRadius: '8px',
                color: '#fff',
              }}>
                .number(4)
              </div>
            </div>
          </div>
        </div>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// indirect позволяет enum ссылаться на себя
indirect enum ArithExpr {
    case number(Double)
    case add(ArithExpr, ArithExpr)
    case multiply(ArithExpr, ArithExpr)
    case negate(ArithExpr)
}

// Построение выражения: (2 + 3) * 4
let expr = ArithExpr.multiply(
    .add(.number(2), .number(3)),
    .number(4)
)

// Рекурсивное вычисление
func evaluate(_ expr: ArithExpr) -> Double {
    switch expr {
    case .number(let n):
        return n
    case .add(let left, let right):
        return evaluate(left) + evaluate(right)
    case .multiply(let left, let right):
        return evaluate(left) * evaluate(right)
    case .negate(let inner):
        return -evaluate(inner)
    }
}

print(evaluate(expr))  // 20.0 = (2 + 3) * 4

// Можно пометить indirect весь enum или отдельные case:
enum LinkedList<T> {
    case empty
    indirect case node(T, next: LinkedList<T>)
}

let list = LinkedList.node(1, next: .node(2, next: .node(3, next: .empty)))
`} />
        </div>

        <div className="info-box">
          <strong>🔍 Зачем indirect?</strong> Enum — value type, хранится на стеке. Рекурсивный enum
          имел бы бесконечный размер. <code>indirect</code> заставляет Swift хранить case в куче (heap)
          через указатель, делая размер фиксированным.
        </div>
      </section>

      {/* ─── 7. Enum с методами и computed properties ─── */}
      <section className="card">
        <h2>⚙️ 7. Enum с методами и computed properties</h2>
        <p>
          Enum в Swift — полноценный тип. Можно добавлять методы, computed properties,
          static методы и подписки. Это невозможно в TS enum.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
enum Suit: String, CaseIterable {
    case hearts = "♥️"
    case diamonds = "♦️"
    case clubs = "♣️"
    case spades = "♠️"

    // Computed property
    var color: String {
        switch self {
        case .hearts, .diamonds: return "red"
        case .clubs, .spades: return "black"
        }
    }

    var localizedName: String {
        switch self {
        case .hearts:   return "Черви"
        case .diamonds: return "Бубны"
        case .clubs:    return "Трефы"
        case .spades:   return "Пики"
        }
    }

    // Метод
    func beats(_ other: Suit) -> Bool {
        if self == .spades && other != .spades { return true }
        return false
    }

    // Static метод
    static func random() -> Suit {
        allCases.randomElement()!
    }

    // Static property
    static var redSuits: [Suit] {
        allCases.filter { $0.color == "red" }
    }
}

let suit = Suit.hearts
print(suit.rawValue)        // ♥️
print(suit.color)           // red
print(suit.localizedName)   // Черви
print(Suit.random())        // случайная масть
print(Suit.redSuits)        // [.hearts, .diamonds]
`} />
        </div>

        <h3>Enum с mutating методами</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
enum TrafficLight {
    case red, yellow, green

    // mutating — может менять self
    mutating func next() {
        switch self {
        case .red:    self = .green
        case .green:  self = .yellow
        case .yellow: self = .red
        }
    }

    var emoji: String {
        switch self {
        case .red:    return "🔴"
        case .yellow: return "🟡"
        case .green:  return "🟢"
        }
    }
}

var light = TrafficLight.red
print(light.emoji)   // 🔴
light.next()
print(light.emoji)   // 🟢
light.next()
print(light.emoji)   // 🟡
`} />
        </div>
      </section>

      {/* ─── 8. Comparable Enums ─── */}
      <section className="card">
        <h2>📊 8. Comparable Enums</h2>
        <p>
          Enum без associated values может автоматически соответствовать протоколу <code>Comparable</code>.
          Порядок определяется порядком объявления case.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Comparable — порядок определяется объявлением (сверху вниз)
enum Priority: Comparable {
    case low
    case medium
    case high
    case critical
}

let p1 = Priority.low
let p2 = Priority.critical

print(p1 < p2)  // true (low < critical)
print(p2 > p1)  // true

// Сортировка массива enum
let tasks: [Priority] = [.high, .low, .critical, .medium, .low]
let sorted = tasks.sorted()
// [.low, .low, .medium, .high, .critical]

// Фильтрация
let urgent = tasks.filter { $0 >= .high }
// [.high, .critical]

// Comparable + CaseIterable
enum Size: Comparable, CaseIterable {
    case xs, s, m, l, xl, xxl
}

let mySize = Size.m
let available: [Size] = [.s, .m, .l, .xl]
let fitsMe = available.filter { $0 >= mySize }
// [.m, .l, .xl]
`} />
        </div>

        <div className="info-box">
          <strong>🔍 В TypeScript:</strong> Числовые enum уже «comparable» через числа
          (<code>Status.Active &lt; Status.Banned</code>), но это работает случайно и ненадёжно.
          В Swift <code>Comparable</code> — осознанный контракт.
        </div>
      </section>

      {/* ─── 9. Codable Enums ─── */}
      <section className="card">
        <h2>📡 9. Codable Enums — сериализация</h2>
        <p>
          Enum с raw values автоматически соответствует <code>Codable</code> (JSON encoding/decoding).
          Для enum с associated values можно использовать ручную реализацию или Swift 5.5+ автосинтез.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
import Foundation

// Простой Codable enum с raw values
enum Role: String, Codable {
    case admin
    case moderator
    case user
    case guest
}

struct User: Codable {
    let name: String
    let role: Role
}

// Кодирование в JSON
let user = User(name: "Анна", role: .admin)
let data = try JSONEncoder().encode(user)
let json = String(data: data, encoding: .utf8)!
print(json)  // {"name":"Анна","role":"admin"}

// Декодирование из JSON
let jsonStr = #"{"name":"Борис","role":"moderator"}"#
let decoded = try JSONDecoder().decode(
    User.self, from: jsonStr.data(using: .utf8)!
)
print(decoded.role)  // .moderator
`} />
        </div>

        <h3>Codable с associated values (ручная реализация)</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
enum Shape: Codable {
    case circle(radius: Double)
    case rectangle(width: Double, height: Double)
    case triangle(base: Double, height: Double)

    enum CodingKeys: String, CodingKey {
        case type, radius, width, height, base
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        switch self {
        case .circle(let radius):
            try container.encode("circle", forKey: .type)
            try container.encode(radius, forKey: .radius)
        case .rectangle(let width, let height):
            try container.encode("rectangle", forKey: .type)
            try container.encode(width, forKey: .width)
            try container.encode(height, forKey: .height)
        case .triangle(let base, let height):
            try container.encode("triangle", forKey: .type)
            try container.encode(base, forKey: .base)
            try container.encode(height, forKey: .height)
        }
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let type = try container.decode(String.self, forKey: .type)
        switch type {
        case "circle":
            let r = try container.decode(Double.self, forKey: .radius)
            self = .circle(radius: r)
        case "rectangle":
            let w = try container.decode(Double.self, forKey: .width)
            let h = try container.decode(Double.self, forKey: .height)
            self = .rectangle(width: w, height: h)
        default:
            let b = try container.decode(Double.self, forKey: .base)
            let h = try container.decode(Double.self, forKey: .height)
            self = .triangle(base: b, height: h)
        }
    }
}

let shapes: [Shape] = [.circle(radius: 5), .rectangle(width: 3, height: 4)]
let encoded = try JSONEncoder().encode(shapes)
// [{"type":"circle","radius":5},{"type":"rectangle","width":3,"height":4}]
`} />
        </div>
      </section>

      {/* ─── 10. Enum в реальных проектах ─── */}
      <section className="card">
        <h2>🏗️ 10. Enum в реальных проектах</h2>
        <p>
          Enums часто используются для моделирования состояний, маршрутизации, ошибок и конфигурации.
        </p>

        <h3>Состояние загрузки (аналог React Query)</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Универсальный тип для загрузки данных
enum LoadingState<T> {
    case idle
    case loading
    case success(T)
    case failure(Error)

    var isLoading: Bool {
        if case .loading = self { return true }
        return false
    }

    var data: T? {
        if case .success(let value) = self { return value }
        return nil
    }

    var error: Error? {
        if case .failure(let err) = self { return err }
        return nil
    }

    func map<U>(_ transform: (T) -> U) -> LoadingState<U> {
        switch self {
        case .idle: return .idle
        case .loading: return .loading
        case .success(let data): return .success(transform(data))
        case .failure(let error): return .failure(error)
        }
    }
}

// Использование
var usersState: LoadingState<[User]> = .idle
usersState = .loading
// ... после запроса:
usersState = .success([User(name: "Анна"), User(name: "Борис")])

if let users = usersState.data {
    print("Загружено \\(users.count) пользователей")
}
`} />
        </div>

        <h3>Маршрутизация (аналог React Router)</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
enum Route: Hashable {
    case home
    case profile(userId: Int)
    case settings
    case post(id: Int, commentId: Int?)

    var title: String {
        switch self {
        case .home: return "Главная"
        case .profile: return "Профиль"
        case .settings: return "Настройки"
        case .post: return "Пост"
        }
    }

    var path: String {
        switch self {
        case .home:
            return "/"
        case .profile(let id):
            return "/users/\\(id)"
        case .settings:
            return "/settings"
        case .post(let id, let commentId):
            if let cid = commentId {
                return "/posts/\\(id)/comments/\\(cid)"
            }
            return "/posts/\\(id)"
        }
    }
}
`} />
        </div>
      </section>

      {/* ─── 11. Полное сравнение с TS ─── */}
      <section className="card">
        <h2>⚖️ 11. Полное сравнение с TypeScript</h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          margin: '16px 0',
          fontSize: '0.85rem',
        }}>
          {[
            { feature: 'Базовые case', swift: '✅ Полноценный тип', ts: '⚠️ Числа под капотом' },
            { feature: 'String raw values', swift: '✅ Встроено', ts: '✅ String enum' },
            { feature: 'Associated values', swift: '✅ Нативно', ts: '⚠️ Discriminated unions' },
            { feature: 'Pattern matching', swift: '✅ Мощный switch', ts: '⚠️ Type narrowing' },
            { feature: 'Методы на enum', swift: '✅ Есть', ts: '❌ Нет' },
            { feature: 'Computed properties', swift: '✅ Есть', ts: '❌ Нет' },
            { feature: 'CaseIterable', swift: '✅ Протокол', ts: '⚠️ Object.values' },
            { feature: 'Recursive enum', swift: '✅ indirect', ts: '⚠️ Recursive types' },
            { feature: 'Codable (JSON)', swift: '✅ Автоматически', ts: '❌ Нет (нужны либы)' },
            { feature: 'Comparable', swift: '✅ Протокол', ts: '⚠️ Через числа' },
            { feature: 'Exhaustive switch', swift: '✅ Компилятор', ts: '⚠️ never + хелпер' },
          ].map(row => (
            <div key={row.feature} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '8px',
              padding: '8px 12px',
              background: 'var(--bg-tertiary)',
              borderRadius: '8px',
            }}>
              <strong>{row.feature}</strong>
              <span style={{ color: '#4CAF50' }}>{row.swift}</span>
              <span style={{ color: 'var(--text-secondary)' }}>{row.ts}</span>
            </div>
          ))}
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift: всё в одном месте</h3>
            <CodeBlock language="swift" code={`
enum Result<T> {
    case success(T)
    case failure(Error)

    var isSuccess: Bool {
        if case .success = self { return true }
        return false
    }

    func map<U>(_ f: (T) -> U) -> Result<U> {
        switch self {
        case .success(let v): return .success(f(v))
        case .failure(let e): return .failure(e)
        }
    }
}
`} />
          </div>
          <div className="feature-card">
            <h3>TypeScript: много конструкций</h3>
            <CodeBlock language="typescript" code={`
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: Error }

function isSuccess<T>(
  r: Result<T>
): r is { ok: true; value: T } {
  return r.ok
}

function mapResult<T, U>(
  r: Result<T>, f: (v: T) => U
): Result<U> {
  return r.ok
    ? { ok: true, value: f(r.value) }
    : r
}
`} />
          </div>
        </div>
      </section>

      {/* ─── 12. Продвинутые паттерны ─── */}
      <section className="card">
        <h2>🧪 12. Продвинутые паттерны с Enum</h2>

        <h3>Enum без case — namespace / phantom type</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Enum без case — нельзя создать экземпляр
// Используется как namespace
enum API {
    static let baseURL = "https://api.example.com"
    static let version = "v2"

    static func url(for path: String) -> URL {
        URL(string: "\\(baseURL)/\\(version)/\\(path)")!
    }

    enum Endpoints {
        static let users = "users"
        static let posts = "posts"
    }
}

// let api = API() ❌ — нельзя
let url = API.url(for: API.Endpoints.users)

// Типобезопасные единицы измерения (Phantom Types)
enum Meters {}
enum Kilometers {}

struct Distance<Unit> {
    let value: Double
}

let marathon = Distance<Kilometers>(value: 42.195)
let sprint = Distance<Meters>(value: 100)
// marathon + sprint ❌ — разные типы!
`} />
        </div>

        <h3>Enum для конечного автомата (State Machine)</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
enum OrderState {
    case created
    case paid(amount: Decimal, date: Date)
    case shipped(trackingNumber: String)
    case delivered(date: Date)
    case cancelled(reason: String)

    func canTransition(to newState: OrderState) -> Bool {
        switch (self, newState) {
        case (.created, .paid):      return true
        case (.created, .cancelled): return true
        case (.paid, .shipped):      return true
        case (.paid, .cancelled):    return true
        case (.shipped, .delivered): return true
        default:                     return false
        }
    }
}
`} />
        </div>

        {/* Визуальная диаграмма: State Machine */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          margin: '16px 0',
          padding: '20px',
          background: 'var(--bg-tertiary)',
          borderRadius: '12px',
          fontSize: '0.85rem',
        }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
            Граф переходов состояний заказа
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ padding: '8px 14px', background: '#9E9E9E', borderRadius: '8px', color: '#fff' }}>created</div>
            <span>→</span>
            <div style={{ padding: '8px 14px', background: '#4CAF50', borderRadius: '8px', color: '#fff' }}>paid</div>
            <span>→</span>
            <div style={{ padding: '8px 14px', background: '#2196F3', borderRadius: '8px', color: '#fff' }}>shipped</div>
            <span>→</span>
            <div style={{ padding: '8px 14px', background: '#FF9800', borderRadius: '8px', color: '#fff' }}>delivered</div>
          </div>
          <div style={{ display: 'flex', gap: '40px', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#9E9E9E' }}>created</span>
              <span>↘</span>
              <div style={{ padding: '6px 12px', background: '#f44336', borderRadius: '8px', color: '#fff' }}>cancelled</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#4CAF50' }}>paid</span>
              <span>↘</span>
              <div style={{ padding: '6px 12px', background: '#f44336', borderRadius: '8px', color: '#fff' }}>cancelled</div>
            </div>
          </div>
        </div>

        <div className="info-box">
          <strong>🎯 Итог:</strong> Enums в Swift — один из самых мощных инструментов языка.
          Они заменяют множество конструкций из TypeScript: enum, union types, discriminated unions,
          namespaces и даже частично классы. Используйте enum для моделирования любых
          «один из вариантов» типов данных.
        </div>
      </section>
    </div>
  )
}
