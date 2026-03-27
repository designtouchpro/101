import CodeBlock from '../components/CodeBlock'
import PhoneMockup from '../components/PhoneMockup'

export default function NetworkingPage() {
  return (
    <div className="demo-container">
      <h1>🌐 Networking — работа с сервером</h1>
      <p>
        Каждое приложение работает с сервером. В React мы используем <code>fetch()</code> или
        <code>axios</code> + TanStack Query. В Swift для сетевых запросов есть встроенный
        <strong> URLSession</strong>, а для парсинга JSON — протокол <strong>Codable</strong>.
        В SwiftUI это всё связывается через <code>.task {'{ }'}</code> и <code>@Observable</code>.
      </p>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">React-разработчику</div>
          <p>
            <code>URLSession</code> = <code>fetch()</code> из браузера, но с бОльшим контролем.
            <code>Codable</code> = <code>zod</code> + <code>JSON.parse()</code> в одном.
            <code>.task {'{ }'}</code> = <code>useEffect([], () =&gt; ...)</code>.
            <code>@Observable</code> view model = <code>TanStack Query</code> / <code>Zustand</code>.
          </p>
        </div>
      </div>

      {/* ─── URLSession базовый запрос ─── */}
      <section className="card">
        <h2>📡 URLSession — базовый GET-запрос</h2>
        <p>
          <code>URLSession</code> — встроенная библиотека для HTTP-запросов. Не нужно ничего
          устанавливать через SPM (Swift Package Manager). Работает с <code>async/await</code>.
        </p>

        <CodeBlock language="swift" title="Простейший GET-запрос" code={`
// 1. URL
let url = URL(string: "https://api.example.com/users")!

// 2. Запрос — async/await (Swift 5.5+)
let (data, response) = try await URLSession.shared.data(from: url)

// 3. Проверяем HTTP-статус
guard let httpResponse = response as? HTTPURLResponse,
      httpResponse.statusCode == 200 else {
    throw NetworkError.badResponse
}

// 4. Декодируем JSON
let users = try JSONDecoder().decode([User].self, from: data)
print("Получили \\(users.count) пользователей")
`} />

        <CodeBlock language="swift" title="React-эквивалент: fetch()" code={`
// JavaScript/React
const response = await fetch('https://api.example.com/users')

if (!response.ok) {
    throw new Error('Bad response')
}

const users = await response.json()  // JSON.parse автоматически
console.log(\`Получили \${users.length} пользователей\`)
`} />
      </section>

      {/* ─── Codable ─── */}
      <section className="card">
        <h2>📦 Codable — типизированный JSON</h2>
        <p>
          В JavaScript <code>JSON.parse()</code> возвращает <code>any</code> — никаких гарантий типов.
          В Swift <code>Codable</code> даёт <strong>compile-time гарантии</strong>, что JSON имеет
          нужную структуру. Это как <code>zod.parse()</code>, но встроено в язык.
        </p>

        <CodeBlock language="swift" title="Codable модели" code={`
// Модель данных — автоматический JSON-парсинг
struct User: Codable, Identifiable {
    let id: Int
    let name: String
    let email: String
    let avatar: URL?         // Optional — может отсутствовать в JSON
    let isActive: Bool
    let createdAt: Date
}

// JSON который приходит с сервера:
// {
//   "id": 1,
//   "name": "Анна",
//   "email": "anna@mail.ru",
//   "is_active": true,
//   "created_at": "2024-01-15T10:30:00Z"
// }

// Когда ключи JSON отличаются от Swift:
struct User: Codable {
    let id: Int
    let name: String
    let isActive: Bool
    let createdAt: Date
    
    // CodingKeys — маппинг snake_case → camelCase
    enum CodingKeys: String, CodingKey {
        case id, name
        case isActive = "is_active"
        case createdAt = "created_at" 
    }
}

// Или проще — настроить декодер:
let decoder = JSONDecoder()
decoder.keyDecodingStrategy = .convertFromSnakeCase  // автоматически!
decoder.dateDecodingStrategy = .iso8601              // парсинг дат
`} />

        <CodeBlock language="swift" title="React/TS-эквивалент: interface + zod" code={`
// TypeScript — только описание, без runtime-валидации
interface User {
    id: number
    name: string
    email: string
    avatar?: string
    isActive: boolean
    createdAt: string        // Date как строка :(
}
const user = (await response.json()) as User  // unsafe cast!

// Zod — runtime-валидация (ближе к Codable)
const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    avatar: z.string().url().optional(),
    is_active: z.boolean(),
    created_at: z.string().datetime(),
})
const user = UserSchema.parse(await response.json())
`} />

        <div className="info-box">
          <span className="info-box-icon">🔒</span>
          <div className="info-box-content">
            <div className="info-box-title">Codable — безопаснее zod</div>
            <p>
              <code>Codable</code> проверяется и компилятором, и в runtime. Если JSON не соответствует
              модели — <code>try JSONDecoder().decode()</code> бросит ошибку с точным описанием,
              какое поле не совпало. Не нужна отдельная библиотека — всё в стандартной библиотеке Swift.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Полноценный API слой ─── */}
      <section className="card">
        <h2>🏗️ Сетевой слой — полный пример</h2>
        <p>
          В реальном приложении запросы оборачиваются в сервисный слой с обработкой ошибок,
          настройкой заголовков и авторизацией. Вот как это выглядит:
        </p>

        <CodeBlock language="swift" title="APIClient — сетевой сервис" code={`
// Типизированные ошибки
enum NetworkError: Error, LocalizedError {
    case invalidURL
    case noData
    case decodingError(Error)
    case serverError(statusCode: Int)
    case unauthorized
    case noConnection
    
    var errorDescription: String? {
        switch self {
        case .invalidURL: return "Неверный URL"
        case .noData: return "Нет данных"
        case .decodingError(let error): return "Ошибка парсинга: \\(error)"
        case .serverError(let code): return "Ошибка сервера: \\(code)"
        case .unauthorized: return "Не авторизован"
        case .noConnection: return "Нет подключения"
        }
    }
}

// API клиент
class APIClient {
    static let shared = APIClient()
    
    private let baseURL = "https://api.example.com"
    private var token: String?
    
    private let decoder: JSONDecoder = {
        let d = JSONDecoder()
        d.keyDecodingStrategy = .convertFromSnakeCase
        d.dateDecodingStrategy = .iso8601
        return d
    }()
    
    // ═══ Заголовки ═══
    private func makeRequest(
        path: String,
        method: String = "GET",
        body: Data? = nil
    ) -> URLRequest {
        let url = URL(string: baseURL + path)!
        var request = URLRequest(url: url)
        request.httpMethod = method
        
        // Стандартные заголовки
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("ru", forHTTPHeaderField: "Accept-Language")
        
        // Авторизация — Bearer token
        if let token {
            request.setValue("Bearer \\(token)", forHTTPHeaderField: "Authorization")
        }
        
        // Кастомные заголовки
        request.setValue("iOS-App/1.0", forHTTPHeaderField: "X-Client")
        request.setValue(UUID().uuidString, forHTTPHeaderField: "X-Request-ID")
        
        request.httpBody = body
        request.timeoutInterval = 30  // таймаут 30 сек
        
        return request
    }
    
    // ═══ Универсальный запрос с декодингом ═══
    func fetch<T: Decodable>(_ path: String) async throws -> T {
        let request = makeRequest(path: path)
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let http = response as? HTTPURLResponse else {
            throw NetworkError.noData
        }
        
        switch http.statusCode {
        case 200...299:                              // Успех
            return try decoder.decode(T.self, from: data)
        case 401:
            throw NetworkError.unauthorized          // Токен протух
        default:
            throw NetworkError.serverError(statusCode: http.statusCode)
        }
    }
    
    // ═══ POST с телом запроса ═══
    func post<Body: Encodable, Response: Decodable>(
        _ path: String,
        body: Body
    ) async throws -> Response {
        let bodyData = try JSONEncoder().encode(body)
        var request = makeRequest(path: path, method: "POST", body: bodyData)
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let http = response as? HTTPURLResponse,
              (200...299).contains(http.statusCode) else {
            throw NetworkError.serverError(statusCode: 0)
        }
        
        return try decoder.decode(Response.self, from: data)
    }
}
`} />

        <CodeBlock language="swift" title="React-эквивалент: axios instance" code={`
// React / TypeScript
const api = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'ru',
        'X-Client': 'Web-App/1.0',
    },
})

// Interceptor для авторизации
api.interceptors.request.use(config => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = \`Bearer \${token}\`
    }
    config.headers['X-Request-ID'] = crypto.randomUUID()
    return config
})

// Типизированный GET
async function fetchUsers(): Promise<User[]> {
    const { data } = await api.get<User[]>('/users')
    return data
}
`} />
      </section>

      {/* ─── Использование в SwiftUI ─── */}
      <section className="card">
        <h2>📱 Связка: API → ViewModel → View</h2>
        <p>
          Главный паттерн в SwiftUI: данные загружаются в <code>@Observable</code> ViewModel,
          а View подписывается и отображает состояние. Аналог: TanStack Query или Zustand store
          + React-компонент.
        </p>

        <CodeBlock language="swift" title="Полный цикл: от API до экрана" code={`
// ═══ 1. Модель данных ═══
struct Post: Codable, Identifiable {
    let id: Int
    let title: String
    let body: String
    let userId: Int
}

// ═══ 2. ViewModel (как Zustand store) ═══
@Observable
class PostsViewModel {
    var posts: [Post] = []
    var isLoading = false
    var error: String?
    
    func loadPosts() async {
        isLoading = true
        error = nil
        
        do {
            // Используем наш APIClient
            posts = try await APIClient.shared.fetch("/posts")
        } catch {
            self.error = error.localizedDescription
        }
        
        isLoading = false
    }
    
    func refresh() async {
        // Pull-to-refresh
        do {
            posts = try await APIClient.shared.fetch("/posts")
        } catch {
            self.error = error.localizedDescription
        }
    }
}

// ═══ 3. View — отображение ═══
struct PostListView: View {
    @State private var viewModel = PostsViewModel()
    
    var body: some View {
        NavigationStack {
            Group {
                if viewModel.isLoading && viewModel.posts.isEmpty {
                    // Первая загрузка — спиннер
                    ProgressView("Загрузка...")
                } else if let error = viewModel.error, viewModel.posts.isEmpty {
                    // Ошибка — кнопка повтора
                    ContentUnavailableView {
                        Label("Ошибка", systemImage: "wifi.slash")
                    } description: {
                        Text(error)
                    } actions: {
                        Button("Повторить") {
                            Task { await viewModel.loadPosts() }
                        }
                    }
                } else {
                    // Список постов
                    List(viewModel.posts) { post in
                        NavigationLink(value: post) {
                            VStack(alignment: .leading, spacing: 4) {
                                Text(post.title)
                                    .font(.headline)
                                    .lineLimit(2)
                                Text(post.body)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                                    .lineLimit(1)
                            }
                        }
                    }
                    .refreshable {
                        await viewModel.refresh()  // Pull-to-refresh!
                    }
                }
            }
            .navigationTitle("Посты")
            .task {
                // .task — запускается при появлении View
                // Автоматически отменяется при уходе (как cleanup в useEffect)
                await viewModel.loadPosts()
            }
        }
    }
}
`} />

        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <PhoneMockup title="Loading">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '8px', minHeight: '200px' }}>
                <div style={{ width: '24px', height: '24px', border: '3px solid #e5e5ea', borderTop: '3px solid #007AFF', borderRadius: '50%', animation: 'none' }} />
                <span className="sim-text sim-text--secondary" style={{ fontSize: '13px' }}>Загрузка...</span>
              </div>
            </PhoneMockup>

            <PhoneMockup>
              <div className="sim-vstack" style={{ gap: '0' }}>
                <div className="sim-large-title" style={{ fontSize: '24px', marginBottom: '8px' }}>Посты</div>
                <div className="sim-list">
                  {[
                    { title: 'Как начать с SwiftUI', body: 'Базовые концепции для React-разработчиков...' },
                    { title: 'URLSession vs Alamofire', body: 'Сравнение подходов к сетевым запросам...' },
                    { title: 'MVVM в SwiftUI', body: 'Организация кода с @Observable...' },
                    { title: 'Codable: продвинутые техники', body: 'CodingKeys, вложенные контейнеры...' },
                  ].map((post, i) => (
                    <div key={i} className="sim-list-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                      <span style={{ fontWeight: 600, fontSize: '14px' }}>{post.title}</span>
                      <span style={{ fontSize: '11px', color: '#8e8e93' }}>{post.body}</span>
                    </div>
                  ))}
                </div>
              </div>
            </PhoneMockup>

            <PhoneMockup title="Error">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '8px', minHeight: '200px', textAlign: 'center', padding: '20px' }}>
                <span style={{ fontSize: '36px' }}>📡</span>
                <span style={{ fontWeight: 600, fontSize: '15px' }}>Ошибка</span>
                <span className="sim-text sim-text--secondary" style={{ fontSize: '13px' }}>Нет подключения к сети</span>
                <div className="sim-button--filled" style={{ marginTop: '8px', fontSize: '13px' }}>Повторить</div>
              </div>
            </PhoneMockup>
          </div>
        </div>

        <CodeBlock language="swift" title="React-эквивалент: TanStack Query" code={`
// React + TanStack Query
function PostList() {
    const { data: posts, isLoading, error, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: () => api.get('/posts').then(r => r.data),
    })

    if (isLoading) return <Spinner />
    if (error) return <ErrorView error={error} onRetry={refetch} />

    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>
                    <Link to={\`/posts/\${post.id}\`}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

// Или с Zustand
const usePostStore = create(set => ({
    posts: [],
    loading: false,
    error: null,
    loadPosts: async () => {
        set({ loading: true, error: null })
        try {
            const { data } = await api.get('/posts')
            set({ posts: data })
        } catch (e) {
            set({ error: e.message })
        } finally {
            set({ loading: false })
        }
    }
}))
`} />
      </section>

      {/* ─── POST / PUT / DELETE ─── */}
      <section className="card">
        <h2>✏️ POST, PUT, DELETE — мутации данных</h2>
        <p>
          Отправка данных на сервер — создание, обновление, удаление.
          В React это <code>useMutation</code> в TanStack Query, в SwiftUI — методы ViewModel.
        </p>

        <CodeBlock language="swift" title="CRUD-операции" code={`
@Observable
class PostsViewModel {
    // ... posts, isLoading ...
    
    // ═══ Создать пост ═══
    func createPost(title: String, body: String) async throws {
        struct CreateRequest: Encodable {
            let title: String
            let body: String
        }
        
        let newPost: Post = try await APIClient.shared.post(
            "/posts",
            body: CreateRequest(title: title, body: body)
        )
        
        // Добавляем в локальный список (оптимистичный апдейт)
        posts.insert(newPost, at: 0)
    }
    
    // ═══ Удалить пост ═══
    func deletePost(_ post: Post) async throws {
        // Оптимистичное удаление
        let index = posts.firstIndex(where: { $0.id == post.id })
        if let index { posts.remove(at: index) }
        
        do {
            let url = URL(string: "\\(baseURL)/posts/\\(post.id)")!
            var request = URLRequest(url: url)
            request.httpMethod = "DELETE"
            request.setValue("Bearer \\(token)", forHTTPHeaderField: "Authorization")
            
            let (_, response) = try await URLSession.shared.data(for: request)
            guard let http = response as? HTTPURLResponse,
                  http.statusCode == 204 else {
                throw NetworkError.serverError(statusCode: 0)
            }
        } catch {
            // Откат — вернуть пост обратно
            if let index { posts.insert(post, at: index) }
            throw error
        }
    }
}

// ═══ В View ═══
struct PostListView: View {
    @State private var viewModel = PostsViewModel()
    
    var body: some View {
        List {
            ForEach(viewModel.posts) { post in
                PostRow(post: post)
            }
            .onDelete { indexSet in
                // Swipe-to-delete
                guard let index = indexSet.first else { return }
                let post = viewModel.posts[index]
                Task {
                    try? await viewModel.deletePost(post)
                }
            }
        }
    }
}
`} />
      </section>

      {/* ─── Загрузка изображений ─── */}
      <section className="card">
        <h2>🖼️ Загрузка изображений</h2>
        <p>
          SwiftUI имеет встроенный <code>AsyncImage</code> для загрузки картинок по URL —
          аналог <code>&lt;img src="..."&gt;</code> с автоматическим кешированием и плейсхолдером.
        </p>

        <CodeBlock language="swift" title="AsyncImage — загрузка картинок" code={`
// Простая загрузка
AsyncImage(url: URL(string: user.avatarURL)) { image in
    image
        .resizable()
        .aspectRatio(contentMode: .fill)
} placeholder: {
    ProgressView()  // спиннер пока грузится
}
.frame(width: 60, height: 60)
.clipShape(Circle())

// С обработкой всех состояний
AsyncImage(url: URL(string: "https://example.com/photo.jpg")) { phase in
    switch phase {
    case .empty:
        // Загрузка
        ProgressView()
    case .success(let image):
        // Успех
        image.resizable().scaledToFit()
    case .failure:
        // Ошибка — картинка-заглушка
        Image(systemName: "photo.fill")
            .foregroundStyle(.secondary)
    @unknown default:
        EmptyView()
    }
}
.frame(height: 200)
.clipShape(RoundedRectangle(cornerRadius: 12))
`} />

        <CodeBlock language="swift" title="React-эквивалент" code={`
// React — просто <img>, сами следим за загрузкой
function Avatar({ url }: { url: string }) {
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    
    if (error) return <FallbackIcon />
    
    return (
        <>
            {!loaded && <Spinner />}
            <img 
                src={url}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                style={{ display: loaded ? 'block' : 'none' }}
            />
        </>
    )
}
// Или с Next.js: <Image src={url} loading="lazy" />
`} />
      </section>

      {/* ─── Websockets ─── */}
      <section className="card">
        <h2>🔌 WebSocket и потоковые данные</h2>
        <p>
          Для real-time данных (чаты, уведомления) используется <code>URLSessionWebSocketTask</code>
          или <code>AsyncStream</code> для потоковой обработки.
        </p>

        <CodeBlock language="swift" title="WebSocket-подключение" code={`
class ChatService {
    private var socket: URLSessionWebSocketTask?
    
    func connect() {
        let url = URL(string: "wss://api.example.com/chat")!
        socket = URLSession.shared.webSocketTask(with: url)
        socket?.resume()
    }
    
    // Отправка сообщения
    func send(_ text: String) async throws {
        try await socket?.send(.string(text))
    }
    
    // Получение как AsyncStream (аналог EventSource / Socket.IO)
    var messages: AsyncStream<String> {
        AsyncStream { continuation in
            receiveNext(continuation: continuation)
        }
    }
    
    private func receiveNext(continuation: AsyncStream<String>.Continuation) {
        socket?.receive { [weak self] result in
            switch result {
            case .success(.string(let text)):
                continuation.yield(text)
                self?.receiveNext(continuation: continuation)  // слушаем дальше
            case .failure:
                continuation.finish()
            default:
                self?.receiveNext(continuation: continuation)
            }
        }
    }
}

// В View
struct ChatView: View {
    @State private var messages: [String] = []
    let chatService = ChatService()
    
    var body: some View {
        List(messages, id: \\.self) { msg in
            Text(msg)
        }
        .task {
            chatService.connect()
            for await message in chatService.messages {
                messages.append(message)
            }
        }
    }
}
`} />
      </section>

      {/* ─── Шпаргалка ─── */}
      <section className="card">
        <h2>📋 Шпаргалка: React → SwiftUI Networking</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color, #333)' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>React / JS</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Swift / SwiftUI</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Комментарий</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['fetch() / axios', 'URLSession.shared', 'Встроен в SDK, не нужен npm'],
                ['response.json()', 'JSONDecoder().decode()', 'Типизированный парсинг'],
                ['interface + as', 'Codable struct', 'Runtime + compile-time проверка'],
                ['axios.create({ headers })', 'URLRequest + setValue()', 'Заголовки на URLRequest'],
                ['Bearer token interceptor', 'URLRequest.setValue("Bearer")', 'В makeRequest()'],
                ['useEffect([], fetch)', '.task { await ... }', 'Авто-отмена при dismount'],
                ['TanStack Query', '@Observable + .task', 'loading/error/data паттерн'],
                ['useMutation', 'ViewModel method', 'async throws функция'],
                ['<img src={url}>', 'AsyncImage(url:)', 'Встроен: placeholder + error'],
                ['Socket.IO / ws', 'URLSessionWebSocketTask', 'Нативные WebSocket'],
                ['EventSource / SSE', 'AsyncStream', 'Потоковая обработка'],
              ].map(([react, swift, note], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #333)' }}>
                  <td style={{ padding: '8px 10px' }}><code>{react}</code></td>
                  <td style={{ padding: '8px 10px' }}><code>{swift}</code></td>
                  <td style={{ padding: '8px 10px', color: 'var(--text-secondary)' }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="info-box" style={{ marginTop: '32px' }}>
        <span className="info-box-icon">🎯</span>
        <div className="info-box-content">
          <div className="info-box-title">Главное</div>
          <p>
            1. <code>URLSession</code> — встроенный HTTP-клиент, <code>Codable</code> — встроенный JSON-парсер<br/>
            2. Заголовки ставятся через <code>URLRequest.setValue()</code> — Authorization, Content-Type, кастомные<br/>
            3. <code>.task {'{ }'}</code> запускает загрузку при появлении View и отменяет при уходе<br/>
            4. <code>@Observable</code> ViewModel хранит loading/error/data — точно как TanStack Query<br/>
            5. <code>AsyncImage</code> для картинок, <code>URLSessionWebSocketTask</code> для real-time
          </p>
        </div>
      </div>
    </div>
  )
}
