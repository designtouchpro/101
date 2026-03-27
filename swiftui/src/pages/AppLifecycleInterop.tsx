import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

type Tab = 'app-lifecycle' | 'scenes' | 'uikit-bridge' | 'limits'

const appLifecycleCode = `// App protocol — точка входа iOS 14+
@main
struct MyApp: App {
  // StateObject живёт столько же, сколько App
  @StateObject private var appState = AppState()

  // Отслеживаем фазу приложения
  @Environment(\\.scenePhase) var scenePhase

  var body: some Scene {
    WindowGroup {
      ContentView()
        .environmentObject(appState)
    }
    .onChange(of: scenePhase) { oldPhase, newPhase in
      switch newPhase {
      case .active:
        // Приложение на переднем плане
        print("App became active")
      case .inactive:
        // Переход (например, swipe-up)
        print("App became inactive")
      case .background:
        // Свернули — сохраняем данные
        appState.saveIfNeeded()
      @unknown default:
        break
      }
    }
  }
}`

const sceneCode = `// Scene types в SwiftUI
@main
struct MyApp: App {
  var body: some Scene {
    // 1. WindowGroup — основное окно (iOS / macOS)
    WindowGroup {
      ContentView()
    }

    // 2. DocumentGroup — документо-ориентированные приложения
    DocumentGroup(newDocument: TextDocument()) { file in
      TextEditor(text: file.\\$document.text)
    }

    // 3. Settings — окно настроек (только macOS)
    #if os(macOS)
    Settings {
      PreferencesView()
    }
    #endif

    // 4. WindowGroup с id — дополнительные окна (macOS/iPadOS)
    WindowGroup(id: "detail") {
      DetailView()
    }

    // 5. MenuBarExtra — иконка в menu bar (macOS)
    #if os(macOS)
    MenuBarExtra("Status", systemImage: "bolt.fill") {
      StatusMenu()
    }
    #endif
  }
}`

const scenePhaseCode = `// ScenePhase — состояние сцены
struct ContentView: View {
  @Environment(\\.scenePhase) var scenePhase

  var body: some View {
    Text("Hello")
      .onChange(of: scenePhase) { _, phase in
        switch phase {
        case .active:
          // Сцена видима и интерактивна
          startTimer()
        case .inactive:
          // Сцена видима, но не интерактивна
          // (incoming call, notification center)
          pauseTimer()
        case .background:
          // Сцена не видима
          saveState()
          cancelNetworkRequests()
        @unknown default: break
        }
      }
  }
}

// На уровне App — агрегирует все сцены
// На уровне Scene — конкретная сцена
// На уровне View — ближайшая сцена`

const uikitInSwiftUICode = `// UIViewRepresentable — UIKit View → SwiftUI
struct MapView: UIViewRepresentable {
  @Binding var region: MKCoordinateRegion

  // 1. Создание UIKit view
  func makeUIView(context: Context) -> MKMapView {
    let mapView = MKMapView()
    mapView.delegate = context.coordinator
    return mapView
  }

  // 2. Обновление при изменении SwiftUI state
  func updateUIView(_ mapView: MKMapView, context: Context) {
    mapView.setRegion(region, animated: true)
  }

  // 3. Coordinator для delegate-паттернов
  func makeCoordinator() -> Coordinator {
    Coordinator(self)
  }

  class Coordinator: NSObject, MKMapViewDelegate {
    var parent: MapView
    init(_ parent: MapView) { self.parent = parent }

    func mapView(_ mapView: MKMapView,
                 regionDidChangeAnimated: Bool) {
      parent.region = mapView.region
    }
  }
}`

const uivcRepresentableCode = `// UIViewControllerRepresentable — UIKit VC → SwiftUI
struct ImagePicker: UIViewControllerRepresentable {
  @Binding var selectedImage: UIImage?
  @Environment(\\.dismiss) var dismiss

  func makeUIViewController(context: Context)
    -> UIImagePickerController {
    let picker = UIImagePickerController()
    picker.delegate = context.coordinator
    return picker
  }

  func updateUIViewController(_ vc: UIImagePickerController,
                               context: Context) {}

  func makeCoordinator() -> Coordinator {
    Coordinator(self)
  }

  class Coordinator: NSObject,
    UINavigationControllerDelegate,
    UIImagePickerControllerDelegate {
    let parent: ImagePicker
    init(_ parent: ImagePicker) { self.parent = parent }

    func imagePickerController(
      _ picker: UIImagePickerController,
      didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey: Any]
    ) {
      parent.selectedImage =
        info[.originalImage] as? UIImage
      parent.dismiss()
    }
  }
}

// Использование
struct ProfileView: View {
  @State private var showPicker = false
  @State private var avatar: UIImage?

  var body: some View {
    Button("Выбрать фото") { showPicker = true }
      .sheet(isPresented: $showPicker) {
        ImagePicker(selectedImage: $avatar)
      }
  }
}`

