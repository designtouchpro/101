import CodeBlock from '../components/CodeBlock'

export default function FunctionsPage() {
  return (
    <div className="page-content">
      <h1>⚡ Функции</h1>
      <p>
        Функции — фундаментальный строительный блок любого Swift-приложения.
        Если вы пришли из JavaScript/TypeScript, многое покажется знакомым,
        но Swift добавляет именованные параметры, перегрузку, <code>inout</code>,
        вложенные функции и множество других мощных возможностей.
        Давайте разберём всё по порядку.
      </p>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 1. Основы функций ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>📖 1. Основы функций</h2>
        <p>
          Функции в Swift объявляются ключевым словом <code>func</code>.
          Каждый параметр имеет <strong>имя</strong> и <strong>тип</strong>,
          а возвращаемый тип указывается через стрелку <code>-&gt;</code>.
          В отличие от JavaScript, Swift <em>требует</em> явного указания типов параметров.
        </p>

        <h3>Простейшая функция</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Функция без параметров и без возвращаемого значения
func sayHello() {
    print("Привет, мир!")
}
sayHello()  // "Привет, мир!"

// Функция с параметром
func greet(name: String) {
    print("Привет, \\(name)!")
}
greet(name: "Анна")  // "Привет, Анна!"

// Функция с возвращаемым значением
func square(number: Int) -> Int {
    return number * number
}
let result = square(number: 5)  // 25

// Если тело — одно выражение, return можно опустить (implicit return)
func cube(number: Int) -> Int {
    number * number * number
}
print(cube(number: 3))  // 27
`} />
        </div>

        <h3>🔄 В JavaScript</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// JS: типы не обязательны (без TypeScript)
function sayHello() {
    console.log("Привет, мир!")
}

function greet(name) {
    console.log(\`Привет, \${name}!\`)
}
greet("Анна")  // Без имени параметра при вызове!

// TypeScript добавляет типы, но без именованных параметров
function square(number: number): number {
    return number * number
}
square(5)  // Просто передаём значение, без метки
`} />
        </div>

        {/* ─── Visual Diagram: Anatomy of a Swift function ─── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
          padding: '1.5rem', borderRadius: '12px',
          background: 'var(--bg-card)', border: '2px solid var(--border-color)',
          margin: '1.5rem 0', fontFamily: 'monospace', fontSize: '0.85rem',
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', fontFamily: 'inherit', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            🔬 Анатомия функции Swift
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.3rem', justifyContent: 'center' }}>
            <span style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', background: '#a855f733', border: '1px solid #a855f7', color: 'var(--text-primary)' }}>func</span>
            <span style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', background: '#3b82f633', border: '1px solid #3b82f6', color: 'var(--text-primary)' }}>greet</span>
            <span style={{ color: 'var(--text-secondary)' }}>(</span>
            <span style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', background: '#f59e0b33', border: '1px solid #f59e0b', color: 'var(--text-primary)' }}>name</span>
            <span style={{ color: 'var(--text-secondary)' }}>:</span>
            <span style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', background: '#10b98133', border: '1px solid #10b981', color: 'var(--text-primary)' }}>String</span>
            <span style={{ color: 'var(--text-secondary)' }}>)</span>
            <span style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', background: '#ef444433', border: '1px solid #ef4444', color: 'var(--text-primary)' }}>-&gt; String</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            <span>↑ <span style={{ color: '#a855f7' }}>ключевое слово</span></span>
            <span>↑ <span style={{ color: '#3b82f6' }}>имя функции</span></span>
            <span>↑ <span style={{ color: '#f59e0b' }}>параметр</span></span>
            <span>↑ <span style={{ color: '#10b981' }}>тип параметра</span></span>
            <span>↑ <span style={{ color: '#ef4444' }}>возвращаемый тип</span></span>
          </div>
        </div>

        <h3>Множественные параметры и возврат кортежа</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Несколько параметров
func add(a: Int, b: Int) -> Int {
    a + b
}
print(add(a: 3, b: 7))  // 10

// Возврат кортежа (tuple) — как вернуть несколько значений
func minMax(array: [Int]) -> (min: Int, max: Int)? {
    guard let first = array.first else { return nil }
    var currentMin = first
    var currentMax = first
    for value in array {
        if value < currentMin { currentMin = value }
        if value > currentMax { currentMax = value }
    }
    return (min: currentMin, max: currentMax)
}

if let bounds = minMax(array: [3, -1, 7, 42, 0]) {
    print("Мин: \\(bounds.min), Макс: \\(bounds.max)")
    // "Мин: -1, Макс: 42"
}
`} />
        </div>

        <div className="info-box">
          <strong>💡 Совет:</strong> В Swift функция без явного <code>-&gt;</code> возвращает <code>Void</code>
          (он же <code>()</code> — пустой кортеж). Это аналог <code>void</code> в TypeScript.
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 2. Argument Labels vs Parameter Names ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🏷️ 2. Argument Labels vs Parameter Names</h2>
        <p>
          Одна из самых уникальных особенностей Swift — каждый параметр может иметь <strong>два имени</strong>:
          <em> argument label</em> (используется при вызове) и <em>parameter name</em> (используется внутри тела функции).
          Это наследие Objective-C, которое делает код читаемым как предложение на английском языке.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// argument label: "from", parameter name: "hometown"
func greet(person: String, from hometown: String) -> String {
    return "Привет, \\(person)! Рад, что ты из \\(hometown)."
}

// При вызове используем argument label "from"
print(greet(person: "Анна", from: "Москва"))
// "Привет, Анна! Рад, что ты из Москва."


// Argument label и parameter name совпадают (по умолчанию)
func move(to destination: String) {
    print("Двигаемся к \\(destination)")
}
move(to: "аэропорт")  // Читается как фраза: "move to аэропорт"


// Без argument label — используем underscore _
func multiply(_ a: Int, _ b: Int) -> Int {
    return a * b
}
print(multiply(4, 5))  // 20 — вызов без меток, как в JS!


// Ещё пример: «отправить сообщение кому-то»
func send(_ message: String, to recipient: String) {
    print("📨 [\\(recipient)]: \\(message)")
}
send("Привет!", to: "Борис")  // send "Привет!" to "Борис"
`} />
        </div>

        {/* ─── Visual Diagram: Call site vs Definition ─── */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '1rem',
          padding: '1.5rem', borderRadius: '12px',
          background: 'var(--bg-card)', border: '2px solid var(--border-color)',
          margin: '1.5rem 0', fontFamily: 'monospace', fontSize: '0.85rem',
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', fontFamily: 'inherit', textAlign: 'center', color: 'var(--text-primary)' }}>
            📐 Определение vs Вызов
          </div>

          {/* Definition */}
          <div style={{
            border: '2px solid #3b82f6', borderRadius: '12px', padding: '1rem',
            background: '#3b82f611',
          }}>
            <div style={{ fontWeight: 700, color: '#3b82f6', marginBottom: '0.5rem' }}>📝 Определение (Definition)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem' }}>
              <span>func greet(</span>
              <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: '#f59e0b33', border: '1px solid #f59e0b' }}>person</span>
              <span>: String,</span>
              <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: '#10b98133', border: '1px solid #10b981' }}>from</span>
              <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: '#a855f733', border: '1px solid #a855f7' }}>hometown</span>
              <span>: String)</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <span><span style={{ color: '#f59e0b' }}>■</span> argument label = parameter name</span>
              <span><span style={{ color: '#10b981' }}>■</span> argument label (внешнее имя)</span>
              <span><span style={{ color: '#a855f7' }}>■</span> parameter name (внутреннее имя)</span>
            </div>
          </div>

          {/* Call site */}
          <div style={{
            border: '2px solid #ef4444', borderRadius: '12px', padding: '1rem',
            background: '#ef444411',
          }}>
            <div style={{ fontWeight: 700, color: '#ef4444', marginBottom: '0.5rem' }}>📞 Вызов (Call site)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem' }}>
              <span>greet(</span>
              <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: '#f59e0b33', border: '1px solid #f59e0b' }}>person</span>
              <span>: "Анна",</span>
              <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: '#10b98133', border: '1px solid #10b981' }}>from</span>
              <span>: "Москва")</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Видны только <strong>argument labels</strong> — внутренние имена скрыты от вызывающего кода
            </div>
          </div>

          {/* Inside body */}
          <div style={{
            border: '2px solid #a855f7', borderRadius: '12px', padding: '1rem',
            background: '#a855f711',
          }}>
            <div style={{ fontWeight: 700, color: '#a855f7', marginBottom: '0.5rem' }}>🔧 Внутри тела функции</div>
            <div>
              {'print("\\('}
              <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: '#f59e0b33', border: '1px solid #f59e0b' }}>person</span>
              {') из \\('}
              <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: '#a855f733', border: '1px solid #a855f7' }}>hometown</span>
              {')")'}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Используются <strong>parameter names</strong> — <code>person</code> и <code>hometown</code> (не <code>from</code>!)
            </div>
          </div>
        </div>

        <h3>🔄 В JavaScript</h3>
        <p>
          В JS нет встроенных argument labels. Ближайший аналог — деструктуризация объекта:
        </p>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// JavaScript: нет именованных параметров
