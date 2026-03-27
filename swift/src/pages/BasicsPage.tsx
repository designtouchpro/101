import CodeBlock from '../components/CodeBlock'

export default function BasicsPage() {
  return (
    <div className="demo-container">
      <h1>📝 Типы и переменные</h1>
      <p>
        Основы системы типов Swift. Если вы пришли из JavaScript/TypeScript — здесь вы найдёте
        знакомые концепции, но с гораздо более строгой типизацией «из коробки».
      </p>

      {/* ─── let vs var ─── */}
      <section className="card">
        <h2>🔒 let vs var — объявление переменных</h2>
        <p>
          В Swift <code>let</code> объявляет <strong>константу</strong> (нельзя переприсвоить),
          а <code>var</code> — переменную. Это похоже на <code>const</code> и <code>let</code> в JS,
          но есть важное отличие: <code>let</code> в Swift делает значение полностью иммутабельным
          для value types (struct, enum, tuple).
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift</h3>
            <CodeBlock language="swift" code={`
let name = "Анна"       // константа — нельзя изменить
var age = 25            // переменная — можно изменить
age = 26                // ✅ OK

// name = "Мария"       // ❌ Ошибка компиляции!

// Множественное объявление
var x = 0, y = 0, z = 0
let a = 1, b = 2, c = 3
`} />
          </div>
          <div className="feature-card">
            <h3>JavaScript / TypeScript</h3>
            <CodeBlock language="swift" code={`
// JS эквивалент:
const name = "Анна"     // нельзя переприсвоить
let age = 25            // можно переприсвоить
age = 26                // ✅ OK

// НО: const в JS не делает объект иммутабельным!
const user = { name: "Анна" }
user.name = "Мария"     // ✅ OK в JS (мутация)

// В Swift let + struct = полная иммутабельность
`} />
          </div>
        </div>

        <div className="info-box">
          <strong>💡 Совет:</strong> В Swift принято использовать <code>let</code> везде, где возможно.
          Xcode даже подсказывает: «Variable was never mutated; consider changing to let».
          Это делает код безопаснее и позволяет компилятору оптимизировать.
        </div>
      </section>

      {/* ─── Система типов ─── */}
      <section className="card">
        <h2>🧱 Базовые типы данных</h2>
        <p>
          Swift — строго типизированный язык. Каждое значение имеет конкретный тип,
          и неявные преобразования между типами запрещены.
        </p>

        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>Swift тип</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>JS/TS аналог</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>Описание</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Int', 'number', 'Целое число (64-bit на современных платформах)'],
              ['Double', 'number', '64-bit число с плавающей точкой (15 знаков)'],
              ['Float', 'number', '32-bit число с плавающей точкой (6 знаков)'],
              ['String', 'string', 'Строка (Unicode-correct, value type)'],
              ['Bool', 'boolean', 'true или false'],
              ['Character', '—', 'Один Unicode-символ (нет аналога в JS)'],
            ].map(([swift, js, desc]) => (
              <tr key={swift}>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)' }}><code>{swift}</code></td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)' }}><code>{js}</code></td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Целые числа
let score: Int = 100
let bigNumber: Int64 = 9_000_000_000   // _ для читаемости
let byte: UInt8 = 255                   // unsigned 8-bit (0...255)

// Числа с плавающей точкой
let pi: Double = 3.14159265358979
let temperature: Float = 36.6

// Boolean
let isSwiftFun: Bool = true
let isJavaScript = false   // тип Bool выведен автоматически

// Character — один символ
let letter: Character = "A"
let emoji: Character = "🐦"

