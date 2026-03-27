import CodeBlock from '../components/CodeBlock'

export default function ClosuresPage() {
  return (
    <div className="demo-container">
      <h1>📦 Замыкания (Closures)</h1>
      <p>
        Замыкания — это самодостаточные блоки кода, которые можно передавать и использовать.
        Если вы знакомы с arrow functions в JavaScript — вы уже знаете половину.
        Но Swift добавляет trailing closure syntax, capture lists, <code>@escaping</code>
        и множество сокращений, делающих замыкания невероятно выразительными.
      </p>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 1. Что такое замыкания ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🔍 Что такое замыкания?</h2>
        <p>
          В Swift есть три вида замыканий:
        </p>
        <ul>
          <li><strong>Глобальные функции</strong> — имеют имя, не захватывают значения</li>
          <li><strong>Вложенные функции</strong> — имеют имя, захватывают значения из окружающей функции</li>
          <li><strong>Closure expressions</strong> — безымянные, захватывают значения из контекста</li>
        </ul>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// 1. Глобальная функция
func greet() { print("Привет!") }

// 2. Вложенная функция (захватывает greeting)
func makeGreeter(greeting: String) -> () -> String {
    func greeter() -> String {
        return "\\(greeting), мир!"  // захватывает greeting
    }
    return greeter
}
let hi = makeGreeter(greeting: "Привет")
print(hi())  // "Привет, мир!"

// 3. Closure expression
let sayHello = { (name: String) -> String in
    return "Привет, \\(name)!"
}
print(sayHello("Анна"))  // "Привет, Анна!"
`} />
        </div>

        {/* ─── Visual Diagram: Closure captures context ─── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
          padding: '1.5rem', borderRadius: '12px',
          background: 'var(--card-bg, #f8f9fa)', border: '2px solid var(--border-color, #dee2e6)',
          margin: '1.5rem 0', fontFamily: 'monospace', fontSize: '0.9rem',
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Замыкание захватывает контекст
          </div>

          {/* Outer scope */}
          <div style={{
            border: '2px solid #4dabf7', borderRadius: '12px', padding: '1rem',
            width: '100%', maxWidth: '500px', background: '#4dabf722',
          }}>
            <div style={{ fontWeight: 700, color: '#4dabf7', marginBottom: '0.5rem' }}>
              📦 Внешний scope (функция)
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div style={{
                padding: '0.4rem 0.8rem', borderRadius: '6px',
                background: '#4dabf744', border: '1px solid #4dabf7',
              }}>
                var counter = 0
              </div>
              <div style={{
                padding: '0.4rem 0.8rem', borderRadius: '6px',
                background: '#4dabf744', border: '1px solid #4dabf7',
              }}>
                let step = 2
              </div>
            </div>

            {/* Closure box */}
            <div style={{
              border: '2px dashed #f7c948', borderRadius: '8px', padding: '1rem',
              background: '#f7c94822', position: 'relative',
            }}>
              <div style={{ fontWeight: 700, color: '#f7c948', marginBottom: '0.5rem' }}>
                🔒 Замыкание (closure)
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                {'{ counter += step; return counter }'}
              </div>
              <div style={{
                marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary, #666)',
              }}>
                ↑ Захватывает <strong>counter</strong> и <strong>step</strong> по ссылке
              </div>
            </div>
          </div>

          <div style={{ fontSize: '1.5rem' }}>⬇️</div>

          {/* Result */}
          <div style={{
            display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center',
          }}>
            {[
              { call: 'closure()', result: '2', counter: '2' },
              { call: 'closure()', result: '4', counter: '4' },
              { call: 'closure()', result: '6', counter: '6' },
            ].map((item) => (
              <div key={item.result} style={{
                padding: '0.5rem 1rem', borderRadius: '8px', textAlign: 'center',
                border: '2px solid #69db7c', background: '#69db7c22', minWidth: '120px',
              }}>
                <div style={{ fontWeight: 700 }}>{item.call}</div>
                <div style={{ fontSize: '0.8rem', color: '#69db7c' }}>→ {item.result}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>counter = {item.counter}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '0.8rem', opacity: 0.7, textAlign: 'center', marginTop: '0.5rem' }}>
            Замыкание «помнит» переменные из окружающего scope —
            даже после того, как функция завершила выполнение.
          </div>
        </div>

        <div className="info-box">
          <strong>💡 Аналогия с JS:</strong> В JavaScript замыкания работают точно так же.
          Arrow function <code>{'() => counter += step'}</code> захватывает переменные из
          внешнего scope. Главное отличие Swift — богатый синтаксис и <code>capture lists</code>.
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 2. Синтаксис замыканий ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>✍️ Синтаксис замыканий — от полного до сокращённого</h2>
        <p>
          Swift позволяет писать замыкания в нескольких формах — от полной записи до ультракороткой.
          Компилятор выводит типы, имена параметров и даже <code>return</code>.
        </p>

        {/* ─── Visual: Syntax simplification pipeline ─── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
          padding: '1.5rem', borderRadius: '12px',
          background: 'var(--card-bg, #f8f9fa)', border: '2px solid var(--border-color, #dee2e6)',
          margin: '1.5rem 0', fontFamily: 'monospace', fontSize: '0.85rem',
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            ⚡ Pipeline упрощения синтаксиса
          </div>

          {[
            { step: '① Полная форма', code: 'let sorted = names.sorted(by: { (s1: String, s2: String) -> Bool in return s1 > s2 })', color: '#e64980' },
            { step: '② Вывод типов', code: 'names.sorted(by: { s1, s2 in return s1 > s2 })', color: '#da77f2' },
            { step: '③ Неявный return', code: 'names.sorted(by: { s1, s2 in s1 > s2 })', color: '#7950f2' },
            { step: '④ Сокращённые $0, $1', code: 'names.sorted(by: { $0 > $1 })', color: '#4dabf7' },
            { step: '⑤ Trailing closure', code: 'names.sorted { $0 > $1 }', color: '#20c997' },
            { step: '⑥ Operator method', code: 'names.sorted(by: >)', color: '#69db7c' },
          ].map((item) => (
            <div key={item.step} style={{ width: '100%', maxWidth: '680px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.6rem 1rem', borderRadius: '8px',
                border: `2px solid ${item.color}`, background: `${item.color}15`,
              }}>
                <div style={{
                  fontWeight: 700, color: item.color, minWidth: '160px', fontSize: '0.82rem',
                }}>
                  {item.step}
                </div>
                <div style={{ fontSize: '0.8rem', wordBreak: 'break-all' }}>{item.code}</div>
              </div>
              {item.step !== '⑥ Operator method' && (
                <div style={{ textAlign: 'center', fontSize: '1.2rem', margin: '0.2rem 0' }}>↓</div>
              )}
            </div>
          ))}

          <div style={{ fontSize: '0.8rem', opacity: 0.7, textAlign: 'center', marginTop: '0.5rem' }}>
            Все 6 вариантов делают одно и то же: сортировка массива строк по убыванию.
            <br />Swift выводит типы и позволяет убрать лишний «шум» из кода.
          </div>
        </div>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
let names = ["Борис", "Анна", "Вика", "Глеб"]

// ① Полная форма — указываем всё явно
let sorted1 = names.sorted(by: { (s1: String, s2: String) -> Bool in
    return s1 > s2
})

// ② Вывод типов — компилятор знает, что sorted ожидает (String, String) -> Bool
let sorted2 = names.sorted(by: { s1, s2 in
    return s1 > s2
})

// ③ Неявный return — для однострочных выражений
let sorted3 = names.sorted(by: { s1, s2 in s1 > s2 })

// ④ Shorthand argument names — $0, $1, $2...
let sorted4 = names.sorted(by: { $0 > $1 })

// ⑤ Trailing closure — если замыкание — последний аргумент
let sorted5 = names.sorted { $0 > $1 }

// ⑥ Operator method — оператор > уже является (String, String) -> Bool
let sorted6 = names.sorted(by: >)

// Все вернут: ["Глеб", "Вика", "Борис", "Анна"]
`} />
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift closure</h3>
            <CodeBlock language="swift" code={`
// Полная форма
{ (параметры) -> ТипВозврата in
    тело замыкания
}

// Минимальная форма
{ $0 > $1 }
`} />
          </div>
          <div className="feature-card">
            <h3>JS arrow function</h3>
            <CodeBlock language="swift" code={`
// JS: полная форма
// (param1, param2) => {
//     return param1 > param2
// }

// JS: минимальная форма
// (a, b) => a > b

// ⚠️ В JS нет аналога $0, $1
`} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 3. Trailing closure syntax ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🔚 Trailing Closure Syntax</h2>
        <p>
          Если замыкание — <strong>последний аргумент</strong> функции, его можно записать
          после круглых скобок. Если это <strong>единственный</strong> аргумент — скобки вообще можно убрать.
          Это делает код «DSL-подобным».
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Функция, принимающая замыкание
func perform(times: Int, action: () -> Void) {
    for _ in 0..<times {
        action()
    }
}

// Обычный вызов
perform(times: 3, action: {
    print("Привет!")
})

// Trailing closure — замыкание ПОСЛЕ скобок
perform(times: 3) {
    print("Привет!")
}

// Если замыкание — единственный аргумент:
let numbers = [3, 1, 4, 1, 5]

// Скобки можно убрать полностью!
let doubled = numbers.map { $0 * 2 }        // [6, 2, 8, 2, 10]
let evens = numbers.filter { $0 % 2 == 0 }  // [4]
let sum = numbers.reduce(0) { $0 + $1 }     // 14
`} />
        </div>

        <h3>🔗 Multiple trailing closures (Swift 5.3+)</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Функция с несколькими замыканиями
func fetchData(
    onSuccess: (String) -> Void,
    onFailure: (Error) -> Void
) {
    // ...
}

// Multiple trailing closures
fetchData { data in
    print("Данные: \\(data)")
} onFailure: { error in
    print("Ошибка: \\(error)")
}

// SwiftUI активно использует это:
// Button("Нажми") {
//     // action closure
// } label: {
//     // label closure (в некоторых перегрузках)
// }

// Реальный пример с UIView.animate:
// UIView.animate(withDuration: 0.3) {
//     view.alpha = 0
// } completion: { finished in
//     view.removeFromSuperview()
// }
`} />
        </div>

        <div className="info-box">
          <strong>💡 В JS нет trailing closure.</strong> Ближайший аналог — callback последним аргументом,
          но без специального синтаксиса: <code>{'arr.map(x => x * 2)'}</code>.
          Trailing closures особенно хороши для DSL — SwiftUI, Combine, Result Builders.
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 4. Захват значений ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🔗 Захват значений (Capturing Values)</h2>
        <p>
          Замыкание <strong>захватывает ссылку</strong> на переменные из окружающего scope.
          Это значит, что замыкание видит <em>актуальное</em> значение переменной,
          а не её копию на момент создания замыкания. Это аналогично JS.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Замыкание захватывает переменную по ссылке
