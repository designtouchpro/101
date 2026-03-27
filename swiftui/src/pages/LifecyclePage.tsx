import CodeBlock from '../components/CodeBlock'

export default function LifecyclePage() {
  return (
    <div className="demo-container">
      <h1>♻️ View Lifecycle — Жизненный цикл в SwiftUI</h1>
      <p>
        В React весь жизненный цикл сводится к <code>useEffect</code>. В SwiftUI — набор специализированных
        модификаторов: каждый отвечает за конкретную фазу. Это делает код явнее и безопаснее.
      </p>

      {/* ─── Overview diagram ─── */}
      <section className="card">
        <h2>🗺️ Обзор: React useEffect → SwiftUI модификаторы</h2>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px',
          padding: '20px', borderRadius: '12px',
          background: 'var(--bg-secondary, #f8f9fa)', marginBottom: '16px'
        }}>
          <div style={{ padding: '16px', borderRadius: '8px', background: '#007AFF', color: '#fff' }}>
            <strong>React</strong>
            <ul className="info-list">
              <li><code>useEffect(fn, [])</code> — mount</li>
              <li><code>useEffect(fn, [dep])</code> — watch</li>
              <li><code>return cleanup</code> — unmount</li>
              <li><code>useLayoutEffect</code> — sync</li>
            </ul>
          </div>
          <div style={{ padding: '16px', borderRadius: '8px', background: '#34C759', color: '#fff' }}>
            <strong>SwiftUI</strong>
            <ul className="info-list">
              <li><code>.onAppear</code> — mount</li>
              <li><code>.onChange(of:)</code> — watch</li>
              <li><code>.onDisappear</code> — unmount</li>
              <li><code>.task</code> — async mount</li>
              <li><code>.onReceive</code> — publisher</li>
            </ul>
          </div>
        </div>

        <div className="info-box">
          <strong>💡 Ключевое отличие:</strong> В React <code>useEffect</code> — универсальный инструмент.
          В SwiftUI каждая фаза жизненного цикла имеет отдельный модификатор, что снижает
          вероятность ошибок (забытый cleanup, лишние зависимости).
        </div>
      </section>

      {/* ─── .onAppear ─── */}
      <section className="card">
        <h2>👋 .onAppear — «componentDidMount»</h2>
        <p>
          Вызывается, когда View появляется на экране. Это основной способ запустить side-effect
          при показе экрана. Аналог <code>useEffect(fn, [])</code>.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>SwiftUI</h3>
            <CodeBlock language="swift" code={`
struct ProfileView: View {
    @State private var user: User?
    
    var body: some View {
        VStack {
            if let user {
                Text("Привет, \\(user.name)!")
            } else {
                ProgressView()
            }
        }
        .onAppear {
            // Вызывается при появлении на экране
            print("ProfileView appeared!")
            loadUser()
        }
    }
    
    func loadUser() {
        // синхронная загрузка / инициализация
        user = User(name: "Анна")
    }
}
`} />
          </div>
          <div className="feature-card">
            <h3>React эквивалент</h3>
            <CodeBlock language="swift" code={`
function ProfileView() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log("ProfileView mounted!")
    loadUser()
  }, []) // пустой массив = mount

  function loadUser() {
    setUser({ name: "Анна" })
  }

  return (
    <div>
      {user 
        ? <p>Привет, {user.name}!</p>
        : <Spinner />
      }
    </div>
  )
}
`} />
          </div>
        </div>

        <div className="info-box">
          <strong>⚠️ Особенность:</strong> <code>.onAppear</code> может вызываться повторно —
          например, при возврате к экрану в <code>NavigationStack</code>. В React <code>useEffect(fn, [])</code>
          вызывается один раз (+ повтор в dev mode из-за StrictMode).
        </div>
      </section>

      {/* ─── .onDisappear ─── */}
      <section className="card">
        <h2>👋 .onDisappear — cleanup</h2>
        <p>
          Вызывается, когда View уходит с экрана. Аналог функции cleanup из <code>useEffect</code>.
          Используется для отписки, сохранения, логирования.
        </p>

        <CodeBlock language="swift" title=".onDisappear — очистка ресурсов" code={`
struct TimerView: View {
    @State private var seconds = 0
    @State private var timer: Timer?
    
    var body: some View {
        Text("⏱ \\(seconds) сек")
            .font(.largeTitle)
            .onAppear {
                // Запускаем таймер при появлении
                timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { _ in
                    seconds += 1
                }
            }
            .onDisappear {
                // Останавливаем при уходе (cleanup!)
                timer?.invalidate()
                timer = nil
                print("Timer invalidated. Ran for \\(seconds) sec")
            }
    }
}

// React эквивалент:
// useEffect(() => {
//     const id = setInterval(() => setSeconds(s => s + 1), 1000)
//     return () => clearInterval(id) // cleanup
// }, [])
`} />
      </section>

      {/* ─── .task ─── */}
      <section className="card">
        <h2>⚡ .task — async onAppear с авто-отменой</h2>
        <p>
          <code>.task</code> — самый мощный модификатор для загрузки данных. Запускает async-код
          при появлении View и <strong>автоматически отменяет</strong> задачу при исчезновении.
          В React для этого нужен <code>AbortController</code>.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>SwiftUI .task</h3>
            <CodeBlock language="swift" code={`
struct PostsView: View {
    @State private var posts: [Post] = []
    @State private var error: String?
    
    var body: some View {
        List(posts) { post in
            Text(post.title)
        }
        .task {
            // async код запускается при appear
            // автоматически отменяется при disappear!
            do {
                let url = URL(string: 
                    "https://api.example.com/posts")!
                let (data, _) = try await 
                    URLSession.shared.data(from: url)
                posts = try JSONDecoder()
                    .decode([Post].self, from: data)
            } catch {
                self.error = error.localizedDescription
            }
        }
        .overlay {
            if let error {
                Text("Ошибка: \\(error)")
                    .foregroundStyle(.red)
            }
        }
    }
}
`} />
          </div>
          <div className="feature-card">
            <h3>React эквивалент</h3>
            <CodeBlock language="swift" code={`
function PostsView() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    
    fetch("https://api.example.com/posts", {
      signal: controller.signal
    })
      .then(r => r.json())
      .then(setPosts)
      .catch(e => {
        if (e.name !== 'AbortError') {
          setError(e.message)
        }
      })

    // Ручная отмена при unmount!
    return () => controller.abort()
  }, [])

  return (
    <ul>
      {posts.map(p => <li key={p.id}>{p.title}</li>)}
      {error && <p className="error">{error}</p>}
    </ul>
  )
}
`} />
          </div>
        </div>

        <div className="info-box">
          <strong>🎯 Преимущество .task:</strong> Автоматическая отмена — не нужен <code>AbortController</code>,
          не нужен <code>isMounted</code> флаг. Если пользователь ушёл с экрана до завершения запроса —
          задача отменяется сама. Cooperative cancellation через Swift structured concurrency.
        </div>
      </section>

      {/* ─── .task with id ─── */}
      <section className="card">
        <h2>🔄 .task(id:) — перезапуск при смене зависимости</h2>
        <p>
          <code>.task(id:)</code> перезапускает задачу при изменении <code>id</code>.
          Это аналог <code>useEffect(fn, [dependency])</code> — когда зависимость
          меняется, старая задача отменяется, новая запускается.
        </p>

        <CodeBlock language="swift" title=".task(id:) — аналог useEffect с зависимостями" code={`
struct UserDetailView: View {
    @State private var selectedUserId: Int = 1
    @State private var user: User?
    
    var body: some View {
        VStack {
            // Переключатель пользователя
            Picker("Пользователь", selection: $selectedUserId) {
                Text("Анна").tag(1)
                Text("Борис").tag(2)
                Text("Вера").tag(3)
            }
            .pickerStyle(.segmented)
            
            if let user {
                Text(user.name)
                    .font(.title)
            } else {
                ProgressView()
            }
        }
        // При смене selectedUserId:
        // 1. Предыдущий запрос ОТМЕНЯЕТСЯ
        // 2. Новый запрос ЗАПУСКАЕТСЯ
        .task(id: selectedUserId) {
            user = nil  // reset
            do {
                user = try await fetchUser(id: selectedUserId)
            } catch {
                // CancellationError — нормально, игнорируем
                if !(error is CancellationError) {
                    print("Ошибка: \\(error)")
                }
            }
        }
    }
}

// React эквивалент:
// useEffect(() => {
//     const controller = new AbortController()
//     setUser(null)
//     fetchUser(selectedUserId, controller.signal)
//         .then(setUser)
//         .catch(e => { /* handle */ })
//     return () => controller.abort()
// }, [selectedUserId])  // ← зависимость
`} />
      </section>

      {/* ─── .onChange ─── */}
      <section className="card">
        <h2>👀 .onChange — наблюдение за изменениями</h2>
        <p>
          <code>.onChange(of:)</code> вызывает код при изменении конкретного значения.
          Аналог <code>useEffect</code> с зависимостями, но для синхронных реакций.
        </p>

        <CodeBlock language="swift" title=".onChange — реакция на изменение значения" code={`
struct SearchView: View {
    @State private var query = ""
    @State private var results: [Item] = []
    @State private var debounceTask: Task<Void, Never>?
    
    var body: some View {
        VStack {
            TextField("Поиск...", text: $query)
                .textFieldStyle(.roundedBorder)
            
            List(results) { item in
                Text(item.name)
            }
        }
        // Наблюдаем за изменением query
        .onChange(of: query) { oldValue, newValue in
            // Debounce: отменяем предыдущий запрос
            debounceTask?.cancel()
            debounceTask = Task {
                try? await Task.sleep(for: .milliseconds(300))
                guard !Task.isCancelled else { return }
                await search(query: newValue)
            }
        }
    }
    
    func search(query: String) async {
        // ... выполнить поиск
    }
}

// React эквивалент:
// useEffect(() => {
//     const timer = setTimeout(() => {
//         search(query)
//     }, 300)
//     return () => clearTimeout(timer) // debounce
// }, [query]) // ← зависимость
`} />

        <div className="info-box">
          <strong>📝 Синтаксис:</strong> В Swift 5.9+ <code>.onChange</code> даёт два параметра: <code>oldValue</code> и <code>newValue</code>.
          В старых версиях был только один параметр. Если нужна реакция на <em>начальное</em> значение — используйте <code>.onAppear</code>.
        </div>
      </section>

      {/* ─── .onReceive ─── */}
      <section className="card">
        <h2>📡 .onReceive — подписка на Publisher</h2>
        <p>
          <code>.onReceive</code> подписывает View на Combine Publisher — стрим событий.
          Это как <code>useEffect</code> с подпиской на <code>EventEmitter</code> или <code>Observable</code>.
        </p>

        <CodeBlock language="swift" title=".onReceive — подписка на Publisher" code={`
import Combine

struct ClockView: View {
    @State private var currentTime = Date()
    
    // Timer publisher — Combine стрим
    let timer = Timer.publish(every: 1, on: .main, in: .common)
        .autoconnect()
    
    var body: some View {
        Text(currentTime, format: .dateTime.hour().minute().second())
            .font(.system(.largeTitle, design: .monospaced))
            .onReceive(timer) { time in
                // Вызывается каждую секунду
                currentTime = time
            }
    }
}

// React эквивалент:
// useEffect(() => {
//     const id = setInterval(() => {
//         setTime(new Date())
//     }, 1000)
//     return () => clearInterval(id)
// }, [])

// Другой пример: подписка на уведомления
struct KeyboardAwareView: View {
    @State private var keyboardHeight: CGFloat = 0
    
    var body: some View {
        Text("Клавиатура: \\(Int(keyboardHeight))pt")
            .onReceive(
                NotificationCenter.default.publisher(
                    for: UIResponder.keyboardWillShowNotification
                )
            ) { notification in
                if let frame = notification.userInfo?[
                    UIResponder.keyboardFrameEndUserInfoKey
                ] as? CGRect {
                    keyboardHeight = frame.height
                }
            }
            .onReceive(
                NotificationCenter.default.publisher(
                    for: UIResponder.keyboardWillHideNotification
                )
            ) { _ in
                keyboardHeight = 0
            }
    }
}
`} />
      </section>

      {/* ─── App Lifecycle ─── */}
      <section className="card">
        <h2>🏠 Жизненный цикл приложения — @main и Scene</h2>
        <p>
          SwiftUI-приложение начинается с <code>@main</code> struct, которая описывает Scene-ы.
          Это не компонент — это точка входа, аналог <code>ReactDOM.createRoot</code>.
        </p>

        <CodeBlock language="swift" title="App Lifecycle — точка входа" code={`
import SwiftUI

@main
struct MyApp: App {
    // Глобальные зависимости создаются здесь
    @State private var store = AppStore()
    @State private var authService = AuthService()
    
    // Обработка фазы приложения (active/inactive/background)
    @Environment(\\.scenePhase) var scenePhase
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(store)
                .environment(authService)
        }
        .onChange(of: scenePhase) { oldPhase, newPhase in
            switch newPhase {
            case .active:
                print("Приложение активно")
                // Обновить данные, восстановить таймеры
            case .inactive:
                print("Приложение неактивно")
                // Приостановить анимации
            case .background:
                print("Приложение в фоне")
                // Сохранить данные, освободить ресурсы
            @unknown default:
                break
            }
        }
    }
}

// Несколько Scene — iPad multitasking
@main
struct MultiSceneApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        
        #if os(macOS)
        Settings {
            SettingsView()
        }
        
        Window("О программе", id: "about") {
            AboutView()
        }
        #endif
    }
}
`} />

        <div className="info-box">
          <strong>⚛️ React-аналогия:</strong> <code>@main App</code> → <code>ReactDOM.createRoot()</code>.
          <code>WindowGroup</code> → <code>&lt;BrowserRouter&gt;</code> обёртка.
          <code>scenePhase</code> → <code>document.visibilityState</code> / Page Visibility API.
        </div>
      </section>

      {/* ─── Where to load data ─── */}
      <section className="card">
        <h2>📍 Где загружать данные?</h2>
        <p>Выбор правильного места для загрузки — частый вопрос. Вот рекомендации:</p>

        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>Сценарий</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>Модификатор</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>Почему</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Загрузка данных при открытии экрана', '.task { }', 'Async, auto-cancel, чистый синтаксис'],
              ['Загрузка при смене параметра', '.task(id: param) { }', 'Авто-отмена старого, запуск нового'],
              ['Синхронная инициализация', '.onAppear { }', 'Простой setup без async'],
              ['Реакция на изменение state', '.onChange(of: value)', 'Debounce, валидация, side effects'],
              ['Подписка на системные события', '.onReceive(publisher)', 'Combine, NotificationCenter'],
              ['Данные при запуске приложения', '@main App.init', 'Глобальный setup, один раз'],
            ].map(([scenario, modifier, why]) => (
              <tr key={scenario}>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)' }}>{scenario}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)' }}><code>{modifier}</code></td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)' }}>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <CodeBlock language="swift" title="Типовой паттерн загрузки данных" code={`
