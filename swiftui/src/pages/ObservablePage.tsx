import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import PhoneMockup from '../components/PhoneMockup'

export default function ObservablePage() {
  const [obsCount, setObsCount] = useState(0)
  const [obsTodos, setObsTodos] = useState([
    { text: 'Купить молоко', done: true },
    { text: 'Написать код', done: false },
    { text: 'Позвонить маме', done: false }
  ])

  return (
    <div className="demo-container">
      <h1>👁️ @Observable (Swift 5.9+)</h1>
      <p>
        <code>@Observable</code> — это макрос из Swift 5.9, революционно упрощающий работу с моделями данных.
        Он заменяет громоздкую связку <code>ObservableObject</code> + <code>@Published</code> + <code>@StateObject</code> + <code>@ObservedObject</code>.
        Для React-разработчика: это как встроенный MobX или Zustand, но с автоматическим tracking.
      </p>

      {/* --- Old vs New --- */}
      <section>
        <h2>🔄 Старый мир vs Новый мир</h2>
        <div className="card">
          <h3>До и после Swift 5.9</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            margin: '16px 0',
          }}>
            <div>
              <CodeBlock language="swift" title="❌ Старый подход (до iOS 17)" code={`
// 1. Модель: ObservableObject + @Published
class UserModel: ObservableObject {
    @Published var name = ""
    @Published var age = 0
    @Published var email = ""
    // Каждое свойство нужно @Published!
}

// 2. Создание: @StateObject
struct ParentView: View {
    @StateObject var user = UserModel()
    //  ^ @StateObject для СОЗДАНИЯ
    
    var body: some View {
        ChildView(user: user)
    }
}

// 3. Получение: @ObservedObject
struct ChildView: View {
    @ObservedObject var user: UserModel
    //  ^ @ObservedObject для ПЕРЕДАЧИ
    
    var body: some View {
        Text(user.name)
    }
}
// 😤 @Published на каждом свойстве
// 😤 @StateObject vs @ObservedObject путаница
// 😤 Обновляет ВСЕ View при любом изменении
`} />
            </div>
            <div>
              <CodeBlock language="swift" title="✅ Новый подход (iOS 17+)" code={`
// 1. Модель: просто @Observable
@Observable
class UserModel {
    var name = ""
    var age = 0
    var email = ""
    // Всё! Никаких @Published!
}

// 2. Создание: @State (да, обычный!)
struct ParentView: View {
    @State var user = UserModel()
    //  ^ Просто @State, как с Int
    
    var body: some View {
        ChildView(user: user)
    }
}

// 3. Получение: просто let/var
struct ChildView: View {
    var user: UserModel
    //  ^ Никаких wrapper'ов!
    
    var body: some View {
        Text(user.name)
    }
}
// ✅ Никаких @Published
// ✅ Никаких @StateObject/@ObservedObject
// ✅ Точечное обновление (только Views,
//    использующие изменённые свойства)
`} />
            </div>
          </div>
          <div className="info-box">
            <span className="info-box-icon">🎯</span>
            <div className="info-box-content">
              <div className="info-box-title">Главное преимущество</div>
              <p>
                @Observable автоматически отслеживает, <strong>какие свойства какой View использует</strong>.
                Если View читает только <code>name</code> — он обновится только при изменении <code>name</code>,
                а не при изменении <code>email</code>. Старый подход обновлял ВСЁ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- How @Observable Works --- */}
      <section>
        <h2>🔬 Как работает @Observable</h2>
        <div className="card">
          <h3>Observation Tracking — автоматическое отслеживание</h3>
          <CodeBlock language="swift" title="Магия @Observable макроса" code={`
// Вы пишете:
@Observable
class Store {
    var count = 0
    var name = "Hello"
}

// Компилятор генерирует (упрощённо):
class Store: Observable {
    private var _count = 0
    private var _name = "Hello"
    
    var count: Int {
        get {
            access(keyPath: \\.count)   // 📡 "кто-то читает count"
            return _count
        }
        set {
            withMutation(keyPath: \\.count) {  // 📢 "count изменился"
                _count = newValue
            }
        }
    }
    // ... аналогично для name
}

// SwiftUI использует это для tracking:
// 1. При вычислении body — записывает, какие свойства были прочитаны
// 2. При изменении этих свойств — перевычисляет body
// 3. Другие свойства (не прочитанные) — НЕ вызывают обновление
`} />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            margin: '16px 0',
            fontSize: '0.85rem',
          }}>
            <div style={{
              padding: '12px 16px',
              background: 'var(--bg-tertiary)',
              borderRadius: '8px',
              borderLeft: '4px solid #4CAF50',
            }}>
              <strong style={{ color: '#4CAF50' }}>1.</strong> SwiftUI вычисляет body View'а
            </div>
            <div style={{
              padding: '12px 16px',
              background: 'var(--bg-tertiary)',
              borderRadius: '8px',
              borderLeft: '4px solid #2196F3',
            }}>
              <strong style={{ color: '#2196F3' }}>2.</strong> Во время вычисления записывает: «этот View прочитал <code>store.count</code>»
            </div>
            <div style={{
              padding: '12px 16px',
              background: 'var(--bg-tertiary)',
              borderRadius: '8px',
              borderLeft: '4px solid #FF9800',
            }}>
              <strong style={{ color: '#FF9800' }}>3.</strong> Когда <code>store.count</code> изменится — перевычислит этот View
            </div>
            <div style={{
              padding: '12px 16px',
              background: 'var(--bg-tertiary)',
              borderRadius: '8px',
              borderLeft: '4px solid #E91E63',
            }}>
              <strong style={{ color: '#E91E63' }}>4.</strong> Изменение <code>store.name</code> <strong>НЕ</strong> затронет этот View, если он не читает name
            </div>
          </div>
        </div>
      </section>

      {/* --- @Observable Class --- */}
      <section>
        <h2>📦 Создание @Observable модели</h2>
        <div className="card">
          <h3>Полный пример: Todo-приложение</h3>
          <CodeBlock language="swift" title="@Observable модель для Todo" code={`
import SwiftUI

// ── Модель данных ──
struct TodoItem: Identifiable {
    let id = UUID()
    var title: String
    var isCompleted: Bool = false
    var priority: Priority = .medium
    
    enum Priority: String, CaseIterable {
        case low = "Низкий"
        case medium = "Средний"
        case high = "Высокий"
    }
}

// ── Observable Store (как Zustand store) ──
@Observable
class TodoStore {
    var items: [TodoItem] = []
    var filter: Filter = .all
    
    enum Filter: String, CaseIterable {
        case all = "Все"
        case active = "Активные"
        case completed = "Завершённые"
    }
    
    // Computed property — тоже отслеживается!
    var filteredItems: [TodoItem] {
        switch filter {
        case .all: items
        case .active: items.filter { !$0.isCompleted }
        case .completed: items.filter { $0.isCompleted }
        }
    }
    
    var completedCount: Int {
        items.filter { $0.isCompleted }.count
    }
    
    // Методы — как actions в Zustand
    func add(_ title: String) {
        items.append(TodoItem(title: title))
    }
    
    func toggle(_ item: TodoItem) {
        guard let idx = items.firstIndex(where: { $0.id == item.id }) else { return }
        items[idx].isCompleted.toggle()
    }
    
    func delete(at offsets: IndexSet) {
        items.remove(atOffsets: offsets)
    }
}
`} />
          <CodeBlock language="swift" title="React/Zustand-эквивалент" code={`
// Zustand store
const useTodoStore = create((set, get) => ({
    items: [],
    filter: 'all',
    
    filteredItems: () => {
        const { items, filter } = get()
        if (filter === 'all') return items
        if (filter === 'active') return items.filter(i => !i.isCompleted)
        return items.filter(i => i.isCompleted)
    },
    
    add: (title) => set(state => ({
        items: [...state.items, { id: crypto.randomUUID(), title, isCompleted: false }]
    })),
    
    toggle: (id) => set(state => ({
        items: state.items.map(i => 
            i.id === id ? { ...i, isCompleted: !i.isCompleted } : i
        )
    })),
}))
`} />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <PhoneMockup title="Todos">
              <div style={{ padding: '0' }}>
                <div className="sim-list">
                  {obsTodos.map((todo, i) => (
                    <div className="sim-list-row" key={i} onClick={() => {
                      const next = [...obsTodos]
                      next[i] = { ...next[i], done: !next[i].done }
                      setObsTodos(next)
                    }} style={{ cursor: 'pointer' }}>
                      <span style={{ fontSize: '18px', marginRight: '8px' }}>
                        {todo.done ? '✅' : '⬜'}
                      </span>
                      <span className="sim-text" style={{
                        fontSize: '14px',
                        textDecoration: todo.done ? 'line-through' : 'none',
                        color: todo.done ? '#8e8e93' : 'inherit'
                      }}>{todo.text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '8px 16px', textAlign: 'center' }}>
                  <span className="sim-text--secondary" style={{ fontSize: '11px', fontFamily: 'monospace' }}>
                    @Observable class TodoStore
                  </span>
                </div>
              </div>
            </PhoneMockup>
          </div>        </div>

        <div className="card">
          <h3>Использование в Views</h3>
          <CodeBlock language="swift" title="View с @Observable Store" code={`
// ── Корневой View — создаёт Store ──
struct TodoApp: View {
    @State private var store = TodoStore()
    //     ^ @State для создания @Observable (⚠️ не @StateObject!)
    
    var body: some View {
        NavigationStack {
            VStack {
                FilterPicker(store: store)
                TodoListView(store: store)
                AddTodoBar(store: store)
            }
            .navigationTitle("Задачи (\\(store.completedCount)/\\(store.items.count))")
        }
    }
}

// ── Дочерний View — просто принимает Store ──
struct TodoListView: View {
    var store: TodoStore
    //  ^ Просто var! Никаких @ObservedObject!
    //  SwiftUI автоматически подпишется на используемые свойства
    
    var body: some View {
        List {
            ForEach(store.filteredItems) { item in
                TodoRow(item: item) {
                    store.toggle(item)
                }
            }
            .onDelete { store.delete(at: $0) }
        }
    }
}

struct FilterPicker: View {
    var store: TodoStore
    
    var body: some View {
        // Этот View обновится ТОЛЬКО при изменении filter
        // НЕ при изменении items!
        Picker("Фильтр", selection: $store.filter) {
            ForEach(TodoStore.Filter.allCases, id: \\.self) { filter in
                Text(filter.rawValue).tag(filter)
            }
        }
        .pickerStyle(.segmented)
    }
}

struct TodoRow: View {
    let item: TodoItem
    let onToggle: () -> Void
    
    var body: some View {
        HStack {
            Image(systemName: item.isCompleted ? "checkmark.circle.fill" : "circle")
                .foregroundColor(item.isCompleted ? .green : .gray)
                .onTapGesture(perform: onToggle)
            Text(item.title)
                .strikethrough(item.isCompleted)
        }
    }
}

struct AddTodoBar: View {
    var store: TodoStore
    @State private var newTitle = ""
    
    var body: some View {
        HStack {
            TextField("Новая задача", text: $newTitle)
                .textFieldStyle(.roundedBorder)
            Button("Добавить") {
                store.add(newTitle)
                newTitle = ""
            }
            .disabled(newTitle.isEmpty)
        }
        .padding()
    }
}
`} />
        </div>
      </section>

      {/* --- @Bindable --- */}
      <section>
        <h2>🔗 @Bindable — создание Binding к @Observable</h2>
        <div className="card">
          <h3>Когда нужен Binding к свойству Observable</h3>
          <p>
            Для создания <code>$object.property</code> Binding на @Observable объекте,
            который передан как <code>var</code> (не @State), используется <code>@Bindable</code>.
          </p>
          <CodeBlock language="swift" title="@Bindable для Binding'ов" code={`
@Observable
class Settings {
    var isDarkMode = false
    var fontSize: Double = 16
    var username = ""
}

// ─── Если Store в @State — $ работает автоматически ───
struct ParentView: View {
    @State private var settings = Settings()
    
    var body: some View {
        // $settings.isDarkMode — работает!
        // Потому что @State знает про @Observable
        Toggle("Dark Mode", isOn: $settings.isDarkMode)
        
        ChildView(settings: settings)
    }
}

// ─── Если Store передан через var — нужен @Bindable ───
struct ChildView: View {
    @Bindable var settings: Settings
    //  ^ @Bindable позволяет делать $ на переданном Observable
    
    var body: some View {
        VStack {
            // Теперь $ работает!
            TextField("Username", text: $settings.username)
            Slider(value: $settings.fontSize, in: 10...30)
            Toggle("Dark Mode", isOn: $settings.isDarkMode)
        }
    }
}

// Без @Bindable:
struct BadChildView: View {
    var settings: Settings
    
    var body: some View {
        // ❌ $settings.username — ОШИБКА КОМПИЛЯЦИИ!
        // $ не работает на обычном var
        TextField("Username", text: $settings.username) // ❌
    }
}
`} />
          <div className="info-box">
            <span className="info-box-icon">💡</span>
            <div className="info-box-content">
              <div className="info-box-title">Когда нужен @Bindable?</div>
              <p>
                Правило простое: если <code>@Observable</code> объект хранится в <code>@State</code> — 
                $ работает автоматически. Если объект <strong>передан как параметр</strong> и вам нужен
                <code>$object.prop</code> Binding — используйте <code>@Bindable</code>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Comparison Table: Old vs New --- */}
      <section>
        <h2>📋 Полная таблица: Старый vs Новый подход</h2>
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color, #333)' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Задача</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Старый (iOS 13-16)</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Новый (iOS 17+)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Объявить модель', 'class Foo: ObservableObject', '@Observable class Foo'],
                  ['Реактивное свойство', '@Published var x = 0', 'var x = 0 (автомат.)'],
                  ['Создать в View', '@StateObject var foo = Foo()', '@State var foo = Foo()'],
                  ['Передать дочернему', '@ObservedObject var foo: Foo', 'var foo: Foo'],
                  ['Binding к свойству', 'Через @ObservedObject $', '@Bindable var foo'],
                  ['Environment', '@EnvironmentObject var foo', '@Environment(Foo.self) var foo'],
                  ['Гранулярность', 'Любое @Published → всё обновляется', 'Только используемые свойства'],
                  ['React-аналог', 'Context + forceUpdate', 'MobX / Zustand с selectors'],
                ].map(([task, old, newApproach], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #333)' }}>
                    <td style={{ padding: '8px 10px', fontWeight: 500 }}>{task}</td>
                    <td style={{ padding: '8px 10px', color: '#FF9800' }}><code>{old}</code></td>
                    <td style={{ padding: '8px 10px', color: '#4CAF50' }}><code>{newApproach}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- React Comparison --- */}
      <section>
        <h2>⚛️ Сравнение с React экосистемой</h2>
        <div className="feature-grid">
          <div className="feature-card" style={{ cursor: 'default' }}>
            <div className="feature-icon">🐻</div>
            <h3>Zustand</h3>
            <p>
              @Observable Store ≈ Zustand store. Оба: класс/объект с состоянием и методами. 
              Zustand: <code>create((set) =&gt; ({'{...}'}))</code>. SwiftUI: <code>@Observable class</code>.
            </p>
          </div>
          <div className="feature-card" style={{ cursor: 'default' }}>
            <div className="feature-icon">👀</div>
            <h3>MobX</h3>
            <p>
              @Observable ≈ <code>makeAutoObservable</code>. Оба автоматически отслеживают 
              зависимости. MobX observer() ≈ SwiftUI tracking. Самая близкая аналогия!
            </p>
          </div>
          <div className="feature-card" style={{ cursor: 'default' }}>
            <div className="feature-icon">🔄</div>
            <h3>React Context</h3>
            <p>
              @Observable + @Environment ≈ React Context. Но без проблемы лишних ре-рендеров! 
              SwiftUI обновляет только Views, читающие изменившиеся свойства.
            </p>
          </div>
        </div>

        <div className="card" style={{ marginTop: '16px' }}>
          <h3>MobX vs @Observable — бок о бок</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            margin: '16px 0',
          }}>
            <div>
              <CodeBlock language="swift" title="SwiftUI @Observable" code={`
@Observable
class CounterStore {
    var count = 0
    var name = "Counter"
    
    var doubled: Int { count * 2 }
    
    func increment() {
        count += 1
    }
    
    func reset() {
        count = 0
    }
}

struct CounterView: View {
    @State var store = CounterStore()
    
    var body: some View {
        VStack {
            Text("\\(store.count)")
            Text("x2: \\(store.doubled)")
            Button("+1") { 
                store.increment() 
            }
        }
    }
}
`} />
            </div>
            <div>
              <CodeBlock language="swift" title="React + MobX" code={`
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'

class CounterStore {
    count = 0
    name = "Counter"
    
    constructor() {
        makeAutoObservable(this)
    }
    
    get doubled() { return this.count * 2 }
    
    increment() { this.count += 1 }
    reset() { this.count = 0 }
}

const store = new CounterStore()

const CounterView = observer(() => (
    <div>
        <p>{store.count}</p>
        <p>x2: {store.doubled}</p>
        <button onClick={() => 
            store.increment()}>
            +1
        </button>
    </div>
))
`} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <PhoneMockup title="Counter">
              <div className="sim-vstack" style={{ gap: '16px', alignItems: 'center', padding: '30px 16px' }}>
                <span className="sim-text" style={{ fontSize: '48px', fontWeight: 700, color: '#007AFF' }}>{obsCount}</span>
                <span className="sim-text--secondary" style={{ fontSize: '13px' }}>
                  doubled = {obsCount * 2}
                </span>
                <div className="sim-hstack" style={{ gap: '12px' }}>
                  <button className="sim-button--filled" onClick={() => setObsCount(c => c + 1)}
                    style={{ padding: '8px 24px' }}>+1</button>
                  <button className="sim-button--filled" onClick={() => setObsCount(0)}
                    style={{ padding: '8px 24px', background: '#8e8e93' }}>Сброс</button>
                </div>
                <span className="sim-text--secondary" style={{ fontSize: '11px', fontFamily: 'monospace' }}>
                  @Observable class CounterStore
                </span>
              </div>
            </PhoneMockup>
          </div>
        </div>
      </section>

      {/* --- Best Practices --- */}
      <section>
        <h2>✅ Best Practices</h2>
        <div className="card">
          <CodeBlock language="swift" title="Лучшие практики @Observable" code={`
// ✅ 1. Используйте @Observable для shared state
@Observable
class AppState {
    var isLoggedIn = false
    var user: User?
    var theme: Theme = .system
}

// ✅ 2. Для простых View — @State достаточно
struct SimpleCounter: View {
    @State private var count = 0  // Не нужен @Observable для простого Int
    var body: some View {
        Button("\\(count)") { count += 1 }
    }
}

// ✅ 3. @Observable — для сложной бизнес-логики
@Observable
class CartStore {
    var items: [CartItem] = []
    var promoCode: String?
    
    var subtotal: Decimal { items.reduce(0) { $0 + $1.price * Decimal($1.quantity) } }
    var discount: Decimal { promoCode != nil ? subtotal * 0.1 : 0 }
    var total: Decimal { subtotal - discount }
    
    func addItem(_ product: Product) { /* ... */ }
    func removeItem(_ id: UUID) { /* ... */ }
    func applyPromo(_ code: String) async throws { /* ... */ }
}

// ✅ 4. @Observable — всегда class, не struct!
@Observable
class MyModel { }  // ✅ class

// @Observable
// struct MyModel { } // ❌ Не работает со struct!

// ✅ 5. Не пишите @Published — @Observable делает это автоматически
@Observable
class Store {
    var name = ""       // ✅ автоматически observable
    // @Published var name = ""  // ❌ НЕ нужен с @Observable
}
`} />
        </div>
      </section>

      {/* --- Summary --- */}
      <div className="info-box" style={{ marginTop: '32px' }}>
        <span className="info-box-icon">🎯</span>
        <div className="info-box-content">
          <div className="info-box-title">Ключевые идеи</div>
          <p>
            1. <code>@Observable</code> заменяет <code>ObservableObject</code> + <code>@Published</code> + <code>@StateObject</code> + <code>@ObservedObject</code><br />
            2. Автоматический tracking: обновляются только Views, читающие изменённые свойства<br />
            3. <code>@State var store = MyStore()</code> — для создания. Просто <code>var store: MyStore</code> — для передачи<br />
            4. <code>@Bindable</code> — когда нужен <code>$store.property</code> Binding на переданном Observable<br />
            5. @Observable ≈ MobX <code>makeAutoObservable</code> — ближайшая аналогия в React-мире<br />
            6. Всегда <code>class</code>, не <code>struct</code>! (reference type для shared state)
          </p>
        </div>
      </div>
    </div>
  )
}