func makeCounter() -> () -> Int {
    var count = 0
    let counter = {
        count += 1
        return count
    }
    return counter
}

let counter = makeCounter()
print(counter())  // 1
print(counter())  // 2
print(counter())  // 3

// Каждый вызов makeCounter() создаёт НОВЫЙ count
let anotherCounter = makeCounter()
print(anotherCounter())  // 1
print(counter())          // 4 (свой count продолжает)
`} />
        </div>

        {/* ─── Visual Diagram: Capture semantics ─── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
          padding: '1.5rem', borderRadius: '12px',
          background: 'var(--card-bg, #f8f9fa)', border: '2px solid var(--border-color, #dee2e6)',
          margin: '1.5rem 0', fontFamily: 'monospace', fontSize: '0.9rem',
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Захват по ссылке vs копия (capture list)
          </div>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            {/* By reference */}
            <div style={{
              flex: '1 1 220px', maxWidth: '280px',
              border: '2px solid #e64980', borderRadius: '10px', padding: '1rem',
              background: '#e6498015',
            }}>
              <div style={{ fontWeight: 700, color: '#e64980', marginBottom: '0.5rem', textAlign: 'center' }}>
                По ссылке (по умолчанию)
              </div>
              <div style={{
                padding: '0.5rem', borderRadius: '6px', background: 'var(--code-bg, #2d2d2d)',
                color: '#e6e6e6', fontSize: '0.78rem', marginBottom: '0.5rem',
              }}>
                var x = 10<br />
                let c = {'{ x += 1 }'}<br />
                x = 99<br />
                c() → <strong style={{ color: '#e64980' }}>100</strong>
              </div>
              <div style={{ fontSize: '0.75rem', textAlign: 'center', opacity: 0.8 }}>
                Замыкание видит <strong>текущее</strong> значение x
              </div>
            </div>

            {/* By value (capture list) */}
            <div style={{
              flex: '1 1 220px', maxWidth: '280px',
              border: '2px solid #69db7c', borderRadius: '10px', padding: '1rem',
              background: '#69db7c15',
            }}>
              <div style={{ fontWeight: 700, color: '#69db7c', marginBottom: '0.5rem', textAlign: 'center' }}>
                Копия (capture list [x])
              </div>
              <div style={{
                padding: '0.5rem', borderRadius: '6px', background: 'var(--code-bg, #2d2d2d)',
                color: '#e6e6e6', fontSize: '0.78rem', marginBottom: '0.5rem',
              }}>
                var x = 10<br />
                let c = {'{ [x] in x }'}<br />
                x = 99<br />
                c() → <strong style={{ color: '#69db7c' }}>10</strong>
              </div>
              <div style={{ fontSize: '0.75rem', textAlign: 'center', opacity: 0.8 }}>
                Замыкание «заморозило» значение x на момент создания
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', opacity: 0.7, textAlign: 'center', marginTop: '0.5rem' }}>
            <code>[x]</code> в capture list создаёт <strong>копию</strong> значения x.
            Без capture list — захват по ссылке.
          </div>
        </div>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Захват по ссылке (по умолчанию)
var x = 10
let byRef = { print(x) }
x = 99
byRef()  // 99 — видит актуальное значение

// Захват по значению через capture list
var y = 10
let byVal = { [y] in print(y) }
y = 99
byVal()  // 10 — «заморозил» значение на момент создания

// Это как snapshot значения!
// В JS: нет прямого аналога capture list
// Можно эмулировать через IIFE:
// const byVal = ((y) => () => console.log(y))(y)
`} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 5. @escaping vs @nonescaping ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🚪 @escaping vs non-escaping замыкания</h2>
        <p>
          По умолчанию параметры-замыкания — <code>@nonescaping</code>: они гарантированно
          выполняются <strong>до</strong> возврата из функции. Если замыкание может пережить функцию
          (сохранено в свойство, вызвано асинхронно) — нужен <code>@escaping</code>.
        </p>

        {/* ─── Visual Diagram: Lifecycle ─── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
          padding: '1.5rem', borderRadius: '12px',
          background: 'var(--card-bg, #f8f9fa)', border: '2px solid var(--border-color, #dee2e6)',
          margin: '1.5rem 0', fontFamily: 'monospace', fontSize: '0.85rem',
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Жизненный цикл замыкания
          </div>

          {/* Timeline */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            {/* Non-escaping */}
            <div style={{
              flex: '1 1 250px', maxWidth: '320px', padding: '1rem',
              border: '2px solid #69db7c', borderRadius: '10px', background: '#69db7c10',
            }}>
              <div style={{ fontWeight: 700, color: '#69db7c', textAlign: 'center', marginBottom: '0.75rem' }}>
                Non-escaping (по умолчанию)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[
                  { label: 'func call()', icon: '▶️', bg: '#69db7c33' },
                  { label: '  → closure()', icon: '⚡', bg: '#69db7c55' },
                  { label: '  → closure done', icon: '✅', bg: '#69db7c33' },
                  { label: 'func return', icon: '🏁', bg: '#69db7c22' },
                  { label: 'closure freed ♻️', icon: '🗑️', bg: '#69db7c11' },
                ].map((item) => (
                  <div key={item.label} style={{
                    padding: '0.3rem 0.6rem', borderRadius: '4px',
                    background: item.bg, fontSize: '0.8rem',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                  }}>
                    <span>{item.icon}</span> {item.label}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.5rem', textAlign: 'center' }}>
                Замыкание живёт <strong>внутри</strong> функции
              </div>
            </div>

            {/* Escaping */}
            <div style={{
              flex: '1 1 250px', maxWidth: '320px', padding: '1rem',
              border: '2px solid #f7c948', borderRadius: '10px', background: '#f7c94810',
            }}>
              <div style={{ fontWeight: 700, color: '#f7c948', textAlign: 'center', marginBottom: '0.75rem' }}>
                @escaping
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[
                  { label: 'func call()', icon: '▶️', bg: '#f7c94833' },
                  { label: '  → save closure', icon: '💾', bg: '#f7c94855' },
                  { label: 'func return', icon: '🏁', bg: '#f7c94833' },
                  { label: '... время проходит ...', icon: '⏳', bg: '#f7c94822' },
                  { label: 'closure() вызвано позже!', icon: '⚡', bg: '#e6498055' },
                  { label: 'closure freed ♻️', icon: '🗑️', bg: '#f7c94811' },
                ].map((item) => (
                  <div key={item.label} style={{
                    padding: '0.3rem 0.6rem', borderRadius: '4px',
                    background: item.bg, fontSize: '0.8rem',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                  }}>
                    <span>{item.icon}</span> {item.label}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.5rem', textAlign: 'center' }}>
                Замыкание <strong>переживает</strong> функцию
              </div>
            </div>
          </div>
        </div>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// ── Non-escaping (по умолчанию) ──
// Замыкание выполняется ДО возврата из функции
func performOperation(_ operation: () -> Void) {
    print("Начало")
    operation()    // выполняется здесь и сейчас
    print("Конец")
}

performOperation {
    print("Операция!")
}
// Начало → Операция! → Конец

// ── @escaping ──
// Замыкание может быть вызвано ПОСЛЕ возврата из функции
var completionHandlers: [() -> Void] = []

func addCompletion(_ handler: @escaping () -> Void) {
    completionHandlers.append(handler)  // сохраняем — escaping!
}

addCompletion { print("Выполнено!") }
// Замыкание вызовется когда-нибудь потом:
completionHandlers.first?()  // "Выполнено!"
`} />
        </div>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// @escaping в реальной жизни — сетевой запрос
func fetchUser(id: Int, completion: @escaping (Result<String, Error>) -> Void) {
    // URLSession работает асинхронно — замыкание вызовется ПОТОМ
    DispatchQueue.global().async {
        // Имитация сетевого запроса
        sleep(1)
        DispatchQueue.main.async {
            completion(.success("User #\\(id)"))
        }
    }
}

// Вызов:
fetchUser(id: 42) { result in
    switch result {
    case .success(let user):
        print("Получен: \\(user)")
    case .failure(let error):
        print("Ошибка: \\(error)")
    }
}

// ⚠️ @escaping требует явного self в классах!
class ViewModel {
    var data = ""
    
    func loadData() {
        fetchUser(id: 1) { [weak self] result in
            // Нужен self. для @escaping замыканий
            self?.data = "loaded"
        }
    }
}
`} />
        </div>

        <div className="info-box">
          <strong>🔑 В JS все callback'и — «escaping».</strong> JavaScript не различает escaping/non-escaping,
          потому что GC сам управляет жизненным циклом. В Swift это различие критично для
          управления памятью: <code>@escaping</code> замыкания могут создавать retain cycles.
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 6. Autoclosures ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>⚡ @autoclosure — ленивые аргументы</h2>
        <p>
          <code>@autoclosure</code> автоматически оборачивает выражение в замыкание.
          Это позволяет вызывать функцию без фигурных скобок и откладывать вычисление.
        </p>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Без @autoclosure — нужны фигурные скобки
func logIfTrue(_ condition: Bool, message: () -> String) {
    if condition {
        print(message())
    }
}
logIfTrue(true, message: { "Это дорогая операция: \\(expensiveComputation())" })

// С @autoclosure — скобки не нужны!
func logIfTrue2(_ condition: Bool, message: @autoclosure () -> String) {
    if condition {
        print(message())
    }
}
logIfTrue2(true, message: "Это дорогая операция: \\(expensiveComputation())")
// ↑ Выражение АВТОМАТИЧЕСКИ оборачивается в { ... }
// И вычисляется ТОЛЬКО если condition == true (ленивость!)
`} />
        </div>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// assert — пример @autoclosure из стандартной библиотеки:
// func assert(_ condition: @autoclosure () -> Bool,
//             _ message: @autoclosure () -> String = "")

assert(2 + 2 == 4, "Математика сломалась")
// Оба аргумента — @autoclosure
// В Release builds assert вообще не вычисляет выражения!

// Свой оператор ||
func customOr(_ lhs: Bool, _ rhs: @autoclosure () -> Bool) -> Bool {
    if lhs { return true }
    return rhs()  // rhs вычисляется ТОЛЬКО если lhs == false
}

// Так работает short-circuit evalution:
customOr(true, expensiveCheck())  // expensiveCheck() НЕ вызовется!
`} />
        </div>

        <div className="info-box">
          <strong>⚠️ Осторожно:</strong> <code>@autoclosure</code> может сделать код менее понятным —
          не очевидно, что аргумент вычисляется лениво. Используйте только в утилитных функциях
          типа <code>assert</code>, логирования или custom operators.
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 7. Замыкания с map, filter, reduce ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🗺️ map, filter, reduce — замыкания в деле</h2>
        <p>
          Точно как в JavaScript, Swift имеет функциональные методы для коллекций.
          Но синтаксис замыканий делает их ещё короче.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift</h3>
            <CodeBlock language="swift" code={`
let numbers = [1, 2, 3, 4, 5]

// map
let doubled = numbers.map { $0 * 2 }
// [2, 4, 6, 8, 10]

// filter 
let evens = numbers.filter { $0 % 2 == 0 }
// [2, 4]

// reduce
let sum = numbers.reduce(0) { $0 + $1 }
// 15 (можно короче: reduce(0, +))

// compactMap — map + убрать nil
let strings = ["1", "two", "3", "four"]
let nums = strings.compactMap { Int($0) }
// [1, 3]

// flatMap — map + «расплющить»
let nested = [[1, 2], [3, 4], [5]]
let flat = nested.flatMap { $0 }
// [1, 2, 3, 4, 5]
`} />
          </div>
          <div className="feature-card">
            <h3>JavaScript</h3>
            <CodeBlock language="swift" code={`
// const numbers = [1, 2, 3, 4, 5]

// map
// numbers.map(x => x * 2)
// [2, 4, 6, 8, 10]

// filter
// numbers.filter(x => x % 2 === 0)
// [2, 4]

// reduce
// numbers.reduce((a, b) => a + b, 0)
// 15

// flatMap (JS)
// [[1,2],[3,4],[5]].flat()
// или .flatMap(x => x)

// ⚠️ В JS нет compactMap!
// Нужно: .map(...).filter(Boolean)
// ["1","two","3"].map(Number)
//    .filter(x => !isNaN(x))
`} />
          </div>
        </div>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Цепочка операций — как в JS
struct User {
    let name: String
    let age: Int
    let isActive: Bool
}

let users = [
    User(name: "Анна", age: 25, isActive: true),
    User(name: "Борис", age: 17, isActive: true),
    User(name: "Вика", age: 30, isActive: false),
    User(name: "Глеб", age: 22, isActive: true),
]

// Получить имена активных совершеннолетних пользователей, отсортированные
let result = users
    .filter { $0.isActive && $0.age >= 18 }
    .sorted { $0.age < $1.age }
    .map { $0.name }
// ["Глеб", "Анна"]

// forEach — как в JS
result.forEach { print("👤 \\($0)") }
// 👤 Глеб
// 👤 Анна

// first(where:) — как JS find()
let firstAdult = users.first { $0.age >= 18 }
print(firstAdult?.name ?? "Не найден")  // "Анна"

// contains(where:) — как JS some()
let hasTeenager = users.contains { $0.age < 18 }
print(hasTeenager)  // true

// allSatisfy — как JS every()
let allActive = users.allSatisfy { $0.isActive }
print(allActive)  // false
`} />
        </div>

        <div className="info-box">
          <strong>📊 Сравнение методов:</strong>
          <code>map</code> = <code>map</code>,
          <code>filter</code> = <code>filter</code>,
          <code>reduce</code> = <code>reduce</code>,
          <code>first(where:)</code> = <code>find</code>,
          <code>contains(where:)</code> = <code>some</code>,
          <code>allSatisfy</code> = <code>every</code>,
          <code>compactMap</code> = <code>map + filter(Boolean)</code>.
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 8. Capture lists — [weak self], [unowned self] ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🔄 Capture Lists — [weak self] и [unowned self]</h2>
        <p>
          В <code>@escaping</code> замыканиях внутри классов нужно думать о retain cycles.
          Замыкание держит strong reference на <code>self</code>, а <code>self</code> может
          держать reference на замыкание → утечка памяти!
        </p>

        {/* ─── Visual Diagram: Retain Cycle ─── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
          padding: '1.5rem', borderRadius: '12px',
          background: 'var(--card-bg, #f8f9fa)', border: '2px solid var(--border-color, #dee2e6)',
          margin: '1.5rem 0', fontFamily: 'monospace', fontSize: '0.85rem',
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            ⚠️ Retain Cycle с замыканиями
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '2rem',
            flexWrap: 'wrap', justifyContent: 'center',
          }}>
            {/* Object */}
            <div style={{
              padding: '1rem 1.5rem', borderRadius: '10px',
              border: '3px solid #e64980', background: '#e6498015',
              textAlign: 'center', minWidth: '140px',
            }}>
              <div style={{ fontWeight: 700, color: '#e64980', fontSize: '1rem' }}>🏗️ ViewController</div>
              <div style={{ fontSize: '0.75rem', marginTop: '0.3rem' }}>
                var onComplete: (() → Void)?
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>refCount = 1</div>
            </div>

            {/* Arrows */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#e64980', fontWeight: 700 }}>
                strong →
              </div>
              <div style={{ fontSize: '0.75rem', color: '#e64980', fontWeight: 700 }}>
                ← strong
              </div>
              <div style={{
                fontSize: '0.7rem', padding: '0.3rem 0.5rem', borderRadius: '4px',
                background: '#e6498033', color: '#e64980', fontWeight: 700,
              }}>
                ♻️ RETAIN CYCLE!
              </div>
            </div>

            {/* Closure */}
            <div style={{
              padding: '1rem 1.5rem', borderRadius: '10px',
              border: '3px solid #f7c948', background: '#f7c94815',
              textAlign: 'center', minWidth: '140px',
            }}>
              <div style={{ fontWeight: 700, color: '#f7c948', fontSize: '1rem' }}>📦 Closure</div>
              <div style={{ fontSize: '0.75rem', marginTop: '0.3rem' }}>
                {'{ self.update() }'}
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>captures self</div>
            </div>
          </div>

          <div style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>⬇️ Решение: [weak self]</div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '2rem',
            flexWrap: 'wrap', justifyContent: 'center',
          }}>
            <div style={{
              padding: '1rem 1.5rem', borderRadius: '10px',
              border: '3px solid #69db7c', background: '#69db7c15',
              textAlign: 'center', minWidth: '140px',
            }}>
              <div style={{ fontWeight: 700, color: '#69db7c', fontSize: '1rem' }}>🏗️ ViewController</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>refCount = 1</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#69db7c', fontWeight: 700 }}>
                strong →
              </div>
              <div style={{ fontSize: '0.75rem', color: '#69db7c', fontWeight: 700 }}>
                ← <span style={{ color: '#4dabf7' }}>weak</span>
              </div>
              <div style={{
                fontSize: '0.7rem', padding: '0.3rem 0.5rem', borderRadius: '4px',
                background: '#69db7c33', color: '#69db7c', fontWeight: 700,
              }}>
                ✅ NO CYCLE!
              </div>
            </div>

            <div style={{
              padding: '1rem 1.5rem', borderRadius: '10px',
              border: '3px solid #4dabf7', background: '#4dabf715',
              textAlign: 'center', minWidth: '140px',
            }}>
              <div style={{ fontWeight: 700, color: '#4dabf7', fontSize: '1rem' }}>📦 Closure</div>
              <div style={{ fontSize: '0.75rem', marginTop: '0.3rem' }}>
                {'{ [weak self] in self?.update() }'}
              </div>
            </div>
          </div>
        </div>

        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// ❌ Retain cycle — утечка памяти!
class ViewController {
    var name = "Main"
    var onComplete: (() -> Void)?
    
    func setup() {
        onComplete = {
            // self захвачен по strong reference!
            print(self.name)  // ❌ retain cycle
        }
    }
    
    deinit { print("\\(name) freed") }  // никогда не вызовется!
}

// ✅ Решение 1: [weak self] — self становится Optional
class SafeViewController {
    var name = "Safe"
    var onComplete: (() -> Void)?
    
    func setup() {
        onComplete = { [weak self] in
            // self теперь Optional (может быть nil)
            guard let self = self else { return }
            print(self.name)  // ✅ безопасно
        }
    }
    
    deinit { print("\\(name) freed") }  // ✅ вызовется!
}

// ✅ Решение 2: [unowned self] — как weak, но без Optional
class AnotherVC {
    var name = "Another"
    var onComplete: (() -> Void)?
    
    func setup() {
        onComplete = { [unowned self] in
            // self НЕ Optional, но если объект уже freed → crash!
            print(self.name)
        }
    }
}
`} />
        </div>

        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>Характеристика</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>[weak self]</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>[unowned self]</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['self Optional?', 'Да (self?)', 'Нет (прямой доступ)'],
              ['Если объект freed', 'self = nil (безопасно)', '💥 Crash!'],
              ['Когда использовать', 'Всегда безопасно', 'Только если уверены, что self жив'],
              ['Пример', 'Сетевые запросы, таймеры', 'Delegate patterns, parent-child'],
              ['Overhead', 'Небольшой (zeroing)', 'Минимальный'],
            ].map(([concept, weak, unowned]) => (
              <tr key={concept}>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)', fontWeight: 600 }}>{concept}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)' }}>{weak}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)' }}>{unowned}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="info-box">
          <strong>💡 Правило:</strong> Используйте <code>[weak self]</code> по умолчанию.
          <code>[unowned self]</code> — только когда на 100% уверены, что объект переживёт замыкание
          (например, parent ↔ child где child не может существовать без parent).
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 9. Closures vs JS Arrow Functions ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>⚖️ Swift Closures vs JS Arrow Functions — сравнение</h2>
        <p>
          На первый взгляд похожи, но есть принципиальные отличия.
        </p>

        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>Концепция</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>JS Arrow Function</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>Swift Closure</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Синтаксис', '(x, y) => x + y', '{ (x, y) in x + y }'],
              ['Shorthand аргументы', '❌ Нет', '✅ $0, $1, $2...'],
              ['Trailing syntax', '❌ Нет', '✅ arr.map { ... }'],
              ['Захват this/self', 'Наследует this из scope', 'Захватывает self по ссылке'],
              ['Capture lists', '❌ Нет', '✅ [weak self], [x]'],
              ['@escaping', '❌ Не нужен (GC)', '✅ Нужен для async'],
              ['@autoclosure', '❌ Нет', '✅ Ленивые аргументы'],
              ['Тип', '() => void', '() -> Void'],
              ['Неявный return', '✅ Без {}', '✅ Одно выражение'],
              ['Множественные closures', '❌ Нет', '✅ Multiple trailing closures'],
              ['Operator method', '❌ Нет', '✅ sorted(by: >)'],
              ['Замыкание = reference type', '✅ (всё reference в JS)', '✅ (замыкания — reference type)'],
              ['self обязателен', '❌ Нет', '✅ В @escaping замыканиях'],
              ['Retain cycles', '❌ GC решает', '⚠️ Нужен [weak self]'],
            ].map(([concept, js, swift]) => (
              <tr key={concept}>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)', fontWeight: 600 }}>{concept}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)' }}><code>{js}</code></td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)' }}><code>{swift}</code></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift Closure Expression</h3>
            <CodeBlock language="swift" code={`
// Полная форма
let greet = { (name: String) -> String in
    return "Hi, \\(name)!"
}

// Краткая
let hi: (String) -> String = { "Hi, \\($0)!" }

// Тип замыкания
// (Int, Int) -> Bool
// () -> Void
// (String) -> String?
`} />
          </div>
          <div className="feature-card">
            <h3>JS Arrow Function</h3>
            <CodeBlock language="swift" code={`
// Полная форма
// const greet = (name: string): string => {
//     return "Hi, " + name + "!"
// }

// Краткая
// const hi = (name: string) => "Hi, " + name

// Тип (TypeScript)
// (a: number, b: number) => boolean
// () => void
// (s: string) => string | undefined
`} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 10. Real-world patterns ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🏗️ Реальные паттерны использования замыканий</h2>

        <h3>📞 Callback / Completion Handler</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Паттерн: асинхронная операция с callback