struct ProductListView: View {
    @State private var viewModel = ProductViewModel()
    
    var body: some View {
        Group {
            switch viewModel.state {
            case .idle:
                Color.clear
            case .loading:
                ProgressView("Загрузка продуктов...")
            case .loaded:
                productList
            case .error(let msg):
                errorView(msg)
            }
        }
        // ✅ Лучший способ загрузки данных:
        .task {
            await viewModel.loadProducts()
        }
        // ✅ Обновление при pull-to-refresh:
        .refreshable {
            await viewModel.loadProducts()
        }
    }
    
    var productList: some View {
        List(viewModel.products) { product in
            ProductRow(product: product)
        }
        .searchable(text: $viewModel.searchQuery)
        // Реакция на изменение поискового запроса
        .onChange(of: viewModel.searchQuery) { _, newQuery in
            viewModel.filterProducts(query: newQuery)
        }
    }
    
    func errorView(_ message: String) -> some View {
        ContentUnavailableView {
            Label("Ошибка", systemImage: "wifi.slash")
        } description: {
            Text(message)
        } actions: {
            Button("Повторить") {
                Task { await viewModel.loadProducts() }
            }
        }
    }
}
`} />
      </section>

      {/* ─── Complete comparison ─── */}
      <section className="card">
        <h2>📊 Полное сравнение: React useEffect vs SwiftUI</h2>

        <CodeBlock language="swift" title="Все паттерны useEffect ↔ SwiftUI" code={`