function greet(person, hometown) {
    return \`Привет, \${person}! Рад, что ты из \${hometown}.\`
}
greet("Анна", "Москва")  // Порядок важен, метки отсутствуют

// Паттерн "объект как параметр" — имитация именованных параметров
function greetNamed({ person, from: hometown }) {
    return \`Привет, \${person}! Рад, что ты из \${hometown}.\`
}
greetNamed({ person: "Анна", from: "Москва" })
// Порядок не важен, но это обычный объект, а не языковая фича
`} />
        </div>

        <div className="info-box">
          <strong>🎯 Зачем argument labels?</strong> Они делают вызов функции читаемым как фразу:
          <code>move(to: "дом")</code>, <code>send("hello", to: "Борис")</code>,
          <code>remove(at: 3)</code>. Это одна из причин, почему Swift-код часто выглядит как псевдокод.
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 3. Default Values & Variadic Parameters ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🎛️ 3. Значения по умолчанию и вариативные параметры</h2>
        <p>
          Как и в JavaScript/TypeScript, параметры Swift-функций могут иметь значения по умолчанию.
          А вариативные параметры (<code>...</code>) позволяют передавать произвольное количество аргументов.
        </p>

        <h3>Значения по умолчанию</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Параметр с значением по умолчанию
func greet(name: String, greeting: String = "Привет") -> String {
    return "\\(greeting), \\(name)!"
}

print(greet(name: "Анна"))                    // "Привет, Анна!"
print(greet(name: "Борис", greeting: "Здравствуй"))  // "Здравствуй, Борис!"

// Практический пример: HTTP-запрос
func request(
    url: String,
    method: String = "GET",
    timeout: Int = 30,
    headers: [String: String] = [:]
) {
    print("\\(method) \\(url) [timeout: \\(timeout)s, headers: \\(headers.count)]")
}

request(url: "https://api.example.com/users")
// "GET https://api.example.com/users [timeout: 30s, headers: 0]"

request(url: "https://api.example.com/users", method: "POST", timeout: 60)
// "POST https://api.example.com/users [timeout: 60s, headers: 0]"
`} />
        </div>

        <h3>Вариативные параметры (Variadic)</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Variadic параметр — принимает 0 или более значений
func sum(_ values: Int...) -> Int {
    var total = 0
    for value in values {
        total += value
    }
    return total
}

print(sum(1, 2, 3))        // 6
print(sum(10, 20, 30, 40))  // 100
print(sum())                 // 0

// Variadic + обычные параметры
func average(of values: Double..., roundTo decimals: Int = 2) -> Double {
    guard !values.isEmpty else { return 0 }
    let sum = values.reduce(0, +)
    let avg = sum / Double(values.count)
    let multiplier = pow(10.0, Double(decimals))
    return (avg * multiplier).rounded() / multiplier
}

print(average(of: 1.5, 2.7, 3.3))           // 2.5
print(average(of: 1.5, 2.7, 3.3, roundTo: 1))  // 2.5

// С Swift 5.4+ можно иметь несколько variadic-параметров!
func compare(_ first: Int..., with second: Int...) {
    print("Первые: \\(first), Вторые: \\(second)")
}
compare(1, 2, 3, with: 4, 5, 6)
// "Первые: [1, 2, 3], Вторые: [4, 5, 6]"
`} />
        </div>

        <h3>🔄 В JavaScript</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// JS: значения по умолчанию (очень похоже)