typealias CompletionHandler<T> = (Result<T, Error>) -> Void

func fetchUsers(completion: @escaping CompletionHandler<[String]>) {
    DispatchQueue.global().async {
        // Имитация сетевого запроса
        let users = ["Анна", "Борис", "Вика"]
        
        DispatchQueue.main.async {
            completion(.success(users))
        }
    }
}

// Использование:
fetchUsers { result in
    switch result {
    case .success(let users):
        print("Пользователи: \\(users)")
    case .failure(let error):
        print("Ошибка: \\(error)")
    }
}
`} />
        </div>

        <h3>🎨 UIKit Animation Blocks</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// UIView.animate — классический пример trailing closure
UIView.animate(withDuration: 0.3) {
    // trailing closure — animation block
    myView.alpha = 0
    myView.transform = CGAffineTransform(scaleX: 0.5, y: 0.5)
} completion: { finished in
    // second trailing closure
    if finished {
        myView.removeFromSuperview()
    }
}

// Сравните с JS-версией (React Native / CSS transitions):
// Animated.timing(opacity, { toValue: 0, duration: 300 }).start(() => {
//     // completion callback
// })
`} />
        </div>

        <h3>📋 Кастомный Builder / Configuration</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Замыкание как конфигуратор (Builder pattern)
class NetworkRequest {
    var url = ""
    var method = "GET"
    var headers: [String: String] = [:]
    var timeout: TimeInterval = 30
}

