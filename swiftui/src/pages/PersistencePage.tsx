import CodeBlock from '../components/CodeBlock'
import PhoneMockup from '../components/PhoneMockup'

export default function PersistencePage() {
  return (
    <div className="demo-container">
      <h1>💾 Хранение данных</h1>
      <p>
        В веб-приложениях мы используем <code>localStorage</code>, <code>IndexedDB</code> или серверные БД.
        В iOS есть целый стек: <strong>UserDefaults</strong> (= localStorage),
        <strong> @AppStorage</strong> (= реактивный localStorage),
        <strong> SwiftData</strong> (= IndexedDB + ORM) и <strong>Keychain</strong> (= secure storage).
      </p>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">React-разработчику</div>
          <p>
            <code>@AppStorage</code> = <code>localStorage</code> + <code>useState</code> в одном.
            Значение сохраняется между запусками и автоматически обновляет UI.
            <code>SwiftData</code> = мощная ORM (как Prisma) с реактивными запросами (как TanStack Query).
          </p>
        </div>
      </div>

      {/* ─── UserDefaults / @AppStorage ─── */}
      <section className="card">
        <h2>📦 UserDefaults & @AppStorage</h2>
        <p>
          <code>UserDefaults</code> — простое key-value хранилище для настроек и мелких данных.
          Хранит: строки, числа, булевы, массивы, словари, Date и Data.
          <code>@AppStorage</code> — обёртка SwiftUI, которая делает UserDefaults реактивным.
        </p>

        <CodeBlock language="swift" title="UserDefaults — прямое использование" code={`
// Запись
UserDefaults.standard.set("Анна", forKey: "userName")
UserDefaults.standard.set(25, forKey: "userAge")
UserDefaults.standard.set(true, forKey: "isPremium")
UserDefaults.standard.set(["ru", "en"], forKey: "languages")

// Чтение
let name = UserDefaults.standard.string(forKey: "userName")  // String?
let age = UserDefaults.standard.integer(forKey: "userAge")    // Int (0 по умолчанию)
let premium = UserDefaults.standard.bool(forKey: "isPremium") // Bool

// Удаление
UserDefaults.standard.removeObject(forKey: "userName")
`} />

        <CodeBlock language="swift" title="React-эквивалент: localStorage" code={`
// JavaScript / React
localStorage.setItem("userName", "Анна")
localStorage.setItem("userAge", "25")
localStorage.setItem("isPremium", "true")
localStorage.setItem("languages", JSON.stringify(["ru", "en"]))

const name = localStorage.getItem("userName")          // string | null
const age = Number(localStorage.getItem("userAge"))    // number
const premium = localStorage.getItem("isPremium") === "true"

localStorage.removeItem("userName")
`} />

        <CodeBlock language="swift" title="@AppStorage — реактивный UserDefaults" code={`
struct SettingsView: View {
    // @AppStorage = localStorage + useState в одном!
    // Значение автоматически сохраняется и загружается
    @AppStorage("userName") private var name = "Гость"
    @AppStorage("isDarkMode") private var isDarkMode = false
    @AppStorage("fontSize") private var fontSize = 16.0
    @AppStorage("notificationsEnabled") private var notifications = true
    @AppStorage("selectedLanguage") private var language = "ru"
    
    var body: some View {
        Form {
            Section("Профиль") {
                TextField("Имя", text: $name)
                
                Picker("Язык", selection: $language) {
                    Text("Русский").tag("ru")
                    Text("English").tag("en")
                }
            }
            
            Section("Внешний вид") {
                Toggle("Тёмная тема", isOn: $isDarkMode)
                
                HStack {
                    Text("Размер шрифта")
                    Slider(value: $fontSize, in: 12...24, step: 1)
                    Text("\\(Int(fontSize))")
                }
            }
            
            Section("Уведомления") {
                Toggle("Push-уведомления", isOn: $notifications)
            }
        }
        .navigationTitle("Настройки")
    }
}

// Всё! При изменении Toggle/Slider:
// 1. Значение сохраняется в UserDefaults
// 2. UI автоматически обновляется
// 3. При перезапуске приложения — значение восстанавливается
`} />

        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <PhoneMockup title="Настройки">
            <div className="sim-vstack" style={{ gap: '0' }}>
              <div className="sim-section-header">Профиль</div>
              <div className="sim-list">
                <div className="sim-form-row">
                  <span style={{ fontSize: '14px' }}>Имя</span>
                  <span style={{ fontSize: '14px', color: '#007AFF' }}>Анна</span>
                </div>
                <div className="sim-form-row">
                  <span style={{ fontSize: '14px' }}>Язык</span>
                  <span style={{ fontSize: '14px', color: '#8e8e93' }}>Русский ›</span>
                </div>
              </div>
              <div className="sim-section-header">Внешний вид</div>
              <div className="sim-list">
                <div className="sim-form-row">
                  <span style={{ fontSize: '14px' }}>Тёмная тема</span>
                  <div className="sim-toggle" />
                </div>
                <div className="sim-form-row">
                  <span style={{ fontSize: '14px', marginRight: '8px' }}>Размер шрифта</span>
                  <div className="sim-slider" style={{ flex: 1 }}>
                    <div className="sim-slider__fill" style={{ width: '33%' }} />
                    <div className="sim-slider__thumb" style={{ left: '33%' }} />
                  </div>
                  <span style={{ fontSize: '13px', marginLeft: '8px', color: '#8e8e93' }}>16</span>
                </div>
              </div>
              <div className="sim-section-header">Уведомления</div>
              <div className="sim-list">
                <div className="sim-form-row">
                  <span style={{ fontSize: '14px' }}>Push-уведомления</span>
                  <div className="sim-toggle" />
                </div>
              </div>
            </div>
          </PhoneMockup>
        </div>

        <CodeBlock language="swift" title="React-эквивалент: кастомный хук" code={`
// React — нужно писать свой хук
function useLocalStorage<T>(key: string, defaultValue: T) {
    const [value, setValue] = useState<T>(() => {
        const saved = localStorage.getItem(key)
        return saved ? JSON.parse(saved) : defaultValue
    })
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    
    return [value, setValue] as const
}

// Использование
function Settings() {
    const [name, setName] = useLocalStorage("userName", "Гость")
    const [isDark, setIsDark] = useLocalStorage("isDarkMode", false)
    // ...
}

// @AppStorage делает ВСЁ ЭТО одной строкой!
`} />

        <div className="info-box">
          <span className="info-box-icon">⚠️</span>
          <div className="info-box-content">
            <div className="info-box-title">Что НЕ хранить в UserDefaults</div>
            <p>
              UserDefaults — для мелких настроек (десятки кБ). <strong>Не</strong> для: больших массивов,
              картинок, токенов авторизации (для этого Keychain), пользовательского контента.
              Для больших данных — SwiftData или файловая система.
            </p>
          </div>
        </div>
      </section>

      {/* ─── @SceneStorage ─── */}
      <section className="card">
        <h2>🪟 @SceneStorage — состояние сцены</h2>
        <p>
          <code>@SceneStorage</code> — как <code>sessionStorage</code> в браузере. Данные живут пока
          открыта «сцена» (окно/экземпляр приложения). Используется для восстановления позиции
          скролла, выбранного таба, черновика текста.
        </p>

        <CodeBlock language="swift" title="@SceneStorage — временное состояние" code={`
struct ContentView: View {
    // Сохраняется между перезапусками этой «сцены»
    @SceneStorage("selectedTab") private var selectedTab = 0
    @SceneStorage("draftText") private var draft = ""
    @SceneStorage("scrollPosition") private var scrollY: Double = 0
    
    var body: some View {
        TabView(selection: $selectedTab) {
            HomeView()
                .tabItem { Label("Главная", systemImage: "house") }
                .tag(0)
            
            SearchView()
                .tabItem { Label("Поиск", systemImage: "magnifyingglass") }
                .tag(1)
            
            // Форма с черновиком
            TextEditor(text: $draft)
                .tabItem { Label("Черновик", systemImage: "square.and.pencil") }
                .tag(2)
        }
    }
}

// На iPad можно открыть 2 окна приложения —
// у каждого свой @SceneStorage, но общий @AppStorage
`} />
      </section>

      {/* ─── SwiftData ─── */}
      <section className="card">
        <h2>🗄️ SwiftData — полноценная БД (iOS 17+)</h2>
        <p>
          <code>SwiftData</code> — современная ORM от Apple. Это как <code>Prisma</code> для iOS:
          модели описываются через макросы, запросы реактивные и типизированные. Заменяет
          CoreData (громоздкий, но мощный предшественник).
        </p>

        <CodeBlock language="swift" title="SwiftData модели" code={`
import SwiftData

// @Model — макрос, делающий класс persistent
// Как @Entity в TypeORM или model в Prisma
@Model
class Note {
    var title: String
    var content: String
    var createdAt: Date
    var isPinned: Bool
    
    // Связи (relationships)
    var folder: Folder?
    var tags: [Tag]
    
    init(title: String, content: String = "", isPinned: Bool = false) {
        self.title = title
        self.content = content
        self.createdAt = .now
        self.isPinned = isPinned
        self.tags = []
    }
}

@Model
class Folder {
    var name: String
    
    // Обратная связь — каскадное удаление
    @Relationship(deleteRule: .cascade, inverse: \\Note.folder)
    var notes: [Note]
    
    init(name: String) {
        self.name = name
        self.notes = []
    }
}

@Model
class Tag {
    var name: String
    var color: String
    
    init(name: String, color: String = "#007AFF") {
        self.name = name
        self.color = color
    }
}
`} />

        <CodeBlock language="swift" title="CRUD с SwiftData" code={`
struct NotesView: View {
    // @Query — реактивный запрос к БД
    // При любом изменении данных — View обновляется автоматически!
    @Query(
        filter: #Predicate<Note> { !$0.title.isEmpty },
        sort: [
            SortDescriptor(\\Note.isPinned, order: .reverse),
            SortDescriptor(\\Note.createdAt, order: .reverse)
        ]
    )
    private var notes: [Note]
    
    // ModelContext — для записи (аналог EntityManager)
    @Environment(\\.modelContext) private var context
    
    var body: some View {
        List {
            ForEach(notes) { note in
                NavigationLink(value: note) {
                    VStack(alignment: .leading) {
                        HStack {
                            if note.isPinned {
                                Image(systemName: "pin.fill")
                                    .foregroundStyle(.orange)
                                    .font(.caption)
                            }
                            Text(note.title)
                                .font(.headline)
                        }
                        Text(note.createdAt, style: .relative)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
            }
            .onDelete(perform: deleteNotes)
        }
        .navigationTitle("Заметки")
        .toolbar {
            Button("Новая", systemImage: "plus") {
                addNote()
            }
        }
    }
    
    private func addNote() {
        let note = Note(title: "Без названия")
        context.insert(note)     // Добавить в БД
        // Автосохранение! Не нужен .save()
    }
    
    private func deleteNotes(at offsets: IndexSet) {
        for index in offsets {
            context.delete(notes[index])
        }
    }
}
`} />

        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <PhoneMockup>
            <div className="sim-vstack" style={{ gap: '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div className="sim-large-title" style={{ fontSize: '24px' }}>Заметки</div>
                <span style={{ fontSize: '20px', color: '#007AFF' }}>＋</span>
              </div>
              <div className="sim-list">
                <div className="sim-list-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <div className="sim-hstack" style={{ gap: '4px' }}>
                    <span style={{ color: '#FF9500', fontSize: '11px' }}>📌</span>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>Список покупок</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#8e8e93' }}>2 минуты назад</span>
                </div>
                <div className="sim-list-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <div className="sim-hstack" style={{ gap: '4px' }}>
                    <span style={{ color: '#FF9500', fontSize: '11px' }}>📌</span>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>Идеи для проекта</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#8e8e93' }}>1 час назад</span>
                </div>
                <div className="sim-list-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>Заметки с митинга</span>
                  <span style={{ fontSize: '11px', color: '#8e8e93' }}>Вчера</span>
                </div>
                <div className="sim-list-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>Рецепт пасты</span>
                  <span style={{ fontSize: '11px', color: '#8e8e93' }}>3 дня назад</span>
                </div>
              </div>
            </div>
          </PhoneMockup>
        </div>

        <CodeBlock language="swift" title="React/Prisma-эквивалент" code={`
// Prisma schema.prisma (определение модели)
model Note {
    id        Int      @id @default(autoincrement())
    title     String
    content   String   @default("")
    createdAt DateTime @default(now())
    isPinned  Boolean  @default(false)
    folder    Folder?  @relation(fields: [folderId], references: [id])
    folderId  Int?
    tags      Tag[]
}

// React + TanStack Query (реактивный запрос)
function NotesList() {
    const { data: notes } = useQuery({
        queryKey: ['notes'],
        queryFn: () => prisma.note.findMany({
            where: { title: { not: '' } },
            orderBy: [
                { isPinned: 'desc' },
                { createdAt: 'desc' }
            ],
        }),
    })
    
    const createMutation = useMutation({
        mutationFn: () => prisma.note.create({
            data: { title: 'Без названия' }
        }),
        onSuccess: () => queryClient.invalidateQueries(['notes'])
    })
    // @Query в SwiftData делает всё это автоматически!
}
`} />

        <CodeBlock language="swift" title="Настройка SwiftData в приложении" code={`
import SwiftUI
import SwiftData

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        // Подключаем SwiftData — одна строка!
        .modelContainer(for: [Note.self, Folder.self, Tag.self])
        
        // Это создаёт SQLite базу данных на устройстве
        // Автомиграции при изменении модели (lightweight)
        // Аналог: prisma migrate dev
    }
}
`} />
      </section>

      {/* ─── Keychain ─── */}
      <section className="card">
        <h2>🔐 Keychain — безопасное хранилище</h2>
        <p>
          <code>Keychain</code> — зашифрованное хранилище iOS для паролей, токенов, секретов.
          Данные сохраняются даже при удалении/переустановке приложения. Нет прямого аналога в вебе
          (ближайшее — httpOnly cookies + secure flag).
        </p>

        <CodeBlock language="swift" title="Keychain — хранение токена" code={`
import Security

class KeychainService {
    static func save(key: String, value: String) {
        let data = value.data(using: .utf8)!
        
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecValueData as String: data,
        ]
        
        // Удаляем старое значение
        SecItemDelete(query as CFDictionary)
        // Сохраняем новое
        SecItemAdd(query as CFDictionary, nil)
    }
    
    static func load(key: String) -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecReturnData as String: true,
        ]
        
        var result: AnyObject?
        SecItemCopyMatching(query as CFDictionary, &result)
        
        guard let data = result as? Data else { return nil }
        return String(data: data, encoding: .utf8)
    }
}

// Использование
KeychainService.save(key: "authToken", value: "eyJhbGci...")
let token = KeychainService.load(key: "authToken")

// Популярные обёртки: KeychainAccess, KeychainSwift
// import KeychainSwift
// let keychain = KeychainSwift()
// keychain.set("secret", forKey: "authToken")
// let token = keychain.get("authToken")
`} />
      </section>

      {/* ─── Файловая система ─── */}
      <section className="card">
        <h2>📂 FileManager — файловая система</h2>
        <p>
          Для хранения документов, картинок, кеша — прямой доступ к файловой системе через
          <code>FileManager</code>. Каждое приложение имеет свою песочницу (sandbox).
        </p>

        <CodeBlock language="swift" title="Работа с файлами" code={`
// Директории приложения
let documents = FileManager.default.urls(
    for: .documentDirectory, in: .userDomainMask
).first!

let caches = FileManager.default.urls(
    for: .cachesDirectory, in: .userDomainMask
).first!

// Сохранить JSON-файл
func saveToFile<T: Encodable>(_ object: T, filename: String) throws {
    let url = documents.appendingPathComponent(filename)
    let data = try JSONEncoder().encode(object)
    try data.write(to: url)
}

// Загрузить JSON-файл
func loadFromFile<T: Decodable>(_ type: T.Type, filename: String) throws -> T {
    let url = documents.appendingPathComponent(filename)
    let data = try Data(contentsOf: url)
    return try JSONDecoder().decode(T.self, from: data)
}

// Сохранить картинку
func saveImage(_ image: UIImage, name: String) throws {
    let url = documents.appendingPathComponent(name)
    guard let data = image.jpegData(compressionQuality: 0.8) else {
        throw StorageError.invalidData
    }
    try data.write(to: url)
}

// Проверить наличие файла
FileManager.default.fileExists(atPath: url.path)

// Удалить файл
try FileManager.default.removeItem(at: url)
`} />
      </section>

      {/* ─── Сводная таблица ─── */}
      <section className="card">
        <h2>📋 Когда что использовать</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color, #333)' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Хранилище</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Web-аналог</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Когда</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Объём</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['@AppStorage', 'localStorage', 'Настройки, флаги, тема', '~100 КБ'],
                ['@SceneStorage', 'sessionStorage', 'Позиция скролла, черновик', '~50 КБ'],
                ['SwiftData', 'IndexedDB / Prisma', 'Большие данные, связи, запросы', 'Гигабайты'],
                ['Keychain', 'secure httpOnly cookie', 'Токены, пароли, секреты', '~10 КБ'],
                ['FileManager', 'File System API', 'Файлы, картинки, документы', 'Гигабайты'],
                ['CloudKit', 'Firebase / Supabase', 'Синхронизация между устройствами', 'Зависит'],
              ].map(([storage, web, when, size], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #333)' }}>
                  <td style={{ padding: '8px 10px' }}><code>{storage}</code></td>
                  <td style={{ padding: '8px 10px' }}><code>{web}</code></td>
                  <td style={{ padding: '8px 10px' }}>{when}</td>
                  <td style={{ padding: '8px 10px', color: 'var(--text-secondary)' }}>{size}</td>
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
            1. <code>@AppStorage</code> — для настроек, заменяет localStorage + useState<br/>
            2. <code>SwiftData</code> — для сложных данных со связями и запросами<br/>
            3. <code>Keychain</code> — для секретов (токены, пароли)<br/>
            4. <code>FileManager</code> — для файлов (картинки, документы)<br/>
            5. <code>@Query</code> — реактивные запросы к БД, UI обновляется автоматически
          </p>
        </div>
      </div>
    </div>
  )
}