function greet(name, greeting = "Привет") {
    return \`\${greeting}, \${name}!\`
}

// JS: rest parameters (аналог variadic)
function sum(...values) {
    return values.reduce((a, b) => a + b, 0)
}
sum(1, 2, 3)  // 6

// TypeScript с типами
function sum(...values: number[]): number {
    return values.reduce((a, b) => a + b, 0)
}
`} />
        </div>

        {/* ─── Visual comparison ─── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
          padding: '1.5rem', borderRadius: '12px',
          background: 'var(--bg-card)', border: '2px solid var(--border-color)',
          margin: '1.5rem 0', fontFamily: 'monospace', fontSize: '0.82rem',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: '#f59e0b', marginBottom: '0.5rem' }}>Swift Variadic</div>
            <div style={{ padding: '0.5rem', borderRadius: '8px', background: '#f59e0b11', border: '1px solid #f59e0b' }}>
              func sum(<strong>_ values: Int...</strong>)
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
              values — это <code>[Int]</code> внутри функции
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: '#3b82f6', marginBottom: '0.5rem' }}>JS Rest Params</div>
            <div style={{ padding: '0.5rem', borderRadius: '8px', background: '#3b82f611', border: '1px solid #3b82f6' }}>
              function sum(<strong>...values</strong>)
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
              values — это <code>Array</code> внутри функции
            </div>
          </div>
        </div>

        <div className="info-box">
          <strong>⚠️ Отличие:</strong> В JS rest-параметр всегда должен быть последним.
          В Swift 5.4+ можно иметь несколько variadic-параметров, разделённых обязательными
          именованными параметрами.
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 4. inout Parameters ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🔀 4. inout Параметры</h2>
        <p>
          По умолчанию параметры функции — <strong>константы</strong> (как <code>let</code>).
          Изменить их внутри функции нельзя. Но с ключевым словом <code>inout</code> вы можете
          модифицировать переменную <em>напрямую</em> — изменения сохранятся после выхода из функции.
          При вызове нужно поставить <code>&amp;</code> перед аргументом.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Без inout — ошибка компиляции
func tryToDouble(value: Int) {
    // value *= 2  // ❌ Error: left side of mutating operator isn't mutable
}

// С inout — модификация оригинала
func double(_ value: inout Int) {
    value *= 2
}

var myNumber = 5
double(&myNumber)       // Обязательно ставим &
print(myNumber)         // 10 — значение изменилось!


// Практический пример: swap
func swapValues(_ a: inout Int, _ b: inout Int) {
    let temp = a
    a = b
    b = temp
}

var x = 10, y = 20
swapValues(&x, &y)
print("x = \\(x), y = \\(y)")  // "x = 20, y = 10"
// Кстати, в Swift есть встроенная swap(&x, &y) !


// inout с коллекциями
func appendGreeting(to array: inout [String], name: String) {
    array.append("Привет, \\(name)!")
}

var greetings: [String] = []
appendGreeting(to: &greetings, name: "Анна")
appendGreeting(to: &greetings, name: "Борис")
print(greetings)  // ["Привет, Анна!", "Привет, Борис!"]
`} />
        </div>

        {/* ─── Visual Diagram: inout mechanism ─── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
          padding: '1.5rem', borderRadius: '12px',
          background: 'var(--bg-card)', border: '2px solid var(--border-color)',
          margin: '1.5rem 0', fontFamily: 'monospace', fontSize: '0.85rem',
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', fontFamily: 'inherit', color: 'var(--text-primary)' }}>
            🔀 Как работает inout (copy-in copy-out)
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Variable box */}
            <div style={{
              border: '2px solid #3b82f6', borderRadius: '12px', padding: '1rem 1.5rem',
              background: '#3b82f611', textAlign: 'center', minWidth: '140px',
            }}>
              <div style={{ fontWeight: 700, color: '#3b82f6', marginBottom: '0.3rem' }}>📦 Переменная</div>
              <div>var x = 5</div>
            </div>

            {/* Arrow right */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '1.5rem' }}>──→</div>
              <div style={{ fontSize: '0.7rem' }}>① копия внутрь</div>
            </div>

            {/* Function box */}
            <div style={{
              border: '2px solid #ef4444', borderRadius: '12px', padding: '1rem 1.5rem',
              background: '#ef444411', textAlign: 'center', minWidth: '160px',
            }}>
              <div style={{ fontWeight: 700, color: '#ef4444', marginBottom: '0.3rem' }}>⚙️ func(inout)</div>
              <div>value *= 2</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>value = 10</div>
            </div>
          </div>

          {/* Arrow back */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{
              border: '2px solid #10b981', borderRadius: '12px', padding: '1rem 1.5rem',
              background: '#10b98111', textAlign: 'center', minWidth: '140px',
            }}>
              <div style={{ fontWeight: 700, color: '#10b981', marginBottom: '0.3rem' }}>✅ Результат</div>
              <div>x = 10</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '1.5rem' }}>←──</div>
              <div style={{ fontSize: '0.7rem' }}>② копия обратно</div>
            </div>

            <div style={{
              border: '2px dashed var(--border-color)', borderRadius: '12px', padding: '1rem 1.5rem',
              textAlign: 'center', minWidth: '160px', color: 'var(--text-secondary)',
            }}>
              <div style={{ marginBottom: '0.3rem' }}>⚙️ Функция завершена</div>
              <div style={{ fontSize: '0.75rem' }}>Локальная копия удалена</div>
            </div>
          </div>

          <div style={{
            fontSize: '0.78rem', color: 'var(--text-secondary)', textAlign: 'center',
            maxWidth: '500px', lineHeight: '1.5',
          }}>
            <strong>Важно:</strong> inout работает по принципу «copy-in copy-out».
            Значение копируется в функцию, модифицируется, затем копируется обратно.
            Компилятор может оптимизировать это до передачи по ссылке.
          </div>
        </div>

        <h3>🔄 В JavaScript</h3>
        <p>
          В JS примитивы всегда передаются по значению, а объекты — по ссылке.
          Прямого аналога <code>inout</code> нет:
        </p>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// JS: примитивы — по значению (нельзя изменить снаружи)