// ┌──────────────────────────────────────────────────────┐
// │  React useEffect          →  SwiftUI                 │
// ├──────────────────────────────────────────────────────┤
// │                                                      │
// │  useEffect(() => {        →  .onAppear {             │
// │    doSomething()               doSomething()         │
// │  }, [])                       }                      │
// │                                                      │
// │  useEffect(() => {        →  .task {                 │
// │    fetchData()                 await fetchData()      │
// │    return () => abort()       }  // авто-отмена!     │
// │  }, [])                                              │
// │                                                      │
// │  useEffect(() => {        →  .task(id: userId) {     │
// │    fetchUser(userId)           await fetchUser(id)   │
// │    return () => abort()       }                      │
// │  }, [userId])                                        │
// │                                                      │
// │  useEffect(() => {        →  .onChange(of: value) {  │
// │    validate(value)             old, new in            │
// │  }, [value])                   validate(new)         │
// │                               }                      │
// │                                                      │
// │  useEffect(() => {        →  .onDisappear {          │
// │    return () => cleanup()      cleanup()             │
// │  }, [])                       }                      │
// │                                                      │
// │  useEffect(() => {        →  .onReceive(publisher) { │
// │    const unsub =               value in              │
// │      emitter.on(cb)            handle(value)         │
// │    return () => unsub()       }                      │
// │  }, [])                                              │
// └──────────────────────────────────────────────────────┘
`} />
      </section>

      {/* ─── Common pitfalls ─── */}
      <section className="card">
        <h2>🚫 Частые ошибки</h2>

        <CodeBlock language="swift" title="❌ Анти-паттерны жизненного цикла" code={`
