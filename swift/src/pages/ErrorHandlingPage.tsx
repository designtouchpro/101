import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

export default function ErrorHandlingPage() {
  const [activeTab, setActiveTab] = useState<'doCatch' | 'result' | 'optional'>('doCatch')

  return (
    <div className="demo-container">
      <h1>🚨 Error Handling</h1>
      <p>
        Swift имеет строгую систему обработки ошибок на уровне языка. В отличие от JavaScript,
        где <code>try/catch</code> — опционален и любая функция может бросить исключение,
        в Swift компилятор <strong>заставляет</strong> обработать ошибку. Функция, которая может
        бросить ошибку, должна быть помечена <code>throws</code>, и вызов обязан быть в <code>do-catch</code>
        или использовать <code>try?</code> / <code>try!</code>.
      </p>

      {/* ─── Схема: три подхода ─── */}
      <section className="card">
        <h2>🗺️ Три способа обработки ошибок</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '20px 0' }}>
          {[
            { key: 'doCatch' as const, label: 'do-catch', icon: '🛡️', color: '#4CAF50', desc: 'Полная обработка каждого типа ошибки' },
            { key: 'result' as const, label: 'Result<T,E>', icon: '📦', color: '#2196F3', desc: 'Функциональный подход без throws' },
            { key: 'optional' as const, label: 'try? / try!', icon: '❓', color: '#FF9800', desc: 'Преобразование в Optional или крэш' },
          ].map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
              flex: '1 1 200px',
              padding: 16,
              background: activeTab === t.key ? t.color + '22' : 'var(--bg-tertiary)',
              border: `2px solid ${activeTab === t.key ? t.color : 'transparent'}`,
              borderRadius: 12,
              cursor: 'pointer',
              textAlign: 'left',
              color: 'var(--text-primary)',
            }}>
              <div style={{ fontSize: '1.3rem', marginBottom: 4 }}>{t.icon} {t.label}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{t.desc}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ─── Error протокол ─── */}
      <section className="card">
        <h2>📝 Определение ошибок</h2>
        <p>
          Ошибки в Swift — это типы, конформящие протокол <code>Error</code> (обычно enum).
          Каждый case описывает конкретный тип ошибки с возможными associated values.
        </p>
        <CodeBlock language="swift" code={`// Определение ошибок (обычно enum)
enum NetworkError: Error {
    case noConnection
    case timeout(seconds: Int)
    case serverError(code: Int, message: String)
    case decodingFailed(underlying: Error)
    case unauthorized
}

// Более детальное описание через LocalizedError
extension NetworkError: LocalizedError {
    var errorDescription: String? {
        switch self {
        case .noConnection:
            return "Нет подключения к интернету"
        case .timeout(let seconds):
            return "Таймаут после \\(seconds) секунд"
        case .serverError(let code, let message):
            return "Ошибка сервера \\(code): \\(message)"
        case .decodingFailed:
            return "Ошибка парсинга данных"
        case .unauthorized:
            return "Требуется авторизация"
        }
    }
}

// Сравнение с JS/TS:
// JS: class NetworkError extends Error { constructor(message) { super(message) } }
// Swift: enum + Error protocol — типобезопасно и с pattern matching`} />
      </section>

      {/* ─── do-catch ─── */}
      {activeTab === 'doCatch' && (
        <section className="card">
          <h2>🛡️ do-catch — полная обработка</h2>
          <p>
            Основной механизм. Компилятор гарантирует, что <code>throws</code>-функция вызвана
            с <code>try</code> внутри <code>do-catch</code>. Если <code>catch</code> не покрывает
            все варианты, нужен generic <code>catch</code>.
          </p>
          <CodeBlock language="swift" code={`// Функция, которая может бросить ошибку
func fetchUser(id: Int) throws -> User {
    guard id > 0 else {
        throw NetworkError.serverError(code: 400, message: "Invalid ID")
    }
    guard isConnected else {
        throw NetworkError.noConnection
    }
    // ... запрос к серверу
    return User(id: id, name: "Анна")
}

// Обработка
do {
    let user = try fetchUser(id: 1)
    print("Получен: \\(user.name)")
} catch NetworkError.noConnection {
    showOfflineAlert()
} catch NetworkError.serverError(let code, let message) {
    print("Сервер: \\(code) — \\(message)")
} catch NetworkError.unauthorized {
    navigateToLogin()
} catch {
    // Обязательный generic catch для остальных ошибок
    print("Неизвестная ошибка: \\(error)")
}

// Пробрасывание ошибки выше (rethrows):
func loadData() throws -> Data {
    let user = try fetchUser(id: 1)   // пробрасывает ошибку
    return try encode(user)           // и эту тоже
}`} />

          <h3>Swift 5.5+: throws с typed errors (Swift 6)</h3>
          <CodeBlock language="swift" code={`// Swift 6: typed throws — указываем конкретный тип ошибки
func fetchUser(id: Int) throws(NetworkError) -> User {
    // теперь компилятор знает, что может быть только NetworkError
    throw .noConnection  // не нужно писать NetworkError.noConnection
}

// В catch — точный тип без приведения
do {
    let user = try fetchUser(id: 1)
} catch {
    // error уже типа NetworkError (не any Error!)
    switch error {
    case .noConnection: break
    case .timeout(let s): break
    // exhaustive matching!
    }
}`} />
        </section>
      )}

      {/* ─── Result ─── */}
      {activeTab === 'result' && (
        <section className="card">
          <h2>📦 Result&lt;Success, Failure&gt;</h2>
          <p>
            <code>Result</code> — enum с двумя case: <code>.success(T)</code> и <code>.failure(Error)</code>.
            Полезен для async callbacks, хранения результата и передачи между слоями.
            Аналог в TypeScript — паттерн <code>{`{ ok: true, data: T } | { ok: false, error: E }`}</code>.
          </p>
          <CodeBlock language="swift" code={`// Result — это enum:
// enum Result<Success, Failure: Error> {
//     case success(Success)
//     case failure(Failure)
// }

func divide(_ a: Double, by b: Double) -> Result<Double, MathError> {
    guard b != 0 else {
        return .failure(.divisionByZero)
    }
    return .success(a / b)
}

enum MathError: Error {
    case divisionByZero
    case overflow
}

// Использование
let result = divide(10, by: 3)

switch result {
case .success(let value):
    print("Результат: \\(value)")   // 3.333...
case .failure(let error):
    print("Ошибка: \\(error)")
}

// Удобные методы Result:
let value = try result.get()         // throws если failure
let mapped = result.map { $0 * 100 } // Result<Double, MathError>
let flat = result.flatMap { processValue($0) }  // chain

// API callback style (до async/await):
func fetchUser(completion: @escaping (Result<User, NetworkError>) -> Void) {
    URLSession.shared.dataTask(with: url) { data, response, error in
        if let error = error {
            completion(.failure(.noConnection))
            return
        }
        guard let data = data else {
            completion(.failure(.noConnection))
            return
        }
        do {
            let user = try JSONDecoder().decode(User.self, from: data)
            completion(.success(user))
        } catch {
            completion(.failure(.decodingFailed(underlying: error)))
        }
    }.resume()
}`} />

          <div className="feature-grid">
            <div className="feature-card">
              <h3>Swift Result</h3>
              <CodeBlock language="swift" code={`let r: Result<Int, Error> = .success(42)

switch r {
case .success(let v): print(v)
case .failure(let e): print(e)
}

// map, flatMap, get()
let doubled = r.map { $0 * 2 }`} />
            </div>
            <div className="feature-card">
              <h3>TypeScript аналог</h3>
              <CodeBlock language="swift" code={`type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E }

const r: Result<number, Error> =
  { ok: true, value: 42 }

if (r.ok) console.log(r.value)
else console.log(r.error)`} />
            </div>
          </div>
        </section>
      )}

      {/* ─── try? / try! ─── */}
      {activeTab === 'optional' && (
        <section className="card">
          <h2>❓ try? и try! — краткие формы</h2>
          <p>
            Когда полная обработка каждой ошибки избыточна, Swift предлагает сокращённые формы:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, margin: '20px 0' }}>
            <div style={{ padding: 16, background: '#FF980022', border: '2px solid #FF9800', borderRadius: 12 }}>
              <h3 style={{ color: '#FF9800', margin: '0 0 8px' }}>try? — конвертация в Optional</h3>
              <p style={{ fontSize: '0.85rem', margin: 0 }}>
                Успех → <code>Optional(value)</code>, ошибка → <code>nil</code>.
                Информация об ошибке теряется.
              </p>
            </div>
            <div style={{ padding: 16, background: '#f4433622', border: '2px solid #f44336', borderRadius: 12 }}>
              <h3 style={{ color: '#f44336', margin: '0 0 8px' }}>try! — принудительный unwrap</h3>
              <p style={{ fontSize: '0.85rem', margin: 0 }}>
                Если ошибка произойдёт — <strong>runtime crash</strong>.
                Использовать только когда 100% уверены в успехе.
              </p>
            </div>
          </div>

          <CodeBlock language="swift" code={`// try? — результат Optional
let user = try? fetchUser(id: 1)      // User? — nil при ошибке

// Удобно с guard/if let:
guard let user = try? fetchUser(id: 1) else {
    print("Не удалось загрузить")
    return
}
// user: User (не Optional)

// Удобно в цепочке:
let name = try? fetchUser(id: 1).name ?? "Unknown"

// Множественные fallback:
let data = try? loadFromCache()
         ?? try? loadFromNetwork()
         ?? defaultData

// ─── try! — crash при ошибке ───
// ⚠️ Только когда ошибка невозможна:
let config = try! JSONDecoder().decode(Config.self, from: bundledJSON)
// Если JSON в бандле битый — крэш при запуске (лучше узнать сразу)

// ⚠️ НИКОГДА для сетевых запросов или пользовательского ввода!
// let user = try! fetchUser(id: -1)  // 💥 крэш`} />

          <div className="info-box">
            <strong>🎯 Когда что использовать:</strong>
            <ul className="info-list">
              <li><code>do-catch</code> — когда нужно обработать разные ошибки по-разному</li>
              <li><code>try?</code> — когда неважно какая именно ошибка (fallback/optional chaining)</li>
              <li><code>try!</code> — только для гарантированно безопасных операций (bundled ресурсы, тесты)</li>
              <li><code>Result</code> — для async/callbacks или хранения результата</li>
            </ul>
          </div>
        </section>
      )}

      {/* ─── defer ─── */}
      <section className="card">
        <h2>🔄 defer — очистка ресурсов</h2>
        <p>
          <code>defer</code> гарантирует выполнение блока кода при выходе из текущей области видимости —
          независимо от того, был ли выход нормальным, через return, throw или break.
          Аналог <code>finally</code> в JS, но привязан к скоупу, а не к try.
        </p>
        <CodeBlock language="swift" code={`func processFile(path: String) throws -> Data {
    let file = try openFile(path)
    defer {
        file.close()  // ГАРАНТИРОВАННО закроется
    }

    let data = try file.read()
    guard data.count > 0 else {
        throw FileError.empty  // defer сработает и здесь
    }

    return transform(data)    // и здесь тоже
}

// Несколько defer — выполняются в обратном порядке (LIFO):
func example() {
    defer { print("1") }
    defer { print("2") }
    defer { print("3") }
    print("start")
}
// Вывод: start, 3, 2, 1

// Реальный пример: lock/unlock
func updateSharedState() {
    lock.lock()
    defer { lock.unlock() }  // всегда разблокируется

    // мутация shared state...
    sharedArray.append(newItem)
}`} />
      </section>

      {/* ─── Сравнение с JS ─── */}
      <section className="card">
        <h2>🔄 Сравнение с JavaScript/TypeScript</h2>
        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Аспект</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Swift</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>JavaScript</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Объявление', 'func f() throws', 'Любая функция может throw'],
              ['Компилятор заставляет?', '✅ Да, try обязателен', '❌ Нет, catch опционален'],
              ['Типы ошибок', 'Error protocol (enum)', 'Любое значение (even string)'],
              ['Pattern matching', '✅ catch ErrorType.case', '❌ instanceof вручную'],
              ['Checked exceptions', '✅ throws в сигнатуре', '❌ Нет (кроме TypeScript)'],
              ['Очистка', 'defer { }', 'finally { }'],
              ['Функциональный', 'Result<T, E>', 'Нет стандартного'],
            ].map(([aspect, swift, js]) => (
              <tr key={aspect}>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>{aspect}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>{swift}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>{js}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