func request(_ configure: (NetworkRequest) -> Void) -> NetworkRequest {
    let req = NetworkRequest()
    configure(req)
    return req
}

// Использование с trailing closure:
let myRequest = request {
    $0.url = "https://api.example.com/users"
    $0.method = "POST"
    $0.headers["Authorization"] = "Bearer token123"
    $0.timeout = 60
}
`} />
        </div>

        <h3>🔔 Наблюдатели / Event handlers</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Простой observable с замыканием
class Observable<T> {
    private var observers: [(T) -> Void] = []
    
    var value: T {
        didSet {
            observers.forEach { $0(value) }
        }
    }
    
    init(_ value: T) { self.value = value }
    
    func observe(_ handler: @escaping (T) -> Void) {
        observers.append(handler)
        handler(value) // вызвать сразу с текущим значением
    }
}

// Использование:
let username = Observable("Анна")
username.observe { name in
    print("Имя изменилось: \\(name)")
}
username.value = "Борис"  // "Имя изменилось: Борис"

// JS аналог:
// const [name, setName] = useState("Анна")
// useEffect(() => { console.log(name) }, [name])
`} />
        </div>

        <h3>🔄 Retry с замыканием</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// Utility: повторить операцию до N раз при неудаче
func retry<T>(
    times: Int,
    delay: TimeInterval = 1.0,
    operation: @escaping () async throws -> T
) async throws -> T {
    var lastError: Error?
    for attempt in 1...times {
        do {
            return try await operation()
        } catch {
            lastError = error
            print("Попытка \\(attempt) не удалась: \\(error)")
            if attempt < times {
                try await Task.sleep(nanoseconds: UInt64(delay * 1_000_000_000))
            }
        }
    }
    throw lastError!
}

