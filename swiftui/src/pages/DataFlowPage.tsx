import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import PhoneMockup from '../components/PhoneMockup'

export default function DataFlowPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [notesPinned] = useState([{ title: 'Идея', body: 'Приложение для заметок' }])
  const [notesRegular] = useState([{ title: 'Покупки', body: 'Молоко, хлеб, сыр' }])

  return (
    <div className="demo-container">
      <h1>🔄 Data Flow — Поток данных в SwiftUI</h1>
      <p>
        SwiftUI построен вокруг принципа <strong>Single Source of Truth</strong> — у каждого
        фрагмента данных должен быть ровно один владелец. Все остальные получают к нему
        доступ через ссылки или окружение. Это аналог «подъёма состояния» в React, но
        формализованный на уровне языка.
      </p>

      {/* ─── Big Picture Diagram ─── */}
      <section className="card">
        <h2>🗺️ Общая картина: диаграмма потока данных</h2>
        <p>
          Каждый инструмент управления состоянием в SwiftUI занимает свою нишу.
          Данные текут сверху вниз, а события — снизу вверх, как в React.
        </p>

        <div style={{
          display: 'flex', flexDirection: 'column', gap: '12px',
          padding: '24px', borderRadius: '12px',
          background: 'var(--bg-secondary, #f8f9fa)', border: '2px solid var(--border-color, #e0e0e0)',
          fontFamily: 'monospace', fontSize: '0.9rem'
        }}>
          <div style={{ textAlign: 'center', padding: '16px', borderRadius: '8px', background: 'var(--accent-blue, #007AFF)', color: '#fff', fontWeight: 700 }}>
            🏠 Source of Truth — единственный владелец данных
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
            <div style={{ padding: '12px', borderRadius: '8px', background: '#34C759', color: '#fff', textAlign: 'center' }}>
              <strong>@State</strong><br/>View-local<br/><small>≈ useState</small>
            </div>
            <div style={{ padding: '12px', borderRadius: '8px', background: '#FF9500', color: '#fff', textAlign: 'center' }}>
              <strong>@Binding</strong><br/>Child access<br/><small>≈ props + setState</small>
            </div>
            <div style={{ padding: '12px', borderRadius: '8px', background: '#AF52DE', color: '#fff', textAlign: 'center' }}>
              <strong>@Observable</strong><br/>Shared model<br/><small>≈ Zustand / MobX</small>
            </div>
            <div style={{ padding: '12px', borderRadius: '8px', background: '#FF2D55', color: '#fff', textAlign: 'center' }}>
              <strong>@Environment</strong><br/>Tree-wide<br/><small>≈ React Context</small>
            </div>
          </div>
          <div style={{ textAlign: 'center', fontSize: '1.2rem' }}>⬇️ данные вниз &nbsp;&nbsp;&nbsp; ⬆️ события вверх</div>
          <div style={{ textAlign: 'center', padding: '12px', borderRadius: '8px', background: 'var(--bg-tertiary, #e9ecef)', color: 'var(--text-primary)' }}>
            👁️ Views (struct) — перерисовываются автоматически при изменении данных
          </div>
        </div>
      </section>

      {/* ─── Source of Truth ─── */}
      <section className="card">
        <h2>🎯 Source of Truth — принцип единого источника</h2>
        <p>
          В React вы «поднимаете состояние» к общему родителю. В SwiftUI этот принцип
          формализован: каждое значение — либо <strong>Source of Truth</strong> (владелец),
          либо <strong>Derived Value</strong> (производное/ссылка).
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>✅ Source of Truth (владеет)</h3>
            <CodeBlock language="swift" code={`
// Локальное состояние — View владеет
@State private var count = 0

// Shared модель — объект владеет
@Observable class UserStore {
    var name = "Анна"
    var isLoggedIn = false
}

// SwiftUI Среда — система владеет
@Environment(\\.colorScheme) var scheme
`} />
          </div>
          <div className="feature-card">
            <h3>🔗 Derived Value (ссылается)</h3>
            <CodeBlock language="swift" code={`
// Binding — чтение + запись чужого State
@Binding var isOn: Bool

// Computed — вычисляется из других данных
var greeting: String {
    "Привет, \\(user.name)!"
}

// let через init — read-only данные
let title: String
`} />
          </div>
        </div>

        <div className="info-box">
          <strong>💡 Правило:</strong> Если два View показывают одни данные — у данных должен быть
          один владелец. Остальные получают <code>@Binding</code> или читают из <code>@Environment</code>.
          Дублирование состояния — главная причина багов с рассинхронизацией.
        </div>
      </section>

      {/* ─── When to use what ─── */}
      <section className="card">
        <h2>🧭 Когда что использовать?</h2>
        <p>Вот алгоритм выбора правильного инструмента:</p>

        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>Ситуация</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>SwiftUI</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color, #ddd)' }}>React аналог</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Локальное UI-состояние (toggle, input)', '@State', 'useState'],
              ['Передать состояние дочернему View', '@Binding', 'props + setState'],
              ['Общая модель для нескольких экранов', '@Observable + @State', 'Zustand / useContext'],
              ['Глобальные настройки (тема, локаль)', '@Environment', 'React.createContext'],
              ['Данные из системы (colorScheme, locale)', '@Environment(\\.key)', 'window.matchMedia'],
              ['Вычисляемые значения', 'computed property', 'useMemo'],
            ].map(([situation, swift, react]) => (
              <tr key={situation}>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)' }}>{situation}</td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)' }}><code>{swift}</code></td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color, #eee)' }}><code>{react}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ─── @State recap ─── */}
      <section className="card">
        <h2>📦 @State — локальное состояние View</h2>
        <p>
          <code>@State</code> создаёт хранилище, привязанное к конкретному View.
          Когда значение меняется — View перерисовывается. Аналог <code>useState</code>.
        </p>

        <CodeBlock language="swift" title="@State — как useState" code={`
struct CounterView: View {
    // Source of Truth: View владеет этим значением
    @State private var count = 0
    
    var body: some View {
        VStack(spacing: 16) {
            Text("Счёт: \\(count)")
                .font(.largeTitle)
            
            HStack(spacing: 20) {
                Button("−") { count -= 1 }
                Button("+") { count += 1 }
            }
            .buttonStyle(.bordered)
        }
    }
}

// React эквивалент:
// const [count, setCount] = useState(0)
// setCount(prev => prev + 1)
`} />

        <div className="info-box">
          <strong>⚠️ Важно:</strong> <code>@State</code> всегда <code>private</code> — только сам View может
          менять своё состояние. Для передачи наружу используйте <code>@Binding</code>.
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <PhoneMockup title="Counter">
            <div className="sim-vstack" style={{ gap: '16px', alignItems: 'center', padding: '40px 16px' }}>
              <span className="sim-text" style={{ fontSize: '42px', fontWeight: 700, color: '#007AFF' }}>0</span>
              <div className="sim-hstack" style={{ gap: '16px' }}>
                <button className="sim-button--filled" style={{ padding: '8px 20px', fontSize: '20px', background: '#8e8e93' }}>−</button>
                <button className="sim-button--filled" style={{ padding: '8px 20px', fontSize: '20px' }}>+</button>
              </div>
              <span className="sim-text--secondary" style={{ fontSize: '11px', fontFamily: 'monospace' }}>@State private var count = 0</span>
            </div>
          </PhoneMockup>
        </div>
      </section>

      {/* ─── @Binding recap ─── */}
      <section className="card">
        <h2>🔗 @Binding — двусторонняя ссылка</h2>
        <p>
          <code>@Binding</code> даёт дочернему View чтение и запись в чужой <code>@State</code>.
          Это как передать <code>value</code> + <code>onChange</code> в React-компонент, но в одном параметре.
        </p>

        <CodeBlock language="swift" title="@Binding — двусторонний доступ" code={`
// Дочерний View — НЕ владеет данными
struct ToggleRow: View {
    let label: String
    @Binding var isOn: Bool   // ← ссылка на чужой State
    
    var body: some View {
        HStack {
            Text(label)
            Spacer()
            Toggle("", isOn: $isOn)  // Toggle тоже получает Binding
        }
    }
}

// Родительский View — владеет данными
struct SettingsView: View {
    @State private var darkMode = false
    @State private var notifications = true
    
    var body: some View {
        VStack {
            ToggleRow(label: "Тёмная тема", isOn: $darkMode)
            ToggleRow(label: "Уведомления", isOn: $notifications)
            
            // Можно читать значение прямо здесь
            Text(darkMode ? "🌙" : "☀️")
        }
    }
}
`} />

        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <PhoneMockup title="Настройки">
            <div style={{ padding: '0' }}>
              <div className="sim-list">
                <div className="sim-form-row">
                  <span className="sim-text" style={{ flex: 1, fontSize: '14px' }}>Тёмная тема {darkMode ? '🌙' : '☀️'}</span>
                  <div className={darkMode ? 'sim-toggle' : 'sim-toggle--off'}
                    onClick={() => setDarkMode(v => !v)} style={{ cursor: 'pointer' }} />
                </div>
                <div className="sim-form-row">
                  <span className="sim-text" style={{ flex: 1, fontSize: '14px' }}>Уведомления</span>
                  <div className={notifications ? 'sim-toggle' : 'sim-toggle--off'}
                    onClick={() => setNotifications(v => !v)} style={{ cursor: 'pointer' }} />
                </div>
              </div>
              <div style={{ padding: '12px 16px', textAlign: 'center' }}>
                <span className="sim-text--secondary" style={{ fontSize: '11px', fontFamily: 'monospace' }}>
                  Parent @State → Child @Binding
                </span>
              </div>
            </div>
          </PhoneMockup>
        </div>
      </section>

      {/* ─── @Observable recap ─── */}
      <section className="card">
        <h2>👁️ @Observable — разделяемая модель</h2>
        <p>
          Когда состояние нужно нескольким экранам — выносим его в <code>@Observable</code> класс.
          SwiftUI автоматически отслеживает, какие свойства читает каждый View,
          и перерисовывает только нужные.
        </p>

        <CodeBlock language="swift" title="@Observable — shared state" code={`
import Observation

@Observable
class CartStore {
    var items: [CartItem] = []
    var promoCode: String = ""
    
    var total: Double {
        items.reduce(0) { $0 + $1.price * Double($1.quantity) }
    }
    
    var discountedTotal: Double {
        promoCode == "SALE20" ? total * 0.8 : total
    }
    
    func addItem(_ product: Product) {
        if let index = items.firstIndex(where: { $0.productId == product.id }) {
            items[index].quantity += 1
        } else {
            items.append(CartItem(productId: product.id, name: product.name,
                                  price: product.price, quantity: 1))
        }
    }
    
    func removeItem(at offsets: IndexSet) {
        items.remove(atOffsets: offsets)
    }
}
`} />
      </section>

      {/* ─── @Environment recap ─── */}
      <section className="card">
        <h2>🌍 @Environment — данные через дерево</h2>
        <p>
          <code>@Environment</code> внедряет значения из окружения в View — как <code>useContext</code> в React.
          Системные значения (colorScheme, locale, dismiss) уже доступны.
          Свои данные передаются через <code>.environment()</code>.
        </p>

        <CodeBlock language="swift" title="@Environment — контекст" code={`
// Системные environment values
struct AdaptiveView: View {
    @Environment(\\.colorScheme) var colorScheme
    @Environment(\\.horizontalSizeClass) var sizeClass
    @Environment(\\.dismiss) var dismiss
    
    var body: some View {
        VStack {
            Text(colorScheme == .dark ? "🌙 Тёмная тема" : "☀️ Светлая тема")
            
            if sizeClass == .regular {
                Text("iPad / большой экран")
            }
            
            Button("Закрыть") { dismiss() }
        }
    }
}

// Свой объект через Environment
@Observable class AuthService {
    var user: User?
    var isLoggedIn: Bool { user != nil }
}

// В корне приложения:
@main struct MyApp: App {
    @State private var auth = AuthService()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(auth)  // ← вставляем в дерево
        }
    }
}

// В любом View дерева:
struct ProfileView: View {
    @Environment(AuthService.self) var auth
    
    var body: some View {
        Text("Привет, \\(auth.user?.name ?? "Гость")")
    }
}
`} />
      </section>

      {/* ─── Complete Mini-App ─── */}
      <section className="card">
        <h2>🚀 Полный пример: мини-приложение с заметками</h2>
        <p>
          Этот пример использует все четыре инструмента вместе — <code>@State</code>,
          <code>@Binding</code>, <code>@Observable</code> и <code>@Environment</code>.
        </p>

        <CodeBlock language="swift" title="Полное приложение — все инструменты вместе" code={`
import SwiftUI
import Observation

// ── 1. Model ──
struct Note: Identifiable {
    let id = UUID()
    var title: String
    var body: String
    var isPinned: Bool = false
}

// ── 2. @Observable — shared store ──
@Observable
class NoteStore {
    var notes: [Note] = [
        Note(title: "Покупки", body: "Молоко, хлеб, сыр"),
        Note(title: "Идея", body: "Приложение для заметок", isPinned: true)
    ]
    
    var pinnedNotes: [Note] { notes.filter { $0.isPinned } }
    var regularNotes: [Note] { notes.filter { !$0.isPinned } }
    
    func add(_ note: Note) { notes.append(note) }
    func delete(at offsets: IndexSet) { notes.remove(atOffsets: offsets) }
    func togglePin(_ note: Note) {
        if let i = notes.firstIndex(where: { $0.id == note.id }) {
            notes[i].isPinned.toggle()
        }
    }
}

// ── 3. @Environment — тема ──
@Observable
class ThemeSettings {
    var accentColor: Color = .blue
    var fontSize: CGFloat = 16
}

// ── 4. App — собираем всё ──
@main struct NotesApp: App {
    @State private var store = NoteStore()
    @State private var theme = ThemeSettings()
    
    var body: some Scene {
        WindowGroup {
            NoteListView()
                .environment(store)          // store доступен всему дереву
                .environment(theme)          // тема тоже
        }
    }
}

// ── 5. Список — читает @Environment ──
struct NoteListView: View {
    @Environment(NoteStore.self) var store
    @Environment(ThemeSettings.self) var theme
    @State private var showingAdd = false      // локальный UI state
    
    var body: some View {
        NavigationStack {
            List {
                if !store.pinnedNotes.isEmpty {
                    Section("📌 Закреплённые") {
                        ForEach(store.pinnedNotes) { note in
                            NoteRow(note: note)
                        }
                    }
                }
                Section("Все заметки") {
                    ForEach(store.regularNotes) { note in
                        NoteRow(note: note)
                    }
                    .onDelete { store.delete(at: $0) }
                }
            }
            .font(.system(size: theme.fontSize))
            .tint(theme.accentColor)
            .navigationTitle("Заметки")
            .toolbar {
                Button { showingAdd = true } label: {
                    Image(systemName: "plus")
                }
            }
            .sheet(isPresented: $showingAdd) {
                AddNoteSheet(isPresented: $showingAdd) // @Binding!
            }
        }
    }
}

// ── 6. Row — получает данные через let ──
struct NoteRow: View {
    let note: Note
    @Environment(NoteStore.self) var store
    
    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                Text(note.title).font(.headline)
                Text(note.body).font(.caption).foregroundStyle(.secondary)
            }
            Spacer()
            Button { store.togglePin(note) } label: {
                Image(systemName: note.isPinned ? "pin.fill" : "pin")
            }
        }
    }
}

// ── 7. Sheet — @Binding для isPresented, @State для формы ──
struct AddNoteSheet: View {
    @Binding var isPresented: Bool          // ← ссылка на родительский State
    @State private var title = ""           // ← локальный State формы
    @State private var body = ""
    @Environment(NoteStore.self) var store  // ← доступ к store через Environment
    
    var body: some View {
        NavigationStack {
            Form {
                TextField("Заголовок", text: $title)
                TextEditor(text: $body)
            }
            .navigationTitle("Новая заметка")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Отмена") { isPresented = false }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Сохранить") {
                        store.add(Note(title: title, body: body))
                        isPresented = false
                    }
                    .disabled(title.isEmpty)
                }
            }
        }
    }
}
`} />

        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <PhoneMockup title="Заметки">
            <div style={{ padding: '0' }}>
              <div className="sim-section-header">📌 ЗАКРЕПЛЁННЫЕ</div>
              <div className="sim-list">
                {notesPinned.map((n, i) => (
                  <div className="sim-list-row" key={i}>
                    <div style={{ flex: 1 }}>
                      <span className="sim-text" style={{ fontWeight: 600, fontSize: '14px', display: 'block' }}>{n.title}</span>
                      <span className="sim-text--secondary" style={{ fontSize: '12px' }}>{n.body}</span>
                    </div>
                    <span style={{ color: '#ff9500' }}>📌</span>
                  </div>
                ))}
              </div>
              <div className="sim-section-header">ВСЕ ЗАМЕТКИ</div>
              <div className="sim-list">
                {notesRegular.map((n, i) => (
                  <div className="sim-list-row" key={i}>
                    <div style={{ flex: 1 }}>
                      <span className="sim-text" style={{ fontWeight: 600, fontSize: '14px', display: 'block' }}>{n.title}</span>
                      <span className="sim-text--secondary" style={{ fontSize: '12px' }}>{n.body}</span>
                    </div>
                    <span style={{ color: '#8e8e93' }}>📌</span>
                  </div>
                ))}
              </div>
            </div>
          </PhoneMockup>
        </div>

        <div className="info-box">
          <strong>🧩 Обратите внимание на роли:</strong>
          <ul className="info-list">
            <li><code>@State</code> — <code>showingAdd</code>, <code>title</code>, <code>body</code> (локальный UI)</li>
            <li><code>@Binding</code> — <code>isPresented</code> (дочерний управляет родительским sheet)</li>
            <li><code>@Observable</code> — <code>NoteStore</code> (общая модель данных)</li>
            <li><code>@Environment</code> — <code>store</code>, <code>theme</code> (доступ через дерево)</li>
          </ul>
        </div>
      </section>

      {/* ─── React comparison ─── */}
      <section className="card">
        <h2>⚛️ Сравнение с React</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>React</h3>
            <CodeBlock language="swift" code={`
// Локальный state
const [count, setCount] = useState(0)

// Проброс в child
<Child value={count} onChange={setCount} />

// Глобальный state (Context)
const ThemeCtx = createContext(defaultTheme)
<ThemeCtx.Provider value={theme}>
  <App />
</ThemeCtx.Provider>

// Потребление
const theme = useContext(ThemeCtx)

// Внешний store (Zustand)
const useStore = create((set) => ({
  items: [],
  add: (item) => set(s => ({
    items: [...s.items, item]
  }))
}))
`} />
          </div>
          <div className="feature-card">
            <h3>SwiftUI</h3>
            <CodeBlock language="swift" code={`
// Локальный state
@State private var count = 0

// Проброс в child
ChildView(value: $count)  // $count = Binding

// Глобальный state (Environment)
ContentView()
    .environment(theme)

// Потребление
@Environment(ThemeSettings.self) var theme

// Shared store (@Observable)
@Observable class Store {
    var items: [Item] = []
    func add(_ item: Item) {
        items.append(item)
    }
}
`} />
          </div>
        </div>
      </section>

      {/* ─── API Flow Patterns ─── */}
      <section className="card">
        <h2>🌊 Паттерны потока данных</h2>
        <p>Типовые сценарии и рекомендуемые решения:</p>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Однонаправленный поток</h3>
            <p>Данные текут вниз (через props/environment), события вверх (через Binding/closure). Как в React.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Подъём состояния</h3>
            <p>Если два View нуждаются в одних данных — поднимаем State к общему родителю или выносим в @Observable.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💉</div>
            <h3>Dependency Injection</h3>
            <p>@Environment — встроенный DI-контейнер. Передали в корне — доступно везде. Легко подменить в тестах.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Минимальный scope</h3>
            <p>Держите State как можно ниже. @State для UI-мелочей, @Observable для бизнес-данных, @Environment для DI.</p>
          </div>
        </div>
      </section>

      {/* ─── Anti-patterns ─── */}
      <section className="card">
        <h2>🚫 Анти-паттерны</h2>

        <CodeBlock language="swift" title="❌ Не делайте так" code={`
// ❌ Дублирование данных между Views
struct ParentView: View {
    @State private var name = "Анна"
    var body: some View {
        ChildView(name: name)  // копия, а не Binding!
    }
}
struct ChildView: View {
    @State var name: String    // ❌ второй Source of Truth!
    // Изменения здесь НЕ отразятся в ParentView
}

// ✅ Правильно: использовать @Binding
struct ChildView: View {
    @Binding var name: String  // ✅ ссылка на родительский State
}

// ❌ @Observable для локального UI-состояния
@Observable class ToggleState {  // overkill!
    var isOn = false
}

// ✅ Правильно: @State для простого UI
@State private var isOn = false
`} />

        <div className="info-box">
          <strong>📏 Эмпирическое правило:</strong> Начинайте с <code>@State</code>. Когда нужно
          передать дочернему — добавьте <code>@Binding</code>. Когда данные нужны многим Views —
          вынесите в <code>@Observable</code>. Когда нужен DI — добавьте <code>@Environment</code>.
        </div>
      </section>
    </div>
  )
}