function tryDouble(value) {
    value *= 2  // Локальная копия
}
let num = 5
tryDouble(num)
console.log(num)  // 5 — не изменилось!

// JS: объекты — по ссылке (можно мутировать)
function doubleFirst(arr) {
    arr[0] *= 2
}
const nums = [5, 10]
doubleFirst(nums)
console.log(nums)  // [10, 10] — мутировали оригинал

// Чтобы "вернуть" изменение примитива, нужно возвращать значение:
function doubled(value) { return value * 2 }
let result = doubled(5)  // 10
`} />
        </div>

        <div className="info-box">
          <strong>⚠️ Ограничения inout:</strong>
          <ul className="info-list">
            <li>Нельзя передавать константу (<code>let</code>) — только <code>var</code></li>
            <li>Нельзя передавать литерал: <code>double(&5)</code> — ошибка</li>
            <li>inout параметры не могут иметь значение по умолчанию</li>
            <li>Variadic параметры не могут быть <code>inout</code></li>
          </ul>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 5. Functions as First-Class Citizens ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🎭 5. Функции как объекты первого класса</h2>
        <p>
          Как и в JavaScript, функции в Swift — <strong>first-class citizens</strong>.
          Их можно присваивать переменным, передавать как аргументы, возвращать из других функций.
          Каждая функция имеет <em>тип</em>, описываемый типами параметров и возвращаемого значения.
        </p>

        <h3>Типы функций</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Тип функции: (параметры) -> возвращаемый_тип
func add(_ a: Int, _ b: Int) -> Int { a + b }
func multiply(_ a: Int, _ b: Int) -> Int { a * b }

// Обе функции имеют тип (Int, Int) -> Int
// Можно присвоить переменной:
var operation: (Int, Int) -> Int = add
print(operation(3, 4))  // 7

operation = multiply
print(operation(3, 4))  // 12


// Тип функции без параметров и без возвращаемого значения: () -> Void
func sayHi() { print("Привет!") }
let action: () -> Void = sayHi
action()  // "Привет!"
`} />
        </div>

        <h3>Функции как параметры</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Передаём функцию как параметр (Higher-Order Function)
func applyOperation(_ a: Int, _ b: Int, operation: (Int, Int) -> Int) -> Int {
    return operation(a, b)
}

func add(_ a: Int, _ b: Int) -> Int { a + b }
func subtract(_ a: Int, _ b: Int) -> Int { a - b }

print(applyOperation(10, 3, operation: add))       // 13
print(applyOperation(10, 3, operation: subtract))   // 7


// Массив функций
let operations: [(Int, Int) -> Int] = [
    { $0 + $1 },   // сложение
    { $0 - $1 },   // вычитание
    { $0 * $1 },   // умножение
]

for op in operations {
    print(op(6, 3))  // 9, 3, 18
}
`} />
        </div>

        <h3>Функция как возвращаемое значение</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Функция-фабрика: возвращает другую функцию
func makeMultiplier(factor: Int) -> (Int) -> Int {
    func multiplier(value: Int) -> Int {
        return value * factor
    }
    return multiplier
}

let double = makeMultiplier(factor: 2)
let triple = makeMultiplier(factor: 3)

print(double(5))   // 10
print(triple(5))   // 15


// Упрощённо с замыканием
func makeAdder(base: Int) -> (Int) -> Int {
    return { number in base + number }
}

let addTen = makeAdder(base: 10)
print(addTen(5))   // 15
print(addTen(20))  // 30
`} />
        </div>

        <h3>🔄 В JavaScript</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// JS: функции — тоже first-class citizens
const add = (a, b) => a + b
const subtract = (a, b) => a - b

function applyOperation(a, b, operation) {
    return operation(a, b)
}

console.log(applyOperation(10, 3, add))  // 13

// Фабрика функций
function makeMultiplier(factor) {
    return (value) => value * factor
}
const double = makeMultiplier(2)
console.log(double(5))  // 10

