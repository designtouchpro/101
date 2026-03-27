import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import PhoneMockup from '../components/PhoneMockup'

export default function EnvironmentPage() {
  const [envDarkMode, setEnvDarkMode] = useState(false)

  return (
    <div className="demo-container">
      <h1>🌍 Environment</h1>
      <p>
        Environment в SwiftUI — это механизм передачи данных через дерево View без prop drilling.
        Прямой аналог <strong>React Context</strong>. SwiftUI предоставляет два инструмента:
        <code>@Environment</code> для системных значений и <code>@EnvironmentObject</code> для
        кастомных данных.
      </p>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">React-разработчику</div>
          <p>
            Если ты использовал <code>useContext()</code> в React — Environment работает по тому же
            принципу. Данные «инжектятся» вверху дерева и доступны любому потомку без прокидывания
            через props (Binding). Разница: SwiftUI имеет встроенные системные значения (colorScheme,
            locale и др.), которых нет в React «из коробки».
          </p>
        </div>
      </div>

      {/* ─── @Environment — системные значения ─── */}
      <section className="card">
        <h2>📦 @Environment — системные значения</h2>
        <p>
          <code>@Environment</code> даёт доступ к системным значениям, которые SwiftUI
          автоматически предоставляет: цветовая схема, локаль, размер шрифта, dismiss action и др.
          Это как встроенные Context-ы, которые всегда доступны.
        </p>

        <CodeBlock language="swift" title="Чтение системных @Environment значений" code={`
struct SettingsView: View {
    // Читаем системные значения из Environment
    @Environment(\\.colorScheme) var colorScheme        // .light или .dark
    @Environment(\\.locale) var locale                   // текущая локаль
    @Environment(\\.horizontalSizeClass) var sizeClass  // compact / regular
    @Environment(\\.dismiss) var dismiss                 // action для закрытия экрана
    @Environment(\\.openURL) var openURL                 // action для открытия URL
    @Environment(\\.dynamicTypeSize) var typeSize        // размер шрифта пользователя
    
    var body: some View {
        VStack(spacing: 16) {
            // Адаптация под тему
            Text("Текущая тема: \\(colorScheme == .dark ? "Тёмная" : "Светлая")")
            
            // Адаптация под размер экрана
            if sizeClass == .compact {
                Text("Компактный экран (iPhone)")
            } else {
                Text("Широкий экран (iPad)")
            }
            
            // Dismiss — как navigate(-1) в React Router
            Button("Закрыть") {
                dismiss()
            }
            
            // Открытие URL
            Button("Открыть сайт") {
                openURL(URL(string: "https://apple.com")!)
            }
        }
    }
}`} />

        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <PhoneMockup title="AdaptiveView" darkMode={envDarkMode}>
            <div className="sim-vstack" style={{ gap: '16px', padding: '20px' }}>
              <span className="sim-text" style={{ fontSize: '32px', textAlign: 'center' }}>
                {envDarkMode ? '🌙 Тёмная тема' : '☀️ Светлая тема'}
              </span>
              <span className="sim-text" style={{ fontSize: '14px', textAlign: 'center' }}>
                iPad / большой экран
              </span>
              <div className="sim-list">
                <div className="sim-form-row">
                  <span className="sim-text" style={{ flex: 1, fontSize: '14px' }}>Dark Mode</span>
                  <div className={envDarkMode ? 'sim-toggle' : 'sim-toggle--off'}
                    onClick={() => setEnvDarkMode(v => !v)} style={{ cursor: 'pointer' }} />
                </div>
              </div>
              <button className="sim-button--filled" style={{ width: '100%' }}>
                ✕ Закрыть
              </button>
              <span className="sim-text--secondary" style={{ fontSize: '11px', textAlign: 'center', fontFamily: 'monospace' }}>
                @Environment(\.colorScheme) var colorScheme
              </span>
            </div>
          </PhoneMockup>
        </div>

        <div className="info-box">
          <strong>⚠️ KeyPath синтаксис:</strong> Обрати внимание на <code>\\.colorScheme</code> — 
          это Swift KeyPath. Он указывает, какое именно значение из EnvironmentValues мы хотим прочитать.
          Как destructuring в React: <code>const {'{'} theme {'}'} = useContext(AppContext)</code>.
        </div>
      </section>

      {/* ─── Сравнение с React Context ─── */}
      <section className="card">
        <h2>⚡ Сравнение: @Environment vs React Context</h2>
        <p>
          Посмотрим, как одна и та же задача — реакция на тёмную тему — решается в обоих фреймворках.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🍎 SwiftUI</h3>
            <CodeBlock language="swift" code={`
struct ThemedCard: View {
    @Environment(\\.colorScheme) var colorScheme
    
    var body: some View {
        Text("Привет!")
            .padding()
            .background(
                colorScheme == .dark 
                    ? Color.gray 
                    : Color.white
            )
            .cornerRadius(12)
    }
}

// Переключение темы для превью
#Preview("Dark") {
    ThemedCard()
        .environment(\\.colorScheme, .dark)
}
#Preview("Light") {
    ThemedCard()
        .environment(\\.colorScheme, .light)
}`} />
          </div>
          <div className="feature-card">
            <h3>⚛️ React</h3>
            <CodeBlock language="swift" code={`
// React Context для темы
const ThemeContext = createContext('light')

function ThemedCard() {
  const theme = useContext(ThemeContext)
  
  return (
    <div style={{
      padding: 16,
      background: theme === 'dark' 
        ? '#333' 
        : '#fff',
      borderRadius: 12
    }}>
      Привет!
    </div>
  )
}

// Provider оборачивает дерево
<ThemeContext.Provider value="dark">
  <ThemedCard />
</ThemeContext.Provider>`} />
          </div>
        </div>
      </section>

      {/* ─── .environment() modifier ─── */}
      <section className="card">
        <h2>🔧 .environment() modifier</h2>
        <p>
          Модификатор <code>.environment()</code> позволяет переопределить системные значения
          для поддерева View. Это аналог оборачивания в <code>&lt;Provider value=...&gt;</code> в React.
        </p>

        <CodeBlock language="swift" title="Переопределение environment для поддерева" code={`
struct ContentView: View {
    var body: some View {
        VStack {
            // Этот блок всегда в тёмной теме
            SettingsView()
                .environment(\\.colorScheme, .dark)
            
            // Этот блок с увеличенным шрифтом
            ProfileView()
                .environment(\\.dynamicTypeSize, .xxxLarge)
            
            // Принудительно правый layout (арабский)
            ArabicView()
                .environment(\\.layoutDirection, .rightToLeft)
            
            // Переопределение локали
            LocalizedView()
                .environment(\\.locale, Locale(identifier: "ru_RU"))
        }
    }
}`} />

        <div className="info-box">
          <strong>💡 Каскадность:</strong> Как и CSS, environment значения каскадируются вниз.
          Дочерний View может переопределить значение для своего поддерева. Ближайший
          <code>.environment()</code> «побеждает» — точно как nested Providers в React.
        </div>
      </section>

      {/* ─── @EnvironmentObject ─── */}
      <section className="card">
        <h2>👥 @EnvironmentObject — кастомные shared данные</h2>
        <p>
          <code>@EnvironmentObject</code> позволяет передавать свои модели данных через дерево View.
          Это ближе всего к <code>React Context + useContext</code> для кастомных данных
          (авторизация, настройки, корзина и т.д.).
        </p>

        <CodeBlock language="swift" title="Создание и использование @EnvironmentObject" code={`
// 1. Модель данных — ObservableObject (как React Context value)
class UserSettings: ObservableObject {
    @Published var username = "Гость"
    @Published var isDarkMode = false
    @Published var fontSize: Double = 16
    @Published var notifications = true
}

// 2. View, который читает данные из Environment
struct ProfileView: View {
    @EnvironmentObject var settings: UserSettings  // ← "useContext"
    
    var body: some View {
        VStack {
            Text("Привет, \\(settings.username)!")
                .font(.system(size: settings.fontSize))
            
            Toggle("Тёмная тема", isOn: $settings.isDarkMode)
            Toggle("Уведомления", isOn: $settings.notifications)
            
            Slider(value: $settings.fontSize, in: 12...32, step: 1)
        }
    }
}

// 3. Вложенный View — тоже имеет доступ (без prop drilling!)
struct DeepNestedView: View {
    @EnvironmentObject var settings: UserSettings
    
    var body: some View {
        Text("Размер шрифта: \\(Int(settings.fontSize))")
    }
}

// 4. Инъекция в корне — как Provider
@main
struct MyApp: App {
    @StateObject var settings = UserSettings()  // создаём один раз
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(settings)  // ← <Provider value={settings}>
        }
    }
}`} />

        <div className="info-box">
          <strong>⚠️ Crash при отсутствии:</strong> Если View использует <code>@EnvironmentObject</code>,
          но объект не был предоставлен через <code>.environmentObject()</code> — приложение крашнется.
          В React Context хотя бы вернёт undefined. Всегда проверяй, что Provider на месте!
        </div>
      </section>

      {/* ─── Новый подход: @Observable + @Environment ─── */}
      <section className="card">
        <h2>✨ Современный подход: @Observable (iOS 17+)</h2>
        <p>
          Начиная с iOS 17, вместо <code>ObservableObject</code> + <code>@EnvironmentObject</code>
          можно использовать макрос <code>@Observable</code> с обычным <code>@Environment</code>.
          Это проще и безопаснее.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Старый подход (iOS 14+)</h3>
            <CodeBlock language="swift" code={`
// Модель
class Store: ObservableObject {
    @Published var count = 0
}

// View
struct MyView: View {
    @EnvironmentObject var store: Store
    
    var body: some View {
        Text("Count: \\(store.count)")
    }
}

// Инъекция
ContentView()
    .environmentObject(Store())`} />
          </div>
          <div className="feature-card">
            <h3>Новый подход (iOS 17+)</h3>
            <CodeBlock language="swift" code={`
// Модель — просто @Observable
@Observable
class Store {
    var count = 0  // не нужен @Published!
}

// View — обычный @Environment
struct MyView: View {
    @Environment(Store.self) var store
    
    var body: some View {
        Text("Count: \\(store.count)")
    }
}

// Инъекция
ContentView()
    .environment(Store())`} />
          </div>
        </div>

        <div className="info-box">
          <strong>💡 Почему лучше:</strong> С <code>@Observable</code> не нужен <code>@Published</code>
          для каждого свойства. SwiftUI автоматически отслеживает, какие свойства читает View,
          и обновляет только те View, которые реально зависят от изменённых данных.
          Это как автоматический React.memo + selectors.
        </div>
      </section>

      {/* ─── EnvironmentKey — кастомные ключи ─── */}
      <section className="card">
        <h2>🔑 EnvironmentKey — создание кастомных значений</h2>
        <p>
          Можно создать свои ключи для Environment — это как создание нового Context в React.
          Полезно для библиотек и переиспользуемых компонентов.
        </p>

        <CodeBlock language="swift" title="Создание Custom EnvironmentKey" code={`
// 1. Определяем ключ с дефолтным значением
struct AccentColorKey: EnvironmentKey {
    static let defaultValue: Color = .blue  // значение по умолчанию
}

// 2. Расширяем EnvironmentValues
extension EnvironmentValues {
    var accentThemeColor: Color {
        get { self[AccentColorKey.self] }
        set { self[AccentColorKey.self] = newValue }
    }
}

// 3. (Опционально) Удобный модификатор
extension View {
    func accentThemeColor(_ color: Color) -> some View {
        environment(\\.accentThemeColor, color)
    }
}

// 4. Использование
struct ThemedButton: View {
    @Environment(\\.accentThemeColor) var color
    
    var body: some View {
        Button("Нажми меня") { }
            .padding()
            .background(color)
            .foregroundColor(.white)
            .cornerRadius(8)
    }
}

// Инъекция кастомного значения
VStack {
    ThemedButton()                          // синий (default)
    ThemedButton().accentThemeColor(.red)   // красный
    
    VStack {
        ThemedButton()  // зелёный — каскад от родителя
        ThemedButton()  // зелёный
    }
    .accentThemeColor(.green)
}`} />
      </section>

      {/* ─── Полный пример: React vs SwiftUI ─── */}
      <section className="card">
        <h2>🔄 Полный пример: Theme Context</h2>
        <p>
          Сравним полную реализацию переключаемой темы — один и тот же паттерн в React и SwiftUI.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🍎 SwiftUI — Theme Environment</h3>
            <CodeBlock language="swift" code={`
@Observable
class ThemeManager {
    var isDark = false
    
    var backgroundColor: Color {
        isDark ? .black : .white
    }
    var textColor: Color {
        isDark ? .white : .black
    }
    
    func toggle() { isDark.toggle() }
}

struct AppView: View {
    @State var theme = ThemeManager()
    
    var body: some View {
        ContentView()
            .environment(theme)
    }
}

struct ContentView: View {
    @Environment(ThemeManager.self) var theme
    
    var body: some View {
        ZStack {
            theme.backgroundColor.ignoresSafeArea()
            
            VStack {
                Text("Hello!")
                    .foregroundColor(theme.textColor)
                
                Button("Переключить тему") {
                    theme.toggle()
                }
            }
        }
    }
}`} />
          </div>
          <div className="feature-card">
            <h3>⚛️ React — Theme Context</h3>
            <CodeBlock language="swift" code={`
// ThemeContext.tsx
const ThemeContext = createContext({
  isDark: false,
  toggle: () => {},
  backgroundColor: '#fff',
  textColor: '#000',
})

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)
  
  const value = {
    isDark,
    toggle: () => setIsDark(d => !d),
    backgroundColor: isDark ? '#000' : '#fff',
    textColor: isDark ? '#fff' : '#000',
  }
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// Component
function Content() {
  const theme = useContext(ThemeContext)
  
  return (
    <div style={{ 
      background: theme.backgroundColor,
      color: theme.textColor
    }}>
      <h1>Hello!</h1>
      <button onClick={theme.toggle}>
        Переключить тему
      </button>
    </div>
  )
}`} />
          </div>
        </div>
      </section>

      {/* ─── Популярные @Environment значения ─── */}
      <section className="card">
        <h2>📋 Популярные @Environment значения</h2>
        <p>Наиболее часто используемые системные значения Environment:</p>

        <CodeBlock language="swift" title="Справочник @Environment значений" code={`
// Внешний вид
@Environment(\\.colorScheme) var colorScheme             // .light / .dark
@Environment(\\.dynamicTypeSize) var typeSize            // размер шрифта пользователя
@Environment(\\.layoutDirection) var direction            // .leftToRight / .rightToLeft
@Environment(\\.pixelLength) var pixel                    // размер 1 пикселя

// Навигация и действия
@Environment(\\.dismiss) var dismiss                      // закрыть текущий экран
@Environment(\\.openURL) var openURL                      // открыть URL
@Environment(\\.openWindow) var openWindow                // открыть окно (macOS)
@Environment(\\.refresh) var refresh                      // pull-to-refresh action

// Состояние
@Environment(\\.isEnabled) var isEnabled                  // включён ли View
@Environment(\\.isFocused) var isFocused                  // в фокусе ли
@Environment(\\.editMode) var editMode                    // режим редактирования
@Environment(\\.scenePhase) var phase                     // active / background / inactive

// Размеры и класс устройства
@Environment(\\.horizontalSizeClass) var hClass           // compact / regular
@Environment(\\.verticalSizeClass) var vClass             // compact / regular

// Accessibility
@Environment(\\.accessibilityReduceMotion) var reduce     // пользователь просит меньше анимаций
@Environment(\\.accessibilityReduceTransparency) var rt   // меньше прозрачности
@Environment(\\.accessibilityVoiceOverEnabled) var vo     // VoiceOver включён`} />
      </section>

      {/* ─── Итого ─── */}
      <section className="card">
        <h2>📝 Итого: Environment vs React Context</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Что общего</h3>
            <ul>
              <li>Данные передаются через дерево без prop drilling</li>
              <li>Значение определяется ближайшим «Provider» вверху</li>
              <li>Изменение значения вызывает ре-рендер потребителей</li>
              <li>Можно создавать свои кастомные значения</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>Различия</h3>
            <ul>
              <li>SwiftUI имеет десятки встроенных значений</li>
              <li><code>@EnvironmentObject</code> крашится без Provider</li>
              <li><code>@Observable</code> (iOS 17) = автоматический мемоизация</li>
              <li>KeyPath синтаксис вместо createContext()</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
