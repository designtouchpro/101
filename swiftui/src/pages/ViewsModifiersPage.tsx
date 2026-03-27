import CodeBlock from '../components/CodeBlock'
import PhoneMockup from '../components/PhoneMockup'

export default function ViewsModifiersPage() {
  return (
    <div className="demo-container">
      <h1>🎨 Views и Modifiers</h1>
      <p>
        В React мы пишем JSX-компоненты и стилизуем их через CSS. В SwiftUI каждый элемент UI — это <strong>struct</strong>,
        реализующий протокол <code>View</code>, а стилизация происходит через <strong>модификаторы</strong> — chainable-методы,
        которые оборачивают View в новый View. Это фундамент всего SwiftUI.
      </p>

      {/* --- View Protocol --- */}
      <section>
        <h2>📐 Протокол View</h2>
        <div className="card">
          <h3>Как устроен View</h3>
          <p>
            Каждый View в SwiftUI — это <code>struct</code>, который обязан реализовать одно свойство: <code>body</code>.
            Это как <code>render()</code> в React-классах или return в функциональном компоненте.
          </p>
          <CodeBlock language="swift" title="Минимальный View" code={`
// SwiftUI
struct MyView: View {
    var body: some View {
        Text("Привет, SwiftUI!")
    }
}

// "some View" — opaque return type
// Компилятор знает точный тип, но мы его скрываем
// Аналог: React.FC<Props> скрывает детали JSX.Element
`} />
          <CodeBlock language="swift" title="React-эквивалент" code={`
// React
function MyComponent() {
    return <p>Привет, React!</p>
}

// или с TypeScript
const MyComponent: React.FC = () => {
    return <p>Привет, React!</p>
}
`} />
          <div className="info-box">
            <span className="info-box-icon">💡</span>
            <div className="info-box-content">
              <div className="info-box-title">struct, а не class!</div>
              <p>
                Views в SwiftUI — value types (structs). Они лёгкие, копируются по значению
                и пересоздаются при каждом обновлении. SwiftUI сам решает, что нужно перерисовать,
                сравнивая старый и новый body. Как Virtual DOM в React, но на уровне компилятора.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Basic Views --- */}
      <section>
        <h2>🧱 Базовые Views</h2>

        <div className="card">
          <h3>Text — аналог {'<p>'}, {'<span>'}, {'<h1>'}</h3>
          <CodeBlock language="swift" title="Text — основной текстовый View" code={`
// Простой текст
Text("Hello, World!")

// С модификаторами (стилизация)
Text("Заголовок")
    .font(.largeTitle)        // как <h1>
    .fontWeight(.bold)
    .foregroundColor(.blue)

// Многострочный текст
Text("Длинный текст, который может переноситься на несколько строк автоматически")
    .lineLimit(3)              // максимум 3 строки
    .truncationMode(.tail)     // ... в конце

// Форматирование внутри Text
Text("Цена: ") + Text("$99").bold().foregroundColor(.green)

// Markdown поддержка (iOS 15+)
Text("**Жирный**, *курсив*, [ссылка](https://apple.com)")

// Интерполяция
let count = 5
Text("У вас \\(count) сообщений")
`} />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <PhoneMockup title="Text Examples">
              <div className="sim-vstack" style={{ gap: '12px' }}>
                <span className="sim-text" style={{ fontSize: '14px' }}>Hello, World!</span>
                <span className="sim-large-title" style={{ color: '#007AFF' }}>Заголовок</span>
                <span className="sim-text" style={{ fontSize: '13px', lineHeight: '1.5' }}>
                  Длинный текст, который может переноситься на несколько строк...
                </span>
                <span className="sim-text">
                  Цена: <strong style={{ color: '#34c759' }}>$99</strong>
                </span>
                <span className="sim-text">
                  <strong>Жирный</strong>, <em>курсив</em>, <span style={{ color: '#007AFF', textDecoration: 'underline' }}>ссылка</span>
                </span>
                <span className="sim-text">У вас 5 сообщений</span>
              </div>
            </PhoneMockup>
          </div>
        </div>

        <div className="card">
          <h3>Image — аналог {'<img>'}</h3>
          <CodeBlock language="swift" title="Image и SF Symbols" code={`
// Из ассетов проекта (как import img from './photo.png')
Image("photo")
    .resizable()                    // разрешить масштабирование
    .aspectRatio(contentMode: .fit) // object-fit: contain
    .frame(width: 200, height: 200)
    .clipShape(Circle())            // border-radius: 50%

// SF Symbols — 5000+ бесплатных иконок от Apple
// Аналог: react-icons, heroicons, lucide
Image(systemName: "heart.fill")
    .font(.title)
    .foregroundColor(.red)

Image(systemName: "star.fill")
    .symbolRenderingMode(.multicolor) // цветные иконки
    .font(.system(size: 40))

// Асинхронная загрузка (как React Query + img)
AsyncImage(url: URL(string: "https://example.com/photo.jpg")) { image in
    image.resizable().aspectRatio(contentMode: .fill)
} placeholder: {
    ProgressView() // спиннер пока загружается
}
.frame(width: 100, height: 100)
.clipShape(RoundedRectangle(cornerRadius: 12))
`} />
        </div>

        <div className="card">
          <h3>Button — аналог {'<button onClick={}>'}</h3>
          <CodeBlock language="swift" title="Button" code={`
// Простая кнопка
Button("Нажми меня") {
    print("Кнопка нажата!")
}

// Кнопка с кастомным содержимым (как children в React)
Button(action: {
    print("Tapped!")
}) {
    HStack {
        Image(systemName: "plus.circle.fill")
        Text("Добавить")
    }
    .padding()
    .background(.blue)
    .foregroundColor(.white)
    .cornerRadius(10)
}

// Стили кнопок (как variants в UI-библиотеках)
Button("Bordered") { }
    .buttonStyle(.bordered)

Button("Prominent") { }
    .buttonStyle(.borderedProminent)

Button("Удалить", role: .destructive) { }
`} />
          <CodeBlock language="swift" title="React-эквивалент" code={`
// React
<button onClick={() => console.log('Clicked!')}>
    Нажми меня
</button>

<button onClick={handleAdd} className="btn-primary">
    <PlusIcon /> Добавить
</button>
`} />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <PhoneMockup title="Buttons">
              <div className="sim-vstack" style={{ gap: '14px' }}>
                <div className="sim-button">Нажми меня</div>
                <div className="sim-hstack" style={{ justifyContent: 'center' }}>
                  <div className="sim-button--filled">
                    <span style={{ marginRight: '6px' }}>＋</span>Добавить
                  </div>
                </div>
                <div style={{ padding: '8px 16px', border: '1px solid #007AFF', borderRadius: '8px', color: '#007AFF', textAlign: 'center', fontSize: '14px' }}>
                  Bordered
                </div>
                <div style={{ padding: '8px 16px', background: '#007AFF', borderRadius: '8px', color: 'white', textAlign: 'center', fontSize: '14px', fontWeight: 600 }}>
                  Prominent
                </div>
                <div style={{ padding: '8px 16px', color: '#FF3B30', textAlign: 'center', fontSize: '14px' }}>
                  Удалить
                </div>
              </div>
            </PhoneMockup>
          </div>
        </div>

        <div className="card">
          <h3>TextField, Toggle, Slider — элементы форм</h3>
          <CodeBlock language="swift" title="Элементы ввода" code={`
struct FormExample: View {
    @State private var name = ""
    @State private var isOn = false
    @State private var volume: Double = 50

    var body: some View {
        Form {
            // TextField — как <input type="text">
            TextField("Введите имя", text: $name)
                .textFieldStyle(.roundedBorder)

            // SecureField — как <input type="password">
            SecureField("Пароль", text: $password)

            // Toggle — как <input type="checkbox"> (но красивый)
            Toggle("Уведомления", isOn: $isOn)
                .tint(.green)

            // Slider — как <input type="range">
            Slider(value: $volume, in: 0...100, step: 1)

            // Picker — как <select>
            Picker("Тема", selection: $theme) {
                Text("Светлая").tag("light")
                Text("Тёмная").tag("dark")
                Text("Системная").tag("system")
            }
            .pickerStyle(.segmented) // сегментированный стиль
        }
    }
}
`} />
          <div className="info-box">
            <span className="info-box-icon">🔗</span>
            <div className="info-box-content">
              <div className="info-box-title">$ — двусторонняя привязка</div>
              <p>
                Символ <code>$</code> перед @State-переменной создаёт <code>Binding</code> — двустороннюю связь.
                В React это как передать и value, и onChange одновременно. Подробнее в разделах @State и @Binding.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <PhoneMockup title="Settings">
              <div className="sim-vstack" style={{ gap: '0' }}>
                <div className="sim-section-header">Профиль</div>
                <div className="sim-list">
                  <div className="sim-form-row">
                    <span style={{ fontSize: '14px' }}>Имя</span>
                    <div className="sim-textfield" style={{ width: '120px', textAlign: 'right' }}>Введите имя</div>
                  </div>
                  <div className="sim-form-row">
                    <span style={{ fontSize: '14px' }}>Пароль</span>
                    <div className="sim-textfield" style={{ width: '120px', textAlign: 'right' }}>••••••</div>
                  </div>
                </div>
                <div className="sim-section-header">Настройки</div>
                <div className="sim-list">
                  <div className="sim-form-row">
                    <span style={{ fontSize: '14px' }}>Уведомления</span>
                    <div className="sim-toggle" />
                  </div>
                  <div className="sim-form-row">
                    <span style={{ fontSize: '14px', marginRight: '8px' }}>Громкость</span>
                    <div className="sim-slider" style={{ flex: 1 }}>
                      <div className="sim-slider__fill" style={{ width: '50%' }} />
                      <div className="sim-slider__thumb" style={{ left: '50%' }} />
                    </div>
                  </div>
                </div>
                <div className="sim-section-header">Тема</div>
                <div className="sim-segmented">
                  <div className="sim-segmented__item sim-segmented__item--active">Светлая</div>
                  <div className="sim-segmented__item">Тёмная</div>
                  <div className="sim-segmented__item">Системная</div>
                </div>
              </div>
            </PhoneMockup>
          </div>
        </div>
      </section>

      {/* --- Modifiers --- */}
      <section>
        <h2>🎨 Модификаторы — «CSS» в SwiftUI</h2>
        <div className="card">
          <h3>Основные модификаторы</h3>
          <p>
            Модификаторы — это методы, которые создают <strong>новый View</strong>, оборачивающий предыдущий.
            Они chainable (цепочки), как jQuery или CSS-in-JS.
          </p>
          <CodeBlock language="swift" title="Самые частые модификаторы" code={`
Text("Стилизованный текст")
    // Типографика
    .font(.title2)                    // font-size + font-weight  
    .fontWeight(.semibold)            // font-weight: 600
    .foregroundColor(.primary)        // color: var(--text-primary)
    .italic()                         // font-style: italic

    // Отступы и размеры
    .padding()                        // padding: 16px (все стороны)
    .padding(.horizontal, 20)         // padding-left/right: 20px
    .frame(width: 200, height: 50)    // width: 200px; height: 50px
    .frame(maxWidth: .infinity)       // width: 100%

    // Фон и границы
    .background(.blue)                // background-color: blue
    .cornerRadius(12)                 // border-radius: 12px
    .border(.gray, width: 1)         // border: 1px solid gray
    .shadow(radius: 5)               // box-shadow: 0 0 5px

    // Прозрачность и видимость
    .opacity(0.8)                     // opacity: 0.8
    .hidden()                         // display: none
`} />
        </div>

        <div className="card">
          <h3>⚠️ Порядок модификаторов ВАЖЕН!</h3>
          <p>
            В отличие от CSS, где порядок свойств обычно не имеет значения,
            в SwiftUI порядок модификаторов <strong>критически важен</strong>.
            Каждый модификатор оборачивает предыдущий результат.
          </p>
          <CodeBlock language="swift" title="Порядок меняет результат" code={`
// Пример 1: padding ПЕРЕД background
Text("Hello")
    .padding()          // 1. Добавляем отступ вокруг текста
    .background(.blue)  // 2. Фон покрывает текст + padding
// Результат: синий прямоугольник с отступами ✅

// Пример 2: background ПЕРЕД padding
Text("Hello")
    .background(.blue)  // 1. Фон только за текстом
    .padding()          // 2. Прозрачный отступ вокруг
// Результат: маленький синий блок с пустым пространством вокруг 😕

// Пример 3: несколько фонов
Text("Layered")
    .padding()
    .background(.red)      // внутренний фон — красный
    .padding()
    .background(.blue)     // внешний фон — синий  
    .padding()
    .background(.green)    // самый внешний — зелёный
// Результат: три вложенных цветных прямоугольника!
`} />
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
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
              <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#4CAF50' }}>✅ padding → background</p>
              <div style={{
                display: 'inline-block',
                padding: '16px 24px',
                background: '#2196F3',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 500,
              }}>Hello</div>
            </div>
            <div style={{
              padding: '20px',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              border: '2px solid #FF9800',
              textAlign: 'center',
            }}>
              <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#FF9800' }}>😕 background → padding</p>
              <div style={{
                display: 'inline-block',
                padding: '16px 24px',
              }}>
                <span style={{
                  background: '#2196F3',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  color: 'white',
                  fontWeight: 500,
                }}>Hello</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Сравнение с React + CSS</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            margin: '16px 0',
          }}>
            <div>
              <CodeBlock language="swift" title="SwiftUI" code={`
Text("Card Title")
    .font(.headline)
    .foregroundColor(.white)
    .padding()
    .frame(maxWidth: .infinity)
    .background(
        RoundedRectangle(cornerRadius: 12)
            .fill(.blue.gradient)
    )
    .shadow(color: .blue.opacity(0.3),
            radius: 8, y: 4)
`} />
            </div>
            <div>
              <CodeBlock language="swift" title="React + CSS" code={`
// JSX
<h2 className="card-title">Card Title</h2>

/* CSS */
.card-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    padding: 16px;
    width: 100%;
    background: linear-gradient(
        to bottom, #2196F3, #1976D2
    );
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(33,150,243,0.3);
}
`} />
            </div>
          </div>
        </div>
      </section>

      {/* --- Custom Modifiers --- */}
      <section>
        <h2>🔧 Кастомные модификаторы</h2>
        <div className="card">
          <h3>ViewModifier — свой «CSS-класс»</h3>
          <p>
            Можно создавать переиспользуемые наборы модификаторов — аналог CSS-классов
            или styled-components.
          </p>
          <CodeBlock language="swift" title="Кастомный ViewModifier" code={`
// Определяем модификатор (как CSS-класс)
struct CardStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding()
            .background(.ultraThinMaterial)
            .cornerRadius(16)
            .shadow(color: .black.opacity(0.1), radius: 8, y: 4)
    }
}

// Extension для удобного использования
extension View {
    func cardStyle() -> some View {
        modifier(CardStyle())
    }
}

// Использование — чисто и переиспользуемо
Text("Красивая карточка")
    .cardStyle()

VStack { /* ... */ }
    .cardStyle()
`} />
          <CodeBlock language="swift" title="React-эквивалент: styled-components" code={`
// React + styled-components
const Card = styled.div\`
    padding: 16px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
\`;

<Card>Красивая карточка</Card>
`} />
        </div>
      </section>

      {/* --- Conditional Modifiers --- */}
      <section>
        <h2>🔀 Условные модификаторы</h2>
        <div className="card">
          <h3>Динамические стили</h3>
          <CodeBlock language="swift" title="Условные модификаторы" code={`
struct DynamicView: View {
    @State private var isHighlighted = false
    
    var body: some View {
        Text("Нажми меня")
            .padding()
            .background(isHighlighted ? .yellow : .gray)
            .foregroundColor(isHighlighted ? .black : .white)
            .cornerRadius(8)
            .scaleEffect(isHighlighted ? 1.1 : 1.0)
            .animation(.spring(), value: isHighlighted)
            .onTapGesture {
                isHighlighted.toggle()
            }
    }
}

// Для сложных условий — кастомный extension
extension View {
    @ViewBuilder
    func \`if\`<Transform: View>(
        _ condition: Bool,
        transform: (Self) -> Transform
    ) -> some View {
        if condition {
            transform(self)
        } else {
            self
        }
    }
}

// Использование
Text("Conditional")
    .if(isSpecial) { view in
        view.bold().foregroundColor(.red)
    }
`} />
        </div>
      </section>

      {/* --- Summary Table --- */}
      <section>
        <h2>📋 Шпаргалка: React → SwiftUI</h2>
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color, #333)' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>React / HTML</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>SwiftUI</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Примечание</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['<p>, <span>', 'Text("...")', 'Единый текстовый View'],
                  ['<img src="...">', 'Image("name")', '+ SF Symbols: Image(systemName:)'],
                  ['<button onClick={}>', 'Button("..") { action }', 'action — trailing closure'],
                  ['<input>', 'TextField("", text: $val)', '$ создаёт Binding'],
                  ['<input type="checkbox">', 'Toggle(isOn: $val)', 'Красивый переключатель'],
                  ['<input type="range">', 'Slider(value: $val)', 'Нативный слайдер'],
                  ['<select>', 'Picker(selection: $val)', 'Много стилей отображения'],
                  ['className="..."', '.modifier()', 'Цепочка методов вместо CSS'],
                  ['style={{ ... }}', '.font(), .padding()...', 'Каждый модификатор → новый View'],
                  ['styled-components', 'ViewModifier', 'Переиспользуемые стили'],
                ].map(([react, swift, note], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #333)' }}>
                    <td style={{ padding: '8px 10px' }}><code>{react}</code></td>
                    <td style={{ padding: '8px 10px' }}><code>{swift}</code></td>
                    <td style={{ padding: '8px 10px', color: 'var(--text-secondary)' }}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="info-box" style={{ marginTop: '32px' }}>
        <span className="info-box-icon">🎯</span>
        <div className="info-box-content">
          <div className="info-box-title">Ключевые идеи</div>
          <p>
            1. Каждый View — struct с computed property <code>body</code><br />
            2. Модификаторы создают <strong>новые Views</strong>, а не мутируют существующие<br />
            3. Порядок модификаторов имеет значение (padding→background ≠ background→padding)<br />
            4. SF Symbols — бесплатные иконки из коробки (5000+ штук)<br />
            5. <code>ViewModifier</code> — ваш способ создавать переиспользуемые стили
          </p>
        </div>
      </div>
    </div>
  )
}
