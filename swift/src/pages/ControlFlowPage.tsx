import CodeBlock from '../components/CodeBlock'

export default function ControlFlowPage() {
  return (
    <div className="demo-container">
      <h1>🔀 Control Flow</h1>
      <p>
        Управление потоком выполнения в Swift. Многие конструкции знакомы из JS,
        но <code>guard</code> и <code>switch</code> в Swift — это совершенно другой уровень мощности.
      </p>

      {/* ─── if / else ─── */}
      <section className="card">
        <h2>🔹 if / else</h2>
        <p>
          Работает как в JS, но <strong>скобки не обязательны</strong>, а условие должно быть
          строго <code>Bool</code>. Нет truthy/falsy!
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift</h3>
            <CodeBlock language="swift" code={`
let temperature = 25

if temperature > 30 {
    print("Жарко 🥵")
} else if temperature > 20 {
    print("Тепло 😊")
} else {
    print("Прохладно 🧥")
}

// ❌ Нельзя так (в отличие от JS):
// if temperature { }    // Int ≠ Bool
// if "hello" { }        // String ≠ Bool
// if 0 { }              // 0 ≠ false

// Нужно явное сравнение:
let name = ""
if name.isEmpty {
    print("Имя не задано")
}
`} />
          </div>
          <div className="feature-card">
            <h3>JavaScript</h3>
            <CodeBlock language="swift" code={`
// В JS «truthy/falsy» — источник багов:
// if (0) { }          // false — не выполнится
// if ("") { }         // false
// if (null) { }       // false
// if (undefined) { }  // false
// if ([]) { }         // true! (пустой массив)
// if ({}) { }         // true! (пустой объект)

// Swift устраняет эту путаницу:
// условие ДОЛЖНО быть Bool — точка.
`} />
          </div>
        </div>

        <div className="info-box">
          <strong>💡 Нет truthy/falsy:</strong> В Swift условие <code>if</code> должно явно
          возвращать <code>Bool</code>. Это убирает целый класс багов, связанных с неявными
          преобразованиями типов в JavaScript.
        </div>
      </section>

      {/* ─── guard ─── */}
      <section className="card">
        <h2>🛡️ guard — ранний выход</h2>
        <p>
          <code>guard</code> — уникальная конструкция Swift. Это «перевёрнутый if»:
          если условие <strong>не выполнено</strong>, обязательно происходит выход из scope
          (return, break, continue, throw). Идеально для валидации входных данных.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// guard: если условие false → выход
func processOrder(quantity: Int?, coupon: String?) {
    guard let qty = quantity, qty > 0 else {
        print("❌ Некорректное количество")
        return
    }
    
    guard let code = coupon, !code.isEmpty else {
        print("⚠️ Нет купона, продолжаем без скидки")
        // qty доступен здесь!
        print("Заказ: \\(qty) шт.")
        return
    }
    
    // qty и code доступны здесь — оба unwrapped!
    print("Заказ: \\(qty) шт. с купоном \\(code)")
}

processOrder(quantity: 3, coupon: "SALE20")
processOrder(quantity: nil, coupon: "SALE20")
processOrder(quantity: 5, coupon: nil)
`} />
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift — guard</h3>
            <CodeBlock language="swift" code={`
func greet(name: String?) {
    guard let name = name else {
        print("Нет имени")
        return
    }
    // name — уже String (не Optional)
    print("Привет, \\(name)!")
}
`} />
          </div>
          <div className="feature-card">
            <h3>JS — early return (аналог)</h3>
            <CodeBlock language="swift" code={`
// JS: ранний выход через if + return
// function greet(name) {
//     if (!name) {
//         console.log("Нет имени")
//         return
//     }
//     // name может быть "" (falsy путаница)
//     console.log("Привет, " + name + "!")
// }
`} />
          </div>
        </div>

        <div className="info-box">
          <strong>🔑 Преимущество guard:</strong> Переменные, развёрнутые (unwrapped) в <code>guard let</code>,
          доступны <strong>после</strong> guard — в основном теле функции. С <code>if let</code> они
          доступны только внутри блока <code>if</code>. Это делает код «плоским» без лишней вложенности.
        </div>
      </section>

      {/* ─── switch ─── */}
      <section className="card">
        <h2>⚡ switch — pattern matching</h2>
        <p>
          <code>switch</code> в Swift — это <strong>не тот switch, что в JS</strong>.
          Это мощнейший инструмент pattern matching с поддержкой диапазонов, кортежей, where-условий
          и value binding. Должен быть исчерпывающим (exhaustive).
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Базовый switch — без break! (нет fall-through по умолчанию)
let fruit = "яблоко"
switch fruit {
case "яблоко":
    print("🍎")
case "банан":
    print("🍌")
case "апельсин", "мандарин":   // несколько значений
    print("🍊")
default:
    print("🤷")
}
`} />
        </div>

        <h3>🎯 Ranges — диапазоны</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
let score = 85
switch score {
case 90...100:
    print("Отлично! 🏆")
case 80..<90:
    print("Хорошо 👍")
case 70..<80:
    print("Нормально")
case 0..<70:
    print("Надо подтянуть")
default:
    print("Некорректная оценка")
}
// Выведет: "Хорошо 👍"
`} />
        </div>

        <h3>📦 Tuples — кортежи в switch</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
let point = (2, 0)
switch point {
case (0, 0):
    print("В начале координат")
case (_, 0):                     // _ = любое значение по x
    print("На оси X")
case (0, _):
    print("На оси Y")
case (-2...2, -2...2):           // диапазоны!
    print("Внутри квадрата")
default:
    print("За пределами")
}
// Выведет: "На оси X"
`} />
        </div>

        <h3>🔗 Value Binding + where</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