const swiftuiInUIKitCode = `// UIHostingController — SwiftUI → UIKit
class SettingsViewController: UIViewController {
  override func viewDidLoad() {
    super.viewDidLoad()

    // Оборачиваем SwiftUI View в UIKit контроллер
    let swiftUIView = SettingsView()
    let hostingController = UIHostingController(
      rootView: swiftUIView
    )

    // Добавляем как child
    addChild(hostingController)
    view.addSubview(hostingController.view)
    hostingController.view.translatesAutoresizingMaskIntoConstraints = false
    NSLayoutConstraint.activate([
      hostingController.view.topAnchor
        .constraint(equalTo: view.topAnchor),
      hostingController.view.bottomAnchor
        .constraint(equalTo: view.bottomAnchor),
      hostingController.view.leadingAnchor
        .constraint(equalTo: view.leadingAnchor),
      hostingController.view.trailingAnchor
        .constraint(equalTo: view.trailingAnchor),
    ])
    hostingController.didMove(toParent: self)
  }
}

// В Storyboard / UIKit navigation
let detailVC = UIHostingController(
  rootView: DetailView(item: selected)
)
navigationController?.pushViewController(
  detailVC, animated: true
)`

export default function AppLifecycleInterop() {
  const [tab, setTab] = useState<Tab>('app-lifecycle')

  return (
    <div className="demo-container">
      <h1>🔄 App Lifecycle & UIKit Interop</h1>
      <p>
        В React жизненный цикл — это <code>useEffect</code>. В SwiftUI — это <code>App</code> протокол,
        <code> Scene</code>, <code>ScenePhase</code> и мост к UIKit через Representable-протоколы.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {([
          ['app-lifecycle', '🚀 App Lifecycle'],
          ['scenes', '🪟 Scenes'],
          ['uikit-bridge', '🌉 UIKit Bridge'],
          ['limits', '⚠️ Границы SwiftUI'],
        ] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              cursor: 'pointer', padding: '8px 16px', fontSize: '0.9rem',
              border: '1px solid var(--border)', borderRadius: 8,
              background: tab === key ? 'var(--accent-blue, #007AFF)' : 'var(--bg-secondary)',
              color: tab === key ? '#fff' : 'var(--text-primary)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'app-lifecycle' && (
        <>
          <section className="card">
            <h2>🚀 App Protocol — точка входа</h2>
            <p>
              iOS 14+ заменил <code>AppDelegate</code> + <code>SceneDelegate</code> на декларативный
              <code> @main struct</code>. Это аналог <code>createRoot().render()</code> в React.
            </p>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
              padding: 20, borderRadius: 12,
              background: 'var(--bg-secondary, #f8f9fa)', marginBottom: 16
            }}>
              <div style={{ padding: 16, borderRadius: 8, background: '#007AFF', color: '#fff' }}>
                <strong>React</strong>
                <ul className="info-list">
                  <li><code>createRoot(el).render(&lt;App/&gt;)</code></li>
                  <li>Нет встроенного lifecycle для «приложения»</li>
                  <li><code>visibilitychange</code> event вручную</li>
                </ul>
              </div>
              <div style={{ padding: 16, borderRadius: 8, background: '#34C759', color: '#fff' }}>
                <strong>SwiftUI</strong>
                <ul className="info-list">
                  <li><code>@main struct MyApp: App</code></li>
                  <li><code>scenePhase</code> — active/inactive/background</li>
                  <li>Автоматическое сохранение и восстановление</li>
                </ul>
              </div>
            </div>

            <CodeBlock language="swift" code={appLifecycleCode} />
          </section>

          <section className="card">
            <h2>📊 ScenePhase — фазы жизненного цикла</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Фаза</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Когда</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Что делать</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>React аналог</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><code>.active</code></td>
                  <td style={{ padding: 8 }}>Приложение на переднем плане</td>
                  <td style={{ padding: 8 }}>Запустить таймеры, обновить данные</td>
                  <td style={{ padding: 8 }}><code>visibilitychange → visible</code></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><code>.inactive</code></td>
                  <td style={{ padding: 8 }}>Переходное состояние (звонок, notification center)</td>
                  <td style={{ padding: 8 }}>Пауза, но не сохранять</td>
                  <td style={{ padding: 8 }}>—</td>
                </tr>
                <tr>
                  <td style={{ padding: 8 }}><code>.background</code></td>
                  <td style={{ padding: 8 }}>Свёрнуто / другое приложение</td>
                  <td style={{ padding: 8 }}>Сохранить данные, отменить сеть</td>
                  <td style={{ padding: 8 }}><code>visibilitychange → hidden</code></td>
                </tr>
              </tbody>
            </table>

            <CodeBlock language="swift" code={scenePhaseCode} />
          </section>

          <section className="card">
            <h2>📱 AppDelegate — когда всё ещё нужен</h2>
            <div className="info-box">
              <strong>💡 App protocol не покрывает:</strong> push-уведомления, deep links через
              UIApplicationDelegate, background fetch, Handoff. Для этого используем
              <code> @UIApplicationDelegateAdaptor</code>.
            </div>
            <CodeBlock language="swift" code={`@main
struct MyApp: App {
  // Подключаем старый AppDelegate
  @UIApplicationDelegateAdaptor(AppDelegate.self)
  var appDelegate

  var body: some Scene {
    WindowGroup { ContentView() }
  }
}

class AppDelegate: NSObject, UIApplicationDelegate {
  func application(
    _ app: UIApplication,
    didRegisterForRemoteNotificationsWithDeviceToken
      token: Data
  ) {
    // Отправить токен на сервер
  }

  func application(
    _ app: UIApplication,
    didFinishLaunchingWithOptions opts:
      [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    // Firebase, analytics, etc.
    return true
  }
}`} />
          </section>
        </>
      )}

      {tab === 'scenes' && (
        <>
          <section className="card">
            <h2>🪟 Scene Model — мультиоконность</h2>
            <p>
              <code>Scene</code> — это контейнер для UI. На iOS обычно одна сцена, на macOS/iPadOS —
              несколько окон одновременно. React не имеет аналога — это концепция нативных платформ.
            </p>
            <CodeBlock language="swift" code={sceneCode} />
          </section>

          <section className="card">
            <h2>📋 Типы Scene</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Scene</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Платформы</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Назначение</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Пример</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><code>WindowGroup</code></td>
                  <td style={{ padding: 8 }}>iOS, macOS, iPadOS</td>
                  <td style={{ padding: 8 }}>Основное окно приложения</td>
                  <td style={{ padding: 8 }}>Любое приложение</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><code>DocumentGroup</code></td>
                  <td style={{ padding: 8 }}>iOS, macOS</td>
                  <td style={{ padding: 8 }}>Работа с файлами/документами</td>
                  <td style={{ padding: 8 }}>Pages, текстовый редактор</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><code>Settings</code></td>
                  <td style={{ padding: 8 }}>macOS</td>
                  <td style={{ padding: 8 }}>Окно настроек (⌘,)</td>
                  <td style={{ padding: 8 }}>Preferences</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><code>MenuBarExtra</code></td>
                  <td style={{ padding: 8 }}>macOS</td>
                  <td style={{ padding: 8 }}>Иконка в menu bar</td>
                  <td style={{ padding: 8 }}>Bartender, iStat</td>
                </tr>
                <tr>
                  <td style={{ padding: 8 }}><code>Window</code></td>
                  <td style={{ padding: 8 }}>macOS</td>
                  <td style={{ padding: 8 }}>Единственное окно (не дублируется)</td>
                  <td style={{ padding: 8 }}>About, License</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>🔀 State Restoration</h2>
            <div className="info-box">
              <strong>💡 Автоматическое сохранение:</strong> SwiftUI автоматически сохраняет и
              восстанавливает <code>@SceneStorage</code> при переходе в background. Это аналог
              <code> sessionStorage</code> в вебе, но надёжнее.
            </div>
            <CodeBlock language="swift" code={`struct ContentView: View {
  // Автоматически сохраняется при background
  @SceneStorage("selectedTab") var selectedTab = 0
  @SceneStorage("searchText") var searchText = ""
  @SceneStorage("scrollPosition") var scrollPos = 0.0

  var body: some View {
    TabView(selection: $selectedTab) {
      HomeTab().tag(0)
      SearchTab(text: $searchText).tag(1)
      ProfileTab().tag(2)
    }
  }
}

// @AppStorage — аналог localStorage (UserDefaults)
// @SceneStorage — аналог sessionStorage (per-scene)`} />
          </section>
        </>
      )}

      {tab === 'uikit-bridge' && (
        <>
          <section className="card">
            <h2>🌉 UIKit ↔ SwiftUI — двусторонний мост</h2>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
              padding: 20, borderRadius: 12,
              background: 'var(--bg-secondary, #f8f9fa)', marginBottom: 16
            }}>
              <div style={{ padding: 16, borderRadius: 8, border: '2px solid #007AFF' }}>
                <strong>UIKit → SwiftUI</strong>
                <ul className="info-list">
                  <li><code>UIViewRepresentable</code></li>
                  <li><code>UIViewControllerRepresentable</code></li>
                  <li>Для: MKMapView, WKWebView, UIImagePicker</li>
                </ul>
              </div>
              <div style={{ padding: 16, borderRadius: 8, border: '2px solid #34C759' }}>
                <strong>SwiftUI → UIKit</strong>
                <ul className="info-list">
                  <li><code>UIHostingController</code></li>
                  <li>Для: постепенной миграции</li>
                  <li>Внедряем SwiftUI в UIKit-приложение</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="card">
            <h2>🔌 UIViewRepresentable — UIKit View в SwiftUI</h2>
            <p>
              Три обязательных метода: <code>makeUIView</code> (создание), <code>updateUIView</code> (обновление
              при изменении state), <code>makeCoordinator</code> (для delegate-паттернов UIKit).
            </p>
            <CodeBlock language="swift" code={uikitInSwiftUICode} />
          </section>

          <section className="card">
            <h2>📷 UIViewControllerRepresentable — UIKit VC в SwiftUI</h2>
            <p>
              То же самое, но для <code>UIViewController</code>. Нужен для компонентов с собственным
              контроллером: камера, галерея, почта.
            </p>
            <CodeBlock language="swift" code={uivcRepresentableCode} />
          </section>

          <section className="card">
            <h2>🔄 UIHostingController — SwiftUI в UIKit</h2>
            <p>
              Для постепенной миграции: оборачиваем SwiftUI view в UIKit контроллер.
              Можно использовать в Storyboard, UINavigationController, UITabBarController.
            </p>
            <CodeBlock language="swift" code={swiftuiInUIKitCode} />
          </section>

          <section className="card">
            <h2>📋 Стратегия миграции UIKit → SwiftUI</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Этап</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Действие</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Инструмент</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}>1. Листья</td>
                  <td style={{ padding: 8 }}>Переписать простые экраны на SwiftUI</td>
                  <td style={{ padding: 8 }}><code>UIHostingController</code></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}>2. Навигация</td>
                  <td style={{ padding: 8 }}>Оставить UIKit navigation, подключать SwiftUI экраны</td>
                  <td style={{ padding: 8 }}><code>UIHostingController</code> в push</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}>3. Данные</td>
                  <td style={{ padding: 8 }}>Перевести state management на @Observable</td>
                  <td style={{ padding: 8 }}><code>@Observable</code> class</td>
                </tr>
                <tr>
                  <td style={{ padding: 8 }}>4. Корень</td>
                  <td style={{ padding: 8 }}>Заменить AppDelegate на App protocol</td>
                  <td style={{ padding: 8 }}><code>@main struct</code></td>
                </tr>
              </tbody>
            </table>
          </section>
        </>
      )}

      {tab === 'limits' && (
        <>
          <section className="card">
            <h2>⚠️ Когда чистого SwiftUI недостаточно</h2>
            <p>
              SwiftUI покрывает ~80% задач. Но есть области, где UIKit по-прежнему необходим.
              Важно знать эти границы, чтобы не тратить время на обходы.
            </p>
          </section>

          <section className="card">
            <h2>🚫 Что не умеет SwiftUI (или умеет плохо)</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Задача</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Проблема в SwiftUI</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Решение</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><strong>Камера / ARKit</strong></td>
                  <td style={{ padding: 8 }}>Нет нативного API</td>
                  <td style={{ padding: 8 }}><code>UIViewRepresentable</code> + AVCaptureSession</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><strong>WebView</strong></td>
                  <td style={{ padding: 8 }}>Нет SwiftUI-обёртки</td>
                  <td style={{ padding: 8 }}><code>UIViewRepresentable</code> + WKWebView</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><strong>Сложные жесты</strong></td>
                  <td style={{ padding: 8 }}>Ограниченная кастомизация</td>
                  <td style={{ padding: 8 }}><code>UIGestureRecognizer</code> через Representable</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><strong>CollectionView</strong></td>
                  <td style={{ padding: 8 }}>LazyVGrid менее гибок</td>
                  <td style={{ padding: 8 }}><code>UICollectionViewCompositionalLayout</code></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><strong>Текстовый редактор</strong></td>
                  <td style={{ padding: 8 }}>TextEditor — базовый</td>
                  <td style={{ padding: 8 }}><code>UITextView</code> через Representable</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><strong>Push-уведомления</strong></td>
                  <td style={{ padding: 8 }}>Нет SwiftUI API для регистрации</td>
                  <td style={{ padding: 8 }}><code>@UIApplicationDelegateAdaptor</code></td>
                </tr>
                <tr>
                  <td style={{ padding: 8 }}><strong>Точный контроль layout</strong></td>
                  <td style={{ padding: 8 }}>Нет Auto Layout constraints</td>
                  <td style={{ padding: 8 }}><code>Layout</code> protocol (iOS 16+) или UIKit</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>✅ Правило принятия решений</h2>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr', gap: 12,
              padding: 20, borderRadius: 12,
              background: 'var(--bg-secondary, #f8f9fa)',
            }}>
              {[
                { q: 'Есть ли нативный SwiftUI компонент?', yes: '→ Используй SwiftUI', no: '→ См. ниже' },
                { q: 'Нужен UIKit delegate / datasource?', yes: '→ Representable + Coordinator', no: '→ SwiftUI' },
                { q: 'Нужен hardware-доступ (камера, BLE)?', yes: '→ UIKit через Representable', no: '→ SwiftUI' },
                { q: 'Проект уже на UIKit?', yes: '→ UIHostingController для новых экранов', no: '→ Чистый SwiftUI' },
              ].map((item, i) => (
                <div key={i} style={{ padding: 12, borderRadius: 8, border: '1px solid var(--border)' }}>
                  <strong>{item.q}</strong>
                  <div style={{ marginTop: 4 }}>
                    <span style={{ color: '#34C759' }}>Да {item.yes}</span>{' · '}
                    <span style={{ color: '#007AFF' }}>Нет {item.no}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>❓ Вопросы на собесе</h2>
            <div className="interview-item">
              <div className="q">Как встроить MKMapView в SwiftUI?</div>
              <div className="a">Через UIViewRepresentable: makeUIView создаёт MKMapView, updateUIView обновляет
                регион из @Binding, Coordinator реализует MKMapViewDelegate для обратной связи</div>
            </div>
            <div className="interview-item">
              <div className="q">Чем @SceneStorage отличается от @AppStorage?</div>
              <div className="a">@AppStorage = UserDefaults (глобально, между запусками). @SceneStorage = per-scene,
                автоматически сохраняется/восстанавливается при background/foreground, не сохраняется при убийстве приложения</div>
            </div>
            <div className="interview-item">
              <div className="q">Когда SwiftUI недостаточно?</div>
              <div className="a">Камера/AR (AVCaptureSession), сложные Collection Layout, WKWebView, hardware-доступ (BLE, NFC),
                push-уведомления (регистрация). Всё это требует UIKit через Representable-протоколы</div>
            </div>
            <div className="interview-item">
              <div className="q">Как мигрировать UIKit-приложение на SwiftUI?</div>
              <div className="a">Постепенно: начать с листовых экранов через UIHostingController, оставить UIKit navigation,
                перевести state на @Observable, последним заменить корень на App protocol</div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
