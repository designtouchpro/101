import CodeBlock from '../components/CodeBlock'

export default function OptionalsPage() {
  return (
    <div className="page-content">
      <h1>❓ Опционалы (Optionals)</h1>
      <p>
        Опционалы — одна из ключевых концепций Swift, которая делает язык безопаснее, чем большинство
        других. Если вы пришли из JavaScript/TypeScript, где <code>undefined</code> и <code>null</code>{' '}
        могут появиться где угодно и когда угодно, в Swift отсутствие значения — это явная часть системы
        типов. Компилятор <strong>заставляет</strong> вас разобраться с возможным отсутствием значения
        до того, как программа запустится.
      </p>

      {/* ════════════════════════════════════════════════════════════════════
          1. ЗАЧЕМ НУЖНЫ ОПЦИОНАЛЫ
          ════════════════════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>💡 1. Зачем нужны опционалы — The Billion Dollar Mistake</h2>
        <p>
          В 1965 году Тони Хоар изобрёл <code>null</code> reference и позже назвал это
          «ошибкой на миллиард долларов». Почему? Потому что <code>null</code> может оказаться
          <em>где угодно</em>, и программист узнает об этом только в runtime — через крэш.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          margin: '24px 0',
        }}>
          <div style={{
            padding: '16px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '2px solid #f44336',
          }}>
            <div style={{ fontWeight: 700, color: '#f44336', marginBottom: 8, fontSize: '1rem' }}>
              ❌ JavaScript — null везде
            </div>
            <CodeBlock language="javascript" code={`
// JS: null может быть где угодно
function getUser(id) {
  // может вернуть объект, а может null
  return db.find(id) // null | User
}

const user = getUser(42)
// Забыли проверить — крэш в runtime!
console.log(user.name)
// TypeError: Cannot read property 'name' of null
`} />
          </div>
          <div style={{
            padding: '16px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '2px solid #4CAF50',
          }}>
            <div style={{ fontWeight: 700, color: '#4CAF50', marginBottom: 8, fontSize: '1rem' }}>
              ✅ Swift — компилятор защищает
            </div>
            <CodeBlock language="swift" code={`
// Swift: тип ЯВНО говорит об отсутствии
func getUser(id: Int) -> User? {
    // User? = может быть User, а может nil
    return db.find(id)
}

let user = getUser(id: 42)
// print(user.name) // ❌ НЕ СКОМПИЛИРУЕТСЯ!
// Сначала нужно проверить:
if let user = user {
    print(user.name) // ✅ Безопасно
}
`} />
          </div>
        </div>

        {/* ─── Визуальная диаграмма: String vs String? ─── */}
        <h3>📦 Визуальная модель: String vs String?</h3>
        <p>
          Представьте обычный тип как коробку, внутри которой <strong>всегда</strong> есть значение.
          А опциональный тип — как коробку, которая может быть пустой.
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '48px',
          margin: '28px 0',
          flexWrap: 'wrap',
        }}>
          {/* String — всегда есть значение */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--accent-blue)',
              marginBottom: 8,
              letterSpacing: '0.05em',
            }}>
              String
            </div>
            <div style={{
              width: 160,
              height: 80,
              border: '3px solid var(--accent-blue)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-card)',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              fontFamily: 'monospace',
            }}>
              "Hello"
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              marginTop: 8,
            }}>
              Всегда содержит значение
            </div>
          </div>

          {/* String? — может быть значение */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#FF9800',
              marginBottom: 8,
              letterSpacing: '0.05em',
            }}>
              String?
            </div>
            <div style={{
              width: 160,
              height: 80,
              border: '3px solid #FF9800',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-card)',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              fontFamily: 'monospace',
            }}>
              "Hello"
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              marginTop: 8,
            }}>
              Может содержать значение...
            </div>
          </div>

          {/* String? — пустая */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#f44336',
              marginBottom: 8,
              letterSpacing: '0.05em',
            }}>
              String?
            </div>
            <div style={{
              width: 160,
              height: 80,
              border: '3px dashed #f44336',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-card)',
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              fontStyle: 'italic',
            }}>
              nil
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              marginTop: 8,
            }}>
              ...а может быть nil
            </div>
          </div>
        </div>

        <h3>🔀 Сравнение с JS/TS</h3>
        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Концепция</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>JavaScript / TypeScript</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Swift</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Отсутствие значения', 'null, undefined (два варианта!)', 'nil (один вариант)'],
              ['Тип «может быть пусто»', 'T | null | undefined', 'T? (Optional<T>)'],
              ['Безопасный доступ', '?. (optional chaining)', '?. (optional chaining)'],
              ['Значение по умолчанию', '?? и ||', '??'],
              ['Принудительный доступ', 'нет (TypeError в runtime)', '! (force unwrap)'],
              ['Проверка на null', 'if (x != null)', 'if let x = x'],
            ].map(([concept, js, swift]) => (
              <tr key={concept}>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}><strong>{concept}</strong></td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace', fontSize: '0.85rem' }}>{js}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace', fontSize: '0.85rem' }}>{swift}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="info-box">
          <strong>💡 Ключевое отличие:</strong> В JS/TS «нуллабельность» — это соглашение. TypeScript
          помогает с <code>strictNullChecks</code>, но это opt-in. В Swift опционалы — часть системы
          типов на уровне компилятора. Вы <strong>физически не сможете</strong> использовать <code>nil</code>{' '}
          без его обработки.
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. OPTIONAL UNDER THE HOOD
          ════════════════════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>⚙️ 2. Optional Under the Hood</h2>
        <p>
          Под капотом <code>Optional</code> — это обычный <code>enum</code> с двумя вариантами.
          Когда вы пишете <code>String?</code>, компилятор видит <code>Optional&lt;String&gt;</code>.
        </p>

        <CodeBlock language="swift" code={`
// Настоящее определение Optional в стандартной библиотеке Swift:
enum Optional<Wrapped> {
    case none          // нет значения (nil)
    case some(Wrapped) // есть значение
}

// Эти записи ИДЕНТИЧНЫ:
let a: String? = "Hello"
let b: Optional<String> = .some("Hello")

let c: String? = nil
let d: Optional<String> = .none

// Проверяем:
print(a == b) // true
print(c == d) // true
`} />

        {/* ─── Визуальная диаграмма: enum Optional ─── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          margin: '24px 0',
          fontSize: '0.85rem',
        }}>
          <div style={{
            padding: '12px 32px',
            background: 'linear-gradient(135deg, var(--accent-blue), #7C4DFF)',
            borderRadius: '12px',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1rem',
          }}>
            enum Optional&lt;Wrapped&gt;
          </div>
          <div style={{ fontSize: '1.4rem' }}>⬇️</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            width: '100%',
            maxWidth: '500px',
          }}>
            <div style={{
              padding: '20px',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              border: '2px solid #f44336',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>📭</div>
              <div style={{ color: '#f44336', fontWeight: 700, fontFamily: 'monospace' }}>.none</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: 6 }}>
                Нет значения (nil)
              </div>
            </div>
            <div style={{
              padding: '20px',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              border: '2px solid #4CAF50',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>📬</div>
              <div style={{ color: '#4CAF50', fontWeight: 700, fontFamily: 'monospace' }}>.some(Wrapped)</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: 6 }}>
                Есть значение типа Wrapped
              </div>
            </div>
          </div>
        </div>

        <p>
          Это значит, что <code>Optional</code> — не магия компилятора, а обычный generic enum.
          Синтаксис <code>?</code> — просто сахар. Вы даже можете матчить его через <code>switch</code>.
        </p>

        <CodeBlock language="swift" code={`
let name: String? = "Алиса"

// Можно использовать switch, как с любым enum:
switch name {
case .some(let value):
    print("Имя: \\(value)")
case .none:
    print("Имя не задано")
}

// Или короче:
switch name {
case let value?:   // эквивалент .some(let value)
    print("Имя: \\(value)")
case nil:          // эквивалент .none
    print("Имя не задано")
}
`} />

        <div className="info-box">
          <strong>🔗 Аналогия для JS-разработчика:</strong> Представьте Optional как контейнер похожий
          на массив с 0 или 1 элементом. <code>.none</code> — пустой массив <code>[]</code>,{' '}
          <code>.some("Hello")</code> — массив <code>["Hello"]</code>. Чтобы получить значение,
          нужно «открыть» контейнер.
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. CREATING OPTIONALS
          ════════════════════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🛠️ 3. Создание опционалов</h2>
        <p>
          Создать опционал просто — добавьте <code>?</code> после типа. По умолчанию опционал
          без начального значения равен <code>nil</code>.
        </p>

        <CodeBlock language="swift" code={`
// Явная аннотация типа + начальное значение
var name: String? = "Боб"
var age: Int? = 25
var score: Double? = 99.5

// Nil по умолчанию — если не присвоить значение
var email: String? = nil    // явный nil
var phone: String?          // то же самое — nil по умолчанию (для свойств класса)

// В функциях тип параметра определяет опциональность
func greet(name: String?) {
    // name может быть nil
}
greet(name: "Алиса")  // ✅
greet(name: nil)       // ✅

// Важно: обычные типы НЕ МОГУТ быть nil!
// var x: String = nil   // ❌ Ошибка компиляции!
// var y: Int = nil       // ❌ Ошибка компиляции!
`} />

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift — опционалы явные</h3>
            <CodeBlock language="swift" code={`
var name: String? = "Боб"  // может быть nil
var age: Int = 25           // НИКОГДА не nil

// Присвоение nil:
name = nil  // ✅ OK — тип String?
// age = nil   // ❌ Ошибка — тип Int
`} />
          </div>
          <div className="feature-card">
            <h3>TypeScript — strictNullChecks</h3>
            <CodeBlock language="typescript" code={`
let name: string | null = "Боб" // явный union
let age: number = 25

// В TS без strictNullChecks:
// любая переменная может быть null/undefined
// — это как если бы ВСЕ типы были optional
`} />
          </div>
        </div>

        <CodeBlock language="swift" code={`
// Optional можно создать из failable инициализатора:
let number = Int("42")      // Int? — может не сконвертироваться
print(number)               // Optional(42)

let invalid = Int("hello")  // Int? = nil — не число!
print(invalid)              // nil

// Преобразование типов тоже возвращает Optional:
let value: Any = "Swift"
let str = value as? String  // String? — безопасный каст
let num = value as? Int     // nil — не Int
`} />
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. UNWRAPPING: if let
          ════════════════════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🔓 4. Unwrapping: if let</h2>
        <p>
          Самый распространённый способ «развернуть» опционал — <code>if let</code>.
          Если значение есть — оно привязывается к константе внутри блока <code>if</code>.
          Если значения нет — выполняется <code>else</code>.
        </p>

        <CodeBlock language="swift" code={`
let username: String? = "alice_dev"

// Классический if let:
if let name = username {
    // name — уже String (не optional!)
    print("Привет, \\(name)!")  // "Привет, alice_dev!"
} else {
    print("Пользователь не найден")
}

// Swift 5.7+ — сокращённый синтаксис (если имя совпадает):
if let username {
    // username — уже String внутри блока
    print("Привет, \\(username)!")
}

// Несколько опционалов одновременно:
let firstName: String? = "Алиса"
let lastName: String? = "Иванова"
let age: Int? = 28

if let first = firstName, let last = lastName, let age = age {
    // ВСЕ три значения есть — все развёрнуты
    print("\\(first) \\(last), \\(age) лет")
} else {
    // Хотя бы одно nil — попадаем сюда
    print("Неполные данные")
}

// Можно добавить условие через where / запятую:
if let age = age, age >= 18 {
    print("Совершеннолетний: \\(age)")
}
`} />

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift — if let</h3>
            <CodeBlock language="swift" code={`
let value: String? = getData()

if let value {
    // value: String
    process(value)
} else {
    handleMissing()
}
`} />
          </div>
          <div className="feature-card">
            <h3>JavaScript — if (x != null)</h3>
            <CodeBlock language="javascript" code={`
const value = getData() // any

if (value != null) {
    // value всё ещё any в JS
    // TS сужает до string | object...
    process(value)
} else {
    handleMissing()
}
`} />
          </div>
        </div>

        <div className="info-box">
          <strong>⚡ В чём сила if let:</strong> Внутри блока <code>if let</code> переменная
          гарантированно <strong>не nil</strong>. Это не runtime-проверка как в JS — это часть
          системы типов. Компилятор меняет тип с <code>String?</code> на <code>String</code>.
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. UNWRAPPING: guard let
          ════════════════════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🛡️ 5. Unwrapping: guard let — ранний выход</h2>
        <p>
          <code>guard let</code> — это «обратный» <code>if let</code>. Вместо вложенности он
          обеспечивает <strong>ранний выход</strong> (early return) из функции, если значения нет.
          Это решает проблему «пирамиды смерти» — вложенных проверок.
        </p>

        {/* ─── Визуальная диаграмма: Pyramid of Doom vs Guard Let ─── */}
        <h3>🏔️ Pyramid of Doom vs Guard Let</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          margin: '20px 0',
        }}>
          <div style={{
            padding: '16px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '2px solid #f44336',
          }}>
            <div style={{ fontWeight: 700, color: '#f44336', marginBottom: 12, textAlign: 'center' }}>
              ❌ Вложенные if let — «пирамида»
            </div>
            <div style={{
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              whiteSpace: 'pre',
            }}>
{`func process(data: Data?) {
  if let data = data {
    if let json = parse(data) {
      if let user = json["user"] {
        if let name = user.name {
          // Наконец-то можно работать!
          print(name)
        }
      }
    }
  }
}`}
            </div>
          </div>
          <div style={{
            padding: '16px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '2px solid #4CAF50',
          }}>
            <div style={{ fontWeight: 700, color: '#4CAF50', marginBottom: 12, textAlign: 'center' }}>
              ✅ guard let — плоская структура
            </div>
            <div style={{
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              whiteSpace: 'pre',
            }}>
{`func process(data: Data?) {
  guard let data = data else { return }
  guard let json = parse(data) else { return }
  guard let user = json["user"] else { return }
  guard let name = user.name else { return }

  // Все переменные доступны!
  print(name)
}`}
            </div>
          </div>
        </div>

        <CodeBlock language="swift" code={`
// guard let — переменная доступна ПОСЛЕ guard
func processUser(json: [String: Any]?) {
    guard let json = json else {
        print("Нет данных")
        return    // ОБЯЗАН выйти из scope (return, throw, break...)
    }
    // json — уже [String: Any] (не optional!)

    guard let name = json["name"] as? String else {
        print("Нет имени")
        return
    }
    // name — уже String

    guard let age = json["age"] as? Int, age >= 0 else {
        print("Некорректный возраст")
        return
    }
    // age — уже Int и >= 0

    // Все данные валидны — работаем!
    print("\\(name), \\(age) лет")
}

// Swift 5.7+ — сокращённый синтаксис:
func fetchProfile(id: String?) {
    guard let id else { return }
    // id: String — развёрнут
    loadProfile(id: id)
}
`} />

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift — guard let</h3>
            <CodeBlock language="swift" code={`
func validate(input: String?) -> Bool {
    guard let input else { return false }
    guard input.count >= 3 else { return false }
    guard input.rangeOfCharacter(
        from: .letters
    ) != nil else { return false }
    
    // Все проверки пройдены
    return true
}
`} />
          </div>
          <div className="feature-card">
            <h3>JavaScript — ранний return</h3>
            <CodeBlock language="javascript" code={`
function validate(input) {
    if (input == null) return false
    if (input.length < 3) return false
    if (!/[a-zA-Z]/.test(input)) return false

    // Все проверки пройдены
    return true
}
// Похоже! Но TS не сужает тип
// так элегантно, как Swift guard let
`} />
          </div>
        </div>

        <div className="info-box">
          <strong>🔑 Правило:</strong> <code>guard</code> обязывает выйти из текущего scope в <code>else</code>.
          Это может быть <code>return</code>, <code>throw</code>, <code>break</code>, <code>continue</code>{' '}
          или <code>fatalError()</code>. Переменная, развёрнутая через <code>guard let</code>, доступна
          <strong> во всём оставшемся теле функции</strong>, в отличие от <code>if let</code>, где она
          доступна только внутри блока.
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. FORCE UNWRAP !
          ════════════════════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>💣 6. Force Unwrap ! — зона опасности</h2>
        <p>
          Оператор <code>!</code> принудительно извлекает значение из опционала.
          Если значения нет (nil) — программа <strong>крэшится</strong>. Это аналог того,
          как в JS вы обращаетесь к свойству <code>null</code> и получаете TypeError,
          только в Swift это происходит <em>осознанно</em>.
        </p>

        {/* ─── Визуальная зона опасности ─── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(244,67,54,0.1), rgba(255,152,0,0.1))',
          border: '2px solid #f44336',
          borderRadius: '12px',
          padding: '20px',
          margin: '20px 0',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: 8 }}>💣⚠️💥</div>
          <div style={{
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#f44336',
            marginBottom: 8,
          }}>
            DANGER ZONE: Force Unwrap
          </div>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
            marginBottom: 8,
          }}>
            <code>let value = optional!</code>
          </div>
          <div style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
          }}>
            Если optional == nil → <strong>Fatal error: Unexpectedly found nil while unwrapping an Optional value</strong>
          </div>
        </div>

        <CodeBlock language="swift" code={`
// Force unwrap — извлекает значение или крэшит
let name: String? = "Алиса"
let unwrapped: String = name!   // ✅ "Алиса" — значение есть
print(unwrapped)                // "Алиса"

let empty: String? = nil
// let crash = empty!           // 💥 КРЭШ! Fatal error

// Когда это ОПРАВДАНО:

// 1. Ресурсы из бандла — точно существуют
let image = UIImage(named: "logo")!     // если нет — баг в проекте
let url = URL(string: "https://api.example.com")!  // константный URL

// 2. После проверки другим способом:
let array = [1, 2, 3]
if !array.isEmpty {
    let first = array.first!  // мы уже знаем, что массив не пуст
}

// 3. В тестах — крэш = неудачный тест (что нам и нужно)
func testParsing() {
    let result = parseJSON(data)!
    assert(result.count == 3)
}
`} />

        <CodeBlock language="swift" code={`
// Когда НЕ использовать force unwrap:

// ❌ Данные из сети — могут быть nil:
// let data = response.data!           // КРЭШ если сервер вернул ошибку

// ❌ Пользовательский ввод:
// let age = Int(textField.text!)!     // КРЭШ если пользователь ввёл "abc"

// ❌ Доступ к словарю:
// let value = dict["key"]!            // КРЭШ если ключа нет

// ✅ Безопасные альтернативы:
let data = response.data ?? Data()           // значение по умолчанию
let age = Int(textField.text ?? "") ?? 0     // двойная защита
let value = dict["key", default: "unknown"]  // значение по умолчанию
`} />

        <div className="info-box">
          <strong>📏 Правило для команды:</strong> Каждый <code>!</code> в продакшн-коде должен
          иметь комментарий, объясняющий, <strong>почему</strong> значение гарантированно не nil.
          На code review <code>!</code> без объяснения — это red flag. В идеале: используйте
          <code> guard let</code> или <code>??</code> вместо <code>!</code>.
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          7. OPTIONAL CHAINING ?.
          ════════════════════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🔗 7. Optional Chaining — цепочки вызовов</h2>
        <p>
          Optional chaining (<code>?.</code>) позволяет обращаться к свойствам и методам
          опционала без явного развёртывания. Если на любом этапе встречается <code>nil</code>,
          вся цепочка возвращает <code>nil</code>. Это работает <strong>точно как в JavaScript</strong>!
        </p>

        <CodeBlock language="swift" code={`
struct Address {
    var city: String
    var street: String?
    var building: Int?
}

struct Company {
    var name: String
    var address: Address?
}

struct Person {
    var name: String
    var company: Company?
}

let alice = Person(
    name: "Алиса",
    company: Company(
        name: "Apple",
        address: Address(city: "Cupertino", street: "Infinite Loop", building: 1)
    )
)

// Optional chaining — безопасно «прокапываемся» вглубь:
let building = alice.company?.address?.building   // Int? = Optional(1)
let street = alice.company?.address?.street        // String? = Optional("Infinite Loop")

// Если чего-то нет — вся цепочка nil:
let bob = Person(name: "Боб", company: nil)
let bobCity = bob.company?.address?.city           // nil (company = nil)

// Вызов методов через optional chaining:
let streetLength = alice.company?.address?.street?.count  // Int? = Optional(13)
let upperStreet = alice.company?.address?.street?.uppercased()  // String?
`} />

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift — ?.</h3>
            <CodeBlock language="swift" code={`
let city = user.company?.address?.city
// Тип: String?
// nil если любой элемент цепочки nil

// Вызов метода:
user.company?.address?.validate()
// Вызовется только если все НЕ nil
`} />
          </div>
          <div className="feature-card">
            <h3>JavaScript — ?.</h3>
            <CodeBlock language="javascript" code={`
const city = user.company?.address?.city
// Тип: string | undefined
// undefined если любой элемент undefined/null

// Вызов метода:
user.company?.address?.validate()
// Вызовется только если все не nullish
`} />
          </div>
        </div>

        <CodeBlock language="swift" code={`
// Optional chaining с subscript:
let dict: [String: [Int]]? = ["scores": [90, 85, 92]]
let firstScore = dict?["scores"]?.first  // Int? = Optional(90)

// Optional chaining с присваиванием:
var person = Person(name: "Алиса", company: nil)
person.company?.address?.street = "Новая улица"
// ☝️ Не делает ничего, т.к. company = nil. Без крэша!

// Проверка через optional chaining:
if let building = alice.company?.address?.building {
    print("Дом \\(building)")
}
`} />

        <div className="info-box">
          <strong>🎯 Для JS-разработчика:</strong> Optional chaining в Swift работает практически
          идентично JS. Единственное отличие: в Swift результат всегда <code>Optional&lt;T&gt;</code>,
          а в JS — <code>T | undefined</code>. Концепция та же, система типов — строже.
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          8. NIL COALESCING ??
          ════════════════════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🎯 8. Nil Coalescing ?? — значение по умолчанию</h2>
        <p>
          Оператор <code>??</code> возвращает значение из опционала, если оно есть, или значение по
          умолчанию, если опционал равен <code>nil</code>. Работает так же, как <code>??</code> в JavaScript!
        </p>

        <CodeBlock language="swift" code={`
// Базовое использование:
let name: String? = nil
let displayName = name ?? "Аноним"     // "Аноним"

let age: Int? = 25
let displayAge = age ?? 0               // 25 (опционал не nil)

// Цепочка ?? — первое не-nil значение:
let userColor: String? = nil
let themeColor: String? = nil
let defaultColor = "blue"

let color = userColor ?? themeColor ?? defaultColor   // "blue"

// ?? с optional chaining:
let city = user.company?.address?.city ?? "Город не указан"

// ?? с вычислением — правая часть ленивая:
let cached = loadFromCache() ?? fetchFromNetwork()
// fetchFromNetwork() вызовется ТОЛЬКО если cache = nil
`} />

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift — ??</h3>
            <CodeBlock language="swift" code={`
let input: String? = ""
let value = input ?? "default"
// value = "" (пустая строка — НЕ nil!)

// ?? работает только с nil
// Пустая строка, 0, false — это значения!
`} />
          </div>
          <div className="feature-card">
            <h3>JavaScript — ?? vs ||</h3>
            <CodeBlock language="javascript" code={`
const input = ""
const a = input ?? "default" // "" (только null/undef)
const b = input || "default" // "default" (falsy!)

// ⚠️ || в JS: 0, "", false, NaN → falsy
// ?? в JS: только null/undefined → nullish
// Swift ?? = JS ?? (не ||)
`} />
          </div>
        </div>

        <CodeBlock language="swift" code={`
// Практический пример — конфигурация с дефолтами:
struct Config {
    var timeout: Int?
    var retries: Int?
    var baseURL: String?
}

func createClient(config: Config?) {
    let timeout = config?.timeout ?? 30
    let retries = config?.retries ?? 3
    let baseURL = config?.baseURL ?? "https://api.example.com"
    
    print("timeout: \\(timeout), retries: \\(retries)")
    print("baseURL: \\(baseURL)")
}

// Все значения по умолчанию:
createClient(config: nil)

// Частичная конфигурация:
createClient(config: Config(timeout: 60, retries: nil, baseURL: nil))
`} />

        <div className="info-box">
          <strong>⚡ Важное отличие от JS <code>||</code>:</strong> В JavaScript <code>|| </code>
          считает <code>0</code>, <code>""</code>, <code>false</code> ложными значениями.
          Swift <code>??</code> (как и JS <code>??</code>) реагирует <strong>только на nil</strong>.
          В Swift нет понятия «falsy» — <code>0</code> и <code>""</code> это полноценные значения.
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          9. IMPLICIT UNWRAPPING !
          ════════════════════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>⚡ 9. Implicitly Unwrapped Optionals (IUO) — String!</h2>
        <p>
          Тип с <code>!</code> вместо <code>?</code> — это опционал, который автоматически
          разворачивается при использовании. Вы обещаете компилятору: «тут <em>точно</em> будет
          значение к моменту использования».
        </p>

        <CodeBlock language="swift" code={`
// Implicitly Unwrapped Optional:
var name: String! = "Алиса"

// Можно использовать как обычный String:
let greeting = "Привет, " + name  // ✅ авто-разворачивание
let length = name.count            // ✅ авто-разворачивание

// Но если nil — крэш, как при force unwrap:
name = nil
// let crash = name.count          // 💥 КРЭШ!

// Всё ещё можно проверять:
if let name = name {
    print(name)
}
`} />

        <CodeBlock language="swift" code={`
// Главный use case — IBOutlet в UIKit:
class LoginViewController: UIViewController {
    @IBOutlet weak var emailField: UITextField!     // IUO
    @IBOutlet weak var passwordField: UITextField!  // IUO
    @IBOutlet weak var loginButton: UIButton!       // IUO
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // К этому моменту все @IBOutlet уже подключены
        // Можно использовать без разворачивания:
        emailField.placeholder = "Email"
        passwordField.isSecureTextEntry = true
        loginButton.setTitle("Войти", for: .normal)
    }
}
// Почему IUO: outlet'ы nil ДО загрузки view,
// но мы никогда не используем их до viewDidLoad.
// Если outlet не подключён — крэш сразу покажет баг.

// Другой use case — двусторонние ссылки (retain cycle prevention):
class Country {
    let name: String
    var capital: City!    // IUO — будет присвоен в init City
    
    init(name: String, capitalName: String) {
        self.name = name
        self.capital = City(name: capitalName, country: self)
    }
}

class City {
    let name: String
    unowned let country: Country
    
    init(name: String, country: Country) {
        self.name = name
        self.country = country
    }
}
`} />

        <div className="info-box">
          <strong>📏 Когда использовать IUO:</strong><br />
          ✅ <code>@IBOutlet</code> — стандартный паттерн UIKit<br />
          ✅ Двусторонние ссылки при инициализации<br />
          ✅ Значения, которые устанавливаются сразу после <code>init</code> и никогда не nil<br />
          ❌ Данные из сети, пользовательский ввод, что-либо внешнее<br />
          ❌ «Лень писать if let» — никогда не используйте IUO для удобства
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          10. OPTIONAL MAP / FLATMAP
          ════════════════════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🔄 10. Optional map / flatMap — трансформация без разворачивания</h2>
        <p>
          У <code>Optional</code> есть методы <code>map</code> и <code>flatMap</code>,
          которые позволяют трансформировать значение, не разворачивая его явно.
          Это как <code>.map()</code> на массиве, но для контейнера с 0 или 1 элементом.
        </p>

        <CodeBlock language="swift" code={`
// map — трансформирует значение внутри Optional:
let number: Int? = 42
let doubled = number.map { $0 * 2 }      // Optional(84)
let string = number.map { String($0) }    // Optional("42")

let empty: Int? = nil
let result = empty.map { $0 * 2 }         // nil (функция не вызывается)

// Это эквивалентно:
let manualResult: Int?
if let number = number {
    manualResult = number * 2
} else {
    manualResult = nil
}

// Реальный пример — форматирование опционального значения:
let price: Double? = 99.99
let formatted = price.map { String(format: "$%.2f", $0) }
// Optional("$99.99")

let noPrice: Double? = nil
let noFormatted = noPrice.map { String(format: "$%.2f", $0) }
// nil
`} />

        <CodeBlock language="swift" code={`
// flatMap — когда трансформация тоже возвращает Optional:
let input: String? = "42"

// map + Optional-возвращающая функция = Optional<Optional<Int>> 🤢
let nested = input.map { Int($0) }    // Optional(Optional(42)) — двойная обёртка!

// flatMap «расплющивает» результат:
let flat = input.flatMap { Int($0) }  // Optional(42) — одна обёртка ✅

// Реальный пример — цепочка опциональных трансформаций:
let userInput: String? = " 42 "
let parsed = userInput
    .map { $0.trimmingCharacters(in: .whitespaces) }  // Optional("42")
    .flatMap { Int($0) }                                // Optional(42)
    .map { $0 * 2 }                                     // Optional(84)

print(parsed ?? 0)  // 84
`} />

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Swift — Optional.map</h3>
            <CodeBlock language="swift" code={`
let name: String? = "alice"
let upper = name.map { $0.uppercased() }
// Optional("ALICE")

// Цепочка:
let result = name
    .map { $0.trimmingCharacters(in: .whitespaces) }
    .map { $0.uppercased() }
    .map { "User: \\($0)" }
// Optional("User: ALICE")
`} />
          </div>
          <div className="feature-card">
            <h3>JavaScript — аналогия</h3>
            <CodeBlock language="javascript" code={`
// В JS нет Optional.map, но можно так:
const name = "alice" // | null

// Вариант 1 — ternary:
const upper = name != null
    ? name.toUpperCase()
    : null

// Вариант 2 — с optional chaining:
const upper2 = name?.toUpperCase() ?? null

// Swift map — элегантнее для цепочек!
`} />
          </div>
        </div>

        <CodeBlock language="swift" code={`
// flatMap — удаление nil из массива опционалов:
// (используется compactMap, который по сути flatMap для коллекций)
let strings = ["1", "два", "3", "четыре", "5"]
let numbers = strings.compactMap { Int($0) }  // [1, 3, 5]
// compactMap = map + фильтрация nil

// Аналог в JS:
// strings.map(Number).filter(n => !isNaN(n))

// Ещё пример — первый валидный результат:
let configs = [
    getConfigFromEnv(),      // String?
    getConfigFromFile(),     // String?
    getConfigFromDefault()   // String?
]
let activeConfig = configs.compactMap { $0 }.first ?? "fallback"
`} />

        <div className="info-box">
          <strong>🧠 Ментальная модель:</strong> Думайте об Optional как о «коробке». <code>map</code>{' '}
          открывает коробку, применяет функцию к содержимому и кладёт результат обратно. Если коробка
          пуста — возвращает пустую коробку. <code>flatMap</code> делает то же, но если функция сама
          возвращает коробку — не оборачивает в ещё одну.
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          11. PATTERN MATCHING С OPTIONALS
          ════════════════════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🎯 11. Pattern Matching с Optionals</h2>
        <p>
          Поскольку <code>Optional</code> — это enum, его можно использовать в <code>switch</code>,{' '}
          <code>if case</code> и <code>for case</code>. Это мощный инструмент, не имеющий прямого
          аналога в JavaScript.
        </p>

        <CodeBlock language="swift" code={`
// switch по Optional:
let age: Int? = 25

switch age {
case .none:
    print("Возраст не указан")
case .some(let value) where value < 0:
    print("Некорректный возраст: \\(value)")
case .some(let value) where value < 18:
    print("Несовершеннолетний: \\(value)")
case .some(let value):
    print("Возраст: \\(value)")
}

// Короткий синтаксис с case let x?:
switch age {
case nil:
    print("Не указан")
case let value? where value < 18:
    print("Несовершеннолетний: \\(value)")
case let value?:
    print("Возраст: \\(value)")
}
`} />

        <CodeBlock language="swift" code={`
// if case — паттерн-матчинг в условии:
let response: Int? = 200

if case let code? = response, (200..<300).contains(code) {
    print("Успех: \\(code)")
}

// for case — итерация с фильтрацией nil:
let scores: [Int?] = [90, nil, 85, nil, 92, nil, 88]

// Только не-nil значения:
for case let score? in scores {
    print(score)  // 90, 85, 92, 88
}

// Только nil значения (считаем пропуски):
var missingCount = 0
for case nil in scores {
    missingCount += 1
}
print("Пропусков: \\(missingCount)")  // 3

// Паттерн-матчинг с enum + Optional:
enum Status {
    case active, inactive, banned
}

let userStatus: Status? = .active

switch userStatus {
case .active?:
    print("Активен")
case .inactive?:
    print("Неактивен")
case .banned?:
    print("Заблокирован")
case nil:
    print("Статус неизвестен")
}
`} />

        <CodeBlock language="swift" code={`
// Двойной Optional — Optional<Optional<T>> (да, так бывает!)
let dict: [String: Int?] = ["a": 1, "b": nil, "c": 3]

// dict["a"]   → Int?? = .some(.some(1))    — ключ есть, значение 1
// dict["b"]   → Int?? = .some(.none)       — ключ есть, значение nil
// dict["d"]   → Int?? = .none              — ключа нет!

for (key, value) in dict {
    switch value {
    case .some(let num?):
        print("\\(key): \\(num)")
    case .some(nil):
        print("\\(key): значение nil")
    // case nil не нужен — мы итерируем по существующим ключам
    default:
        break
    }
}

// Различить «ключа нет» от «значение nil»:
if let entry = dict["b"] {
    // Ключ "b" есть
    if let value = entry {
        print(value)
    } else {
        print("Ключ есть, но значение nil")
    }
} else {
    print("Ключа нет в словаре")
}
`} />

        <div className="info-box">
          <strong>💡 Зачем это нужно:</strong> Pattern matching с опционалами особенно полезен при
          обработке API-ответов, парсинге JSON, и работе со словарями, где ключ может отсутствовать,
          а значение может быть <code>null</code>. В JS для таких случаев приходится писать
          вложенные <code>if</code>-ы или использовать <code>hasOwnProperty</code>.
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          12. COMMON PATTERNS & BEST PRACTICES
          ════════════════════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>📋 12. Шпаргалка: Do &amp; Don't</h2>
        <p>
          Практические паттерны работы с опционалами. Карточки «делай так / не делай так»
          для быстрого reference.
        </p>

        {/* ─── Do / Don't карточки ─── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          margin: '20px 0',
        }}>
          {/* Карточка 1 */}
          <div style={{
            padding: '16px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '2px solid #4CAF50',
          }}>
            <div style={{ fontWeight: 700, color: '#4CAF50', marginBottom: 8 }}>✅ DO: guard let для раннего выхода</div>
            <CodeBlock language="swift" code={`
func process(data: Data?) {
    guard let data else { return }
    // data: Data — работаем!
    parse(data)
}
`} />
          </div>
          <div style={{
            padding: '16px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '2px solid #f44336',
          }}>
            <div style={{ fontWeight: 700, color: '#f44336', marginBottom: 8 }}>❌ DON'T: Force unwrap без причины</div>
            <CodeBlock language="swift" code={`
func process(data: Data?) {
    let data = data! // 💥 КРЭШ если nil
    parse(data)
}
`} />
          </div>

          {/* Карточка 2 */}
          <div style={{
            padding: '16px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '2px solid #4CAF50',
          }}>
            <div style={{ fontWeight: 700, color: '#4CAF50', marginBottom: 8 }}>✅ DO: ?? для дефолтов</div>
            <CodeBlock language="swift" code={`
let name = user.name ?? "Аноним"
let timeout = config?.timeout ?? 30
`} />
          </div>
          <div style={{
            padding: '16px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '2px solid #f44336',
          }}>
            <div style={{ fontWeight: 700, color: '#f44336', marginBottom: 8 }}>❌ DON'T: Сравнение с nil + force unwrap</div>
            <CodeBlock language="swift" code={`
if user.name != nil {
    let name = user.name! // Небезопасно
}
// Используй if let name = user.name
`} />
          </div>

          {/* Карточка 3 */}
          <div style={{
            padding: '16px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '2px solid #4CAF50',
          }}>
            <div style={{ fontWeight: 700, color: '#4CAF50', marginBottom: 8 }}>✅ DO: map для трансформаций</div>
            <CodeBlock language="swift" code={`
let display = price.map {
    String(format: "$%.2f", $0)
} ?? "Цена не указана"
`} />
          </div>
          <div style={{
            padding: '16px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '2px solid #f44336',
          }}>
            <div style={{ fontWeight: 700, color: '#f44336', marginBottom: 8 }}>❌ DON'T: Вложенные if let</div>
            <CodeBlock language="swift" code={`
if let a = getA() {
    if let b = getB(a) {
        if let c = getC(b) {
            use(c) // 😵 пирамида!
        }
    }
}
`} />
          </div>

          {/* Карточка 4 */}
          <div style={{
            padding: '16px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '2px solid #4CAF50',
          }}>
            <div style={{ fontWeight: 700, color: '#4CAF50', marginBottom: 8 }}>✅ DO: compactMap для фильтрации</div>
            <CodeBlock language="swift" code={`
let ids = ["1", "abc", "3", "xyz"]
let valid = ids.compactMap { Int($0) }
// [1, 3]
`} />
          </div>
          <div style={{
            padding: '16px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '2px solid #f44336',
          }}>
            <div style={{ fontWeight: 700, color: '#f44336', marginBottom: 8 }}>❌ DON'T: IUO для удобства</div>
            <CodeBlock language="swift" code={`
// "Не хочу писать if let"
var data: Data! = nil
// ...через 100 строк...
process(data) // 💥
`} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ПРАКТИЧЕСКИЕ ПРИМЕРЫ
          ════════════════════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🏗️ Практические примеры из реальных проектов</h2>

        <h3>Пример 1: Парсинг JSON-ответа API</h3>
        <CodeBlock language="swift" code={`
struct APIResponse: Codable {
    let data: UserData?
    let error: APIError?
    let meta: Meta?
}

struct UserData: Codable {
    let id: Int
    let name: String
    let email: String?
    let avatar: String?
}

struct APIError: Codable {
    let code: Int
    let message: String
}

struct Meta: Codable {
    let page: Int?
    let total: Int?
}

func handleResponse(_ response: APIResponse) {
    // guard let для основного сценария
    guard let user = response.data else {
        // Обработка ошибки
        let message = response.error?.message ?? "Неизвестная ошибка"
        let code = response.error?.code ?? -1
        print("Ошибка \\(code): \\(message)")
        return
    }
    
    // Работаем с user (уже не optional)
    print("Пользователь: \\(user.name)")
    
    // Optional chaining + nil coalescing для опциональных полей
    let email = user.email ?? "Не указан"
    let avatarURL = user.avatar.flatMap { URL(string: $0) }
    
    if let avatarURL {
        loadImage(from: avatarURL)
    }
    
    // Мета-данные — полностью опциональны
    if let total = response.meta?.total {
        print("Всего записей: \\(total)")
    }
}
`} />

        <h3>Пример 2: Цепочка валидаций формы</h3>
        <CodeBlock language="swift" code={`
struct FormData {
    var email: String?
    var password: String?
    var confirmPassword: String?
    var age: String?
}

enum ValidationError: Error {
    case missingEmail
    case invalidEmail
    case missingPassword
    case passwordTooShort
    case passwordsMismatch
    case invalidAge
    case underage
}

func validateForm(_ form: FormData) -> Result<Void, ValidationError> {
    // guard let — последовательная валидация с ранним выходом
    guard let email = form.email, !email.isEmpty else {
        return .failure(.missingEmail)
    }
    
    guard email.contains("@") && email.contains(".") else {
        return .failure(.invalidEmail)
    }
    
    guard let password = form.password, !password.isEmpty else {
        return .failure(.missingPassword)
    }
    
    guard password.count >= 8 else {
        return .failure(.passwordTooShort)
    }
    
    guard password == form.confirmPassword else {
        return .failure(.passwordsMismatch)
    }
    
    // flatMap для конвертации + проверки
    guard let age = form.age.flatMap({ Int($0) }) else {
        return .failure(.invalidAge)
    }
    
    guard age >= 18 else {
        return .failure(.underage)
    }
    
    return .success(())
}
`} />

        <h3>Пример 3: Конфигурация с многоуровневыми дефолтами</h3>
        <CodeBlock language="swift" code={`
// JS-разработчикам будет знакома идея merge-конфигурации:
struct AppConfig {
    var apiURL: String?
    var timeout: Int?
    var retries: Int?
    var logLevel: String?
    var features: [String: Bool]?
}

func resolveConfig(
    user: AppConfig?,
    env: AppConfig?,
    defaults: AppConfig
) -> AppConfig {
    // Паттерн: user overrides env overrides defaults
    return AppConfig(
        apiURL: user?.apiURL ?? env?.apiURL ?? defaults.apiURL,
        timeout: user?.timeout ?? env?.timeout ?? defaults.timeout,
        retries: user?.retries ?? env?.retries ?? defaults.retries,
        logLevel: user?.logLevel ?? env?.logLevel ?? defaults.logLevel,
        features: mergeDicts(
            user?.features,
            env?.features,
            defaults.features
        )
    )
}

// JS эквивалент: { ...defaults, ...env, ...user }
// В Swift нет spread для struct, но ?? делает то же самое
// с полным контролем приоритетов.

func mergeDicts(_ dicts: [String: Bool]?...) -> [String: Bool] {
    var result: [String: Bool] = [:]
    // Проходим от самого низкого приоритета к высшему
    for dict in dicts.reversed() {
        if let dict {
            result.merge(dict) { _, new in new }
        }
    }
    return result
}
`} />
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ИТОГОВАЯ ВИЗУАЛЬНАЯ КАРТА
          ════════════════════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🗺️ Карта принятия решений: «Как работать с Optional?»</h2>
        <p>
          Используйте эту карту как быстрый гайд по выбору подхода к опционалам.
        </p>

        {/* ─── Decision tree diagram ─── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          margin: '24px 0',
          fontSize: '0.85rem',
        }}>
          {/* Вопрос 1 */}
          <div style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, var(--accent-blue), #42A5F5)',
            borderRadius: '24px',
            color: '#fff',
            fontWeight: 700,
            textAlign: 'center',
          }}>
            У тебя есть Optional?
          </div>
          <div style={{ fontSize: '1.2rem' }}>⬇️</div>

          {/* Варианты */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            width: '100%',
          }}>
            {/* Нужно значение или дефолт */}
            <div style={{
              padding: '14px',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              border: '2px solid #66BB6A',
              textAlign: 'center',
            }}>
              <div style={{ fontWeight: 700, color: '#66BB6A', marginBottom: 6 }}>
                Нужен дефолт?
              </div>
              <div style={{ fontSize: '1.2rem', margin: '8px 0' }}>⬇️</div>
              <div style={{
                padding: '8px',
                background: 'rgba(102,187,106,0.15)',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontWeight: 600,
              }}>
                value ?? default
              </div>
            </div>

            {/* Нужно трансформировать */}
            <div style={{
              padding: '14px',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              border: '2px solid #AB47BC',
              textAlign: 'center',
            }}>
              <div style={{ fontWeight: 700, color: '#AB47BC', marginBottom: 6 }}>
                Нужно трансформировать?
              </div>
              <div style={{ fontSize: '1.2rem', margin: '8px 0' }}>⬇️</div>
              <div style={{
                padding: '8px',
                background: 'rgba(171,71,188,0.15)',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontWeight: 600,
              }}>
                value.map {'{ ... }'}
              </div>
            </div>

            {/* Цепочка доступа */}
            <div style={{
              padding: '14px',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              border: '2px solid #FF7043',
              textAlign: 'center',
            }}>
              <div style={{ fontWeight: 700, color: '#FF7043', marginBottom: 6 }}>
                Цепочка свойств?
              </div>
              <div style={{ fontSize: '1.2rem', margin: '8px 0' }}>⬇️</div>
              <div style={{
                padding: '8px',
                background: 'rgba(255,112,67,0.15)',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontWeight: 600,
              }}>
                a?.b?.c?.d
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            width: '100%',
            marginTop: '4px',
          }}>
            {/* Использовать значение */}
            <div style={{
              padding: '14px',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              border: '2px solid #29B6F6',
              textAlign: 'center',
            }}>
              <div style={{ fontWeight: 700, color: '#29B6F6', marginBottom: 6 }}>
                Использовать значение?
              </div>
              <div style={{ fontSize: '1.2rem', margin: '8px 0' }}>⬇️</div>
              <div style={{
                padding: '8px',
                background: 'rgba(41,182,246,0.15)',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontWeight: 600,
              }}>
                if let / guard let
              </div>
            </div>

            {/* Несколько вариантов */}
            <div style={{
              padding: '14px',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              border: '2px solid #FFA726',
              textAlign: 'center',
            }}>
              <div style={{ fontWeight: 700, color: '#FFA726', marginBottom: 6 }}>
                Несколько case?
              </div>
              <div style={{ fontSize: '1.2rem', margin: '8px 0' }}>⬇️</div>
              <div style={{
                padding: '8px',
                background: 'rgba(255,167,38,0.15)',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontWeight: 600,
              }}>
                switch + pattern
              </div>
            </div>

            {/* 100% уверен что не nil */}
            <div style={{
              padding: '14px',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              border: '2px solid #EF5350',
              textAlign: 'center',
            }}>
              <div style={{ fontWeight: 700, color: '#EF5350', marginBottom: 6 }}>
                100% не nil?
              </div>
              <div style={{ fontSize: '1.2rem', margin: '8px 0' }}>⬇️</div>
              <div style={{
                padding: '8px',
                background: 'rgba(239,83,80,0.15)',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontWeight: 600,
              }}>
                value! ⚠️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ADVANCED TIPS
          ════════════════════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>🧩 Продвинутые паттерны</h2>

        <h3>Optional в протоколах и дженериках</h3>
        <CodeBlock language="swift" code={`
// Протокол с опциональными требованиями (через default implementation):
protocol Configurable {
    var title: String { get }
    var subtitle: String? { get }  // опциональное свойство
    var icon: String? { get }      // опциональное свойство
}

extension Configurable {
    var subtitle: String? { nil }  // дефолт — nil
    var icon: String? { nil }      // дефолт — nil
}

// Теперь можно реализовать только то, что нужно:
struct SimpleItem: Configurable {
    let title: String
    // subtitle и icon — nil по умолчанию
}

struct DetailedItem: Configurable {
    let title: String
    let subtitle: String?
    let icon: String?
}
`} />

        <h3>Optional + Generic — мощная комбинация</h3>
        <CodeBlock language="swift" code={`
// Generic функция, работающая с Optional<T>:
func unwrapOrThrow<T>(_ optional: T?, error: Error) throws -> T {
    guard let value = optional else {
        throw error
    }
    return value
}

// Использование:
enum AppError: Error {
    case missingData, invalidInput
}

let name: String? = nil
do {
    let value = try unwrapOrThrow(name, error: AppError.missingData)
    print(value)
} catch {
    print("Ошибка: \\(error)")  // Ошибка: missingData
}

// Расширение Optional для удобства:
extension Optional {
    func orThrow(_ error: Error) throws -> Wrapped {
        guard let self else { throw error }
        return self
    }
}

// Элегантный синтаксис:
let email = try formData.email.orThrow(ValidationError.missingEmail)
`} />

        <h3>Optional + Result — обработка ошибок</h3>
        <CodeBlock language="swift" code={`
// Конвертация между Optional и Result:
extension Optional {
    func toResult<E: Error>(orError error: E) -> Result<Wrapped, E> {
        switch self {
        case .some(let value):
            return .success(value)
        case .none:
            return .failure(error)
        }
    }
}

// Optional → Result:
let user: User? = findUser(id: 42)
let result = user.toResult(orError: AppError.userNotFound)

// Result → Optional:
let name: String? = try? fetchName()  // Result<String, Error> → String?

// Цепочка Result + Optional:
func processPayment(userId: Int) -> Result<Receipt, PaymentError> {
    guard let user = findUser(id: userId) else {
        return .failure(.userNotFound)
    }
    guard let card = user.defaultCard else {
        return .failure(.noPaymentMethod)
    }
    guard let receipt = charge(card: card, amount: 99.99) else {
        return .failure(.chargeFailed)
    }
    return .success(receipt)
}
`} />
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ИТОГИ
          ════════════════════════════════════════════════════════════════════ */}
      <section className="card">
        <h2>📝 Итоги: Optional за 60 секунд</h2>

        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Инструмент</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Синтаксис</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Когда использовать</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>JS аналог</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['if let', 'if let x = opt { }', 'Нужно значение внутри блока', 'if (x != null)'],
              ['guard let', 'guard let x = opt else { return }', 'Ранний выход из функции', 'if (!x) return'],
              ['??', 'opt ?? default', 'Нужен дефолт', '?? или ||'],
              ['?.', 'a?.b?.c', 'Цепочка доступа', '?.'],
              ['!', 'opt!', '100% уверен (осторожно!)', '— (TypeError)'],
              ['map', 'opt.map { f($0) }', 'Трансформация', 'x && f(x)'],
              ['flatMap', 'opt.flatMap { g($0) }', 'Трансформация → Optional', '—'],
              ['switch', 'switch opt { case let x?: }', 'Сложная логика', 'switch + null check'],
              ['compactMap', '[opts].compactMap { $0 }', 'Фильтрация nil из массива', '.filter(Boolean)'],
            ].map(([tool, syntax, when, js]) => (
              <tr key={tool}>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>{tool}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace', fontSize: '0.8rem' }}>{syntax}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>{when}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace', fontSize: '0.8rem' }}>{js}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="info-box">
          <strong>🎓 Главный урок для JS-разработчика:</strong> В Swift отсутствие значения — это
          не баг и не «забыли проверить». Это <strong>часть системы типов</strong>. Компилятор
          заставляет вас обработать каждый <code>nil</code> явно. Это непривычно первые дни,
          но потом вы удивитесь, как жили без этого в JavaScript. Меньше <code>undefined is not a function</code>{' '}
          — больше уверенности в коде.
        </div>
      </section>
    </div>
  )
}
