import CodeBlock from '../components/CodeBlock'

export default function AccessibilityPage() {
  return (
    <div className="demo-container">
      <h1>♿ Accessibility и Input Handling</h1>
      <p>
        Accessibility (a11y) в SwiftUI — не «bonus feature», а обязательная часть качественного приложения.
        VoiceOver используют ~70% незрячих пользователей iPhone. Apple требует a11y для App Store Review.
      </p>

      {/* ─── Labels & Traits ─── */}
      <section className="card">
        <h2>🏷 Accessibility Labels и Traits</h2>
        <CodeBlock language="swift" code={`// Каждый элемент SwiftUI автоматически доступен VoiceOver,
// но часто нужна настройка

// 1. accessibilityLabel — что VoiceOver произнесёт
Image(systemName: "heart.fill")
    .accessibilityLabel("Добавить в избранное")

// 2. accessibilityHint — дополнительное описание действия
Button(action: delete) {
    Image(systemName: "trash")
}
.accessibilityLabel("Удалить")
.accessibilityHint("Удаляет выбранный элемент навсегда")

// 3. accessibilityValue — текущее значение
Slider(value: $volume, in: 0...100)
    .accessibilityValue("\\(Int(volume)) процентов")

// 4. accessibilityAddTraits / removeTraits
Text("Заголовок секции")
    .accessibilityAddTraits(.isHeader)   // VoiceOver: "heading"

Image("banner")
    .accessibilityRemoveTraits(.isImage) // убрать "image" из описания
    .accessibilityLabel("Акция: скидка 50%")

// 5. accessibilityHidden — скрыть декоративные элементы
Image("decorative-line")
    .accessibilityHidden(true)           // VoiceOver пропустит

// 6. Группировка элементов
HStack {
    Image(systemName: "star.fill")
    Text("4.8")
    Text("(1024 отзыва)")
}
.accessibilityElement(children: .combine)  // одно целое для VoiceOver
// → "star.fill, 4.8, 1024 отзыва"

// Или кастомный label для группы
HStack { /* ... */ }
.accessibilityElement(children: .ignore)
.accessibilityLabel("Рейтинг 4.8, 1024 отзыва")`} />
      </section>

      {/* ─── Dynamic Type ─── */}
      <section className="card">
        <h2>🔤 Dynamic Type</h2>
        <p>
          Dynamic Type позволяет пользователю менять размер шрифта в системных настройках.
          SwiftUI поддерживает его автоматически для стандартных шрифтов.
        </p>
        <CodeBlock language="swift" code={`// Стандартные стили — автоматически масштабируются
Text("Заголовок")
    .font(.title)        // масштабируется с Dynamic Type

Text("Основной текст")
    .font(.body)

// Кастомный шрифт с Dynamic Type
Text("Custom")
    .font(.custom("Montserrat-Bold", size: 18, relativeTo: .headline))
    // relativeTo: масштабируется как .headline

// @ScaledMetric — масштабирование кастомных значений
struct CardView: View {
    @ScaledMetric(relativeTo: .body) var padding = 16
    @ScaledMetric(relativeTo: .body) var iconSize = 24
    
    var body: some View {
        HStack(spacing: padding) {
            Image(systemName: "bell")
                .frame(width: iconSize, height: iconSize)
            Text("Уведомление")
        }
        .padding(padding)     // масштабируется вместе со шрифтом
    }
}

// Ограничение размера текста (для layout-критичных мест)
Text("Compact")
    .dynamicTypeSize(.small ... .xxxLarge)  // без accessibility sizes

// @Environment для кастомной логики
struct AdaptiveLayout: View {
    @Environment(\\.dynamicTypeSize) var typeSize
    
    var body: some View {
        if typeSize >= .accessibility1 {
            VStack { content }       // вертикально для крупного текста
        } else {
            HStack { content }       // горизонтально по умолчанию
        }
    }
}`} />
      </section>

      {/* ─── Focus & Keyboard ─── */}
      <section className="card">
        <h2>🎯 Focus State и Keyboard</h2>
        <CodeBlock language="swift" code={`// @FocusState — управление фокусом (iOS 15+)
struct LoginForm: View {
    enum Field: Hashable {
        case email, password
    }
    
    @State private var email = ""
    @State private var password = ""
    @FocusState private var focusedField: Field?
    
    var body: some View {
        VStack {
            TextField("Email", text: $email)
                .focused($focusedField, equals: .email)
                .textContentType(.emailAddress)
                .keyboardType(.emailAddress)
                .submitLabel(.next)
                .onSubmit {
                    focusedField = .password  // → перейти к паролю
                }
            
            SecureField("Пароль", text: $password)
                .focused($focusedField, equals: .password)
                .textContentType(.password)
                .submitLabel(.go)
                .onSubmit(login)
            
            Button("Войти", action: login)
        }
        .onAppear {
            focusedField = .email   // авто-фокус на email
        }
        .toolbar {
            ToolbarItemGroup(placement: .keyboard) {
                Spacer()
                Button("Готово") {
                    focusedField = nil  // скрыть клавиатуру
                }
            }
        }
    }
}

// @FocusState с Bool (простой случай)
struct SearchView: View {
    @State private var query = ""
    @FocusState private var isSearchFocused: Bool
    
    var body: some View {
        TextField("Поиск...", text: $query)
            .focused($isSearchFocused)
            .onAppear { isSearchFocused = true }
    }
}

// accessibilityFocused — для VoiceOver фокуса
struct ErrorBanner: View {
    @AccessibilityFocusState var isErrorFocused: Bool
    @Binding var error: String?
    
    var body: some View {
        if let error {
            Text(error)
                .accessibilityFocused($isErrorFocused)
                .onAppear { isErrorFocused = true }  // VoiceOver сразу прочтёт
        }
    }
}`} />
      </section>

      {/* ─── Real Device Interactions ─── */}
      <section className="card">
        <h2>📱 Реальные сценарии ввода</h2>
        <CodeBlock language="swift" code={`// 1. Форма с валидацией и a11y
struct ProfileForm: View {
    @State private var name = ""
    @State private var bio = ""
    @FocusState private var focused: FormField?
    
    enum FormField: Hashable { case name, bio }
    
    var nameError: String? {
        name.count < 2 ? "Минимум 2 символа" : nil
    }
    
    var body: some View {
        Form {
            Section("Профиль") {
                TextField("Имя", text: $name)
                    .focused($focused, equals: .name)
                    .accessibilityLabel("Имя пользователя")
                    .accessibilityValue(name.isEmpty ? "Пусто" : name)
                
                if let error = nameError, !name.isEmpty {
                    Text(error)
                        .foregroundColor(.red)
                        .font(.caption)
                        .accessibilityLabel("Ошибка: \\(error)")
                }
                
                TextEditor(text: $bio)
                    .focused($focused, equals: .bio)
                    .frame(height: 100)
                    .accessibilityLabel("О себе")
                    .accessibilityHint("Введите краткое описание")
            }
        }
    }
}

// 2. Кастомные accessibility actions
struct MessageRow: View {
    let message: Message
    
    var body: some View {
        Text(message.text)
            .accessibilityAction(named: "Ответить") { reply(message) }
            .accessibilityAction(named: "Переслать") { forward(message) }
            .accessibilityAction(named: "Удалить") { delete(message) }
            // VoiceOver: свайп вверх/вниз для выбора действия
    }
}

// 3. Accessibility rotor — навигация по категориям
struct ArticleView: View {
    let sections: [ArticleSection]
    
    var body: some View {
        ScrollView {
            ForEach(sections) { section in
                Text(section.title)
                    .font(.title2)
                    .accessibilityAddTraits(.isHeader)
                    // Rotor → Headers → VoiceOver перейдёт к следующему заголовку
                
                Text(section.body)
            }
        }
        .accessibilityRotor("Изображения") {
            ForEach(images) { image in
                AccessibilityRotorEntry(image.caption, id: image.id)
            }
        }
    }
}

// 4. Reduce Motion + Reduce Transparency
struct AnimatedCard: View {
    @Environment(\\.accessibilityReduceMotion) var reduceMotion
    @Environment(\\.accessibilityReduceTransparency) var reduceTransparency
    
    var body: some View {
        RoundedRectangle(cornerRadius: 16)
            .fill(reduceTransparency ? .white : .white.opacity(0.8))
            .animation(reduceMotion ? nil : .spring(), value: isExpanded)
            // Без анимации для чувствительных пользователей
    }
}`} />
      </section>

      <section className="card">
        <h2>✅ Чеклист Accessibility</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Категория</th><th>Что проверить</th><th>API</th></tr>
          </thead>
          <tbody>
            <tr><td>Labels</td><td>Все интерактивные элементы имеют label</td><td><code>accessibilityLabel</code></td></tr>
            <tr><td>Hints</td><td>Не очевидные действия описаны</td><td><code>accessibilityHint</code></td></tr>
            <tr><td>Images</td><td>Декоративные скрыты, информативные описаны</td><td><code>accessibilityHidden</code></td></tr>
            <tr><td>Groups</td><td>Связанные элементы объединены</td><td><code>accessibilityElement(children:)</code></td></tr>
            <tr><td>Headers</td><td>Заголовки секций помечены</td><td><code>.isHeader trait</code></td></tr>
            <tr><td>Dynamic Type</td><td>Layout не ломается на xxxLarge</td><td><code>@ScaledMetric</code>, <code>dynamicTypeSize</code></td></tr>
            <tr><td>Focus</td><td>Tab order логичен, автофокус на ключевых полях</td><td><code>@FocusState</code></td></tr>
            <tr><td>Errors</td><td>VoiceOver озвучивает ошибки</td><td><code>@AccessibilityFocusState</code></td></tr>
            <tr><td>Motion</td><td>Учтён Reduce Motion</td><td><code>accessibilityReduceMotion</code></td></tr>
            <tr><td>Color</td><td>Контраст ≥ 4.5:1, не только цвет несёт смысл</td><td>Color contrast checker</td></tr>
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>🎤 Вопросы на собеседовании</h2>
        <ol>
          <li>Как сделать кастомный UI-компонент доступным для VoiceOver?</li>
          <li>Чем отличается <code>accessibilityLabel</code> от <code>accessibilityHint</code>?</li>
          <li>Как работает <code>@FocusState</code>? Как организовать навигацию по полям формы?</li>
          <li>Что такое Dynamic Type и как поддержать его в кастомных компонентах?</li>
          <li>Как тестировать accessibility? (Accessibility Inspector, VoiceOver, XCTest)</li>
          <li>Для чего нужен <code>accessibilityRotor</code>?</li>
        </ol>
      </section>
    </div>
  )
}