// Главное отличие: в TS можно описать тип функции
// type Operation = (a: number, b: number) => number
// В Swift тип записывается как: (Int, Int) -> Int
`} />
        </div>

        {/* ─── Visual: Function types ─── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
          padding: '1.5rem', borderRadius: '12px',
          background: 'var(--bg-card)', border: '2px solid var(--border-color)',
          margin: '1.5rem 0', fontFamily: 'monospace', fontSize: '0.82rem',
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', fontFamily: 'inherit', color: 'var(--text-primary)' }}>
            📋 Типы функций в Swift
          </div>
          {[
            { sig: '() -> Void', desc: 'Без параметров, ничего не возвращает' },
            { sig: '(Int) -> Int', desc: 'Один Int, возвращает Int' },
            { sig: '(Int, Int) -> Int', desc: 'Два Int, возвращает Int' },
            { sig: '(String) -> Bool', desc: 'String, возвращает Bool' },
            { sig: '() -> (Int) -> Int', desc: 'Без параметров, возвращает функцию' },
            { sig: '((Int) -> Int, Int) -> Int', desc: 'Принимает функцию и Int' },
          ].map(({ sig, desc }) => (
            <div key={sig} style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              width: '100%', maxWidth: '550px',
            }}>
              <span style={{
                padding: '0.3rem 0.7rem', borderRadius: '6px',
                background: 'var(--accent-blue, #3b82f6)' + '22',
                border: '1px solid var(--accent-blue, #3b82f6)',
                whiteSpace: 'nowrap', flexShrink: 0, minWidth: '200px', textAlign: 'center',
              }}>
                {sig}
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 6. Nested Functions ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🪆 6. Вложенные функции</h2>
        <p>
          В Swift функции можно объявлять <em>внутри</em> других функций.
          Вложенные функции скрыты от внешнего мира и имеют доступ к переменным
          окружающей функции (замыкание). Это отличный способ инкапсулировать
          вспомогательную логику.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Вложенная функция для выбора направления
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    func stepForward(_ input: Int) -> Int { input + 1 }
    func stepBackward(_ input: Int) -> Int { input - 1 }

    return backward ? stepBackward : stepForward
}

var currentValue = 3
let moveToZero = chooseStepFunction(backward: currentValue > 0)

while currentValue != 0 {
    print("\\(currentValue)... ", terminator: "")
    currentValue = moveToZero(currentValue)
}
print("🎯 Ноль!")
// "3... 2... 1... 🎯 Ноль!"
`} />
        </div>

        <h3>Захват переменных (Capture)</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Вложенная функция захватывает переменные окружения
func makeCounter(startingAt start: Int = 0) -> () -> Int {
    var count = start

    func increment() -> Int {
        count += 1       // Захватывает и модифицирует count
        return count
    }

    return increment
}

let counter = makeCounter()
print(counter())  // 1
print(counter())  // 2
print(counter())  // 3

let counterFrom10 = makeCounter(startingAt: 10)
print(counterFrom10())  // 11
print(counterFrom10())  // 12

// Каждый вызов makeCounter создаёт свой独立 count!
print(counter())  // 4 — свой собственный count
`} />
        </div>

        <h3>Вложенные функции для структурирования логики</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Сложная функция разбита на вложенные helper-функции
func processUserData(name: String, age: Int, email: String) -> String {
    // Вложенные валидаторы — скрыты от внешнего мира
    func validateName() -> Bool {
        !name.isEmpty && name.count >= 2
    }

    func validateAge() -> Bool {
        age >= 0 && age <= 150
    }

    func validateEmail() -> Bool {
        email.contains("@") && email.contains(".")
    }

    func formatOutput() -> String {
        "✅ \\(name) (\\(age)) — \\(email)"
    }

    // Основная логика
    guard validateName() else { return "❌ Некорректное имя" }
    guard validateAge() else { return "❌ Некорректный возраст" }
    guard validateEmail() else { return "❌ Некорректный email" }

    return formatOutput()
}

print(processUserData(name: "Анна", age: 25, email: "anna@mail.ru"))
// "✅ Анна (25) — anna@mail.ru"

print(processUserData(name: "", age: 25, email: "anna@mail.ru"))
// "❌ Некорректное имя"
`} />
        </div>

        <h3>🔄 В JavaScript</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// JS: вложенные функции работают так же
function makeCounter(startingAt = 0) {
    let count = startingAt

    function increment() {
        count += 1       // Захватывает count через замыкание
        return count
    }

    return increment
}

const counter = makeCounter()
console.log(counter())  // 1
console.log(counter())  // 2

// В JS это классический паттерн замыкания (closure)
// Разница: в Swift вложенные функции — полноценная фича языка
// с явным типом, а не просто паттерн
`} />
        </div>

        <div className="info-box">
          <strong>💡 Когда использовать вложенные функции?</strong>
          <ul className="info-list">
            <li>Helper-логика, не нужная за пределами функции</li>
            <li>Разбиение сложной функции на читаемые части</li>
            <li>Фабрики функций (возврат настроенной функции)</li>
            <li>Рекурсия с сохранением состояния</li>
          </ul>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 7. @discardableResult ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🗑️ 7. @discardableResult</h2>
        <p>
          Если функция возвращает значение, но вы его не используете, Swift покажет warning:
          <em>"Result of call is unused"</em>. Атрибут <code>@discardableResult</code> говорит
          компилятору, что игнорировать результат — это нормально.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Без @discardableResult — будет warning
func add(_ a: Int, _ b: Int) -> Int {
    return a + b
}
add(3, 5)  // ⚠️ Warning: Result of call to 'add(_:_:)' is unused

// Подавление warning вручную
_ = add(3, 5)  // OK — явно игнорируем результат


// С @discardableResult — warning не будет
@discardableResult
func insert(item: String, into array: inout [String]) -> Int {
    array.append(item)
    return array.count
}

var items: [String] = []
insert(item: "Яблоко", into: &items)  // Результат (count) можно игнорировать
let count = insert(item: "Банан", into: &items)  // Или использовать
print(count)  // 2
`} />
        </div>

        <h3>Практические примеры</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Builder-паттерн — часто используют @discardableResult
class QueryBuilder {
    private var conditions: [String] = []
    private var table = ""

    @discardableResult
    func from(_ table: String) -> QueryBuilder {
        self.table = table
        return self  // Возвращаем self для chaining
    }

    @discardableResult
    func where_(_ condition: String) -> QueryBuilder {
        conditions.append(condition)
        return self
    }

    func build() -> String {
        let whereClause = conditions.isEmpty
            ? ""
            : " WHERE " + conditions.joined(separator: " AND ")
        return "SELECT * FROM \\(table)\\(whereClause)"
    }
}

// Используем chaining — результат промежуточных вызовов не нужен
let query = QueryBuilder()
    .from("users")
    .where_("age > 18")
    .where_("active = true")
    .build()

print(query)
// "SELECT * FROM users WHERE age > 18 AND active = true"


// Стандартная библиотека: Array.append тоже @discardableResult нет,
// но Array.remove(at:) возвращает removed элемент
var fruits = ["🍎", "🍌", "🍊"]
let removed = fruits.remove(at: 1)  // "🍌"
fruits.remove(at: 0)  // ⚠️ Warning без @discardableResult, 
                       // но remove(at:) НЕ помечен — значит warning есть
