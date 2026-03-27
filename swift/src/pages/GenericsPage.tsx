import CodeBlock from '../components/CodeBlock'

export default function GenericsPage() {
  return (
    <div className="demo-container">
      <h1>🧬 Generics</h1>
      <p className="page-subtitle">
        Обобщённое программирование в Swift — пишем код, который работает с любыми типами.
        Если вы знаете TypeScript generics, многое покажется знакомым — но Swift добавляет
        мощные возможности: associated types, opaque types, type erasure, conditional conformance
        и where-клаузы, которых нет в TypeScript.
      </p>

      {/* ═══════════════════════════════════════════════════════  */}
      {/* --- Visual Diagram: Generic Type Flow ---               */}
      {/* ═══════════════════════════════════════════════════════  */}
      <section className="card">
        <h2>🔬 Как работают Generics: визуализация</h2>
        <p>
          Когда вы пишете generic-функцию, компилятор Swift создаёт{' '}
          <strong>специализированный код</strong> для каждого конкретного типа
          (monomorphization). Вот как <code>T</code> разрешается на этапе компиляции:
        </p>

        {/* --- Diagram: Generic Type Resolution --- */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
          padding: '1.5rem', borderRadius: '12px',
          background: 'var(--card-bg, #f8f9fa)', border: '2px solid var(--border-color, #dee2e6)',
          margin: '1.5rem 0', fontFamily: 'monospace', fontSize: '0.9rem',
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Compile-time Generic Resolution
          </div>

          {/* Source code box */}
          <div style={{
            padding: '1rem 1.5rem', borderRadius: '8px', width: '100%', maxWidth: '420px',
            background: 'var(--code-bg, #2d2d2d)', color: '#e6e6e6', textAlign: 'center',
          }}>
            func swap&lt;T&gt;(_ a: inout{' '}
            <strong style={{ color: '#f7c948' }}>T</strong>, _ b: inout{' '}
            <strong style={{ color: '#f7c948' }}>T</strong>)
          </div>

          <div style={{ fontSize: '1.5rem' }}>⬇️</div>

          {/* Call sites */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { call: 'swap(&x, &y)', T: 'Int', color: '#4dabf7' },
              { call: 'swap(&s1, &s2)', T: 'String', color: '#69db7c' },
              { call: 'swap(&a, &b)', T: 'Double', color: '#da77f2' },
            ].map((item) => (
              <div key={item.T} style={{
                padding: '0.75rem 1rem', borderRadius: '8px', textAlign: 'center',
                border: `2px solid ${item.color}`, background: `${item.color}22`, minWidth: '140px',
              }}>
                <div style={{ fontWeight: 700, color: item.color }}>T = {item.T}</div>
                <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>{item.call}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '1.5rem' }}>⬇️</div>

          {/* Specialized code */}
          <div style={{
            display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%',
          }}>
            {[
              { fn: 'swap_Int(inout Int, inout Int)', color: '#4dabf7' },
              { fn: 'swap_String(inout String, inout String)', color: '#69db7c' },
              { fn: 'swap_Double(inout Double, inout Double)', color: '#da77f2' },
            ].map((item) => (
              <div key={item.fn} style={{
                padding: '0.6rem 1rem', borderRadius: '8px', fontSize: '0.78rem',
                background: 'var(--code-bg, #2d2d2d)', color: item.color, textAlign: 'center',
              }}>
                {item.fn}
              </div>
            ))}
          </div>

          <div style={{ fontSize: '0.8rem', opacity: 0.7, textAlign: 'center', marginTop: '0.5rem' }}>
            Компилятор генерирует отдельную реализацию для каждого конкретного типа —
            это <strong>monomorphization</strong>.
            <br />
            В TypeScript generics стираются при компиляции (type erasure), в Swift — нет.
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════  */}
      {/* --- Generic Functions ---                               */}
      {/* ═══════════════════════════════════════════════════════  */}
      <section className="card">
        <h2>📦 Generic-функции</h2>
        <p>
          В TypeScript вы пишете <code>{'function swap<T>(a: T, b: T)'}</code>.
          В Swift — почти так же, но параметры типа объявляются в угловых скобках после
          имени функции.
        </p>

        <CodeBlock language="swift" title="Базовая generic-функция: swap" code={`
func swapValues<T>(_ a: inout T, _ b: inout T) {
    let temp = a
    a = b
    b = temp
}

var x = 10, y = 20
swapValues(&x, &y)
print(x, y) // 20, 10

var s1 = "hello", s2 = "world"
swapValues(&s1, &s2)
print(s1, s2) // world, hello
`} />

        <CodeBlock language="swift" title="Несколько type-параметров" code={`
// Функция с двумя разными generic-типами
func makePair<A, B>(_ first: A, _ second: B) -> (A, B) {
    return (first, second)
}

let pair1 = makePair(42, "hello")     // (Int, String)
let pair2 = makePair(true, 3.14)      // (Bool, Double)
let pair3 = makePair([1,2], Set([3])) // ([Int], Set<Int>)


// Три type-параметра — цепочка трансформаций
func transform<Input, Intermediate, Output>(
    _ value: Input,
    using first: (Input) -> Intermediate,
    then second: (Intermediate) -> Output
) -> Output {
    second(first(value))
}

let result = transform(42,
    using: { String($0) },          // Int → String
    then:  { $0.count }             // String → Int
)
print(result) // 2  (длина строки "42")
`} />

        <CodeBlock language="swift" title="Generic-функция с constraints" code={`
// Требуем Comparable — аналог extends в TS
func findMin<T: Comparable>(_ array: [T]) -> T? {
    guard var minValue = array.first else { return nil }
    for item in array {
        if item < minValue { minValue = item }
    }
    return minValue
}

print(findMin([3, 1, 4, 1, 5])!)  // 1
print(findMin(["c", "a", "b"])!)   // a


// Несколько constraints через &
func describeAndHash<T: Hashable & CustomStringConvertible>(_ value: T) -> String {
    "\\(value.description) [hash: \\(value.hashValue)]"
}

print(describeAndHash(42))       // 42 [hash: ...]
print(describeAndHash("Swift"))  // Swift [hash: ...]
`} />

        <CodeBlock language="swift" title="where clause — продвинутые ограничения" code={`
// where clause — ограничения, которых нельзя выразить через :
func allItemsMatch<C1: Collection, C2: Collection>(
    _ lhs: C1, _ rhs: C2
) -> Bool where C1.Element == C2.Element, C1.Element: Equatable {
    guard lhs.count == rhs.count else { return false }
    return zip(lhs, rhs).allSatisfy { $0 == $1 }
}

let array = [1, 2, 3]
let set: Set = [1, 2, 3]
// Сравниваем Array и Set — разные Collection, но одинаковые Element
print(allItemsMatch(array, Array(set.sorted()))) // true


// where с протоколами
func uniqueConcat<S: Sequence>(
    _ sequences: S...
) -> [S.Element] where S.Element: Hashable {
    var seen = Set<S.Element>()
    var result: [S.Element] = []
    for seq in sequences {
        for item in seq {
            if seen.insert(item).inserted {
                result.append(item)
            }
        }
    }
    return result
}

print(uniqueConcat([1,2,3], [2,3,4], [4,5]))  // [1, 2, 3, 4, 5]
`} />

        <CodeBlock language="swift" title="Generic-функция: безопасный доступ по индексу" code={`
// Расширяем Collection — безопасный доступ
extension Collection {
    func element(at index: Index) -> Element? {
        indices.contains(index) ? self[index] : nil
    }
}

let numbers = [10, 20, 30]
print(numbers.element(at: 1) ?? "nil")  // 20
print(numbers.element(at: 5) ?? "nil")  // nil — без crash!

// Ещё один пример — generic sorted с key path
func sorted<T, V: Comparable>(_ items: [T], by keyPath: KeyPath<T, V>) -> [T] {
    items.sorted { $0[keyPath: keyPath] < $1[keyPath: keyPath] }
}

struct Person { let name: String; let age: Int }
let people = [Person(name: "Bob", age: 30), Person(name: "Alice", age: 25)]
let byName = sorted(people, by: \\.name)   // Alice, Bob
let byAge = sorted(people, by: \\.age)     // Alice (25), Bob (30)
`} />

        <div className="info-box">
          <strong>📌 TypeScript vs Swift constraints:</strong>{' '}
          В TS: <code>{'function findMin<T extends Comparable>(arr: T[]): T'}</code> — используем
          <code>extends</code>. В Swift — двоеточие <code>:</code> после параметра типа.
          Where clause в TS не существует — это уникальная и мощная фича Swift.
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════  */}
      {/* --- Generic Types: Stack / Queue ---                    */}
      {/* ═══════════════════════════════════════════════════════  */}
      <section className="card">
        <h2>🏗️ Generic-типы: Stack и Queue</h2>
        <p>
          Классический пример — создание обобщённых структур данных. В Swift generic-параметры
          работают со struct, class и enum одинаково.
        </p>

        <CodeBlock language="swift" title="Generic Stack — полная реализация" code={`
struct Stack<Element> {
    private var items: [Element] = []

    var isEmpty: Bool { items.isEmpty }
    var count: Int { items.count }
    var peek: Element? { items.last }

    mutating func push(_ item: Element) {
        items.append(item)
    }

    @discardableResult
    mutating func pop() -> Element? {
        items.isEmpty ? nil : items.removeLast()
    }

    // Subscript для доступа по индексу
    subscript(index: Int) -> Element {
        precondition(index >= 0 && index < items.count, "Index out of range")
        return items[index]
    }
}

// Использование
var intStack = Stack<Int>()
intStack.push(1)
intStack.push(2)
intStack.push(3)
print(intStack.peek!)   // 3
print(intStack.pop()!)  // 3
print(intStack.count)   // 2
print(intStack[0])      // 1
`} />

        <CodeBlock language="swift" title="Generic Queue — FIFO" code={`
struct Queue<Element> {
    private var storage: [Element] = []

    var isEmpty: Bool { storage.isEmpty }
    var count: Int { storage.count }
    var front: Element? { storage.first }

    mutating func enqueue(_ item: Element) {
        storage.append(item)
    }

    @discardableResult
    mutating func dequeue() -> Element? {
        storage.isEmpty ? nil : storage.removeFirst()
    }
}

var queue = Queue<String>()
queue.enqueue("first")
queue.enqueue("second")
queue.enqueue("third")
print(queue.dequeue()!)  // first  (FIFO)
print(queue.front!)      // second
`} />

        <CodeBlock language="swift" title="Сравнение с TypeScript" code={`
// TypeScript — для сравнения
// class Stack<T> {
//     private items: T[] = [];
//     get isEmpty(): boolean { return this.items.length === 0; }
//     push(item: T): void { this.items.push(item); }
//     pop(): T | undefined { return this.items.pop(); }
// }
//
// Ключевые различия:
// 1. Swift struct vs TS class — value type vs reference type
// 2. Swift mutating — явная мутация value types
// 3. Swift @discardableResult — можно игнорировать return
// 4. Swift precondition — crash в debug, аналога нет в TS
// 5. Swift subscript — синтаксический сахар, аналог proxy в JS
`} />
      </section>

      {/* ═══════════════════════════════════════════════════════  */}
      {/* --- Associated Types ---                                */}
      {/* ═══════════════════════════════════════════════════════  */}
      <section className="card">
        <h2>🔗 Associated Types в протоколах</h2>
        <p>
          Associated types — это «placeholder» для типа внутри протокола.
          Конкретный тип определяется при реализации. В TypeScript ближайший аналог —
          generic-интерфейс, но подход фундаментально другой.
        </p>

        {/* Diagram: TS vs Swift approach */}
        <div style={{
          display: 'flex', gap: '1.5rem', padding: '1.5rem', margin: '1.5rem 0',
          borderRadius: '12px', border: '2px solid var(--border-color, #dee2e6)',
          background: 'var(--card-bg, #f8f9fa)', flexWrap: 'wrap', justifyContent: 'center',
        }}>
          <div style={{
            flex: '1 1 280px', padding: '1rem', borderRadius: '8px',
            border: '2px solid #4dabf7', background: '#4dabf722', textAlign: 'center',
          }}>
            <div style={{ fontWeight: 700, color: '#4dabf7', marginBottom: '0.5rem' }}>
              TypeScript
            </div>
            <code style={{ fontSize: '0.85rem', whiteSpace: 'pre' }}>
              {'interface Container<T> {\n  items: T[];\n  add(item: T): void;\n}'}
            </code>
            <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.8 }}>
              Тип задаётся <strong>вызывающим кодом</strong> при использовании
            </div>
          </div>

          <div style={{
            flex: '1 1 280px', padding: '1rem', borderRadius: '8px',
            border: '2px solid #69db7c', background: '#69db7c22', textAlign: 'center',
          }}>
            <div style={{ fontWeight: 700, color: '#69db7c', marginBottom: '0.5rem' }}>
              Swift
            </div>
            <code style={{ fontSize: '0.85rem', whiteSpace: 'pre' }}>
              {'protocol Container {\n  associatedtype Item\n  var count: Int { get }\n  mutating func add(_ item: Item)\n}'}
            </code>
            <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.8 }}>
              Тип определяется <strong>реализацией</strong> протокола
            </div>
          </div>
        </div>

        <CodeBlock language="swift" title="Протокол с associated type" code={`
protocol Container {
    associatedtype Item

    var count: Int { get }
    mutating func append(_ item: Item)
    subscript(i: Int) -> Item { get }
}

// Реализация 1: IntStack — Swift выводит Item == Int
struct IntStack: Container {
    var items: [Int] = []
    var count: Int { items.count }

    mutating func append(_ item: Int) {
        items.append(item)
    }

    subscript(i: Int) -> Int { items[i] }
}

// Реализация 2: наш generic Stack!
extension Stack: Container {
    // Item выводится как Element автоматически
    mutating func append(_ item: Element) {
        push(item)
    }
    // subscript уже определён в Stack
}
`} />

        <CodeBlock language="swift" title="Ограничения на associated types" code={`
protocol SortableContainer {
    associatedtype Item: Comparable   // Item ДОЛЖЕН быть Comparable

    var items: [Item] { get }
    func sorted() -> [Item]
}

// Default implementation
extension SortableContainer {
    func sorted() -> [Item] {
        items.sorted()
    }
}

struct NumberContainer: SortableContainer {
    var items: [Int]    // Int: Comparable ✅
}

let nc = NumberContainer(items: [3, 1, 2])
print(nc.sorted())  // [1, 2, 3]
`} />

        <CodeBlock language="swift" title="Associated type с where clause" code={`
// Связанные associated types
protocol Transformer {
    associatedtype Input
    associatedtype Output

    func transform(_ input: Input) -> Output
}

// Ограничение: Output должен быть коллекцией из Input элементов
protocol Splitter {
    associatedtype Source
    associatedtype Parts: Collection where Parts.Element == Source

    func split(_ source: Source) -> Parts
}

struct WordSplitter: Splitter {
    func split(_ source: String) -> [String] {
        source.split(separator: " ").map(String.init)
    }
    // Source == String, Parts == [String] ✅
    // [String].Element == String == Source ✅
}

print(WordSplitter().split("hello world"))  // ["hello", "world"]
`} />

        <CodeBlock language="swift" title="Primary associated types (Swift 5.7+)" code={`
// Swift 5.7 — primary associated types в угловых скобках
// Позволяют указать конкретный тип при использовании протокола

// Стандартная библиотека:
// protocol Collection<Element>: Sequence { ... }

func printElements(_ items: some Collection<Int>) {
    for item in items {
        print(item)
    }
}

printElements([1, 2, 3])        // Array<Int>
printElements(Set([4, 5, 6]))   // Set<Int>

// Сравните: раньше нужна была where clause
// func printElements<C: Collection>(_ items: C) where C.Element == Int
`} />
      </section>

      {/* ═══════════════════════════════════════════════════════  */}
      {/* --- Opaque Types (some) and Existential Types (any) --- */}
      {/* ═══════════════════════════════════════════════════════  */}
      <section className="card">
        <h2>🎭 Opaque Types (some) и Existential Types (any)</h2>
        <p>
          Swift имеет два механизма для скрытия конкретного типа за протоколом:
          <code>some</code> (opaque type) и <code>any</code> (existential type). Они
          выглядят похоже, но работают фундаментально по-разному.
        </p>

        {/* Diagram: some vs any */}
        <div style={{
          display: 'flex', gap: '1.5rem', padding: '1.5rem', margin: '1.5rem 0',
          borderRadius: '12px', border: '2px solid var(--border-color, #dee2e6)',
          background: 'var(--card-bg, #f8f9fa)', flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {/* some box */}
          <div style={{
            flex: '1 1 280px', padding: '1rem', borderRadius: '10px',
            border: '2px solid #51cf66', background: '#51cf6615',
          }}>
            <div style={{
              fontWeight: 700, color: '#51cf66', fontSize: '1.1rem', textAlign: 'center',
            }}>
              some Protocol<br />(Opaque Type)
            </div>
            <div style={{
              margin: '0.75rem 0', padding: '0.75rem', borderRadius: '6px',
              background: 'var(--code-bg, #2d2d2d)', color: '#e6e6e6', fontSize: '0.82rem',
              textAlign: 'center',
            }}>
              Compile time: <strong>Circle</strong><br />
              Runtime: <strong>Circle</strong><br />
              <span style={{ color: '#51cf66' }}>✅ Zero overhead</span>
            </div>
            <ul className="info-list">
              <li>Один конкретный тип (неизвестный снаружи)</li>
              <li>Компилятор оптимизирует (static dispatch)</li>
              <li>Нельзя вернуть разные типы</li>
              <li>Основа SwiftUI: <code>var body: some View</code></li>
            </ul>
          </div>

          {/* any box */}
          <div style={{
            flex: '1 1 280px', padding: '1rem', borderRadius: '10px',
            border: '2px solid #ff922b', background: '#ff922b15',
          }}>
            <div style={{
              fontWeight: 700, color: '#ff922b', fontSize: '1.1rem', textAlign: 'center',
            }}>
              any Protocol<br />(Existential Type)
            </div>
            <div style={{
              margin: '0.75rem 0', padding: '0.75rem', borderRadius: '6px',
              background: 'var(--code-bg, #2d2d2d)', color: '#e6e6e6', fontSize: '0.82rem',
              textAlign: 'center',
            }}>
              Compile time: <strong>any Drawable</strong><br />
              Runtime: <strong>Circle | Square | ...</strong><br />
              <span style={{ color: '#ff922b' }}>⚠️ Existential container overhead</span>
            </div>
            <ul className="info-list">
              <li>Любой тип, реализующий протокол</li>
              <li>Dynamic dispatch в рантайме</li>
              <li>Можно хранить разные типы в коллекции</li>
              <li>Overhead: аллокация, indirect access</li>
            </ul>
          </div>
        </div>

        <CodeBlock language="swift" title="some — opaque return type" code={`
protocol Drawable {
    func draw() -> String
}

struct Circle: Drawable {
    func draw() -> String { "⭕ Circle" }
}

struct Square: Drawable {
    func draw() -> String { "⬜ Square" }
}

// some — один конкретный тип, скрытый от вызывающего
func makeShape() -> some Drawable {
    Circle()  // всегда Circle, вызывающий не знает
}

let shape = makeShape()
print(shape.draw())       // ⭕ Circle
print(type(of: shape))   // Circle — конкретный тип!

// ❌ Ошибка: some требует ОДИН тип
// func randomShape() -> some Drawable {
//     if Bool.random() { return Circle() }
//     else { return Square() }     // ❌ разные типы
// }
`} />

        <CodeBlock language="swift" title="any — existential тип" code={`
// any — позволяет разные типы
func randomShape() -> any Drawable {
    Bool.random() ? Circle() : Square()  // ✅ OK с any
}

// Гетерогенная коллекция
let shapes: [any Drawable] = [Circle(), Square(), Circle(), Square()]
for shape in shapes {
    print(shape.draw())  // ⭕ ⬜ ⭕ ⬜
}

// some в параметрах (Swift 5.7+) — сахар для generics
func drawShape(_ shape: some Drawable) {
    print(shape.draw())
}
// Эквивалентно:
// func drawShape<T: Drawable>(_ shape: T) { print(shape.draw()) }

// Ключевое отличие в параметрах:
func drawAll(_ shapes: [any Drawable]) {   // разные типы ✅
    shapes.forEach { print($0.draw()) }
}
func drawSame(_ shapes: [some Drawable]) { // один тип ❌ не скомпилируется так
    // some в массиве — все элементы одного типа
}
`} />

        <div className="info-box">
          <strong>🎯 Правило выбора:</strong> Используйте <code>some</code> по умолчанию
          (быстрее, безопаснее). Переключайтесь на <code>any</code> только когда нужна
          гетерогенная коллекция или полиморфизм в рантайме. В SwiftUI{' '}
          <code>some View</code> — стандарт.
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════  */}
      {/* --- Type Erasure Pattern ---                            */}
      {/* ═══════════════════════════════════════════════════════  */}
      <section className="card">
        <h2>🧹 Type Erasure: паттерн</h2>
        <p>
          До появления <code>any</code> в Swift 5.6+ для хранения разнотипных объектов одного
          протокола использовался паттерн Type Erasure — обёртка, стирающая конкретный тип.
        </p>

        <CodeBlock language="swift" title="Проблема: протокол с associated type нельзя использовать как тип" code={`
protocol Cacheable {
    associatedtype Value
    func cached() -> Value
}

// ❌ let items: [Cacheable] → ошибка!
// "Protocol 'Cacheable' can only be used as a generic constraint
//  because it has Self or associated type requirements"
`} />

        <CodeBlock language="swift" title="Решение: классический Type Eraser" code={`
struct AnyCacheable<Value>: Cacheable {
    private let _cached: () -> Value

    init<T: Cacheable>(_ wrapped: T) where T.Value == Value {
        _cached = wrapped.cached
    }

    func cached() -> Value { _cached() }
}

struct ImageCache: Cacheable {
    func cached() -> Data { Data("image".utf8) }
}

struct TextCache: Cacheable {
    func cached() -> String { "cached text" }
}

// Теперь можно хранить в массиве (с одинаковым Value)
let dataCaches: [AnyCacheable<Data>] = [
    AnyCacheable(ImageCache())
]
`} />

        <CodeBlock language="swift" title="Стандартные type erasers" code={`
// AnySequence — стирает конкретный тип Sequence
let arrays: [AnySequence<Int>] = [
    AnySequence([1, 2, 3]),
    AnySequence(Set([4, 5, 6])),
    AnySequence(1...10)
]

for seq in arrays {
    print(Array(seq))
}

// AnyHashable — стирает тип, сохраняя Hashable
let mixed: [AnyHashable] = [42, "hello", 3.14]
print(mixed)  // [42, "hello", 3.14]

// AnyCollection, AnyIterator, AnyPublisher (Combine)
`} />

        <CodeBlock language="swift" title="Современный Swift: any вместо ручного erasure" code={`
// Swift 5.7+ — используем existential 'any'
protocol Drawable {
    func draw() -> String
}

struct Circle: Drawable { func draw() -> String { "⭕" } }
struct Square: Drawable { func draw() -> String { "⬜" } }
struct Triangle: Drawable { func draw() -> String { "🔺" } }

// ✅ Просто any — не нужен AnyDrawable
let shapes: [any Drawable] = [Circle(), Square(), Triangle()]
shapes.forEach { print($0.draw()) }
// ⭕ ⬜ 🔺

// Конвертация any → some (unboxing)
func drawSingle(_ shape: any Drawable) {
    // any автоматически «открывается» при передаче в some
    drawExact(shape)
}

func drawExact(_ shape: some Drawable) {
    print(shape.draw())
}
`} />

        <div className="info-box warning">
          <strong>⚠️ Performance:</strong> <code>any</code> использует <em>existential container</em>:
          3 слова inline + heap allocation для больших типов. <code>some</code> не имеет overhead.
          Для hot paths предпочитайте <code>some</code> или конкретные типы.
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════  */}
      {/* --- Generic Constraints Deep Dive ---                   */}
      {/* ═══════════════════════════════════════════════════════  */}
      <section className="card">
        <h2>🔒 Generic Constraints: подробный разбор</h2>
        <p>
          Swift предоставляет множество способов ограничить generic-типы. Это гарантирует
          безопасность на этапе компиляции — вы не можете вызвать функцию с неподходящим типом.
        </p>

        <CodeBlock language="swift" title="Стандартные protocol constraints" code={`
// Equatable — можно сравнивать ==
func contains<T: Equatable>(_ array: [T], _ item: T) -> Bool {
    array.contains(item)
}

// Hashable — можно использовать в Set и Dictionary
func uniqueElements<T: Hashable>(_ array: [T]) -> [T] {
    var seen = Set<T>()
    return array.filter { seen.insert($0).inserted }
}

print(uniqueElements([1, 2, 2, 3, 3, 3]))  // [1, 2, 3]

// Comparable — можно сортировать и сравнивать
func clamp<T: Comparable>(_ value: T, min: T, max: T) -> T {
    Swift.min(Swift.max(value, min), max)
}

print(clamp(15, min: 0, max: 10))  // 10
print(clamp(-5, min: 0, max: 10))  // 0
print(clamp(5, min: 0, max: 10))   // 5
`} />

        <CodeBlock language="swift" title="Codable constraints — JSON сериализация" code={`
// Encodable — можно сериализовать в JSON
func toJSON<T: Encodable>(_ value: T) -> String? {
    guard let data = try? JSONEncoder().encode(value) else { return nil }
    return String(data: data, encoding: .utf8)
}

// Decodable — можно десериализовать из JSON
func fromJSON<T: Decodable>(_ json: String, as type: T.Type) -> T? {
    guard let data = json.data(using: .utf8) else { return nil }
    return try? JSONDecoder().decode(type, from: data)
}

struct User: Codable {
    let name: String
    let age: Int
}

let user = User(name: "Alice", age: 30)
let json = toJSON(user)!
print(json) // {"name":"Alice","age":30}

let decoded = fromJSON(json, as: User.self)!
print(decoded.name) // Alice
`} />

        <CodeBlock language="swift" title="Class constraints и кастомные протоколы" code={`
// Ограничение на класс (не struct/enum)
func identical<T: AnyObject>(_ a: T, _ b: T) -> Bool {
    a === b  // === сравнивает ссылки — работает только с классами
}

// Комбинируем: класс + протокол
protocol Identifiable2 {
    var id: String { get }
}

func findById<T: AnyObject & Identifiable2>(
    _ items: [T], id: String
) -> T? {
    items.first { $0.id == id }
}

// Custom constraint с несколькими протоколами
protocol Displayable {
    var displayName: String { get }
}

func formatItems<T: Hashable & Displayable & Comparable>(
    _ items: [T]
) -> [String] {
    Array(Set(items)).sorted().map { $0.displayName }
}
`} />

        <CodeBlock language="swift" title="Сложные where constraints" code={`
// where с несколькими условиями
func commonElements<S1: Sequence, S2: Sequence>(
    _ s1: S1, _ s2: S2
) -> [S1.Element] where S1.Element == S2.Element, S1.Element: Hashable {
    let set = Set(s2)
    return s1.filter { set.contains($0) }
}

print(commonElements([1,2,3,4,5], [3,4,5,6,7])) // [3, 4, 5]

// where на extension
extension Array where Element: CustomStringConvertible {
    var descriptions: [String] {
        map { $0.description }
    }
}

print([1, 2, 3].descriptions)  // ["1", "2", "3"]

// where с ключевыми путями
func sorted<T, V: Comparable>(
    _ items: [T],
    by keyPath: KeyPath<T, V>,
    ascending: Bool = true
) -> [T] {
    items.sorted {
        ascending
            ? $0[keyPath: keyPath] < $1[keyPath: keyPath]
            : $0[keyPath: keyPath] > $1[keyPath: keyPath]
    }
}
`} />
      </section>

      {/* ═══════════════════════════════════════════════════════  */}
      {/* --- Generic Subscripts ---                              */}
      {/* ═══════════════════════════════════════════════════════  */}
      <section className="card">
        <h2>📐 Generic Subscripts</h2>
        <p>
          Subscripts (аналог <code>operator[]</code>) тоже могут быть generic —
          полезно для безопасного и типизированного доступа к данным.
        </p>

        <CodeBlock language="swift" title="Generic subscript в Dictionary" code={`
extension Dictionary {
    // Получить значение с приведением типа
    subscript<T>(key: Key, as type: T.Type) -> T? {
        self[key] as? T
    }
}

let config: [String: Any] = [
    "name": "App",
    "version": 2,
    "debug": true
]

let name: String? = config["name", as: String.self]   // "App"
let version: Int? = config["version", as: Int.self]     // 2
let debug: Bool? = config["debug", as: Bool.self]       // true
`} />

        <CodeBlock language="swift" title="Generic subscript в своём типе" code={`
struct TypedStorage {
    private var storage: [String: Any] = [:]

    subscript<T>(key: String, default defaultValue: T) -> T {
        get { (storage[key] as? T) ?? defaultValue }
        set { storage[key] = newValue }
    }
}

var store = TypedStorage()
store["count", default: 0] = 42
print(store["count", default: 0])      // 42
print(store["missing", default: "N/A"]) // N/A
`} />
      </section>

      {/* ═══════════════════════════════════════════════════════  */}
      {/* --- Conditional Conformance ---                         */}
      {/* ═══════════════════════════════════════════════════════  */}
      <section className="card">
        <h2>🎯 Conditional Conformance</h2>
        <p>
          Conditional conformance — когда generic-тип соответствует протоколу{' '}
          <strong>только если</strong> его type-параметр тоже соответствует определённым
          требованиям. Этого механизма нет в TypeScript.
        </p>

        <CodeBlock language="swift" title="Conditional conformance в стандартной библиотеке" code={`
// Array<Element> соответствует Equatable ТОЛЬКО если Element: Equatable
let a = [1, 2, 3]
let b = [1, 2, 3]
print(a == b)  // true ✅ — потому что Int: Equatable

// Рекурсивно!
let nested1 = [[1, 2], [3, 4]]
let nested2 = [[1, 2], [3, 4]]
print(nested1 == nested2)  // true ✅
// [[Int]] == → [Int] == → Int ==

// Optional тоже:
let x: Int? = 42
let y: Int? = 42
print(x == y)  // true — потому что Int: Equatable

// Dictionary — если Key: Hashable и Value: Equatable
let d1 = ["a": 1]
let d2 = ["a": 1]
print(d1 == d2)  // true ✅
`} />

        <CodeBlock language="swift" title="Свой тип с conditional conformance" code={`
struct Wrapper<Value> {
    let value: Value
}

// Wrapper: Equatable ТОЛЬКО если Value: Equatable
extension Wrapper: Equatable where Value: Equatable {
    static func == (lhs: Wrapper, rhs: Wrapper) -> Bool {
        lhs.value == rhs.value
    }
}

// Wrapper: Hashable ТОЛЬКО если Value: Hashable
extension Wrapper: Hashable where Value: Hashable {
    func hash(into hasher: inout Hasher) {
        hasher.combine(value)
    }
}

// Wrapper: Comparable ТОЛЬКО если Value: Comparable
extension Wrapper: Comparable where Value: Comparable {
    static func < (lhs: Wrapper, rhs: Wrapper) -> Bool {
        lhs.value < rhs.value
    }
}

// Wrapper: Codable ТОЛЬКО если Value: Codable
extension Wrapper: Codable where Value: Codable { }

// Теперь:
let w1 = Wrapper(value: 10)
let w2 = Wrapper(value: 20)
print(w1 == w2)   // false ✅
print(w1 < w2)    // true ✅

let set: Set = [Wrapper(value: 1), Wrapper(value: 2)]  // ✅ Hashable
`} />

        <CodeBlock language="swift" title="Conditional methods через where на extension" code={`
// Добавляем методы только для определённых Element
extension Array where Element: Numeric {
    var sum: Element {
        reduce(0, +)
    }
}

extension Array where Element: BinaryInteger {
    var average: Double {
        isEmpty ? 0 : Double(sum) / Double(count)
    }
}

print([1, 2, 3, 4, 5].sum)       // 15
print([10, 20, 30].average)       // 20.0
// print(["a", "b"].sum)  // ❌ String не Numeric

extension Array where Element: StringProtocol {
    func joinedWithComma() -> String {
        joined(separator: ", ")
    }
}

print(["Swift", "is", "great"].joinedWithComma())  // Swift, is, great

// Conditional conformance для Optional
extension Optional: CustomStringConvertible where Wrapped: CustomStringConvertible {
    public var description: String {
        switch self {
        case .some(let value): return value.description
        case .none: return "nil"
        }
    }
}
`} />

        <div className="info-box success">
          <strong>💡 Мощь conditional conformance:</strong> Вы можете выразить:
          «Array — Equatable, но только если его элементы Equatable». Это делает
          стандартную библиотеку Swift невероятно выразительной. В TypeScript такой
          условной реализации интерфейсов не существует.
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════  */}
      {/* --- Real-world Patterns ---                             */}
      {/* ═══════════════════════════════════════════════════════  */}
      <section className="card">
        <h2>🌍 Real-world паттерны с Generics</h2>

        <h3>Result Type</h3>
        <p>
          <code>Result&lt;Success, Failure&gt;</code> — generic enum для обработки ошибок.
          Аналог <code>Either&lt;Left, Right&gt;</code> в функциональном программировании.
        </p>

        <CodeBlock language="swift" title="Result<Success, Failure>" code={`
enum NetworkError: Error {
    case invalidURL
    case noData
    case decodingFailed
}

struct User: Codable {
    let name: String
    let age: Int
}

func fetchUser(id: Int) -> Result<User, NetworkError> {
    guard id > 0 else { return .failure(.invalidURL) }
    return .success(User(name: "Alice", age: 30))
}

// switch
switch fetchUser(id: 1) {
case .success(let user):
    print("Got: \\(user.name)")
case .failure(let error):
    print("Error: \\(error)")
}

// map / flatMap — цепочка трансформаций
let userName = fetchUser(id: 1)
    .map { $0.name }            // Result<String, NetworkError>
    .map { $0.uppercased() }    // Result<String, NetworkError>

print(try? userName.get())  // Optional("ALICE")
`} />

        <h3>Generic Codable Wrapper (API Response)</h3>
        <CodeBlock language="swift" title="Generic API Response" code={`
// API response wrapper — один generic для всех endpoints
struct APIResponse<T: Decodable>: Decodable {
    let status: Int
    let message: String
    let data: T?
}

struct Product: Codable {
    let id: Int
    let name: String
    let price: Double
}

func decode<T: Decodable>(_ json: Data, as type: T.Type) throws -> T {
    let decoder = JSONDecoder()
    decoder.keyDecodingStrategy = .convertFromSnakeCase
    return try decoder.decode(type, from: json)
}

// Использование — один wrapper для разных моделей:
// let user = try decode(data, as: APIResponse<User>.self)
// let products = try decode(data, as: APIResponse<[Product]>.self)
// let count = try decode(data, as: APIResponse<Int>.self)
`} />

        <h3>Dependency Injection с Generics</h3>
        <CodeBlock language="swift" title="Generic Repository Pattern" code={`
// Протокол репозитория — generic CRUD
protocol Repository {
    associatedtype Entity: Identifiable

    func getAll() async throws -> [Entity]
    func getById(_ id: Entity.ID) async throws -> Entity?
    func save(_ entity: Entity) async throws
    func delete(_ id: Entity.ID) async throws
}

// In-memory реализация для тестов
class InMemoryRepository<T: Identifiable>: Repository {
    private var storage: [T.ID: T] = [:]

    func getAll() async throws -> [T] { Array(storage.values) }
    func getById(_ id: T.ID) async throws -> T? { storage[id] }

    func save(_ entity: T) async throws {
        storage[entity.id] = entity
    }

    func delete(_ id: T.ID) async throws {
        storage.removeValue(forKey: id)
    }
}

// Service — принимает любой Repository
class UserService<R: Repository> where R.Entity == User {
    private let repository: R

    init(repository: R) {
        self.repository = repository
    }

    func getAllUsers() async throws -> [User] {
        try await repository.getAll()
    }
}

// Легко подменить в тестах:
// let testService = UserService(repository: InMemoryRepository<User>())
// let prodService = UserService(repository: CoreDataRepository<User>())
`} />

        <h3>Generic Builder Pattern</h3>
        <CodeBlock language="swift" title="Fluent Builder с Generics" code={`
class RequestBuilder<Body: Encodable> {
    private var url: String = ""
    private var method: String = "GET"
    private var headers: [String: String] = [:]
    private var body: Body?

    func setURL(_ url: String) -> RequestBuilder {
        self.url = url
        return self
    }

    func setMethod(_ method: String) -> RequestBuilder {
        self.method = method
        return self
    }

    func addHeader(_ key: String, _ value: String) -> RequestBuilder {
        headers[key] = value
        return self
    }

    func setBody(_ body: Body) -> RequestBuilder {
        self.body = body
        return self
    }

    func build() -> (url: String, method: String, headers: [String: String], body: Body?) {
        (url, method, headers, body)
    }
}

// Fluent API
let request = RequestBuilder<User>()
    .setURL("https://api.example.com/users")
    .setMethod("POST")
    .addHeader("Content-Type", "application/json")
    .setBody(User(name: "Alice", age: 30))
    .build()
`} />
      </section>

      {/* ═══════════════════════════════════════════════════════  */}
      {/* --- Swift vs TypeScript Comparison Table ---             */}
      {/* ═══════════════════════════════════════════════════════  */}
      <section className="card">
        <h2>🔄 Swift Generics vs TypeScript Generics</h2>

        <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
          <table className="comparison-table" style={{
            width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem',
            border: '1px solid var(--border-color, #dee2e6)',
          }}>
            <thead>
              <tr style={{ background: 'var(--code-bg, #2d2d2d)', color: '#e6e6e6' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color, #dee2e6)' }}>
                  Фича
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '2px solid var(--border-color, #dee2e6)' }}>
                  Swift
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '2px solid var(--border-color, #dee2e6)' }}>
                  TypeScript
                </th>
              </tr>
            </thead>
            <tbody>
              {([
                ['Generic-функции', 'func f<T>(_ v: T) -> T', 'function f<T>(v: T): T', true, true],
                ['Generic-классы/struct', 'struct S<T> { }', 'class S<T> { }', true, true],
                ['Type constraints', 'T: Protocol', 'T extends Interface', true, true],
                ['Multiple constraints', 'T: A & B', 'T extends A & B', true, true],
                ['where clause', 'where T.Element: Eq', '—', true, false],
                ['Associated types', 'associatedtype Item', '— (generic interface)', true, false],
                ['Opaque types (some)', 'some Protocol', '—', true, false],
                ['Existential types (any)', 'any Protocol', '—', true, false],
                ['Conditional conformance', 'ext Array: P where E: P', '—', true, false],
                ['Runtime generics', 'Monomorphization', 'Erasure при компиляции', true, false],
                ['Variadic generics', 'each T (Swift 5.9)', '— (tuple types)', true, false],
                ['Generic subscripts', 'subscript<T>(...)', '— (index signatures)', true, false],
                ['Primary associated types', 'Collection<Int>', '— (встроено)', true, false],
                ['Default type params', '— (нет)', 'T = DefaultType', false, true],
                ['Conditional types', '— (нет аналога)', 'T extends U ? A : B', false, true],
                ['Mapped types', '— (нет аналога)', '{ [K in keyof T]: V }', false, true],
                ['Template literal types', '— (нет)', '`prefix_${T}`', false, true],
                ['Type inference', '✅ Мощный', '✅ Мощный', true, true],
              ] as [string, string, string, boolean, boolean][]).map(([feature, swift, ts, hasSwift, hasTs], i) => (
                <tr key={i} style={{
                  background: i % 2 === 0 ? 'transparent' : 'var(--card-bg, #f8f9fa)',
                  borderBottom: '1px solid var(--border-color, #dee2e6)',
                }}>
                  <td style={{ padding: '0.6rem 0.75rem', fontWeight: 600 }}>{feature}</td>
                  <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center' }}>
                    <span style={{ color: hasSwift ? '#51cf66' : '#ff6b6b' }}>
                      {hasSwift ? '✅' : '❌'}
                    </span>{' '}
                    <code style={{ fontSize: '0.78rem' }}>{swift}</code>
                  </td>
                  <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center' }}>
                    <span style={{ color: hasTs ? '#51cf66' : '#ff6b6b' }}>
                      {hasTs ? '✅' : '❌'}
                    </span>{' '}
                    <code style={{ fontSize: '0.78rem' }}>{ts}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CodeBlock language="swift" title="Side by side: Swift code" code={`
// 1. Generic-функция
func identity<T>(_ value: T) -> T { value }

// 2. Constraints
func printSorted<T: Comparable>(_ arr: [T]) {
    print(arr.sorted())
}

// 3. Associated types (нет аналога в TS)
protocol IteratorProtocol2 {
    associatedtype Element
    mutating func next() -> Element?
}

// 4. Where clause (нет аналога в TS)
func merge<S1: Sequence, S2: Sequence>(
    _ s1: S1, _ s2: S2
) -> [S1.Element] where S1.Element == S2.Element {
    Array(s1) + Array(s2)
}

// 5. Opaque types (нет аналога в TS)
// func makeView() -> some View { Text("Hi") }

// 6. Conditional conformance (нет аналога в TS)
// extension Array: Encodable where Element: Encodable { }
`} />

        <CodeBlock language="swift" title="Side by side: TypeScript аналоги" code={`
// 1. Generic-функция
// function identity<T>(value: T): T { return value; }

// 2. Constraints
// function printSorted<T extends number | string>(arr: T[]): void {
//     console.log([...arr].sort());
// }

// 3. Generic-интерфейс (не associated type, а явный параметр)
// interface IteratorProtocol<T> { next(): T | undefined; }

// 4. Conditional types (другой механизм, не where)
// type Merge<A, B> = A extends B ? A[] : never;

// 5. TS нет opaque types — return type всегда виден
// 6. TS нет conditional conformance

// Зато в TS есть:
// - Mapped types: { [K in keyof T]: V }
// - Conditional types: T extends U ? A : B
// - Template literal types: \`${"prefix"}_\${T}\`
// - Default type params: <T = string>
`} />
      </section>

      {/* ═══════════════════════════════════════════════════════  */}
      {/* --- Summary ---                                         */}
      {/* ═══════════════════════════════════════════════════════  */}
      <section className="card">
        <h2>📋 Шпаргалка</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Generic-функции</h3>
            <p>
              <code>{'func f<T>(_ v: T) -> T'}</code><br />
              Constraints: <code>T: Protocol</code>
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏗️</div>
            <h3>Generic-типы</h3>
            <p>
              <code>struct Stack&lt;Element&gt;</code><br />
              Работает с struct, class, enum
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔗</div>
            <h3>Associated Types</h3>
            <p>
              <code>associatedtype Item</code><br />
              Тип определяет реализация
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎭</div>
            <h3>some vs any</h3>
            <p>
              <code>some</code> — 1 тип, zero cost<br />
              <code>any</code> — полиморфизм
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Conditional Conformance</h3>
            <p>
              <code>{'extension A: P where E: P'}</code><br />
              Условная реализация протокола
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Where Clause</h3>
            <p>
              Сложные ограничения:<br />
              <code>where T.Element == U</code>
            </p>
          </div>
        </div>
      </section>

      <div className="info-box" style={{ marginTop: '2rem' }}>
        <strong>🎓 Итого:</strong> Generics в Swift значительно мощнее, чем в TypeScript.
        Associated types позволяют строить выразительные системы типов в протоколах.
        Opaque types (<code>some</code>) — основа SwiftUI. Type erasure (<code>any</code>)
        — для гетерогенных коллекций. Where clause и conditional conformance дают гибкость,
        недоступную в TypeScript. Swift generics существуют в рантайме (monomorphization),
        а в TS они стираются при компиляции.
      </div>
    </div>
  )
}