// Использование:
// let data = try await retry(times: 3) {
//     try await fetchDataFromServer()
// }
`} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── 11. Common Mistakes & Gotchas ─── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>⚠️ Частые ошибки и подводные камни</h2>

        <h3>❌ Ошибка 1: Забыт [weak self] — retain cycle</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
class Timer {
    var tick: (() -> Void)?
    
    func start() {
        // ❌ retain cycle: Timer → closure → self (Timer)
        tick = {
            self.handleTick()
        }
    }
    
    func handleTick() { print("tick") }
    deinit { print("Timer freed") }  // ❌ Никогда не вызовется!
}

// ✅ Правильно:
class SafeTimer {
    var tick: (() -> Void)?
    
    func start() {
        tick = { [weak self] in
            self?.handleTick()
        }
    }
    
    func handleTick() { print("tick") }
    deinit { print("Timer freed") }  // ✅ Вызовется
}
`} />
        </div>

        <h3>❌ Ошибка 2: Модификация захваченной переменной</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// ⚠️ Замыкание захватывает ССЫЛКУ, не значение!
var callbacks: [() -> Void] = []

for i in 0..<3 {
    callbacks.append { print(i) }  // ⚠️ Все замыкания «видят» одну переменную i
}
// Но! В Swift for-in создаёт НОВУЮ переменную на каждой итерации
callbacks.forEach { $0() }  // 0, 1, 2 ✅ (не как в JS с var!)