`} />
        </div>

        <h3>🔄 В JavaScript</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// В JS нет аналога @discardableResult
// Игнорирование результата — обычное дело, никаких предупреждений
[1, 2, 3].map(x => x * 2)  // Результат просто теряется — OK
"hello".toUpperCase()       // Никакого warning

// В TypeScript есть линтер-правило:
// @typescript-eslint/no-unused-expressions
// Но это не встроено в язык, а работает через ESLint
`} />
        </div>

        <div className="info-box">
          <strong>📏 Правило:</strong> Используйте <code>@discardableResult</code>, если:<br />
          — Основная цель функции — побочный эффект (добавить, удалить, модифицировать)<br />
          — Возвращаемое значение — бонусная информация (count, removed element, self для chaining)
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 8. Function Overloading ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🔄 8. Перегрузка функций (Overloading)</h2>
        <p>
          В Swift можно создать несколько функций с <strong>одинаковым именем</strong>,
          но <strong>разными типами параметров</strong>, их количеством или
          разными argument labels. Компилятор выберет правильную версию на основе типов.
          В JavaScript/TypeScript это <em>невозможно</em> на уровне рантайма.
        </p>

        <h3>Перегрузка по типу параметров</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Одно имя, разные типы параметров
func format(_ value: Int) -> String {
    return "Число: \\(value)"
}

func format(_ value: Double) -> String {
    return "Дробное: \\(String(format: "%.2f", value))"
}

func format(_ value: String) -> String {
    return "Текст: «\\(value)»"
}

func format(_ value: Bool) -> String {
    return value ? "✅ Да" : "❌ Нет"
}

// Компилятор выбирает правильную версию!
print(format(42))           // "Число: 42"
print(format(3.14))         // "Дробное: 3.14"
print(format("Привет"))     // "Текст: «Привет»"
print(format(true))         // "✅ Да"
`} />
        </div>

        <h3>Перегрузка по argument labels</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Разные argument labels = разные функции
func find(byId id: Int) -> String {
    return "Пользователь #\\(id)"
}

func find(byName name: String) -> String {
    return "Пользователь: \\(name)"
}

func find(byEmail email: String) -> String {
    return "Пользователь с email: \\(email)"
}

print(find(byId: 42))                  // "Пользователь #42"
print(find(byName: "Анна"))            // "Пользователь: Анна"
print(find(byEmail: "anna@mail.ru"))   // "Пользователь с email: anna@mail.ru"
`} />
        </div>

        <h3>Перегрузка по количеству параметров</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
func log(_ message: String) {
    print("[LOG] \\(message)")
}

func log(_ message: String, level: String) {
    print("[\\(level.uppercased())] \\(message)")
}

func log(_ message: String, level: String, file: String) {
    print("[\\(level.uppercased())] \\(file): \\(message)")
}

log("Запуск")                                // "[LOG] Запуск"
log("Подключение", level: "info")            // "[INFO] Подключение"
log("Ошибка", level: "error", file: "App")   // "[ERROR] App: Ошибка"
`} />
        </div>

        <h3>Перегрузка по возвращаемому типу</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Swift даже позволяет перегрузку по return type!
func parse(_ text: String) -> Int? {
    return Int(text)
}

func parse(_ text: String) -> Double? {
    return Double(text)
}

// Нужно явно указать тип, чтобы компилятор знал какую выбрать
let intValue: Int? = parse("42")        // Вызовет Int-версию
let doubleValue: Double? = parse("42")  // Вызовет Double-версию

print(intValue)     // Optional(42)
print(doubleValue)  // Optional(42.0)
`} />
        </div>

        <h3>🔄 В JavaScript / TypeScript</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// JS: перегрузка невозможна! Последнее определение перезаписывает предыдущее