// String
let greeting: String = "Привет, мир!"
`} />
        </div>

        <div className="info-box">
          <strong>⚠️ Важно:</strong> В JS <code>number</code> — это всегда 64-bit float.
          В Swift <code>Int</code> и <code>Double</code> — разные типы!
          Нельзя сложить <code>Int</code> и <code>Double</code> без явного преобразования.
        </div>
      </section>

      {/* ─── Type Inference ─── */}
      <section className="card">
        <h2>🔍 Type Inference — вывод типов</h2>
        <p>
          Как и TypeScript, Swift умеет выводить типы автоматически.
          Вам не нужно указывать тип, если компилятор может его определить из контекста.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Типы выводятся автоматически
let message = "Hello"        // String
let count = 42               // Int
let price = 19.99            // Double (не Float!)
let isActive = true          // Bool

// Явные аннотации типов (type annotations)
let message2: String = "Hello"
let count2: Int = 42
let price2: Float = 19.99   // Float, т.к. указали явно

// Когда аннотация нужна:
// 1. Тип нельзя вывести
let emptyArray: [String] = []

// 2. Хотим другой тип
let small: Float = 3.14     // Float вместо Double
let short: Int16 = 100      // Int16 вместо Int

// 3. Объявление без инициализации
let username: String
// ... какая-то логика ...
username = "admin"           // присвоение позже (let можно присвоить ровно 1 раз)
`} />
        </div>
      </section>

      {/* ─── Type Safety ─── */}
      <section className="card">
        <h2>🛡️ Type Safety — безопасность типов</h2>
        <p>
          Swift не допускает неявные преобразования типов. Это предотвращает множество ошибок,
          которые в JavaScript остались бы незамеченными до рантайма.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>❌ Так нельзя (Swift)</h3>
            <CodeBlock language="swift" code={`
let a: Int = 10
let b: Double = 3.14

// let sum = a + b
// ❌ Ошибка! Нельзя сложить Int и Double

// Нужно явное преобразование:
let sum = Double(a) + b     // ✅ 13.14
let sum2 = a + Int(b)       // ✅ 13 (дробная часть отброшена)
`} />
          </div>
          <div className="feature-card">
            <h3>😱 А в JS всё «работает»</h3>
            <CodeBlock language="swift" code={`
// JavaScript — неявные преобразования:
// "5" + 3        → "53"  (string)
// "5" - 3        → 2     (number)
// true + 1       → 2
// null + 5       → 5
// [] + {}        → "[object Object]"

// В Swift такого хаоса нет!
// Каждое преобразование — явное и контролируемое.
`} />
          </div>
        </div>
      </section>

      {/* ─── Strings ─── */}
      <section className="card">
        <h2>📝 Строки и интерполяция</h2>
        <p>
          Строки в Swift — value type (как struct). Они Unicode-correct,
          что означает корректную работу с эмодзи и любыми символами.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Строковая интерполяция (аналог template literals в JS)
let name = "Мир"
let greeting = "Привет, \\(name)!"           // "Привет, Мир!"
let calc = "2 + 2 = \\(2 + 2)"              // "2 + 2 = 4"

// JS: \`Привет, \${name}!\`
// Swift: "Привет, \\(name)!"

// Многострочные строки (аналог backticks в JS)
let html = """
    <html>
        <body>
            <h1>\\(greeting)</h1>
        </body>
    </html>
    """

// Конкатенация
let first = "Hello"
let second = " World"
let combined = first + second        // "Hello World"

// Пустая строка
let empty1 = ""
let empty2 = String()
let isEmpty = empty1.isEmpty         // true

// Длина строки
let text = "Привет 🐦"
print(text.count)                    // 8 (корректно считает emoji!)
// В JS: "Привет 🐦".length → 9 (emoji = 2 code units)
`} />
        </div>

        <div className="info-box">
          <strong>🔑 Ключевое отличие:</strong> В JS строки индексируются числами (<code>"abc"[0]</code>).
          В Swift строки индексируются через <code>String.Index</code>, потому что символы имеют переменную длину в Unicode.
          Это неудобнее, но корректнее.
        </div>
      </section>

      {/* ─── Type Aliases ─── */}
      <section className="card">
        <h2>🏷️ Type Aliases</h2>
        <p>
          Позволяют создать альтернативное имя для существующего типа — как <code>type</code> в TypeScript.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Swift
typealias UserID = Int
typealias Coordinate = (x: Double, y: Double)
typealias Handler = (String) -> Void

let id: UserID = 42
let point: Coordinate = (x: 3.0, y: 4.0)
let callback: Handler = { message in
    print(message)
}

// TypeScript эквивалент:
// type UserID = number
// type Coordinate = { x: number; y: number }
// type Handler = (message: string) => void
`} />
        </div>
      </section>

      {/* ─── Tuples ─── */}
      <section className="card">
        <h2>📦 Tuples — кортежи</h2>
        <p>
          Кортежи группируют несколько значений в одно составное значение.
          В JS ближайший аналог — массив с фиксированной структурой или объект,
          в TS — tuple type <code>[string, number]</code>.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Простой кортеж
