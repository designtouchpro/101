import CodeBlock from '../components/CodeBlock'
import PhoneMockup from '../components/PhoneMockup'

export default function ComponentsPage() {
  return (
    <div className="demo-container">
      <h1>🧩 Компоненты — переиспользуемые Views</h1>
      <p>
        В React компоненты — это функции, принимающие props. В SwiftUI — <code>struct</code>,
        соответствующие протоколу <code>View</code>. Init-параметры = props, <code>@ViewBuilder</code> = children.
        Принципы декомпозиции те же самые.
      </p>

      {/* ─── Basic component ─── */}
      <section className="card">
        <h2>🔧 Custom View — базовый компонент</h2>
        <p>
          Каждый View в SwiftUI — <code>struct</code> с одним обязательным computed property <code>body</code>.
          Init-параметры работают как props в React.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>SwiftUI</h3>
            <CodeBlock language="swift" code={`
struct UserCard: View {
    // "Props" — параметры init
    let name: String
    let role: String
    var avatarURL: URL? = nil
    var isOnline: Bool = false
    
    var body: some View {
        HStack(spacing: 12) {
            // Аватар
            Circle()
                .fill(isOnline ? .green : .gray)
                .frame(width: 40, height: 40)
                .overlay {
                    Text(String(name.prefix(1)))
                        .foregroundStyle(.white)
                        .font(.headline)
                }
            
            // Информация
            VStack(alignment: .leading) {
                Text(name).font(.headline)
                Text(role)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            
            Spacer()
            
            if isOnline {
                Text("online")
                    .font(.caption2)
                    .foregroundStyle(.green)
            }
        }
        .padding()
        .background(.regularMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}

// Использование:
UserCard(name: "Анна", role: "iOS Dev", isOnline: true)
UserCard(name: "Борис", role: "Designer")
`} />
          </div>
          <div className="feature-card">
            <h3>React эквивалент</h3>
            <CodeBlock language="swift" code={`
interface UserCardProps {
  name: string
  role: string
  avatarURL?: string
  isOnline?: boolean
}

function UserCard({ 
  name, role, avatarURL, isOnline = false 
}: UserCardProps) {
  return (
    <div className="user-card">
      <div className={"avatar " + 
        (isOnline ? "online" : "")}>
        {name[0]}
      </div>
      <div className="info">
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
      {isOnline && (
        <span className="status">online</span>
      )}
    </div>
  )
}

// Использование:
<UserCard name="Анна" role="iOS Dev" isOnline />
<UserCard name="Борис" role="Designer" />
`} />
          </div>
        </div>

        <div className="info-box">
          <strong>💡 Отличие:</strong> В Swift параметры с default-значением (<code>var isOnline: Bool = false</code>)
          делают аргумент опциональным при вызове — как <code>defaultProps</code> или <code>= false</code> в деструктуризации React-пропсов.
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <PhoneMockup title="Users">
            <div className="sim-vstack" style={{ gap: '10px' }}>
              {/* UserCard: Anna - online */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'rgba(120,120,128,0.12)', borderRadius: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: '#34c759', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>А</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>Анна</div>
                  <div style={{ fontSize: '12px', color: '#8e8e93' }}>iOS Dev</div>
                </div>
                <span style={{ fontSize: '11px', color: '#34c759' }}>online</span>
              </div>
              {/* UserCard: Boris - offline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'rgba(120,120,128,0.12)', borderRadius: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: '#8e8e93', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>Б</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>Борис</div>
                  <div style={{ fontSize: '12px', color: '#8e8e93' }}>Designer</div>
                </div>
              </div>
              {/* UserCard: Viktor - online */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'rgba(120,120,128,0.12)', borderRadius: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: '#34c759', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>В</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>Виктор</div>
                  <div style={{ fontSize: '12px', color: '#8e8e93' }}>Backend</div>
                </div>
                <span style={{ fontSize: '11px', color: '#34c759' }}>online</span>
              </div>
            </div>
          </PhoneMockup>
        </div>
      </section>

      {/* ─── @ViewBuilder ─── */}
      <section className="card">
        <h2>📦 @ViewBuilder — аналог React children</h2>
        <p>
          <code>@ViewBuilder</code> позволяет передать произвольный UI как параметр — точно как
          <code>children</code> в React. Это основа для создания контейнерных компонентов.
        </p>

        <CodeBlock language="swift" title="@ViewBuilder = children" code={`
// Контейнерный компонент с «дочерним» контентом
struct Card<Content: View>: View {
    let title: String
    @ViewBuilder let content: Content   // ← как children
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title)
                .font(.headline)
                .foregroundStyle(.primary)
            
            content   // ← рендер children
        }
        .padding()
        .background(.regularMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}

// Использование — trailing closure как JSX children
Card(title: "Статистика") {
    HStack {
        Label("142", systemImage: "heart.fill")
        Label("58", systemImage: "message.fill")
    }
    Text("Последнее обновление: сегодня")
        .font(.caption)
        .foregroundStyle(.secondary)
}

// React эквивалент:
// <Card title="Статистика">
//   <div className="stats">
//     <span>❤️ 142</span>
//     <span>💬 58</span>
//   </div>
//   <p className="caption">Последнее обновление: сегодня</p>
// </Card>
`} />

        <CodeBlock language="swift" title="Несколько @ViewBuilder — именованные слоты" code={`
// Несколько «слотов» — как render props в React
struct DialogBox<Header: View, Body: View, Footer: View>: View {
    @ViewBuilder let header: Header
    @ViewBuilder let content: Body
    @ViewBuilder let footer: Footer
    
    var body: some View {
        VStack(spacing: 0) {
            header
                .padding()
                .frame(maxWidth: .infinity)
                .background(.blue.opacity(0.1))
            
            content
                .padding()
            
            Divider()
            
            footer
                .padding()
        }
        .background(.regularMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(radius: 10)
    }
}

// Использование:
DialogBox {
    Text("Подтверждение").font(.title2.bold())
} content: {
    Text("Вы уверены, что хотите удалить?")
} footer: {
    HStack {
        Button("Отмена", role: .cancel) { }
        Button("Удалить", role: .destructive) { }
    }
}

// React эквивалент (render props / slots):
// <DialogBox
//   header={<h2>Подтверждение</h2>}
//   footer={<div><button>Отмена</button></div>}
// >
//   <p>Вы уверены?</p>
// </DialogBox>
`} />
      </section>

      {/* ─── Generic Views ─── */}
      <section className="card">
        <h2>🧬 Generic Views — обобщённые компоненты</h2>
        <p>
          Swift generics позволяют создавать Views, которые работают с любым типом данных —
          как generic-компоненты в TypeScript React.
        </p>

        <CodeBlock language="swift" title="Generic View — универсальный список" code={`
// Generic список, работающий с любым Identifiable типом
struct SelectableList<Item: Identifiable, Content: View>: View {
    let items: [Item]
    @Binding var selection: Item.ID?
    @ViewBuilder let row: (Item) -> Content
    
    var body: some View {
        List(items, selection: $selection) { item in
            row(item)
                .listRowBackground(
                    item.id == selection 
                        ? Color.accentColor.opacity(0.1) 
                        : Color.clear
                )
        }
    }
}

// Используется с User
struct User: Identifiable {
    let id: UUID
    let name: String
}

SelectableList(items: users, selection: $selectedId) { user in
    Text(user.name)
}

// Используется с Product
struct Product: Identifiable {
    let id: Int
    let title: String
    let price: Double
}

SelectableList(items: products, selection: $selectedId) { product in
    HStack {
        Text(product.title)
        Spacer()
        Text("\\(product.price, format: .currency(code: "RUB"))")
    }
}

// TypeScript React аналог:
// interface SelectableListProps<T extends { id: string }> {
//   items: T[]
//   selectedId: string | null
//   onSelect: (id: string) => void
//   renderRow: (item: T) => ReactNode
// }
`} />
      </section>

      {/* ─── ViewModifier ─── */}
      <section className="card">
        <h2>🎨 ViewModifier — кастомные модификаторы</h2>
        <p>
          <code>ViewModifier</code> — протокол для создания переиспользуемых наборов стилей и поведения.
          Это как создание CSS-утилити или HOC (Higher-Order Component) в React.
        </p>

        <CodeBlock language="swift" title="ViewModifier — переиспользуемые стили" code={`
// Кастомный модификатор — стиль карточки
struct CardStyle: ViewModifier {
    var elevation: CGFloat = 4
    
    func body(content: Content) -> some View {
        content
            .padding()
            .background(.regularMaterial)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .shadow(radius: elevation)
    }
}

// Extension для удобного вызова через точку
extension View {
    func cardStyle(elevation: CGFloat = 4) -> some View {
        modifier(CardStyle(elevation: elevation))
    }
}

// Использование — цепочка модификаторов
Text("Привет!")
    .font(.title)
    .cardStyle()            // наш кастомный модификатор
    .cardStyle(elevation: 8) // с параметром

// Более сложный пример: загрузочное состояние
struct LoadingOverlay: ViewModifier {
    let isLoading: Bool
    
    func body(content: Content) -> some View {
        content
            .overlay {
                if isLoading {
                    ZStack {
                        Color.black.opacity(0.3)
                        ProgressView()
                            .scaleEffect(1.5)
                            .tint(.white)
                    }
                }
            }
            .disabled(isLoading)
            .animation(.easeInOut, value: isLoading)
    }
}

extension View {
    func loadingOverlay(_ isLoading: Bool) -> some View {
        modifier(LoadingOverlay(isLoading: isLoading))
    }
}

// Использование:
Form { /* ... */ }
    .loadingOverlay(viewModel.isSaving)
`} />

        <div className="info-box">
          <strong>⚛️ React-аналогия:</strong> ViewModifier — это как HOC или styled-component.
          Но в SwiftUI модификаторы chainable (цепочка), что делает их более композабельными.
          <code>.cardStyle().loadingOverlay(isLoading)</code> — как CSS-утилити <code>className="card loading"</code>.
        </div>
      </section>

      {/* ─── Custom ButtonStyle ─── */}
      <section className="card">
        <h2>🔘 Custom ButtonStyle</h2>
        <p>
          <code>ButtonStyle</code> — специализированный протокол для стилизации кнопок.
          Даёт доступ к состоянию нажатия (<code>isPressed</code>). Аналог создания
          кастомной кнопки с обработкой <code>:active</code> в CSS.
        </p>

        <CodeBlock language="swift" title="Custom ButtonStyle — дизайн-система" code={`
// Primary Button
struct PrimaryButtonStyle: ButtonStyle {
    @Environment(\\.isEnabled) var isEnabled
    
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headline)
            .foregroundStyle(.white)
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
            .background(
                RoundedRectangle(cornerRadius: 10)
                    .fill(isEnabled ? .blue : .gray)
            )
            .opacity(configuration.isPressed ? 0.7 : 1.0)
            .scaleEffect(configuration.isPressed ? 0.97 : 1.0)
            .animation(.easeInOut(duration: 0.15), value: configuration.isPressed)
    }
}

// Ghost Button (outlined)
struct GhostButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headline)
            .foregroundStyle(.blue)
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
            .background(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(.blue, lineWidth: 2)
            )
            .opacity(configuration.isPressed ? 0.6 : 1.0)
    }
}

// Extension для удобства
extension ButtonStyle where Self == PrimaryButtonStyle {
    static var primary: PrimaryButtonStyle { PrimaryButtonStyle() }
}
extension ButtonStyle where Self == GhostButtonStyle {
    static var ghost: GhostButtonStyle { GhostButtonStyle() }
}

// Использование:
Button("Сохранить") { save() }
    .buttonStyle(.primary)

Button("Отмена") { cancel() }
    .buttonStyle(.ghost)

Button("Disabled") { }
    .buttonStyle(.primary)
    .disabled(true)
`} />
      </section>

      {/* ─── PreferenceKey ─── */}
      <section className="card">
        <h2>⬆️ PreferenceKey — child → parent коммуникация</h2>
        <p>
          В React data flow — сверху вниз, а для обратного направления используются callbacks.
          В SwiftUI есть <code>PreferenceKey</code> — механизм передачи данных от дочернего View
          к родительскому, без callbacks.
        </p>

        <CodeBlock language="swift" title="PreferenceKey — передача данных вверх" code={`
// 1. Определяем ключ
struct ScrollOffsetPreferenceKey: PreferenceKey {
    static var defaultValue: CGFloat = 0
    
    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) {
        value = nextValue()
    }
}

// 2. Дочерний View устанавливает значение
struct ScrollTrackingView: View {
    var body: some View {
        ScrollView {
            LazyVStack {
                ForEach(0..<50) { i in
                    Text("Row \\(i)")
                        .frame(maxWidth: .infinity, minHeight: 60)
                }
            }
            .background(
                GeometryReader { geo in
                    Color.clear
                        .preference(
                            key: ScrollOffsetPreferenceKey.self,
                            value: geo.frame(in: .named("scroll")).minY
                        )
                }
            )
        }
        .coordinateSpace(name: "scroll")
        // 3. Родитель читает значение
        .onPreferenceChange(ScrollOffsetPreferenceKey.self) { offset in
            print("Scroll offset: \\(offset)")
        }
    }
}

// Пример использования: показать кнопку «Наверх» при скролле
struct SmartScrollView: View {
    @State private var scrollOffset: CGFloat = 0
    @State private var showBackToTop = false
    
    var body: some View {
        ZStack(alignment: .bottomTrailing) {
            scrollContent
                .onPreferenceChange(ScrollOffsetPreferenceKey.self) { offset in
                    scrollOffset = offset
                    showBackToTop = offset < -200
                }
            
            if showBackToTop {
                Button {
                    // scroll to top
                } label: {
                    Image(systemName: "arrow.up.circle.fill")
                        .font(.largeTitle)
                }
                .padding()
                .transition(.scale.combined(with: .opacity))
            }
        }
        .animation(.spring, value: showBackToTop)
    }
}
`} />

        <div className="info-box">
          <strong>⚛️ React-аналогия:</strong> PreferenceKey напоминает <code>ref callback</code>
          или <code>IntersectionObserver</code>. Дочерний элемент «публикует» данные вверх по дереву,
          родитель подписывается через <code>.onPreferenceChange</code>.
        </div>
      </section>

      {/* ─── Custom Container View ─── */}
      <section className="card">
        <h2>📦 Custom Container — свой Layout-компонент</h2>
        <p>
          Создание контейнерных компонентов, которые управляют расположением дочерних элементов —
          как кастомные React-контейнеры с <code>children</code>.
        </p>

        <CodeBlock language="swift" title="Custom Container View" code={`
// Контейнер с заголовком и кнопкой
struct Section<Content: View>: View {
    let title: String
    var action: (() -> Void)? = nil
    var actionLabel: String = "Все"
    @ViewBuilder let content: Content
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(title)
                    .font(.title2.bold())
                Spacer()
                if let action {
                    Button(actionLabel, action: action)
                        .font(.subheadline)
                }
            }
            
            content
        }
        .padding(.vertical, 8)
    }
}

// Адаптивная сетка
struct AdaptiveGrid<Item: Identifiable, Content: View>: View {
    let items: [Item]
    let minWidth: CGFloat
    @ViewBuilder let content: (Item) -> Content
    
    var body: some View {
        LazyVGrid(
            columns: [GridItem(.adaptive(minimum: minWidth), spacing: 16)],
            spacing: 16
        ) {
            ForEach(items) { item in
                content(item)
            }
        }
    }
}

// Использование — как React компоненты:
Section(title: "Популярное", action: { showAll() }) {
    AdaptiveGrid(items: products, minWidth: 150) { product in
        ProductCard(product: product)
    }
}

Section(title: "Недавние") {
    ForEach(recentItems) { item in
        RecentRow(item: item)
    }
}
`} />
      </section>

      {/* ─── Design System ─── */}
      <section className="card">
        <h2>🎨 Паттерн: Design System</h2>
        <p>
          Собираем все кастомные компоненты в единую дизайн-систему. В React это было бы
          npm-пакетом с компонентами. В SwiftUI — Swift Package или набор файлов.
        </p>

        <CodeBlock language="swift" title="Основа дизайн-системы" code={`
// ── Tokens (как CSS custom properties) ──
enum DSColors {
    static let primary = Color("PrimaryColor")    // из Assets
    static let secondary = Color("SecondaryColor")
    static let background = Color("BackgroundColor")
    static let surface = Color("SurfaceColor")
    static let error = Color.red
    static let success = Color.green
}

enum DSSpacing {
    static let xs: CGFloat = 4
    static let sm: CGFloat = 8
    static let md: CGFloat = 16
    static let lg: CGFloat = 24
    static let xl: CGFloat = 32
}

enum DSRadius {
    static let sm: CGFloat = 6
    static let md: CGFloat = 12
    static let lg: CGFloat = 20
    static let full: CGFloat = 999
}

// ── Компоненты ──
struct DSButton: View {
    enum Variant { case primary, secondary, ghost, destructive }
    
    let title: String
    var variant: Variant = .primary
    var isLoading: Bool = false
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: DSSpacing.sm) {
                if isLoading {
                    ProgressView()
                        .tint(.white)
                }
                Text(title)
                    .fontWeight(.semibold)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, DSSpacing.md)
            .padding(.horizontal, DSSpacing.lg)
            .background(backgroundColor)
            .foregroundStyle(foregroundColor)
            .clipShape(RoundedRectangle(cornerRadius: DSRadius.md))
            .overlay { overlayBorder }
        }
        .disabled(isLoading)
    }
    
    private var backgroundColor: Color {
        switch variant {
        case .primary:     return DSColors.primary
        case .secondary:   return DSColors.surface
        case .ghost:       return .clear
        case .destructive: return DSColors.error
        }
    }
    
    private var foregroundColor: Color {
        switch variant {
        case .primary, .destructive: return .white
        case .secondary, .ghost:     return DSColors.primary
        }
    }
    
    @ViewBuilder
    private var overlayBorder: some View {
        if variant == .ghost || variant == .secondary {
            RoundedRectangle(cornerRadius: DSRadius.md)
                .stroke(DSColors.primary, lineWidth: 1.5)
        }
    }
}

// ── Использование дизайн-системы ──
struct CheckoutView: View {
    @State private var isSaving = false
    
    var body: some View {
        VStack(spacing: DSSpacing.lg) {
            DSButton(title: "Оплатить", variant: .primary, 
                     isLoading: isSaving) {
                isSaving = true
            }
            DSButton(title: "Отмена", variant: .ghost) {
                // cancel
            }
            DSButton(title: "Удалить заказ", variant: .destructive) {
                // delete
            }
        }
        .padding(DSSpacing.lg)
    }
}
`} />

        <div className="info-box">
          <strong>📦 Итог:</strong>
          <ul className="info-list">
            <li><strong>Custom View struct</strong> = React function component</li>
            <li><strong>init параметры</strong> = React props</li>
            <li><strong>@ViewBuilder</strong> = React children / render props</li>
            <li><strong>ViewModifier</strong> = HOC / styled utility</li>
            <li><strong>ButtonStyle</strong> = CSS class + :active/:disabled</li>
            <li><strong>PreferenceKey</strong> = callback ref / IntersectionObserver</li>
            <li><strong>Generic View</strong> = TypeScript generic component</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