let point = (3, -3)
switch point {
case let (x, y) where x == y:
    print("На диагонали y = x: (\\(x), \\(y))")
case let (x, y) where x == -y:
    print("На диагонали y = -x: (\\(x), \\(y))")
case let (x, y):
    print("Произвольная точка: (\\(x), \\(y))")
}
// Выведет: "На диагонали y = -x: (3, -3)"
`} />
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift switch</h3>
            <ul>
              <li>✅ Нет fall-through по умолчанию</li>
              <li>✅ Pattern matching с ranges</li>
              <li>✅ Кортежи и value binding</li>
              <li>✅ where-условия</li>
              <li>✅ Должен быть exhaustive</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>JS switch</h3>
            <ul>
              <li>❌ Нужен break (fall-through по умолчанию)</li>
              <li>❌ Только строгое равенство (===)</li>
              <li>❌ Нет pattern matching</li>
              <li>❌ Нет ranges и where</li>
              <li>❌ default необязателен</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── for-in ─── */}
      <section className="card">
        <h2>🔄 for-in — циклы</h2>
        <p>
          Универсальный цикл для итерации по последовательностям: массивам, диапазонам,
          словарям и строкам. Аналог <code>for...of</code> в JS.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Диапазон (замкнутый)
for i in 1...5 {
    print(i)    // 1, 2, 3, 4, 5
}

// Диапазон (полуоткрытый)
for i in 0..<3 {
    print(i)    // 0, 1, 2
}

// Массив
let fruits = ["🍎", "🍌", "🍊"]
for fruit in fruits {
    print(fruit)
}

// С индексом (аналог forEach с index)
for (index, fruit) in fruits.enumerated() {
    print("\\(index): \\(fruit)")
}

// Словарь (Dictionary)
let ages = ["Анна": 25, "Борис": 30]
for (name, age) in ages {
    print("\\(name) — \\(age) лет")
}

// Строка (по символам)
for char in "Swift" {
    print(char)   // S, w, i, f, t
}

// stride — шаг (аналог for(i=0; i<10; i+=2) в JS)
for i in stride(from: 0, to: 10, by: 2) {
    print(i)    // 0, 2, 4, 6, 8
}

for i in stride(from: 10, through: 0, by: -3) {
    print(i)    // 10, 7, 4, 1
}

// Игнорирование переменной цикла
for _ in 1...3 {
    print("Повтор!")
}
`} />
        </div>
      </section>

      {/* ─── while / repeat-while ─── */}
      <section className="card">
        <h2>🔁 while и repeat-while</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>while (как в JS)</h3>
            <CodeBlock language="swift" code={`
var countdown = 5
while countdown > 0 {
    print("\\(countdown)...")
    countdown -= 1
}
print("Поехали! 🚀")
`} />
          </div>
          <div className="feature-card">
            <h3>repeat-while (аналог do...while в JS)</h3>
            <CodeBlock language="swift" code={`
var number = 1
repeat {
    print(number)
    number *= 2
} while number < 100
// 1, 2, 4, 8, 16, 32, 64

// Тело выполняется минимум 1 раз
`} />
          </div>
        </div>
      </section>

      {/* ─── Labeled Statements ─── */}
      <section className="card">
        <h2>🏷️ Labeled Statements + break / continue / fallthrough</h2>
        <p>
          Метки позволяют управлять конкретным циклом во вложенных конструкциях.
          В JS тоже есть labels, но их почти никто не использует.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Метка для вложенного цикла
outerLoop: for i in 1...3 {
    for j in 1...3 {
        if i == 2 && j == 2 {
            break outerLoop    // выходим из ВНЕШНЕГО цикла
        }
        print("\\(i)-\\(j)", terminator: " ")
    }
}
// Выведет: 1-1 1-2 1-3 2-1

// continue с меткой
search: for row in 0..<3 {
    for col in 0..<3 {
        if col == 1 {
            continue search    // пропускаем оставшиеся col, переходим к следующему row
        }
        print("(\\(row),\\(col))", terminator: " ")
    }
}
// Выведет: (0,0) (1,0) (2,0)
`} />
        </div>

        <h3>🔽 fallthrough</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// fallthrough — явное «проваливание» (в отличие от JS, где это по умолчанию)
let number = 5
var description = "Число \\(number) — "

switch number {
case 2, 3, 5, 7, 11, 13:
    description += "простое, "
    fallthrough              // продолжаем в следующий case
default:
    description += "целое"
}
print(description)
// "Число 5 — простое, целое"
`} />
        </div>

        <div className="info-box">
          <strong>📌 Запомните:</strong> В Swift <code>switch</code> не «проваливается» по умолчанию — 
          это противоположно поведению JS. Если нужно fall-through, используйте явное ключевое слово 
          <code> fallthrough</code>. Это предотвращает баги с забытым <code>break</code>.
        </div>
      </section>

      {/* ─── Сравнительная таблица ─── */}
      <section className="card">
        <h2>⚖️ JS vs Swift — Control Flow</h2>

        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>Конструкция</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>JavaScript</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>Swift</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['if условие', 'Truthy/falsy', 'Только Bool'],
              ['guard', '❌ Нет (early return вручную)', '✅ guard let / guard else'],
              ['switch fall-through', 'По умолчанию (нужен break)', 'Нет (нужен fallthrough)'],
              ['switch pattern matching', '❌ Только === сравнение', '✅ Ranges, tuples, where, binding'],
              ['for...of / for-in', 'for (const x of arr)', 'for x in arr'],
              ['for с индексом', 'arr.forEach((v, i) => {})', 'for (i, v) in arr.enumerated()'],
              ['do...while', 'do { } while ()', 'repeat { } while'],
              ['Тернарный оператор', 'cond ? a : b', 'cond ? a : b (одинаково)'],
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
    </div>
  )
}