// ❌ async в onAppear — НЕ отменяется автоматически
.onAppear {
    Task {  // эта задача продолжит работать после disappear
        await loadData()
    }
}

// ✅ Используйте .task — отмена автоматическая
.task {
    await loadData()
}

// ❌ Загрузка данных в init View
struct BadView: View {
    @State private var data: [Item]
    
    init() {
        // ❌ View может пересоздаваться часто!
        _data = State(initialValue: loadSync())
    }
}

// ✅ Загрузка в .task или .onAppear
struct GoodView: View {
    @State private var data: [Item] = []
    
    var body: some View {
        List(data) { item in Text(item.name) }
            .task { data = await loadAsync() }
    }
}

// ❌ Тяжёлые вычисления в body
var body: some View {
    let filtered = items.filter { /* тяжёлая логика */ }
    // ❌ body вызывается при КАЖДОМ изменении state!
}

// ✅ Вынесите в ViewModel или computed property
@Observable class VM {
    var items: [Item] = []
    var filteredItems: [Item] { // кэшируется @Observable
        items.filter { /* логика */ }
    }
}
`} />

        <div className="info-box">
          <strong>📏 Правило:</strong> Используйте <code>.task</code> для загрузки данных (async + auto-cancel),
          <code>.onAppear</code> для простого sync-кода, <code>.onChange</code> для реакции
          на конкретное изменение. Никогда не загружайте данные в <code>init</code> или <code>body</code>.
        </div>
      </section>
    </div>
  )
}
