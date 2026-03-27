import CodeBlock from '../components/CodeBlock'

export default function ConcurrencyPage() {
  return (
    <div className="demo-container">
      <h1>⚡ Concurrency — async/await и акторы</h1>
      <p>
        Swift 5.5 (2021) принёс встроенную модель конкурентности: <code>async/await</code>,
        структурированные задачи (<code>Task</code>, <code>TaskGroup</code>) и <code>actor</code>
        для безопасного доступа к shared state. Это заменило callback hell и dispatch queues
        более безопасным и читаемым подходом. Если вы знаете <code>async/await</code> из JavaScript —
        основная идея та же, но Swift добавляет compile-time safety.
      </p>

      {/* ─── Схема: эволюция ─── */}
      <section className="card">
        <h2>🗺️ Эволюция async кода в Swift</h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          margin: '20px 0',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {[
            { label: 'Callbacks', year: '2014', color: '#f44336', desc: 'Callback hell, пирамида doom' },
            { label: 'Combine', year: '2019', color: '#FF9800', desc: 'Reactive streams, Publishers' },
            { label: 'async/await', year: '2021', color: '#4CAF50', desc: 'Линейный async код' },
            { label: 'Actors', year: '2021', color: '#2196F3', desc: 'Thread-safe shared state' },
          ].map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && <span style={{ fontSize: '1.5rem' }}>→</span>}
              <div style={{
                padding: '12px 20px',
                background: s.color + '22',
                border: `2px solid ${s.color}`,
                borderRadius: 12,
                textAlign: 'center',
                minWidth: 120,
              }}>
                <div style={{ fontWeight: 700, color: s.color }}>{s.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.year}</div>
                <div style={{ fontSize: '0.78rem', marginTop: 4 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── async/await ─── */}
      <section className="card">
        <h2>📝 async/await — основы</h2>
        <p>
          Функция, помеченная <code>async</code>, может «приостановиться» (suspend) на await-точке,
          освободив поток для другой работы. Это не блокировка потока, а кооперативная многозадачность.
        </p>
        <CodeBlock language="swift" code={`// Async функция
func fetchUser(id: Int) async throws -> User {
    let url = URL(string: "https://api.example.com/users/\\(id)")!
    let (data, response) = try await URLSession.shared.data(from: url)

    guard let http = response as? HTTPURLResponse,
          http.statusCode == 200 else {
        throw NetworkError.serverError
    }

    return try JSONDecoder().decode(User.self, from: data)
}

// Вызов
func loadProfile() async {
    do {
        let user = try await fetchUser(id: 1)
        // Обновление UI — автоматически на MainActor
        print("Загружен: \\(user.name)")
    } catch {
        print("Ошибка: \\(error)")
    }
}

// ❗ async функцию можно вызвать только из async контекста
// или из Task { }:`} />

        <h3>Сравнение: callback vs async/await</h3>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>❌ Callbacks (старый способ)</h3>
            <CodeBlock language="swift" code={`func loadData(completion: @escaping (Result<Data, Error>) -> Void) {
    fetchUser(id: 1) { userResult in
        switch userResult {
        case .success(let user):
            fetchPosts(for: user) { postsResult in
                switch postsResult {
                case .success(let posts):
                    fetchComments(for: posts) { commentsResult in
                        // 😱 Callback hell!
                        completion(commentsResult)
                    }
                case .failure(let error):
                    completion(.failure(error))
                }
            }
        case .failure(let error):
            completion(.failure(error))
        }
    }
}`} />
          </div>
          <div className="feature-card">
            <h3>✅ async/await</h3>
            <CodeBlock language="swift" code={`func loadData() async throws -> Data {
    let user = try await fetchUser(id: 1)
    let posts = try await fetchPosts(for: user)
    let comments = try await fetchComments(for: posts)
    return comments
}

// Линейный, читаемый код
// Ошибки обрабатываются через throws
// Нет вложенности`} />
          </div>
        </div>
      </section>

      {/* ─── Task ─── */}
      <section className="card">
        <h2>🔄 Task — запуск async кода</h2>
        <p>
          <code>Task</code> создаёт async-контекст из синхронного кода. Это точка входа
          в async мир (аналог top-level await в JS modules).
        </p>
        <CodeBlock language="swift" code={`// Создание Task из синхронного контекста (например, viewDidLoad, body)
Task {
    let user = try await fetchUser(id: 1)
    // Используем результат
}

// Task с приоритетом
Task(priority: .high) {
    await processImportantData()
}

// Отменяемая задача
let task = Task {
    for i in 0..<1000 {
        try Task.checkCancellation()  // бросит CancellationError
        await processItem(i)
    }
}

// Отмена через некоторое время
task.cancel()  // сигнализирует задаче об отмене

// Проверка отмены внутри задачи:
if Task.isCancelled {
    // cleanup...
    return
}

// Task.sleep — async аналог Thread.sleep
try await Task.sleep(nanoseconds: 1_000_000_000) // 1 сек
try await Task.sleep(for: .seconds(1))            // Swift 5.7+`} />
      </section>

      {/* ─── async let / TaskGroup ─── */}
      <section className="card">
        <h2>⚡ Параллельное выполнение</h2>
        <p>
          По умолчанию <code>await</code> — последовательный. Для параллельного выполнения
          используйте <code>async let</code> или <code>TaskGroup</code>.
        </p>

        <h3>async let — параллельные привязки</h3>
        <CodeBlock language="swift" code={`// ❌ Последовательно — второй запрос ждёт первый
let user = try await fetchUser(id: 1)       // 2 сек
let posts = try await fetchPosts(for: user) // 1 сек
// Итого: 3 секунды

// ✅ Параллельно — запросы идут одновременно
async let user = fetchUser(id: 1)           // запуск
async let friends = fetchFriends(id: 1)     // запуск
async let avatar = fetchAvatar(id: 1)       // запуск

// await только при использовании результата:
let profile = try await Profile(
    user: user,
    friends: friends,
    avatar: avatar
)
// Итого: max(2, 1, 1) = 2 секунды`} />

        <h3>TaskGroup — динамическое число задач</h3>
        <CodeBlock language="swift" code={`// Когда количество параллельных задач неизвестно заранее
func fetchAllUsers(ids: [Int]) async throws -> [User] {
    try await withThrowingTaskGroup(of: User.self) { group in
        for id in ids {
            group.addTask {
                try await fetchUser(id: id)
            }
        }

        var users: [User] = []
        for try await user in group {
            users.append(user)
        }
        return users
    }
}

// Аналогия с JS:
// Promise.all(ids.map(id => fetchUser(id)))`} />

        <div className="info-box">
          <strong>💡 Structured Concurrency:</strong> В Swift задачи образуют дерево. Родительская задача
          не завершится, пока не завершатся все дочерние. Отмена родителя автоматически отменяет детей.
          В JS <code>Promise.all</code> не отменяет другие при ошибке одного.
        </div>
      </section>

      {/* ─── Actor ─── */}
      <section className="card">
        <h2>🏛️ Actors — thread-safe shared state</h2>
        <p>
          <code>actor</code> — новый тип данных (наряду с struct, class, enum), который
          <strong>гарантирует</strong> безопасный доступ к своим свойствам из разных потоков.
          Доступ к свойствам actor&apos;а — всегда async (через await). Компилятор проверяет это
          на этапе компиляции — data race невозможен.
        </p>
        <CodeBlock language="swift" code={`// Объявление актора
actor BankAccount {
    let owner: String
    private(set) var balance: Double

    init(owner: String, balance: Double) {
        self.owner = owner
        self.balance = balance
    }

    func deposit(_ amount: Double) {
        balance += amount  // безопасно — внутри actor
    }

    func withdraw(_ amount: Double) throws {
        guard balance >= amount else {
            throw BankError.insufficientFunds
        }
        balance -= amount
    }
}

// Использование — await обязателен для actor properties
let account = BankAccount(owner: "Анна", balance: 1000)

// ✅ Из async контекста:
await account.deposit(500)
let balance = await account.balance  // 1500

// ❌ Из синхронного — ошибка компиляции:
// let b = account.balance  // Error: must be async

// Безопасно из нескольких Tasks:
Task { await account.deposit(100) }
Task { await account.deposit(200) }
// Нет race condition — actor сериализует доступ`} />
      </section>

      {/* ─── MainActor ─── */}
      <section className="card">
        <h2>🖥️ @MainActor — обновление UI</h2>
        <p>
          В iOS обновление UI допустимо только из main thread. <code>@MainActor</code> —
          глобальный actor, гарантирующий выполнение на main thread. В UIKit использовали
          <code>DispatchQueue.main.async</code>, теперь — <code>@MainActor</code>.
        </p>
        <CodeBlock language="swift" code={`// Пометить функцию
@MainActor
func updateUI(with user: User) {
    nameLabel.text = user.name
    avatarView.image = user.avatar
}

// Пометить весь класс/struct
@MainActor
class ProfileViewController: UIViewController {
    // Все свойства и методы — на main thread
    var user: User?

    func loadProfile() {
        Task {
            let user = try await fetchUser(id: 1)
            // Мы уже на MainActor — можно обновлять UI!
            self.user = user
            tableView.reloadData()
        }
    }
}

// В SwiftUI — @MainActor на ObservableObject:
@MainActor
class ProfileViewModel: ObservableObject {
    @Published var user: User?
    @Published var isLoading = false

    func load() async {
        isLoading = true
        user = try? await fetchUser(id: 1)
        isLoading = false
    }
}`} />
      </section>

      {/* ─── Sendable ─── */}
      <section className="card">
        <h2>📨 Sendable — безопасная передача между потоками</h2>
        <p>
          Протокол <code>Sendable</code> гарантирует, что значение можно безопасно передать
          из одного потока (actor, Task) в другой. Value types (struct, enum) — автоматически Sendable
          если все их свойства Sendable. Classes — нужно явно конформить и обеспечить thread safety.
        </p>
        <CodeBlock language="swift" code={`// Struct — автоматически Sendable (если все поля Sendable)
struct UserDTO: Sendable {
    let id: Int
    let name: String
}

// Class — нужна осторожность
final class Cache: @unchecked Sendable {
    private let lock = NSLock()
    private var storage: [String: Data] = [:]

    func get(_ key: String) -> Data? {
        lock.lock()
        defer { lock.unlock() }
        return storage[key]
    }
}

// @Sendable — для замыканий
Task { @Sendable in
    // замыкание может безопасно использоваться в другом потоке
}

// Компилятор предупредит, если передаёте non-Sendable:
// ⚠️ "Capture of non-sendable type 'MutableClass'"`} />

        <div className="info-box">
          <strong>💡 Swift 6 Strict Concurrency:</strong> В Swift 6 (Xcode 16) включён строгий режим
          конкурентности по умолчанию. Компилятор проверяет все передачи между isolation domains
          на Sendable. Это исключает data races на уровне компиляции — первый mainstream язык
          с такой гарантией.
        </div>
      </section>

      {/* ─── Сравнение с JS ─── */}
      <section className="card">
        <h2>🔄 Сравнение с JavaScript</h2>
        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Концепция</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Swift</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>JavaScript</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['async функция', 'func f() async', 'async function f()'],
              ['Ожидание', 'await / try await', 'await'],
              ['Параллельно', 'async let / TaskGroup', 'Promise.all()'],
              ['Thread safety', 'Actor (compile-time)', 'Нет (single-threaded)'],
              ['Отмена', 'Task.cancel() + checkCancellation', 'AbortController'],
              ['UI thread', '@MainActor', 'Всё на main thread'],
              ['Потоки', 'Реальные (thread pool)', 'Event loop (1 поток)'],
            ].map(([concept, swift, js]) => (
              <tr key={concept}>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>{concept}</td>
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