function format(value) { return \`Число: \${value}\` }
function format(value) { return \`Текст: \${value}\` }  // ← перезаписало!
format(42)  // "Текст: 42" — первая версия потеряна

// TypeScript: перегрузка только на уровне типов (overload signatures)
// Реализация — одна!
function format(value: number): string
function format(value: string): string
function format(value: number | string): string {
    if (typeof value === "number") return \`Число: \${value}\`
    return \`Текст: \${value}\`
}
// Это НЕ настоящая перегрузка — нужен ручной typeof/instanceof внутри
`} />
        </div>

        {/* ─── Visual: Overloading resolution ─── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
          padding: '1.5rem', borderRadius: '12px',
          background: 'var(--bg-card)', border: '2px solid var(--border-color)',
          margin: '1.5rem 0', fontFamily: 'monospace', fontSize: '0.82rem',
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', fontFamily: 'inherit', color: 'var(--text-primary)' }}>
            🎯 Как компилятор выбирает перегрузку
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{
              border: '2px solid #f59e0b', borderRadius: '12px', padding: '0.75rem',
              background: '#f59e0b11', textAlign: 'center',
            }}>
              format(42)
            </div>
            <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>→</span>
            <div style={{
              border: '2px solid var(--border-color)', borderRadius: '12px', padding: '0.75rem',
              textAlign: 'center',
            }}>
              <div style={{ fontWeight: 700, marginBottom: '0.3rem', color: 'var(--text-primary)' }}>Swift Compiler</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>42 → Int → ищет format(Int)</div>
            </div>
            <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>→</span>
            <div style={{
              border: '2px solid #10b981', borderRadius: '12px', padding: '0.75rem',
              background: '#10b98111', textAlign: 'center',
            }}>
              <div style={{ color: '#10b981', fontWeight: 700 }}>✅</div>
              format(_ value: <strong>Int</strong>)
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
            {[
              { fn: 'format(_ : Int)', color: '#10b981', active: true },
              { fn: 'format(_ : Double)', color: '#ef4444', active: false },
              { fn: 'format(_ : String)', color: '#ef4444', active: false },
              { fn: 'format(_ : Bool)', color: '#ef4444', active: false },
            ].map(({ fn, color, active }) => (
              <div key={fn} style={{
                padding: '0.3rem 0.6rem', borderRadius: '6px',
                background: active ? color + '22' : 'transparent',
                border: `1px solid ${color}`,
                opacity: active ? 1 : 0.4,
                color: 'var(--text-primary)',
              }}>
                {fn}
              </div>
            ))}
          </div>
        </div>

        <div className="info-box">
          <strong>⚡ Ключевое преимущество:</strong> Перегрузка в Swift разрешается <em>на этапе компиляции</em> —
          это означает нулевые накладные расходы во время выполнения. В TypeScript «перегрузка»
          разрешается вручную через <code>typeof</code>/<code>instanceof</code> в рантайме.
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 9. Comparison Table ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>📊 9. Сравнительная таблица: Swift vs JS/TS</h2>
        <p>
          Полное сравнение функций Swift и JavaScript/TypeScript — ключевые отличия в одном месте.
        </p>

        <div style={{
          borderRadius: '12px', overflow: 'hidden',
          border: '2px solid var(--border-color)',
          margin: '1.5rem 0',
        }}>
          <table className="comparison-table" style={{
            width: '100%', borderCollapse: 'collapse',
            fontFamily: 'inherit', fontSize: '0.88rem',
          }}>
            <thead>
              <tr style={{ background: 'var(--accent-blue, #3b82f6)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, width: '28%' }}>Возможность</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, width: '36%' }}>Swift</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, width: '36%' }}>JS / TS</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: 'Объявление',
                  swift: 'func name(param: Type) -> Return',
                  js: 'function name(param) / (param) => ...',
                },
                {
                  feature: 'Именованные аргументы',
                  swift: '✅ Встроено: greet(name: "Анна")',
                  js: '❌ Нет (эмуляция через {объект})',
                },
                {
                  feature: 'Argument Labels',
                  swift: '✅ func send(_ msg: String, to: String)',
                  js: '❌ Нет аналога',
                },
                {
                  feature: 'Умолчания',
                  swift: '✅ func f(x: Int = 0)',
                  js: '✅ function f(x = 0)',
                },
                {
                  feature: 'Variadic',
                  swift: 'func sum(_ v: Int...)',
                  js: 'function sum(...v)',
                },
                {
                  feature: 'inout',
                  swift: '✅ func f(_ x: inout Int)',
                  js: '❌ Нет (объекты — по ссылке)',
                },
                {
                  feature: 'Перегрузка',
                  swift: '✅ Компилятор выбирает по типам',
                  js: '❌ Нет (TS — только сигнатуры)',
                },
                {
                  feature: 'First-class',
                  swift: '✅ Тип: (Int, Int) -> Int',
                  js: '✅ typeof === "function"',
                },
                {
                  feature: 'Вложенные функции',
                  swift: '✅ С захватом переменных',
                  js: '✅ С замыканием',
                },
                {
                  feature: '@discardableResult',
                  swift: '✅ Подавляет warning',
                  js: '❌ Нет (нет warning без линтера)',
                },
                {
                  feature: 'Implicit return',
                  swift: '✅ Если тело — одно выражение',
                  js: '✅ Arrow function: () => expr',
                },
                {
                  feature: 'Типы параметров',
                  swift: '✅ Обязательны',
                  js: 'JS: нет / TS: опционально',
                },
                {
                  feature: 'Множ. variadic',
                  swift: '✅ С Swift 5.4+',
                  js: '❌ Rest-параметр только последний',
                },
                {
                  feature: 'Tuple return',
                  swift: '✅ -> (min: Int, max: Int)',
                  js: '❌ Нет (эмуляция через объект/массив)',
                },
              ].map(({ feature, swift, js }, i) => (
                <tr key={feature} style={{
                  background: i % 2 === 0 ? 'var(--bg-card)' : 'transparent',
                  borderBottom: '1px solid var(--border-color)',
                }}>
                  <td style={{
                    padding: '10px 16px', fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}>
                    {feature}
                  </td>
                  <td style={{
                    padding: '10px 16px', fontFamily: 'monospace', fontSize: '0.82rem',
                    color: 'var(--text-primary)',
                  }}>
                    {swift}
                  </td>
                  <td style={{
                    padding: '10px 16px', fontFamily: 'monospace', fontSize: '0.82rem',
                    color: 'var(--text-primary)',
                  }}>
                    {js}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── Бонус: Продвинутые паттерны ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🚀 Бонус: Продвинутые паттерны</h2>

        <h3>Функция-конструктор (Factory Pattern)</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Фабрика валидаторов
func makeValidator(
    minLength: Int = 0,
    maxLength: Int = .max,
    required: Bool = true
) -> (String) -> Bool {
    return { input in
        if required && input.isEmpty { return false }
        if !required && input.isEmpty { return true }
        return input.count >= minLength && input.count <= maxLength
    }
}

let validateName = makeValidator(minLength: 2, maxLength: 50)
let validateBio = makeValidator(maxLength: 200, required: false)
let validatePassword = makeValidator(minLength: 8)

print(validateName(""))            // false
print(validateName("А"))           // false (< 2)
print(validateName("Анна"))        // true

print(validateBio(""))             // true (not required)
print(validatePassword("12345678")) // true
`} />
        </div>

        <h3>Рекурсивные функции</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Классика: факториал
func factorial(_ n: Int) -> Int {
    guard n > 1 else { return 1 }
    return n * factorial(n - 1)
}
print(factorial(5))  // 120 (5 * 4 * 3 * 2 * 1)

// Fibonacci с мемоизацией
func fibonacci(_ n: Int, memo: inout [Int: Int]) -> Int {
    if let cached = memo[n] { return cached }
    if n <= 1 { return n }

    let result = fibonacci(n - 1, memo: &memo) + fibonacci(n - 2, memo: &memo)
    memo[n] = result
    return result
}

var cache: [Int: Int] = [:]
print(fibonacci(10, memo: &cache))  // 55
print(fibonacci(20, memo: &cache))  // 6765 (быстро — кэш!)

// Поиск в файловой системе (рекурсия по дереву)
func findFiles(in directory: String, matching ext: String) -> [String] {
    var results: [String] = []

    func search(path: String) {
        // Представим, что получаем список файлов...
        let items = ["main.swift", "utils/", "README.md", "utils/helpers.swift"]
        for item in items {
            if item.hasSuffix("/") {
                search(path: path + item)  // Рекурсия для директорий
            } else if item.hasSuffix(ext) {
                results.append(path + item)
            }
        }
    }

    search(path: directory)
    return results
}
`} />
        </div>

        <h3>Функции с where-ограничениями (Generic constraints)</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Generic-функция с ограничением
func findMax<T: Comparable>(_ array: [T]) -> T? {
    guard var maxElement = array.first else { return nil }
    for element in array {
        if element > maxElement {
            maxElement = element
        }
    }
    return maxElement
}

print(findMax([3, 1, 4, 1, 5, 9])!)   // 9
print(findMax(["банан", "ананас", "яблоко"])!)  // "яблоко"

// Generic с where clause
func allEqual<T: Equatable>(_ array: [T]) -> Bool where T: Hashable {
    return Set(array).count <= 1
}

print(allEqual([1, 1, 1]))          // true
print(allEqual([1, 2, 1]))          // false
print(allEqual(["a", "a", "a"]))    // true
`} />
        </div>

        <h3>Операторы — тоже функции!</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// В Swift операторы — это функции с особым синтаксисом
struct Vector2D {
    var x: Double
    var y: Double
}

// Определяем оператор +
func + (left: Vector2D, right: Vector2D) -> Vector2D {
    Vector2D(x: left.x + right.x, y: left.y + right.y)
}

// Определяем оператор ==
extension Vector2D: Equatable {
    static func == (lhs: Vector2D, rhs: Vector2D) -> Bool {
        lhs.x == rhs.x && lhs.y == rhs.y
    }
}

// Пользовательский оператор!
prefix operator √
prefix func √ (_ value: Double) -> Double {
    return value.squareRoot()
}

let a = Vector2D(x: 1, y: 2)
let b = Vector2D(x: 3, y: 4)
let c = a + b
print("(\\(c.x), \\(c.y))")  // "(4.0, 6.0)"
print(a == b)                 // false

print(√16)    // 4.0
print(√144)   // 12.0
`} />
        </div>

        <h3>🔄 В JavaScript</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// JS: нельзя определять кастомные операторы
// Нет перегрузки операторов (в отличие от Python, C++, Swift)
class Vector2D {
    constructor(x, y) { this.x = x; this.y = y }

    // Метод вместо оператора
    add(other) {
        return new Vector2D(this.x + other.x, this.y + other.y)
    }

    equals(other) {
        return this.x === other.x && this.y === other.y
    }
}

const a = new Vector2D(1, 2)
const b = new Vector2D(3, 4)
const c = a.add(b)  // Не a + b !

// В TC39 есть Proposal для operator overloading,
// но вряд ли будет принят
`} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── Шпаргалка ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>📋 Шпаргалка по функциям Swift</h2>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// ─── Базовое объявление ───
func имя(параметр: Тип) -> ВозвратТип { ... }

// ─── Argument labels ───
func send(_ message: String, to recipient: String) { }
send("Привет", to: "мир")   // _ скрывает label первого параметра

// ─── Значения по умолчанию ───
func fetch(url: String, method: String = "GET") { }

// ─── Variadic ───
func sum(_ numbers: Int...) -> Int { numbers.reduce(0, +) }

// ─── inout ───
func increment(_ value: inout Int) { value += 1 }
var x = 5; increment(&x)  // x == 6

// ─── Тип функции ───
let op: (Int, Int) -> Int = { $0 + $1 }

// ─── Вложенные функции ───
func outer() -> () -> Int {
    var count = 0
    func inner() -> Int { count += 1; return count }
    return inner
}

// ─── @discardableResult ───
@discardableResult
func insert(_ item: String, into list: inout [String]) -> Int {
    list.append(item); return list.count
}

// ─── Перегрузка ───
func process(_ value: Int) -> String { "Int: \\(value)" }
func process(_ value: String) -> String { "String: \\(value)" }

// ─── Generic ───
func first<T>(_ array: [T]) -> T? { array.first }

// ─── Кортеж (Tuple) return ───
func bounds(_ array: [Int]) -> (min: Int, max: Int)? {
    guard let min = array.min(), let max = array.max() else { return nil }
    return (min, max)
}
`} />
        </div>

        {/* ─── Key takeaways ─── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem',
          margin: '1.5rem 0',
        }}>
          {[
            { emoji: '🏷️', title: 'Argument Labels', text: 'Делают вызов читаемым: move(to: "дом")' },
            { emoji: '🔀', title: 'inout', text: 'Модификация внешней переменной: &value' },
            { emoji: '🔄', title: 'Перегрузка', text: 'Одно имя — разные типы, решается компилятором' },
            { emoji: '🎭', title: 'First-Class', text: 'Функции — значения с конкретным типом' },
            { emoji: '🪆', title: 'Nested', text: 'Вложенные функции для инкапсуляции' },
            { emoji: '🗑️', title: '@discardableResult', text: 'Результат можно не использовать' },
          ].map(({ emoji, title, text }) => (
            <div key={title} style={{
              padding: '1rem', borderRadius: '12px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{emoji}</div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{title}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{text}</div>
            </div>
          ))}
        </div>

        <div className="info-box">
          <strong>🎓 Итого:</strong> Функции в Swift значительно богаче, чем в JavaScript.
          Argument labels, настоящая перегрузка, <code>inout</code>, кортежи как возвращаемые значения —
          всё это делает код выразительнее и безопаснее. При этом основные паттерны (first-class functions,
          замыкания, вложенные функции) переносятся из JS практически один к одному.
        </div>
      </section>
    </div>
  )
}
