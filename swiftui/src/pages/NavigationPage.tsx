import CodeBlock from '../components/CodeBlock'
import PhoneMockup from '../components/PhoneMockup'

export default function NavigationPage() {
  return (
    <div className="demo-container">
      <h1>🧭 Navigation</h1>
      <p>
        Навигация в SwiftUI — это декларативное управление стеком экранов. В отличие от React Router,
        где навигация основана на URL, SwiftUI использует <strong>NavigationStack</strong> с
        типизированными значениями. Это ближе к нативной iOS-навигации (UINavigationController).
      </p>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">React-разработчику</div>
          <p>
            Если привык к React Router — забудь про URL-based роутинг. В SwiftUI навигация
            работает через стек данных: пушишь значение → появляется экран, попишь → возврат.
            <code>NavigationStack</code> ≈ <code>BrowserRouter</code>,
            <code>NavigationLink</code> ≈ <code>&lt;Link&gt;</code>,
            <code>NavigationPath</code> ≈ <code>useNavigate()</code>.
          </p>
        </div>
      </div>

      {/* ─── NavigationStack ─── */}
      <section className="card">
        <h2>📚 NavigationStack — основа навигации</h2>
        <p>
          <code>NavigationStack</code> (iOS 16+) — контейнер, управляющий стеком экранов.
          Заменил устаревший <code>NavigationView</code>. Каждый push добавляет экран,
          back — убирает.
        </p>

        <CodeBlock language="swift" title="Базовый NavigationStack" code={`
struct ContentView: View {
    var body: some View {
        NavigationStack {
            List {
                // NavigationLink — декларативная навигация
                NavigationLink("Профиль") {
                    ProfileView()
                }
                
                NavigationLink("Настройки") {
                    SettingsView()
                }
                
                // С кастомным контентом
                NavigationLink {
                    DetailView(item: "Фото")
                } label: {
                    HStack {
                        Image(systemName: "photo")
                        Text("Галерея")
                        Spacer()
                        Text("42 фото")
                            .foregroundColor(.secondary)
                    }
                }
            }
            .navigationTitle("Главная")  // заголовок экрана
        }
    }
}`} />

        <div className="info-box">
          <strong>📌 .navigationTitle:</strong> Заголовок устанавливается на дочернем View,
          а не на NavigationStack. Это частая ошибка новичков. Аналогия: в React Router
          <code>document.title</code> устанавливается внутри компонента Route.
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <PhoneMockup>
            <div className="sim-vstack" style={{ gap: '0' }}>
              <div className="sim-large-title">Главная</div>
              <div className="sim-list">
                <div className="sim-list-row">
                  <span>Профиль</span>
                  <span className="sim-list-row__chevron">›</span>
                </div>
                <div className="sim-list-row">
                  <span>Настройки</span>
                  <span className="sim-list-row__chevron">›</span>
                </div>
                <div className="sim-list-row">
                  <div className="sim-hstack" style={{ flex: 1 }}>
                    <span style={{ fontSize: '16px' }}>🖼</span>
                    <span>Галерея</span>
                    <span className="sim-spacer" />
                    <span style={{ color: '#8e8e93', fontSize: '13px' }}>42 фото</span>
                  </div>
                  <span className="sim-list-row__chevron">›</span>
                </div>
              </div>
            </div>
          </PhoneMockup>
        </div>
      </section>

      {/* ─── Сравнение с React Router ─── */}
      <section className="card">
        <h2>⚡ Сравнение: NavigationStack vs React Router</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🍎 SwiftUI Navigation</h3>
            <CodeBlock language="swift" code={`
struct AppView: View {
    var body: some View {
        NavigationStack {
            HomeView()
                .navigationTitle("Главная")
        }
    }
}

struct HomeView: View {
    var body: some View {
        List {
            NavigationLink("Профиль") {
                ProfileView()
            }
            NavigationLink("О приложении") {
                AboutView()
            }
        }
    }
}

struct ProfileView: View {
    var body: some View {
        Text("Мой профиль")
            .navigationTitle("Профиль")
    }
}`} />
          </div>
          <div className="feature-card">
            <h3>⚛️ React Router</h3>
            <CodeBlock language="swift" code={`
// Router setup
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" 
          element={<Profile />} />
        <Route path="/about" 
          element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

// Navigation links
function Home() {
  return (
    <div>
      <h1>Главная</h1>
      <Link to="/profile">Профиль</Link>
      <Link to="/about">О приложении</Link>
    </div>
  )
}

function Profile() {
  return <h1>Мой профиль</h1>
}`} />
          </div>
        </div>
      </section>

      {/* ─── Value-based navigation ─── */}
      <section className="card">
        <h2>🎯 Value-based Navigation (типизированная)</h2>
        <p>
          Более мощный подход — передавать <strong>значения</strong> в NavigationLink,
          а обработку маршрутов делать через <code>.navigationDestination(for:)</code>.
          Это как типизированный роутинг — безопаснее и масштабируемее.
        </p>

        <CodeBlock language="swift" title="Value-based NavigationLink" code={`
// Модель данных
struct Recipe: Identifiable, Hashable {
    let id = UUID()
    let name: String
    let cookTime: Int
}

struct RecipeListView: View {
    let recipes = [
        Recipe(name: "Борщ", cookTime: 120),
        Recipe(name: "Пельмени", cookTime: 45),
        Recipe(name: "Блины", cookTime: 30),
    ]
    
    var body: some View {
        NavigationStack {
            List(recipes) { recipe in
                // Передаём значение, а не View
                NavigationLink(value: recipe) {
                    HStack {
                        Text(recipe.name)
                        Spacer()
                        Text("\\(recipe.cookTime) мин")
                            .foregroundColor(.secondary)
                    }
                }
            }
            // Обработка маршрута по типу данных
            .navigationDestination(for: Recipe.self) { recipe in
                RecipeDetailView(recipe: recipe)
            }
            .navigationTitle("Рецепты")
        }
    }
}

struct RecipeDetailView: View {
    let recipe: Recipe
    
    var body: some View {
        VStack(spacing: 20) {
            Text(recipe.name)
                .font(.largeTitle)
            Text("Время готовки: \\(recipe.cookTime) минут")
            // Навигация дальше — вложенные переходы
        }
        .navigationTitle(recipe.name)
    }
}`} />
      </section>

      {/* ─── NavigationPath — программная навигация ─── */}
      <section className="card">
        <h2>🗺️ NavigationPath — программная навигация</h2>
        <p>
          <code>NavigationPath</code> — это массив-стек, которым можно управлять программно.
          Аналог <code>useNavigate()</code> в React Router. Можно push-ить, pop-ить
          и даже полностью заменять стек.
        </p>

        <CodeBlock language="swift" title="Программная навигация с NavigationPath" code={`
struct AppView: View {
    @State private var path = NavigationPath()
    
    var body: some View {
        NavigationStack(path: $path) {
            VStack(spacing: 20) {
                // Программный переход — аналог navigate('/profile')
                Button("Открыть профиль") {
                    path.append("profile")
                }
                
                // Переход с данными
                Button("Открыть рецепт") {
                    path.append(Recipe(name: "Борщ", cookTime: 120))
                }
                
                // Глубокий переход — несколько экранов сразу
                Button("Deep Link: Профиль → Настройки") {
                    path.append("profile")
                    path.append("settings")
                }
                
                // Pop to root — вернуться на главную
                Button("На главную") {
                    path = NavigationPath()  // очищаем стек
                }
                
                // Pop один экран
                Button("Назад") {
                    if !path.isEmpty {
                        path.removeLast()
                    }
                }
            }
            .navigationDestination(for: String.self) { route in
                switch route {
                case "profile":
                    ProfileView(path: $path)
                case "settings":
                    SettingsView()
                default:
                    Text("404: \\(route)")
                }
            }
            .navigationDestination(for: Recipe.self) { recipe in
                RecipeDetailView(recipe: recipe)
            }
            .navigationTitle("Главная")
        }
    }
}`} />

        <div className="feature-grid">
          <div className="feature-card">
            <h3>SwiftUI NavigationPath</h3>
            <CodeBlock language="swift" code={`
// Push
path.append("profile")

// Pop
path.removeLast()

// Pop to root
path = NavigationPath()

// Pop N экранов
path.removeLast(3)

// Deep link
path.append("catalog")
path.append(product)
path.append("reviews")`} />
          </div>
          <div className="feature-card">
            <h3>React Router useNavigate</h3>
            <CodeBlock language="swift" code={`
const navigate = useNavigate()

// Push
navigate('/profile')

// Pop (back)
navigate(-1)

// Replace (pop to root + push)
navigate('/', { replace: true })

// Pop N экранов
navigate(-3)

// Deep link — просто URL
navigate('/catalog/42/reviews')`} />
          </div>
        </div>
      </section>

      {/* ─── Toolbar и navigationBarItems ─── */}
      <section className="card">
        <h2>🔧 Toolbar — кнопки в навигационной панели</h2>
        <p>
          <code>.toolbar</code> добавляет кнопки и элементы в навигационную панель.
          В React это обычно решается через layout-компоненты с header slots.
        </p>

        <CodeBlock language="swift" title="Toolbar и placement" code={`
struct ItemListView: View {
    @State private var items = ["Item 1", "Item 2"]
    @State private var showingAdd = false
    
    var body: some View {
        List(items, id: \\.self) { item in
            Text(item)
        }
        .navigationTitle("Мои записи")
        .toolbar {
            // Кнопка справа вверху
            ToolbarItem(placement: .navigationBarTrailing) {
                Button {
                    showingAdd = true
                } label: {
                    Image(systemName: "plus")
                }
            }
            
            // Кнопка слева
            ToolbarItem(placement: .navigationBarLeading) {
                EditButton()
            }
            
            // Внизу экрана
            ToolbarItem(placement: .bottomBar) {
                Text("\\(items.count) записей")
                    .foregroundColor(.secondary)
            }
            
            // Группа кнопок
            ToolbarItemGroup(placement: .navigationBarTrailing) {
                Button { } label: { Image(systemName: "square.and.arrow.up") }
                Button { } label: { Image(systemName: "ellipsis.circle") }
            }
        }
        .sheet(isPresented: $showingAdd) {
            AddItemView()
        }
    }
}`} />
      </section>

      {/* ─── NavigationSplitView ─── */}
      <section className="card">
        <h2>📱 NavigationSplitView — iPad и macOS</h2>
        <p>
          Для iPad и macOS есть <code>NavigationSplitView</code> — split-view с sidebar,
          как в Mail или Notes. Автоматически адаптируется: на iPhone — стек, на iPad — колонки.
        </p>

        <CodeBlock language="swift" title="NavigationSplitView — двухколоночная навигация" code={`
struct MailApp: View {
    @State private var selectedFolder: String?
    @State private var selectedMail: Mail?
    
    let folders = ["Входящие", "Отправленные", "Черновики", "Корзина"]
    
    var body: some View {
        // Двухколоночный layout
        NavigationSplitView {
            // Sidebar — левая колонка
            List(folders, id: \\.self, selection: $selectedFolder) { folder in
                Label(folder, systemImage: folderIcon(folder))
            }
            .navigationTitle("Почта")
        } content: {
            // Content — средняя колонка (опционально)
            if let folder = selectedFolder {
                MailListView(folder: folder, selection: $selectedMail)
            } else {
                Text("Выберите папку")
            }
        } detail: {
            // Detail — правая колонка
            if let mail = selectedMail {
                MailDetailView(mail: mail)
            } else {
                Text("Выберите письмо")
                    .foregroundColor(.secondary)
            }
        }
        .navigationSplitViewStyle(.balanced)  // равные колонки
    }
}`} />

        <div className="info-box">
          <strong>📌 Адаптивность:</strong> На iPhone <code>NavigationSplitView</code> автоматически
          превращается в обычный стек. Не нужен отдельный код для разных устройств — это
          responsive design на уровне фреймворка.
        </div>
      </section>

      {/* ─── Deep Linking ─── */}
      <section className="card">
        <h2>🔗 Deep Linking</h2>
        <p>
          Deep linking в SwiftUI позволяет открыть конкретный экран из URL, пуш-уведомления
          или Spotlight. Используем <code>.onOpenURL</code> и программную навигацию.
        </p>

        <CodeBlock language="swift" title="Обработка deep link" code={`
// Enum для маршрутов (type-safe!)
enum AppRoute: Hashable {
    case profile(userId: String)
    case recipe(id: Int)
    case settings
}

struct AppView: View {
    @State private var path = NavigationPath()
    
    var body: some View {
        NavigationStack(path: $path) {
            HomeView()
                .navigationDestination(for: AppRoute.self) { route in
                    switch route {
                    case .profile(let id):
                        ProfileView(userId: id)
                    case .recipe(let id):
                        RecipeView(recipeId: id)
                    case .settings:
                        SettingsView()
                    }
                }
        }
        // Обработка URL: myapp://recipe/42
        .onOpenURL { url in
            if let route = parseDeepLink(url) {
                path.append(route)
            }
        }
    }
    
    func parseDeepLink(_ url: URL) -> AppRoute? {
        guard let components = URLComponents(url: url, resolvingAgainstBaseURL: false),
              let host = components.host else { return nil }
        
        switch host {
        case "profile":
            let id = components.queryItems?.first?.value ?? ""
            return .profile(userId: id)
        case "recipe":
            let id = Int(url.lastPathComponent) ?? 0
            return .recipe(id: id)
        default:
            return nil
        }
    }
}`} />
      </section>

      {/* ─── Паттерны навигации ─── */}
      <section className="card">
        <h2>📐 Общие паттерны навигации</h2>

        <CodeBlock language="swift" title="TabView + NavigationStack (типичное приложение)" code={`
struct MainTabView: View {
    var body: some View {
        TabView {
            // Каждый таб — свой NavigationStack
            NavigationStack {
                HomeView()
                    .navigationTitle("Главная")
            }
            .tabItem {
                Label("Главная", systemImage: "house")
            }
            
            NavigationStack {
                SearchView()
                    .navigationTitle("Поиск")
            }
            .tabItem {
                Label("Поиск", systemImage: "magnifyingglass")
            }
            
            NavigationStack {
                ProfileView()
                    .navigationTitle("Профиль")
            }
            .tabItem {
                Label("Профиль", systemImage: "person")
            }
        }
    }
}`} />

        <div className="info-box">
          <strong>💡 Важный паттерн:</strong> Каждый таб имеет свой <code>NavigationStack</code>.
          Это значит, каждый таб имеет свою историю навигации — переключение табов не сбрасывает
          стек. Как отдельные <code>BrowserRouter</code> на каждый таб.
        </div>
      </section>

      {/* ─── Итого ─── */}
      <section className="card">
        <h2>📝 Шпаргалка: React Router → SwiftUI Navigation</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>React Router</h3>
            <ul>
              <li><code>&lt;BrowserRouter&gt;</code></li>
              <li><code>&lt;Route path="/profile"&gt;</code></li>
              <li><code>&lt;Link to="/profile"&gt;</code></li>
              <li><code>useNavigate()</code></li>
              <li><code>useParams()</code></li>
              <li><code>navigate(-1)</code></li>
              <li><code>Outlet</code></li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>SwiftUI</h3>
            <ul>
              <li><code>NavigationStack</code></li>
              <li><code>.navigationDestination(for:)</code></li>
              <li><code>NavigationLink(value:)</code></li>
              <li><code>NavigationPath.append()</code></li>
              <li>Значение передаётся в destination</li>
              <li><code>@Environment(\\.dismiss)</code></li>
              <li><code>NavigationSplitView</code></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