// В JS с var:
// for (var i = 0; i < 3; i++) {
//     callbacks.push(() => console.log(i))
// }
// callbacks.forEach(f => f())  // 3, 3, 3 ❌
// Потому что var — одна переменная на все итерации
// В JS с let — 0, 1, 2 (как в Swift)
`} />
        </div>

        <h3>❌ Ошибка 3: Забыт @escaping</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// ❌ Ошибка компиляции: замыкание escaping, но не помечено
class DataService {
    var onComplete: (() -> Void)?
    
    // ❌ Escaping closure captured in non-escaping parameter
    // func setHandler(handler: () -> Void) {
    //     onComplete = handler  // сохраняем — значит escaping!
    // }
    
    // ✅ Правильно: добавить @escaping
    func setHandler(handler: @escaping () -> Void) {
        onComplete = handler
    }
}
`} />
        </div>

        <h3>❌ Ошибка 4: unowned self на уже освобождённом объекте</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// ❌ Crash! unowned self, но объект уже освобождён
class Downloader {
    var onDone: (() -> Void)?
    
    func start() {
        DispatchQueue.global().asyncAfter(deadline: .now() + 5) { [unowned self] in
            self.finish()  // 💥 Crash если Downloader был freed за эти 5 секунд!
        }
    }
    
