import CodeBlock from '../components/CodeBlock'
import PhoneMockup from '../components/PhoneMockup'

export default function ListsFormsPage() {
  return (
    <div className="demo-container">
      <h1>📋 Lists & Forms</h1>
      <p>
        Списки и формы — основа большинства iOS-приложений. SwiftUI предоставляет мощные
        компоненты <code>List</code> и <code>Form</code>, которые автоматически получают нативный
        вид и поведение: инерционная прокрутка, swipe-действия, pull-to-refresh и поиск — всё из коробки.
      </p>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">React-разработчику</div>
          <p>
            В React списки делаются через <code>array.map()</code> — полная свобода, но и вся
            работа на тебе. В SwiftUI <code>List</code> — это готовый компонент (аналог UITableView),
            который автоматически обеспечивает виртуализацию, переиспользование ячеек и нативные
            жесты. <code>Form</code> — специальный список для экранов настроек.
          </p>
        </div>
      </div>

      {/* ─── Базовый List ─── */}
      <section className="card">
        <h2>📝 List — базовый список</h2>
        <p>
          <code>List</code> — это NativeUI компонент для отображения scrollable списков данных.
          Автоматическая виртуализация (как <code>react-window</code>), нативный скроллинг,
          разделители между строками.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🍎 SwiftUI List</h3>
            <CodeBlock language="swift" code={`
// Статический список
List {
    Text("Первый элемент")
    Text("Второй элемент")
    Text("Третий элемент")
}

// Динамический список из массива
struct Contact: Identifiable {
    let id = UUID()
    let name: String
    let phone: String
}

struct ContactListView: View {
    let contacts: [Contact]
    
    var body: some View {
        List(contacts) { contact in
            VStack(alignment: .leading) {
                Text(contact.name)
                    .font(.headline)
                Text(contact.phone)
                    .foregroundColor(.secondary)
            }
        }
    }
}`} />
          </div>
          <div className="feature-card">
            <h3>⚛️ React эквивалент</h3>
            <CodeBlock language="swift" code={`
// В React — array.map()
function ContactList({ contacts }) {
  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          <div>
            <strong>{contact.name}</strong>
            <span>{contact.phone}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

// Для виртуализации нужна 
// библиотека: react-window, 
// react-virtuoso и т.д.
// SwiftUI делает это автоматически`} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <PhoneMockup title="Contacts">
            <div className="sim-vstack" style={{ gap: '0' }}>
              <div className="sim-large-title" style={{ fontSize: '24px', marginBottom: '8px' }}>Контакты</div>
              <div className="sim-list">
                {[
                  { name: 'Анна Петрова', phone: '+7 (999) 123-45-67' },
                  { name: 'Борис Иванов', phone: '+7 (999) 234-56-78' },
                  { name: 'Виктория Сидорова', phone: '+7 (999) 345-67-89' },
                  { name: 'Дмитрий Козлов', phone: '+7 (999) 456-78-90' },
                  { name: 'Елена Новикова', phone: '+7 (999) 567-89-01' },
                ].map((c, i) => (
                  <div key={i} className="sim-list-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>{c.name}</span>
                    <span style={{ fontSize: '12px', color: '#8e8e93' }}>{c.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          </PhoneMockup>
        </div>
      </section>

      {/* ─── ForEach и Identifiable ─── */}
      <section className="card">
        <h2>🔁 ForEach и Identifiable</h2>
        <p>
          <code>ForEach</code> — аналог <code>.map()</code> в React. Для работы с <code>List</code>
          каждый элемент должен быть <code>Identifiable</code> (иметь уникальный <code>id</code>) — 
          это как обязательный <code>key</code> в React.
        </p>

        <CodeBlock language="swift" title="Протокол Identifiable и ForEach" code={`
// Identifiable — протокол с обязательным id
struct Task: Identifiable {
    let id = UUID()       // уникальный идентификатор (≈ key в React)
    var title: String
    var isCompleted: Bool
}

struct TaskListView: View {
    @State private var tasks = [
        Task(title: "Купить продукты", isCompleted: false),
        Task(title: "Позвонить маме", isCompleted: true),
        Task(title: "Написать код", isCompleted: false),
    ]
    
    var body: some View {
        List {
            // ForEach — аналог .map() но декларативный
            ForEach(tasks) { task in
                HStack {
                    Image(systemName: task.isCompleted 
                        ? "checkmark.circle.fill" 
                        : "circle")
                    Text(task.title)
                        .strikethrough(task.isCompleted)
                }
            }
        }
    }
}

// Если нет Identifiable — указываем id вручную
ForEach(["Яблоко", "Банан", "Вишня"], id: \\.self) { fruit in
    Text(fruit)
}

// С индексом (как .map((item, index) => ...))
ForEach(Array(tasks.enumerated()), id: \\.element.id) { index, task in
    Text("\\(index + 1). \\(task.title)")
}`} />

        <div className="info-box">
          <strong>⚠️ Key в React ≈ id в SwiftUI:</strong> Как и <code>key</code> в React,
          <code>id</code> нужен для эффективного обновления списка. Без стабильного id
          SwiftUI не сможет отличить перемещение элемента от удаления+добавления.
        </div>
      </section>

      {/* ─── Sections ─── */}
      <section className="card">
        <h2>📂 Section — группировка элементов</h2>
        <p>
          <code>Section</code> группирует элементы списка с заголовками и подвалами.
          Визуально разделяет контент — как секции в настройках iOS.
        </p>

        <CodeBlock language="swift" title="Секции в List" code={`
struct SettingsView: View {
    @State private var username = "Иван"
    @State private var notificationsOn = true
    @State private var darkMode = false
    
    var body: some View {
        List {
            // Секция с заголовком
            Section("Профиль") {
                HStack {
                    Image(systemName: "person.circle.fill")
                        .font(.largeTitle)
                    VStack(alignment: .leading) {
                        Text(username).font(.headline)
                        Text("ivan@mail.ru").foregroundColor(.secondary)
                    }
                }
            }
            
            // Секция с footer
            Section {
                Toggle("Push-уведомления", isOn: $notificationsOn)
                Toggle("Тёмная тема", isOn: $darkMode)
            } header: {
                Text("Настройки")
            } footer: {
                Text("Push-уведомления приходят только когда приложение в фоне")
            }
            
            // Секция с навигацией
            Section("Прочее") {
                NavigationLink("О приложении") { AboutView() }
                NavigationLink("Политика конфиденциальности") { PrivacyView() }
                
                Button("Выйти из аккаунта", role: .destructive) {
                    // logout
                }
            }
        }
    }
}`} />
      </section>

      {/* ─── List Styles ─── */}
      <section className="card">
        <h2>🎨 List Styles — стили списков</h2>
        <p>
          SwiftUI предлагает несколько встроенных стилей для списков. Один модификатор
          полностью меняет внешний вид.
        </p>

        <CodeBlock language="swift" title="Различные стили List" code={`
// Стиль по умолчанию — с отступами и фоном (как Settings.app)
List { ... }
    .listStyle(.insetGrouped)

// Без группировки — плоский список
List { ... }
    .listStyle(.plain)

// Как .insetGrouped, но с рамками
List { ... }
    .listStyle(.grouped)

// Sidebar стиль (для NavigationSplitView)
List { ... }
    .listStyle(.sidebar)

// Кастомизация строк
List {
    ForEach(items) { item in
        Text(item.name)
            .listRowBackground(Color.blue.opacity(0.1))  // фон строки
            .listRowSeparator(.hidden)                     // скрыть разделитель
            .listRowInsets(EdgeInsets(                      // отступы строки
                top: 8, leading: 16, bottom: 8, trailing: 16
            ))
    }
}

// Убрать фон списка полностью
List { ... }
    .scrollContentBackground(.hidden)
    .background(Color.mint.opacity(0.1))`} />
      </section>

      {/* ─── Swipe Actions ─── */}
      <section className="card">
        <h2>👆 Swipe Actions — свайп-действия</h2>
        <p>
          Нативные свайп-действия на строках — как в Mail или Messages. В React для этого
          понадобились бы жесты-библиотеки типа <code>react-swipeable</code>.
        </p>

        <CodeBlock language="swift" title="Swipe actions на строках" code={`
struct InboxView: View {
    @State private var messages = [
        Message(sender: "Алексей", text: "Привет!"),
        Message(sender: "Мария", text: "Как дела?"),
        Message(sender: "Дмитрий", text: "Встречаемся в 18:00"),
    ]
    
    var body: some View {
        List {
            ForEach(messages) { message in
                VStack(alignment: .leading) {
                    Text(message.sender).font(.headline)
                    Text(message.text).foregroundColor(.secondary)
                }
                // Свайп справа налево (trailing)
                .swipeActions(edge: .trailing, allowsFullSwipe: true) {
                    Button(role: .destructive) {
                        deleteMessage(message)
                    } label: {
                        Label("Удалить", systemImage: "trash")
                    }
                    
                    Button {
                        archiveMessage(message)
                    } label: {
                        Label("Архив", systemImage: "archivebox")
                    }
                    .tint(.blue)
                }
                // Свайп слева направо (leading)
                .swipeActions(edge: .leading) {
                    Button {
                        toggleRead(message)
                    } label: {
                        Label("Прочитано", systemImage: "envelope.open")
                    }
                    .tint(.green)
                }
            }
            // Стандартное удаление свайпом
            .onDelete { indexSet in
                messages.remove(atOffsets: indexSet)
            }
            // Перемещение элементов (drag & drop)
            .onMove { from, to in
                messages.move(fromOffsets: from, toOffset: to)
            }
        }
    }
}`} />
      </section>

      {/* ─── Refreshable и Searchable ─── */}
      <section className="card">
        <h2>🔄 Pull-to-refresh и Поиск</h2>
        <p>
          <code>.refreshable</code> добавляет pull-to-refresh, <code>.searchable</code> — 
          строку поиска. Это нативные UI-элементы, встроенные в iOS.
        </p>

        <CodeBlock language="swift" title=".refreshable и .searchable" code={`
struct ArticleListView: View {
    @State private var articles: [Article] = []
    @State private var searchText = ""
    
    var filteredArticles: [Article] {
        if searchText.isEmpty { return articles }
        return articles.filter { 
            $0.title.localizedCaseInsensitiveContains(searchText)
        }
    }
    
    var body: some View {
        NavigationStack {
            List(filteredArticles) { article in
                NavigationLink(value: article) {
                    ArticleRow(article: article)
                }
            }
            .navigationTitle("Статьи")
            
            // Pull-to-refresh — поддерживает async/await
            .refreshable {
                await loadArticles()  // SwiftUI покажет спиннер автоматически
            }
            
            // Строка поиска — появляется вверху списка
            .searchable(
                text: $searchText,
                placement: .navigationBarDrawer(displayMode: .always),
                prompt: "Поиск статей..."
            )
            
            // Подсказки для поиска
            .searchSuggestions {
                ForEach(suggestions, id: \\.self) { suggestion in
                    Text(suggestion)
                        .searchCompletion(suggestion)
                }
            }
            
            // Overlay для пустого состояния
            .overlay {
                if filteredArticles.isEmpty {
                    ContentUnavailableView(
                        "Ничего не найдено",
                        systemImage: "magnifyingglass",
                        description: Text("Попробуйте другой запрос")
                    )
                }
            }
        }
    }
    
    func loadArticles() async {
        // имитация загрузки
        try? await Task.sleep(for: .seconds(1))
        articles = await fetchFromAPI()
    }
}`} />

        <div className="info-box">
          <strong>💡 async/await:</strong> Обрати внимание — <code>.refreshable</code> принимает
          async-замыкание. SwiftUI автоматически показывает и скрывает спиннер. В React для
          pull-to-refresh нужна библиотека + ручное управление состоянием loading.
        </div>
      </section>

      {/* ─── Form ─── */}
      <section className="card">
        <h2>📝 Form — экраны настроек</h2>
        <p>
          <code>Form</code> — специализированный контейнер для ввода данных, визуально
          оформленный как Settings.app. Внутри можно использовать все стандартные контролы:
          Toggle, Picker, DatePicker, Stepper, Slider и т.д.
        </p>

        <CodeBlock language="swift" title="Form с различными контролами" code={`
struct UserProfileForm: View {
    @State private var name = ""
    @State private var email = ""
    @State private var birthDate = Date()
    @State private var notificationsOn = true
    @State private var theme = "system"
    @State private var fontSize: Double = 16
    @State private var maxItems = 10
    @State private var favoriteColor = Color.blue
    
    let themes = ["system", "light", "dark"]
    
    var body: some View {
        NavigationStack {
            Form {
                // Текстовые поля
                Section("Личные данные") {
                    TextField("Имя", text: $name)
                    TextField("Email", text: $email)
                        .keyboardType(.emailAddress)
                        .textContentType(.emailAddress)
                        .autocapitalization(.none)
                    
                    DatePicker("Дата рождения", selection: $birthDate,
                              displayedComponents: .date)
                }
                
                // Переключатели
                Section("Уведомления") {
                    Toggle("Push-уведомления", isOn: $notificationsOn)
                    
                    if notificationsOn {
                        Stepper("Макс. в день: \\(maxItems)", 
                               value: $maxItems, in: 1...50)
                    }
                }
                
                // Picker (выпадающий список)
                Section("Оформление") {
                    Picker("Тема", selection: $theme) {
                        ForEach(themes, id: \\.self) { t in
                            Text(t.capitalized).tag(t)
                        }
                    }
                    
                    // Slider
                    VStack(alignment: .leading) {
                        Text("Размер шрифта: \\(Int(fontSize))")
                        Slider(value: $fontSize, in: 12...32, step: 1)
                    }
                    
                    ColorPicker("Акцентный цвет", selection: $favoriteColor)
                }
                
                // Кнопка сохранения
                Section {
                    Button("Сохранить") {
                        saveProfile()
                    }
                    .frame(maxWidth: .infinity)
                    .bold()
                }
            }
            .navigationTitle("Профиль")
        }
    }
}`} />
      </section>

      {/* ─── Picker варианты ─── */}
      <section className="card">
        <h2>🎛️ Picker — стили выбора</h2>
        <p>
          <code>Picker</code> — универсальный компонент выбора. В зависимости от стиля,
          может выглядеть как меню, segmented control, inline wheel и т.д.
        </p>

        <CodeBlock language="swift" title="Различные стили Picker" code={`
struct PickerExamples: View {
    @State private var selected1 = "Option A"
    @State private var selected2 = 0
    @State private var selected3 = "Medium"
    let options = ["Option A", "Option B", "Option C"]
    let sizes = ["Small", "Medium", "Large"]
    
    var body: some View {
        Form {
            // Menu стиль (по умолчанию в Form) — выпадающий список
            Picker("Меню", selection: $selected1) {
                ForEach(options, id: \\.self) { Text($0) }
            }
            .pickerStyle(.menu)
            
            // Segmented — как табы
            Picker("Размер", selection: $selected3) {
                ForEach(sizes, id: \\.self) { Text($0) }
            }
            .pickerStyle(.segmented)
            
            // Inline — все варианты видны
            Picker("Inline выбор", selection: $selected2) {
                ForEach(0..<5) { Text("Пункт \\($0)").tag($0) }
            }
            .pickerStyle(.inline)
            
            // Navigation — открывает отдельный экран
            Picker("Полный экран", selection: $selected1) {
                ForEach(options, id: \\.self) { Text($0) }
            }
            .pickerStyle(.navigationLink)
            
            // Wheel — классический iOS picker
            Picker("Колесо", selection: $selected2) {
                ForEach(0..<10) { Text("\\($0)").tag($0) }
            }
            .pickerStyle(.wheel)
            .frame(height: 100)
        }
    }
}`} />
      </section>

      {/* ─── Сложный пример ─── */}
      <section className="card">
        <h2>🏗️ Полный пример: Todo List</h2>
        <p>
          Комплексный пример — Todo-приложение с CRUD, поиском, свайпами и секциями.
        </p>

        <CodeBlock language="swift" title="Todo List — полный пример" code={`
struct TodoItem: Identifiable {
    let id = UUID()
    var title: String
    var isCompleted: Bool
    var priority: Priority
    
    enum Priority: String, CaseIterable {
        case low = "Низкий"
        case medium = "Средний"
        case high = "Высокий"
    }
}

struct TodoListView: View {
    @State private var todos: [TodoItem] = sampleTodos
    @State private var newTodoTitle = ""
    @State private var searchText = ""
    
    var activeTodos: [TodoItem] {
        todos.filter { !$0.isCompleted }
            .filter { searchText.isEmpty || $0.title.contains(searchText) }
    }
    
    var completedTodos: [TodoItem] {
        todos.filter { $0.isCompleted }
    }
    
    var body: some View {
        NavigationStack {
            List {
                // Поле добавления
                Section {
                    HStack {
                        TextField("Новая задача...", text: $newTodoTitle)
                        Button { addTodo() } label: {
                            Image(systemName: "plus.circle.fill")
                                .font(.title2)
                        }
                        .disabled(newTodoTitle.isEmpty)
                    }
                }
                
                // Активные задачи
                Section("Активные (\\(activeTodos.count))") {
                    ForEach(activeTodos) { todo in
                        TodoRow(todo: todo) {
                            toggleTodo(todo)
                        }
                        .swipeActions(edge: .trailing) {
                            Button(role: .destructive) {
                                deleteTodo(todo)
                            } label: {
                                Label("Удалить", systemImage: "trash")
                            }
                        }
                    }
                }
                
                // Завершённые
                if !completedTodos.isEmpty {
                    Section("Завершённые (\\(completedTodos.count))") {
                        ForEach(completedTodos) { todo in
                            TodoRow(todo: todo) { toggleTodo(todo) }
                        }
                        .onDelete { indexSet in
                            // удалить из completedTodos
                        }
                    }
                }
            }
            .navigationTitle("Мои задачи")
            .searchable(text: $searchText, prompt: "Поиск...")
        }
    }
}`} />
      </section>

      {/* ─── Итого ─── */}
      <section className="card">
        <h2>📝 Шпаргалка: React → SwiftUI Lists & Forms</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>React</h3>
            <ul>
              <li><code>array.map(item =&gt; ...)</code></li>
              <li><code>key={'{'}item.id{'}'}</code></li>
              <li><code>react-window</code> для виртуализации</li>
              <li><code>&lt;form&gt;</code> + <code>&lt;input&gt;</code></li>
              <li><code>&lt;select&gt;</code> + <code>&lt;option&gt;</code></li>
              <li>Библиотеки для swipe/pull-to-refresh</li>
              <li>Ручное управление search state</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>SwiftUI</h3>
            <ul>
              <li><code>List(items)</code> / <code>ForEach</code></li>
              <li><code>Identifiable</code> протокол</li>
              <li>Виртуализация из коробки</li>
              <li><code>Form</code> с нативными контролами</li>
              <li><code>Picker</code> с разными стилями</li>
              <li><code>.swipeActions</code> / <code>.refreshable</code></li>
              <li><code>.searchable</code> — нативный search</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
