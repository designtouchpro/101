import CodeBlock from '../components/CodeBlock'

export default function ArchitecturePage() {
  return (
    <div className="demo-container">
      <h1>🏛️ MVVM Architecture — Архитектура в SwiftUI</h1>
      <p>
        SwiftUI естественно подталкивает к паттерну <strong>MVVM</strong> (Model-View-ViewModel).
        Если в React вы привыкли выносить логику в custom hooks — ViewModel играет ту же роль,
        но это полноценный класс с <code>@Observable</code>.
      </p>

      {/* ─── What is MVVM ─── */}
      <section className="card">
        <h2>📐 Что такое MVVM?</h2>
        <p>
          MVVM разделяет приложение на три слоя. Каждый слой имеет чёткую ответственность.
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px',
          padding: '24px', borderRadius: '12px',
          background: 'var(--bg-secondary, #f8f9fa)', marginBottom: '16px'
        }}>
          <div style={{ padding: '16px', borderRadius: '8px', background: '#34C759', color: '#fff', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.3rem' }}>Model</strong><br/>
            <small>Данные и бизнес-логика</small><br/><br/>
            <span>struct, enum, Codable</span>
          </div>
          <div style={{ padding: '16px', borderRadius: '8px', background: '#AF52DE', color: '#fff', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.3rem' }}>ViewModel</strong><br/>
            <small>Мост между Model и View</small><br/><br/>
            <span>@Observable class</span>
          </div>
          <div style={{ padding: '16px', borderRadius: '8px', background: '#007AFF', color: '#fff', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.3rem' }}>View</strong><br/>
            <small>UI-представление</small><br/><br/>
            <span>struct: View</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Model ←→ ViewModel ←→ View &nbsp;|&nbsp; View никогда не обращается к Model напрямую
        </div>
      </section>

      {/* ─── Why MVVM is natural for SwiftUI ─── */}
      <section className="card">
        <h2>🤝 Почему MVVM естественен для SwiftUI?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Реактивность из коробки</h3>
            <p><code>@Observable</code> автоматически уведомляет View об изменениях. Не нужен Redux, не нужен <code>dispatch</code>.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>View = чистая функция</h3>
            <p>SwiftUI View — <code>struct</code>, который описывает UI. Как React functional component. Логика живёт в ViewModel.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧪</div>
            <h3>Тестируемость</h3>
            <p>ViewModel — обычный класс. Тестируется без UI, без симулятора. Как тестирование custom hooks.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧩</div>
            <h3>Переиспользование</h3>
            <p>Один ViewModel может обслуживать разные Views (iPhone, iPad, Watch). Как один хук для разных компонентов.</p>
          </div>
        </div>
      </section>

      {/* ─── React comparison ─── */}
      <section className="card">
        <h2>⚛️ Сравнение: React hooks → SwiftUI ViewModel</h2>
        <p>
          В React мы выносим логику в custom hooks. В SwiftUI — в <code>@Observable</code> класс.
          Концептуально это одно и то же: отделение логики от представления.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>React: Custom Hook</h3>
            <CodeBlock language="swift" code={`
// useTodos.ts
function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    if (filter === 'done') 
      return todos.filter(t => t.done)
    if (filter === 'active') 
      return todos.filter(t => !t.done)
    return todos
  }, [todos, filter])

  const add = (title: string) => {
    setTodos(prev => [...prev, {
      id: crypto.randomUUID(),
      title, done: false
    }])
  }

  const toggle = (id: string) => {
    setTodos(prev => prev.map(t =>
      t.id === id ? {...t, done: !t.done} : t
    ))
  }

  return { todos: filtered, filter, 
           setFilter, add, toggle }
}
`} />
          </div>
          <div className="feature-card">
            <h3>SwiftUI: ViewModel</h3>
            <CodeBlock language="swift" code={`
// TodoViewModel.swift
@Observable
class TodoViewModel {
    var todos: [Todo] = []
    var filter: Filter = .all

    var filteredTodos: [Todo] {
        switch filter {
        case .all:    return todos
        case .active: return todos.filter { !$0.done }
        case .done:   return todos.filter { $0.done }
        }
    }

    func add(title: String) {
        todos.append(Todo(
            title: title, 
            done: false
        ))
    }

    func toggle(_ todo: Todo) {
        if let i = todos.firstIndex(
            where: { $0.id == todo.id }
        ) {
            todos[i].done.toggle()
        }
    }
}
`} />
          </div>
        </div>

        <div className="info-box">
          <strong>💡 Ключевое отличие:</strong> В React hook привязан к жизненному циклу компонента.
          В SwiftUI ViewModel — это объект, который живёт независимо и может быть передан
          через <code>@Environment</code> или <code>@State</code>.
        </div>
      </section>

      {/* ─── Creating ViewModel ─── */}
      <section className="card">
        <h2>🔨 Создание ViewModel с @Observable</h2>
        <p>
          ViewModel — это <code>@Observable</code> класс, который содержит состояние и бизнес-логику.
          View подключается к нему и автоматически перерисовывается при изменениях.
        </p>

        <CodeBlock language="swift" title="ViewModel — полный пример" code={`
import Observation
import Foundation

// ── Model ──
struct UserProfile: Codable, Identifiable {
    let id: UUID
    var name: String
    var email: String
    var avatarURL: URL?
    var bio: String
}

enum LoadingState<T> {
    case idle
    case loading
    case loaded(T)
    case error(String)
}

// ── ViewModel ──
@Observable
class ProfileViewModel {
    // State
    var profile: UserProfile?
    var loadingState: LoadingState<UserProfile> = .idle
    var isEditing = false
    var editDraft: UserProfile?
    var validationErrors: [String] = []
    
    // Dependencies (inject через init)
    private let repository: UserRepository
    
    init(repository: UserRepository) {
        self.repository = repository
    }
    
    // Computed
    var displayName: String {
        profile?.name ?? "Гость"
    }
    
    var isValid: Bool {
        guard let draft = editDraft else { return false }
        return !draft.name.isEmpty && draft.email.contains("@")
    }
    
    // Actions
    func loadProfile() async {
        loadingState = .loading
        do {
            let user = try await repository.fetchCurrentUser()
            profile = user
            loadingState = .loaded(user)
        } catch {
            loadingState = .error(error.localizedDescription)
        }
    }
    
    func startEditing() {
        editDraft = profile
        isEditing = true
    }
    
    func saveChanges() async throws {
        guard let draft = editDraft, isValid else { return }
        try await repository.updateUser(draft)
        profile = draft
        isEditing = false
        editDraft = nil
    }
    
    func cancelEditing() {
        editDraft = nil
        isEditing = false
    }
}
`} />
      </section>

      {/* ─── View using ViewModel ─── */}
      <section className="card">
        <h2>🖥️ View подключается к ViewModel</h2>

        <CodeBlock language="swift" title="View + ViewModel" code={`
struct ProfileView: View {
    @State private var viewModel: ProfileViewModel
    
    init(repository: UserRepository) {
        _viewModel = State(initialValue: ProfileViewModel(
            repository: repository
        ))
    }
    
    var body: some View {
        NavigationStack {
            Group {
                switch viewModel.loadingState {
                case .idle:
                    Color.clear.onAppear {
                        Task { await viewModel.loadProfile() }
                    }
                case .loading:
                    ProgressView("Загрузка...")
                case .loaded(let profile):
                    profileContent(profile)
                case .error(let message):
                    errorView(message)
                }
            }
            .navigationTitle("Профиль")
            .toolbar {
                if viewModel.profile != nil {
                    Button(viewModel.isEditing ? "Отмена" : "Изменить") {
                        if viewModel.isEditing {
                            viewModel.cancelEditing()
                        } else {
                            viewModel.startEditing()
                        }
                    }
                }
            }
        }
    }
    
    @ViewBuilder
    private func profileContent(_ profile: UserProfile) -> some View {
        Form {
            Section("Информация") {
                if viewModel.isEditing, let draft = Binding(
                    get: { viewModel.editDraft! },
                    set: { viewModel.editDraft = $0 }
                ) {
                    TextField("Имя", text: draft.name)
                    TextField("Email", text: draft.email)
                    TextField("О себе", text: draft.bio)
                } else {
                    LabeledContent("Имя", value: profile.name)
                    LabeledContent("Email", value: profile.email)
                    LabeledContent("О себе", value: profile.bio)
                }
            }
            
            if viewModel.isEditing {
                Section {
                    Button("Сохранить") {
                        Task { try? await viewModel.saveChanges() }
                    }
                    .disabled(!viewModel.isValid)
                }
            }
        }
    }
    
    private func errorView(_ message: String) -> some View {
        ContentUnavailableView {
            Label("Ошибка", systemImage: "exclamationmark.triangle")
        } description: {
            Text(message)
        } actions: {
            Button("Повторить") {
                Task { await viewModel.loadProfile() }
            }
        }
    }
}
`} />
      </section>

      {/* ─── Repository Pattern ─── */}
      <section className="card">
        <h2>📚 Repository Pattern — абстракция данных</h2>
        <p>
          Repository скрывает источник данных (API, база, кэш). ViewModel работает с протоколом,
          а не конкретной реализацией — это упрощает тестирование.
        </p>

        <CodeBlock language="swift" title="Repository — протокол и реализация" code={`
// Протокол — контракт (как TypeScript interface)
protocol UserRepository {
    func fetchCurrentUser() async throws -> UserProfile
    func updateUser(_ user: UserProfile) async throws
    func deleteAccount() async throws
}

// Реальная реализация — работает с API
class APIUserRepository: UserRepository {
    private let baseURL = URL(string: "https://api.example.com")!
    private let session: URLSession
    
    init(session: URLSession = .shared) {
        self.session = session
    }
    
    func fetchCurrentUser() async throws -> UserProfile {
        let url = baseURL.appendingPathComponent("me")
        let (data, _) = try await session.data(from: url)
        return try JSONDecoder().decode(UserProfile.self, from: data)
    }
    
    func updateUser(_ user: UserProfile) async throws {
        var request = URLRequest(url: baseURL.appendingPathComponent("me"))
        request.httpMethod = "PUT"
        request.httpBody = try JSONEncoder().encode(user)
        let (_, response) = try await session.data(for: request)
        guard let http = response as? HTTPURLResponse, http.statusCode == 200 else {
            throw URLError(.badServerResponse)
        }
    }
    
    func deleteAccount() async throws { /* ... */ }
}

// Mock для тестов
class MockUserRepository: UserRepository {
    var mockUser = UserProfile(
        id: UUID(), name: "Test", email: "test@test.com",
        avatarURL: nil, bio: "Mock user"
    )
    var shouldFail = false
    
    func fetchCurrentUser() async throws -> UserProfile {
        if shouldFail { throw URLError(.notConnectedToInternet) }
        return mockUser
    }
    
    func updateUser(_ user: UserProfile) async throws {
        mockUser = user
    }
    
    func deleteAccount() async throws {}
}
`} />
      </section>

      {/* ─── Testing ─── */}
      <section className="card">
        <h2>🧪 Тестирование ViewModel</h2>
        <p>
          Главное преимущество MVVM — ViewModel тестируется без UI. Подставляем mock-зависимости
          и проверяем логику. Как тестирование custom hooks с <code>renderHook</code>.
        </p>

        <CodeBlock language="swift" title="Unit-тесты ViewModel" code={`
import Testing

@Suite("ProfileViewModel")
struct ProfileViewModelTests {
    
    @Test("загружает профиль при вызове loadProfile")
    func loadProfile() async {
        // Arrange
        let mockRepo = MockUserRepository()
        let vm = ProfileViewModel(repository: mockRepo)
        
        // Act
        await vm.loadProfile()
        
        // Assert
        #expect(vm.profile?.name == "Test")
        if case .loaded(let user) = vm.loadingState {
            #expect(user.email == "test@test.com")
        } else {
            Issue.record("Expected loaded state")
        }
    }
    
    @Test("показывает ошибку при сбое загрузки")
    func loadProfileFailure() async {
        let mockRepo = MockUserRepository()
        mockRepo.shouldFail = true
        let vm = ProfileViewModel(repository: mockRepo)
        
        await vm.loadProfile()
        
        if case .error(let msg) = vm.loadingState {
            #expect(msg.contains("not connected"))
        } else {
            Issue.record("Expected error state")
        }
    }
    
    @Test("валидация формы редактирования")
    func validation() {
        let mockRepo = MockUserRepository()
        let vm = ProfileViewModel(repository: mockRepo)
        
        vm.editDraft = UserProfile(
            id: UUID(), name: "", email: "invalid",
            avatarURL: nil, bio: ""
        )
        #expect(!vm.isValid)  // имя пустое, email без @
        
        vm.editDraft?.name = "Анна"
        vm.editDraft?.email = "anna@mail.ru"
        #expect(vm.isValid)
    }
}
`} />

        <div className="info-box">
          <strong>⚛️ React-аналогия:</strong> Это как тестирование custom hook через <code>renderHook()</code>
          из <code>@testing-library/react</code>, но без необходимости оборачивать в React-провайдеры.
          ViewModel — просто класс, создаём экземпляр и вызываем методы.
        </div>
      </section>

      {/* ─── Folder Structure ─── */}
      <section className="card">
        <h2>📁 Структура проекта</h2>
        <p>Рекомендуемая организация файлов для SwiftUI + MVVM:</p>

        <CodeBlock language="swift" title="Структура папок" code={`
MyApp/
├── App/
│   └── MyApp.swift              // @main, точка входа
│
├── Models/
│   ├── User.swift               // struct User: Codable
│   ├── Todo.swift               // struct Todo: Identifiable
│   └── LoadingState.swift       // enum LoadingState<T>
│
├── ViewModels/
│   ├── ProfileViewModel.swift   // @Observable class
│   ├── TodoListViewModel.swift
│   └── AuthViewModel.swift
│
├── Views/
│   ├── Profile/
│   │   ├── ProfileView.swift    // основной экран
│   │   └── ProfileRow.swift     // подкомпонент
│   ├── TodoList/
│   │   ├── TodoListView.swift
│   │   └── TodoRow.swift
│   └── Shared/
│       ├── LoadingView.swift
│       └── ErrorView.swift
│
├── Repositories/
│   ├── Protocols/
│   │   └── UserRepository.swift // protocol
│   └── Implementations/
│       ├── APIUserRepository.swift
│       └── MockUserRepository.swift
│
├── Services/
│   ├── NetworkService.swift
│   └── AuthService.swift
│
└── Extensions/
    ├── View+Extensions.swift
    └── Date+Formatting.swift
`} />

        <div className="info-box">
          <strong>📂 Сравни с React:</strong>
          <ul className="info-list">
            <li><code>Models/</code> → <code>types/</code> (TypeScript interfaces)</li>
            <li><code>ViewModels/</code> → <code>hooks/</code> (custom hooks)</li>
            <li><code>Views/</code> → <code>components/</code> + <code>pages/</code></li>
            <li><code>Repositories/</code> → <code>api/</code> или <code>services/</code></li>
          </ul>
        </div>
      </section>

      {/* ─── DI ─── */}
      <section className="card">
        <h2>💉 Dependency Injection через @Environment</h2>
        <p>
          В React DI делается через Context. В SwiftUI — через <code>@Environment</code>.
          Это позволяет подменять зависимости в preview и тестах.
        </p>

        <CodeBlock language="swift" title="DI через Environment" code={`
// В корне приложения создаём реальные зависимости
@main struct MyApp: App {
    @State private var profileVM = ProfileViewModel(
        repository: APIUserRepository()
    )
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(profileVM)
        }
    }
}

// В Preview — mock зависимости
#Preview {
    ProfileView(repository: MockUserRepository())
}

// Альтернативный подход: DI Container
@Observable
class DIContainer {
    let userRepo: UserRepository
    let authService: AuthService
    
    init(
        userRepo: UserRepository = APIUserRepository(),
        authService: AuthService = RealAuthService()
    ) {
        self.userRepo = userRepo
        self.authService = authService
    }
    
    // Фабрика для тестов
    static var mock: DIContainer {
        DIContainer(
            userRepo: MockUserRepository(),
            authService: MockAuthService()
        )
    }
}

// Использование
@main struct MyApp: App {
    @State private var container = DIContainer()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(container)
        }
    }
}
`} />
      </section>

      {/* ─── Best Practices ─── */}
      <section className="card">
        <h2>✅ Best Practices</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">1️⃣</div>
            <h3>Тонкие Views</h3>
            <p>View только отображает данные и вызывает методы ViewModel. Никакой бизнес-логики. Как «presentational components» в React.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">2️⃣</div>
            <h3>Толстые ViewModels</h3>
            <p>Вся логика, валидация, преобразование данных — в ViewModel. Computed properties вместо дублирования state.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">3️⃣</div>
            <h3>Протоколы для зависимостей</h3>
            <p>ViewModel зависит от протокола, не реализации. Подмена в тестах через mock — тривиальная.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">4️⃣</div>
            <h3>Один ViewModel на экран</h3>
            <p>Обычно один экран = один ViewModel. Sub-views получают данные через параметры или @Binding.</p>
          </div>
        </div>

        <CodeBlock language="swift" title="Итоговый чеклист" code={`
// ✅ Model — простая структура данных
struct Todo: Identifiable, Codable {
    let id: UUID
    var title: String
    var isDone: Bool
}

// ✅ ViewModel — логика и состояние
@Observable class TodoViewModel {
    private let repo: TodoRepository  // зависимость через протокол
    var todos: [Todo] = []
    
    init(repo: TodoRepository) { self.repo = repo }
    
    var activeTodos: [Todo] { todos.filter { !$0.isDone } }
    var completedCount: Int { todos.filter { $0.isDone }.count }
    
    func load() async { todos = (try? await repo.fetchAll()) ?? [] }
    func toggle(_ todo: Todo) {
        if let i = todos.firstIndex(where: { $0.id == todo.id }) {
            todos[i].isDone.toggle()
        }
    }
}

// ✅ View — только UI
struct TodoListView: View {
    @State private var vm: TodoViewModel
    
    init(repo: TodoRepository) {
        _vm = State(initialValue: TodoViewModel(repo: repo))
    }
    
    var body: some View {
        List(vm.activeTodos) { todo in
            TodoRow(todo: todo) { vm.toggle(todo) }
        }
        .task { await vm.load() }
        .navigationTitle("Задачи (\\(vm.completedCount) готово)")
    }
}
`} />
      </section>
    </div>
  )
}