let point = (3, 5)
print(point.0)          // 3
print(point.1)          // 5

// Именованные элементы
let user = (name: "Анна", age: 25)
print(user.name)        // "Анна"
print(user.age)         // 25

// Декомпозиция (destructuring)
let (name, age) = user
print(name)             // "Анна"

// Игнорирование значений
let (userName, _) = user   // _ — игнорируем age

// Кортежи для возврата нескольких значений из функции
func getMinMax(array: [Int]) -> (min: Int, max: Int) {
    var min = array[0]
    var max = array[0]
    for value in array {
        if value < min { min = value }
        if value > max { max = value }
    }
    return (min, max)
}

let result = getMinMax(array: [3, 1, 7, 2])
print("Min: \\(result.min), Max: \\(result.max)")
`} />
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift Tuple</h3>
            <CodeBlock language="swift" code={`
let http = (code: 200, message: "OK")
print(http.code)      // 200
print(http.message)   // "OK"
`} />
          </div>
          <div className="feature-card">
            <h3>TS Tuple / Object</h3>
            <CodeBlock language="swift" code={`
// TS tuple:
// const http: [number, string] = [200, "OK"]
// http[0]  // 200

// Или объект:
// const http = { code: 200, message: "OK" }
// http.code  // 200
`} />
          </div>
        </div>
      </section>

      {/* ─── Сравнительная таблица ─── */}
      <section className="card">
        <h2>⚖️ JS vs Swift — сводная таблица</h2>

        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>Концепция</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>JavaScript</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>Swift</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Константа', 'const (не глубокая)', 'let (полная иммутабельность для value types)'],
              ['Переменная', 'let', 'var'],
              ['Вывод типов', 'Нет (TS: есть)', 'Да, встроено в язык'],
              ['Числовые типы', 'number (один тип)', 'Int, Double, Float, UInt и другие'],
              ['Null/Undefined', 'null, undefined', 'nil (только через Optional)'],
              ['Интерполяция', '`Hello ${name}`', '"Hello \\(name)"'],
              ['Многострочные строки', 'Backticks ``', 'Тройные кавычки """'],
              ['Type alias', 'type Name = string', 'typealias Name = String'],
              ['Кортежи', '[a, b] или { a, b }', '(a: val1, b: val2)'],
            ].map(([concept, js, swift]) => (
              <tr key={concept}>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)', fontWeight: 600 }}>{concept}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)' }}><code>{js}</code></td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)' }}><code>{swift}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ─── Числовые литералы ─── */}
      <section className="card">
        <h2>🔢 Числовые литералы и преобразования</h2>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Разные системы счисления
let decimal = 17           // десятичная
let binary = 0b10001       // двоичная
let octal = 0o21           // восьмеричная
let hex = 0x11             // шестнадцатеричная
// Все равны 17

// Подчёркивания для читаемости
let million = 1_000_000
let creditCard = 1234_5678_9012_3456

// Явные преобразования
let intVal: Int = 42
let doubleVal: Double = Double(intVal)   // Int → Double
let stringVal: String = String(intVal)   // Int → String "42"
let backToInt: Int? = Int("42")          // String → Int? (Optional!)

// В JS: Number("42"), String(42) — но без type safety
`} />
        </div>

        <div className="info-box">
          <strong>🔄 Преобразование String → Int:</strong> В Swift <code>Int("abc")</code> возвращает
          <code> nil</code> (Optional), а не <code>NaN</code> как в JS. Это гораздо безопаснее —
          вы обязаны обработать случай неудачного парсинга.
        </div>
      </section>
    </div>
  )
}
