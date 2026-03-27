import CodeBlock from '../components/CodeBlock'
import PhoneMockup from '../components/PhoneMockup'

export default function LayoutPage() {
  return (
    <div className="demo-container">
      <h1>📐 Layout System</h1>
      <p>
        В CSS мы используем Flexbox и Grid для раскладки. В SwiftUI есть свои контейнеры:
        <strong> VStack, HStack, ZStack</strong> — они определяют направление расположения дочерних элементов.
        Система лейаута SwiftUI проще и предсказуемее CSS, но работает по-другому.
      </p>

      {/* --- Stacks --- */}
      <section>
        <h2>📦 Стеки — Основа раскладки</h2>

        <div className="card">
          <h3>VStack, HStack, ZStack — визуальная модель</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '16px',
            margin: '16px 0',
            fontSize: '0.85rem',
          }}>
            <div style={{
              padding: '20px',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              border: '2px solid #4CAF50',
              textAlign: 'center',
            }}>
              <h4 style={{ color: '#4CAF50', margin: '0 0 12px' }}>VStack ↕️</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                <div style={{ background: '#4CAF50', padding: '6px 24px', borderRadius: '6px', color: 'white' }}>A</div>
                <div style={{ background: '#4CAF50', padding: '6px 24px', borderRadius: '6px', color: 'white' }}>B</div>
                <div style={{ background: '#4CAF50', padding: '6px 24px', borderRadius: '6px', color: 'white' }}>C</div>
              </div>
              <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)' }}>flex-direction: column</p>
            </div>
            <div style={{
              padding: '20px',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              border: '2px solid #2196F3',
              textAlign: 'center',
            }}>
              <h4 style={{ color: '#2196F3', margin: '0 0 12px' }}>HStack ↔️</h4>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '6px', justifyContent: 'center' }}>
                <div style={{ background: '#2196F3', padding: '6px 12px', borderRadius: '6px', color: 'white' }}>A</div>
                <div style={{ background: '#2196F3', padding: '6px 12px', borderRadius: '6px', color: 'white' }}>B</div>
                <div style={{ background: '#2196F3', padding: '6px 12px', borderRadius: '6px', color: 'white' }}>C</div>
              </div>
              <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)' }}>flex-direction: row</p>
            </div>
            <div style={{
              padding: '20px',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              border: '2px solid #FF9800',
              textAlign: 'center',
            }}>
              <h4 style={{ color: '#FF9800', margin: '0 0 12px' }}>ZStack ⬛</h4>
              <div style={{ position: 'relative', height: '80px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', background: '#FF9800', padding: '24px 32px', borderRadius: '6px', opacity: 0.5 }} />
                <div style={{ position: 'absolute', top: '10px', background: '#FF5722', padding: '16px 22px', borderRadius: '6px', opacity: 0.7, color: 'white' }} />
                <div style={{ position: 'absolute', top: '20px', background: '#F44336', padding: '8px 14px', borderRadius: '6px', color: 'white', fontWeight: 600 }}>C</div>
              </div>
              <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)' }}>position: absolute (слои)</p>
            </div>
          </div>

          <CodeBlock language="swift" title="Стеки — основные контейнеры" code={`
// VStack — вертикальная раскладка (column)
VStack(alignment: .leading, spacing: 12) {
    Text("Заголовок")
        .font(.title)
    Text("Подзаголовок")
        .foregroundColor(.secondary)
    Text("Контент")
}

// HStack — горизонтальная раскладка (row)
HStack(spacing: 16) {
    Image(systemName: "person.circle")
        .font(.largeTitle)
    VStack(alignment: .leading) {
        Text("Иван Петров")
            .fontWeight(.semibold)
        Text("iOS Developer")
            .foregroundColor(.secondary)
    }
}

// ZStack — наложение слоёв (z-index)
ZStack {
    Color.blue                    // фоновый слой
    Circle()                      // средний слой
        .fill(.white.opacity(0.3))
        .frame(width: 200)
    Text("На переднем плане")     // верхний слой
        .foregroundColor(.white)
        .font(.title2.bold())
}
`} />

          <CodeBlock language="swift" title="React/CSS-эквивалент" code={`
// VStack → flex column
<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <h1>Заголовок</h1>
    <p>Подзаголовок</p>
</div>

// HStack → flex row  
<div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
    <Avatar />
    <div> ... </div>
</div>

// ZStack → position: relative + absolute
<div style={{ position: 'relative' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'blue' }} />
    <div style={{ position: 'absolute' }}>Текст</div>
</div>
`} />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <PhoneMockup title="Layout Demo">
              <div className="sim-vstack" style={{ gap: '16px' }}>
                {/* VStack example */}
                <div>
                  <div className="sim-text sim-text--caption" style={{ marginBottom: '4px' }}>VStack</div>
                  <div style={{ background: '#f2f2f7', borderRadius: '10px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 700 }}>Заголовок</span>
                    <span style={{ fontSize: '13px', color: '#8e8e93' }}>Подзаголовок</span>
                    <span style={{ fontSize: '14px' }}>Контент</span>
                  </div>
                </div>
                {/* HStack example  - user profile */}
                <div>
                  <div className="sim-text sim-text--caption" style={{ marginBottom: '4px' }}>HStack</div>
                  <div style={{ background: '#f2f2f7', borderRadius: '10px', padding: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: '#007AFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px' }}>👤</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600 }}>Иван Петров</span>
                      <span style={{ fontSize: '12px', color: '#8e8e93' }}>iOS Developer</span>
                    </div>
                  </div>
                </div>
                {/* ZStack example */}
                <div>
                  <div className="sim-text sim-text--caption" style={{ marginBottom: '4px' }}>ZStack</div>
                  <div style={{ position: 'relative', height: '100px', borderRadius: '10px', overflow: 'hidden', background: '#007AFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', width: '80px', height: '80px', borderRadius: '40px', background: 'rgba(255,255,255,0.2)' }} />
                    <span style={{ position: 'relative', color: 'white', fontWeight: 700, fontSize: '14px' }}>На переднем плане</span>
                  </div>
                </div>
              </div>
            </PhoneMockup>
          </div>
        </div>
      </section>

      {/* --- Spacer --- */}
      <section>
        <h2>📏 Spacer — гибкий отступ</h2>
        <div className="card">
          <h3>Spacer = flex: 1</h3>
          <p>
            <code>Spacer()</code> занимает всё доступное пространство — точно как <code>flex: 1</code> в CSS.
            Это главный инструмент для выталкивания элементов к краям.
          </p>
          <CodeBlock language="swift" title="Spacer в действии" code={`
// Навигационная панель: лого слева, кнопка справа
HStack {
    Text("MyApp")
        .font(.headline)
    Spacer()                // ← занимает всё пространство между
    Button("Settings") { }
}
// Результат: [MyApp          Settings]

// Центрирование через два Spacer
HStack {
    Spacer()
    Text("Центр")
    Spacer()
}
// Результат: [     Центр     ]

// Пропорциональные отступы
HStack {
    Text("1/3")
    Spacer()
    Spacer()     // два спейсера справа = 2/3 пространства
    Text("End")
}

// Минимальный размер Spacer
HStack {
    Text("A")
    Spacer(minLength: 50)  // минимум 50pt
    Text("B")
}
`} />
          <CodeBlock language="swift" title="CSS-эквивалент" code={`
/* Spacer() = flex: 1 */
.container {
    display: flex;
}
.spacer {
    flex: 1;
}

/* <div class="container">
    <span>MyApp</span>
    <div class="spacer"></div>
    <button>Settings</button>
</div> */
`} />
        </div>
      </section>

      {/* --- Frame & Padding --- */}
      <section>
        <h2>📐 Frame и Padding</h2>
        <div className="card">
          <h3>frame() — задаём размеры</h3>
          <CodeBlock language="swift" title="frame() — управление размерами" code={`
// Фиксированные размеры
Text("Бокс")
    .frame(width: 200, height: 100)
    // CSS: width: 200px; height: 100px

// Гибкие размеры
Text("На всю ширину")
    .frame(maxWidth: .infinity)
    // CSS: width: 100%

// Минимальные и максимальные
Text("Адаптивный")
    .frame(minWidth: 100, maxWidth: 300, minHeight: 50)
    // CSS: min-width: 100px; max-width: 300px; min-height: 50px

// Выравнивание внутри frame
Text("Слева внизу")
    .frame(width: 200, height: 200, alignment: .bottomLeading)
    // CSS: display: flex; align-items: flex-end; justify-content: flex-start

// .infinity по обоим осям — занять весь экран
Color.blue
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .ignoresSafeArea() // как position: fixed; inset: 0
`} />
        </div>

        <div className="card">
          <h3>padding() — отступы</h3>
          <CodeBlock language="swift" title="padding() — внутренние отступы" code={`
// Все стороны (по умолчанию ~16pt)
Text("Padding").padding()
// CSS: padding: 16px

// Конкретное значение
Text("Custom").padding(24)
// CSS: padding: 24px

// По сторонам
Text("Horizontal").padding(.horizontal, 20)
// CSS: padding-left: 20px; padding-right: 20px

Text("Top only").padding(.top, 32)
// CSS: padding-top: 32px

// Комбинация сторон
Text("Custom sides")
    .padding([.top, .leading], 16)
// CSS: padding-top: 16px; padding-left: 16px

// Edge Insets (полный контроль)
Text("Exact")
    .padding(EdgeInsets(top: 10, leading: 20, bottom: 10, trailing: 20))
// CSS: padding: 10px 20px
`} />
        </div>
      </section>

      {/* --- Alignment --- */}
      <section>
        <h2>↔️ Alignment — выравнивание</h2>
        <div className="card">
          <h3>Выравнивание в стеках</h3>
          <CodeBlock language="swift" title="Alignment" code={`
// VStack — горизонтальное выравнивание
VStack(alignment: .leading) {    // align-items: flex-start
    Text("Длинный текст для примера")
    Text("Короткий")
}

VStack(alignment: .center) { ... }   // align-items: center (по умолчанию)
VStack(alignment: .trailing) { ... } // align-items: flex-end

// HStack — вертикальное выравнивание
HStack(alignment: .top) { ... }       // align-items: flex-start
HStack(alignment: .center) { ... }    // align-items: center (по умолчанию)
HStack(alignment: .bottom) { ... }    // align-items: flex-end
HStack(alignment: .firstTextBaseline) { ... } // align-items: baseline

// ZStack — по обеим осям
ZStack(alignment: .topLeading) { ... }    // top-left
ZStack(alignment: .bottomTrailing) { ... } // bottom-right

// multilineTextAlignment — для текста
Text("Длинный многострочный текст")
    .multilineTextAlignment(.center)  // text-align: center
    .frame(width: 200)
`} />
        </div>
      </section>

      {/* --- ScrollView --- */}
      <section>
        <h2>📜 ScrollView</h2>
        <div className="card">
          <h3>Прокрутка контента</h3>
          <CodeBlock language="swift" title="ScrollView — аналог overflow: auto" code={`
// Вертикальная прокрутка (по умолчанию)
ScrollView {
    VStack(spacing: 16) {
        ForEach(0..<50) { i in
            Text("Элемент \\(i)")
                .frame(maxWidth: .infinity)
                .padding()
                .background(.blue.opacity(0.1))
                .cornerRadius(8)
        }
    }
    .padding()
}

// Горизонтальная прокрутка
ScrollView(.horizontal, showsIndicators: false) {
    HStack(spacing: 16) {
        ForEach(0..<20) { i in
            RoundedRectangle(cornerRadius: 12)
                .fill(.blue.gradient)
                .frame(width: 120, height: 160)
                .overlay(Text("Card \\(i)").foregroundColor(.white))
        }
    }
    .padding()
}

// Обе оси
ScrollView([.horizontal, .vertical]) {
    // большой контент
}
`} />
        </div>
      </section>

      {/* --- Lazy Stacks --- */}
      <section>
        <h2>⚡ LazyVStack / LazyHStack — виртуализация</h2>
        <div className="card">
          <h3>Lazy = react-window / react-virtualized</h3>
          <p>
            Обычные VStack/HStack создают <strong>все</strong> дочерние View сразу.
            Lazy-версии создают элементы <strong>только когда они видны</strong> на экране — 
            как виртуализация в React.
          </p>
          <CodeBlock language="swift" title="Lazy Stacks — Virtual Lists" code={`
// ❌ Плохо: 10 000 Views создаются сразу
ScrollView {
    VStack {
        ForEach(0..<10_000) { i in
            ExpensiveView(index: i)
        }
    }
}

// ✅ Хорошо: создаются только видимые
ScrollView {
    LazyVStack {
        ForEach(0..<10_000) { i in
            ExpensiveView(index: i)
        }
    }
}

// LazyHStack — горизонтальный ленивый стек
ScrollView(.horizontal) {
    LazyHStack(spacing: 12) {
        ForEach(items) { item in
            CardView(item: item)
        }
    }
}

// LazyVGrid — ленивый грид (CSS Grid)
let columns = [
    GridItem(.flexible()),     // auto-fill
    GridItem(.flexible()),
    GridItem(.flexible()),
]

ScrollView {
    LazyVGrid(columns: columns, spacing: 16) {
        ForEach(photos) { photo in
            PhotoView(photo: photo)
        }
    }
}
// CSS: grid-template-columns: repeat(3, 1fr)
`} />
          <div className="info-box">
            <span className="info-box-icon">⚡</span>
            <div className="info-box-content">
              <div className="info-box-title">Когда использовать Lazy?</div>
              <p>
                Если элементов <strong>до ~30</strong> — используйте обычный VStack/HStack (проще, нет overhead).
                Если элементов <strong>100+</strong> — обязательно LazyVStack/LazyHStack.
                Это как решение «нужен ли мне react-window?» в React.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- GeometryReader --- */}
      <section>
        <h2>📏 GeometryReader</h2>
        <div className="card">
          <h3>GeometryReader — доступ к размерам контейнера</h3>
          <p>
            Аналог <code>useRef</code> + <code>getBoundingClientRect()</code> в React,
            или CSS Container Queries. Даёт доступ к размеру и позиции родительского View.
          </p>
          <CodeBlock language="swift" title="GeometryReader" code={`
// Получить размер доступного пространства
GeometryReader { geometry in
    VStack {
        Text("Ширина: \\(geometry.size.width)")
        Text("Высота: \\(geometry.size.height)")
        
        // Адаптивная раскладка: 2 колонки по 50%
        HStack(spacing: 0) {
            Color.red
                .frame(width: geometry.size.width * 0.5)
            Color.blue
                .frame(width: geometry.size.width * 0.5)
        }
    }
}

// Пример: прогресс-бар
struct ProgressBar: View {
    var progress: Double // 0.0 ... 1.0
    
    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                Capsule()
                    .fill(.gray.opacity(0.3))
                Capsule()
                    .fill(.blue)
                    .frame(width: geo.size.width * progress)
            }
        }
        .frame(height: 8)
    }
}
`} />
          <div className="info-box">
            <span className="info-box-icon">⚠️</span>
            <div className="info-box-content">
              <div className="info-box-title">Используйте GeometryReader осторожно</div>
              <p>
                GeometryReader занимает <strong>всё доступное пространство</strong> и может ломать лейаут.
                Используйте его только когда действительно нужно знать размеры. В большинстве случаев
                хватает frame(), padding() и встроенного лейаута.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- overlay & background --- */}
      <section>
        <h2>🎭 overlay и background</h2>
        <div className="card">
          <h3>Наложения без ZStack</h3>
          <CodeBlock language="swift" title="overlay и background" code={`
// overlay — поверх View (как ::after в CSS)
Image("avatar")
    .resizable()
    .frame(width: 80, height: 80)
    .clipShape(Circle())
    .overlay(alignment: .bottomTrailing) {
        // Бейджик онлайн-статуса
        Circle()
            .fill(.green)
            .frame(width: 20, height: 20)
            .overlay(Circle().stroke(.white, lineWidth: 2))
    }

// background — за View (как ::before в CSS)
Text("Premium")
    .font(.caption.bold())
    .foregroundColor(.white)
    .padding(.horizontal, 12)
    .padding(.vertical, 6)
    .background {
        Capsule()
            .fill(
                LinearGradient(
                    colors: [.purple, .blue],
                    startPoint: .leading,
                    endPoint: .trailing
                )
            )
    }

// overlay vs ZStack
// overlay — привязан к конкретному View
// ZStack — независимый контейнер для наложения
`} />
        </div>
      </section>

      {/* --- Layout Algorithm --- */}
      <section>
        <h2>🧮 Как работает Layout Algorithm</h2>
        <div className="card">
          <h3>3 шага лейаута SwiftUI</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            margin: '16px 0',
            fontSize: '0.85rem',
          }}>
            <div style={{
              padding: '16px 20px',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              borderLeft: '4px solid #4CAF50',
            }}>
              <strong style={{ color: '#4CAF50' }}>1. Родитель предлагает размер</strong>
              <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>
                Родительский View предлагает дочернему размер: «У тебя есть 300×400 точек.»
              </p>
            </div>
            <div style={{
              padding: '16px 20px',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              borderLeft: '4px solid #2196F3',
            }}>
              <strong style={{ color: '#2196F3' }}>2. Ребёнок выбирает свой размер</strong>
              <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>
                Дочерний View решает, сколько ему нужно: «Мне достаточно 120×30.»
                Текст берёт минимум, Image может растягиваться, Color берёт всё.
              </p>
            </div>
            <div style={{
              padding: '16px 20px',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              borderLeft: '4px solid #FF9800',
            }}>
              <strong style={{ color: '#FF9800' }}>3. Родитель позиционирует ребёнка</strong>
              <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>
                Родитель ставит ребёнка в нужное место (по центру, слева, и т.д.).
              </p>
            </div>
          </div>
          <CodeBlock language="swift" title="Демонстрация алгоритма" code={`
// Text — берёт МИНИМУМ нужного пространства
Text("Hi")  // Занимает ровно столько, сколько нужно тексту

// Color — берёт МАКСИМУМ предложенного
Color.blue  // Занимает всё доступное пространство

// frame() — переопределяет предложение родителя
Text("Hi")
    .frame(width: 200)  // Теперь Text получает предложение 200pt
    
// fixedSize() — игнорировать предложение родителя
Text("Очень длинный текст, который не должен обрезаться")
    .fixedSize()  // Берёт идеальный размер, не сжимается
`} />
        </div>
      </section>

      {/* --- Summary --- */}
      <div className="info-box" style={{ marginTop: '32px' }}>
        <span className="info-box-icon">🎯</span>
        <div className="info-box-content">
          <div className="info-box-title">Ключевые идеи</div>
          <p>
            1. <strong>VStack</strong> = flex column, <strong>HStack</strong> = flex row, <strong>ZStack</strong> = position absolute<br />
            2. <strong>Spacer()</strong> = flex: 1 — выталкивает элементы к краям<br />
            3. <strong>frame(maxWidth: .infinity)</strong> = width: 100%<br />
            4. <strong>LazyVStack/LazyHStack</strong> — виртуализация, как react-window<br />
            5. <strong>GeometryReader</strong> — доступ к размерам (используйте аккуратно)<br />
            6. Layout-алгоритм: родитель предлагает → ребёнок выбирает → родитель расставляет
          </p>
        </div>
      </div>
    </div>
  )
}