    func finish() { print("Done") }
}

// ✅ Используйте [weak self] для async операций:
class SafeDownloader {
    var onDone: (() -> Void)?
    
    func start() {
        DispatchQueue.global().asyncAfter(deadline: .now() + 5) { [weak self] in
            self?.finish()  // ✅ Если объект freed — просто nil, без crash
        }
    }
    
    func finish() { print("Done") }
}
`} />
        </div>

        <h3>❌ Ошибка 5: Мутация value type в замыкании</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// ⚠️ struct — value type, замыкание не может его мутировать напрямую
struct Counter {
    var count = 0
    
    // ❌ Ошибка компиляции!
    // var increment: () -> Void {
    //     return { count += 1 }  // Closure cannot mutate struct
    // }
    
    // ✅ Используйте mutating method или class
    mutating func increment() {
        count += 1
    }
}

// Если нужно мутировать из замыкания — используйте class, а не struct
class MutableCounter {
    var count = 0
    
    lazy var increment: () -> Void = { [weak self] in
        self?.count += 1
    }
}
`} />
        </div>

        <h3>💡 Performance Tips</h3>
        <div className="code-block-wrapper">
          <CodeBlock language="swift" code={`
// 1. Предпочитайте non-escaping (по умолчанию)
// — Компилятор может оптимизировать, т.к. знает время жизни

// 2. Используйте [capture list] чтобы захватывать только нужное
func process() {
    let bigData = loadHugeDataset()
    let name = bigData.name
    
    // ❌ Захватывает весь bigData
    asyncOperation { print(bigData.name) }
    
    // ✅ Захватывает только name
    asyncOperation { [name] in print(name) }
}

// 3. Для простых операций используйте ссылки на методы
let numbers = [1, -2, 3, -4]
// ❌ Лишнее замыкание
let positives = numbers.filter { $0 > 0 }
// ✅ Тоже хорошо, но для более сложных случаев:
func isPositive(_ n: Int) -> Bool { n > 0 }
let positives2 = numbers.filter(isPositive)

// 4. Избегайте вложенных escaping замыканий (callback hell)
// ❌
// fetchUser { user in
//     fetchPosts(for: user) { posts in
//         fetchComments(for: posts.first!) { comments in
//             // вложенность растёт...
//         }
//     }
// }
// ✅ Используйте async/await (Swift 5.5+):
// let user = try await fetchUser()
// let posts = try await fetchPosts(for: user)
// let comments = try await fetchComments(for: posts.first!)
`} />
        </div>

        <div className="info-box">
          <strong>📏 Правила:</strong>
          <br />1. Всегда <code>[weak self]</code> в <code>@escaping</code> замыканиях класса.
          <br />2. <code>[unowned self]</code> только если гарантировано, что self переживёт замыкание.
          <br />3. Capture list <code>[x]</code> для «заморозки» значения.
          <br />4. Предпочитайте <code>async/await</code> вместо callback hell.
          <br />5. Используйте <code>compactMap</code> вместо <code>map + filter</code>.
        </div>
      </section>
    </div>
  )
}
